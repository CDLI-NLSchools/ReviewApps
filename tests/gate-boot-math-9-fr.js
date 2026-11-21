#!/usr/bin/env node
/* Gate 3 (jsdom boot) for Math 9 (French) in the unified shell:
     node tests/gate-boot-math-9-fr.js   (NODE_PATH set to the 2204 node_modules)
   The French student-side string layer (Nov 12, 2026) renders the
   student side in French for a course whose config carries
   language:"fr"; teacher chrome stays English, as in the French
   standalone (math-9-review-fr). Assertions:
   - ?course=math-9-fr: the fork's title, its app name
     "Révision de mathématiques 9" in the header and on the face
     card, the fork's French subtitle paragraph, nine unit
     checkboxes "Unité N : <name>", the French preset labels,
     pools 105 (mid) / 116 (final) / 221 (all) with the French
     pool line, face scopes "Révision de mi-parcours : unités
     1 à 4" and "Révision de fin de cours : unités 5 à 9", the
     face promise of "un indice, un exemple travaillé et une
     solution détaillée complète", French reference panel
     headings.
   - Mid and final practice exams render at 35 marks ("Total
     des points : 35") through the app's own exam path; a
     single-unit test renders at 25 with the French paper title.
   - frParseNum accepts the decimal comma and spaced thousands
     (the fork's parseStudentNum, carried under a prefixed
     name); a typed answer entered with a decimal comma grades
     correct through checkQ; the score line is French.
   - Hints cycle in French ("Indice", "Indice :", "Premier
     pas :"), third click hides; opening the worked solution
     ("Voir la solution détaillée" / "Masquer la solution
     détaillée") closes the hint and the worked example.
   - Checking a multiple-choice answer shows "À propos de ta
     réponse :" with the chosen option's feedback.
   - Teacher mode: the note and the teacher bar stay English;
     the timer checkbox label and timer bar carry the course's
     timerNote inside the English template.
   - bare URL: the canonical picker (Nov 12, 2026 regrouping):
     Mathematics first (12 courses), Science second (Chemistry
     3202, Physics 3204, Chemistry 2202, Physics 2204), no
     Mathématiques group third now that math-9-fr is listed; the
     Subject and Grade filter chips narrow the list live. */
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

function findFbQuestion(dom) {
  return ev(dom, "(function(){for(var i=0;i<current.length;i++){var q=current[i];if(q.type!=='mc'||!q.fb||q.fb.length!==4)continue;" +
    "for(var g=0;g<4;g++){var parts=String(q.fb[g]).split('\\\\(');var kept=parts.map(function(p){var k=p.indexOf('\\\\)');return k>=0?p.slice(k+2):p;}).join(' ').replace(/<[^>]+>/g,' ');" +
    "var m=kept.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ ,;:'-]{10,}/);if(m)return {i:i,given:g,frag:m[0].slice(0,24)};}}return null;})()");
}

(async () => {
  // --- course boot, names, presets, pools, face wording, panels ---
  let r = await boot("course=math-9-fr");
  let d = r.dom.window.document;
  ok(d.title === "Mathématiques 9 : banque de questions d'entraînement", "course: page title is the fork's, saw " + d.title);
  ok(d.querySelector("#app h1").textContent === "Révision de mathématiques 9", "course: header carries the fork's app name, saw " + d.querySelector("#app h1").textContent);
  ok(d.getElementById("faceTitle").textContent === "Révision de mathématiques 9", "course: face card heading carries the app name, saw " + d.getElementById("faceTitle").textContent);
  ok((d.querySelector("#app .sub").textContent || "").includes("Des questions d'entraînement nouvelles pour Mathématiques 9"), "course: subtitle is the fork's French paragraph");
  ok(d.getElementById("appSubName") === null, "course: no English subtitle span survives the French static pass");
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off");
  ok(ev(r.dom, "BANK.length") === 230, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
/* Pin update, November 20, 2026 (reverse bimodal registration, Grade 9): census pins updated to the bank after the registration of the 100 strippable entries (65 class a, 35 class b, 223 marks) per Bimodal-Classification-SR-Pools-Math-2026-11-20.md (Mathématiques 9: CR manifest 206 entries); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 206, "course: CR_MARKS wired from the bank module");
  ok(ev(r.dom, "BANK.every(function(e){return !!e.hint1 && !!e.hint2;})") === true, "course: every bank entry carries both hint stages");
  ok(ev(r.dom, "FR9") === true, "course: the French layer is active (FR9)");
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent.trim());
  ok(labels.length === 9, "course: nine unit checkboxes, saw " + labels.length);
  ["Unité 1 : Les nombres rationnels", "Unité 2 : Les racines carrées et l'aire de la surface",
   "Unité 3 : Les lois des puissances et des exposants", "Unité 4 : Les polynômes",
   "Unité 5 : Les équations et les inéquations linéaires", "Unité 6 : Les relations linéaires",
   "Unité 7 : La similarité et les transformations", "Unité 8 : La géométrie du cercle",
   "Unité 9 : La statistique et la probabilité"].forEach(n =>
    ok(labels.some(t => t === n), "course: unit checkbox for " + n));
  ok(d.getElementById("presetAll").textContent === "Toutes les unités", "course: All preset label in French, saw " + d.getElementById("presetAll").textContent);
  ok(d.getElementById("presetMid").textContent === "Révision de mi-parcours (unités 1 à 4)", "course: Mid preset label in French, saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Révision finale (unités 5 à 9)", "course: Final preset label in French, saw " + d.getElementById("presetFinal").textContent);
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("107 modèles de questions"), "course: pool after Mid preset is 107, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok((d.getElementById("poolInfo").textContent || "").startsWith("Banque de questions pour cette sélection : "), "course: the pool line is French");
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Révision de mi-parcours : unités 1 à 4", "course: face scope for the mid selection, saw: " + d.getElementById("faceScope").textContent);
  ok(d.getElementById("faceDesc").textContent.includes("un indice, un exemple travaillé et une solution détaillée complète pour chaque question"), "course: face card promises the hint in French, saw: " + d.getElementById("faceDesc").textContent);
  ok(!d.getElementById("faceDesc").textContent.includes("You will get"), "course: no English face text leaks through the layer");
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("120 modèles de questions"), "course: pool after Final preset is 120");
  ev(r.dom, "refreshFace()");
  ok(d.getElementById("faceScope").textContent === "Révision de fin de cours : unités 5 à 9", "course: face scope for the final selection, saw: " + d.getElementById("faceScope").textContent);
  ev(r.dom, "document.getElementById('presetAll').click()");
  ok((d.getElementById("poolInfo").textContent || "").includes("227 modèles de questions"), "course: pool after All preset is the whole bank");
  ok(ev(r.dom, "refPanelsHtml([1])").includes("Formules et notions pour l'unité 1 : Les nombres rationnels"), "course: the Unit 1 panel heads in French");
  ok(ev(r.dom, "frParseNum('7,2')") === 7.2, "parse: the decimal comma parses (7,2 -> 7.2)");
  ok(ev(r.dom, "frParseNum('1 234,5')") === 1234.5, "parse: spaced thousands with a decimal comma parse (1 234,5 -> 1234.5)");
  ok(ev(r.dom, "frParseNum('7.2')") === 7.2, "parse: a decimal point still parses");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- mid and final exams, French paper furniture ---
  for (const [qs, tag] of [["course=math-9-fr&preset=mid&nostart=1", "mid exam"], ["course=math-9-fr&preset=final&nostart=1", "final exam"]]) {
    r = await boot(qs);
    d = r.dom.window.document;
    ev(r.dom, "startExam()");
    const t = d.getElementById("session").textContent || "";
    ok(t.includes("Mathématiques 9 : Examen de pratique"), tag + ": the paper title is French, saw: " + t.slice(0, 90));
    ok(t.includes("Total des points : 35"), tag + ": the paper totals 35 marks with the French label, saw: " + t.slice(0, 220));
    ok(t.includes("Section B"), tag + ": the paper carries a constructed-response section");
    ok(!t.includes("could not fill every exam slot"), tag + ": no short-paper heads-up on a full paper");
    ok(r.errors.length === 0, tag + ": no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
    r.dom.window.close();
  }

  // --- one unit: a 25-mark practice test ---
  r = await boot("course=math-9-fr&unit=1&nostart=1");
  d = r.dom.window.document;
  ev(r.dom, "startExam()");
  const examText = d.getElementById("session").textContent || "";
  ok(examText.includes("Mathématiques 9 : Test de pratique"), "exam: single-unit paper renders with its French title, saw: " + examText.slice(0, 90));
  ok(examText.includes("Total des points : 25"), "exam: the paper totals 25 marks");
  ok(r.errors.length === 0, "exam: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- a practice set: French hints, solution flip, comma grading, feedback ---
  r = await boot("course=math-9-fr&unit=2&nostart=1");
  d = r.dom.window.document;
  /* Builder restructure (Nov 20, 2026): the online set is sized by
     its two counts; 15 and 15 deals the 30 questions this part has
     always exercised, grouped by unit so question 0 is a multiple
     choice question as before. */
  ev(r.dom, "document.getElementById('oMcIn').value='15';document.getElementById('oMcIn').dispatchEvent(new Event('input'));document.getElementById('oFiIn').value='15';document.getElementById('oFiIn').dispatchEvent(new Event('input'));document.getElementById('orderIn').value='unit'");
  ev(r.dom, "startOnline()");
  const nQ = ev(r.dom, "current.length");
  const hintBtns = d.querySelectorAll("[data-hint]");
  ok(nQ > 0 && hintBtns.length === nQ, "hints: an Indice button renders on every practice question, saw " + hintBtns.length + " over " + nQ);
  ok(hintBtns[0].textContent === "Indice", "hints: the button reads Indice, saw " + hintBtns[0].textContent);
  hintBtns[0].click();
  const box0 = d.getElementById("hint0");
  ok(box0 && !box0.hidden && box0.textContent.includes("Indice :"), "hints: first click reveals the hint box with the Indice label");
  hintBtns[0].click();
  ok(box0 && box0.textContent.includes("Premier pas :"), "hints: second click adds the Premier pas stage");
  hintBtns[0].click();
  ok(box0 && box0.hidden && box0.dataset.stage === "0", "hints: third click hides the hint and resets the stage");
  hintBtns[0].click();
  ok(box0 && !box0.hidden && box0.dataset.stage === "1" && !box0.textContent.includes("Premier pas :"), "hints: fourth click restarts the cycle at stage 1");
  const exBtn = d.querySelector('[data-ex="0"]');
  ok(!!exBtn && exBtn.textContent === "Voir un exemple travaillé", "example toggle: starts as Voir un exemple travaillé, saw " + (exBtn && exBtn.textContent));
  if (exBtn) exBtn.click();
  const solBtn = d.querySelector('[data-sol="0"]');
  ok(!!solBtn && solBtn.textContent === "Voir la solution détaillée", "solution toggle: starts as Voir la solution détaillée, saw " + (solBtn && solBtn.textContent));
  if (solBtn) {
    solBtn.click();
    ok(solBtn.textContent === "Masquer la solution détaillée", "solution toggle: flips to Masquer while open, saw " + solBtn.textContent);
    ok(box0.hidden && box0.dataset.stage === "0", "solution toggle: opening the solution hides the hint and resets its stage");
    ok(d.getElementById("ex0").hidden && exBtn.textContent === "Voir un exemple travaillé", "solution toggle: opening the solution closes the worked example");
    solBtn.click();
    ok(solBtn.textContent === "Voir la solution détaillée", "solution toggle: flips back on close");
  }
  // decimal-comma grading through the real checker
  const numIdx = ev(r.dom, "(function(){for(var i=0;i<current.length;i++){var q=current[i];if(q.type==='num'&&!/^-?\\d+$/.test(String(q.answer)))return i;}return -1;})()");
  ok(numIdx >= 0, "comma: the set contains a typed-answer question with a decimal answer");
  if (numIdx >= 0) {
    const ans = ev(r.dom, "current[" + numIdx + "].answer");
    const inp = d.getElementById("ans" + numIdx);
    inp.value = String(ans).replace(".", ",");
    const chk = d.querySelector('[data-check="' + numIdx + '"]');
    if (chk) chk.click();
    const fb = d.getElementById("fb" + numIdx);
    ok(!!fb && fb.textContent.includes("Exact."), "comma: an answer typed with a decimal comma grades correct, saw: " + (fb ? fb.textContent.slice(0, 80) : "no element"));
    ok((d.getElementById("score").textContent || "").includes("Pointage jusqu'à présent :"), "comma: the score line is French, saw: " + d.getElementById("score").textContent);
  }
  // per-answer feedback in French
  const fq = findFbQuestion(r.dom);
  ok(!!fq, "feedback: the set contains an MC question carrying per-answer feedback");
  if (fq) {
    const radio = d.querySelector('input[name="opt' + fq.i + '"][value="' + fq.given + '"]');
    if (radio) radio.click();
    const chk2 = d.querySelector('[data-check="' + fq.i + '"]');
    if (chk2) chk2.click();
    const fbt = d.getElementById("fbt" + fq.i);
    ok(!!fbt && fbt.textContent.includes("À propos de ta réponse :"), "feedback: checking shows the French feedback line, saw: " + (fbt ? fbt.textContent.slice(0, 90) : "no element"));
    ok(!!fbt && fbt.textContent.includes(fq.frag), "feedback: the line carries the chosen option's own feedback text");
  }
  ok(r.errors.length === 0, "practice: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot: English chrome, French timerNote inside the template ---
  r = await boot("course=math-9-fr&teacher=1&unit=1&nostart=1");
  d = r.dom.window.document;
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: the note stays English, saw: " + (d.getElementById("teacherNote").textContent || "").slice(0, 40));
  ev(r.dom, "startOnline()");
  const timerChk = d.getElementById("timerChk");
  ok(!!timerChk, "teacher: the exam timer checkbox renders");
  if (timerChk) {
    const lab = timerChk.closest("label");
    ok(!!lab && lab.textContent.includes("Show the exam timer on practice exams") && lab.textContent.includes("1 heure 30 minutes"),
       "teacher: the timer label is the English template carrying the course timerNote, saw: " + (lab ? lab.textContent.trim() : "no label"));
    timerChk.click();
    ev(r.dom, "startExam()");
    const bar = d.getElementById("examTimer");
    ok(!!bar && bar.textContent.includes("L'examen réel accorde 1 heure 30 minutes. Ce minuteur est seulement un guide."), "teacher: the timer bar itself is a student surface and renders in French with the timerNote, saw: " + (bar ? bar.textContent : "no bar"));
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

  console.log("GATE-BOOT-MATH-9-FR " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log("GATE-BOOT-MATH-9-FR ERROR " + (e && e.stack || e)); process.exit(1); });
