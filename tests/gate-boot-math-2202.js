#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 2202 in the unified shell:
     node tests/gate-boot-math-2202.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-2202: Math 2202 title and header, eight unit
     checkboxes with the standalone's names, the single "All
     units" preset (Mid and Final hidden: this course has no
     such presets), the All pool at 255, the face card listing
     all eight units in the standalone's wording and promising
     "a hint, a worked example and a full worked solution", and
     reference panels for Units 2, 3, 6 and 7 only.
   - A practice set renders a Hint button on every question and
     the staged reveal works (first click the strategy hint,
     second the first step), as the standalone's does.
   - Practice tests: with several units selected, startExam
     shows the standalone's one-unit-at-a-time message; with
     exactly one unit it renders an 18-mark practice test.
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-2202&teacher=1: teacher mode on. */
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
const REFUSAL = "Practice tests are built one unit at a time, like the unit tests in the course. Choose exactly one unit above, then make the practice test again. To practise across several units, make a practice sheet instead.";
const FACE_SCOPE = "Unit 1: Drawing and Design; Unit 2: Surface Area; Unit 3: Volume and Capacity; Unit 4: Interpreting Graphs; Unit 5: Budgets; Unit 6: Banking; Unit 7: Slope and Scale; Unit 8: Trigonometry";

(async () => {
  // --- course boot ---
  let r = await boot("course=math-2202");
  let d = r.dom.window.document;
  ok(d.title === "Math 2202 Review: Practice Question Bank", "course: page title, saw " + d.title);
  ok(d.querySelector("#app h1").textContent === "Math 2202 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 255, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 64, "course: CR_MARKS wired from the bank module");
  ok(ev(r.dom, "BANK.every(function(e){return !!e.hint1 && !!e.hint2;})") === true, "course: every bank entry carries both hint stages in the shell");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 8, "course: eight unit checkboxes, saw " + labels.length);
  ["Drawing and Design", "Surface Area", "Volume and Capacity", "Interpreting Graphs",
   "Budgets", "Banking", "Slope and Scale", "Trigonometry"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetAll").textContent === "All units", "course: All preset label, saw " + d.getElementById("presetAll").textContent);
  ok(d.getElementById("presetMid").style.display === "none", "course: Mid preset button hidden (Math 2202 has no mid preset)");
  ok(d.getElementById("presetFinal").style.display === "none", "course: Final preset button hidden (Math 2202 has no final preset)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetAll').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("255 question templates"), "course: pool after All preset is the whole bank, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === FACE_SCOPE,
     "course: face scope lists all eight units in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ok(d.getElementById("faceDesc").textContent.includes("a hint, a worked example and a full worked solution."),
     "course: face card promises the hint, saw: " + d.getElementById("faceDesc").textContent);
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 4, "course: per-unit reference panels for Units 2, 3, 6 and 7 only, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  ok(ev(r.dom, "refPanelsHtml([2])").includes("Formulas and facts for Unit 2: Surface Area") && ev(r.dom, "refPanelsHtml([2])").includes("Surface area, from the course formula sheet"),
     "course: a Unit 2 selection shows its panel with the standalone's content");
  ok(ev(r.dom, "refPanelsHtml([1])") === "", "course: a Unit 1 selection shows no reference panel (no unit panel, no always-on panel)");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");

  // multi-unit practice test: the standalone's refusal message
  ev(r.dom, "startExam()");
  ok((d.getElementById("session").textContent || "").includes(REFUSAL),
     "course: multi-unit practice test shows the standalone's one-unit-at-a-time message");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- one unit: an 18-mark practice test renders ---
  r = await boot("course=math-2202&unit=1&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startExam()");
  const examText = d.getElementById("session").textContent || "";
  ok(examText.includes("Math 2202: Practice Unit Test"), "exam: single-unit paper renders with its title, saw: " + examText.slice(0, 90));
  ok(examText.includes("Total marks: 18"), "exam: the paper totals 18 marks, saw: " + examText.slice(0, 200));
  ok(examText.includes("Section B"), "exam: the paper carries a constructed-response section");
  ok(r.errors.length === 0, "exam: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- a practice set: the staged Hint button on every question ---
  r = await boot("course=math-2202&unit=2&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  const nQ = ev(r.dom, "current.length");
  const hintBtns = d.querySelectorAll("[data-hint]");
  ok(nQ > 0 && hintBtns.length === nQ, "hints: a Hint button renders on every practice question, saw " + hintBtns.length + " buttons over " + nQ + " questions");
  const entry0 = ev(r.dom, "current[0]._entry");
  hintBtns[0].click();
  const box0 = d.getElementById("hint0");
  ok(box0 && !box0.hidden && box0.innerHTML.includes("<b>Hint:</b>"), "hints: first click reveals the hint box with the Hint label");
  ok(box0 && box0.textContent.includes(entry0.hint1.replace(/<[^>]+>/g, "").slice(0, 24)), "hints: first stage shows the entry's own strategy hint");
  hintBtns[0].click();
  ok(box0 && box0.innerHTML.includes("<b>First step:</b>"), "hints: second click adds the First step stage");
  ok(r.errors.length === 0, "hints: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
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

  // --- teacher boot ---
  r = await boot("course=math-2202&teacher=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true || (d.getElementById("teacherNote") && !d.getElementById("teacherNote").hidden), "teacher: teacher mode on via teacher=1");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(d.getElementById("advToolsBtn") && d.getElementById("advToolsBtn").hidden, "teacher: Advanced tools button hidden (already on)");
  ok(!!d.getElementById("advToolsOff"), "teacher: Turn off advanced tools link present");
  ok(r.errors.length === 0, "teacher: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT-MATH-2202 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log("GATE-BOOT-MATH-2202 ERROR " + (e && e.stack || e)); process.exit(1); });
