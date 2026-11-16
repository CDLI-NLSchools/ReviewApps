#!/usr/bin/env node
/* Gate 2 (composer parity) for the Math 1202 port:
     node tests/gate-compose-math-1202.js
   Drives the shell's composer functions, extracted by name from
   the built index.html, with the Math 1202 configuration and
   bank, and checks they reproduce the standalone composer's
   blueprint (math-1202-review/index.html, TEST_ constants at
   lines 6196 to 6199, composeExam at lines 6208 to 6257):
   - single-unit practice tests only: a multi-unit selection
     composes nothing;
   - each unit test over 200 trials is exactly 30 marks: 15
     selected-response questions at the exact level split 3/9/3,
     plus six constructed-response questions with marks
     2, 2, 2, 3, 3, 3 summing to 15, at least one of them
     Level 3, and nothing flagged short;
   - the shell's examShortNow agrees with the standalone's
     (SR under 15, or CR under 15, on a single-unit paper,
     its line 5862). */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-1202"];
global.window.__COURSE = C;

/* The shell's own engine helpers, taken from the built
   index.html (the script block carrying mcq): the bank's
   generators call the chassis's mcq dialect, numq, ri, pick,
   fmt, fmtF, _txt and shuffle, so generation runs on the
   shell's real implementations, not copies. */
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));

/* --- bank registration (the shell's loader shape) --- */
var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  const e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/math-1202.js", "utf8"));
var CR_MARKS = window.__BANK_CRMARKS;
var _probeCache = {};

/* --- the composer's functions, extracted from the built shell --- */
function extractFn(src, name) {
  const start = src.indexOf("function " + name + "(");
  if (start < 0) throw new Error("missing function " + name);
  let i = src.indexOf("{", start), depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  throw new Error("unbalanced " + name);
}
for (const n of ["isPK", "poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam", "examLive", "examShortNow"]) eval(extractFn(html, n)); /* isPK extracted since the PK tranche (Nov 16, 2026) set pkPracticeOnly: poolFor now references it */
ok(typeof composeExam === "function", "built shell carries composeExam");

/* Pool shapes the config implies. Practice pools carry the PK
   tranche's flagged entries (November 16, 2026) and the bridge
   follow-up's 2 Unit 2 bridge entries (same day); composed papers
   exclude them under pkPracticeOnly, which the trials below
   exercise. */
ok(poolFor([1, 2, 3, 4, 5, 6, 7], [], {}).length === 238,
   "All-units pool is the whole bank (238), saw " + poolFor([1, 2, 3, 4, 5, 6, 7], [], {}).length);
const wantPool = { 1: 36, 2: 37, 3: 33, 4: 30, 5: 36, 6: 30, 7: 36 };
for (let u = 1; u <= 7; u++) {
  const n = poolFor([u], [], {}).length;
  ok(n === wantPool[u], "Unit " + u + " pool is " + wantPool[u] + ", saw " + n);
}

function lvl(items, n) { return items.filter(x => x.q._entry.level === n).length; }

for (let u = 1; u <= 7; u++) {
  let exact = 0, exactNoL3 = 0, other = 0;
  for (let t = 0; t < 200; t++) {
    const ex = composeExam([u], []);
    if (!ex) { other++; continue; }
    const marks = ex.crItems.map(x => x.marks).slice().sort((a, b) => a - b);
    const hasL3 = ex.crItems.some(x => x.q._entry.level === 3);
    const shape = ex.short === false && ex.srMarks === 15 && ex.crMarks === 15 &&
      ex.total === 30 && ex.single === true &&
      lvl(ex.srItems, 1) === 3 && lvl(ex.srItems, 2) === 9 && lvl(ex.srItems, 3) === 3 &&
      ex.crItems.length === 6 && marks.join(",") === "2,2,2,3,3,3";
    if (shape && hasL3) exact++;
    else if (shape) exactNoL3++;
    else other++;
  }
  ok(exact >= 190, "Unit " + u + " test: exact 30-mark papers (SR 15 at 3/9/3, CR 2+2+2+3+3+3 with a Level 3), " + exact + "/200 (" + exactNoL3 + " exact without a Level 3 CR, " + other + " other)");
}

ok(composeExam([1, 2], []) === null, "a two-unit selection composes nothing (single-unit tests only)");
ok(composeExam([3, 4, 5], []) === null, "a three-unit selection composes nothing");
ok(composeExam([1, 2, 3, 4, 5, 6, 7], []) === null, "an all-units selection composes nothing");

function fakePaper(unit, srN, crMarksList) {
  const mk = (level, marks) => ({ q: { _entry: { unit, level } }, marks });
  return { single: true, srItems: Array.from({ length: srN }, () => mk(2, 1)), crItems: crMarksList.map(m => mk(3, m)) };
}
ok(examShortNow(fakePaper(1, 15, [2, 2, 2, 3, 3, 3])) === false, "examShortNow: a full 15 SR / CR 15 paper is not short");
ok(examShortNow(fakePaper(1, 15, [2, 2, 2, 3, 3])) === true, "examShortNow: CR under 15 is short");
ok(examShortNow(fakePaper(1, 14, [2, 2, 2, 3, 3, 3])) === true, "examShortNow: SR under 15 is short");

console.log("GATE-COMPOSE-MATH-1202 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
