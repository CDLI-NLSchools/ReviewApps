#!/usr/bin/env node
/* Gate 1 (load) for Chemistry 2202: chassis helpers + courses.js + the
   assembled Chemistry 2202 bank module evaluate cleanly; BANK has 177
   entries (169 content + 8 Science 1206 bridging; the standalone app's
   counts were 160/152, amended November 19, 2026 for the Bank
   Strengthening Programme pass 2 adding 17 Unit 2 entries, u2-62 to
   u2-78); window.__BANK_CRMARKS has 53 keys (the standalone bank
   source's own CR manifest: 26 + 11 + 10 + 3 across its four bank
   files, matching the CR_MARKS table in the built standalone, plus 3
   for the pass 2 numeric entries u2-72 to u2-74 at 2 marks each);
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
ok(Object.keys(INDICATORS).length === 34, "INDICATORS has 34 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/chem-2202.js", "utf8"));

ok(BANK.length === 177, "BANK has 177 entries (160 standalone, plus the November 19, 2026 Bank Strengthening Programme pass 2 adding 17 Unit 2 entries), saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
ok(crKeys.length === 53, "__BANK_CRMARKS has 53 keys (50 standalone, plus u2-72 to u2-74 from the November 19, 2026 pass 2), saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
ok(perUnit[1] === 47 && perUnit[2] === 78 && perUnit[3] === 44, "content unit counts 47/78/44 (Unit 2 was 61 before the November 19, 2026 pass 2), saw " + JSON.stringify(perUnit));
ok(perUnit[4] === 8, "bridging unit has 8 entries, saw " + perUnit[4]);
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1);
ok(empty.length === 0, "indicators with no entries: " + empty.join(", "));
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
