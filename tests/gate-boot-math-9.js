#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 9 in the unified shell:
     node tests/gate-boot-math-9.js   (NODE_PATH set to the 2204 node_modules)
   - ?course=math-9: the standalone's title, the short name in
     the header, the LONG name on the face card heading and in
     the subtitle (ruling 5), nine unit checkboxes with the
     standalone's names, the three presets with the standalone's
     labels, the default 20/60/20 mix, pools 139 (mid) / 157
     (final) / 296 (all) since the Math 9 PK tranche of
     November 15, 2026 (105 / 116 / 221 before it; the final
     and all pools rose by 2 more the same day for the two
     ordinary Unit 9 entries added under Jason's Option 1
     ruling on the Math 8 PK tranche), and pools 161 (mid) /
     165 (final) / 326 (all) since the Band 3 Piece 1 fluency
     strand of November 16, 2026 (Unit 1 +22, Unit 5 +5,
     Unit 9 +3 copied entries). The pool line has counted the
     prior-knowledge-off pool since the PK toggle landed (the
     whole-bank figures above predate it; the gate's pool
     assertions were corrected to the PK-off counts on
     November 19, 2026): pools 113 (mid) / 113 (final) / 226
     (all) since the repeat-fix tranche of November 19, 2026
     (eight Level 2 multiple-choice entries added to Unit 2,
     all of them in the mid scope), face
     scopes "Mid-course review:
     Units 1 to 4" and "End-of-course review: Units 5 to 9"
     (refreshFace, lines 7458 to 7459), the face card promising
     "a hint, a worked example and a full worked solution", and
     reference panels for all nine units (REF_HTML, line 7440).
   - Mid and final practice exams render at 35 marks through
     the app's own exam path, with no short-paper heads-up (the
     fallback-total short check); a single-unit test renders
     at 25.
   - A practice set renders a Hint button on every question
     with the staged reveal; the Hint button cycles (a third
     click past the last stage hides the hint, a fourth
     restarts at stage 1, Nov 12 2026); opening the worked
     solution closes that question's hint and worked example,
     and closing the solution does not reopen them (Nov 12
     2026); checking a multiple-choice answer shows the
     chosen option's per-answer feedback under "About your
     answer:" (ruling 1); the worked-solution toggle flips
     its label (ruling 2).
   - Teacher mode: the timer checkbox label and a rendered
     exam's timer bar both carry the timerNote (ruling 3).
   - The same feedback assertion runs against Math 2202: its
     port recorded per-answer feedback as not displayed, and
     ruling 1 reverses that for every course carrying it.
   - bare URL: the canonical picker (Nov 12, 2026):
     Mathematics first, Science second, filter chips;
     this course is listed.
   - ?course=math-9&teacher=1: teacher mode on. */
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

/* Find a rendered MC question whose chosen option's feedback
   has a plain-text fragment (outside any math segment) long
   enough to recognise after stepHTML renders it. */
function findFbQuestion(dom) {
  return ev(dom, "(function(){for(var i=0;i<current.length;i++){var q=current[i];if(q.type!=='mc'||!q.fb||q.fb.length!==4)continue;" +
    "for(var g=0;g<4;g++){var parts=String(q.fb[g]).split('\\\\(');var kept=parts.map(function(p){var k=p.indexOf('\\\\)');return k>=0?p.slice(k+2):p;}).join(' ').replace(/<[^>]+>/g,' ');" +
    "var m=kept.match(/[A-Za-z][A-Za-z ,;:'-]{10,}/);if(m)return {i:i,given:g,frag:m[0].slice(0,24)};}}return null;})()");
}
function checkFeedback(dom, d, tag) {
  const fq = findFbQuestion(dom);
  ok(!!fq, tag + ": the set contains an MC question carrying per-answer feedback");
  if (!fq) return;
  const fbt0 = d.getElementById("fbt" + fq.i);
  ok(!!fbt0 && fbt0.textContent === "", tag + ": the feedback line starts empty");
  const radio = d.querySelector('input[name="opt' + fq.i + '"][value="' + fq.given + '"]');
  ok(!!radio, tag + ": the option's radio input is present");
  if (radio) radio.click();
  const chk = d.querySelector('[data-check="' + fq.i + '"]');
  if (chk) chk.click();
  const fbt = d.getElementById("fbt" + fq.i);
  ok(!!fbt && fbt.textContent.includes("About your answer:"),
     tag + ": checking shows the 'About your answer' line (ruling 1), saw: " + (fbt ? fbt.textContent.slice(0, 90) : "no element"));
  ok(!!fbt && fbt.textContent.includes(fq.frag),
     tag + ": the line carries the chosen option's own feedback text");
}

(async () => {
  // --- course boot, names, presets, pools, face wording, panels ---
  let r = await boot("course=math-9");
  let d = r.dom.window.document;
  ok(d.title === "Math 9 Review: Practice Question Bank", "course: page title (short name), saw " + d.title);
  ok(d.querySelector("#app h1").textContent === "Math 9 Review", "course: header keeps the short name, saw " + d.querySelector("#app h1").textContent);
  ok(d.getElementById("appSubName").textContent === "Mathematics 9",
     "course: subtitle uses the long name (ruling 5), saw " + d.getElementById("appSubName").textContent);
  ok(d.getElementById("faceTitle").textContent === "Mathematics 9 Review",
     "course: face card heading uses the long name (ruling 5), saw " + d.getElementById("faceTitle").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (an unlisted course still boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 334, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 111, "course: CR_MARKS wired from the bank module (111 keys since the Option 1 Unit 9 additions of November 15, 2026)");
  ok(ev(r.dom, "BANK.every(function(e){return !!e.hint1 && !!e.hint2;})") === true, "course: every bank entry carries both hint stages in the shell");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 9, "course: nine unit checkboxes, saw " + labels.length);
  ["Rational Numbers", "Square Roots and Surface Area", "Powers and Exponent Laws", "Polynomials",
   "Linear Equations and Inequalities", "Linear Relations", "Similarity and Transformations",
   "Circle Geometry", "Probability and Statistics"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 to 4)", "course: Mid preset label, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 5 to 9)", "course: Final preset label, saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetAll").textContent === "All units", "course: All preset label, saw " + d.getElementById("presetAll").textContent);
  ok(d.getElementById("presetMid").style.display !== "none" && d.getElementById("presetFinal").style.display !== "none",
     "course: Mid and Final preset buttons both visible (Math 9 has both presets)");
  ok(ev(r.dom, "settings().mix.join()") === "20,60,20", "course: default level mix is 20/60/20, saw " + ev(r.dom, "settings().mix.join()"));
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("113 question templates"), "course: pool after Mid preset is 113, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 4",
     "course: face scope for the mid selection matches the standalone, saw: " + d.getElementById("faceScope").textContent);
  ok(d.getElementById("faceDesc").textContent.includes("a hint, a worked example and a full worked solution."),
     "course: face card promises the hint, saw: " + d.getElementById("faceDesc").textContent);
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("113 question templates"), "course: pool after Final preset is 113, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "End-of-course review: Units 5 to 9",
     "course: face scope for the final selection matches the standalone, saw: " + d.getElementById("faceScope").textContent);
  ev(r.dom, "document.getElementById('presetAll').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("226 question templates"), "course: pool after All preset is 226 with prior knowledge off, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(ev(r.dom, "Object.keys(REF_HTML).length") === 9, "course: per-unit reference panels for all nine units, saw " + ev(r.dom, "Object.keys(REF_HTML).length"));
  ok(ev(r.dom, "refPanelsHtml([1])").includes("Formulas and facts for Unit 1: Rational Numbers") && ev(r.dom, "refPanelsHtml([1])").includes("can be written as a fraction"),
     "course: a Unit 1 selection shows its panel with the standalone's content");
  ok(ev(r.dom, "refPanelsHtml([9])").includes("Formulas and facts for Unit 9: Probability and Statistics"),
     "course: a Unit 9 selection shows its panel");
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(!d.getElementById("advBox") && !d.getElementById("lv1") && !d.getElementById("timerChk"), "course (student): no Advanced options section or level/timer inputs in the builder");
  ok(d.getElementById("mcCountIn") === null, "course (student): teacher-gated controls removed by tGateStudentUI");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- mid and final exams through the app's own exam path ---
  for (const [qs, tag] of [["course=math-9&preset=mid&nostart=1", "mid exam"], ["course=math-9&preset=final&nostart=1", "final exam"]]) {
    r = await boot(qs);
    d = r.dom.window.document;
    ev(r.dom, "startExam()");
    const t = d.getElementById("session").textContent || "";
    ok(t.includes("Total marks: 35"), tag + ": the paper totals 35 marks, saw: " + t.slice(0, 200));
    ok(t.includes("Section B"), tag + ": the paper carries a constructed-response section");
    ok(!t.includes("could not fill every exam slot"), tag + ": no short-paper heads-up on a full paper (the fallback-total short check)");
    ok(r.errors.length === 0, tag + ": no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
    r.dom.window.close();
  }

  // --- one unit: a 25-mark practice test renders ---
  r = await boot("course=math-9&unit=1&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startExam()");
  const examText = d.getElementById("session").textContent || "";
  ok(examText.includes("Math 9: Practice Unit Test"), "exam: single-unit paper renders with its title, saw: " + examText.slice(0, 90));
  ok(examText.includes("Total marks: 25"), "exam: the paper totals 25 marks, saw: " + examText.slice(0, 200));
  ok(examText.includes("Section B"), "exam: the paper carries a constructed-response section");
  ok(r.errors.length === 0, "exam: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- a practice set: hints, feedback (ruling 1), solution flip (ruling 2) ---
  r = await boot("course=math-9&unit=2&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "document.getElementById('countIn').value='30'");
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
  hintBtns[0].click();
  ok(box0 && box0.hidden && box0.dataset.stage === "0", "hints: third click, past the last stage, hides the hint and resets the stage (Hint cycle, Nov 12 2026)");
  hintBtns[0].click();
  ok(box0 && !box0.hidden && box0.dataset.stage === "1" && box0.innerHTML.includes("<b>Hint:</b>") && !box0.innerHTML.includes("<b>First step:</b>"),
     "hints: fourth click restarts the cycle at stage 1");
  const exBtn = d.querySelector('[data-ex="0"]');
  ok(!!exBtn && exBtn.textContent === "See a worked example", "example toggle: starts as 'See a worked example'");
  if (exBtn) {
    exBtn.click();
    ok(!d.getElementById("ex0").hidden && exBtn.textContent === "Hide worked example", "example toggle: the worked example opens");
  }
  const solBtn = d.querySelector('[data-sol="0"]');
  ok(!!solBtn && solBtn.textContent === "Show worked solution", "solution toggle: starts as 'Show worked solution'");
  if (solBtn) {
    solBtn.click();
    ok(solBtn.textContent === "Hide worked solution", "solution toggle: flips to 'Hide worked solution' while open (ruling 2), saw " + solBtn.textContent);
    ok(d.getElementById("sol0").classList.contains("show"), "solution toggle: the solution opens");
    ok(box0.hidden && box0.dataset.stage === "0", "solution toggle: opening the solution hides the hint and resets its stage (Nov 12 2026)");
    ok(d.getElementById("ex0").hidden && exBtn.textContent === "See a worked example",
       "solution toggle: opening the solution closes the worked example and resets its label (Nov 12 2026)");
    solBtn.click();
    ok(solBtn.textContent === "Show worked solution" && !d.getElementById("sol0").classList.contains("show"),
       "solution toggle: flips back to 'Show worked solution' and closes");
    ok(box0.hidden && d.getElementById("ex0").hidden, "solution toggle: closing the solution does not reopen the hint or the example");
  }
  checkFeedback(r.dom, d, "feedback (math-9)");
  ok(r.errors.length === 0, "practice: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- ruling 1 reaches an applied course: Math 2202 feedback ---
  r = await boot("course=math-2202&unit=2&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "document.getElementById('countIn').value='30'");
  ev(r.dom, "startOnline()");
  checkFeedback(r.dom, d, "feedback (math-2202, ruling 1 applied course)");
  ok(r.errors.length === 0, "feedback (math-2202): no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot: timer note in the checkbox label and the timer bar ---
  r = await boot("course=math-9&teacher=1&unit=1&nostart=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true || (d.getElementById("teacherNote") && !d.getElementById("teacherNote").hidden), "teacher: teacher mode on via teacher=1");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(d.getElementById("advToolsBtn") && d.getElementById("advToolsBtn").hidden, "teacher: Advanced tools button hidden (already on)");
  ok(!!d.getElementById("advToolsOff"), "teacher: Turn off advanced tools link present");
  ev(r.dom, "startOnline()");
  const timerChk = d.getElementById("timerChk");
  ok(!!timerChk, "teacher: the exam timer checkbox renders in the set's Advanced options");
  if (timerChk) {
    const lab = timerChk.closest("label");
    ok(!!lab && lab.textContent.includes("Show the exam timer on practice exams (it counts up; the real exam allows 1 hour 30 minutes)"),
       "teacher: the timer checkbox label carries the timerNote (ruling 3), saw: " + (lab ? lab.textContent.trim() : "no label"));
    timerChk.click();
    ev(r.dom, "startExam()");
    const bar = d.getElementById("examTimer");
    ok(!!bar, "teacher: the exam timer bar renders when the timer is on");
    ok(!!bar && bar.textContent.includes("The real exam allows 1 hour 30 minutes. This timer is just a guide."),
       "teacher: the timer bar carries the timerNote (ruling 3), saw: " + (bar ? bar.textContent : "no bar"));
    const t2 = d.getElementById("session").textContent || "";
    ok(t2.includes("Total marks: 25"), "teacher: the unit test still totals 25 marks");
  }
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

  console.log("GATE-BOOT-MATH-9 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log("GATE-BOOT-MATH-9 ERROR " + (e && e.stack || e)); process.exit(1); });
