#!/usr/bin/env node
/* Gate 1 (load) for Biology 3201 (FULL BANK + GENERATORS, Nov 12,
   2026): chassis helpers + courses.js + the assembled Biology 3201
   bank evaluate cleanly; the course is registered with listed:false
   until the listing flip; the config carries 40 tested indicators
   and both preset caps (mid cap stops Unit 2 at 6.4, final cap
   starts Unit 2 at 6.5, Jason's ruling); BANK holds all 307
   converted MC questions, the 5 book CR prompts and 22 generator
   entries; every fixed MC renders with the book's key (with the
   sanctioned repairs from bio3201-fixes.json applied) and its
   levels.json level; the flag sets are exact (45 postMid, 70
   preFinal); and the shell's own poolFor + scopeCap, extracted from
   index.html, produce the right pools for both capped scopes.
   Amendment, November 20, 2026 (later): four native constructed
   response entries were authored into Unit 3 for the final scope
   (bio-u3-71-cr1, bio-u3-75-cr1, bio-u3-77-cr1, bio-u3-78-cr1;
   denominations 3, 3, 4, 2), in the pattern of the five book CR
   entries. The bank now holds 338 entries (307 converted MC, 9 CR,
   22 gen), Unit 3 holds 89 entries, the CR marks manifest holds
   270 keys (9 native + 261 bimodal), and the final pool holds 134.
   Figures verified against the assembled bank.
   Amendment, November 20, 2026 (Unit 2 molecular): three native
   constructed response entries were authored into Unit 2's molecular
   half (bio-u2-66-cr1, bio-u2-67-cr1, bio-u2-68-cr1; denominations
   2, 3, 2), closing the final scope's Unit 2 part, whose only native
   entries were the classical-half pair the final cap holds out. The
   bank now holds 341 entries (307 converted MC, 12 CR, 22 gen),
   Unit 2 holds 118 entries, the CR marks manifest holds 273 keys
   (12 native + 261 bimodal), the postMid flag set holds 48 (the
   authored three are flagged, holding them out of the mid scope),
   and the final pool holds 137. Figures verified against the
   assembled bank. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const BIO = "/home/hatch/workspace/goals/science-review-apps-for-physics-and-chemistry/hidden_files/bio-program";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["bio-3201"], "bio-3201 registered");
window.__COURSE = window.COURSES["bio-3201"];
ok(window.__COURSE.listed === true, "bio-3201 is listed on the picker (listed at completion, Nov 12, 2026)");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/textq/varset defined");
ok(UNITS[1] === "Cell Reproduction and the Continuity of Life" && UNITS[2] === "Genetic Basis of Heredity" && UNITS[3] === "Evolutionary Change and Biodiversity", "UNITS read from the course config");
/* Pin update, November 22, 2026 (STSE registration): the remaining 13 STSE indicators (8.9, 9.3 to 9.8, 10.1 to 10.6) were registered for rich-task use with no bank entries; the registered count pin rises from 40 to 53. The 40 tested indicators are unchanged. No bank content was changed to fit this gate. */
ok(Object.keys(INDICATORS).length === 53, "INDICATORS has 53 codes (40 tested + 13 STSE registered November 22, 2026), saw " + Object.keys(INDICATORS).length);
ok(window.__COURSE.exam.mid.total === 60 && window.__COURSE.exam.mid.srCount === 48 && window.__COURSE.exam.mid.crMarks === 12, "mid blueprint is 60 = SR 48 + CR 12");
ok(window.__COURSE.presets.mid.cap === true, "mid preset carries the 6.4 cap");
ok(window.__COURSE.presets.final.cap === true, "final preset carries the 6.5 cap (Jason's ruling)");

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/bio-3201.js", "utf8"));

ok(BANK.length === 341, "BANK has 341 entries (307 MC + 12 CR + 22 gen), saw " + BANK.length);
const perUnit = { 1: 0, 2: 0, 3: 0 };
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
ok(perUnit[1] === 134 && perUnit[2] === 118 && perUnit[3] === 89, "per-unit entries 134/118/89, saw " + perUnit[1] + "/" + perUnit[2] + "/" + perUnit[3]);
ok(new Set(BANK.map(e => e.id)).size === BANK.length, "entry ids are unique");

const CRMARKS = window.__BANK_CRMARKS || {};
const EXPECT_CR = { "bio-u1-cr-q01": 4, "bio-u1-cr-q02": 4, "bio-u1-cr-q03": 3, "bio-u2-62-cr1": 4, "bio-u2-64-cr2": 4, "bio-u2-66-cr1": 2, "bio-u2-67-cr1": 3, "bio-u2-68-cr1": 2, "bio-u3-71-cr1": 3, "bio-u3-75-cr1": 3, "bio-u3-77-cr1": 4, "bio-u3-78-cr1": 2 };
Object.keys(EXPECT_CR).forEach(k => ok(CRMARKS[k] === EXPECT_CR[k], "CRMARKS " + k + " = " + EXPECT_CR[k] + ", saw " + CRMARKS[k]));
/* Amendment, November 20, 2026: the course's 261 strippable selected
   response entries were registered bimodal, so the CR marks manifest
   grows from the 5 book entries to 266 keys: the 5 above plus exactly
   the BIMODAL map's keys (209 class a, 52 class b). Counts verified
   against the assembled bank. */
const BIMODAL3201 = window.__BANK_BIMODAL || {};
ok(Object.keys(BIMODAL3201).length === 261, "BIMODAL holds 261 registrations, saw " + Object.keys(BIMODAL3201).length);
/* Amendment, November 20, 2026 (later): the four authored Unit 3
   native CR entries above (bio-u3-71-cr1, bio-u3-75-cr1,
   bio-u3-77-cr1, bio-u3-78-cr1) join EXPECT_CR, so the manifest
   holds 270 keys: the 9 native entries plus the 261 bimodal
   registrations. */
/* Amendment, November 20, 2026 (Unit 2 molecular): the three
   authored Unit 2 molecular native CR entries (bio-u2-66-cr1,
   bio-u2-67-cr1, bio-u2-68-cr1) join EXPECT_CR, so the manifest
   holds 273 keys: the 12 native entries plus the 261 bimodal
   registrations. */
ok(Object.keys(CRMARKS).length === 273, "CRMARKS holds 273 keys (12 native CR + 261 bimodal), saw " + Object.keys(CRMARKS).length);
ok(Object.keys(BIMODAL3201).every(k => CRMARKS[k] >= 2), "every bimodal entry carries CR marks of 2 or more");
ok(Object.keys(CRMARKS).every(k => EXPECT_CR[k] !== undefined || BIMODAL3201[k] !== undefined), "every CRMARKS key is a native CR entry or a bimodal registration");

/* Sanctioned key repairs (bio3201-fixes.json): the defective
   silent-mutation key, the two tidied Unit 1 keys, and the
   Archea spelling correction. */
const KEY_FIXES = {
  "u1mid:8": "lined up on the metaphase plate (center of the cell)",
  "u1mid:13": "Animal cells form a cleavage furrow; Plant cells form a cell plate",
  "u2fin:31": "AAG AGA CCC",
  "u3fin:67": "Archaea"
};
const full = JSON.parse(fs.readFileSync(BIO + "/bio3201-full.json", "utf8"));
const levels = JSON.parse(fs.readFileSync(BIO + "/bio3201-levels.json", "utf8"));
const byStem = new Map();
for (const q of full.questions) {
  let key = (q.answers.find(a => a.correct) || {}).text;
  if (KEY_FIXES[q.book + ":" + q.n_in_book]) key = KEY_FIXES[q.book + ":" + q.n_in_book];
  byStem.set(q.stem, { key, level: (levels[q.book + ":" + q.n_in_book] || {}).level, media: !!q.media });
}

const CLASSICAL = ["6.1", "6.2", "6.3", "6.4", "9.1", "9.2"];
let fixedSeen = 0, genSeen = 0, figuredFixed = 0, postMid = 0;
const flaggedPre = new Set(), expectedPre = new Set();
for (const e of BANK) {
  if (e.postMid) postMid++;
  if (e.unit === 2 && e.indicators.some(c => CLASSICAL.includes(c))) expectedPre.add(e.id);
  if (e.preFinal) flaggedPre.add(e.id);
  const isCR = Object.prototype.hasOwnProperty.call(EXPECT_CR, e.id);
  if (isCR) {
    const q = e.gen();
    ok(q && q.type === "text", e.id + " renders as a text (CR) question");
    ok(q && typeof q.solution === "string" && q.solution.includes("Model answer"), e.id + " CR solution carries the model answer");
    continue;
  }
  if (e.kind === "gen") {
    genSeen++;
    for (let draw = 0; draw < 5; draw++) {
      const q = e.gen();
      ok(q && q.type === "mc", e.id + " gen draw renders mc");
      if (!q) break;
      ok(Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4, e.id + " gen draw has 4 distinct options");
      ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, e.id + " gen correct index in range");
      ok(typeof q.solution === "string" && q.solution.length > 20, e.id + " gen solution non-empty");
      ok(q.solution.indexOf("\u2014") < 0 && q.prompt.indexOf("\u2014") < 0, e.id + " gen text carries no em dash");
      if (e.id.startsWith("bio-u2-64-gen")) ok(typeof q.figure === "string" && q.figure.includes("<svg"), e.id + " pedigree draw carries its SVG figure");
      if (e.id === "bio-gen-67-aa" || e.id === "bio-gen-68-aa") ok(typeof q.figure === "string" && q.figure.includes("u2-67-q07.jpg"), e.id + " carries the codon-table figure");
    }
    continue;
  }
  fixedSeen++;
  const q = e.gen();
  ok(q && q.type === "mc", e.id + " renders an mc question");
  if (!q) continue;
  ok(Array.isArray(q.options) && q.options.length === 4, e.id + " has exactly 4 options");
  ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, e.id + " correct index in range");
  ok(typeof e.hint1 === "string" && e.hint1.length > 5, e.id + " carries its book Hint panel");
  ok(typeof q.solution === "string" && q.solution.length > 20, e.id + " carries a worked solution");
  ok(q.solution.indexOf("\u2014") < 0 && q.prompt.indexOf("\u2014") < 0, e.id + " carries no em dash (house style)");
  const exp = byStem.get(q.prompt);
  ok(!!exp, e.id + " prompt matches a book stem");
  if (exp) {
    ok(q.options[q.correct] === exp.key, e.id + " key matches the book (with sanctioned repairs), saw " + JSON.stringify(q.options[q.correct]));
    ok(e.level === exp.level, e.id + " level matches levels.json (" + exp.level + "), saw " + e.level);
    ok(!!q.figure === (exp.media || e.id === "bio-u3-73-q07"), e.id + " figure presence matches its book media");
  }
  if (q.figure) {
    figuredFixed++;
    const m = q.figure.match(/src="([^"]+)"/);
    if (m) ok(fs.existsSync(ROOT + "/" + m[1]), e.id + " figure asset exists on disk: " + m[1]);
    if (e.id === "bio-u3-73-q07") ok(q.figure.includes("12"), "cytochrome table figure carries the A-D value 12");
  }
}
ok(fixedSeen === 307, "307 fixed MC entries, saw " + fixedSeen);
ok(genSeen === 22, "22 generator entries, saw " + genSeen);
ok(figuredFixed === 45, "45 figured fixed entries (44 media + the cytochrome table), saw " + figuredFixed);
ok(postMid === 48, "48 postMid entries (37 fixed + 3 authored CR + 8 sequence generators), saw " + postMid);
ok(expectedPre.size === 70, "70 entries sit in the classical rule set, saw " + expectedPre.size);
ok(flaggedPre.size === expectedPre.size && [...expectedPre].every(id => flaggedPre.has(id)), "preFinal flags match the classical rule set exactly");

/* Scope behaviour, proven with the shell's own poolFor/scopeCap. */
const scopeBlock = blocks.find(b => b.includes("function poolFor"));
ok(!!scopeBlock, "poolFor block found in built shell");
eval(scopeBlock.match(/function poolFor[\s\S]*?\n\}/)[0]);
eval(scopeBlock.match(/function scopeCap[\s\S]*?\n\}/)[0]);
ok(scopeCap([1, 2]) === true, "scopeCap resolves the mid units to the mid cap");
ok(scopeCap([2, 3]) === "final", "scopeCap resolves the final units to the final cap");
ok(scopeCap([1]) === false && scopeCap([2]) === false, "scopeCap leaves single-unit selections uncapped");
const finalPool = poolFor([2, 3], [], "final");
ok(finalPool.length === 137, "final pool holds 137 entries, saw " + finalPool.length);
ok(finalPool.every(e => !(e.unit === 2 && e.indicators.some(c => CLASSICAL.includes(c)))), "final pool contains no classical-half Unit 2 entry");
ok(BANK.filter(e => e.unit === 2 && e.indicators.some(c => ["6.5", "6.6", "6.7", "6.8", "6.9", "6.10"].includes(c))).every(e => finalPool.includes(e)), "final pool contains every molecular Unit 2 entry");
const midPool = poolFor([1, 2], [], true);
ok(midPool.length === 204, "mid pool holds 204 entries, saw " + midPool.length);
ok(midPool.every(e => !e.postMid), "mid pool contains no postMid entry");
ok(poolFor([2, 3], [], false).filter(e => e.preFinal).length === 70, "uncapped final pool contains all 70 classical entries (the flag does the work)");

console.log("entries: " + BANK.length + "; fixed MC: " + fixedSeen + "; gen: " + genSeen + "; CR keys: " + Object.keys(CRMARKS).length + "; postMid: " + postMid + "; preFinal: " + flaggedPre.size);
console.log(fails.length ? "GATE-LOAD-BIO-3201 FAIL: " + fails.slice(0, 12).join(" | ") + (fails.length > 12 ? " (+" + (fails.length - 12) + " more)" : "") : "GATE-LOAD-BIO-3201 PASS");
process.exit(fails.length ? 1 : 0);
