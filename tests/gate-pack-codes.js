#!/usr/bin/env node
/* StudyMate pack code gate (Nov 16, 2026): the code registry that
   ships with the shell (pack-codes.js) must resolve every printed
   pack code to the identical set the pack carries, question for
   question, in order, through the app's own set rebuild path
   (tBuildTok over the set token). Expectations live in
   tests/pack-expectations-math-2201-u1.json, generated from the
   pack composer's data at pack build time; a regenerated pack
   regenerates both files in the same pass.
   Also gated: the codes use only the unambiguous pack alphabet,
   every registry entry targets its course with a well-formed set
   token, and the code box lives on the Review Apps home page
   (index.html). That page must carry the form, load the registry
   and carry the resolution wiring, and a jsdom boot of it shows
   the code box on the picker, answers an unknown code with the
   not-recognized message, and attempts navigation (jsdom's
   not-implemented navigation error) for a known pack code typed
   lowercase with its space. The same boot, with the living sheet
   registry stubbed in, also resolves a teacher-minted code from
   the sheet; with the sheet fetch failing, a teacher code gets
   the registry-unavailable message (never the not-recognized
   one) while a pack code still resolves. The StudyMate page
   (studymate.html) is retired: it must carry the redirect to the
   home page and no trace of the catalogue (no code form, no
   registry load, no pack download links).
   (History: the box launched on the picker on Nov 16, 2026, was
   moved to the StudyMate page the same day for testing, and was
   briefly restored to the picker on Nov 17, 2026 under a
   misreading of Jason's placement instruction; he corrected it
   the same day. On Nov 18, 2026 Jason approved the StudyMate
   pivot build: the box moved to the home page for good, pack
   codes and teacher-minted codes share it, and the StudyMate
   page became a redirect.)
   Code entry routing (Nov 18, 2026, later the same day): a code
   must land on the online practice view for every code family,
   with the teacher route one click deep on that view. Part 2b
   runs the box wiring in a vm and asserts the exact navigation
   it attempts for each family (via=code set, print mode removed
   or set aside as tmode, the frozen set or seed carried
   unchanged). Part 3 boots the app on the produced addresses
   and asserts the practice landing, the identical question set,
   the teacher route bar and its target, the teacher view it
   opens, and that the same addresses without via keep their
   established views. Part 4 covers the registry snapshot read
   layer added later the same day: resolution order pack,
   snapshot, sheet, proven with stubbed fetchers and call
   counters, plus the shipped fetchSnapshotCodes validation,
   the snapshot generator against a gviz fixture, and the
   seeded snapshot file committed in the repo.
   Run: NODE_PATH=/home/hatch/workspace/physics-2204-review/node_modules node tests/gate-pack-codes.js */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

/* ---------------- Part 1: registry resolution ---------------- */
global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["math-2201"];
eval(fs.readFileSync(ROOT + "/pack-codes.js", "utf8"));
const REG = window.PACK_CODES || {};
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));
var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-2201.js", "utf8"));
var CR_MARKS = window.__BANK_CRMARKS;
var _tUid = 0;
function extractFn(src, name) {
  const start = src.indexOf("function " + name + "(");
  if (start < 0) throw new Error("missing function " + name);
  let i = src.indexOf("{", start), depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  throw new Error("unbalanced " + name);
}
for (const n of ["canonQ", "tB64", "tUnB64", "tRawQ", "tStreamDraw", "tBuildTok", "tEntryById"]) {
  eval(extractFn(html, n).replace("function tEntryById", "function tEntryById"));
}

const EXP = JSON.parse(fs.readFileSync(ROOT + "/tests/pack-expectations-math-2201-u1.json", "utf8"));
const ALPHABET = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/;
const regCodes = Object.keys(REG).sort();
const expCodes = Object.keys(EXP.sets).sort();
ok(regCodes.length === expCodes.length && regCodes.every((c, i) => c === expCodes[i]),
   "registry codes match the expectation set exactly (" + regCodes.length + " codes)");

for (const code of regCodes) {
  ok(ALPHABET.test(code), code + ": code uses only the unambiguous alphabet");
  const q = (REG[code] || {}).q || "";
  const p = new URLSearchParams(q);
  ok(p.get("course") === "math-2201", code + ": targets math-2201");
  const set = p.get("set") || "";
  const parts = set.split(":");
  ok(parts.length >= 3, code + ": set token is well formed");
  const view = parts[0], salt = parts[1], body = parts.slice(2).join(":");
  ok(view === EXP.sets[code].view, code + ": view matches the pack (" + view + ")");
  let toks;
  if (view === "e") {
    const segs = body.split(";");
    toks = (segs[0] ? segs[0].split(",") : []).concat(segs[1] ? segs[1].split(",") : []);
  } else {
    toks = body.split(",");
  }
  const avoid = {};
  const rebuilt = toks.map(tok => tBuildTok(tok, avoid, salt));
  ok(rebuilt.every(qq => !!qq), code + ": every token rebuilds a question");
  const canons = rebuilt.map(qq => canonQ(qq));
  const want = EXP.sets[code].canons;
  ok(canons.length === want.length, code + ": rebuild count " + canons.length + " == printed " + want.length);
  let firstBad = -1;
  for (let i = 0; i < Math.min(canons.length, want.length); i++) {
    if (canons[i] !== want[i]) { firstBad = i; break; }
  }
  ok(firstBad < 0, code + ": rebuilt set is identical to the printed set, question for question, in order" +
     (firstBad >= 0 ? " (first mismatch at question " + (firstBad + 1) + ")" : ""));
}

/* ---------------- Part 2: the code box on the home page; the StudyMate page redirects ---------------- */
const smHtml = fs.readFileSync(ROOT + "/studymate.html", "utf8");
function boxWiring(text) {
  const blocks = [...text.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const blk = blocks.find(b => b.includes("pkCodeForm") && b.includes("addEventListener"));
  if (!blk) return null;
  const a = blk.indexOf("(function(){");
  const b = blk.indexOf("})();", a);
  return (a < 0 || b < 0) ? null : blk.slice(a, b + 5);
}
ok(/<meta http-equiv="refresh" content="0; url=\.\/"/.test(smHtml) || smHtml.includes('location.replace("./")'),
   "StudyMate page (studymate.html) redirects to the home page");
for (const probe of ['id="pkCodeForm"', 'id="pkCodeIn"', 'src="pack-codes.js"', "packs/math-2201-unit-1.pdf", "window.PACK_CODES"]) {
  ok(!smHtml.includes(probe), "StudyMate page carries no " + probe + " (retired catalogue)");
}
for (const probe of ['id="pkCodeForm"', 'id="pkCodeIn"', 'id="pkCodeHead"', 'src="pack-codes.js"', "window.PACK_CODES", "Have a code from a printed sheet?"]) {
  ok(html.includes(probe), "home page (index.html) carries " + probe);
}
ok(boxWiring(html) !== null, "home page carries the code-box resolution wiring");
/* Nov 18, 2026: the stacked bilingual rendering is gone; the home page
   language toggle governs the box and its messages instead. */
ok(!html.includes("pkcodefr"), "home page carries no stacked bilingual rendering (the pkcodefr helper is gone)");
ok(html.includes('id="pkLang"'), "home page carries the language toggle");

const TEACHER_CODE = "TES7CD";
function fakeGviz(q) {
  return "/*O_o*/\ngoogle.visualization.Query.setResponse({\"version\":\"0.6\",\"reqId\":\"0\",\"status\":\"ok\",\"table\":{\"cols\":["
    + "{\"id\":\"A\",\"label\":\"Timestamp\",\"type\":\"datetime\"},{\"id\":\"B\",\"label\":\"Code\",\"type\":\"string\"},"
    + "{\"id\":\"C\",\"label\":\"Set parameters\",\"type\":\"string\"},{\"id\":\"D\",\"label\":\"Course\",\"type\":\"string\"},"
    + "{\"id\":\"E\",\"label\":\"Date\",\"type\":\"string\"}],\"rows\":[{\"c\":[{\"v\":\"Date(2026,10,18,6,33,0)\"},{\"v\":\""
    + TEACHER_CODE + "\"},{\"v\":" + JSON.stringify(q) + "},{\"v\":\"math-2201\"},{\"v\":\"2026-11-18\"}]}]}});";
}

async function bootHome(sheetMode) {
  const { JSDOM } = require("jsdom");
  const navErrors = [];
  const { VirtualConsole } = require("jsdom");
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => { if (/Not implemented: navigation/.test(e.message)) navErrors.push(e.message); });
  const text = fs.readFileSync(ROOT + "/index.html", "utf8");
  const teacherQ = (REG[regCodes[0]] || {}).q || "";
  const dom = new JSDOM(text, {
    url: "file://" + ROOT + "/index.html",
    runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(w) {
      w.HTMLElement.prototype.scrollIntoView = function () {};
      w.fetch = function (url) {
        const u = String(url);
        if (u.includes("docs.google.com/spreadsheets")) {
          if (sheetMode === "up") return Promise.resolve({ text: () => Promise.resolve(fakeGviz(teacherQ)) });
          return Promise.reject(new Error("network down"));
        }
        return Promise.reject(new Error("unstubbed fetch"));
      };
    }
  });
  for (let i = 0; i < 40; i++) {
    if (dom.window.document.getElementById("pkCodeForm") && dom.window.PACK_CODES) break;
    await new Promise(r => setTimeout(r, 250));
  }
  await new Promise(r => setTimeout(r, 500));
  return { dom, navErrors };
}

async function settleMsg(dom, msg) {
  for (let i = 0; i < 60; i++) {
    if (!/Checking the teacher code registry|Vérification du registre/.test(msg.textContent)) return;
    await new Promise(r => setTimeout(r, 100));
  }
}

async function bootBoxLive() {
  const { dom, navErrors } = await bootHome("up");
  const d = dom.window.document;
  const pageName = "home page (sheet up)";
  const form = d.getElementById("pkCodeForm");
  ok(!!form, "jsdom " + pageName + " boot: code form present");
  ok(!!d.getElementById("courseList"), "jsdom " + pageName + " boot: course list still present");
  ok(d.getElementById("coursePicker") && d.getElementById("coursePicker").hidden === false,
     "jsdom " + pageName + " boot: the picker is the page that shows");
  const input = d.getElementById("pkCodeIn");
  const msg = d.getElementById("pkCodeMsg");
  /* unknown code: sheet answers, code absent: the not-recognized message, no navigation */
  input.value = "ZZZ ZZZ";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(/not recognized/.test(msg.textContent), pageName + ": unknown code gets the not-recognized message");
  ok(navErrors.length === 0, pageName + ": unknown code attempts no navigation");
  /* teacher code from the sheet registry, typed lowercase with its space: navigation attempted */
  input.value = (TEACHER_CODE.slice(0, 3) + " " + TEACHER_CODE.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(navErrors.length === 1, pageName + ": teacher code from the sheet registry attempts navigation to its set");
  /* known pack code, typed lowercase with its space: navigation attempted */
  const known = regCodes[0];
  input.value = (known.slice(0, 3) + " " + known.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(navErrors.length === 2, pageName + ": known pack code typed lowercase with a space attempts navigation to its set");
  ok(!/not recognized/.test(msg.textContent) || navErrors.length === 2, pageName + ": known pack code is not rejected");
  dom.window.close();
}

async function bootBoxSheetDown() {
  const { dom, navErrors } = await bootHome("down");
  const d = dom.window.document;
  const pageName = "home page (sheet down)";
  const form = d.getElementById("pkCodeForm");
  ok(!!form, "jsdom " + pageName + " boot: code form present");
  const input = d.getElementById("pkCodeIn");
  const msg = d.getElementById("pkCodeMsg");
  /* teacher code with the sheet unreachable: unavailable, never not-recognized, no navigation */
  input.value = TEACHER_CODE;
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(/not available right now/.test(msg.textContent), pageName + ": teacher code with the sheet down gets the unavailable message");
  ok(!/not recognized/.test(msg.textContent), pageName + ": teacher code with the sheet down is not called wrong");
  ok(navErrors.length === 0, pageName + ": teacher code with the sheet down attempts no navigation");
  /* pack code still resolves from the static registry alone */
  const known = regCodes[0];
  input.value = (known.slice(0, 3) + " " + known.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(navErrors.length === 1, pageName + ": pack code still resolves with the sheet down");
  dom.window.close();
}

/* Nov 18, 2026: the same box in French mode. The toggle is clicked
   first, so the resolver runs with window.__PKFR set; a pack code and
   a sheet code must both resolve, and every message must come out in
   French only. */
async function bootBoxLiveFr() {
  const { dom, navErrors } = await bootHome("up");
  const d = dom.window.document;
  const pageName = "home page, French mode (sheet up)";
  d.getElementById("pkLang").click();
  ok(dom.window.__PKFR === true, pageName + ": the toggle puts the box in French mode");
  ok((d.getElementById("pkCodeHead") || { textContent: "" }).textContent === "Vous avez un code d’une feuille imprimée ?", pageName + ": the code card heading renders in French");
  const form = d.getElementById("pkCodeForm");
  const input = d.getElementById("pkCodeIn");
  const msg = d.getElementById("pkCodeMsg");
  input.value = "ZZZ ZZZ";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(/pas été reconnu/.test(msg.textContent), pageName + ": unknown code gets the French not-recognized message, saw " + msg.textContent);
  ok(!/not recognized/.test(msg.textContent), pageName + ": unknown code gets no English message");
  ok(navErrors.length === 0, pageName + ": unknown code attempts no navigation");
  input.value = (TEACHER_CODE.slice(0, 3) + " " + TEACHER_CODE.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(navErrors.length === 1, pageName + ": teacher code from the sheet registry attempts navigation to its set");
  const known = regCodes[0];
  input.value = (known.slice(0, 3) + " " + known.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(navErrors.length === 2, pageName + ": known pack code attempts navigation to its set");
  dom.window.close();
}

async function bootBoxSheetDownFr() {
  const { dom, navErrors } = await bootHome("down");
  const d = dom.window.document;
  const pageName = "home page, French mode (sheet down)";
  d.getElementById("pkLang").click();
  ok(dom.window.__PKFR === true, pageName + ": the toggle puts the box in French mode");
  const form = d.getElementById("pkCodeForm");
  const input = d.getElementById("pkCodeIn");
  const msg = d.getElementById("pkCodeMsg");
  input.value = TEACHER_CODE;
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  await settleMsg(dom, msg);
  ok(/n’est pas disponible en ce moment/.test(msg.textContent), pageName + ": teacher code with the sheet down gets the French unavailable message, saw " + msg.textContent);
  ok(!/not available right now/.test(msg.textContent), pageName + ": teacher code with the sheet down gets no English message");
  ok(navErrors.length === 0, pageName + ": teacher code with the sheet down attempts no navigation");
  const known = regCodes[0];
  input.value = (known.slice(0, 3) + " " + known.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(navErrors.length === 1, pageName + ": pack code still resolves with the sheet down");
  dom.window.close();
}

/* ---------------- Part 2b: the resolver marks code entry (Nov 18, 2026) ----------------
   One code, one behaviour: whatever family a code belongs to, the
   navigation the box attempts carries via=code and lands on the
   online practice view. The wiring is run in a vm with a stubbed
   document and a location whose href setter captures the target,
   so the exact navigation is asserted, not just its occurrence. */
const vm = require("vm");
function resolverTarget(q) {
  const wiring = boxWiring(html);
  if (!wiring) return null;
  let href = null;
  const input = { value: "" };
  const msg = { textContent: "" };
  const form = { _h: null, addEventListener(ev, fn) { if (ev === "submit") this._h = fn; } };
  const documentStub = { getElementById: (id) => id === "pkCodeForm" ? form : id === "pkCodeIn" ? input : id === "pkCodeMsg" ? msg : null };
  const locationStub = { pathname: "/ReviewApps/index.html" };
  Object.defineProperty(locationStub, "href", { set(v) { href = v; }, get() { return href; } });
  const windowStub = {
    PACK_CODES: { "ABCDEF": { q } },
    fetchSheetCodes: () => Promise.resolve({ ok: true, codes: {}, rows: 0 }),
    __PKFR: false
  };
  const ctx = { window: windowStub, document: documentStub, location: locationStub, URLSearchParams, console };
  vm.createContext(ctx);
  vm.runInContext(wiring, ctx);
  input.value = "ABCDEF";
  form._h({ preventDefault() {} });
  return href;
}
function checkResolver(label, q, want) {
  const href = resolverTarget(q);
  ok(!!href, label + ": the box attempts a navigation");
  if (!href) return;
  const p = new URLSearchParams(href.split("?")[1] || "");
  ok(p.get("via") === "code", label + ": the navigation is marked via=code");
  ok(!p.get("mode"), label + ": the navigation carries no print mode");
  if (want.set !== undefined) ok(p.get("set") === want.set, label + ": the frozen set value is carried unchanged");
  if (want.seed !== undefined) ok(p.get("seed") === want.seed, label + ": the seed is carried unchanged");
  if (want.tmode !== undefined) ok(p.get("tmode") === want.tmode, label + ": the print mode is set aside as tmode=" + want.tmode);
  if (want.noTmode) ok(!p.get("tmode"), label + ": no tmode is set aside");
}
function part2b() {
  const pSet = new URLSearchParams(REG["THX2JE"].q).get("set");
  checkResolver("resolver, pack practice code", REG["THX2JE"].q, { set: pSet, noTmode: true });
  const eSet = new URLSearchParams(REG["J3RQAU"].q).get("set");
  checkResolver("resolver, pack exam code", REG["J3RQAU"].q, { set: eSet, noTmode: true });
  const sSet = "s" + pSet.slice(1);
  const sheetQ = "course=math-2201&unit=1&count=8&order=random&set=" + encodeURIComponent(sSet) + "&mode=sheet";
  checkResolver("resolver, minted sheet code", sheetQ, { set: sSet, noTmode: true });
  checkResolver("resolver, seed-derived code", "course=math-2201&unit=1&count=10&order=unit&seed=apple&mode=exam",
                { seed: "apple", tmode: "exam" });
}

/* ---------------- Part 3: code arrivals land on the practice view ----------------
   Full app boots on the URLs the resolver produces: a set-valued
   code opens the practice view (never the sheet or exam view),
   with the teacher route bar on top, and the bar's link opens
   the same frozen set in its teacher view. The same addresses
   without the via flag keep their established views. The settle
   helper mirrors the shipped boot dispatch (including its
   teacher bar call) for the jsdom script-ordering reason given
   in tests/print-smoke.js. */
function codeEntryQuery(q) {
  const p = new URLSearchParams(q);
  p.set("via", "code");
  if (p.get("set")) p.delete("mode");
  else if (p.get("seed")) { const m = p.get("mode"); if (m === "sheet" || m === "exam") p.set("tmode", m); p.delete("mode"); }
  return p.toString();
}
function bootCourse(qs) {
  const { JSDOM } = require("jsdom");
  return new Promise((resolve) => {
    const dom = new JSDOM(html, {
      url: "file://" + ROOT + "/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
    });
    setTimeout(() => settleCourse(dom).then(() => resolve(dom)), 2000);
  });
}
function settleCourse(dom) {
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
            + "var landed=false;"
            + "try{landed=((typeof current!=='undefined'&&current&&current.length>0)"
            + "||(typeof examState!=='undefined'&&examState&&examState.ex&&(examState.ex.srItems.length+examState.ex.crItems.length)>0)"
            + "||(typeof sheetState!=='undefined'&&sheetState&&sheetState.items&&sheetState.items.length>0));}catch(e){}"
            + "if(landed)return;"
            + "if(p.get('set')){if(tRebuildFromURL())tCodeTeacherBar();return;}"
            + "if(!(p.get('unit')||p.get('preset')||p.get('indicator')))return;"
            + "var m=p.get('mode');"
            + "if(m==='sheet'||m==='worksheet'){startSheet();}"
            + "else if(m==='exam'){startExam();}"
            + "else{startOnline();tCodeTeacherBar();}"
            + "})()");
        } catch (e) {}
        setTimeout(() => res(dom), 120);
      }
    }, 50);
  });
}
const cev = (d, code) => d.window.eval(code);
function teacherHrefOf(d) {
  const a = d.window.document.querySelector(".codeteach a");
  return a ? a.getAttribute("href") || "" : "";
}
async function part3() {
  /* pack exam code (an "e" set value with mode=exam in the registry) */
  let d = await bootCourse(codeEntryQuery(REG["J3RQAU"].q));
  ok(cev(d, "!!examState") === false && cev(d, "!!sheetState") === false,
     "code arrival, pack exam code: no exam or sheet view opens");
  ok(cev(d, "current.length") === EXP.sets["J3RQAU"].canons.length,
     "code arrival, pack exam code: the practice view carries all " + EXP.sets["J3RQAU"].canons.length + " questions");
  const canons = JSON.parse(cev(d, "JSON.stringify(current.map(function(q){return canonQ(q);}))"));
  ok(JSON.stringify(canons) === JSON.stringify(EXP.sets["J3RQAU"].canons),
     "code arrival, pack exam code: the practice set is the printed set, question for question, in order");
  let href = teacherHrefOf(d);
  ok(!!href, "code arrival, pack exam code: the teacher route bar is present");
  let hp = new URLSearchParams(href.split("?")[1] || "");
  ok(hp.get("teacher") === "1" && hp.get("mode") === "exam" && hp.get("set") === new URLSearchParams(REG["J3RQAU"].q).get("set"),
     "code arrival, pack exam code: the teacher route names the same frozen set, teacher view, exam mode");
  ok((d.window.document.querySelector(".codeteach") || { textContent: "" }).textContent.includes("Teacher: print or edit this set"),
     "code arrival, pack exam code: the teacher route is labelled for teachers");
  const teacherQs = href.split("?")[1];
  d.window.close();
  d = await bootCourse(teacherQs);
  ok(cev(d, "typeof TEACHER!=='undefined'&&TEACHER") === true, "teacher route, pack exam code: the teacher view opens");
  ok(cev(d, "!!examState&&!!examState.ex") && cev(d, "examState.ex.srItems.length+examState.ex.crItems.length") === EXP.sets["J3RQAU"].canons.length,
     "teacher route, pack exam code: the same frozen set is on the exam paper");
  ok(!d.window.document.querySelector(".codeteach"), "teacher route, pack exam code: no student-facing teacher bar in the teacher view");
  d.window.close();
  /* the same pack exam address without the via flag keeps the exam view */
  d = await bootCourse(REG["J3RQAU"].q);
  ok(cev(d, "!!examState&&!!examState.ex") && cev(d, "examState.ex.srItems.length+examState.ex.crItems.length") === EXP.sets["J3RQAU"].canons.length,
     "shared link control, pack exam address: the exam view still opens without via");
  ok(!d.window.document.querySelector(".codeteach"), "shared link control, pack exam address: no teacher bar without via");
  d.window.close();
  /* a sheet-valued code (the teacher-minted shape) */
  const pSet = new URLSearchParams(REG["THX2JE"].q).get("set");
  const sSet = "s" + pSet.slice(1);
  const sheetQ = "course=math-2201&unit=1&count=8&order=random&set=" + encodeURIComponent(sSet) + "&mode=sheet";
  d = await bootCourse(codeEntryQuery(sheetQ));
  ok(cev(d, "!!sheetState") === false && cev(d, "current.length") === 8,
     "code arrival, sheet code: the practice view carries the 8 questions, not the sheet");
  href = teacherHrefOf(d);
  hp = new URLSearchParams(href.split("?")[1] || "");
  ok(hp.get("teacher") === "1" && hp.get("mode") === "sheet" && hp.get("set") === sSet,
     "code arrival, sheet code: the teacher route names the same frozen set, teacher view, sheet mode");
  d.window.close();
  d = await bootCourse(sheetQ);
  ok(cev(d, "!!sheetState&&sheetState.items.length===8"), "shared link control, sheet address: the sheet view still opens without via");
  d.window.close();
  /* a pack practice code (a "p" set value) and its teacher route */
  d = await bootCourse(codeEntryQuery(REG["THX2JE"].q));
  ok(cev(d, "current.length") === 8, "code arrival, pack practice code: the practice view carries the 8 questions");
  href = teacherHrefOf(d);
  hp = new URLSearchParams(href.split("?")[1] || "");
  ok(hp.get("teacher") === "1" && !hp.get("mode") && hp.get("set") === pSet,
     "code arrival, pack practice code: the teacher route names the same frozen set with no print mode");
  d.window.close();
  /* a seed-derived code: the seeded set drawn as practice */
  d = await bootCourse("course=math-2201&unit=1&mc=4&nc=2&seed=apple&via=code&tmode=sheet");
  ok(cev(d, "!!sheetState") === false && cev(d, "current.length") >= 1,
     "code arrival, seed code: the seeded set opens as practice, not as a sheet");
  href = teacherHrefOf(d);
  hp = new URLSearchParams(href.split("?")[1] || "");
  ok(hp.get("teacher") === "1" && hp.get("mode") === "sheet" && hp.get("seed") === "apple",
     "code arrival, seed code: the teacher route restores the sheet mode the code was printed from");
  d.window.close();
}

/* ---------------- Part 4: the registry snapshot read layer (Nov 18, 2026) ----
   Resolution order is pack registry, then the published snapshot of
   the sheet registry (code-registry.json, refreshed from the sheet
   by tools/sync-code-registry.py under a GitHub Actions workflow),
   then the live sheet only for a code too fresh for the snapshot.
   The cases below stub both fetchers with call counters and assert
   which reads a lookup actually makes; the real fetchSnapshotCodes
   is then run against canned snapshot JSON to prove its row
   validation; the generator script is run against a gviz fixture;
   and the seeded snapshot committed in the repo is validated. */
function snapResolver(code, opts) {
  const wiring = boxWiring(html);
  let href = null;
  const input = { value: "" };
  const msg = { textContent: "" };
  const form = { _h: null, addEventListener(ev, fn) { if (ev === "submit") this._h = fn; } };
  const documentStub = { getElementById: (id) => id === "pkCodeForm" ? form : id === "pkCodeIn" ? input : id === "pkCodeMsg" ? msg : null };
  const locationStub = { pathname: "/ReviewApps/index.html" };
  Object.defineProperty(locationStub, "href", { set(v) { href = v; }, get() { return href; } });
  const calls = { snap: 0, sheet: 0 };
  const windowStub = {
    PACK_CODES: opts.pack || {},
    fetchSnapshotCodes: () => { calls.snap++; return Promise.resolve(opts.snap); },
    fetchSheetCodes: () => { calls.sheet++; return Promise.resolve(opts.sheet); },
    __PKFR: false
  };
  const ctx = { window: windowStub, document: documentStub, location: locationStub, URLSearchParams, console };
  vm.createContext(ctx);
  vm.runInContext(wiring, ctx);
  input.value = code;
  form._h({ preventDefault() {} });
  return new Promise((resolve) => setTimeout(() => resolve({ href, msg: msg.textContent, calls }), 30));
}
async function part4() {
  const Q = "course=math-2201&unit=1&count=8&order=random&mode=sheet&set=" +
            encodeURIComponent("s:sm2201u1:u1-pk-hypotenuse-pick.0.0M");
  /* a code only in the snapshot resolves with no sheet read at all */
  let r = await snapResolver("SNAP22", {
    snap: { ok: true, codes: { "SNAP22": Q }, rows: 1 },
    sheet: { ok: true, codes: { "SNAP22": "course=math-2201&set=p%3Aother" }, rows: 9 }
  });
  ok(!!r.href, "snapshot layer, snapshot-only code: the box navigates");
  ok(r.href && new URLSearchParams(r.href.split("?")[1]).get("set") === "s:sm2201u1:u1-pk-hypotenuse-pick.0.0M",
     "snapshot layer, snapshot-only code: it navigates to the snapshot's set");
  ok(r.calls.snap === 1 && r.calls.sheet === 0,
     "snapshot layer, snapshot-only code: the sheet is never read");
  /* a code missing from the snapshot but in the sheet falls back */
  r = await snapResolver("SNAP22", {
    snap: { ok: true, codes: {}, rows: 4 },
    sheet: { ok: true, codes: { "SNAP22": Q }, rows: 5 }
  });
  ok(!!r.href && r.calls.snap === 1 && r.calls.sheet === 1,
     "snapshot layer, fresh code: the sheet fallback resolves it after a snapshot miss");
  /* a failed snapshot read degrades to the sheet path */
  r = await snapResolver("SNAP22", {
    snap: { ok: false, codes: {}, rows: 0 },
    sheet: { ok: true, codes: { "SNAP22": Q }, rows: 5 }
  });
  ok(!!r.href && r.calls.sheet === 1,
     "snapshot layer, snapshot read failure: resolution degrades to the sheet");
  /* a pack code still resolves first, with neither registry read */
  r = await snapResolver("THX2JE", {
    pack: REG,
    snap: { ok: true, codes: { "THX2JE": "course=math-2201&set=p%3Awrong" }, rows: 1 },
    sheet: { ok: true, codes: { "THX2JE": "course=math-2201&set=p%3Awrong" }, rows: 1 }
  });
  ok(!!r.href && r.calls.snap === 0 && r.calls.sheet === 0,
     "snapshot layer, ordering: a pack code resolves before snapshot and sheet");
  ok(r.href && new URLSearchParams(r.href.split("?")[1]).get("set") === new URLSearchParams(REG["THX2JE"].q).get("set"),
     "snapshot layer, ordering: the pack set is the one that opens");
  /* a code in none of them, with both reads healthy, is not recognized */
  r = await snapResolver("SNAP22", {
    snap: { ok: true, codes: {}, rows: 4 },
    sheet: { ok: true, codes: {}, rows: 5 }
  });
  ok(!r.href && /not recognized/.test(r.msg),
     "snapshot layer, unknown code: not recognized when both reads succeeded");
  /* a code in neither, with the sheet unreadable, is unavailable, not wrong */
  r = await snapResolver("SNAP22", {
    snap: { ok: true, codes: {}, rows: 4 },
    sheet: { ok: false, codes: {}, rows: 0 }
  });
  ok(!r.href && /not available right now/.test(r.msg),
     "snapshot layer, sheet down and snapshot miss: unavailable rather than wrong");

  /* the shipped fetchSnapshotCodes applies the registry validation */
  const regMatch = html.match(/var CODE_REGISTRY=(\{[\s\S]*?\});/);
  ok(!!regMatch, "snapshot layer: CODE_REGISTRY is present in the shell");
  ok(regMatch && regMatch[1].indexOf("code-registry.json") >= 0,
     "snapshot layer: the registry config names the snapshot file");
  const snapFn = extractFn(html, "fetchSnapshotCodes");
  function runSnapFetch(fetchImpl) {
    const ctx = { URLSearchParams, console, fetch: fetchImpl };
    vm.createContext(ctx);
    vm.runInContext("var CODE_REGISTRY=" + regMatch[1] + ";\n" +
                    "var _snapshotCodesPromise=null,_snapshotCodesCache=null;\n" + snapFn +
                    "\nthis.__p=fetchSnapshotCodes();", ctx);
    return ctx.__p;
  }
  const canned = { v: 1, codes: {
    "ABC234": "course=math-2201&set=s%3Aabc",
    "BAD0O1": "course=math-2201&set=s%3Aabc",
    "SHORT": "course=math-2201&set=s%3Aabc",
    "NOSET2": "course=math-2201&unit=1"
  } };
  let res = await runSnapFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve(canned) }));
  ok(res.ok === true && res.rows === 1 && Object.keys(res.codes).join(",") === "ABC234",
     "snapshot layer: fetchSnapshotCodes keeps only codes passing the registry validation");
  res = await runSnapFetch(() => Promise.resolve({ ok: false, json: () => Promise.resolve({}) }));
  ok(res.ok === false, "snapshot layer: a failed snapshot fetch reports not ok, so callers fall back");

  /* the generator script applies the same validation to a gviz feed */
  const { execFileSync } = require("child_process");
  const os = require("os"), path = require("path");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "regsync-"));
  const fixture = "google.visualization.Query.setResponse({\"version\":\"0.6\",\"reqId\":\"0\",\"status\":\"ok\",\"table\":{\"cols\":[{\"label\":\"Timestamp\"},{\"label\":\"Code\"},{\"label\":\"Params\"}],\"rows\":[" +
    "{\"c\":[{\"v\":\"2026-11-18 10:00:00\"},{\"v\":\"XYZ234\"},{\"v\":\"course=math-2201&unit=1&set=s%3Aabc\"}]}," +
    "{\"c\":[{\"v\":\"2026-11-18 10:01:00\"},{\"v\":\"BAD 01\"},{\"v\":\"course=math-2201&set=s%3Aabc\"}]}," +
    "{\"c\":[{\"v\":\"2026-11-18 10:02:00\"},{\"v\":\"NOSET2\"},{\"v\":\"course=math-2201&unit=1\"}]}," +
    "{\"c\":[{\"v\":\"2026-11-18 10:03:00\"},{\"v\":\"ABC234\"},{\"v\":\"course=sci-9&set=e%3Axyz\"}]}" +
    "]}});";
  fs.writeFileSync(path.join(tmp, "fixture.txt"), fixture);
  execFileSync("python3", [ROOT + "/tools/sync-code-registry.py", "--source", path.join(tmp, "fixture.txt"),
                           "--out", path.join(tmp, "out.json")], { stdio: "pipe" });
  const gen = JSON.parse(fs.readFileSync(path.join(tmp, "out.json"), "utf8"));
  ok(gen.v === 1 && Object.keys(gen.codes).join(",") === "ABC234,XYZ234",
     "snapshot layer: the generator keeps exactly the valid rows, keys sorted");
  ok(gen.codes["XYZ234"] === "course=math-2201&unit=1&set=s%3Aabc",
     "snapshot layer: the generator carries the set parameters unchanged");

  /* the seeded snapshot committed in the repo is well formed */
  const seeded = JSON.parse(fs.readFileSync(ROOT + "/code-registry.json", "utf8"));
  const codes = seeded.codes || {};
  const keys = Object.keys(codes);
  ok(seeded.v === 1 && keys.length > 0, "snapshot layer: the seeded snapshot exists and is not empty");
  ok(keys.every(k => /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/.test(k) &&
                     String(codes[k]).indexOf("course=") >= 0 && String(codes[k]).indexOf("set=") >= 0),
     "snapshot layer: every seeded entry passes the registry validation");
}

async function part2() {
  await bootBoxLive();
  await bootBoxSheetDown();
  await bootBoxLiveFr();
  await bootBoxSheetDownFr();
  part2b();
  await part3();
  await part4();
  console.log("gate-pack-codes: " + pass + " pass, " + fail + " fail");
  process.exit(fail ? 1 : 0);
}
part2().catch(e => { console.log("FAIL: jsdom part threw: " + e.message); console.log("gate-pack-codes: " + pass + " pass, " + (fail + 1) + " fail"); process.exit(1); });
