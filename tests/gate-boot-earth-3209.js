#!/usr/bin/env node
/* Boot gate (jsdom) for Earth Systems 3209 in the unified shell:
     node tests/gate-boot-earth-3209.js   (NODE_PATH set to the 2204 node_modules)
   Slice state (Nov 14, 2026): all five units are built (Unit 1
   Introduction to Earth Science, 63 entries; Unit 2 Historical
   Geology, 101; Unit 3 Earth Materials, 147; Unit 4 The Forces within
   Earth, 135; Unit 5 Earth Resources: Real Life Applications, 82),
   so BANK.length is 528 and the mid preset pool is 244 (all of Units
   1 and 2 plus the Unit 3 mid segment of 80); the final preset pool
   is 284 (the Unit 3 final segment of 67 plus all of Units 4 and 5,
   which are final-scope only). The course was listed in the finishing
   pass rerun (Nov 14, 2026) once the whole-preset gate passed, and
   appears in the picker as the fourth Grade 12 science course. */
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
const ev = (dom, code) => dom.window.eval(code);

(async () => {
  // --- course boot ---
  let r = await boot("course=earth-3209");
  let d = r.dom.window.document;
  ok(r.dom.window.document.title === "Earth Systems 3209 Review: Practice Question Bank", "course: page title, saw " + r.dom.window.document.title);
  ok(d.querySelector("#app h1").textContent === "Earth Systems 3209 Review", "course: header, saw " + d.querySelector("#app h1").textContent);
  ok(ev(r.dom, "window.__NOCOURSE === true") === false, "course: picker flag off (the course boots by direct link)");
  ok(ev(r.dom, "BANK.length") === 528, "course: bank loaded via the loader, BANK.length = " + ev(r.dom, "BANK.length"));
  ok(ev(r.dom, "Object.keys(CR_MARKS).length") === 97, "course: CR_MARKS wired from the bank module, saw " + ev(r.dom, "Object.keys(CR_MARKS).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit===1).length") === 63, "course: slice bank carries 63 Unit 1 entries, saw " + ev(r.dom, "BANK.filter(e=>e.unit===1).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit===2).length") === 101, "course: slice bank carries 101 Unit 2 entries, saw " + ev(r.dom, "BANK.filter(e=>e.unit===2).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit===3).length") === 147, "course: slice bank carries 147 Unit 3 entries, saw " + ev(r.dom, "BANK.filter(e=>e.unit===3).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit===4).length") === 135, "course: slice bank carries 135 Unit 4 entries, saw " + ev(r.dom, "BANK.filter(e=>e.unit===4).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit===5).length") === 82, "course: slice bank carries 82 Unit 5 entries, saw " + ev(r.dom, "BANK.filter(e=>e.unit===5).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.unit!==1&&e.unit!==2&&e.unit!==3&&e.unit!==4&&e.unit!==5).length") === 0, "course: slice bank carries Units 1 to 5 entries only");
  ok(ev(r.dom, "BANK.filter(e=>e.postMid).length") === 67, "course: postMid segment (EA12.3.20 onward) = 67, saw " + ev(r.dom, "BANK.filter(e=>e.postMid).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.preFinal).length") === 80, "course: preFinal segment (through EA12.3.19) = 80, saw " + ev(r.dom, "BANK.filter(e=>e.preFinal).length"));
  ok(ev(r.dom, "BANK.filter(e=>e.postMid&&e.preFinal).length") === 0, "course: no entry carries both scope flags");
  const figCheck = ev(r.dom, `(function(){
    var n = 0, bad = [];
    BANK.forEach(function(e){
      var q; try { q = e.gen(); } catch (err) { bad.push(e.id + " threw"); return; }
      if (q && q.figure) {
        n++;
        if (q.figure.indexOf('src="banks/earth-3209/assets/') < 0 || q.figure.indexOf('.png"') < 0) bad.push(e.id + " bad figure src");
        var altAt = q.figure.indexOf('alt="');
        if (altAt < 0 || q.figure.indexOf('"', altAt + 5) - (altAt + 5) < 10) bad.push(e.id + " missing alt text");
      }
    });
    return { n: n, bad: bad };
  })()`);
  ok(figCheck.n === 91 && figCheck.bad.length === 0, "course: 91 figure entries render figure HTML with bank asset paths and alt text" + (figCheck.bad.length ? " | " + figCheck.bad.join(" ;; ") : "") + ", saw " + figCheck.n);
  const labels = Array.prototype.slice.call(d.querySelectorAll("#unitGrid label")).map(l => l.textContent);
  ok(labels.length === 5, "course: five unit checkboxes, saw " + labels.length);
  ["Introduction to Earth Science", "Historical Geology", "Earth Materials", "The Forces within Earth", "Earth Resources: Real Life Applications"].forEach(n =>
    ok(labels.some(t => t.includes(n)), "course: unit checkbox for " + n));
  ok(d.getElementById("presetMid").textContent === "Mid-course review (Units 1 to 3, Unit 3 to EA12.3.19)", "course: mid preset button (full label), saw " + d.getElementById("presetMid").textContent);
  ok(d.getElementById("presetFinal").textContent === "Final review (Units 3 to 5, Unit 3 from EA12.3.20)", "course: final preset button (full label), saw " + d.getElementById("presetFinal").textContent);
  ok(d.getElementById("presetFinal").style.display !== "none", "course: Final preset button visible (this course has a final preset)");
  ev(r.dom, "document.getElementById('presetMid').click()");
  ok(d.getElementById("faceScope").textContent === "Mid-course review: Units 1 to 3", "course: face scope for the mid preset, saw " + d.getElementById("faceScope").textContent);
  ok((d.getElementById("poolInfo").textContent || "").includes("244 question templates"), "course: pool after Mid preset is all of Units 1 and 2 plus the Unit 3 mid segment, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "document.getElementById('presetFinal').click()");
  ok(d.getElementById("faceScope").textContent === "Final review: Units 3 to 5", "course: face scope for the final preset, saw " + d.getElementById("faceScope").textContent);
  ok((d.getElementById("poolInfo").textContent || "").includes("284 question templates"), "course: pool after Final preset is the Unit 3 final segment plus all of Units 4 and 5, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([4])");
  ok((d.getElementById("poolInfo").textContent || "").includes("135 question templates"), "course: pool with Unit 4 alone, uncapped, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([3])");
  ok((d.getElementById("poolInfo").textContent || "").includes("147 question templates"), "course: pool with Unit 3 alone, uncapped, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([2])");
  ok((d.getElementById("poolInfo").textContent || "").includes("101 question templates"), "course: pool with Unit 2 alone, uncapped, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([1])");
  ok((d.getElementById("poolInfo").textContent || "").includes("63 question templates"), "course: pool with Unit 1 alone, uncapped, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ev(r.dom, "setPreset([5])");
  ok((d.getElementById("poolInfo").textContent || "").includes("82 question templates"), "course: pool with Unit 5 alone, uncapped, saw: " + d.getElementById("poolInfo").textContent.slice(0, 90));
  ok(d.getElementById("advToolsBtn") && !d.getElementById("advToolsBtn").hidden, "course (student): Advanced tools button visible beside Copy link at the builder's foot");
  ok(r.errors.length === 0, "course: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- teacher boot ---
  r = await boot("course=earth-3209&teacher=1");
  d = r.dom.window.document;
  ok(ev(r.dom, "TEACHER") === true || (d.getElementById("teacherNote") && !d.getElementById("teacherNote").hidden), "teacher: teacher mode on");
  ok((d.getElementById("teacherNote").textContent || "").indexOf("Advanced tools are on") === 0, "teacher: note uses the Advanced tools wording");
  ok(r.errors.length === 0, "teacher: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  // --- bare URL: the picker lists earth-3209 (listed in the finishing pass rerun) ---
  r = await boot("");
  d = r.dom.window.document;
  ok(ev(r.dom, "window.__NOCOURSE === true") === true, "picker: bare URL shows the course picker");
  const btns = Array.prototype.slice.call(d.querySelectorAll("#courseList button")).map(b => b.textContent);
  /* Picker pins updated: 26 courses are listed after the Nov 15, 2026 joint junior science listing, so the count, the Science chip set and the reset count in this block pin 26. */
  ok(btns.length === 26, "picker: 26 listed courses (Earth Systems 3209 listed on completion), saw " + btns.length);
  ok(btns.some(t => t.includes("Earth Systems")), "picker: Earth Systems 3209 is listed");
  const chipRows = d.querySelectorAll("#pkChips .pkrow");
  const visBtns = () => Array.prototype.slice.call(d.querySelectorAll("#courseList button")).filter(b => b.style.display !== "none").map(b => b.textContent);
  const clickChip = (row, text) => { const bs = chipRows[row].querySelectorAll("button"); for (const b of bs) if (b.textContent === text) { b.click(); return; } };
  clickChip(0, "Science");
  ok(visBtns().join() === "Biology 3201,Chemistry 3202,Physics 3204,Earth Systems 3209,Biology 2201,Chemistry 2202,Physics 2204,Science 1206,Science 9,Science 8,Science 7", "picker: the Science chip leaves the eleven listed science courses, saw " + visBtns().join(", "));
  clickChip(1, "Grade 12");
  ok(visBtns().join() === "Biology 3201,Chemistry 3202,Physics 3204,Earth Systems 3209", "picker: Science plus Grade 12 leaves four courses, saw " + visBtns().join(", "));
  clickChip(0, "All"); clickChip(1, "All");
  ok(visBtns().length === 26, "picker: resetting both chips restores all 26");
  ok(r.errors.length === 0, "picker: no page errors" + (r.errors.length ? " | " + r.errors.slice(0, 3).join(" ;; ") : ""));
  r.dom.window.close();

  console.log("GATE-BOOT-EARTH-3209: " + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
