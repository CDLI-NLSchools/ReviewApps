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

/* ================= Unit 3 (Optics) figure families =================
   O1: reflection diagram at a given incidence angle (the angle is
   labelled as given data, as in the core lab). O2: plane mirror
   with object and image arrows. O3: concave mirror ray diagrams
   at the guide's three object positions and a convex mirror
   diagram, drawn with the two special rays under the paraxial
   construction, so the image position and size follow the mirror
   relationship. O4: refraction at a boundary (toward, away,
   straight-on). O5: lens ray diagrams. O6: EM spectrum strip. */

function s8ReflectSVG(angleDeg, callouts) {
  var W = 400, H = 260, px = 300, py = 130;
  var a = angleDeg * Math.PI / 180, L = 175;
  var sx = px - L * Math.cos(a), sy = py - L * Math.sin(a);
  var rx = px - L * Math.cos(a), ry = py + L * Math.sin(a);
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  for (var h = 0; h < 7; h++) s += "<line x1=\"" + (px + 4) + "\" y1=\"" + (40 + h * 30) + "\" x2=\"" + (px + 16) + "\" y2=\"" + (30 + h * 30) + "\" stroke=\"#999\"/>";
  s += "<line x1=\"" + px + "\" y1=\"25\" x2=\"" + px + "\" y2=\"235\" stroke=\"#444\" stroke-width=\"3\"/>";
  s += "<line x1=\"55\" y1=\"" + py + "\" x2=\"" + px + "\" y2=\"" + py + "\" stroke=\"#888\" stroke-dasharray=\"6 4\"/>";
  s += "<line x1=\"" + sx + "\" y1=\"" + sy + "\" x2=\"" + px + "\" y2=\"" + py + "\" stroke=\"#c0392b\" stroke-width=\"2.5\"/>";
  s += "<line x1=\"" + px + "\" y1=\"" + py + "\" x2=\"" + rx + "\" y2=\"" + ry + "\" stroke=\"#2471a3\" stroke-width=\"2.5\"/>";
  s += "<polygon points=\"" + px + "," + py + " " + (px - 12) + "," + (py - 5) + " " + (px - 10) + "," + (py + 6) + "\" fill=\"#c0392b\"/>";
  s += "<polygon points=\"" + rx + "," + ry + " " + (rx + 11) + "," + (ry - 7) + " " + (rx + 3) + "," + (ry - 12) + "\" fill=\"#2471a3\"/>";
  var arcR = 52;
  var ax = px - arcR * Math.cos(a / 2) * 1.0, ay = py - arcR * Math.sin(a / 2);
  s += "<path d=\"M " + (px - arcR) + " " + py + " A " + arcR + " " + arcR + " 0 0 1 " + (px - arcR * Math.cos(a)) + " " + (py - arcR * Math.sin(a)) + "\" fill=\"none\" stroke=\"#c0392b\"/>";
  if (!callouts) {
    s += "<text x=\"" + (ax - 16) + "\" y=\"" + (ay + 4) + "\" fill=\"#c0392b\">" + angleDeg + "&deg;</text>";
  } else {
    s += "<text x=\"" + (sx - 8) + "\" y=\"" + (sy - 8) + "\" font-weight=\"bold\">A</text>";
    s += "<text x=\"" + (rx - 8) + "\" y=\"" + (ry + 18) + "\" font-weight=\"bold\">B</text>";
    s += "<text x=\"60\" y=\"" + (py - 8) + "\" font-weight=\"bold\">C</text>";
    s += "<text x=\"" + (px + 20) + "\" y=\"40\" font-weight=\"bold\">D</text>";
  }
  s += "</svg>";
  return s;
}

function s8PlaneMirrorSVG() {
  var W = 400, H = 250, mx = 240, axis = 195;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  for (var h = 0; h < 7; h++) s += "<line x1=\"" + (mx + 4) + "\" y1=\"" + (35 + h * 28) + "\" x2=\"" + (mx + 16) + "\" y2=\"" + (25 + h * 28) + "\" stroke=\"#999\"/>";
  s += "<line x1=\"" + mx + "\" y1=\"25\" x2=\"" + mx + "\" y2=\"215\" stroke=\"#444\" stroke-width=\"3\"/>";
  s += "<line x1=\"150\" y1=\"" + axis + "\" x2=\"150\" y2=\"95\" stroke=\"#2471a3\" stroke-width=\"3\"/>";
  s += "<polygon points=\"150,84 143,99 157,99\" fill=\"#2471a3\"/>";
  s += "<line x1=\"330\" y1=\"" + axis + "\" x2=\"330\" y2=\"95\" stroke=\"#888\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/>";
  s += "<polygon points=\"330,84 323,99 337,99\" fill=\"#888\"/>";
  s += "<line x1=\"150\" y1=\"228\" x2=\"" + mx + "\" y2=\"228\" stroke=\"#666\"/><line x1=\"" + mx + "\" y1=\"228\" x2=\"330\" y2=\"228\" stroke=\"#666\"/>";
  s += "<text x=\"138\" y=\"245\">object</text><text x=\"312\" y=\"245\">image</text>";
  s += "</svg>";
  return s;
}

/* Concave mirror: vertex at x=300, centre of curvature at x=410,
   focal point at x=355, radius 110, axis y=150. pos: "beyond"
   (object beyond C), "between" (between F and C), "inside"
   (between F and the mirror). */
function s8ConcaveSVG(pos) {
  var W = 520, H = 270, axis = 150, Vx = 300, Cx = 410, Fx = 355, R = 110;
  var cfg = { beyond: { do: 150, ho: 44 }, between: { do: 80, ho: 30 }, inside: { do: 30, ho: 26 } }[pos];
  var f = R / 2, d_o = cfg.do, ho = cfg.ho;
  var di = 1 / (1 / f - 1 / d_o);
  var m = -di / d_o;
  var ox = Vx - d_o, ix = Vx + (di > 0 ? -di : -di);
  var imageX = Vx - di;
  var imgH = m * ho;
  function mirrorX(y) { return Cx - Math.sqrt(Math.max(0, R * R - (y - axis) * (y - axis))); }
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:520px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  var path = "";
  for (var t = -52; t <= 52; t += 4) {
    var yy = axis + R * Math.sin(t * Math.PI / 180), xx = Cx - R * Math.cos(t * Math.PI / 180);
    path += (t === -52 ? "M " : "L ") + xx.toFixed(1) + " " + yy.toFixed(1) + " ";
  }
  s += "<path d=\"" + path + "\" fill=\"none\" stroke=\"#444\" stroke-width=\"3\"/>";
  s += "<line x1=\"15\" y1=\"" + axis + "\" x2=\"505\" y2=\"" + axis + "\" stroke=\"#bbb\" stroke-dasharray=\"7 4\"/>";
  s += "<circle cx=\"" + Fx + "\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#c0392b\"/><text x=\"" + (Fx - 3) + "\" y=\"" + (axis + 18) + "\" fill=\"#c0392b\">F</text>";
  s += "<circle cx=\"" + Cx + "\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#666\"/><text x=\"" + (Cx - 3) + "\" y=\"" + (axis + 18) + "\">C</text>";
  var ot = axis - ho;
  s += "<line x1=\"" + ox + "\" y1=\"" + axis + "\" x2=\"" + ox + "\" y2=\"" + ot + "\" stroke=\"#2471a3\" stroke-width=\"3\"/>";
  s += "<polygon points=\"" + ox + "," + (ot - 9) + " " + (ox - 6) + "," + (ot + 4) + " " + (ox + 6) + "," + (ot + 4) + "\" fill=\"#2471a3\"/>";
  var it = axis - imgH;
  var imgStroke = di > 0 ? "#b3541e" : "#888";
  var imgDash = di > 0 ? "" : " stroke-dasharray=\"6 4\"";
  s += "<line x1=\"" + imageX + "\" y1=\"" + axis + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"" + imgStroke + "\" stroke-width=\"3\"" + imgDash + "/>";
  if (imgH > 0) s += "<polygon points=\"" + imageX + "," + (it - 9) + " " + (imageX - 6) + "," + (it + 4) + " " + (imageX + 6) + "," + (it + 4) + "\" fill=\"" + imgStroke + "\"/>";
  else s += "<polygon points=\"" + imageX + "," + (it + 9) + " " + (imageX - 6) + "," + (it - 4) + " " + (imageX + 6) + "," + (it - 4) + "\" fill=\"" + imgStroke + "\"/>";
  var m1x = mirrorX(ot), m1y = ot;
  s += "<line x1=\"" + ox + "\" y1=\"" + ot + "\" x2=\"" + m1x + "\" y2=\"" + m1y + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
  if (di > 0) {
    s += "<line x1=\"" + m1x + "\" y1=\"" + m1y + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
  } else {
    var ext1x = imageX, ext1y = it;
    s += "<line x1=\"" + m1x + "\" y1=\"" + m1y + "\" x2=\"" + Fx + "\" y2=\"" + axis + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
    s += "<line x1=\"" + Fx + "\" y1=\"" + axis + "\" x2=\"" + (Fx - 34) + "\" y2=\"" + (axis + (axis - m1y) * 34 / (m1x - Fx)) + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
    s += "<line x1=\"" + m1x + "\" y1=\"" + m1y + "\" x2=\"" + ext1x + "\" y2=\"" + ext1y + "\" stroke=\"#c0392b\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/>";
  }
  var slopeB = (axis - ot) / (Fx - ox);
  var m2y = ot + slopeB * (mirrorX(ot + slopeB * (Vx - ox)) - ox);
  var m2x = mirrorX(m2y);
  m2y = ot + slopeB * (m2x - ox);
  s += "<line x1=\"" + ox + "\" y1=\"" + ot + "\" x2=\"" + m2x + "\" y2=\"" + m2y + "\" stroke=\"#1a7f4b\" stroke-width=\"1.8\"/>";
  if (di > 0) {
    s += "<line x1=\"" + m2x + "\" y1=\"" + m2y + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#1a7f4b\" stroke-width=\"1.8\"/>";
  } else {
    s += "<line x1=\"" + m2x + "\" y1=\"" + m2y + "\" x2=\"" + (m2x - 120) + "\" y2=\"" + m2y + "\" stroke=\"#1a7f4b\" stroke-width=\"1.8\"/>";
    s += "<line x1=\"" + m2x + "\" y1=\"" + m2y + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#1a7f4b\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/>";
  }
  s += "<text x=\"" + (ox - 10) + "\" y=\"" + (axis + 18) + "\">object</text>";
  s += "<text x=\"" + (imageX - 10) + "\" y=\"" + (axis + 18) + "\">image</text>";
  s += "</svg>";
  return s;
}

function s8ConvexSVG() {
  var W = 460, H = 270, axis = 150;
  var Cx = 170, R = 100, Vx = 270, Fx = 220;
  var ox = 90, ho = 60, ot = axis - ho;
  var imageX = 309, imgH = 13, it = axis - imgH;
  function mirrorX(y) { return Cx + Math.sqrt(Math.max(0, R * R - (y - axis) * (y - axis))); }
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  var path = "";
  for (var t = -55; t <= 55; t += 5) {
    var yy = axis + R * Math.sin(t * Math.PI / 180), xx = Cx + R * Math.cos(t * Math.PI / 180);
    path += (t === -55 ? "M " : "L ") + xx.toFixed(1) + " " + yy.toFixed(1) + " ";
  }
  s += "<path d=\"" + path + "\" fill=\"none\" stroke=\"#444\" stroke-width=\"3\"/>";
  for (var h = 0; h < 6; h++) s += "<line x1=\"" + (mirrorX(70 + h * 32) + 2) + "\" y1=\"" + (70 + h * 32) + "\" x2=\"" + (mirrorX(70 + h * 32) + 13) + "\" y2=\"" + (62 + h * 32) + "\" stroke=\"#999\"/>";
  s += "<line x1=\"15\" y1=\"" + axis + "\" x2=\"445\" y2=\"" + axis + "\" stroke=\"#bbb\" stroke-dasharray=\"7 4\"/>";
  s += "<circle cx=\"" + Fx + "\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#c0392b\"/><text x=\"" + (Fx - 3) + "\" y=\"" + (axis + 18) + "\" fill=\"#c0392b\">F</text>";
  s += "<line x1=\"" + ox + "\" y1=\"" + axis + "\" x2=\"" + ox + "\" y2=\"" + ot + "\" stroke=\"#2471a3\" stroke-width=\"3\"/>";
  s += "<polygon points=\"" + ox + "," + (ot - 9) + " " + (ox - 6) + "," + (ot + 4) + " " + (ox + 6) + "," + (ot + 4) + "\" fill=\"#2471a3\"/>";
  s += "<line x1=\"" + imageX + "\" y1=\"" + axis + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#888\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/>";
  s += "<polygon points=\"" + imageX + "," + (it - 8) + " " + (imageX - 5) + "," + (it + 3) + " " + (imageX + 5) + "," + (it + 3) + "\" fill=\"#888\"/>";
  var m1x = mirrorX(ot), m1y = ot;
  s += "<line x1=\"" + ox + "\" y1=\"" + ot + "\" x2=\"" + m1x + "\" y2=\"" + m1y + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
  var rSlope = (m1y - axis) / (m1x - Fx);
  s += "<line x1=\"" + m1x + "\" y1=\"" + m1y + "\" x2=\"40\" y2=\"" + (m1y + rSlope * (40 - m1x)) + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
  s += "<line x1=\"" + m1x + "\" y1=\"" + m1y + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#c0392b\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/>";
  var slopeB = (axis - ot) / (Fx - ox);
  var m2y = ot + slopeB * (mirrorX(ot) - ox), m2x = mirrorX(m2y);
  m2y = ot + slopeB * (m2x - ox);
  s += "<line x1=\"" + ox + "\" y1=\"" + ot + "\" x2=\"" + m2x + "\" y2=\"" + m2y + "\" stroke=\"#1a7f4b\" stroke-width=\"1.8\"/>";
  s += "<line x1=\"" + m2x + "\" y1=\"" + m2y + "\" x2=\"40\" y2=\"" + m2y + "\" stroke=\"#1a7f4b\" stroke-width=\"1.8\"/>";
  s += "<line x1=\"" + m2x + "\" y1=\"" + m2y + "\" x2=\"" + imageX + "\" y2=\"" + it + "\" stroke=\"#1a7f4b\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/>";
  s += "<text x=\"" + (ox - 10) + "\" y=\"" + (axis + 18) + "\">object</text>";
  s += "<text x=\"" + (imageX - 10) + "\" y=\"" + (axis + 18) + "\">image</text>";
  s += "</svg>";
  return s;
}

/* Refraction at a boundary. mode: "toward" (air into water, bends
   toward the normal), "away" (water into air, bends away),
   "straight" (along the normal, no bend). ghost draws the dashed
   unbent continuation for comparison items. */
function s8RefractSVG(mode, ghost) {
  var W = 400, H = 270, by = 135, nx = 200;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<rect x=\"0\" y=\"" + by + "\" width=\"" + W + "\" height=\"" + (H - by) + "\" fill=\"#dceef7\"/>";
  s += "<line x1=\"0\" y1=\"" + by + "\" x2=\"" + W + "\" y2=\"" + by + "\" stroke=\"#5b8db8\" stroke-width=\"2\"/>";
  s += "<line x1=\"" + nx + "\" y1=\"15\" x2=\"" + nx + "\" y2=\"" + (H - 15) + "\" stroke=\"#888\" stroke-dasharray=\"6 4\"/>";
  s += "<text x=\"14\" y=\"30\">air (less dense)</text><text x=\"14\" y=\"" + (H - 14) + "\">water (more dense)</text>";
  if (mode === "toward") {
    s += "<line x1=\"105\" y1=\"38\" x2=\"" + nx + "\" y2=\"" + by + "\" stroke=\"#c0392b\" stroke-width=\"2.5\"/>";
    s += "<line x1=\"" + nx + "\" y1=\"" + by + "\" x2=\"248\" y2=\"238\" stroke=\"#2471a3\" stroke-width=\"2.5\"/>";
    if (ghost) s += "<line x1=\"" + nx + "\" y1=\"" + by + "\" x2=\"295\" y2=\"232\" stroke=\"#aaa\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/>";
  } else if (mode === "away") {
    s += "<line x1=\"105\" y1=\"232\" x2=\"" + nx + "\" y2=\"" + by + "\" stroke=\"#c0392b\" stroke-width=\"2.5\"/>";
    s += "<line x1=\"" + nx + "\" y1=\"" + by + "\" x2=\"298\" y2=\"40\" stroke=\"#2471a3\" stroke-width=\"2.5\"/>";
    if (ghost) s += "<line x1=\"" + nx + "\" y1=\"" + by + "\" x2=\"248\" y2=\"32\" stroke=\"#aaa\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/>";
  } else {
    s += "<line x1=\"" + nx + "\" y1=\"30\" x2=\"" + nx + "\" y2=\"240\" stroke=\"#c0392b\" stroke-width=\"2.5\"/>";
  }
  s += "</svg>";
  return s;
}

function s8LensSVG(kind) {
  var W = 400, H = 240, axis = 120, cx = 200;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"10\" y1=\"" + axis + "\" x2=\"390\" y2=\"" + axis + "\" stroke=\"#bbb\" stroke-dasharray=\"7 4\"/>";
  if (kind === "convex") {
    s += "<path d=\"M " + cx + " 40 Q 232 " + axis + " " + cx + " 200 Q 168 " + axis + " " + cx + " 40 Z\" fill=\"#eaf3fa\" stroke=\"#2471a3\" stroke-width=\"2\"/>";
    s += "<circle cx=\"268\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#c0392b\"/><text x=\"262\" y=\"" + (axis + 18) + "\" fill=\"#c0392b\">F</text>";
    s += "<circle cx=\"132\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#c0392b\"/><text x=\"126\" y=\"" + (axis + 18) + "\" fill=\"#c0392b\">F</text>";
    [78, 162].forEach(function (yy) {
      s += "<line x1=\"30\" y1=\"" + yy + "\" x2=\"" + cx + "\" y2=\"" + yy + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
      s += "<line x1=\"" + cx + "\" y1=\"" + yy + "\" x2=\"330\" y2=\"" + axis + (yy < axis ? 0 : 0) + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
    });
  } else {
    s += "<path d=\"M " + cx + " 40 Q 178 " + axis + " " + cx + " 200 Q 222 " + axis + " " + cx + " 40 Z\" fill=\"#eaf3fa\" stroke=\"#2471a3\" stroke-width=\"2\"/>";
    s += "<circle cx=\"132\" cy=\"" + axis + "\" r=\"3.5\" fill=\"#c0392b\"/><text x=\"126\" y=\"" + (axis + 18) + "\" fill=\"#c0392b\">F</text>";
    [78, 162].forEach(function (yy) {
      s += "<line x1=\"30\" y1=\"" + yy + "\" x2=\"" + cx + "\" y2=\"" + yy + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
      var dy = yy < axis ? -26 : 26;
      s += "<line x1=\"" + cx + "\" y1=\"" + yy + "\" x2=\"330\" y2=\"" + (yy + dy * 2.2) + "\" stroke=\"#c0392b\" stroke-width=\"1.8\"/>";
      s += "<line x1=\"" + cx + "\" y1=\"" + yy + "\" x2=\"132\" y2=\"" + axis + "\" stroke=\"#c0392b\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/>";
    });
  }
  s += "</svg>";
  return s;
}

function s8EMSpectrumSVG() {
  var types = ["Radio waves", "Microwaves", "Infrared", "Visible light", "Ultraviolet", "X-rays", "Gamma rays"];
  var W = 580, seg = (W - 40) / 7;
  var s = "<svg viewBox=\"0 0 " + W + " 130\" width=\"100%\" style=\"max-width:580px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11.5\">";
  var cols = ["#8e6cc8", "#6c8ec8", "#c86c6c", "#57a05a", "#c8a44a", "#5a7fa0", "#8a4a6b"];
  types.forEach(function (t, i) {
    s += "<rect x=\"" + (20 + i * seg) + "\" y=\"34\" width=\"" + (seg - 3) + "\" height=\"30\" fill=\"" + cols[i] + "\" opacity=\"0.75\"/>";
    s += "<text x=\"" + (20 + i * seg + seg / 2 - 1) + "\" y=\"" + (i % 2 === 0 ? 24 : 88) + "\" text-anchor=\"middle\">" + t + "</text>";
  });
  s += "<line x1=\"20\" y1=\"106\" x2=\"" + (W - 20) + "\" y2=\"106\" stroke=\"#666\" stroke-width=\"1.6\"/>";
  s += "<polygon points=\"" + (W - 20) + ",106 " + (W - 32) + ",101 " + (W - 32) + ",111\" fill=\"#666\"/>";
  s += "<text x=\"" + (W / 2) + "\" y=\"124\" text-anchor=\"middle\">wavelength decreases in this direction</text>";
  s += "</svg>";
  return s;
}

// ---- Cells C1: plant and animal cell diagrams (guide organelle set; wall outside membrane) ----
function s8CellSVG(kind){
  var plant = kind === "plant";
  var s = '<svg viewBox="0 0 640 340" width="100%" role="img" aria-label="Cell diagram" style="max-width:640px;background:#fbfdff;border:1px solid #b9c8d4;border-radius:8px">';
  function callout(x, y, tx, ty, letter){ return '<line x1="'+x+'" y1="'+y+'" x2="'+tx+'" y2="'+ty+'" stroke="#33475b" stroke-width="1.4"/><circle cx="'+tx+'" cy="'+ty+'" r="11" fill="#fff" stroke="#33475b" stroke-width="1.4"/><text x="'+tx+'" y="'+(ty+4)+'" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c2b33">'+letter+'</text>'; }
  if (plant){
    s += '<rect x="90" y="50" width="420" height="240" rx="26" fill="#eef7ee" stroke="#2e7d32" stroke-width="7"/>';
    s += '<rect x="104" y="64" width="392" height="212" rx="20" fill="#fdfdf5" stroke="#7cb342" stroke-width="2.5"/>';
    s += '<rect x="215" y="105" width="190" height="120" rx="55" fill="#dceefb" stroke="#5b84a8" stroke-width="2"/>';
    s += '<circle cx="165" cy="120" r="30" fill="#f3d9e8" stroke="#a04d7d" stroke-width="2"/>';
    s += '<ellipse cx="440" cy="95" rx="26" ry="12" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.6" transform="rotate(25 440 95)"/>';
    s += '<ellipse cx="150" cy="245" rx="26" ry="12" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.6" transform="rotate(-20 150 245)"/>';
    s += '<ellipse cx="455" cy="245" rx="20" ry="10" fill="#f6c9a0" stroke="#b06a28" stroke-width="1.6"/>';
    s += '<path d="M445 245 q10 -6 20 0" stroke="#b06a28" stroke-width="1.4" fill="none"/>';
    s += callout(86, 90, 45, 70, "A") + callout(112, 130, 45, 140, "B") + callout(168, 118, 45, 215, "C") + callout(310, 160, 580, 80, "D") + callout(438, 96, 580, 150, "E") + callout(452, 243, 580, 225, "F") + callout(350, 255, 580, 295, "G");
  } else {
    s += '<path d="M150 70 C 260 30, 430 45, 490 130 C 540 200, 470 290, 330 305 C 210 318, 110 270, 100 180 C 94 120, 110 90, 150 70 Z" fill="#fdf6ec" stroke="#b06a28" stroke-width="3"/>';
    s += '<circle cx="290" cy="165" r="42" fill="#f3d9e8" stroke="#a04d7d" stroke-width="2"/>';
    s += '<ellipse cx="420" cy="120" rx="22" ry="11" fill="#f6c9a0" stroke="#b06a28" stroke-width="1.6"/>';
    s += '<path d="M408 120 q12 -7 24 0" stroke="#b06a28" stroke-width="1.4" fill="none"/>';
    s += '<ellipse cx="180" cy="240" rx="17" ry="9" fill="#f6c9a0" stroke="#b06a28" stroke-width="1.6"/>';
    s += '<ellipse cx="415" cy="235" rx="26" ry="15" fill="#dceefb" stroke="#5b84a8" stroke-width="1.8"/>';
    s += '<ellipse cx="170" cy="110" rx="20" ry="12" fill="#dceefb" stroke="#5b84a8" stroke-width="1.8"/>';
    s += callout(128, 105, 45, 70, "A") + callout(288, 163, 45, 150, "B") + callout(350, 210, 45, 235, "C") + callout(418, 122, 580, 90, "D") + callout(413, 233, 580, 180, "E");
  }
  return s + '</svg>';
}

// ---- Cells C2: compound microscope diagram ----
function s8MicroscopeSVG(){
  var s = '<svg viewBox="0 0 640 360" width="100%" role="img" aria-label="Compound microscope diagram" style="max-width:640px;background:#fbfdff;border:1px solid #b9c8d4;border-radius:8px">';
  function callout(x, y, tx, ty, letter){ return '<line x1="'+x+'" y1="'+y+'" x2="'+tx+'" y2="'+ty+'" stroke="#33475b" stroke-width="1.4"/><circle cx="'+tx+'" cy="'+ty+'" r="11" fill="#fff" stroke="#33475b" stroke-width="1.4"/><text x="'+tx+'" y="'+(ty+4)+'" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c2b33">'+letter+'</text>'; }
  s += '<rect x="180" y="322" width="240" height="16" rx="4" fill="#90a4ae"/>';
  s += '<path d="M215 322 L215 130 Q215 105 245 100" stroke="#607d8b" stroke-width="16" fill="none"/>';
  s += '<rect x="238" y="38" width="26" height="120" rx="8" fill="#78909c" transform="rotate(14 250 98)"/>';
  s += '<rect x="252" y="22" width="34" height="20" rx="5" fill="#546e7a" transform="rotate(14 269 32)"/>';
  s += '<circle cx="292" cy="140" r="13" fill="#546e7a"/>';
  s += '<rect x="284" y="148" width="16" height="26" fill="#78909c"/>';
  s += '<rect x="200" y="196" width="170" height="10" fill="#78909c"/>';
  s += '<rect x="255" y="182" width="70" height="8" fill="#dceefb" stroke="#5b84a8"/>';
  s += '<circle cx="290" cy="240" r="11" fill="#546e7a"/>';
  s += '<circle cx="222" cy="205" r="15" fill="#90a4ae" stroke="#546e7a" stroke-width="2"/>';
  s += '<circle cx="222" cy="245" r="10" fill="#b0bec5" stroke="#546e7a" stroke-width="2"/>';
  s += '<ellipse cx="290" cy="290" rx="26" ry="9" fill="#ffe082" stroke="#b08900" stroke-width="1.6"/>';
  s += callout(272, 30, 90, 35, "A") + callout(288, 158, 90, 120, "B") + callout(330, 200, 90, 205, "C") + callout(224, 203, 520, 90, "D") + callout(224, 243, 520, 160, "E") + callout(288, 288, 520, 235, "F") + callout(212, 200, 520, 300, "G") + callout(300, 330, 120, 320, "H");
  return s + '</svg>';
}

// ---- Cells C3: labelled bar chart (animal heart rates and similar) ----
function s8BarSVG(labels, values, yLabel){
  var max = Math.max.apply(null, values) * 1.15, base = 285, top = 45, plotH = base - top;
  var s = '<svg viewBox="0 0 640 340" width="100%" role="img" aria-label="Bar chart" style="max-width:640px;background:#fff;border:1px solid #b9c8d4;border-radius:8px">';
  s += '<line x1="70" y1="'+base+'" x2="610" y2="'+base+'" stroke="#33475b" stroke-width="1.6"/><line x1="70" y1="'+top+'" x2="70" y2="'+base+'" stroke="#33475b" stroke-width="1.6"/>';
  s += '<text x="22" y="170" font-size="12" fill="#33475b" text-anchor="middle" transform="rotate(-90 22 170)">'+yLabel+'</text>';
  var bw = Math.min(64, 480 / values.length), gap = 500 / values.length;
  for (var i = 0; i < values.length; i++){
    var h = values[i] / max * plotH, x = 95 + i * gap;
    s += '<rect x="'+x+'" y="'+(base - h)+'" width="'+bw+'" height="'+h+'" fill="#7fb3d5" stroke="#2e6da4"/>';
    s += '<text x="'+(x + bw / 2)+'" y="'+(base - h - 6)+'" text-anchor="middle" font-size="12" font-weight="bold" fill="#1c2b33">'+values[i]+'</text>';
    s += '<text x="'+(x + bw / 2)+'" y="'+(base + 20)+'" text-anchor="middle" font-size="12" fill="#33475b">'+labels[i]+'</text>';
  }
  return s + '</svg>';
}

/* ----- bank-u1.js ----- */
// CRMARKS: s8-u1-cr-distribution-shift=3
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
// CRMARKS: s8-u1-cr-watershed=4
// CRMARKS: s8-u1-cr-range-shift=4
// Science 8 Unit 1 bank: Water Systems on Earth's Surface
// (SC8.1.1 to SC8.3.10), built Nov 15, 2026 to the Water Systems
// authoring spec. All entries are original and were written new
// for this app. Existing tests and question banks, including
// teacher tests, the MHR ExamView chapters 1 to 3, the WNLSD
// Unit 1 set, the core laboratories and the Undersea Adventure
// STSE, were reviewed only to gauge the expected depth and range
// of treatment.
// Guide discipline: ocean and fresh water are compared qualitatively
// (salinity, density, freezing point); no entry keys a memorized
// salinity or density value. The reviewed satellite item keyed to
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
      ["A single very cold winter season in one small region, with heavy snow and frozen lakes",
       "A period when ocean water freezes over completely across the whole surface of the ocean",
       "A short period of warming when a glacier melts back a small distance from its front edge"],
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
      ["Bay A, because deep water is colder, and cold water always holds more species than warm water does in any bay",
       "Bay B, because low nutrient levels keep algae from using up the oxygen in the water, so more species survive there",
       "Both bays equally, because sunlight and temperature are the only factors that matter for the species in a bay"],
      "Productivity depends on more than light and temperature. Upwelling brings nutrient-rich deep water to the surface, the nutrients feed plankton growth, and the plankton supports the food web above it. Bay B lacks that nutrient supply, so its productivity and species distribution are limited by it.",
      {});
  }
]), ["Follow the chain: nutrients, plankton, then everything that eats plankton.", "The guide names upwelling as the marine factor that feeds productivity."]);

/* ---------- SC8.1.4 Abiotic factors ---------- */

E("s8-u1-upwelling", 1, ["SC8.1.4"], 1, "var", varset([
  function () {
    return mcq("What is upwelling?",
      "The vertical movement of colder, denser, nutrient-rich water from below up to the ocean surface",
      ["The movement of warm surface water down through the water column to the ocean floor below",
       "The sideways movement of surface water pushed along by the wind blowing over the ocean",
       "The rise and fall of the ocean surface as the tides move in and out along the shore"],
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
    { d: "a long underwater mountain range where molten material rises, cools and hardens into new ocean floor", k: "Volcanic action and plate tectonics building new floor at a mid-ocean ridge", w: ["Erosion wearing down the outer edge of the continent over a long period of time", "Glaciation carving a deep drainage channel through the land as the ice moves", "Deposition of sediment settling slowly across the flat abyssal plain over time"] },
    { d: "a deep valley system on land that now carries a river's water toward the ocean, cut over thousands of years by moving ice and then by flowing water", k: "Glaciation and erosion shaping a continental drainage system", w: ["Plate tectonics raising a mid-ocean ridge along the middle of the ocean floor", "Volcanic action forming new ocean floor where the plates spread apart", "Deposition building up the outer edge of the continental shelf over a long period of time"] }
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
      ["Glaciation builds new ocean floor in the places where the plates of the crust move apart",
       "Glaciation deposits the sediment that settles out and forms the flat abyssal plain",
       "Glaciation creates the volcanic action that takes place all along the mid-ocean ridges"],
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
      ["Cold, dry air from the Labrador Current mixes with the cold water offshore and turns into fog banks",
       "Warm water from the Gulf Stream evaporates directly into fog that hangs over the Grand Banks",
       "Cold air sinks over the warm Gulf Stream and forms a layer of cloud right at the surface of the water"],
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
      ["Ocean currents move so fast that they carry the summer heat away from the coast before winter arrives",
       "Salt water freezes at a lower temperature, which keeps warming the air above the coast all winter long",
       "The ocean reflects sunlight back into the air over coastal towns, warming them in every season"],
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
      ["The Gulf Stream does bring the bergs south, and it matters because its warm water melts them quickly once they reach the coast",
       "The Labrador Current carries the bergs north from Antarctica; it matters because they arrive off the coast in the autumn instead",
       "Neither current is involved; the bergs drift south with the tides alone, which is why the viewing season stays so short each year"],
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
      ["Storm 1, because a small bay concentrates the wind's energy into a smaller area of water and builds the waves up there",
       "Storm 2, because how long the wind blows is the only factor that affects the size of the waves a storm produces",
       "All three storms equally, because the wind speed is exactly the same in each of the three storms compared here"],
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
      ["Red rock always erodes faster than grey rock, whatever the actual rock type or its resistance to waves",
       "Rock type makes no difference to erosion rates at all; only the energy of the waves striking the shore matters",
       "Cliffs erode slowly only because they stand taller than the other shores along the same stretch of coast"],
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
    { q: "How does a sand bar form?", k: "Waves and currents deposit sand in shallow water, building up a ridge of sediment", w: ["Waves erode a headland until a ridge of solid rock is left standing in the water", "A cave cuts through a headland and the roof collapses into the water below", "Wind blows dry beach sand into large piles above the high tide line on shore"] },
    { q: "How does a beach form and grow?", k: "Deposition: waves drop sand and sediment along a gently sloping shore faster than they remove it", w: ["Erosion: waves tear sand from the shore and pile it up in a ridge at the waterline", "Deposition: glaciers leave sand and sediment behind as they slowly retreat back from the coast", "Weathering: rock breaks down in place and the broken pieces stay piled where they fell"] },
    { q: "How does a shoal form?", k: "Sediment deposited in shallow water builds an area that is a hazard to boats", w: ["A stack collapses and its rubble spreads out across the shallow harbour entrance", "Tides carve a deep channel through the harbour that fills with sediment at low tide", "Volcanic action raises a new ridge on the ocean floor near the shore"] }
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
      ["Only universities conduct ocean research in Canada, and no government department at any level takes any part in the work at all, in any region of the country",
       "Ocean research in Canada is carried out entirely by private fishing companies working on the Atlantic and Pacific coasts, with no other bodies involved",
       "The institutions exist and employ many scientists, but they study only the freshwater lakes and rivers of Canada and never the oceans around its coasts"],
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
      ["Sonar cameras take clear photographs of the ocean floor even in total darkness far below the surface",
       "Sonar lets divers breathe safely at any depth they choose to descend to in the open ocean",
       "Sonar measures the salt content and the temperature of deep ocean water directly as it passes"],
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
      ["Sonar works only in shallow coastal water close to shore, where the old wire lines were never able to reach the bottom beneath the ship",
       "Sonar removes the need for a ship at all in depth work, because its signals can be sent out from the shore instead of from a vessel",
       "Wire lines were far more accurate than sonar ever is; sonar is used on ships today only because it is the cheaper of the two methods"],
      "A wire line gives one depth at one spot, slowly. Sonar times sound echoes continuously as the ship travels, producing a running profile of the floor. The improvement is in the amount and continuity of the evidence, which is what turned scattered soundings into basin maps.",
      {});
  }
]), ["Compare what each method delivers: one point at a time, or a continuous record?", "More evidence, gathered faster, is the improvement pattern in this strand."]);

E("s8-u1-tech-improve", 1, ["SC8.2.3"], 1, "var", varset([
  function () {
    return mcq("How have deep sea submersibles improved on diving for ocean research?",
      "Submersibles carry researchers and instruments far deeper and for longer than a diver's body and air supply allow",
      ["Submersibles are smaller, simpler and cheaper than the equipment that divers have to carry with them",
       "Submersibles replaced the need for any surface ship to support the research work done below",
       "Divers can now stay down just as long as submersibles can, using ordinary diving equipment"],
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
      ["Technology reduced overfishing, because freezer trawlers waste less of each catch, so fleets needed to catch far fewer fish to supply the same markets",
       "Overfishing was caused only by the behaviour of the fish themselves changing, and not by any change in fishing technology",
       "Factory freezer trawlers affected only the freshwater fisheries of the inland lakes and rivers of Canada"],
      "The guide limits the discussion to the impact of improved fishing technology: catch methods, fish-finding technology and vessel type. Factory freezer trawlers combine all three, catching and processing huge amounts at sea, and that capability is a recognized contributor to the decline of stocks such as cod.",
      {});
  }
]), ["The guide's focus is narrow here: improved fishing technology. Which option stays on that point?", "Bigger vessels, better finding, better catching: capability grew faster than the stocks."]);

E("s8-u1-invasive", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("The European green crab, a species not native to this province, is now established in Placentia Bay, and the violet tunicate has appeared in Belleoram. Which technology-related route best explains introductions like these?",
      "Oil tankers and other ships release bilge and ballast water carrying foreign organisms into native habitats",
      ["Aquaculture pens release farmed fish into the bay, and those escaped fish turn into crabs and tunicates over time",
       "Factory freezer trawlers carry the new species in their nets as they move from harbour to harbour along the coast",
       "Tidal power turbines carry the organisms through their passages from one bay into another bay nearby"],
      "The guide names this route directly: when oil tankers release their bilge water, foreign species can be introduced, endangering native habitats and organisms. The green crab in Placentia Bay and the violet tunicate in Belleoram are its local examples.",
      {});
  }
]), ["The species arrived by water that ships carry and release. Which water is that?", "Bilge and ballast water move organisms around the world."]);

E("s8-u1-aquaculture", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Mussel farms hang long lines of growing mussels in a bay. Which negative effect on the marine environment does the guide describe for this kind of aquaculture?",
      "Increased organic matter, called detritus rain, falls from the farms and accumulates on the sea floor",
      ["The mussels filter so much water as they feed that the salinity of the bay rises sharply within a single year",
       "The long lines block the ocean currents and change the climate of the whole region around the bay",
       "The farms attract factory trawlers into the bay, and the trawlers then overfish the wild stocks living there"],
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
      ["The project increases upwelling around the rig, which raises the productivity of the whole bay for years",
       "The project's lights attract fish to the waters around the rig, which increases the local catch there",
       "The project lowers the salinity of the ocean water all around the rig and across the nearby bay"],
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
      ["Stir the container briskly after each drop so the two waters mix evenly through the container",
       "Pour the fresh water in quickly from a height so that it plunges straight down to the bottom",
       "Heat the salt water first so the fresh water spreads evenly through the whole container at once"],
      "The lab investigates how fresh and salt water interact when they meet. The coloured fresh water must be added gently and observed as it settles: it stays near the top, because fresh water is less dense than salt water. Stirring, pouring hard or heating would destroy the very layering the procedure is meant to reveal.",
      {});
  }
]), ["The lab's whole point is watching where the fresh water settles. Which step protects that observation?", "Anything that mixes the waters ruins the investigation."]);

E("s8-u1-lab-extension", 1, ["SC8.3.1"], 2, "var", varset([
  function () {
    return mcq("Core Lab 1-2B ends by extending the result to environments where fresh water and ocean water meet. In an estuary, where river water flows into the ocean, what arrangement should the lab's result predict?",
      "The less dense fresh water from the river rides over the denser salt water it meets",
      ["The denser fresh water sinks down beneath the salt water that it meets in the estuary",
       "The two waters always mix instantly into one single uniform layer from top to bottom",
       "The salt water floats on top of the fresh water because it is the warmer of the two"],
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
      ["Carry the container in one hand and the thermometer in the other hand to save making a second trip",
       "Run the sample back to the bench as quickly as possible so the readings can be taken sooner",
       "Hold the thermometer by its bulb while walking across the room so it warms up ready for use at the bench"],
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
      ["As the water temperature increased through the summer, the dissolved oxygen increased in step with it",
       "Temperature and dissolved oxygen stayed in a fixed total added together all through the summer",
       "The data show no relationship at all, because three measurements are too few to read a trend from"],
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
      ["As salinity increases, the block itself becomes lighter, so it floats higher in the tank",
       "The block floats higher in the salt water simply because salt water is always the warmer water",
       "No conclusion is possible from the test, because the block was not weighed before it was floated"],
      "The same block, with the same mass, floats at different heights, so the difference must be in the water. Floating higher means the water is supporting it more strongly, which is what greater density does. The observations support the conclusion that salinity increases density, the same conclusion as the core lab, reached by a different observation.",
      {});
  }
]), ["The block never changes. What changes from tank to tank, and what must it be doing?", "Floating height is the evidence; density is the explanation."]);

/* ---------- SC8.3.6 Selecting methods and tools ---------- */

E("s8-u1-tool-choice", 1, ["SC8.3.6"], 1, "var", varset([
  function () {
    return mcq("For the water health test, a group must measure how cloudy a pond sample is, since turbidity is one of the abiotic factors being checked. Which tool choice fits the job?",
      "A turbidity tube or disc, which measures how far light penetrates the sample",
      ["A thermometer, read carefully in the shade at the edge of the pond beside the sample",
       "A pH test kit, used twice on the same sample to be sure of the cloudiness reading",
       "A dissolved oxygen meter, set over to its cloudiness scale to read the pond sample"],
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
      ["Capelin themselves cause the upwelling along the coast in the years when their numbers are plentiful in the bay and the catch is high",
       "The pattern proves that fishing boats simply catch more capelin in any year they choose to go out to sea more often and stay out longer",
       "Upwelling and capelin catches in the bay are unrelated to each other, because the survey data cover only ten years of the bay's history"],
      "The pattern repeats across ten years in the same direction, which supports an inference, and the mechanism is known: upwelling delivers nutrient-rich water, nutrients feed plankton, and capelin feed on plankton. An inference pairs the observed pattern with a mechanism that explains it.",
      {});
  }
]), ["A repeating pattern plus a known mechanism makes an inference. Look for the option that has both.", "Capelin eat plankton. What feeds the plankton?"]);

E("s8-u1-relationship-explain", 1, ["SC8.3.7"], 3, "var", varset([
  function () {
    return mcq("Along a coastline, the bays with the most reliable upwelling also have the densest populations of seabirds, even though the birds nest on land. Which explanation best accounts for the whole pattern?",
      "Upwelling brings nutrients to the surface, plankton flourish, fish gather to feed on the plankton, and the seabirds feed on the fish, so the birds concentrate where the chain begins",
      ["Seabirds prefer the smell of the cold upwelled water rising along the coast and gather in dense flocks along those bays for that reason alone, season after season",
       "Upwelling cools the layer of air above the bay, and seabirds of every kind choose to nest along the stretches of coast wherever the air above the water is coolest",
       "The pattern is only a coincidence in the survey results, because birds that nest on cliffs on land cannot possibly be connected to any processes taking place in the ocean"],
      "Explaining a pattern means tracing the relationship through every link. Upwelling supplies nutrients; nutrients grow plankton; plankton draws fish; fish feed the birds. The birds' distribution on land is the far end of a chain that starts with a water movement, which is the kind of relationship this strand's data work is meant to surface.",
      {});
  }
]), ["The birds are two steps removed from the water. Build the chain link by link.", "Nutrients, plankton, fish, birds: each link feeds the next."]);

/* ---------- SC8.3.8 Reporting on abiotic factors and evaluating processes ---------- */

E("s8-u1-threshold-judge", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return mcq("A freshwater sample from Core Lab 3-3B gives these results: dissolved oxygen 4.1 mg/L, phosphates 6 micrograms per litre, pH 6.8. Healthy ranges: dissolved oxygen 5 mg/L or greater; phosphates less than 10 micrograms per litre; pH 5 to 8.5. Which judgement is correct?",
      "The dissolved oxygen is below its healthy range, while phosphates and pH are within theirs, so the water may not support fish well",
      ["All three factors are within their healthy ranges, so the sample shows the water is healthy for fish",
       "The phosphates are above their healthy limit, and that is the main problem shown by this water sample",
       "The pH is outside its healthy range, and that is the main problem shown by this sample of water"],
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
      ["The process was sound from start to finish and needs no improvement, because they used the correct test for each factor and recorded each result carefully in their lab notebooks",
       "The only weakness in their whole process was that they took the sample in the afternoon rather than in the morning of the same day, when the pond's oxygen level might have read differently",
       "The process itself was weak in only one way that matters: they wrote the conclusion too confidently for the single set of readings they had taken at the pond on that one afternoon"],
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
      ["The two graphs together prove that the temperature rise caused the decline outright, so no other changing factor in the bay needs to be checked before concluding",
       "No relationship can ever be suggested from the graphs, because the two graphs measure different things, and different measures can never be compared in a useful way",
       "The decline in the fish population must itself have caused the temperature of the bay to rise, since the population graph falls steadily as the temperature graph rises over the same years"],
      "Comparing population graphs with temperature graphs and suggesting possible relationships is exactly the activity the guide sets. The suggestion gains strength from a mechanism, warm water holding less oxygen, and from fishing pressure being steady. But two trends moving together show a relationship, not proof: an honest suggestion names the mechanism and keeps the door open to other factors.",
      {});
  }
]), ["A suggested relationship needs two things: a mechanism, and honesty about what graphs cannot prove.", "The guide's own example chain runs through dissolved oxygen."]);

/* ---------- SC8.3.10 Strengths and weaknesses of ocean floor technologies ---------- */

E("s8-u1-tech-strength", 1, ["SC8.3.10"], 2, "var", varset([
  function () {
    return mcq("Which pairing gives a genuine strength and a genuine weakness of sonar for investigating the ocean floor?",
      "Strength: it maps the floor's shape across whole basins from a moving ship. Weakness: it shows shape, not what the floor is made of or what lives there",
      ["Strength: it photographs organisms living in total darkness. Weakness: it works only in shallow coastal water",
       "Strength: it carries researchers down to the floor itself. Weakness: it endangers its crew while working at great depth",
       "Strength: it measures the temperature of the water at any depth. Weakness: it cannot detect the ocean floor at all"],
      "Judging a technology means pairing what it does well with what it cannot do. Sonar's strength is coverage: continuous depth readings from a moving ship become basin maps. Its weakness is that echoes give shape only; composition and life on the floor need other technologies, such as sampling, photography and submersibles.",
      {});
  }
]), ["Check each half of the pairing separately: is the strength real, and is the weakness real?", "Sonar gives shape. It does not give composition or life."]);

E("s8-u1-tech-weakness", 1, ["SC8.3.10"], 1, "var", varset([
  function () {
    return mcq("Deep sea submersibles transformed ocean floor research, but they have a real limitation. Which statement names it?",
      "They are expensive, carry only a few people, and can stay at depth for a limited time, so they sample only tiny parts of the floor",
      ["They cannot descend below the edge of the continental shelf into the deep ocean basin beyond it",
       "They disturb the water around them so much that sonar cannot be used anywhere near them during a dive",
       "They can work only on days when the surface of the ocean is completely calm from shore to shore"],
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




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC8.1.2 x2 and SC8.1.4, and one 3-mark Level 2 CR entry
   closing Unit 1 Test 3's CR gap. SME-flagged. */

E("s8-u1-climate-glacier-effects", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Northern glaciers and ice sheets are melting faster than they did a century ago. Which is a direct environmental effect of this change?",
      "Sea level rises as meltwater reaches the oceans, flooding low coastal land",
      ["Ocean temperatures fall worldwide as the cold meltwater spreads through them and cools every current it meets", "Mountain valleys become drier as the glaciers store more water than before", "Coastal erosion stops completely once the extra water covers the shorelines"],
      "Melting land ice adds water to the oceans, so sea level rises and low coastal areas flood more often. <b>Sea level rises as meltwater reaches the oceans, flooding low coastal land</b>.", {});
  },
  function () {
    return mcq("During the last ice age, much of Canada lay under ice sheets kilometres thick. Which evidence of that time can still be seen today?",
      "Scratched and polished bedrock, and boulders dropped far from where their rock type formed",
      ["Tropical fossils in every northern lake bed, showing that the climate of the ice age was warmer than today", "Deep ocean trenches along the coast, cut by the weight of the moving ice sheets", "Volcanic ash layers in every soil, left behind when the ice sheets finally melted"],
      "Moving ice scoured the land, leaving scratches and polish on bedrock and dropping carried boulders (erratics) as it melted. <b>Scratched and polished bedrock, and boulders dropped far from where their rock type formed</b>.", {});
  },
  function () {
    return mcq("A coastal town in Newfoundland and Labrador notices its wharves flooding at high tide more often than 30 years ago. Which explanation best fits a warming climate?",
      "Melting land ice and warming, expanding seawater have raised sea level along the coast",
      ["The Moon's gravity has grown steadily stronger over the 30 years, pulling higher and higher tides into the harbour", "The town's land has risen quickly, pushing the wharves down toward the water", "Local rainfall alone has filled the harbour higher than it was a generation ago"],
      "Thermal expansion of warming seawater plus meltwater from land ice raises sea level, so high tides reach further. <b>Melting land ice and warming, expanding seawater have raised sea level along the coast</b>.", {});
  },
  function () {
    return mcq("Shrinking sea ice in the Arctic is a problem for polar bears mainly because",
      "the bears hunt seals from the ice, so less ice means a shorter hunting season and less food",
      ["the bears need the ice to drink from, and no other water source exists in the Arctic", "the open water is too cold for the bears to swim in once the ice has melted away", "the seals the bears eat live only under ice that is more than a season old"],
      "Polar bears hunt from sea ice; a shorter ice season means less hunting time and poorer feeding. <b>The bears hunt seals from the ice, so less ice means a shorter hunting season and less food</b>.", {});
  },
  function () {
    return mcq("Which human activity is the largest driver of the current warming of Earth's climate?",
      "Burning fossil fuels, which adds carbon dioxide and other greenhouse gases to the air",
      ["Cutting forests for farmland, which removes the shade that cools the ground below", "Building cities and highways, whose dark pavement absorbs extra heat from the sun all summer long", "Flying aircraft, whose trails reflect sunlight back into the upper atmosphere"],
      "Fossil fuel burning is the largest source of added greenhouse gases, which trap heat and warm the climate. <b>Burning fossil fuels, which adds carbon dioxide and other greenhouse gases to the air</b>.", {});
  }
]), ["A glacier's budget: snow added versus ice melted. Which side wins here?", "A winning accumulation side makes it advance; a winning melt side makes it retreat."]);

E("s8-u1-glacier-formation", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("A glacier forms in a mountain valley when",
      "more snow falls each winter than melts each summer, and the buried snow is compressed into ice",
      ["a river freezes solid from its surface all the way to its bed during one very cold winter season in the mountains", "rain falls on cold rock and freezes instantly into a thick sheet during a storm", "the valley fills with sea water that freezes during a long polar night in winter"],
      "Glaciers grow where snowfall accumulates year after year and compresses into ice faster than melting removes it. <b>More snow falls each winter than melts each summer, and the buried snow is compressed into ice</b>.", {});
  },
  function () {
    return mcq("A glacier is best described as",
      "a large mass of ice, formed from compacted snow, that moves slowly under its own weight",
      ["any ice that forms on the surface of a lake or river during the winter months", "a frozen waterfall on a cliff face that stays solid through the whole of the following summer and autumn", "a block of sea ice that has broken away from an ice shelf into the ocean"],
      "A glacier is land ice built from snow over many years, thick enough to flow slowly downhill. <b>A large mass of ice, formed from compacted snow, that moves slowly under its own weight</b>.", {});
  },
  function () {
    return mcq("As a glacier moves down a valley, it changes the valley's shape mainly by",
      "scraping and plucking rock from the valley floor and sides, widening it into a U shape",
      ["melting steadily as it goes and washing the valley walls away with the streams of meltwater running beneath it", "pushing loose soil ahead of it and piling the soil into hills across the valley", "freezing the valley walls solid so that no further weathering can change them"],
      "Glacial ice carrying embedded rock grinds the valley, turning a V-shaped river valley into a U-shaped one. <b>Scraping and plucking rock from the valley floor and sides, widening it into a U shape</b>.", {});
  },
  function () {
    return mcq("When a glacier retreats (melts back), the ridge of rock and debris it leaves across the valley is called",
      "a moraine",
      ["an esker, which is a ridge of sand left by a river under the ice", "a drumlin, which is a smooth hill shaped by ice moving over it", "a cirque, which is a bowl carved where the glacier first formed"],
      "Debris carried at the glacier's edge is dumped as a ridge, a moraine, when the ice melts back. <b>A moraine</b>.", {});
  }
]), ["Glaciers are built over many years, not in a single cold snap.", "Snow that survives the summer gets buried and compressed into ice."]);

E("s8-u1-distribution-abiotic", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return mcq("Cod are found in cold North Atlantic water but not in warm tropical seas. Which factor best explains this distribution?",
      "Water temperature: cod are adapted to cold water and cannot tolerate warm water for long",
      ["Water colour: cod avoid clear blue water and gather only where the water looks green and cloudy to them", "Moonlight: cod follow the phases of the Moon and avoid bright tropical nights", "Wave height: cod need the large waves that only cold northern storms produce"],
      "Species live where the abiotic conditions suit their adaptations; for cod that condition is cold water. <b>Water temperature: cod are adapted to cold water and cannot tolerate warm water for long</b>.", {});
  },
  function () {
    return mcq("Moose are common across Newfoundland's forests but absent from treeless Arctic tundra far to the north. Which abiotic factor most limits them there?",
      "The short, cold growing season, which cannot produce enough browse (shrubs and trees) to feed them",
      ["The low oxygen level of the tundra air at that latitude, which is too thin for a large heavy animal to breathe", "The absence of fresh water, because the tundra has no lakes or ponds at all in summer", "The bright summer daylight, which lasts too long for moose to get enough sleep"],
      "Distribution follows the conditions a species needs; moose need abundant browse, which the tundra's climate cannot grow. <b>The short, cold growing season, which cannot produce enough browse (shrubs and trees) to feed them</b>.", {});
  },
  function () {
    return mcq("Kelp forests grow only in shallow coastal water, never in the deep open ocean. Which abiotic factor sets this limit?",
      "Light: kelp must photosynthesize, and light fades with depth, so it can live only where light reaches",
      ["Salt: the deep ocean water is far too salty for kelp, which needs the fresher and calmer water found near shore", "Pressure: the weight of deep water crushes kelp before it can grow to the surface", "Temperature: deep ocean water is too warm for kelp, which needs cold shallow water"],
      "Kelp is a photosynthetic alga anchored in place; it is limited to the sunlit shallow zone. <b>Light: kelp must photosynthesize, and light fades with depth, so it can live only where light reaches</b>.", {});
  },
  function () {
    return mcq("After a dry summer, a farmer notices earthworms have vanished from the top layer of soil but are still found deeper down. Which abiotic factor drove them deeper?",
      "Soil moisture: earthworms must keep their skin moist, so they move down to where the soil is still damp",
      ["Soil colour: earthworms avoid the pale dry topsoil in summer and prefer the darker, richer soil in the layers below it", "Gravity: earthworms slowly sink through loose soil as the summer goes on each year", "Sunlight: earthworms migrate downward each day to follow the warmth of the sun"],
      "Earthworms breathe through moist skin and die if they dry out, so moisture controls where in the soil they can live. <b>Soil moisture: earthworms must keep their skin moist, so they move down to where the soil is still damp</b>.", {});
  },
  function () {
    return mcq("Salmon fry (young fish) survive in a river only where the water is cool and well oxygenated. A hot, dry August lowers the river and warms it. What is the most likely result?",
      "Fry die off in the warm, low-oxygen stretches, so the species' distribution in the river shrinks",
      ["Fry grow much faster in the warm water and spread quickly into every part of the river system that summer", "Fry move onto the riverbanks, where the air holds more oxygen than the water does", "Fry stop needing oxygen until the river cools again in the autumn rains"],
      "Warm water holds less dissolved oxygen, so an abiotic change (temperature and oxygen) contracts where the fry can survive. <b>Fry die off in the warm, low-oxygen stretches, so the species' distribution in the river shrinks</b>.", {});
  }
]), ["Look for the non-living factor that differs between the two places.", "The organism's distribution follows the factor it needs or tolerates."]);

E("s8-u1-cr-distribution-shift", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("Explaining a distribution shift (3 marks)\nFor many years, a small fish species lived only in the southern half of a lake, where the water is shallow and warm. After ten years of warming summers, the fish are now found throughout the lake, including the deep northern end. Explain this change in the species' distribution. Your answer must name the abiotic factor that changed, explain why it limited the fish before, and explain why the limit no longer holds. (3)",
      ["The abiotic factor is water temperature: the northern end of the lake used to stay too cold for the fish."],
      "Marking points (3): 1 mark for naming water temperature as the abiotic factor. 1 mark for explaining the earlier limit (the deep northern water stayed below the temperature the species can tolerate or reproduce in). 1 mark for explaining the change (warming summers raised the northern water into the species' tolerance range, so it could spread). Model answer: The fish were limited by cold water in the deep north end. As summers warmed, <b>the whole lake entered the temperature range the species can live in, so its distribution expanded</b>.", {});
  },
  function () {
    return textq("Explaining a distribution shift (3 marks)\nA wildflower that once grew only on the south-facing slope of a valley is now also found on the north-facing slope, after a series of warmer springs. Explain this change in the plant's distribution. Your answer must name the abiotic factor that changed, explain why it limited the plant before, and explain why the limit no longer holds. (3)",
      ["The abiotic factor is temperature (with sunlight): the north-facing slope used to be too cold and shaded for the plant."],
      "Marking points (3): 1 mark for naming temperature/sunlight exposure as the abiotic factor. 1 mark for explaining the earlier limit (the north-facing slope received less sun, so its soil stayed too cold for the plant to germinate or complete its growth). 1 mark for explaining the change (warmer springs raised slope temperatures into the plant's range). Model answer: The north-facing slope was too cold and shaded for the wildflower. Warmer springs have lifted its temperature enough that <b>the plant can now complete its life cycle on both slopes</b>.", {});
  },
  function () {
    return textq("Explaining a distribution shift (3 marks)\nOysters used to live only near the mouth of an estuary, where the water is saltiest. After years of heavier rainfall, oysters are found much further up the estuary, in water that used to be too fresh for them... A student says the oysters moved because the upper estuary got saltier. Correct the student's reasoning and explain the real change. Your answer must name the abiotic factor, state which way it changed, and explain the effect on the oysters. (3)",
      ["The abiotic factor is salinity, and heavier rainfall would lower it, not raise it, so the student's direction is wrong."],
      "Marking points (3): 1 mark for naming salinity. 1 mark for correcting the direction (more rainfall dilutes the estuary, lowering salinity upstream, so salinity alone cannot explain oysters spreading into fresher water; accept a reasoned alternative such as warming water temperatures extending the oysters' range, with the salinity change noted as working against it). 1 mark for tying the explanation to the oysters' tolerance limits. Model answer: Rainfall lowers salinity, so that change cannot be the cause; the spread is explained by a different abiotic change, such as warmer water, because <b>a species spreads only where every abiotic factor is inside its tolerance range</b>.", {});
  }
]), ["Name the abiotic factor first, then trace the cause and effect.", "Finish with a prediction that follows from the same factor changing further."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8-u1-cr-watershed closes Unit 1 Test
   1 (4 marks, Level 3). s8-u1-cr-range-shift closes Unit 1 Test
   3 (4 marks, Level 3). SME-flagged for the
   specialist pass. */

E("s8-u1-cr-watershed", 1, ["SC8.1.1", "SC8.1.2"], 3, "var", varset([
  function () {
    return textq("A town takes its drinking water from a reservoir in a valley. The reservoir is filled by streams flowing down from snow covered mountains. (a) Trace the path of water through the water cycle from the ocean to the reservoir, naming each process in order. (2 marks) (b) Winters in the region are becoming warmer, so more winter precipitation falls as rain instead of snow and the mountain snowpack is shrinking. Predict the effect of this change on the town's water supply and justify your prediction. (2 marks) (4 marks)",
      ["evaporation, condensation, precipitation as snow, storage in the snowpack, then meltwater run-off through streams into the reservoir", "less snow stored means less meltwater released in spring and summer, so the reservoir runs lower and the supply is less reliable"],
      "<b>Model answer:</b> (a) Energy from the Sun evaporates water from the ocean surface. The vapour cools and condenses into clouds, and the water falls as precipitation, in winter as snow on the mountains. The snow is stored in the snowpack, then melts in spring, and the meltwater runs off in streams that flow down into the reservoir. (b) With more rain and less snow, less water is stored on the mountains over winter. Rain runs off quickly in winter, when the reservoir may already be full, instead of being released slowly as meltwater through spring and summer. The reservoir therefore receives less inflow in the dry season, its level falls, and the town's supply becomes less reliable.<br><br><b>Marking points:</b> 1 mark for the processes named in a workable order (evaporation, then condensation, then precipitation). 1 mark for completing the path (precipitation stored as snowpack, then meltwater run-off through streams into the reservoir). 1 mark for the prediction (a lower or less reliable supply, especially in spring and summer). 1 mark for the justification (less water stored as snow, so less meltwater is released in the dry season).", {});
  },
  function () {
    return textq("A town takes its drinking water from a reservoir on a river. High above the town, a glacier feeds the river with meltwater all summer. (a) Trace the path of water through the water cycle from the ocean to the reservoir, naming each process in order. (2 marks) (b) The glacier has been retreating for many years and is now much smaller than it was. Predict the effect of this change on the town's water supply and justify your prediction. (2 marks) (4 marks)",
      ["evaporation, condensation, precipitation as snow, storage as glacier ice, then meltwater run-off through the river into the reservoir", "a smaller glacier stores less ice, so late summer meltwater flow falls and the reservoir supply becomes less reliable"],
      "<b>Model answer:</b> (a) Energy from the Sun evaporates water from the ocean surface. The vapour cools and condenses into clouds, and the water falls as precipitation, as snow on the high ground. The snow compacts into ice and is stored in the glacier, then melts in summer, and the meltwater runs off into the river and down to the reservoir. (b) A glacier is a store of fresh water that releases meltwater through the summer, when other inflows are low. As the glacier shrinks, the store of ice gets smaller, so by late summer there is less meltwater to release. The river's flow falls just when demand is highest, the reservoir is not refilled, and the town's supply becomes less reliable.<br><br><b>Marking points:</b> 1 mark for the processes named in a workable order (evaporation, then condensation, then precipitation). 1 mark for completing the path (precipitation stored as glacier ice, then meltwater run-off through the river into the reservoir). 1 mark for the prediction (reduced late summer inflow and a less reliable supply). 1 mark for the justification (the shrinking ice store has less meltwater left to release).", {});
  },
  function () {
    return textq("A town takes its drinking water from wells drilled into ground water beneath the town. (a) Trace the path of water through the water cycle from the ocean to the ground water the wells draw on, naming each process in order. (2 marks) (b) The region has had a long drought, followed by a season of short, intense storms. Predict the effect of this pattern on the town's water supply and justify your prediction. (2 marks) (4 marks)",
      ["evaporation, condensation, precipitation on land, then infiltration down through the soil to collect as ground water", "drought cuts recharge so the water table falls, and intense storm rain mostly runs off instead of soaking in, so the supply stays low"],
      "<b>Model answer:</b> (a) Energy from the Sun evaporates water from the ocean surface. The vapour cools and condenses into clouds, and the water falls as precipitation on the land. Some of that water soaks into the soil (infiltration) and collects below ground as ground water, which the wells draw up. (b) During the long drought there is little precipitation, so little water infiltrates and the ground water level (the water table) falls, and the wells yield less. The intense storms do not repair this: their rain falls faster than the soil can absorb it, so most of it becomes surface run-off, and can cause flooding, instead of soaking in to recharge the ground water. The town's supply therefore stays low even after the storms.<br><br><b>Marking points:</b> 1 mark for the processes named in a workable order (evaporation, then condensation, then precipitation). 1 mark for completing the path (precipitation infiltrating to collect as ground water that the wells draw on). 1 mark for the prediction (the supply falls during the drought and stays low after the storms). 1 mark for the justification (storm rain runs off faster than it can infiltrate, so ground water is barely recharged).", {});
  },
  function () {
    return textq("A town takes its drinking water from a reservoir. The hills above the reservoir are covered in forest, and streams from those hills fill the reservoir. (a) Trace the path of water through the water cycle from the ocean to the reservoir, naming each process in order. (2 marks) (b) The forest above the reservoir is cleared for development. Predict the effect of this change on the town's water supply and justify your prediction. (2 marks) (4 marks)",
      ["evaporation, condensation, precipitation on the hills, then a mix of infiltration to ground water and run-off in streams into the reservoir", "cleared land gives faster run-off, less infiltration and eroded soil in the streams, so inflows become flashier, the water murkier and the supply less steady"],
      "<b>Model answer:</b> (a) Energy from the Sun evaporates water from the ocean surface. The vapour cools and condenses into clouds, and the water falls as precipitation on the forested hills. Some water infiltrates and feeds ground water and springs, and the rest runs off in streams that flow down into the reservoir. (b) Tree roots and forest litter slow run-off and let water soak in. Once the forest is cleared, rain hits bare ground and runs off quickly, so stream inflows arrive in sudden surges instead of steadily, and less water infiltrates. The fast water also erodes soil into the streams, making the reservoir water murky and building up sediment that takes up storage space. The town's supply becomes less steady and poorer in quality.<br><br><b>Marking points:</b> 1 mark for the processes named in a workable order (evaporation, then condensation, then precipitation). 1 mark for completing the path (precipitation reaching the reservoir by infiltration and springs and by run-off in streams). 1 mark for the prediction (a less steady supply, with murkier water or lost storage to sediment). 1 mark for the justification (faster run-off and less infiltration once the forest cover and roots are gone, with erosion carried into the streams).", {});
  }
]), ["Follow one drop: ocean, air, hills or mountains, then the town's store.", "For part (b), ask what the change does to how much water is stored, and to when it arrives."]);

E("s8-u1-cr-range-shift", 1, ["SC8.1.3", "SC8.1.4"], 3, "var", varset([
  function () {
    return textq("A fish species in a lake used to feed in the shallow water near the surface. As summers have warmed, the fish are now caught mostly in deep water, and few remain near the surface in midsummer. (a) Identify the abiotic factor that changed and the limit it sets for the fish. (1 mark) (b) Explain why the fish have shifted into deeper water. (2 marks) (c) Predict one knock-on effect of this shift on another species in the lake. (1 mark) (4 marks)",
      ["water temperature sets an upper limit the fish can tolerate", "the surface water has warmed past that limit while deep water stays within the range, and the small animals the fish now eat in deep water decline under the extra feeding"],
      "<b>Model answer:</b> (a) The abiotic factor is water temperature. The fish can survive and feed only within a certain temperature range, so temperature sets an upper limit on where it can live. (b) The shallow surface water now warms in summer beyond the top of that range, so fish that stay there cannot survive the season. The deep water stays cool and within the fish's tolerance range all summer, so the population has shifted down into the deep water. (c) The fish now feed heavily on the small invertebrates living in the deep water, so those invertebrates decline (accept any plausible effect tied to the move, such as increased competition with a deep water species, or surface prey increasing once the fish leave).<br><br><b>Marking points:</b> 1 mark for naming water temperature and the limit it sets (an upper temperature the fish cannot tolerate). 1 mark for explaining that the surface water now exceeds that limit in summer. 1 mark for explaining that the deep water remains within the tolerance range, so the distribution shifts downward. 1 mark for a plausible knock-on effect on another species, tied to the shift.", {});
  },
  function () {
    return textq("Low shrubs used to grow only at the sheltered edge of the tundra. As the growing season has become longer and warmer, shrubs are now spreading across open tundra where only mosses and lichens grew before. (a) Identify the abiotic factor that changed and the limit it set for the shrubs. (1 mark) (b) Explain why the shrubs are now able to spread. (2 marks) (c) Predict one knock-on effect of this change on another species. (1 mark) (4 marks)",
      ["temperature, through the length of the growing season, limited the shrubs because the season was too short and cold to complete their growth", "a longer, warmer season lets shrubs grow and set seed on the open tundra, and their shade then suppresses the lichens that caribou depend on"],
      "<b>Model answer:</b> (a) The abiotic factor is temperature, acting through the length of the growing season. A shrub needs a long enough, warm enough season to grow and produce seed, and the tundra season was too short and cold, which set the limit. (b) The season is now longer and warmer, so shrubs on the open tundra can complete their growth and reproduce before winter. Seeds spread and new shrubs establish where the old season would have killed them, so the shrubs' distribution expands across the tundra. (c) The taller shrubs shade the low lichens, so lichens decline, and caribou that feed on lichens in winter find less food (accept any plausible effect tied to the spread, such as new shelter or food for tundra insects and birds).<br><br><b>Marking points:</b> 1 mark for naming temperature or growing season length and the limit it set (too short and cold to complete growth and reproduction). 1 mark for explaining that the longer, warmer season now lets shrubs complete their growth and set seed. 1 mark for explaining that this removes the old limit, so shrubs establish across the tundra. 1 mark for a plausible knock-on effect on another species, tied to the spread.", {});
  },
  function () {
    return textq("A shellfish bed used to thrive on a flat near the mouth of a river, inside a bay. After years of heavier rainfall and greater river flow, the water over the old flat has become fresher, the old bed has died out, and a new bed has established closer to the open sea. (a) Identify the abiotic factor that changed and the limit it sets for the shellfish. (1 mark) (b) Explain why the bed has shifted toward the sea. (2 marks) (c) Predict one knock-on effect of this shift on another species. (1 mark) (4 marks)",
      ["salinity sets a lower limit, since the shellfish need water salty enough to live in", "greater river flow lowered the salinity at the old flat below that limit, while the water nearer the sea stayed salty enough, so the bed shifted seaward into competition with species already living there"],
      "<b>Model answer:</b> (a) The abiotic factor is salinity. The shellfish can live only in water at or above a certain saltiness, so salinity sets a lower limit for them. (b) The greater river flow dilutes the bay water, so the salinity over the old flat has fallen below that limit and the shellfish there died out. Closer to the open sea the water is less diluted and stays salty enough, inside the tolerance range, so larvae settle and a new bed establishes there: the whole bed has shifted seaward, following the water salty enough for it. (c) At the new site the shellfish compete for space and food with the species already living there, so some of those species decline (accept any plausible effect tied to the move, such as predators gaining a new food source at the new site).<br><br><b>Marking points:</b> 1 mark for naming salinity and the limit it sets (a lower saltiness the shellfish cannot live below). 1 mark for explaining that greater river flow lowered the salinity at the old flat below that limit. 1 mark for explaining that water nearer the sea stayed within the tolerance range, so the bed shifted toward it. 1 mark for a plausible knock-on effect on another species, tied to the shift.", {});
  },
  function () {
    return textq("An insect pest that damages spruce trees used to be found only in the southern part of the province, because hard winter cold killed it each year further north. After a run of mild winters, the pest is now surviving the winter and damaging trees well to the north of its old range. (a) Identify the abiotic factor that changed and the limit it set for the pest. (1 mark) (b) Explain why the pest is now found further north. (2 marks) (c) Predict one knock-on effect of this change on another species or on productivity. (1 mark) (4 marks)",
      ["winter temperature set the limit, because cold winters killed the pest in the north", "milder winters no longer kill it, so it survives and breeds further north, and the damaged spruce trees grow more slowly, lowering the forest's productivity"],
      "<b>Model answer:</b> (a) The abiotic factor is winter temperature. Severe cold was the limit: winters in the north dropped to temperatures the pest could not survive. (b) Winters are now milder and no longer reach the killing temperature, so the pest survives the winter in northern areas, breeds there in spring, and its distribution expands northward year by year. (c) The pest feeds on spruce trees that have few defences or predators in the new area, so the trees are damaged and grow more slowly, and the productivity of the northern forest falls (accept any plausible effect tied to the expansion, such as harm to birds that nest in the damaged trees).<br><br><b>Marking points:</b> 1 mark for naming winter temperature and the limit it set (cold severe enough to kill the pest). 1 mark for explaining that milder winters no longer reach that killing temperature, so the pest survives. 1 mark for explaining that surviving pests breed in place, so the range expands north. 1 mark for a plausible knock-on effect on another species or on productivity, tied to the expansion.", {});
  }
]), ["Name the non-living factor first; every later step follows from it.", "Structure: factor and its limit, why the old home no longer suits, why the new home does, then who else is affected."]);

/* ----- bank-u2.js ----- */
// CRMARKS: s8-u2-cr-viscosity-test=3
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
// CRMARKS: s8-u2-cr-viscosity-design=4
// CRMARKS: s8-u2-cr-balloon=2
// Science 8 Unit 2 bank: Fluids (SC8.4.1 to SC8.6.10), built
// Nov 15, 2026 to the Fluids authoring spec. All entries are
// original and were written new for this app. Existing tests and
// question banks, including teacher tests and worksheets, the
// MHR ExamView chapters 7 to 9 and the core laboratories, were
// reviewed only to gauge the expected depth and range of
// treatment.
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
      ["A liquid's resistance to being compressed into a smaller volume than the one it already fills",
       "The speed at which a liquid evaporates away from the surface of an open container of it",
       "The force with which a liquid pushes upward on any object that is placed into the liquid"],
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
      ["Heated particles move more slowly and pack closer together, so the warmed honey slides along as one solid sheet",
       "Heating adds more particles to the honey as it warms, raising its concentration and lowering its viscosity that way",
       "Heating destroys the attraction between the particles completely, so the honey turns into a gas as it warms"],
      "The particle theory explains it in three steps: particles are always in motion, heating gives them more energy so they move faster and farther apart, and with more space between them there is less friction and a weaker pull between particles. Less internal friction means lower viscosity, so warmed honey flows faster.",
      {});
  }
]), ["Work through the particles: energy, spacing, friction, then viscosity.", "Faster, farther apart, less friction: viscosity falls."]);

E("s8-u2-concentration", 2, ["SC8.4.2"], 3, "var", varset([
  function () {
    return mcq("A dairy lists skim milk, 1 percent milk, 2 percent milk, whole milk and cream in order of increasing fat concentration. A student predicts their viscosities will follow the same order. Is the prediction sound, and why?",
      "Yes: higher concentration means more particles in a given volume, which raises the friction between particles and so raises viscosity",
      ["Yes, the prediction is sound as far as it goes, but only because cream happens to be a different colour from skim milk and the other products in the list",
       "No: concentration is a property that affects only gases in this way, and it never has any effect at all on the viscosity of liquids like milk",
       "No: a higher concentration of particles always lowers the viscosity of a liquid, whatever the liquid happens to be and whatever is dissolved in it"],
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
    { q: "The same substance is compared as a solid, a liquid and a gas. Using the particle theory, which statement about density is generally correct?", k: "The solid is generally the densest state, because its particles are packed closest together, and the gas is the least dense", w: ["The gas is generally the densest of the three states, because its particles are the ones that move the fastest of all", "All three states of the substance have exactly the same density as one another, because it is the same substance in each state", "The liquid state is always the densest of the three states, whatever substance is being compared in the test"] },
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
      ["27 g: the mass of a sample of a material does not depend at all on how much of the material there is",
       "54 g: the mass of a sample doubles whenever its volume increases at all, by any amount whatsoever",
       "2700 g: the mass of a sample grows with the square of its volume as the sample gets bigger and bigger"],
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
    { q: "An air-filled balloon is measured, placed in a freezer, and measured again: its circumference is smaller. What happened to the density of the air inside?", k: "It increased, because the same mass of air now occupies a smaller volume", w: ["It decreased, because cold air always weighs less than the same air does when it is warm", "It stayed exactly the same, because the mass of the air inside did not change at all", "It dropped all the way to zero, because the air inside contracted in the cold freezer"] },
    { q: "The alcohol in a thermometer rises up the tube on a warm day. Which statement explains this using volume and density?", k: "The warmed alcohol expands, taking more volume, so its density falls and it rises in the tube", w: ["The warmed alcohol contracts as it heats, so its density rises and pushes it up the narrow tube", "The glass tube shrinks in the heat of the day, squeezing the alcohol upward inside the tube", "The mass of the alcohol increases as it warms up, and the extra mass forces it upward in the tube"] },
    { q: "Power lines are strung loosely because they sag more in summer than in winter. What does the sagging show?", k: "The warmed metal expands, its volume increases, and its density decreases", w: ["The warmed metal contracts in the heat and grows denser as it does", "The lines gain extra mass as they sit in the summer heat", "Gravity itself grows stronger during the summer months"] }
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
      ["Ice floats only because it traps air bubbles inside it, and frozen water without those bubbles would sink to the bottom",
       "Ice is colder than the water under it, and cold objects always float on warmer ones beneath them",
       "Water is the exception because its liquid state is denser than the liquid state of every other substance known"],
      "Water breaks the general rule. As it freezes, its molecules arrange into a structure with more space between them: the volume increases while the mass stays the same, so the density decreases. Ice, at about 0.92 g/cm3 in round terms used in class, is less dense than liquid water and floats. The guide names water as the exception explicitly.",
      {});
  }
]), ["The exception is about spacing: freezing water spreads its molecules out.", "More volume, same mass, lower density: floating follows."]);

E("s8-u2-hot-air", 2, ["SC8.4.5"], 1, "var", varset([
  function () {
    return mcq("Why does the air inside a hot air balloon become less dense when it is heated?",
      "The heated particles move faster and spread farther apart, so each unit of volume holds less mass",
      ["Heating removes particles from the balloon by driving them out through the opening at its base",
       "The heated particles themselves shrink in size, leaving empty gaps between them that hold no mass",
       "The fabric of the balloon stretches and adds volume, while nothing inside the balloon changes at all"],
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
      ["Drying adds air into the wood as it seasons, and the added air increases the mass of the wood",
       "Drying heats the wood permanently, which keeps its particles spread out even after it cools again",
       "Drying changes the colour of the wood, and the colour change is what changes how the water supports it"],
      "Seasoning is a deliberate density change. Fresh wood holds a great deal of water; as it dries, that water leaves, the mass drops, the volume barely changes, and the density falls. Lower density means the wood floats higher, one reason builders season wood for watercraft.",
      {});
  }
]), ["What leaves the wood during drying, and which density ingredient does that change?", "Mass down, volume steady: density down."]);

E("s8-u2-density-life", 2, ["SC8.4.6"], 1, "gen", function () {
  var cases = [
    { q: "A submarine dives by opening its ballast tanks to the sea. What density change makes the dive happen?", k: "Water entering the tanks raises the submarine's average density above the seawater's, so it sinks", w: ["Air entering the ballast tanks lowers the submarine's average density, and that is what makes it sink", "The tanks heat the seawater as it enters, lowering the density of the water around the submarine", "The submarine's hull shrinks in volume until the whole vessel is denser than the seawater around it"] },
    { q: "A fish rises from deep water toward the surface by inflating its swim bladder with gas. What has the fish changed?", k: "Its volume increased while its mass barely changed, lowering its average density", w: ["Its mass increased as the bladder filled, which raised its average density instead of lowering it", "The density of the water around the fish decreased as the fish began to rise upward", "Its weight increased until it grew beyond the buoyant force acting on it in the water"] },
    { q: "Swimmers find it easier to float in the ocean than in a freshwater pond. What density fact explains this?", k: "Seawater is denser than fresh water, so it provides a greater buoyant effect for the same swimmer", w: ["Seawater is less dense than fresh water, so swimmers sink less deeply when they float in the ocean", "The ocean is much deeper than a pond, and that depth is what holds swimmers up at the surface", "The salt in the water makes the swimmer's own body less dense the moment it touches the skin"] }
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
    { q: "A wagon sits still on a slope because the pull down the slope is exactly matched by friction holding it. How are the forces on the wagon described?", k: "Balanced forces: equal and opposite, so the wagon does not accelerate", w: ["Unbalanced forces: the wagon is on a slope, so gravity must be winning", "Balanced forces: both of the forces acting on the wagon point in the same direction", "No forces of any kind act on a wagon that is sitting still and not moving at all"] },
    { q: "A dropped stone speeds up as it falls through the air toward the ground. How are the forces on the stone described?", k: "Unbalanced forces: gravity's pull is greater than the air's resistance, so the stone accelerates", w: ["Balanced forces: objects that are falling always have balanced forces acting on them", "Unbalanced forces: the resistance of the air is greater than the pull of gravity on the stone", "No forces at all act on the stone once it has left the hand that dropped it"] },
    { q: "A boat floats motionless at a dock, neither rising nor sinking. How are the forces on the boat described?", k: "Balanced forces: its weight and the buoyant force are equal and opposite", w: ["Unbalanced forces: floating always means the buoyant force is the greater one", "Balanced forces: no forces at all act on anything that is floating on the water", "Unbalanced forces: its weight is greater than the buoyant force, but only slowly"] }
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
      ["The buoyant force is greater than the rock's weight, so the rock rises up through the water",
       "The two forces are balanced and equal, so the rock floats suspended at that depth in the water",
       "The arrows in the diagram show the rock's mass and its volume, not the forces acting on it"],
      "Arrow length stands for force size. The downward arrow, the weight, is longer than the upward buoyant arrow, so the forces are unbalanced with weight winning: the rock sinks. That is the guide's rule for sinking.",
      {});
    q.figure = s8ForceSVG("sink");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a boat at the water's surface with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the boat's weight. What do the arrows tell you?",
      "The forces are balanced and equal, so the boat floats without rising or sinking",
      ["The weight is the greater of the two forces, so the boat is about to sink below the surface",
       "The buoyant force is the greater of the two, so the boat is rising up out of the water",
       "Equal arrows mean that no forces at all are acting on the boat while it floats there"],
      "The two arrows are the same length, so weight and buoyant force are equal and opposite: balanced forces. A floating object at rest is exactly that balance, the guide's rule for floating.",
      {});
    q.figure = s8ForceSVG("float");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a balloon under water with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the balloon's weight. What happens when the balloon is released, and why?",
      "It rises, because the buoyant force is greater than its weight, an unbalanced pair of forces",
      ["It sinks straight down, because its weight is greater than the buoyant force pushing up on it",
       "It stays exactly where it is under the water, because the two forces acting on it are balanced",
       "It moves sideways across the water, because both of the arrows point vertically up and down"],
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
      ["Force is measured in kilograms; on Earth, a mass of 1 kg exerts a force of exactly 1 newton",
       "Force is measured in pascals; in this system, 1 newton of force equals exactly 1 pascal",
       "Force and mass are both measured in the same unit, the gram, in every measurement taken in class"],
      "The newton is the unit of force. The guide's practical anchor: on Earth, roughly 100 grams of mass weighs about 1 newton. Kilograms and grams measure mass, and pascals measure pressure; keeping the units separate is part of keeping the ideas separate.",
      {});
  }
]), ["Force has its own unit. Which one, and what is the Earth anchor for its size?", "Newtons for force; grams and kilograms for mass."]);

/* ---------- SC8.4.8 Mass and weight ---------- */

E("s8-u2-mass-weight", 2, ["SC8.4.8"], 1, "gen", function () {
  var cases = [
    { q: "Which quantity describes the amount of matter in an object, and what is it measured with?", k: "Mass, measured with a balance in grams or kilograms", w: ["Mass, measured with a force meter and recorded in newtons in the lab", "Weight, measured with a balance in grams or kilograms", "Weight, measured with a force meter in grams"] },
    { q: "Which quantity describes the force of gravity pulling on an object, and what is it measured with?", k: "Weight, measured with a force meter (spring scale) in newtons", w: ["Mass, measured with a force meter and recorded in newtons in the lab", "Weight, measured with a balance and recorded in kilograms in the lab", "Mass, measured with a balance and recorded in newtons in the lab"] },
    { q: "A brick is weighed on Earth, then lowered into a tank of water, where its measured weight drops. What happened to its mass?", k: "Its mass stayed the same; only the measured weight changed, because the water's buoyant force supports part of it", w: ["Its mass decreased by exactly the amount of water it displaced as it was lowered under the surface", "Its mass increased while it was in the tank, because the brick absorbed water from around it", "Its mass became zero for the whole time it stayed submerged under the water in the tank"] }
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
      ["The astronaut is right to worry: a lower weight always means that some mass was lost from the suitcase somewhere on the journey up to the station",
       "The crewmate is right that nothing is missing from the suitcase, but only because the suitcase's mass dropped along with its weight on the way up",
       "Neither of them is right: an object's weight cannot change at all unless the suitcase is opened on the station and something is taken out of it"],
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
      ["It floats if it happens to be lighter, overall, than the container that is holding the water the object was placed in",
       "It sinks if it is made of any solid material at all, whatever the sizes of the forces acting on it happen to be",
       "It floats whenever its mass, measured in kilograms, is less than the temperature of the water it has been placed in"],
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
    { q: "Three balls of the same size, made of styrofoam, rubber and metal, are pushed under water and released at the same moment. Which description of what happens is correct?", k: "The styrofoam ball shoots up and floats high, the rubber ball rises and floats lower, and the metal ball sinks", w: ["All three balls float at exactly the same level in the water, because all three are the same size", "The metal ball floats the highest of the three, because it is the heaviest ball of the three", "The rubber ball sinks straight to the bottom, because rubber absorbs water the instant it touches it"] },
    { q: "A beach ball is very hard to hold under the water at a pool, and it leaps out when released. Which statement explains the beach ball?", k: "Its buoyant force when fully immersed is much greater than its small weight, so the unbalanced force drives it up", w: ["Its weight is greater than the buoyant force on it, so the ball escapes upward out of the water", "The pressure of the water cancels out its weight entirely, so there are no forces acting on the ball at all", "The air sealed inside the ball is attracted to the air above the pool, and that pull lifts the ball"] }
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
      ["The snowshoes reduce the person's actual weight for as long as they are wearing them on the snow",
       "The snowshoes increase the pressure on the snow, which packs the snow down harder under each step",
       "The snowshoes change the person's mass while they are worn, so gravity pulls down on them less"],
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
    { q: "A sealed syringe of air is pushed in, halving the air's volume while its temperature stays the same. What happens to the pressure of the air inside?", k: "It increases, because the particles are crowded into a smaller space and strike the walls more often", w: ["It decreases, because air that is compressed into a smaller space always loses pressure as it is squeezed", "It stays exactly the same, because the amount of air sealed inside the syringe did not change at all", "It drops all the way to zero and stays there until the plunger of the syringe is released again"] },
    { q: "A balloon filled with air is placed in warm sunlight, free to expand, and it grows larger. Its pressure stays about the same. Which relationship does this show?", k: "Increasing a gas's temperature increases its volume when pressure is held constant", w: ["Increasing a gas's temperature decreases its volume when pressure is held constant", "The temperature of a gas has no effect at all on the volume that the gas occupies", "The volume of the gas grew larger because its pressure doubled while it sat in the sunlight"] },
    { q: "A scuba tank is filled to high pressure at the dive shop. In particle terms, what is true of the air inside compared with air at ordinary pressure?", k: "Far more particles are packed into the same volume, which is why gases, unlike liquids, can be compressed this way", w: ["The particles of the air themselves have shrunk in size so that more of them fit inside the tank", "The air inside the tank has become a liquid under the very high pressure used to fill the tank", "The tank holds exactly the same number of particles as ordinary air, with each one under more force"] }
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
      ["The particles of a gas are much smaller in size than the particles of a liquid are, so far more of them fit into the same container",
       "The particles of a liquid repel one another so strongly that they cannot be pushed closer, while the particles of a gas attract one another weakly",
       "Gases weigh less than equal volumes of liquids do, so pressure applied from outside affects gases much more strongly than it affects liquids"],
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
    { q: "A mechanic chooses a thinner motor oil for a car that will run through a Newfoundland winter. Which fluid fact is behind the choice?", k: "Oil's viscosity rises as temperature falls, so a thinner grade is needed to keep it flowing in the cold", w: ["The density of oil falls all the way to zero in cold weather unless the oil is a thin grade", "Cold winter weather compresses the oil in the engine, so less oil is needed to fill it", "The pressure of the winter air forces thick, heavy oil out of engines parked in the cold"] },
    { q: "A cyclist pumps a tire up hard before a race. Which fluid behaviour is she using?", k: "Air is a compressible fluid, so more particles can be packed into the tire to raise its pressure", w: ["Air is an incompressible fluid, just like the liquids sealed inside a car's brake lines", "The viscosity of air drops sharply when it is pumped into a confined space like a tire", "The density of the tire itself decreases steadily as more and more air is added to it"] }
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
      ["The cold snap lowered the viscosity of the outdoor engine's oil so far that the thin oil ran off the moving parts entirely and left them unprotected",
       "The cold compressed the oil in the outdoor engine until it turned into a solid block, and a solid cannot flow to lubricate the engine's moving parts at start-up",
       "The cold of the January night changed the density of the outdoor engine's oil to zero, so the oil pump could not lift the oil up to the moving parts it protects"],
      "The observation, the property and the particle explanation line up: falling temperature raises a liquid's viscosity, the thickened oil resists flowing through the engine's passages, and parts that should be coated run nearly dry. It is why winter oil grades exist, and why the choice is a fluid dynamics decision, not a marketing one.",
      {});
  }
]), ["Poor circulation means high resistance to flow. What does cold do to that resistance?", "Trace it fully: temperature, particles, friction, viscosity, circulation."]);

/* ---------- SC8.5.2 Viscosity products and the Cleaning Fluids STSE ---------- */

E("s8-u2-products", 2, ["SC8.5.2"], 1, "gen", function () {
  var cases = [
    { q: "Which product exists in several grades mainly because of our understanding of viscosity?", k: "Motor oil, graded so engines can be matched with an oil that flows properly at their working temperatures", w: ["Window glass, which is graded for buildings by how fast the glass flows downward over time", "Table salt, which is graded for sale by how thickly the dry crystals pour from the box", "Bicycle tires, which are graded in sizes by the viscosity of the rubber they are made from"] },
    { q: "A shampoo is reformulated so it sits on the hand instead of running off, but still spreads through hair. What understanding guided the reformulation?", k: "Viscosity: adjusting the liquid's resistance to flow so it performs its function", w: ["Buoyancy: adjusting the average density of the shampoo so that it floats on water", "Pressure: adjusting the force that the walls of the shampoo bottle must withstand", "Density: adjusting the mass of shampoo that is packed into each bottle sold"] },
    { q: "Ketchup is designed to sit thick in the bottle yet flow when the bottle is shaken and squeezed. Which science understanding is the design built on?", k: "How a liquid's flow behaviour can be engineered for its intended function", w: ["How gases are compressed and stored inside sealed bottles under high pressure", "How buoyant forces act on solid objects that are placed in liquids of different densities", "How Pascal's law transmits pressure through a confined fluid from one end of the bottle to the other"] }
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
      ["They dissolve the surface that the dirt is sitting on, carrying all of the dirt away along with it",
       "They raise the viscosity of the water until the dirt floats off the surface entirely on its own",
       "They compress the grease on the surface until the grease evaporates away into the air"],
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
    { q: "Which example shows fluids science and technology affecting daily life in a community?", k: "A town's water system uses pumps and pressure to deliver clean water to homes at every height in the town", w: ["A town paints the outside of its water tower a new colour each spring to keep it looking fresh", "A school buys a set of new gym mats for its students to use during the winter term indoors", "A ferry company changes its sailing schedule for the holiday season at the end of the year"] },
    { q: "Which example shows fluids science and technology affecting daily life in a home?", k: "Hydraulic brakes use an incompressible liquid to carry the driver's foot force to all four wheels", w: ["A family chooses a larger television screen to mount on the wall of their living room at home", "A student sharpens a set of pencils at the sharpener before the start of class in the morning", "A baker sets the timer on the oven so that a cake baking inside it is not left in too long"] }
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
      ["The community is affected by the change only because the new equipment costs considerably more money than the older equipment it replaces in the centre",
       "Fluids science affects this coastal community only inside its own science classrooms, and nowhere else in the daily life of the people who live there",
       "The ferry's hydraulic steering counts as a technology in the community, but the brakes fitted in ordinary road vehicles do not count as a technology at all"],
      "Hydraulic systems transmit force through confined liquids, and they run the community's brakes, lifts and steering alike. Science and technology affect a community through the working systems it depends on, not only through laboratories and classrooms.",
      {});
  }
]), ["The common thread is one law working in several machines.", "Pascal's law is doing the work in every example named."]);

/* ---------- SC8.5.4 The science underlying technologies ---------- */

E("s8-u2-underlying", 2, ["SC8.5.4"], 1, "gen", function () {
  var cases = [
    { q: "A hydrometer floats higher in one liquid than in another and reads the liquid's density from how deep it sinks. Which science underlies this technology?", k: "Buoyancy and density: a floating object settles where the buoyant force balances its weight, deeper in less dense liquids", w: ["Viscosity: the sinking of the hydrometer is slowed down by liquids that are thick and slow flowing", "Pascal's law: the pressure in the liquid is transmitted through it and onto the hydrometer floating there", "Compressibility: the liquid under the hydrometer is squeezed smaller by the hydrometer's own weight"] },
    { q: "A liquid-in-glass thermometer is a technology built on which science?", k: "Thermal expansion: the liquid's volume and density change with temperature in a predictable way", w: ["Archimedes' principle: the liquid inside the tube is buoyed upward by the liquid surrounding it", "Pascal's law: pressure applied at one point is transmitted through the liquid to every other point", "Viscosity: warm liquid flows more easily, so it runs up the inside of the tube faster when heated"] },
    { q: "A dentist's chair rises smoothly when a small pedal is pressed. Which science underlies the technology?", k: "Pascal's law in a hydraulic system: pressure applied to a confined liquid is transmitted to a larger piston", w: ["Buoyancy: the chair floats upward on a hidden tank of water built into the base of the chair", "Thermal expansion: pressing the pedal warms the liquid in the chair until it expands and lifts it", "Density layering: the liquids inside the chair sort themselves into layers by their densities"] }
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
      ["The jacket works by raising the swimmer's average density above the water's; over years it absorbs water into its foam and grows lighter as it ages",
       "The jacket works by heating the water around the swimmer to keep them afloat; over years of use it gradually loses that heating ability and so buoys less",
       "The jacket works by increasing the swimmer's weight so they sit lower and steadier; over years the straps stretch and it fits too loosely to help"],
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
      ["Shape alone: any object that is shaped like a boat will float on water, whatever material it happens to be made of and however heavy it is",
       "Age: older wooden objects gradually absorb the ability to float from the water around them as the years go by on the water",
       "Surface area: objects with more surface area exposed to the water always float on it, whatever material they are made of and however dense it is"],
      "Neither the material nor the shape alone decides it. The waterlogged stick has soaked up water until its average density passes the water's; the dry boat's wood and air spaces keep its average below. The steel block is solid steel throughout, while the ship is mostly enclosed air: its average density, mass over total volume, is below the water's. One ratio explains all four cases.",
      {});
  }
]), ["Both pairs pit the same material against itself. What property can differ between two objects of the same material?", "Total mass over total volume, air spaces included."]);

/* ---------- SC8.5.7 Hydraulic technologies ---------- */

E("s8-u2-pascal", 2, ["SC8.5.7"], 1, "var", varset([
  function () {
    return mcq("What does Pascal's law state?",
      "Pressure applied to a confined fluid is transmitted equally in all directions throughout the fluid",
      ["Pressure in a fluid decreases steadily with depth, equally in all directions throughout the fluid",
       "A confined gas expands inside its container until its pressure falls all the way to zero",
       "The buoyant force on an object equals the weight of the fluid that the object displaces as it sinks in"],
      "Pascal's law is the foundation of hydraulics and pneumatics: squeeze a confined fluid at one point and the pressure increase is felt everywhere in the fluid, in all directions. That is what lets a small force at one piston produce a large force at another.",
      {});
  }
]), ["One law, one idea: pressure applied here is felt everywhere in the fluid.", "Do not confuse it with Archimedes' principle, which is about buoyancy."]);

E("s8-u2-hydraulic-pneumatic", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return mcq("Which comparison of hydraulic and pneumatic systems is correct?",
      "Hydraulic systems use a liquid, which is incompressible and keeps a definite volume; pneumatic systems use a gas, which is compressible and has an indefinite volume",
      ["Hydraulic systems use a gas, which is compressible and indefinite in volume; pneumatic systems use a liquid, which is not compressible",
       "Both systems use liquids as their working fluid; they differ only in the size of the pistons fitted inside them",
       "Hydraulic systems use a liquid that compresses easily under pressure, and that compressibility is what makes them strong"],
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
      ["Why is it that customers coming into the bicycle shop always say, when asked, that they prefer strong brakes on a bike?",
       "Who was the person who first invented hydraulic brakes for use on bicycles, and in what country did they do the work?",
       "Are hydraulic brakes on a bicycle simply better than the cable brakes they replace in every way that matters to a rider?"],
      "The practical problem is the spongy lever. The investigable version names a suspected cause that can be varied (air in the line, which compresses, unlike the liquid) and an effect that can be measured (the force at the pads). History and opinion questions do not test the problem.",
      {});
  }
]), ["Start from the shop's problem. The question must be able to test a cause.", "Air in the line is the testable suspect: it compresses, brake fluid does not."]);

/* ---------- SC8.6.2 Rephrasing questions in testable form ---------- */

E("s8-u2-rephrase", 2, ["SC8.6.2"], 1, "var", varset([
  function () {
    return mcq("A student's question reads: 'Is thick oil bad for engines?' Which rephrasing puts it in testable form?",
      "How does the temperature of motor oil affect the time it takes for 100 mL of the oil to drain through a funnel?",
      ["Why do the engines in cold climates dislike thick, slow-flowing oil so much in the winter?",
       "Is the winter grade of oil simply a better invention than the summer grade of oil overall?",
       "What is the single best motor oil in the whole world for every engine ever built anywhere?"],
      "Testable form names the variable to change (temperature), the variable to measure (drain time for a fixed volume), and the material under test. The original question's 'bad' cannot be measured; the rephrasing replaces it with quantities.",
      {});
  }
]), ["Testable means: a variable to change and a variable to measure, both named.", "Replace 'bad' with something a stopwatch can settle."]);

E("s8-u2-define-problem", 2, ["SC8.6.2"], 2, "var", varset([
  function () {
    return mcq("A team must define a practical problem clearly before investigating: their school's soap dispensers keep clogging in winter. Which statement defines the problem in a way an investigation can address?",
      "In cold months the dispensers deliver soap slowly or not at all; the team will test whether the soap's higher viscosity at low temperature is the cause and whether a lower-viscosity soap fixes it",
      ["The soap dispensers in the school washrooms are annoying in the winter months, and they really should work much better than they do for the students who use them daily",
       "Someone should simply invent a perfect new soap that never clogs any dispenser or drain anywhere in the school, whatever the weather or the season of the year happens to be",
       "The dispensers in the school clog in winter simply because winter is cold in this province, so there is nothing left for any investigation by the team to test or measure"],
      "A clearly defined practical problem states the observed difficulty, a testable suspected cause, and what a solution would look like. The first option does all three; the others complain, dream, or declare the answer before testing it.",
      {});
  }
]), ["A defined problem has three parts: the difficulty, a testable cause, and what fixing it means.", "Declaring the cause before the test is the trap option."]);

/* ---------- SC8.6.3 and SC8.6.9 Discrepancies in data ---------- */

E("s8-u2-discrepancy-flow", 2, ["SC8.6.3"], 2, "var", varset([
  function () {
    return mcq("In the flow rate lab, one group's honey time is 9 seconds while three other groups record 24, 26 and 25 seconds for the same honey through identical funnels. Which explanation for the discrepancy should be investigated first?",
      "A procedural difference in the fast group's trial, such as the funnel being warmed, the honey being a different sample, or the timing starting late",
      ["The viscosity of honey changes randomly from one minute to the next, so every group's result is equally valid as it stands",
       "The three slower groups must all have made exactly the same mistake in their trials with the honey",
       "The fast result should simply be averaged in with the others without question, since more data is always better in the end"],
      "A single result far from a cluster of agreeing results points first at the procedure behind it: something differed in that trial. Discrepancy work starts by hunting the difference (warmed funnel, different honey, timing error), not by discarding or blindly averaging the odd value.",
      {});
  }
]), ["Three groups agree and one is far off. Where does a scientist look first?", "One odd trial usually has one odd cause in how it was run."]);

E("s8-u2-discrepancy-density", 2, ["SC8.6.9"], 3, "var", varset([
  function () {
    return mcq("Four groups measure the density of the same aluminum bar. Three report 2.7 g/cm3. The fourth reports 3.4 g/cm3 and offers two explanations: (1) their bar was a different alloy; (2) they read the graduated cylinder's level from above instead of at eye level, under-recording the volume. The bars were all cut from one sheet. Which evaluation is strongest?",
      "Explanation (2) is the one to act on: the shared source rules out a different alloy, and under-recording volume inflates the calculated density in exactly the direction observed, so the group should re-measure at eye level",
      ["Explanation (1) is the one to act on first, because any metal bar in the set can secretly turn out to be made of a different alloy than the rest of the bars cut for the class",
       "Both explanations offered by the fourth group are equally likely to be right, so the group's reported result should simply stand as it is in the class data, with no re-measuring done",
       "Neither explanation matters here: a density discrepancy of this size should simply be deleted from the class data set without any further checking by the group or the teacher"],
      "Weighing explanations means testing them against the facts and the direction of the error. One sheet rules out a different alloy. A volume read too small makes m/V too large, which matches the high result exactly. The strongest evaluation names the explanation that fits both the facts and the arithmetic, and prescribes the re-measurement.",
      {});
  }
]), ["Test each explanation twice: does it fit the facts, and does it push the number the way the number actually moved?", "Too-small volume makes density too big. That direction match is decisive."]);

/* ---------- SC8.6.4 Compiling and displaying data in a bar graph ---------- */

E("s8-u2-bargraph", 2, ["SC8.6.4"], 3, "var", varset([
  function () {
    var q = mcq("A group measured flow times for four liquids and displayed them in the bar graph shown. Their lab partner claims the graph proves Liquid B is the most viscous because its bar is 'in the middle.' Which evaluation of the display and the claim is correct?",
      "The bar graph is an appropriate display for comparing separate liquids, but the claim misreads it: the most viscous liquid is the one with the longest flow time, Liquid D",
      ["The partner's claim is correct as it stands, because the middle bar in any bar graph always represents the extreme value in the data",
       "The bar graph is the wrong display for this data; only a line graph can ever be used to compare the flow times of separate liquids",
       "The graph itself proves nothing at all, because measured flow times cannot be displayed in any graphical form for comparison"],
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
      ["A line graph, because all data collected in science must be drawn as lines on a graph",
       "A circle graph, because the five separate flow times can be added together to make a whole",
       "No graph at all, because times that are measured in seconds cannot be shown on any graph"],
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
      ["Drop the stone into a full beaker of water and then weigh the stone a second time while it is still wet",
       "Measure the stone's length, its width and its height with a ruler and multiply the three together",
       "Float the stone on the surface of the water in the cylinder and read off the level where the stone sits at rest"],
      "Displacement works because the submerged stone pushes aside its own volume of water. The rise in level, final minus initial, is that volume. The stone must be fully submerged and lowered gently so no water splashes out; a ruler cannot capture an irregular shape, and a stone does not float.",
      {});
  }
]), ["The volume is the rise. Which option actually measures a rise?", "Fully submerged, gently lowered, subtract the levels."]);

E("s8-u2-displacement-error", 2, ["SC8.6.8"], 3, "var", varset([
  function () {
    return mcq("A group determines a metal cube's volume by displacement and gets 14 mL, but calculating from the cube's measured sides gives 27 cm3. Their notes say the cube 'stuck out of the water a little' in the cylinder, which was also too narrow, so the cube wedged against the sides. Which judgement best evaluates their displacement result?",
      "The displacement value is invalid: the cube was not fully submerged, so it displaced less than its full volume, and the wedging made it worse; they need a wider container and full submersion",
      ["The displacement value must be the better one, because water never lies about volume, so the measurements of the cube's sides must be the wrong ones",
       "The two values the group obtained should simply be averaged together to give the true volume of the cube",
       "The difference between the two values is unimportant, because the volume figure does not affect the density calculation that the group does next with it"],
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




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC8.4.2, SC8.4.6, SC8.4.8, and one 3-mark Level 2 CR entry
   closing Unit 2 Test 1's CR gap. SME-flagged. */

E("s8-u2-viscosity-factor-judge", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("On a cold morning, a bottle of dish soap pours much more slowly than it did in a warm kitchen the night before. What changed the soap's viscosity?",
      "The lower temperature raised its viscosity: its particles move more slowly and resist flowing",
      ["The cold made the soap expand, and a larger volume of liquid always flows more slowly", "The soap absorbed extra water from the cold air in the room overnight, thickening it slowly from the outside in", "The bottle's shape changed in the cold, narrowing the opening the soap pours through"],
      "Cooling a liquid raises its viscosity because its particles have less energy to slide past each other. <b>The lower temperature raised its viscosity: its particles move more slowly and resist flowing</b>.", {});
  },
  function () {
    return mcq("A cook stirs a spoon of flour into a thin soup and keeps it simmering. The soup gradually becomes noticeably thicker. Which factor raised its viscosity?",
      "Concentration: adding flour increased the amount of suspended material the liquid carries",
      ["Temperature alone: simmering on the stove always thickens any soup, no matter what is or is not added to it", "Colour: the soup became paler as it cooked, and paler liquids are more viscous", "Time alone: any liquid left standing in a pot becomes thicker as it ages"],
      "Adding suspended solids raises a liquid's concentration and with it its viscosity. <b>Concentration: adding flour increased the amount of suspended material the liquid carries</b>.", {});
  },
  function () {
    return mcq("Two samples of the same motor oil are tested. Sample A is at 10 \u00B0C and sample B is at 60 \u00B0C. Which sample has the lower viscosity, and why?",
      "Sample B: at the higher temperature its particles move faster and slide past each other more easily",
      ["Sample A: cold oil particles pack tightly and slip past each other without any resistance", "Both samples are exactly equal: temperature changes a liquid's volume and colour but never how easily it flows", "Sample B: heating breaks the oil into a gas, and gases always flow faster than liquids"],
      "Viscosity falls as temperature rises, because the particles gain energy and move past each other more freely. <b>Sample B: at the higher temperature its particles move faster and slide past each other more easily</b>.", {});
  },
  function () {
    return mcq("A shampoo maker wants a new shampoo to pour more slowly from the bottle without changing its cleaning ingredients. Which change would raise its viscosity?",
      "Adding a thickener to raise the concentration of dissolved and suspended material in it",
      ["Warming the shampoo bottle on a sunny shelf so that the shampoo stays permanently thinner while it sits there", "Shaking air bubbles into the shampoo so that it takes up more room in the bottle", "Colouring the shampoo darker, because darker liquids resist flowing more strongly"],
      "Viscosity can be raised by increasing concentration (a thickener) or by cooling; warming does the opposite. <b>Adding a thickener to raise the concentration of dissolved and suspended material in it</b>.", {});
  },
  function () {
    return mcq("Maple sap collected in early spring flows like water, but the finished maple syrup pours slowly. What is the main reason for the difference?",
      "Boiling removed most of the water, so the syrup is a far more concentrated sugar solution",
      ["The finished syrup is colder than the sap was when collected, and cold alone accounts for all of the change in it", "The syrup's sugar particles grew larger during boiling and now jam against each other", "The sap contained air bubbles that made it flow faster while it was in the tree"],
      "Evaporating water concentrates the sugar, and higher concentration means higher viscosity. <b>Boiling removed most of the water, so the syrup is a far more concentrated sugar solution</b>.", {});
  }
]), ["Viscosity is resistance to flow; check what changed between the two trials.", "Warming a liquid lowers its viscosity; concentrating it raises it."]);

E("s8-u2-density-everyday", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("In a lava lamp, blobs of wax rise when the lamp warms and sink when they cool near the top. What makes a blob rise?",
      "Heating lowers the wax's density below that of the surrounding liquid, so it floats upward",
      ["Heating makes the wax heavier for its size than the liquid around it, so the liquid pushes it up out of the way", "The lamp's light pushes the warm blobs upward by the pressure of its rays on them", "Air bubbles form inside the warm wax and carry it to the top of the lamp"],
      "A substance floats in a liquid when its density is lower; heating expands the wax and lowers its density. <b>Heating lowers the wax's density below that of the surrounding liquid, so it floats upward</b>.", {});
  },
  function () {
    return mcq("A hot air balloon rises when the burner heats the air inside the envelope. Why does heating the air lift the balloon?",
      "The heated air expands, so its density drops below the density of the cooler air outside",
      ["The heated air inside becomes heavier than the outside air around the balloon and pulls the whole balloon upward", "The burner burns away the air's mass, leaving the envelope with nothing inside it", "The flame's upward draft carries the balloon with it as the hot gases escape"],
      "Expanding lowers the air's density; the balloon rises because the air inside is less dense than the air it displaces. <b>The heated air expands, so its density drops below the density of the cooler air outside</b>.", {});
  },
  function () {
    return mcq("Oil and vinegar salad dressing separates in the bottle, with the oil always on top. What does this show about the two liquids?",
      "The oil is less dense than the vinegar, so it floats on it, and the two do not mix",
      ["The oil is more dense than the vinegar, so it is pushed up by the heavier liquid", "The oil layer forms on top because the bottle was filled in that order at the factory", "The vinegar evaporates from the bottom of the bottle, leaving the oil floating on air"],
      "Liquids that do not mix arrange themselves by density, the least dense on top. <b>The oil is less dense than the vinegar, so it floats on it, and the two do not mix</b>.", {});
  },
  function () {
    return mcq("A hydrometer floats higher in a concentrated salt solution than in pure water. What does the higher floating show?",
      "The salt solution is denser than pure water, so it buoys the hydrometer up further",
      ["The salt solution is less dense than pure water, so the hydrometer sinks into it less", "The salt makes the hydrometer itself lighter, so it rests higher in any liquid", "The hydrometer expands in salt water, taking up more room and floating higher"],
      "A floating object sits higher in a denser liquid; hydrometers use this to measure density. <b>The salt solution is denser than pure water, so it buoys the hydrometer up further</b>.", {});
  },
  function () {
    return mcq("Ice floats on a pond in winter, and the water below stays liquid, letting fish survive. Which property of water makes this possible?",
      "Ice is less dense than liquid water, a rare case of a solid floating on its own liquid",
      ["Ice is more dense than the liquid water below it, so it is held up entirely by the pressure of the water beneath it", "The pond's water turns to ice from the bottom up, leaving the top layer liquid", "Fish warm the water below the ice with their bodies through the whole winter"],
      "Water expands as it freezes, so ice is less dense than the liquid and floats, insulating the water below. <b>Ice is less dense than liquid water, a rare case of a solid floating on its own liquid</b>.", {});
  }
]), ["Floating and sinking compare the object's average density with the liquid's.", "If the liquid's density rises past the object's, the object floats."]);

E("s8-u2-mass-weight-places", 2, ["SC8.4.8"], 2, "gen", function () {
  var places = [["Earth", 9.8], ["the Moon", 1.6], ["Mars", 3.7], ["Jupiter", 24.8]];
  var m = pick([5.0, 10.0, 12.0, 20.0, 25.0, 40.0, 60.0]);
  var pi = ri(0, 3), pl = places[pi];
  var mode = ri(0, 1);
  function sf(x) { return String(Math.round(x * 10) / 10); }
  if (mode === 0) {
    var w = m * pl[1];
    var wrongs = [sf(m * 9.8), sf(m), sf(w * 2)].filter(function (x) { return x !== sf(w); });
    while (wrongs.length < 3) wrongs.push(sf(w + wrongs.length * 3 + 1));
    return mcq("An astronaut's tool kit has a mass of " + sf(m) + " kg. What is its weight on " + pl[0] + ", where the gravitational field strength is " + pl[1] + " N/kg?",
      sf(w) + " N", wrongs.slice(0, 3).map(function (x) { return x + " N"; }),
      "Weight = mass \u00D7 gravitational field strength = " + sf(m) + " kg \u00D7 " + pl[1] + " N/kg = <b>" + sf(w) + " N</b>. The mass stays " + sf(m) + " kg everywhere; only the weight changes with the place.", { m: m, place: pl[0] });
  }
  return mcq("An astronaut travels from Earth to " + pl[0] + " (gravitational field strength " + pl[1] + " N/kg) with a " + sf(m) + " kg sample case. Which statement is correct?",
    "Its mass stays " + sf(m) + " kg, but its weight changes because gravity differs there",
    ["Its mass changes to match the new gravity, but its weight stays exactly the same", "Both its mass and its weight stay exactly the same as they were on Earth", "Its mass becomes zero in space, so the case has no weight anywhere at all"],
    "Mass is the amount of matter and does not change with location; weight is the gravitational force on that mass and does change. <b>Its mass stays " + sf(m) + " kg, but its weight changes because gravity differs there</b>.", { m: m, place: pl[0] });
}, ["Mass is the amount of matter and never changes with place.", "Weight is mass times the local gravity; recompute it for the new place."]);

E("s8-u2-cr-viscosity-test", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("Explaining a viscosity result (3 marks)\nA class times how long steel balls take to fall through three liquids in identical tubes: vegetable oil 4 s, glycerin 11 s, and liquid dish soap 7 s. (a) Rank the liquids from lowest to highest viscosity, and explain what the fall times show. (1) (b) The class repeats the test with the glycerin warmed to 40 \u00B0C and the ball falls in 6 s. Explain why warming changed the result. (1) (c) State ONE variable, other than temperature, that the class had to keep the same for the comparison to be fair, and why. (1)",
      ["(a) Vegetable oil (lowest), then dish soap, then glycerin (highest): the slower the ball falls, the more the liquid resists flowing around it."],
      "Marking points (3): (a) 1 mark for the correct order with the reasoning that a slower fall means higher viscosity. (b) 1 mark for the particle explanation: warming gives the glycerin's particles more energy, so they slide past each other and the ball more easily, lowering the viscosity. (c) 1 mark for a controlled variable with a reason (same ball size and mass, same tube, same volume/depth of liquid, same drop method). Model answer: Warming lowered the glycerin's viscosity because <b>its particles gained energy and moved past each other more easily</b>.", {});
  },
  function () {
    return textq("Explaining a viscosity result (3 marks)\nA mechanic pours two engine oils through a funnel at \u221210 \u00B0C. Oil A drains in 30 s; Oil B takes 95 s. At 20 \u00B0C both drain in about 20 s. (a) Which oil has the higher viscosity at \u221210 \u00B0C, and how do the times show it? (1) (b) Explain, using the particle theory, why both oils flow more easily at 20 \u00B0C. (1) (c) Explain why a car owner in a cold climate should care about an oil's viscosity at low temperature. (1)",
      ["(a) Oil B: it took much longer to drain, so it resisted flowing more at \u221210 \u00B0C."],
      "Marking points (3): (a) 1 mark for Oil B with the drain-time reasoning. (b) 1 mark for the particle explanation: at higher temperature the particles have more kinetic energy and slide past each other more easily, so viscosity falls. (c) 1 mark for a practical consequence (a very viscous cold oil circulates slowly at startup, so engine parts are poorly lubricated and wear faster; or the starter must work harder). Model answer: Both oils thin as they warm because <b>their particles move faster and slide past each other more easily</b>.", {});
  },
  function () {
    return textq("Explaining a viscosity result (3 marks)\nA student compares honey from the fridge (straight from a 4 \u00B0C shelf) with honey kept in a warm cupboard (22 \u00B0C). The fridge honey takes 48 s to pour off a spoon; the cupboard honey takes 9 s. (a) State which honey has the higher viscosity and the evidence for it. (1) (b) Explain the difference using the particle theory. (1) (c) The student then stirs a spoon of water into a third sample of fridge honey and it pours in 20 s. Name the factor, other than temperature, that changed the viscosity, and explain its effect. (1)",
      ["(a) The fridge honey: it poured much more slowly, so it resisted flowing more."],
      "Marking points (3): (a) 1 mark for the fridge honey with the pour-time evidence. (b) 1 mark for the particle explanation (cold particles move slowly and resist sliding; warm particles move faster and slide easily). (c) 1 mark for concentration: diluting the honey lowered the concentration of sugar, so the mixture's viscosity fell. Model answer: The water lowered the honey's viscosity by <b>reducing the concentration of the sugar solution</b>.", {});
  }
]), ["A fair test changes one variable and holds the rest identical.", "State the expected result and tie it to how viscosity behaves."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8-u2-cr-viscosity-design closes Unit 2 Test
   1 (4 marks, Level 3). s8-u2-cr-balloon closes Unit 2 Test
   2 (2 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8-u2-cr-viscosity-design", 2, ["SC8.4.1", "SC8.4.2"], 3, "var", varset([
  function () {
    return textq("Design a fair test to compare the viscosity of three liquids: honey, motor oil and water. (a) Describe the apparatus you would use and the procedure you would follow. (1 mark) (b) State the variable you would change and the variables you would control, including temperature. (2 marks) (c) State what result would count as evidence that one liquid is more viscous than another, and explain how heating one of the liquids would change the outcome and why. (1 mark) (4 marks)",
      ["time a fixed volume of each liquid flowing through the same funnel, changing only the liquid and controlling volume, apparatus and temperature", "the longest flow time is the evidence for the highest viscosity, and heating lowers viscosity because the particles gain energy and slide past each other more easily"],
      "<b>Model answer:</b> (a) Apparatus: the same funnel held over a measuring cylinder, a stopwatch and a supply of each liquid. Procedure: pour 100 mL of one liquid into the funnel and time how long it takes to pass through into the cylinder; rinse and dry the funnel, then repeat with each of the other liquids, and repeat each test to check the times. (b) The variable changed is the liquid itself (honey, motor oil, water). Variables controlled include the volume of liquid (100 mL each time), the same funnel and cylinder, the same start and stop rule for timing, and temperature: all three liquids are kept in the same room so they are tested at the same temperature. (c) The liquid with the longest flow time has resisted flowing the most, so the longest time is evidence of the highest viscosity. Heating one liquid, such as the honey, would shorten its flow time: heat gives its particles more energy, they move faster and slide past each other more easily, so its viscosity falls.<br><br><b>Marking points:</b> 1 mark for workable apparatus and procedure (a timed flow comparison using identical equipment). 1 mark for the changed variable correctly stated (the liquid). 1 mark for at least two controlled variables, including temperature kept the same for all liquids. 1 mark for the evidence (longest flow time means highest viscosity) together with the heating effect (viscosity falls on heating, because the particles gain energy and slide past each other more easily).", {});
  },
  function () {
    return textq("Design a fair test to compare the viscosity of three liquids: shampoo, glycerol and cooking oil. (a) Describe the apparatus you would use and the procedure you would follow. (1 mark) (b) State the variable you would change and the variables you would control, including temperature. (2 marks) (c) State what result would count as evidence that one liquid is more viscous than another, and explain how heating one of the liquids would change the outcome and why. (1 mark) (4 marks)",
      ["time the same steel ball falling through a fixed depth in identical cylinders of each liquid, changing only the liquid and controlling ball, depth, volume and temperature", "the slowest fall is the evidence for the highest viscosity, and heating lowers viscosity because the particles gain energy and slide past each other and the ball more easily"],
      "<b>Model answer:</b> (a) Apparatus: three identical tall measuring cylinders, the same small steel ball, a ruler and a stopwatch. Procedure: fill each cylinder with a different liquid to the same depth, drop the ball at the surface, and time how long it takes to fall between two marks a fixed distance apart; repeat each liquid and compare the times. (b) The variable changed is the liquid itself (shampoo, glycerol, cooking oil). Variables controlled include the same ball, the same cylinder size, the same volume and depth of liquid, the same fall distance timed, and temperature: all three cylinders stand in the same room so the liquids are at the same temperature. (c) The liquid in which the ball falls most slowly resists the ball's motion the most, so the longest fall time is evidence of the highest viscosity. Heating one liquid, such as the glycerol, would make the ball fall faster: heat gives its particles more energy, they move faster and slide past each other and past the ball more easily, so its viscosity falls.<br><br><b>Marking points:</b> 1 mark for workable apparatus and procedure (a timed ball fall through a fixed depth, using identical equipment). 1 mark for the changed variable correctly stated (the liquid). 1 mark for at least two controlled variables, including temperature kept the same for all liquids. 1 mark for the evidence (slowest fall means highest viscosity) together with the heating effect (viscosity falls on heating, because the particles gain energy and slide past each other more easily).", {});
  },
  function () {
    return textq("A garage stocks three grades of engine oil and claims one grade flows more easily in winter than the others. Design a fair test to compare the viscosity of the three grades of engine oil. (a) Describe the apparatus you would use and the procedure you would follow. (1 mark) (b) State the variable you would change and the variables you would control, including temperature. (2 marks) (c) State what result would count as evidence that one grade is more viscous than another, and explain how heating one of the grades would change the outcome and why. (1 mark) (4 marks)",
      ["release an equal spoonful of each grade at the top of the same tilted ramp and compare distance travelled in a fixed time, changing only the grade and controlling volume, ramp and temperature", "the shortest distance travelled is the evidence for the highest viscosity, and heating lowers viscosity because the particles gain energy and slide past each other more easily"],
      "<b>Model answer:</b> (a) Apparatus: a smooth tray or board propped at a fixed angle as a ramp, a measuring spoon, a ruler and a stopwatch. Procedure: place one level spoonful (5 mL) of one grade at the top of the ramp, release it, and measure how far it flows in 30 seconds; clean the ramp, then repeat with each of the other grades, and repeat each grade to check the distances. (b) The variable changed is the grade of oil. Variables controlled include the volume of oil (5 mL each time), the same ramp at the same angle with the same clean surface, the same flow time (30 seconds), and temperature: all three samples are kept in the same cold room or fridge so they are tested at the same low temperature, which is the condition the claim is about. (c) The grade that travels the shortest distance in the fixed time flows the least readily, so the shortest distance is evidence of the highest viscosity. Heating one grade would make it travel farther in the 30 seconds: heat gives its particles more energy, they move faster and slide past each other more easily, so its viscosity falls.<br><br><b>Marking points:</b> 1 mark for workable apparatus and procedure (an identical flow comparison for each grade). 1 mark for the changed variable correctly stated (the grade of oil). 1 mark for at least two controlled variables, including temperature kept the same for all grades. 1 mark for the evidence (shortest distance, or longest flow time, means highest viscosity) together with the heating effect (viscosity falls on heating, because the particles gain energy and slide past each other more easily).", {});
  },
  function () {
    return textq("Design a fair test to compare the viscosity of three liquids: molasses, maple syrup and water. (a) Describe the apparatus you would use and the procedure you would follow. (1 mark) (b) State the variable you would change and the variables you would control, including temperature. (2 marks) (c) State what result would count as evidence that one liquid is more viscous than another, and explain how heating the molasses would change the outcome and why. (1 mark) (4 marks)",
      ["time a fixed volume of each liquid flowing through the same funnel at the same room temperature, changing only the liquid and controlling volume, apparatus and temperature", "the longest flow time is the evidence for the highest viscosity, and heating the molasses lowers its viscosity because its particles gain energy and slide past each other more easily"],
      "<b>Model answer:</b> (a) Apparatus: the same funnel held over a measuring cylinder, a stopwatch and a supply of each liquid. Procedure: leave all three liquids in the same room until they reach room temperature, then pour 100 mL of one liquid through the funnel and time how long it takes to pass through; rinse and dry the funnel and repeat with each of the other liquids, repeating each test to check the times. (b) The variable changed is the liquid itself (molasses, maple syrup, water). Variables controlled include the volume of liquid (100 mL each time), the same funnel and cylinder, the same start and stop rule for timing, and temperature: all three liquids are tested at the same room temperature, since a warmer sample would flow more easily and spoil the comparison. (c) The liquid with the longest flow time has resisted flowing the most, so the longest time is evidence of the highest viscosity. Heating the molasses would shorten its flow time: heat gives its particles more energy, they move faster and slide past each other more easily, so its viscosity falls.<br><br><b>Marking points:</b> 1 mark for workable apparatus and procedure (a timed flow comparison using identical equipment). 1 mark for the changed variable correctly stated (the liquid). 1 mark for at least two controlled variables, including temperature kept the same for all liquids. 1 mark for the evidence (longest flow time means highest viscosity) together with the heating effect (the molasses viscosity falls on heating, because its particles gain energy and slide past each other more easily).", {});
  }
]), ["Design it like the core flow lab, but make the controls explicit: that is where the marks are.", "Four parts: method, changed variable, controlled variables with temperature named, then the result that counts as evidence."]);

E("s8-u2-cr-balloon", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return textq("At a festival, a hot air balloon rises gently after its burner heats the air inside the envelope, and later descends when the pilot lets the air inside cool. Explain, using density, why the balloon rises when the air inside is heated (1 mark) and why it descends when the air cools. (1 mark) (2 marks)",
      ["heating spreads the air particles apart so the air inside becomes less dense than the air outside and the balloon is buoyed up", "cooling brings the particles closer so the inside air becomes as dense as, then denser than, the outside air and the balloon sinks"],
      "<b>Model answer:</b> When the burner heats the air inside the envelope, its particles move faster and spread farther apart, so each unit of volume inside holds less mass: the inside air becomes less dense than the cooler air outside the balloon. The denser outside air buoys the balloon up, and it rises. When the air inside is allowed to cool, its particles slow down and move closer together, so the inside air becomes denser, matching and then exceeding the density of the outside air. The balloon is no longer buoyed up and it descends.<br><br><b>Marking points:</b> 1 mark for the rise explained by density (heating spreads the particles, the inside air becomes less dense than the outside air, so the balloon is buoyed up). 1 mark for the descent explained by density (cooling brings the particles closer, the inside air becomes as dense as or denser than the outside air, so the balloon sinks).", {});
  },
  function () {
    return textq("In a classroom demonstration, a lightweight tissue paper balloon is filled with warm air from a hair dryer. It rises to the ceiling, hovers briefly, and then slowly sinks back to the floor as the air inside it cools. Explain, using density, why the balloon rises while its air is warm (1 mark) and why it sinks as the air cools. (1 mark) (2 marks)",
      ["warm air inside is spread out and less dense than the room air, so the balloon is buoyed up", "as the inside air cools its particles move closer, its density rises to match the room air, and the balloon sinks"],
      "<b>Model answer:</b> The hair dryer warms the air trapped in the balloon. Its particles move faster and spread farther apart, so the air inside becomes less dense than the cooler room air around the balloon, and the denser room air buoys the light balloon upward. As the trapped air cools toward room temperature, its particles slow and move closer together, so its density rises until it matches the room air: the balloon hovers while the densities are nearly equal, then sinks as the inside air becomes slightly denser and is no longer buoyed up.<br><br><b>Marking points:</b> 1 mark for the rise explained by density (warming spreads the particles, the inside air becomes less dense than the room air, so the balloon is buoyed up). 1 mark for the sinking explained by density (cooling brings the particles closer, the inside density rises to equal and then pass the room air density, so the balloon sinks).", {});
  },
  function () {
    return textq("A hot air balloon climbs after the pilot fires the burner, then levels off and stops rising as the air inside gradually cools. The pilot fires the burner again and the balloon climbs once more. Explain, using density, why firing the burner makes the balloon climb (1 mark) and why it levelled off as the inside air cooled. (1 mark) (2 marks)",
      ["burner heat spreads the inside air particles so the inside air is less dense than the outside air and the balloon is buoyed up", "as the inside air cooled its density rose to equal the outside air at that height, so there was no longer a density difference to lift it"],
      "<b>Model answer:</b> Firing the burner heats the air in the envelope: its particles move faster and spread farther apart, so the inside air becomes less dense than the air outside, and the balloon is buoyed upward and climbs. As the flight continues, the inside air gradually cools, its particles move closer together, and its density rises. When the inside density rises to equal the density of the outside air at that height, there is no longer a density difference to lift the balloon, so it levels off, neither rising nor sinking, until reheating lowers the inside density again.<br><br><b>Marking points:</b> 1 mark for the climb explained by density (burner heat spreads the particles, the inside air becomes less dense than the outside air, so the balloon is buoyed up). 1 mark for the levelling off explained by density (cooling raises the inside density until it equals the outside density, so the lift disappears).", {});
  }
]), ["Follow the particles: heating spreads them out, cooling brings them closer.", "In each state, compare the density inside the balloon with the density outside it."]);

/* ----- bank-u3.js ----- */
// CRMARKS: s8-u3-cr-refraction-explain=3
// CRMARKS: s8-u3-cr-properties=3
// CRMARKS: s8-u3-cr-em=3
// CRMARKS: s8-u3-cr-reflection=3
// CRMARKS: s8-u3-cr-diffuse=3
// CRMARKS: s8-u3-cr-refraction=3
// CRMARKS: s8-u3-cr-speed=3
// CRMARKS: s8-u3-cr-words=3
// CRMARKS: s8-u3-cr-fibre=4
// CRMARKS: s8-u3-cr-research=3
// CRMARKS: s8-u3-cr-mirror-lab=3
// CRMARKS: s8-u3-cr-conclusion=3
// CRMARKS: s8-u3-cr-estimate=3
// CRMARKS: s8-u3-cr-design-refraction=4
// CRMARKS: s8-u3-cr-predict=3
// CRMARKS: s8-u3-cr-identify-medium=3
// CRMARKS: s8-u3-cr-em-uses=4
// CRMARKS: s8-u3-cr-mirror-image=4
// CRMARKS: s8-u3-cr-refraction-bowl=4
// Science 8 Unit 3 bank: Optics (SC8.7.1 to SC8.9.14), built
// Nov 15, 2026 to the Optics authoring spec. All entries are
// original and were written new for this app. Existing tests
// and question banks, including the ESD optics set (review set,
// mirror and lens assignments, core labs, the Fibre Optics
// STSE), the MHR ExamView chapters 4 to 6 and the optics
// dynamic bank, were reviewed only to gauge the expected depth
// and range of treatment.
// Guide discipline: curved mirror image characteristics are
// read off given ray diagrams, never memorized; lens ray
// diagram construction is not part of the strand, so lens items
// are qualitative; Snell's law is named in the guide as not
// expected and is never keyed.
// CORE residue: SC8.9.3 entries assess image characteristics,
// the special rays and lab data interpretation; mirror handling
// and hand construction are not assessed. SC8.9.6 carries one
// entry on safe practice; apparatus handling is classroom
// assessment. SC8.9.10 entries assess procedure judgement and
// method; conducting the experiment is not assessed.
// SC8.9.12 (work cooperatively and collaboratively with others)
// is NONE on the SC7.3.5 precedent: registered, no entries, and
// the gap is recorded in the Optics catalogue and spec, not
// smoothed over.

/* ---------- SC8.7.1 Properties of visible light ---------- */

E("s8-u3-properties", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "A hand held in front of a projector beam casts a sharp shadow with clear detail, down to the ring on one finger. Which property of light does the sharp shadow demonstrate?", k: "Light travels in a straight line (rectilinear propagation)", w: ["Light disperses into its constituent colours", "Light refracts when it passes into a new medium", "Light travels only through a vacuum"] },
    { q: "A beam from a ray box strikes a prism and fans out into a band of colours on the screen. Which property of light is on display?", k: "Dispersion: white light separates into its constituent colours", w: ["Reflection: light bouncing off a surface", "Rectilinear propagation: light travelling in a straight line", "Refraction into a single colour"] },
    { q: "Sunlight bouncing off a car's dusty windshield scatters in every direction, while sunlight off a clean mirror bounces in one direction. Both cases show which property of light?", k: "Reflection", w: ["Dispersion", "Refraction", "Travel through a vacuum"] },
    { q: "A stir stick standing in a beaker of water looks broken at the water's surface. Which property of light causes the effect?", k: "Refraction: light bends as it passes from one medium to another", w: ["Dispersion: light separates into colours", "Reflection: light bounces off the water", "Rectilinear propagation: light travels straight"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide's six properties of light each have a signature demonstration: straight-line travel makes sharp shadows, reflection bounces light off surfaces (in one direction off a mirror, scattered off dust), refraction bends light between media (the broken-looking stick), and dispersion separates white light into its colours in a prism.",
    {});
}, ["Match the demonstration to the property it shows.", "Shadow means straight lines; colours from a prism mean dispersion; a bent-looking stick means refraction."]);

E("s8-u3-materials", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "Which material is correctly classified by how much light it lets through?", k: "A frosted window is translucent: some light passes, but it is scattered so no clear image forms", w: ["A solid wooden door is translucent: some of the light falling on it passes through the wood", "A clear window pane is opaque: no light at all passes through the glass of the pane", "A frosted window is transparent: light passes through it and the images seen stay sharp and clear"] },
    { q: "A student holds three materials in a projector beam: a glass pane, a pair of sunglasses, and a book. Which ordering by light passed is correct?", k: "Glass pane (most), then sunglasses, then the book (none)", w: ["Book (most), then sunglasses, then the glass pane (none)", "Sunglasses (most), then the glass pane, then the book last of all (none)", "All three materials pass exactly the same amount of light through them"] },
    { q: "Which example matches its category?", k: "A lampshade is translucent: it passes some light while scattering it", w: ["A brick wall is transparent: light passes through it and clear images form beyond it", "A mirror is translucent: some light passes through it, but the light is scattered", "Frosted glass is opaque: no light at all passes through a pane of frosted glass"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Materials sort by how much light they pass. Transparent materials (a window pane) pass light with a clear image; translucent materials (a frosted window, a lampshade, sunglasses) pass some light but scatter it; opaque materials (a door, a book, a wall) pass none.",
    {});
}, ["Three categories: all light clearly, some light scattered, no light.", "Frosted and tinted materials are the translucent giveaway."]);

E("s8-u3-spectrum-order", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("White light dispersed by a prism separates into its constituent colours. Listed by degree of refraction, from least refracted to most refracted, what is the correct order?",
      "Red, orange, yellow, green, blue, indigo, violet",
      ["Violet, indigo, blue, green, yellow, orange, red",
       "Red, yellow, orange, violet, blue, green, indigo",
       "Green, blue, indigo, violet, red, orange, yellow"],
      "The spectrum runs ROY G BIV. Red is refracted the least and violet the most, which is also the wavelength order: red has the longest wavelength of the visible colours and violet the shortest. The acronym in the guide is ordered by exactly this, degree of refraction.",
      {});
  }
]), ["ROY G BIV, and red bends least.", "Least refracted first: start at red."]);

E("s8-u3-dispersion", 3, ["SC8.7.1"], 3, "var", varset([
  function () {
    return mcq("A teacher shines two beams through the same prism: white light from a ray box, and the single-colour light of a red laser. The white light fans into a spectrum, but the laser beam only bends, staying red. Which explanation is correct?",
      "Dispersion separates a mixture of colours; the laser's light is a single wavelength, so there is nothing to separate, though it still refracts",
      ["A prism disperses only light that enters it at low angles, and the laser beam entered the prism too steeply to spread out",
       "Laser light cannot refract at all, so it passes straight through the prism unchanged in its direction",
       "The prism was used up by the white light shone through it first, so it could not disperse a second beam after that"],
      "The two results separate refraction from dispersion. Both beams refract (bend) at the prism's surfaces. Only the white light disperses, because it is a combination of all the visible wavelengths, each refracting by a different amount. The laser is one wavelength only: it bends as one and stays one colour.",
      {});
  }
]), ["Two things happen in a prism: bending, and separating. Which beam can do both?", "One wavelength cannot fan out into many."]);

E("s8-u3-shadow", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("A student moves a cardboard shape closer to a lamp, keeping the screen fixed, and its shadow grows larger and stays sharp. Which statement explains both observations?",
      "Light travels in straight lines from the lamp; a closer object blocks a wider cone of those straight rays, so the shadow grows, and the straight paths keep its edges sharp",
      ["Light curves around the edges of the cardboard shape, and the amount of curving grows steadily as the object moves nearer to the lamp",
       "The light from the lamp speeds up as it passes near the cardboard, and that speeding up stretches the shadow out on the screen",
       "The shadow grows larger because the cardboard absorbs more of the colours in the light whenever it sits closer to the lamp"],
      "Shadows are the straight-line property at work. Rays travel straight from the source; the object blocks a cone of them, and the nearer the object sits to the lamp, the wider the cone it blocks, so the shadow is larger. Because the rays do not bend around the edges, the shadow stays sharp.",
      {});
  }
]), ["Shadows exist because light does not bend around things.", "Closer to the source means blocking a wider spread of straight rays."]);

E("s8-u3-vacuum", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("Light from the Sun and stars reaches Earth across the emptiness of space, and the light inside a clear bulb crosses the near-vacuum around its filament. What property of light do both cases demonstrate?",
      "Light can travel through a vacuum: it does not require a medium",
      ["Light requires a medium, and space is filled with invisible matter",
       "Light travels only through transparent solids and liquids",
       "Light slows to a stop when no medium is present"],
      "Unlike sound, light needs nothing to travel through. It crosses the vacuum of space from the Sun and stars, and the evacuated space inside a bulb, which is why the bulb pops when broken and the vacuum is lost. Travelling without a medium is one of the guide's six properties.",
      {});
  }
]), ["Sound needs a medium. Does light?", "Starlight crossing empty space is the proof."]);

E("s8-u3-colour-seen", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("A green sweater is viewed in white light. Using what the guide says about wavelengths and objects, why does the sweater look green?",
      "The sweater absorbs the other wavelengths of white light and reflects the wavelength our brain interprets as green",
      ["The sweater produces green light of its own whenever it is worn outside in ordinary daylight",
       "The sweater absorbs the green wavelength out of the white light and reflects all of the other wavelengths instead",
       "White light simply turns green whenever it strikes any piece of fabric, whatever its colour"],
      "Objects do not hand us their colour; they select it. White light carries all the visible wavelengths; the sweater's material absorbs most of them and reflects the green wavelength to our eyes. A red object reflects red, a white object reflects nearly all, and a black object absorbs nearly all.",
      {});
  }
]), ["We see only the wavelengths that bounce back to our eyes.", "Absorbed wavelengths disappear; reflected ones are the colour."]);

E("s8-u3-cr-properties", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return textq("A class demonstration shows two effects in one tank of water: (a) a stir stick in the water looks bent at the surface, and (b) a beam shone through the water with a few drops of milk in it fans out into colours. For each effect, name the property of light responsible and explain what the light is doing. (3 marks)",
      ["the bent stick is refraction, light bending between media", "the colour fan is dispersion, white light separating", "each explanation tied to the behaviour of the light"],
      "<b>Model answer:</b> (a) The bent stick is refraction. Light from the stick changes direction as it passes from the water into the air on its way to our eyes, so the brain, which assumes light travelled straight, places the underwater part of the stick in the wrong position: it looks bent or broken at the surface. (b) The colour fan is dispersion. White light is a combination of wavelengths; passing through the water and milk mixture, the wavelengths separate, spreading the beam into its constituent colours, the same separation a prism produces.<br><br><b>Marking points:</b> 1 mark for refraction named and tied to the bending between media for the stick. 1 mark for dispersion named for the colour fan. 1 mark for explaining that white light is a mixture of wavelengths that separate.",
      {});
  }
]), ["One effect is about bending between media; the other is about white light being a mixture.", "Name the property, then say what the light does."]);

/* ---------- SC8.7.2 The electromagnetic spectrum ---------- */

E("s8-u3-em-order", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Which list gives the types of electromagnetic radiation in order of decreasing wavelength?", k: "Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays", w: ["Gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves, radio waves", "Radio waves, infrared, microwaves, visible light, X-rays, ultraviolet, gamma rays", "Microwaves, radio waves, visible light, infrared, ultraviolet, gamma rays, X-rays"] },
    { q: "On the electromagnetic spectrum strip shown, which type sits between infrared and ultraviolet?", k: "Visible light", w: ["Microwaves", "Radio waves", "X-rays"] },
    { q: "Which type of electromagnetic radiation has the longest wavelength of all?", k: "Radio waves", w: ["Gamma rays", "Microwaves", "Ultraviolet"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "The spectrum in decreasing wavelength runs: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays. Visible light, the only part our eyes detect, sits in the middle, between infrared and ultraviolet.",
    {});
  if (c.q.indexOf("strip shown") >= 0) q.figure = s8EMSpectrumSVG();
  return q;
}, ["The order is fixed: radio longest, gamma shortest, visible in the middle.", "Decreasing wavelength means starting at radio waves."]);

E("s8-u3-em-uses", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Which pairing of radiation type and use matches the guide's examples?", k: "Infrared: motion sensors; ultraviolet: sun tanning; gamma rays: radiation therapy for cancer", w: ["Microwaves: medical X-ray imaging; radio waves: cooking food; X-rays: telecommunications", "Ultraviolet: cooking food; infrared: cancer therapy; gamma rays: remote controls", "X-rays: sun tanning; microwaves: motion sensors; radio waves: medical detection"] },
    { q: "A hospital uses one type of electromagnetic radiation to see broken bones and another to treat cancer. Which pairing is correct?", k: "X-rays for medical detection of the bones; gamma rays for radiation therapy", w: ["Microwaves for the bones; radio waves for the therapy", "Infrared for the bones; ultraviolet for the therapy", "Gamma rays for the bones; X-rays for the therapy"] },
    { q: "Which use belongs to microwaves in the guide's list?", k: "Cooking food", w: ["Medical detection of broken bones", "Radiation therapy for cancer", "Sun tanning"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide's use list: radio waves for telecommunications, microwaves for cooking food, infrared for motion sensors, visible light for the microscope, ultraviolet for sun tanning, X-rays for medical detection, and gamma rays for radiation therapy for cancer.",
    {});
}, ["Work through the guide's list type by type.", "Cooking is microwaves; bones are X-rays; therapy is gamma."]);

E("s8-u3-em-compare", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    var q = mcq("Compared with visible light, radio waves have which combination of wavelength, frequency and energy?",
      "Longer wavelength, lower frequency, and lower energy",
      ["Shorter wavelength, higher frequency, and higher energy",
       "Longer wavelength, higher frequency, and the same energy",
       "The same wavelength, but lower frequency and lower energy"],
      "Radio waves sit at the far end of the spectrum from gamma rays. Moving from visible light toward radio waves, wavelength increases while frequency and energy both decrease: the three quantities move together in a fixed pattern, longer wavelength always meaning lower frequency and lower energy.",
      {});
    q.figure = s8EMSpectrumSVG();
    return q;
  }
]), ["Find radio and visible on the strip, then apply the pattern: longer wavelength, lower frequency, lower energy.", "The three quantities never move independently."]);

E("s8-u3-em-devices", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("A class lists devices in the room that send or receive information without using visible light. Which device belongs on the list?",
      "A television remote control, which signals with infrared radiation",
      ["A desk lamp, which signals with visible light",
       "A printed poster, which is read by reflected visible light",
       "A window, which passes visible light"],
      "The guide's point is that electromagnetic radiation surrounds us in forms we cannot see. Radios, cell phones, television signals, wireless internet and remote controls all work on radiation outside the visible band; the remote uses infrared. The lamp, poster and window are visible light at work.",
      {});
  }
]), ["The list is for radiation our eyes cannot detect.", "Remote controls whisper in infrared."]);

E("s8-u3-em-energy", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("Which type of electromagnetic radiation carries the most energy, and which carries the least?",
      "Gamma rays carry the most energy; radio waves carry the least",
      ["Radio waves carry the most energy; gamma rays carry the least",
       "Visible light carries the most; microwaves carry the least",
       "All types carry the same energy; only their uses differ"],
      "Energy follows the spectrum's order: it rises steadily from radio waves through microwaves, infrared, visible light and ultraviolet to X-rays, and peaks at gamma rays. That is also why the high-energy end is the dangerous end.",
      {});
  }
]), ["Energy rises along the spectrum toward gamma rays.", "Most energy and most danger live at the same end."]);

E("s8-u3-em-detection", 3, ["SC8.7.2"], 2, "var", varset([
  function () {
    return mcq("Electromagnetic radiation of many types is passing through the classroom right now, yet students notice only the light from the windows and lamps. Why does so much radiation go undetected by their senses?",
      "Our eyes detect only the visible band; the other types have wavelengths too long (like infrared) or too short (like ultraviolet) for our eyes to register",
      ["The other types of radiation exist only inside the machines that produce them, sealed in, and they never travel through ordinary rooms like this one",
       "The other types of radiation are blocked completely by the walls and the roof of the classroom building before they can reach anyone sitting inside it",
       "Our eyes actually detect all of the many types of radiation around us in the room, but the brain chooses to ignore most of what the eyes register, on purpose"],
      "Detection is a wavelength question. The radiation is continuously present, from radio signals to ultraviolet, but the human eye registers only the narrow visible band. Wavelengths longer than visible (infrared) or shorter (ultraviolet) pass unnoticed without instruments.",
      {});
  }
]), ["The radiation is there. What limits our detection of it?", "Our eyes are tuned to one narrow band only."]);

E("s8-u3-cr-em", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    return textq("Choose two types of electromagnetic radiation from different ends of the spectrum (for example, radio waves and gamma rays). Compare them on wavelength, frequency and energy, and give the guide's example use for each. (3 marks)",
      ["a correct comparison of wavelength, frequency and energy", "the two types at clearly different spectrum positions", "a correct use for each type"],
      "<b>Model answer:</b> Radio waves and gamma rays sit at opposite ends of the spectrum. Radio waves have the longest wavelengths, the lowest frequencies and the lowest energies of all the types; they are used for telecommunications. Gamma rays have the shortest wavelengths, the highest frequencies and the highest energies; they are used in radiation therapy for cancer. The comparison shows the spectrum's pattern: as wavelength decreases across the spectrum, frequency and energy both increase. (Any two types at different positions, compared correctly with their guide uses, earn the marks.)<br><br><b>Marking points:</b> 1 mark for the wavelength comparison. 1 mark for frequency and energy compared consistently with it. 1 mark for a correct guide use for each type.",
      {});
  }
]), ["Pick two types far apart so the comparison has room to show.", "Wavelength, frequency and energy move in a fixed pattern: state it once, apply it to both."]);

/* ---------- SC8.7.3 Laws of reflection ---------- */

E("s8-u3-law", 3, ["SC8.7.3"], 1, "var", varset([
  function () {
    return mcq("What does the law of reflection state?",
      "The angle of incidence equals the angle of reflection, both measured from the normal",
      ["The angle of incidence equals the angle of reflection, both measured from the mirror's surface",
       "The angle of reflection is always twice the angle of incidence",
       "Light reflects off a surface at the same angle it arrives, measured from the surface"],
      "The law of reflection: the angle of incidence is equal to the angle of reflection. Both angles are measured from the normal, the line perpendicular to the surface at the point where the ray strikes, not from the surface itself. Core Lab 5-2B exists to let students arrive at this law from their own measurements.",
      {});
  }
]), ["The law is an equality between two angles, both measured from the same reference line.", "From the normal, not from the surface."]);

E("s8-u3-angle-calc", 3, ["SC8.7.3"], 2, "gen", function () {
  var ang = pick([25, 30, 35, 40, 45, 50, 55, 60]);
  var mode = pick(["reflect", "surface", "between"]);
  function dis3(keyVal, cand) {
    var out = [];
    for (var i = 0; i < cand.length && out.length < 3; i++) {
      if (cand[i] !== keyVal && cand[i] > 0 && cand[i] < 180 && out.indexOf(cand[i]) < 0) out.push(cand[i]);
    }
    return out.map(function (d) { return d + " degrees"; });
  }
  var q, key, dis, sol;
  if (mode === "reflect") {
    key = ang + " degrees";
    dis = dis3(ang, [90 - ang, ang + 15, ang - 15, ang + 5, 2 * ang, 90 - ang + 5]);
    sol = "By the law of reflection, the angle of reflection equals the angle of incidence: " + ang + " degrees, both measured from the normal.";
    q = mcq("The diagram shows a ray striking a plane mirror with an angle of incidence of " + ang + " degrees. What is the angle of reflection?", key, dis, sol, {});
  } else if (mode === "surface") {
    key = (90 - ang) + " degrees";
    dis = dis3(90 - ang, [ang, 90 - ang + 10, 90 - ang - 10, 90 - ang + 15, ang + 5]);
    sol = "The diagram's " + ang + " degrees is measured from the mirror's surface. Angles of incidence are measured from the normal, and the normal is 90 degrees to the surface, so the angle of incidence is 90 - " + ang + " = " + (90 - ang) + " degrees.";
    q = mcq("A ray strikes a plane mirror so that the ray makes an angle of " + ang + " degrees with the mirror's surface, as shown. What is the angle of incidence?", key, dis, sol, {});
  } else {
    key = (180 - 2 * ang) + " degrees";
    dis = dis3(180 - 2 * ang, [2 * ang, 90 - ang, 180 - ang, 180 - 2 * ang + 10, 180 - 2 * ang - 10]);
    sol = "The angle of reflection equals the angle of incidence, " + ang + " degrees. On the straight line along the normal's side, the angle between the incoming and outgoing rays is 180 - " + ang + " - " + ang + " = " + (180 - 2 * ang) + " degrees.";
    q = mcq("A ray reflects off a plane mirror with an angle of incidence of " + ang + " degrees, as shown. What is the angle between the incident ray and the reflected ray?", key, dis, sol, {});
  }
  q.figure = s8ReflectSVG(ang, false);
  return q;
}, ["Both angles are measured from the normal. Read the diagram's angle carefully: is it from the normal or from the surface?", "The law gives the reflection angle directly; surface angles need a 90 degree conversion first."]);

E("s8-u3-specular-diffuse", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "A photograph printed with a glossy finish shows glare spots under a lamp, while the same photograph in a matte finish does not. Which explanation uses the two kinds of reflection correctly?", k: "The glossy surface reflects specularly, sending rays in one direction to form glare; the matte surface reflects diffusely, scattering rays so no glare forms", w: ["The glossy surface reflects light diffusely in all directions, and the matte surface reflects it specularly in one direction", "Both surfaces reflect light specularly in one direction; the matte print is simply printed darker than the glossy one", "The matte surface of the print absorbs all of the light that falls on it, so no light reflects from it at all"] },
    { q: "Which application is correctly matched to its kind of reflection?", k: "Car wax produces a specular finish: a smooth surface reflecting in one direction for shine", w: ["Matte paint is chosen by painters for its specular reflection and its high, glossy luster", "Glazed ceramic dishes are common examples of diffuse reflection from a household surface", "A dusty windshield produces a specular reflection of the road ahead, just like a polished mirror"] },
    { q: "Why does a calm lake mirror the mountains while a wind-rippled lake shows only a glittering blur?", k: "The calm surface reflects specularly, in one direction, forming an image; the rippled surface reflects diffusely, scattering rays in many directions", w: ["The wind-rippled lake absorbs all of the light that would otherwise form the image of the mountains", "The calm lake refracts the light from the mountains and bends it into an image on its surface", "The wind changes the flat surface of the water into a curved convex mirror as the ripples form"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Specular reflection happens off smooth surfaces: parallel rays reflect in one direction and an image or glare can form. Diffuse reflection happens off rough surfaces: rays scatter in many directions and no image forms. Matte versus glossy paint, waxed cars, glazed ceramics and dusty windshields are the guide's everyday cases.",
    {});
}, ["Smooth and one direction means specular; rough and scattered means diffuse.", "An image or glare can only come from the specular kind."]);

E("s8-u3-mirror-types", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "Which set of examples matches the guide's three mirror types?", k: "Plane: a bathroom mirror. Concave: the inside of a metal spoon. Convex: the safety mirror on the front of a school bus", w: ["Plane: the inside of a spoon. Concave: a bathroom mirror. Convex: a shop's security mirror", "Plane: a school bus safety mirror. Concave: a bathroom mirror. Convex: the inside of a spoon", "Plane: a bathroom mirror. Concave: a bus safety mirror. Convex: the inside of a spoon"] },
    { q: "The outside of a polished metal spoon bulges toward the object it reflects. Which type of mirror does it act as?", k: "A convex mirror", w: ["A concave mirror", "A plane mirror", "A diffuse mirror"] },
    { q: "A store mounts a large rounded mirror high in a corner so staff can see down every aisle. Which mirror type is it, and why is it chosen?", k: "Convex: its bulging surface gives a wide field of view", w: ["Concave: its hollow surface magnifies shoppers", "Plane: its flat surface shows the aisles at true size", "Convex: it inverts the image so thieves are easier to spot"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The three mirror types: plane (flat, like a bathroom mirror), concave (curved inward, like the inside of a spoon) and convex (curved outward, like a school bus safety mirror or a store security mirror). Convex mirrors are chosen where a wide field of view matters.",
    {});
}, ["Flat, hollowed in, bulging out: plane, concave, convex.", "The spoon gives both curved types: inside concave, outside convex."]);

E("s8-u3-plane-spot", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows an object arrow in front of a plane mirror and its image. Which set of image properties (SPOT) is correct for a plane mirror?",
      "Same size as the object, same distance behind the mirror as the object is in front, upright, and virtual",
      ["Larger than the object itself, farther behind the mirror than the object is in front, upright, and real",
       "Same size as the object, the same distance behind the mirror as the object in front, inverted, and real",
       "Smaller than the object itself, closer to the mirror than the object is in front, upright, and virtual"],
      "Plane mirror images are the strand's reference case: Size the same, Position as far behind the mirror as the object is in front, Orientation upright, Type virtual (the rays only appear to meet behind the mirror, which is why the image arrow is dashed). Lateral inversion, the left-right reversal, is the one extra feature.",
      {});
    q.figure = s8PlaneMirrorSVG();
    return q;
  }
]), ["SPOT: Size, Position, Orientation, Type. Plane mirrors are the 'everything equal' case.", "Same, same, upright, virtual."]);

E("s8-u3-lateral", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return mcq("The word AMBULANCE is printed in reverse on the front of the vehicle so that drivers ahead can read it in their rear-view mirrors. Which property of plane mirror images makes this work, and what exactly does the mirror do to the lettering?",
      "Lateral inversion: the mirror reverses the image left-to-right, so the reversed printing reads correctly in the mirror",
      ["Magnification: the mirror enlarges the lettering on the front of the vehicle until it becomes readable in traffic",
       "The mirror rotates the whole lettering 180 degrees in the glass, turning it right side up for the driver",
       "The mirror reverses the lettering from top to bottom instead, and the driver's brain corrects it while driving"],
      "A plane mirror image is laterally inverted: left and right are swapped, while top and bottom are not. Printing the word backwards on the vehicle means the mirror's left-right swap turns it into ordinary readable text for the driver ahead. It is the same effect that makes text held to a bathroom mirror unreadable.",
      {});
  }
]), ["The mirror swaps one pair of directions. Which pair?", "Left-right, not top-bottom: that is lateral inversion."]);

E("s8-u3-cr-reflection", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("A periscope uses two plane mirrors to let a sailor in a submarine see above the water's surface. Explain how the periscope works, using the law of reflection and the properties of plane mirror images. (3 marks)",
      ["light from the scene strikes the top mirror and reflects down the tube", "the law of reflection governs each bounce, with equal angles at each mirror", "the second mirror reflects the light into the eye, and two reflections restore the image's orientation"],
      "<b>Model answer:</b> Light from the scene above the surface travels horizontally into the top of the periscope and strikes the first plane mirror, set at 45 degrees. By the law of reflection, the angle of incidence equals the angle of reflection at that mirror, so the light is turned exactly 90 degrees and travels straight down the tube. At the bottom it strikes the second plane mirror, also at 45 degrees, and the law applies again: the light turns another 90 degrees and travels horizontally into the sailor's eye. Because the light has reflected twice, the left-right reversal of a single mirror image is cancelled, and the sailor sees the scene upright and correctly oriented, as a plane mirror image the same size as the scene itself.<br><br><b>Marking points:</b> 1 mark for the law of reflection applied at the first mirror to turn the light down the tube. 1 mark for the law applied again at the second mirror into the eye. 1 mark for the image outcome (two reflections cancel the lateral inversion; the view is upright and true to size).",
      {});
  }
]), ["Two mirrors, two applications of the same law, and one orientation puzzle to explain.", "Each 45 degree mirror turns the light exactly 90 degrees."]);

E("s8-u3-cr-diffuse", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return textq("A student objects: 'If the law of reflection is true, a sheet of paper should act like a mirror, since light reflects off it too. But I can't see my face in paper.' Answer the objection: explain why paper gives no image even though every ray striking it obeys the law of reflection. (3 marks)",
      ["the law holds for each individual ray at its own point on the surface", "paper's surface is rough, so the normals point in many directions and rays scatter", "a mirror's smooth surface keeps the reflected rays ordered, so an image forms"],
      "<b>Model answer:</b> The law of reflection is never broken; it applies ray by ray. On a mirror, the surface is smooth, so the normal points the same way at every point, and rays from one point of your face reflect in an orderly pattern that preserves the image. Paper's surface is rough at the microscopic level: its tiny facets face in many directions, so the normal at each point points a different way. Each ray still reflects with its angle of reflection equal to its angle of incidence at its own facet, but the reflected rays scatter in all directions (diffuse reflection), and the order that makes an image is destroyed. That is why paper shows light, but no face.<br><br><b>Marking points:</b> 1 mark for the law applying to each ray at its own point of contact. 1 mark for the rough surface giving many normal directions and scattered reflected rays. 1 mark for the contrast with a smooth surface preserving the rays' order so an image forms.",
      {});
  }
]), ["The law is about each ray and its own normal. What differs between paper and mirror is the surface, not the law.", "Many normals, scattered rays, no image: that is diffuse reflection."]);

/* ---------- SC8.7.4 Refraction, qualitatively ---------- */

E("s8-u3-refraction-def", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    return mcq("Which set of refraction terms is defined correctly?",
      "The incident ray is the incoming ray, the refracted ray is the ray after it bends at the boundary, and the angles of incidence and refraction are measured from the normal",
      ["The incident ray is the ray after it has bent at the boundary, and the angle of refraction is measured from the surface itself rather than the normal",
       "The refracted ray is the ray that bounces back from the boundary, and the normal is simply the surface of the medium itself",
       "The angle of incidence is measured from the surface itself rather than the normal, and the refracted ray never changes its direction at the boundary"],
      "Refraction is the bending of light as it crosses a boundary between media. The incident ray arrives, the refracted ray leaves into the new medium, and both angles, of incidence and of refraction, are measured from the normal at the boundary point, exactly as in reflection.",
      {});
  }
]), ["Same angle convention as reflection: everything from the normal.", "Incident in, refracted through, normal as the reference."]);

E("s8-u3-bent-stick", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return mcq("A popsicle stick standing in a beaker of water looks bent at the surface, though it is straight. Which explanation is correct?",
      "Light from the underwater part of the stick bends (refracts) as it leaves the water for the air, and our brain, assuming the light travelled straight, misplaces that part of the stick",
      ["The water in the beaker physically bends the stick for as long as it stands in the water, pressing it out of shape, and the stick straightens itself again once it is removed and dried",
       "The stick reflects the light reaching it at the surface of the water in the beaker, and that reflection doubles its image in the water, which is what makes the straight stick look bent",
       "The water in the beaker disperses the light coming from the underwater part of the stick, and the separated colours produced shift the stick's apparent shape where it meets the surface"],
      "The bent stick is the guide's introduction to refraction. Light from the submerged part changes direction at the water-air boundary; the brain traces the rays back in straight lines, so the underwater part appears shifted from where it is, and the stick looks broken at the surface.",
      {});
  }
]), ["The stick is fine. What happens to its light at the surface?", "Refraction at the boundary plus a brain that assumes straight travel."]);

E("s8-u3-speed-density", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return mcq("A ray of light passes at an angle from air into glass, and separately from glass back into air. Using the guide's speed and density account, which statement is correct?",
      "Light slows down entering the denser glass and bends; entering the less dense air it speeds up and bends the other way",
      ["Light speeds up as it enters the denser glass from the air, and that increase in speed is what makes it bend",
       "Light keeps exactly the same speed as it passes through both media; only the colour of the light changes at the boundary",
       "Light bends at a boundary only when it speeds up on entering the new medium, and never when it slows down there"],
      "Refraction is caused by a speed change at the boundary. Light travels more slowly in a medium of greater density (glass) than in air, and the speed change at an angle is what swings the ray's direction. Returning to the less dense air, it speeds up and bends back. The guide's car-on-a-sandy-shoulder analogy models exactly this: slow one side first, and the direction veers.",
      {});
  }
]), ["Bending is a speed change in disguise. Denser medium, slower light.", "Slow down entering glass; speed up leaving it."]);

E("s8-u3-lenses", 3, ["SC8.7.4"], 1, "gen", function () {
  var cases = [
    { q: "Which description of a convex lens is correct?", k: "It is thicker across the middle than at the edges, and it causes parallel light rays to converge (come together)", w: ["It is thinner across the middle than at the edges, and it causes parallel light rays to converge (come together)", "It is thicker across the middle than at the edges, and it causes parallel light rays to diverge (spread apart)", "It has one flat side and one curved side, and it reflects light rays instead of refracting them as they pass"] },
    { q: "A lens spreads a parallel beam of light so the rays diverge, as if coming from a point behind the lens. Which lens is it, and what is its shape?", k: "A concave lens: thinner across the middle and thicker at the edges", w: ["A convex lens: thicker across the middle and thinner at the edges", "A concave lens: thicker across the middle and thinner at the edges", "A convex lens: thinner across the middle and thicker at the edges"] },
    { q: "Which statement about lenses and light is correct?", k: "Lenses work by refraction: light bends at each surface of the lens, which is what brings rays together or spreads them apart", w: ["Lenses work by reflection: the light that forms the image bounces off the curved surfaces of the lens", "Lenses work by dispersion: they separate the light passing through them into colours, and those colours form the image", "Lenses work by absorbing all of the light rays that would otherwise blur the image they form"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "A lens is a curved piece of transparent material that refracts light. A convex lens is thicker in the middle and converges rays; a concave lens is thinner in the middle and diverges rays. The diagram shows the convex case: parallel rays brought together through the focal point.",
    {});
  if (c.q.indexOf("convex lens is correct") >= 0) q.figure = s8LensSVG("convex");
  return q;
}, ["Thick middle converges; thin middle diverges.", "Lenses bend light (refraction), they do not bounce it."]);

E("s8-u3-vision", 3, ["SC8.7.4"], 2, "gen", function () {
  var cases = [
    { q: "A student is near-sighted: her eye's lens refracts light too much, so images of distant objects form in front of her retina. Which lens corrects her vision, and how?", k: "A concave lens, which diverges the light slightly before it enters the eye, so the eye's lens brings it to a focus on the retina", w: ["A convex lens, which converges the light even more strongly so that it focuses sooner in the eye", "A concave lens, which converges the light entering the eye so that it focuses sooner, onto the retina", "A convex lens, which diverges the light slightly before the light enters the eye and reaches the lens"] },
    { q: "A student is far-sighted: his eye's lens does not refract light enough, so images would form behind his retina. Which lens corrects his vision?", k: "A convex lens, which begins converging the light before it enters the eye, making up for the eye lens's shortfall", w: ["A concave lens, which diverges the light entering the eye so that the eye's weak lens can catch up", "A convex lens, which diverges the light slightly before it enters the eye and reaches the retina", "A concave lens, which adds the convergence that the eye's own lens is failing to provide"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Vision correction adds the lens the eye is missing. Near-sightedness is too much refraction (image in front of the retina), corrected by a concave, diverging lens. Far-sightedness is too little (image would fall behind the retina), corrected by a convex, converging lens. The guide's memory check: concave lenses make eyes look smaller behind the glasses, convex make them look larger.",
    {});
}, ["Too much bending needs a spreader; too little needs a converger.", "Near-sighted: concave. Far-sighted: convex."]);

E("s8-u3-lens-examples", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    var q = mcq("Which example is correctly matched to its lens type?",
      "A magnifying glass is a convex lens, used to converge light and produce an enlarged view",
      ["A magnifying glass is a concave lens, used to diverge light",
       "Eyeglasses for near-sightedness use convex lenses",
       "A camera's viewfinder peephole uses a convex lens to shrink the view"],
      "The guide's examples: magnifying glasses are convex lenses, and eyeglasses come in both kinds, concave for near-sightedness and convex for far-sightedness. The diagram shows the concave case, its rays diverging as if from the focal point on the near side.",
      {});
    q.figure = s8LensSVG("concave");
    return q;
  }
]), ["The magnifying glass is the convex exemplar.", "Glasses can be either kind; the magnifier is always convex."]);

E("s8-u3-cr-refraction", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return textq("A fish under the water appears to be higher (closer to the surface) than it really is, which is why a heron must aim below the fish it sees. Explain the fish's apparent position using refraction, and state the direction the light bends at the surface. (3 marks)",
      ["light from the fish refracts as it leaves the water for the air", "leaving the denser medium it bends away from the normal", "the brain traces the rays straight back, placing the fish shallower than it is"],
      "<b>Model answer:</b> Light reflected from the fish travels up through the water and crosses into the air. Water is the denser medium, so as the light leaves it for the less dense air it speeds up and bends away from the normal at the surface. The heron's brain (like ours) assumes light has travelled in a straight line, so it traces the bent rays back along straight paths, and those paths meet at a point above the fish's true position. The fish therefore appears shallower than it is, and a strike aimed at the seen fish passes above the real one.<br><br><b>Marking points:</b> 1 mark for refraction at the water-air boundary. 1 mark for the bending direction (away from the normal when leaving the denser medium). 1 mark for the straight-line assumption placing the apparent fish above the real fish.",
      {});
  }
]), ["Trace one ray from the fish to the eye, and mark where it bends and which way.", "Away from the normal leaving water; the brain's straight lines do the rest."]);

/* ---------- SC8.8.1 Ideas and theories of light in the past ---------- */

E("s8-u3-history", 3, ["SC8.8.1"], 1, "gen", function () {
  var cases = [
    { q: "Which historical idea about light is correctly matched to its thinker?", k: "Pythagoras believed light consisted of beams of particles travelling from the eye... ", w: ["Galileo measured the speed of light exactly using two telescopes", "Michelson believed light was made of waves on water", "Pythagoras believed light travelled as waves through air"] },
    { q: "What was Galileo's contribution to the study of light's speed?", k: "He attempted an experiment to determine whether light's speed could be measured, using lanterns over a distance", w: ["He calculated the speed of light exactly, arriving at the modern value of 3 x 10^8 m/s with lanterns", "He proved that light travels instantaneously from place to place and therefore has no speed at all", "He invented the telescope itself for the purpose of measuring the speed of light over a distance"] },
    { q: "What should students know about Michelson's experiment?", k: "It was conducted to calculate the speed of light, and it succeeded in measuring it; the details are not required", w: ["It proved once and for all that light has no measurable speed that any experiment could detect", "It showed that light travels through the air at exactly the same speed as sound travels", "It was an attempt to measure the speed of light that failed completely and measured nothing at all"] }
  ];
  var c = pick(cases);
  if (c.k.indexOf("travelling from the eye") >= 0) c.k = "Pythagoras believed light consisted of beams of particles";
  return mcq(c.q, c.k, c.w,
    "The guide's three historical anchors: Pythagoras held that light consisted of beams of particles; Galileo tried to determine light's speed with an experiment (his method could not resolve so fast a speed); and Michelson's experiment was conducted for the purpose of calculating the speed of light, which it did. Students need the purpose and the outcome, not the apparatus details.",
    {});
}, ["Particles belong to Pythagoras; the speed attempts belong to Galileo and Michelson.", "Michelson measured it; Galileo tried."]);

E("s8-u3-speed-light", 3, ["SC8.8.1"], 1, "var", varset([
  function () {
    return mcq("Which statement about the speeds of light and sound is correct?",
      "Light travels at 300,000,000 m/s (3 x 10^8 m/s), enormously faster than sound at about 330 m/s, which is why we see lightning before we hear its thunder",
      ["Light and sound both travel through the air at the same speed, about 330 m/s, so the flash and the thunder of a storm arrive together",
       "Sound travels faster than light through the air, which is why the thunder of a storm is always heard before its flash of lightning is seen",
       "Light travels at 300,000 m/s through the air, which is only slightly faster than the speed of sound travelling the same path"],
      "The speed of light is 3 x 10^8 m/s, about 300,000 km/s. Sound manages roughly 330 m/s. In a storm the flash's light reaches us almost instantly while the thunder dawdles behind: the guide's rule of thumb is that every 3 seconds of delay means the strike was about 1 km away.",
      {});
  }
]), ["Light's speed has an exact value to know: 3 x 10^8 m/s.", "Three seconds of thunder delay is about one kilometre."]);

E("s8-u3-cr-speed", 3, ["SC8.8.1"], 2, "var", varset([
  function () {
    return textq("A student watches a distant star and reads that its light left it 40 years ago. She asks: 'If the star exploded last year, why do I still see it shining?' Answer her using the speed of light, and connect your answer to why astronomers say telescopes look into the past. (3 marks)",
      ["light travels at a finite speed, 3 x 10^8 m/s, so distant light is old when it arrives", "the light from last year's explosion has not reached Earth yet", "we always see distant objects as they were when their light left them"],
      "<b>Model answer:</b> Light is fast but not instantaneous: it travels at 3 x 10^8 m/s, and the star is so far away that its light takes 40 years to cross the distance. The light arriving tonight left the star 40 years ago, so the student is seeing the star as it was then, still shining. The explosion happened only a year ago by our calendar, and its light has 39 more years of travel before it reaches Earth; until then, the old light keeps arriving and the star appears unchanged. That is the sense in which telescopes look into the past: every distant object is seen as it was when its light set out.<br><br><b>Marking points:</b> 1 mark for light's finite speed applied to the distance. 1 mark for the arriving light being 40 years old, so the star is seen as it was. 1 mark for the explosion's light not yet having arrived, generalizing to seeing the past.",
      {});
  }
]), ["Light's speed is huge but finite. Forty years of travel means forty-year-old news.", "We never see distant things 'now'; we see their light's departure time."]);

/* ---------- SC8.8.2 Early technologies from light knowledge ---------- */

E("s8-u3-early-tech", 3, ["SC8.8.2"], 1, "var", varset([
  function () {
    return mcq("How did scientific knowledge of light lead to the early microscope and telescope?",
      "Understanding how lenses refract light let makers combine lenses so distant and tiny objects could be magnified and studied",
      ["Understanding how reflection works let makers polish curved mirrors until the objects seen in them looked bigger",
       "The devices themselves came first, built by trial alone, and no knowledge of how light behaves was involved in making them",
       "Understanding how dispersion separates light into colours let makers build the devices for viewing distant objects"],
      "The microscope and telescope are the guide's examples of knowledge becoming technology: once lens makers understood that shaped glass refracts light in predictable ways, they could arrange lenses to magnify what the eye cannot resolve, near and far. The strand returns to their development again under trial and error.",
      {});
  }
]), ["Lenses plus refraction knowledge equals magnification.", "The science came first; the instruments were built on it."]);

E("s8-u3-telescope-types", 3, ["SC8.8.2"], 2, "var", varset([
  function () {
    return mcq("A reflecting telescope and a refracting telescope collect light from distant objects in different ways. Which description is correct?",
      "A reflecting telescope uses a large concave mirror to collect and focus the light; a refracting telescope uses lenses",
      ["A reflecting telescope collects light with lenses; a refracting telescope collects light with a large concave mirror",
       "Both kinds of telescope use large concave mirrors to collect light; they differ only in the size of the mirror",
       "A reflecting telescope uses a convex mirror to collect its light, which is why the images it forms are smaller"],
      "The names say it: reflecting telescopes reflect, using a concave primary mirror (the Keck telescope's mirror is 10 m across) to gather light; refracting telescopes refract, using lenses. Binoculars are two small refracting telescopes mounted side by side.",
      {});
  }
]), ["Reflecting means mirrors, refracting means lenses.", "The big dish-shaped collector is a concave mirror."]);

/* ---------- SC8.8.3 Using frequency and wavelength correctly ---------- */

E("s8-u3-freq-wave", 3, ["SC8.8.3"], 1, "var", varset([
  function () {
    return mcq("Which definitions of frequency and wavelength are correct?",
      "Wavelength is the distance between two neighbouring crests (or troughs); frequency is the number of waves passing a point in a given time, such as one second",
      ["Wavelength is the number of complete waves that pass a point in one second; frequency is the distance between neighbouring crests",
       "Wavelength is the height of a wave's crest above the rest position; frequency is the speed at which the wave travels",
       "Frequency and wavelength are simply two different names used for one and the same measurement of a wave"],
      "The guide insists on the words because they are easy to swap. Wavelength measures a length: crest to crest. Frequency measures a rate: how many waves pass a point per second. The stadium wave analogy helps: the spacing of the standing sections is like wavelength; how often they rise per minute is like frequency.",
      {});
  }
]), ["One is a distance, the other is a rate. Which is which?", "Wavelength: crest to crest. Frequency: waves per second."]);

E("s8-u3-freq-relation", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return mcq("A radio station broadcasts at 94.7 MHz and another at 95.9 MHz. A student says the second station's waves must have the longer wavelength 'because its number is bigger.' Correct the student using the frequency and wavelength relationship.",
      "The student has it backwards: higher frequency means shorter wavelength, so the 95.9 MHz waves are the shorter ones",
      ["The student is right about the relationship: frequency and wavelength grow larger together, in step",
       "Neither of the two stations has a wavelength at all, because radio waves are not a form of light",
       "The wavelengths of the two stations are identical, because every radio wave shares one single wavelength"],
      "Frequency and wavelength are inversely related for waves travelling at the same speed: high frequency waves have short wavelengths, and low frequency waves have long wavelengths. Radio stations are identified by frequency (the guide's example is OZ FM at 94.7 MHz on the Avalon Peninsula), so the bigger frequency number means the shorter wavelength.",
      {});
  }
]), ["The relationship is inverse: one up, the other down.", "Bigger frequency number, shorter waves."]);

E("s8-u3-cr-words", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return textq("A classmate writes: 'Red light has a high frequency because its wavelength is the longest of the visible colours, and violet has a low frequency because it bends the most in a prism.' The classmate has tangled the terms. Untangle the statement: correct each error and give the true relationships for red and violet light. (3 marks)",
      ["red has the longest wavelength and therefore the lowest frequency", "violet has the shortest wavelength and the highest frequency", "bending in a prism follows wavelength: violet bends most, red least"],
      "<b>Model answer:</b> Two errors are tangled together. First, frequency and wavelength move in opposite directions: a long wavelength means a low frequency, never a high one. Red light has the longest wavelength of the visible colours, so it has the lowest frequency, not the highest. Second, violet's strong bending in a prism goes with its short wavelength: violet has the shortest wavelength, the highest frequency, and the greatest refraction, while red, with the longest wavelength, refracts the least. Corrected, the statement reads: red, longest wavelength, lowest frequency, least refraction; violet, shortest wavelength, highest frequency, greatest refraction.<br><br><b>Marking points:</b> 1 mark for the inverse frequency-wavelength relationship stated. 1 mark for red corrected (longest wavelength, lowest frequency, least refraction). 1 mark for violet corrected (shortest wavelength, highest frequency, greatest refraction).",
      {});
  }
]), ["One relationship fixes both errors: frequency and wavelength move oppositely.", "Red and violet are the two ends of every ordering in this strand."]);

/* ---------- SC8.8.4 Effects of EM technologies ---------- */

E("s8-u3-effects", 3, ["SC8.8.4"], 3, "gen", function () {
  var cases = [
    { q: "Which analysis of a technology's effects is best supported?", k: "X-ray machines give doctors a way to detect injuries without surgery (positive), but each exposure adds a dose of higher-energy radiation, so exposures are limited and shielded (negative)", w: ["X-ray machines have only positive effects on the patients who are examined with them in hospitals, because they are medical devices used by doctors", "Microwave ovens are dangerous to their users in the same way that gamma ray sources are dangerous, because every kind of radiation is equally harmful to the human body at any exposure", "Cell phones have no effects at all on the people who use them every day that are worth discussing in this strand, either positive effects or negative ones"] },
    { q: "A safety pamphlet is being written about ultraviolet radiation. Which statement belongs in it?", k: "Ultraviolet is higher-energy radiation that can damage skin and eyes with overexposure, so protection such as sunscreen and sunglasses is advised, even though moderate exposure has uses such as tanning", w: ["Ultraviolet is the lowest-energy form of radiation found in sunlight at the beach, so it needs no precautions of any kind from the people exposed to it", "Exposure to ultraviolet radiation is beneficial to the skin and the eyes in unlimited amounts, at any time of day, so no limit on time in the sun is ever needed for anyone", "Sunglasses are worn at the beach in summer to protect the eyes from the gamma radiation that is present in the sunlight reaching the sand there"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Technologies built on electromagnetic radiation carry both signs of effect, and the guide's rule organizes them: generally, higher energy radiation is more harmful to humans. X-rays and ultraviolet reward care and shielding; radio waves and microwaves at ordinary levels are far less hazardous. A sound analysis names a real benefit and a real cost for the same technology.",
    {});
}, ["Look for the answer that holds a benefit and a cost for the same technology.", "Higher energy means more harm: that rule sorts the claims."]);

E("s8-u3-harm-energy", 3, ["SC8.8.4"], 1, "var", varset([
  function () {
    return mcq("Generally, which electromagnetic radiation is the most dangerous to humans, and which is the least?",
      "Gamma rays (high frequency, short wavelength, high energy) are generally the most dangerous; radio waves (low frequency, long wavelength, low energy) are the least",
      ["Radio waves are the most dangerous type of radiation of all; gamma rays, at the other end of the spectrum, are the least dangerous of all",
       "Visible light is the most dangerous type of radiation there is, because we are exposed to it constantly, all day long, wherever we go",
       "All types of electromagnetic radiation, from radio waves to gamma rays, are equally dangerous to people, at any level of exposure to them"],
      "The guide's general rule: exposure to high frequency, short wavelength radiation, such as gamma rays, is generally more dangerous, and low frequency, long wavelength radiation, such as radio waves, is generally less dangerous. High frequency waves are the high energy waves, and energy is what does the damage.",
      {});
  }
]), ["Danger follows energy, and energy follows frequency upward.", "Gamma end: dangerous. Radio end: comparatively safe."]);

E("s8-u3-atmosphere", 3, ["SC8.8.4"], 3, "var", varset([
  function () {
    return mcq("Astronauts outside Earth's atmosphere face a harsher radiation environment than people on the surface, even at the same distance from the Sun. Which explanation is correct?",
      "Earth's atmosphere blocks or absorbs much of the dangerous higher-energy radiation from space, and that protection is missing outside it",
      ["Space contains more radiation simply because astronauts travelling there are closer to the stars that produce it",
       "The atmosphere above us generates its own radiation, which cancels out the Sun's radiation at the surface below",
       "The spacesuits astronauts wear attract the radiation toward them, and that attraction is the whole problem"],
      "The guide ties habitability to shielding: Earth's atmosphere protects us from some of the more dangerous electromagnetic radiation present in space, which is part of what makes the surface safe for humans adapted to these conditions. Remove the atmosphere, as in space or on another planet, and the exposure rises sharply.",
      {});
  }
]), ["Same Sun, same distance. What does the surface have that orbit lacks?", "The atmosphere is a radiation shield, not just air to breathe."]);

/* ---------- SC8.8.5 Trial-and-error development (Core STSE: Fibre Optics) ---------- */

E("s8-u3-trial-error", 3, ["SC8.8.5"], 2, "var", varset([
  function () {
    return mcq("The Fibre Optics core STSE traces light communication from polished-shield signals and heliographs, through Bell's photophone, to lasers, and finally to fibre optic cable. Which statement best describes the development pattern the story shows?",
      "Each generation solved a problem the previous one exposed, and progress waited on materials: fibre optics became possible only when very pure glass could be drawn into hair-thin strands that guide light by reflection",
      ["Fibre optics were invented in a single step by one inventor, working alone in a workshop, who foresaw the whole design of the finished system in every detail from the start",
       "The photophone failed in the end simply because the people who invented it and tried to sell it did not understand the behaviour of light at all, in any of its forms",
       "The development was essentially random from start to finish: each new device appeared on its own, unrelated to any of the devices that came before it in the story of light communication"],
      "The STSE's pattern is systematic trial and error under material constraints. Heliographs needed sun and line of sight; the photophone (1880) carried voice on light but weather and interference defeated it; lasers gave a concentrated beam but fog and buildings still blocked it; the answer was to guide the light inside a cable, which required glass pure and fine enough to serve as the core. Two companies, Corning and Siemens, combined their fibre and cabling work for the first cable in 1977.",
      {});
  }
]), ["Each device answers the previous device's failure. What finally had to exist before fibre could work?", "Pure, hair-thin glass is the material constraint at the story's end."]);

E("s8-u3-materials-constraint", 3, ["SC8.8.5"], 1, "var", varset([
  function () {
    return mcq("Contact lenses could only become practical once a material existed that was transparent, shaped to refract light correctly, and safe and comfortable against the eye for hours. Which statement about optical technology does this example illustrate?",
      "Optical technologies develop through trial and error constrained by the optical properties of the available materials",
      ["New optical technologies appear in workshops as soon as the idea for them is first written down on paper",
       "The material that an optical device is made from has no effect at all on how the device must be designed",
       "Contact lenses work by reflecting light at their surfaces, so the material they are made of never refracts light"],
      "The guide's framing for this indicator: advances in optical technology follow the development of materials suited to the application. Lenses of any kind are hostage to their material's optical properties; contact lenses waited on a material that could be worn on the eye itself.",
      {});
  }
]), ["The idea was old. What was missing until the material arrived?", "No suitable material, no technology: that is the constraint."]);

E("s8-u3-cr-fibre", 3, ["SC8.8.5"], 3, "var", varset([
  function () {
    return textq("Using the Fibre Optics story, explain how an optical technology develops through systematic trial and error. Your answer should trace at least two steps in the chain from early light signalling to the fibre optic cable, name the problem each step exposed, and identify the material property that finally made fibre optics practical. (4 marks)",
      ["a chain of attempts, each answering a problem the last one exposed", "problems such as weather, interference and line of sight for open-air light signals", "very pure glass drawn hair-thin, guiding light by repeated reflection inside the core", "development as systematic and collaborative rather than a single leap"],
      "<b>Model answer:</b> Light communication began with reflected sunlight: polished shields, then the Mance Heliograph, which could signal 50 km but only in sunshine and clear air. Bell's photophone (1880) carried a voice on a vibrating mirror's reflected sunlight, a genuine advance, but clouds and interference could not be shut out, and Bell abandoned it. The laser in the late 1950s gave a concentrated beam that could carry far more information, yet fog, rain and buildings still blocked open-air paths. Each failure defined the next problem precisely: the light needed a protected path. The solution used two known properties of light, that it passes through glass and reflects off glass at the right angle, but it waited on a material: glass pure enough, drawn into strands as thin as a hair, so light reflects repeatedly inside the core and travels the cable's length. Corning's fibre and Siemens' cabling combined into the first fibre optic cable in 1977, a group achievement built from a century of other people's trials.<br><br><b>Marking points:</b> 1 mark for a chain of at least two steps with the problem each exposed. 1 mark for the specific problems of open-air light signalling (weather, interference, line of sight). 1 mark for the material property (very pure glass, hair-thin, guiding light by internal reflection). 1 mark for characterizing the process as systematic trial and error, carried out by many workers and groups.",
      {});
  }
]), ["Tell it as a chain: attempt, problem, next attempt. End at the material that made it possible.", "The glass is the climax: pure, thin, and reflective inside."]);

/* ---------- SC8.8.6 Optical technologies enabling research ---------- */

E("s8-u3-research-tech", 3, ["SC8.8.6"], 1, "gen", function () {
  var cases = [
    { q: "Which example shows an optical technology enabling scientific research?", k: "Astronomy teams use large telescopes to survey the universe and gather light from objects too faint for the eye", w: ["A hockey player wears a clear plastic face shield fitted on a helmet during a league game at the local arena", "A driver switches on the headlights of a car to see the road while driving along a dark road at night in the country", "A student sits at a desk at home in the evening and reads a book for school under the light of a desk lamp"] },
    { q: "Which personal activity is directly related to the optical technologies researchers use?", k: "Using a magnifying glass or a backyard telescope to observe specimens and the night sky", w: ["Wearing a pair of sunglasses at the beach on a bright afternoon in summer", "Watching a movie on the large screen of a theatre in town on the weekend", "Using a microwave oven in the cafeteria to heat up a lunch brought from home"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The indicator pairs two directions: optical technologies enable research (telescopes surveying the universe, microscopes opening the microscopic world), and the same technologies appear in personal activities (a magnifying glass, a hobby telescope), which is how the guide asks students to relate the two.",
    {});
}, ["Research means gathering new knowledge with the device, not just using light.", "Telescopes and microscopes are the research pair."]);

E("s8-u3-personal-optics", 3, ["SC8.8.6"], 1, "var", varset([
  function () {
    return mcq("Which list contains only optical technologies, of the kind this strand studies?",
      "Face shields on hockey helmets, car headlights, flashlights, magnifying glasses, eyeglasses, contact lenses, microscopes, telescopes and cameras",
      ["Face shields, car headlights, radios, televisions, electric kettles, hair dryers, magnifying glasses and telescopes",
       "Eyeglasses, contact lenses, microwave ovens, radios, toasters, televisions, hair dryers, electric kettles and cameras",
       "Flashlights, telescopes, cell phones, microwave ovens, radios, toasters, televisions, hair dryers and microscopes"],
      "Every item on the correct list works by reflection or refraction of light, and the list is the guide's own example set for this indicator. Radios, microwaves and cell phones belong to the wider EM spectrum study, but they are not optical technologies.",
      {});
  }
]), ["Optical means light-bending or light-bouncing devices only.", "If it works on radio or microwaves, it is out."]);

E("s8-u3-cr-research", 3, ["SC8.8.6"], 2, "var", varset([
  function () {
    return textq("Choose one optical technology (microscope, telescope, or fibre optics in medicine and communications). Explain how it enables scientific research: what can researchers observe or do with it that they could not without it, and which property of light makes it work. (3 marks)",
      ["the technology named with a research capability it creates", "the observation or measurement that was impossible before it", "the property of light it depends on"],
      "<b>Model answer:</b> The telescope enables astronomy. Distant objects send so little light to Earth that the unaided eye detects only the brightest stars; a telescope's large concave mirror or lenses collect light from a wide area and focus it, so researchers can observe faint galaxies, measure the light of individual distant stars, and survey the universe systematically, building the modern picture of its size and history. The property at work is reflection (for a reflecting telescope): the law of reflection lets a precisely curved mirror gather parallel rays to a focus. (The microscope, extending refraction to the microscopic world, or fibre optics, carrying light into the body and across oceans for research data, treated the same way, also earn full marks.)<br><br><b>Marking points:</b> 1 mark for the research capability the technology creates. 1 mark for what was impossible or impractical without it. 1 mark for the property of light it depends on.",
      {});
  }
]), ["Capability, gap, property: three moves.", "Name what researchers can do now that they could not do before."]);

/* ---------- SC8.8.7 Individual and group work in optics ---------- */

E("s8-u3-individual-group", 3, ["SC8.8.7"], 1, "var", varset([
  function () {
    return mcq("Which pairing correctly illustrates individual and group scientific and technological activity in optics?",
      "Individual: a lens maker grinding and testing lenses in a workshop. Group: an astronomy team surveying the universe with a shared observatory",
      ["Individual: the international Hubble telescope programme with its many teams. Group: a single student working with a magnifying glass",
       "Individual work and group work never both occur within one and the same field of science and technology",
       "Individual: an astronomy team working at an observatory. Group: a lone inventor working alone at home"],
      "The guide's own contrast: some optics work is done by individuals, such as lens makers, and some by groups, such as astronomy teams investigating and surveying the universe. Modern flagships like the Hubble telescope are group work on the largest scale, while the craft tradition of the individual lens maker continues.",
      {});
  }
]), ["One pair has the scale right in both halves. Check each half separately.", "Lens maker alone; astronomy team together."]);

E("s8-u3-corning-siemens", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("The first fibre optic cable, in 1977, combined Corning's fibre technology with Siemens' cabling technology. What does this example illustrate about scientific and technological activity?",
      "Major technologies often result from groups and organizations combining different expertise, not from a single worker",
      ["Companies working on new technology never share any of their expertise with one another during development",
       "The finished cable was the work of one single individual, working alone at one of the two companies",
       "Fibre optics required no scientific knowledge of light at all, only the manufacturing skill to make the cable"],
      "Neither company held the whole solution: one had the fibre, the other the cable. Their joint work is the STSE's clearest case of technological activity as a group enterprise, set beside individual workers like lens makers elsewhere in the strand.",
      {});
  }
]), ["Two companies, two halves of the solution. What kind of activity is that?", "Group work at the scale of organizations."]);

E("s8-u3-hubble", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("The Hubble Space Telescope was designed, built, launched and operated by large teams across many institutions and countries, and its mirror flaw was corrected by a servicing mission planned by still more teams. Which conclusion about optics work does Hubble best support?",
      "Modern optical research is predominantly group activity, building cumulatively on earlier workers' knowledge from Galileo and Newton onward",
      ["One talented individual, working alone, can still design and complete a flagship optical instrument like Hubble",
       "Hubble shows that work done by large groups produces flawed results, and that group work should be avoided in optics",
       "Our knowledge of optics was already complete by Newton's time, and nothing about it has changed since then"],
      "The guide presents the line from Galileo to Newton to Hubble and laser technologies as knowledge under continuous, collective development: today's understanding is not stagnant and will be extended. Hubble's scale, and the team effort that repaired it, are the modern face of that group activity.",
      {});
  }
]), ["Scale is the evidence: count the institutions a flagship needs.", "Cumulative and collective: knowledge handed on and built up."]);

/* ---------- SC8.9.1 New questions arising from what was learned ---------- */

E("s8-u3-new-questions", 3, ["SC8.9.1"], 2, "var", varset([
  function () {
    return mcq("After studying the electromagnetic spectrum, a class brainstorms new questions that arise from what they learned. Which question genuinely arises from the spectrum material?",
      "If ultraviolet radiation is invisible and can damage skin, how much ultraviolet reaches us on a cloudy day, and does sunscreen block all of it?",
      ["Why does the sky over the harbour look blue on some days of the year and grey and overcast on other days instead of blue?",
       "How do the plants growing in a school garden make their own food from the sunlight that falls on their leaves through the day?",
       "What is the capital city of every country in the world where X-ray machines are used in the hospitals of its towns and cities?"],
      "A question arises from what was learned when it grows out of the material itself: the spectrum study establishes that ultraviolet is invisible, energetic and harmful, and the question pushes exactly there. The other questions are fine questions, but they belong to other topics and other courses.",
      {});
  }
]), ["The new question must grow out of the spectrum study itself.", "Invisible plus harmful suggests a measurement question about ultraviolet."]);

E("s8-u3-new-problem", 3, ["SC8.9.1"], 1, "var", varset([
  function () {
    return mcq("Studying fibre optics raises a practical problem for a school board: older buildings have copper wiring that is slow for the school's network. Which statement frames the problem the new learning creates?",
      "Can fibre optic cable be installed in the older buildings, and would its light-based signals solve the speed problem the copper creates?",
      ["Why did the school board not simply invent fibre optic cable itself when the buildings were first wired?",
       "Copper wiring should simply be banned in every building everywhere, starting immediately, whatever it costs",
       "The speed of the school's network is a problem for the board, but it has no connection to optics at all"],
      "New learning creates new problems when it reveals a better possibility: knowing that fibre carries signals as light, quickly and without electrical interference, turns the old copper installation into a defined problem with a testable solution.",
      {});
  }
]), ["The problem exists because the learning showed a better way.", "Fibre's advantages define the copper problem."]);

/* ---------- SC8.9.2 Operational definitions ---------- */

E("s8-u3-definitions", 3, ["SC8.9.2"], 1, "gen", function () {
  var cases = [
    { q: "In a reflection diagram, what is the normal?", k: "The line drawn perpendicular (at 90 degrees) to the surface at the point where the ray strikes it", w: ["The line running along the surface of the mirror itself at the point where the ray reflects", "The incoming ray itself, travelling toward the mirror", "The line drawn halfway between the surface of the mirror and the reflected ray leaving it"] },
    { q: "Which term names the ray that travels toward a mirror and strikes it?", k: "The incident ray", w: ["The reflected ray", "The normal", "The refracted ray"] },
    { q: "What is the angle of incidence, operationally?", k: "The angle between the incident ray and the normal, measured at the point of incidence", w: ["The angle between the incoming incident ray and the surface of the mirror it strikes", "The angle between the reflected ray leaving the mirror and the surface of the mirror", "The angle formed between the two mirrors mounted inside the tube of a periscope"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The reflection vocabulary is operational: the incident ray arrives, the reflected ray leaves, the normal stands perpendicular to the surface at the point of contact, and both angles are measured from the normal. These definitions are what Core Lab 5-2B's measurements mean.",
    {});
}, ["Every angle in reflection hangs off the normal.", "Incident arrives; reflected leaves; normal stands at 90 degrees."]);

E("s8-u3-definitions-figure", 3, ["SC8.9.2"], 3, "var", varset([
  function () {
    var q = mcq("The diagram shows a reflection with parts labelled A, B, C and D. Which labelling is correct?",
      "A is the incident ray, B is the reflected ray, C is the normal, and D is the mirror",
      ["A is the reflected ray, B is the incident ray, C is the mirror, and D is the normal",
       "A is the normal, B is the incident ray, C is the reflected ray, and D is the mirror",
       "A is the incident ray, B is the normal, C is the reflected ray, and D is the mirror"],
      "Read the geometry: A is the ray travelling in toward the mirror (incident), B is the ray travelling away after the bounce (reflected), C is the dashed line at 90 degrees to the surface (the normal), and D is the reflecting surface itself (the mirror).",
      {});
    q.figure = s8ReflectSVG(40, true);
    return q;
  }
]), ["Trace the light's path first: in, bounce, out. The dashed line is the normal.", "Direction of travel separates incident from reflected."]);

E("s8-u3-operational", 3, ["SC8.9.2"], 2, "var", varset([
  function () {
    return mcq("A class watches a tennis ball bounce off the floor at several angles and maps its path, then does the same with a ray box and mirror. Which statement best formulates the operational definition they are building toward?",
      "For both the ball and the light ray, the angle at which the path meets the normal before the bounce equals the angle at which it leaves after the bounce",
      ["Balls and rays of light, in every case, always bounce straight back along exactly the same path by which they came in to the surface",
       "The angle at which the path bounces off the surface depends only on how hard the ball happens to be thrown at the floor by the student",
       "A ray of light obeys the bounce pattern only on those occasions when a protractor is present on the bench to measure the angles it makes"],
      "Operational definitions come from operations: doing the bouncing and measuring. Ball and ray behave the same way, which is why the guide introduces reflection through the ball demonstration: measure against the normal on both sides, and the equality is the definition in action.",
      {});
  }
]), ["The definition is built by measuring, not by memorizing.", "Ball and ray share one bounce rule."]);

/* ---------- SC8.9.3 Using mirrors to investigate images (CORE-adjacent) ---------- */

E("s8-u3-protractor", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 5-2B, a group keeps getting angles of reflection a few degrees off their angles of incidence. Which practice most improves their accuracy?",
      "Draw the normal carefully at the exact point of incidence, place the protractor's centre on that point, and measure both angles from the normal",
      ["Measure the angle of incidence from the normal as usual, but measure the angle of reflection from the mirror's surface itself",
       "Estimate both of the angles by eye alone and then average the guesses made by the members of the group",
       "Measure both of the angles from the surface of the mirror instead, since the surface is easier to see clearly"],
      "Accurate mirror work is a chain of small disciplines: the rays drawn straight with a ruler from marked dots, the normal drawn at the point of incidence, the protractor centred on that point, and both angles read from the normal. Mixing references (normal for one angle, surface for the other) manufactures exactly the few-degrees error described.",
      {});
  }
]), ["Same point, same reference line, both angles: that is the accuracy chain.", "Most lab error here is a reference error, not a reading error."]);

E("s8-u3-concave-rays", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return mcq("Which pair of statements correctly describes the two special rays used in concave mirror ray diagrams?",
      "A ray travelling parallel to the principal axis reflects through the focal point; a ray travelling through the focal point reflects parallel to the principal axis",
      ["A ray parallel to the axis reflects back on itself; a ray through the focal point is absorbed",
       "A ray parallel to the axis reflects through the centre of curvature; a ray through the focal point reflects through the centre too",
       "Both special rays reflect through the focal point, whatever their incoming path"],
      "The two rays are mirror images of one rule: parallel in, through the focal point out; through the focal point in, parallel out. Those two reflected rays are enough to locate an image, which is why the guide builds every curved mirror diagram from them (the textbook's third ray through the optical centre is not required).",
      {});
  }
]), ["The two rays swap roles: parallel and focal point trade places.", "In parallel, out through F. In through F, out parallel."]);

E("s8-u3-concave-spot", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    var q = mcq("The ray diagram shows an object placed beyond the centre of curvature of a concave mirror. Reading the diagram (not from memory), what are the image's properties?",
      "Smaller than the object, between the focal point and the centre of curvature, inverted, and real",
      ["Larger than the object, beyond the centre of curvature, inverted, and real",
       "Smaller than the object, behind the mirror, upright, and virtual",
       "The same size as the object, at the centre of curvature, inverted, and real"],
      "Read the drawing: the two reflected rays actually meet in front of the mirror, between F and C, so the image is real and located there; the image arrow is shorter than the object arrow (smaller) and points down (inverted). The guide is explicit that these characteristics are identified from a specific ray diagram, not memorized.",
      {});
    q.figure = s8ConcaveSVG("beyond");
    return q;
  },
  function () {
    var q = mcq("The ray diagram shows an object placed between the focal point and the centre of curvature of a concave mirror. Reading the diagram, what are the image's properties?",
      "Larger than the object, beyond the centre of curvature, inverted, and real",
      ["Smaller than the object, between the focal point and the centre, inverted, and real",
       "Larger than the object, behind the mirror, upright, and virtual",
       "The same size as the object, upright, and virtual"],
      "In the drawing the reflected rays meet beyond C, and the image arrow stands taller than the object arrow and points down: larger, beyond the centre of curvature, inverted, and real (formed where the rays actually meet, in front of the mirror). Moving the object changed every property, which is the lesson of the three positions.",
      {});
    q.figure = s8ConcaveSVG("between");
    return q;
  },
  function () {
    var q = mcq("The ray diagram shows an object placed between the focal point and a concave mirror. Reading the diagram, what are the image's properties?",
      "Larger than the object, behind the mirror, upright, and virtual",
      ["Smaller than the object, in front of the mirror, inverted, and real",
       "Larger than the object, in front of the mirror, inverted, and real",
       "The same size as the object, behind the mirror, upright, and virtual"],
      "Here the reflected rays spread apart in front of the mirror and never meet; their dashed extensions meet behind the mirror, where the image arrow stands: larger, upright, and virtual. It is the magnifying case, the shaving or makeup mirror position.",
      {});
    q.figure = s8ConcaveSVG("inside");
    return q;
  }
]), ["Let the drawing answer: where do the rays meet, and how does the image arrow compare?", "Dashed image means virtual; meeting rays mean real."]);

E("s8-u3-convex-spot", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    var q = mcq("The ray diagram shows an object in front of a convex mirror. Which properties does the diagram show the image to have?",
      "Smaller than the object, closer to the mirror than the object, upright, and virtual",
      ["Larger than the object, farther from the mirror, inverted, and real",
       "Smaller than the object, in front of the mirror, upright, and real",
       "The same size as the object, the same distance away, upright, and virtual"],
      "The convex case never varies: the reflected rays diverge, their extensions meet behind the mirror, and the image is always smaller, closer, upright and virtual. That reliability, plus the wide field of view, is why convex mirrors serve as safety and security mirrors.",
      {});
    q.figure = s8ConvexSVG();
    return q;
  }
]), ["Convex images are the strand's one fixed pattern. Read it off the diagram.", "Smaller, closer, upright, virtual: every time."]);

E("s8-u3-real-virtual", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    return mcq("On a ray diagram, how do you distinguish a real image from a virtual image?",
      "A real image forms in front of the mirror where the reflected rays actually meet; a virtual image forms behind the mirror where the rays' extensions appear to meet",
      ["A real image is always larger than the object that forms it in front of the mirror; a virtual image is always smaller than the object that forms it",
       "A real image always stands upright in front of the mirror that forms it; a virtual image, formed behind the mirror, is always inverted instead",
       "A real image can be seen only in photographs taken of it; a virtual image can be seen only in person, never photographed"],
      "The guide limits the distinction to location on the diagram, and that is enough: rays actually converging in front of the mirror make a real image (it could be caught on a screen); rays that must be extrapolated backward to a meeting point behind the mirror make a virtual one. Size and orientation vary independently.",
      {});
  }
]), ["Location decides: rays meeting, or extensions meeting?", "In front and actual means real; behind and apparent means virtual."]);

E("s8-u3-cr-mirror-lab", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return textq("In Core Lab 5-2B, Part B, a group places an arrow 6 cm in front of a plane mirror, draws the ray diagram, and locates the image 6 cm behind the mirror, the same height as the arrow. A second group uses 10 cm and finds the image 10 cm behind. A third group reports its image at 8 cm behind for an object 12 cm in front, and its drawn rays do not meet at one point. State the conclusion the first two groups' data supports, and evaluate the third group's result. (3 marks)",
      ["image distance equals object distance in a plane mirror", "image size equals object size", "the third group's diagram has a construction error, since its rays should meet at 12 cm behind"],
      "<b>Model answer:</b> The agreeing data supports the plane mirror conclusion: the image forms as far behind the mirror as the object is in front (6 cm and 6 cm; 10 cm and 10 cm), and the image is the same size as the object, upright and virtual. The third group's result does not fit the pattern its classmates established, and its own evidence betrays it: properly drawn reflected rays from a point meet at a single image point, so rays that fail to meet mean the construction, not the mirror, is at fault, most likely a normal drawn at the wrong point or angles measured from the surface. The group should redraw carefully and remeasure rather than report 8 cm as a finding.<br><br><b>Marking points:</b> 1 mark for the conclusion (image distance equals object distance, same size). 1 mark for judging the third result against the pattern. 1 mark for identifying the construction error from the non-meeting rays.",
      {});
  }
]), ["Two groups agree on a pattern; the third disagrees and its own diagram shows why.", "Equal distances is the conclusion; non-meeting rays are the tell."]);

/* ---------- SC8.9.4 Defining and delimiting questions ---------- */

E("s8-u3-delimit", 3, ["SC8.9.4"], 2, "var", varset([
  function () {
    return mcq("A student's investigation question reads: 'Everything about how mirrors work.' Which revision properly defines and delimits it for an investigation?",
      "How does the angle of incidence of a ray on a plane mirror compare with its angle of reflection, for angles between 20 and 60 degrees?",
      ["How do mirrors of every kind, plane and curved alike, work, everywhere in the universe and throughout all of history?",
       "Why are mirrors so interesting to look at for people of all ages, and why do people enjoy playing with them so much?",
       "What is the complete history of mirrors in human civilization, from the earliest polished metal mirrors to the present day?"],
      "Delimiting narrows a topic to a measurable question with boundaries: one mirror type, two named angles to compare, and a stated range. The original and the other options have no variables and no edges, so no investigation could finish them.",
      {});
  }
]), ["A delimited question names its variables and its limits.", "One mirror, two angles, a stated range."]);

E("s8-u3-delimit-problem", 3, ["SC8.9.4"], 1, "var", varset([
  function () {
    return mcq("A team wants to investigate why the school gymnasium's windows produce glare on the floor during morning classes. Which problem statement is delimited well enough to investigate?",
      "Between 9 and 10 a.m., sunlight reflecting off the gym's east windows creates glare patches on the floor; the team will test which window covering removes the glare while keeping the gym usable",
      ["The school gymnasium is too bright inside at some times of the day, on some days of the week, and something should really be done about the brightness eventually, by somebody",
       "Sunlight coming through classroom windows is a problem for all schools, in all places in the country, at all times of the day and in every season of the school year",
       "The team will take on the job of solving, once and for all, the problem of window glare in every school building in every community in the whole province this year"],
      "A delimited problem names the place, the time, the phenomenon and the test to run. Province-wide and someday statements cannot be investigated by a school team; the first option can be, in a week of mornings.",
      {});
  }
]), ["Place, time, phenomenon, test: a problem small enough to actually run.", "If the team cannot finish it, it is not delimited."]);

/* ---------- SC8.9.5 Predictions and hypotheses ---------- */

E("s8-u3-hypothesis", 3, ["SC8.9.5"], 2, "var", varset([
  function () {
    return mcq("Before Core Lab 5-2B, a student must state a hypothesis about reflection. Which statement is a proper hypothesis for the lab?",
      "If a ray strikes a plane mirror at a measured angle of incidence, then the angle of reflection will equal it, because the law of reflection governs every ray at a smooth surface",
      ["Mirrors are fun to work with in the laboratory during science class, and everyone in the class expects the reflection lab to be an interesting one to do",
       "The angle of reflection might perhaps do something or other, we are not sure what, when we shine the light from the ray box onto the surface of the mirror",
       "The reflection of light off smooth surfaces was discovered a very long time ago by scientists working in the distant past, long before this laboratory was built"],
      "A hypothesis is a testable statement with a reason attached: it predicts the measurable outcome (equal angles) and grounds the prediction (the law). Opinions, vague gestures and history are not hypotheses because the lab cannot test them.",
      {});
  }
]), ["A hypothesis predicts a measurable result and says why.", "If-then plus a reason: that is the shape."]);

E("s8-u3-prediction", 3, ["SC8.9.5"], 1, "var", varset([
  function () {
    return mcq("A group has measured angles of incidence and reflection of 20 and 20, 35 and 35, and 50 and 50 degrees. Based on the pattern, what is the sound prediction for a new trial at 65 degrees incidence, and what is it based on?",
      "The angle of reflection will be 65 degrees, based on the observed pattern that the two angles are always equal",
      ["The angle of reflection will be 25 degrees, because the two angles in each trial must always add up to 90 degrees",
       "No prediction of any kind is possible from the results of only three trials of the experiment",
       "The angle of reflection will be 130 degrees, because the reflection angle doubles each time as the trials proceed"],
      "A prediction extends an observed pattern: three trials all show equality, so the next trial is predicted to show it too. Predictions are only as good as the pattern behind them, which is why the lab collects several angles instead of one.",
      {});
  }
]), ["Extend the pattern the data already shows.", "Equal, equal, equal: predict equal."]);

/* ---------- SC8.9.6 Using tools and apparatus safely (CORE) ---------- */

E("s8-u3-safety", 3, ["SC8.9.6"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe and correct way to work with the ray box and mirrors in the optics labs?",
      "Never look directly into the ray box beam or shine it toward anyone's eyes, and handle mirrors by their edges to avoid cuts from chipped glass",
      ["Look directly along the beam of the ray box with one eye held close to it to check that the beam is straight before measuring angles",
       "Shine the beam of the ray box across the room at a partner's mirror on another bench to test how quick their reflexes are in catching it",
       "Carry the mirrors loosely in one hand, without their cases, while walking around the room from bench to bench during the lab period"],
      "Optics apparatus has two standing hazards: beams aimed at eyes, and glass that can chip or break. The safe habits are to keep beams on the bench and away from eyes, and to handle mirrors carefully by their edges. Bench skill is classroom assessment; this entry carries the safety knowledge.",
      {});
  }
]), ["Beams away from eyes; glass handled by its edges.", "The beam is for the paper, never for a face."]);

/* ---------- SC8.9.7 Conclusions from experimental data ---------- */

E("s8-u3-conclusion", 3, ["SC8.9.7"], 2, "var", varset([
  function () {
    return mcq("A group's reflection data read: incidence 15, reflection 15; incidence 30, reflection 29; incidence 45, reflection 46; incidence 60, reflection 60. Which conclusion is properly based on this data?",
      "The angle of reflection equals the angle of incidence, within the small measurement errors expected from protractor work",
      ["The law of reflection is disproved by this data, because two of the four trials are off by a single degree each",
       "The angle of reflection in the data is sometimes larger and sometimes smaller than the incidence angle, so no pattern exists in it",
       "The group should simply change the two values that are off by a degree so that all the data match the law exactly"],
      "Conclusions respect both the pattern and the instrument. Three exact matches and two misses of a single degree, the width of a pencil line on a protractor, support the law with measurement error named. Fudging the numbers to perfection would corrupt the data; declaring the law dead over one degree would ignore how measurement works.",
      {});
  }
]), ["Judge the pattern against the instrument's precision.", "One degree is protractor noise, not a refutation."]);

E("s8-u3-evidence", 3, ["SC8.9.7"], 2, "var", varset([
  function () {
    return mcq("A student began the refraction unit predicting that light bends toward the normal when it speeds up. After Core Lab 5-1D, her diagrams show rays bending toward the normal as they enter water, where light travels more slowly. Which statement correctly relates her evidence to her initial idea?",
      "The evidence refutes her initial idea: bending toward the normal happens when light slows down entering a denser medium, the opposite of her prediction",
      ["The evidence gathered in the lab supports her original idea, because the rays did bend toward the normal, just as she said they would",
       "The evidence from the lab is unrelated to her original idea, because ray diagrams drawn on paper are not evidence",
       "Her original idea and the lab evidence agree with each other, since water is a less dense medium than air is"],
      "Evidence work means comparing the claim with the result on the claim's own terms. She predicted the bend would accompany speeding up; the lab shows the bend toward the normal accompanying slowing down in the denser medium. The direction she named was right and the mechanism she attached to it was wrong, so the idea as stated is refuted and must be revised.",
      {});
  }
]), ["Compare the whole claim, mechanism included, with what the data show.", "Right direction, wrong reason still counts as refuted."]);

E("s8-u3-cr-conclusion", 3, ["SC8.9.7"], 3, "var", varset([
  function () {
    return textq("A class tests whether the angle of refraction depends on the liquid, shining a ray at 40 degrees incidence from air into three liquids. Their measured angles of refraction are: water 29 degrees, vegetable oil 26 degrees, 30 percent sugar solution 27 degrees. One group also recorded glycerol at 41 degrees. (a) State a conclusion the class data supports about liquids and refraction. (b) Evaluate the glycerol result. (3 marks)",
      ["the denser liquids bend the ray more toward the normal, giving smaller refraction angles", "oil and sugar solution bend more than water in this data", "the glycerol value breaks the pattern and exceeds the incidence angle, so it should be remeasured"],
      "<b>Model answer:</b> (a) All three reliable results show the ray bending toward the normal (refraction angle smaller than the 40 degree incidence angle), and the amount of bending differs by liquid: the oil bent the ray most (26 degrees), then the sugar solution (27), then water (29). The supported conclusion is that the medium affects the angle of refraction, with the denser liquids in this set bending light more strongly toward the normal. (b) The glycerol result, 41 degrees, is larger than the angle of incidence, which would mean the ray bent away from the normal while entering a denser liquid, contradicting every other measurement and the bending rule. It is almost certainly a measurement or recording error (for example, measuring from the surface instead of the normal) and the group should remeasure it rather than report it.<br><br><b>Marking points:</b> 1 mark for the conclusion that the medium affects the refraction angle, with the ordering from the data. 1 mark for noting all angles are smaller than the incidence angle (bending toward the normal). 1 mark for evaluating the glycerol value as an error against the pattern and prescribing remeasurement.",
      {});
  }
]), ["Conclude from the three agreeing values; judge the fourth against the pattern and the rule.", "An angle bigger than the incidence angle, entering a denser liquid, cannot stand."]);

/* ---------- SC8.9.8 Questions about refraction from practical problems ---------- */

E("s8-u3-fish-question", 3, ["SC8.9.8"], 2, "var", varset([
  function () {
    return mcq("A fisher notices that a trout under the water is never quite where it appears to be. Which question turns this practical problem into an investigation of refraction?",
      "By how much does the apparent depth of an object under water differ from its real depth, and does the difference grow as the viewing angle changes?",
      ["Why do the trout living in a pond learn, over a single season, to avoid being caught by the people who come to fish for them there?",
       "Is fishing for trout in a pond better early in the morning, before the sun is high, or later on in the evening of the same day?",
       "Who was the first person in recorded history to notice that fish under the water of a pond look displaced from where they really are?"],
      "The practical problem is the displacement. The investigable version measures it (apparent versus real depth) and varies a condition (viewing angle). The bent stick and the fish are the guide's own examples of refraction questions arising from practical problems.",
      {});
  }
]), ["The investigation must measure the displacement, not just admire it.", "Apparent versus real, with one condition varied."]);

E("s8-u3-coin-question", 3, ["SC8.9.8"], 1, "var", varset([
  function () {
    return mcq("A coin at the bottom of an empty opaque cup is hidden by the cup's rim. When water is poured in, the coin appears, as if it floated up. Which question should the class investigate from this demonstration?",
      "How does the water change the path of light from the coin so that it reaches the eye over the rim?",
      ["Why did the coin at the bottom of the cup not really float upward when the water was poured in?",
       "What kind of metal is the coin at the bottom of the cup made of, and where was it minted?",
       "How much water, in total, does the opaque cup used in the demonstration hold when it is full?"],
      "The demonstration's puzzle is optical: the coin did not move, its light's path did. The investigable question targets the refraction that bends the light at the surface, the same apparent-position effect as the bent stick and the fish.",
      {});
  }
]), ["The coin stayed put. What travelled differently?", "The light's path is the investigation."]);

/* ---------- SC8.9.9 Estimating angles of incidence and refraction ---------- */

E("s8-u3-estimate-bend", 3, ["SC8.9.9"], 2, "gen", function () {
  var cases = [
    { mode: "toward", q: "The diagram shows a ray passing from air into water. Which estimate of the angle of refraction, compared with the angle of incidence, is correct?", k: "The angle of refraction is smaller: entering the denser medium, the ray bends toward the normal", w: ["The angle of refraction is the larger one: the ray bends away from the normal as it enters the water", "The two angles are equal to each other: refraction at a surface never changes the angle of a ray at all", "The angle of refraction is zero degrees: the ray stops at the surface and goes no farther into the water"] },
    { mode: "away", q: "The diagram shows a ray passing from water into air. Which estimate of the angle of refraction, compared with the angle of incidence, is correct?", k: "The angle of refraction is larger: leaving the denser medium, the ray bends away from the normal", w: ["The angle of refraction is the smaller one: the ray bends toward the normal as it leaves the water", "The two angles are equal to each other: the ray continues perfectly straight across the boundary", "The angle of refraction is 90 degrees: on leaving the water, the ray runs along the surface itself"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "Estimating refraction angles starts with direction, and direction follows density. Entering a medium of greater density, light slows and bends toward the normal, so the refraction angle is the smaller one. Leaving for a less dense medium, it speeds up and bends away, so the refraction angle is the larger one. The dashed line in the diagram is the path the ray would have taken with no bending.",
    {});
  q.figure = s8RefractSVG(c.mode, true);
  return q;
}, ["Direction first: toward the normal entering denser, away leaving it.", "The dashed line is the no-bend path; the real ray sits on the normal side of it, or the far side."]);

E("s8-u3-estimate-compare", 3, ["SC8.9.9"], 3, "var", varset([
  function () {
    return mcq("Two rays strike a water surface from the air, one at 20 degrees incidence and one at 55 degrees. A student estimates both refraction angles. Which estimate pattern is sound?",
      "Both refraction angles are smaller than their incidence angles, and the 55 degree ray bends by more degrees than the 20 degree ray",
      ["Both of the refraction angles estimated are larger than the incidence angles they started from",
       "The ray at 20 degrees bends by more degrees than the ray at 55 degrees, because rays arriving at shallow angles bend the most",
       "Neither of the two rays bends at the surface at all, because both of them start out travelling in air"],
      "Entering water, every ray bends toward the normal, so every refraction angle is smaller than its incidence angle. The amount of bending grows with the incidence angle: a ray arriving nearly along the normal barely bends, and a steep ray bends the most, which the core lab's changing-angle observations show.",
      {});
  }
]), ["Two rules combine: always toward the normal here, and more bending at steeper incidence.", "A near-normal ray is nearly unbent; that anchors the comparison."]);

E("s8-u3-cr-estimate", 3, ["SC8.9.9"], 2, "var", varset([
  function () {
    return textq("For each crossing, estimate whether the angle of refraction will be larger or smaller than the angle of incidence, and justify the estimate: (a) a ray travelling from air into a block of glass at 45 degrees incidence; (b) the same ray travelling from the glass back into air at 30 degrees incidence inside the glass. (3 marks)",
      ["into glass the refraction angle is smaller, bending toward the normal", "out of glass the refraction angle is larger, bending away from the normal", "justifications tied to density and speed change"],
      "<b>Model answer:</b> (a) Glass is denser than air, so the ray slows as it enters and bends toward the normal: the angle of refraction is smaller than 45 degrees. (b) Leaving the glass for the less dense air, the ray speeds up and bends away from the normal: the angle of refraction is larger than 30 degrees. The two estimates are the same rule read in opposite directions: bending follows the density change at the boundary, toward the normal when entering the denser medium and away when leaving it.<br><br><b>Marking points:</b> 1 mark for the first estimate with its justification. 1 mark for the second estimate with its justification. 1 mark for tying both to the density and speed change at the boundary.",
      {});
  }
]), ["One rule, read forward then backward. Density decides the direction both times.", "Toward entering denser; away entering less dense."]);

/* ---------- SC8.9.10 Conducting the refraction experiment (CORE) ---------- */

E("s8-u3-conduct", 3, ["SC8.9.10"], 2, "var", varset([
  function () {
    return mcq("In Core Lab 5-1D, students trace a refracted ray through a transparent block. Which procedure produces a trustworthy ray path?",
      "Mark two dots in the middle of the incident beam and two in the refracted beam, remove the ray box, and join the dots with a ruler, tracing the block's outline first",
      ["Draw the path of the ray freehand on the page while the beam from the ray box is still shining, estimating where the ray goes through the block by eye alone",
       "Trace the outline of the transparent block on the page only after all the measuring is finished, and guess the ray's path through it from memory afterwards",
       "Mark a single dot in the middle of each beam on the page and connect those two dots with a line to the nearest corner of the transparent block"],
      "The core lab's method is built for accuracy: the block's outline is traced so it can be replaced exactly, dots mark the beams' centres (two per beam define a line), and a ruler joins them after the apparatus is removed. The guide stresses the process: careful marking is what makes the resulting angles worth measuring.",
      {});
  }
]), ["Dots define the ray; the ruler draws it; the outline replaces the block.", "Two dots per beam, or the line is a guess."]);

E("s8-u3-method-steps", 3, ["SC8.9.10"], 1, "var", varset([
  function () {
    return mcq("Which sequence correctly orders the steps for describing a refracted ray's path through a transparent medium?",
      "Set up the ray and medium, mark the incident and refracted beams, draw the normal at the boundary point, then measure the angles of incidence and refraction",
      ["Measure the angles of incidence and refraction first, then set up the ray and the medium afterwards to match them",
       "Draw the normal at the boundary last of all, only after both of the angles have already been measured and recorded",
       "Remove the transparent medium from the bench, guess the path the ray took through it, and check the guess with the ray afterward"],
      "Method order matters because each step feeds the next: the beams must exist before they can be marked, the normal must be drawn at the true boundary point before angles can be measured from it, and measurement comes last. Angles measured before the normal exists have no reference.",
      {});
  }
]), ["Beams, marks, normal, measures: each step needs the one before.", "The normal must exist before any angle can be measured from it."]);

/* ---------- SC8.9.11 Designing an experiment and identifying variables ---------- */

E("s8-u3-variables", 3, ["SC8.9.11"], 3, "var", varset([
  function () {
    return mcq("A group designs an experiment to test whether the type of liquid affects how much a ray bends. They shine a ray from air into water, vegetable oil and sugar solution at the same 40 degree angle, and measure each angle of refraction. Which identification of the variables is correct?",
      "Changed variable: the liquid. Measured variable: the angle of refraction. Kept the same: the angle of incidence, the ray source and the container",
      ["Changed variable: the angle of refraction. Measured variable: the liquid. Kept the same: the container only",
       "Changed variable: the angle of incidence. Measured variable: the liquid. Kept the same: the angle of refraction",
       "There are no variables of any kind to identify in this experiment, because the liquids being tested are not alive"],
      "Design begins with the variable roles. The group deliberately changes the liquid, measures the refraction angle as the outcome, and holds the incidence angle and apparatus constant so the comparison among liquids is fair. Swapping the changed and measured roles is the classic design error this indicator targets.",
      {});
  }
]), ["What they set, what they read, what they froze: assign each before judging.", "The liquid is set by hand; the angle is read off. That settles the roles."]);

E("s8-u3-cr-design-refraction", 3, ["SC8.9.11"], 3, "var", varset([
  function () {
    return textq("Design an experiment to determine whether a ray bends more when it enters vegetable oil or a 30 percent sugar solution from air. Your design must state the question being tested, the method (including how the ray's path will be recorded), the variable you will change, the variable you will measure, at least two variables you will keep the same, and how you will decide which liquid bends the ray more. (4 marks)",
      ["a clear testable question comparing the two liquids", "a ray-tracing method with dots, outline and ruler, and the normal drawn", "the liquid changed, the angle of refraction measured", "incidence angle and apparatus kept the same, with the decision rule stated"],
      "<b>Model answer:</b> Question: at the same angle of incidence, does a ray from air bend more entering vegetable oil or entering a 30 percent sugar solution? Method: fill a rectangular transparent container with the first liquid, shine a single ray from a ray box into it at 40 degrees to the normal, mark two dots in the incident beam and two in the refracted beam, trace the container's outline, remove the apparatus, join the dots with a ruler, draw the normal at the boundary point, and measure the angle of refraction. Repeat identically with the second liquid. The variable changed is the liquid. The variable measured is the angle of refraction. Kept the same: the angle of incidence (40 degrees), the ray box and container, and the measuring procedure. Decision: the liquid with the smaller angle of refraction bent the ray more toward the normal, so it is the stronger bender; repeat each liquid twice to check the measurements agree.<br><br><b>Marking points:</b> 1 mark for the testable question and a workable ray-tracing method. 1 mark for the changed and measured variables correctly named. 1 mark for at least two variables kept the same. 1 mark for the decision rule (smaller refraction angle means more bending) with a repeatability step.",
      {});
  }
]), ["Build it on the core lab's method, then make the variable roles and the decision rule explicit.", "Smaller refraction angle at the same incidence means more bending: that is the verdict rule."]);

/* ---------- SC8.9.13 The bending rule ---------- */

E("s8-u3-bend-rule", 3, ["SC8.9.13"], 1, "gen", function () {
  var cases = [
    { q: "A light ray travels from air into water at an angle. Which way does it bend?", k: "Toward the normal, because water is denser than air and the light slows down", w: ["Away from the normal at the surface, because water is a denser medium than the air above it", "Toward the normal at the surface, because the light speeds up as it enters the water from air", "It does not bend at all at the surface, because bending of light happens only in glass blocks"] },
    { q: "A light ray travels from glass into air at an angle. Which way does it bend?", k: "Away from the normal, because air is less dense than glass and the light speeds up", w: ["Toward the normal at the surface, because air is a less dense medium than the glass it left", "Away from the normal at the surface, because the light slows down as it leaves the glass for the air", "Straight along the normal itself, because a glass block always straightens out any ray passing through it"] },
    { q: "Which statement states the bending rule correctly?", k: "Into a medium of greater density, light bends toward the normal; into a medium of lesser density, it bends away from the normal", w: ["Into a medium of greater density, light bends away from the normal; into a lesser density, toward it", "Light always bends toward the normal at a boundary, whatever the two media on either side of it happen to be", "Light always bends away from the normal at a boundary, whatever the two media on either side of it happen to be"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The rule this indicator names: a ray entering a medium of greater density slows and bends toward the normal; a ray entering a medium of lesser density speeds up and bends away from the normal. Density direction and bending direction are locked together.",
    {});
}, ["Denser ahead means toward; less dense ahead means away.", "Say the density change first, the bend follows."]);

E("s8-u3-bend-figure", 3, ["SC8.9.13"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a ray crossing from air into water, with the dashed line showing the path it would take if it did not bend. Which description of the solid refracted ray is correct?",
      "It bends toward the normal, ending closer to the normal than the dashed path",
      ["It bends away from the normal, ending farther from the normal than the dashed path",
       "It follows the dashed path exactly, because water does not bend light",
       "It reflects back into the air along the dashed path"],
      "Water is denser than air, so the ray slows and bends toward the normal: the solid ray sits between the normal and the dashed unbent path. The diagram is the rule drawn, and the rule is the diagram explained.",
      {});
    q.figure = s8RefractSVG("toward", true);
    return q;
  },
  function () {
    var q = mcq("The diagram shows a ray crossing from water into air, with the dashed line showing the path it would take if it did not bend. Which description of the solid refracted ray is correct?",
      "It bends away from the normal, ending farther from the normal than the dashed path",
      ["It bends toward the normal, ending closer to the normal than the dashed path",
       "It follows the dashed path exactly, because air does not bend light",
       "It stops at the surface and travels along it"],
      "Leaving the denser water for the less dense air, the ray speeds up and bends away from the normal: the solid ray sits farther from the normal than the dashed unbent path. The two diagrams in this family are mirror images of one rule.",
      {});
    q.figure = s8RefractSVG("away", true);
    return q;
  }
]), ["Compare the solid ray with the dashed one: which side of the dashed path is it on?", "Toward means between the dashed path and the normal."]);

E("s8-u3-bend-straight", 3, ["SC8.9.13"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a ray travelling straight down along the normal as it passes from air into water. What happens to the ray at the boundary?",
      "It slows down but does not bend, continuing straight along the normal",
      ["It bends toward the normal, since entering water always bends light",
       "It bends away from the normal, because it speeds up at the surface",
       "It reflects back along the normal into the air"],
      "Bending needs an angle. A ray arriving along the normal (zero angle of incidence) has no sideways component to swing: it changes speed in the water but keeps its direction exactly, which the guide's wheel-and-axle analogy shows: hit the rough surface straight on, and you slow without veering.",
      {});
    q.figure = s8RefractSVG("straight", false);
    return q;
  }
]), ["Zero angle of incidence is the exception case. What survives: speed change or direction change?", "Straight on means slow down, no veer."]);

E("s8-u3-bend-two-boundary", 3, ["SC8.9.13"], 3, "var", varset([
  function () {
    return mcq("A ray passes from air into a glass block, travels through it, and exits the parallel opposite face back into air. Which description of the ray's full path is correct?",
      "It bends toward the normal entering the glass, travels straight through, then bends away from the normal leaving, emerging parallel to its original direction but shifted sideways",
      ["It bends away from the normal as it enters the glass, then toward the normal as it leaves, emerging from the block along exactly its original line",
       "It bends toward the normal at both faces of the block, and it keeps on bending steadily the whole way through the glass inside",
       "It does not bend at either face of the block, because the effects of the two parallel faces cancel out before the ray even arrives"],
      "Each boundary applies the rule independently. Entering the denser glass: toward the normal. Leaving for the less dense air: away from the normal, by the same amount, because the faces are parallel. The two bends cancel in direction but not in position: the ray emerges parallel to its start, displaced sideways, the classic block result from the core lab family.",
      {});
  }
]), ["Treat the two faces as two separate crossings, each with its own density change.", "Toward in, away out, parallel but shifted."]);

/* ---------- SC8.9.14 Predicting media effects on refraction ---------- */

E("s8-u3-predict-media", 3, ["SC8.9.14"], 2, "gen", function () {
  var cases = [
    { q: "A ray enters three liquids from air at the same angle of incidence: water, vegetable oil, and a 30 percent sugar solution. Knowing that oil and the sugar solution are denser than water, which prediction is sound?", k: "The ray bends more toward the normal in the oil and the sugar solution than in the water, so their angles of refraction are smaller", w: ["The ray bends the most in the water of the three liquids, because water is the least dense of them", "All three liquids bend the ray by exactly the same amount, because the angle of incidence is the same for all three", "The ray bends away from the normal as it enters each of the denser liquids from the air above them"] },
    { q: "A student predicts that a ray entering glycerol (denser than water) from air will have a larger angle of refraction than the same ray entering water. Evaluate the prediction.", k: "It is backwards: the denser medium bends the ray more toward the normal, giving a smaller angle of refraction", w: ["The prediction is correct: media that are denser than water always give larger angles of refraction to a ray", "The student's prediction cannot be evaluated at all without first knowing the temperature of the two liquids", "The prediction is correct as stated, because glycerol is a thicker liquid and pushes the entering ray wider apart"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Prediction follows the density rule: at the same incidence, a denser medium bends the ray more toward the normal, which means a smaller angle of refraction. The guide names the test set itself: vegetable oil, water and 30 percent sugar solution, with water the least dense of the three.",
    {});
}, ["More density, more bending, smaller angle: chain the three.", "The comparison is at equal incidence; only the medium changes."]);

E("s8-u3-cr-predict", 3, ["SC8.9.14"], 2, "var", varset([
  function () {
    return textq("A ray is shone from air into an unknown clear liquid at 50 degrees incidence, and the angle of refraction is measured at 31 degrees. For water at the same incidence, the angle of refraction is 35 degrees. Predict, with your reasoning, whether the unknown liquid is denser or less dense than water, and predict what would happen to the angle of refraction if the experiment were repeated with the ray entering at 30 degrees incidence instead. (3 marks)",
      ["the unknown liquid is denser than water, because it bent the ray more toward the normal", "a smaller refraction angle at the same incidence means stronger bending and greater density", "at 30 degrees incidence the refraction angle would shrink further, still below the incidence angle"],
      "<b>Model answer:</b> The unknown liquid bent the ray more than water did: at the same 50 degrees incidence, its refraction angle (31 degrees) is smaller than water's (35 degrees), meaning the ray sits closer to the normal. Stronger bending toward the normal is the signature of a denser medium, so the unknown liquid is denser than water. At 30 degrees incidence, the ray arrives closer to the normal, so it bends less in absolute degrees; the angle of refraction would be smaller than 31 degrees but still smaller than the 30 degree incidence angle, because entering a denser medium always bends the ray toward the normal.<br><br><b>Marking points:</b> 1 mark for the density prediction (denser than water). 1 mark for the reasoning from the smaller refraction angle at equal incidence. 1 mark for the second prediction (refraction angle falls, remaining below the incidence angle).",
      {});
  }
]), ["Compare at equal incidence: smaller refraction angle means more bending means denser.", "Then run the same rule at a shallower incidence."]);

E("s8-u3-cr-identify-medium", 3, ["SC8.9.14"], 3, "var", varset([
  function () {
    return textq("A forensic technician notes that the guide for this strand says the degree of refraction can help identify an unknown material. A ray entering a clear fragment from air at 60 degrees incidence refracts at 35 degrees; the same test on known glass gives 35 degrees, and on a known clear plastic gives 39 degrees. State the technician's conclusion, explain the reasoning from the bending rule, and name one thing the technician must hold the same across the tests for the conclusion to be fair. (3 marks)",
      ["the fragment matches glass, not the plastic, on this test", "equal incidence with equal refraction angle means equal bending, the denser-match signature", "the angle of incidence (and the ray setup) held the same"],
      "<b>Model answer:</b> The fragment behaves exactly as the known glass does: at the same 60 degrees incidence, both bend the ray to a 35 degree refraction angle, while the plastic bends it less (39 degrees). Bending strength at a boundary is a property of the medium, set by its density and index of refraction: the more the ray bends toward the normal, the greater the medium's refractive effect. Matching the glass's bending exactly, and differing from the plastic's, the fragment is identified as glass, on this evidence. The comparison is only fair because the angle of incidence was held the same in every test (with the same ray box and setup); change the incidence and the refraction angles would change for every material.<br><br><b>Marking points:</b> 1 mark for the conclusion (the fragment matches glass). 1 mark for the reasoning (equal bending at equal incidence identifies the medium; the plastic bends less). 1 mark for the controlled condition (same angle of incidence and setup).",
      {});
  }
]), ["Identification means matching a known material's bending under identical conditions.", "Same incidence in, compare refraction out."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U3 = {
  "s8-u3-cr-design-refraction": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });


/* Lengthening tranche addition (Nov 20, 2026): one 3-mark Level 2 CR
   entry on SC8.7.4 closing Unit 3 Test 3's CR gap, priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Section 7.
   SME-flagged. */

E("s8-u3-cr-refraction-explain", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return textq("Explaining refraction (3 marks)\nA student puts a straw in a glass of water. From the side, the straw looks broken: the part under the water appears shifted sideways from the part above it. (a) Explain why the straw appears shifted. Your answer must say what happens to the light as it leaves the water. (2) (b) The student pulls the straw out and looks at it again: it looks whole. Explain why the effect disappears. (1)",
      ["(a) Light from the underwater part of the straw bends (refracts) as it leaves the water and enters the air, because it changes speed at the surface."],
      "Marking points (3): (a) 2 marks: 1 for identifying that light changes speed crossing from water to air and bends at the surface; 1 for linking the bending to the brain tracing the rays back in straight lines, so the underwater part is seen in the wrong place. (b) 1 mark: with no water-air boundary to cross, the light travels straight, so the straw is seen where it really is. Model answer: The straw only looks broken because <b>light from underwater bends as it leaves the water, and your eyes trace it back along straight lines</b>.", {});
  },
  function () {
    return textq("Explaining refraction (3 marks)\nA coin at the bottom of an empty mug is hidden when a student steps back, but it appears when water is poured into the mug, without the student moving. (a) Explain why the coin becomes visible. Your answer must describe the path of the light from the coin. (2) (b) State what would happen to the effect if the mug were filled with a liquid in which light travels even more slowly than in water. (1)",
      ["(a) Light from the coin bends as it leaves the water's surface, changing direction enough to reach the student's eye."],
      "Marking points (3): (a) 2 marks: 1 for the bending at the surface as light speeds up leaving the water; 1 for the result that rays which passed over the mug's rim in a straight line are bent down into the eye, so the coin is seen (raised in apparent position). (b) 1 mark: the light would bend more, so the coin would appear raised even higher (accept: the effect would be stronger). Model answer: The coin appears because <b>light leaving the water bends at the surface, bringing rays from the coin over the rim and into the eye</b>.", {});
  },
  function () {
    return textq("Explaining refraction (3 marks)\nA swimmer wearing a mask sees a fish that looks closer to the surface and nearer than it really is. (a) Explain why the fish appears raised. Your answer must say what happens to light at the water's surface. (2) (b) A spear fisher who knows this aims below the fish they see. Explain why aiming below works. (1)",
      ["(a) Light from the fish bends away from the normal as it leaves the water and speeds up, entering the swimmer's eyes."],
      "Marking points (3): (a) 2 marks: 1 for the bending at the surface as light changes speed from water to air; 1 for the eyes tracing the bent rays back straight, placing the fish higher (and nearer) than its real position. (b) 1 mark: the real fish is deeper than its image, so aiming below the seen position aims at the true position. Model answer: The fish looks raised because <b>your eyes trace the refracted light back in straight lines to a false, shallower position</b>.", {});
  }
]), ["Light changes speed at the surface, and changing speed bends its direction.", "Your eye assumes light travelled straight, so it rebuilds the object in the wrong place."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8-u3-cr-em-uses closes Unit 3 Test
   1 (4 marks, Level 2). s8-u3-cr-mirror-image closes Unit 3 Test
   2 (4 marks, Level 2). s8-u3-cr-refraction-bowl closes Unit 3 Test
   3 (4 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8-u3-cr-em-uses", 3, ["SC8.7.2"], 2, "var", varset([
  function () {
    return textq("Three devices are described. (a) For each device, name the type of electromagnetic radiation it uses and the property of that radiation that makes it suitable for the job. (3 marks) Device 1: a television remote control sends invisible signals to a television across a room. Device 2: a hospital machine takes images of bones inside the body. Device 3: a radio station broadcasts programmes to homes across a whole region. (b) Place radio waves and X-rays in order of increasing frequency. (1 mark) (4 marks)",
      ["remote: infrared, invisible and low in energy, carrying coded pulses safely over a short distance", "bone imaging: X-rays, energetic enough to penetrate soft tissue but absorbed more by bone", "broadcasting: radio waves, with the longest wavelengths, travelling long distances across a region", "increasing frequency: radio waves, then X-rays"],
      "<b>Model answer:</b> (a) Device 1, the remote control, uses infrared radiation: it is invisible and low in energy, so it can carry coded on and off pulses across a room safely, without visible glare. Device 2, the bone imaging machine, uses X-rays: they carry much more energy and penetrate the body's soft tissue, but are absorbed more strongly by dense bone, so the bones show up against the tissue. Device 3, the radio station, uses radio waves: they have the longest wavelengths of the spectrum and travel long distances, so one transmitter can reach homes across a whole region. (b) In order of increasing frequency: radio waves first (lowest frequency), then X-rays.<br><br><b>Marking points:</b> 1 mark for the remote control: infrared named, with a suitable property (invisible, low energy, short range coded signals). 1 mark for bone imaging: X-rays named, with a suitable property (high energy and penetration, passing through soft tissue and absorbed more by bone). 1 mark for broadcasting: radio waves named, with a suitable property (long wavelength, travelling long distances). 1 mark for the correct order of increasing frequency (radio waves, then X-rays).", {});
  },
  function () {
    return textq("Three devices are described. (a) For each device, name the type of electromagnetic radiation it uses and the property of that radiation that makes it suitable for the job. (3 marks) Device 1: a microwave oven heats the food placed inside it. Device 2: an ultraviolet lamp in a clinic sterilizes instruments and surfaces. Device 3: a hospital treats a deep tumour with radiation therapy. (b) Place microwaves and gamma rays in order of increasing frequency. (1 mark) (4 marks)",
      ["oven: microwaves, absorbed by water molecules in the food so their energy heats it", "sterilizing lamp: ultraviolet, carrying more energy than visible light, enough to kill microbes", "therapy: gamma rays, the highest energy radiation, penetrating deep into the body to kill cancer cells", "increasing frequency: microwaves, then gamma rays"],
      "<b>Model answer:</b> (a) Device 1, the oven, uses microwaves: they are absorbed by the water molecules in food, transferring their energy to the food and heating it through. Device 2, the sterilizing lamp, uses ultraviolet radiation: it carries more energy than visible light, enough to kill bacteria and other microbes on the instruments and surfaces it shines on. Device 3, the therapy machine, uses gamma rays: they have the highest energy and the greatest penetration of any type in the spectrum, so they can pass through the body to reach a deep tumour and kill its cells. (b) In order of increasing frequency: microwaves first (lower frequency), then gamma rays.<br><br><b>Marking points:</b> 1 mark for the oven: microwaves named, with a suitable property (absorbed by water in food, heating it). 1 mark for the sterilizing lamp: ultraviolet named, with a suitable property (energy above visible light, enough to kill microbes). 1 mark for the therapy: gamma rays named, with a suitable property (highest energy and penetration, reaching a deep tumour). 1 mark for the correct order of increasing frequency (microwaves, then gamma rays).", {});
  },
  function () {
    return textq("Three technologies are described. (a) For each one, name the type of electromagnetic radiation it uses and the property of that radiation that makes it suitable for the job. (3 marks) Technology 1: telephone and internet signals are carried long distances as pulses of light inside glass fibres. Technology 2: a microwave oven heats the food placed inside it. Technology 3: a hospital machine takes images of bones inside the body. (b) Place microwaves and X-rays in order of decreasing wavelength. (1 mark) (4 marks)",
      ["fibre signals: visible or infrared light, reflected along inside the fibre so pulses travel far with little loss", "oven: microwaves, absorbed by water molecules in the food so their energy heats it", "bone imaging: X-rays, energetic enough to penetrate soft tissue but absorbed more by bone", "decreasing wavelength: microwaves, then X-rays"],
      "<b>Model answer:</b> (a) Technology 1, the fibre system, uses light (visible light or infrared): the light reflects along inside the glass fibre instead of escaping, so coded pulses travel long distances with very little loss and carry many signals at once. Technology 2, the oven, uses microwaves: they are absorbed by the water molecules in food, transferring their energy to the food and heating it through. Technology 3, the bone imaging machine, uses X-rays: they carry high energy and penetrate the body's soft tissue, but are absorbed more strongly by dense bone, so the bones show up against the tissue. (b) In order of decreasing wavelength: microwaves first (longer wavelength), then X-rays.<br><br><b>Marking points:</b> 1 mark for the fibre system: visible light or infrared named, with a suitable property (guided by reflection inside the fibre, travelling far with little loss). 1 mark for the oven: microwaves named, with a suitable property (absorbed by water in food, heating it). 1 mark for bone imaging: X-rays named, with a suitable property (high energy and penetration, passing through soft tissue and absorbed more by bone). 1 mark for the correct order of decreasing wavelength (microwaves, then X-rays).", {});
  },
  function () {
    return textq("Three devices are described. (a) For each device, name the type of electromagnetic radiation it uses and the property of that radiation that makes it suitable for the job. (3 marks) Device 1: a radio station broadcasts programmes to homes across a whole region. Device 2: a television remote control sends invisible signals to a television across a room. Device 3: an ultraviolet lamp in a clinic sterilizes instruments and surfaces. (b) Place radio waves and ultraviolet radiation in order of increasing frequency. (1 mark) (4 marks)",
      ["broadcasting: radio waves, with the longest wavelengths, travelling long distances across a region", "remote: infrared, invisible and low in energy, carrying coded pulses safely over a short distance", "sterilizing lamp: ultraviolet, carrying more energy than visible light, enough to kill microbes", "increasing frequency: radio waves, then ultraviolet"],
      "<b>Model answer:</b> (a) Device 1, the radio station, uses radio waves: they have the longest wavelengths of the spectrum and travel long distances, so one transmitter can reach homes across a whole region. Device 2, the remote control, uses infrared radiation: it is invisible and low in energy, so it can carry coded on and off pulses across a room safely, without visible glare. Device 3, the sterilizing lamp, uses ultraviolet radiation: it carries more energy than visible light, enough to kill bacteria and other microbes on the instruments and surfaces it shines on. (b) In order of increasing frequency: radio waves first (lowest frequency), then ultraviolet radiation.<br><br><b>Marking points:</b> 1 mark for broadcasting: radio waves named, with a suitable property (long wavelength, travelling long distances). 1 mark for the remote control: infrared named, with a suitable property (invisible, low energy, short range coded signals). 1 mark for the sterilizing lamp: ultraviolet named, with a suitable property (energy above visible light, enough to kill microbes). 1 mark for the correct order of increasing frequency (radio waves, then ultraviolet).", {});
  }
]), ["Match each device to the guide's use list first, then justify the match with a property.", "Across the spectrum, longer wavelength always means lower frequency and lower energy."]);

E("s8-u3-cr-mirror-image", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("A ray of light strikes a plane mirror at an angle of incidence of 25 degrees. (a) State the angle of reflection and the rule you used. (1 mark) (b) Describe the path of the reflected ray relative to the normal. (1 mark) An upright arrow stands in front of the same mirror. (c) Describe two characteristics of the arrow's image in the mirror. (2 marks) (4 marks)",
      ["angle of reflection 25 degrees, by the law of reflection", "the reflected ray leaves on the opposite side of the normal, at 25 degrees from the normal", "the image is the same size as the arrow and virtual, as far behind the mirror as the arrow is in front and laterally inverted"],
      "<b>Model answer:</b> (a) The angle of reflection is 25 degrees. The rule is the law of reflection: the angle of incidence equals the angle of reflection, both measured from the normal. (b) The reflected ray travels away from the mirror on the opposite side of the normal from the incoming ray, making the same angle, 25 degrees, with the normal. (c) The arrow's image is the same size as the arrow itself, and it is virtual: it appears behind the mirror, where the reflected rays only seem to meet, so it cannot be caught on a screen. (Also correct: the image is as far behind the mirror as the arrow is in front of it, upright, and laterally inverted, with left and right reversed.)<br><br><b>Marking points:</b> 1 mark for the angle of reflection (25 degrees) with the law of reflection stated. 1 mark for the reflected path (on the opposite side of the normal, at the same angle to the normal as the incoming ray). 1 mark for one correct image characteristic (same size, virtual, upright, as far behind the mirror as the object is in front, or laterally inverted). 1 mark for a second correct image characteristic.", {});
  },
  function () {
    return textq("A ray of light strikes a plane mirror at an angle of incidence of 40 degrees. (a) State the angle of reflection and the rule you used. (1 mark) (b) Describe the path of the reflected ray relative to the normal. (1 mark) A large printed capital letter stands in front of the same mirror. (c) Describe two characteristics of the letter's image in the mirror. (2 marks) (4 marks)",
      ["angle of reflection 40 degrees, by the law of reflection", "the reflected ray leaves on the opposite side of the normal, at 40 degrees from the normal", "the image is the same size as the letter and laterally inverted, so it reads reversed, and it is virtual, as far behind the mirror as the letter is in front"],
      "<b>Model answer:</b> (a) The angle of reflection is 40 degrees. The rule is the law of reflection: the angle of incidence equals the angle of reflection, both measured from the normal. (b) The reflected ray travels away from the mirror on the opposite side of the normal from the incoming ray, making the same angle, 40 degrees, with the normal. (c) The letter's image is the same size as the letter, and it is laterally inverted: left and right are reversed, so the letter appears flipped and would read backwards. (Also correct: the image is virtual, upright, and as far behind the mirror as the letter is in front of it.)<br><br><b>Marking points:</b> 1 mark for the angle of reflection (40 degrees) with the law of reflection stated. 1 mark for the reflected path (on the opposite side of the normal, at the same angle to the normal as the incoming ray). 1 mark for one correct image characteristic (same size, virtual, upright, as far behind the mirror as the object is in front, or laterally inverted). 1 mark for a second correct image characteristic.", {});
  },
  function () {
    return textq("A ray of light strikes a plane mirror at an angle of incidence of 55 degrees. (a) State the angle of reflection and the rule you used. (1 mark) (b) Describe the path of the reflected ray relative to the normal. (1 mark) A lit candle stands in front of the same mirror. (c) Describe two characteristics of the candle's image in the mirror. (2 marks) (4 marks)",
      ["angle of reflection 55 degrees, by the law of reflection", "the reflected ray leaves on the opposite side of the normal, at 55 degrees from the normal", "the image is the same size as the candle and as far behind the mirror as the candle is in front, and it is virtual and laterally inverted"],
      "<b>Model answer:</b> (a) The angle of reflection is 55 degrees. The rule is the law of reflection: the angle of incidence equals the angle of reflection, both measured from the normal. (b) The reflected ray travels away from the mirror on the opposite side of the normal from the incoming ray, making the same angle, 55 degrees, with the normal. (c) The candle's image is the same size as the candle, and it sits as far behind the mirror as the candle stands in front of it. (Also correct: the image is virtual, upright, and laterally inverted, with left and right reversed.)<br><br><b>Marking points:</b> 1 mark for the angle of reflection (55 degrees) with the law of reflection stated. 1 mark for the reflected path (on the opposite side of the normal, at the same angle to the normal as the incoming ray). 1 mark for one correct image characteristic (same size, virtual, upright, as far behind the mirror as the object is in front, or laterally inverted). 1 mark for a second correct image characteristic.", {});
  }
]), ["Both angles are measured from the normal, the line at 90 degrees to the mirror surface.", "Plane mirror images: same size, upright, virtual, the same distance behind, and laterally inverted. Pick any two."]);

E("s8-u3-cr-refraction-bowl", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return textq("A coin sits at the bottom of an empty bowl. A student steps back until the rim of the bowl just hides the coin, then stays perfectly still while a partner slowly pours water into the bowl. As the water rises, the coin becomes visible again. (a) What happens to light from the coin at the surface of the water? (1 mark) (b) State the direction in which the light bends at the surface, and explain why it bends that way. (2 marks) (c) Explain why this makes the coin appear raised from its true position. (1 mark) (4 marks)",
      ["light from the coin refracts, bending as it crosses from the water into the air", "it bends away from the normal because light speeds up as it leaves the water for the air", "the eye traces the bent rays back in straight lines, so the coin is seen at a higher, apparent position, and bent rays now clear the rim into the eye"],
      "<b>Model answer:</b> (a) Light from the coin refracts at the surface: it bends as it crosses from the water into the air. (b) The light bends away from the normal. Light travels more slowly in water than in air, so as it leaves the water it speeds up, and a ray that speeds up at a surface bends away from the normal. (c) The student's eye assumes the light has travelled in a straight line and traces the bent rays straight back. Those straight traces meet at a point above the coin's real position, so the coin appears raised, shallower than it is, and rays that the rim blocked when the bowl was empty now bend at the surface and reach the eye.<br><br><b>Marking points:</b> 1 mark for refraction identified (light bends as it crosses from water to air at the surface). 1 mark for the bending direction (away from the normal). 1 mark for the reason (light speeds up as it leaves the water for the air). 1 mark for the apparent position (the eye traces the rays back in straight lines, placing the coin above its true position).", {});
  },
  function () {
    return textq("A dark mark is drawn on the inside bottom of an empty mug. A student holds the mug and steps back until the wall of the mug just hides the mark, then stays perfectly still while a partner slowly pours water into the mug. As the water rises, the mark becomes visible again. (a) What happens to light from the mark at the surface of the water? (1 mark) (b) State the direction in which the light bends at the surface, and explain why it bends that way. (2 marks) (c) Explain why this makes the mark appear raised from its true position. (1 mark) (4 marks)",
      ["light from the mark refracts, bending as it crosses from the water into the air", "it bends away from the normal because light speeds up as it leaves the water for the air", "the eye traces the bent rays back in straight lines, so the mark is seen at a higher, apparent position, and bent rays now clear the mug wall into the eye"],
      "<b>Model answer:</b> (a) Light from the mark refracts at the surface: it bends as it crosses from the water into the air. (b) The light bends away from the normal. Light travels more slowly in water than in air, so as it leaves the water it speeds up, and a ray that speeds up at a surface bends away from the normal. (c) The student's eye assumes the light has travelled in a straight line and traces the bent rays straight back. Those straight traces meet at a point above the mark's real position, so the mark appears raised, closer to the surface than it is, and rays that the mug wall blocked when the mug was empty now bend at the surface and reach the eye.<br><br><b>Marking points:</b> 1 mark for refraction identified (light bends as it crosses from water to air at the surface). 1 mark for the bending direction (away from the normal). 1 mark for the reason (light speeds up as it leaves the water for the air). 1 mark for the apparent position (the eye traces the rays back in straight lines, placing the mark above its true position).", {});
  },
  function () {
    return textq("A pebble rests on the bottom of a clear plastic tub filled with water. Viewed from above, the pebble looks closer to the surface than it really is, and a student who reaches in finds it deeper than expected. (a) What happens to light from the pebble at the surface of the water? (1 mark) (b) State the direction in which the light bends at the surface, and explain why it bends that way. (2 marks) (c) Explain why this makes the pebble appear raised from its true position. (1 mark) (4 marks)",
      ["light from the pebble refracts, bending as it crosses from the water into the air", "it bends away from the normal because light speeds up as it leaves the water for the air", "the eye traces the bent rays back in straight lines, so the pebble is seen at a higher, shallower apparent position than its real one"],
      "<b>Model answer:</b> (a) Light from the pebble refracts at the surface: it bends as it crosses from the water into the air on its way to the student's eye. (b) The light bends away from the normal. Light travels more slowly in water than in air, so as it leaves the water it speeds up, and a ray that speeds up at a surface bends away from the normal. (c) The eye assumes the light has travelled in a straight line and traces the bent rays straight back. Those straight traces meet at a point above the pebble's real position, so the pebble appears raised, shallower than it is, which is why the reaching hand finds it deeper than it looked.<br><br><b>Marking points:</b> 1 mark for refraction identified (light bends as it crosses from water to air at the surface). 1 mark for the bending direction (away from the normal). 1 mark for the reason (light speeds up as it leaves the water for the air). 1 mark for the apparent position (the eye traces the rays back in straight lines, placing the pebble above its true position).", {});
  },
  function () {
    return textq("A coin lies on a table under a clear glass that is then filled with water. Viewed from the side, through the glass, the coin appears raised, sitting nearer to the water surface than it really does. (a) What happens to light from the coin at the surface of the water? (1 mark) (b) State the direction in which the light bends at the surface, and explain why it bends that way. (2 marks) (c) Explain why this makes the coin appear raised from its true position. (1 mark) (4 marks)",
      ["light from the coin refracts, bending as it crosses from the water into the air", "it bends away from the normal because light speeds up as it leaves the water for the air", "the eye traces the bent rays back in straight lines, so the coin is seen at a higher, apparent position than its real one"],
      "<b>Model answer:</b> (a) Light from the coin refracts at the surface: it bends as it crosses from the water into the air on its way to the viewer. (b) The light bends away from the normal. Light travels more slowly in water than in air, so as it leaves the water it speeds up, and a ray that speeds up at a surface bends away from the normal. (c) The viewer's eye assumes the light has travelled in a straight line and traces the bent rays straight back. Those straight traces meet at a point above the coin's real position, so the coin appears raised, nearer to the surface than it really is.<br><br><b>Marking points:</b> 1 mark for refraction identified (light bends as it crosses from water to air at the surface). 1 mark for the bending direction (away from the normal). 1 mark for the reason (light speeds up as it leaves the water for the air). 1 mark for the apparent position (the eye traces the rays back in straight lines, placing the coin above its true position).", {});
  }
]), ["Trace one ray from the object to the eye, and mark where it crosses the surface.", "Leaving water, light speeds up and bends away from the normal; your eye then traces it back in a straight line."]);

/* ----- bank-u4.js ----- */
// CRMARKS: s8-u4-cr-needs-investigation=3
// CRMARKS: s8-u4-cr-living=3
// CRMARKS: s8-u4-cr-cell-division=3
// CRMARKS: s8-u4-cr-levels=3
// CRMARKS: s8-u4-cr-factors=3
// CRMARKS: s8-u4-cr-interdependence=3
// CRMARKS: s8-u4-cr-organelles=3
// CRMARKS: s8-u4-cr-artificial=4
// CRMARKS: s8-u4-cr-community=3
// CRMARKS: s8-u4-cr-decision=3
// CRMARKS: s8-u4-cr-propose=3
// CRMARKS: s8-u4-cr-decision-personal=3
// CRMARKS: s8-u4-cr-microscope=3
// CRMARKS: s8-u4-cr-model-eval=3
// CRMARKS: s8-u4-cr-design-rates=4
// CRMARKS: s8-u4-cr-cell-compare=2
// CRMARKS: s8-u4-cr-levels-apply=4
// CRMARKS: s8-u4-cr-systems-response=4
// Science 8 Unit 4 bank: Cells, Tissues, Organs and Systems
// (SC8.10.1 to SC8.12.12), built Nov 15, 2026 to the Cells
// authoring spec. All entries are original and were written
// new for this app. Existing tests and question banks,
// including the ESD Unit 4 set (unit test, Lab 12-1B, the
// Artificial Organs STSE), the MHR ExamView chapters 10 to 12
// and the STEAM HeartRateGraph and BreathingRateGraph data
// sets, were reviewed only to gauge the expected depth and
// range of treatment.
// Guide discipline: cell theory at introduction level; mitosis
// without stages; the six systems holistic (no organ-by-organ
// functions, no labelling of system diagrams); interdependence
// limited to the guide's three pairs; size estimation without
// ratio calculations. The cell figure applies the guide's
// textbook erratum: the wall is labelled outside the membrane.
// CORE residue: SC8.12.1 and SC8.12.3 entries assess microscope
// knowledge, sequence and care decisions; handling itself is
// classroom assessment. SC8.12.4 carries one model-accuracy
// entry; the cooperative construction is the residue, recorded
// here and in the catalogue.

/* ---------- SC8.10.1 Cell theory and characteristics of life ---------- */

E("s8-u4-theory-parts", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Which statement is part of the cell theory?",
    "All cells come from other, pre-existing cells",
    ["All cells are surrounded by cell walls", "All cells have a nucleus", "All living things are made up of two or more cells"],
    "The cell theory states that all living things are made of cells, that the cell is the basic unit of life, and that all cells come from other, pre-existing cells. Cell walls and nuclei are found in some cells, not all.", {}); },
  function () { return mcq("Which statement is part of the cell theory?",
    "All living things are made up of one or more cells",
    ["All cells can be seen without a microscope", "All cells carry out photosynthesis", "All living things are made of exactly the same kind of cell"],
    "The cell theory states that all living things are made of one or more cells, that the cell is the basic unit of life, and that cells come from pre-existing cells. Most cells are microscopic, and only some carry out photosynthesis.", {}); },
  function () { return mcq("Which statement is part of the cell theory?",
    "The cell is the basic unit of life",
    ["The cell is the largest unit of life", "Cells can form from non-living material on their own", "Only animal bodies are made of cells"],
    "The cell theory identifies the cell as the basic unit of life: the smallest unit that carries out life processes. Cells come from other cells, and plant bodies are made of cells too.", {}); }
]), ["Think about what all living things share.", "The theory has three main statements about cells."]);

E("s8-u4-living-chars", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("A sunflower turns its leaves toward the Sun as the Sun moves across the sky. Which characteristic of life is the sunflower showing?",
    "Response to stimuli",
    ["Growth", "Movement of the whole organism", "Reproduction"],
    "The sunflower is responding to a stimulus, the light. Responding to changes in the environment is one of the four characteristics of life, along with growth, movement and reproduction.", {}); },
  function () { return mcq("Over one summer, a puppy gains 6 kg and its bones lengthen. Which characteristic of life is this?",
    "Growth",
    ["Movement", "Reproduction", "Response to stimuli"],
    "Getting larger as cells divide and the body develops is growth, one of the four characteristics of life.", {}); },
  function () { return mcq("A single bacterium splits and becomes two bacteria. Which characteristic of life is this?",
    "Reproduction",
    ["Growth", "Movement", "Response to stimuli"],
    "Producing new individuals of the same kind is reproduction, one of the four characteristics of life. A bacterium reproduces by dividing into two cells.", {}); }
]), ["Recall the four characteristics of life.", "Growth, movement, response to stimuli, reproduction."]);

E("s8-u4-nonliving", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Which of these is non-living?",
    "A granite rock",
    ["A mushroom", "A yeast cell", "Seaweed"],
    "A rock does not grow, move on its own, respond to stimuli or reproduce, and it is not made of cells. Mushrooms, yeast and seaweed are living organisms made of cells.", {}); },
  function () { return mcq("A candle flame gets bigger, flickers and seems to move. Why is a flame not alive?",
    "It is not made of cells and does not reproduce or respond the way organisms do",
    ["It is simply too hot, as it flickers at the top of the candle, for anything living to survive in it", "It does not need oxygen from the air around it in order to keep burning on the candle", "It gives off light and heat into the room all around it for as long as it burns"],
    "Flames can grow and move, but they are not made of cells, do not reproduce and do not respond to stimuli as organisms do. Living things show all four characteristics and are made of cells.", {}); }
]), ["Check each option against the characteristics of life.", "Living things are made of cells."]);

/* ---------- SC8.10.2 Plant and animal cells ---------- */

E("s8-u4-differences", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Which structure is found in plant cells but not in animal cells?",
    "Chloroplasts",
    ["Cell membrane", "Cytoplasm", "Nucleus"],
    "Plant cells have chloroplasts, where photosynthesis happens. Animal cells do not. Both cell types have a membrane, cytoplasm and a nucleus.", {}); },
  function () { return mcq("Which structure is found in plant cells but not in animal cells?",
    "A cell wall",
    ["Mitochondria", "Vacuoles of any size", "A nucleus"],
    "Plant cells have a cell wall outside the membrane, which animal cells lack. Both have mitochondria and a nucleus, and both have vacuoles, though plant vacuoles are larger.", {}); }
]), ["Recall the three differences between plant and animal cells.", "Chloroplasts, cell walls, vacuole size."]);

E("s8-u4-cell-figure", 4, ["SC8.10.2", "SC8.11.3"], 1, "var", varset([
  function () { var q = mcq("The diagram shows a plant cell. Which callout labels the chloroplast?",
    "E", ["A", "C", "D"],
    "Callout E points to a chloroplast, one of the small green structures where photosynthesis takes place. A is the cell wall, C the nucleus and D the vacuole.", {});
    q.figure = s8CellSVG("plant"); return q; },
  function () { var q = mcq("The diagram shows a plant cell. Which callout labels the large vacuole?",
    "D", ["B", "E", "F"],
    "Callout D points to the large central vacuole, which stores water and other materials. Plant cells have fewer and larger vacuoles than animal cells. B is the cell membrane, E a chloroplast and F a mitochondrion.", {});
    q.figure = s8CellSVG("plant"); return q; }
]), ["Find the small green oval structures.", "Chloroplasts carry out photosynthesis."]);

E("s8-u4-vacuole-compare", 4, ["SC8.10.2"], 2, "var", varset([
  function () { return mcq("How do vacuoles differ between plant and animal cells?",
    "Plant cells have fewer and larger vacuoles; animal cells have smaller ones",
    ["Animal cells have one very large vacuole and plant cells have none", "Only animal cells have vacuoles", "Vacuoles are identical in both cell types"],
    "Both cell types have vacuoles, but plant cells have fewer and larger ones, often one large central vacuole, while animal cell vacuoles are smaller.", {}); },
  function () { return mcq("A student looks at two cells. One has a very large central vacuole taking up much of the cell. The cell is most likely a",
    "plant cell, because plant cells have fewer and larger vacuoles",
    ["animal cell, because animal vacuoles are always the largest structure", "bacterium, because bacteria store everything in one vacuole", "fungus cell, because only fungi have vacuoles"],
    "A single large central vacuole is a plant cell feature: plant cells have fewer and larger vacuoles than animal cells.", {}); }
]), ["Recall the vacuole difference from the guide.", "Fewer and larger in plants."]);

E("s8-u4-regular-shape", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Plant cells usually keep a regular, fixed shape. What gives them this shape?",
    "The cell wall",
    ["The cell membrane", "The vacuole", "The chloroplasts"],
    "The rigid cell wall outside the membrane holds the plant cell in a regular shape. Animal cells, with no wall, have more varied shapes.", {}); }
]), ["Which plant-only structure is rigid?", "It sits outside the membrane."]);

/* ---------- SC8.10.3 Cell division ---------- */

E("s8-u4-identical", 4, ["SC8.10.3"], 1, "var", varset([
  function () { return mcq("When a body cell divides by mitosis, the result is",
    "two new cells identical to the original cell",
    ["two cells each with half the original material removed permanently", "one large cell and one cell with no nucleus", "cells of a completely different type"],
    "Mitosis produces new cells identical to the original. Your body uses it to grow and to replace worn out or damaged cells.", {}); }
]), ["Think about what identical means here.", "Growth and repair need matching cells."]);

E("s8-u4-division-count", 4, ["SC8.10.3"], 2, "gen", function () {
  var rounds = pick([2, 3, 4]);
  var cells = Math.pow(2, rounds);
  var dis = s8dis(cells, [cells * 2, rounds * 2, cells + rounds, cells - 2]);
  return mcq("A single cell divides to form two cells, and each of those divides again, and so on. After " + rounds + " rounds of division, how many cells are there?",
    cells + "", dis.map(String),
    "Each round doubles the number of cells: after 1 round there are 2, after 2 rounds 4, doubling each time. After " + rounds + " rounds there are 2 x 2" + (rounds > 2 ? " x 2" : "") + (rounds > 3 ? " x 2" : "") + " = " + cells + " cells.", {});
}, ["Each division doubles the count.", "Multiply by 2 once per round."]);

E("s8-u4-growth-example", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return mcq("You cut your finger. Over the next week the cut heals as new skin covers it. Where did the new skin cells come from?",
    "Existing skin cells divided by mitosis to produce identical new cells",
    ["Ready-made skin cells travelled through the body from the stomach all the way to the cut", "The cut itself produced the new cells out of non-living material in the bandage and the air", "Bone cells from deep in the finger changed themselves into new skin cells at the cut"],
    "Healing is growth and repair by mitosis: skin cells near the cut divide to produce identical new skin cells that cover the wound.", {}); },
  function () { return mcq("Which is an example of cell division serving reproduction rather than growth?",
    "A bacterium dividing into two bacteria",
    ["Skin cells replacing a scrape", "A child's bones lengthening", "Muscle cells increasing after training"],
    "When a bacterium divides, it produces a new organism, so the division is reproduction. The other examples are growth or repair inside one organism.", {}); }
]), ["Growth and repair happen inside one organism.", "A new organism means reproduction."]);

E("s8-u4-cr-cell-division", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return textq("Explain how cell division by mitosis serves two different purposes in living things, one for a many-celled organism and one for a single-celled organism. Give an example of each. (3 marks)",
    ["Mitosis produces identical new cells; in a many-celled organism this allows growth and repair, such as skin cells dividing to heal a cut, while in a single-celled organism such as a bacterium, dividing produces a whole new organism, so it is reproduction."],
    "<b>Model answer:</b> Mitosis is cell division that produces new cells identical to the original cell. In a many-celled organism, mitosis allows growth and repair: skin cells divide to heal a cut, producing more skin cells exactly like the ones that were damaged. In a single-celled organism such as a bacterium, there is no separate body to grow, so when the cell divides into two, it has produced a new organism: division is its reproduction.<br><br><b>Marking points:</b> 1 mark for stating that mitosis produces identical new cells; 1 mark for growth or repair in a many-celled organism with a valid example; 1 mark for division as reproduction in a single-celled organism with a valid example.", {}); }
]), ["Identical cells first, then the two purposes.", "Think skin healing, then a bacterium."]);

/* ---------- SC8.10.4 Levels of organization ---------- */

E("s8-u4-order", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Which list gives the levels of organization in the correct order, from smallest to largest?",
    "Cells, tissues, organs, organ systems, organisms",
    ["Cells, organs, tissues, organisms, organ systems", "Tissues, cells, organs, organ systems, organisms", "Organisms, organ systems, organs, tissues, cells"],
    "The levels build up: cells group into tissues, tissues into organs, organs into organ systems, and the systems together make up the organism.", {}); }
]), ["Start with the cell.", "Each level is built from the one before."]);

E("s8-u4-example-level", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("A group of similar cells that work together to do the same job is called a",
    "tissue", ["organ", "organ system", "organism"],
    "Similar cells working together form a tissue, the second level of organization. Different tissues combine into organs.", {}); },
  function () { return mcq("The heart is made of muscle tissue, nerve tissue and connective tissue working together. The heart is an example of an",
    "organ", ["organ system", "organism", "cell"],
    "An organ is made of different tissues working together for one main job. The heart works with blood vessels as part of the circulatory system.", {}); }
]), ["Match the definition to the level.", "Similar cells together: one level up from cells."]);

E("s8-u4-analogy", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("In the building analogy for levels of organization, bricks are cells and walls are tissues. What do the floors of the building represent?",
    "Organ systems",
    ["Organs", "Organisms", "Cells"],
    "In the analogy, bricks (cells) build walls (tissues), walls form rooms (organs), rooms make floors (organ systems), and the whole house is the organism.", {}); }
]), ["Work up the analogy level by level.", "Rooms are organs; the next level up is..."]);

E("s8-u4-cr-levels", 4, ["SC8.10.4"], 2, "var", varset([
  function () { return textq("Name the five levels of organization in a many-celled organism, in order from smallest to largest, and give one body example for the tissue level and one for the organ level. (3 marks)",
    ["The levels are cells, tissues, organs, organ systems and organisms; muscle tissue is a tissue example, and the heart (or stomach, or lung) is an organ example."],
    "<b>Model answer:</b> From smallest to largest, the levels are cells, tissues, organs, organ systems and organisms. A tissue is a group of similar cells doing the same job, such as muscle tissue. An organ is made of different tissues working together, such as the heart.<br><br><b>Marking points:</b> 1 mark for all five levels in the correct order; 1 mark for a valid tissue example; 1 mark for a valid organ example.", {}); }
]), ["Five levels, smallest first.", "Tissue: similar cells. Organ: tissues together."]);

/* ---------- SC8.10.5 Basic needs of cells and organisms ---------- */

E("s8-u4-needs", 4, ["SC8.10.5"], 1, "var", varset([
  function () { return mcq("Cells and whole organisms share the same basic necessities. Which list names them?",
    "Oxygen, nutrients and the removal of wastes",
    ["Sunlight, soil to root in and shelter from the weather", "A bony skeleton, working muscles and a network of nerves", "Seeds, eggs and the young offspring produced each season"],
    "Every cell needs oxygen and nutrients, and needs its wastes removed, exactly as the whole organism does. The body's systems exist to meet those cell needs.", {}); }
]), ["Think about what a single cell must take in and give off.", "The list has three items."]);

E("s8-u4-needs-apply", 4, ["SC8.10.5"], 2, "var", varset([
  function () { return mcq("Why does a muscle cell die if its oxygen supply is cut off for long enough, even though the cell itself is microscopic?",
    "Cells have the same basic necessities as the whole organism, including oxygen",
    ["Muscle cells are too large to survive without lungs inside them", "Oxygen is only needed by organs, so the cell borrows it from the heart", "The cell stops because the brain sends it a signal to shut down"],
    "A single cell needs oxygen, nutrients and waste removal just as the whole organism does. Cut off the oxygen and the cell cannot carry on its life processes.", {}); }
]), ["Apply the shared-necessities idea to one cell.", "What does every cell need?"]);

E("s8-u4-needs-system", 4, ["SC8.10.5", "SC8.10.7"], 3, "var", varset([
  function () { return mcq("A cell deep in your leg muscle needs nutrients that entered your body through a meal. Which pairing of systems gets the nutrients from the meal to that cell?",
    "The digestive system breaks down the food and absorbs the nutrients, and the circulatory system carries them in the blood to the cell",
    ["The respiratory system absorbs the nutrients from the meal and the nervous system carries them in signals to the cell", "The excretory system absorbs the nutrients from the meal and the muscular system squeezes them through the body to the cell", "The digestive system carries the absorbed nutrients itself, through its own tubes, directly to every cell in the leg"],
    "Nutrients pass through the wall of the small intestine into the blood, and the circulatory system transports them to cells throughout the body. The two systems depend on each other to meet the cells' needs.", {}); }
]), ["Two systems share this job.", "Absorption first, then transport."]);

/* ---------- SC8.10.6 Factors affecting systems ---------- */

E("s8-u4-factor-positive", 4, ["SC8.10.6"], 1, "var", varset([
  function () { return mcq("Which lifestyle factor improves the efficiency of the circulatory and respiratory systems?",
    "Regular exercise",
    ["Smoking", "A sedentary lifestyle with little movement", "Skipping meals regularly"],
    "Regular exercise strengthens the heart and improves breathing capacity, so both systems work more efficiently. Smoking and inactivity reduce their efficiency.", {}); }
]), ["Positive effects only in this question.", "Think fitness."]);

E("s8-u4-factor-effect", 4, ["SC8.10.6"], 2, "var", varset([
  function () { return mcq("How does smoking most directly harm the respiratory system?",
    "It damages the lungs and airways, so gas exchange becomes less efficient",
    ["It makes the trachea in the throat grow longer and wider than it should be over time", "It increases the number of alveoli in the lungs, giving more surface for gas exchange", "It strengthens the muscles used in breathing, so the lungs work harder with each breath"],
    "Smoke damages the lungs and airways, reducing the surface and the efficiency of gas exchange, so the respiratory system delivers less oxygen to the blood.", {}); },
  function () { return mcq("A diet consistently high in fat most directly puts strain on which system, and why?",
    "The circulatory system, because fatty deposits narrow blood vessels and make the heart work harder",
    ["The nervous system, because fatty deposits block the signals travelling along the nerves", "The excretory system, because fat in the blood cannot be filtered out by the kidneys at all", "The muscular system, because stored fat replaces healthy muscle tissue completely over time"],
    "Fatty deposits narrow the vessels, raising the heart's workload and reducing the circulatory system's efficiency over time.", {}); }
]), ["Name the system the factor acts on.", "Then say how its efficiency changes."]);

E("s8-u4-sedentary", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return mcq("Two students have similar diets. One is active daily; the other is sedentary. After a year, the sedentary student tires much faster climbing stairs. The best explanation is that",
    "without regular activity, the heart and breathing muscles stay less efficient, so oxygen reaches the muscles more slowly during effort",
    ["the sedentary student's lungs have stopped exchanging gases with the air even while the student is at rest", "Being active permanently enlarges the heart of the active student, and only of that student, over the year", "the sedentary student's blood has lost its ability to carry oxygen from the lungs to the muscles at all"],
    "Exercise keeps the circulatory and respiratory systems efficient. Without it, the heart pumps less effectively and breathing capacity is lower, so during effort the muscles get oxygen more slowly and tire sooner.", {}); }
]), ["Compare the two systems' efficiency.", "Oxygen delivery during effort is the key."]);

E("s8-u4-cr-factors", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return textq("Choose two lifestyle factors from the guide's list (diet, nutrition, exercise, stress, smoking, alcohol, sedentary lifestyle). For each, explain its effect on the function or efficiency of a named body system. (3 marks)",
    ["Regular exercise strengthens the heart so the circulatory system delivers oxygen more efficiently, while smoking damages the lungs and airways so the respiratory system exchanges gases less efficiently (any two guide factors with a named system and a correct efficiency effect are acceptable)."],
    "<b>Model answer:</b> Exercise: regular exercise strengthens the heart muscle, so the circulatory system pumps blood and delivers oxygen to cells more efficiently. Smoking: smoke damages the lungs and airways, so the respiratory system exchanges oxygen and carbon dioxide less efficiently, and the blood carries less oxygen to the body.<br><br><b>Marking points:</b> 1 mark for each factor correctly tied to a named system with a correct effect on its function or efficiency (2 marks), and 1 mark for one effect explained as a change in efficiency (more or less effective delivery, exchange or removal).", {}); }
]), ["Two factors, two systems.", "Say how efficiency changes, not just that it is bad."]);

/* ---------- SC8.10.7 Interdependence of systems ---------- */

E("s8-u4-pair-circ-resp", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("How do the circulatory and respiratory systems depend on each other?",
    "The lungs take in oxygen and pass it to the blood, and the blood carries it to the cells and brings carbon dioxide back",
    ["The heart is the organ that breathes air in, and the lungs then pump that air around the whole body", "The blood itself makes the oxygen while it is in the lungs and then stores the oxygen in the heart", "The lungs do the job of filtering wastes out of the blood in the place of the kidneys in the body"],
    "The respiratory system exchanges the gases and the circulatory system transports them: oxygen from the lungs to the cells, carbon dioxide from the cells back to the lungs.", {}); }
]), ["One system exchanges, the other transports.", "Follow the oxygen, then the carbon dioxide."]);

E("s8-u4-pair-dig-circ", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Where do nutrients from digested food pass into the blood?",
    "Through the wall of the small intestine",
    ["Through the wall of the stomach", "Through the trachea", "Through the skin over the abdomen"],
    "The digestive system breaks food down and nutrients are absorbed through the wall of the small intestine into the blood, which the circulatory system then carries to the cells.", {}); }
]), ["Absorption happens in one named organ.", "It is part of the digestive tract, after the stomach."]);

E("s8-u4-pair-nerv-musc", 4, ["SC8.10.7"], 2, "var", varset([
  function () { return mcq("When you are cold, you shiver. Which two systems are working together in shivering, and how?",
    "The nervous system detects the cold and signals the muscular system to contract rapidly, producing heat",
    ["The digestive system detects the cold and the excretory system produces the heat", "The respiratory system detects the cold and the circulatory system shakes the muscles", "The muscular system detects the cold itself and answers without any signal"],
    "Sense organs and the nervous system detect the temperature change and signal muscles to contract rapidly. Shivering is the nervous and muscular systems depending on each other.", {}); },
  function () { return mcq("On a hot day, your face flushes red. What has happened between systems?",
    "The nervous system signalled tiny muscles in the skin's blood vessels to relax, letting more blood flow near the surface and release heat",
    ["The digestive system sent extra blood up to the vessels of the face, where the blood is stored until the body needs it elsewhere", "The excretory system pushed the sweat it produced into the blood vessels of the skin, which carried the sweat to the face", "The respiratory system pumped fresh air from the lungs directly into the tiny blood vessels in the skin of the face"],
    "The nervous system coordinates the response: muscles in the vessel walls relax under its signals, blood flow near the skin rises, and heat escapes. The nervous, muscular and circulatory systems are interacting.", {}); }
]), ["One system senses and signals; another acts.", "Shivering is muscle work ordered by nerves."]);

E("s8-u4-interdependence-why", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return mcq("During a sprint, a runner's breathing rate and heart rate both rise sharply. Why must both rise together?",
    "Working muscles need much more oxygen and produce more carbon dioxide; the lungs must exchange gases faster while the heart transports them faster, so neither system can meet the need alone",
    ["The heart rate rises first at the start of the sprint, and the pressure it builds up in the chest forces the lungs to follow along behind it at the same rate", "Breathing rate rises during a sprint mainly in order to cool the runner's blood down, and the heart rate rises only to move that cooled blood around the body to the skin", "Both rates are controlled by the runner's body to rise by exactly the same fixed amount, beat for beat, in every situation that a runner meets on the track"],
    "The systems are interdependent: the respiratory system can only load oxygen as fast as the blood carries it away, and the heart can only deliver what the lungs load. Sprinting raises the cells' demand, so both must increase together.", {}); }
]), ["Neither system can do the whole job alone.", "Demand at the cells drives both."]);

E("s8-u4-cr-interdependence", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return textq("Choose one pair of body systems from this unit (circulatory and respiratory, digestive and circulatory, or nervous and muscular). Explain how the two systems depend on each other, using a specific example from the body. (3 marks)",
    ["The circulatory and respiratory systems depend on each other: the lungs exchange gases with the blood, taking in oxygen and removing carbon dioxide, and the heart and vessels transport those gases between the lungs and the cells, so neither system can supply the cells on its own (the digestive/circulatory or nervous/muscular pair explained with its guide example is equally acceptable)."],
    "<b>Model answer:</b> The respiratory system brings air into the lungs, where oxygen passes into the blood and carbon dioxide passes out. On its own, that oxygen would stay in the lungs. The circulatory system completes the job: the heart pumps the oxygen-rich blood to every cell and returns carbon dioxide to the lungs to be breathed out. Each system depends on the other; if breathing stopped, the blood would have no oxygen to carry, and if the heart stopped, the oxygen in the lungs would never reach the cells.<br><br><b>Marking points:</b> 1 mark for naming a valid pair from the unit; 1 mark for explaining what each system contributes; 1 mark for a specific body example showing the dependence.", {}); }
]), ["Pick one of the three guide pairs.", "Say what each system contributes."]);

E("s8-u4-cr-living", 4, ["SC8.10.1"], 2, "var", varset([
  function () { return textq("A student argues that a seed is not alive because it does not move. Use the characteristics of life and the cell theory to explain why a seed is a living thing. (3 marks)",
    ["A seed is made of cells, and movement is only one of the four characteristics of life (growth, movement, response to stimuli and reproduction); a seed grows into a plant, responds to conditions such as water and warmth by germinating, and was produced by reproduction, so it is living even while dormant."],
    "<b>Model answer:</b> A seed is made of cells, and the cell theory states that all living things are made of cells. Movement is only one of the four characteristics of life. A seed shows the others: it grows into a new plant, it responds to stimuli such as water and warmth by germinating, and it exists because of reproduction. An organism does not need to show all four characteristics at every moment to be alive.<br><br><b>Marking points:</b> 1 mark for noting the seed is made of cells; 1 mark for naming characteristics of life beyond movement; 1 mark for applying at least one of them to the seed (growth on germination, or response to water and warmth).", {}); }
]), ["Movement is only one of four characteristics.", "What else does a seed do?"]);

/* ---------- SC8.11.1 Early ideas about living things ---------- */

E("s8-u4-early-modern", 4, ["SC8.11.1"], 2, "var", varset([
  function () { return mcq("Ancient peoples explained living things using ideas about air, water and fire. How does the modern cell theory differ most from those early ideas?",
    "It is built on observations made with microscopes, which showed that living things are made of cells",
    ["It rejects every observation made of living things and relies only on tradition handed down over the years", "It explains all living things using a set of four elements, instead of the three the ancient peoples used", "It was fully developed long before any tools for observing very small things had been invented by anyone"],
    "Early explanations were guesses about the world without ways to observe the very small. The cell theory came from systematic observation once microscopes let scientists see that every living thing is made of cells.", {}); }
]), ["What tool changed what could be observed?", "The microscope is the turning point."]);

E("s8-u4-dynamic", 4, ["SC8.11.1", "SC8.11.2"], 3, "var", varset([
  function () { return mcq("Early scientists could not agree on whether tiny organisms seen through early microscopes were really alive. The disagreement was settled mainly because",
    "improved microscopes gave clearer observations, showing the organisms were made of cells with the characteristics of life",
    ["the scientists of the time settled the disagreement by voting on the question at a meeting", "the tiny organisms themselves grew larger over time until everyone could agree that they were alive", "the early scientists simply stopped studying the question and moved on to other problems instead"],
    "Science is dynamic: as tools improved, observations became clearer and theories were revised. Better lenses showed cell structures and life processes, settling what the organisms were.", {}); }
]), ["What changed: the tools or the organisms?", "Better observations revise theories."]);

/* ---------- SC8.11.2 The microscope as a developing technology ---------- */

E("s8-u4-micro-development", 4, ["SC8.11.2"], 1, "var", varset([
  function () { return mcq("Leeuwenhoek's microscope used a single small lens, yet he was the first to observe bacteria. Later microscopes, up to the scanning electron microscope, revealed far more. What pattern does this history show?",
    "Optical technology developed through steady improvements, and each improvement let scientists observe more and revise their ideas",
    ["Each new and better microscope that was built made all of the previous discoveries with older ones worthless", "Microscopes were perfected all at once, in a single step, by the first person who built one", "Better microscopes brought scientific disagreement about cells to a complete end, once and for all"],
    "Microscope development was a long process of trial and improvement in lenses and design. Each advance extended what could be observed, and cell science advanced with it.", {}); }
]), ["Think about the sequence of tools.", "Better tools, better observations, revised ideas."]);

E("s8-u4-micro-parts", 4, ["SC8.11.2", "SC8.12.1"], 1, "var", varset([
  function () { var q = mcq("On the microscope diagram, which callout labels the objective lens?",
    "B", ["A", "C", "F"],
    "Callout B is the objective lens, held by the revolving nosepiece close to the specimen. A is the eyepiece, C the stage and F the light source.", {});
    q.figure = s8MicroscopeSVG(); return q; },
  function () { var q = mcq("On the microscope diagram, which callout labels the stage?",
    "C", ["B", "D", "G"],
    "Callout C is the stage, the flat platform that holds the slide. B is the objective lens, D the coarse adjustment knob and G the arm.", {});
    q.figure = s8MicroscopeSVG(); return q; }
]), ["The objective sits just above the slide.", "The stage is the platform holding the slide."]);

/* ---------- SC8.11.3 Organelles, using proper terms ---------- */

E("s8-u4-organelle-figure", 4, ["SC8.11.3"], 2, "var", varset([
  function () { var q = mcq("The diagram shows an animal cell. Which callout labels the nucleus?",
    "B", ["A", "D", "E"],
    "Callout B is the nucleus, the structure that contains the cell's genetic material and controls the cell's activities. A is the cell membrane, D a mitochondrion and E a vacuole.", {});
    q.figure = s8CellSVG("animal"); return q; },
  function () { var q = mcq("The diagram shows an animal cell. Which callout labels the cell membrane?",
    "A", ["B", "C", "E"],
    "Callout A is the cell membrane, the boundary that controls what enters and leaves the cell. An animal cell has no cell wall outside it. B is the nucleus, C the cytoplasm and E a vacuole.", {});
    q.figure = s8CellSVG("animal"); return q; }
]), ["The nucleus is the large round control centre.", "The membrane is the outer boundary."]);

E("s8-u4-organelle-function", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("What is the role of the mitochondria in a cell?",
    "They release energy from food for the cell to use",
    ["They make food using sunlight", "They store the cell's genetic material", "They hold the cell's shape rigidly"],
    "Mitochondria release energy from food so the cell can carry out its activities. Making food is the chloroplast's role, and genetic material is held in the nucleus.", {}); },
  function () { return mcq("What is the role of the chloroplast in a plant cell?",
    "It uses sunlight to make food for the cell",
    ["It releases energy from food", "It controls what enters and leaves the cell", "It stores water and wastes"],
    "Chloroplasts carry out photosynthesis, using sunlight to make food. Mitochondria release energy from that food, and vacuoles store water and other materials.", {}); }
]), ["Match each organelle to its one job.", "Mitochondria: energy release. Chloroplast: food making."]);

E("s8-u4-organelle-match", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Which organelle controls the movement of food, wastes and other substances into and out of the cell?",
    "The cell membrane",
    ["The cell wall", "The cytoplasm", "The vacuole"],
    "The cell membrane is the gatekeeper: it controls what enters and leaves. The cell wall gives support and shape, and the cytoplasm is the jelly-like substance where the organelles sit.", {}); },
  function () { return mcq("Which organelle contains the cell's genetic material and controls the cell's activities?",
    "The nucleus",
    ["The mitochondria", "The chloroplast", "The cell wall"],
    "The nucleus holds the genetic material and acts as the control centre of the cell.", {}); }
]), ["Gatekeeper or control centre?", "Membrane controls movement; nucleus controls the cell."]);

E("s8-u4-organelle-plant", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("A student must label a plant cell diagram using proper terms. Which set of labels belongs only on the plant cell, not on an animal cell diagram?",
    "Cell wall and chloroplast",
    ["Cell membrane and nucleus", "Cytoplasm and mitochondria", "Nucleus and vacuole"],
    "Cell walls and chloroplasts are plant-only structures at this level. Membranes, nuclei, cytoplasm, mitochondria and vacuoles appear in both cell types.", {}); }
]), ["Use the three plant/animal differences.", "Two of them are structures."]);

E("s8-u4-organelle-term", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return mcq("Which comparison of plant and animal cells uses the proper terms correctly?",
    "Both have a cell membrane, but only the plant cell has a cell wall outside it, and the plant cell's vacuole is larger",
    ["Both kinds of cell have a cell wall around them, but only the animal cell has a cell membrane inside it", "The plant cell's membrane lies outside its cell wall, unlike the arrangement found in the animal cell", "Animal cells carry chloroplasts scattered in their cytoplasm, while plant cells have no chloroplasts at all"],
    "Every cell has a membrane; plant cells add a wall outside the membrane, and their vacuoles are fewer and larger. (Note: the textbook's plant cell diagram on page 405 prints two labels swapped; A is the cell wall and C is the cell membrane.)", {}); }
]), ["Wall outside, membrane inside it.", "Check each claim against the differences."]);

E("s8-u4-cr-organelles", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return textq("Using proper terms, explain the role of each of these cell structures: cell membrane, nucleus and mitochondria. Then name one structure found in plant cells but not animal cells and state its role. (3 marks)",
    ["The cell membrane controls what enters and leaves the cell; the nucleus contains the genetic material and controls the cell's activities; the mitochondria release energy from food; the cell wall (or chloroplast) is plant-only, giving support and shape (or carrying out photosynthesis)."],
    "<b>Model answer:</b> The cell membrane controls the movement of substances into and out of the cell. The nucleus contains the genetic material and controls the cell's activities. The mitochondria release energy from food for the cell to use. The cell wall is found in plant cells only: it supports the cell and gives it a regular shape. (The chloroplast, which makes food by photosynthesis, is an equally valid plant-only structure.)<br><br><b>Marking points:</b> 1 mark for two of the three named roles correct; 1 mark for all three correct; 1 mark for a plant-only structure with its correct role.", {}); }
]), ["Three roles, then one plant-only structure.", "Membrane, nucleus, mitochondria."]);

/* ---------- SC8.11.4 and SC8.11.5 Technologies from scientific knowledge ---------- */

E("s8-u4-tech-examples", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Which technology assists or replaces the work of an unhealthy organ?",
    "A dialysis machine, which filters the blood when the kidneys fail",
    ["A stethoscope, which listens to the sounds of the heart beating inside the chest", "An X-ray machine, which takes images of the bones inside a patient's body at a hospital", "A thermometer, which measures the temperature of the body or of a liquid in a lab"],
    "Dialysis does the kidney's job of cleaning the blood when the kidneys cannot. The other devices observe or measure; they do not assist or replace an organ's work.", {}); },
  function () { return mcq("An insulin pump is worn by a person with diabetes. Which organ's work is it assisting?",
    "The pancreas, by regulating insulin levels in the blood",
    ["The liver, by storing extra glucose from food", "The kidney, by filtering insulin out of the blood", "The heart, by pumping insulin around the body in the blood"],
    "The insulin pump regulates insulin in the blood, assisting the pancreas, the organ that normally produces insulin.", {}); }
]), ["Does the device do the organ's job?", "Dialysis filters blood, like a kidney."]);

E("s8-u4-tech-match", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("A pacemaker is implanted in a patient's chest. What does it do?",
    "It sends electrical impulses that keep the heart beating in a steady rhythm",
    ["It filters all of the wastes out of the patient's blood as the blood passes through the chest", "It pumps the patient's blood around the body in place of the heart, doing the heart's whole job", "It produces insulin inside the patient's body and releases it on a regular daily schedule"],
    "A pacemaker replaces the heart's faulty electrical signals with steady impulses, so the heart keeps a regular beat. Filtering blood is dialysis; regulating insulin is an insulin pump.", {}); },
  function () { return mcq("A cochlear implant assists which sense organ, and how?",
    "The ear, by converting sound into electrical signals the nerves can carry",
    ["The eye, by focusing the light that enters it onto the retina at the back of the eyeball", "The skin, by sensing changes in pressure against its surface and sending signals to the brain", "The tongue, by detecting the chemicals dissolved in the food and drink that pass over it"],
    "Cochlear implants pick up sound and turn it into electrical impulses for the auditory nerve, assisting a damaged inner ear.", {}); }
]), ["Match the device to the organ it assists.", "Pacemaker: heart rhythm. Cochlear: hearing."]);

E("s8-u4-cr-artificial", 4, ["SC8.11.4"], 3, "var", varset([
  function () { return textq("Choose one technology that assists or replaces an unhealthy organ or system (for example a dialysis machine, an insulin pump, an artificial heart valve or a pacemaker). Explain the science of the organ it assists: what the organ does, what goes wrong, and how the technology applies scientific knowledge to do or support that job. (4 marks)",
    ["A dialysis machine assists the kidneys: the kidneys filter wastes such as urea from the blood and balance its water and salts; when kidneys fail, wastes build up and poison the body; dialysis applies knowledge of filtration, passing the blood across a membrane that removes wastes and restores balance, several times a week (any guide technology explained at this depth is acceptable)."],
    "<b>Model answer:</b> The kidneys clean the blood: their nephrons remove wastes such as urea, keep the right balance of water and salts, and help hold blood pH steady. When both kidneys fail, wastes accumulate and the person becomes seriously ill. A dialysis machine applies what science knows about filtration: blood is passed across a membrane beside a special fluid, wastes diffuse out of the blood into the fluid, and the cleaned blood returns to the body. It does the kidney's filtering job from outside the body, usually for several hours at a time, several times a week.<br><br><b>Marking points:</b> 1 mark for naming the technology and the organ; 1 mark for what the healthy organ does; 1 mark for what goes wrong when it fails; 1 mark for how the technology applies scientific knowledge to do or support the job.", {}); }
]), ["Organ first: what does it do?", "Then the failure, then the technology."]);

E("s8-u4-knowledge-tech", 4, ["SC8.11.5"], 2, "var", varset([
  function () { return mcq("Which is the clearest example of scientific knowledge resulting in a technology?",
    "Understanding that the heart is coordinated by electrical signals led to the pacemaker",
    ["Building a hospital led to the discovery of the heart", "Using a stethoscope led to the discovery of blood", "Inventing the thermometer led to the discovery of body temperature as a concept"],
    "Knowledge came first: once scientists understood the heart's electrical control, engineers could build a device that supplies the signal. In the other options the direction of the claim is reversed or wrong.", {}); }
]), ["Which came first, knowledge or device?", "Understanding signals, then the pacemaker."]);

E("s8-u4-knowledge-tech2", 4, ["SC8.11.5"], 3, "var", varset([
  function () { return mcq("Artificial heart valves are made of materials the body tolerates and shaped to open and close with blood flow. Which chain best explains how this technology came to exist?",
    "Knowledge of how heart valves work and of suitable materials was applied to design a replacement part",
    ["The working valves were discovered growing naturally inside the body and were copied exactly as found", "Surgeons needed the replacement part, so the part simply appeared for them without any research behind it", "Knowledge of red blood cells alone, and nothing else, was enough for engineers to produce the valve"],
    "Technologies grow out of combined scientific knowledge: valve function, blood flow and material behaviour all had to be understood before a working replacement could be designed.", {}); }
]), ["Several kinds of knowledge combine.", "Function plus materials plus flow."]);

/* ---------- SC8.11.6 Community needs ---------- */

E("s8-u4-community-need", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return mcq("A community has many residents whose kidneys have failed, but the nearest dialysis unit is hours away. A dialysis unit is built in the local hospital. This is an example of",
    "a community's needs leading to a development in applied science and technology",
    ["a new technology creating a need in the community that had not existed there before it arrived", "scientific knowledge from outside experts replacing the input of the community in every decision", "a community choosing to avoid the use of modern medical technology in its local hospital altogether"],
    "The need existed first: patients needed regular dialysis to survive. The community's need drove the development and placement of the technology.", {}); }
]), ["Which came first, the need or the technology?", "Patients needed treatment close to home."]);

E("s8-u4-cr-community", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return textq("Describe one example of a community need that led to a development in science or technology connected to body systems. Explain the need, the development it produced, and how the development answers the need. (3 marks)",
    ["When many people in a community develop diabetes, the need for steady insulin control without constant injections led to the development of the insulin pump, a small device that delivers insulin on a schedule and keeps blood insulin levels steadier (any clear need-to-development example tied to body systems is acceptable)."],
    "<b>Model answer:</b> Many people in every community live with diabetes and must keep their blood sugar controlled all day. Injections several times a day are hard to keep steady, and poor control damages organs over time. That community need drove the development of the insulin pump: a small wearable device that delivers insulin continuously on a programmed schedule, keeping levels steadier than injections alone and freeing patients from constant needle routines.<br><br><b>Marking points:</b> 1 mark for a real community need tied to body systems; 1 mark for the development it produced; 1 mark for explaining how the development answers the need.", {}); }
]), ["Need, development, fit.", "Diabetes and the insulin pump is one model."]);

/* ---------- SC8.11.7, SC8.11.8, SC8.11.10 Decisions and courses of action ---------- */

E("s8-u4-decision-sr", 4, ["SC8.11.7"], 2, "var", varset([
  function () { return mcq("A town is deciding whether to fund a new dialysis unit. Which consideration is an environmental one?",
    "The unit produces medical waste that must be disposed of safely",
    ["Patients would no longer travel hours for treatment", "Nurses would be hired locally", "Families could visit patients more easily"],
    "Medical waste disposal affects the environment. Travel time, jobs and visiting are social considerations. An informed decision weighs both kinds.", {}); }
]), ["Environmental means effects on the surroundings.", "Waste, water, energy: environmental."]);

E("s8-u4-cr-decision", 4, ["SC8.11.7"], 3, "var", varset([
  function () { return textq("A health authority can fund either more dialysis machines in one city hospital or a smaller dialysis unit in a rural community whose patients now travel three hours each way. Make an informed decision: state your choice, give one social advantage and one social disadvantage of it, and one environmental consideration. (3 marks)",
    ["Fund the rural unit: socially, patients keep their treatment near home and family, though the smaller unit serves fewer patients per machine than the city site; environmentally, far less travel fuel is burned, though the new unit adds medical waste to dispose of locally (either choice, defended with a genuine social advantage, disadvantage and environmental consideration, is acceptable)."],
    "<b>Model answer:</b> I would fund the rural unit. Social advantage: patients receive life-sustaining treatment near home, keeping families together and avoiding exhausting travel while ill. Social disadvantage: a small unit serves fewer patients per machine, so the city wait list grows more slowly relieved. Environmental consideration: eliminating three-hour trips for many patients every week cuts fuel use and emissions greatly, though the new unit's medical waste must be handled safely.<br><br><b>Marking points:</b> 1 mark for a clear decision; 1 mark for a genuine social advantage and disadvantage of the chosen option; 1 mark for a genuine environmental consideration.", {}); }
]), ["Decide, then weigh both sides.", "Social: people. Environmental: surroundings."]);

E("s8-u4-propose-sr", 4, ["SC8.11.8"], 2, "var", varset([
  function () { return mcq("A school is proposing a course of action on energy drinks being sold to students under 18. Which proposal best takes human and environmental needs into account?",
    "Restrict sales to under-18s near schools, with the health evidence explained to students and retailers",
    ["Ban every kind of drink in the school building entirely, including the water students carry with them", "Ignore the issue completely, because the sale of the drinks raises money that the school can spend", "Let each student in the school decide for themselves, with no information about the drinks provided to anyone"],
    "A sound proposal acts on the health evidence (human needs) in a proportionate way and explains itself. Blanket bans on everything and doing nothing both fail the test.", {}); }
]), ["Proportionate, evidence-based, explained.", "Human needs include students' health."]);

E("s8-u4-cr-propose", 4, ["SC8.11.8"], 3, "var", varset([
  function () { return textq("Adults smoking in cars with children present is a social issue connected to the respiratory system. Propose a course of action on this issue. Your proposal must state the action, the human need it protects, and one objection people might raise with your answer to it. (3 marks)",
    ["Propose that smoking in a vehicle with children be prohibited and enforced with fines: it protects children's developing lungs from second-hand smoke, which damages airways and worsens asthma; the objection that it interferes with adults' freedom in their own car is answered by the child's inability to choose or leave (any workable action with a stated human need and a fairly answered objection is acceptable)."],
    "<b>Model answer:</b> Action: prohibit smoking in any vehicle carrying children, enforced the way seatbelt laws are. Human need protected: children breathe second-hand smoke in a small closed space, and smoke damages airways and the lungs' ability to exchange gases, worsening asthma and infections; children cannot choose to leave. Objection: adults may say their car is private. Answer: the law already limits private behaviour in cars (seatbelts, car seats) when children's health is at stake, and the child's need for clean air outweighs the inconvenience.<br><br><b>Marking points:</b> 1 mark for a clear, workable action; 1 mark for the human or environmental need it protects, tied to body systems; 1 mark for a fair objection with a reasoned answer.", {}); }
]), ["Action, need, objection, answer.", "Tie the need to the respiratory system."]);

E("s8-u4-personal-decision", 4, ["SC8.11.10"], 2, "var", varset([
  function () { return mcq("A young athlete is offered steroids to build muscle faster. Which reasoning is an informed personal decision based on body systems?",
    "Refuse: steroids can damage the heart, liver and hormone systems, trading long-term health for short-term muscle gain",
    ["Accept them: the size of an athlete's muscles is the only measure that matters of a healthy muscular system", "Refuse the offer only because the steroids cost more money than the athlete can afford to spend", "Accept the offer if a friend at the gym has used the same steroids without any obvious harm showing yet"],
    "An informed decision weighs the science: steroids affect several systems (circulatory, excretory organs such as the liver, and hormonal control), so the personal advantage is outweighed by real disadvantages.", {}); }
]), ["Weigh advantage against system damage.", "Short term gain, long term cost."]);

E("s8-u4-cr-decision-personal", 4, ["SC8.11.10"], 3, "var", varset([
  function () { return textq("Make an informed decision about this application of science and technology: a fitness company markets a machine that promises strong muscles with no exercise, using electrical stimulation while the user sits. State your decision about using it, one personal advantage claimed or real, one personal or social disadvantage, and the body-systems science behind your decision. (3 marks)",
    ["I would not rely on the machine: its claimed advantage is convenience, but electrical stimulation does not train the heart and lungs the way real activity does, and unused fitness still declines; socially, marketing such devices can mislead people away from effective exercise, and the muscular system works with the circulatory and respiratory systems, which the machine leaves untrained (either decision defended with a real advantage, a real disadvantage and correct systems science is acceptable)."],
    "<b>Model answer:</b> I would not use the machine as a substitute for exercise. Its real advantage is convenience, and stimulation can contract muscles. But fitness is not one system: real exercise trains the muscular system together with the circulatory and respiratory systems, strengthening the heart and improving gas exchange. A seated device leaves those systems untrained, so overall health gains are small, and socially such marketing can mislead people into skipping activity that works.<br><br><b>Marking points:</b> 1 mark for a clear decision; 1 mark for a genuine personal advantage and a personal or social disadvantage; 1 mark for correct body-systems science supporting the decision.", {}); }
]), ["Decide, then support with systems science.", "Muscles do not work alone."]);

/* ---------- SC8.11.9 Careers ---------- */

E("s8-u4-careers", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Which career is directly associated with the health of body systems?",
    "Physiotherapist",
    ["Accountant", "Electrician", "Journalist"],
    "Physiotherapists help patients recover movement and strength after injury or illness, working directly with the muscular and nervous systems. Lab and x-ray technicians, nutritionists, doctors and public health nurses are other examples from the guide.", {}); }
]), ["Which job treats body systems daily?", "Think rehabilitation after injury."]);

E("s8-u4-careers-match", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("A public health nurse's work connects to body systems mainly by",
    "promoting healthy habits and preventing illness in the whole community",
    ["operating on damaged organs inside patients in the operating room of a hospital", "designing artificial organs in a laboratory for patients whose own organs have failed", "fitting artificial limbs to patients who have lost an arm or a leg in an accident"],
    "Public health nurses work at community level: vaccination, screening and health education that keep body systems healthy. The other roles belong to surgeons, biomedical engineers and prosthetists.", {}); },
  function () { return mcq("Which career works with the digestive system by advising patients on diet?",
    "Nutritionist",
    ["X-ray technician", "Coach", "Lab technician"],
    "Nutritionists advise on diet and nutrition, which directly affects the digestive system and, through it, every other system.", {}); }
]), ["Match the career to its systems role.", "Prevention at community level: public health nurse."]);

/* ---------- SC8.12.1 and SC8.12.3 Microscope use and care (CORE) ---------- */

E("s8-u4-focus-sequence", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("Which sequence correctly brings a slide into focus?",
    "Start on low power, focus with the coarse adjustment, then switch to medium power and finish with the fine adjustment",
    ["Start the viewing on the highest power objective and focus the image using the coarse adjustment knob", "Focus with the fine adjustment knob first, and only afterwards turn to the coarse adjustment knob", "Switch the objective to medium power before the prepared slide is placed on the stage of the microscope"],
    "Correct technique starts on low power with the coarse adjustment knob, then moves to medium power and sharpens with the fine adjustment. High power use is not required at this level, and the coarse knob is for low and medium power focusing.", {}); }
]), ["Low power first.", "Coarse, then fine."]);

E("s8-u4-parts-action", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("The image under the microscope is too dim to see the cells clearly. Which part should be adjusted?",
    "The iris diaphragm, which controls the amount of light reaching the specimen",
    ["The coarse adjustment knob, which opens and closes to control the light reaching the specimen", "The revolving nosepiece, which is adjusted to control the amount of light reaching the specimen", "The base, which is turned to control the amount of light that reaches the specimen on the stage"],
    "The iris diaphragm opens and closes to control light. The coarse knob changes focus, the nosepiece changes objectives, and the base is only support.", {}); },
  function () { return mcq("What does the revolving nosepiece do?",
    "It rotates to bring a different objective lens into position",
    ["It holds the prepared slide firmly in place on the stage while the slide is viewed", "It focuses the image sharply when the microscope is used at its high power setting", "It adjusts the brightness of the light source that shines up through the specimen"],
    "The nosepiece holds the objective lenses and rotates to switch between them. Slides sit on the stage, focusing is done with the adjustment knobs, and the diaphragm controls light.", {}); }
]), ["Dim image means a light problem.", "Diaphragm for light; nosepiece for lenses."]);

E("s8-u4-cr-microscope", 4, ["SC8.12.1", "SC8.12.3"], 2, "var", varset([
  function () { return textq("A new student is about to use the compound microscope for the first time. Describe how to carry and set up the microscope, and the focusing steps to obtain a clear image of cells on low and then medium power. (3 marks)",
    ["Carry the microscope with one hand under the base and one gripping the arm; place it away from the table edge, plug in and switch on the light; place the slide on the stage, start with the low power objective, focus with the coarse adjustment knob, then rotate the nosepiece to medium power and sharpen the image with the fine adjustment knob only."],
    "<b>Model answer:</b> Carry the microscope with two hands, one under the base and one on the arm, and set it down away from the edge of the table. Switch on the light and place the slide on the stage. Always begin with the low power objective in place: look through the eyepiece and turn the coarse adjustment knob until the cells are in focus. Then rotate the nosepiece to the medium power objective and use only the fine adjustment knob to sharpen the image. When finished, return to low power, remove the slide, and store the microscope covered.<br><br><b>Marking points:</b> 1 mark for safe carrying and setup (two hands, base and arm); 1 mark for starting on low power and focusing with the coarse adjustment; 1 mark for switching to medium power and finishing with the fine adjustment only.", {}); }
]), ["Carry, set up, focus low, then medium.", "Coarse on low power; fine to finish."]);

E("s8-u4-care", 4, ["SC8.12.3"], 1, "var", varset([
  function () { return mcq("Which practice shows proper care of the compound microscope?",
    "Carrying it with one hand under the base and the other on the arm, and storing it covered on low power",
    ["Carrying it around the laboratory by its tube, held in one hand while walking", "Storing it away in the cupboard with a prepared slide still left sitting on its stage", "Cleaning the lenses of its objectives with an ordinary paper towel from the bench"],
    "Two-handed carrying (base and arm), removing slides, returning to low power and covering the microscope for storage are the care standards. Lenses are cleaned only with lens paper.", {}); }
]), ["Two hands, covered, low power, no slide.", "Lens paper only for lenses."]);

E("s8-u4-care-error", 4, ["SC8.12.3"], 2, "var", varset([
  function () { return mcq("A student finishes a lab and puts the microscope away with the medium power objective in place, a slide still on the stage, and no cover. How many care errors is that?",
    "Three: it should be stored on low power, with no slide, and covered",
    ["None: that is the correct storage state", "One: only the missing cover matters", "Two: the slide and the cover, but the objective does not matter"],
    "Storage standard: low power objective in place, slide removed, microscope covered. The described state breaks all three parts of the standard.", {}); }
]), ["Compare each detail with the storage standard.", "Low power, no slide, covered."]);

/* ---------- SC8.12.2 Estimating cell size ---------- */

E("s8-u4-estimate-gen", 4, ["SC8.12.2"], 2, "gen", function () {
  var cases = [[2, 5], [3, 6], [1.6, 4], [2.4, 8], [4, 10], [2.5, 5], [1.8, 6], [3.2, 8]];
  var c = pick(cases), F = c[0], N = c[1], est = Math.round(F / N * 100) / 100;
  var dis = s8dis(est, [est * 2, F, Math.round((est + 0.3) * 100) / 100, Math.round(est / 2 * 100) / 100]);
  return mcq("Under the microscope, the field of view is " + F + " mm across. About " + N + " cells of a specimen fit side by side across the field. Estimate the width of one cell.",
    est + " mm", dis.map(function (v) { return v + " mm"; }),
    "Divide the field of view by the number of cells that fit across it: " + F + " mm / " + N + " = " + est + " mm. This is an estimate, the method the core lab uses, not an exact measurement.", {});
}, ["Share the field among the cells.", "Field of view divided by cells across."]);

E("s8-u4-estimate-compare", 4, ["SC8.12.2"], 1, "var", varset([
  function () { return mcq("A student switches from the low power objective to the medium power objective. What happens to the field of view?",
    "It gets smaller, so fewer cells are visible but each appears larger",
    ["It gets larger as the power rises, so more of the cells on the slide become visible", "It stays exactly the same size as it was under the low power objective before", "It disappears from view entirely until the coarse adjustment knob is turned again"],
    "Higher magnification narrows the field of view: you see a smaller area in greater detail. That is why size estimates must use the field of view for the objective in use.", {}); }
]), ["More magnification, less area.", "The field shrinks as power rises."]);

E("s8-u4-estimate-scenario", 4, ["SC8.12.2"], 2, "var", varset([
  function () { return mcq("The field of view on medium power is 1.2 mm. A student sees about 4 onion cells side by side across the field. The best estimate for one cell's width is",
    "about 0.3 mm",
    ["about 4.8 mm", "about 1.2 mm", "about 0.03 mm"],
    "Share the field among the cells: 1.2 mm / 4 = 0.3 mm per cell. Estimates like this are approximate by design; no ratio calculation beyond the sharing is expected.", {}); }
]), ["Divide the field by the count.", "1.2 shared by 4 cells."]);

/* ---------- SC8.12.4 and SC8.12.5 Cell models ---------- */

E("s8-u4-model-accuracy", 4, ["SC8.12.4"], 2, "var", varset([
  function () { return mcq("A group's model of an animal cell is a flat paper disc with chloroplasts drawn on it. Which two changes would most improve the model's accuracy?",
    "Make the model three-dimensional, and remove the chloroplasts",
    ["Colour the disc green, and add a cell wall", "Label the disc with the cell's name, and make it larger", "Add more chloroplasts, and flatten it further"],
    "Cells are three-dimensional, which is why the guide uses 3-D models, and animal cells have no chloroplasts. A cell wall would also be wrong for an animal cell.", {}); }
]), ["Cells are not flat.", "Animal cells lack chloroplasts and walls."]);

E("s8-u4-eval-process", 4, ["SC8.12.5"], 3, "var", varset([
  function () { return mcq("A class builds cell models, then evaluates each group's process. Which evaluation is the fairest and most useful?",
    "Judge against a checklist the class agreed on before building (accuracy of parts, teamwork, use of time), with evidence noted for each point",
    ["Give the highest mark in the class to whichever model looks the best finished, regardless of the process its group used", "Let each group in the class mark its own work by itself, with no criteria given to anyone beforehand", "Rank all of the groups in the class from first place to last place, with no explanation given for the order"],
    "Evaluating a process needs criteria set in advance and evidence against them. Judging only the final product ignores the process being evaluated, and criteria-free marking cannot be fair or useful.", {}); }
]), ["Criteria first, evidence second.", "Process, not just product."]);

E("s8-u4-cr-model-eval", 4, ["SC8.12.5"], 2, "var", varset([
  function () { return textq("Your group built a three-dimensional cell model. Evaluate your group's process: name one thing the group did well, one weakness in how you worked, and one specific change you would make next time. Judge your process against criteria, not just the finished model. (3 marks)",
    ["Our group divided the organelles among members and checked each part against the textbook diagram before assembling, which kept the model accurate; our weakness was leaving the assembly to the final class, so two parts were rushed; next time we would set an earlier deadline for parts and use the class checklist to review progress halfway through (any honest evaluation with a strength, a weakness and a concrete improvement earns the marks)."],
    "<b>Model answer:</b> Strength: we split the organelles among the four of us and each person checked their part against the diagram before we assembled, so the finished model was accurate. Weakness: we spent too long choosing materials and left assembly to the last class, so the vacuole was rushed and undersized. Change: next time we would set a deadline for all parts one class earlier and use the class checklist at the halfway point to catch problems while there is time to fix them.<br><br><b>Marking points:</b> 1 mark for a genuine strength of the group's process; 1 mark for a genuine weakness in the process (not just the product); 1 mark for a specific, workable improvement.", {}); }
]), ["Strength, weakness, improvement.", "Judge the process, not the product."]);

/* ---------- SC8.12.6 to SC8.12.9 The activity experiment ---------- */

E("s8-u4-variables", 4, ["SC8.12.6", "SC8.12.9"], 2, "var", varset([
  function () { return mcq("In the heart rate experiment, a student measures her rate at rest, after walking, and after running. What is the manipulated (independent) variable, and what must be controlled?",
    "Activity level is manipulated; the same person, the same counting method and the same timing must be kept the same",
    ["Heart rate is the variable manipulated; the activity level must be kept the same throughout", "Activity level is manipulated; a different person should be used at each level of activity in the experiment", "Breathing rate is the variable manipulated; the heart rate must be kept the same at every level"],
    "The experimenter changes the activity level and measures the response (heart rate). Fair comparison requires the same subject, the same 15 second count multiplied by 4, and the same timing at every level.", {}); }
]), ["What does the experimenter change?", "Everything else stays the same."]);

E("s8-u4-protocol", 4, ["SC8.12.6"], 1, "var", varset([
  function () { return mcq("In Core Lab 12-1B, resting heart rate is measured by counting the pulse for 15 seconds and multiplying by 4. Why is the count repeated three times and averaged?",
    "Averaging three trials gives a more reliable resting value than a single count",
    ["Three trials are needed so that the average reaches exactly the true resting value of the pulse", "The first two of the three counts are only practice attempts and are thrown away unused", "Multiplying the count by 4 gives a rate only when the count is made after three full trials"],
    "Single counts vary with small timing and counting errors. Repeating and averaging reduces the effect of any one faulty count, giving a more trustworthy resting rate.", {}); }
]), ["One count can be off.", "Repeats plus an average: reliability."]);

E("s8-u4-cr-design-rates", 4, ["SC8.12.6"], 3, "var", varset([
  function () { return textq("Design an experiment to compare heart rate and breathing rate at rest and after two levels of activity. State the question, the variable you will change, two variables you will control, how you will measure both rates, and how you will make the results reliable. (4 marks)",
    ["Question: how do heart rate and breathing rate change with activity level? Change the activity (rest, walking for one minute, step-ups for one minute). Control the person tested and the time between stopping and measuring. Measure heart rate by counting the wrist pulse for 15 seconds times 4, and breathing rate by counting breaths for 15 seconds times 4. Repeat each measurement and average, or repeat the whole experiment, to make results reliable."],
    "<b>Model answer:</b> Question: how do heart rate and breathing rate change as activity level rises? Manipulated variable: the activity level (sitting at rest, walking for 1 minute, running step-ups for 1 minute). Controlled variables: the same person throughout, the same activity time of 1 minute each, and the same delay before measuring. Measurements: heart rate from the wrist pulse counted for 15 seconds and multiplied by 4; breathing rate from breaths counted for 15 seconds and multiplied by 4. Reliability: take each resting measurement three times and average, and repeat the full set on another day to compare.<br><br><b>Marking points:</b> 1 mark for a clear question and the manipulated variable; 1 mark for two sensible controlled variables; 1 mark for a workable measurement method for both rates; 1 mark for a reliability step (repeats or averaging).", {}); }
]), ["Question, variables, method, reliability.", "Use the 15 second count from the core lab."]);

E("s8-u4-testable", 4, ["SC8.12.7"], 2, "var", varset([
  function () { return mcq("Which rephrasing turns the topic into a testable question about fitness and health?",
    "Does resting heart rate decrease after six weeks of daily running?",
    ["Is running, in general, a good activity for people of all ages to take part in?", "Why is exercise considered by everyone to be the best of all physical activities?", "Do the students in the school like running as an activity more than they like walking?"],
    "A testable question names something measurable (resting heart rate) and a change to test (six weeks of running). The others ask for opinions or general judgements that cannot be measured as stated.", {}); }
]), ["Look for something measurable.", "A variable you can count or time."]);

E("s8-u4-testable2", 4, ["SC8.12.7"], 1, "var", varset([
  function () { return mcq("Which question is already in testable form?",
    "How does breathing rate change when a student climbs stairs for one minute?",
    ["Is being fit and active important for teenagers in their everyday lives at school?", "What is the single best sport in the world for a person's health and fitness overall?", "Why do competitive athletes spend so many hours training for their sport each week?"],
    "The first question can be answered by measurement: breathing rate before and after a defined activity. The others call for opinions or explanations too broad to test directly.", {}); }
]), ["Measurable as written?", "Breathing rate can be counted."]);

E("s8-u4-hypothesis", 4, ["SC8.12.8"], 2, "var", varset([
  function () { return mcq("A student observes that classmates breathe faster after gym class. Which is a proper hypothesis based on that pattern?",
    "If activity level increases, then breathing rate increases, because the muscles need more oxygen",
    ["Taking regular exercise is a healthy thing for everyone to do, whatever their age", "Breathing is simply one part of the work done by the respiratory system of the body", "Students in the school enjoy their gym classes more than they enjoy their math classes"],
    "A hypothesis is a testable prediction linking the variables, ideally with a reason. The others are a general claim, a fact and an opinion, none of them a prediction to test.", {}); }
]), ["A prediction linking two variables.", "If... then... because..."]);

E("s8-u4-hypothesis-basis", 4, ["SC8.12.8"], 1, "var", varset([
  function () { return mcq("A hypothesis should be based on",
    "background information or an observed pattern",
    ["the result the student hopes to get", "a guess made with no information at all", "the conclusion of a different experiment"],
    "Hypotheses grow out of what is already known or noticed: background reading or a pattern in observations. Hoping for a result is not a basis.", {}); }
]), ["What comes before the hypothesis?", "Knowledge or a noticed pattern."]);

E("s8-u4-control", 4, ["SC8.12.9"], 2, "var", varset([
  function () { return mcq("During the activity experiment, one partner counts her pulse at her wrist while the other counts at his neck, and they compare results. What is wrong with this procedure?",
    "The measurement method is not controlled, so the two sets of results are not fairly comparable",
    ["Nothing is wrong with it: any pulse point on the body gives identical results in an experiment", "The pulse at the wrist cannot be felt at all by anyone while the exercise is being done", "Partners working together in the lab are simply not allowed to compare their data with each other"],
    "Controlling the major variables includes using the same measurement method for every trial and every person. Different pulse points and techniques introduce differences that are not caused by the activity.", {}); }
]), ["Fair tests keep methods identical.", "Same method for everyone."]);

E("s8-u4-control-error", 4, ["SC8.12.9"], 3, "var", varset([
  function () { return mcq("A group tests activity levels this way: Person A rests, Person B walks, Person C runs, and they compare the three heart rates to decide the effect of activity. Why can they not conclude anything about activity from these results?",
    "Different people have different resting rates, so the person is an uncontrolled variable tangled up with the activity level",
    ["Using only three people in total is far too few for any experiment of this kind to mean anything", "A person's heart rate cannot be measured at all in the minutes after they finish running", "The three activities should simply have been done by the group in the opposite order to theirs"],
    "The design confounds two variables: activity and person. A fitter person's running rate can be lower than an unfit person's resting rate, so the comparison says nothing reliable about activity. One person should do all three levels.", {}); }
]), ["Two things changed at once.", "Person and activity are tangled."]);

/* ---------- SC8.12.10 to SC8.12.12 Displaying and organizing data ---------- */

E("s8-u4-graph-choice", 4, ["SC8.12.10"], 2, "var", varset([
  function () { return mcq("A student records heart rate every 30 seconds for 5 minutes after exercise, to show how it recovers. Which display best fits this data?",
    "A line graph of heart rate against time",
    ["A bar graph of the five classmates' names", "A pie chart of the activity levels", "A table of contents"],
    "Recovery is a change over time, which a line graph shows as a trend. Bar graphs compare categories; the recovery data is a continuous change.", {}); }
]), ["Change over time: which graph type?", "Line graphs show trends."]);

E("s8-u4-rates-figure", 4, ["SC8.12.10"], 1, "var", varset([
  function () { var q = mcq("The bar graph shows resting heart rates for five animals. Which animal has the lowest resting heart rate?",
    "Whale", ["Cat", "Dog", "Mouse"],
    "The whale's bar is by far the shortest at 8 beats per minute. The mouse, the smallest animal, has the highest rate at 450.", {});
    q.figure = s8BarSVG(["Mouse", "Hamster", "Cat", "Dog", "Whale"], [450, 300, 120, 70, 8], "Resting heart rate (beats per minute)"); return q; }
]), ["Find the shortest bar.", "Read the value above it."]);

E("s8-u4-recovery-figure", 4, ["SC8.12.10", "SC8.12.6"], 3, "var", varset([
  function () { var q = mcq("The graph shows a student's heart rate during recovery after intense exercise. Her resting rate is about 72 beats per minute. After how many minutes does her heart rate first fall below 90 beats per minute?",
    "4 minutes", ["2 minutes", "3 minutes", "5 minutes"],
    "Reading the plotted points: 138, 120, 106 and 94 beats per minute at minutes 0 to 3 are all above 90; at minute 4 the rate is 84, the first reading below 90, as it settles back toward the resting rate of about 72.", {});
    q.figure = s8LineGraphSVG([0, 1, 2, 3, 4, 5], [138, 120, 106, 94, 84, 78], "Minutes since exercise stopped", "Heart rate (beats per minute)"); return q; }
]), ["Follow the points minute by minute.", "First point under 90."]);

E("s8-u4-variation-explain", 4, ["SC8.12.11"], 2, "var", varset([
  function () { return mcq("A class repeats the activity experiment on a second day. One student's resting heart rate is 76 on day one and 84 on day two. Which is a reasonable explanation for the variation?",
    "He had rushed up the stairs just before the day two measurement, so his rate had not settled to true rest",
    ["A person's resting heart rate never changes from day to day, so one of the two counts must have been fabricated", "The student's heart itself grew noticeably larger in the time between the two days of measuring", "The multiplication of the 15 second count by 4 works properly only on the first day of an experiment"],
    "Resting measurements vary with recent activity, stress, counting errors and time of day. A rate taken right after rushing upstairs is not a true resting rate, which is exactly why repeats and settling time matter.", {}); }
]), ["What differed between the two days?", "True rest must be settled."]);

E("s8-u4-animal-pattern", 4, ["SC8.12.11", "SC8.10.6"], 3, "var", varset([
  function () { var q = mcq("The bar graph shows resting heart rates for five animals. Which statement best explains the pattern?",
    "Smaller animals have much higher resting heart rates; their bodies must circulate blood and deliver oxygen at a faster rate for their size",
    ["Larger animals have higher resting heart rates than smaller animals do, because their much bigger bodies hold a great deal more blood", "The resting heart rate of an animal is completely unrelated to the size of the animal's body or to the kind of life it lives", "The whale's resting rate is the lowest of the five animals only because the whale lives its whole life in cold ocean water"],
    "Across the data the pattern is consistent: mouse 450, hamster 300, cat 120, dog 70, whale 8 beats per minute. The smaller the animal, the higher its resting heart rate, because its cells' needs must be met by a faster circulation relative to its size.", {});
    q.figure = s8BarSVG(["Mouse", "Hamster", "Cat", "Dog", "Whale"], [450, 300, 120, 70, 8], "Resting heart rate (beats per minute)"); return q; }
]), ["Order the animals by size, then by rate.", "The trend runs opposite to size."]);

E("s8-u4-organize", 4, ["SC8.12.12"], 1, "var", varset([
  function () { return mcq("Two partners each measure heart rate and breathing rate at three activity levels. Which format best organizes the data for comparison?",
    "A table with rows for each person and activity level, and columns for heart rate and breathing rate, including the averages",
    ["A paragraph of writing describing in words the busiest of the days on which the class did the activities", "A single long list of all of the numbers the two partners recorded, written down in the order they were measured", "A labelled drawing of the school gym, showing where the class carried out each of the activity measurements"],
    "A structured table keeps each measurement tied to its person, activity and rate type, and the averages column the lab requires. A loose list loses which number belongs to what.", {}); }
]), ["Comparison needs structure.", "Rows and columns with labels."]);

E("s8-u4-organize-avg", 4, ["SC8.12.12"], 2, "var", varset([
  function () { return mcq("A data table for the resting measurements has three trial columns and an average column. Why does the lab organize the data this way?",
    "Showing the trials and their average makes the data transparent and the resting value more trustworthy",
    ["The column for the average is there to hide away any trials that disagree with the rest of the data", "Three separate trials are required in the table simply so that the columns fill up the whole page", "Averages are calculated in the lab in order to change the results into the values the class wanted"],
    "Organizing trials beside their average lets anyone see the spread of the measurements and judge the resting value. Nothing is hidden: the trials stay on display.", {}); }
]), ["Transparency and trust.", "Trials visible, average beside them."]);

/* Design CR exclusion (shell v1.2.0): flagged entries are never dealt into a
   composed paper (unit tests and other compositions), while practice draws and
   explicit teacher picks keep them. The design-an-experiment item is practice
   and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U4 = {
  "s8-u4-cr-design-rates": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC8.10.1, SC8.10.4, SC8.10.5, and one 3-mark Level 2 CR entry
   closing Unit 4 Test 2's CR gap. SME-flagged. */

E("s8-u4-cell-theory-judge", 4, ["SC8.10.1"], 1, "var", varset([
  function () {
    return mcq("Which statement is one of the three main ideas of the cell theory?",
      "All living things are made of one or more cells",
      ["All cells are the same size and shape in every organism", "Cells can only be seen with the naked eye in large organisms", "New cells form by themselves out of non-living material"],
      "The cell theory states that all living things are made of cells, the cell is the basic unit of life, and all cells come from pre-existing cells. <b>All living things are made of one or more cells</b>.", {});
  },
  function () {
    return mcq("A scientist watches an amoeba divide into two amoebas under a microscope. Which idea of the cell theory does this directly show?",
      "All cells come from pre-existing cells",
      ["All living things are made of one or more cells", "The cell is the smallest unit that can carry on life", "Every cell contains a nucleus with genetic material"],
      "Division of an existing cell to make new cells is the third idea of the cell theory in action. <b>All cells come from pre-existing cells</b>.", {});
  },
  function () {
    return mcq("Which of these is a characteristic shared by ALL living things?",
      "They are made of cells and carry out the processes of life",
      ["They can move from place to place entirely under their own power whenever they need food or shelter", "They make their own food from sunlight and air", "They grow to at least a centimetre in size"],
      "Movement, photosynthesis and size are not universal; being cellular and carrying out life processes is. <b>They are made of cells and carry out the processes of life</b>.", {});
  },
  function () {
    return mcq("A virus can reproduce only inside a living cell and is not itself made of cells. Why do scientists generally not classify viruses as living?",
      "They are not made of cells, so they fail a basic requirement of living things",
      ["They are far too small to be seen, and anything that is truly living must be visible to the naked eye", "They do not contain any chemicals that living things contain", "They can survive outside a host, and living things cannot do that"],
      "Cell theory sets the standard: living things are cellular. Viruses are not made of cells and cannot carry on life processes alone. <b>They are not made of cells, so they fail a basic requirement of living things</b>.", {});
  },
  function () {
    return mcq("In the 1600s, some scientists believed maggots appeared by themselves in rotting meat. Which idea of the cell theory did later experiments support against this belief?",
      "Living cells (and organisms) come only from pre-existing living cells",
      ["All living things are made of exactly one cell each", "Cells are the largest unit of structure and function that exists anywhere inside a living organism", "Meat is made of cells that can turn into maggots"],
      "Experiments showed life comes from life: maggots came from eggs laid by flies, not from the meat itself. <b>Living cells (and organisms) come only from pre-existing living cells</b>.", {});
  }
]), ["Recall the three statements of cell theory before judging each option.", "Anything about cells appearing from non-living matter contradicts it."]);

E("s8-u4-levels-identify", 4, ["SC8.10.4"], 1, "var", varset([
  function () {
    return mcq("A single heart muscle fibre, on its own, is an example of which level of organization?",
      "A cell: it is a single living unit with its own structures",
      ["A tissue: it is made of many similar fibres all working together as one coordinated group in the heart", "An organ: several tissues combined into one structure", "A system: several organs working toward one function"],
      "Levels run cell, tissue, organ, system, organism. One fibre is one cell. <b>A cell: it is a single living unit with its own structures</b>.", {});
  },
  function () {
    return mcq("The layer of muscle in the wall of the stomach, made of many similar muscle cells working together, is an example of which level?",
      "A tissue: a group of similar cells carrying out one job together",
      ["An organ: it combines several different tissues into a structure", "A cell: it is made of cells, so it must be at the cell level", "A system: it works with other parts to digest food for the body"],
      "Similar cells working together form a tissue, one level above the cell. <b>A tissue: a group of similar cells carrying out one job together</b>.", {});
  },
  function () {
    return mcq("The stomach itself, made of muscle tissue, nerve tissue and lining tissue working together to churn and digest food, is which level?",
      "An organ: different tissues combined into one structure with a job",
      ["A tissue: it is mostly muscle, so it stays at the tissue level", "A system: it is the whole digestive process in a single part", "An organism: it can carry out digestion all on its own"],
      "An organ combines several tissues into one structure performing a function. <b>An organ: different tissues combined into one structure with a job</b>.", {});
  },
  function () {
    return mcq("The mouth, esophagus, stomach, liver and intestines working together to digest food form which level of organization?",
      "A system (the digestive system): several organs working toward one overall function",
      ["An organ: all of the separate parts touch each other somewhere inside the body cavity of the animal", "A tissue: all of the parts are involved in the same single process", "An organism: together they can survive apart from the rest of the body"],
      "Several organs cooperating on one function form a system. <b>A system (the digestive system): several organs working toward one overall function</b>.", {});
  },
  function () {
    return mcq("Which list puts the levels of organization in the correct order, from simplest to most complex?",
      "Cell, tissue, organ, system, organism",
      ["Tissue, cell, organ, organism, system", "Cell, organ, tissue, system, organism", "Organism, system, organ, tissue, cell"],
      "Each level is built from the one before it: cells make tissues, tissues make organs, organs make systems, systems make the organism. <b>Cell, tissue, organ, system, organism</b>.", {});
  }
]), ["Count the organization: one cell, similar cells together, several tissues, several organs.", "Cell, then tissue, then organ, then system, then organism."]);

E("s8-u4-needs-applied", 4, ["SC8.10.5"], 2, "var", varset([
  function () {
    return mcq("A potted plant is kept in a dark closet with plenty of water and air. After two weeks it is pale and weak. Which basic need is it missing?",
      "Energy from light: without it the plant cannot make food, no matter how much water it has",
      ["Water: a plant in a closet cannot absorb water through its roots at all", "Space to grow: a plant cannot grow at all unless its roots are free to spread widely through open soil", "Warmth: a closet is always too cold for any plant to stay alive in"],
      "Plants make their food by photosynthesis, which needs light; water and air alone are not enough. <b>Energy from light: without it the plant cannot make food, no matter how much water it has</b>.", {});
  },
  function () {
    return mcq("Fish in a sealed aquarium die even though the water is full of food flakes. The filter and air pump had stopped working. Which need went unmet?",
      "Oxygen (gas exchange): the fish used up the dissolved oxygen and none was replaced",
      ["Food: all of the flakes sank to the bottom, and aquarium fish cannot eat any food that rests on the bottom", "Light: fish need sunlight on their scales to stay alive in a tank", "Space: the fish grew too large for the aquarium in a few days"],
      "Fish take dissolved oxygen from the water; without the pump replacing it, the oxygen runs out. <b>Oxygen (gas exchange): the fish used up the dissolved oxygen and none was replaced</b>.", {});
  },
  function () {
    return mcq("A Venus flytrap grows in bog soil that is very poor in nitrogen, so it catches and digests insects. Which basic need does this behaviour supply?",
      "Nutrients: the insects provide nitrogen compounds its roots cannot get from the bog soil",
      ["Water: the insects carry water into the plant from the surface of the bog", "Energy: the insects it catches replace sunlight entirely as the plant's main source of energy for growing", "Waste removal: the insects carry the plant's wastes away from its leaves"],
      "The plant still photosynthesizes for energy; the insects supply the nutrients (especially nitrogen) the poor soil lacks. <b>Nutrients: the insects provide nitrogen compounds its roots cannot get from the bog soil</b>.", {});
  },
  function () {
    return mcq("During a winter drought, the grass on a field turns brown and stops growing, but its roots stay alive underground. Which need is in shortest supply?",
      "Water: without enough of it the grass cannot carry out its life processes or grow in its parts above ground",
      ["Sunlight: winter days are so short that no plant can photosynthesize at all", "Carbon dioxide: the winter air over the field contains none for the grass", "Soil: the roots have used up all of the soil in the field over the summer"],
      "The roots survive on stored food while water is scarce; growth stops because water is the missing need. <b>Water: without it the grass cannot carry out its life processes above ground</b>.", {});
  },
  function () {
    return mcq("A germinating seed is kept moist and warm but sealed in a jar with no air exchange. It sprouts, then dies. Which need explains the death?",
      "Gas exchange: the seedling used the oxygen in the jar for respiration and could not replace it",
      ["Light: a young seedling dies within a few hours if it does not receive direct bright sunlight on its leaves", "Gravity: a seedling in a sealed jar cannot tell which way to grow its roots", "Soil minerals: a seed contains no food store, so it starves without soil at once"],
      "Seeds respire using their food store and need oxygen; a sealed jar's oxygen runs out. <b>Gas exchange: the seedling used the oxygen in the jar for respiration and could not replace it</b>.", {});
  }
]), ["Test each need against the story: what ran out, or what built up?", "The need whose supply changed is the one that explains the result."]);

E("s8-u4-cr-needs-investigation", 4, ["SC8.10.5"], 2, "var", varset([
  function () {
    return textq("Investigating a cell's needs (3 marks)\nA student keeps two identical jars of pond water with the same number of a single-celled organism, paramecium. Jar A is left open on a sunny windowsill. Jar B is sealed with an airtight lid and kept in the same light. After three days, the paramecia in Jar B are mostly dead, while Jar A's are thriving. (a) Name the basic need that ran out in Jar B. (1) (b) Explain, at the level of the cell, why running out of that need kills the organisms. (1) (c) The student says Jar B proves the organisms also need light. Explain why the experiment does not show that. (1)",
      ["(a) Oxygen for respiration (gas exchange): the sealed lid stopped fresh air from reaching the water."],
      "Marking points (3): (a) 1 mark for oxygen/gas exchange. (b) 1 mark for the cell-level explanation: cells respire to release energy from food for their life processes; without oxygen the cells cannot release enough energy and die. (c) 1 mark for the design reasoning: both jars received the same light, so light was not the variable that differed; only the seal (air supply) differed. Model answer: Jar B ran out of oxygen, and without respiration the cells could not release energy, because <b>a cell's life processes stop when it cannot exchange gases</b>.", {});
  },
  function () {
    return textq("Investigating a cell's needs (3 marks)\nTwo trays of fast-growing duckweed (a small floating plant) are grown for a week. Tray A gets pond water changed daily. Tray B gets the same pond water, never changed, and a clear cover keeps evaporation equal. Tray B's plants yellow and stop multiplying, while Tray A's spread. (a) Name the basic need that ran short in Tray B. (1) (b) Explain why a plant cell needs that supply renewed. (1) (c) State one variable the student kept the same between the trays, and why keeping it the same matters. (1)",
      ["(a) Nutrients (mineral nutrients such as nitrates): the duckweed used up the nutrients dissolved in Tray B's unchanged water."],
      "Marking points (3): (a) 1 mark for nutrients/minerals. (b) 1 mark for the cell-level need: cells need nutrients as raw materials to build new cell parts and proteins when they grow and divide. (c) 1 mark for a controlled variable with a fairness reason (same light, same starting number of plants, same water source, evaporation matched). Model answer: Tray B's plants starved for nutrients, because <b>growing cells need a continuing supply of raw materials to build new cells</b>.", {});
  },
  function () {
    return textq("Investigating a cell's needs (3 marks)\nA student places equal numbers of yeast cells in two flasks of sugar solution. Flask A is left open with a loose cotton plug. Flask B is filled to the brim and sealed so no air space remains. Both are kept at the same warm temperature. After a day, Flask A is frothing with new yeast; Flask B shows little growth. (a) Name the basic need that limited Flask B. (1) (b) Explain what the yeast cells use that need for. (1) (c) Explain why keeping both flasks at the same temperature was necessary for a fair test. (1)",
      ["(a) Oxygen (gas exchange): the sealed, brim-full flask had only the oxygen dissolved at the start."],
      "Marking points (3): (a) 1 mark for oxygen. (b) 1 mark for respiration: yeast cells use oxygen to release energy from the sugar for growth and reproduction (accept: without oxygen they can ferment, but release far less energy, so growth is much slower). (c) 1 mark for fairness: temperature affects how fast cells grow, so if it differed, the result could be due to temperature instead of air supply. Model answer: Flask B was limited by oxygen, because <b>cells need gas exchange to release the energy their life processes require</b>.", {});
  }
]), ["Compare the setups pairwise: which single condition differs?", "The condition that matches the outcome difference is the one the experiment tests."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8-u4-cr-cell-compare closes Unit 4 Test
   1 (2 marks, Level 3). s8-u4-cr-levels-apply closes Unit 4 Test
   2 (4 marks, Level 3). s8-u4-cr-systems-response closes Unit 4 Test
   3 (4 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8-u4-cr-cell-compare", 4, ["SC8.10.2"], 3, "var", varset([
  function () {
    return textq("A student claims that a leaf cell and a cheek cell are 'the same because both are cells.' Evaluate the claim. (a) Name two structural differences between a leaf cell and a cheek cell. (1 mark) (b) For each difference, explain the job it does for the organism. (1 mark) (2 marks)",
      ["a leaf cell has a cell wall and chloroplasts, which a cheek cell lacks (a large central vacuole in the leaf cell is also correct)", "the wall supports and protects the plant cell and holds its shape, and the chloroplasts carry out photosynthesis to make food for the plant"],
      "<b>Model answer:</b> The claim is only partly right: both cells share a cell membrane, cytoplasm and a nucleus, but they are built differently for different jobs. First, a leaf cell has a rigid cell wall outside its membrane, which a cheek cell lacks; the wall supports and protects the cell and holds the plant in a regular shape. Second, a leaf cell has chloroplasts, which a cheek cell lacks; the chloroplasts carry out photosynthesis, making food for the whole plant. (A large central vacuole in the leaf cell, storing water and keeping the cell firm, is also a correct difference.)<br><br><b>Marking points:</b> 1 mark for two correct structural differences (cell wall, chloroplasts, or large central vacuole in the leaf cell and absent or small in the cheek cell; both differences needed). 1 mark for tying each difference to its job (wall for support, protection and shape; chloroplasts for photosynthesis and food making; vacuole for storage and firmness; both ties needed).", {});
  },
  function () {
    return textq("A student claims that a root cell and a muscle cell are 'the same because both are cells.' Evaluate the claim. (a) Name two structural differences between a root cell and a muscle cell. (1 mark) (b) For each difference, explain the job it does for the organism. (1 mark) (2 marks)",
      ["a root cell has a cell wall and a large vacuole, which a muscle cell lacks", "the wall supports and protects the root cell as the root pushes through soil, and the large vacuole stores water taken up from the soil and keeps the cell firm"],
      "<b>Model answer:</b> The claim is only partly right: both cells share a cell membrane, cytoplasm and a nucleus, but they are built differently for different jobs. First, a root cell has a rigid cell wall outside its membrane, which a muscle cell lacks; the wall supports and protects the cell as the root grows through the soil. Second, a root cell has a large vacuole, while a muscle cell has only small ones; the large vacuole stores water absorbed from the soil and keeps the cell firm. Note that the root cell has no chloroplasts even though it is a plant cell: it grows underground in the dark, so it cannot photosynthesize, which shows that not all plant cells make food.<br><br><b>Marking points:</b> 1 mark for two correct structural differences (cell wall, or large vacuole, in the root cell and absent or small in the muscle cell; both differences needed). 1 mark for tying each difference to its job (wall for support and protection in the soil; vacuole for water storage and firmness; both ties needed).", {});
  },
  function () {
    return textq("A student claims that an onion epidermal cell and a blood cell are 'the same because both are cells.' Evaluate the claim. (a) Name two structural differences between an onion epidermal cell and a blood cell. (1 mark) (b) For each difference, explain the job it does for the organism. (1 mark) (2 marks)",
      ["an onion epidermal cell has a cell wall and a large vacuole, which a blood cell lacks", "the wall holds the onion cells in a regular shape and protects the bulb layers, and the large vacuole stores water and food in the bulb"],
      "<b>Model answer:</b> The claim is only partly right: both cells share a cell membrane, cytoplasm and a nucleus, but they are built differently for different jobs. First, an onion epidermal cell has a rigid cell wall outside its membrane, which a blood cell lacks; the wall holds the onion cells in a regular, brick like shape and protects the layers of the bulb, while the blood cell, with no wall, stays flexible enough to move through narrow blood vessels. Second, the onion cell has a large vacuole, while a blood cell has no large vacuole; the vacuole stores the water and food that the bulb keeps for the growing plant. Note that the onion cell has no chloroplasts: the bulb grows underground, away from light, so these plant cells do not photosynthesize.<br><br><b>Marking points:</b> 1 mark for two correct structural differences (cell wall, or large vacuole, in the onion cell and absent in the blood cell; both differences needed). 1 mark for tying each difference to its job (wall for regular shape, support and protection; vacuole for storing water and food; both ties needed).", {});
  }
]), ["Use the guide's organelle set: the wall, chloroplasts and vacuole size are where plant and animal cells differ.", "A difference earns the second mark only when you say what job it does for the organism."]);

E("s8-u4-cr-levels-apply", 4, ["SC8.10.4", "SC8.10.5"], 3, "var", varset([
  function () {
    return textq("Five structures of a human are listed out of order: heart, cardiac tissue, circulatory system, a human, heart muscle cell. (a) Arrange the five structures in order from the cell level to the whole organism, naming the level each structure belongs to. (2 marks) (b) A heart muscle cell needs oxygen to keep working. Explain how this need is met through the cooperation of two levels above the cell level, naming each level and what it contributes. (2 marks) (4 marks)",
      ["heart muscle cell (cell), cardiac tissue (tissue), heart (organ), circulatory system (organ system), a human (organism)", "at the organ level the heart pumps oxygen rich blood into the vessels, and at the organ system level the circulatory system transports that oxygen to every cell, including the heart muscle cells"],
      "<b>Model answer:</b> (a) In order: heart muscle cell (cell level), cardiac tissue (tissue level), heart (organ level), circulatory system (organ system level), a human (organism level). (b) At the organ level, the heart acts as a pump, pushing oxygen rich blood out into the blood vessels with every beat. At the organ system level, the circulatory system, the heart and vessels working together, transports that oxygen through the body and delivers it to cells everywhere, including the heart muscle cells themselves, so the cell's need for oxygen is met by levels above it working together.<br><br><b>Marking points:</b> 1 mark for the five structures in the correct order from cell to organism. 1 mark for all five level names correctly matched to their structures. 1 mark for one level above the cell correctly named with its contribution (for example, the heart at the organ level pumping the blood). 1 mark for a second level above the cell correctly named with its contribution (for example, the circulatory system at the organ system level transporting the oxygen to the cell).", {});
  },
  function () {
    return textq("Five structures of a plant are listed out of order: shoot system, a plant, leaf, photosynthetic tissue, leaf cell. (a) Arrange the five structures in order from the cell level to the whole organism, naming the level each structure belongs to. (2 marks) (b) A leaf cell needs water to carry out photosynthesis. Explain how this need is met through the cooperation of two levels above the cell level, naming each level and what it contributes. (2 marks) (4 marks)",
      ["leaf cell (cell), photosynthetic tissue (tissue), leaf (organ), shoot system (organ system), a plant (organism)", "at the organ system level the shoot system transports water from the roots up through the stem to the leaves, and at the organ level the veins of the leaf deliver that water to the leaf cells"],
      "<b>Model answer:</b> (a) In order: leaf cell (cell level), photosynthetic tissue (tissue level), leaf (organ level), shoot system (organ system level), a plant (organism level). (b) At the organ system level, the shoot system transports water absorbed by the roots up through the stem and out to every leaf. At the organ level, the leaf's veins branch through the leaf and deliver that water to the photosynthetic tissue, where it reaches each leaf cell. Neither level meets the need alone: the system moves the water over distance, and the organ delivers it to the cells that use it.<br><br><b>Marking points:</b> 1 mark for the five structures in the correct order from cell to organism. 1 mark for all five level names correctly matched to their structures. 1 mark for one level above the cell correctly named with its contribution (for example, the shoot system at the organ system level transporting the water upward). 1 mark for a second level above the cell correctly named with its contribution (for example, the leaf at the organ level delivering the water through its veins to the cells).", {});
  },
  function () {
    return textq("Five structures of a human are listed out of order: brain, nervous system, nerve cell, a human, nervous tissue. (a) Arrange the five structures in order from the cell level to the whole organism, naming the level each structure belongs to. (2 marks) (b) A nerve cell in the brain needs oxygen to keep working. Explain how this need is met through the cooperation of two levels above the cell level, naming each level and what it contributes. (2 marks) (4 marks)",
      ["nerve cell (cell), nervous tissue (tissue), brain (organ), nervous system (organ system), a human (organism)", "at the organ level the heart pumps oxygen rich blood into the vessels, and at the organ system level the circulatory system transports that oxygen to the brain and delivers it to the nerve cells"],
      "<b>Model answer:</b> (a) In order: nerve cell (cell level), nervous tissue (tissue level), brain (organ level), nervous system (organ system level), a human (organism level). (b) At the organ level, the heart pumps oxygen rich blood out into the blood vessels with every beat. At the organ system level, the circulatory system, the heart and vessels working together, transports that oxygen around the body and delivers it to the brain, where it reaches the nerve cells. The nerve cell's need is met by an organ and a system above it cooperating, not by the cell itself.<br><br><b>Marking points:</b> 1 mark for the five structures in the correct order from cell to organism. 1 mark for all five level names correctly matched to their structures. 1 mark for one level above the cell correctly named with its contribution (for example, the heart at the organ level pumping the blood). 1 mark for a second level above the cell correctly named with its contribution (for example, the circulatory system at the organ system level transporting the oxygen to the brain cells).", {});
  },
  function () {
    return textq("Five structures of a plant are listed out of order: root system, root hair cell, a plant, root, root tissue. (a) Arrange the five structures in order from the cell level to the whole organism, naming the level each structure belongs to. (2 marks) (b) A root hair cell needs glucose (food) to keep working, but it cannot make food itself. Explain how this need is met through the cooperation of two levels above the cell level, naming each level and what it contributes. (2 marks) (4 marks)",
      ["root hair cell (cell), root tissue (tissue), root (organ), root system (organ system), a plant (organism)", "at the organ level the leaf makes glucose by photosynthesis, and at the organ system level the shoot system transports that food down through the stem to the roots and their cells"],
      "<b>Model answer:</b> (a) In order: root hair cell (cell level), root tissue (tissue level), root (organ level), root system (organ system level), a plant (organism level). (b) At the organ level, the leaf makes glucose by photosynthesis in its cells, food the root hair cell cannot make for itself underground. At the organ system level, the shoot system transports that food from the leaves down through the stem to the roots, where it reaches the root hair cells. The cell's need is met because an organ above it makes the food and a system above it delivers the food.<br><br><b>Marking points:</b> 1 mark for the five structures in the correct order from cell to organism. 1 mark for all five level names correctly matched to their structures. 1 mark for one level above the cell correctly named with its contribution (for example, the leaf at the organ level making the glucose). 1 mark for a second level above the cell correctly named with its contribution (for example, the shoot system at the organ system level transporting the food to the roots).", {});
  }
]), ["Build upward: similar cells make a tissue, tissues make an organ, organs work together in a system, and the systems make the organism.", "For part (b), pick two levels above the cell and give each level its own job in meeting the need."]);

E("s8-u4-cr-systems-response", 4, ["SC8.10.6", "SC8.10.7"], 2, "var", varset([
  function () {
    return textq("Right after lunch, a student runs up three flights of stairs to class. Explain the coordinated role of each of these three systems in the episode: the muscular system, the respiratory system and the circulatory system. (3 marks) Then state what would go wrong if the circulatory system failed to respond. (1 mark) (4 marks)",
      ["muscles contract to lift the body and need extra oxygen and glucose", "breathing becomes faster and deeper, taking in oxygen and removing carbon dioxide", "the heart beats faster and pumps blood carrying oxygen and glucose to the muscles", "if circulation failed to respond, the muscles would be starved of oxygen and glucose and would tire and fail"],
      "<b>Model answer:</b> The muscular system does the climbing: the leg muscles contract repeatedly to lift the body up each step, and hard working muscles need extra oxygen and glucose and produce extra carbon dioxide. The respiratory system responds by breathing faster and deeper, taking in more oxygen and removing the extra carbon dioxide. The circulatory system responds by beating faster and stronger, pumping blood that carries the oxygen and the glucose from the digested lunch to the working muscles and carries carbon dioxide back to the lungs. If the circulatory system failed to respond, the extra oxygen and glucose would never reach the muscles and wastes would build up, so the muscles would tire rapidly and the student could not keep climbing.<br><br><b>Marking points:</b> 1 mark for the muscular system's role (contracting to do the work, with its increased need stated). 1 mark for the respiratory system's role (faster, deeper breathing supplying oxygen and removing carbon dioxide). 1 mark for the circulatory system's role (faster pumping transporting oxygen and glucose to the muscles and wastes away). 1 mark for a correct failure consequence (the muscles are starved of oxygen and glucose, tire quickly, and the activity cannot continue).", {});
  },
  function () {
    return textq("A student touches a hot pan and pulls their hand away at once. Explain the coordinated role of each of these three systems in the episode: the nervous system, the muscular system and the circulatory system. (3 marks) Then state what would go wrong if the nervous system failed to respond. (1 mark) (4 marks)",
      ["the nervous system detects the heat and sends signals to the arm muscles", "the muscular system contracts to pull the hand away", "the circulatory system carries oxygen, nutrients and repair materials to the burned skin", "if the nervous system failed to respond, the hand would stay on the pan and the burn would become much worse"],
      "<b>Model answer:</b> The nervous system detects the heat through sense receptors in the skin and sends signals along nerves to the muscles of the arm, coordinating the withdrawal before the student has time to think about it. The muscular system carries out the response: the arm muscles contract and pull the hand off the pan, limiting the burn. The circulatory system then supports the repair: blood carries oxygen, nutrients and other materials the damaged skin cells need to the injured area and carries wastes away. If the nervous system failed to respond, no signal would reach the muscles, the hand would stay on the hot pan, and the burn would become far more severe.<br><br><b>Marking points:</b> 1 mark for the nervous system's role (detecting the heat and signalling the muscles). 1 mark for the muscular system's role (contracting to pull the hand away). 1 mark for the circulatory system's role (delivering oxygen, nutrients and repair materials to the damaged skin, and removing wastes). 1 mark for a correct failure consequence (no signal, no withdrawal, and a much worse burn).", {});
  },
  function () {
    return textq("A student plays a full soccer match on a hot day, running hard for most of the game and sweating heavily. Explain the coordinated role of each of these three systems in the episode: the muscular system, the respiratory system and the circulatory system. (3 marks) Then state what would go wrong if the circulatory system failed to respond. (1 mark) (4 marks)",
      ["muscles work hard for the whole match and need extra oxygen and glucose", "breathing becomes faster and deeper, taking in oxygen and removing carbon dioxide", "the heart pumps blood to the muscles and to the skin, where sweating and blood flow release heat", "if circulation failed to respond, heat and wastes would build up and the muscles would be starved, causing exhaustion and dangerous overheating"],
      "<b>Model answer:</b> The muscular system does the running, kicking and turning for the whole match, and hard working muscles need extra oxygen and glucose and release extra heat and carbon dioxide. The respiratory system responds by breathing faster and deeper, taking in more oxygen and removing the extra carbon dioxide. The circulatory system responds in two directions at once: the heart beats faster to carry oxygen and glucose to the muscles, and blood is also sent to the skin, where heat escapes and sweat evaporates to cool the body. If the circulatory system failed to respond, oxygen and glucose would not reach the muscles and heat could not be carried to the skin, so the student would overheat and collapse from exhaustion.<br><br><b>Marking points:</b> 1 mark for the muscular system's role (doing the sustained work, with its increased needs stated). 1 mark for the respiratory system's role (faster, deeper breathing supplying oxygen and removing carbon dioxide). 1 mark for the circulatory system's role (transporting oxygen and glucose to the muscles and carrying heat to the skin for cooling by sweating). 1 mark for a correct failure consequence (overheating and exhaustion because delivery and cooling both fail).", {});
  },
  function () {
    return textq("A student is recovering from a stomach illness. For two days they could keep almost nothing down, and now they are slowly eating and drinking again. Explain the coordinated role of each of these three systems in the recovery: the digestive system, the circulatory system and the nervous system. (3 marks) Then state what would go wrong if the digestive system failed to respond. (1 mark) (4 marks)",
      ["the digestive system breaks down food and absorbs water and nutrients again as the stomach settles", "the circulatory system carries the absorbed water and nutrients to all the body's cells and carries wastes away", "the nervous system senses the state of the stomach and coordinates the responses, including the vomiting that expelled harmful material and the return of appetite", "if the digestive system failed to respond, water and nutrients could not be replaced and dehydration and weakness would continue"],
      "<b>Model answer:</b> The digestive system leads the recovery: as the stomach settles it breaks down food again and absorbs the water and nutrients the body lost during the illness. The circulatory system distributes what is absorbed: blood carries the water and nutrients to every cell, restoring what the cells need, and carries wastes away to be removed. The nervous system coordinates the episode: it sensed the disturbance in the stomach, triggered vomiting during the illness to expel harmful material, and now restores appetite so the student eats and drinks again. If the digestive system failed to respond, the water and nutrients taken in could not be absorbed or replaced, so dehydration and weakness would continue even though the student was eating.<br><br><b>Marking points:</b> 1 mark for the digestive system's role (breaking down food and absorbing water and nutrients during recovery). 1 mark for the circulatory system's role (transporting the absorbed water and nutrients to the cells and removing wastes). 1 mark for the nervous system's role (sensing the stomach's state and coordinating responses such as vomiting and the return of appetite). 1 mark for a correct failure consequence (water and nutrients cannot be replaced, so dehydration and weakness continue).", {});
  }
]), ["Give each named system its own sentence and its own job; do not merge them.", "For the failure mark, follow the chain: if that system stops responding, what do the other systems lose?"]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s8-u1-cr-abiotic":3,"s8-u1-cr-coastal-climate":3,"s8-u1-cr-cycle-role":3,"s8-u1-cr-decision":4,"s8-u1-cr-design-salinity":4,"s8-u1-cr-distribution-shift":3,"s8-u1-cr-glacier":3,"s8-u1-cr-headland":3,"s8-u1-cr-indirect":3,"s8-u1-cr-pond-data":3,"s8-u1-cr-population":3,"s8-u1-cr-protect":3,"s8-u1-cr-range-shift":4,"s8-u1-cr-results-summary":3,"s8-u1-cr-tech-effects":3,"s8-u1-cr-tides":3,"s8-u1-cr-watershed":4,"s8-u2-cr-balloon":2,"s8-u2-cr-car-lift":3,"s8-u2-cr-cleaning-claim":4,"s8-u2-cr-data-infer":3,"s8-u2-cr-density-block":3,"s8-u2-cr-design-viscosity":4,"s8-u2-cr-displacement-calc":3,"s8-u2-cr-layers":3,"s8-u2-cr-mass-weight":3,"s8-u2-cr-molasses":3,"s8-u2-cr-piggyback":3,"s8-u2-cr-pressure-crate":3,"s8-u2-cr-raise-ship":3,"s8-u2-cr-temp-situations":3,"s8-u2-cr-underlying":3,"s8-u2-cr-viscosity-design":4,"s8-u2-cr-viscosity-test":3,"s8-u3-cr-conclusion":3,"s8-u3-cr-design-refraction":4,"s8-u3-cr-diffuse":3,"s8-u3-cr-em":3,"s8-u3-cr-em-uses":4,"s8-u3-cr-estimate":3,"s8-u3-cr-fibre":4,"s8-u3-cr-identify-medium":3,"s8-u3-cr-mirror-image":4,"s8-u3-cr-mirror-lab":3,"s8-u3-cr-predict":3,"s8-u3-cr-properties":3,"s8-u3-cr-reflection":3,"s8-u3-cr-refraction":3,"s8-u3-cr-refraction-bowl":4,"s8-u3-cr-refraction-explain":3,"s8-u3-cr-research":3,"s8-u3-cr-speed":3,"s8-u3-cr-words":3,"s8-u4-cr-artificial":4,"s8-u4-cr-cell-compare":2,"s8-u4-cr-cell-division":3,"s8-u4-cr-community":3,"s8-u4-cr-decision":3,"s8-u4-cr-decision-personal":3,"s8-u4-cr-design-rates":4,"s8-u4-cr-factors":3,"s8-u4-cr-interdependence":3,"s8-u4-cr-levels":3,"s8-u4-cr-levels-apply":4,"s8-u4-cr-living":3,"s8-u4-cr-microscope":3,"s8-u4-cr-model-eval":3,"s8-u4-cr-needs-investigation":3,"s8-u4-cr-organelles":3,"s8-u4-cr-propose":3,"s8-u4-cr-systems-response":4};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={};
