#!/usr/bin/env node
/* Unit-level compose check for Earth Systems 3209, Unit 3 slice:
     node tests/gate-compose-earth-3209-u3.js   (NODE_PATH set to the 2204 node_modules)
   Full exam composition is impossible until Units 1, 2, 4 and 5 exist,
   so this gate checks what Unit 3 must feed each preset, using the
   shell's own poolFor with the preset caps:
     mid segment   (poolFor cap true):   26 SR at levels 12/15/5 plus
                   CR entries summing to 6 marks (32 marks in total);
     final segment (poolFor cap "final"): 14 SR at levels 7/8/3 plus
                   CR entries summing to 4 marks (18 marks in total).
   Level totals are SR marks plus CR marks combined, the way
   composeExam meets per-unit level marks. A targeted draw (CR subset
   first, then SR drawn per remaining level need) must succeed in at
   least 99 percent of 300 trials per segment. The gate also asserts
   the programme CR floor (exam-eligible CR, Level 2+ and 2+ marks, at
   least 14 marks per segment pool) and the Unit 3 census (every Unit 3
   indicator carries at least one entry; no entry tags outside the
   unit's 42 indicators). When the full course exists, this file is
   superseded by a full gate-compose-earth-3209.js. */
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
      var pool = poolFor([3], null, cap);
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
        // Like composeExam, search CR subsets summing exactly to crTarget
        // until one leaves a per-level SR fill the pool can supply.
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
    var mid = segPool(true), fin = segPool("final");
    function elig(cr){ return cr.filter(function(c){ return c.level >= 2 && c.marks >= 2; }).reduce(function(a, c){ return a + c.marks; }, 0); }
    var u3inds = (COURSES["earth-3209"].unitInd[3] || []).slice();
    var tagged = {};
    BANK.forEach(function(e){ e.indicators.forEach(function(c){ tagged[c] = true; }); });
    return {
      midSR: mid.sr.length, midByLevel: mid.byLevel, midCRmarks: elig(mid.cr), midCRn: mid.cr.length,
      finSR: fin.sr.length, finByLevel: fin.byLevel, finCRmarks: elig(fin.cr), finCRn: fin.cr.length,
      midDraws: draws(mid, 26, 6, [12, 15, 5], 300),
      finDraws: draws(fin, 14, 4, [7, 8, 3], 300),
      censusMissing: u3inds.filter(function(c){ return !tagged[c]; }),
      outside: BANK.filter(function(e){ return e.unit === 3 && e.indicators.some(function(c){ return u3inds.indexOf(c) < 0; }); }).length,
      taggedCount: Object.keys(tagged).length
    };
  })()`);

  ok(report.midSR === 74, "mid segment: SR pool is 74, saw " + report.midSR);
  ok(report.midByLevel[1] >= 12 && report.midByLevel[2] >= 15 && report.midByLevel[3] >= 5,
     "mid segment: per-level SR pools cover 12/15/5 before CR, saw " + JSON.stringify(report.midByLevel));
  ok(report.midCRmarks >= 14, "mid segment: exam-eligible CR pool clears the 14-mark floor, saw " + report.midCRmarks);
  ok(report.midDraws >= 297, "mid segment: targeted draws meet 26 SR + 6 CR marks at levels 12/15/5 in " + report.midDraws + "/300 trials (need 297)");
  ok(report.finSR === 58, "final segment: SR pool is 58, saw " + report.finSR);
  ok(report.finByLevel[3] >= 3, "final segment: Level 3 SR pool covers its share of the 3 Level 3 marks, saw " + JSON.stringify(report.finByLevel));
  ok(report.finCRmarks >= 14, "final segment: exam-eligible CR pool clears the 14-mark floor, saw " + report.finCRmarks);
  ok(report.finDraws >= 297, "final segment: targeted draws meet 14 SR + 4 CR marks at levels 7/8/3 in " + report.finDraws + "/300 trials (need 297)");
  ok(report.censusMissing.length === 0, "census: every Unit 3 indicator carries at least one entry, missing: " + report.censusMissing.join(", "));
  ok(report.outside === 0, "census: no entry tags outside Unit 3's 42 indicators, saw " + report.outside);
  ok(report.taggedCount === 117, "census: tagged indicators across the grown bank are the 42 Unit 3 codes plus the 21 Unit 2 codes plus the 32 Unit 4 codes plus the 7 Unit 1 codes plus the 15 Unit 5 codes, saw " + report.taggedCount);
  r.dom.window.close();

  console.log("GATE-COMPOSE-EARTH-3209-U3: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
