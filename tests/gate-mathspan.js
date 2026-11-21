#!/usr/bin/env node
/* Gate: no HTML tag inside a TeX math span (November 21, 2026).
   The shell typesets question text with KaTeX auto-render, which
   scans text nodes for complete \(...\) and \[...\] pairs. An HTML
   tag inside a span (a bold tag around the restated answer was the
   lived case, in Math 3200 Unit 3) splits the text node at the tag,
   the pair never completes, and the span reaches the student as raw
   TeX. This gate loads every bank, deals DEALS instances of every
   entry (generators and varset variants alike, under a seeded
   random source so the run is reproducible), and fails any dealt
   prompt, option, solution, accepted answer or answer text whose
   final string carries a tag (a "<" followed by a letter or "/")
   inside a \(...\) or \[...\] span.
   Run: node tests/gate-mathspan.js */
const fs = require("fs");
const vm = require("vm");
const ROOT = "/home/hatch/workspace/review-app-unified";
const DEALS = 40;

const html = fs.readFileSync(ROOT + "/index.html", "utf8");
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const helperBlock = blocks.find(b => b.includes("function mcq"));
const coursesSrc = fs.readFileSync(ROOT + "/courses.js", "utf8");
global.window = {};
eval(coursesSrc);
const COURSE_IDS = Object.keys(window.COURSES);

function loadCourse(id) {
  const sb = { console };
  sb.window = {};
  vm.createContext(sb);
  vm.runInContext(coursesSrc, sb);
  sb.window.__COURSE = sb.window.COURSES[id];
  vm.runInContext(helperBlock, sb);
  vm.runInContext('var BANK=[]; function E(id,unit,indicators,level,kind,gen){BANK.push({id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen});}', sb);
  vm.runInContext("Math.random=(function(){var s=987654321;return function(){s=(s*1103515245+12345)&0x7fffffff;return s/0x80000000;};})();", sb);
  vm.runInContext(fs.readFileSync(ROOT + "/banks/" + sb.window.COURSES[id].bankFile, "utf8"), sb);
  return sb;
}

/* First tag inside a math span in the final string, or null. */
function tagInMath(s) {
  if (typeof s !== "string") return null;
  let i = 0;
  while (i < s.length) {
    const a = s.indexOf("\\(", i), b = s.indexOf("\\[", i);
    if (a < 0 && b < 0) return null;
    let oi, ci;
    if (b < 0 || (a >= 0 && a < b)) { oi = a; ci = "\\)"; } else { oi = b; ci = "\\]"; }
    const end = s.indexOf(ci, oi + 2);
    const span = end < 0 ? s.slice(oi + 2) : s.slice(oi + 2, end);
    const m = /<[a-zA-Z\/]/.exec(span);
    if (m) return s.slice(Math.max(0, oi - 12), oi + 2 + Math.min(span.length, m.index + 14));
    if (end < 0) return null;
    i = end + 2;
  }
  return null;
}

function fieldsOf(q) {
  const out = [];
  if (!q) return out;
  if (q.prompt) out.push(["prompt", q.prompt]);
  if (Array.isArray(q.options)) q.options.forEach((o, j) => out.push(["option " + j, o]));
  if (q.solution) out.push(["solution", q.solution]);
  if (Array.isArray(q.answers)) q.answers.forEach((o, j) => out.push(["answer " + j, o]));
  if (q.answerText) out.push(["answerText", q.answerText]);
  return out;
}

const catches = [];
let totalEntries = 0, totalDeals = 0, genThrows = 0;
for (const id of COURSE_IDS) {
  const cfg = window.COURSES[id];
  if (!cfg.bankFile || !fs.existsSync(ROOT + "/banks/" + cfg.bankFile)) continue;
  let sb;
  try { sb = loadCourse(id); } catch (err) { catches.push({ course: id, id: "(load)", field: "load", snippet: String(err && err.message || err) }); continue; }
  const BANK = sb.BANK;
  totalEntries += BANK.length;
  for (const e of BANK) {
    for (let d = 0; d < DEALS; d++) {
      let q;
      try { q = e.gen(); } catch (err) { genThrows++; break; }
      totalDeals++;
      let hit = null;
      for (const [field, text] of fieldsOf(q)) {
        const snip = tagInMath(text);
        if (snip) { hit = { course: id, id: e.id, field, snippet: snip.replace(/\s+/g, " ") }; break; }
      }
      if (hit) { catches.push(hit); break; }
    }
  }
}

console.log("gate-mathspan: scanned " + totalEntries + " entries across " + COURSE_IDS.length + " courses, " + totalDeals + " deals (" + DEALS + " per entry max), " + genThrows + " generator throws");
const byCourse = {};
for (const c of catches) { (byCourse[c.course] = byCourse[c.course] || []).push(c); }
for (const c of catches) console.log("FAIL: " + c.course + " " + c.id + " [" + c.field + "]: " + c.snippet);
console.log(catches.length ? "GATE-MATHSPAN FAIL: " + catches.length + " entries with a tag inside a math span (" + Object.keys(byCourse).map(k => k + "=" + byCourse[k].length).join(", ") + ")" : "GATE-MATHSPAN PASS");
process.exit(catches.length ? 1 : 0);
