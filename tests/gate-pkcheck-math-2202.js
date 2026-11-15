#!/usr/bin/env node
/* Prerequisite-check gate for the Math 2202 prior knowledge tranche
   (Nov 15, 2026), in the pattern of gate-pkcheck-math-2201.js,
   gate-pkcheck-math-2200.js and gate-pkcheck-math-3202.js. Part 1
   (bank level): for every unit, across several seeds, a pkonly
   draw deals only pkFlag entries, deals min(8, pool), never
   repeats an entry, samples every pkGroup in the pool, and deals
   at most one Level 3 entry; Unit 4's pool carries the course's
   only Level 3 prior knowledge entries (the two Cluster 7 entries
   flagged on November 13, 2026), so its check deals exactly one
   Level 3 entry on every seed, the percent-change group sampled
   through that filler place. pkonly overrides pkin=0 and bypasses
   indicator filtering; seeded identity holds; the group-keyed
   retry draws behave (Unit 2's formula-use group filling its
   retry from its three entries, Unit 4's graph-reading group
   filling from its four with no Level 3 dealt, the mixed retry
   dealing exactly one Level 3, and Unit 4's all-Level-3
   percent-change group filling its retry to 8 from its two
   entries under the relaxation); sheets and composed papers
   ignore pkonly (the course now sets pkPracticeOnly). Part 2
   (the live shell, in jsdom): a student pkonly link deals the
   check with Unit 2's reference panel suppressed, the resume
   round trip keeps it suppressed, the ordinary link for the same
   unit shows its panel and does not resurrect the check, the
   teacher action deals the check, the scripted group retry names
   groups in plain language, and the end-mode retry switch (and
   its rkeep=1 override) behave as ruled. Run with --bankonly to
   stop after Part 1 (the pre-tranche failure demonstration uses
   it against the pre-tranche bank state). */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
let pass = 0, fail = 0;
function ok(cond, msg) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + msg); } }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- Part 1: bank-level draws ---------------- */
function extractFn(src, name) {
  const i = src.indexOf("function " + name + "(");
  if (i < 0) throw new Error("missing function " + name);
  let d = 0, j = src.indexOf("{", i);
  for (; j < src.length; j++) { if (src[j] === "{") d++; else if (src[j] === "}") { d--; if (!d) return src.slice(i, j + 1); } }
  throw new Error("unbalanced " + name);
}
function makeSandbox() {
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const helperBlock = blocks.find(b => b.includes("function mcq"));
  const sb = { console };
  sb.window = {};
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(ROOT + "/courses.js", "utf8"), sb);
  sb.window.__COURSE = sb.window.COURSES["math-2202"];
  vm.runInContext(helperBlock.replace(/"use strict";/g, ""), sb);
  vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen}; if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";} BANK.push(e);}', sb);
  vm.runInContext(fs.readFileSync(ROOT + "/banks/math-2202.js", "utf8"), sb);
  vm.runInContext('var CR_MARKS=window.__BANK_CRMARKS||{}; var _probeCache={};', sb);
  for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "pkGroupOf", "drawSet", "drawSheetSet", "composeExam"])
    vm.runInContext(extractFn(html, n), sb);
  vm.runInContext('var PKONLY_DRAW=false,PKONLY_GROUPS=null; var __PK=true; function pkIncluded(){return __PK;} function enrichIncluded(){return false;}', sb);
  vm.runInContext('function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}', sb);
  return sb;
}
const sb = makeSandbox();
const run = (code) => vm.runInContext(code, sb);
const POOLS = { 1: 5, 2: 10, 3: 10, 4: 9, 5: 7, 6: 8, 7: 8, 8: 8 };
const POOL_IDS = {
  1: ["u1-pk-rotate-predict", "u1-pk-rotated-side-view", "u1-pk-rotate-front", "u1-pk-scale-draw", "u1-pk-scale-factor"],
  2: ["u2-pk-surface-prism", "u2-pk-cylinder-sa", "u2-pk-composite-area", "u2-pk-circle-area", "u2-pk-perimeter", "u2-pk-formula-manip", "u2-pk-error-analysis", "u2-pk-si-imp-convert", "u2-pk-imp-si-convert", "u2-pk-si-convert"],
  3: ["u3-pk-vol-base-height", "u3-pk-vol-tri-prism", "u3-pk-vol-cylinder", "u3-pk-holds-most", "u3-pk-tank-litres", "u3-pk-area-si-convert", "u3-pk-area-imp-convert", "u3-pk-area-convert-adv", "u3-pk-circumference", "u3-pk-find-leg"],
  4: ["u4-misleading-actual", "u4-cr-percent-change", "u4-pk-graph-describe", "u4-pk-point-on-graph", "u4-pk-interpolate", "u4-pk-missing-coord", "u4-pk-graph-read", "u4-pk-graph-quantities", "u4-pk-line-graph"],
  5: ["u5-pk-hours-total", "u5-pk-gross-overtime", "u5-pk-gross-tips", "u5-pk-deduction-calc", "u5-pk-cpp-ei-tax", "u5-pk-net-pay", "u5-pk-percent-of-amount"],
  6: ["u6-pk-percent-of-amount", "u6-pk-commission", "u6-pk-evaluate-power", "u6-pk-product-law", "u6-pk-two-laws", "u6-pk-percent-change", "u6-pk-percent-change-cr", "u6-pk-find-the-whole"],
  7: ["u7-pk-express-rate", "u7-pk-identify-rate", "u7-pk-rate-problem", "u7-pk-unit-rate-cost", "u7-pk-similar-check", "u7-pk-corresponding-sides", "u7-pk-similar-missing-side", "u7-pk-scale-apply"],
  8: ["u8-choose-ratio-equation", "u8-cr-find-angle", "u8-pk-choose-ratio", "u8-pk-sine-ratio-constant", "u8-pk-unknown-angle", "u8-pk-find-angle-num", "u8-pk-hypotenuse-rearrange", "u8-pk-reasonable"]
};
ok(run("BANK.filter(function(e){return e.pkFlag;}).length") === 65,
   "bank carries 65 flagged entries, saw " + run("BANK.filter(function(e){return e.pkFlag;}).length"));
ok(run("window.__COURSE.pkPracticeOnly===true"), "math-2202 config sets pkPracticeOnly");
for (let u = 1; u <= 8; u++) {
  const ids = run("BANK.filter(function(e){return e.unit===" + u + "&&isPK(e);}).map(function(e){return e.id;}).sort()");
  ok(JSON.stringify(ids) === JSON.stringify(POOL_IDS[u].slice().sort()),
     "unit " + u + ": the flagged pool is exactly the tranche set, saw " + JSON.stringify(ids));
}
function checkDraw(unit, inds, seed) {
  run("__reseed(" + seed + ");");
  return run("(function(){var r=drawSet([" + unit + "]," + JSON.stringify(inds) + ",8,[20,60,20],'unit',false);"
    + "return {n:r.items.length,pool:r.pool,thin:r.thin,"
    + "ids:r.items.map(function(q){return q._entry.id;}),"
    + "allPk:r.items.every(function(q){return isPK(q._entry);}),"
    + "l3:r.items.filter(function(q){return q._entry.level>=3;}).length,"
    + "groups:r.items.map(function(q){return pkGroupOf(q._entry);}),"
    + "canon:r.items.map(function(q){return canonQ(q);})};})()");
}
function poolGroups(unit) {
  return run("(function(){var s={};poolFor([" + unit + "],[],false).filter(isPK).forEach(function(e){s[pkGroupOf(e)]=1;});return Object.keys(s).sort();})()");
}
run("PKONLY_DRAW=true;");
for (let u = 1; u <= 8; u++) {
  for (const seed of [11, 99, 424242, 7, 2026]) {
    const r = checkDraw(u, [], seed);
    ok(r.pool === POOLS[u], "unit " + u + " seed " + seed + ": pkonly pool is " + POOLS[u] + ", saw " + r.pool);
    ok(r.allPk, "unit " + u + " seed " + seed + ": every dealt question is a prior knowledge entry");
    ok(r.n === Math.min(8, r.pool), "unit " + u + " seed " + seed + ": deals min(8, pool) questions, saw " + r.n);
    ok(new Set(r.ids).size === r.ids.length, "unit " + u + " seed " + seed + ": no entry repeats");
    ok(JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(u)), "unit " + u + " seed " + seed + ": every pkGroup is sampled");
    ok(r.l3 <= 1, "unit " + u + " seed " + seed + ": at most one Level 3 question, saw " + r.l3);
    if (u === 4) ok(r.l3 === 1, "unit 4 seed " + seed + ": exactly one Level 3 question (the percent-change filler), saw " + r.l3);
    const dup = new Set(r.canon).size !== r.canon.length;
    ok(r.thin === (dup || r.n < Math.min(8, r.pool)), "unit " + u + " seed " + seed + ": thin reports exactly the genuine duplicate/shortfall state");
  }
  const a = checkDraw(u, [], 99), b = checkDraw(u, [], 99);
  ok(JSON.stringify(a.ids) === JSON.stringify(b.ids) && JSON.stringify(a.canon) === JSON.stringify(b.canon),
     "unit " + u + ": the same seed redraws the identical check (ids and canonical questions)");
}
/* pkonly overrides the practice PK switch */
run("__PK=false;");
{
  const r = checkDraw(2, [], 99);
  ok(r.allPk && r.n === 8 && r.pool === 10, "precedence: with pkin=0 the Unit 2 check still deals its 8 prior knowledge questions");
}
run("__PK=true;");
/* pkonly bypasses indicator filtering carried on a link */
{
  const r = checkDraw(2, ["3.3"], 99);
  ok(r.allPk && r.n === 8 && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(2)),
     "precedence: a pkonly draw carrying indicator parameters still deals the full stratified Unit 2 check");
}
/* group-keyed retry draws (the PKONLY_GROUPS branch of drawSet) */
function retryDraw(unit, groups, seed) {
  run("__reseed(" + seed + ");");
  return run("(function(){PKONLY_GROUPS=" + JSON.stringify(groups) + ";var r=drawSet([" + unit + "],[],8,[20,60,20],'unit',false);PKONLY_GROUPS=null;"
    + "return {n:r.items.length,pool:r.pool,thin:r.thin,reused:r.reused,"
    + "ids:r.items.map(function(q){return q._entry.id;}),"
    + "distinct:new Set(r.items.map(function(q){return q._entry.id;})).size,"
    + "groups:r.items.map(function(q){return pkGroupOf(q._entry);}),"
    + "l3:r.items.filter(function(q){return q._entry.level>=3;}).length};})()");
}
{
  for (const seed of [11, 99, 424242]) {
    const r = retryDraw(2, ["formula-use"], seed);
    ok(r.n === 8 && r.l3 === 0 && r.distinct === 3 && r.groups.every((g) => g === "formula-use"),
       "retry u2 seed " + seed + ": the formula-use retry fills 8 from the group's three entries with no Level 3, saw n=" + r.n + " l3=" + r.l3 + " distinct=" + r.distinct);
  }
}
{
  const r = retryDraw(4, ["graph-reading"], 99);
  ok(r.n === 8 && r.l3 === 0 && r.distinct === 4 && r.groups.every((g) => g === "graph-reading"),
     "retry u4: the graph-reading retry fills 8 from the group's four entries with no Level 3, saw n=" + r.n + " l3=" + r.l3 + " distinct=" + r.distinct);
  const m = retryDraw(4, ["percent-change", "graph-reading"], 99);
  const c = {}; m.groups.forEach((g) => { c[g] = (c[g] || 0) + 1; });
  ok(m.n === 8 && m.l3 === 1 && c["percent-change"] === 1 && c["graph-reading"] === 7,
     "retry u4: the mixed retry deals exactly one percent-change question through the Level 3 filler place, saw " + JSON.stringify(c) + " l3=" + m.l3);
}
{
  for (const seed of [11, 99, 424242]) {
    const r = retryDraw(4, ["percent-change"], seed);
    ok(r.n === 8 && r.l3 === 8 && r.distinct === 2 && r.ids.every((id) => id === "u4-misleading-actual" || id === "u4-cr-percent-change"),
       "retry u4 seed " + seed + ": the all-Level-3 percent-change group fills its retry to 8 from its two entries under the relaxation, saw n=" + r.n + " l3=" + r.l3 + " distinct=" + r.distinct);
  }
}
{
  const r = retryDraw(2, null, 99);
  ok(r.n === 8 && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(2)),
     "retry: with no group restriction the pkonly draw is the ordinary full check");
}
/* sheets and exams ignore pkonly, even with the flag set */
{
  const sheetIds = (flag) => run("(function(){PKONLY_DRAW=" + flag + ";__reseed(99);"
    + "var s={units:[2],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};"
    + "var r=drawSheetSet(s);return r.items.map(function(q){return q._entry.id;});})()");
  run("(function(){var s={units:[2],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};drawSheetSet(s);})()");
  const withFlag = sheetIds(true), withoutFlag = sheetIds(false);
  ok(withFlag.length > 0 && JSON.stringify(withFlag) === JSON.stringify(withoutFlag),
     "sheets: drawSheetSet under a set PKONLY_DRAW flag is identical to the ordinary sheet draw");
  const paper = run("(function(){PKONLY_DRAW=true;var p=composeExam([2],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
  ok(paper === 0, "exams: composeExam under a set PKONLY_DRAW flag contains no prior knowledge entry (pkPracticeOnly)");
}
run("PKONLY_DRAW=false;");

if (process.argv.includes("--bankonly")) {
  console.log("GATE-PKCHECK-MATH-2202 (bank level): " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
}

/* ---------------- Part 2: the live shell, in jsdom ---------------- */
const { JSDOM } = require("jsdom");
const { VirtualConsole } = require("jsdom");
function storageShim(shared) {
  return {
    getItem: (k) => (k in shared ? shared[k] : null),
    setItem: (k, v) => { shared[k] = String(v); },
    removeItem: (k) => { delete shared[k]; },
    clear: () => { Object.keys(shared).forEach((k) => delete shared[k]); },
    key: (i) => Object.keys(shared)[i] || null,
    get length() { return Object.keys(shared).length; }
  };
}
function boot(qs, shared) {
  return new Promise((resolve) => {
    const vc = new VirtualConsole();
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
function settleBoot(dom) {
  return new Promise((res) => {
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 4000) {
        clearInterval(iv);
        try {
          dom.window.eval("if(window.__COURSE){applyURL();unitCheckboxes();renderIndicators();updatePoolInfo();}");
          dom.window.eval("(function(){"
            + "var p=new URLSearchParams(location.search);"
            + "if(!window.__COURSE)return;"
            + "if(p.get('set')){if(!window.T)tRebuildFromURL();return;}"
            + "if(!(p.get('unit')||p.get('preset')||p.get('indicator')))return;"
            + "var m=p.get('mode');"
            + "if(m==='sheet'||m==='worksheet'){if(!sheetState)startSheet();}"
            + "else if(m==='exam'){if(!examState)startExam();}"
            + "else if(!current||!current.length)startOnline();"
            + "})()");
        } catch (e) {}
        setTimeout(() => res(dom), 80);
      }
    }, 50);
  });
}
const ev = (d, code) => d.window.eval(code);
function resumeKey(shared) { return Object.keys(shared).find((k) => k.endsWith("-resume-v1")) || null; }
function answerAll(d, missSpec) {
  ev(d, `(function(spec){
    for(var i=0;i<current.length;i++){
      var q=current[i];
      var miss=spec?(spec.group!=null?(pkGroupOf(q._entry)===spec.group):(i===spec.index)):false;
      if(q.type==="mc"){
        var v=miss?((q.correct+1)%q.options.length):q.correct;
        var r=document.querySelector('input[name="opt'+i+'"][value="'+v+'"]');
        if(r){r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
      }else if(q.type==="num"){
        var inp=document.getElementById("ans"+i);
        if(inp){inp.value=String(miss?(q.answer+3):q.answer);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }else{
        var inp2=document.getElementById("ans"+i);
        if(inp2){inp2.value=miss?"zzz not the answer":q.answers[0];inp2.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }
      var cb=document.querySelector('[data-check="'+i+'"]');if(cb)cb.click();
      var sr=document.getElementById("sr"+i);
      if(sr&&!sr.hidden){var b=sr.querySelector('[data-rate="'+(miss?"missed":"got")+'"]');if(b)b.click();}
    }
  })(${JSON.stringify(missSpec || null)})`);
}
function answerAllEnd(d, missSpec) {
  ev(d, `(function(spec){
    for(var i=0;i<current.length;i++){
      var q=current[i];
      var miss=spec?(spec.group!=null?(pkGroupOf(q._entry)===spec.group):(i===spec.index)):false;
      if(q.type==="mc"){
        var v=miss?((q.correct+1)%q.options.length):q.correct;
        var r=document.querySelector('input[name="opt'+i+'"][value="'+v+'"]');
        if(r){r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
      }else if(q.type==="num"){
        var inp=document.getElementById("ans"+i);
        if(inp){inp.value=String(miss?(q.answer+3):q.answer);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }else{
        var inp2=document.getElementById("ans"+i);
        if(inp2){inp2.value=miss?"zzz not the answer":q.answers[0];inp2.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }
    }
    document.getElementById("gradeBtn").click();
    for(var j=0;j<current.length;j++){
      var sr=document.getElementById("sr"+j);
      if(sr&&!sr.hidden){
        var missJ=spec?(spec.group!=null?(pkGroupOf(current[j]._entry)===spec.group):(j===spec.index)):false;
        var b=sr.querySelector('[data-rate="'+(missJ?"missed":"got")+'"]');if(b)b.click();
      }
    }
  })(${JSON.stringify(missSpec || null)})`);
}
function answerFirst(d) {
  ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var r=document.querySelector('input[name="opt0"][value="'+q.correct+'"]');r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
    else{var inp=document.getElementById("ans0");inp.value=(q.type==="num"?String(q.answer):q.answers[0]);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
  })()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
}

(async () => {
  /* ===== a student pkonly link deals the check ===== */
  const shared = {};
  let d = await boot("course=math-2202&unit=2&pkonly=1&seed=pkc1&count=8", shared);
  ok(ev(d, "current ? current.length : 0") === 8, "link: the Unit 2 pkonly link deals 8 questions");
  ok(ev(d, "current.every(function(q){return isPK(q._entry);})") === true, "link: every question on the pkonly set is a prior knowledge entry");
  ok(ev(d, "settings().pkOnly") === true, "link: settings carry pkOnly from the pkonly=1 parameter");
  ok(ev(d, "settingsToURL()").includes("pkonly=1"), "link: the set's own link keeps pkonly=1");
  ok(ev(d, "document.getElementById('poolInfo').textContent") === "Prerequisite check pool for Unit 2: 10 questions",
     "link: the pool line reads as a prerequisite check pool, saw: " + ev(d, "document.getElementById('poolInfo').textContent"));
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: a student opening a pkonly link does not see the Advanced tools action");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the pkonly check render contains no refpanel markup");
  ok(!d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the pkonly check render contains no Formulas and facts panel");

  /* sheets and exams ignore pkonly */
  const sheetIdsPkonly = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
  ok(sheetIdsPkonly.length > 0 && sheetIdsPkonly.some((id) => !id.includes("-pk-")),
     "sheets: a sheet drawn while pkonly is set is an ordinary sheet, not a check");
  {
    const pp = ev(d, "(function(){var p=composeExam([2],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
    ok(pp === 0, "exams: a paper composed while pkonly is set contains no prior knowledge entry");
  }

  /* ===== answer, save, reload: the check resumes ===== */
  answerFirst(d);
  await sleep(900);
  ok(!!resumeKey(shared), "resume: progress on the check is saved like any practice set");
  d.window.close();

  d = await boot("course=math-2202&unit=2&pkonly=1&seed=pkc1&count=8", shared);
  ok(!!d.window.document.getElementById("resumeBar"), "resume: reopening the pkonly link offers Resume");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "resume: the checked state is restored on the check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the resumed check also renders with no refpanel markup");
  ok(!d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the resumed check also renders with no Formulas and facts panel");
  d.window.close();

  /* ===== the ordinary link for the same unit does not resurrect it ===== */
  d = await boot("course=math-2202&unit=2&seed=pkc1&count=8", shared);
  ok(!d.window.document.getElementById("resumeBar"), "signature: the ordinary Unit 2 set gets no offer from the check's save");
  ok(ev(d, "current.some(function(q){return !isPK(q._entry);})") === true, "signature: the ordinary set is an ordinary set");
  ok(d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the ordinary Unit 2 render does contain the refpanel markup");
  ok(d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the ordinary Unit 2 render shows its Formulas and facts panel");
  {
    const sheetIdsOrdinary = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
    ok(JSON.stringify(sheetIdsOrdinary) === JSON.stringify(sheetIdsPkonly),
       "sheets: the sheet from the pkonly state is entry-for-entry the sheet from the ordinary state (pkonly ignored)");
  }
  d.window.close();

  /* ===== the Advanced tools action ===== */
  d = await boot("course=math-2202&teacher=1&unit=2&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && !document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with one unit selected shows Start prerequisite check");
  ev(d, `document.getElementById("pkCheckBtn").click()`);
  await sleep(300);
  ok(ev(d, "settings().pkOnly") === true && ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return isPK(q._entry);})") === true,
     "action: clicking Start prerequisite check deals the Unit 2 check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the check dealt by the Advanced tools action also renders with no refpanel markup");
  d.window.close();

  d = await boot("course=math-2202&teacher=1&unit=2,3&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with two units selected hides the action (a check is per unit)");
  d.window.close();

  /* ===== group-keyed retry: the scripted Unit 2 check ===== */
  const sharedR = {};
  d = await boot("course=math-2202&unit=2&pkonly=1&seed=retry1&count=8", sharedR);
  answerAll(d, { group: "formula-use" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry: a check with a missed group offers Practice what I missed");
  const sumText = d.window.document.getElementById("setSummary").textContent;
  ok(sumText.includes("Using formulas") && sumText.includes("needs more practice"),
     "summary: the missed group is named in plain language as needing practice, saw: " + sumText.replace(/\s+/g, " ").slice(0, 240));
  ok(sumText.includes("Surface area") && sumText.includes("solid"),
     "summary: a mastered group is named and marked solid");
  ok(sumText.includes("Converting units"),
     "summary: the conversion group is named by its tranche label");
  ok(!sumText.includes("Indicators to practise more"),
     "summary: the check summary does not present host indicators as the thing to practise");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8, "retry: the retry set deals the check size of 8, saw " + ev(d, "current.length"));
  ok(ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='formula-use';})") === true,
     "retry: every retry question comes from the missed group");
  ok(ev(d, "current.every(function(q){return ['u2-pk-perimeter','u2-pk-formula-manip','u2-pk-error-analysis'].includes(q._entry.id);})") === true,
     "retry: no mastered-group entry appears in the retry set");
  ok(ev(d, "settings().pkOnly") === true && ev(d, "settingsToURL()").includes("pkonly=1"),
     "retry: the retry set is itself a check set and its link keeps pkonly=1");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "retry: the retry render also carries no Formulas and facts panel");
  answerFirst(d);
  await sleep(900);
  ok(!!resumeKey(sharedR), "retry: progress on the retry set is saved like any check set");
  d.window.close();

  /* a fully correct check offers no retry */
  d = await boot("course=math-2202&unit=2&pkonly=1&seed=retry2&count=8", {});
  answerAll(d, null);
  ok(!d.window.document.getElementById("retryMissedBtn"), "retry: a fully correct check offers no retry button");
  ok(d.window.document.getElementById("setSummary").textContent.includes("Every skill in this check"),
     "summary: a fully correct check says so in skill language");
  d.window.close();

  /* a different missed group on a third seed retries that group */
  d = await boot("course=math-2202&unit=2&pkonly=1&seed=retry3&count=8", {});
  answerAll(d, { group: "conversion" });
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return ['u2-pk-si-imp-convert','u2-pk-imp-si-convert','u2-pk-si-convert'].includes(q._entry.id);})") === true,
     "retry: missing conversion on another seed deals only conversion questions (fresh instances of its three entries)");
  d.window.close();

  /* ===== retry checking mode: an end-mode check retries as-you-go ===== */
  const sharedE = {};
  d = await boot("course=math-2202&unit=2&pkonly=1&chk=end&seed=rk1&count=8", sharedE);
  ok(ev(d, "checkMode") === "end", "retry mode: the check itself runs check-at-the-end");
  answerAllEnd(d, { group: "formula-use" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode: the end-mode check with a missed group offers the retry");
  ok(d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode: the summary says the retry checks each question as you go");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "each", "retry mode: the retry set runs check-as-you-go, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='formula-use';})") === true,
     "retry mode: the switched retry is still the group-keyed retry (8 questions, missed group only)");
  answerFirst(d);
  ev(d, `(function(){var sr=document.getElementById("sr0");if(sr&&!sr.hidden){var b=sr.querySelector('[data-rate="got"]');if(b)b.click();}})()`);
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1",
     "retry mode: the switched retry checks a question the moment it is asked (as-you-go is live)");
  await sleep(900);
  const keyE = resumeKey(sharedE);
  ok(!!keyE, "retry mode: progress on the switched retry is saved");
  let bodyE = null;
  try { bodyE = JSON.parse(sharedE[keyE]).body; } catch (e) {}
  ok(bodyE && bodyE.checkMode === "each", "retry mode: the retry's resume save carries checkMode each, saw " + (bodyE && bodyE.checkMode));
  {
    const saveE = JSON.parse(sharedE[keyE]);
    ev(d, "checkMode='end';");
    ev(d, `resumeApplyOnline(${JSON.stringify(saveE)})`);
    ok(ev(d, "checkMode") === "each", "retry mode: restoring the retry's save restores check-as-you-go with it");
  }
  d.window.close();

  /* rkeep=1: the teacher's Retry checking choice keeps the mode */
  d = await boot("course=math-2202&unit=2&pkonly=1&chk=end&rkeep=1&seed=rk2&count=8", {});
  ok(ev(d, "typeof RETRY_KEEP !== 'undefined' && RETRY_KEEP") === true, "retry mode (keep): rkeep=1 is read from the link");
  answerAllEnd(d, { group: "formula-use" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (keep): the end-mode check with a missed group offers the retry");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (keep): the summary carries no switch note when the mode is kept");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "end", "retry mode (keep): the retry keeps check-at-the-end, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='formula-use';})") === true,
     "retry mode (keep): the kept retry is still group-keyed (8 questions, missed group only)");
  ok(d.window.document.querySelectorAll("[data-ex]").length === 0,
     "retry mode (keep): the kept end-mode retry defers worked examples until grading (scaffold composition)");
  ev(d, "gradeAll()");
  ok(d.window.document.querySelectorAll("[data-ex]").length > 0,
     "retry mode (keep): grading the kept retry reveals its worked examples");
  d.window.close();

  /* an as-you-go check carries no switch note (nothing switches) */
  d = await boot("course=math-2202&unit=2&pkonly=1&seed=rk3&count=8", {});
  answerAll(d, { group: "formula-use" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (as-you-go check): the retry is offered");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (as-you-go check): no switch note when the first set already checked as-you-go");
  d.window.close();

  /* ===== ordinary sets keep the indicator retry (regression) ===== */
  d = await boot("course=math-2202&unit=2&seed=ord1&count=8", {});
  const target = ev(d, "(function(){for(var i=0;i<current.length;i++){if(!isPK(current[i]._entry))return {idx:i,ind:current[i]._entry.indicators[0]};}return null;})()");
  ok(!!target, "regression: the ordinary Unit 2 set contains a non-PK question to miss deliberately");
  answerAll(d, { index: target.idx });
  ok((d.window.document.getElementById("setSummary").textContent || "").includes("Indicators to practise more"),
     "regression: the ordinary summary still lists indicators to practise more");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "settings().pkOnly") === false, "regression: the ordinary retry does not turn pkOnly on");
  ok(ev(d, "settings().inds").includes(target.ind),
     "regression: the ordinary retry keys on the missed indicator (" + target.ind + "), saw " + JSON.stringify(ev(d, "settings().inds")));
  ok(ev(d, "current.length>0&&current.every(function(q){var inds=settings().inds;return q._entry.indicators.some(function(c){return inds.indexOf(c)>=0;});})") === true,
     "regression: the ordinary retry set draws only questions carrying a missed indicator");
  d.window.close();

  console.log("GATE-PKCHECK-MATH-2202: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-PKCHECK-MATH-2202 ERROR: " + (e && e.stack || e)); process.exit(1); });
