#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 8 port:
     node tests/gate-load-math-8.js
   - courses.js carries a math-8 entry (Mathematics, grade 8,
     listed:false, longName "Mathematics 8") beside the untouched
     math-9 entry.
   - The bank module registers 250 entries in per-unit counts
     33/27/30/30/41/27/30/32: the standalone's 193
     (27/21/23/23/34/19/22/24) plus the Math 8 PK tranche's 56
     flagged entries (November 15, 2026; banks/math-8/bank-pk.js)
     plus one ordinary Unit 7 entry (u7-critique-the-claim) added
     the same day under Jason's Option 1 ruling on the tranche,
     because pkPracticeOnly left Unit 7's exam-eligible CR pool
     short of its unit test target. Its CR_MARKS manifest equals
     the standalone bank source's own CR_MARKS literal plus that
     entry (90 keys; 34 at 2 marks and 56 at 3; the tranche
     carries no CR marks over).
   - Every entry carries both staged hints (the bank's E is
     called with the hint pair; the shell's E stores them as
     hint1/hint2, as the standalone's does).
   - Every indicator code is covered (109 codes), every
     UNIT_IND placement (109) has an entry in its unit, and no
     entry uses an unregistered code.
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options and full per-answer feedback. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-8"];
ok(!!C, "courses.js registers math-8");
ok(C.listed === true, "math-8 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 8, "subject Mathematics, grade 8");
ok(C.storagePrefix === "m8", "storagePrefix m8, saw " + C.storagePrefix);
ok(C.longName === "Mathematics 8", "longName Mathematics 8 (ruling 5), saw " + C.longName);
ok(C.title === "Math 8 Review: Practice Question Bank", "title is the standalone's, saw " + C.title);
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
ok(window.COURSES["math-9"] && window.COURSES["math-9"].storagePrefix === "m9",
   "the math-9 entry is a separate, untouched course");

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
eval(fs.readFileSync(ROOT + "/banks/math-8.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 8, "UNITS has 8 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 109, "INDICATORS has 109 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[1] === "Square Roots and the Pythagorean Theorem", "Unit 1 is Square Roots and the Pythagorean Theorem, saw " + C.units[1]);
ok(C.units[8] === "Geometry", "Unit 8 is Geometry, saw " + C.units[8]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 109, "UNIT_IND has 109 placements, saw " + placements);

ok(BANK.length === 250, "bank registers 250 entries, saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 33, 2: 27, 3: 30, 4: 30, 5: 41, 6: 27, 7: 30, 8: 32 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));

ok(Object.keys(CR).length === 90, "CR_MARKS manifest has 90 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
const at2 = Object.values(CR).filter(v => v === 2).length;
const at3 = Object.values(CR).filter(v => v === 3).length;
ok(at2 === 34 && at3 === 56, "CR marks split 34 at 2 and 56 at 3 (the standalone literal's own split plus the Option 1 entry at 3), saw " + at2 + "/" + at3);

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

console.log("GATE-LOAD-MATH-8 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
