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
    if (!/Checking the teacher code registry/.test(msg.textContent)) return;
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

async function part2() {
  await bootBoxLive();
  await bootBoxSheetDown();
  console.log("gate-pack-codes: " + pass + " pass, " + fail + " fail");
  process.exit(fail ? 1 : 0);
}
part2().catch(e => { console.log("FAIL: jsdom part threw: " + e.message); console.log("gate-pack-codes: " + pass + " pass, " + (fail + 1) + " fail"); process.exit(1); });
