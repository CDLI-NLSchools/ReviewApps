#!/usr/bin/env node
/* Gate for the What's new picker link and anonymous usage counting
   (Nov 15, 2026, v1.1.0; analytics spec the same date):
     node tests/gate-analytics.js   (NODE_PATH set to the 2204 node_modules)

   Part 1 (working endpoint, beacons recorded): the picker carries
   the What's new link (href, new tab, noopener, L9 label) and the
   disclosure line, and records a plain pageview; a course page
   records course_open exactly once; the twelve event hooks fire
   with their spec dimensions (pkcheck_start, practice_start,
   help_open, practice_finish, retry_start, teacher_open,
   student_link_copy with its four choice flags, sheet_generate in
   its practice/key/test kinds, exam_compose with its preset,
   resume_accept, whatsnew_click); every recorded URL is only the
   endpoint, a path from the closed vocabulary, and the event flag:
   no seed, no answer, no page URL ever travels.
   Part 2 (failing endpoint): sendBeacon throws and image loads
   throw; the picker, a dealt set and a finished set all behave
   exactly as they do with no counting at all.
   Part 3 (empty endpoint): the kill switch sends nothing.
   Contrast: the link colour clears 4.5:1 in both themes, computed
   from the shell's own CSS values. */
const fs = require("fs");
const ROOT = "/home/hatch/workspace/review-app-unified";
const html = fs.readFileSync(ROOT + "/index.html", "utf8");
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) { pass++; } else { fail++; fails.push(m); console.log("FAIL: " + m); } }

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
function boot(qs, opts) {
  opts = opts || {};
  const shared = opts.shared || {};
  const sent = [];
  return new Promise((resolve) => {
    const vc = new VirtualConsole();
    const dom = new JSDOM(html, {
      url: "file:///home/hatch/workspace/review-app-unified/index.html" + (qs ? "?" + qs : ""),
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true,
      virtualConsole: vc,
      beforeParse(w) {
        w.HTMLElement.prototype.scrollIntoView = function () {};
        Object.defineProperty(w, "localStorage", { value: storageShim(shared) });
        w.navigator.sendBeacon = function (url) {
          if (opts.beaconThrows) throw new Error("blocked");
          sent.push(String(url)); return true;
        };
        w.Image = class {
          set src(u) { if (opts.beaconThrows) throw new Error("blocked"); sent.push(String(u)); }
        };
      }
    });
    setTimeout(() => settle(dom).then(() => resolve({ dom, sent, shared })), 1200);
    function settle(d) {
      return new Promise((res) => {
        let waited = 0;
        const iv = setInterval(() => {
          waited += 50;
          let ready = false;
          try { ready = d.window.eval("typeof BANK !== 'undefined' && BANK.length > 0") || d.window.eval("!!window.__NOCOURSE"); } catch (e) {}
          if (ready || waited >= 4000) {
            clearInterval(iv);
            try {
              d.window.eval("if(window.__COURSE){applyURL();unitCheckboxes();renderIndicators();updatePoolInfo();}");
            } catch (e) {}
            setTimeout(res, 250);
          }
        }, 50);
      });
    }
  });
}
function paths(sent) {
  return sent.map((u) => {
    const m = u.match(/\?p=([^&]+)(&e=1)?$/);
    return m ? { path: decodeURIComponent(m[1]), event: !!m[2], raw: u } : { path: "?", event: false, raw: u };
  });
}
function has(sent, path) { return paths(sent).some((p) => p.path === path && p.event); }
function countPath(sent, path) { return paths(sent).filter((p) => p.path === path && p.event).length; }
function answerAll(w) {
  const d = w.document;
  const cur = w.eval("current");
  cur.forEach((q, i) => {
    if (q.type === "mc") {
      const idx = q.answerIndex != null ? q.answerIndex : q.correct;
      const inp = d.querySelector('input[name="opt' + i + '"][value="' + idx + '"]');
      if (inp) inp.click();
    } else {
      const a = d.getElementById("ans" + i);
      if (a) a.value = q.type === "num" ? String(q.answer) : (q.answers ? q.answers[0] : "");
    }
    const b = d.querySelector('[data-check="' + i + '"]');
    if (b) b.click();
  });
}

(async () => {
  /* ---------- Part 1a: the picker ---------- */
  {
    const { dom, sent } = await boot("");
    const w = dom.window, d = w.document;
    const link = d.getElementById("pkWhatsNew");
    ok(!!link, "picker: the What's new link exists");
    ok(link && link.getAttribute("href") === "https://github.com/CDLI-NLSchools/ReviewApps/releases", "picker: link href is the releases list");
    ok(link && link.getAttribute("target") === "_blank" && (link.getAttribute("rel") || "").includes("noopener"), "picker: link opens in a new tab with noopener");
    ok(link && link.textContent === "What's new", "picker: link label is What's new, saw: " + (link && link.textContent));
    const pv = d.getElementById("pkPrivacy");
    ok(!!pv && pv.textContent === "Anonymous usage counts help us see which courses and features are used. No student information is collected.", "picker: disclosure line carries the spec wording");
    const ps = paths(sent);
    ok(ps.some((p) => p.path === "/" && !p.event), "picker: a plain pageview was counted for the picker");
    ok(!ps.some((p) => p.path.indexOf("/event/") === 0 && p.path.indexOf("course_open") >= 0), "picker: no course_open on the picker");
    if (link) link.click();
    ok(has(sent, "/event/whatsnew_click"), "picker: clicking the link counts whatsnew_click");
    dom.window.close();
  }

  /* ---------- Part 1b: course page basics ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3");
    const w = dom.window, d = w.document;
    ok(countPath(sent, "/event/course_open/math-2200") === 1, "course: course_open counted exactly once, saw " + countPath(sent, "/event/course_open/math-2200"));
    ok(d.getElementById("coursePicker").hidden, "course: the picker (and its link) is not presented on a course page");
    // ordinary practice set: deal if the boot chain did not
    if (!w.eval("current && current.length")) w.eval("startOnline()");
    ok(has(sent, "/event/practice_start/math-2200/u3/student"), "course: practice_start counted with unit scope and student view");
    // help_open via the worked solution on question 0
    const sol = d.querySelector('[data-sol="0"]');
    ok(!!sol, "course: a worked solution button is present");
    if (sol) sol.click();
    ok(has(sent, "/event/help_open/math-2200/solution"), "course: opening a worked solution counts help_open/solution");
    const hint = d.querySelector('[data-hint="0"]');
    if (hint) { hint.click(); ok(has(sent, "/event/help_open/math-2200/hint"), "course: opening a hint counts help_open/hint"); }
    // finish the set (helped-correct on Q0 leaves a retry offer)
    answerAll(w);
    ok((d.getElementById("setSummary") || {}).innerHTML ? d.getElementById("setSummary").innerHTML.includes("Set complete") : false, "course: the set reaches its summary");
    ok(countPath(sent, "/event/practice_finish/math-2200/student") === 1, "course: practice_finish counted once");
    const rb = d.getElementById("retryMissedBtn");
    ok(!!rb, "course: the helped set offers Practice what I missed");
    if (rb) { rb.click(); ok(has(sent, "/event/retry_start/math-2200/ordinary"), "course: the retry counts retry_start/ordinary"); }
    dom.window.close();
  }

  /* ---------- Part 1c: prerequisite check ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3&pkonly=1&count=8");
    const w = dom.window;
    w.eval("startOnline()");
    ok(has(sent, "/event/pkcheck_start/math-2200/u3"), "check: dealing a check counts pkcheck_start with the unit");
    ok(!has(sent, "/event/practice_start/math-2200/u3/student"), "check: a check does not also count as practice_start");
    dom.window.close();
  }

  /* ---------- Part 1d: teacher events ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3&teacher=1");
    const w = dom.window, d = w.document;
    ok(countPath(sent, "/event/teacher_open/math-2200") === 1, "teacher: teacher_open counted once on entry");
    if (!w.eval("current && current.length")) w.eval("startOnline()");
    const cs = d.getElementById("tCopyStudentBtn");
    ok(!!cs, "teacher: the copy-student-link button is present");
    if (cs) cs.click();
    const cp = paths(sent).find((p) => p.path.indexOf("/event/student_link_copy/math-2200/") === 0);
    ok(!!cp, "teacher: copying a student link counts student_link_copy");
    ok(!!cp && /\/s[01]-h[01]-e[01]-k[01]$/.test(cp.path), "teacher: the copy event carries the four choice flags, saw: " + (cp && cp.path));
    ok(!!cp && cp.path.endsWith("/s0-h0-e0-k0"), "teacher: default choices count as s0-h0-e0-k0, saw: " + (cp && cp.path));
    const before = countPath(sent, cp ? cp.path : "/none");
    const ct = d.getElementById("tCopyTeacherBtn");
    if (ct) ct.click();
    ok(countPath(sent, cp ? cp.path : "/none") === before, "teacher: copying a teacher link does not count as a student link copy");
    dom.window.close();
  }

  /* ---------- Part 1e: sheets and exams ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3");
    const w = dom.window;
    w.eval("startSheet()");
    ok(has(sent, "/event/sheet_generate/math-2200/practice"), "sheet: a practice sheet counts sheet_generate/practice");
    ok(has(sent, "/event/sheet_generate/math-2200/key"), "sheet: a sheet with its key counts sheet_generate/key");
    w.eval("setPreset([1,2,3,4],true);startExam();");
    ok(has(sent, "/event/exam_compose/math-2200/mid"), "exam: composing the mid scope counts exam_compose/mid");
    ok(has(sent, "/event/sheet_generate/math-2200/test"), "exam: a composed paper counts sheet_generate/test");
    w.eval("setPreset([3]);startExam();");
    ok(has(sent, "/event/exam_compose/math-2200/custom"), "exam: a single unit test counts exam_compose/custom");
    dom.window.close();
  }

  /* ---------- Part 1f: resume accept ---------- */
  {
    const shared = {};
    const QS = "course=math-2200&unit=3&seed=gateana1";
    const first = await boot(QS, { shared });
    const w1 = first.dom.window, d1 = w1.document;
    if (!w1.eval("current && current.length")) w1.eval("startOnline()");
    w1.eval("(function(){"
      + "var q=current[0];"
      + "if(q.type==='mc'){var r=document.querySelector('input[name=\"opt0\"][value=\"'+q.correct+'\"]');r.checked=true;r.dispatchEvent(new window.Event('change',{bubbles:true}));}"
      + "else{var inp=document.getElementById('ans0');inp.value=(q.type==='num'?String(q.answer):q.answers[0]);inp.dispatchEvent(new window.Event('input',{bubbles:true}));}"
      + "})()");
    const q0 = d1.querySelector('[data-check="0"]');
    if (q0) q0.click();
    await new Promise((r) => setTimeout(r, 900)); /* the resume save is debounced */
    const key = Object.keys(shared).find((k) => k.endsWith("-resume-v1"));
    ok(!!key, "resume: the interrupted set wrote a resume save");
    first.dom.window.close();
    const second = await boot(QS, { shared });
    const w2 = second.dom.window, d2 = w2.document;
    if (!w2.eval("current && current.length")) w2.eval("startOnline()"); /* the identical seeded set redraws; its signature match raises the offer */
    await new Promise((r) => setTimeout(r, 200));
    const go = d2.getElementById("resumeGoBtn");
    ok(!!go, "resume: the resume offer is presented on the next visit");
    if (go) { go.click(); ok(has(second.sent, "/event/resume_accept/math-2200"), "resume: accepting the offer counts resume_accept"); }
    second.dom.window.close();
  }

  /* ---------- Part 1g: URL hygiene over everything recorded ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3&pkonly=1&count=8");
    const w = dom.window;
    w.eval("startOnline()");
    answerAll(w);
    const all = paths(sent);
    ok(all.length >= 3, "hygiene: events were recorded, saw " + all.length);
    ok(all.every((p) => p.raw.startsWith("https://cdli.goatcounter.com/count?p=")), "hygiene: every send goes to the GoatCounter count endpoint");
    ok(all.every((p) => p.path === "/" || /^\/event\/[a-z_]+(\/[a-z0-9-]+)*$/.test(p.path)), "hygiene: every path is the pageview root or a closed-vocabulary event path");
    ok(all.every((p) => !/seed|answer|score|%3F|&/.test(p.raw.replace("?p=", "").replace("&e=1", ""))), "hygiene: no seed, answer, score or smuggled query data in any send");
    dom.window.close();
  }

  /* ---------- Part 2: failing endpoint changes nothing ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3", { beaconThrows: true });
    const w = dom.window, d = w.document;
    ok(sent.length === 0, "failure: a throwing endpoint records nothing");
    if (!w.eval("current && current.length")) w.eval("startOnline()");
    ok(w.eval("current && current.length") > 0, "failure: a set still deals with the endpoint down");
    answerAll(w);
    ok((d.getElementById("setSummary") || {}).innerHTML ? d.getElementById("setSummary").innerHTML.includes("Set complete") : false, "failure: the set still finishes and summarises with the endpoint down");
    dom.window.close();
    const pk = await boot("", { beaconThrows: true });
    ok(!!pk.dom.window.document.getElementById("pkWhatsNew"), "failure: the picker still renders with the endpoint down");
    pk.dom.window.close();
  }

  /* ---------- Part 3: empty endpoint is a kill switch ---------- */
  {
    const { dom, sent } = await boot("course=math-2200&unit=3");
    const w = dom.window;
    const before = sent.length;
    w.eval("try{ANALYTICS_ENDPOINT='';countEvent('practice_start',['math-2200','u3','student']);countPageview();}catch(e){}");
    ok(sent.length === before, "kill switch: an empty endpoint sends nothing");
    dom.window.close();
  }

  /* ---------- Contrast, from the shell's own CSS values ---------- */
  {
    function lum(hex) {
      const c = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }
    function ratio(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
    const lightBg = (html.match(/:root\{[^}]*--bg:(#[0-9a-f]{6})/) || [])[1];
    const darkBg = (html.match(/html\[data-a11y-theme="dark"\]\{[^}]*--bg:(#[0-9a-f]{6})/) || [])[1];
    ok(!!lightBg && !!darkBg, "contrast: theme backgrounds found in the shell CSS (" + lightBg + ", " + darkBg + ")");
    ok(html.includes(".pkwn{font-size:.85rem;color:#1f4e79"), "contrast: the picker link colour is the picker accent in light mode");
    ok(html.includes("html[data-a11y-theme='dark'] .pkwn{color:#5eead4}"), "contrast: the picker link has the teal dark-mode override");
    if (lightBg) ok(ratio("#1f4e79", lightBg) >= 4.5, "contrast: link on light background is " + ratio("#1f4e79", lightBg || "#ffffff").toFixed(2) + ":1 (needs 4.5)");
    if (darkBg) ok(ratio("#5eead4", darkBg) >= 4.5, "contrast: link on dark background is " + ratio("#5eead4", darkBg || "#000000").toFixed(2) + ":1 (needs 4.5)");
  }

  console.log("GATE-ANALYTICS: " + pass + " passed, " + fail + " failed");
  if (fails.length) console.log("failures: " + fails.join(" | "));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.log("GATE-ANALYTICS ERROR: " + e.stack); process.exit(1); });
