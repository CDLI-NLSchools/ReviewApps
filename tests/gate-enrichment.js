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
   the tranche build report. */
const PK_PIN = {
  "math-2201": ["u1-pk-find-angle", "u1-pk-find-side", "u1-pk-label-sides", "u1-pk-pythagoras", "u1-pk-ramp-run", "u1-pk-ratio-def", "u1-pk-rope-angle", "u1-pk-solve-triangle", "u2-pk-domain-range", "u2-pk-dr-linear", "u2-pk-eval-function", "u2-pk-graph-data", "u2-pk-graph-form", "u2-pk-graph-strategy", "u2-pk-intercepts", "u2-pk-solve-input", "u3-factor-difference", "u3-factor-monic", "u3-factor-nonmonic", "u3-pk-binom-tri-expand", "u3-pk-gcf", "u3-pk-radical-mixed", "u3-pk-solve-two-step", "u4-pk-defined", "u4-pk-evaluate-exp", "u4-pk-laws-integral", "u4-pk-laws-rational", "u4-pk-radical-entire", "u4-pk-radical-mixed", "u4-pk-solve-two-step", "u4-pk-which-is-solution", "u5-centre-mean", "u5-centre-median", "u5-centre-mode", "u5-choosing-measure", "u5-pk-freq-mean", "u5-pk-generalization-critique", "u5-pk-sample-or-population", "u5-pk-sample-scale", "u5-pk-supported-conclusion", "u6-pk-convert-multistep", "u6-pk-rate-of-change", "u6-pk-sa-basic", "u6-pk-scale-draw", "u6-pk-scale-factor", "u6-pk-solve-input", "u6-pk-unit-rate", "u6-pk-vol-basic", "u7-pk-angle-justify", "u7-pk-conjecture", "u7-pk-counterexample", "u7-pk-inductive-limit", "u7-pk-pattern-figure", "u7-pk-pattern-word", "u7-pk-proof-error", "u7-pk-table-equation", "u7-pk-valid-chain", "u8-pk-angle-measure", "u8-pk-comp-supp", "u8-pk-parallel-decision", "u8-pk-polygon-sum", "u8-pk-solve-two-step", "u8-pk-transversal-measure", "u8-pk-transversal-pairs", "u8-pk-triangle-sum", "u8-pk-word-two-step"],
  "math-9": ["u9-gap-freq-mean-cr", "u9-gap-freq-mean-mc", "u9-gap-mean-diff-cr"],
  "math-9-fr": ["u9-gap-freq-mean-cr", "u9-gap-freq-mean-mc", "u9-gap-mean-diff-cr"],
  "math-8": ["u7-combined-mean-gap", "u7-mean-difference-gap", "u7-missing-mean-value-gap"],
  "math-8-fr": ["u7-combined-mean-gap", "u7-mean-difference-gap", "u7-missing-mean-value-gap"],
  "math-3201": ["u4-express-as-power"],
  "math-3202": ["u9r-elevation-depression", "u9r-find-angle", "u9r-find-side", "u9r-find-side-workplace", "u9r-ratio-value", "u9r-reasonable-result"],
  "math-2200": ["u8-numberline-read", "u8-solve-linear-basic", "u8-solve-linear-flip"],
  "math-2202": ["u4-cr-percent-change", "u4-misleading-actual", "u8-choose-ratio-equation", "u8-cr-find-angle"],
  "math-3208": ["u2-repeating-decimal"],
  "physics-2204": ["u1-51-convert-speed", "u3-713-nuclear-notation"],
  "chem-3202": ["u2-61-properties"]
};
ok(totalPk === 96, "programme carries exactly 96 prior knowledge entries (66 in Math 2201: 7 PK-coded plus the 59 tranche-flagged; 30 pkFlag instances in the other courses), saw " + totalPk + " in " + JSON.stringify(pkByCourse));
for (const id of Object.keys(PK_PIN)) ok(JSON.stringify(pkIdsByCourse[id] || []) === JSON.stringify(PK_PIN[id]), id + ": prior knowledge set is the pinned set, saw " + JSON.stringify(pkIdsByCourse[id]));
ok(COURSE_IDS.every(id => PK_PIN[id] || (pkIdsByCourse[id] || []).length === 0), "no course outside the pinned set carries a prior knowledge entry");

/* -------- Part A: the flagging pass courses, switch driven -------- */
for (const id of ["math-9", "math-9-fr", "math-8", "math-8-fr", "math-3202", "math-2200", "math-2202", "math-3208", "physics-2204", "chem-3202"]) {
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

  ok(run(sb, "poolFor([9],[])").length === 24, "3201 toggle off: Unit 9 practice pool is 24");
  run(sb, "__ENR=true;");
  const u9on = run(sb, "poolFor([9],[])");
  ok(u9on.length === 27 && BINOMIAL.every(id => u9on.some(e => e.id === id)),
     "3201 toggle on: the three binomial entries appear in the Unit 9 practice pool (pool " + u9on.length + ")");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 212, "3201 toggle on: whole-bank pool is 212");
  run(sb, "__ENR=false;");
  ok(run(sb, "poolFor(" + JSON.stringify(ALL) + ",[])").length === 209, "3201 toggle off again: whole-bank pool is 209");

  // practice draws through drawSet; the PK switch drops the
  // course's one flagged prior knowledge entry.
  const drawPool = (enr, pk) => { run(sb, "__ENR=" + enr + ";__PK=" + pk + ";"); return run(sb, "drawSet(" + JSON.stringify(ALL) + ",[],10,[20,60,20],'unit',false)"); };
  let r = drawPool(false, true);
  ok(r.pool === 209, "3201 draws, enrichment off: draw pool 209, saw " + r.pool);
  r = drawPool(true, true);
  ok(r.pool === 212, "3201 draws, enrichment on: draw pool 212, saw " + r.pool);
  r = drawPool(false, false);
  ok(r.pool === 208, "3201 draws, PK switch off: draw pool drops the one flagged prior knowledge entry (u4-express-as-power) to 208, saw " + r.pool);
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
  ok(!!d.querySelector("#pkInChk"), "visibility: Math 3201 (one flagged prior knowledge entry) renders the prior knowledge switch");
  ok(d.querySelector("#pkInChk") && d.querySelector("#pkInChk").checked, "visibility: Math 3201 prior knowledge switch starts checked (default in)");
  ok(d.querySelector("#enrChk") && !d.querySelector("#enrChk").checked, "visibility: Math 3201 enrichment toggle starts unchecked (default out)");
  ok(ev(r.dom, "BANK.length") === 212 && ev(r.dom, "poolFor([9],[]).length") === 24, "live shell: Math 3201 bank 212, default Unit 9 pool 24");
  ok(ev(r.dom, "current.every(function(q){return !q._entry.enrich;})"), "live shell: the auto-started Math 3201 default set holds no enrichment question");
  ok(ev(r.dom, "tags({ _entry: BANK.find(function(e){return e.enrich;}) })").includes("Enrichment"), "marking: a drawn Math 3201 enrichment question's card tags carry the word Enrichment");
  r.dom.window.close();

  r = await boot("course=math-3201&teacher=1&unit=9&count=5&enr=1");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  ok(ev(r.dom, "settings().enr") === true && ev(r.dom, "enrichIncluded()") === true, "link state: enr=1 lands in Math 3201 settings and the accessor");
  ok(ev(r.dom, "poolFor([9],[]).length") === 27, "link state: enr=1 opens the Math 3201 Unit 9 pool to 27");
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
