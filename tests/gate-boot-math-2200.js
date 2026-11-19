#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 2200 in the unified shell:
     node tests/gate-boot-math-2200.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-2200: Math 2200 title and header, nine unit
     checkboxes with the right names, both preset labels, the All
     preset sweeping all nine units (pool 184 with the prior
     knowledge switch off, 259 with it on), the course default
     mix 20/60/20 in force, the mid preset over Units 1 to 4 (pool
     109 with the switch off, 144 with it on) with the face scope
     worded "Mid-course review: Units 1 to
     4", the final preset over Units 5 to 9 (pool 75 with the
     switch off, 115 with it on) with the face
     scope worded "End-of-course review: Units 5 to 9" as the
     standalone words it, and reference panels for Units 1, 3 and
     9 only, with no always-on panel.
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-2200&teacher=1: teacher mode on. */
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

(async () => {
  // --- course boot ---
  let r = await boot("course=math-2200");
  let d = r.dom.window.document;
  ok(r.dom.window.document.title === "Math 2200 Review: Practice Question Bank", "course: page title, saw " + r.dom.window.document.title);
  ok(d.querySelector("#app h1").textContent === "Math 2200 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 259, "course: bank loaded via the loader (259 since the Bank Strengthening Programme pass 5 Unit 3 additions, Nov 19, 2026; 214 before it), BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 172, "course: CR_MARKS wired from the bank module (172 since the pass 5 additions, Nov 19, 2026; 127 before it)");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 9, "course: nine unit checkboxes, saw " + labels.length);
  ["Trigonometry", "Quadratic Functions", "Quadratic Equations",
   "Radical Expressions and Equations", "Rational Expressions and Equations",
   "Absolute Value and Reciprocal Functions", "Systems of Equations",
   "Linear and Quadratic Inequalities", "Sequences and Series"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 to 4)", "course: mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 5 to 9)", "course: final preset label, saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetFinal").style.display !== "none", "course: Final preset button visible (this course has a final preset)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is the course default 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetAll').click()");
  // Pool figures amended Nov 19, 2026: the prior knowledge switch
  // (live Nov 18, 2026, defaults off) means the pool line counts the
  // pool the switch leaves, dropping the selection's prior knowledge
  // entries (75 across the bank: 35 in Units 1 to 4, 40 in Units 5
  // to 9). This file's pins still carried the pre-switch full counts
  // (214, 99, 115); with the switch on the figures are 259, 144 and
  // 115. The same amendment carries the Bank Strengthening
  // Programme pass 5 additions (45 entries in Unit 3, none of them
  // prior knowledge): the All figure rises from 139 to 184 and the
  // Mid figure from 64 to 109; the Final figure is unchanged at 75.
  ok((d.getElementById("poolInfo").textContent || "").includes("184 question templates"), "course: pool after All preset is the whole bank with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("109 question templates"), "course: pool after Mid preset is Units 1 to 4 with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: mid preset mix 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 4",
     "course: face scope for the mid scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("75 question templates"), "course: pool after Final preset is Units 5 to 9 with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: final preset mix 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "End-of-course review: Units 5 to 9",
     "course: face scope for the final scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 3, "course: per-unit reference panels for Units 1, 3 and 9 only, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  const p2 = ev(r.dom, "refPanelsHtml([2])");
  ok(!p2.includes("Formulas and facts"), "course: a Unit 2 selection shows no reference panel (no unit panel, no always-on panel)");
  ok(ev(r.dom, "refPanelsHtml([1])").includes("Formulas and facts for Unit 1: Trigonometry") && ev(r.dom, "refPanelsHtml([1])").includes("sin A"),
     "course: a Unit 1 selection shows its unit panel with the standalone's content");
  ok(ev(r.dom, "refPanelsHtml([9])").includes("Formulas and facts for Unit 9: Sequences and Series"),
     "course: a Unit 9 selection shows its unit panel");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot ---
  r = await boot("course=math-2200&teacher=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true || (d.getElementById("teacherNote") && !d.getElementById("teacherNote").hidden), "teacher: teacher mode on");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(d.getElementById("advToolsBtn") && d.getElementById("advToolsBtn").hidden, "teacher: Advanced tools button hidden (already on)");
  ok(!d.getElementById("advBox"), "teacher: no Advanced options section in the builder (it lives in the set's teacher bar)");
  ok(!!d.getElementById("advToolsOff"), "teacher: Turn off advanced tools link present");
  ok(d.getElementById("presetFinal").style.display !== "none", "teacher: Final preset button visible");
  ok(r.errors.length === 0, "teacher: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- bare URL: the canonical picker (regrouped Nov 12, 2026, with filter chips) ---
  r = await boot("");
  d = r.dom.window.document;
  ok(ev(r.dom, "window.__NOCOURSE === true") === true, "picker: bare URL shows the course picker");
  const heads = Array.prototype.slice.call(d.querySelectorAll("#courseList h3")).map(h => h.textContent);
  ok(heads.length === 4 && heads[0] === "Mathematics" && heads[1] === "Science" && heads[2] === "Mathématiques" && heads[3] === "Sciences", "picker: groups are Mathematics, Science, Mathématiques, Sciences, saw " + heads.join(", "));
  const btns = Array.prototype.slice.call(d.querySelectorAll("#courseList button")).map(b => b.textContent);
  /* Picker pins updated: 29 courses are listed after the Nov 16, 2026 French junior science listing, so the exact list, the Science chip set, the Grade 11 subset and the reset count in this block pin 29. */
  const expect = ["Math 3200", "Math 3201", "Math 3202", "Math 3208", "Math 2200", "Math 2201", "Math 2202", "Math 1201", "Math 1202", "Math 9", "Math 8", "Math 7", "Biology 3201", "Chemistry 3202", "Physics 3204", "Earth Systems 3209", "Biology 2201", "Chemistry 2202", "Physics 2204", "Science 1206", "Science 9", "Science 8", "Science 7", "Mathématiques 9", "Mathématiques 8", "Mathématiques 7", "Sciences 9", "Sciences 8", "Sciences 7"];
  ok(btns.length === expect.length && btns.every((t, i) => t === expect[i]), "picker: the 29 listed courses in the ruled order, saw " + btns.join(" | "));
  ok(btns[btns.length - 4] === "Mathématiques 7" && btns[btns.length - 1] === "Sciences 7", "picker: Math 7 FR ends the Mathématiques group and Sciences 7 FR is listed, last, under Sciences");
  const chipRows = d.querySelectorAll("#pkChips .pkrow");
  ok(chipRows.length === 2, "picker: two filter chip rows render, saw " + chipRows.length);
  const subjChips = Array.prototype.slice.call(chipRows[0].querySelectorAll("button")).map(b => b.textContent);
  ok(subjChips.join() === "All,Mathematics,Science,Mathématiques,Sciences", "picker: subject chips are All, Mathematics, Science, Mathématiques, Sciences, saw " + subjChips.join(", "));
  const gradeChips = Array.prototype.slice.call(chipRows[1].querySelectorAll("button")).map(b => b.textContent);
  ok(gradeChips.join() === "All,Grade 12,Grade 11,Grade 10,Grade 9,Grade 8,Grade 7", "picker: grade chips descend 12 to 7, saw " + gradeChips.join(", "));
  const visBtns = () => Array.prototype.slice.call(d.querySelectorAll("#courseList button")).filter(b => b.style.display !== "none").map(b => b.textContent);
  const clickChip = (row, text) => { const bs = chipRows[row].querySelectorAll("button"); for (const b of bs) if (b.textContent === text) { b.click(); return; } };
  clickChip(0, "Science");
  ok(visBtns().join() === "Biology 3201,Chemistry 3202,Physics 3204,Earth Systems 3209,Biology 2201,Chemistry 2202,Physics 2204,Science 1206,Science 9,Science 8,Science 7", "picker: the Science chip leaves the eleven science courses, saw " + visBtns().join(", "));
  clickChip(1, "Grade 11");
  ok(visBtns().join() === "Biology 2201,Chemistry 2202,Physics 2204", "picker: Science plus Grade 11 leaves three courses, saw " + visBtns().join(", "));
  clickChip(0, "All"); clickChip(1, "All");
  ok(visBtns().length === 29, "picker: resetting both chips restores all 29");
  ok(d.title === "Review Apps", "picker: page title is Review Apps, saw " + d.title);
  const pkH1 = d.querySelector("#coursePicker h1");
  ok(!!pkH1 && pkH1.textContent === "Review Apps", "picker: the heading reads Review Apps");
  ok((d.querySelector("#coursePicker .pktag") || { textContent: "" }).textContent === "Online or Printable Practice Exercises", "picker: the tagline reads Online or Printable Practice Exercises");
  const logo = d.querySelector("#coursePicker img.pklogo");
  ok(!!logo && logo.getAttribute("src") === "cdli-logo.svg" && logo.getAttribute("alt") === "CDLI", "picker: the CDLI logo sits at the head of the page");
  const faqHeads = Array.prototype.slice.call(d.querySelectorAll(".pkfaq summary")).map(x => x.textContent);
  ok(faqHeads.join() === ["What are the Review Apps?", "Who are they for?", "When should I use them?", "Where can I use them?", "Why does practice work?", "How should I practise?"].join(), "picker: the About card carries the five Ws plus How, saw " + faqHeads.join(" | "));
  ok((d.querySelector("#coursePicker .card h2") || { textContent: "" }).textContent === "Choose your course", "picker: the courses card heads Choose your course");
  ok(r.errors.length === 0, "picker: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT-MATH-2200: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
