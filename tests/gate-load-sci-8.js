#!/usr/bin/env node
/* Gate (load + census + draw) for the Science 8 build:
     node tests/gate-load-sci-8.js
   Expectations are the strand authoring specs (Nov 15, 2026):
   - courses.js registers sci-8 (Science, grade 8, listed:true,
     curriculum NL). The junior high science English courses
     released together on Nov 15, 2026.
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
     SC7.3.5 precedent).
   - Unit 4 (Cells, Tissues, Organs and Systems): exactly 80
     entries, 66 SR + 14 CR, levels 32/32/16, per-indicator counts
     equal to the Cells spec, CR marks sum 44 (twelve at 3, two
     at 4: the SC8.11.4 artificial organs CR and the SC8.12.6
     design CR, the latter noCompose). Course-wide final: 325
     entries, 57 CR, 179 CR marks, 107 indicators registered,
     exactly four noCompose design CRs. Indicator coverage: 106
     of 107 carry entries (SC8.9.12 the single NONE).
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
/* Pin updated: sci-8 was listed on Nov 15, 2026 in the joint junior science listing, so this pin now expects listed: true. */
ok(C.listed === true, "sci-8 is listed");
ok(C.curriculum === "NL" && C.subject === "Science" && C.grade === 8, "curriculum NL, Science, grade 8");
ok(C.units[1] === "Water Systems on Earth's Surface", "Unit 1 registered");
ok(C.units[2] === "Fluids", "Unit 2 registered");
ok(C.units[3] === "Optics", "Unit 3 registered");
ok(C.units[4] === "Cells, Tissues, Organs and Systems", "Unit 4 registered");
ok(Object.keys(C.indicators).length === 107, "107 indicators registered, saw " + Object.keys(C.indicators).length);
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
const BIMODAL = window.__BANK_BIMODAL || {};

const U1 = BANK.filter(e => e.unit === 1);
const U2 = BANK.filter(e => e.unit === 2);
const U3 = BANK.filter(e => e.unit === 3);
const U4 = BANK.filter(e => e.unit === 4);
/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank (338 entries, CR manifest 61); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated to the bank after the 62-entry CR denomination tranche (Science 8: 348 entries, CR manifest 71 entries, 227 marks); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (bimodal registration): census pins updated to the bank after the bimodal registration of 214 strippable entries (67 class a, 147 class b, 560 marks, per Bimodal-Classification-SR-Pools-Science-2026-11-20.md, Section Science 8): CR manifest 285 entries, 787 marks (71 native constructed response entries plus the 214 bimodal registrations); per unit manifest counts 70 / 71 / 68 / 76, marks sums 192 / 198 / 190 / 207, entries at exactly 3 marks 32 / 36 / 32 / 35, entries outside the manifest 16 / 15 / 21 / 11; values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 21, 2026 (test plan build, Rulings 9, 10
   and 11): 17 entries added (Unit 1: one 2-mark CR on SC8.1.1;
   Unit 3: five plain SR and one 2-mark CR on SC8.7.3, five plain
   SR and CR entries of 3 and 2 marks on SC8.7.4; Unit 4: three
   plain SR, one on SC8.10.5 and two on SC8.10.6). Census pins
   updated accordingly: bank 365, units 87 / 86 / 102 / 90, CR
   manifest 289 entries and 796 marks, U1 CR 71 entries and 194
   marks, U3 CR 71 entries and 197 marks, U3 entries at exactly
   3 marks 33, SR-only entries 31 in Unit 3 and 14 in Unit 4,
   levels [33,36,18] / [32,37,17] / [36,45,21] / [34,37,19],
   Unit 3 generators 18. Values verified from the assembled
   bank the same day. No bank content was changed to fit this
   gate. */
ok(BANK.length === 365, "bank registers 365 entries, saw " + BANK.length);
ok(U1.length === 87, "87 entries are Unit 1, saw " + U1.length);
ok(U2.length === 86, "86 entries are Unit 2, saw " + U2.length);
ok(U3.length === 102, "102 entries are Unit 3, saw " + U3.length);
ok(U4.length === 90, "90 entries are Unit 4, saw " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 365, "all entry ids unique");

const SPEC_COUNT = {
  "SC8.1.1": 8, "SC8.1.2": 5, "SC8.1.3": 6, "SC8.1.4": 6, "SC8.1.5": 4, "SC8.1.6": 6, "SC8.1.7": 5,
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
  "SC8.4.1": 6, "SC8.4.2": 6, "SC8.4.3": 4, "SC8.4.4": 6, "SC8.4.5": 5, "SC8.4.6": 4, "SC8.4.7": 3,
  "SC8.4.8": 4, "SC8.4.9": 4, "SC8.4.10": 5, "SC8.4.11": 3, "SC8.5.1": 2, "SC8.5.2": 3, "SC8.5.3": 2,
  "SC8.5.4": 2, "SC8.5.5": 1, "SC8.5.6": 3, "SC8.5.7": 3, "SC8.6.1": 2, "SC8.6.2": 2, "SC8.6.3": 1,
  "SC8.6.4": 2, "SC8.6.5": 2, "SC8.6.6": 2, "SC8.6.7": 1, "SC8.6.8": 3, "SC8.6.9": 1, "SC8.6.10": 4
};
const p2 = primaryCounts(U2);
for (const tag of Object.keys(SPEC_COUNT_U2)) {
  ok((p2[tag] || 0) === SPEC_COUNT_U2[tag], "U2 primary count " + tag + " = " + SPEC_COUNT_U2[tag] + ", saw " + (p2[tag] || 0));
}
const SPEC_COUNT_U3 = {
  "SC8.7.1": 8, "SC8.7.2": 8, "SC8.7.3": 15, "SC8.7.4": 16, "SC8.8.1": 3, "SC8.8.2": 2, "SC8.8.3": 3,
  "SC8.8.4": 3, "SC8.8.5": 3, "SC8.8.6": 3, "SC8.8.7": 3, "SC8.9.1": 2, "SC8.9.2": 3, "SC8.9.3": 6,
  "SC8.9.4": 2, "SC8.9.5": 2, "SC8.9.6": 1, "SC8.9.7": 3, "SC8.9.8": 2, "SC8.9.9": 3, "SC8.9.10": 2,
  "SC8.9.11": 2, "SC8.9.13": 4, "SC8.9.14": 3
};
const p3 = primaryCounts(U3);
for (const tag of Object.keys(SPEC_COUNT_U3)) {
  ok((p3[tag] || 0) === SPEC_COUNT_U3[tag], "U3 primary count " + tag + " = " + SPEC_COUNT_U3[tag] + ", saw " + (p3[tag] || 0));
}
const SPEC_COUNT_U4 = {
  "SC8.10.1": 5, "SC8.10.2": 5, "SC8.10.3": 4, "SC8.10.4": 6, "SC8.10.5": 6, "SC8.10.6": 7,
  "SC8.10.7": 5, "SC8.11.1": 2, "SC8.11.2": 2, "SC8.11.3": 6, "SC8.11.4": 3, "SC8.11.5": 2,
  "SC8.11.6": 2, "SC8.11.7": 2, "SC8.11.8": 2, "SC8.11.9": 2, "SC8.11.10": 2, "SC8.12.1": 3,
  "SC8.12.2": 3, "SC8.12.3": 2, "SC8.12.4": 1, "SC8.12.5": 2, "SC8.12.6": 3, "SC8.12.7": 2,
  "SC8.12.8": 2, "SC8.12.9": 2, "SC8.12.10": 3, "SC8.12.11": 2, "SC8.12.12": 2
};
const p4 = primaryCounts(U4);
for (const tag of Object.keys(SPEC_COUNT_U4)) {
  ok((p4[tag] || 0) === SPEC_COUNT_U4[tag], "U4 primary count " + tag + " = " + SPEC_COUNT_U4[tag] + ", saw " + (p4[tag] || 0));
}
ok(!BANK.some(e => e.indicators.includes("SC8.9.12")), "SC8.9.12 carries no entries (NONE, recorded)");
ok(BANK.every(e => e.indicators.every(t => Object.prototype.hasOwnProperty.call(C.indicators, t))), "no entry tags outside the registered indicators");

const crU1 = U1.filter(e => CR[e.id] !== undefined);
ok(crU1.length === 71, "71 CR entries in the marks manifest, saw " + crU1.length);
const markSum = list => list.reduce((a, e) => a + CR[e.id], 0);
ok(markSum(crU1) === 194, "U1 CR marks sum to 194, saw " + markSum(crU1));
ok(crU1.filter(e => CR[e.id] === 3).length === 32, "thirty-two U1 CR entries at exactly 3 marks, saw " + crU1.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u1-cr-decision"] === 4 && CR["s8-u1-cr-design-salinity"] === 4, "the decision CR and the design CR carry 4 marks");
ok(U1.filter(e => CR[e.id] === undefined).length === 16, "16 SR entries, saw " + U1.filter(e => CR[e.id] === undefined).length);
function levels(list) { const lv = [0, 0, 0]; list.forEach(e => { lv[e.level - 1]++; }); return JSON.stringify(lv); }
ok(levels(U1) === "[33,36,18]", "U1 levels 33/36/18, saw " + levels(U1));
ok(U1.filter(e => e.kind === "gen").length === 14, "14 U1 generator entries, saw " + U1.filter(e => e.kind === "gen").length);
const crU2 = U2.filter(e => CR[e.id] !== undefined);
ok(crU2.length === 71, "71 CR entries in Unit 2, saw " + crU2.length);
ok(markSum(crU2) === 198, "U2 CR marks sum to 198, saw " + markSum(crU2));
ok(crU2.filter(e => CR[e.id] === 3).length === 36, "thirty-six U2 CR entries at exactly 3 marks, saw " + crU2.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u2-cr-cleaning-claim"] === 4 && CR["s8-u2-cr-design-viscosity"] === 4, "the cleaning claim CR and the design CR carry 4 marks");
ok(U2.filter(e => CR[e.id] === undefined).length === 15, "15 SR entries in Unit 2, saw " + U2.filter(e => CR[e.id] === undefined).length);
ok(levels(U2) === "[32,37,17]", "U2 levels 32/37/17, saw " + levels(U2));
ok(U2.filter(e => e.kind === "gen").length === 25, "25 U2 generator entries, saw " + U2.filter(e => e.kind === "gen").length);
const crU3 = U3.filter(e => CR[e.id] !== undefined);
ok(crU3.length === 71, "71 CR entries in Unit 3, saw " + crU3.length);
ok(markSum(crU3) === 197, "U3 CR marks sum to 197, saw " + markSum(crU3));
ok(crU3.filter(e => CR[e.id] === 3).length === 33, "thirty-three U3 CR entries at exactly 3 marks, saw " + crU3.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u3-cr-fibre"] === 4 && CR["s8-u3-cr-design-refraction"] === 4, "the fibre optics CR and the design CR carry 4 marks");
ok(U3.filter(e => CR[e.id] === undefined).length === 31, "31 SR entries in Unit 3, saw " + U3.filter(e => CR[e.id] === undefined).length);
ok(levels(U3) === "[36,45,21]", "U3 levels 36/45/21, saw " + levels(U3));
ok(U3.filter(e => e.kind === "gen").length === 18, "18 U3 generator entries, saw " + U3.filter(e => e.kind === "gen").length);
const crU4 = U4.filter(e => CR[e.id] !== undefined);
ok(crU4.length === 76, "76 CR entries in Unit 4, saw " + crU4.length);
ok(markSum(crU4) === 207, "U4 CR marks sum to 207, saw " + markSum(crU4));
ok(crU4.filter(e => CR[e.id] === 3).length === 35, "thirty-five U4 CR entries at exactly 3 marks, saw " + crU4.filter(e => CR[e.id] === 3).length);
ok(CR["s8-u4-cr-artificial"] === 4 && CR["s8-u4-cr-design-rates"] === 4, "the artificial organs CR and the design CR carry 4 marks");
ok(U4.filter(e => CR[e.id] === undefined).length === 14, "14 SR entries in Unit 4, saw " + U4.filter(e => CR[e.id] === undefined).length);
ok(levels(U4) === "[34,37,19]", "U4 levels 34/37/19, saw " + levels(U4));
ok(U4.filter(e => e.kind === "gen").length === 2, "2 U4 generator entries, saw " + U4.filter(e => e.kind === "gen").length);
ok(crU1.length + crU2.length + crU3.length + crU4.length === 289 && markSum(crU1) + markSum(crU2) + markSum(crU3) + markSum(crU4) === 796, "course-wide CR manifest is 289 entries and 796 marks");
const noComp = BANK.filter(e => e.noCompose === true).map(e => e.id).sort();
ok(JSON.stringify(noComp) === JSON.stringify(["s8-u1-cr-design-salinity", "s8-u2-cr-design-viscosity", "s8-u3-cr-design-refraction", "s8-u4-cr-design-rates"]),
  "exactly the four design CRs carry noCompose, saw " + noComp.join(","));

const FIG_ENTRIES = ["s8-u1-profile-figure", "s8-u1-landform-figure", "s8-u1-wave-energy",
  "s8-u1-health-figure", "s8-u1-pop-interpolate", "s8-u1-pop-extrapolate", "s8-u1-cr-population",
  "s8-u2-flow-lab", "s8-u2-identify-substance", "s8-u2-force-figure", "s8-u2-bargraph", "s8-u2-pattern",
  "s8-u3-angle-calc", "s8-u3-plane-spot", "s8-u3-definitions-figure", "s8-u3-concave-spot",
  "s8-u3-convex-spot", "s8-u3-bend-figure", "s8-u3-bend-straight", "s8-u3-estimate-bend",
  "s8-u3-lenses", "s8-u3-lens-examples", "s8-u3-em-order", "s8-u3-em-compare",
  "s8-u4-cell-figure", "s8-u4-organelle-figure", "s8-u4-micro-parts",
  "s8-u4-rates-figure", "s8-u4-recovery-figure", "s8-u4-animal-pattern"];

let badDraws = [];
BANK.forEach(e => {
  const draws = e.kind === "gen" ? 2000 : 300;
  let figSeen = 0;
  for (let i = 0; i < draws; i++) {
    let q;
    try { q = e.gen(); } catch (err) { badDraws.push(e.id + " threw: " + err.message); break; }
    if (!q || typeof q.prompt !== "string" || !q.prompt || /undefined|NaN/.test(q.prompt)) { badDraws.push(e.id + " bad prompt"); break; }
    /* Amendment, November 20, 2026 (reverse bimodal registration): the draw
       check branches on the BIMODAL manifest as well as the CR marks
       manifest. An entry registered bimodal draws multiple choice
       natively; its constructed response form is produced by stripping
       at composition time and is proven by gate-bimodal, so its draws
       take the multiple choice shape checks. Entries in the CR marks
       manifest only keep the constructed response shape checks. No
       check was removed or weakened. */
    if (CR[e.id] !== undefined && BIMODAL[e.id] === undefined) {
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

/* Unit 4 sweep: the guide defers abiogenesis and biogenesis to
   Biology 2201; neither term appears in student-facing text. */
let cHits = [];
U4.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (/abiogenesis|biogenesis/i.test(text)) { cHits.push(e.id); break; }
  }
});
ok(cHits.length === 0, "cells terminology sweep clean, hits: " + cHits.join(","));

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
