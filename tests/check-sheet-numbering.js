#!/usr/bin/env node
/* Sheet item-numbering check (Nov 14, 2026): on the practice sheet,
   the exam paper and the answer key, the item number and the
   question stem share one paragraph (the conventional "1. What is..."
   style), on screen, in print markup and in the generated Word file.
   Before this change the number sat in its own paragraph and the
   Word export carried the break into every item.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/check-sheet-numbering.js */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function boot(qs) {
  return new Promise((resolve) => {
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
/* Same loader-timing adaptation as tests/print-smoke.js. */
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
const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

function pqSharesParagraph(pq) {
  /* The item number's <b> and the prompt span live in the same
     .qline block, and no block in the item is the number alone. The
     Word walker turns one .qline block into one paragraph. */
  const p = pq.querySelector(".qline");
  if (!p) return { ok: false, why: "no qline block" };
  const b = p.querySelector("b");
  const span = p.querySelector("span.prompt");
  if (!b || !/^\d+\.$/.test(norm(b.textContent))) return { ok: false, why: "number not leading the block" };
  if (!span) return { ok: false, why: "prompt span not in the number block" };
  if (norm(span.textContent).length < 5) return { ok: false, why: "prompt text missing" };
  const alone = Array.prototype.some.call(pq.querySelectorAll("p, .qline"), (x) => /^\d+\.$/.test(norm(x.textContent)));
  if (alone) return { ok: false, why: "a number-only block remains" };
  return { ok: true };
}

(async () => {
  /* ===== a real drawn practice sheet ===== */
  let d = await boot("course=physics-3204&unit=1&mode=sheet&teacher=1&mc=4&nc=4");
  const prev = d.window.document.querySelector("#sheetPrev");
  ok(!!prev, "sheet: preview rendered");
  const pqs = prev ? prev.querySelectorAll(".pq") : [];
  ok(pqs.length >= 4, "sheet: items rendered (" + pqs.length + ")");
  let allShare = pqs.length > 0;
  pqs.forEach((pq) => { const r = pqSharesParagraph(pq); if (!r.ok) { allShare = false; console.log("  sheet item: " + r.why); } });
  ok(allShare, "sheet: every item's number and stem share one block");
  const keyP = prev && prev.querySelector(".solp p");
  ok(!!keyP && /^\d+\.\s+(Answer:|Réponse :)/.test(norm(keyP.textContent)),
     "sheet key: the answer line still leads with the number (unchanged)");

  /* ===== fabricated edge cases through the sheet renderer ===== */
  ev(d, `(function(){
    var e1=null,e2=null;
    for(var i=0;i<BANK.length;i++){var q=BANK[i].gen();if(!e1&&q.type==="mc")e1=BANK[i];if(!e2&&q.type!=="mc")e2=BANK[i];if(e1&&e2)break;}
    var qTab={prompt:'<table><tr><th>Metal</th><th>Density</th></tr><tr><td>Iron</td><td>7.9</td></tr></table> Based on the table, which metal is listed first?',type:"mc",options:["Iron","Copper","Lead","Zinc"],correct:0,solution:"The first row names iron.",_entry:e1};
    var qFig={prompt:"Use the diagram to decide which circuit is complete.",type:"mc",options:["Circuit A","Circuit B","Circuit C","Circuit D"],correct:2,solution:"Only circuit C is closed.",figure:'<svg width="40" height="20"><rect x="2" y="2" width="36" height="16" fill="none" stroke="black"/></svg>',_entry:e1};
    var qCr={prompt:"Explain, in your own words, why the seasons change over the year.",type:"text",answers:["tilt"],solution:"The tilt of the axis points each hemisphere toward or away from the Sun.",_entry:e2||e1};
    var s=settings();
    sheetState={items:[qTab,qFig,qCr],s:s,thin:false};
    renderSheet();
  })()`);
  const prev2 = d.window.document.querySelector("#sheetPrev");
  const pqs2 = prev2 ? prev2.querySelectorAll(".pq") : [];
  ok(pqs2.length === 3, "edge sheet: three fabricated items rendered");
  if (pqs2.length === 3) {
    const firstP = pqs2[0].querySelector(".qline");
    ok(!!firstP && /^\d+\./.test(norm(firstP.textContent)) && norm(firstP.textContent).indexOf("Based on the table") >= 0,
       "edge sheet: a stem opening with a table still leads with its number and text in one block");
    ok(!!pqs2[0].querySelector("table"), "edge sheet: the table itself still renders");
    ok(!!pqs2[1].querySelector(".fig"), "edge sheet: a figure question still carries its figure");
    const r3 = pqSharesParagraph(pqs2[2]);
    ok(r3.ok, "edge sheet: the constructed-response item shares one block" + (r3.ok ? "" : " (" + r3.why + ")"));
    ok(!!pqs2[2].querySelector(".wsbox"), "edge sheet: the constructed-response writing box still renders");
  }

  /* ===== fabricated exam through the exam renderer, plus the Word body ===== */
  ev(d, `(function(){
    var e1=null,e2=null;
    for(var i=0;i<BANK.length;i++){var q=BANK[i].gen();if(!e1&&q.type==="mc")e1=BANK[i];if(!e2&&q.type!=="mc")e2=BANK[i];if(e1&&e2)break;}
    var qA={prompt:"Which unit is used to measure electric charge?",type:"mc",options:["volt","ampere","coulomb","ohm"],correct:2,solution:"Charge is measured in coulombs.",_entry:e1};
    var qB={prompt:"A resistor is connected to a battery. Calculate the current through the resistor, showing all of your work.",type:"text",answers:["2"],solution:"Use the relation between voltage, current and resistance.",_entry:e2||e1};
    var exO={srItems:[{q:qA,marks:1}],crItems:[{q:qB,marks:4}],single:false,short:false};
    var lv=examLive(exO);exO.srMarks=lv.sr;exO.crMarks=lv.cr;exO.l3Marks=lv.l3;exO.total=lv.total;
    examState={ex:exO,s:settings(),single:false,wsCrF:2.3,scope:"Unit 1",title:"Physics 3204: Practice Exam",t0:Date.now()};
    renderExam();
  })()`);
  const prevE = d.window.document.querySelector("#sheetPrev");
  const pqsE = prevE ? prevE.querySelectorAll(".pq") : [];
  ok(pqsE.length === 2, "exam: both fabricated items rendered (" + pqsE.length + ")");
  if (pqsE.length === 2) {
    const rA = pqSharesParagraph(pqsE[0]);
    ok(rA.ok, "exam Section A: number and stem share one block" + (rA.ok ? "" : " (" + rA.why + ")"));
    const pB = pqsE[1].querySelector(".qline");
    ok(!!pB && /^\d+\./.test(norm(pB.textContent)) && norm(pB.textContent).indexOf("marks") >= 0 && norm(pB.textContent).indexOf("Calculate the current") >= 0,
       "exam Section B: number, marks and stem share one block");
    ok(!!pqsE[1].querySelector(".wsbox"), "exam Section B: the writing box still renders");
  }
  const appSolp = prevE ? prevE.querySelector(".solAppendix .solp .qline") : null;
  ok(!!appSolp && /^\d+\./.test(norm(appSolp.textContent)) && norm(appSolp.textContent).indexOf("coulombs") >= 0,
     "exam key appendix: number, letter and worked solution share one block");

  const paras = ev(d, `(function(){
    var xml=docxBodyXml(document.getElementById("sheetPrev"));
    return xml.split("<w:p>").slice(1).map(function(seg){return seg.split("</w:p>")[0].replace(/<[^>]+>/g,"").replace(/\\s+/g," ").trim();});
  })()`);
  const secA = paras.find((t) => t.indexOf("electric charge") >= 0);
  ok(!!secA && /^1\./.test(secA), "docx: the Section A item is one paragraph leading with its number");
  ok(!paras.some((t) => /^\d+\.$/.test(t)), "docx: no paragraph is an item number alone");
  const secB = paras.find((t) => t.indexOf("Calculate the current") >= 0);
  ok(!!secB && /^2\./.test(secB) && secB.indexOf("marks") >= 0, "docx: the Section B item is one paragraph with number, marks and stem");
  d.window.close();

  console.log(fail ? "SHEET NUMBERING CHECK FAIL (" + fail + ")" : "SHEET NUMBERING CHECK PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
