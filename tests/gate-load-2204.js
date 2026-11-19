#!/usr/bin/env node
/* Gate 1 (load) for Physics 2204: chassis helpers + courses.js + the
   assembled Physics 2204 bank module evaluate cleanly; BANK has 233
   entries (225 course + 8 Science 1206 bridging; the course count was
   202 before the November 19, 2026 Bank Strengthening Programme pass 7
   added 23 Unit 3 entries); window.__BANK_CRMARKS has 30 keys (25 before
   pass 7 registered the five new Unit 3 constructed response entries);
   every registered indicator has entries and no entry uses an
   unregistered code. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["physics-2204"], "physics-2204 registered");
window.__COURSE = window.COURSES["physics-2204"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Kinematics" && UNITS[5] === "Science 1206 Review (prior learning)", "UNITS read from the course config");
ok(Object.keys(INDICATORS).length === 36, "INDICATORS has 36 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/physics-2204.js", "utf8"));

ok(BANK.length === 233, "BANK has 233 entries (210 before the November 19, 2026 Bank Strengthening Programme pass 7 added 23 Unit 3 entries), saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
ok(crKeys.length === 30, "__BANK_CRMARKS has 30 keys (25 before pass 7 registered u3-71-net-work-cr, u3-77-efficiency-cr, u3-79-spring-launch-cr, u3-710-period-cr and u3-715-defect-energy-cr), saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
ok(perUnit[5] === 8, "bridging unit has 8 entries, saw " + perUnit[5]);
const codes = Object.keys(window.__COURSE.indicators);
const empty = codes.filter(c => (census[c] || 0) < 1);
ok(empty.length === 0, "indicators with no entries: " + empty.join(", "));
const unknown = Object.keys(census).filter(c => !window.__COURSE.indicators[c]);
ok(unknown.length === 0, "entries tagged with unregistered codes: " + unknown.join(", "));

console.log("entries: " + BANK.length + " per unit: " + JSON.stringify(perUnit) + "; CR keys: " + crKeys.length);
console.log("coverage: " + codes.map(c => c + "=" + census[c]).join(" "));
console.log(fails.length ? "GATE-LOAD-2204 FAIL: " + fails.join(" | ") : "GATE-LOAD-2204 PASS");
process.exit(fails.length ? 1 : 0);
