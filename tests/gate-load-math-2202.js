#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 2202 port:
     node tests/gate-load-math-2202.js
   - courses.js carries a math-2202 entry (Mathematics, grade 11,
     listed:false) beside the untouched chem-2202 entry.
   - The bank module registers 255 entries (the standalone's
     194 plus the November 15, 2026 prior knowledge tranche's
     61 borrowed entries) in per-unit counts that keep the
     standalone's ordinary counts intact, and its CR_MARKS
     manifest equals the standalone bank source's own CR_MARKS
     literal (64 keys, every mark 2 or 3; the tranche adds no
     CR entry). The flagged prior knowledge set is the pinned
     65 (the tranche's 61 plus the four entries flagged on
     November 13, 2026), each carrying pkSrc, pkFor, pkGroup.
   - Every entry carries both staged hints (this bank's E is
     called with the hint pair; the shell's E stores them as
     hint1/hint2, as the standalone's does).
   - Every indicator code is covered, every UNIT_IND placement
     (103 over the 85 codes) has an entry in its unit, and no
     entry uses an unregistered code.
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options and full per-answer feedback. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-2202"];
ok(!!C, "courses.js registers math-2202");
ok(C.listed === true, "math-2202 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 11, "subject Mathematics, grade 11");
ok(C.storagePrefix === "m2202", "storagePrefix m2202, saw " + C.storagePrefix);
ok(window.COURSES["chem-2202"] && window.COURSES["chem-2202"].subject === "Science",
   "the chem-2202 entry is a separate, untouched course");

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
eval(fs.readFileSync(ROOT + "/banks/math-2202.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 8, "UNITS has 8 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 85, "INDICATORS has 85 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[8] === "Trigonometry", "Unit 8 is Trigonometry, saw " + C.units[8]);
ok(C.units[1] === "Drawing and Design", "Unit 1 is Drawing and Design, saw " + C.units[1]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 103, "UNIT_IND has 103 placements, saw " + placements);

ok(BANK.length === 255, "bank registers 255 entries, saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 31, 2: 36, 3: 40, 4: 27, 5: 23, 6: 34, 7: 38, 8: 26 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));

const PK_PIN_2202 = ["u1-pk-rotate-front", "u1-pk-rotate-predict", "u1-pk-rotated-side-view", "u1-pk-scale-draw", "u1-pk-scale-factor", "u2-pk-circle-area", "u2-pk-composite-area", "u2-pk-cylinder-sa", "u2-pk-error-analysis", "u2-pk-formula-manip", "u2-pk-imp-si-convert", "u2-pk-perimeter", "u2-pk-si-convert", "u2-pk-si-imp-convert", "u2-pk-surface-prism", "u3-pk-area-convert-adv", "u3-pk-area-imp-convert", "u3-pk-area-si-convert", "u3-pk-circumference", "u3-pk-find-leg", "u3-pk-holds-most", "u3-pk-tank-litres", "u3-pk-vol-base-height", "u3-pk-vol-cylinder", "u3-pk-vol-tri-prism", "u4-cr-percent-change", "u4-misleading-actual", "u4-pk-graph-describe", "u4-pk-graph-quantities", "u4-pk-graph-read", "u4-pk-interpolate", "u4-pk-line-graph", "u4-pk-missing-coord", "u4-pk-point-on-graph", "u5-pk-cpp-ei-tax", "u5-pk-deduction-calc", "u5-pk-gross-overtime", "u5-pk-gross-tips", "u5-pk-hours-total", "u5-pk-net-pay", "u5-pk-percent-of-amount", "u6-pk-commission", "u6-pk-evaluate-power", "u6-pk-find-the-whole", "u6-pk-percent-change", "u6-pk-percent-change-cr", "u6-pk-percent-of-amount", "u6-pk-product-law", "u6-pk-two-laws", "u7-pk-corresponding-sides", "u7-pk-express-rate", "u7-pk-identify-rate", "u7-pk-rate-problem", "u7-pk-scale-apply", "u7-pk-similar-check", "u7-pk-similar-missing-side", "u7-pk-unit-rate-cost", "u8-choose-ratio-equation", "u8-cr-find-angle", "u8-pk-choose-ratio", "u8-pk-find-angle-num", "u8-pk-hypotenuse-rearrange", "u8-pk-reasonable", "u8-pk-sine-ratio-constant", "u8-pk-unknown-angle"];
const pkIds2202 = BANK.filter(e => e.pkFlag).map(e => e.id).sort();
ok(JSON.stringify(pkIds2202) === JSON.stringify(PK_PIN_2202), "the flagged prior knowledge set is the pinned 65, saw " + pkIds2202.length + " flagged");
ok(BANK.filter(e => e.pkFlag).every(e => e.pkSrc && e.pkFor && e.pkGroup), "every flagged entry carries pkSrc, pkFor and pkGroup");
ok(Object.keys(CR).length === 64, "CR_MARKS manifest has 64 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
ok(Object.values(CR).every(v => v === 2 || v === 3), "every CR mark is 2 or 3");
/* Per unit the standalone bank is built so a valid trio always
   exists: four 2-mark and four 3-mark CR entries at Level 2 or 3,
   the Level 3 CR entries split across both denominations. */
for (let u = 1; u <= 8; u++) {
  const crU = BANK.filter(e => e.unit === u && CR[e.id] !== undefined && e.level >= 2);
  const twos = crU.filter(e => CR[e.id] === 2).length;
  const threes = crU.filter(e => CR[e.id] === 3).length;
  const l3two = crU.some(e => CR[e.id] === 2 && e.level === 3);
  const l3three = crU.some(e => CR[e.id] === 3 && e.level === 3);
  ok(crU.length === 8 && twos === 4 && threes === 4,
     "Unit " + u + ": eight Level 2+ CR entries, four at 2 marks and four at 3, saw " + crU.length + "/" + twos + "/" + threes);
  ok(l3two && l3three, "Unit " + u + ": a Level 3 entry exists at both CR denominations");
}

const noHint = BANK.filter(e => !e.hint1 || !e.hint2).length;
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

console.log("GATE-LOAD-MATH-2202 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
