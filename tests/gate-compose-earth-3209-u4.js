#!/usr/bin/env node
/* Unit-level compose check for Earth Systems 3209, Unit 4 slice:
     node tests/gate-compose-earth-3209-u4.js   (NODE_PATH set to the 2204 node_modules)
   Full exam composition is impossible until Units 1 and 5 exist,
   so this gate checks what Unit 4 (The Forces within Earth) must feed
   the final preset, using the shell's own poolFor with the final cap.
   Unit 4 is final-scope only (no postMid / preFinal flags anywhere in
   the unit), so the capped Unit 4 pool is the whole unit bank:
     final line (Unit 4): 23 SR at levels 11/12/5 plus CR entries
     summing to 5 marks (28 marks in total).
   Level totals are SR marks plus CR marks combined, the way
   composeExam meets per-unit level marks. A targeted draw (CR subset
   first, then SR drawn per remaining level need) must succeed in at
   least 99 percent of 300 trials. The gate also asserts the programme
   CR floor (exam-eligible CR, Level 2+ and 2+ marks, at least 14
   marks in the unit pool) and the Unit 4 census (every Unit 4
   indicator carries at least one entry; no Unit 4 entry tags outside
   the unit's 32 indicators). When the full course exists, this file is
   superseded by a full gate-compose-earth-3209.js. */
/* Bimodal aware census, November 20, 2026: the pool census now
   counts the pools the way the production composer sees them after
   the reverse bimodal registration (412 entries, 388 class a and
   24 class b). The SR pool is every entry that can deal as selected
   response in these preset scopes: entries carrying no CR marks,
   plus the registered bimodal entries. The CR pool is every entry
   carrying CR marks, the registered bimodal entries among them at
   their CR marks, so the CR census numbers grew while the SR census
   is what it was before registration. The targeted draw now finds
   its CR subset with the composer's own subset-sum search
   (subsetSumMarks: shuffle plus dynamic programming) instead of a
   greedy scan, which could no longer find exact subsets in the
   deepened pool, and an entry taken by the CR subset is no longer
   available to the SR fill, the composer's cross-section rule. The
   composition assertions (exact blueprint sums, at least 99 percent
   of 300 trials) are unchanged. */
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
      var pool = poolFor([4], null, cap);
      var sr = pool.filter(function(e){ return !(e.id in CR_MARKS) || (e.id in BIMODAL); });
      var cr = pool.filter(function(e){ return (e.id in CR_MARKS); })
                   .map(function(e){ return { id: e.id, level: e.level, marks: CR_MARKS[e.id] }; });
      var byLevel = {1:0, 2:0, 3:0};
      sr.forEach(function(e){ byLevel[e.level]++; });
      return { sr: sr, cr: cr, byLevel: byLevel };
    }
    function subsetSum(entries, target){
      var arr = entries.slice();
      for (var i = arr.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp; }
      var dp = {0: []};
      for (var a = 0; a < arr.length; a++){
        var m = arr[a].marks;
        var keys = Object.keys(dp).map(Number).sort(function(x, y){ return y - x; });
        for (var k = 0; k < keys.length; k++){
          var s2 = keys[k] + m;
          if (s2 <= target && !dp[s2]){ dp[s2] = dp[keys[k]].concat([arr[a]]); if (s2 === target) return dp[s2]; }
        }
      }
      return dp[target] || null;
    }
    function draws(seg, srCount, crTarget, levels, trials){
      var srByLevel = {1:[], 2:[], 3:[]};
      seg.sr.forEach(function(e){ srByLevel[e.level].push(e.id); });
      var okCount = 0;
      for (var t = 0; t < trials; t++){
        var solved = false;
        for (var attempt = 0; attempt < 60 && !solved; attempt++){
          var pick = subsetSum(seg.cr, crTarget);
          if (!pick) continue;
          var need = {1: levels[0], 2: levels[1], 3: levels[2]};
          pick.forEach(function(c){ need[c.level] -= c.marks; });
          var good = true, drawn = 0;
          for (var L = 1; L <= 3; L++){
            var avail = srByLevel[L].length;
            pick.forEach(function(c){ if (srByLevel[L].indexOf(c.id) >= 0) avail--; });
            if (need[L] < 0 || avail < need[L]) { good = false; break; }
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
    var u4inds = (COURSES["earth-3209"].unitInd[4] || []).slice();
    var tagged = {};
    BANK.filter(function(e){ return e.unit === 4; }).forEach(function(e){ e.indicators.forEach(function(c){ tagged[c] = true; }); });
    return {
      finSR: fin.sr.length, finByLevel: fin.byLevel, finCRmarks: elig(fin.cr), finCRn: fin.cr.length,
      finDraws: draws(fin, 23, 5, [11, 12, 5], 300),
      censusMissing: u4inds.filter(function(c){ return !tagged[c]; }),
      outside: BANK.filter(function(e){ return e.unit === 4 && e.indicators.some(function(c){ return u4inds.indexOf(c) < 0; }); }).length,
      taggedCount: Object.keys(tagged).length,
      flagged: BANK.filter(function(e){ return e.unit === 4 && (e.postMid || e.preFinal); }).length
    };
  })()`);

  ok(report.finSR === 110, "final line: Unit 4 SR pool is 110, saw " + report.finSR);
  ok(report.finByLevel[1] >= 11 && report.finByLevel[2] >= 12 && report.finByLevel[3] >= 2,
     "final line: per-level SR pools cover the SR share of 11/12/5 (Level 3 needs 2 after a 3-mark Level 3 CR), saw " + JSON.stringify(report.finByLevel));
  ok(report.finCRn === 136, "final line: Unit 4 CR pool is 136 entries, saw " + report.finCRn);
  ok(report.finCRmarks >= 14, "final line: exam-eligible CR pool clears the 14-mark floor, saw " + report.finCRmarks);
  ok(report.finCRmarks === 178, "final line: exam-eligible CR pool is 178 marks at this build, saw " + report.finCRmarks);
  ok(report.finDraws >= 297, "final line: targeted draws meet 23 SR + 5 CR marks at levels 11/12/5 in " + report.finDraws + "/300 trials (need 297)");
  ok(report.flagged === 0, "scope: no Unit 4 entry carries a postMid or preFinal flag, saw " + report.flagged);
  ok(report.censusMissing.length === 0, "census: every Unit 4 indicator carries at least one entry, missing: " + report.censusMissing.join(", "));
  ok(report.outside === 0, "census: no Unit 4 entry tags outside the unit's 32 indicators, saw " + report.outside);
  ok(report.taggedCount === 32, "census: exactly the 32 Unit 4 indicators are tagged by Unit 4 entries, saw " + report.taggedCount);
  r.dom.window.close();

  console.log("GATE-COMPOSE-EARTH-3209-U4: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
