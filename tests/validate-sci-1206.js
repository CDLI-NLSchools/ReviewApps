#!/usr/bin/env node
/* Deep draw validation for the Science 1206 bank: every generator and
   varset exercised over large draw counts; structural invariants on
   every draw; independent recomputation for the machinery (balancer,
   formula writer) and for entries that expose their parameters. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["sci-1206"];
ok(!!window.__COURSE, "sci-1206 registered in courses.js");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
eval(helperBlock.replace(/"use strict";/g, ""));

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/sci-1206.js", "utf8"));
const CRMARKS = window.__BANK_CRMARKS || {};
ok(Object.keys(CRMARKS).length === 12, "12 CR marks registered, saw " + Object.keys(CRMARKS).length);

const BAD = /undefined|\bNaN\b|\bnull\b|\[object/;
function checkQ(e, q, tag) {
  ok(q && typeof q === "object", e.id + " " + tag + ": draw returned no object");
  if (!q) return;
  ok(typeof q.prompt === "string" && q.prompt.length > 10, e.id + " " + tag + ": prompt too short");
  ok(!BAD.test(q.prompt), e.id + " " + tag + ": prompt has bad token: " + q.prompt.slice(0, 90));
  ok(typeof q.solution === "string" && q.solution.length > 10, e.id + " " + tag + ": solution missing/short");
  if (q.solution) ok(!BAD.test(q.solution), e.id + " " + tag + ": solution bad token: " + q.solution.slice(0, 90));
  if (q.figure) {
    ok(q.figure.indexOf("<svg") === 0 && /<\/svg>$/.test(q.figure), e.id + " " + tag + ": figure not a complete svg");
    ok(!BAD.test(q.figure), e.id + " " + tag + ": figure has bad token");
  }
  if (q.type === "text") {
    var sum = 0, m, found = false;
    var re = /\((\d+)\)/g;
    while ((m = re.exec(q.prompt))) { sum += parseInt(m[1], 10); found = true; }
    // Entries whose prompts carry per-part "(k)" annotations must sum to the
    // manifest; entries in the Unit 1 style carry their marking points in the
    // model answer instead and are governed by the manifest alone.
    if (found) ok(sum === (CRMARKS[e.id] || -1), e.id + " " + tag + ": CR part marks sum " + sum + " != manifest " + CRMARKS[e.id]);
    return;
  }
  ok(Array.isArray(q.options) && q.options.length === 4, e.id + " " + tag + ": options != 4 (" + (q.options || []).length + ")");
  if (Array.isArray(q.options)) {
    ok(new Set(q.options).size === q.options.length, e.id + " " + tag + ": duplicate options: " + JSON.stringify(q.options));
    q.options.forEach(o => {
      ok(typeof o === "string" && o.length > 0, e.id + " " + tag + ": empty option");
      ok(!BAD.test(String(o)), e.id + " " + tag + ": bad token in option: " + String(o).slice(0, 80));
    });
  }
  ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, e.id + " " + tag + ": correct index out of range: " + q.correct);
}

const DRAWS = { gen: 2500, var: 700 };
const tally = {};
BANK.forEach(e => {
  const n = e.kind === "gen" ? DRAWS.gen : (CRMARKS[e.id] ? 120 : DRAWS.var);
  const seen = new Set();
  for (let i = 0; i < n; i++) {
    let q;
    try { q = e.gen(); } catch (err) { ok(false, e.id + " draw " + i + " threw: " + err.message); break; }
    if (i < 40 || i % 37 === 0) checkQ(e, q, "draw" + i);
    else {
      // cheap check on every draw
      if (!q || (q.type !== "text" && (!Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4))) {
        ok(false, e.id + " draw " + i + ": cheap invariant failed");
      }
      if (q && q.figure && BAD.test(q.figure)) ok(false, e.id + " draw " + i + ": figure bad token");
      if (q && BAD.test(q.prompt || "")) ok(false, e.id + " draw " + i + ": prompt bad token");
    }
    if (q && q.prompt) seen.add(q.prompt.slice(0, 60));
  }
  tally[e.id] = seen.size;
  if (e.kind === "var" && !CRMARKS[e.id]) ok(seen.size >= 2, e.id + ": varset shows <2 distinct prompts in " + n + " draws (" + seen.size + ")");
});

/* Independent machinery checks */
(function () {
  // balancer: every pool reaction's returned coefficients truly balance
  const pools = [].concat(S6_REACTIONS_SD, S6_REACTIONS_CR, S6_CLASSIFY.map(x => ({ r: x.r, p: x.extra ? x.p.concat(x.extra) : x.p })));
  pools.forEach((rxn, i) => {
    const co = s6balance(rxn.r, rxn.p);
    ok(!!co, "balancer failed on pool reaction " + i + ": " + rxn.r.join("+"));
    if (!co) return;
    const tallyEl = {};
    const add = (sp, c, sgn) => { const m = S6_SPECIES[sp]; ok(!!m, "species missing from table: " + sp); if (!m) return; for (const el in m) tallyEl[el] = (tallyEl[el] || 0) + sgn * c * m[el]; };
    rxn.r.forEach((sp, j) => add(sp, co[j], 1));
    rxn.p.forEach((sp, j) => add(sp, co[rxn.r.length + j], -1));
    for (const el in tallyEl) ok(tallyEl[el] === 0, "pool reaction " + i + " (" + rxn.r.join("+") + ") unbalanced for " + el + ": net " + tallyEl[el]);
  });
  // formula writer: charge neutrality over the full ion grid
  const cats = S6_CATIONS.concat(S6_CATIONS_MULTI);
  const ans = S6_ANIONS.concat(S6_ANIONS_POLY);
  cats.concat([S6_NH4]).forEach(c => {
    ans.forEach(a => {
      const g = s6gcd(c.chg, a.chg);
      const pos = c.chg * (a.chg / g), neg = a.chg * (c.chg / g);
      ok(pos === neg, "formula charge imbalance " + c.sym + "/" + a.sym);
      const f = s6formula(c, a);
      ok(!BAD.test(f) && f.length > 0, "formula render bad for " + c.sym + "/" + a.sym);
    });
  });
  // sig fig helpers against Appendix A cases (written measurements, as strings)
  ok(s6countSF("25.0") === 3 && s6countSF("250") === 2 && s6countSF("0.00450") === 3 && s6countSF("3.060") === 4 && s6countSF("1200.") === 4 && s6countSF("0.0208") === 3, "s6countSF cases");
  ok(s6sf(2.5, 2) === "2.5" && s6sf(0.004567, 2) === "0.0046" && s6sf(1234, 2) === "1200", "s6sf cases");
})();

/* Targeted recomputation from _p */
BANK.forEach(e => {
  const N = 400;
  for (let i = 0; i < N; i++) {
    const q = e.gen();
    const p = q._p || {};
    try {
      if (e.id === "sci-u3-sigfigs-calc") ok(p.key === s6sf(p.a * p.b, p.sf), "sigfigs-calc mismatch " + JSON.stringify(p));
      if (e.id === "sci-u3-avgspeed") ok(Math.abs(parseFloat(p.key) - p.d / p.t) < 0.06 * (p.d / p.t) + 0.051, "avgspeed mismatch " + JSON.stringify(p));
      if (e.id === "sci-u3-dt-instant") ok(p.key === s6sf(p.a * p.t0, 2), "dt-instant mismatch " + JSON.stringify(p));
      if (e.id === "sci-u3-accel-calc") ok(Math.abs(parseFloat(p.key) - p.a) < 0.06 * p.a + 0.051, "accel-calc mismatch " + JSON.stringify(p));
      if (e.id === "sci-u4-pop-change" && p.end !== undefined) {
        const nums = (q.prompt.match(/\d[\d,]*/g) || []).map(s => parseInt(s.replace(/,/g, ""), 10));
        ok(nums.length >= 5 && (nums[0] + nums[1] - nums[2] + nums[3] - nums[4]) === p.end, "pop-change recompute failed: " + nums.join(",") + " vs " + p.end);
      }
    } catch (err) { ok(false, e.id + " targeted check threw: " + err.message); break; }
  }
});

/* Coverage tallies */
const perUnit = {}, perLevel = {}, indUse = {};
BANK.forEach(e => {
  perUnit[e.unit] = perUnit[e.unit] || { gen: 0, var: 0, cr: 0, L1: 0, L2: 0, L3: 0 };
  const u = perUnit[e.unit];
  if (CRMARKS[e.id]) u.cr++; else if (e.kind === "gen") u.gen++; else u.var++;
  u["L" + e.level]++;
  perLevel[e.level] = (perLevel[e.level] || 0) + 1;
  (e.indicators || []).forEach(c => { indUse[c] = (indUse[c] || 0) + 1; });
});
const cfgInd = Object.keys(window.__COURSE.indicators || {});
ok(cfgInd.length === 25, "config carries 25 Knowledge indicators, saw " + cfgInd.length);
cfgInd.forEach(c => ok((indUse[c] || 0) >= 1, "indicator never used by any entry: " + c));
BANK.forEach(e => (e.indicators || []).forEach(c => ok(cfgInd.includes(c), e.id + " uses indicator outside config: " + c)));
ok(new Set(BANK.map(e => e.id)).size === BANK.length, "duplicate entry ids");

/* Em dash scan */
["bank-helpers.js", "bank-u1.js", "bank-u2.js", "bank-u3.js", "bank-u4.js"].forEach(f => {
  const t = fs.readFileSync(ROOT + "/banks/sci-1206/" + f, "utf8");
  ok(!t.includes("—"), f + " contains an em dash");
});

console.log(JSON.stringify({ entries: BANK.length, perUnit, perLevel, distinctPrompts: tally }, null, 1));
if (fails.length) { console.log("FAIL (" + fails.length + "):"); fails.slice(0, 10).forEach(f => console.log(" - " + f)); fs.writeFileSync("/tmp/sci-fails.txt", fails.join("\n")); process.exit(1); }
console.log("VALIDATE sci-1206: PASS");
