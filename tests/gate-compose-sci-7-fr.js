#!/usr/bin/env node
/* Gate (composition) for French Science 7: the shell's own
   composeExam must compose the unit test convention from each unit
   alone: 20 selected response at 1 mark plus 2 constructed response
   at 3 marks, 26 marks total (the convention registered for this
   course, mirroring the English grade). At least 190 of 200 trials
   per unit must land exactly on shape, with no repeated prompt on
   a paper, the per-indicator cap of 2 respected, the CR split
   exactly 3+3, and each unit's 4-mark design CR never composed
   while remaining available to practice draws. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["sci-7-fr"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/sci-7-fr.js", "utf8"));
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam", "drawSet"]) eval(extractFn(html, n));

function runUnit(unit, designCR, designInd) {
  let good = 0, firstBad = null;
  const indMaxDist = {};
  const crSplits = {};
  let designCRCount = 0;
  let capViol = 0, denomViol = 0, totalViol = 0;
  for (let t = 0; t < 200; t++) {
    const res = composeExam([unit], []);
    if (!res) { if (!firstBad) firstBad = "composeExam returned null"; continue; }
    let clean = res.total === 26 && res.srMarks === 20 && res.crMarks === 6 && !res.short;
    let why = clean ? "" : "off-shape (total " + res.total + ", sr " + res.srMarks + ", cr " + res.crMarks + ", short " + res.short + ")";
    if (res.total !== 26) totalViol++;
    const prompts = new Set();
    const indCount = {};
    const targets = new Set();
    for (const it of res.srItems.concat(res.crItems)) {
      if (prompts.has(it.q.prompt)) { if (clean) { clean = false; why = "duplicate prompt"; } }
      prompts.add(it.q.prompt);
      const tag = it.q._entry.indicators[0];
      indCount[tag] = (indCount[tag] || 0) + 1;
      targets.add(tag.split(".")[1]);
    }
    const mx = Math.max.apply(null, Object.values(indCount).concat([0]));
    indMaxDist[mx] = (indMaxDist[mx] || 0) + 1;
    if (mx > 2) capViol++;
    if (res.crItems.some(it => it.q._entry.id === designCR)) designCRCount++;
    if (res.crMarks === 6) {
      const ms = res.crItems.map(it => CR_MARKS[it.q._entry.id]).sort((a, b) => a - b).join("+");
      crSplits[ms] = (crSplits[ms] || 0) + 1;
      if (ms !== "3+3" || res.crItems.length !== 2) denomViol++;
    }
    if (clean && targets.size < 3) { clean = false; why = "SR spread misses a target: " + [...targets].join(","); }
    if (clean && res.crItems.length !== 2) { clean = false; why = "CR item count " + res.crItems.length; }
    if (clean) good++;
    else if (!firstBad) firstBad = why;
  }
  console.log("Unit " + unit + " test composition: " + good + "/200 exact (26 total, 20 SR, 2 CR at 3 marks)" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
  console.log("Unit " + unit + " max entries sharing one indicator per paper: " + JSON.stringify(indMaxDist) + "; papers over the cap of 2: " + capViol);
  console.log("Unit " + unit + " CR denomination splits: " + JSON.stringify(crSplits) + "; off-preference papers (CR marks 6, not 3+3): " + denomViol + "; design CR in " + designCRCount + " papers");
  const dEntry = BANK.find(e => e.id === designCR);
  let practiceOk = !!dEntry && dEntry.noCompose === true;
  console.log("Unit " + unit + " design CR entry present with noCompose flag: " + practiceOk);
  const inPool = poolFor([unit], [], false).some(e => e.id === designCR);
  console.log("Unit " + unit + " design CR present in the practice pool (poolFor): " + inPool);
  let dealt = 0;
  for (let t = 0; t < 80 && inPool; t++) {
    const r = drawSet([unit], [designInd], 8, [20, 60, 20], "unit", false);
    if (r.items.some(q => q._entry.id === designCR)) dealt++;
  }
  console.log("Unit " + unit + " design CR dealt in " + dealt + "/80 practice draws on " + designInd);
  practiceOk = practiceOk && inPool && dealt > 0;
  return good >= 190 && capViol === 0 && denomViol === 0 && designCRCount === 0 && practiceOk;
}

const passU1 = runUnit(1, "s7f-u1-cr-design-experiment", "SC7.3.8");
const passU2 = runUnit(2, "s7f-u2-cr-design-test", "SC7.6.6");
const passU3 = runUnit(3, "s7f-u3-cr-design-solubility", "SC7.9.5");
const passU4 = runUnit(4, "s7f-u4-cr-design-investigation", "SC7.12.5");
const pass = passU1 && passU2 && passU3 && passU4;
console.log(pass ? "GATE-COMPOSE-SCI-7-FR: PASS" : "GATE-COMPOSE-SCI-7-FR: FAIL");
process.exit(pass ? 0 : 1);
