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
     5. level balance, REPORTED, not pass/fail, under the
        owner's test-scope rulings of November 19, 2026 as
        clarified later the same evening. Within a test paper
        the per-indicator cap does not bind, and composition
        aims at balance for the paper as a whole, marks
        included: per-level mark targets from the paper's
        total marks under the course's level plan (the
        20/60/20 mix, or the course's configured defaultMix),
        the constructed-response set chosen to bring the
        paper closest to those targets, and the
        selected-response bands filling the room it leaves.
        The level plan is an aim, not a compliance line
        (owner's clarification): 20/60/20 is aspirational,
        and the governing question is whether the outcomes
        are assessed at the levels the guides' indicators
        and elaborations suggest, which the banks'
        per-indicator level mixes encode. This section
        therefore measures and prints, per test: the mean
        dealt mark share at each level over the 12 trials;
        the achievable bound at each level (the mark
        interval the scoped pool can actually deal: SR
        capacity sampled mechanically, 60 draws per
        eligible entry with distinct rendered questions
        counted, which can only understate true capacity;
        CR capacity exact, from the reachable level splits
        of the mapped CR total over the pool's CR
        denominations); the dealt whole-paper deviation
        from the plan targets, in marks; and the minimum
        deviation any single paper in the pool can achieve.
        A test is reported "at the achievable bound" when
        its dealt deviation sits within BAL_TOL_MARKS of
        that minimum (half a mark on a 12-trial mean).
        One deliberate exception: the composer scores the
        CR section's character ahead of whole-paper fit
        (owner steering, November 19, 2026: Level 3 lives
        primarily in the constructed response, and the
        balance aim is not served by flattening CR toward
        Level 2), so where the character-preferred CR set
        is not the balance-optimal one, the dealt deviation
        sits above the pool minimum by the cost of that
        preference, and the table reports the gap rather
        than hiding it. A test whose minimum deviation is above
        zero is pool-forced: no perfectly balanced paper
        exists in its pool, and it is named in the summary
        with the level and section where its pool binds.
        None of this fails the gate; the figures are the
        record the build addendum carries. (This measurement
        supersedes the SR-only pass/fail balance check
        shipped earlier on November 19, 2026, which held the
        selected-response bands to the plan and treated the
        whole-paper shares as information only.)
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

/* ---------- check 4 (pass/fail): composition to the mapped
   targets. Check 5 (reported only): whole-paper level balance,
   measured against the plan targets and the achievable bound.
   See the header. ---------- */
const BAL_TOL_MARKS = 0.5;
const forcedRows = [];
let balTests = 0, balAtBound = 0;
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
      /* Achievable bound, per level, in marks. SR capacity:
         sampled distinct rendered questions (SR items are one
         mark each). CR capacity: the exact reachable level
         splits of the mapped CR total over the pool's CR
         denominations (CR entries carry 2+ marks, Level 2 or
         3 only). hi/lo combine the sections: hi is the most
         marks the level can carry on one paper, lo the fewest
         the section totals force into it. */
      const srCap = [0, 0, 0], crCap = [0, 0, 0], crEntries = [];
      for (const e of balPool) {
        if (probeType(e) === "mc") {
          const seenQ = new Set();
          for (let d = 0; d < 60; d++) { const q = e.gen(); if (q && q.type === "mc") seenQ.add(canonQ(q)); }
          srCap[e.level - 1] += seenQ.size;
        }
        if (typeof CR_MARKS[e.id] === "number" && CR_MARKS[e.id] >= 2 && e.level >= 2) {
          crCap[e.level - 1] += CR_MARKS[e.id];
          crEntries.push({ marks: CR_MARKS[e.id], level: e.level });
        }
      }
      let splitSet = new Set(["0,0"]);
      for (const x of crEntries) {
        const next = new Set(splitSet);
        for (const s of splitSet) {
          const ab = s.split(",").map(Number);
          const na = x.level === 2 ? ab[0] + x.marks : ab[0], nb = x.level === 3 ? ab[1] + x.marks : ab[1];
          if (na + nb <= plan.cr) next.add(na + "," + nb);
        }
        splitSet = next;
      }
      const splits = [...splitSet].map(s => s.split(",").map(Number)).filter(ab => ab[0] + ab[1] === plan.cr);
      const totalMarks = plan.sr + plan.cr;
      const markTargets = levelTargets(totalMarks, mix);
      const srCapTot = srCap[0] + srCap[1] + srCap[2];
      const lo = [0, 0, 0], hi = [0, 0, 0];
      for (let L = 0; L < 3; L++) {
        const atL = splits.map(ab => L === 1 ? ab[0] : L === 2 ? ab[1] : 0);
        hi[L] = Math.min(srCap[L], plan.sr) + (atL.length ? Math.max(...atL) : 0);
        lo[L] = Math.max(0, plan.sr - (srCapTot - srCap[L])) + (atL.length ? Math.min(...atL) : 0);
      }
      /* The minimum whole-paper deviation (marks) any single
         paper in this pool can achieve, over every reachable
         CR split and every SR distribution the caps allow. */
      let minDev = Infinity;
      for (const ab of (splits.length ? splits : [[0, 0]])) {
        for (let x = 0; x <= Math.min(srCap[0], plan.sr); x++) {
          for (let y = 0; y <= Math.min(srCap[1], plan.sr - x); y++) {
            const z = plan.sr - x - y;
            if (z < 0 || z > srCap[2]) continue;
            const dev = Math.abs(x - markTargets[0]) + Math.abs(y + ab[0] - markTargets[1]) + Math.abs(z + ab[1] - markTargets[2]);
            if (dev < minDev) minDev = dev;
          }
        }
      }
      let good = 0, lastDealt = null, trials = 0;
      const markLvl = [0, 0, 0];
      for (let trial = 0; trial < 12; trial++) {
        const res = composeExam([+u], t.inds, false, plan);
        if (!res) continue;
        trials++;
        lastDealt = { sr: res.srItems.length, cr: res.crMarks };
        res.srItems.forEach(it => { markLvl[it.q._entry.level - 1] += 1; });
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
      ok(good >= 10, cid + " U" + u + " T" + t.test + ": composes to mapped targets (SR " + plan.sr + ", CR " + plan.cr + ") in " + good + "/12 trials");
      /* Balance measurement (reported, never pass/fail). */
      const meanMarks = markLvl.map(x => trials ? x / trials : 0);
      const markShare = meanMarks.map(x => totalMarks ? (100 * x / totalMarks).toFixed(0) : "0").join("/");
      const planDev = meanMarks.reduce((s, m, L) => s + Math.abs(m - markTargets[L]), 0);
      const atBound = planDev <= minDev + BAL_TOL_MARKS;
      balTests++;
      if (atBound) balAtBound++;
      const forcedNotes = [];
      for (let L = 0; L < 3; L++) {
        if (markTargets[L] > hi[L]) forcedNotes.push("L" + (L + 1) + " short " + (markTargets[L] - hi[L]) + " mk (SR cap " + srCap[L] + ", CR splits " + splits.map(s => s.join("/")).join(" ") + ")");
        else if (markTargets[L] < lo[L]) forcedNotes.push("L" + (L + 1) + " forced +" + (lo[L] - markTargets[L]) + " mk (SR cap " + srCap[L] + ", CR splits " + splits.map(s => s.join("/")).join(" ") + ")");
      }
      if (minDev > 0) forcedRows.push(cid + " U" + u + " T" + t.test + ": minimum achievable deviation " + minDev + " mk" +
        (forcedNotes.length ? " | " + forcedNotes.join("; ") : " | levels bind jointly (each level inside its own interval; the totals cannot all land at once)"));
      rows.push(cid + " U" + u + " T" + t.test + ": target SR " + plan.sr + ", CR " + plan.cr +
        " | dealt SR " + (lastDealt ? lastDealt.sr : "-") + ", CR " + (lastDealt ? lastDealt.cr : "-") +
        " | exact " + good + "/12" +
        " | mark targets " + markTargets.join("/") + " achievable " + lo.map((x, L) => x + "-" + hi[L]).join("/") +
        " mean dealt marks " + meanMarks.map(x => x.toFixed(2)).join("/") +
        " | paper mark shares " + markShare +
        " | deviation " + planDev.toFixed(2) + " mk (minimum achievable " + minDev + ")" +
        (atBound ? " | at the achievable bound" : " | above the pool minimum by " + (planDev - minDev).toFixed(2) + " mk"));
    }
  }
}

console.log("--- pool-depth and balance record (target vs dealt, per test) ---");
rows.forEach(r => console.log(r));
console.log("--- balance summary (reported measurement, not pass/fail) ---");
console.log("tests measured: " + balTests + " | dealt at the achievable bound: " + balAtBound + " | pool-forced (no perfectly balanced paper exists): " + forcedRows.length);
forcedRows.forEach(r => console.log("POOL-FORCED: " + r));
console.log("GATE-TESTMAP: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
