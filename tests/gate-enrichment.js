#!/usr/bin/env node
/* Dedicated gate for the enrichment mechanism and the prior
   knowledge practice switch (both Nov 13, 2026, Jason's ruling).
   Enrichment: entries flagged enrich (content beyond the named
   indicators) stay out of practice draws and composed papers
   unless a teacher deliberately includes them; the flag is a
   property on the entry, set in the bank module. Prior knowledge
   is the mirror image: prior knowledge entries (PK-coded, or
   carrying the pkFlag property from the flagging pass later on
   Nov 13, 2026) are in practice pools by default, and the
   Advanced tools switch can keep them out of practice draws;
   its filter lives in drawSet, so poolFor and exam composition
   are untouched by it.
   Part A (per-course vm sandboxes, the shell's own functions
   extracted from index.html): with no toggle state anywhere,
   every course's poolFor pool is exactly its bank filtered by
   units with flagged entries removed, PK entries included; the
   programme's flagged set is pinned. For Math 2201 the toggle
   accessors are then defined and driven: enrichment in and out
   of the Unit 7 pool, PK in and out of practice draws through
   drawSet, and composed papers byte-identical across every
   toggle combination, with and without includePK. The same
   treatment follows for Math 3201, whose Unit 9 binomial
   entries (build step 8, Nov 13, 2026) are its enrichment set:
   enrichment in and out of the Unit 9 pool, the PK switch
   dropping the course's one flagged prior knowledge entry
   (u4-express-as-power), and composed papers identical across
   toggle combinations and free of the flagged entries. A
   generic block then drives the practice switch for each of
   the ten other courses flagged in the Nov 13 pass.
   Part B (jsdom, the real page): the two Advanced tools controls
   render for Math 2201 and Math 3201 (the courses carrying
   both kinds); Physics 2204 renders the prior knowledge switch
   but no enrichment toggle; every other newly flagged course
   renders the prior knowledge switch; a course with neither
   kind renders neither;
   the link forms enr=1 and pkin=0 land in settings; an
   enrichment question's card tag and its pick from bank list
   entry carry the word Enrichment.
   Run: NODE_PATH=<jsdom node_modules> node tests/gate-enrichment.js */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
const coursesSrc = fs.readFileSync(ROOT + "/courses.js", "utf8");
global.window = {};
eval(coursesSrc);
const COURSE_IDS = Object.keys(window.COURSES);

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
const SHELL_FNS = ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "drawSet", "composeExam"];

function loadCourse(id) {
  const sb = { console };
  sb.window = {};
  vm.createContext(sb);
  vm.runInContext(coursesSrc, sb);
  sb.window.__COURSE = sb.window.COURSES[id];
  vm.runInContext(helperBlock, sb);
  vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen}; if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";} BANK.push(e);}', sb);
  vm.runInContext(fs.readFileSync(ROOT + "/banks/" + sb.window.COURSES[id].bankFile, "utf8"), sb);
  vm.runInContext('var CR_MARKS=window.__BANK_CRMARKS||{}; var _probeCache={};', sb);
  for (const n of SHELL_FNS) vm.runInContext(extractFn(html, n), sb);
  return sb;
}
const run = (sb, code) => vm.runInContext(code, sb);
const isPkE = e => !!e.pkFlag || e.indicators.some(c => String(c).indexOf("PK") === 0);

/* ---------------- Part A: programme-wide defaults ---------------- */
let totalFlagged = 0, totalPk = 0;
const flaggedByCourse = {}, pkByCourse = {}, pkIdsByCourse = {};
for (const id of COURSE_IDS) {
  let sb;
  try { sb = loadCourse(id); } catch (err) { ok(false, id + ": sandbox load threw: " + err.message); continue; }
  const cfg = sb.window.COURSES[id];
  const units = Object.keys(cfg.units).map(Number);
  const BANK = sb.BANK;
  const flagged = BANK.filter(e => e.enrich);
  const pk = BANK.filter(isPkE);
  flaggedByCourse[id] = flagged.map(e => e.id);
  pkByCourse[id] = pk.length;
  pkIdsByCourse[id] = pk.map(e => e.id).sort();
  totalFlagged += flagged.length;
  totalPk += pk.length;
  const defPool = run(sb, "poolFor(" + JSON.stringify(units) + ", [])");
  const reference = BANK.filter(e => units.indexOf(e.unit) >= 0 && !e.enrich);
  ok(JSON.stringify(defPool.map(e => e.id).sort()) === JSON.stringify(reference.map(e => e.id).sort()),
     id + ": default poolFor pool is the bank's unit-filtered set with flagged entries removed (pool " + defPool.length + ", reference " + reference.length + ")");
  ok(!defPool.some(e => e.enrich), id + ": default pool holds no enrichment entry");
  const pkInPool = defPool.filter(isPkE).length;
  ok(pkInPool === pk.filter(e => units.indexOf(e.unit) >= 0).length, id + ": default pool holds every PK entry in scope (" + pkInPool + ")");
}
ok(totalFlagged === 5, "programme carries exactly 5 enrichment entries, saw " + totalFlagged);
ok(JSON.stringify((flaggedByCourse["math-2201"] || []).slice().sort()) === JSON.stringify(["u7-converse-contrapositive", "u7-converse-truth"]),
   "the Math 2201 flagged entries are its two Unit 7 entries, saw " + JSON.stringify(flaggedByCourse["math-2201"]));
ok(JSON.stringify((flaggedByCourse["math-3201"] || []).slice().sort()) === JSON.stringify(["u9-binomial-expected", "u9-binomial-identify", "u9-binomial-prob"]),
   "the Math 3201 flagged entries are its three Unit 9 binomial entries, saw " + JSON.stringify(flaggedByCourse["math-3201"]));
ok(COURSE_IDS.every(id => id === "math-2201" || id === "math-3201" || (flaggedByCourse[id] || []).length === 0), "no course other than Math 2201 and Math 3201 carries an enrichment entry");
/* The prior knowledge pin, extended Nov 13, 2026 for the
   flagging pass: Math 2201's seven PK-coded entries plus the
   24 approved pkFlag entries (30 flag instances with the two
   French twins), each set approved family by family under the
   assessed-target standard. Math 3208's u1-compound-inequality
   is deliberately NOT in this pin: Jason held it. Extended
   November 15, 2026 for the Math 2201 PK tranche (Jason's
   approved spec of November 14, 2026): Math 2201's set grows
   by the tranche's 59 flagged entries to 66, and the programme
   total to 96. The pin change is deliberate and recorded in
   the tranche build report. Extended again November 15, 2026
   for the Math 2200 PK tranche: Math 2200's set grows by the
   tranche's 72 flagged entries to 75, and the programme total
   to 168, recorded in that tranche's build report. Extended
   again November 15, 2026 for the Math 3202 PK tranche: Math
   3202's set grows by the tranche's 70 flagged entries to 76,
   and the programme total to 238, recorded in that tranche's
   build report. Extended again November 15, 2026 for the Math
   2202 PK tranche: Math 2202's set grows by the tranche's 61
   flagged entries to 65, and the programme total to 299,
   recorded in that tranche's build report. Extended again
   November 15, 2026 for the Math 1201 PK tranche: Math 1201's
   set is the tranche's 72 flagged entries, and the programme
   total to 371, recorded in that tranche's build report.
   Extended again November 15, 2026 for the Math 9 PK tranche:
   Math 9's set grows by the tranche's 73 flagged entries to 76,
   and the programme total to 444, recorded in that tranche's
   build report. Extended again November 15, 2026 for the Math
   8 PK tranche (the last Band 1 course): Math 8's set grows by
   the tranche's 56 flagged entries to 59, Math 9's set grows by
   the expected-count settlement's two follow-on flags to 78,
   and the programme total to 502, recorded in that tranche's
   build report. Extended again November 16, 2026 for the Math
   1202 PK tranche (the first Band 2 course): Math 1202's set
   is the tranche's 54 flagged entries, and the programme total
   to 556, recorded in that tranche's build report. Extended again
   November 16, 2026 for the Math 3200 PK tranche (the second Band 2
   course): Math 3200's set is the tranche's 49 flagged entries (45
   borrowed and 4 authored counting bridge items), and the programme
   total to 605, recorded in that tranche's build report. Extended again
   November 16, 2026 for the Math 3201 PK tranche (the third Band 2
   course): Math 3201's set grows from the one audit-flagged entry to
   the tranche's 41 flagged entries (37 borrowed and 4 already in the
   bank carrying tranche metadata), and the programme total to 645,
   recorded in that tranche's build report. Extended again
   November 16, 2026 for the Math 3208 PK tranche (the fourth Band 2
   course): Math 3208's set grows from the one audit-flagged entry to
   the tranche's 36 flagged entries (35 borrowed and 1 already in the
   bank carrying tranche metadata), and the programme total to 680,
   recorded in that tranche's build report. Extended again November
   16, 2026 for the Math 1202 bridge follow-up: Math 1202's set grows
   by 2 authored bridge entries (Cluster 9 scale reading, on Jason's
   ruling), and the programme total to 682, recorded in that
   follow-up's build report. Extended again November 16, 2026
   for the Math 3208 log follow-up: Math 3208's set grows by 5
   entries borrowed from the Mathematics 3200 bank (Unit 7
   exponential and logarithm readiness, stocked as ordinary
   prior knowledge on Jason's ruling), and the programme total
   to 687, recorded in that follow-up's build report. Extended again
   November 16, 2026 for the Math 7 Band 3 Piece 1 fluency strand
   core: Math 7's set is the strand's 45 flagged entries (43 authored
   plus the 2 shared ordering-numbers copies housed in Unit 7), and
   the programme total to 732, recorded in that piece's build
   report. Extended again November 16, 2026 for the Math 9
   adaptation of the same strand: Math 9's set grows by 30 copied
   entries (the u{unit}-pkf- strand section of its bank-pk.js), and
   the programme total to 762, recorded in the same build report.
   Extended again November 16, 2026 for the Math 8 adaptation of
   the same strand: Math 8's set grows by 34 entries (27 copied
   from the Mathematics 7 bank and 7 authored, the u{unit}-pkf-
   strand section of its bank-pk.js), and the programme total to
   796, recorded in the same build report. Four of the adaptation's
   groups are held pending a ruling on their overlap with the
   Band 1 tranche, recorded in the same report. Extended again
   November 16, 2026 for the Decision 7 completion of the Math 8
   adaptation: on Jason's ruling that Band 1 entries count toward
   the strand pools, Math 8's set grows by 6 entries (3
   fraction-operations copies topping that pool up to its
   specified depth and 3 authored percent-of-amount entries for
   its shortfall, the completion block at the end of its
   bank-pk.js), and the programme total to 802, recorded in the
   same build report. Extended again November 16, 2026 for
   Band 3 Piece 2 (the Mathematics 7 Unit 4 area and measurement
   piece): Math 7's set grows by 25 authored entries (the
   Piece 2 section of its bank-pk.js), and the programme total
   to 827, recorded in the Piece 2 build report. */
const PK_PIN = {
  "math-2201": ["u1-pk-find-angle", "u1-pk-find-side", "u1-pk-label-sides", "u1-pk-pythagoras", "u1-pk-ramp-run", "u1-pk-ratio-def", "u1-pk-rope-angle", "u1-pk-solve-triangle", "u2-pk-domain-range", "u2-pk-dr-linear", "u2-pk-eval-function", "u2-pk-graph-data", "u2-pk-graph-form", "u2-pk-graph-strategy", "u2-pk-intercepts", "u2-pk-solve-input", "u3-factor-difference", "u3-factor-monic", "u3-factor-nonmonic", "u3-pk-binom-tri-expand", "u3-pk-gcf", "u3-pk-radical-mixed", "u3-pk-solve-two-step", "u4-pk-defined", "u4-pk-evaluate-exp", "u4-pk-laws-integral", "u4-pk-laws-rational", "u4-pk-radical-entire", "u4-pk-radical-mixed", "u4-pk-solve-two-step", "u4-pk-which-is-solution", "u5-centre-mean", "u5-centre-median", "u5-centre-mode", "u5-choosing-measure", "u5-pk-freq-mean", "u5-pk-generalization-critique", "u5-pk-sample-or-population", "u5-pk-sample-scale", "u5-pk-supported-conclusion", "u6-pk-convert-multistep", "u6-pk-rate-of-change", "u6-pk-sa-basic", "u6-pk-scale-draw", "u6-pk-scale-factor", "u6-pk-solve-input", "u6-pk-unit-rate", "u6-pk-vol-basic", "u7-pk-angle-justify", "u7-pk-conjecture", "u7-pk-counterexample", "u7-pk-inductive-limit", "u7-pk-pattern-figure", "u7-pk-pattern-word", "u7-pk-proof-error", "u7-pk-table-equation", "u7-pk-valid-chain", "u8-pk-angle-measure", "u8-pk-comp-supp", "u8-pk-parallel-decision", "u8-pk-polygon-sum", "u8-pk-solve-two-step", "u8-pk-transversal-measure", "u8-pk-transversal-pairs", "u8-pk-triangle-sum", "u8-pk-word-two-step"],
  "math-9": ["u1-pk-add-context", "u1-pk-add-sub-decimals", "u1-pk-add-unlike", "u1-pk-divide-fractions", "u1-pk-identify-operation", "u1-pk-mult-decimals", "u1-pk-multiply-fractions", "u1-pk-ooo-evaluate", "u1-pk-ooo-fractions", "u1-pk-order-mixed", "u1-pk-sub-unlike", "u1-pkf-area-model-product", "u1-pkf-context-divide-expression", "u1-pkf-div-2by1", "u1-pkf-div-decimals", "u1-pkf-estimate-product-benchmark", "u1-pkf-fact-division", "u1-pkf-fact-halving", "u1-pkf-fact-recall", "u1-pkf-frontend-prod-quot", "u1-pkf-frontend-sum", "u1-pkf-model-division-bar", "u1-pkf-model-frac-times-whole", "u1-pkf-model-whole-div-frac", "u1-pkf-mult-model-chips", "u1-pkf-mult-problem", "u1-pkf-ooo-num", "u1-pkf-order-below", "u1-pkf-order-line", "u1-pkf-order-place", "u1-pkf-product-sign-apply", "u1-pkf-quotient-sign-apply", "u1-pkf-reasonableness", "u2-pk-calc-approx", "u2-pk-estimate-between", "u2-pk-root-between", "u2-pk-sa-cylinder", "u2-pk-sa-problem", "u2-pk-sa-rect-prism", "u2-pk-sa-tri-prism", "u2-pk-sqrt-perfect", "u2-pk-square-of-number", "u3-pk-annex-zeros", "u3-pk-doubling-step", "u3-pk-missing-factor", "u3-pk-product-sign", "u3-pk-quotient-sign", "u3-pk-related-division", "u3-pk-repeated-product", "u3-pk-repeated-write", "u4-pk-expression-or-equation", "u4-pk-identify-parts", "u4-pk-solve-distributive", "u4-pk-solve-one-step", "u4-pk-solve-two-step", "u4-pk-variable-meaning", "u5-pk-between", "u5-pk-identify-error", "u5-pk-misplaced", "u5-pk-model-equation", "u5-pk-numberline-place", "u5-pk-solve-two-step", "u5-pk-verify-solution", "u5-pkf-solve-context-problem", "u5-pkf-solve-distributive", "u5-pkf-solve-div-plus", "u5-pkf-solve-one-step", "u5-pkf-visual-step", "u6-pk-construct-graph", "u6-pk-describe-graph", "u6-pk-missing-pair", "u6-pk-pattern-expression", "u6-pk-solve-context", "u6-pk-solve-div-plus", "u6-pk-table-missing", "u6-pk-two-points-evaluate", "u7-pk-rate-problem", "u7-pk-ratio-problem", "u7-pk-ratio-simplest", "u7-pk-reflect-point", "u7-pk-tess-transform", "u7-pk-transform-describe", "u7-pk-translate", "u7-pk-two-term-ratio", "u8-pk-angle-chain", "u8-pk-central-angles", "u8-pk-circumference", "u8-pk-parallel-perp", "u8-pk-pi-ratio", "u8-pk-radius-diameter", "u9-gap-expected-freq-cr", "u9-gap-freq-mean-cr", "u9-gap-freq-mean-mc", "u9-gap-mean-diff-cr", "u9-gap-win-points-cr", "u9-pk-circle-graph", "u9-pk-exp-vs-theor", "u9-pk-false-conclusion", "u9-pk-mean-basic", "u9-pk-median-mode", "u9-pk-misleading-format", "u9-pk-prob-basic", "u9-pk-product-rule", "u9-pk-two-draws", "u9-pk-two-graphs", "u9-pkf-mean-basic", "u9-pkf-median-mode", "u9-pkf-range-basic"],
  "math-9-fr": ["u9-gap-freq-mean-cr", "u9-gap-freq-mean-mc", "u9-gap-mean-diff-cr"],
  "math-8": ["u1-pk-carroll-cell", "u1-pk-divisibility-why", "u1-pk-divisible-by", "u1-pk-factor-list", "u1-pk-factors-count", "u1-pk-square-area", "u1-pkf-order-below", "u1-pkf-order-line", "u1-pkf-order-place", "u1-pkf-square-between", "u1-pkf-square-compute", "u1-pkf-square-recognize", "u1-pkf-square-side", "u2-pk-add-basic", "u2-pk-add-context", "u2-pk-missing-start", "u2-pk-mixed-chain", "u2-pk-order-ops-dec", "u2-pk-sub-basic", "u2-pkf-add-regroup", "u2-pkf-add-three", "u2-pkf-below-compare", "u2-pkf-below-line", "u2-pkf-below-temp", "u2-pkf-div-2digit", "u2-pkf-div-exact", "u2-pkf-div-remainder", "u2-pkf-fact-halving", "u2-pkf-fact-recall", "u2-pkf-fact-skip", "u2-pkf-mult-2by1", "u2-pkf-mult-2by2", "u2-pkf-mult-zeros", "u2-pkf-ooo-basic", "u2-pkf-ooo-brackets", "u2-pkf-ooo-chain", "u2-pkf-sub-regroup", "u3-pk-add-mixed", "u3-pk-add-unlike", "u3-pk-common-denominator", "u3-pk-problem-add", "u3-pk-simplify-fraction", "u3-pk-sub-mixed", "u3-pk-sub-unlike", "u3-pkf-add-like", "u3-pkf-equiv-divide", "u3-pkf-equiv-recognize", "u3-pkf-equiv-target", "u3-pkf-problem-sub-mixed", "u3-pkf-sub-like", "u4-pk-add-sub-decimals", "u4-pk-area-circle", "u4-pk-area-diameter", "u4-pk-area-mix", "u4-pk-area-parallelogram", "u4-pk-area-triangle", "u4-pk-mult-decimals", "u5-pk-discount-total", "u5-pk-div-decimals", "u5-pk-frac-to-decimal", "u5-pk-percent-convert", "u5-pk-percent-of", "u5-pk-simplify-fraction", "u5-pk-simplify-solution", "u5-pkf-find-whole", "u5-pkf-hst-total", "u5-pkf-write-percent", "u6-pk-evaluate-expression", "u6-pk-graph-relation", "u6-pk-inspection-trial", "u6-pk-read-point", "u6-pk-solve-other-forms", "u6-pk-solve-two-step", "u6-pk-table-missing", "u6-pk-verify-two-step", "u6-pkf-check-diff", "u6-pkf-divide-form", "u6-pkf-gap-two-step", "u6-pkf-model-problem", "u6-pkf-problem-two-step", "u6-pkf-substitute-check", "u7-combined-mean-gap", "u7-mean-difference-gap", "u7-missing-mean-value-gap", "u7-pk-exp-vs-theor", "u7-pk-expected-pct", "u7-pk-graph-quantities", "u7-pk-outlier-find", "u7-pk-range-basic", "u7-pk-sample-space", "u7-pk-two-event-pct", "u8-pk-angle-chain", "u8-pk-protractor-read", "u8-pk-quadrilateral-angle", "u8-pk-reflect-point", "u8-pk-rotate", "u8-pk-transform-describe", "u8-pk-translate", "u8-pk-triangle-third-angle"],
  "math-8-fr": ["u7-combined-mean-gap", "u7-mean-difference-gap", "u7-missing-mean-value-gap"],
  "math-7": ["u1-pk-div-2digit", "u1-pk-div-exact", "u1-pk-div-related", "u1-pk-div-remainder", "u1-pk-div-zeros", "u1-pk-fact-division", "u1-pk-fact-halving", "u1-pk-fact-onemore", "u1-pk-fact-recall", "u1-pk-fact-skip", "u1-pk-mult-2by1", "u1-pk-mult-2by2", "u1-pk-mult-3by1", "u1-pk-mult-3by2", "u1-pk-mult-zeros", "u1-pk-multiples-common", "u1-pk-multiples-first", "u1-pk-multiples-identify", "u1-pk-multiples-problem", "u1-pk-ooo-basic", "u1-pk-ooo-brackets", "u1-pk-ooo-chain", "u1-pk-ooo-division", "u1-pk-ooo-why", "u2-pk-add-regroup", "u2-pk-add-three", "u2-pk-addsub-large", "u2-pk-below-compare", "u2-pk-below-debt", "u2-pk-below-line", "u2-pk-below-temp", "u2-pk-order-below", "u2-pk-order-decimals", "u2-pk-order-line", "u2-pk-order-missing", "u2-pk-order-place", "u2-pk-sub-line", "u2-pk-sub-regroup", "u4-pk-circle-centre", "u4-pk-circle-diameter", "u4-pk-circle-pick", "u4-pk-circle-radius", "u4-pk-dec-mult-near3", "u4-pk-dec-mult-whole", "u4-pk-dec-square-decimal", "u4-pk-dec-square-whole", "u4-pk-perim-missing-polygon", "u4-pk-perim-missing-side", "u4-pk-perim-pentagon", "u4-pk-perim-rect", "u4-pk-perim-square", "u4-pk-rect-area", "u4-pk-rect-area-context", "u4-pk-rect-decimals", "u4-pk-rect-missing-side", "u4-pk-rect-square", "u4-pk-rect-square-decimal", "u4-pk-ruler-cm", "u4-pk-ruler-cm-decimal", "u4-pk-ruler-difference", "u4-pk-ruler-half", "u4-pk-ruler-mm", "u4-pk-ruler-unit-choice", "u7-pk-average-decimals", "u7-pk-average-money", "u7-pk-average-set", "u7-pk-average-small", "u7-pk-average-whole", "u7-pk-order-below", "u7-pk-order-line"],
  "math-3201": ["u1-pk-add-unlike", "u1-pk-diff-squares", "u1-pk-factor-monic", "u1-pk-frac-context", "u1-pk-gcf", "u1-pk-multiply-fractions", "u2-pk-axis-from-intercepts", "u2-pk-domain-range", "u2-pk-graph-description", "u2-pk-vertex-form-params", "u2-pk-which-quadratic", "u3-pk-find-side", "u3-pk-label-sides", "u3-pk-params-characteristics", "u3-pk-ratio-def", "u3-pk-solve-triangle", "u4-express-as-power", "u4-pk-laws-integral", "u4-pk-rational-pattern", "u4-pk-repeated-mult", "u4-pk-two-laws", "u5-pk-evaluate-exp", "u5-pk-laws-rational", "u5-pk-negative-exp", "u5-pk-rational-exp", "u6-pk-discount-then-tax", "u6-pk-find-whole", "u6-pk-percent-change", "u6-pk-percent-convert", "u6-pk-percent-of", "u7-pk-sort-numbers", "u7-pk-subsets", "u8-pk-product-rule", "u8-pk-sample-space", "u8-pk-two-draws", "u9-context-prob", "u9-decisions", "u9-pk-combined-decision", "u9-pk-exp-vs-theor-b", "u9-pk-prob-basic-b", "u9-prob-basics"],
  "math-3202": ["u1-pk-diameter-fig", "u1-pk-estimate-ref", "u1-pk-measure-read", "u1-pk-reasonable", "u1-pk-referent", "u1-pk-rounding", "u1-pk-tolerance-arithmetic", "u10-pk-classify-probability", "u10-pk-combined-decision", "u10-pk-expected-freq", "u10-pk-prob-basic", "u10-pk-prob-in-media", "u10-pk-two-events", "u2-pk-balance-model", "u2-pk-error-slope", "u2-pk-point-on-graph", "u2-pk-rate-of-change", "u2-pk-rise-run", "u2-pk-slope-ramp", "u2-pk-slope-two-points", "u2-pk-table-equation", "u3-pk-choose-graph", "u3-pk-histogram-read", "u3-pk-interpolate", "u3-pk-misleading-axis", "u3-pk-read-value", "u3-pk-scatter-trend", "u3-pk-trend-basic", "u3-pk-two-conclusions", "u4-pk-central-problem", "u4-pk-mean-basic", "u4-pk-median-mode", "u4-pk-median-range", "u4-pk-median-range-2", "u4-pk-missing-mean", "u4-pk-missing-value", "u5-pk-budget-totals", "u5-pk-card-vs-loan", "u5-pk-credit-interest", "u5-pk-modify-for-goal", "u5-pk-operating-cost", "u5-pk-percent-change", "u5-pk-percent-of-income", "u5-pk-rent-compare", "u6-pk-balance-model", "u6-pk-both-sides", "u6-pk-budget-totals", "u6-pk-deduction-calc", "u6-pk-net-from-deductions", "u6-pk-profit-loss", "u6-pk-week-spending", "u7-pk-adjacent-describe", "u7-pk-comp-supp", "u7-pk-context-transversal", "u7-pk-pair-names", "u7-pk-trans-algebra", "u7-pk-trans-find", "u7-pk-trans-relationships", "u8-pk-corresponding-sides", "u8-pk-reflect-point", "u8-pk-related-shapes", "u8-pk-rotate-vertex", "u8-pk-scale-actual", "u8-pk-scale-read", "u8-pk-similar-check", "u8-pk-similar-missing-side", "u8-pk-transformation-symmetry", "u8-pk-translation-rule", "u9-pk-choose-ratio", "u9-pk-unknown-angle", "u9r-elevation-depression", "u9r-find-angle", "u9r-find-side", "u9r-find-side-workplace", "u9r-ratio-value", "u9r-reasonable-result"],
  "math-2200": ["u1-pk-find-angle", "u1-pk-find-side", "u1-pk-grid-distance", "u1-pk-label-sides", "u1-pk-pythagoras", "u1-pk-ramp-run", "u1-pk-ratio-def", "u1-pk-ratio-similar", "u1-pk-rope-angle", "u1-pk-solve-triangle", "u2-pk-binom-expand", "u2-pk-domain-range", "u2-pk-dr-linear", "u2-pk-eval-function", "u2-pk-factor-monic", "u2-pk-graph-data", "u2-pk-intercepts", "u2-pk-intercepts-solve", "u3-pk-diff-squares", "u3-pk-factor-monic", "u3-pk-gcf", "u3-pk-graph-form", "u3-pk-graph-strategy", "u3-pk-monomial-expand", "u3-pk-solve-input", "u3-pk-sqrt-eval", "u4-pk-approx", "u4-pk-laws-integral", "u4-pk-laws-rational", "u4-pk-radical-entire", "u4-pk-radical-mixed", "u4-pk-solve-two-step", "u4-pk-sort-numbers", "u4-pk-subsets", "u4-pk-which-is-solution", "u5-pk-equiv-fractions", "u5-pk-factor-product", "u5-pk-frac-context", "u5-pk-frac-div-add", "u5-pk-gcf", "u5-pk-multistep-rational", "u5-pk-npv-numerical", "u5-pk-solve-two-step", "u6-pk-approx", "u6-pk-domain-range", "u6-pk-eval-function", "u6-pk-fn-notation", "u6-pk-graph-data", "u6-pk-number-line-distance", "u6-pk-reciprocal-values", "u6-pk-sort-numbers", "u7-pk-intersection", "u7-pk-relate", "u7-pk-solve-algebra", "u7-pk-solve-by-factoring", "u7-pk-solve-elimination", "u7-pk-solve-graph", "u7-pk-strategy", "u7-pk-verify", "u8-numberline-read", "u8-pk-context-graph", "u8-pk-graph-boundary", "u8-pk-graph-to-ineq", "u8-pk-solve-ineq-pos-div", "u8-pk-solve-ineq-two-step", "u8-solve-linear-basic", "u8-solve-linear-flip", "u9-pk-context-equation", "u9-pk-fn-notation", "u9-pk-growth", "u9-pk-laws-integral", "u9-pk-pattern-figure", "u9-pk-pattern-word", "u9-pk-solve-input", "u9-pk-table-equation"],
  "math-2202": ["u1-pk-rotate-front", "u1-pk-rotate-predict", "u1-pk-rotated-side-view", "u1-pk-scale-draw", "u1-pk-scale-factor", "u2-pk-circle-area", "u2-pk-composite-area", "u2-pk-cylinder-sa", "u2-pk-error-analysis", "u2-pk-formula-manip", "u2-pk-imp-si-convert", "u2-pk-perimeter", "u2-pk-si-convert", "u2-pk-si-imp-convert", "u2-pk-surface-prism", "u3-pk-area-convert-adv", "u3-pk-area-imp-convert", "u3-pk-area-si-convert", "u3-pk-circumference", "u3-pk-find-leg", "u3-pk-holds-most", "u3-pk-tank-litres", "u3-pk-vol-base-height", "u3-pk-vol-cylinder", "u3-pk-vol-tri-prism", "u4-cr-percent-change", "u4-misleading-actual", "u4-pk-graph-describe", "u4-pk-graph-quantities", "u4-pk-graph-read", "u4-pk-interpolate", "u4-pk-line-graph", "u4-pk-missing-coord", "u4-pk-point-on-graph", "u5-pk-cpp-ei-tax", "u5-pk-deduction-calc", "u5-pk-gross-overtime", "u5-pk-gross-tips", "u5-pk-hours-total", "u5-pk-net-pay", "u5-pk-percent-of-amount", "u6-pk-commission", "u6-pk-evaluate-power", "u6-pk-find-the-whole", "u6-pk-percent-change", "u6-pk-percent-change-cr", "u6-pk-percent-of-amount", "u6-pk-product-law", "u6-pk-two-laws", "u7-pk-corresponding-sides", "u7-pk-express-rate", "u7-pk-identify-rate", "u7-pk-rate-problem", "u7-pk-scale-apply", "u7-pk-similar-check", "u7-pk-similar-missing-side", "u7-pk-unit-rate-cost", "u8-choose-ratio-equation", "u8-cr-find-angle", "u8-pk-choose-ratio", "u8-pk-find-angle-num", "u8-pk-hypotenuse-rearrange", "u8-pk-reasonable", "u8-pk-sine-ratio-constant", "u8-pk-unknown-angle"],
  "math-1201": ["u1-pk-area-circle", "u1-pk-circumference", "u1-pk-estimate-count", "u1-pk-estimate-reasonable", "u1-pk-frac-context", "u1-pk-money-decimals", "u1-pk-overlap", "u1-pk-pythag-model", "u1-pk-ratio-problem", "u1-pk-sa-composite", "u1-pk-sa-cylinder", "u1-pk-sa-from-net", "u1-pk-sa-problem", "u1-pk-sa-rect-prism", "u1-pk-sa-tri-prism", "u1-pk-unit-rate-cost", "u1-pk-vol-cylinder", "u1-pk-vol-rect-prism", "u1-pk-vol-tri-prism", "u2-pk-between-two", "u2-pk-decimal-to-fraction", "u2-pk-divisible-by", "u2-pk-estimate-between", "u2-pk-evaluate-power", "u2-pk-factor-list", "u2-pk-factors-root", "u2-pk-frac-to-decimal", "u2-pk-order-four", "u2-pk-parentheses-sign", "u2-pk-product-law", "u2-pk-repeated-mult", "u2-pk-root-between", "u2-pk-sqrt-perfect", "u2-pk-square-of-number", "u2-pk-sum-of-powers", "u2-pk-two-laws", "u3-pk-add", "u3-pk-addsub-xy", "u3-pk-degree", "u3-pk-divide-monomial", "u3-pk-multiply-monomial", "u3-pk-parts", "u3-pk-subtract", "u4-pk-evaluate-expression", "u4-pk-graph-describe", "u4-pk-interpolate", "u4-pk-pattern-figure", "u4-pk-pattern-word", "u4-pk-point-on-graph", "u4-pk-solve-two-step", "u4-pk-table-equation", "u5-pk-construct-graph", "u5-pk-express-rate", "u5-pk-graph-equation", "u5-pk-pattern-solve-n", "u5-pk-rate-problem", "u5-pk-two-term-ratio", "u5-pk-which-is-solution", "u5-pk-word-two-step", "u6-pk-balance-model", "u6-pk-break-even", "u6-pk-context-equation", "u6-pk-solve-two-step", "u6-pk-table-equation", "u6-pk-which-is-solution", "u7-pk-draw-similar", "u7-pk-hypotenuse", "u7-pk-is-right", "u7-pk-ladder-context", "u7-pk-missing-leg", "u7-pk-similar-context", "u7-pk-similar-verdict"],
  "math-1202": ["u1-pk-better-buy", "u1-pk-evaluate-power", "u1-pk-express-rate", "u1-pk-fraction-convert", "u1-pk-identify-rate", "u1-pk-money-decimals", "u1-pk-percent-convert", "u1-pk-percent-of", "u1-pk-rate-problem", "u1-pk-ratio-problem", "u2-bridge-ruler-inch", "u2-bridge-ruler-mm", "u2-pk-between-two", "u2-pk-circ-approx", "u2-pk-circumference", "u2-pk-divide-fractions", "u2-pk-ooo-evaluate", "u2-pk-ooo-first-error", "u2-pk-pi-ratio", "u2-pk-referent", "u2-pk-solve-two-step", "u3-pk-area-circle", "u3-pk-area-parallelogram", "u3-pk-area-triangle", "u3-pk-ooo-calculator", "u3-pk-para-from-rect", "u3-pk-sa-cylinder", "u3-pk-sa-from-net", "u3-pk-sa-rect-prism", "u4-pk-discount-then-tax", "u4-pk-find-whole", "u4-pk-mult-decimals", "u4-pk-ooo-brackets", "u4-pk-percent-of-percent", "u4-pk-total-change", "u5-pk-angle-chain", "u5-pk-angle-classify", "u5-pk-bisector-env", "u5-pk-bisector-reason", "u5-pk-env-examples", "u5-pk-parallel-perp", "u5-pk-protractor-read", "u6-pk-estimate-between", "u6-pk-hypotenuse", "u6-pk-is-right", "u6-pk-missing-leg", "u6-pk-pythag-model", "u6-pk-sqrt-perfect", "u6-pk-triple-find", "u7-pk-draw-similar", "u7-pk-indirect-measure", "u7-pk-meaning-of-ratio", "u7-pk-scale-factor", "u7-pk-similar-context", "u7-pk-similar-verdict", "u7-pk-two-term-ratio"],
  "math-3200": ["u1-pk-discriminant-k", "u1-pk-factor-common", "u1-pk-factor-nonmonic", "u1-pk-factor-test", "u1-pk-factor-trinomial", "u1-pk-solve-strategies", "u2-pk-complete-square", "u2-pk-npv-basic", "u2-pk-npv-quadratic", "u2-pk-vertex-read", "u2-pk-vertex-standard", "u3-pk-defined-values", "u3-pk-extraneous-why", "u3-pk-solve-radical", "u3-pk-verify-roots", "u3-pk-which-is-solution", "u4-pk-exact-values", "u4-pk-point-distance", "u4-pk-point-ratios", "u4-pk-read-sketch", "u4-pk-same-reference", "u4-pk-solve-equation", "u5-pk-complex-fraction", "u5-pk-effect-of-a", "u5-pk-lcd-choose", "u5-pk-simplify-basic", "u5-pk-translations", "u6-pk-add-subtract", "u6-pk-divide", "u6-pk-multiply", "u6-pk-sign-statements", "u6-pk-simplify-trinomial", "u7-pk-laws-integral", "u7-pk-laws-rational", "u7-pk-negative-exp", "u7-pk-recip-features", "u7-pk-reciprocal-values", "u8-pk-evaluate-exp", "u8-pk-product-law", "u8-pk-rational-exp", "u8-pk-rational-pattern", "u8-pk-sqrt-eval", "u9-bridge-codes", "u9-bridge-lineup", "u9-bridge-places", "u9-bridge-tree", "u9-pk-binom-expand", "u9-pk-binomial-expand", "u9-pk-monomial-expand"],
  "math-3208": ["u1-pk-defined-values", "u1-pk-eval-function", "u1-pk-npv-basic", "u1-pk-simplify-basic", "u1-pk-solve-input", "u2-pk-converge-check", "u2-pk-geo-ratio", "u2-pk-infinite-sum", "u2-pk-simplify-trinomial", "u2-repeating-decimal", "u3-pk-lcd", "u3-pk-npv-quadratic", "u3-pk-recip-features", "u3-pk-solve-extraneous", "u3-pk-solve-linear", "u4-pk-eq-slope-point", "u4-pk-eq-two-points", "u4-pk-factor-common", "u4-pk-rate-of-change", "u4-pk-slope-rise-run", "u5-pk-characteristics", "u5-pk-indirect-measure", "u5-pk-sa-rect-prism", "u5-pk-similar-context", "u5-pk-vol-cylinder", "u6-pk-exact-values", "u6-pk-point-ratios", "u6-pk-reflection-points", "u6-pk-solve-equation", "u7-pk-convert-form", "u7-pk-evaluate-exp", "u7-pk-exact-value", "u7-pk-inverse-graph", "u7-pk-laws-equivalent", "u7-pk-product-law", "u7-pk-sketch-log", "u7-pk-two-laws", "u8-pk-area-parallelogram", "u8-pk-area-triangle", "u8-pk-multiply-monomial", "u8-pk-sa-rect-prism"],
  "physics-2204": ["u1-51-convert-speed", "u3-713-nuclear-notation"],
  "chem-3202": ["u2-61-properties"]
};
ok(totalPk === 827, "programme carries exactly 827 prior knowledge entries (66 in Math 2201: 7 PK-coded plus the 59 tranche-flagged; 761 pkFlag instances in the other courses, 108 of them in Math 9, 99 in Math 8, 76 in Math 3202, 75 in Math 2200, 72 in Math 1201, 70 in Math 7, 65 in Math 2202, 56 in Math 1202, 49 in Math 3200, 41 in Math 3201, 41 in Math 3208, 3 each in math-9-fr and math-8-fr, 2 in Physics 2204, and 1 in Chemistry 3202), saw " + totalPk + " in " + JSON.stringify(pkByCourse));
for (const id of Object.keys(PK_PIN)) ok(JSON.stringify(pkIdsByCourse[id] || []) === JSON.stringify(PK_PIN[id]), id + ": prior knowledge set is the pinned set, saw " + JSON.stringify(pkIdsByCourse[id]));
ok(COURSE_IDS.every(id => PK_PIN[id] || (pkIdsByCourse[id] || []).length === 0), "no course outside the pinned set carries a prior knowledge entry");

/* -------- Part A: the flagging pass courses, switch driven -------- */
for (const id of ["math-9", "math-9-fr", "math-8", "math-8-fr", "math-3202", "math-2200", "math-2202", "math-1201", "math-1202", "math-3200", "math-3201", "math-3208", "physics-2204", "chem-3202"]) {
  const sb = loadCourse(id);
  const cfg = sb.window.COURSES[id];
  const ALLU = Object.keys(cfg.units).map(Number);
  run(sb, 'var __PK=true; function pkIncluded(){return __PK;} function enrichIncluded(){return false;}');
  const base = run(sb, "poolFor(" + JSON.stringify(ALLU) + ",[],false)").length;
  const drawPool = (on) => { run(sb, "__PK=" + on + ";"); return run(sb, "drawSet(" + JSON.stringify(ALLU) + ",[],10,[20,60,20],'unit',false)"); };
  let r = drawPool(true);
  ok(r.pool === base, id + " draws, PK on: draw pool equals the default pool (" + base + "), saw " + r.pool);
  r = drawPool(false);
  ok(r.pool === base - PK_PIN[id].length, id + " draws, PK off: draw pool drops exactly its " + PK_PIN[id].length + " flagged entries to " + (base - PK_PIN[id].length) + ", saw " + r.pool);
  let leak = 0;
  for (let i = 0; i < 10; i++) { const rr = drawPool(false); rr.items.forEach(q => { if (isPkE(q._entry)) leak++; }); }
  ok(leak === 0, id + " draws, PK off: zero prior knowledge entries in 10 drawn sets, saw " + leak);
}

/* ---------------- Part A: Math 2201 toggle states ---------------- */
{
  const sb = loadCourse("math-2201");
  const ALL = [1, 2, 3, 4, 5, 6, 7, 8];
  run(sb, 'var __ENR=false,__PK=true; function enrichIncluded(){return __ENR;} function pkIncluded(){return __PK;}');
  run(sb, 'function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}');

  ok(run(sb, "poolFor([7],[])").length === 33, "toggle off: Unit 7 practice pool is 33");
  run(sb, "__ENR=true;");
  const u7on = run(sb, "poolFor([7],[])");
  ok(u7on.length === 35 && u7on.some(e => e.id === "u7-converse-contrapositive") && u7on.some(e => e.id === "u7-converse-truth"),
     "toggle on: both enrichment entries appear in the Unit 7 practice pool (pool " + u7on.length + ")");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 295, "toggle on: whole-bank pool is 295");
  run(sb, "__ENR=false;");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 293, "toggle off again: whole-bank pool is 293");

  // practice draws through drawSet: PK switch
  const drawPool = (enr, pk) => { run(sb, "__ENR=" + enr + ";__PK=" + pk + ";"); return run(sb, "drawSet(" + JSON.stringify(ALL) + ",[],10,[20,60,20],'unit',false)"); };
  let r = drawPool(false, true);
  ok(r.pool === 293, "draws, enrichment off and PK on: draw pool 293, saw " + r.pool);
  r = drawPool(false, false);
  ok(r.pool === 227, "draws, PK off: draw pool drops by the 66 PK entries to 227, saw " + r.pool);
  let pkLeak = 0, enrLeak = 0;
  for (let i = 0; i < 25; i++) {
    const rr = drawPool(false, false);
    rr.items.forEach(q => { if (isPkE(q._entry)) pkLeak++; if (q._entry.enrich) enrLeak++; });
  }
  ok(pkLeak === 0, "draws, PK off: zero PK entries in 25 drawn sets, saw " + pkLeak);
  ok(enrLeak === 0, "draws, enrichment off: zero enrichment entries in 25 drawn sets, saw " + enrLeak);
  r = drawPool(true, false);
  ok(r.pool === 229, "draws, enrichment on and PK off: draw pool 229, saw " + r.pool);
  r = drawPool(true, true);
  ok(r.pool === 295, "draws, both on: draw pool 295, saw " + r.pool);

  // composed papers: identical across every toggle combination.
  // Each measured compose is preceded by a discarded warm-up
  // compose under the same toggles: probeType caches each entry's
  // type by generating it once, and a cold cache would consume
  // the seeded stream differently from a warm one, which is a
  // harness artifact, not a toggle effect.
  const fp = res => JSON.stringify([res.total, res.srMarks, res.crMarks, res.short,
    res.srItems.map(it => it.q._entry.id).sort(), res.crItems.map(it => it.q._entry.id).sort()]);
  const measured = (sbx, scope, ipk) => {
    run(sbx, "__reseed(7);");
    run(sbx, "composeExam(" + JSON.stringify(scope) + ",[]," + ipk + ")");
    run(sbx, "__reseed(99);");
    return fp(run(sbx, "composeExam(" + JSON.stringify(scope) + ",[]," + ipk + ")"));
  };
  for (const scope of [[7], [5, 6, 7, 8], ALL]) {
    for (const ipk of ["undefined", "true"]) {
      let base = null;
      for (const combo of [[false, true], [true, true], [false, false], [true, false]]) {
        run(sb, "__ENR=" + combo[0] + ";__PK=" + combo[1] + ";");
        const f = measured(sb, scope, ipk);
        if (base === null) base = f;
        ok(f === base, "compose [" + scope.join(",") + "] includePK=" + ipk + ": identical with enrichment " + (combo[0] ? "on" : "off") + " and PK switch " + (combo[1] ? "on" : "off"));
      }
    }
  }
  // the exam-side includePK behaviour with no practice accessors present at all
  const fresh = loadCourse("math-2201");
  run(fresh, 'function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}');
  const f0 = measured(fresh, [3], "true");
  run(sb, "__ENR=true;__PK=true;");
  ok(measured(sb, [3], "true") === f0, "includePK composition matches the no-accessor baseline exactly");
}

/* ---------------- Part A: Math 3201 toggle states ---------------- */
{
  const sb = loadCourse("math-3201");
  const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const BINOMIAL = ["u9-binomial-prob", "u9-binomial-expected", "u9-binomial-identify"];
  run(sb, 'var __ENR=false,__PK=true; function enrichIncluded(){return __ENR;} function pkIncluded(){return __PK;}');
  run(sb, 'function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}');

  ok(run(sb, "poolFor([9],[])").length === 27, "3201 toggle off: Unit 9 practice pool is 27");
  run(sb, "__ENR=true;");
  const u9on = run(sb, "poolFor([9],[])");
  ok(u9on.length === 30 && BINOMIAL.every(id => u9on.some(e => e.id === id)),
     "3201 toggle on: the three binomial entries appear in the Unit 9 practice pool (pool " + u9on.length + ")");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 249, "3201 toggle on: whole-bank pool is 249");
  run(sb, "__ENR=false;");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 246, "3201 toggle off again: whole-bank pool is 246");

  // practice draws through drawSet; the PK switch drops the
  // course's 41 flagged prior knowledge entries (one audit flag
  // before the November 16, 2026 tranche, 41 after it).
  const drawPool = (enr, pk) => { run(sb, "__ENR=" + enr + ";__PK=" + pk + ";"); return run(sb, "drawSet(" + JSON.stringify(ALL) + ",[],10,[20,60,20],'unit',false)"); };
  let r = drawPool(false, true);
  ok(r.pool === 246, "3201 draws, enrichment off: draw pool 246, saw " + r.pool);
  r = drawPool(true, true);
  ok(r.pool === 249, "3201 draws, enrichment on: draw pool 249, saw " + r.pool);
  r = drawPool(false, false);
  ok(r.pool === 205, "3201 draws, PK switch off: draw pool drops the 41 flagged prior knowledge entries to 205, saw " + r.pool);
  let enrLeak = 0;
  for (let i = 0; i < 25; i++) {
    const rr = drawPool(false, true);
    rr.items.forEach(q => { if (q._entry.enrich) enrLeak++; });
  }
  ok(enrLeak === 0, "3201 draws, enrichment off: zero enrichment entries in 25 drawn sets, saw " + enrLeak);
  let pkLeak = 0;
  for (let i = 0; i < 25; i++) {
    const rr = drawPool(false, false);
    rr.items.forEach(q => { if (isPkE(q._entry)) pkLeak++; });
  }
  ok(pkLeak === 0, "3201 draws, PK off: zero prior knowledge entries in 25 drawn sets, saw " + pkLeak);

  // composed papers: identical across every toggle combination
  // (same warm-up discipline as the Math 2201 block) and free
  // of the flagged entries.
  const fp = res => JSON.stringify([res.total, res.srMarks, res.crMarks, res.short,
    res.srItems.map(it => it.q._entry.id).sort(), res.crItems.map(it => it.q._entry.id).sort()]);
  const measured = (sbx, scope, ipk) => {
    run(sbx, "__reseed(7);");
    run(sbx, "composeExam(" + JSON.stringify(scope) + ",[]," + ipk + ")");
    run(sbx, "__reseed(99);");
    return fp(run(sbx, "composeExam(" + JSON.stringify(scope) + ",[]," + ipk + ")"));
  };
  for (const scope of [[9], [5, 6, 7, 8, 9], ALL]) {
    for (const ipk of ["undefined", "true"]) {
      let base = null;
      for (const combo of [[false, true], [true, true], [false, false], [true, false]]) {
        run(sb, "__ENR=" + combo[0] + ";__PK=" + combo[1] + ";");
        const f = measured(sb, scope, ipk);
        if (base === null) base = f;
        ok(f === base, "3201 compose [" + scope.join(",") + "] includePK=" + ipk + ": identical with enrichment " + (combo[0] ? "on" : "off") + " and PK switch " + (combo[1] ? "on" : "off"));
      }
    }
  }
  run(sb, "__ENR=true;__PK=true;__reseed(5);");
  const onePaper = run(sb, "composeExam([5,6,7,8,9],[],undefined)");
  const paperIds = onePaper.srItems.concat(onePaper.crItems).map(it => it.q._entry.id);
  ok(!paperIds.some(id => BINOMIAL.includes(id)), "3201 compose with both toggles on: no binomial entry in the composed paper");
}

/* ---------------- Part B: jsdom visibility and links ---------------- */
const { JSDOM } = require("jsdom");
const { VirtualConsole } = require("jsdom");
function boot(qs) {
  return new Promise((resolve) => {
    const errors = [];
    const vc = new VirtualConsole();
    vc.on("jsdomError", e => errors.push(String(e.detail && e.detail.message || e.message || e)));
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
    });
    setTimeout(() => resolve({ dom, errors }), 2000);
  });
}
const ev = (dom, code) => dom.window.eval(code);

(async () => {
  // jsdom runs the inline boot dispatch before the document-written
  // bank script lands, so the dispatch's own auto-start sees an
  // empty bank there; each boot below starts its set explicitly
  // after the settle, once the bank is in.
  let r = await boot("course=math-2201&teacher=1&unit=7&count=5");
  let d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(!!d.querySelector("#enrChk"), "visibility: Math 2201 teacher bar renders the enrichment toggle");
  ok(!!d.querySelector("#pkInChk"), "visibility: Math 2201 teacher bar renders the prior knowledge switch");
  ok(d.querySelector("#enrChk") && !d.querySelector("#enrChk").checked, "visibility: enrichment toggle starts unchecked (default out)");
  ok(d.querySelector("#pkInChk") && d.querySelector("#pkInChk").checked, "visibility: prior knowledge switch starts checked (default in)");
  ok(ev(r.dom, "settings().enr") === false && ev(r.dom, "settings().pkIn") === true, "link state: defaults read enr off, pkIn on");
  ok(ev(r.dom, "BANK.length") === 295 && ev(r.dom, "poolFor([7],[]).length") === 33, "live shell: bank 295, default Unit 7 pool 33");
  ok(ev(r.dom, "current.every(function(q){return !q._entry.enrich;})"), "live shell: the auto-started default set holds no enrichment question");
  ok(ev(r.dom, "tags({ _entry: BANK.find(function(e){return e.enrich;}) })").includes("Enrichment"), "marking: a drawn enrichment question's card tags carry the word Enrichment");
  ok(ev(r.dom, "tScopePool().length") === 35 && ev(r.dom, "tScopePool().some(function(e){return e.enrich;})"), "picker: the pick from bank pool for the Unit 7 scope includes the enrichment entries (35)");
  ev(r.dom, "tOpenPicker('Pick from bank', tScopePool(), function(){}, 'mc')");
  ok((d.querySelector("#tPicker") || { innerHTML: "" }).innerHTML.includes("Enrichment"), "marking: pick from bank list entries carry the word Enrichment");
  r.dom.window.close();

  r = await boot("course=math-2201&teacher=1&unit=7&count=5&enr=1");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(ev(r.dom, "settings().enr") === true && ev(r.dom, "enrichIncluded()") === true, "link state: enr=1 lands in settings and the accessor");
  ok(ev(r.dom, "poolFor([7],[]).length") === 35, "link state: enr=1 opens the Unit 7 pool to 35");
  ok(d.querySelector("#enrChk") && d.querySelector("#enrChk").checked, "visibility: with enr=1 the rendered toggle is checked");
  r.dom.window.close();

  r = await boot("course=math-2201&teacher=1&unit=5&count=5&pkin=0");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(ev(r.dom, "settings().pkIn") === false && ev(r.dom, "pkIncluded()") === false, "link state: pkin=0 lands in settings and the accessor");
  ok(ev(r.dom, "poolFor([5],[]).length") === 52, "composition fence: poolFor for Unit 5 is untouched by the PK switch (52)");
  ok(ev(r.dom, "drawSet([5],[],5,[20,60,20],'unit',false).pool") === 43, "draws: with pkin=0 the Unit 5 draw pool drops the 9 PK entries (43)");
  ok(d.querySelector("#pkInChk") && !d.querySelector("#pkInChk").checked, "visibility: with pkin=0 the rendered switch is unchecked");
  r.dom.window.close();

  r = await boot("course=physics-2204&teacher=1&unit=1&count=5");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(!!d.querySelector(".tbar"), "visibility: Physics 2204 teacher bar renders");
  ok(!d.querySelector("#enrChk"), "visibility: Physics 2204 (no enrichment entries) shows no enrichment toggle");
  ok(!!d.querySelector("#pkInChk"), "visibility: Physics 2204 (two flagged prior knowledge entries) renders the prior knowledge switch");
  ok(d.querySelector("#pkInChk") && d.querySelector("#pkInChk").checked, "visibility: Physics 2204 prior knowledge switch starts checked (default in)");
  ok(ev(r.dom, "settings().enr") === false && ev(r.dom, "settings().pkIn") === true, "link state: Physics 2204 keeps the harmless defaults");
  r.dom.window.close();

  r = await boot("course=physics-2204&teacher=1&unit=1&count=5&pkin=0");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(ev(r.dom, "settings().pkIn") === false && ev(r.dom, "pkIncluded()") === false, "link state: pkin=0 lands in Physics 2204 settings and the accessor");
  ok(ev(r.dom, "drawSet([1],[],5,[20,60,20],'unit',false).pool") === ev(r.dom, "poolFor([1],[]).length") - 1, "draws: with pkin=0 the Physics 2204 Unit 1 draw pool drops its one flagged entry (u1-51-convert-speed)");
  ok(d.querySelector("#pkInChk") && !d.querySelector("#pkInChk").checked, "visibility: with pkin=0 the rendered Physics 2204 switch is unchecked");
  r.dom.window.close();

  r = await boot("course=math-3201&teacher=1&unit=9&count=5");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(!!d.querySelector("#enrChk"), "visibility: Math 3201 teacher bar renders the enrichment toggle");
  ok(!!d.querySelector("#pkInChk"), "visibility: Math 3201 (41 flagged prior knowledge entries) renders the prior knowledge switch");
  ok(d.querySelector("#pkInChk") && d.querySelector("#pkInChk").checked, "visibility: Math 3201 prior knowledge switch starts checked (default in)");
  ok(d.querySelector("#enrChk") && !d.querySelector("#enrChk").checked, "visibility: Math 3201 enrichment toggle starts unchecked (default out)");
  ok(ev(r.dom, "BANK.length") === 249 && ev(r.dom, "poolFor([9],[]).length") === 27, "live shell: Math 3201 bank 249, default Unit 9 pool 27");
  ok(ev(r.dom, "current.every(function(q){return !q._entry.enrich;})"), "live shell: the auto-started Math 3201 default set holds no enrichment question");
  ok(ev(r.dom, "tags({ _entry: BANK.find(function(e){return e.enrich;}) })").includes("Enrichment"), "marking: a drawn Math 3201 enrichment question's card tags carry the word Enrichment");
  r.dom.window.close();

  r = await boot("course=math-3201&teacher=1&unit=9&count=5&enr=1");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(ev(r.dom, "settings().enr") === true && ev(r.dom, "enrichIncluded()") === true, "link state: enr=1 lands in Math 3201 settings and the accessor");
  ok(ev(r.dom, "poolFor([9],[]).length") === 30, "link state: enr=1 opens the Math 3201 Unit 9 pool to 30");
  ok(d.querySelector("#enrChk") && d.querySelector("#enrChk").checked, "visibility: with enr=1 the rendered Math 3201 toggle is checked");
  r.dom.window.close();

  // the remaining newly flagged courses of the Nov 13 pass:
  // each renders the prior knowledge switch (checked by
  // default) and no enrichment toggle.
  for (const cid of ["math-9", "math-9-fr", "math-8", "math-8-fr", "math-3202", "math-2200", "math-2202", "math-3208", "chem-3202"]) {
    r = await boot("course=" + cid + "&teacher=1&unit=1&count=3");
    d = r.dom.window.document;
    ev(r.dom, "startOnline()");
    ok(!!d.querySelector("#pkInChk"), "visibility: " + cid + " (flagged prior knowledge entries) renders the prior knowledge switch");
    ok(d.querySelector("#pkInChk") && d.querySelector("#pkInChk").checked, "visibility: " + cid + " prior knowledge switch starts checked (default in)");
    ok(!d.querySelector("#enrChk"), "visibility: " + cid + " (no enrichment entries) shows no enrichment toggle");
    r.dom.window.close();
  }

  console.log(fails.length ? "GATE-ENRICHMENT FAIL: " + fails.join(" | ") : "GATE-ENRICHMENT PASS");
  process.exit(fails.length ? 1 : 0);
})();
