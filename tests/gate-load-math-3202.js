#!/usr/bin/env node
/* Gate 1 (load) for Math 3202: chassis helpers + courses.js + the
   assembled Math 3202 bank module evaluate cleanly; BANK has 227
   entries (the standalone app's 157 plus the 70 added by the prior
   knowledge tranche of November 15, 2026, per unit 23/25/22/25/
   22/21/21/27/22/19); window.__BANK_CRMARKS has 51 keys (the standalone
   bank source's own CR_MARKS map, carried as manifest comments; the
   work/cr*.txt sidecars agree with it but the bank source is the
   authority); every registered indicator has entries and no entry
   uses an unregistered code; every entry generates a prompt in this
   shell and every multiple choice generation has exactly four
   options. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-3202"], "math-3202 registered");
window.__COURSE = window.COURSES["math-3202"];
ok(window.__COURSE.listed === true, "math-3202 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 12, "picker metadata: Mathematics, grade 12");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Measurement" && UNITS[10] === "Probability", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 10, "UNITS has 10 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 74, "INDICATORS has 74 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-3202.js", "utf8"));

ok(BANK.length === 227, "BANK has 227 entries, saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
ok(crKeys.length === 51, "__BANK_CRMARKS has 51 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 23, 2: 25, 3: 22, 4: 25, 5: 22, 6: 21, 7: 21, 8: 27, 9: 22, 10: 19 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts match the standalone plus the PK tranche (23/25/22/25/22/21/21/27/22/19), saw " + JSON.stringify(perUnit));

/* The prior knowledge pin (Nov 15, 2026, the PK tranche): the
   flagged set is the tranche's 70 new entries plus the six
   pre-flagged Unit 9 bridging entries, and every flagged entry
   carries its pkSrc, pkFor and pkGroup records. */
const PK_PIN_3202 = ["u1-pk-diameter-fig", "u1-pk-estimate-ref", "u1-pk-measure-read", "u1-pk-reasonable", "u1-pk-referent", "u1-pk-rounding", "u1-pk-tolerance-arithmetic", "u10-pk-classify-probability", "u10-pk-combined-decision", "u10-pk-expected-freq", "u10-pk-prob-basic", "u10-pk-prob-in-media", "u10-pk-two-events", "u2-pk-balance-model", "u2-pk-error-slope", "u2-pk-point-on-graph", "u2-pk-rate-of-change", "u2-pk-rise-run", "u2-pk-slope-ramp", "u2-pk-slope-two-points", "u2-pk-table-equation", "u3-pk-choose-graph", "u3-pk-histogram-read", "u3-pk-interpolate", "u3-pk-misleading-axis", "u3-pk-read-value", "u3-pk-scatter-trend", "u3-pk-trend-basic", "u3-pk-two-conclusions", "u4-pk-central-problem", "u4-pk-mean-basic", "u4-pk-median-mode", "u4-pk-median-range", "u4-pk-median-range-2", "u4-pk-missing-mean", "u4-pk-missing-value", "u5-pk-budget-totals", "u5-pk-card-vs-loan", "u5-pk-credit-interest", "u5-pk-modify-for-goal", "u5-pk-operating-cost", "u5-pk-percent-change", "u5-pk-percent-of-income", "u5-pk-rent-compare", "u6-pk-balance-model", "u6-pk-both-sides", "u6-pk-budget-totals", "u6-pk-deduction-calc", "u6-pk-net-from-deductions", "u6-pk-profit-loss", "u6-pk-week-spending", "u7-pk-adjacent-describe", "u7-pk-comp-supp", "u7-pk-context-transversal", "u7-pk-pair-names", "u7-pk-trans-algebra", "u7-pk-trans-find", "u7-pk-trans-relationships", "u8-pk-corresponding-sides", "u8-pk-reflect-point", "u8-pk-related-shapes", "u8-pk-rotate-vertex", "u8-pk-scale-actual", "u8-pk-scale-read", "u8-pk-similar-check", "u8-pk-similar-missing-side", "u8-pk-transformation-symmetry", "u8-pk-translation-rule", "u9-pk-choose-ratio", "u9-pk-unknown-angle", "u9r-elevation-depression", "u9r-find-angle", "u9r-find-side", "u9r-find-side-workplace", "u9r-ratio-value", "u9r-reasonable-result"];
const pkIds3202 = BANK.filter(e => e.pkFlag).map(e => e.id).sort();
ok(JSON.stringify(pkIds3202) === JSON.stringify(PK_PIN_3202), "the flagged prior knowledge set is the pinned 76, saw " + pkIds3202.length + " flagged");
ok(BANK.filter(e => e.pkFlag).every(e => e.pkSrc && e.pkFor && e.pkGroup), "every flagged entry carries pkSrc, pkFor and pkGroup");
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1);
ok(empty.length === 0, "indicators with no entries: " + empty.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));

// every entry generates in this shell; MC draws carry exactly 4 options
let genBad = 0, mcBad = 0;
for (const e of BANK) {
  for (let i = 0; i < 25; i++) {
    let q; try { q = e.gen(); } catch (err) { genBad++; break; }
    if (!q || !q.prompt) { genBad++; break; }
    if (q.type === "mc" && (!q.options || q.options.length !== 4)) { mcBad++; break; }
  }
  if (genBad > 4) break;
}
ok(genBad === 0, "entries that threw or produced no prompt: " + genBad);
ok(mcBad === 0, "entries producing MC questions without exactly 4 options: " + mcBad);

console.log("entries: " + BANK.length + " per unit: " + JSON.stringify(perUnit) + "; CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD-MATH-3202 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-3202 PASS");
process.exit(fails.length ? 1 : 0);
