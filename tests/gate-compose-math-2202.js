#!/usr/bin/env node
/* Gate 2 (composer parity) for the Math 2202 port:
     node tests/gate-compose-math-2202.js
   Drives the shell's composer functions, extracted by name from
   the built index.html, with the Math 2202 configuration and
   bank, and checks they reproduce the standalone composer's
   blueprint (math-2202-review/index.html, TEST_ constants at
   lines 6673 to 6676, composeExam at lines 6685 to 6731):
   - single-unit practice tests only: a multi-unit selection
     composes nothing;
   - each unit test over 200 trials is exactly 18 marks: 10
     selected-response questions at the exact level split 2/6/2,
     plus three constructed-response questions with marks 2, 3
     and 3 summing to 8, at least one of them Level 3, and
     nothing flagged short;
   - the shell's examShortNow agrees with the standalone's
     (SR under 10, or CR under 8, on a single-unit paper). */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["math-2202"];
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
eval(fs.readFileSync(ROOT + "/banks/math-2202.js", "utf8"));
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "composeExam", "examLive", "examShortNow"]) eval(extractFn(html, n));
ok(typeof composeExam === "function", "built shell carries composeExam");

/* Pool shapes the config implies. */
ok(poolFor([1, 2, 3, 4, 5, 6, 7, 8], [], {}).length === 255,
   "All-units pool is the whole bank (255), saw " + poolFor([1, 2, 3, 4, 5, 6, 7, 8], [], {}).length);
for (let u = 1; u <= 8; u++) {
  const n = poolFor([u], [], {}).length;
  ok(n > 0, "Unit " + u + " pool non-empty, saw " + n);
}

function lvl(items, n) { return items.filter(x => x.q._entry.level === n).length; }

for (let u = 1; u <= 8; u++) {
  let exact = 0, exactNoL3 = 0, other = 0;
  for (let t = 0; t < 200; t++) {
    const ex = composeExam([u], []);
    if (!ex) { other++; continue; }
    const marks = ex.crItems.map(x => x.marks).slice().sort((a, b) => a - b);
    const hasL3 = ex.crItems.some(x => x.q._entry.level === 3);
    const shape = ex.short === false && ex.srMarks === 10 && ex.crMarks === 8 &&
      ex.total === 18 && ex.single === true &&
      lvl(ex.srItems, 1) === 2 && lvl(ex.srItems, 2) === 6 && lvl(ex.srItems, 3) === 2 &&
      ex.crItems.length === 3 && marks.join(",") === "2,3,3";
    if (shape && hasL3) exact++;
    else if (shape) exactNoL3++;
    else other++;
  }
  ok(exact >= 190, "Unit " + u + " test: exact 18-mark papers (SR 10 at 2/6/2, CR 2+3+3 with a Level 3), " + exact + "/200 (" + exactNoL3 + " exact without a Level 3 CR, " + other + " other)");
}

ok(composeExam([1, 2], []) === null, "a two-unit selection composes nothing (single-unit tests only)");
ok(composeExam([3, 4, 5], []) === null, "a three-unit selection composes nothing");
ok(composeExam([1, 2, 3, 4, 5, 6, 7, 8], []) === null, "an all-units selection composes nothing");

function fakePaper(unit, srN, crMarksList) {
  const mk = (level, marks) => ({ q: { _entry: { unit, level } }, marks });
  return { single: true, srItems: Array.from({ length: srN }, () => mk(2, 1)), crItems: crMarksList.map(m => mk(3, m)) };
}
ok(examShortNow(fakePaper(1, 10, [2, 3, 3])) === false, "examShortNow: a full 10 SR / CR 2+3+3 paper is not short");
ok(examShortNow(fakePaper(1, 10, [2, 3])) === true, "examShortNow: CR under 8 is short");
ok(examShortNow(fakePaper(1, 9, [2, 3, 3])) === true, "examShortNow: SR under 10 is short");

console.log("GATE-COMPOSE-MATH-2202 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
