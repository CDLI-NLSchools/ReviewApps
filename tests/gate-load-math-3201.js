#!/usr/bin/env node
/* Gate 1 (load) for Math 3201: chassis helpers + courses.js + the
   assembled Math 3201 bank module evaluate cleanly; BANK has 249
   entries (the standalone app's count, per unit 28/18/21/22/23/20/
   24/29/27; Unit 8 gained the grid-pathway CR entries u8-pathways and
   u8-pathways-context on Nov 13, 2026, split across Levels 2 and 3 by
   ruling 49, and the reverse-counting entry u8-reverse-count later the
   same day; Unit 9 gained the three binomial enrichment entries
   u9-binomial-prob, u9-binomial-expected and u9-binomial-identify
   later the same day under Jason's enrichment ruling, build step 8
   of the Pure Math scan; the default practice pool, taken through
   the shell's own poolFor with no enrichment state set, is still
   the pre-enrichment 209, asserted below); window.__BANK_CRMARKS has 177 keys (the standalone bank
   source's own CR_MARKS map, carried as manifest comments; the
   cr_tags.json sidecar agrees with it but the bank source is the
   authority); every
   registered indicator has entries and no entry uses an unregistered
   code; every entry generates a prompt in this shell and every
   multiple choice generation has exactly four options. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["math-3201"], "math-3201 registered");
window.__COURSE = window.COURSES["math-3201"];
ok(window.__COURSE.listed === true, "math-3201 is listed (in the picker since Nov 12, 2026)");
ok(window.__COURSE.subject === "Mathematics" && window.__COURSE.grade === 12, "picker metadata: Mathematics, grade 12");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof numq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/numq/textq/varset defined");
ok(window.__COURSE && UNITS[1] === "Rational Expressions and Equations" && UNITS[9] === "Probability", "UNITS read from the course config");
ok(Object.keys(UNITS).length === 9, "UNITS has 9 units, saw " + Object.keys(UNITS).length);
ok(Object.keys(INDICATORS).length === 100, "INDICATORS has 100 codes, saw " + Object.keys(INDICATORS).length);

var BANK = [];
function E(id, unit, indicators, level, kind, gen) { BANK.push({ id, unit, indicators, level, kind, gen }); }
eval(fs.readFileSync(ROOT + "/banks/math-3201.js", "utf8"));

ok(BANK.length === 249, "BANK has 249 entries, saw " + BANK.length);
const crKeys = Object.keys(window.__BANK_CRMARKS || {});
ok(crKeys.length === 177, "__BANK_CRMARKS has 177 keys, saw " + crKeys.length);
const bankIds = new Set(BANK.map(e => e.id));
ok(crKeys.every(k => bankIds.has(k)), "every CR key is a bank entry id");
ok(bankIds.size === BANK.length, "entry ids are unique");

const census = {}, perUnit = {};
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; e.indicators.forEach(c => { census[c] = (census[c] || 0) + 1; }); });
const wantPerUnit = { 1: 34, 2: 23, 3: 26, 4: 26, 5: 27, 6: 25, 7: 26, 8: 32, 9: 30 };
ok(JSON.stringify(perUnit) === JSON.stringify(wantPerUnit), "per-unit counts (34/23/26/26/27/25/26/32/30) after the PK tranche of November 16, 2026 added 37 borrowed entries across all nine units (Unit 9 at 30: 27 plus 3 borrowed; its 3 flagged seed entries were already in the bank), saw " + JSON.stringify(perUnit));

/* Enrichment (Nov 13, 2026, Jason's ruling): content beyond the
   named indicators is flagged enrich on the entry and stays out
   of default pools. Step 8 of the Pure Math scan's build order
   (the binomial distribution, Unit 9) is flagged content here.
   The default-pool assertions use the shell's own poolFor,
   extracted the way gate-compose extracts it; no enrichment
   state exists in this harness, so the flagged entries must be
   out and the pool must be the pre-enrichment 209. */
const enrich = BANK.filter(e => e.enrich).map(e => e.id).sort();
ok(JSON.stringify(enrich) === JSON.stringify(["u9-binomial-expected", "u9-binomial-identify", "u9-binomial-prob"]),
   "enrich flags land on the three Unit 9 binomial entries, saw " + enrich.join(", "));
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
eval(extractFn(html, "poolFor"));
const defPool = poolFor([1, 2, 3, 4, 5, 6, 7, 8, 9], []);
ok(defPool.length === 246, "default practice pool has 246 entries (bank 249 minus the 3 enrichment entries), saw " + defPool.length);
ok(!defPool.some(e => e.enrich), "default practice pool holds no enrichment entry");
ok(poolFor([9], []).length === 27, "default Unit 9 pool has 27 entries (30 in the bank minus the 3 enrichment entries), saw " + poolFor([9], []).length);
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
console.log(fails.length ? "GATE-LOAD-MATH-3201 FAIL: " + fails.join(" | ") : "GATE-LOAD-MATH-3201 PASS");
process.exit(fails.length ? 1 : 0);
