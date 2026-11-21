#!/usr/bin/env node
/* Gate 2 (composition) for Math 2201: the shell's composeExam must
   reproduce the standalone composer's pooled blueprint plus its
   two scope rules. The standalone composeExam (Math2201Review.html
   lines 5029 to 5087) pools every multi-unit paper: 50 marks, 27
   selected response, 23 constructed response, level totals
   10/30/10, with the Level 3 share of Section B steered to 8,
   then 9, then 7. Each single-unit test composes 25 marks (SR 11
   / CR 14) exactly in at least 190 of 200 trials.
   The scope rules, both from the standalone:
   - Mid-course cap: a paper over exactly Units 1 to 4 never
     draws the five postMid entries (its poolFor cap argument,
     lines 5033 and 3865 to 3875), while a Unit 4 test on its own
     still reaches them (the cap is keyed to the mid unit set).
   - Prior knowledge: no PK-coded entry appears in any composed
     paper by default (lines 5033 and 3866); passing includePK
     (the teacher override) still composes exact papers.
   - Enrichment (Nov 13, 2026): the two Unit 7 entries flagged
     enrich (converse and contrapositive) never reach a composed
     paper in any scope; stats() counts any appearance and the
     gate fails on it.
   Measured against the standalone itself (200 trials per scope):
   it lands its 8-mark Level 3 target on every preset scope, and
   on the custom Units 2 and 3 scope, whose Level 3 pool sums
   only to multiples of 3, it takes its 9-mark target every time
   (its level totals there follow to 10/29/11). The shell holds
   the level totals at 10/30/10 on that scope by adjusting the
   selected-response plan, as it does for every pooled course,
   and lands the same 9-mark share; the composer retries exact
   papers whose Level 3 share misses the course's crL3 list, so
   the share sits in the 7 to 9 window in every exact paper here. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["math-2201"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-2201.js", "utf8"));
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "bimodalClass", "stripQ", "composeExam"]) eval(extractFn(html, n));

const ENRICH_IDS = ["u7-converse-contrapositive", "u7-converse-truth"];
let enrichPapers = 0;
function stats(res) {
  const s = { total: res.total, sr: res.srMarks, cr: res.crMarks, short: res.short, levels: [0, 0, 0], crL3: 0, ids: [] };
  res.srItems.forEach(it => { s.levels[it.q._entry.level - 1]++; s.ids.push(it.q._entry.id); });
  res.crItems.forEach(it => {
    s.levels[it.q._entry.level - 1] += it.marks;
    if (it.q._entry.level === 3) s.crL3 += it.marks;
    s.ids.push(it.q._entry.id);
  });
  if (s.ids.some(id => ENRICH_IDS.includes(id))) enrichPapers++;
  return s;
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const POSTMID = ["u4-radical-equation", "u4-extraneous", "u4-model-equation", "u4-model-evaluate", "u4-cube-equation"];
const byId = {};
BANK.forEach(e => { byId[e.id] = e; });
const isPkId = id => byId[id].indicators.some(c => c.indexOf("PK") === 0);
let allOk = true;

function runPooled(name, units, trials, driftMax) {
  let exact = 0, within = 0, inWindow = 0, pkSeen = 0, postMidSeen = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam(units, []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (s.ids.some(isPkId)) pkSeen++;
    if (s.ids.some(id => POSTMID.includes(id))) postMidSeen++;
    const drift = s.levels.reduce((a, v, i) => a + Math.abs(v - [10, 30, 10][i]), 0);
    if (!s.short && s.total === 50 && s.sr === 27 && s.cr === 23 && (driftMax ? drift <= driftMax : drift === 0)) {
      within++;
      if (drift === 0) exact++;
      if (s.crL3 >= 7 && s.crL3 <= 9) inWindow++;
    } else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short, levels: s.levels, crL3: s.crL3 }));
  }
  console.log(name + ": exact " + exact + "/" + trials + (driftMax ? " (within drift " + driftMax + ": " + within + "/" + trials + ")" : "") + " (Section B Level 3 in the 7 to 9 window in " + inWindow + " of the counted papers; PK entries in " + pkSeen + " papers; postMid entries in " + postMidSeen + ")" + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  if ((driftMax ? within : exact) < 190) allOk = false;
  if (within > 0 && inWindow / within < 0.95) allOk = false;
  if (pkSeen > 0) { console.log("FAIL: prior-knowledge entries reached a composed paper in " + name); allOk = false; }
  return { postMidSeen };
}

function runUnit(u, trials, opts) {
  opts = opts || {};
  let exact = 0, postMidSeen = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam([u], [], opts.includePK);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (s.ids.some(id => POSTMID.includes(id))) postMidSeen++;
    if (!opts.includePK && s.ids.some(isPkId)) { console.log("FAIL: prior-knowledge entry in a Unit " + u + " test"); allOk = false; }
    if (!s.short && s.total === 25 && s.sr === 11 && s.cr === 14) exact++;
    else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short }));
  }
  console.log("unit " + u + " test" + (opts.includePK ? " (includePK)" : "") + ": exact " + exact + "/" + trials + (postMidSeen ? " (postMid entries appeared in " + postMidSeen + " papers)" : "") + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  if (exact < 190) allOk = false;
  return { postMidSeen };
}

const mid = runPooled("mid [1,2,3,4]", [1, 2, 3, 4], 200);
if (mid.postMidSeen > 0) { console.log("FAIL: postMid entries reached a mid-scope paper (the cap is off)"); allOk = false; }
/* Section A unit order (Nov 18, 2026): a pooled multi-unit paper's
   selected response items must arrive non-decreasing in (unit,
   level), the way Section B's constructed response items already
   did since the composer's own sort. Before the drawAll srItems
   sort, the SR draw ran level band by level band across the whole
   pool and interleaved the units, so this block fails on the
   pre-fix composer. Counts and blueprint behaviour are pinned by
   the exact-paper assertions above; this block pins only order. */
{
  let orderBad = 0;
  const keyOf = it => it.q._entry.unit * 10 + it.q._entry.level;
  for (let t = 0; t < 60; t++) {
    const res = composeExam([1, 2, 3, 4], []);
    if (!res) { orderBad++; continue; }
    for (let i = 1; i < res.srItems.length; i++) if (keyOf(res.srItems[i]) < keyOf(res.srItems[i - 1])) { orderBad++; break; }
    for (let i = 1; i < res.crItems.length; i++) if (keyOf(res.crItems[i]) < keyOf(res.crItems[i - 1])) { orderBad++; break; }
  }
  console.log("Section A unit order: " + (orderBad ? orderBad + " of 60 mid-scope papers out of (unit, level) order" : "all 60 mid-scope papers non-decreasing in (unit, level) in both sections"));
  if (orderBad) allOk = false;
}
/* Ruling 12 drift allowance (November 21, 2026): units 5 to 8
   carry 5 outcomes whose selected-response entries sit only at
   Level 3, against a Level 3 selected-response plan room of 1
   to 3 depending on the written set the composer chooses, and
   6 further outcomes with no selected-response entry at all
   competing for the written set, so a paper that covers every
   floored outcome, as the adopted floor requires, can be
   forced off the exact level shape (observed drift up to 6).
   The row bars on totals with drift allowance 8; the strict
   exact count is still printed. */
runPooled("final [5,6,7,8]", [5, 6, 7, 8], 200, 8);
runPooled("custom [2,3]", [2, 3], 200);
runPooled("all [1..8]", [1, 2, 3, 4, 5, 6, 7, 8], 200);
for (const u of [1, 2, 3, 4, 5, 6, 7, 8]) runUnit(u, 200);
const u4 = runUnit(4, 200);
if (u4.postMidSeen === 0) { console.log("FAIL: postMid entries never appeared in a Unit 4 test (the cap is wrongly keyed to the unit)"); allOk = false; }
runUnit(3, 200, { includePK: true });
runUnit(5, 200, { includePK: true });

if (enrichPapers > 0) { console.log("FAIL: enrichment entries reached " + enrichPapers + " composed papers"); allOk = false; }
else console.log("enrichment entries in composed papers: 0");
console.log(allOk ? "GATE-COMPOSE-MATH-2201 PASS" : "GATE-COMPOSE-MATH-2201 FAIL");
process.exit(allOk ? 0 : 1);
