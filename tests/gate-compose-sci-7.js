#!/usr/bin/env node
/* Gate (composition) for Science 7 Unit 1: the shell's own
   composeExam must compose the unit test convention from this
   strand alone: 20 selected response at 1 mark plus 2 constructed
   response at 3 marks, 26 marks total (Science 7 scoping,
   Nov 15, 2026; labelled convention, no common exam exists at
   this level). At least 190 of 200 trials must land exactly on
   shape, with no repeated prompt on a paper and SR spread across
   all three targets.
   The Nov 15, 2026 shell change (v1.2.0) added the three
   composer mechanisms the Ecosystems build report flagged for
   Jason's ruling, and this gate now ASSERTS the two spec
   sub-conditions that were previously only measured:
     - per-indicator cap: the sci-7 unit test carries
       unitTest.indCap 2, so no indicator may appear more than
       twice on one composed paper;
     - CR denomination preference: unitTest.crPref [3, 3], so
       every composed paper's CR section is exactly 2 items at
       3 marks whenever the pool can sum that way (it always
       can here);
     - compose exclusion: the 4-mark design CR
       (s7-u1-cr-design-experiment) carries the entry flag
       noCompose and must never appear on a composed paper,
       while remaining available to practice draws (asserted
       below against drawSet on its own indicator). */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["sci-7"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/sci-7.js", "utf8"));
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

const DESIGN_CR = "s7-u1-cr-design-experiment";
let good = 0, firstBad = null;
const indMaxDist = {};
const crSplits = {};
let designCR = 0;
let capViol = 0, denomViol = 0, totalViol = 0;
for (let t = 0; t < 200; t++) {
  const res = composeExam([1], []);
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
  if (res.crItems.some(it => it.q._entry.id === DESIGN_CR)) designCR++;
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
console.log("Unit test composition: " + good + "/200 exact (26 total, 20 SR, 2 CR at 3 marks)" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
console.log("Max entries sharing one indicator per paper: " + JSON.stringify(indMaxDist) + "; papers over the cap of 2: " + capViol);
console.log("CR denomination splits: " + JSON.stringify(crSplits) + "; off-preference papers (CR marks 6, not 3+3): " + denomViol + "; design CR in " + designCR + " papers");

/* The excluded entry stays in the practice pool and is dealt by
   practice draws on its own indicator. */
const dEntry = BANK.find(e => e.id === DESIGN_CR);
let practiceOk = !!dEntry && dEntry.noCompose === true;
console.log("Design CR entry present with noCompose flag: " + practiceOk);
const inPool = poolFor([1], [], false).some(e => e.id === DESIGN_CR);
console.log("Design CR present in the practice pool (poolFor): " + inPool);
let dealt = 0;
for (let t = 0; t < 80 && inPool; t++) {
  const r = drawSet([1], ["SC7.3.8"], 8, [20, 60, 20], "unit", false);
  if (r.items.some(q => q._entry.id === DESIGN_CR)) dealt++;
}
console.log("Design CR dealt in " + dealt + "/80 practice draws on SC7.3.8");
practiceOk = practiceOk && inPool && dealt > 0;

const pass = good >= 190 && capViol === 0 && denomViol === 0 && designCR === 0 && practiceOk;
console.log(pass ? "GATE-COMPOSE-SCI-7: PASS" : "GATE-COMPOSE-SCI-7: FAIL");
process.exit(pass ? 0 : 1);
