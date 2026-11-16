"use strict";
/* Gate: Math 3208 PK tranche (November 16, 2026).
   Part 1 (bank level, vm sandbox over the real shell functions):
   the flagged pool is exactly the tranche's 36 entries (35 borrowed
   from the Mathematics 2200, Mathematics 1201, Mathematics 9 and
   Mathematics 8 banks, and 1 entry already in this bank carrying
   tranche metadata from banks/math-3208/bank-pk.js:
   u2-repeating-decimal), every flagged entry carries pkSrc, pkFor
   and pkGroup metadata, a pkonly draw (PKONLY_DRAW, the flag the shell
   sets for a ?pkonly=1 set) deals only flagged entries, samples
   every pkGroup in the pool, and deals a pool's single Level 3
   entry only as filler when its Level 1 and 2 entries cannot fill
   the check (Unit 6); pkonly overrides the practice PK switch and
   any indicator parameters; group-keyed retry draws fill from the
   named group only; sheets and exams ignore pkonly entirely.
   Part 2 (the live shell in jsdom): a ?pkonly=1 link deals the
   check with the formulas panel suppressed, progress on a check
   saves and resumes like any set, the check's save signature does
   not leak into the ordinary set for the same unit and seed, the
   teacher-facing Start prerequisite check action deals the check
   for a single selected unit, and the end-of-check group retry
   (Practice what I missed) deals a group-keyed check set whose
   summary names skills in plain language.
   Run: NODE_PATH=<jsdom node_modules> node tests/gate-pkcheck-math-3208.js
   (--bankonly skips the jsdom part.) */
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
function makeSandbox(bankFile) {
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const helperBlock = blocks.find(b => b.includes("function mcq"));
  const sb = { console };
  sb.window = {};
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(ROOT + "/courses.js", "utf8"), sb);
  sb.window.__COURSE = sb.window.COURSES["math-3208"];
  vm.runInContext(helperBlock.replace(/"use strict";/g, ""), sb);
  { /* the label table and its reader live in a later script block */
    const li = html.indexOf("var PK_GROUP_LABELS=");
    let d = 0, j = html.indexOf("{", li);
    for (; j < html.length; j++) { if (html[j] === "{") d++; else if (html[j] === "}") { d--; if (!d) break; } }
    vm.runInContext(html.slice(li, j + 1) + ";", sb);
    vm.runInContext(extractFn(html, "pkGroupLabel"), sb);
  }
  vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen}; if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";} BANK.push(e);}', sb);
  vm.runInContext(fs.readFileSync(bankFile, "utf8"), sb);
  vm.runInContext('var CR_MARKS=window.__BANK_CRMARKS||{}; var _probeCache={};', sb);
  for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "pkGroupOf", "drawSet", "drawSheetSet", "composeExam"])
    vm.runInContext(extractFn(html, n), sb);
  vm.runInContext('var PKONLY_DRAW=false,PKONLY_GROUPS=null; var __PK=true; function pkIncluded(){return __PK;} function enrichIncluded(){return false;}', sb);
  vm.runInContext('function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}', sb);
  return sb;
}
const sb = makeSandbox(ROOT + "/banks/math-3208.js");
const run = (code) => vm.runInContext(code, sb);
const POOLS = { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 4, 7: 3, 8: 4 };
const POOL_IDS = {
  1: ["u1-pk-simplify-basic", "u1-pk-npv-basic", "u1-pk-defined-values", "u1-pk-eval-function", "u1-pk-solve-input"],
  2: ["u2-repeating-decimal", "u2-pk-simplify-trinomial", "u2-pk-geo-ratio", "u2-pk-converge-check", "u2-pk-infinite-sum"],
  3: ["u3-pk-npv-quadratic", "u3-pk-lcd", "u3-pk-recip-features", "u3-pk-solve-linear", "u3-pk-solve-extraneous"],
  4: ["u4-pk-slope-rise-run", "u4-pk-rate-of-change", "u4-pk-eq-slope-point", "u4-pk-eq-two-points", "u4-pk-factor-common"],
  5: ["u5-pk-characteristics", "u5-pk-sa-rect-prism", "u5-pk-vol-cylinder", "u5-pk-similar-context", "u5-pk-indirect-measure"],
  6: ["u6-pk-exact-values", "u6-pk-solve-equation", "u6-pk-point-ratios", "u6-pk-reflection-points"],
  7: ["u7-pk-product-law", "u7-pk-two-laws", "u7-pk-evaluate-exp"],
  8: ["u8-pk-area-triangle", "u8-pk-area-parallelogram", "u8-pk-sa-rect-prism", "u8-pk-multiply-monomial"]
};
ok(run("BANK.filter(function(e){return e.pkFlag;}).length") === 36,
   "bank carries 36 flagged entries, saw " + run("BANK.filter(function(e){return e.pkFlag;}).length"));
ok(run("window.__COURSE.pkPracticeOnly===true"), "math-3208 config sets pkPracticeOnly");
for (let u = 1; u <= 8; u++) {
  const ids = run("BANK.filter(function(e){return e.unit===" + u + "&&isPK(e);}).map(function(e){return e.id;}).sort()");
  ok(JSON.stringify(ids) === JSON.stringify(POOL_IDS[u].slice().sort()),
     "unit " + u + ": the flagged pool is exactly the tranche set, saw " + JSON.stringify(ids));
}
/* tranche metadata on every flagged entry */
{
  const meta = run("(function(){var reg={};Object.keys(window.__COURSE.unitInd).forEach(function(u){window.__COURSE.unitInd[u].forEach(function(c){reg[c]=1;});});"
    + "var bad=[];BANK.filter(function(e){return e.pkFlag;}).forEach(function(e){"
    + "if(typeof e.pkSrc!=='string'||!e.pkSrc)bad.push(e.id+':pkSrc');"
    + "if(typeof e.pkGroup!=='string'||!e.pkGroup)bad.push(e.id+':pkGroup');"
    + "if(!Array.isArray(e.pkFor)||!e.pkFor.length||!e.pkFor.every(function(c){return reg[c];}))bad.push(e.id+':pkFor');"
    + "var own=window.__COURSE.unitInd[e.unit]||[];"
    + "if(!e.indicators.every(function(c){return own.indexOf(c)>=0;}))bad.push(e.id+':tag');});"
    + "return bad;})()");
  ok(meta.length === 0, "metadata: every flagged entry carries pkSrc, pkGroup, a pkFor of registered host indicators, and an in-unit host tag; problems: " + meta.join(", "));
  const labels = run("(function(){var bad=[];BANK.filter(function(e){return e.pkFlag;}).forEach(function(e){if(!Object.prototype.hasOwnProperty.call(PK_GROUP_LABELS,e.pkGroup))bad.push(e.id+':'+e.pkGroup);});return bad;})()");
  ok(labels.length === 0, "labels: every flagged entry's group has an explicit PK_GROUP_LABELS entry; problems: " + labels.join(", "));
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
    ok(r.l3 === (u === 5 || u === 6 ? 1 : 0), "unit " + u + " seed " + seed + ": Level 3 discipline holds (a pool's single Level 3 entry is dealt only as filler when its Level 1 and 2 entries cannot fill the check), saw " + r.l3);
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
  const r = checkDraw(5, [], 99);
  ok(r.allPk && r.n === Math.min(8, r.pool) && r.pool === 5, "precedence: with pkin=0 the Unit 5 check still deals its full prior knowledge check (pool 5 at check size 8)");
}
run("__PK=true;");
/* pkonly bypasses indicator filtering carried on a link */
{
  const r = checkDraw(5, ["3.21"], 99);
  ok(r.allPk && r.n === Math.min(8, POOLS[5]) && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(5)),
     "precedence: a pkonly draw carrying indicator parameters still deals the full stratified Unit 5 check");
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
    const r = retryDraw(2, ["sequences"], seed);
    ok(r.n === 8 && r.l3 === 0 && r.distinct === 4 && r.groups.every((g) => g === "sequences"),
       "retry u2 seed " + seed + ": the sequences retry fills 8 from the group's 4 entries, saw n=" + r.n + " l3=" + r.l3 + " distinct=" + r.distinct);
  }
}
{
  const r = retryDraw(1, ["function-notation"], 99);
  ok(r.n === 8 && r.l3 === 0 && r.distinct === 2 && r.groups.every((g) => g === "function-notation"),
     "retry u1: the function-notation retry fills 8 from the group's 2 entries, saw n=" + r.n + " distinct=" + r.distinct);
}
{
  const r = retryDraw(4, ["graph-forms"], 99);
  ok(r.n === 8 && r.l3 === 0 && r.distinct === 2 && r.groups.every((g) => g === "graph-forms"),
     "retry u4: the graph-forms retry fills 8 from the group's 2 entries, saw n=" + r.n + " distinct=" + r.distinct);
}
{
  const r = retryDraw(5, null, 99);
  ok(r.n === Math.min(8, POOLS[5]) && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(5)),
     "retry: with no group restriction the pkonly draw is the ordinary full check");
}
/* sheets and exams ignore pkonly, even with the flag set */
{
  const sheetIds = (flag) => run("(function(){PKONLY_DRAW=" + flag + ";__reseed(99);"
    + "var s={units:[5],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};"
    + "var r=drawSheetSet(s);return r.items.map(function(q){return q._entry.id;});})()");
  run("(function(){var s={units:[5],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};drawSheetSet(s);})()");
  const withFlag = sheetIds(true), withoutFlag = sheetIds(false);
  ok(withFlag.length > 0 && JSON.stringify(withFlag) === JSON.stringify(withoutFlag),
     "sheets: drawSheetSet under a set PKONLY_DRAW flag is identical to the ordinary sheet draw");
  const paper = run("(function(){PKONLY_DRAW=true;var p=composeExam([5],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
  ok(paper === 0, "exams: composeExam under a set PKONLY_DRAW flag contains no prior knowledge entry (pkPracticeOnly)");
}
run("PKONLY_DRAW=false;");

if (process.argv.includes("--bankonly")) {
  console.log("GATE-PKCHECK-MATH-3208 (bank level): " + pass + " passed, " + fail + " failed");
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
  let d = await boot("course=math-3208&unit=5&pkonly=1&seed=pkc1&count=8", shared);
  ok(ev(d, "current ? current.length : 0") === 5, "link: the Unit 5 pkonly link deals 5 questions");
  ok(ev(d, "current.every(function(q){return isPK(q._entry);})") === true, "link: every question on the pkonly set is a prior knowledge entry");
  ok(ev(d, "settings().pkOnly") === true, "link: settings carry pkOnly from the pkonly=1 parameter");
  ok(ev(d, "settingsToURL()").includes("pkonly=1"), "link: the set's own link keeps pkonly=1");
  ok(ev(d, "document.getElementById('poolInfo').textContent") === "Prerequisite check pool for Unit 5: 5 questions",
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
    const pp = ev(d, "(function(){var p=composeExam([5],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
    ok(pp === 0, "exams: a paper composed while pkonly is set contains no prior knowledge entry");
  }

  /* ===== answer, save, reload: the check resumes ===== */
  answerFirst(d);
  await sleep(900);
  ok(!!resumeKey(shared), "resume: progress on the check is saved like any practice set");
  d.window.close();

  d = await boot("course=math-3208&unit=5&pkonly=1&seed=pkc1&count=8", shared);
  ok(!!d.window.document.getElementById("resumeBar"), "resume: reopening the pkonly link offers Resume");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "resume: the checked state is restored on the check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the resumed check also renders with no refpanel markup");
  ok(!d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the resumed check also renders with no Formulas and facts panel");
  d.window.close();

  /* ===== the ordinary link for the same unit does not resurrect it ===== */
  d = await boot("course=math-3208&unit=5&seed=pkc1&count=8", shared);
  ok(!d.window.document.getElementById("resumeBar"), "signature: the ordinary Unit 5 set gets no offer from the check's save");
  ok(ev(d, "current.some(function(q){return !isPK(q._entry);})") === true, "signature: the ordinary set is an ordinary set");
  ok(d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the ordinary Unit 5 render does contain the refpanel markup");
  ok(d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the ordinary Unit 5 render shows its Formulas and facts panel");
  {
    const sheetIdsOrdinary = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
    ok(JSON.stringify(sheetIdsOrdinary) === JSON.stringify(sheetIdsPkonly),
       "sheets: the sheet from the pkonly state is entry-for-entry the sheet from the ordinary state (pkonly ignored)");
  }
  d.window.close();

  /* ===== the Advanced tools action ===== */
  d = await boot("course=math-3208&teacher=1&unit=5&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && !document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with one unit selected shows Start prerequisite check");
  ev(d, `document.getElementById("pkCheckBtn").click()`);
  await sleep(300);
  ok(ev(d, "settings().pkOnly") === true && ev(d, "current.length") === Math.min(8, POOLS[5]) && ev(d, "current.every(function(q){return isPK(q._entry);})") === true,
     "action: clicking Start prerequisite check deals the Unit 5 check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the check dealt by the Advanced tools action also renders with no refpanel markup");
  d.window.close();

  d = await boot("course=math-3208&teacher=1&unit=5,6&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with two units selected hides the action (a check is per unit)");
  d.window.close();

  /* ===== group-keyed retry: the scripted Unit 5 check ===== */
  const sharedR = {};
  d = await boot("course=math-3208&unit=5&pkonly=1&seed=retry1&count=8", sharedR);
  answerAll(d, { group: "measurement" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry: a check with a missed group offers Practice what I missed");
  const sumText = d.window.document.getElementById("setSummary").textContent;
  ok(sumText.includes("Surface area and volume") && sumText.includes("needs more practice"),
     "summary: the missed group is named in plain language as needing practice, saw: " + sumText.replace(/\s+/g, " ").slice(0, 240));
  ok(sumText.includes("Similar figures") && sumText.includes("solid"),
     "summary: a mastered group is named and marked solid");
  ok(!sumText.includes("Indicators to practise more"),
     "summary: the check summary does not present host indicators as the thing to practise");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8, "retry: the retry set deals the check size of 8, saw " + ev(d, "current.length"));
  ok(ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='measurement';})") === true,
     "retry: every retry question comes from the missed group");
  ok(ev(d, "current.every(function(q){return ['u5-pk-sa-rect-prism','u5-pk-vol-cylinder'].includes(q._entry.id);})") === true,
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
  d = await boot("course=math-3208&unit=5&pkonly=1&seed=retry2&count=8", {});
  answerAll(d, null);
  ok(!d.window.document.getElementById("retryMissedBtn"), "retry: a fully correct check offers no retry button");
  ok(d.window.document.getElementById("setSummary").textContent.includes("Every skill in this check"),
     "summary: a fully correct check says so in skill language");
  d.window.close();

  /* a different missed group on a third seed retries that group */
  d = await boot("course=math-3208&unit=5&pkonly=1&seed=retry3&count=8", {});
  answerAll(d, { group: "similarity" });
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='similarity';})") === true,
     "retry: missing similarity on another seed deals only similarity questions (fresh instances of its entries)");
  d.window.close();

  /* ===== retry checking mode: an end-mode check retries as-you-go ===== */
  const sharedE = {};
  d = await boot("course=math-3208&unit=5&pkonly=1&chk=end&seed=rk1&count=8", sharedE);
  ok(ev(d, "checkMode") === "end", "retry mode: the check itself runs check-at-the-end");
  answerAllEnd(d, { group: "measurement" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode: the end-mode check with a missed group offers the retry");
  ok(d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode: the summary says the retry checks each question as you go");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "each", "retry mode: the retry set runs check-as-you-go, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='measurement';})") === true,
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
  d = await boot("course=math-3208&unit=5&pkonly=1&chk=end&rkeep=1&seed=rk2&count=8", {});
  ok(ev(d, "typeof RETRY_KEEP !== 'undefined' && RETRY_KEEP") === true, "retry mode (keep): rkeep=1 is read from the link");
  answerAllEnd(d, { group: "measurement" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (keep): the end-mode check with a missed group offers the retry");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (keep): the summary carries no switch note when the mode is kept");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "end", "retry mode (keep): the retry keeps check-at-the-end, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='measurement';})") === true,
     "retry mode (keep): the kept retry is still group-keyed (8 questions, missed group only)");
  ok(d.window.document.querySelectorAll("[data-ex]").length === 0,
     "retry mode (keep): the kept end-mode retry defers worked examples until grading (scaffold composition)");
  ev(d, "gradeAll()");
  ok(d.window.document.querySelectorAll("[data-ex]").length > 0,
     "retry mode (keep): grading the kept retry reveals its worked examples");
  d.window.close();

  /* an as-you-go check carries no switch note (nothing switches) */
  d = await boot("course=math-3208&unit=5&pkonly=1&seed=rk3&count=8", {});
  answerAll(d, { group: "measurement" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (as-you-go check): the retry is offered");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (as-you-go check): no switch note when the first set already checked as-you-go");
  d.window.close();

  /* ===== ordinary sets keep the indicator retry (regression) ===== */
  d = await boot("course=math-3208&unit=5&seed=ord1&count=8", {});
  const target = ev(d, "(function(){for(var i=0;i<current.length;i++){if(!isPK(current[i]._entry))return {idx:i,ind:current[i]._entry.indicators[0]};}return null;})()");
  ok(!!target, "regression: the ordinary Unit 5 set contains a non-PK question to miss deliberately");
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

  console.log("GATE-PKCHECK-MATH-3208: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-PKCHECK-MATH-3208 ERROR: " + (e && e.stack || e)); process.exit(1); });
