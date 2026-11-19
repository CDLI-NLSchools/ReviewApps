#!/usr/bin/env node
/* Gate (load + census + draw) for the French Science 9 build:
     node tests/gate-load-sci-9-fr.js
   Expectations are the French authoring spec (Nov 16, 2026):
   - courses.js registers sci-9-fr (Sciences, grade 9,
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
const C = window.COURSES["sci-9-fr"];
ok(!!C, "courses.js registers sci-9-fr");
ok(C.listed === true, "sci-9-fr is listed");
ok(C.curriculum === "NL" && C.subject === "Sciences" && C.grade === 9 && C.language === "fr", "curriculum NL, Sciences, grade 9, language fr");
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
eval(fs.readFileSync(ROOT + "/banks/sci-9-fr.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};

/* Pin update, November 19, 2026: two CR entries added to close the
   French test-blueprint CR denomination gaps (s9f-u3-cr-charge-explain,
   3 marks at SC9.7.1, and s9f-u4-cr-reproduction-maladie, 3 marks at
   SC9.10.5; see Spec-French-Test-Map-2026-11-19.md, Section 4). Census
   pins below are updated accordingly: bank 332, U3 106 entries and
   U4 66, CR manifest 61 entries and 191 marks, U3 CR 18 entries and
   56 marks, U4 CR 14 entries and 44 marks, U3 levels 42/43/21,
   U4 levels 26/27/13. */
ok(BANK.length === 332, "bank registers 332 entries, saw " + BANK.length);
const U1 = BANK.filter(e => e.unit === 1);
ok(U1.length === 75, "75 entries are Unit 1, saw " + U1.length);
const U2 = BANK.filter(e => e.unit === 2);
ok(U2.length === 85, "85 entries are Unit 2, saw " + U2.length);
const U3 = BANK.filter(e => e.unit === 3);
ok(U3.length === 106, "106 entries are Unit 3, saw " + U3.length);
const U4 = BANK.filter(e => e.unit === 4);
ok(U4.length === 66, "66 entries are Unit 4, saw " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 332, "all entry ids unique");
ok(BANK.every(e => e.hint1 && e.hint2), "every entry carries two hint stages");

const SPEC_U1 = { "SC9.1.1": 6, "SC9.1.2": 5, "SC9.1.3": 9, "SC9.1.4": 4, "SC9.1.5": 4, "SC9.1.6": 4, "SC9.1.7": 6, "SC9.2.1": 2, "SC9.2.2": 3, "SC9.2.3": 2, "SC9.2.4": 3, "SC9.2.5": 2, "SC9.2.6": 4, "SC9.2.7": 2, "SC9.2.8": 3, "SC9.3.1": 2, "SC9.3.2": 2, "SC9.3.3": 3, "SC9.3.4": 3, "SC9.3.5": 1, "SC9.3.7": 3, "SC9.3.8": 2 };
const p1 = {}; U1.forEach(e => { p1[e.indicators[0]] = (p1[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U1)) ok((p1[tag] || 0) === SPEC_U1[tag], "U1 primary count " + tag + " = " + SPEC_U1[tag] + ", saw " + (p1[tag] || 0));
ok(U1.filter(e => e.level === 1).length === 30 && U1.filter(e => e.level === 2).length === 30 && U1.filter(e => e.level === 3).length === 15, "U1 levels 30/30/15");
ok(U1.filter(e => CR[e.id]).length === 14 && U1.reduce((s, e) => s + (CR[e.id] || 0), 0) === 44, "U1 CR 14 entries, 44 marks");
const SPEC_U2 = { "SC9.4.1": 5, "SC9.4.2": 5, "SC9.4.3": 6, "SC9.4.4": 5, "SC9.4.5": 5, "SC9.4.6": 5, "SC9.4.7": 4, "SC9.5.1": 3, "SC9.5.2": 2, "SC9.5.3": 4, "SC9.5.4": 3, "SC9.5.5": 2, "SC9.5.6": 2, "SC9.5.7": 3, "SC9.5.8": 3, "SC9.5.9": 2, "SC9.5.10": 3, "SC9.5.11": 3, "SC9.6.1": 2, "SC9.6.2": 2, "SC9.6.3": 3, "SC9.6.4": 2, "SC9.6.5": 2, "SC9.6.6": 1, "SC9.6.7": 3, "SC9.6.8": 1, "SC9.6.9": 2, "SC9.6.10": 2 };
const p2 = {}; U2.forEach(e => { p2[e.indicators[0]] = (p2[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U2)) ok((p2[tag] || 0) === SPEC_U2[tag], "U2 primary count " + tag + " = " + SPEC_U2[tag] + ", saw " + (p2[tag] || 0));
ok(U2.filter(e => e.level === 1).length === 34 && U2.filter(e => e.level === 2).length === 34 && U2.filter(e => e.level === 3).length === 17, "U2 levels 34/34/17");
ok(U2.filter(e => CR[e.id]).length === 15 && U2.reduce((s, e) => s + (CR[e.id] || 0), 0) === 47, "U2 CR 15 entries, 47 marks");
const SPEC_U3 = { "SC9.7.1": 6, "SC9.7.2": 5, "SC9.7.3": 3, "SC9.7.4": 5, "SC9.7.5": 9, "SC9.7.6": 5, "SC9.7.7": 3, "SC9.7.8": 4, "SC9.7.9": 4, "SC9.8.1": 3, "SC9.8.2": 2, "SC9.8.3": 3, "SC9.8.4": 2, "SC9.8.5": 3, "SC9.8.6": 2, "SC9.8.7": 2, "SC9.8.8": 3, "SC9.8.9": 2, "SC9.8.10": 3, "SC9.8.11": 2, "SC9.8.12": 3, "SC9.8.13": 3, "SC9.8.14": 2, "SC9.8.15": 2, "SC9.9.1": 2, "SC9.9.2": 2, "SC9.9.3": 2, "SC9.9.4": 3, "SC9.9.5": 3, "SC9.9.6": 3, "SC9.9.7": 2, "SC9.9.8": 1, "SC9.9.9": 1, "SC9.9.11": 2, "SC9.9.12": 2, "SC9.9.13": 2 };
const p3 = {}; U3.forEach(e => { p3[e.indicators[0]] = (p3[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U3)) ok((p3[tag] || 0) === SPEC_U3[tag], "U3 primary count " + tag + " = " + SPEC_U3[tag] + ", saw " + (p3[tag] || 0));
ok(U3.filter(e => e.level === 1).length === 42 && U3.filter(e => e.level === 2).length === 43 && U3.filter(e => e.level === 3).length === 21, "U3 levels 42/43/21");
ok(U3.filter(e => CR[e.id]).length === 18 && U3.reduce((s, e) => s + (CR[e.id] || 0), 0) === 56, "U3 CR 18 entries, 56 marks");
const SPEC_U4 = { "SC9.10.1": 4, "SC9.10.2": 4, "SC9.10.3": 10, "SC9.10.4": 5, "SC9.10.5": 5, "SC9.11.1": 3, "SC9.11.2": 3, "SC9.11.3": 3, "SC9.11.4": 3, "SC9.11.5": 2, "SC9.11.6": 2, "SC9.12.1": 2, "SC9.12.2": 4, "SC9.12.3": 2, "SC9.12.4": 3, "SC9.12.5": 2, "SC9.12.6": 2, "SC9.12.7": 3, "SC9.12.8": 1, "SC9.12.10": 3 };
const p4 = {}; U4.forEach(e => { p4[e.indicators[0]] = (p4[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_U4)) ok((p4[tag] || 0) === SPEC_U4[tag], "U4 primary count " + tag + " = " + SPEC_U4[tag] + ", saw " + (p4[tag] || 0));
ok(U4.filter(e => e.level === 1).length === 26 && U4.filter(e => e.level === 2).length === 27 && U4.filter(e => e.level === 3).length === 13, "U4 levels 26/27/13");
ok(U4.filter(e => CR[e.id]).length === 14 && U4.reduce((s, e) => s + (CR[e.id] || 0), 0) === 44, "U4 CR 14 entries, 44 marks");
ok(Object.keys(CR).length === 61 && Object.values(CR).reduce((a, b) => a + b, 0) === 191, "course CR manifest 61 entries, 191 marks");
ok((BANK.find(e => e.id === "s9f-u1-cr-design-mission") || {}).noCompose === true, "design CR s9f-u1-cr-design-mission carries noCompose");
ok((BANK.find(e => e.id === "s9f-u2-cr-design-change") || {}).noCompose === true, "design CR s9f-u2-cr-design-change carries noCompose");
ok((BANK.find(e => e.id === "s9f-u3-cr-design-circuit") || {}).noCompose === true, "design CR s9f-u3-cr-design-circuit carries noCompose");
ok((BANK.find(e => e.id === "s9f-u4-cr-design-yeast") || {}).noCompose === true, "design CR s9f-u4-cr-design-yeast carries noCompose");

/* Draw checks: 25 draws per entry. */
const badDraws = [];
for (const e of BANK) {
  for (let i = 0; i < 25; i++) {
    let q;
    try { q = e.gen(); } catch (err) { badDraws.push(e.id + " threw: " + err.message); break; }
    if (!q) { badDraws.push(e.id + ' empty draw'); break; }
    if (CR[e.id] || q.type !== "mc") {
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

console.log("GATE-LOAD-SCI-9-FR: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
