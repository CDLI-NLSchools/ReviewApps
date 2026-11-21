/* GATE: the at-least-once indicator floor (Ruling 12, November 21,
   2026). Both composers reserve one slot for every selected or
   blueprinted indicator that has at least one entry in the active
   pool under the current settings, then complete the draw around
   the reservations. An indicator with no entry in the active pool
   is excepted silently: the junior science cooperation outcomes
   permanently, and prior knowledge codes while the prior knowledge
   switch is off (floored when the switch is on).
   Battery: custom practice draws (whole-unit, small and bound
   selections across four courses), the prior knowledge switch off
   and on, the online two-count split and the practice sheet split,
   six mapped tests (including the three that routinely missed an
   outcome before the floor and a single-indicator test), the
   Biology 3201 mid-course and final exam scopes, and seeded
   determinism. Coverage must hold on every paper; composed papers
   must still deal their full plan exactly at the standing bar
   (at least 10 of 12). Harness mirrors gate-testmap's. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; fails.push(m); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const COURSES = window.COURSES;

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
window.__COURSE = COURSES["sci-9"];
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
var CR_MARKS = {};
var _probeCache = {};
var hidCtl = { pkIn: false };

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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "bimodalClass", "stripQ", "composeExam", "testMapList", "testPlanFor", "isPK", "drawSet", "drawOnlineSet", "drawSheetSet", "pkIncluded", "enrichIncluded"]) eval(extractFn(html, n));

function loadBank(cid) {
  window.__COURSE = COURSES[cid];
  BANK.length = 0;
  _probeCache = {};
  eval(fs.readFileSync(ROOT + "/banks/" + cid + ".js", "utf8"));
  CR_MARKS = window.__BANK_CRMARKS || {};
  return BANK;
}
function setPK(on) { hidCtl.pkIn = !!on; }
/* The pool composeExam sees for a mapped test (the measurement's
   definition, unchanged). */
function composerPool(C, unit, inds, plan) {
  var capX = scopeCap([unit]);
  var pool = poolFor([unit], inds, capX);
  if (C.pkPracticeOnly) pool = pool.filter(function (e) { return !isPK(e); });
  pool = pool.filter(function (e) { return !e.enrich; });
  pool = pool.filter(function (e) { return !e.noCompose; });
  if (plan && plan.topics) {
    pool = pool.filter(function (e) {
      return e.indicators.every(function (c) {
        var t = plan.topics[c];
        return !t || e.topic === t;
      });
    });
  }
  return pool;
}
function composerPoolMulti(C, units, includePK) {
  var capX = scopeCap(units);
  var pool = poolFor(units, [], capX);
  if (C.pkPracticeOnly && !includePK) pool = pool.filter(function (e) { return !isPK(e); });
  pool = pool.filter(function (e) { return !e.enrich; });
  pool = pool.filter(function (e) { return !e.noCompose; });
  return pool;
}
/* The pool drawSet sees under the current prior knowledge switch. */
function practicePool(units, inds, cap) {
  var pool = poolFor(units, inds, cap);
  if (!pkIncluded()) pool = pool.filter(function (e) { return !isPK(e); });
  return pool;
}
function flooredOf(pool, sel) {
  const codes = new Set(); pool.forEach(e => e.indicators.forEach(c => codes.add(c)));
  return sel.filter(c => codes.has(c));
}
function coveredBy(items) {
  const s = new Set(); items.forEach(q => q._entry.indicators.forEach(c => s.add(c))); return s;
}
function coveredByPaper(res) {
  const s = new Set();
  res.srItems.concat(res.crItems).forEach(it => it.q._entry.indicators.forEach(c => s.add(c)));
  return s;
}

/* ---------- custom practice draws ---------- */
function practiceCase(cid, units, sel, count, papers, label) {
  const C = COURSES[cid];
  loadBank(cid);
  const cap = scopeCap(units);
  const floored = flooredOf(practicePool(units, sel, cap), sel);
  let coveredAll = 0, fullCount = 0;
  for (let d = 0; d < papers; d++) {
    const res = drawSet(units, sel, count, C.defaultMix || [20, 60, 20], "rand", cap);
    const cov = coveredBy(res.items);
    if (floored.every(c => cov.has(c))) coveredAll++;
    if (res.items.length === count) fullCount++;
  }
  ok(coveredAll === papers, label + ": floored coverage " + coveredAll + "/" + papers + " (floored: " + floored.join(",") + ")");
  ok(fullCount === papers, label + ": full count " + fullCount + "/" + papers);
}
practiceCase("bio-3201", [1], COURSES["bio-3201"].unitInd[1].slice(0, 3), 10, 40, "bio-3201 small U1");
practiceCase("bio-3201", [1], COURSES["bio-3201"].unitInd[1], 20, 40, "bio-3201 whole U1 at 20");
practiceCase("math-3201", [3], COURSES["math-3201"].unitInd[3].slice(0, 3), 10, 40, "math-3201 small U3");
practiceCase("chem-2202", [1], COURSES["chem-2202"].unitInd[1], 20, 40, "chem-2202 whole U1 at 20");
practiceCase("physics-3204", [3], COURSES["physics-3204"].unitInd[3], 20, 40, "physics-3204 whole U3 at 20");

/* Bound selection: more floored indicators than slots. Every paper
   must still address as many distinct floored indicators as it has
   questions, and the excepted cooperation outcome (no entries in
   the pool, ever) is never dealt and never counted against the
   floor. */
{
  const cid = "sci-7", C = COURSES[cid];
  loadBank(cid);
  const sel = C.unitInd[1].slice();
  const floored = flooredOf(practicePool([1], sel, scopeCap([1])), sel);
  ok(!floored.includes("SC7.3.5"), "sci-7 U1: cooperation outcome SC7.3.5 is excepted by the pool test");
  let minDistinct = 99, dealtExcepted = 0;
  for (let d = 0; d < 40; d++) {
    const res = drawSet([1], sel, 10, C.defaultMix || [20, 60, 20], "rand", scopeCap([1]));
    const cov = coveredBy(res.items);
    let distinct = 0; floored.forEach(c => { if (cov.has(c)) distinct++; });
    if (distinct < minDistinct) minDistinct = distinct;
    res.items.forEach(q => { if (q._entry.indicators.includes("SC7.3.5")) dealtExcepted++; });
  }
  ok(minDistinct >= 10, "sci-7 U1 bound at 10: fewest distinct floored indicators on a paper is " + minDistinct + " (floor: 10)");
  ok(dealtExcepted === 0, "sci-7 U1: the excepted outcome is never dealt");
}

/* ---------- prior knowledge switch ---------- */
{
  const cid = "math-2201", C = COURSES[cid];
  loadBank(cid);
  const sel = C.unitInd[3].slice();
  ok(sel.includes("PK.2"), "math-2201 U3: the selection includes PK.2");
  setPK(false);
  ok(pkIncluded() === false, "prior knowledge switch reads off");
  {
    const floored = flooredOf(practicePool([3], sel, scopeCap([3])), sel);
    ok(!floored.includes("PK.2"), "PK off: PK.2 is excepted by the pool test, not by name");
    let coveredAll = 0, pkDealt = 0, fullCount = 0;
    for (let d = 0; d < 40; d++) {
      const res = drawSet([3], sel, 10, C.defaultMix || [20, 60, 20], "rand", scopeCap([3]));
      const cov = coveredBy(res.items);
      if (floored.every(c => cov.has(c))) coveredAll++;
      if (res.items.length === 10) fullCount++;
      res.items.forEach(q => { if (q._entry.indicators.includes("PK.2")) pkDealt++; });
    }
    ok(coveredAll === 40, "PK off: every paper covers every floored indicator (" + coveredAll + "/40)");
    ok(fullCount === 40, "PK off: every paper deals its full count, nothing flagged on account of PK.2 (" + fullCount + "/40)");
    ok(pkDealt === 0, "PK off: PK.2 is never dealt");
  }
  setPK(true);
  ok(pkIncluded() === true, "prior knowledge switch reads on");
  {
    const floored = flooredOf(practicePool([3], sel, scopeCap([3])), sel);
    ok(floored.includes("PK.2"), "PK on: PK.2 has entries in the pool and is floored");
    let coveredAll = 0;
    for (let d = 0; d < 40; d++) {
      const res = drawSet([3], sel, 10, C.defaultMix || [20, 60, 20], "rand", scopeCap([3]));
      const cov = coveredBy(res.items);
      if (floored.every(c => cov.has(c))) coveredAll++;
    }
    ok(coveredAll === 40, "PK on: every paper covers PK.2 and every floored indicator (" + coveredAll + "/40)");
  }
  setPK(false);
}

/* ---------- split draws ---------- */
{
  const cid = "chem-2202", C = COURSES[cid];
  loadBank(cid);
  const sel = C.unitInd[1].slice();
  const floored = flooredOf(practicePool([1], sel, undefined), sel);
  const s = { oMc: 12, oFi: 8, mix: C.defaultMix || [20, 60, 20], order: "rand", bimodal: true };
  let coveredAll = 0, fullCount = 0;
  for (let d = 0; d < 30; d++) {
    const res = drawOnlineSet(s, [1], sel, undefined);
    const cov = coveredBy(res.items);
    if (floored.every(c => cov.has(c))) coveredAll++;
    if (res.items.length === 20) fullCount++;
  }
  ok(coveredAll === 30, "online split chem-2202 U1: union coverage " + coveredAll + "/30");
  ok(fullCount === 30, "online split chem-2202 U1: both counts stand (" + fullCount + "/30)");
}
{
  const cid = "bio-3201", C = COURSES[cid];
  loadBank(cid);
  const sel = C.unitInd[1].slice(0, 6);
  const floored = flooredOf(practicePool([1], sel, undefined), sel);
  const s = { units: [1], inds: sel, mcCount: 10, ncCount: 6, mix: C.defaultMix || [20, 60, 20], order: "rand", finalCap: false, midCap: false, bimodal: false };
  let coveredAll = 0, fullCount = 0;
  for (let d = 0; d < 30; d++) {
    const res = drawSheetSet(s);
    const cov = coveredBy(res.items);
    if (floored.every(c => cov.has(c))) coveredAll++;
    if (res.items.length === 16) fullCount++;
  }
  ok(coveredAll === 30, "sheet split bio-3201 U1: union coverage " + coveredAll + "/30");
  ok(fullCount === 30, "sheet split bio-3201 U1: both counts stand (" + fullCount + "/30)");
}

/* ---------- mapped tests ---------- */
function testCase(cid, unit, test) {
  const C = COURSES[cid];
  loadBank(cid);
  const entry = testMapList(C, unit, test);
  const plan = testPlanFor(C, unit, test);
  const floored = flooredOf(composerPool(C, unit, entry.inds, plan), entry.inds);
  let coveredAll = 0, exact = 0;
  for (let d = 0; d < 12; d++) {
    const res = composeExam([unit], entry.inds.slice(), false, plan);
    const cov = coveredByPaper(res);
    if (floored.every(c => cov.has(c))) coveredAll++;
    if (!res.short && res.srItems.length === plan.sr && res.crMarks === plan.cr) exact++;
  }
  const label = cid + " U" + unit + " T" + test;
  ok(coveredAll === 12, label + ": floored coverage " + coveredAll + "/12 (floored: " + floored.join(",") + ")");
  ok(exact >= 10, label + ": exact papers " + exact + "/12 (bar 10)");
}
testCase("chem-2202", 2, 2);
testCase("chem-3202", 3, 1);
testCase("chem-2202", 1, 3);
testCase("sci-9", 2, 2);
testCase("sci-7", 1, 3);
testCase("chem-3202", 1, 1);

/* ---------- exam scopes ---------- */
function scopeCase(cid, scopeName) {
  const C = COURSES[cid], sc = C.exam[scopeName];
  loadBank(cid);
  const units = sc.units.slice();
  const pool = composerPoolMulti(C, units, false);
  const poolCodes = new Set(); pool.forEach(e => e.indicators.forEach(c => poolCodes.add(c)));
  const floored = [];
  units.forEach(u => (C.unitInd[u] || []).forEach(c => { if (poolCodes.has(c) && !floored.includes(c)) floored.push(c); }));
  let coveredAll = 0, exact = 0;
  for (let d = 0; d < 12; d++) {
    const res = composeExam(units, [], false);
    const cov = coveredByPaper(res);
    if (floored.every(c => cov.has(c))) coveredAll++;
    if (!res.short && res.total === sc.total) exact++;
  }
  const label = cid + " " + scopeName + " scope";
  ok(coveredAll === 12, label + ": floored coverage " + coveredAll + "/12 (floored: " + floored.length + " outcomes)");
  ok(exact >= 10, label + ": exact papers " + exact + "/12 (bar 10)");
}
scopeCase("bio-3201", "mid");
scopeCase("bio-3201", "final");

/* ---------- seeded determinism (fresh-page semantics: a re-open
   is a fresh page load, so the probe cache starts cold) ---------- */
{
  const cid = "chem-2202", C = COURSES[cid];
  loadBank(cid);
  const entry = testMapList(C, 2, 2);
  const plan = testPlanFor(C, 2, 2);
  const draw = () => { _probeCache = {}; return withSeed("floor-seed-1", () => composeExam([2], entry.inds.slice(), false, plan)); };
  const a = draw(), b = draw();
  const ids = r => r.srItems.concat(r.crItems).map(it => it.q._entry.id).join(",");
  ok(ids(a) === ids(b), "seeded mapped test deals identically on re-open");
  loadBank("bio-3201");
  const sel = COURSES["bio-3201"].unitInd[1].slice(0, 3);
  const drawP = () => { _probeCache = {}; return withSeed("floor-seed-2", () => drawSet([1], sel, 10, [20, 60, 20], "rand", undefined)); };
  const pa = drawP(), pb = drawP();
  ok(pa.items.map(q => q._entry.id).join(",") === pb.items.map(q => q._entry.id).join(","),
    "seeded practice set deals identically on re-open");
}

console.log("GATE-FLOOR: " + pass + " passed, " + fail + " failed");
if (fails.length) { console.log("FAILURES:"); fails.forEach(f => console.log(" - " + f)); }
process.exit(fail ? 1 : 0);
