#!/usr/bin/env node
/* Prerequisite check gate (Nov 15, 2026, the Math 2200 PK tranche,
   spec Sections 7 and 8): the pkonly draw deals only prior
   knowledge entries for the unit, stratified by pkGroup with at
   most one Level 3 question; pkonly overrides pkin=0 and any
   indicator selection; a seeded pkonly link redraws the identical
   set; the set saves and resumes like any practice set, and an
   ordinary set for the same unit does not resurrect it; sheets
   and exams ignore pkonly entirely. A pkonly check render carries
   no Formulas and facts reference panel (Units 1, 3 and 9 carry
   panels in this course; the same unit's ordinary render keeps
   its panel, and a resumed check stays panel-free). The retry on
   a check is group-keyed: the summary names the sampled skill
   groups in plain language (solid, or needs more practice), and
   Practice what I missed deals a fresh set at the check size from
   the missed groups only. A retry launched from a check-at-the-
   end set runs check-as-you-go by default; rkeep=1 keeps the
   first set's mode. Ordinary sets keep the indicator-keyed retry.
   Composition side: this course sets pkPracticeOnly (Nov 15,
   2026), so a composed paper contains no prior knowledge entry
   even with the pkonly flag fraudulently set.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-pkcheck-math-2200.js */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- Part 1: the draw, in a vm sandbox ---------------- */
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
function extractFn(src, name) {
  const i = src.indexOf("function " + name + "(");
  if (i < 0) throw new Error("missing function " + name);
  let d = 0, j = src.indexOf("{", i);
  for (; j < src.length; j++) { if (src[j] === "{") d++; else if (src[j] === "}") { d--; if (!d) return src.slice(i, j + 1); } }
  throw new Error("unbalanced " + name);
}
const sb = { console };
sb.window = {};
vm.createContext(sb);
vm.runInContext(fs.readFileSync(ROOT + "/courses.js", "utf8"), sb);
sb.window.__COURSE = sb.window.COURSES["math-2200"];
vm.runInContext(helperBlock.replace(/"use strict";/g, ""), sb);
vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen}; if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";} BANK.push(e);}', sb);
vm.runInContext(fs.readFileSync(ROOT + "/banks/math-2200.js", "utf8"), sb);
vm.runInContext('var CR_MARKS=window.__BANK_CRMARKS||{}; var _probeCache={};', sb);
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "pkGroupOf", "drawSet", "drawSheetSet", "composeExam"])
  vm.runInContext(extractFn(html, n), sb);
const run = (c) => vm.runInContext(c, sb);
run('var __PK=true; function pkIncluded(){return __PK;} function enrichIncluded(){return false;}');
run('var PKONLY_DRAW=false;');
run('function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}');

const POOL_SIZES = { 1: 10, 2: 8, 3: 8, 4: 9, 5: 8, 6: 8, 7: 8, 8: 8, 9: 8 };
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
for (let u = 1; u <= 9; u++) {
  for (const seed of [11, 99, 424242, 7, 2026]) {
    const r = checkDraw(u, [], seed);
    ok(r.pool === POOL_SIZES[u], "unit " + u + " seed " + seed + ": pkonly pool is " + POOL_SIZES[u] + ", saw " + r.pool);
    ok(r.allPk, "unit " + u + " seed " + seed + ": every dealt question is a prior knowledge entry");
    ok(r.n === Math.min(8, r.pool), "unit " + u + " seed " + seed + ": deals min(8, pool) questions, saw " + r.n);
    ok(new Set(r.ids).size === r.ids.length, "unit " + u + " seed " + seed + ": no entry repeats");
    ok(JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(u)), "unit " + u + " seed " + seed + ": every pkGroup is sampled");
    ok(r.l3 <= 1, "unit " + u + " seed " + seed + ": at most one Level 3 question, saw " + r.l3);
    const dup = new Set(r.canon).size !== r.canon.length;
    ok(r.thin === (dup || r.n < Math.min(8, r.pool)), "unit " + u + " seed " + seed + ": thin reports exactly the genuine duplicate/shortfall state");
  }
}
/* pkonly overrides the practice PK switch */
run("__PK=false;");
{
  const r = checkDraw(3, [], 99);
  ok(r.allPk && r.n === 8 && r.pool === 8, "precedence: with pkin=0 the Unit 3 check still deals its 8 prior knowledge questions");
}
run("__PK=true;");
/* pkonly bypasses indicator filtering carried on a link */
{
  const r = checkDraw(3, ["3.14"], 99);
  ok(r.allPk && r.n === 8 && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(3)),
     "precedence: a pkonly draw carrying indicator parameters still deals the full stratified Unit 3 check");
}
/* a seeded pkonly link redraws the identical set */
{
  const a = checkDraw(5, [], 424242), b = checkDraw(5, [], 424242);
  ok(JSON.stringify(a.ids) === JSON.stringify(b.ids) && JSON.stringify(a.canon) === JSON.stringify(b.canon),
     "seeded identity: the same seed redraws the identical Unit 5 check");
}
/* group-keyed retry draws: PKONLY_GROUPS narrows the pkonly
   branch to the missed groups of a completed check. Entries
   repeat as fresh instances when a group is thin, mastered
   groups contribute nothing, and the Level 3 discipline is the
   check's. */
run('var PKONLY_GROUPS=null;');
function retryDraw(unit, groups, seed, n) {
  run("__reseed(" + seed + ");");
  return run("(function(){PKONLY_GROUPS=" + JSON.stringify(groups) + ";var r=drawSet([" + unit + "],[]," + (n || 8) + ",[20,60,20],'unit',false);PKONLY_GROUPS=null;"
    + "return {n:r.items.length,pool:r.pool,thin:r.thin,reused:r.reused,"
    + "ids:r.items.map(function(q){return q._entry.id;}),"
    + "groups:r.items.map(function(q){return pkGroupOf(q._entry);}),"
    + "l3:r.items.filter(function(q){return q._entry.level>=3;}).length,"
    + "distinct:new Set(r.items.map(function(q){return q._entry.id;})).size};})()");
}
for (const seed of [11, 99, 424242, 7, 2026]) {
  const r = retryDraw(3, ["polynomial-multiply"], seed);
  ok(r.n === 8 && r.pool === 1, "retry u3 seed " + seed + ": one missed group deals the full retry size of 8 from its single entry, saw n=" + r.n + " pool=" + r.pool);
  ok(r.groups.every((g) => g === "polynomial-multiply") && r.ids.every((id) => id === "u3-pk-monomial-expand"),
     "retry u3 seed " + seed + ": every retry question is from the missed group only");
  ok(r.l3 === 0, "retry u3 seed " + seed + ": no Level 3 question in the polynomial retry");
}
{
  const r = retryDraw(3, ["polynomial-multiply", "common-factor"], 99);
  const c = {}; r.groups.forEach((g) => { c[g] = (c[g] || 0) + 1; });
  ok(r.n === 8 && c["polynomial-multiply"] === 4 && c["common-factor"] === 4,
     "retry u3: two missed groups split the retry round-robin (4 and 4), saw " + JSON.stringify(c));
}
{
  const r = retryDraw(3, ["factoring", "graph-forms", "isolate-variable", "common-factor", "square-roots"], 424242);
  ok(r.n === 8 && !r.groups.includes("polynomial-multiply"),
     "retry u3: a mastered group contributes nothing even when every other group is missed");
  ok(r.groups.every((g) => ["factoring", "graph-forms", "isolate-variable", "common-factor", "square-roots"].includes(g)),
     "retry u3: the five-group retry draws only from those groups");
}
{
  const r = retryDraw(1, ["trig-ratios"], 7);
  ok(r.n === 8 && r.distinct === 4 && r.reused === 4 && r.groups.every((g) => g === "trig-ratios"),
     "retry u1: the four trig-ratios entries repeat as fresh instances to fill 8 (reused 4), saw distinct=" + r.distinct + " reused=" + r.reused);
}
{
  /* Unit 5's fraction-operations group holds the tranche's only
     Level 3 entry alongside Level 1 and 2 entries. In a retry the
     round-robin prefers the group's Level 1-2 entries and repeats
     them; the Level 3 entry is not needed and does not deal. In
     the check itself it deals exactly once (the Part 1 cap). */
  for (const seed of [11, 99, 424242]) {
    const r = retryDraw(5, ["fraction-operations"], seed);
    ok(r.n === 8 && r.l3 === 0 && r.distinct === 2 && r.groups.every((g) => g === "fraction-operations"),
       "retry u5 seed " + seed + ": the fraction retry fills 8 from the group's two Level 1-2 entries, saw n=" + r.n + " l3=" + r.l3 + " distinct=" + r.distinct);
  }
  const m = retryDraw(5, ["fraction-operations", "common-factor"], 99);
  const c = {}; m.groups.forEach((g) => { c[g] = (c[g] || 0) + 1; });
  ok(m.n === 8 && m.l3 === 0 && c["fraction-operations"] === 4 && c["common-factor"] === 4,
     "retry u5: fraction-operations alongside common-factor splits 4 and 4 with no Level 3, saw " + JSON.stringify(c));
}
{
  /* Unit 8's pre-flagged trio carries tranche metadata: the
     inequality-solving retry pool is the two new entries plus
     the trio's two solving entries. */
  const r = retryDraw(8, ["inequality-solving"], 99);
  ok(r.n === 8 && r.pool === 4 && r.distinct === 4 && r.groups.every((g) => g === "inequality-solving"),
     "retry u8: the inequality-solving pool is 4 (two tranche entries plus the two pre-flagged solving entries), saw pool=" + r.pool + " distinct=" + r.distinct);
  ok(r.ids.includes("u8-solve-linear-basic") && r.ids.includes("u8-solve-linear-flip"),
     "retry u8: the pre-flagged entries deal in the group retry under their tranche group");
}
{
  const r = retryDraw(3, null, 99);
  ok(r.n === 8 && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(3)),
     "retry: with no group restriction the pkonly draw is the ordinary full check");
}
/* sheets and exams ignore pkonly, even with the flag set: sheet
   draws always pass a predicate and the pkonly branch answers
   only predicate-free draws, so a sheet drawn under a set flag
   is entry-for-entry the sheet drawn without it. The probe cache
   is warmed before measuring, the gate-enrichment discipline. */
{
  const sheetIds = (flag) => run("(function(){PKONLY_DRAW=" + flag + ";__reseed(99);"
    + "var s={units:[3],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};"
    + "var r=drawSheetSet(s);return r.items.map(function(q){return q._entry.id;});})()");
  run("(function(){var s={units:[3],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};drawSheetSet(s);})()");
  const withFlag = sheetIds(true), withoutFlag = sheetIds(false);
  ok(withFlag.length > 0 && JSON.stringify(withFlag) === JSON.stringify(withoutFlag),
     "sheets: drawSheetSet under a set PKONLY_DRAW flag is identical to the ordinary sheet draw");
  const paper = run("(function(){PKONLY_DRAW=true;var p=composeExam([3],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
  ok(paper === 0, "exams: composeExam under a set PKONLY_DRAW flag contains no prior knowledge entry (pkPracticeOnly)");
}
run("PKONLY_DRAW=false;");

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
  let d = await boot("course=math-2200&unit=3&pkonly=1&seed=pkc1&count=8", shared);
  ok(ev(d, "current ? current.length : 0") === 8, "link: the Unit 3 pkonly link deals 8 questions");
  ok(ev(d, "current.every(function(q){return isPK(q._entry);})") === true, "link: every question on the pkonly set is a prior knowledge entry");
  ok(ev(d, "settings().pkOnly") === true, "link: settings carry pkOnly from the pkonly=1 parameter");
  ok(ev(d, "settingsToURL()").includes("pkonly=1"), "link: the set's own link keeps pkonly=1");
  ok(ev(d, "document.getElementById('poolInfo').textContent") === "Prerequisite check pool for Unit 3: 8 questions",
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
    const pp = ev(d, "(function(){var p=composeExam([3],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
    ok(pp === 0, "exams: a paper composed while pkonly is set contains no prior knowledge entry");
  }

  /* ===== answer, save, reload: the check resumes ===== */
  answerFirst(d);
  await sleep(900);
  ok(!!resumeKey(shared), "resume: progress on the check is saved like any practice set");
  d.window.close();

  d = await boot("course=math-2200&unit=3&pkonly=1&seed=pkc1&count=8", shared);
  ok(!!d.window.document.getElementById("resumeBar"), "resume: reopening the pkonly link offers Resume");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "resume: the checked state is restored on the check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the resumed check also renders with no refpanel markup");
  ok(!d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the resumed check also renders with no Formulas and facts panel");
  d.window.close();

  /* ===== the ordinary link for the same unit does not resurrect it ===== */
  d = await boot("course=math-2200&unit=3&seed=pkc1&count=8", shared);
  ok(!d.window.document.getElementById("resumeBar"), "signature: the ordinary Unit 3 set gets no offer from the check's save");
  ok(ev(d, "current.some(function(q){return !isPK(q._entry);})") === true, "signature: the ordinary set is an ordinary set");
  ok(d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the ordinary Unit 3 render does contain the refpanel markup");
  ok(d.window.document.getElementById("session").innerHTML.includes("Formulas and facts"),
     "panel: the ordinary Unit 3 render shows its Formulas and facts panel");
  {
    const sheetIdsOrdinary = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
    ok(JSON.stringify(sheetIdsOrdinary) === JSON.stringify(sheetIdsPkonly),
       "sheets: the sheet from the pkonly state is entry-for-entry the sheet from the ordinary state (pkonly ignored)");
  }
  d.window.close();

  /* ===== the Advanced tools action ===== */
  d = await boot("course=math-2200&teacher=1&unit=3&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && !document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with one unit selected shows Start prerequisite check");
  ev(d, `document.getElementById("pkCheckBtn").click()`);
  await sleep(300);
  ok(ev(d, "settings().pkOnly") === true && ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return isPK(q._entry);})") === true,
     "action: clicking Start prerequisite check deals the Unit 3 check");
  ok(!d.window.document.getElementById("session").innerHTML.includes("refpanel"),
     "panel: the check dealt by the Advanced tools action also renders with no refpanel markup");
  d.window.close();

  d = await boot("course=math-2200&teacher=1&unit=3,5&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with two units selected hides the action (a check is per unit)");
  d.window.close();

  /* ===== group-keyed retry: the scripted Unit 3 check ===== */
  const sharedR = {};
  d = await boot("course=math-2200&unit=3&pkonly=1&seed=retry1&count=8", sharedR);
  answerAll(d, { group: "polynomial-multiply" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry: a check with a missed group offers Practice what I missed");
  const sumText = d.window.document.getElementById("setSummary").textContent;
  ok(sumText.includes("Multiplying polynomials") && sumText.includes("needs more practice"),
     "summary: the missed group is named in plain language as needing practice, saw: " + sumText.replace(/\s+/g, " ").slice(0, 240));
  ok(sumText.includes("Finding common factors") && sumText.includes("solid"),
     "summary: a mastered group is named and marked solid");
  ok(sumText.includes("Factoring polynomials"),
     "summary: the factoring group is named by its tranche label");
  ok(!sumText.includes("Indicators to practise more"),
     "summary: the check summary does not present host indicators as the thing to practise");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8, "retry: the retry set deals the check size of 8, saw " + ev(d, "current.length"));
  ok(ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='polynomial-multiply';})") === true,
     "retry: every retry question comes from the missed group");
  ok(ev(d, "current.every(function(q){return q._entry.id==='u3-pk-monomial-expand';})") === true,
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
  d = await boot("course=math-2200&unit=3&pkonly=1&seed=retry2&count=8", {});
  answerAll(d, null);
  ok(!d.window.document.getElementById("retryMissedBtn"), "retry: a fully correct check offers no retry button");
  ok(d.window.document.getElementById("setSummary").textContent.includes("Every skill in this check"),
     "summary: a fully correct check says so in skill language");
  d.window.close();

  /* a different missed group on a third seed retries that group */
  d = await boot("course=math-2200&unit=3&pkonly=1&seed=retry3&count=8", {});
  answerAll(d, { group: "factoring" });
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return q._entry.id==='u3-pk-factor-monic'||q._entry.id==='u3-pk-diff-squares';})") === true,
     "retry: missing factoring on another seed deals only factoring questions (fresh instances of its two entries)");
  d.window.close();

  /* ===== retry checking mode: an end-mode check retries as-you-go ===== */
  const sharedE = {};
  d = await boot("course=math-2200&unit=3&pkonly=1&chk=end&seed=rk1&count=8", sharedE);
  ok(ev(d, "checkMode") === "end", "retry mode: the check itself runs check-at-the-end");
  answerAllEnd(d, { group: "polynomial-multiply" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode: the end-mode check with a missed group offers the retry");
  ok(d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode: the summary says the retry checks each question as you go");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "each", "retry mode: the retry set runs check-as-you-go, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return pkGroupOf(q._entry)==='polynomial-multiply';})") === true,
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
  d = await boot("course=math-2200&unit=3&pkonly=1&chk=end&rkeep=1&seed=rk2&count=8", {});
  ok(ev(d, "typeof RETRY_KEEP !== 'undefined' && RETRY_KEEP") === true, "retry mode (keep): rkeep=1 is read from the link");
  answerAllEnd(d, { group: "polynomial-multiply" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (keep): the end-mode check with a missed group offers the retry");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (keep): the summary carries no switch note when the mode is kept");
  ev(d, `document.getElementById("retryMissedBtn").click()`);
  await sleep(300);
  ok(ev(d, "checkMode") === "end", "retry mode (keep): the retry keeps check-at-the-end, saw " + ev(d, "checkMode"));
  ok(ev(d, "current.length") === 8 && ev(d, "current.every(function(q){return q._entry.id==='u3-pk-monomial-expand';})") === true,
     "retry mode (keep): the kept retry is still group-keyed (8 questions, missed group only)");
  ok(d.window.document.querySelectorAll("[data-ex]").length === 0,
     "retry mode (keep): the kept end-mode retry defers worked examples until grading (scaffold composition)");
  ev(d, "gradeAll()");
  ok(d.window.document.querySelectorAll("[data-ex]").length > 0,
     "retry mode (keep): grading the kept retry reveals its worked examples");
  d.window.close();

  /* an as-you-go check carries no switch note (nothing switches) */
  d = await boot("course=math-2200&unit=3&pkonly=1&seed=rk3&count=8", {});
  answerAll(d, { group: "polynomial-multiply" });
  ok(!!d.window.document.getElementById("retryMissedBtn"), "retry mode (as-you-go check): the retry is offered");
  ok(!d.window.document.getElementById("setSummary").textContent.includes("checks each question as you go"),
     "retry mode (as-you-go check): no switch note when the first set already checked as-you-go");
  d.window.close();

  /* ===== ordinary sets keep the indicator retry (regression) ===== */
  d = await boot("course=math-2200&unit=3&seed=ord1&count=8", {});
  const target = ev(d, "(function(){for(var i=0;i<current.length;i++){if(!isPK(current[i]._entry))return {idx:i,ind:current[i]._entry.indicators[0]};}return null;})()");
  ok(!!target, "regression: the ordinary Unit 3 set contains a non-PK question to miss deliberately");
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

  console.log("GATE-PKCHECK-MATH-2200: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-PKCHECK-MATH-2200 ERROR: " + (e && e.stack || e)); process.exit(1); });
