#!/usr/bin/env node
/* Print smoke test for the unified review app, Physics 3204 through the
   course loader (not a second print_test; the full print gate stays with
   the per-course suites). Checks the two print behaviours a teacher
   notices first:
   - A practice sheet renders its questions, and the answer key is part
     of the sheet when the key is enabled and absent when it is off.
   - The mid-course exam, composed through the app's own exam path
     (preset + mode=exam boot, which runs startExam), reports 50 marks
     on screen and on the printed paper. The exam boot is seeded so the
     smoke run is deterministic.
   - The printed set code block (Nov 18, 2026 fix): with the print
     panel's code toggle on, the print output itself (#printArea, the
     exact markup window.print prints, and for exams the paper part
     the Print button swaps in) carries the code text, a QR element
     whose link target is the set URL, and the hint line, on BOTH the
     sheet and exam paths and WITHOUT teacher=1 (the ordinary way a
     teacher makes a print; the first version silently required the
     Advanced tools context and ordinary prints carried no block).
     With the toggle off, no block appears and nothing is minted.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/print-smoke.js */
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
function settleBoot(dom) {
  /* LOADER TIMING (jsdom adaptation for the unified shell): the shell
     loads the course bank through a document.write-inserted script.
     Browsers give parser-inserted scripts blocking, in-order semantics,
     so the main script's boot dispatch runs only after the bank has
     executed; jsdom does not guarantee that ordering (measured: the
     session renders its empty-selection message while BANK is still 0,
     and the bank lands about 100 ms later), so the dispatch can misfire
     on parameterized links. Wait for the bank, then re-run the app's own
     boot dispatch once, only if it visibly misfired. The loader path
     itself (course parameter, document.write, bank module) is fully
     exercised either way. */
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

(async () => {
  /* ===== practice sheet, answer key enabled (the default) ===== */
  let d = await boot("course=physics-3204&unit=1&mode=sheet&teacher=1&mc=4&nc=6");
  const items = ev(d, "sheetState.items.length");
  ok(items === 10, "sheet: drew the requested 10 questions (4 MC + 6 CR), saw " + items);
  const prev = d.window.document.querySelector("#sheetPrev");
  ok(!!prev, "sheet: preview rendered");
  ok(prev && prev.querySelectorAll(".pq").length === items,
     "sheet: preview renders every drawn question (" + (prev ? prev.querySelectorAll(".pq").length : 0) + ")");
  const firstPrompt = prev && prev.querySelector(".pq .prompt") ? prev.querySelector(".pq .prompt").textContent : "";
  ok(firstPrompt.trim().length > 10, "sheet: first question prompt carries real text");
  ok(prev && prev.innerHTML.includes("Answer Key, with worked solutions"),
     "sheet (key on): answer key present at the end of the sheet");
  ok(d.window.document.querySelector("#printArea").innerHTML.includes("Answer Key, with worked solutions"),
     "sheet (key on): the print area carries the key");
  d.window.close();

  /* ===== practice sheet, answer key off ===== */
  d = await boot("course=physics-3204&unit=1&mode=sheet&teacher=1&mc=4&nc=6&key=0");
  const prevOff = d.window.document.querySelector("#sheetPrev");
  ok(prevOff && prevOff.querySelectorAll(".pq").length === 10, "sheet (key off): questions still render");
  ok(prevOff && !prevOff.innerHTML.includes("Answer Key"), "sheet (key off): no answer key in the sheet");
  ok(!d.window.document.querySelector("#printArea").innerHTML.includes("Answer Key"),
     "sheet (key off): the print area has no key");
  d.window.close();

  /* ===== mid-course exam through the app's own exam path ===== */
  d = await boot("course=physics-3204&preset=mid&mode=exam&teacher=1&seed=midterm");
  ok(ev(d, "!!examState && !!examState.ex"), "exam: mid exam composed through the app exam path");
  const live = JSON.parse(ev(d, "JSON.stringify(examLive(examState.ex))"));
  ok(live.total === 50, "exam: paper reports 50 marks in total (saw " + live.total + ")");
  ok(live.sr === 27 && live.cr === 23,
     "exam: 27 selected-response marks and 23 constructed-response marks (saw " + live.sr + "/" + live.cr + ")");
  ok(d.window.document.querySelector("#session").textContent.includes("50 marks in total"),
     "exam: on-screen summary reports 50 marks in total");
  const prevE = d.window.document.querySelector("#sheetPrev");
  ok(prevE && prevE.textContent.includes("Total marks: 50"), "exam: printed paper header reports Total marks: 50");
  ok(prevE && prevE.textContent.includes("Section A: Selected Response (27 marks)") &&
     prevE.textContent.includes("Section B: Constructed Response (23 marks)"),
     "exam: section headings carry the 27 and 23 mark split");
  d.window.close();

  /* ===== printed set code block: sheet path, ordinary run (no teacher=1) ===== */
  function codeBlockOf(root) { return root ? root.querySelector(".codebox") : null; }
  function checkCodeBlock(root, label, mode) {
    const box = codeBlockOf(root);
    ok(!!box, label + ": code block present in the print output");
    if (!box) return "";
    const codeEl = box.querySelector(".code");
    const codeText = codeEl ? codeEl.textContent.trim() : "";
    ok(/^[A-Z0-9]{3} [A-Z0-9]{3}$/.test(codeText), label + ": code text is a spaced six-character code (saw " + codeText + ")");
    const link = box.querySelector(".code a");
    const href = link ? link.getAttribute("href") || "" : "";
    ok((href.includes("set=") || href.includes("seed=")) && href.includes("mode=" + mode), label + ": code link target is the set URL for this " + mode);
    const qr = box.querySelector(".qr svg");
    ok(!!qr, label + ": QR element present in the print output");
    /* QR scannability (Nov 18, 2026): the symbol is a vector built
       with no quiet zone of its own, sized by the print CSS. The
       module size at the printed size must stay at or above about
       a third of a millimetre, the floor for reliable phone
       scanning; a full exam set reaches QR version 28 (129
       modules), which the old 29 mm print size put at 0.22 mm. */
    const vb = qr ? (qr.getAttribute("viewBox") || "").split(/\s+/).map(Number) : [];
    const modules = vb.length === 4 && vb[2] > 0 ? vb[2] / 2 : 0;
    ok(modules > 0 && 46 / modules >= 0.33,
       label + ": QR module size at the 46 mm print size is at least 0.33 mm (saw " +
       (modules > 0 ? (46 / modules).toFixed(3) + " mm over " + modules + " modules" : "no viewBox") + ")");
    const qrLink = box.querySelector(".qr") ? box.querySelector(".qr").closest("a") : null;
    ok(!!qrLink && (qrLink.getAttribute("href") || "") === href, label + ": QR link target matches the code link target");
    const hint = box.querySelector(".codehint");
    ok(!!hint && hint.textContent.includes("Type the code on the Review Apps home page"),
       label + ": hint line present in the print output");
    return codeText.replace(/ /g, "");
  }
  /* ===== printed set code block: placement and print styling =====
     The block opens the print markup, ahead of the brand and the
     name line, so its float sits at the very top right of page 1
     and the header text wraps beside it (Nov 18, 2026). */
  ok(html.includes(".codebox{float:right"), "print CSS: the code block floats right");
  ok(html.includes(".codebox .qr svg{width:46mm;height:46mm"), "print CSS: the QR code prints at 46 mm square");
  ok(html.includes(".codebox .qr{display:block;background:#fff;padding:2mm"),
     "print CSS: the QR carries white padding as its quiet zone");
  d = await boot("course=math-2201&unit=1&mode=sheet&mc=4&nc=2");
  const sheetCode = checkCodeBlock(d.window.document.querySelector("#printArea"), "sheet (code on, ordinary)", "sheet");
  const sheetHtml = d.window.document.querySelector("#printArea").innerHTML;
  ok(sheetHtml.indexOf("codebox") >= 0 && sheetHtml.indexOf("codebox") < sheetHtml.indexOf("sheetbrand"),
     "sheet (code on, ordinary): the code block opens the print markup, ahead of the brand");
  ok(sheetCode && d.window.document.title.endsWith(sheetCode),
     "sheet (code on, ordinary): the print file name carries the printed code");
  ok(!!codeBlockOf(d.window.document.querySelector("#sheetPrev")),
     "sheet (code on, ordinary): the preview the Print button copies into the print area carries the block");
  d.window.close();

  /* ===== printed set code block: exam path, ordinary run ===== */
  d = await boot("course=math-2201&unit=1&mode=exam");
  const examCode = checkCodeBlock(d.window.document.querySelector("#printArea"), "exam (code on, ordinary)", "exam");
  const examHtml = d.window.document.querySelector("#printArea").innerHTML;
  ok(examHtml.indexOf("codebox") >= 0 && examHtml.indexOf("codebox") < examHtml.indexOf("sheetbrand"),
     "exam (code on, ordinary): the code block opens the print markup, ahead of the brand");
  ok(examCode && d.window.document.title.endsWith(examCode),
     "exam (code on, ordinary): the print file name carries the printed code");
  const parts = JSON.parse(ev(d, "JSON.stringify((function(){var pp=previewParts();return pp?{paper:pp.paper,key:pp.key}:null;})())"));
  ok(!!parts && parts.paper.includes("codebox") && parts.paper.includes("Type the code on the Review Apps home page"),
     "exam (code on, ordinary): the paper part the Print button swaps in carries the block");
  ok(!!parts && !parts.key.includes("codebox"),
     "exam (code on, ordinary): the answer key part carries no code block");
  d.window.close();

  /* ===== printed set code block: toggle off, ordinary runs ===== */
  d = await boot("course=math-2201&unit=1&mode=sheet&mc=4&nc=2&scode=0");
  ok(!codeBlockOf(d.window.document.querySelector("#printArea")) &&
     !d.window.document.querySelector("#printArea").innerHTML.includes("Set code"),
     "sheet (code off, ordinary): no code block in the print output");
  ok(!/ - [A-Z0-9]{6}$/.test(d.window.document.title),
     "sheet (code off, ordinary): the print file name carries no code");
  d.window.close();
  d = await boot("course=math-2201&unit=1&mode=exam&scode=0");
  ok(!codeBlockOf(d.window.document.querySelector("#printArea")) &&
     !d.window.document.querySelector("#printArea").innerHTML.includes("Set code"),
     "exam (code off, ordinary): no code block in the print output");
  d.window.close();

  /* ===== printed set code block: seeded ordinary run =====
     The block prints, and the code is derived from the set value, so
     two openings of the same seed link print the same code. */
  d = await boot("course=math-2201&unit=1&mode=sheet&mc=4&nc=2&seed=apple");
  const seededCode1 = checkCodeBlock(d.window.document.querySelector("#printArea"), "sheet (code on, seeded)", "sheet");
  d.window.close();
  d = await boot("course=math-2201&unit=1&mode=sheet&mc=4&nc=2&seed=apple");
  const seededCode2 = checkCodeBlock(d.window.document.querySelector("#printArea"), "sheet (code on, seeded, second opening)", "sheet");
  ok(!!seededCode1 && seededCode1 === seededCode2,
     "sheet (code on, seeded): the same code prints on both openings (" + seededCode1 + " vs " + seededCode2 + ")");
  d.window.close();

  /* ===== printed set code block: Advanced tools run still works ===== */
  d = await boot("course=math-2201&unit=1&mode=sheet&teacher=1&mc=4&nc=2");
  checkCodeBlock(d.window.document.querySelector("#printArea"), "sheet (code on, teacher)", "sheet");
  d.window.close();

  console.log(fail ? "PRINT SMOKE FAIL (" + fail + ")" : "PRINT SMOKE PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
