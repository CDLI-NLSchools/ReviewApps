#!/usr/bin/env node
/* Gate 2 (composition) for Math 3202: the shell's composeExam must
   reproduce the standalone composer's single-unit test blueprint
   (math-3202-review/index.html, composeExam, lines 6733 to 6775).
   Each unit test composes exactly, in at least 190 of 200 trials:
   8 selected response at the level split 2/5/1, exactly two
   constructed-response questions whose marks sum to the unit's
   target (UNIT_CR_TARGET: 7/9/7/8/9/8/9/10/7/8, totals 15 to 18),
   not flagged short. Because the standalone prefers a pair carrying
   a Level 3 question whenever one exists (and one exists in every
   unit), the Section B Level 3 share is positive in at least 95% of
   the exact papers. Any multi-unit selection composes null: this
   course's tests are built one unit at a time. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["math-3202"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-3202.js", "utf8"));
var CR_MARKS = window.__BANK_CRMARKS;
var _probeCache = {};

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

const TARGET = { 1: 7, 2: 9, 3: 7, 4: 8, 5: 9, 6: 8, 7: 9, 8: 10, 9: 7, 10: 8 };
function stats(res) {
  const s = { total: res.total, sr: res.srMarks, cr: res.crMarks, short: res.short, srLevels: [0, 0, 0], crN: res.crItems.length, crL3: 0 };
  res.srItems.forEach(it => { s.srLevels[it.q._entry.level - 1]++; });
  res.crItems.forEach(it => { if (it.q._entry.level === 3) s.crL3 += it.marks; });
  return s;
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let allOk = true;

function runUnit(u, trials) {
  const target = TARGET[u];
  let exact = 0, withL3 = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam([u], []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (!s.short && s.sr === 8 && eq(s.srLevels, [2, 5, 1]) && s.crN === 2 && s.cr === target && s.total === 8 + target) {
      exact++;
      if (s.crL3 > 0) withL3++;
    } else if (bad.length < 3) bad.push(JSON.stringify(s));
  }
  console.log("unit " + u + " test (target " + target + ", total " + (8 + target) + "): exact " + exact + "/" + trials +
    " (Section B carries Level 3 in " + withL3 + " of the exact papers)" + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  if (exact < 190) allOk = false;
  if (exact > 0 && withL3 / exact < 0.95) allOk = false;
}

for (let u = 1; u <= 10; u++) runUnit(u, 200);

// multi-unit selections compose nothing in this course
for (const sel of [[1, 2], [5, 6, 7], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]) {
  const res = composeExam(sel, []);
  console.log("multi-unit [" + sel.join(",") + "]: " + (res === null ? "null (correct)" : "composed a paper (WRONG)"));
  if (res !== null) allOk = false;
}

// the shell's short-paper note must judge these papers by the
// course's own targets (8 SR; the unit's CR target), not the senior
// pattern's 11/14: a full Unit 8 paper (8 SR, CR 4+6=10) is not
// short, and a Unit 1 paper whose CR reaches only 5 of 7 is.
function fakePaper(unit, srCount, crMarksList) {
  const srItems = [], crItems = [];
  for (let i = 0; i < srCount; i++) srItems.push({ q: { _entry: { unit, level: 2 } }, marks: 1 });
  crMarksList.forEach(m => crItems.push({ q: { _entry: { unit, level: 3 } }, marks: m }));
  return { srItems, crItems, single: true };
}
const fullPaper = examShortNow(fakePaper(8, 8, [4, 6]));
const shortPaper = examShortNow(fakePaper(1, 8, [2, 3]));
console.log("examShortNow: full Unit 8 paper short=" + fullPaper + " (want false); CR-short Unit 1 paper short=" + shortPaper + " (want true)");
if (fullPaper !== false || shortPaper !== true) allOk = false;

console.log(allOk ? "GATE-COMPOSE-MATH-3202 PASS" : "GATE-COMPOSE-MATH-3202 FAIL");
process.exit(allOk ? 0 : 1);
