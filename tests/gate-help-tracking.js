#!/usr/bin/env node
/* Help tracking gate (Nov 15, 2026, Jason's ruling): opening a
   hint so it displays, opening the worked example, or opening the
   worked solution BEFORE a question's first recorded result marks
   the question as helped. A helped question answered correctly
   still scores, but it counts as needing practice: its indicators
   (or, on a prerequisite check, its skill group) join the
   practice-more readout and the Practice what I missed draw. Help
   opened after the first result does not count. Prose constructed
   response: the designed checkProse reveal opens the solution as
   part of checking and never counts; only a hint or a worked
   example opened before the self-rating counts there. The flags
   ride the resume save and restore.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-help-tracking.js
   (SHELL_HTML may point at another copy of the shell, e.g. the
   pre-change shell, to demonstrate the failures this gate guards
   against; the copy must sit beside courses.js and the banks.) */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const { VirtualConsole } = require("jsdom");
const FILE = process.env.SHELL_HTML || process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
    const vc = new VirtualConsole();
    const dom = new JSDOM(html, {
      url: "file://" + FILE + "?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        if (shared) Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
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
          dom.window.eval("if(window.__COURSE){applyURL();unitCheckboxes();renderIndicators();updatePoolInfo();}");
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
const sumText = (d) => d.window.document.getElementById("setSummary").textContent;
const HELP_LINE = "answered correctly after using help";

/* Answer every question on the dealt set and check each one, all
   correct except an optional miss index (answered wrong, or
   self-rated missed for a prose item). Mirrors the pkcheck gate. */
function answerAll(d, missIndex) {
  ev(d, `(function(miss){
    for(var i=0;i<current.length;i++){
      var q=current[i];
      var missQ=(i===miss);
      if(q.type==="mc"){
        var v=missQ?((q.correct+1)%q.options.length):q.correct;
        var r=document.querySelector('input[name="opt'+i+'"][value="'+v+'"]');
        if(r){r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
      }else if(q.type==="num"){
        var inp=document.getElementById("ans"+i);
        if(inp){inp.value=String(missQ?(q.answer+3):q.answer);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }else{
        var inp2=document.getElementById("ans"+i);
        if(inp2){inp2.value=missQ?"zzz not the answer":q.answers[0];inp2.dispatchEvent(new window.Event("input",{bubbles:true}));}
      }
      var cb=document.querySelector('[data-check="'+i+'"]');if(cb)cb.click();
      var sr=document.getElementById("sr"+i);
      if(sr&&!sr.hidden){var b=sr.querySelector('[data-rate="'+(missQ?"missed":"got")+'"]');if(b)b.click();}
    }
  })(${JSON.stringify(missIndex == null ? -1 : missIndex)})`);
}
function firstWith(d, attr) {
  return ev(d, `(function(){
    for(var i=0;i<current.length;i++){if(document.querySelector('[${attr}="'+i+'"]'))return i;}
    return -1;
  })()`);
}
function clickRetry(d) {
  const b = d.window.document.getElementById("retryMissedBtn");
  if (!b) return false;
  b.click();
  return true;
}
function indsOf(d, i) { return ev(d, `current[${i}]._entry.indicators.slice()`); }
function helpState(d) {
  return ev(d, `(function(){try{return JSON.stringify(helpUsed||{});}catch(e){return "undefined";}})()`);
}

(async () => {
  /* ===== A: hint, then correct (ordinary set) ===== */
  let d = await boot("course=math-2202&unit=1&count=3&seed=helpA");
  ok(ev(d, "current ? current.length : 0") === 3, "A: the seeded set deals 3 questions");
  let t = firstWith(d, "data-hint");
  ok(t >= 0, "A: the set has a question with a Hint button");
  ev(d, `document.querySelector('[data-hint="${t}"]').click()`);
  ok(ev(d, `document.getElementById("hint${t}").hidden`) === false, "A: the hint displays");
  answerAll(d, -1);
  ok(ev(d, "correctCount") === 3 && ev(d, "checkedCount") === 3, "A: the helped correct answer still scores (3 of 3 on first checks)");
  ok(sumText(d).includes(HELP_LINE), "A: the summary says some questions were answered correctly after using help");
  ok(!!d.window.document.getElementById("retryMissedBtn"), "A: an all-correct set with help offers Practice what I missed");
  const indsA = indsOf(d, t);
  const hadA = clickRetry(d);
  ok(hadA && indsA.every((c) => ev(d, "state.inds").includes(c)), "A: the retry is keyed on the helped question's indicators (" + indsA.join(",") + ")");
  ok(hadA && ev(d, "current.every(function(q){return q._entry.indicators.some(function(c){return state.inds.indexOf(c)>=0;});})") === true,
     "A: every retry question carries a practice indicator");
  d.window.close();

  /* ===== B: worked example, then correct ===== */
  d = await boot("course=math-2202&unit=1&count=3&seed=helpB");
  t = firstWith(d, "data-ex");
  ok(t >= 0, "B: the set has a question with a worked example button");
  ev(d, `document.querySelector('[data-ex="${t}"]').click()`);
  ok(ev(d, `document.getElementById("ex${t}").hidden`) === false, "B: the worked example displays");
  answerAll(d, -1);
  ok(ev(d, "correctCount") === 3, "B: the helped correct answer still scores");
  ok(sumText(d).includes(HELP_LINE), "B: the summary carries the help line");
  ok(!!d.window.document.getElementById("retryMissedBtn"), "B: the practice button appears");
  const indsB = indsOf(d, t);
  const hadB = clickRetry(d);
  ok(hadB && indsB.every((c) => ev(d, "state.inds").includes(c)), "B: the retry is keyed on the example-helped question's indicators");
  d.window.close();

  /* ===== C: worked solution, then correct ===== */
  d = await boot("course=math-2202&unit=1&count=3&seed=helpC");
  ev(d, `document.querySelector('[data-sol="0"]').click()`);
  ok(ev(d, `document.getElementById("sol0").classList.contains("show")`) === true, "C: the worked solution opens");
  answerAll(d, -1);
  ok(ev(d, "correctCount") === 3, "C: the helped correct answer still scores");
  ok(sumText(d).includes(HELP_LINE), "C: the summary carries the help line");
  ok(!!d.window.document.getElementById("retryMissedBtn"), "C: the practice button appears");
  const indsC = indsOf(d, 0);
  const hadC = clickRetry(d);
  ok(hadC && indsC.every((c) => ev(d, "state.inds").includes(c)), "C: the retry is keyed on the solution-helped question's indicators");
  d.window.close();

  /* ===== D: no help, all correct: unchanged behaviour ===== */
  d = await boot("course=math-2202&unit=1&count=3&seed=helpD");
  answerAll(d, -1);
  ok(ev(d, "correctCount") === 3, "D: all correct");
  ok(!d.window.document.getElementById("retryMissedBtn"), "D: no practice button when nothing was missed or helped");
  ok(sumText(d).includes("Every indicator in this set was answered correctly on its first check."),
     "D: the all-correct line stands");
  ok(!sumText(d).includes(HELP_LINE), "D: no help line");
  d.window.close();

  /* ===== E: help opened after the first check does not count ===== */
  d = await boot("course=math-2202&unit=1&count=3&seed=helpE");
  answerAll(d, -1);
  t = firstWith(d, "data-hint");
  if (t >= 0) ev(d, `document.querySelector('[data-hint="${t}"]').click()`);
  ev(d, `document.querySelector('[data-sol="0"]').click()`);
  ok(helpState(d) === "{}", "E: help opened after the first checks records nothing, saw " + helpState(d));
  ok(!d.window.document.getElementById("retryMissedBtn"), "E: no practice button appears");
  ok(sumText(d).includes("Every indicator in this set was answered correctly on its first check."),
     "E: the all-correct line stands");
  d.window.close();

  /* ===== F: one wrong, one helped-correct: both feed the retry ===== */
  d = await boot("course=math-2202&unit=1&count=3&seed=helpF");
  t = 1; /* every question in this course carries a Hint button; help question 1, miss question 0 */
  ok(!!d.window.document.querySelector('[data-hint="1"]'), "F: question 2 has a Hint button");
  ev(d, `document.querySelector('[data-hint="1"]').click()`);
  ok(ev(d, `document.getElementById("hint1").hidden`) === false, "F: the hint displays on question 2");
  answerAll(d, 0);
  ok(ev(d, "correctCount") === 2, "F: two of three score (the helped one counts, the missed one does not)");
  ok(sumText(d).includes(HELP_LINE), "F: the summary carries the help line alongside the miss");
  ok(!!d.window.document.getElementById("retryMissedBtn"), "F: the practice button appears");
  const indsF0 = indsOf(d, 0), indsFt = indsOf(d, t);
  const hadF = clickRetry(d);
  ok(hadF && indsF0.every((c) => ev(d, "state.inds").includes(c)) && indsFt.every((c) => ev(d, "state.inds").includes(c)),
     "F: the retry covers the missed indicators and the helped indicators");
  d.window.close();

  /* ===== G: prerequisite check: help in one group marks the group =====
     Math 2201's course configuration carries no Hint buttons, so the
     group is helped through the worked solution, the same tracking
     mechanism the hint exercises elsewhere. */
  d = await boot("course=math-2201&unit=3&pkonly=1&seed=pkc1&count=8", {});
  /* Pin amended November 19, 2026: the check now deals the full 8
     requested. The pin read 7 from when Unit 3's PK pool ran one
     short of the check size; the November 18, 2026 Unit 3 expansion
     deepened the pool, so the seeded draw fills all 8. Noted during
     the Chemistry 2202 pass 2 gate battery, which is where the stale
     pin surfaced. */
  ok(ev(d, "current ? current.length : 0") === 8, "G: the Unit 3 check deals 8 questions");
  const g0 = ev(d, "pkGroupOf(current[0]._entry)"), g0label = ev(d, "pkGroupLabel(pkGroupOf(current[0]._entry))");
  ev(d, `document.querySelector('[data-sol="0"]').click()`);
  ok(ev(d, `document.getElementById("sol0").classList.contains("show")`) === true, "G: the worked solution opens on the target question");
  answerAll(d, -1);
  ok(ev(d, "correctCount") === 8, "G: the helped correct answer still scores (8 of 8)");
  ok(sumText(d).includes(g0label + ": needs more practice"),
     "G: the helped group reads as needing more practice, summary saw: " + sumText(d).slice(0, 200));
  ok(sumText(d).includes(HELP_LINE), "G: the summary carries the help line");
  ok(!!d.window.document.getElementById("retryMissedBtn"), "G: the practice button appears on an otherwise perfect check");
  const hadG = clickRetry(d);
  ok(hadG && ev(d, "current.length") === 8 && ev(d, `current.every(function(q){return pkGroupOf(q._entry)===${JSON.stringify(g0)};})`) === true,
     "G: the retry deals the check size from the helped group only");
  d.window.close();

  /* ===== H: the flags ride the resume save and restore ===== */
  const shared = {};
  d = await boot("course=math-2202&unit=1&count=3&seed=helpH", shared);
  t = firstWith(d, "data-hint");
  ok(t >= 0, "H: the set has a question with a Hint button");
  ev(d, `document.querySelector('[data-hint="${t}"]').click()`);
  answerAll(d, -1);
  await sleep(900); /* save debounce is 250 ms */
  const key = Object.keys(shared).find((k) => k.endsWith("-resume-v1"));
  ok(!!key, "H: the set was saved");
  const payload = key ? JSON.parse(shared[key]) : null;
  ok(!!payload && !!payload.body.help && !!payload.body.help[t],
     "H: the save body carries the help flag for the helped question");
  d.window.close();

  d = await boot("course=math-2202&unit=1&count=3&seed=helpH", shared);
  ok(!!d.window.document.getElementById("resumeBar"), "H: reopening the identical set offers Resume");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(helpState(d) !== "undefined" && !!(JSON.parse(helpState(d))[t]),
     "H: the restored set carries the help flag again, saw " + helpState(d));
  ok(sumText(d).includes(HELP_LINE) && !!d.window.document.getElementById("retryMissedBtn"),
     "H: the restored summary offers the practice set for the helped question");
  d.window.close();

  /* ===== I: prose CR: a hint before rating counts, the reveal does not ===== */
  d = await boot("course=earth-3209");
  const dealProse = () => ev(d, `(function(){
    var e = null;
    for (var i = 0; i < BANK.length; i++) if (BANK[i].id === "es-u2-cr-q05") e = BANK[i];
    if (!e) return "missing entry";
    var q = e.gen(); q._entry = e;
    current = [q]; sessionSeed = "";
    checkMode = "each"; endGraded = false;
    checkedCount = 0; correctCount = 0; setResults = {};
    try { helpUsed = {}; } catch (err) {}
    lastSettings = { units: [e.unit], inds: [], count: 1, mix: [32, 50, 18], order: "mixed", chk: "each", midCap: false, finalCap: false };
    onlineThin = false;
    renderOnline(false);
    return q.type;
  })()`);
  const PROSE = "Mountain building crumples and tilts the rock layers. After that the tilted layers are worn down flat and new level layers are laid on top, which leaves an angular unconformity. A disconformity is just an erosion surface between parallel layers, so it needs no tilting.";
  ok(dealProse() === "text", "I: the Earth Systems entry deals a text question");
  ev(d, `document.querySelector('[data-hint="0"]').click()`);
  ok(ev(d, `document.getElementById("hint0").hidden`) === false, "I: the hint displays before the check");
  ev(d, `(function(){ var inp = document.getElementById("ans0"); inp.value = ${JSON.stringify(PROSE)}; inp.dispatchEvent(new window.Event("input", { bubbles: true })); })()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ok(ev(d, `document.getElementById("sol0").classList.contains("show")`) === true, "I: the designed reveal opens the solution");
  ev(d, `document.querySelector('[data-rate="got"]').click()`);
  ok(ev(d, "correctCount") === 1, "I: the 'I got it' rating scores");
  const hs = helpState(d);
  ok(hs !== "undefined" && !!JSON.parse(hs)[0] && !!JSON.parse(hs)[0].hint && !JSON.parse(hs)[0].sol,
     "I: the hint counted as help and the reveal did not, saw " + hs);
  ok(sumText(d).includes(HELP_LINE) && !!d.window.document.getElementById("retryMissedBtn"),
     "I: the summary offers practice for the hint-helped prose answer");

  dealProse();
  ev(d, `(function(){ var inp = document.getElementById("ans0"); inp.value = ${JSON.stringify(PROSE)}; inp.dispatchEvent(new window.Event("input", { bubbles: true })); })()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ev(d, `document.querySelector('[data-rate="got"]').click()`);
  ok(ev(d, "correctCount") === 1, "I: the unhelped rating scores");
  ok(helpState(d) === "{}", "I: the reveal alone records no help, saw " + helpState(d));
  ok(!d.window.document.getElementById("retryMissedBtn") && sumText(d).includes("Every indicator in this set was answered correctly on its first check."),
     "I: an unhelped prose set keeps the all-correct summary with no practice button");
  d.window.close();

  console.log(fail ? "HELP TRACKING GATE FAIL (" + fail + ")" : "HELP TRACKING GATE PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
