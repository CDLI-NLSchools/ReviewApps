#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 1201 in the unified shell:
     node tests/gate-boot-math-1201.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-1201: Math 1201 title and header, seven unit
     checkboxes with the standalone's names, the three presets
     with the standalone's labels (markup lines 286 to 288),
     the default 20/60/20 mix, pools 107 (mid) / 120 (final) /
     227 (all; the bank carries three Unit 7 CR entries, one
     Unit 3 CR entry and two Unit 6 CR entries authored Nov 13,
     2026 past the standalone's 149), and face scopes in
     the standalone's wording
     (updateFace, lines 6048 to 6055): "Mid-course review:
     Units 1 to 3" and "Final review: Units 4 to 7", both what
     the shell derives from the preset labels.
   - The face card promises "a worked example and a full worked
     solution" with no hint (this bank carries no hints), and
     the Unit 1 reference panel is the only per-unit panel
     (REF_HTML, line 6043).
   - A mid-scope practice exam renders at 50 marks through the
     app's own exam path; a single-unit exam renders at 25.
   - A practice set renders with no Hint buttons (the hints
     flag is off for this course).
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-1201&teacher=1: teacher mode on. */
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
  // --- course boot, presets, pools, face wording, mid exam ---
  let r = await boot("course=math-1201");
  let d = r.dom.window.document;
  ok(d.title === "Math 1201 Review: Practice Question Bank", "course: page title, saw " + d.title);
  ok(d.querySelector("#app h1").textContent === "Math 1201 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 227, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 79, "course: CR_MARKS wired from the bank module");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 7, "course: seven unit checkboxes, saw " + labels.length);
  ["Measurement", "Roots and Powers", "Factors and Products", "Relations and Functions",
   "Linear Functions", "Systems of Linear Equations", "Trigonometry"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 to 3)", "course: Mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 4 to 7)", "course: Final preset label, saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetAll").textContent === "All units", "course: All preset label, saw " + d.getElementById("presetAll").textContent);
  ok(d.getElementById("presetMid").style.display !== "none" && d.getElementById("presetFinal").style.display !== "none",
     "course: Mid and Final preset buttons both visible (Math 1201 has both presets)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("107 question templates"), "course: pool after Mid preset is 107, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 3",
     "course: face scope for the mid selection matches the standalone, saw: " + d.getElementById("faceScope").textContent);
  ok(d.getElementById("faceDesc").textContent.includes("a worked example and a full worked solution."),
     "course: face card promises the worked example and solution, saw: " + d.getElementById("faceDesc").textContent);
  ok(!d.getElementById("faceDesc").textContent.includes("a hint,"),
     "course: face card promises no hint (this bank carries none)");
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("120 question templates"), "course: pool after Final preset is 120, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Final review: Units 4 to 7",
     "course: face scope for the final selection matches the standalone, saw: " + d.getElementById("faceScope").textContent);
  ev(r.dom, "document.getElementById('presetAll').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("227 question templates"), "course: pool after All preset is the whole bank, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 1, "course: a per-unit reference panel for Unit 1 only, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  ok(ev(r.dom, "refPanelsHtml([1])").includes("Formulas and facts for Unit 1: Measurement") && ev(r.dom, "refPanelsHtml([1])").includes("Surface Area: Sphere"),
     "course: a Unit 1 selection shows its panel with the standalone's content");
  ok(ev(r.dom, "refPanelsHtml([2])") === "", "course: a Unit 2 selection shows no reference panel (no unit panel, no always-on panel)");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- mid-scope exam through the app's own exam path ---
  r = await boot("course=math-1201&preset=mid&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startExam()");
  const midText = d.getElementById("session").textContent || "";
  ok(midText.includes("Total marks: 50"), "mid exam: the paper totals 50 marks, saw: " + midText.slice(0, 200));
  ok(midText.includes("Section B"), "mid exam: the paper carries a constructed-response section");
  ok(r.errors.length === 0, "mid exam: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- one unit: a 25-mark practice test renders ---
  r = await boot("course=math-1201&unit=1&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startExam()");
  const examText = d.getElementById("session").textContent || "";
  ok(examText.includes("Math 1201: Practice Unit Test"), "exam: single-unit paper renders with its title, saw: " + examText.slice(0, 90));
  ok(examText.includes("Total marks: 25"), "exam: the paper totals 25 marks, saw: " + examText.slice(0, 200));
  ok(examText.includes("Section B"), "exam: the paper carries a constructed-response section");
  ok(r.errors.length === 0, "exam: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- a practice set: renders, and no Hint buttons (hints off) ---
  r = await boot("course=math-1201&unit=2&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startOnline()");
  const nQ = ev(r.dom, "current.length");
  ok(nQ > 0, "practice: a set renders, saw " + nQ + " questions");
  ok(d.querySelectorAll("[data-hint]").length === 0, "practice: no Hint buttons (Math 1201 carries no hints and does not set the flag)");
  ok(r.errors.length === 0, "practice: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
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
  r = await boot("course=math-1201&teacher=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true || (d.getElementById("teacherNote") && !d.getElementById("teacherNote").hidden), "teacher: teacher mode on via teacher=1");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(d.getElementById("advToolsBtn") && d.getElementById("advToolsBtn").hidden, "teacher: Advanced tools button hidden (already on)");
  ok(!!d.getElementById("advToolsOff"), "teacher: Turn off advanced tools link present");
  ok(r.errors.length === 0, "teacher: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT-MATH-1201 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log("GATE-BOOT-MATH-1201 ERROR " + (e && e.stack || e)); process.exit(1); });
