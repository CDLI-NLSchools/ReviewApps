#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 1202 port:
     node tests/gate-load-math-1202.js
   - courses.js carries a math-1202 entry (Mathematics, grade 10,
     listed:false) beside the untouched chem-2202 entry.
   - The bank module registers exactly the standalone's 182
     entries in the standalone's per-unit counts (238 entries
     since the November 16, 2026 PK tranche added 54 flagged
     prior knowledge entries and the same day's bridge follow-up
     added 2 bridge entries in Unit 2: per-unit 36/37/33/30/36/30/36),
     and its
     CR_MARKS manifest equals the standalone bank source's own
     CR_MARKS literal (56 keys; per unit six Level 2 entries at
     2/2/2/3/3/3 marks and two Level 3 at 2/3, the pattern the
     standalone's verify-bank.js reconciles).
   - Every entry carries both staged hints (this bank's E is
     called with the hint pair; the shell's E stores them as
     hint1/hint2, as the standalone's does).
   - Every indicator code is covered, every UNIT_IND placement
     (116 over the 96 codes) has an entry in its unit, and no
     entry uses an unregistered code.
   - Every entry generates 25 clean questions; a multiple-choice
     draw carries exactly 4 options and full per-answer feedback. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-1202"];
ok(!!C, "courses.js registers math-1202");
ok(C.listed === true, "math-1202 is listed (in the picker since Nov 12, 2026)");
ok(C.subject === "Mathematics" && C.grade === 10, "subject Mathematics, grade 10");
ok(C.storagePrefix === "m1202", "storagePrefix m1202, saw " + C.storagePrefix);
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
eval(fs.readFileSync(ROOT + "/banks/math-1202.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
if (typeof globalThis.CR_MARKS === "undefined") globalThis.CR_MARKS = CR;

ok(Object.keys(C.units).length === 7, "UNITS has 7 units, saw " + Object.keys(C.units).length);
ok(Object.keys(C.indicators).length === 96, "INDICATORS has 96 codes, saw " + Object.keys(C.indicators).length);
ok(C.units[1] === "Consumerism and Travel", "Unit 1 is Consumerism and Travel, saw " + C.units[1]);
ok(C.units[7] === "Trigonometry", "Unit 7 is Trigonometry, saw " + C.units[7]);
const placements = Object.values(C.unitInd).reduce((n, a) => n + a.length, 0);
ok(placements === 116, "UNIT_IND has 116 placements, saw " + placements);

ok(BANK.length === 238, "bank registers 238 entries (182 plus the PK tranche's 54 plus the bridge follow-up's 2), saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 36, 2: 37, 3: 33, 4: 30, 5: 36, 6: 30, 7: 36 }; /* PK tranche Nov 16, 2026: +10/+9/+8/+6/+7/+7/+7 flagged entries; bridge follow-up Nov 16, 2026: +2 in Unit 2 */
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));

ok(Object.keys(CR).length === 56, "CR_MARKS manifest has 56 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
ok(Object.values(CR).every(v => v === 2 || v === 3), "every CR mark is 2 or 3");
/* Per unit the standalone bank is built so a valid sextet always
   exists: eight CR entries, six at Level 2 with marks 2/2/2/3/3/3
   and two at Level 3 with marks 2/3, so three 2-mark and three
   3-mark entries at Level 2 or 3 can always be drawn, with a
   Level 3 among the possible picks. */
for (let u = 1; u <= 7; u++) {
  const crs = BANK.filter(e => e.unit === u && CR[e.id] !== undefined);
  const l2 = crs.filter(e => e.level === 2).map(e => CR[e.id]).sort((a, b) => a - b);
  const l3 = crs.filter(e => e.level === 3).map(e => CR[e.id]).sort((a, b) => a - b);
  ok(crs.length === 8 && JSON.stringify(l2) === "[2,2,2,3,3,3]" && JSON.stringify(l3) === "[2,3]",
     "Unit " + u + " CR pattern: 8 entries, L2 marks [2,2,2,3,3,3], L3 marks [2,3], saw " + crs.length + " / " + JSON.stringify(l2) + " / " + JSON.stringify(l3));
  const elig = crs.filter(e => e.level >= 2);
  ok(elig.filter(e => CR[e.id] === 2).length >= 3 && elig.filter(e => CR[e.id] === 3).length >= 3,
     "Unit " + u + ": at least three 2-mark and three 3-mark CR entries at Level 2 or 3");
}

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

console.log("GATE-LOAD-MATH-1202 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
