#!/usr/bin/env node
/* Gate (jsdom) for the builder UI pass (Nov 20, 2026): prominent
   counts, test preset summary and steppers:
     NODE_PATH=$HOME/workspace/physics-2204-review/node_modules node tests/gate-builder-steppers.js
   - the builder is mode-first (restructure of Nov 20, 2026,
     Spec-Builder-Restructure-2026-11-20.md): Practice online,
     Build a Practice Test and Build a Practice Sheet sections in
     that order; the test selector and the exam button sit inside
     the test section; the sheet counts, the print-only choices
     and the sheet button sit inside the sheet section; and the
     Dual-form questions select sits at the bottom door, after
     the sections, as a select all over the exam editor's
     per-question flips;
   - the counts behave as before: settings() and the settings URL
     carry them, a sheet composes to the counts set, and an exam
     still composes;
   - in student mode the composition controls (the two sheet
     counts, the two steppers and the dual-form select) are
     removed by the teacher gate, while the online section's own
     two counts remain;
   - the online composer deals multiple choice and fill-in to two
     counts (default 7 and 3); a link carrying omc/ofi engages
     the split, a link carrying only the legacy count keeps the
     legacy single-count draw, and seeded links deal identical
     questions in both modes;
   - the online test selector scopes an online set to a mapped
     test's indicators without touching the shared scope, and a
     pool that cannot fill its fill-in count surfaces the
     shortfall in a note instead of substituting multiple choice;
   - a math course (no test map) offers a unit-only test row that
     drives the shared scope and composes the single-unit paper;
   - the dual-form select all moves a composed paper's dual-form
     questions between sections wholesale, both ways;
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
     French mapped test shows its summary in French.
   Amendment, November 21, 2026: the online Test row (#oTestNumWrap)
   carries the [hidden] CSS guard in the built shell, starts hidden,
   shows on a mapped course once a test unit is chosen, and on a
   math course starts hidden, computes to display none and stays
   hidden after a unit is chosen (the empty-dropdown defect the
   owner saw in Math 3200). */
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
  /* ---------- online Test field: hidden unless a test map offers tests (Nov 21, 2026) ---------- */
  ok(html.includes("#oTestNumWrap[hidden]{display:none;}"), "test field: the built shell carries the #oTestNumWrap[hidden] guard rule");
  ok(/<label id="oTestNumWrap" hidden>/.test(html), "test field: the Test row starts hidden in the markup");

  /* ---------- counts: position and behaviour ---------- */
  let r = await boot("course=chem-2202&teacher=1");
  let d = r.dom.window.document;
  await waitBank(r.dom);
  const mc = d.getElementById("mcCountIn"), nc = d.getElementById("ncCountIn"), bm = d.getElementById("bmIn");
  ok(!!mc && !!nc && !!bm, "counts: the two count controls and the dual-form select render");
  const FOLLOWING = 4; // Node.DOCUMENT_POSITION_FOLLOWING
  const h3s = Array.prototype.slice.call(d.querySelectorAll("h3"));
  const h3ByText = t => h3s.find(h => h.textContent.trim() === t);
  const onlineH3 = h3ByText("Practice online"), testH3 = h3ByText("Build a Practice Test"), sheetH3 = h3ByText("Build a Practice Sheet");
  ok(!!onlineH3 && !!testH3 && !!sheetH3, "layout: the three builder sections render (Practice online, Build a Practice Test, Build a Practice Sheet)");
  if (onlineH3 && testH3 && sheetH3) {
    ok((onlineH3.compareDocumentPosition(testH3) & FOLLOWING) !== 0 && (testH3.compareDocumentPosition(sheetH3) & FOLLOWING) !== 0, "layout: the sections run in order, the sheet section last");
    const tsr = d.getElementById("testScopeRow");
    ok((testH3.compareDocumentPosition(tsr) & FOLLOWING) !== 0 && (tsr.compareDocumentPosition(sheetH3) & FOLLOWING) !== 0, "layout: the test selector sits inside the test section");
    const ge = d.getElementById("goExam");
    ok((testH3.compareDocumentPosition(ge) & FOLLOWING) !== 0 && (ge.compareDocumentPosition(sheetH3) & FOLLOWING) !== 0, "layout: the exam button sits inside the test section");
    ok((sheetH3.compareDocumentPosition(mc) & FOLLOWING) !== 0 && (sheetH3.compareDocumentPosition(nc) & FOLLOWING) !== 0, "layout: the sheet counts sit inside the sheet section");
    const key = d.getElementById("keyChk"), ws = d.getElementById("wsMcIn"), wsc = d.getElementById("wsCrIn"), code = d.getElementById("codeChk"), gs = d.getElementById("goSheet");
    ok(!!key && (sheetH3.compareDocumentPosition(key) & FOLLOWING) !== 0, "layout: answer key stays with the sheet choices");
    ok(!!code && (sheetH3.compareDocumentPosition(code) & FOLLOWING) !== 0, "layout: set code stays with the sheet choices");
    ok(!!ws && (sheetH3.compareDocumentPosition(ws) & FOLLOWING) !== 0, "layout: multiple choice working space stays with the sheet choices");
    ok(!!wsc && (sheetH3.compareDocumentPosition(wsc) & FOLLOWING) !== 0, "layout: constructed response working space stays with the sheet choices");
    ok(!!gs && (gs.compareDocumentPosition(bm) & FOLLOWING) !== 0, "layout: the dual-form select all sits at the bottom door, after the sections");
  }
  ok(!!d.getElementById("oMcIn") && !!d.getElementById("oFiIn"), "layout: the online section carries its two counts");
  ok(d.getElementById("countIn") && d.getElementById("countIn").type === "hidden", "layout: the legacy online count input is kept, hidden");
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
  ok(ds0.getElementById("bmIn") === null, "student: the dual-form select all is removed by the teacher gate");
  ok(!!ds0.getElementById("oMcIn") && !!ds0.getElementById("oFiIn"), "student: the online counts remain");
  ok(!!ds0.getElementById("testPlanNote"), "student: the preset summary element remains in the test row");
  rs0.dom.window.close();

  /* ---------- mapped test: preset summary and steppers ---------- */
  let rt = await boot("course=chem-2202&teacher=1");
  let dt = rt.dom.window.document;
  await waitBank(rt.dom);
  /* Fixture note, November 21, 2026 (test plan cap, Ruling 10):
     the pick below used to take the FIRST mapped test whose SR
     pool held plan.sr + 3 entries. At the old cap of 24 that
     screen selected Unit 2 Test 2 (pool 43); at the cap of 18 it
     selects Unit 2 Test 1 (pool 22), whose undealt, unclaimed
     stock cannot actually fill the steppers, and four assertions
     failed on the fixture rather than the behaviour. The screen
     now takes the qualifying test with the deepest SR headroom
     (pool entries minus plan SR), which is Unit 2 Test 2 under
     both caps. No assertion changed. */
  const pick = JSON.parse(ev(rt.dom, "(function(){var C=window.__COURSE;var units=Object.keys(C.testMap).sort(function(a,b){return a-b;});var best=null;for(var ui=0;ui<units.length;ui++){var u=+units[ui],list=C.testMap[u];for(var ti=0;ti<list.length;ti++){var e=list[ti],plan=testPlanFor(C,u,e.test);if(!plan)continue;var pool=poolFor([u],e.inds,scopeCap([u])).filter(function(x){return !x.enrich&&!x.noCompose;});if(plan.topics)pool=pool.filter(function(x){return x.indicators.every(function(c){var t=plan.topics[c];return !t||x.topic===t;});});var srP=pool.filter(function(x){return probeType(x)==='mc';}).length;var crP=pool.filter(function(x){return typeof CR_MARKS!=='undefined'&&CR_MARKS[x.id]!==undefined&&CR_MARKS[x.id]>=2&&x.level>=2;}).length;if(srP>=plan.sr+3&&crP>=Math.ceil(plan.cr/2)+2){var head=srP-plan.sr;if(!best||head>best.head)best={unit:u,test:e.test,sr:plan.sr,cr:plan.cr,head:head};}}}return best?JSON.stringify(best):'null';})()"));
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

  /* ---------- online practice: two-count dealing and link routing ----------
     jsdom runs the boot dispatch before the document.write bank
     lands, so link boots re-run the dispatch pair (applyURL, then
     startOnline) once the bank is in: exactly the order a real
     browser's parse runs them in. */
  let ro = await boot("course=chem-2202");
  let doo = ro.dom.window.document;
  await waitBank(ro.dom);
  doo.querySelector('.unitChk[value="1"]').click();
  let defOk = false;
  for (let k = 0; k < 5 && !defOk; k++) {
    doo.getElementById("goOnline").click();
    defOk = ev(ro.dom, "(function(){if(typeof current==='undefined'||!current)return false;var m=current.filter(function(q){return q.type==='mc';}).length;return current.length===10&&m===7;})()");
  }
  ok(defOk, "online: the default draw deals 7 multiple choice and 3 fill-in of 10");
  ok(ev(ro.dom, "settingsToURL().includes('omc=7') && settingsToURL().includes('ofi=3')"), "online: the settings URL carries the two counts");
  ro.dom.window.close();

  let rl2 = await boot("course=chem-2202&unit=1&omc=6&ofi=4");
  await waitBank(rl2.dom);
  ev(rl2.dom, "applyURL(new URLSearchParams('course=chem-2202&unit=1&omc=6&ofi=4'));startOnline(false);");
  ok(ev(rl2.dom, "settings().oSplit") === true, "online link: a link carrying omc/ofi engages the split");
  ok(ev(rl2.dom, "(function(){if(typeof current==='undefined'||!current)return false;var m=current.filter(function(q){return q.type==='mc';}).length;return current.length===10&&m===6;})()"), "online link: the split link deals 6 multiple choice and 4 fill-in");
  rl2.dom.window.close();

  let rg2 = await boot("course=chem-2202&unit=1&count=12");
  await waitBank(rg2.dom);
  ev(rg2.dom, "applyURL(new URLSearchParams('course=chem-2202&unit=1&count=12'));startOnline(false);");
  ok(ev(rg2.dom, "settings().oSplit") === false, "online link: a link carrying only the legacy count keeps the legacy draw");
  ok(ev(rg2.dom, "typeof current!=='undefined'&&current&&current.length===12"), "online link: the legacy link deals its 12 questions");
  rg2.dom.window.close();

  async function seededSeq(qs) {
    let rb = await boot(qs);
    await waitBank(rb.dom);
    ev(rb.dom, "applyURL(new URLSearchParams(" + JSON.stringify(qs) + "));startOnline(false);");
    const s = ev(rb.dom, "(function(){return (typeof current!=='undefined'&&current)?current.map(function(q){return canonQ(q);}).join('|'):'';})()");
    rb.dom.window.close();
    return s;
  }
  const seedA = await seededSeq("course=chem-2202&unit=1&count=10&seed=otter-42");
  const seedB = await seededSeq("course=chem-2202&unit=1&count=10&seed=otter-42");
  ok(seedA.length > 0 && seedA === seedB, "online link: a seeded legacy link deals identical questions on two opens");
  const seedC = await seededSeq("course=chem-2202&unit=1&omc=6&ofi=4&seed=otter-42");
  const seedD = await seededSeq("course=chem-2202&unit=1&omc=6&ofi=4&seed=otter-42");
  ok(seedC.length > 0 && seedC === seedD, "online link: a seeded split link deals identical questions on two opens");

  /* ---------- online test selector: scoped locally, scope untouched ---------- */
  let rsel = await boot("course=chem-2202");
  let dsel = rsel.dom.window.document;
  await waitBank(rsel.dom);
  const pickT = JSON.parse(ev(rsel.dom, "(function(){var C=window.__COURSE;var us=Object.keys(C.testMap).sort(function(a,b){return a-b;});for(var i=0;i<us.length;i++){var u=+us[i],l=C.testMap[u];for(var j=0;j<l.length;j++){var e=l[j];var pool=poolFor([u],e.inds,false);var mc=pool.filter(function(x){return probeType(x)==='mc';}).length;var fi=pool.filter(function(x){return probeType(x)!=='mc'||!!bimodalClass(x);}).length;if(mc>=6&&fi>=3)return JSON.stringify({unit:u,test:e.test,inds:e.inds});}}return 'null';})()"));
  ok(!!pickT, "online selector: Chemistry 2202 has a mapped test with a deep enough pool");
  if (pickT) {
    const scopeBefore = ev(rsel.dom, "JSON.stringify({u:state.units,i:state.inds})");
    const usel = dsel.getElementById("oTestUnitSel"); usel.value = "unit:" + pickT.unit; usel.dispatchEvent(new rsel.dom.window.Event("change"));
    const nsel = dsel.getElementById("oTestNumSel"); nsel.value = String(pickT.test); nsel.dispatchEvent(new rsel.dom.window.Event("change"));
    ok(dsel.getElementById("oTestNumWrap").hidden === false, "online selector: the Test row shows once a unit with a test map is chosen");
    ok(ev(rsel.dom, "!!(oTestSel&&oTestSel.kind==='test'&&oTestSel.test===" + pickT.test + ")"), "online selector: the choice registers as a test tailoring");
    ok(ev(rsel.dom, "JSON.stringify({u:state.units,i:state.inds})") === scopeBefore, "online selector: the shared scope is untouched");
    ok(dsel.getElementById("oTestNote").textContent.includes("Practice set for"), "online selector: the note names the tailored set (saw: " + dsel.getElementById("oTestNote").textContent + ")");
    const omcI = dsel.getElementById("oMcIn"), ofiI = dsel.getElementById("oFiIn");
    omcI.value = "4"; omcI.dispatchEvent(new rsel.dom.window.Event("input"));
    ofiI.value = "2"; ofiI.dispatchEvent(new rsel.dom.window.Event("input"));
    let selOk = false;
    for (let k = 0; k < 5 && !selOk; k++) {
      dsel.getElementById("goOnline").click();
      selOk = ev(rsel.dom, "(function(){if(typeof current==='undefined'||!current||current.length!==6)return false;var m=current.filter(function(q){return q.type==='mc';}).length;if(m!==4)return false;var inds=" + JSON.stringify(pickT.inds) + ";return current.every(function(q){var e=q._entry;return e.unit===" + pickT.unit + "&&e.indicators.some(function(c){return inds.indexOf(c)>=0;});});})()");
    }
    ok(selOk, "online selector: the tailored set deals 4 multiple choice and 2 fill-in from the test's indicators only");
  }
  rsel.dom.window.close();

  /* ---------- dry pool: the shortfall surfaces, nothing substitutes ---------- */
  let rd = await boot("course=chem-2202");
  let dd = rd.dom.window.document;
  await waitBank(rd.dom);
  dd.querySelector('.unitChk[value="4"]').click();
  const dOmc = dd.getElementById("oMcIn"), dOfi = dd.getElementById("oFiIn");
  dOmc.value = "0"; dOmc.dispatchEvent(new rd.dom.window.Event("input"));
  dOfi.value = "20"; dOfi.dispatchEvent(new rd.dom.window.Event("input"));
  dd.getElementById("goOnline").click();
  ok(ev(rd.dom, "typeof onlineNote!=='undefined'&&!!onlineNote&&onlineNote.indexOf('fill-in')>=0"), "dry pool: the shortfall note names the fill-in count (saw: " + ev(rd.dom, "String(onlineNote)") + ")");
  ok(ev(rd.dom, "(function(){return typeof current!=='undefined'&&current&&current.length>0&&current.every(function(q){return q.type!=='mc';});})()"), "dry pool: no multiple choice questions were substituted in");
  rd.dom.window.close();

  /* ---------- math: unit-only test row ---------- */
  let rm2 = await boot("course=math-2201");
  let dm2 = rm2.dom.window.document;
  await waitBank(rm2.dom);
  ok(dm2.getElementById("mathTestRow").hidden === false, "math: the unit test row shows on a course with no test map");
  ok(dm2.getElementById("testScopeRow").hidden === true, "math: the mapped test row stays hidden");
  ok(dm2.getElementById("oTestNumWrap").hidden === true, "math: the online Test row starts hidden on a course with no test map");
  ok(rm2.dom.window.getComputedStyle(dm2.getElementById("oTestNumWrap")).display === "none", "math: the hidden online Test row computes to display none");
  const musel = dm2.getElementById("oTestUnitSel"); musel.value = "unit:3"; musel.dispatchEvent(new rm2.dom.window.Event("change"));
  ok(dm2.getElementById("oTestNumWrap").hidden === true, "math: the online Test row stays hidden after a unit is chosen");
  const msel2 = dm2.getElementById("mathUnitSel"); msel2.value = "3"; msel2.dispatchEvent(new rm2.dom.window.Event("change"));
  ok(ev(rm2.dom, "state.units.join()") === "3", "math: choosing a unit sets the shared scope to it");
  dm2.getElementById("goExam").click();
  ok(ev(rm2.dom, "!!(typeof examState!=='undefined'&&examState&&examState.single)"), "math: the exam button composes the single-unit practice test");
  rm2.dom.window.close();

  /* ---------- dual-form select all on a composed paper ---------- */
  let rx2 = await boot("course=chem-2202&teacher=1");
  let dx2 = rx2.dom.window.document;
  await waitBank(rx2.dom);
  dx2.querySelectorAll(".unitChk").forEach(cb => { if (!cb.checked) cb.click(); });
  let hasDual = false;
  for (let k = 0; k < 6 && !hasDual; k++) {
    dx2.getElementById("goExam").click();
    hasDual = ev(rx2.dom, "(function(){if(typeof examState==='undefined'||!examState)return false;return examState.ex.srItems.some(function(it){return !!bimodalClass(it.q._entry);});})()");
  }
  ok(hasDual, "select all: the composed paper holds dual-form questions in Section A");
  if (hasDual) {
    const bmX = dx2.getElementById("bmIn"); bmX.value = "off"; bmX.dispatchEvent(new rx2.dom.window.Event("change"));
    ok(ev(rx2.dom, "(function(){return examState.ex.srItems.every(function(it){return !bimodalClass(it.q._entry);})&&examState.ex.crItems.some(function(it){return !!bimodalClass(it.q._entry);});})()"), "select all: choices off moves every dual-form question into Section B");
    bmX.value = "on"; bmX.dispatchEvent(new rx2.dom.window.Event("change"));
    ok(ev(rx2.dom, "(function(){return examState.ex.srItems.some(function(it){return !!bimodalClass(it.q._entry);});})()"), "select all: choices on returns dual-form questions to Section A");
  }
  rx2.dom.window.close();

  /* ---------- French statics and summary ---------- */
  let rf = await boot("course=sci-7-fr&teacher=1");
  let df = rf.dom.window.document;
  await waitBank(rf.dom);
  const labOf = id => { const el = df.getElementById(id); const lab = el && el.closest ? el.closest("label") : null; return lab ? lab.textContent : ""; };
  ok(labOf("mcCountIn").includes("Choix multiple"), "french: the moved count label translates (saw: " + labOf("mcCountIn").trim() + ")");
  const fh3s = Array.prototype.slice.call(df.querySelectorAll("h3")).map(h => h.textContent.trim());
  ok(fh3s.indexOf("Créer un test de pratique") >= 0 && fh3s.indexOf("Créer une feuille d'entraînement") >= 0, "french: the section headings translate (saw: " + fh3s.join(" | ") + ")");
  ok(labOf("oFiIn").includes("Réponse courte"), "french: the fill-in label translates (saw: " + labOf("oFiIn").trim() + ")");
  ok(df.getElementById("oTestLab").textContent.includes("Pratiquer pour un test"), "french: the online test selector label translates (saw: " + df.getElementById("oTestLab").textContent.trim() + ")");
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
