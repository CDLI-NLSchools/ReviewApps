#!/usr/bin/env node
/* Gate (jsdom) for the builder UI pass (Nov 20, 2026): prominent
   counts, test preset summary and steppers:
     NODE_PATH=$HOME/workspace/physics-2204-review/node_modules node tests/gate-builder-steppers.js
   - the Multiple choice and Constructed Response count controls
     and the Dual-form questions select sit under the scope
     selection (after the indicator box, before the "Print a sheet
     or exam" panel), and the print panel keeps only its
     print-only choices;
   - the counts behave as before: settings() and the settings URL
     carry them, a sheet composes to the counts set, and an exam
     still composes;
   - in student mode all four composition controls (the two
     counts and the two steppers) are removed by the teacher gate,
     as the counts were before the move;
   - selecting a mapped Chemistry 2202 test shows the preset
     summary, and its figures match the live plan (testPlanFor):
     selected response count, constructed response marks and the
     total, with a dealt constructed response item count;
   - steppers at zero compose exactly the blueprint paper;
   - steppers above zero extend the paper: the extra selected
     response items land in Section A, the extra written items in
     Section B at their CR marks, every extra entry comes from the
     test's own pools and is one the paper had not dealt, no entry
     sits in both sections, the printed total follows, and the
     saved set (and a student link opened fresh) carries the
     extended paper. (Within Section A the blueprint composer may
     itself deal one entry twice on a thin test pool, the standing
     instance behaviour; the extension never does, and the
     cross-section line is absolute.);
   - the French statics translate the moved and new labels, and a
     French mapped test shows its summary in French. */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function boot(qs) {
  return new Promise((resolve) => {
    const errors = [];
    const { VirtualConsole } = require("jsdom");
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

function waitBank(dom) {
  return new Promise((res) => {
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 6000) { clearInterval(iv); res(); }
    }, 50);
  });
}
/* Loader timing in jsdom (as in gate-bimodal-flip.js): a set link
   is rebuilt once the bank is in. */
function settleSet(dom) {
  return new Promise((res) => {
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 4000) {
        clearInterval(iv);
        try { dom.window.eval("(function(){var p=new URLSearchParams(location.search);if(p.get('set')&&!window.T)tRebuildFromURL();})()"); } catch (e) {}
        setTimeout(() => res(), 80);
      }
    }, 50);
  });
}

(async () => {
  /* ---------- counts: position and behaviour ---------- */
  let r = await boot("course=chem-2202&teacher=1");
  let d = r.dom.window.document;
  await waitBank(r.dom);
  const mc = d.getElementById("mcCountIn"), nc = d.getElementById("ncCountIn"), bm = d.getElementById("bmIn");
  ok(!!mc && !!nc && !!bm, "counts: the two count controls and the dual-form select render");
  const indBox = d.getElementById("indBox");
  const FOLLOWING = 4; // Node.DOCUMENT_POSITION_FOLLOWING
  ok(!!indBox && (indBox.compareDocumentPosition(mc) & FOLLOWING) !== 0, "counts: Multiple choice sits under the scope selection (after the indicator box)");
  const h3s = Array.prototype.slice.call(d.querySelectorAll("h3"));
  const printH3 = h3s.find(h => h.textContent.trim() === "Print a sheet or exam");
  ok(!!printH3, "counts: the print panel heading is present");
  if (printH3) {
    ok((mc.compareDocumentPosition(printH3) & FOLLOWING) !== 0, "counts: Multiple choice now sits before the print panel");
    ok((nc.compareDocumentPosition(printH3) & FOLLOWING) !== 0, "counts: Constructed Response now sits before the print panel");
    ok((bm.compareDocumentPosition(printH3) & FOLLOWING) !== 0, "counts: Dual-form questions moved with the counts");
    const key = d.getElementById("keyChk"), ws = d.getElementById("wsMcIn"), wsc = d.getElementById("wsCrIn"), code = d.getElementById("codeChk");
    ok(!!key && (printH3.compareDocumentPosition(key) & FOLLOWING) !== 0, "counts: answer key stays in the print panel");
    ok(!!code && (printH3.compareDocumentPosition(code) & FOLLOWING) !== 0, "counts: set code stays in the print panel");
    ok(!!ws && (printH3.compareDocumentPosition(ws) & FOLLOWING) !== 0, "counts: multiple choice working space stays in the print panel");
    ok(!!wsc && (printH3.compareDocumentPosition(wsc) & FOLLOWING) !== 0, "counts: constructed response working space stays in the print panel");
  }
  d.querySelector('.unitChk[value="1"]').click();
  mc.value = "7"; nc.value = "3";
  ok(ev(r.dom, "settings().mcCount") === 7 && ev(r.dom, "settings().ncCount") === 3, "counts: settings() reads the moved controls");
  const surl = ev(r.dom, "settingsToURL()");
  ok(surl.includes("mc=7") && surl.includes("nc=3"), "counts: the settings URL still carries the counts");
  let sheetOk = false;
  for (let k = 0; k < 5 && !sheetOk; k++) {
    d.getElementById("goSheet").click();
    sheetOk = ev(r.dom, "(function(){if(typeof sheetState==='undefined'||!sheetState||!sheetState.items)return false;var m=sheetState.items.filter(function(q){return q.type==='mc';}).length;return sheetState.items.length===10&&m===7;})()");
  }
  ok(sheetOk, "counts: a sheet composes to the counts set (7 multiple choice, 3 constructed response of 10)");
  d.getElementById("goExam").click();
  ok(ev(r.dom, "!!(typeof examState!=='undefined'&&examState&&examState.ex&&examState.ex.total>0)"), "counts: an exam still composes with the counts in their new home");
  r.dom.window.close();

  /* ---------- student mode: the teacher gate still applies ---------- */
  let rs0 = await boot("course=chem-2202");
  let ds0 = rs0.dom.window.document;
  ok(ds0.getElementById("mcCountIn") === null && ds0.getElementById("ncCountIn") === null, "student: count controls removed by the teacher gate");
  ok(ds0.getElementById("testXMcIn") === null && ds0.getElementById("testXCrIn") === null, "student: stepper controls removed by the teacher gate");
  ok(!!ds0.getElementById("testPlanNote"), "student: the preset summary element remains in the test row");
  rs0.dom.window.close();

  /* ---------- mapped test: preset summary and steppers ---------- */
  let rt = await boot("course=chem-2202&teacher=1");
  let dt = rt.dom.window.document;
  await waitBank(rt.dom);
  const pick = JSON.parse(ev(rt.dom, "(function(){var C=window.__COURSE;var units=Object.keys(C.testMap).sort(function(a,b){return a-b;});for(var ui=0;ui<units.length;ui++){var u=+units[ui],list=C.testMap[u];for(var ti=0;ti<list.length;ti++){var e=list[ti],plan=testPlanFor(C,u,e.test);if(!plan)continue;var pool=poolFor([u],e.inds,scopeCap([u])).filter(function(x){return !x.enrich&&!x.noCompose;});if(plan.topics)pool=pool.filter(function(x){return x.indicators.every(function(c){var t=plan.topics[c];return !t||x.topic===t;});});var srP=pool.filter(function(x){return probeType(x)==='mc';}).length;var crP=pool.filter(function(x){return typeof CR_MARKS!=='undefined'&&CR_MARKS[x.id]!==undefined&&CR_MARKS[x.id]>=2&&x.level>=2;}).length;if(srP>=plan.sr+3&&crP>=Math.ceil(plan.cr/2)+2)return JSON.stringify({unit:u,test:e.test,sr:plan.sr,cr:plan.cr});}}return 'null';})()"));
  ok(!!pick, "steppers: Chemistry 2202 has a mapped test with pools deep enough to extend");
  if (pick) {
    const us = dt.getElementById("testUnitSel"), ts = dt.getElementById("testNumSel");
    us.value = String(pick.unit); us.dispatchEvent(new rt.dom.window.Event("change"));
    ts.value = String(pick.test); ts.dispatchEvent(new rt.dom.window.Event("change"));
    ok(ev(rt.dom, "!!testSelActive(settings())"), "steppers: builder holds the mapped test selection");
    const note = dt.getElementById("testPlanNote").textContent;
    const m = note.match(/Test plan: (\d+) selected response, (\d+) constructed response \((\d+) marks\), (\d+) marks in total\./);
    ok(!!m, "summary: preset summary shows dealt counts (saw: " + note + ")");
    if (m) {
      ok(+m[1] === pick.sr, "summary: selected response count matches the plan (" + m[1] + " vs " + pick.sr + ")");
      ok(+m[2] >= 1, "summary: a dealt constructed response item count is shown (" + m[2] + ")");
      ok(+m[3] === pick.cr, "summary: constructed response marks match the plan (" + m[3] + " vs " + pick.cr + ")");
      ok(+m[4] === pick.sr + pick.cr, "summary: total matches the plan (" + m[4] + " vs " + (pick.sr + pick.cr) + ")");
    }
    ok(ev(rt.dom, "settings().testXMc") === 0 && ev(rt.dom, "settings().testXCr") === 0, "steppers: both steppers start at zero");
    let baseOk = false;
    for (let k = 0; k < 5 && !baseOk; k++) {
      dt.getElementById("goExam").click();
      baseOk = ev(rt.dom, "(function(){if(!examState||!examState.ex)return false;var lv=examLive(examState.ex);return !examState.ex.short&&lv.sr===" + pick.sr + "&&lv.cr===" + pick.cr + "&&lv.total===" + (pick.sr + pick.cr) + ";})()");
    }
    ok(baseOk, "steppers at zero: the paper is exactly the blueprint paper (" + pick.sr + " SR, " + pick.cr + " CR marks)");
    const xmIn = dt.getElementById("testXMcIn"), xcIn = dt.getElementById("testXCrIn");
    xmIn.value = "3"; xmIn.dispatchEvent(new rt.dom.window.Event("change"));
    xcIn.value = "2"; xcIn.dispatchEvent(new rt.dom.window.Event("change"));
    ok(ev(rt.dom, "settings().testXMc") === 3 && ev(rt.dom, "settings().testXCr") === 2, "steppers: settings() reads the steppers");
    ok(dt.getElementById("testPlanNote").textContent.includes("Plus your additions: 3 more multiple choice, 2 more written."), "steppers: the summary notes the additions (saw: " + dt.getElementById("testPlanNote").textContent + ")");
    /* The extension itself, driven directly on the blueprint
       paper still on screen: every extra it deals must be an
       entry the paper had not dealt, in the right section and
       count. */
    const direct = JSON.parse(ev(rt.dom, "(function(){var ex=examState&&examState.ex;if(!ex)return JSON.stringify({err:'no paper'});var act=testSelActive(settings());if(!act)return JSON.stringify({err:'no test'});var plan=testPlanFor(window.__COURSE,act.unit,act.test);var baseIds={};ex.srItems.concat(ex.crItems).forEach(function(it){baseIds[it.q._entry.id]=1;});var bSr=ex.srItems.length,bCr=ex.crItems.length;extendTestPaper(ex,settings(),plan);var nSr=ex.srItems.filter(function(it){return !baseIds[it.q._entry.id];}).length;var nCr=ex.crItems.filter(function(it){return !baseIds[it.q._entry.id];}).length;return JSON.stringify({srDelta:ex.srItems.length-bSr,crDelta:ex.crItems.length-bCr,newSr:nSr,newCr:nCr,short:!!ex.short});})()"));
    ok(direct.srDelta === 3 && direct.newSr === 3, "steppers: the extension deals three selected response extras, all from entries the paper had not dealt (" + JSON.stringify(direct) + ")");
    ok(direct.crDelta === 2 && direct.newCr === 2, "steppers: the extension deals two written extras, all from entries the paper had not dealt");
    ok(direct.short === false, "steppers: the extension fills both steppers in full on this test");
    let extOk = false;
    for (let k = 0; k < 5 && !extOk; k++) {
      dt.getElementById("goExam").click();
      extOk = ev(rt.dom, "(function(){if(!examState||!examState.ex)return false;return !examState.ex.short&&examState.ex.srItems.length===" + (pick.sr + 3) + ";})()");
    }
    ok(extOk, "steppers: the extended paper deals three extra selected response items and is not short");
    const lv = JSON.parse(ev(rt.dom, "JSON.stringify(examLive(examState.ex))"));
    ok(lv.sr === pick.sr + 3, "steppers: Section A total is the blueprint plus three (" + lv.sr + ")");
    ok(lv.cr >= pick.cr + 4, "steppers: Section B gains at least two written items worth of marks (" + pick.cr + " to " + lv.cr + ")");
    ok(lv.total === lv.sr + lv.cr, "steppers: paper total follows the sections");
    ok(ev(rt.dom, "examState.ex.crItems.length") >= 3, "steppers: Section B holds the blueprint items plus the two extras");
    ok(ev(rt.dom, "(function(){var inSr={};examState.ex.srItems.forEach(function(it){inSr[it.q._entry.id]=1;});return examState.ex.crItems.every(function(it){return !inSr[it.q._entry.id];});})()"), "steppers: no entry sits in both sections");
    ok(ev(rt.dom, "(function(){var act=testSelActive(settings());if(!act)return false;var inds=act.inds;return examState.ex.srItems.concat(examState.ex.crItems).every(function(it){var e=it.q._entry;return e.unit===" + pick.unit + "&&e.indicators.some(function(c){return inds.indexOf(c)>=0;});});})()"), "steppers: every question on the extended paper comes from the test's own unit and indicators");
    ok(dt.getElementById("printArea").innerHTML.includes("Total marks: " + lv.total), "steppers: the printed paper shows the extended total");
    const sv = ev(rt.dom, "tSetValue()");
    const segs = sv.split(":").slice(2).join(":").split(";");
    const cnt = s => (s ? s.split(",").filter(x => x).length : 0);
    ok(cnt(segs[0]) === lv.sr, "steppers: the saved set records every selected response question (" + cnt(segs[0]) + " vs " + lv.sr + ")");
    ok(cnt(segs[1]) === ev(rt.dom, "examState.ex.crItems.length"), "steppers: the saved set records every constructed response question");
    const link = ev(rt.dom, "tShareURL(false)");
    ok(link.includes("set="), "steppers: student link carries the set");
    let rs = await boot(link.split("?")[1]);
    await settleSet(rs.dom);
    ok(ev(rs.dom, "!!(typeof examState!=='undefined'&&examState)"), "steppers: student link rebuilds the exam");
    const sLv = JSON.parse(ev(rs.dom, "(function(){return examState?JSON.stringify(examLive(examState.ex)):'null';})()"));
    ok(sLv && sLv.sr === lv.sr && sLv.cr === lv.cr && sLv.total === lv.total, "steppers: the student paper is the extended paper, totals matching");
    rs.dom.window.close();
  }
  rt.dom.window.close();

  /* ---------- French statics and summary ---------- */
  let rf = await boot("course=sci-7-fr&teacher=1");
  let df = rf.dom.window.document;
  await waitBank(rf.dom);
  const labOf = id => { const el = df.getElementById(id); const lab = el && el.closest ? el.closest("label") : null; return lab ? lab.textContent : ""; };
  ok(labOf("mcCountIn").includes("Choix multiple"), "french: the moved count label translates (saw: " + labOf("mcCountIn").trim() + ")");
  ok(labOf("testXMcIn").includes("Plus de choix multiples"), "french: the multiple choice stepper label translates (saw: " + labOf("testXMcIn").trim() + ")");
  ok(labOf("testXCrIn").includes("Plus de réponses écrites"), "french: the written stepper label translates (saw: " + labOf("testXCrIn").trim() + ")");
  const tmF = JSON.parse(ev(rf.dom, "(function(){var C=window.__COURSE;if(!C.testMap)return 'null';var u=+Object.keys(C.testMap).sort(function(a,b){return a-b;})[0];return JSON.stringify({unit:u,test:C.testMap[u][0].test});})()"));
  ok(!!tmF, "french: Sciences 7 carries a mapped test");
  if (tmF) {
    const usF = df.getElementById("testUnitSel"), tsF = df.getElementById("testNumSel");
    usF.value = String(tmF.unit); usF.dispatchEvent(new rf.dom.window.Event("change"));
    tsF.value = String(tmF.test); tsF.dispatchEvent(new rf.dom.window.Event("change"));
    ok(df.getElementById("testPlanNote").textContent.includes("Plan du test"), "french: the preset summary shows in French (saw: " + df.getElementById("testPlanNote").textContent + ")");
  }
  rf.dom.window.close();

  console.log("GATE-BUILDER-STEPPERS: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
