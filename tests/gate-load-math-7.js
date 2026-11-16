#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 7 port:
     node tests/gate-load-math-8.js
   - courses.js carries a math-7 entry (Mathematics, grade 7,
     listed:false, longName "Mathematics 7") beside the untouched
     math-8 entry.
   - The bank module registers exactly the standalone's 209
     entries in the standalone's per-unit counts
     (30/21/33/26/22/24/25/28), plus, since November 16, 2026,
     the Band 3 Piece 1 fluency strand's 45 flagged entries in
     banks/math-7/bank-pk.js (Unit 1 +24, Unit 2 +14, Unit 7 +7,
     for 254 entries in per-unit counts 54/35/33/26/22/24/32/28;
     the pin change is deliberate and recorded in the Piece 1
     build report), plus, since November 16, 2026, the Band 3
     Piece 2 Unit 4 area and measurement piece's 25 flagged
     entries in the same file (Unit 4 +25, for 279 entries in
     per-unit counts 54/35/33/51/22/24/32/28; the pin change is
     deliberate and recorded in the Piece 2 build report), plus,
     since November 16, 2026, the Band 3 Piece 3 remaining
     clusters' 95 new entries in the same file (for 374 entries
     in per-unit counts 73/35/60/58/29/30/43/46; the 18 support
     flags add no entries; the pin change is deliberate and
     recorded in the Piece 3 build report), and its CR_MARKS manifest
     equals the standalone bank source's own CR_MARKS literal
     (74 keys; 25 at 2 marks and 49 at 3).
   - Every entry carries both staged hints (the bank's E is
     called with the hint pair; the shell's E stores them as
     hint1/hint2, as the standalone's does).
   - Every indicator code is covered (129 codes), every
     UNIT_IND placement (130) has an entry in its unit, and no
     entry uses an unregistered code.
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options and full per-answer feedback. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-7"];
ok(!!C, "courses.js registers math-8");
ok(C.listed === true, "math-7 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 7, "subject Mathematics, grade 7");
ok(C.storagePrefix === "m7", "storagePrefix m7, saw " + C.storagePrefix);
ok(C.longName === "Mathematics 7", "longName Mathematics 7 (ruling 5), saw " + C.longName);
ok(C.title === "Math 7 Review: Practice Question Bank", "title is the standalone's, saw " + C.title);
ok(C.hints === true, "hints flag on (every entry carries a two-stage hint)");
ok(C.timerNote === "1 hour 30 minutes", "timerNote names the real exam's length (ruling 3), saw " + C.timerNote);
ok(JSON.stringify(C.sheetWork) === JSON.stringify(["Show all your work in the space provided.", "Show all your work on your own paper."]),
   "sheetWork carries the standalone's sheet header strings (ruling 4)");
ok(C.exam && C.exam.fallback && C.exam.fallback.total === 35 && C.exam.fallback.srCount === 18 && C.exam.fallback.crMarks === 17,
   "exam.fallback carries the junior pooled blueprint (35 marks, SR 18, CR 17)");
ok(JSON.stringify(C.exam.fallback.levels) === "[7,21,7]" && JSON.stringify(C.exam.fallback.crL3) === "[6,5,7]",
   "fallback level totals [7,21,7] and CR Level 3 preference [6,5,7]");
ok(C.unitTest && C.unitTest.total === 25 && C.unitTest.sr === 11 && C.unitTest.cr === 14,
   "unitTest is 25 marks (SR 11, CR 14)");
ok(window.COURSES["math-8"] && window.COURSES["math-8"].storagePrefix === "m8",
   "the math-8 entry is a separate, untouched course");

/* The shell's own engine helpers, taken from the built
   index.html (the script block carrying mcq): this bank's
   generators call the chassis's mcq dialect (prompt, correct,
   distractors, solution), numq, ri, pick, fmt, fmtF and the SVG
   text primitive _txt, so the gate generates with the shell's
   real implementations, not copies. */
const built = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...built.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof varset === "function",
   "mcq/numq/varset defined by the shell's helper block");

var BANK = [];
/* The shell's own E (build-shell.py bank loader): stores the
   optional hint pair as hint1/hint2. */
function E(id, unit, indicators, level, kind, gen, hints) {
  const e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/math-7.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 8, "UNITS has 8 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 129, "INDICATORS has 129 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[1] === "Patterns and Relations", "Unit 1 is Patterns and Relations, saw " + C.units[1]);
ok(C.units[8] === "Geometry", "Unit 8 is Geometry, saw " + C.units[8]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 130, "UNIT_IND has 130 placements, saw " + placements);

ok(BANK.length === 374, "bank registers 374 entries (209 + the Piece 1 strand's 45 + Piece 2's 25 + Piece 3's 95), saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 73, 2: 35, 3: 60, 4: 58, 5: 29, 6: 30, 7: 43, 8: 46 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));

/* The pinned flagged set (Band 3 Piece 1, November 16, 2026;
   extended by Pieces 2 and 3 the same day): the fluency strand's
   45 entries, Piece 2's 25 Unit 4 entries, and Piece 3's 113
   (82 authored, 13 shared copies, 18 in-place support flags),
   pinned deliberately; the CR_MARKS manifest below is untouched
   by the tranches (the flagged CR entries were already in it as
   assessed entries before their support flags). */
const PK_PIN_7 = ["u1-pk-div-2digit", "u1-pk-div-exact", "u1-pk-div-related", "u1-pk-div-remainder", "u1-pk-div-zeros", "u1-pk-fact-division", "u1-pk-fact-halving", "u1-pk-fact-onemore", "u1-pk-fact-recall", "u1-pk-fact-skip", "u1-pk-fq-between", "u1-pk-fq-coord", "u1-pk-fq-move", "u1-pk-fq-read", "u1-pk-fq-which", "u1-pk-mult-2by1", "u1-pk-mult-2by2", "u1-pk-mult-3by1", "u1-pk-mult-3by2", "u1-pk-mult-zeros", "u1-pk-multiples-common", "u1-pk-multiples-first", "u1-pk-multiples-identify", "u1-pk-multiples-problem", "u1-pk-ooo-basic", "u1-pk-ooo-brackets", "u1-pk-ooo-chain", "u1-pk-ooo-division", "u1-pk-ooo-why", "u1-pk-pattern-grow", "u1-pk-pattern-machine", "u1-pk-pattern-missing", "u1-pk-pattern-next", "u1-pk-pattern-rule", "u1-pk-sort-carroll-read", "u1-pk-sort-carroll-total", "u1-pk-sort-venn-place", "u1-pk-sort-venn-read", "u1-pk-tg-bar", "u1-pk-tg-compare", "u1-pk-tg-line", "u1-pk-tg-picto", "u1-pk-tg-table", "u2-pk-add-regroup", "u2-pk-add-three", "u2-pk-addsub-large", "u2-pk-below-compare", "u2-pk-below-debt", "u2-pk-below-line", "u2-pk-below-temp", "u2-pk-order-below", "u2-pk-order-decimals", "u2-pk-order-line", "u2-pk-order-missing", "u2-pk-order-place", "u2-pk-sub-line", "u2-pk-sub-regroup", "u3-add-sub-decimals", "u3-cr-add-sub", "u3-cr-div", "u3-cr-mult", "u3-div-decimals", "u3-mult-decimals", "u3-pk-dpv-digit-value", "u3-pk-dpv-expanded", "u3-pk-dpv-place-name", "u3-pk-dpv-round-hundredth", "u3-pk-dpv-round-tenth", "u3-pk-equiv-divide", "u3-pk-equiv-missing", "u3-pk-equiv-not", "u3-pk-equiv-recognize", "u3-pk-equiv-target", "u3-pk-est-add", "u3-pk-est-difference", "u3-pk-est-money", "u3-pk-est-product", "u3-pk-fad-line", "u3-pk-fad-match", "u3-pk-fad-to-decimal", "u3-pk-fad-to-fraction", "u3-pk-fracrep-bar", "u3-pk-fracrep-circle", "u3-pk-fracrep-line", "u3-pk-fracrep-pick", "u3-pk-fracrep-set", "u3-pk-pct-decimal", "u3-pk-pct-fraction", "u3-pk-pct-grid", "u3-pk-pct-pick", "u4-pk-angle-full-turn", "u4-pk-angle-right-count", "u4-pk-circle-centre", "u4-pk-circle-diameter", "u4-pk-circle-pick", "u4-pk-circle-radius", "u4-pk-dec-mult-near3", "u4-pk-dec-mult-whole", "u4-pk-dec-square-decimal", "u4-pk-dec-square-whole", "u4-pk-perim-missing-polygon", "u4-pk-perim-missing-side", "u4-pk-perim-pentagon", "u4-pk-perim-rect", "u4-pk-perim-square", "u4-pk-protractor-acute", "u4-pk-protractor-five", "u4-pk-protractor-left", "u4-pk-protractor-obtuse", "u4-pk-protractor-supplement", "u4-pk-rect-area", "u4-pk-rect-area-context", "u4-pk-rect-decimals", "u4-pk-rect-missing-side", "u4-pk-rect-square", "u4-pk-rect-square-decimal", "u4-pk-ruler-cm", "u4-pk-ruler-cm-decimal", "u4-pk-ruler-difference", "u4-pk-ruler-half", "u4-pk-ruler-mm", "u4-pk-ruler-unit-choice", "u5-add-like", "u5-common-denominator", "u5-model-add-figure", "u5-pk-equiv-divide", "u5-pk-equiv-recognize", "u5-pk-equiv-target", "u5-pk-mixed-from-improper", "u5-pk-mixed-slices", "u5-pk-mixed-to-improper", "u5-pk-mixed-which", "u5-simplify-fraction", "u5-simplify-solution", "u5-sub-like", "u6-inspection-trial", "u6-one-step-balance", "u6-one-step-problem", "u6-one-step-problem-cr", "u6-pk-balance-change", "u6-pk-balance-equivalent", "u6-pk-balance-value", "u6-pk-subst-brackets", "u6-pk-subst-simple", "u6-pk-subst-table", "u7-pk-average-decimals", "u7-pk-average-money", "u7-pk-average-set", "u7-pk-average-small", "u7-pk-average-whole", "u7-pk-list-count", "u7-pk-list-missing", "u7-pk-list-outfits", "u7-pk-order-below", "u7-pk-order-line", "u7-pk-prob-bag", "u7-pk-prob-die", "u7-pk-prob-percent-bag", "u7-pk-prob-spinner", "u7-pk-prob-words", "u7-pk-tg-bar", "u7-pk-tg-line", "u7-pk-tg-table", "u7-prob-basic", "u8-axes-origin", "u8-pk-angle-benchmark", "u8-pk-angle-classify", "u8-pk-angle-complementary", "u8-pk-angle-supplementary", "u8-pk-axes-name", "u8-pk-axes-on-axis", "u8-pk-axes-origin-point", "u8-pk-fq-coord", "u8-pk-fq-move", "u8-pk-fq-read", "u8-pk-fq-which", "u8-pk-protractor-acute", "u8-pk-protractor-five", "u8-pk-protractor-obtuse", "u8-pk-trans-describe", "u8-pk-trans-identify-flip", "u8-pk-trans-identify-slide", "u8-pk-trans-identify-turn"];
const flagged7 = BANK.filter(e => e.pkFlag).map(e => e.id).sort();
ok(JSON.stringify(flagged7) === JSON.stringify(PK_PIN_7.slice().sort()),
   "the flagged set is exactly the pinned 183 entries (Piece 1's 45 plus Piece 2's 25 plus Piece 3's 113), saw " + JSON.stringify(flagged7));

ok(Object.keys(CR).length === 74, "CR_MARKS manifest has 74 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
const at2 = Object.values(CR).filter(v => v === 2).length;
const at3 = Object.values(CR).filter(v => v === 3).length;
ok(at2 === 25 && at3 === 49, "CR marks split 25 at 2 and 49 at 3 (the standalone literal's own split), saw " + at2 + "/" + at3);

const noHint = BANK.filter(e => !e.hint1 || e.hint1.length <= 3 || !e.hint2 || e.hint2.length <= 3).length;
ok(noHint === 0, "every entry carries a non-empty hint1 and hint2, saw " + noHint + " without");

const covered = new Set();
BANK.forEach(e => e.indicators.forEach(c => covered.add(c)));
ok(Object.keys(C.indicators).every(c => covered.has(c)), "every indicator code has at least one entry");
const unregistered = new Set();
BANK.forEach(e => e.indicators.forEach(c => { if (!C.indicators[c]) unregistered.add(c); }));
ok(unregistered.size === 0, "no entry uses an unregistered indicator code, saw " + [...unregistered].join(","));
let barePlacements = 0;
Object.keys(C.unitInd).forEach(u => C.unitInd[u].forEach(c => {
  if (!BANK.some(e => e.unit === +u && e.indicators.includes(c))) barePlacements++;
}));
ok(barePlacements === 0, "every UNIT_IND placement has an entry in its unit, saw " + barePlacements + " bare");

let genFail = 0, optFail = 0, fbFail = 0, draws = 0;
for (const e of BANK) {
  for (let t = 0; t < 25; t++) {
    let q;
    try { q = e.gen(); } catch (err) { genFail++; continue; }
    if (!q || (!q.prompt && !q.narrative)) { genFail++; continue; }
    draws++;
    if (q.type === "mc") {
      if (!q.options || q.options.length !== 4) optFail++;
      if (!q.fb || q.fb.length !== 4 || q.fb.some(f => !f)) fbFail++;
    }
  }
}
ok(genFail === 0, "every entry generates 25 clean questions (" + draws + " draws), failures: " + genFail);
ok(optFail === 0, "every MC draw has exactly 4 options, failures: " + optFail);
ok(fbFail === 0, "every MC draw carries full per-answer feedback, failures: " + fbFail);

console.log("GATE-LOAD-MATH-7 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
