#!/usr/bin/env node
/* Gate (jsdom) for the per-question dual-form flip in the exam
   teacher panel (Nov 20, 2026):
     NODE_PATH=$HOME/workspace/physics-2204-review/node_modules node tests/gate-bimodal-flip.js
   - a composed multi-unit practice exam (Biology 3201, all units,
     teacher mode) shows a Choices off button on a dual-form
     Section A question and no button on a question whose entry is
     not dual-form;
   - clicking Choices off moves the question to the end of
     Section B in stripped form at its CR_MARKS value, and the
     section totals, the paper total and the printed headings all
     move with it;
   - the saved set (tSetValue, and a student link opened fresh)
     carries the question in the constructed response segment in
     written form, at the same marks;
   - clicking Choices on returns the identical multiple choice
     question to Section A at one mark, with the original totals
     restored and the set token back in the selected response
     segment;
   - the control stands down where the blueprint governs: a
     mapped Chemistry 2202 test and a single-unit Biology 3201
     paper (a unit test) render no flip button at all, though
     both papers carry dual-form questions. */
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

/* Loader timing in jsdom (the adaptation check-sheet-numbering.js
   uses): the bank script lands after the page's own boot dispatch
   has already tried the set link and found an empty bank, so a set
   link is rebuilt here once the bank is in. In a real browser the
   production dispatch does this synchronously at boot. */
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
  /* ---------- the flip on a composed practice exam ---------- */
  let r = await boot("course=bio-3201&teacher=1");
  let d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true, "flip: teacher mode on");
  d.getElementById("presetAll").click();
  let target = -1;
  for (let k = 0; k < 8 && target < 0; k++) {
    d.getElementById("goExam").click();
    target = ev(r.dom, "(function(){if(!examState)return -1;for(var i=0;i<examState.ex.srItems.length;i++){var it=examState.ex.srItems[i];if(it.q.type==='mc'&&bimodalClass(it.q._entry))return i;}return -1;})()");
  }
  ok(target >= 0, "flip: composed exam carries a dual-form question in Section A");
  ok(!!d.querySelector("#tExamPanel"), "flip: teacher exam panel rendered");
  const eid = ev(r.dom, "examState.ex.srItems[" + target + "].q._entry.id");
  const cmarks = ev(r.dom, "CR_MARKS['" + eid + "']");
  ok(typeof cmarks === "number" && cmarks >= 2, "flip: target entry carries CR marks (" + cmarks + ")");
  const before = JSON.parse(ev(r.dom, "JSON.stringify(examLive(examState.ex))"));
  const canonBefore = ev(r.dom, "canonQ(examState.ex.srItems[" + target + "].q)");
  const btn = d.querySelector('[data-tflip="sr:' + target + '"]');
  ok(!!btn, "flip: Choices off button on the dual-form Section A question");
  ok(btn && btn.textContent === "Choices off", "flip: button reads Choices off, saw " + (btn && btn.textContent));
  const flipBtns = d.querySelectorAll("[data-tflip]").length;
  const flipExpected = ev(r.dom, "(function(){var n=0;examState.ex.srItems.forEach(function(it){if(it.q.type==='mc'&&bimodalClass(it.q._entry))n++;});examState.ex.crItems.forEach(function(it){if(it.q.type!=='mc'&&bimodalClass(it.q._entry))n++;});return n;})()");
  ok(flipBtns === flipExpected, "flip: one button per dual-form question and none on any other (" + flipBtns + " vs " + flipExpected + ")");
  const plainIdx = ev(r.dom, "(function(){for(var i=0;i<examState.ex.srItems.length;i++){var it=examState.ex.srItems[i];if(!bimodalClass(it.q._entry))return i;}return -1;})()");
  if (plainIdx >= 0) ok(!d.querySelector('[data-tflip="sr:' + plainIdx + '"]'), "flip: no button on a non-dual-form question");

  btn.click();
  const after = JSON.parse(ev(r.dom, "JSON.stringify(examLive(examState.ex))"));
  ok(after.sr === before.sr - 1, "flip off: Section A total drops by one (" + before.sr + " to " + after.sr + ")");
  ok(after.cr === before.cr + cmarks, "flip off: Section B total gains the written marks (" + before.cr + " to " + after.cr + ")");
  ok(after.total === before.total - 1 + cmarks, "flip off: paper total follows (" + before.total + " to " + after.total + ")");
  ok(ev(r.dom, "examState.ex.srItems.every(function(it){return it.q._entry.id!=='" + eid + "';})"), "flip off: question gone from Section A");
  const crIdx = ev(r.dom, "examState.ex.crItems.length-1");
  ok(ev(r.dom, "examState.ex.crItems[" + crIdx + "].q._entry.id") === eid, "flip off: question lands at the end of Section B");
  ok(ev(r.dom, "examState.ex.crItems[" + crIdx + "].marks") === cmarks, "flip off: written marks travel with the question");
  ok(ev(r.dom, "examState.ex.crItems[" + crIdx + "].q.type") !== "mc", "flip off: Section B form is written, not multiple choice");
  ok(ev(r.dom, "!examState.ex.crItems[" + crIdx + "].q.options"), "flip off: stripped form carries no options");
  const paper = d.getElementById("printArea").innerHTML;
  ok(paper.includes("Total marks: " + after.total), "flip off: printed paper shows the new total");
  ok(paper.includes("Section A: Selected Response (" + after.sr + " marks)"), "flip off: printed Section A heading shows the new total");
  ok(paper.includes("Section B: Constructed Response (" + after.cr + " marks)"), "flip off: printed Section B heading shows the new total");
  const onBtn = d.querySelector('[data-tflip="cr:' + crIdx + '"]');
  ok(!!onBtn && onBtn.textContent === "Choices on", "flip off: the moved question now offers Choices on");

  /* the saved set carries the flip */
  const sv = ev(r.dom, "tSetValue()");
  const segs = sv.split(":").slice(2).join(":").split(";");
  const inSeg = (seg, id) => (seg || "").split(",").some(t => t === id || t.startsWith(id + ".") || t.startsWith(id + "@"));
  ok(inSeg(segs[1], eid) && !inSeg(segs[0], eid), "flip off: set value places the question in the constructed response segment only");
  const crTok = (segs[1] || "").split(",").find(t => t === eid || t.startsWith(eid + ".") || t.startsWith(eid + "@"));
  ok(!!crTok && (crTok.includes("@") || /[NT]$/.test(crTok)), "flip off: set token records the written form (" + crTok + ")");

  /* a student opening the copied link sees the same arrangement */
  const link = ev(r.dom, "tShareURL(false)");
  ok(link.includes("set="), "flip: student link carries the set");
  let rs = await boot(link.split("?")[1]);
  await settleSet(rs.dom);
  ok(ev(rs.dom, "TEACHER") === false, "flip: student link opens without teacher mode");
  ok(ev(rs.dom, "!!examState"), "flip: student link rebuilds the exam");
  ok(ev(rs.dom, "examState.ex.crItems.some(function(it){return it.q._entry.id==='" + eid + "'&&it.marks===" + cmarks + "&&it.q.type!=='mc';})"), "flip: student paper holds the question in Section B, written, at its marks");
  ok(ev(rs.dom, "examState.ex.srItems.every(function(it){return it.q._entry.id!=='" + eid + "';})"), "flip: student Section A has no trace of the question");
  const sLive = JSON.parse(ev(rs.dom, "JSON.stringify(examLive(examState.ex))"));
  ok(sLive.sr === after.sr && sLive.cr === after.cr && sLive.total === after.total, "flip: student paper totals match the teacher's flipped paper");
  ok(!rs.dom.window.document.querySelector("[data-tflip]"), "flip: no flip control on the student side");
  rs.dom.window.close();

  /* flip back */
  onBtn.click();
  const back = JSON.parse(ev(r.dom, "JSON.stringify(examLive(examState.ex))"));
  ok(back.sr === before.sr && back.cr === before.cr && back.total === before.total, "flip on: original totals restored");
  const backIdx = ev(r.dom, "examState.ex.srItems.findIndex(function(it){return it.q._entry.id==='" + eid + "';})");
  ok(backIdx >= 0, "flip on: question is back in Section A");
  ok(ev(r.dom, "examState.ex.srItems[" + backIdx + "].q.type") === "mc", "flip on: question is multiple choice again");
  ok(ev(r.dom, "canonQ(examState.ex.srItems[" + backIdx + "].q)") === canonBefore, "flip on: the identical question returns (same prompt and answer)");
  ok(ev(r.dom, "examState.ex.crItems.every(function(it){return it.q._entry.id!=='" + eid + "';})"), "flip on: question gone from Section B");
  const sv2 = ev(r.dom, "tSetValue()");
  const segs2 = sv2.split(":").slice(2).join(":").split(";");
  ok(inSeg(segs2[0], eid) && !inSeg(segs2[1], eid), "flip on: set value places the question back in the selected response segment only");
  r.dom.window.close();

  /* ---------- stand-down: a mapped test ---------- */
  let rt = await boot("course=chem-2202&teacher=1");
  let dt = rt.dom.window.document;
  const tm = JSON.parse(ev(rt.dom, "(function(){var C=window.__COURSE;if(!C.testMap)return 'null';var u=+Object.keys(C.testMap).sort(function(a,b){return a-b;})[0];return JSON.stringify({unit:u,test:C.testMap[u][0].test});})()"));
  ok(!!tm, "stand-down: Chemistry 2202 carries a mapped test");
  if (tm) {
    const us = dt.getElementById("testUnitSel"), ts = dt.getElementById("testNumSel");
    us.value = String(tm.unit); us.dispatchEvent(new rt.dom.window.Event("change"));
    ts.value = String(tm.test); ts.dispatchEvent(new rt.dom.window.Event("change"));
    ok(ev(rt.dom, "!!testSelActive(settings())"), "stand-down: builder holds the mapped test selection");
    let hasBm = false;
    for (let k = 0; k < 8 && !hasBm; k++) {
      dt.getElementById("goExam").click();
      hasBm = ev(rt.dom, "(function(){if(!examState)return false;return examState.ex.srItems.concat(examState.ex.crItems).some(function(it){return !!bimodalClass(it.q._entry);});})()");
    }
    ok(ev(rt.dom, "!!(examState&&examState.testScope)"), "stand-down: mapped test composition is in test scope");
    ok(hasBm, "stand-down: mapped test paper carries a dual-form question");
    ok(!!dt.querySelector("#tExamPanel"), "stand-down: teacher panel present on the mapped test");
    ok(dt.querySelectorAll("[data-tflip]").length === 0, "stand-down: no flip button anywhere on a mapped test");
  }
  rt.dom.window.close();

  /* ---------- stand-down: a single-unit paper is a unit test ---------- */
  let ru = await boot("course=bio-3201&teacher=1");
  let du = ru.dom.window.document;
  du.querySelector('.unitChk[value="3"]').click();
  let hasBmU = false;
  for (let k = 0; k < 8 && !hasBmU; k++) {
    du.getElementById("goExam").click();
    hasBmU = ev(ru.dom, "(function(){if(!examState)return false;return examState.ex.srItems.concat(examState.ex.crItems).some(function(it){return !!bimodalClass(it.q._entry);});})()");
  }
  ok(ev(ru.dom, "!!(examState&&examState.single)"), "stand-down: single-unit paper composed");
  ok(hasBmU, "stand-down: single-unit paper carries a dual-form question");
  ok(du.querySelectorAll("[data-tflip]").length === 0, "stand-down: no flip button on a single-unit paper");
  ru.dom.window.close();

  console.log("GATE-BIMODAL-FLIP: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
