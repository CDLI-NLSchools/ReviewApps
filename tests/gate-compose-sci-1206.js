#!/usr/bin/env node
/* Gate 2 (composition) for Science 1206: the shell's own composeExam
   must compose both presets and every single-unit test exactly on
   the config's blueprint in at least 190 of 200 trials each. The
   presets apply the school finals' per-unit pattern (Jason's
   rulings, Nov 12, 2026): each unit of a paper contributes 10
   selected-response items and 10 constructed-response marks, with
   per-unit level totals of 3 marks at Level 1, 9 at Level 2 and 8
   at Level 3 (levels by judgement; no Table of Specifications
   exists for this course). Mid = Units 1+2, final = Units 3+4
   (the corrected house-pattern scope). A single unit composes the
   25-mark unit test (15 SR + 10 CR). The all-units selection uses
   the pooled fallback (30 SR + 20 CR marks, 50 total). No paper may
   repeat a question, and every item must come from a selected unit. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["sci-1206"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/sci-1206.js", "utf8"));
var CR_MARKS = window.__BANK_CRMARKS;
var _probeCache = {};

function extractFn(src, name) {
  const start = src.indexOf("function " + name + "(");
  if (start < 0) throw new Error("missing function " + name);
  let i = src.indexOf("{", start), depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  throw new Error("unbalanced " + name);
}
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam"]) eval(extractFn(html, n));

const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };
const ENTRY = {};
BANK.forEach(e => { ENTRY[e.id] = e; });

function checkPaper(res, units) {
  const ids = new Set();
  for (const it of res.srItems.concat(res.crItems)) {
    if (!units.includes(it.q._entry.unit)) return "item from unselected unit " + it.q._entry.unit;
    if (ids.has(it.q.prompt)) return "duplicate prompt on one paper";
    ids.add(it.q.prompt);
  }
  return null;
}
function trialPreset(units, label) {
  let good = 0, firstBad = null;
  for (let t = 0; t < 200; t++) {
    const res = composeExam(units, []);
    if (!res) { if (!firstBad) firstBad = "composeExam returned null"; continue; }
    let clean = res.total === 40 && res.srMarks === 20 && res.crMarks === 20 && !res.short && !checkPaper(res, units);
    if (clean) {
      for (const u of units) {
        const srU = res.srItems.filter(it => it.q._entry.unit === u);
        const crU = res.crItems.filter(it => it.q._entry.unit === u);
        const crMarksU = crU.reduce((s, it) => s + (CR_MARKS[it.q._entry.id] || 0), 0);
        const lv = [0, 0, 0];
        srU.forEach(it => { lv[it.q._entry.level - 1] += 1; });
        crU.forEach(it => { lv[it.q._entry.level - 1] += (CR_MARKS[it.q._entry.id] || 0); });
        if (srU.length !== 10 || crMarksU !== 10 || JSON.stringify(lv) !== "[3,9,8]") {
          clean = false;
          if (!firstBad) firstBad = "Unit " + u + " off-blueprint: SR " + srU.length + ", CR marks " + crMarksU + ", levels " + JSON.stringify(lv);
        }
      }
    } else if (!firstBad) firstBad = "off-shape (total " + res.total + ", sr " + res.srMarks + ", cr " + res.crMarks + ", short " + res.short + ") " + (checkPaper(res, units) || "");
    if (clean) good++;
  }
  ok(good >= 190, label + ": " + good + "/200 trials compose exactly on the blueprint" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
  return good;
}
function trialUnit(u) {
  let good = 0, firstBad = null;
  for (let t = 0; t < 200; t++) {
    const res = composeExam([u], []);
    if (!res) { if (!firstBad) firstBad = "composeExam returned null"; continue; }
    const clean = res.total === 25 && res.srMarks === 15 && res.crMarks === 10 && !res.short && !checkPaper(res, [u]);
    if (clean) good++;
    else if (!firstBad) firstBad = "off-shape (total " + res.total + ", sr " + res.srMarks + ", cr " + res.crMarks + ", short " + res.short + ")";
  }
  ok(good >= 190, "Unit " + u + " test: " + good + "/200 trials compose exactly (25 total, 15 SR, 10 CR)" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
  return good;
}
function trialFallback() {
  let good = 0, firstBad = null;
  for (let t = 0; t < 200; t++) {
    const res = composeExam([1, 2, 3, 4], []);
    if (!res) { if (!firstBad) firstBad = "composeExam returned null"; continue; }
    const clean = res.total === 50 && res.srMarks === 30 && res.crMarks === 20 && !res.short && !checkPaper(res, [1, 2, 3, 4]);
    if (clean) good++;
    else if (!firstBad) firstBad = "off-shape (total " + res.total + ", sr " + res.srMarks + ", cr " + res.crMarks + ", short " + res.short + ")";
  }
  ok(good >= 190, "Fallback (all units): " + good + "/200 trials compose exactly (50 total, 30 SR, 20 CR)" + (firstBad ? " (first bad: " + firstBad + ")" : ""));
  return good;
}

const r = {};
r.mid = trialPreset([1, 2], "Mid preset [1,2]");
r.final = trialPreset([3, 4], "Final preset [3,4]");
for (const u of [1, 2, 3, 4]) r["u" + u] = trialUnit(u);
r.fallback = trialFallback();

if (fails.length) { console.log("GATE COMPOSE sci-1206: FAIL (" + fails.length + ")"); fails.forEach(f => console.log(" - " + f)); process.exit(1); }
console.log("GATE COMPOSE sci-1206: PASS " + JSON.stringify(r));
