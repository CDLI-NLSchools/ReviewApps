#!/usr/bin/env node
/* Gate 1 (load) for Biology 2201 (BOOK BANK + GENERATORS, Nov 12,
   2026): chassis helpers + courses.js + the assembled Biology 2201
   bank evaluate cleanly; the course is registered with listed:false
   until the listing flip; the config carries the 35 tested
   indicators (all Knowledge codes plus STSE 8.1-8.3 and 9.1-9.5);
   the presets are plain unit scopes with no caps (Jason's ruling:
   Biology 2201 has no Table of Specifications, so no invented
   level blueprint; mid = Units 1+2, final = Unit 3); the exam
   fallback composes selected-response only (the books contain no
   constructed response); BANK holds all 397 converted book MC
   questions plus 10 generator entries plus the 7 tranche-2
   labelling entries (numbered-diagram conversions of the 13
   labelling activities, which are 7 unique diagrams; each entry is
   checked as its own class against labels/label-spec.json); every
   fixed MC renders with
   the book's key (with the one sanctioned repair from
   bio2201-fixes.json applied) and its levels.json level; book
   figures are present exactly where the books carry media; and the
   shell's own poolFor produces the full unit pools, uncapped. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const BIO = "/home/hatch/workspace/goals/science-review-apps-for-physics-and-chemistry/hidden_files/bio2201-program";
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

global.window = {};
eval(fs.readFileSync(ROOT + "/courses.js", "utf8"));
ok(window.COURSES && window.COURSES["bio-2201"], "bio-2201 registered");
window.__COURSE = window.COURSES["bio-2201"];
ok(window.__COURSE.listed === true, "bio-2201 is listed on the picker (listed at completion, Nov 12, 2026)");

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
ok(!!helperBlock, "helpers block found in built shell");
eval(helperBlock.replace(/"use strict";/g, ""));
ok(typeof mcq === "function" && typeof textq === "function" && typeof varset === "function", "mcq/textq/varset defined");
ok(UNITS[1] === "Ecosystem Interactions and Population Dynamics" && UNITS[2] === "Processes that Sustain Life" && UNITS[3] === "Maintaining Dynamic Equilibrium", "UNITS read from the course config");
/* Pin update, November 22, 2026 (STSE registration): the remaining 12 STSE indicators (8.4 to 8.6, 9.6, 10.1 to 10.8) were registered for rich-task use with no bank entries; the registered count pin rises from 35 to 47. The 35 tested indicators are unchanged. No bank content was changed to fit this gate. */
ok(Object.keys(INDICATORS).length === 47, "INDICATORS has 47 codes (35 tested + 12 STSE registered November 22, 2026), saw " + Object.keys(INDICATORS).length);
ok(window.__COURSE.presets.mid.cap === undefined && window.__COURSE.presets.final.cap === undefined, "presets carry no caps (no Table of Specifications exists)");
ok(JSON.stringify(window.__COURSE.presets.mid.units) === "[1,2]" && JSON.stringify(window.__COURSE.presets.final.units) === "[3]", "preset scopes are mid = Units 1+2, final = Unit 3");
ok(window.__COURSE.exam.fallback.total === 40 && window.__COURSE.exam.fallback.srCount === 40 && window.__COURSE.exam.fallback.crMarks === 0, "exam fallback is 40 selected-response, no CR marks");
ok(window.__COURSE.unitTest.sr === 25 && window.__COURSE.unitTest.cr === 0, "unit test is 25 selected-response, no CR");

var BANK = [];
function E(id, unit, indicators, level, kind, gen, hints) {
  var e = { id, unit, indicators, level, kind, gen };
  if (hints) { e.hint1 = hints[0] || ""; e.hint2 = hints[1] || ""; }
  BANK.push(e);
}
eval(fs.readFileSync(ROOT + "/banks/bio-2201.js", "utf8"));

ok(BANK.length === 414, "BANK has 414 entries (397 book MC + 10 gen + 7 label), saw " + BANK.length);
const perUnit = { 1: 0, 2: 0, 3: 0 };
BANK.forEach(e => { perUnit[e.unit] = (perUnit[e.unit] || 0) + 1; });
ok(perUnit[1] === 92 && perUnit[2] === 109 && perUnit[3] === 213, "per-unit entries 92/109/213, saw " + perUnit[1] + "/" + perUnit[2] + "/" + perUnit[3]);
ok(new Set(BANK.map(e => e.id)).size === BANK.length, "entry ids are unique");
const CRMARKS = window.__BANK_CRMARKS || {};
/* Amendment, November 20, 2026: the course's strippable selected
   response entries were registered bimodal (347 entries, classes
   268 a / 79 b in window.__BANK_BIMODAL), creating the CR marks
   manifest this gate originally pinned as empty. Count verified
   against the assembled bank. */
ok(Object.keys(CRMARKS).length === 347, "CRMARKS holds the 347 bimodal registrations (was empty at the selected-response only launch), saw " + Object.keys(CRMARKS).length);
const BIMODAL2201 = window.__BANK_BIMODAL || {};
ok(Object.keys(BIMODAL2201).length === 347, "BIMODAL holds 347 registrations, saw " + Object.keys(BIMODAL2201).length);

/* The one sanctioned key repair (bio2201-fixes.json): the
   duplicated word in u1mid question 74's keyed option. */
const KEY_FIXES = {
  "u1mid:74": "Country X utilizes advanced farming methods",
  /* u1mid:70's key lists organism/relationship pairings separated
     by unspaced em dashes in the book ("Tick—parasitism; ...");
     the converter's dash rule renders them with colons. */
  "u1mid:70": "Tick: parasitism; bee: mutualism; bird: commensalism"
};
const full = JSON.parse(fs.readFileSync(BIO + "/bio2201-full.json", "utf8"));
const levels = JSON.parse(fs.readFileSync(BIO + "/bio2201-levels.json", "utf8"));
ok(full.questions.length === 397, "extraction holds 397 questions, saw " + full.questions.length);
const byStem = new Map();
for (const q of full.questions) {
  let key = (q.answers.find(a => a.correct) || {}).text;
  if (KEY_FIXES[q.book + ":" + q.n_in_book]) key = KEY_FIXES[q.book + ":" + q.n_in_book];
  byStem.set(q.stem, { key, level: (levels[q.book + ":" + q.n_in_book] || {}).level, media: !!q.media });
}
ok(byStem.size === 397, "all 397 book stems are unique, saw " + byStem.size);

let fixedSeen = 0, genSeen = 0, figuredFixed = 0, labelSeen = 0;
const labelSpec = JSON.parse(fs.readFileSync(BIO + "/labels/label-spec.json", "utf8"));
const labelById = {};
labelSpec.items.forEach(it => { labelById[it.id] = it; });
for (const e of BANK) {
  if (e.id.startsWith("bio-lb-")) {
    labelSeen++;
    const spec = labelById[e.id];
    ok(!!spec, e.id + " has a label-spec entry");
    if (spec) {
      ok(e.unit === 3 && e.level === spec.level, e.id + " is a Unit 3 entry at its spec level");
      ok(JSON.stringify(e.indicators) === JSON.stringify(spec.codes), e.id + " carries its spec indicator codes");
      ok(e.gen.variantCount === spec.labels.length, e.id + " variant count matches its diagram's labels (" + spec.labels.length + ")");
      ok(typeof e.hint1 === "string" && e.hint1 === spec.hint, e.id + " carries its diagram hint");
      const seenKeys = new Set();
      for (let draw = 0; draw < 80; draw++) {
        const q = e.gen();
        ok(q && q.type === "mc", e.id + " label draw renders mc");
        if (!q) break;
        ok(Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4, e.id + " label draw has 4 distinct options");
        const key = q.options[q.correct];
        const lab = spec.labels.find(l => l.text === key);
        ok(!!lab, e.id + " label key is one of the diagram's labels");
        ok(q.options.every(o => spec.labels.some(l => l.text === o)), e.id + " label options all come from the same diagram");
        if (lab) ok(q.prompt === spec.prompt.replace("{n}", String(lab.n)), e.id + " label prompt names the key's number");
        ok(typeof q.solution === "string" && q.solution.length > 20, e.id + " label solution non-empty");
        ok(q.solution.indexOf("\u2014") < 0 && q.prompt.indexOf("\u2014") < 0, e.id + " label text carries no em dash");
        ok(!!q.figure, e.id + " label draw carries its numbered figure");
        if (q.figure) {
          const m = q.figure.match(/src="([^"]+)"/);
          ok(!!m && fs.existsSync(ROOT + "/" + m[1]), e.id + " label figure asset exists on disk");
        }
        seenKeys.add(key);
      }
      ok(seenKeys.size === spec.labels.length, e.id + " draws reach every label on the diagram, saw " + seenKeys.size + "/" + spec.labels.length);
    }
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
  /* The Unit 3 books tagged solution options with their book
     letters; the converter strips them (749 tags). No fixed entry
     may walk through options by letter. */
  ok(!/\(Option [A-D]\)|\bOption [A-D]\b/.test(q.solution), e.id + " solution carries no book-letter walkthrough");
  if (e.id === "bio-u1-54-q10") ok(q.options.includes("(b + i) is greater than (d + e)"), "bio-u1-54-q10 carries the repaired fourth option (the book prints one distractor twice; bio2201-fixes.json)");
  const exp = byStem.get(q.prompt);
  ok(!!exp, e.id + " prompt matches a book stem");
  if (exp) {
    ok(q.options[q.correct] === exp.key, e.id + " key matches the book (with sanctioned repairs), saw " + JSON.stringify(q.options[q.correct]));
    ok(e.level === exp.level, e.id + " level matches levels.json (" + exp.level + "), saw " + e.level);
    ok(!!q.figure === exp.media, e.id + " figure presence matches its book media");
  }
  if (q.figure) {
    figuredFixed++;
    const m = q.figure.match(/src="([^"]+)"/);
    ok(!!m, e.id + " figure carries an img src");
    if (m) ok(fs.existsSync(ROOT + "/" + m[1]), e.id + " figure asset exists on disk: " + m[1]);
  }
}
ok(fixedSeen === 397, "397 fixed MC entries, saw " + fixedSeen);
ok(genSeen === 10, "10 generator entries, saw " + genSeen);
ok(labelSeen === 7, "7 labelling entries, saw " + labelSeen);
ok(figuredFixed === 30, "30 figured fixed entries, saw " + figuredFixed);

/* Scope behaviour, proven with the shell's own poolFor/scopeCap:
   no caps anywhere, so the preset pools are the full unit pools. */
const scopeBlock = blocks.find(b => b.includes("function poolFor"));
ok(!!scopeBlock, "poolFor block found in built shell");
eval(scopeBlock.match(/function poolFor[\s\S]*?\n\}/)[0]);
eval(scopeBlock.match(/function scopeCap[\s\S]*?\n\}/)[0]);
ok(scopeCap([1, 2]) === false, "scopeCap leaves the mid units uncapped");
ok(scopeCap([3]) === false, "scopeCap leaves the final unit uncapped");
ok(poolFor([1, 2], [], false).length === 201, "mid pool holds 201 entries, saw " + poolFor([1, 2], [], false).length);
ok(poolFor([3], [], false).length === 213, "final pool holds 213 entries (206 book/gen + 7 label), saw " + poolFor([3], [], false).length);
ok(poolFor([1], [], false).length === 92 && poolFor([2], [], false).length === 109, "single-unit pools hold 92 and 109 entries");

const lv = { 1: 0, 2: 0, 3: 0 };
BANK.forEach(e => { lv[e.level] = (lv[e.level] || 0) + 1; });
console.log("entries: " + BANK.length + "; fixed MC: " + fixedSeen + "; gen: " + genSeen + "; label: " + labelSeen + "; levels L1/L2/L3: " + lv[1] + "/" + lv[2] + "/" + lv[3]);
console.log(fails.length ? "GATE-LOAD-BIO-2201 FAIL: " + fails.slice(0, 12).join(" | ") + (fails.length > 12 ? " (+" + (fails.length - 12) + " more)" : "") : "GATE-LOAD-BIO-2201 PASS");
process.exit(fails.length ? 1 : 0);
