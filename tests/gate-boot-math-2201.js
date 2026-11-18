#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 2201 in the unified shell:
     node tests/gate-boot-math-2201.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-2201: Math 2201 title and header, eight unit
     checkboxes with the right names, both preset labels (the mid
     label carries the standalone's Section 4.3 scope note, the
     final label its en dash range), the All preset sweeping all
     eight units (pool 234), the default mix 20/60/20 in force,
     the mid preset over Units 1 to 4 WITH the mid-course cap on
     (pool 109, the pool line carrying the standalone's held-out
     note, settingsToURL serializing preset=mid only while the
     cap is on), a hand-picked Units 1 to 4 selection uncapped
     (pool 114, no note, serialized as plain units), the final
     preset over Units 5 to 8 (pool 120) with the face scopes in
     the standalone's wording, and reference panels for Units 1,
     3 and 5 only, with no always-on panel.
   Pool pins amended November 15, 2026 for the PK tranche (the
   bank grows 236 to 295; pools through the shell's own poolFor):
   All 293, Mid 137, Final 151, manual Units 1 to 4 142, preset
   link capped 137. The changes are deliberate, of the same class
   as the gate-load and gate-enrichment pin updates in the same
   pass, and are recorded in the tranche build report.
   - ?course=math-2201&preset=mid: the cap arrives on, as the
     standalone's preset=mid link sets it.
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-2201&teacher=1: teacher mode on. */
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
const MID_LABEL = "Mid-course review (Units 1\u20134, Radicals to 4.3)";
const FINAL_LABEL = "Final review (Units 5\u20138)";
const MID_NOTE = "Mid-course scope: Unit 4 stops at Section 4.3, so the Radical Equations questions are held out.";

(async () => {
  // --- course boot ---
  let r = await boot("course=math-2201");
  let d = r.dom.window.document;
  ok(r.dom.window.document.title === "Math 2201 Review: Practice Question Bank", "course: page title, saw " + r.dom.window.document.title);
  ok(d.querySelector("#app h1").textContent === "Math 2201 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 492, "course: bank loaded via the loader (492 since the Unit 4 external drafting tranche, Nov 18, 2026; 471 since the Unit 3 expansion, Nov 18, 2026; 455 since the Unit 2 expansion, Nov 18, 2026; 395 since sequence-rebuild batch D, Nov 17, 2026; 385 since the strip-audit entry, Nov 17, 2026; 384 since the Unit 1 enrichment, Nov 17, 2026; 295 since the PK tranche, Nov 15, 2026; 236 before it), BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 259, "course: CR_MARKS wired from the bank module (259 since the Unit 4 external drafting tranche, Nov 18, 2026; 253 since the Unit 3 expansion, Nov 18, 2026; 244 since the Unit 2 expansion, Nov 18, 2026; 224 since sequence-rebuild batch D, Nov 17, 2026; 218 before it)");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 8, "course: eight unit checkboxes, saw " + labels.length);
  ["Acute Triangle Trigonometry", "Quadratic Functions", "Quadratic Equations",
   "Radicals", "Statistical Reasoning", "Proportional Reasoning",
   "Inductive and Deductive Reasoning", "Properties of Angles and Triangles"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === MID_LABEL, "course: mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === FINAL_LABEL, "course: final preset label, saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetFinal").style.display !== "none", "course: Final preset button visible (this course has a final preset)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is the chassis default 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetAll').click()");
  // Pool figures amended Nov 18, 2026: the prior knowledge switch moved
  // into the builder, defaults off, and the pool line counts the pool
  // the switch leaves, so each figure in this file drops the
  // selection's prior knowledge entries (109 across the bank: 74 in
  // Units 1 to 4, 35 in Units 5 to 8). With the switch on the figures
  // are the earlier ones: 490, 334, 151, 339 and 334.
  ok((d.getElementById("poolInfo").textContent || "").includes("381 question templates"), "course: pool after All preset is the whole bank with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().midCap") === false, "course: All preset leaves the mid-course cap off");

  // mid preset: cap on, capped pool, the note, preset serialization
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok(ev(r.dom, "settings().midCap") === true, "course: Mid preset switches the mid-course cap on");
  ok((d.getElementById("poolInfo").textContent || "").includes("260 question templates"), "course: pool after Mid preset is Units 1 to 4 minus the five held-out entries, with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok((d.getElementById("poolInfo").textContent || "").includes(MID_NOTE), "course: pool line carries the standalone's held-out note while the cap is on");
  ok(ev(r.dom, "settingsToURL()").includes("preset=mid"), "course: settings link serializes preset=mid while the cap is on, saw " + ev(r.dom, "settingsToURL()"));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 4",
     "course: face scope for the mid scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);

  // final preset
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("116 question templates"), "course: pool after Final preset is Units 5 to 8 with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "settings().midCap") === false, "course: Final preset leaves the cap off");
  ok(!(d.getElementById("poolInfo").textContent || "").includes(MID_NOTE), "course: the held-out note is gone once the cap is off");
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Final review: Units 5 to 8",
     "course: face scope for the final scope in the standalone's wording, saw: " + d.getElementById("faceScope").textContent);
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 3, "course: per-unit reference panels for Units 1, 3 and 5 only, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  const p2 = ev(r.dom, "refPanelsHtml([2])");
  ok(!p2.includes("Formulas and facts"), "course: a Unit 2 selection shows no reference panel (no unit panel, no always-on panel)");
  ok(ev(r.dom, "refPanelsHtml([1])").includes("Formulas and facts for Unit 1: Acute Triangle Trigonometry") && ev(r.dom, "refPanelsHtml([1])").includes("sin A"),
     "course: a Unit 1 selection shows its unit panel with the standalone's content");
  ok(ev(r.dom, "refPanelsHtml([5])").includes("Formulas and facts for Unit 5: Statistical Reasoning"),
     "course: a Unit 5 selection shows its unit panel");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- hand-picked Units 1 to 4: no cap, plain-unit serialization ---
  // (In these URL boots the pool line is refreshed once after the
  // settle: jsdom runs document.write scripts late, so at the
  // boot sequence's own updatePoolInfo the bank is not loaded yet
  // and the line renders empty-selection; a shipping browser runs
  // the written bank script in order, before that call. The state
  // assertions below read the applied settings directly.)
  r = await boot("course=math-2201&unit=1,2,3,4&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "updatePoolInfo()");
  ok(ev(r.dom, "settings().midCap") === false, "manual: a unit=1,2,3,4 link boots uncapped");
  ok((d.getElementById("poolInfo").textContent || "").includes("265 question templates"), "manual: pool is all of Units 1 to 4 with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(!(d.getElementById("poolInfo").textContent || "").includes(MID_NOTE), "manual: no held-out note while uncapped");
  ok(!ev(r.dom, "settingsToURL()").includes("preset=mid") && ev(r.dom, "settingsToURL()").includes("unit=1%2C2%2C3%2C4"),
     "manual: settings link serializes plain units, not preset=mid, saw " + ev(r.dom, "settingsToURL()"));
  ok(r.errors.length === 0, "manual: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- preset=mid link: the cap arrives on ---
  r = await boot("course=math-2201&preset=mid&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "updatePoolInfo()");
  ok(ev(r.dom, "settings().midCap") === true, "preset link: a preset=mid link boots with the cap on");
  ok((d.getElementById("poolInfo").textContent || "").includes("260 question templates"), "preset link: capped pool with the PK switch off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(r.errors.length === 0, "preset link: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot ---
  r = await boot("course=math-2201&teacher=1");
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
  const coursesCard = d.getElementById("courseList") ? d.getElementById("courseList").closest(".card") : null;
  ok(!!coursesCard && (coursesCard.querySelector("h2") || { textContent: "" }).textContent === "Choose your course", "picker: the courses card heads Choose your course");
  ok(r.errors.length === 0, "picker: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT-MATH-2201: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
