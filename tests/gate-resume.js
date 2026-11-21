#!/usr/bin/env node
/* Interrupted-set resume gate (Nov 2026): a student who is interrupted
   mid set keeps their answers on the device, and reopening the
   identical set offers Resume or Start fresh.
   Stored set (Nov 21, 2026): the online save also carries the dealt
   set itself, written at deal time, so an unseeded set that could
   never redraw identically is offered back at boot, as a banner and
   never applied on its own; a save whose entry has left the bank is
   dropped silently, and an expired save is not offered.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-resume.js
   jsdom gives each window its own localStorage, so the harness
   installs one shared in-memory Storage across the simulated page
   loads; that shared object is what "the same device" means here.
   The draws are seeded, so the set redrawn after a "reload" is the
   identical set, exactly as a seeded or shared link redraws it. */
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
        Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
/* Same loader-timing adaptation as tests/print-smoke.js: wait for the
   bank, then re-run the app's own boot dispatch once if it misfired. */
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
const QS = "course=physics-3204&unit=1&seed=resume1";
function resumeKey(shared) { return Object.keys(shared).find((k) => k.endsWith("-resume-v1")) || null; }

(async () => {
  const shared = {};

  /* ===== first visit: answer, check, reveal a solution ===== */
  let d = await boot(QS, shared);
  const n = ev(d, "current ? current.length : 0");
  ok(n >= 3, "draw: seeded set drew (" + n + " questions)");
  const q0type = ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var r=document.querySelector('input[name="opt0"][value="'+q.correct+'"]');r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
    else{var inp=document.getElementById("ans0");inp.value=(q.type==="num"?String(q.answer):q.answers[0]);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
    return q.type;})()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  ev(d, `document.querySelector('[data-sol="1"]').click()`);
  await sleep(900); /* save debounce is 250 ms */
  const key = resumeKey(shared);
  ok(!!key, "save: progress written to localStorage under a per-course resume key");
  const payload = key ? JSON.parse(shared[key]) : null;
  ok(!!payload && payload.view === "online" && !!payload.sig, "save: payload carries the online view and a set signature");
  d.window.close();

  /* ===== reload: the identical set redraws, the offer appears ===== */
  d = await boot(QS, shared);
  ok(!!d.window.document.getElementById("resumeBar"), "reload: Resume offer appears for the identical set");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  const restored = ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var s=document.querySelector('input[name="opt0"]:checked');return s&&+s.value===q.correct;}
    var inp=document.getElementById("ans0");return inp&&inp.value!=="";
  })()`);
  ok(restored === true, "resume: the saved answer is back in place (question type " + q0type + ")");
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "resume: the checked state is restored");
  ok(ev(d, `document.getElementById("sol1").classList.contains("show")`) === true, "resume: the revealed worked solution is restored");
  ok(!d.window.document.getElementById("resumeBar"), "resume: the banner clears once the save is applied");
  d.window.close();

  /* ===== reload again: Start fresh clears the save ===== */
  d = await boot(QS, shared);
  ok(!!d.window.document.getElementById("resumeBar"), "reload 2: the offer appears again from the re-baselined save");
  ev(d, `document.getElementById("resumeFreshBtn").click()`);
  ok(!resumeKey(shared), "start fresh: the save is discarded");
  ok(!d.window.document.getElementById("resumeBar"), "start fresh: the banner clears");

  /* ===== a foreign signature never triggers the offer ===== */
  const keyName = ev(d, "RESUME_KEY");
  ev(d, `localStorage.setItem(${JSON.stringify(keyName)}, JSON.stringify({v:1,view:"online",ts:Date.now(),sig:"ffffffff",body:{state:[],checked:0,correct:0,results:{},checkMode:"each",endGraded:false}}))`);
  ev(d, "startOnline()");
  await sleep(700);
  ok(!d.window.document.getElementById("resumeBar"), "signature: a set whose signature differs gets no offer");
  ok(!resumeKey(shared) || JSON.parse(shared[resumeKey(shared)]).sig !== "ffffffff",
     "signature: the foreign save is replaced by the set on screen");

  /* ===== an expired save is dropped, not offered ===== */
  const liveSig = ev(d, `resumeSig("online", current)`);
  ev(d, `localStorage.setItem(${JSON.stringify(keyName)}, JSON.stringify({v:1,view:"online",ts:Date.now()-8*24*60*60*1000,sig:${JSON.stringify(liveSig)},body:{state:[],checked:0,correct:0,results:{},checkMode:"each",endGraded:false}}))`);
  ev(d, "startOnline()");
  await sleep(300);
  ok(!d.window.document.getElementById("resumeBar"), "expiry: a save older than the 7-day TTL is not offered");
  d.window.close();

  /* ===== the sheet view is an output surface: no persistence ===== */
  const shared2 = {};
  d = await boot("course=physics-3204&unit=1&mode=sheet&mc=2&nc=2", shared2);
  ok(ev(d, "!!sheetState") === true, "sheet: the sheet drew for the scope check");
  await sleep(500);
  ok(!resumeKey(shared2), "sheet: drawing a sheet writes no resume save");
  d.window.close();

  /* ===== stored set: an untouched, unseeded set is offered back =====
     The set below is drawn with no seed, so it could never redraw
     identically; only the stored set can bring it back. The plain
     course visit draws nothing, so any offer there is the boot
     offer. The harness re-runs resumeBootCheck once the bank has
     settled, the same loader-timing adaptation settleBoot makes
     for the boot dispatch itself. */
  const shared3 = {};
  d = await boot("course=physics-3204&unit=1", shared3);
  const nStored = ev(d, "current ? current.length : 0");
  ok(nStored >= 3, "stored set: unseeded set drew (" + nStored + " questions)");
  const canonStored = ev(d, "current.map(function(q){return canonQ(q);})");
  await sleep(1200); /* deal-time save, debounce included */
  const key3 = resumeKey(shared3);
  ok(!!key3, "stored set: a freshly dealt, untouched set writes a resume save");
  const payload3 = key3 ? JSON.parse(shared3[key3]) : null;
  ok(!!payload3 && !!payload3.body && Array.isArray(payload3.body.items) && payload3.body.items.length === nStored,
     "stored set: the save carries the dealt set itself, one serialized question per question dealt");
  ok(!!payload3 && payload3.body.items.every(function(it){return !!it.e;}),
     "stored set: every serialized question names its bank entry");
  d.window.close();

  d = await boot("course=physics-3204", shared3);
  ev(d, `(function(){if(!document.getElementById("resumeBar")&&!(typeof current!=="undefined"&&current&&current.length))resumeBootCheck();})()`);
  ok(!!d.window.document.getElementById("resumeBar"), "stored set: the untouched set is offered on return, before anything is drawn");
  ok(ev(d, "current ? current.length : 0") === 0, "stored set: the offer is a banner only; the set is not applied on its own");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  ok(ev(d, "current ? current.length : 0") === nStored, "stored set: Resume rebuilds the full set");
  ok(JSON.stringify(ev(d, "current.map(function(q){return canonQ(q);})")) === JSON.stringify(canonStored),
     "stored set: the rebuilt set is the dealt set, question for question, in order");
  ok(!d.window.document.getElementById("resumeBar"), "stored set: the banner clears once the set is rebuilt");
  d.window.close();

  /* ===== stored set: answers entered before leaving restore ===== */
  const shared4 = {};
  d = await boot("course=physics-3204&unit=1", shared4);
  const q0type4 = ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var r=document.querySelector('input[name="opt0"][value="'+q.correct+'"]');r.checked=true;r.dispatchEvent(new window.Event("change",{bubbles:true}));}
    else{var inp=document.getElementById("ans0");inp.value=(q.type==="num"?String(q.answer):q.answers[0]);inp.dispatchEvent(new window.Event("input",{bubbles:true}));}
    return q.type;})()`);
  ev(d, `document.querySelector('[data-check="0"]').click()`);
  await sleep(1200);
  ok(!!resumeKey(shared4), "stored answers: progress on the unseeded set is saved");
  d.window.close();

  d = await boot("course=physics-3204", shared4);
  ev(d, `(function(){if(!document.getElementById("resumeBar")&&!(typeof current!=="undefined"&&current&&current.length))resumeBootCheck();})()`);
  ok(!!d.window.document.getElementById("resumeBar"), "stored answers: the interrupted unseeded set is offered on return");
  ev(d, `document.getElementById("resumeGoBtn").click()`);
  const restored4 = ev(d, `(function(){
    var q=current[0];
    if(q.type==="mc"){var s=document.querySelector('input[name="opt0"]:checked');return s&&+s.value===q.correct;}
    var inp=document.getElementById("ans0");return inp&&inp.value!=="";
  })()`);
  ok(restored4 === true, "stored answers: the saved answer is back in place (question type " + q0type4 + ")");
  ok(ev(d, `document.getElementById("fb0").dataset.done`) === "1", "stored answers: the checked state is restored");
  d.window.close();

  /* ===== stored set: an entry that left the bank drops the save ===== */
  const shared5 = {};
  d = await boot("course=physics-3204&unit=1", shared5);
  await sleep(1200);
  const key5 = resumeKey(shared5);
  ok(!!key5, "dropped save: the dealt set wrote its save before tampering");
  if (key5) {
    const p5 = JSON.parse(shared5[key5]);
    p5.body.items[0].e = "entry-that-no-longer-exists";
    shared5[key5] = JSON.stringify(p5);
  }
  d.window.close();

  d = await boot("course=physics-3204", shared5);
  ev(d, `(function(){if(!document.getElementById("resumeBar")&&!(typeof current!=="undefined"&&current&&current.length))resumeBootCheck();})()`);
  await sleep(300);
  ok(!d.window.document.getElementById("resumeBar"), "dropped save: a set whose entry left the bank is not offered");
  ok(!resumeKey(shared5), "dropped save: the save is discarded silently");
  ok(ev(d, "current ? current.length : 0") === 0, "dropped save: nothing is applied");
  d.window.close();

  d = await boot("course=physics-3204&unit=1", shared5);
  ok(ev(d, "current ? current.length : 0") > 0, "dropped save: the course still deals a fresh set afterwards");
  d.window.close();

  /* ===== stored set: an expired save is not offered ===== */
  const shared6 = {};
  d = await boot("course=physics-3204&unit=1", shared6);
  await sleep(1200);
  const key6 = resumeKey(shared6);
  ok(!!key6, "expiry: the dealt set wrote its save before ageing");
  if (key6) {
    const p6 = JSON.parse(shared6[key6]);
    p6.ts = Date.now() - 8 * 24 * 60 * 60 * 1000;
    shared6[key6] = JSON.stringify(p6);
  }
  d.window.close();

  d = await boot("course=physics-3204", shared6);
  ev(d, `(function(){if(!document.getElementById("resumeBar")&&!(typeof current!=="undefined"&&current&&current.length))resumeBootCheck();})()`);
  await sleep(300);
  ok(!d.window.document.getElementById("resumeBar"), "expiry: a stored-set save older than the 7-day TTL is not offered");
  ok(!resumeKey(shared6), "expiry: the expired save is discarded");
  d.window.close();

  console.log(fail ? "RESUME GATE FAIL (" + fail + ")" : "RESUME GATE PASS: " + pass + " assertions");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR: " + (e && e.stack || e)); process.exit(2); });
