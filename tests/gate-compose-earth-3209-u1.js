#!/usr/bin/env node
/* Unit-level compose check for Earth Systems 3209, Unit 1 slice:
     node tests/gate-compose-earth-3209-u1.js   (NODE_PATH set to the 2204 node_modules)
   Full mid composition also draws Units 2 and 3, so this gate checks
   what Unit 1 (Introduction to Earth Science) must feed the mid
   preset, using the shell's own poolFor with the mid cap. Unit 1 is
   mid-scope only (no postMid / preFinal flags anywhere in the unit),
   so the capped Unit 1 pool is the whole unit bank:
     mid line (Unit 1): 10 SR at levels 4/6/2 plus CR entries
     summing to 2 marks (12 marks in total).
   Level totals are SR marks plus CR marks combined, the way
   composeExam meets per-unit level marks. A targeted draw (CR subset
   first, then SR drawn per remaining level need) must succeed in at
   least 99 percent of 300 trials. The gate also asserts the programme
   CR floor (exam-eligible CR, Level 2+ and 2+ marks, at least 14
   marks in the unit pool) and the Unit 1 census (every Unit 1
   indicator carries at least one entry; the only tags outside the
   unit's 7 indicators are the four Unit 5 dual-tags to EA12.5.6,
   accepted in the Unit 5 build, Nov 14, 2026). When the full course
   exists, this file is superseded by a full
   gate-compose-earth-3209.js. */
const fs = require("fs");
const { JSDOM } = require("jsdom");
const FILE = process.env.HOME + "/workspace/review-app-unified/index.html";
const html = fs.readFileSync(FILE, "utf8");
let pass = 0, fail = 0;
function ok(cond, name) { if (cond) { pass++; } else { fail++; console.log("FAIL: " + name); } }

function boot(qs) {
  return new Promise((resolve) => {
    const errors = [];
    const { VirtualConsole } = require("jsdom");
    const vc = new VirtualConsole();
    vc.on("jsdomError", e => errors.push(String(e.detail && e.detail.message || e.message || e)));
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html?" + qs,
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) { w.HTMLElement.prototype.scrollIntoView = function () {}; }
    });
    setTimeout(() => resolve({ dom, errors }), 2000);
  });
}

(async () => {
  const r = await boot("course=earth-3209");
  const w = r.dom.window;
  const ev = (code) => w.eval(code);
  ok(r.errors.length === 0, "boot: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));

  const report = ev(`(function(){
    function segPool(cap){
      var pool = poolFor([1], null, cap);
      var sr = pool.filter(function(e){ return !(e.id in CR_MARKS); });
      var cr = pool.filter(function(e){ return (e.id in CR_MARKS); })
                   .map(function(e){ return { id: e.id, level: e.level, marks: CR_MARKS[e.id] }; });
      var byLevel = {1:0, 2:0, 3:0};
      sr.forEach(function(e){ byLevel[e.level]++; });
      return { sr: sr, cr: cr, byLevel: byLevel };
    }
    function draws(seg, srCount, crTarget, levels, trials){
      var srByLevel = {1:[], 2:[], 3:[]};
      seg.sr.forEach(function(e){ srByLevel[e.level].push(e.id); });
      var okCount = 0;
      for (var t = 0; t < trials; t++){
        var solved = false;
        for (var attempt = 0; attempt < 60 && !solved; attempt++){
          var shuffled = seg.cr.slice();
          for (var i = shuffled.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp; }
          var sum = 0, pick = [];
          for (var k = 0; k < shuffled.length; k++){
            if (sum + shuffled[k].marks <= crTarget){ sum += shuffled[k].marks; pick.push(shuffled[k]); if (sum === crTarget) break; }
          }
          if (sum !== crTarget) continue;
          var need = {1: levels[0], 2: levels[1], 3: levels[2]};
          pick.forEach(function(c){ need[c.level] -= c.marks; });
          var good = true, drawn = 0;
          for (var L = 1; L <= 3; L++){
            if (need[L] < 0 || srByLevel[L].length < need[L]) { good = false; break; }
            drawn += need[L];
          }
          if (good && drawn === srCount) solved = true;
        }
        if (solved) okCount++;
      }
      return okCount;
    }
    var mid = segPool("mid");
    function elig(cr){ return cr.filter(function(c){ return c.level >= 2 && c.marks >= 2; }).reduce(function(a, c){ return a + c.marks; }, 0); }
    var u1inds = (COURSES["earth-3209"].unitInd[1] || []).slice();
    var tagged = {};
    BANK.filter(function(e){ return e.unit === 1; }).forEach(function(e){ e.indicators.forEach(function(c){ tagged[c] = true; }); });
    return {
      midSR: mid.sr.length, midByLevel: mid.byLevel, midCRmarks: elig(mid.cr), midCRn: mid.cr.length,
      midDraws: draws(mid, 10, 2, [4, 6, 2], 300),
      censusMissing: u1inds.filter(function(c){ return !tagged[c]; }),
      outside: BANK.filter(function(e){ return e.unit === 1 && e.indicators.some(function(c){ return u1inds.indexOf(c) < 0; }); }).length,
      taggedCount: Object.keys(tagged).length,
      flagged: BANK.filter(function(e){ return e.unit === 1 && (e.postMid || e.preFinal); }).length
    };
  })()`);

  ok(report.midSR === 55, "mid line: Unit 1 SR pool is 55, saw " + report.midSR);
  ok(report.midByLevel[1] >= 4 && report.midByLevel[2] >= 6 && report.midByLevel[3] >= 2,
     "mid line: per-level SR pools cover the SR share of 4/6/2 (Level 2 needs 6 after a Level 3 CR; Level 3 needs 2 after a Level 2 CR), saw " + JSON.stringify(report.midByLevel));
  ok(report.midCRn === 10, "mid line: Unit 1 CR pool is 10 entries, saw " + report.midCRn);
  ok(report.midCRmarks >= 14, "mid line: exam-eligible CR pool clears the 14-mark floor, saw " + report.midCRmarks);
  ok(report.midCRmarks === 20, "mid line: exam-eligible CR pool is 20 marks at this build, saw " + report.midCRmarks);
  ok(report.midDraws >= 297, "mid line: targeted draws meet 10 SR + 2 CR marks at levels 4/6/2 in " + report.midDraws + "/300 trials (need 297)");
  ok(report.flagged === 0, "scope: no Unit 1 entry carries a postMid or preFinal flag, saw " + report.flagged);
  ok(report.censusMissing.length === 0, "census: every Unit 1 indicator carries at least one entry, missing: " + report.censusMissing.join(", "));
  ok(report.outside === 4, "census: exactly the four accepted EA12.5.6 dual-tags sit outside the unit's 7 indicators, saw " + report.outside);
  ok(report.taggedCount === 8, "census: the 7 Unit 1 indicators plus dual-tagged EA12.5.6 are tagged by Unit 1 entries, saw " + report.taggedCount);
  r.dom.window.close();

  console.log("GATE-COMPOSE-EARTH-3209-U1: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
