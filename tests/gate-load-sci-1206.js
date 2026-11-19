#!/usr/bin/env node
/* Gate 1 (load) for Science 1206: chassis helpers + courses.js + the
   assembled bank evaluate cleanly; the course is registered in the
   Science group at grade 10 and listed on the picker (launch flip
   done Nov 12, 2026, after all gates passed);
   the config carries the 25 Knowledge indicators plus the eight
   STSE indicators registered Nov 19, 2026 (SC10.5.1, 5.3, 5.4, 5.5,
   5.6 and SC10.7.1, 7.2, 7.3, built because the test blueprint
   assigns them to real unit tests and the owner's sequencing ruling
   puts a test's items ahead of its test-shaped practice option; the
   other 19 STSE codes remain a named later tranche; SC10.9.2 has no
   stated wording anywhere and is not invented); the presets are mid =
   Units 1+2 and final = Units 3+4 (Jason's house pattern, corrected
   Nov 12, 2026; the comprehensive school finals are background
   evidence only); the exam blueprint applies the school finals'
   per-unit pattern (10 SR + 10 CR marks per unit, level totals
   [3, 9, 8] by judgement, no Table of Specifications exists); both
   reference panels are present; the bank holds 205 entries with 14
   constructed-response entries. Units 2 to 4 pools sum to exactly
   the 10 marks a paper needs; Unit 1's pool sums to 17 since the
   two map CR entries were added (Nov 12, 2026), and composition
   selects a 10-mark subset, as gate-compose proves. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["sci-1206"], "sci-1206 registered");
window.__COURSE = window.COURSES["sci-1206"];
const C = window.__COURSE;
ok(C.listed === true, "sci-1206 is listed on the picker (listed at launch, Nov 12, 2026)");
ok(C.subject === "Science" && C.grade === 10, "Science group, grade 10");
ok(C.bankFile === "sci-1206.js" && C.storagePrefix === "sci1206", "bank file and storage prefix");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/textq/varset defined");
ok(UNITS[1] === "Weather Dynamics" && UNITS[2] === "Chemical Reactions" && UNITS[3] === "Motion" && UNITS[4] === "Sustainability of Ecosystems", "UNITS read from the course config");
ok(Object.keys(INDICATORS).length === 33, "INDICATORS has 33 codes (25 Knowledge + 8 STSE registered Nov 19, 2026), saw " + Object.keys(INDICATORS).length);
ok(!("SC10.9.2" in INDICATORS), "SC10.9.2 is not registered (no stated wording exists)");
ok(JSON.stringify(C.presets.mid.units) === "[1,2]" && JSON.stringify(C.presets.final.units) === "[3,4]", "preset scopes are mid = Units 1+2, final = Units 3+4");
ok(C.presets.mid.cap === undefined && C.presets.final.cap === undefined, "presets carry no caps");
for (const p of ["mid", "final"]) {
  const ex = C.exam[p];
  ok(ex.total === 40 && ex.srCount === 20 && ex.crMarks === 20, p + " exam is 40 total / 20 SR / 20 CR");
  for (const u of ex.units) ok(JSON.stringify(ex.perUnit[u]) === JSON.stringify({ sr: 10, cr: 10, levels: [3, 9, 8] }), p + " per-unit blueprint for Unit " + u + " is 10 SR + 10 CR at levels [3,9,8]");
}
ok(C.exam.fallback.total === 50 && C.exam.fallback.srCount === 30 && C.exam.fallback.crMarks === 20, "exam fallback is 50 total / 30 SR / 20 CR");
ok(C.unitTest.total === 25 && C.unitTest.sr === 15 && C.unitTest.cr === 10, "unit test is 25 total / 15 SR / 10 CR");
ok(C.panels && typeof C.panels["2"] === "string" && C.panels["2"].length > 400, "Chemistry reference panel present (Unit 2)");
ok(C.panels && typeof C.panels["3"] === "string" && C.panels["3"].length > 400, "Motion formula panel present (Unit 3)");
ok(typeof C.finalNote === "string" && C.finalNote.includes("Units 3 and 4"), "finalNote discloses the Units 3+4 final scope");

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/sci-1206.js", "utf8"));

/* Tranche 5 amendment (Nov 13, 2026): Jason commissioned the graphics
   pass finishers tonight, including one new Unit 3 entry type,
   sci-u3-dt-story (story-to-graph matching). The bank therefore held
   157 entries and Unit 3 holds 33. STSE amendment (Nov 19, 2026):
   48 entries for the eight blueprint-assigned STSE indicators (30 in
   Unit 1, 18 in Unit 2, six per indicator) take the bank to 205. */
ok(BANK.length === 205, "BANK has 205 entries, saw " + BANK.length);
const perUnit = { 1: 0, 2: 0, 3: 0, 4: 0 };
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
ok(perUnit[1] === 83 && perUnit[2] === 64 && perUnit[3] === 33 && perUnit[4] === 25, "per-unit entries 83/64/33/25, saw " + perUnit[1] + "/" + perUnit[2] + "/" + perUnit[3] + "/" + perUnit[4]);
ok(new Set(BANK.map(e => e.id)).size === BANK.length, "entry ids are unique");
const CRMARKS = window.__BANK_CRMARKS || {};
ok(Object.keys(CRMARKS).length === 14, "CRMARKS has 14 entries, saw " + Object.keys(CRMARKS).length);
const crPerUnit = { 1: 0, 2: 0, 3: 0, 4: 0 };
BANK.forEach(e => { if (CRMARKS[e.id]) crPerUnit[e.unit] += CRMARKS[e.id]; });
ok(crPerUnit[1] >= 10 && crPerUnit[2] >= 10 && crPerUnit[3] >= 10 && crPerUnit[4] >= 10, "CR marks pool covers 10 per unit, saw " + JSON.stringify(crPerUnit));
BANK.forEach(e => {
  if (CRMARKS[e.id]) {
    const q = e.gen();
    ok(q && q.type === "text", e.id + " generates a text (CR) question");
  }
  (e.indicators || []).forEach(c => ok(c in INDICATORS, e.id + " tags an indicator outside the config: " + c));
});

if (fails.length) { console.log("GATE LOAD sci-1206: FAIL (" + fails.length + ")"); fails.forEach(f => console.log(" - " + f)); process.exit(1); }
console.log("GATE LOAD sci-1206: PASS (205 entries, 83/64/33/25 per unit, 14 CR entries, 25 Knowledge + 8 STSE indicators)");
