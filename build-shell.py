#!/usr/bin/env python3
"""Build the unified review app shell (index.html) from the Math 2201
chassis source in physics-2204-review, in the build.py surgery spirit.

Every course-specific value is taken from courses.js (evaluated with
node) at run time: branding strings, identifiers and the preset button
labels are read from the active course, and everything the chassis reads
at run time (UNITS, INDICATORS, UNIT_IND, REF_HTML, CR_MARKS, the exam
composer blueprint, the preset unit sets, the final note) is replaced by
a read from window.__COURSE, resolved by the boot snippet from
?course=...

The shell is course-neutral: nothing course-specific is baked in. Every
branding string, identifier and label the chassis hardcoded for Math 2201
is replaced by a run-time read from the active course, so one built
index.html serves every registered course. Rebuild after editing
courses.js or the chassis source:
    python3 assemble-bank.py <course-id> && python3 build-shell.py
"""
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path("/home/hatch/workspace/review-app-unified")
CHASSIS = Path("/home/hatch/workspace/physics-2204-review/chassis-source.html")
COURSE_ID = sys.argv[1] if len(sys.argv) > 1 else "physics-3204"

# ---------- read the course registry ----------
env = dict(os.environ)
env["COURSES_JS"] = str(ROOT / "courses.js")
code = ('const fs=require("fs");global.window={};'
        'eval(fs.readFileSync(process.env.COURSES_JS,"utf8"));'
        'process.stdout.write(JSON.stringify(window.COURSES));')
out = subprocess.run(["node", "-e", code], capture_output=True, text=True,
                     env=env, check=True).stdout
COURSES = json.loads(out)
if COURSE_ID not in COURSES:
    raise SystemExit(f"course not registered in courses.js: {COURSE_ID}")
C = COURSES[COURSE_ID]
APPNAME = C["shortName"] + " Review"
SLUG = C["storagePrefix"].upper()          # p3204 -> P3204
EXPORT_KW = C["id"].replace("-", "_") + "_review_brightspace_export"

html = CHASSIS.read_text(encoding="utf-8")

def rep(old, new, required=True, count=None):
    global html
    n = html.count(old)
    if required and n == 0:
        raise SystemExit(f"REPLACE MISS (0 occurrences): {old[:90]!r}")
    if count is not None and n != count:
        raise SystemExit(f"REPLACE COUNT {n} != {count}: {old[:90]!r}")
    html = html.replace(old, new)
    return n

def region(start_anchor, end_anchor, new_text, start_from=0):
    """Replace html[start of start_anchor : start of end_anchor]."""
    global html
    s = html.index(start_anchor, start_from)
    e = html.index(end_anchor, s)
    html = html[:s] + new_text + html[e:]
    return s

# ---------- title ----------
rep("<title>Math 2201 Review \u2014 Practice Question Bank</title>",
    "<title>Review Apps</title>", count=1)

# ---------- course boot snippet (before every chassis script) ----------
boot = ('<script src="courses.js"></script>\n'
        '<script>\n'
        '/* Unified shell boot: resolve the active course from the\n'
        '   ?course=... parameter against the registry in courses.js.\n'
        '   With no course (or an unknown one) the shell shows the course\n'
        '   picker instead of the builder; the main script\'s boot\n'
        '   sequence is guarded by window.__NOCOURSE. */\n'
        '(function(){try{\n'
        '  var id=new URLSearchParams(location.search).get("course");\n'
        '  var c=(window.COURSES&&id)?window.COURSES[id]:null;\n'
        '  if(c){window.__COURSE=c;document.title=c.title;if(c.language)document.documentElement.lang=c.language;}\n'
        '  else{window.__COURSE=null;window.__NOCOURSE=true;document.title="Review Apps";}\n'
        '}catch(e){window.__COURSE=null;window.__NOCOURSE=true;}})();\n'
        '</script>\n')
rep('<script src="katex/contrib/auto-render.min.js"></script>\n',
    '<script src="katex/contrib/auto-render.min.js"></script>\n' + boot, count=1)

# ---------- course picker markup (the only new UI) ----------
faq = (ROOT / "snippets" / "picker-faq.html.txt").read_text(encoding="utf-8").rstrip("\n")
picker = ('<div class="wrap" id="coursePicker" hidden>\n'
          '  <img class="pklogo pklogo-l" src="cdli-logo.svg" alt="CDLI">\n'
          '  <img class="pklogo pklogo-d" src="cdli-logo-white.svg" alt="CDLI">\n'
          '  <h1>Review Apps</h1>\n'
          '  <div class="pkheadrow"><p class="sub pktag">Online or Printable Practice Exercises</p><span class="pkheadright"><a id="pkWhatsNew" class="pkwn" href="https://github.com/CDLI-NLSchools/ReviewApps/releases" target="_blank" rel="noopener">What\'s new</a><button type="button" id="pkTheme" class="pkthemebtn">Dark mode</button></span></div>\n  <p class="sub pkprivacy" id="pkPrivacy">Anonymous usage counts help us see which courses and features are used. No student information is collected.</p>\n'
          '  <div class="card">\n'
          '    <h2 style="margin-top:0;">Choose your course</h2>\n'
          '    <div id="courseList"></div>\n'
          '  </div>\n'
          + faq + '\n'
          '</div>\n')
rep('<body>\n', '<body>\n' + picker, count=1)

# ---------- curriculum map from the course configuration ----------
region('/* ============ curriculum map', '</script>',
       '/* ============ curriculum map (from the active course configuration) ============ */\n'
       'var UNITS=window.__COURSE?window.__COURSE.units:{};\n'
       'var INDICATORS=window.__COURSE?window.__COURSE.indicators:{};\n'
       'var UNIT_IND=window.__COURSE?window.__COURSE.unitInd:{};\n')

# ---------- bank blocks out, per-course bank loader in ----------
bank_start_anchor = '/* ============ THE BANK'
bs = html.index(bank_start_anchor)
bs = html.rfind('<script>', 0, bs)
cr_anchor = html.index('/* ============ Constructed-response fit', bs)
main_start = html.rfind('<script>', 0, cr_anchor)
bank_loader = ('<script>\n'
               '/* ============ THE BANK (loaded per course) ============ */\n'
               '/* The bank itself lives in the active course\'s bank module\n'
               '   (banks/ in the shell folder), assembled from that course\'s\n'
               '   per-unit bank sources. The module registers its entries\n'
               '   through E below and publishes its constructed-response\n'
               '   marks as window.__BANK_CRMARKS. */\n'
               'var BANK=[];\n'
               # E accepts the optional seventh argument the applied
               # courses' banks pass (a two-stage hint pair) and stores
               # it as hint1/hint2, exactly as their standalone E does.
               # Every other bank passes six arguments, so their entries
               # are unchanged; the hint UI itself is config-gated
               # (see the staged-hints section below).
               'function E(id,unit,indicators,level,kind,gen,hints){var e={id:id,unit:unit,indicators:indicators,level:level,kind:kind,gen:gen};if(hints){e.hint1=hints[0]||"";e.hint2=hints[1]||"";}BANK.push(e);}\n'
               '</script>\n'
               '<script>\n'
               '/* Load the active course\'s bank module here, in order, before\n'
               '   the main script runs. document.write during the initial\n'
               '   parse is the loading mechanism: it keeps execution order\n'
               '   exact and also works from a local folder, where fetching a\n'
               '   script file would be blocked. */\n'
               'if(window.__COURSE){document.write(\'<script src="banks/\'+window.__COURSE.bankFile+\'"><\\/script>\');\n'
               '  document.write(\'<script>window.CR_MARKS=window.__BANK_CRMARKS||{};<\\/script>\');}\n'
               '</script>\n\n')
html = html[:bs] + bank_loader + html[main_start:]

# The chassis main block itself opens with more bank (the Tranche 3 and 4
# entry blocks for Units 1 to 4 sit between its <script> tag and the
# constructed-response section). Cut that region too, keeping the tag.
content_start = bs + len(bank_loader) + len('<script>')
cr_pos = html.index('/* ============ Constructed-response fit', content_start)
html = html[:content_start] + '\n' + html[cr_pos:]

# ---------- CR_MARKS and the selection engine note ----------
s = html.index('/* ============ Constructed-response fit')
e = html.index('e.postMid=true;});', s) + len('e.postMid=true;});')
html = html[:s] + ('/* ============ Constructed-response fit ============ */\n'
                   '/* Exam Section B draws only from these entries (marks per\n'
                   '   question); every other entry is selected-response only in\n'
                   '   exam mode. Worksheet mode uses these plus all\n'
                   '   numeric-answer entries. The marks come from the active\n'
                   '   course\'s bank module (window.__BANK_CRMARKS), built from\n'
                   '   the CRMARKS manifests at the top of each bank file. The\n'
                   '   bank loader also assigns window.CR_MARKS right after the\n'
                   '   bank module, so the map is correct even in a parser\n'
                   '   that runs written scripts late (jsdom does; shipping\n'
                   '   browsers run them in order, making this line the one\n'
                   '   that counts there). */\n'
                   'var CR_MARKS=window.__BANK_CRMARKS||{};\n'
                   '/* ============ selection engine ============ */\n'
                   '/* Exam scopes in the unified shell are the preset unit\n'
                   '   selections in the course configuration. One course\n'
                   '   holds entries out of a scope: a course whose mid\n'
                   '   preset caps its pool (presets.mid.cap, Math 2201)\n'
                   '   flags the held-out entries postMid in its bank\n'
                   '   module, and the composer engages the cap argument\n'
                   '   to poolFor for exactly that scope. A course can cap\n'
                   '   its final preset the same way (presets.final.cap,\n'
                   '   Biology 3201): the entries held out of the final\n'
                   '   scope carry preFinal instead, poolFor\'s cap argument\n'
                   '   is the string "final" for that scope, and scopeCap\n'
                   '   resolves a unit selection to the cap it carries. */') + html[e:]

# ---------- reference panels from the course configuration ----------
region('var REF_HTML={', 'function refPanelsHtml',
       '/* Reference panels come from the active course configuration (the\n'
       '   course\'s data-sheet material, config key: panels). */\n'
       'var REF_HTML=(window.__COURSE&&window.__COURSE.panels)||{};\n')

# ---------- generic blueprint-driven exam composer ----------
composer = (ROOT / "snippets" / "composeexam-generic.js.txt").read_text(encoding="utf-8").rstrip("\n")
s = html.index('function composeExam(units,inds){')
e = html.index('\nfunction recGrid', s)
html = html[:s] + composer + html[e:]

# ---------- object-aware mcq (Math 3202's option dialect) ----------
# Math 3202's bank passes its options as {t, fb} objects (per-option
# feedback text) where every other bank passes plain strings; the
# chassis mcq String()s its arguments, which would collapse object
# options to "[object Object]". The replacement is the Math 3202
# standalone's own mcq, verbatim: it normalizes strings and objects
# alike and returns the per-option feedback as q.fb. For the plain
# strings every other course passes, norm() reduces to String(), the
# dedupe and ordering are the legacy ones, and the returned question
# is the legacy question plus an all-empty fb array, which no shell
# renderer reads (the standalone's "About your answer" feedback line
# is a renderer feature of that app, not of this shell). The five
# earlier courses' gate trios re-prove their behaviour after this.
rep('function mcq(prompt,correct,distractors,solution,params){\n'
    '  var seen={},opts=[{t:String(correct),ok:true}];\n'
    '  distractors.forEach(function(d){d=String(d);if(d!==String(correct)&&!seen[d]){seen[d]=1;opts.push({t:d,ok:false});}});\n'
    '  opts=orderOpts(opts);var ci=opts.findIndex(function(o){return o.ok;});\n'
    '  return {prompt:prompt,type:"mc",options:opts.map(function(o){return o.t;}),correct:ci,solution:solution,_p:params||{}};\n'
    '}',
    'function mcq(prompt,correct,distractors,solution,params){\n'
    '  function norm(o){return (o&&typeof o==="object")?{t:String(o.t),fb:o.fb||""}:{t:String(o),fb:""};}\n'
    '  var c=norm(correct);\n'
    '  var seen={},opts=[{t:c.t,ok:true,fb:c.fb}];\n'
    '  distractors.forEach(function(d){var n=norm(d);if(n.t!==c.t&&!seen[n.t]){seen[n.t]=1;opts.push({t:n.t,ok:false,fb:n.fb});}});\n'
    '  var fbMap={};opts.forEach(function(o){fbMap[o.t]=o.fb;});\n'
    '  var ordered=orderOpts(opts.map(function(o){return {t:o.t,ok:o.ok};}));\n'
    '  var ci=ordered.findIndex(function(o){return o.ok;});\n'
    '  return {prompt:prompt,type:"mc",options:ordered.map(function(o){return o.t;}),correct:ci,solution:solution,_p:params||{},fb:ordered.map(function(o){return fbMap[o.t]||"";})};\n'
    '}', count=1)

# ---------- course default level mix (config key: defaultMix) ----------
# The chassis hidCtl stash starts at 20/60/20. A course whose standalone
# builder defaults to a different mix (Math 3200 ships 20/62/18, the
# published mid-course mix, as its input defaults) sets defaultMix in
# its configuration; the stash then starts there. Courses without the
# key evaluate to the chassis literal, unchanged. The settingsToURL
# "is this the default mix" comparison follows the same key, exactly as
# the Math 3200 standalone compares against its own default.
rep('var hidCtl={mc:10,nc:5,mix:[20,60,20],pk:false};',
    'var hidCtl={mc:10,nc:5,mix:(window.__COURSE&&window.__COURSE.defaultMix?window.__COURSE.defaultMix.slice():[20,60,20]),pk:false};', count=1)
rep('if(s.mix.join()!=="20,60,20")p.set("levels",s.mix.join(","));',
    'if(s.mix.join()!==((window.__COURSE&&window.__COURSE.defaultMix)?window.__COURSE.defaultMix.join(","):"20,60,20"))p.set("levels",s.mix.join(","));', count=1)

# ---------- always-on reference panel (config key: panelsAlways) ----------
# refPanelsHtml starts from the course's panelsAlways HTML when the
# configuration carries one (Math 3200: the Quadratic Formula panel its
# standalone shows regardless of unit selection, Jason, Nov 8, 2026).
# Courses without the key start from an empty string, unchanged.
rep('function refPanelsHtml(units){var h="";',
    'function refPanelsHtml(units){var h=(window.__COURSE&&window.__COURSE.panelsAlways)||"";', count=1)

# ---------- preset labels in the markup (neutral statics; the boot
# sequence relabels both buttons from the active course at run time) ----------
rep('Mid-course review (Units 1\u20134, Radicals to 4.3)', 'Mid-course review', count=1)
rep('Final review (Units 5\u20138)', 'Final review', count=1)

# ---------- start button wording (Jason, Nov 12, 2026: just "Start") ----------
rep('>Start practising</button>', '>Start</button>', count=1)

# ---------- advanced tools (Jason, Nov 12, 2026) ----------
# Teacher mode is framed as "Advanced tools" (a student who opens it
# only gets more tools than they need). Final placement, Jason's call:
# the door button sits in the builder's modebar beside "Copy link to
# these settings", and the note shown in that mode (directly below the
# modebar) carries the way back. The "Advanced options: question
# levels" section leaves the builder entirely: the level mix and the
# exam timer live in the teacher bar of a practice set, under "New set
# of questions" (see the tBarHtml rep below). Clicking the door reloads
# the same course with teacher=1, keeping the current builder settings
# but NOT auto-starting a set (the nostart flag below), and lands back
# at the same scroll position with the same menus open (the advReturn
# save/restore wired with the relabel block).
__a = html.find('    <details id="advBox">')
__b = html.find('    </details>', __a)
assert __a > 0 and __b > __a, "advBox block not found"
html = html[:__a] + html[__b + len('    </details>\n'):]
rep('      <button type="button" id="copyLink" class="alt">Copy link to these settings</button>',
    '      <button type="button" id="copyLink" class="alt">Copy link to these settings</button>\n      <button type="button" class="alt" id="advToolsBtn" hidden>Advanced tools</button>', count=1)
rep('<p class="hint" id="teacherNote" hidden>Teacher mode is on: question editing controls will appear on practice sets, sheets and tests you make. Any link you copy to share with students leaves teacher mode out; only the clearly labelled teacher link buttons keep it.</p>',
    '<p class="hint" id="teacherNote" hidden>Advanced tools are on: question editing controls will appear on practice sets, sheets and tests you make. Any link you copy to share with students leaves advanced tools out; only the clearly labelled teacher link buttons keep them. <a href="#" id="advToolsOff">Turn off advanced tools</a></p>', count=1)

# The level mix and exam timer inputs move into the online teacher bar
# (tBarHtml), appended after the export row. They keep their ids, so
# settings(), tGateStudentUI and drawSet work unchanged; the bar is a
# JS template, so each render initializes the inputs from the live
# settings() (which falls back to the hidCtl stash when no bar exists
# yet, e.g. a session's first set always starts from the default mix
# or the mix a link carried in).
TBAR_OLD = "<span class=\"hint\" id=\"gameStatus\" role=\"status\"></span></div><div id=\"tPicker\" hidden></div></div>';"
TBAR_NEW = ("<span class=\"hint\" id=\"gameStatus\" role=\"status\"></span></div>"
    "<div style=\"margin-top:10px;\"><b>Advanced options:</b> <span class=\"hint\">Levels follow the course Table of Specifications. The default mix matches the exams: about 20% Level 1 (quick, one or two steps), 60% Level 2 (application: carry out the prescribed method), 20% Level 3 (higher-end thinking: analyse, justify, evaluate, transfer).</span>"
    "<div class=\"adv\"><label>Level 1 %<input type=\"number\" id=\"lv1\" min=\"0\" max=\"100\" value=\"'+settings().mix[0]+'\"></label>"
    "<label>Level 2 %<input type=\"number\" id=\"lv2\" min=\"0\" max=\"100\" value=\"'+settings().mix[1]+'\"></label>"
    "<label>Level 3 %<input type=\"number\" id=\"lv3\" min=\"0\" max=\"100\" value=\"'+settings().mix[2]+'\"></label>"
    "<label><input type=\"checkbox\" id=\"timerChk\"'+(settings().timer?\" checked\":\"\")+'> Show the exam timer on practice exams (it counts up; '+(window.__COURSE&&window.__COURSE.timerNote?(\"the real exam allows \"+window.__COURSE.timerNote):\"it is a guide only and never locks you out\")+')</label></div></div>"
    "<div id=\"tPicker\" hidden></div></div>';")
rep(TBAR_OLD, TBAR_NEW, count=1)

# applyURL must not assume the level inputs are on the page: before the
# first set renders they do not exist. Stash a link's mix into hidCtl
# (settings() already falls back to it) and set the inputs only when
# they are present.
rep('if(p.get("levels")){var lv=p.get("levels").split(",").map(Number);if(lv.length===3){$("lv1").value=lv[0];$("lv2").value=lv[1];$("lv3").value=lv[2];$("advBox").open=true;}}',
    'if(p.get("levels")){var lv=p.get("levels").split(",").map(Number);if(lv.length===3){hidCtl.mix=[lv[0],lv[1],lv[2]];if($("lv1")){$("lv1").value=lv[0];$("lv2").value=lv[1];$("lv3").value=lv[2];}}}', count=1)

# ---------- preset and URL wiring (run time, from the config) ----------
# A course may have no mid preset at all (Math 3202: its only preset is
# All units). MIDKEY then evaluates to a sentinel no unit selection can
# join to, and the presetMid wiring below hides the button instead of
# wiring it, exactly parallel to the FINKEY treatment. Courses with a
# mid preset are untouched by the guards.
MIDKEY = '(window.__COURSE.presets.mid?window.__COURSE.presets.mid.units.slice().sort(function(a,b){return a-b;}).join():"none")'
# A course may have no final preset at all (Chemistry 3202: the course
# final is the provincial exam, so the standalone removed the Final
# button). FINKEY then evaluates to a sentinel no unit selection can
# join to, and the presetFinal wiring below hides the button instead of
# wiring it. Courses with a final preset are untouched by the guards.
FINKEY = '(window.__COURSE.presets.final?window.__COURSE.presets.final.units.slice().sort(function(a,b){return a-b;}).join():"none")'
rep('function settingsToURL(){\n  var s=settings();var p=new URLSearchParams();',
    'function settingsToURL(){\n  var s=settings();var p=new URLSearchParams();\n'
    '  if(window.__COURSE)p.set("course",window.__COURSE.id);', count=1)
# A course whose mid preset caps its pool (presets.mid.cap: Math
# 2201) serializes preset=mid only while the cap is actually on,
# exactly as the chassis does; a hand-picked selection of the same
# units falls through to the plain unit parameter, so the link
# reopens uncapped. Courses without a cap serialize as before.
rep('if(s.units.length===4&&s.units.join()==="1,2,3,4"&&s.midCap)p.set("preset","mid");',
    f'if(window.__COURSE&&s.units.slice().sort(function(a,b){{return a-b;}}).join()==={MIDKEY}&&(!(window.__COURSE.presets.mid&&window.__COURSE.presets.mid.cap)||s.midCap))p.set("preset","mid");', count=1)
# The final serialization is gated the same way when the final
# preset caps its pool (presets.final.cap): preset=final is written
# only while that cap is on, so a hand-picked selection of the same
# units reopens uncapped.
rep('else if(s.units.slice().sort().join()==="5,6,7,8")p.set("preset","final");',
    f'else if(window.__COURSE&&s.units.slice().sort().join()==={FINKEY}&&(!(window.__COURSE.presets.final&&window.__COURSE.presets.final.cap)||s.finalCap))p.set("preset","final");', count=1)
rep('if(p.get("preset")==="mid"){state.units=[1,2,3,4];state.midCap=true;touched=true;}',
    'if(p.get("preset")==="mid"){state.units=(window.__COURSE&&window.__COURSE.presets.mid)?window.__COURSE.presets.mid.units.slice():[];touched=true;state.finalCap=false;state.midCap=!!(window.__COURSE&&window.__COURSE.presets.mid&&window.__COURSE.presets.mid.cap);if(window.__COURSE&&window.__COURSE.presets.mid&&window.__COURSE.presets.mid.mix)hidCtl.mix=window.__COURSE.presets.mid.mix.slice();}', count=1)
rep('else if(p.get("preset")==="final"){state.units=[5,6,7,8];touched=true;}',
    'else if(p.get("preset")==="final"){state.units=(window.__COURSE&&window.__COURSE.presets.final)?window.__COURSE.presets.final.units.slice():[];touched=true;state.midCap=false;state.finalCap=!!(window.__COURSE&&window.__COURSE.presets.final&&window.__COURSE.presets.final.cap);if(window.__COURSE&&window.__COURSE.presets.final&&window.__COURSE.presets.final.mix)hidCtl.mix=window.__COURSE.presets.final.mix.slice();}', count=1)
# A preset may also carry a level mix (config key: presets.<name>.mix),
# as the Math 3200 standalone's preset buttons set one (mid 20/62/18,
# final 20/60/20). The mix is stashed into hidCtl (settings() reads it
# from there whenever the level inputs are not on the page) and written
# into the level inputs when they are (the teacher bar of a live set).
# Courses whose presets carry no mix are untouched by the guards.
rep('$("presetMid").addEventListener("click",function(){setPreset([1,2,3,4],true);});',
    '(function(){var __pm=$("presetMid");if(!__pm)return;if(window.__COURSE&&window.__COURSE.presets.mid){__pm.addEventListener("click",function(){setPreset(window.__COURSE.presets.mid.units.slice(),!!window.__COURSE.presets.mid.cap);if(window.__COURSE.presets.mid.mix){var __mx=window.__COURSE.presets.mid.mix;hidCtl.mix=__mx.slice();if($("lv1")){$("lv1").value=__mx[0];$("lv2").value=__mx[1];$("lv3").value=__mx[2];}}});}else{__pm.style.display="none";}})();', count=1)
rep('$("presetFinal").addEventListener("click",function(){setPreset([5,6,7,8]);});',
    '(function(){var __pf=$("presetFinal");if(!__pf)return;if(window.__COURSE&&window.__COURSE.presets.final){__pf.addEventListener("click",function(){setPreset(window.__COURSE.presets.final.units.slice(),window.__COURSE.presets.final.cap?"final":undefined);if(window.__COURSE.presets.final.mix){var __mx=window.__COURSE.presets.final.mix;hidCtl.mix=__mx.slice();if($("lv1")){$("lv1").value=__mx[0];$("lv2").value=__mx[1];$("lv3").value=__mx[2];}}});}else{__pf.style.display="none";}})();', count=1)
rep('$("presetAll").addEventListener("click",function(){setPreset([1,2,3,4,5,6,7,8]);});',
    '$("presetAll").addEventListener("click",function(){setPreset(window.__COURSE&&window.__COURSE.allUnits?window.__COURSE.allUnits.slice():Object.keys(UNITS).map(Number).sort(function(a,b){return a-b;}));});', count=1)
# A mid preset may also carry a faceLabel, parallel to the final
# preset's below: Math 2201's mid button spells out its scope note
# ("Mid-course review (Units 1-4, Radicals to 4.3)") while its face
# scope reads "Mid-course review: Units 1 to 4". Courses without a
# mid faceLabel derive the face scope from the button label,
# unchanged.
rep('else if(u.join(",")==="1,2,3,4")scope="Mid-course review: Units 1 to 4";',
    f'else if(window.__COURSE&&u.join(",")==={MIDKEY})scope=(window.__COURSE.presets.mid.faceLabel||window.__COURSE.presets.mid.label).replace(" (",": ").replace(/\\)$/,"");', count=1)
rep('else if(u.join(",")==="5,6,7,8")scope="Final review: Units 5 to 8";',
    f'else if(window.__COURSE&&u.join(",")==={FINKEY})scope=(window.__COURSE.presets.final.faceLabel||window.__COURSE.presets.final.label).replace(" (",": ").replace(/\\)$/,"");', count=1)
# The chassis pool line ends with a scope note: the finalNote clause
# (a note shown for the final scope) and, appended here, a midNote
# clause: a course whose mid scope caps its pool (config key:
# midNote, with presets.mid.cap) shows its note while the cap is on,
# exactly where the chassis showed Math 2201's note. Courses without
# a midNote evaluate the clause to "", unchanged.
rep('+(state.midCap?" Mid-course scope: Unit 4 stops at Section 4.3, so the Radical Equations questions are held out.":"")',
    f'+(window.__COURSE&&window.__COURSE.finalNote&&state.units.slice().sort(function(a,b){{return a-b;}}).join()==={FINKEY}?" "+window.__COURSE.finalNote:"")+(window.__COURSE&&window.__COURSE.midNote&&state.midCap?" "+window.__COURSE.midNote:"")', count=1)
rep('(s.units.slice().sort(function(a,b){return a-b;}).join()==="1,2")',
    f'(s.units.slice().sort(function(a,b){{return a-b;}}).join()===(window.__COURSE?{MIDKEY}:""))', count=2)

# ---------- single-unit-only exam courses (config key: exam.singleOnly) ----------
# Math 3202's tests are built one unit at a time; its standalone
# startExam refuses a multi-unit selection up front with guidance
# toward a practice sheet. A course setting exam.singleOnly gets the
# same refusal, with the standalone's exact wording, before any
# composing happens (its composer also returns null for multi-unit
# selections). Courses without the key are untouched by the guard.
rep("  var pkOn=tPkOn();\n  var ex=withSeed(_sd,function(){return composeExam(s.units,s.inds,pkOn);});",
    "  var pkOn=tPkOn();\n  if(window.__COURSE&&window.__COURSE.exam&&window.__COURSE.exam.singleOnly&&s.units.length!==1){$(\"session\").innerHTML='<div class=\"card\"><p>'+(s.units.length?\"Practice tests are built one unit at a time, like the unit tests in the course. Choose exactly one unit above, then make the practice test again. To practise across several units, make a practice sheet instead.\":\"Choose one unit above, then make the practice test.\")+'</p></div>';return;}\n  var ex=withSeed(_sd,function(){return composeExam(s.units,s.inds,pkOn);});", count=1)

# ---------- short-paper check for pairCr courses ----------
# The chassis examShortNow judges a single-unit paper against the
# senior pattern (SR under 11 or CR under 14 means short). A pairCr
# course's unit test is smaller by design (Math 3202: 8 selected
# response and a per-unit constructed-response target), so every one
# of its good papers would be flagged short. Under pairCr the check
# reads the course's own targets, mirroring the standalone's
# examShortNow (its line 6391: SR under 8, or CR under the unit's
# UNIT_CR_TARGET). Courses without pairCr take the legacy branch
# unchanged. A trioCr course (Math 2202) takes the same branch: it
# has no per-unit targets, so ct2 falls to unitTest.cr (8) and the
# selected-response threshold to unitTest.sr (10), which is exactly
# its standalone's examShortNow (SR under 10, or CR under 8). A
# sextetCr course (Math 1202) takes the same branch on the same
# terms: ct2 falls to unitTest.cr (15) and the threshold to
# unitTest.sr (15), exactly its standalone's examShortNow (its
# line 5862: SR under 15, or CR under 15).
rep('function examShortNow(ex){var t=examLive(ex);if(ex.single)return (t.sr<11||t.cr<14);',
    'function examShortNow(ex){var t=examLive(ex);if(ex.single){var ut2=window.__COURSE&&window.__COURSE.unitTest;if(ut2&&(ut2.pairCr||ut2.trioCr||ut2.sextetCr)){var it2=ex.srItems[0]||ex.crItems[0];var ct2=(it2&&ut2.perUnitCr&&ut2.perUnitCr[it2.q._entry.unit])||ut2.cr||7;return (t.sr<(ut2.sr||8)||t.cr<ct2);}return (t.sr<11||t.cr<14);}', count=1)

# ---------- short-paper check for fallback-total courses ----------
# A course whose exam.fallback carries a paper total (the junior
# pooled family: Math 9's multi-unit paper is 35 marks, selected
# response 18 and constructed response 17) needs its multi-unit
# short check judged against those numbers: the legacy thresholds
# (SR under 30 or CR under 20) would flag every one of its full
# papers short. The junior standalone's examShortNow (its line
# 8045) judges a multi-unit paper at SR under 18 or CR under 17,
# exactly fallback.srCount and fallback.crMarks here. Only a
# course setting fallback.total takes the new branch; no existing
# course's fallback carries a total, so their checks are
# unchanged. The single-unit branch above is untouched (the
# junior standalone judges its unit tests at SR under 11 or CR
# under 14, the legacy values).
rep('return u==="3,4"?(t.sr<11||t.cr<14):(t.sr<30||t.cr<20);}',
    'var fb2=window.__COURSE&&window.__COURSE.exam&&window.__COURSE.exam.fallback;if(fb2&&fb2.total)return (t.sr<(fb2.srCount||30)||t.cr<(fb2.crMarks||20));return u==="3,4"?(t.sr<11||t.cr<14):(t.sr<30||t.cr<20);}', count=1)

# ---------- staged hints (config key: hints) ----------
# The applied courses' standalones (Math 2202 and 3202) give every
# practice question a Hint button revealing two authored stages
# (strategy, then first step) stored on the entry as hint1/hint2;
# the Math 2201 chassis this shell is built from has no such feature,
# so the shell dropped it. Math 2202's bank carries both stages on
# all 194 entries and its face card promises them, so the feature is
# restored here, gated on the course configuration: only a course
# setting hints:true renders the button, the hint box and the face
# card's "a hint, " wording, with the standalone's own showHint,
# markup and CSS. Courses without the key render byte-identical
# practice questions (Math 3202's entries regain their stored hint
# fields through the E change above, but its rendering is unchanged
# until its entry sets the key).
# The Hint button cycles (Jason, Nov 12, 2026, from the junior
# apps' behaviour): clicks advance through the stages the question
# carries (stage 1, then stage 2 when the entry has a second
# stage), and a click past the last stage hides the hint box and
# resets the stage to 0, so the next click starts at stage 1
# again. The shell's first version stopped at the last stage and
# left the hint on screen.
rep('  .exbox{margin:8px 0;padding:10px 12px;border:1px solid #b7c9a8;background:#f6faf2;border-radius:8px;line-height:1.5;}',
    '  .exbox{margin:8px 0;padding:10px 12px;border:1px solid #b7c9a8;background:#f6faf2;border-radius:8px;line-height:1.5;}\n  .hintbox{margin:8px 0;padding:8px 12px;border-left:4px solid #f2b134;background:#fff8e6;color:#1c2b33;border-radius:0 8px 8px 0;line-height:1.5;}', count=1)
rep("    html+='<p><button type=\"button\" data-check=\"'+i+'\">Check</button> <button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">See a worked example</button> <button type=\"button\" class=\"alt\" data-sol=\"'+i+'\">Show worked solution</button></p><div class=\"fb\" id=\"fb'+i+'\"></div><div class=\"exbox\" id=\"ex'+i+'\" hidden></div><div class=\"sol\" id=\"sol'+i+'\"><b>Worked solution:</b> '+stepHTML(q.solution)+'</div>'",
    "    html+='<p><button type=\"button\" data-check=\"'+i+'\">Check</button> '+(window.__COURSE&&window.__COURSE.hints?'<button type=\"button\" class=\"alt\" data-hint=\"'+i+'\">Hint</button> ':'')+'<button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">See a worked example</button> <button type=\"button\" class=\"alt\" data-sol=\"'+i+'\">Show worked solution</button></p><div class=\"fb\" id=\"fb'+i+'\"></div>'+(window.__COURSE&&window.__COURSE.hints?'<div class=\"hintbox\" id=\"hint'+i+'\" hidden></div>':'')+'<div class=\"exbox\" id=\"ex'+i+'\" hidden></div><div class=\"sol\" id=\"sol'+i+'\"><b>Worked solution:</b> '+stepHTML(q.solution)+'</div>'", count=1)
rep('  Array.prototype.forEach.call(box.querySelectorAll("[data-ex]"),function(b){b.addEventListener("click",function(){toggleExample(+b.getAttribute("data-ex"));});});',
    '  Array.prototype.forEach.call(box.querySelectorAll("[data-ex]"),function(b){b.addEventListener("click",function(){toggleExample(+b.getAttribute("data-ex"));});});\n  Array.prototype.forEach.call(box.querySelectorAll("[data-hint]"),function(b){b.addEventListener("click",function(){showHint(+b.getAttribute("data-hint"));});});', count=1)
rep('function dealExample(i,n,prev){',
    'function showHint(i){\n'
    '  var q=current[i];if(!q||!q._entry)return;\n'
    '  var box=$("hint"+i);if(!box)return;\n'
    '  var stage=+(box.dataset.stage||0);\n'
    '  var h1=q._entry.hint1||"",h2=q._entry.hint2||"";\n'
    '  var first=h1?stepHTML(h1):"Look at the worked example for this kind of question, then try the same first move here.";\n'
    '  var last=h2?2:1;\n'
    '  if(stage>=last){box.hidden=true;box.innerHTML="";box.dataset.stage="0";}\n'
    '  else if(stage===0){box.innerHTML="<b>Hint:</b> "+first;box.hidden=false;box.dataset.stage="1";}\n'
    '  else if(stage===1){box.innerHTML="<b>Hint:</b> "+first+(h2?("<br><b>First step:</b> "+stepHTML(h2)):"");box.hidden=false;box.dataset.stage="2";}\n'
    '}\n'
    'function dealExample(i,n,prev){', count=1)
rep('  d="You will get "+n+" practice questions, "+chk+", with a worked example and a full worked solution on every question.";',
    '  d=n+" practice questions, "+chk+". Every question has "+(window.__COURSE&&window.__COURSE.hints?"a hint, ":"")+"a worked example and a full worked solution.";', count=1)

# ---------- junior scoping shell items (rulings, Nov 12, 2026) ----------
# Five behaviours from the junior standalone family land with the
# Math 9 port, under Jason's rulings in the junior scoping report.
# Each is guarded or default-preserving: the senior courses render
# exactly as before except where a ruling says otherwise (the
# feedback display and the solution label flip below are
# deliberately universal).

# Ruling 1: per-answer feedback. When a student checks a multiple
# choice answer and the chosen option carries authored feedback
# (q.fb, populated by the object-aware mcq from the bank's
# {t, fb} option objects), the feedback shows under the verdict
# in the junior standalone's "About your answer" presentation
# (math-9-review/index.html: CSS line 125, markup line 8242,
# check flow line 8322). NOT config-gated: any course whose
# questions carry feedback gets it (the junior courses and the
# applied Math 3202, 2202 and 1202, whose banks carry feedback
# on every option). The senior academic banks carry empty
# feedback strings, so their check flow renders exactly as
# before, and the fbt element added here stays empty for
# numeric and text questions, as the junior's does.
rep('  .fb{margin-top:10px;font-size:.9rem;line-height:1.5;display:none;}',
    '  .fb{margin-top:10px;font-size:.9rem;line-height:1.5;display:none;}\n  .fbtext{margin:6px 0;font-size:.95rem;}', count=1)
rep("<div class=\"fb\" id=\"fb'+i+'\"></div>'+(window.__COURSE&&window.__COURSE.hints?",
    "<div class=\"fb\" id=\"fb'+i+'\"></div><div class=\"fbtext\" id=\"fbt'+i+'\"></div>'+(window.__COURSE&&window.__COURSE.hints?", count=1)
rep("  fb.innerHTML=ok?'<span class=\"ok\">Correct.</span> Nice work.':(checkMode===\"end\"?'<span class=\"notyet\">Not quite.</span> The worked solution is open below.':'<span class=\"notyet\">Not quite.</span> Try again, or open the worked solution.');\n  if(ok)$(\"sol\"+i).classList.remove(\"show\");",
    "  fb.innerHTML=ok?'<span class=\"ok\">Correct.</span> Nice work.':(checkMode===\"end\"?'<span class=\"notyet\">Not quite.</span> The worked solution is open below.':'<span class=\"notyet\">Not quite.</span> Try again, or open the worked solution.');\n  var fbt=$(\"fbt\"+i);if(fbt)fbt.innerHTML=(q.type===\"mc\"&&q.fb&&given!==null&&q.fb[given])?(\"<b>About your answer:</b> \"+stepHTML(q.fb[given])):\"\";\n  if(ok)$(\"sol\"+i).classList.remove(\"show\");", count=1)

# Ruling 2: the worked-solution toggle flips its label, for
# every course, parallel to the worked example's setExLabel:
# "Hide worked solution" while the solution is open. The junior
# standalone's toggleSolution (its line 7518) sets the label
# from the toggle result; here the label goes through
# setSolLabel, mirroring how toggleExample drives setExLabel,
# and the data-sol click handler calls toggleSolution.
# Opening the solution also closes that question's scaffolding
# (Jason, Nov 12, 2026): closeScaffolding hides the hint box and
# resets its stage to 0, and closes the worked example if open
# (box hidden, label back to "See a worked example" through
# setExLabel, the dealt example kept so a manual reopen shows
# the same one, exactly as toggleExample's own close leaves it).
# The rationale: a student who goes for the solution is past the
# hint and example stage. Closing the solution does not reopen
# either one; the student reopens them by hand if wanted.
rep("function setExLabel(i,open){var b=document.querySelector('[data-ex=\"'+i+'\"]');if(b)b.textContent=open?\"Hide worked example\":\"See a worked example\";}",
    "function setExLabel(i,open){var b=document.querySelector('[data-ex=\"'+i+'\"]');if(b)b.textContent=open?\"Hide worked example\":\"See a worked example\";}\nfunction setSolLabel(i,open){var b=document.querySelector('[data-sol=\"'+i+'\"]');if(b)b.textContent=open?\"Hide worked solution\":\"Show worked solution\";}\nfunction closeScaffolding(i){var hb=$(\"hint\"+i);if(hb){hb.hidden=true;hb.innerHTML=\"\";hb.dataset.stage=\"0\";}var xb=$(\"ex\"+i);if(xb&&!xb.hidden){xb.hidden=true;setExLabel(i,false);}}\nfunction toggleSolution(i){var sol=$(\"sol\"+i);if(!sol)return;var open=sol.classList.toggle(\"show\");setSolLabel(i,open);if(open)closeScaffolding(i);}", count=1)
rep("$(\"sol\"+b.getAttribute(\"data-sol\")).classList.toggle(\"show\");",
    "toggleSolution(+b.getAttribute(\"data-sol\"));", count=1)

# Ruling 3 (config key: timerNote): a course may name how long
# its real exam allows. The exam timer bar then reads "Time so
# far: M:SS · The real exam allows <timerNote>. This timer is
# just a guide." (the junior standalone's wording, its line
# 8498), and the Advanced options timer checkbox in the teacher
# bar above composes the same note into its label (the junior's
# checkbox wording, its line 372: "the real exam allows 1 hour
# 30 minutes" for Math 9). Without the key both render exactly
# as before. The rep anchors after the timer string's middle
# dot so it never has to carry the \u00B7 escape itself.
rep(' This timer is just a guide.";',
    ' "+((window.__COURSE&&window.__COURSE.timerNote)?("The real exam allows "+window.__COURSE.timerNote+". This timer is just a guide."):"This timer is just a guide.")+"";', count=1)

# Ruling 4 (config key: sheetWork): the practice sheet header's
# work instruction is a per-course pair of strings, [in the
# space provided, on your own paper]. The junior standalone
# says "work" where the chassis says "workings" (its sheet
# header, line 8534). The fallbacks below are the chassis's
# current strings, so every course without the key is unchanged.
rep("((wsMcF>0||wsCrF>0)?'Show all workings in the space provided.':'Show all workings on your own paper.')",
    "((wsMcF>0||wsCrF>0)?((window.__COURSE&&window.__COURSE.sheetWork&&window.__COURSE.sheetWork[0])||'Show all workings in the space provided.'):((window.__COURSE&&window.__COURSE.sheetWork&&window.__COURSE.sheetWork[1])||'Show all workings on your own paper.'))", count=1)

# ---------- mode-switch reloads must not auto-start a set ----------
# A settings link normally auto-starts its set on arrival (that is what
# shared links are for). The Advanced tools door and its exit carry
# nostart=1 so switching modes only switches modes: the boot dispatch
# applies the settings to the builder and stops there. A set already
# on screen is the one exception, and it is not an auto-start: it is
# the same set carried across the switch (see the next section).
rep('else if(urlTouched&&(new URLSearchParams(location.search).get("unit")',
    'else if(urlTouched&&new URLSearchParams(location.search).get("nostart")!=="1"&&(new URLSearchParams(location.search).get("unit")', count=1)

# ---------- mode-switch reloads carry the live set across ----------
# Jason's report (Nov 12, 2026, from Math 1201): toggling Advanced
# tools preserved the builder settings and the scroll spot but
# destroyed the practice set on screen, and Start afterwards built
# a new set from the same settings instead of restoring the one
# that was showing. The helpers in snippets/advset.js.txt fix it on
# the app's own exact-set machinery: __saveSpot (wired below with
# the relabel block) calls advSetCapture beside its advReturn
# write, serializing the on-screen set verbatim plus its answer
# state into sessionStorage, and the boot dispatch runs
# advSetRestore ahead of the set-link branch below, rebuilding the
# same set in the same view (online, sheet or exam) with its state
# back. With no set on screen the capture stores nothing and the
# switch behaves exactly as before. The dispatch anchor is the
# chassis's set-link branch head; the restore branch is prepended
# to it, leaving the set-link and settings branches untouched.
advset = (ROOT / "snippets" / "advset.js.txt").read_text(encoding="utf-8").rstrip("\n")
rep('function tRebuildFromURL(){', advset + '\nfunction tRebuildFromURL(){', count=1)
rep('if(new URLSearchParams(location.search).get("set")&&tRebuildFromURL()){',
    'if(advSetRestore()){\n'
    '  /* A set carried across an Advanced tools switch was restored\n'
    '     verbatim, with its answer state: the switch changed nothing\n'
    '     but the mode. */\n'
    '}\n'
    'else if(new URLSearchParams(location.search).get("set")&&tRebuildFromURL()){', count=1)

# ---------- boot guard for picker mode ----------
boot_anchor = '(function(){var __pm=$("presetMid");if(!__pm)return;if(window.__COURSE&&window.__COURSE.presets.mid){__pm.addEventListener("click",function(){setPreset(window.__COURSE.presets.mid.units.slice(),!!window.__COURSE.presets.mid.cap);if(window.__COURSE.presets.mid.mix){var __mx=window.__COURSE.presets.mid.mix;hidCtl.mix=__mx.slice();if($("lv1")){$("lv1").value=__mx[0];$("lv2").value=__mx[1];$("lv3").value=__mx[2];}}});}else{__pm.style.display="none";}})();'
bs2 = html.index(boot_anchor)
# Ruling 5 (config key: longName): a course may carry a long
# name for the two student-facing course-name spots, the face
# card heading and the subtitle's course name (Math 9: the
# junior standalone heads its face card "Mathematics 9 Review"
# and subtitles "Fresh practice questions for Mathematics 9,
# ...", its lines 249 and 244). The header title and the
# document title keep shortName, matching the standalone (its
# <title> is "Math 9 Review: Practice Question Bank"). Courses
# without the key fall back to shortName in both spots.
relabel = ('if(window.__COURSE){var __c=window.__COURSE;'
           'var __e=document.getElementById("appTitle");if(__e)__e.textContent=__c.shortName+" Review";'
           'var __e2=document.getElementById("appSubName");if(__e2)__e2.textContent=(__c.longName||__c.shortName);'
           'var __e3=document.getElementById("faceTitle");if(__e3)__e3.textContent=(__c.longName||__c.shortName)+" Review";'
           'var __e4=document.getElementById("presetMid");if(__e4&&__c.presets.mid)__e4.textContent=__c.presets.mid.label;'
           'var __e5=document.getElementById("presetFinal");if(__e5&&__c.presets.final)__e5.textContent=__c.presets.final.label;}\n'
           'function __saveSpot(){try{var o=[];Array.prototype.forEach.call(document.querySelectorAll("details[open]"),function(d){if(d.id)o.push(d.id);});sessionStorage.setItem("advReturn",JSON.stringify({y:window.scrollY||0,open:o}));}catch(e){}try{if(typeof advSetCapture==="function")advSetCapture();}catch(e){}}'
           'var __adv=document.getElementById("advToolsBtn");'
           'if(__adv){if(new URLSearchParams(location.search).get("teacher")==="1"){__adv.hidden=true;}'
           'else{__adv.hidden=false;__adv.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();__saveSpot();var u=settingsToURL();location.href=u+(u.indexOf("?")>=0?"&":"?")+"teacher=1&nostart=1";});}}'
           'var __off=document.getElementById("advToolsOff");'
           'if(__off){__off.addEventListener("click",function(e){e.preventDefault();__saveSpot();var u=settingsToURL();location.href=u+(u.indexOf("?")>=0?"&":"?")+"nostart=1";});}'
           'try{var __ret=sessionStorage.getItem("advReturn");if(__ret){sessionStorage.removeItem("advReturn");var __rj=JSON.parse(__ret);window.addEventListener("load",function(){setTimeout(function(){(__rj.open||[]).forEach(function(id){var d=document.getElementById(id);if(d)d.open=true;});window.scrollTo(0,__rj.y||0);},80);});}}catch(e){}\n')
html = html[:bs2] + 'if(!window.__NOCOURSE){\n' + relabel + html[bs2:]
tail_anchor = html.index('else{startOnline();}', bs2)
close_pos = html.index('</script>', tail_anchor)
html = html[:close_pos] + '}\n' + html[close_pos:]

# ---------- picker behaviour (runs last; the builder never boots) ----------
picker_script = ('<script>\n'
                 '/* Course picker: shown only when no (or an unknown) course\n'
                 '   was requested. The main script\'s boot sequence is\n'
                 '   guarded by window.__NOCOURSE, so the builder stays off.\n'
                 '   Courses are grouped by subject area (config key: subject)\n'
                 '   in a fixed order: Mathematics first, then Science (the\n'
                 '   chemistry and physics courses carry subject "Science"),\n'
                 '   then Mathématiques; any other subject follows in\n'
                 '   alphabetical order. Inside a group: highest grade first\n'
                 '   (config key: grade), then by course number. Two filter\n'
                 '   rows (Subject, Grade) narrow the list live; the plain\n'
                 '   grouped list is the default view. An entry with\n'
                 '   listed:false is fully ported and testable by its direct\n'
                 '   ?course= link but stays out of the picker until it\n'
                 '   passes (Jason, Nov 12, 2026). */\n'
                 'if(window.__NOCOURSE){(function(){\n'
                 '  var app=document.getElementById("app");if(app)app.style.display="none";\n'
                 '  var pk=document.getElementById("coursePicker");if(!pk)return;pk.hidden=false;\n'
                 '  var list=document.getElementById("courseList");if(!list)return;\n'
                 '  var style=document.createElement("style");\n'
                 '  style.textContent=".pkrow{margin:0 0 8px}.pkLab{display:inline-block;min-width:64px;font-weight:600}.pkchip{margin:0 4px 4px 0}.pkchip[aria-pressed=\'true\']{background:#1f4e79;border-color:#1f4e79;color:#fff}.pklogo{height:54px;width:auto;display:block;margin:0 0 16px}.pklogo-d{display:none}html[data-a11y-theme=\'dark\'] .pklogo-l{display:none}html[data-a11y-theme=\'dark\'] .pklogo-d{display:block}.pktag{font-size:17px}.pkheadrow{display:flex;align-items:center;justify-content:space-between;gap:12px}.pkheadright{display:flex;align-items:center;gap:14px}.pkwn{font-size:.85rem;color:#1f4e79;text-decoration:none}.pkwn:hover{text-decoration:underline}.pkprivacy{font-size:.8rem;opacity:.78;margin:6px 0 0}html[data-a11y-theme=\'dark\'] .pkwn{color:#5eead4}.pkfaq details{margin:0 0 6px}.pkfaq summary{cursor:pointer;font-weight:600;padding:4px 0}.pkfaq p{margin:4px 0 10px}.pkfaq ol{margin:4px 0 10px;padding-left:22px}.pkfaq li{margin:0 0 4px}.pkthemebtn{flex:none;font:inherit;font-size:.85rem;padding:5px 14px;border-radius:999px;border:1px solid #1f4e79;background:transparent;color:#1f4e79;cursor:pointer}html[data-a11y-theme=\'dark\'] .pkthemebtn{background:#5eead4;border-color:#5eead4;color:#0e1418}html[data-a11y-theme=\'dark\'] .pkchip[aria-pressed=\'true\']{background:#1f4e79;border-color:#5eead4;color:#fff}";\n'
                 '  pk.appendChild(style);\n'
                 '  var pkThemeBtn=document.getElementById("pkTheme");\n'
                 '  if(pkThemeBtn){var pkSyncTheme=function(){pkThemeBtn.textContent=document.documentElement.getAttribute("data-a11y-theme")==="dark"?"Light mode":"Dark mode";};pkSyncTheme();pkThemeBtn.addEventListener("click",function(){var dark=document.documentElement.getAttribute("data-a11y-theme")==="dark";if(dark){document.documentElement.removeAttribute("data-a11y-theme");}else{document.documentElement.setAttribute("data-a11y-theme","dark");}try{var st=window.localStorage;var g={};var raw=st.getItem("app-a11y-v1");if(raw){g=JSON.parse(raw)||{};}g.theme=dark?"light":"dark";st.setItem("app-a11y-v1",JSON.stringify(g));}catch(e){}pkSyncTheme();});}\n'
                 '  var groups={};\n'
                 '  Object.keys(window.COURSES||{}).forEach(function(id){\n'
                 '    var c=window.COURSES[id];if(c.listed===false)return;\n'
                 '    var s=c.subject||"Other";\n'
                 '    (groups[s]=groups[s]||[]).push([id,c]);\n'
                 '  });\n'
                 '  var ORDER=["Mathematics","Science","Mathématiques"];\n'
                 '  var subjects=Object.keys(groups).sort(function(a,b){var ia=ORDER.indexOf(a),ib=ORDER.indexOf(b);if(ia<0)ia=ORDER.length;if(ib<0)ib=ORDER.length;return (ia-ib)||(a<b?-1:(a>b?1:0));});\n'
                 '  function cnum(c){var m=String(c.shortName||"").match(/\\d+/);return m?parseInt(m[0],10):0;}\n'
                 '  var grades=[];\n'
                 '  subjects.forEach(function(s){groups[s].forEach(function(p){var g=p[1].grade||0;if(grades.indexOf(g)<0)grades.push(g);});});\n'
                 '  grades.sort(function(a,b){return b-a;});\n'
                 '  var fSubj="All",fGrade="All",chipBtns=[];\n'
                 '  function mkRow(label){var r=document.createElement("div");r.className="pkrow";var l=document.createElement("span");l.className="pkLab";l.textContent=label;r.appendChild(l);return r;}\n'
                 '  function syncChips(){chipBtns.forEach(function(x){x.b.setAttribute("aria-pressed",((x.kind==="s"?fSubj:fGrade)===x.val)?"true":"false");});}\n'
                 '  function mkChip(row,text,val,kind){var b=document.createElement("button");b.type="button";b.className="alt pkchip";b.textContent=text;b.setAttribute("aria-pressed",((kind==="s"?fSubj:fGrade)===val)?"true":"false");b.addEventListener("click",function(){if(kind==="s")fSubj=val;else fGrade=val;syncChips();applyFilter();});row.appendChild(b);chipBtns.push({b:b,kind:kind,val:val});}\n'
                 '  var chips=document.createElement("div");chips.id="pkChips";\n'
                 '  var rowS=mkRow("Subject:"),rowG=mkRow("Grade:");\n'
                 '  mkChip(rowS,"All","All","s");subjects.forEach(function(s){mkChip(rowS,s,s,"s");});\n'
                 '  mkChip(rowG,"All","All","g");grades.forEach(function(g){mkChip(rowG,"Grade "+g,String(g),"g");});\n'
                 '  chips.appendChild(rowS);chips.appendChild(rowG);list.parentNode.insertBefore(chips,list);\n'
                 '  var rendered=[];\n'
                 '  subjects.forEach(function(s){\n'
                 '    var h=document.createElement("h3");h.textContent=s;list.appendChild(h);\n'
                 '    var row=document.createElement("div");row.className="presetrow";list.appendChild(row);\n'
                 '    var btns=[];\n'
                 '    groups[s].sort(function(a,b){return (b[1].grade||0)-(a[1].grade||0)||(cnum(a[1])-cnum(b[1]))||(a[1].shortName<b[1].shortName?-1:1);}).forEach(function(pair){\n'
                 '      var id=pair[0],c=pair[1];\n'
                 '      var b=document.createElement("button");\n'
                 '      b.type="button";b.className="alt";b.textContent=c.shortName;\n'
                 '      b.addEventListener("click",function(){location.search="?course="+encodeURIComponent(id);});\n'
                 '      row.appendChild(b);btns.push({b:b,grade:c.grade||0});\n'
                 '    });\n'
                 '    rendered.push({s:s,h:h,row:row,btns:btns});\n'
                 '  });\n'
                 '  var none=document.createElement("p");none.textContent="No courses match that combination.";none.hidden=true;list.appendChild(none);\n'
                 '  function applyFilter(){\n'
                 '    var any=false;\n'
                 '    rendered.forEach(function(g){\n'
                 '      var vis=0;\n'
                 '      g.btns.forEach(function(x){var show=(fSubj==="All"||g.s===fSubj)&&(fGrade==="All"||String(x.grade)===fGrade);x.b.style.display=show?"":"none";if(show)vis++;});\n'
                 '      g.h.style.display=vis?"":"none";g.row.style.display=vis?"":"none";if(vis)any=true;\n'
                 '    });\n'
                 '    none.hidden=any;\n'
                 '  }\n'
                 '  applyFilter();\n'
                 '})();\n'
                 '}\n'
                 '</script>\n')

rep('</body>', picker_script + '</body>', count=1)

# ---------- branding and identifiers (run time, from the active course) ----------
# Nothing course-specific is baked into the shell: every string the chassis
# hardcoded for Math 2201 becomes a run-time read from window.__COURSE, so
# the one built file serves every registered course identically.
SN = '(window.__COURSE?window.__COURSE.shortName:"Course")'
SG = '(window.__COURSE?window.__COURSE.storagePrefix.toUpperCase():"APP")'
SP = '(window.__COURSE?window.__COURSE.storagePrefix:"app")'
AN = '(window.__COURSE?((window.__COURSE.appName)||(window.__COURSE.shortName+" Review")):"Review Apps")'
rep('var A11Y_KEY="m2201-a11y-v1";', 'var A11Y_KEY=' + SP + '+"-a11y-v1";', count=1)
rep('store.getItem("m2201-a11y-v1")', 'store.getItem(' + SP + '+"-a11y-v1")', count=1)
rep('(localStorage key m2201-a11y-v1)', '(localStorage key: the course storage prefix plus "-a11y-v1")', count=1)
rep('<h1>Math 2201 Review</h1>', '<h1 id="appTitle">Review Apps</h1>', count=1)
rep('Fresh practice questions for Mathematics 2201, drawn', 'Fresh practice questions for <span id="appSubName">your course</span>, drawn', count=1)
rep('\n  Most questions are generated new every time, so you can practise the same skill again and get a different question.\n  Work online, print a practice sheet, or build a practice exam.', '', count=1)
rep('    <p class="hint">Want different units, a printed sheet or a practice exam? Open "Build your own practice" below.</p>\n', '', count=1)
rep('<h2 style="margin-top:0;">Mathematics 2201 Review</h2>', '<h2 style="margin-top:0;" id="faceTitle">Review Apps</h2>', count=1)
rep('appName:"Math 2201 Review"', 'appName:' + AN, count=1)
rep('"Math 2201 Review - problem report"', AN + '+" - problem report"', count=1)
rep('"Math 2201: Practice Unit Test"', SN + '+": Practice Unit Test"', count=2)
rep('"Math 2201: Practice Exam"', SN + '+": Practice Exam"', count=2)
rep('"Math 2201 Practice Unit Test.docx"', SN + '+" Practice Unit Test.docx"', count=2)
rep('"Math 2201 Practice Exam.docx"', SN + '+" Practice Exam.docx"', count=2)
rep('"Math 2201 Practice Sheet.docx"', SN + '+" Practice Sheet.docx"', count=4)
rep('"Math 2201: Practice Sheet"', SN + '+": Practice Sheet"', count=1)
rep('"Math 2201 for Kahoot.xlsx"', SN + '+" for Kahoot.xlsx"', count=1)
rep('"Math 2201 for Blooket.csv"', SN + '+" for Blooket.csv"', count=1)
rep('"Math 2201 for Brightspace.zip"', SN + '+" for Brightspace.zip"', count=1)
rep('BS_QUIZ_FILE="quiz_d2l_M2201BS.xml",BS_QUIZ_TITLE="Math 2201 Review: Practice Set",BS_APP_NAME="Math 2201 Review"',
    'BS_QUIZ_FILE="quiz_d2l_"+' + SG + '+"BS.xml",BS_QUIZ_TITLE=' + AN + '+": Practice Set",BS_APP_NAME=' + AN, count=1)
rep('m2201review-\'+Q+\'', '\'+' + SP + '+\'review-\'+Q+\'', count=1)
rep('var fname="M2201Fig_"+poolNo', 'var fname=' + SG + '+"Fig_"+poolNo', count=1)
rep('res_quiz_M2201BS', "res_quiz'+" + SG + "+'BS", count=2)
rep('ident="M2201REVCAT" d2l_2p0:sortorder="1">Math 2201 Review</category>',
    "ident=\"'+" + SG + "+'REVCAT\" d2l_2p0:sortorder=\"1\">'+" + AN + "+'</category>", count=1)
rep('identifier="M2201_BS_EXPORT"', "identifier=\"'+" + SG + "+'_BS_EXPORT\"", count=1)
EXPKW = "'+(window.__COURSE?window.__COURSE.id.replace(/-/g,'_')+'_review_brightspace_export':'review_apps')+'"
rep('math_2201_review_brightspace_export', EXPKW, count=1)

# ---------- French string layer (student side; scoping item c4) ----------
# A run-time layer keyed on the active course's language field:
# when it is "fr", the student side renders in French; every
# other course keeps the existing English literals untouched
# (L9 returns its first argument, the English literal, whenever
# FR9 is false, so English rendering is unchanged by
# construction). The French strings are lifted from the French
# standalone (math-9-review-fr/index.html and its bank chassis),
# never newly translated. Coverage: the face card, the builder,
# the practice view, the set summary, the practice sheet and
# exam text and print furniture, paper titles, Word download
# filenames, and the report form (whose app name flows from
# the new optional appName config key, through AN above and
# the relabel below). Teacher-facing surfaces (the picker, the
# teacher bar, the advanced tools, the per-question teacher
# controls, the game and Brightspace exports) are deliberately
# not routed through the layer: they stay English, matching
# the French standalone, whose teacher chrome is English. The
# static builder and face markup is swapped by a boot pass
# (snippets/fr-static.js.txt) inserted with the relabel; the
# dynamic strings are L9 calls injected by the reps below.
frdefs = (ROOT / "snippets" / "fr-defs.js.txt").read_text(encoding="utf-8").rstrip("\n")
rep('function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}',
    'function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}\n' + frdefs, count=1)

# The header and the face heading honour appName when a course
# carries one (the French fork heads both spots "Révision de
# mathématiques 9"); every other course composes as before.
rep('__e.textContent=__c.shortName+" Review";',
    '__e.textContent=(__c.appName||(__c.shortName+" Review"));', count=1)
rep('__e3.textContent=(__c.longName||__c.shortName)+" Review";',
    '__e3.textContent=(__c.appName||((__c.longName||__c.shortName)+" Review"));', count=1)

# The static-markup pass runs with the relabel, inside the
# picker-mode boot guard, once the course is resolved.
frstatic = (ROOT / "snippets" / "fr-static.js.txt").read_text(encoding="utf-8").rstrip("\n")
rep('__e5.textContent=__c.presets.final.label;}',
    '__e5.textContent=__c.presets.final.label;}\n' + frstatic, count=1)

# Shared empty-selection strings (the practice view, the exam
# and the sheet all reuse them; the fork uses one wording).
rep('"No questions match that selection yet."',
    'L9("No questions match that selection yet.","Aucune question ne correspond encore à cette sélection.")', count=3)
rep('"Choose at least one unit above, or use the Mid-course review or Final review button, then start again."',
    'L9("Choose at least one unit above, or use the Mid-course review or Final review button, then start again.","Choisis au moins une unité ci-dessus, ou utilise le bouton Révision de mi-parcours ou Révision finale, puis recommence.")', count=1)
rep('"Choose at least one unit above \\u2014 or use the Mid-course review or Final review button \\u2014 then start again."',
    'L9("Choose at least one unit above, or use the Mid-course review or Final review button, then start again.","Choisis au moins une unité ci-dessus, ou utilise le bouton Révision de mi-parcours ou Révision finale, puis recommence.")', count=1)
rep('"Choose at least one unit above ,  or use the Mid-course review or Final review button ,  then start again."',
    'L9("Choose at least one unit above ,  or use the Mid-course review or Final review button ,  then start again.","Choisis au moins une unité ci-dessus, ou utilise le bouton Révision de mi-parcours ou Révision finale, puis recommence.")', count=1)

# Builder (dynamic parts): unit checkboxes, indicator list,
# pool summary, question tags, reference panel headings, and
# the settings-link status.
rep("'> Unit '+u+\": \"+UNITS[u]+\"</label>\"",
    "'> '+L9(\"Unit \",\"Unité \")+u+L9(\": \",\" : \")+UNITS[u]+\"</label>\"", count=1)
rep("\"> <b>\"+c+\"</b> \\u2014 \"+esc(INDICATORS[c]||\"\")+\"</label>\"",
    "\"> <b>\"+c+\"</b>\"+L9(\": \",\", \")+esc(INDICATORS[c]||\"\")+\"</label>\"", count=1)
rep("'<span class=\"hint\">Pick at least one unit above.</span>'",
    "'<span class=\"hint\">'+L9(\"Pick at least one unit above.\",\"Choisis au moins une unité ci-dessus.\")+'</span>'", count=1)
rep("\"Question bank for this selection: \"+p.length+\" question templates (Level 1: \"+byL[1]+\", Level 2: \"+byL[2]+\", Level 3: \"+byL[3]+\"). Generators make a fresh question every draw.\"",
    "L9(\"Question bank for this selection: \",\"Banque de questions pour cette sélection : \")+p.length+L9(\" question templates (Level 1: \",\" modèles de questions (Niveau 1 : \")+byL[1]+L9(\", Level 2: \",\", Niveau 2 : \")+byL[2]+L9(\", Level 3: \",\", Niveau 3 : \")+byL[3]+L9(\"). Generators make a fresh question every draw.\",\"). Les générateurs créent une nouvelle question à chaque tirage.\")", count=1)
rep("\"No questions match that selection yet \\u2014 try adding a unit or clearing the indicator filter.\"",
    "L9(\"No questions match that selection yet, try adding a unit or clearing the indicator filter.\",\"Aucune question ne correspond encore à cette sélection, essaie d'ajouter une unité ou d'effacer le filtre des indicateurs.\")", count=1)
rep("'<span class=\"tag\">Unit '+e.unit+'</span> <span class=\"tag ind\">'+e.indicators.join(\", \")+'</span> <span class=\"tag lvl\">Level '+e.level+'</span>'",
    "'<span class=\"tag\">'+L9(\"Unit \",\"Unité \")+e.unit+'</span> <span class=\"tag ind\">'+e.indicators.join(\", \")+'</span> <span class=\"tag lvl\">'+L9(\"Level \",\"Niveau \")+e.level+'</span>'", count=1)
rep("'<details class=\"refpanel\"><summary>Formulas and facts for Unit '+u+\": \"+UNITS[u]+'</summary>",
    "'<details class=\"refpanel\"><summary>'+L9(\"Formulas and facts for Unit \",\"Formules et notions pour l'unité \")+u+L9(\": \",\" : \")+UNITS[u]+'</summary>", count=1)
rep("$(\"poolInfo\").textContent=\"Link copied (or copy it from the address bar): \"+url;",
    "$(\"poolInfo\").textContent=L9(\"Link copied (or copy it from the address bar): \",\"Lien copié (ou copie-le depuis la barre d'adresse) : \")+url;", count=1)

# Face card: scope line (the preset face labels convert with a
# French space before the colon, as the fork's face renders
# them: "Révision de mi-parcours : unités 1 à 4"), the unit
# list, the indicator suffix and the description.
rep("scope=\"No units chosen yet\";",
    "scope=L9(\"No units chosen yet\",\"Aucune unité choisie pour le moment\");", count=1)
rep('.replace(" (",": ")', '.replace(" (",L9(": "," : "))', count=2)
rep('return "Unit "+x+": "+UNITS[x];',
    'return L9("Unit ","Unité ")+x+L9(": "," : ")+UNITS[x];', count=1)
rep('scope+=" (indicators: "+state.inds.join(", ")+")";',
    'scope+=L9(" (indicators: "," (notions : ")+state.inds.join(", ")+")";', count=1)
rep('var chk=$("chkIn").value==="each"?"checked as you go":"checked all at the end";',
    'var chk=$("chkIn").value==="each"?L9("checked as you go","vérifiées au fur et à mesure"):L9("checked all at the end","vérifiées toutes à la fin");', count=1)
rep('d=n+" practice questions, "+chk+". Every question has "+(window.__COURSE&&window.__COURSE.hints?"a hint, ":"")+"a worked example and a full worked solution.";',
    'd=FR9?(n+" questions de pratique, "+chk+", avec un indice, un exemple travaillé et une solution détaillée complète pour chaque question."):(n+" practice questions, "+chk+". Every question has "+(window.__COURSE&&window.__COURSE.hints?"a hint, ":"")+"a worked example and a full worked solution.");', count=1)
rep('d+=" Your teacher picked these problems, so everyone gets the same set.";',
    'd+=L9(" Your teacher picked these problems, so everyone gets the same set."," Ton enseignant a choisi ces problèmes, alors tout le monde a la même série.");', count=1)

# Practice view: heading, thin-bank note, answer row, the
# buttons, the worked solution heading and the report block.
# The e-notation typing hint has no counterpart in the fork
# (its practice view carries no such line), so French courses
# do not render it.
rep("'\"><h2>Online practice</h2>'+",
    "'\"><h2>'+L9(\"Online practice\",\"Pratique en ligne\")+'</h2>'+", count=1)
rep("'<p class=\"thinNote\">Heads up: the question bank is still thin for this selection, so this set repeats practice on the same question shape (with new numbers) because there are not yet enough different questions to fill it.</p>'",
    "'<p class=\"thinNote\">'+L9(\"Heads up: the question bank is still thin for this selection, so this set repeats practice on the same question shape (with new numbers) because there are not yet enough different questions to fill it.\",\"Attention : la banque de questions est encore mince pour cette sélection, alors cette série répète la pratique sur la même forme de question (avec de nouveaux nombres), car il n'y a pas encore assez de questions différentes pour la remplir.\")+'</p>'", count=1)
rep("html+='<p>Your answer: <input type=\"text\" class=\"ans\" id=\"ans'+i+'\" autocomplete=\"off\"></p>';",
    "html+='<p>'+L9(\"Your answer: \",\"Ta réponse : \")+'<input type=\"text\" class=\"ans\" id=\"ans'+i+'\" autocomplete=\"off\"></p>';", count=1)
rep("if(q.type===\"num\")html+='<p class=\"hint\">Very small or large answers can be typed like 7.94e-9.</p>';",
    "if(q.type===\"num\"&&!FR9)html+='<p class=\"hint\">Very small or large answers can be typed like 7.94e-9.</p>';", count=1)
rep("html+='<p><button type=\"button\" data-check=\"'+i+'\">Check</button> '+(window.__COURSE&&window.__COURSE.hints?'<button type=\"button\" class=\"alt\" data-hint=\"'+i+'\">Hint</button> ':'')+'<button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">See a worked example</button> <button type=\"button\" class=\"alt\" data-sol=\"'+i+'\">Show worked solution</button></p>",
    "html+='<p><button type=\"button\" data-check=\"'+i+'\">'+L9(\"Check\",\"Vérifier\")+'</button> '+(window.__COURSE&&window.__COURSE.hints?'<button type=\"button\" class=\"alt\" data-hint=\"'+i+'\">'+L9(\"Hint\",\"Indice\")+'</button> ':'')+'<button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">'+L9(\"See a worked example\",\"Voir un exemple travaillé\")+'</button> <button type=\"button\" class=\"alt\" data-sol=\"'+i+'\">'+L9(\"Show worked solution\",\"Voir la solution détaillée\")+'</button></p>", count=1)
rep("<div class=\"sol\" id=\"sol'+i+'\"><b>Worked solution:</b> '+stepHTML(q.solution)+'</div>'",
    "<div class=\"sol\" id=\"sol'+i+'\"><b>'+L9(\"Worked solution:\",\"Solution détaillée :\")+'</b> '+stepHTML(q.solution)+'</div>'", count=1)
rep("data-rep=\"'+i+'\">Report a problem</button>",
    "data-rep=\"'+i+'\">'+L9(\"Report a problem\",\"Signaler un problème\")+'</button>", count=1)
rep("<label>What is the problem?<select id=\"reptype'+i+'\"><option>The question looks wrong or unclear</option><option>The worked solution doesn\\'t work out</option><option>My answer was marked wrong but should be right</option><option>Something else is out of place</option></select></label>",
    "<label>'+L9(\"What is the problem?\",\"Quel est le problème ?\")+'<select id=\"reptype'+i+'\"><option>'+L9(\"The question looks wrong or unclear\",\"La question semble fausse ou peu claire\")+'</option><option>'+L9(\"The worked solution doesn't work out\",\"La solution détaillée ne fonctionne pas\")+'</option><option>'+L9(\"My answer was marked wrong but should be right\",\"Ma réponse a été marquée fausse, mais elle devrait être bonne\")+'</option><option>'+L9(\"Something else is out of place\",\"Quelque chose d'autre ne va pas\")+'</option></select></label>", count=1)
rep("'<label>Anything you noticed (optional)<textarea id=\"repnote'+i+'\" rows=\"3\"></textarea></label>'",
    "'<label>'+L9(\"Anything you noticed (optional)\",\"Ce que tu as remarqué (facultatif)\")+'<textarea id=\"repnote'+i+'\" rows=\"3\"></textarea></label>'", count=1)
rep("'<p><button type=\"button\" data-repsend=\"'+i+'\">Send report</button> <button type=\"button\" class=\"alt\" data-repcopy=\"'+i+'\">Copy report text instead</button></p>'",
    "'<p><button type=\"button\" data-repsend=\"'+i+'\">'+L9(\"Send report\",\"Envoyer le rapport\")+'</button> <button type=\"button\" class=\"alt\" data-repcopy=\"'+i+'\">'+L9(\"Copy report text instead\",\"Copier le texte du rapport plutôt\")+'</button></p>'", count=1)
rep("'<p><button type=\"button\" data-repcopy=\"'+i+'\">Copy report text</button></p>'",
    "'<p><button type=\"button\" data-repcopy=\"'+i+'\">'+L9(\"Copy report text\",\"Copier le texte du rapport\")+'</button></p>'", count=1)
rep("'<button type=\"button\" id=\"gradeBtn\">Check all my answers</button> '",
    "'<button type=\"button\" id=\"gradeBtn\">'+L9(\"Check all my answers\",\"Vérifier toutes mes réponses\")+'</button> '", count=1)
rep("'<button type=\"button\" id=\"againBtn\">New set of questions</button>",
    "'<button type=\"button\" id=\"againBtn\">'+L9(\"New set of questions\",\"Nouvelle série de questions\")+'</button>", count=1)

# Score line, checking and grading. The numeric branches are
# scoping item c3: in French courses the typed answer is read
# with the fork's own parser (decimal comma, spaced
# thousands); English parsing is untouched.
rep("$(\"score\").textContent=endGraded?(\"You scored \"+correctCount+\" of \"+current.length+\" \\u2014 \"+Math.round(100*correctCount/current.length)+\"%. The worked solutions are open below so you can review each question.\"):\"Answer all the questions, then check them all at the end.\";",
    "$(\"score\").textContent=endGraded?(FR9?(\"Tu as obtenu \"+correctCount+\" sur \"+current.length+\", soit \"+Math.round(100*correctCount/current.length)+\" %. Les solutions détaillées sont ouvertes ci-dessous pour que tu puisses revoir chaque question.\"):(\"You scored \"+correctCount+\" of \"+current.length+\", \"+Math.round(100*correctCount/current.length)+\"%. The worked solutions are open below so you can review each question.\")):L9(\"Answer all the questions, then check them all at the end.\",\"Réponds à toutes les questions, puis vérifie-les toutes à la fin.\");", count=1)
rep("$(\"score\").textContent=checkedCount?(\"Score so far: \"+correctCount+\" of \"+checkedCount+\" checked.\"):\"Check each question as you go \\u2014 the worked solution is there when you want it.\";",
    "$(\"score\").textContent=checkedCount?(FR9?(\"Pointage jusqu'à présent : \"+correctCount+\" sur \"+checkedCount+\" vérifiées.\"):(\"Score so far: \"+correctCount+\" of \"+checkedCount+\" checked.\")):L9(\"Check each question as you go, the worked solution is there when you want it.\",\"Vérifie chaque question au fur et à mesure, la solution détaillée est là quand tu en as besoin.\");", count=1)
rep("'<span class=\"notyet\">Pick an option first.</span>'",
    "'<span class=\"notyet\">'+L9(\"Pick an option first.\",\"Choisis d'abord une option.\")+'</span>'", count=1)
rep("else if(q.type===\"num\"){var v=parseFloat(($(\"ans\"+i).value||\"\").replace(/[$,%\\u00B0]/g,\"\"));",
    "else if(q.type===\"num\"){var v=FR9?frParseNum(($(\"ans\"+i).value||\"\")):parseFloat(($(\"ans\"+i).value||\"\").replace(/[$,%\\u00B0]/g,\"\"));", count=1)
rep("'<span class=\"notyet\">Type a number first.</span>'",
    "'<span class=\"notyet\">'+L9(\"Type a number first.\",\"Entre d'abord un nombre.\")+'</span>'", count=1)
rep("fb.innerHTML=ok?'<span class=\"ok\">Correct.</span> Nice work.':(checkMode===\"end\"?'<span class=\"notyet\">Not quite.</span> The worked solution is open below.':'<span class=\"notyet\">Not quite.</span> Try again, or open the worked solution.');",
    "fb.innerHTML=ok?('<span class=\"ok\">'+L9(\"Correct.\",\"Exact.\")+'</span> '+L9(\"Nice work.\",\"Beau travail.\")):(checkMode===\"end\"?('<span class=\"notyet\">'+L9(\"Not quite.\",\"Pas tout à fait.\")+'</span> '+L9(\"The worked solution is open below.\",\"La solution détaillée est ouverte ci-dessous.\")):('<span class=\"notyet\">'+L9(\"Not quite.\",\"Pas tout à fait.\")+'</span> '+L9(\"Try again, or open the worked solution.\",\"Essaie encore, ou ouvre la solution détaillée.\")));", count=1)
rep("\"<b>About your answer:</b> \"+stepHTML(q.fb[given])",
    "\"<b>\"+L9(\"About your answer:\",\"À propos de ta réponse :\")+\"</b> \"+stepHTML(q.fb[given])", count=1)
rep("else if(q.type===\"num\")answered=!isNaN(parseFloat(($(\"ans\"+i).value||\"\").replace(/[$,%\\u00B0]/g,\"\")));",
    "else if(q.type===\"num\")answered=!isNaN(FR9?frParseNum(($(\"ans\"+i).value||\"\")):parseFloat(($(\"ans\"+i).value||\"\").replace(/[$,%\\u00B0]/g,\"\")));", count=1)
rep("fb.innerHTML='<span class=\"notyet\">No answer given.</span> The worked solution is open below.';",
    "fb.innerHTML='<span class=\"notyet\">'+L9(\"No answer given.\",\"Aucune réponse donnée.\")+'</span> '+L9(\"The worked solution is open below.\",\"La solution détaillée est ouverte ci-dessous.\");", count=1)
rep("b.textContent=\"Answers checked\";",
    "b.textContent=L9(\"Answers checked\",\"Réponses vérifiées\");", count=3)

# Hints and worked examples: labels and the fallback hint.
# The shell's hint cycle behaviour (stage 1, stage 2, off) is
# unchanged; only the wording follows the course language.
rep("\"Look at the worked example for this kind of question, then try the same first move here.\"",
    "L9(\"Look at the worked example for this kind of question, then try the same first move here.\",\"Regarde l'exemple travaillé pour ce type de question, puis essaie le même premier pas ici.\")", count=1)
rep("\"<b>Hint:</b> \"+first",
    "\"<b>\"+L9(\"Hint:\",\"Indice :\")+\"</b> \"+first", count=2)
rep("\"<br><b>First step:</b> \"+stepHTML(h2)",
    "\"<br><b>\"+L9(\"First step:\",\"Premier pas :\")+\"</b> \"+stepHTML(h2)", count=1)
rep("var h='<b>Worked example</b> (same skill, different numbers; not scored)<div class=\"prompt\">'",
    "var h='<b>'+L9(\"Worked example\",\"Exemple travaillé\")+'</b> '+L9(\"(same skill, different numbers; not scored)\",\"(même habileté, nombres différents; non noté)\")+'<div class=\"prompt\">'", count=1)
rep("\" <b>\\u2713 correct</b>\"",
    "\" <b>\\u2713 \"+L9(\"correct\",\"bonne réponse\")+\"</b>\"", count=1)
rep("h+=\"<p>Answer: <b>\"+fmt(exq.answer)+\"</b></p>\";",
    "h+=\"<p>\"+L9(\"Answer: \",\"Réponse : \")+\"<b>\"+fmtAns(exq.answer)+\"</b></p>\";", count=1)
rep("h+=\"<p>Answer: <b>\"+esc(exq.answers[0])+\"</b></p>\";",
    "h+=\"<p>\"+L9(\"Answer: \",\"Réponse : \")+\"<b>\"+esc(exq.answers[0])+\"</b></p>\";", count=1)
rep("'<div class=\"sol show\"><b>Worked Example Solution:</b> '",
    "'<div class=\"sol show\"><b>'+L9(\"Worked Example Solution:\",\"Solution de l'exemple travaillé :\")+'</b> '", count=1)
rep("data-exanother=\"'+i+'\">Show another example</button>",
    "data-exanother=\"'+i+'\">'+L9(\"Show another example\",\"Voir un autre exemple\")+'</button>", count=1)
rep("open?\"Hide worked example\":\"See a worked example\"",
    "open?L9(\"Hide worked example\",\"Masquer l'exemple travaillé\"):L9(\"See a worked example\",\"Voir un exemple travaillé\")", count=1)
rep("open?\"Hide worked solution\":\"Show worked solution\"",
    "open?L9(\"Hide worked solution\",\"Masquer la solution détaillée\"):L9(\"Show worked solution\",\"Voir la solution détaillée\")", count=1)

# Set summary.
rep("var h='<div class=\"summarybox\"><h3>Set complete</h3><p>You scored '+correctCount+\" of \"+current.length+\" on first checks.</p>\";",
    "var h='<div class=\"summarybox\"><h3>'+L9(\"Set complete\",\"Série terminée\")+'</h3><p>'+(FR9?(\"Tu as obtenu \"+correctCount+\" sur \"+current.length+\" aux premières vérifications.\"):(\"You scored \"+correctCount+\" of \"+current.length+\" on first checks.\"))+\"</p>\";", count=1)
rep("\"<p><b>Indicators to practise more:</b></p><ul>\"",
    "\"<p><b>\"+L9(\"Indicators to practise more:\",\"Notions à pratiquer davantage :\")+\"</b></p><ul>\"", count=1)
rep("\"<li>\"+c+\": \"+(INDICATORS[c]||\"\")+\"</li>\"",
    "\"<li>\"+c+L9(\": \",\" : \")+(INDICATORS[c]||\"\")+\"</li>\"", count=1)
rep("id=\"retryMissedBtn\">Practice what I missed</button>",
    "id=\"retryMissedBtn\">'+L9(\"Practice what I missed\",\"Pratiquer ce que j'ai manqué\")+'</button>", count=1)
rep("\"<p>Every indicator in this set was answered correctly on its first check. Nice work.</p>\"",
    "\"<p>\"+L9(\"Every indicator in this set was answered correctly on its first check. Nice work.\",\"Chaque notion de cette série a été réussie à la première vérification. Beau travail.\")+\"</p>\"", count=1)

# Problem report: the composed report text and both statuses
# (the form's app name itself flows from appName through AN).
rep("+\" - problem report\"",
    "+L9(\" - problem report\",\" - rapport de problème\")", count=1)
rep("\"Entry: \"+e.id+\" | Unit \"+e.unit+\" (\"+UNITS[e.unit]+\") | Indicators: \"+e.indicators.join(\", \")+\" | Level \"+e.level",
    "L9(\"Entry: \",\"Entrée : \")+e.id+L9(\" | Unit \",\" | Unité \")+e.unit+\" (\"+UNITS[e.unit]+\")\"+L9(\" | Indicators: \",\" | Notions : \")+e.indicators.join(\", \")+L9(\" | Level \",\" | Niveau \")+e.level", count=1)
rep("\"Problem type: \"+reason",
    "L9(\"Problem type: \",\"Type de problème : \")+reason", count=1)
rep("\"Question: \"+plainText(q.prompt)",
    "L9(\"Question: \",\"Question : \")+plainText(q.prompt)", count=1)
rep("\"Diagram: this question is shown with a diagram in the app; its labels match the values in the question.\"",
    "L9(\"Diagram: this question is shown with a diagram in the app; its labels match the values in the question.\",\"Figure : cette question est présentée avec une figure dans l'application; les étiquettes correspondent aux valeurs de la question.\")", count=1)
rep("lines.push(\"Options:\");",
    "lines.push(L9(\"Options:\",\"Choix :\"));", count=1)
rep("\"  [marked as the correct answer]\"",
    "L9(\"  [marked as the correct answer]\",\"  [indiquée comme la bonne réponse]\")", count=1)
rep("\"Stated answer: \"+q.answer",
    "L9(\"Stated answer: \",\"Réponse attendue : \")+q.answer", count=1)
rep("\"Accepted answer(s): \"+q.answers.join(\" / \")",
    "L9(\"Accepted answer(s): \",\"Réponse(s) acceptée(s) : \")+q.answers.join(\" / \")", count=1)
rep("\"Worked solution: \"+plainText(q.solution)",
    "L9(\"Worked solution: \",\"Solution détaillée : \")+plainText(q.solution)", count=1)
rep("(\"\\nReporter note: \"+note)",
    "(\"\\n\"+L9(\"Reporter note: \",\"Note ajoutée : \")+note)", count=2)
rep("var unit=\"Unit \"+e.unit+\" (\"+UNITS[e.unit]+\") | Indicators: \"+e.indicators.join(\", \");",
    "var unit=L9(\"Unit \",\"Unité \")+e.unit+\" (\"+UNITS[e.unit]+\")\"+L9(\" | Indicators: \",\" | Notions : \")+e.indicators.join(\", \");", count=1)
rep("$(\"repstat\"+i).textContent=\"The report form opened in a new tab with everything filled in - just press Submit there. Thank you for flagging it.\";",
    "$(\"repstat\"+i).textContent=L9(\"The report form opened in a new tab with everything filled in - just press Submit there. Thank you for flagging it.\",\"Le formulaire de rapport s'est ouvert dans un nouvel onglet avec tout déjà rempli : appuie simplement sur Envoyer là-bas. Merci de l'avoir signalé.\");", count=1)
rep("$(\"repstat\"+i).textContent=\"Report copied - paste it to your teacher. Thank you for flagging it.\";",
    "$(\"repstat\"+i).textContent=L9(\"Report copied - paste it to your teacher. Thank you for flagging it.\",\"Rapport copié : colle-le et envoie-le à ton enseignant. Merci de l'avoir signalé.\");", count=1)

# Practice exam: scope, paper titles and Word filenames (the
# fork's forms: "Mathématiques 9 : Examen de pratique",
# "Mathématiques 9 - Examen de pratique.docx"), the paper and
# key text, the ready card and the timer bar. The edited-paper
# footnote and note stay English in the fork itself (they are
# teacher-edit surfaces), so only the unedited blueprint
# footnote is routed through the layer.
rep("var scope=single?(\"Unit \"+s.units[0]+\" \\u00B7 \"+UNITS[s.units[0]]):s.units.map(function(u){return \"Unit \"+u;}).join(\", \");",
    "var scope=single?(L9(\"Unit \",\"Unité \")+s.units[0]+\" \\u00B7 \"+UNITS[s.units[0]]):s.units.map(function(u){return L9(\"Unit \",\"Unité \")+u;}).join(\", \");", count=2)
rep("var title=single?(window.__COURSE?window.__COURSE.shortName:\"Course\")+\": Practice Unit Test\":(window.__COURSE?window.__COURSE.shortName:\"Course\")+\": Practice Exam\";",
    "var title=single?(FR9?((window.__COURSE?window.__COURSE.shortName:\"Course\")+\" : Test de pratique\"):((window.__COURSE?window.__COURSE.shortName:\"Course\")+\": Practice Unit Test\")):(FR9?((window.__COURSE?window.__COURSE.shortName:\"Course\")+\" : Examen de pratique\"):((window.__COURSE?window.__COURSE.shortName:\"Course\")+\": Practice Exam\"));", count=2)
rep("wordName=single?(window.__COURSE?window.__COURSE.shortName:\"Course\")+\" Practice Unit Test.docx\":(window.__COURSE?window.__COURSE.shortName:\"Course\")+\" Practice Exam.docx\";",
    "wordName=single?(window.__COURSE?window.__COURSE.shortName:\"Course\")+L9(\" Practice Unit Test.docx\",\" - Test de pratique.docx\"):(window.__COURSE?window.__COURSE.shortName:\"Course\")+L9(\" Practice Exam.docx\",\" - Examen de pratique.docx\");", count=2)
rep("'<div class=\"nameline\"><div>Name:<span></span></div><div>Date:<span></span></div></div>'",
    "'<div class=\"sheetbrand\"><img src=\"cdli-logo.svg\" alt=\"CDLI\"></div><div class=\"nameline\"><div>'+L9(\"Name:\",\"Nom :\")+'<span></span></div><div>'+L9(\"Date:\",\"Date :\")+'<span></span></div></div>'", count=2)
rep("<p>'+scope+' \\u00B7 Total marks: '+lv.total+'</p>'",
    "<p>'+scope+' \\u00B7 '+L9(\"Total marks: \",\"Total des points : \")+lv.total+'</p>'", count=2)
rep("'<p style=\"font-size:.92rem;\">Answer all questions. In Section A, choose the best answer for each question and record it on the answer record at the end of Section A. In Section B, show all workings in the space provided; marks are shown beside each question.</p>'",
    "'<p style=\"font-size:.92rem;\">'+L9(\"Answer all questions. In Section A, choose the best answer for each question and record it on the answer record at the end of Section A. In Section B, show all workings in the space provided; marks are shown beside each question.\",\"Réponds à toutes les questions. Dans la section A, choisis la meilleure réponse pour chaque question et inscris-la dans le relevé de réponses à la fin de la section A. Dans la section B, montre tout ton travail dans l'espace fourni; les points sont indiqués à côté de chaque question.\")+'</p>'", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Section A: Selected Response ('+lv.sr+' marks)</h2>'",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Section A: Selected Response (\",\"Section A : Réponses choisies (\")+lv.sr+L9(\" marks)\",\" points)\")+'</h2>'", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Answer record</h2><p style=\"font-size:.92rem;\">Circle one letter for each Section A question.</p>'",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Answer record\",\"Relevé de réponses\")+'</h2><p style=\"font-size:.92rem;\">'+L9(\"Circle one letter for each Section A question.\",\"Encercle une lettre pour chaque question de la section A.\")+'</p>'", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Section B: Constructed Response ('+lv.cr+' marks)</h2>'",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Section B: Constructed Response (\",\"Section B : Réponses construites (\")+lv.cr+L9(\" marks)\",\" points)\")+'</h2>'", count=1)
rep("'<p>No constructed-response questions are available for this selection yet.</p>'",
    "'<p>'+L9(\"No constructed-response questions are available for this selection yet.\",\"Aucune question à réponse construite n'est disponible pour cette sélection pour le moment.\")+'</p>'", count=1)
rep("<span style=\"font-size:.85rem;color:#555;\">('+it.marks+' marks)</span>",
    "<span style=\"font-size:.85rem;color:#555;\">('+it.marks+L9(\" marks\",\" points\")+'</span>", count=1)
rep("(\"Built to the 2026-2027 tables of specifications as closely as the question bank allows: selected response \"+lv.sr+\" marks, constructed response \"+lv.cr+\" marks, of which Level 3 carries \"+lv.l3+\" marks.\")",
    "(FR9?(\"Construit selon les tableaux de spécifications 2026-2027, aussi fidèlement que la banque de questions le permet : réponses choisies \"+lv.sr+\" points, réponses construites \"+lv.cr+\" points, dont le niveau 3 vaut \"+lv.l3+\" points.\"):(\"Built to the 2026-2027 tables of specifications as closely as the question bank allows: selected response \"+lv.sr+\" marks, constructed response \"+lv.cr+\" marks, of which Level 3 carries \"+lv.l3+\" marks.\"))", count=1)
rep("'<h1 style=\"font-size:1.3rem;\">'+title+': Answer Key</h1>",
    "'<div class=\"sheetbrand\"><img src=\"cdli-logo.svg\" alt=\"CDLI\"></div><h1 style=\"font-size:1.3rem;\">'+title+L9(\": Answer Key\",\" : Corrigé\")+'</h1>", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Section A answers</h2><p style=\"font-size:.92rem;\">The correct letter for each question, in the same layout as the answer record on the student paper.</p>'",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Section A answers\",\"Réponses de la section A\")+'</h2><p style=\"font-size:.92rem;\">'+L9(\"The correct letter for each question, in the same layout as the answer record on the student paper.\",\"La bonne lettre pour chaque question, dans la même disposition que le relevé de réponses sur la copie de l'élève.\")+'</p>'", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Section B: worked solutions</h2>'",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Section B: worked solutions\",\"Section B : solutions détaillées\")+'</h2>'", count=1)
rep("(q.type===\"num\"?fmt(q.answer):esc(q.answers[0]))",
    "(q.type===\"num\"?fmtAns(q.answer):esc(q.answers[0]))", count=2)
rep("'<div class=\"solp\"><p><b>'+m+'.</b> Answer: <b>'+ans+'</b> ('+it.marks+' marks)</p>",
    "'<div class=\"solp\"><p><b>'+m+'.</b> '+L9(\"Answer: \",\"Réponse : \")+'<b>'+ans+'</b> ('+it.marks+L9(\" marks\",\" points\")+'</p>", count=1)
rep("'<h2 style=\"font-size:1.05rem;\">Appendix: Section A worked solutions</h2>",
    "'<h2 style=\"font-size:1.05rem;\">'+L9(\"Appendix: Section A worked solutions\",\"Annexe : solutions détaillées de la section A\")+'</h2>", count=1)
rep("'<div class=\"card\"><p>Your '+(single?\"practice unit test\":\"practice exam\")+' is ready: '+ex.srItems.length+' selected-response questions and '+ex.crItems.length+' constructed-response questions, '+lv.total+' marks in total. The exam paper and the answer key print separately.</p>'",
    "'<div class=\"card\"><p>'+(FR9?(\"Ton \"+(single?\"test de pratique\":\"examen de pratique\")+\" est prêt : \"+ex.srItems.length+\" questions à réponses choisies et \"+ex.crItems.length+\" questions à réponses construites, \"+lv.total+\" points au total. La copie d'examen et le corrigé s'impriment séparément.\"):(\"Your \"+(single?\"practice unit test\":\"practice exam\")+\" is ready: \"+ex.srItems.length+\" selected-response questions and \"+ex.crItems.length+\" constructed-response questions, \"+lv.total+\" marks in total. The exam paper and the answer key print separately.\"))+'</p>'", count=1)
rep("'<p class=\"thinNote\">Heads up: the bank could not fill every exam slot for this selection yet, so this paper runs short of the full blueprint.</p>'",
    "'<p class=\"thinNote\">'+L9(\"Heads up: the bank could not fill every exam slot for this selection yet, so this paper runs short of the full blueprint.\",\"Attention : la banque n'a pas encore pu remplir toutes les places de l'examen pour cette sélection, alors cette copie est plus courte que le plan complet.\")+'</p>'", count=1)
rep("id=\"printPaperBtn\">Print the exam paper</button>",
    "id=\"printPaperBtn\">'+L9(\"Print the exam paper\",\"Imprimer la copie d'examen\")+'</button>", count=1)
rep("id=\"printKeyBtn\" class=\"sec\">Print the answer key</button>",
    "id=\"printKeyBtn\" class=\"sec\">'+L9(\"Print the answer key\",\"Imprimer le corrigé\")+'</button>", count=1)
rep("\">Download Word file</button>",
    "\">'+L9(\"Download Word file\",\"Télécharger le fichier Word\")+'</button>", count=2)
rep("\">Copy for Google Docs</button>",
    "\">'+L9(\"Copy for Google Docs\",\"Copier pour Google Docs\")+'</button>", count=2)
rep("tc.textContent=\"Time so far: \"+mm+\":\"+(ss<10?\"0\":\"\")+ss+",
    "tc.textContent=FR9?(\"Temps écoulé : \"+mm+\":\"+(ss<10?\"0\":\"\")+ss+\"  \\u00B7  \"+((window.__COURSE&&window.__COURSE.timerNote)?(\"L'examen réel accorde \"+window.__COURSE.timerNote+\". Ce minuteur est seulement un guide.\"):\"Ce minuteur est seulement un guide.\")):(\"Time so far: \"+mm+\":\"+(ss<10?\"0\":\"\")+ss+", count=1)
rep(":\"This timer is just a guide.\")+\"\";",
    ":\"This timer is just a guide.\")+\"\");", count=1)

# Practice sheet: counts message, Word filename, title, header
# meta, per-question meta, footer note, answer key, ready
# card and buttons. (The header's work instruction itself is
# the per-course sheetWork pair, ruling 4.)
rep("'<div class=\"card\"><p>Set the Multiple choice and Constructed Response counts to at least one question in total, then make the sheet again.</p></div>'",
    "'<div class=\"card\"><p>'+L9(\"Set the Multiple choice and Constructed Response counts to at least one question in total, then make the sheet again.\",\"Règle les nombres de questions à choix multiple et à réponse construite à au moins une question au total, puis refais la feuille.\")+'</p></div>'", count=1)
rep("wordName=(window.__COURSE?window.__COURSE.shortName:\"Course\")+\" Practice Sheet.docx\";",
    "wordName=(window.__COURSE?window.__COURSE.shortName:\"Course\")+L9(\" Practice Sheet.docx\",\" - Feuille de pratique.docx\");", count=4)
rep("var unitNames=s.units.map(function(u){return \"Unit \"+u;}).join(\", \");",
    "var unitNames=s.units.map(function(u){return L9(\"Unit \",\"Unité \")+u;}).join(\", \");", count=1)
rep("(window.__COURSE?window.__COURSE.shortName:\"Course\")+\": Practice Sheet\"",
    "(window.__COURSE?window.__COURSE.shortName:\"Course\")+L9(\": Practice Sheet\",\" : Feuille de pratique\")", count=1)
rep("(\" \\u00B7 Indicators: \"+s.inds.join(\", \"))",
    "(\" \\u00B7 \"+L9(\"Indicators: \",\"Notions : \")+s.inds.join(\", \"))", count=1)
rep("(Unit '+q._entry.unit+' \\u00B7 '+q._entry.indicators.join(\", \")+' \\u00B7 Level '+q._entry.level+')",
    "('+L9(\"Unit \",\"Unité \")+q._entry.unit+' \\u00B7 '+q._entry.indicators.join(\", \")+' \\u00B7 '+L9(\"Level \",\"Niveau \")+q._entry.level+')", count=1)
rep("'<p style=\"font-size:.85rem;color:#555;\">Spotted a problem with a question on this sheet? Write down its unit and question number and let your teacher know.</p>'",
    "'<p style=\"font-size:.85rem;color:#555;\">'+L9(\"Spotted a problem with a question on this sheet? Write down its unit and question number and let your teacher know.\",\"Tu as repéré un problème dans une question de cette feuille ? Note son unité et son numéro de question et dis-le à ton enseignant.\")+'</p>'", count=1)
rep("'<div class=\"keybreak\"><h1 style=\"font-size:1.3rem;\">Answer Key, with worked solutions</h1>'",
    "'<div class=\"keybreak\"><h1 style=\"font-size:1.3rem;\">'+L9(\"Answer Key, with worked solutions\",\"Corrigé, avec solutions détaillées\")+'</h1>'", count=1)
rep("'<div class=\"solp\"><p><b>'+(i+1)+'.</b> Answer: <b>'+ans+'</b></p>",
    "'<div class=\"solp\"><p><b>'+(i+1)+'.</b> '+L9(\"Answer: \",\"Réponse : \")+'<b>'+ans+'</b></p>", count=1)
rep("'<div class=\"card\"><p>Your practice sheet is ready ('+res.items.length+' questions'+(s.wantKey?', with the answer key on its own pages at the end':'')+'). It is shown below, exactly as it will print.</p>'",
    "'<div class=\"card\"><p>'+(FR9?(\"Ta feuille de pratique est prête (\"+res.items.length+\" questions\"+(s.wantKey?\", avec le corrigé sur ses propres pages à la fin\":\"\")+\"). Elle est montrée ci-dessous, exactement comme elle s'imprimera.\"):(\"Your practice sheet is ready (\"+res.items.length+\" questions\"+(s.wantKey?\", with the answer key on its own pages at the end\":\"\")+\"). It is shown below, exactly as it will print.\"))+'</p>'", count=1)
rep("'<p class=\"thinNote\">Heads up: the question bank is still thin for this selection, so this sheet repeats practice on the same question shape (with new numbers) because there are not yet enough different questions to fill it.</p>'",
    "'<p class=\"thinNote\">'+L9(\"Heads up: the question bank is still thin for this selection, so this sheet repeats practice on the same question shape (with new numbers) because there are not yet enough different questions to fill it.\",\"Attention : la banque de questions est encore mince pour cette sélection, alors cette feuille répète la pratique sur la même forme de question (avec de nouveaux nombres), car il n'y a pas encore assez de questions différentes pour la remplir.\")+'</p>'", count=1)
rep("id=\"printBtn\" class=\"sec\">Print / save the sheet</button>",
    "id=\"printBtn\" class=\"sec\">'+L9(\"Print / save the sheet\",\"Imprimer / enregistrer la feuille\")+'</button>", count=1)

# Copy and Word download statuses (shared by sheet and exam).
rep("status.textContent=ok?\"Copied. Open a Google Doc or a Word document and paste (Ctrl+V): the whole sheet lands there as editable text. Edit it there, then print from there.\":\"Copy did not work in this browser. You can still edit right here and print.\";",
    "status.textContent=ok?L9(\"Copied. Open a Google Doc or a Word document and paste (Ctrl+V): the whole sheet lands there as editable text. Edit it there, then print from there.\",\"Copié. Ouvre un document Google Docs ou Word et colle (Ctrl+V) : toute la feuille y arrive comme texte modifiable. Modifie-la là, puis imprime à partir de là.\"):L9(\"Copy did not work in this browser. You can still edit right here and print.\",\"La copie n'a pas fonctionné dans ce navigateur. Tu peux quand même modifier ici et imprimer.\");", count=1)
rep("\"Word file downloaded (\"+wordName+\"). Open it in Word: every equation in it is a native Word equation, ready to edit or print.\"",
    "L9(\"Word file downloaded (\",\"Fichier Word téléchargé (\")+wordName+L9(\"). Open it in Word: every equation in it is a native Word equation, ready to edit or print.\",\"). Ouvre-le dans Word : chaque équation est une équation Word native, prête à modifier ou à imprimer.\")", count=1)
rep("\"The Word file could not be built in this browser. You can still edit the sheet here and print it.\"",
    "L9(\"The Word file could not be built in this browser. You can still edit the sheet here and print it.\",\"Le fichier Word n'a pas pu être créé dans ce navigateur. Tu peux quand même modifier la feuille ici et l'imprimer.\")", count=1)

# The Word export's answer-key matcher reads the key line's
# label off the rendered sheet; the fork's matcher keys on
# "Réponse :" for the same reason (its translator notes).
rep("var km=/^(\\d+)\\.\\s*Answer:/.exec(normT(dText(n)));",
    "var km=(FR9?/^(\\d+)\\.\\s*Réponse\\s*:/:/^(\\d+)\\.\\s*Answer:/).exec(normT(dText(n)));", count=1)

# ---------- All courses link (Jason, Nov 13, 2026) ----------
# A small, quiet link back to the course picker, in the course header
# directly under the course name (the h1 the branding pass above gives
# id="appTitle"). It lives inside #app, so the picker script's hiding
# of #app keeps it off the picker screen, and the print stylesheet's
# hiding of #app (printed output is built in #printArea) keeps it out
# of printed and exported sheets and tests. The href is the app root
# with no query string, so following it drops the course, set and
# teacher parameters and lands on the picker; shared and seeded links
# are untouched because they still boot through ?course= as before.
rep('h1{font-size:1.35rem;margin:0 0 4px;}',
    'h1{font-size:1.35rem;margin:0 0 4px;}\n'
    '  .allcourses{font-size:.82rem;margin:0 0 6px;}\n'
    '  .allcourses a{color:var(--accent);text-decoration:none;}\n'
    '  .allcourses a:hover,.allcourses a:focus-visible{text-decoration:underline;}\n'
    '  .applogo{height:44px;width:auto;display:block;margin:0 0 10px;}\n'
    '  .applogo-d{display:none;}\n'
    '  html[data-a11y-theme="dark"] .applogo-l{display:none;}\n'
    '  html[data-a11y-theme="dark"] .applogo-d{display:block;}\n'
    '  html[data-a11y-theme="dark"] .allcourses a{color:#5eead4;}\n'
    '  .sheetbrand{margin:0 0 10px;}\n'
    '  .sheetbrand img{height:18px;width:auto;display:block;}',
    count=1)
rep('<h1 id="appTitle">Review Apps</h1>',
    '<img class="applogo applogo-l" src="cdli-logo.svg" alt="CDLI">\n'
    '  <img class="applogo applogo-d" src="cdli-logo-white.svg" alt="CDLI">\n'
    '  <h1 id="appTitle">Review Apps</h1>\n'
    '  <p class="allcourses"><a href="./">&larr; All courses</a></p>',
    count=1)

# ---------- shipped-shell back-ports (reconciled Nov 13, 2026) ----------
# Four features were built directly into the shipped shell during the
# course ports and never landed in this builder, so a rebuild silently
# dropped them. They are back-ported here, each as the shipped text
# verbatim, anchored on the chassis text it amends; the reps run last
# (after the French layer, whose wording two of them carry). The
# builder-side halves of the cap feature (the selection-engine
# comment above, the settingsToURL and applyURL reps, the presetFinal
# wiring) and the two snippet halves (the composer's capX in
# snippets/composeexam-generic.js.txt, the scope capture in
# snippets/advset.js.txt) are written in their own places.
#
# (1) Preset cap symmetry: a course can cap its final preset exactly
# as Math 2201 caps its mid (presets.final.cap, Biology 3201). The
# state gains a finalCap flag beside midCap; scopeCap resolves a
# unit selection to the cap it carries (true for the mid cap, the
# string "final" for the final cap, false otherwise), and poolFor
# reads the string form against the entries' preFinal flags.
rep('function poolFor(units,inds,cap,pred){\n'
    '  return BANK.filter(function(e){\n'
    '    if(pred&&!pred(e))return false;\n'
    '    if(cap&&e.postMid)return false;',
    'function poolFor(units,inds,cap,pred){\n'
    '  return BANK.filter(function(e){\n'
    '    if(pred&&!pred(e))return false;\n'
    '    if(cap==="final"){if(e.preFinal)return false;}\n'
    '    else if(cap&&e.postMid)return false;', count=1)
rep('    return true;\n  });\n}\nfunction levelTargets(n,mix){',
    '    return true;\n  });\n}\n'
    'function scopeCap(units){\n'
    '  var C=window.__COURSE||{};var key=(units||[]).slice().sort(function(a,b){return a-b;}).join();\n'
    '  if(C.presets&&C.presets.mid&&C.presets.mid.cap&&C.presets.mid.units&&C.presets.mid.units.slice().sort(function(a,b){return a-b;}).join()===key)return true;\n'
    '  if(C.presets&&C.presets.final&&C.presets.final.cap&&C.presets.final.units&&C.presets.final.units.slice().sort(function(a,b){return a-b;}).join()===key)return "final";\n'
    '  return false;\n'
    '}\n'
    'function levelTargets(n,mix){', count=1)
rep('var state={units:[],inds:[],midCap:false};',
    'var state={units:[],inds:[],midCap:false,finalCap:false};', count=1)
rep('cb.addEventListener("change",function(){state.midCap=false;readUnits();renderIndicators();updatePoolInfo();});',
    'cb.addEventListener("change",function(){state.midCap=false;state.finalCap=false;readUnits();renderIndicators();updatePoolInfo();});', count=1)
rep('cb.addEventListener("change",function(){state.midCap=false;readInds();updatePoolInfo();});',
    'cb.addEventListener("change",function(){state.midCap=false;state.finalCap=false;readInds();updatePoolInfo();});', count=1)
rep('var p=poolFor(state.units,state.inds,state.midCap);',
    'var p=poolFor(state.units,state.inds,state.finalCap?"final":state.midCap);', count=1)
rep('return {units:state.units.slice(),inds:state.inds.slice(),midCap:state.midCap,',
    'return {units:state.units.slice(),inds:state.inds.slice(),midCap:state.midCap,finalCap:state.finalCap,', count=1)
rep('return poolFor(T.scope.units,T.scope.inds,T.scope.midCap);',
    'return poolFor(T.scope.units,T.scope.inds,T.scope.finalCap?"final":T.scope.midCap);', count=1)
rep('scope:{units:s.units.slice(),inds:s.inds.slice(),midCap:!!s.midCap}',
    'scope:{units:s.units.slice(),inds:s.inds.slice(),midCap:!!s.midCap,finalCap:!!s.finalCap}', count=4)
rep('examCap:(s.units.slice().sort(function(a,b){return a-b;}).join()===(window.__COURSE?(window.__COURSE.presets.mid?window.__COURSE.presets.mid.units.slice().sort(function(a,b){return a-b;}).join():"none"):""))',
    'examCap:scopeCap(s.units||[])', count=2)
rep('return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.midCap);',
    'return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.finalCap?"final":s.midCap);', count=1)
rep('s.order,s.midCap,function(e)',
    's.order,s.finalCap?"final":s.midCap,function(e)', count=2)
rep('function setPreset(units,cap){state.units=units;state.inds=[];state.midCap=!!cap;unitCheckboxes();renderIndicators();updatePoolInfo();}',
    'function setPreset(units,cap){state.units=units;state.inds=[];state.midCap=(cap===true);state.finalCap=(cap==="final");unitCheckboxes();renderIndicators();updatePoolInfo();}', count=1)

# (2) Worked-example capability: varset tags its generator with the
# variant count; exampleCapable decides whether an entry can deal a
# question different from the one on screen (generator entries always
# can, var entries only with more than one variant, anything else
# would hand the student their own question back as its own
# example); the practice view offers the example button only for
# capable entries; and dealExample cycles back to the first dealt
# instance when no different example turns up in its draws (Jason's
# ruling, Nov 12, 2026).
rep('function varset(list){return function(){var f=pick(list);return f();};}',
    'function varset(list){var g=function(){var f=pick(list);return f();};g.variantCount=list.length;return g;}', count=1)
rep('function dealExample(i,n,prev){',
    'function exampleCapable(e){\n'
    '  // A worked example only helps when the entry can deal a question that\n'
    '  // differs from the one on screen. Generator entries always can; a var\n'
    '  // entry can only when its variant set holds more than one variant;\n'
    '  // anything else (single-variant sets, CR prompts) would hand the\n'
    '  // student their own question back as its own "example", answer and\n'
    '  // all, so no example is offered for those.\n'
    '  if(!e)return false;\n'
    '  if(e.kind==="gen")return true;\n'
    '  if(e.kind==="var")return ((e.gen&&e.gen.variantCount)||1)>1;\n'
    '  return false;\n'
    '}\n'
    'function dealExample(i,n,prev){', count=1)
rep('  return withSeed(sd,function(){var c=canonQ(q),pc=prev?canonQ(prev):null,t=null;\n'
    '    for(var k=0;k<12;k++){var cand=e.gen();cand._entry=e;t=cand;var cc=canonQ(cand);if(cc!==c&&cc!==pc)break;}',
    '  return withSeed(sd,function(){var c=canonQ(q),pc=prev?canonQ(prev):null,t=null,first=null,broke=false;\n'
    '    for(var k=0;k<12;k++){var cand=e.gen();cand._entry=e;if(!first)first=cand;t=cand;var cc=canonQ(cand);if(cc!==c&&cc!==pc){broke=true;break;}}\n'
    '    if(!broke)return first; // ran out of different examples: cycle back to the first instance', count=1)
rep("'<button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">'+L9(\"See a worked example\",\"Voir un exemple travaillé\")+'</button> ",
    "(exampleCapable(q._entry)?'<button type=\"button\" class=\"alt\" data-ex=\"'+i+'\">'+L9(\"See a worked example\",\"Voir un exemple travaillé\")+'</button> ':'')+'", count=1)

# (3) Text questions get a writing box (the Nov 13 writing-box fix,
# shell commit 626b84a): a text answer renders as a four-row textarea
# in the practice view instead of the one-line input, with its own
# .ans styling, and the accessibility text sizes apply to it too.
rep('  input[type=text].ans{width:170px;padding:8px;border:1px solid var(--line);border-radius:6px;font-size:.95rem;}',
    '  input[type=text].ans{width:170px;padding:8px;border:1px solid var(--line);border-radius:6px;font-size:.95rem;}\n'
    '  textarea.ans{display:block;width:100%;box-sizing:border-box;padding:8px;border:1px solid var(--line);border-radius:6px;font-size:.95rem;margin-top:4px;resize:vertical;}', count=1)
rep('  html[data-a11y-text="large"] #app .q input[type=text].ans{font-size:1.1rem;}',
    '  html[data-a11y-text="large"] #app .q input[type=text].ans,html[data-a11y-text="large"] #app .q textarea.ans{font-size:1.1rem;}', count=1)
rep('  html[data-a11y-text="xlarge"] #app .q input[type=text].ans{font-size:1.28rem;}',
    '  html[data-a11y-text="xlarge"] #app .q input[type=text].ans,html[data-a11y-text="xlarge"] #app .q textarea.ans{font-size:1.28rem;}', count=1)
rep("    }else{\n      html+='<p>'+L9(\"Your answer: \",\"Ta réponse : \")+'<input type=\"text\" class=\"ans\" id=\"ans'+i+'\" autocomplete=\"off\"></p>';",
    "    }else if(q.type===\"text\"){\n      html+='<p>'+L9(\"Your answer: \",\"Ta réponse : \")+'<textarea class=\"ans\" id=\"ans'+i+'\" rows=\"4\" autocomplete=\"off\"></textarea></p>';\n    }else{\n      html+='<p>'+L9(\"Your answer: \",\"Ta réponse : \")+'<input type=\"text\" class=\"ans\" id=\"ans'+i+'\" autocomplete=\"off\"></p>';", count=1)

# ---------- enrichment flag (Jason's ruling, Nov 13, 2026) ----------
# Content beyond the named indicators may live in a bank, flagged
# enrich on the entry (a property set in the bank module, exactly
# the way postMid and preFinal are set), but it never appears in
# random practice draws or generated exams unless a teacher
# deliberately includes it. The mechanism is entry-side and
# default-out everywhere:
# - poolFor excludes enrich entries unless enrichIncluded()
#   reports the current state includes them. enrichIncluded is
#   read through a typeof guard, so harnesses that extract
#   poolFor on its own keep the default (excluded). The state is
#   the Advanced tools checkbox enrChk when it is on the page,
#   else the hidCtl stash (the pkChk pattern), default false.
# - composeExam filters enrich entries unconditionally (its own
#   section in snippets/composeexam-generic.js.txt): no toggle
#   reaches exam or test composition, and they never enter the
#   constructed-response pools, which derive from the same pool.
# - The toggle lives in the teacher bar Advanced options block
#   beside the exam timer checkbox, is carried by settings()
#   (key enr), written to links by settingsToURL as enr=1 and
#   restored by applyURL into the stash and the checkbox, exactly
#   like the levels mix. It affects practice draws only. It
#   renders only when the active course's bank actually carries
#   an enrich entry (BANK.some on the flag), the same visibility
#   rule the prior knowledge switch below follows; a course with
#   no such entries shows neither control, and a link carrying
#   enr=1 there simply has no effect.
# - Pick from bank is the deliberate surface: tScopePool raises
#   PICKER_SCOPE around its poolFor calls so its lists include
#   enrichment entries in every view, and the picker marks them;
#   a drawn practice card marks them too (the Enrichment tag in
#   tags()). Picking one is an explicit per-question choice and
#   stays available in test view as well.
# No course without enrich entries changes behaviour anywhere:
# the filter test is a property no existing entry carries.
rep('  .tag.lvl{background:#4b5a61;} .tag.ind{background:var(--accent2);}',
    '  .tag.lvl{background:#4b5a61;} .tag.ind{background:var(--accent2);}\n'
    '  .tag.enr{background:#8a5a00;}', count=1)
rep('function poolFor(units,inds,cap,pred){\n'
    '  return BANK.filter(function(e){\n'
    '    if(pred&&!pred(e))return false;',
    '/* Enrichment (Nov 13, 2026): an entry flagged enrich carries\n'
    '   content beyond the named indicators of its course. Such\n'
    '   entries stay out of every automatic pool: poolFor excludes\n'
    '   them unless enrichIncluded() reports the current state\n'
    '   includes them, composeExam filters them unconditionally,\n'
    '   and the pick from bank lists (the one deliberate surface)\n'
    '   include them, marked, through PICKER_SCOPE. The flag is a\n'
    '   property on the entry, set in the bank module of the\n'
    '   course exactly the way postMid and preFinal are set. The\n'
    '   default is out, everywhere. */\n'
    'var PICKER_SCOPE=false;\n'
    'function enrichIncluded(){\n'
    '  if(typeof PICKER_SCOPE!=="undefined"&&PICKER_SCOPE)return true;\n'
    '  var el=null;\n'
    '  try{el=document.getElementById("enrChk");}catch(err){}\n'
    '  if(el)return !!el.checked;\n'
    '  return (typeof hidCtl!=="undefined"&&hidCtl)?!!hidCtl.enr:false;\n'
    '}\n'
    'function poolFor(units,inds,cap,pred){\n'
    '  return BANK.filter(function(e){\n'
    '    if(pred&&!pred(e))return false;\n'
    '    if(e.enrich&&!(typeof enrichIncluded==="function"&&enrichIncluded()))return false;', count=1)
rep('var hidCtl={mc:10,nc:5,mix:(window.__COURSE&&window.__COURSE.defaultMix?window.__COURSE.defaultMix.slice():[20,60,20]),pk:false};',
    'var hidCtl={mc:10,nc:5,mix:(window.__COURSE&&window.__COURSE.defaultMix?window.__COURSE.defaultMix.slice():[20,60,20]),pk:false,enr:false};', count=1)
rep('  var mc=$("mcCountIn"),nc=$("ncCountIn"),l1=$("lv1"),l2=$("lv2"),l3=$("lv3"),pk=$("pkChk");',
    '  var mc=$("mcCountIn"),nc=$("ncCountIn"),l1=$("lv1"),l2=$("lv2"),l3=$("lv3"),pk=$("pkChk"),en=$("enrChk");', count=1)
rep('  if(pk)hidCtl.pk=!!pk.checked;',
    '  if(pk)hidCtl.pk=!!pk.checked;\n'
    '  if(en)hidCtl.enr=!!en.checked;', count=1)
rep('["mcCountIn","ncCountIn","lv1","lv2","lv3","pkChk"]',
    '["mcCountIn","ncCountIn","lv1","lv2","lv3","pkChk","enrChk"]', count=1)
rep('    timer:($("timerChk")?$("timerChk").checked:false),',
    '    timer:($("timerChk")?$("timerChk").checked:false),\n'
    '    enr:enrichIncluded(),', count=1)
rep("  return '<span class=\"tag\">'+L9(\"Unit \",\"Unit\u00e9 \")+e.unit+'</span> <span class=\"tag ind\">'+e.indicators.join(\", \")+'</span> <span class=\"tag lvl\">'+L9(\"Level \",\"Niveau \")+e.level+'</span>';",
    "  return '<span class=\"tag\">'+L9(\"Unit \",\"Unit\u00e9 \")+e.unit+'</span> <span class=\"tag ind\">'+e.indicators.join(\", \")+'</span> <span class=\"tag lvl\">'+L9(\"Level \",\"Niveau \")+e.level+'</span>'+(e.enrich?' <span class=\"tag enr\">Enrichment</span>':\"\");", count=1)
rep('function tScopePool(){\n'
    '  if(!T)return [];\n'
    '  if(T.view==="exam")return poolFor(T.scope.units,T.scope.inds,T.scope.examCap,function(e){return T.scope.includePK||!isPK(e);});\n'
    '  return poolFor(T.scope.units,T.scope.inds,T.scope.finalCap?"final":T.scope.midCap);\n'
    '}',
    'function tScopePool(){\n'
    '  if(!T)return [];\n'
    '  /* Pick from bank is the deliberate surface: its pool includes\n'
    '     enrichment entries (marked in the list) whatever the practice\n'
    '     toggle says, because picking one is an explicit per-question\n'
    '     choice. Automatic draws and composition stay fenced. */\n'
    '  PICKER_SCOPE=true;\n'
    '  var p;\n'
    '  if(T.view==="exam")p=poolFor(T.scope.units,T.scope.inds,T.scope.examCap,function(e){return T.scope.includePK||!isPK(e);});\n'
    '  else p=poolFor(T.scope.units,T.scope.inds,T.scope.finalCap?"final":T.scope.midCap);\n'
    '  PICKER_SCOPE=false;\n'
    '  return p;\n'
    '}', count=1)
rep('+" \\u00B7 Level "+e.level+" \\u2014 "+esc(desc)',
    '+" \\u00B7 Level "+e.level+(e.enrich?" \\u00B7 Enrichment":"")+": "+esc(desc)', count=1)
rep("')</label></div></div><div id=\"tPicker\" hidden></div></div>';",
    "')</label>'+(BANK.some(function(e){return !!e.enrich;})?'<label><input type=\"checkbox\" id=\"enrChk\"'+(settings().enr?\" checked\":\"\")+'> Include enrichment questions (beyond the named indicators; practice draws only, never in composed tests or exams)</label>':\"\")+'</div></div><div id=\"tPicker\" hidden></div></div>';", count=1)
rep('  if(s.timer)p.set("tm","1");',
    '  if(s.timer)p.set("tm","1");\n'
    '  if(s.enr)p.set("enr","1");', count=1)
rep('  if(p.get("pk")==="1"&&$("pkChk"))$("pkChk").checked=true;',
    '  if(p.get("pk")==="1"&&$("pkChk"))$("pkChk").checked=true;\n'
    '  if(p.get("enr")==="1"){hidCtl.enr=true;if($("enrChk"))$("enrChk").checked=true;}', count=1)

# ---------- prior knowledge practice switch (Jason, Nov 13, 2026) ----------
# The mirror image of enrichment, approved in the same pass:
# prior knowledge entries (indicators coded PK, or the pkFlag
# property set in a bank module by the flagging pass below;
# isPK in the shell reads both) sit in
# practice pools by default, and Advanced tools gains an
# "Include prior knowledge questions" switch that can keep them
# out of practice draws. Default: included, which is today's
# behaviour exactly. The differences from enrichment follow from
# the opposite default:
# - The filter lives in drawSet, the one funnel every automatic
#   practice draw passes through (online sets and sheets alike),
#   NOT in poolFor: poolFor is shared with composeExam, whose
#   pkPracticeOnly and includePK scope behaviour must stay
#   exactly as built in every environment, and a poolFor-level
#   filter would silently couple the practice switch to it.
#   Inside drawSet the filter fires only when pkIncluded() is
#   defined and reports off, so harnesses without the accessor
#   draw exactly as today. Pick from bank pools come from
#   poolFor through tScopePool, so explicit picks of PK entries
#   stay available whatever the switch says, the same
#   deliberate-surface treatment enrichment gets.
# - The link form is pkin=0 (the key=0 pattern for a default-on
#   setting): settingsToURL writes it only when the switch is
#   off, applyURL restores it into the stash and the checkbox.
# - The switch renders only when the active course's bank
#   actually carries prior knowledge entries (BANK.some(isPK));
#   every other course's Advanced tools are unchanged.
# - The flagging pass (later on Nov 13, 2026): the audit found
#   prior knowledge items in eleven more courses tagged with
#   current-course codes, invisible to the code-based check.
#   Jason's standard: an item is prior knowledge only when it
#   assesses nothing on the current course's indicator list.
#   The 24 approved entries carry a pkFlag property set in
#   their bank modules, and isPK now reads the flag alongside
#   the codes; the rep below makes that extension.
rep('function isPK(e){return e.indicators.some(function(c){return c.indexOf(\"PK\")===0;});} /* shim: this bank carries no PK-coded indicators, so this is always false here; the teacher block calls it. */',
    'function isPK(e){return !!e.pkFlag||e.indicators.some(function(c){return c.indexOf(\"PK\")===0;});} /* Prior knowledge: an entry counts when it carries a PK-coded indicator (the Math 2201 guide codes PK.1 and PK.2) or the pkFlag property set in its bank module by the flagging pass of Nov 13, 2026: entries whose assessed target belongs to an earlier course, approved family by family under the assessed-target standard (see the prior knowledge audit). */', count=1)
rep('  return (typeof hidCtl!=="undefined"&&hidCtl)?!!hidCtl.enr:false;\n'
    '}',
    '  return (typeof hidCtl!=="undefined"&&hidCtl)?!!hidCtl.enr:false;\n'
    '}\n'
    '/* Prior knowledge in practice (Nov 13, 2026): PK-coded entries\n'
    '   sit in practice pools by default, the mirror image of\n'
    '   enrichment. pkIncluded() reports the Advanced tools switch\n'
    '   (the checkbox pkInChk when it is on the page, else the\n'
    '   hidCtl stash), defaulting to included: the behaviour the\n'
    '   apps have always had. drawSet filters PK entries out of\n'
    '   the practice pool when the switch is deliberately off;\n'
    '   poolFor is shared with exam composition, whose includePK\n'
    '   scope rule is separate and untouched, so the filter lives\n'
    '   in drawSet, the practice draw funnel, and nowhere else. */\n'
    'function pkIncluded(){\n'
    '  var el=null;\n'
    '  try{el=document.getElementById("pkInChk");}catch(err){}\n'
    '  if(el)return !!el.checked;\n'
    '  return (typeof hidCtl!=="undefined"&&hidCtl)?hidCtl.pkIn!==false:true;\n'
    '}', count=1)
rep('  var pool=poolFor(units,inds,cap,pred);if(!pool.length||n<1)return{items:[],short:0,pool:0,thin:false};',
    '  var pool=poolFor(units,inds,cap,pred);\n'
    '  if(typeof pkIncluded==="function"&&!pkIncluded())pool=pool.filter(function(e){return !(typeof isPK==="function"&&isPK(e));});\n'
    '  if(!pool.length||n<1)return{items:[],short:0,pool:0,thin:false};', count=1)
rep('var hidCtl={mc:10,nc:5,mix:(window.__COURSE&&window.__COURSE.defaultMix?window.__COURSE.defaultMix.slice():[20,60,20]),pk:false,enr:false};',
    'var hidCtl={mc:10,nc:5,mix:(window.__COURSE&&window.__COURSE.defaultMix?window.__COURSE.defaultMix.slice():[20,60,20]),pk:false,enr:false,pkIn:true};', count=1)
rep('pk=$("pkChk"),en=$("enrChk");',
    'pk=$("pkChk"),en=$("enrChk"),pi=$("pkInChk");', count=1)
rep('  if(en)hidCtl.enr=!!en.checked;',
    '  if(en)hidCtl.enr=!!en.checked;\n'
    '  if(pi)hidCtl.pkIn=!!pi.checked;', count=1)
rep('"pkChk","enrChk"]',
    '"pkChk","enrChk","pkInChk"]', count=1)
rep('    enr:enrichIncluded(),',
    '    enr:enrichIncluded(),\n'
    '    pkIn:pkIncluded(),', count=1)
rep("'> Include enrichment questions (beyond the named indicators; practice draws only, never in composed tests or exams)</label>':\"\")+'</div></div><div id=\"tPicker\" hidden></div></div>';",
    "'> Include enrichment questions (beyond the named indicators; practice draws only, never in composed tests or exams)</label>':\"\")+(BANK.some(function(e){return isPK(e);})?'<label><input type=\"checkbox\" id=\"pkInChk\"'+(settings().pkIn?\" checked\":\"\")+'> Include prior knowledge questions (practice draws only; tests and exams treat prior knowledge separately)</label>':\"\")+'</div></div><div id=\"tPicker\" hidden></div></div>';", count=1)
rep('  if(s.enr)p.set("enr","1");',
    '  if(s.enr)p.set("enr","1");\n'
    '  if(!s.pkIn)p.set("pkin","0");', count=1)
rep('  if(p.get("enr")==="1"){hidCtl.enr=true;if($("enrChk"))$("enrChk").checked=true;}',
    '  if(p.get("enr")==="1"){hidCtl.enr=true;if($("enrChk"))$("enrChk").checked=true;}\n'
    '  if(p.get("pkin")==="0"){hidCtl.pkIn=false;if($("pkInChk"))$("pkInChk").checked=false;}', count=1)

# ---------- theme coherence (Nov 13, 2026) ----------
# Display settings persist per course (A11Y_KEY is the course storage
# prefix plus "-a11y-v1"), which left the course picker permanently in
# the default light theme: a student who chose dark inside a course was
# met by a light picker on the way back out, and the picker had no way
# to set the "app" key at all. Four changes share the theme through
# the global "app-a11y-v1" key: a11ySave mirrors the theme into the
# global key whenever a course saves; the pre-paint bootstrap and
# a11yLoad both inherit the global theme when the active key carries
# none of its own (a saved per-course choice, light or dark, still
# wins); and the picker carries
# a Dark mode toggle that flips the attribute and writes the global
# key (its markup, CSS and wiring live with the picker strings above).
# The inheritance has to live in a11yLoad as well as the bootstrap:
# a11yApply re-derives the attributes from a11yLoad's result, so a
# theme only the bootstrap knew about was stripped again on boot.
rep('function a11ySave(){var store=a11yStore();if(!store)return;try{store.setItem(A11Y_KEY,JSON.stringify(a11y));}catch(e){}}',
    'function a11ySave(){var store=a11yStore();if(!store)return;try{store.setItem(A11Y_KEY,JSON.stringify(a11y));}catch(e){}\n'
    '  if(A11Y_KEY!=="app-a11y-v1"){try{var g={};var raw=store.getItem("app-a11y-v1");if(raw)g=JSON.parse(raw)||{};g.theme=a11y.theme;store.setItem("app-a11y-v1",JSON.stringify(g));}catch(e){}}}',
    count=1)
rep('  var raw=store.getItem((window.__COURSE?window.__COURSE.storagePrefix:"app")+"-a11y-v1");if(!raw)return;\n'
    '  var p=JSON.parse(raw);if(!p)return;',
    '  var raw=store.getItem((window.__COURSE?window.__COURSE.storagePrefix:"app")+"-a11y-v1");\n'
    '  var p=null;if(raw){try{p=JSON.parse(raw);}catch(e){}}\n'
    '  if(!p||typeof p.theme==="undefined"){try{var graw=store.getItem("app-a11y-v1");if(graw){var gp=JSON.parse(graw);if(gp&&gp.theme==="dark"){if(!p)p={};p.theme="dark";}}}catch(e){}}\n'
    '  if(!p)return;',
    count=1)
rep('  var had=false,store=a11yStore();\n'
    '  if(store){try{var raw=store.getItem(A11Y_KEY);if(raw){var p=JSON.parse(raw);if(p){had=true;\n'
    '    if(p.text==="std"||p.text==="large"||p.text==="xlarge")a11y.text=p.text;\n'
    '    if(p.theme==="light"||p.theme==="dark")a11y.theme=p.theme;',
    '  var had=false,hadTheme=false,store=a11yStore();\n'
    '  if(store){try{var raw=store.getItem(A11Y_KEY);if(raw){var p=JSON.parse(raw);if(p){had=true;\n'
    '    if(p.text==="std"||p.text==="large"||p.text==="xlarge")a11y.text=p.text;\n'
    '    if(p.theme==="light"||p.theme==="dark"){a11y.theme=p.theme;hadTheme=true;}',
    count=1)
rep('    a11y.font=!!p.font;a11y.spacing=!!p.spacing;a11y.motion=!!p.motion;}}}catch(e){}}',
    '    a11y.font=!!p.font;a11y.spacing=!!p.spacing;a11y.motion=!!p.motion;}}}catch(e){}}\n'
    '  if(store&&!hadTheme&&A11Y_KEY!=="app-a11y-v1"){try{var graw=store.getItem("app-a11y-v1");if(graw){var gp=JSON.parse(graw);if(gp&&(gp.theme==="light"||gp.theme==="dark"))a11y.theme=gp.theme;}}catch(e){}}',
    count=1)

# ---------- dark theme contrast (Nov 13, 2026) ----------
# The dark theme swaps --ink/--bg/--card but never --accent, so alt
# buttons (picker filter chips, picker course buttons, secondary
# buttons in courses) rendered their text and borders in the light
# theme's teal #0f766e on the dark card #1a232a, about 3:1 contrast.
# In dark only, alt-button text and borders take the theme's bright
# teal #5eead4 (about 11:1 on the card), the same colour the dark
# theme already uses for summaries and the picker's pressed toggle;
# the All courses link gets the matching rule with the header CSS
# above, and the picker style string restores the pressed chips' navy
# fill, which the dark alt background override otherwise flattens.
rep('  html[data-a11y-theme="dark"] button.alt{background:var(--card);}',
    '  html[data-a11y-theme="dark"] button.alt{background:var(--card);}\n'
    '  html[data-a11y-theme="dark"] button.alt{color:#5eead4;border-color:#5eead4;}',
    count=1)

# ---------- hint box dark contrast and report form name (Nov 14, 2026) ----------
# The hint box kept its light cream background in dark mode while its
# text inherited the dark theme's near-white ink, so hints rendered
# almost invisibly (found live on Earth Systems 3209). The base rule
# above now pins the light ink colour, and in dark mode the box takes
# the worked solution's warm dark background with the theme ink.
rep('  html[data-a11y-theme="dark"] .exbox{background:#1d2a1a;border-color:#4a6741;}',
    '  html[data-a11y-theme="dark"] .exbox{background:#1d2a1a;border-color:#4a6741;}\n'
    '  html[data-a11y-theme="dark"] .hintbox{background:#2b2118;color:var(--ink);}',
    count=1)
# The shared report form was renamed from "Math Review Apps" to
# "CDLI Review Apps" when the apps branched beyond math; the comment
# above the REPORT_FORM constant still used the old name.
rep('/* Report-a-problem: one Google Form, "Math Review Apps: Report a Problem", serves',
    '/* Report-a-problem: one Google Form, "CDLI Review Apps: Report a Problem", serves',
    count=1)



# ---------- interrupted-set resume and sheet item numbering (Nov 14, 2026) ----------
# Two changes commissioned by Jason on November 14, 2026, built into
# the shipped shell and back-ported here in the same pass, in the
# back-port manner: each rep anchors on the shipped text it amends
# and runs late, after the French layer.
#
# (1) Interrupted-set resume (snippets/resume.js.txt): the
# in-progress state of the set on screen is kept in localStorage
# per course; when the identical set is drawn or opened again a
# banner offers Resume or Start fresh. The module is inserted
# before tRebuildFromURL; renderOnline and renderExam call
# resumeAfterRender at their tails; the Advanced tools restore
# re-baselines the save after putting a set back; the boot
# dispatch ends with resumeBootCheck for a saved exam. The
# .resumebar rule rides on the .sheetPrev CSS rule.
#
# (2) Sheet item numbering: on the practice sheet, the exam paper
# and the answer key appendix, the item number used to sit in its
# own paragraph with the question in a block below it, so the Word
# export carried the break and every exported item needed hand
# editing. The number now leads a .qline block that also carries
# the prompt (or, in the appendix, the worked solution) in a span
# keeping the prompt class, so number and stem share one line on
# screen, in print and in the generated .docx. A div wrapper, not
# a paragraph, so a stem containing a table is not split by the
# HTML parser; the .qline rule above carries the paragraph
# spacing the number paragraph used to provide.
resume = (ROOT / "snippets" / "resume.js.txt").read_text(encoding="utf-8").rstrip("\n")
rep('function tRebuildFromURL(){', resume + '\nfunction tRebuildFromURL(){', count=1)
rep('  .sheetPrev{border:1px solid var(--line);background:#fff;color:#16281f;padding:20px;border-radius:6px;margin-top:12px;}',
    '  .sheetPrev{border:1px solid var(--line);background:#fff;color:#16281f;padding:20px;border-radius:6px;margin-top:12px;}\n  .resumebar{border:1px solid var(--acc);background:var(--card);border-radius:6px;padding:12px 14px;margin:0 0 12px;}\n  .qline{margin:1em 0;}', count=1)
rep('  tWireOnline();\n  if(scroll!==false)box.scrollIntoView({behavior:scrollBehavior()});\n}',
    '  tWireOnline();\n  resumeAfterRender("online");\n  if(scroll!==false)box.scrollIntoView({behavior:scrollBehavior()});\n}', count=1)
rep('  tWireExam();\n}',
    '  tWireExam();\n  resumeAfterRender("exam");\n}', count=1)
rep('    renderOnline(false);\n    advRestoreOnlineState(P);\n    return true;',
    '    renderOnline(false);\n    advRestoreOnlineState(P);\n    _resumeAppliedSig=_resumeLiveSig;resumeSaveNow();\n    return true;', count=1)
rep('    renderExam();\n    return true;\n  }\n  return false;\n}',
    '    renderExam();\n    _resumeAppliedSig=_resumeLiveSig;resumeSaveNow();\n    return true;\n  }\n  return false;\n}', count=1)
rep('else{startOnline();}\n}\n}\n</script>',
    'else{startOnline();}\n}\nresumeBootCheck();\n}\n</script>', count=1)
rep('paper+=\'<div class="pq"><p><b>\'+n+\'.</b></p><div class="prompt">\'+stepHTML(q.prompt)+\'</div>\';',
    'paper+=\'<div class="pq"><div class="qline"><b>\'+n+\'.</b> <span class="prompt">\'+stepHTML(q.prompt)+\'</span></div>\';', count=1)
rep('paper+=\'<div class="pq"><p><b>\'+n+\'.</b> <span style="font-size:.85rem;color:#555;">(\'+it.marks+L9(" marks"," points")+\'</span></p><div class="prompt">\'+stepHTML(q.prompt)+\'</div>\';',
    'paper+=\'<div class="pq"><div class="qline"><b>\'+n+\'.</b> <span style="font-size:.85rem;color:#555;">(\'+it.marks+L9(" marks"," points")+\'</span> <span class="prompt">\'+stepHTML(q.prompt)+\'</span></div>\';', count=1)
rep('html+=\'<div class="pq"><p><b>\'+(i+1)+\'.</b> <span style="font-size:.8rem;color:#555;">(\'+L9("Unit ","Unité ")+q._entry.unit+\' \\u00B7 \'+q._entry.indicators.join(", ")+\' \\u00B7 \'+L9("Level ","Niveau ")+q._entry.level+\')</span></p><div class="prompt">\'+stepHTML(q.prompt)+\'</div>\';',
    'html+=\'<div class="pq"><div class="qline"><b>\'+(i+1)+\'.</b> <span style="font-size:.8rem;color:#555;">(\'+L9("Unit ","Unité ")+q._entry.unit+\' \\u00B7 \'+q._entry.indicators.join(", ")+\' \\u00B7 \'+L9("Level ","Niveau ")+q._entry.level+\')</span> <span class="prompt">\'+stepHTML(q.prompt)+\'</span></div>\';', count=1)
rep('key+=\'<div class="solp"><p><b>\'+(ix+1)+\'.</b> <b>(\'+"ABCD"[q.correct]+\')</b></p><div>\'+stepHTML(q.solution)+\'</div></div>\';',
    'key+=\'<div class="solp"><div class="qline"><b>\'+(ix+1)+\'.</b> <b>(\'+"ABCD"[q.correct]+\')</b> \'+stepHTML(q.solution)+\'</div></div>\';', count=1)


# ---------- prose CR self-check (Nov 14, 2026) ----------
# Prose constructed response (a text question whose shortest
# accepted answer runs longer than PROSE_TEXT_MIN characters)
# cannot be marked by exact match, so Check opens the worked
# solution and the student rates their own answer against the
# model answer and marking points. The reps below carry the
# shipped text verbatim: the selfrate styles and their dark
# overrides, the rating control in the online renderer and its
# wiring, the checkQ prose branch and the self-check functions,
# and the rating fields in the answer-state capture and restore
# paths (resume, Advanced tools handoff, teacher set sync).
rep('  .hintbox{margin:8px 0;padding:8px 12px;border-left:4px solid #f2b134;background:#fff8e6;color:#1c2b33;border-radius:0 8px 8px 0;line-height:1.5;}\n  .exbox .opts label{display:block;margin:3px 0;}',
    '  .hintbox{margin:8px 0;padding:8px 12px;border-left:4px solid #f2b134;background:#fff8e6;color:#1c2b33;border-radius:0 8px 8px 0;line-height:1.5;}\n  .selfrate{margin:8px 0;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#f4f7fb;line-height:1.5;}\n  .selfrate .srlead{margin:0 0 8px;font-size:.9rem;}\n  .selfrate .srbtns{margin:0;}\n  button.rated{background:var(--accent);color:#fff;border-color:var(--accent);}\n  .exbox .opts label{display:block;margin:3px 0;}', count=1)
rep('  html[data-a11y-theme="dark"] button.alt{background:var(--card);}\n  html[data-a11y-theme="dark"] button.alt{color:#5eead4;border-color:#5eead4;}',
    '  html[data-a11y-theme="dark"] button.alt{background:var(--card);}\n  html[data-a11y-theme="dark"] button.alt{color:#5eead4;border-color:#5eead4;}\n  html[data-a11y-theme="dark"] .selfrate{background:#16202a;border-color:#33475c;}\n  html[data-a11y-theme="dark"] button.rated{background:#0f766e;color:#fff;border-color:#0f766e;}', count=1)
rep('+\'</b> \'+stepHTML(q.solution)+\'</div>\'\n      +\'<p class="reprow">',
    '+\'</b> \'+stepHTML(q.solution)+\'</div>\'\n      +(isProseText(q)?\'<div class="selfrate" id="sr\'+i+\'" hidden><p class="srlead">\'+L9("Compare your answer with the model answer and the marking points. How did you do?","Compare ta réponse avec la réponse modèle et les points de notation. Comment t\'en es-tu sorti ?")+\'</p><p class="srbtns"><button type="button" class="alt" data-rate="got" data-rateq="\'+i+\'">\'+L9("I got it","Je l\'ai réussie")+\'</button> <button type="button" class="alt" data-rate="part" data-rateq="\'+i+\'">\'+L9("I got part of it","Je l\'ai réussie en partie")+\'</button> <button type="button" class="alt" data-rate="missed" data-rateq="\'+i+\'">\'+L9("I missed it","Je l\'ai manquée")+\'</button></p></div>\':\'\')\n      +\'<p class="reprow">', count=1)
rep('Array.prototype.forEach.call(box.querySelectorAll("[data-hint]"),function(b){b.addEventListener("click",function(){showHint(+b.getAttribute("data-hint"));});});',
    'Array.prototype.forEach.call(box.querySelectorAll("[data-hint]"),function(b){b.addEventListener("click",function(){showHint(+b.getAttribute("data-hint"));});});\n  Array.prototype.forEach.call(box.querySelectorAll("[data-rate]"),function(b){b.addEventListener("click",function(){rateProse(+b.getAttribute("data-rateq"),b.getAttribute("data-rate"));});});', count=1)
rep('  else{var t=($("ans"+i).value||"").trim().toLowerCase().replace(/\\s+/g," ");ok=q.answers.some(function(a){return t===a.replace(/\\s+/g," ");});}',
    '  else if(isProseText(q)){checkProse(i);return;}\n  else{var t=($("ans"+i).value||"").trim().toLowerCase().replace(/\\s+/g," ");ok=q.answers.some(function(a){return t===a.replace(/\\s+/g," ");});}', count=1)
rep('  if(ok)$("sol"+i).classList.remove("show");\n}',
    '  if(ok)$("sol"+i).classList.remove("show");\n}\n/* ============ Prose constructed response: self-check (Nov 2026) ============\n   A text question counts as prose when even its shortest accepted\n   answer runs longer than PROSE_TEXT_MIN characters: the banked\n   answers are concept phrases or a full model sentence, not a short\n   answer a student could reproduce verbatim. (The threshold came\n   from a survey of every bank, Nov 14, 2026: precise short answers,\n   formulas, names and orderings top out in the low thirties, while\n   prose concept phrases start at 37.) Exact match cannot mark prose:\n   a genuine answer in the student\'s own words never equals the\n   banked string, so "Idk" and a good paragraph scored alike.\n   Checking a prose answer therefore opens the worked solution (the\n   model answer and marking points, closing the hint and the worked\n   example the way opening the solution always does) and asks the\n   student to rate their own answer. "I got it" counts as correct;\n   the other two count as not correct. The rating is recorded\n   exactly once, like any other check; changing it afterwards moves\n   the counters with the change rather than double-counting, which\n   betters the first-check-sticks behaviour of the auto-marked\n   types. Short text answers keep the exact-match check above. */\nvar PROSE_TEXT_MIN=36;\nfunction isProseText(q){return !!q&&q.type==="text"&&!!q.answers&&q.answers.length>0&&Math.min.apply(null,q.answers.map(function(a){return String(a).length;}))>PROSE_TEXT_MIN;}\nfunction proseReveal(i){\n  var sol=$("sol"+i);if(sol&&!sol.classList.contains("show")){sol.classList.add("show");setSolLabel(i,true);}\n  closeScaffolding(i);\n  var sr=$("sr"+i);if(sr)sr.hidden=false;\n}\nfunction checkProse(i){\n  var q=current[i];if(!q)return;\n  var fb=$("fb"+i);if(!fb)return;\n  var txt=($("ans"+i).value||"").trim();\n  if(!fb.dataset.done&&txt===""){\n    fb.innerHTML=\'<span class="notyet">\'+L9("Write an answer first.","Écris d\'abord une réponse.")+\'</span> \'+L9("Then compare it with the model answer and rate how you did.","Compare-la ensuite avec la réponse modèle, puis note comment tu t\'en es sorti.");\n    fb.classList.add("show");return;\n  }\n  if(!fb.dataset.done){fb.innerHTML="";fb.classList.remove("show");}\n  proseReveal(i);\n}\nfunction applyRateVisual(i,rate){\n  var sr=$("sr"+i);if(!sr)return;\n  sr.dataset.selfrate=rate||"";sr.hidden=false;\n  Array.prototype.forEach.call(sr.querySelectorAll("[data-rate]"),function(b){var on=!!rate&&b.getAttribute("data-rate")===rate;b.classList.toggle("rated",on);b.setAttribute("aria-pressed",on?"true":"false");});\n}\nfunction rateProse(i,rate){\n  var q=current[i];if(!q)return;\n  var fb=$("fb"+i);if(!fb)return;\n  var sr=$("sr"+i);\n  var prev=sr?(sr.dataset.selfrate||""):"";\n  var ok=(rate==="got");\n  if(!fb.dataset.done){\n    fb.dataset.done="1";checkedCount++;if(ok)correctCount++;\n  }else if(prev&&(prev==="got")!==ok){\n    correctCount+=ok?1:-1;\n  }\n  setResults[i]={ok:ok,inds:(q._entry?q._entry.indicators.slice():[])};\n  applyRateVisual(i,rate);\n  fb.classList.add("show");\n  fb.innerHTML=(rate==="got"?(\'<span class="ok">\'+L9("You marked this: I got it.","Tu as noté : je l\'ai réussie.")+\'</span> \'+L9("Nice work.","Beau travail.")):rate==="part"?(\'<span class="notyet">\'+L9("You marked this: I got part of it.","Tu as noté : je l\'ai réussie en partie.")+\'</span> \'+L9("Look at the marking points to see what was missing.","Regarde les points de notation pour voir ce qui manquait.")):(\'<span class="notyet">\'+L9("You marked this: I missed it.","Tu as noté : je l\'ai manquée.")+\'</span> \'+L9("Read the model answer and the marking points, then practise this idea again soon.","Lis la réponse modèle et les points de notation, puis pratique cette idée de nouveau bientôt.")));\n  updateScore();maybeSummary();\n}', count=1)
rep('        var o={given:null,done:false,fbShown:false,fb:"",fbt:"",sol:false,hintStage:0,hintShown:false,hintHtml:"",exOpen:false,exq:null,exn:0,repOpen:false,repType:"",repNote:""};',
    '        var o={given:null,done:false,fbShown:false,fb:"",fbt:"",sol:false,hintStage:0,hintShown:false,hintHtml:"",exOpen:false,exq:null,exn:0,repOpen:false,repType:"",repNote:"",selfRate:"",srShown:false};', count=1)
rep('    var o={given:null,givenText:null,done:false,fbShown:false,fb:"",fbt:"",sol:false,hintStage:0,hintShown:false,hintHtml:"",exOpen:false,exq:null,exn:0,repOpen:false,repType:"",repNote:""};',
    '    var o={given:null,givenText:null,done:false,fbShown:false,fb:"",fbt:"",sol:false,hintStage:0,hintShown:false,hintHtml:"",exOpen:false,exq:null,exn:0,repOpen:false,repType:"",repNote:"",selfRate:"",srShown:false};', count=1)
rep('        var hb=$("hint"+i);if(hb){o.hintStage=+(hb.dataset.stage||0);o.hintShown=!hb.hidden;o.hintHtml=hb.innerHTML;}\n        var xb=$("ex"+i);if(xb){o.exOpen=!xb.hidden;o.exn=+(xb.dataset.exn||0);if(xb._exq)o.exq=advQSer(xb._exq);}',
    '        var hb=$("hint"+i);if(hb){o.hintStage=+(hb.dataset.stage||0);o.hintShown=!hb.hidden;o.hintHtml=hb.innerHTML;}\n        var srb=$("sr"+i);if(srb){o.selfRate=srb.dataset.selfrate||"";o.srShown=!srb.hidden;}\n        var xb=$("ex"+i);if(xb){o.exOpen=!xb.hidden;o.exn=+(xb.dataset.exn||0);if(xb._exq)o.exq=advQSer(xb._exq);}', count=1)
rep('    var hb=$("hint"+i);if(hb){o.hintStage=+(hb.dataset.stage||0);o.hintShown=!hb.hidden;o.hintHtml=hb.innerHTML;}\n    var xb=$("ex"+i);if(xb){o.exOpen=!xb.hidden;o.exn=+(xb.dataset.exn||0);if(xb._exq)o.exq=advQSer(xb._exq);}',
    '    var hb=$("hint"+i);if(hb){o.hintStage=+(hb.dataset.stage||0);o.hintShown=!hb.hidden;o.hintHtml=hb.innerHTML;}\n    var srb=$("sr"+i);if(srb){o.selfRate=srb.dataset.selfrate||"";o.srShown=!srb.hidden;}\n    var xb=$("ex"+i);if(xb){o.exOpen=!xb.hidden;o.exn=+(xb.dataset.exn||0);if(xb._exq)o.exq=advQSer(xb._exq);}', count=1)
rep('    var hb=$("hint"+i);if(hb&&o.hintStage){hb.dataset.stage=String(o.hintStage);if(o.hintShown){hb.innerHTML=o.hintHtml;hb.hidden=false;}}',
    '    var hb=$("hint"+i);if(hb&&o.hintStage){hb.dataset.stage=String(o.hintStage);if(o.hintShown){hb.innerHTML=o.hintHtml;hb.hidden=false;}}\n    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");', count=1)
rep('  return st.some(function(o){return !!o&&((o.given!==null&&o.given!=="")||o.done||o.fbShown||o.sol||o.hintStage>0||o.exOpen||o.repOpen);});',
    '  return st.some(function(o){return !!o&&((o.given!==null&&o.given!=="")||o.done||o.fbShown||o.sol||o.hintStage>0||o.exOpen||o.repOpen||o.selfRate||o.srShown);});', count=1)
rep('    var o={done:false,ok:false,given:null,fb:"",sol:false,exOpen:false,exq:null,exn:0};',
    '    var o={done:false,ok:false,given:null,fb:"",sol:false,exOpen:false,exq:null,exn:0,selfRate:"",srShown:false};', count=1)
rep('    var exb=$("ex"+i);if(exb){o.exOpen=!exb.hidden;o.exq=exb._exq||null;o.exn=+(exb.dataset.exn||0);}\n    o.ok=!!(setResults[i]&&setResults[i].ok);',
    '    var exb=$("ex"+i);if(exb){o.exOpen=!exb.hidden;o.exq=exb._exq||null;o.exn=+(exb.dataset.exn||0);}\n    var srb=$("sr"+i);if(srb){o.selfRate=srb.dataset.selfrate||"";o.srShown=!srb.hidden;}\n    o.ok=!!(setResults[i]&&setResults[i].ok);', count=1)
rep('    if(o.done){var fb=$("fb"+i);if(fb){fb.classList.add("show");fb.dataset.done="1";fb.innerHTML=o.fb;}setResults[i]={ok:o.ok,inds:q._entry.indicators.slice()};checkedCount++;if(o.ok)correctCount++;}\n    if(o.sol){var sl=$("sol"+i);if(sl)sl.classList.add("show");}',
    '    if(o.done){var fb=$("fb"+i);if(fb){fb.classList.add("show");fb.dataset.done="1";fb.innerHTML=o.fb;}setResults[i]={ok:o.ok,inds:q._entry.indicators.slice()};checkedCount++;if(o.ok)correctCount++;}\n    if(o.sol){var sl=$("sol"+i);if(sl)sl.classList.add("show");}\n    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");', count=1)
rep('    _rsess.addEventListener("click",function(ev){var t=ev.target;if(t&&t.closest&&t.closest("[data-check],[data-sol],[data-ex],[data-hint],[data-exanother],#gradeBtn"))resumeSaveSoon();});',
    '    _rsess.addEventListener("click",function(ev){var t=ev.target;if(t&&t.closest&&t.closest("[data-check],[data-sol],[data-ex],[data-hint],[data-exanother],[data-rate],#gradeBtn"))resumeSaveSoon();});', count=1)

# ---------- Prerequisite checks: pkonly (Nov 15, 2026) ----------
# The Math 2201 PK tranche's selectability piece (spec Section 6):
# the pkonly=1 link parameter in settings()/settingsToURL()/
# applyURL(), the drawSet pkonly branch fed by PKONLY_DRAW (set
# only by startOnline, so sheets, exams and exports ignore it),
# and the Advanced tools Start prerequisite check action with its
# pool line, all strings through L9. Mirrors the hand edits to
# index.html from the same pass; the trial rebuild must stay
# byte-identical to the shipped shell.
rep('        <button type="button" id="goOnline">Practice online</button>',
    '        <button type="button" id="goOnline">Practice online</button>\n        <button type="button" id="pkCheckBtn" hidden>Start prerequisite check</button>', count=1)  # pkCheckBtn markup
rep('var PICKER_SCOPE=false;',
    "var PICKER_SCOPE=false;\n/* Prerequisite check draws (Nov 15, 2026): PKONLY_DRAW is set by\n   startOnline for the duration of one practice draw when the\n   settings carry pkOnly (the pkonly=1 link parameter); drawSet's\n   pkonly branch answers it. It is never set on the sheet or exam\n   paths, so sheets, exams and exports ignore pkonly by\n   construction. */\nvar PKONLY_DRAW=false;", count=1)  # PKONLY_DRAW declaration
rep('function pkIncluded(){\n  var el=null;\n  try{el=document.getElementById("pkInChk");}catch(err){}\n  if(el)return !!el.checked;\n  return (typeof hidCtl!=="undefined"&&hidCtl)?hidCtl.pkIn!==false:true;\n}',
    'function pkIncluded(){\n  var el=null;\n  try{el=document.getElementById("pkInChk");}catch(err){}\n  if(el)return !!el.checked;\n  return (typeof hidCtl!=="undefined"&&hidCtl)?hidCtl.pkIn!==false:true;\n}\n/* Prerequisite checks (Nov 15, 2026, the Math 2201 PK tranche):\n   pkOnlyActive() reports the pkonly state stashed in hidCtl (set\n   from the pkonly=1 link parameter by applyURL, or by the Advanced\n   tools prerequisite check action). pkGroupOf(e) names the skill\n   family a check samples: the entry\'s pkGroup property where its\n   bank module sets one, else its PK code, else its own id, so the\n   coded PK.1 and PK.2 families group without being edited. */\nfunction pkOnlyActive(){\n  return (typeof hidCtl!=="undefined"&&hidCtl)?!!hidCtl.pkOnly:false;\n}\nfunction pkGroupOf(e){\n  if(e.pkGroup)return e.pkGroup;\n  for(var i=0;i<e.indicators.length;i++){if(e.indicators[i].indexOf("PK")===0)return e.indicators[i];}\n  return e.id;\n}', count=1)  # pkOnlyActive and pkGroupOf
rep('function drawSet(units,inds,n,mix,orderMode,cap,pred){\n  var pool=poolFor(units,inds,cap,pred);',
    'function drawSet(units,inds,n,mix,orderMode,cap,pred){\n  if(typeof PKONLY_DRAW!=="undefined"&&PKONLY_DRAW&&!pred){\n    /* Prerequisite check draw (Nov 15, 2026): the pool is the\n       selected units\' prior knowledge entries only, taken with no\n       indicator filter and no cap: pkonly overrides the practice\n       PK switch (pkin=0) and any indicator selection carried on\n       the link. The branch answers only predicate-free draws (the\n       practice funnel): sheet draws always pass a predicate, so a\n       sheet can never enter it, whatever the flag\'s state. The\n       check deals min(n, pool) questions, at most\n       one entry per pkGroup until every group is sampled, no\n       entry repeated, and at most one Level 3 question, admitted\n       only as filler when the Level 1 and 2 entries cannot fill\n       the check. Dealing the whole pool is a full check, not a\n       thin one; thin reports only a genuine duplicate or a\n       shortfall against the requested count. */\n    var pkPool=poolFor(units,[],false).filter(function(e){return typeof isPK==="function"&&isPK(e);});\n    if(!pkPool.length||n<1)return{items:[],short:0,pool:0,thin:false};\n    var want=Math.min(n,pkPool.length);\n    var byGroup={},gNames=[];\n    pkPool.forEach(function(e){var g=pkGroupOf(e);if(!byGroup[g]){byGroup[g]=[];gNames.push(g);}byGroup[g].push(e);});\n    var chosenP=[],usedP={};\n    shuffle(gNames.slice()).forEach(function(g){\n      if(chosenP.length>=want)return;\n      var cands=shuffle(byGroup[g].filter(function(e){return e.level<3&&!usedP[e.id];}));\n      if(cands.length){chosenP.push(cands[0]);usedP[cands[0].id]=1;}\n    });\n    if(chosenP.length<want){\n      shuffle(pkPool.filter(function(e){return e.level<3&&!usedP[e.id];})).forEach(function(e){\n        if(chosenP.length<want){chosenP.push(e);usedP[e.id]=1;}\n      });\n    }\n    if(chosenP.length<want){\n      var l3=shuffle(pkPool.filter(function(e){return e.level>=3&&!usedP[e.id];}));\n      if(l3.length){chosenP.push(l3[0]);usedP[l3[0].id]=1;}\n    }\n    var itemsP=[],seenPC={};\n    chosenP.forEach(function(e){\n      var q=e.gen(),c=canonQ(q),tries=0;\n      while(seenPC[c]&&tries<25){q=e.gen();c=canonQ(q);tries++;}\n      seenPC[c]=1;q._entry=e;itemsP.push(q);\n    });\n    if(orderMode==="unit")itemsP.sort(function(a,b){return a._entry.unit-b._entry.unit;});\n    else itemsP=shuffle(itemsP);\n    var dupP=false,seenP3={};\n    itemsP.forEach(function(q){var c=canonQ(q);if(seenP3[c])dupP=true;seenP3[c]=1;});\n    var wholePool=itemsP.length>=pkPool.length;\n    return {items:itemsP,reused:0,pool:pkPool.length,thin:wholePool?false:(dupP||itemsP.length<want)};\n  }\n  var pool=poolFor(units,inds,cap,pred);', count=1)  # drawSet pkonly branch
rep('function updatePoolInfo(){refreshFace();\n  var p=poolFor(state.units,state.inds,state.finalCap?"final":state.midCap);',
    'function refreshPkCheckBtn(){\n  var b=$("pkCheckBtn");if(!b)return;\n  var show=false;\n  if(typeof TEACHER!=="undefined"&&TEACHER&&state.units.length===1){\n    show=poolFor(state.units,[],false).some(function(e){return typeof isPK==="function"&&isPK(e);});\n  }\n  b.hidden=!show;\n  if(show)b.textContent=L9("Start prerequisite check","Commencer la vérification des préalables");\n}\nfunction updatePoolInfo(){refreshFace();refreshPkCheckBtn();\n  if(pkOnlyActive()){\n    var pkp=poolFor(state.units,[],false).filter(function(e){return typeof isPK==="function"&&isPK(e);});\n    $("poolInfo").textContent=state.units.length===1?\n      L9("Prerequisite check pool for Unit ","Réserve pour la vérification des préalables, unité ")+state.units[0]+L9(": "," : ")+pkp.length+L9(" questions"," questions"):\n      L9("Prerequisite check pool: ","Réserve pour la vérification des préalables : ")+pkp.length+L9(" questions"," questions");\n    return;\n  }\n  var p=poolFor(state.units,state.inds,state.finalCap?"final":state.midCap);', count=1)  # refreshPkCheckBtn and pool line
rep('pk:false,enr:false,pkIn:true};',
    'pk:false,enr:false,pkIn:true,pkOnly:false};', count=1)  # hidCtl pkOnly
rep('    enr:enrichIncluded(),\n    pkIn:pkIncluded(),',
    '    enr:enrichIncluded(),\n    pkIn:pkIncluded(),\n    pkOnly:pkOnlyActive(),', count=1)  # settings pkOnly
rep('    cb.addEventListener("change",function(){state.midCap=false;state.finalCap=false;readUnits();renderIndicators();updatePoolInfo();});',
    '    cb.addEventListener("change",function(){state.midCap=false;state.finalCap=false;hidCtl.pkOnly=false;readUnits();renderIndicators();updatePoolInfo();});', count=1)  # unit checkbox clears pkOnly
rep('  var s=settings();var _sd=activeSeed(s);sessionSeed=_sd;\n  var res=withSeed(_sd,function(){return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.finalCap?"final":s.midCap);});',
    '  var s=settings();var _sd=activeSeed(s);sessionSeed=_sd;\n  PKONLY_DRAW=!!s.pkOnly;\n  var res=withSeed(_sd,function(){return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.finalCap?"final":s.midCap);});\n  PKONLY_DRAW=false;', count=1)  # startOnline sets PKONLY_DRAW
rep('  if(!s.pkIn)p.set("pkin","0");',
    '  if(!s.pkIn)p.set("pkin","0");\n  if(s.pkOnly)p.set("pkonly","1");', count=1)  # settingsToURL pkonly
rep('  if(p.get("pkin")==="0"){hidCtl.pkIn=false;if($("pkInChk"))$("pkInChk").checked=false;}',
    '  if(p.get("pkin")==="0"){hidCtl.pkIn=false;if($("pkInChk"))$("pkInChk").checked=false;}\n  if(p.get("pkonly")==="1"){hidCtl.pkOnly=true;}', count=1)  # applyURL pkonly
rep('function setPreset(units,cap){state.units=units;state.inds=[];state.midCap=(cap===true);state.finalCap=(cap==="final");unitCheckboxes();renderIndicators();updatePoolInfo();}',
    'function setPreset(units,cap){state.units=units;state.inds=[];state.midCap=(cap===true);state.finalCap=(cap==="final");hidCtl.pkOnly=false;unitCheckboxes();renderIndicators();updatePoolInfo();}', count=1)  # setPreset clears pkOnly
rep('$("goOnline").addEventListener("click",startOnline);',
    '$("goOnline").addEventListener("click",function(){hidCtl.pkOnly=false;startOnline();});\n(function(){var b=$("pkCheckBtn");if(!b)return;b.addEventListener("click",function(){\n  hidCtl.pkOnly=true;\n  var pool=poolFor(state.units,[],false).filter(function(e){return isPK(e);});\n  var ci=$("countIn");if(ci)ci.value=Math.min(8,pool.length);\n  updatePoolInfo();startOnline();\n});})();', count=1)  # goOnline clears and pkCheckBtn action
# Follow-on (Nov 15, 2026, Jason): a prerequisite check render
# carries no Formulas and facts panel. renderOnline is the only
# consumer of refPanelsHtml; the suppression keys off the live
# pkOnlyActive() state at render time, so resumed checks render
# panel-free too. Sheets, exams and exports never call it.
rep('refPanelsHtml(s.units)',
    '(pkOnlyActive()?"":refPanelsHtml(s.units))', count=1)  # no panel on pkonly renders
rep('function renderOnline(scroll){\n  var s=lastSettings;var res={thin:onlineThin};',
    'function renderOnline(scroll){\n  var s=lastSettings;var res={thin:onlineThin};\n  /* Prerequisite checks carry no Formulas and facts panel (Nov 15,\n     2026, Jason): the panel holds the host unit\'s reference\n     material, while a check measures feeder skills the student is\n     expected to already have. The suppression keys off the live\n     pkOnlyActive() state at render time, so a resumed check (whose\n     save only matches when the pkonly link state is reproduced)\n     renders panel-free as well. */', count=1)  # panel suppression note


# ---------- Group-keyed retry for checks (Nov 15, 2026) ----------
# Follow-on to the pkonly pass (Jason's ruling): a check's
# summary names its skill groups in plain language (solid, or
# needs more practice) instead of host indicator codes, and
# Practice what I missed on a check deals a fresh set at the
# check size from the missed groups only, through the
# PKRETRY_GROUPS stash startOnline consumes into
# PKONLY_GROUPS for drawSet's pkonly branch. Ordinary sets
# keep the indicator-keyed retry. Mirrors the hand edits to
# index.html from the same pass; the trial rebuild must stay
# byte-identical to the shipped shell.
rep('var PKONLY_DRAW=false;',
    "var PKONLY_DRAW=false;\n/* Group-keyed retry (Nov 15, 2026): PKRETRY_GROUPS is the stash\n   retryMissed fills with the missed skill groups of a completed\n   check; startOnline consumes it into PKONLY_GROUPS for the one\n   draw it drives, and drawSet's pkonly branch then deals only\n   from those groups. Neither variable is ever set on the sheet\n   or exam paths. */\nvar PKONLY_GROUPS=null,PKRETRY_GROUPS=null;", count=1)  # PKONLY_GROUPS declarations
rep('function pkGroupOf(e){\n  if(e.pkGroup)return e.pkGroup;\n  for(var i=0;i<e.indicators.length;i++){if(e.indicators[i].indexOf("PK")===0)return e.indicators[i];}\n  return e.id;\n}',
    'function pkGroupOf(e){\n  if(e.pkGroup)return e.pkGroup;\n  for(var i=0;i<e.indicators.length;i++){if(e.indicators[i].indexOf("PK")===0)return e.indicators[i];}\n  return e.id;\n}\n/* Plain-language names for the skill groups a check samples\n   (Nov 15, 2026): the summary of a check names skills, not host\n   indicator codes, so each pkGroup value in the Math 2201,\n   Math 2200 and Math 3202 tranches (and the coded PK.1 and PK.2 families)\n   carries an explicit bilingual label here; an unlisted group falls back\n   to its prettified slug rather than rendering raw. */\nvar PK_GROUP_LABELS={\n "PK.1":["Measures of central tendency","Mesures de tendance centrale"],\n "PK.2":["Factoring quadratic expressions","Factorisation d\'expressions quadratiques"],\n "angle-justification":["Justifying steps with angle facts","Justifier des étapes à l\'aide de faits sur les angles"],\n "angle-measure":["Complementary and supplementary angles","Angles complémentaires et supplémentaires"],\n "area":["Area of shapes","Aire de figures"],\n "break-even":["Setting up and solving equations","Établir et résoudre des équations"],\n "budget-goals":["Adjusting a budget for a goal","Ajuster un budget pour un objectif"],\n "budgeting":["Budget totals","Totaux d\'un budget"],\n "business-totals":["Business money totals","Totaux d\'argent d\'une entreprise"],\n "centre-backwards":["Working backwards from a mean","Travailler à rebours à partir d\'une moyenne"],\n "centre-measures":["Mean, median and mode","Moyenne, médiane et mode"],\n "common-factor":["Finding common factors","Trouver les facteurs communs"],\n "conjecture":["Making and testing conjectures","Formuler et vérifier des conjectures"],\n "conversion":["Converting units","Convertir des unités"],\n "cost-totals":["Totalling costs over a period","Totaliser des coûts sur une période"],\n "counterexample":["Counterexamples","Contre-exemples"],\n "credit-and-loans":["Credit and loan costs","Coûts du crédit et des prêts"],\n "data-claims":["Judging claims made from data","Évaluer des affirmations tirées de données"],\n "definedness":["When a square root is defined","Quand une racine carrée est définie"],\n "domain-range":["Domain and range","Domaine et image"],\n "elevation-depression":["Angles of elevation and depression","Angles d\'élévation et de dépression"],\n "equation-solving":["Solving equations","Résoudre des équations"],\n "equivalent-fractions":["Equivalent fractions","Fractions équivalentes"],\n "estimation":["Estimating and judging measurements","Estimer et juger des mesures"],\n "exponent-laws":["Exponent laws","Lois des exposants"],\n "factoring":["Factoring polynomials","Factorisation de polynômes"],\n "factors-multiples":["Factors and multiples","Facteurs et multiples"],\n "find-angle":["Finding an angle in a right triangle","Trouver un angle d\'un triangle rectangle"],\n "find-side":["Finding a side in a right triangle","Trouver un côté d\'un triangle rectangle"],\n "formula-use":["Using formulas","Utiliser des formules"],\n "fraction-operations":["Operations with fractions","Opérations sur les fractions"],\n "freq-table":["Frequency tables and the mean","Tableaux de fréquences et la moyenne"],\n "function-notation":["Function notation","Notation des fonctions"],\n "graph-choice":["Choosing a graph","Choisir un graphique"],\n "graph-forms":["Graphing lines from their equations","Tracer des droites à partir de leurs équations"],\n "graph-judgement":["Judging graphs and conclusions","Juger des graphiques et des conclusions"],\n "graph-reading":["Reading graphs","Lecture de graphiques"],\n "graph-trends":["Trends in data","Tendances dans les données"],\n "graphing-data":["Graphing data","Représenter graphiquement des données"],\n "gross-pay":["Gross pay","Salaire brut"],\n "growth-percent":["Percent growth and repeated multiplication","Croissance en pourcentage et multiplication répétée"],\n "inductive-limit":["The limits of inductive reasoning","Les limites du raisonnement inductif"],\n "inequality-context":["Inequalities in context","Inégalités en contexte"],\n "inequality-graphing":["Graphing an inequality on a number line","Représenter une inégalité sur une droite numérique"],\n "inequality-solving":["Solving a linear inequality","Résoudre une inégalité linéaire"],\n "instrument-reading":["Reading measuring instruments","Lecture d\'instruments de mesure"],\n "intercepts":["Finding intercepts","Trouver les coordonnées à l\'origine"],\n "interp-extrap":["Interpolating and extrapolating","Interpolation et extrapolation"],\n "intersection-meaning":["What the solution of a system means","Ce que signifie la solution d\'un système"],\n "isolate-variable":["Isolating a variable","Isoler une variable"],\n "linear-equations":["Solving linear equations","Résoudre des équations linéaires"],\n "measurement":["Surface area and volume","Aire totale et volume"],\n "number-line-distance":["Distance on a number line","Distance sur une droite numérique"],\n "patterns":["Patterns and expressions","Régularités et expressions"],\n "payroll":["Payroll deductions","Retenues sur la paie"],\n "percent-change":["Percent change","Variation en pourcentage"],\n "percent-of-amount":["Percent of an amount","Pourcentage d\'un montant"],\n "polygon-angles":["Angle sums in polygons","Sommes des angles dans les polygones"],\n "polynomial-language":["Parts of a polynomial","Parties d\'un polynôme"],\n "polynomial-operations":["Polynomial operations","Opérations sur les polynômes"],\n "powers":["Working with powers","Travailler avec les puissances"],\n "polynomial-multiply":["Multiplying polynomials","Multiplier des polynômes"],\n "probability-decisions":["Probability in decisions and media","La probabilité dans les décisions et les médias"],\n "probability-forms":["Forms of probability","Formes de probabilité"],\n "proof-error":["Spotting errors in a proof","Repérer les erreurs dans une preuve"],\n "pythagoras":["The Pythagorean theorem","Le théorème de Pythagore"],\n "radical-forms":["Mixed and entire radicals","Radicaux mixtes et entiers"],\n "radicals":["Simplifying square roots","Simplifier des racines carrées"],\n "rate":["Rates and unit rates","Taux et taux unitaires"],\n "rate-of-change":["Rate of change","Taux de variation"],\n "real-numbers":["Rational and irrational numbers","Nombres rationnels et irrationnels"],\n "reasonable-result":["Judging whether a trig result is reasonable","Juger si un résultat trigonométrique est raisonnable"],\n "reciprocal-values":["Reciprocals of numbers","Inverses de nombres"],\n "rounding":["Rounding measurements","Arrondir des mesures"],\n "sample-population":["Samples and populations","Échantillons et populations"],\n "sample-scale":["How sample size affects a conclusion","Effet de la taille de l\'échantillon sur une conclusion"],\n "scale":["Scale diagrams","Dessins à l\'échelle"],\n "similarity":["Similar figures","Figures semblables"],\n "slope":["Slope","Pente"],\n "solve-quadratic":["Solving a quadratic equation by factoring","Résoudre une équation quadratique par factorisation"],\n "solve-triangle":["Solving a right triangle completely","Résoudre complètement un triangle rectangle"],\n "square-roots":["Squares and square roots","Carrés et racines carrées"],\n "substitution":["Evaluating expressions by substitution","Évaluer des expressions par substitution"],\n "surface-area":["Surface area","Aire de la surface"],\n "symmetry":["Symmetry","Symétrie"],\n "systems-algebraic":["Solving a system algebraically","Résoudre un système algébriquement"],\n "systems-graphical":["Solving a system from its graph","Résoudre un système à partir de son graphique"],\n "tables-and-graphs":["Tables and graphs of patterns","Tables et graphiques de régularités"],\n "tolerance-arithmetic":["Working out acceptable ranges","Calculer des intervalles acceptables"],\n "transformations":["Translations, reflections and rotations","Translations, réflexions et rotations"],\n "transversal-pairs":["Angle pairs formed by a transversal","Paires d\'angles formées par une sécante"],\n "transversal-use":["Using angle facts with parallel lines","Utiliser les faits sur les angles avec des droites parallèles"],\n "triangle-angles":["Angle sum in a triangle","Somme des angles d\'un triangle"],\n "trig-context":["Trigonometry word problems","Problèmes de trigonométrie en contexte"],\n "trig-ratios":["Trigonometric ratios","Rapports trigonométriques"],\n "trig-sides":["Naming the sides of a right triangle","Nommer les côtés d\'un triangle rectangle"],\n "undefined-values":["When a fraction is undefined","Quand une fraction n\'est pas définie"],\n "unit-rate":["Comparing unit rates","Comparer des taux unitaires"],\n "valid-chain":["Following a chain of reasoning","Suivre une chaîne de raisonnement"],\n "verify-solution":["Checking whether a value solves an equation","Vérifier si une valeur résout une équation"],\n "views":["Object views","Vues d\'un objet"],\n "volume":["Volume","Volume"]\n};\nfunction pkGroupLabel(g){\n  var p=PK_GROUP_LABELS[g];\n  if(p)return L9(p[0],p[1]);\n  var w=String(g).replace(/-/g," ");\n  return w.charAt(0).toUpperCase()+w.slice(1);\n}', count=1)  # pkGroupLabel map and helper
rep('    if(!pkPool.length||n<1)return{items:[],short:0,pool:0,thin:false};',
    '    if(!pkPool.length||n<1)return{items:[],short:0,pool:0,thin:false};\n    if(typeof PKONLY_GROUPS!=="undefined"&&PKONLY_GROUPS&&PKONLY_GROUPS.length){\n      /* Group-keyed retry draw (Nov 15, 2026): the pool narrows\n         to the missed groups only, so mastered groups contribute\n         nothing. Dealing runs round-robin across the missed\n         groups, each turn preferring the group\'s least-dealt\n         Level 1 or 2 entry, dealt again as a fresh instance when\n         its group is thin, with the check\'s duplicate discipline\n         (regenerate up to 25 times to avoid an identical\n         canonical question). A group whose entries are all\n         Level 3 takes its turn through a single Level 3 question\n         for the whole set, the check\'s filler discipline; if the\n         missed groups are all Level 3, the set is that one\n         question and thin reports the shortfall. thin otherwise\n         reports only a genuine duplicate, as the check reports\n         it. */\n      var rPool=pkPool.filter(function(e){return PKONLY_GROUPS.indexOf(pkGroupOf(e))>=0;});\n      if(rPool.length){\n        var byGroupR={},gOrder=[];\n        rPool.forEach(function(e){var g=pkGroupOf(e);if(!byGroupR[g]){byGroupR[g]=[];gOrder.push(g);}byGroupR[g].push(e);});\n        gOrder=shuffle(gOrder);\n        var itemsR=[],seenRC={},useR={},l3R=0;\n        var dealR=function(g,allowL3){\n          var cands=byGroupR[g].filter(function(e){return allowL3?(e.level>=3&&l3R<1):e.level<3;});\n          if(!cands.length)return false;\n          cands=shuffle(cands).sort(function(a,b){return (useR[a.id]||0)-(useR[b.id]||0);});\n          var e=cands[0];\n          var q=e.gen(),c=canonQ(q),tries=0;\n          while(seenRC[c]&&tries<25){q=e.gen();c=canonQ(q);tries++;}\n          seenRC[c]=1;useR[e.id]=(useR[e.id]||0)+1;if(e.level>=3)l3R++;\n          q._entry=e;itemsR.push(q);return true;\n        };\n        var progressR=true;\n        while(itemsR.length<n&&progressR){\n          progressR=false;\n          for(var gi=0;gi<gOrder.length&&itemsR.length<n;gi++){\n            if(dealR(gOrder[gi],false)||dealR(gOrder[gi],true))progressR=true;\n          }\n        }\n        if(orderMode==="unit")itemsR.sort(function(a,b){return a._entry.unit-b._entry.unit;});\n        else itemsR=shuffle(itemsR);\n        var dupR=false,seenR3={},distinctR={};\n        itemsR.forEach(function(q){var c=canonQ(q);if(seenR3[c])dupR=true;seenR3[c]=1;distinctR[q._entry.id]=1;});\n        return {items:itemsR,reused:itemsR.length-Object.keys(distinctR).length,pool:rPool.length,thin:dupR||itemsR.length<n};\n      }\n    }', count=1)  # drawSet group-keyed retry draw
rep('  var h=\'<div class="summarybox"><h3>\'+L9("Set complete","Série terminée")+\'</h3><p>\'+(FR9?("Tu as obtenu "+correctCount+" sur "+current.length+" aux premières vérifications."):("You scored "+correctCount+" of "+current.length+" on first checks."))+"</p>";\n  if(missed.length){\n    h+="<p><b>"+L9("Indicators to practise more:","Notions à pratiquer davantage :")+"</b></p><ul>"+missed.map(function(c){return "<li>"+c+L9(": "," : ")+(INDICATORS[c]||"")+"</li>";}).join("")+\'</ul><p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';\n  }else{\n    h+="<p>"+L9("Every indicator in this set was answered correctly on its first check. Nice work.","Chaque notion de cette série a été réussie à la première vérification. Beau travail.")+"</p>";\n  }',
    '  var h=\'<div class="summarybox"><h3>\'+L9("Set complete","Série terminée")+\'</h3><p>\'+(FR9?("Tu as obtenu "+correctCount+" sur "+current.length+" aux premières vérifications."):("You scored "+correctCount+" of "+current.length+" on first checks."))+"</p>";\n  if(pkOnlyActive()){\n    /* Group readout (Nov 15, 2026): a check\'s summary names the\n       skill groups it sampled, in plain language, each group\n       solid or needing more practice; a PK item\'s indicator tag\n       is a host tag shared across groups, so indicators are the\n       wrong thing to present or to practise by here. Group\n       status reads setResults exactly as the indicator readout\n       does: a group is missed when any of its questions carries\n       a recorded not-correct result (a prose self-rating of part\n       or missed included). The retry button below keys on these\n       groups. */\n    var gStat={},gList=[];\n    current.forEach(function(q,i){\n      if(!q._entry)return;\n      var g=pkGroupOf(q._entry);\n      if(!gStat[g]){gStat[g]={missed:false};gList.push(g);}\n      if(setResults[i]&&!setResults[i].ok)gStat[g].missed=true;\n    });\n    var anyMissedG=gList.some(function(g){return gStat[g].missed;});\n    h+="<p><b>"+L9("Skills in this check:","Compétences vérifiées :")+"</b></p><ul>"+gList.map(function(g){\n      return "<li>"+pkGroupLabel(g)+L9(": "," : ")+(gStat[g].missed?L9("needs more practice","à pratiquer davantage"):L9("solid","solide"))+"</li>";\n    }).join("")+"</ul>";\n    if(anyMissedG){\n      h+=\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';\n    }else{\n      h+="<p>"+L9("Every skill in this check was answered correctly on its first check. Nice work.","Chaque compétence de cette vérification a été réussie à la première vérification. Beau travail.")+"</p>";\n    }\n  }else if(missed.length){\n    h+="<p><b>"+L9("Indicators to practise more:","Notions à pratiquer davantage :")+"</b></p><ul>"+missed.map(function(c){return "<li>"+c+L9(": "," : ")+(INDICATORS[c]||"")+"</li>";}).join("")+\'</ul><p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';\n  }else{\n    h+="<p>"+L9("Every indicator in this set was answered correctly on its first check. Nice work.","Chaque notion de cette série a été réussie à la première vérification. Beau travail.")+"</p>";\n  }', count=1)  # maybeSummary group readout
rep('function retryMissed(){\n  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok)setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});\n  if(!missed.length)return;\n  state.inds=missed;\n  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));\n  _suppressSeedOnce=true;\n  renderIndicators();updatePoolInfo();startOnline();\n}',
    'function retryMissed(){\n  if(pkOnlyActive()){\n    /* Group-keyed retry (Nov 15, 2026): on a check, what was\n       missed is a skill group, not an indicator. The missed\n       groups are stashed for the one draw startOnline drives\n       next; the retry is itself a check set (pkOnly stays\n       active, its link keeps pkonly=1, the formulas panel stays\n       suppressed), dealt at the check size from the missed\n       groups only. */\n    var gMissed=[],gSeen={};\n    current.forEach(function(q,i){\n      if(!q._entry)return;\n      var g=pkGroupOf(q._entry);\n      if(setResults[i]&&!setResults[i].ok&&!gSeen[g]){gSeen[g]=1;gMissed.push(g);}\n    });\n    if(!gMissed.length)return;\n    PKRETRY_GROUPS=gMissed;\n    $("countIn").value=8;\n    _suppressSeedOnce=true;\n    ANALYTICS_RETRY_KIND="pk";\n    updatePoolInfo();startOnline();\n    return;\n  }\n  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok)setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});\n  if(!missed.length)return;\n  state.inds=missed;\n  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));\n  _suppressSeedOnce=true;\n  renderIndicators();updatePoolInfo();startOnline();\n}', count=1)  # retryMissed group-keyed path
rep('  PKONLY_DRAW=!!s.pkOnly;\n  var res=withSeed(_sd,function(){return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.finalCap?"final":s.midCap);});\n  PKONLY_DRAW=false;',
    '  PKONLY_DRAW=!!s.pkOnly;\n  PKONLY_GROUPS=(PKONLY_DRAW&&typeof PKRETRY_GROUPS!=="undefined"&&PKRETRY_GROUPS&&PKRETRY_GROUPS.length)?PKRETRY_GROUPS:null;\n  PKRETRY_GROUPS=null;\n  var res=withSeed(_sd,function(){return drawSet(s.units,s.inds,s.count,s.mix,s.order,s.finalCap?"final":s.midCap);});\n  PKONLY_DRAW=false;PKONLY_GROUPS=null;', count=1)  # startOnline consumes PKRETRY_GROUPS

# ---------- Scaffold suppression: teacher link toggles and end-mode
# example deferral (Nov 15, 2026) ----------
# Built into the shipped shell and back-ported here in the same pass,
# in the back-port manner: each rep anchors on the shipped text it
# amends. Part 1: beside the shuffle choice in all three teacher
# views, a teacher can turn Hints or Worked examples Off for student
# links (choices persist on the teacher's device as hintPref and
# exPref, like shufPref); a student link minted while a choice is
# Off carries nohint=1 or noex=1, read by applyURL into NO_HINT and
# NO_EX, and renderOnline keys its Hint button, hint box and Worked
# example button on hintsAllowed() and exAllowedQ(), so a suppressed
# scaffold never renders at any materialization point. The teacher
# view is immune (the helpers key the suppression off !TEACHER).
# The resume save carries the flags in its body and its signature,
# so a resumed set never regains a suppressed scaffold, and the
# restore paths guard hint and example state on the same helpers.
# Part 2: exAllowedQ also withholds the Worked example button in
# check-at-the-end mode until grading; gradeAll and the graded
# restore blocks call revealExamples() to insert the deferred
# buttons, and a suppressed example is never revealed.
rep('var SHUFFLE_OPTS=false;\nfunction shufQ(q){',
    'var SHUFFLE_OPTS=false;\n/* Scaffold suppression for shared student links (Jason, Nov 15,\n   2026): the companion toggles to the shuffle choice above, raised\n   by Jason after he found the Worked example button still offered\n   in check-at-the-end mode. A teacher copying a student link can\n   turn Hints or Worked examples Off for that link; the link then\n   carries nohint=1 or noex=1, and a student opening it never sees\n   the suppressed scaffold (no Hint button, no Worked example\n   button) at any materialization point: settings draws, seeded\n   links, teacher-built set links and resume restores alike. The\n   choices default On (today\'s behaviour), persist on the teacher\'s\n   device like shufPref, and teacher links never carry the flags.\n   The teacher\'s own view is immune: with the flags present, a\n   teacher still sees both scaffolds, because hiding a control for\n   students never disables its setting for teachers. Print sheets\n   and Word exports carry no scaffolds, so the flags have no effect\n   on those routes. Separately, in check-at-the-end mode the Worked\n   example button is deferred for students until the set is graded:\n   a worked example is a solved parallel problem, so it follows the\n   worked solutions, which that mode already holds back until\n   grading. Hints are not deferred. A suppressed example never\n   appears, even after grading; a deferred but unsuppressed one\n   appears at grading. */\nvar NO_HINT=false,NO_EX=false;\nfunction hintsAllowed(){return !!(window.__COURSE&&window.__COURSE.hints)&&!(!TEACHER&&NO_HINT);}\nfunction exSuppressed(){return !TEACHER&&NO_EX;}\nfunction exDeferred(){return !TEACHER&&checkMode==="end"&&!endGraded;}\nfunction exAllowedQ(q){return exampleCapable(q&&q._entry)&&!exSuppressed()&&!exDeferred();}\nfunction revealExamples(){\n  if(!current||exSuppressed())return;\n  current.forEach(function(q,i){\n    if(!exampleCapable(q._entry))return;\n    if(document.querySelector(\'[data-ex="\'+i+\'"]\'))return;\n    var solB=document.querySelector(\'[data-sol="\'+i+\'"]\');if(!solB||!solB.parentNode)return;\n    var b=document.createElement("button");\n    b.type="button";b.className="alt";b.setAttribute("data-ex",String(i));\n    b.textContent=L9("See a worked example","Voir un exemple travaillé");\n    b.addEventListener("click",function(){toggleExample(i);});\n    solB.parentNode.insertBefore(b,solB);\n    solB.parentNode.insertBefore(document.createTextNode(" "),solB);\n  });\n}\nfunction shufQ(q){', count=1)  # NO_HINT/NO_EX declarations and scaffold helpers
rep('function tShareURL(teacher){\n  var p=new URLSearchParams(settingsToURL().split("?")[1]||"");\n  p.delete("teacher");p.delete("seed");p.delete("shuf");\n  var shufSel=$("tShufSel");\n  if(shufSel){try{localStorage.setItem("shufPref",shufSel.value);}catch(e){}\n    if(!teacher&&shufSel.value==="shuf")p.set("shuf","1");}',
    'function tHintPref(){try{return localStorage.getItem("hintPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tExPref(){try{return localStorage.getItem("exPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tScafSelHtml(){\n  var hp=tHintPref(),ep=tExPref();\n  return \' <label class="hint">\'+L9("Hints in student links:","Indices dans les liens des élèves :")+\' <select id="tHintSel"><option value="on"\'+(hp==="on"?" selected":"")+\'>\'+L9("On","Activés")+\'</option><option value="off"\'+(hp==="off"?" selected":"")+\'>\'+L9("Off","Désactivés")+\'</option></select></label>\'\n    +\' <label class="hint">\'+L9("Worked examples in student links:","Exemples travaillés dans les liens des élèves :")+\' <select id="tExSel"><option value="on"\'+(ep==="on"?" selected":"")+\'>\'+L9("On","Activés")+\'</option><option value="off"\'+(ep==="off"?" selected":"")+\'>\'+L9("Off","Désactivés")+\'</option></select></label>\';\n}\nfunction tShareURL(teacher){\n  var p=new URLSearchParams(settingsToURL().split("?")[1]||"");\n  p.delete("teacher");p.delete("seed");p.delete("shuf");\n  var shufSel=$("tShufSel");\n  if(shufSel){try{localStorage.setItem("shufPref",shufSel.value);}catch(e){}\n    if(!teacher&&shufSel.value==="shuf")p.set("shuf","1");}\n  p.delete("nohint");p.delete("noex");\n  var hintSel=$("tHintSel");\n  if(hintSel){try{localStorage.setItem("hintPref",hintSel.value);}catch(e){}\n    if(!teacher&&hintSel.value==="off")p.set("nohint","1");}\n  var exSel=$("tExSel");\n  if(exSel){try{localStorage.setItem("exPref",exSel.value);}catch(e){}\n    if(!teacher&&exSel.value==="off")p.set("noex","1");}', count=1)  # tHintPref/tExPref/tScafSelHtml and tShareURL minting
rep("tShufSelHtml()+' <span",
    "tShufSelHtml()+tScafSelHtml()+' <span", count=3)  # teacher bars: scaffold selects beside the shuffle choice
rep('    html+=\'<p><button type="button" data-check="\'+i+\'">\'+L9("Check","Vérifier")+\'</button> \'+(window.__COURSE&&window.__COURSE.hints?\'<button type="button" class="alt" data-hint="\'+i+\'">\'+L9("Hint","Indice")+\'</button> \':\'\')+(exampleCapable(q._entry)?\'<button type="button" class="alt" data-ex="\'+i+\'">\'+L9("See a worked example","Voir un exemple travaillé")+\'</button> \':\'\')+\'<button type="button" class="alt" data-sol="\'+i+\'">\'+L9("Show worked solution","Voir la solution détaillée")+\'</button></p><div class="fb" id="fb\'+i+\'"></div><div class="fbtext" id="fbt\'+i+\'"></div>\'+(window.__COURSE&&window.__COURSE.hints?\'<div class="hintbox" id="hint\'+i+\'" hidden></div>\':\'\')+\'<div class="exbox" id="ex\'+i+\'" hidden></div><div class="sol" id="sol\'+i+\'"><b>\'+L9("Worked solution:","Solution détaillée :")+\'</b> \'+stepHTML(q.solution)+\'</div>\'',
    '    html+=\'<p><button type="button" data-check="\'+i+\'">\'+L9("Check","Vérifier")+\'</button> \'+(hintsAllowed()?\'<button type="button" class="alt" data-hint="\'+i+\'">\'+L9("Hint","Indice")+\'</button> \':\'\')+(exAllowedQ(q)?\'<button type="button" class="alt" data-ex="\'+i+\'">\'+L9("See a worked example","Voir un exemple travaillé")+\'</button> \':\'\')+\'<button type="button" class="alt" data-sol="\'+i+\'">\'+L9("Show worked solution","Voir la solution détaillée")+\'</button></p><div class="fb" id="fb\'+i+\'"></div><div class="fbtext" id="fbt\'+i+\'"></div>\'+(hintsAllowed()?\'<div class="hintbox" id="hint\'+i+\'" hidden></div>\':\'\')+\'<div class="exbox" id="ex\'+i+\'" hidden></div><div class="sol" id="sol\'+i+\'"><b>\'+L9("Worked solution:","Solution détaillée :")+\'</b> \'+stepHTML(q.solution)+\'</div>\'', count=1)  # renderOnline button row and hint box
rep('  for(var j=0;j<current.length;j++)$("sol"+j).classList.add("show");\n  maybeSummary();',
    '  for(var j=0;j<current.length;j++)$("sol"+j).classList.add("show");\n  revealExamples();\n  maybeSummary();', count=1)  # gradeAll reveals deferred examples
rep('var hb=$("hint"+i);if(hb&&o.hintStage){hb.dataset.stage=String(o.hintStage);if(o.hintShown){hb.innerHTML=o.hintHtml;hb.hidden=false;}}\n    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");\n    if(o.exOpen&&o.exq){var xb=$("ex"+i);var exq=advQDes(o.exq);if(xb&&exq){xb.dataset.exn=String(o.exn||0);renderExample(i,exq);setExLabel(i,true);}}',
    'var hb=$("hint"+i);if(hb&&o.hintStage&&hintsAllowed()){hb.dataset.stage=String(o.hintStage);if(o.hintShown){hb.innerHTML=o.hintHtml;hb.hidden=false;}}\n    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");\n    if(o.exOpen&&o.exq&&!exSuppressed()){var xb=$("ex"+i);var exq=advQDes(o.exq);if(xb&&exq){xb.dataset.exn=String(o.exn||0);renderExample(i,exq);setExLabel(i,true);}}', count=1)  # advRestoreOnlineState suppression guards
rep('if(endGraded){for(var j=0;j<current.length;j++){var s2=$("sol"+j);if(s2){s2.classList.add("show");setSolLabel(j,true);}}var gb=$("gradeBtn");if(gb){gb.disabled=true;gb.textContent=L9("Answers checked","Réponses vérifiées");}}',
    'if(endGraded){for(var j=0;j<current.length;j++){var s2=$("sol"+j);if(s2){s2.classList.add("show");setSolLabel(j,true);}}var gb=$("gradeBtn");if(gb){gb.disabled=true;gb.textContent=L9("Answers checked","Réponses vérifiées");}revealExamples();}', count=1)  # advRestoreOnlineState graded reveal
rep('if(T.endGraded){endGraded=true;for(var j=0;j<current.length;j++){var s2=$("sol"+j);if(s2)s2.classList.add("show");}var gb=$("gradeBtn");if(gb){gb.disabled=true;gb.textContent=L9("Answers checked","Réponses vérifiées");}}',
    'if(T.endGraded){endGraded=true;for(var j=0;j<current.length;j++){var s2=$("sol"+j);if(s2)s2.classList.add("show");}var gb=$("gradeBtn");if(gb){gb.disabled=true;gb.textContent=L9("Answers checked","Réponses vérifiées");}revealExamples();}', count=1)  # tRestoreOnline graded reveal
rep('  var parts=[(window.__COURSE?window.__COURSE.id:""),view,sessionSeed||""];',
    '  var parts=[(window.__COURSE?window.__COURSE.id:""),view,sessionSeed||"",(NO_HINT?"nh":"")+(NO_EX?"nx":"")];', count=1)  # resumeSig suppression component
rep('results:setResults,checkMode:checkMode,endGraded:!!endGraded}}));',
    'results:setResults,checkMode:checkMode,endGraded:!!endGraded,nohint:NO_HINT?1:0,noex:NO_EX?1:0}}));', count=1)  # resume save body suppression fields
rep('  if(b.checkMode)checkMode=b.checkMode;\n  endGraded=!!b.endGraded;',
    '  if(b.checkMode)checkMode=b.checkMode;\n  endGraded=!!b.endGraded;\n  if(b.nohint)NO_HINT=true;if(b.noex)NO_EX=true;', count=1)  # resumeApplyOnline suppression restore
rep('  if(p.get("shuf")==="1")SHUFFLE_OPTS=true;\n  return touched;',
    '  if(p.get("shuf")==="1")SHUFFLE_OPTS=true;\n  if(p.get("nohint")==="1")NO_HINT=true;\n  if(p.get("noex")==="1")NO_EX=true;\n  return touched;', count=1)  # applyURL flag parsing

# ---------- Retry package: all-Level-3 retry fill, retry checking
# mode, fallback hint wording (Nov 15, 2026) ----------
# Three changes from Jason's rulings of November 15, 2026, built
# into the shipped shell and back-ported here in the same pass.
# Part A: in drawSet's group-keyed retry draw, the one Level 3
# cap relaxes after the round-robin to the extent of a shortfall
# when a missed group is all Level 3 (Unit 5's data-claims is the
# only such group today), so that group repeats as fresh
# instances to fill the retry; the cap otherwise binds, and
# ordinary checks are untouched. Part B: a retry launched from a
# check-at-the-end set runs check-as-you-go by default
# (RETRY_AS_EACH, stashed by retryMissed and consumed by
# startOnline where checkMode is assigned), with a one-line note
# in the summary; the teacher's Retry checking choice beside the
# other student link choices persists as retryPref and mints
# rkeep=1 for student links only, read by applyURL into
# RETRY_KEEP; the teacher's own retries never switch. Part C: the
# generic fallback hint, which points at the worked example,
# uses a variant wording that does not when worked examples are
# suppressed (exSuppressed()).
rep('         canonical question). A group whose entries are all\n         Level 3 takes its turn through a single Level 3 question\n         for the whole set, the check\'s filler discipline; if the\n         missed groups are all Level 3, the set is that one\n         question and thin reports the shortfall. thin otherwise\n         reports only a genuine duplicate, as the check reports\n         it. */',
    '         canonical question). A group whose entries are all\n         Level 3 takes its turn through a single Level 3 question\n         for the whole set, the check\'s filler discipline. If the\n         set is still short after the round-robin, the cap then\n         relaxes for those all-Level-3 groups alone (Jason\'s\n         ruling, Nov 15, 2026): they deal further fresh instances,\n         round-robin among themselves, until the set reaches its\n         size or their variants run out, so a missed data-claims\n         group fills its retry instead of dealing a single\n         question. The relaxation reaches only as far as the\n         shortfall: when the other missed groups fill the set,\n         the cap binds as before, and ordinary checks keep the\n         cap exactly. thin otherwise reports only a genuine\n         duplicate, as the check reports it. */', count=1)  # retry draw comment: the fill rule
rep('        var dealR=function(g,allowL3){\n          var cands=byGroupR[g].filter(function(e){return allowL3?(e.level>=3&&l3R<1):e.level<3;});',
    '        var dealR=function(g,allowL3,fillL3){\n          var cands=byGroupR[g].filter(function(e){return allowL3?(e.level>=3&&(fillL3||l3R<1)):e.level<3;});', count=1)  # dealR fill pass ignores the cap
rep('        var progressR=true;\n        while(itemsR.length<n&&progressR){\n          progressR=false;\n          for(var gi=0;gi<gOrder.length&&itemsR.length<n;gi++){\n            if(dealR(gOrder[gi],false)||dealR(gOrder[gi],true))progressR=true;\n          }\n        }\n        if(orderMode==="unit")itemsR.sort(function(a,b){return a._entry.unit-b._entry.unit;});',
    '        var progressR=true;\n        while(itemsR.length<n&&progressR){\n          progressR=false;\n          for(var gi=0;gi<gOrder.length&&itemsR.length<n;gi++){\n            if(dealR(gOrder[gi],false)||dealR(gOrder[gi],true))progressR=true;\n          }\n        }\n        if(itemsR.length<n){\n          var l3OnlyR=gOrder.filter(function(g){return byGroupR[g].every(function(e){return e.level>=3;});});\n          var progressF=true;\n          while(itemsR.length<n&&progressF&&l3OnlyR.length){\n            progressF=false;\n            for(var fi=0;fi<l3OnlyR.length&&itemsR.length<n;fi++){\n              if(dealR(l3OnlyR[fi],true,true))progressF=true;\n            }\n          }\n        }\n        if(orderMode==="unit")itemsR.sort(function(a,b){return a._entry.unit-b._entry.unit;});', count=1)  # retry fill round-robin over all-Level-3 groups
rep('var NO_HINT=false,NO_EX=false;\nfunction hintsAllowed()',
    'var NO_HINT=false,NO_EX=false;\n/* Retry checking mode (Nov 15, 2026): a retry launched from a\n   check-at-the-end set runs check-as-you-go by default, so a\n   student corrects each mistake as it comes up instead of\n   rehearsing it to the end of another set (Jason\'s ruling, on\n   the feedback-timing evidence: Shute 2008 and the error\n   correction literature). RETRY_KEEP is set by applyURL from\n   rkeep=1, which a student link carries only when the teacher\'s\n   Retry checking choice (beside the other student link choices)\n   is set to Keep the first set\'s mode; teacher links never carry\n   it, and the teacher\'s own retries never switch. RETRY_AS_EACH\n   is the one-draw stash retryMissed sets and startOnline\n   consumes where it assigns checkMode, in the PKRETRY_GROUPS\n   manner. The switched retry\'s mode rides the resume save body\n   like any set\'s, so a resumed retry keeps checking as-you-go. */\nvar RETRY_KEEP=false,RETRY_AS_EACH=false;\nfunction retryWillSwitch(){return !TEACHER&&checkMode==="end"&&!RETRY_KEEP;}\nfunction retryModeNoteHtml(){\n  if(!retryWillSwitch())return "";\n  return "<p>"+L9("This practice set checks each question as you go, so you can correct mistakes as they come up.","Cette série de pratique vérifie chaque question au fur et à mesure, afin que tu puisses corriger tes erreurs dès qu\'elles se présentent.")+"</p>";\n}\nfunction hintsAllowed()', count=1)  # RETRY_KEEP/RETRY_AS_EACH and the switch helpers
rep('    if(anyMissedG){\n      h+=\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';\n    }else{',
    '    if(anyMissedG){\n      h+=retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';\n    }else{', count=1)  # check summary: switch note before the retry button
rep('}).join("")+\'</ul><p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';',
    '}).join("")+\'</ul>\'+retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';', count=1)  # ordinary summary: switch note before the retry button
rep('    if(!gMissed.length)return;\n    PKRETRY_GROUPS=gMissed;\n    $("countIn").value=8;',
    '    if(!gMissed.length)return;\n    PKRETRY_GROUPS=gMissed;\n    if(retryWillSwitch())RETRY_AS_EACH=true;\n    $("countIn").value=8;', count=1)  # retryMissed check path stashes the switch
rep('  if(!missed.length)return;\n  state.inds=missed;\n  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));',
    '  if(!missed.length)return;\n  state.inds=missed;\n  if(retryWillSwitch())RETRY_AS_EACH=true;\n  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));', count=1)  # retryMissed ordinary path stashes the switch
rep('  current=res.items;checkedCount=0;correctCount=0;checkMode=(s.chk==="end")?"end":"each";endGraded=false;setResults={};',
    '  current=res.items;checkedCount=0;correctCount=0;checkMode=(s.chk==="end")?"end":"each";if(RETRY_AS_EACH){checkMode="each";RETRY_AS_EACH=false;}endGraded=false;setResults={};', count=1)  # startOnline consumes the switch stash
rep('function tHintPref(){try{return localStorage.getItem("hintPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tExPref(){try{return localStorage.getItem("exPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tScafSelHtml(){\n  var hp=tHintPref(),ep=tExPref();',
    'function tHintPref(){try{return localStorage.getItem("hintPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tExPref(){try{return localStorage.getItem("exPref")==="off"?"off":"on";}catch(e){return "on";}}\nfunction tRetryPref(){try{return localStorage.getItem("retryPref")==="keep"?"keep":"switch";}catch(e){return "switch";}}\nfunction tScafSelHtml(){\n  var hp=tHintPref(),ep=tExPref(),rp=tRetryPref();', count=1)  # tRetryPref and the third choice's state
rep('    +\' <label class="hint">\'+L9("Worked examples in student links:","Exemples travaillés dans les liens des élèves :")+\' <select id="tExSel"><option value="on"\'+(ep==="on"?" selected":"")+\'>\'+L9("On","Activés")+\'</option><option value="off"\'+(ep==="off"?" selected":"")+\'>\'+L9("Off","Désactivés")+\'</option></select></label>\';\n}',
    '    +\' <label class="hint">\'+L9("Worked examples in student links:","Exemples travaillés dans les liens des élèves :")+\' <select id="tExSel"><option value="on"\'+(ep==="on"?" selected":"")+\'>\'+L9("On","Activés")+\'</option><option value="off"\'+(ep==="off"?" selected":"")+\'>\'+L9("Off","Désactivés")+\'</option></select></label>\'\n    +\' <label class="hint">\'+L9("Retry checking in student links:","Correction des reprises dans les liens des élèves :")+\' <select id="tRetrySel"><option value="switch"\'+(rp==="switch"?" selected":"")+\'>\'+L9("Switch to as-you-go","Passer à la correction au fur et à mesure")+\'</option><option value="keep"\'+(rp==="keep"?" selected":"")+\'>\'+L9("Keep the first set\'s mode","Garder le mode de la première série")+\'</option></select></label>\';\n}', count=1)  # tScafSelHtml: the Retry checking choice
rep('  p.delete("nohint");p.delete("noex");',
    '  p.delete("nohint");p.delete("noex");p.delete("rkeep");', count=1)  # tShareURL clears a stale rkeep
rep('  var exSel=$("tExSel");\n  if(exSel){try{localStorage.setItem("exPref",exSel.value);}catch(e){}\n    if(!teacher&&exSel.value==="off")p.set("noex","1");}',
    '  var exSel=$("tExSel");\n  if(exSel){try{localStorage.setItem("exPref",exSel.value);}catch(e){}\n    if(!teacher&&exSel.value==="off")p.set("noex","1");}\n  var retrySel=$("tRetrySel");\n  if(retrySel){try{localStorage.setItem("retryPref",retrySel.value);}catch(e){}\n    if(!teacher&&retrySel.value==="keep")p.set("rkeep","1");}', count=1)  # tShareURL mints rkeep for student links
rep('  if(p.get("nohint")==="1")NO_HINT=true;\n  if(p.get("noex")==="1")NO_EX=true;\n  return touched;',
    '  if(p.get("nohint")==="1")NO_HINT=true;\n  if(p.get("noex")==="1")NO_EX=true;\n  if(p.get("rkeep")==="1")RETRY_KEEP=true;\n  return touched;', count=1)  # applyURL reads rkeep
rep('  var first=h1?stepHTML(h1):L9("Look at the worked example for this kind of question, then try the same first move here.","Regarde l\'exemple travaillé pour ce type de question, puis essaie le même premier pas ici.");',
    '  var first=h1?stepHTML(h1):(exSuppressed()?L9("Work out the first step this kind of question calls for, and try just that step here.","Trouve le premier pas que ce type de question demande, et essaie seulement ce pas ici."):L9("Look at the worked example for this kind of question, then try the same first move here.","Regarde l\'exemple travaillé pour ce type de question, puis essaie le même premier pas ici."));', count=1)  # fallback hint wording follows example suppression

# ---------- Help tracking and teacher dark panels (Nov 15, 2026) ----------
# Two changes from Jason's rulings of November 15, 2026, built
# into the shipped shell and back-ported here in the same pass.
# Part 1, help tracking: opening a hint so it displays, opening
# the worked example, or opening the worked solution before a
# question's first recorded result marks the question as helped
# (helpUsed, set by noteHelp from the three toggles; the prose
# guard keeps the designed prose reveal, which opens the
# solution directly rather than through the toggle, from ever
# counting). A helped question answered correctly keeps its
# score, but its indicators join the practice list and the
# retryMissed draw on ordinary sets, and its skill group counts
# as needing more practice on a prerequisite check, with a plain
# sentence in the summary (helpNoteHtml) whenever helped-but-
# correct questions exist. The flags ride the resume save body,
# the teacher set capture, and the teacher set sync, the way the
# prose self-rating does, and reset wherever setResults resets.
# Part 2, teacher dark panels: .tctl, .tbar and .tpanel carried
# a hard-coded near-white background with no dark override, so
# their headings and hint text rendered near-white on near-white
# in dark mode; they now take var(--card) in the dark block, the
# bank picker's .tqprompt .opts and .tlist .tid take the muted
# dark ink the picker sample already used, and the teacher
# note's Turn off advanced tools link takes the dark link colour
# the All courses link already used. Light mode is untouched.
rep('  html[data-a11y-theme="dark"] .tpick .tsamp{color:#b9c6cc;}',
    '  html[data-a11y-theme="dark"] .tpick .tsamp{color:#b9c6cc;}\n  html[data-a11y-theme="dark"] .tctl,html[data-a11y-theme="dark"] .tbar,html[data-a11y-theme="dark"] .tpanel{background:var(--card);}\n  html[data-a11y-theme="dark"] .tqprompt .opts{color:#b9c6cc;}\n  html[data-a11y-theme="dark"] .tlist .tid{color:#b9c6cc;}\n  html[data-a11y-theme="dark"] #teacherNote a{color:#5eead4;}', count=1)  # dark overrides for the teacher panels, picker text and note link
rep('var setResults={};\n/* Reference panels come from the active course configuration (the',
    'var setResults={};\n/* Help tracking (Nov 15, 2026, Jason\'s ruling): opening a hint so\n   it displays, opening the worked example, or opening the worked\n   solution BEFORE a question\'s first recorded result marks the\n   question as helped. A helped question still scores when it is\n   answered correctly, but it counts as needing practice in the\n   set summary and in the Practice what I missed draw. The flags\n   ride the resume save, the teacher set capture and the teacher\n   set sync, the way the prose self-rating does. The designed\n   prose reveal opens the solution directly rather than through\n   the toggle, so it never lands here, and the prose guard below\n   covers any other route to the solution toggle. */\nvar helpUsed={};\nfunction noteHelp(i,kind){\n  var fb=$("fb"+i);if(!fb||fb.dataset.done)return;\n  if(kind==="sol"&&isProseText(current[i]))return;\n  if(!helpUsed[i])helpUsed[i]={};\n  helpUsed[i][kind]=1;\n  if(!TEACHER)countEvent("help_open",[analyticsCourse(),kind==="ex"?"example":(kind==="sol"?"solution":"hint")]);\n}\n/* Reference panels come from the active course configuration (the', count=1)  # helpUsed and noteHelp
rep('box.dataset.stage="1";}',
    'box.dataset.stage="1";noteHelp(i,"hint");}', count=1)  # showHint stage 1 records help
rep('box.dataset.stage="2";}',
    'box.dataset.stage="2";noteHelp(i,"hint");}', count=1)  # showHint stage 2 records help
rep('function toggleSolution(i){var sol=$("sol"+i);if(!sol)return;var open=sol.classList.toggle("show");setSolLabel(i,open);if(open)closeScaffolding(i);}',
    'function toggleSolution(i){var sol=$("sol"+i);if(!sol)return;var open=sol.classList.toggle("show");setSolLabel(i,open);if(open){closeScaffolding(i);noteHelp(i,"sol");}}', count=1)  # solution toggle records help
rep('  if(box._exq){box.hidden=false;setExLabel(i,true);return;}',
    '  if(box._exq){box.hidden=false;setExLabel(i,true);noteHelp(i,"ex");return;}', count=1)  # example reshow records help
rep('  var exq=dealExample(i,0,null);\n  if(!exq)return;\n  renderExample(i,exq);setExLabel(i,true);',
    '  var exq=dealExample(i,0,null);\n  if(!exq)return;\n  renderExample(i,exq);setExLabel(i,true);noteHelp(i,"ex");', count=1)  # example first show records help
rep('  if(Object.keys(setResults).length<current.length)return;\n  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok)setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});',
    '  if(Object.keys(setResults).length<current.length)return;\n  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok)setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});\n  /* Help tracking (Nov 15, 2026): a question answered correctly\n     after using help keeps its score, but its indicators join the\n     practice list below, and on a prerequisite check its skill\n     group counts as needing more practice. */\n  var helpedInds=[],anyHelped=false;\n  Object.keys(helpUsed).forEach(function(k){if(setResults[k]&&setResults[k].ok){anyHelped=true;setResults[k].inds.forEach(function(c){if(helpedInds.indexOf(c)<0&&missed.indexOf(c)<0)helpedInds.push(c);});}});\n  var practiceInds=missed.concat(helpedInds);', count=1)  # summary: helped indicators join the practice list
rep('       does: a group is missed when any of its questions carries\n       a recorded not-correct result (a prose self-rating of part\n       or missed included). The retry button below keys on these\n       groups. */',
    '       does: a group is missed when any of its questions carries\n       a recorded not-correct result (a prose self-rating of part\n       or missed included). A group is also marked when any of\n       its questions was answered correctly only after using help\n       (help tracking, Nov 15, 2026). The retry button below keys\n       on these groups. */', count=1)  # check summary comment: helped groups
rep('      if(!gStat[g]){gStat[g]={missed:false};gList.push(g);}\n      if(setResults[i]&&!setResults[i].ok)gStat[g].missed=true;\n    });\n    var anyMissedG=gList.some(function(g){return gStat[g].missed;});',
    '      if(!gStat[g]){gStat[g]={missed:false,helped:false};gList.push(g);}\n      if(setResults[i]&&!setResults[i].ok)gStat[g].missed=true;\n      else if(setResults[i]&&helpUsed[i])gStat[g].helped=true;\n    });\n    var anyMissedG=gList.some(function(g){return gStat[g].missed||gStat[g].helped;});\n    var anyHelpedG=gList.some(function(g){return gStat[g].helped;});', count=1)  # check summary: group help state
rep('(gStat[g].missed?L9("needs more practice","à pratiquer davantage"):L9("solid","solide"))',
    '(gStat[g].missed||gStat[g].helped?L9("needs more practice","à pratiquer davantage"):L9("solid","solide"))', count=1)  # check summary: helped group reads as needing practice
rep('    if(anyMissedG){\n      h+=retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';',
    '    if(anyMissedG){\n      h+=(anyHelpedG?helpNoteHtml():"")+retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';', count=1)  # check summary: help sentence before the retry button
rep('  }else if(missed.length){\n    h+="<p><b>"+L9("Indicators to practise more:","Notions à pratiquer davantage :")+"</b></p><ul>"+missed.map(function(c){return "<li>"+c+L9(": "," : ")+(INDICATORS[c]||"")+"</li>";}).join("")+\'</ul>\'+retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';',
    '  }else if(practiceInds.length){\n    h+="<p><b>"+L9("Indicators to practise more:","Notions à pratiquer davantage :")+"</b></p><ul>"+practiceInds.map(function(c){return "<li>"+c+L9(": "," : ")+(INDICATORS[c]||"")+"</li>";}).join("")+\'</ul>\'+(anyHelped?helpNoteHtml():"")+retryModeNoteHtml()+\'<p><button type="button" id="retryMissedBtn">\'+L9("Practice what I missed","Pratiquer ce que j\'ai manqué")+\'</button></p>\';', count=1)  # ordinary summary: practice list covers helped indicators, with the help sentence
rep('function retryModeNoteHtml(){',
    'function helpNoteHtml(){\n  return \'<p class="thinNote">\'+L9("Some questions were answered correctly after using help (a hint, a worked example or the worked solution). They are worth another round, so they are in this practice list too.","Certaines questions ont été réussies après avoir utilisé de l’aide (un indice, un exemple travaillé ou la solution détaillée). Elles méritent un autre tour, alors elles sont aussi dans cette liste de pratique.")+"</p>";\n}\nfunction retryModeNoteHtml(){', count=1)  # the summary help sentence
rep('      if(setResults[i]&&!setResults[i].ok&&!gSeen[g]){gSeen[g]=1;gMissed.push(g);}',
    '      if(setResults[i]&&(!setResults[i].ok||helpUsed[i])&&!gSeen[g]){gSeen[g]=1;gMissed.push(g);}', count=1)  # check retry draws helped groups
rep('  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok)setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});\n  if(!missed.length)return;',
    '  var missed=[];\n  Object.keys(setResults).forEach(function(k){if(!setResults[k].ok||helpUsed[k])setResults[k].inds.forEach(function(c){if(missed.indexOf(c)<0)missed.push(c);});});\n  if(!missed.length)return;', count=1)  # ordinary retry draws helped indicators
rep('      P.checked=checkedCount;P.correct=correctCount;P.results=setResults;',
    '      P.checked=checkedCount;P.correct=correctCount;P.results=setResults;P.help=helpUsed;', count=1)  # teacher set capture carries the flags
rep('    checkedCount=P.checked||0;correctCount=P.correct||0;setResults=P.results||{};',
    '    checkedCount=P.checked||0;correctCount=P.correct||0;setResults=P.results||{};helpUsed=P.help||{};', count=1)  # teacher set restore reads the flags
rep('results:setResults,checkMode:checkMode,endGraded:!!endGraded,nohint:NO_HINT?1:0,noex:NO_EX?1:0',
    'results:setResults,help:helpUsed,checkMode:checkMode,endGraded:!!endGraded,nohint:NO_HINT?1:0,noex:NO_EX?1:0', count=1)  # resume save body carries the flags
rep('  checkedCount=b.checked||0;correctCount=b.correct||0;setResults=b.results||{};',
    '  checkedCount=b.checked||0;correctCount=b.correct||0;setResults=b.results||{};helpUsed=b.help||{};', count=1)  # resume apply reads the flags
rep('endGraded=false;setResults={};sessionSeed="";',
    'endGraded=false;setResults={};helpUsed={};sessionSeed="";', count=1)  # teacher set rebuild resets the flags
rep('    var o={done:false,ok:false,given:null,fb:"",sol:false,exOpen:false,exq:null,exn:0,selfRate:"",srShown:false};',
    '    var o={done:false,ok:false,help:null,given:null,fb:"",sol:false,exOpen:false,exq:null,exn:0,selfRate:"",srShown:false};', count=1)  # teacher sync state gains the help slot
rep('    o.ok=!!(setResults[i]&&setResults[i].ok);',
    '    o.ok=!!(setResults[i]&&setResults[i].ok);\n    o.help=helpUsed[i]||null;', count=1)  # teacher sync copies the flag per question
rep('  checkedCount=0;correctCount=0;setResults={};',
    '  checkedCount=0;correctCount=0;setResults={};helpUsed={};', count=1)  # teacher restore resets, then rebuilds, the flags
rep('    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");\n    if(o.exOpen&&o.exq){var exb=$("ex"+i);if(exb){exb.dataset.exn=String(o.exn);renderExample(i,o.exq);setExLabel(i,true);}}',
    '    if(o.help)helpUsed[i]=o.help;\n    if(o.selfRate||o.srShown)applyRateVisual(i,o.selfRate||"");\n    if(o.exOpen&&o.exq){var exb=$("ex"+i);if(exb){exb.dataset.exn=String(o.exn);renderExample(i,o.exq);setExLabel(i,true);}}', count=1)  # teacher restore puts the flag back on the question's new index
rep('endGraded=false;setResults={};\n  lastSettings=s;onlineThin=res.thin;T=null;',
    'endGraded=false;setResults={};helpUsed={};ANALYTICS_FINISHED=false;\n  lastSettings=s;onlineThin=res.thin;T=null;', count=1)  # startOnline resets the flags with the results


# ---------- What's new link and anonymous usage counting (Nov 15, 2026, v1.1.0) ----------
# The picker gains a What's new link to the Releases page and a plain
# disclosure line; the shell gains the countEvent helper and its
# twelve hooks (analytics spec, same date). Late reps: each old text
# is the shipped shell text this pass found, each new text adds the
# hook beside the behaviour it counts, nothing else moves.
rep('detailsEntry:"entry.1416174508"};',
    'detailsEntry:"entry.1416174508"};\n/* Anonymous usage counting (Nov 15, 2026, Jason\'s analytics spec):\n   aggregate counts only, through GoatCounter (site code cdli).\n   countEvent(name, dims) builds a path from the event name and the\n   dimension values the caller passes; every value comes from a\n   closed internal vocabulary (the registry course id, a unit scope,\n   the view, a feature kind), and nothing else is ever sent: no page\n   URL (seeded set links live in it), no referrer, no seed, no\n   answer, no score, no identifier of any kind. The send is\n   fire-and-forget inside a guard: a blocked, failed or slow\n   endpoint changes nothing in the app, and an empty endpoint\n   disables counting entirely. */\nvar ANALYTICS_ENDPOINT="https://cdli.goatcounter.com/count";\nfunction analyticsCourse(){try{var id=new URLSearchParams(location.search).get("course");return (id&&window.COURSES&&window.COURSES[id])?id:null;}catch(e){return null;}}\nfunction analyticsSend(path,isEvent){\n  try{\n    if(!ANALYTICS_ENDPOINT)return;\n    var url=ANALYTICS_ENDPOINT+"?p="+encodeURIComponent(path)+(isEvent?"&e=1":"");\n    if(navigator.sendBeacon&&navigator.sendBeacon(url))return;\n    var img=new Image();img.src=url;\n  }catch(e){}\n}\nfunction countEvent(name,dims){\n  var parts=(dims||[]).filter(function(d){return d!==null&&d!==undefined&&d!=="";});\n  analyticsSend("/event/"+name+(parts.length?"/"+parts.join("/"):""),true);\n}\nfunction countPageview(){analyticsSend("/",false);}\nfunction examPresetName(units){\n  try{\n    var key=units.slice().sort(function(a,b){return a-b;}).join(),C=window.__COURSE;\n    if(C&&C.presets){\n      if(C.presets.mid&&C.presets.mid.units.slice().sort(function(a,b){return a-b;}).join()===key)return "mid";\n      if(C.presets.final&&C.presets.final.units.slice().sort(function(a,b){return a-b;}).join()===key)return "final";\n    }\n  }catch(e){}\n  return "custom";\n}\nvar ANALYTICS_RETRY_KIND=null,ANALYTICS_FINISHED=false,ANALYTICS_TEACHER_SENT=false,ANALYTICS_OPEN_SENT=false;', count=1)  # analytics block
rep('  if(Object.keys(setResults).length<current.length)return;\n  var missed=[];',
    '  if(Object.keys(setResults).length<current.length)return;\n  if(!ANALYTICS_FINISHED){ANALYTICS_FINISHED=true;countEvent("practice_finish",[analyticsCourse(),TEACHER?"teacher":"student"]);}\n  var missed=[];', count=1)  # practice_finish hook
rep('  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));\n  _suppressSeedOnce=true;\n  renderIndicators();updatePoolInfo();startOnline();',
    '  $("countIn").value=Math.min(15,Math.max(5,missed.length*2));\n  _suppressSeedOnce=true;\n  ANALYTICS_RETRY_KIND="ordinary";\n  renderIndicators();updatePoolInfo();startOnline();', count=1)  # retryMissed ordinary kind
rep('  if(!TEACHER&&SHUFFLE_OPTS)current=current.map(shufQ);\n  renderOnline(true);\n}',
    '  if(!TEACHER&&SHUFFLE_OPTS)current=current.map(shufQ);\n  if(current.length){\n    var _ac=analyticsCourse();\n    if(ANALYTICS_RETRY_KIND){countEvent("retry_start",[_ac,ANALYTICS_RETRY_KIND]);}\n    else if(s.pkOnly){countEvent("pkcheck_start",s.units.length===1?[_ac,"u"+s.units[0]]:[_ac]);}\n    else{countEvent("practice_start",[_ac,s.units.length===1?("u"+s.units[0]):"all",TEACHER?"teacher":"student"]);}\n  }\n  ANALYTICS_RETRY_KIND=null;\n  renderOnline(true);\n}', count=1)  # startOnline firing
rep('function tCopyLink(teacher,statusEl){\n  var url=tShareURL(teacher);\n  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url);}',
    'function tCopyLink(teacher,statusEl){\n  var url=tShareURL(teacher);\n  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url);}\n  if(!teacher)countEvent("student_link_copy",[analyticsCourse(),"s"+(tShufPref()==="shuf"?"1":"0")+"-h"+(tHintPref()==="off"?"1":"0")+"-e"+(tExPref()==="off"?"1":"0")+"-k"+(tRetryPref()==="keep"?"1":"0")]);', count=1)  # student_link_copy hook
rep('  sheetState={items:res.items,s:s,thin:res.thin};',
    '  sheetState={items:res.items,s:s,thin:res.thin};\n  countEvent("sheet_generate",[analyticsCourse(),"practice"]);if(s.wantKey)countEvent("sheet_generate",[analyticsCourse(),"key"]);', count=1)  # sheet_generate hook
rep('  var ex=withSeed(_sd,function(){return composeExam(s.units,s.inds,pkOn);});\n  if(!ex||(!ex.srItems.length&&!ex.crItems.length)){$("session").innerHTML=\'<div class="card"><p>\'+(s.units.length?L9("No questions match that selection yet.","Aucune question ne correspond encore à cette sélection."):L9("Choose at least one unit above, or use the Mid-course review or Final review button, then start again.","Choisis au moins une unité ci-dessus, ou utilise le bouton Révision de mi-parcours ou Révision finale, puis recommence."))+\'</p></div>\';return;}\n  var single=s.units.length===1;',
    '  var ex=withSeed(_sd,function(){return composeExam(s.units,s.inds,pkOn);});\n  if(!ex||(!ex.srItems.length&&!ex.crItems.length)){$("session").innerHTML=\'<div class="card"><p>\'+(s.units.length?L9("No questions match that selection yet.","Aucune question ne correspond encore à cette sélection."):L9("Choose at least one unit above, or use the Mid-course review or Final review button, then start again.","Choisis au moins une unité ci-dessus, ou utilise le bouton Révision de mi-parcours ou Révision finale, puis recommence."))+\'</p></div>\';return;}\n  countEvent("exam_compose",[analyticsCourse(),examPresetName(s.units)]);\n  countEvent("sheet_generate",[analyticsCourse(),"test"]);\n  var single=s.units.length===1;', count=1)  # exam hooks
rep('  if(p.get("teacher")==="1"){TEACHER=true;var tn=$("teacherNote");if(tn)tn.hidden=false;}',
    '  if(p.get("teacher")==="1"){TEACHER=true;var tn=$("teacherNote");if(tn)tn.hidden=false;if(!ANALYTICS_TEACHER_SENT){ANALYTICS_TEACHER_SENT=true;countEvent("teacher_open",[analyticsCourse()]);}}', count=1)  # teacher_open hook
rep('a11yInit();\nvar urlTouched=applyURL();',
    'a11yInit();\nvar urlTouched=applyURL();\nif(window.__COURSE&&!ANALYTICS_OPEN_SENT){ANALYTICS_OPEN_SENT=true;countEvent("course_open",[analyticsCourse()]);}', count=1)  # course_open hook
rep('  /* A set link was opened: the exact set it encodes is on screen. */\n}',
    '  /* A set link was opened: the exact set it encodes is on screen. */\n  var _lu=(typeof T!=="undefined"&&T&&T.scope&&T.scope.units)?T.scope.units:null;\n  countEvent("practice_start",[analyticsCourse(),(_lu&&_lu.length===1)?("u"+_lu[0]):"all",TEACHER?"teacher":"student"]);\n}', count=1)  # set link practice_start
rep('  var groups={};\n  Object.keys(window.COURSES||{}).forEach(function(id){',
    '  var pkWn=document.getElementById("pkWhatsNew");\n  if(pkWn){pkWn.textContent=L9("What\'s new","Nouveautés");pkWn.addEventListener("click",function(){countEvent("whatsnew_click",[]);});}\n  var pkPv=document.getElementById("pkPrivacy");\n  if(pkPv){pkPv.textContent=L9("Anonymous usage counts help us see which courses and features are used. No student information is collected.","Des comptes d\'utilisation anonymes nous aident à voir quels cours et quelles fonctions sont utilisés. Aucun renseignement sur les élèves n\'est recueilli.");}\n  countPageview();\n  var groups={};\n  Object.keys(window.COURSES||{}).forEach(function(id){', count=1)  # picker wiring

# ---------- em dash sweep (Jason's global rule: no em dashes anywhere) ----------
# The chassis carries six UI strings with a \u2014 escape; convert them in the
# built shell so the unified app ships clean. Label separators become colons,
# prose separators become commas.
html = html.replace("</b> \\u2014 ", "</b>: ")
html = html.replace("e.level+\" \\u2014 ", "e.level+\": ")
html = html.replace(" \\u2014 ", ", ")
if "\\u2014" in html:
    raise SystemExit("EM DASH SWEEP MISS: a \\u2014 sequence remains in the built shell")

out = ROOT / "index.html"
out.write_text(html, encoding="utf-8")
print(f"wrote {out} ({len(html)} chars) serving courses: {', '.join(sorted(COURSES))}")
