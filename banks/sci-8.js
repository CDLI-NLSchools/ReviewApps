/* Science 8 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-8/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Science 8 shared figure builders (Unit 1 first, Nov 15, 2026).
   All figures are inline SVG, generated from each item's own values
   where the family is data driven, and drawn once as constants where
   the family is an illustration (ocean basin profile, shoreline
   landforms, wave parts). No figure labels its own answer: callouts
   are letters only, and the keyed feature is always one of several
   plausible features. */

function s8Esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* W1: ocean basin profile, drawn once. The cross-section runs from a
   coastline across the continental shelf and slope to the abyssal
   plain and a mid-ocean ridge. Letter callouts: A on the shelf,
   B on the slope, C on the abyssal plain, D on the ridge. The figure
   names nothing; items ask which letter marks a named feature. */
var S8_PROFILE_SVG = "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"150\" fill=\"#eaf4fb\"/>"
  + "<path d=\"M0 150 L96 150 L210 168 L268 236 L470 244 L520 196 L556 236 L640 240 L640 300 L0 300 Z\" fill=\"#d9c9a3\" stroke=\"#8a7a52\" stroke-width=\"1.5\"/>"
  + "<path d=\"M0 118 L60 118 L96 150 L0 150 Z\" fill=\"#cfe0b8\" stroke=\"#8a7a52\" stroke-width=\"1.5\"/>"
  + "<path d=\"M0 150 L640 150\" stroke=\"#5b8db8\" stroke-width=\"2\"/>"
  + "<g stroke=\"#9db8c6\" stroke-width=\"2\" fill=\"none\"><path d=\"M330 128 q26 -8 52 0\"/><path d=\"M420 138 q26 -8 52 0\"/></g>"
  + "<g font-weight=\"bold\" font-size=\"13\">"
  + "<circle cx=\"150\" cy=\"140\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"150\" y=\"145\" text-anchor=\"middle\">A</text>"
  + "<circle cx=\"238\" cy=\"186\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"238\" y=\"191\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"380\" cy=\"222\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"380\" y=\"227\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"520\" cy=\"172\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"520\" y=\"177\" text-anchor=\"middle\">D</text>"
  + "</g></svg>";

/* W2: shoreline landform sequence, drawn once. A headland coast with
   a sea cave (A), a sea arch (B), a sea stack (C) and a low stump
   (D), the erosion sequence in one scene. The figure names nothing. */
var S8_LANDFORM_SVG = "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"190\" fill=\"#eaf4fb\"/>"
  + "<rect x=\"0\" y=\"190\" width=\"640\" height=\"110\" fill=\"#bfe0ea\"/>"
  + "<path d=\"M0 190 L120 190 L150 96 L196 96 L210 190 L300 190 L318 110 L352 110 L366 190 L430 190 L446 130 L478 130 L492 190 L548 190 L560 174 L588 174 L600 190 L640 190 L640 214 L0 214 Z\" fill=\"#b09a72\" stroke=\"#7d6a45\" stroke-width=\"1.5\"/>"
  + "<path d=\"M158 190 L158 150 Q173 132 188 150 L188 190 Z\" fill=\"#5d4c2e\"/>"
  + "<path d=\"M322 190 L322 152 Q337 138 350 152 L350 190 Z\" fill=\"#bfe0ea\" stroke=\"#7d6a45\" stroke-width=\"1.2\"/>"
  + "<g stroke=\"#ffffff\" stroke-width=\"2\" fill=\"none\" opacity=\"0.8\"><path d=\"M20 226 q30 -7 60 0\"/><path d=\"M520 232 q30 -7 60 0\"/><path d=\"M240 244 q30 -7 60 0\"/></g>"
  + "<g font-weight=\"bold\" font-size=\"13\">"
  + "<circle cx=\"173\" cy=\"112\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"173\" y=\"117\" text-anchor=\"middle\">A</text>"
  + "<circle cx=\"336\" cy=\"86\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"336\" y=\"91\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"462\" cy=\"104\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"462\" y=\"109\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"574\" cy=\"148\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"574\" y=\"153\" text-anchor=\"middle\">D</text>"
  + "</g></svg>";

/* W3: wave parts diagram, drawn once. The wave path peaks at
   x = 60, 260, 460 (crests, y about 96) and dips at x = 160, 360,
   560 (troughs, y about 164). Callouts: A above a crest, B below a
   trough, C spanning one wavelength (crest to crest), D beside the
   vertical span from crest level to trough level (wave height). */
var S8_WAVE_SVG = "<svg viewBox=\"0 0 640 240\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#eef6fb\"/>"
  + "<path d=\"M10 130 Q 60 62, 110 130 T 210 130 T 310 130 T 410 130 T 510 130 T 610 130 L610 240 L10 240 Z\" fill=\"#bfe0ea\" stroke=\"#5b8db8\" stroke-width=\"2\"/>"
  + "<line x1=\"60\" y1=\"40\" x2=\"260\" y2=\"40\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<line x1=\"60\" y1=\"33\" x2=\"60\" y2=\"47\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<line x1=\"260\" y1=\"33\" x2=\"260\" y2=\"47\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<line x1=\"492\" y1=\"96\" x2=\"492\" y2=\"164\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<line x1=\"485\" y1=\"96\" x2=\"499\" y2=\"96\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<line x1=\"485\" y1=\"164\" x2=\"499\" y2=\"164\" stroke=\"#333\" stroke-width=\"1.4\"/>"
  + "<g font-weight=\"bold\" font-size=\"13\">"
  + "<circle cx=\"60\" cy=\"70\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"60\" y=\"75\" text-anchor=\"middle\">A</text>"
  + "<circle cx=\"160\" cy=\"198\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"160\" y=\"203\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"160\" cy=\"18\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"160\" y=\"23\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"492\" cy=\"74\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"492\" y=\"79\" text-anchor=\"middle\">D</text>"
  + "</g></svg>";

/* W4: population line graph, generated from the item's own yearly
   counts. years: array of year labels; counts: matching counts;
   species: axis label text. */
function s8PopGraphSVG(years, counts, species) {
  var W = 540, H = 280, base = 232, left = 58, right = W - 25, top = 28;
  var maxV = Math.max.apply(null, counts) * 1.2;
  function X(i) { return left + i / (years.length - 1) * (right - left); }
  function Y(v) { return base - v / maxV * (base - top); }
  var pts = counts.map(function (c, i) { return X(i).toFixed(1) + "," + Y(c).toFixed(1); });
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:540px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/>";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) {
    var gv = maxV * g / 4;
    s += "<line x1=\"" + left + "\" y1=\"" + Y(gv) + "\" x2=\"" + right + "\" y2=\"" + Y(gv) + "\" stroke=\"#e3eaee\"/>";
    s += "<text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + Math.round(gv) + "</text>";
  }
  s += "<polyline fill=\"none\" stroke=\"#1a6f8f\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  counts.forEach(function (c, i) {
    s += "<circle cx=\"" + X(i) + "\" cy=\"" + Y(c) + "\" r=\"3.5\" fill=\"#1a6f8f\"/>";
    s += "<text x=\"" + X(i) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + years[i] + "</text>";
  });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">Year</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8Esc(species) + "</text>";
  s += "</svg>";
  return s;
}

/* W5: water health bar display, generated from the item's own sample
   values. samples: [{name, value}] for one measure; unit: axis unit;
   healthy: the guide's healthy-range note drawn as a dashed line at
   the threshold value (the threshold is guide content stated in the
   item text as well; the figure shows data, not a verdict). */
function s8HealthSVG(samples, measure, unit, threshold) {
  var W = 540, H = 280, base = 232, left = 58, right = W - 25, top = 28;
  var maxV = 0; samples.forEach(function (sm) { if (sm.value > maxV) maxV = sm.value; });
  maxV = Math.max(maxV, threshold || 0) * 1.2;
  function Y(v) { return base - v / maxV * (base - top); }
  var bw = (right - left) / samples.length * 0.55, step = (right - left) / samples.length;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:540px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/>";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) {
    var gv = maxV * g / 4;
    s += "<text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + gv.toFixed(gv < 10 ? 1 : 0) + "</text>";
  }
  if (threshold) {
    s += "<line x1=\"" + left + "\" y1=\"" + Y(threshold) + "\" x2=\"" + right + "\" y2=\"" + Y(threshold) + "\" stroke=\"#b3541e\" stroke-width=\"1.6\" stroke-dasharray=\"6 4\"/>";
  }
  samples.forEach(function (sm, i) {
    var x = left + step * i + (step - bw) / 2;
    s += "<rect x=\"" + x.toFixed(1) + "\" y=\"" + Y(sm.value) + "\" width=\"" + bw.toFixed(1) + "\" height=\"" + (base - Y(sm.value)).toFixed(1) + "\" fill=\"#2e8b6e\" stroke=\"#1f6350\"/>";
    s += "<text x=\"" + (x + bw / 2).toFixed(1) + "\" y=\"" + (Y(sm.value) - 6) + "\" text-anchor=\"middle\">" + sm.value + "</text>";
    s += "<text x=\"" + (x + bw / 2).toFixed(1) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + s8Esc(sm.name) + "</text>";
  });
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8Esc(measure) + " (" + s8Esc(unit) + ")</text>";
  s += "</svg>";
  return s;
}

/* ================= Unit 2 (Fluids) figure families =================
   F1: density table panel (HTML figure), a subset of the guide's
   Table 8.1. F2: force arrow diagrams (the two arrows are sized by
   relative force; the item text names which arrow is which).
   F3: generic line graph with caller-supplied axis labels. */

/* F1: approximate densities of common substances, from the guide's
   Table 8.1. Reference data for compute-and-match items; the table
   itself answers nothing until the student calculates. */
function s8DensityTableFigure() {
  var fluids = [["Ethyl alcohol", "0.79"], ["Machine oil", "0.90"], ["Water", "1.00"], ["Seawater", "1.03"], ["Glycerol", "1.26"], ["Mercury", "13.55"]];
  var solids = [["Cork", "0.24"], ["Oak", "0.70"], ["Sugar", "1.59"], ["Salt", "2.16"], ["Aluminum", "2.70"], ["Iron", "7.87"], ["Lead", "11.34"], ["Gold", "19.32"]];
  function rows(list) {
    return list.map(function (r) { return "<tr><td style=\"padding:2px 10px\">" + r[0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + r[1] + "</td></tr>"; }).join("");
  }
  var h = "<div style=\"border:1px solid #999;border-radius:6px;padding:10px 14px;background:#fdfdf5;max-width:560px\">";
  h += "<b>Approximate densities of common substances</b>";
  h += "<table style=\"border-collapse:collapse;margin-top:6px\"><tr><th style=\"padding:2px 10px;text-align:left\">Fluid</th><th style=\"padding:2px 10px\">Density (g/mL)</th><th style=\"padding:2px 10px;text-align:left\">Solid</th><th style=\"padding:2px 10px\">Density (g/cm3)</th></tr>";
  for (var i = 0; i < fluids.length; i++) {
    h += "<tr><td style=\"padding:2px 10px\">" + fluids[i][0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + fluids[i][1] + "</td><td style=\"padding:2px 10px\">" + solids[i][0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + solids[i][1] + "</td></tr>";
  }
  h += "<tr><td style=\"padding:2px 10px\">" + "" + "</td><td></td><td style=\"padding:2px 10px\">" + solids[6][0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + solids[6][1] + "</td></tr>";
  h += "<tr><td></td><td></td><td style=\"padding:2px 10px\">" + solids[7][0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + solids[7][1] + "</td></tr>";
  h += "</table></div>";
  return h;
}

/* F2: force arrows on an object in water. kind: "sink" (down arrow
   longer), "rise" (up arrow longer), "float" (arrows equal). The
   object art differs by kind (rock, balloon, boat). The figure does
   not name the forces; the item text does. */
function s8ForceSVG(kind) {
  var W = 360, H = 250;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:360px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<rect x=\"0\" y=\"60\" width=\"" + W + "\" height=\"190\" fill=\"#dceef7\"/>";
  s += "<line x1=\"0\" y1=\"60\" x2=\"" + W + "\" y2=\"60\" stroke=\"#5b8db8\" stroke-width=\"2\"/>";
  var cx = 180, cy = 150;
  if (kind === "sink") {
    s += "<path d=\"M150 138 L206 132 L216 156 L196 172 L156 168 L144 154 Z\" fill=\"#8d877c\" stroke=\"#5d594f\"/>";
  } else if (kind === "rise") {
    s += "<ellipse cx=\"" + cx + "\" cy=\"128\" rx=\"30\" ry=\"36\" fill=\"#e8a04c\" stroke=\"#a3540d\"/>";
    s += "<path d=\"M180 164 q4 18 -2 34\" stroke=\"#a3540d\" stroke-width=\"2\" fill=\"none\"/>";
    cy = 128;
  } else {
    s += "<path d=\"M128 150 L232 150 L216 178 L144 178 Z\" fill=\"#b06f28\" stroke=\"#7d4d16\"/>";
    s += "<rect x=\"168\" y=\"128\" width=\"24\" height=\"22\" fill=\"#efe3cb\" stroke=\"#7d4d16\"/>";
    cy = 152;
  }
  var upLen = kind === "sink" ? 34 : kind === "rise" ? 74 : 54;
  var dnLen = kind === "sink" ? 74 : kind === "rise" ? 34 : 54;
  s += "<line x1=\"" + (cx - 52) + "\" y1=\"" + cy + "\" x2=\"" + (cx - 52) + "\" y2=\"" + (cy - upLen) + "\" stroke=\"#1a6f8f\" stroke-width=\"3\"/>";
  s += "<polygon points=\"" + (cx - 52) + "," + (cy - upLen - 8) + " " + (cx - 59) + "," + (cy - upLen + 3) + " " + (cx - 45) + "," + (cy - upLen + 3) + "\" fill=\"#1a6f8f\"/>";
  s += "<line x1=\"" + (cx + 52) + "\" y1=\"" + cy + "\" x2=\"" + (cx + 52) + "\" y2=\"" + (cy + dnLen) + "\" stroke=\"#b3541e\" stroke-width=\"3\"/>";
  s += "<polygon points=\"" + (cx + 52) + "," + (cy + dnLen + 8) + " " + (cx + 45) + "," + (cy + dnLen - 3) + " " + (cx + 59) + "," + (cy + dnLen - 3) + "\" fill=\"#b3541e\"/>";
  s += "</svg>";
  return s;
}

/* F3: line graph with caller-supplied data and axis labels. */
function s8LineGraphSVG(xs, ys, xLabel, yLabel) {
  var W = 540, H = 280, base = 232, left = 58, right = W - 25, top = 28;
  var maxX = Math.max.apply(null, xs), maxY = Math.max.apply(null, ys) * 1.15;
  function X(v) { return left + v / maxX * (right - left); }
  function Y(v) { return base - v / maxY * (base - top); }
  var pts = xs.map(function (x, i) { return X(x).toFixed(1) + "," + Y(ys[i]).toFixed(1); });
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:540px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/>";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) {
    var gv = maxY * g / 4;
    s += "<line x1=\"" + left + "\" y1=\"" + Y(gv) + "\" x2=\"" + right + "\" y2=\"" + Y(gv) + "\" stroke=\"#e3eaee\"/>";
    s += "<text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + Math.round(gv) + "</text>";
  }
  s += "<polyline fill=\"none\" stroke=\"#1a6f8f\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  xs.forEach(function (x, i) {
    s += "<circle cx=\"" + X(x) + "\" cy=\"" + Y(ys[i]) + "\" r=\"3.5\" fill=\"#1a6f8f\"/>";
    s += "<text x=\"" + X(x) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + x + "</text>";
  });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">" + s8Esc(xLabel) + "</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8Esc(yLabel) + "</text>";
  s += "</svg>";
  return s;
}

/* ----- bank-u1.js ----- */
// CRMARKS: s8-u1-cr-cycle-role=3
// CRMARKS: s8-u1-cr-glacier=3
// CRMARKS: s8-u1-cr-abiotic=3
// CRMARKS: s8-u1-cr-coastal-climate=3
// CRMARKS: s8-u1-cr-tides=3
// CRMARKS: s8-u1-cr-headland=3
// CRMARKS: s8-u1-cr-indirect=3
// CRMARKS: s8-u1-cr-protect=3
// CRMARKS: s8-u1-cr-tech-effects=3
// CRMARKS: s8-u1-cr-decision=4
// CRMARKS: s8-u1-cr-design-salinity=4
// CRMARKS: s8-u1-cr-results-summary=3
// CRMARKS: s8-u1-cr-pond-data=3
// CRMARKS: s8-u1-cr-population=3
// Science 8 Unit 1 bank: Water Systems on Earth's Surface
// (SC8.1.1 to SC8.3.10), built Nov 15, 2026 to the Water Systems
// authoring spec. All entries are original, mined for type from the
// harvested teacher tests, the MHR ExamView chapters 1 to 3, the
// WNLSD Unit 1 set, the core laboratories and the Undersea Adventure
// STSE, and rewritten throughout (mine-and-rewrite).
// Guide discipline: ocean and fresh water are compared qualitatively
// (salinity, density, freezing point); no entry keys a memorized
// salinity or density value. The harvested satellite item keyed to
// infrared light was not carried; research technologies are keyed by
// purpose only.
// CORE residue: SC8.3.1 entries assess procedure steps, the estuary
// extension and investigation design; they do not assess carrying
// out Core Lab 1-2B at the bench. SC8.3.2 carries one entry on safe
// practice; safe handling itself is classroom assessment. SC8.3.5
// entries assess judging and stating conclusions from described
// results, not drawing a conclusion live from bench work.
// Near-duplicate pair: SC8.3.3 entries work from displayed data
// sets; SC8.3.7 entries infer and explain the relationship behind a
// pattern. The pair is recorded, not merged.

/* ---------- SC8.1.1 The water cycle and Earth's water ---------- */

E("s8-u1-cycle-process", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { d: "the Sun heats a lake and water vapour rises from its surface", k: "Evaporation", w: ["Condensation", "Precipitation", "Run-off"] },
    { d: "water vapour high in the air cools and changes into tiny liquid droplets that form a cloud", k: "Condensation", w: ["Evaporation", "Precipitation", "Run-off"] },
    { d: "rain falls from a cloud onto a hillside", k: "Precipitation", w: ["Condensation", "Evaporation", "Run-off"] },
    { d: "rainwater flows over the land surface into a nearby stream", k: "Run-off", w: ["Condensation", "Evaporation", "Precipitation"] },
    { d: "snow piled on a mountain slowly packs down into a mass of ice", k: "Glacier formation", w: ["Condensation", "Evaporation", "Precipitation"] }
  ];
  var c = pick(cases);
  return mcq("In the water cycle, which process is described here: " + c.d + "?",
    c.k, c.w,
    "The water cycle moves water between the oceans, the land and the atmosphere. Evaporation turns liquid water into vapour, condensation turns vapour back into liquid droplets, precipitation returns water to the surface, and run-off carries surface water toward streams, lakes and the ocean. Packed snow that turns to ice builds a glacier, one of Earth's stores of fresh water.",
    {});
}, ["Name what the water is doing, then match it to the process word.", "Ask whether the water is rising as vapour, forming droplets, falling, or flowing over land."]);

E("s8-u1-distribution", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "About what share of all the water on Earth is salt water in the oceans?", k: "About 97 percent", w: ["About 1 percent", "About 50 percent", "About 75 percent"] },
    { q: "About what share of Earth's water is frozen in ice caps and glaciers?", k: "About 2 percent", w: ["About 1 percent", "About 25 percent", "About 97 percent"] },
    { q: "About what share of Earth's water is fresh water that is available in lakes, rivers and ground water?", k: "About 1 percent", w: ["About 2 percent", "About 25 percent", "About 97 percent"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Earth's water is distributed very unevenly: about 97 percent is salt water in the oceans, about 2 percent is frozen in ice caps and glaciers, and only about 1 percent is fresh water available in lakes, rivers and ground water. That small available share is why fresh water sources matter so much.",
    {});
}, ["The three shares are 97, 2 and 1 percent. Match the description to its share.", "Almost all of Earth's water is ocean water."]);

E("s8-u1-fresh-sources", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "A town draws its drinking water from wells drilled deep into the ground. Which fresh water source is the town using?", k: "Ground water", w: ["A drainage basin", "A glacier", "Run-off"] },
    { q: "A community's water supply comes from a huge slow-moving mass of ice. Which fresh water source is this?", k: "A glacier", w: ["A drainage basin", "Ground water", "Run-off"] },
    { q: "All the rain that falls on a valley eventually drains into one main river. What is the whole area of land that drains this way called?", k: "A drainage basin", w: ["A glacier", "Ground water", "An estuary"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide names three sources of fresh water: drainage basins (the land area that drains into a common river), ground water (water stored underground) and glaciers (water stored as ice). Each case here describes one of the three.",
    {});
}, ["The guide names three sources of fresh water. Decide which one the case describes.", "Wells tap ground water; ice masses are glaciers; land that drains to one river is a drainage basin."]);

E("s8-u1-ocean-vs-fresh", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return mcq("Which statement correctly compares ocean water with fresh water?",
      "Ocean water has higher salinity and higher density, and it freezes at a lower temperature than fresh water",
      ["Ocean water has higher salinity and lower density, and it freezes at a lower temperature than fresh water",
       "Ocean water has lower salinity and higher density, and it freezes at a higher temperature than fresh water",
       "Ocean water has lower salinity and lower density, and it freezes at the same temperature as fresh water"],
      "Dissolved salts make ocean water different from fresh water in three linked ways: its salinity is higher, the dissolved material makes it denser, and the salt lowers its freezing point, so ocean water must get colder than 0 degrees Celsius before it freezes. The comparisons are qualitative, as the guide directs.",
      {});
  },
  function () {
    return mcq("A hydrologist and an oceanographer are comparing notes. Which statement would both accept?",
      "Ocean water is denser than fresh water because of the salts dissolved in it",
      ["Fresh water is denser than ocean water because it is colder",
       "Ocean water and fresh water have the same density because both are mostly water",
       "Fresh water freezes at a lower temperature than ocean water"],
      "The salts dissolved in ocean water add mass without adding much volume, so ocean water is denser than fresh water. Fresh water freezes at 0 degrees Celsius; dissolved salt lowers ocean water's freezing point below that.",
      {});
  }
]), ["Think about what dissolved salt does to water: it adds dissolved material.", "Salt raises density and lowers the freezing point."]);

E("s8-u1-cycle-sequence", 1, ["SC8.1.1"], 1, "var", varset([
  function () {
    return mcq("Which list gives the water cycle processes in a correct order, starting with water leaving the ocean surface?",
      "Evaporation, condensation, precipitation, run-off",
      ["Condensation, evaporation, precipitation, run-off",
       "Evaporation, precipitation, condensation, run-off",
       "Precipitation, evaporation, run-off, condensation"],
      "The Sun's energy evaporates water from the ocean. The vapour cools and condenses into cloud droplets. Water falls as precipitation, and what lands on the ground flows as run-off back toward streams, lakes and the ocean, where the cycle continues.",
      {});
  }
]), ["Follow one parcel of water: up as vapour, into a cloud, down as rain, then flowing away.", "The Sun drives the first step."]);

E("s8-u1-cr-cycle-role", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return textq("The oceans hold about 97 percent of Earth's water, yet the water cycle keeps lakes, rivers and ground water supplied with fresh water. Explain how the water cycle does this. (3 marks)",
      ["evaporation leaves the salt behind", "condensation", "precipitation", "run-off and ground water"],
      "<b>Model answer:</b> Energy from the Sun evaporates water from the ocean surface, and the dissolved salts are left behind, so the vapour is fresh. The vapour cools and condenses into clouds, then falls as precipitation. Rain and snow that fall on land collect in lakes and rivers, soak in to become ground water, or flow back as run-off, so the cycle continually delivers fresh water to the land even though almost all of Earth's water is salty ocean water.<br><br><b>Marking points:</b> 1 mark for evaporation leaving the salts behind in the ocean. 1 mark for condensation and precipitation returning the water. 1 mark for the water collecting as surface water or ground water (or returning as run-off).",
      {});
  }
]), ["Start at the ocean surface and follow the water to a lake.", "The key step is what happens to the salt during evaporation."]);

/* ---------- SC8.1.2 Climate change and glaciers ---------- */

E("s8-u1-ice-age", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("What is an ice age?",
      "An extended period of global cooling when glaciers advance and cover large areas of land",
      ["A single very cold winter in one region",
       "A period when ocean water freezes over completely",
       "A short period when a glacier melts back a small distance"],
      "An ice age is an extended period of global cooling, lasting far beyond a single season, during which glaciers advance and spread over large areas. Periods of climate change like this have advanced and retreated glaciers many times in Earth's history.",
      {});
  }
]), ["Think about scale: an ice age is measured in thousands of years, not one winter.", "Glaciers grow and advance when the whole climate cools for a long time."]);

E("s8-u1-glacier-retreat", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Across the north, glaciers have been retreating as the climate warms. Which set of effects follows from this retreat?",
      "Sea level rises as meltwater reaches the ocean, and the supply of stored fresh water shrinks",
      ["Sea level falls as meltwater reaches the ocean, and the supply of stored fresh water grows",
       "Sea level stays the same, because glacier ice was never part of the water cycle",
       "Permafrost deepens, because retreating glaciers cool the ground beneath them"],
      "Glaciers store fresh water as ice on land. When they retreat, the meltwater runs to the ocean and sea level rises, the stored fresh water supply shrinks, and warming also thaws permafrost in northern ground. Each effect follows from water moving out of storage on land.",
      {});
  }
]), ["Glacier ice is fresh water stored on land. Follow where the meltwater goes.", "Water that leaves land storage ends up in the ocean."]);

E("s8-u1-cr-glacier", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return textq("A northern community gets much of its summer water supply from a glacier-fed river. The glacier has retreated steadily for decades. Explain two effects this retreat could have, one on the community's water supply and one on the wider environment. (3 marks)",
      ["less meltwater in summer once the glacier shrinks", "sea level rise", "permafrost thaw"],
      "<b>Model answer:</b> While a glacier is retreating, meltwater flow can be strong, but as the glacier shrinks there is less ice left to melt, so the river's summer flow falls and the community's stored fresh water supply becomes less reliable. In the wider environment, the meltwater that leaves the land reaches the ocean and contributes to rising sea level, and the same warming thaws permafrost, changing northern drainage and land. (Either environmental effect, developed, earns the mark.)<br><br><b>Marking points:</b> 1 mark for the shrinking ice store. 1 mark for the effect on the community's summer water supply. 1 mark for a wider environmental effect (sea level rise or permafrost thaw) with its cause stated.",
      {});
  }
]), ["Separate the two scales: the community's river, then the wider environment.", "A glacier is a store of fresh water. What happens as the store empties?"]);

/* ---------- SC8.1.3 Productivity and species distribution ---------- */

E("s8-u1-fresh-env", 1, ["SC8.1.3"], 1, "gen", function () {
  var cases = [
    { d: "a lowland area that stays saturated with water for much of the year, with cattails and sphagnum growing in it", k: "A wetland", w: ["An estuary", "A lake", "A river"] },
    { d: "the place where a river meets the ocean and its fresh water mixes with salt water", k: "An estuary", w: ["A lake", "A wetland", "The benthic zone"] },
    { d: "a flowing freshwater environment that carries water from higher ground toward a lake or the ocean", k: "A river or stream", w: ["An estuary", "A wetland", "The pelagic zone"] },
    { d: "a standing body of fresh water, deep enough in the middle that sunlight does not reach the bottom", k: "A lake or pond", w: ["An estuary", "A river", "A wetland"] }
  ];
  var c = pick(cases);
  return mcq("Which freshwater or coastal environment is described here: " + c.d + "?",
    c.k, c.w,
    "The guide's freshwater environments are lakes and ponds (standing water), wetlands (land saturated with water), rivers and streams (flowing water), and estuaries, where a river's fresh water mixes with ocean salt water and the water is brackish.",
    {});
}, ["Decide first whether the water is standing, flowing, saturated land, or mixing with the ocean.", "An estuary is defined by mixing: fresh water meeting salt water."]);

E("s8-u1-species-category", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("A survey of a pond records snails, frogs, bacteria and cattails. Which list correctly matches each kind of organism to its category?",
      "Snails are invertebrates, frogs are vertebrates, bacteria are microorganisms, and cattails are plants",
      ["Snails are vertebrates, frogs are invertebrates, bacteria are plants, and cattails are microorganisms",
       "Snails are microorganisms, frogs are vertebrates, bacteria are invertebrates, and cattails are plants",
       "Snails are invertebrates, frogs are microorganisms, bacteria are vertebrates, and cattails are plants"],
      "The guide sorts the species of an environment into invertebrates (animals without backbones, like snails), vertebrates (animals with backbones, like frogs), microorganisms (tiny living things like bacteria) and plants (like cattails).",
      {});
  }
]), ["Use the backbone test first: snails have none, frogs have one.", "Bacteria are microorganisms; cattails are plants."]);

E("s8-u1-zones", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("A flounder lies flat on the ocean floor and feeds there. Which zone of the marine environment is the flounder's home?",
      "The benthic zone, the ocean floor environment",
      ["The pelagic zone, the open water environment",
       "An estuary, where the river meets the ocean",
       "A wetland, where the land stays saturated"],
      "Marine environments divide into the pelagic zone, the open water, and the benthic zone, the ocean floor. A bottom-dwelling fish like a flounder lives in the benthic zone.",
      {});
  }
]), ["Pelagic means open water; benthic means the bottom.", "The flounder's home is the floor itself."]);

E("s8-u1-estuary", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("The water in an estuary is often described as brackish. What does brackish mean?",
      "It is a mixture of fresh water and salt water",
      ["It is high in pollutants",
       "It is low in living things",
       "It is very muddy and hard to see through"],
      "An estuary forms where a river enters the ocean, so its water is a mixture of the river's fresh water and the ocean's salt water. That mixture is called brackish.",
      {});
  }
]), ["An estuary is where a river meets the ocean. What happens to the water there?", "Brackish describes mixing, not pollution or muddiness."]);

E("s8-u1-productivity", 1, ["SC8.1.3"], 3, "var", varset([
  function () {
    return mcq("Two bays are surveyed. Bay A receives a steady upwelling of deep ocean water. Bay B has no upwelling and few nutrients reaching its surface water. Both bays get similar sunlight and temperatures. Which bay should support more species, and why?",
      "Bay A, because the upwelled water carries nutrients that feed plankton, which supports the rest of the food web",
      ["Bay A, because deep water is colder, and cold water always holds more species",
       "Bay B, because low nutrient levels keep algae from using up the oxygen",
       "Both bays equally, because sunlight and temperature are the only factors that matter"],
      "Productivity depends on more than light and temperature. Upwelling brings nutrient-rich deep water to the surface, the nutrients feed plankton growth, and the plankton supports the food web above it. Bay B lacks that nutrient supply, so its productivity and species distribution are limited by it.",
      {});
  }
]), ["Follow the chain: nutrients, plankton, then everything that eats plankton.", "The guide names upwelling as the marine factor that feeds productivity."]);

/* ---------- SC8.1.4 Abiotic factors ---------- */

E("s8-u1-upwelling", 1, ["SC8.1.4"], 1, "var", varset([
  function () {
    return mcq("What is upwelling?",
      "The vertical movement of colder, denser, nutrient-rich water from below up to the ocean surface",
      ["The movement of warm surface water down to the ocean floor",
       "The sideways movement of surface water pushed by the wind",
       "The rise of the ocean surface during a spring tide"],
      "Upwelling is the vertical motion that brings subsurface water, which is colder, denser and rich in nutrients, up to the surface. It is most common along the western coastlines of continents, and it feeds the productivity of those surface waters.",
      {});
  }
]), ["Upwelling moves water in one direction: up. What kind of water comes up?", "The water that rises is cold, dense and full of nutrients."]);

E("s8-u1-abiotic", 1, ["SC8.1.4"], 2, "gen", function () {
  var cases = [
    { d: "Heavy rain washes soil into a pond, and the water becomes cloudy for weeks. The water plants on the bottom begin to die off.", k: "Turbidity: suspended particles block the sunlight the plants need", w: ["Dissolved oxygen: the rain adds oxygen the plants cannot use", "Phosphates: the soil removes nutrients the plants need", "Temperature: the rain cools the water below what plants tolerate"] },
    { d: "Fertilizer run-off enters a lake, and algae grow so thick that the water turns green.", k: "Phosphates: extra nutrients feed a burst of algae growth", w: ["Acidity: the fertilizer makes the water too acidic for algae", "Pollution: the fertilizer poisons the algae's predators only", "Turbidity: the fertilizer clouds the water and shades the algae"] },
    { d: "A factory releases warm water into a river all summer, and the fish that used to live there move downstream.", k: "Temperature: warmer water holds less dissolved oxygen, so the fish leave", w: ["Acidity: warm water is always more acidic than cold water", "Phosphates: the warm water carries phosphates that repel fish", "Upwelling: the warm water sinks and pushes the fish away"] }
  ];
  var c = pick(cases);
  return mcq("Which abiotic factor best explains this change: " + c.d,
    c.k, c.w,
    "Abiotic factors act through specific mechanisms. Turbidity is suspended material that blocks light. Phosphates are nutrients, so extra phosphates feed algae growth. Temperature matters partly because warm water holds less dissolved oxygen than cold water, which is why fish leave warmed water. Matching the factor to its mechanism is the skill.",
    {});
}, ["Name the factor, then check its mechanism against what changed.", "Cloudy water points to turbidity; a nutrient burst points to phosphates; warmed water points to temperature and oxygen."]);

E("s8-u1-cr-abiotic", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("A pond that supported frogs, fish and water plants changes over one summer: run-off from a new road makes the water cloudy for weeks at a time, and fertilizer from nearby lawns washes in after every rain. Explain the effect each change would have on the pond's species, naming the abiotic factor in each case. (3 marks)",
      ["turbidity blocks sunlight so water plants die", "phosphates feed algae growth", "species that depend on the plants are affected"],
      "<b>Model answer:</b> The road run-off raises the pond's turbidity: suspended particles block sunlight, so the water plants on the bottom get less light and begin to die off, and the animals that feed on or shelter among the plants are affected with them. The fertilizer raises phosphate levels: phosphates are nutrients, so algae grow rapidly, and the algal growth further shades the plants and changes the pond's oxygen balance as it decays. Both changes shift which species the pond can support.<br><br><b>Marking points:</b> 1 mark for turbidity named and linked to blocked sunlight and plant loss. 1 mark for phosphates named and linked to increased algae growth. 1 mark for a consequence carried through to the pond's other species.",
      {});
  }
]), ["Take the two changes one at a time: cloudy water, then fertilizer.", "Each factor acts through a mechanism. Name the factor, then its mechanism, then the species effect."]);

E("s8-u1-temp-oxygen", 1, ["SC8.1.4"], 3, "var", varset([
  function () {
    return mcq("Ocean temperatures in a fishing region rise over several years. Following the chain of effects the guide describes, which sequence is correct?",
      "Warmer water holds less dissolved oxygen, so fish move to other areas, and the local fishery is affected",
      ["Warmer water holds more dissolved oxygen, so fish populations grow, and the local fishery expands",
       "Warmer water holds less dissolved oxygen, but fish stay because temperature does not affect distribution",
       "Warmer water changes the water's salinity, so fish move, and the local fishery is affected"],
      "The guide's example chain runs: ocean temperature increases, the warmer water holds less dissolved oxygen, fish move away from the region, and the local fishery is affected. Temperature acts on distribution through the oxygen the water can hold.",
      {});
  }
]), ["The chain has four links: temperature, oxygen, fish, fishery. Check each option against it.", "Warm water holds less dissolved oxygen than cold water."]);

/* ---------- SC8.1.5 Ocean basin development ---------- */

E("s8-u1-profile-figure", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the continental slope?",
      "B",
      ["A", "C", "D"],
      "In the basin profile, A sits on the continental shelf, the flat extension of the continent under shallow water. B sits where the floor drops steeply, the continental slope. C lies on the wide, flat abyssal plain, and D is the raised mid-ocean ridge.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the abyssal plain?",
      "C",
      ["A", "B", "D"],
      "The abyssal plain is the wide, flat region of deep ocean floor, marked C. A is the continental shelf, B is the steep continental slope, and D is the raised mid-ocean ridge.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the mid-ocean ridge?",
      "D",
      ["A", "B", "C"],
      "The mid-ocean ridge is the underwater mountain range where new ocean floor forms, marked D where the profile rises. A is the continental shelf, B the continental slope, and C the flat abyssal plain.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  }
]), ["Work from the shore outward: shelf, then the steep drop, then the flat deep floor, then the ridge.", "The slope is the steep part of the profile."]);

E("s8-u1-basin-process", 1, ["SC8.1.5"], 3, "gen", function () {
  var cases = [
    { d: "a long underwater mountain range where molten material rises, cools and hardens into new ocean floor", k: "Volcanic action and plate tectonics building new floor at a mid-ocean ridge", w: ["Erosion wearing down the continent's edge", "Glaciation carving a drainage channel", "Deposition of sediment on the abyssal plain"] },
    { d: "a deep valley system on land that now carries a river's water toward the ocean, cut over thousands of years by moving ice and then by flowing water", k: "Glaciation and erosion shaping a continental drainage system", w: ["Plate tectonics raising a mid-ocean ridge", "Volcanic action forming new ocean floor", "Deposition building the continental shelf"] }
  ];
  var c = pick(cases);
  return mcq("Which process or pair of processes best explains this feature: " + c.d + "?",
    c.k, c.w,
    "Ocean basins and continental drainage systems develop through volcanic action, plate tectonics, erosion and glaciation. New ocean floor is built where plates move apart and volcanic material hardens at mid-ocean ridges. On land, glaciation's role is erosion: moving ice and the water that follows carve the drainage systems that carry water to the ocean.",
    {});
}, ["Decide whether the feature is being built up (new floor) or worn and carved (drainage).", "New ocean floor means volcanic action at a ridge; carved valleys mean erosion, with glaciation as the ice-driven part."]);

E("s8-u1-glaciation-role", 1, ["SC8.1.5"], 2, "var", varset([
  function () {
    return mcq("In the development of ocean basins and continental drainage systems, what is glaciation's role?",
      "Glaciation erodes land as ice moves, shaping the drainage systems that carry water to the ocean",
      ["Glaciation builds new ocean floor where plates move apart",
       "Glaciation deposits the sediment that forms the abyssal plain",
       "Glaciation creates the volcanic action at mid-ocean ridges"],
      "The guide limits glaciation's role to erosion in drainage systems: moving ice scrapes and carves the land, shaping the valleys and basins that drain toward the ocean. New ocean floor comes from volcanic action and plate tectonics, not from ice.",
      {});
  }
]), ["The guide gives glaciation one specific job. It is a wearing-away job, not a building job.", "Ice moves and scrapes: that is erosion."]);

E("s8-u1-profile-order", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    return mcq("Starting at the shoreline and moving out into the deep ocean, which order of features is correct?",
      "Continental shelf, continental slope, abyssal plain, mid-ocean ridge",
      ["Continental slope, continental shelf, mid-ocean ridge, abyssal plain",
       "Abyssal plain, continental slope, continental shelf, mid-ocean ridge",
       "Continental shelf, abyssal plain, continental slope, mid-ocean ridge"],
      "From the shore, the continent extends under shallow water as the continental shelf. The floor then drops steeply along the continental slope to the wide, flat abyssal plain, and the mid-ocean ridge rises beyond it.",
      {});
  }
]), ["Picture the profile: gentle shelf, steep drop, flat deep floor, then the ridge rises.", "The shelf comes first because it is the continent's own edge."]);

/* ---------- SC8.1.6 Currents, winds and regional climates ---------- */

E("s8-u1-currents", 1, ["SC8.1.6"], 1, "gen", function () {
  var cases = [
    { q: "Which description fits the Labrador Current?", k: "A cold current flowing southward past Newfoundland and Labrador", w: ["A cold current flowing northward past Florida", "A warm current flowing northward past Newfoundland and Labrador", "A warm current flowing southward from the Gulf of Mexico"] },
    { q: "Which description fits the Gulf Stream?", k: "A warm current flowing northward from the Gulf of Mexico along the east coast", w: ["A cold current flowing southward from the Arctic", "A warm current flowing southward past Labrador", "A cold current flowing northward along the west coast"] },
    { q: "A ship's crew wants to know which current carries icebergs southward past Newfoundland each spring. Which current is it?", k: "The Labrador Current", w: ["The Gulf Stream", "The North Atlantic Drift only", "The thermocline"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Two currents dominate this province's ocean. The Labrador Current carries cold Arctic water southward past Labrador and Newfoundland, icebergs with it. The Gulf Stream carries warm water northward from the Gulf of Mexico along the east coast of North America.",
    {});
}, ["Cold water comes from the north: that is the Labrador Current. Warm water comes from the south: the Gulf Stream.", "Icebergs travel with the cold current."]);

E("s8-u1-fog", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Newfoundland's coasts are famous for thick fog. What produces it?",
      "Warm, moist air carried by the Gulf Stream passes over the cold water of the Labrador Current and condenses",
      ["Cold, dry air from the Labrador Current mixes with cold water offshore",
       "Warm water from the Gulf Stream evaporates directly into fog over the Grand Banks",
       "Cold air sinks over the warm Gulf Stream and forms clouds at the surface"],
      "Fog forms when warm, moist air from over the Gulf Stream moves over the much colder surface water of the Labrador Current. The air cools, its water vapour condenses into tiny droplets, and fog results. The meeting of the two currents is why this province is so foggy.",
      {});
  }
]), ["Fog is condensation at the surface. Which air mass carries the moisture, and what cools it?", "Warm moist air plus a cold surface gives fog."]);

E("s8-u1-nino-nina", 1, ["SC8.1.6"], 2, "gen", function () {
  var cases = [
    { q: "During an El Niño event, what happens to the trade winds and the surface ocean in the Pacific?", k: "The trade winds decrease and the surface ocean warms", w: ["The trade winds decrease and the surface ocean cools", "The trade winds increase and the surface ocean cools", "The trade winds increase and the surface ocean warms"] },
    { q: "During a La Niña event, what happens to the trade winds and the surface ocean in the Pacific?", k: "The trade winds increase and the surface ocean cools", w: ["The trade winds decrease and the surface ocean cools", "The trade winds decrease and the surface ocean warms", "The trade winds increase and the surface ocean warms"] },
    { q: "A report says the Pacific's trade winds have weakened and its surface waters are warmer than usual this year. Which event is being described?", k: "El Niño", w: ["La Niña", "A neap tide", "Upwelling"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide distinguishes the pair by the trade winds. In El Niño the trade winds decrease and the ocean warms. In La Niña the trade winds increase and the ocean cools. The wind change comes first in each definition.",
    {});
}, ["Anchor on the winds: weaker winds go with warming, stronger winds with cooling.", "El Niño: winds decrease, ocean warms. La Niña is the reverse."]);

E("s8-u1-heat-storage", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Coastal towns in this province usually have milder winters and cooler summers than inland towns at the same latitude. What property of the ocean causes this?",
      "Water heats up and cools down slowly, so the ocean stores heat and moderates the climate of nearby land",
      ["Ocean currents move so fast that they carry summer heat away before winter",
       "Salt water freezes at a lower temperature, which warms the air above it",
       "The ocean reflects sunlight back into the air over coastal towns"],
      "Water has a high heat capacity: it takes a long time to heat up and a long time to cool down. The ocean stores summer heat and releases it slowly through winter, and stays cool into summer, so it moderates the climate of the land beside it. Convection and thermals then move that warmed or cooled air over the coast.",
      {});
  }
]), ["The ocean is a heat store. Think about how slowly a large body of water changes temperature.", "Heat capacity: water resists temperature change, and the coast shares that steadiness."]);

E("s8-u1-cr-coastal-climate", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return textq("A coastal town and an inland town sit at the same latitude. In January the coastal town averages -4 degrees Celsius while the inland town averages -14 degrees Celsius, and in July the coastal town is the cooler of the two. Explain the ocean's role in this pattern. (3 marks)",
      ["the ocean stores heat because water heats and cools slowly", "stored heat is released in winter and the ocean stays cool in summer", "currents and winds move the moderated air over the coast"],
      "<b>Model answer:</b> Water heats up and cools down very slowly, so the ocean stores a great deal of heat. Through the winter the ocean gives up its stored heat gradually, warming the air over the coast, while the inland town, with no such store beside it, gets much colder. In summer the ocean is still cool from winter and holds the coastal town's temperature down. Currents such as the warm Gulf Stream add heat to the water offshore, and winds and convection carry the ocean-moderated air over the coastal town.<br><br><b>Marking points:</b> 1 mark for water's slow heating and cooling (heat storage). 1 mark for the stored heat moderating winter (and the cool ocean moderating summer). 1 mark for a carrying mechanism: currents supplying the heat, or winds and convection moving the moderated air onshore.",
      {});
  }
]), ["The pattern runs both ways: warmer in winter, cooler in summer. One property of water explains both.", "Think of the ocean as a very slow heater and cooler beside the town."]);

E("s8-u1-iceberg", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return mcq("Each spring, tour operators off St. John's advertise iceberg viewing as the bergs drift south past the Avalon Peninsula. A student claims the Gulf Stream brings the bergs. Which correction is right, and why does it matter to the tour season?",
      "The cold Labrador Current carries the bergs south from Greenland; it matters because the bergs arrive as the current carries them past the coast in spring",
      ["The Gulf Stream does bring the bergs, and it matters because its warm water melts them quickly",
       "The Labrador Current carries the bergs north from Antarctica; it matters because they arrive in autumn",
       "Neither current is involved; the bergs drift with the tides alone, which is why the season is short"],
      "Icebergs calve from Greenland's glaciers into the cold Labrador Current, which flows southward past Labrador and Newfoundland carrying them. The warm Gulf Stream flows the other way and would melt bergs, not deliver them. The viewing season follows the cold current's spring delivery.",
      {});
  }
]), ["Icebergs come from Greenland, in the north. Which current flows southward from there?", "A warm current would be a problem for an iceberg, not a delivery service."]);

/* ---------- SC8.1.7 Waves and tides ---------- */

E("s8-u1-wave-energy", 1, ["SC8.1.7"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a water wave. Where does the energy of ocean surface waves come from?",
      "Moving air: the wind transfers its energy to the water surface",
      ["The gravitational pull of the moon",
       "Earthquakes under the ocean floor",
       "Ocean currents flowing beneath the surface"],
      "A wave on the surface of water is moving water that transfers energy. Ordinary ocean waves are generated primarily by the wind: moving air transfers its energy across the surface of the water. The moon's pull generates tides instead, and undersea earthquakes generate the exceptional case, tsunamis.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the crest of the wave?",
      "A",
      ["B", "C", "D"],
      "The crest is the top of the wave, marked A. B sits in the trough, the lowest point, C spans the wavelength, the distance from one crest to the next, and D spans the wave height, from crest level down to trough level.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the wavelength?",
      "C",
      ["A", "B", "D"],
      "The wavelength is the distance between two neighbouring crests, spanned by C. A marks a single crest, B sits in a trough, and D spans the wave height.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the wave height?",
      "D",
      ["A", "B", "C"],
      "The wave height is the vertical distance from trough level to crest level, spanned by D. A marks a single crest, B sits in a trough, and C spans the wavelength horizontally.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  }
]), ["Ordinary waves are wind-driven. Tides are the moon-driven movement.", "The crest is the high point; the wavelength runs crest to crest; the height runs crest to trough."]);

E("s8-u1-tides", 1, ["SC8.1.7"], 1, "gen", function () {
  var cases = [
    { q: "The Earth, the moon and the sun are in a straight line. What happens to the tidal range?", k: "It is at its greatest: these are spring tides", w: ["It is at its smallest: these are spring tides", "It is at its greatest: these are neap tides", "It is unchanged: alignment does not affect tides"] },
    { q: "The sun, the moon and the Earth form a right angle. What happens to the tidal range?", k: "It is at its smallest: these are neap tides", w: ["It is at its greatest: these are neap tides", "It is at its smallest: these are spring tides", "It is unchanged: right angles cancel the tides"] },
    { q: "A fishing crew wants the largest possible tidal range so their boat can clear a shallow shoal. When should they plan to leave?", k: "During spring tides, when the Earth, moon and sun line up", w: ["During neap tides, when the sun and moon form a right angle with Earth", "At any time, because tidal range does not change through the month", "Only during an El Niño event"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Tides are generated by the gravitational pull of the moon, with the sun adding a lesser pull. When the Earth, moon and sun line up, the pulls add and the tidal range is greatest: spring tides. When the sun and moon are at right angles to Earth, the pulls partly cancel and the range is smallest: neap tides. Each occurs twice a month.",
    {});
}, ["Line up means the pulls add. Right angle means they partly cancel.", "Spring tides have the greatest range; neap tides the smallest."]);

E("s8-u1-tidal-range", 1, ["SC8.1.7"], 2, "gen", function () {
  var hi = pick([5.5, 6, 7.5, 8, 9.5, 11, 12.5, 14]);
  var lo = pick([0.5, 1, 1.5, 2]);
  var range = Math.round((hi - lo) * 10) / 10;
  function fmt(v) { return (Math.round(v * 10) / 10) + " m"; }
  var cand = [range + 2, hi, hi + lo, range * 2, Math.max(0.5, range - 1.5), range + 0.5];
  var dis = [];
  for (var ci = 0; ci < cand.length && dis.length < 3; ci++) {
    var cv = Math.round(cand[ci] * 10) / 10;
    if (cv !== range && dis.indexOf(cv) < 0) dis.push(cv);
  }
  return mcq("At a harbour, high tide is measured at " + hi + " m and the following low tide at " + lo + " m. What is the tidal range?",
    fmt(range),
    dis.map(fmt),
    "The tidal range is the difference between high tide and low tide: " + hi + " m - " + lo + " m = " + range + " m. Large ranges like this are why harbours such as those in the Bay of Fundy need careful timing.",
    {});
}, ["Tidal range is a difference: high tide minus low tide.", "Subtract the low tide measurement from the high tide measurement."]);

E("s8-u1-cr-tides", 1, ["SC8.1.7"], 2, "var", varset([
  function () {
    return textq("Explain why spring tides have a greater tidal range than neap tides, referring to the positions of the Earth, the moon and the sun in each case. (3 marks)",
      ["tides are generated by the gravitational pull of the moon", "in spring tides the three bodies line up and the pulls add", "in neap tides the sun and moon are at right angles and the pulls partly cancel"],
      "<b>Model answer:</b> Tides are generated mainly by the gravitational pull of the moon on Earth's oceans, with the sun adding a smaller pull of its own. In spring tides the Earth, moon and sun are in a straight line, so the sun's pull reinforces the moon's and the tidal range is greatest. In neap tides the sun and moon sit at right angles as seen from Earth, so their pulls work against each other and the tidal range is smallest. Both occur twice each month.<br><br><b>Marking points:</b> 1 mark for tides caused by the moon's gravitational pull (the sun's to a lesser extent). 1 mark for the aligned positions in spring tides and the pulls adding. 1 mark for the right-angle positions in neap tides and the pulls partly cancelling.",
      {});
  }
]), ["Start with what causes tides at all, then compare the two arrangements of the three bodies.", "Same cause, two geometries: in line, or at right angles."]);

E("s8-u1-wave-size", 1, ["SC8.1.7"], 3, "var", varset([
  function () {
    return mcq("Three storms are compared. Storm 1: strong wind for two hours over a small bay. Storm 2: the same wind for two days over a small bay. Storm 3: the same wind for two days across a wide ocean. Which storm produces the largest waves, and why?",
      "Storm 3, because wave size grows with wind speed, with how long the wind blows, and with the size of the water area it passes over",
      ["Storm 1, because a small bay concentrates the wind's energy",
       "Storm 2, because duration is the only factor that affects wave size",
       "All three equally, because the wind speed is the same in each"],
      "Wave size is influenced by three things together: the speed of the wind, the duration it blows, and the size of the water area it passes over (the fetch). Storm 3 matches Storm 2 on speed and duration and adds a far greater fetch, so its waves grow largest before their energy reaches a shoreline.",
      {});
  }
]), ["Three factors build a wave. Check which storm has all three working for it.", "Speed, duration, and the distance of open water: the fetch."]);

/* ---------- SC8.1.8 Erosion and deposition at shorelines ---------- */

E("s8-u1-slope", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Along one stretch of coast, a gently sloping beach is gaining sand while a steep cliff shore nearby is crumbling into the sea. Which statement explains the difference?",
      "Deposition happens on shorelines with shallow slopes, while erosion dominates on steeper slopes",
      ["Deposition happens on steep slopes, while erosion dominates on shallow slopes",
       "The slope makes no difference; only the rock type matters",
       "Both shores are eroding; deposition never adds material to a shoreline"],
      "The energy of waves erodes and deposits. On shallow-sloped shorelines, waves lose energy and drop the sediment they carry: deposition. On steep slopes, wave energy stays concentrated and tears material away: erosion. Slope is one of the factors, along with shoreline shape, rock type and wave energy, that decide which process wins.",
      {});
  }
]), ["Gaining sand means deposition; crumbling means erosion. Match each to its slope.", "Gentle slopes let waves drop their load."]);

E("s8-u1-headland-energy", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return mcq("Waves approaching a coast with headlands and bays do not strike it evenly. Where is the wave energy concentrated, and what follows?",
      "Energy concentrates on the headlands, so they erode fastest, while energy spreads out in the bays, where deposition builds beaches",
      ["Energy concentrates in the bays, so they erode fastest, while headlands receive spread-out energy and gain deposits",
       "Energy is equal everywhere, so headlands and bays change at the same rate",
       "Energy concentrates on the headlands, so sand is deposited there and the headlands grow"],
      "As waves bend toward a coast, their energy focuses on the headlands that jut out and spreads out as it reaches the bays. Concentrated energy erodes the headlands; spread-out energy in the bays drops sediment, building beaches. This is why headlands wear back while bays fill in.",
      {});
  }
]), ["A headland juts out and meets the waves first. What does that do to the energy it receives?", "Concentrated energy erodes; spread-out energy deposits."]);

E("s8-u1-rock-resistance", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("The red rocks at St. George's are wearing away noticeably faster than the cliffs of Bell Island in Conception Bay. What does this comparison show?",
      "Less resistant rock types erode at a faster rate than more resistant rock types under the same wave action",
      ["Red rock always erodes faster than grey rock, whatever the rock type",
       "Rock type makes no difference to erosion rates; only wave energy matters",
       "Cliffs erode slowly only because they are taller than other shores"],
      "The guide's own comparison: less resistant rock, such as the sandstone at St. George's, erodes faster than more resistant rock, such as the cliffs of Bell Island. Rock type is one of the factors that set how fast a shoreline changes, alongside slope, shape and wave energy.",
      {});
  }
]), ["Both shores face wave action. The difference named in the question is the rock itself.", "Resistance is the rock property that matters here."]);

E("s8-u1-cr-headland", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return textq("A headland of resistant rock juts into the ocean between two sandy bays. Over many years the headland develops cracks, a cave, and eventually an arch, while the bays grow wider beaches. Explain both changes, referring to wave energy. (3 marks)",
      ["wave energy is concentrated on the headland", "concentrated energy erodes the rock, cutting caves and arches", "energy spreads out in the bays so sediment is deposited"],
      "<b>Model answer:</b> Waves bend as they approach the coast, and their energy is concentrated on the headland that juts out to meet them. That concentrated energy erodes the rock, working into cracks and hollowing out caves; where a cave cuts through, an arch forms, and continued erosion is what eventually leaves a stack. In the bays the same wave energy spreads out over a wider front, loses strength, and can no longer carry its sediment, so the sediment is deposited and the beaches grow.<br><br><b>Marking points:</b> 1 mark for wave energy concentrated on the headland. 1 mark for erosion of the headland producing the cave and arch sequence. 1 mark for energy spreading in the bays and depositing sediment.",
      {});
  }
]), ["One coast, two energy stories: focused on the headland, spread in the bays.", "Erosion needs concentrated energy; deposition happens where energy is lost."]);

/* ---------- SC8.1.9 Landforms ---------- */

E("s8-u1-landform-figure", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea arch?",
      "B",
      ["A", "C", "D"],
      "The landforms show the erosion sequence. A is a sea cave, hollowed into the headland. B is a sea arch, where erosion has cut through the headland. C is a sea stack, a pillar left standing when an arch collapses, and D is the low stump that remains as a stack wears down.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea stack?",
      "C",
      ["A", "B", "D"],
      "A sea stack is the isolated pillar of rock left when a sea arch collapses, marked C. A is a sea cave, B is a sea arch still joined to the headland, and D is the worn-down stump of an older stack.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea cave?",
      "A",
      ["B", "C", "D"],
      "A sea cave is the hollow worn into the base of the headland, marked A. B is a sea arch, C a sea stack, and D a stump: the later stages of the same erosion sequence.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  }
]), ["Follow the sequence: cave first, then the cut-through arch, then the standing stack.", "Each landform is one stage of the headland wearing away."]);

E("s8-u1-landform-formation", 1, ["SC8.1.9"], 2, "gen", function () {
  var cases = [
    { q: "How does a sand bar form?", k: "Waves and currents deposit sand in shallow water, building up a ridge of sediment", w: ["Waves erode a headland until a ridge of rock is left standing", "A cave cuts through a headland and the roof collapses", "Wind blows beach sand into piles above the high tide line"] },
    { q: "How does a beach form and grow?", k: "Deposition: waves drop sand and sediment along a gently sloping shore faster than they remove it", w: ["Erosion: waves tear sand from the shore and pile it at the waterline", "Deposition: glaciers leave sand behind as they retreat from the coast", "Weathering: rock breaks down in place and the pieces stay where they fell"] },
    { q: "How does a shoal form?", k: "Sediment deposited in shallow water builds an area that is a hazard to boats", w: ["A stack collapses and its rubble spreads across the harbour entrance", "Tides carve a deep channel that fills with sediment at low tide", "Volcanic action raises the ocean floor near the shore"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Beaches, shoals and sand bars are deposition landforms: they exist because waves and currents dropped sediment in shallow water. Sea caves, arches and stacks are the erosion family. Sorting a landform into its family is the first step in explaining it.",
    {});
}, ["Ask whether material is being dropped or torn away.", "Sand features are built by deposition."]);

E("s8-u1-erosion-deposition", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    return mcq("Which list contains only landforms built by deposition?",
      "Beach, shoal, sand bar",
      ["Beach, sea arch, sand bar",
       "Sea cave, sea arch, sea stack",
       "Shoal, sea stack, sand bar"],
      "Beaches, shoals and sand bars are all built where waves and currents deposit sediment. Sea caves, sea arches and sea stacks are carved by erosion. The two families are the guide's organizing split for shoreline landforms.",
      {});
  }
]), ["Three of the six named landforms are deposited; three are eroded. Find the all-deposition list.", "Caves, arches and stacks are cut out of rock: erosion."]);

/* ---------- SC8.2.1 Ocean research institutions ---------- */

E("s8-u1-institutions", 1, ["SC8.2.1"], 1, "gen", function () {
  var cases = [
    { q: "A student is researching weather systems over the Atlantic. Which Canadian institution's work is most directly connected to weather?", k: "Environment Canada", w: ["C-CORE at Memorial University", "The Ocean Sciences Centre", "The Federal Department of Fisheries"] },
    { q: "A student wants to learn about research into cold ocean engineering, such as how structures stand up to icebergs. Which institution fits best?", k: "C-CORE, the Centre for Cold Ocean Research at Memorial University", w: ["Environment Canada", "The Federal Department of Fisheries", "The Ocean Sciences Centre"] },
    { q: "A student is studying the science of fish stocks and ocean ecosystems. Which institution fits best?", k: "The Ocean Sciences Centre at Memorial University", w: ["C-CORE at Memorial University", "Environment Canada", "A provincial tourism board"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Canada supports ocean research through public and private institutions, including Environment Canada (weather), the Federal Department of Fisheries, and Memorial University's Ocean Sciences Centre, its Oceanography Department, the Fisheries and Marine Institute, and C-CORE for cold ocean research. The guide asks that students be aware these agencies exist and what they broadly do.",
    {});
}, ["Match the institution to its broad focus: weather, fisheries and oceans science, or cold ocean engineering.", "C-CORE's name carries its focus: cold ocean research."]);

E("s8-u1-institution-focus", 1, ["SC8.2.1"], 1, "var", varset([
  function () {
    return mcq("Which statement about Canadian ocean research institutions is correct?",
      "Institutions such as Environment Canada, the Federal Department of Fisheries and Memorial University's Ocean Sciences Centre all support research involving the oceans",
      ["Only universities conduct ocean research in Canada",
       "Ocean research in Canada is done entirely by private fishing companies",
       "The institutions exist, but they study only freshwater lakes"],
      "Ocean research in Canada is shared among government departments and university centres. Environment Canada covers weather, the Federal Department of Fisheries covers fisheries and oceans, and Memorial University's Ocean Sciences Centre, C-CORE and Marine Institute research the ocean from St. John's. The guide requires awareness that these institutions exist and support ocean research.",
      {});
  }
]), ["The guide's point is awareness: these institutions exist and research the oceans.", "Government and university institutions both appear in the guide's list."]);

/* ---------- SC8.2.2 Technologies for researching ocean basins ---------- */

E("s8-u1-tech", 1, ["SC8.2.2"], 1, "gen", function () {
  var cases = [
    { q: "Scientists map the shape of the ocean floor by sending sound pulses down and timing their echoes. Which technology is this?", k: "Sonar", w: ["Diving", "Satellites", "Underwater photography"] },
    { q: "Scientists want to observe the wreck of the Titanic and collect samples from around it, far deeper than any diver can go. Which technology fits?", k: "A deep sea submersible", w: ["A satellite", "SCUBA diving", "Sonar alone"] },
    { q: "Scientists track broad ocean surface conditions, such as currents and storm systems, over the whole Atlantic at once. Which technology fits best?", k: "Satellites", w: ["Deep sea submersibles", "Diving", "Underwater photography"] },
    { q: "Scientists want close visual records of organisms living on a shallow reef. Which technology fits best?", k: "Underwater photography and videography", w: ["A deep sea submersible", "Satellites", "Sonar"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Much of what is known about ocean basins comes from indirect observations gathered by technology: sonar maps the floor with sound, satellites watch the surface broadly, underwater photography and videography record what is there, submersibles carry people and instruments to depth, and diving serves shallow work. Matching the tool to the job is the content.",
    {});
}, ["Decide what the scientists need: a map, a broad view, pictures, or a visit to depth.", "Sound and echoes mean sonar."]);

E("s8-u1-sonar", 1, ["SC8.2.2"], 1, "var", varset([
  function () {
    return mcq("Why is sonar so useful for researching ocean basins?",
      "Sound travels through water and returns echoes from the floor, so the floor's shape can be mapped without seeing it directly",
      ["Sonar cameras take photographs in total darkness",
       "Sonar lets divers breathe at any depth",
       "Sonar measures the salt content of deep water directly"],
      "Sonar works by sending sound pulses into the water and timing the echoes that bounce back from the ocean floor. From the timing, scientists build a picture of the basin's shape. It is an indirect observation: the floor is mapped without anyone seeing it, which is how most basin research proceeds.",
      {});
  }
]), ["Sonar uses sound. What does the returning echo tell the scientists?", "Echo timing becomes depth, and depth readings become a map."]);

E("s8-u1-cr-indirect", 1, ["SC8.2.2"], 2, "var", varset([
  function () {
    return textq("No one can see most of the ocean floor directly, yet scientists produce detailed maps of ocean basins and can describe features such as mid-ocean ridges and trenches. Explain how this knowledge is built, naming two technologies and what each contributes. (3 marks)",
      ["sonar maps the floor using sound echoes", "satellites or submersibles or photography add further evidence", "knowledge comes from indirect observations combined"],
      "<b>Model answer:</b> Knowledge of ocean basins is built from indirect observations. Ships using sonar send sound pulses down and time the echoes from the floor, and thousands of these depth readings are combined into a map of the basin's shape, revealing features like mid-ocean ridges and trenches. Other technologies add different evidence: satellites observe the ocean surface and conditions over whole basins at once, and deep sea submersibles and underwater photography let scientists examine and record specific features up close. Put together, the indirect evidence supports detailed claims about places no one can visit unaided.<br><br><b>Marking points:</b> 1 mark for sonar explained as sound echoes giving depth and shape. 1 mark for a second technology with its contribution (satellites, submersibles, underwater photography or diving). 1 mark for stating that the knowledge is indirect and built by combining evidence.",
      {});
  }
]), ["The puzzle: detailed knowledge of a place no one can see. Which tools supply the evidence?", "Sonar is the mapping tool. Add one more technology and say what it adds."]);

/* ---------- SC8.2.3 How ocean floor technologies improved ---------- */

E("s8-u1-tech-change", 1, ["SC8.2.3"], 2, "var", varset([
  function () {
    return mcq("Early ocean researchers measured depth by lowering a weighted wire line over the side of a ship and noting its length when it reached bottom. Modern ships use sonar instead. What is the main improvement?",
      "Sonar produces a continuous depth record as the ship moves, so a whole basin profile can be mapped rather than single scattered depths",
      ["Sonar works only in shallow water, where wire lines could not reach",
       "Sonar removes the need for a ship, because it works from shore",
       "Wire lines were more accurate; sonar is used only because it is cheaper"],
      "A wire line gives one depth at one spot, slowly. Sonar times sound echoes continuously as the ship travels, producing a running profile of the floor. The improvement is in the amount and continuity of the evidence, which is what turned scattered soundings into basin maps.",
      {});
  }
]), ["Compare what each method delivers: one point at a time, or a continuous record?", "More evidence, gathered faster, is the improvement pattern in this strand."]);

E("s8-u1-tech-improve", 1, ["SC8.2.3"], 1, "var", varset([
  function () {
    return mcq("How have deep sea submersibles improved on diving for ocean research?",
      "Submersibles carry researchers and instruments far deeper and for longer than a diver's body and air supply allow",
      ["Submersibles are smaller and cheaper than diving equipment",
       "Submersibles replaced the need for any surface ship",
       "Divers can now stay down as long as submersibles can"],
      "Diving is limited by the human body and its air supply, so it serves shallow water. Deep sea submersibles, the technology at the centre of the strand's Undersea Adventure STSE, protect their crews from pressure and carry instruments, opening the deep ocean floor to direct research. The pattern is the same across this indicator: each generation of technology extends where and how long scientists can gather evidence.",
      {});
  }
]), ["What limits a diver? Depth and air. What does a submersible do about those limits?", "Improvement here means reaching places and depths that were closed before."]);

/* ---------- SC8.2.4 Technologies that contain wave and tide damage ---------- */

E("s8-u1-protection", 1, ["SC8.2.4"], 1, "gen", function () {
  var cases = [
    { q: "A harbour builds a wall of rock out in the water, before the wharves, so incoming waves break on it and lose their energy. What is this structure?", k: "A breakwater", w: ["A jetty used as a wharf", "A sea wall built along the beach", "Vegetation planting"] },
    { q: "A community plants grasses and shrubs along its shore so their roots hold the soil against wave wash. Which protection method is this?", k: "Vegetation", w: ["A breakwater", "Boulders placed against the wharf", "A sea wall"] },
    { q: "Workers pile very large boulders against the face of a wharf to absorb the force of storm waves. Which protection method is this?", k: "Large boulders placed against the wharf", w: ["A breakwater", "Coastline reconfiguration", "Vegetation"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Technologies designed to contain damage from waves and tides include breakwaters, jetties and wharves, vegetation, sea walls, coastline reconfiguration, and large boulders placed against wharves. Each either breaks the waves' energy before it lands or holds the shore against it.",
    {});
}, ["Picture where the structure sits: out in the water, along the shore, or living roots in the soil.", "A breakwater stands offshore and takes the wave's energy first."]);

E("s8-u1-protection-choice", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return mcq("A town must protect a beach that is also a nesting area for shorebirds. Engineers compare three plans: a concrete sea wall, a rock breakwater, and restoring the dune grasses that once covered the beach. The town's council asks which plan appears most successful at limiting damage with the least impact on the ecosystem present. Based on the guide's treatment, which answer is best supported?",
      "Restoring the dune vegetation, because living roots hold the shore and absorb wave wash while leaving the habitat in place",
      ["The concrete sea wall, because the hardest structure always has the least environmental impact",
       "The rock breakwater, because any structure placed offshore removes the need to consider the beach itself",
       "None of them, because the guide treats all protection methods as equally damaging"],
      "The guide's comparison activity asks students to identify which method appears most successful with the least environmental impact on the ecosystems present. Vegetation holds soil with living roots, absorbs wave energy gradually and preserves the habitat the birds use. Hard structures protect property but replace or disturb the shoreline ecosystem. The judgement follows from weighing protection and impact together.",
      {});
  }
]), ["The question has two tests: does it limit damage, and what does it do to the ecosystem that is there?", "A living shore can do both jobs; a wall trades habitat for hardness."]);

E("s8-u1-cr-protect", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return textq("A small coastal community has a wharf used by fishing boats and a low, gently sloping shore that floods during winter storms. Choose one protection technology for this shore and justify your choice: say how it limits wave or tide damage, and name one drawback the community should weigh. (3 marks)",
      ["a named technology such as breakwater, sea wall, boulders or vegetation", "how it reduces wave energy or holds the shore", "a drawback such as cost, habitat impact or upkeep"],
      "<b>Model answer:</b> A breakwater fits this shore. Built out in the water before the wharf, it forces incoming storm waves to break on the rocks and spend their energy there, so the water reaching the wharf and the low shore is much calmer and flooding and damage are reduced. The drawback to weigh is that a breakwater is expensive to build and maintain, and it changes the water movement along that shore, which can shift where sediment is deposited and affect the shore habitat nearby. (A sea wall, boulders or vegetation, justified in the same pattern, also earns full marks.)<br><br><b>Marking points:</b> 1 mark for a suitable named technology. 1 mark for how it limits the damage (breaks wave energy, holds the shore, or absorbs the wash). 1 mark for a genuine drawback weighed.",
      {});
  }
]), ["Match the technology to this shore: a working wharf and a low flooding slope.", "A complete justification has three parts: the choice, how it works, and its cost."]);

/* ---------- SC8.2.5 Effects of marine technologies ---------- */

E("s8-u1-overfishing", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Fish stocks declined sharply in the decades when factory freezer trawlers spread through the fleet. Which statement best fits the guide's treatment of technology and overfishing?",
      "New technologies have contributed to overfishing: larger vessels, better fish-finding technology and more effective catch methods let fleets take fish faster than stocks can replace them",
      ["Technology reduced overfishing, because freezer trawlers waste less of each catch",
       "Overfishing was caused only by fish behaviour changing, not by technology",
       "Factory freezer trawlers affected only freshwater fisheries"],
      "The guide limits the discussion to the impact of improved fishing technology: catch methods, fish-finding technology and vessel type. Factory freezer trawlers combine all three, catching and processing huge amounts at sea, and that capability is a recognized contributor to the decline of stocks such as cod.",
      {});
  }
]), ["The guide's focus is narrow here: improved fishing technology. Which option stays on that point?", "Bigger vessels, better finding, better catching: capability grew faster than the stocks."]);

E("s8-u1-invasive", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("The European green crab, a species not native to this province, is now established in Placentia Bay, and the violet tunicate has appeared in Belleoram. Which technology-related route best explains introductions like these?",
      "Oil tankers and other ships release bilge and ballast water carrying foreign organisms into native habitats",
      ["Aquaculture pens release farmed fish that turn into crabs and tunicates",
       "Factory freezer trawlers carry the species in their nets from harbour to harbour",
       "Tidal power turbines transport organisms through their passages"],
      "The guide names this route directly: when oil tankers release their bilge water, foreign species can be introduced, endangering native habitats and organisms. The green crab in Placentia Bay and the violet tunicate in Belleoram are its local examples.",
      {});
  }
]), ["The species arrived by water that ships carry and release. Which water is that?", "Bilge and ballast water move organisms around the world."]);

E("s8-u1-aquaculture", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Mussel farms hang long lines of growing mussels in a bay. Which negative effect on the marine environment does the guide describe for this kind of aquaculture?",
      "Increased organic matter, called detritus rain, falls from the farms and accumulates on the sea floor",
      ["The mussels filter so much water that the bay's salinity rises sharply",
       "The lines block ocean currents and change the regional climate",
       "The farms attract factory trawlers that overfish the bay"],
      "The guide's aquaculture effects include the accidental release of farmed organisms into native populations, the spread of disease, and, for mussel farms specifically, detritus rain: increased organic matter falling and accumulating on the sea floor beneath the farm.",
      {});
  }
]), ["The effect named for mussel farms is about what falls from the farm to the floor.", "Detritus rain is the guide's own term for it."]);

E("s8-u1-cr-tech-effects", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return textq("Choose one marine technology from this list: factory freezer trawlers, offshore oil rigs, tidal power, or aquaculture. Describe one positive effect and one negative effect of that technology on ocean species or their environment, and state the balance as you see it. (3 marks)",
      ["a positive effect tied to the technology", "a negative effect tied to the technology", "a stated balance or judgement"],
      "<b>Model answer:</b> Offshore oil rigs. On the positive side, a rig's structure acts as an artificial reef that shelters marine organisms, and the industry funds monitoring of the surrounding ocean. On the negative side, oil spills can kill sea birds and damage ecosystems, drilling scours the ocean floor and destroys marine habitat, and tankers serving the rigs can introduce foreign species in bilge water. On balance the negative effects reach further and last longer than the shelter benefit, so the technology's value depends on strict prevention of spills and habitat damage. (Any listed technology, treated in the same pattern, earns full marks.)<br><br><b>Marking points:</b> 1 mark for a positive effect genuinely tied to the chosen technology. 1 mark for a negative effect genuinely tied to it. 1 mark for a stated balance that follows from the two effects given.",
      {});
  }
]), ["Pick the technology you can say the most about, then keep both effects tied to it.", "The third mark is for the balance: say which side weighs more, from your own two effects."]);

E("s8-u1-offshore", 1, ["SC8.2.5"], 3, "var", varset([
  function () {
    return mcq("A review of an offshore oil project lists four findings. Which finding describes an effect on marine environments that the guide attributes to the offshore oil industry?",
      "Drilling activity scours the ocean floor, destroying marine habitats, and spills can spread oil across the surface",
      ["The project increases upwelling, raising the bay's productivity",
       "The project's lights attract fish, which increases the local catch",
       "The project lowers the ocean's salinity around the rig"],
      "The guide's discussion of the offshore oil industry names pollution including oil spills, and the scouring of the ocean floor destroying marine habitats, with bilge water introductions as a further route of harm. The other findings invent mechanisms the guide does not describe.",
      {});
  }
]), ["Two harms are named in the guide for this industry: one from spills, one from the floor itself.", "Scouring is the floor-damage word to watch for."]);

/* ---------- SC8.2.6 Science cannot resolve every ocean problem ---------- */

E("s8-u1-sustain-aspects", 1, ["SC8.2.6"], 1, "var", varset([
  function () {
    return mcq("A proposal to expand an offshore oil field is debated. One speaker says: 'It would bring well-paying jobs to the region, but a spill could kill sea birds and damage the ecosystem for years.' Which pair of sustainable development aspects is the speaker weighing?",
      "Economic (jobs) against environmental (harm to sea birds and ecosystems)",
      ["Environmental against environmental",
       "Social and cultural against economic",
       "Scientific against technological"],
      "Sustainable development decisions weigh three aspects: environmental, economic, and social and cultural. Jobs are an economic effect; harm to sea birds and ecosystems is an environmental effect. The speaker is weighing exactly the kind of trade-off the guide describes, where a decision rarely satisfies every aspect at once.",
      {});
  }
]), ["Sort the two consequences: jobs belong to one aspect, sea birds to another.", "The three aspects are environmental, economic, and social and cultural."]);

E("s8-u1-cr-decision", 1, ["SC8.2.6"], 3, "var", varset([
  function () {
    return textq("A company proposes a new aquaculture development in a bay that also supports a small inshore fishery and a community that values its traditional way of life. Lay out the decision the way the guide frames such decisions: give one possible positive effect and one possible negative effect, covering different aspects of sustainable development, state your recommendation, and explain why scientific and technological knowledge alone cannot settle the question. (4 marks)",
      ["a positive effect in one aspect, such as economic jobs", "a negative effect in another aspect, such as environmental or social and cultural", "a clear recommendation", "science informs the decision but values and compromise decide it"],
      "<b>Model answer:</b> Positively, the development could bring steady jobs and income to the community (economic). Negatively, escaped farmed fish and disease could harm the wild stocks the inshore fishery depends on, and increased organic matter could accumulate on the bay's floor (environmental), while a changed bay could alter the community's traditional way of life (social and cultural). My recommendation is to allow a smaller development with strict containment and monitoring, because that weighs the jobs against protections for the fishery. Scientific and technological knowledge can measure the risks and design the safeguards, but it cannot decide how much risk to the fishery and the way of life is worth the jobs: that weighing of pros and cons is a decision for the stakeholders, and it will not satisfy everyone.<br><br><b>Marking points:</b> 1 mark for a positive effect placed in its aspect. 1 mark for a negative effect placed in a different aspect. 1 mark for a clear recommendation that follows from the effects given. 1 mark for explaining that science informs but cannot settle the decision, because it rests on weighing values and compromise.",
      {});
  }
]), ["Structure it as the guide does: effects first, in different aspects, then the decision, then the limit of science.", "Four parts, four marks: positive, negative, recommendation, and why science alone cannot decide."]);

/* ---------- SC8.3.1 Core Lab 1-2B: carrying out the salinity procedure ---------- */

E("s8-u1-lab-procedure", 1, ["SC8.3.1"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 1-2B, a student investigates how salinity affects water density by adding drops of coloured fresh water to a container of salt water. Which procedure step is correct?",
      "Add the drops gently at the surface and observe where the coloured water settles before any stirring",
      ["Stir the container briskly after each drop so the waters mix evenly",
       "Pour the fresh water in quickly from a height so it reaches the bottom",
       "Heat the salt water first so the fresh water spreads through it"],
      "The lab investigates how fresh and salt water interact when they meet. The coloured fresh water must be added gently and observed as it settles: it stays near the top, because fresh water is less dense than salt water. Stirring, pouring hard or heating would destroy the very layering the procedure is meant to reveal.",
      {});
  }
]), ["The lab's whole point is watching where the fresh water settles. Which step protects that observation?", "Anything that mixes the waters ruins the investigation."]);

E("s8-u1-lab-extension", 1, ["SC8.3.1"], 2, "var", varset([
  function () {
    return mcq("Core Lab 1-2B ends by extending the result to environments where fresh water and ocean water meet. In an estuary, where river water flows into the ocean, what arrangement should the lab's result predict?",
      "The less dense fresh water from the river rides over the denser salt water it meets",
      ["The denser fresh water sinks beneath the salt water it meets",
       "The two waters always mix instantly into one uniform layer",
       "The salt water floats on top because it is warmer"],
      "The lab's finding is that fresh water, being less dense, floats on salt water. Extended to an estuary, the river's fresh water rides over the ocean's salt water where they meet, which is part of what makes estuaries layered, productive environments.",
      {});
  }
]), ["Carry the lab result outdoors: same two waters, now a river meeting the ocean.", "Less dense water stays on top, in the lab and in the estuary."]);

E("s8-u1-cr-design-salinity", 1, ["SC8.3.1"], 3, "var", varset([
  function () {
    return textq("Design an investigation to test how salinity affects the density of water. Your plan must state the question you are testing, the variable you will change, the variables you will keep the same, what you will observe or measure, and how your observations will let you draw a conclusion. (4 marks)",
      ["testable question about salinity and density", "salinity changed while volume and temperature stay the same", "observe where each sample settles or whether an object floats higher", "conclusion drawn from comparing the samples"],
      "<b>Model answer:</b> Question: how does increasing the salinity of water affect its density? Prepare three samples of water with different measured amounts of salt dissolved (for example none, a moderate amount, and a large amount), keeping the volume of each sample and its temperature the same. Add drops of coloured water of one fixed salinity gently to each sample, or float the same object in each, and observe where the drops settle or how high the object floats. If the drops settle lower, or the object floats lower, in the less salty samples, the conclusion follows: increasing salinity increases density, because the saltier water supports the added water or object higher up.<br><br><b>Marking points:</b> 1 mark for a testable question naming salinity and density. 1 mark for salinity as the changed variable. 1 mark for at least two variables held the same (volume, temperature, the object or drop used). 1 mark for observations that connect to the conclusion (settling level or floating height compared across samples).",
      {});
  }
]), ["Plan it like the core lab: question, changed variable, kept variables, observations, conclusion.", "Four parts earn the four marks. Do not skip the variables you keep the same."]);

/* ---------- SC8.3.2 Using tools and apparatus safely ---------- */

E("s8-u1-safe-practice", 1, ["SC8.3.2"], 1, "var", varset([
  function () {
    return mcq("During the water health test, a student is about to carry a full container of pond water and a glass thermometer across the room. Which choice is the safe practice?",
      "Carry the container with two hands, walk slowly, and keep the thermometer in its case until it is needed at the bench",
      ["Carry the container in one hand and the thermometer in the other to save a trip",
       "Run the sample back quickly so the readings can be taken sooner",
       "Hold the thermometer by its bulb while walking so it warms up ready for use"],
      "Safe tool use in this strand's labs means protecting both the student and the instruments: two hands for a full container, a slow walk, and glass instruments like thermometers kept protected until they are used at the bench. The bank carries this one entry on safe practice; safe handling itself is assessed in the classroom.",
      {});
  }
]), ["Think about what could spill or break, and choose the option that prevents both.", "Two hands, slow pace, glass kept in its case."]);

/* ---------- SC8.3.3 Interpreting trends in data ---------- */

E("s8-u1-health-figure", 1, ["SC8.3.3"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows dissolved oxygen measured at four sites along a river. Water that supports fish well holds dissolved oxygen of 5 mg/L or greater, shown by the dashed line. Which site falls below that healthy level?",
      "Site C",
      ["Site A", "Site B", "Site D"],
      "Reading the bars against the dashed 5 mg/L line: Sites A, B and D sit above it, while Site C's bar reaches only about 3.5 mg/L, below the level that supports fish well. Interpreting data means comparing values with the standard that gives them meaning.",
      {});
    q.figure = s8HealthSVG([{ name: "Site A", value: 8.2 }, { name: "Site B", value: 6.4 }, { name: "Site C", value: 3.5 }, { name: "Site D", value: 7.1 }], "Dissolved oxygen", "mg/L", 5);
    return q;
  },
  function () {
    var q = mcq("The graph shows dissolved oxygen measured at four ponds. Water that supports fish well holds dissolved oxygen of 5 mg/L or greater, shown by the dashed line. Which pond has the healthiest dissolved oxygen level?",
      "Pond W",
      ["Pond X", "Pond Y", "Pond Z"],
      "All four ponds are compared against the same dashed line at 5 mg/L. Pond W's bar is the highest, at about 9 mg/L, comfortably above the healthy threshold. The skill is reading each value against the standard, not just picking the longest bar without checking the line.",
      {});
    q.figure = s8HealthSVG([{ name: "Pond W", value: 9 }, { name: "Pond X", value: 5.8 }, { name: "Pond Y", value: 4.2 }, { name: "Pond Z", value: 6.6 }], "Dissolved oxygen", "mg/L", 5);
    return q;
  }
]), ["Compare every bar with the dashed threshold line, not just with each other.", "The dashed line is the standard: 5 mg/L."]);

E("s8-u1-data-relationship", 1, ["SC8.3.3"], 3, "var", varset([
  function () {
    return mcq("A class measures a pond through the summer. In June the water is 12 degrees Celsius and holds 9.5 mg/L of dissolved oxygen. In July it is 18 degrees and holds 8.1 mg/L. In August it is 24 degrees and holds 6.8 mg/L. Which statement correctly interprets the trend in this data?",
      "As the water temperature increased, the dissolved oxygen decreased: warmer water holds less dissolved oxygen",
      ["As the water temperature increased, the dissolved oxygen increased in step",
       "Temperature and dissolved oxygen stayed in a fixed total all summer",
       "The data show no relationship, because three measurements are too few to read"],
      "Reading the pairs in order: 12 degrees with 9.5 mg/L, 18 with 8.1, 24 with 6.8. Each temperature rise comes with an oxygen fall, a consistent inverse trend. That is the relationship the guide uses in its own example chain: warmer water holds less dissolved oxygen.",
      {});
  }
]), ["Pair each temperature with its oxygen value and read the pairs in order.", "Both numbers move every month. Do they move together or in opposite directions?"]);

/* ---------- SC8.3.4 Communicating questions and results ---------- */

E("s8-u1-conclusion-statement", 1, ["SC8.3.4"], 1, "var", varset([
  function () {
    return mcq("A student must write the result of the salinity investigation in her notes in one clear sentence. Which sentence communicates the result best?",
      "The coloured fresh water floated on the salt water, showing fresh water is less dense than salt water",
      ["The lab was interesting and the water did what we thought",
       "We put drops in and watched them for a while",
       "Salt water and fresh water are both water, so the lab showed they are the same"],
      "Communicating a result means stating what was observed and what it shows, in one sentence a reader who missed the lab can use. The first option reports the observation (the fresh water floated) and the conclusion it supports (fresh water is less dense). The others are vague, or contradict the observation.",
      {});
  }
]), ["A good result sentence has two parts: what was seen, and what it shows.", "Vague sentences and contradicted sentences both fail the reader."]);

E("s8-u1-cr-results-summary", 1, ["SC8.3.4"], 2, "var", varset([
  function () {
    return textq("A group tested four samples from a stream for the water health lab. Their results: dissolved oxygen 7.8 mg/L; phosphates 6 micrograms per litre; pH 6.4; the water was slightly cloudy. Healthy ranges from the lab: dissolved oxygen 5 mg/L or greater; phosphates less than 10 micrograms per litre; pH between 5 and 8.5. Write a short results summary for the group's report: state each result against its healthy range and give the overall conclusion. (3 marks)",
      ["each measurement compared with its healthy range", "all three measured factors within range", "overall conclusion that the stream water is healthy, with the cloudiness noted"],
      "<b>Model answer:</b> The dissolved oxygen, 7.8 mg/L, is above the healthy minimum of 5 mg/L. The phosphates, 6 micrograms per litre, are below the healthy limit of 10. The pH, 6.4, sits inside the healthy range of 5 to 8.5. The water was slightly cloudy, a turbidity observation worth noting. Overall, all three measured factors fall within their healthy ranges, so the results support the conclusion that this stream water is in healthy condition for the species tested.<br><br><b>Marking points:</b> 1 mark for at least two measurements stated against their healthy ranges. 1 mark for the third measurement and the turbidity observation included. 1 mark for an overall conclusion that follows from the comparisons.",
      {});
  }
]), ["A results summary compares, it does not just list. Put every number beside its healthy range.", "Finish with the overall conclusion the comparisons support."]);

/* ---------- SC8.3.5 Stating a conclusion about salinity and density ---------- */

E("s8-u1-lab-conclusion", 1, ["SC8.3.5"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 1-2B, coloured fresh water added gently to salt water stays in a layer near the top instead of mixing or sinking. Which conclusion about salinity and density does this observation support?",
      "Increasing salinity increases density, so the less salty fresh water floats on the denser salt water",
      ["Increasing salinity decreases density, so the fresh water floats because it is denser",
       "Salinity has no effect on density; the colouring holds the fresh water up",
       "Fresh water and salt water have equal density, and the layer is temporary"],
      "The stated conclusion of the core lab: salinity affects density. Dissolved salt makes water denser, so fresh water added gently to salt water floats on top of it. The layering is the evidence; the density difference is the conclusion.",
      {});
  }
]), ["The observation is layering. Which density arrangement produces layering with fresh water on top?", "The water that floats is the less dense one."]);

E("s8-u1-conclusion-judge", 1, ["SC8.3.5"], 2, "var", varset([
  function () {
    return mcq("A student floats the same wooden block in three tanks: fresh water, slightly salty water, and very salty water. The block floats lowest in fresh water and highest in the very salty water. Which conclusion is supported by these observations?",
      "As salinity increases, density increases, so the block is supported higher in saltier water",
      ["As salinity increases, the block becomes lighter, so it floats higher",
       "The block floats higher in salt water because salt water is warmer",
       "No conclusion is possible, because the block was not weighed"],
      "The same block, with the same mass, floats at different heights, so the difference must be in the water. Floating higher means the water is supporting it more strongly, which is what greater density does. The observations support the conclusion that salinity increases density, the same conclusion as the core lab, reached by a different observation.",
      {});
  }
]), ["The block never changes. What changes from tank to tank, and what must it be doing?", "Floating height is the evidence; density is the explanation."]);

/* ---------- SC8.3.6 Selecting methods and tools ---------- */

E("s8-u1-tool-choice", 1, ["SC8.3.6"], 1, "var", varset([
  function () {
    return mcq("For the water health test, a group must measure how cloudy a pond sample is, since turbidity is one of the abiotic factors being checked. Which tool choice fits the job?",
      "A turbidity tube or disc, which measures how far light penetrates the sample",
      ["A thermometer, read carefully in the shade",
       "A pH test kit, used twice to be sure",
       "A dissolved oxygen meter, set to its cloudiness scale"],
      "Selecting a tool means matching it to the quantity being measured. Turbidity is cloudiness, the blocking of light by suspended particles, so it is measured by how far light or a marked disc can be seen through the water. Thermometers measure temperature, pH kits measure acidity, and oxygen meters measure dissolved oxygen.",
      {});
  }
]), ["Match the tool to the quantity: turbidity is about light getting through water.", "Each of the other tools measures a different factor in the same lab."]);

E("s8-u1-method-choice", 1, ["SC8.3.6"], 2, "var", varset([
  function () {
    return mcq("A class is asked to judge the water health of a whole pond, not just one spot. Which method gives the most trustworthy picture?",
      "Take samples at several locations around and across the pond and average the results for each factor",
      ["Take one sample at the easiest point to reach and test it very carefully",
       "Sample only where the water looks dirtiest, since that is where problems would show",
       "Ask a student who swims in the pond to describe the water"],
      "A pond is not uniform: inlets, shade, depth and vegetation change conditions from place to place. Sampling several locations and averaging gives a picture of the whole pond and protects the conclusion from one unusual spot. Careful testing of a single convenient sample still describes only that sample.",
      {});
  }
]), ["The question is about the whole pond. Which method actually covers the whole pond?", "One careful sample is still one sample."]);

/* ---------- SC8.3.7 Interpreting patterns and inferring relationships ---------- */

E("s8-u1-pattern-infer", 1, ["SC8.3.7"], 2, "var", varset([
  function () {
    return mcq("Surveys of a bay over ten years show that in years when upwelling was strong, the catch of capelin was high, and in years when upwelling was weak, the catch was low. Which inference is best supported by this pattern?",
      "Strong upwelling supports larger capelin populations, because the upwelled water brings nutrients that feed the plankton capelin eat",
      ["Capelin cause upwelling in the years when they are plentiful",
       "The pattern proves fishing boats catch more whenever they choose to go out",
       "Upwelling and capelin are unrelated, because the data cover only ten years"],
      "The pattern repeats across ten years in the same direction, which supports an inference, and the mechanism is known: upwelling delivers nutrient-rich water, nutrients feed plankton, and capelin feed on plankton. An inference pairs the observed pattern with a mechanism that explains it.",
      {});
  }
]), ["A repeating pattern plus a known mechanism makes an inference. Look for the option that has both.", "Capelin eat plankton. What feeds the plankton?"]);

E("s8-u1-relationship-explain", 1, ["SC8.3.7"], 3, "var", varset([
  function () {
    return mcq("Along a coastline, the bays with the most reliable upwelling also have the densest populations of seabirds, even though the birds nest on land. Which explanation best accounts for the whole pattern?",
      "Upwelling brings nutrients to the surface, plankton flourish, fish gather to feed on the plankton, and the seabirds feed on the fish, so the birds concentrate where the chain begins",
      ["Seabirds prefer the smell of upwelled water and gather for that reason alone",
       "Upwelling cools the air, and seabirds nest where the air is coolest",
       "The pattern is a coincidence, because land birds cannot be connected to ocean processes"],
      "Explaining a pattern means tracing the relationship through every link. Upwelling supplies nutrients; nutrients grow plankton; plankton draws fish; fish feed the birds. The birds' distribution on land is the far end of a chain that starts with a water movement, which is the kind of relationship this strand's data work is meant to surface.",
      {});
  }
]), ["The birds are two steps removed from the water. Build the chain link by link.", "Nutrients, plankton, fish, birds: each link feeds the next."]);

/* ---------- SC8.3.8 Reporting on abiotic factors and evaluating processes ---------- */

E("s8-u1-threshold-judge", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return mcq("A freshwater sample from Core Lab 3-3B gives these results: dissolved oxygen 4.1 mg/L, phosphates 6 micrograms per litre, pH 6.8. Healthy ranges: dissolved oxygen 5 mg/L or greater; phosphates less than 10 micrograms per litre; pH 5 to 8.5. Which judgement is correct?",
      "The dissolved oxygen is below its healthy range, while phosphates and pH are within theirs, so the water may not support fish well",
      ["All three factors are within their healthy ranges, so the water is healthy",
       "The phosphates are above their healthy limit, which is the sample's main problem",
       "The pH is outside its healthy range, which is the sample's main problem"],
      "Compare each value with its range. Dissolved oxygen 4.1 mg/L is below the 5 mg/L minimum. Phosphates at 6 are under the limit of 10, and pH 6.8 sits inside 5 to 8.5. Only the oxygen fails, and low oxygen is what limits the fish the water can support.",
      {});
  }
]), ["Judge the three values one at a time against their ranges before choosing.", "Only one of the three values misses its range. Find it."]);

E("s8-u1-cr-pond-data", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return textq("A class reports on a pond using Core Lab 3-3B. Results: dissolved oxygen 3.8 mg/L (healthy: 5 or greater); phosphates 14 micrograms per litre (healthy: less than 10); pH 6.1 (healthy: 5 to 8.5); the water was noticeably cloudy after rain. Write the group's findings: identify each factor that falls outside its healthy range, and explain what the combined results suggest about the pond's ability to support fish and water plants. (3 marks)",
      ["dissolved oxygen and phosphates outside their ranges, pH within", "low oxygen limits fish", "phosphate-fed algae and turbidity reduce light for plants"],
      "<b>Model answer:</b> Two factors fall outside their healthy ranges. Dissolved oxygen, at 3.8 mg/L, is below the healthy minimum of 5 mg/L, so the pond may not support fish well. Phosphates, at 14 micrograms per litre, are above the healthy limit of 10, which feeds excess algae growth. The pH, 6.1, is within its healthy range. Together with the cloudiness after rain (turbidity blocking light), the results suggest a pond under stress: fish are limited by low oxygen, and water plants are squeezed by both the turbidity and the algae the phosphates feed.<br><br><b>Marking points:</b> 1 mark for identifying dissolved oxygen and phosphates as outside their ranges and pH as within. 1 mark for the consequence for fish (low oxygen). 1 mark for the consequence for plants (light reduced by turbidity and phosphate-fed algae).",
      {});
  }
]), ["Report factor by factor first, then combine them into the pond's overall picture.", "Two factors fail their ranges. The conclusion connects them."]);

E("s8-u1-process-evaluate", 1, ["SC8.3.8"], 3, "var", varset([
  function () {
    return mcq("A group evaluated its water health investigation afterwards. Their plan had been: one sample, taken at the pond's edge on one afternoon, tested once for each factor. Their report concluded the whole pond was unhealthy because the oxygen reading was low. Which evaluation of their process is most accurate?",
      "The process was too weak for the conclusion: a single edge sample on one day cannot represent the whole pond, and one low reading should have been checked with repeat samples before concluding",
      ["The process was sound, because they used the correct test for each factor",
       "The only weakness was that they sampled in the afternoon rather than the morning",
       "The process was weak only because they wrote the conclusion too confidently"],
      "Evaluating a process means judging whether the plan could support the conclusion drawn from it. One sample from one edge on one day describes that spot at that moment, not the whole pond, and a single surprising reading calls for repeats. The tests themselves were right; the sampling plan and the leap to a whole-pond conclusion were the weaknesses.",
      {});
  }
]), ["Judge the plan against the conclusion's size: one sample, whole pond.", "Correct tests cannot rescue an unrepresentative sample."]);

/* ---------- SC8.3.9 Population graphs: interpolate and extrapolate ---------- */

E("s8-u1-pop-interpolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows counts of a marine species in a bay, taken every two years. Estimate the count in 2021, a year between measurements.",
      "About 185",
      ["About 160", "About 210", "About 240"],
      "Interpolating means estimating between known points. The 2020 count is 160 and the 2022 count is 210, so 2021 falls between them, at about their midpoint, 185. Reading off a measured year (160 or 210) is not an interpolation.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [120, 160, 210, 250], "Individuals counted");
    return q;
  },
  function () {
    var q = mcq("The graph shows counts of a marine species in a bay, taken every two years. Estimate the count in 2023, a year between measurements.",
      "About 175",
      ["About 150", "About 160", "About 200"],
      "The 2022 count is 150 and the 2024 count is 200. The in-between year, 2023, is estimated at about the midpoint, 175. That is interpolation: estimating a value inside the measured range.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [90, 130, 150, 200], "Individuals counted");
    return q;
  }
]), ["The wanted year sits between two measured years. Its value sits between their values too.", "Take the midpoint of the two neighbouring counts."]);

E("s8-u1-pop-extrapolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows a marine species count rising steadily from 2019 to 2023. If the trend continues at the same rate, what is the best prediction for 2024?",
      "About 250",
      ["About 220", "About 235", "About 280"],
      "The counts rise by about 30 each year: 100, 130, 160, 190, 220. Extrapolating continues the pattern one step beyond the data, giving about 250 for 2024. Extrapolation assumes the trend continues, which is why it is a prediction, not a reading.",
      {});
    q.figure = s8PopGraphSVG([2019, 2020, 2021, 2022, 2023], [100, 130, 160, 190, 220], "Individuals counted");
    return q;
  },
  function () {
    var q = mcq("The graph shows a marine species count falling steadily from 2019 to 2023. If the trend continues at the same rate, what is the best prediction for 2024?",
      "About 150",
      ["About 120", "About 180", "About 200"],
      "The counts fall by about 30 each year: 300, 270, 240, 210, 180. Continuing the trend one more year gives about 150. That is extrapolation: extending the pattern beyond the measured years.",
      {});
    q.figure = s8PopGraphSVG([2019, 2020, 2021, 2022, 2023], [300, 270, 240, 210, 180], "Individuals counted");
    return q;
  }
]), ["Find the yearly step in the data, then take one more step of the same size.", "Extrapolation extends the trend; it does not repeat the last value."]);

E("s8-u1-cr-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    var q = textq("The graph shows counts of a marine species in a bay, taken every two years from 2018 to 2024. (a) Interpolate: estimate the count in 2021. (b) Extrapolate: predict the count in 2026 if the trend continues. (c) State the assumption your prediction depends on. (3 marks)",
      ["2021 about 130, between 110 and 150", "2026 about 230, continuing the increase of about 40 every two years", "the prediction assumes conditions and the trend stay the same"],
      "<b>Model answer:</b> (a) The 2020 count is 110 and the 2022 count is 150, so the 2021 count is estimated between them, at about 130. (b) The counts rise by about 40 every two years (80, 110, 150, 190, with the two-year steps 30, 40, 40), so continuing the trend gives about 230 in 2026. (c) The prediction assumes the conditions driving the increase stay the same: if food, predators, fishing pressure or water conditions change, the trend can break, which is why an extrapolation is a prediction rather than a measurement.<br><br><b>Marking points:</b> 1 mark for an interpolation of about 130 (accept 125 to 135). 1 mark for an extrapolation of about 230 (accept 220 to 240) from the trend. 1 mark for the assumption that conditions and the trend continue unchanged.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [80, 110, 150, 190], "Individuals counted");
    return q;
  }
]), ["Part (a) reads between points; part (b) extends the pattern; part (c) names what could break it.", "The two-year steps in the counts are your guide for both estimates."]);

E("s8-u1-temp-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    return mcq("A class plots two graphs for the same bay over eight years: average summer water temperature, rising steadily, and the population of a cold-water fish species, falling steadily. They also know fishing pressure stayed about the same. Which suggestion best fits the guide's approach to relating the graphs?",
      "The rising temperature is a reasonable suggested cause of the decline, because warmer water holds less dissolved oxygen, but the graphs alone show a relationship, not proof, and other changing factors should be checked",
      ["The graphs prove temperature caused the decline, so no other factor needs checking",
       "No relationship can be suggested, because the two graphs measure different things",
       "The fish decline must have caused the temperature rise, since the population graph falls as the other rises"],
      "Comparing population graphs with temperature graphs and suggesting possible relationships is exactly the activity the guide sets. The suggestion gains strength from a mechanism, warm water holding less oxygen, and from fishing pressure being steady. But two trends moving together show a relationship, not proof: an honest suggestion names the mechanism and keeps the door open to other factors.",
      {});
  }
]), ["A suggested relationship needs two things: a mechanism, and honesty about what graphs cannot prove.", "The guide's own example chain runs through dissolved oxygen."]);

/* ---------- SC8.3.10 Strengths and weaknesses of ocean floor technologies ---------- */

E("s8-u1-tech-strength", 1, ["SC8.3.10"], 2, "var", varset([
  function () {
    return mcq("Which pairing gives a genuine strength and a genuine weakness of sonar for investigating the ocean floor?",
      "Strength: it maps the floor's shape across whole basins from a moving ship. Weakness: it shows shape, not what the floor is made of or what lives there",
      ["Strength: it photographs organisms in total darkness. Weakness: it works only in shallow water",
       "Strength: it carries researchers to the floor. Weakness: it endangers its crew at great depth",
       "Strength: it measures water temperature at any depth. Weakness: it cannot detect the floor at all"],
      "Judging a technology means pairing what it does well with what it cannot do. Sonar's strength is coverage: continuous depth readings from a moving ship become basin maps. Its weakness is that echoes give shape only; composition and life on the floor need other technologies, such as sampling, photography and submersibles.",
      {});
  }
]), ["Check each half of the pairing separately: is the strength real, and is the weakness real?", "Sonar gives shape. It does not give composition or life."]);

E("s8-u1-tech-weakness", 1, ["SC8.3.10"], 1, "var", varset([
  function () {
    return mcq("Deep sea submersibles transformed ocean floor research, but they have a real limitation. Which statement names it?",
      "They are expensive, carry only a few people, and can stay at depth for a limited time, so they sample only tiny parts of the floor",
      ["They cannot descend below the continental shelf",
       "They disturb the water so much that sonar cannot be used near them",
       "They work only when the ocean surface is completely calm"],
      "Submersibles reach the deep floor directly, which no other technology does with people aboard, but each dive is costly, brief and small in crew and coverage. That is why they complement rather than replace wide-coverage tools like sonar: the strength of one covers the weakness of the other.",
      {});
  }
]), ["The limitation is about scale: cost, crew and time, not about whether the technology works.", "A submersible visits a tiny patch of floor at a time."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE = {
  "s8-u1-cr-design-salinity": true
};
BANK.forEach(function (e) { if (NO_COMPOSE[e.id]) { e.noCompose = true; } });

/* ----- bank-u2.js ----- */
// CRMARKS: s8-u2-cr-molasses=3
// CRMARKS: s8-u2-cr-layers=3
// CRMARKS: s8-u2-cr-density-block=3
// CRMARKS: s8-u2-cr-temp-situations=3
// CRMARKS: s8-u2-cr-raise-ship=3
// CRMARKS: s8-u2-cr-mass-weight=3
// CRMARKS: s8-u2-cr-piggyback=3
// CRMARKS: s8-u2-cr-pressure-crate=3
// CRMARKS: s8-u2-cr-cleaning-claim=4
// CRMARKS: s8-u2-cr-underlying=3
// CRMARKS: s8-u2-cr-car-lift=3
// CRMARKS: s8-u2-cr-design-viscosity=4
// CRMARKS: s8-u2-cr-data-infer=3
// CRMARKS: s8-u2-cr-displacement-calc=3
// Science 8 Unit 2 bank: Fluids (SC8.4.1 to SC8.6.10), built
// Nov 15, 2026 to the Fluids authoring spec. All entries are
// original, mined for type from the harvested teacher tests and
// worksheets, the MHR ExamView chapters 7 to 9 and the core
// laboratories, and rewritten throughout (mine-and-rewrite).
// Source defects recorded in the Fluids catalogue were dropped,
// not carried: the pressure item keyed in kilopascals for a
// pascal value, and the gas-viscosity item whose key the guide's
// liquid-focused treatment cannot carry.
// Guide discipline: viscosity factors are temperature,
// concentration and attraction between particles only; cohesion
// and adhesion situations are described, never keyed by those
// terms; Archimedes' principle is keyed as the weight of the
// fluid displaced.
// CORE residue: SC8.6.5 entries assess variable identification
// and investigation design; they do not assess carrying out the
// procedure. SC8.6.7 carries one entry on accurate instrument
// reading; handling is classroom assessment. SC8.6.8 entries
// assess the displacement method's steps, error judgement and
// calculation; the bench procedure itself is not assessed.
// Near-duplicate pair: SC8.6.3 (a first discrepancy in flow lab
// data) and SC8.6.9 (competing explanations for a density
// discrepancy) are recorded, not merged.

function s8n(v) {
  var s = (Math.round(v * 100) / 100).toString();
  return s;
}
function s8dis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var cv = Math.round(cand[i] * 100) / 100;
    if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv);
  }
  return out;
}

/* ---------- SC8.4.1 Viscosity ---------- */

E("s8-u2-viscosity-def", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    return mcq("What is viscosity?",
      "A liquid's resistance to flow, caused by friction between its particles as they move past one another",
      ["A liquid's resistance to being compressed into a smaller volume",
       "The speed at which a liquid evaporates from an open container",
       "The force with which a liquid pushes up on objects placed in it"],
      "Viscosity is a measure of how much a liquid resists flowing. The resistance comes from friction between the liquid's particles: the greater the friction or rubbing between particles, the higher the viscosity and the more slowly the liquid flows.",
      {});
  }
]), ["Viscosity is about flowing. Which option is about flow and what resists it?", "Thick, slow liquids are the high-viscosity ones."]);

E("s8-u2-flow-ranking", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Four liquids are poured from identical funnels: water, cooking oil, shampoo and molasses. Which pours fastest?", k: "Water", w: ["Cooking oil", "Molasses", "Shampoo"] },
    { q: "Four liquids are timed flowing down a ramp: water, tomato juice, cooking oil and honey. Which has the highest viscosity?", k: "Honey", w: ["Cooking oil", "Tomato juice", "Water"] },
    { q: "A cook compares pancake syrup, milk, dish soap and water. Which has the lowest viscosity?", k: "Water", w: ["Dish soap", "Milk", "Pancake syrup"] },
    { q: "Which list orders the liquids from lowest to highest viscosity?", k: "Water, cooking oil, shampoo, molasses", w: ["Cooking oil, water, molasses, shampoo", "Molasses, shampoo, cooking oil, water", "Water, molasses, shampoo, cooking oil"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Liquids with low viscosity flow freely and fast; liquids with high viscosity flow slowly. Water is thin and fast, oils and shampoo are in between, and honey and molasses are thick and slow. Comparing familiar liquids is the everyday face of viscosity.",
    {});
}, ["Fast flow means low viscosity; slow and thick means high viscosity.", "Water is the thinnest liquid in every list here."]);

E("s8-u2-viscosity-use", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Why must motor oil have the proper viscosity to do its job?", k: "It has to flow well enough to coat moving engine parts and protect them, without being so thin that it fails to cling and lubricate", w: ["It has to evaporate quickly so the engine stays clean", "It has to freeze solid in winter to protect the engine block", "Its viscosity decides the colour of the exhaust"] },
    { q: "A painter complains that a paint is too viscous for the job. What is the problem?", k: "The paint is too thick to spread properly and smoothly", w: ["The paint dries before it can be brushed on", "The paint is too thin and runs down the wall", "The paint has lost its colour in the can"] },
    { q: "Peanut butter kept in the fridge is often too viscous to spread. What does that tell you about the peanut butter in the fridge?", k: "Its viscosity has increased, so it resists flowing and spreading", w: ["Its viscosity has decreased, so it pours off the knife", "Its particles have stopped attracting one another entirely", "Its concentration has dropped to nearly zero"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Many substances need the proper degree of viscosity to perform their intended function: motor oil must flow and cling as a lubricant, paint must spread properly, and peanut butter must spread on bread. Too viscous means too resistant to flow for the job.",
    {});
}, ["Match the complaint to what viscosity does: resistance to flow.", "Too viscous always means too thick and slow for its purpose."]);

E("s8-u2-flow-lab", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    var q = mcq("In Core Lab 7-2B, equal amounts of four liquids flow through the same funnel and are timed. The graph shows the results. Which liquid is the most viscous?",
      "Liquid D",
      ["Liquid A", "Liquid B", "Liquid C"],
      "Flow rate and viscosity run in opposite directions: the longer a liquid takes to flow, the more it resists flowing, so the longest bar, Liquid D, is the most viscous. Liquid A, with the shortest time, is the least viscous.",
      {});
    q.figure = s8HealthSVG([{ name: "Liquid A", value: 4 }, { name: "Liquid B", value: 9 }, { name: "Liquid C", value: 15 }, { name: "Liquid D", value: 26 }], "Flow time", "s", null);
    return q;
  }
]), ["In a flow test, time is the clue: slow flow, high viscosity.", "Find the longest flow time on the graph."]);

E("s8-u2-viscosity-compare", 2, ["SC8.4.1"], 2, "var", varset([
  function () {
    return mcq("Two liquids are described. Liquid P pours like thin cream and coats a spoon evenly. Liquid Q drips slowly off the spoon in a thick ribbon. Which comparison is correct?",
      "Liquid Q has the higher viscosity, because it flows more slowly and resists moving",
      ["Liquid P has the higher viscosity, because it coats the spoon evenly",
       "Both have the same viscosity, because both are liquids",
       "Viscosity cannot be compared without knowing their densities"],
      "Viscosity is compared by flow behaviour. Liquid Q flows slowly and thickly, so it resists flow more: higher viscosity. Liquid P flows readily: lower viscosity. Density is a different property and does not settle a viscosity comparison.",
      {});
  }
]), ["Compare how each liquid moves, nothing else.", "Slow and thick is the high-viscosity signature."]);

/* ---------- SC8.4.2 Factors that modify viscosity ---------- */

E("s8-u2-factors", 2, ["SC8.4.2"], 1, "gen", function () {
  var cases = [
    { q: "Honey kept in a cold pantry pours slowly, but the same honey warmed in a bowl of hot water pours easily. Which factor changed the honey's viscosity?", k: "Temperature", w: ["Concentration", "Strength of attraction added by stirring", "The size of the honey jar"] },
    { q: "A cook stirs extra flour into a sauce and it thickens noticeably. Which factor changed the sauce's viscosity?", k: "Concentration: more substance dissolved or mixed into a given volume", w: ["Temperature", "Strength of attraction between the spoon and the sauce", "The colour of the sauce"] },
    { q: "Droplets of rain cling to a clothesline instead of falling straight off, because the water particles attract the line's material. Which factor is at work in how the water behaves?", k: "The strength of attraction between particles", w: ["Concentration", "Temperature", "The volume of the raindrops"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide names three factors that modify a liquid's viscosity: temperature, concentration, and the strength of attraction between particles (within the liquid itself, and between the liquid and the surface it flows over). Each case here isolates one of the three.",
    {});
}, ["The guide's factor list has three entries. Which one did the case change?", "Warmed or cooled means temperature; more dissolved substance means concentration."]);

E("s8-u2-heating-honey", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("Using the particle theory, why does heating honey make it flow faster?",
      "Heated particles move faster and farther apart, so there is less friction between them and their attraction weakens, lowering the viscosity",
      ["Heated particles move slower and pack closer together, so the honey slides as one solid sheet",
       "Heating adds more particles to the honey, raising its concentration and lowering its viscosity",
       "Heating destroys the particles' attraction completely, so the honey becomes a gas"],
      "The particle theory explains it in three steps: particles are always in motion, heating gives them more energy so they move faster and farther apart, and with more space between them there is less friction and a weaker pull between particles. Less internal friction means lower viscosity, so warmed honey flows faster.",
      {});
  }
]), ["Work through the particles: energy, spacing, friction, then viscosity.", "Faster, farther apart, less friction: viscosity falls."]);

E("s8-u2-concentration", 2, ["SC8.4.2"], 3, "var", varset([
  function () {
    return mcq("A dairy lists skim milk, 1 percent milk, 2 percent milk, whole milk and cream in order of increasing fat concentration. A student predicts their viscosities will follow the same order. Is the prediction sound, and why?",
      "Yes: higher concentration means more particles in a given volume, which raises the friction between particles and so raises viscosity",
      ["Yes, but only because cream is a different colour from skim milk",
       "No: concentration affects only gases, never liquids",
       "No: higher concentration always lowers a liquid's viscosity"],
      "Concentration is the amount of substance in a given volume. More particles crowded into the same space means more rubbing and friction as the liquid flows, which is higher viscosity. The dairy's order of concentration is therefore also the expected order of viscosity, with cream the most viscous.",
      {});
  }
]), ["Concentration means particles per volume. More particles in the same space means what for friction?", "The prediction stands or falls on the friction link."]);

E("s8-u2-cr-molasses", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("People say a slow worker moves 'like cold molasses in winter.' Using the particle theory, explain the science inside that expression, and explain why molasses for pancakes is better stored in the cupboard than in the refrigerator. (3 marks)",
      ["cold particles move slower and stay closer, raising friction and viscosity", "cold molasses therefore flows very slowly", "cupboard storage keeps it warmer and less viscous for pouring"],
      "<b>Model answer:</b> Molasses is already a viscous liquid. When it is cold, its particles have little energy, move slowly and stay close together, so friction between the particles is high and the attraction between them holds strongly: its viscosity rises further and it barely flows, which is the picture the expression uses. In a refrigerator the molasses stays cold and highly viscous, so it pours and spreads badly on pancakes. Stored in the warmer cupboard, its particles move faster and farther apart, friction drops, and the molasses flows as intended.<br><br><b>Marking points:</b> 1 mark for the particle behaviour when cold (slower, closer, more friction). 1 mark for the link from that behaviour to higher viscosity and very slow flow. 1 mark for the storage conclusion drawn from the same reasoning.",
      {});
  }
]), ["One idea explains both halves: what cold does to particles.", "Cold, slow particles, high friction, high viscosity. Then apply it to the cupboard."]);

/* ---------- SC8.4.3 Mass, volume and density ---------- */

E("s8-u2-definitions", 2, ["SC8.4.3"], 1, "var", varset([
  function () {
    return mcq("Which set of definitions is correct?",
      "Mass is the amount of matter in an object, volume is the amount of space it takes up, and density is its mass per unit volume",
      ["Mass is the force of gravity on an object, volume is its weight, and density is its mass per unit volume",
       "Mass is the amount of space in an object, volume is the amount of matter, and density is its volume per unit mass",
       "Mass, volume and density are three names for the same property"],
      "The three quantities build on each other. Mass measures the amount of matter, volume measures the space taken up, and density combines them as the mass-to-volume ratio, the mass in each unit of volume.",
      {});
  }
]), ["Density is the ratio of the other two. Which two, in which order?", "Mass per unit volume: grams in each millilitre or cubic centimetre."]);

E("s8-u2-states-density", 2, ["SC8.4.3"], 1, "gen", function () {
  var cases = [
    { q: "The same substance is compared as a solid, a liquid and a gas. Using the particle theory, which statement about density is generally correct?", k: "The solid is generally the densest state, because its particles are packed closest together, and the gas is the least dense", w: ["The gas is generally the densest state, because its particles move fastest", "All three states have the same density, because the substance is the same", "The liquid is always the densest state, whatever the substance"] },
    { q: "A sealed syringe of air is pushed in, halving the air's volume while its mass stays the same. What happens to the air's density, and why?", k: "It doubles, because the same mass of particles is packed into half the space", w: ["It halves, because density falls whenever volume falls", "It stays the same, because the mass did not change", "It drops to zero, because gases have no density when compressed"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Density follows particle spacing. In a solid the particles are packed closest, in a liquid they sit a little farther apart, and in a gas they are far apart, so in general a substance's solid state is its densest and its gas state its least dense. Squeezing a gas into half the volume with the same mass doubles the crowding, and so doubles the density.",
    {});
}, ["Density is crowding: mass packed into space.", "Closer particles, higher density, for the same substance."]);

E("s8-u2-ratio-constant", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return mcq("A small aluminum sample has a mass of 27 g and a volume of 10 cm3. A much larger aluminum block has a volume of 100 cm3. What should the large block's mass be, and what principle does this show?",
      "270 g: the mass-to-volume ratio of a material is a constant value, so mass scales with volume",
      ["27 g: the mass of a material does not depend on how much of it there is",
       "54 g: mass doubles whenever volume increases at all",
       "2700 g: mass grows with the square of the volume"],
      "The small sample gives aluminum's density: 27 g / 10 cm3 = 2.7 g/cm3. Density is a constant ratio for a material, so the large block's mass is 2.7 x 100 = 270 g. A bigger piece has proportionally more mass, never the same mass and never a squared amount.",
      {});
  }
]), ["Find the ratio from the small sample first, then apply it to the large volume.", "Constant ratio means simple proportion."]);

E("s8-u2-cr-layers", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return textq("A student carefully pours three liquids into one test tube: glycerol (density 1.26 g/mL), water (1.00 g/mL) and machine oil (0.90 g/mL). They settle into layers instead of mixing evenly. State the order of the layers from bottom to top and explain it using density and the particle theory. (3 marks)",
      ["glycerol on the bottom, water in the middle, oil on top", "denser liquids sink below less dense ones", "particle crowding explanation"],
      "<b>Model answer:</b> From bottom to top the order is glycerol, then water, then machine oil. Liquids that do not mix settle by density: the liquid whose particles pack the most mass into each millilitre sinks below the others. Glycerol, at 1.26 g/mL, has the most mass in each unit volume, so it takes the bottom; water, at 1.00 g/mL, settles above it; and machine oil, at 0.90 g/mL, with the least mass per unit volume, floats on top.<br><br><b>Marking points:</b> 1 mark for the correct order, bottom to top. 1 mark for the settling rule (greater density sinks). 1 mark for the particle or mass-per-volume explanation tied to the given values.",
      {});
  }
]), ["Sort the three densities first; the tube sorts itself the same way.", "Bottom layer is the greatest mass in each millilitre."]);

/* ---------- SC8.4.4 Density, quantitatively ---------- */

E("s8-u2-calc-density", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.0, 2.5, 4.0, 5.0]);
  var V = pick([20, 25, 40, 50, 80, 100]);
  var m = Math.round(D * V * 100) / 100;
  var unit = pick(["g/mL", "g/cm3"]);
  var dis = s8dis(D, [V / m, D * 2, D / 2, D + 1, m / (V + 10)]);
  return mcq("A sample of a substance has a mass of " + s8n(m) + " g and a volume of " + V + (unit === "g/mL" ? " mL" : " cm3") + ". What is its density?",
    s8n(D) + " " + unit,
    dis.map(function (d) { return s8n(d) + " " + unit; }),
    "Density is mass divided by volume: D = m/V = " + s8n(m) + " g / " + V + " = " + s8n(D) + " " + unit + ". The units carry the meaning: grams in each millilitre (or cubic centimetre) of the substance.",
    {});
}, ["Density = mass / volume. Divide, and keep the unit with the answer.", "Watch for the inverted division among the options."]);

E("s8-u2-calc-mass", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.5]);
  var V = pick([20, 40, 50, 100, 200]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(m, [m * 2, m / 2, D + V, m + 20, V / D]);
  return mcq("A liquid has a density of " + s8n(D) + " g/mL. What is the mass of " + V + " mL of this liquid?",
    s8n(m) + " g",
    dis.map(function (d) { return s8n(d) + " g"; }),
    "Rearrange the density formula: m = D x V = " + s8n(D) + " g/mL x " + V + " mL = " + s8n(m) + " g. Each millilitre carries " + s8n(D) + " g, and there are " + V + " of them.",
    {});
}, ["Mass = density x volume. Each millilitre contributes the density's worth of grams.", "Multiply, do not divide: the mass of 100 mL should exceed the density number."]);

E("s8-u2-calc-volume", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 5.0]);
  var V = pick([20, 25, 40, 50, 80]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(V, [m * D, V * 2, V / 2, m - D, m / (D + 1)]);
  return mcq("A solid piece of metal has a mass of " + s8n(m) + " g and a density of " + s8n(D) + " g/cm3. What is its volume?",
    s8n(V) + " cm3",
    dis.map(function (d) { return s8n(d) + " cm3"; }),
    "Rearrange the density formula: V = m/D = " + s8n(m) + " g / " + s8n(D) + " g/cm3 = " + s8n(V) + " cm3. The volume counts how many density-sized units of mass the piece contains.",
    {});
}, ["Volume = mass / density.", "Check the size: a denser material packs the same mass into less volume."]);

E("s8-u2-identify-substance", 2, ["SC8.4.4"], 3, "var", varset([
  function () {
    var q = mcq("A student measures a liquid sample: mass 63 g, volume 50 mL. Using the density table, which substance is the sample?",
      "Glycerol",
      ["Ethyl alcohol", "Machine oil", "Seawater"],
      "First calculate: D = m/V = 63 g / 50 mL = 1.26 g/mL. Then match against the table: glycerol is listed at 1.26 g/mL. The table is used after the calculation, not instead of it.",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("A metal sample has a mass of 135 g and a volume of 50 cm3. Using the density table, which substance is the sample?",
      "Aluminum",
      ["Iron", "Lead", "Salt"],
      "D = m/V = 135 g / 50 cm3 = 2.70 g/cm3. The table lists aluminum at 2.70 g/cm3, well below iron (7.87) and lead (11.34).",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("A liquid sample has a mass of 39.5 g and a volume of 50 mL. Using the density table, which substance is the sample?",
      "Ethyl alcohol",
      ["Machine oil", "Seawater", "Water"],
      "D = m/V = 39.5 g / 50 mL = 0.79 g/mL. The table lists ethyl alcohol at 0.79 g/mL, less dense than water, as an alcohol should be.",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  }
]), ["Two steps: calculate the density, then find it in the table.", "The table holds the answers, but only after your division."]);

E("s8-u2-displacement-calc", 2, ["SC8.4.4"], 2, "gen", function () {
  var Vi = pick([50, 100, 200]);
  var rise = pick([12, 15, 20, 25, 30]);
  var D = pick([1.2, 1.5, 2.0, 2.5, 3.0]);
  var m = Math.round(D * rise * 100) / 100;
  var dis = s8dis(D, [m / Vi, m / (Vi + rise), D * 2, D / 2]);
  return mcq("A graduated cylinder holds " + Vi + " mL of water. A stone is lowered in and the level rises to " + (Vi + rise) + " mL. The stone's mass is " + s8n(m) + " g. What is the stone's density?",
    s8n(D) + " g/cm3",
    dis.map(function (d) { return s8n(d) + " g/cm3"; }),
    "The stone's volume is the displaced water: " + (Vi + rise) + " mL - " + Vi + " mL = " + rise + " mL, and 1 mL = 1 cm3. Then D = m/V = " + s8n(m) + " g / " + rise + " cm3 = " + s8n(D) + " g/cm3. The starting level is not the stone's volume; the rise is.",
    {});
}, ["The rise in level is the volume. Subtract before you divide.", "Displacement gives volume first; density comes second."]);

E("s8-u2-cr-density-block", 2, ["SC8.4.4"], 2, "var", varset([
  function () {
    return textq("A rectangular block measures 20 cm by 10 cm by 5 cm and has a mass of 2700 g. (a) Calculate the block's volume. (b) Calculate its density. (c) State, with a reason, whether the block would float or sink in water (density 1.00 g/cm3). (3 marks)",
      ["the volume is 1000 cm3 from the three dimensions multiplied", "the density is 2.7 g/cm3 from mass divided by volume", "it sinks because its density is greater than the density of water"],
      "<b>Model answer:</b> (a) V = l x w x h = 20 cm x 10 cm x 5 cm = 1000 cm3. (b) D = m/V = 2700 g / 1000 cm3 = 2.7 g/cm3. (c) The block would sink: its density, 2.7 g/cm3, is greater than the density of water, 1.00 g/cm3, so its weight overcomes the buoyant force the water can provide.<br><br><b>Marking points:</b> 1 mark for the volume from the dimensions. 1 mark for the density calculation with units. 1 mark for the sink judgement tied to the density comparison.",
      {});
  }
]), ["Three steps in order: dimensions to volume, mass and volume to density, density to a float or sink call.", "Water's density, 1.00, is the comparison standard for part (c)."]);

/* ---------- SC8.4.5 Temperature and density ---------- */

E("s8-u2-temp-density", 2, ["SC8.4.5"], 1, "gen", function () {
  var cases = [
    { q: "An air-filled balloon is measured, placed in a freezer, and measured again: its circumference is smaller. What happened to the density of the air inside?", k: "It increased, because the same mass of air now occupies a smaller volume", w: ["It decreased, because cold air always weighs less", "It stayed the same, because the mass did not change", "It dropped to zero, because the air contracted"] },
    { q: "The alcohol in a thermometer rises up the tube on a warm day. Which statement explains this using volume and density?", k: "The warmed alcohol expands, taking more volume, so its density falls and it rises in the tube", w: ["The warmed alcohol contracts, so its density rises and pushes it up the tube", "The glass tube shrinks in the heat, squeezing the alcohol upward", "The alcohol's mass increases as it warms, forcing it upward"] },
    { q: "Power lines are strung loosely because they sag more in summer than in winter. What does the sagging show?", k: "The warmed metal expands, its volume increases, and its density decreases", w: ["The warmed metal contracts and grows denser", "The lines gain mass in the summer heat", "Gravity grows stronger in summer"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Temperature changes density through volume. Warming a substance makes its particles spread out: the same mass occupies more volume, so density falls. Cooling reverses it: volume shrinks and density rises. The balloon, the thermometer and the power lines are the guide's everyday demonstrations of the same relationship.",
    {});
}, ["Hold the mass fixed and follow the volume: density moves the opposite way.", "Expand means less dense; contract means more dense."]);

E("s8-u2-ice-exception", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return mcq("Most substances are denser as solids than as liquids, but ice floats on water. Which statement explains the exception?",
      "When water freezes it expands because of its molecular structure, so ice takes more volume for the same mass and its density drops below liquid water's",
      ["Ice floats because it traps air bubbles, and frozen water without bubbles would sink",
       "Ice is colder than water, and cold objects always float",
       "Water is the exception because its liquid state is denser than every other liquid"],
      "Water breaks the general rule. As it freezes, its molecules arrange into a structure with more space between them: the volume increases while the mass stays the same, so the density decreases. Ice, at about 0.92 g/cm3 in round terms used in class, is less dense than liquid water and floats. The guide names water as the exception explicitly.",
      {});
  }
]), ["The exception is about spacing: freezing water spreads its molecules out.", "More volume, same mass, lower density: floating follows."]);

E("s8-u2-hot-air", 2, ["SC8.4.5"], 1, "var", varset([
  function () {
    return mcq("Why does the air inside a hot air balloon become less dense when it is heated?",
      "The heated particles move faster and spread farther apart, so each unit of volume holds less mass",
      ["Heating removes particles from the balloon through the opening",
       "The heated particles shrink, leaving empty gaps with no mass",
       "The fabric of the balloon stretches and adds volume with no change inside"],
      "Heating gives the air's particles more energy; they move faster and spread farther apart. The balloon's volume then holds fewer particles, less mass in each unit of volume, which is lower density. That lower density is what lets the balloon's air be buoyed up by the cooler, denser air outside.",
      {});
  }
]), ["Same story as every temperature case: spacing decides density.", "Spread out particles mean less mass in each unit of volume."]);

E("s8-u2-cr-temp-situations", 2, ["SC8.4.5"], 3, "var", varset([
  function () {
    return textq("Use the relationship between temperature, volume and density to explain both of these situations: (a) vinyl siding installed in cold weather must be fitted with small spaces between the pieces; (b) drivers are warned not to over-inflate car tires in hot summer months. (3 marks)",
      ["siding expands as it warms, so gaps leave room", "heated air in tires expands and pressure rises", "both follow from particles spreading as temperature rises"],
      "<b>Model answer:</b> Both situations come from the same behaviour: as a substance warms, its particles move faster and spread farther apart, so its volume increases and its density decreases. (a) Siding fitted tightly in the cold would expand as the weather warms and, with nowhere to go, would buckle; the small spaces leave room for that expansion. (b) The air sealed in a tire expands as it heats in summer, and since the tire's volume can grow only slightly, the expanding air raises the pressure inside; a tire filled to its limit in the cool morning can be pushed past a safe pressure by the afternoon's heat.<br><br><b>Marking points:</b> 1 mark for the shared particle explanation (warming spreads particles, volume rises, density falls). 1 mark for applying it to the siding's expansion room. 1 mark for applying it to the tire air's expansion raising pressure.",
      {});
  }
]), ["One principle, two applications. State the principle once, then use it twice.", "Expansion is the key word in both situations."]);

/* ---------- SC8.4.6 Density changes in everyday life ---------- */

E("s8-u2-seasoning", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("Boat builders dry (season) wood before using it, and dried wood floats higher than freshly cut wood. Why does drying change the wood this way?",
      "Drying removes water from the wood, so its mass falls while its volume stays nearly the same, lowering its density",
      ["Drying adds air to the wood, and the added air increases its mass",
       "Drying heats the wood permanently, keeping its particles spread out",
       "Drying changes the wood's colour, which changes how water supports it"],
      "Seasoning is a deliberate density change. Fresh wood holds a great deal of water; as it dries, that water leaves, the mass drops, the volume barely changes, and the density falls. Lower density means the wood floats higher, one reason builders season wood for watercraft.",
      {});
  }
]), ["What leaves the wood during drying, and which density ingredient does that change?", "Mass down, volume steady: density down."]);

E("s8-u2-density-life", 2, ["SC8.4.6"], 1, "gen", function () {
  var cases = [
    { q: "A submarine dives by opening its ballast tanks to the sea. What density change makes the dive happen?", k: "Water entering the tanks raises the submarine's average density above the seawater's, so it sinks", w: ["Air entering the tanks lowers the average density, so it sinks", "The tanks heat the seawater, lowering its density around the submarine", "The submarine's volume shrinks until it is denser than the water"] },
    { q: "A fish rises from deep water toward the surface by inflating its swim bladder with gas. What has the fish changed?", k: "Its volume increased while its mass barely changed, lowering its average density", w: ["Its mass increased, raising its average density", "The water's density around it decreased", "Its weight increased beyond the buoyant force"] },
    { q: "Swimmers find it easier to float in the ocean than in a freshwater pond. What density fact explains this?", k: "Seawater is denser than fresh water, so it provides a greater buoyant effect for the same swimmer", w: ["Seawater is less dense than fresh water, so swimmers sink less", "The ocean is deeper, and depth is what holds swimmers up", "Salt makes the swimmer's body less dense on contact"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Densities change naturally and by design. A submarine floods its ballast tanks to raise its average density and dive; a fish inflates its swim bladder to grow its volume and lower its average density and rise; and a swimmer floats more easily in denser seawater than in fresh water. In each case the comparison of densities decides the motion.",
    {});
}, ["Ask whose density changes, and in which direction.", "Sinking needs greater density than the fluid; rising needs less."]);

E("s8-u2-cr-raise-ship", 2, ["SC8.4.6"], 3, "var", varset([
  function () {
    return textq("A fishing boat has sunk in a harbour and rests on the bottom. Salvage crews attach large sealed barrels to the hull and pump them full of air, and the boat slowly rises. Explain how this works, using average density and buoyancy. (3 marks)",
      ["the barrels add a large volume with little mass", "the boat and barrels together have an average density below the water's", "so the buoyant force overcomes the total weight"],
      "<b>Model answer:</b> On the bottom, the boat's average density is greater than the water's, so its weight beats the buoyant force. The sealed barrels change the combination: they add a great deal of volume while adding very little mass, because the air inside them has a very low density. The average density of boat plus barrels falls below the density of the water, so the buoyant force on the combined volume becomes greater than the total weight, and the boat rises. It is the same average density principle that lets a steel ship float.<br><br><b>Marking points:</b> 1 mark for the barrels adding volume with little mass. 1 mark for the average density of the combination falling below the water's density. 1 mark for the buoyant force then exceeding the weight, so the boat rises.",
      {});
  }
]), ["Nothing about the boat itself changes. What does the combination of boat plus barrels change?", "Average density is the whole game: volume up, mass barely up."]);

/* ---------- SC8.4.7 Balanced and unbalanced forces ---------- */

E("s8-u2-forces", 2, ["SC8.4.7"], 1, "gen", function () {
  var cases = [
    { q: "A wagon sits still on a slope because the pull down the slope is exactly matched by friction holding it. How are the forces on the wagon described?", k: "Balanced forces: equal and opposite, so the wagon does not accelerate", w: ["Unbalanced forces: the wagon is on a slope, so gravity must be winning", "Balanced forces: both forces point in the same direction", "No forces act on a wagon that is not moving"] },
    { q: "A dropped stone speeds up as it falls through the air toward the ground. How are the forces on the stone described?", k: "Unbalanced forces: gravity's pull is greater than the air's resistance, so the stone accelerates", w: ["Balanced forces: falling objects always have balanced forces", "Unbalanced forces: the air's resistance is greater than gravity's pull", "No forces act once the stone leaves the hand"] },
    { q: "A boat floats motionless at a dock, neither rising nor sinking. How are the forces on the boat described?", k: "Balanced forces: its weight and the buoyant force are equal and opposite", w: ["Unbalanced forces: floating always means buoyancy is greater", "Balanced forces: no forces act on anything floating", "Unbalanced forces: its weight is greater, but slowly"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Balanced forces are equal and opposite: the object stays at rest or keeps its motion unchanged. Unbalanced forces are unequal, and the object accelerates in the direction of the greater force. A still wagon, a speeding stone and a floating boat cover the three patterns.",
    {});
}, ["Ask two questions: are the forces equal, and is the motion changing?", "Equal and opposite means balanced, whatever the setting."]);

E("s8-u2-force-figure", 2, ["SC8.4.7"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a rock in water with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the rock's weight. What do the arrows tell you, and what happens to the rock?",
      "The weight is greater than the buoyant force, so the forces are unbalanced and the rock sinks",
      ["The buoyant force is greater than the weight, so the rock rises",
       "The forces are balanced, so the rock floats at that depth",
       "The arrows show the rock's mass and volume, not its forces"],
      "Arrow length stands for force size. The downward arrow, the weight, is longer than the upward buoyant arrow, so the forces are unbalanced with weight winning: the rock sinks. That is the guide's rule for sinking.",
      {});
    q.figure = s8ForceSVG("sink");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a boat at the water's surface with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the boat's weight. What do the arrows tell you?",
      "The forces are balanced and equal, so the boat floats without rising or sinking",
      ["The weight is greater, so the boat is about to sink",
       "The buoyant force is greater, so the boat is rising out of the water",
       "Equal arrows mean no forces act on the boat"],
      "The two arrows are the same length, so weight and buoyant force are equal and opposite: balanced forces. A floating object at rest is exactly that balance, the guide's rule for floating.",
      {});
    q.figure = s8ForceSVG("float");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a balloon under water with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the balloon's weight. What happens when the balloon is released, and why?",
      "It rises, because the buoyant force is greater than its weight, an unbalanced pair of forces",
      ["It sinks, because its weight is greater than the buoyant force",
       "It stays where it is, because the forces are balanced",
       "It moves sideways, because both arrows point vertically"],
      "The upward arrow is much longer: the buoyant force on the air-filled balloon far exceeds its small weight. Unbalanced forces accelerate the object toward the greater force, so the balloon rises, the guide's third pattern beside sinking and floating.",
      {});
    q.figure = s8ForceSVG("rise");
    return q;
  }
]), ["Arrow length is force size. Compare the two lengths before anything else.", "Longer arrow wins; equal arrows balance."]);

E("s8-u2-newton", 2, ["SC8.4.7"], 1, "var", varset([
  function () {
    return mcq("Which statement about force and its unit is correct?",
      "Force is measured in newtons; on Earth, a mass of about 100 g exerts a force of about 1 newton through gravity",
      ["Force is measured in kilograms; a mass of 1 kg exerts 1 newton",
       "Force is measured in pascals; 1 newton equals 1 pascal",
       "Force and mass are measured in the same unit, the gram"],
      "The newton is the unit of force. The guide's practical anchor: on Earth, roughly 100 grams of mass weighs about 1 newton. Kilograms and grams measure mass, and pascals measure pressure; keeping the units separate is part of keeping the ideas separate.",
      {});
  }
]), ["Force has its own unit. Which one, and what is the Earth anchor for its size?", "Newtons for force; grams and kilograms for mass."]);

/* ---------- SC8.4.8 Mass and weight ---------- */

E("s8-u2-mass-weight", 2, ["SC8.4.8"], 1, "gen", function () {
  var cases = [
    { q: "Which quantity describes the amount of matter in an object, and what is it measured with?", k: "Mass, measured with a balance in grams or kilograms", w: ["Mass, measured with a force meter in newtons", "Weight, measured with a balance in grams or kilograms", "Weight, measured with a force meter in grams"] },
    { q: "Which quantity describes the force of gravity pulling on an object, and what is it measured with?", k: "Weight, measured with a force meter (spring scale) in newtons", w: ["Mass, measured with a force meter in newtons", "Weight, measured with a balance in kilograms", "Mass, measured with a balance in newtons"] },
    { q: "A brick is weighed on Earth, then lowered into a tank of water, where its measured weight drops. What happened to its mass?", k: "Its mass stayed the same; only the measured weight changed, because the water's buoyant force supports part of it", w: ["Its mass decreased by the amount of water it displaced", "Its mass increased, because it absorbed water", "Its mass became zero while it was submerged"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Mass is the amount of matter in an object; it is measured with a balance and does not change when the object is moved or submerged. Weight is the force of gravity on that mass; it is measured with a force meter in newtons and changes when gravity changes or when another force, such as buoyancy, shares the load.",
    {});
}, ["Amount of matter: mass and balance. Gravity's pull: weight and force meter.", "Submerging changes the pull you measure, never the matter in the brick."]);

E("s8-u2-moon-suitcase", 2, ["SC8.4.8"], 3, "var", varset([
  function () {
    return mcq("An astronaut's suitcase is packed to the mission limit of 20 kg on Earth. On the Moon's space station, the astronaut finds the suitcase weighs noticeably less, and worries something was removed. A crewmate says nothing is missing. Who is right, and why?",
      "The crewmate: the suitcase's mass is still 20 kg because its matter is unchanged; its weight dropped because the Moon's gravity is weaker than Earth's",
      ["The astronaut: a lower weight always means mass was lost on the journey",
       "The crewmate, but because the suitcase's mass dropped along with its weight",
       "Neither: weight cannot change unless the suitcase is opened"],
      "Mass and weight part company exactly here. The suitcase holds the same amount of matter on the Moon, so its mass is still 20 kg. Weight is gravity's force on that mass, and the Moon's gravitational pull is weaker than Earth's, so the same mass weighs less. The guide uses this exact scenario to separate the two ideas.",
      {});
  }
]), ["What travels unchanged with the suitcase, and what depends on where it is?", "Matter is carried; gravity is local."]);

E("s8-u2-cr-mass-weight", 2, ["SC8.4.8"], 2, "var", varset([
  function () {
    return textq("A classmate insists that mass and weight are the same thing because 'my mass is 50 kilograms, so my weight is 50 too.' Correct the classmate: describe the difference between mass and weight, using the terms force meter, balance scale and gravity, and give the correct way to state each of the classmate's two quantities. (3 marks)",
      ["mass is the amount of matter, measured with a balance scale in kilograms", "weight is the force of gravity on the mass, measured with a force meter in newtons", "weight changes if gravity changes while mass does not"],
      "<b>Model answer:</b> Mass and weight are different quantities. Mass is the amount of matter in an object; it is measured with a balance scale and stated in grams or kilograms, so the classmate's mass is indeed 50 kg, and it stays 50 kg wherever they go. Weight is the force of gravity pulling on that mass; it is measured with a force meter (a spring scale) and stated in newtons. On Earth the classmate's weight is about 500 N (roughly 10 N for each kilogram, using the guide's anchor of about 1 N per 100 g). On the Moon the same 50 kg mass would weigh far less, because the Moon's gravity is weaker, while the mass would be unchanged.<br><br><b>Marking points:</b> 1 mark for mass defined as amount of matter, measured with a balance in kilograms. 1 mark for weight defined as gravity's force, measured with a force meter in newtons. 1 mark for the change test: weight varies with gravity, mass does not.",
      {});
  }
]), ["The classmate has the right number on the wrong quantity. Separate the two ideas, then restate both.", "One is measured with a balance, the other with a force meter."]);

/* ---------- SC8.4.9 Buoyancy ---------- */

E("s8-u2-buoyancy-rule", 2, ["SC8.4.9"], 1, "var", varset([
  function () {
    return mcq("An object is placed fully under water and released. Which rule decides whether it floats up or sinks?",
      "It floats if the buoyant force on it is greater than its weight, and sinks if its weight is greater than the buoyant force",
      ["It floats if it is lighter than the container holding the water",
       "It sinks if it is made of a solid material, whatever the forces",
       "It floats if its mass is less than the water's temperature in kilograms"],
      "Buoyancy is a contest of two forces. The buoyant force pushes up; the object's weight pulls down. Buoyant force greater means the object rises and floats; weight greater means it sinks; equal forces mean it hovers or floats at rest. The material alone decides nothing; the forces decide.",
      {});
  }
]), ["Two forces, one winner. Name both forces before choosing.", "Up push against down pull: that is the whole rule."]);

E("s8-u2-archimedes", 2, ["SC8.4.9"], 2, "var", varset([
  function () {
    return mcq("What does Archimedes' principle state?",
      "The buoyant force acting on an object equals the weight of the fluid displaced by the object",
      ["The buoyant force acting on an object equals the volume of the fluid displaced by the object",
       "The buoyant force acting on an object equals the weight of the object itself",
       "The buoyant force acting on an object equals the force of gravity acting on the fluid in the container"],
      "Archimedes' principle ties buoyancy to displacement: push water aside, and the water pushes back with a force equal to the weight of the water pushed aside. It is the weight of the displaced fluid that matters, not its volume alone: the same volume of a denser fluid weighs more and buoys more.",
      {});
  }
]), ["The principle is an equality. Buoyant force equals the weight of what?", "Weight of the displaced fluid: force equals force."]);

E("s8-u2-balls", 2, ["SC8.4.9"], 1, "gen", function () {
  var cases = [
    { q: "Three balls of the same size, made of styrofoam, rubber and metal, are pushed under water and released at the same moment. Which description of what happens is correct?", k: "The styrofoam ball shoots up and floats high, the rubber ball rises and floats lower, and the metal ball sinks", w: ["All three float at the same level, because they are the same size", "The metal ball floats highest, because it is the heaviest", "The rubber ball sinks, because rubber absorbs water instantly"] },
    { q: "A beach ball is very hard to hold under the water at a pool, and it leaps out when released. Which statement explains the beach ball?", k: "Its buoyant force when fully immersed is much greater than its small weight, so the unbalanced force drives it up", w: ["Its weight is greater than the buoyant force, so it escapes upward", "The water's pressure cancels its weight entirely, so it has no forces on it", "Air inside the ball is attracted to the air above the pool"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Same size means the same displaced water and roughly the same buoyant force available; the weights differ enormously. Light styrofoam and a beach ball have weights far below that buoyant force and are driven up; dense metal's weight exceeds it and sinks. The comparison of the two forces explains every case.",
    {});
}, ["Same size, same displaced water. What differs from ball to ball?", "Weight is the variable; buoyancy is nearly fixed by size."]);

E("s8-u2-cr-piggyback", 2, ["SC8.4.9"], 3, "var", varset([
  function () {
    return textq("A student finds it much easier to give a younger brother a piggyback ride in a swimming pool than in the living room, even though the brother's mass is the same in both places. Explain the difference using buoyant forces. (3 marks)",
      ["in the pool the water exerts a buoyant force on the brother", "the buoyant force acts opposite to his weight, so the student supports only the difference", "his mass and true weight are unchanged; the apparent load is reduced"],
      "<b>Model answer:</b> The brother's mass, and so his true weight, is the same in the pool as in the living room. The difference is a second force. Submerged in the pool, the water exerts a buoyant force on the brother, equal to the weight of the water his body displaces, and that force pushes upward, opposite to his weight. The student on the bottom only has to support what is left: weight minus buoyant force. In the living room there is no buoyant force worth naming, so the student carries the full weight.<br><br><b>Marking points:</b> 1 mark for the buoyant force acting on the submerged brother. 1 mark for it acting opposite to his weight, reducing the load the student supports. 1 mark for stating that his mass and true weight are unchanged.",
      {});
  }
]), ["Same brother, same mass. What extra force exists in the pool that does not exist in the living room?", "The water helps carry him. Say how, in force terms."]);

/* ---------- SC8.4.10 Pressure, quantitatively ---------- */

E("s8-u2-calc-pressure", 2, ["SC8.4.10"], 2, "gen", function () {
  var pairs = [[200, 4], [100, 0.5], [500, 10], [1000, 20], [250, 5], [400, 2], [2000, 0.5], [600, 20], [100, 4], [2000, 10], [150, 0.25], [900, 30]];
  var pr = pick(pairs);
  var F = pr[0], A = pr[1], P = F / A;
  var dis = s8dis(P, [F * A, P * 2, P / 2, F - A, F + A]);
  return mcq("A force of " + F + " N is applied over an area of " + s8n(A) + " m2. What pressure is exerted?",
    s8n(P) + " Pa",
    dis.map(function (d) { return s8n(d) + " Pa"; }),
    "Pressure is force spread over area: P = F/A = " + F + " N / " + s8n(A) + " m2 = " + s8n(P) + " Pa. One pascal is one newton spread over one square metre, so the unit follows from the calculation.",
    {});
}, ["Pressure = force / area. Divide, and the answer is in pascals.", "Spreading a force over more area lowers the pressure, never raises it."]);

E("s8-u2-calc-force", 2, ["SC8.4.10"], 2, "gen", function () {
  var F1 = pick([10, 20, 25, 40, 50]);
  var ratio = pick([4, 5, 8, 10]);
  var A1 = 5, A2 = A1 * ratio, F2 = F1 * ratio;
  var dis = s8dis(F2, [F1, F2 * 2, F1 + ratio, F2 - F1, F1 * 2]);
  return mcq("In a hydraulic lift, a force of " + F1 + " N is applied to a small piston of area " + A1 + " cm2. The large piston has an area of " + A2 + " cm2. What force does the large piston exert?",
    F2 + " N",
    dis.map(function (d) { return s8n(d) + " N"; }),
    "The pressure is the same throughout the confined liquid: P = F/A = " + F1 + " N / " + A1 + " cm2 = " + (F1 / A1) + " N/cm2. On the large piston, F = P x A = " + (F1 / A1) + " x " + A2 + " = " + F2 + " N. The force is multiplied by the same ratio as the areas, " + ratio + " times, which is the point of a hydraulic lift.",
    {});
}, ["Pressure is shared; force scales with area. Find the pressure first, then apply it to the big piston.", "Area ratio and force ratio are the same number."]);

E("s8-u2-calc-area", 2, ["SC8.4.10"], 3, "gen", function () {
  var pairs = [[200, 50], [1000, 200], [500, 25], [2400, 400], [800, 80], [360, 60], [1500, 300], [720, 90]];
  var pr = pick(pairs);
  var F = pr[0], P = pr[1], A = F / P;
  var dis = s8dis(A, [A * 2, A / 2, F * P / 100, P / F * 100, A + 5]);
  return mcq("A machine part must exert a force of " + F + " N while keeping the pressure on the surface at " + P + " Pa. What contact area is required?",
    s8n(A) + " m2",
    dis.map(function (d) { return s8n(d) + " m2"; }),
    "Rearrange the pressure formula: A = F/P = " + F + " N / " + P + " Pa = " + s8n(A) + " m2. To hold pressure down at a set force, the area must be large enough to spread the force; the division sizes it exactly.",
    {});
}, ["Area = force / pressure. This is the third form of the same formula.", "Check the direction: more allowed pressure would need less area."]);

E("s8-u2-snowshoes", 2, ["SC8.4.10"], 1, "var", varset([
  function () {
    return mcq("A person wearing snowshoes can walk across deep, soft snow without sinking, while the same person in boots sinks at every step. What explains the difference?",
      "The snowshoes spread the person's weight (force) over a much larger area, so the pressure on the snow is much lower",
      ["The snowshoes reduce the person's weight while they are worn",
       "The snowshoes increase the pressure, which packs the snow harder",
       "The snowshoes change the person's mass, so gravity pulls less"],
      "The force is identical in both cases: the person's weight. Pressure is force divided by area, so spreading the same force over the snowshoes' larger area lowers the pressure below what the snow can support without giving way. Boots concentrate the force on a small area and the pressure punches through.",
      {});
  }
]), ["Same person, same weight. Only one quantity in P = F/A changes.", "Bigger area, smaller pressure."]);

E("s8-u2-cr-pressure-crate", 2, ["SC8.4.10"], 2, "var", varset([
  function () {
    return textq("A crate weighs 800 N and rests on a base measuring 2 m by 1 m. (a) Calculate the pressure the crate exerts on the floor. (b) The crate is placed on a wide board that doubles the contact area. State the new pressure and explain, using the pressure relationship, why warehouse workers use such boards under heavy crates on soft ground. (3 marks)",
      ["the base area is 2 m2 and the pressure is 400 Pa", "doubling the contact area halves the pressure to 200 Pa", "lower pressure means the surface is less likely to be damaged or sink"],
      "<b>Model answer:</b> (a) The base area is 2 m x 1 m = 2 m2. P = F/A = 800 N / 2 m2 = 400 Pa. (b) Doubling the contact area to 4 m2 gives P = 800 / 4 = 200 Pa: at the same force, doubling the area halves the pressure. Workers use boards for exactly this reason: the crate's weight is unchanged, but spread over a larger area it presses less on each part of the ground, so soft ground is less likely to give way or be damaged, the same principle as snowshoes.<br><br><b>Marking points:</b> 1 mark for the area and the 400 Pa pressure. 1 mark for the halved pressure, 200 Pa, when the area doubles. 1 mark for the explanation tying lower pressure to protecting the surface at unchanged force.",
      {});
  }
]), ["Part (a) needs the area first. Part (b) is the snowshoe principle with numbers.", "Force stays fixed throughout; only area and pressure move, in opposite directions."]);

/* ---------- SC8.4.11 Pressure, volume and temperature in gases ---------- */

E("s8-u2-gas-laws", 2, ["SC8.4.11"], 1, "gen", function () {
  var cases = [
    { q: "A sealed syringe of air is pushed in, halving the air's volume while its temperature stays the same. What happens to the pressure of the air inside?", k: "It increases, because the particles are crowded into a smaller space and strike the walls more often", w: ["It decreases, because compressed air always loses pressure", "It stays the same, because the amount of air did not change", "It drops to zero until the plunger is released"] },
    { q: "A balloon filled with air is placed in warm sunlight, free to expand, and it grows larger. Its pressure stays about the same. Which relationship does this show?", k: "Increasing a gas's temperature increases its volume when pressure is held constant", w: ["Increasing a gas's temperature decreases its volume when pressure is held constant", "Temperature has no effect on a gas's volume", "The gas's volume grew because its pressure doubled"] },
    { q: "A scuba tank is filled to high pressure at the dive shop. In particle terms, what is true of the air inside compared with air at ordinary pressure?", k: "Far more particles are packed into the same volume, which is why gases, unlike liquids, can be compressed this way", w: ["The particles themselves have shrunk to fit more in", "The air has become a liquid under the pressure", "The tank holds the same number of particles, each under more force"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "For gases, the guide's two relationships are: increasing the pressure on a gas decreases its volume when temperature is held constant, and increasing the temperature increases its volume when pressure is held constant. Both work because gas particles sit far apart with empty space between them, so gases can be compressed in a way liquids cannot.",
    {});
}, ["Keep straight which quantity is held constant in each case.", "Gas particles have space between them: that space is what compression removes."]);

E("s8-u2-compressible", 2, ["SC8.4.11"], 1, "var", varset([
  function () {
    return mcq("Why can gases be compressed into a much smaller volume while liquids hardly compress at all?",
      "Gas particles are far apart with a great deal of empty space between them, while liquid particles are already close together with little space to remove",
      ["Gas particles are smaller than liquid particles",
       "Liquid particles repel one another, while gas particles attract",
       "Gases weigh less than liquids, so pressure affects them more"],
      "Compressibility is about the space between particles. In a gas the particles are widely separated, so pushing them closer removes empty space and shrinks the volume greatly. In a liquid the particles are already nearly touching, so there is almost no space to remove and the volume barely changes: liquids are effectively incompressible, which is why they serve in hydraulic systems.",
      {});
  }
]), ["Picture the particle spacing in each state. Which one has space to give up?", "Far apart compresses; close together does not."]);

E("s8-u2-depth-pressure", 2, ["SC8.4.11"], 2, "var", varset([
  function () {
    return mcq("A tall bottle is filled with water and has three holes punched down one side, at the top, middle and bottom. When the bottle is filled, the bottom jet shoots farthest and the top jet barely trickles. What does this demonstration show about fluid pressure?",
      "Fluid pressure increases with depth, and it pushes in all directions, driving the deepest jet hardest",
      ["Fluid pressure is the same at all depths, and the bottom hole is simply larger",
       "Fluid pressure acts only downward, which is why the bottom jet is strongest",
       "The water at the bottom is denser, and density alone explains the jets"],
      "The weight of the water above presses down through the fluid, so pressure grows with depth: the bottom hole feels the greatest pressure and drives its jet farthest. The jets leave sideways, which also shows that fluid pressure at a point acts in all directions, not only downward.",
      {});
  }
]), ["More water above means more weight pressing down. What should that do to pressure with depth?", "The sideways jets carry the second message: pressure pushes in all directions."]);

/* ---------- SC8.5.1 Personal activities and fluid dynamics ---------- */

E("s8-u2-personal", 2, ["SC8.5.1"], 1, "gen", function () {
  var cases = [
    { q: "A cook finds that pancake batter made too thin runs all over the pan, while batter made too thick sits in lumps. Which fluid property is the cook adjusting?", k: "Viscosity: the batter's resistance to flow", w: ["Density: the batter's mass per unit volume", "Pressure: the force the batter exerts on the pan", "Buoyancy: the force the pan exerts on the batter"] },
    { q: "A mechanic chooses a thinner motor oil for a car that will run through a Newfoundland winter. Which fluid fact is behind the choice?", k: "Oil's viscosity rises as temperature falls, so a thinner grade is needed to keep it flowing in the cold", w: ["Oil's density falls to zero in cold weather unless it is thin", "Cold weather compresses oil, so less of it is needed", "Winter air pressure forces thick oil out of engines"] },
    { q: "A cyclist pumps a tire up hard before a race. Which fluid behaviour is she using?", k: "Air is a compressible fluid, so more particles can be packed into the tire to raise its pressure", w: ["Air is an incompressible fluid, like the liquids in brakes", "Air's viscosity drops when it is pumped", "The tire's density decreases as air is added"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Fluid dynamics runs through ordinary activities: batter must flow at the right rate, motor oil must keep flowing in winter cold (viscosity rises as temperature falls, so winter grades start thinner), and tires work because air compresses. Relating the activity to the fluid property is the indicator's ask.",
    {});
}, ["Name the fluid, then the property the activity depends on.", "Batter and oil are viscosity stories; the tire is a compressibility story."]);

E("s8-u2-winter-oil", 2, ["SC8.5.1"], 3, "var", varset([
  function () {
    return mcq("Two identical engines are filled with the same oil. One runs in a warm garage; the other is parked outside through a January cold snap in St. John's. On a cold start, the outdoor engine's oil circulates poorly and the engine wears faster. Which explanation connects the observation to the fluid science?",
      "Cold raised the oil's viscosity, so it resisted flowing to the moving parts; the oil's particles, moving slowly and staying close, produced more internal friction",
      ["Cold lowered the oil's viscosity until it ran off the parts entirely",
       "Cold compressed the oil into a solid, and solids cannot lubricate",
       "The cold changed the oil's density to zero, so the pump could not lift it"],
      "The observation, the property and the particle explanation line up: falling temperature raises a liquid's viscosity, the thickened oil resists flowing through the engine's passages, and parts that should be coated run nearly dry. It is why winter oil grades exist, and why the choice is a fluid dynamics decision, not a marketing one.",
      {});
  }
]), ["Poor circulation means high resistance to flow. What does cold do to that resistance?", "Trace it fully: temperature, particles, friction, viscosity, circulation."]);

/* ---------- SC8.5.2 Viscosity products and the Cleaning Fluids STSE ---------- */

E("s8-u2-products", 2, ["SC8.5.2"], 1, "gen", function () {
  var cases = [
    { q: "Which product exists in several grades mainly because of our understanding of viscosity?", k: "Motor oil, graded so engines can be matched with an oil that flows properly at their working temperatures", w: ["Window glass, graded by how fast it flows", "Table salt, graded by how thickly it pours when dry", "Bicycle tires, graded by the viscosity of their rubber"] },
    { q: "A shampoo is reformulated so it sits on the hand instead of running off, but still spreads through hair. What understanding guided the reformulation?", k: "Viscosity: adjusting the liquid's resistance to flow so it performs its function", w: ["Buoyancy: adjusting the shampoo's average density", "Pressure: adjusting the force the bottle must withstand", "Density: adjusting the mass in each bottle"] },
    { q: "Ketchup is designed to sit thick in the bottle yet flow when the bottle is shaken and squeezed. Which science understanding is the design built on?", k: "How a liquid's flow behaviour can be engineered for its intended function", w: ["How gases compress inside sealed bottles", "How buoyant forces act on objects in liquids", "How Pascal's law transmits pressure through the bottle"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Understanding viscosity lets manufacturers engineer flow: motor oil comes in grades for different temperatures, shampoos and paints are tuned to spread without running, and foods like ketchup are designed around how they pour. Each product's design starts from the liquid's resistance to flow.",
    {});
}, ["Each product is a flow problem solved on purpose. Which property is being engineered?", "If the product's job is about pouring, spreading or coating, the answer is viscosity."]);

E("s8-u2-cleaning", 2, ["SC8.5.2"], 2, "var", varset([
  function () {
    return mcq("The strand's core STSE studies cleaning fluids. How do soaps and detergents remove grease and dirt that plain water leaves behind?",
      "Their particles surround and lift the grease, breaking it into tiny droplets that stay suspended in the water and rinse away",
      ["They dissolve the surface the dirt sits on, carrying the dirt with it",
       "They raise the water's viscosity until the dirt floats off on its own",
       "They compress the grease until it evaporates"],
      "Water alone beads off grease. Soap and detergent particles have ends that behave differently: one end mixes with water and the other with grease, so they surround grease and dirt, lift them from the surface as tiny suspended droplets, and the rinse water carries them away. That is the science the Cleaning Fluids STSE is built on.",
      {});
  }
]), ["Plain water fails on grease. What do the cleaning particles do that water cannot?", "Surround, lift, suspend, rinse: the four steps."]);

E("s8-u2-cr-cleaning-claim", 2, ["SC8.5.2"], 3, "var", varset([
  function () {
    return textq("An advertisement claims: 'Thicker cleaning fluids clean better, because high viscosity means stronger cleaning.' Evaluate this claim the way the core STSE suggests: state what the claim gets right or wrong about viscosity, and describe a fair test that would settle whether a higher-viscosity cleaner actually cleans better. (4 marks)",
      ["viscosity is resistance to flow, not cleaning strength", "cleaning depends on the detergent action on dirt and grease", "a fair test holds cleaner amount, surface, dirt and scrubbing the same while varying the cleaner", "a measurable result such as cleanliness judged the same way for each"],
      "<b>Model answer:</b> The claim confuses two different properties. Viscosity is a liquid's resistance to flow; it says how thickly a cleaner pours and spreads, not how well its particles lift grease. Cleaning power comes from the detergent action: particles surrounding dirt and grease and suspending them so they rinse away, which a thin cleaner can do as well as a thick one. A fair test: prepare identical tiles with the same amount of the same greasy dirt; apply equal amounts of a high-viscosity and a low-viscosity cleaner; scrub each the same number of strokes with the same brush and rinse identically; then compare the remaining dirt using the same measure for both (for example, a scored photograph or the mass of dirt removed). If the thicker cleaner does not remove more dirt under identical conditions, the claim fails.<br><br><b>Marking points:</b> 1 mark for identifying the confusion (viscosity is flow resistance, not cleaning strength). 1 mark for the correct basis of cleaning (detergent action on dirt and grease). 1 mark for a fair test with the main variables held the same. 1 mark for a measurable, identically applied result.",
      {});
  }
]), ["Separate the two properties first: what viscosity measures, and what cleaning depends on.", "Then design the test: same dirt, same amount, same scrubbing, one thing changed."]);

/* ---------- SC8.5.3 Science and technology in our lives ---------- */

E("s8-u2-lives", 2, ["SC8.5.3"], 1, "gen", function () {
  var cases = [
    { q: "Which example shows fluids science and technology affecting daily life in a community?", k: "A town's water system uses pumps and pressure to deliver clean water to homes at every height in the town", w: ["A town paints its water tower a new colour each spring", "A school buys new gym mats for the winter term", "A ferry changes its sailing schedule for the holidays"] },
    { q: "Which example shows fluids science and technology affecting daily life in a home?", k: "Hydraulic brakes use an incompressible liquid to carry the driver's foot force to all four wheels", w: ["A family chooses a larger television for the living room", "A student sharpens pencils before class", "A baker sets the oven timer for a cake"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Fluids science reaches daily life through the systems built on it: pressurized water delivery, hydraulic brakes, heating systems and pumps. The examples that count are the ones where a fluid property does the work.",
    {});
}, ["Look for the example where a fluid property is doing a job.", "Pumps, pressure and hydraulics are fluids at work."]);

E("s8-u2-community", 2, ["SC8.5.3"], 1, "var", varset([
  function () {
    return mcq("A coastal community is replacing the brakes and lift equipment in its vehicle service centre and upgrading the ferry's hydraulic steering. Which statement best describes how science and technology are affecting this community?",
      "Fluids technologies built on Pascal's law and the incompressibility of liquids are doing heavy work all through the community's transport system",
      ["The community is affected only because the new equipment is more expensive",
       "Fluids science affects the community only in its science classrooms",
       "The ferry's steering is a technology, but vehicle brakes are not"],
      "Hydraulic systems transmit force through confined liquids, and they run the community's brakes, lifts and steering alike. Science and technology affect a community through the working systems it depends on, not only through laboratories and classrooms.",
      {});
  }
]), ["The common thread is one law working in several machines.", "Pascal's law is doing the work in every example named."]);

/* ---------- SC8.5.4 The science underlying technologies ---------- */

E("s8-u2-underlying", 2, ["SC8.5.4"], 1, "gen", function () {
  var cases = [
    { q: "A hydrometer floats higher in one liquid than in another and reads the liquid's density from how deep it sinks. Which science underlies this technology?", k: "Buoyancy and density: a floating object settles where the buoyant force balances its weight, deeper in less dense liquids", w: ["Viscosity: the hydrometer's sinking is slowed by thick liquids", "Pascal's law: pressure in the liquid is transmitted to the hydrometer", "Compressibility: the liquid is squeezed by the hydrometer's weight"] },
    { q: "A liquid-in-glass thermometer is a technology built on which science?", k: "Thermal expansion: the liquid's volume and density change with temperature in a predictable way", w: ["Archimedes' principle: the liquid is buoyed up the tube", "Pascal's law: pressure is transmitted through the liquid", "Viscosity: warm liquid flows up the tube faster"] },
    { q: "A dentist's chair rises smoothly when a small pedal is pressed. Which science underlies the technology?", k: "Pascal's law in a hydraulic system: pressure applied to a confined liquid is transmitted to a larger piston", w: ["Buoyancy: the chair floats on a hidden tank of water", "Thermal expansion: the pedal warms the liquid in the chair", "Density layering: liquids in the chair sort themselves by density"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Every fluids technology rests on a piece of the strand's science: the hydrometer on buoyancy and density, the thermometer on thermal expansion, and the hydraulic chair on Pascal's law. Naming the underlying science is the indicator's ask.",
    {});
}, ["Ask what the device does, then which strand idea makes it possible.", "Floating gauge: buoyancy. Rising liquid: expansion. Force from a pedal: Pascal."]);

E("s8-u2-cr-underlying", 2, ["SC8.5.4"], 2, "var", varset([
  function () {
    return textq("Choose one technology: a submarine, a hot air balloon, or a personal flotation device (life jacket). Describe the science underlying the technology: name the fluid principle it depends on and explain how the technology uses that principle to work. (3 marks)",
      ["the principle named, such as average density and buoyancy", "how the technology changes or uses it", "the result that makes the technology function"],
      "<b>Model answer:</b> A submarine depends on average density and buoyancy. A vessel floats when its average density is less than the water's and sinks when it is greater. The submarine carries ballast tanks: to dive, it floods the tanks with seawater, raising its average density above the sea's so its weight overcomes the buoyant force; to surface, it blows the water out with compressed air, lowering its average density until buoyancy wins. The whole technology is a machine for adjusting average density on command. (A hot air balloon, heating air to lower its density, or a life jacket, adding low-density volume to lower a swimmer's average density, treated in the same pattern, also earns full marks.)<br><br><b>Marking points:</b> 1 mark for the governing principle correctly named. 1 mark for how the technology manipulates or uses it. 1 mark for the working result explained.",
      {});
  }
]), ["Principle first, mechanism second, result third.", "All three choices run on density and buoyancy, adjusted in different ways."]);

/* ---------- SC8.5.5 Activities and science disciplines ---------- */

E("s8-u2-disciplines", 2, ["SC8.5.5"], 1, "var", varset([
  function () {
    return mcq("A student changes a car's motor oil at home and wonders why the old oil pours more slowly on a cold morning. Which pairing connects this activity to the right science discipline and concept?",
      "Physics, fluid mechanics: the oil's viscosity rises as its temperature falls",
      ["Chemistry, acids and bases: the oil has become more acidic overnight",
       "Biology, cell function: the oil's particles are living and slow down in cold",
       "Earth science, erosion: the oil wears away the engine like a river wears rock"],
      "Everyday activities connect to specific disciplines. Pouring oil is a fluids question, and fluids belong to physics (fluid mechanics); the concept at work is viscosity changing with temperature. Matching the activity to its discipline and its concept is the skill.",
      {});
  }
]), ["The activity is about a flowing liquid. Which discipline owns flowing liquids?", "Fluids sit inside physics; the concept is viscosity."]);

/* ---------- SC8.5.6 Density and buoyancy technologies ---------- */

E("s8-u2-pfd", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("A life jacket that has served for many years is retired because it no longer keeps a swimmer afloat as well as it should. The guide explains this aging effect. Which statement gives the correct explanation, and the principle the jacket was built on?",
      "The jacket works by lowering the swimmer's average density below the water's; over years its foam compresses and grows denser, so it adds less low-density volume and buoys less",
      ["The jacket works by raising the swimmer's average density; over years it absorbs water and grows lighter",
       "The jacket works by heating the water around the swimmer; over years it loses that ability",
       "The jacket works by increasing the swimmer's weight; over years the straps stretch and it fits loosely"],
      "A personal flotation device is made of very low density material. Worn, it makes the average density of swimmer plus jacket less than the water's, so the combination floats. The guide's aging point: as the materials break down and compress over the years, they become more dense, the jacket contributes less low-density volume, and its buoyancy fades. Both the design and its failure run on average density.",
      {});
  }
]), ["One principle explains both why the jacket works and why an old one fails.", "Average density: the jacket's job is to drag the average down."]);

E("s8-u2-submarine", 2, ["SC8.5.6"], 2, "var", varset([
  function () {
    return mcq("A submarine is floating at the surface. Its captain orders the ballast tanks opened to the sea. What happens inside the tanks, and what happens to the submarine?",
      "Water floods in, the submarine's average density rises above the seawater's, and it dives",
      ["Air rushes in, the submarine's average density falls, and it dives",
       "Water floods in, the submarine's volume shrinks, and it rises",
       "The tanks empty of water, and the submarine's weight increases until it dives"],
      "Ballast tanks are the submarine's density controls. Flooding them adds a great deal of mass in water while the submarine's volume stays the same, so its average density climbs past the seawater's density and it sinks in a controlled dive. Blowing the water back out reverses the process to surface.",
      {});
  }
]), ["Flooding adds mass without adding volume. Follow the average density.", "Denser than the sea means down."]);

E("s8-u2-average-density", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("A wooden boat floats for decades, but a waterlogged stick of the same wood sinks. A solid steel block sinks instantly, but a steel ship floats. Which single idea explains both pairs?",
      "Average density: what matters is the total mass divided by the total volume of the whole object, including the air spaces and absorbed water it carries",
      ["Shape alone: any object shaped like a boat floats, whatever it is made of",
       "Age: older wooden objects absorb the ability to float",
       "Surface area: objects with more surface always float"],
      "Neither the material nor the shape alone decides it. The waterlogged stick has soaked up water until its average density passes the water's; the dry boat's wood and air spaces keep its average below. The steel block is solid steel throughout, while the ship is mostly enclosed air: its average density, mass over total volume, is below the water's. One ratio explains all four cases.",
      {});
  }
]), ["Both pairs pit the same material against itself. What property can differ between two objects of the same material?", "Total mass over total volume, air spaces included."]);

/* ---------- SC8.5.7 Hydraulic technologies ---------- */

E("s8-u2-pascal", 2, ["SC8.5.7"], 1, "var", varset([
  function () {
    return mcq("What does Pascal's law state?",
      "Pressure applied to a confined fluid is transmitted equally in all directions throughout the fluid",
      ["Pressure in a fluid decreases with depth in all directions",
       "A confined gas expands until its pressure reaches zero",
       "The buoyant force on an object equals the weight of the fluid it displaces"],
      "Pascal's law is the foundation of hydraulics and pneumatics: squeeze a confined fluid at one point and the pressure increase is felt everywhere in the fluid, in all directions. That is what lets a small force at one piston produce a large force at another.",
      {});
  }
]), ["One law, one idea: pressure applied here is felt everywhere in the fluid.", "Do not confuse it with Archimedes' principle, which is about buoyancy."]);

E("s8-u2-hydraulic-pneumatic", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return mcq("Which comparison of hydraulic and pneumatic systems is correct?",
      "Hydraulic systems use a liquid, which is incompressible and keeps a definite volume; pneumatic systems use a gas, which is compressible and has an indefinite volume",
      ["Hydraulic systems use a gas, which is compressible; pneumatic systems use a liquid, which is not",
       "Both systems use liquids; they differ only in the size of their pistons",
       "Hydraulic systems use a compressible liquid, which is what makes them strong"],
      "The two system families split on their fluid. Hydraulics run on liquids: effectively incompressible, definite volume, ideal for transmitting force exactly, as in brakes and lifts. Pneumatics run on gases: compressible, indefinite volume, as in air tools and tires. Pascal's law applies to both.",
      {});
  }
]), ["The names hide the fluids: hydraulics is water's family (liquids), pneumatics is air's (gases).", "Incompressible goes with hydraulic."]);

E("s8-u2-cr-car-lift", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return textq("A service station lift raises a 12,000 N car using a pump that applies a force of only 300 N to a small piston. Using Pascal's law and the pressure relationship, explain how the lift multiplies the force, and state what the ratio of the piston areas must be. (3 marks)",
      ["pressure applied to the confined liquid is transmitted equally", "the same pressure acts on the large piston, so force scales with area", "the area ratio must be 40 to 1"],
      "<b>Model answer:</b> The pump's 300 N on the small piston creates pressure in the confined hydraulic liquid. By Pascal's law, that pressure is transmitted equally in all directions through the liquid, so the large piston under the car feels the same pressure. Force is pressure times area, F = P x A, so the piston with the larger area produces the larger force. To turn 300 N into 12,000 N the force must be multiplied by 40, so the large piston's area must be 40 times the small piston's area.<br><br><b>Marking points:</b> 1 mark for Pascal's law transmitting the pressure through the confined liquid. 1 mark for force scaling with area at equal pressure (F = P x A). 1 mark for the area ratio of 40 to 1.",
      {});
  }
]), ["The liquid carries pressure, not force. The multiplication happens at the big piston's area.", "Divide the car's weight by the pump's force to get the ratio."]);

/* ---------- SC8.6.1 Identifying questions about fluids ---------- */

E("s8-u2-questions", 2, ["SC8.6.1"], 1, "var", varset([
  function () {
    return mcq("A class is brainstorming investigations after the flow rate lab. Which question arises from a practical fluids problem and can actually be investigated?",
      "Does warming motor oil change how quickly it drains from an engine?",
      ["Why is honey everyone's favourite liquid?",
       "Which liquid in the world is the best one?",
       "Would fluids behave differently if gravity were switched off?"],
      "An investigable question names something that can be changed and something that can be measured: warming the oil (change) and timing its draining (measure). Opinions, superlatives and impossible conditions cannot be investigated, however interesting they sound.",
      {});
  }
]), ["An investigable question needs a changeable variable and a measurable result.", "Favourites and impossible worlds are out; warming and timing are in."]);

E("s8-u2-question-problem", 2, ["SC8.6.1"], 2, "var", varset([
  function () {
    return mcq("A bicycle shop finds that a hydraulic brake lever feels spongy and the brakes are weak. Which question turns this practical problem into an investigation?",
      "Does air trapped in the brake line reduce the force the brake pads apply, compared with a line containing only brake fluid?",
      ["Why do customers prefer strong brakes?",
       "Who invented hydraulic brakes?",
       "Are hydraulic brakes better than cable brakes in every way?"],
      "The practical problem is the spongy lever. The investigable version names a suspected cause that can be varied (air in the line, which compresses, unlike the liquid) and an effect that can be measured (the force at the pads). History and opinion questions do not test the problem.",
      {});
  }
]), ["Start from the shop's problem. The question must be able to test a cause.", "Air in the line is the testable suspect: it compresses, brake fluid does not."]);

/* ---------- SC8.6.2 Rephrasing questions in testable form ---------- */

E("s8-u2-rephrase", 2, ["SC8.6.2"], 1, "var", varset([
  function () {
    return mcq("A student's question reads: 'Is thick oil bad for engines?' Which rephrasing puts it in testable form?",
      "How does the temperature of motor oil affect the time it takes for 100 mL of the oil to drain through a funnel?",
      ["Why do engines dislike thick oil so much?",
       "Is winter oil a better invention than summer oil?",
       "What is the best oil in the world?"],
      "Testable form names the variable to change (temperature), the variable to measure (drain time for a fixed volume), and the material under test. The original question's 'bad' cannot be measured; the rephrasing replaces it with quantities.",
      {});
  }
]), ["Testable means: a variable to change and a variable to measure, both named.", "Replace 'bad' with something a stopwatch can settle."]);

E("s8-u2-define-problem", 2, ["SC8.6.2"], 2, "var", varset([
  function () {
    return mcq("A team must define a practical problem clearly before investigating: their school's soap dispensers keep clogging in winter. Which statement defines the problem in a way an investigation can address?",
      "In cold months the dispensers deliver soap slowly or not at all; the team will test whether the soap's higher viscosity at low temperature is the cause and whether a lower-viscosity soap fixes it",
      ["The soap dispensers are annoying in winter and should be better",
       "Someone should invent a perfect soap that never clogs anything",
       "The dispensers clog because winter is cold, so the investigation is finished"],
      "A clearly defined practical problem states the observed difficulty, a testable suspected cause, and what a solution would look like. The first option does all three; the others complain, dream, or declare the answer before testing it.",
      {});
  }
]), ["A defined problem has three parts: the difficulty, a testable cause, and what fixing it means.", "Declaring the cause before the test is the trap option."]);

/* ---------- SC8.6.3 and SC8.6.9 Discrepancies in data ---------- */

E("s8-u2-discrepancy-flow", 2, ["SC8.6.3"], 2, "var", varset([
  function () {
    return mcq("In the flow rate lab, one group's honey time is 9 seconds while three other groups record 24, 26 and 25 seconds for the same honey through identical funnels. Which explanation for the discrepancy should be investigated first?",
      "A procedural difference in the fast group's trial, such as the funnel being warmed, the honey being a different sample, or the timing starting late",
      ["Honey's viscosity changes randomly from minute to minute, so all results are equally valid",
       "The three slower groups must all have made the same mistake",
       "The fast result should be averaged in without question, since more data is always better"],
      "A single result far from a cluster of agreeing results points first at the procedure behind it: something differed in that trial. Discrepancy work starts by hunting the difference (warmed funnel, different honey, timing error), not by discarding or blindly averaging the odd value.",
      {});
  }
]), ["Three groups agree and one is far off. Where does a scientist look first?", "One odd trial usually has one odd cause in how it was run."]);

E("s8-u2-discrepancy-density", 2, ["SC8.6.9"], 3, "var", varset([
  function () {
    return mcq("Four groups measure the density of the same aluminum bar. Three report 2.7 g/cm3. The fourth reports 3.4 g/cm3 and offers two explanations: (1) their bar was a different alloy; (2) they read the graduated cylinder's level from above instead of at eye level, under-recording the volume. The bars were all cut from one sheet. Which evaluation is strongest?",
      "Explanation (2) is the one to act on: the shared source rules out a different alloy, and under-recording volume inflates the calculated density in exactly the direction observed, so the group should re-measure at eye level",
      ["Explanation (1), because any bar can secretly be a different alloy",
       "Both explanations are equally likely, so the result should stand as reported",
       "Neither: a density discrepancy of this size should simply be deleted from the class data"],
      "Weighing explanations means testing them against the facts and the direction of the error. One sheet rules out a different alloy. A volume read too small makes m/V too large, which matches the high result exactly. The strongest evaluation names the explanation that fits both the facts and the arithmetic, and prescribes the re-measurement.",
      {});
  }
]), ["Test each explanation twice: does it fit the facts, and does it push the number the way the number actually moved?", "Too-small volume makes density too big. That direction match is decisive."]);

/* ---------- SC8.6.4 Compiling and displaying data in a bar graph ---------- */

E("s8-u2-bargraph", 2, ["SC8.6.4"], 3, "var", varset([
  function () {
    var q = mcq("A group measured flow times for four liquids and displayed them in the bar graph shown. Their lab partner claims the graph proves Liquid B is the most viscous because its bar is 'in the middle.' Which evaluation of the display and the claim is correct?",
      "The bar graph is an appropriate display for comparing separate liquids, but the claim misreads it: the most viscous liquid is the one with the longest flow time, Liquid D",
      ["The claim is correct, because the middle bar always represents the extreme value",
       "The bar graph is the wrong display; only a line graph can compare liquids",
       "The graph proves nothing, because flow times cannot be displayed graphically"],
      "Bar graphs suit this data: separate categories (four liquids) each with one measured value. Reading it is the second skill: viscosity rises with flow time, so the longest bar, Liquid D, is the most viscous. The display is right and the partner's reading of it is wrong.",
      {});
    q.figure = s8HealthSVG([{ name: "Liquid A", value: 6 }, { name: "Liquid B", value: 14 }, { name: "Liquid C", value: 11 }, { name: "Liquid D", value: 23 }], "Flow time", "s", null);
    return q;
  }
]), ["Two judgements: is a bar graph right for categories, and which bar means most viscous?", "Categories take bars; longest time takes the viscosity title."]);

E("s8-u2-graph-choice", 2, ["SC8.6.4"], 1, "var", varset([
  function () {
    return mcq("A group has one flow time for each of five different liquids and must display the data. Which display is appropriate, and why?",
      "A bar graph, because the data are separate categories (different liquids), each with a single value to compare",
      ["A line graph, because all science data must be drawn as lines",
       "A circle graph, because the five times add to a whole",
       "No graph, because times measured in seconds cannot be graphed"],
      "Display follows data shape. Five different liquids are categories, not a continuous variable, so bars compare them honestly; a line would invent a trend between unrelated liquids. The guide's own correction in Core Lab 8-2B makes the same point in reverse: class results there belong in a bar graph (histogram), not a line graph.",
      {});
  }
]), ["Categories or a continuum? That decides bars or lines.", "Different liquids are categories. A line would pretend they connect."]);

/* ---------- SC8.6.5 Carrying out procedures controlling variables (CORE) ---------- */

E("s8-u2-variables", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return mcq("A group tests whether temperature affects the flow rate of cooking oil. They warm or cool the oil to three temperatures, pour 100 mL through the same funnel each time, and time each pour. Which identification of the variables is correct?",
      "Changed variable: the oil's temperature. Measured variable: the flow time. Kept the same: the oil, its volume, and the funnel",
      ["Changed variable: the flow time. Measured variable: the temperature. Kept the same: the oil and the funnel",
       "Changed variable: the funnel. Measured variable: the oil's volume. Kept the same: the temperature",
       "There are no controlled variables, because temperature is the only thing in the experiment"],
      "Variable identification follows the roles. The group deliberately changes the temperature, measures the flow time as the result, and holds the oil, its volume and the funnel constant so the comparison is fair. Naming the three roles correctly is the cognitive core of carrying out a controlled procedure.",
      {});
  }
]), ["Sort by role: what they set, what they measured, what they froze in place.", "The changed variable is the one in the question being tested."]);

E("s8-u2-cr-design-viscosity", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return textq("Design a controlled investigation to compare the viscosities of three liquids: water, cooking oil and honey. Your plan must state the method you will use to compare them, the variable you will change, the variable you will measure, at least two variables you will keep the same, and how you will make the comparison fair and repeatable. (4 marks)",
      ["a workable method such as timing flow through the same funnel or down the same ramp", "the liquid as the changed variable", "flow time or distance as the measured variable", "amount of liquid, apparatus, temperature and repeats kept the same"],
      "<b>Model answer:</b> Method: pour each liquid through the same funnel into a measuring cylinder and time how long a fixed volume, 100 mL, takes to pass through; repeat each liquid three times and average. The variable changed is the liquid itself (water, cooking oil, honey). The variable measured is the flow time: the longest time means the highest viscosity. Kept the same: the volume of liquid (100 mL), the funnel and cylinder, the temperature of the liquids (all left in the same room), and the person timing with the same start and stop rule. Averaging repeats protects the comparison from one mistimed run. The liquids can then be ranked by their average times.<br><br><b>Marking points:</b> 1 mark for a workable comparison method. 1 mark for the changed variable (the liquid) and the measured variable (flow time or distance) correctly named. 1 mark for at least two variables kept the same. 1 mark for fairness and repeatability (repeats, averaging, or an identical start and stop rule).",
      {});
  }
]), ["Design it like the core lab, but make the controls explicit: that is where the marks are.", "Four parts: method, changed, measured, kept the same, plus fairness."]);

/* ---------- SC8.6.6 Interpreting patterns in data ---------- */

E("s8-u2-pattern", 2, ["SC8.6.6"], 1, "var", varset([
  function () {
    var q = mcq("The graph shows the flow time of the same oil measured at five temperatures. Which statement interprets the pattern correctly?",
      "As the temperature increases, the flow time decreases: warmer oil is less viscous",
      ["As the temperature increases, the flow time increases: warmer oil is more viscous",
       "Temperature and flow time are unrelated in this data",
       "The flow time changes, but viscosity stays the same at every temperature"],
      "The line falls steadily: higher temperatures come with shorter flow times. Flow time is the lab's stand-in for viscosity, so the pattern reads: warming the oil lowers its viscosity, the relationship the particle theory predicts.",
      {});
    q.figure = s8LineGraphSVG([10, 20, 30, 40, 50], [42, 31, 23, 17, 12], "Temperature (degrees C)", "Flow time (s)");
    return q;
  }
]), ["Read the line's direction first, then translate flow time into viscosity.", "Falling time means falling viscosity."]);

E("s8-u2-cr-data-infer", 2, ["SC8.6.6"], 2, "var", varset([
  function () {
    return textq("A class measures two unknown materials. Material A: a 20 cm3 sample has a mass of 54 g, and a 40 cm3 sample has a mass of 108 g. Material B: a 20 cm3 sample has a mass of 16 g, and a 40 cm3 sample has a mass of 32 g. (a) Calculate each material's density. (b) Infer, with reasons, which material would float in water and which would sink. (c) State the pattern in the data that tells you each density is a property of the material, not of the sample size. (3 marks)",
      ["material A is 2.7 g/cm3 and material B is 0.8 g/cm3", "A sinks and B floats, by comparison with water at 1.00 g/cm3", "doubling the volume doubles the mass, so the ratio stays constant"],
      "<b>Model answer:</b> (a) Material A: D = 54 g / 20 cm3 = 2.7 g/cm3. Material B: D = 16 g / 20 cm3 = 0.8 g/cm3. (b) Water's density is 1.00 g/cm3. Material A, at 2.7 g/cm3, is denser than water and sinks; Material B, at 0.8 g/cm3, is less dense and floats. (c) In both materials, doubling the volume exactly doubles the mass, so the mass-to-volume ratio is the same for both sample sizes: the density is constant for the material, which is what makes it a property of the material rather than of the piece measured.<br><br><b>Marking points:</b> 1 mark for both densities calculated. 1 mark for the float and sink inference tied to water's density. 1 mark for the constant-ratio pattern (volume and mass doubling together).",
      {});
  }
]), ["Calculate first, compare with water second, then look at what stays constant across the sample sizes.", "The pattern to name is in how mass grows with volume."]);

/* ---------- SC8.6.7 Using instruments effectively and accurately (CORE) ---------- */

E("s8-u2-instruments", 2, ["SC8.6.7"], 1, "var", varset([
  function () {
    return mcq("A student is measuring the volume of a liquid in a graduated cylinder for a density calculation. Which practice gives an accurate reading?",
      "Place the cylinder on a level surface and read the bottom of the meniscus at eye level",
      ["Hold the cylinder up to the light and read the top of the meniscus from above",
       "Read the scale from wherever you are standing, since the numbers are large",
       "Estimate between the marks quickly before the liquid settles"],
      "Accurate instrument use is a set of habits: a level surface so the liquid sits true, eye level so the reading is not shifted by the viewing angle, and the bottom of the meniscus (the curve the liquid's surface makes) as the reading point. The bank carries this one entry; instrument handling itself is classroom assessment.",
      {});
  }
]), ["Level surface, eye level, bottom of the curve: three habits, one option has them all.", "Reading from above or below shifts the value: parallax."]);

/* ---------- SC8.6.8 Water displacement for irregular volumes (CORE) ---------- */

E("s8-u2-displacement", 2, ["SC8.6.8"], 1, "var", varset([
  function () {
    return mcq("Which procedure correctly determines the volume of an irregularly shaped stone by water displacement?",
      "Record the water level in a graduated cylinder, lower the stone in gently until it is fully submerged, record the new level, and subtract",
      ["Drop the stone into a full beaker and weigh the stone again while it is wet",
       "Measure the stone's length, width and height with a ruler and multiply",
       "Float the stone on the water and read the level where it sits"],
      "Displacement works because the submerged stone pushes aside its own volume of water. The rise in level, final minus initial, is that volume. The stone must be fully submerged and lowered gently so no water splashes out; a ruler cannot capture an irregular shape, and a stone does not float.",
      {});
  }
]), ["The volume is the rise. Which option actually measures a rise?", "Fully submerged, gently lowered, subtract the levels."]);

E("s8-u2-displacement-error", 2, ["SC8.6.8"], 3, "var", varset([
  function () {
    return mcq("A group determines a metal cube's volume by displacement and gets 14 mL, but calculating from the cube's measured sides gives 27 cm3. Their notes say the cube 'stuck out of the water a little' in the cylinder, which was also too narrow, so the cube wedged against the sides. Which judgement best evaluates their displacement result?",
      "The displacement value is invalid: the cube was not fully submerged, so it displaced less than its full volume, and the wedging made it worse; they need a wider container and full submersion",
      ["The displacement value is better, because water never lies, so the side measurements must be wrong",
       "Both values should be averaged to give the true volume",
       "The difference is unimportant, because volume does not affect the density calculation that follows"],
      "Judging a procedure means checking it against its own requirements. Displacement only equals volume when the object is fully submerged; a cube poking out displaces part of itself, so 14 mL understates the volume, and the direction of the error confirms the diagnosis. Averaging a valid value with an invalid one just contaminates the density that follows.",
      {});
  }
]), ["Displacement has one non-negotiable condition. Was it met?", "Partly out means partly displaced: the error's direction gives it away."]);

E("s8-u2-cr-displacement-calc", 2, ["SC8.6.8"], 2, "var", varset([
  function () {
    return textq("A student investigates an irregular metal object. She records the water in a graduated cylinder at 150 mL, lowers the object in until it is fully submerged, and reads 175 mL. The object's mass, from a balance, is 135 g. (a) State the object's volume. (b) Calculate its density. (c) Using the density table from this unit (aluminum 2.70 g/cm3, iron 7.87 g/cm3, lead 11.34 g/cm3), state what the object is most likely made of, and one check she should make on her displacement reading before trusting the conclusion. (3 marks)",
      ["the volume is 25 cm3 from the rise in the water level", "the density is 5.4 g/cm3 from mass divided by volume", "no exact match in the table, with a validity check on the reading"],
      "<b>Model answer:</b> (a) The volume is the rise in level: 175 mL - 150 mL = 25 mL = 25 cm3. (b) D = m/V = 135 g / 25 cm3 = 5.4 g/cm3. (c) At 5.4 g/cm3 the object does not match any listed metal exactly; it sits between aluminum (2.70) and iron (7.87), so the honest conclusion is that it is not pure aluminum, iron or lead, and may be an alloy or a coated object. Before trusting even that, she should check the displacement reading itself: confirm the object was fully submerged with no air bubbles clinging to it, since trapped air would inflate the volume and distort the density.<br><br><b>Marking points:</b> 1 mark for the volume from the rise in level. 1 mark for the density calculation with units. 1 mark for a conclusion that respects the table (no exact match, so no forced identification) together with a validity check on the reading.",
      {});
  }
]), ["Volume from the rise, density from the formula, and a conclusion that does not claim more than the table supports.", "A value between two table entries is a finding, not a failure."]);

/* ---------- SC8.6.10 Calculating density (skills) ---------- */

E("s8-u2-sk-calc-density", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 1.1, 1.4, 1.6, 2.2, 2.7, 3.0]);
  var V = pick([10, 20, 25, 50]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(D, [D * 2, D / 2, V / m * 10, D + 0.5, m / (V - 5)]);
  return mcq("In the density lab, a group's sample has a mass of " + s8n(m) + " g and a volume of " + V + " cm3 (measured by displacement). Calculate the sample's density.",
    s8n(D) + " g/cm3",
    dis.map(function (d) { return s8n(d) + " g/cm3"; }),
    "D = m/V = " + s8n(m) + " g / " + V + " cm3 = " + s8n(D) + " g/cm3. Lab calculations use the same formula as every other density question; only the source of the volume (displacement) is new.",
    {});
}, ["Same formula, lab clothing: density = mass / volume.", "The displacement work is already done; the volume is given."]);

E("s8-u2-sk-calc-mass", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5]);
  var V = pick([30, 60, 120, 250, 400]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(m, [m * 2, m / 2, D + V, V - D, m + 15]);
  return mcq("A technician must pour out a liquid of density " + s8n(D) + " g/mL so that the sample's mass is exact for a test. What mass will " + V + " mL of the liquid have?",
    s8n(m) + " g",
    dis.map(function (d) { return s8n(d) + " g"; }),
    "m = D x V = " + s8n(D) + " g/mL x " + V + " mL = " + s8n(m) + " g. Multiplying the per-millilitre mass by the number of millilitres gives the total mass.",
    {});
}, ["Mass = density x volume, the rearranged form.", "A few hundred millilitres should give a mass well above the density number."]);

E("s8-u2-sk-calc-volume", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 1.0, 1.2, 1.5, 2.0, 2.5]);
  var V = pick([15, 30, 45, 60, 90]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(V, [V * 2, V / 2, m * D / 2, m - D * 10, V + 10]);
  return mcq("A sample of a liquid has a mass of " + s8n(m) + " g. The liquid's density is " + s8n(D) + " g/mL. What volume does the sample occupy?",
    s8n(V) + " mL",
    dis.map(function (d) { return s8n(d) + " mL"; }),
    "V = m/D = " + s8n(m) + " g / " + s8n(D) + " g/mL = " + s8n(V) + " mL. Dividing the total mass by the mass in each millilitre counts the millilitres.",
    {});
}, ["Volume = mass / density, the third form.", "Check by multiplying back: volume x density should return the mass."]);

E("s8-u2-units", 2, ["SC8.6.10"], 1, "var", varset([
  function () {
    return mcq("Which pairing of quantity and unit expression is correct throughout?",
      "The density of a liquid is expressed in g/mL, and the density of a solid in g/cm3, with 1 mL equal to 1 cm3",
      ["The density of a liquid is expressed in g/cm3 only, and solids in mL/g",
       "Density is expressed in grams for liquids and newtons for solids",
       "Volume of a solid is expressed in mL and volume of a liquid in cm3, and the two never convert"],
      "The guide's convention: a fluid's density is expressed in g/mL and a solid's in g/cm3, and since 1 mL = 1 cm3 the numbers are directly comparable, which is why a solid's density can be set against water's 1.00 either way. Units are part of the calculation, not decoration after it.",
      {});
  }
]), ["One conversion makes the whole system work: 1 mL = 1 cm3.", "Liquids take mL, solids take cm3, and the two units are equal in size."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U2 = {
  "s8-u2-cr-design-viscosity": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s8-u1-cr-abiotic":3,"s8-u1-cr-coastal-climate":3,"s8-u1-cr-cycle-role":3,"s8-u1-cr-decision":4,"s8-u1-cr-design-salinity":4,"s8-u1-cr-glacier":3,"s8-u1-cr-headland":3,"s8-u1-cr-indirect":3,"s8-u1-cr-pond-data":3,"s8-u1-cr-population":3,"s8-u1-cr-protect":3,"s8-u1-cr-results-summary":3,"s8-u1-cr-tech-effects":3,"s8-u1-cr-tides":3,"s8-u2-cr-car-lift":3,"s8-u2-cr-cleaning-claim":4,"s8-u2-cr-data-infer":3,"s8-u2-cr-density-block":3,"s8-u2-cr-design-viscosity":4,"s8-u2-cr-displacement-calc":3,"s8-u2-cr-layers":3,"s8-u2-cr-mass-weight":3,"s8-u2-cr-molasses":3,"s8-u2-cr-piggyback":3,"s8-u2-cr-pressure-crate":3,"s8-u2-cr-raise-ship":3,"s8-u2-cr-temp-situations":3,"s8-u2-cr-underlying":3};
