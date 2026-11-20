#!/usr/bin/env node
/* Gates 3 and 4 (jsdom boot + teacher smoke), mirroring the Physics 2204
   teacher harnesses:
     node tests/gate-boot.js     (NODE_PATH set to the 2204 node_modules)
   - ?course=physics-3204: Physics 3204 title and header, four unit
     checkboxes with the right names, bank loaded, working pool count.
   - bare URL and ?course=bogus: the course picker shows with a Physics
     3204 link and the builder does not boot.
   - ?course=physics-3204&teacher=1: teacher mode on, teacher note
     visible, gated controls kept; without the flag the gated controls
     are removed (the tGateStudentUI student path). */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function boot(qs, langPreset) {
  return new Promise((resolve) => {
    const errors = [];
    const { VirtualConsole } = require("jsdom");
    const vc = new VirtualConsole();
    vc.on("jsdomError", e => errors.push(String(e.detail && e.detail.message || e.message || e)));
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; if (langPreset) { Object.defineProperty(w.navigator, "language", { value: langPreset, configurable: true }); Object.defineProperty(w.navigator, "languages", { value: [langPreset], configurable: true }); } }
    });
    setTimeout(() => resolve({ dom, errors }), 2000);
  });
}
const ev = (dom, code) => dom.window.eval(code);

(async () => {
  // --- course boot ---
  let r = await boot("course=physics-3204");
  let d = r.dom.window.document;
  ok(r.dom.window.document.title === "Physics 3204 Review: Practice Question Bank", "course: page title, saw " + r.dom.window.document.title);
  ok(d.querySelector("#app h1").textContent === "Physics 3204 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off");
  ok(ev(r.dom, "BANK.length") === 185, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  /* Pin update, November 20, 2026 (reverse bimodal registration): CR_MARKS count updated to 124 after the registration of the 82 strippable entries (52 class a, 30 class b) per Bimodal-Classification-SR-Pools-Science-2026-11-20.md (Physics 3204: CR manifest 124 entries, 42 pre-existing plus 82 registered); verified from the assembled bank the same day. */
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 124, "course: CR_MARKS wired from the bank module");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 4, "course: four unit checkboxes, saw " + labels.length);
  ["Motion", "Forces", "Fields", "Introduction to Quantum Physics"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 and 2)", "course: mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 3 and 4)", "course: final preset label, saw " + d.getElementById("presetFinal").textContent);
  ev(r.dom, "setPreset([1,2,3,4])");
  ok((d.getElementById("poolInfo").textContent || "").includes("185 question templates"), "course: pool count after All preset, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([3,4])");
  ok((d.getElementById("poolInfo").textContent || "").includes("best guess"), "course: final note shown with the final scope");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot ---
  r = await boot("course=physics-3204&teacher=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true, "teacher: TEACHER flag on");
  ok(typeof ev(r.dom, "tGateStudentUI") === "function" || ev(r.dom, "typeof tGateStudentUI") === "function", "teacher: tGateStudentUI present");
  ok(d.getElementById("teacherNote") && d.getElementById("teacherNote").hidden === false, "teacher: teacher note visible");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(d.getElementById("advToolsBtn") && d.getElementById("advToolsBtn").hidden, "teacher: Advanced tools button hidden (already on)");
  ok(!d.getElementById("advBox"), "teacher: no Advanced options section in the builder (it lives in the set's teacher bar)");
  ok(!!d.getElementById("advToolsOff"), "teacher: Turn off advanced tools link present");
  ok(d.getElementById("mcCountIn") !== null, "teacher: gated controls kept");
  ok(ev(r.dom, "BANK.length") === 185, "teacher: bank loaded");
  ok(r.errors.length === 0, "teacher: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- bare URL: the canonical picker (regrouped Nov 12, 2026, with filter chips) ---
  r = await boot("");
  d = r.dom.window.document;
  ok(ev(r.dom, "window.__NOCOURSE === true") === true, "picker: bare URL shows the course picker");
  const heads = Array.prototype.slice.call(d.querySelectorAll("#courseList h3")).map(h => h.textContent);
  ok(heads.length === 4 && heads[0] === "Mathematics" && heads[1] === "Science" && heads[2] === "Mathématiques" && heads[3] === "Sciences", "picker: groups are Mathematics, Science, Mathématiques, Sciences, saw " + heads.join(", "));
  const btns = Array.prototype.slice.call(d.querySelectorAll("#courseList button")).map(b => b.textContent);
  /* Picker pins updated: 29 courses are listed after the Nov 16, 2026 French junior science listing, so the exact list, the Science chip set and the reset count in this block pin 29. */
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

  // --- home page language toggle (Nov 18, 2026): every home string renders once, in the active language ---
  const langBtn = d.getElementById("pkLang");
  ok(!!langBtn && langBtn.textContent === "Français", "picker lang: the toggle sits beside the theme toggle and offers Français in English mode, saw " + (langBtn && langBtn.textContent));
  ok(d.documentElement.lang === "en", "picker lang: the page language is en in English mode, saw " + d.documentElement.lang);
  langBtn.click();
  ok(d.documentElement.lang === "fr", "picker lang: the page language follows the toggle to fr, saw " + d.documentElement.lang);
  ok(langBtn.textContent === "English", "picker lang: the toggle offers English in French mode, saw " + langBtn.textContent);
  ok((d.querySelector("#coursePicker .pktag") || { textContent: "" }).textContent === "Exercices de pratique en ligne ou à imprimer", "picker lang: the tagline renders in French");
  ok((d.getElementById("pkWhatsNew") || { textContent: "" }).textContent === "Nouveautés", "picker lang: What's new renders in French");
  ok((d.getElementById("pkTheme") || { textContent: "" }).textContent === "Mode sombre", "picker lang: the theme toggle label renders in French, saw " + (d.getElementById("pkTheme") || {}).textContent);
  ok((coursesCard.querySelector("h2") || { textContent: "" }).textContent === "Choisissez votre cours", "picker lang: the courses card heads Choisissez votre cours");
  const codeCardFr = d.getElementById("pkCodeForm") ? d.getElementById("pkCodeForm").closest(".card") : null;
  ok(!!codeCardFr && codeCardFr.textContent.indexOf("Vous avez un code d’une feuille imprimée ?") >= 0 && codeCardFr.textContent.indexOf("Have a code from a printed sheet?") < 0, "picker lang: the code card renders its heading once, in French");
  ok((d.getElementById("pkCodeBtn") || { textContent: "" }).textContent === "Ouvrir l’ensemble", "picker lang: the Open set button renders in French");
  ok((d.getElementById("pkCodeIn") || { getAttribute: () => "" }).getAttribute("aria-label") === "Code de l’ensemble", "picker lang: the code input label renders in French");
  const faqHeadsFr = Array.prototype.slice.call(d.querySelectorAll(".pkfaq summary")).map(x => x.textContent);
  ok(faqHeadsFr.join() === ["Que sont les Review Apps ?", "À qui s’adressent-elles ?", "Quand devrais-je les utiliser ?", "Où puis-je les utiliser ?", "Pourquoi la pratique fonctionne-t-elle ?", "Comment devrais-je pratiquer ?"].join(), "picker lang: the About card renders its six sections in French, saw " + faqHeadsFr.join(" | "));
  const chipRowsFr = d.querySelectorAll("#pkChips .pkrow");
  ok((chipRowsFr[0].querySelector(".pkLab") || { textContent: "" }).textContent === "Matière :", "picker lang: the subject row label renders in French");
  ok((chipRowsFr[1].querySelector(".pkLab") || { textContent: "" }).textContent === "Niveau :", "picker lang: the grade row label renders in French");
  ok(Array.prototype.slice.call(chipRowsFr[0].querySelectorAll("button")).map(b => b.textContent).join() === "Toutes,Mathematics,Science,Mathématiques,Sciences", "picker lang: subject chips keep the collection names, All becomes Toutes");
  ok(Array.prototype.slice.call(chipRowsFr[1].querySelectorAll("button")).map(b => b.textContent).join() === "Tous,12e année,11e année,10e année,9e année,8e année,7e année", "picker lang: grade chips render as years in French");
  const headsFr = Array.prototype.slice.call(d.querySelectorAll("#courseList h3")).map(h => h.textContent);
  ok(headsFr.join() === heads.join(), "picker lang: course group headings stay as the registered collection names");
  langBtn.click();
  ok(d.documentElement.lang === "en" && (d.querySelector("#coursePicker .pktag") || { textContent: "" }).textContent === "Online or Printable Practice Exercises" && (d.getElementById("pkCodeHead") || { textContent: "" }).textContent === "Have a code from a printed sheet?", "picker lang: toggling back restores English everywhere");
  ok(r.errors.length === 0, "picker: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- French browser language: the home page defaults to French on first visit ---
  r = await boot("", "fr-CA");
  d = r.dom.window.document;
  ok(d.documentElement.lang === "fr", "picker lang default: a French browser language lands on French, saw " + d.documentElement.lang);
  ok((d.querySelector("#coursePicker .pktag") || { textContent: "" }).textContent === "Exercices de pratique en ligne ou à imprimer", "picker lang default: the tagline renders in French by default");
  ok((d.getElementById("pkCodeHead") || { textContent: "" }).textContent === "Vous avez un code d’une feuille imprimée ?", "picker lang default: the code card renders in French by default");
  ok((d.getElementById("pkLang") || { textContent: "" }).textContent === "English", "picker lang default: the toggle offers English");
  ok(r.errors.length === 0, "picker lang default: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
