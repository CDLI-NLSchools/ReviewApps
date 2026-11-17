#!/usr/bin/env node
/* Gate 1 (load) for Math 2201: chassis helpers + courses.js + the
   assembled Math 2201 bank module evaluate cleanly; BANK has 236
   entries (the standalone app's 234, per unit 19/31/30/34/47/22/
   24/27, plus the two Unit 7 enrichment entries added Nov 13,
   2026 under Jason's enrichment ruling, taking Unit 7 to 26 and
   the bank to 236; the default practice pool, taken through the
   shell's own poolFor with no enrichment state set, is still the
   standalone's 234, asserted below). Amended November 15, 2026 for
   the prior knowledge tranche (Jason's approved spec of November
   14, 2026): 59 pkFlag entries (44 borrowed from the Math 1201 and
   Math 9 banks, 15 authored) take the bank to 295, the per-unit
   counts to 27/39/34/42/52/30/35/36, the kinds to 232 gen and 63
   var, the default practice pool to 293 and the default Unit 7
   pool to 33; the prior-knowledge assertion below now pins the
   full 66-entry set (the 7 coded entries plus the 59 flagged)
   through the shell's own isPK. The pin changes in this gate for
   the tranche are deliberate, recorded here and in the tranche
   build report; window.__BANK_CRMARKS has 186 keys (the standalone's own
   CR_MARKS literal in its served file, carried as manifest
   comments derived from that literal itself, denominations 1x63,
   2x92, 3x25, 4x6, marks summing to 346; the cr_tags.json sidecar
   in the standalone folder is stale at 169 keys and was not used);
   the five postMid flags land on the standalone's five Radical
   Equations entries; the seven prior-knowledge entries (PK.1 and
   PK.2) are present; every registered indicator has entries (the
   nine entries tagged with codes the standalone's own map omits
   are pinned exactly, below); every entry generates a
   prompt in this shell and every multiple choice generation has
   exactly four options. The bank sources were cut from the
   standalone's served file (math-2201-review/Math2201Review.html,
   the file its push_to_repo.py publishes as the app's index.html;
   the local index.html there is an older copy), at its unit
   banner boundaries, in its own registration order (Unit 5 first,
   then Units 1 to 4, Units 6 to 8, then the Tranche 3 to 8
   additions), and a deep check confirms the ported entry sequence
   and CR map are identical to the standalone's own evaluation. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-2201"], "math-2201 registered");
window.__COURSE = window.COURSES["math-2201"];
ok(window.__COURSE.listed === true, "math-2201 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 11, "picker metadata: Mathematics, grade 11");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Acute Triangle Trigonometry" && UNITS[8] === "Properties of Angles and Triangles", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 8, "UNITS has 8 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 68, "INDICATORS has 68 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-2201.js", "utf8"));

ok(BANK.length === 385, "BANK has 385 entries, saw " + BANK.length);
const cr = window.__BANK_CRMARKS || {};
const crKeys = Object.keys(cr);
ok(crKeys.length === 218, "__BANK_CRMARKS has 218 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");
const denom = {};
let crSum = 0;
crKeys.forEach(k => { denom[cr[k]] = (denom[cr[k]] || 0) + 1; crSum += cr[k]; });
ok(JSON.stringify(denom) === JSON.stringify({ 1: 63, 2: 103, 3: 42, 4: 10 }), "CR denominations (the standalone map 1x63, 2x92, 3x25, 4x6, plus the November 17, 2026 Unit 1 enrichment adding 2x11, 3x17, 4x4), saw " + JSON.stringify(denom));
ok(crSum === 435, "CR marks sum to 435, saw " + crSum);
ok(cr["u1-two-triangles"] === 4 && cr["u5-media"] === 4 && cr["u5-sd-decisions"] === 4 && cr["u4-extraneous"] === 3 && cr["u4-rationalize"] === 1 && cr["u5-centre-mean"] === 1 && cr["u3-factor-monic"] === 2 && cr["u8-regular-sides-from-angle"] === 3,
   "CR spot values match the standalone map (u1-two-triangles 4, u5-media 4, u5-sd-decisions 4, u4-extraneous 3, u4-rationalize 1, u5-centre-mean 1, u3-factor-monic 2, u8-regular-sides-from-angle 3)");

const postMid = BANK.filter(e => e.postMid).map(e => e.id).sort();
ok(JSON.stringify(postMid) === JSON.stringify(["u4-cube-equation", "u4-extraneous", "u4-model-equation", "u4-model-evaluate", "u4-radical-equation"]),
   "postMid flags land on the standalone's five entries, saw " + postMid.join(", "));
/* Enrichment (Nov 13, 2026, Jason's ruling): content beyond the
   named indicators is flagged enrich on the entry and stays out
   of default pools. The first flagged content is step 7 of the
   Pure Math scan's build order (converse and contrapositive,
   Unit 7). The default-pool assertions use the shell's own
   poolFor, extracted the way gate-compose extracts it; no
   enrichment state exists in this harness, so the flagged
   entries must be out and the pool must be the standalone's 234. */
const enrich = BANK.filter(e => e.enrich).map(e => e.id).sort();
ok(JSON.stringify(enrich) === JSON.stringify(["u7-converse-contrapositive", "u7-converse-truth"]),
   "enrich flags land on the two Unit 7 converse entries, saw " + enrich.join(", "));
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
eval(extractFn(html, "poolFor"));
eval(extractFn(html, "isPK"));
const defPool = poolFor([1, 2, 3, 4, 5, 6, 7, 8], []);
ok(defPool.length === 383, "default practice pool has 383 entries (bank 385 minus the 2 enrichment entries), saw " + defPool.length);
ok(!defPool.some(e => e.enrich), "default practice pool holds no enrichment entry");
ok(poolFor([7], []).length === 33, "default Unit 7 pool has 33 entries (35 in the bank minus the 2 enrichment entries), saw " + poolFor([7], []).length);
/* Prior knowledge, amended November 15, 2026 for the PK tranche:
   the pin is the full isPK set (the shell's own flag-or-code
   definition), 99 entries: the 7 coded entries (PK.1 in Unit 5,
   PK.2 in Unit 3), the 59 tranche entries flagged pkFlag, and
   the 33 Unit 1 entries authored in the November 17, 2026
   enrichment build and flagged through PKT_U1.
   The set is pinned exactly so a future bank edit cannot drift
   it silently; changing it is a deliberate act recorded in the
   amending pass's report. */
const pk = BANK.filter(e => isPK(e)).map(e => e.id).sort();
ok(JSON.stringify(pk) === JSON.stringify(["u1-pk-angle-from-legs", "u1-pk-angle-from-value", "u1-pk-depression-distance", "u1-pk-diag-num", "u1-pk-elevation-height", "u1-pk-find-angle", "u1-pk-find-hypotenuse", "u1-pk-find-side", "u1-pk-hypotenuse-pick", "u1-pk-label-sides", "u1-pk-ladder-reach", "u1-pk-leg-num", "u1-pk-opposite-read", "u1-pk-other-angle-ratio", "u1-pk-point-distance", "u1-pk-pythagoras", "u1-pk-ramp-length", "u1-pk-ramp-run", "u1-pk-ratio-decimal", "u1-pk-ratio-def", "u1-pk-ratio-equation", "u1-pk-ratio-from-figure", "u1-pk-ratio-letters", "u1-pk-ratio-unreduced", "u1-pk-right-check", "u1-pk-role-from-diagram", "u1-pk-role-value", "u1-pk-role-words", "u1-pk-rope-angle", "u1-pk-screen-size", "u1-pk-shadow-angle", "u1-pk-shortcut-saving", "u1-pk-slide-angle", "u1-pk-solve-isosceles", "u1-pk-solve-perimeter", "u1-pk-solve-scene", "u1-pk-solve-second-leg", "u1-pk-solve-triangle", "u1-pk-tree-distance", "u1-pk-two-angles-roles", "u1-pk-wire-length", "u2-pk-domain-range", "u2-pk-dr-linear", "u2-pk-eval-function", "u2-pk-graph-data", "u2-pk-graph-form", "u2-pk-graph-strategy", "u2-pk-intercepts", "u2-pk-solve-input", "u3-factor-difference", "u3-factor-monic", "u3-factor-nonmonic", "u3-pk-binom-tri-expand", "u3-pk-gcf", "u3-pk-radical-mixed", "u3-pk-solve-two-step", "u4-pk-defined", "u4-pk-evaluate-exp", "u4-pk-laws-integral", "u4-pk-laws-rational", "u4-pk-radical-entire", "u4-pk-radical-mixed", "u4-pk-solve-two-step", "u4-pk-which-is-solution", "u5-centre-mean", "u5-centre-median", "u5-centre-mode", "u5-choosing-measure", "u5-pk-freq-mean", "u5-pk-generalization-critique", "u5-pk-sample-or-population", "u5-pk-sample-scale", "u5-pk-supported-conclusion", "u6-pk-convert-multistep", "u6-pk-rate-of-change", "u6-pk-sa-basic", "u6-pk-scale-draw", "u6-pk-scale-factor", "u6-pk-solve-input", "u6-pk-unit-rate", "u6-pk-vol-basic", "u7-pk-angle-justify", "u7-pk-conjecture", "u7-pk-counterexample", "u7-pk-inductive-limit", "u7-pk-pattern-figure", "u7-pk-pattern-word", "u7-pk-proof-error", "u7-pk-table-equation", "u7-pk-valid-chain", "u8-pk-angle-measure", "u8-pk-comp-supp", "u8-pk-parallel-decision", "u8-pk-polygon-sum", "u8-pk-solve-two-step", "u8-pk-transversal-measure", "u8-pk-transversal-pairs", "u8-pk-triangle-sum", "u8-pk-word-two-step"]),
   "prior-knowledge set is exactly the pinned 99 (7 coded + 59 tranche + 33 authored in the November 17, 2026 Unit 1 enrichment), saw " + pk.length + " (" + pk.join(", ") + ")");

const census = {}, perUnit = {}, kinds = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; kinds[e.kind] = (kinds[e.kind] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 117, 2: 39, 3: 34, 4: 42, 5: 52, 6: 30, 7: 35, 8: 36 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts (the standalone's 19/31/30/34/47/22/24/27, Unit 7 at 26 after the two enrichment entries, and the November 15, 2026 PK tranche adding 8/8/4/8/5/8/9/9, and the November 17, 2026 enrichment adding 89 to Unit 1, plus one further Unit 1 generator added the same day under the StudyMate pack strip-audit ruling), saw " + JSON.stringify(perUnit));
/* Kind counts amended November 12, 2026, on Jason's ruling: six
   entries (u2-vertex-x, u2-vertex-value, u2-vertex-shift,
   u2-xintercepts, u2-xintercepts-factored, u3-discriminant) were
   converted from gen to var so each carries a graphed read-off arm
   beside its original generator (graphics pass Tranche 1b). The
   standalone counts were 190 gen and 44 var; the amended counts
   below are deliberate, not drift. Amended again the same day for
   graphics pass Tranche 3, on the same ruling: u5-histogram-read
   was converted from gen to var so it carries a read-the-histogram
   arm beside its original table generator (183 gen, 51 var).
   Amended Nov 13, 2026 for the two Unit 7 enrichment entries
   (both generators): 185 gen, 51 var. Amended Nov 15, 2026 for
   the PK tranche: its 59 entries are 47 generators and 12 variant
   sets, taking the bank to 232 gen, 63 var. Amended Nov 17, 2026
   for the Unit 1 enrichment: its 89 entries are 73 generators and
   16 variant sets, taking the bank to 305 gen, 79 var. Amended
   again Nov 17, 2026 for one further Unit 1 generator
   (u1-diagram-read-value) authored under the StudyMate pack
   strip-audit ruling: 306 gen, 79 var. */
ok(kinds.gen === 306 && kinds.var === 79, "entry kinds (306 gen, 79 var; see the Tranche 1b, Tranche 3, enrichment and PK tranche notes above), saw " + JSON.stringify(kinds));
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1);
ok(empty.length === 0, "indicators with no entries: " + empty.join(", "));
/* Nine entries carry codes the standalone's own curriculum map
   does not register (u6-rate-solve 6.1; u8-polygon-sum and
   u8-polygon-ratio 5.2; u8-proof-reason 5.4; u4-variable-mixed
   1.3; u4-equation-restriction 1.8; u4-verify-root 1.10;
   u4-model-equation and u4-model-evaluate 1.12). That is a fact
   of the standalone bank, carried verbatim: both apps key the
   indicator filter list and the name lookups off the same map,
   so those entries are reachable in unfiltered pools in both
   and unfilterable in both. The gate pins the exact set so a
   future bank edit cannot drift it silently. */
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]).sort();
ok(JSON.stringify(unknown) === JSON.stringify(["1.10", "1.12", "1.3", "1.8", "5.2", "5.4", "6.1"]),
   "entry codes outside the standalone's own map are exactly its seven, saw: " + unknown.join(", "));

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
console.log(fails.length ? "GATE-LOAD-MATH-2201 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-2201 PASS");
process.exit(fails.length ? 1 : 0);
