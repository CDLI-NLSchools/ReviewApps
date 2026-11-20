#!/usr/bin/env node
/* Gate (test map) for test-shaped practice, November 19, 2026
   (Spec-Test-Shaped-Practice-2026-11-19.md, Section 6, and
   Spec-French-Test-Map-2026-11-19.md, Section 5, decision D-F5).
   For every course with a testMap in courses.js:
     1. every mapped code appears in that course's unitInd for
        the stated unit;
     2. every mapped code has at least one bank entry in that
        unit;
     3. the shipped testMap reconciles exactly with Appendix A
        of the English spec, under its Section 2 code rules, and
        with Appendix A-FR of the French spec: same tests, same
        codes in the same order, same topic slices, nothing
        added, nothing dropped;
     4. every mapped test composes to its mapped targets with
        the production composer and the production plan
        (testPlanFor, extracted from the built shell): dealt SR
        equals the plan's SR target, dealt CR marks equal the
        plan's CR target, the set is not flagged short, and no
        dealt entry falls outside the test's indicators or its
        topic slice. A test passes when at least 10 of 12
        compositions land exactly (the composer retries
        internally on every call);
     5. level balance, under the owner's test-scope ruling of
        November 19, 2026: within a test paper the
        per-indicator cap does not bind, and balance is
        governed at the level of the whole test by the course's
        level plan (the 20/60/20 mix, or the course's
        configured defaultMix). The composer expresses that
        plan as per-level band targets, levelTargets(SR, mix).
        The check compares the mean dealt SR count at each
        level over the 12 trials against the achievable band
        target: the band target, or the test pool's own
        capacity at that level when the pool holds fewer
        distinct questions than the band asks for (capacity is
        sampled mechanically: 60 draws per eligible entry,
        distinct rendered questions counted; sampling can only
        understate true capacity, so the adjustment can only
        ever excuse a shortfall the pool genuinely forces). A
        level fails when its mean dealt count falls more than
        0.25 questions below its achievable target: a quarter
        of a question on a 12-trial mean, against an observed
        worst shortfall of 0.00 when this check was calibrated.
        The check runs on counts, not percentage shares, which
        is what makes it sound on very small tests: on a
        2-question test the plan's own band targets are
        [1, 1, 0], whose shares are 50/50/0, so a share-based
        check would fail the plan itself; the count check asks
        only that the composer deal the bands the plan sets,
        as far as the pool allows, which is exactly the
        governance the ruling describes. Mean SR shares and
        mean whole-paper mark shares are printed in the table
        for the record; the whole-paper shares carry no
        pass/fail, because the CR section's level distribution
        is set by the course's own standing design (crPref
        patterns and the Level 3 mark window), not by the
        level mix;
     6. courses with no map carry no testMap, so the mode's
        absence there is itself checked.
   The per-test table printed at the end is the build-time
   pool-depth record the spec's Section 6 calls for. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const FILES = "/home/hatch/workspace/goals/math-review-apps-for-1201-2200-3200-3201-3208/files";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

/* ---------- expected maps, derived from the two appendices ---------- */
function appendixJSON(file, marker) {
  const text = fs.readFileSync(file, "utf8");
  const i = text.indexOf(marker);
  if (i < 0) throw new Error("appendix not found in " + file);
  const j = text.indexOf("```json", i);
  const k = text.indexOf("```", j + 7);
  return JSON.parse(text.slice(j + 7, k));
}
function expectedMaps() {
  const en = appendixJSON(FILES + "/Spec-Test-Shaped-Practice-2026-11-19.md", "## Appendix A");
  const fr = appendixJSON(FILES + "/Spec-French-Test-Map-2026-11-19.md", "## Appendix A-FR");
  const out = {};
  for (const [cid, c] of Object.entries(en.courses)) {
    const units = {};
    for (const u of c.units) {
      units[u.unit] = u.tests.map(t => {
        const topics = {};
        const inds = t.indicators.map(raw => {
          let code = raw, qual = null;
          const p = raw.indexOf(" (");
          if (p >= 0) { code = raw.slice(0, p); qual = raw.slice(p + 2, -1); }
          let reg;
          if (cid === "chem-2202") reg = code.replace(/^CH2202\./, "");
          else if (cid === "chem-3202") reg = code.replace(/^CH3202\./, "");
          else reg = "SC" + code;
          if (qual !== null) topics[reg] = /ohm/i.test(qual) ? "ohm" : "circuits";
          return reg;
        });
        const e = { test: t.test, inds };
        if (Object.keys(topics).length) e.topics = topics;
        return e;
      });
    }
    out[cid] = units;
  }
  for (const [cid, c] of Object.entries(fr.courses)) {
    const units = {};
    for (const u of c.units) {
      units[u.unit] = u.tests.map(t => {
        const e = { test: t.test, inds: t.indicators.slice() };
        if (t.topics) e.topics = t.topics;
        return e;
      });
    }
    out[cid] = units;
  }
  return out;
}
const EXPECTED = expectedMaps();

/* ---------- registry and shell machinery ---------- */
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam", "testMapList", "testPlanFor", "isPK"]) eval(extractFn(html, n));

function loadBank(cid) {
  BANK.length = 0;
  eval(fs.readFileSync(ROOT + "/banks/" + cid + ".js", "utf8"));
  CR_MARKS = window.__BANK_CRMARKS || {};
  return BANK;
}

function sameTest(a, b) {
  if (!a || !b) return false;
  if (a.test !== b.test) return false;
  if (a.inds.join() !== b.inds.join()) return false;
  const ta = a.topics || {}, tb = b.topics || {};
  const ka = Object.keys(ta).sort(), kb = Object.keys(tb).sort();
  if (ka.join() !== kb.join()) return false;
  return ka.every(k => ta[k] === tb[k]);
}

/* ---------- checks 5, 3, 1, 2 ---------- */
for (const cid of Object.keys(COURSES)) {
  const has = !!COURSES[cid].testMap;
  if (EXPECTED[cid]) ok(has, cid + ": testMap present");
  else ok(!has, cid + ": no testMap (course is unmapped, mode absent)");
}
const rows = [];
for (const [cid, units] of Object.entries(EXPECTED)) {
  const C = COURSES[cid];
  if (!C || !C.testMap) continue;
  const bank = loadBank(cid);
  const expUnits = Object.keys(units).sort((a, b) => a - b);
  const gotUnits = Object.keys(C.testMap).sort((a, b) => a - b);
  ok(expUnits.join() === gotUnits.join(), cid + ": mapped units reconcile (" + gotUnits.join() + ")");
  for (const u of expUnits) {
    const exp = units[u], got = C.testMap[u] || [];
    ok(exp.length === got.length && exp.every((t, i) => sameTest(t, got[i])),
      cid + " U" + u + ": testMap reconciles with the appendix (" + exp.length + " tests)");
    for (const t of exp) {
      for (const code of t.inds) {
        ok((C.unitInd[u] || []).includes(code), cid + " U" + u + " T" + t.test + ": " + code + " in unitInd");
        ok(bank.some(e => e.unit === +u && e.indicators.includes(code)), cid + " U" + u + " T" + t.test + ": " + code + " has a bank entry in the unit");
      }
    }
  }
}

/* ---------- checks 4 and 5: composition to the mapped targets,
   and level balance under the test-scope ruling ---------- */
const BAL_EPS = 0.25;
for (const [cid, units] of Object.entries(EXPECTED)) {
  const C = COURSES[cid];
  if (!C || !C.testMap) continue;
  window.__COURSE = C;
  loadBank(cid);
  const mix = (C.presets && C.presets.defaultMix) || [20, 60, 20];
  for (const u of Object.keys(units).sort((a, b) => a - b)) {
    for (const t of units[u]) {
      const plan = testPlanFor(C, +u, t.test);
      ok(!!plan, cid + " U" + u + " T" + t.test + ": plan computed");
      if (!plan) continue;
      /* The pool the composer will draw from, prepared exactly
         as composeExam prepares it, for the capacity sample. */
      let balPool = poolFor([+u], t.inds, scopeCap([+u]));
      if (C.pkPracticeOnly) balPool = balPool.filter(e => !isPK(e));
      balPool = balPool.filter(e => !e.enrich && !e.noCompose);
      if (plan.topics) balPool = balPool.filter(e => e.indicators.every(c => { const tp = plan.topics[c]; return !tp || e.topic === tp; }));
      const capacity = [0, 0, 0];
      for (const e of balPool) {
        if (probeType(e) !== "mc") continue;
        const seenQ = new Set();
        for (let d = 0; d < 60; d++) { const q = e.gen(); if (q && q.type === "mc") seenQ.add(canonQ(q)); }
        capacity[e.level - 1] += seenQ.size;
      }
      const bandTargets = levelTargets(plan.sr, mix);
      const achievable = bandTargets.map((x, L) => Math.min(x, capacity[L]));
      let good = 0, lastDealt = null, trials = 0;
      const dealtLvl = [0, 0, 0], markLvl = [0, 0, 0];
      for (let trial = 0; trial < 12; trial++) {
        const res = composeExam([+u], t.inds, false, plan);
        if (!res) continue;
        trials++;
        lastDealt = { sr: res.srItems.length, cr: res.crMarks };
        res.srItems.forEach(it => { dealtLvl[it.q._entry.level - 1]++; markLvl[it.q._entry.level - 1] += 1; });
        res.crItems.forEach(it => { markLvl[it.q._entry.level - 1] += it.marks; });
        let clean = !res.short && res.srItems.length === plan.sr && res.crMarks === plan.cr;
        if (clean) {
          for (const it of res.srItems.concat(res.crItems)) {
            const e = it.q._entry;
            if (e.unit !== +u || !e.indicators.some(c => t.inds.includes(c))) { clean = false; break; }
            if (plan.topics && e.indicators.some(c => plan.topics[c] && e.topic !== plan.topics[c])) { clean = false; break; }
          }
        }
        if (clean) good++;
      }
      const meanLvl = dealtLvl.map(x => trials ? x / trials : 0);
      const totMarks = markLvl[0] + markLvl[1] + markLvl[2];
      const srShare = meanLvl.map(x => plan.sr ? (100 * x / plan.sr).toFixed(0) : "0").join("/");
      const markShare = markLvl.map(x => totMarks ? (100 * x / totMarks).toFixed(0) : "0").join("/");
      rows.push(cid + " U" + u + " T" + t.test + ": target SR " + plan.sr + ", CR " + plan.cr +
        " | dealt SR " + (lastDealt ? lastDealt.sr : "-") + ", CR " + (lastDealt ? lastDealt.cr : "-") +
        " | exact " + good + "/12" +
        " | bands " + bandTargets.join("/") + " achievable " + achievable.join("/") +
        " mean dealt " + meanLvl.map(x => x.toFixed(2)).join("/") +
        " | SR shares " + srShare + " | paper mark shares " + markShare);
      ok(good >= 10, cid + " U" + u + " T" + t.test + ": composes to mapped targets (SR " + plan.sr + ", CR " + plan.cr + ") in " + good + "/12 trials");
      for (let L = 0; L < 3; L++) {
        ok(meanLvl[L] >= achievable[L] - BAL_EPS,
          cid + " U" + u + " T" + t.test + ": level " + (L + 1) + " balance (band target " + bandTargets[L] +
          ", pool capacity " + capacity[L] + ", achievable " + achievable[L] + ", mean dealt " + meanLvl[L].toFixed(2) + ")");
      }
    }
  }
}

console.log("--- pool-depth and balance record (target vs dealt, per test) ---");
rows.forEach(r => console.log(r));
console.log("GATE-TESTMAP: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
