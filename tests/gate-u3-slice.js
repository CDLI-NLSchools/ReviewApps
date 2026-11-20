#!/usr/bin/env node
/* Slice check for Biology 3201 Unit 3 (Nov 12, 2026), in the pilot
   gate's style: eval the chassis helpers from index.html, stub E,
   load banks/bio-3201/bank-u3.js directly, and prove against the
   source extraction (bio3201-full.json) and the authoritative level
   tags (bio3201-levels.json) that all 82 entries render with exactly
   4 options, the rendered correct option text equals the book's key
   for every entry, hints and solutions are present, every media
   question carries its figure with the asset on disk, and the
   cytochrome c question (bio-u3-73-q07, book u3fin:29) carries the
   table figure with 12 in the Species A / Species D cell.
   Amendment, November 20, 2026 (later): four native constructed
   response entries were authored at the end of bank-u3.js for the
   final scope (bio-u3-71-cr1, bio-u3-75-cr1, bio-u3-77-cr1,
   bio-u3-78-cr1). They are not book conversions, so the book
   fidelity sweep below covers the first 82 entries exactly as
   before; the authored four are checked separately at the end of
   this gate (text renders carrying a model answer and marking
   points). The bank source now holds 86 entries. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const BIO = "/home/hatch/workspace/goals/science-review-apps-for-physics-and-chemistry/hidden_files/bio-program";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
window.__COURSE = window.COURSES["bio-3201"];

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof varset === "function", "mcq/varset defined");

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/bio-3201/bank-u3.js", "utf8"));

const full = JSON.parse(fs.readFileSync(BIO + "/bio3201-full.json", "utf8"));
const levels = JSON.parse(fs.readFileSync(BIO + "/bio3201-levels.json", "utf8"));
const qs = full.questions.filter(q => q.book === "u3fin").sort((a, b) => a.n_in_book - b.n_in_book);
ok(qs.length === 82, "source has 82 u3fin questions, saw " + qs.length);
ok(BANK.length === 86, "BANK has 86 entries (82 book + 4 authored CR), saw " + BANK.length);
ok(new Set(BANK.map(e => e.id)).size === BANK.length, "entry ids are unique");

const SHARED = { "7.3": ["7.3", "7.4"], "7.6": ["7.6", "7.7"] };
const fixEm = s => s.replace(/ \u2014 /g, ", ").replace(/\u2014/g, ", ").replace(/\s+/g, " ").trim();
let figured = 0;

BANK.slice(0, 82).forEach((e, i) => {
  const q = qs[i];
  const wantCodes = SHARED[q.codes[0]] || q.codes;
  ok(e.unit === 3, e.id + " is Unit 3");
  ok(JSON.stringify(e.indicators) === JSON.stringify(wantCodes), e.id + " indicators are " + JSON.stringify(wantCodes) + ", saw " + JSON.stringify(e.indicators));
  ok(e.level === levels["u3fin:" + q.n_in_book].level, e.id + " level matches the authoritative tag");
  ok(typeof e.hint1 === "string" && e.hint1 === fixEm(q.panels.Hint), e.id + " hint1 is the book's Hint panel (em dashes fixed)");
  ok(e.hint1.indexOf("\u2014") < 0, e.id + " hint carries no em dash");
  const key = q.answers.find(a => a.correct).text;
  for (let draw = 0; draw < 3; draw++) {
    const r = e.gen();
    ok(r && r.type === "mc", e.id + " renders an mc question (draw " + draw + ")");
    if (!r) break;
    ok(r.prompt === q.stem, e.id + " prompt is the book stem verbatim");
    ok(Array.isArray(r.options) && r.options.length === 4, e.id + " has exactly 4 options, saw " + (r.options || []).length);
    ok(Number.isInteger(r.correct) && r.correct >= 0 && r.correct < 4, e.id + " correct index in range");
    if (Array.isArray(r.options) && r.options[r.correct] !== undefined)
      ok(r.options[r.correct] === key, e.id + " rendered correct option equals the book's key");
    ok(typeof r.solution === "string" && r.solution.length > 20, e.id + " carries a worked solution");
    ok(r.solution === fixEm(q.panels.Solution) || q.n_in_book === 80, e.id + " solution is the book's Solution panel (em dashes fixed)");
    ok(r.solution.indexOf("\u2014") < 0, e.id + " solution carries no em dash");
    if (q.media) {
      figured++;
      const m = /src="(banks\/bio-3201\/assets\/[^"]+)"/.exec(r.figure || "");
      ok(!!m, e.id + " carries its figure <img>");
      if (m) ok(fs.existsSync(ROOT + "/" + m[1]), e.id + " figure asset exists on disk: " + m[1]);
    } else if (q.n_in_book === 29) {
      ok(typeof r.figure === "string" && r.figure.startsWith("<table>"), e.id + " carries the table figure");
      ok(r.figure.includes("Number of Amino Acid Differences in Cytochrome c"), e.id + " table carries its title");
      const aRow = /<tr><th>Species A<\/th>(.*?)<\/tr>/.exec(r.figure || "");
      ok(!!aRow && aRow[1].endsWith("<td>12</td>"), e.id + " Species A row ends with 12 (the Species D cell)");
    } else {
      ok(!r.figure, e.id + " carries no figure (its book question has none)");
    }
  }
});

/* Authored native CR entries (Nov 20, 2026 amendment): not book
   conversions; each must render as a text question whose solution
   carries a model answer and marking points, on every draw. */
const AUTHORED_CR = ["bio-u3-71-cr1", "bio-u3-75-cr1", "bio-u3-77-cr1", "bio-u3-78-cr1"];
AUTHORED_CR.forEach(id => {
  const e = BANK.find(x => x.id === id);
  ok(!!e, "authored entry " + id + " is present in the bank source");
  if (!e) return;
  for (let draw = 0; draw < 3; draw++) {
    const r = e.gen();
    ok(r && r.type === "text", id + " renders a text (CR) question (draw " + draw + ")");
    if (!r) break;
    ok(typeof r.solution === "string" && r.solution.includes("Model answer"), id + " solution carries the model answer");
    ok(typeof r.solution === "string" && r.solution.includes("Marking points"), id + " solution carries marking points");
    ok(Array.isArray(r.answers) && r.answers.length > 0, id + " carries accepted answer forms");
  }
});

const n80 = BANK[qs.findIndex(q => q.n_in_book === 80)];
const s80 = n80.gen().solution;
ok(!/options? [a-d]\b/.test(s80) && s80.includes("Chondrichthyes"), "bio-u3-710-q08 solution names option content, no option letters");

console.log("entries: " + BANK.length + " (Unit 3, indicators 7.1-7.10; 82 book + 4 authored CR); figured draws checked: " + figured);
console.log(fails.length ? "GATE-U3-SLICE FAIL: " + fails.slice(0, 12).join(" | ") + (fails.length > 12 ? " | ... +" + (fails.length - 12) + " more" : "") : "GATE-U3-SLICE PASS");
process.exit(fails.length ? 1 : 0);
