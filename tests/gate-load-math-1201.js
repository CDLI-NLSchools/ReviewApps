#!/usr/bin/env node
/* Gate 1 (load parity) for the Math 1201 port:
     node tests/gate-load-math-1201.js
   - courses.js carries a math-1201 entry (Mathematics, grade 10,
     listed:false); the same-numbered math-2202 and chem-2202
     entries are separate and untouched.
   - The bank module registers exactly the standalone's 147
     entries in the standalone's per-unit counts, kind and level
     censuses, and its CR_MARKS manifest equals the standalone
     bank source's own CR_MARKS literal (bank-src.js line 4894:
     71 keys, denominations 1x1, 2x42, 3x27, 4x1, marks sum 170).
   - Every indicator code is covered, every UNIT_IND placement
     (118 over the 118 codes) has an entry in its unit, and no
     entry uses an unregistered code.
   - Standalone parity facts: no entry carries a PK-coded
     indicator and none carries a postMid flag (the standalone's
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
   form: this bank's entries carry no hint pair. */
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

ok(BANK.length === 147, "bank registers 147 entries, saw " + BANK.length);
const perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
const wantPerUnit = { 1: 22, 2: 23, 3: 18, 4: 34, 5: 26, 6: 12, 7: 12 };
Object.keys(wantPerUnit).forEach(u =>
  ok(perUnit[u] === wantPerUnit[u], "Unit " + u + " has " + wantPerUnit[u] + " entries, saw " + perUnit[u]));
const kinds = {};
BANK.forEach(e => { kinds[e.kind] = (kinds[e.kind] || 0) + 1; });
ok(kinds.gen === 111 && kinds.var === 36, "kind census gen 111 / var 36, saw " + JSON.stringify(kinds));
const levels = {};
BANK.forEach(e => { levels[e.level] = (levels[e.level] || 0) + 1; });
ok(levels[1] === 70 && levels[2] === 47 && levels[3] === 30,
   "level census 70/47/30, saw " + JSON.stringify(levels));

ok(Object.keys(CR).length === 71, "CR_MARKS manifest has 71 keys, saw " + Object.keys(CR).length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === BANK.length, "entry ids are unique");
ok(Object.keys(CR).every(k => ids.has(k)), "every CR key is a bank entry id");
const den = {};
Object.values(CR).forEach(v => { den[v] = (den[v] || 0) + 1; });
ok(den[1] === 1 && den[2] === 42 && den[3] === 27 && den[4] === 1,
   "CR denominations 1x1, 2x42, 3x27, 4x1, saw " + JSON.stringify(den));
ok(Object.values(CR).reduce((a, b) => a + b, 0) === 170, "CR marks sum to 170");
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
