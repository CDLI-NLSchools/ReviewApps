#!/usr/bin/env node
/* Gate 1 (load) for Math 2200: chassis helpers + courses.js + the
   assembled Math 2200 bank module evaluate cleanly; BANK has 259
   entries (the standalone app's count, per unit 19/17/13/15/19/16/
   12/15/16 with the November 9, 2026 pool fix additions counted in
   Units 1, 7 and 8, the November 13, 2026 ruling 8 splits counted
   in Units 2 and 3, and one Unit 8 scenario entry, u8-scenario-solve,
   authored November 13, 2026 in the step 9 scenario harvest; plus
   the November 15, 2026 prior knowledge tranche's 72 flagged
   entries, per unit 10/8/8/9/8/8/8/5/8 on top of those counts,
   taking the per-unit totals to 29/25/66/24/27/24/20/20/24 and
   the flagged set, with the three entries flagged November 13,
   2026, to the pinned 75 below; plus the November 19, 2026 Bank
   Strengthening Programme pass 5 additions, 45 entries all in
   Unit 3, counted in the Unit 3 total of 66 above);
   window.__BANK_CRMARKS has 172 keys (the
   standalone bank source's own CR_MARKS map at the end of
   bank-src.js, carried as manifest comments derived from that map
   itself, plus the 45 pass 5 manifest lines in bank-u3.js,
   denominations 1x29, 2x89, 3x50, 4x4, marks summing to
   373); every registered indicator has entries and no entry uses
   an unregistered code; every entry generates a prompt in this
   shell and every multiple choice generation has exactly four
   options. The bank sources were cut from the standalone's
   bank-src.js (its maintained, assembled bank), not from its
   tranche drafts, which differ from it. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-2200"], "math-2200 registered");
window.__COURSE = window.COURSES["math-2200"];
ok(window.__COURSE.listed === true, "math-2200 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 11, "picker metadata: Mathematics, grade 11");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Trigonometry" && UNITS[9] === "Sequences and Series", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 9, "UNITS has 9 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 134, "INDICATORS has 134 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-2200.js", "utf8"));

ok(BANK.length === 259, "BANK has 259 entries, saw " + BANK.length);
const cr = window.__BANK_CRMARKS || {};
const crKeys = Object.keys(cr);
ok(crKeys.length === 172, "__BANK_CRMARKS has 172 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");
const denom = {};
let crSum = 0;
crKeys.forEach(k => { denom[cr[k]] = (denom[cr[k]] || 0) + 1; crSum += cr[k]; });
ok(JSON.stringify(denom) === JSON.stringify({ 1: 29, 2: 89, 3: 50, 4: 4 }), "CR denominations (the standalone map 1x24, 2x68, 3x31, 4x4, plus the November 19, 2026 pass 5 additions 1x5, 2x21, 3x19), saw " + JSON.stringify(denom));
ok(crSum === 373, "CR marks sum to 373, saw " + crSum);
ok(cr["u1-quadrant"] === 1 && cr["u2-evaluate-claim"] === 4 && cr["u3-derive-formula"] === 4 && cr["u7-tangent-param"] === 4 && cr["u9-derive-formulas"] === 4 && cr["u8-inequality-design"] === 3 && cr["u1-terminal-point-cr"] === 3 && cr["u4-rationalize-binomial"] === 3,
   "CR spot values match the standalone map (u1-quadrant 1, u2-evaluate-claim 4, u3-derive-formula 4, u7-tangent-param 4, u9-derive-formulas 4, u8-inequality-design 3, u1-terminal-point-cr 3, u4-rationalize-binomial 3)");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 29, 2: 25, 3: 66, 4: 24, 5: 27, 6: 24, 7: 20, 8: 20, 9: 24 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts match the standalone plus the PK tranche and the November 19, 2026 pass 5 additions (29/25/66/24/27/24/20/20/24), saw " + JSON.stringify(perUnit));

/* The prior knowledge pin (Nov 15, 2026, the PK tranche): the
   flagged set is exactly these 75 entries (the 72 tranche entries
   plus the three Unit 8 entries flagged Nov 13, 2026), and every
   flagged entry carries its pkSrc, pkFor and pkGroup records. */
const PK_PIN_2200 = ["u1-pk-find-angle", "u1-pk-find-side", "u1-pk-grid-distance", "u1-pk-label-sides", "u1-pk-pythagoras", "u1-pk-ramp-run", "u1-pk-ratio-def", "u1-pk-ratio-similar", "u1-pk-rope-angle", "u1-pk-solve-triangle", "u2-pk-binom-expand", "u2-pk-domain-range", "u2-pk-dr-linear", "u2-pk-eval-function", "u2-pk-factor-monic", "u2-pk-graph-data", "u2-pk-intercepts", "u2-pk-intercepts-solve", "u3-pk-diff-squares", "u3-pk-factor-monic", "u3-pk-gcf", "u3-pk-graph-form", "u3-pk-graph-strategy", "u3-pk-monomial-expand", "u3-pk-solve-input", "u3-pk-sqrt-eval", "u4-pk-approx", "u4-pk-laws-integral", "u4-pk-laws-rational", "u4-pk-radical-entire", "u4-pk-radical-mixed", "u4-pk-solve-two-step", "u4-pk-sort-numbers", "u4-pk-subsets", "u4-pk-which-is-solution", "u5-pk-equiv-fractions", "u5-pk-factor-product", "u5-pk-frac-context", "u5-pk-frac-div-add", "u5-pk-gcf", "u5-pk-multistep-rational", "u5-pk-npv-numerical", "u5-pk-solve-two-step", "u6-pk-approx", "u6-pk-domain-range", "u6-pk-eval-function", "u6-pk-fn-notation", "u6-pk-graph-data", "u6-pk-number-line-distance", "u6-pk-reciprocal-values", "u6-pk-sort-numbers", "u7-pk-intersection", "u7-pk-relate", "u7-pk-solve-algebra", "u7-pk-solve-by-factoring", "u7-pk-solve-elimination", "u7-pk-solve-graph", "u7-pk-strategy", "u7-pk-verify", "u8-numberline-read", "u8-pk-context-graph", "u8-pk-graph-boundary", "u8-pk-graph-to-ineq", "u8-pk-solve-ineq-pos-div", "u8-pk-solve-ineq-two-step", "u8-solve-linear-basic", "u8-solve-linear-flip", "u9-pk-context-equation", "u9-pk-fn-notation", "u9-pk-growth", "u9-pk-laws-integral", "u9-pk-pattern-figure", "u9-pk-pattern-word", "u9-pk-solve-input", "u9-pk-table-equation"];
const pkIds = BANK.filter(e => e.pkFlag).map(e => e.id).sort();
ok(JSON.stringify(pkIds) === JSON.stringify(PK_PIN_2200), "the flagged prior knowledge set is the pinned 75, saw " + pkIds.length + " flagged");
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
console.log(fails.length ? "GATE-LOAD-MATH-2200 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-2200 PASS");
process.exit(fails.length ? 1 : 0);
