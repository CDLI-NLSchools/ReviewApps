#!/usr/bin/env node
/* Prose CR self-check gate (Nov 2026): a prose constructed response
   question (its shortest accepted answer runs longer than
   PROSE_TEXT_MIN characters) is not auto-marked by exact match.
   Check opens the worked solution and the student rates their own
   answer; the rating records like a check. Short text answers keep
   exact match.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-cr-selfcheck.js
   The sets here are dealt from named bank entries directly (the
   Earth Systems item is the angular unconformities question whose
   stored answer is a full model sentence), so the gate does not
   depend on a lucky draw. The resume round trip uses one shared
   in-memory Storage across two page loads, as in gate-resume.js. */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
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
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        if (shared) Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 5000) { clearInterval(iv); setTimeout(() => resolve(dom), 80); }
    }, 50);
  });
}
const ev = (d, code) => d.window.eval(code);

/* Deal a one-question online set from a named entry, in the given
   check mode, through the real renderer. */
function deal(d, entryId, chk) {
  return ev(d, `(function(){
    var e = null;
    for (var i = 0; i < BANK.length; i++) if (BANK[i].id === ${JSON.stringify(entryId)}) e = BANK[i];
    if (!e) return "missing entry";
    var q = e.gen(); q._entry = e;
    current = [q]; sessionSeed = "";
    checkMode = ${JSON.stringify(chk)} === "end" ? "end" : "each"; endGraded = false;
    checkedCount = 0; correctCount = 0; setResults = {};
    lastSettings = { units: [e.unit], inds: [], count: 1, mix: [32, 50, 18], order: "mixed", chk: checkMode, midCap: false, finalCap: false };
    onlineThin = false;
    renderOnline(false);
    return q.type;
  })()`);
}
function typeAnswer(d, text) {
  ev(d, `(function(){ var inp = document.getElementById("ans0"); inp.value = ${JSON.stringify(text)}; inp.dispatchEvent(new window.Event("input", { bubbles: true })); })()`);
}
const fbText = (d) => ev(d, `document.getElementById("fb0").textContent`);
const GOOD_PROSE = "Mountain building crumples and tilts the rock layers. After that the tilted layers are worn down flat and new level layers are laid on top, which leaves an angular unconformity. A disconformity is just an erosion surface between parallel layers, so it needs no tilting.";

(async () => {
  /* ===== Part A: each-mode self-check on a real Earth Systems CR ===== */
  let d = await boot("course=earth-3209");
  ok(deal(d, "es-u2-cr-q05", "each") === "text", "A: the Earth Systems entry deals a text question");
  ok(ev(d, "isProseText(current[0])") === true, "A: the entry classifies as prose (shortest accepted answer " + ev(d, "Math.min.apply(null, current[0].answers.map(function(a){return a.length;}))") + " chars)");
  ok(ev(d, "current[0].answers.indexOf(" + JSON.stringify(GOOD_PROSE.toLowerCase()) + ")") === -1, "A: the typed answer is a good-faith paraphrase, not the stored string");
  ok(!!ev(d, "document.getElementById('sr0')") && ev(d, "document.getElementById('sr0').hidden") === true, "A: the rating control renders hidden");

  /* empty answer: nudge, no reveal, no score change */
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ok(fbText(d).includes("Write an answer first"), "A: empty check nudges for an answer first, saw: " + fbText(d).slice(0, 80));
  ok(ev(d, "checkedCount") === 0 && ev(d, "document.getElementById('sr0').hidden") === true, "A: the nudge records nothing and reveals nothing");

  /* real answer: no auto-judgement, solution opens, rating appears */
  typeAnswer(d, GOOD_PROSE);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  const fbA = fbText(d);
  ok(!fbA.includes("Correct.") && !fbA.includes("Not quite."), "A: no Correct / Not quite auto-judgement for prose, saw: " + fbA.slice(0, 80));
  ok(ev(d, "document.getElementById('sol0').classList.contains('show')") === true, "A: the worked solution opens on Check");
  ok(ev(d, "document.getElementById('sr0').hidden") === false, "A: the rating control appears on Check");
  ok(ev(d, "checkedCount") === 0 && ev(d, "correctCount") === 0, "A: nothing is recorded before the student rates");

  /* all three ratings, then a change of rating */
  ev(d, `document.querySelector('[data-rate="got"]').click()`);
  ok(ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 1, "A: 'I got it' records once and counts correct");
  ok(ev(d, "setResults[0] && setResults[0].ok") === true, "A: setResults marks the item ok");
  ok(fbText(d).includes("I got it"), "A: the feedback area confirms the rating in words");
  ok(ev(d, "document.querySelector('[data-rate=\"got\"]').classList.contains('rated')") === true, "A: the chosen rating button shows as chosen");
  ev(d, `document.querySelector('[data-rate="part"]').click()`);
  ok(ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 0, "A: changing to 'part of it' moves the counters without double-counting");
  ok(ev(d, "setResults[0] && setResults[0].ok") === false, "A: setResults follows the changed rating");
  ok(fbText(d).includes("part of it") && fbText(d).includes("marking points"), "A: 'part of it' points the student back to the marking points");
  ev(d, `document.querySelector('[data-rate="missed"]').click()`);
  ok(ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 0 && ev(d, "setResults[0].ok") === false, "A: 'I missed it' counts as not correct, still recorded once");
  ok(fbText(d).includes("I missed it") && fbText(d).includes("marking points"), "A: 'missed it' points the student back to the marking points");
  ev(d, `document.querySelector('[data-rate="got"]').click()`);
  ok(ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 1 && ev(d, "setResults[0].ok") === true, "A: changing back to 'got it' restores the correct count, still one check");
  d.window.close();

  /* ===== Part B: end-check mode grades without auto-judging prose ===== */
  d = await boot("course=earth-3209");
  deal(d, "es-u2-cr-q05", "end");
  typeAnswer(d, GOOD_PROSE);
  ev(d, "gradeAll()");
  ok(ev(d, "endGraded") === true, "B: grading ran");
  const fbB = fbText(d);
  ok(!fbB.includes("Correct.") && !fbB.includes("Not quite."), "B: grading shows no auto-judgement for the prose item, saw: " + fbB.slice(0, 80));
  ok(ev(d, "document.getElementById('sr0').hidden") === false, "B: the rating control appears at the grading reveal");
  ok(ev(d, "document.getElementById('sol0').classList.contains('show')") === true, "B: the solution is open at grading");
  ok(ev(d, "correctCount") === 0 && ev(d, "document.getElementById('score').textContent.includes('You scored 0 of 1')"), "B: an unrated prose item is not counted correct, saw: " + ev(d, "document.getElementById('score').textContent").slice(0, 60));
  ev(d, `document.querySelector('[data-rate="got"]').click()`);
  ok(ev(d, "correctCount") === 1 && ev(d, "document.getElementById('score').textContent.includes('You scored 1 of 1')"), "B: rating after grading updates the score, saw: " + ev(d, "document.getElementById('score').textContent").slice(0, 60));
  d.window.close();

  /* ===== Part C: the rating survives the interrupted-set resume ===== */
  const shared = {};
  d = await boot("course=earth-3209", shared);
  deal(d, "es-u2-cr-q05", "each");
  typeAnswer(d, GOOD_PROSE);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ev(d, `document.querySelector('[data-rate="part"]').click()`);
  await sleep(900); /* save debounce is 250 ms */
  const key = Object.keys(shared).find((k) => k.endsWith("-resume-v1"));
  ok(!!key, "C: the rated set was saved");
  const payload = key ? JSON.parse(shared[key]) : null;
  ok(!!payload && payload.body.state[0].selfRate === "part", "C: the save carries the chosen rating");
  ok(!!payload && payload.body.checked === 1 && payload.body.correct === 0, "C: the save carries the rating's score effect");
  d.window.close();

  d = await boot("course=earth-3209", shared);
  deal(d, "es-u2-cr-q05", "each");
  ok(!!d.window.document.getElementById("resumeBar"), "C: the identical set redraws with the Resume offer");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, "document.getElementById('sr0').dataset.selfrate") === "part", "C: the restored rating is on the control");
  ok(ev(d, "document.getElementById('sr0').hidden") === false && ev(d, "document.querySelector('[data-rate=\"part\"]').classList.contains('rated')") === true, "C: the restored rating shows as chosen");
  ok(fbText(d).includes("part of it"), "C: the restored feedback confirms the rating");
  ok(ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 0 && ev(d, "setResults[0] && setResults[0].ok") === false, "C: the restored counters and setResults match the rating");
  d.window.close();

  /* ===== Part D: a genuine short-answer text entry still exact-matches ===== */
  d = await boot("course=chem-2202");
  ok(deal(d, "u1-51-write-formula", "each") === "text", "D: the Chemistry entry deals a text question");
  ok(ev(d, "isProseText(current[0])") === false, "D: the entry classifies as short (shortest accepted answer " + ev(d, "Math.min.apply(null, current[0].answers.map(function(a){return a.length;}))") + " chars)");
  ok(ev(d, "document.getElementById('sr0')") === null, "D: no rating control renders for a short text question");
  typeAnswer(d, ev(d, "current[0].answers[0]"));
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ok(fbText(d).includes("Correct.") && ev(d, "correctCount") === 1, "D: the stored answer typed verbatim is marked Correct");
  deal(d, "u1-51-write-formula", "each");
  typeAnswer(d, "definitely not the formula");
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ok(fbText(d).includes("Not quite.") && ev(d, "checkedCount") === 1 && ev(d, "correctCount") === 0, "D: a wrong short answer is marked Not quite, as before");
  d.window.close();

  console.log(fail ? "CR SELF-CHECK GATE FAIL (" + fail + ")" : "CR SELF-CHECK GATE PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
