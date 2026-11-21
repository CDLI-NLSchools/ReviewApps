#!/usr/bin/env node
/* Gate (load + census + draw) for the Science 7 build, all four units:
     node tests/gate-load-sci-7.js
   Expectations are the four authoring specs (Nov 15, 2026):
   - courses.js registers sci-7 (Science, grade 7, listed:true,
     curriculum NL), Units 1 to 4, 99 indicators.
   - Unit 1 (Ecosystems): exactly 80 entries, 65 SR + 15 CR, levels
     32/32/16, per-indicator counts equal to the Ecosystems spec
     Section 3, SC7.3.5 at zero (recorded NONE), CR marks sum 41,
     nine entries at exactly 3 marks.
   - Unit 2 (Heat): exactly 75 entries, 61 SR + 14 CR, levels
     30/30/15, per-indicator counts equal to the Heat spec Section 3,
     CR marks sum 39, nine entries at exactly 3 marks.
   - Unit 4 (Earth's Crust): exactly 85 entries, 68 SR + 17 CR,
     levels 34/34/17, per-indicator counts equal to the Earth's
     Crust spec Section 3, CR marks sum 46, ten entries at exactly
     3 marks.
   - Both design CRs carry 4 marks and the noCompose flag (exactly
     two noCompose entries in the course).
   - Symbiosis sweep (Unit 1, Jason's ruling): no student-facing
     text names mutualism, commensalism or parasitism.
   - Terminology sweep (Unit 4): no student-facing text names the
     Richter scale; the guide's term is the moment magnitude scale.
   - Every entry draws clean questions; SR draws carry exactly 4
     options with exactly one correct; figure entries carry a
     figure on at least one draw. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["sci-7"];
ok(!!C, "courses.js registers sci-7");
/* Pin updated: sci-7 was listed on Nov 15, 2026 in the joint junior science listing, so this pin now expects listed: true. */
ok(C.listed === true, "sci-7 is listed");
ok(C.curriculum === "NL" && C.subject === "Science" && C.grade === 7, "curriculum NL, Science, grade 7");
ok(C.units[1] === "Interactions Within Ecosystems" && C.units[2] === "Heat" && C.units[3] === "Mixtures and Solutions" && C.units[4] === "Earth's Crust" && Object.keys(C.units).length === 4, "all four units registered");
ok(Object.keys(C.indicators).length === 99, "99 indicators registered, saw " + Object.keys(C.indicators).length);
ok(C.unitTest && C.unitTest.total === 26 && C.unitTest.sr === 20 && C.unitTest.cr === 6, "unit test convention 20 SR + 2 CR at 3 = 26");

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
eval(fs.readFileSync(ROOT + "/banks/sci-7.js", "utf8"));
const CR = window.__BANK_CRMARKS || {};
const BIMODAL = window.__BANK_BIMODAL || {};

/* Pin update, November 19, 2026: two CR entries added to close the
   test-blueprint CR denomination gaps (s7-u1-cr-niche-roles, 2 marks
   at SC7.1.3, and s7-u2-cr-instrument-jobs, 3 marks at SC7.4.1; see
   Junior-Science-Blueprint-Depth-Queue-2026-11-19.md). Census pins
   below are updated accordingly: bank 302, U1 81 entries and U2 76,
   CR manifest 60 entries, U1 marks 43, U2 marks 42, U2 entries at
   exactly 3 marks now ten, U1 levels 32/33/16, U2 levels 30/31/15.
   SR count is unchanged at 242. */
const U1 = BANK.filter(e => e.unit === 1);
const U2 = BANK.filter(e => e.unit === 2);
const U3 = BANK.filter(e => e.unit === 3);
const U4 = BANK.filter(e => e.unit === 4);
/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank (325 entries, CR manifest 65); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated to the bank after the 62-entry CR denomination tranche (Science 7: 334 entries, CR manifest 74); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (reverse bimodal registration): the
   course's 201 strippable selected response entries were registered
   bimodal (55 class a, 146 class b; see the Science volume of the
   bimodal classification, Bimodal-Classification-SR-Pools-Science-
   2026-11-20.md), so they now also appear in the CR marks manifest,
   carrying 525 proposed marks. Census pins below are updated
   accordingly: CR manifest 275 entries, split 68 / 69 / 62 / 76,
   marks sums 181 / 183 / 167 / 198, entries at exactly 3 marks
   33 / 33 / 29 / 38, and 59 entries outside the manifest. Values
   verified from the assembled bank the same day. No bank content
   was changed to fit this gate. */
/* Pin update, November 21, 2026 (test plan build, Rulings 9, 10
   and 11): 14 entries added (Unit 1: five plain SR and one 3-mark
   CR on SC7.1.8; Unit 2: five plain SR and CR entries of 3 and 2
   marks on SC7.4.1; Unit 3: one plain SR on SC7.7.5). Census pins
   updated accordingly: bank 348, split 94 / 91 / 72 / 91, CR
   manifest 278, split 69 / 71 / 62 / 76, marks sums 184 / 188 /
   167 / 198, entries at exactly 3 marks 34 / 34 / 29 / 38, 70
   entries outside the manifest, levels [33,42,19] / [32,41,18] /
   [25,33,14] / [34,40,17], Unit 2 generators 13. Values verified
   from the assembled bank the same day. No bank content was
   changed to fit this gate. */
ok(BANK.length === 348, "bank registers 348 entries, saw " + BANK.length);
ok(U1.length === 94 && U2.length === 91 && U3.length === 72 && U4.length === 91, "unit split 94 / 91 / 72 / 91, saw " + U1.length + " / " + U2.length + " / " + U3.length + " / " + U4.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 348, "all entry ids unique");
ok(BANK.every(e => e.unit === 1 || e.unit === 2 || e.unit === 3 || e.unit === 4), "every entry is Unit 1, 2, 3 or 4");

const SPEC_COUNT = {
  "SC7.1.1": 6, "SC7.1.2": 6, "SC7.1.3": 4, "SC7.1.4": 3, "SC7.1.5": 4, "SC7.1.6": 4, "SC7.1.7": 4, "SC7.1.8": 12,
  "SC7.2.1": 2, "SC7.2.2": 4, "SC7.2.3": 3, "SC7.2.4": 3, "SC7.2.5": 3, "SC7.2.6": 2, "SC7.2.7": 3, "SC7.2.8": 2,
  "SC7.3.1": 3, "SC7.3.2": 2, "SC7.3.3": 3, "SC7.3.4": 2, "SC7.3.5": 0, "SC7.3.6": 2, "SC7.3.7": 3, "SC7.3.8": 4,
  "SC7.3.9": 4, "SC7.3.10": 2, "SC7.3.11": 4
};
const SPEC_COUNT_U4 = {
  "SC7.10.1": 6, "SC7.10.2": 6, "SC7.10.3": 3, "SC7.10.4": 4, "SC7.10.5": 4, "SC7.10.6": 4, "SC7.10.7": 4,
  "SC7.10.8": 6, "SC7.10.9": 6, "SC7.11.1": 5, "SC7.11.2": 2, "SC7.11.3": 3, "SC7.11.4": 3, "SC7.11.5": 3,
  "SC7.11.6": 2, "SC7.11.7": 3, "SC7.12.1": 3, "SC7.12.2": 3, "SC7.12.3": 4, "SC7.12.4": 3, "SC7.12.5": 3,
  "SC7.12.6": 2, "SC7.12.7": 3, "SC7.12.8": 3, "SC7.12.9": 3
};
function primaryCounts(list) {
  const p = {};
  list.forEach(e => { p[e.indicators[0]] = (p[e.indicators[0]] || 0) + 1; });
  return p;
}
const SPEC_COUNT_U2 = {
  "SC7.4.1": 14, "SC7.4.2": 5, "SC7.4.3": 5, "SC7.4.4": 4, "SC7.4.5": 5, "SC7.4.6": 5, "SC7.4.7": 4,
  "SC7.5.1": 2, "SC7.5.2": 3, "SC7.5.3": 2, "SC7.5.4": 2, "SC7.5.5": 3, "SC7.5.6": 2, "SC7.5.7": 3,
  "SC7.5.8": 3, "SC7.5.9": 2, "SC7.5.10": 2, "SC7.6.1": 3, "SC7.6.2": 2, "SC7.6.3": 4, "SC7.6.4": 2,
  "SC7.6.5": 3, "SC7.6.6": 3, "SC7.6.7": 3, "SC7.6.8": 2, "SC7.6.9": 3
};
const SPEC_COUNT_U3 = {
  "SC7.7.1": 6, "SC7.7.2": 6, "SC7.7.3": 5, "SC7.7.4": 4, "SC7.7.5": 5, "SC7.7.6": 6, "SC7.7.7": 5,
  "SC7.8.1": 3, "SC7.8.2": 2, "SC7.8.3": 2, "SC7.8.4": 3, "SC7.8.5": 3, "SC7.8.6": 2, "SC7.9.1": 3,
  "SC7.9.2": 2, "SC7.9.3": 4, "SC7.9.4": 2, "SC7.9.5": 3, "SC7.9.6": 2, "SC7.9.7": 2, "SC7.9.8": 2
};
const p1 = primaryCounts(U1), p2 = primaryCounts(U2), p3 = primaryCounts(U3), p4 = primaryCounts(U4);
for (const tag of Object.keys(SPEC_COUNT)) {
  ok((p1[tag] || 0) === SPEC_COUNT[tag], "U1 primary count " + tag + " = " + SPEC_COUNT[tag] + ", saw " + (p1[tag] || 0));
}
for (const tag of Object.keys(SPEC_COUNT_U2)) {
  ok((p2[tag] || 0) === SPEC_COUNT_U2[tag], "U2 primary count " + tag + " = " + SPEC_COUNT_U2[tag] + ", saw " + (p2[tag] || 0));
}
for (const tag of Object.keys(SPEC_COUNT_U3)) {
  ok((p3[tag] || 0) === SPEC_COUNT_U3[tag], "U3 primary count " + tag + " = " + SPEC_COUNT_U3[tag] + ", saw " + (p3[tag] || 0));
}
for (const tag of Object.keys(SPEC_COUNT_U4)) {
  ok((p4[tag] || 0) === SPEC_COUNT_U4[tag], "U4 primary count " + tag + " = " + SPEC_COUNT_U4[tag] + ", saw " + (p4[tag] || 0));
}
ok(BANK.every(e => e.indicators.every(t => Object.prototype.hasOwnProperty.call(C.indicators, t))), "no entry tags outside the 99 registered indicators");
ok(!BANK.some(e => e.indicators.includes("SC7.3.5")), "SC7.3.5 carries no entries (NONE, recorded)");

const crAll = BANK.filter(e => CR[e.id] !== undefined);
const crU1 = U1.filter(e => CR[e.id] !== undefined);
const crU2 = U2.filter(e => CR[e.id] !== undefined);
const crU3 = U3.filter(e => CR[e.id] !== undefined);
const crU4 = U4.filter(e => CR[e.id] !== undefined);
ok(crAll.length === 278, "278 CR entries in the marks manifest, saw " + crAll.length);
ok(crU1.length === 69 && crU2.length === 71 && crU3.length === 62 && crU4.length === 76, "CR split 69 / 71 / 62 / 76, saw " + crU1.length + " / " + crU2.length + " / " + crU3.length + " / " + crU4.length);
const markSum = list => list.reduce((a, e) => a + CR[e.id], 0);
ok(markSum(crU1) === 184, "U1 CR marks sum to 184, saw " + markSum(crU1));
ok(markSum(crU2) === 188, "U2 CR marks sum to 188, saw " + markSum(crU2));
ok(markSum(crU3) === 167, "U3 CR marks sum to 167, saw " + markSum(crU3));
ok(markSum(crU4) === 198, "U4 CR marks sum to 198, saw " + markSum(crU4));
ok(crU1.filter(e => CR[e.id] === 3).length === 34, "34 U1 CR entries at exactly 3 marks, saw " + crU1.filter(e => CR[e.id] === 3).length);
ok(crU2.filter(e => CR[e.id] === 3).length === 34, "34 U2 CR entries at exactly 3 marks, saw " + crU2.filter(e => CR[e.id] === 3).length);
ok(crU3.filter(e => CR[e.id] === 3).length === 29, "29 U3 CR entries at exactly 3 marks, saw " + crU3.filter(e => CR[e.id] === 3).length);
ok(crU4.filter(e => CR[e.id] === 3).length === 38, "38 U4 CR entries at exactly 3 marks, saw " + crU4.filter(e => CR[e.id] === 3).length);
ok(CR["s7-u1-cr-design-experiment"] === 4 && CR["s7-u2-cr-design-test"] === 4 && CR["s7-u3-cr-design-solubility"] === 4 && CR["s7-u4-cr-design-investigation"] === 4, "all four design CRs carry 4 marks");
ok(BANK.filter(e => CR[e.id] === undefined).length === 70, "70 entries outside the marks manifest (selected response only, not bimodal), saw " + BANK.filter(e => CR[e.id] === undefined).length);
function levels(list) { const lv = [0, 0, 0]; list.forEach(e => { lv[e.level - 1]++; }); return JSON.stringify(lv); }
ok(levels(U1) === "[33,42,19]", "U1 levels 33/42/19, saw " + levels(U1));
ok(levels(U2) === "[32,41,18]", "U2 levels 32/41/18, saw " + levels(U2));
ok(levels(U3) === "[25,33,14]", "U3 levels 25/33/14, saw " + levels(U3));
ok(levels(U4) === "[34,40,17]", "U4 levels 34/40/17, saw " + levels(U4));
ok(U1.filter(e => e.kind === "gen").length === 10, "10 U1 generator entries, saw " + U1.filter(e => e.kind === "gen").length);
ok(U2.filter(e => e.kind === "gen").length === 13, "13 U2 generator entries, saw " + U2.filter(e => e.kind === "gen").length);
ok(U3.filter(e => e.kind === "gen").length === 9, "9 U3 generator entries, saw " + U3.filter(e => e.kind === "gen").length);
ok(U4.filter(e => e.kind === "gen").length === 12, "12 U4 generator entries, saw " + U4.filter(e => e.kind === "gen").length);
const noComp = BANK.filter(e => e.noCompose === true).map(e => e.id).sort();
ok(JSON.stringify(noComp) === JSON.stringify(["s7-u1-cr-design-experiment", "s7-u2-cr-design-test", "s7-u3-cr-design-solubility", "s7-u4-cr-design-investigation"]),
  "exactly the four design CRs carry noCompose, saw " + noComp.join(","));

const FIG_ENTRIES = ["s7-u1-tolerance-curve", "s7-u1-pond-interactions", "s7-u1-chain-order",
  "s7-u1-web-readoff", "s7-u1-web-removal", "s7-u1-cr-web-change", "s7-u1-nutrient-cycle",
  "s7-u1-organization-set", "s7-u1-web-roles", "s7-u1-web-chains", "s7-u1-web-predict",
  "s7-u1-cr-web-interpret", "s7-u1-key-work", "s7-u1-key-work-2",
  "s7-u1-graph-interpret", "s7-u1-cr-data-display",
  "s7-u1-succession-order", "s7-u1-flowchart-complete", "s7-u1-succession-predict", "s7-u1-cr-succession-stages",
  "s7-u4-earth-layers", "s7-u4-distribution-map", "s7-u4-ring-of-fire", "s7-u4-cr-distribution",
  "s7-u4-key-mineral", "s7-u4-key-mineral-2", "s7-u4-mineral-id", "s7-u4-mineral-id-2", "s7-u4-cr-mineral-id",
  "s7-u4-cycle-diagram", "s7-u4-cycle-path", "s7-u4-soil-drainage", "s7-u4-pattern-drainage", "s7-u4-era-scale",
  "s7-u2-states-heated", "s7-u2-plateau-read", "s7-u2-cr-plateau", "s7-u2-absorb-lab",
  "s7-u2-shc-compare", "s7-u2-graph-choice", "s7-u2-display-absorb",
  "s7-u3-particle-pure", "s7-u3-conc-compare", "s7-u3-interpolate", "s7-u3-extrapolate", "s7-u3-cr-best-fit"];
/* Figure-bearing entries: 20 in Unit 1 (the Ecosystems spec Section 5
   table; its summary line says 14 and the table governs), 7 in Unit 2
   (the Heat spec Section 5 table) and 14 in Unit 4 (the Earth's Crust
   spec Section 5 table). */

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

/* Symbiosis sweep over Unit 1 student-facing text (Jason's ruling:
   the named relationship types appear nowhere in the English bank). */
const BANNED = [/mutualis/i, /commensalis/i, /parasitis/i, /symbios/i, /symbiotic/i];
let hits = [];
U1.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (BANNED.some(r => r.test(text))) { hits.push(e.id); break; }
  }
});
ok(hits.length === 0, "symbiosis sweep clean, hits: " + hits.join(","));

/* Terminology sweep over Unit 4 student-facing text: the guide's
   term for earthquake strength is the moment magnitude scale; the
   harvested sources' Richter scale was mined for type only. */
let rHits = [];
U4.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (/richter/i.test(text)) { rHits.push(e.id); break; }
  }
});
ok(rHits.length === 0, "Richter sweep clean, hits: " + rHits.join(","));

/* Negative stems, listed for judgement (spec audit). */
const NEG = [];
BANK.forEach(e => {
  for (let i = 0; i < 30; i++) {
    const q = e.gen();
    if (/\bNOT\b|\bEXCEPT\b/.test(q.prompt)) { NEG.push(e.id + ": " + q.prompt.slice(0, 60)); break; }
  }
});
console.log("Negative-stem draws (for the audit list): " + (NEG.length ? NEG.join(" | ") : "none"));

console.log("GATE-LOAD-SCI-7: " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
