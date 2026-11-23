#!/usr/bin/env node
/* Gate 1 (load) for Chemistry 2202: chassis helpers + courses.js + the
   assembled Chemistry 2202 bank module evaluate cleanly; BANK has 190
   entries (182 content + 8 Science 1206 bridging; the standalone app's
   counts were 160/152, amended November 19, 2026 for the Bank
   Strengthening Programme pass 2 adding 17 Unit 2 entries, u2-62 to
   u2-78, and pass 1 adding 13 Unit 1 entries); window.__BANK_CRMARKS
   has 57 keys (the standalone bank source's own CR manifest: 26 + 11
   + 10 + 3 across its four bank files, matching the CR_MARKS table in
   the built standalone, plus 3 for the pass 2 numeric entries u2-72 to
   u2-74 at 2 marks each and 4 for the pass 1 entries
   u1-51-write-acid-formula=2, u1-59-actual-from-percent=2,
   u1-510-limestone-lime=3 and u1-510-peroxide-oxygen=3);
   every registered indicator has entries, no entry uses an
   unregistered code, no entry carries a skills code, and entry ids
   are unique. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["chem-2202"], "chem-2202 registered");
window.__COURSE = window.COURSES["chem-2202"];
ok(window.__COURSE.listed === true, "chem-2202 is listed (in the picker since Nov 12, 2026)");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Stoichiometry" && UNITS[4] === "Science 1206 Review (prior learning)", "UNITS read from the course config");
/* Pin update, November 22, 2026 (STSE registration): the 19 STSE indicators (families 8, 9, 10) were registered for rich-task use with no bank entries; the registered count pin rises from 34 to 53 and the no-entries check below covers the 34 bank-carrying codes. No bank content was changed to fit this gate. */
ok(Object.keys(INDICATORS).length === 53, "INDICATORS has 53 codes (34 before the November 22, 2026 STSE registration), saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/chem-2202.js", "utf8"));

/* Pin update, November 20, 2026 (science test lengthening tranche): census pins updated to the deepened bank; values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
/* Pin update, November 20, 2026 (CR denomination tranche): census pins updated for the one denomination entry added to Unit 3 (203 entries, 58 CR keys, Unit 3 count 46); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
ok(BANK.length === 203, "BANK has 203 entries (190 after the November 19, 2026 Bank Strengthening Programme passes, plus 12 lengthening tranche entries of November 20, 2026: nine in Unit 1, two in Unit 2, one in Unit 3, plus one CR denomination tranche entry of November 20, 2026 in Unit 3), saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
/* Pin update, November 20, 2026 (reverse bimodal registration): the CRMARKS census pin updated to the bank after the registration of the 118 strippable entries (87 class a, 31 class b, 274 marks) per Bimodal-Classification-SR-Pools-Science-2026-11-20.md (Chemistry 2202: CR manifest 176 entries); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
ok(crKeys.length === 176, "__BANK_CRMARKS has 176 keys (58 before the reverse bimodal registration, plus the 118 entries registered November 20, 2026), saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
ok(perUnit[1] === 69 && perUnit[2] === 80 && perUnit[3] === 46, "content unit counts 69/80/46 (60/78/44 before the November 20, 2026 lengthening tranche added 9/2/1, and the CR denomination tranche added one more in Unit 3), saw " + JSON.stringify(perUnit));
ok(perUnit[4] === 8, "bridging unit has 8 entries, saw " + perUnit[4]);
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1 && !/^(8|9|10)\./.test(c));
ok(empty.length === 0, "indicators with no entries (STSE families 8 to 10 exempt, registered for rich-task use November 22, 2026): " + empty.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));
const skills = BANK.filter(e => e.indicators.some(c => /^(8|9|10)\./.test(c)));
ok(skills.length === 0, "entries carrying skills codes: " + skills.map(e => e.id).join(", "));
const bridging = BANK.filter(e => e.unit === 4);
ok(bridging.every(e => e.indicators.every(c => /^B\./.test(c))), "a bridging entry carries a non-B code");

console.log("entries: " + BANK.length + " per unit: " + JSON.stringify(perUnit) + "; CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD-CHEM-2202 FAIL: " + fails.join(" | ") : "GATE-LOAD-CHEM-2202 PASS");
process.exit(fails.length ? 1 : 0);
