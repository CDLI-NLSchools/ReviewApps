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
