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
   token, the code box markup and wiring are present on the
   StudyMate page (studymate.html) and absent from the picker
   (the box was moved off the picker on Nov 16, 2026, so the new
   build can be tested in one place while the picker stays
   clean), and a jsdom boot of the StudyMate page shows the code
   box, answers an unknown code with the not-recognized message,
   and attempts navigation (jsdom's not-implemented navigation
   error) for a known code typed lowercase with its space.
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

/* ---------------- Part 2: code box on studymate.html, jsdom boot ---------------- */
const smHtml = fs.readFileSync(ROOT + "/studymate.html", "utf8");
ok(!html.includes('id="pkCodeForm"'), "picker no longer carries the pack code form");
ok(smHtml.includes('id="pkCodeForm"'), "StudyMate page carries the pack code form");
ok(smHtml.includes('id="pkCodeIn"'), "StudyMate page carries the pack code input");
ok(smHtml.includes('src="pack-codes.js"'), "StudyMate page loads pack-codes.js");
ok(smHtml.includes("window.PACK_CODES"), "StudyMate page wiring reads the registry");

async function part2() {
  const { JSDOM } = require("jsdom");
  const navErrors = [];
  const { VirtualConsole } = require("jsdom");
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => { if (/Not implemented: navigation/.test(e.message)) navErrors.push(e.message); });
  const dom = new JSDOM(smHtml, {
    url: "file:///home/hatch/workspace/review-app-unified/studymate.html",
    runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
  });
  await new Promise(r => setTimeout(r, 2500));
  const d = dom.window.document;
  const form = d.getElementById("pkCodeForm");
  ok(!!form, "jsdom StudyMate boot: code form present");
  const dl = d.querySelector('a[href="packs/math-2201-unit-1.pdf"]');
  ok(!!dl, "jsdom StudyMate boot: Unit 1 pack download still listed");
  const input = d.getElementById("pkCodeIn");
  const msg = d.getElementById("pkCodeMsg");
  /* unknown code: the not-recognized message, no navigation */
  input.value = "ZZZ ZZZ";
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(/not recognized/.test(msg.textContent), "unknown code gets the not-recognized message");
  ok(navErrors.length === 0, "unknown code attempts no navigation");
  /* known code, typed lowercase with its space: navigation attempted */
  const known = regCodes[0];
  input.value = (known.slice(0, 3) + " " + known.slice(3)).toLowerCase();
  form.dispatchEvent(new dom.window.Event("submit", { cancelable: true, bubbles: true }));
  ok(navErrors.length === 1, "known code typed lowercase with a space attempts navigation to its set");
  ok(!/not recognized/.test(msg.textContent) || navErrors.length === 1, "known code is not rejected");
  console.log("gate-pack-codes: " + pass + " pass, " + fail + " fail");
  process.exit(fail ? 1 : 0);
}
part2().catch(e => { console.log("FAIL: jsdom part threw: " + e.message); console.log("gate-pack-codes: " + pass + " pass, " + (fail + 1) + " fail"); process.exit(1); });
