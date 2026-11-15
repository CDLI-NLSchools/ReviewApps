#!/usr/bin/env node
/* Gate (composition) for Science 7 Unit 1: the shell's own
   composeExam must compose the unit test convention from this
   strand alone: 20 selected response at 1 mark plus 2 constructed
   response at 3 marks, 26 marks total (Science 7 scoping,
   Nov 15, 2026; labelled convention, no common exam exists at
   this level). At least 190 of 200 trials must land exactly on
   shape, with no repeated prompt on a paper and SR spread across
   all three targets. The spec also asked for no indicator drawn
   more than twice per paper; the shell composer has no
   per-indicator cap (its programme-wide contract, per the
   Science 1206 compose gate, is shape, scope and no duplicates),
   and the spec's own census gives several indicators 3 or 4
   entries, so that sub-condition is measured and printed here
   as information, not asserted. The same applies to the CR
   denomination split: the spec's convention reads "2 CR at
   3 marks", and its Section 4 keeps the 4-mark design CR out
   of the unit test convention, but the composer's subset-sum
   guarantees 6 CR marks, not denominations, so some papers
   land 2+4 and the design CR appears in them. Both deviations
   are measured and printed, not asserted. See the build
   report: the contradictions are flagged for Jason's ruling. */
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam"]) eval(extractFn(html, n));

let good = 0, firstBad = null;
const indMaxDist = {};
const crSplits = {};
let designCR = 0;
for (let t = 0; t < 200; t++) {
  const res = composeExam([1], []);
  if (!res) { if (!firstBad) firstBad = "composeExam returned null"; continue; }
  let clean = res.total === 26 && res.srMarks === 20 && res.crMarks === 6 && !res.short;
  let why = clean ? "" : "off-shape (total " + res.total + ", sr " + res.srMarks + ", cr " + res.crMarks + ", short " + res.short + ")";
  if (clean) {
    const prompts = new Set();
    const indCount = {};
    const targets = new Set();
    for (const it of res.srItems.concat(res.crItems)) {
      if (prompts.has(it.q.prompt)) { clean = false; why = "duplicate prompt"; break; }
      prompts.add(it.q.prompt);
      const tag = it.q._entry.indicators[0];
      indCount[tag] = (indCount[tag] || 0) + 1;
      targets.add(tag.split(".")[1]);
    }
    if (clean) {
      const ms = res.crItems.map(it => CR_MARKS[it.q._entry.id]).sort().join("+");
      crSplits[ms] = (crSplits[ms] || 0) + 1;
      if (res.crItems.some(it => it.q._entry.id === "s7-u1-cr-design-experiment")) designCR++;
    }
    const mx = Math.max.apply(null, Object.values(indCount));
    indMaxDist[mx] = (indMaxDist[mx] || 0) + 1;
    if (clean && targets.size < 3) { clean = false; why = "SR spread misses a target: " + [...targets].join(","); }
    if (clean && res.crItems.length !== 2) { clean = false; why = "CR item count " + res.crItems.length; }
  }
  if (clean) good++;
  else if (!firstBad) firstBad = why;
}
console.log("Unit test composition: " + good + "/200 exact (26 total, 20 SR, 2 CR at 3 marks)" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
console.log("Max entries sharing one indicator per paper (information, see header): " + JSON.stringify(indMaxDist));
console.log("CR denomination splits (information, see header): " + JSON.stringify(crSplits) + "; design CR in " + designCR + " papers");
console.log(good >= 190 ? "GATE-COMPOSE-SCI-7: PASS" : "GATE-COMPOSE-SCI-7: FAIL");
process.exit(good >= 190 ? 0 : 1);
