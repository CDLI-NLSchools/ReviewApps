/* Scaffold suppression harness (Nov 15, 2026). Jason's build, in two
   parts. Part 1: beside the copy buttons in all three teacher views,
   next to the Sorted/Shuffled choice, a teacher can turn Hints or
   Worked examples Off for student links; the choice persists on the
   teacher's device (hintPref / exPref) and a student link minted
   while a choice is Off carries nohint=1 or noex=1. A student
   opening such a link never sees the suppressed scaffold at any
   materialization point (settings draw, seeded link, teacher-built
   set link, resume restore); the teacher's own view is immune.
   Part 2: in check-at-the-end mode the Worked example button is
   deferred for students until the set is graded, the way worked
   solutions already are; hints are not deferred, check-as-you-go
   is unchanged, and a suppressed example never appears even after
   grading. Subject course: Math 2202 (hints on in its config, and
   its generator entries are worked-example capable).
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/teacher/teacher_scaffold_test.js */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.SCAF_FILE || (process.env.HOME + "/workspace/review-app-unified/index.html");
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }
function storageShim(shared) {
  return {
    getItem: (k) => (k in shared ? shared[k] : null),
    setItem: (k, v) => { shared[k] = String(v); },
    removeItem: (k) => { delete shared[k]; },
    clear: () => { Object.keys(shared).forEach((k) => delete shared[k]); },
    key: (i) => Object.keys(shared)[i] || null,
    get length() { return Object.keys(shared).length; }
  };
}
function boot(qs, shared) {
  return new Promise((resolve) => {
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        if (shared) Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 1400);
  });
}
/* Same loader-timing adaptation as teacher_shuffle_test.js: wait for
   the bank, then re-run the app's own boot dispatch once if the
   parameterized dispatch visibly misfired. */
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
const qsOf = (url) => url.split("?")[1] || "";
const nHint = (d) => d.window.document.querySelectorAll("[data-hint]").length;
const nHintBox = (d) => d.window.document.querySelectorAll(".hintbox").length;
const nEx = (d) => d.window.document.querySelectorAll("[data-ex]").length;
const nCapable = (d) => ev(d, "current ? current.filter(function(q){return exampleCapable(q._entry);}).length : 0");
const BASE = "course=math-2202&unit=1&count=10";

(async () => {
  /* ===== teacher side: the choices exist, default On, mint flags ===== */
  const sharedT = {};
  let d = await boot(BASE + "&teacher=1", sharedT);
  const hSel = d.window.document.querySelector("#tHintSel");
  const eSel = d.window.document.querySelector("#tExSel");
  ok(!!hSel, "teacher bar (online): Hints in student links choice is offered beside the copy buttons");
  ok(!!eSel, "teacher bar (online): Worked examples in student links choice is offered beside the copy buttons");
  ok(hSel && hSel.value === "on", "teacher bar: Hints defaults to On");
  ok(eSel && eSel.value === "on", "teacher bar: Worked examples defaults to On");
  const onURL = ev(d, "tShareURL(false)");
  ok(!/[?&](nohint|noex)=/.test(onURL), "student link: no suppression flags while both choices are On");
  const tH0 = nHint(d), tE0 = nEx(d), tN = ev(d, "current.length");
  ok(tH0 > 0, "teacher set: Hint buttons render (" + tH0 + ")");
  ok(tE0 > 0 && tE0 === nCapable(d), "teacher set: a Worked example button for every capable question (" + tE0 + ")");
  if (hSel) hSel.value = "off";
  if (eSel) eSel.value = "off";
  const offURL = ev(d, "tShareURL(false)");
  ok(/[?&]nohint=1/.test(offURL), "student link: carries nohint=1 when Hints is Off");
  ok(/[?&]noex=1/.test(offURL), "student link: carries noex=1 when Worked examples is Off");
  ok(sharedT.hintPref === "off", "teacher device: hintPref persists as off");
  ok(sharedT.exPref === "off", "teacher device: exPref persists as off");
  const tURL = ev(d, "tShareURL(true)");
  ok(/[?&]teacher=1/.test(tURL) && !/[?&](nohint|noex)=/.test(tURL), "teacher link: keeps teacher=1 and never carries suppression flags");
  d.window.close();

  /* ===== the exam and sheet panels offer the same choices ===== */
  d = await boot("course=math-2202&unit=1&mode=exam&teacher=1");
  ok(!!d.window.document.querySelector("#tExamPanel #tHintSel") && !!d.window.document.querySelector("#tExamPanel #tExSel"),
     "teacher panel (exam): both scaffold choices are offered");
  d.window.close();
  d = await boot("course=math-2202&unit=1&mode=sheet&teacher=1");
  ok(!!d.window.document.querySelector("#tSheetPanel #tHintSel") && !!d.window.document.querySelector("#tSheetPanel #tExSel"),
     "teacher panel (sheet): both scaffold choices are offered");
  if (d.window.document.querySelector("#tSheetPanel #tExSel")) d.window.document.querySelector("#tSheetPanel #tExSel").value = "off";
  const sheetURL = ev(d, "tShareURL(false)");
  ok(/[?&]noex=1/.test(sheetURL) && /[?&]mode=sheet/.test(sheetURL), "sheet student link: carries noex=1 and mode=sheet");
  d.window.close();

  /* ===== student opening of the suppressed set link ===== */
  d = await boot(qsOf(offURL));
  ok(ev(d, "typeof NO_HINT !== 'undefined' && NO_HINT") === true && ev(d, "typeof NO_EX !== 'undefined' && NO_EX") === true, "suppressed opening: both flags are read from the link");
  ok(ev(d, "current.length") === tN, "suppressed opening: the same set, question for question");
  ok(nHint(d) === 0, "suppressed opening: no Hint buttons render");
  ok(nHintBox(d) === 0, "suppressed opening: no hint boxes render");
  ok(nEx(d) === 0, "suppressed opening: no Worked example buttons render");
  d.window.close();

  /* ===== teacher opening the suppressed link anyway: immune ===== */
  d = await boot(qsOf(offURL) + "&teacher=1");
  ok(nHint(d) === tH0 && nEx(d) === tE0, "teacher view: suppression flags ignored, both scaffolds render in full");
  d.window.close();

  /* ===== seeded route: each flag alone, and neither ===== */
  d = await boot(BASE + "&seed=scaf1&nohint=1");
  ok(nHint(d) === 0 && nHintBox(d) === 0, "seeded nohint link: no Hint buttons, no hint boxes");
  ok(nEx(d) > 0 && nEx(d) === nCapable(d), "seeded nohint link: Worked examples untouched");
  const exAlone = nEx(d);
  d.window.close();
  d = await boot(BASE + "&seed=scaf1&noex=1");
  ok(nEx(d) === 0, "seeded noex link: no Worked example buttons");
  ok(nHint(d) > 0, "seeded noex link: Hints untouched");
  const hintAlone = nHint(d);
  d.window.close();
  d = await boot(BASE + "&seed=scaf1");
  ok(nHint(d) === hintAlone && nEx(d) === exAlone, "unflagged seeded link: identical scaffold rendering to today");
  d.window.close();

  /* ===== Part 2: end-mode deferral ===== */
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf2&chk=end");
  ok(ev(d, "checkMode") === "end", "end mode: checkMode is end");
  ok(nEx(d) === 0, "end mode: no Worked example button before grading");
  ok(nHint(d) > 0, "end mode: Hints are not deferred");
  ev(d, "gradeAll()");
  ok(ev(d, "endGraded") === true, "end mode: gradeAll grades the set");
  ok(nEx(d) > 0 && nEx(d) === nCapable(d), "end mode: Worked example buttons appear at grading, one per capable question");
  d.window.close();

  d = await boot("course=math-2202&unit=1&count=6&seed=scaf2");
  ok(ev(d, "checkMode") === "each" && nEx(d) === nCapable(d) && nEx(d) > 0, "check-as-you-go: Worked examples offered from the start, unchanged");
  d.window.close();

  d = await boot("course=math-2202&unit=1&count=6&seed=scaf2&chk=end&teacher=1");
  ok(nEx(d) > 0 && nEx(d) === nCapable(d), "end mode, teacher view: deferral does not apply, examples render before grading");
  d.window.close();

  /* ===== Parts 1 and 2 compose: suppressed beats deferred ===== */
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf2&chk=end&noex=1");
  ok(nEx(d) === 0, "end mode + noex: no Worked example button before grading");
  ev(d, "gradeAll()");
  ok(nEx(d) === 0, "end mode + noex: no Worked example button even after grading");
  d.window.close();

  /* ===== resume round trips ===== */
  const sharedA = {};
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf3&nohint=1&noex=1", sharedA);
  ev(d, "(function(){var q=current[0];var r=document.querySelector('input[name=\"opt0\"][value=\"'+q.correct+'\"]');if(r)r.checked=true;checkQ(0);resumeSaveNow();})()");
  const keyA = Object.keys(sharedA).find((k) => k.endsWith("-resume-v1"));
  ok(!!keyA, "resume (suppressed): a save was written");
  let bodyA = null;
  try { bodyA = JSON.parse(sharedA[keyA]).body; } catch (e) {}
  ok(bodyA && bodyA.nohint === 1 && bodyA.noex === 1, "resume (suppressed): the save itself carries the suppression state");
  d.window.close();
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf3&nohint=1&noex=1", sharedA);
  ok(!!d.window.document.querySelector("#resumeGoBtn"), "resume (suppressed): the identical suppressed set offers Resume");
  d.window.document.querySelector("#resumeGoBtn").click();
  await new Promise((r) => setTimeout(r, 120));
  ok(nHint(d) === 0 && nEx(d) === 0, "resume (suppressed): the resumed set does not regain Hint or Worked example buttons");
  d.window.close();

  const sharedB = {};
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf4&chk=end", sharedB);
  ev(d, "(function(){var q=current[0];var r=document.querySelector('input[name=\"opt0\"][value=\"'+q.correct+'\"]');if(r)r.checked=true;gradeAll();resumeSaveNow();})()");
  const capB = nCapable(d);
  d.window.close();
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf4&chk=end", sharedB);
  ok(nEx(d) === 0, "resume (end mode, graded): the fresh render still defers examples before Resume is taken");
  ok(!!d.window.document.querySelector("#resumeGoBtn"), "resume (end mode, graded): Resume is offered");
  d.window.document.querySelector("#resumeGoBtn").click();
  await new Promise((r) => setTimeout(r, 120));
  ok(ev(d, "endGraded") === true && nEx(d) === capB && capB > 0, "resume (end mode, graded): the resumed set shows its Worked example buttons");
  d.window.close();

  const sharedC = {};
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf5&chk=end", sharedC);
  ev(d, "(function(){var q=current[0];var r=document.querySelector('input[name=\"opt0\"][value=\"'+q.correct+'\"]');if(r)r.checked=true;resumeSaveNow();})()");
  d.window.close();
  d = await boot("course=math-2202&unit=1&count=6&seed=scaf5&chk=end", sharedC);
  ok(!!d.window.document.querySelector("#resumeGoBtn"), "resume (end mode, ungraded): Resume is offered");
  d.window.document.querySelector("#resumeGoBtn").click();
  await new Promise((r) => setTimeout(r, 120));
  ok(ev(d, "endGraded") === false && nEx(d) === 0, "resume (end mode, ungraded): examples stay hidden until grading");
  d.window.close();

  /* ===== sheet route: the flags have no effect there ===== */
  d = await boot("course=math-2202&unit=1&mode=sheet&nohint=1&noex=1");
  ok(ev(d, "!!sheetState && sheetState.items.length > 0"), "sheet route: a sheet still builds with suppression flags present (flags ignored there)");
  d.window.close();

  console.log(fail ? "SCAFFOLD TEST FAIL (" + fail + ")" : "SCAFFOLD TEST PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})();
