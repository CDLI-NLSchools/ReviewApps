#!/usr/bin/env python3
"""Regenerate the set code registry snapshot (code-registry.json).

The living set code registry is a Google Sheet on the app owner's
personal account, written by the mint form at print time and read by
the home page code box. Reading the sheet on every student lookup
does not scale, so a GitHub Actions workflow runs this script on a
short schedule: it reads the sheet over its public gviz JSON feed
(the sheet is anyone-with-link readable, so no credentials are
needed), validates every row with exactly the rules the app applies
in fetchSheetCodes (a six-character code from the unambiguous
alphabet, parameters carrying course= and set=), and writes a
compact snapshot the app reads first. The workflow commits the file
only when its content changed.

Usage:
    python3 tools/sync-code-registry.py [--source URL_OR_FILE]
                                        [--out PATH]

--source defaults to the live sheet's gviz feed; a local file path
is accepted so the transformation can be tested against a fixture.
--out defaults to code-registry.json beside the repo root.

Codes listed in tools/registry-demoted-codes.txt are left out of the
snapshot. Demotion is snapshot-only: the codes stay in the sheet, and
the app falls back to the sheet for any code the snapshot lacks, so a
demoted code still resolves. See that file's header for the why.
"""

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path

SHEET_ID = "1O1B-_vodjxbgZLKI4DnqiX9anYEcufDWbrSEC8coHDY"
SHEET_TAB = "Form Responses 1"
CODE_RE = re.compile(r"^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$")


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


def parse_codes(text):
    """Apply the app's row validation to a gviz payload."""
    a = text.find("{")
    b = text.rfind("}")
    if a < 0 or b <= a:
        raise ValueError("registry response not understood")
    data = json.loads(text[a : b + 1])
    rows = (data.get("table") or {}).get("rows") or []
    codes = {}
    for row in rows:
        cells = row.get("c") or []

        def cell(i):
            if i < len(cells) and cells[i] and cells[i].get("v") is not None:
                return str(cells[i]["v"])
            return ""

        code = re.sub(r"[^A-Z0-9]", "", cell(1).upper())
        q = cell(2)
        if CODE_RE.match(code) and "course=" in q and "set=" in q:
            codes[code] = q
    return codes


def load_demoted():
    """Codes to keep out of the snapshot (they still resolve by sheet)."""
    path = Path(__file__).resolve().parent / "registry-demoted-codes.txt"
    if not path.exists():
        return set()
    demoted = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            demoted.add(line.upper())
    return demoted


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
    codes = parse_codes(read_source(source))
    demoted = load_demoted()
    dropped = sorted(c for c in codes if c in demoted)
    if dropped:
        print(f"demoted codes excluded from snapshot: {len(dropped)}")
        codes = {c: q for c, q in codes.items() if c not in demoted}
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
