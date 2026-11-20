#!/usr/bin/env node
/* Gate (exam warning predicate) for every course whose pooled exam
   fallback configures a total: the render-time short check
   examShortNow must not flag the course's own standard multi-unit
   papers. Added Nov 20, 2026, with the total: 50 remedy for the six
   senior math courses (see Math-3201-Midcourse-Shortfall-Diagnosis-
   2026-11-20.md in the goal files).
 *
 * Why this gate exists: the composition gates exercise composeExam
 * only. The "runs short of the full blueprint" note is decided one
 * layer up, in renderExam, by examShortNow, which no gate used to
 * call. examShortNow takes its config-aware branch only when the
 * course's exam.fallback carries a total; it then tests the paper
 * against the fallback's srCount / crMarks. This gate holds the
 * predicate to exactly those configured blueprints.
 *
 * Population: every course in courses.js whose exam.fallback
 * carries a numeric total, except the documented exclusion below.
 * For each course the gate composes the papers the fallback governs:
 * the all-units selection, plus the mid / final preset selections
 * when they do not coincide with a configured exam scope (scope
 * papers are governed by their scope blueprint, which the predicate
 * never reads; that separate mismatch is an audit finding, not this
 * gate's contract). 40 draws per selection: at least 36 must be
 * composer-exact, and no composer-exact paper may trip the
 * predicate (evaluated with examState set to the selection, as in
 * the live render). Negative control per course: an exact paper
 * with one selected-response item removed, and one with one
 * constructed-response item removed, must both trip the predicate,
 * so the warning keeps its real job.
 *
 * Known exclusion (printed every run, not silent): bio-2201. Its
 * fallback carries total: 40 with crMarks: 0 (a 40-question
 * all-selected-response exam), but the predicate reads the CR floor
 * as (crMarks || 20), so every exact bio-2201 paper trips. That is
 * a distinct falsy-zero defect in the predicate's defaults, left
 * for the owner's decision (Nov 20, 2026 audit); it is not the
 * missing-total defect this gate guards.
 *
 * Fallback courses with no total are outside this gate's contract
 * by construction (the predicate never reaches their blueprint);
 * they are listed as INFO lines each run. As of Nov 20, 2026:
 * physics-3204, bio-3201 and earth-3209 are known false positives
 * of the same family (generic 30 SR / 20 CR floor against a
 * 27 SR or 12 CR blueprint) awaiting an owner decision, while
 * physics-2204, chem-2202 and chem-3202 fall through to a generic
 * floor that equals their pooled blueprint, so their pooled papers
 * do not trip. */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";

const KNOWN_EXCLUSIONS = {
  "bio-2201": "crMarks: 0 is read as a 20-mark CR floor by examShortNow's (crMarks || 20) default; distinct defect, owner decision pending (Nov 20, 2026 audit)"
};

const coursesSrc = fs.readFileSync(ROOT + "/courses.js", "utf8");
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const mcqBlock = blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, "");

function extractFn(src, name) {
  const start = src.indexOf("function " + name + "(");
  if (start < 0) return null;
  let i = src.indexOf("{", start), depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  throw new Error("unbalanced " + name);
}
const FN_NAMES = ["isPK", "poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "bimodalClass", "stripQ", "composeExam", "examLive", "examShortNow"];
const fnSrc = FN_NAMES.map(n => extractFn(html, n)).filter(Boolean).join("\n");

function loadCourse(id) {
  const sandbox = { console };
  sandbox.window = {};
  vm.createContext(sandbox);
  vm.runInContext(coursesSrc, sandbox);
  sandbox.window.__COURSE = sandbox.window.COURSES[id];
  vm.runInContext(mcqBlock, sandbox);
  vm.runInContext("var BANK = []; function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); } var _probeCache = {};", sandbox);
  vm.runInContext(fs.readFileSync(ROOT + "/banks/" + id + ".js", "utf8"), sandbox);
  vm.runInContext("var CR_MARKS = window.__BANK_CRMARKS;", sandbox);
  vm.runInContext(fnSrc, sandbox);
  return sandbox;
}

/* Registry pass: classify every course from courses.js alone. */
const reg = { window: {} };
vm.createContext(reg);
vm.runInContext(coursesSrc, reg);
const COURSES = reg.window.COURSES;

const DRAWS = 40, MIN_EXACT = 36;
let allOk = true;

function selectionsFor(ctx) {
  const c = ctx.window.__COURSE;
  const units = [...new Set(ctx.BANK.map(e => e.unit))].sort((a, b) => a - b);
  const scopeKeys = ["mid", "final"].filter(k => c.exam && c.exam[k] && Array.isArray(c.exam[k].units)).map(k => c.exam[k].units.join(","));
  const sels = [["all", units]];
  for (const k of ["mid", "final"]) {
    if (c.presets && c.presets[k] && Array.isArray(c.presets[k].units) && !scopeKeys.includes(c.presets[k].units.join(","))) {
      sels.push([k, c.presets[k].units]);
    }
  }
  return sels;
}

for (const id of Object.keys(COURSES)) {
  const c = COURSES[id];
  const fb = c.exam && c.exam.fallback;
  if (!fb) continue;
  if (typeof fb.total !== "number") {
    console.log(id + ": INFO fallback without a configured total (srCount " + fb.srCount + ", crMarks " + fb.crMarks + "); outside this gate's contract");
    continue;
  }
  if (KNOWN_EXCLUSIONS[id]) {
    console.log(id + ": EXCLUDED (known) " + KNOWN_EXCLUSIONS[id]);
    continue;
  }
  const ctx = loadCourse(id);
  let firstExact = null, firstUnits = null;
  for (const [name, units] of selectionsFor(ctx)) {
    let exact = 0, trips = 0, nulls = 0;
    for (let t = 0; t < DRAWS; t++) {
      const res = ctx.composeExam(units.slice(), []);
      if (!res) { nulls++; continue; }
      if (res.short) continue;
      exact++;
      if (!firstExact) { firstExact = res; firstUnits = units; }
      ctx.examState = { s: { units: units.slice() } };
      if (ctx.examShortNow(res)) trips++;
    }
    console.log(id + " " + name + " [" + units.join(",") + "]: exact " + exact + "/" + DRAWS + ", warning trips among exact " + trips + (nulls ? ", nulls " + nulls : ""));
    if (exact < MIN_EXACT) { console.log(id + " " + name + ": FAIL fewer than " + MIN_EXACT + " composer-exact papers; the check would be vacuous"); allOk = false; }
    if (trips > 0) { console.log(id + " " + name + ": FAIL the warning flags this course's own exact papers"); allOk = false; }
  }
  if (firstExact) {
    ctx.examState = { s: { units: firstUnits.slice() } };
    const srCut = { srItems: firstExact.srItems.slice(0, -1), crItems: firstExact.crItems, single: firstExact.single };
    const crCut = { srItems: firstExact.srItems, crItems: firstExact.crItems.slice(0, -1), single: firstExact.single };
    const srTrips = ctx.examShortNow(srCut), crTrips = ctx.examShortNow(crCut);
    console.log(id + " negative controls: one SR item removed trips " + srTrips + ", one CR item removed trips " + crTrips);
    if (!srTrips || !crTrips) { console.log(id + ": FAIL a genuinely short paper no longer trips the warning"); allOk = false; }
  } else {
    console.log(id + ": FAIL no composer-exact paper sampled for the negative controls");
    allOk = false;
  }
}

console.log(allOk ? "GATE-EXAM-WARNING PASS" : "GATE-EXAM-WARNING FAIL");
process.exit(allOk ? 0 : 1);
