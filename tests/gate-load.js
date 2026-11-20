#!/usr/bin/env node
/* Gate 1 (load): chassis helpers + courses.js + the assembled bank module
   evaluate cleanly; BANK has 185 entries; window.__BANK_CRMARKS has 124 (185/42 from the Nov 11 late addition of u4-83-compton-cr until November 20, 2026; 124 since the reverse bimodal registration that day)
   keys; every one of the 27 Knowledge indicators has at least 3 entries. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["physics-3204"], "physics-3204 registered");
window.__COURSE = window.COURSES["physics-3204"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Motion" && UNITS[4] === "Introduction to Quantum Physics", "UNITS read from the course config");
ok(Object.keys(INDICATORS).length === 27, "INDICATORS has 27 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/physics-3204.js", "utf8"));

ok(BANK.length === 185, "BANK has 185 entries, saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
/* Pin update, November 20, 2026 (reverse bimodal registration): the CRMARKS census pin updated to the bank after the registration of the 82 strippable entries (52 class a, 30 class b, 231 marks) per Bimodal-Classification-SR-Pools-Science-2026-11-20.md (Physics 3204: CR manifest 124 entries, 42 pre-existing plus 82 registered); values verified from the assembled bank the same day. No bank content was changed to fit this gate. */
ok(crKeys.length === 124, "__BANK_CRMARKS has 124 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
ok(perUnit[1] === 34 && perUnit[2] === 36 && perUnit[3] === 77 && perUnit[4] === 38,
   "per-unit counts 34/36/77/38, saw " + JSON.stringify(perUnit));
const codes = Object.keys(window.__COURSE.indicators);
const thin = codes.filter(c => (census[c] || 0) < 3);
ok(thin.length === 0, "indicators under 3 entries: " + thin.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));

console.log("entries: " + BANK.length + " (U1 " + perUnit[1] + ", U2 " + perUnit[2] + ", U3 " + perUnit[3] + ", U4 " + perUnit[4] + "); CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD FAIL: " + fails.join(" | ") : "GATE-LOAD PASS");
process.exit(fails.length ? 1 : 0);
