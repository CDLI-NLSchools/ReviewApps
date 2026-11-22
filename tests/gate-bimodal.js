#!/usr/bin/env node
/* Gate (bimodal questions), November 19, 2026
   (Spec-Bimodal-Questions-2026-11-19.md). Proves, over draws:
     1. registration: every classified strippable entry carries a
        BIMODAL manifest entry with its class (5,110 in all: the 243 of
        November 19, 2026, per the two classification reports plus the
        three prior-knowledge extensions named in the spec, the
        608 Biology registrations of November 20, 2026, per
        Bimodal-Classification-Biology-SR-2026-11-20.md, and the
        1,747 registrations of the nine test-mapped science courses
        in the reverse registration programme of November 20, 2026,
        per Bimodal-Classification-SR-Pools-Science-2026-11-20.md, and
        441 registrations across Mathematics 3200, 3201, 3202, 3208
        and Physics 3204 in the same programme, 479 across
        Mathematics 2200, 2201, 2202 and Physics 2204, 113 in
        Mathematics 1201, and 909 across the Grade 9, 8 and 7
        courses, English and French, and 158 in Mathematics 1202,
        landed November 20, 2026 once the shell composer's
        cross-section defect was fixed, and 412 in Earth Systems
        3209, landed November 20, 2026 once its unit compose gates
        were reworked to a bimodal aware pool census), every
        bimodal entry keeps
        its CR marks, and the 68 entries that left the CR pools
        (not-strippable, dual-mode, Chemistry 3202's mixed entry)
        carry no CR marks;
     2. strip form: for every bimodal entry, the stripped form of
        a drawn question has no options, keeps the drawn stem and
        solution verbatim, and its answer is the correct option's
        content, checked the way the app checks it (numeric draws
        within tolerance; short-text draws carrying the answer
        among the accepted forms; class (b) draws self-check);
     3. the toggle: on composed papers outside test scope
        (multi-unit practice papers), with the choices on no
        bimodal entry is dealt in Section B, and with the choices
        off none is dealt in Section A; single-unit papers are
        unit tests, which sit in test scope, so they carry the
        test-scope invariants in both toggle positions; in all
        cases no Section B item is a multiple-choice question
        and no entry serves both sections;
     4. test scope: for every mapped test in every mapped course
        (targets read from the plan data, never constants here),
        papers fill exactly with the toggle in either position,
        no Section B item is multiple choice, bimodal Section B
        items are stripped, and no entry serves both sections.
        Chemistry 3202 Unit 1 Test 1 and Unit 4 Test 2, repaired
        by this build's written entries, are in that sweep;
     5. sheets: with the choices off, a constructed-response
        sheet carries no multiple-choice item and a
        multiple-choice sheet carries no bimodal entry; with
        the choices on, a constructed sheet carries no bimodal
        entry either.
   Run: node tests/gate-bimodal.js */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }

/* ---------- expectations from the classification reports ---------- */
/* Amendment, November 20, 2026: Biology 2201 and Biology 3201 added
   on the registration of their selected response classifications
   (Bimodal-Classification-Biology-SR-2026-11-20.md): 347 and 261
   registrations respectively, taking the bimodal total to 851.
   Counts verified against the assembled banks' BIMODAL maps. */
/* Amendment, November 20, 2026: the reverse classification
   registration programme (Bimodal-Classification-SR-Pools-2026-11-20.md)
   adds the nine test-mapped science courses first, in the owner's
   order, then the remaining courses by level descending. Counts are
   updated course by course as each registration lands and are
   verified against the assembled banks' BIMODAL maps. Two
   registrations are assembled locally and held from landing, so
   they carry no EXPECT entry yet: Earth Systems 3209 (412 entries;
   its unit compose gates' pre-bimodal pool census cannot read the
   deepened manifest) and Mathematics 1202 (158 entries; its unit
   test papers can deal an entry into both sections, a composer
   defect the registration exposes, detailed in the build report). */
/* Amendment, November 20, 2026 (later): the composer's
   cross-section defect is fixed in the shell (hard exclusion in
   the unit-test composer's pair, trio and sextet branches) and
   Mathematics 1202 has landed unchanged, so it carries an EXPECT
   entry below (115 class a, 43 class b, verified against the
   assembled bank's BIMODAL map). Earth Systems 3209 remains held
   and entry-less. */
/* Amendment, November 20, 2026 (landing): the owner ruled the
   Earth Systems 3209 unit compose gates be reworked to a bimodal
   aware pool census (SR pool: entries carrying no CR marks plus
   the registered bimodal entries; CR pool: every entry carrying
   CR marks, bimodal entries among them at their marks), the five
   reworked gates pass in full, and Earth Systems 3209 has landed
   unchanged, so it carries an EXPECT entry below (388 class a,
   24 class b, verified against the assembled bank's BIMODAL
   map). No course remains held. */
/* Amendment, November 22, 2026 (Class A completion build): the
   Mathematics 2201 expectation grows by the build's 11 new
   dual-form registrations (7 class a, 4 class b), from
   [113, 94] to [120, 98]. */
const EXPECT_BIMODAL = { /* course: [class a count, class b count] */
  "math-9": [126, 39], "math-9-fr": [69, 40], "math-1201": [69, 60], "math-1202": [115, 43],
  "math-8": [136, 19], "math-8-fr": [64, 34],
  "math-7": [250, 23], "math-7-fr": [100, 27],
  "math-2200": [54, 63], "math-2201": [120, 98], "math-3200": [46, 61],
  "math-3201": [38, 48], "math-3208": [42, 67], "chem-3202": [84, 69],
  "bio-2201": [268, 79], "bio-3201": [209, 52],
  "sci-7": [55, 146], "sci-8": [67, 147], "sci-8-fr": [78, 142],
  "sci-7-fr": [21, 196], "sci-9": [53, 168], "sci-9-fr": [78, 152],
  "math-3202": [125, 37],
  "physics-3204": [52, 30], "math-2202": [114, 45], "physics-2204": [56, 39],
  "chem-2202": [87, 31], "sci-1206": [55, 123], "earth-3209": [388, 24]
};
const REMOVED = ["math-9:u1-ooo-first-error","math-9:u3-find-the-error","math-9:u9-generalization-critique","math-9-fr:u1-ooo-first-error","math-9-fr:u3-find-the-error","math-9-fr:u9-generalization-critique","math-1201:u2-error","math-1201:u4-context-problem","math-1201:u4-domain-decision","math-1201:u4-function-repair","math-1201:u7-elevation-decision","math-2200:u1-law-proof-steps","math-2200:u2-evaluate-claim","math-2200:u2-why-quadratic","math-2200:u3-derive-discriminant-origin","math-2200:u3-discriminant-statements","math-2200:u3-error-analysis","math-2200:u3-error-cts-nonmonic","math-2200:u3-error-discriminant","math-2200:u3-error-graph-read","math-2200:u3-error-reduce","math-2200:u3-factor-test-explain","math-2200:u3-factor-test-which","math-2200:u3-method-compare","math-2200:u3-method-flawed-why","math-2200:u3-method-graph-approx","math-2200:u3-verify-methods","math-2200:u4-identity-truth","math-2200:u9-derive-formulas","math-2201:u3-formula-exact-roots","math-2201:u5-outlier-range","math-2201:u5-poll-position","math-2201:u5-sd-compare","math-3200:u6-proof-invalid-step","math-3201:u2-correct-the-claim-cr","math-3201:u8-reverse-count","math-3208:u3-behaviour-analysis","math-3208:u5-given-deriv","math-3208:u5-rat-arc","math-3208:u5-rat-second","math-2200:u5-solve-extraneous","math-3200:u1-modelling","math-3200:u3-sqrtf-evaluate","math-3200:u4-ratio-problem","math-3200:u5-model-build","math-3200:u7-model-from-data","math-3200:u9-patterns-coefficients","math-3200:u9-binomial-term","math-3200:u9-perm-constraints","math-3200:u9-comb-basic","math-3200:u9-comb-symmetry-solve","math-3201:u2-interpret-model","math-3201:u6-compare-frequency","math-3201:u6-deferred-offer","math-3201:u8-factorial-fraction","math-3208:u4-implicit","math-3208:u5-poly-critical","math-3208:u5-poly-second","math-3208:u5-rat-critical","math-3208:u6-tangent-trig","math-3208:u6-extrema-trig","math-3208:u7-tangent-extremum","math-3208:u7-log-diff-compute","chem-3202:u1-51-rate-explain","chem-3202:u1-52-rate-scenario","chem-3202:u3-79-calorimetry-error","chem-3202:u4-84-label-scenario","chem-3202:u4-84-build-cell"];

/* ---------- harness (mirrors gate-testmap) ---------- */
global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const COURSES = window.COURSES;
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
window.__COURSE = COURSES["math-2201"];
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));
function extractFn(src, name) {
  const start = src.indexOf("function " + name + "(");
  if (start < 0) throw new Error("missing function " + name);
  let i = src.indexOf("{", start), depth = 0;
  for (let j = i; j < src.length; j++) { if (src[j] === "{") depth++; else if (src[j] === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); } }
  throw new Error("unbalanced " + name);
}
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "bimodalClass", "stripQ", "composeExam", "testMapList", "testPlanFor", "isPK", "drawSet", "drawSheetSet"]) eval(extractFn(html, n));
var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) { var e = { id, unit, indicators, level, kind, gen }; if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; } BANK.push(e); }
var CR_MARKS = {}, BIMODAL = {};
var BIMODAL_OFF = false;
function loadBank(cid) {
  BANK.length = 0; _probeCache = {};
  window.__COURSE = COURSES[cid];
  eval(fs.readFileSync(ROOT + "/banks/" + cid + ".js", "utf8"));
  CR_MARKS = window.__BANK_CRMARKS || {};
  BIMODAL = window.__BANK_BIMODAL || {};
  return BANK;
}
var _probeCache = {};
function detexGate(s) { /* the gate's own plain reading of an option's text */
  let t = String(s == null ? "" : s).replace(/\\\(|\\\)|\\\[|\\\]/g, " ").replace(/\$+/g, " ")
    .replace(/\\sqrt\{((?:[^{}]|\{[^{}]*\})*)\}/g, "sqrt($1)")
    .replace(/\\d?frac\{((?:[^{}]|\{[^{}]*\})*)\}\{((?:[^{}]|\{[^{}]*\})*)\}/g, "$1/$2")
    .replace(/\\infty/g, "infinity")
    .replace(/\\pi/g, "pi").replace(/\\theta/g, "theta").replace(/\\alpha/g, "alpha").replace(/\\beta/g, "beta").replace(/\\gamma/g, "gamma").replace(/\\Delta/g, "Delta").replace(/\\delta/g, "delta")
    .replace(/\\pm/g, "±").replace(/\\times/g, "×").replace(/\\leq/g, "<=").replace(/\\geq/g, ">=").replace(/\\neq/g, "≠")
    .replace(/\\(?:text|mathrm|mathbf|mathit|operatorname)\{([^{}]*)\}/g, "$1")
    .replace(/\\%/g, "%").replace(/\\,/g, "")
    .replace(/\\[a-zA-Z]+/g, " ").replace(/[{}]/g, " ").replace(/\\/g, " ");
  return t.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function gateVariants(want) { /* accepted-form set for a class (a) text answer */
  const vs = new Set();
  const add = s => { s = String(s || "").toLowerCase().replace(/\s+/g, " ").trim(); if (s) vs.add(s); };
  add(want);
  const xm = want.match(/^x\s*=\s*(.+)$/); if (xm) add(xm[1]);
  for (const s of [...vs]) {
    if (s.includes("infinity")) add(s.replace(/infinity/g, "inf"));
    add(s.replace(/±/g, "+/-")); add(s.replace(/×/g, "x")); add(s.replace(/≠/g, "!=")); add(s.replace(/\bpi\b/g, "π"));
  }
  return vs;
}
function entryById(id) { return BANK.find(e => e.id === id); }

/* ---------- 1 and 2: registration and strip form ---------- */
for (const cid of Object.keys(EXPECT_BIMODAL)) {
  loadBank(cid);
  const ids = Object.keys(BIMODAL);
  const na = ids.filter(i => BIMODAL[i] === "a").length, nb = ids.filter(i => BIMODAL[i] === "b").length;
  ok(na === EXPECT_BIMODAL[cid][0] && nb === EXPECT_BIMODAL[cid][1],
    cid + ": BIMODAL counts a=" + na + " b=" + nb + ", expected " + EXPECT_BIMODAL[cid].join("/"));
  for (const id of ids) {
    const e = entryById(id);
    ok(!!e, cid + " " + id + ": bimodal entry exists in the bank");
    if (!e) continue;
    ok(CR_MARKS[id] >= 2, cid + " " + id + ": bimodal entry keeps CR marks >= 2");
    let bad = 0, checked = 0;
    for (let d = 0; d < 40 && checked < 25; d++) {
      let q0; try { q0 = e.gen(); } catch (err) { bad++; break; }
      if (!q0 || q0.type !== "mc") continue;
      checked++;
      q0._entry = e;
      const optsBefore = q0.options.slice();
      const q = stripQ(q0);
      if (q.type === "mc" || q.options !== undefined) bad++;
      if (q.prompt !== q0.prompt || q.solution !== q0.solution) bad++;
      if (q0.options.join("\u0001") !== optsBefore.join("\u0001")) bad++; /* strip must not mutate the draw */
      if (q.answerText !== String(optsBefore[q0.correct])) bad++;
      const want = detexGate(optsBefore[q0.correct]);
      if (BIMODAL[id] === "a") {
        const numT = want.replace(/[$,%°]/g, "").replace(/,/g, "").trim();
        if (/^[-+]?(\d+\.?\d*|\.\d+)$/.test(numT)) {
          if (q.type !== "num" || Math.abs(parseFloat(numT) - q.answer) > q.tol + 1e-12) bad++;
        } else {
          if (q.type !== "text" || !(q.answers || []).some(a => gateVariants(want).has(a))) bad++;
        }
      } else {
        if (q.type !== "text" || q.selfCheck !== true) bad++;
      }
    }
    ok(checked >= 20, cid + " " + id + ": drew " + checked + " mc questions to strip-check");
    ok(bad === 0, cid + " " + id + ": strip form clean over draws (" + bad + " bad)");
  }
}
for (const tag of REMOVED) {
  const [cid, id] = tag.split(":");
  if (!EXPECT_BIMODAL[cid] && cid !== "chem-3202") continue;
  loadBank(cid);
  ok(CR_MARKS[id] === undefined, tag + ": no CR marks after registration");
  ok(BIMODAL[id] === undefined, tag + ": not registered bimodal");
}

/* ---------- 3: unit papers (test scope) and the toggle on
   multi-unit composed papers ---------- */
function paperInvariants(cid, res, mode) {
  if (!res) { ok(false, cid + ": composeExam returned null (" + mode + ")"); return; }
  const srIds = {}, crIds = {};
  for (const it of res.srItems) {
    srIds[it.q._entry.id] = 1;
    if (mode === "off") ok(!bimodalClass(it.q._entry), cid + ": toggle off deals no bimodal entry in Section A (" + it.q._entry.id + ")");
  }
  for (const it of res.crItems) {
    crIds[it.q._entry.id] = 1;
    ok(it.q.type !== "mc", cid + ": no multiple-choice question in Section B (" + mode + ", " + it.q._entry.id + ")");
    if (bimodalClass(it.q._entry)) ok(it.q.stripped === true, cid + ": bimodal Section B item is stripped (" + it.q._entry.id + ")");
    if (mode === "on") ok(!bimodalClass(it.q._entry), cid + ": toggle on deals no bimodal entry in Section B (" + it.q._entry.id + ")");
  }
  for (const id of Object.keys(crIds)) ok(!srIds[id], cid + ": entry " + id + " serves only one section (" + mode + ")");
}
for (const cid of Object.keys(EXPECT_BIMODAL)) {
  loadBank(cid);
  const units = [...new Set(BANK.map(e => e.unit))].sort((a, b) => a - b);
  for (const u of units) {
    BIMODAL_OFF = false; paperInvariants(cid + " U" + u, composeExam([u], [], false), "test");
    BIMODAL_OFF = true; paperInvariants(cid + " U" + u, composeExam([u], [], false), "test");
  }
  /* Multi-unit composed papers are practice papers, where the
     toggle governs placement. Courses whose composer is
     single-unit only return null here and are skipped. */
  if (units.length >= 2) {
    BIMODAL_OFF = false;
    const resOn = composeExam([units[0], units[1]], [], false);
    if (resOn) paperInvariants(cid + " multi", resOn, "on");
    BIMODAL_OFF = true;
    const resOff = composeExam([units[0], units[1]], [], false);
    if (resOff) paperInvariants(cid + " multi", resOff, "off");
  }
}
BIMODAL_OFF = false;

/* ---------- 4: test scope, targets from the plan data ---------- */
let testCount = 0;
for (const cid of Object.keys(COURSES)) {
  const C = COURSES[cid];
  if (!C.testMap) continue;
  loadBank(cid);
  for (const u of Object.keys(C.testMap)) {
    for (const t of C.testMap[u]) {
      const plan = testPlanFor(C, +u, t.test);
      if (!plan) continue;
      testCount++;
      for (const off of [false, true]) {
        BIMODAL_OFF = off;
        let exact = 0;
        for (let trial = 0; trial < 3; trial++) {
          const res = composeExam([+u], [], false, plan);
          if (!res) continue;
          if (!res.short && res.srMarks === plan.sr && res.crMarks === plan.cr) exact++;
          paperInvariants(cid + " U" + u + " T" + t.test, res, "test");
        }
        ok(exact >= 2, cid + " U" + u + " T" + t.test + ": fills exactly under the blueprint with toggle " + (off ? "off" : "on") + " (" + exact + "/3)");
      }
    }
  }
}
BIMODAL_OFF = false;
ok(testCount >= 95, "mapped tests swept: " + testCount);

/* ---------- 5: sheets ---------- */
for (const cid of ["math-2201", "math-9", "chem-3202"]) {
  loadBank(cid);
  const units = [...new Set(BANK.map(e => e.unit))].sort((a, b) => a - b).slice(0, 3);
  const base = { units, inds: [], mix: [20, 60, 20], order: "unit", midCap: false, finalCap: false };
  let s = Object.assign({}, base, { mcCount: 0, ncCount: 10, bimodal: false });
  let r = drawSheetSet(s);
  ok(r.items.every(q => q.type !== "mc"), cid + ": choices-off constructed sheet carries no multiple-choice item");
  s = Object.assign({}, base, { mcCount: 10, ncCount: 0, bimodal: false });
  r = drawSheetSet(s);
  ok(r.items.every(q => !bimodalClass(q._entry)), cid + ": choices-off multiple-choice sheet carries no bimodal entry");
  s = Object.assign({}, base, { mcCount: 0, ncCount: 10, bimodal: true });
  r = drawSheetSet(s);
  ok(r.items.every(q => !bimodalClass(q._entry)), cid + ": choices-on constructed sheet carries no bimodal entry");
}

console.log("GATE-BIMODAL: " + pass + " passed, " + fail + " failed");
if (fails.length) { console.log("FAIL: " + fails.join(" | ")); process.exit(1); }
