#!/usr/bin/env node
/* Gate (exam warning predicate) for the render-time short check
   examShortNow: it must not flag a course's own standard papers,
   and it must still flag genuinely short ones. Added Nov 20, 2026,
   with the total: 50 remedy for the six senior math courses (see
   Math-3201-Midcourse-Shortfall-Diagnosis-2026-11-20.md in the
   goal files); extended the same day for the second remedy (the
   Physics 3204, Biology 3201 and Earth Systems 3209 fallback
   totals, Biology 2201's crMarks of 0, and Science 1206's scope
   blueprints).
 *
 * Why this gate exists: the composition gates exercise composeExam
 * only. The "runs short of the full blueprint" note is decided one
 * layer up, in renderExam, by examShortNow, which no gate used to
 * call. examShortNow resolves a multi-unit paper's blueprint the
 * way composeExam does: a selection matching a configured exam
 * scope (an exam entry carrying a units list) is judged against
 * that scope's srCount / crMarks when the scope carries the full
 * blueprint triple (total, srCount, crMarks); otherwise a course
 * whose exam.fallback carries a total is judged against the
 * fallback's srCount / crMarks, with a configured crMarks of 0
 * honoured as 0; otherwise the legacy generic floor applies.
 *
 * Population A: every course in courses.js whose exam.fallback
 * carries a numeric total. For each, the gate composes the papers
 * the fallback governs: the all-units selection, plus the mid /
 * final preset selections when they are multi-unit and do not
 * coincide with a configured exam scope (scope papers are
 * Population B; a single-unit preset paper is a unit test,
 * governed by unitTest and the predicate's single-unit branch,
 * a different contract, and is noted as INFO when skipped).
 *
 * Population B: every configured exam scope carrying the full
 * blueprint triple (total, srCount, crMarks), composed on its own
 * unit set. Scopes without the triple (Chemistry 2202's mid
 * carries perUnit only) fall through the predicate's resolution
 * by design and are listed as INFO.
 *
 * Both populations: 40 draws per selection, at least 36 must be
 * composer-exact, and no composer-exact paper may trip the
 * predicate (evaluated with examState set to the selection, as in
 * the live render). Negative controls per course (Population A)
 * and per scope (Population B): an exact paper with one
 * selected-response item removed must trip, and one with one
 * constructed-response item removed must trip where the paper
 * carries constructed-response items; a paper with none (Biology
 * 2201's configured crMarks of 0) takes the selected-response
 * control only, and the gate prints that.
 *
 * Known exclusion (printed every run, not silent): the bio-3201
 * final scope (Units 2 and 3). The composer deals no exact paper
 * for it (0 of 40 draws; its own short flag, a separate mechanism
 * from this predicate, recorded in the diagnosis report), so
 * there is no exact paper to hold the predicate to. Biology
 * 3201's fallback papers and mid scope are covered normally.
 *
 * Fallback courses with no total are outside Population A by
 * construction (the predicate never reaches their blueprint);
 * they are listed as INFO lines each run. As of Nov 20, 2026
 * those are physics-2204, chem-2202 and chem-3202, whose generic
 * floor equals their pooled blueprint, so their pooled papers do
 * not trip; chem-3202's provincial scope is covered in
 * Population B. */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";

const KNOWN_SCOPE_EXCLUSIONS = {
  "bio-3201/final": "the composer deals no exact paper for this scope (0 of 40 draws, its own short flag; separate mechanism recorded in the diagnosis report), so there is no exact paper to hold the predicate to"
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

/* Compose one selection and hold the predicate to it. Returns the
   first composer-exact paper (for the negative controls) or null. */
function checkSelection(ctx, id, label, units) {
  let exact = 0, trips = 0, nulls = 0, firstExact = null;
  for (let t = 0; t < DRAWS; t++) {
    const res = ctx.composeExam(units.slice(), []);
    if (!res) { nulls++; continue; }
    if (res.short) continue;
    exact++;
    if (!firstExact) firstExact = res;
    ctx.examState = { s: { units: units.slice() } };
    if (ctx.examShortNow(res)) trips++;
  }
  console.log(id + " " + label + " [" + units.join(",") + "]: exact " + exact + "/" + DRAWS + ", warning trips among exact " + trips + (nulls ? ", nulls " + nulls : ""));
  if (exact < MIN_EXACT) { console.log(id + " " + label + ": FAIL fewer than " + MIN_EXACT + " composer-exact papers; the check would be vacuous"); allOk = false; }
  if (trips > 0) { console.log(id + " " + label + ": FAIL the warning flags this course's own exact papers"); allOk = false; }
  return firstExact;
}

function negativeControls(ctx, id, label, units, firstExact, configuredCrMarks) {
  ctx.examState = { s: { units: units.slice() } };
  const srCut = { srItems: firstExact.srItems.slice(0, -1), crItems: firstExact.crItems, single: firstExact.single };
  const srTrips = ctx.examShortNow(srCut);
  let crNote;
  if (firstExact.crItems.length) {
    const crCut = { srItems: firstExact.srItems, crItems: firstExact.crItems.slice(0, -1), single: firstExact.single };
    const crTrips = ctx.examShortNow(crCut);
    crNote = "one CR item removed trips " + crTrips;
    if (!crTrips) { console.log(id + " " + label + ": FAIL a genuinely short paper (one CR item removed) no longer trips the warning"); allOk = false; }
  } else {
    crNote = "CR control not applicable (paper carries no CR items; configured crMarks " + configuredCrMarks + ")";
    if (configuredCrMarks !== 0) { console.log(id + " " + label + ": FAIL exact paper carries no CR items but the configured crMarks is not 0"); allOk = false; }
  }
  console.log(id + " " + label + " negative controls: one SR item removed trips " + srTrips + ", " + crNote);
  if (!srTrips) { console.log(id + " " + label + ": FAIL a genuinely short paper (one SR item removed) no longer trips the warning"); allOk = false; }
}

/* Population A: totalled fallbacks. */
function fallbackSelectionsFor(ctx) {
  const c = ctx.window.__COURSE;
  const units = [...new Set(ctx.BANK.map(e => e.unit))].sort((a, b) => a - b);
  const scopeKeys = ["mid", "final", "provincial"].filter(k => c.exam && c.exam[k] && Array.isArray(c.exam[k].units)).map(k => c.exam[k].units.join(","));
  const sels = [["all", units]];
  for (const k of ["mid", "final"]) {
    if (c.presets && c.presets[k] && Array.isArray(c.presets[k].units)) {
      if (c.presets[k].units.length < 2) {
        console.log(ctx.window.__COURSE.id + ": INFO preset " + k + " [" + c.presets[k].units.join(",") + "] is a single-unit paper (a unit test), outside this gate's multi-unit contract");
      } else if (!scopeKeys.includes(c.presets[k].units.join(","))) {
        sels.push([k, c.presets[k].units]);
      }
    }
  }
  return sels;
}

for (const id of Object.keys(COURSES)) {
  const c = COURSES[id];
  const fb = c.exam && c.exam.fallback;
  if (!fb) continue;
  if (typeof fb.total !== "number") {
    console.log(id + ": INFO fallback without a configured total (srCount " + fb.srCount + ", crMarks " + fb.crMarks + "); outside Population A");
    continue;
  }
  const ctx = loadCourse(id);
  let firstExact = null, firstUnits = null;
  for (const [name, units] of fallbackSelectionsFor(ctx)) {
    const fe = checkSelection(ctx, id, "fallback " + name, units);
    if (fe && !firstExact) { firstExact = fe; firstUnits = units; }
  }
  if (firstExact) {
    negativeControls(ctx, id, "fallback", firstUnits, firstExact, fb.crMarks);
  } else {
    console.log(id + " fallback: FAIL no composer-exact paper sampled for the negative controls");
    allOk = false;
  }
}

/* Population B: configured scopes carrying the full triple. */
for (const id of Object.keys(COURSES)) {
  const c = COURSES[id];
  if (!c.exam) continue;
  const scopeNames = Object.keys(c.exam).filter(nm => {
    const sc = c.exam[nm];
    return sc && Array.isArray(sc.units);
  });
  if (!scopeNames.length) continue;
  let ctx = null;
  for (const nm of scopeNames) {
    const sc = c.exam[nm];
    if (!(typeof sc.total === "number" && typeof sc.srCount === "number" && typeof sc.crMarks === "number")) {
      console.log(id + ": INFO scope " + nm + " [" + sc.units.join(",") + "] carries no srCount / crMarks pair; the predicate falls through it by design, outside Population B");
      continue;
    }
    if (KNOWN_SCOPE_EXCLUSIONS[id + "/" + nm]) {
      console.log(id + " scope " + nm + ": EXCLUDED (known) " + KNOWN_SCOPE_EXCLUSIONS[id + "/" + nm]);
      continue;
    }
    if (!ctx) ctx = loadCourse(id);
    const units = sc.units.slice().sort((a, b) => a - b);
    const fe = checkSelection(ctx, id, "scope " + nm, units);
    if (fe) {
      negativeControls(ctx, id, "scope " + nm, units, fe, sc.crMarks);
    } else {
      console.log(id + " scope " + nm + ": FAIL no composer-exact paper sampled for the negative controls");
      allOk = false;
    }
  }
}

console.log(allOk ? "GATE-EXAM-WARNING PASS" : "GATE-EXAM-WARNING FAIL");
process.exit(allOk ? 0 : 1);
