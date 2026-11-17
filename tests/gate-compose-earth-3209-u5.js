#!/usr/bin/env node
/* Unit-level compose check for Earth Systems 3209, Unit 5 slice:
     node tests/gate-compose-earth-3209-u5.js   (NODE_PATH set to the 2204 node_modules)
   Full final composition also draws the Unit 3 final segment and
   Unit 4, so this gate checks what Unit 5 (Earth Resources: Real Life
   Applications) must feed the final preset, using the shell's own
   poolFor with the final cap. Unit 5 is final-scope only (no postMid
   / preFinal flags anywhere in the unit), so the capped Unit 5 pool
   is the whole unit bank:
     final line (Unit 5): 11 SR at levels 5/6/3 plus CR entries
     summing to 3 marks (14 marks in total).
   Because the CR draw must sum to exactly 3, it is a single 3-mark
   CR: if that CR is Level 2, the SR share is 5/3/3; if Level 3, the
   SR share is 5/6/0. Level totals are SR marks plus CR marks
   combined, the way composeExam meets per-unit level marks. A
   targeted draw (CR subset first, then SR drawn per remaining level
   need) must succeed in at least 99 percent of 300 trials. The gate
   also asserts the programme CR floor (exam-eligible CR, Level 2+
   and 2+ marks, at least 14 marks in the unit pool), the Unit 5
   census (every Unit 5 indicator carries at least one entry; no
   Unit 5 entry tags outside the unit's 15 indicators), and the
   EA12.5.6 dual-tag set (the four Unit 1 spheres entries accepted in
   this build, plus the one Unit 5 CR tagged EA12.5.5/EA12.5.6). When
   the finishing pass lands, this file is superseded by a full
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
      var pool = poolFor([5], null, cap);
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
    var fin = segPool("final");
    function elig(cr){ return cr.filter(function(c){ return c.level >= 2 && c.marks >= 2; }).reduce(function(a, c){ return a + c.marks; }, 0); }
    var u5inds = (COURSES["earth-3209"].unitInd[5] || []).slice();
    var tagged = {};
    BANK.filter(function(e){ return e.unit === 5; }).forEach(function(e){ e.indicators.forEach(function(c){ tagged[c] = true; }); });
    return {
      finSR: fin.sr.length, finByLevel: fin.byLevel, finCRmarks: elig(fin.cr), finCRn: fin.cr.length,
      finDraws: draws(fin, 11, 3, [5, 6, 3], 300),
      censusMissing: u5inds.filter(function(c){ return !tagged[c]; }),
      outside: BANK.filter(function(e){ return e.unit === 5 && e.indicators.some(function(c){ return u5inds.indexOf(c) < 0; }); }).length,
      taggedCount: Object.keys(tagged).length,
      flagged: BANK.filter(function(e){ return e.unit === 5 && (e.postMid || e.preFinal); }).length,
      dual56: BANK.filter(function(e){ return e.unit !== 5 && e.indicators.indexOf("EA12.5.6") >= 0; }).map(function(e){ return e.id; }).sort(),
      tag56: BANK.filter(function(e){ return e.indicators.indexOf("EA12.5.6") >= 0; }).length
    };
  })()`);

  ok(report.finSR === 69, "final line: Unit 5 SR pool is 69, saw " + report.finSR);
  ok(report.finByLevel[1] >= 5 && report.finByLevel[2] >= 6 && report.finByLevel[3] >= 3,
     "final line: per-level SR pools cover the SR share of 5/6/3 (Level 2 needs 6 after a Level 3 CR; Level 3 needs 3 after a Level 2 CR), saw " + JSON.stringify(report.finByLevel));
  ok(report.finCRn === 16, "final line: Unit 5 CR pool is 16 entries, saw " + report.finCRn);
  ok(report.finCRmarks >= 14, "final line: exam-eligible CR pool clears the 14-mark floor, saw " + report.finCRmarks);
  ok(report.finCRmarks === 37, "final line: exam-eligible CR pool is 37 marks at this build, saw " + report.finCRmarks);
  ok(report.finDraws >= 297, "final line: targeted draws meet 11 SR + 3 CR marks at levels 5/6/3 in " + report.finDraws + "/300 trials (need 297)");
  ok(report.flagged === 0, "scope: no Unit 5 entry carries a postMid or preFinal flag, saw " + report.flagged);
  ok(report.censusMissing.length === 0, "census: every Unit 5 indicator carries at least one entry, missing: " + report.censusMissing.join(", "));
  ok(report.outside === 0, "census: no Unit 5 entry tags outside the unit's 15 indicators, saw " + report.outside);
  ok(report.taggedCount === 15, "census: exactly the 15 Unit 5 indicators are tagged by Unit 5 entries, saw " + report.taggedCount);
  ok(JSON.stringify(report.dual56) === JSON.stringify(["es-u1-15-q04", "es-u1-15-q08", "es-u1-15-q12", "es-u1-cr-q10"]),
     "dual-tag: exactly the four accepted Unit 1 spheres entries carry EA12.5.6 outside Unit 5, saw " + report.dual56.join(", "));
  ok(report.tag56 === 5, "dual-tag: EA12.5.6 is carried by five entries bank-wide (four Unit 1 dual-tags plus es-u5-cr-q06), saw " + report.tag56);
  r.dom.window.close();

  console.log("GATE-COMPOSE-EARTH-3209-U5: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
