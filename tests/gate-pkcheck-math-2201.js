#!/usr/bin/env node
/* Prerequisite check gate (Nov 15, 2026, the Math 2201 PK tranche,
   spec Section 7): the pkonly draw deals only prior knowledge
   entries for the unit, stratified by pkGroup with at most one
   Level 3 question; pkonly overrides pkin=0 and any indicator
   selection; a seeded pkonly link redraws the identical set; the
   set saves and resumes like any practice set, and an ordinary
   set for the same unit does not resurrect it; sheets and exams
   ignore pkonly entirely.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-pkcheck-math-2201.js */
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
sb.window.__COURSE = sb.window.COURSES["math-2201"];
vm.runInContext(helperBlock.replace(/"use strict";/g, ""), sb);
vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen}; if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";} BANK.push(e);}', sb);
vm.runInContext(fs.readFileSync(ROOT + "/banks/math-2201.js", "utf8"), sb);
vm.runInContext('var CR_MARKS=window.__BANK_CRMARKS||{}; var _probeCache={};', sb);
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "isPK", "pkGroupOf", "drawSet", "drawSheetSet", "composeExam"])
  vm.runInContext(extractFn(html, n), sb);
const run = (c) => vm.runInContext(c, sb);
run('var __PK=true; function pkIncluded(){return __PK;} function enrichIncluded(){return false;}');
run('var PKONLY_DRAW=false;');
run('function __reseed(n){var s=n>>>0; Math.random=function(){s|=0;s=(s+0x6D2B79F5)|0;var t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}');

const POOL_SIZES = { 1: 8, 2: 8, 3: 7, 4: 8, 5: 9, 6: 8, 7: 9, 8: 9 };
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
  ok(r.allPk && r.n === 7 && r.pool === 7, "precedence: with pkin=0 the Unit 3 check still deals its 7 prior knowledge questions");
}
run("__PK=true;");
/* pkonly bypasses indicator filtering carried on a link */
{
  const r = checkDraw(3, ["4.3"], 99);
  ok(r.allPk && r.n === 7 && JSON.stringify([...new Set(r.groups)].sort()) === JSON.stringify(poolGroups(3)),
     "precedence: a pkonly draw carrying indicator parameters still deals the full stratified Unit 3 check");
}
/* a seeded pkonly link redraws the identical set */
{
  const a = checkDraw(5, [], 424242), b = checkDraw(5, [], 424242);
  ok(JSON.stringify(a.ids) === JSON.stringify(b.ids) && JSON.stringify(a.canon) === JSON.stringify(b.canon),
     "seeded identity: the same seed redraws the identical Unit 5 check");
}
/* sheets and exams ignore pkonly, even with the flag fraudulently
   set: sheet draws always pass a predicate and the pkonly branch
   answers only predicate-free draws, so a sheet drawn under a set
   flag is entry-for-entry the sheet drawn without it (prior
   knowledge entries appear in either only as ordinary pool
   members). The probe cache is warmed before measuring, the
   gate-enrichment discipline, so the seeded streams align. */
{
  const sheetIds = (flag) => run("(function(){PKONLY_DRAW=" + flag + ";__reseed(99);"
    + "var s={units:[3],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};"
    + "var r=drawSheetSet(s);return r.items.map(function(q){return q._entry.id;});})()");
  run("(function(){var s={units:[3],inds:[],mcCount:5,ncCount:5,mix:[20,60,20],order:'unit',midCap:false,finalCap:false};drawSheetSet(s);})()");
  const withFlag = sheetIds(true), withoutFlag = sheetIds(false);
  ok(withFlag.length > 0 && JSON.stringify(withFlag) === JSON.stringify(withoutFlag),
     "sheets: drawSheetSet under a set PKONLY_DRAW flag is identical to the ordinary sheet draw");
  const paper = run("(function(){PKONLY_DRAW=true;var p=composeExam([3],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
  ok(paper === 0, "exams: composeExam under a set PKONLY_DRAW flag contains no prior knowledge entry");
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
          /* The app's own boot tail, re-run once the bank is in:
             in jsdom the document-written bank script can land
             after the main script's first pass, which leaves the
             pool line and the teacher action stale. A real browser
             runs this sequence with the bank already in place. */
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

(async () => {
  /* ===== a student pkonly link deals the check ===== */
  const shared = {};
  let d = await boot("course=math-2201&unit=3&pkonly=1&seed=pkc1&count=8", shared);
  ok(ev(d, "current ? current.length : 0") === 7, "link: the Unit 3 pkonly link deals 7 questions");
  ok(ev(d, "current.every(function(q){return isPK(q._entry);})") === true, "link: every question on the pkonly set is a prior knowledge entry");
  ok(ev(d, "settings().pkOnly") === true, "link: settings carry pkOnly from the pkonly=1 parameter");
  ok(ev(d, "settingsToURL()").includes("pkonly=1"), "link: the set's own link keeps pkonly=1");
  ok(ev(d, "document.getElementById('poolInfo').textContent") === "Prerequisite check pool for Unit 3: 7 questions",
     "link: the pool line reads as a prerequisite check pool, saw: " + ev(d, "document.getElementById('poolInfo').textContent"));
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: a student opening a pkonly link does not see the Advanced tools action");

  /* sheets and exams ignore pkonly: the sheet drawn from this
     pkonly state is the ordinary sheet for the scope (prior
     knowledge entries appear in it only as ordinary pool members,
     exactly as they do without pkonly), and a composed paper
     fences PK out by its own rule, as always. The identity half
     of this check runs against the ordinary boot below. */
  const sheetIdsPkonly = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
  ok(sheetIdsPkonly.length > 0 && sheetIdsPkonly.some((id) => !id.includes("-pk-") && !["u3-factor-difference", "u3-factor-monic", "u3-factor-nonmonic"].includes(id)),
     "sheets: a sheet drawn while pkonly is set is an ordinary sheet, not a check");
  {
    const pp = ev(d, "(function(){var p=composeExam([3],[],undefined);return p.srItems.concat(p.crItems).filter(function(it){return isPK(it.q._entry);}).length;})()");
    ok(pp === 0, "exams: a paper composed while pkonly is set contains no prior knowledge entry");
  }

  /* ===== answer, save, reload: the check resumes ===== */
  ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var r=document.querySelector('input[name="opt0"][value="'+q.correct+'"]');r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
    else{var inp=document.getElementById("ans0");inp.value=(q.type==="num"?String(q.answer):q.answers[0]);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
  })()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  await sleep(900);
  ok(!!resumeKey(shared), "resume: progress on the check is saved like any practice set");
  d.window.close();

  d = await boot("course=math-2201&unit=3&pkonly=1&seed=pkc1&count=8", shared);
  ok(!!d.window.document.getElementById("resumeBar"), "resume: reopening the pkonly link offers Resume");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "resume: the checked state is restored on the check");
  d.window.close();

  /* ===== the ordinary link for the same unit does not resurrect it ===== */
  d = await boot("course=math-2201&unit=3&seed=pkc1&count=8", shared);
  ok(!d.window.document.getElementById("resumeBar"), "signature: the ordinary Unit 3 set gets no offer from the check's save");
  ok(ev(d, "current.some(function(q){return !isPK(q._entry);})") === true, "signature: the ordinary set is an ordinary set");
  {
    const sheetIdsOrdinary = ev(d, "(function(){var s=settings();var r=withSeed(activeSeed(s),function(){return drawSheetSet(s);});return r.items.map(function(q){return q._entry.id;});})()");
    ok(JSON.stringify(sheetIdsOrdinary) === JSON.stringify(sheetIdsPkonly),
       "sheets: the sheet from the pkonly state is entry-for-entry the sheet from the ordinary state (pkonly ignored)");
  }
  d.window.close();

  /* ===== the Advanced tools action ===== */
  d = await boot("course=math-2201&teacher=1&unit=3&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && !document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with one unit selected shows Start prerequisite check");
  ev(d, `document.getElementById("pkCheckBtn").click()`);
  await sleep(300);
  ok(ev(d, "settings().pkOnly") === true && ev(d, "current.length") === 7 && ev(d, "current.every(function(q){return isPK(q._entry);})") === true,
     "action: clicking Start prerequisite check deals the Unit 3 check");
  d.window.close();

  d = await boot("course=math-2201&teacher=1&unit=3,5&count=8", {});
  ok(ev(d, "!!document.getElementById('pkCheckBtn') && document.getElementById('pkCheckBtn').hidden") === true,
     "visibility: teacher mode with two units selected hides the action (a check is per unit)");
  d.window.close();

  console.log("GATE-PKCHECK-MATH-2201: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-PKCHECK-MATH-2201 ERROR: " + (e && e.stack || e)); process.exit(1); });
