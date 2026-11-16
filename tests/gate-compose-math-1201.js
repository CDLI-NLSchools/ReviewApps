#!/usr/bin/env node
/* Gate 2 (composition) for Math 1201: the shell's composeExam must
   reproduce the standalone composer's pooled blueprint
   (math-1201-review/index.html, composeExam at lines 6954 to
   7000: multi-unit SR targets [10, 15, 2] and CR total 23 at
   line 6956 to 6957, Level 3 subset-sum targets [8, 9, 7] at
   line 6975). Every multi-unit selection (the mid scope Units
   1 to 3, the final scope Units 4 to 7, a custom pair, and all
   seven units) composes a 50-mark paper: 27 selected response,
   23 constructed response, level totals 10/30/10, not flagged
   short, in at least 190 of 200 trials; the Level 3 share of
   Section B lands in the standalone's 7 to 9 mark window in at
   least 95% of the exact papers. Each single-unit test composes
   25 marks (SR 11 / CR 14) exactly in at least 190 of 200
   trials. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["math-1201"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
eval(blocks.find(b => b.includes("function mcq")).replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-1201.js", "utf8"));
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
for (const n of ["poolFor", "scopeCap", "levelTargets", "canonQ", "probeType", "subsetSumMarks", "composeExam", "isPK"]) eval(extractFn(html, n));
ok(typeof composeExam === "function", "built shell carries composeExam");

/* Pool shapes the config implies (standalone pools: mid covers
   Units 1 to 3 whole, final Units 4 to 7 whole, no caps). */
ok(poolFor([1, 2, 3, 4, 5, 6, 7], [], false).length === 227,
   "All-units pool is the whole bank (227), saw " + poolFor([1, 2, 3, 4, 5, 6, 7], [], false).length);
ok(poolFor([1, 2, 3], [], false).length === 107,
   "Mid pool is 107, saw " + poolFor([1, 2, 3], [], false).length);
ok(poolFor([4, 5, 6, 7], [], false).length === 120,
   "Final pool is 120, saw " + poolFor([4, 5, 6, 7], [], false).length);

function stats(res) {
  const s = { total: res.total, sr: res.srMarks, cr: res.crMarks, short: res.short, levels: [0, 0, 0], crL3: 0 };
  res.srItems.forEach(it => { s.levels[it.q._entry.level - 1]++; });
  res.crItems.forEach(it => {
    s.levels[it.q._entry.level - 1] += it.marks;
    if (it.q._entry.level === 3) s.crL3 += it.marks;
  });
  return s;
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function runPooled(name, units, trials) {
  let exact = 0, inWindow = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam(units, []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (!s.short && s.total === 50 && s.sr === 27 && s.cr === 23 && eq(s.levels, [10, 30, 10])) {
      exact++;
      if (s.crL3 >= 7 && s.crL3 <= 9) inWindow++;
    } else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short, levels: s.levels, crL3: s.crL3 }));
  }
  console.log(name + ": exact " + exact + "/" + trials + " (Section B Level 3 in the 7 to 9 window in " + inWindow + " of the exact papers)" + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  ok(exact >= 190, name + ": at least 190/200 exact 50-mark papers at level totals 10/30/10, saw " + exact);
  ok(exact > 0 && inWindow / exact >= 0.95, name + ": Level 3 share in the 7 to 9 window in at least 95% of exact papers, saw " + inWindow + "/" + exact);
}

function runUnit(u, trials) {
  let exact = 0; const bad = [];
  for (let t = 0; t < trials; t++) {
    const res = composeExam([u], []);
    if (!res) { bad.push("null"); continue; }
    const s = stats(res);
    if (!s.short && s.total === 25 && s.sr === 11 && s.cr === 14) exact++;
    else if (bad.length < 3) bad.push(JSON.stringify({ total: s.total, sr: s.sr, cr: s.cr, short: s.short }));
  }
  console.log("unit " + u + " test: exact " + exact + "/" + trials + (bad.length ? " | sample misses: " + bad.join(" ;; ") : ""));
  ok(exact >= 190, "unit " + u + " test: at least 190/200 exact 25-mark papers, saw " + exact);
}

runPooled("mid [1,2,3]", [1, 2, 3], 200);
runPooled("final [4,5,6,7]", [4, 5, 6, 7], 200);
runPooled("custom [2,3]", [2, 3], 200);
runPooled("all [1..7]", [1, 2, 3, 4, 5, 6, 7], 200);
for (const u of [1, 2, 3, 4, 5, 6, 7]) runUnit(u, 200);

console.log("GATE-COMPOSE-MATH-1201 " + (fail ? "FAIL" : "PASS") + " (" + pass + " passed, " + fail + " failed)");
process.exit(fail ? 1 : 0);
