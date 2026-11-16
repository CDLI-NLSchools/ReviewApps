"use strict";
/* Gate: the grp link parameter (November 16, 2026, Band 3 Piece 1).
   The shell change, gated in its own right per the specification's
   Section 12: a link carrying pkonly=1 and grp=<pkGroup slugs>
   deals only the named groups, mixed across them by drawSet's
   group-keyed round-robin (a single named group deals that group
   alone, the repair shape); grp round-trips through settingsToURL
   and applyURL; a grp set's save signature differs from a plain
   check's, so the two never cross-restore; grp without pkonly
   restricts nothing. Exercised on Mathematics 7, whose fluency
   strand Piece 1 built, in the live shell under jsdom.
   Run: NODE_PATH=<jsdom node_modules> node tests/gate-grp.js */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
let pass = 0, fail = 0;
function ok(cond, msg) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + msg); } }
const { JSDOM } = require("jsdom");
const { VirtualConsole } = require("jsdom");
function storageShim(shared) {
  return {
    getItem: (k) => (k in shared ? shared[k] : null),
    setItem: (k, v) => { shared[k] = String(v); },
    removeItem: (k) => { delete shared[k]; },
    clear: () => { Object.keys(shared).forEach((k) => delete shared[k]); },
    key: (i) => Object.keys(shared)[i] || null,
    get length() { return Object.keys(shared).length; }
  };
}
function boot(qs, shared) {
  return new Promise((resolve) => {
    const vc = new VirtualConsole();
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
      }
    });
    setTimeout(() => settleBoot(dom).then(() => resolve(dom)), 2000);
  });
}
function settleBoot(dom) {
  return new Promise((res) => {
    let waited = 0;
    const iv = setInterval(() => {
      waited += 50;
      let ready = false;
      try { ready = dom.window.eval("typeof BANK !== 'undefined' && BANK.length > 0"); } catch (e) {}
      if (ready || waited >= 4000) {
        clearInterval(iv);
        try {
          dom.window.eval("if(window.__COURSE){applyURL();unitCheckboxes();renderIndicators();updatePoolInfo();}");
          dom.window.eval("(function(){"
            + "var p=new URLSearchParams(location.search);"
            + "if(!window.__COURSE)return;"
            + "if(p.get('set')){if(!window.T)tRebuildFromURL();return;}"
            + "if(!(p.get('unit')||p.get('preset')||p.get('indicator')))return;"
            + "var m=p.get('mode');"
            + "if(m==='sheet'||m==='worksheet'){if(!sheetState)startSheet();}"
            + "else if(m==='exam'){if(!examState)startExam();}"
            + "else if(!current||!current.length)startOnline();"
            + "})()");
        } catch (e) {}
        setTimeout(() => res(dom), 80);
      }
    }, 50);
  });
}
const ev = (d, code) => d.window.eval(code);
const dealtGroups = (d) => ev(d, "current.map(function(q){return pkGroupOf(q._entry);})");
const dealtIds = (d) => ev(d, "current.map(function(q){return q._entry.id;})");

(async function main() {
  /* 1. A multi-group grp link deals only the named groups, mixed. */
  {
    const shared = {};
    const d = await boot("course=math-7&unit=1,2,7&count=12&pkonly=1&grp=multiplication-facts,ordering-numbers&seed=grp1", shared);
    ok(ev(d, "current && current.length") === 12, "grp link: deals the requested 12 questions, saw " + ev(d, "current && current.length"));
    const groups = dealtGroups(d);
    ok(groups.every((g) => g === "multiplication-facts" || g === "ordering-numbers"),
       "grp link: every dealt question is in a named group, saw " + JSON.stringify([...new Set(groups)]));
    ok(new Set(groups).size === 2, "grp link: the set mixes both named groups (standing practice is interleaved)");
    ok(ev(d, "current.every(function(q){return isPK(q._entry);})"), "grp link: every dealt question is a prior knowledge entry");
    /* 2. grp round-trips through settingsToURL. */
    const url = ev(d, "settingsToURL()");
    ok(url.includes("pkonly=1"), "round-trip: settingsToURL keeps pkonly=1, saw " + url);
    ok(url.includes("grp=multiplication-facts%2Cordering-numbers"), "round-trip: settingsToURL carries the grp parameter, saw " + url);
    const sigGrp = ev(d, "resumeSig('online', current)");
    /* 3. The same link rebooted restores the identical set (the
       parameter survives applyURL and the save round). */
    const d2 = await boot(url.split("?")[1], shared);
    ok(JSON.stringify(dealtIds(d2)) === JSON.stringify(dealtIds(d)),
       "round-trip: rebooting the settingsToURL link restores the identical grp set");
    ok(ev(d2, "resumeSig('online', current)") === sigGrp, "round-trip: the grp set's save signature is stable across the reboot");
    /* 4. A plain check link (same units, seed and count, no grp)
       neither restores the grp set nor shares its signature. */
    const d3 = await boot("course=math-7&unit=1,2,7&count=12&pkonly=1&seed=grp1", shared);
    ok(ev(d3, "resumeSig('online', current)") !== sigGrp, "signatures: a plain check's save signature differs from the grp set's");
    ok(JSON.stringify(dealtIds(d3)) !== JSON.stringify(dealtIds(d)) || new Set(dealtGroups(d3)).size > 2,
       "signatures: the plain check link does not resurrect the grp set (it deals the full stratified check)");
    d.window.close(); d2.window.close(); d3.window.close();
  }
  /* 5. A single-group grp link deals that group alone (repair). */
  {
    const shared = {};
    const d = await boot("course=math-7&unit=2&count=8&pkonly=1&grp=below-zero&seed=grp2", shared);
    const groups = dealtGroups(d);
    ok(groups.length === 8 && groups.every((g) => g === "below-zero"),
       "single-group grp link: deals 8 questions from the named group only, saw " + JSON.stringify(groups));
    d.window.close();
  }
  /* 6. grp without pkonly restricts nothing. */
  {
    const shared = {};
    const d = await boot("course=math-7&unit=1&count=10&grp=multiplication-facts&seed=grp3", shared);
    ok(ev(d, "current && current.length") === 10, "grp without pkonly: an ordinary set of 10 is dealt");
    ok(ev(d, "current.some(function(q){return !isPK(q._entry);})"),
       "grp without pkonly: the set includes ordinary (non-flagged) entries, so grp alone restricts nothing");
    ok(!ev(d, "settingsToURL()").includes("grp="), "grp without pkonly: settingsToURL does not carry grp on an ordinary set");
    d.window.close();
  }
  console.log("GATE-GRP: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-GRP ERROR: " + (e && e.stack || e)); process.exit(1); });
