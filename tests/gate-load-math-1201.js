#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 1201 port:
     node tests/gate-load-math-1201.js
   - courses.js carries a math-1201 entry (Mathematics, grade 10,
     listed); the same-numbered math-2202 and chem-2202 entries
     are separate and untouched.
   - The bank module registers 227 entries: the standalone's 149
     in their per-unit counts, kind and level censuses, plus three
     Level 2 CR entries authored Nov 13, 2026 for Unit 7
     (u7-rope-angle, u7-ramp-run, u7-brace-leftover), one
     Level 2 CR entry authored Nov 13, 2026 for Unit 3
     (u3-factorable-k, the find-all-k reverse factoring entry
     from build order step 4), and two Level 2 CR entries authored
     Nov 13, 2026 for Unit 6 (u6-mixture, u6-travel, the scenario
     harvest of build order step 9), which also extend the CR_MARKS
     manifest past the standalone bank source's own CR_MARKS
     literal (bank-src.js line 4940):
     79 keys, denominations 1x1, 2x48, 3x29, 4x1, marks sum 188;
     plus the 72 prior knowledge entries of the Nov 15, 2026 PK
     tranche (70 borrowed placements and 2 authored, all flagged
     with pkSrc, pkFor and pkGroup; the ordinary per-unit counts
     reproduce the pre-tranche bank exactly).
   - Every indicator code is covered, every UNIT_IND placement
     (118 over the 118 codes) has an entry in its unit, and no
     entry uses an unregistered code.
   - Standalone parity facts: no entry carries a PK-coded
     indicator (the PK tranche's flagged entries carry ordinary
     host tags) and none carries a postMid flag (the standalone's
     selection-engine note, index.html lines 5785 to 5790).
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-1201"];
ok(!!C, "courses.js registers math-1201");
ok(C.listed === true, "math-1201 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 10, "subject Mathematics, grade 10");
ok(C.storagePrefix === "m1201", "storagePrefix m1201, saw " + C.storagePrefix);
ok(window.COURSES["math-2202"] && window.COURSES["math-2202"].grade === 11 &&
   window.COURSES["chem-2202"] && window.COURSES["chem-2202"].subject === "Science",
   "the math-2202 and chem-2202 entries are separate, untouched courses");

/* The shell's own engine helpers, taken from the built
   index.html (the script block carrying mcq): this bank's
   generators call the chassis's mcq dialect (prompt, correct,
   distractors, solution), numq, ri, pick, fmt and the SVG
   helpers, so the gate generates with the shell's real
   implementations, not copies. */
const built = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...built.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function",
   "mcq/numq defined by the shell's helper block");

var BANK = [];
/* The shell's own E (build-shell.py bank loader), six-argument
   form: the pre-tranche entries carry no hint pair; the PK
   tranche's borrowed entries pass a hint pair as a seventh
   argument, which this stub does not need and ignores. The
   tranche's metadata postludes run inside the bank module and
   set pkFlag, pkSrc, pkFor and pkGroup on the entry objects. */
function E(id, unit, indicators, level, kind, gen) {
  BANK.push({ id, unit, indicators, level, kind, gen });
}
eval(fs.readFileSync(ROOT + "/banks/math-1201.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 7, "UNITS has 7 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 118, "INDICATORS has 118 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[1] === "Measurement", "Unit 1 is Measurement, saw " + C.units[1]);
ok(C.units[7] === "Trigonometry", "Unit 7 is Trigonometry, saw " + C.units[7]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 118, "UNIT_IND has 118 placements, saw " + placements);

ok(BANK.length === 227, "bank registers 227 entries, saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 41, 2: 40, 3: 26, 4: 43, 5: 35, 6: 20, 7: 22 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));
const kinds = {};
BANK.forEach(e => { kinds[e.kind] = (kinds[e.kind] || 0) + 1; });
ok(kinds.gen === 188 && kinds.var === 39, "kind census gen 188 / var 39, saw " + JSON.stringify(kinds));
const levels = {};
BANK.forEach(e => { levels[e.level] = (levels[e.level] || 0) + 1; });
ok(levels[1] === 122 && levels[2] === 75 && levels[3] === 30,
   "level census 122/75/30, saw " + JSON.stringify(levels));

/* The Nov 15, 2026 prior knowledge tranche: exactly the pinned
   72 IDs are flagged, each with provenance metadata, and the
   ordinary partition reproduces the pre-tranche bank per unit. */
const PK_IDS = ["u1-pk-area-circle", "u1-pk-circumference", "u1-pk-estimate-count", "u1-pk-estimate-reasonable", "u1-pk-frac-context", "u1-pk-money-decimals", "u1-pk-overlap", "u1-pk-pythag-model", "u1-pk-ratio-problem", "u1-pk-sa-composite", "u1-pk-sa-cylinder", "u1-pk-sa-from-net", "u1-pk-sa-problem", "u1-pk-sa-rect-prism", "u1-pk-sa-tri-prism", "u1-pk-unit-rate-cost", "u1-pk-vol-cylinder", "u1-pk-vol-rect-prism", "u1-pk-vol-tri-prism", "u2-pk-between-two", "u2-pk-decimal-to-fraction", "u2-pk-divisible-by", "u2-pk-estimate-between", "u2-pk-evaluate-power", "u2-pk-factor-list", "u2-pk-factors-root", "u2-pk-frac-to-decimal", "u2-pk-order-four", "u2-pk-parentheses-sign", "u2-pk-product-law", "u2-pk-repeated-mult", "u2-pk-root-between", "u2-pk-sqrt-perfect", "u2-pk-square-of-number", "u2-pk-sum-of-powers", "u2-pk-two-laws", "u3-pk-add", "u3-pk-addsub-xy", "u3-pk-degree", "u3-pk-divide-monomial", "u3-pk-multiply-monomial", "u3-pk-parts", "u3-pk-subtract", "u4-pk-evaluate-expression", "u4-pk-graph-describe", "u4-pk-interpolate", "u4-pk-pattern-figure", "u4-pk-pattern-word", "u4-pk-point-on-graph", "u4-pk-solve-two-step", "u4-pk-table-equation", "u5-pk-construct-graph", "u5-pk-express-rate", "u5-pk-graph-equation", "u5-pk-pattern-solve-n", "u5-pk-rate-problem", "u5-pk-two-term-ratio", "u5-pk-which-is-solution", "u5-pk-word-two-step", "u6-pk-balance-model", "u6-pk-break-even", "u6-pk-context-equation", "u6-pk-solve-two-step", "u6-pk-table-equation", "u6-pk-which-is-solution", "u7-pk-draw-similar", "u7-pk-hypotenuse", "u7-pk-is-right", "u7-pk-ladder-context", "u7-pk-missing-leg", "u7-pk-similar-context", "u7-pk-similar-verdict"];
const flagged = BANK.filter(e => e.pkFlag);
ok(flagged.length === 72, "72 entries are flagged prior knowledge, saw " + flagged.length);
ok(JSON.stringify(flagged.map(e => e.id).sort()) === JSON.stringify(PK_IDS),
   "the flagged set is exactly the tranche's pinned 72 IDs");
ok(flagged.every(e => typeof e.pkSrc === "string" && e.pkSrc.length > 0 &&
   Array.isArray(e.pkFor) && e.pkFor.length > 0 && typeof e.pkGroup === "string" && e.pkGroup.length > 0),
   "every flagged entry carries pkSrc, pkFor and pkGroup");
ok(flagged.every(e => e.pkFor.every(c => !!C.indicators[c])),
   "every pkFor code is a registered indicator of this course");
const wantOrdinary = { 1: 22, 2: 23, 3: 19, 4: 35, 5: 27, 6: 14, 7: 15 };
Object.keys(wantOrdinary).forEach(u => {
  const n = BANK.filter(e => e.unit === +u && !e.pkFlag).length;
  ok(n === wantOrdinary[u], "Unit " + u + " ordinary count reproduces the pre-tranche bank (" + wantOrdinary[u] + "), saw " + n);
});

ok(Object.keys(CR).length === 79, "CR_MARKS manifest has 79 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === BANK.length, "entry ids are unique");
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
const den = {};
Object.values(CR).forEach(v => { den[v] = (den[v] || 0) + 1; });
ok(den[1] === 1 && den[2] === 48 && den[3] === 29 && den[4] === 1,
   "CR denominations 1x1, 2x48, 3x29, 4x1, saw " + JSON.stringify(den));
ok(Object.values(CR).reduce((a, b) => a + b, 0) === 188, "CR marks sum to 188");
/* Per unit, the exam-eligible CR pool (marks 2+, Level 2+) must
   be able to carry the 14-mark unit-test Section B. */
for (let u = 1; u <= 7; u++) {
  const elig = BANK.filter(e => e.unit === u && CR[e.id] !== undefined && CR[e.id] >= 2 && e.level >= 2);
  const sum = elig.reduce((a, e) => a + CR[e.id], 0);
  ok(sum >= 14, "Unit " + u + ": exam-eligible CR marks sum to at least 14, saw " + sum + " over " + elig.length + " entries");
}

ok(BANK.every(e => !e.indicators.some(c => String(c).indexOf("PK") === 0)),
   "no entry carries a PK-coded indicator (standalone parity)");
ok(BANK.every(e => !e.postMid), "no entry carries a postMid flag (standalone parity)");

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

let genFail = 0, optFail = 0, draws = 0;
for (const e of BANK) {
  for (let t = 0; t < 25; t++) {
    let q;
    try { q = e.gen(); } catch (err) { genFail++; continue; }
    if (!q || (!q.prompt && !q.narrative)) { genFail++; continue; }
    draws++;
    if (q.type === "mc" && (!q.options || q.options.length !== 4)) optFail++;
  }
}
ok(genFail === 0, "every entry generates 25 clean questions (" + draws + " draws), failures: " + genFail);
ok(optFail === 0, "every MC draw has exactly 4 options, failures: " + optFail);

console.log("GATE-LOAD-MATH-1201 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
