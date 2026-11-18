#!/usr/bin/env node
/* Gate 1 (load) for Math 3208: chassis helpers + courses.js + the
   assembled Math 3208 bank module evaluate cleanly; BANK has 196
   entries (per unit 23/26/19/47/26/19/20/16, including the two
   Unit 3 items authored under ruling 48 on November 13, 2026, the
   three Pure Math harvest items of build order step 3 the same
   day: one Unit 1 and two Unit 2 entries, and the step 9 tiered
   charter entry u5-opt-charter in Unit 5; the log follow-up of
   November 16, 2026 adds five Unit 7 prior knowledge entries
   borrowed from the Mathematics 3200 bank; the external drafting
   pilot tranche of November 18, 2026 adds nineteen Unit 4 entries,
   seven of them constructed response, integrated after the intake
   sweep; the swap tranche of November 18, 2026 adds the remaining
   three Unit 4 entries in their ChatGPT versions, completing the
   pilot assignment at the full 22 entries, none of them constructed
   response, so the CR pins below are unchanged);
   window.__BANK_CRMARKS has 110 keys (carried as manifest comments,
   denominations 1x17, 2x63, 3x28, 4x2, marks summing to 235);
   every registered indicator has entries and no
   entry uses an unregistered code; every entry generates a prompt
   in this shell and every multiple choice generation has exactly
   four options. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-3208"], "math-3208 registered");
window.__COURSE = window.COURSES["math-3208"];
ok(window.__COURSE.listed === true, "math-3208 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 12, "picker metadata: Mathematics, grade 12");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Pre-Calculus" && UNITS[8] === "Antidifferentiation and Integration", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 8, "UNITS has 8 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 96, "INDICATORS has 96 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-3208.js", "utf8"));

ok(BANK.length === 196, "BANK has 196 entries, saw " + BANK.length);
const cr = window.__BANK_CRMARKS || {};
const crKeys = Object.keys(cr);
ok(crKeys.length === 110, "__BANK_CRMARKS has 110 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");
const denom = {};
let crSum = 0;
crKeys.forEach(k => { denom[cr[k]] = (denom[cr[k]] || 0) + 1; crSum += cr[k]; });
ok(JSON.stringify(denom) === JSON.stringify({ 1: 17, 2: 63, 3: 28, 4: 2 }), "CR denominations match the bank manifest (1x17, 2x63, 3x28, 4x2), saw " + JSON.stringify(denom));
ok(crSum === 235, "CR marks sum to 235, saw " + crSum);
ok(cr["u1-evaluate-operation"] === 1 && cr["u5-rr-ladder"] === 3 && cr["u8-general-antiderivative"] === 3 && cr["u1-compose-solve-cr"] === 3,
   "CR spot values match the standalone map (u1-evaluate-operation 1, u5-rr-ladder 3, u8-general-antiderivative 3, u1-compose-solve-cr 3)");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 23, 2: 26, 3: 19, 4: 47, 5: 26, 6: 19, 7: 20, 8: 16 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts match the bank (23/26/19/47/26/19/20/16), saw " + JSON.stringify(perUnit));
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1);
ok(empty.length === 0, "indicators with no entries: " + empty.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));

// every entry generates in this shell; MC draws carry exactly 4 options
let genBad = 0, mcBad = 0;
for (const e of BANK) {
  for (let i = 0; i < 25; i++) {
    let q; try { q = e.gen(); } catch (err) { genBad++; break; }
    if (!q || !q.prompt) { genBad++; break; }
    if (q.type === "mc" && (!q.options || q.options.length !== 4)) { mcBad++; break; }
  }
  if (genBad > 4) break;
}
ok(genBad === 0, "entries that threw or produced no prompt: " + genBad);
ok(mcBad === 0, "entries producing MC questions without exactly 4 options: " + mcBad);

console.log("entries: " + BANK.length + " per unit: " + JSON.stringify(perUnit) + "; CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD-MATH-3208 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-3208 PASS");
process.exit(fails.length ? 1 : 0);
