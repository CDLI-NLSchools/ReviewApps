#!/usr/bin/env node
/* Gate 1 (load) for Math 3200: chassis helpers + courses.js + the
   assembled Math 3200 bank module evaluate cleanly; BANK has 219
   entries (per unit 26/24/19/27/24/27/21/22/29; the PK tranche of
   November 16, 2026 added 49 flagged entries across all nine units;
   Unit 6 gained the two
   full-proof CR entries u6-proof-direct and u6-proof-strategy on
   Nov 13, 2026, and Unit 9 gained the grid-pathway CR entries
   u9-pathways and u9-pathways-context the same day, split across
   Levels 2 and 3 by ruling 49; Unit 4 gained the Numerical Response
   entry u4-nr-exact-code and Unit 6 the Numerical Response entries
   u6-nr-matching and u6-nr-exact-code the same day, build step 6);
   window.__BANK_CRMARKS has 142 keys (the standalone bank
   source's CR_MARKS map, carried as manifest comments); every
   registered indicator has entries and no entry uses an unregistered
   code; every entry generates a prompt in this shell and every
   multiple choice generation has exactly four options. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-3200"], "math-3200 registered");
window.__COURSE = window.COURSES["math-3200"];
ok(window.__COURSE.listed === true, "math-3200 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 12, "picker metadata: Mathematics, grade 12");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Polynomial Functions" && UNITS[9] === "Permutations, Combinations, and the Binomial Theorem", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 9, "UNITS has 9 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 137, "INDICATORS has 137 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-3200.js", "utf8"));

ok(BANK.length === 219, "BANK has 219 entries, saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
ok(crKeys.length === 142, "__BANK_CRMARKS has 142 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 26, 2: 24, 3: 19, 4: 27, 5: 24, 6: 27, 7: 21, 8: 22, 9: 29 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts (26/24/19/27/24/27/21/22/29), saw " + JSON.stringify(perUnit));
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
console.log(fails.length ? "GATE-LOAD-MATH-3200 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-3200 PASS");
process.exit(fails.length ? 1 : 0);
