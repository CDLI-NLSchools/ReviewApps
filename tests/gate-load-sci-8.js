#!/usr/bin/env node
/* Gate (load + census + draw) for the Science 8 build:
     node tests/gate-load-sci-8.js
   Expectations are the strand authoring specs (Nov 15, 2026):
   - courses.js registers sci-8 (Science, grade 8, listed:false,
     curriculum NL). The course stays unlisted: the junior high
     science English courses release together.
   - Unit 1 (Water Systems on Earth's Surface): exactly 80 entries,
     66 SR + 14 CR, levels 32/32/16, per-indicator counts equal to
     the Water Systems spec, CR marks sum 44, twelve entries at
     exactly 3 marks and two at 4 marks (the SC8.2.6 decision CR
     and the SC8.3.1 design CR, the latter carrying noCompose).
   - Unit 2 (Fluids): exactly 80 entries, 66 SR + 14 CR, levels
     32/32/16, per-indicator counts equal to the Fluids spec, CR
     marks sum 44 (twelve at 3, two at 4: the SC8.5.2 cleaning
     claim CR and the SC8.6.5 design CR, the latter noCompose).
   - Unit 3 (Optics): exactly 85 entries, 70 SR + 15 CR, levels
     34/34/17, per-indicator counts equal to the Optics spec, CR
     marks sum 47 (thirteen at 3, two at 4: the SC8.8.5 fibre
     optics CR and the SC8.9.11 design CR, the latter noCompose).
     SC8.9.12 is registered with zero entries (NONE, on the
     SC7.3.5 precedent). Course-wide after Unit 3: 245 entries,
     43 CR, 135 CR marks, exactly three noCompose design CRs.
   - Terminology sweeps (guide discipline): Unit 1, no
     student-facing text keys a numeric salinity or density value
     (the guide directs qualitative comparison), and no text
     carries the harvested satellite mechanism claim (infrared).
     Unit 2, the terms cohesion and adhesion are never keyed or
     used (guide: students are not responsible for them), and the
     harvested kilopascal defect value never appears.
   - Every entry draws clean questions; SR draws carry exactly 4
     options with exactly one correct; figure entries carry a
     figure on at least one draw. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["sci-8"];
ok(!!C, "courses.js registers sci-8");
ok(C.listed === false, "sci-8 is unlisted");
ok(C.curriculum === "NL" && C.subject === "Science" && C.grade === 8, "curriculum NL, Science, grade 8");
ok(C.units[1] === "Water Systems on Earth's Surface", "Unit 1 registered");
ok(C.units[2] === "Fluids", "Unit 2 registered");
ok(C.units[3] === "Optics", "Unit 3 registered");
ok(Object.keys(C.indicators).length === 78, "78 indicators registered so far, saw " + Object.keys(C.indicators).length);
ok(C.unitTest && C.unitTest.total === 26 && C.unitTest.sr === 20 && C.unitTest.cr === 6 && C.unitTest.indCap === 2 && JSON.stringify(C.unitTest.crPref) === "[3,3]", "unit test convention 20 SR + 2 CR at 3 = 26, indCap 2, crPref [3,3]");

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
eval(fs.readFileSync(ROOT + "/banks/sci-8.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};

const U1 = BANK.filter(e => e.unit === 1);
const U2 = BANK.filter(e => e.unit === 2);
const U3 = BANK.filter(e => e.unit === 3);
ok(BANK.length === 245, "bank registers 245 entries, saw " + BANK.length);
ok(U1.length === 80, "80 entries are Unit 1, saw " + U1.length);
ok(U2.length === 80, "80 entries are Unit 2, saw " + U2.length);
ok(U3.length === 85, "85 entries are Unit 3, saw " + U3.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 245, "all entry ids unique");

const SPEC_COUNT = {
  "SC8.1.1": 6, "SC8.1.2": 3, "SC8.1.3": 5, "SC8.1.4": 4, "SC8.1.5": 4, "SC8.1.6": 6, "SC8.1.7": 5,
  "SC8.1.8": 4, "SC8.1.9": 3, "SC8.2.1": 2, "SC8.2.2": 3, "SC8.2.3": 2, "SC8.2.4": 3, "SC8.2.5": 5,
  "SC8.2.6": 2, "SC8.3.1": 3, "SC8.3.2": 1, "SC8.3.3": 2, "SC8.3.4": 2, "SC8.3.5": 2, "SC8.3.6": 2,
  "SC8.3.7": 2, "SC8.3.8": 3, "SC8.3.9": 4, "SC8.3.10": 2
};
function primaryCounts(list) {
  const p = {};
  list.forEach(e => { p[e.indicators[0]] = (p[e.indicators[0]] || 0) + 1; });
  return p;
}
const p1 = primaryCounts(U1);
for (const tag of Object.keys(SPEC_COUNT)) {
  ok((p1[tag] || 0) === SPEC_COUNT[tag], "U1 primary count " + tag + " = " + SPEC_COUNT[tag] + ", saw " + (p1[tag] || 0));
}
const SPEC_COUNT_U2 = {
  "SC8.4.1": 5, "SC8.4.2": 4, "SC8.4.3": 4, "SC8.4.4": 6, "SC8.4.5": 4, "SC8.4.6": 3, "SC8.4.7": 3,
  "SC8.4.8": 3, "SC8.4.9": 4, "SC8.4.10": 5, "SC8.4.11": 3, "SC8.5.1": 2, "SC8.5.2": 3, "SC8.5.3": 2,
  "SC8.5.4": 2, "SC8.5.5": 1, "SC8.5.6": 3, "SC8.5.7": 3, "SC8.6.1": 2, "SC8.6.2": 2, "SC8.6.3": 1,
  "SC8.6.4": 2, "SC8.6.5": 2, "SC8.6.6": 2, "SC8.6.7": 1, "SC8.6.8": 3, "SC8.6.9": 1, "SC8.6.10": 4
};
const p2 = primaryCounts(U2);
for (const tag of Object.keys(SPEC_COUNT_U2)) {
  ok((p2[tag] || 0) === SPEC_COUNT_U2[tag], "U2 primary count " + tag + " = " + SPEC_COUNT_U2[tag] + ", saw " + (p2[tag] || 0));
}
const SPEC_COUNT_U3 = {
  "SC8.7.1": 8, "SC8.7.2": 7, "SC8.7.3": 8, "SC8.7.4": 7, "SC8.8.1": 3, "SC8.8.2": 2, "SC8.8.3": 3,
  "SC8.8.4": 3, "SC8.8.5": 3, "SC8.8.6": 3, "SC8.8.7": 3, "SC8.9.1": 2, "SC8.9.2": 3, "SC8.9.3": 6,
  "SC8.9.4": 2, "SC8.9.5": 2, "SC8.9.6": 1, "SC8.9.7": 3, "SC8.9.8": 2, "SC8.9.9": 3, "SC8.9.10": 2,
  "SC8.9.11": 2, "SC8.9.13": 4, "SC8.9.14": 3
};
const p3 = primaryCounts(U3);
for (const tag of Object.keys(SPEC_COUNT_U3)) {
  ok((p3[tag] || 0) === SPEC_COUNT_U3[tag], "U3 primary count " + tag + " = " + SPEC_COUNT_U3[tag] + ", saw " + (p3[tag] || 0));
}
ok(!BANK.some(e => e.indicators.includes("SC8.9.12")), "SC8.9.12 carries no entries (NONE, recorded)");
ok(BANK.every(e => e.indicators.every(t => Object.prototype.hasOwnProperty.call(C.indicators, t))), "no entry tags outside the registered indicators");

const crU1 = U1.filter(e => CR[e.id] !== undefined);
ok(crU1.length === 14, "14 CR entries in the marks manifest, saw " + crU1.length);
const markSum = list => list.reduce((a, e) => a + CR[e.id], 0);
ok(markSum(crU1) === 44, "U1 CR marks sum to 44, saw " + markSum(crU1));
ok(crU1.filter(e => CR[e.id] === 3).length === 12, "twelve U1 CR entries at exactly 3 marks, saw " + crU1.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u1-cr-decision"] === 4 && CR["s8-u1-cr-design-salinity"] === 4, "the decision CR and the design CR carry 4 marks");
ok(U1.filter(e => CR[e.id] === undefined).length === 66, "66 SR entries, saw " + U1.filter(e => CR[e.id] === undefined).length);
function levels(list) { const lv = [0, 0, 0]; list.forEach(e => { lv[e.level - 1]++; }); return JSON.stringify(lv); }
ok(levels(U1) === "[32,32,16]", "U1 levels 32/32/16, saw " + levels(U1));
ok(U1.filter(e => e.kind === "gen").length === 14, "14 U1 generator entries, saw " + U1.filter(e => e.kind === "gen").length);
const crU2 = U2.filter(e => CR[e.id] !== undefined);
ok(crU2.length === 14, "14 CR entries in Unit 2, saw " + crU2.length);
ok(markSum(crU2) === 44, "U2 CR marks sum to 44, saw " + markSum(crU2));
ok(crU2.filter(e => CR[e.id] === 3).length === 12, "twelve U2 CR entries at exactly 3 marks, saw " + crU2.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u2-cr-cleaning-claim"] === 4 && CR["s8-u2-cr-design-viscosity"] === 4, "the cleaning claim CR and the design CR carry 4 marks");
ok(U2.filter(e => CR[e.id] === undefined).length === 66, "66 SR entries in Unit 2, saw " + U2.filter(e => CR[e.id] === undefined).length);
ok(levels(U2) === "[32,32,16]", "U2 levels 32/32/16, saw " + levels(U2));
ok(U2.filter(e => e.kind === "gen").length === 24, "24 U2 generator entries, saw " + U2.filter(e => e.kind === "gen").length);
const crU3 = U3.filter(e => CR[e.id] !== undefined);
ok(crU3.length === 15, "15 CR entries in Unit 3, saw " + crU3.length);
ok(markSum(crU3) === 47, "U3 CR marks sum to 47, saw " + markSum(crU3));
ok(crU3.filter(e => CR[e.id] === 3).length === 13, "thirteen U3 CR entries at exactly 3 marks, saw " + crU3.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u3-cr-fibre"] === 4 && CR["s8-u3-cr-design-refraction"] === 4, "the fibre optics CR and the design CR carry 4 marks");
ok(U3.filter(e => CR[e.id] === undefined).length === 70, "70 SR entries in Unit 3, saw " + U3.filter(e => CR[e.id] === undefined).length);
ok(levels(U3) === "[34,34,17]", "U3 levels 34/34/17, saw " + levels(U3));
ok(U3.filter(e => e.kind === "gen").length === 16, "16 U3 generator entries, saw " + U3.filter(e => e.kind === "gen").length);
ok(crU1.length + crU2.length + crU3.length === 43 && markSum(crU1) + markSum(crU2) + markSum(crU3) === 135, "course-wide CR manifest is 43 entries and 135 marks");
const noComp = BANK.filter(e => e.noCompose === true).map(e => e.id).sort();
ok(JSON.stringify(noComp) === JSON.stringify(["s8-u1-cr-design-salinity", "s8-u2-cr-design-viscosity", "s8-u3-cr-design-refraction"]),
  "exactly the three design CRs carry noCompose, saw " + noComp.join(","));

const FIG_ENTRIES = ["s8-u1-profile-figure", "s8-u1-landform-figure", "s8-u1-wave-energy",
  "s8-u1-health-figure", "s8-u1-pop-interpolate", "s8-u1-pop-extrapolate", "s8-u1-cr-population",
  "s8-u2-flow-lab", "s8-u2-identify-substance", "s8-u2-force-figure", "s8-u2-bargraph", "s8-u2-pattern",
  "s8-u3-angle-calc", "s8-u3-plane-spot", "s8-u3-definitions-figure", "s8-u3-concave-spot",
  "s8-u3-convex-spot", "s8-u3-bend-figure", "s8-u3-bend-straight", "s8-u3-estimate-bend",
  "s8-u3-lenses", "s8-u3-lens-examples", "s8-u3-em-order", "s8-u3-em-compare"];

let badDraws = [];
BANK.forEach(e => {
  const draws = e.kind === "gen" ? 2000 : 300;
  let figSeen = 0;
  for (let i = 0; i < draws; i++) {
    let q;
    try { q = e.gen(); } catch (err) { badDraws.push(e.id + " threw: " + err.message); break; }
    if (!q || typeof q.prompt !== "string" || !q.prompt || /undefined|NaN/.test(q.prompt)) { badDraws.push(e.id + " bad prompt"); break; }
    if (CR[e.id] !== undefined) {
      if (!Array.isArray(q.answers) || !q.answers.length || typeof q.solution !== "string" || !q.solution) { badDraws.push(e.id + " CR shape"); break; }
    } else {
      if (q.type !== "mc" || !Array.isArray(q.options) || q.options.length !== 4) { badDraws.push(e.id + " option count " + (q.options || []).length); break; }
      if (typeof q.correct !== "number" || q.correct < 0 || q.correct > 3) { badDraws.push(e.id + " bad correct index " + q.correct); break; }
      if (new Set(q.options).size !== 4) { badDraws.push(e.id + " duplicate options"); break; }
      if (q.options.some(t => /undefined|NaN/.test(t))) { badDraws.push(e.id + " bad option text"); break; }
    }
    if (q.figure) figSeen++;
    if (i === draws - 1 && FIG_ENTRIES.includes(e.id) && figSeen === 0) badDraws.push(e.id + " never produced a figure");
  }
});
ok(badDraws.length === 0, "all entries draw clean (2000 draws per generator, 300 per varset): " + badDraws.slice(0, 5).join("; "));

/* Guide-discipline sweeps over Unit 1 student-facing text: no
   numeric salinity or density value may be presented as content to
   memorize (comparisons are qualitative), and the harvested
   satellite-by-infrared claim was not carried. Water health units
   (mg/L, micrograms per litre) are guide content and are not
   salinity or density values. */
let vHits = [];
U1.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (/1\.027|kg\/L|\d\s?g\/L|infrared/i.test(text)) { vHits.push(e.id); break; }
  }
});
ok(vHits.length === 0, "qualitative-comparison sweep clean, hits: " + vHits.join(","));

/* Unit 2 sweeps: cohesion and adhesion are never used (the guide
   excludes the terms from what students are responsible for), and
   the harvested pressure defect value never appears. */
let fHits = [];
U2.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (/cohesion|adhesion|1541/i.test(text)) { fHits.push(e.id); break; }
  }
});
ok(fHits.length === 0, "fluids terminology sweep clean, hits: " + fHits.join(","));

/* Unit 3 sweep: Snell's law is named in the guide as not
   expected; it never appears in student-facing text. */
let oHits = [];
U3.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (/Snell/i.test(text)) { oHits.push(e.id); break; }
  }
});
ok(oHits.length === 0, "optics terminology sweep clean, hits: " + oHits.join(","));

/* Negative stems, listed for judgement (spec audit). */
const NEG = [];
BANK.forEach(e => {
  for (let i = 0; i < 30; i++) {
    const q = e.gen();
    if (/\bNOT\b|\bEXCEPT\b/.test(q.prompt)) { NEG.push(e.id + ": " + q.prompt.slice(0, 60)); break; }
  }
});
console.log("Negative-stem draws (for the audit list): " + (NEG.length ? NEG.join(" | ") : "none"));

console.log("GATE-LOAD-SCI-8: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
