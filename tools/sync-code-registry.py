#!/usr/bin/env python3
"""Regenerate the set code registry snapshot (code-registry.json).

The living set code registry is a Google Sheet on the app owner's
personal account, written by the mint form at print time and read by
the home page code box. Reading the sheet on every student lookup
does not scale, so a GitHub Actions workflow runs this script on a
short schedule: it reads the sheet over its public gviz JSON feed
(the sheet is anyone-with-link readable, so no credentials are
needed), validates every row, and writes a compact snapshot the app
reads first. The workflow commits the file only when its content
changed.

Validation (November 27, 2026, spam hardening, Jason's direction):
the mint form is a public endpoint, so any row can be posted by
anyone. A row earns a place in the snapshot only if

  * the code is six characters from the unambiguous alphabet;
  * the payload parses and its course is a registered course in
    courses.js;
  * it carries a set value in one of the app's own grammars
    (s / e / p, optional * edit marker, salt, then tokens), where
    every token either is a stream token (entry.n.idx + M/N/T) or a
    raw token (entry@base64 JSON carrying p, t and s), and every
    referenced entry exists in that course's bank today; or it is
    a seed alias (settings plus seed, no set value), which can
    only redraw questions from the bank;
  * the code is not on the demotion list
    (tools/registry-demoted-codes.txt, stage 1, November 27, 2026)
    and was not minted inside a burst (BURST_MIN or more mints
    within BURST_WINDOW_SEC seconds), the flood guard.

Nothing here deletes or blocks a code outright: rows that fail
validation or land in a burst simply stay out of the snapshot, and
the app falls back to the sheet for any code the snapshot lacks,
applying its own grammar-level checks there. A code whose set
references an entry that has since left the bank demotes the same
way and still opens, dealing its surviving questions.

Usage:
    python3 tools/sync-code-registry.py [--source URL_OR_FILE]
                                        [--out PATH]

--source defaults to the live sheet's gviz feed; a local file path
is accepted so the transformation can be tested against a fixture.
--out defaults to code-registry.json beside the repo root.
"""

import argparse
import base64
import json
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

SHEET_ID = "1O1B-_vodjxbgZLKI4DnqiX9anYEcufDWbrSEC8coHDY"
SHEET_TAB = "Form Responses 1"
CODE_RE = re.compile(r"^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$")
STREAM_RE = re.compile(r"^([a-z0-9-]+)\.(\d+)\.(\d+)[MNT]$")
SET_RE = re.compile(r"^(s|e|p)(\*)?:([^:]+):(.+)$", re.S)
ENTRY_RE = re.compile(r"^[a-z0-9-]+$")
DATE_RE = re.compile(
    r"^Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)$"
)
BURST_WINDOW_SEC = 600
BURST_MIN = 20

ROOT = Path(__file__).resolve().parent.parent


def gviz_url():
    from urllib.parse import quote

    return (
        "https://docs.google.com/spreadsheets/d/"
        + SHEET_ID
        + "/gviz/tq?tqx=out:json&sheet="
        + quote(SHEET_TAB)
    )


def read_source(source):
    if source.startswith("http://") or source.startswith("https://"):
        req = urllib.request.Request(
            source, headers={"User-Agent": "review-apps-registry-sync/1.0"}
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.read().decode("utf-8")
    return Path(source).read_text(encoding="utf-8")


def load_courses():
    """Course ids and bank entry ids, read from the repo checkout."""
    cj = (ROOT / "courses.js").read_text(encoding="utf-8")
    course_ids = set(re.findall(r'^\s*"([a-z0-9-]+)":\s*\{', cj, re.M))
    bankfile = dict(
        re.findall(
            r'"([a-z0-9-]+)":\s*\{\s*id:\s*"[a-z0-9-]+",.*?bankFile:\s*"([^"]+)"',
            cj,
            re.S,
        )
    )
    banks = {}

    def bank_ids(course):
        if course in banks:
            return banks[course]
        path = ROOT / "banks" / bankfile.get(course, course + ".js")
        ids = set()
        if path.exists():
            src = path.read_text(encoding="utf-8", errors="replace")
            ids = set(re.findall(r'\bE\("([^"]+)"', src)) | set(
                re.findall(r"\bE\('([^']+)'", src)
            )
        banks[course] = ids
        return ids

    return course_ids, bank_ids


def token_ok(tok, ids):
    if "@" in tok:
        eid, raw = tok.split("@", 1)
        if not ENTRY_RE.match(eid) or eid not in ids:
            return False
        try:
            s = raw.replace("-", "+").replace("_", "/")
            s += "=" * (-len(s) % 4)
            obj = json.loads(base64.b64decode(s).decode("utf-8"))
            return all(k in obj for k in ("p", "t", "s"))
        except Exception:
            return False
    m = STREAM_RE.match(tok)
    return bool(m) and m.group(1) in ids


def payload_ok(q, course_ids, bank_ids):
    try:
        params = dict(urllib.parse.parse_qsl(q, keep_blank_values=True))
    except Exception:
        return False
    course = params.get("course", "")
    if course not in course_ids:
        return False
    if "set" in params:
        m = SET_RE.match(params["set"])
        if not m:
            return False
        ids = bank_ids(course)
        toks = [t for t in re.split(r"[,;]", m.group(4)) if t]
        if not toks:
            return False
        return all(token_ok(t, ids) for t in toks)
    return bool(params.get("seed"))


def parse_stamp(raw):
    m = DATE_RE.match(raw.strip())
    if not m:
        return None
    y, mo, d, h, mi, s = (int(x) for x in m.groups())
    try:
        return datetime(y, mo + 1, d, h, mi, s)  # gviz months are 0-based
    except ValueError:
        return None


def parse_rows(text):
    """(timestamp, code, payload) per sheet row, in sheet order."""
    a = text.find("{")
    b = text.rfind("}")
    if a < 0 or b <= a:
        raise ValueError("registry response not understood")
    data = json.loads(text[a : b + 1])
    rows = (data.get("table") or {}).get("rows") or []
    out = []
    for row in rows:
        cells = row.get("c") or []

        def cell(i):
            if i < len(cells) and cells[i] and cells[i].get("v") is not None:
                return str(cells[i]["v"])
            return ""

        out.append((parse_stamp(cell(0)), cell(1), cell(2)))
    return out


def burst_codes(stamps):
    """Codes with a mint inside a hot window (>= BURST_MIN in window)."""
    events = sorted((ts, code) for ts, code in stamps if ts is not None)
    hot = set()
    j = 0
    for i in range(len(events)):
        if j < i:
            j = i
        while (
            j + 1 < len(events)
            and (events[j + 1][0] - events[i][0]).total_seconds()
            <= BURST_WINDOW_SEC
        ):
            j += 1
        if j - i + 1 >= BURST_MIN:
            for k in range(i, j + 1):
                hot.add(events[k][1])
    return hot


def load_demoted():
    """Codes kept out of the snapshot by the stage 1 demotion list."""
    path = Path(__file__).resolve().parent / "registry-demoted-codes.txt"
    if not path.exists():
        return set()
    demoted = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            demoted.add(line.upper())
    return demoted


def build_codes(text):
    course_ids, bank_ids = load_courses()
    rows = parse_rows(text)
    codes = {}
    invalid = 0
    for _ts, raw_code, q in rows:
        code = re.sub(r"[^A-Z0-9]", "", raw_code.upper())
        if CODE_RE.match(code) and payload_ok(q, course_ids, bank_ids):
            codes[code] = q
        else:
            invalid += 1
    demoted = load_demoted()
    dropped_demoted = sorted(c for c in codes if c in demoted)
    codes = {c: q for c, q in codes.items() if c not in demoted}
    hot = burst_codes([(ts, re.sub(r"[^A-Z0-9]", "", rc.upper()))
                        for ts, rc, _q in rows])
    dropped_burst = sorted(c for c in codes if c in hot)
    codes = {c: q for c, q in codes.items() if c not in hot}
    print(
        f"rows: {len(rows)}, invalid dropped: {invalid}, "
        f"demoted excluded: {len(dropped_demoted)}, "
        f"burst excluded: {len(dropped_burst)}"
    )
    return codes


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--source", default=None, help="gviz URL or local fixture file")
    ap.add_argument("--out", default=None, help="snapshot path to write")
    args = ap.parse_args()

    source = args.source or gviz_url()
    out = (
        Path(args.out)
        if args.out
        else Path(__file__).resolve().parent.parent / "code-registry.json"
    )
    codes = build_codes(read_source(source))
    payload = {"v": 1, "codes": {k: codes[k] for k in sorted(codes)}}
    text = json.dumps(payload, separators=(",", ":"), ensure_ascii=False) + "\n"
    previous = out.read_text(encoding="utf-8") if out.exists() else None
    if previous == text:
        print(f"snapshot unchanged: {len(codes)} codes in {out}")
        return 0
    out.write_text(text, encoding="utf-8")
    print(f"snapshot written: {len(codes)} codes to {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
