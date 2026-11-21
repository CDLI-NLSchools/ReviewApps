#!/usr/bin/env node
/* Gate (load + census + draw) for the French Science 7 build:
     node tests/gate-load-sci-7-fr.js
   Expectations are the French authoring spec (Nov 16, 2026):
   - courses.js registers sci-7-fr (Sciences, grade 7,
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
const C = window.COURSES["sci-7-fr"];
ok(!!C, "courses.js registers sci-7-fr");
ok(C.listed === true, "sci-7-fr is listed");
ok(C.curriculum === "NL" && C.subject === "Sciences" && C.grade === 7 && C.language === "fr", "curriculum NL, Sciences, grade 7, language fr");
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
eval(fs.readFileSync(ROOT + "/banks/sci-7-fr.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
const BIMODAL = window.__BANK_BIMODAL || {};

/* Pin update, November 19, 2026: two CR entries added to close the
   French test-blueprint CR denomination gaps (s7f-u1-cr-succession-signs,
   3 marks at SC7.1.10, and s7f-u2-cr-instrument-jobs, 3 marks at
   SC7.4.1; see Spec-French-Test-Map-2026-11-19.md, Section 4). Census
   pins below are updated accordingly: bank 302, U1 81 entries and
   U2 76, CR manifest 60 entries and 165 marks, U1 CR 16 entries and
   44 marks, U2 CR 15 entries and 42 marks, U1 levels 32/33/16,
   U2 levels 30/31/15. */
/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank (328 entries, CR manifest 65); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated to the bank after the 62-entry CR denomination tranche (Sciences 7: 336 entries, CR manifest 73 entries, 202 marks); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (reverse bimodal registration): census pins updated to the bank after the 217 strippable entries were registered bimodal (21 class a, 196 class b, 584 marks; Bimodal-Classification-SR-Pools-Science-2026-11-20.md), creating their CR marks entries (Sciences 7: CR manifest 290 entries, 786 marks; U1 CR 73 entries, 200 marks; U2 CR 71 entries, 193 marks; U3 CR 63 entries, 172 marks; U4 CR 83 entries, 221 marks); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 21, 2026 (test plan build, Rulings 9, 10
   and 11): 18 entries added (Unit 1: five plain SR and one 3-mark
   CR on SC7.1.10; Unit 2: six plain SR and CR entries of 3 and 2
   marks on SC7.4.1, one plain SR on SC7.6.7; Unit 3: two plain SR
   on SC7.7.4; Unit 4: one plain SR on SC7.10.4). Census pins
   updated accordingly: bank 354, units 96 / 93 / 73 / 92, CR
   manifest 293 entries and 794 marks, U1 CR 74 entries and 203
   marks, U2 CR 73 entries and 198 marks, levels 34/43/19,
   33/42/18, 25/34/14, 34/41/17. Values verified from the
   assembled bank the same day. No bank content was changed to
   fit this gate. */
ok(BANK.length === 354, "bank registers 354 entries, saw " + BANK.length);
const U1 = BANK.filter(e => e.unit === 1);
ok(U1.length === 96, "96 entries are Unit 1, saw " + U1.length);
const U2 = BANK.filter(e => e.unit === 2);
ok(U2.length === 93, "93 entries are Unit 2, saw " + U2.length);
const U3 = BANK.filter(e => e.unit === 3);
ok(U3.length === 73, "73 entries are Unit 3, saw " + U3.length);
const U4 = BANK.filter(e => e.unit === 4);
ok(U4.length === 92, "92 entries are Unit 4, saw " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 354, "all entry ids unique");
ok(BANK.every(e => e.hint1 && e.hint2), "every entry carries two hint stages");

const SPEC_U1 = { "SC7.1.1": 5, "SC7.1.2": 5, "SC7.1.3": 3, "SC7.1.4": 3, "SC7.1.5": 3, "SC7.1.6": 3, "SC7.1.7": 4, "SC7.1.8": 4, "SC7.1.9": 4, "SC7.1.10": 12, "SC7.2.1": 2, "SC7.2.2": 3, "SC7.2.3": 3, "SC7.2.4": 3, "SC7.2.5": 3, "SC7.2.6": 2, "SC7.2.7": 3, "SC7.2.8": 2, "SC7.3.1": 3, "SC7.3.2": 2, "SC7.3.3": 3, "SC7.3.4": 2, "SC7.3.6": 2, "SC7.3.7": 3, "SC7.3.8": 3, "SC7.3.9": 3, "SC7.3.10": 2, "SC7.3.11": 2, "SC7.3.12": 2, "SC7.3.13": 2 };
const p1 = {}; U1.forEach(e => { p1[e.indicators[0]] = (p1[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U1)) ok((p1[tag] || 0) === SPEC_U1[tag], "U1 primary count " + tag + " = " + SPEC_U1[tag] + ", saw " + (p1[tag] || 0));
ok(U1.filter(e => e.level === 1).length === 34 && U1.filter(e => e.level === 2).length === 43 && U1.filter(e => e.level === 3).length === 19, "U1 levels 34/43/19");
ok(U1.filter(e => CR[e.id]).length === 74 && U1.reduce((s, e) => s + (CR[e.id] || 0), 0) === 203, "U1 CR 74 entries, 203 marks");
const SPEC_U2 = { "SC7.4.1": 15, "SC7.4.2": 5, "SC7.4.3": 5, "SC7.4.4": 4, "SC7.4.5": 5, "SC7.4.6": 5, "SC7.4.7": 4, "SC7.5.1": 2, "SC7.5.2": 3, "SC7.5.3": 2, "SC7.5.4": 2, "SC7.5.5": 3, "SC7.5.6": 2, "SC7.5.7": 3, "SC7.5.8": 3, "SC7.5.9": 2, "SC7.5.10": 2, "SC7.6.1": 3, "SC7.6.2": 2, "SC7.6.3": 4, "SC7.6.4": 2, "SC7.6.5": 3, "SC7.6.6": 3, "SC7.6.7": 4, "SC7.6.8": 2, "SC7.6.9": 3 };
const p2 = {}; U2.forEach(e => { p2[e.indicators[0]] = (p2[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U2)) ok((p2[tag] || 0) === SPEC_U2[tag], "U2 primary count " + tag + " = " + SPEC_U2[tag] + ", saw " + (p2[tag] || 0));
ok(U2.filter(e => e.level === 1).length === 33 && U2.filter(e => e.level === 2).length === 42 && U2.filter(e => e.level === 3).length === 18, "U2 levels 33/42/18");
ok(U2.filter(e => CR[e.id]).length === 73 && U2.reduce((s, e) => s + (CR[e.id] || 0), 0) === 198, "U2 CR 73 entries, 198 marks");
const SPEC_U3 = { "SC7.7.1": 6, "SC7.7.2": 6, "SC7.7.3": 5, "SC7.7.4": 6, "SC7.7.5": 4, "SC7.7.6": 6, "SC7.7.7": 5, "SC7.8.1": 3, "SC7.8.2": 2, "SC7.8.3": 2, "SC7.8.4": 3, "SC7.8.5": 3, "SC7.8.6": 2, "SC7.9.1": 3, "SC7.9.2": 2, "SC7.9.3": 4, "SC7.9.4": 2, "SC7.9.5": 3, "SC7.9.6": 2, "SC7.9.7": 2, "SC7.9.8": 2 };
const p3 = {}; U3.forEach(e => { p3[e.indicators[0]] = (p3[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U3)) ok((p3[tag] || 0) === SPEC_U3[tag], "U3 primary count " + tag + " = " + SPEC_U3[tag] + ", saw " + (p3[tag] || 0));
ok(U3.filter(e => e.level === 1).length === 25 && U3.filter(e => e.level === 2).length === 34 && U3.filter(e => e.level === 3).length === 14, "U3 levels 25/34/14");
ok(U3.filter(e => CR[e.id]).length === 63 && U3.reduce((s, e) => s + (CR[e.id] || 0), 0) === 172, "U3 CR 63 entries, 172 marks");
const SPEC_U4 = { "SC7.10.1": 6, "SC7.10.2": 6, "SC7.10.3": 3, "SC7.10.4": 5, "SC7.10.5": 4, "SC7.10.6": 4, "SC7.10.7": 4, "SC7.10.8": 6, "SC7.10.9": 6, "SC7.11.1": 5, "SC7.11.2": 2, "SC7.11.3": 3, "SC7.11.4": 3, "SC7.11.5": 3, "SC7.11.6": 2, "SC7.11.7": 3, "SC7.12.1": 3, "SC7.12.2": 3, "SC7.12.3": 4, "SC7.12.4": 3, "SC7.12.5": 3, "SC7.12.6": 2, "SC7.12.7": 3, "SC7.12.8": 3, "SC7.12.9": 3 };
const p4 = {}; U4.forEach(e => { p4[e.indicators[0]] = (p4[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U4)) ok((p4[tag] || 0) === SPEC_U4[tag], "U4 primary count " + tag + " = " + SPEC_U4[tag] + ", saw " + (p4[tag] || 0));
ok(U4.filter(e => e.level === 1).length === 34 && U4.filter(e => e.level === 2).length === 41 && U4.filter(e => e.level === 3).length === 17, "U4 levels 34/41/17");
ok(U4.filter(e => CR[e.id]).length === 83 && U4.reduce((s, e) => s + (CR[e.id] || 0), 0) === 221, "U4 CR 83 entries, 221 marks");
ok(Object.keys(CR).length === 293 && Object.values(CR).reduce((a, b) => a + b, 0) === 794, "course CR manifest 293 entries, 794 marks");
ok((BANK.find(e => e.id === "s7f-u1-cr-design-experiment") || {}).noCompose === true, "design CR s7f-u1-cr-design-experiment carries noCompose");
ok((BANK.find(e => e.id === "s7f-u2-cr-design-test") || {}).noCompose === true, "design CR s7f-u2-cr-design-test carries noCompose");
ok((BANK.find(e => e.id === "s7f-u3-cr-design-solubility") || {}).noCompose === true, "design CR s7f-u3-cr-design-solubility carries noCompose");
ok((BANK.find(e => e.id === "s7f-u4-cr-design-investigation") || {}).noCompose === true, "design CR s7f-u4-cr-design-investigation carries noCompose");

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

console.log("GATE-LOAD-SCI-7-FR: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
