#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 9 port:
     node tests/gate-load-math-9.js
   - courses.js carries a math-9 entry (Mathematics, grade 9,
     listed:false, longName "Mathematics 9") beside the untouched
     math-1202 entry.
   - The bank module registers the standalone's 221 entries in
     the standalone's per-unit counts (18/25/33/29/32/19/26/16/23)
     plus the Math 9 PK tranche's 73 entries (November 15, 2026;
     banks/math-9/bank-pk.js), for 294 entries in per-unit counts
     29/34/41/35/39/27/34/22/33, plus two ordinary Unit 9 entries
     (u9-gap-fix-the-survey-cr and u9-gap-decision-evidence-cr)
     added the same day under Jason's Option 1 ruling on the
     Math 8 PK tranche, because flagging the two expected count
     entries left Unit 9's exam-eligible CR pool short of its
     unit test target: 296 entries in per-unit counts
     29/34/41/35/39/27/34/22/35. Its CR_MARKS manifest equals
     the standalone bank source's own CR_MARKS literal plus the
     two Option 1 additions (111 keys; 45 at 2 marks and 66
     at 3).
   - Every entry carries both staged hints (the bank's E is
     called with the hint pair; the shell's E stores them as
     hint1/hint2, as the standalone's does).
   - Every indicator code is covered (108 codes), every
     UNIT_IND placement (108) has an entry in its unit, and no
     entry uses an unregistered code.
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options and full per-answer feedback. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-9"];
ok(!!C, "courses.js registers math-9");
ok(C.listed === true, "math-9 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 9, "subject Mathematics, grade 9");
ok(C.storagePrefix === "m9", "storagePrefix m9, saw " + C.storagePrefix);
ok(C.longName === "Mathematics 9", "longName Mathematics 9 (ruling 5), saw " + C.longName);
ok(C.title === "Math 9 Review: Practice Question Bank", "title is the standalone's, saw " + C.title);
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
ok(window.COURSES["math-1202"] && window.COURSES["math-1202"].subject === "Mathematics",
   "the math-1202 entry is a separate, untouched course");

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
eval(fs.readFileSync(ROOT + "/banks/math-9.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 9, "UNITS has 9 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 108, "INDICATORS has 108 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[1] === "Rational Numbers", "Unit 1 is Rational Numbers, saw " + C.units[1]);
ok(C.units[9] === "Probability and Statistics", "Unit 9 is Probability and Statistics, saw " + C.units[9]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 108, "UNIT_IND has 108 placements, saw " + placements);

ok(BANK.length === 296, "bank registers 296 entries, saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 29, 2: 34, 3: 41, 4: 35, 5: 39, 6: 27, 7: 34, 8: 22, 9: 35 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));

ok(Object.keys(CR).length === 111, "CR_MARKS manifest has 111 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
const at2 = Object.values(CR).filter(v => v === 2).length;
const at3 = Object.values(CR).filter(v => v === 3).length;
ok(at2 === 45 && at3 === 66, "CR marks split 45 at 2 and 66 at 3 (the standalone literal's own split plus the Option 1 pair at 3 each), saw " + at2 + "/" + at3);

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

console.log("GATE-LOAD-MATH-9 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
