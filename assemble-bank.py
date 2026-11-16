#!/usr/bin/env python3
"""Assemble a course bank module (banks/<course>.js) from its per-unit
sources in banks/<course>/: shared helpers first, then the unit files in
the course's own build order, then the generated CR marks map
(window.__BANK_CRMARKS) built from the // CRMARKS: id=marks manifest
comments in the unit files. Classic script, no modules: the shell loads
it with a plain script tag.

Usage: python3 assemble-bank.py [course-id]   (default: physics-3204)
"""
import re
import sys
from pathlib import Path

ROOT = Path("/home/hatch/workspace/review-app-unified")

COURSES = {
    # Earth Systems 3209 is built unit by unit (Unit 3 first, Nov 2026);
    # later unit builds extend this file list in unit order.
    "earth-3209": ("Earth Systems 3209",
                   ["bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js",
                    "bank-u5.js"]),
    "physics-3204": ("Physics 3204",
                     ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                      "bank-u3.js", "bank-u4.js"]),
    "physics-2204": ("Physics 2204",
                     ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                      "bank-u3.js", "bank-u4.js", "bank-br.js"]),
    "chem-3202": ("Chemistry 3202",
                  ["bank-u1.js", "bank-u2.js", "bank-u3.js",
                   "bank-u4.js", "bank-br.js"]),
    "chem-2202": ("Chemistry 2202",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-br.js"]),
    # Full bank (Nov 12, 2026): the three unit slices from the H5P
    # review books (307 MC + 5 CR) plus the generator slices
    # (crosses and Hardy-Weinberg, DNA sequences, pedigrees).
    # bank-gen-pedigree.js stays last: its tail carries the
    # final-scope preFinal flagging pass over the whole bank.
    "bio-3201": ("Biology 3201",
                 ["bank-u1.js", "bank-u2.js", "bank-u3.js",
                  "bank-gen-crosses.js", "bank-gen-seq.js",
                  "bank-gen-pedigree.js"]),
    # Full bank (Nov 12, 2026): the three unit slices from the seven
    # H5P review books (397 MC, selected-response only; the books
    # contain no constructed response), the generator slice
    # (sampling math, ten percent law, magnification) and the
    # labelling slice (tranche 2: the 13 labelling activities are 7
    # unique diagrams, converted to numbered-diagram MC entries).
    "bio-2201": ("Biology 2201",
                 ["bank-u1.js", "bank-u2.js", "bank-u3.js",
                  "bank-gen.js", "bank-label.js"]),
    # First build (Nov 12, 2026): original bank written for this app
    # (generators, varsets and fixed entries plus 12 constructed
    # response), Knowledge indicators only. The synoptic weather map
    # items (bank-u1-maps.js) were held out of the launch bank until
    # Jason approved prototype v3 with regional framings (Nov 12,
    # 2026); they are in the bank from that date.
    "sci-1206": ("Science 1206",
                 ["bank-helpers.js", "bank-u1.js", "bank-u1-maps.js",
                  "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    # Science 7 is built strand by strand (Unit 1 Ecosystems first,
    # Nov 15, 2026); later unit builds extend this list in unit order.
    "sci-7": ("Science 7",
              ["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    "sci-8": ("Science 8",
              ["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    # Science 9 unit files define their figure builders locally
    # (s9u1 to s9u4 prefixes), so there is no shared helpers file.
    "sci-9": ("Science 9",
              ["bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    # French junior science (Nov 16, 2026): each bank is its own
    # build keyed to the French guide, mirroring the English bank
    # structure for the same grade. sci-9-fr unit files define their
    # figure builders locally, like sci-9, so no shared helpers file.
    "sci-7-fr": ("Sciences 7",
                 ["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    "sci-8-fr": ("Sciences 8",
                 ["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    "sci-9-fr": ("Sciences 9",
                 ["bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"]),
    "math-3200": ("Math 3200",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js",
                   "bank-u4.js", "bank-u5.js", "bank-u6.js",
                   "bank-u7.js", "bank-u8.js", "bank-u9.js", "bank-pk.js"]),
    "math-3201": ("Math 3201",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-u9.js", "bank-pk.js"]),
    "math-3202": ("Math 3202",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-u9.js", "bank-u10.js"]),
    "math-3208": ("Math 3208",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-fix.js", "bank-pk.js"]),
    "math-2200": ("Math 2200",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-u9.js", "bank-fix.js"]),
    # Registration order is the standalone's own: its Unit 5 bank
    # block comes first in the served file, then Units 1 to 4, then
    # Units 6 to 8, then the Tranche 3 to 8 additions (bank-fix.js,
    # which also carries the postMid flagging, last as there).
    "math-2201": ("Math 2201",
                  ["bank-helpers.js", "bank-u5.js", "bank-u1.js",
                   "bank-u2.js", "bank-u3.js", "bank-u4.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-fix.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 8 (bank-src.js unit banners).
    "math-2202": ("Math 2202",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 7 (bank-src.js unit banners), then the
    # November 9, 2026 unit test pool fix additions (bank-fix.js);
    # the source's CR_MARKS literal (bank-src.js line 4894) is
    # carried as the per-file CRMARKS manifests.
    "math-1201": ("Math 1201",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-fix.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 7 (bank-src.js unit banners); the source's
    # CR_MARKS literal (bank-src.js line 4285) is carried as the
    # per-file CRMARKS manifests.
    "math-1202": ("Math 1202",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-pk.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 4, then the November 7, 2026 top-up tranche
    # for Units 1 to 4, then the final-scope tranche (Units 5 to
    # 9), then the November 9, 2026 pool-gap fill additions
    # (bank-fix.js); the source's CR_MARKS literal (bank-src.js
    # line 6409) is carried as the per-file CRMARKS manifests.
    "math-9": ("Math 9",
               ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                "bank-u3.js", "bank-u4.js", "bank-u1-topup.js",
                "bank-u2-topup.js", "bank-u3-topup.js",
                "bank-u4-topup.js", "bank-u5.js", "bank-u6.js",
                "bank-u7.js", "bank-u8.js", "bank-u9.js",
                "bank-fix.js", "bank-pk.js"]),
    # Build order mirrors the English Math 9 port and the French
    # standalone bank source's own order: helpers (the fork's chassis
    # number-format helpers plus the bank source head), Units 1 to 4,
    # the Unit 1 to 4 top-ups, Units 5 to 9, then the pool-gap fill
    # additions (bank-fix.js); the source's CR_MARKS literal (bank-
    # src.js line 6685) is carried as the per-file CRMARKS manifests.
    "math-9-fr": ("Math 9 (French)",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u1-topup.js",
                   "bank-u2-topup.js", "bank-u3-topup.js",
                   "bank-u4-topup.js", "bank-u5.js", "bank-u6.js",
                   "bank-u7.js", "bank-u8.js", "bank-u9.js",
                   "bank-fix.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 8 (bank-src.js unit banners), then the
    # November 9, 2026 pool-gap fill additions (bank-fix.js);
    # the source's CR_MARKS literal (bank-src.js line 4668) is
    # carried as the per-file CRMARKS manifests.
    "math-8": ("Math 8",
               ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                "bank-u3.js", "bank-u4.js", "bank-u5.js",
                "bank-u6.js", "bank-u7.js", "bank-u8.js",
                "bank-fix.js", "bank-pk.js"]),
    # Build order is the standalone bank source's own: helpers,
    # then Units 1 to 8 (bank-src.js unit banners), then the
    # November 9, 2026 pool-gap fill additions (bank-fix.js);
    # the source's CR_MARKS literal (bank-src.js line 4470) is
    # carried as the per-file CRMARKS manifests.
    "math-7": ("Math 7",
               ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                "bank-u3.js", "bank-u4.js", "bank-u5.js",
                "bank-u6.js", "bank-u7.js", "bank-u8.js",
                "bank-fix.js"]),
    # Same build order as the English courses: helpers (the fork's
    # chassis number-format helpers plus the bank source head), then
    # Units 1 to 8, then the pool-gap fill additions; the French
    # sources' CR_MARKS literals (math-8-review-fr/bank-src.js line
    # 4992, math-7-review-fr/bank-src.js line 4759) are carried as
    # the per-file CRMARKS manifests, copied from the English slices
    # (the French banks are signature-identical entry for entry).
    "math-8-fr": ("Math 8 (French)",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-fix.js"]),
    "math-7-fr": ("Math 7 (French)",
                  ["bank-helpers.js", "bank-u1.js", "bank-u2.js",
                   "bank-u3.js", "bank-u4.js", "bank-u5.js",
                   "bank-u6.js", "bank-u7.js", "bank-u8.js",
                   "bank-fix.js"]),
}

course_id = sys.argv[1] if len(sys.argv) > 1 else "physics-3204"
if course_id not in COURSES:
    raise SystemExit(f"unknown course: {course_id}")
display, files = COURSES[course_id]
SRC = ROOT / "banks" / course_id

parts = []
crmarks = {}
for name in files:
    text = (SRC / name).read_text(encoding="utf-8")
    for m in re.finditer(r'//\s*CRMARKS:\s*([A-Za-z0-9\-]+)=(\d+)', text):
        crmarks[m.group(1)] = int(m.group(2))
    parts.append(f"/* ----- {name} ----- */\n" + text.strip())

cr_items = ",".join(f'"{k}":{v}' for k, v in sorted(crmarks.items()))
tail = ("/* ============ Constructed-response marks (generated) ============ */\n"
        "/* Built by assemble-bank.py from the CRMARKS manifests at the top of\n"
        "   each unit file. Exam Section B draws only from these entries. */\n"
        f"window.__BANK_CRMARKS={{{cr_items}}};")

header = (f"/* {display} bank module for the unified review app shell.\n"
          f"   Assembled by assemble-bank.py from banks/{course_id}/; edit the\n"
          "   per-unit sources there, not this file. Entries register through\n"
          "   the shell's E(id, unit, indicators, level, kind, gen). */")

out = header + "\n\n" + "\n\n".join(parts) + "\n\n" + tail + "\n"
dest = ROOT / "banks" / f"{course_id}.js"
dest.write_text(out, encoding="utf-8")
print(f"wrote {dest} ({len(out)} chars); CR_MARKS entries: {len(crmarks)}")
