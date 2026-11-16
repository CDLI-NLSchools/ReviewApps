#!/usr/bin/env node
/* Gate 2 (composition) for Math 9: the shell's composeExam must
   reproduce the standalone composer's junior pooled blueprint
   (composeExam at lines 8375 to 8424 of the standalone). Every
   multi-unit selection (the mid scope Units 1 to 4, the final
   scope Units 5 to 9, a custom pair, and all nine units)
   composes a 35-mark paper: 18 selected response, 17
   constructed response, level totals 7/21/7, not flagged short,
   in at least 190 of 200 trials; the Level 3 share of Section B
   lands in the standalone's tried set {6, 5, 7} in at least 95%
   of the exact papers. Each single-unit test composes 25 marks
   (SR 11 / CR 14) exactly in at least 190 of 200 trials. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["math-9"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  const e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/math-9.js", "utf8"));
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
for (const n of ["isPK", "poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam"]) eval(extractFn(html, n));

function stats(res) {
  const s = { total: res.total, sr: res.srMarks, cr: res.crMarks, short: res.short, levels: [0, 0, 0], crL3: 0 };
  res.srItems.forEach(it => { s.levels[it.q._entry.level - 1]++; });
  res.crItems.forEach(it => {
    s.levels[it.q._entry.level - 1] += it.marks;
    if (it.q._entry.level === 3) s.crL3 += it.marks;
  });
  return s;
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let allOk = true;

function runPooled(name, units, trials) {
  let exact = 0, inWindow = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam(units, []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (!s.short && s.total === 35 && s.sr === 18 && s.cr === 17 && eq(s.levels, [7, 21, 7])) {
      exact++;
      if (s.crL3 === 6 || s.crL3 === 5 || s.crL3 === 7) inWindow++;
    } else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short, levels: s.levels, crL3: s.crL3 }));
  }
  console.log(name + ": exact " + exact + "/" + trials + " (Section B Level 3 in the {6, 5, 7} tried set in " + inWindow + " of the exact papers)" + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  if (exact < 190) allOk = false;
  if (exact > 0 && inWindow / exact < 0.95) allOk = false;
  return exact;
}

function runUnit(u, trials) {
  let exact = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam([u], []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (!s.short && s.total === 25 && s.sr === 11 && s.cr === 14) exact++;
    else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short }));
  }
  console.log("unit " + u + " test: exact " + exact + "/" + trials + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  if (exact < 190) allOk = false;
}

runPooled("mid [1,2,3,4]", [1, 2, 3, 4], 200);
runPooled("final [5,6,7,8,9]", [5, 6, 7, 8, 9], 200);
runPooled("custom [2,3]", [2, 3], 200);
runPooled("all [1..9]", [1, 2, 3, 4, 5, 6, 7, 8, 9], 200);
for (const u of [1, 2, 3, 4, 5, 6, 7, 8, 9]) runUnit(u, 200);

console.log(allOk ? "GATE-COMPOSE-MATH-9 PASS" : "GATE-COMPOSE-MATH-9 FAIL");
process.exit(allOk ? 0 : 1);
