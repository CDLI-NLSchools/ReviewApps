#!/usr/bin/env node
/* Gate 1 (load) for Chemistry 3202: chassis helpers + courses.js + the
   assembled Chemistry 3202 bank module evaluate cleanly; BANK has 220
   entries (212 content + 8 Chemistry 2202 bridging); window.__BANK_CRMARKS
   has 48 keys; every registered indicator has entries, no entry uses an
   unregistered code, no entry carries an Integrated Skills code, and
   entry ids are unique.
   Counts updated Nov 19, 2026 at the joint landing (guide-code recode
   plus the Unit 2 and Unit 3 Gemini tranches: bank 172 to 217, CR keys
   41 to 51, unit counts 36/44/46/38 to 36/58/77/38), and again Nov 19,
   2026 at the scaled-amount re-draft landing (u3-711-scaled-amount:
   bank 217 to 218, Unit 3 77 to 78, CR keys unchanged). Counts
   updated again Nov 20, 2026 at the bimodal build landing (two
   written entries added, u1-wcr-factor-changes-explain in Unit 1
   and u4-wcr-fuel-cell-response in Unit 4: bank 218 to 220, unit
   counts 36/58/78/38 to 37/58/78/39; five multiple-choice entries
   left the CR manifest and the two written entries joined it:
   CR keys 51 to 48). */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["chem-3202"], "chem-3202 registered");
window.__COURSE = window.COURSES["chem-3202"];
ok(window.__COURSE.listed === true, "chem-3202 is listed (in the picker since Nov 12, 2026)");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "From Kinetics to Equilibrium" && UNITS[5] === "Chemistry 2202 Review (prior learning)", "UNITS read from the course config");
/* Pin update, November 22, 2026 (STSE registration): the 20 STSE indicators (families 9, 10, 11, 12) were registered for rich-task use with no bank entries; the registered count pin rises from 40 to 60 and the no-entries check below covers the 40 bank-carrying codes. No bank content was changed to fit this gate. */
ok(Object.keys(INDICATORS).length === 60, "INDICATORS has 60 codes (40 before the November 22, 2026 STSE registration), saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/chem-3202.js", "utf8"));

/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank; values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated for the one denomination entry added to Unit 1 (232 entries, 49 CR keys, Unit 1 count 38); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
ok(BANK.length === 232, "BANK has 232 entries, saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
/* Pin update, November 20, 2026 (reverse bimodal registration): the CRMARKS census pin updated to the bank after the registration of the 148 strippable entries (83 class a, 65 class b, 348 marks) per Bimodal-Classification-SR-Pools-Science-2026-11-20.md (Chemistry 3202: CR manifest 197 entries); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
ok(crKeys.length === 197, "__BANK_CRMARKS has 197 keys (49 before the reverse bimodal registration, plus the 148 entries registered November 20, 2026), saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
ok(perUnit[1] === 38 && perUnit[2] === 60 && perUnit[3] === 84 && perUnit[4] === 42, "content unit counts 38/60/84/42 (37/58/78/39 before the November 20, 2026 lengthening tranche added 0/2/6/3, and the CR denomination tranche of November 20, 2026 added one more in Unit 1), saw " + JSON.stringify(perUnit));
ok(perUnit[5] === 8, "bridging unit has 8 entries, saw " + perUnit[5]);
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1 && !/^(9|10|11|12)\./.test(c));
ok(empty.length === 0, "indicators with no entries (STSE families 9 to 12 exempt, registered for rich-task use November 22, 2026): " + empty.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));
const skills = BANK.filter(e => e.indicators.some(c => /^(9|10|11|12)\./.test(c)));
ok(skills.length === 0, "entries carrying Integrated Skills codes: " + skills.map(e => e.id).join(", "));

console.log("entries: " + BANK.length + " per unit: " + JSON.stringify(perUnit) + "; CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD-CHEM-3202 FAIL: " + fails.join(" | ") : "GATE-LOAD-CHEM-3202 PASS");
process.exit(fails.length ? 1 : 0);
