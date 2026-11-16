#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 3208 in the unified shell:
     node tests/gate-boot-math-3208.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-3208: Math 3208 title and header, eight unit
     checkboxes with the right names, both preset labels, the All
     preset sweeping all eight units (pool 169), the course default
     mix 20/60/20 in force, the mid preset over Units 1 to 4 XX
     74) with the face scope worded "Mid-course review: Units 1 to
     4", the final preset over Units 5 to 8 (pool 60) with the face
     scope worded "End-of-course review: Units 5 to 8" as the
     standalone words it, and reference panels: the three always-on
     panels (Quadratic Formula, Trigonometry, Double Angle
     Formulae) present for any selection, per-unit panels for
     Units 5, 6 and 8 only.
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-3208&teacher=1: teacher mode on. */
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
  let r = await boot("course=math-3208");
  let d = r.dom.window.document;
  ok(r.dom.window.document.title === "Math 3208 Review: Practice Question Bank", "course: page title, saw " + r.dom.window.document.title);
  ok(d.querySelector("#app h1").textContent === "Math 3208 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 169, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 103, "course: CR_MARKS wired from the bank module");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 8, "course: eight unit checkboxes, saw " + labels.length);
  ["Pre-Calculus", "Limits and Continuity", "Rational Functions", "Derivatives",
   "Applications of Derivatives", "Calculus of Trigonometry",
   "Calculus of Exponential, Logarithmic, and Hyperbolic Trigonometric Functions",
   "Antidifferentiation and Integration"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 to 4)", "course: mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 5 to 8)", "course: final preset label, saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetFinal").style.display !== "none", "course: Final preset button visible (this course has a final preset)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is the course default 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetAll').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("169 question templates"), "course: pool after All preset is the whole bank, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("93 question templates"), "course: pool after Mid preset is Units 1 to 4, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: mid preset mix 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 4",
     "course: face scope for the mid scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("76 question templates"), "course: pool after Final preset is Units 5 to 8, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: final preset mix 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "End-of-course review: Units 5 to 8",
     "course: face scope for the final scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 3, "course: per-unit reference panels for Units 5, 6 and 8 only, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  const p1 = ev(r.dom, "refPanelsHtml([1])");
  ok(p1.includes("Quadratic Formula") && p1.includes("Trigonometry") && p1.includes("Double Angle Formulae") && !p1.includes("Formulas and facts"),
     "course: a Unit 1 selection shows the three always-on panels and no unit panel");
  ok(ev(r.dom, "refPanelsHtml([5])").includes("Formulas and facts for Unit 5: Applications of Derivatives") && ev(r.dom, "refPanelsHtml([5])").includes("Volume and Area"),
     "course: a Unit 5 selection shows its unit panel with the standalone's content");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot ---
  r = await boot("course=math-3208&teacher=1");
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
  ok(heads.length === 3 && heads[0] === "Mathematics" && heads[1] === "Science" && heads[2] === "Mathématiques", "picker: groups are Mathematics, Science, Mathématiques, saw " + heads.join(", "));
  const btns = Array.prototype.slice.call(d.querySelectorAll("#courseList button")).map(b => b.textContent);
  /* Picker pins updated: 26 courses are listed after the Nov 15, 2026 joint junior science listing, so the exact list, the Science chip set, the Grade 11 subset and the reset count in this block pin 26. */
  const expect = ["Math 3200", "Math 3201", "Math 3202", "Math 3208", "Math 2200", "Math 2201", "Math 2202", "Math 1201", "Math 1202", "Math 9", "Math 8", "Math 7", "Biology 3201", "Chemistry 3202", "Physics 3204", "Earth Systems 3209", "Biology 2201", "Chemistry 2202", "Physics 2204", "Science 1206", "Science 9", "Science 8", "Science 7", "Mathématiques 9", "Mathématiques 8", "Mathématiques 7"];
  ok(btns.length === expect.length && btns.every((t, i) => t === expect[i]), "picker: the 26 listed courses in the ruled order, saw " + btns.join(" | "));
  ok(btns[btns.length - 1] === "Mathématiques 7", "picker: Math 7 FR is listed, last, under Mathématiques");
  const chipRows = d.querySelectorAll("#pkChips .pkrow");
  ok(chipRows.length === 2, "picker: two filter chip rows render, saw " + chipRows.length);
  const subjChips = Array.prototype.slice.call(chipRows[0].querySelectorAll("button")).map(b => b.textContent);
  ok(subjChips.join() === "All,Mathematics,Science,Mathématiques", "picker: subject chips are All, Mathematics, Science, Mathématiques, saw " + subjChips.join(", "));
  const gradeChips = Array.prototype.slice.call(chipRows[1].querySelectorAll("button")).map(b => b.textContent);
  ok(gradeChips.join() === "All,Grade 12,Grade 11,Grade 10,Grade 9,Grade 8,Grade 7", "picker: grade chips descend 12 to 7, saw " + gradeChips.join(", "));
  const visBtns = () => Array.prototype.slice.call(d.querySelectorAll("#courseList button")).filter(b => b.style.display !== "none").map(b => b.textContent);
  const clickChip = (row, text) => { const bs = chipRows[row].querySelectorAll("button"); for (const b of bs) if (b.textContent === text) { b.click(); return; } };
  clickChip(0, "Science");
  ok(visBtns().join() === "Biology 3201,Chemistry 3202,Physics 3204,Earth Systems 3209,Biology 2201,Chemistry 2202,Physics 2204,Science 1206,Science 9,Science 8,Science 7", "picker: the Science chip leaves the eleven science courses, saw " + visBtns().join(", "));
  clickChip(1, "Grade 11");
  ok(visBtns().join() === "Biology 2201,Chemistry 2202,Physics 2204", "picker: Science plus Grade 11 leaves three courses, saw " + visBtns().join(", "));
  clickChip(0, "All"); clickChip(1, "All");
  ok(visBtns().length === 26, "picker: resetting both chips restores all 26");
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

  console.log("GATE-BOOT-MATH-3208: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
