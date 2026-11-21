#!/usr/bin/env node
/* Gate (load + census + draw) for the French Science 8 build:
     node tests/gate-load-sci-8-fr.js
   Expectations are the French authoring spec (Nov 16, 2026):
   - courses.js registers sci-8-fr (Sciences, grade 8,
     listed: true, curriculum NL, language fr). The French bank
     is its own build keyed to the French guide, not a translation
     of the English bank.
   - Census pins below are the spec census, measured from the
     assembled bank at build time.
   - Every entry draws clean questions; SR draws carry exactly 4
     options with exactly one correct; every entry carries exactly
     two hint stages. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["sci-8-fr"];
ok(!!C, "courses.js registers sci-8-fr");
ok(C.listed === true, "sci-8-fr is listed");
ok(C.curriculum === "NL" && C.subject === "Sciences" && C.grade === 8 && C.language === "fr", "curriculum NL, Sciences, grade 8, language fr");
ok(typeof C.units[1] === "string" && C.units[1].length > 0, "Unit 1 name registered");
ok(typeof C.units[2] === "string" && C.units[2].length > 0, "Unit 2 name registered");
ok(typeof C.units[3] === "string" && C.units[3].length > 0, "Unit 3 name registered");
ok(typeof C.units[4] === "string" && C.units[4].length > 0, "Unit 4 name registered");

const built = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...built.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof textq === "function", "mcq/textq defined");

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/sci-8-fr.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
const BIMODAL = window.__BANK_BIMODAL || {};

/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank (338 entries, CR manifest 61); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated to the bank after the 62-entry CR denomination tranche (Sciences 8: 348 entries, CR manifest 71 entries, 227 marks); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (reverse bimodal registration): CR pins updated to the bank after the registration of the 220 strippable entries (78 class a, 142 class b, 542 marks) per Bimodal-Classification-SR-Pools-Science-2026-11-20.md (Sciences 8: CR manifest 291 entries, 769 marks; Unit 1 74 entries, 200 marks; Unit 2 74 entries, 195 marks; Unit 3 64 entries, 170 marks; Unit 4 79 entries, 204 marks); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 21, 2026 (test plan build, Rulings 9, 10
   and 11): 15 entries added (Unit 3: four plain SR and one
   2-mark CR on SC8.7.3, four plain SR and CR entries of 3 and 3
   marks on SC8.7.4; Unit 4: one 2-mark CR on SC8.10.1 and three
   plain SR, one on SC8.10.5 and two on SC8.10.6). Census pins
   updated accordingly: bank 363, units 86 / 86 / 100 / 91, CR
   manifest 295 entries and 779 marks, U3 CR 67 entries and 178
   marks, U4 CR 80 entries and 206 marks, levels 36/42/22 in
   Unit 3 and 34/38/19 in Unit 4. Values verified from the
   assembled bank the same day. No bank content was changed to
   fit this gate. */
ok(BANK.length === 363, "bank registers 363 entries, saw " + BANK.length);
const U1 = BANK.filter(e => e.unit === 1);
ok(U1.length === 86, "86 entries are Unit 1, saw " + U1.length);
const U2 = BANK.filter(e => e.unit === 2);
ok(U2.length === 86, "86 entries are Unit 2, saw " + U2.length);
const U3 = BANK.filter(e => e.unit === 3);
ok(U3.length === 100, "100 entries are Unit 3, saw " + U3.length);
const U4 = BANK.filter(e => e.unit === 4);
ok(U4.length === 91, "91 entries are Unit 4, saw " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 363, "all entry ids unique");
ok(BANK.every(e => e.hint1 && e.hint2), "every entry carries two hint stages");

const SPEC_U1 = { "SC8.1.1": 6, "SC8.1.2": 5, "SC8.1.3": 5, "SC8.1.4": 6, "SC8.1.5": 4, "SC8.1.6": 5, "SC8.1.7": 5, "SC8.1.8": 4, "SC8.1.9": 3, "SC8.1.10": 2, "SC8.2.1": 2, "SC8.2.2": 3, "SC8.2.3": 2, "SC8.2.4": 3, "SC8.2.5": 4, "SC8.2.6": 2, "SC8.3.1": 3, "SC8.3.2": 1, "SC8.3.3": 2, "SC8.3.4": 2, "SC8.3.5": 2, "SC8.3.6": 2, "SC8.3.7": 2, "SC8.3.8": 3, "SC8.3.9": 4, "SC8.3.10": 2, "SC8.3.11": 2 };
const p1 = {}; U1.forEach(e => { p1[e.indicators[0]] = (p1[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U1)) ok((p1[tag] || 0) === SPEC_U1[tag], "U1 primary count " + tag + " = " + SPEC_U1[tag] + ", saw " + (p1[tag] || 0));
ok(U1.filter(e => e.level === 1).length === 33 && U1.filter(e => e.level === 2).length === 35 && U1.filter(e => e.level === 3).length === 18, "U1 levels 33/35/18");
ok(U1.filter(e => CR[e.id]).length === 74 && U1.reduce((s, e) => s + (CR[e.id] || 0), 0) === 200, "U1 CR 74 entries, 200 marks");
const SPEC_U2 = { "SC8.4.1": 6, "SC8.4.2": 6, "SC8.4.3": 4, "SC8.4.4": 6, "SC8.4.5": 5, "SC8.4.6": 4, "SC8.4.7": 3, "SC8.4.8": 4, "SC8.4.9": 4, "SC8.4.10": 5, "SC8.4.11": 3, "SC8.5.1": 2, "SC8.5.2": 3, "SC8.5.3": 2, "SC8.5.4": 2, "SC8.5.5": 1, "SC8.5.6": 3, "SC8.5.7": 3, "SC8.6.1": 2, "SC8.6.2": 2, "SC8.6.3": 2, "SC8.6.4": 2, "SC8.6.5": 2, "SC8.6.6": 2, "SC8.6.7": 1, "SC8.6.8": 3, "SC8.6.9": 4 };
const p2 = {}; U2.forEach(e => { p2[e.indicators[0]] = (p2[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U2)) ok((p2[tag] || 0) === SPEC_U2[tag], "U2 primary count " + tag + " = " + SPEC_U2[tag] + ", saw " + (p2[tag] || 0));
ok(U2.filter(e => e.level === 1).length === 32 && U2.filter(e => e.level === 2).length === 37 && U2.filter(e => e.level === 3).length === 17, "U2 levels 32/37/17");
ok(U2.filter(e => CR[e.id]).length === 74 && U2.reduce((s, e) => s + (CR[e.id] || 0), 0) === 195, "U2 CR 74 entries, 195 marks");
const SPEC_U3 = { "SC8.7.1": 8, "SC8.7.2": 8, "SC8.7.3": 14, "SC8.7.4": 15, "SC8.8.1": 3, "SC8.8.2": 2, "SC8.8.3": 3, "SC8.8.4": 3, "SC8.8.5": 3, "SC8.8.6": 3, "SC8.8.7": 3, "SC8.9.1": 2, "SC8.9.2": 3, "SC8.9.3": 5, "SC8.9.4": 2, "SC8.9.5": 3, "SC8.9.6": 2, "SC8.9.7": 2, "SC8.9.8": 2, "SC8.9.9": 3, "SC8.9.10": 3, "SC8.9.12": 3, "SC8.9.13": 3, "SC8.9.14": 2 };
const p3 = {}; U3.forEach(e => { p3[e.indicators[0]] = (p3[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U3)) ok((p3[tag] || 0) === SPEC_U3[tag], "U3 primary count " + tag + " = " + SPEC_U3[tag] + ", saw " + (p3[tag] || 0));
ok(U3.filter(e => e.level === 1).length === 36 && U3.filter(e => e.level === 2).length === 42 && U3.filter(e => e.level === 3).length === 22, "U3 levels 36/42/22");
ok(U3.filter(e => CR[e.id]).length === 67 && U3.reduce((s, e) => s + (CR[e.id] || 0), 0) === 178, "U3 CR 67 entries, 178 marks");
const SPEC_U4 = { "SC8.10.1": 6, "SC8.10.2": 5, "SC8.10.3": 4, "SC8.10.4": 6, "SC8.10.5": 6, "SC8.10.6": 7, "SC8.10.7": 5, "SC8.11.1": 2, "SC8.11.2": 2, "SC8.11.3": 6, "SC8.11.4": 3, "SC8.11.5": 2, "SC8.11.6": 2, "SC8.11.7": 2, "SC8.11.8": 2, "SC8.11.10": 2, "SC8.11.9": 2, "SC8.12.1": 3, "SC8.12.3": 2, "SC8.12.2": 3, "SC8.12.4": 1, "SC8.12.5": 2, "SC8.12.6": 3, "SC8.12.7": 2, "SC8.12.8": 2, "SC8.12.9": 2, "SC8.12.10": 3, "SC8.12.11": 2, "SC8.12.12": 2 };
const p4 = {}; U4.forEach(e => { p4[e.indicators[0]] = (p4[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U4)) ok((p4[tag] || 0) === SPEC_U4[tag], "U4 primary count " + tag + " = " + SPEC_U4[tag] + ", saw " + (p4[tag] || 0));
ok(U4.filter(e => e.level === 1).length === 34 && U4.filter(e => e.level === 2).length === 38 && U4.filter(e => e.level === 3).length === 19, "U4 levels 34/38/19");
ok(U4.filter(e => CR[e.id]).length === 80 && U4.reduce((s, e) => s + (CR[e.id] || 0), 0) === 206, "U4 CR 80 entries, 206 marks");
ok(Object.keys(CR).length === 295 && Object.values(CR).reduce((a, b) => a + b, 0) === 779, "course CR manifest 295 entries, 779 marks");
ok((BANK.find(e => e.id === "s8f-u1-cr-design-salinity") || {}).noCompose === true, "design CR s8f-u1-cr-design-salinity carries noCompose");
ok((BANK.find(e => e.id === "s8f-u2-cr-design-viscosity") || {}).noCompose === true, "design CR s8f-u2-cr-design-viscosity carries noCompose");
ok((BANK.find(e => e.id === "s8f-u3-cr-design-refraction") || {}).noCompose === true, "design CR s8f-u3-cr-design-refraction carries noCompose");
ok((BANK.find(e => e.id === "s8f-u4-cr-design-rates") || {}).noCompose === true, "design CR s8f-u4-cr-design-rates carries noCompose");

/* Draw checks: 25 draws per entry. */
const badDraws = [];
for (const e of BANK) {
  for (let i = 0; i < 25; i++) {
    let q;
    try { q = e.gen(); } catch (err) { badDraws.push(e.id + " threw: " + err.message); break; }
    if (!q) { badDraws.push(e.id + ' empty draw'); break; }
    /* Amendment, November 20, 2026 (reverse bimodal registration): the draw
       check branches on the BIMODAL manifest as well as the CR marks
       manifest. An entry registered bimodal draws multiple choice
       natively; its constructed response form is produced by stripping
       at composition time and is proven by gate-bimodal, so its draws
       take the multiple choice shape checks. Entries in the CR marks
       manifest only keep the constructed response shape checks. No
       check was removed or weakened. */
    if ((CR[e.id] && !BIMODAL[e.id]) || q.type !== "mc") {
      if (!Array.isArray(q.answers) || !q.answers.length || typeof q.solution !== "string" || !q.solution) { badDraws.push(e.id + " CR shape"); break; }
    } else {
      if (q.type !== "mc" || !Array.isArray(q.options) || q.options.length !== 4) { badDraws.push(e.id + " option count"); break; }
      if (typeof q.correct !== "number" || q.correct < 0 || q.correct > 3) { badDraws.push(e.id + " bad correct index"); break; }
      if (new Set(q.options).size !== 4) { badDraws.push(e.id + " duplicate options"); break; }
      if (q.options.some(t => /undefined|NaN/.test(String(t)))) { badDraws.push(e.id + " bad option text"); break; }
    }
  }
}
ok(badDraws.length === 0, "all entries draw clean (" + badDraws.slice(0, 5).join("; ") + ")");

console.log("GATE-LOAD-SCI-8-FR: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
