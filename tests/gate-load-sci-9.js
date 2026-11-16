#!/usr/bin/env node
/* Gate (load + census + draw) for the Science 9 build:
     node tests/gate-load-sci-9.js
   Expectations are the strand authoring specs (Nov 15, 2026):
   - courses.js registers sci-9 (Science, grade 9, listed:false,
     curriculum NL). The course stays unlisted: the junior high
     science English courses release together.
   - Unit 1 (Space): exactly 75 entries, 61 SR + 14 CR, levels
     30/30/15, per-indicator counts equal to the Space spec, CR
     marks sum 44, twelve entries at exactly 3 marks and two at
     4 marks (the SC9.2.8 space decision CR and the SC9.3.7 design
     CR, the latter carrying noCompose). SC9.3.6 is registered
     with zero entries (NONE, on the SC7.3.5 precedent).
   - Unit 2 (Atoms, Elements, and Compounds): exactly 85 entries,
     70 SR + 15 CR, levels 34/34/17, per-indicator counts equal
     to the Atoms spec, CR marks sum 47 (thirteen at 3, two at 4:
     the SC9.5.11 materials decision CR and the SC9.6.2 design
     CR, the latter noCompose).
   - Unit 3 (Electricity): exactly 105 entries, 88 SR + 17 CR,
     levels 42/42/21, per-indicator counts equal to the
     Electricity spec, CR marks sum 53 (fifteen at 3, two at 4:
     the SC9.8.12 energy decision CR and the SC9.9.8 design CR,
     the latter noCompose). SC9.9.11 is registered with zero
     entries (NONE).
   - Unit 4 (Reproduction): exactly 65 entries, 52 SR + 13 CR,
     levels 26/26/13, per-indicator counts equal to the
     Reproduction spec, CR marks sum 41 (eleven at 3, two at 4:
     the SC9.10.6 reproduction choice CR and the SC9.12.3 design
     CR, the latter noCompose). SC9.12.9 is registered with zero
     entries (NONE). Course-wide final: 330 entries, 59 CR,
     185 CR marks, 109 indicators registered, exactly four
     noCompose design CRs. Indicator coverage: 106 of 109 carry
     entries (SC9.3.6, SC9.9.11 and SC9.12.9 the three NONE).
   - Terminology sweeps (guide discipline): Unit 1, Kepler's
     laws are never named (the guide excludes them). Unit 2, the
     terms isotope and octet never appear (both expressly not
     taught). Unit 4, mutation type names, nucleotide, and the
     centriole, centromere and spindle terms never appear (all
     expressly out of the course).
   - Every entry draws clean questions; SR draws carry exactly 4
     options with exactly one correct; figure entries carry a
     figure on at least one draw; every entry carries exactly
     two hint stages. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["sci-9"];
ok(!!C, "courses.js registers sci-9");
ok(C.listed === false, "sci-9 is unlisted");
ok(C.curriculum === "NL" && C.subject === "Science" && C.grade === 9, "curriculum NL, Science, grade 9");
ok(C.units[1] === "Space", "Unit 1 registered");
ok(C.units[2] === "Atoms, Elements, and Compounds", "Unit 2 registered");
ok(C.units[3] === "Electricity", "Unit 3 registered");
ok(C.units[4] === "Reproduction", "Unit 4 registered");
ok(Object.keys(C.indicators).length === 109, "109 indicators registered, saw " + Object.keys(C.indicators).length);
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
eval(fs.readFileSync(ROOT + "/banks/sci-9.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};

const U1 = BANK.filter(e => e.unit === 1);
const U2 = BANK.filter(e => e.unit === 2);
const U3 = BANK.filter(e => e.unit === 3);
const U4 = BANK.filter(e => e.unit === 4);
ok(BANK.length === 330, "bank registers 330 entries, saw " + BANK.length);
ok(U1.length === 75, "75 entries are Unit 1, saw " + U1.length);
ok(U2.length === 85, "85 entries are Unit 2, saw " + U2.length);
ok(U3.length === 105, "105 entries are Unit 3, saw " + U3.length);
ok(U4.length === 65, "65 entries are Unit 4, saw " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 330, "all entry ids unique");
ok(BANK.every(e => e.hint1 && e.hint2), "every entry carries two hint stages");

function primaryCounts(list) {
  const p = {};
  list.forEach(e => { p[e.indicators[0]] = (p[e.indicators[0]] || 0) + 1; });
  return p;
}
const SPEC_COUNT = {
  "SC9.1.1": 6, "SC9.1.2": 5, "SC9.1.3": 9, "SC9.1.4": 4, "SC9.1.5": 4, "SC9.1.6": 4, "SC9.1.7": 6,
  "SC9.2.1": 2, "SC9.2.2": 3, "SC9.2.3": 2, "SC9.2.4": 3, "SC9.2.5": 2, "SC9.2.6": 4, "SC9.2.7": 2,
  "SC9.2.8": 3, "SC9.3.1": 2, "SC9.3.2": 2, "SC9.3.3": 3, "SC9.3.4": 3, "SC9.3.5": 1,
  "SC9.3.7": 3, "SC9.3.8": 2
};
const p1 = primaryCounts(U1);
for (const tag of Object.keys(SPEC_COUNT)) {
  ok((p1[tag] || 0) === SPEC_COUNT[tag], "U1 primary count " + tag + " = " + SPEC_COUNT[tag] + ", saw " + (p1[tag] || 0));
}
const SPEC_COUNT_U2 = {
  "SC9.4.1": 5, "SC9.4.2": 5, "SC9.4.3": 6, "SC9.4.4": 5, "SC9.4.5": 5, "SC9.4.6": 5, "SC9.4.7": 4,
  "SC9.5.1": 3, "SC9.5.2": 2, "SC9.5.3": 4, "SC9.5.4": 3, "SC9.5.5": 2, "SC9.5.6": 2, "SC9.5.7": 3,
  "SC9.5.8": 3, "SC9.5.9": 2, "SC9.5.10": 3, "SC9.5.11": 3, "SC9.6.1": 2, "SC9.6.2": 2,
  "SC9.6.3": 3, "SC9.6.4": 2, "SC9.6.5": 2, "SC9.6.6": 1, "SC9.6.7": 3, "SC9.6.8": 1,
  "SC9.6.9": 2, "SC9.6.10": 2
};
const p2 = primaryCounts(U2);
for (const tag of Object.keys(SPEC_COUNT_U2)) {
  ok((p2[tag] || 0) === SPEC_COUNT_U2[tag], "U2 primary count " + tag + " = " + SPEC_COUNT_U2[tag] + ", saw " + (p2[tag] || 0));
}
const SPEC_COUNT_U3 = {
  "SC9.7.1": 5, "SC9.7.2": 5, "SC9.7.3": 3, "SC9.7.4": 5, "SC9.7.5": 9, "SC9.7.6": 5, "SC9.7.7": 3,
  "SC9.7.8": 4, "SC9.7.9": 4, "SC9.8.1": 3, "SC9.8.2": 2, "SC9.8.3": 3, "SC9.8.4": 2, "SC9.8.5": 3,
  "SC9.8.6": 2, "SC9.8.7": 3, "SC9.8.8": 2, "SC9.8.9": 3, "SC9.8.10": 2, "SC9.8.11": 3,
  "SC9.8.12": 3, "SC9.8.13": 2, "SC9.8.14": 3, "SC9.9.1": 2, "SC9.9.2": 2, "SC9.9.3": 2,
  "SC9.9.4": 3, "SC9.9.5": 2, "SC9.9.6": 2, "SC9.9.7": 3, "SC9.9.8": 2, "SC9.9.9": 1,
  "SC9.9.10": 1, "SC9.9.12": 2, "SC9.9.13": 2, "SC9.9.14": 2
};
const p3 = primaryCounts(U3);
for (const tag of Object.keys(SPEC_COUNT_U3)) {
  ok((p3[tag] || 0) === SPEC_COUNT_U3[tag], "U3 primary count " + tag + " = " + SPEC_COUNT_U3[tag] + ", saw " + (p3[tag] || 0));
}
const SPEC_COUNT_U4 = {
  "SC9.10.1": 4, "SC9.10.2": 4, "SC9.10.3": 6, "SC9.10.4": 5, "SC9.10.5": 6, "SC9.10.6": 4,
  "SC9.11.1": 3, "SC9.11.2": 3, "SC9.11.3": 3, "SC9.11.4": 3, "SC9.11.5": 2, "SC9.12.1": 2,
  "SC9.12.2": 4, "SC9.12.3": 2, "SC9.12.4": 3, "SC9.12.5": 2, "SC9.12.6": 2, "SC9.12.7": 3,
  "SC9.12.8": 1, "SC9.12.10": 3
};
const p4 = primaryCounts(U4);
for (const tag of Object.keys(SPEC_COUNT_U4)) {
  ok((p4[tag] || 0) === SPEC_COUNT_U4[tag], "U4 primary count " + tag + " = " + SPEC_COUNT_U4[tag] + ", saw " + (p4[tag] || 0));
}
for (const noneTag of ["SC9.3.6", "SC9.9.11", "SC9.12.9"]) {
  ok(!BANK.some(e => e.indicators.includes(noneTag)), noneTag + " carries no entries (NONE, recorded)");
  ok(Object.prototype.hasOwnProperty.call(C.indicators, noneTag), noneTag + " is registered");
}
ok(BANK.every(e => e.indicators.every(t => Object.prototype.hasOwnProperty.call(C.indicators, t))), "no entry tags outside the registered indicators");

const markSum = list => list.reduce((a, e) => a + CR[e.id], 0);
function levels(list) { const lv = [0, 0, 0]; list.forEach(e => { lv[e.level - 1]++; }); return JSON.stringify(lv); }

const crU1 = U1.filter(e => CR[e.id] !== undefined);
ok(crU1.length === 14, "14 CR entries in Unit 1, saw " + crU1.length);
ok(markSum(crU1) === 44, "U1 CR marks sum to 44, saw " + markSum(crU1));
ok(crU1.filter(e => CR[e.id] === 3).length === 12, "twelve U1 CR entries at exactly 3 marks, saw " + crU1.filter(e => CR[e.id] === 3).length);
ok(CR["s9-u1-cr-space-decision"] === 4 && CR["s9-u1-cr-design-mission"] === 4, "the space decision CR and the design CR carry 4 marks");
ok(U1.filter(e => CR[e.id] === undefined).length === 61, "61 SR entries in Unit 1, saw " + U1.filter(e => CR[e.id] === undefined).length);
ok(levels(U1) === "[30,30,15]", "U1 levels 30/30/15, saw " + levels(U1));
ok(U1.filter(e => e.kind === "gen").length === 10, "10 U1 generator entries, saw " + U1.filter(e => e.kind === "gen").length);

const crU2 = U2.filter(e => CR[e.id] !== undefined);
ok(crU2.length === 15, "15 CR entries in Unit 2, saw " + crU2.length);
ok(markSum(crU2) === 47, "U2 CR marks sum to 47, saw " + markSum(crU2));
ok(crU2.filter(e => CR[e.id] === 3).length === 13, "thirteen U2 CR entries at exactly 3 marks, saw " + crU2.filter(e => CR[e.id] === 3).length);
ok(CR["s9-u2-cr-materials-decision"] === 4 && CR["s9-u2-cr-design-change"] === 4, "the materials decision CR and the design CR carry 4 marks");
ok(U2.filter(e => CR[e.id] === undefined).length === 70, "70 SR entries in Unit 2, saw " + U2.filter(e => CR[e.id] === undefined).length);
ok(levels(U2) === "[34,34,17]", "U2 levels 34/34/17, saw " + levels(U2));
ok(U2.filter(e => e.kind === "gen").length === 10, "10 U2 generator entries, saw " + U2.filter(e => e.kind === "gen").length);

const crU3 = U3.filter(e => CR[e.id] !== undefined);
ok(crU3.length === 17, "17 CR entries in Unit 3, saw " + crU3.length);
ok(markSum(crU3) === 53, "U3 CR marks sum to 53, saw " + markSum(crU3));
ok(crU3.filter(e => CR[e.id] === 3).length === 15, "fifteen U3 CR entries at exactly 3 marks, saw " + crU3.filter(e => CR[e.id] === 3).length);
ok(CR["s9-u3-cr-energy-decision"] === 4 && CR["s9-u3-cr-design-circuit"] === 4, "the energy decision CR and the design CR carry 4 marks");
ok(U3.filter(e => CR[e.id] === undefined).length === 88, "88 SR entries in Unit 3, saw " + U3.filter(e => CR[e.id] === undefined).length);
ok(levels(U3) === "[42,42,21]", "U3 levels 42/42/21, saw " + levels(U3));
ok(U3.filter(e => e.kind === "gen").length === 15, "15 U3 generator entries, saw " + U3.filter(e => e.kind === "gen").length);

const crU4 = U4.filter(e => CR[e.id] !== undefined);
ok(crU4.length === 13, "13 CR entries in Unit 4, saw " + crU4.length);
ok(markSum(crU4) === 41, "U4 CR marks sum to 41, saw " + markSum(crU4));
ok(crU4.filter(e => CR[e.id] === 3).length === 11, "eleven U4 CR entries at exactly 3 marks, saw " + crU4.filter(e => CR[e.id] === 3).length);
ok(CR["s9-u4-cr-reproduction-choice"] === 4 && CR["s9-u4-cr-design-yeast"] === 4, "the reproduction choice CR and the design CR carry 4 marks");
ok(U4.filter(e => CR[e.id] === undefined).length === 52, "52 SR entries in Unit 4, saw " + U4.filter(e => CR[e.id] === undefined).length);
ok(levels(U4) === "[26,26,13]", "U4 levels 26/26/13, saw " + levels(U4));
ok(U4.filter(e => e.kind === "gen").length === 6, "6 U4 generator entries, saw " + U4.filter(e => e.kind === "gen").length);

ok(crU1.length + crU2.length + crU3.length + crU4.length === 59 && markSum(crU1) + markSum(crU2) + markSum(crU3) + markSum(crU4) === 185, "course-wide CR manifest is 59 entries and 185 marks");
ok(levels(BANK) === "[132,132,66]", "course levels 132/132/66, saw " + levels(BANK));
const noComp = BANK.filter(e => e.noCompose === true).map(e => e.id).sort();
ok(JSON.stringify(noComp) === JSON.stringify(["s9-u1-cr-design-mission", "s9-u2-cr-design-change", "s9-u3-cr-design-circuit", "s9-u4-cr-design-yeast"]),
  "exactly the four design CRs carry noCompose, saw " + noComp.join(","));

const FIG_ENTRIES = ["s9-u1-constellation-figure", "s9-u1-orbit-meaning", "s9-u1-planet-table-figure",
  "s9-u1-distance-chart-figure", "s9-u1-quasar",
  "s9-u2-glove-choice", "s9-u2-atom-figure", "s9-u2-period-family", "s9-u2-particle-view",
  "s9-u2-data-table-fig", "s9-u2-trend-graph", "s9-u2-flame-table",
  "s9-u3-electroscope-detect", "s9-u3-series-identify", "s9-u3-parallel-identify", "s9-u3-energuide",
  "s9-u3-transmission", "s9-u3-cells-tradeoff", "s9-u3-meter-placement", "s9-u3-gen-graph-resistance",
  "s9-u3-best-fit", "s9-u3-instrument-use",
  "s9-u4-metaphase", "s9-u4-vegetative", "s9-u4-gene-chromosome", "s9-u4-gen-population-graph",
  "s9-u4-gen-yeast-graph", "s9-u4-gen-conditions-chart"];

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

/* Guide-discipline sweeps over student-facing text. Unit 1: the
   guide excludes Kepler's laws; Kepler is credited only with
   elliptical paths. Unit 2: isotopes and the octet rule are
   expressly not taught. Unit 4: mutation type names, nucleotide
   detail, and centriole, centromere and spindle terms are all
   expressly out of the course. */
function sweep(list, re, name) {
  const hits = [];
  list.forEach(e => {
    for (let i = 0; i < 40; i++) {
      const q = e.gen();
      const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
      if (re.test(text)) { hits.push(e.id); break; }
    }
  });
  ok(hits.length === 0, name + " clean, hits: " + hits.join(","));
}
sweep(U1, /kepler[^.]{0,30}law/i, "space sweep (no Kepler's laws)");
sweep(U2, /isotope|octet/i, "atoms sweep (no isotopes, no octet rule)");
sweep(U4, /nucleotide|centriole|centromere|spindle|deletion|substitution/i, "reproduction sweep (no out-of-course terms)");

/* Negative stems, listed for judgement (spec audit). */
const NEG = [];
BANK.forEach(e => {
  for (let i = 0; i < 30; i++) {
    const q = e.gen();
    if (/\bNOT\b|\bEXCEPT\b/.test(q.prompt)) { NEG.push(e.id + ": " + q.prompt.slice(0, 60)); break; }
  }
});
console.log("Negative-stem draws (for the audit list): " + (NEG.length ? NEG.join(" | ") : "none"));

console.log("GATE-LOAD-SCI-9: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
