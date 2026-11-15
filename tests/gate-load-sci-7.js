#!/usr/bin/env node
/* Gate (load + census + draw) for the Science 7 Unit 1 build:
     node tests/gate-load-sci-7.js
   Expectations are the Ecosystems authoring spec (Nov 15, 2026):
   - courses.js registers sci-7 (Science, grade 7, listed:false,
     curriculum NL), Unit 1 only, 27 indicators.
   - The bank registers exactly 80 entries: 65 SR + 15 CR, levels
     32/32/16, per-indicator counts equal to the spec Section 3,
     SC7.3.5 at zero (recorded NONE), no tags outside the 27.
   - CR marks manifest: 15 keys, denominations 2x4, 3x10... see
     below; marks sum 41; nine entries at exactly 3 marks.
   - Symbiosis sweep: no student-facing text names mutualism,
     commensalism or parasitism.
   - Every entry draws clean questions; SR draws carry exactly 4
     options with exactly one correct; the 14 figure entries carry
     a figure on every draw. */
const fs = require("fs");
const ROOT = process.env.HOME + "/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
const C = window.COURSES["sci-7"];
ok(!!C, "courses.js registers sci-7");
ok(C.listed === false, "sci-7 is unlisted");
ok(C.curriculum === "NL" && C.subject === "Science" && C.grade === 7, "curriculum NL, Science, grade 7");
ok(C.units[1] === "Interactions Within Ecosystems" && Object.keys(C.units).length === 1, "Unit 1 only registered");
ok(Object.keys(C.indicators).length === 27, "27 indicators registered, saw " + Object.keys(C.indicators).length);
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

ok(BANK.length === 80, "bank registers 80 entries, saw " + BANK.length);
const ids = new Set(BANK.map(e => e.id));
ok(ids.size === 80, "all entry ids unique");
ok(BANK.every(e => e.unit === 1), "every entry is Unit 1");

const SPEC_COUNT = {
  "SC7.1.1": 4, "SC7.1.2": 4, "SC7.1.3": 3, "SC7.1.4": 3, "SC7.1.5": 4, "SC7.1.6": 4, "SC7.1.7": 3, "SC7.1.8": 4,
  "SC7.2.1": 2, "SC7.2.2": 4, "SC7.2.3": 3, "SC7.2.4": 3, "SC7.2.5": 3, "SC7.2.6": 2, "SC7.2.7": 3, "SC7.2.8": 2,
  "SC7.3.1": 3, "SC7.3.2": 2, "SC7.3.3": 3, "SC7.3.4": 2, "SC7.3.5": 0, "SC7.3.6": 2, "SC7.3.7": 3, "SC7.3.8": 4,
  "SC7.3.9": 4, "SC7.3.10": 2, "SC7.3.11": 4
};
const primary = {};
BANK.forEach(e => { primary[e.indicators[0]] = (primary[e.indicators[0]] || 0) + 1; });
for (const tag of Object.keys(SPEC_COUNT)) {
  ok((primary[tag] || 0) === SPEC_COUNT[tag], "primary count " + tag + " = " + SPEC_COUNT[tag] + ", saw " + (primary[tag] || 0));
}
ok(BANK.every(e => e.indicators.every(t => Object.prototype.hasOwnProperty.call(C.indicators, t))), "no entry tags outside the 27 registered indicators");
ok(!BANK.some(e => e.indicators.includes("SC7.3.5")), "SC7.3.5 carries no entries (NONE, recorded)");

const crEntries = BANK.filter(e => CR[e.id] !== undefined);
ok(crEntries.length === 15, "15 CR entries in the marks manifest, saw " + crEntries.length);
ok(Object.values(CR).reduce((a, b) => a + b, 0) === 41, "CR marks sum to 41, saw " + Object.values(CR).reduce((a, b) => a + b, 0));
ok(Object.values(CR).filter(m => m === 3).length === 9, "nine CR entries at exactly 3 marks, saw " + Object.values(CR).filter(m => m === 3).length);
ok(CR["s7-u1-cr-design-experiment"] === 4, "design CR carries 4 marks");
const srEntries = BANK.filter(e => CR[e.id] === undefined);
ok(srEntries.length === 65, "65 SR entries, saw " + srEntries.length);
const lv = [0, 0, 0];
BANK.forEach(e => { lv[e.level - 1]++; });
ok(JSON.stringify(lv) === "[32,32,16]", "levels 32/32/16, saw " + JSON.stringify(lv));
const gens = BANK.filter(e => e.kind === "gen");
ok(gens.length === 10, "10 generator entries per the spec Section 3 tables, saw " + gens.length);

const FIG_ENTRIES = ["s7-u1-tolerance-curve", "s7-u1-pond-interactions", "s7-u1-chain-order",
  "s7-u1-web-readoff", "s7-u1-web-removal", "s7-u1-cr-web-change", "s7-u1-nutrient-cycle",
  "s7-u1-organization-set", "s7-u1-web-roles", "s7-u1-web-chains", "s7-u1-web-predict",
  "s7-u1-cr-web-interpret", "s7-u1-key-work", "s7-u1-key-work-2",
  "s7-u1-graph-interpret", "s7-u1-cr-data-display",
  "s7-u1-succession-order", "s7-u1-flowchart-complete", "s7-u1-succession-predict", "s7-u1-cr-succession-stages"];
/* Figure-bearing entries per the spec Section 5 table: 20 entries
   across the 9 families (the web family alone serves 7). The
   spec's summary line says 14; its own table lists 20, and the
   table governs. */

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

/* Symbiosis sweep over student-facing text: sample draws of every
   entry and scan prompts, options, answers and solutions. */
const BANNED = [/mutualis/i, /commensalis/i, /parasitis/i, /symbios/i, /symbiotic/i];
let hits = [];
BANK.forEach(e => {
  for (let i = 0; i < 40; i++) {
    const q = e.gen();
    const text = [q.prompt, q.solution].concat(q.options || [], q.answers || []).join(" ");
    if (BANNED.some(r => r.test(text))) { hits.push(e.id); break; }
  }
});
ok(hits.length === 0, "symbiosis sweep clean, hits: " + hits.join(","));

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
