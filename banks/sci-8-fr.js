/* Sciences 8 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-8-fr/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Sciences 8 (français) : générateurs de figures partagés, adaptés des
   générateurs anglais de sci-8 avec le préfixe s8f, Nov 16, 2026.
   Tout le texte dans les figures est en français. Toutes les figures
   sont en SVG en ligne, générées à partir des valeurs propres à chaque
   question lorsque la famille est fondée sur des données, et dessinées
   une fois comme constantes lorsqu'il s'agit d'une illustration (profil
   d'un bassin océanique, formes de relief du rivage, parties d'une
   vague). Aucune figure n'étiquette sa propre réponse : les appels sont
   des lettres seulement, et l'élément visé est toujours l'un de
   plusieurs éléments plausibles. */

function s8fEsc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* W1 : profil d'un bassin océanique, dessiné une fois. La coupe va d'un
   rivage au plateau continental et au talus, puis à la plaine abyssale
   et à une dorsale médio-océanique. Appels par lettres : A sur le
   plateau, B sur le talus, C sur la plaine abyssale, D sur la dorsale.
   La figure ne nomme rien; les questions demandent quelle lettre
   marque l'élément nommé. */
var S8F_PROFILE_SVG = "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
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
var S8F_LANDFORM_SVG = "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
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
var S8F_WAVE_SVG = "<svg viewBox=\"0 0 640 240\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
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
function s8fPopGraphSVG(years, counts, species) {
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
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">Année</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8fEsc(species) + "</text>";
  s += "</svg>";
  return s;
}

/* W5: water health bar display, generated from the item's own sample
   values. samples: [{name, value}] for one measure; unit: axis unit;
   healthy: the guide's healthy-range note drawn as a dashed line at
   the threshold value (the threshold is guide content stated in the
   item text as well; the figure shows data, not a verdict). */
function s8fHealthSVG(samples, measure, unit, threshold) {
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
    s += "<text x=\"" + (x + bw / 2).toFixed(1) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + s8fEsc(sm.name) + "</text>";
  });
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8fEsc(measure) + " (" + s8fEsc(unit) + ")</text>";
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
function s8fDensityTableFigure() {
  var fluids = [["Alcool éthylique", "0,79"], ["Huile à machine", "0,90"], ["Eau", "1,00"], ["Eau de mer", "1,03"], ["Glycérol", "1,26"], ["Mercure", "13,55"]];
  var solids = [["Liège", "0,24"], ["Chêne", "0,70"], ["Sucre", "1,59"], ["Sel", "2,16"], ["Aluminium", "2,70"], ["Fer", "7,87"], ["Plomb", "11,34"], ["Or", "19,32"]];
  function rows(list) {
    return list.map(function (r) { return "<tr><td style=\"padding:2px 10px\">" + r[0] + "</td><td style=\"padding:2px 10px;text-align:right\">" + r[1] + "</td></tr>"; }).join("");
  }
  var h = "<div style=\"border:1px solid #999;border-radius:6px;padding:10px 14px;background:#fdfdf5;max-width:560px;color:#1a1a1a\">";
  h += "<b>Masses volumiques approximatives de substances courantes</b>";
  h += "<table style=\"border-collapse:collapse;margin-top:6px\"><tr><th style=\"padding:2px 10px;text-align:left\">Fluide</th><th style=\"padding:2px 10px\">Masse volumique (g/mL)</th><th style=\"padding:2px 10px;text-align:left\">Solide</th><th style=\"padding:2px 10px\">Masse volumique (g/cm3)</th></tr>";
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
function s8fForceSVG(kind) {
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
function s8fLineGraphSVG(xs, ys, xLabel, yLabel) {
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
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">" + s8fEsc(xLabel) + "</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s8fEsc(yLabel) + "</text>";
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

function s8fReflectSVG(angleDeg, callouts) {
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

function s8fPlaneMirrorSVG() {
  var W = 400, H = 250, mx = 240, axis = 195;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  for (var h = 0; h < 7; h++) s += "<line x1=\"" + (mx + 4) + "\" y1=\"" + (35 + h * 28) + "\" x2=\"" + (mx + 16) + "\" y2=\"" + (25 + h * 28) + "\" stroke=\"#999\"/>";
  s += "<line x1=\"" + mx + "\" y1=\"25\" x2=\"" + mx + "\" y2=\"215\" stroke=\"#444\" stroke-width=\"3\"/>";
  s += "<line x1=\"150\" y1=\"" + axis + "\" x2=\"150\" y2=\"95\" stroke=\"#2471a3\" stroke-width=\"3\"/>";
  s += "<polygon points=\"150,84 143,99 157,99\" fill=\"#2471a3\"/>";
  s += "<line x1=\"330\" y1=\"" + axis + "\" x2=\"330\" y2=\"95\" stroke=\"#888\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/>";
  s += "<polygon points=\"330,84 323,99 337,99\" fill=\"#888\"/>";
  s += "<line x1=\"150\" y1=\"228\" x2=\"" + mx + "\" y2=\"228\" stroke=\"#666\"/><line x1=\"" + mx + "\" y1=\"228\" x2=\"330\" y2=\"228\" stroke=\"#666\"/>";
  s += "<text x=\"138\" y=\"245\">objet</text><text x=\"312\" y=\"245\">image</text>";
  s += "</svg>";
  return s;
}

/* Concave mirror: vertex at x=300, centre of curvature at x=410,
   focal point at x=355, radius 110, axis y=150. pos: "beyond"
   (object beyond C), "between" (between F and C), "inside"
   (between F and the mirror). */
function s8fConcaveSVG(pos) {
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
  s += "<text x=\"" + (ox - 10) + "\" y=\"" + (axis + 18) + "\">objet</text>";
  s += "<text x=\"" + (imageX - 10) + "\" y=\"" + (axis + 18) + "\">image</text>";
  s += "</svg>";
  return s;
}

function s8fConvexSVG() {
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
  s += "<text x=\"" + (ox - 10) + "\" y=\"" + (axis + 18) + "\">objet</text>";
  s += "<text x=\"" + (imageX - 10) + "\" y=\"" + (axis + 18) + "\">image</text>";
  s += "</svg>";
  return s;
}

/* Refraction at a boundary. mode: "toward" (air into water, bends
   toward the normal), "away" (water into air, bends away),
   "straight" (along the normal, no bend). ghost draws the dashed
   unbent continuation for comparison items. */
function s8fRefractSVG(mode, ghost) {
  var W = 400, H = 270, by = 135, nx = 200;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<rect x=\"0\" y=\"" + by + "\" width=\"" + W + "\" height=\"" + (H - by) + "\" fill=\"#dceef7\"/>";
  s += "<line x1=\"0\" y1=\"" + by + "\" x2=\"" + W + "\" y2=\"" + by + "\" stroke=\"#5b8db8\" stroke-width=\"2\"/>";
  s += "<line x1=\"" + nx + "\" y1=\"15\" x2=\"" + nx + "\" y2=\"" + (H - 15) + "\" stroke=\"#888\" stroke-dasharray=\"6 4\"/>";
  s += "<text x=\"14\" y=\"30\">air (moins dense)</text><text x=\"14\" y=\"" + (H - 14) + "\">eau (plus dense)</text>";
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

function s8fLensSVG(kind) {
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

function s8fEMSpectrumSVG() {
  var types = ["Ondes radio", "Micro-ondes", "Infrarouge", "Lumière visible", "Ultraviolet", "Rayons X", "Rayons gamma"];
  var W = 580, seg = (W - 40) / 7;
  var s = "<svg viewBox=\"0 0 " + W + " 130\" width=\"100%\" style=\"max-width:580px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11.5\">";
  var cols = ["#8e6cc8", "#6c8ec8", "#c86c6c", "#57a05a", "#c8a44a", "#5a7fa0", "#8a4a6b"];
  types.forEach(function (t, i) {
    s += "<rect x=\"" + (20 + i * seg) + "\" y=\"34\" width=\"" + (seg - 3) + "\" height=\"30\" fill=\"" + cols[i] + "\" opacity=\"0.75\"/>";
    s += "<text x=\"" + (20 + i * seg + seg / 2 - 1) + "\" y=\"" + (i % 2 === 0 ? 24 : 88) + "\" text-anchor=\"middle\">" + t + "</text>";
  });
  s += "<line x1=\"20\" y1=\"106\" x2=\"" + (W - 20) + "\" y2=\"106\" stroke=\"#666\" stroke-width=\"1.6\"/>";
  s += "<polygon points=\"" + (W - 20) + ",106 " + (W - 32) + ",101 " + (W - 32) + ",111\" fill=\"#666\"/>";
  s += "<text x=\"" + (W / 2) + "\" y=\"124\" text-anchor=\"middle\">la longueur d'onde diminue dans ce sens</text>";
  s += "</svg>";
  return s;
}

// ---- Cells C1: plant and animal cell diagrams (guide organelle set; wall outside membrane) ----
function s8fCellSVG(kind){
  var plant = kind === "plant";
  var s = '<svg viewBox="0 0 640 340" width="100%" role="img" aria-label="Schéma d’une cellule" style="max-width:640px;background:#fbfdff;border:1px solid #b9c8d4;border-radius:8px">';
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
function s8fMicroscopeSVG(){
  var s = '<svg viewBox="0 0 640 360" width="100%" role="img" aria-label="Schéma d’un microscope composé" style="max-width:640px;background:#fbfdff;border:1px solid #b9c8d4;border-radius:8px">';
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
function s8fBarSVG(labels, values, yLabel){
  var max = Math.max.apply(null, values) * 1.15, base = 285, top = 45, plotH = base - top;
  var s = '<svg viewBox="0 0 640 340" width="100%" role="img" aria-label="Diagramme à bandes" style="max-width:640px;background:#fff;border:1px solid #b9c8d4;border-radius:8px">';
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
// CRMARKS: s8f-u1-cr-distribution-deplacement=3
// CRMARKS: s8f-u1-cr-cycle-role=3
// CRMARKS: s8f-u1-cr-glacier=3
// CRMARKS: s8f-u1-cr-abiotic=3
// CRMARKS: s8f-u1-cr-coastal-climate=3
// CRMARKS: s8f-u1-cr-tides=3
// CRMARKS: s8f-u1-cr-headland=3
// CRMARKS: s8f-u1-cr-indirect=3
// CRMARKS: s8f-u1-cr-protect=3
// CRMARKS: s8f-u1-cr-tech-effects=3
// CRMARKS: s8f-u1-cr-decision=4
// CRMARKS: s8f-u1-cr-design-salinity=4
// CRMARKS: s8f-u1-cr-results-summary=3
// CRMARKS: s8f-u1-cr-pond-data=3
// CRMARKS: s8f-u1-cr-population=3
// CRMARKS: s8f-u1-cr-bassin-versant=4
// CRMARKS: s8f-u1-cr-deplacement-aire=4
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s8f-u1-cycle-process=2
// CRMARKS: s8f-u1-distribution=2
// CRMARKS: s8f-u1-fresh-sources=2
// CRMARKS: s8f-u1-ice-age=2
// CRMARKS: s8f-u1-glacier-retreat=3
// CRMARKS: s8f-u1-fresh-env=2
// CRMARKS: s8f-u1-species-category=2
// CRMARKS: s8f-u1-zones=2
// CRMARKS: s8f-u1-productivity=3
// CRMARKS: s8f-u1-upwelling=2
// CRMARKS: s8f-u1-abiotic=2
// CRMARKS: s8f-u1-temp-oxygen=3
// CRMARKS: s8f-u1-profile-figure=2
// CRMARKS: s8f-u1-basin-process=3
// CRMARKS: s8f-u1-glaciation-role=3
// CRMARKS: s8f-u1-profile-order=2
// CRMARKS: s8f-u1-fog=3
// CRMARKS: s8f-u1-nino-nina=2
// CRMARKS: s8f-u1-iceberg=4
// CRMARKS: s8f-u1-wave-energy=2
// CRMARKS: s8f-u1-tides=2
// CRMARKS: s8f-u1-tidal-range=2
// CRMARKS: s8f-u1-wave-size=4
// CRMARKS: s8f-u1-headland-energy=3
// CRMARKS: s8f-u1-rock-resistance=2
// CRMARKS: s8f-u1-landform-figure=2
// CRMARKS: s8f-u1-landform-formation=3
// CRMARKS: s8f-u1-erosion-deposition=2
// CRMARKS: s8f-u1-climate-current-effect=3
// CRMARKS: s8f-u1-climate-claim-judge=4
// CRMARKS: s8f-u1-institutions=2
// CRMARKS: s8f-u1-tech=2
// CRMARKS: s8f-u1-sonar=2
// CRMARKS: s8f-u1-tech-change=3
// CRMARKS: s8f-u1-tech-improve=2
// CRMARKS: s8f-u1-protection=2
// CRMARKS: s8f-u1-protection-choice=3
// CRMARKS: s8f-u1-invasive=3
// CRMARKS: s8f-u1-aquaculture=3
// CRMARKS: s8f-u1-sustain-aspects=2
// CRMARKS: s8f-u1-lab-procedure=2
// CRMARKS: s8f-u1-lab-extension=3
// CRMARKS: s8f-u1-health-figure=2
// CRMARKS: s8f-u1-abiotic-identify=2
// CRMARKS: s8f-u1-abiotic-measure-choice=3
// CRMARKS: s8f-u1-method-choice=3
// CRMARKS: s8f-u1-threshold-judge=3
// CRMARKS: s8f-u1-process-evaluate=4
// CRMARKS: s8f-u1-pop-interpolate=2
// CRMARKS: s8f-u1-pop-extrapolate=2
// CRMARKS: s8f-u1-temp-population=4
// CRMARKS: s8f-u1-tech-strength=3
// CRMARKS: s8f-u1-research-landform=2
// CRMARKS: s8f-u1-research-judge=4
// CRMARKS: s8f-u1-climat-effets-glaciers=3
// CRMARKS: s8f-u1-formation-glaciers=2
// CRMARKS: s8f-u1-distribution-abiotique=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s8f-u1-cycle-process=a
// BIMODAL: s8f-u1-distribution=a
// BIMODAL: s8f-u1-fresh-sources=a
// BIMODAL: s8f-u1-ice-age=b
// BIMODAL: s8f-u1-glacier-retreat=b
// BIMODAL: s8f-u1-fresh-env=a
// BIMODAL: s8f-u1-species-category=b
// BIMODAL: s8f-u1-zones=a
// BIMODAL: s8f-u1-productivity=b
// BIMODAL: s8f-u1-upwelling=b
// BIMODAL: s8f-u1-abiotic=a
// BIMODAL: s8f-u1-temp-oxygen=b
// BIMODAL: s8f-u1-profile-figure=a
// BIMODAL: s8f-u1-basin-process=b
// BIMODAL: s8f-u1-glaciation-role=b
// BIMODAL: s8f-u1-profile-order=b
// BIMODAL: s8f-u1-fog=b
// BIMODAL: s8f-u1-nino-nina=a
// BIMODAL: s8f-u1-iceberg=b
// BIMODAL: s8f-u1-wave-energy=a
// BIMODAL: s8f-u1-tides=a
// BIMODAL: s8f-u1-tidal-range=a
// BIMODAL: s8f-u1-wave-size=b
// BIMODAL: s8f-u1-headland-energy=b
// BIMODAL: s8f-u1-rock-resistance=b
// BIMODAL: s8f-u1-landform-figure=a
// BIMODAL: s8f-u1-landform-formation=b
// BIMODAL: s8f-u1-erosion-deposition=a
// BIMODAL: s8f-u1-climate-current-effect=b
// BIMODAL: s8f-u1-climate-claim-judge=b
// BIMODAL: s8f-u1-institutions=a
// BIMODAL: s8f-u1-tech=a
// BIMODAL: s8f-u1-sonar=b
// BIMODAL: s8f-u1-tech-change=b
// BIMODAL: s8f-u1-tech-improve=b
// BIMODAL: s8f-u1-protection=a
// BIMODAL: s8f-u1-protection-choice=b
// BIMODAL: s8f-u1-invasive=b
// BIMODAL: s8f-u1-aquaculture=b
// BIMODAL: s8f-u1-sustain-aspects=b
// BIMODAL: s8f-u1-lab-procedure=b
// BIMODAL: s8f-u1-lab-extension=b
// BIMODAL: s8f-u1-health-figure=a
// BIMODAL: s8f-u1-abiotic-identify=a
// BIMODAL: s8f-u1-abiotic-measure-choice=b
// BIMODAL: s8f-u1-method-choice=b
// BIMODAL: s8f-u1-threshold-judge=b
// BIMODAL: s8f-u1-process-evaluate=b
// BIMODAL: s8f-u1-pop-interpolate=a
// BIMODAL: s8f-u1-pop-extrapolate=a
// BIMODAL: s8f-u1-temp-population=b
// BIMODAL: s8f-u1-tech-strength=b
// BIMODAL: s8f-u1-research-landform=b
// BIMODAL: s8f-u1-research-judge=b
// BIMODAL: s8f-u1-climat-effets-glaciers=b
// BIMODAL: s8f-u1-formation-glaciers=b
// BIMODAL: s8f-u1-distribution-abiotique=a
// Sciences 8, Unité 1 : Les réseaux hydrographiques sur la Terre
// (SC8.1.1 à SC8.3.11), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Honnêteté de couverture : SC8.1.10 reprend l'objet de SC8.1.6 (les
// interactions entre les courants océaniques, les vents et les climats
// régionaux) avec des scénarios distincts, et SC8.3.11 reprend l'objet
// de SC8.1.9 (la recherche sur l'érosion et la formation de dépôts)
// avec des scénarios distincts. SC8.3.6 porte l'identification des
// facteurs abiotiques en contexte d'habiletés, et SC8.3.7 porte le
// choix des méthodes et des outils.
// Discipline du contenu : l'eau de mer et l'eau douce sont comparées
// de façon qualitative (salinité, masse volumique, point de
// congélation); aucune question n'exige une valeur de salinité ou de
// masse volumique mémorisée. Les technologies de recherche sont
// évaluées selon leur utilité seulement.
// Résidu CORE : les questions de SC8.3.1 évaluent les étapes de la
// procédure, l'extension à l'estuaire et la conception d'une
// recherche; elles n'évaluent pas la réalisation du laboratoire au
// comptoir. SC8.3.2 porte une seule question sur la pratique sûre; la
// manipulation sûre elle-même relève de l'évaluation en classe. Les
// questions de SC8.3.5 évaluent le jugement et l'énoncé de
// conclusions à partir de résultats décrits, et non la conclusion
// tirée en direct au laboratoire.

/* ---------- SC8.1.1 Le cycle de l'eau et l'eau de la Terre ---------- */

E("s8f-u1-cycle-process", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { d: "le Soleil chauffe un lac et de la vapeur d'eau s'élève de sa surface", k: "Évaporation", w: ["Condensation", "Précipitation", "Ruissellement"] },
    { d: "la vapeur d'eau haut dans l'air se refroidit et se transforme en minuscules gouttelettes liquides qui forment un nuage", k: "Condensation", w: ["Évaporation", "Précipitation", "Ruissellement"] },
    { d: "la pluie tombe d'un nuage sur le flanc d'une colline", k: "Précipitation", w: ["Condensation", "Évaporation", "Ruissellement"] },
    { d: "l'eau de pluie s'écoule sur la surface du sol jusqu'à un ruisseau voisin", k: "Ruissellement", w: ["Condensation", "Évaporation", "Précipitation"] },
    { d: "la neige entassée sur une montagne se compacte lentement en une masse de glace", k: "Formation d'un glacier", w: ["Condensation", "Évaporation", "Précipitation"] }
  ];
  var c = pick(cases);
  return mcq("Dans le cycle de l'eau, quel processus est décrit ici : " + c.d + "?",
    c.k, c.w,
    "Le cycle de l'eau déplace l'eau entre les océans, les terres et l'atmosphère. L'évaporation transforme l'eau liquide en vapeur, la condensation transforme la vapeur en gouttelettes liquides, les précipitations ramènent l'eau à la surface, et le ruissellement transporte l'eau de surface vers les ruisseaux, les lacs et l'océan. La neige compactée qui devient de la glace forme un glacier, l'un des réservoirs d'eau douce de la Terre.",
    {});
}, ["Nomme d'abord ce que l'eau est en train de faire, puis associe-le au mot du processus.", "Demande-toi si l'eau s'élève en vapeur, forme des gouttelettes, tombe ou s'écoule sur le sol."]);

E("s8f-u1-distribution", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "Environ quelle proportion de toute l'eau de la Terre est de l'eau salée dans les océans?", k: "Environ 97 pour cent", w: ["Environ 1 pour cent", "Environ 50 pour cent", "Environ 75 pour cent"] },
    { q: "Environ quelle proportion de l'eau de la Terre est gelée dans les calottes glaciaires et les glaciers?", k: "Environ 2 pour cent", w: ["Environ 1 pour cent", "Environ 25 pour cent", "Environ 97 pour cent"] },
    { q: "Environ quelle proportion de l'eau de la Terre est de l'eau douce disponible dans les lacs, les rivières et les eaux souterraines?", k: "Environ 1 pour cent", w: ["Environ 2 pour cent", "Environ 25 pour cent", "Environ 97 pour cent"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "L'eau de la Terre est répartie de façon très inégale : environ 97 pour cent est de l'eau salée dans les océans, environ 2 pour cent est gelée dans les calottes glaciaires et les glaciers, et seulement environ 1 pour cent est de l'eau douce disponible dans les lacs, les rivières et les eaux souterraines. C'est cette petite part disponible qui rend les sources d'eau douce si importantes.",
    {});
}, ["Les trois proportions sont 97, 2 et 1 pour cent. Associe la description à sa proportion.", "Presque toute l'eau de la Terre est de l'eau d'océan."]);

E("s8f-u1-fresh-sources", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "Une ville puise son eau potable dans des puits forés profondément dans le sol. Quelle source d'eau douce la ville utilise-t-elle?", k: "Les eaux souterraines", w: ["Un bassin versant", "Un glacier de montagne", "Le ruissellement de surface"] },
    { q: "L'approvisionnement en eau d'une communauté provient d'une énorme masse de glace qui se déplace lentement. Quelle est cette source d'eau douce?", k: "Un glacier de montagne", w: ["Un bassin versant", "Les eaux souterraines", "Le ruissellement de surface"] },
    { q: "Toute la pluie qui tombe sur une vallée finit par s'écouler dans une seule grande rivière. Comment appelle-t-on toute la superficie de terre qui se draine ainsi?", k: "Un bassin versant", w: ["Un glacier de montagne", "Les eaux souterraines", "Un estuaire de rivière"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "On nomme trois sources d'eau douce : les bassins versants (la superficie de terre qui se draine dans une rivière commune), les eaux souterraines (l'eau emmagasinée sous terre) et les glaciers (l'eau emmagasinée sous forme de glace). Chaque cas ici décrit l'une des trois.",
    {});
}, ["On nomme trois sources d'eau douce. Décide laquelle chaque cas décrit.", "Les puits puisent les eaux souterraines; les masses de glace sont des glaciers; la terre qui se draine vers une rivière forme un bassin versant."]);

E("s8f-u1-ocean-vs-fresh", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé compare correctement l'eau de mer à l'eau douce?",
      "L'eau de mer a une salinité plus élevée et une masse volumique plus grande, et elle gèle à une température plus basse que l'eau douce",
      ["L'eau de mer a une salinité plus élevée et une masse volumique plus faible, et elle gèle à une température plus basse que l'eau douce",
       "L'eau de mer a une salinité plus faible et une masse volumique plus grande, et elle gèle à une température plus haute que l'eau douce",
       "L'eau de mer a une salinité plus faible et une masse volumique plus faible, et elle gèle à la même température que l'eau douce"],
      "Les sels dissous rendent l'eau de mer différente de l'eau douce de trois façons liées : sa salinité est plus élevée, la matière dissoute la rend plus dense, et le sel abaisse son point de congélation, si bien que l'eau de mer doit devenir plus froide que 0 degré Celsius avant de geler. Les comparaisons sont qualitatives.",
      {});
  },
  function () {
    return mcq("Une hydrologue et un océanographe comparent leurs notes. Quel énoncé accepteraient-ils tous les deux?",
      "L'eau de mer est plus dense que l'eau douce à cause des sels qui y sont dissous",
      ["L'eau douce est plus dense que l'eau de mer parce qu'elle est plus froide",
       "L'eau de mer et l'eau douce ont la même masse volumique parce que ce sont surtout de l'eau",
       "L'eau douce gèle à une température plus basse que l'eau de mer"],
      "Les sels dissous dans l'eau de mer ajoutent de la masse sans ajouter beaucoup de volume, donc l'eau de mer est plus dense que l'eau douce. L'eau douce gèle à 0 degré Celsius; le sel dissous abaisse le point de congélation de l'eau de mer sous cette valeur.",
      {});
  }
]), ["Pense à ce que le sel dissous fait à l'eau : il y ajoute de la matière dissoute.", "Le sel augmente la masse volumique et abaisse le point de congélation."]);

E("s8f-u1-cr-cycle-role", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return textq("Les océans contiennent environ 97 pour cent de l'eau de la Terre, et pourtant le cycle de l'eau continue d'approvisionner les lacs, les rivières et les eaux souterraines en eau douce. Explique comment le cycle de l'eau y parvient. (3 points)",
      ["l'évaporation laisse le sel derrière elle", "condensation", "précipitations", "ruissellement et eaux souterraines"],
      "<b>Réponse modèle :</b> L'énergie du Soleil fait évaporer l'eau de la surface de l'océan, et les sels dissous restent derrière, donc la vapeur est douce. La vapeur se refroidit et se condense en nuages, puis tombe en précipitations. La pluie et la neige qui tombent sur les terres s'accumulent dans les lacs et les rivières, s'infiltrent pour devenir des eaux souterraines ou reviennent par ruissellement, si bien que le cycle livre continuellement de l'eau douce aux terres même si presque toute l'eau de la Terre est de l'eau d'océan salée.<br><br><b>Points d'attribution :</b> 1 point pour l'évaporation qui laisse les sels derrière dans l'océan. 1 point pour la condensation et les précipitations qui ramènent l'eau. 1 point pour l'eau qui s'accumule en eau de surface ou en eau souterraine (ou qui revient par ruissellement).",
      {});
  }
]), ["Commence à la surface de l'océan et suis l'eau jusqu'à un lac.", "L'étape clé est ce qui arrive au sel pendant l'évaporation."]);

/* ---------- SC8.1.2 Les changements climatiques et les glaciers ---------- */

E("s8f-u1-ice-age", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce qu'une période glaciaire?",
      "Une longue période de refroidissement global pendant laquelle les glaciers avancent et couvrent de grandes superficies de terre",
      ["Une seule saison d'hiver très froide dans une petite région, avec beaucoup de neige et des lacs gelés",
       "Une période pendant laquelle l'eau de l'océan gèle complètement sur toute la surface de l'océan",
       "Une courte période de réchauffement pendant laquelle un glacier recule d'une petite distance à partir de son front"],
      "Une période glaciaire est une longue période de refroidissement global, qui dure bien au-delà d'une seule saison, pendant laquelle les glaciers avancent et s'étendent sur de grandes superficies. Des périodes de changements climatiques de ce genre ont fait avancer et reculer les glaciers de nombreuses fois dans l'histoire de la Terre.",
      {});
  }
]), ["Pense à l'échelle : une période glaciaire se mesure en milliers d'années, et non en un seul hiver.", "Les glaciers grossissent et avancent quand tout le climat se refroidit pendant longtemps."]);

E("s8f-u1-glacier-retreat", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Dans le Nord, les glaciers reculent à mesure que le climat se réchauffe. Quel ensemble d'effets découle de ce recul?",
      "Le niveau de la mer monte à mesure que l'eau de fonte atteint l'océan, et la réserve d'eau douce emmagasinée diminue",
      ["Le niveau de la mer baisse à mesure que l'eau de fonte atteint l'océan, et la réserve d'eau douce emmagasinée augmente",
       "Le niveau de la mer reste le même, parce que la glace des glaciers n'a jamais fait partie du cycle de l'eau",
       "Le pergélisol s'approfondit, parce que les glaciers qui reculent refroidissent le sol sous eux"],
      "Les glaciers emmagasinent l'eau douce sous forme de glace sur les terres. Quand ils reculent, l'eau de fonte s'écoule vers l'océan et le niveau de la mer monte, la réserve d'eau douce emmagasinée diminue, et le réchauffement dégèle aussi le pergélisol dans le sol du Nord. Chaque effet découle de l'eau qui quitte son emmagasinage sur les terres.",
      {});
  }
]), ["La glace d'un glacier est de l'eau douce emmagasinée sur les terres. Suis où l'eau de fonte s'en va.", "L'eau qui quitte l'emmagasinage sur les terres finit dans l'océan."]);

E("s8f-u1-cr-glacier", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return textq("Une communauté du Nord tire une grande partie de son approvisionnement en eau d'été d'une rivière alimentée par un glacier. Le glacier recule régulièrement depuis des décennies. Explique deux effets que ce recul pourrait avoir, un sur l'approvisionnement en eau de la communauté et un sur l'environnement en général. (3 points)",
      ["moins d'eau de fonte en été une fois le glacier réduit", "montée du niveau de la mer", "dégel du pergélisol"],
      "<b>Réponse modèle :</b> Pendant qu'un glacier recule, le débit d'eau de fonte peut être fort, mais à mesure que le glacier rapetisse, il reste moins de glace à fondre, donc le débit d'été de la rivière baisse et l'approvisionnement en eau douce emmagasinée de la communauté devient moins fiable. Dans l'environnement en général, l'eau de fonte qui quitte les terres atteint l'océan et contribue à la montée du niveau de la mer, et le même réchauffement dégèle le pergélisol, ce qui change le drainage et les terres du Nord. (L'un ou l'autre effet environnemental, développé, mérite le point.)<br><br><b>Points d'attribution :</b> 1 point pour la réserve de glace qui diminue. 1 point pour l'effet sur l'approvisionnement en eau d'été de la communauté. 1 point pour un effet environnemental plus large (montée du niveau de la mer ou dégel du pergélisol) avec sa cause énoncée.",
      {});
  }
]), ["Sépare les deux échelles : la rivière de la communauté, puis l'environnement en général.", "Un glacier est une réserve d'eau douce. Qu'arrive-t-il quand la réserve se vide?"]);

/* ---------- SC8.1.3 La productivité et la répartition des espèces ---------- */

E("s8f-u1-fresh-env", 1, ["SC8.1.3"], 1, "gen", function () {
  var cases = [
    { d: "une zone de basse terre qui reste saturée d'eau pendant une grande partie de l'année, avec des quenouilles et de la sphaigne qui y poussent", k: "Un milieu humide", w: ["Un estuaire côtier", "Un lac profond", "Une rivière vive"] },
    { d: "l'endroit où une rivière rencontre l'océan et où son eau douce se mélange à l'eau salée", k: "Un estuaire", w: ["Un lac", "Un milieu humide", "La zone benthique"] },
    { d: "un milieu d'eau douce en mouvement qui transporte l'eau des terres hautes vers un lac ou l'océan", k: "Une rivière ou un ruisseau", w: ["Un estuaire de rivière côtière", "Un milieu humide saturé d'eau", "La zone pélagique de l'océan"] },
    { d: "une masse d'eau douce stagnante, assez profonde au milieu pour que la lumière du soleil n'atteigne pas le fond", k: "Un lac ou un étang", w: ["Un estuaire", "Une rivière", "Un milieu humide"] }
  ];
  var c = pick(cases);
  return mcq("Quel milieu d'eau douce ou côtier est décrit ici : " + c.d + "?",
    c.k, c.w,
    "Les milieux d'eau douce sont les lacs et les étangs (eau stagnante), les milieux humides (terres saturées d'eau), les rivières et les ruisseaux (eau en mouvement), et les estuaires, où l'eau douce d'une rivière se mélange à l'eau salée de l'océan.",
    {});
}, ["Décide d'abord si l'eau est stagnante, en mouvement, une terre saturée, ou en train de se mélanger à l'océan.", "Un estuaire se définit par le mélange : l'eau douce qui rencontre l'eau salée."]);

E("s8f-u1-species-category", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("Un relevé d'un étang consigne des escargots, des grenouilles, des bactéries et des quenouilles. Quelle liste associe correctement chaque sorte d'organisme à sa catégorie?",
      "Les escargots sont des invertébrés, les grenouilles des vertébrés, les bactéries des microorganismes et les quenouilles des plantes",
      ["Les escargots sont des vertébrés, les grenouilles des invertébrés, les bactéries des plantes et les quenouilles des microorganismes",
       "Les escargots sont des microorganismes, les grenouilles des vertébrés, les bactéries des invertébrés et les quenouilles des plantes",
       "Les escargots sont des invertébrés, les grenouilles des microorganismes, les bactéries des vertébrés et les quenouilles des plantes"],
      "Les espèces d'un milieu se classent en invertébrés (animaux sans colonne vertébrale, comme les escargots), en vertébrés (animaux avec une colonne vertébrale, comme les grenouilles), en microorganismes (êtres vivants minuscules comme les bactéries) et en plantes (comme les quenouilles).",
      {});
  }
]), ["Utilise d'abord le critère de la colonne vertébrale : les escargots n'en ont pas, les grenouilles en ont une.", "Les bactéries sont des microorganismes; les quenouilles sont des plantes."]);

E("s8f-u1-zones", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("Une plie repose à plat sur le plancher océanique et s'y nourrit. Quelle zone du milieu marin est le domicile de la plie?",
      "La zone benthique, le milieu du plancher océanique",
      ["La zone pélagique, le milieu de l'eau libre",
       "Un estuaire, où la rivière rencontre l'océan",
       "Un milieu humide, où la terre reste saturée"],
      "Les milieux marins se divisent en zone pélagique, l'eau libre, et en zone benthique, le plancher océanique. Un poisson qui vit sur le fond, comme une plie, vit dans la zone benthique.",
      {});
  }
]), ["Pélagique veut dire l'eau libre; benthique veut dire le fond.", "Le domicile de la plie est le plancher lui-même."]);

E("s8f-u1-productivity", 1, ["SC8.1.3"], 3, "var", varset([
  function () {
    return mcq("On étudie deux baies. La baie A reçoit une remontée régulière d'eaux froides profondes. La baie B n'a aucune remontée et peu d'éléments nutritifs atteignent ses eaux de surface. Les deux baies reçoivent un ensoleillement et des températures semblables. Quelle baie devrait abriter plus d'espèces, et pourquoi?",
      "La baie A, parce que l'eau remontée transporte des éléments nutritifs qui nourrissent le plancton, lequel soutient le reste du réseau alimentaire",
      ["La baie A, parce que l'eau profonde est plus froide, et que l'eau froide abrite toujours plus d'espèces que l'eau chaude dans n'importe quelle baie",
       "La baie B, parce que de faibles niveaux d'éléments nutritifs empêchent les algues d'utiliser l'oxygène de l'eau, donc plus d'espèces y survivent",
       "Les deux baies également, parce que l'ensoleillement et la température sont les seuls facteurs qui comptent pour les espèces d'une baie"],
      "La productivité dépend de plus que de la lumière et de la température. La remontée d'eaux froides amène à la surface une eau profonde riche en éléments nutritifs, les éléments nutritifs nourrissent la croissance du plancton, et le plancton soutient le réseau alimentaire au-dessus de lui. La baie B n'a pas cet apport d'éléments nutritifs, donc sa productivité et la répartition de ses espèces en sont limitées.",
      {});
  }
]), ["Suis la chaîne : éléments nutritifs, plancton, puis tout ce qui mange le plancton.", "La remontée d'eaux froides est le facteur marin qui nourrit la productivité."]);

/* ---------- SC8.1.4 Les facteurs abiotiques ---------- */

E("s8f-u1-upwelling", 1, ["SC8.1.4"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce que la remontée d'eaux froides?",
      "Le mouvement vertical de l'eau plus froide, plus dense et riche en éléments nutritifs qui monte du dessous vers la surface de l'océan",
      ["Le mouvement de l'eau chaude de surface qui descend dans la colonne d'eau jusqu'au plancher océanique en dessous",
       "Le mouvement latéral de l'eau de surface poussée le long de la côte par le vent qui souffle sur l'océan",
       "La montée et la descente de la surface de l'océan à mesure que les marées entrent et sortent le long du rivage"],
      "La remontée d'eaux froides est le mouvement vertical qui amène à la surface l'eau de subsurface, qui est plus froide, plus dense et riche en éléments nutritifs. Elle est la plus fréquente le long des côtes ouest des continents, et elle nourrit la productivité de ces eaux de surface.",
      {});
  }
]), ["La remontée déplace l'eau dans une seule direction : vers le haut. Quelle sorte d'eau monte?", "L'eau qui monte est froide, dense et pleine d'éléments nutritifs."]);

E("s8f-u1-abiotic", 1, ["SC8.1.4"], 2, "gen", function () {
  var cases = [
    { d: "De fortes pluies entraînent de la terre dans un étang, et l'eau reste trouble pendant des semaines. Les plantes aquatiques du fond commencent à dépérir.", k: "Turbidité : les particules en suspension bloquent la lumière du soleil dont les plantes ont besoin", w: ["Oxygène dissous : la pluie ajoute de l'oxygène que les plantes ne peuvent pas utiliser", "Phosphates : la terre retire les éléments nutritifs dont les plantes ont besoin", "Température : la pluie refroidit l'eau sous ce que les plantes tolèrent"] },
    { d: "Le ruissellement d'engrais entre dans un lac, et les algues poussent si dru que l'eau devient verte.", k: "Phosphates : des éléments nutritifs supplémentaires nourrissent une poussée de croissance des algues", w: ["Acidité : l'engrais rend l'eau trop acide pour les algues", "Pollution : l'engrais empoisonne seulement les prédateurs des algues", "Turbidité : l'engrais trouble l'eau et ombrage les algues"] },
    { d: "Une usine rejette de l'eau chaude dans une rivière tout l'été, et les poissons qui y vivaient se déplacent vers l'aval.", k: "Température : l'eau plus chaude contient moins d'oxygène dissous, donc les poissons partent", w: ["Acidité : l'eau chaude est toujours plus acide que l'eau froide", "Phosphates : l'eau chaude transporte des phosphates qui repoussent les poissons", "Remontée d'eaux froides : l'eau chaude coule et pousse les poissons au loin"] }
  ];
  var c = pick(cases);
  return mcq("Quel facteur abiotique explique le mieux ce changement : " + c.d,
    c.k, c.w,
    "Les facteurs abiotiques agissent par des mécanismes précis. La turbidité est la matière en suspension qui bloque la lumière. Les phosphates sont des éléments nutritifs, donc des phosphates supplémentaires nourrissent la croissance des algues. La température compte en partie parce que l'eau chaude contient moins d'oxygène dissous que l'eau froide, ce qui explique que les poissons quittent l'eau réchauffée. Associer le facteur à son mécanisme est l'habileté visée.",
    {});
}, ["Nomme le facteur, puis vérifie son mécanisme contre ce qui a changé.", "Une eau trouble pointe vers la turbidité; une poussée d'éléments nutritifs pointe vers les phosphates; une eau réchauffée pointe vers la température et l'oxygène."]);

E("s8f-u1-cr-abiotic", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("Un étang qui abritait des grenouilles, des poissons et des plantes aquatiques change au cours d'un été : le ruissellement d'une nouvelle route rend l'eau trouble pendant des semaines à la fois, et l'engrais des pelouses voisines y est entraîné après chaque pluie. Explique l'effet que chaque changement aurait sur les espèces de l'étang, en nommant le facteur abiotique dans chaque cas. (3 points)",
      ["la turbidité bloque la lumière du soleil, donc les plantes aquatiques dépérissent", "les phosphates nourrissent la croissance des algues", "les espèces qui dépendent des plantes sont touchées"],
      "<b>Réponse modèle :</b> Le ruissellement de la route augmente la turbidité de l'étang : les particules en suspension bloquent la lumière du soleil, donc les plantes aquatiques du fond reçoivent moins de lumière et commencent à dépérir, et les animaux qui se nourrissent des plantes ou s'y abritent sont touchés avec elles. L'engrais augmente les niveaux de phosphates : les phosphates sont des éléments nutritifs, donc les algues poussent rapidement, et la croissance des algues ombrage encore les plantes et change l'équilibre d'oxygène de l'étang en se décomposant. Les deux changements modifient les espèces que l'étang peut abriter.<br><br><b>Points d'attribution :</b> 1 point pour la turbidité nommée et liée à la lumière bloquée et à la perte des plantes. 1 point pour les phosphates nommés et liés à la croissance accrue des algues. 1 point pour une conséquence suivie jusqu'aux autres espèces de l'étang.",
      {});
  }
]), ["Traite les deux changements un à la fois : l'eau trouble, puis l'engrais.", "Chaque facteur agit par un mécanisme. Nomme le facteur, puis son mécanisme, puis l'effet sur les espèces."]);

E("s8f-u1-temp-oxygen", 1, ["SC8.1.4"], 3, "var", varset([
  function () {
    return mcq("Les températures de l'océan dans une région de pêche augmentent sur plusieurs années. Selon la chaîne d'effets décrite, quelle suite est correcte?",
      "L'eau plus chaude contient moins d'oxygène dissous, donc les poissons se déplacent vers d'autres zones, et la pêche locale est touchée",
      ["L'eau plus chaude contient plus d'oxygène dissous, donc les populations de poissons augmentent, et la pêche locale prend de l'expansion",
       "L'eau plus chaude contient moins d'oxygène dissous, mais les poissons restent parce que la température n'influe pas sur la répartition",
       "L'eau plus chaude change la salinité de l'eau, donc les poissons se déplacent, et la pêche locale est touchée"],
      "La chaîne d'exemple fonctionne ainsi : la température de l'océan augmente, l'eau plus chaude contient moins d'oxygène dissous, les poissons quittent la région, et la pêche locale est touchée. La température agit sur la répartition par l'oxygène que l'eau peut contenir.",
      {});
  }
]), ["La chaîne a quatre maillons : température, oxygène, poissons, pêche. Vérifie chaque choix contre elle.", "L'eau chaude contient moins d'oxygène dissous que l'eau froide."]);

/* ---------- SC8.1.5 La formation des bassins océaniques ---------- */

E("s8f-u1-profile-figure", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque le talus continental?",
      "B",
      ["A", "C", "D"],
      "Dans le profil du bassin, A se trouve sur le plateau continental, l'extension plate du continent sous une eau peu profonde. B se trouve là où le plancher descend abruptement, le talus continental. C repose sur la vaste plaine abyssale plate, et D est la dorsale médio-océanique surélevée.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque la plaine abyssale?",
      "C",
      ["A", "B", "D"],
      "La plaine abyssale est la vaste région plate du plancher océanique profond, marquée C. A est le plateau continental, B est le talus continental abrupt, et D est la dorsale médio-océanique surélevée.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque la dorsale médio-océanique?",
      "D",
      ["A", "B", "C"],
      "La dorsale médio-océanique est la chaîne de montagnes sous-marine où se forme le nouveau plancher océanique, marquée D là où le profil s'élève. A est le plateau continental, B le talus continental, et C la plaine abyssale plate.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  }
]), ["Pars du rivage vers le large : plateau, puis la descente abrupte, puis le plancher profond plat, puis la dorsale.", "Le talus est la partie abrupte du profil."]);

E("s8f-u1-basin-process", 1, ["SC8.1.5"], 3, "gen", function () {
  var cases = [
    { d: "une longue chaîne de montagnes sous-marine où la matière fondue s'élève, se refroidit et durcit en un nouveau plancher océanique", k: "L'action des volcans et la tectonique des plaques qui construisent un nouveau plancher à une dorsale médio-océanique", w: ["L'érosion qui use le bord extérieur du continent sur une longue période de temps", "La glaciation qui creuse un profond chenal de drainage dans les terres à mesure que la glace avance", "La formation de dépôts de sédiments qui se déposent lentement sur la plaine abyssale plate avec le temps"] },
    { d: "un profond réseau de vallées sur les terres qui transporte maintenant l'eau d'une rivière vers l'océan, creusé sur des milliers d'années par la glace en mouvement puis par l'eau qui s'écoule", k: "La glaciation et l'érosion qui façonnent un réseau de drainage continental", w: ["La tectonique des plaques qui soulève une dorsale médio-océanique au milieu du plancher océanique", "L'action des volcans qui forme un nouveau plancher océanique là où les plaques s'écartent", "La formation de dépôts qui construit le bord extérieur du plateau continental sur une longue période"] }
  ];
  var c = pick(cases);
  return mcq("Quel processus ou quelle paire de processus explique le mieux cet élément : " + c.d + "?",
    c.k, c.w,
    "Les bassins océaniques et les réseaux de drainage continentaux se forment par l'action des volcans, la tectonique des plaques, l'érosion et la glaciation. Le nouveau plancher océanique se construit là où les plaques s'écartent et où la matière volcanique durcit aux dorsales médio-océaniques. Sur les terres, le rôle de la glaciation est l'érosion : la glace en mouvement et l'eau qui la suit creusent les réseaux de drainage qui transportent l'eau vers l'océan.",
    {});
}, ["Décide si l'élément se construit (nouveau plancher) ou se creuse et se façonne (drainage).", "Un nouveau plancher océanique veut dire l'action des volcans à une dorsale; des vallées creusées veulent dire l'érosion, avec la glaciation comme sa part due à la glace."]);

E("s8f-u1-glaciation-role", 1, ["SC8.1.5"], 2, "var", varset([
  function () {
    return mcq("Dans la formation des bassins océaniques et des réseaux de drainage continentaux, quel est le rôle de la glaciation?",
      "La glaciation érode les terres à mesure que la glace avance, façonnant les réseaux de drainage qui transportent l'eau vers l'océan",
      ["La glaciation construit un nouveau plancher océanique aux endroits où les plaques de la croûte s'écartent",
       "La glaciation dépose les sédiments qui se déposent et forment la plaine abyssale plate",
       "La glaciation crée l'action des volcans qui se produit tout le long des dorsales médio-océaniques"],
      "Le rôle de la glaciation se limite à l'érosion dans les réseaux de drainage : la glace en mouvement gratte et creuse les terres, façonnant les vallées et les bassins qui se drainent vers l'océan. Le nouveau plancher océanique vient de l'action des volcans et de la tectonique des plaques, et non de la glace.",
      {});
  }
]), ["La glaciation a un seul travail précis ici. C'est un travail d'usure, et non de construction.", "La glace avance et gratte : c'est l'érosion."]);

E("s8f-u1-profile-order", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    return mcq("En partant du rivage et en avançant vers l'océan profond, quel ordre d'éléments est correct?",
      "Plateau continental, talus continental, plaine abyssale, dorsale médio-océanique",
      ["Talus continental, plateau continental, dorsale médio-océanique, plaine abyssale",
       "Plaine abyssale, talus continental, plateau continental, dorsale médio-océanique",
       "Plateau continental, plaine abyssale, talus continental, dorsale médio-océanique"],
      "À partir du rivage, le continent se prolonge sous une eau peu profonde en plateau continental. Le plancher descend ensuite abruptement le long du talus continental jusqu'à la vaste plaine abyssale plate, et la dorsale médio-océanique s'élève au-delà.",
      {});
  }
]), ["Imagine le profil : plateau doux, descente abrupte, plancher profond plat, puis la dorsale s'élève.", "Le plateau vient en premier parce que c'est le bord du continent lui-même."]);

/* ---------- SC8.1.6 Les courants, les vents et les climats régionaux ---------- */

E("s8f-u1-currents", 1, ["SC8.1.6"], 1, "gen", function () {
  var cases = [
    { q: "Quelle description convient au courant du Labrador?", k: "Un courant froid qui coule vers le sud le long de Terre-Neuve-et-Labrador", w: ["Un courant froid qui coule vers le nord le long de la Floride", "Un courant chaud qui coule vers le nord le long de Terre-Neuve-et-Labrador", "Un courant chaud qui coule vers le sud à partir du golfe du Mexique"] },
    { q: "Quelle description convient au Gulf Stream?", k: "Un courant chaud qui coule vers le nord à partir du golfe du Mexique le long de la côte est", w: ["Un courant froid qui coule vers le sud à partir de l'Arctique", "Un courant chaud qui coule vers le sud le long du Labrador", "Un courant froid qui coule vers le nord le long de la côte ouest"] },
    { q: "L'équipage d'un navire veut savoir quel courant transporte les icebergs vers le sud le long de Terre-Neuve chaque printemps. Quel courant est-ce?", k: "Le courant du Labrador", w: ["Le Gulf Stream", "La dérive nord-atlantique seulement", "La thermocline"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Deux courants dominent l'océan de cette province. Le courant du Labrador transporte l'eau froide de l'Arctique vers le sud le long du Labrador et de Terre-Neuve, avec les icebergs. Le Gulf Stream transporte l'eau chaude vers le nord à partir du golfe du Mexique le long de la côte est de l'Amérique du Nord.",
    {});
}, ["L'eau froide vient du nord : c'est le courant du Labrador. L'eau chaude vient du sud : le Gulf Stream.", "Les icebergs voyagent avec le courant froid."]);

E("s8f-u1-fog", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Les côtes de Terre-Neuve sont réputées pour leur brouillard épais. Qu'est-ce qui le produit?",
      "L'air chaud et humide transporté par le Gulf Stream passe au-dessus de l'eau froide du courant du Labrador et se condense",
      ["L'air froid et sec du courant du Labrador se mélange à l'eau froide au large et se transforme en bancs de brouillard",
       "L'eau chaude du Gulf Stream s'évapore directement en un brouillard qui reste suspendu au-dessus des Grands Bancs",
       "L'air froid descend au-dessus du Gulf Stream chaud et forme une couche de nuages juste à la surface de l'eau"],
      "Le brouillard se forme quand l'air chaud et humide au-dessus du Gulf Stream se déplace au-dessus de l'eau de surface beaucoup plus froide du courant du Labrador. L'air se refroidit, sa vapeur d'eau se condense en minuscules gouttelettes, et le brouillard en résulte. La rencontre des deux courants explique pourquoi cette province est si brumeuse.",
      {});
  }
]), ["Le brouillard est une condensation à la surface. Quelle masse d'air transporte l'humidité, et qu'est-ce qui la refroidit?", "Un air chaud et humide plus une surface froide donnent du brouillard."]);

E("s8f-u1-nino-nina", 1, ["SC8.1.6"], 2, "gen", function () {
  var cases = [
    { q: "Pendant un épisode El Niño, qu'arrive-t-il aux alizés et à l'océan de surface dans le Pacifique?", k: "Les alizés diminuent et l'océan de surface se réchauffe", w: ["Les alizés diminuent et l'océan de surface se refroidit", "Les alizés augmentent et l'océan de surface se refroidit", "Les alizés augmentent et l'océan de surface se réchauffe"] },
    { q: "Pendant un épisode La Niña, qu'arrive-t-il aux alizés et à l'océan de surface dans le Pacifique?", k: "Les alizés augmentent et l'océan de surface se refroidit", w: ["Les alizés diminuent et l'océan de surface se refroidit", "Les alizés diminuent et l'océan de surface se réchauffe", "Les alizés augmentent et l'océan de surface se réchauffe"] },
    { q: "Un rapport indique que les alizés du Pacifique ont faibli et que ses eaux de surface sont plus chaudes que d'habitude cette année. Quel épisode est décrit?", k: "El Niño", w: ["La Niña", "Une marée de morte-eau", "La remontée d'eaux froides"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La distinction entre les deux épisodes se fait par les alizés. Pendant El Niño, les alizés diminuent et l'océan se réchauffe. Pendant La Niña, les alizés augmentent et l'océan se refroidit. Le changement de vent vient en premier dans chaque définition.",
    {});
}, ["Accroche-toi aux vents : des vents plus faibles vont avec le réchauffement, des vents plus forts avec le refroidissement.", "El Niño : les vents diminuent, l'océan se réchauffe. La Niña est l'inverse."]);

E("s8f-u1-cr-coastal-climate", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return textq("Une ville côtière et une ville de l'intérieur se trouvent à la même latitude. En janvier, la ville côtière affiche en moyenne moins 4 degrés Celsius tandis que la ville de l'intérieur affiche moins 14 degrés Celsius, et en juillet la ville côtière est la plus fraîche des deux. Explique le rôle de l'océan dans ce régime. (3 points)",
      ["l'océan emmagasine la chaleur parce que l'eau se réchauffe et se refroidit lentement", "la chaleur emmagasinée est libérée en hiver et l'océan reste frais en été", "les courants et les vents déplacent l'air tempéré au-dessus de la côte"],
      "<b>Réponse modèle :</b> L'eau se réchauffe et se refroidit très lentement, donc l'océan emmagasine une grande quantité de chaleur. Pendant l'hiver, l'océan cède graduellement sa chaleur emmagasinée, ce qui réchauffe l'air au-dessus de la côte, tandis que la ville de l'intérieur, sans une telle réserve à côté d'elle, devient beaucoup plus froide. En été, l'océan est encore frais de l'hiver et maintient la température de la ville côtière plus basse. Des courants comme le Gulf Stream chaud ajoutent de la chaleur à l'eau au large, et les vents et la convection transportent l'air tempéré par l'océan au-dessus de la ville côtière.<br><br><b>Points d'attribution :</b> 1 point pour le réchauffement et le refroidissement lents de l'eau (l'emmagasinage de la chaleur). 1 point pour la chaleur emmagasinée qui tempère l'hiver (et l'océan frais qui tempère l'été). 1 point pour un mécanisme de transport : les courants qui fournissent la chaleur, ou les vents et la convection qui déplacent l'air tempéré vers la côte.",
      {});
  }
]), ["Le régime fonctionne dans les deux sens : plus chaud en hiver, plus frais en été. Une seule propriété de l'eau explique les deux.", "Pense à l'océan comme un appareil de chauffage et de refroidissement très lent à côté de la ville."]);

E("s8f-u1-iceberg", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return mcq("Chaque printemps, les excursionnistes au large de St. John's annoncent l'observation des icebergs à mesure que les glaces dérivent vers le sud le long de la péninsule d'Avalon. Un élève affirme que le Gulf Stream amène les icebergs. Quelle correction est juste, et pourquoi compte-t-elle pour la saison des excursions?",
      "Le courant froid du Labrador transporte les icebergs vers le sud à partir du Groenland; cela compte parce que les icebergs arrivent à mesure que le courant les transporte le long de la côte au printemps",
      ["Le Gulf Stream amène bien les icebergs vers le sud, et cela compte parce que son eau chaude les fait fondre rapidement une fois qu'ils atteignent la côte",
       "Le courant du Labrador transporte les icebergs vers le nord à partir de l'Antarctique; cela compte parce qu'ils arrivent au large de la côte à l'automne plutôt",
       "Aucun courant n'est en cause; les icebergs dérivent vers le sud avec les marées seulement, ce qui explique pourquoi la saison d'observation reste si courte chaque année"],
      "Les icebergs se détachent des glaciers du Groenland dans le courant froid du Labrador, qui coule vers le sud le long du Labrador et de Terre-Neuve en les transportant. Le Gulf Stream chaud coule dans l'autre direction et ferait fondre les icebergs au lieu de les livrer. La saison d'observation suit la livraison printanière du courant froid.",
      {});
  }
]), ["Les icebergs viennent du Groenland, au nord. Quel courant coule vers le sud à partir de là?", "Un courant chaud serait un problème pour un iceberg, et non un service de livraison."]);

/* ---------- SC8.1.7 Les vagues et les marées ---------- */

E("s8f-u1-wave-energy", 1, ["SC8.1.7"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre une vague d'eau. D'où vient l'énergie des vagues de surface de l'océan?",
      "De l'air en mouvement : le vent transfère son énergie à la surface de l'eau",
      ["De l'attraction gravitationnelle de la Lune",
       "Des tremblements de terre sous le plancher océanique",
       "Des courants océaniques qui coulent sous la surface"],
      "Une vague à la surface de l'eau est de l'eau en mouvement qui transfère de l'énergie. Les vagues ordinaires de l'océan sont produites principalement par le vent : l'air en mouvement transfère son énergie à travers la surface de l'eau. L'attraction de la Lune produit plutôt les marées, et les tremblements de terre sous-marins produisent le cas exceptionnel, les tsunamis.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la crête de la vague?",
      "A",
      ["B", "C", "D"],
      "La crête est le sommet de la vague, marquée A. B se trouve dans le creux, le point le plus bas, C couvre la longueur d'onde, la distance d'une crête à la suivante, et D couvre la hauteur de la vague, du niveau de la crête jusqu'au niveau du creux.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la longueur d'onde?",
      "C",
      ["A", "B", "D"],
      "La longueur d'onde est la distance entre deux crêtes voisines, couverte par C. A marque une seule crête, B se trouve dans un creux, et D couvre la hauteur de la vague.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la hauteur de la vague?",
      "D",
      ["A", "B", "C"],
      "La hauteur de la vague est la distance verticale du niveau du creux au niveau de la crête, couverte par D. A marque une seule crête, B se trouve dans un creux, et C couvre la longueur d'onde horizontalement.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  }
]), ["Les vagues ordinaires sont poussées par le vent. Les marées sont le mouvement poussé par la Lune.", "La crête est le point haut; la longueur d'onde va d'une crête à l'autre; la hauteur va de la crête au creux."]);

E("s8f-u1-tides", 1, ["SC8.1.7"], 1, "gen", function () {
  var cases = [
    { q: "La Terre, la Lune et le Soleil sont alignés. Qu'arrive-t-il à l'amplitude de la marée?", k: "Elle est à son maximum : ce sont les marées de vive-eau", w: ["Elle est à son minimum : ce sont les marées de vive-eau", "Elle est à son maximum : ce sont les marées de morte-eau", "Elle ne change pas : l'alignement n'influe pas sur les marées"] },
    { q: "Le Soleil, la Lune et la Terre forment un angle droit. Qu'arrive-t-il à l'amplitude de la marée?", k: "Elle est à son minimum : ce sont les marées de morte-eau", w: ["Elle est à son maximum : ce sont les marées de morte-eau", "Elle est à son minimum : ce sont les marées de vive-eau", "Elle ne change pas : les angles droits annulent les marées"] },
    { q: "L'équipage d'un bateau de pêche veut la plus grande amplitude de marée possible pour que son bateau puisse franchir un haut-fond peu profond. Quand devrait-il prévoir de partir?", k: "Pendant les marées de vive-eau, quand la Terre, la Lune et le Soleil sont alignés", w: ["Pendant les marées de morte-eau, quand le Soleil et la Lune forment un angle droit avec la Terre", "À n'importe quel moment, parce que l'amplitude de la marée ne change pas au cours du mois", "Seulement pendant un épisode El Niño"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les marées sont produites par l'attraction gravitationnelle de la Lune, à laquelle le Soleil ajoute une attraction moindre. Quand la Terre, la Lune et le Soleil sont alignés, les attractions s'additionnent et l'amplitude de la marée est à son maximum : les marées de vive-eau. Quand le Soleil et la Lune sont à angle droit par rapport à la Terre, les attractions s'annulent en partie et l'amplitude est à son minimum : les marées de morte-eau. Chacune se produit deux fois par mois.",
    {});
}, ["Alignés veut dire que les attractions s'additionnent. Angle droit veut dire qu'elles s'annulent en partie.", "Les marées de vive-eau ont la plus grande amplitude; les marées de morte-eau, la plus petite."]);

E("s8f-u1-tidal-range", 1, ["SC8.1.7"], 2, "gen", function () {
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
  return mcq("Dans un port, la marée haute est mesurée à " + hi + " m et la marée basse suivante à " + lo + " m. Quelle est l'amplitude de la marée?",
    fmt(range),
    dis.map(fmt),
    "L'amplitude de la marée est la différence entre la marée haute et la marée basse : " + hi + " m moins " + lo + " m égale " + range + " m. De grandes amplitudes comme celle-ci expliquent pourquoi des ports comme ceux de la baie de Fundy exigent une planification soigneuse des horaires.",
    {});
}, ["L'amplitude de la marée est une différence : marée haute moins marée basse.", "Soustrais la mesure de la marée basse de la mesure de la marée haute."]);

E("s8f-u1-cr-tides", 1, ["SC8.1.7"], 2, "var", varset([
  function () {
    return textq("Explique pourquoi les marées de vive-eau ont une plus grande amplitude que les marées de morte-eau, en faisant référence aux positions de la Terre, de la Lune et du Soleil dans chaque cas. (3 points)",
      ["les marées sont produites par l'attraction gravitationnelle de la Lune", "pendant les marées de vive-eau, les trois corps sont alignés et les attractions s'additionnent", "pendant les marées de morte-eau, le Soleil et la Lune sont à angle droit et les attractions s'annulent en partie"],
      "<b>Réponse modèle :</b> Les marées sont produites principalement par l'attraction gravitationnelle de la Lune sur les océans de la Terre, le Soleil ajoutant une attraction moindre qui lui est propre. Pendant les marées de vive-eau, la Terre, la Lune et le Soleil sont alignés, donc l'attraction du Soleil renforce celle de la Lune et l'amplitude de la marée est à son maximum. Pendant les marées de morte-eau, le Soleil et la Lune sont à angle droit vus de la Terre, donc leurs attractions agissent l'une contre l'autre et l'amplitude est à son minimum. Les deux se produisent deux fois par mois.<br><br><b>Points d'attribution :</b> 1 point pour les marées causées par l'attraction gravitationnelle de la Lune (et celle du Soleil, moindre). 1 point pour les positions alignées des marées de vive-eau et les attractions qui s'additionnent. 1 point pour les positions à angle droit des marées de morte-eau et les attractions qui s'annulent en partie.",
      {});
  }
]), ["Commence par ce qui cause les marées en général, puis compare les deux dispositions des trois corps.", "Même cause, deux géométries : alignés, ou à angle droit."]);

E("s8f-u1-wave-size", 1, ["SC8.1.7"], 3, "var", varset([
  function () {
    return mcq("On compare trois tempêtes. Tempête 1 : un vent fort pendant deux heures sur une petite baie. Tempête 2 : le même vent pendant deux jours sur une petite baie. Tempête 3 : le même vent pendant deux jours sur un vaste océan. Quelle tempête produit les plus grandes vagues, et pourquoi?",
      "La tempête 3, parce que la taille des vagues augmente avec la vitesse du vent, avec la durée pendant laquelle le vent souffle, et avec la taille de la superficie d'eau qu'il traverse",
      ["La tempête 1, parce qu'une petite baie concentre l'énergie du vent dans une plus petite superficie d'eau et y fait grossir les vagues",
       "La tempête 2, parce que la durée pendant laquelle le vent souffle est le seul facteur qui influe sur la taille des vagues qu'une tempête produit",
       "Les trois tempêtes également, parce que la vitesse du vent est exactement la même dans chacune des trois tempêtes comparées ici"],
      "La taille des vagues dépend de trois choses ensemble : la vitesse du vent, la durée pendant laquelle il souffle, et la taille de la superficie d'eau qu'il traverse. La tempête 3 égale la tempête 2 en vitesse et en durée et ajoute une superficie d'eau bien plus grande, donc ses vagues grossissent le plus avant que leur énergie atteigne un rivage.",
      {});
  }
]), ["Trois facteurs construisent une vague. Vérifie quelle tempête a les trois de son côté.", "La vitesse, la durée, et la distance d'eau libre que le vent traverse."]);

/* ---------- SC8.1.8 L'érosion et la formation de dépôts aux rivages ---------- */

E("s8f-u1-slope", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Le long d'un même tronçon de côte, une plage en pente douce gagne du sable tandis qu'un rivage de falaise abrupte voisin s'effrite dans la mer. Quel énoncé explique la différence?",
      "La formation de dépôts se produit sur les rivages à pente faible, tandis que l'érosion domine sur les pentes plus abruptes",
      ["La formation de dépôts se produit sur les pentes abruptes, tandis que l'érosion domine sur les pentes faibles",
       "La pente ne fait aucune différence; seul le type de roche compte",
       "Les deux rivages s'érodent; la formation de dépôts n'ajoute jamais de matière à un rivage"],
      "L'énergie des vagues érode et dépose. Sur les rivages à pente faible, les vagues perdent leur énergie et laissent tomber les sédiments qu'elles transportent : la formation de dépôts. Sur les pentes abruptes, l'énergie des vagues reste concentrée et arrache la matière : l'érosion. La pente est l'un des facteurs, avec la forme du rivage, le type de roche et l'énergie des vagues, qui décident quel processus l'emporte.",
      {});
  }
]), ["Gagner du sable veut dire formation de dépôts; s'effriter veut dire érosion. Associe chacun à sa pente.", "Les pentes douces laissent les vagues déposer leur charge."]);

E("s8f-u1-headland-energy", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return mcq("Les vagues qui approchent d'une côte faite de caps et de baies ne la frappent pas uniformément. Où l'énergie des vagues se concentre-t-elle, et qu'en découle-t-il?",
      "L'énergie se concentre sur les caps, donc ils s'érodent le plus vite, tandis que l'énergie s'étale dans les baies, où la formation de dépôts construit les plages",
      ["L'énergie se concentre dans les baies, donc elles s'érodent le plus vite, tandis que les caps reçoivent une énergie étalée et gagnent des dépôts",
       "L'énergie est égale partout, donc les caps et les baies changent au même rythme",
       "L'énergie se concentre sur les caps, donc le sable s'y dépose et les caps grandissent"],
      "À mesure que les vagues se courbent vers une côte, leur énergie se concentre sur les caps qui avancent dans l'eau et s'étale en atteignant les baies. L'énergie concentrée érode les caps; l'énergie étalée dans les baies laisse tomber les sédiments et construit les plages. C'est pourquoi les caps reculent pendant que les baies se remplissent.",
      {});
  }
]), ["Un cap avance dans l'eau et rencontre les vagues en premier. Qu'est-ce que cela fait à l'énergie qu'il reçoit?", "Une énergie concentrée érode; une énergie étalée dépose."]);

E("s8f-u1-rock-resistance", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Les roches rouges de St. George's s'usent sensiblement plus vite que les falaises de l'île Bell dans la baie Conception. Que montre cette comparaison?",
      "Les types de roches moins résistants s'érodent plus vite que les types de roches plus résistants sous la même action des vagues",
      ["La roche rouge s'érode toujours plus vite que la roche grise, quel que soit le type de roche réel ou sa résistance aux vagues",
       "Le type de roche ne fait aucune différence dans les taux d'érosion; seule l'énergie des vagues qui frappent le rivage compte",
       "Les falaises s'érodent lentement seulement parce qu'elles sont plus hautes que les autres rivages le long du même tronçon de côte"],
      "La comparaison même du contenu : une roche moins résistante, comme le grès de St. George's, s'érode plus vite qu'une roche plus résistante, comme les falaises de l'île Bell. Le type de roche est l'un des facteurs qui déterminent la vitesse à laquelle un rivage change, avec la pente, la forme et l'énergie des vagues.",
      {});
  }
]), ["Les deux rivages font face à l'action des vagues. La différence nommée dans la question est la roche elle-même.", "La résistance est la propriété de la roche qui compte ici."]);

E("s8f-u1-cr-headland", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return textq("Un cap de roche résistante avance dans l'océan entre deux baies sablonneuses. Au fil de nombreuses années, le cap développe des fissures, une grotte, puis éventuellement une arche, tandis que les baies gagnent des plages plus larges. Explique les deux changements, en faisant référence à l'énergie des vagues. (3 points)",
      ["l'énergie des vagues se concentre sur le cap", "l'énergie concentrée érode la roche et creuse des grottes et des arches", "l'énergie s'étale dans les baies, donc les sédiments s'y déposent"],
      "<b>Réponse modèle :</b> Les vagues se courbent en approchant de la côte, et leur énergie se concentre sur le cap qui avance à leur rencontre. Cette énergie concentrée érode la roche, s'infiltre dans les fissures et creuse des grottes; là où une grotte traverse le cap, une arche se forme, et l'érosion continue finit par laisser un empilement. Dans les baies, la même énergie des vagues s'étale sur un front plus large, perd de sa force et ne peut plus transporter ses sédiments, donc les sédiments se déposent et les plages grandissent.<br><br><b>Points d'attribution :</b> 1 point pour l'énergie des vagues concentrée sur le cap. 1 point pour l'érosion du cap qui produit la suite grotte et arche. 1 point pour l'énergie qui s'étale dans les baies et y dépose les sédiments.",
      {});
  }
]), ["Une côte, deux histoires d'énergie : concentrée sur le cap, étalée dans les baies.", "L'érosion exige une énergie concentrée; la formation de dépôts se produit là où l'énergie se perd."]);

/* ---------- SC8.1.9 Les formes de relief ---------- */

E("s8f-u1-landform-figure", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque une arche marine?",
      "B",
      ["A", "C", "D"],
      "Les formes de relief montrent la suite de l'érosion. A est une grotte marine, creusée dans le cap. B est une arche marine, là où l'érosion a traversé le cap. C est un empilement, un pilier laissé debout quand une arche s'effondre, et D est la souche basse qui reste à mesure qu'un empilement s'use.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque un empilement?",
      "C",
      ["A", "B", "D"],
      "Un empilement est le pilier de roche isolé laissé quand une arche marine s'effondre, marqué C. A est une grotte marine, B est une arche marine encore reliée au cap, et D est la souche usée d'un empilement plus ancien.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque une grotte marine?",
      "A",
      ["B", "C", "D"],
      "Une grotte marine est le creux usé à la base du cap, marqué A. B est une arche marine, C un empilement, et D une souche : les étapes suivantes de la même suite d'érosion.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  }
]), ["Suis la suite : la grotte d'abord, puis l'arche qui traverse, puis l'empilement debout.", "Chaque forme de relief est une étape du cap qui s'use."]);

E("s8f-u1-landform-formation", 1, ["SC8.1.9"], 2, "gen", function () {
  var cases = [
    { q: "Comment se forme une barre de sable?", k: "Les vagues et les courants déposent du sable en eau peu profonde et construisent une crête de sédiments", w: ["Les vagues érodent un cap jusqu'à ce qu'une crête de roche solide reste debout dans l'eau", "Une grotte traverse un cap et le toit s'effondre dans l'eau en dessous", "Le vent souffle le sable sec de la plage en de gros tas au-dessus de la ligne de marée haute sur le rivage"] },
    { q: "Comment une plage se forme-t-elle et grandit-elle?", k: "Formation de dépôts : les vagues déposent le sable et les sédiments le long d'un rivage en pente douce plus vite qu'elles ne les retirent", w: ["Érosion : les vagues arrachent le sable du rivage et l'entassent en une crête à la ligne d'eau", "Formation de dépôts : les glaciers laissent le sable et les sédiments derrière eux en reculant lentement de la côte", "Altération : la roche se brise sur place et les morceaux brisés restent entassés là où ils sont tombés"] },
    { q: "Comment se forme un haut-fond?", k: "Les sédiments déposés en eau peu profonde construisent une zone qui présente un danger pour les bateaux", w: ["Un empilement s'effondre et ses débris s'étalent à travers l'entrée peu profonde du port", "Les marées creusent un chenal profond dans le port qui se remplit de sédiments à marée basse", "L'action des volcans soulève une nouvelle crête sur le plancher océanique près du rivage"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les plages, les hauts-fonds et les barres de sable sont des formes de relief de dépôts : elles existent parce que les vagues et les courants ont déposé des sédiments en eau peu profonde. Les grottes marines, les arches et les empilements forment la famille de l'érosion. Classer une forme de relief dans sa famille est la première étape pour l'expliquer.",
    {});
}, ["Demande-toi si la matière est déposée ou arrachée.", "Les formes de sable sont construites par la formation de dépôts."]);

E("s8f-u1-erosion-deposition", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    return mcq("Quelle liste contient seulement des formes de relief construites par la formation de dépôts?",
      "Plage, haut-fond, barre de sable",
      ["Plage, arche marine, barre de sable",
       "Grotte marine, arche marine, empilement",
       "Haut-fond, empilement, barre de sable"],
      "Les plages, les hauts-fonds et les barres de sable sont tous construits là où les vagues et les courants déposent des sédiments. Les grottes marines, les arches marines et les empilements sont creusés par l'érosion. Les deux familles forment le classement de base des formes de relief des rivages.",
      {});
  }
]), ["Trois des six formes de relief nommées sont déposées; trois sont érodées. Trouve la liste entièrement de dépôts.", "Les grottes, les arches et les empilements sont creusés dans la roche : l'érosion."]);

/* ---------- SC8.1.10 Les courants, les vents et les climats régionaux (scénarios distincts) ---------- */

E("s8f-u1-climate-current-effect", 1, ["SC8.1.10"], 2, "var", varset([
  function () {
    return mcq("Deux villes portuaires se trouvent à la même latitude. Au large de l'une passe un courant chaud; au large de l'autre passe un courant froid. Toutes choses égales par ailleurs, quelle prévision est la mieux appuyée?",
      "La ville au courant chaud aura un climat plus doux que la ville au courant froid, parce que le courant réchauffe l'air qui passe au-dessus de lui",
      ["La ville au courant froid aura un climat plus doux que la ville au courant chaud, parce que l'eau froide emmagasine plus de chaleur que l'eau chaude",
       "Les deux villes auront exactement le même climat, parce que les courants océaniques n'ont aucune interaction avec les vents ni avec l'air",
       "La ville au courant chaud sera plus sèche dans toutes les saisons, parce qu'un courant chaud empêche toujours la formation de nuages au-dessus de lui"],
      "Les courants océaniques transportent la chaleur avec l'eau. Un courant chaud réchauffe l'air au-dessus de lui, et les vents transportent cet air tempéré vers la côte, ce qui adoucit le climat régional. Un courant froid refroidit l'air au-dessus de lui et produit l'effet contraire le long de sa côte.",
      {});
  }
]), ["Un courant est de l'eau en mouvement qui transporte sa température avec elle. Que fait-il à l'air au-dessus?", "Les vents complètent le travail en transportant l'air tempéré vers les terres."]);

E("s8f-u1-climate-claim-judge", 1, ["SC8.1.10"], 3, "var", varset([
  function () {
    return mcq("Un élève écrit : « Les climats régionaux sont déterminés seulement par la latitude. Les courants océaniques et les vents ne changent rien, parce que l'eau et l'air ne se mélangent jamais. » Quelle évaluation de cet énoncé est correcte?",
      "L'énoncé est faux : les courants transportent l'eau chaude et l'eau froide vers de nouvelles régions, les vents déplacent l'air tempéré par l'océan au-dessus des terres, et les deux ensemble modifient les climats régionaux",
      ["L'énoncé est juste : la latitude fixe chaque climat régional à elle seule, et ni les courants ni les vents ne peuvent modifier la température d'une région côtière, quelle que soit la chaleur que l'eau transporte avec elle",
       "L'énoncé est faux seulement parce que l'eau et l'air se mélangent directement à la surface; les courants eux-mêmes ne transportent aucune chaleur d'une région à l'autre, et les vents ne déplacent jamais l'air tempéré vers les terres",
       "L'énoncé est juste pour les côtes et faux pour l'intérieur des terres, parce que les courants océaniques tempèrent seulement les climats des îles éloignées et ne changent rien aux régions côtières des continents, même tout près d'eux"],
      "La latitude fixe l'ensoleillement de base, mais les interactions entre les courants, les vents et l'air modifient le résultat régional. Les courants transportent la chaleur, l'eau froide et même les icebergs sur de grandes distances, et les vents et la convection déplacent l'air que l'océan a tempéré au-dessus des terres voisines. C'est cette interaction qui explique des contrastes comme le brouillard de Terre-Neuve et ses hivers côtiers plus doux.",
      {});
  }
]), ["Vérifie les deux affirmations de l'élève : « seulement la latitude » et « jamais d'interaction ».", "Un seul contre-exemple solide suffit à faire tomber un « seulement » ou un « jamais »."]);

/* ---------- SC8.2.1 Les organisations de recherche sur les océans ---------- */

E("s8f-u1-institutions", 1, ["SC8.2.1"], 1, "gen", function () {
  var cases = [
    { q: "Un élève fait une recherche sur les systèmes météorologiques au-dessus de l'Atlantique. Le travail de quelle organisation canadienne est le plus directement lié à la météo?", k: "Environnement Canada", w: ["Le centre C-CORE", "Les sciences océaniques", "Les Pêches fédérales"] },
    { q: "Un élève veut en apprendre sur la recherche en ingénierie des océans froids, par exemple comment les structures résistent aux icebergs. Quelle organisation convient le mieux?", k: "C-CORE, le Centre de recherche sur les océans froids à l'Université Memorial", w: ["Environnement Canada, le ministère fédéral de la météo et du climat", "Le ministère fédéral des Pêches et des Océans, responsable des pêches", "Le Centre des sciences océaniques de l'Université Memorial à St. John's"] },
    { q: "Un élève étudie la science des stocks de poissons et des écosystèmes océaniques. Quelle organisation convient le mieux?", k: "Le Centre des sciences océaniques à l'Université Memorial", w: ["C-CORE, le centre d'ingénierie des océans froids de Memorial", "Environnement Canada, le ministère fédéral de la météo", "Un office provincial du tourisme de Terre-Neuve-et-Labrador"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Le Canada soutient la recherche sur les océans par des organisations publiques et privées, dont Environnement Canada (la météo), le ministère fédéral des Pêches, et à l'Université Memorial le Centre des sciences océaniques, son Département d'océanographie, l'Institut maritime des pêches, et C-CORE pour la recherche sur les océans froids. L'essentiel est de savoir que ces organisations existent et ce qu'elles font en gros.",
    {});
}, ["Associe l'organisation à son grand domaine : la météo, les pêches et la science des océans, ou l'ingénierie des océans froids.", "Le nom de C-CORE porte son domaine : la recherche sur les océans froids."]);

E("s8f-u1-institution-focus", 1, ["SC8.2.1"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé sur les organisations canadiennes de recherche sur les océans est correct?",
      "Des organisations comme Environnement Canada, le ministère fédéral des Pêches et le Centre des sciences océaniques de l'Université Memorial soutiennent toutes la recherche qui touche les océans",
      ["Seules les universités mènent la recherche sur les océans au Canada, et aucun ministère à aucun niveau ne prend part au travail, dans aucune région du pays",
       "La recherche sur les océans au Canada est menée entièrement par des entreprises privées de pêche sur les côtes de l'Atlantique et du Pacifique, sans aucun autre organisme en cause",
       "Les organisations existent et emploient beaucoup de scientifiques, mais elles n'étudient que les lacs et les rivières d'eau douce du Canada et jamais les océans autour de ses côtes"],
      "La recherche sur les océans au Canada est partagée entre des ministères et des centres universitaires. Environnement Canada s'occupe de la météo, le ministère fédéral des Pêches des pêches et des océans, et le Centre des sciences océaniques, C-CORE et l'Institut maritime de l'Université Memorial étudient l'océan à partir de St. John's. L'essentiel est de savoir que ces organisations existent et soutiennent la recherche sur les océans.",
      {});
  }
]), ["L'idée centrale est la sensibilisation : ces organisations existent et étudient les océans.", "Des organisations gouvernementales et universitaires figurent toutes deux sur la liste."]);

/* ---------- SC8.2.2 Les technologies d'étude des bassins océaniques ---------- */

E("s8f-u1-tech", 1, ["SC8.2.2"], 1, "gen", function () {
  var cases = [
    { q: "Des scientifiques cartographient la forme du plancher océanique en envoyant des impulsions sonores vers le bas et en chronométrant leurs échos. Quelle technologie est-ce?", k: "Le sonar", w: ["La plongée", "Les satellites", "La photographie sous-marine"] },
    { q: "Des scientifiques veulent observer l'épave du Titanic et prélever des échantillons autour d'elle, bien plus profondément qu'un plongeur ne peut descendre. Quelle technologie convient?", k: "Un submersible océanique", w: ["Un satellite", "La plongée en scaphandre autonome", "Le sonar seulement"] },
    { q: "Des scientifiques suivent les conditions générales de la surface de l'océan, comme les courants et les systèmes de tempêtes, sur tout l'Atlantique à la fois. Quelle technologie convient le mieux?", k: "Les satellites", w: ["Les submersibles océaniques", "La plongée", "La photographie sous-marine"] },
    { q: "Des scientifiques veulent des enregistrements visuels rapprochés des organismes qui vivent sur un récif peu profond. Quelle technologie convient le mieux?", k: "La photographie et la vidéographie sous-marines", w: ["Un submersible océanique", "Les satellites", "Le sonar"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Une grande partie de ce que l'on sait des bassins océaniques vient d'observations indirectes recueillies par la technologie : le sonar cartographie le plancher avec le son, les satellites surveillent la surface en général, la photographie et la vidéographie sous-marines enregistrent ce qui s'y trouve, les submersibles transportent des personnes et des instruments en profondeur, et la plongée sert aux travaux peu profonds. Associer l'outil au travail est le contenu visé.",
    {});
}, ["Décide de ce dont les scientifiques ont besoin : une carte, une vue d'ensemble, des images, ou une visite en profondeur.", "Le son et les échos veulent dire le sonar."]);

E("s8f-u1-sonar", 1, ["SC8.2.2"], 1, "var", varset([
  function () {
    return mcq("Pourquoi le sonar est-il si utile pour étudier les bassins océaniques?",
      "Le son voyage dans l'eau et renvoie des échos du plancher, donc la forme du plancher peut être cartographiée sans la voir directement",
      ["Les caméras du sonar prennent des photographies nettes du plancher océanique même dans l'obscurité totale loin sous la surface",
       "Le sonar permet aux plongeurs de respirer en sécurité à n'importe quelle profondeur où ils choisissent de descendre en pleine mer",
       "Le sonar mesure directement la teneur en sel et la température de l'eau océanique profonde à mesure qu'elle passe"],
      "Le sonar fonctionne en envoyant des impulsions sonores dans l'eau et en chronométrant les échos qui reviennent du plancher océanique. À partir du chronométrage, les scientifiques construisent une image de la forme du bassin. C'est une observation indirecte : le plancher est cartographié sans que personne le voie, et c'est ainsi que se déroule la plus grande partie de la recherche sur les bassins.",
      {});
  }
]), ["Le sonar utilise le son. Que disent les échos qui reviennent aux scientifiques?", "Le temps des échos devient la profondeur, et les lectures de profondeur deviennent une carte."]);

E("s8f-u1-cr-indirect", 1, ["SC8.2.2"], 2, "var", varset([
  function () {
    return textq("Personne ne peut voir directement la plus grande partie du plancher océanique, et pourtant les scientifiques produisent des cartes détaillées des bassins océaniques et peuvent décrire des éléments comme les dorsales médio-océaniques et les fosses. Explique comment ces connaissances se construisent, en nommant deux technologies et ce que chacune apporte. (3 points)",
      ["le sonar cartographie le plancher au moyen des échos sonores", "les satellites, les submersibles ou la photographie ajoutent d'autres preuves", "les connaissances viennent d'observations indirectes combinées"],
      "<b>Réponse modèle :</b> Les connaissances sur les bassins océaniques se construisent à partir d'observations indirectes. Les navires qui utilisent le sonar envoient des impulsions sonores vers le bas et chronométrent les échos du plancher, et des milliers de ces lectures de profondeur sont combinées en une carte de la forme du bassin, révélant des éléments comme les dorsales médio-océaniques et les fosses. D'autres technologies ajoutent des preuves différentes : les satellites observent la surface de l'océan et ses conditions sur des bassins entiers à la fois, et les submersibles océaniques et la photographie sous-marine permettent aux scientifiques d'examiner et d'enregistrer des éléments précis de près. Mises ensemble, les preuves indirectes soutiennent des affirmations détaillées sur des endroits que personne ne peut visiter sans aide.<br><br><b>Points d'attribution :</b> 1 point pour le sonar expliqué comme des échos sonores qui donnent la profondeur et la forme. 1 point pour une deuxième technologie avec son apport (satellites, submersibles, photographie sous-marine ou plongée). 1 point pour avoir énoncé que les connaissances sont indirectes et construites en combinant les preuves.",
      {});
  }
]), ["Le casse-tête : des connaissances détaillées sur un endroit que personne ne peut voir. Quels outils fournissent les preuves?", "Le sonar est l'outil de cartographie. Ajoute une autre technologie et dis ce qu'elle ajoute."]);

/* ---------- SC8.2.3 L'amélioration des technologies du plancher océanique ---------- */

E("s8f-u1-tech-change", 1, ["SC8.2.3"], 2, "var", varset([
  function () {
    return mcq("Les premiers chercheurs sur les océans mesuraient la profondeur en laissant descendre un fil lesté par-dessus bord et en notant sa longueur quand il atteignait le fond. Les navires modernes utilisent le sonar à la place. Quelle est la principale amélioration?",
      "Le sonar produit un enregistrement continu de la profondeur à mesure que le navire avance, donc un profil entier de bassin peut être cartographié plutôt que des profondeurs isolées et dispersées",
      ["Le sonar ne fonctionne que dans l'eau côtière peu profonde près du rivage, là où les vieux fils lestés ne pouvaient jamais atteindre le fond sous le navire",
       "Le sonar supprime le besoin d'un navire dans les travaux de profondeur, parce que ses signaux peuvent être envoyés de la rive plutôt que d'un bâtiment",
       "Les fils lestés étaient bien plus précis que le sonar ne l'est jamais; le sonar est utilisé sur les navires aujourd'hui seulement parce qu'il est le moins coûteux des deux méthodes"],
      "Un fil lesté donne une profondeur à un endroit, lentement. Le sonar chronomètre les échos sonores en continu à mesure que le navire voyage, produisant un profil suivi du plancher. L'amélioration tient à la quantité et à la continuité des preuves, et c'est ce qui a transformé des sondages dispersés en cartes de bassins.",
      {});
  }
]), ["Compare ce que chaque méthode livre : un point à la fois, ou un enregistrement continu?", "Plus de preuves, recueillies plus vite : voilà le modèle d'amélioration dans ce volet."]);

E("s8f-u1-tech-improve", 1, ["SC8.2.3"], 1, "var", varset([
  function () {
    return mcq("Comment les submersibles océaniques ont-ils amélioré la plongée pour la recherche sur les océans?",
      "Les submersibles transportent les chercheurs et les instruments bien plus profondément et plus longtemps que le corps et la réserve d'air d'un plongeur ne le permettent",
      ["Les submersibles sont plus petits, plus simples et moins coûteux que l'équipement que les plongeurs doivent transporter avec eux",
       "Les submersibles ont remplacé le besoin de tout navire de surface pour soutenir le travail de recherche fait en dessous",
       "Les plongeurs peuvent maintenant rester en bas aussi longtemps que les submersibles, en utilisant l'équipement de plongée ordinaire"],
      "La plongée est limitée par le corps humain et sa réserve d'air, donc elle sert à l'eau peu profonde. Les submersibles océaniques protègent leurs équipages de la pression et transportent des instruments, ouvrant le plancher océanique profond à la recherche directe. Le modèle est le même pour tout cet indicateur : chaque génération de technologie étend où et combien de temps les scientifiques peuvent recueillir des preuves.",
      {});
  }
]), ["Qu'est-ce qui limite un plongeur? La profondeur et l'air. Que fait un submersible au sujet de ces limites?", "L'amélioration ici veut dire atteindre des endroits et des profondeurs qui étaient fermés auparavant."]);

/* ---------- SC8.2.4 Les technologies qui limitent les dommages des vagues et des marées ---------- */

E("s8f-u1-protection", 1, ["SC8.2.4"], 1, "gen", function () {
  var cases = [
    { q: "Un port construit un mur de roche dans l'eau, devant les quais, pour que les vagues qui arrivent s'y brisent et perdent leur énergie. Quelle est cette structure?", k: "Un brise-lames", w: ["Une jetée utilisée comme quai", "Un mur de protection construit le long de la plage", "La plantation de végétation"] },
    { q: "Une communauté plante des herbes et des arbustes le long de son rivage pour que leurs racines retiennent le sol contre le lavage des vagues. Quelle méthode de protection est-ce?", k: "La végétation", w: ["Un brise-lames", "Des rochers placés contre le quai", "Un mur de protection"] },
    { q: "Des ouvriers entassent de très gros rochers contre la face d'un quai pour absorber la force des vagues de tempête. Quelle méthode de protection est-ce?", k: "De gros rochers placés contre le quai", w: ["Un brise-lames", "La reconfiguration du littoral", "La végétation"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les technologies conçues pour limiter les dommages causés par les vagues et les marées comprennent les brise-lames, les jetées et les quais, la végétation, les murs de protection, la reconfiguration du littoral, et de gros rochers placés contre les quais. Chacune brise l'énergie des vagues avant qu'elle arrive ou retient le rivage contre elle.",
    {});
}, ["Imagine où la structure se trouve : dans l'eau, le long du rivage, ou des racines vivantes dans le sol.", "Un brise-lames se tient au large et prend l'énergie de la vague en premier."]);

E("s8f-u1-protection-choice", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return mcq("Une ville doit protéger une plage qui est aussi une zone de nidification pour les oiseaux de rivage. Des ingénieurs comparent trois plans : un mur de protection en béton, un brise-lames en roche, et la restauration des herbes de dune qui couvraient autrefois la plage. Le conseil municipal demande quel plan semble le plus efficace pour limiter les dommages avec le moins d'impact sur l'écosystème présent. Quelle réponse est la mieux appuyée?",
      "Restaurer la végétation des dunes, parce que les racines vivantes retiennent le rivage et absorbent le lavage des vagues tout en laissant l'habitat en place",
      ["Le mur de protection en béton, parce que la structure la plus dure a toujours le moins d'impact sur l'environnement",
       "Le brise-lames en roche, parce que toute structure placée au large supprime le besoin de tenir compte de la plage elle-même",
       "Aucun d'eux, parce que toutes les méthodes de protection sont traitées comme également dommageables"],
      "L'activité de comparaison demande de déterminer quelle méthode semble la plus efficace avec le moins d'impact sur l'environnement des écosystèmes présents. La végétation retient le sol avec des racines vivantes, absorbe graduellement l'énergie des vagues et préserve l'habitat que les oiseaux utilisent. Les structures dures protègent les biens mais remplacent ou perturbent l'écosystème du rivage. Le jugement découle du fait de peser ensemble la protection et l'impact.",
      {});
  }
]), ["La question a deux critères : limite-t-elle les dommages, et qu'est-ce qu'elle fait à l'écosystème qui est là?", "Un rivage vivant peut faire les deux travaux; un mur échange l'habitat contre la dureté."]);

E("s8f-u1-cr-protect", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return textq("Une petite communauté côtière a un quai utilisé par les bateaux de pêche et un rivage bas en pente douce qui est inondé pendant les tempêtes d'hiver. Choisis une technologie de protection pour ce rivage et justifie ton choix : dis comment elle limite les dommages des vagues ou des marées, et nomme un inconvénient que la communauté devrait peser. (3 points)",
      ["une technologie nommée comme un brise-lames, un mur de protection, des rochers ou la végétation", "comment elle réduit l'énergie des vagues ou retient le rivage", "un inconvénient comme le coût, l'impact sur l'habitat ou l'entretien"],
      "<b>Réponse modèle :</b> Un brise-lames convient à ce rivage. Construit dans l'eau devant le quai, il force les vagues de tempête qui arrivent à se briser sur les roches et à y dépenser leur énergie, donc l'eau qui atteint le quai et le rivage bas est beaucoup plus calme et les inondations et les dommages sont réduits. L'inconvénient à peser est qu'un brise-lames coûte cher à construire et à entretenir, et qu'il change le mouvement de l'eau le long de ce rivage, ce qui peut déplacer l'endroit où les sédiments se déposent et toucher l'habitat du rivage voisin. (Un mur de protection, des rochers ou la végétation, justifiés selon le même modèle, méritent aussi tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour une technologie nommée qui convient. 1 point pour la façon dont elle limite les dommages (brise l'énergie des vagues, retient le rivage, ou absorbe le lavage). 1 point pour un véritable inconvénient pesé.",
      {});
  }
]), ["Associe la technologie à ce rivage : un quai de travail et une pente basse qui s'inonde.", "Une justification complète a trois parties : le choix, son fonctionnement, et son coût."]);

/* ---------- SC8.2.5 Les effets des technologies marines ---------- */

E("s8f-u1-overfishing", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Les stocks de poissons ont décliné brusquement pendant les décennies où les chalutiers-usines congélateurs se sont répandus dans la flotte. Quel énoncé convient le mieux au traitement de la technologie et de la surpêche?",
      "Les nouvelles technologies ont contribué à la surpêche : des navires plus grands, une meilleure technologie de repérage des poissons et des méthodes de capture plus efficaces permettent aux flottes de prendre les poissons plus vite que les stocks ne peuvent les remplacer",
      ["La technologie a réduit la surpêche, parce que les chalutiers congélateurs gaspillent moins de chaque prise, donc les flottes avaient besoin de prendre beaucoup moins de poissons pour approvisionner les mêmes marchés",
       "La surpêche a été causée seulement par le comportement des poissons eux-mêmes qui changeait, et non par un changement quelconque de la technologie de pêche",
       "Les chalutiers-usines congélateurs ont touché seulement les pêches d'eau douce des lacs et des rivières de l'intérieur du Canada"],
      "Le sujet se limite à l'impact de la technologie de pêche améliorée : les méthodes de capture, la technologie de repérage des poissons et le type de navire. Les chalutiers-usines congélateurs combinent les trois, capturant et transformant d'énormes quantités en mer, et cette capacité est un facteur reconnu du déclin de stocks comme la morue.",
      {});
  }
]), ["Le sujet ici est étroit : la technologie de pêche améliorée. Quel choix reste sur ce point?", "Des navires plus grands, un meilleur repérage, une meilleure capture : la capacité a grandi plus vite que les stocks."]);

E("s8f-u1-invasive", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Le crabe vert européen, une espèce qui n'est pas originaire de cette province, est maintenant établi dans la baie Placentia, et la tunicière violette est apparue à Belleoram. Quelle voie liée à la technologie explique le mieux des introductions comme celles-ci?",
      "Les pétroliers et d'autres navires rejettent l'eau de cale et de ballast qui transporte des organismes étrangers dans les habitats indigènes",
      ["Les cages d'aquaculture rejettent les poissons d'élevage dans la baie, et ces poissons échappés se transforment en crabes et en tunicières avec le temps",
       "Les chalutiers-usines congélateurs transportent les nouvelles espèces dans leurs filets en se déplaçant de port en port le long de la côte",
       "Les turbines marémotrices transportent les organismes par leurs passages d'une baie à une autre baie voisine"],
      "La voie est nommée directement : quand les pétroliers rejettent leur eau de cale, des espèces étrangères peuvent être introduites, mettant en danger les habitats et les organismes indigènes. Le crabe vert dans la baie Placentia et la tunicière violette à Belleoram en sont les exemples locaux.",
      {});
  }
]), ["Les espèces sont arrivées par une eau que les navires transportent et rejettent. Quelle eau est-ce?", "L'eau de cale et de ballast déplace les organismes autour du monde."]);

E("s8f-u1-aquaculture", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Les fermes de moules suspendent de longues lignes de moules en croissance dans une baie. Quel effet négatif sur le milieu marin est décrit pour ce genre d'aquaculture?",
      "Une matière organique accrue, appelée pluie de détritus, tombe des fermes et s'accumule sur le plancher marin",
      ["Les moules filtrent tellement d'eau en se nourrissant que la salinité de la baie monte brusquement en une seule année",
       "Les longues lignes bloquent les courants océaniques et changent le climat de toute la région autour de la baie",
       "Les fermes attirent les chalutiers-usines dans la baie, et les chalutiers surpêchent ensuite les stocks sauvages qui y vivent"],
      "Les effets de l'aquaculture comprennent la libération accidentelle d'organismes d'élevage dans les populations indigènes, la propagation de maladies, et, pour les fermes de moules en particulier, la pluie de détritus : une matière organique accrue qui tombe et s'accumule sur le plancher marin sous la ferme.",
      {});
  }
]), ["L'effet nommé pour les fermes de moules concerne ce qui tombe de la ferme au plancher.", "La pluie de détritus est le terme même utilisé pour le désigner."]);

E("s8f-u1-cr-tech-effects", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return textq("Choisis une technologie marine dans cette liste : chalutiers-usines congélateurs, plateformes de forage pétrolier au large, énergie marémotrice, ou aquaculture. Décris un effet positif et un effet négatif de cette technologie sur les espèces océaniques ou leur milieu, et énonce la balance telle que tu la vois. (3 points)",
      ["un effet positif lié à la technologie", "un effet négatif lié à la technologie", "une balance ou un jugement énoncé"],
      "<b>Réponse modèle :</b> Les plateformes de forage pétrolier au large. Du côté positif, la structure d'une plateforme agit comme un récif artificiel qui abrite les organismes marins, et l'industrie finance la surveillance de l'océan environnant. Du côté négatif, les déversements de pétrole peuvent tuer les oiseaux de mer et endommager les écosystèmes, le forage ravage le plancher océanique et détruit l'habitat marin, et les pétroliers qui desservent les plateformes peuvent introduire des espèces étrangères dans l'eau de cale. En balance, les effets négatifs portent plus loin et durent plus longtemps que l'avantage d'abri, donc la valeur de la technologie dépend d'une prévention stricte des déversements et des dommages à l'habitat. (Toute technologie de la liste, traitée selon le même modèle, mérite tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour un effet positif véritablement lié à la technologie choisie. 1 point pour un effet négatif véritablement lié à elle. 1 point pour une balance énoncée qui découle des deux effets donnés.",
      {});
  }
]), ["Choisis la technologie dont tu peux dire le plus, puis garde les deux effets liés à elle.", "Le troisième point est pour la balance : dis quel côté pèse le plus, à partir de tes deux effets."]);

/* ---------- SC8.2.6 La science ne peut pas tout résoudre ---------- */

E("s8f-u1-sustain-aspects", 1, ["SC8.2.6"], 1, "var", varset([
  function () {
    return mcq("Une proposition d'expansion d'un champ pétrolifère au large est débattue. Un intervenant dit : « Elle apporterait des emplois bien payés à la région, mais un déversement pourrait tuer les oiseaux de mer et endommager l'écosystème pendant des années. » Quelle paire d'aspects du développement durable l'intervenant pèse-t-il?",
      "Économique (les emplois) contre environnemental (le tort aux oiseaux de mer et aux écosystèmes)",
      ["Environnemental (les emplois bien payés) contre économique (le tort causé aux oiseaux de mer)",
       "Social et culturel (les emplois) contre économique (les dommages aux écosystèmes marins)",
       "Scientifique (les emplois) contre technologique (le tort aux oiseaux de mer et aux écosystèmes)"],
      "Les décisions de développement durable pèsent trois aspects : environnemental, économique, et social et culturel. Les emplois sont un effet économique; le tort aux oiseaux de mer et aux écosystèmes est un effet environnemental. L'intervenant pèse exactement le genre de compromis décrit, où une décision satisfait rarement tous les aspects à la fois.",
      {});
  }
]), ["Classe les deux conséquences : les emplois appartiennent à un aspect, les oiseaux de mer à un autre.", "Les trois aspects sont environnemental, économique, et social et culturel."]);

E("s8f-u1-cr-decision", 1, ["SC8.2.6"], 3, "var", varset([
  function () {
    return textq("Une entreprise propose un nouveau développement d'aquaculture dans une baie qui soutient aussi une petite pêche côtière et une communauté qui valorise son mode de vie traditionnel. Présente la décision de la façon dont de telles décisions sont encadrées : donne un effet positif possible et un effet négatif possible, couvrant des aspects différents du développement durable, énonce ta recommandation, et explique pourquoi les connaissances scientifiques et technologiques à elles seules ne peuvent pas régler la question. (4 points)",
      ["un effet positif dans un aspect, comme les emplois économiques", "un effet négatif dans un autre aspect, comme l'environnemental ou le social et culturel", "une recommandation claire", "la science éclaire la décision, mais les valeurs et les compromis la décident"],
      "<b>Réponse modèle :</b> Positivement, le développement pourrait apporter des emplois et un revenu stables à la communauté (économique). Négativement, les poissons d'élevage échappés et les maladies pourraient nuire aux stocks sauvages dont dépend la pêche côtière, et une matière organique accrue pourrait s'accumuler sur le plancher de la baie (environnemental), tandis qu'une baie changée pourrait modifier le mode de vie traditionnel de la communauté (social et culturel). Ma recommandation est de permettre un développement plus petit avec un confinement et une surveillance stricts, parce que cela pèse les emplois contre des protections pour la pêche. Les connaissances scientifiques et technologiques peuvent mesurer les risques et concevoir les mesures de protection, mais elles ne peuvent pas décider quel risque pour la pêche et le mode de vie vaut les emplois : cette pesée des avantages et des inconvénients est une décision pour les parties concernées, et elle ne satisfera pas tout le monde.<br><br><b>Points d'attribution :</b> 1 point pour un effet positif placé dans son aspect. 1 point pour un effet négatif placé dans un aspect différent. 1 point pour une recommandation claire qui découle des effets donnés. 1 point pour avoir expliqué que la science éclaire la décision mais ne peut pas la régler, parce qu'elle repose sur la pesée des valeurs et les compromis.",
      {});
  }
]), ["Structure-la ainsi : les effets d'abord, dans des aspects différents, puis la décision, puis la limite de la science.", "Quatre parties, quatre points : positif, négatif, recommandation, et pourquoi la science seule ne peut pas décider."]);

/* ---------- SC8.3.1 Laboratoire principal : réaliser la procédure sur la salinité ---------- */

E("s8f-u1-lab-procedure", 1, ["SC8.3.1"], 1, "var", varset([
  function () {
    return mcq("Dans le laboratoire principal sur la salinité, un élève étudie comment la salinité influe sur la masse volumique de l'eau en ajoutant des gouttes d'eau douce colorée à un récipient d'eau salée. Quelle étape de procédure est correcte?",
      "Ajouter les gouttes doucement à la surface et observer où l'eau colorée se dépose avant tout brassage",
      ["Brasser le récipient vigoureusement après chaque goutte pour que les deux eaux se mélangent uniformément dans le récipient",
       "Verser l'eau douce rapidement d'une hauteur pour qu'elle plonge directement au fond",
       "Chauffer l'eau salée d'abord pour que l'eau douce s'étale uniformément dans tout le récipient d'un coup"],
      "Le laboratoire étudie comment l'eau douce et l'eau salée interagissent quand elles se rencontrent. L'eau douce colorée doit être ajoutée doucement et observée pendant qu'elle se dépose : elle reste près du haut, parce que l'eau douce est moins dense que l'eau salée. Brasser, verser fort ou chauffer détruirait la superposition même que la procédure est censée révéler.",
      {});
  }
]), ["Le but entier du laboratoire est d'observer où l'eau douce se dépose. Quelle étape protège cette observation?", "Tout ce qui mélange les eaux ruine la recherche."]);

E("s8f-u1-lab-extension", 1, ["SC8.3.1"], 2, "var", varset([
  function () {
    return mcq("Le laboratoire principal se termine en étendant le résultat aux milieux où l'eau douce et l'eau de l'océan se rencontrent. Dans un estuaire, où l'eau d'une rivière s'écoule dans l'océan, quelle disposition le résultat du laboratoire devrait-il prédire?",
      "L'eau douce moins dense de la rivière glisse au-dessus de l'eau salée plus dense qu'elle rencontre",
      ["L'eau douce plus dense descend sous l'eau salée qu'elle rencontre dans l'estuaire",
       "Les deux eaux se mélangent toujours instantanément en une seule couche uniforme de haut en bas",
       "L'eau salée flotte au-dessus de l'eau douce parce qu'elle est la plus chaude des deux"],
      "Le résultat du laboratoire est que l'eau douce, étant moins dense, flotte sur l'eau salée. Étendu à un estuaire, l'eau douce de la rivière glisse au-dessus de l'eau salée de l'océan là où elles se rencontrent, ce qui fait partie de ce qui rend les estuaires des milieux en couches et productifs.",
      {});
  }
]), ["Transporte le résultat du laboratoire dehors : les mêmes deux eaux, maintenant une rivière qui rencontre l'océan.", "L'eau moins dense reste au-dessus, au laboratoire et dans l'estuaire."]);

E("s8f-u1-cr-design-salinity", 1, ["SC8.3.1"], 3, "var", varset([
  function () {
    return textq("Conçois une recherche pour vérifier comment la salinité influe sur la masse volumique de l'eau. Ton plan doit énoncer la question que tu vérifies, la variable que tu changeras, les variables que tu garderas les mêmes, ce que tu observeras ou mesureras, et comment tes observations te permettront de tirer une conclusion. (4 points)",
      ["une question vérifiable sur la salinité et la masse volumique", "la salinité changée pendant que le volume et la température restent les mêmes", "observer où chaque échantillon se dépose ou si un objet flotte plus haut", "une conclusion tirée de la comparaison des échantillons"],
      "<b>Réponse modèle :</b> Question : comment l'augmentation de la salinité de l'eau influe-t-elle sur sa masse volumique? Prépare trois échantillons d'eau avec des quantités mesurées différentes de sel dissous (par exemple aucune, une quantité modérée, et une grande quantité), en gardant le volume de chaque échantillon et sa température les mêmes. Ajoute doucement des gouttes d'eau colorée d'une salinité fixe à chaque échantillon, ou fais flotter le même objet dans chacun, et observe où les gouttes se déposent ou à quelle hauteur l'objet flotte. Si les gouttes se déposent plus bas, ou si l'objet flotte plus bas, dans les échantillons moins salés, la conclusion s'ensuit : augmenter la salinité augmente la masse volumique, parce que l'eau plus salée soutient l'eau ajoutée ou l'objet plus haut.<br><br><b>Points d'attribution :</b> 1 point pour une question vérifiable nommant la salinité et la masse volumique. 1 point pour la salinité comme variable changée. 1 point pour au moins deux variables gardées les mêmes (volume, température, l'objet ou la goutte utilisée). 1 point pour des observations qui se relient à la conclusion (niveau de dépôt ou hauteur de flottaison comparés entre les échantillons).",
      {});
  }
]), ["Planifie-la comme le laboratoire principal : question, variable changée, variables gardées, observations, conclusion.", "Quatre parties méritent les quatre points. Ne saute pas les variables que tu gardes les mêmes."]);

/* ---------- SC8.3.2 Utiliser les outils et les instruments de façon sûre ---------- */

E("s8f-u1-safe-practice", 1, ["SC8.3.2"], 1, "var", varset([
  function () {
    return mcq("Pendant le test de santé de l'eau, un élève s'apprête à transporter un récipient plein d'eau d'étang et un thermomètre en verre à travers la salle. Quel choix est la pratique sûre?",
      "Transporter le récipient à deux mains, marcher lentement, et garder le thermomètre dans son étui jusqu'à ce qu'on en ait besoin au comptoir",
      ["Transporter le récipient d'une main et le thermomètre dans l'autre main pour éviter de faire un deuxième voyage",
       "Courir l'échantillon au comptoir aussi vite que possible pour que les lectures puissent être prises plus tôt",
       "Tenir le thermomètre par son réservoir en marchant dans la salle pour qu'il se réchauffe, prêt à l'emploi au comptoir"],
      "L'utilisation sûre des outils dans les laboratoires de ce volet veut dire protéger à la fois l'élève et les instruments : deux mains pour un récipient plein, une marche lente, et les instruments en verre comme les thermomètres gardés protégés jusqu'à leur utilisation au comptoir. Cette banque porte cette seule question sur la pratique sûre; la manipulation sûre elle-même est évaluée en classe.",
      {});
  }
]), ["Pense à ce qui pourrait se renverser ou se briser, et choisis le choix qui empêche les deux.", "Deux mains, un pas lent, le verre gardé dans son étui."]);

/* ---------- SC8.3.3 Interpréter les tendances dans les données ---------- */

E("s8f-u1-health-figure", 1, ["SC8.3.3"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre l'oxygène dissous mesuré à quatre sites le long d'une rivière. L'eau qui soutient bien les poissons contient un oxygène dissous de 5 mg/L ou plus, montré par la ligne en tirets. Quel site tombe sous ce niveau sain?",
      "Le site C",
      ["Le site A", "Le site B", "Le site D"],
      "En lisant les barres contre la ligne en tirets de 5 mg/L : les sites A, B et D se trouvent au-dessus d'elle, tandis que la barre du site C n'atteint qu'environ 3,5 mg/L, sous le niveau qui soutient bien les poissons. Interpréter des données veut dire comparer les valeurs à la norme qui leur donne leur sens.",
      {});
    q.figure = s8fHealthSVG([{ name: "Site A", value: 8.2 }, { name: "Site B", value: 6.4 }, { name: "Site C", value: 3.5 }, { name: "Site D", value: 7.1 }], "Oxygène dissous", "mg/L", 5);
    return q;
  },
  function () {
    var q = mcq("Le graphique montre l'oxygène dissous mesuré dans quatre étangs. L'eau qui soutient bien les poissons contient un oxygène dissous de 5 mg/L ou plus, montré par la ligne en tirets. Quel étang a le niveau d'oxygène dissous le plus sain?",
      "L'étang W",
      ["L'étang X", "L'étang Y", "L'étang Z"],
      "Les quatre étangs sont comparés à la même ligne en tirets à 5 mg/L. La barre de l'étang W est la plus haute, à environ 9 mg/L, confortablement au-dessus du seuil sain. L'habileté consiste à lire chaque valeur contre la norme, et non à choisir simplement la barre la plus longue sans vérifier la ligne.",
      {});
    q.figure = s8fHealthSVG([{ name: "Étang W", value: 9 }, { name: "Étang X", value: 5.8 }, { name: "Étang Y", value: 4.2 }, { name: "Étang Z", value: 6.6 }], "Oxygène dissous", "mg/L", 5);
    return q;
  }
]), ["Compare chaque barre à la ligne de seuil en tirets, et non seulement les unes aux autres.", "La ligne en tirets est la norme : 5 mg/L."]);

E("s8f-u1-data-relationship", 1, ["SC8.3.3"], 3, "var", varset([
  function () {
    return mcq("Une classe mesure un étang pendant l'été. En juin, l'eau est à 12 degrés Celsius et contient 9,5 mg/L d'oxygène dissous. En juillet, elle est à 18 degrés et contient 8,1 mg/L. En août, elle est à 24 degrés et contient 6,8 mg/L. Quel énoncé interprète correctement la tendance dans ces données?",
      "À mesure que la température de l'eau augmentait, l'oxygène dissous diminuait : l'eau plus chaude contient moins d'oxygène dissous",
      ["À mesure que la température de l'eau augmentait pendant l'été, l'oxygène dissous augmentait au même rythme qu'elle",
       "La température et l'oxygène dissous sont restés à un total fixe additionnés ensemble pendant tout l'été",
       "Les données ne montrent aucune relation du tout, parce que trois mesures sont trop peu nombreuses pour en lire une tendance"],
      "En lisant les paires en ordre : 12 degrés avec 9,5 mg/L, 18 avec 8,1, 24 avec 6,8. Chaque hausse de température vient avec une baisse d'oxygène, une tendance inverse constante. C'est la relation utilisée dans la chaîne d'exemple : l'eau plus chaude contient moins d'oxygène dissous.",
      {});
  }
]), ["Associe chaque température à sa valeur d'oxygène et lis les paires en ordre.", "Les deux nombres bougent chaque mois. Bougent-ils ensemble ou dans des directions opposées?"]);

/* ---------- SC8.3.4 Communiquer les questions et les résultats ---------- */

E("s8f-u1-conclusion-statement", 1, ["SC8.3.4"], 1, "var", varset([
  function () {
    return mcq("Une élève doit écrire le résultat de la recherche sur la salinité dans ses notes en une phrase claire. Quelle phrase communique le mieux le résultat?",
      "L'eau douce colorée a flotté sur l'eau salée, ce qui montre que l'eau douce est moins dense que l'eau salée",
      ["Le laboratoire était intéressant et l'eau a fait ce que nous pensions",
       "Nous avons mis des gouttes et nous les avons regardées pendant un moment",
       "L'eau salée et l'eau douce sont toutes les deux de l'eau, donc le laboratoire a montré qu'elles sont pareilles"],
      "Communiquer un résultat veut dire énoncer ce qui a été observé et ce que cela montre, en une phrase qu'un lecteur qui a manqué le laboratoire peut utiliser. Le premier choix rapporte l'observation (l'eau douce a flotté) et la conclusion qu'elle soutient (l'eau douce est moins dense). Les autres sont vagues, ou contredisent l'observation.",
      {});
  }
]), ["Une bonne phrase de résultat a deux parties : ce qui a été vu, et ce que cela montre.", "Les phrases vagues et les phrases contredites déçoivent toutes les deux le lecteur."]);

E("s8f-u1-cr-results-summary", 1, ["SC8.3.4"], 2, "var", varset([
  function () {
    return textq("Un groupe a testé quatre échantillons d'un ruisseau pour le laboratoire sur la santé de l'eau. Leurs résultats : oxygène dissous 7,8 mg/L; phosphates 6 microgrammes par litre; pH 6,4; l'eau était légèrement trouble. Intervalles sains du laboratoire : oxygène dissous 5 mg/L ou plus; phosphates moins de 10 microgrammes par litre; pH entre 5 et 8,5. Écris un court résumé des résultats pour le rapport du groupe : énonce chaque résultat contre son intervalle sain et donne la conclusion générale. (3 points)",
      ["chaque mesure comparée à son intervalle sain", "les trois facteurs mesurés dans l'intervalle", "conclusion générale que l'eau du ruisseau est saine, avec le trouble noté"],
      "<b>Réponse modèle :</b> L'oxygène dissous, 7,8 mg/L, est au-dessus du minimum sain de 5 mg/L. Les phosphates, 6 microgrammes par litre, sont sous la limite saine de 10. Le pH, 6,4, se trouve dans l'intervalle sain de 5 à 8,5. L'eau était légèrement trouble, une observation de turbidité qui vaut la peine d'être notée. En général, les trois facteurs mesurés se trouvent dans leurs intervalles sains, donc les résultats soutiennent la conclusion que l'eau de ce ruisseau est en état sain pour les espèces testées.<br><br><b>Points d'attribution :</b> 1 point pour au moins deux mesures énoncées contre leurs intervalles sains. 1 point pour la troisième mesure et l'observation de turbidité incluses. 1 point pour une conclusion générale qui découle des comparaisons.",
      {});
  }
]), ["Un résumé de résultats compare; il ne fait pas que lister. Place chaque nombre à côté de son intervalle sain.", "Termine par la conclusion générale que les comparaisons soutiennent."]);

/* ---------- SC8.3.5 Énoncer une conclusion sur la salinité et la masse volumique ---------- */

E("s8f-u1-lab-conclusion", 1, ["SC8.3.5"], 1, "var", varset([
  function () {
    return mcq("Dans le laboratoire principal, l'eau douce colorée ajoutée doucement à l'eau salée reste en une couche près du haut au lieu de se mélanger ou de couler. Quelle conclusion sur la salinité et la masse volumique cette observation soutient-elle?",
      "Augmenter la salinité augmente la masse volumique, donc l'eau douce moins salée flotte sur l'eau salée plus dense",
      ["Augmenter la salinité diminue la masse volumique, donc l'eau douce flotte parce qu'elle est plus dense",
       "La salinité n'a aucun effet sur la masse volumique; le colorant retient l'eau douce en haut",
       "L'eau douce et l'eau salée ont une masse volumique égale, et la couche est temporaire"],
      "La conclusion énoncée du laboratoire principal : la salinité influe sur la masse volumique. Le sel dissous rend l'eau plus dense, donc l'eau douce ajoutée doucement à l'eau salée flotte au-dessus d'elle. La superposition est la preuve; la différence de masse volumique est la conclusion.",
      {});
  }
]), ["L'observation est la superposition. Quelle disposition des masses volumiques produit une superposition avec l'eau douce au-dessus?", "L'eau qui flotte est la moins dense."]);

E("s8f-u1-conclusion-judge", 1, ["SC8.3.5"], 2, "var", varset([
  function () {
    return mcq("Un élève fait flotter le même bloc de bois dans trois réservoirs : de l'eau douce, de l'eau légèrement salée, et de l'eau très salée. Le bloc flotte le plus bas dans l'eau douce et le plus haut dans l'eau très salée. Quelle conclusion ces observations soutiennent-elles?",
      "À mesure que la salinité augmente, la masse volumique augmente, donc le bloc est soutenu plus haut dans l'eau plus salée",
      ["À mesure que la salinité augmente, le bloc lui-même devient plus léger, donc il flotte plus haut dans le réservoir",
       "Le bloc flotte plus haut dans l'eau salée simplement parce que l'eau salée est toujours l'eau la plus chaude",
       "Aucune conclusion n'est possible à partir du test, parce que le bloc n'a pas été pesé avant d'être mis à flotter"],
      "Le même bloc, avec la même masse, flotte à des hauteurs différentes, donc la différence doit être dans l'eau. Flotter plus haut veut dire que l'eau le soutient plus fortement, et c'est ce que fait une plus grande masse volumique. Les observations soutiennent la conclusion que la salinité augmente la masse volumique, la même conclusion que le laboratoire principal, atteinte par une observation différente.",
      {});
  }
]), ["Le bloc ne change jamais. Qu'est-ce qui change d'un réservoir à l'autre, et qu'est-ce que cela doit faire?", "La hauteur de flottaison est la preuve; la masse volumique est l'explication."]);

/* ---------- SC8.3.6 Identifier les effets des facteurs abiotiques (habiletés) ---------- */

E("s8f-u1-abiotic-identify", 1, ["SC8.3.6"], 1, "var", varset([
  function () {
    return mcq("Une équipe de terrain note ceci à propos d'un lac : après des semaines sans pluie, le niveau de l'eau a baissé et les zones peu profondes où les grenouilles pondaient leurs œufs sont à sec. Quel facteur abiotique l'équipe devrait-elle consigner comme celui qui a changé?",
      "La quantité d'eau disponible dans le lac",
      ["La population de grenouilles du lac",
       "Le nombre de prédateurs dans le lac",
       "Les plantes qui poussent au bord du lac"],
      "La quantité d'eau est un facteur abiotique : un élément non vivant du milieu. Les grenouilles, leurs prédateurs et les plantes sont des êtres vivants, donc des facteurs biotiques, et ce sont eux qui subissent le changement plutôt que de le causer ici. Identifier le facteur abiotique est la première étape avant d'expliquer ses effets.",
      {});
  },
  function () {
    return mcq("Un rapport de terrain indique qu'un déversement en amont a rendu l'eau d'une rivière laiteuse pendant des jours, et que les plantes du fond ont commencé à jaunir. Quel facteur abiotique le rapport identifie-t-il par son effet?",
      "La turbidité, par la lumière qu'elle bloque",
      ["L'oxygène dissous, par l'air qu'elle ajoute",
       "Les phosphates, par les sels qu'ils retirent",
       "La température, par la chaleur qu'elle libère"],
      "Une eau laiteuse est une eau trouble : la turbidité. Les particules en suspension bloquent la lumière du soleil, et les plantes du fond jaunissent faute de lumière. Chaque autre facteur agit par un mécanisme différent qui ne correspond pas à une eau laiteuse.",
      {});
  }
]), ["Cherche l'élément non vivant de la description : c'est le facteur abiotique.", "Les êtres vivants subissent le changement; le facteur abiotique est la condition qui a changé."]);

E("s8f-u1-abiotic-measure-choice", 1, ["SC8.3.6"], 2, "var", varset([
  function () {
    return mcq("Une classe veut vérifier si les poissons d'un ruisseau sont stressés par un rejet d'eau chaude d'une usine. Quelle mesure cible directement le facteur abiotique en cause et son mécanisme?",
      "Mesurer la température et l'oxygène dissous en amont et en aval du rejet, parce que l'eau chaude contient moins d'oxygène dissous",
      ["Mesurer seulement le pH en aval du rejet, parce que l'eau chaude est toujours beaucoup plus acide que l'eau froide",
       "Compter les plantes sur la rive près du rejet, parce que les plantes mesurent directement l'oxygène de l'eau",
       "Mesurer la turbidité une seule fois au rejet, parce qu'une eau trouble est le signe certain d'un stress thermique"],
      "Le facteur en cause est la température, et son mécanisme est l'oxygène : l'eau chaude contient moins d'oxygène dissous. Mesurer la température et l'oxygène des deux côtés du rejet vérifie à la fois le facteur et le mécanisme, et la comparaison amont et aval isole l'effet de l'usine.",
      {});
  }
]), ["Nomme le facteur, puis son mécanisme, puis choisis les mesures qui vérifient les deux.", "La comparaison amont et aval est ce qui isole l'effet du rejet."]);

/* ---------- SC8.3.7 Choisir des méthodes et des outils qui conviennent ---------- */

E("s8f-u1-tool-choice", 1, ["SC8.3.7"], 1, "var", varset([
  function () {
    return mcq("Pour le test de santé de l'eau, un groupe doit mesurer à quel point un échantillon d'étang est trouble, puisque la turbidité est l'un des facteurs abiotiques vérifiés. Quel choix d'outil convient au travail?",
      "Un tube ou un disque de turbidité, qui mesure jusqu'où la lumière pénètre l'échantillon",
      ["Un thermomètre, lu soigneusement à l'ombre au bord de l'étang à côté de l'échantillon",
       "Une trousse de test de pH, utilisée deux fois sur le même échantillon pour être sûr de la lecture du trouble",
       "Un appareil de mesure de l'oxygène dissous, réglé sur son échelle de trouble pour lire l'échantillon d'étang"],
      "Choisir un outil veut dire l'associer à la quantité mesurée. La turbidité est le trouble, le blocage de la lumière par les particules en suspension, donc elle se mesure par jusqu'où la lumière ou un disque marqué peut être vu à travers l'eau. Les thermomètres mesurent la température, les trousses de pH mesurent l'acidité, et les appareils d'oxygène mesurent l'oxygène dissous.",
      {});
  }
]), ["Associe l'outil à la quantité : la turbidité concerne la lumière qui traverse l'eau.", "Chacun des autres outils mesure un facteur différent du même laboratoire."]);

E("s8f-u1-method-choice", 1, ["SC8.3.7"], 2, "var", varset([
  function () {
    return mcq("On demande à une classe de juger la santé de l'eau d'un étang entier, et non d'un seul endroit. Quelle méthode donne l'image la plus fiable?",
      "Prélever des échantillons à plusieurs endroits autour de l'étang et à travers celui-ci et faire la moyenne des résultats pour chaque facteur",
      ["Prélever un échantillon à l'endroit le plus facile à atteindre et le tester très soigneusement",
       "Échantillonner seulement là où l'eau semble la plus sale, puisque c'est là que les problèmes se montreraient",
       "Demander à un élève qui se baigne dans l'étang de décrire l'eau"],
      "Un étang n'est pas uniforme : les entrées d'eau, l'ombre, la profondeur et la végétation changent les conditions d'un endroit à l'autre. Échantillonner plusieurs endroits et faire la moyenne donne une image de l'étang entier et protège la conclusion contre un seul endroit inhabituel. Tester soigneusement un seul échantillon commode ne décrit toujours que cet échantillon.",
      {});
  }
]), ["La question concerne l'étang entier. Quelle méthode couvre vraiment l'étang entier?", "Un échantillon soigneux reste un seul échantillon."]);

/* ---------- SC8.3.8 Préparer un exposé et évaluer les procédures ---------- */

E("s8f-u1-threshold-judge", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return mcq("Un échantillon d'eau douce donne ces résultats : oxygène dissous 4,1 mg/L, phosphates 6 microgrammes par litre, pH 6,8. Intervalles sains : oxygène dissous 5 mg/L ou plus; phosphates moins de 10 microgrammes par litre; pH de 5 à 8,5. Quel jugement est correct?",
      "L'oxygène dissous est sous son intervalle sain, tandis que les phosphates et le pH sont dans les leurs, donc l'eau pourrait ne pas bien soutenir les poissons",
      ["Les trois facteurs sont dans leurs intervalles sains, tandis qu'aucun ne manque sa limite, donc l'échantillon montre que l'eau est saine pour les poissons",
       "Les phosphates sont au-dessus de leur limite saine, tandis que l'oxygène et le pH sont dans les leurs, et c'est le principal problème que montre cet échantillon d'eau",
       "Le pH est en dehors de son intervalle sain, tandis que l'oxygène dissous et les phosphates sont dans les leurs, et c'est le principal problème que montre cet échantillon"],
      "Compare chaque valeur à son intervalle. L'oxygène dissous à 4,1 mg/L est sous le minimum de 5 mg/L. Les phosphates à 6 sont sous la limite de 10, et le pH 6,8 se trouve dans l'intervalle de 5 à 8,5. Seul l'oxygène échoue, et un faible oxygène est ce qui limite les poissons que l'eau peut soutenir.",
      {});
  }
]), ["Juge les trois valeurs une à la fois contre leurs intervalles avant de choisir.", "Une seule des trois valeurs manque son intervalle. Trouve-la."]);

E("s8f-u1-cr-pond-data", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return textq("Une classe fait rapport sur un étang. Résultats : oxygène dissous 3,8 mg/L (sain : 5 ou plus); phosphates 14 microgrammes par litre (sain : moins de 10); pH 6,1 (sain : de 5 à 8,5); l'eau était visiblement trouble après la pluie. Écris les conclusions du groupe : identifie chaque facteur qui se trouve en dehors de son intervalle sain, et explique ce que les résultats combinés suggèrent sur la capacité de l'étang à soutenir les poissons et les plantes aquatiques. (3 points)",
      ["l'oxygène dissous et les phosphates en dehors de leurs intervalles, le pH dans le sien", "un faible oxygène limite les poissons", "les algues nourries par les phosphates et la turbidité réduisent la lumière pour les plantes"],
      "<b>Réponse modèle :</b> Deux facteurs se trouvent en dehors de leurs intervalles sains. L'oxygène dissous, à 3,8 mg/L, est sous le minimum sain de 5 mg/L, donc l'étang pourrait ne pas bien soutenir les poissons. Les phosphates, à 14 microgrammes par litre, sont au-dessus de la limite saine de 10, ce qui nourrit une croissance excessive des algues. Le pH, 6,1, est dans son intervalle sain. Avec le trouble après la pluie (la turbidité qui bloque la lumière), les résultats suggèrent un étang sous stress : les poissons sont limités par le faible oxygène, et les plantes aquatiques sont serrées à la fois par la turbidité et par les algues que les phosphates nourrissent.<br><br><b>Points d'attribution :</b> 1 point pour avoir identifié l'oxygène dissous et les phosphates comme en dehors de leurs intervalles et le pH comme dans le sien. 1 point pour la conséquence pour les poissons (faible oxygène). 1 point pour la conséquence pour les plantes (lumière réduite par la turbidité et les algues nourries par les phosphates).",
      {});
  }
]), ["Fais rapport facteur par facteur d'abord, puis combine-les dans l'image générale de l'étang.", "Deux facteurs échouent à leurs intervalles. La conclusion les relie."]);

E("s8f-u1-process-evaluate", 1, ["SC8.3.8"], 3, "var", varset([
  function () {
    return mcq("Un groupe a évalué sa recherche sur la santé de l'eau par la suite. Son plan avait été : un échantillon, prélevé au bord de l'étang un après-midi, testé une fois pour chaque facteur. Son rapport a conclu que l'étang entier était malsain parce que la lecture d'oxygène était basse. Quelle évaluation de son processus est la plus juste?",
      "Le processus était trop faible pour la conclusion : un seul échantillon du bord en un jour ne peut pas représenter l'étang entier, et une seule lecture basse aurait dû être vérifiée par des échantillons répétés avant de conclure",
      ["Le processus était solide du début à la fin et n'a besoin d'aucune amélioration, parce que le groupe a utilisé le bon test pour chaque facteur et consigné chaque résultat soigneusement dans ses cahiers de laboratoire",
       "La seule faiblesse de tout son processus était d'avoir prélevé l'échantillon l'après-midi plutôt que le matin du même jour, quand le niveau d'oxygène de l'étang aurait pu lire différemment",
       "Le processus lui-même était faible d'une seule façon qui compte : le groupe a écrit la conclusion avec trop de confiance pour la seule série de lectures qu'il avait prise à l'étang cet après-midi-là"],
      "Évaluer un processus veut dire juger si le plan pouvait soutenir la conclusion qu'on en a tirée. Un échantillon d'un seul bord en un seul jour décrit cet endroit à ce moment, et non l'étang entier, et une seule lecture surprenante appelle des répétitions. Les tests eux-mêmes étaient bons; le plan d'échantillonnage et le saut vers une conclusion sur l'étang entier étaient les faiblesses.",
      {});
  }
]), ["Juge le plan contre la taille de la conclusion : un échantillon, un étang entier.", "Des tests corrects ne peuvent pas sauver un échantillon non représentatif."]);

/* ---------- SC8.3.9 Les tendances des populations à partir de graphiques ---------- */

E("s8f-u1-pop-interpolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans. Estime le décompte en 2021, une année entre les mesures.",
      "Environ 185",
      ["Environ 160", "Environ 210", "Environ 240"],
      "Interpoler veut dire estimer entre des points connus. Le décompte de 2020 est 160 et celui de 2022 est 210, donc 2021 se trouve entre eux, environ à leur point milieu, 185. Lire une année mesurée (160 ou 210) n'est pas une interpolation.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [120, 160, 210, 250], "Individus décomptés");
    return q;
  },
  function () {
    var q = mcq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans. Estime le décompte en 2023, une année entre les mesures.",
      "Environ 175",
      ["Environ 150", "Environ 160", "Environ 200"],
      "Le décompte de 2022 est 150 et celui de 2024 est 200. L'année entre les deux, 2023, est estimée environ au point milieu, 175. C'est l'interpolation : estimer une valeur à l'intérieur de l'intervalle mesuré.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [90, 130, 150, 200], "Individus décomptés");
    return q;
  }
]), ["L'année voulue se trouve entre deux années mesurées. Sa valeur se trouve entre leurs valeurs aussi.", "Prends le point milieu des deux décomptes voisins."]);

E("s8f-u1-pop-extrapolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre le décompte d'une espèce marine qui augmente régulièrement de 2019 à 2023. Si la tendance continue au même rythme, quelle est la meilleure prévision pour 2024?",
      "Environ 250",
      ["Environ 220", "Environ 235", "Environ 280"],
      "Les décomptes augmentent d'environ 30 chaque année : 100, 130, 160, 190, 220. Extrapoler continue le motif un pas au-delà des données, donnant environ 250 pour 2024. L'extrapolation suppose que la tendance continue, ce qui explique pourquoi c'est une prévision, et non une lecture.",
      {});
    q.figure = s8fPopGraphSVG([2019, 2020, 2021, 2022, 2023], [100, 130, 160, 190, 220], "Individus décomptés");
    return q;
  },
  function () {
    var q = mcq("Le graphique montre le décompte d'une espèce marine qui diminue régulièrement de 2019 à 2023. Si la tendance continue au même rythme, quelle est la meilleure prévision pour 2024?",
      "Environ 150",
      ["Environ 120", "Environ 180", "Environ 200"],
      "Les décomptes diminuent d'environ 30 chaque année : 300, 270, 240, 210, 180. Continuer la tendance une année de plus donne environ 150. C'est l'extrapolation : prolonger le motif au-delà des années mesurées.",
      {});
    q.figure = s8fPopGraphSVG([2019, 2020, 2021, 2022, 2023], [300, 270, 240, 210, 180], "Individus décomptés");
    return q;
  }
]), ["Trouve le pas annuel dans les données, puis fais un pas de plus de la même taille.", "L'extrapolation prolonge la tendance; elle ne répète pas la dernière valeur."]);

E("s8f-u1-cr-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    var q = textq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans de 2018 à 2024. (a) Interpole : estime le décompte en 2021. (b) Extrapole : prévois le décompte en 2026 si la tendance continue. (c) Énonce l'hypothèse dont ta prévision dépend. (3 points)",
      ["2021 environ 130, entre 110 et 150", "2026 environ 230, en continuant l'augmentation d'environ 40 tous les deux ans", "la prévision suppose que les conditions et la tendance restent les mêmes"],
      "<b>Réponse modèle :</b> (a) Le décompte de 2020 est 110 et celui de 2022 est 150, donc le décompte de 2021 est estimé entre eux, à environ 130. (b) Les décomptes augmentent d'environ 40 tous les deux ans (80, 110, 150, 190, avec des pas de deux ans de 30, 40, 40), donc continuer la tendance donne environ 230 en 2026. (c) La prévision suppose que les conditions qui poussent l'augmentation restent les mêmes : si la nourriture, les prédateurs, la pression de pêche ou les conditions de l'eau changent, la tendance peut se briser, ce qui explique pourquoi une extrapolation est une prévision plutôt qu'une mesure.<br><br><b>Points d'attribution :</b> 1 point pour une interpolation d'environ 130 (accepter de 125 à 135). 1 point pour une extrapolation d'environ 230 (accepter de 220 à 240) à partir de la tendance. 1 point pour l'hypothèse que les conditions et la tendance continuent sans changement.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [80, 110, 150, 190], "Individus décomptés");
    return q;
  }
]), ["La partie (a) lit entre les points; la partie (b) prolonge le motif; la partie (c) nomme ce qui pourrait le briser.", "Les pas de deux ans dans les décomptes sont ton guide pour les deux estimations."]);

E("s8f-u1-temp-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    return mcq("Une classe trace deux graphiques pour la même baie sur huit ans : la température moyenne de l'eau en été, qui augmente régulièrement, et la population d'une espèce de poisson d'eau froide, qui diminue régulièrement. Elle sait aussi que la pression de pêche est restée à peu près la même. Quelle suggestion convient le mieux à la démarche de mise en relation des graphiques?",
      "La hausse de température est une cause suggérée raisonnable du déclin, parce que l'eau plus chaude contient moins d'oxygène dissous, mais les graphiques à eux seuls montrent une relation, et non une preuve, et d'autres facteurs changeants devraient être vérifiés",
      ["Les deux graphiques ensemble prouvent carrément que la hausse de température a causé le déclin, donc aucun autre facteur changeant dans la baie n'a besoin d'être vérifié avant de conclure",
       "Aucune relation ne peut jamais être suggérée à partir des graphiques, parce que les deux graphiques mesurent des choses différentes, et des mesures différentes ne peuvent jamais être comparées de façon utile",
       "Le déclin de la population de poissons doit lui-même avoir causé la hausse de température de la baie, puisque le graphique de la population baisse régulièrement à mesure que le graphique de la température monte sur les mêmes années"],
      "Comparer les graphiques de population aux graphiques de température et suggérer des relations possibles est exactement l'activité prévue. La suggestion gagne en force d'un mécanisme, l'eau chaude qui contient moins d'oxygène, et du fait que la pression de pêche est restée stable. Mais deux tendances qui bougent ensemble montrent une relation, et non une preuve : une suggestion honnête nomme le mécanisme et garde la porte ouverte à d'autres facteurs.",
      {});
  }
]), ["Une relation suggérée a besoin de deux choses : un mécanisme, et de l'honnêteté sur ce que les graphiques ne peuvent pas prouver.", "La chaîne d'exemple passe par l'oxygène dissous."]);

/* ---------- SC8.3.10 Les forces et les faiblesses des technologies du plancher océanique ---------- */

E("s8f-u1-tech-strength", 1, ["SC8.3.10"], 2, "var", varset([
  function () {
    return mcq("Quel appariement donne une véritable force et une véritable faiblesse du sonar pour étudier le plancher océanique?",
      "Force : il cartographie la forme du plancher sur des bassins entiers à partir d'un navire en mouvement. Faiblesse : il montre la forme, et non de quoi le plancher est fait ni ce qui y vit",
      ["Force : il photographie les organismes qui vivent dans l'obscurité totale sur tout le plancher. Faiblesse : il ne fonctionne que dans l'eau côtière peu profonde près du rivage",
       "Force : il transporte les chercheurs jusqu'au plancher lui-même pour y travailler directement. Faiblesse : il met son équipage en danger en travaillant à grande profondeur",
       "Force : il mesure la température de l'eau à n'importe quelle profondeur sous le navire. Faiblesse : il ne peut pas détecter le plancher océanique du tout, à aucune profondeur"],
      "Juger une technologie veut dire apparier ce qu'elle fait bien avec ce qu'elle ne peut pas faire. La force du sonar est sa couverture : des lectures continues de profondeur à partir d'un navire en mouvement deviennent des cartes de bassins. Sa faiblesse est que les échos donnent la forme seulement; la composition et la vie sur le plancher exigent d'autres technologies, comme l'échantillonnage, la photographie et les submersibles.",
      {});
  }
]), ["Vérifie chaque moitié de l'appariement séparément : la force est-elle réelle, et la faiblesse est-elle réelle?", "Le sonar donne la forme. Il ne donne ni la composition ni la vie."]);

E("s8f-u1-tech-weakness", 1, ["SC8.3.10"], 1, "var", varset([
  function () {
    return mcq("Les submersibles océaniques ont transformé la recherche sur le plancher océanique, mais ils ont une véritable limite. Quel énoncé la nomme?",
      "Ils coûtent cher, transportent seulement quelques personnes, et peuvent rester en profondeur pour un temps limité, donc ils n'échantillonnent que de minuscules parties du plancher",
      ["Ils ne peuvent pas descendre sous le bord du plateau continental dans le bassin océanique profond au-delà, quelle que soit la durée de la plongée ou la taille de l'équipage à bord",
       "Ils perturbent tellement l'eau autour d'eux que le sonar ne peut pas être utilisé près d'eux pendant une plongée, et leurs lectures de profondeur sont perdues pour tout le bassin",
       "Ils ne peuvent travailler que les jours où la surface de l'océan est complètement calme d'une rive à l'autre, et chaque plongée exige des semaines de préparation au port d'attache"],
      "Les submersibles atteignent le plancher profond directement, ce qu'aucune autre technologie ne fait avec des personnes à bord, mais chaque plongée coûte cher, est brève et petite en équipage et en couverture. C'est pourquoi ils complètent plutôt qu'ils ne remplacent les outils à grande couverture comme le sonar : la force de l'un couvre la faiblesse de l'autre.",
      {});
  }
]), ["La limite concerne l'échelle : le coût, l'équipage et le temps, et non si la technologie fonctionne.", "Un submersible visite une minuscule parcelle de plancher à la fois."]);

/* ---------- SC8.3.11 Rechercher l'érosion et la formation de dépôts (scénarios distincts) ---------- */

E("s8f-u1-research-landform", 1, ["SC8.3.11"], 1, "var", varset([
  function () {
    return mcq("Pour un rapport, une élève rassemble des notes de recherche sur un cordon littoral, une longue crête étroite de sable qui s'avance dans une baie à partir du rivage. Selon ses notes, quel processus explique le cordon?",
      "La formation de dépôts : les vagues et les courants qui longent le rivage déposent le sable là où l'eau ralentit, construisant la crête",
      ["L'érosion : les vagues creusent le rivage et laissent la crête de sable debout comme le reste d'un rivage plus ancien",
       "La glaciation : la glace en recul a laissé la crête de sable derrière elle quand elle a fondu loin de la baie",
       "L'action des volcans : la matière du plancher océanique a été poussée vers le haut pour former la crête sous l'eau"],
      "Un cordon littoral est une forme de relief de dépôts. Les vagues et les courants littoraux transportent le sable le long du rivage et le déposent là où l'eau perd de sa vitesse, par exemple là où le rivage tourne dans une baie, construisant une crête de sédiments. Les formes d'érosion comme les grottes et les arches sont creusées dans la roche, et non construites de sable déposé.",
      {});
  }
]), ["Une crête faite de sable déposé ou de roche creusée? Le matériau donne la réponse.", "Le sable transporté le long du rivage doit aller quelque part quand l'eau ralentit."]);

E("s8f-u1-research-judge", 1, ["SC8.3.11"], 3, "var", varset([
  function () {
    return mcq("Deux sources décrivent la même plage. La source 1, un relevé côtier mesuré sur vingt ans, montre que la plage a gagné deux mètres de largeur et nomme les courants littoraux qui déposent le sable. La source 2, un dépliant touristique, dit que la plage « a toujours été exactement ainsi ». Un rapport doit expliquer pourquoi la plage grandit. Quelle utilisation des sources est la mieux justifiée?",
      "S'appuyer sur le relevé : ses mesures sur vingt ans montrent le changement et son explication par les dépôts nomme un processus qui correspond aux formes de relief de dépôts de la plage",
      ["S'appuyer sur le dépliant : un énoncé imprimé sur la plage elle-même l'emporte sur des mesures prises par des étrangers sur vingt ans",
       "Utiliser les deux également : chaque source imprimée compte autant, qu'elle donne des mesures ou non",
       "N'utiliser aucune des deux : une plage qui grandit ne peut être expliquée par aucun processus connu, donc le rapport devrait seulement la décrire"],
      "Rechercher veut dire peser les sources selon ce qu'elles peuvent soutenir. Le relevé apporte des mesures répétées sur vingt ans et un processus, la formation de dépôts par les courants littoraux, qui correspond à la famille de la forme de relief. Le dépliant affirme sans mesure et contredit le changement mesuré. Une explication de rapport s'appuie sur la source mesurée et nomme le processus qu'elle documente.",
      {});
  }
]), ["Demande ce que chaque source peut réellement soutenir : des mesures et un processus, ou une affirmation sans mesure?", "Le changement mesuré a besoin d'un processus mesuré pour l'expliquer."]);

/* Exclusion de la composition : la question de conception de recherche
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composés. */
var NO_COMPOSE_U1 = { "s8f-u1-cr-design-salinity": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U1[e.id]) { e.noCompose = true; } });

/* Ajouts de l'allongement (20 nov. 2026). */
E("s8f-u1-climat-effets-glaciers", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Le climat d'une région côtière se refroidit pendant des milliers d'années et la neige d'hiver cesse de fondre entièrement l'été. Quel effet à long terme sur les glaciers s'ensuit?",
      "Les glaciers avancent et s'épaississent, car il s'accumule plus de neige qu'il ne s'en perd par la fonte",
      ["Les glaciers reculent très rapidement vers les sommets, car le froid intense empêche la neige fraîche de se transformer en glace compacte", "Les glaciers restent exactement les mêmes, car le climat n'a aucun effet sur leur bilan de masse", "Les glaciers de la région disparaissent complètement en une seule saison chaude, car la neige fraîche accumulée fait fondre toute la vieille glace sous elle"],
      "Quand l'accumulation dépasse la fonte pendant des millénaires, le bilan est positif et le glacier avance. <b>Les glaciers avancent et s'épaississent</b>.", {});
  },
  function () {
    return mcq("Des étés plus chauds font fondre les glaciers d'une chaîne de montagnes plus vite que les hivers ne les reconstruisent. Quel effet à long terme s'ensuit?",
      "Les glaciers reculent et s'amincissent, et leurs eaux de fonte alimentent davantage les rivières en été",
      ["Les glaciers avancent vers les vallées, car la fonte les rend plus légers et plus rapides", "Les glaciers deviennent nettement plus épais et avancent, car toute l'eau de fonte produite en été regèle toujours entièrement à leur surface pendant l'hiver", "Rien ne change du tout dans la vallée, car le niveau et le débit des rivières ne dépendent jamais, en aucune saison, de la fonte des glaciers de montagne"],
      "Fonte supérieure à l'accumulation : le bilan est négatif, le glacier recule et les rivières reçoivent plus d'eau de fonte. <b>Les glaciers reculent et s'amincissent</b>.", {});
  },
  function () {
    return mcq("À la fin de la dernière période glaciaire, le niveau de la mer était beaucoup plus bas qu'aujourd'hui. Quel lien unit ce fait aux glaciers?",
      "Une énorme quantité d'eau était emprisonnée dans les glaciers continentaux au lieu d'être dans les océans",
      ["Les glaciers continentaux flottaient directement sur les océans du monde et les empêchaient physiquement, par leur poids énorme, de monter plus haut qu'aujourd'hui", "L'eau des océans était beaucoup plus froide à cette époque, et l'eau froide occupe toujours un plus grand volume que la même quantité d'eau chaude", "Les glaciers buvaient l'eau de mer par leurs fissures et la gardaient quelques années seulement"],
      "L'eau des glaciers continentaux vient des océans par le cycle de l'eau; quand elle est stockée en glace sur les continents, le niveau marin baisse. <b>Une énorme quantité d'eau était emprisonnée dans les glaciers continentaux</b>.", {});
  },
  function () {
    return mcq("Un glacier de vallée laisse derrière lui, en reculant, une crête de roches et de gravier appelée moraine. Que révèle cette moraine aux scientifiques?",
      "La position la plus avancée que le glacier a atteinte avant de commencer à reculer",
      ["L'âge exact, calculé à l'année près par les scientifiques, auquel le glacier a commencé à se former dans le fond de cette vallée de montagne", "La température moyenne exacte de l'air au-dessus de la vallée pendant chacun des hivers de toute la période glaciaire ancienne", "La profondeur maximale de l'océan qui recouvrait autrefois toute la vallée"],
      "Un glacier dépose ses débris à son front; la moraine marque donc son avancée maximale. <b>La position la plus avancée que le glacier a atteinte</b>.", {});
  }
]), ["Le bilan du glacier : neige ajoutée contre glace fondue. Quel côté gagne?", "Accumulation gagnante = avancée; fonte gagnante = recul."]);


E("s8f-u1-formation-glaciers", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("Comment un glacier commence-t-il à se former dans une vallée de montagne?",
      "La neige s'accumule année après année sans fondre complètement, se compacte et se transforme graduellement en glace",
      ["Un lac de montagne entier gèle d'un seul coup pendant un hiver exceptionnellement froid et devient immédiatement un glacier permanent de la vallée", "La pluie verglaçante des tempêtes forme chaque hiver une couche de glace très épaisse qui ne fond plus jamais par la suite, même pendant les étés chauds", "Le vent pousse la glace de mer dans la vallée, où elle s'empile saison après saison"],
      "Il faut une accumulation nette de neige sur de nombreuses années, compactée en glace sous son propre poids. <b>La neige s'accumule année après année et se transforme graduellement en glace</b>.", {});
  },
  function () {
    return mcq("Qu'est-ce qui fait avancer lentement un glacier de vallée vers le bas de la pente?",
      "Son propre poids : la gravité fait s'écouler la masse de glace très lentement, comme un fluide épais",
      ["Le vent froid qui souffle constamment du sommet de la montagne vers le bas de la vallée et pousse lentement toute la masse de glace devant lui", "Les rivières souterraines cachées sous la montagne qui soulèvent le glacier entier et le font glisser rapidement sur une couche d'eau chaque printemps", "La dilatation de la glace en été, qui pousse le front du glacier un peu plus loin chaque année"],
      "Un glacier s'écoule sous son propre poids, par déformation interne et glissement à la base. <b>Son propre poids : la gravité fait s'écouler la masse de glace très lentement</b>.", {});
  },
  function () {
    return mcq("Pourquoi trouve-t-on des glaciers seulement dans certaines régions du monde?",
      "Parce qu'il faut un climat où la neige accumulée en hiver dépasse la fonte de l'été, année après année",
      ["Parce que les glaciers ne peuvent se former que sur les continents et dans les régions qui ont déjà porté des glaciers pendant les périodes glaciaires anciennes", "Parce que les glaciers exigent absolument un océan voisin immédiat pour fournir, par ses vagues gelées, toute la glace épaisse dont ils sont entièrement faits", "Parce que la glace ne peut exister que dans les régions où il ne fait jamais au-dessus de zéro"],
      "La condition est un bilan positif durable : plus de neige accumulée que de fonte. <b>Parce qu'il faut un climat où la neige accumulée dépasse la fonte, année après année</b>.", {});
  }
]), ["Un glacier se construit sur de nombreuses années, pas en un hiver.", "La neige qui survit à l'été est enfouie et comprimée en glace."]);


E("s8f-u1-distribution-abiotique", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return mcq("Les caribous d'une région se trouvent presque uniquement dans les plaines ouvertes où poussent les lichens, et presque jamais dans la forêt dense voisine. Quel facteur explique le mieux cette distribution?",
      "Un facteur abiotique indirect : la lumière et le vent des plaines ouvertes permettent aux lichens, leur nourriture, de pousser là",
      ["Le hasard seul et rien d'autre : les caribous de la région choisissent entièrement au hasard l'endroit où ils vivent, et ce choix change à chaque saison de l'année", "La température de l'air, pourtant exactement identique dans les plaines ouvertes et dans la forêt dense voisine, qui attirerait les caribous vers les plaines par préférence", "La présence de prédateurs dans les plaines, qui y attirent les caribous en grand nombre"],
      "La distribution suit celle de la ressource, elle-même fixée par les conditions abiotiques du milieu ouvert. <b>Un facteur abiotique indirect : la lumière et le vent des plaines permettent aux lichens de pousser là</b>.", {});
  },
  function () {
    return mcq("Les grenouilles d'un secteur vivent près des étangs peu profonds et sont absentes des collines sèches à quelques kilomètres. Quel facteur explique le mieux cette distribution?",
      "Un facteur abiotique : l'eau stagnante des étangs, nécessaire à la reproduction et à la survie des grenouilles",
      ["Un facteur biotique seulement : les autres grenouilles de la population ont collectivement décidé, cette année, de rester près des étangs peu profonds du secteur", "Le hasard pur : les grenouilles du secteur pourraient vivre exactement aussi bien sur les collines sèches et rocheuses, sans qu'aucun changement soit nécessaire pour elles", "La couleur du sol des collines, qui empêche les grenouilles de s'y camoufler contre les prédateurs"],
      "Sans eau pour pondre et garder la peau humide, les grenouilles ne peuvent pas vivre sur les collines sèches. <b>Un facteur abiotique : l'eau stagnante des étangs</b>.", {});
  },
  function () {
    return mcq("Sur une montagne, les épinettes poussent jusqu'à une certaine altitude, au-delà de laquelle on ne trouve que des plantes basses et rabougries. Quel facteur explique le mieux cette limite?",
      "Des facteurs abiotiques liés à l'altitude : le froid, le vent et une saison de croissance de plus en plus courte",
      ["Un facteur biotique direct : les petites plantes basses du sommet empêchent activement et délibérément les jeunes épinettes de pousser plus haut que la limite actuelle", "Le simple hasard de la dispersion naturelle des graines d'épinette, qui ne sont tout simplement jamais parvenues jusqu'au sommet de la montagne depuis des siècles", "La composition du sol du sommet, identique à celle du bas, qui rebute les racines des épinettes"],
      "En altitude, le froid et le vent raccourcissent la saison de croissance au point où les arbres ne peuvent plus s'établir. <b>Des facteurs abiotiques liés à l'altitude : le froid, le vent et une courte saison de croissance</b>.", {});
  },
  function () {
    return mcq("Les huîtres vivent dans les parties d'un estuaire où l'eau est saumâtre, mais pas dans la rivière d'eau douce en amont ni en pleine mer. Quel facteur explique le mieux cette distribution?",
      "Un facteur abiotique : la concentration de sel, que les huîtres ne tolèrent que dans une certaine plage",
      ["Un facteur biotique direct : les poissons prédateurs de l'estuaire gardent activement les huîtres regroupées dans la zone d'eau saumâtre du milieu de l'estuaire", "Le simple hasard des courants de marée, qui dépose les jeunes huîtres complètement au hasard le long de tout l'estuaire, d'une extrémité à l'autre, chaque année", "La profondeur de l'eau, identique partout dans l'estuaire, qui convient aux huîtres à cet endroit"],
      "Chaque espèce tolère une plage de salinité; les huîtres ne vivent que là où la concentration de sel convient. <b>Un facteur abiotique : la concentration de sel</b>.", {});
  }
]), ["Cherche le facteur non vivant qui diffère entre les deux milieux.", "La distribution de l'organisme suit le facteur dont il a besoin."]);


E("s8f-u1-cr-distribution-deplacement", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("Après dix étés plus chauds que la moyenne, les truites d'un lac ont presque disparu des baies peu profondes et se trouvent maintenant surtout près des arrivées d'eau froide au fond du lac. Explique ce déplacement de distribution : nomme le facteur abiotique en cause, explique pourquoi les truites ont quitté les baies, et prédis ce qui arrivera si le réchauffement continue. (3 points)",
      ["Le facteur abiotique est la température de l'eau des baies peu profondes."],
      "Points de notation (3) : 1 point pour nommer le facteur abiotique (la température de l'eau, qui monte dans les baies peu profondes). 1 point pour expliquer le départ (l'eau plus chaude dépasse la plage de tolérance des truites et contient moins d'oxygène dissous; elles se déplacent vers l'eau froide qui leur convient). 1 point pour une prédiction raisonnée (si le réchauffement continue, l'habitat convenable rétrécit encore; la population diminue ou disparaît du lac si l'eau froide vient à manquer). Réponse modèle : Les baies peu profondes se réchauffent au-delà de ce que les truites tolèrent, donc elles se réfugient près des arrivées d'eau froide. <b>Si le réchauffement continue, il restera de moins en moins d'habitat froid et la population de truites du lac déclinera</b>.", {});
  },
  function () {
    return textq("Un marais côtier reçoit de moins en moins d'eau douce parce qu'une rivière a été détournée, et son eau devient chaque année plus salée. Les quenouilles, plantes d'eau douce, meurent le long des bords et des herbes tolérant le sel les remplacent. Explique ce changement de distribution : nomme le facteur abiotique en cause, explique pourquoi les quenouilles disparaissent, et prédis la suite si le détournement continue. (3 points)",
      ["Le facteur abiotique est la concentration de sel (la salinité) de l'eau du marais."],
      "Points de notation (3) : 1 point pour nommer le facteur abiotique (la salinité croissante de l'eau). 1 point pour expliquer la disparition (les quenouilles sont adaptées à l'eau douce; l'eau plus salée dépasse leur tolérance et elles meurent, tandis que les plantes tolérant le sel prennent la place). 1 point pour une prédiction raisonnée (le marais deviendra un marais salé; les espèces d'eau douce continueront de reculer et la communauté changera entièrement si le détournement persiste). Réponse modèle : Privé d'eau douce, le marais devient trop salé pour les quenouilles, qui meurent; les herbes tolérant le sel, déjà adaptées, les remplacent. <b>Si le détournement continue, tout le marais deviendra un milieu salé et sa communauté d'eau douce disparaîtra</b>.", {});
  },
  function () {
    return textq("Les hivers d'une région deviennent plus doux et presque sans neige pendant plusieurs années. Des insectes ravageurs qui mouraient autrefois chaque hiver survivent maintenant et apparaissent chaque printemps en plus grand nombre dans les forêts. Explique ce changement de distribution et d'abondance : nomme le facteur abiotique en cause, explique pourquoi les insectes survivent maintenant, et prédis un effet sur la forêt. (3 points)",
      ["Le facteur abiotique est la température hivernale, devenue plus douce."],
      "Points de notation (3) : 1 point pour nommer le facteur abiotique (la température hivernale plus douce, avec moins de gelées mortelles). 1 point pour expliquer la survie (le froid hivernal tuait la plupart des insectes; sans ce facteur limitant, beaucoup plus survivent jusqu'au printemps et se reproduisent). 1 point pour un effet prédit raisonnable (défoliation accrue, arbres affaiblis ou tués, effets sur les oiseaux et les autres espèces qui dépendent de la forêt). Réponse modèle : Le froid de l'hiver était le facteur qui limitait ces insectes; des hivers doux les laissent survivre en grand nombre. <b>La forêt subira des attaques plus fortes chaque année, et des arbres affaiblis ou tués changeront l'habitat d'autres espèces</b>.", {});
  }
]), ["Nomme d'abord le facteur abiotique, puis suis la chaîne de cause à effet.", "Termine par une prédiction qui prolonge le même changement."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8f-u1-cr-bassin-versant
   closes Unit 1 Test 1 (4 marks, Level 3); s8f-u1-cr-deplacement-aire
   closes Unit 1 Test 3 (4 marks, Level 3). SME-flagged for the
   specialist pass. */

E("s8f-u1-cr-bassin-versant", 1, ["SC8.1.1", "SC8.1.2"], 3, "var", varset([
  function () {
    return textq("Une ville tire son eau potable d'un réservoir alimenté par une rivière de montagne. (a) Décris le trajet de l'eau dans le cycle de l'eau jusqu'au réservoir, en nommant les processus dans l'ordre. (2 points) (b) Les hivers de la région deviennent plus chauds : la pluie remplace une partie de la neige et le manteau neigeux des montagnes diminue. Prédis l'effet de ce changement sur l'approvisionnement en eau de la ville et justifie ta prédiction à l'aide du cycle de l'eau. (2 points) (4 points)",
      ["évaporation, condensation, puis précipitations sur le bassin versant", "le ruissellement alimente la rivière et le réservoir", "le manteau neigeux est une réserve qui libère l'eau lentement à la fonte", "moins de neige veut dire un réservoir plus bas et moins fiable en été"],
      "<b>Réponse modèle :</b> (a) L'énergie du Soleil fait évaporer l'eau des océans, des lacs et des sols. La vapeur d'eau se refroidit et se condense en nuages, puis retombe en précipitations sur le bassin versant de la rivière. Une partie de cette eau ruisselle dans la rivière et remplit le réservoir, et une partie s'infiltre dans le sol vers les eaux souterraines. (b) Le manteau neigeux est une réserve d'eau : il emmagasine les précipitations de l'hiver et les libère lentement pendant la fonte du printemps. Avec des hivers plus chauds, plus d'eau arrive en pluie, qui ruisselle rapidement, souvent sur un sol gelé, au lieu d'être emmagasinée, et la fonte printanière qui alimentait le réservoir diminue. Le réservoir atteint donc des niveaux plus bas à la fin de l'été et l'approvisionnement de la ville devient moins fiable.<br><br><b>Points d'attribution :</b> 1 point pour les processus nommés dans l'ordre (évaporation, condensation, précipitations). 1 point pour l'arrivée de l'eau au réservoir par le ruissellement du bassin versant (l'infiltration vers les eaux souterraines est aussi acceptée). 1 point pour la prédiction (un réservoir plus bas ou un approvisionnement moins fiable en été). 1 point pour la justification (le manteau neigeux emmagasinait l'eau et la libérait lentement, tandis que la pluie ruisselle rapidement).",
      {});
  },
  function () {
    return textq("Une ville de montagne tire son eau potable d'un réservoir rempli par une rivière qu'alimente un glacier. (a) Décris le trajet de l'eau dans le cycle de l'eau jusqu'au réservoir, en nommant les processus dans l'ordre. (2 points) (b) Le glacier qui alimente la rivière recule régulièrement depuis des années et devient de plus en plus petit. Prédis l'effet de ce recul sur l'approvisionnement en eau de la ville et justifie ta prédiction à l'aide du cycle de l'eau. (2 points) (4 points)",
      ["évaporation, condensation, puis précipitations, dont la neige qui nourrit le glacier", "l'eau de fonte du glacier alimente la rivière et le réservoir", "un glacier est une réserve d'eau douce emmagasinée sous forme de glace", "un glacier plus petit donne moins d'eau de fonte en fin d'été"],
      "<b>Réponse modèle :</b> (a) L'énergie du Soleil fait évaporer l'eau des océans, des lacs et des sols. La vapeur d'eau se refroidit et se condense en nuages, puis retombe en précipitations sur le bassin versant. Une partie tombe en neige et s'accumule dans le glacier; quand la glace fond, l'eau de fonte ruisselle dans la rivière et remplit le réservoir. (b) Un glacier est une réserve d'eau douce emmagasinée sous forme de glace, et sa fonte alimente la rivière pendant tout l'été. Pendant que le glacier recule, la fonte peut rester forte un certain temps, mais à mesure que le glacier rapetisse, il reste de moins en moins de glace à fondre. Le débit de la rivière en fin d'été baisse donc, le réservoir se remplit moins bien pendant la saison sèche et l'approvisionnement de la ville devient moins fiable.<br><br><b>Points d'attribution :</b> 1 point pour les processus nommés dans l'ordre (évaporation, condensation, précipitations). 1 point pour l'arrivée de l'eau au réservoir par l'eau de fonte et le ruissellement dans la rivière. 1 point pour la prédiction (moins d'eau de fonte en fin d'été et un approvisionnement moins fiable). 1 point pour la justification (le glacier est une réserve emmagasinée dont la taille diminue).",
      {});
  },
  function () {
    return textq("Une petite ville tire son eau potable de puits forés dans les eaux souterraines. (a) Décris le trajet de l'eau dans le cycle de l'eau jusqu'aux puits, en nommant les processus dans l'ordre. (2 points) (b) La région connaît une longue sécheresse, suivie de quelques tempêtes très intenses qui déversent beaucoup de pluie en peu de temps. Prédis l'effet de cette suite d'événements sur l'approvisionnement en eau de la ville et justifie ta prédiction à l'aide du cycle de l'eau. (2 points) (4 points)",
      ["évaporation, condensation, puis précipitations", "les précipitations s'infiltrent dans le sol et rechargent les eaux souterraines que les puits puisent", "la sécheresse abaisse la nappe d'eau souterraine", "pendant les tempêtes intenses, l'eau ruisselle au lieu de s'infiltrer, donc la recharge reste faible"],
      "<b>Réponse modèle :</b> (a) L'énergie du Soleil fait évaporer l'eau des océans, des lacs et des sols. La vapeur d'eau se refroidit et se condense en nuages, puis retombe en précipitations sur la région. Une partie de cette eau s'infiltre lentement dans le sol et recharge les eaux souterraines, que les puits de la ville puisent. (b) Pendant la longue sécheresse, presque aucune précipitation ne recharge les eaux souterraines pendant que les puits continuent de pomper, donc la nappe baisse et les puits donnent de moins en moins d'eau. Les tempêtes intenses ne réparent pas le manque : la pluie arrive si vite, sur un sol sec et dur, que la plus grande partie ruisselle vers les ruisseaux au lieu de s'infiltrer. La recharge reste donc faible malgré de grosses pluies, et la ville risque de manquer d'eau.<br><br><b>Points d'attribution :</b> 1 point pour les processus nommés dans l'ordre (évaporation, condensation, précipitations). 1 point pour l'infiltration des précipitations qui recharge les eaux souterraines puisées par les puits. 1 point pour la prédiction (la nappe baisse et les puits donnent moins d'eau, même après les tempêtes). 1 point pour la justification (pendant une tempête intense, l'eau ruisselle sur le sol sec au lieu de s'infiltrer, donc la recharge est faible).",
      {});
  },
  function () {
    return textq("Une ville tire son eau potable d'un réservoir situé sous une colline boisée qui fait partie de son bassin versant. (a) Décris le trajet de l'eau dans le cycle de l'eau jusqu'au réservoir, en nommant les processus dans l'ordre. (2 points) (b) Une entreprise coupe presque tous les arbres de la colline au-dessus du réservoir. Prédis l'effet de cette coupe sur l'approvisionnement en eau de la ville et justifie ta prédiction à l'aide du cycle de l'eau. (2 points) (4 points)",
      ["évaporation, condensation, puis précipitations sur le bassin versant", "le ruissellement et les cours d'eau alimentent le réservoir", "la forêt ralentissait le ruissellement et le sol forestier absorbait et filtrait l'eau", "sans forêt, ruissellement rapide, érosion et eau trouble dans le réservoir"],
      "<b>Réponse modèle :</b> (a) L'énergie du Soleil fait évaporer l'eau des océans, des lacs et des sols. La vapeur d'eau se refroidit et se condense en nuages, puis retombe en précipitations sur le bassin versant. Une partie ruisselle dans les cours d'eau qui remplissent le réservoir, et une partie s'infiltre dans le sol vers les eaux souterraines. (b) La forêt ralentissait le trajet de l'eau : les arbres interceptaient la pluie, et les racines et le sol forestier absorbaient l'eau, la filtraient et la libéraient lentement. Après la coupe, la pluie frappe un sol nu et ruisselle rapidement, ce qui produit des crues soudaines suivies de débits faibles, entraîne de la terre par érosion et rend l'eau du réservoir trouble et chargée de sédiments. Le réservoir s'envase peu à peu, et l'approvisionnement de la ville devient moins fiable en quantité comme en qualité.<br><br><b>Points d'attribution :</b> 1 point pour les processus nommés dans l'ordre (évaporation, condensation, précipitations). 1 point pour l'arrivée de l'eau au réservoir par le ruissellement du bassin versant (l'infiltration vers les eaux souterraines est aussi acceptée). 1 point pour la prédiction (des débits moins réguliers et une eau de moins bonne qualité, ou un réservoir qui s'envase). 1 point pour la justification (la forêt ralentissait le ruissellement et le sol absorbait et filtrait l'eau; sans elle, l'eau ruisselle vite et entraîne des sédiments).",
      {});
  }
]), ["Pour la partie (a), pars de l'évaporation et suis l'eau jusqu'au réservoir ou aux puits, sans sauter d'étape.", "Pour la partie (b), demande-toi ce que le changement retire ou modifie dans le cycle, puis suis la conséquence jusqu'à l'approvisionnement."]);

E("s8f-u1-cr-deplacement-aire", 1, ["SC8.1.3", "SC8.1.4"], 3, "var", varset([
  function () {
    return textq("Des pêcheurs remarquent qu'une espèce de poisson qu'ils capturaient autrefois près de la surface se capture maintenant surtout dans les eaux profondes, à mesure que les étés réchauffent les eaux de surface de leur zone de pêche. (a) Nomme le facteur abiotique en cause et la limite qu'il impose à ce poisson. (1 point) (b) Explique le déplacement observé. (2 points) (c) Prédis un effet en cascade de ce déplacement sur une autre espèce ou sur la productivité de la zone. (1 point) (4 points)",
      ["le facteur abiotique est la température de l'eau de surface", "la limite est la plage de tolérance thermique du poisson, et l'eau chaude contient moins d'oxygène dissous", "le poisson se déplace vers l'eau profonde, plus froide et mieux oxygénée", "les oiseaux marins qui se nourrissaient de ce poisson près de la surface trouvent moins de nourriture"],
      "<b>Réponse modèle :</b> (a) Le facteur abiotique est la température de l'eau. La limite qu'elle impose est la plage de tolérance thermique du poisson : chaque espèce ne peut vivre que dans une certaine gamme de températures. (b) À mesure que les étés réchauffent les eaux de surface, celles-ci dépassent la température que ce poisson tolère, et l'eau chaude contient en plus moins d'oxygène dissous. Le poisson se déplace donc vers les eaux profondes, qui restent plus froides et mieux oxygénées, et sa distribution se déplace avec lui. (c) Les oiseaux marins et les autres prédateurs qui se nourrissaient de ce poisson près de la surface trouvent maintenant beaucoup moins de proies à leur portée, ce qui peut réduire leur alimentation et leur reproduction dans la zone.<br><br><b>Points d'attribution :</b> 1 point pour le facteur abiotique nommé (la température de l'eau) avec la limite qu'il impose (la plage de tolérance du poisson). 1 point pour l'explication du départ (l'eau de surface réchauffée dépasse ce que le poisson tolère). 1 point pour l'explication complétée (l'eau profonde est plus froide et contient plus d'oxygène dissous, donc le poisson s'y réfugie). 1 point pour un effet en cascade raisonnable sur une autre espèce ou sur la productivité.",
      {});
  },
  function () {
    return textq("Des arbustes bas, autrefois absents d'une plaine de toundra, s'y établissent maintenant et s'étendent un peu plus chaque année, à mesure que les étés de la région deviennent plus longs et plus chauds. (a) Nomme le facteur abiotique en cause et la limite qu'il imposait aux arbustes. (1 point) (b) Explique l'expansion observée. (2 points) (c) Prédis un effet en cascade de cette expansion sur une autre espèce ou sur la productivité de la plaine. (1 point) (4 points)",
      ["le facteur abiotique est la température, par la durée de la saison de croissance", "la limite était un été trop court et trop froid pour que les arbustes croissent et produisent des graines", "des étés plus longs laissent les arbustes compléter leur croissance et se reproduire chaque année", "les arbustes ombragent les lichens, nourriture hivernale du caribou, qui déclinent"],
      "<b>Réponse modèle :</b> (a) Le facteur abiotique est la température, qui agit ici par la durée de la saison de croissance. La limite qu'elle imposait était un été trop court et trop froid : les arbustes ne pouvaient ni croître assez ni produire des graines avant le retour du froid. (b) Avec des étés plus longs et plus chauds, les arbustes ont maintenant le temps de compléter leur croissance, de produire des graines et de survivre d'une année à l'autre. Chaque année, de nouveaux arbustes s'établissent un peu plus loin, et leur distribution s'étend sur la plaine. (c) Les arbustes ombragent le sol et concurrencent les lichens de la toundra. Si les lichens déclinent, les caribous perdent une partie de leur nourriture d'hiver, ce qui peut réduire leur état et leur nombre dans la région.<br><br><b>Points d'attribution :</b> 1 point pour le facteur abiotique nommé (la température ou la durée de la saison de croissance) avec la limite qu'il imposait (un été trop court et trop froid). 1 point pour l'explication de l'expansion (les arbustes peuvent maintenant compléter leur croissance pendant l'été). 1 point pour l'explication complétée (ils produisent des graines et survivent, donc la distribution s'étend année après année). 1 point pour un effet en cascade raisonnable sur une autre espèce ou sur la productivité.",
      {});
  },
  function () {
    return textq("À la suite de pluies abondantes répétées, le débit de la rivière qui se jette dans un estuaire augmente, et l'eau de l'estuaire reste moins salée que d'habitude pendant de longues périodes. Un banc de mollusques autrefois abondant près de l'embouchure recule peu à peu vers la mer, où l'eau reste plus salée. (a) Nomme le facteur abiotique en cause et la limite qu'il impose à ces mollusques. (1 point) (b) Explique le déplacement observé. (2 points) (c) Prédis un effet en cascade de ce déplacement sur une autre espèce ou sur la productivité de l'estuaire. (1 point) (4 points)",
      ["le facteur abiotique est la salinité de l'eau", "la limite est la salinité minimale que ces mollusques tolèrent", "l'eau devenue moins salée près de l'embouchure dépasse leur tolérance et ils n'y survivent plus", "les oiseaux qui se nourrissaient de ces mollusques perdent une source de nourriture"],
      "<b>Réponse modèle :</b> (a) Le facteur abiotique est la salinité de l'eau. La limite qu'elle impose est la gamme de salinité que ces mollusques tolèrent : ils sont adaptés à une eau assez salée. (b) Le débit accru de la rivière dilue l'eau de l'estuaire près de l'embouchure, qui devient moins salée que la limite que les mollusques tolèrent. Ils y meurent ou cessent de s'y établir, tandis qu'ils survivent là où l'eau reste assez salée, plus près de la mer. Le banc semble donc reculer vers la mer. (c) Les oiseaux limicoles et les canards qui se nourrissaient de ces mollusques près de l'embouchure perdent une source de nourriture importante et doivent chercher leur nourriture ailleurs, ce qui peut réduire le nombre d'oiseaux que l'estuaire nourrit.<br><br><b>Points d'attribution :</b> 1 point pour le facteur abiotique nommé (la salinité) avec la limite qu'il impose (la gamme de salinité tolérée). 1 point pour l'explication du départ (l'eau moins salée près de l'embouchure dépasse la tolérance des mollusques). 1 point pour l'explication complétée (les mollusques ne persistent que là où l'eau reste assez salée, donc le banc recule vers la mer). 1 point pour un effet en cascade raisonnable sur une autre espèce ou sur la productivité.",
      {});
  },
  function () {
    return textq("Un insecte ravageur des forêts, autrefois limité aux régions plus au sud, apparaît maintenant dans des forêts plus au nord. Les étés de ces régions sont devenus plus longs et plus chauds, et l'insecte peut maintenant y compléter deux générations par année au lieu d'une seule. (a) Nomme le facteur abiotique en cause et la limite qu'il imposait à cet insecte. (1 point) (b) Explique l'expansion observée. (2 points) (c) Prédis un effet en cascade de cette expansion sur une autre espèce ou sur la productivité de la forêt. (1 point) (4 points)",
      ["le facteur abiotique est la température, par la chaleur et la longueur de l'été", "la limite était un été trop court et trop frais pour compléter plus d'une génération", "deux générations par année font augmenter la population beaucoup plus vite et laissent l'insecte s'établir au nord", "la défoliation répétée affaiblit les arbres et touche les espèces qui en dépendent"],
      "<b>Réponse modèle :</b> (a) Le facteur abiotique est la température, qui agit ici par la chaleur accumulée pendant l'été. La limite qu'elle imposait était un été trop court et trop frais : l'insecte n'avait le temps de compléter qu'une seule génération, et ses populations restaient trop petites pour s'établir au nord. (b) Avec des étés plus longs et plus chauds, l'insecte complète maintenant deux générations par année dans ces forêts. Sa population augmente donc beaucoup plus vite chaque saison, et assez d'individus survivent pour que l'espèce s'établisse durablement plus au nord. (c) Deux générations de ravageurs défolient les arbres plus souvent et plus longtemps. Des arbres affaiblis ou tués à répétition réduisent la productivité de la forêt et l'habitat et la nourriture des oiseaux et des autres espèces qui dépendent de ces arbres.<br><br><b>Points d'attribution :</b> 1 point pour le facteur abiotique nommé (la température ou la longueur de l'été) avec la limite qu'il imposait (un été trop court pour plus d'une génération). 1 point pour l'explication de l'expansion (la chaleur permet deux générations complètes par année). 1 point pour l'explication complétée (la population augmente beaucoup plus vite et l'espèce s'établit plus au nord). 1 point pour un effet en cascade raisonnable sur une autre espèce ou sur la productivité.",
      {});
  }
]), ["Nomme d'abord le facteur abiotique, puis suis la chaîne : la limite, le déplacement, puis l'effet sur le reste du milieu.", "Pour la partie (c), choisis une espèce liée à la première par la nourriture ou par l'habitat."]);

/* ----- bank-u2.js ----- */
// CRMARKS: s8f-u2-cr-viscosite-test=3
// CRMARKS: s8f-u2-cr-molasses=3
// CRMARKS: s8f-u2-cr-layers=3
// CRMARKS: s8f-u2-cr-density-block=3
// CRMARKS: s8f-u2-cr-temp-situations=3
// CRMARKS: s8f-u2-cr-raise-ship=3
// CRMARKS: s8f-u2-cr-mass-weight=3
// CRMARKS: s8f-u2-cr-piggyback=3
// CRMARKS: s8f-u2-cr-pressure-crate=3
// CRMARKS: s8f-u2-cr-cleaning-claim=4
// CRMARKS: s8f-u2-cr-underlying=3
// CRMARKS: s8f-u2-cr-car-lift=3
// CRMARKS: s8f-u2-cr-design-viscosity=4
// CRMARKS: s8f-u2-cr-data-infer=3
// CRMARKS: s8f-u2-cr-displacement-calc=3
// CRMARKS: s8f-u2-cr-viscosite-experience=4
// CRMARKS: s8f-u2-cr-ballon=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s8f-u2-viscosity-def=2
// CRMARKS: s8f-u2-flow-ranking=2
// CRMARKS: s8f-u2-viscosity-use=2
// CRMARKS: s8f-u2-flow-lab=2
// CRMARKS: s8f-u2-viscosity-compare=3
// CRMARKS: s8f-u2-factors=2
// CRMARKS: s8f-u2-heating-honey=3
// CRMARKS: s8f-u2-concentration=3
// CRMARKS: s8f-u2-ratio-constant=2
// CRMARKS: s8f-u2-calc-density=2
// CRMARKS: s8f-u2-calc-mass=2
// CRMARKS: s8f-u2-calc-volume=2
// CRMARKS: s8f-u2-identify-substance=3
// CRMARKS: s8f-u2-displacement-calc=2
// CRMARKS: s8f-u2-hot-air=2
// CRMARKS: s8f-u2-seasoning=3
// CRMARKS: s8f-u2-density-life=2
// CRMARKS: s8f-u2-forces=2
// CRMARKS: s8f-u2-force-figure=3
// CRMARKS: s8f-u2-mass-weight=2
// CRMARKS: s8f-u2-moon-suitcase=4
// CRMARKS: s8f-u2-buoyancy-rule=2
// CRMARKS: s8f-u2-archimedes=3
// CRMARKS: s8f-u2-calc-pressure=2
// CRMARKS: s8f-u2-calc-force=2
// CRMARKS: s8f-u2-calc-area=3
// CRMARKS: s8f-u2-snowshoes=2
// CRMARKS: s8f-u2-gas-laws=2
// CRMARKS: s8f-u2-compressible=2
// CRMARKS: s8f-u2-depth-pressure=3
// CRMARKS: s8f-u2-personal=2
// CRMARKS: s8f-u2-winter-oil=4
// CRMARKS: s8f-u2-products=2
// CRMARKS: s8f-u2-cleaning=3
// CRMARKS: s8f-u2-lives=2
// CRMARKS: s8f-u2-underlying=2
// CRMARKS: s8f-u2-disciplines=2
// CRMARKS: s8f-u2-submarine=3
// CRMARKS: s8f-u2-average-density=4
// CRMARKS: s8f-u2-pascal=2
// CRMARKS: s8f-u2-questions=2
// CRMARKS: s8f-u2-question-problem=3
// CRMARKS: s8f-u2-rephrase=2
// CRMARKS: s8f-u2-discrepancy-flow=3
// CRMARKS: s8f-u2-discrepancy-density=4
// CRMARKS: s8f-u2-bargraph=4
// CRMARKS: s8f-u2-graph-choice=2
// CRMARKS: s8f-u2-variables=3
// CRMARKS: s8f-u2-instruments=2
// CRMARKS: s8f-u2-displacement=2
// CRMARKS: s8f-u2-displacement-error=4
// CRMARKS: s8f-u2-sk-calc-density=2
// CRMARKS: s8f-u2-sk-calc-mass=2
// CRMARKS: s8f-u2-sk-calc-volume=2
// CRMARKS: s8f-u2-viscosite-facteur=3
// CRMARKS: s8f-u2-densite-quotidien=3
// CRMARKS: s8f-u2-masse-poids-lieux=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s8f-u2-viscosity-def=b
// BIMODAL: s8f-u2-flow-ranking=a
// BIMODAL: s8f-u2-viscosity-use=b
// BIMODAL: s8f-u2-flow-lab=a
// BIMODAL: s8f-u2-viscosity-compare=b
// BIMODAL: s8f-u2-factors=a
// BIMODAL: s8f-u2-heating-honey=b
// BIMODAL: s8f-u2-concentration=b
// BIMODAL: s8f-u2-ratio-constant=a
// BIMODAL: s8f-u2-calc-density=a
// BIMODAL: s8f-u2-calc-mass=a
// BIMODAL: s8f-u2-calc-volume=a
// BIMODAL: s8f-u2-identify-substance=a
// BIMODAL: s8f-u2-displacement-calc=a
// BIMODAL: s8f-u2-hot-air=b
// BIMODAL: s8f-u2-seasoning=b
// BIMODAL: s8f-u2-density-life=b
// BIMODAL: s8f-u2-forces=b
// BIMODAL: s8f-u2-force-figure=b
// BIMODAL: s8f-u2-mass-weight=b
// BIMODAL: s8f-u2-moon-suitcase=b
// BIMODAL: s8f-u2-buoyancy-rule=b
// BIMODAL: s8f-u2-archimedes=b
// BIMODAL: s8f-u2-calc-pressure=a
// BIMODAL: s8f-u2-calc-force=a
// BIMODAL: s8f-u2-calc-area=a
// BIMODAL: s8f-u2-snowshoes=b
// BIMODAL: s8f-u2-gas-laws=b
// BIMODAL: s8f-u2-compressible=b
// BIMODAL: s8f-u2-depth-pressure=b
// BIMODAL: s8f-u2-personal=b
// BIMODAL: s8f-u2-winter-oil=b
// BIMODAL: s8f-u2-products=b
// BIMODAL: s8f-u2-cleaning=b
// BIMODAL: s8f-u2-lives=b
// BIMODAL: s8f-u2-underlying=b
// BIMODAL: s8f-u2-disciplines=b
// BIMODAL: s8f-u2-submarine=b
// BIMODAL: s8f-u2-average-density=b
// BIMODAL: s8f-u2-pascal=b
// BIMODAL: s8f-u2-questions=b
// BIMODAL: s8f-u2-question-problem=b
// BIMODAL: s8f-u2-rephrase=b
// BIMODAL: s8f-u2-discrepancy-flow=b
// BIMODAL: s8f-u2-discrepancy-density=b
// BIMODAL: s8f-u2-bargraph=b
// BIMODAL: s8f-u2-graph-choice=b
// BIMODAL: s8f-u2-variables=b
// BIMODAL: s8f-u2-instruments=b
// BIMODAL: s8f-u2-displacement=b
// BIMODAL: s8f-u2-displacement-error=b
// BIMODAL: s8f-u2-sk-calc-density=a
// BIMODAL: s8f-u2-sk-calc-mass=a
// BIMODAL: s8f-u2-sk-calc-volume=a
// BIMODAL: s8f-u2-viscosite-facteur=b
// BIMODAL: s8f-u2-densite-quotidien=b
// BIMODAL: s8f-u2-masse-poids-lieux=a
// Sciences 8, Unité 2 : Les fluides (SC8.4.1 à SC8.6.9),
// banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Correspondance de contenu : SC8.6.9 porte le calcul de la masse
// volumique de divers objets; SC8.6.3 porte les deux familles
// d'explications des écarts dans les données (un premier écart dans
// les données d'écoulement, et des explications concurrentes pesées
// pour un écart de masse volumique), consignées ici plutôt que
// fusionnées en silence.
// Discipline du contenu : les facteurs de la viscosité sont la
// température, la concentration et l'attraction entre les particules
// seulement; les situations d'attraction sont décrites, jamais
// évaluées par des termes spécialisés; le principe d'Archimède est
// énoncé comme le poids du fluide déplacé.
// Résidu CORE : les questions de SC8.6.5 évaluent l'identification
// des variables et la conception de recherches; elles n'évaluent pas
// la réalisation de la procédure. SC8.6.7 porte une seule question sur
// la lecture exacte d'instruments; la manipulation relève de
// l'évaluation en classe. Les questions de SC8.6.8 évaluent les étapes
// de la méthode de déplacement, le jugement d'erreur et le calcul; la
// procédure au comptoir elle-même n'est pas évaluée.

function s8fn(v) {
  var s = (Math.round(v * 100) / 100).toString();
  return s.replace(".", ",");
}
function s8fdis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var cv = Math.round(cand[i] * 100) / 100;
    if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv);
  }
  return out;
}

/* ---------- SC8.4.1 Comparer la viscosité ---------- */

E("s8f-u2-viscosity-def", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce que la viscosité?",
      "La résistance d'un liquide à l'écoulement, causée par la friction entre ses particules à mesure qu'elles se déplacent les unes par rapport aux autres",
      ["La résistance d'un liquide à être comprimé dans un volume plus petit que celui qu'il remplit déjà, mesurée par la force qu'il faut pour le presser",
       "La vitesse à laquelle un liquide s'évapore de la surface d'un récipient ouvert qui le contient, causée par ses particules qui s'échappent dans l'air",
       "La force avec laquelle un liquide pousse vers le haut sur tout objet qui est placé dans le liquide, causée par le liquide déplacé sous l'objet"],
      "La viscosité est une mesure de combien un liquide résiste à l'écoulement. La résistance vient de la friction entre les particules du liquide : plus la friction ou le frottement entre les particules est grand, plus la viscosité est élevée et plus le liquide s'écoule lentement.",
      {});
  }
]), ["La viscosité concerne l'écoulement. Quel choix parle de l'écoulement et de ce qui y résiste?", "Les liquides épais et lents sont ceux à viscosité élevée."]);

E("s8f-u2-flow-ranking", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Quatre liquides sont versés d'entonnoirs identiques : de l'eau, de l'huile de cuisson, du shampoing et de la mélasse. Lequel se verse le plus vite?", k: "L'eau", w: ["L'huile de cuisson", "La mélasse", "Le shampoing"] },
    { q: "Quatre liquides sont chronométrés pendant qu'ils coulent sur une rampe : de l'eau, du jus de tomate, de l'huile de cuisson et du miel. Lequel a la viscosité la plus élevée?", k: "Le miel", w: ["L'huile de cuisson", "Le jus de tomate", "L'eau"] },
    { q: "Un cuisinier compare du sirop à crêpes, du lait, du savon à vaisselle et de l'eau. Lequel a la viscosité la plus faible?", k: "L'eau", w: ["Le savon à vaisselle", "Le lait", "Le sirop à crêpes"] },
    { q: "Quelle liste ordonne les liquides de la viscosité la plus faible à la plus élevée?", k: "Eau, huile de cuisson, shampoing, mélasse", w: ["Huile de cuisson, eau, mélasse, shampoing", "Mélasse, shampoing, huile de cuisson, eau", "Eau, mélasse, shampoing, huile de cuisson"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les liquides à faible viscosité s'écoulent librement et vite; les liquides à viscosité élevée s'écoulent lentement. L'eau est mince et rapide, les huiles et le shampoing sont entre les deux, et le miel et la mélasse sont épais et lents. Comparer des liquides familiers est le visage quotidien de la viscosité.",
    {});
}, ["Un écoulement rapide veut dire une faible viscosité; lent et épais veut dire une viscosité élevée.", "L'eau est le liquide le plus mince de chaque liste ici."]);

E("s8f-u2-viscosity-use", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Pourquoi l'huile à moteur doit-elle avoir la viscosité appropriée pour faire son travail?", k: "Elle doit s'écouler assez bien pour enduire les pièces mobiles du moteur et les protéger, sans être si mince qu'elle n'arrive pas à adhérer et à lubrifier", w: ["Elle doit s'évaporer rapidement pour que le moteur reste propre", "Elle doit geler solide en hiver pour protéger le bloc-moteur", "Sa viscosité décide de la couleur des gaz d'échappement"] },
    { q: "Un peintre se plaint qu'une peinture est trop visqueuse pour le travail. Quel est le problème?", k: "La peinture est trop épaisse pour s'étaler correctement et uniformément", w: ["La peinture sèche avant de pouvoir être appliquée au pinceau", "La peinture est trop mince et coule le long du mur", "La peinture a perdu sa couleur dans la boîte"] },
    { q: "Le beurre d'arachide gardé au réfrigérateur est souvent trop visqueux pour être étalé. Qu'est-ce que cela te dit du beurre d'arachide au réfrigérateur?", k: "Sa viscosité a augmenté, donc il résiste à l'écoulement et à l'étalement", w: ["Sa viscosité a diminué, donc il coule du couteau", "Ses particules ont complètement cessé de s'attirer les unes les autres", "Sa concentration est tombée à presque zéro"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Beaucoup de substances ont besoin du degré de viscosité approprié pour remplir leur fonction prévue : l'huile à moteur doit s'écouler et adhérer comme lubrifiant, la peinture doit s'étaler correctement, et le beurre d'arachide doit s'étaler sur le pain. Trop visqueux veut dire trop résistant à l'écoulement pour le travail.",
    {});
}, ["Associe la plainte à ce que la viscosité fait : la résistance à l'écoulement.", "Trop visqueux veut toujours dire trop épais et trop lent pour son usage."]);

E("s8f-u2-flow-lab", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    var q = mcq("Dans le laboratoire principal sur le débit, des quantités égales de quatre liquides s'écoulent dans le même entonnoir et sont chronométrées. Le graphique montre les résultats. Quel liquide est le plus visqueux?",
      "Le liquide D",
      ["Le liquide A", "Le liquide B", "Le liquide C"],
      "Le débit et la viscosité vont en directions opposées : plus un liquide prend de temps à s'écouler, plus il résiste à l'écoulement, donc la barre la plus longue, le liquide D, est le plus visqueux. Le liquide A, avec le temps le plus court, est le moins visqueux.",
      {});
    q.figure = s8fHealthSVG([{ name: "Liquide A", value: 4 }, { name: "Liquide B", value: 9 }, { name: "Liquide C", value: 15 }, { name: "Liquide D", value: 26 }], "Temps d'écoulement", "s", null);
    return q;
  }
]), ["Dans un test d'écoulement, le temps est l'indice : écoulement lent, viscosité élevée.", "Trouve le temps d'écoulement le plus long sur le graphique."]);

E("s8f-u2-viscosity-compare", 2, ["SC8.4.1"], 2, "var", varset([
  function () {
    return mcq("Deux liquides sont décrits. Le liquide P se verse comme une crème mince et enduit une cuillère uniformément. Le liquide Q goutte lentement de la cuillère en un ruban épais. Quelle comparaison est correcte?",
      "Le liquide Q a la viscosité la plus élevée, parce qu'il s'écoule plus lentement et résiste au mouvement",
      ["Le liquide P a la viscosité la plus élevée, parce qu'il enduit la cuillère uniformément",
       "Les deux ont la même viscosité, parce que ce sont tous les deux des liquides",
       "La viscosité ne peut pas être comparée sans connaître leurs masses volumiques"],
      "La viscosité se compare par le comportement d'écoulement. Le liquide Q s'écoule lentement et épaississement, donc il résiste davantage à l'écoulement : viscosité plus élevée. Le liquide P s'écoule facilement : viscosité plus faible. La masse volumique est une propriété différente et ne règle pas une comparaison de viscosité.",
      {});
  }
]), ["Compare la façon dont chaque liquide bouge, rien d'autre.", "Lent et épais est la signature d'une viscosité élevée."]);

/* ---------- SC8.4.2 Les facteurs qui modifient la viscosité ---------- */

E("s8f-u2-factors", 2, ["SC8.4.2"], 1, "gen", function () {
  var cases = [
    { q: "Du miel gardé dans un garde-manger froid se verse lentement, mais le même miel réchauffé dans un bol d'eau chaude se verse facilement. Quel facteur a changé la viscosité du miel?", k: "La température", w: ["La concentration", "La force d'attraction ajoutée par le brassage", "La taille du pot de miel"] },
    { q: "Un cuisinier brasse de la farine supplémentaire dans une sauce et elle épaissit sensiblement. Quel facteur a changé la viscosité de la sauce?", k: "La concentration : plus de substance dissoute ou mélangée dans un volume donné", w: ["La température à laquelle la sauce a été chauffée sur la cuisinière", "La force d'attraction entre la cuillère et la sauce qu'elle brasse", "La couleur de la sauce à mesure que la farine y est mélangée"] },
    { q: "Des gouttelettes de pluie s'accrochent à une corde à linge au lieu de tomber directement, parce que les particules d'eau attirent le matériau de la corde. Quel facteur est à l'œuvre dans le comportement de l'eau?", k: "La force d'attraction entre les particules", w: ["La concentration de l'eau de pluie", "La température de l'air ce jour-là", "Le volume des gouttes de pluie sur la corde"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Trois facteurs modifient la viscosité d'un liquide : la température, la concentration, et la force d'attraction entre les particules (dans le liquide lui-même, et entre le liquide et la surface sur laquelle il s'écoule). Chaque cas ici isole l'un des trois.",
    {});
}, ["La liste des facteurs compte trois éléments. Lequel le cas a-t-il changé?", "Réchauffé ou refroidi veut dire la température; plus de substance dissoute veut dire la concentration."]);

E("s8f-u2-heating-honey", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("Selon la théorie particulaire, pourquoi le chauffage fait-il couler le miel plus vite?",
      "Les particules chauffées bougent plus vite et plus loin les unes des autres, donc il y a moins de friction entre elles et leur attraction faiblit, ce qui abaisse la viscosité",
      ["Les particules chauffées bougent plus lentement et se tassent plus près les unes des autres, donc le miel réchauffé glisse comme une seule feuille solide",
       "Le chauffage ajoute plus de particules au miel à mesure qu'il se réchauffe, augmentant sa concentration et abaissant sa viscosité de cette façon",
       "Le chauffage détruit complètement l'attraction entre les particules, donc le miel se transforme en gaz à mesure qu'il se réchauffe"],
      "La théorie particulaire l'explique en trois étapes : les particules sont toujours en mouvement, le chauffage leur donne plus d'énergie donc elles bougent plus vite et plus loin les unes des autres, et avec plus d'espace entre elles il y a moins de friction et une attraction plus faible entre les particules. Moins de friction interne veut dire une viscosité plus faible, donc le miel réchauffé s'écoule plus vite.",
      {});
  }
]), ["Travaille à travers les particules : énergie, espacement, friction, puis viscosité.", "Plus vite, plus loin, moins de friction : la viscosité baisse."]);

E("s8f-u2-concentration", 2, ["SC8.4.2"], 3, "var", varset([
  function () {
    return mcq("Une laiterie liste le lait écrémé, le lait à 1 pour cent, le lait à 2 pour cent, le lait entier et la crème en ordre de concentration croissante en matières grasses. Un élève prédit que leurs viscosités suivront le même ordre. La prédiction est-elle solide, et pourquoi?",
      "Oui : une concentration plus élevée veut dire plus de particules dans un volume donné, ce qui augmente la friction entre les particules et donc augmente la viscosité",
      ["Oui, la prédiction est solide jusque-là, mais seulement parce que la crème a une couleur différente du lait écrémé et des autres produits de la liste",
       "Non : la concentration est une propriété qui influe seulement sur les gaz de cette façon, et elle n'a aucun effet du tout sur la viscosité de liquides comme le lait",
       "Non : une concentration plus élevée de particules abaisse toujours la viscosité d'un liquide, quel que soit le liquide et ce qui y est dissous"],
      "La concentration est la quantité de substance dans un volume donné. Plus de particules entassées dans le même espace veut dire plus de frottement et de friction à mesure que le liquide s'écoule, ce qui est une viscosité plus élevée. L'ordre de concentration de la laiterie est donc aussi l'ordre prévu de viscosité, la crème étant la plus visqueuse.",
      {});
  }
]), ["La concentration veut dire des particules par volume. Plus de particules dans le même espace veut dire quoi pour la friction?", "La prédiction tient ou tombe sur le lien avec la friction."]);

E("s8f-u2-cr-molasses", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("Les gens disent qu'un travailleur lent bouge « comme de la mélasse froide en hiver ». Selon la théorie particulaire, explique la science dans cette expression, et explique pourquoi la mélasse pour les crêpes se garde mieux dans l'armoire qu'au réfrigérateur. (3 points)",
      ["les particules froides bougent plus lentement et restent plus près, augmentant la friction et la viscosité", "la mélasse froide s'écoule donc très lentement", "la garder dans l'armoire la garde plus chaude et moins visqueuse pour la verser"],
      "<b>Réponse modèle :</b> La mélasse est déjà un liquide visqueux. Quand elle est froide, ses particules ont peu d'énergie, bougent lentement et restent près les unes des autres, donc la friction entre les particules est élevée et l'attraction entre elles tient fortement : sa viscosité augmente encore et elle coule à peine, ce qui est l'image que l'expression utilise. Au réfrigérateur, la mélasse reste froide et très visqueuse, donc elle se verse et s'étale mal sur les crêpes. Gardée dans l'armoire plus chaude, ses particules bougent plus vite et plus loin les unes des autres, la friction baisse, et la mélasse s'écoule comme prévu.<br><br><b>Points d'attribution :</b> 1 point pour le comportement des particules au froid (plus lentes, plus près, plus de friction). 1 point pour le lien de ce comportement à une viscosité plus élevée et un écoulement très lent. 1 point pour la conclusion sur la conservation tirée du même raisonnement.",
      {});
  }
]), ["Une idée explique les deux moitiés : ce que le froid fait aux particules.", "Froid, particules lentes, friction élevée, viscosité élevée. Puis applique-la à l'armoire."]);

/* ---------- SC8.4.3 Masse, volume et masse volumique ---------- */

E("s8f-u2-definitions", 2, ["SC8.4.3"], 1, "var", varset([
  function () {
    return mcq("Quel ensemble de définitions est correct?",
      "La masse est la quantité de matière dans un objet, le volume est la quantité d'espace qu'il occupe, et la masse volumique est sa masse par unité de volume",
      ["La masse est la force de la gravité sur un objet, le volume est son poids, et la masse volumique est sa masse par unité de volume",
       "La masse est la quantité d'espace dans un objet, le volume est la quantité de matière, et la masse volumique est son volume par unité de masse",
       "La masse, le volume et la masse volumique sont trois noms pour la même propriété"],
      "Les trois quantités se construisent les unes sur les autres. La masse mesure la quantité de matière, le volume mesure l'espace occupé, et la masse volumique les combine comme le rapport masse sur volume, la masse dans chaque unité de volume.",
      {});
  }
]), ["La masse volumique est le rapport des deux autres. Lesquels, dans quel ordre?", "La masse par unité de volume : les grammes dans chaque millilitre ou centimètre cube."]);

E("s8f-u2-states-density", 2, ["SC8.4.3"], 1, "gen", function () {
  var cases = [
    { q: "La même substance est comparée comme solide, liquide et gaz. Selon la théorie particulaire, quel énoncé sur la masse volumique est généralement correct?", k: "Le solide est généralement l'état le plus dense, parce que ses particules sont tassées le plus près les unes des autres, et le gaz est le moins dense", w: ["Le gaz est généralement le plus dense des trois états, parce que ses particules sont celles qui bougent le plus vite de toutes", "Les trois états de la substance ont exactement la même masse volumique les uns que les autres, parce que c'est la même substance dans chaque état", "L'état liquide est toujours le plus dense des trois états, quelle que soit la substance comparée dans le test"] },
    { q: "Une seringue scellée d'air est enfoncée, réduisant de moitié le volume de l'air pendant que sa masse reste la même. Qu'arrive-t-il à la masse volumique de l'air, et pourquoi?", k: "Elle double, parce que la même masse de particules est tassée dans la moitié de l'espace", w: ["Elle diminue de moitié, parce que la masse volumique baisse chaque fois que le volume baisse", "Elle reste la même, parce que la masse n'a pas changé", "Elle tombe à zéro, parce que les gaz n'ont aucune masse volumique quand ils sont comprimés"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La masse volumique suit l'espacement des particules. Dans un solide, les particules sont tassées le plus près, dans un liquide elles sont un peu plus loin les unes des autres, et dans un gaz elles sont loin les unes des autres, donc en général l'état solide d'une substance est son plus dense et son état gazeux son moins dense. Comprimer un gaz dans la moitié du volume avec la même masse double l'entassement, et donc double la masse volumique.",
    {});
}, ["La masse volumique est l'entassement : la masse tassée dans l'espace.", "Des particules plus près, une masse volumique plus élevée, pour la même substance."]);

E("s8f-u2-ratio-constant", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return mcq("Un petit échantillon d'aluminium a une masse de 27 g et un volume de 10 cm3. Un bloc d'aluminium beaucoup plus grand a un volume de 100 cm3. Quelle devrait être la masse du grand bloc, et quel principe cela montre-t-il?",
      "270 g : le rapport masse sur volume d'un matériau est une valeur constante, donc la masse augmente en proportion du volume",
      ["27 g : la masse d'un échantillon d'un matériau ne dépend pas du tout de la quantité de matériau qu'il y a",
       "54 g : la masse d'un échantillon double chaque fois que son volume augmente du tout, de quelque quantité que ce soit",
       "2700 g : la masse d'un échantillon augmente avec le carré de son volume à mesure que l'échantillon devient de plus en plus grand"],
      "Le petit échantillon donne la masse volumique de l'aluminium : 27 g divisés par 10 cm3 égalent 2,7 g/cm3. La masse volumique est un rapport constant pour un matériau, donc la masse du grand bloc est 2,7 fois 100, ce qui égale 270 g. Un plus gros morceau a proportionnellement plus de masse, jamais la même masse et jamais une quantité au carré.",
      {});
  }
]), ["Trouve d'abord le rapport à partir du petit échantillon, puis applique-le au grand volume.", "Un rapport constant veut dire une simple proportion."]);

E("s8f-u2-cr-layers", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return textq("Un élève verse soigneusement trois liquides dans un tube à essai : du glycérol (masse volumique 1,26 g/mL), de l'eau (1,00 g/mL) et de l'huile à machine (0,90 g/mL). Ils se déposent en couches au lieu de se mélanger uniformément. Énonce l'ordre des couches de bas en haut et explique-le au moyen de la masse volumique et de la théorie particulaire. (3 points)",
      ["le glycérol en bas, l'eau au milieu, l'huile en haut", "les liquides plus denses coulent sous les moins denses", "l'explication par l'entassement des particules"],
      "<b>Réponse modèle :</b> De bas en haut, l'ordre est le glycérol, puis l'eau, puis l'huile à machine. Les liquides qui ne se mélangent pas se déposent selon la masse volumique : le liquide dont les particules tassent le plus de masse dans chaque millilitre coule sous les autres. Le glycérol, à 1,26 g/mL, a le plus de masse dans chaque unité de volume, donc il prend le bas; l'eau, à 1,00 g/mL, se dépose au-dessus de lui; et l'huile à machine, à 0,90 g/mL, avec le moins de masse par unité de volume, flotte en haut.<br><br><b>Points d'attribution :</b> 1 point pour l'ordre correct, de bas en haut. 1 point pour la règle de dépôt (une plus grande masse volumique coule). 1 point pour l'explication par les particules ou la masse par volume liée aux valeurs données.",
      {});
  }
]), ["Trie d'abord les trois masses volumiques; le tube se trie de la même façon.", "La couche du bas est la plus grande masse dans chaque millilitre."]);

/* ---------- SC8.4.4 La masse volumique, quantitativement ---------- */

E("s8f-u2-calc-density", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.0, 2.5, 4.0, 5.0]);
  var V = pick([20, 25, 40, 50, 80, 100]);
  var m = Math.round(D * V * 100) / 100;
  var unit = pick(["g/mL", "g/cm3"]);
  var dis = s8fdis(D, [V / m, D * 2, D / 2, D + 1, m / (V + 10)]);
  return mcq("Un échantillon d'une substance a une masse de " + s8fn(m) + " g et un volume de " + V + (unit === "g/mL" ? " mL" : " cm3") + ". Quelle est sa masse volumique?",
    s8fn(D) + " " + unit,
    dis.map(function (d) { return s8fn(d) + " " + unit; }),
    "La masse volumique est la masse divisée par le volume : MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + V + ", ce qui égale " + s8fn(D) + " " + unit + ". Les unités portent le sens : les grammes dans chaque millilitre (ou centimètre cube) de la substance.",
    {});
}, ["Masse volumique égale masse divisée par volume. Divise, et garde l'unité avec la réponse.", "Prends garde à la division inversée parmi les choix."]);

E("s8f-u2-calc-mass", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.5]);
  var V = pick([20, 40, 50, 100, 200]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(m, [m * 2, m / 2, D + V, m + 20, V / D]);
  return mcq("Un liquide a une masse volumique de " + s8fn(D) + " g/mL. Quelle est la masse de " + V + " mL de ce liquide?",
    s8fn(m) + " g",
    dis.map(function (d) { return s8fn(d) + " g"; }),
    "Réarrange la formule de la masse volumique : m égale MV fois V, soit " + s8fn(D) + " g/mL fois " + V + " mL, ce qui égale " + s8fn(m) + " g. Chaque millilitre transporte " + s8fn(D) + " g, et il y en a " + V + ".",
    {});
}, ["Masse égale masse volumique fois volume. Chaque millilitre contribue les grammes de la masse volumique.", "Multiplie, ne divise pas : la masse de 100 mL devrait dépasser le nombre de la masse volumique."]);

E("s8f-u2-calc-volume", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 5.0]);
  var V = pick([20, 25, 40, 50, 80]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(V, [m * D, V * 2, V / 2, m - D, m / (D + 1)]);
  return mcq("Un morceau solide de métal a une masse de " + s8fn(m) + " g et une masse volumique de " + s8fn(D) + " g/cm3. Quel est son volume?",
    s8fn(V) + " cm3",
    dis.map(function (d) { return s8fn(d) + " cm3"; }),
    "Réarrange la formule de la masse volumique : V égale m divisé par MV, soit " + s8fn(m) + " g divisés par " + s8fn(D) + " g/cm3, ce qui égale " + s8fn(V) + " cm3. Le volume compte combien d'unités de masse de la taille de la masse volumique le morceau contient.",
    {});
}, ["Volume égale masse divisée par masse volumique.", "Vérifie la taille : un matériau plus dense tasse la même masse dans moins de volume."]);

E("s8f-u2-identify-substance", 2, ["SC8.4.4"], 3, "var", varset([
  function () {
    var q = mcq("Un élève mesure un échantillon liquide : masse 63 g, volume 50 mL. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "Le glycérol",
      ["L'alcool éthylique", "L'huile à machine", "L'eau de mer"],
      "Calcule d'abord : MV égale m divisé par V, soit 63 g divisés par 50 mL, ce qui égale 1,26 g/mL. Puis associe au tableau : le glycérol y figure à 1,26 g/mL. Le tableau s'utilise après le calcul, et non à sa place.",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("Un échantillon de métal a une masse de 135 g et un volume de 50 cm3. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "L'aluminium",
      ["Le fer pur", "Le plomb pur", "Le sel gemme"],
      "MV égale m divisé par V, soit 135 g divisés par 50 cm3, ce qui égale 2,70 g/cm3. Le tableau liste l'aluminium à 2,70 g/cm3, bien sous le fer (7,87) et le plomb (11,34).",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("Un échantillon liquide a une masse de 39,5 g et un volume de 50 mL. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "L'alcool éthylique",
      ["L'huile à machine", "L'eau de mer", "L'eau"],
      "MV égale m divisé par V, soit 39,5 g divisés par 50 mL, ce qui égale 0,79 g/mL. Le tableau liste l'alcool éthylique à 0,79 g/mL, moins dense que l'eau, comme un alcool devrait l'être.",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  }
]), ["Deux étapes : calcule la masse volumique, puis trouve-la dans le tableau.", "Le tableau contient les réponses, mais seulement après ta division."]);

E("s8f-u2-displacement-calc", 2, ["SC8.4.4"], 2, "gen", function () {
  var Vi = pick([50, 100, 200]);
  var rise = pick([12, 15, 20, 25, 30]);
  var D = pick([1.2, 1.5, 2.0, 2.5, 3.0]);
  var m = Math.round(D * rise * 100) / 100;
  var dis = s8fdis(D, [m / Vi, m / (Vi + rise), D * 2, D / 2]);
  return mcq("Un cylindre gradué contient " + Vi + " mL d'eau. Une pierre est descendue dedans et le niveau monte à " + (Vi + rise) + " mL. La masse de la pierre est de " + s8fn(m) + " g. Quelle est la masse volumique de la pierre?",
    s8fn(D) + " g/cm3",
    dis.map(function (d) { return s8fn(d) + " g/cm3"; }),
    "Le volume de la pierre est l'eau déplacée : " + (Vi + rise) + " mL moins " + Vi + " mL égalent " + rise + " mL, et 1 mL égale 1 cm3. Puis MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + rise + " cm3, ce qui égale " + s8fn(D) + " g/cm3. Le niveau de départ n'est pas le volume de la pierre; la montée l'est.",
    {});
}, ["La montée du niveau est le volume. Soustrais avant de diviser.", "Le déplacement donne d'abord le volume; la masse volumique vient ensuite."]);

E("s8f-u2-cr-density-block", 2, ["SC8.4.4"], 2, "var", varset([
  function () {
    return textq("Un bloc rectangulaire mesure 20 cm sur 10 cm sur 5 cm et a une masse de 2700 g. (a) Calcule le volume du bloc. (b) Calcule sa masse volumique. (c) Énonce, avec une raison, si le bloc flotterait ou coulerait dans l'eau (masse volumique 1,00 g/cm3). (3 points)",
      ["le volume est 1000 cm3 à partir des trois dimensions multipliées", "la masse volumique est 2,7 g/cm3 à partir de la masse divisée par le volume", "il coule parce que sa masse volumique est plus grande que celle de l'eau"],
      "<b>Réponse modèle :</b> (a) V égale longueur fois largeur fois hauteur, soit 20 cm fois 10 cm fois 5 cm, ce qui égale 1000 cm3. (b) MV égale m divisé par V, soit 2700 g divisés par 1000 cm3, ce qui égale 2,7 g/cm3. (c) Le bloc coulerait : sa masse volumique, 2,7 g/cm3, est plus grande que la masse volumique de l'eau, 1,00 g/cm3, donc son poids l'emporte sur la force de flottabilité que l'eau peut fournir.<br><br><b>Points d'attribution :</b> 1 point pour le volume à partir des dimensions. 1 point pour le calcul de la masse volumique avec les unités. 1 point pour le jugement de couler lié à la comparaison des masses volumiques.",
      {});
  }
]), ["Trois étapes en ordre : les dimensions au volume, la masse et le volume à la masse volumique, la masse volumique à un appel flotter ou couler.", "La masse volumique de l'eau, 1,00, est la norme de comparaison pour la partie (c)."]);

/* ---------- SC8.4.5 La température et la masse volumique ---------- */

E("s8f-u2-temp-density", 2, ["SC8.4.5"], 1, "gen", function () {
  var cases = [
    { q: "Un ballon rempli d'air est mesuré, placé dans un congélateur, et mesuré de nouveau : sa circonférence est plus petite. Qu'est-il arrivé à la masse volumique de l'air à l'intérieur?", k: "Elle a augmenté, parce que la même masse d'air occupe maintenant un volume plus petit", w: ["Elle a diminué, parce que l'air froid pèse toujours moins que le même air quand il est chaud", "Elle est restée exactement la même, parce que la masse de l'air à l'intérieur n'a pas changé du tout", "Elle est tombée jusqu'à zéro, parce que l'air à l'intérieur s'est contracté dans le congélateur froid"] },
    { q: "L'alcool dans un thermomètre monte dans le tube par une journée chaude. Quel énoncé explique cela au moyen du volume et de la masse volumique?", k: "L'alcool réchauffé se dilate, prenant plus de volume, donc sa masse volumique baisse et il monte dans le tube", w: ["L'alcool réchauffé se contracte en chauffant, donc sa masse volumique augmente et le pousse dans le tube étroit", "Le tube de verre rétrécit dans la chaleur du jour, pressant l'alcool vers le haut à l'intérieur du tube", "La masse de l'alcool augmente à mesure qu'il se réchauffe, et la masse supplémentaire le force vers le haut dans le tube"] },
    { q: "Les lignes électriques sont tendues lâchement parce qu'elles pendents davantage en été qu'en hiver. Que montre l'affaissement?", k: "Le métal réchauffé se dilate, son volume augmente, et sa masse volumique diminue", w: ["Le métal réchauffé se contracte dans la chaleur et devient plus dense en le faisant", "Les lignes gagnent de la masse supplémentaire en restant dans la chaleur de l'été", "La gravité elle-même devient plus forte pendant les mois d'été"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La température change la masse volumique par le volume. Réchauffer une substance fait s'écarter ses particules : la même masse occupe plus de volume, donc la masse volumique baisse. Le refroidissement inverse le processus : le volume rétrécit et la masse volumique augmente. Le ballon, le thermomètre et les lignes électriques sont des démonstrations quotidiennes de la même relation.",
    {});
}, ["Garde la masse fixe et suis le volume : la masse volumique bouge dans l'autre direction.", "Se dilater veut dire moins dense; se contracter veut dire plus dense."]);

E("s8f-u2-ice-exception", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return mcq("La plupart des substances sont plus denses comme solides que comme liquides, mais la glace flotte sur l'eau. Quel énoncé explique l'exception?",
      "Quand l'eau gèle, elle se dilate à cause de sa structure moléculaire, donc la glace prend plus de volume pour la même masse et sa masse volumique tombe sous celle de l'eau liquide",
      ["La glace flotte seulement parce qu'elle emprisonne des bulles d'air en elle pendant qu'elle gèle, et l'eau gelée sans ces bulles coulerait au fond du lac",
       "La glace est plus froide que l'eau sous elle, et les objets froids flottent toujours sur les objets plus chauds sous eux, quelle que soit leur masse volumique",
       "L'eau est l'exception parce que son état liquide est plus dense que l'état liquide de toute autre substance connue, et son état solide suit la règle ordinaire"],
      "L'eau brise la règle générale. En gelant, ses molécules s'arrangent en une structure avec plus d'espace entre elles : le volume augmente pendant que la masse reste la même, donc la masse volumique diminue. La glace, à environ 0,92 g/cm3 dans les chiffres ronds utilisés en classe, est moins dense que l'eau liquide et flotte. L'eau est nommée l'exception explicitement.",
      {});
  }
]), ["L'exception concerne l'espacement : l'eau qui gèle écarte ses molécules.", "Plus de volume, même masse, masse volumique plus faible : la flottaison s'ensuit."]);

E("s8f-u2-hot-air", 2, ["SC8.4.5"], 1, "var", varset([
  function () {
    return mcq("Pourquoi l'air à l'intérieur d'une montgolfière devient-il moins dense quand il est chauffé?",
      "Les particules chauffées bougent plus vite et s'écartent davantage, donc chaque unité de volume contient moins de masse",
      ["Le chauffage retire les particules du ballon en les chassant par l'ouverture à sa base",
       "Les particules chauffées elles-mêmes rétrécissent en taille, laissant des vides entre elles qui ne contiennent aucune masse",
       "Le tissu du ballon s'étire et ajoute du volume, pendant que rien à l'intérieur du ballon ne change du tout"],
      "Le chauffage donne aux particules de l'air plus d'énergie; elles bougent plus vite et s'écartent davantage. Le volume du ballon contient alors moins de particules, moins de masse dans chaque unité de volume, ce qui est une masse volumique plus faible. Cette masse volumique plus faible est ce qui permet à l'air du ballon d'être soulevé par l'air extérieur plus frais et plus dense.",
      {});
  }
]), ["La même histoire que chaque cas de température : l'espacement décide de la masse volumique.", "Des particules écartées veulent dire moins de masse dans chaque unité de volume."]);

E("s8f-u2-cr-temp-situations", 2, ["SC8.4.5"], 3, "var", varset([
  function () {
    return textq("Utilise la relation entre la température, le volume et la masse volumique pour expliquer ces deux situations : (a) le revêtement de vinyle installé par temps froid doit être posé avec de petits espaces entre les morceaux; (b) on avertit les conducteurs de ne pas trop gonfler les pneus de voiture pendant les mois chauds d'été. (3 points)",
      ["le revêtement se dilate en se réchauffant, donc les espaces lui laissent de la place", "l'air chauffé dans les pneus se dilate et la pression augmente", "les deux découlent des particules qui s'écartent à mesure que la température augmente"],
      "<b>Réponse modèle :</b> Les deux situations viennent du même comportement : à mesure qu'une substance se réchauffe, ses particules bougent plus vite et s'écartent davantage, donc son volume augmente et sa masse volumique diminue. (a) Un revêtement posé serré au froid se dilaterait à mesure que le temps se réchauffe et, sans nulle part où aller, gondolerait; les petits espaces laissent de la place pour cette dilatation. (b) L'air scellé dans un pneu se dilate en chauffant l'été, et puisque le volume du pneu ne peut augmenter que légèrement, l'air qui se dilate augmente la pression à l'intérieur; un pneu rempli à sa limite le matin frais peut être poussé au-delà d'une pression sûre par la chaleur de l'après-midi.<br><br><b>Points d'attribution :</b> 1 point pour l'explication partagée par les particules (le réchauffement écarte les particules, le volume augmente, la masse volumique baisse). 1 point pour l'avoir appliquée à la place de dilatation du revêtement. 1 point pour l'avoir appliquée à l'air du pneu qui se dilate et augmente la pression.",
      {});
  }
]), ["Un principe, deux applications. Énonce le principe une fois, puis utilise-le deux fois.", "La dilatation est le mot clé dans les deux situations."]);

/* ---------- SC8.4.6 Les changements de masse volumique dans la vie quotidienne ---------- */

E("s8f-u2-seasoning", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("Les constructeurs de bateaux sèchent (assaisonnent) le bois avant de l'utiliser, et le bois séché flotte plus haut que le bois fraîchement coupé. Pourquoi le séchage change-t-il le bois de cette façon?",
      "Le séchage retire l'eau du bois, donc sa masse baisse pendant que son volume reste presque le même, ce qui abaisse sa masse volumique",
      ["Le séchage ajoute de l'air dans le bois à mesure qu'il s'assaisonne, et l'air ajouté augmente la masse du bois",
       "Le séchage chauffe le bois en permanence, ce qui garde ses particules écartées même après qu'il refroidit de nouveau",
       "Le séchage change la couleur du bois, et le changement de couleur est ce qui change la façon dont l'eau le soutient"],
      "L'assaisonnement est un changement délibéré de masse volumique. Le bois frais contient beaucoup d'eau; en séchant, cette eau part, la masse baisse, le volume change à peine, et la masse volumique tombe. Une masse volumique plus faible veut dire que le bois flotte plus haut, une raison pour laquelle les constructeurs assaisonnent le bois pour les embarcations.",
      {});
  }
]), ["Qu'est-ce qui quitte le bois pendant le séchage, et quel ingrédient de la masse volumique cela change-t-il?", "Masse en baisse, volume stable : masse volumique en baisse."]);

E("s8f-u2-density-life", 2, ["SC8.4.6"], 1, "gen", function () {
  var cases = [
    { q: "Un sous-marin plonge en ouvrant ses réservoirs de ballast à la mer. Quel changement de masse volumique fait se produire la plongée?", k: "L'eau qui entre dans les réservoirs augmente la masse volumique moyenne du sous-marin au-dessus de celle de l'eau de mer, donc il coule", w: ["L'air qui entre dans les réservoirs de ballast abaisse la masse volumique moyenne du sous-marin, et c'est ce qui le fait couler", "Les réservoirs chauffent l'eau de mer à mesure qu'elle entre, abaissant la masse volumique de l'eau autour du sous-marin", "La coque du sous-marin rétrécit en volume jusqu'à ce que le bâtiment entier soit plus dense que l'eau de mer autour de lui"] },
    { q: "Un poisson monte de l'eau profonde vers la surface en gonflant sa vessie natatoire de gaz. Qu'est-ce que le poisson a changé?", k: "Son volume a augmenté pendant que sa masse changeait à peine, abaissant sa masse volumique moyenne", w: ["Sa masse a augmenté à mesure que la vessie se remplissait, ce qui a augmenté sa masse volumique moyenne au lieu de l'abaisser", "La masse volumique de l'eau autour du poisson a diminué à mesure que le poisson commençait à monter", "Son poids a augmenté jusqu'à dépasser la force de flottabilité qui agit sur lui dans l'eau"] },
    { q: "Les nageurs trouvent plus facile de flotter dans l'océan que dans un étang d'eau douce. Quel fait de masse volumique explique cela?", k: "L'eau de mer est plus dense que l'eau douce, donc elle fournit un plus grand effet de flottabilité pour le même nageur", w: ["L'eau de mer est moins dense que l'eau douce, donc les nageurs coulent moins profondément quand ils flottent dans l'océan", "L'océan est beaucoup plus profond qu'un étang, et cette profondeur est ce qui tient les nageurs à la surface", "Le sel dans l'eau rend le corps même du nageur moins dense au moment où il touche la peau"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les masses volumiques changent naturellement et par conception. Un sous-marin inonde ses réservoirs de ballast pour augmenter sa masse volumique moyenne et plonger; un poisson gonfle sa vessie natatoire pour augmenter son volume et abaisser sa masse volumique moyenne et monter; et un nageur flotte plus facilement dans l'eau de mer plus dense que dans l'eau douce. Dans chaque cas, la comparaison des masses volumiques décide du mouvement.",
    {});
}, ["Demande de qui la masse volumique change, et dans quelle direction.", "Couler exige une masse volumique plus grande que le fluide; monter en exige une plus petite."]);

E("s8f-u2-cr-raise-ship", 2, ["SC8.4.6"], 3, "var", varset([
  function () {
    return textq("Un bateau de pêche a coulé dans un port et repose sur le fond. Des équipes de sauvetage attachent de gros barils scellés à la coque et les pompent pleins d'air, et le bateau monte lentement. Explique comment cela fonctionne, au moyen de la masse volumique moyenne et de la flottabilité. (3 points)",
      ["les barils ajoutent un grand volume avec peu de masse", "le bateau et les barils ensemble ont une masse volumique moyenne sous celle de l'eau", "donc la force de flottabilité l'emporte sur le poids total"],
      "<b>Réponse modèle :</b> Sur le fond, la masse volumique moyenne du bateau est plus grande que celle de l'eau, donc son poids bat la force de flottabilité. Les barils scellés changent la combinaison : ils ajoutent beaucoup de volume tout en ajoutant très peu de masse, parce que l'air en eux a une très faible masse volumique. La masse volumique moyenne du bateau plus les barils tombe sous la masse volumique de l'eau, donc la force de flottabilité sur le volume combiné devient plus grande que le poids total, et le bateau monte. C'est le même principe de masse volumique moyenne qui permet à un navire d'acier de flotter.<br><br><b>Points d'attribution :</b> 1 point pour les barils qui ajoutent du volume avec peu de masse. 1 point pour la masse volumique moyenne de la combinaison qui tombe sous la masse volumique de l'eau. 1 point pour la force de flottabilité qui dépasse alors le poids, donc le bateau monte.",
      {});
  }
]), ["Rien du bateau lui-même ne change. Qu'est-ce que la combinaison du bateau plus les barils change?", "La masse volumique moyenne est tout le jeu : volume en hausse, masse à peine en hausse."]);

/* ---------- SC8.4.7 Les forces équilibrées et non équilibrées ---------- */

E("s8f-u2-forces", 2, ["SC8.4.7"], 1, "gen", function () {
  var cases = [
    { q: "Un chariot reste immobile sur une pente parce que l'attraction vers le bas de la pente est exactement égalée par la friction qui le retient. Comment les forces sur le chariot sont-elles décrites?", k: "Des forces équilibrées : égales et opposées, donc le chariot n'accélère pas", w: ["Des forces non équilibrées : le chariot est sur une pente, donc la gravité doit gagner", "Des forces équilibrées : les deux forces qui agissent sur le chariot pointent dans la même direction", "Aucune force d'aucune sorte n'agit sur un chariot qui reste immobile et ne bouge pas du tout"] },
    { q: "Une pierre tombée accélère à mesure qu'elle tombe dans l'air vers le sol. Comment les forces sur la pierre sont-elles décrites?", k: "Des forces non équilibrées : l'attraction de la gravité est plus grande que la résistance de l'air, donc la pierre accélère", w: ["Des forces équilibrées : les objets qui tombent ont toujours des forces équilibrées qui agissent sur eux", "Des forces non équilibrées : la résistance de l'air est plus grande que l'attraction de la gravité sur la pierre", "Aucune force du tout n'agit sur la pierre une fois qu'elle a quitté la main qui l'a lâchée"] },
    { q: "Un bateau flotte immobile à un quai, sans monter ni couler. Comment les forces sur le bateau sont-elles décrites?", k: "Des forces équilibrées : son poids et la force de flottabilité sont égaux et opposés", w: ["Des forces non équilibrées : flotter veut toujours dire que la force de flottabilité est la plus grande", "Des forces équilibrées : aucune force du tout n'agit sur quoi que ce soit qui flotte sur l'eau", "Des forces non équilibrées : son poids est plus grand que la force de flottabilité, mais seulement lentement"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les forces équilibrées sont égales et opposées : l'objet reste au repos ou garde son mouvement inchangé. Les forces non équilibrées sont inégales, et l'objet accélère dans la direction de la plus grande force. Un chariot immobile, une pierre qui accélère et un bateau qui flotte couvrent les trois modèles.",
    {});
}, ["Pose deux questions : les forces sont-elles égales, et le mouvement change-t-il?", "Égales et opposées veut dire équilibrées, quel que soit le décor."]);

E("s8f-u2-force-figure", 2, ["SC8.4.7"], 2, "var", varset([
  function () {
    var q = mcq("Le schéma montre une roche dans l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids de la roche. Que te disent les flèches, et qu'arrive-t-il à la roche?",
      "Le poids est plus grand que la force de flottabilité, donc les forces sont non équilibrées et la roche coule",
      ["La force de flottabilité est plus grande que le poids de la roche, donc la roche monte dans l'eau",
       "Les deux forces sont équilibrées et égales, donc la roche flotte suspendue à cette profondeur dans l'eau",
       "Les flèches dans le schéma montrent la masse de la roche et son volume, et non les forces qui agissent sur elle"],
      "La longueur de la flèche représente la taille de la force. La flèche vers le bas, le poids, est plus longue que la flèche de flottabilité vers le haut, donc les forces sont non équilibrées avec le poids qui gagne : la roche coule. C'est la règle pour couler.",
      {});
    q.figure = s8fForceSVG("sink");
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un bateau à la surface de l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids du bateau. Que te disent les flèches?",
      "Les forces sont équilibrées et égales, donc le bateau flotte sans monter ni couler",
      ["Le poids est la plus grande des deux forces, donc le bateau est sur le point de couler sous la surface",
       "La force de flottabilité est la plus grande des deux, donc le bateau monte hors de l'eau",
       "Des flèches égales veulent dire qu'aucune force du tout n'agit sur le bateau pendant qu'il flotte là"],
      "Les deux flèches ont la même longueur, donc le poids et la force de flottabilité sont égaux et opposés : des forces équilibrées. Un objet qui flotte au repos est exactement cet équilibre, la règle pour flotter.",
      {});
    q.figure = s8fForceSVG("float");
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un ballon sous l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids du ballon. Qu'arrive-t-il quand le ballon est relâché, et pourquoi?",
      "Il monte, parce que la force de flottabilité est plus grande que son poids, une paire de forces non équilibrées",
      ["Il coule directement au fond, parce que son poids est plus grand que la force de flottabilité qui pousse sur lui",
       "Il reste exactement où il est sous l'eau, parce que les deux forces qui agissent sur lui sont équilibrées",
       "Il se déplace de côté dans l'eau, parce que les deux flèches pointent verticalement vers le haut et le bas"],
      "La flèche vers le haut est beaucoup plus longue : la force de flottabilité sur le ballon rempli d'air dépasse de loin son petit poids. Les forces non équilibrées accélèrent l'objet vers la plus grande force, donc le ballon monte, le troisième modèle à côté de couler et de flotter.",
      {});
    q.figure = s8fForceSVG("rise");
    return q;
  }
]), ["La longueur de la flèche est la taille de la force. Compare les deux longueurs avant tout le reste.", "La flèche la plus longue gagne; des flèches égales s'équilibrent."]);

E("s8f-u2-newton", 2, ["SC8.4.7"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé sur la force et son unité est correct?",
      "La force se mesure en newtons; sur la Terre, une masse d'environ 100 g exerce une force d'environ 1 newton par la gravité",
      ["La force se mesure en kilogrammes; sur la Terre, une masse de 1 kg exerce une force d'exactement 1 newton",
       "La force se mesure en pascals; dans ce système, 1 newton de force égale exactement 1 pascal",
       "La force et la masse se mesurent toutes les deux dans la même unité, le gramme, dans chaque mesure prise en classe"],
      "Le newton est l'unité de la force. Le repère pratique : sur la Terre, environ 100 grammes de masse pèsent environ 1 newton. Les kilogrammes et les grammes mesurent la masse, et les pascals mesurent la pression; garder les unités séparées fait partie de garder les idées séparées.",
      {});
  }
]), ["La force a sa propre unité. Laquelle, et quel est le repère terrestre pour sa taille?", "Les newtons pour la force; les grammes et les kilogrammes pour la masse."]);

/* ---------- SC8.4.8 La masse et le poids ---------- */

E("s8f-u2-mass-weight", 2, ["SC8.4.8"], 1, "gen", function () {
  var cases = [
    { q: "Quelle quantité décrit la quantité de matière dans un objet, et avec quoi se mesure-t-elle?", k: "La masse, mesurée avec une balance en grammes ou en kilogrammes", w: ["La masse, mesurée avec un dynamomètre et consignée en newtons au laboratoire", "Le poids, mesuré avec une balance en grammes ou en kilogrammes", "Le poids, mesuré avec un dynamomètre en grammes"] },
    { q: "Quelle quantité décrit la force de la gravité qui tire sur un objet, et avec quoi se mesure-t-elle?", k: "Le poids, mesuré avec un dynamomètre (balance à ressort) en newtons", w: ["La masse, mesurée avec un dynamomètre et consignée en newtons au laboratoire", "Le poids, mesuré avec une balance et consigné en kilogrammes au laboratoire", "La masse, mesurée avec une balance et consignée en newtons au laboratoire"] },
    { q: "Une brique est pesée sur la Terre, puis descendue dans un réservoir d'eau, où son poids mesuré baisse. Qu'est-il arrivé à sa masse?", k: "Sa masse est restée la même; seul le poids mesuré a changé, parce que la force de flottabilité de l'eau en soutient une partie", w: ["Sa masse a diminué d'exactement la quantité d'eau qu'elle a déplacée en étant descendue sous la surface", "Sa masse a augmenté pendant qu'elle était dans le réservoir, parce que la brique a absorbé l'eau autour d'elle", "Sa masse est devenue zéro pour tout le temps qu'elle est restée submergée sous l'eau dans le réservoir"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La masse est la quantité de matière dans un objet; elle se mesure avec une balance et ne change pas quand l'objet est déplacé ou submergé. Le poids est la force de la gravité sur cette masse; il se mesure avec un dynamomètre en newtons et change quand la gravité change ou quand une autre force, comme la flottabilité, partage la charge.",
    {});
}, ["Quantité de matière : masse et balance. Attraction de la gravité : poids et dynamomètre.", "Submerger change l'attraction que tu mesures, jamais la matière dans la brique."]);

E("s8f-u2-moon-suitcase", 2, ["SC8.4.8"], 3, "var", varset([
  function () {
    return mcq("La valise d'une astronaute est remplie jusqu'à la limite de mission de 20 kg sur la Terre. À la station spatiale de la Lune, l'astronaute trouve que la valise pèse sensiblement moins, et s'inquiète que quelque chose a été retiré. Une collègue dit que rien ne manque. Qui a raison, et pourquoi?",
      "La collègue : la masse de la valise est toujours de 20 kg parce que sa matière est inchangée; son poids a baissé parce que la gravité de la Lune est plus faible que celle de la Terre",
      ["L'astronaute a raison de s'inquiéter : un poids plus faible veut toujours dire qu'une masse a été perdue de la valise quelque part pendant le voyage jusqu'à la station",
       "La collègue a raison que rien ne manque dans la valise, mais seulement parce que la masse de la valise a baissé avec son poids pendant la montée",
       "Ni l'une ni l'autre n'a raison : le poids d'un objet ne peut pas changer du tout à moins que la valise soit ouverte à la station et que quelque chose en soit retiré"],
      "La masse et le poids se séparent exactement ici. La valise contient la même quantité de matière sur la Lune, donc sa masse est toujours de 20 kg. Le poids est la force de la gravité sur cette masse, et l'attraction gravitationnelle de la Lune est plus faible que celle de la Terre, donc la même masse pèse moins. Ce scénario précis sert à séparer les deux idées.",
      {});
  }
]), ["Qu'est-ce qui voyage inchangé avec la valise, et qu'est-ce qui dépend d'où elle est?", "La matière se transporte; la gravité est locale."]);

E("s8f-u2-cr-mass-weight", 2, ["SC8.4.8"], 2, "var", varset([
  function () {
    return textq("Un camarade de classe insiste que la masse et le poids sont la même chose parce que « ma masse est de 50 kilogrammes, donc mon poids est de 50 aussi ». Corrige le camarade : décris la différence entre la masse et le poids, en utilisant les termes dynamomètre, balance et gravité, et donne la façon correcte d'énoncer chacune des deux quantités du camarade. (3 points)",
      ["la masse est la quantité de matière, mesurée avec une balance en kilogrammes", "le poids est la force de la gravité sur la masse, mesuré avec un dynamomètre en newtons", "le poids change si la gravité change pendant que la masse ne change pas"],
      "<b>Réponse modèle :</b> La masse et le poids sont des quantités différentes. La masse est la quantité de matière dans un objet; elle se mesure avec une balance et s'énonce en grammes ou en kilogrammes, donc la masse du camarade est bien de 50 kg, et elle reste de 50 kg où qu'il aille. Le poids est la force de la gravité qui tire sur cette masse; il se mesure avec un dynamomètre (une balance à ressort) et s'énonce en newtons. Sur la Terre, le poids du camarade est d'environ 500 N (environ 10 N pour chaque kilogramme, selon le repère d'environ 1 N par 100 g). Sur la Lune, la même masse de 50 kg pèserait beaucoup moins, parce que la gravité de la Lune est plus faible, pendant que la masse resterait inchangée.<br><br><b>Points d'attribution :</b> 1 point pour la masse définie comme la quantité de matière, mesurée avec une balance en kilogrammes. 1 point pour le poids défini comme la force de la gravité, mesuré avec un dynamomètre en newtons. 1 point pour le test du changement : le poids varie avec la gravité, la masse non.",
      {});
  }
]), ["Le camarade a le bon nombre sur la mauvaise quantité. Sépare les deux idées, puis réénonce les deux.", "L'une se mesure avec une balance, l'autre avec un dynamomètre."]);

/* ---------- SC8.4.9 La flottabilité ---------- */

E("s8f-u2-buoyancy-rule", 2, ["SC8.4.9"], 1, "var", varset([
  function () {
    return mcq("Un objet est placé entièrement sous l'eau et relâché. Quelle règle décide s'il flotte vers le haut ou coule?",
      "Il flotte si la force de flottabilité sur lui est plus grande que son poids, et coule si son poids est plus grand que la force de flottabilité",
      ["Il flotte s'il se trouve être plus léger, dans l'ensemble, que le récipient qui contient l'eau dans laquelle l'objet a été placé",
       "Il coule s'il est fait d'un matériau solide quelconque, quelles que soient les tailles des forces qui agissent sur lui",
       "Il flotte chaque fois que sa masse, mesurée en kilogrammes, est moindre que la température de l'eau dans laquelle il a été placé"],
      "La flottabilité est un concours de deux forces. La force de flottabilité pousse vers le haut; le poids de l'objet tire vers le bas. Une force de flottabilité plus grande veut dire que l'objet monte et flotte; un poids plus grand veut dire qu'il coule; des forces égales veulent dire qu'il reste suspendu ou flotte au repos. Le matériau seul ne décide rien; les forces décident.",
      {});
  }
]), ["Deux forces, une gagnante. Nomme les deux forces avant de choisir.", "Poussée vers le haut contre attraction vers le bas : c'est toute la règle."]);

E("s8f-u2-archimedes", 2, ["SC8.4.9"], 2, "var", varset([
  function () {
    return mcq("Qu'énonce le principe d'Archimède?",
      "La force de flottabilité qui agit sur un objet égale le poids du fluide déplacé par l'objet",
      ["La force de flottabilité qui agit sur un objet égale le volume du fluide déplacé par l'objet",
       "La force de flottabilité qui agit sur un objet égale le poids de l'objet lui-même",
       "La force de flottabilité qui agit sur un objet égale la force de la gravité qui agit sur le fluide dans le récipient"],
      "Le principe d'Archimède lie la flottabilité au déplacement : pousse l'eau de côté, et l'eau repousse avec une force égale au poids de l'eau poussée de côté. C'est le poids du fluide déplacé qui compte, et non son volume seul : le même volume d'un fluide plus dense pèse plus et soulève plus.",
      {});
  }
]), ["Le principe est une égalité. La force de flottabilité égale le poids de quoi?", "Le poids du fluide déplacé : force égale force."]);

E("s8f-u2-balls", 2, ["SC8.4.9"], 1, "gen", function () {
  var cases = [
    { q: "Trois balles de la même taille, faites de styromousse, de caoutchouc et de métal, sont poussées sous l'eau et relâchées au même moment. Quelle description de ce qui arrive est correcte?", k: "La balle de styromousse jaillit vers le haut et flotte haut, la balle de caoutchouc monte et flotte plus bas, et la balle de métal coule", w: ["Les trois balles flottent exactement au même niveau dans l'eau, parce que les trois ont la même taille", "La balle de métal flotte le plus haut des trois, parce que c'est la balle la plus lourde des trois", "La balle de caoutchouc coule directement au fond, parce que le caoutchouc absorbe l'eau à l'instant où il la touche"] },
    { q: "Un ballon de plage est très difficile à garder sous l'eau dans une piscine, et il jaillit dehors quand on le relâche. Quel énoncé explique le ballon de plage?", k: "Sa force de flottabilité quand il est entièrement immergé est beaucoup plus grande que son petit poids, donc la force non équilibrée le pousse vers le haut", w: ["Son poids est plus grand que la force de flottabilité sur lui, donc le ballon s'échappe vers le haut hors de l'eau", "La pression de l'eau annule son poids entièrement, donc aucune force n'agit sur le ballon du tout", "L'air scellé à l'intérieur du ballon est attiré par l'air au-dessus de la piscine, et cette attraction soulève le ballon"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La même taille veut dire la même eau déplacée et à peu près la même force de flottabilité disponible; les poids diffèrent énormément. La styromousse légère et un ballon de plage ont des poids bien sous cette force de flottabilité et sont poussés vers le haut; le poids du métal dense la dépasse et coule. La comparaison des deux forces explique chaque cas.",
    {});
}, ["Même taille, même eau déplacée. Qu'est-ce qui diffère d'une balle à l'autre?", "Le poids est la variable; la flottabilité est presque fixe selon la taille."]);

E("s8f-u2-cr-piggyback", 2, ["SC8.4.9"], 3, "var", varset([
  function () {
    return textq("Un élève trouve beaucoup plus facile de porter un petit frère sur son dos dans une piscine que dans le salon, même si la masse du frère est la même aux deux endroits. Explique la différence au moyen des forces de flottabilité. (3 points)",
      ["dans la piscine, l'eau exerce une force de flottabilité sur le frère", "la force de flottabilité agit à l'opposé de son poids, donc l'élève ne soutient que la différence", "sa masse et son vrai poids sont inchangés; la charge apparente est réduite"],
      "<b>Réponse modèle :</b> La masse du frère, et donc son vrai poids, est la même dans la piscine que dans le salon. La différence est une deuxième force. Submergé dans la piscine, l'eau exerce une force de flottabilité sur le frère, égale au poids de l'eau que son corps déplace, et cette force pousse vers le haut, à l'opposé de son poids. L'élève au fond n'a qu'à soutenir ce qui reste : le poids moins la force de flottabilité. Dans le salon, il n'y a aucune force de flottabilité qui vaille la peine d'être nommée, donc l'élève porte le poids entier.<br><br><b>Points d'attribution :</b> 1 point pour la force de flottabilité qui agit sur le frère submergé. 1 point pour elle qui agit à l'opposé de son poids, réduisant la charge que l'élève soutient. 1 point pour avoir énoncé que sa masse et son vrai poids sont inchangés.",
      {});
  }
]), ["Même frère, même masse. Quelle force supplémentaire existe dans la piscine qui n'existe pas dans le salon?", "L'eau aide à le porter. Dis comment, en termes de forces."]);

/* ---------- SC8.4.10 La pression, quantitativement ---------- */

E("s8f-u2-calc-pressure", 2, ["SC8.4.10"], 2, "gen", function () {
  var pairs = [[200, 4], [100, 0.5], [500, 10], [1000, 20], [250, 5], [400, 2], [2000, 0.5], [600, 20], [100, 4], [2000, 10], [150, 0.25], [900, 30]];
  var pr = pick(pairs);
  var F = pr[0], A = pr[1], P = F / A;
  var dis = s8fdis(P, [F * A, P * 2, P / 2, F - A, F + A]);
  return mcq("Une force de " + F + " N est appliquée sur une surface de " + s8fn(A) + " m2. Quelle pression est exercée?",
    s8fn(P) + " Pa",
    dis.map(function (d) { return s8fn(d) + " Pa"; }),
    "La pression est la force répartie sur la surface : P égale F divisé par A, soit " + F + " N divisés par " + s8fn(A) + " m2, ce qui égale " + s8fn(P) + " Pa. Un pascal est un newton réparti sur un mètre carré, donc l'unité découle du calcul.",
    {});
}, ["Pression égale force divisée par surface. Divise, et la réponse est en pascals.", "Répartir une force sur plus de surface abaisse la pression, ne l'augmente jamais."]);

E("s8f-u2-calc-force", 2, ["SC8.4.10"], 2, "gen", function () {
  var F1 = pick([10, 20, 25, 40, 50]);
  var ratio = pick([4, 5, 8, 10]);
  var A1 = 5, A2 = A1 * ratio, F2 = F1 * ratio;
  var dis = s8fdis(F2, [F1, F2 * 2, F1 + ratio, F2 - F1, F1 * 2]);
  return mcq("Dans un monte-charge hydraulique, une force de " + F1 + " N est appliquée à un petit piston d'une surface de " + A1 + " cm2. Le grand piston a une surface de " + A2 + " cm2. Quelle force le grand piston exerce-t-il?",
    F2 + " N",
    dis.map(function (d) { return s8fn(d) + " N"; }),
    "La pression est la même dans tout le liquide confiné : P égale F divisé par A, soit " + F1 + " N divisés par " + A1 + " cm2, ce qui égale " + (F1 / A1) + " N/cm2. Sur le grand piston, F égale P fois A, soit " + (F1 / A1) + " fois " + A2 + ", ce qui égale " + F2 + " N. La force est multipliée par le même rapport que les surfaces, " + ratio + " fois, ce qui est le but d'un monte-charge hydraulique.",
    {});
}, ["La pression est partagée; la force augmente en proportion de la surface. Trouve d'abord la pression, puis applique-la au grand piston.", "Le rapport des surfaces et le rapport des forces sont le même nombre."]);

E("s8f-u2-calc-area", 2, ["SC8.4.10"], 3, "gen", function () {
  var pairs = [[200, 50], [1000, 200], [500, 25], [2400, 400], [800, 80], [360, 60], [1500, 300], [720, 90]];
  var pr = pick(pairs);
  var F = pr[0], P = pr[1], A = F / P;
  var dis = s8fdis(A, [A * 2, A / 2, F * P / 100, P / F * 100, A + 5]);
  return mcq("Une pièce de machine doit exercer une force de " + F + " N tout en gardant la pression sur la surface à " + P + " Pa. Quelle surface de contact est exigée?",
    s8fn(A) + " m2",
    dis.map(function (d) { return s8fn(d) + " m2"; }),
    "Réarrange la formule de la pression : A égale F divisé par P, soit " + F + " N divisés par " + P + " Pa, ce qui égale " + s8fn(A) + " m2. Pour garder la pression basse à une force donnée, la surface doit être assez grande pour répartir la force; la division la dimensionne exactement.",
    {});
}, ["Surface égale force divisée par pression. C'est la troisième forme de la même formule.", "Vérifie la direction : plus de pression permise exigerait moins de surface."]);

E("s8f-u2-snowshoes", 2, ["SC8.4.10"], 1, "var", varset([
  function () {
    return mcq("Une personne portant des raquettes peut marcher sur la neige profonde et molle sans s'enfoncer, tandis que la même personne en bottes s'enfonce à chaque pas. Qu'est-ce qui explique la différence?",
      "Les raquettes répartissent le poids (la force) de la personne sur une surface beaucoup plus grande, donc la pression sur la neige est beaucoup plus faible",
      ["Les raquettes réduisent le poids réel de la personne pendant tout le temps qu'elle les porte sur la neige, donc chaque pas presse plus légèrement sur la surface",
       "Les raquettes augmentent la pression sur la neige en concentrant le poids sur leurs cadres, ce qui tasse la neige plus durement sous chaque pas que la personne fait",
       "Les raquettes changent la masse de la personne pendant qu'elles sont portées, donc la gravité tire moins sur elle et son poids total sur la neige diminue en conséquence"],
      "La force est identique dans les deux cas : le poids de la personne. La pression est la force divisée par la surface, donc répartir la même force sur la plus grande surface des raquettes abaisse la pression sous ce que la neige peut soutenir sans céder. Les bottes concentrent la force sur une petite surface et la pression perce.",
      {});
  }
]), ["Même personne, même poids. Une seule quantité dans P égale F divisé par A change.", "Plus grande surface, plus petite pression."]);

E("s8f-u2-cr-pressure-crate", 2, ["SC8.4.10"], 2, "var", varset([
  function () {
    return textq("Une caisse pèse 800 N et repose sur une base qui mesure 2 m sur 1 m. (a) Calcule la pression que la caisse exerce sur le plancher. (b) La caisse est placée sur une large planche qui double la surface de contact. Énonce la nouvelle pression et explique, au moyen de la relation de pression, pourquoi les travailleurs d'entrepôt utilisent de telles planches sous les caisses lourdes sur un sol mou. (3 points)",
      ["la surface de la base est 2 m2 et la pression est 400 Pa", "doubler la surface de contact réduit la pression de moitié à 200 Pa", "une pression plus faible veut dire que la surface est moins susceptible d'être endommagée ou de s'enfoncer"],
      "<b>Réponse modèle :</b> (a) La surface de la base est 2 m fois 1 m, ce qui égale 2 m2. P égale F divisé par A, soit 800 N divisés par 2 m2, ce qui égale 400 Pa. (b) Doubler la surface de contact à 4 m2 donne P égale 800 divisé par 4, soit 200 Pa : à la même force, doubler la surface réduit la pression de moitié. Les travailleurs utilisent des planches pour exactement cette raison : le poids de la caisse est inchangé, mais réparti sur une plus grande surface il presse moins sur chaque partie du sol, donc un sol mou est moins susceptible de céder ou d'être endommagé, le même principe que les raquettes.<br><br><b>Points d'attribution :</b> 1 point pour la surface et la pression de 400 Pa. 1 point pour la pression réduite de moitié, 200 Pa, quand la surface double. 1 point pour l'explication liant une pression plus faible à la protection de la surface à force inchangée.",
      {});
  }
]), ["La partie (a) exige d'abord la surface. La partie (b) est le principe des raquettes avec des nombres.", "La force reste fixe partout; seuls la surface et la pression bougent, en directions opposées."]);

/* ---------- SC8.4.11 La pression, le volume et la température dans les gaz ---------- */

E("s8f-u2-gas-laws", 2, ["SC8.4.11"], 1, "gen", function () {
  var cases = [
    { q: "Une seringue scellée d'air est enfoncée, réduisant de moitié le volume de l'air pendant que sa température reste la même. Qu'arrive-t-il à la pression de l'air à l'intérieur?", k: "Elle augmente, parce que les particules sont entassées dans un espace plus petit et frappent les parois plus souvent", w: ["Elle diminue, parce que l'air comprimé dans un espace plus petit perd toujours de la pression à mesure qu'il est pressé", "Elle reste exactement la même, parce que la quantité d'air scellée à l'intérieur de la seringue n'a pas changé du tout", "Elle tombe jusqu'à zéro et y reste jusqu'à ce que le piston de la seringue soit relâché de nouveau"] },
    { q: "Un ballon rempli d'air est placé au soleil chaud, libre de se dilater, et il grossit. Sa pression reste à peu près la même. Quelle relation cela montre-t-il?", k: "Augmenter la température d'un gaz augmente son volume quand la pression est gardée constante", w: ["Augmenter la température d'un gaz diminue son volume quand la pression est gardée constante", "La température d'un gaz n'a aucun effet du tout sur le volume que le gaz occupe", "Le volume du gaz a grossi parce que sa pression a doublé pendant qu'il restait au soleil"] },
    { q: "Une bouteille de plongée est remplie à haute pression à la boutique de plongée. En termes de particules, qu'est-ce qui est vrai de l'air à l'intérieur comparé à l'air à la pression ordinaire?", k: "Beaucoup plus de particules sont tassées dans le même volume, et c'est pourquoi les gaz, contrairement aux liquides, peuvent être comprimés de cette façon", w: ["Les particules de l'air elles-mêmes ont rétréci en taille pour que davantage d'entre elles entrent dans la bouteille", "L'air à l'intérieur de la bouteille est devenu un liquide sous la très haute pression utilisée pour remplir la bouteille", "La bouteille contient exactement le même nombre de particules que l'air ordinaire, chacune sous plus de force"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Pour les gaz, les deux relations sont : augmenter la pression sur un gaz diminue son volume quand la température est gardée constante, et augmenter la température augmente son volume quand la pression est gardée constante. Les deux fonctionnent parce que les particules de gaz sont loin les unes des autres avec de l'espace vide entre elles, donc les gaz peuvent être comprimés d'une façon dont les liquides sont incapables.",
    {});
}, ["Garde clair quelle quantité est gardée constante dans chaque cas.", "Les particules de gaz ont de l'espace entre elles : cet espace est ce que la compression retire."]);

E("s8f-u2-compressible", 2, ["SC8.4.11"], 1, "var", varset([
  function () {
    return mcq("Pourquoi les gaz peuvent-ils être comprimés dans un volume beaucoup plus petit pendant que les liquides se compriment à peine?",
      "Les particules de gaz sont loin les unes des autres avec beaucoup d'espace vide entre elles, pendant que les particules de liquide sont déjà près les unes des autres avec peu d'espace à retirer",
      ["Les particules d'un gaz sont beaucoup plus petites en taille que les particules d'un liquide, donc beaucoup plus d'entre elles entrent dans le même récipient",
       "Les particules d'un liquide se repoussent si fortement les unes les autres qu'elles ne peuvent pas être poussées plus près, pendant que les particules d'un gaz s'attirent faiblement",
       "Les gaz pèsent moins que des volumes égaux de liquides, donc la pression appliquée de l'extérieur touche les gaz beaucoup plus fortement qu'elle ne touche les liquides"],
      "La compressibilité concerne l'espace entre les particules. Dans un gaz, les particules sont largement séparées, donc les pousser plus près retire l'espace vide et rétrécit le volume grandement. Dans un liquide, les particules se touchent déjà presque, donc il n'y a presque aucun espace à retirer et le volume change à peine : les liquides sont effectivement incompressibles, et c'est pourquoi ils servent dans les systèmes hydrauliques.",
      {});
  }
]), ["Imagine l'espacement des particules dans chaque état. Lequel a de l'espace à céder?", "Loin les unes des autres se comprime; près les unes des autres ne se comprime pas."]);

E("s8f-u2-depth-pressure", 2, ["SC8.4.11"], 2, "var", varset([
  function () {
    return mcq("Une grande bouteille est remplie d'eau et a trois trous percés le long d'un côté, en haut, au milieu et en bas. Quand la bouteille est remplie, le jet du bas jaillit le plus loin et le jet du haut coule à peine. Que montre cette démonstration sur la pression des fluides?",
      "La pression d'un fluide augmente avec la profondeur, et elle pousse dans toutes les directions, poussant le jet le plus profond le plus fort",
      ["La pression d'un fluide est la même à toutes les profondeurs de la bouteille, et le trou du bas est simplement plus grand que les deux trous au-dessus de lui",
       "La pression d'un fluide agit seulement vers le bas dans la bouteille, ce qui explique pourquoi le jet du bas est le plus fort et les jets de côté sont les plus faibles",
       "L'eau au fond de la bouteille est plus dense que l'eau près du haut, et la masse volumique seule explique pourquoi les trois jets voyagent à des distances différentes"],
      "Le poids de l'eau au-dessus presse vers le bas à travers le fluide, donc la pression augmente avec la profondeur : le trou du bas ressent la plus grande pression et pousse son jet le plus loin. Les jets partent de côté, ce qui montre aussi que la pression d'un fluide à un point agit dans toutes les directions, et non seulement vers le bas.",
      {});
  }
]), ["Plus d'eau au-dessus veut dire plus de poids qui presse vers le bas. Que devrait-il arriver à la pression avec la profondeur?", "Les jets de côté portent le deuxième message : la pression pousse dans toutes les directions."]);

/* ---------- SC8.5.1 Les activités personnelles et la dynamique des fluides ---------- */

E("s8f-u2-personal", 2, ["SC8.5.1"], 1, "gen", function () {
  var cases = [
    { q: "Un cuisinier trouve que la pâte à crêpes faite trop mince coule partout sur la plaque, pendant que la pâte faite trop épaisse reste en tas. Quelle propriété des fluides le cuisinier ajuste-t-il?", k: "La viscosité : la résistance de la pâte à l'écoulement", w: ["La masse volumique : la masse de la pâte par unité de volume", "La pression : la force que la pâte exerce sur la plaque", "La flottabilité : la force que la plaque exerce sur la pâte"] },
    { q: "Un mécanicien choisit une huile à moteur plus mince pour une voiture qui roulera pendant un hiver de Terre-Neuve. Quel fait des fluides est derrière le choix?", k: "La viscosité de l'huile augmente à mesure que la température baisse, donc un grade plus mince est nécessaire pour la garder fluide dans le froid", w: ["La masse volumique de l'huile tombe jusqu'à zéro par temps froid à moins que l'huile soit un grade mince", "Le temps froid de l'hiver comprime l'huile dans le moteur, donc moins d'huile est nécessaire pour le remplir", "La pression de l'air d'hiver force l'huile épaisse et lourde hors des moteurs stationnés dans le froid"] },
    { q: "Une cycliste gonfle un pneu dur avant une course. Quel comportement des fluides utilise-t-elle?", k: "L'air est un fluide compressible, donc plus de particules peuvent être tassées dans le pneu pour augmenter sa pression", w: ["L'air est un fluide incompressible, tout comme les liquides scellés à l'intérieur des conduites de frein d'une voiture", "La viscosité de l'air baisse brusquement quand il est pompé dans un espace confiné comme un pneu", "La masse volumique du pneu lui-même diminue régulièrement à mesure que de plus en plus d'air y est ajouté"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La dynamique des fluides traverse les activités ordinaires : la pâte doit s'écouler au bon rythme, l'huile à moteur doit continuer de s'écouler dans le froid de l'hiver (la viscosité augmente à mesure que la température baisse, donc les grades d'hiver commencent plus minces), et les pneus fonctionnent parce que l'air se comprime. Relier l'activité à la propriété des fluides est la demande visée.",
    {});
}, ["Nomme le fluide, puis la propriété dont l'activité dépend.", "La pâte et l'huile sont des histoires de viscosité; le pneu est une histoire de compressibilité."]);

E("s8f-u2-winter-oil", 2, ["SC8.5.1"], 3, "var", varset([
  function () {
    return mcq("Deux moteurs identiques sont remplis de la même huile. L'un roule dans un garage chaud; l'autre est stationné dehors pendant une vague de froid de janvier à St. John's. À un démarrage à froid, l'huile du moteur extérieur circule mal et le moteur s'use plus vite. Quelle explication relie l'observation à la science des fluides?",
      "Le froid a augmenté la viscosité de l'huile, donc elle a résisté à l'écoulement vers les pièces mobiles; les particules de l'huile, bougeant lentement et restant près, ont produit plus de friction interne",
      ["La vague de froid a abaissé la viscosité de l'huile du moteur extérieur si loin que l'huile mince a coulé des pièces mobiles entièrement et les a laissées sans protection",
       "Le froid a comprimé l'huile dans le moteur extérieur jusqu'à ce qu'elle se transforme en un bloc solide, et un solide ne peut pas s'écouler pour lubrifier les pièces mobiles du moteur au démarrage",
       "Le froid de la nuit de janvier a changé la masse volumique de l'huile du moteur extérieur à zéro, donc la pompe à huile ne pouvait pas soulever l'huile jusqu'aux pièces mobiles qu'elle protège"],
      "L'observation, la propriété et l'explication par les particules s'alignent : une température qui baisse augmente la viscosité d'un liquide, l'huile épaissie résiste à l'écoulement dans les passages du moteur, et les pièces qui devraient être enduites roulent presque à sec. C'est pourquoi les grades d'huile d'hiver existent, et pourquoi le choix est une décision de dynamique des fluides, et non de marketing.",
      {});
  }
]), ["Une mauvaise circulation veut dire une grande résistance à l'écoulement. Que fait le froid à cette résistance?", "Suis-la entièrement : température, particules, friction, viscosité, circulation."]);

/* ---------- SC8.5.2 Les produits de la viscosité et les fluides de nettoyage ---------- */

E("s8f-u2-products", 2, ["SC8.5.2"], 1, "gen", function () {
  var cases = [
    { q: "Quel produit existe en plusieurs grades principalement à cause de notre compréhension de la viscosité?", k: "L'huile à moteur, classée pour que les moteurs puissent être assortis d'une huile qui s'écoule correctement à leurs températures de travail", w: ["Le verre à vitre, qui est classé pour les bâtiments selon la vitesse à laquelle le verre coule vers le bas avec le temps", "Le sel de table, qui est classé pour la vente selon l'épaisseur à laquelle les cristaux secs se versent de la boîte", "Les pneus de bicyclette, qui sont classés en tailles selon la viscosité du caoutchouc dont ils sont faits"] },
    { q: "Un shampoing est reformulé pour qu'il reste sur la main au lieu de couler, mais s'étale quand même dans les cheveux. Quelle compréhension a guidé la reformulation?", k: "La viscosité : ajuster la résistance du liquide à l'écoulement pour qu'il remplisse sa fonction", w: ["La flottabilité : ajuster la masse volumique moyenne du shampoing pour qu'il flotte sur l'eau", "La pression : ajuster la force que les parois de la bouteille de shampoing doivent supporter", "La masse volumique : ajuster la masse de shampoing qui est tassée dans chaque bouteille vendue"] },
    { q: "Le ketchup est conçu pour rester épais dans la bouteille et pourtant couler quand la bouteille est secouée et pressée. Sur quelle compréhension scientifique la conception est-elle construite?", k: "Comment le comportement d'écoulement d'un liquide peut être conçu pour sa fonction prévue", w: ["Comment les gaz sont comprimés et emmagasinés à l'intérieur de bouteilles scellées sous haute pression", "Comment les forces de flottabilité agissent sur les objets solides qui sont placés dans des liquides de masses volumiques différentes", "Comment la loi de Pascal transmet la pression à travers un fluide confiné d'un bout de la bouteille à l'autre"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Comprendre la viscosité permet aux fabricants de concevoir l'écoulement : l'huile à moteur vient en grades pour différentes températures, les shampoings et les peintures sont ajustés pour s'étaler sans couler, et des aliments comme le ketchup sont conçus autour de leur façon de se verser. La conception de chaque produit commence par la résistance du liquide à l'écoulement.",
    {});
}, ["Chaque produit est un problème d'écoulement résolu à dessein. Quelle propriété est conçue?", "Si le travail du produit concerne le versement, l'étalement ou l'enduction, la réponse est la viscosité."]);

E("s8f-u2-cleaning", 2, ["SC8.5.2"], 2, "var", varset([
  function () {
    return mcq("Le volet STSE principal étudie les fluides de nettoyage. Comment les savons et les détergents retirent-ils la graisse et la saleté que l'eau ordinaire laisse derrière?",
      "Leurs particules entourent et soulèvent la graisse, la brisant en minuscules gouttelettes qui restent en suspension dans l'eau et partent au rinçage",
      ["Ils dissolvent la surface sur laquelle la saleté repose, emportant toute la saleté avec elle à mesure que la surface se défait sous le nettoyage",
       "Ils augmentent la viscosité de l'eau jusqu'à ce que la saleté flotte de la surface entièrement d'elle-même et parte avec l'eau de rinçage versée dessus",
       "Ils compriment la graisse sur la surface jusqu'à ce que la graisse s'évapore dans l'air, laissant la surface propre sans aucun rinçage nécessaire"],
      "L'eau seule perle sur la graisse. Les particules de savon et de détergent ont des extrémités qui se comportent différemment : une extrémité se mélange à l'eau et l'autre à la graisse, donc elles entourent la graisse et la saleté, les soulèvent de la surface en minuscules gouttelettes en suspension, et l'eau de rinçage les emporte. C'est la science sur laquelle le sujet des fluides de nettoyage est construit.",
      {});
  }
]), ["L'eau ordinaire échoue sur la graisse. Que font les particules de nettoyage que l'eau ne peut pas faire?", "Entourer, soulever, suspendre, rincer : les quatre étapes."]);

E("s8f-u2-cr-cleaning-claim", 2, ["SC8.5.2"], 3, "var", varset([
  function () {
    return textq("Une publicité affirme : « Les fluides de nettoyage plus épais nettoient mieux, parce qu'une viscosité élevée veut dire un nettoyage plus fort. » Évalue cette affirmation : énonce ce que l'affirmation comprend bien ou mal au sujet de la viscosité, et décris un test équitable qui réglerait si un nettoyant de viscosité plus élevée nettoie réellement mieux. (4 points)",
      ["la viscosité est la résistance à l'écoulement, et non la force de nettoyage", "le nettoyage dépend de l'action du détergent sur la saleté et la graisse", "un test équitable garde la quantité de nettoyant, la surface, la saleté et le frottage les mêmes en variant le nettoyant", "un résultat mesurable comme la propreté jugée de la même façon pour chacun"],
      "<b>Réponse modèle :</b> L'affirmation confond deux propriétés différentes. La viscosité est la résistance d'un liquide à l'écoulement; elle dit avec quelle épaisseur un nettoyant se verse et s'étale, et non comment ses particules soulèvent la graisse. Le pouvoir de nettoyage vient de l'action du détergent : des particules qui entourent la saleté et la graisse et les suspendent pour qu'elles partent au rinçage, ce qu'un nettoyant mince peut faire aussi bien qu'un épais. Un test équitable : prépare des carreaux identiques avec la même quantité de la même saleté graisseuse; applique des quantités égales d'un nettoyant de viscosité élevée et d'un nettoyant de faible viscosité; frotte chacun le même nombre de coups avec la même brosse et rince de façon identique; puis compare la saleté restante au moyen de la même mesure pour les deux (par exemple, une photographie notée ou la masse de saleté retirée). Si le nettoyant plus épais ne retire pas plus de saleté dans des conditions identiques, l'affirmation échoue.<br><br><b>Points d'attribution :</b> 1 point pour avoir identifié la confusion (la viscosité est la résistance à l'écoulement, et non la force de nettoyage). 1 point pour la base correcte du nettoyage (l'action du détergent sur la saleté et la graisse). 1 point pour un test équitable avec les principales variables gardées les mêmes. 1 point pour un résultat mesurable, appliqué de façon identique.",
      {});
  }
]), ["Sépare d'abord les deux propriétés : ce que la viscosité mesure, et ce dont le nettoyage dépend.", "Puis conçois le test : même saleté, même quantité, même frottage, une chose changée."]);

/* ---------- SC8.5.3 La science et la technologie dans nos vies ---------- */

E("s8f-u2-lives", 2, ["SC8.5.3"], 1, "gen", function () {
  var cases = [
    { q: "Quel exemple montre la science et la technologie des fluides qui touchent la vie quotidienne dans une communauté?", k: "Le système d'eau d'une ville utilise des pompes et la pression pour livrer de l'eau propre aux maisons à toutes les hauteurs de la ville", w: ["Une ville peint l'extérieur de son château d'eau d'une nouvelle couleur chaque printemps pour le garder beau", "Une école achète un ensemble de nouveaux tapis de gym pour ses élèves à utiliser pendant le trimestre d'hiver à l'intérieur", "Une compagnie de traversier change son horaire de traversées pour la saison des fêtes à la fin de l'année"] },
    { q: "Quel exemple montre la science et la technologie des fluides qui touchent la vie quotidienne dans une maison?", k: "Les freins hydrauliques utilisent un liquide incompressible pour transporter la force du pied du conducteur aux quatre roues", w: ["Une famille choisit un plus grand écran de télévision à monter sur le mur de son salon à la maison", "Un élève aiguise un ensemble de crayons à l'aiguisoir avant le début des classes le matin", "Un boulanger règle la minuterie du four pour qu'un gâteau qui cuit dedans n'y soit pas laissé trop longtemps"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La science des fluides atteint la vie quotidienne par les systèmes construits sur elle : la livraison d'eau sous pression, les freins hydrauliques, les systèmes de chauffage et les pompes. Les exemples qui comptent sont ceux où une propriété des fluides fait le travail.",
    {});
}, ["Cherche l'exemple où une propriété des fluides fait un travail.", "Les pompes, la pression et l'hydraulique sont les fluides au travail."]);

E("s8f-u2-community", 2, ["SC8.5.3"], 1, "var", varset([
  function () {
    return mcq("Une communauté côtière remplace les freins et l'équipement de levage dans son centre de service de véhicules et modernise la direction hydraulique du traversier. Quel énoncé décrit le mieux comment la science et la technologie touchent cette communauté?",
      "Les technologies des fluides construites sur la loi de Pascal et l'incompressibilité des liquides font le gros travail dans tout le système de transport de la communauté",
      ["La communauté est touchée par le changement seulement parce que le nouvel équipement coûte considérablement plus cher que l'ancien équipement qu'il remplace dans le centre",
       "La science des fluides touche cette communauté côtière seulement à l'intérieur de ses propres classes de sciences, et nulle part ailleurs dans la vie quotidienne des gens qui y vivent",
       "La direction hydraulique du traversier compte comme une technologie dans la communauté, mais les freins installés dans les véhicules routiers ordinaires ne comptent pas du tout comme une technologie"],
      "Les systèmes hydrauliques transmettent la force à travers des liquides confinés, et ils font fonctionner les freins, les monte-charges et la direction de la communauté également. La science et la technologie touchent une communauté par les systèmes de travail dont elle dépend, et non seulement par les laboratoires et les classes.",
      {});
  }
]), ["Le fil commun est une loi qui travaille dans plusieurs machines.", "La loi de Pascal fait le travail dans chaque exemple nommé."]);

/* ---------- SC8.5.4 La science qui sous-tend les technologies ---------- */

E("s8f-u2-underlying", 2, ["SC8.5.4"], 1, "gen", function () {
  var cases = [
    { q: "Un densimètre flotte plus haut dans un liquide que dans un autre et lit la masse volumique du liquide selon la profondeur à laquelle il s'enfonce. Quelle science sous-tend cette technologie?", k: "La flottabilité et la masse volumique : un objet flottant se dépose là où la force de flottabilité équilibre son poids, plus profondément dans les liquides moins denses", w: ["La viscosité : l'enfoncement du densimètre est ralenti par les liquides qui sont épais et à écoulement lent", "La loi de Pascal : la pression dans le liquide est transmise à travers lui et sur le densimètre qui y flotte", "La compressibilité : le liquide sous le densimètre est pressé plus petit par le poids propre du densimètre"] },
    { q: "Un thermomètre à liquide dans le verre est une technologie construite sur quelle science?", k: "La dilatation thermique : le volume et la masse volumique du liquide changent avec la température d'une façon prévisible", w: ["Le principe d'Archimède : le liquide à l'intérieur du tube est soulevé par le liquide qui l'entoure", "La loi de Pascal : la pression appliquée à un point est transmise à travers le liquide à chaque autre point", "La viscosité : le liquide chaud s'écoule plus facilement, donc il monte à l'intérieur du tube plus vite quand il est chauffé"] },
    { q: "La chaise d'un dentiste monte en douceur quand une petite pédale est pressée. Quelle science sous-tend la technologie?", k: "La loi de Pascal dans un système hydraulique : la pression appliquée à un liquide confiné est transmise à un plus grand piston", w: ["La flottabilité : la chaise flotte vers le haut sur un réservoir d'eau caché construit dans la base de la chaise", "La dilatation thermique : presser la pédale réchauffe le liquide dans la chaise jusqu'à ce qu'il se dilate et la soulève", "La superposition des masses volumiques : les liquides à l'intérieur de la chaise se trient en couches selon leurs masses volumiques"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Chaque technologie des fluides repose sur un morceau de la science du volet : le densimètre sur la flottabilité et la masse volumique, le thermomètre sur la dilatation thermique, et la chaise hydraulique sur la loi de Pascal. Nommer la science sous-jacente est la demande visée.",
    {});
}, ["Demande ce que l'appareil fait, puis quelle idée du volet le rend possible.", "Jauge flottante : flottabilité. Liquide qui monte : dilatation. Force d'une pédale : Pascal."]);

E("s8f-u2-cr-underlying", 2, ["SC8.5.4"], 2, "var", varset([
  function () {
    return textq("Choisis une technologie : un sous-marin, une montgolfière, ou un vêtement de flottaison individuel (gilet de sauvetage). Décris la science qui sous-tend la technologie : nomme le principe des fluides dont elle dépend et explique comment la technologie utilise ce principe pour fonctionner. (3 points)",
      ["le principe nommé, comme la masse volumique moyenne et la flottabilité", "comment la technologie le change ou l'utilise", "le résultat qui fait fonctionner la technologie"],
      "<b>Réponse modèle :</b> Un sous-marin dépend de la masse volumique moyenne et de la flottabilité. Un bâtiment flotte quand sa masse volumique moyenne est moindre que celle de l'eau et coule quand elle est plus grande. Le sous-marin transporte des réservoirs de ballast : pour plonger, il inonde les réservoirs d'eau de mer, augmentant sa masse volumique moyenne au-dessus de celle de la mer pour que son poids l'emporte sur la force de flottabilité; pour faire surface, il chasse l'eau avec de l'air comprimé, abaissant sa masse volumique moyenne jusqu'à ce que la flottabilité gagne. Toute la technologie est une machine pour ajuster la masse volumique moyenne sur commande. (Une montgolfière, chauffant l'air pour abaisser sa masse volumique, ou un gilet de sauvetage, ajoutant un volume de faible masse volumique pour abaisser la masse volumique moyenne d'un nageur, traités selon le même modèle, méritent aussi tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour le principe directeur nommé correctement. 1 point pour la façon dont la technologie le manipule ou l'utilise. 1 point pour le résultat de fonctionnement expliqué.",
      {});
  }
]), ["Le principe d'abord, le mécanisme ensuite, le résultat en troisième.", "Les trois choix fonctionnent sur la masse volumique et la flottabilité, ajustées de façons différentes."]);

/* ---------- SC8.5.5 Les activités et les disciplines scientifiques ---------- */

E("s8f-u2-disciplines", 2, ["SC8.5.5"], 1, "var", varset([
  function () {
    return mcq("Un élève change l'huile à moteur d'une voiture à la maison et se demande pourquoi la vieille huile se verse plus lentement un matin froid. Quel appariement relie cette activité à la bonne discipline scientifique et au bon concept?",
      "Physique, mécanique des fluides : la viscosité de l'huile augmente à mesure que sa température baisse",
      ["Chimie, acides et bases : l'huile est devenue plus acide pendant la nuit",
       "Biologie, fonction cellulaire : les particules de l'huile sont vivantes et ralentissent au froid",
       "Sciences de la Terre, érosion : l'huile use le moteur comme une rivière use la roche"],
      "Les activités quotidiennes se relient à des disciplines précises. Verser de l'huile est une question de fluides, et les fluides appartiennent à la physique (mécanique des fluides); le concept à l'œuvre est la viscosité qui change avec la température. Associer l'activité à sa discipline et à son concept est l'habileté visée.",
      {});
  }
]), ["L'activité concerne un liquide qui s'écoule. Quelle discipline possède les liquides qui s'écoulent?", "Les fluides se trouvent en physique; le concept est la viscosité."]);

/* ---------- SC8.5.6 Les technologies de la masse volumique et de la flottabilité ---------- */

E("s8f-u2-pfd", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("Un gilet de sauvetage qui a servi pendant de nombreuses années est retiré parce qu'il ne garde plus un nageur à flot aussi bien qu'il le devrait. Quel énoncé donne l'explication correcte, et le principe sur lequel le gilet a été construit?",
      "Le gilet fonctionne en abaissant la masse volumique moyenne du nageur sous celle de l'eau; au fil des années, sa mousse se comprime et devient plus dense, donc il ajoute moins de volume de faible masse volumique et soulève moins",
      ["Le gilet fonctionne en augmentant la masse volumique moyenne du nageur au-dessus de celle de l'eau; au fil des années, il absorbe l'eau dans sa mousse et devient plus léger en vieillissant",
       "Le gilet fonctionne en chauffant l'eau autour du nageur pour le garder à flot; au fil des années d'utilisation, il perd graduellement cette capacité de chauffage et soulève donc moins",
       "Le gilet fonctionne en augmentant le poids du nageur pour qu'il s'assoie plus bas et plus stablement; au fil des années, les sangles s'étirent et il est trop lâche pour aider"],
      "Un vêtement de flottaison individuel est fait d'un matériau de très faible masse volumique. Porté, il rend la masse volumique moyenne du nageur plus le gilet moindre que celle de l'eau, donc la combinaison flotte. Le point du vieillissement : à mesure que les matériaux se brisent et se compriment au fil des années, ils deviennent plus denses, le gilet contribue moins de volume de faible masse volumique, et sa flottabilité s'estompe. La conception et sa défaillance fonctionnent toutes les deux sur la masse volumique moyenne.",
      {});
  }
]), ["Un principe explique à la fois pourquoi le gilet fonctionne et pourquoi un vieux gilet échoue.", "Masse volumique moyenne : le travail du gilet est de tirer la moyenne vers le bas."]);

E("s8f-u2-submarine", 2, ["SC8.5.6"], 2, "var", varset([
  function () {
    return mcq("Un sous-marin flotte à la surface. Son capitaine ordonne l'ouverture des réservoirs de ballast à la mer. Qu'arrive-t-il à l'intérieur des réservoirs, et qu'arrive-t-il au sous-marin?",
      "L'eau y entre en inondant, la masse volumique moyenne du sous-marin augmente au-dessus de celle de l'eau de mer, et il plonge",
      ["L'air y entre en jaillissant à la place de l'eau, la masse volumique moyenne du sous-marin baisse sous celle de l'eau de mer, et il plonge quand même",
       "L'eau y entre en inondant les réservoirs, le volume du sous-marin rétrécit sous la pression de l'eau ajoutée, et il monte vers la surface",
       "Les réservoirs se vident de leur eau dans la mer, et le poids du sous-marin augmente régulièrement jusqu'à ce qu'il plonge au fond"],
      "Les réservoirs de ballast sont les contrôles de masse volumique du sous-marin. Les inonder ajoute beaucoup de masse en eau pendant que le volume du sous-marin reste le même, donc sa masse volumique moyenne grimpe au-delà de la masse volumique de l'eau de mer et il coule dans une plongée contrôlée. Chasser l'eau de nouveau inverse le processus pour faire surface.",
      {});
  }
]), ["Inonder ajoute de la masse sans ajouter de volume. Suis la masse volumique moyenne.", "Plus dense que la mer veut dire vers le bas."]);

E("s8f-u2-average-density", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("Un bateau de bois flotte pendant des décennies, mais un bâton gorgé d'eau du même bois coule. Un bloc d'acier solide coule instantanément, mais un navire d'acier flotte. Quelle idée unique explique les deux paires?",
      "La masse volumique moyenne : ce qui compte est la masse totale divisée par le volume total de l'objet entier, y compris les espaces d'air et l'eau absorbée qu'il transporte",
      ["La forme seule : tout objet qui a la forme d'un bateau flottera sur l'eau, quel que soit le matériau dont il est fait et quel que soit son poids",
       "L'âge : les objets de bois plus vieux absorbent graduellement la capacité de flotter de l'eau autour d'eux à mesure que les années passent sur l'eau",
       "La surface : les objets avec plus de surface exposée à l'eau flottent toujours sur elle, quel que soit le matériau dont ils sont faits et quelle que soit leur densité"],
      "Ni le matériau ni la forme seule ne le décident. Le bâton gorgé d'eau a absorbé l'eau jusqu'à ce que sa masse volumique moyenne dépasse celle de l'eau; le bois sec du bateau et ses espaces d'air gardent sa moyenne en dessous. Le bloc d'acier est de l'acier solide partout, pendant que le navire est surtout de l'air enfermé : sa masse volumique moyenne, la masse sur le volume total, est sous celle de l'eau. Un rapport explique les quatre cas.",
      {});
  }
]), ["Les deux paires opposent le même matériau à lui-même. Quelle propriété peut différer entre deux objets du même matériau?", "La masse totale sur le volume total, espaces d'air compris."]);

/* ---------- SC8.5.7 Les technologies hydrauliques ---------- */

E("s8f-u2-pascal", 2, ["SC8.5.7"], 1, "var", varset([
  function () {
    return mcq("Qu'énonce la loi de Pascal?",
      "La pression appliquée à un fluide confiné est transmise également dans toutes les directions dans tout le fluide",
      ["La pression dans un fluide diminue régulièrement avec la profondeur, également dans toutes les directions dans tout le fluide",
       "Un gaz confiné se dilate à l'intérieur de son récipient jusqu'à ce que sa pression tombe jusqu'à zéro",
       "La force de flottabilité sur un objet égale le poids du fluide que l'objet déplace en coulant dedans"],
      "La loi de Pascal est le fondement de l'hydraulique et de la pneumatique : presse un fluide confiné à un point et l'augmentation de pression se ressent partout dans le fluide, dans toutes les directions. C'est ce qui permet à une petite force à un piston de produire une grande force à un autre.",
      {});
  }
]), ["Une loi, une idée : la pression appliquée ici se ressent partout dans le fluide.", "Ne la confonds pas avec le principe d'Archimède, qui concerne la flottabilité."]);

E("s8f-u2-hydraulic-pneumatic", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return mcq("Quelle comparaison des systèmes hydrauliques et pneumatiques est correcte?",
      "Les systèmes hydrauliques utilisent un liquide, qui est incompressible et garde un volume défini; les systèmes pneumatiques utilisent un gaz, qui est compressible et a un volume indéfini",
      ["Les systèmes hydrauliques utilisent un gaz, qui est compressible et indéfini en volume; les systèmes pneumatiques utilisent un liquide, qui n'est pas compressible",
       "Les deux systèmes utilisent des liquides comme fluide de travail; ils diffèrent seulement par la taille des pistons installés en eux",
       "Les systèmes hydrauliques utilisent un liquide qui se comprime facilement sous la pression, et cette compressibilité est ce qui les rend forts"],
      "Les deux familles de systèmes se divisent selon leur fluide. L'hydraulique fonctionne aux liquides : effectivement incompressibles, d'un volume défini, idéaux pour transmettre la force exactement, comme dans les freins et les monte-charges. La pneumatique fonctionne aux gaz : compressibles, d'un volume indéfini, comme dans les outils à air et les pneus. La loi de Pascal s'applique aux deux.",
      {});
  }
]), ["Les noms cachent les fluides : l'hydraulique est la famille de l'eau (les liquides), la pneumatique celle de l'air (les gaz).", "Incompressible va avec hydraulique."]);

E("s8f-u2-cr-car-lift", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return textq("Un monte-charge de station-service soulève une voiture de 12 000 N au moyen d'une pompe qui applique une force de seulement 300 N à un petit piston. Au moyen de la loi de Pascal et de la relation de pression, explique comment le monte-charge multiplie la force, et énonce quel doit être le rapport des surfaces des pistons. (3 points)",
      ["la pression appliquée au liquide confiné est transmise également", "la même pression agit sur le grand piston, donc la force augmente en proportion de la surface", "le rapport des surfaces doit être de 40 pour 1"],
      "<b>Réponse modèle :</b> Les 300 N de la pompe sur le petit piston créent une pression dans le liquide hydraulique confiné. Selon la loi de Pascal, cette pression est transmise également dans toutes les directions à travers le liquide, donc le grand piston sous la voiture ressent la même pression. La force est la pression fois la surface, F égale P fois A, donc le piston avec la plus grande surface produit la plus grande force. Pour transformer 300 N en 12 000 N, la force doit être multipliée par 40, donc la surface du grand piston doit être 40 fois celle du petit piston.<br><br><b>Points d'attribution :</b> 1 point pour la loi de Pascal qui transmet la pression à travers le liquide confiné. 1 point pour la force qui augmente en proportion de la surface à pression égale (F égale P fois A). 1 point pour le rapport des surfaces de 40 pour 1.",
      {});
  }
]), ["Le liquide transporte la pression, et non la force. La multiplication se produit à la surface du grand piston.", "Divise le poids de la voiture par la force de la pompe pour obtenir le rapport."]);

/* ---------- SC8.6.1 Identifier des questions sur les fluides ---------- */

E("s8f-u2-questions", 2, ["SC8.6.1"], 1, "var", varset([
  function () {
    return mcq("Une classe fait un remue-méninges de recherches après le laboratoire sur le débit. Quelle question découle d'un problème pratique des fluides et peut réellement être étudiée?",
      "Réchauffer l'huile à moteur change-t-il la vitesse à laquelle elle se vidange d'un moteur?",
      ["Pourquoi le miel est-il le liquide préféré de tout le monde?",
       "Quel liquide dans le monde est le meilleur de tous?",
       "Les fluides se comporteraient-ils différemment si la gravité était éteinte?"],
      "Une question qui peut être étudiée nomme quelque chose qui peut être changé et quelque chose qui peut être mesuré : réchauffer l'huile (changement) et chronométrer sa vidange (mesure). Les opinions, les superlatifs et les conditions impossibles ne peuvent pas être étudiés, même s'ils sonnent intéressants.",
      {});
  }
]), ["Une question qui peut être étudiée a besoin d'une variable changeable et d'un résultat mesurable.", "Les préférés et les mondes impossibles sont exclus; réchauffer et chronométrer sont dedans."]);

E("s8f-u2-question-problem", 2, ["SC8.6.1"], 2, "var", varset([
  function () {
    return mcq("Un atelier de bicyclettes trouve qu'un levier de frein hydraulique semble spongieux et que les freins sont faibles. Quelle question transforme ce problème pratique en une recherche?",
      "L'air emprisonné dans la conduite de frein réduit-il la force que les plaquettes de frein appliquent, comparé à une conduite contenant seulement du liquide de frein?",
      ["Pourquoi les clients qui entrent dans l'atelier de bicyclettes disent-ils toujours, quand on le leur demande, qu'ils préfèrent des freins forts sur une bicyclette?",
       "Qui était la personne qui a inventé les freins hydrauliques pour les bicyclettes en premier, et dans quel pays a-t-elle fait le travail?",
       "Les freins hydrauliques sur une bicyclette sont-ils simplement meilleurs que les freins à câble qu'ils remplacent de toutes les façons qui comptent pour un cycliste?"],
      "Le problème pratique est le levier spongieux. La version qui peut être étudiée nomme une cause soupçonnée qui peut être variée (l'air dans la conduite, qui se comprime, contrairement au liquide) et un effet qui peut être mesuré (la force aux plaquettes). Les questions d'histoire et d'opinion ne testent pas le problème.",
      {});
  }
]), ["Pars du problème de l'atelier. La question doit pouvoir tester une cause.", "L'air dans la conduite est le suspect testable : il se comprime, le liquide de frein non."]);

/* ---------- SC8.6.2 Reformuler les questions sous une forme testable ---------- */

E("s8f-u2-rephrase", 2, ["SC8.6.2"], 1, "var", varset([
  function () {
    return mcq("La question d'un élève se lit : « L'huile épaisse est-elle mauvaise pour les moteurs? » Quelle reformulation la met sous une forme testable?",
      "Comment la température de l'huile à moteur influe-t-elle sur le temps qu'il faut à 100 mL de l'huile pour s'écouler dans un entonnoir?",
      ["Pourquoi les moteurs des climats froids détestent-ils tant l'huile épaisse à écoulement lent en hiver?",
       "Le grade d'huile d'hiver est-il simplement une meilleure invention que le grade d'huile d'été dans l'ensemble?",
       "Quelle est la seule meilleure huile à moteur dans le monde entier pour chaque moteur jamais construit n'importe où?"],
      "La forme testable nomme la variable à changer (la température), la variable à mesurer (le temps d'écoulement pour un volume fixe), et le matériau testé. Le « mauvaise » de la question originale ne peut pas être mesuré; la reformulation le remplace par des quantités.",
      {});
  }
]), ["Testable veut dire : une variable à changer et une variable à mesurer, toutes les deux nommées.", "Remplace « mauvaise » par quelque chose qu'un chronomètre peut régler."]);

E("s8f-u2-define-problem", 2, ["SC8.6.2"], 2, "var", varset([
  function () {
    return mcq("Une équipe doit définir un problème pratique clairement avant d'étudier : les distributeurs de savon de son école se bouchent sans cesse en hiver. Quel énoncé définit le problème d'une façon qu'une recherche peut traiter?",
      "Pendant les mois froids, les distributeurs livrent le savon lentement ou pas du tout; l'équipe vérifiera si la viscosité plus élevée du savon à basse température en est la cause et si un savon de viscosité plus faible le corrige",
      ["Les distributeurs de savon dans les salles de bain de l'école sont ennuyants pendant les mois d'hiver, et ils devraient vraiment fonctionner beaucoup mieux qu'ils ne le font pour les élèves qui les utilisent chaque jour",
       "Quelqu'un devrait simplement inventer un nouveau savon parfait qui ne bouche jamais aucun distributeur ni drain n'importe où dans l'école, quel que soit le temps ou la saison de l'année",
       "Les distributeurs de l'école se bouchent en hiver simplement parce que l'hiver est froid dans cette province, donc il ne reste rien pour une recherche de l'équipe à tester ou à mesurer"],
      "Un problème pratique clairement défini énonce la difficulté observée, une cause soupçonnée testable, et à quoi ressemblerait une solution. Le premier choix fait les trois; les autres se plaignent, rêvent, ou déclarent la réponse avant de la tester.",
      {});
  }
]), ["Un problème défini a trois parties : la difficulté, une cause testable, et ce que le corriger veut dire.", "Déclarer la cause avant le test est le choix piège."]);

/* ---------- SC8.6.3 Les explications des écarts dans les données ---------- */

E("s8f-u2-discrepancy-flow", 2, ["SC8.6.3"], 2, "var", varset([
  function () {
    return mcq("Dans le laboratoire sur le débit, le temps du miel d'un groupe est de 9 secondes pendant que trois autres groupes consignent 24, 26 et 25 secondes pour le même miel dans des entonnoirs identiques. Quelle explication de l'écart devrait être étudiée en premier?",
      "Une différence de procédure dans l'essai du groupe rapide, comme l'entonnoir réchauffé, le miel qui est un échantillon différent, ou le chronométrage qui a commencé en retard",
      ["La viscosité du miel change au hasard d'une minute à l'autre dans le laboratoire, donc le résultat de chaque groupe est également valide tel quel et aucun ne devrait être revérifié",
       "Les trois groupes plus lents ont tous dû faire exactement la même erreur dans leurs essais avec le miel, au même moment et de la même façon, sans qu'aucun d'eux s'en aperçoive",
       "Le résultat rapide devrait simplement être moyenné avec les autres sans question, puisque plus de données est toujours mieux à la fin et qu'un écart ne peut jamais signaler un problème"],
      "Un seul résultat loin d'un groupe de résultats qui s'accordent pointe d'abord vers la procédure derrière lui : quelque chose différait dans cet essai. Le travail sur les écarts commence par chasser la différence (entonnoir réchauffé, miel différent, erreur de chronométrage), et non en rejetant ou en moyennant aveuglément la valeur bizarre.",
      {});
  }
]), ["Trois groupes s'accordent et un est loin. Où un scientifique regarde-t-il en premier?", "Un essai bizarre a habituellement une cause bizarre dans sa façon d'être mené."]);

E("s8f-u2-discrepancy-density", 2, ["SC8.6.3"], 3, "var", varset([
  function () {
    return mcq("Quatre groupes mesurent la masse volumique de la même barre d'aluminium. Trois rapportent 2,7 g/cm3. Le quatrième rapporte 3,4 g/cm3 et offre deux explications : (1) sa barre était un alliage différent; (2) il a lu le niveau du cylindre gradué d'en haut au lieu d'au niveau des yeux, sous-consignant le volume. Les barres ont toutes été coupées d'une seule feuille. Quelle évaluation est la plus forte?",
      "L'explication (2) est celle à appliquer : la source partagée exclut un alliage différent, et sous-consigner le volume gonfle la masse volumique calculée exactement dans la direction observée, donc le groupe devrait remesurer au niveau des yeux",
      ["L'explication (1) est celle à appliquer en premier, parce que toute barre de métal dans l'ensemble peut secrètement se révéler faite d'un alliage différent du reste des barres coupées pour la classe",
       "Les deux explications offertes par le quatrième groupe sont également susceptibles d'être justes, donc le résultat rapporté du groupe devrait simplement rester tel quel dans les données de la classe, sans aucun remesurage",
       "Aucune des explications ne compte ici : un écart de masse volumique de cette taille devrait simplement être supprimé de l'ensemble de données de la classe sans aucune vérification supplémentaire par le groupe ou l'enseignant"],
      "Peser des explications veut dire les tester contre les faits et la direction de l'erreur. Une seule feuille exclut un alliage différent. Un volume lu trop petit rend m divisé par V trop grand, ce qui correspond exactement au résultat élevé. L'évaluation la plus forte nomme l'explication qui correspond à la fois aux faits et à l'arithmétique, et prescrit le remesurage.",
      {});
  }
]), ["Teste chaque explication deux fois : correspond-elle aux faits, et pousse-t-elle le nombre de la façon dont le nombre a réellement bougé?", "Un volume trop petit rend la masse volumique trop grande. Cette correspondance de direction est décisive."]);

/* ---------- SC8.6.4 Compiler et afficher les données en histogramme ---------- */

E("s8f-u2-bargraph", 2, ["SC8.6.4"], 3, "var", varset([
  function () {
    var q = mcq("Un groupe a mesuré les temps d'écoulement de quatre liquides et les a affichés dans le diagramme à bandes montré. Son partenaire de laboratoire affirme que le graphique prouve que le liquide B est le plus visqueux parce que sa bande est « au milieu ». Quelle évaluation de l'affichage et de l'affirmation est correcte?",
      "Le diagramme à bandes est un affichage approprié pour comparer des liquides séparés, mais l'affirmation le lit mal : le liquide le plus visqueux est celui avec le temps d'écoulement le plus long, le liquide D",
      ["L'affirmation du partenaire est correcte telle quelle, parce que la bande du milieu dans tout diagramme à bandes représente toujours la valeur extrême dans les données",
       "Le diagramme à bandes est le mauvais affichage pour ces données; seul un graphique linéaire peut jamais être utilisé pour comparer les temps d'écoulement de liquides séparés",
       "Le graphique lui-même ne prouve rien du tout, parce que les temps d'écoulement mesurés ne peuvent être affichés sous aucune forme graphique pour comparaison"],
      "Les diagrammes à bandes conviennent à ces données : des catégories séparées (quatre liquides) chacune avec une valeur mesurée. Le lire est la deuxième habileté : la viscosité augmente avec le temps d'écoulement, donc la bande la plus longue, le liquide D, est le plus visqueux. L'affichage est bon et la lecture qu'en fait le partenaire est mauvaise.",
      {});
    q.figure = s8fHealthSVG([{ name: "Liquide A", value: 6 }, { name: "Liquide B", value: 14 }, { name: "Liquide C", value: 11 }, { name: "Liquide D", value: 23 }], "Temps d'écoulement", "s", null);
    return q;
  }
]), ["Deux jugements : un diagramme à bandes convient-il aux catégories, et quelle bande veut dire le plus visqueux?", "Les catégories prennent des bandes; le temps le plus long prend le titre de viscosité."]);

E("s8f-u2-graph-choice", 2, ["SC8.6.4"], 1, "var", varset([
  function () {
    return mcq("Un groupe a un temps d'écoulement pour chacun de cinq liquides différents et doit afficher les données. Quel affichage est approprié, et pourquoi?",
      "Un diagramme à bandes, parce que les données sont des catégories séparées (des liquides différents), chacune avec une seule valeur à comparer",
      ["Un graphique linéaire, parce que toutes les données recueillies en sciences doivent être dessinées comme des lignes sur un graphique",
       "Un diagramme circulaire, parce que les cinq temps d'écoulement séparés peuvent être additionnés pour faire un tout",
       "Aucun graphique du tout, parce que les temps mesurés en secondes ne peuvent être montrés sur aucun graphique"],
      "L'affichage suit la forme des données. Cinq liquides différents sont des catégories, et non une variable continue, donc les bandes les comparent honnêtement; une ligne inventerait une tendance entre des liquides sans lien. La correction même du laboratoire principal fait le même point en sens inverse : les résultats de la classe là appartiennent à un diagramme à bandes (histogramme), et non à un graphique linéaire.",
      {});
  }
]), ["Catégories ou continuum? Cela décide des bandes ou des lignes.", "Des liquides différents sont des catégories. Une ligne prétendrait qu'ils se relient."]);

/* ---------- SC8.6.5 Réaliser des procédures qui contrôlent les variables (CORE) ---------- */

E("s8f-u2-variables", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return mcq("Un groupe vérifie si la température influe sur le débit de l'huile de cuisson. Il réchauffe ou refroidit l'huile à trois températures, verse 100 mL dans le même entonnoir chaque fois, et chronomètre chaque versement. Quelle identification des variables est correcte?",
      "Variable changée : la température de l'huile. Variable mesurée : le temps d'écoulement. Gardés les mêmes : l'huile, son volume, et l'entonnoir",
      ["Variable changée : le temps d'écoulement. Variable mesurée : la température. Gardés les mêmes : l'huile et l'entonnoir",
       "Variable changée : l'entonnoir. Variable mesurée : le volume de l'huile. Gardée la même : la température",
       "Il n'y a aucune variable contrôlée, parce que la température est la seule chose dans l'expérience"],
      "L'identification des variables suit les rôles. Le groupe change délibérément la température, mesure le temps d'écoulement comme résultat, et garde l'huile, son volume et l'entonnoir constants pour que la comparaison soit équitable. Nommer les trois rôles correctement est le cœur cognitif de la réalisation d'une procédure contrôlée.",
      {});
  }
]), ["Trie par rôle : ce qu'ils ont réglé, ce qu'ils ont mesuré, ce qu'ils ont gelé en place.", "La variable changée est celle de la question vérifiée."]);

E("s8f-u2-cr-design-viscosity", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return textq("Conçois une recherche contrôlée pour comparer les viscosités de trois liquides : l'eau, l'huile de cuisson et le miel. Ton plan doit énoncer la méthode que tu utiliseras pour les comparer, la variable que tu changeras, la variable que tu mesureras, au moins deux variables que tu garderas les mêmes, et comment tu rendras la comparaison équitable et répétable. (4 points)",
      ["une méthode qui fonctionne comme chronométrer l'écoulement dans le même entonnoir ou sur la même rampe", "le liquide comme variable changée", "le temps d'écoulement ou la distance comme variable mesurée", "la quantité de liquide, l'appareil, la température et les répétitions gardés les mêmes"],
      "<b>Réponse modèle :</b> Méthode : verse chaque liquide dans le même entonnoir dans un cylindre à mesurer et chronomètre combien de temps un volume fixe, 100 mL, prend pour passer; répète chaque liquide trois fois et fais la moyenne. La variable changée est le liquide lui-même (eau, huile de cuisson, miel). La variable mesurée est le temps d'écoulement : le temps le plus long veut dire la viscosité la plus élevée. Gardés les mêmes : le volume de liquide (100 mL), l'entonnoir et le cylindre, la température des liquides (tous laissés dans la même salle), et la personne qui chronomètre avec la même règle de départ et d'arrêt. Faire la moyenne des répétitions protège la comparaison contre un écoulement mal chronométré. Les liquides peuvent alors être classés selon leurs temps moyens.<br><br><b>Points d'attribution :</b> 1 point pour une méthode de comparaison qui fonctionne. 1 point pour la variable changée (le liquide) et la variable mesurée (le temps d'écoulement ou la distance) nommées correctement. 1 point pour au moins deux variables gardées les mêmes. 1 point pour l'équité et la répétabilité (répétitions, moyenne, ou une règle de départ et d'arrêt identique).",
      {});
  }
]), ["Conçois-la comme le laboratoire principal, mais rends les contrôles explicites : c'est là que sont les points.", "Quatre parties : méthode, changée, mesurée, gardées les mêmes, plus l'équité."]);

/* ---------- SC8.6.6 Interpréter les régularités et les tendances ---------- */

E("s8f-u2-pattern", 2, ["SC8.6.6"], 1, "var", varset([
  function () {
    var q = mcq("Le graphique montre le temps d'écoulement de la même huile mesuré à cinq températures. Quel énoncé interprète correctement la régularité?",
      "À mesure que la température augmente, le temps d'écoulement diminue : l'huile plus chaude est moins visqueuse",
      ["À mesure que la température augmente, le temps d'écoulement augmente : l'huile plus chaude est plus visqueuse",
       "La température et le temps d'écoulement sont sans lien dans ces données",
       "Le temps d'écoulement change, mais la viscosité reste la même à chaque température"],
      "La ligne tombe régulièrement : des températures plus élevées viennent avec des temps d'écoulement plus courts. Le temps d'écoulement est le substitut de la viscosité au laboratoire, donc la régularité se lit : réchauffer l'huile abaisse sa viscosité, la relation que la théorie particulaire prédit.",
      {});
    q.figure = s8fLineGraphSVG([10, 20, 30, 40, 50], [42, 31, 23, 17, 12], "Température (°C)", "Temps d'écoulement (s)");
    return q;
  }
]), ["Lis d'abord la direction de la ligne, puis traduis le temps d'écoulement en viscosité.", "Un temps qui tombe veut dire une viscosité qui tombe."]);

E("s8f-u2-cr-data-infer", 2, ["SC8.6.6"], 2, "var", varset([
  function () {
    return textq("Une classe mesure deux matériaux inconnus. Matériau A : un échantillon de 20 cm3 a une masse de 54 g, et un échantillon de 40 cm3 a une masse de 108 g. Matériau B : un échantillon de 20 cm3 a une masse de 16 g, et un échantillon de 40 cm3 a une masse de 32 g. (a) Calcule la masse volumique de chaque matériau. (b) Infère, avec des raisons, quel matériau flotterait dans l'eau et lequel coulerait. (c) Énonce la régularité dans les données qui te dit que chaque masse volumique est une propriété du matériau, et non de la taille de l'échantillon. (3 points)",
      ["le matériau A est 2,7 g/cm3 et le matériau B est 0,8 g/cm3", "A coule et B flotte, par comparaison avec l'eau à 1,00 g/cm3", "doubler le volume double la masse, donc le rapport reste constant"],
      "<b>Réponse modèle :</b> (a) Matériau A : MV égale 54 g divisés par 20 cm3, ce qui égale 2,7 g/cm3. Matériau B : MV égale 16 g divisés par 20 cm3, ce qui égale 0,8 g/cm3. (b) La masse volumique de l'eau est de 1,00 g/cm3. Le matériau A, à 2,7 g/cm3, est plus dense que l'eau et coule; le matériau B, à 0,8 g/cm3, est moins dense et flotte. (c) Dans les deux matériaux, doubler le volume double exactement la masse, donc le rapport masse sur volume est le même pour les deux tailles d'échantillon : la masse volumique est constante pour le matériau, ce qui en fait une propriété du matériau plutôt que du morceau mesuré.<br><br><b>Points d'attribution :</b> 1 point pour les deux masses volumiques calculées. 1 point pour l'inférence flotter et couler liée à la masse volumique de l'eau. 1 point pour la régularité du rapport constant (le volume et la masse qui doublent ensemble).",
      {});
  }
]), ["Calcule d'abord, compare à l'eau ensuite, puis regarde ce qui reste constant entre les tailles d'échantillon.", "La régularité à nommer est dans la façon dont la masse augmente avec le volume."]);

/* ---------- SC8.6.7 Utiliser les instruments de façon efficace et exacte (CORE) ---------- */

E("s8f-u2-instruments", 2, ["SC8.6.7"], 1, "var", varset([
  function () {
    return mcq("Un élève mesure le volume d'un liquide dans un cylindre gradué pour un calcul de masse volumique. Quelle pratique donne une lecture exacte?",
      "Placer le cylindre sur une surface plane et lire le bas du ménisque au niveau des yeux",
      ["Tenir le cylindre vers la lumière et lire le haut du ménisque d'en haut",
       "Lire l'échelle d'où que tu te tiennes, puisque les nombres sont grands",
       "Estimer entre les marques rapidement avant que le liquide se dépose"],
      "L'utilisation exacte des instruments est un ensemble d'habitudes : une surface plane pour que le liquide repose juste, le niveau des yeux pour que la lecture ne soit pas déplacée par l'angle de vue, et le bas du ménisque (la courbe que la surface du liquide fait) comme point de lecture. Cette banque porte cette seule question; la manipulation des instruments elle-même relève de l'évaluation en classe.",
      {});
  }
]), ["Surface plane, niveau des yeux, bas de la courbe : trois habitudes, un seul choix les a toutes.", "Lire d'en haut ou d'en bas déplace la valeur : la parallaxe."]);

/* ---------- SC8.6.8 Le volume des objets irréguliers par déplacement (CORE) ---------- */

E("s8f-u2-displacement", 2, ["SC8.6.8"], 1, "var", varset([
  function () {
    return mcq("Quelle procédure détermine correctement le volume d'une pierre de forme irrégulière par déplacement de l'eau?",
      "Consigner le niveau d'eau dans un cylindre gradué, descendre la pierre doucement jusqu'à ce qu'elle soit entièrement submergée, consigner le nouveau niveau, et soustraire",
      ["Laisser tomber la pierre dans un bécher plein d'eau, la retirer, puis peser la pierre une deuxième fois pendant qu'elle est encore mouillée pour trouver son volume",
       "Mesurer la longueur, la largeur et la hauteur de la pierre avec une règle et multiplier les trois ensemble, en traitant la pierre comme si elle était un bloc parfait",
       "Faire flotter la pierre sur la surface de l'eau dans le cylindre et lire le niveau où la pierre repose au repos, en prenant ce niveau comme son volume déplacé"],
      "Le déplacement fonctionne parce que la pierre submergée pousse de côté son propre volume d'eau. La montée du niveau, le final moins l'initial, est ce volume. La pierre doit être entièrement submergée et descendue doucement pour qu'aucune eau n'éclabousse dehors; une règle ne peut pas saisir une forme irrégulière, et une pierre ne flotte pas.",
      {});
  }
]), ["Le volume est la montée. Quel choix mesure réellement une montée?", "Entièrement submergée, descendue doucement, soustrais les niveaux."]);

E("s8f-u2-displacement-error", 2, ["SC8.6.8"], 3, "var", varset([
  function () {
    return mcq("Un groupe détermine le volume d'un cube de métal par déplacement et obtient 14 mL, mais calculer à partir des côtés mesurés du cube donne 27 cm3. Ses notes disent que le cube « dépassait un peu de l'eau » dans le cylindre, qui était aussi trop étroit, donc le cube s'est coincé contre les côtés. Quel jugement évalue le mieux son résultat de déplacement?",
      "La valeur de déplacement est invalide : le cube n'était pas entièrement submergé, donc il a déplacé moins que son volume entier, et le coincement a empiré les choses; il a besoin d'un récipient plus large et d'une submersion complète",
      ["La valeur de déplacement doit être la meilleure des deux, parce que l'eau ne ment jamais au sujet du volume, donc les mesures des côtés du cube doivent être les mauvaises et le calcul devrait être rejeté",
       "Les deux valeurs que le groupe a obtenues devraient simplement être moyennées ensemble pour donner le vrai volume du cube, et la moyenne devrait être utilisée dans le calcul de masse volumique qui suit",
       "La différence entre les deux valeurs n'a pas d'importance du tout, parce que le chiffre du volume n'influe pas sur le calcul de masse volumique que le groupe fait ensuite avec lui dans son rapport"],
      "Juger une procédure veut dire la vérifier contre ses propres exigences. Le déplacement n'égale le volume que quand l'objet est entièrement submergé; un cube qui dépasse déplace une partie de lui-même, donc 14 mL sous-estime le volume, et la direction de l'erreur confirme le diagnostic. Moyenner une valeur valide avec une invalide contamine seulement la masse volumique qui suit.",
      {});
  }
]), ["Le déplacement a une condition non négociable. A-t-elle été remplie?", "En partie dehors veut dire en partie déplacé : la direction de l'erreur le révèle."]);

E("s8f-u2-cr-displacement-calc", 2, ["SC8.6.8"], 2, "var", varset([
  function () {
    return textq("Une élève étudie un objet de métal irrégulier. Elle consigne l'eau dans un cylindre gradué à 150 mL, descend l'objet dedans jusqu'à ce qu'il soit entièrement submergé, et lit 175 mL. La masse de l'objet, d'une balance, est de 135 g. (a) Énonce le volume de l'objet. (b) Calcule sa masse volumique. (c) Au moyen du tableau des masses volumiques de cette unité (aluminium 2,70 g/cm3, fer 7,87 g/cm3, plomb 11,34 g/cm3), énonce de quoi l'objet est le plus probablement fait, et une vérification qu'elle devrait faire sur sa lecture de déplacement avant de faire confiance à la conclusion. (3 points)",
      ["le volume est 25 cm3 à partir de la montée du niveau d'eau", "la masse volumique est 5,4 g/cm3 à partir de la masse divisée par le volume", "aucune correspondance exacte dans le tableau, avec une vérification de validité de la lecture"],
      "<b>Réponse modèle :</b> (a) Le volume est la montée du niveau : 175 mL moins 150 mL égalent 25 mL, soit 25 cm3. (b) MV égale m divisé par V, soit 135 g divisés par 25 cm3, ce qui égale 5,4 g/cm3. (c) À 5,4 g/cm3, l'objet ne correspond exactement à aucun métal listé; il se trouve entre l'aluminium (2,70) et le fer (7,87), donc la conclusion honnête est qu'il n'est pas de l'aluminium, du fer ou du plomb purs, et peut être un alliage ou un objet enduit. Avant de faire confiance même à cela, elle devrait vérifier la lecture de déplacement elle-même : confirmer que l'objet était entièrement submergé sans bulles d'air accrochées à lui, puisque l'air emprisonné gonflerait le volume et fausserait la masse volumique.<br><br><b>Points d'attribution :</b> 1 point pour le volume à partir de la montée du niveau. 1 point pour le calcul de la masse volumique avec les unités. 1 point pour une conclusion qui respecte le tableau (aucune correspondance exacte, donc aucune identification forcée) avec une vérification de validité de la lecture.",
      {});
  }
]), ["Le volume de la montée, la masse volumique de la formule, et une conclusion qui ne prétend pas plus que ce que le tableau soutient.", "Une valeur entre deux entrées du tableau est un résultat, et non un échec."]);

/* ---------- SC8.6.9 Calculer la masse volumique de divers objets ---------- */

E("s8f-u2-sk-calc-density", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 1.1, 1.4, 1.6, 2.2, 2.7, 3.0]);
  var V = pick([10, 20, 25, 50]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(D, [D * 2, D / 2, V / m * 10, D + 0.5, m / (V - 5)]);
  return mcq("Au laboratoire sur la masse volumique, l'échantillon d'un groupe a une masse de " + s8fn(m) + " g et un volume de " + V + " cm3 (mesuré par déplacement). Calcule la masse volumique de l'échantillon.",
    s8fn(D) + " g/cm3",
    dis.map(function (d) { return s8fn(d) + " g/cm3"; }),
    "MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + V + " cm3, ce qui égale " + s8fn(D) + " g/cm3. Les calculs de laboratoire utilisent la même formule que toute autre question de masse volumique; seule la source du volume (le déplacement) est nouvelle.",
    {});
}, ["Même formule, habits de laboratoire : masse volumique égale masse divisée par volume.", "Le travail de déplacement est déjà fait; le volume est donné."]);

E("s8f-u2-sk-calc-mass", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5]);
  var V = pick([30, 60, 120, 250, 400]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(m, [m * 2, m / 2, D + V, V - D, m + 15]);
  return mcq("Un technicien doit verser un liquide de masse volumique " + s8fn(D) + " g/mL pour que la masse de l'échantillon soit exacte pour un test. Quelle masse " + V + " mL du liquide auront-ils?",
    s8fn(m) + " g",
    dis.map(function (d) { return s8fn(d) + " g"; }),
    "m égale MV fois V, soit " + s8fn(D) + " g/mL fois " + V + " mL, ce qui égale " + s8fn(m) + " g. Multiplier la masse par millilitre par le nombre de millilitres donne la masse totale.",
    {});
}, ["Masse égale masse volumique fois volume, la forme réarrangée.", "Quelques centaines de millilitres devraient donner une masse bien au-dessus du nombre de la masse volumique."]);

E("s8f-u2-sk-calc-volume", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 1.0, 1.2, 1.5, 2.0, 2.5]);
  var V = pick([15, 30, 45, 60, 90]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(V, [V * 2, V / 2, m * D / 2, m - D * 10, V + 10]);
  return mcq("Un échantillon d'un liquide a une masse de " + s8fn(m) + " g. La masse volumique du liquide est de " + s8fn(D) + " g/mL. Quel volume l'échantillon occupe-t-il?",
    s8fn(V) + " mL",
    dis.map(function (d) { return s8fn(d) + " mL"; }),
    "V égale m divisé par MV, soit " + s8fn(m) + " g divisés par " + s8fn(D) + " g/mL, ce qui égale " + s8fn(V) + " mL. Diviser la masse totale par la masse dans chaque millilitre compte les millilitres.",
    {});
}, ["Volume égale masse divisée par masse volumique, la troisième forme.", "Vérifie en multipliant à rebours : le volume fois la masse volumique devrait redonner la masse."]);

E("s8f-u2-units", 2, ["SC8.6.9"], 1, "var", varset([
  function () {
    return mcq("Quel appariement de quantité et d'expression d'unité est correct partout?",
      "La masse volumique d'un liquide s'exprime en g/mL, et la masse volumique d'un solide en g/cm3, avec 1 mL égal à 1 cm3",
      ["La masse volumique d'un liquide s'exprime en g/cm3 seulement, et les solides en mL/g",
       "La masse volumique s'exprime en grammes pour les liquides et en newtons pour les solides",
       "Le volume d'un solide s'exprime en mL et le volume d'un liquide en cm3, et les deux ne se convertissent jamais"],
      "La convention : la masse volumique d'un fluide s'exprime en g/mL et celle d'un solide en g/cm3, et puisque 1 mL égale 1 cm3 les nombres sont directement comparables, ce qui explique pourquoi la masse volumique d'un solide peut être comparée à celle de l'eau, 1,00, d'une façon ou de l'autre. Les unités font partie du calcul, et non une décoration après lui.",
      {});
  }
]), ["Une conversion fait fonctionner tout le système : 1 mL égale 1 cm3.", "Les liquides prennent les mL, les solides les cm3, et les deux unités sont égales en taille."]);

/* Exclusion de la composition : la question de conception de recherche
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composés. */
var NO_COMPOSE_U2 = { "s8f-u2-cr-design-viscosity": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });

/* Ajouts de l'allongement (20 nov. 2026). */
E("s8f-u2-viscosite-facteur", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("Une élève fait couler du miel froid du réfrigérateur et du miel tiède dans deux entonnoirs identiques : le miel tiède s'écoule beaucoup plus vite. Quel facteur de la viscosité est mis en évidence?",
      "La température : réchauffer un liquide diminue sa viscosité et le fait couler plus facilement",
      ["La pression exercée par le poids : le miel tiède pèserait plus lourd que le miel froid et pousserait donc plus fort dans le col étroit de l'entonnoir pendant l'écoulement", "La grosseur des particules du liquide : le froid du réfrigérateur fait grossir de façon permanente les particules du miel, qui peinent ensuite à traverser l'entonnoir", "La forme du contenant : l'entonnoir du miel tiède était forcément plus large que l'autre"],
      "Même miel, même entonnoir : seule la température change, et le liquide chaud coule plus vite. <b>La température : réchauffer un liquide diminue sa viscosité</b>.", {});
  },
  function () {
    return mcq("Un mécanicien choisit une huile à moteur plus fluide pour l'hiver et une huile plus épaisse pour l'été. Sur quel principe repose ce choix?",
      "La viscosité de l'huile diminue quand elle se réchauffe : une huile fluide à froid devient trop mince à chaud si elle n'est pas choisie en conséquence",
      ["La viscosité d'une huile à moteur augmente toujours quand elle se réchauffe dans le moteur, donc la saison chaude exige l'huile la plus mince et la plus fluide possible", "La température de fonctionnement ne change jamais, en aucune circonstance, la viscosité d'une huile à moteur : le choix entre les grades est une simple question de prix d'achat", "L'huile d'hiver est plus épaisse parce que le froid épaissit toutes les huiles de la même façon"],
      "Le froid épaissit l'huile et la chaleur l'amincit; le grade est choisi pour garder une viscosité utile à la température de service. <b>La viscosité de l'huile diminue quand elle se réchauffe</b>.", {});
  },
  function () {
    return mcq("On compare le temps d'écoulement d'une bille dans trois liquides à la même température : l'eau (rapide), l'huile végétale (moyen) et le sirop de maïs (très lent). Que compare-t-on?",
      "La viscosité propre à chaque liquide : le sirop, le plus visqueux, résiste le plus à l'écoulement de la bille",
      ["La densité des liquides seulement : une bille métallique tombe toujours et nécessairement plus vite dans le liquide le plus dense des trois cylindres, quel qu'il soit", "La température des trois liquides : la vitesse de chute de la bille révèle directement lequel des trois liquides est le plus chaud au moment de l'essai en laboratoire", "La masse de la bille, qui change selon le liquide dans lequel on la laisse tomber"],
      "À température égale, la résistance à l'écoulement diffère selon le liquide : c'est sa viscosité. <b>La viscosité propre à chaque liquide : le sirop est le plus visqueux</b>.", {});
  },
  function () {
    return mcq("Une sauce tomate trop liquide est mise à mijoter à découvert pour l'épaissir. Pourquoi cette méthode fonctionne-t-elle?",
      "L'eau s'évapore pendant le mijotage : la sauce devient plus concentrée et sa viscosité augmente",
      ["La chaleur du mijotage détruit progressivement les particules de tomate de la sauce, qui devient alors épaisse et presque solide, comme une gelée ferme de fruits", "Le mijotage à découvert ajoute de grandes quantités d'air brassé à la sauce tomate, et les sauces fortement aérées sont toujours beaucoup plus épaisses que les autres", "Le sel des tomates se transforme en amidon pendant la cuisson à feu doux prolongée"],
      "Enlever de l'eau concentre la sauce et augmente sa viscosité. <b>L'eau s'évapore : la sauce devient plus concentrée et plus visqueuse</b>.", {});
  }
]), ["La viscosité est la résistance à l'écoulement; repère ce qui a changé.", "Chauffer un liquide diminue sa viscosité; le concentrer l'augmente."]);


E("s8f-u2-densite-quotidien", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("Une canette de boisson gazeuse ordinaire coule dans un seau d'eau, tandis qu'une canette de la version diète flotte. Les deux canettes ont le même volume. Qu'est-ce qui explique la différence?",
      "La canette ordinaire a une masse plus grande pour le même volume : sa densité moyenne dépasse celle de l'eau",
      ["La canette de boisson diète contient un gaz spécial très léger qui la rend plus légère que l'air ambiant autour du seau et la fait flotter à la surface", "La canette de boisson ordinaire est fabriquée d'un métal beaucoup plus épais et plus lourd que le métal mince utilisé pour la canette de boisson diète", "L'eau du seau pousse moins fort sur la canette ordinaire que sur la canette diète"],
      "À volume égal, flotter ou couler dépend de la densité moyenne : la canette ordinaire, plus massive (sucre dissous), dépasse la densité de l'eau. <b>Sa densité moyenne dépasse celle de l'eau</b>.", {});
  },
  function () {
    return mcq("Un œuf frais coule dans l'eau du robinet, mais flotte quand on dissout beaucoup de sel dans l'eau. Qu'est-ce qui explique ce changement?",
      "Le sel dissous augmente la densité de l'eau jusqu'à dépasser celle de l'œuf, qui flotte alors",
      ["Le sel de table dissous rend l'œuf frais plus léger en dissolvant lentement une bonne partie de sa coquille calcaire pendant toute la durée de l'expérience", "Le sel dissous fait lentement grossir l'œuf frais dans le verre, et les objets plus gros et plus volumineux flottent toujours beaucoup mieux que les objets petits", "L'eau salée pousse vers le haut parce qu'elle est plus chaude que l'eau du robinet"],
      "L'œuf ne change pas; c'est la densité du liquide qui augmente avec le sel dissous, jusqu'à dépasser celle de l'œuf. <b>Le sel dissous augmente la densité de l'eau</b>.", {});
  },
  function () {
    return mcq("Une montgolfière s'élève quand on chauffe l'air de son enveloppe. Qu'est-ce qui explique la montée?",
      "L'air chauffé se dilate et devient moins dense que l'air extérieur plus froid, donc le ballon monte",
      ["L'air chauffé par le brûleur devient beaucoup plus dense que l'air extérieur froid qui entoure le ballon, et cette densité plus grande pousse l'enveloppe vers le haut", "Le brûleur de la montgolfière produit un gaz de combustion spécial, plus lourd que l'air, qui s'accumule sous l'enveloppe et la soulève par en dessous", "La chaleur rend l'enveloppe du ballon plus légère en faisant fondre une partie du tissu"],
      "Chauffer l'air le rend moins dense que l'air ambiant; l'ensemble, moins dense, s'élève. <b>L'air chauffé devient moins dense que l'air extérieur</b>.", {});
  },
  function () {
    return mcq("Dans une vinaigrette non brassée, l'huile se retrouve toujours au-dessus du vinaigre. Qu'est-ce qui explique cet ordre?",
      "L'huile est moins dense que le vinaigre (une solution aqueuse), donc elle flotte au-dessus",
      ["L'huile d'olive est beaucoup plus dense que le vinaigre aqueux, et en cuisine les liquides les plus denses montent toujours d'eux-mêmes jusqu'à la surface du mélange", "Le vinaigre acide attire lentement l'huile vers le haut du contenant par une force magnétique faible mais constante qui agit entre les deux liquides non mélangés", "L'huile a été versée en dernier, et le dernier liquide versé reste toujours sur le dessus"],
      "Les liquides non miscibles se rangent par densité : le moins dense, l'huile, reste au-dessus. <b>L'huile est moins dense que le vinaigre</b>.", {});
  }
]), ["Flotter ou couler compare la densité moyenne de l'objet à celle du liquide.", "Si la densité du liquide dépasse celle de l'objet, l'objet flotte."]);


E("s8f-u2-masse-poids-lieux", 2, ["SC8.4.8"], 2, "gen", function () {
  var m = pick([2, 4, 5, 8, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100]);
  var lieu = pick([
    { n: "la Lune", g: 1.6, f: "environ le sixième de la gravité terrestre" },
    { n: "Mars", g: 3.7, f: "un peu plus du tiers de la gravité terrestre" },
    { n: "Jupiter", g: 24.8, f: "environ deux fois et demie la gravité terrestre" },
    { n: "la Station spatiale internationale (en orbite)", g: 0, f: "la chute libre continue" }
  ]);
  var wT = Math.round(m * 9.8);
  var wL = Math.round(m * lieu.g);
  if (lieu.g === 0) {
    return mcq("Une trousse d'outils de " + m + " kg est apportée dans " + lieu.n + ". Qu'arrive-t-il à sa masse et à son poids?",
      "Sa masse reste " + m + " kg, mais son poids devient pratiquement nul : en chute libre, elle flotte comme si elle ne pesait rien",
      ["Sa masse devient nulle elle aussi, en même temps que son poids, parce qu'il n'y a plus aucune gravité pour retenir la matière de la trousse en orbite",
       "Son poids mesuré reste exactement le même que celui qu'elle avait sur la Terre, parce que le poids d'un objet ne dépend que de sa masse et de rien d'autre",
       "Sa masse augmente légèrement pendant le voyage, parce que tous les objets gonflent toujours un peu quand ils se trouvent dans le vide de l'espace"],
      "La masse (la quantité de matière) ne change pas de lieu; le poids dépend de la gravité, et en chute libre orbitale le poids apparent est nul. <b>Sa masse reste " + m + " kg, mais son poids devient pratiquement nul</b>.", { m: m, lieu: lieu.n });
  }
  return mcq("Une trousse d'outils de " + m + " kg pèse environ " + wT + " N sur la Terre. On l'apporte sur " + lieu.n + ", où la gravité vaut " + String(lieu.g).replace(".", ",") + " N/kg (" + lieu.f + "). Quels sont sa masse et son poids là-bas?",
    "Sa masse reste " + m + " kg et son poids devient environ " + wL + " N",
    ["Sa masse devient environ " + Math.round(m * lieu.g / 9.8) + " kg et son poids reste " + wT + " N",
     "Sa masse et son poids deviennent tous les deux environ " + wL + " dans leurs unités respectives",
     "Sa masse reste " + m + " kg et son poids reste exactement " + wT + " N, comme sur la Terre"],
    "La masse ne change pas de lieu : " + m + " kg partout. Le poids se calcule par masse × gravité du lieu : " + m + " × " + String(lieu.g).replace(".", ",") + " \u2248 <b>" + wL + " N</b>.", { m: m, lieu: lieu.n });
}, ["La masse est la quantité de matière : elle ne change pas de lieu.", "Le poids vaut masse × gravité du lieu; recalcule-le sur place."]);


E("s8f-u2-cr-viscosite-test", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("Une élève veut vérifier si la température change la viscosité de l'huile végétale. Elle verse la même quantité d'huile, une fois froide du réfrigérateur et une fois tiède, dans deux entonnoirs identiques et chronomètre l'écoulement. Décris ce qu'elle doit garder identique dans les deux essais, ce qu'elle mesure, et le résultat auquel la théorie permet de s'attendre. (3 points)",
      ["Elle doit utiliser la même quantité d'huile et des entonnoirs identiques dans les deux essais."],
      "Points de notation (3) : 1 point pour les variables gardées identiques (même huile, même quantité, entonnoirs identiques, même façon de chronométrer; seule la température change). 1 point pour la mesure (le temps d'écoulement complet, répété pour fiabilité). 1 point pour le résultat attendu et son explication (l'huile tiède s'écoule plus vite, car réchauffer un liquide diminue sa viscosité). Réponse modèle : Même huile, même volume, entonnoirs identiques : seule la température diffère. <b>L'huile tiède s'écoulera plus vite, parce que sa viscosité est plus faible que celle de l'huile froide</b>.", {});
  },
  function () {
    return textq("Un élève veut comparer la viscosité de trois liquides (eau, huile végétale, sirop de maïs) en laissant tomber une bille identique dans trois cylindres remplis à la même hauteur, tous à la température ambiante. Décris ce qu'il doit garder identique, ce qu'il mesure, et comment il classera les liquides du moins visqueux au plus visqueux. (3 points)",
      ["Il doit utiliser des cylindres identiques remplis à la même hauteur et la même bille."],
      "Points de notation (3) : 1 point pour les variables gardées identiques (même bille, cylindres identiques, même hauteur de liquide, même température, lâcher de la bille de la même façon au centre). 1 point pour la mesure (le temps que la bille met à atteindre le fond, répété pour fiabilité). 1 point pour le classement attendu (eau la moins visqueuse, chute la plus rapide; puis l'huile; le sirop le plus visqueux, chute la plus lente, car un liquide visqueux résiste davantage au mouvement). Réponse modèle : La bille tombe le plus vite dans l'eau et le plus lentement dans le sirop. <b>Le classement est donc : eau (moins visqueuse), huile, sirop de maïs (plus visqueux)</b>.", {});
  },
  function () {
    return textq("Une entreprise veut choisir, pour une machine extérieure utilisée toute l'année, entre une huile A qui coule bien à froid mais devient très mince à chaud, et une huile B qui coule un peu plus lentement à froid mais garde presque la même viscosité à chaud. Explique, à l'aide de la viscosité et de la température, quel choix protège le mieux la machine, et un inconvénient du choix retenu. (3 points)",
      ["La viscosité d'une huile diminue quand la température augmente."],
      "Points de notation (3) : 1 point pour rappeler le principe (la viscosité diminue quand la température augmente; une huile trop mince à chaud ne protège plus les pièces, une huile trop épaisse à froid circule mal au démarrage). 1 point pour un choix justifié (l'huile B, dont la viscosité reste assez stable, protège la machine dans les deux saisons; l'huile A deviendrait trop mince en été). 1 point pour un inconvénient du choix retenu (l'huile B coule plus lentement à froid : démarrages un peu moins bien lubrifiés par grand froid, ou coût plus élevé). Réponse modèle : L'huile B garde une viscosité utile été comme hiver, ce qui protège les pièces toute l'année. <b>Son inconvénient : par grand froid, elle circule plus lentement au démarrage que l'huile A</b>.", {});
  }
]), ["Un test juste change une seule variable et garde les autres identiques.", "Annonce le résultat attendu et relie-le au comportement de la viscosité."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8f-u2-cr-viscosite-experience
   closes Unit 2 Test 1 (4 marks, Level 3); s8f-u2-cr-ballon
   closes Unit 2 Test 2 (2 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8f-u2-cr-viscosite-experience", 2, ["SC8.4.1", "SC8.4.2"], 3, "var", varset([
  function () {
    return textq("Dans une expérience, on laisse tomber une bille identique dans des cylindres remplis à la même hauteur de trois liquides, et on chronomètre la chute de la bille sur la même distance. À 20 degrés Celsius, les temps de chute sont : eau 1 s, huile à moteur 6 s, sirop de maïs 18 s. À 5 degrés Celsius, les temps sont : eau 1 s, huile à moteur 15 s, sirop de maïs 44 s. (a) Classe les trois liquides par viscosité à chaque température, d'après les données. (1 point) (b) Explique ce classement à l'aide de la théorie particulaire. (1 point) (c) Explique pourquoi les temps de chute changent quand la température baisse. (1 point) (d) Prédis, avec une raison, ce qui arriverait aux temps de chute à une température encore plus froide, à moins 10 degrés Celsius. (1 point) (4 points)",
      ["le sirop de maïs est le plus visqueux, puis l'huile à moteur, puis l'eau, aux deux températures", "un temps de chute plus long veut dire une plus grande résistance à l'écoulement", "la friction et l'attraction entre les particules du sirop sont les plus fortes", "au froid, les particules bougent plus lentement et restent plus près, donc la viscosité augmente"],
      "<b>Réponse modèle :</b> (a) Aux deux températures, le classement est le même : le sirop de maïs est le plus visqueux, puis l'huile à moteur, puis l'eau, la moins visqueuse. Un liquide plus visqueux résiste davantage au mouvement, donc la bille y tombe le plus lentement. (b) Selon la théorie particulaire, la viscosité vient de la friction et de l'attraction entre les particules du liquide. Les particules du sirop de maïs se déplacent difficilement les unes par rapport aux autres, donc elles freinent fortement la bille; celles de l'eau glissent facilement les unes sur les autres, donc la bille y tombe presque librement, et l'huile se situe entre les deux. (c) Quand la température baisse, les particules perdent de l'énergie, bougent plus lentement et restent plus près les unes des autres. La friction entre elles augmente, la viscosité de chaque liquide augmente, et la bille tombe plus lentement, surtout dans les liquides déjà visqueux. (d) À moins 10 degrés Celsius, les temps de chute seraient encore plus longs qu'à 5 degrés, et le sirop de maïs serait presque immobile, parce que le refroidissement supplémentaire ralentirait encore ses particules et augmenterait encore sa viscosité. L'ordre des trois liquides resterait le même.<br><br><b>Points d'attribution :</b> 1 point pour le classement correct aux deux températures (sirop de maïs, huile à moteur, eau), lu à partir des temps. 1 point pour l'explication du classement par la friction ou l'attraction entre les particules, différente d'un liquide à l'autre. 1 point pour l'explication du changement avec la température (des particules plus lentes et plus rapprochées donnent plus de friction et une viscosité plus élevée). 1 point pour la prédiction à la température plus froide (des temps encore plus longs, avec la même raison de particules).",
      {});
  },
  function () {
    return textq("Dans une expérience, des quantités égales de trois liquides sont versées dans des entonnoirs identiques, et on chronomètre l'écoulement complet de chaque liquide. À 25 degrés Celsius, les temps d'écoulement sont : huile végétale 4 s, glycérol 26 s, miel 62 s. À 10 degrés Celsius, les temps sont : huile végétale 9 s, glycérol 74 s, miel 185 s. (a) Classe les trois liquides par viscosité à chaque température, d'après les données. (1 point) (b) Explique ce classement à l'aide de la théorie particulaire. (1 point) (c) Explique pourquoi les temps d'écoulement changent quand la température baisse. (1 point) (d) Prédis, avec une raison, ce qui arriverait aux temps d'écoulement à une température encore plus froide, à 0 degré Celsius. (1 point) (4 points)",
      ["le miel est le plus visqueux, puis le glycérol, puis l'huile végétale, aux deux températures", "un temps d'écoulement plus long veut dire une plus grande résistance à l'écoulement", "la friction et l'attraction entre les particules du miel sont les plus fortes", "au froid, les particules bougent plus lentement et restent plus près, donc la viscosité augmente"],
      "<b>Réponse modèle :</b> (a) Aux deux températures, le classement est le même : le miel est le plus visqueux, puis le glycérol, puis l'huile végétale, la moins visqueuse. Un liquide plus visqueux s'écoule plus lentement, donc son temps d'écoulement est le plus long. (b) Selon la théorie particulaire, la viscosité vient de la friction et de l'attraction entre les particules du liquide. Les particules du miel résistent fortement à passer les unes devant les autres, donc le miel s'écoule très lentement; celles de l'huile végétale glissent beaucoup plus facilement, et le glycérol se situe entre les deux. (c) Quand la température baisse, les particules perdent de l'énergie, bougent plus lentement et restent plus près les unes des autres. La friction entre elles augmente, la viscosité de chaque liquide augmente, et l'écoulement prend plus de temps, avec l'effet le plus marqué sur le miel. (d) À 0 degré Celsius, les temps d'écoulement seraient encore plus longs qu'à 10 degrés, et le miel coulerait à peine, parce que le refroidissement supplémentaire ralentirait encore ses particules et augmenterait encore sa viscosité. L'ordre des trois liquides resterait le même.<br><br><b>Points d'attribution :</b> 1 point pour le classement correct aux deux températures (miel, glycérol, huile végétale), lu à partir des temps. 1 point pour l'explication du classement par la friction ou l'attraction entre les particules, différente d'un liquide à l'autre. 1 point pour l'explication du changement avec la température (des particules plus lentes et plus rapprochées donnent plus de friction et une viscosité plus élevée). 1 point pour la prédiction à la température plus froide (des temps encore plus longs, avec la même raison de particules).",
      {});
  },
  function () {
    return textq("Dans une expérience, on laisse tomber une bille identique dans des cylindres remplis à la même hauteur de trois huiles à moteur de grades différents, et on chronomètre la chute de la bille sur la même distance. À 20 degrés Celsius, les temps de chute sont : huile légère 3 s, huile moyenne 8 s, huile lourde 21 s. À 0 degré Celsius, les temps sont : huile légère 7 s, huile moyenne 23 s, huile lourde 58 s. (a) Classe les trois huiles par viscosité à chaque température, d'après les données. (1 point) (b) Explique ce classement à l'aide de la théorie particulaire. (1 point) (c) Explique pourquoi les temps de chute changent quand la température baisse. (1 point) (d) Prédis, avec une raison, ce qui arriverait aux temps de chute à une température encore plus froide, à moins 20 degrés Celsius. (1 point) (4 points)",
      ["l'huile lourde est la plus visqueuse, puis l'huile moyenne, puis l'huile légère, aux deux températures", "un temps de chute plus long veut dire une plus grande résistance à l'écoulement", "la friction et l'attraction entre les particules de l'huile lourde sont les plus fortes", "au froid, les particules bougent plus lentement et restent plus près, donc la viscosité augmente"],
      "<b>Réponse modèle :</b> (a) Aux deux températures, le classement est le même : l'huile lourde est la plus visqueuse, puis l'huile moyenne, puis l'huile légère, la moins visqueuse. Un liquide plus visqueux résiste davantage au mouvement, donc la bille y tombe le plus lentement. (b) Selon la théorie particulaire, la viscosité vient de la friction et de l'attraction entre les particules du liquide. Les particules de l'huile lourde se déplacent difficilement les unes par rapport aux autres et freinent fortement la bille; celles de l'huile légère glissent plus facilement les unes sur les autres, et l'huile moyenne se situe entre les deux. (c) Quand la température baisse, les particules perdent de l'énergie, bougent plus lentement et restent plus près les unes des autres. La friction entre elles augmente, la viscosité de chaque huile augmente, et la bille tombe plus lentement, avec l'effet le plus marqué sur l'huile lourde. (d) À moins 20 degrés Celsius, les temps de chute seraient encore plus longs qu'à 0 degré, parce que le refroidissement supplémentaire ralentirait encore les particules et augmenterait encore la viscosité de chaque huile. L'ordre des trois huiles resterait le même.<br><br><b>Points d'attribution :</b> 1 point pour le classement correct aux deux températures (huile lourde, huile moyenne, huile légère), lu à partir des temps. 1 point pour l'explication du classement par la friction ou l'attraction entre les particules, différente d'un liquide à l'autre. 1 point pour l'explication du changement avec la température (des particules plus lentes et plus rapprochées donnent plus de friction et une viscosité plus élevée). 1 point pour la prédiction à la température plus froide (des temps encore plus longs, avec la même raison de particules).",
      {});
  }
]), ["Dans ces données, un temps plus long veut toujours dire une viscosité plus élevée.", "Utilise les particules deux fois : une fois pour comparer les liquides, une fois pour expliquer l'effet du froid."]);

E("s8f-u2-cr-ballon", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return textq("À un festival, une montgolfière s'élève quand son brûleur chauffe l'air à l'intérieur de l'enveloppe, et elle redescend doucement quand le pilote laisse cet air refroidir. Explique, à l'aide de la masse volumique, pourquoi la montgolfière s'élève quand l'air intérieur est chauffé (1 point) et pourquoi elle redescend quand cet air refroidit (1 point). (2 points)",
      ["l'air chauffé se dilate et sa masse volumique baisse sous celle de l'air extérieur", "l'air refroidi se contracte et sa masse volumique remonte, donc la montgolfière descend"],
      "<b>Réponse modèle :</b> Quand le brûleur chauffe l'air de l'enveloppe, les particules d'air bougent plus vite et s'écartent davantage, et une partie de l'air sort par l'ouverture du bas. Il reste donc moins de masse dans le même volume : la masse volumique de l'air intérieur devient plus faible que celle de l'air extérieur, plus frais et plus dense, et la montgolfière est poussée vers le haut. Quand l'air intérieur refroidit, ses particules se rapprochent, la masse volumique de l'air intérieur remonte jusqu'à égaler puis dépasser celle qui peut soutenir le vol, et la montgolfière redescend doucement.<br><br><b>Points d'attribution :</b> 1 point pour la montée expliquée par la masse volumique (l'air chauffé se dilate, contient moins de masse par volume et devient moins dense que l'air extérieur). 1 point pour la descente expliquée par la masse volumique (l'air refroidi se contracte et devient plus dense, donc la poussée vers le haut ne suffit plus).",
      {});
  },
  function () {
    return textq("Dans une démonstration en classe, un petit ballon en papier de soie se remplit d'air chauffé et s'élève jusqu'au plafond, puis redescend lentement à mesure que l'air qu'il contient refroidit. Explique, à l'aide de la masse volumique, pourquoi le ballon s'élève quand l'air intérieur est chauffé (1 point) et pourquoi il redescend quand cet air refroidit (1 point). (2 points)",
      ["l'air chauffé se dilate et sa masse volumique baisse sous celle de l'air de la salle", "l'air refroidi se contracte et sa masse volumique remonte, donc le ballon descend"],
      "<b>Réponse modèle :</b> Quand l'air du ballon est chauffé, ses particules bougent plus vite et s'écartent davantage, et une partie de l'air sort par l'ouverture du bas. Il reste donc moins de masse dans le même volume : la masse volumique de l'air intérieur devient plus faible que celle de l'air plus frais de la salle, et le ballon est poussé vers le haut. À mesure que l'air intérieur refroidit, ses particules se rapprochent, sa masse volumique remonte, et quand elle redevient comparable à celle de l'air de la salle, la poussée vers le haut ne suffit plus et le ballon redescend lentement.<br><br><b>Points d'attribution :</b> 1 point pour la montée expliquée par la masse volumique (l'air chauffé se dilate, contient moins de masse par volume et devient moins dense que l'air ambiant). 1 point pour la descente expliquée par la masse volumique (l'air refroidi se contracte et devient plus dense, donc la poussée vers le haut ne suffit plus).",
      {});
  },
  function () {
    return textq("Une montgolfière monte bien au départ, puis cesse de monter et reste à la même altitude : à mesure qu'elle s'élève, l'air à l'intérieur de l'enveloppe a refroidi lentement. Le pilote fait fonctionner le brûleur, et la montgolfière recommence à monter. Explique, à l'aide de la masse volumique, pourquoi la montgolfière avait cessé de monter (1 point) et pourquoi le brûleur la fait monter de nouveau (1 point). (2 points)",
      ["en refroidissant, l'air intérieur est devenu aussi dense que l'air extérieur, donc plus de poussée nette vers le haut", "le brûleur réchauffe l'air, sa masse volumique baisse de nouveau sous celle de l'air extérieur"],
      "<b>Réponse modèle :</b> À mesure que l'air intérieur refroidissait, ses particules se rapprochaient et sa masse volumique augmentait. Quand la masse volumique de l'air intérieur est devenue égale à celle de l'air extérieur à cette altitude, la poussée vers le haut a juste équilibré le poids de la montgolfière, qui a cessé de monter. Quand le pilote fait fonctionner le brûleur, l'air intérieur se réchauffe et se dilate, une partie s'échappe par l'ouverture, et sa masse volumique baisse de nouveau sous celle de l'air extérieur : la poussée vers le haut redevient plus grande que le poids, et la montgolfière recommence à monter.<br><br><b>Points d'attribution :</b> 1 point pour l'arrêt de la montée expliqué par la masse volumique (l'air intérieur refroidi est devenu aussi dense que l'air extérieur, donc la poussée équilibre juste le poids). 1 point pour la reprise de la montée expliquée par la masse volumique (le brûleur rend l'air intérieur moins dense que l'air extérieur, donc la poussée dépasse le poids).",
      {});
  }
]), ["Suis la masse volumique de l'air intérieur et compare-la toujours à celle de l'air extérieur.", "Chauffé veut dire écarté et moins dense; refroidi veut dire rapproché et plus dense."]);

/* ----- bank-u3.js ----- */
// CRMARKS: s8f-u3-cr-refraction-expliquer=3
// CRMARKS: s8f-u3-cr-properties=3
// CRMARKS: s8f-u3-cr-em=3
// CRMARKS: s8f-u3-cr-reflection=3
// CRMARKS: s8f-u3-cr-diffuse=3
// CRMARKS: s8f-u3-cr-refraction=3
// CRMARKS: s8f-u3-cr-speed=3
// CRMARKS: s8f-u3-cr-words=3
// CRMARKS: s8f-u3-cr-fibre=4
// CRMARKS: s8f-u3-cr-research=3
// CRMARKS: s8f-u3-cr-mirror-lab=3
// CRMARKS: s8f-u3-cr-conclusion=3
// CRMARKS: s8f-u3-cr-design-refraction=4
// CRMARKS: s8f-u3-cr-estimate=3
// CRMARKS: s8f-u3-cr-predict=3
// CRMARKS: s8f-u3-cr-identify-medium=3
// CRMARKS: s8f-u3-cr-em-usages=4
// CRMARKS: s8f-u3-cr-image-miroir=4
// CRMARKS: s8f-u3-cr-refraction-bol=4
// CRMARKS: s8f-u3-cr-reflexion-quotidien=2
// CRMARKS: s8f-u3-cr-refraction-paille=3
// CRMARKS: s8f-u3-cr-refraction-lumiere=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s8f-u3-properties=2
// CRMARKS: s8f-u3-materials=2
// CRMARKS: s8f-u3-spectrum-order=2
// CRMARKS: s8f-u3-vacuum=2
// CRMARKS: s8f-u3-colour-seen=3
// CRMARKS: s8f-u3-em-order=2
// CRMARKS: s8f-u3-em-compare=3
// CRMARKS: s8f-u3-em-energy=2
// CRMARKS: s8f-u3-em-detection=3
// CRMARKS: s8f-u3-law=2
// CRMARKS: s8f-u3-angle-calc=2
// CRMARKS: s8f-u3-mirror-types=2
// CRMARKS: s8f-u3-plane-spot=2
// CRMARKS: s8f-u3-lateral=3
// CRMARKS: s8f-u3-vision=2
// CRMARKS: s8f-u3-history=2
// CRMARKS: s8f-u3-early-tech=2
// CRMARKS: s8f-u3-freq-relation=3
// CRMARKS: s8f-u3-harm-energy=2
// CRMARKS: s8f-u3-personal-optics=2
// CRMARKS: s8f-u3-individual-group=2
// CRMARKS: s8f-u3-corning-siemens=3
// CRMARKS: s8f-u3-applications-question=3
// CRMARKS: s8f-u3-definitions=2
// CRMARKS: s8f-u3-definitions-figure=3
// CRMARKS: s8f-u3-concave-spot=2
// CRMARKS: s8f-u3-convex-spot=2
// CRMARKS: s8f-u3-real-virtual=2
// CRMARKS: s8f-u3-delimit=3
// CRMARKS: s8f-u3-estimate-reflect=2
// CRMARKS: s8f-u3-estimate-incidence=2
// CRMARKS: s8f-u3-mirror-key=2
// CRMARKS: s8f-u3-mirror-key-apply=3
// CRMARKS: s8f-u3-protractor=2
// CRMARKS: s8f-u3-safety=2
// CRMARKS: s8f-u3-fish-question=3
// CRMARKS: s8f-u3-coin-question=2
// CRMARKS: s8f-u3-estimate-bend=2
// CRMARKS: s8f-u3-estimate-compare=3
// CRMARKS: s8f-u3-predict-media=3
// CRMARKS: s8f-u3-lens-key=2
// CRMARKS: s8f-u3-lens-key-apply=3
// CRMARKS: s8f-u3-lens-key-evidence=4
// CRMARKS: s8f-u3-focal-procedure=3
// CRMARKS: s8f-u3-focal-judge=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s8f-u3-properties=a
// BIMODAL: s8f-u3-materials=a
// BIMODAL: s8f-u3-spectrum-order=a
// BIMODAL: s8f-u3-vacuum=b
// BIMODAL: s8f-u3-colour-seen=b
// BIMODAL: s8f-u3-em-order=a
// BIMODAL: s8f-u3-em-compare=a
// BIMODAL: s8f-u3-em-energy=a
// BIMODAL: s8f-u3-em-detection=b
// BIMODAL: s8f-u3-law=b
// BIMODAL: s8f-u3-angle-calc=a
// BIMODAL: s8f-u3-mirror-types=b
// BIMODAL: s8f-u3-plane-spot=a
// BIMODAL: s8f-u3-lateral=b
// BIMODAL: s8f-u3-vision=a
// BIMODAL: s8f-u3-history=b
// BIMODAL: s8f-u3-early-tech=b
// BIMODAL: s8f-u3-freq-relation=b
// BIMODAL: s8f-u3-harm-energy=a
// BIMODAL: s8f-u3-personal-optics=b
// BIMODAL: s8f-u3-individual-group=b
// BIMODAL: s8f-u3-corning-siemens=b
// BIMODAL: s8f-u3-applications-question=b
// BIMODAL: s8f-u3-definitions=a
// BIMODAL: s8f-u3-definitions-figure=b
// BIMODAL: s8f-u3-concave-spot=a
// BIMODAL: s8f-u3-convex-spot=a
// BIMODAL: s8f-u3-real-virtual=b
// BIMODAL: s8f-u3-delimit=b
// BIMODAL: s8f-u3-estimate-reflect=a
// BIMODAL: s8f-u3-estimate-incidence=a
// BIMODAL: s8f-u3-mirror-key=b
// BIMODAL: s8f-u3-mirror-key-apply=b
// BIMODAL: s8f-u3-protractor=b
// BIMODAL: s8f-u3-safety=b
// BIMODAL: s8f-u3-fish-question=b
// BIMODAL: s8f-u3-coin-question=b
// BIMODAL: s8f-u3-estimate-bend=a
// BIMODAL: s8f-u3-estimate-compare=b
// BIMODAL: s8f-u3-predict-media=b
// BIMODAL: s8f-u3-lens-key=b
// BIMODAL: s8f-u3-lens-key-apply=b
// BIMODAL: s8f-u3-lens-key-evidence=b
// BIMODAL: s8f-u3-focal-procedure=b
// BIMODAL: s8f-u3-focal-judge=b
/* ============================================================
   Sciences 8 (FR) — Unité 3 : L'optique
   Banque construite le Nov 16, 2026. Indicateurs SC8.7.1 à
   SC8.9.14 (groupes 7, 8 et 9 du guide français).
   Existing tests and question banks were reviewed only to gauge
   the expected depth and range of treatment. All items in this
   bank were written new for this app.

   Notes de couverture (honnêteté) :
   - SC8.9.11 (travailler en collaboration avec ses pairs) reçoit
     ZÉRO question : la coopération elle-même s'évalue en classe,
     pas dans une banque de révision. C'est le seul indicateur
     NONE de l'unité.
   - Le groupe SC8.9 français ne correspond pas numéro par numéro
     au groupe anglais : les questions sur la réfraction découlant
     de problèmes pratiques portent l'étiquette SC8.9.9, la
     conclusion fondée sur des données probantes SC8.9.5, et les
     clés de classification des miroirs (SC8.9.7) et des lentilles
     (SC8.9.13) ainsi que l'estimation de la distance focale
     (SC8.9.14) sont propres au guide français.
   - Discipline du guide : les caractéristiques des images des
     miroirs courbes se lisent sur des diagrammes de rayons
     fournis, jamais mémorisées; les questions sur les lentilles
     restent qualitatives (aucune construction de diagramme de
     rayons de lentille n'est exigée); la loi de Snell n'est
     jamais la clé d'une question.
   - Résidu CORE : la manipulation des miroirs et la construction
     des diagrammes en laboratoire (SC8.9.3) s'évaluent en classe;
     la banque porte l'exactitude des mesures, la lecture des
     diagrammes et les conclusions. L'utilisation sécuritaire des
     outils est portée par SC8.9.8 (une question de connaissances).
   ============================================================ */

/* ---------- SC8.7.1 Propriétés de la lumière ---------- */

E("s8f-u3-properties", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "Une main tenue devant le faisceau d'un projecteur projette une ombre nette avec des détails clairs, jusqu'à la bague à un doigt. Quelle propriété de la lumière l'ombre nette démontre-t-elle?", k: "La lumière voyage en ligne droite (la propagation rectiligne)", w: ["La lumière se disperse en ses couleurs constituantes", "La lumière se réfracte quand elle passe dans un nouveau milieu", "La lumière voyage seulement à travers un vide"] },
    { q: "Un faisceau d'une boîte à rayons frappe un prisme et s'étale en une bande de couleurs sur l'écran. Quelle propriété de la lumière est à l'œuvre?", k: "La dispersion : la lumière blanche se sépare en ses couleurs constituantes", w: ["La réflexion : la lumière qui rebondit sur une surface", "La propagation rectiligne : la lumière qui voyage en ligne droite", "La réfraction en une seule couleur à la sortie du prisme"] },
    { q: "La lumière du soleil qui rebondit sur le pare-brise poussiéreux d'une voiture se disperse dans toutes les directions, tandis que celle qui rebondit sur un miroir propre part dans une seule direction. Les deux cas montrent quelle propriété de la lumière?", k: "La réflexion", w: ["La dispersion", "La réfraction", "Le voyage à travers un vide"] },
    { q: "Un bâtonnet debout dans un bécher d'eau semble cassé à la surface de l'eau. Quelle propriété de la lumière cause cet effet?", k: "La réfraction : la lumière se courbe en passant d'un milieu à un autre", w: ["La dispersion : la lumière se sépare en couleurs", "La réflexion : la lumière rebondit sur l'eau", "La propagation rectiligne : la lumière voyage tout droit"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les six propriétés de la lumière du guide ont chacune leur démonstration signature : le voyage en ligne droite fait des ombres nettes, la réflexion fait rebondir la lumière sur les surfaces (dans une direction sur un miroir, dispersée sur la poussière), la réfraction courbe la lumière entre les milieux (le bâtonnet qui semble cassé) et la dispersion sépare la lumière blanche en ses couleurs dans un prisme.",
    {});
}, ["Associe la démonstration à la propriété qu'elle montre.", "Ombre veut dire lignes droites; couleurs d'un prisme veulent dire dispersion; bâtonnet plié veut dire réfraction."]);

E("s8f-u3-materials", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "Quel matériau est classé correctement selon la quantité de lumière qu'il laisse passer?", k: "Une fenêtre givrée est translucide : une partie de la lumière passe, mais elle est dispersée, donc aucune image claire ne se forme", w: ["Une porte en bois massif est translucide : une partie de la lumière qui la frappe traverse le bois de la porte", "Un carreau de fenêtre clair est opaque : aucune lumière du tout ne traverse le verre du carreau de la fenêtre", "Une fenêtre givrée est transparente : la lumière la traverse et les images qu'on voit restent nettes et claires"] },
    { q: "Une élève tient trois matériaux dans le faisceau d'un projecteur : un carreau de verre, des lunettes de soleil et un livre. Quel ordre selon la lumière transmise est correct?", k: "Le carreau de verre (le plus), puis les lunettes de soleil, puis le livre (aucune)", w: ["Le livre (le plus), puis les lunettes de soleil, puis le carreau de verre (aucune)", "Les lunettes de soleil (le plus), puis le carreau de verre, puis le livre en dernier (aucune)", "Les trois matériaux laissent passer exactement la même quantité de lumière à travers eux"] },
    { q: "Quel exemple correspond à sa catégorie?", k: "Un abat-jour est translucide : il laisse passer une partie de la lumière tout en la dispersant", w: ["Un mur de briques est transparent : la lumière le traverse et des images claires se forment derrière lui", "Un miroir est translucide : une partie de la lumière le traverse, mais la lumière est dispersée", "Le verre givré est opaque : aucune lumière du tout ne traverse un carreau de verre givré"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les matériaux se classent selon la quantité de lumière qu'ils laissent passer. Les matériaux transparents (un carreau de fenêtre) laissent passer la lumière avec une image claire; les matériaux translucides (une fenêtre givrée, un abat-jour, des lunettes de soleil) en laissent passer une partie mais la dispersent; les matériaux opaques (une porte, un livre, un mur) n'en laissent passer aucune.",
    {});
}, ["Trois catégories : toute la lumière clairement, une partie dispersée, aucune.", "Les matériaux givrés et teintés sont l'indice des translucides."]);

E("s8f-u3-spectrum-order", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("La lumière blanche dispersée par un prisme se sépare en ses couleurs constituantes. Classées par degré de réfraction, de la moins réfractée à la plus réfractée, quel est l'ordre correct?",
      "Rouge, orange, jaune, vert, bleu, indigo, violet",
      ["Violet, indigo, bleu, vert, jaune, orange, rouge",
       "Rouge, jaune, orange, violet, bleu, vert, indigo",
       "Vert, bleu, indigo, violet, rouge, orange, jaune"],
      "Le spectre suit l'ordre rouge, orange, jaune, vert, bleu, indigo, violet. Le rouge est le moins réfracté et le violet le plus, ce qui est aussi l'ordre des longueurs d'onde : le rouge a la plus grande longueur d'onde des couleurs visibles et le violet la plus courte. L'ordre est classé exactement ainsi, par degré de réfraction.",
      {});
  }
]), ["Rouge, orange, jaune, vert, bleu, indigo, violet, et le rouge se courbe le moins.", "La moins réfractée d'abord : commence par le rouge."]);

E("s8f-u3-dispersion", 3, ["SC8.7.1"], 3, "var", varset([
  function () {
    return mcq("Une enseignante envoie deux faisceaux à travers le même prisme : la lumière blanche d'une boîte à rayons et la lumière d'une seule couleur d'un laser rouge. La lumière blanche s'étale en un spectre, mais le faisceau laser se courbe seulement, en restant rouge. Quelle explication est correcte?",
      "La dispersion sépare un mélange de couleurs; la lumière du laser est une seule longueur d'onde, donc il n'y a rien à séparer, bien qu'elle se réfracte quand même",
      ["Un prisme disperse seulement la lumière qui y entre à des angles faibles, et le faisceau laser est entré dans le prisme trop à pic pour s'étaler en couleurs",
       "La lumière laser ne peut pas se réfracter du tout, donc elle traverse le prisme sans changer de direction, exactement comme si le prisme n'était pas là",
       "Le prisme a été épuisé par la lumière blanche envoyée à travers lui en premier, donc il ne pouvait plus disperser un deuxième faisceau après cela"],
      "Les deux résultats séparent la réfraction de la dispersion. Les deux faisceaux se réfractent (se courbent) aux surfaces du prisme. Seule la lumière blanche se disperse, parce qu'elle est une combinaison de toutes les longueurs d'onde visibles, chacune réfractée d'une quantité différente. Le laser est une seule longueur d'onde : il se courbe d'un bloc et reste d'une seule couleur.",
      {});
  }
]), ["Deux choses se passent dans un prisme : se courber et se séparer. Quel faisceau peut faire les deux?", "Une seule longueur d'onde ne peut pas s'étaler en plusieurs."]);

E("s8f-u3-shadow", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("Une élève approche une forme en carton d'une lampe, en gardant l'écran fixe, et son ombre grandit et reste nette. Quelle affirmation explique les deux observations?",
      "La lumière voyage en ligne droite depuis la lampe; un objet plus proche bloque un cône plus large de ces rayons droits, donc l'ombre grandit, et les trajets droits gardent ses bords nets",
      ["La lumière se courbe autour des bords de la forme en carton, et la quantité de courbure augmente régulièrement à mesure que l'objet s'approche de la lampe sur la table",
       "La lumière de la lampe accélère en passant près du carton, et cette accélération étire l'ombre sur l'écran jusqu'à ce qu'elle couvre une plus grande partie de sa surface",
       "L'ombre grandit parce que le carton absorbe davantage des couleurs de la lumière chaque fois qu'il se trouve plus près de la lampe qui éclaire la scène"],
      "Les ombres sont la propriété de la ligne droite à l'œuvre. Les rayons voyagent tout droit depuis la source; l'objet en bloque un cône, et plus l'objet est proche de la lampe, plus le cône bloqué est large, donc l'ombre est plus grande. Parce que les rayons ne se courbent pas autour des bords, l'ombre reste nette.",
      {});
  }
]), ["Les ombres existent parce que la lumière ne se courbe pas autour des choses.", "Plus près de la source veut dire bloquer un étalement plus large de rayons droits."]);

E("s8f-u3-vacuum", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("La lumière du Soleil et des étoiles atteint la Terre à travers le vide de l'espace, et la lumière à l'intérieur d'une ampoule claire traverse le quasi-vide autour de son filament. Quelle propriété de la lumière les deux cas démontrent-ils?",
      "La lumière peut voyager à travers un vide : elle n'a pas besoin d'un milieu pour se déplacer d'un endroit à un autre",
      ["La lumière a besoin d'un milieu pour voyager, et l'espace est rempli d'une matière invisible qui la transporte jusqu'à nous",
       "La lumière voyage seulement à travers les solides et les liquides transparents, et jamais à travers un espace vide",
       "La lumière ralentit jusqu'à s'arrêter complètement quand aucun milieu n'est présent sur son trajet pour la porter"],
      "Contrairement au son, la lumière n'a besoin de rien pour voyager. Elle traverse le vide de l'espace depuis le Soleil et les étoiles, et l'espace évacué à l'intérieur d'une ampoule, ce qui explique pourquoi l'ampoule fait un bruit sec quand elle se casse et que le vide est perdu. Voyager sans milieu est une des six propriétés du guide.",
      {});
  }
]), ["Le son a besoin d'un milieu. Et la lumière?", "La lumière des étoiles qui traverse l'espace vide en est la preuve."]);

E("s8f-u3-colour-seen", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("On regarde un chandail vert à la lumière blanche. Selon ce que le guide dit des longueurs d'onde et des objets, pourquoi le chandail a-t-il l'air vert?",
      "Le chandail absorbe les autres longueurs d'onde de la lumière blanche et réfléchit la longueur d'onde que notre cerveau interprète comme le vert",
      ["Le chandail produit sa propre lumière verte chaque fois qu'on le porte dehors à la lumière ordinaire du jour",
       "Le chandail absorbe la longueur d'onde verte de la lumière blanche et réfléchit toutes les autres longueurs d'onde à la place",
       "La lumière blanche devient simplement verte chaque fois qu'elle frappe un morceau de tissu, quelle que soit sa couleur"],
      "Les objets ne nous donnent pas leur couleur; ils la choisissent. La lumière blanche transporte toutes les longueurs d'onde visibles; le matériau du chandail en absorbe la plupart et réfléchit la longueur d'onde verte vers nos yeux. Un objet rouge réfléchit le rouge, un objet blanc réfléchit presque tout, et un objet noir absorbe presque tout.",
      {});
  }
]), ["Nous voyons seulement les longueurs d'onde qui rebondissent vers nos yeux.", "Les longueurs d'onde absorbées disparaissent; celles qui sont réfléchies sont la couleur."]);

E("s8f-u3-cr-properties", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return textq("Une démonstration en classe montre deux effets dans un même réservoir d'eau : (a) un bâtonnet dans l'eau semble plié à la surface, et (b) un faisceau envoyé à travers l'eau avec quelques gouttes de lait s'étale en couleurs. Pour chaque effet, nomme la propriété de la lumière responsable et explique ce que la lumière fait. (3 points)",
      ["le bâtonnet plié est la réfraction, la lumière qui se courbe entre les milieux", "l'éventail de couleurs est la dispersion, la lumière blanche qui se sépare", "chaque explication liée au comportement de la lumière"],
      "<b>Réponse modèle:</b> (a) Le bâtonnet plié est la réfraction. La lumière du bâtonnet change de direction en passant de l'eau à l'air sur son trajet vers nos yeux, donc le cerveau, qui suppose que la lumière a voyagé tout droit, place la partie sous l'eau du bâtonnet au mauvais endroit : il semble plié ou cassé à la surface. (b) L'éventail de couleurs est la dispersion. La lumière blanche est une combinaison de longueurs d'onde; en traversant le mélange d'eau et de lait, les longueurs d'onde se séparent, étalant le faisceau en ses couleurs constituantes, la même séparation qu'un prisme produit.<br><br><b>Points d'attribution:</b> 1 point pour la réfraction nommée et liée à la courbure entre les milieux pour le bâtonnet. 1 point pour la dispersion nommée pour l'éventail de couleurs. 1 point pour l'explication que la lumière blanche est un mélange de longueurs d'onde qui se séparent.",
      {});
  }
]), ["Un effet concerne la courbure entre les milieux; l'autre concerne la lumière blanche comme mélange.", "Nomme la propriété, puis dis ce que la lumière fait."]);

/* ---------- SC8.7.2 Le spectre électromagnétique ---------- */

E("s8f-u3-em-order", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Quelle liste donne les types de rayonnement électromagnétique en ordre de longueur d'onde décroissante?", k: "Ondes radio, micro-ondes, infrarouge, lumière visible, ultraviolet, rayons X, rayons gamma", w: ["Rayons gamma, rayons X, ultraviolet, lumière visible, infrarouge, micro-ondes, ondes radio", "Ondes radio, infrarouge, micro-ondes, lumière visible, rayons X, ultraviolet, rayons gamma", "Micro-ondes, ondes radio, lumière visible, infrarouge, ultraviolet, rayons gamma, rayons X"] },
    { q: "Sur la bande du spectre électromagnétique montrée, quel type se trouve entre l'infrarouge et l'ultraviolet?", k: "La lumière visible", w: ["Les micro-ondes", "Les ondes radio", "Les rayons X"] },
    { q: "Quel type de rayonnement électromagnétique a la plus grande longueur d'onde de tous?", k: "Les ondes radio", w: ["Les rayons gamma", "Les micro-ondes", "L'ultraviolet"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "Le spectre en longueur d'onde décroissante suit cet ordre : ondes radio, micro-ondes, infrarouge, lumière visible, ultraviolet, rayons X, rayons gamma. La lumière visible, la seule partie que nos yeux détectent, se trouve au milieu, entre l'infrarouge et l'ultraviolet.",
    {});
  if (c.q.indexOf("bande du spectre") >= 0) q.figure = s8fEMSpectrumSVG();
  return q;
}, ["L'ordre est fixe : radio la plus longue, gamma la plus courte, visible au milieu.", "Longueur d'onde décroissante veut dire commencer par les ondes radio."]);

E("s8f-u3-em-uses", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Quel jumelage d'un type de rayonnement et d'une utilisation correspond aux exemples du guide?", k: "Infrarouge : détecteurs de mouvement; ultraviolet : bronzage; rayons gamma : radiothérapie contre le cancer", w: ["Micro-ondes : imagerie médicale par rayons X; ondes radio : cuisson des aliments; rayons X : télécommunications", "Ultraviolet : cuisson des aliments; infrarouge : thérapie contre le cancer; rayons gamma : télécommandes", "Rayons X : bronzage; micro-ondes : détecteurs de mouvement; ondes radio : détection médicale"] },
    { q: "Un hôpital utilise un type de rayonnement électromagnétique pour voir les os cassés et un autre pour traiter le cancer. Quel jumelage est correct?", k: "Les rayons X pour la détection médicale des os; les rayons gamma pour la radiothérapie", w: ["Les micro-ondes pour les os; les ondes radio pour la thérapie", "L'infrarouge pour les os; l'ultraviolet pour la thérapie", "Les rayons gamma pour les os; les rayons X pour la thérapie"] },
    { q: "Quelle utilisation appartient aux micro-ondes dans la liste du guide?", k: "La cuisson des aliments", w: ["La détection médicale des os cassés", "La radiothérapie contre le cancer", "Le bronzage au soleil"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La liste des utilisations du guide : les ondes radio pour les télécommunications, les micro-ondes pour la cuisson des aliments, l'infrarouge pour les détecteurs de mouvement, la lumière visible pour le microscope, l'ultraviolet pour le bronzage, les rayons X pour la détection médicale et les rayons gamma pour la radiothérapie contre le cancer.",
    {});
}, ["Passe la liste du guide en revue, type par type.", "Cuisson égale micro-ondes; os égale rayons X; thérapie égale gamma."]);

E("s8f-u3-em-compare", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    var q = mcq("Comparées à la lumière visible, les ondes radio ont quelle combinaison de longueur d'onde, de fréquence et d'énergie?",
      "Une longueur d'onde plus grande, une fréquence plus basse et une énergie plus basse",
      ["Une longueur d'onde plus courte, une fréquence plus haute et une énergie plus haute",
       "Une longueur d'onde plus grande, une fréquence plus haute et la même énergie",
       "La même longueur d'onde, mais une fréquence plus basse et une énergie plus basse"],
      "Les ondes radio se trouvent à l'extrémité du spectre opposée aux rayons gamma. En allant de la lumière visible vers les ondes radio, la longueur d'onde augmente pendant que la fréquence et l'énergie diminuent toutes les deux : les trois quantités bougent ensemble selon un patron fixe, une plus grande longueur d'onde signifiant toujours une fréquence et une énergie plus basses.",
      {});
    q.figure = s8fEMSpectrumSVG();
    return q;
  }
]), ["Trouve les ondes radio et le visible sur la bande, puis applique le patron : plus grande longueur d'onde, fréquence plus basse, énergie plus basse.", "Les trois quantités ne bougent jamais indépendamment."]);

E("s8f-u3-em-devices", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("Une classe dresse la liste des appareils dans la salle qui envoient ou reçoivent de l'information sans utiliser la lumière visible. Quel appareil appartient à la liste?",
      "Une télécommande de télévision, qui envoie ses signaux par rayonnement infrarouge",
      ["Une lampe de bureau, qui envoie ses signaux au moyen de la lumière visible",
       "Une affiche imprimée, qui se lit par la lumière visible réfléchie sur son papier",
       "Une fenêtre, qui laisse passer la lumière visible du jour dans la salle de classe"],
      "Le point du guide est que le rayonnement électromagnétique nous entoure sous des formes que nous ne pouvons pas voir. Les radios, les téléphones cellulaires, les signaux de télévision, l'Internet sans fil et les télécommandes fonctionnent tous avec du rayonnement hors de la bande visible; la télécommande utilise l'infrarouge. La lampe, l'affiche et la fenêtre sont la lumière visible à l'œuvre.",
      {});
  }
]), ["La liste vise le rayonnement que nos yeux ne peuvent pas détecter.", "Les télécommandes chuchotent en infrarouge."]);

E("s8f-u3-em-energy", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("Quel type de rayonnement électromagnétique transporte le plus d'énergie, et lequel en transporte le moins?",
      "Les rayons gamma transportent le plus d'énergie; les ondes radio en transportent le moins",
      ["Les ondes radio transportent le plus d'énergie; les rayons gamma en transportent le moins",
       "La lumière visible transporte le plus d'énergie; les micro-ondes en transportent le moins",
       "Tous les types transportent la même énergie; seules leurs utilisations diffèrent entre eux"],
      "L'énergie suit l'ordre du spectre : elle augmente régulièrement des ondes radio aux micro-ondes, à l'infrarouge, à la lumière visible et à l'ultraviolet jusqu'aux rayons X, et atteint son sommet aux rayons gamma. C'est aussi pourquoi l'extrémité de haute énergie est l'extrémité dangereuse.",
      {});
  }
]), ["L'énergie augmente le long du spectre vers les rayons gamma.", "Le plus d'énergie et le plus de danger vivent à la même extrémité."]);

E("s8f-u3-em-detection", 3, ["SC8.7.2"], 2, "var", varset([
  function () {
    return mcq("Du rayonnement électromagnétique de plusieurs types traverse la salle de classe en ce moment même, pourtant les élèves ne remarquent que la lumière des fenêtres et des lampes. Pourquoi tant de rayonnement passe-t-il inaperçu de leurs sens?",
      "Nos yeux détectent seulement la bande visible; les autres types ont des longueurs d'onde trop grandes (comme l'infrarouge) ou trop courtes (comme l'ultraviolet) pour que nos yeux les enregistrent",
      ["Les autres types de rayonnement existent seulement à l'intérieur des machines qui les produisent, enfermés, et ils ne voyagent jamais à travers des pièces ordinaires comme celle-ci de la classe",
       "Les autres types de rayonnement sont bloqués complètement par les murs et le toit du bâtiment de l'école avant de pouvoir atteindre quiconque est assis à l'intérieur de la salle de classe",
       "Nos yeux détectent en fait tous les nombreux types de rayonnement autour de nous dans la pièce, mais le cerveau choisit d'ignorer la plupart de ce que les yeux enregistrent, exprès"],
      "La détection est une question de longueur d'onde. Le rayonnement est continuellement présent, des signaux radio à l'ultraviolet, mais l'œil humain enregistre seulement l'étroite bande visible. Les longueurs d'onde plus grandes que le visible (infrarouge) ou plus courtes (ultraviolet) passent inaperçues sans instruments.",
      {});
  }
]), ["Le rayonnement est là. Qu'est-ce qui limite notre détection?", "Nos yeux sont réglés sur une seule bande étroite."]);

E("s8f-u3-cr-em", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    return textq("Choisis deux types de rayonnement électromagnétique à des extrémités différentes du spectre (par exemple, les ondes radio et les rayons gamma). Compare-les quant à la longueur d'onde, à la fréquence et à l'énergie, et donne l'utilisation du guide pour chacun. (3 points)",
      ["une comparaison correcte de la longueur d'onde, de la fréquence et de l'énergie", "les deux types à des positions clairement différentes du spectre", "une utilisation correcte pour chaque type"],
      "<b>Réponse modèle:</b> Les ondes radio et les rayons gamma se trouvent aux extrémités opposées du spectre. Les ondes radio ont les longueurs d'onde les plus grandes, les fréquences les plus basses et les énergies les plus basses de tous les types; on les utilise pour les télécommunications. Les rayons gamma ont les longueurs d'onde les plus courtes, les fréquences les plus hautes et les énergies les plus hautes; on les utilise en radiothérapie contre le cancer. La comparaison montre le patron du spectre : à mesure que la longueur d'onde diminue le long du spectre, la fréquence et l'énergie augmentent toutes les deux. (Deux types quelconques à des positions différentes, comparés correctement avec leurs utilisations du guide, méritent les points.)<br><br><b>Points d'attribution:</b> 1 point pour la comparaison des longueurs d'onde. 1 point pour la fréquence et l'énergie comparées de façon cohérente avec elle. 1 point pour une utilisation correcte du guide pour chaque type.",
      {});
  }
]), ["Choisis deux types éloignés pour que la comparaison ait la place de se montrer.", "Longueur d'onde, fréquence et énergie bougent selon un patron fixe : énonce-le une fois, applique-le aux deux."]);

/* ---------- SC8.7.3 Les lois de la réflexion ---------- */

E("s8f-u3-law", 3, ["SC8.7.3"], 1, "var", varset([
  function () {
    return mcq("Qu'énonce la loi de la réflexion?",
      "L'angle d'incidence est égal à l'angle de réflexion, les deux mesurés à partir de la normale",
      ["L'angle d'incidence est égal à l'angle de réflexion, les deux mesurés à partir de la surface du miroir",
       "L'angle de réflexion est toujours le double de l'angle d'incidence mesuré à partir de la normale",
       "La lumière se réfléchit sur une surface au même angle qu'elle y arrive, mesuré à partir de la surface"],
      "La loi de la réflexion : l'angle d'incidence est égal à l'angle de réflexion. Les deux angles se mesurent à partir de la normale, la ligne perpendiculaire à la surface au point où le rayon la frappe, et non à partir de la surface elle-même. Le laboratoire de base sur la réflexion existe pour laisser les élèves arriver à cette loi à partir de leurs propres mesures.",
      {});
  }
]), ["La loi est une égalité entre deux angles, mesurés à partir de la même ligne de référence.", "À partir de la normale, pas à partir de la surface."]);

E("s8f-u3-angle-calc", 3, ["SC8.7.3"], 2, "gen", function () {
  var ang = pick([25, 30, 35, 40, 45, 50, 55, 60]);
  var mode = pick(["reflect", "surface", "between"]);
  function dis3(keyVal, cand) {
    var out = [];
    for (var i = 0; i < cand.length && out.length < 3; i++) {
      if (cand[i] !== keyVal && cand[i] > 0 && cand[i] < 180 && out.indexOf(cand[i]) < 0) out.push(cand[i]);
    }
    return out.map(function (d) { return d + " degrés"; });
  }
  var q, key, dis, sol;
  if (mode === "reflect") {
    key = ang + " degrés";
    dis = dis3(ang, [90 - ang, ang + 15, ang - 15, ang + 5, 2 * ang, 90 - ang + 5]);
    sol = "Selon la loi de la réflexion, l'angle de réflexion est égal à l'angle d'incidence : " + ang + " degrés, les deux mesurés à partir de la normale.";
    q = mcq("Le diagramme montre un rayon qui frappe un miroir plan avec un angle d'incidence de " + ang + " degrés. Quel est l'angle de réflexion?", key, dis, sol, {});
  } else if (mode === "surface") {
    key = (90 - ang) + " degrés";
    dis = dis3(90 - ang, [ang, 90 - ang + 10, 90 - ang - 10, 90 - ang + 15, ang + 5]);
    sol = "Les " + ang + " degrés du diagramme sont mesurés à partir de la surface du miroir. Les angles d'incidence se mesurent à partir de la normale, et la normale est à 90 degrés de la surface, donc l'angle d'incidence est 90 - " + ang + " = " + (90 - ang) + " degrés.";
    q = mcq("Un rayon frappe un miroir plan de sorte que le rayon fait un angle de " + ang + " degrés avec la surface du miroir, comme montré. Quel est l'angle d'incidence?", key, dis, sol, {});
  } else {
    key = (180 - 2 * ang) + " degrés";
    dis = dis3(180 - 2 * ang, [2 * ang, 90 - ang, 180 - ang, 180 - 2 * ang + 10, 180 - 2 * ang - 10]);
    sol = "L'angle de réflexion est égal à l'angle d'incidence, " + ang + " degrés. Sur la ligne droite du côté de la normale, l'angle entre le rayon incident et le rayon réfléchi est 180 - " + ang + " - " + ang + " = " + (180 - 2 * ang) + " degrés.";
    q = mcq("Un rayon se réfléchit sur un miroir plan avec un angle d'incidence de " + ang + " degrés, comme montré. Quel est l'angle entre le rayon incident et le rayon réfléchi?", key, dis, sol, {});
  }
  q.figure = s8fReflectSVG(ang, false);
  return q;
}, ["Les deux angles se mesurent à partir de la normale. Lis l'angle du diagramme attentivement : est-il à partir de la normale ou de la surface?", "La loi donne l'angle de réflexion directement; les angles à partir de la surface demandent d'abord une conversion de 90 degrés."]);

E("s8f-u3-specular-diffuse", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "Une photographie imprimée avec un fini lustré montre des taches d'éblouissement sous une lampe, tandis que la même photographie en fini mat n'en montre pas. Quelle explication utilise correctement les deux sortes de réflexion?", k: "La surface lustrée réfléchit de façon spéculaire, envoyant les rayons dans une direction pour former l'éblouissement; la surface mate réfléchit de façon diffuse, dispersant les rayons, donc aucun éblouissement ne se forme", w: ["La surface lustrée réfléchit la lumière de façon diffuse dans toutes les directions sous la lampe, et la surface mate la réfléchit de façon spéculaire dans une direction, donc le fini mat devrait éblouir davantage", "Les deux surfaces réfléchissent la lumière de façon spéculaire dans une direction sous la lampe; l'impression mate est simplement imprimée plus foncée que l'impression lustrée, et c'est toute la différence entre elles", "La surface mate de l'impression absorbe toute la lumière qui la frappe sous la lampe, donc aucune lumière ne se réfléchit sur elle du tout, en aucune direction, et le fini lustré garde toute sa lumière pour l'œil"] },
    { q: "Quelle application est jumelée correctement à sa sorte de réflexion?", k: "La cire pour voiture produit un fini spéculaire : une surface lisse qui réfléchit dans une direction pour la brillance", w: ["La peinture mate est choisie par les peintres pour sa réflexion spéculaire et son lustre élevé et brillant", "La vaisselle en céramique émaillée est un exemple courant de réflexion diffuse d'une surface domestique", "Un pare-brise poussiéreux produit une réflexion spéculaire de la route devant, tout comme un miroir poli"] },
    { q: "Pourquoi un lac calme reflète-t-il les montagnes comme un miroir tandis qu'un lac agité par le vent ne montre qu'un miroitement flou?", k: "La surface calme réfléchit de façon spéculaire, dans une direction, formant une image; la surface ondulée réfléchit de façon diffuse, dispersant les rayons dans plusieurs directions", w: ["Le lac agité par le vent absorbe toute la lumière qui formerait autrement l'image des montagnes sur sa surface, donc rien ne revient à l'œil de l'observateur sur la rive", "Le lac calme réfracte la lumière des montagnes et la courbe en une image qui se forme sur sa surface, tandis que le lac agité perd cette réfraction quand les vagues se forment", "Le vent change la surface plate de l'eau en un miroir convexe courbé à mesure que les ondulations se forment, et les miroirs convexes ne peuvent jamais former d'images reconnaissables"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La réflexion spéculaire se produit sur les surfaces lisses : les rayons parallèles se réfléchissent dans une direction et une image ou un éblouissement peut se former. La réflexion diffuse se produit sur les surfaces rugueuses : les rayons se dispersent dans plusieurs directions et aucune image ne se forme. Peinture mate contre peinture lustrée, voitures cirées, céramique émaillée et pare-brise poussiéreux sont les cas quotidiens du guide.",
    {});
}, ["Lisse et une direction veut dire spéculaire; rugueux et dispersé veut dire diffuse.", "Une image ou un éblouissement ne peut venir que de la sorte spéculaire."]);

E("s8f-u3-mirror-types", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "Quel ensemble d'exemples correspond aux trois types de miroirs du guide?", k: "Plan : un miroir de salle de bain. Concave : l'intérieur d'une cuillère en métal. Convexe : le miroir de sécurité à l'avant d'un autobus scolaire", w: ["Plan : l'intérieur d'une cuillère. Concave : un miroir de salle de bain. Convexe : le miroir de sécurité d'un magasin", "Plan : un miroir de sécurité d'autobus scolaire. Concave : un miroir de salle de bain. Convexe : l'intérieur d'une cuillère", "Plan : un miroir de salle de bain. Concave : un miroir de sécurité d'autobus. Convexe : l'intérieur d'une cuillère"] },
    { q: "L'extérieur d'une cuillère en métal polie bombe vers l'objet qu'elle reflète. Comme quel type de miroir agit-elle?", k: "Un miroir convexe", w: ["Un miroir concave", "Un miroir plan", "Un miroir diffus"] },
    { q: "Un magasin installe un grand miroir arrondi haut dans un coin pour que le personnel voie le long de chaque allée. De quel type de miroir s'agit-il, et pourquoi est-il choisi?", k: "Convexe : sa surface bombée donne un large champ de vision", w: ["Concave : sa surface creuse grossit les clients dans les allées", "Plan : sa surface plate montre les allées à leur vraie taille", "Convexe : il inverse l'image pour que les voleurs soient plus faciles à repérer"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les trois types de miroirs : plan (plat, comme un miroir de salle de bain), concave (courbé vers l'intérieur, comme l'intérieur d'une cuillère) et convexe (courbé vers l'extérieur, comme un miroir de sécurité d'autobus scolaire ou de magasin). On choisit les miroirs convexes là où un large champ de vision compte.",
    {});
}, ["Plat, creusé, bombé : plan, concave, convexe.", "La cuillère donne les deux types courbés : l'intérieur concave, l'extérieur convexe."]);

E("s8f-u3-plane-spot", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    var q = mcq("Le diagramme montre une flèche objet devant un miroir plan et son image. Quelles sont les caractéristiques correctes de l'image (taille, position, orientation, type) pour un miroir plan?",
      "La même taille que l'objet, à la même distance derrière le miroir que l'objet est devant, droite, et virtuelle",
      ["Plus grande que l'objet lui-même, plus loin derrière le miroir que l'objet est devant, droite, et réelle",
       "La même taille que l'objet, à la même distance derrière le miroir que l'objet devant, inversée, et réelle",
       "Plus petite que l'objet lui-même, plus proche du miroir que l'objet est devant, droite, et virtuelle"],
      "Les images des miroirs plans sont le cas de référence du chapitre : la taille est la même, la position est aussi loin derrière le miroir que l'objet est devant, l'orientation est droite, et le type est virtuel (les rayons semblent seulement se rencontrer derrière le miroir, ce qui explique pourquoi la flèche image est en pointillés). L'inversion latérale, le renversement gauche-droite, est la seule caractéristique supplémentaire.",
      {});
    q.figure = s8fPlaneMirrorSVG();
    return q;
  }
]), ["Taille, position, orientation, type. Les miroirs plans sont le cas « tout est égal ».", "Même, même, droite, virtuelle."]);

E("s8f-u3-lateral", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return mcq("Le mot AMBULANCE est imprimé à l'envers à l'avant du véhicule pour que les conducteurs devant puissent le lire dans leurs rétroviseurs. Quelle propriété des images des miroirs plans fait que cela fonctionne, et qu'est-ce que le miroir fait exactement au lettrage?",
      "L'inversion latérale : le miroir renverse l'image de gauche à droite, donc l'impression à l'envers se lit correctement dans le miroir",
      ["Le grossissement : le miroir agrandit le lettrage à l'avant du véhicule jusqu'à ce qu'il devienne lisible dans la circulation",
       "Le miroir fait pivoter tout le lettrage de 180 degrés dans le verre, le remettant à l'endroit pour le conducteur devant",
       "Le miroir renverse le lettrage de haut en bas à la place, et le cerveau du conducteur le corrige pendant qu'il conduit"],
      "L'image d'un miroir plan est inversée latéralement : la gauche et la droite sont échangées, tandis que le haut et le bas ne le sont pas. Imprimer le mot à l'envers sur le véhicule fait que l'échange gauche-droite du miroir le transforme en un texte ordinaire et lisible pour le conducteur devant. C'est le même effet qui rend illisible un texte tenu devant un miroir de salle de bain.",
      {});
  }
]), ["Le miroir échange une paire de directions. Laquelle?", "Gauche-droite, pas haut-bas : c'est l'inversion latérale."]);

E("s8f-u3-cr-reflection", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("Un périscope utilise deux miroirs plans pour permettre à un marin dans un sous-marin de voir au-dessus de la surface de l'eau. Explique comment le périscope fonctionne, en utilisant la loi de la réflexion et les propriétés des images des miroirs plans. (3 points)",
      ["la lumière de la scène frappe le miroir du haut et se réfléchit vers le bas du tube", "la loi de la réflexion gouverne chaque rebond, avec des angles égaux à chaque miroir", "le deuxième miroir réfléchit la lumière dans l'œil, et deux réflexions rétablissent l'orientation de l'image"],
      "<b>Réponse modèle:</b> La lumière de la scène au-dessus de la surface voyage horizontalement dans le haut du périscope et frappe le premier miroir plan, placé à 45 degrés. Selon la loi de la réflexion, l'angle d'incidence est égal à l'angle de réflexion à ce miroir, donc la lumière tourne exactement de 90 degrés et voyage tout droit vers le bas du tube. En bas, elle frappe le deuxième miroir plan, aussi à 45 degrés, et la loi s'applique encore : la lumière tourne d'un autre 90 degrés et voyage horizontalement dans l'œil du marin. Parce que la lumière s'est réfléchie deux fois, le renversement gauche-droite d'une image de miroir unique est annulé, et le marin voit la scène droite et orientée correctement, comme une image de miroir plan de la même taille que la scène elle-même.<br><br><b>Points d'attribution:</b> 1 point pour la loi de la réflexion appliquée au premier miroir pour tourner la lumière vers le bas du tube. 1 point pour la loi appliquée encore au deuxième miroir vers l'œil. 1 point pour le résultat de l'image (deux réflexions annulent l'inversion latérale; la vue est droite et de taille fidèle).",
      {});
  }
]), ["Deux miroirs, deux applications de la même loi, et un casse-tête d'orientation à expliquer.", "Chaque miroir à 45 degrés tourne la lumière exactement de 90 degrés."]);

E("s8f-u3-cr-diffuse", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return textq("Une élève objecte : « Si la loi de la réflexion est vraie, une feuille de papier devrait agir comme un miroir, puisque la lumière s'y réfléchit aussi. Mais je ne peux pas voir mon visage dans du papier. » Réponds à l'objection : explique pourquoi le papier ne donne aucune image même si chaque rayon qui le frappe obéit à la loi de la réflexion. (3 points)",
      ["la loi vaut pour chaque rayon individuel à son propre point sur la surface", "la surface du papier est rugueuse, donc les normales pointent dans plusieurs directions et les rayons se dispersent", "la surface lisse d'un miroir garde les rayons réfléchis en ordre, donc une image se forme"],
      "<b>Réponse modèle:</b> La loi de la réflexion n'est jamais enfreinte; elle s'applique rayon par rayon. Sur un miroir, la surface est lisse, donc la normale pointe dans la même direction à chaque point, et les rayons d'un point de ton visage se réfléchissent selon un patron ordonné qui préserve l'image. La surface du papier est rugueuse à l'échelle microscopique : ses minuscules facettes font face dans plusieurs directions, donc la normale à chaque point pointe d'une façon différente. Chaque rayon se réfléchit quand même avec son angle de réflexion égal à son angle d'incidence à sa propre facette, mais les rayons réfléchis se dispersent dans toutes les directions (la réflexion diffuse), et l'ordre qui fait une image est détruit. Voilà pourquoi le papier montre de la lumière, mais aucun visage.<br><br><b>Points d'attribution:</b> 1 point pour la loi qui s'applique à chaque rayon à son propre point de contact. 1 point pour la surface rugueuse donnant plusieurs directions de normales et des rayons réfléchis dispersés. 1 point pour le contraste avec une surface lisse qui préserve l'ordre des rayons pour qu'une image se forme.",
      {});
  }
]), ["La loi concerne chaque rayon et sa propre normale. Ce qui diffère entre le papier et le miroir, c'est la surface, pas la loi.", "Plusieurs normales, rayons dispersés, aucune image : c'est la réflexion diffuse."]);

/* ---------- SC8.7.4 La réfraction, qualitativement (avec la règle de courbure de SC8.9.13) ---------- */

E("s8f-u3-refraction-def", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    return mcq("Quel ensemble de termes de la réfraction est défini correctement?",
      "Le rayon incident est le rayon qui arrive, le rayon réfracté est le rayon après qu'il se courbe à la frontière, et les angles d'incidence et de réfraction se mesurent à partir de la normale",
      ["Le rayon incident est le rayon après qu'il s'est courbé à la frontière, et l'angle de réfraction se mesure à partir de la surface elle-même plutôt qu'à partir de la normale au point de contact",
       "Le rayon réfracté est le rayon qui rebondit de la frontière, et la normale est simplement la surface du milieu elle-même, la ligne le long de laquelle les angles se lisent dans les diagrammes",
       "L'angle d'incidence se mesure à partir de la surface elle-même plutôt qu'à partir de la normale, et le rayon réfracté ne change jamais sa direction quand il traverse la frontière entre les milieux"],
      "La réfraction est la courbure de la lumière quand elle traverse une frontière entre des milieux. Le rayon incident arrive, le rayon réfracté repart dans le nouveau milieu, et les deux angles, d'incidence et de réfraction, se mesurent à partir de la normale au point de la frontière, exactement comme en réflexion.",
      {});
  }
]), ["Même convention d'angles qu'en réflexion : tout à partir de la normale.", "Incident qui entre, réfracté qui traverse, normale comme référence."]);

E("s8f-u3-bent-stick", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return mcq("Un bâtonnet de friandise glacée debout dans un bécher d'eau semble plié à la surface, bien qu'il soit droit. Quelle explication est correcte?",
      "La lumière de la partie sous l'eau du bâtonnet se courbe (se réfracte) en quittant l'eau pour l'air, et notre cerveau, qui suppose que la lumière a voyagé tout droit, place cette partie du bâtonnet au mauvais endroit",
      ["L'eau dans le bécher plie physiquement le bâtonnet tant qu'il se tient dans l'eau, le pressant hors de sa forme, et le bâtonnet se redresse de lui-même une fois retiré de l'eau et séché sur la table du laboratoire",
       "Le bâtonnet réfléchit la lumière qui l'atteint à la surface de l'eau dans le bécher, et cette réflexion double son image dans l'eau, ce qui fait que le bâtonnet droit semble plié quand on le regarde d'en haut",
       "L'eau dans le bécher disperse la lumière venant de la partie sous l'eau du bâtonnet, et les couleurs séparées produites déplacent la forme apparente du bâtonnet là où il rencontre la surface de l'eau"],
      "Le bâtonnet plié est l'introduction du guide à la réfraction. La lumière de la partie submergée change de direction à la frontière eau-air; le cerveau retrace les rayons en lignes droites, donc la partie sous l'eau semble déplacée de là où elle est, et le bâtonnet a l'air cassé à la surface.",
      {});
  }
]), ["Le bâtonnet va bien. Qu'arrive-t-il à sa lumière à la surface?", "La réfraction à la frontière plus un cerveau qui suppose le voyage en ligne droite."]);

E("s8f-u3-lenses", 3, ["SC8.7.4"], 1, "gen", function () {
  var cases = [
    { q: "Quelle description d'une lentille convergente est correcte?", k: "Elle est plus épaisse au centre qu'aux bords, et elle fait converger les rayons de lumière parallèles (les rassemble)", w: ["Elle est plus mince au centre qu'aux bords, et elle fait converger les rayons de lumière parallèles (les rassemble)", "Elle est plus épaisse au centre qu'aux bords, et elle fait diverger les rayons de lumière parallèles (les écarte)", "Elle a un côté plat et un côté courbé, et elle réfléchit les rayons de lumière au lieu de les réfracter en passant"] },
    { q: "Une lentille étale un faisceau parallèle de lumière pour que les rayons divergent, comme s'ils venaient d'un point derrière la lentille. Quelle lentille est-ce, et quelle est sa forme?", k: "Une lentille divergente : plus mince au centre et plus épaisse aux bords", w: ["Une lentille convergente : plus épaisse au centre et plus mince aux bords", "Une lentille divergente : plus épaisse au centre et plus mince aux bords", "Une lentille convergente : plus mince au centre et plus épaisse aux bords"] },
    { q: "Quelle affirmation sur les lentilles et la lumière est correcte?", k: "Les lentilles fonctionnent par réfraction : la lumière se courbe à chaque surface de la lentille, ce qui rassemble les rayons ou les écarte", w: ["Les lentilles fonctionnent par réflexion : la lumière qui forme l'image rebondit sur les surfaces courbées de la lentille", "Les lentilles fonctionnent par dispersion : elles séparent la lumière qui les traverse en couleurs, et ces couleurs forment l'image", "Les lentilles fonctionnent en absorbant tous les rayons de lumière qui rendraient autrement floue l'image qu'elles forment"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "Une lentille est un morceau courbé de matériau transparent qui réfracte la lumière. Une lentille convergente est plus épaisse au centre et fait converger les rayons; une lentille divergente est plus mince au centre et fait diverger les rayons. Le diagramme montre le cas convergent : les rayons parallèles rassemblés à travers le foyer.",
    {});
  if (c.q.indexOf("lentille convergente est correcte") >= 0) q.figure = s8fLensSVG("convex");
  return q;
}, ["Centre épais converge; centre mince diverge.", "Les lentilles courbent la lumière (réfraction), elles ne la font pas rebondir."]);

E("s8f-u3-vision", 3, ["SC8.7.4"], 2, "gen", function () {
  var cases = [
    { q: "Une élève est myope : le cristallin de son œil réfracte trop la lumière, donc les images des objets éloignés se forment devant sa rétine. Quelle lentille corrige sa vision, et comment?", k: "Une lentille divergente, qui écarte légèrement la lumière avant qu'elle entre dans l'œil, pour que le cristallin l'amène à un foyer sur la rétine", w: ["Une lentille convergente, qui rassemble la lumière encore plus fortement pour qu'elle se concentre plus tôt dans l'œil, devant la rétine", "Une lentille divergente, qui rassemble la lumière entrant dans l'œil pour qu'elle se concentre plus tôt, sur la rétine de l'œil", "Une lentille convergente, qui écarte légèrement la lumière avant qu'elle entre dans l'œil et atteigne le cristallin de l'œil"] },
    { q: "Un élève est hypermétrope : le cristallin de son œil ne réfracte pas assez la lumière, donc les images se formeraient derrière sa rétine. Quelle lentille corrige sa vision?", k: "Une lentille convergente, qui commence à rassembler la lumière avant qu'elle entre dans l'œil, compensant le manque du cristallin", w: ["Une lentille divergente, qui écarte la lumière entrant dans l'œil pour que le cristallin faible puisse rattraper le retard", "Une lentille convergente, qui écarte légèrement la lumière avant qu'elle entre dans l'œil et atteigne la rétine au fond", "Une lentille divergente, qui ajoute la convergence que le cristallin de l'œil n'arrive pas à fournir par lui-même"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La correction de la vision ajoute la lentille qui manque à l'œil. La myopie est un excès de réfraction (image devant la rétine), corrigée par une lentille divergente. L'hypermétropie est un manque (l'image tomberait derrière la rétine), corrigée par une lentille convergente. Le moyen de vérification du guide : les lentilles divergentes font paraître les yeux plus petits derrière les lunettes, les convergentes les font paraître plus grands.",
    {});
}, ["Trop de courbure demande un écarteur; trop peu demande un rassembleur.", "Myope : divergente. Hypermétrope : convergente."]);

E("s8f-u3-cr-refraction", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return textq("Un poisson sous l'eau semble être plus haut (plus près de la surface) qu'il ne l'est vraiment, ce qui explique pourquoi un héron doit viser sous le poisson qu'il voit. Explique la position apparente du poisson en utilisant la réfraction, et énonce la direction dans laquelle la lumière se courbe à la surface. (3 points)",
      ["la lumière du poisson se réfracte en quittant l'eau pour l'air", "en quittant le milieu plus dense, elle s'écarte de la normale", "le cerveau retrace les rayons tout droit, plaçant le poisson moins profond qu'il ne l'est"],
      "<b>Réponse modèle:</b> La lumière réfléchie par le poisson voyage vers le haut à travers l'eau et traverse dans l'air. L'eau est le milieu plus dense, donc quand la lumière la quitte pour l'air moins dense, elle accélère et s'écarte de la normale à la surface. Le cerveau du héron (comme le nôtre) suppose que la lumière a voyagé en ligne droite, donc il retrace les rayons courbés le long de trajets droits, et ces trajets se rencontrent en un point au-dessus de la vraie position du poisson. Le poisson semble donc moins profond qu'il ne l'est, et une attaque visant le poisson vu passe au-dessus du vrai.<br><br><b>Points d'attribution:</b> 1 point pour la réfraction à la frontière eau-air. 1 point pour la direction de la courbure (s'écarter de la normale en quittant le milieu plus dense). 1 point pour la supposition de la ligne droite plaçant le poisson apparent au-dessus du vrai poisson.",
      {});
  }
]), ["Retrace un rayon du poisson à l'œil, et marque où il se courbe et dans quel sens.", "S'écarter de la normale en quittant l'eau; les lignes droites du cerveau font le reste."]);

E("s8f-u3-bend-rule", 3, ["SC8.7.4"], 1, "gen", function () {
  var cases = [
    { q: "Un rayon de lumière voyage de l'air dans l'eau à un angle. Dans quel sens se courbe-t-il?", k: "Vers la normale, parce que l'eau est plus dense que l'air et que la lumière ralentit", w: ["Loin de la normale à la surface, parce que l'eau est un milieu plus dense que l'air au-dessus", "Vers la normale à la surface, parce que la lumière accélère en entrant dans l'eau depuis l'air", "Il ne se courbe pas du tout à la surface, parce que la courbure de la lumière se produit seulement dans les blocs de verre"] },
    { q: "Un rayon de lumière voyage du verre dans l'air à un angle. Dans quel sens se courbe-t-il?", k: "Loin de la normale, parce que l'air est moins dense que le verre et que la lumière accélère", w: ["Vers la normale à la surface, parce que l'air est un milieu moins dense que le verre qu'il a quitté", "Loin de la normale à la surface, parce que la lumière ralentit en quittant le verre pour l'air", "Tout droit le long de la normale elle-même, parce qu'un bloc de verre redresse toujours tout rayon qui le traverse"] },
    { q: "Quelle affirmation énonce correctement la règle de courbure?", k: "Dans un milieu de plus grande densité, la lumière se courbe vers la normale; dans un milieu de moindre densité, elle s'en écarte", w: ["Dans un milieu de plus grande densité, la lumière s'écarte de la normale; dans une moindre densité, elle s'en approche", "La lumière se courbe toujours vers la normale à une frontière, quels que soient les deux milieux de chaque côté", "La lumière s'écarte toujours de la normale à une frontière, quels que soient les deux milieux de chaque côté"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La règle : un rayon qui entre dans un milieu de plus grande densité ralentit et se courbe vers la normale; un rayon qui entre dans un milieu de moindre densité accélère et s'écarte de la normale. La direction de la densité et la direction de la courbure sont liées ensemble.",
    {});
}, ["Plus dense devant veut dire vers; moins dense devant veut dire loin.", "Dis d'abord le changement de densité, la courbure suit."]);

E("s8f-u3-bend-figure", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    var q = mcq("Le diagramme montre un rayon qui traverse de l'air dans l'eau, avec la ligne pointillée montrant le trajet qu'il prendrait s'il ne se courbait pas. Quelle description du rayon réfracté plein est correcte?",
      "Il se courbe vers la normale, finissant plus près de la normale que le trajet pointillé",
      ["Il s'écarte de la normale, finissant plus loin de la normale que le trajet pointillé",
       "Il suit exactement le trajet pointillé, parce que l'eau ne courbe pas la lumière",
       "Il se réfléchit dans l'air le long du trajet pointillé qu'il suivait en arrivant"],
      "L'eau est plus dense que l'air, donc le rayon ralentit et se courbe vers la normale : le rayon plein se trouve entre la normale et le trajet pointillé sans courbure. Le diagramme est la règle dessinée, et la règle est le diagramme expliqué.",
      {});
    q.figure = s8fRefractSVG("toward", true);
    return q;
  },
  function () {
    var q = mcq("Le diagramme montre un rayon qui traverse de l'eau dans l'air, avec la ligne pointillée montrant le trajet qu'il prendrait s'il ne se courbait pas. Quelle description du rayon réfracté plein est correcte?",
      "Il s'écarte de la normale, finissant plus loin de la normale que le trajet pointillé",
      ["Il se courbe vers la normale, finissant plus près de la normale que le trajet pointillé",
       "Il suit exactement le trajet pointillé, parce que l'air ne courbe pas la lumière",
       "Il s'arrête à la surface et voyage le long d'elle sans entrer dans l'air"],
      "En quittant l'eau plus dense pour l'air moins dense, le rayon accélère et s'écarte de la normale : le rayon plein se trouve plus loin de la normale que le trajet pointillé sans courbure. Les deux diagrammes de cette famille sont les images miroirs d'une seule règle.",
      {});
    q.figure = s8fRefractSVG("away", true);
    return q;
  }
]), ["Compare le rayon plein au rayon pointillé : de quel côté du trajet pointillé se trouve-t-il?", "Vers veut dire entre le trajet pointillé et la normale."]);

/* ---------- SC8.8.1 Idées et théories sur la lumière dans le passé ---------- */

E("s8f-u3-history", 3, ["SC8.8.1"], 1, "gen", function () {
  var cases = [
    { q: "Quelle idée historique sur la lumière est jumelée correctement à son penseur?", k: "Pythagore croyait que la lumière consistait en faisceaux de particules", w: ["Galilée a mesuré la vitesse de la lumière exactement à l'aide de deux télescopes", "Michelson croyait que la lumière était faite d'ondes sur l'eau", "Pythagore croyait que la lumière voyageait comme des ondes dans l'air"] },
    { q: "Quelle a été la contribution de Galilée à l'étude de la vitesse de la lumière?", k: "Il a tenté une expérience pour déterminer si la vitesse de la lumière pouvait se mesurer, à l'aide de lanternes sur une distance", w: ["Il a calculé la vitesse de la lumière exactement, arrivant à la valeur moderne de 3 × 10^8 m/s avec des lanternes", "Il a prouvé que la lumière voyage instantanément d'un endroit à un autre et n'a donc aucune vitesse du tout", "Il a inventé le télescope lui-même dans le but de mesurer la vitesse de la lumière sur une distance"] },
    { q: "Que devraient savoir les élèves de l'expérience de Michelson?", k: "Elle a été menée pour calculer la vitesse de la lumière, et elle a réussi à la mesurer; les détails ne sont pas exigés", w: ["Elle a prouvé une fois pour toutes que la lumière n'a aucune vitesse mesurable qu'une expérience pourrait détecter", "Elle a montré que la lumière voyage dans l'air exactement à la même vitesse que le son voyage dans l'air", "C'était une tentative de mesurer la vitesse de la lumière qui a échoué complètement et n'a rien mesuré du tout"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les trois ancres historiques du guide : Pythagore soutenait que la lumière consistait en faisceaux de particules; Galilée a essayé de déterminer la vitesse de la lumière par une expérience (sa méthode ne pouvait pas résoudre une vitesse si grande); et l'expérience de Michelson a été menée dans le but de calculer la vitesse de la lumière, ce qu'elle a fait. Les élèves ont besoin du but et du résultat, pas des détails de l'appareil.",
    {});
}, ["Les particules appartiennent à Pythagore; les tentatives sur la vitesse appartiennent à Galilée et à Michelson.", "Michelson l'a mesurée; Galilée a essayé."]);

E("s8f-u3-speed-light", 3, ["SC8.8.1"], 1, "var", varset([
  function () {
    return mcq("Quelle affirmation sur les vitesses de la lumière et du son est correcte?",
      "La lumière voyage à 300 000 000 m/s (3 × 10^8 m/s), énormément plus vite que le son à environ 330 m/s, ce qui explique pourquoi nous voyons l'éclair avant d'entendre son tonnerre",
      ["La lumière et le son voyagent tous les deux dans l'air à la même vitesse, environ 330 m/s, donc l'éclair et le tonnerre d'un orage arrivent ensemble au même moment pour l'observateur",
       "Le son voyage plus vite que la lumière dans l'air, ce qui explique pourquoi le tonnerre d'un orage s'entend toujours avant que son éclair de foudre se voie dans le ciel de l'orage",
       "La lumière voyage à 300 000 m/s dans l'air, ce qui est seulement un peu plus vite que la vitesse du son voyageant le long du même trajet entre l'orage et l'observateur qui l'écoute"],
      "La vitesse de la lumière est 3 × 10^8 m/s, environ 300 000 km/s. Le son réussit à peu près 330 m/s. Dans un orage, la lumière de l'éclair nous atteint presque instantanément pendant que le tonnerre traîne derrière : la règle pratique du guide est que chaque 3 secondes de délai signifie que la frappe était à environ 1 km.",
      {});
  }
]), ["La vitesse de la lumière a une valeur exacte à connaître : 3 × 10^8 m/s.", "Trois secondes de délai de tonnerre valent environ un kilomètre."]);

E("s8f-u3-cr-speed", 3, ["SC8.8.1"], 2, "var", varset([
  function () {
    return textq("Une élève regarde une étoile lointaine et lit que sa lumière l'a quittée il y a 40 ans. Elle demande : « Si l'étoile a explosé l'an passé, pourquoi est-ce que je la vois encore briller? » Réponds-lui en utilisant la vitesse de la lumière, et relie ta réponse à la raison pour laquelle les astronomes disent que les télescopes regardent dans le passé. (3 points)",
      ["la lumière voyage à une vitesse finie, 3 × 10^8 m/s, donc la lumière lointaine est vieille quand elle arrive", "la lumière de l'explosion de l'an passé n'a pas encore atteint la Terre", "nous voyons toujours les objets lointains tels qu'ils étaient quand leur lumière les a quittés"],
      "<b>Réponse modèle:</b> La lumière est rapide mais pas instantanée : elle voyage à 3 × 10^8 m/s, et l'étoile est si loin que sa lumière prend 40 ans à traverser la distance. La lumière qui arrive ce soir a quitté l'étoile il y a 40 ans, donc l'élève voit l'étoile telle qu'elle était alors, encore brillante. L'explosion s'est produite il y a seulement un an selon notre calendrier, et sa lumière a encore 39 ans de voyage avant d'atteindre la Terre; d'ici là, la vieille lumière continue d'arriver et l'étoile semble inchangée. C'est le sens dans lequel les télescopes regardent dans le passé : chaque objet lointain se voit tel qu'il était quand sa lumière est partie.<br><br><b>Points d'attribution:</b> 1 point pour la vitesse finie de la lumière appliquée à la distance. 1 point pour la lumière qui arrive vieille de 40 ans, donc l'étoile vue telle qu'elle était. 1 point pour la lumière de l'explosion pas encore arrivée, généralisant à voir le passé.",
      {});
  }
]), ["La vitesse de la lumière est énorme mais finie. Quarante ans de voyage veulent dire des nouvelles vieilles de quarante ans.", "Nous ne voyons jamais les choses lointaines « maintenant »; nous voyons l'heure de départ de leur lumière."]);

/* ---------- SC8.8.2 Premières technologies issues de la connaissance de la lumière ---------- */

E("s8f-u3-early-tech", 3, ["SC8.8.2"], 1, "var", varset([
  function () {
    return mcq("Comment la connaissance scientifique de la lumière a-t-elle mené aux premiers microscopes et télescopes?",
      "Comprendre comment les lentilles réfractent la lumière a permis aux fabricants de combiner des lentilles pour que les objets lointains et minuscules puissent être grossis et étudiés",
      ["Comprendre comment la réflexion fonctionne a permis aux fabricants de polir des miroirs courbés jusqu'à ce que les objets vus dedans aient l'air plus grands qu'ils ne l'étaient",
       "Les appareils eux-mêmes sont venus en premier, construits par essais seulement, et aucune connaissance du comportement de la lumière n'a été impliquée dans leur fabrication",
       "Comprendre comment la dispersion sépare la lumière en couleurs a permis aux fabricants de construire les appareils pour voir les objets lointains dans le ciel et sur la Terre"],
      "Le microscope et le télescope sont les exemples du guide de la connaissance qui devient technologie : une fois que les fabricants de lentilles ont compris que le verre façonné réfracte la lumière de façons prévisibles, ils ont pu arranger des lentilles pour grossir ce que l'œil ne peut pas résoudre, de près et de loin. Le chapitre revient à leur développement sous les essais et erreurs.",
      {});
  }
]), ["Lentilles plus connaissance de la réfraction égalent grossissement.", "La science est venue en premier; les instruments ont été construits dessus."]);

E("s8f-u3-telescope-types", 3, ["SC8.8.2"], 2, "var", varset([
  function () {
    return mcq("Un télescope à réflexion et un télescope à réfraction recueillent la lumière des objets lointains de façons différentes. Quelle description est correcte?",
      "Un télescope à réflexion utilise un grand miroir concave pour recueillir et concentrer la lumière; un télescope à réfraction utilise des lentilles",
      ["Un télescope à réflexion recueille la lumière avec des lentilles; un télescope à réfraction recueille la lumière avec un grand miroir concave",
       "Les deux sortes de télescopes utilisent de grands miroirs concaves pour recueillir la lumière; ils diffèrent seulement par la taille du miroir",
       "Un télescope à réflexion utilise un miroir convexe pour recueillir sa lumière, ce qui explique pourquoi les images qu'il forme sont plus petites"],
      "Les noms le disent : les télescopes à réflexion réfléchissent, utilisant un miroir principal concave (le miroir du télescope Keck fait 10 m de diamètre) pour rassembler la lumière; les télescopes à réfraction réfractent, utilisant des lentilles. Les jumelles sont deux petits télescopes à réfraction montés côte à côte.",
      {});
  }
]), ["Réflexion veut dire miroirs, réfraction veut dire lentilles.", "Le grand collecteur en forme de bol est un miroir concave."]);

/* ---------- SC8.8.3 Utiliser correctement la fréquence et la longueur d'onde ---------- */

E("s8f-u3-freq-wave", 3, ["SC8.8.3"], 1, "var", varset([
  function () {
    return mcq("Quelles définitions de la fréquence et de la longueur d'onde sont correctes?",
      "La longueur d'onde est la distance entre deux crêtes voisines (ou deux creux); la fréquence est le nombre d'ondes qui passent en un point dans un temps donné, comme une seconde",
      ["La longueur d'onde est le nombre d'ondes complètes qui passent en un point en une seconde; la fréquence est la distance entre les crêtes voisines le long de l'onde qui voyage",
       "La longueur d'onde est la hauteur de la crête d'une onde au-dessus de la position de repos; la fréquence est la vitesse à laquelle l'onde voyage à travers son milieu porteur",
       "La fréquence et la longueur d'onde sont simplement deux noms différents utilisés pour une seule et même mesure d'une onde, donc les deux mots peuvent s'échanger librement"],
      "Le guide insiste sur les mots parce qu'ils sont faciles à échanger. La longueur d'onde mesure une longueur : de crête à crête. La fréquence mesure un taux : combien d'ondes passent en un point par seconde. L'analogie de l'onde dans un stade aide : l'espacement des sections debout ressemble à la longueur d'onde; la fréquence à laquelle elles se lèvent par minute ressemble à la fréquence.",
      {});
  }
]), ["L'une est une distance, l'autre est un taux. Laquelle est laquelle?", "Longueur d'onde : de crête à crête. Fréquence : ondes par seconde."]);

E("s8f-u3-freq-relation", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return mcq("Une station de radio émet à 94,7 MHz et une autre à 95,9 MHz. Un élève dit que les ondes de la deuxième station doivent avoir la plus grande longueur d'onde « parce que son nombre est plus grand ». Corrige l'élève en utilisant la relation entre la fréquence et la longueur d'onde.",
      "L'élève a la relation à l'envers : une fréquence plus haute signifie une longueur d'onde plus courte, donc les ondes de 95,9 MHz sont les plus courtes des deux stations",
      ["L'élève a raison au sujet de la relation : la fréquence et la longueur d'onde grandissent ensemble, en parallèle, donc un plus grand nombre donne une plus grande longueur d'onde",
       "Aucune des deux stations n'a de longueur d'onde du tout, parce que les ondes radio ne sont pas une forme de lumière et ne partagent aucune de ses propriétés mesurables en classe",
       "Les longueurs d'onde des deux stations sont identiques, parce que chaque onde radio partage une seule et même longueur d'onde fixe, quel que soit le nombre de sa station"],
      "La fréquence et la longueur d'onde sont liées inversement pour les ondes qui voyagent à la même vitesse : les ondes de haute fréquence ont de courtes longueurs d'onde, et les ondes de basse fréquence ont de grandes longueurs d'onde. Les stations de radio s'identifient par leur fréquence (l'exemple du guide est une station à 94,7 MHz), donc le plus grand nombre de fréquence signifie la plus courte longueur d'onde.",
      {});
  }
]), ["La relation est inverse : l'une monte, l'autre descend.", "Plus grand nombre de fréquence, ondes plus courtes."]);

E("s8f-u3-cr-words", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return textq("Un camarade écrit : « La lumière rouge a une haute fréquence parce que sa longueur d'onde est la plus longue des couleurs visibles, et le violet a une basse fréquence parce qu'il se courbe le plus dans un prisme. » Le camarade a entremêlé les termes. Démêle l'affirmation : corrige chaque erreur et donne les vraies relations pour la lumière rouge et la lumière violette. (3 points)",
      ["le rouge a la plus grande longueur d'onde et donc la fréquence la plus basse", "le violet a la plus courte longueur d'onde et la fréquence la plus haute", "la courbure dans un prisme suit la longueur d'onde : le violet se courbe le plus, le rouge le moins"],
      "<b>Réponse modèle:</b> Deux erreurs sont entremêlées. D'abord, la fréquence et la longueur d'onde bougent en directions opposées : une grande longueur d'onde signifie une basse fréquence, jamais une haute. La lumière rouge a la plus grande longueur d'onde des couleurs visibles, donc elle a la fréquence la plus basse, pas la plus haute. Ensuite, la forte courbure du violet dans un prisme va avec sa courte longueur d'onde : le violet a la plus courte longueur d'onde, la fréquence la plus haute et la plus grande réfraction, tandis que le rouge, avec la plus grande longueur d'onde, se réfracte le moins. Corrigée, l'affirmation se lit : rouge, plus grande longueur d'onde, fréquence la plus basse, moindre réfraction; violet, plus courte longueur d'onde, fréquence la plus haute, plus grande réfraction.<br><br><b>Points d'attribution:</b> 1 point pour la relation inverse fréquence-longueur d'onde énoncée. 1 point pour le rouge corrigé (plus grande longueur d'onde, fréquence la plus basse, moindre réfraction). 1 point pour le violet corrigé (plus courte longueur d'onde, fréquence la plus haute, plus grande réfraction).",
      {});
  }
]), ["Une relation répare les deux erreurs : la fréquence et la longueur d'onde bougent en sens opposés.", "Le rouge et le violet sont les deux extrémités de chaque ordre dans ce chapitre."]);

/* ---------- SC8.8.4 Effets des technologies électromagnétiques ---------- */

E("s8f-u3-effects", 3, ["SC8.8.4"], 3, "gen", function () {
  var cases = [
    { q: "Quelle analyse des effets d'une technologie est la mieux appuyée?", k: "Les appareils à rayons X donnent aux médecins un moyen de détecter les blessures sans chirurgie (positif), mais chaque exposition ajoute une dose de rayonnement de plus haute énergie, donc les expositions sont limitées et protégées (négatif)", w: ["Les appareils à rayons X ont seulement des effets positifs sur les patients examinés avec eux dans les hôpitaux, parce que ce sont des appareils médicaux utilisés par des médecins", "Les fours à micro-ondes sont dangereux pour leurs utilisateurs de la même façon que les sources de rayons gamma sont dangereuses, parce que chaque sorte de rayonnement est également nuisible au corps humain à toute exposition", "Les téléphones cellulaires n'ont aucun effet du tout sur les gens qui les utilisent chaque jour qui vaille la peine d'être discuté dans ce chapitre, ni d'effets positifs ni d'effets négatifs d'aucune sorte"] },
    { q: "On écrit une brochure de sécurité au sujet du rayonnement ultraviolet. Quelle affirmation y appartient?", k: "L'ultraviolet est un rayonnement de plus haute énergie qui peut endommager la peau et les yeux en cas de surexposition, donc une protection comme l'écran solaire et les lunettes de soleil est conseillée, même si une exposition modérée a des usages comme le bronzage", w: ["L'ultraviolet est la forme de rayonnement de plus basse énergie trouvée dans la lumière du soleil à la plage, donc il n'exige aucune précaution d'aucune sorte de la part des gens qui y sont exposés pendant leurs journées", "L'exposition au rayonnement ultraviolet est bénéfique pour la peau et les yeux en quantités illimitées, à tout moment de la journée, donc aucune limite au temps passé au soleil n'est jamais nécessaire pour qui que ce soit", "Les lunettes de soleil se portent à la plage en été pour protéger les yeux du rayonnement gamma qui est présent dans la lumière du soleil atteignant le sable de la plage où les gens s'assoient et jouent"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les technologies construites sur le rayonnement électromagnétique portent les deux signes d'effet, et la règle du guide les organise : en général, le rayonnement de plus haute énergie est plus nuisible aux humains. Les rayons X et l'ultraviolet récompensent le soin et la protection; les ondes radio et les micro-ondes aux niveaux ordinaires sont beaucoup moins dangereux. Une analyse solide nomme un vrai bénéfice et un vrai coût pour la même technologie.",
    {});
}, ["Cherche la réponse qui tient un bénéfice et un coût pour la même technologie.", "Plus haute énergie veut dire plus de tort : cette règle trie les affirmations."]);

E("s8f-u3-harm-energy", 3, ["SC8.8.4"], 1, "var", varset([
  function () {
    return mcq("En général, quel rayonnement électromagnétique est le plus dangereux pour les humains, et lequel est le moins dangereux?",
      "Les rayons gamma (haute fréquence, courte longueur d'onde, haute énergie) sont en général les plus dangereux; les ondes radio (basse fréquence, grande longueur d'onde, basse énergie) sont les moins dangereuses",
      ["Les ondes radio sont le type de rayonnement le plus dangereux de tous; les rayons gamma, à l'autre extrémité du spectre, sont les moins dangereux de tous les types de rayonnement électromagnétique connus",
       "La lumière visible est le type de rayonnement le plus dangereux qui existe, parce que nous y sommes exposés constamment, toute la journée, partout où nous allons, sans aucun moyen de l'éviter",
       "Tous les types de rayonnement électromagnétique, des ondes radio aux rayons gamma, sont également dangereux pour les gens, à tout niveau d'exposition à eux, dans toutes les circonstances"],
      "La règle générale du guide : l'exposition au rayonnement de haute fréquence et de courte longueur d'onde, comme les rayons gamma, est en général plus dangereuse, et le rayonnement de basse fréquence et de grande longueur d'onde, comme les ondes radio, est en général moins dangereux. Les ondes de haute fréquence sont les ondes de haute énergie, et l'énergie est ce qui fait le dommage.",
      {});
  }
]), ["Le danger suit l'énergie, et l'énergie suit la fréquence vers le haut.", "Extrémité gamma : dangereuse. Extrémité radio : comparativement sûre."]);

E("s8f-u3-atmosphere", 3, ["SC8.8.4"], 3, "var", varset([
  function () {
    return mcq("Les astronautes à l'extérieur de l'atmosphère terrestre font face à un environnement de rayonnement plus dur que les gens à la surface, même à la même distance du Soleil. Quelle explication est correcte?",
      "L'atmosphère terrestre bloque ou absorbe une grande partie du rayonnement dangereux de plus haute énergie venant de l'espace, et cette protection manque à l'extérieur d'elle",
      ["L'espace contient plus de rayonnement simplement parce que les astronautes qui y voyagent sont plus proches des étoiles qui le produisent que les gens à la surface de la Terre",
       "L'atmosphère au-dessus de nous génère son propre rayonnement, qui annule le rayonnement du Soleil à la surface en dessous, laissant les gens sans aucune exposition nette",
       "Les combinaisons spatiales que portent les astronautes attirent le rayonnement vers eux, et cette attraction est tout le problème auquel les astronautes font face en orbite"],
      "Le guide lie l'habitabilité à la protection : l'atmosphère terrestre nous protège d'une partie du rayonnement électromagnétique plus dangereux présent dans l'espace, ce qui fait partie de ce qui rend la surface sûre pour les humains adaptés à ces conditions. Retire l'atmosphère, comme dans l'espace ou sur une autre planète, et l'exposition augmente brusquement.",
      {});
  }
]), ["Même Soleil, même distance. Qu'est-ce que la surface a que l'orbite n'a pas?", "L'atmosphère est un bouclier contre le rayonnement, pas seulement de l'air à respirer."]);

/* ---------- SC8.8.5 Développement par essais et erreurs (STSE de base : la fibre optique) ---------- */

E("s8f-u3-trial-error", 3, ["SC8.8.5"], 2, "var", varset([
  function () {
    return mcq("Le STSE de base sur la fibre optique retrace la communication par la lumière des signaux de boucliers polis et des héliographes, en passant par le photophone de Bell, jusqu'aux lasers, et enfin au câble à fibre optique. Quelle affirmation décrit le mieux le patron de développement que l'histoire montre?",
      "Chaque génération a résolu un problème que la précédente avait exposé, et le progrès attendait les matériaux : la fibre optique est devenue possible seulement quand on a pu étirer un verre très pur en brins minces comme des cheveux qui guident la lumière par réflexion",
      ["La fibre optique a été inventée en une seule étape par un seul inventeur, travaillant seul dans un atelier, qui a prévu tout le design du système fini dans chaque détail dès le départ de son travail sur le problème",
       "Le photophone a échoué à la fin simplement parce que les gens qui l'ont inventé et essayé de le vendre ne comprenaient pas du tout le comportement de la lumière, sous aucune de ses formes connues à l'époque",
       "Le développement a été essentiellement aléatoire du début à la fin : chaque nouvel appareil est apparu de lui-même, sans lien avec aucun des appareils venus avant lui dans l'histoire de la communication par la lumière"],
      "Le patron du STSE est l'essai et l'erreur systématiques sous des contraintes de matériaux. Les héliographes exigeaient le soleil et une ligne de vue; le photophone (1880) transportait la voix sur la lumière mais la météo et les interférences l'ont défait; les lasers donnaient un faisceau concentré mais le brouillard et les bâtiments le bloquaient encore; la réponse était de guider la lumière à l'intérieur d'un câble, ce qui exigeait un verre assez pur et fin pour servir de cœur. Deux entreprises, Corning et Siemens, ont combiné leurs travaux sur la fibre et le câblage pour le premier câble en 1977.",
      {});
  }
]), ["Chaque appareil répond à l'échec de l'appareil précédent. Qu'est-ce qui devait enfin exister avant que la fibre puisse fonctionner?", "Un verre pur, mince comme un cheveu, est la contrainte de matériau à la fin de l'histoire."]);

E("s8f-u3-materials-constraint", 3, ["SC8.8.5"], 1, "var", varset([
  function () {
    return mcq("Les lentilles de contact ne pouvaient devenir pratiques qu'une fois qu'un matériau existait qui était transparent, façonné pour réfracter la lumière correctement, et sûr et confortable contre l'œil pendant des heures. Quelle affirmation sur la technologie optique cet exemple illustre-t-il?",
      "Les technologies optiques se développent par essais et erreurs, contraintes par les propriétés optiques des matériaux disponibles",
      ["Les nouvelles technologies optiques apparaissent dans les ateliers dès que l'idée pour elles est écrite pour la première fois sur papier",
       "Le matériau dont un appareil optique est fait n'a aucun effet du tout sur la façon dont l'appareil doit être conçu et construit",
       "Les lentilles de contact fonctionnent en réfléchissant la lumière à leurs surfaces, donc le matériau dont elles sont faites ne réfracte jamais la lumière"],
      "Le cadre du guide pour cet indicateur : les avancées en technologie optique suivent le développement de matériaux adaptés à l'application. Les lentilles de toutes sortes sont otages des propriétés optiques de leur matériau; les lentilles de contact attendaient un matériau qui pouvait se porter sur l'œil lui-même.",
      {});
  }
]), ["L'idée était vieille. Qu'est-ce qui manquait jusqu'à l'arrivée du matériau?", "Pas de matériau convenable, pas de technologie : c'est la contrainte."]);

E("s8f-u3-cr-fibre", 3, ["SC8.8.5"], 3, "var", varset([
  function () {
    return textq("En utilisant l'histoire de la fibre optique, explique comment une technologie optique se développe par essais et erreurs systématiques. Ta réponse devrait retracer au moins deux étapes de la chaîne des premiers signaux par la lumière au câble à fibre optique, nommer le problème que chaque étape a exposé, et identifier la propriété du matériau qui a finalement rendu la fibre optique pratique. (4 points)",
      ["une chaîne de tentatives, chacune répondant à un problème que la dernière a exposé", "des problèmes comme la météo, les interférences et la ligne de vue pour les signaux lumineux à l'air libre", "un verre très pur étiré mince comme un cheveu, guidant la lumière par réflexion répétée à l'intérieur du cœur", "le développement comme systématique et collaboratif plutôt qu'un seul bond"],
      "<b>Réponse modèle:</b> La communication par la lumière a commencé avec la lumière du soleil réfléchie : des boucliers polis, puis l'héliographe de Mance, qui pouvait signaler à 50 km mais seulement au soleil et par air clair. Le photophone de Bell (1880) transportait une voix sur la lumière du soleil réfléchie par un miroir vibrant, une vraie avancée, mais les nuages et les interférences ne pouvaient pas être exclus, et Bell l'a abandonné. Le laser à la fin des années 1950 donnait un faisceau concentré qui pouvait transporter beaucoup plus d'information, pourtant le brouillard, la pluie et les bâtiments bloquaient encore les trajets à l'air libre. Chaque échec définissait le prochain problème précisément : la lumière avait besoin d'un trajet protégé. La solution utilisait deux propriétés connues de la lumière, qu'elle traverse le verre et se réfléchit sur le verre au bon angle, mais elle attendait un matériau : un verre assez pur, étiré en brins minces comme un cheveu, pour que la lumière se réfléchisse à répétition à l'intérieur du cœur et voyage sur la longueur du câble. La fibre de Corning et le câblage de Siemens se sont combinés dans le premier câble à fibre optique en 1977, une réussite de groupe construite à partir d'un siècle d'essais d'autres personnes.<br><br><b>Points d'attribution:</b> 1 point pour une chaîne d'au moins deux étapes avec le problème que chacune a exposé. 1 point pour les problèmes précis des signaux lumineux à l'air libre (météo, interférences, ligne de vue). 1 point pour la propriété du matériau (verre très pur, mince comme un cheveu, guidant la lumière par réflexion interne). 1 point pour la caractérisation du processus comme essais et erreurs systématiques, menés par plusieurs travailleurs et groupes.",
      {});
  }
]), ["Raconte-le comme une chaîne : tentative, problème, prochaine tentative. Termine au matériau qui l'a rendu possible.", "Le verre est le sommet : pur, mince, et réfléchissant à l'intérieur."]);

/* ---------- SC8.8.6 Technologies optiques rendant la recherche possible ---------- */

E("s8f-u3-research-tech", 3, ["SC8.8.6"], 1, "gen", function () {
  var cases = [
    { q: "Quel exemple montre une technologie optique rendant la recherche scientifique possible?", k: "Des équipes d'astronomie utilisent de grands télescopes pour arpenter l'univers et rassembler la lumière d'objets trop faibles pour l'œil", w: ["Un joueur de hockey porte un écran facial en plastique clair fixé sur un casque pendant un match de ligue à l'aréna local", "Un conducteur allume les phares d'une voiture pour voir la route en conduisant sur une route sombre la nuit à la campagne", "Un élève s'assoit à un bureau à la maison le soir et lit un livre pour l'école sous la lumière d'une lampe de bureau"] },
    { q: "Quelle activité personnelle est directement liée aux technologies optiques que les chercheurs utilisent?", k: "Utiliser une loupe ou un télescope de jardin pour observer des spécimens et le ciel nocturne", w: ["Porter des lunettes de soleil à la plage un après-midi ensoleillé d'été avec sa famille", "Regarder un film sur le grand écran d'une salle de cinéma en ville pendant la fin de semaine", "Utiliser un four à micro-ondes à la cafétéria pour réchauffer un dîner apporté de la maison"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "L'indicateur jumelle deux directions : les technologies optiques rendent la recherche possible (les télescopes qui arpentent l'univers, les microscopes qui ouvrent le monde microscopique), et les mêmes technologies apparaissent dans les activités personnelles (une loupe, un télescope d'amateur), ce qui est la façon dont le guide demande aux élèves de relier les deux.",
    {});
}, ["La recherche veut dire rassembler de nouvelles connaissances avec l'appareil, pas seulement utiliser la lumière.", "Télescopes et microscopes sont la paire de la recherche."]);

E("s8f-u3-personal-optics", 3, ["SC8.8.6"], 1, "var", varset([
  function () {
    return mcq("Quelle liste contient seulement des technologies optiques, du genre que ce chapitre étudie?",
      "Écrans faciaux sur les casques de hockey, phares de voiture, lampes de poche, loupes, lunettes, lentilles de contact, microscopes, télescopes et appareils photo",
      ["Écrans faciaux, phares de voiture, radios, télévisions, bouilloires électriques, séchoirs à cheveux, loupes et télescopes pour regarder le ciel nocturne",
       "Lunettes, lentilles de contact, fours à micro-ondes, radios, grille-pain, télévisions, séchoirs à cheveux, bouilloires électriques et appareils photo",
       "Lampes de poche, télescopes, téléphones cellulaires, fours à micro-ondes, radios, grille-pain, télévisions, séchoirs à cheveux et microscopes"],
      "Chaque élément de la liste correcte fonctionne par réflexion ou réfraction de la lumière, et la liste est l'ensemble d'exemples du guide lui-même pour cet indicateur. Les radios, les micro-ondes et les téléphones cellulaires appartiennent à l'étude plus large du spectre électromagnétique, mais ce ne sont pas des technologies optiques.",
      {});
  }
]), ["Optique veut dire des appareils qui courbent ou font rebondir la lumière seulement.", "Si ça fonctionne par radio ou micro-ondes, c'est exclu."]);

E("s8f-u3-cr-research", 3, ["SC8.8.6"], 2, "var", varset([
  function () {
    return textq("Choisis une technologie optique (microscope, télescope, ou fibre optique en médecine et en communications). Explique comment elle rend la recherche scientifique possible : ce que les chercheurs peuvent observer ou faire avec elle qu'ils ne pourraient pas sans elle, et quelle propriété de la lumière la fait fonctionner. (3 points)",
      ["la technologie nommée avec une capacité de recherche qu'elle crée", "l'observation ou la mesure qui était impossible avant elle", "la propriété de la lumière dont elle dépend"],
      "<b>Réponse modèle:</b> Le télescope rend l'astronomie possible. Les objets lointains envoient si peu de lumière à la Terre que l'œil nu détecte seulement les étoiles les plus brillantes; le grand miroir concave ou les lentilles d'un télescope recueillent la lumière d'une large surface et la concentrent, donc les chercheurs peuvent observer des galaxies faibles, mesurer la lumière d'étoiles lointaines individuelles et arpenter l'univers systématiquement, construisant l'image moderne de sa taille et de son histoire. La propriété à l'œuvre est la réflexion (pour un télescope à réflexion) : la loi de la réflexion permet à un miroir courbé avec précision de rassembler les rayons parallèles vers un foyer. (Le microscope, étendant la réfraction au monde microscopique, ou la fibre optique, transportant la lumière dans le corps et à travers les océans pour les données de recherche, traités de la même façon, méritent aussi tous les points.)<br><br><b>Points d'attribution:</b> 1 point pour la capacité de recherche que la technologie crée. 1 point pour ce qui était impossible ou impraticable sans elle. 1 point pour la propriété de la lumière dont elle dépend.",
      {});
  }
]), ["Capacité, manque, propriété : trois mouvements.", "Nomme ce que les chercheurs peuvent faire maintenant qu'ils ne pouvaient pas faire avant."]);

/* ---------- SC8.8.7 Travail individuel et de groupe en optique ---------- */

E("s8f-u3-individual-group", 3, ["SC8.8.7"], 1, "var", varset([
  function () {
    return mcq("Quel jumelage illustre correctement l'activité scientifique et technologique individuelle et de groupe en optique?",
      "Individuel : un fabricant de lentilles qui meule et teste des lentilles dans un atelier. Groupe : une équipe d'astronomie qui arpente l'univers avec un observatoire partagé",
      ["Individuel : le programme international du télescope Hubble avec ses nombreuses équipes. Groupe : un seul élève qui travaille avec une loupe à son bureau",
       "Le travail individuel et le travail de groupe ne se produisent jamais tous les deux dans un seul et même domaine de la science et de la technologie à la fois",
       "Individuel : une équipe d'astronomie qui travaille dans un observatoire. Groupe : un inventeur solitaire qui travaille seul à la maison sur ses appareils"],
      "Le contraste du guide lui-même : une partie du travail en optique est faite par des individus, comme les fabricants de lentilles, et une partie par des groupes, comme les équipes d'astronomie qui étudient et arpentent l'univers. Les fleurons modernes comme le télescope Hubble sont du travail de groupe à la plus grande échelle, tandis que la tradition artisanale du fabricant de lentilles individuel continue.",
      {});
  }
]), ["Une paire a la bonne échelle dans ses deux moitiés. Vérifie chaque moitié séparément.", "Fabricant de lentilles seul; équipe d'astronomie ensemble."]);

E("s8f-u3-corning-siemens", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("Le premier câble à fibre optique, en 1977, combinait la technologie de fibre de Corning avec la technologie de câblage de Siemens. Qu'est-ce que cet exemple illustre au sujet de l'activité scientifique et technologique?",
      "Les grandes technologies résultent souvent de groupes et d'organisations qui combinent des expertises différentes, et non d'un seul travailleur",
      ["Les entreprises qui travaillent sur une nouvelle technologie ne partagent jamais aucune de leur expertise l'une avec l'autre pendant le développement du produit",
       "Le câble fini était l'œuvre d'un seul individu, travaillant seul dans l'une des deux entreprises, sans aucune aide de collègues ou de partenaires extérieurs",
       "La fibre optique n'exigeait aucune connaissance scientifique de la lumière du tout, seulement l'habileté de fabrication pour fabriquer le câble lui-même"],
      "Aucune des deux entreprises ne détenait la solution entière : l'une avait la fibre, l'autre le câble. Leur travail conjoint est le cas le plus clair du STSE de l'activité technologique comme entreprise de groupe, placé à côté de travailleurs individuels comme les fabricants de lentilles ailleurs dans le chapitre.",
      {});
  }
]), ["Deux entreprises, deux moitiés de la solution. De quelle sorte d'activité s'agit-il?", "Le travail de groupe à l'échelle des organisations."]);

E("s8f-u3-hubble", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("Le télescope spatial Hubble a été conçu, construit, lancé et opéré par de grandes équipes dans plusieurs institutions et pays, et son défaut de miroir a été corrigé par une mission d'entretien planifiée par encore plus d'équipes. Quelle conclusion sur le travail en optique Hubble appuie-t-il le mieux?",
      "La recherche optique moderne est surtout une activité de groupe, se construisant cumulativement sur les connaissances des travailleurs antérieurs, de Galilée et Newton jusqu'à aujourd'hui",
      ["Un individu talentueux, travaillant seul, peut encore concevoir et achever un instrument optique de premier plan comme Hubble, du premier dessin au lancement final dans l'espace",
       "Hubble montre que le travail fait par de grands groupes produit des résultats défectueux, et que le travail de groupe devrait être évité en optique au profit des travailleurs seuls",
       "Nos connaissances en optique étaient déjà complètes au temps de Newton, et rien à leur sujet n'a changé depuis lors dans les siècles de recherche qui ont suivi ses travaux"],
      "Le guide présente la lignée de Galilée à Newton à Hubble et aux technologies laser comme des connaissances en développement continu et collectif : la compréhension d'aujourd'hui n'est pas stagnante et sera étendue. L'échelle de Hubble, et l'effort d'équipe qui l'a réparé, sont le visage moderne de cette activité de groupe.",
      {});
  }
]), ["L'échelle est la preuve : compte les institutions qu'un fleuron exige.", "Cumulatif et collectif : des connaissances transmises et construites."]);

/* ---------- SC8.9.1 Questions découlant de l'apprentissage des applications de la réfraction ---------- */

E("s8f-u3-applications-question", 3, ["SC8.9.1"], 2, "var", varset([
  function () {
    return mcq("Après avoir étudié les applications de la réfraction, une classe fait un remue-méninges de nouvelles questions qui découlent de ce qu'elle a appris. Quelle question découle véritablement du matériel sur les applications de la réfraction?",
      "Si la lumière se courbe en entrant dans l'eau, de combien la profondeur apparente d'un objet sous l'eau change-t-elle quand l'angle de vue change, et peut-on le mesurer?",
      ["Pourquoi le ciel au-dessus du port a-t-il l'air bleu certains jours de l'année et gris et couvert d'autres jours au lieu du bleu qu'on attend du ciel en été?",
       "Comment les plantes qui poussent dans un jardin d'école fabriquent-elles leur propre nourriture à partir de la lumière du soleil qui tombe sur leurs feuilles pendant la journée?",
       "Quelle est la capitale de chaque pays du monde où les appareils à rayons X sont utilisés dans les hôpitaux de ses villes et villages pour examiner les patients?"],
      "Une question découle de ce qui a été appris quand elle grandit à partir du matériel lui-même : l'étude des applications établit que la réfraction déplace la position apparente des objets sous l'eau, et la question pousse exactement là, vers une mesure. Les autres questions sont de bonnes questions, mais elles appartiennent à d'autres sujets et à d'autres cours.",
      {});
  }
]), ["La nouvelle question doit grandir à partir de l'étude de la réfraction elle-même.", "Déplacement apparent plus un angle changeant suggère une question de mesure."]);

E("s8f-u3-applications-problem", 3, ["SC8.9.1"], 1, "var", varset([
  function () {
    return mcq("Étudier les applications de la réfraction soulève un problème pratique pour une piscine municipale : les sauveteurs jugent mal la profondeur réelle de l'eau parce que le fond semble plus proche qu'il ne l'est. Quelle affirmation formule le problème que le nouvel apprentissage crée?",
      "De combien le fond d'une piscine semble-t-il moins profond qu'il ne l'est vraiment, et des marques de profondeur devraient-elles être corrigées pour ce que les sauveteurs voient?",
      ["Pourquoi la piscine n'a-t-elle pas simplement été construite avec un fond que tout le monde peut voir clairement de n'importe quel angle dès le départ?",
       "L'eau des piscines devrait simplement être interdite partout immédiatement, quel qu'en soit le coût pour les communautés qui en dépendent l'été",
       "La profondeur de la piscine est un problème pour les sauveteurs, mais elle n'a aucun lien avec l'optique ou le comportement de la lumière du tout"],
      "Le nouvel apprentissage crée de nouveaux problèmes quand il révèle ce qui se passe vraiment : savoir que la réfraction fait paraître le fond moins profond transforme la sécurité de la piscine en un problème défini avec une quantité mesurable et une réponse testable.",
      {});
  }
]), ["Le problème existe parce que l'apprentissage a montré ce que la lumière fait à la surface.", "La profondeur apparente définit le problème de la piscine."]);

/* ---------- SC8.9.2 Définitions opérationnelles ---------- */

E("s8f-u3-definitions", 3, ["SC8.9.2"], 1, "gen", function () {
  var cases = [
    { q: "Dans un diagramme de réflexion, qu'est-ce que la normale?", k: "La ligne tracée perpendiculairement (à 90 degrés) à la surface au point où le rayon la frappe", w: ["La ligne qui court le long de la surface du miroir lui-même au point où le rayon se réfléchit", "Le rayon incident lui-même, voyageant vers le miroir avant de le frapper à sa surface", "La ligne tracée à mi-chemin entre la surface du miroir et le rayon réfléchi qui en repart"] },
    { q: "Quel terme nomme le rayon qui voyage vers un miroir et le frappe?", k: "Le rayon incident", w: ["Le rayon réfléchi", "La normale", "Le rayon réfracté"] },
    { q: "Qu'est-ce que l'angle d'incidence, opérationnellement?", k: "L'angle entre le rayon incident et la normale, mesuré au point d'incidence", w: ["L'angle entre le rayon incident qui arrive et la surface du miroir qu'il frappe", "L'angle entre le rayon réfléchi qui quitte le miroir et la surface du miroir", "L'angle formé entre les deux miroirs montés à l'intérieur du tube d'un périscope"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Le vocabulaire de la réflexion est opérationnel : le rayon incident arrive, le rayon réfléchi repart, la normale se tient perpendiculairement à la surface au point de contact, et les deux angles se mesurent à partir de la normale. Ces définitions sont ce que les mesures du laboratoire de base sur la réflexion signifient.",
    {});
}, ["Chaque angle en réflexion pend à la normale.", "Incident arrive; réfléchi repart; normale se tient à 90 degrés."]);

E("s8f-u3-definitions-figure", 3, ["SC8.9.2"], 3, "var", varset([
  function () {
    var q = mcq("Le diagramme montre une réflexion avec des parties étiquetées A, B, C et D. Quel étiquetage est correct?",
      "A est le rayon incident, B est le rayon réfléchi, C est la normale, et D est le miroir",
      ["A est le rayon réfléchi, B est le rayon incident, C est le miroir, et D est la normale",
       "A est la normale, B est le rayon incident, C est le rayon réfléchi, et D est le miroir",
       "A est le rayon incident, B est la normale, C est le rayon réfléchi, et D est le miroir"],
      "Lis la géométrie : A est le rayon qui voyage vers le miroir (incident), B est le rayon qui repart après le rebond (réfléchi), C est la ligne pointillée à 90 degrés de la surface (la normale), et D est la surface réfléchissante elle-même (le miroir).",
      {});
    q.figure = s8fReflectSVG(40, true);
    return q;
  }
]), ["Retrace d'abord le trajet de la lumière : entrée, rebond, sortie. La ligne pointillée est la normale.", "La direction du voyage sépare l'incident du réfléchi."]);

E("s8f-u3-operational", 3, ["SC8.9.2"], 2, "var", varset([
  function () {
    return mcq("Une classe regarde une balle de tennis rebondir sur le plancher à plusieurs angles et trace son trajet, puis fait la même chose avec une boîte à rayons et un miroir. Quelle affirmation formule le mieux la définition opérationnelle vers laquelle elle se dirige?",
      "Pour la balle comme pour le rayon de lumière, l'angle auquel le trajet rencontre la normale avant le rebond est égal à l'angle auquel il repart après le rebond",
      ["Les balles et les rayons de lumière, dans tous les cas, rebondissent toujours tout droit le long exactement du même trajet par lequel ils sont arrivés à la surface",
       "L'angle auquel le trajet rebondit sur la surface dépend seulement de la force avec laquelle la balle se trouve lancée au plancher par l'élève qui fait la démonstration",
       "Un rayon de lumière obéit au patron de rebond seulement dans les occasions où un rapporteur d'angles est présent sur le banc pour mesurer les angles qu'il fait"],
      "Les définitions opérationnelles viennent des opérations : faire rebondir et mesurer. La balle et le rayon se comportent de la même façon, ce qui explique pourquoi le guide introduit la réflexion par la démonstration de la balle : mesure contre la normale des deux côtés, et l'égalité est la définition en action.",
      {});
  }
]), ["La définition se construit en mesurant, pas en mémorisant.", "Balle et rayon partagent une seule règle de rebond."]);

/* ---------- SC8.9.3 Utiliser les miroirs pour étudier les images ---------- */

E("s8f-u3-concave-rays", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return mcq("Quelle paire d'affirmations décrit correctement les deux rayons spéciaux utilisés dans les diagrammes de rayons des miroirs concaves?",
      "Un rayon voyageant parallèlement à l'axe principal se réfléchit à travers le foyer; un rayon voyageant à travers le foyer se réfléchit parallèlement à l'axe principal",
      ["Un rayon parallèle à l'axe se réfléchit sur lui-même; un rayon à travers le foyer est absorbé par le miroir",
       "Un rayon parallèle à l'axe se réfléchit à travers le centre de courbure; un rayon à travers le foyer se réfléchit aussi à travers le centre",
       "Les deux rayons spéciaux se réfléchissent à travers le foyer, quel que soit leur trajet d'arrivée au miroir"],
      "Les deux rayons sont les images miroirs d'une seule règle : parallèle en entrée, par le foyer en sortie; par le foyer en entrée, parallèle en sortie. Ces deux rayons réfléchis suffisent pour localiser une image, ce qui explique pourquoi le guide construit chaque diagramme de miroir courbé à partir d'eux.",
      {});
  }
]), ["Les deux rayons échangent leurs rôles : parallèle et foyer changent de place.", "Parallèle en entrée, par le foyer en sortie. Par le foyer en entrée, parallèle en sortie."]);

E("s8f-u3-concave-spot", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    var q = mcq("Le diagramme de rayons montre un objet placé au-delà du centre de courbure d'un miroir concave. En lisant le diagramme (pas de mémoire), quelles sont les propriétés de l'image?",
      "Plus petite que l'objet, entre le foyer et le centre de courbure, inversée, et réelle",
      ["Plus grande que l'objet, au-delà du centre de courbure, inversée, et réelle",
       "Plus petite que l'objet, derrière le miroir, droite, et virtuelle",
       "La même taille que l'objet, au centre de courbure, inversée, et réelle"],
      "Lis le dessin : les deux rayons réfléchis se rencontrent vraiment devant le miroir, entre le foyer et le centre de courbure, donc l'image est réelle et se trouve là; la flèche image est plus courte que la flèche objet (plus petite) et pointe vers le bas (inversée). Le guide est explicite : ces caractéristiques s'identifient à partir d'un diagramme de rayons précis, pas mémorisées.",
      {});
    q.figure = s8fConcaveSVG("beyond");
    return q;
  },
  function () {
    var q = mcq("Le diagramme de rayons montre un objet placé entre le foyer et le centre de courbure d'un miroir concave. En lisant le diagramme, quelles sont les propriétés de l'image?",
      "Plus grande que l'objet, au-delà du centre de courbure, inversée, et réelle",
      ["Plus petite que l'objet, entre le foyer et le centre, inversée, et réelle",
       "Plus grande que l'objet, derrière le miroir, droite, et virtuelle",
       "La même taille que l'objet, droite, et virtuelle"],
      "Dans le dessin, les rayons réfléchis se rencontrent au-delà du centre de courbure, et la flèche image se tient plus haute que la flèche objet et pointe vers le bas : plus grande, au-delà du centre de courbure, inversée, et réelle (formée là où les rayons se rencontrent vraiment, devant le miroir). Déplacer l'objet a changé chaque propriété, ce qui est la leçon des trois positions.",
      {});
    q.figure = s8fConcaveSVG("between");
    return q;
  },
  function () {
    var q = mcq("Le diagramme de rayons montre un objet placé entre le foyer et un miroir concave. En lisant le diagramme, quelles sont les propriétés de l'image?",
      "Plus grande que l'objet, derrière le miroir, droite, et virtuelle",
      ["Plus petite que l'objet, devant le miroir, inversée, et réelle",
       "Plus grande que l'objet, devant le miroir, inversée, et réelle",
       "La même taille que l'objet, derrière le miroir, droite, et virtuelle"],
      "Ici, les rayons réfléchis s'écartent devant le miroir et ne se rencontrent jamais; leurs prolongements en pointillés se rencontrent derrière le miroir, là où la flèche image se tient : plus grande, droite, et virtuelle. C'est le cas du grossissement, la position du miroir de rasage ou de maquillage.",
      {});
    q.figure = s8fConcaveSVG("inside");
    return q;
  }
]), ["Laisse le dessin répondre : où les rayons se rencontrent-ils, et comment la flèche image se compare-t-elle?", "Image en pointillés veut dire virtuelle; rayons qui se rencontrent veulent dire réelle."]);

E("s8f-u3-convex-spot", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    var q = mcq("Le diagramme de rayons montre un objet devant un miroir convexe. Quelles propriétés le diagramme montre-t-il que l'image possède?",
      "Plus petite que l'objet, plus proche du miroir que l'objet, droite, et virtuelle",
      ["Plus grande que l'objet, plus loin du miroir, inversée, et réelle",
       "Plus petite que l'objet, devant le miroir, droite, et réelle",
       "La même taille que l'objet, à la même distance, droite, et virtuelle"],
      "Le cas convexe ne varie jamais : les rayons réfléchis divergent, leurs prolongements se rencontrent derrière le miroir, et l'image est toujours plus petite, plus proche, droite et virtuelle. Cette fiabilité, plus le large champ de vision, explique pourquoi les miroirs convexes servent de miroirs de sécurité.",
      {});
    q.figure = s8fConvexSVG();
    return q;
  }
]), ["Les images convexes sont le seul patron fixe du chapitre. Lis-le sur le diagramme.", "Plus petite, plus proche, droite, virtuelle : chaque fois."]);

E("s8f-u3-real-virtual", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    return mcq("Sur un diagramme de rayons, comment distingue-t-on une image réelle d'une image virtuelle?",
      "Une image réelle se forme devant le miroir là où les rayons réfléchis se rencontrent vraiment; une image virtuelle se forme derrière le miroir là où les prolongements des rayons semblent se rencontrer",
      ["Une image réelle est toujours plus grande que l'objet qui la forme devant le miroir; une image virtuelle est toujours plus petite que l'objet qui la forme derrière le miroir dans le diagramme",
       "Une image réelle se tient toujours droite devant le miroir qui la forme; une image virtuelle, formée derrière le miroir, est toujours inversée à la place dans tous les diagrammes de rayons",
       "Une image réelle peut se voir seulement dans des photographies prises d'elle; une image virtuelle peut se voir seulement en personne, jamais photographiée par un appareil quelconque"],
      "Le guide limite la distinction à l'endroit sur le diagramme, et cela suffit : des rayons qui convergent vraiment devant le miroir font une image réelle (on pourrait l'attraper sur un écran); des rayons qu'il faut prolonger vers l'arrière jusqu'à un point de rencontre derrière le miroir en font une virtuelle. La taille et l'orientation varient indépendamment.",
      {});
  }
]), ["L'endroit décide : des rayons qui se rencontrent, ou des prolongements qui se rencontrent?", "Devant et réel veut dire réelle; derrière et apparent veut dire virtuelle."]);

E("s8f-u3-cr-mirror-lab", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return textq("Dans le laboratoire de base sur la réflexion, partie B, un groupe place une flèche à 6 cm devant un miroir plan, trace le diagramme de rayons, et localise l'image à 6 cm derrière le miroir, de la même hauteur que la flèche. Un deuxième groupe utilise 10 cm et trouve l'image à 10 cm derrière. Un troisième groupe rapporte son image à 8 cm derrière pour un objet à 12 cm devant, et ses rayons tracés ne se rencontrent pas en un seul point. Énonce la conclusion que les données des deux premiers groupes appuient, et évalue le résultat du troisième groupe. (3 points)",
      ["la distance de l'image est égale à la distance de l'objet dans un miroir plan", "la taille de l'image est égale à la taille de l'objet", "le diagramme du troisième groupe a une erreur de construction, puisque ses rayons devraient se rencontrer à 12 cm derrière"],
      "<b>Réponse modèle:</b> Les données qui concordent appuient la conclusion du miroir plan : l'image se forme aussi loin derrière le miroir que l'objet est devant (6 cm et 6 cm; 10 cm et 10 cm), et l'image est de la même taille que l'objet, droite et virtuelle. Le résultat du troisième groupe ne correspond pas au patron que ses camarades ont établi, et sa propre preuve le trahit : des rayons réfléchis tracés correctement à partir d'un point se rencontrent en un seul point image, donc des rayons qui ne se rencontrent pas signifient que la construction, pas le miroir, est fautive, le plus probablement une normale tracée au mauvais point ou des angles mesurés à partir de la surface. Le groupe devrait retracer soigneusement et remesurer plutôt que de rapporter 8 cm comme un résultat.<br><br><b>Points d'attribution:</b> 1 point pour la conclusion (distance de l'image égale à la distance de l'objet, même taille). 1 point pour juger le troisième résultat contre le patron. 1 point pour identifier l'erreur de construction à partir des rayons qui ne se rencontrent pas.",
      {});
  }
]), ["Deux groupes concordent sur un patron; le troisième est en désaccord et son propre diagramme montre pourquoi.", "Des distances égales sont la conclusion; des rayons qui ne se rencontrent pas sont l'indice."]);

/* ---------- SC8.9.4 Définir et délimiter des questions ---------- */

E("s8f-u3-delimit", 3, ["SC8.9.4"], 2, "var", varset([
  function () {
    return mcq("La question d'enquête d'un élève se lit : « Tout sur le fonctionnement des miroirs. » Quelle révision la définit et la délimite correctement pour une enquête?",
      "Comment l'angle d'incidence d'un rayon sur un miroir plan se compare-t-il à son angle de réflexion, pour des angles entre 20 et 60 degrés?",
      ["Comment les miroirs de toutes sortes, plans et courbés également, fonctionnent-ils, partout dans l'univers et à travers toute l'histoire?",
       "Pourquoi les miroirs sont-ils si intéressants à regarder pour les gens de tous âges, et pourquoi les gens aiment-ils tant jouer avec eux?",
       "Quelle est l'histoire complète des miroirs dans la civilisation humaine, des premiers miroirs en métal poli jusqu'à nos jours?"],
      "Délimiter rétrécit un sujet à une question mesurable avec des bornes : un type de miroir, deux angles nommés à comparer, et une étendue énoncée. L'originale et les autres options n'ont ni variables ni bords, donc aucune enquête ne pourrait les terminer.",
      {});
  }
]), ["Une question délimitée nomme ses variables et ses limites.", "Un miroir, deux angles, une étendue énoncée."]);

E("s8f-u3-delimit-problem", 3, ["SC8.9.4"], 1, "var", varset([
  function () {
    return mcq("Une équipe veut enquêter sur la raison pour laquelle les fenêtres du gymnase de l'école produisent de l'éblouissement sur le plancher pendant les cours du matin. Quel énoncé de problème est assez bien délimité pour être étudié?",
      "Entre 9 h et 10 h, la lumière du soleil qui se réfléchit sur les fenêtres est du gymnase crée des taches d'éblouissement sur le plancher; l'équipe testera quel couvre-fenêtre enlève l'éblouissement tout en gardant le gymnase utilisable",
      ["Le gymnase de l'école est trop lumineux à l'intérieur à certains moments de la journée, certains jours de la semaine, et quelque chose devrait vraiment être fait au sujet de la luminosité éventuellement, par quelqu'un",
       "La lumière du soleil qui entre par les fenêtres de classe est un problème pour toutes les écoles, dans tous les endroits du pays, à tous les moments de la journée et dans chaque saison de l'année scolaire au complet",
       "L'équipe prendra la tâche de résoudre, une fois pour toutes, le problème de l'éblouissement des fenêtres dans chaque bâtiment scolaire de chaque communauté de toute la province cette année même"],
      "Un problème délimité nomme l'endroit, le moment, le phénomène et le test à faire. Les affirmations à l'échelle de la province et « un jour » ne peuvent pas être étudiées par une équipe scolaire; la première option le peut, en une semaine de matins.",
      {});
  }
]), ["Endroit, moment, phénomène, test : un problème assez petit pour être mené vraiment.", "Si l'équipe ne peut pas le terminer, il n'est pas délimité."]);

/* ---------- SC8.9.5 Conclusion fondée sur des données probantes ---------- */

E("s8f-u3-conclusion", 3, ["SC8.9.5"], 2, "var", varset([
  function () {
    return mcq("Les données de réflexion d'un groupe se lisent : incidence 15, réflexion 15; incidence 30, réflexion 29; incidence 45, réflexion 46; incidence 60, réflexion 60. Quelle conclusion est fondée correctement sur ces données?",
      "L'angle de réflexion est égal à l'angle d'incidence, à l'intérieur des petites erreurs de mesure attendues du travail au rapporteur d'angles",
      ["La loi de la réflexion est réfutée par ces données, parce que deux des quatre essais sont à côté d'un seul degré chacun dans le tableau du groupe",
       "L'angle de réflexion dans les données est parfois plus grand et parfois plus petit que l'angle d'incidence, donc aucun patron n'existe dans les données du groupe",
       "Le groupe devrait simplement changer les deux valeurs qui sont à côté d'un degré pour que toutes les données correspondent exactement à la loi de la réflexion"],
      "Les conclusions respectent le patron et l'instrument. Trois correspondances exactes et deux écarts d'un seul degré, la largeur d'une ligne de crayon sur un rapporteur d'angles, appuient la loi avec l'erreur de mesure nommée. Truquer les nombres vers la perfection corromprait les données; déclarer la loi morte pour un degré ignorerait le fonctionnement de la mesure.",
      {});
  }
]), ["Juge le patron contre la précision de l'instrument.", "Un degré est du bruit de rapporteur d'angles, pas une réfutation."]);

E("s8f-u3-evidence", 3, ["SC8.9.5"], 3, "var", varset([
  function () {
    return mcq("Une élève a commencé l'unité sur la réfraction en prédisant que la lumière se courbe vers la normale quand elle accélère. Après le laboratoire de base, ses diagrammes montrent des rayons qui se courbent vers la normale en entrant dans l'eau, où la lumière voyage plus lentement. Quelle affirmation relie correctement sa preuve à son idée initiale?",
      "La preuve réfute son idée initiale : la courbure vers la normale se produit quand la lumière ralentit en entrant dans un milieu plus dense, le contraire de sa prédiction",
      ["La preuve recueillie au laboratoire appuie son idée originale, parce que les rayons se sont courbés vers la normale, exactement comme elle avait dit qu'ils le feraient dans son idée",
       "La preuve du laboratoire n'a aucun lien avec son idée originale, parce que les diagrammes de rayons tracés sur papier ne sont pas une preuve qu'on peut comparer à une prédiction",
       "Son idée originale et la preuve du laboratoire concordent l'une avec l'autre, puisque l'eau est un milieu moins dense que l'air dans les conditions du laboratoire de base"],
      "Le travail sur la preuve veut dire comparer l'affirmation au résultat selon les propres termes de l'affirmation. Elle a prédit que la courbure accompagnerait l'accélération; le laboratoire montre la courbure vers la normale accompagnant le ralentissement dans le milieu plus dense. La direction qu'elle a nommée était juste et le mécanisme qu'elle y a attaché était faux, donc l'idée telle qu'énoncée est réfutée et doit être révisée.",
      {});
  }
]), ["Compare l'affirmation entière, mécanisme inclus, avec ce que les données montrent.", "Bonne direction, mauvaise raison compte quand même comme réfuté."]);

E("s8f-u3-cr-conclusion", 3, ["SC8.9.5"], 3, "var", varset([
  function () {
    return textq("Une classe teste si l'angle de réfraction dépend du liquide, en envoyant un rayon à 40 degrés d'incidence de l'air dans trois liquides. Leurs angles de réfraction mesurés sont : eau 29 degrés, huile végétale 26 degrés, alcool à friction 28 degrés. Un groupe a aussi noté du glycérol à 41 degrés. (a) Énonce une conclusion que les données de la classe appuient au sujet des liquides et de la réfraction. (b) Évalue le résultat du glycérol. (3 points)",
      ["les liquides plus denses courbent le rayon davantage vers la normale, donnant de plus petits angles de réfraction", "l'huile et l'alcool à friction courbent plus que l'eau dans ces données", "la valeur du glycérol brise le patron et dépasse l'angle d'incidence, donc elle devrait être remesurée"],
      "<b>Réponse modèle:</b> (a) Les trois résultats fiables montrent le rayon qui se courbe vers la normale (angle de réfraction plus petit que l'angle d'incidence de 40 degrés), et la quantité de courbure diffère selon le liquide : l'huile a courbé le rayon le plus (26 degrés), puis l'alcool à friction (28), puis l'eau (29). La conclusion appuyée est que le milieu affecte l'angle de réfraction, les liquides plus denses de cet ensemble courbant la lumière plus fortement vers la normale. (b) Le résultat du glycérol, 41 degrés, est plus grand que l'angle d'incidence, ce qui signifierait que le rayon s'est écarté de la normale en entrant dans un liquide plus dense, contredisant chaque autre mesure et la règle de courbure. C'est presque certainement une erreur de mesure ou de notation (par exemple, mesurer à partir de la surface au lieu de la normale) et le groupe devrait le remesurer plutôt que le rapporter.<br><br><b>Points d'attribution:</b> 1 point pour la conclusion que le milieu affecte l'angle de réfraction, avec l'ordre tiré des données. 1 point pour noter que tous les angles sont plus petits que l'angle d'incidence (courbure vers la normale). 1 point pour évaluer la valeur du glycérol comme une erreur contre le patron et prescrire la remesure.",
      {});
  }
]), ["Conclus à partir des trois valeurs qui concordent; juge la quatrième contre le patron et la règle.", "Un angle plus grand que l'angle d'incidence, en entrant dans un liquide plus dense, ne peut pas tenir."]);

/* ---------- SC8.9.6 Estimer les angles d'incidence et de réflexion ---------- */

E("s8f-u3-estimate-reflect", 3, ["SC8.9.6"], 2, "gen", function () {
  var cases = [
    { q: "Un diagramme montre un rayon qui frappe un miroir plan à environ 30 degrés de la normale. Sans rapporteur d'angles, quelle est la meilleure estimation de l'angle de réflexion?", k: "Environ 30 degrés : la loi de la réflexion rend les deux angles égaux, donc l'estimation copie l'angle d'incidence", w: ["Environ 60 degrés : l'angle de réflexion se mesure à partir de la surface du miroir, donc il est le complément de l'incidence", "Environ 45 degrés : un rayon se réfléchit toujours à mi-chemin entre la normale et la surface du miroir qu'il frappe", "Environ 15 degrés : l'angle de réflexion est toujours à peu près la moitié de l'angle d'incidence sur un miroir plan"] },
    { q: "Un rayon arrive sur un miroir plan presque le long de la normale, à seulement quelques degrés d'elle. Quelle estimation de l'angle de réflexion est raisonnable?", k: "Seulement quelques degrés aussi : un rayon presque normal se réfléchit presque sur lui-même", w: ["Environ 90 degrés : un rayon presque normal se réfléchit le long de la surface du miroir", "Environ 45 degrés : tout rayon se réfléchit à 45 degrés quand l'incidence est faible", "On ne peut faire aucune estimation sans rapporteur d'angles, même approximative"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Estimer un angle de réflexion n'exige pas de le mesurer : la loi de la réflexion fixe l'estimation. L'angle de réflexion égale l'angle d'incidence, les deux à partir de la normale, donc une bonne estimation de l'un est une bonne estimation de l'autre. Les estimations qui partent de la surface confondent la référence.",
    {});
}, ["La loi elle-même est l'outil d'estimation : les angles sont égaux.", "Copie l'incidence; ne la complète pas à 90."]);

E("s8f-u3-estimate-incidence", 3, ["SC8.9.6"], 1, "var", varset([
  function () {
    return mcq("Sur un diagramme tracé à la main, un rayon fait environ 60 degrés avec la surface d'un miroir plan. Quelle est la meilleure estimation de l'angle d'incidence?",
      "Environ 30 degrés, parce que l'angle d'incidence se mesure à partir de la normale, et la normale est à 90 degrés de la surface",
      ["Environ 60 degrés, parce que l'angle d'incidence se mesure à partir de la surface du miroir que le rayon frappe en arrivant",
       "Environ 120 degrés, parce que l'angle d'incidence compte tout le trajet du rayon depuis la source jusqu'au miroir et au-delà",
       "Environ 45 degrés, parce que les estimations d'angles en optique tombent toujours à mi-chemin entre la normale et la surface"],
      "Estimer exige la bonne référence. L'angle dessiné est contre la surface; l'angle d'incidence vit entre le rayon et la normale. Les deux remplissent le coin droit entre la surface et la normale, donc 90 - 60 = 30 degrés environ.",
      {});
  }
]), ["L'angle dessiné est contre la surface; l'incidence est contre la normale.", "Les deux angles remplissent ensemble le coin de 90 degrés."]);

/* ---------- SC8.9.7 Clé de classification des miroirs ---------- */

E("s8f-u3-mirror-key", 3, ["SC8.9.7"], 1, "var", varset([
  function () {
    return mcq("Une clé de classification sert à identifier un miroir inconnu en répondant à une suite de questions à deux choix. Quelle question ouvre correctement une clé des trois types de miroirs?",
      "La surface réfléchissante est-elle plate ou courbée? (Si elle est courbée : bombe-t-elle vers l'extérieur ou se creuse-t-elle vers l'intérieur?)",
      ["L'image dans le miroir est-elle plus grande ou plus petite que l'objet? (Si elle est plus grande : le miroir est-il en verre ou en métal poli?)",
       "Le miroir sert-il à l'intérieur ou à l'extérieur? (Si à l'extérieur : est-il monté sur un véhicule ou sur le mur d'un bâtiment en ville?)",
       "Le miroir est-il vieux ou neuf? (Si vieux : sa surface est-elle ternie ou encore brillante quand on la regarde sous une lampe du plafond?)"],
      "Une clé de classification commence par la caractéristique qui divise tout l'ensemble en deux : la forme de la surface. Plate donne le miroir plan; courbée se divise encore, bombée vers l'extérieur (convexe) contre creusée vers l'intérieur (concave). L'image, l'usage et l'âge varient à l'intérieur des types et ne peuvent pas ouvrir la clé.",
      {});
  }
]), ["Une clé commence par le trait qui coupe tout l'ensemble en deux.", "La forme d'abord : plate ou courbée, puis bombée ou creusée."]);

E("s8f-u3-mirror-key-apply", 3, ["SC8.9.7"], 2, "var", varset([
  function () {
    return mcq("Une élève applique la clé des miroirs à un miroir inconnu trouvé dans un laboratoire. Étape 1 : la surface est courbée, pas plate. Étape 2 : la surface bombe vers l'objet placé devant elle. Son image d'une règle tenue devant le miroir est plus petite et droite. À quelle classification la clé mène-t-elle, et quelle étape a décidé entre les deux miroirs courbés?",
      "Un miroir convexe; l'étape 2 a décidé, parce que bomber vers l'extérieur est le trait du convexe, et l'image plus petite et droite le confirme",
      ["Un miroir concave; l'étape 2 a décidé, parce que bomber vers l'extérieur est le trait du concave, et l'image plus petite le confirme",
       "Un miroir plan; l'étape 1 a décidé, parce qu'une surface courbée à peine visible compte comme plate dans la clé des miroirs",
       "Un miroir concave; l'image a décidé seule, parce que les miroirs concaves donnent toujours des images plus petites et droites"],
      "La clé se lit étape par étape. L'étape 1 élimine le miroir plan. L'étape 2 sépare les deux courbés : creusé vers l'intérieur est concave, bombé vers l'extérieur est convexe. L'image observée, plus petite, droite et virtuelle, est exactement le patron fixe du convexe, donc la preuve et la clé concordent.",
      {});
  }
]), ["Suis la clé dans l'ordre, puis vérifie la réponse contre l'image observée.", "Bombé vers l'extérieur est le trait décisif du convexe."]);

/* ---------- SC8.9.8 Utiliser les miroirs efficacement et exactement ---------- */

E("s8f-u3-protractor", 3, ["SC8.9.8"], 1, "var", varset([
  function () {
    return mcq("Dans le laboratoire de base sur la réflexion, un groupe obtient continuellement des angles de réflexion à quelques degrés de leurs angles d'incidence. Quelle pratique améliore le plus leur exactitude?",
      "Tracer la normale soigneusement au point d'incidence exact, placer le centre du rapporteur d'angles sur ce point, et mesurer les deux angles à partir de la normale",
      ["Mesurer l'angle d'incidence à partir de la normale comme d'habitude, mais mesurer l'angle de réflexion à partir de la surface du miroir elle-même à la place",
       "Estimer les deux angles à l'œil seulement, puis faire la moyenne des suppositions faites par les membres du groupe pour obtenir les valeurs à rapporter",
       "Mesurer les deux angles à partir de la surface du miroir à la place, puisque la surface est plus facile à voir clairement que la normale pointillée du diagramme"],
      "Le travail exact au miroir est une chaîne de petites disciplines : les rayons tracés droits à la règle à partir de points marqués, la normale tracée au point d'incidence, le rapporteur d'angles centré sur ce point, et les deux angles lus à partir de la normale. Mélanger les références (la normale pour un angle, la surface pour l'autre) fabrique exactement l'erreur de quelques degrés décrite.",
      {});
  }
]), ["Même point, même ligne de référence, les deux angles : c'est la chaîne de l'exactitude.", "La plupart des erreurs de laboratoire ici sont des erreurs de référence, pas des erreurs de lecture."]);

E("s8f-u3-safety", 3, ["SC8.9.8"], 1, "var", varset([
  function () {
    return mcq("Quelle pratique est la façon sûre et correcte de travailler avec la boîte à rayons et les miroirs dans les laboratoires d'optique?",
      "Ne jamais regarder directement dans le faisceau de la boîte à rayons ni le diriger vers les yeux de qui que ce soit, et manipuler les miroirs par leurs bords pour éviter les coupures du verre ébréché",
      ["Regarder directement le long du faisceau de la boîte à rayons avec un œil tenu près de lui pour vérifier que le faisceau est droit avant de mesurer les angles sur le papier du banc de travail",
       "Diriger le faisceau de la boîte à rayons à travers la salle vers le miroir d'un partenaire sur un autre banc pour tester la rapidité de ses réflexes à l'attraper quand le faisceau arrive",
       "Transporter les miroirs librement dans une main, sans leurs étuis, en marchant dans la salle d'un banc à l'autre pendant la période de laboratoire pour les prêter aux autres groupes"],
      "L'équipement d'optique a deux dangers permanents : les faisceaux dirigés vers les yeux, et le verre qui peut s'ébrécher ou se casser. Les habitudes sûres sont de garder les faisceaux sur le banc et loin des yeux, et de manipuler les miroirs soigneusement par leurs bords. L'habileté au banc s'évalue en classe; cette question porte la connaissance de la sécurité.",
      {});
  }
]), ["Faisceaux loin des yeux; verre manipulé par ses bords.", "Le faisceau est pour le papier, jamais pour un visage."]);

/* ---------- SC8.9.9 Questions sur la réfraction découlant de problèmes pratiques ---------- */

E("s8f-u3-fish-question", 3, ["SC8.9.9"], 2, "var", varset([
  function () {
    return mcq("Un pêcheur remarque qu'une truite sous l'eau n'est jamais tout à fait là où elle semble être. Quelle question transforme ce problème pratique en une enquête sur la réfraction?",
      "De combien la profondeur apparente d'un objet sous l'eau diffère-t-elle de sa profondeur réelle, et la différence grandit-elle quand l'angle de vue change?",
      ["Pourquoi les truites qui vivent dans un étang apprennent-elles, au cours d'une seule saison, à éviter d'être attrapées par les gens qui viennent y pêcher?",
       "La pêche à la truite dans un étang est-elle meilleure tôt le matin, avant que le soleil soit haut, ou plus tard le soir de la même journée de pêche?",
       "Qui a été la première personne dans l'histoire consignée à remarquer que les poissons sous l'eau d'un étang semblent déplacés de là où ils sont vraiment?"],
      "Le problème pratique est le déplacement. La version étudiable le mesure (apparente contre réelle) et fait varier une condition (l'angle de vue). Le bâtonnet plié et le poisson sont les exemples du guide de questions sur la réfraction découlant de problèmes pratiques.",
      {});
  }
]), ["L'enquête doit mesurer le déplacement, pas seulement l'admirer.", "Apparente contre réelle, avec une condition variée."]);

E("s8f-u3-coin-question", 3, ["SC8.9.9"], 1, "var", varset([
  function () {
    return mcq("Une pièce de monnaie au fond d'une tasse opaque vide est cachée par le bord de la tasse. Quand on verse de l'eau, la pièce apparaît, comme si elle avait flotté vers le haut. Quelle question la classe devrait-elle étudier à partir de cette démonstration?",
      "Comment l'eau change-t-elle le trajet de la lumière de la pièce pour qu'elle atteigne l'œil par-dessus le bord?",
      ["Pourquoi la pièce au fond de la tasse n'a-t-elle pas vraiment flotté vers le haut quand l'eau a été versée?",
       "De quel genre de métal la pièce au fond de la tasse est-elle faite, et où a-t-elle été frappée?",
       "Combien d'eau, au total, la tasse opaque utilisée dans la démonstration contient-elle quand elle est pleine?"],
      "Le casse-tête de la démonstration est optique : la pièce n'a pas bougé, le trajet de sa lumière oui. La question étudiable vise la réfraction qui courbe la lumière à la surface, le même effet de position apparente que le bâtonnet plié et le poisson.",
      {});
  }
]), ["La pièce est restée en place. Qu'est-ce qui a voyagé différemment?", "Le trajet de la lumière est l'enquête."]);

E("s8f-u3-cr-design-refraction", 3, ["SC8.9.9"], 3, "var", varset([
  function () {
    return textq("Conçois une expérience pour déterminer si un rayon se courbe davantage quand il entre dans l'huile végétale ou dans l'alcool à friction depuis l'air. Ton plan doit énoncer la question testée, la méthode (y compris comment le trajet du rayon sera consigné), la variable que tu changeras, la variable que tu mesureras, au moins deux variables que tu garderas les mêmes, et comment tu décideras quel liquide courbe le rayon davantage. (4 points)",
      ["une question testable claire comparant les deux liquides", "une méthode de traçage de rayon avec des points, un contour et une règle, et la normale tracée", "le liquide changé, l'angle de réfraction mesuré", "l'angle d'incidence et l'équipement gardés les mêmes, avec la règle de décision énoncée"],
      "<b>Réponse modèle:</b> Question : au même angle d'incidence, un rayon depuis l'air se courbe-t-il davantage en entrant dans l'huile végétale ou dans l'alcool à friction? Méthode : remplir un contenant transparent rectangulaire du premier liquide, envoyer un seul rayon d'une boîte à rayons dedans à 40 degrés de la normale, marquer deux points au milieu du faisceau incident et deux dans le faisceau réfracté, tracer le contour du contenant, retirer l'équipement, joindre les points à la règle, tracer la normale au point de la frontière, et mesurer l'angle de réfraction. Répéter à l'identique avec le deuxième liquide. La variable changée est le liquide. La variable mesurée est l'angle de réfraction. Gardés les mêmes : l'angle d'incidence (40 degrés), la boîte à rayons et le contenant, et la procédure de mesure. Décision : le liquide avec le plus petit angle de réfraction a courbé le rayon davantage vers la normale, donc c'est le courbeur le plus fort; répéter chaque liquide deux fois pour vérifier que les mesures concordent.<br><br><b>Points d'attribution:</b> 1 point pour la question testable et une méthode de traçage de rayon praticable. 1 point pour les variables changée et mesurée nommées correctement. 1 point pour au moins deux variables gardées les mêmes. 1 point pour la règle de décision (plus petit angle de réfraction veut dire plus de courbure) avec une étape de répétabilité.",
      {});
  }
]), ["Construis-la sur la méthode du laboratoire de base, puis rends explicites les rôles des variables et la règle de décision.", "Plus petit angle de réfraction à la même incidence veut dire plus de courbure : c'est la règle du verdict."]);

/* ---------- SC8.9.10 Estimer les angles d'incidence et de réfraction ---------- */

E("s8f-u3-estimate-bend", 3, ["SC8.9.10"], 2, "gen", function () {
  var cases = [
    { mode: "toward", q: "Le diagramme montre un rayon qui passe de l'air dans l'eau. Quelle estimation de l'angle de réfraction, comparé à l'angle d'incidence, est correcte?", k: "L'angle de réfraction est plus petit : en entrant dans le milieu plus dense, le rayon se courbe vers la normale", w: ["L'angle de réfraction est le plus grand des deux : le rayon s'écarte de la normale en entrant dans l'eau", "Les deux angles sont égaux l'un à l'autre : la réfraction à une surface ne change jamais l'angle d'un rayon", "L'angle de réfraction est de zéro degré : le rayon s'arrête à la surface et ne va pas plus loin dans l'eau"] },
    { mode: "away", q: "Le diagramme montre un rayon qui passe de l'eau dans l'air. Quelle estimation de l'angle de réfraction, comparé à l'angle d'incidence, est correcte?", k: "L'angle de réfraction est plus grand : en quittant le milieu plus dense, le rayon s'écarte de la normale", w: ["L'angle de réfraction est le plus petit des deux : le rayon se courbe vers la normale en quittant l'eau", "Les deux angles sont égaux l'un à l'autre : le rayon continue parfaitement droit à travers la frontière", "L'angle de réfraction est de 90 degrés : en quittant l'eau, le rayon court le long de la surface elle-même"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "Estimer les angles de réfraction commence par la direction, et la direction suit la densité. En entrant dans un milieu de plus grande densité, la lumière ralentit et se courbe vers la normale, donc l'angle de réfraction est le plus petit. En partant vers un milieu moins dense, elle accélère et s'écarte, donc l'angle de réfraction est le plus grand. La ligne pointillée dans le diagramme est le trajet que le rayon aurait pris sans courbure.",
    {});
  q.figure = s8fRefractSVG(c.mode, true);
  return q;
}, ["La direction d'abord : vers la normale en entrant dans plus dense, loin d'elle en en sortant.", "La ligne pointillée est le trajet sans courbure; le vrai rayon se trouve du côté de la normale, ou du côté éloigné."]);

E("s8f-u3-estimate-compare", 3, ["SC8.9.10"], 3, "var", varset([
  function () {
    return mcq("Deux rayons frappent une surface d'eau depuis l'air, l'un à 20 degrés d'incidence et l'autre à 55 degrés. Une élève estime les deux angles de réfraction. Quel patron d'estimation est sain?",
      "Les deux angles de réfraction sont plus petits que leurs angles d'incidence, et le rayon à 55 degrés se courbe de plus de degrés que le rayon à 20 degrés",
      ["Les deux angles de réfraction estimés sont plus grands que les angles d'incidence desquels ils sont partis au début de l'estimation de l'élève",
       "Le rayon à 20 degrés se courbe de plus de degrés que le rayon à 55 degrés, parce que les rayons qui arrivent à des angles faibles se courbent le plus",
       "Aucun des deux rayons ne se courbe à la surface du tout, parce que tous les deux commencent par voyager dans l'air avant d'atteindre l'eau"],
      "En entrant dans l'eau, chaque rayon se courbe vers la normale, donc chaque angle de réfraction est plus petit que son angle d'incidence. La quantité de courbure grandit avec l'angle d'incidence : un rayon qui arrive presque le long de la normale se courbe à peine, et un rayon à pic se courbe le plus, ce que les observations à angles changeants du laboratoire de base montrent.",
      {});
  }
]), ["Deux règles se combinent : toujours vers la normale ici, et plus de courbure à une incidence plus à pic.", "Un rayon presque normal est presque sans courbure; cela ancre la comparaison."]);

E("s8f-u3-cr-estimate", 3, ["SC8.9.10"], 2, "var", varset([
  function () {
    return textq("Pour chaque traversée, estime si l'angle de réfraction sera plus grand ou plus petit que l'angle d'incidence, et justifie l'estimation : (a) un rayon voyageant de l'air dans un bloc de verre à 45 degrés d'incidence; (b) le même rayon voyageant du verre de retour dans l'air à 30 degrés d'incidence à l'intérieur du verre. (3 points)",
      ["dans le verre, l'angle de réfraction est plus petit, se courbant vers la normale", "hors du verre, l'angle de réfraction est plus grand, s'écartant de la normale", "des justifications liées à la densité et au changement de vitesse"],
      "<b>Réponse modèle:</b> (a) Le verre est plus dense que l'air, donc le rayon ralentit en entrant et se courbe vers la normale : l'angle de réfraction est plus petit que 45 degrés. (b) En quittant le verre pour l'air moins dense, le rayon accélère et s'écarte de la normale : l'angle de réfraction est plus grand que 30 degrés. Les deux estimations sont la même règle lue en directions opposées : la courbure suit le changement de densité à la frontière, vers la normale en entrant dans le milieu plus dense et loin d'elle en le quittant.<br><br><b>Points d'attribution:</b> 1 point pour la première estimation avec sa justification. 1 point pour la deuxième estimation avec sa justification. 1 point pour lier les deux au changement de densité et de vitesse à la frontière.",
      {});
  }
]), ["Une règle, lue à l'endroit puis à l'envers. La densité décide de la direction les deux fois.", "Vers en entrant dans plus dense; loin en entrant dans moins dense."]);

/* ---------- SC8.9.12 Prédire l'effet des milieux sur l'angle de réfraction ---------- */

E("s8f-u3-predict-media", 3, ["SC8.9.12"], 3, "gen", function () {
  var cases = [
    { q: "Un rayon entre dans trois liquides depuis l'air au même angle d'incidence : l'eau, l'huile végétale et l'alcool à friction, les trois liquides nommés dans le guide pour cet indicateur. Quelle prédiction est saine?", k: "Le rayon se courbe davantage vers la normale dans l'huile et l'alcool à friction que dans l'eau, donc leurs angles de réfraction sont plus petits", w: ["Le rayon se courbe le plus dans l'eau des trois liquides, parce que l'eau est la moins dense des trois liquides testés dans l'expérience de la classe", "Les trois liquides courbent le rayon d'exactement la même quantité, parce que l'angle d'incidence est le même pour les trois liquides de l'ensemble", "Le rayon s'écarte de la normale en entrant dans chacun des liquides plus denses depuis l'air au-dessus d'eux, à chaque traversée de la surface"] },
    { q: "Un élève prédit qu'un rayon entrant dans le glycérol (plus dense que l'eau) depuis l'air aura un plus grand angle de réfraction que le même rayon entrant dans l'eau. Évalue la prédiction.", k: "Elle est à l'envers : le milieu plus dense courbe le rayon davantage vers la normale, donnant un plus petit angle de réfraction", w: ["La prédiction est correcte : les milieux plus denses que l'eau donnent toujours de plus grands angles de réfraction à un rayon qui y entre depuis l'air", "La prédiction de l'élève ne peut pas être évaluée du tout sans d'abord connaître la température des deux liquides dans le laboratoire de la classe", "La prédiction est correcte telle qu'énoncée, parce que le glycérol est un liquide plus épais et pousse le rayon entrant plus largement de côté"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La prédiction suit la règle du guide : à la même incidence, un milieu dont l'indice de réfraction est plus élevé courbe le rayon davantage vers la normale, ce qui signifie un plus petit angle de réfraction. Le guide nomme l'ensemble de test lui-même : l'huile végétale, l'eau et l'alcool à friction. L'huile a l'indice le plus élevé des trois et l'eau le plus faible; l'alcool à friction se place entre les deux, donc l'huile et l'alcool courbent le rayon plus que l'eau.",
    {});
}, ["Plus de densité, plus de courbure, plus petit angle : enchaîne les trois.", "La comparaison se fait à incidence égale; seul le milieu change."]);

E("s8f-u3-cr-predict", 3, ["SC8.9.12"], 2, "var", varset([
  function () {
    return textq("On envoie un rayon de l'air dans un liquide clair inconnu à 50 degrés d'incidence, et l'angle de réfraction se mesure à 31 degrés. Pour l'eau à la même incidence, l'angle de réfraction est de 35 degrés. Prédis, avec ton raisonnement, si le liquide inconnu est plus dense ou moins dense que l'eau, et prédis ce qui arriverait à l'angle de réfraction si l'expérience était répétée avec le rayon entrant à 30 degrés d'incidence à la place. (3 points)",
      ["le liquide inconnu est plus dense que l'eau, parce qu'il a courbé le rayon davantage vers la normale", "un plus petit angle de réfraction à la même incidence signifie une courbure plus forte et une plus grande densité", "à 30 degrés d'incidence, l'angle de réfraction rétrécirait davantage, restant sous l'angle d'incidence"],
      "<b>Réponse modèle:</b> Le liquide inconnu a courbé le rayon plus que l'eau : à la même incidence de 50 degrés, son angle de réfraction (31 degrés) est plus petit que celui de l'eau (35 degrés), ce qui signifie que le rayon se trouve plus près de la normale. Une courbure plus forte vers la normale est la signature d'un milieu plus dense, donc le liquide inconnu est plus dense que l'eau. À 30 degrés d'incidence, le rayon arrive plus près de la normale, donc il se courbe moins en degrés absolus; l'angle de réfraction serait plus petit que 31 degrés mais toujours plus petit que l'angle d'incidence de 30 degrés, parce qu'entrer dans un milieu plus dense courbe toujours le rayon vers la normale.<br><br><b>Points d'attribution:</b> 1 point pour la prédiction de densité (plus dense que l'eau). 1 point pour le raisonnement à partir du plus petit angle de réfraction à incidence égale. 1 point pour la deuxième prédiction (l'angle de réfraction diminue, restant sous l'angle d'incidence).",
      {});
  }
]), ["Compare à incidence égale : plus petit angle de réfraction veut dire plus de courbure veut dire plus dense.", "Puis applique la même règle à une incidence moins profonde."]);

E("s8f-u3-cr-identify-medium", 3, ["SC8.9.12"], 3, "var", varset([
  function () {
    return textq("Une technicienne en sciences judiciaires note que le degré de réfraction peut aider à identifier un matériau inconnu. Un rayon entrant dans un fragment clair depuis l'air à 60 degrés d'incidence se réfracte à 35 degrés; le même test sur du verre connu donne 35 degrés, et sur un plastique clair connu donne 39 degrés. Énonce la conclusion de la technicienne, explique le raisonnement à partir de la règle de courbure, et nomme une chose que la technicienne doit garder la même dans tous les tests pour que la conclusion soit juste. (3 points)",
      ["le fragment correspond au verre, pas au plastique, dans ce test", "une incidence égale avec un angle de réfraction égal signifie une courbure égale, la signature d'une correspondance de densité", "l'angle d'incidence (et le montage du rayon) gardé le même"],
      "<b>Réponse modèle:</b> Le fragment se comporte exactement comme le verre connu : à la même incidence de 60 degrés, les deux courbent le rayon à un angle de réfraction de 35 degrés, tandis que le plastique le courbe moins (39 degrés). La force de courbure à une frontière est une propriété du milieu, fixée par sa densité et son effet réfractif : plus le rayon se courbe vers la normale, plus l'effet du milieu est grand. Correspondant exactement à la courbure du verre, et différant de celle du plastique, le fragment est identifié comme du verre, sur cette preuve. La comparaison est juste seulement parce que l'angle d'incidence a été gardé le même dans chaque test (avec la même boîte à rayons et le même montage); change l'incidence et les angles de réfraction changeraient pour chaque matériau.<br><br><b>Points d'attribution:</b> 1 point pour la conclusion (le fragment correspond au verre). 1 point pour le raisonnement (une courbure égale à une incidence égale identifie le milieu; le plastique courbe moins). 1 point pour la condition contrôlée (même angle d'incidence et même montage).",
      {});
  }
]), ["Identifier veut dire correspondre à la courbure d'un matériau connu dans des conditions identiques.", "Même incidence en entrée, comparer la réfraction en sortie."]);

/* ---------- SC8.9.13 Clé de classification des lentilles ---------- */

E("s8f-u3-lens-key", 3, ["SC8.9.13"], 1, "var", varset([
  function () {
    return mcq("Une clé de classification sert à identifier une lentille inconnue. Quelle question ouvre correctement une clé des deux types de lentilles?",
      "La lentille est-elle plus épaisse au centre ou plus épaisse aux bords? (Épaisse au centre : convergente; épaisse aux bords : divergente)",
      ["La lentille est-elle faite de verre ou de plastique clair? (En verre : convergente; en plastique : divergente, dans chaque cas connu)",
       "La lentille sert-elle dans des lunettes ou dans un appareil photo? (Lunettes : divergente; appareil photo : convergente, toujours)",
       "La lentille est-elle grande ou petite dans la main? (Grande : convergente; petite : divergente, selon la clé des lentilles)"],
      "Une clé des lentilles commence par le trait de forme qui divise les deux types : l'épaisseur relative du centre et des bords. Une lentille plus épaisse au centre fait converger les rayons parallèles; une lentille plus épaisse aux bords les fait diverger. Le matériau, l'usage et la taille se retrouvent des deux côtés de la division et ne peuvent pas ouvrir la clé.",
      {});
  }
]), ["Une clé commence par le trait qui coupe l'ensemble en deux.", "L'épaisseur d'abord : centre épais ou bords épais."]);

E("s8f-u3-lens-key-apply", 3, ["SC8.9.13"], 2, "var", varset([
  function () {
    return mcq("Un élève applique la clé des lentilles à une lentille inconnue. Étape 1 : la lentille est plus épaisse au centre qu'aux bords. Étape 2, une vérification : un faisceau parallèle envoyé à travers elle se rassemble en un point de l'autre côté. À quelle classification la clé mène-t-elle?",
      "Une lentille convergente; l'étape 1 la place du côté convergent de la clé, et la vérification le confirme, parce que rassembler les rayons parallèles est ce que les lentilles convergentes font",
      ["Une lentille divergente; l'étape 1 la place du côté divergent de la clé, et la vérification le confirme, parce que rassembler les rayons est ce que les lentilles divergentes font aux faisceaux",
       "Une lentille divergente; l'étape 2 renverse l'étape 1, parce que le comportement des rayons décide toujours seul de la classification d'une lentille, quelle que soit sa forme au centre",
       "Une lentille convergente; mais la vérification contredit la clé, parce que les lentilles convergentes écartent les rayons parallèles au lieu de les rassembler en un point de l'autre côté"],
      "La forme et le comportement concordent pour une lentille convergente : plus épaisse au centre, et les rayons parallèles rassemblés à travers un foyer. La vérification de l'étape 2 existe parce que la forme et le comportement sont les deux faces du même trait dans la clé; quand ils concordent, la classification est sûre.",
      {});
  }
]), ["Suis la clé, puis vérifie la classification contre ce que la lentille fait aux rayons.", "Centre épais et rayons rassemblés pointent dans la même direction."]);

E("s8f-u3-lens-key-evidence", 3, ["SC8.9.13"], 3, "var", varset([
  function () {
    return mcq("Pour classer une lentille inconnue, une élève la tient entre une fenêtre lointaine et une feuille de papier. Une image nette et inversée de la fenêtre apparaît sur le papier. Elle conclut que la lentille est convergente. Évalue sa conclusion et l'étape décisive de la clé.",
      "La conclusion est saine : seule une lentille convergente peut former une image réelle sur un écran, donc le test de l'image tranche la classification même sans mesurer la forme",
      ["La conclusion ne tient pas : une lentille divergente forme aussi des images nettes de fenêtres lointaines sur du papier quand on la tient à la bonne distance du papier blanc",
       "La conclusion est saine mais pour la mauvaise raison : la lentille est convergente parce que l'image sur le papier est inversée, et l'inversion est le trait décisif de la clé des lentilles",
       "La conclusion ne peut pas être évaluée : la classification d'une lentille exige toujours de mesurer son épaisseur au centre avec une règle avant qu'un test quelconque compte"],
      "Le test de l'écran est décisif parce qu'il repose sur le comportement définissant : une lentille convergente rassemble les rayons pour former une image réelle qui peut tomber sur du papier; une lentille divergente écarte les rayons et ne forme jamais une telle image, à aucune distance. L'inversion accompagne l'image réelle mais ne décide rien seule; la formation de l'image sur l'écran est l'étape qui tranche.",
      {});
  }
]), ["Demande quel type de lentille peut faire ce que l'expérience montre.", "Une image réelle sur un écran est impossible pour une lentille divergente."]);

/* ---------- SC8.9.14 Estimer la distance focale d'une lentille convexe ---------- */

E("s8f-u3-focal-procedure", 3, ["SC8.9.14"], 2, "var", varset([
  function () {
    return mcq("Quelle procédure estime correctement la distance focale d'une lentille convergente?",
      "Tenir la lentille entre une fenêtre lointaine et une feuille de papier, déplacer le papier jusqu'à ce que l'image de la fenêtre soit nette, puis mesurer la distance de la lentille au papier",
      ["Tenir la lentille juste au-dessus d'un texte imprimé et mesurer la distance à laquelle les lettres ont l'air les plus grandes à travers la lentille tenue au-dessus de la page",
       "Envoyer un faisceau d'une lampe de poche à travers la lentille sur un mur et mesurer la largeur de la tache de lumière brillante que la lentille projette sur le mur",
       "Placer la lentille sur une règle et mesurer son diamètre, puis diviser le diamètre par deux pour obtenir la distance focale de la lentille en centimètres"],
      "L'estimation utilise un objet lointain parce que ses rayons arrivent presque parallèles : une lentille convergente les rassemble à son foyer, donc l'image nette de la fenêtre se forme au plan focal, et la distance lentille-papier à ce moment-là est la distance focale. La loupe au-dessus d'un texte mesure un grossissement confortable, pas un foyer, et une tache de lampe de poche n'est pas une image nette.",
      {});
  }
]), ["Un objet lointain envoie des rayons presque parallèles; leur point de rencontre net est le foyer.", "Image nette d'abord, mesure ensuite."]);

E("s8f-u3-focal-judge", 3, ["SC8.9.14"], 2, "var", varset([
  function () {
    return mcq("Un élève estime la distance focale d'une lentille convergente en la tenant à 8 cm au-dessus d'un livre et en notant que le texte a l'air net et agrandi à cette distance; il rapporte 8 cm comme distance focale. Évalue l'estimation.",
      "Elle n'est pas valide : le texte proche n'envoie pas de rayons parallèles, et une vue nette et agrandie à travers la lentille n'est pas une image formée au foyer; l'estimation exige l'image nette d'un objet lointain sur un écran",
      ["Elle est valide : toute distance à laquelle une lentille donne une vue nette de quelque chose est par définition la distance focale de cette lentille, quel que soit l'objet regardé à travers elle",
       "Elle est valide : le grossissement maximal se produit exactement au foyer, donc la distance de la vue la plus grande et la plus nette au-dessus du livre est la distance focale de la lentille",
       "Elle ne peut pas être évaluée : les distances focales des lentilles convergentes ne peuvent jamais être estimées par une procédure de classe, seulement mesurées par leurs fabricants"],
      "Le foyer est défini par les rayons parallèles : la distance à laquelle la lentille rassemble les rayons d'un objet lointain en une image nette. Regarder un texte proche à travers la lentille est l'usage en loupe, où la netteté dépend de l'œil autant que de la lentille, et aucune image ne se forme sur un écran. L'estimation de l'élève mesure une distance de lecture confortable, pas la distance focale.",
      {});
  }
]), ["Demande d'où viennent les rayons : parallèles d'un objet lointain, ou étalés d'une page proche?", "Pas d'image sur un écran, pas de mesure du foyer."]);

/* Exclusion de composition (Nov 16, 2026) : les questions nommées ici
   portent noCompose, et composeExam les laisse hors de chaque examen
   composé (tests d'unité, révisions de mi-parcours et finales,
   compositions personnalisées), tandis que les tirages de pratique,
   les vérifications de préalables et les choix explicites de
   l'enseignant les gardent. La question de conception d'une
   investigation est réservée à la pratique et aux choix de
   l'enseignant. */
var NO_COMPOSE_U3 = {
  "s8f-u3-cr-design-refraction": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });

/* Ajouts de l'allongement (20 nov. 2026). */
E("s8f-u3-cr-refraction-expliquer", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return textq("Une paille plongée dans un verre d'eau semble brisée à la surface : la partie immergée paraît déplacée par rapport à la partie hors de l'eau. Explique cette apparence à l'aide de la réfraction : dis ce qui arrive à la lumière à la surface, pourquoi l'œil est trompé, et ce qui se passerait si le verre contenait de l'huile végétale, plus réfringente que l'eau. (3 points)",
      ["La lumière ralentit en passant de l'eau à l'air et change de direction à la surface."],
      "Points de notation (3) : 1 point pour le mécanisme (la lumière qui sort de l'eau change de vitesse et de direction à la surface : c'est la réfraction; en entrant dans l'air, elle s'écarte de la normale). 1 point pour l'illusion (l'œil suppose que la lumière voyage en ligne droite, donc il prolonge les rayons en ligne droite et voit la partie immergée à une position déplacée et moins profonde). 1 point pour la prédiction (dans l'huile, plus réfringente, la déviation serait plus forte et la paille paraîtrait encore plus déplacée). Réponse modèle : Les rayons venant de la paille immergée se réfractent à la surface; l'œil les prolonge tout droit et voit la paille ailleurs qu'elle n'est. <b>Dans l'huile, la réfraction plus forte accentuerait encore le déplacement apparent</b>.", {});
  },
  function () {
    return textq("Un poisson vu du quai semble toujours plus près de la surface qu'il ne l'est vraiment, et les pêcheurs à la lance visent plus bas que le poisson aperçu. Explique les deux faits à l'aide de la réfraction : dis ce qui arrive à la lumière à la surface et pourquoi la position apparente diffère de la position réelle. (3 points)",
      ["La lumière venant du poisson change de direction en passant de l'eau à l'air."],
      "Points de notation (3) : 1 point pour le mécanisme (la lumière venant du poisson s'écarte de la normale en sortant de l'eau, car elle accélère dans l'air). 1 point pour la position apparente (l'œil prolonge les rayons en ligne droite, donc il place le poisson plus haut, c'est-à-dire moins profond, qu'il ne l'est). 1 point pour le conseil de visée (il faut viser sous le poisson aperçu, là où il se trouve réellement). Réponse modèle : Les rayons réfractés à la surface font paraître le poisson moins profond qu'en réalité. <b>Viser plus bas que l'image aperçue compense exactement ce déplacement apparent</b>.", {});
  },
  function () {
    return textq("Le fond d'une piscine semble moins profond vu du bord qu'il ne l'est en réalité, et les lignes peintes au fond paraissent onduler quand l'eau bouge. Explique les deux apparences à l'aide de la réfraction. (3 points)",
      ["La lumière venant du fond change de direction à la surface de l'eau."],
      "Points de notation (3) : 1 point pour le mécanisme (la lumière venant du fond s'écarte de la normale en passant de l'eau à l'air). 1 point pour la profondeur apparente (l'œil prolonge les rayons en ligne droite et reconstruit le fond plus près de la surface qu'il ne l'est). 1 point pour les lignes qui ondulent (la surface agitée change sans cesse l'angle des rayons réfractés, donc la position apparente des lignes bouge sans arrêt). Réponse modèle : Le fond paraît relevé parce que les rayons réfractés sont prolongés tout droit par l'œil. <b>Quand la surface bouge, la réfraction change d'un instant à l'autre et les lignes semblent onduler</b>.", {});
  }
]), ["La lumière change de vitesse à la surface, et ce changement la dévie.", "L'œil prolonge les rayons en ligne droite et reconstruit l'objet au mauvais endroit."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8f-u3-cr-em-usages
   closes Unit 3 Test 1 (4 marks, Level 2); s8f-u3-cr-image-miroir
   closes Unit 3 Test 2 (4 marks, Level 2); s8f-u3-cr-refraction-bol
   closes Unit 3 Test 3 (4 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8f-u3-cr-em-usages", 3, ["SC8.7.2"], 2, "var", varset([
  function () {
    return textq("Trois technologies sont utilisées dans une maison : une télécommande de télévision, un appareil de radiographie à l'hôpital et un poste qui reçoit la radiodiffusion. Pour chacune des trois, nomme le type de rayonnement électromagnétique utilisé et la propriété qui rend ce type approprié à cet usage. (3 points) Ensuite, classe les types utilisés par la télécommande et par l'appareil de radiographie selon leur fréquence, de la plus basse à la plus haute. (1 point) (4 points)",
      ["la télécommande utilise l'infrarouge, invisible et facile à diriger sur de courtes distances", "la radiographie utilise les rayons X, qui traversent les tissus mous mais sont absorbés davantage par les os", "la radiodiffusion utilise les ondes radio, qui voyagent sur de longues distances", "l'infrarouge a une fréquence plus basse que les rayons X"],
      "<b>Réponse modèle :</b> La télécommande utilise le rayonnement infrarouge : il est invisible, donc il ne dérange pas, et il se dirige facilement en faisceau sur la courte distance entre la télécommande et le téléviseur pour transporter le signal. L'appareil de radiographie utilise les rayons X : leur grande énergie leur permet de traverser les tissus mous du corps, mais les os les absorbent davantage, ce qui produit une image contrastée des os. La radiodiffusion utilise les ondes radio : leurs grandes longueurs d'onde voyagent sur de longues distances et contournent les obstacles, ce qui permet de transporter l'information jusqu'à de nombreux récepteurs. Pour le classement demandé, l'infrarouge a une fréquence plus basse que les rayons X, qui ont une fréquence beaucoup plus haute.<br><br><b>Points d'attribution :</b> 1 point pour la télécommande (l'infrarouge, avec une propriété appropriée comme son invisibilité ou son faisceau dirigeable sur de courtes distances). 1 point pour la radiographie (les rayons X, qui traversent les tissus mous et sont absorbés davantage par les os). 1 point pour la radiodiffusion (les ondes radio, qui voyagent sur de longues distances). 1 point pour le classement par fréquence (l'infrarouge plus bas que les rayons X).",
      {});
  },
  function () {
    return textq("Trois technologies sont utilisées dans une école : un four à micro-ondes à la cafétéria, une lampe ultraviolette qui stérilise du matériel de laboratoire et un réseau de fibres optiques qui transporte l'Internet. Pour chacune des trois, nomme le type de rayonnement électromagnétique utilisé et la propriété qui rend ce type approprié à cet usage. (3 points) Ensuite, classe les types utilisés par le four et par la lampe selon leur longueur d'onde, de la plus grande à la plus courte. (1 point) (4 points)",
      ["le four utilise les micro-ondes, absorbées par l'eau et les graisses des aliments, dont l'énergie devient de la chaleur", "la lampe utilise l'ultraviolet, assez énergétique pour tuer les microorganismes", "les fibres optiques utilisent la lumière visible, guidée le long de la fibre par réflexion totale interne", "les micro-ondes ont une plus grande longueur d'onde que l'ultraviolet"],
      "<b>Réponse modèle :</b> Le four à micro-ondes utilise les micro-ondes : elles sont absorbées par l'eau, les graisses et les sucres des aliments, et leur énergie se transforme en chaleur qui cuit les aliments. La lampe de stérilisation utilise le rayonnement ultraviolet : il transporte assez d'énergie pour endommager et tuer les microorganismes sur le matériel, ce qui le stérilise sans chaleur. Le réseau de fibres optiques utilise la lumière visible : elle peut être guidée le long de la fibre par réflexion totale interne, ce qui transporte l'information rapidement et avec très peu de perte. Pour le classement demandé, les micro-ondes ont une plus grande longueur d'onde que l'ultraviolet.<br><br><b>Points d'attribution :</b> 1 point pour le four (les micro-ondes, absorbées par l'eau et les graisses des aliments et transformées en chaleur). 1 point pour la lampe (l'ultraviolet, assez énergétique pour tuer les microorganismes). 1 point pour les fibres optiques (la lumière visible, guidée par réflexion totale interne avec peu de perte). 1 point pour le classement par longueur d'onde (les micro-ondes plus grandes que l'ultraviolet).",
      {});
  },
  function () {
    return textq("Trois technologies sont utilisées dans une ville : un traitement de radiothérapie contre le cancer, une télécommande qui ouvre une porte de garage et un émetteur de radiodiffusion. Pour chacune des trois, nomme le type de rayonnement électromagnétique utilisé et la propriété qui rend ce type approprié à cet usage. (3 points) Ensuite, classe les types utilisés par la radiothérapie et par la télécommande selon leur fréquence, de la plus basse à la plus haute. (1 point) (4 points)",
      ["la radiothérapie utilise les rayons gamma, très énergétiques et pénétrants, qui détruisent les cellules cancéreuses", "la télécommande utilise l'infrarouge, invisible et facile à diriger sur de courtes distances", "la radiodiffusion utilise les ondes radio, qui voyagent sur de longues distances", "l'infrarouge a une fréquence plus basse que les rayons gamma"],
      "<b>Réponse modèle :</b> La radiothérapie utilise les rayons gamma : ils sont les plus énergétiques du spectre et très pénétrants, donc ils atteignent une tumeur à l'intérieur du corps et détruisent les cellules cancéreuses. La télécommande utilise le rayonnement infrarouge : il est invisible, donc il ne dérange pas, et il se dirige facilement en faisceau sur la courte distance jusqu'au récepteur de la porte. L'émetteur de radiodiffusion utilise les ondes radio : leurs grandes longueurs d'onde voyagent sur de longues distances et contournent les obstacles, ce qui permet de transporter l'information jusqu'à de nombreux récepteurs. Pour le classement demandé, l'infrarouge a une fréquence plus basse que les rayons gamma, qui ont la fréquence la plus haute du spectre.<br><br><b>Points d'attribution :</b> 1 point pour la radiothérapie (les rayons gamma, très énergétiques et pénétrants, qui détruisent les cellules cancéreuses). 1 point pour la télécommande (l'infrarouge, avec une propriété appropriée comme son invisibilité ou son faisceau dirigeable sur de courtes distances). 1 point pour la radiodiffusion (les ondes radio, qui voyagent sur de longues distances). 1 point pour le classement par fréquence (l'infrarouge plus bas que les rayons gamma).",
      {});
  },
  function () {
    return textq("Trois technologies sont utilisées dans une clinique : un appareil de radiographie, un four à micro-ondes dans la salle du personnel et une lampe ultraviolette qui stérilise des instruments. Pour chacune des trois, nomme le type de rayonnement électromagnétique utilisé et la propriété qui rend ce type approprié à cet usage. (3 points) Ensuite, classe les types utilisés par l'appareil de radiographie et par la lampe selon leur longueur d'onde, de la plus courte à la plus grande. (1 point) (4 points)",
      ["la radiographie utilise les rayons X, qui traversent les tissus mous mais sont absorbés davantage par les os", "le four utilise les micro-ondes, absorbées par l'eau et les graisses des aliments, dont l'énergie devient de la chaleur", "la lampe utilise l'ultraviolet, assez énergétique pour tuer les microorganismes", "les rayons X ont une longueur d'onde plus courte que l'ultraviolet"],
      "<b>Réponse modèle :</b> L'appareil de radiographie utilise les rayons X : leur grande énergie leur permet de traverser les tissus mous du corps, mais les os les absorbent davantage, ce qui produit une image contrastée des os. Le four à micro-ondes utilise les micro-ondes : elles sont absorbées par l'eau, les graisses et les sucres des aliments, et leur énergie se transforme en chaleur qui cuit les aliments. La lampe de stérilisation utilise le rayonnement ultraviolet : il transporte assez d'énergie pour endommager et tuer les microorganismes sur les instruments, ce qui les stérilise sans chaleur. Pour le classement demandé, les rayons X ont une longueur d'onde plus courte que l'ultraviolet.<br><br><b>Points d'attribution :</b> 1 point pour la radiographie (les rayons X, qui traversent les tissus mous et sont absorbés davantage par les os). 1 point pour le four (les micro-ondes, absorbées par l'eau et les graisses des aliments et transformées en chaleur). 1 point pour la lampe (l'ultraviolet, assez énergétique pour tuer les microorganismes). 1 point pour le classement par longueur d'onde (les rayons X plus courts que l'ultraviolet).",
      {});
  }
]), ["Travaille technologie par technologie : le type d'abord, puis la propriété qui le rend utile.", "Pour le classement, replace les deux types sur le spectre complet avant de répondre."]);

E("s8f-u3-cr-image-miroir", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("Un rayon de lumière frappe un miroir plan avec un angle d'incidence de 25 degrés, mesuré à partir de la normale. (a) Énonce l'angle de réflexion et la règle qui le donne. (1 point) (b) Décris le trajet du rayon réfléchi par rapport à la normale. (1 point) (c) Une flèche se tient devant le même miroir. Décris deux caractéristiques de l'image de la flèche formée par le miroir. (2 points) (4 points)",
      ["l'angle de réflexion est 25 degrés, selon la loi de la réflexion", "le rayon réfléchi repart de l'autre côté de la normale, au même angle de 25 degrés", "l'image de la flèche a la même taille que la flèche", "l'image se trouve aussi loin derrière le miroir que la flèche est devant"],
      "<b>Réponse modèle :</b> (a) L'angle de réflexion est 25 degrés. La règle est la loi de la réflexion : l'angle d'incidence est égal à l'angle de réflexion, les deux mesurés à partir de la normale. (b) Le rayon réfléchi repart du côté opposé de la normale par rapport au rayon incident, en faisant le même angle de 25 degrés avec la normale : son trajet est le symétrique du trajet incident par rapport à la normale, et il s'éloigne de la surface du miroir. (c) L'image de la flèche a la même taille que la flèche elle-même. Elle se trouve aussi loin derrière le miroir que la flèche se trouve devant lui. (Une image virtuelle ou une inversion latérale, correctement décrite, vaut aussi un des deux points de cette partie.)<br><br><b>Points d'attribution :</b> 1 point pour l'angle de réflexion (25 degrés) avec la loi de la réflexion énoncée. 1 point pour le trajet réfléchi décrit (de l'autre côté de la normale, au même angle, en s'éloignant du miroir). 1 point pour une première caractéristique correcte de l'image (la même taille que l'objet). 1 point pour une deuxième caractéristique correcte (aussi loin derrière le miroir que l'objet est devant; une image virtuelle ou inversée latéralement est aussi acceptée).",
      {});
  },
  function () {
    return textq("Un rayon de lumière frappe un miroir plan avec un angle d'incidence de 40 degrés, mesuré à partir de la normale. (a) Énonce l'angle de réflexion et la règle qui le donne. (1 point) (b) Décris le trajet du rayon réfléchi par rapport à la normale. (1 point) (c) Une lettre majuscule se tient devant le même miroir. Décris deux caractéristiques de l'image de la lettre formée par le miroir. (2 points) (4 points)",
      ["l'angle de réflexion est 40 degrés, selon la loi de la réflexion", "le rayon réfléchi repart de l'autre côté de la normale, au même angle de 40 degrés", "l'image de la lettre est inversée latéralement", "l'image de la lettre est virtuelle, derrière le miroir"],
      "<b>Réponse modèle :</b> (a) L'angle de réflexion est 40 degrés. La règle est la loi de la réflexion : l'angle d'incidence est égal à l'angle de réflexion, les deux mesurés à partir de la normale. (b) Le rayon réfléchi repart du côté opposé de la normale par rapport au rayon incident, en faisant le même angle de 40 degrés avec la normale : son trajet est le symétrique du trajet incident par rapport à la normale, et il s'éloigne de la surface du miroir. (c) L'image de la lettre est inversée latéralement : sa gauche et sa droite sont échangées, donc la lettre semble renversée de gauche à droite. L'image est aussi virtuelle : elle semble se trouver derrière le miroir, là où les rayons réfléchis semblent se rencontrer, et aucune lumière ne s'y trouve réellement. (La même taille que l'objet ou la même distance derrière le miroir vaut aussi un des deux points de cette partie.)<br><br><b>Points d'attribution :</b> 1 point pour l'angle de réflexion (40 degrés) avec la loi de la réflexion énoncée. 1 point pour le trajet réfléchi décrit (de l'autre côté de la normale, au même angle, en s'éloignant du miroir). 1 point pour une première caractéristique correcte de l'image (inversée latéralement). 1 point pour une deuxième caractéristique correcte (virtuelle; la même taille ou la même distance derrière le miroir est aussi acceptée).",
      {});
  },
  function () {
    return textq("Un rayon de lumière frappe un miroir plan avec un angle d'incidence de 55 degrés, mesuré à partir de la normale. (a) Énonce l'angle de réflexion et la règle qui le donne. (1 point) (b) Décris le trajet du rayon réfléchi par rapport à la normale. (1 point) (c) Une chandelle allumée se tient devant le même miroir. Décris deux caractéristiques de l'image de la chandelle formée par le miroir. (2 points) (4 points)",
      ["l'angle de réflexion est 55 degrés, selon la loi de la réflexion", "le rayon réfléchi repart de l'autre côté de la normale, au même angle de 55 degrés", "l'image de la chandelle est virtuelle, derrière le miroir", "l'image de la chandelle a la même taille que la chandelle"],
      "<b>Réponse modèle :</b> (a) L'angle de réflexion est 55 degrés. La règle est la loi de la réflexion : l'angle d'incidence est égal à l'angle de réflexion, les deux mesurés à partir de la normale. (b) Le rayon réfléchi repart du côté opposé de la normale par rapport au rayon incident, en faisant le même angle de 55 degrés avec la normale : son trajet est le symétrique du trajet incident par rapport à la normale, et il s'éloigne de la surface du miroir. (c) L'image de la chandelle est virtuelle : elle semble se trouver derrière le miroir, là où les rayons réfléchis semblent se rencontrer, sans qu'aucune lumière s'y trouve réellement. L'image a aussi la même taille que la chandelle elle-même. (La même distance derrière le miroir que l'objet devant, ou une inversion latérale, vaut aussi un des deux points de cette partie.)<br><br><b>Points d'attribution :</b> 1 point pour l'angle de réflexion (55 degrés) avec la loi de la réflexion énoncée. 1 point pour le trajet réfléchi décrit (de l'autre côté de la normale, au même angle, en s'éloignant du miroir). 1 point pour une première caractéristique correcte de l'image (virtuelle). 1 point pour une deuxième caractéristique correcte (la même taille que l'objet; la même distance derrière le miroir ou une inversion latérale est aussi acceptée).",
      {});
  }
]), ["Les deux angles se mesurent à partir de la normale, jamais à partir de la surface du miroir.", "Pour l'image, pense aux quatre caractéristiques des miroirs plans et choisis-en deux à décrire."]);

E("s8f-u3-cr-refraction-bol", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return textq("Une pièce de monnaie repose au fond d'un bol opaque vide. En reculant lentement, tu arrives juste au point où le rebord du bol cache la pièce. Sans bouger la tête, un camarade verse lentement de l'eau dans le bol, et la pièce devient visible, comme si elle s'était relevée dans le bol. (a) Que se passe-t-il à la lumière venant de la pièce quand elle atteint la surface de l'eau? (1 point) (b) Dans quel sens cette lumière se courbe-t-elle, et pourquoi? (2 points) (c) Pourquoi la pièce semble-t-elle relevée? (1 point) (4 points)",
      ["la lumière se réfracte à la surface, en passant de l'eau à l'air", "elle s'éloigne de la normale", "elle accélère en quittant l'eau pour l'air, un milieu moins dense", "l'œil prolonge les rayons en ligne droite, donc la pièce est reconstruite plus près de la surface"],
      "<b>Réponse modèle :</b> (a) La lumière venant de la pièce se réfracte à la surface de l'eau : elle change de direction en passant de l'eau à l'air. Sans eau, le rebord du bol bloquait cette lumière; avec l'eau, la courbure la dirige par-dessus le rebord jusqu'à l'œil. (b) La lumière s'éloigne de la normale. En quittant l'eau pour l'air, elle entre dans un milieu moins dense et accélère, et un rayon qui accélère à une frontière s'écarte de la normale. (c) L'œil suppose que la lumière a voyagé en ligne droite et prolonge les rayons courbés tout droit vers l'arrière. Ces prolongements placent la pièce plus près de la surface qu'elle ne l'est réellement, donc la pièce semble relevée dans le bol.<br><br><b>Points d'attribution :</b> 1 point pour la réfraction nommée (la lumière change de direction en passant de l'eau à l'air). 1 point pour la direction de la courbure (s'éloigner de la normale). 1 point pour la raison (la lumière accélère en quittant l'eau pour l'air, un milieu moins dense). 1 point pour la pièce relevée expliquée (l'œil prolonge les rayons en ligne droite et reconstruit la pièce plus près de la surface).",
      {});
  },
  function () {
    return textq("Une marque est dessinée au fond d'une tasse opaque vide. En reculant lentement la tête, tu arrives juste au point où le rebord de la tasse cache la marque. Sans bouger la tête, un camarade verse lentement de l'eau dans la tasse, et la marque devient visible, comme si le fond de la tasse s'était relevé. (a) Que se passe-t-il à la lumière venant de la marque quand elle atteint la surface de l'eau? (1 point) (b) Dans quel sens cette lumière se courbe-t-elle, et pourquoi? (2 points) (c) Pourquoi la marque semble-t-elle relevée? (1 point) (4 points)",
      ["la lumière se réfracte à la surface, en passant de l'eau à l'air", "elle s'éloigne de la normale", "elle accélère en quittant l'eau pour l'air, un milieu moins dense", "l'œil prolonge les rayons en ligne droite, donc la marque est reconstruite plus près de la surface"],
      "<b>Réponse modèle :</b> (a) La lumière venant de la marque se réfracte à la surface de l'eau : elle change de direction en passant de l'eau à l'air. Sans eau, le rebord de la tasse bloquait cette lumière; avec l'eau, la courbure la dirige par-dessus le rebord jusqu'à l'œil. (b) La lumière s'éloigne de la normale. En quittant l'eau pour l'air, elle entre dans un milieu moins dense et accélère, et un rayon qui accélère à une frontière s'écarte de la normale. (c) L'œil suppose que la lumière a voyagé en ligne droite et prolonge les rayons courbés tout droit vers l'arrière. Ces prolongements placent la marque plus près de la surface qu'elle ne l'est réellement, donc le fond de la tasse semble relevé et la marque entre dans le champ de vision.<br><br><b>Points d'attribution :</b> 1 point pour la réfraction nommée (la lumière change de direction en passant de l'eau à l'air). 1 point pour la direction de la courbure (s'éloigner de la normale). 1 point pour la raison (la lumière accélère en quittant l'eau pour l'air, un milieu moins dense). 1 point pour la marque relevée expliquée (l'œil prolonge les rayons en ligne droite et reconstruit la marque plus près de la surface).",
      {});
  },
  function () {
    return textq("Un caillou repose au fond d'un bac transparent rempli d'une eau peu profonde. Vu de côté et d'un peu plus haut, le caillou semble plus près de la surface qu'il ne l'est en réalité, comme s'il flottait relevé au-dessus du fond du bac. (a) Que se passe-t-il à la lumière venant du caillou quand elle atteint la surface de l'eau? (1 point) (b) Dans quel sens cette lumière se courbe-t-elle, et pourquoi? (2 points) (c) Pourquoi le caillou semble-t-il relevé? (1 point) (4 points)",
      ["la lumière se réfracte à la surface, en passant de l'eau à l'air", "elle s'éloigne de la normale", "elle accélère en quittant l'eau pour l'air, un milieu moins dense", "l'œil prolonge les rayons en ligne droite, donc le caillou est reconstruit plus près de la surface"],
      "<b>Réponse modèle :</b> (a) La lumière venant du caillou se réfracte à la surface de l'eau : elle change de direction en passant de l'eau à l'air, sur son trajet vers l'œil. (b) La lumière s'éloigne de la normale. En quittant l'eau pour l'air, elle entre dans un milieu moins dense et accélère, et un rayon qui accélère à une frontière s'écarte de la normale. (c) L'œil suppose que la lumière a voyagé en ligne droite et prolonge les rayons courbés tout droit vers l'arrière. Ces prolongements se rencontrent en un point plus près de la surface que le vrai caillou, donc le caillou semble relevé au-dessus de sa vraie position au fond du bac.<br><br><b>Points d'attribution :</b> 1 point pour la réfraction nommée (la lumière change de direction en passant de l'eau à l'air). 1 point pour la direction de la courbure (s'éloigner de la normale). 1 point pour la raison (la lumière accélère en quittant l'eau pour l'air, un milieu moins dense). 1 point pour le caillou relevé expliqué (l'œil prolonge les rayons en ligne droite et reconstruit le caillou plus près de la surface).",
      {});
  }
]), ["Suis un seul rayon, du fond jusqu'à l'œil, et marque ce qu'il fait à la surface.", "En sortant de l'eau, la lumière accélère : retiens le sens de la courbure qui va avec."]);

/* ---------- Ajout du 21 novembre 2026 : plan de tests (decisions 9, 10, 11) ---------- */

/* ---------- SC8.7.3 Réflexion : termes, mesures et usages ---------- */

E("s8f-u3-reflexion-termes", 3, ["SC8.7.3"], 1, "var", varset([
  function () {
    return mcq("Dans un diagramme de réflexion, qu'est-ce que la normale?",
      "La ligne perpendiculaire à la surface du miroir, tracée au point précis où le rayon la frappe",
      ["La ligne parallèle à la surface du miroir, tracée au point précis où le rayon la frappe",
       "Le rayon de lumière qui repart de la surface du miroir après y avoir rebondi en un point",
       "Le rayon de lumière qui arrive sur la surface du miroir avant d'y rebondir en un point"],
      "La normale est une ligne de référence imaginaire : elle se dresse perpendiculairement à la surface, exactement au point où le rayon la frappe. C'est à partir d'elle, et non à partir de la surface, que les angles d'incidence et de réflexion se mesurent.",
      {});
  },
  function () {
    return mcq("Dans un diagramme de réflexion, qu'est-ce que le rayon incident?",
      "Le rayon de lumière qui arrive sur une surface, juste avant de rebondir sur cette surface",
      ["Le rayon de lumière qui repart d'une surface, juste après avoir rebondi sur cette surface",
       "La ligne droite imaginaire qui se dresse perpendiculairement à une surface, en un point donné",
       "Le rayon de lumière qui traverse une surface, en changeant de milieu et de direction ensuite"],
      "Le rayon incident est le rayon qui arrive : il voyage vers la surface et la frappe en un point. Le rayon qui repart après le rebond est le rayon réfléchi, et la ligne perpendiculaire à la surface en ce point est la normale.",
      {});
  },
  function () {
    return mcq("Dans un diagramme de réflexion, qu'est-ce que le rayon réfléchi?",
      "Le rayon de lumière qui repart d'une surface, juste après avoir rebondi sur cette surface",
      ["Le rayon de lumière qui arrive sur une surface, juste avant de rebondir sur cette surface",
       "La ligne droite imaginaire qui se dresse perpendiculairement à une surface, en un point donné",
       "Le rayon de lumière qui traverse une surface, en changeant de milieu et de direction ensuite"],
      "Le rayon réfléchi est le rayon qui repart : il quitte la surface après le rebond, du même côté de la normale que son trajet symétrique. Le rayon qui arrive est le rayon incident, et un rayon qui traverse la surface en changeant de milieu relève de la réfraction, pas de la réflexion.",
      {});
  },
  function () {
    return mcq("Comment l'angle d'incidence se définit-il dans un diagramme de réflexion?",
      "L'angle formé par le rayon incident et la normale, au point où le rayon frappe la surface",
      ["L'angle formé par le rayon réfléchi et la normale, au point où le rayon quitte la surface",
       "L'angle formé par le rayon incident et la surface, au point où le rayon frappe la surface",
       "L'angle formé par le rayon réfléchi et la surface, au point où le rayon quitte la surface"],
      "L'angle d'incidence se mesure entre le rayon incident et la normale, au point de contact. L'angle entre le rayon réfléchi et la normale est l'angle de réflexion. Les angles mesurés à partir de la surface ne sont ni l'un ni l'autre : ils valent 90 degrés moins l'angle cherché.",
      {});
  },
  function () {
    return mcq("Deux élèves mesurent les angles d'un rayon sur un miroir, chacun par rapport à la normale. Qu'est-ce que la loi de la réflexion prédit pour leurs mesures?",
      "L'angle de réflexion mesuré sera égal à l'angle d'incidence, pour chaque rayon étudié",
      ["L'angle de réflexion mesuré sera le double de l'angle d'incidence, pour chaque rayon",
       "L'angle de réflexion mesuré sera la moitié de l'angle d'incidence, pour chaque rayon",
       "La somme des deux angles mesurés donnera toujours 90 degrés, pour chaque rayon étudié"],
      "La loi de la réflexion énonce que l'angle d'incidence est égal à l'angle de réflexion, les deux mesurés par rapport à la normale. Elle vaut pour chaque rayon et pour chaque surface réfléchissante, lisse ou non.",
      {});
  }
]), ["Chaque terme nomme une seule partie du diagramme : le rayon qui arrive, celui qui repart, ou la ligne de référence.", "Tous les angles de ce chapitre se mesurent à partir de la normale."]);

E("s8f-u3-angle-mesure", 3, ["SC8.7.3"], 2, "gen", function () {
  var base = pick([12, 18, 24, 28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78]);
  var mode = pick(["refl", "surf-inc", "surf-refl", "refl-surf"]);
  var ans, q, sol;
  if (mode === "refl") {
    ans = base;
    q = "Un rayon frappe un miroir plan avec un angle d'incidence de " + base + " degrés, mesuré par rapport à la normale. Quel est l'angle de réflexion?";
    sol = "Selon la loi de la réflexion, l'angle de réflexion est égal à l'angle d'incidence : " + base + " degrés, les deux mesurés par rapport à la normale.";
  } else if (mode === "surf-inc") {
    ans = 90 - base;
    q = "Un rayon frappe un miroir plan de sorte qu'il fait un angle de " + base + " degrés avec la surface du miroir. Quel est son angle d'incidence, mesuré par rapport à la normale?";
    sol = "L'angle donné est mesuré à partir de la surface. La normale est à 90 degrés de la surface, donc l'angle d'incidence vaut 90 - " + base + " = " + ans + " degrés.";
  } else if (mode === "surf-refl") {
    ans = 90 - base;
    q = "Un rayon frappe un miroir plan de sorte qu'il fait un angle de " + base + " degrés avec la surface du miroir. Quel est l'angle de réflexion du rayon, mesuré par rapport à la normale?";
    sol = "L'angle d'incidence se mesure à partir de la normale : il vaut 90 - " + base + " = " + ans + " degrés. Selon la loi de la réflexion, l'angle de réflexion lui est égal : " + ans + " degrés.";
  } else {
    ans = 90 - base;
    q = "Un rayon frappe un miroir plan avec un angle d'incidence de " + base + " degrés, mesuré par rapport à la normale. Quel angle le rayon réfléchi fait-il avec la surface du miroir?";
    sol = "L'angle de réflexion vaut " + base + " degrés par rapport à la normale, comme l'angle d'incidence. La normale est à 90 degrés de la surface, donc le rayon réfléchi fait 90 - " + base + " = " + ans + " degrés avec la surface.";
  }
  var cand = [ans - 12, ans - 10, ans - 5, ans + 5, ans + 10, ans + 12, 90 - ans];
  var dis = [];
  for (var i = 0; i < cand.length && dis.length < 3; i++) {
    if (cand[i] !== ans && cand[i] > 0 && cand[i] < 90 && dis.indexOf(cand[i]) < 0) dis.push(cand[i]);
  }
  dis.sort(function (a, b) { return a - b; });
  return mcq(q, ans + " degrés", dis.map(function (d) { return d + " degrés"; }), sol, {});
}, ["Repère d'abord à partir de quoi l'angle donné est mesuré : la normale ou la surface.", "Un angle pris à partir de la surface se convertit en soustrayant de 90 degrés."]);

E("s8f-u3-reflexion-conception", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return mcq("Dans un périscope simple, chaque miroir plan est incliné à 45 degrés par rapport au tube vertical. Quelle justification de ce choix repose correctement sur la loi de la réflexion?",
      "À 45 degrés, le rayon horizontal arrive à 45 degrés de la normale, donc il se réfléchit à 45 degrés de la normale et tourne exactement à angle droit, vers le bas du tube",
      ["À 45 degrés, le miroir absorbe la moitié de la lumière horizontale, donc le rayon restant tombe naturellement vers le bas du tube, sans qu'aucun angle précis soit nécessaire",
       "À 45 degrés, la surface du miroir devient parallèle à la normale, donc le rayon horizontal glisse le long du miroir et descend ensuite tout droit dans le tube du périscope",
       "À 45 degrés, l'image du premier miroir se renverse de haut en bas, donc elle arrive à l'oeil déjà redressée, quelle que soit la direction du rayon lumineux qui la transporte"],
      "Le choix de 45 degrés est un calcul d'angles. Le rayon horizontal rencontre la normale du miroir incliné à 45 degrés, donc son angle d'incidence vaut 45 degrés. La loi de la réflexion lui donne un angle de réflexion égal, de l'autre côté de la normale : le rayon repart à 90 degrés de sa direction d'arrivée, exactement le long du tube.",
      {});
  },
  function () {
    return mcq("Un miroir plan est fixé en angle au-dessus d'un tournant de corridor d'école, pour qu'on voie qui arrive de l'autre côté avant de tourner. Pourquoi ce placement fonctionne-t-il?",
      "La lumière venant de l'autre côté frappe le miroir et se réfléchit vers l'observateur avec un angle de réflexion égal à son angle d'incidence, ce qui déplace sa ligne de visée autour du tournant",
      ["La lumière venant de l'autre côté se réfracte en traversant le miroir et se courbe autour du tournant du corridor, ce qui amène l'image des passants jusqu'à l'observateur placé avant le tournant",
       "La lumière venant de l'autre côté est absorbée par le miroir puis réémise dans toutes les directions du corridor, ce qui rend les passants visibles de partout, même sans ligne de visée directe",
       "La lumière venant de l'autre côté rebondit sur le mur du fond et le miroir ne sert qu'à grossir cette lumière déjà réfléchie, ce qui agrandit l'image des passants aperçus au tournant du corridor"],
      "Le miroir ne laisse pas voir à travers le mur : il redirige la lumière. Les rayons des passants frappent le miroir incliné et repartent vers l'observateur selon la loi de la réflexion, angles égaux par rapport à la normale. La ligne de visée de l'observateur est donc rabattue autour du tournant, comme dans un périscope à un seul miroir.",
      {});
  },
  function () {
    return mcq("Un dentiste tient un petit miroir incliné contre une dent pour examiner la face arrière de cette dent, qu'aucun regard direct ne peut atteindre. Qu'est-ce qui rend cette observation possible?",
      "La lumière éclaire la face arrière de la dent, frappe le miroir et se réfléchit vers l'oeil du dentiste selon des angles égaux par rapport à la normale, en y formant une image de cette face cachée",
      ["La lumière traverse la dent de part en part et le petit miroir la recueille de l'autre côté, ce qui montre au dentiste la face arrière de la dent comme si la dent elle-même était devenue transparente",
       "La lumière contourne la dent par réfraction dans l'air de la bouche et le miroir grossit ensuite cette lumière courbée, ce qui agrandit la face arrière de la dent jusqu'à la rendre facile à examiner",
       "La lumière rebondit entre la dent et le miroir un grand nombre de fois et finit par peindre sur le miroir une image permanente de la dent, que le dentiste peut ensuite examiner à loisir dans sa main"],
      "Le miroir de dentiste est un problème de trajet de lumière. La lampe éclaire la face arrière de la dent; les rayons qui en viennent frappent le miroir incliné et se réfléchissent vers l'oeil, avec un angle de réflexion égal à l'angle d'incidence à chaque rayon. Le dentiste voit donc une image virtuelle de la face cachée, formée derrière le miroir.",
      {});
  },
  function () {
    return mcq("À la sortie d'un garage qui donne directement sur un trottoir, on installe un miroir plan incliné au-dessus de la porte pour que le conducteur voie les piétons avant de sortir. Quelle justification de ce montage est correcte?",
      "Les rayons venant des piétons frappent le miroir incliné et se réfléchissent vers le conducteur selon la loi de la réflexion, donc sa ligne de visée se rabat vers le trottoir qu'il ne voit pas directement",
      ["Les rayons venant des piétons traversent le mur du garage puis le miroir les rassemble en une image, donc le conducteur voit le trottoir à travers le mur comme il verrait à travers une fenêtre bien placée",
       "Les rayons venant des piétons sont absorbés par le miroir incliné, qui les renvoie ensuite également dans toutes les directions, donc chaque piéton du trottoir devient visible de n'importe quel siège",
       "Les rayons venant des piétons se courbent en passant près du bord du miroir incliné et contournent la porte du garage, donc le conducteur reçoit une image du trottoir sans qu'aucun rebond soit nécessaire"],
      "C'est le même montage que le miroir de corridor : un seul rebond bien placé. L'inclinaison du miroir est choisie pour que les rayons des piétons, réfléchis avec un angle de réflexion égal à leur angle d'incidence, atteignent l'oeil du conducteur. Sans le miroir, ces rayons continueraient tout droit et le trottoir resterait hors de sa vue.",
      {});
  }
]), ["Pour chaque montage, suis un rayon : d'où il vient, où il rebondit, où il doit arriver.", "Un miroir ne crée pas de lumière et ne voit pas à travers les murs : il redirige des rayons selon des angles égaux."]);

E("s8f-u3-reflexion-usage", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return mcq("Pour une salle de classe, on choisit un écran de projection mat plutôt qu'une surface brillante comme un miroir. Quelle justification de ce choix est correcte?",
      "La surface mate réfléchit la lumière du projecteur de façon diffuse, dans plusieurs directions, donc chaque élève reçoit une partie de l'image et la voit à peu près également bien de sa place",
      ["La surface mate réfléchit la lumière du projecteur de façon spéculaire, dans une seule direction, donc chaque élève reçoit toute l'image à la fois et la voit aussi nettement que dans un miroir poli",
       "La surface mate absorbe la lumière du projecteur presque entièrement, donc l'image se forme dans l'épaisseur même de l'écran et reste visible également bien de toutes les places de la classe entière",
       "La surface mate réfracte la lumière du projecteur en la traversant de part en part, donc l'image ressort de l'autre côté de l'écran et chaque élève la reçoit directement, sans aucun rebond nécessaire"],
      "Un écran doit servir toute la salle, pas une seule place. Sa surface mate, rugueuse à petite échelle, produit une réflexion diffuse : les rayons de chaque point de l'image se dispersent dans plusieurs directions, donc des yeux placés partout dans la salle en reçoivent. Une surface spéculaire enverrait l'image dans une seule direction, avec un éblouissement pour quelques-uns et rien pour les autres.",
      {});
  },
  function () {
    return mcq("La nuit, une route mouillée paraît presque noire sous les phares d'une voiture, sauf une bande brillante qui s'étend devant le véhicule. Quelle explication de ce contraste est correcte?",
      "L'eau rend la route lisse, donc elle réfléchit les phares de façon spéculaire, surtout vers l'avant, loin des yeux du conducteur; il ne revient presque rien vers lui, sauf dans la bande alignée avec les phares",
      ["L'eau rend la route rugueuse, donc elle réfléchit les phares de façon diffuse, également dans toutes les directions; il revient alors autant de lumière au conducteur que sur une route sèche bien éclairée",
       "L'eau absorbe les phares complètement dès qu'elle recouvre la route, donc aucune lumière ne peut plus se réfléchir du tout sur une route mouillée, et la bande brillante vient des lampadaires du quartier",
       "L'eau réfracte les phares à travers la route jusqu'au sol en dessous, donc la route elle-même reste noire et la bande brillante est la lumière qui ressort du sol de l'autre côté de la chaussée mouillée"],
      "La route sèche est rugueuse : elle réfléchit les phares de façon diffuse, et une partie revient toujours vers le conducteur, ce qui rend la chaussée visible. Mouillée, l'eau la recouvre d'une surface lisse : la réflexion devient spéculaire, les rayons repartent surtout vers l'avant, loin des yeux, et la route semble noire. La bande brillante est la zone où la géométrie spéculaire renvoie justement la lumière vers le conducteur, le même effet qui éblouit face aux phares des voitures venant en sens inverse.",
      {});
  },
  function () {
    return mcq("Un tableau blanc très lustré rend le texte illisible depuis les places situées sur les côtés de la classe, alors qu'il se lit bien de face. Quelle explication est correcte?",
      "La surface lustrée réfléchit de façon spéculaire : la lumière des fenêtres et des lampes repart dans une direction précise, qui éblouit les places de côté, tandis que le texte ne se diffuse presque pas vers elles",
      ["La surface lustrée réfléchit de façon diffuse : la lumière des fenêtres et des lampes se disperse également partout dans la classe, donc les places de côté reçoivent trop de lumière mélangée pour distinguer le texte",
       "La surface lustrée absorbe la lumière des fenêtres et des lampes presque entièrement, donc le tableau devient trop sombre pour les places de côté, qui ne reçoivent plus assez de lumière pour lire le texte écrit",
       "La surface lustrée réfracte la lumière des fenêtres et des lampes à travers le tableau, donc le texte semble se déplacer pour les places de côté, qui le voient alors décalé et impossible à suivre correctement"],
      "Le lustre est une surface lisse : sa réflexion est spéculaire. Depuis les côtés, l'oeil se place justement dans la direction où la lumière des lampes se réfléchit, d'où l'éblouissement qui noie le texte. De face, cette direction est évitée et le texte se lit. Un tableau mat, à réflexion diffuse, éviterait le problème en dispersant la lumière des lampes au lieu de la concentrer dans une direction.",
      {});
  },
  function () {
    return mcq("Après une douche chaude, le miroir de la salle de bain ne montre plus qu'une image floue et laiteuse, alors qu'il était net quelques minutes plus tôt. Quelle explication relie correctement ce changement à la réflexion?",
      "Les gouttelettes d'eau condensées rendent la surface irrégulière : la réflexion y devient diffuse, les rayons repartent dans plusieurs directions et l'ordre qui formait l'image nette est perdu",
      ["Les gouttelettes d'eau condensées rendent la surface plus lisse : la réflexion y devient spéculaire, les rayons repartent dans une seule direction et l'image devient alors trop concentrée pour être nette",
       "Les gouttelettes d'eau condensées absorbent toute la lumière qui frappe le miroir : aucune réflexion ne s'y produit plus du tout, et l'image floue aperçue vient en réalité de la vitre de la fenêtre voisine",
       "Les gouttelettes d'eau condensées réfractent la lumière à travers le miroir jusqu'au mur derrière lui : l'image se forme alors dans le mur, et le flou aperçu n'est que l'ombre de cette image déplacée"],
      "Le miroir lui-même n'a pas changé; sa surface, si. Le film de gouttelettes la rend irrégulière à petite échelle, donc chaque rayon se réfléchit toujours selon la loi, mais par rapport à des normales qui pointent dans plusieurs directions : c'est la réflexion diffuse. Les rayons dispersés ne conservent plus l'ordre d'une image, d'où le flou laiteux, jusqu'à ce que la surface redevienne lisse et spéculaire.",
      {});
  }
]), ["Demande-toi d'abord si la surface envoie la lumière dans une direction ou dans plusieurs.", "Spéculaire : une direction, image ou éblouissement. Diffuse : plusieurs directions, visibilité partagée mais pas d'image."]);

E("s8f-u3-cr-reflexion-quotidien", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("Un miroir plan est installé en angle au-dessus du tournant d'un corridor d'école, là où des élèves se sont déjà heurtés en tournant sans voir qui arrivait. Explique, à l'aide de la loi de la réflexion, comment ce miroir permet à un élève de voir un élève qui arrive de l'autre côté du tournant avant de s'y engager. (2 points)",
      ["la lumière de l'élève qui arrive frappe le miroir et se réfléchit vers l'oeil de l'autre élève", "l'angle de réflexion est égal à l'angle d'incidence par rapport à la normale du miroir incliné", "la ligne de visée est ainsi rabattue autour du tournant, sans voir à travers le mur"],
      "<b>Réponse modèle:</b> La lumière qui vient de l'élève arrivant de l'autre côté du tournant voyage en ligne droite jusqu'au miroir incliné. Là, elle se réfléchit selon la loi de la réflexion : son angle de réflexion, mesuré par rapport à la normale au miroir, est égal à son angle d'incidence. Avec l'inclinaison choisie, ces rayons réfléchis atteignent l'oeil de l'élève placé avant le tournant. Sa ligne de visée est donc rabattue autour du coin par le miroir : il voit l'autre élève dans le miroir, sans que ni l'un ni l'autre ait à franchir le tournant.<br><br><b>Points d'attribution:</b> 1 point pour la loi de la réflexion appliquée au miroir (angle de réflexion égal à l'angle d'incidence, mesurés par rapport à la normale). 1 point pour le résultat expliqué (les rayons réfléchis atteignent l'oeil avant le tournant, donc la zone cachée devient visible dans le miroir).",
      {});
  },
  function () {
    return textq("Un dentiste examine la face arrière d'une dent à l'aide d'un petit miroir incliné tenu juste derrière la dent. Explique, à l'aide de la loi de la réflexion, comment ce miroir permet au dentiste de voir une face de la dent qu'aucun regard direct ne peut atteindre. (2 points)",
      ["la lumière éclaire la face arrière de la dent et ses rayons frappent le miroir incliné", "chaque rayon se réfléchit avec un angle de réflexion égal à son angle d'incidence par rapport à la normale", "les rayons réfléchis atteignent l'oeil du dentiste, qui y voit une image de la face cachée"],
      "<b>Réponse modèle:</b> La lampe du dentiste éclaire la face arrière de la dent. Les rayons qui partent de cette face frappent le petit miroir incliné placé derrière la dent et s'y réfléchissent selon la loi de la réflexion : pour chaque rayon, l'angle de réflexion, mesuré par rapport à la normale au miroir, est égal à l'angle d'incidence. L'inclinaison du miroir envoie ces rayons réfléchis vers l'oeil du dentiste, qui voit donc, dans le miroir, une image de la face arrière de la dent, bien qu'elle soit tournée à l'opposé de lui.<br><br><b>Points d'attribution:</b> 1 point pour la loi de la réflexion appliquée au miroir (angle de réflexion égal à l'angle d'incidence, mesurés par rapport à la normale). 1 point pour le résultat expliqué (les rayons réfléchis atteignent l'oeil du dentiste, qui voit une image de la face cachée).",
      {});
  },
  function () {
    return textq("Un miroir plan incliné est fixé au-dessus de la porte d'un garage qui s'ouvre directement sur un trottoir, pour que le conducteur voie les piétons avant de sortir. Explique, à l'aide de la loi de la réflexion, comment ce miroir permet au conducteur de voir un piéton qui se trouve encore hors de sa vue directe. (2 points)",
      ["les rayons venant du piéton frappent le miroir incliné au-dessus de la porte", "chaque rayon se réfléchit avec un angle de réflexion égal à son angle d'incidence par rapport à la normale", "les rayons réfléchis atteignent l'oeil du conducteur, dont la ligne de visée se rabat vers le trottoir"],
      "<b>Réponse modèle:</b> Les rayons de lumière qui viennent du piéton sur le trottoir voyagent en ligne droite jusqu'au miroir incliné au-dessus de la porte. Ils s'y réfléchissent selon la loi de la réflexion : pour chaque rayon, l'angle de réflexion, mesuré par rapport à la normale au miroir, est égal à l'angle d'incidence. L'inclinaison du miroir est choisie pour que ces rayons réfléchis descendent jusqu'à l'oeil du conducteur assis dans la voiture. Sa ligne de visée est ainsi rabattue par le miroir vers le trottoir, et il aperçoit le piéton avant d'engager la voiture.<br><br><b>Points d'attribution:</b> 1 point pour la loi de la réflexion appliquée au miroir (angle de réflexion égal à l'angle d'incidence, mesurés par rapport à la normale). 1 point pour le résultat expliqué (les rayons réfléchis atteignent l'oeil du conducteur, qui voit le piéton hors de sa vue directe).",
      {});
  }
]), ["Suis un rayon précis : du sujet caché, au miroir, puis à l'oeil.", "La loi doit être énoncée avec ses angles par rapport à la normale, pas seulement nommée."]);

/* ---------- SC8.7.4 Réfraction : exemples, déviation et explications ---------- */

E("s8f-u3-refraction-exemples", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces phénomènes est un effet de la réfraction de la lumière?",
      "Le fond d'une piscine qui semble moins profond qu'il ne l'est vraiment",
      ["L'image d'un visage qui apparaît dans un miroir bien poli de salle de bain",
       "L'ombre nette d'un poteau qui s'étend sur le sol par un jour ensoleillé",
       "Le reflet du Soleil qui éblouit à la surface calme d'un lac le matin"],
      "Le fond de la piscine semble relevé parce que la lumière qui en vient se réfracte en passant de l'eau à l'air, et l'oeil la prolonge en ligne droite. Le miroir et le reflet sur le lac sont des réflexions, et l'ombre nette vient du voyage en ligne droite de la lumière.",
      {});
  },
  function () {
    return mcq("Lequel de ces phénomènes est un effet de la réfraction de la lumière?",
      "Une loupe qui fait paraître les lettres d'une page plus grandes qu'elles sont",
      ["Un rétroviseur qui montre les voitures qui suivent derrière le conducteur",
       "Une ombre qui grandit quand une main s'approche d'une lampe dans une pièce",
       "Un éblouissement qui apparaît sur une photographie prise face à une fenêtre"],
      "La loupe est une lentille : elle réfracte la lumière qui la traverse et fait paraître les lettres plus grandes. Le rétroviseur et l'éblouissement sont des réflexions, et l'ombre qui grandit vient des trajets droits de la lumière bloqués par la main.",
      {});
  },
  function () {
    return mcq("Lequel de ces phénomènes est un effet de la réfraction de la lumière?",
      "Un poisson qui semble plus près de la surface qu'il ne l'est en réalité",
      ["Un drapeau qui se reflète à la surface d'une flaque d'eau après la pluie",
       "Une silhouette qui se découpe en ombre chinoise derrière un écran éclairé",
       "Une enseigne qui se répète dans la vitrine d'un magasin pendant la soirée"],
      "Le poisson semble relevé parce que la lumière qui en vient change de direction en sortant de l'eau vers l'air : c'est la réfraction, et l'oeil reconstruit le poisson trop haut. Le drapeau et l'enseigne sont des réflexions sur des surfaces, et l'ombre chinoise vient de la lumière bloquée.",
      {});
  },
  function () {
    return mcq("Lequel de ces phénomènes est un effet de la réfraction de la lumière?",
      "Les étoiles qui semblent scintiller et trembler dans le ciel de la nuit",
      ["La Lune qui se reflète en une traînée brillante sur un lac par temps calme",
       "Un faisceau de projecteur qui dessine un cône bien droit dans une salle sombre",
       "Un visage qui apparaît à l'envers dans le dos poli d'une cuillère en métal"],
      "L'air au-dessus du sol n'a pas partout la même densité : la lumière des étoiles se réfracte un peu différemment d'un instant à l'autre en le traversant, ce qui fait trembler leur position apparente. La traînée sur le lac et le visage dans la cuillère sont des réflexions; le cône droit montre la propagation rectiligne.",
      {});
  },
  function () {
    return mcq("Un élève observe deux effets dans un aquarium : le reflet de la lampe à la surface de l'eau, et une plante dont la tige semble décalée là où elle entre dans l'eau. Lequel de ces effets est la réfraction?",
      "La tige qui semble décalée là où elle entre dans l'eau de l'aquarium",
      ["Le reflet de la lampe qui brille à la surface de l'eau de l'aquarium",
       "La bulle d'air qui monte en ligne droite dans l'eau de l'aquarium",
       "L'ombre de la plante qui se dessine au fond sablonneux de l'aquarium"],
      "La tige semble décalée parce que la lumière de sa partie immergée se réfracte à la surface avant d'atteindre l'oeil : réfraction. Le reflet de la lampe est une réflexion à la surface, la bulle montre un trajet droit, et l'ombre vient de la lumière bloquée par la plante.",
      {});
  }
]), ["La réfraction exige un changement de milieu : la lumière traverse une frontière et change de direction.", "Miroirs, reflets et éblouissements sont des réflexions; les ombres viennent des trajets droits."]);

E("s8f-u3-deviation-prevoir", 3, ["SC8.7.4"], 2, "gen", function () {
  var paires = [
    { de: "l'air", vers: "l'eau", vitesse: "plus lentement", sens: "vers" },
    { de: "l'eau", vers: "l'air", vitesse: "plus vite", sens: "loin" },
    { de: "l'air", vers: "le verre", vitesse: "plus lentement", sens: "vers" },
    { de: "le verre", vers: "l'air", vitesse: "plus vite", sens: "loin" },
    { de: "l'air", vers: "l'huile végétale", vitesse: "plus lentement", sens: "vers" },
    { de: "l'huile végétale", vers: "l'air", vitesse: "plus vite", sens: "loin" },
    { de: "l'eau", vers: "le verre", vitesse: "plus lentement", sens: "vers" },
    { de: "le verre", vers: "l'eau", vitesse: "plus vite", sens: "loin" },
    { de: "l'air", vers: "le plexiglas", vitesse: "plus lentement", sens: "vers" },
    { de: "le plexiglas", vers: "l'air", vitesse: "plus vite", sens: "loin" }
  ];
  var contextes = [
    "lors d'une activité de laboratoire",
    "dans un montage avec une boîte à rayons",
    "pendant une démonstration en classe",
    "dans un bac transparent rempli à moitié",
    "sur la paillasse, devant un écran blanc",
    "au cours d'une mesure d'angles soignée"
  ];
  var p = pick(paires);
  var ctx = pick(contextes);
  var key, autres;
  if (p.sens === "vers") {
    key = "Il se dévie vers la normale à la frontière";
    autres = ["Il se dévie en s'éloignant de la normale", "Il traverse la frontière sans se dévier du tout", "Il se réfléchit entièrement à la frontière"];
  } else {
    key = "Il se dévie en s'éloignant de la normale";
    autres = ["Il se dévie vers la normale à la frontière", "Il traverse la frontière sans se dévier du tout", "Il se réfléchit entièrement à la frontière"];
  }
  var sol = "La règle de la réfraction relie le changement de vitesse au sens de la déviation. Ici, la lumière passe de " + p.de + " à " + p.vers + " et y voyage " + p.vitesse + " : " + (p.sens === "vers" ? "un rayon qui ralentit se dévie vers la normale." : "un rayon qui accélère se dévie en s'éloignant de la normale.");
  return mcq("Un rayon de lumière arrive en oblique à une frontière, " + ctx + " : il passe de " + p.de + " à " + p.vers + ", où la lumière voyage " + p.vitesse + " que dans le premier milieu. Comment le rayon se dévie-t-il à la frontière?",
    key, autres, sol, {});
}, ["Le changement de vitesse décide du sens : ralentir rapproche de la normale, accélérer en éloigne.", "Lis le trajet dans l'ordre : le premier milieu, le second milieu, puis la vitesse dans le second."]);

E("s8f-u3-refraction-nouveau", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return mcq("Un faisceau de lumière blanche traverse un prisme de verre dans une pièce sombre et frappe un écran. Quelle prédiction décrit correctement ce qu'on observera sur l'écran, et pourquoi?",
      "Le faisceau s'étale en une bande de couleurs, parce que le verre réfracte chaque couleur d'une quantité légèrement différente : la réfraction sépare les couleurs déjà présentes dans la lumière blanche",
      ["Le faisceau reste un seul point blanc, parce que le verre réfracte toutes les couleurs exactement de la même quantité : la réfraction courbe le faisceau entier sans jamais séparer ce qui le compose",
       "Le faisceau devient une seule couleur pure, parce que le verre absorbe toutes les couleurs sauf une en le traversant : la réfraction choisit la couleur la plus forte et élimine toutes les autres couleurs",
       "Le faisceau s'étale en une bande de couleurs, parce que le verre ajoute ses propres pigments à la lumière en la traversant : la réfraction colore le faisceau au passage et fabrique les couleurs observées"],
      "Le prisme ne fabrique rien : la lumière blanche contient déjà toutes les couleurs. À chaque surface du prisme, la réfraction dévie le faisceau, et la déviation n'est pas tout à fait la même pour chaque couleur. Le violet se dévie le plus et le rouge le moins, donc les couleurs s'étalent en spectre sur l'écran.",
      {});
  },
  function () {
    return mcq("Par un après-midi très chaud, une route d'asphalte semble couverte de flaques brillantes au loin, qui disparaissent quand on s'en approche. Quelle explication de ce mirage est correcte?",
      "L'air juste au-dessus de l'asphalte chaud est moins dense : la lumière du ciel s'y réfracte peu à peu en s'en approchant et finit par remonter vers l'oeil, qui la lit comme le reflet du ciel sur de l'eau",
      ["Une mince couche d'eau réelle recouvre toujours l'asphalte les jours de chaleur : elle s'évapore dès qu'on s'en approche et se reforme plus loin, ce qui fait reculer les flaques brillantes devant le marcheur",
       "La chaleur fait fondre une fine couche de l'asphalte lui-même, qui devient lisse et réfléchit le ciel comme un miroir : les flaques brillantes sont la réflexion du ciel sur cette couche fondue de la route",
       "La lumière du ciel rebondit sur les grains de sable de l'accotement et se disperse au-dessus de la route : les flaques brillantes sont cette lumière dispersée, que l'oeil rassemble en une image de surface liquide"],
      "Le mirage est une réfraction, pas une réflexion sur de l'eau. Près de l'asphalte surchauffé, l'air est moins dense; la lumière du ciel qui descend vers la route change peu à peu de vitesse et se courbe dans cet air inégal, jusqu'à remonter vers l'oeil. L'oeil la prolonge en ligne droite et la place au niveau du sol : le cerveau y reconnaît le reflet du ciel sur une surface d'eau, alors qu'il n'y a que de l'air et de la réfraction.",
      {});
  },
  function () {
    return mcq("Une piscine a une partie profonde de 2 mètres, mais un nouvel élève sauveteur, la regardant du bord, jurerait qu'elle est beaucoup moins profonde. Quelle prédiction et quelle précaution sont correctes?",
      "Le fond semble relevé : la lumière du fond se réfracte en sortant de l'eau et l'oeil le reconstruit trop près de la surface, donc il ne faut jamais juger la profondeur d'une piscine à l'oeil avant d'y plonger",
      ["Le fond semble abaissé : la lumière du fond se réfracte en sortant de l'eau et l'oeil le reconstruit plus loin de la surface, donc la piscine est toujours moins profonde en réalité que ce qu'elle paraît du bord",
       "Le fond semble à sa vraie place : la lumière du fond voyage en ligne droite de l'eau jusqu'à l'oeil sans changer de direction, donc un regard exercé peut mesurer la profondeur exacte d'une piscine depuis son bord",
       "Le fond semble relevé : l'eau soulève réellement le fond de la piscine pendant le jour sous l'effet de la chaleur du Soleil, donc il faut attendre la soirée pour que le fond reprenne sa profondeur véritable"],
      "C'est la profondeur apparente. La lumière du fond se réfracte en passant de l'eau à l'air, en s'éloignant de la normale, et l'oeil, qui prolonge les rayons en ligne droite, reconstruit le fond plus près de la surface qu'il ne l'est. Le fond d'une piscine paraît donc toujours moins profond que sa profondeur réelle : juger à l'oeil avant de plonger est dangereux.",
      {});
  },
  function () {
    return mcq("Une goutte d'eau presque sphérique repose sur une page imprimée, et les lettres sous la goutte paraissent nettement plus grandes que les autres. Quelle explication est correcte?",
      "La goutte bombée réfracte la lumière comme une petite lentille convergente : ses surfaces courbes dévient les rayons des lettres de façon à les faire paraître agrandies quand on les regarde à travers elle",
      ["La goutte bombée réfléchit la lumière comme un petit miroir convergent : ses surfaces courbes renvoient les rayons des lettres vers l'oeil en une image agrandie, sans que la lumière traverse jamais la goutte",
       "La goutte bombée étire physiquement l'encre des lettres en gonflant le papier sous elle : les lettres paraissent plus grandes parce qu'elles le sont devenues pendant que la goutte repose sur la page imprimée",
       "La goutte bombée absorbe la lumière autour des lettres et ne laisse passer que celle des lettres elles-mêmes : le contraste ainsi augmenté donne seulement l'impression que les lettres sont devenues plus grandes"],
      "Une goutte bombée est une lentille en miniature. La lumière des lettres se réfracte en entrant dans l'eau de la goutte et encore en en sortant; la forme bombée dévie les rayons comme une lentille convergente, et l'oeil reçoit une image agrandie des lettres. Retire la goutte et l'effet disparaît avec la lentille : ni l'encre ni le papier n'ont changé.",
      {});
  }
]), ["Ces montages sont nouveaux, mais la règle ne change pas : vitesse, déviation par rapport à la normale, oeil qui prolonge tout droit.", "Cherche ce qui est traversé, et dans quel sens la lumière peut y changer de vitesse."]);

E("s8f-u3-refraction-affirmation", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return mcq("Un élève affirme : « Le prisme fabrique les couleurs, parce qu'il ajoute ses propres pigments à la lumière blanche qui le traverse. » Quelle évaluation de cette affirmation est correcte?",
      "Elle est fausse : les couleurs sont déjà présentes dans la lumière blanche, et le prisme les sépare seulement, parce que sa réfraction dévie chaque couleur d'une quantité légèrement différente des autres",
      ["Elle est juste : les couleurs apparaissent seulement à l'intérieur du verre du prisme, dont les pigments se mélangent à la lumière blanche pendant la traversée et peignent le faisceau de toutes ces couleurs",
       "Elle est fausse : les couleurs viennent de l'écran sur lequel le faisceau tombe, dont la peinture réagit à la lumière blanche et se sépare en bandes colorées quand le faisceau du prisme la frappe assez fort",
       "Elle est juste en partie : le prisme fabrique les couleurs chaudes, comme le rouge et l'orange, mais les couleurs froides, comme le bleu et le violet, étaient déjà présentes dans la lumière blanche au départ"],
      "L'affirmation donne au prisme un travail qu'il ne fait pas. La lumière blanche est un mélange de couleurs; le prisme ne fait que réfracter, et sa réfraction varie légèrement selon la couleur, le violet étant le plus dévié et le rouge le moins. Les couleurs sortent séparées parce qu'elles y étaient déjà, chacune prenant un trajet un peu différent.",
      {});
  },
  function () {
    return mcq("Un élève affirme : « Le fond de la piscine remonte vraiment pendant le jour, soulevé par l'eau chaude, et il redescend le soir. » Quelle évaluation de cette affirmation est correcte?",
      "Elle est fausse : le fond ne bouge pas; la lumière qui en vient se réfracte en sortant de l'eau, et l'oeil, qui prolonge les rayons en ligne droite, reconstruit le fond plus près de la surface qu'il ne l'est",
      ["Elle est juste : la chaleur du jour dilate l'eau de la piscine, qui pousse le fond vers le haut de quelques centimètres, et le refroidissement du soir laisse le fond redescendre exactement à sa place habituelle",
       "Elle est fausse : le fond ne bouge pas; c'est la surface de l'eau qui descend pendant le jour à cause de l'évaporation, ce qui rapproche vraiment le fond de l'oeil et le fait paraître plus haut qu'il ne l'est",
       "Elle est juste en partie : le fond remonte seulement dans la partie peu profonde de la piscine, où l'eau chaude peut le soulever, tandis que le fond de la partie profonde reste toujours exactement à sa place"],
      "Le fond est en béton : il ne remonte ni ne redescend. L'effet est entièrement dans le trajet de la lumière. Les rayons du fond se réfractent en quittant l'eau pour l'air, et l'oeil les prolonge en ligne droite, ce qui place le fond apparent plus haut que le fond réel, à toute heure du jour, dès qu'on le regarde à travers la surface.",
      {});
  },
  function () {
    return mcq("Un élève affirme : « La loupe étire les lettres elles-mêmes : son verre tire sur l'encre et agrandit l'impression pendant qu'on la regarde. » Quelle évaluation de cette affirmation est correcte?",
      "Elle est fausse : les lettres ne changent pas; la loupe réfracte la lumière qui vient d'elles, et l'oeil reçoit des rayons déviés qui lui font reconstruire une image des lettres plus grande que les lettres réelles",
      ["Elle est juste : le verre d'une loupe est légèrement élastique et il étire, en se bombant, l'image imprimée sur la page, de sorte que les lettres grandissent réellement pendant tout le temps qu'on les regarde",
       "Elle est fausse : les lettres ne changent pas; la loupe réfléchit la lumière qui vient d'elles sur ses deux surfaces polies, et l'oeil rassemble ces réflexions en une image des lettres plus grande que les lettres",
       "Elle est juste en partie : la loupe étire les lettres qui se trouvent exactement sous son centre, mais les lettres près de ses bords gardent leur vraie taille, parce que le verre n'y est pas assez bombé pour tirer"],
      "Rien n'arrive à l'encre : éloigne la loupe et les lettres reprennent leur taille, intactes. La loupe est une lentille convergente; elle réfracte les rayons venant des lettres à ses deux surfaces, et l'oeil, prolongeant ces rayons déviés en ligne droite, reconstruit une image agrandie. L'agrandissement est dans le trajet de la lumière, pas dans la page.",
      {});
  },
  function () {
    return mcq("Un élève affirme : « Dans l'aquarium, le faisceau de la lampe se plie parce que l'eau le pousse de côté, comme un courant pousse un bâton flottant. » Quelle évaluation de cette affirmation est correcte?",
      "Elle est fausse : rien ne pousse le faisceau; il se dévie à la surface parce que la lumière change de vitesse en passant de l'air à l'eau, et ce changement de vitesse à la frontière est la réfraction elle-même",
      ["Elle est juste : l'eau de l'aquarium exerce une pression latérale sur tout ce qui la traverse, y compris la lumière, et cette poussée explique pourquoi le faisceau se plie davantage quand l'eau est plus profonde",
       "Elle est fausse : rien ne pousse le faisceau; il se dévie à la surface parce que l'eau absorbe sa partie centrale et ne laisse passer que ses bords, ce qui donne seulement l'impression d'un faisceau plié en deux",
       "Elle est juste en partie : un courant réel dans l'aquarium peut pousser légèrement le faisceau, mais un faisceau dans une eau parfaitement immobile resterait toujours parfaitement droit de la surface au fond"],
      "La comparaison avec le bâton est séduisante mais fausse : la lumière n'est pas un objet flottant et l'eau immobile dévie le faisceau tout autant. La déviation se produit à la frontière, au moment où la lumière change de milieu et donc de vitesse : entrant dans l'eau, plus dense, elle ralentit et se dévie vers la normale. C'est ce changement de vitesse, et non une poussée, qui plie le faisceau.",
      {});
  }
]), ["Juge l'affirmation, pas seulement le phénomène : le mécanisme proposé est-il le bon?", "Les bonnes évaluations gardent le phénomène et remplacent la cause par la réfraction."]);

E("s8f-u3-cr-refraction-paille", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return textq("Une paille droite est plongée dans un grand verre d'eau claire. Vue de côté, elle semble pliée exactement à la surface de l'eau : la partie immergée ne semble pas alignée avec la partie hors de l'eau. Explique cette apparence en détail : ce qui arrive à la lumière de la partie immergée à la surface, pourquoi l'oeil est trompé, et pourquoi l'effet se produit précisément à la surface. (3 points)",
      ["la lumière de la partie immergée se réfracte à la surface en passant de l'eau à l'air", "elle accélère en entrant dans l'air et se dévie en s'éloignant de la normale", "l'oeil prolonge les rayons en ligne droite et reconstruit la partie immergée déplacée", "seule la partie immergée envoie sa lumière à travers la surface, donc seule elle est déplacée"],
      "<b>Réponse modèle:</b> La lumière qui vient de la partie immergée de la paille doit traverser la surface pour atteindre l'oeil. À cette frontière, elle passe de l'eau, plus dense, à l'air, moins dense : elle accélère et se réfracte, en se déviant en s'éloignant de la normale. L'oeil et le cerveau supposent que la lumière a voyagé en ligne droite : ils prolongent les rayons déviés tout droit vers l'arrière et reconstruisent la partie immergée à une position déplacée, plus relevée que sa position réelle. La partie hors de l'eau envoie sa lumière directement à l'oeil, sans traverser de surface, donc elle paraît à sa vraie place. Les deux parties semblent donc désalignées exactement à la surface, là où la réfraction se produit, et la paille paraît pliée.<br><br><b>Points d'attribution:</b> 1 point pour la réfraction à la surface (la lumière de la partie immergée change de direction en passant de l'eau à l'air, en s'éloignant de la normale à mesure qu'elle accélère). 1 point pour l'oeil trompé (il prolonge les rayons en ligne droite et reconstruit la partie immergée à une position déplacée et relevée). 1 point pour le pli situé à la surface (seule la lumière de la partie immergée traverse la frontière, donc seule cette partie paraît déplacée).",
      {});
  },
  function () {
    return textq("Une paille semble pliée dans un verre d'eau, mais dès qu'on la retire du verre, elle est parfaitement droite, et elle le redevient chaque fois. Un élève conclut que l'eau plie la paille seulement pendant qu'elle est immergée. Réfute sa conclusion et explique la vraie cause de l'apparence, en précisant ce qui arrive à la lumière à la surface et pourquoi l'oeil place mal la partie immergée. (3 points)",
      ["la paille ne change jamais; seule la lumière qui en vient change de direction", "à la surface, la lumière sortant de l'eau accélère et se dévie en s'éloignant de la normale", "l'oeil prolonge les rayons en ligne droite et voit la partie immergée relevée et décalée", "retirée de l'eau, la paille n'envoie plus de lumière à travers une surface, donc l'effet disparaît"],
      "<b>Réponse modèle:</b> La conclusion de l'élève est fausse : la paille ne se plie à aucun moment, ce que prouve son état intact dès qu'on la retire, et une pression d'eau ordinaire ne plierait pas une paille rigide pour la redresser ensuite sans trace. La vraie cause est dans le trajet de la lumière. Les rayons de la partie immergée traversent la surface de l'eau pour atteindre l'oeil; en passant de l'eau à l'air, ils accélèrent et se réfractent en s'éloignant de la normale. L'oeil prolonge ces rayons déviés en ligne droite et reconstruit donc la partie immergée plus relevée et décalée qu'elle ne l'est, d'où le pli apparent à la surface. Une fois la paille retirée, aucun rayon ne traverse plus de frontière avant l'oeil, et la paille paraît simplement droite, comme elle l'a toujours été.<br><br><b>Points d'attribution:</b> 1 point pour la réfutation (la paille ne change jamais; l'effet disparaît dès le retrait, donc il est dans la lumière, pas dans la paille). 1 point pour la réfraction à la surface (la lumière sortant de l'eau accélère et se dévie en s'éloignant de la normale). 1 point pour l'oeil trompé (il prolonge les rayons en ligne droite et reconstruit la partie immergée relevée et décalée, d'où le pli à la surface).",
      {});
  }
]), ["La paille est droite; tout se joue dans le trajet de sa lumière.", "Trois maillons : la surface, le changement de vitesse et de direction, puis l'oeil qui prolonge tout droit."]);

E("s8f-u3-cr-refraction-lumiere", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return textq("Un faisceau étroit d'une boîte à rayons entre en oblique dans un bac d'eau claire, de l'air vers l'eau. Décris le trajet complet du faisceau : ce qui arrive à sa vitesse à la surface, dans quel sens il se dévie par rapport à la normale, et une conséquence que les élèves peuvent observer dans le bac. (3 points)",
      ["la lumière ralentit en passant de l'air à l'eau, un milieu plus dense", "elle se dévie vers la normale à la surface", "le faisceau change visiblement de direction à la surface et frappe le fond décalé par rapport à son prolongement droit"],
      "<b>Réponse modèle:</b> Le faisceau voyage d'abord en ligne droite dans l'air. À la surface de l'eau, il entre dans un milieu plus dense : sa vitesse diminue, et ce ralentissement le dévie vers la normale, donc il poursuit dans l'eau selon un angle plus petit par rapport à la normale que son angle d'arrivée. Conséquence observable : le faisceau présente un coude net à la surface, et il frappe le fond du bac plus près de la verticale, décalé par rapport à l'endroit où son prolongement en ligne droite l'aurait envoyé; un objet placé au fond semble, vu de l'air, relevé par le même effet.<br><br><b>Points d'attribution:</b> 1 point pour le changement de vitesse correct (la lumière ralentit en passant de l'air à l'eau). 1 point pour le sens de la déviation correct (vers la normale). 1 point pour une conséquence observable valide (le coude du faisceau à la surface, le point d'impact décalé au fond, ou un objet du fond qui semble relevé).",
      {});
  },
  function () {
    return textq("Un faisceau étroit voyage à l'intérieur d'un bloc de verre semi-circulaire et en sort en oblique, du verre vers l'air. Décris le trajet complet du faisceau : ce qui arrive à sa vitesse à la surface de sortie, dans quel sens il se dévie par rapport à la normale, et une conséquence que les élèves peuvent observer sur l'écran placé derrière le bloc. (3 points)",
      ["la lumière accélère en passant du verre à l'air, un milieu moins dense", "elle se dévie en s'éloignant de la normale à la surface de sortie", "le point lumineux sur l'écran est décalé par rapport à la position qu'un trajet tout droit aurait donnée"],
      "<b>Réponse modèle:</b> À l'intérieur du verre, le faisceau voyage en ligne droite, plus lentement que dans l'air. À la surface de sortie, il entre dans un milieu moins dense : sa vitesse augmente, et cette accélération le dévie en s'éloignant de la normale, donc il repart dans l'air selon un angle plus grand par rapport à la normale que son angle d'arrivée à la surface. Conséquence observable : le point lumineux sur l'écran derrière le bloc est décalé par rapport à l'endroit où il tomberait si le faisceau avait continué tout droit à travers le bloc; en traçant les deux trajets, les élèves voient le coude du faisceau à la surface de sortie.<br><br><b>Points d'attribution:</b> 1 point pour le changement de vitesse correct (la lumière accélère en passant du verre à l'air). 1 point pour le sens de la déviation correct (en s'éloignant de la normale). 1 point pour une conséquence observable valide (le point lumineux décalé sur l'écran, ou le coude visible du faisceau à la surface de sortie).",
      {});
  },
  function () {
    return textq("La lumière d'une petite lampe placée sous l'eau d'un aquarium remonte en oblique et sort dans l'air avant d'atteindre l'oeil d'un observateur. Décris le trajet complet de cette lumière : ce qui arrive à sa vitesse à la surface, dans quel sens elle se dévie par rapport à la normale, et une conséquence que l'observateur peut constater en regardant la lampe. (3 points)",
      ["la lumière accélère en passant de l'eau à l'air, un milieu moins dense", "elle se dévie en s'éloignant de la normale à la surface", "la lampe semble plus près de la surface qu'elle ne l'est réellement, car l'oeil prolonge les rayons en ligne droite"],
      "<b>Réponse modèle:</b> La lumière de la lampe voyage en ligne droite dans l'eau, plus lentement que dans l'air. À la surface, elle entre dans un milieu moins dense : sa vitesse augmente, et cette accélération la dévie en s'éloignant de la normale, donc elle atteint l'oeil selon un angle plus ouvert que son trajet dans l'eau. Conséquence observable : l'oeil prolonge les rayons reçus en ligne droite et reconstruit la lampe plus près de la surface qu'elle ne l'est réellement; la lampe paraît relevée dans l'aquarium, et viser sa position apparente avec une pince la manquerait par en dessous.<br><br><b>Points d'attribution:</b> 1 point pour le changement de vitesse correct (la lumière accélère en passant de l'eau à l'air). 1 point pour le sens de la déviation correct (en s'éloignant de la normale). 1 point pour une conséquence observable valide (la lampe semble relevée, plus près de la surface, ou toute visée sur sa position apparente la manque).",
      {});
  }
]), ["Décris le trajet en trois temps : avant la frontière, à la frontière, après la frontière.", "Le sens de la déviation suit le changement de vitesse : ralentir rapproche de la normale, accélérer en éloigne."]);

/* ----- bank-u4.js ----- */
// CRMARKS: s8f-u4-cr-besoins-experience=3
// CRMARKS: s8f-u4-cr-living=3
// CRMARKS: s8f-u4-cr-cell-division=3
// CRMARKS: s8f-u4-cr-levels=3
// CRMARKS: s8f-u4-cr-factors=3
// CRMARKS: s8f-u4-cr-interdependence=3
// CRMARKS: s8f-u4-cr-organelles=3
// CRMARKS: s8f-u4-cr-artificial=4
// CRMARKS: s8f-u4-cr-community=3
// CRMARKS: s8f-u4-cr-decision=3
// CRMARKS: s8f-u4-cr-propose=3
// CRMARKS: s8f-u4-cr-decision-personal=3
// CRMARKS: s8f-u4-cr-microscope=3
// CRMARKS: s8f-u4-cr-model-eval=3
// CRMARKS: s8f-u4-cr-design-rates=4
// CRMARKS: s8f-u4-cr-cellule-comparer=2
// CRMARKS: s8f-u4-cr-niveaux-appliquer=4
// CRMARKS: s8f-u4-cr-systemes-reponse=4
// CRMARKS: s8f-u4-cr-cellule-vivante=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s8f-u4-living-chars=2
// CRMARKS: s8f-u4-nonliving=2
// CRMARKS: s8f-u4-differences=2
// CRMARKS: s8f-u4-cell-figure=2
// CRMARKS: s8f-u4-vacuole-compare=3
// CRMARKS: s8f-u4-regular-shape=2
// CRMARKS: s8f-u4-identical=2
// CRMARKS: s8f-u4-division-count=2
// CRMARKS: s8f-u4-order=2
// CRMARKS: s8f-u4-example-level=2
// CRMARKS: s8f-u4-analogy=2
// CRMARKS: s8f-u4-needs=2
// CRMARKS: s8f-u4-needs-apply=3
// CRMARKS: s8f-u4-needs-system=3
// CRMARKS: s8f-u4-factor-positive=2
// CRMARKS: s8f-u4-factor-effect=3
// CRMARKS: s8f-u4-sedentary=3
// CRMARKS: s8f-u4-pair-circ-resp=2
// CRMARKS: s8f-u4-pair-dig-circ=2
// CRMARKS: s8f-u4-pair-nerv-musc=3
// CRMARKS: s8f-u4-interdependence-why=4
// CRMARKS: s8f-u4-early-modern=3
// CRMARKS: s8f-u4-dynamic=3
// CRMARKS: s8f-u4-micro-development=2
// CRMARKS: s8f-u4-micro-parts=2
// CRMARKS: s8f-u4-organelle-figure=2
// CRMARKS: s8f-u4-organelle-function=2
// CRMARKS: s8f-u4-organelle-match=2
// CRMARKS: s8f-u4-organelle-plant=2
// CRMARKS: s8f-u4-tech-examples=2
// CRMARKS: s8f-u4-tech-match=2
// CRMARKS: s8f-u4-knowledge-tech2=3
// CRMARKS: s8f-u4-community-need=3
// CRMARKS: s8f-u4-decision-sr=3
// CRMARKS: s8f-u4-propose-sr=3
// CRMARKS: s8f-u4-personal-decision=3
// CRMARKS: s8f-u4-careers=2
// CRMARKS: s8f-u4-careers-match=2
// CRMARKS: s8f-u4-focus-sequence=2
// CRMARKS: s8f-u4-parts-action=2
// CRMARKS: s8f-u4-care=2
// CRMARKS: s8f-u4-care-error=3
// CRMARKS: s8f-u4-estimate-gen=2
// CRMARKS: s8f-u4-estimate-compare=2
// CRMARKS: s8f-u4-estimate-scenario=2
// CRMARKS: s8f-u4-model-accuracy=3
// CRMARKS: s8f-u4-variables=3
// CRMARKS: s8f-u4-protocol=2
// CRMARKS: s8f-u4-testable=3
// CRMARKS: s8f-u4-testable2=2
// CRMARKS: s8f-u4-hypothesis=3
// CRMARKS: s8f-u4-hypothesis-basis=2
// CRMARKS: s8f-u4-control=3
// CRMARKS: s8f-u4-control-error=3
// CRMARKS: s8f-u4-graph-choice=3
// CRMARKS: s8f-u4-rates-figure=2
// CRMARKS: s8f-u4-recovery-figure=3
// CRMARKS: s8f-u4-organize=2
// CRMARKS: s8f-u4-organize-avg=3
// CRMARKS: s8f-u4-niveaux-identifier=2
// CRMARKS: s8f-u4-besoins-appliques=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s8f-u4-living-chars=a
// BIMODAL: s8f-u4-nonliving=b
// BIMODAL: s8f-u4-differences=a
// BIMODAL: s8f-u4-cell-figure=a
// BIMODAL: s8f-u4-vacuole-compare=b
// BIMODAL: s8f-u4-regular-shape=a
// BIMODAL: s8f-u4-identical=a
// BIMODAL: s8f-u4-division-count=a
// BIMODAL: s8f-u4-order=a
// BIMODAL: s8f-u4-example-level=a
// BIMODAL: s8f-u4-analogy=a
// BIMODAL: s8f-u4-needs=a
// BIMODAL: s8f-u4-needs-apply=b
// BIMODAL: s8f-u4-needs-system=b
// BIMODAL: s8f-u4-factor-positive=a
// BIMODAL: s8f-u4-factor-effect=b
// BIMODAL: s8f-u4-sedentary=b
// BIMODAL: s8f-u4-pair-circ-resp=b
// BIMODAL: s8f-u4-pair-dig-circ=a
// BIMODAL: s8f-u4-pair-nerv-musc=b
// BIMODAL: s8f-u4-interdependence-why=b
// BIMODAL: s8f-u4-early-modern=b
// BIMODAL: s8f-u4-dynamic=b
// BIMODAL: s8f-u4-micro-development=b
// BIMODAL: s8f-u4-micro-parts=a
// BIMODAL: s8f-u4-organelle-figure=a
// BIMODAL: s8f-u4-organelle-function=b
// BIMODAL: s8f-u4-organelle-match=a
// BIMODAL: s8f-u4-organelle-plant=a
// BIMODAL: s8f-u4-tech-examples=a
// BIMODAL: s8f-u4-tech-match=b
// BIMODAL: s8f-u4-knowledge-tech2=b
// BIMODAL: s8f-u4-community-need=b
// BIMODAL: s8f-u4-decision-sr=b
// BIMODAL: s8f-u4-propose-sr=b
// BIMODAL: s8f-u4-personal-decision=b
// BIMODAL: s8f-u4-careers=a
// BIMODAL: s8f-u4-careers-match=b
// BIMODAL: s8f-u4-focus-sequence=b
// BIMODAL: s8f-u4-parts-action=b
// BIMODAL: s8f-u4-care=b
// BIMODAL: s8f-u4-care-error=b
// BIMODAL: s8f-u4-estimate-gen=a
// BIMODAL: s8f-u4-estimate-compare=b
// BIMODAL: s8f-u4-estimate-scenario=a
// BIMODAL: s8f-u4-model-accuracy=b
// BIMODAL: s8f-u4-variables=b
// BIMODAL: s8f-u4-protocol=b
// BIMODAL: s8f-u4-testable=b
// BIMODAL: s8f-u4-testable2=b
// BIMODAL: s8f-u4-hypothesis=b
// BIMODAL: s8f-u4-hypothesis-basis=a
// BIMODAL: s8f-u4-control=b
// BIMODAL: s8f-u4-control-error=b
// BIMODAL: s8f-u4-graph-choice=b
// BIMODAL: s8f-u4-rates-figure=a
// BIMODAL: s8f-u4-recovery-figure=a
// BIMODAL: s8f-u4-organize=b
// BIMODAL: s8f-u4-organize-avg=b
// BIMODAL: s8f-u4-niveaux-identifier=a
// BIMODAL: s8f-u4-besoins-appliques=a
/* ============================================================
   Sciences 8 (FR) — Unité 4 : Les cellules, les tissus, les
   organes et les systèmes
   Banque construite le Nov 16, 2026. Indicateurs SC8.10.1 à
   SC8.12.12 (groupes 10, 11 et 12 du guide français).
   Existing tests and question banks were reviewed only to gauge
   the expected depth and range of treatment. All items in this
   bank were written new for this app.

   Discipline du guide : la théorie cellulaire au niveau
   d'introduction; la mitose sans ses étapes; les six systèmes
   traités de façon globale (aucune fonction organe par organe,
   aucun étiquetage de diagrammes de systèmes); l'interdépendance
   limitée aux trois paires du guide (circulatoire et
   respiratoire, digestif et circulatoire, nerveux et
   musculaire); l'estimation des tailles sans calculs de
   rapports. La figure de la cellule applique l'erratum du
   manuel : la paroi est étiquetée à l'extérieur de la membrane.
   Résidu CORE : SC8.12.1 et SC8.12.3 évaluent les connaissances
   sur le microscope, la séquence et les décisions d'entretien;
   la manipulation elle-même s'évalue en classe. SC8.12.4 porte
   une question sur l'exactitude des modèles; la construction
   coopérative est le résidu.
   ============================================================ */

/* Aides locales : format des nombres (virgule décimale) et
   choix de distracteurs numériques distincts. */
function s8fn(v) {
  var r = Math.round(v * 100) / 100;
  return String(r).replace(".", ",");
}
function s8fdis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var v = Math.round(cand[i] * 100) / 100;
    if (v !== key && v > 0 && out.indexOf(v) < 0) out.push(v);
  }
  return out;
}

/* ---------- SC8.10.1 Théorie cellulaire et caractéristiques de la vie ---------- */

E("s8f-u4-theory-parts", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "Toutes les cellules viennent d'autres cellules préexistantes",
    ["Toutes les cellules sont entourées de parois cellulaires", "Toutes les cellules possèdent un noyau en leur centre", "Tous les êtres vivants sont faits de deux cellules ou plus"],
    "La théorie cellulaire énonce que tous les êtres vivants sont faits de cellules, que la cellule est l'unité de base de la vie, et que toutes les cellules viennent d'autres cellules préexistantes. Les parois cellulaires et les noyaux se trouvent dans certaines cellules, pas toutes.", {}); },
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "Tous les êtres vivants sont faits d'une ou de plusieurs cellules",
    ["Toutes les cellules peuvent se voir sans microscope", "Toutes les cellules font la photosynthèse", "Tous les êtres vivants sont faits exactement du même genre de cellule"],
    "La théorie cellulaire énonce que tous les êtres vivants sont faits d'une ou de plusieurs cellules, que la cellule est l'unité de base de la vie, et que les cellules viennent de cellules préexistantes. La plupart des cellules sont microscopiques, et seulement certaines font la photosynthèse.", {}); },
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "La cellule est l'unité de base de la vie",
    ["La cellule est la plus grande unité de la vie", "Les cellules peuvent se former d'elles-mêmes à partir de matière non vivante", "Seuls les corps des animaux sont faits de cellules"],
    "La théorie cellulaire identifie la cellule comme l'unité de base de la vie : la plus petite unité qui accomplit les processus vitaux. Les cellules viennent d'autres cellules, et les corps des plantes sont faits de cellules aussi.", {}); }
]), ["Pense à ce que tous les êtres vivants partagent.", "La théorie compte trois énoncés principaux sur les cellules."]);

E("s8f-u4-living-chars", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Un tournesol tourne ses feuilles vers le Soleil à mesure que le Soleil se déplace dans le ciel. Quelle caractéristique de la vie le tournesol montre-t-il?",
    "La réponse aux stimuli",
    ["La croissance", "Le mouvement de l'organisme entier", "La reproduction"],
    "Le tournesol répond à un stimulus, la lumière. Répondre aux changements de l'environnement est une des quatre caractéristiques de la vie, avec la croissance, le mouvement et la reproduction.", {}); },
  function () { return mcq("Au cours d'un été, un chiot gagne 6 kg et ses os s'allongent. De quelle caractéristique de la vie s'agit-il?",
    "La croissance",
    ["Le mouvement", "La reproduction", "La réponse aux stimuli"],
    "Devenir plus grand à mesure que les cellules se divisent et que le corps se développe, c'est la croissance, une des quatre caractéristiques de la vie.", {}); },
  function () { return mcq("Une seule bactérie se divise et devient deux bactéries. De quelle caractéristique de la vie s'agit-il?",
    "La reproduction",
    ["La croissance", "Le mouvement", "La réponse aux stimuli"],
    "Produire de nouveaux individus de la même sorte, c'est la reproduction, une des quatre caractéristiques de la vie. Une bactérie se reproduit en se divisant en deux cellules.", {}); }
]), ["Rappelle-toi les quatre caractéristiques de la vie.", "Croissance, mouvement, réponse aux stimuli, reproduction."]);

E("s8f-u4-nonliving", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Lequel de ceux-ci est non vivant?",
    "Un rocher de granite",
    ["Un champignon", "Une cellule de levure", "Une algue marine"],
    "Un rocher ne croît pas, ne bouge pas de lui-même, ne répond pas aux stimuli et ne se reproduit pas, et il n'est pas fait de cellules. Les champignons, la levure et les algues sont des organismes vivants faits de cellules.", {}); },
  function () { return mcq("La flamme d'une bougie grandit, vacille et semble bouger. Pourquoi une flamme n'est-elle pas vivante?",
    "Elle n'est pas faite de cellules et ne se reproduit pas ni ne répond comme les organismes le font",
    ["Elle est simplement trop chaude, vacillant au sommet de la bougie, pour que quoi que ce soit de vivant y survive", "Elle n'a pas besoin de l'oxygène de l'air autour d'elle pour continuer à brûler sur la bougie allumée", "Elle dégage de la lumière et de la chaleur dans la pièce tout autour d'elle tant qu'elle brûle"],
    "Les flammes peuvent croître et bouger, mais elles ne sont pas faites de cellules, ne se reproduisent pas et ne répondent pas aux stimuli comme les organismes. Les êtres vivants montrent les quatre caractéristiques et sont faits de cellules.", {}); }
]), ["Vérifie chaque option contre les caractéristiques de la vie.", "Les êtres vivants sont faits de cellules."]);

E("s8f-u4-cr-living", 4, ["SC8.10.1"], 2, "var", varset([
  function () { return textq("Un élève soutient qu'une graine n'est pas vivante parce qu'elle ne bouge pas. Utilise les caractéristiques de la vie et la théorie cellulaire pour expliquer pourquoi une graine est un être vivant. (3 points)",
    ["une graine est faite de cellules", "le mouvement n'est qu'une des quatre caractéristiques de la vie", "une graine croît en une plante et répond à des conditions comme l'eau et la chaleur en germant"],
    "<b>Réponse modèle:</b> Une graine est faite de cellules, et la théorie cellulaire énonce que tous les êtres vivants sont faits de cellules. Le mouvement n'est qu'une des quatre caractéristiques de la vie. Une graine montre les autres : elle croît en une nouvelle plante, elle répond aux stimuli comme l'eau et la chaleur en germant, et elle existe à cause de la reproduction. Un organisme n'a pas besoin de montrer les quatre caractéristiques à chaque instant pour être vivant.<br><br><b>Points d'attribution:</b> 1 point pour noter que la graine est faite de cellules. 1 point pour nommer des caractéristiques de la vie au-delà du mouvement. 1 point pour appliquer au moins l'une d'elles à la graine (la croissance à la germination, ou la réponse à l'eau et à la chaleur).", {}); }
]), ["Le mouvement n'est qu'une des quatre caractéristiques.", "Qu'est-ce qu'une graine fait d'autre?"]);

/* ---------- SC8.10.2 Cellules végétales et animales ---------- */

E("s8f-u4-differences", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Quelle structure se trouve dans les cellules végétales mais pas dans les cellules animales?",
    "Les chloroplastes",
    ["La membrane cellulaire", "Le cytoplasme", "Le noyau"],
    "Les cellules végétales ont des chloroplastes, où la photosynthèse se produit. Les cellules animales n'en ont pas. Les deux types de cellules ont une membrane, du cytoplasme et un noyau.", {}); },
  function () { return mcq("Quelle structure se trouve dans les cellules végétales mais pas dans les cellules animales?",
    "Une paroi cellulaire",
    ["Les mitochondries", "Des vacuoles de toute taille", "Un noyau"],
    "Les cellules végétales ont une paroi cellulaire à l'extérieur de la membrane, ce que les cellules animales n'ont pas. Les deux ont des mitochondries et un noyau, et les deux ont des vacuoles, bien que les vacuoles végétales soient plus grandes.", {}); }
]), ["Rappelle-toi les trois différences entre les cellules végétales et animales.", "Chloroplastes, parois cellulaires, taille des vacuoles."]);

E("s8f-u4-cell-figure", 4, ["SC8.10.2", "SC8.11.3"], 1, "var", varset([
  function () { var q = mcq("Le diagramme montre une cellule végétale. Quelle lettre étiquette le chloroplaste?",
    "E", ["A", "C", "D"],
    "La lettre E pointe vers un chloroplaste, une des petites structures vertes où la photosynthèse a lieu. A est la paroi cellulaire, C le noyau et D la vacuole.", {});
    q.figure = s8fCellSVG("plant"); return q; },
  function () { var q = mcq("Le diagramme montre une cellule végétale. Quelle lettre étiquette la grande vacuole?",
    "D", ["B", "E", "F"],
    "La lettre D pointe vers la grande vacuole centrale, qui emmagasine l'eau et d'autres matériaux. Les cellules végétales ont des vacuoles moins nombreuses et plus grandes que les cellules animales. B est la membrane cellulaire, E un chloroplaste et F une mitochondrie.", {});
    q.figure = s8fCellSVG("plant"); return q; }
]), ["Trouve les petites structures ovales vertes.", "Les chloroplastes font la photosynthèse."]);

E("s8f-u4-vacuole-compare", 4, ["SC8.10.2"], 2, "var", varset([
  function () { return mcq("Comment les vacuoles diffèrent-elles entre les cellules végétales et animales?",
    "Les cellules végétales ont des vacuoles moins nombreuses et plus grandes; les cellules animales en ont de plus petites",
    ["Les cellules animales ont une très grande vacuole et les cellules végétales n'en ont aucune du tout", "Seules les cellules animales ont des vacuoles dans leur cytoplasme", "Les vacuoles sont identiques dans les deux types de cellules"],
    "Les deux types de cellules ont des vacuoles, mais les cellules végétales en ont moins et de plus grandes, souvent une grande vacuole centrale, tandis que les vacuoles des cellules animales sont plus petites.", {}); },
  function () { return mcq("Un élève regarde deux cellules. L'une a une très grande vacuole centrale qui occupe une bonne partie de la cellule. La cellule est le plus probablement une",
    "cellule végétale, parce que les cellules végétales ont des vacuoles moins nombreuses et plus grandes",
    ["cellule animale, parce que les vacuoles animales sont toujours la plus grande structure de la cellule", "bactérie, parce que les bactéries emmagasinent tout dans une seule vacuole au centre de la cellule", "cellule de champignon, parce que seuls les champignons ont des vacuoles dans leurs cellules"],
    "Une seule grande vacuole centrale est un trait de la cellule végétale : les cellules végétales ont des vacuoles moins nombreuses et plus grandes que les cellules animales.", {}); }
]), ["Rappelle-toi la différence des vacuoles.", "Moins nombreuses et plus grandes chez les plantes."]);

E("s8f-u4-regular-shape", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Les cellules végétales gardent habituellement une forme régulière et fixe. Qu'est-ce qui leur donne cette forme?",
    "La paroi cellulaire",
    ["La membrane cellulaire", "La vacuole", "Les chloroplastes"],
    "La paroi cellulaire rigide à l'extérieur de la membrane tient la cellule végétale dans une forme régulière. Les cellules animales, sans paroi, ont des formes plus variées.", {}); }
]), ["Quelle structure propre aux plantes est rigide?", "Elle se trouve à l'extérieur de la membrane."]);

/* ---------- SC8.10.3 La division cellulaire ---------- */

E("s8f-u4-identical", 4, ["SC8.10.3"], 1, "var", varset([
  function () { return mcq("Quand une cellule du corps se divise par mitose, le résultat est",
    "deux nouvelles cellules identiques à la cellule originale",
    ["deux cellules avec chacune la moitié du matériel original enlevé en permanence", "une grande cellule et une cellule sans noyau du tout", "des cellules d'un type complètement différent"],
    "La mitose produit de nouvelles cellules identiques à l'originale. Ton corps l'utilise pour croître et pour remplacer les cellules usées ou endommagées.", {}); }
]), ["Pense à ce qu'identique signifie ici.", "La croissance et la réparation exigent des cellules assorties."]);

E("s8f-u4-division-count", 4, ["SC8.10.3"], 2, "gen", function () {
  var rounds = pick([2, 3, 4]);
  var cells = Math.pow(2, rounds);
  var dis = s8fdis(cells, [cells * 2, rounds * 2, cells + rounds, cells - 2]);
  return mcq("Une seule cellule se divise pour former deux cellules, et chacune de celles-ci se divise encore, et ainsi de suite. Après " + rounds + " rondes de division, combien de cellules y a-t-il?",
    cells + "", dis.map(String),
    "Chaque ronde double le nombre de cellules : après 1 ronde il y en a 2, après 2 rondes 4, doublant chaque fois. Après " + rounds + " rondes, il y a 2 x 2" + (rounds > 2 ? " x 2" : "") + (rounds > 3 ? " x 2" : "") + " = " + cells + " cellules.", {});
}, ["Chaque division double le compte.", "Multiplie par 2 une fois par ronde."]);

E("s8f-u4-growth-example", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return mcq("Tu te coupes le doigt. Au cours de la semaine suivante, la coupure guérit à mesure qu'une nouvelle peau la couvre. D'où viennent les nouvelles cellules de la peau?",
    "Les cellules de peau existantes se sont divisées par mitose pour produire de nouvelles cellules identiques",
    ["Des cellules de peau toutes faites ont voyagé à travers le corps depuis l'estomac jusqu'à la coupure au doigt", "La coupure elle-même a produit les nouvelles cellules à partir de matière non vivante dans le pansement et l'air", "Des cellules d'os du fond du doigt se sont changées elles-mêmes en nouvelles cellules de peau à la coupure"],
    "La guérison est la croissance et la réparation par mitose : les cellules de peau près de la coupure se divisent pour produire de nouvelles cellules de peau identiques qui couvrent la blessure.", {}); },
  function () { return mcq("Lequel est un exemple de division cellulaire servant la reproduction plutôt que la croissance?",
    "Une bactérie qui se divise en deux bactéries",
    ["Des cellules de peau qui remplacent une éraflure", "Les os d'un enfant qui s'allongent", "Des cellules musculaires qui augmentent après l'entraînement"],
    "Quand une bactérie se divise, elle produit un nouvel organisme, donc la division est la reproduction. Les autres exemples sont la croissance ou la réparation à l'intérieur d'un seul organisme.", {}); }
]), ["La croissance et la réparation se produisent à l'intérieur d'un seul organisme.", "Un nouvel organisme veut dire reproduction."]);

E("s8f-u4-cr-cell-division", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return textq("Explique comment la division cellulaire par mitose sert deux buts différents chez les êtres vivants, un pour un organisme à plusieurs cellules et un pour un organisme à une seule cellule. Donne un exemple de chacun. (3 points)",
    ["la mitose produit de nouvelles cellules identiques", "chez un organisme à plusieurs cellules, elle permet la croissance et la réparation, comme les cellules de peau qui guérissent une coupure", "chez un organisme à une seule cellule comme une bactérie, se diviser produit un organisme entier nouveau, donc c'est la reproduction"],
    "<b>Réponse modèle:</b> La mitose est une division cellulaire qui produit de nouvelles cellules identiques à la cellule originale. Chez un organisme à plusieurs cellules, la mitose permet la croissance et la réparation : les cellules de peau se divisent pour guérir une coupure, produisant plus de cellules de peau exactement comme celles qui ont été endommagées. Chez un organisme à une seule cellule comme une bactérie, il n'y a pas de corps séparé à faire croître, donc quand la cellule se divise en deux, elle a produit un nouvel organisme : la division est sa reproduction.<br><br><b>Points d'attribution:</b> 1 point pour énoncer que la mitose produit de nouvelles cellules identiques. 1 point pour la croissance ou la réparation chez un organisme à plusieurs cellules avec un exemple valide. 1 point pour la division comme reproduction chez un organisme à une seule cellule avec un exemple valide.", {}); }
]), ["Cellules identiques d'abord, puis les deux buts.", "Pense à la peau qui guérit, puis à une bactérie."]);

/* ---------- SC8.10.4 Les niveaux d'organisation ---------- */

E("s8f-u4-order", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Quelle liste donne les niveaux d'organisation dans l'ordre correct, du plus petit au plus grand?",
    "Cellules, tissus, organes, systèmes d'organes, organismes",
    ["Cellules, organes, tissus, organismes, systèmes d'organes", "Tissus, cellules, organes, systèmes d'organes, organismes", "Organismes, systèmes d'organes, organes, tissus, cellules"],
    "Les niveaux se construisent : les cellules se groupent en tissus, les tissus en organes, les organes en systèmes d'organes, et les systèmes ensemble forment l'organisme.", {}); }
]), ["Commence par la cellule.", "Chaque niveau se construit à partir du précédent."]);

E("s8f-u4-example-level", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Un groupe de cellules semblables qui travaillent ensemble pour faire le même travail s'appelle un",
    "tissu", ["organe", "système d'organes", "organisme"],
    "Des cellules semblables qui travaillent ensemble forment un tissu, le deuxième niveau d'organisation. Des tissus différents se combinent en organes.", {}); },
  function () { return mcq("Le cœur est fait de tissu musculaire, de tissu nerveux et de tissu conjonctif qui travaillent ensemble. Le cœur est un exemple d'un",
    "organe", ["système d'organes", "organisme", "cellule"],
    "Un organe est fait de tissus différents qui travaillent ensemble pour un travail principal. Le cœur travaille avec les vaisseaux sanguins comme partie du système circulatoire.", {}); }
]), ["Associe la définition au niveau.", "Cellules semblables ensemble : un niveau au-dessus des cellules."]);

E("s8f-u4-analogy", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Dans l'analogie du bâtiment pour les niveaux d'organisation, les briques sont les cellules et les murs sont les tissus. Que représentent les étages du bâtiment?",
    "Les systèmes d'organes",
    ["Les organes du corps", "Les organismes vivants", "Les cellules du corps"],
    "Dans l'analogie, les briques (cellules) construisent les murs (tissus), les murs forment les pièces (organes), les pièces font les étages (systèmes d'organes), et la maison entière est l'organisme.", {}); }
]), ["Monte l'analogie niveau par niveau.", "Les pièces sont les organes; le niveau suivant est..."]);

E("s8f-u4-cr-levels", 4, ["SC8.10.4"], 2, "var", varset([
  function () { return textq("Nomme les cinq niveaux d'organisation chez un organisme à plusieurs cellules, en ordre du plus petit au plus grand, et donne un exemple du corps pour le niveau du tissu et un pour le niveau de l'organe. (3 points)",
    ["les niveaux sont cellules, tissus, organes, systèmes d'organes et organismes", "le tissu musculaire est un exemple de tissu", "le cœur (ou l'estomac, ou le poumon) est un exemple d'organe"],
    "<b>Réponse modèle:</b> Du plus petit au plus grand, les niveaux sont les cellules, les tissus, les organes, les systèmes d'organes et les organismes. Un tissu est un groupe de cellules semblables qui font le même travail, comme le tissu musculaire. Un organe est fait de tissus différents qui travaillent ensemble, comme le cœur.<br><br><b>Points d'attribution:</b> 1 point pour les cinq niveaux dans l'ordre correct. 1 point pour un exemple valide de tissu. 1 point pour un exemple valide d'organe.", {}); }
]), ["Cinq niveaux, le plus petit d'abord.", "Tissu : cellules semblables. Organe : tissus ensemble."]);

/* ---------- SC8.10.5 Besoins de base des cellules et des organismes ---------- */

E("s8f-u4-needs", 4, ["SC8.10.5"], 1, "var", varset([
  function () { return mcq("Les cellules et les organismes entiers partagent les mêmes nécessités de base. Quelle liste les nomme?",
    "L'oxygène, les nutriments et l'élimination des déchets",
    ["La lumière du soleil, un sol pour s'enraciner et un abri contre le temps", "Un squelette d'os, des muscles qui fonctionnent et un réseau de nerfs", "Des graines, des œufs et les jeunes rejetons produits chaque saison"],
    "Chaque cellule a besoin d'oxygène et de nutriments, et a besoin que ses déchets soient éliminés, exactement comme l'organisme entier. Les systèmes du corps existent pour répondre à ces besoins des cellules.", {}); }
]), ["Pense à ce qu'une seule cellule doit prendre et rejeter.", "La liste compte trois éléments."]);

E("s8f-u4-needs-apply", 4, ["SC8.10.5"], 2, "var", varset([
  function () { return mcq("Pourquoi une cellule musculaire meurt-elle si son approvisionnement en oxygène est coupé assez longtemps, même si la cellule elle-même est microscopique?",
    "Les cellules ont les mêmes nécessités de base que l'organisme entier, y compris l'oxygène",
    ["Les cellules musculaires sont trop grandes pour survivre sans poumons à l'intérieur d'elles", "L'oxygène est nécessaire seulement aux organes, donc la cellule l'emprunte au cœur", "La cellule s'arrête parce que le cerveau lui envoie un signal de s'éteindre"],
    "Une seule cellule a besoin d'oxygène, de nutriments et d'élimination des déchets tout comme l'organisme entier. Coupe l'oxygène et la cellule ne peut pas continuer ses processus vitaux.", {}); }
]), ["Applique l'idée des nécessités partagées à une seule cellule.", "De quoi chaque cellule a-t-elle besoin?"]);

E("s8f-u4-needs-system", 4, ["SC8.10.5", "SC8.10.7"], 3, "var", varset([
  function () { return mcq("Une cellule au fond du muscle de ta jambe a besoin de nutriments qui sont entrés dans ton corps par un repas. Quelle paire de systèmes amène les nutriments du repas à cette cellule?",
    "Le système digestif décompose la nourriture et absorbe les nutriments, et le système circulatoire les transporte dans le sang jusqu'à la cellule",
    ["Le système respiratoire absorbe les nutriments du repas et le système nerveux les transporte en signaux jusqu'à la cellule dans la jambe", "Le système excréteur absorbe les nutriments du repas et le système musculaire les presse à travers le corps jusqu'à la cellule", "Le système digestif transporte lui-même les nutriments absorbés, par ses propres tubes, directement à chaque cellule de la jambe"],
    "Les nutriments traversent la paroi de l'intestin grêle dans le sang, et le système circulatoire les transporte aux cellules dans tout le corps. Les deux systèmes dépendent l'un de l'autre pour répondre aux besoins des cellules.", {}); }
]), ["Deux systèmes partagent ce travail.", "L'absorption d'abord, puis le transport."]);

/* ---------- SC8.10.6 Facteurs qui affectent les systèmes ---------- */

E("s8f-u4-factor-positive", 4, ["SC8.10.6"], 1, "var", varset([
  function () { return mcq("Quel facteur de mode de vie améliore l'efficacité des systèmes circulatoire et respiratoire?",
    "L'exercice régulier",
    ["Le tabagisme", "Un mode de vie sédentaire avec peu de mouvement", "Sauter des repas régulièrement"],
    "L'exercice régulier renforce le cœur et améliore la capacité respiratoire, donc les deux systèmes fonctionnent plus efficacement. Le tabagisme et l'inactivité réduisent leur efficacité.", {}); }
]), ["Des effets positifs seulement dans cette question.", "Pense à la forme physique."]);

E("s8f-u4-factor-effect", 4, ["SC8.10.6"], 2, "var", varset([
  function () { return mcq("Comment le tabagisme nuit-il le plus directement au système respiratoire?",
    "Il endommage les poumons et les voies respiratoires, donc les échanges gazeux deviennent moins efficaces",
    ["Il fait croître la trachée dans la gorge plus longue et plus large qu'elle devrait l'être avec le temps", "Il augmente le nombre d'alvéoles dans les poumons, donnant plus de surface pour les échanges gazeux", "Il renforce les muscles utilisés pour respirer, donc les poumons travaillent plus fort à chaque souffle"],
    "La fumée endommage les poumons et les voies respiratoires, réduisant la surface et l'efficacité des échanges gazeux, donc le système respiratoire livre moins d'oxygène au sang.", {}); },
  function () { return mcq("Une alimentation constamment riche en gras met le plus directement de la pression sur quel système, et pourquoi?",
    "Le système circulatoire, parce que les dépôts de gras rétrécissent les vaisseaux sanguins et font travailler le cœur plus fort",
    ["Le système nerveux, parce que les dépôts de gras bloquent les signaux qui voyagent le long des nerfs du corps entier", "Le système excréteur, parce que le gras dans le sang ne peut pas du tout être filtré par les reins du corps humain", "Le système musculaire, parce que le gras emmagasiné remplace complètement le tissu musculaire sain avec le temps"],
    "Les dépôts de gras rétrécissent les vaisseaux, augmentant le travail du cœur et réduisant l'efficacité du système circulatoire avec le temps.", {}); }
]), ["Nomme le système sur lequel le facteur agit.", "Puis dis comment son efficacité change."]);

E("s8f-u4-sedentary", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return mcq("Deux élèves ont des alimentations semblables. L'un est actif chaque jour; l'autre est sédentaire. Après un an, l'élève sédentaire se fatigue beaucoup plus vite en montant les escaliers. La meilleure explication est que",
    "sans activité régulière, le cœur et les muscles de la respiration restent moins efficaces, donc l'oxygène atteint les muscles plus lentement pendant l'effort",
    ["les poumons de l'élève sédentaire ont cessé d'échanger des gaz avec l'air même pendant que l'élève est au repos complet à la maison", "Être actif agrandit de façon permanente le cœur de l'élève actif, et seulement de cet élève-là, au cours de l'année écoulée", "le sang de l'élève sédentaire a perdu sa capacité de transporter l'oxygène des poumons aux muscles du corps tout entier"],
    "L'exercice garde les systèmes circulatoire et respiratoire efficaces. Sans lui, le cœur pompe moins efficacement et la capacité respiratoire est plus basse, donc pendant l'effort les muscles reçoivent l'oxygène plus lentement et se fatiguent plus tôt.", {}); }
]), ["Compare l'efficacité des deux systèmes.", "La livraison d'oxygène pendant l'effort est la clé."]);

E("s8f-u4-cr-factors", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return textq("Choisis deux facteurs de mode de vie de la liste du guide (alimentation, nutrition, exercice, stress, tabagisme, alcool, mode de vie sédentaire). Pour chacun, explique son effet sur la fonction ou l'efficacité d'un système du corps nommé. (3 points)",
    ["deux facteurs de la liste du guide, chacun lié à un système nommé", "un effet correct sur la fonction ou l'efficacité pour chacun", "au moins un effet expliqué comme un changement d'efficacité"],
    "<b>Réponse modèle:</b> Exercice : l'exercice régulier renforce le muscle du cœur, donc le système circulatoire pompe le sang et livre l'oxygène aux cellules plus efficacement. Tabagisme : la fumée endommage les poumons et les voies respiratoires, donc le système respiratoire échange l'oxygène et le dioxyde de carbone moins efficacement, et le sang transporte moins d'oxygène au corps.<br><br><b>Points d'attribution:</b> 1 point pour chaque facteur lié correctement à un système nommé avec un effet correct sur sa fonction ou son efficacité (2 points), et 1 point pour un effet expliqué comme un changement d'efficacité (une livraison, un échange ou une élimination plus ou moins efficace).", {}); }
]), ["Deux facteurs, deux systèmes.", "Dis comment l'efficacité change, pas seulement que c'est mauvais."]);

/* ---------- SC8.10.7 Interdépendance des systèmes ---------- */

E("s8f-u4-pair-circ-resp", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Comment les systèmes circulatoire et respiratoire dépendent-ils l'un de l'autre?",
    "Les poumons prennent l'oxygène et le passent au sang, et le sang le transporte aux cellules et ramène le dioxyde de carbone",
    ["Le cœur est l'organe qui respire l'air, et les poumons pompent ensuite cet air dans tout le corps par les vaisseaux", "Le sang lui-même fabrique l'oxygène pendant qu'il est dans les poumons, puis emmagasine l'oxygène dans le cœur", "Les poumons font le travail de filtrer les déchets du sang à la place des reins dans le corps humain"],
    "Le système respiratoire échange les gaz et le système circulatoire les transporte : l'oxygène des poumons aux cellules, le dioxyde de carbone des cellules de retour aux poumons.", {}); }
]), ["Un système échange, l'autre transporte.", "Suis l'oxygène, puis le dioxyde de carbone."]);

E("s8f-u4-pair-dig-circ", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Où les nutriments de la nourriture digérée passent-ils dans le sang?",
    "À travers la paroi de l'intestin grêle",
    ["À travers la paroi de l'estomac", "À travers la trachée", "À travers la peau sur l'abdomen"],
    "Le système digestif décompose la nourriture et les nutriments sont absorbés à travers la paroi de l'intestin grêle dans le sang, que le système circulatoire transporte ensuite aux cellules.", {}); }
]), ["L'absorption se produit dans un organe nommé.", "Il fait partie du tube digestif, après l'estomac."]);

E("s8f-u4-pair-nerv-musc", 4, ["SC8.10.7"], 2, "var", varset([
  function () { return mcq("Quand tu as froid, tu frissonnes. Quels deux systèmes travaillent ensemble dans le frissonnement, et comment?",
    "Le système nerveux détecte le froid et signale au système musculaire de se contracter rapidement, produisant de la chaleur",
    ["Le système digestif détecte le froid et le système excréteur produit la chaleur dans le corps en réponse au froid", "Le système respiratoire détecte le froid et le système circulatoire secoue les muscles du corps entier en réponse", "Le système musculaire détecte le froid lui-même et répond sans aucun signal du système nerveux du tout"],
    "Les organes des sens et le système nerveux détectent le changement de température et signalent aux muscles de se contracter rapidement. Le frissonnement est les systèmes nerveux et musculaire qui dépendent l'un de l'autre.", {}); },
  function () { return mcq("Par une journée chaude, ton visage devient rouge. Que s'est-il passé entre les systèmes?",
    "Le système nerveux a signalé aux petits muscles dans les vaisseaux sanguins de la peau de se détendre, laissant plus de sang couler près de la surface et libérer de la chaleur",
    ["Le système digestif a envoyé du sang supplémentaire aux vaisseaux du visage, où le sang est emmagasiné jusqu'à ce que le corps en ait besoin ailleurs plus tard", "Le système excréteur a poussé la sueur qu'il a produite dans les vaisseaux sanguins de la peau, qui ont transporté la sueur jusqu'au visage pour le refroidir", "Le système respiratoire a pompé de l'air frais des poumons directement dans les petits vaisseaux sanguins de la peau du visage pour la refroidir de l'intérieur"],
    "Le système nerveux coordonne la réponse : les muscles dans les parois des vaisseaux se détendent sous ses signaux, le débit sanguin près de la peau augmente, et la chaleur s'échappe. Les systèmes nerveux, musculaire et circulatoire interagissent.", {}); }
]), ["Un système sent et signale; un autre agit.", "Le frissonnement est un travail musculaire ordonné par les nerfs."]);

E("s8f-u4-interdependence-why", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return mcq("Pendant un sprint, la fréquence respiratoire et la fréquence cardiaque d'un coureur augmentent toutes les deux brusquement. Pourquoi doivent-elles augmenter ensemble?",
    "Les muscles qui travaillent ont besoin de beaucoup plus d'oxygène et produisent plus de dioxyde de carbone; les poumons doivent échanger les gaz plus vite pendant que le cœur les transporte plus vite, donc aucun système ne peut répondre au besoin seul",
    ["La fréquence cardiaque augmente d'abord au début du sprint, et la pression qu'elle construit dans la poitrine force les poumons à suivre derrière elle au même taux exactement, battement pour battement", "La fréquence respiratoire augmente pendant un sprint surtout pour refroidir le sang du coureur, et la fréquence cardiaque augmente seulement pour déplacer ce sang refroidi dans le corps jusqu'à la peau", "Les deux fréquences sont contrôlées par le corps du coureur pour augmenter exactement de la même quantité fixe, battement pour battement, dans chaque situation qu'un coureur rencontre sur la piste"],
    "Les systèmes sont interdépendants : le système respiratoire peut seulement charger l'oxygène aussi vite que le sang l'emporte, et le cœur peut seulement livrer ce que les poumons chargent. Le sprint augmente la demande des cellules, donc les deux doivent augmenter ensemble.", {}); }
]), ["Aucun système ne peut faire tout le travail seul.", "La demande aux cellules pousse les deux."]);

E("s8f-u4-cr-interdependence", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return textq("Choisis une paire de systèmes du corps de cette unité (circulatoire et respiratoire, digestif et circulatoire, ou nerveux et musculaire). Explique comment les deux systèmes dépendent l'un de l'autre, en utilisant un exemple précis du corps. (3 points)",
    ["une paire valide de l'unité nommée", "ce que chaque système contribue expliqué", "un exemple précis du corps montrant la dépendance"],
    "<b>Réponse modèle:</b> Le système respiratoire amène l'air dans les poumons, où l'oxygène passe dans le sang et le dioxyde de carbone en sort. À lui seul, cet oxygène resterait dans les poumons. Le système circulatoire achève le travail : le cœur pompe le sang riche en oxygène à chaque cellule et retourne le dioxyde de carbone aux poumons pour être expiré. Chaque système dépend de l'autre; si la respiration s'arrêtait, le sang n'aurait pas d'oxygène à transporter, et si le cœur s'arrêtait, l'oxygène dans les poumons n'atteindrait jamais les cellules.<br><br><b>Points d'attribution:</b> 1 point pour nommer une paire valide de l'unité. 1 point pour expliquer ce que chaque système contribue. 1 point pour un exemple précis du corps montrant la dépendance.", {}); }
]), ["Choisis une des trois paires du guide.", "Dis ce que chaque système contribue."]);

/* ---------- SC8.11.1 Premières idées sur les êtres vivants ---------- */

E("s8f-u4-early-modern", 4, ["SC8.11.1"], 2, "var", varset([
  function () { return mcq("Les peuples anciens expliquaient les êtres vivants par des idées sur l'air, l'eau et le feu. Comment la théorie cellulaire moderne diffère-t-elle le plus de ces premières idées?",
    "Elle est construite sur des observations faites avec des microscopes, qui ont montré que les êtres vivants sont faits de cellules",
    ["Elle rejette chaque observation faite des êtres vivants et s'appuie seulement sur la tradition transmise au fil des années", "Elle explique tous les êtres vivants par un ensemble de quatre éléments, au lieu des trois que les peuples anciens utilisaient", "Elle a été entièrement développée longtemps avant que des outils pour observer les très petites choses aient été inventés"],
    "Les premières explications étaient des suppositions sur le monde sans moyens d'observer le très petit. La théorie cellulaire est venue d'observations systématiques une fois que les microscopes ont laissé les scientifiques voir que chaque être vivant est fait de cellules.", {}); }
]), ["Quel outil a changé ce qu'on pouvait observer?", "Le microscope est le point tournant."]);

E("s8f-u4-dynamic", 4, ["SC8.11.1", "SC8.11.2"], 3, "var", varset([
  function () { return mcq("Les premiers scientifiques ne pouvaient pas s'entendre sur la question de savoir si les minuscules organismes vus à travers les premiers microscopes étaient vraiment vivants. Le désaccord a été réglé surtout parce que",
    "des microscopes améliorés ont donné des observations plus claires, montrant que les organismes étaient faits de cellules avec les caractéristiques de la vie",
    ["les scientifiques de l'époque ont réglé le désaccord en votant sur la question lors d'une réunion entre eux", "les minuscules organismes eux-mêmes ont grandi avec le temps jusqu'à ce que tout le monde puisse convenir qu'ils étaient vivants", "les premiers scientifiques ont simplement cessé d'étudier la question et sont passés à d'autres problèmes à la place"],
    "La science est dynamique : à mesure que les outils se sont améliorés, les observations sont devenues plus claires et les théories ont été révisées. De meilleures lentilles ont montré les structures cellulaires et les processus vitaux, réglant ce que les organismes étaient.", {}); }
]), ["Qu'est-ce qui a changé : les outils ou les organismes?", "De meilleures observations révisent les théories."]);

/* ---------- SC8.11.2 Le microscope comme technologie en développement ---------- */

E("s8f-u4-micro-development", 4, ["SC8.11.2"], 1, "var", varset([
  function () { return mcq("Le microscope de Leeuwenhoek utilisait une seule petite lentille, pourtant il a été le premier à observer les bactéries. Les microscopes plus tardifs, jusqu'au microscope électronique à balayage, ont révélé beaucoup plus. Quel patron cette histoire montre-t-elle?",
    "La technologie optique s'est développée par des améliorations constantes, et chaque amélioration a permis aux scientifiques d'observer davantage et de réviser leurs idées",
    ["Chaque nouveau et meilleur microscope construit a rendu sans valeur toutes les découvertes précédentes faites avec les plus vieux, qui ont été jetées entièrement", "Les microscopes ont été perfectionnés d'un seul coup, en une seule étape, par la première personne qui en a construit un, sans aucune amélioration par la suite", "De meilleurs microscopes ont mis fin complètement, une fois pour toutes, au désaccord scientifique sur les cellules, et aucune question n'est restée ouverte après eux"],
    "Le développement du microscope a été un long processus d'essais et d'améliorations des lentilles et de la conception. Chaque avancée a étendu ce qu'on pouvait observer, et la science des cellules a avancé avec elle.", {}); }
]), ["Pense à la séquence des outils.", "Meilleurs outils, meilleures observations, idées révisées."]);

E("s8f-u4-micro-parts", 4, ["SC8.11.2", "SC8.12.1"], 1, "var", varset([
  function () { var q = mcq("Sur le diagramme du microscope, quelle lettre étiquette l'objectif?",
    "B", ["A", "C", "F"],
    "La lettre B est l'objectif, tenu par la tourelle porte-objectifs près du spécimen. A est l'oculaire, C la platine et F la source de lumière.", {});
    q.figure = s8fMicroscopeSVG(); return q; },
  function () { var q = mcq("Sur le diagramme du microscope, quelle lettre étiquette la platine?",
    "C", ["B", "D", "G"],
    "La lettre C est la platine, la plateforme plate qui tient la lame. B est l'objectif, D la vis macrométrique et G le bras.", {});
    q.figure = s8fMicroscopeSVG(); return q; }
]), ["L'objectif se trouve juste au-dessus de la lame.", "La platine est la plateforme qui tient la lame."]);

/* ---------- SC8.11.3 Organites, en utilisant les termes appropriés ---------- */

E("s8f-u4-organelle-figure", 4, ["SC8.11.3"], 2, "var", varset([
  function () { var q = mcq("Le diagramme montre une cellule animale. Quelle lettre étiquette le noyau?",
    "B", ["A", "D", "E"],
    "La lettre B est le noyau, la structure qui contient le matériel génétique de la cellule et contrôle les activités de la cellule. A est la membrane cellulaire, D une mitochondrie et E une vacuole.", {});
    q.figure = s8fCellSVG("animal"); return q; },
  function () { var q = mcq("Le diagramme montre une cellule animale. Quelle lettre étiquette la membrane cellulaire?",
    "A", ["B", "C", "E"],
    "La lettre A est la membrane cellulaire, la frontière qui contrôle ce qui entre dans la cellule et ce qui en sort. Une cellule animale n'a aucune paroi cellulaire à l'extérieur d'elle. B est le noyau, C le cytoplasme et E une vacuole.", {});
    q.figure = s8fCellSVG("animal"); return q; }
]), ["Le noyau est le grand centre de contrôle rond.", "La membrane est la frontière extérieure."]);

E("s8f-u4-organelle-function", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Quel est le rôle des mitochondries dans une cellule?",
    "Elles libèrent l'énergie de la nourriture pour que la cellule l'utilise",
    ["Elles fabriquent la nourriture en utilisant la lumière du soleil", "Elles emmagasinent le matériel génétique de la cellule", "Elles tiennent la forme de la cellule rigidement"],
    "Les mitochondries libèrent l'énergie de la nourriture pour que la cellule puisse accomplir ses activités. Fabriquer la nourriture est le rôle du chloroplaste, et le matériel génétique est gardé dans le noyau.", {}); },
  function () { return mcq("Quel est le rôle du chloroplaste dans une cellule végétale?",
    "Il utilise la lumière du soleil pour fabriquer la nourriture de la cellule",
    ["Il libère l'énergie de la nourriture", "Il contrôle ce qui entre dans la cellule et ce qui en sort", "Il emmagasine l'eau et les déchets"],
    "Les chloroplastes font la photosynthèse, utilisant la lumière du soleil pour fabriquer la nourriture. Les mitochondries libèrent l'énergie de cette nourriture, et les vacuoles emmagasinent l'eau et d'autres matériaux.", {}); }
]), ["Associe chaque organite à son unique travail.", "Mitochondries : libération d'énergie. Chloroplaste : fabrication de nourriture."]);

E("s8f-u4-organelle-match", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Quel organite contrôle le mouvement de la nourriture, des déchets et d'autres substances vers l'intérieur et l'extérieur de la cellule?",
    "La membrane cellulaire",
    ["La paroi cellulaire", "Le cytoplasme", "La vacuole"],
    "La membrane cellulaire est la gardienne : elle contrôle ce qui entre et ce qui sort. La paroi cellulaire donne le soutien et la forme, et le cytoplasme est la substance gélatineuse où les organites se trouvent.", {}); },
  function () { return mcq("Quel organite contient le matériel génétique de la cellule et contrôle les activités de la cellule?",
    "Le noyau",
    ["Les mitochondries", "La vacuole", "Le cytoplasme"],
    "Le noyau garde le matériel génétique et agit comme le centre de contrôle de la cellule.", {}); }
]), ["Gardienne ou centre de contrôle?", "La membrane contrôle le mouvement; le noyau contrôle la cellule."]);

E("s8f-u4-organelle-plant", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Un élève doit étiqueter un diagramme de cellule végétale en utilisant les termes appropriés. Quel ensemble d'étiquettes appartient seulement à la cellule végétale, pas à un diagramme de cellule animale?",
    "Paroi cellulaire et chloroplaste",
    ["Membrane cellulaire et noyau", "Cytoplasme et mitochondries", "Noyau et vacuole"],
    "Les parois cellulaires et les chloroplastes sont des structures propres aux plantes à ce niveau. Les membranes, les noyaux, le cytoplasme, les mitochondries et les vacuoles apparaissent dans les deux types de cellules.", {}); }
]), ["Utilise les trois différences entre plantes et animaux.", "Deux d'entre elles sont des structures."]);

E("s8f-u4-organelle-term", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return mcq("Quelle comparaison des cellules végétales et animales utilise les termes appropriés correctement?",
    "Les deux ont une membrane cellulaire, mais seule la cellule végétale a une paroi cellulaire à l'extérieur d'elle, et la vacuole de la cellule végétale est plus grande",
    ["Les deux genres de cellules ont une paroi cellulaire autour d'elles, mais seule la cellule animale a une membrane cellulaire à l'intérieur d'elle", "La membrane de la cellule végétale se trouve à l'extérieur de sa paroi cellulaire, contrairement à l'arrangement trouvé dans la cellule animale", "Les cellules animales portent des chloroplastes dispersés dans leur cytoplasme, tandis que les cellules végétales n'ont pas de chloroplastes du tout"],
    "Chaque cellule a une membrane; les cellules végétales ajoutent une paroi à l'extérieur de la membrane, et leurs vacuoles sont moins nombreuses et plus grandes. (Note : le diagramme de la cellule végétale du manuel échange deux étiquettes; A est la paroi cellulaire et C est la membrane cellulaire.)", {}); }
]), ["Paroi à l'extérieur, membrane à l'intérieur d'elle.", "Vérifie chaque affirmation contre les différences."]);

E("s8f-u4-cr-organelles", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return textq("En utilisant les termes appropriés, explique le rôle de chacune de ces structures cellulaires : membrane cellulaire, noyau et mitochondries. Puis nomme une structure trouvée dans les cellules végétales mais pas dans les cellules animales et énonce son rôle. (3 points)",
    ["la membrane cellulaire contrôle ce qui entre dans la cellule et ce qui en sort", "le noyau contient le matériel génétique et contrôle les activités de la cellule", "les mitochondries libèrent l'énergie de la nourriture", "la paroi cellulaire (ou le chloroplaste) est propre aux plantes, donnant le soutien et la forme (ou faisant la photosynthèse)"],
    "<b>Réponse modèle:</b> La membrane cellulaire contrôle le mouvement des substances vers l'intérieur et l'extérieur de la cellule. Le noyau contient le matériel génétique et contrôle les activités de la cellule. Les mitochondries libèrent l'énergie de la nourriture pour que la cellule l'utilise. La paroi cellulaire se trouve dans les cellules végétales seulement : elle soutient la cellule et lui donne une forme régulière. (Le chloroplaste, qui fabrique la nourriture par photosynthèse, est une structure propre aux plantes également valide.)<br><br><b>Points d'attribution:</b> 1 point pour deux des trois rôles nommés corrects. 1 point pour les trois corrects. 1 point pour une structure propre aux plantes avec son rôle correct.", {}); }
]), ["Trois rôles, puis une structure propre aux plantes.", "Membrane, noyau, mitochondries."]);

/* ---------- SC8.11.4 et SC8.11.5 Technologies issues des connaissances scientifiques ---------- */

E("s8f-u4-tech-examples", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Quelle technologie aide ou remplace le travail d'un organe malade?",
    "Un appareil de dialyse, qui filtre le sang quand les reins font défaut",
    ["Un stéthoscope, qui écoute les sons du cœur qui bat à l'intérieur de la poitrine", "Un appareil à rayons X, qui prend des images des os à l'intérieur du corps d'un patient à l'hôpital", "Un thermomètre, qui mesure la température du corps ou d'un liquide dans un laboratoire"],
    "La dialyse fait le travail du rein de nettoyer le sang quand les reins ne le peuvent pas. Les autres appareils observent ou mesurent; ils n'aident pas ni ne remplacent le travail d'un organe.", {}); },
  function () { return mcq("Une pompe à insuline est portée par une personne diabétique. Le travail de quel organe aide-t-elle?",
    "Le pancréas, en régulant les niveaux d'insuline dans le sang",
    ["Le foie, en emmagasinant le glucose supplémentaire de la nourriture", "Le rein, en filtrant l'insuline hors du sang", "Le cœur, en pompant l'insuline dans le corps par le sang"],
    "La pompe à insuline régule l'insuline dans le sang, aidant le pancréas, l'organe qui produit normalement l'insuline.", {}); }
]), ["L'appareil fait-il le travail de l'organe?", "La dialyse filtre le sang, comme un rein."]);

E("s8f-u4-tech-match", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Un stimulateur cardiaque est implanté dans la poitrine d'un patient. Que fait-il?",
    "Il envoie des impulsions électriques qui gardent le cœur battant à un rythme régulier",
    ["Il filtre tous les déchets du sang du patient à mesure que le sang traverse la poitrine", "Il pompe le sang du patient dans le corps à la place du cœur, faisant tout le travail du cœur", "Il produit de l'insuline à l'intérieur du corps du patient et la libère selon un horaire quotidien régulier"],
    "Un stimulateur cardiaque remplace les signaux électriques défectueux du cœur par des impulsions régulières, donc le cœur garde un battement régulier. Filtrer le sang est la dialyse; réguler l'insuline est une pompe à insuline.", {}); },
  function () { return mcq("Un implant cochléaire aide quel organe des sens, et comment?",
    "L'oreille, en convertissant le son en signaux électriques que les nerfs peuvent transporter",
    ["L'œil, en concentrant la lumière qui y entre sur la rétine au fond du globe oculaire", "La peau, en sentant les changements de pression contre sa surface et en envoyant des signaux au cerveau", "La langue, en détectant les produits chimiques dissous dans la nourriture et la boisson qui passent sur elle"],
    "Les implants cochléaires captent le son et le transforment en impulsions électriques pour le nerf auditif, aidant une oreille interne endommagée.", {}); }
]), ["Associe l'appareil à l'organe qu'il aide.", "Stimulateur cardiaque : rythme du cœur. Cochléaire : l'ouïe."]);

E("s8f-u4-cr-artificial", 4, ["SC8.11.4"], 3, "var", varset([
  function () { return textq("Choisis une technologie qui aide ou remplace un organe ou un système malade (par exemple un appareil de dialyse, une pompe à insuline, une valvule cardiaque artificielle ou un stimulateur cardiaque). Explique la science de l'organe qu'elle aide : ce que l'organe fait, ce qui va mal, et comment la technologie applique les connaissances scientifiques pour faire ou soutenir ce travail. (4 points)",
    ["une technologie nommée et l'organe qu'elle aide", "ce que l'organe sain fait", "ce qui va mal quand il fait défaut", "comment la technologie applique les connaissances scientifiques pour faire ou soutenir le travail"],
    "<b>Réponse modèle:</b> Les reins nettoient le sang : leurs néphrons enlèvent les déchets comme l'urée, gardent le bon équilibre d'eau et de sels, et aident à tenir le pH du sang stable. Quand les deux reins font défaut, les déchets s'accumulent et la personne devient gravement malade. Un appareil de dialyse applique ce que la science connaît de la filtration : le sang passe le long d'une membrane à côté d'un fluide spécial, les déchets diffusent hors du sang dans le fluide, et le sang nettoyé retourne au corps. Il fait le travail de filtrage du rein depuis l'extérieur du corps, habituellement pendant plusieurs heures à la fois, plusieurs fois par semaine.<br><br><b>Points d'attribution:</b> 1 point pour nommer la technologie et l'organe. 1 point pour ce que l'organe sain fait. 1 point pour ce qui va mal quand il fait défaut. 1 point pour la façon dont la technologie applique les connaissances scientifiques pour faire ou soutenir le travail.", {}); }
]), ["L'organe d'abord : que fait-il?", "Puis la défaillance, puis la technologie."]);

E("s8f-u4-knowledge-tech", 4, ["SC8.11.5"], 2, "var", varset([
  function () { return mcq("Lequel est l'exemple le plus clair de connaissances scientifiques menant à une technologie?",
    "Comprendre que le cœur est coordonné par des signaux électriques a mené au stimulateur cardiaque",
    ["Construire un hôpital a mené à la découverte du cœur dans le corps humain", "Utiliser un stéthoscope a mené à la découverte du sang dans le corps", "Inventer le thermomètre a mené à la découverte de la température du corps comme concept"],
    "La connaissance est venue en premier : une fois que les scientifiques ont compris le contrôle électrique du cœur, les ingénieurs ont pu construire un appareil qui fournit le signal. Dans les autres options, la direction de l'affirmation est renversée ou fausse.", {}); }
]), ["Qu'est-ce qui est venu en premier, la connaissance ou l'appareil?", "Comprendre les signaux, puis le stimulateur cardiaque."]);

E("s8f-u4-knowledge-tech2", 4, ["SC8.11.5"], 3, "var", varset([
  function () { return mcq("Les valvules cardiaques artificielles sont faites de matériaux que le corps tolère et façonnées pour s'ouvrir et se fermer avec le débit sanguin. Quelle chaîne explique le mieux comment cette technologie est venue à exister?",
    "La connaissance du fonctionnement des valvules cardiaques et des matériaux convenables a été appliquée pour concevoir une pièce de remplacement",
    ["Les valvules fonctionnelles ont été découvertes poussant naturellement à l'intérieur du corps et ont été copiées exactement telles que trouvées", "Les chirurgiens avaient besoin de la pièce de remplacement, donc la pièce est simplement apparue pour eux sans aucune recherche derrière elle", "La connaissance des globules rouges seule, et rien d'autre, a suffi pour que les ingénieurs produisent la valvule de remplacement"],
    "Les technologies grandissent à partir de connaissances scientifiques combinées : la fonction des valvules, le débit sanguin et le comportement des matériaux devaient tous être compris avant qu'un remplacement fonctionnel puisse être conçu.", {}); }
]), ["Plusieurs sortes de connaissances se combinent.", "Fonction plus matériaux plus débit."]);

/* ---------- SC8.11.6 Besoins de la communauté ---------- */

E("s8f-u4-community-need", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return mcq("Une communauté compte plusieurs résidents dont les reins ont fait défaut, mais l'unité de dialyse la plus proche est à des heures de route. Une unité de dialyse est construite dans l'hôpital local. C'est un exemple de",
    "besoins d'une communauté menant à un développement en science appliquée et en technologie",
    ["une nouvelle technologie créant un besoin dans la communauté qui n'y avait pas existé avant son arrivée", "des connaissances scientifiques d'experts extérieurs remplaçant l'apport de la communauté dans chaque décision", "une communauté choisissant d'éviter l'utilisation de la technologie médicale moderne dans son hôpital local entièrement"],
    "Le besoin existait en premier : les patients avaient besoin d'une dialyse régulière pour survivre. Le besoin de la communauté a poussé le développement et le placement de la technologie.", {}); }
]), ["Qu'est-ce qui est venu en premier, le besoin ou la technologie?", "Les patients avaient besoin d'un traitement près de chez eux."]);

E("s8f-u4-cr-community", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return textq("Décris un exemple d'un besoin de communauté qui a mené à un développement en science ou en technologie lié aux systèmes du corps. Explique le besoin, le développement qu'il a produit, et comment le développement répond au besoin. (3 points)",
    ["un vrai besoin de communauté lié aux systèmes du corps", "le développement qu'il a produit", "comment le développement répond au besoin"],
    "<b>Réponse modèle:</b> Plusieurs personnes dans chaque communauté vivent avec le diabète et doivent garder leur glycémie contrôlée toute la journée. Les injections plusieurs fois par jour sont difficiles à garder stables, et un mauvais contrôle endommage les organes avec le temps. Ce besoin de communauté a poussé le développement de la pompe à insuline : un petit appareil portable qui livre l'insuline continuellement selon un horaire programmé, gardant les niveaux plus stables que les injections seules et libérant les patients des routines constantes d'aiguilles.<br><br><b>Points d'attribution:</b> 1 point pour un vrai besoin de communauté lié aux systèmes du corps. 1 point pour le développement qu'il a produit. 1 point pour expliquer comment le développement répond au besoin.", {}); }
]), ["Besoin, développement, correspondance.", "Le diabète et la pompe à insuline forment un modèle."]);

/* ---------- SC8.11.7, SC8.11.8, SC8.11.10 Décisions et plans d'action ---------- */

E("s8f-u4-decision-sr", 4, ["SC8.11.7"], 2, "var", varset([
  function () { return mcq("Une ville décide si elle finance une nouvelle unité de dialyse. Quelle considération est une considération environnementale?",
    "L'unité produit des déchets médicaux qui doivent être éliminés de façon sûre",
    ["Les patients ne voyageraient plus des heures pour leur traitement", "Des infirmières seraient embauchées localement dans la ville", "Les familles pourraient visiter les patients plus facilement"],
    "L'élimination des déchets médicaux affecte l'environnement. Le temps de voyage, les emplois et les visites sont des considérations sociales. Une décision éclairée pèse les deux genres.", {}); }
]), ["Environnemental veut dire des effets sur les environs.", "Déchets, eau, énergie : environnemental."]);

E("s8f-u4-cr-decision", 4, ["SC8.11.7"], 3, "var", varset([
  function () { return textq("Une autorité de santé peut financer soit plus d'appareils de dialyse dans un hôpital d'une ville, soit une plus petite unité de dialyse dans une communauté rurale dont les patients voyagent maintenant trois heures dans chaque direction. Prends une décision éclairée : énonce ton choix, donne un avantage social et un désavantage social de ce choix, et une considération environnementale. (3 points)",
    ["un choix clair énoncé", "un vrai avantage social et un vrai désavantage social du choix", "une vraie considération environnementale"],
    "<b>Réponse modèle:</b> Je financerais l'unité rurale. Avantage social : les patients reçoivent un traitement qui maintient la vie près de chez eux, gardant les familles ensemble et évitant un voyage épuisant pendant la maladie. Désavantage social : une petite unité sert moins de patients par appareil, donc la liste d'attente de la ville diminue plus lentement. Considération environnementale : éliminer des voyages de trois heures pour plusieurs patients chaque semaine réduit grandement l'utilisation de carburant et les émissions, bien que les déchets médicaux de la nouvelle unité doivent être manipulés de façon sûre.<br><br><b>Points d'attribution:</b> 1 point pour une décision claire. 1 point pour un vrai avantage social et un vrai désavantage social de l'option choisie. 1 point pour une vraie considération environnementale.", {}); }
]), ["Décide, puis pèse les deux côtés.", "Social : les gens. Environnemental : les environs."]);

E("s8f-u4-propose-sr", 4, ["SC8.11.8"], 2, "var", varset([
  function () { return mcq("Une école propose un plan d'action sur les boissons énergisantes vendues aux élèves de moins de 18 ans. Quelle proposition tient le mieux compte des besoins humains et environnementaux?",
    "Restreindre les ventes aux moins de 18 ans près des écoles, avec la preuve sur la santé expliquée aux élèves et aux détaillants",
    ["Interdire chaque genre de boisson dans le bâtiment de l'école entièrement, y compris l'eau que les élèves apportent avec eux", "Ignorer la question complètement, parce que la vente des boissons rapporte de l'argent que l'école peut dépenser", "Laisser chaque élève de l'école décider par lui-même, sans aucune information sur les boissons fournie à qui que ce soit"],
    "Une proposition solide agit sur la preuve de santé (les besoins humains) d'une façon proportionnée et s'explique. Les interdictions générales de tout et ne rien faire échouent tous les deux le test.", {}); }
]), ["Proportionnée, fondée sur la preuve, expliquée.", "Les besoins humains comprennent la santé des élèves."]);

E("s8f-u4-cr-propose", 4, ["SC8.11.8"], 3, "var", varset([
  function () { return textq("Des adultes qui fument dans des voitures avec des enfants présents forment une question sociale liée au système respiratoire. Propose un plan d'action sur cette question. Ta proposition doit énoncer l'action, le besoin humain qu'elle protège, et une objection que les gens pourraient soulever avec ta réponse à cette objection. (3 points)",
    ["une action claire et praticable proposée", "le besoin humain qu'elle protège, lié aux systèmes du corps", "une objection juste avec une réponse raisonnée"],
    "<b>Réponse modèle:</b> Action : interdire de fumer dans tout véhicule transportant des enfants, appliquée de la même façon que les lois sur les ceintures de sécurité. Besoin humain protégé : les enfants respirent la fumée secondaire dans un petit espace fermé, et la fumée endommage les voies respiratoires et la capacité des poumons d'échanger les gaz, aggravant l'asthme et les infections; les enfants ne peuvent pas choisir de partir. Objection : les adultes peuvent dire que leur voiture est privée. Réponse : la loi limite déjà le comportement privé dans les voitures (ceintures de sécurité, sièges d'auto) quand la santé des enfants est en jeu, et le besoin de l'enfant d'air propre l'emporte sur l'inconvénient.<br><br><b>Points d'attribution:</b> 1 point pour une action claire et praticable. 1 point pour le besoin humain ou environnemental qu'elle protège, lié aux systèmes du corps. 1 point pour une objection juste avec une réponse raisonnée.", {}); }
]), ["Action, besoin, objection, réponse.", "Lie le besoin au système respiratoire."]);

E("s8f-u4-personal-decision", 4, ["SC8.11.10"], 2, "var", varset([
  function () { return mcq("Un jeune athlète se fait offrir des stéroïdes pour bâtir ses muscles plus vite. Quel raisonnement est une décision personnelle éclairée fondée sur les systèmes du corps?",
    "Refuser : les stéroïdes peuvent endommager le cœur, le foie et les systèmes hormonaux, échangeant la santé à long terme contre un gain musculaire à court terme",
    ["Les accepter : la taille des muscles d'un athlète est la seule mesure qui compte d'un système musculaire en santé, et les effets sur les autres systèmes ne comptent pas", "Refuser l'offre seulement parce que les stéroïdes coûtent plus d'argent que l'athlète peut se permettre de dépenser chaque mois, sans égard à ce qu'ils font au corps", "Accepter l'offre si un ami au gymnase a utilisé les mêmes stéroïdes sans aucun tort évident qui paraisse encore, puisque son expérience garantit la sécurité de l'athlète"],
    "Une décision éclairée pèse la science : les stéroïdes affectent plusieurs systèmes (circulatoire, des organes excréteurs comme le foie, et le contrôle hormonal), donc l'avantage personnel est dépassé par de vrais désavantages.", {}); }
]), ["Pèse l'avantage contre le dommage aux systèmes.", "Gain à court terme, coût à long terme."]);

E("s8f-u4-cr-decision-personal", 4, ["SC8.11.10"], 3, "var", varset([
  function () { return textq("Prends une décision éclairée sur cette application de la science et de la technologie : une entreprise de conditionnement physique vend une machine qui promet des muscles forts sans exercice, utilisant la stimulation électrique pendant que l'utilisateur est assis. Énonce ta décision au sujet de son utilisation, un avantage personnel revendiqué ou réel, un désavantage personnel ou social, et la science des systèmes du corps derrière ta décision. (3 points)",
    ["une décision claire énoncée", "un vrai avantage personnel et un désavantage personnel ou social", "une science correcte des systèmes du corps appuyant la décision"],
    "<b>Réponse modèle:</b> Je n'utiliserais pas la machine comme substitut à l'exercice. Son vrai avantage est la commodité, et la stimulation peut contracter les muscles. Mais la forme physique n'est pas un seul système : le vrai exercice entraîne le système musculaire avec les systèmes circulatoire et respiratoire, renforçant le cœur et améliorant les échanges gazeux. Un appareil assis laisse ces systèmes sans entraînement, donc les gains de santé globaux sont petits, et socialement un tel marketing peut tromper les gens pour qu'ils sautent l'activité qui fonctionne.<br><br><b>Points d'attribution:</b> 1 point pour une décision claire. 1 point pour un vrai avantage personnel et un désavantage personnel ou social. 1 point pour une science correcte des systèmes du corps appuyant la décision.", {}); }
]), ["Décide, puis appuie avec la science des systèmes.", "Les muscles ne travaillent pas seuls."]);

/* ---------- SC8.11.9 Carrières ---------- */

E("s8f-u4-careers", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Quelle carrière est directement associée à la santé des systèmes du corps?",
    "Physiothérapeute",
    ["Comptable agréé", "Électricien de chantier", "Journaliste sportif"],
    "Les physiothérapeutes aident les patients à récupérer le mouvement et la force après une blessure ou une maladie, travaillant directement avec les systèmes musculaire et nerveux. Les techniciens de laboratoire et de rayons X, les nutritionnistes, les médecins et les infirmières en santé publique sont d'autres exemples du guide.", {}); }
]), ["Quel emploi traite les systèmes du corps chaque jour?", "Pense à la réadaptation après une blessure."]);

E("s8f-u4-careers-match", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Le travail d'une infirmière en santé publique se relie aux systèmes du corps surtout en",
    "promouvant des habitudes saines et en prévenant la maladie dans toute la communauté",
    ["opérant sur des organes endommagés à l'intérieur des patients dans la salle d'opération d'un hôpital", "concevant des organes artificiels dans un laboratoire pour les patients dont les propres organes ont fait défaut", "installant des membres artificiels sur les patients qui ont perdu un bras ou une jambe dans un accident"],
    "Les infirmières en santé publique travaillent au niveau de la communauté : vaccination, dépistage et éducation à la santé qui gardent les systèmes du corps en santé. Les autres rôles appartiennent aux chirurgiens, aux ingénieurs biomédicaux et aux prothésistes.", {}); },
  function () { return mcq("Quelle carrière travaille avec le système digestif en conseillant les patients sur l'alimentation?",
    "Nutritionniste",
    ["Technicien en rayons X", "Entraîneur", "Technicien de laboratoire"],
    "Les nutritionnistes conseillent sur l'alimentation et la nutrition, ce qui affecte directement le système digestif et, par lui, chaque autre système.", {}); }
]), ["Associe la carrière à son rôle pour les systèmes.", "Prévention au niveau de la communauté : infirmière en santé publique."]);

/* ---------- SC8.12.1 et SC8.12.3 Utilisation et entretien du microscope (CORE) ---------- */

E("s8f-u4-focus-sequence", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("Quelle séquence amène correctement une lame au foyer?",
    "Commencer à faible puissance, mettre au point avec la vis macrométrique, puis passer à puissance moyenne et terminer avec la vis micrométrique",
    ["Commencer l'observation à l'objectif de plus haute puissance et mettre l'image au point en utilisant la vis macrométrique", "Mettre au point avec la vis micrométrique d'abord, et seulement ensuite tourner la vis macrométrique pour finir", "Passer l'objectif à puissance moyenne avant que la lame préparée soit placée sur la platine du microscope"],
    "La technique correcte commence à faible puissance avec la vis macrométrique, puis passe à puissance moyenne et aiguise avec la vis micrométrique. L'utilisation de la haute puissance n'est pas exigée à ce niveau, et la vis macrométrique sert à la mise au point à faible et moyenne puissance.", {}); }
]), ["Faible puissance d'abord.", "Macrométrique, puis micrométrique."]);

E("s8f-u4-parts-action", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("L'image sous le microscope est trop sombre pour voir les cellules clairement. Quelle partie devrait être ajustée?",
    "Le diaphragme, qui contrôle la quantité de lumière qui atteint le spécimen",
    ["La vis macrométrique, qui s'ouvre et se ferme pour contrôler la lumière du spécimen", "La tourelle porte-objectifs, qui s'ajuste pour contrôler la lumière du spécimen", "La base, qui se tourne pour contrôler la lumière qui atteint le spécimen"],
    "Le diaphragme s'ouvre et se ferme pour contrôler la lumière. La vis macrométrique change la mise au point, la tourelle change les objectifs, et la base n'est qu'un soutien.", {}); },
  function () { return mcq("Que fait la tourelle porte-objectifs?",
    "Elle pivote pour amener un objectif différent en position",
    ["Elle tient la lame préparée en place sur la platine pendant l'observation", "Elle met l'image au point quand le microscope sert à haute puissance", "Elle ajuste la luminosité de la source de lumière sous le spécimen"],
    "La tourelle tient les objectifs et pivote pour passer de l'un à l'autre. Les lames reposent sur la platine, la mise au point se fait avec les vis d'ajustement, et le diaphragme contrôle la lumière.", {}); }
]), ["Image sombre veut dire un problème de lumière.", "Diaphragme pour la lumière; tourelle pour les lentilles."]);

E("s8f-u4-cr-microscope", 4, ["SC8.12.1", "SC8.12.3"], 2, "var", varset([
  function () { return textq("Un nouvel élève est sur le point d'utiliser le microscope composé pour la première fois. Décris comment transporter et installer le microscope, et les étapes de mise au point pour obtenir une image claire de cellules à faible puis à moyenne puissance. (3 points)",
    ["transporter le microscope avec une main sous la base et l'autre agrippant le bras", "commencer avec l'objectif de faible puissance et mettre au point avec la vis macrométrique", "tourner la tourelle à la puissance moyenne et aiguiser l'image avec la vis micrométrique seulement"],
    "<b>Réponse modèle:</b> Transporte le microscope à deux mains, une sous la base et l'autre sur le bras, et dépose-le loin du bord de la table. Allume la lumière et place la lame sur la platine. Commence toujours avec l'objectif de faible puissance en place : regarde par l'oculaire et tourne la vis macrométrique jusqu'à ce que les cellules soient au point. Puis tourne la tourelle à l'objectif de moyenne puissance et utilise seulement la vis micrométrique pour aiguiser l'image. Quand tu as fini, retourne à faible puissance, enlève la lame, et range le microscope couvert.<br><br><b>Points d'attribution:</b> 1 point pour le transport et l'installation sûrs (deux mains, base et bras). 1 point pour commencer à faible puissance et mettre au point avec la vis macrométrique. 1 point pour passer à moyenne puissance et terminer avec la vis micrométrique seulement.", {}); }
]), ["Transporte, installe, mets au point faible, puis moyen.", "Macrométrique à faible puissance; micrométrique pour finir."]);

E("s8f-u4-care", 4, ["SC8.12.3"], 1, "var", varset([
  function () { return mcq("Quelle pratique montre un entretien approprié du microscope composé?",
    "Le transporter avec une main sous la base et l'autre sur le bras, et le ranger couvert à faible puissance",
    ["Le transporter dans le laboratoire par son tube, tenu dans une main en marchant entre les bancs", "Le ranger dans l'armoire avec une lame préparée encore assise sur sa platine après le laboratoire", "Nettoyer les lentilles de ses objectifs avec une serviette en papier ordinaire du banc de travail"],
    "Le transport à deux mains (base et bras), enlever les lames, retourner à faible puissance et couvrir le microscope pour le rangement sont les normes d'entretien. Les lentilles se nettoient seulement avec du papier à lentilles.", {}); }
]), ["Deux mains, couvert, faible puissance, aucune lame.", "Papier à lentilles seulement pour les lentilles."]);

E("s8f-u4-care-error", 4, ["SC8.12.3"], 2, "var", varset([
  function () { return mcq("Un élève finit un laboratoire et range le microscope avec l'objectif de moyenne puissance en place, une lame encore sur la platine, et aucun couvercle. Combien d'erreurs d'entretien est-ce là?",
    "Trois : il devrait être rangé à faible puissance, sans lame, et couvert",
    ["Aucune : c'est l'état de rangement correct", "Une : seulement le couvercle manquant compte", "Deux : la lame et le couvercle, mais l'objectif ne compte pas"],
    "Norme de rangement : objectif de faible puissance en place, lame enlevée, microscope couvert. L'état décrit brise les trois parties de la norme.", {}); }
]), ["Compare chaque détail à la norme de rangement.", "Faible puissance, aucune lame, couvert."]);

/* ---------- SC8.12.2 Estimer la taille des cellules ---------- */

E("s8f-u4-estimate-gen", 4, ["SC8.12.2"], 2, "gen", function () {
  var cases = [[2, 5], [3, 6], [1.6, 4], [2.4, 8], [4, 10], [2.5, 5], [1.8, 6], [3.2, 8]];
  var c = pick(cases), F = c[0], N = c[1], est = Math.round(F / N * 100) / 100;
  var dis = s8fdis(est, [est * 2, F, Math.round((est + 0.3) * 100) / 100, Math.round(est / 2 * 100) / 100]);
  return mcq("Sous le microscope, le champ de vision fait " + s8fn(F) + " mm de large. Environ " + N + " cellules d'un spécimen tiennent côte à côte à travers le champ. Estime la largeur d'une cellule.",
    s8fn(est) + " mm", dis.map(function (v) { return s8fn(v) + " mm"; }),
    "Divise le champ de vision par le nombre de cellules qui tiennent à travers lui : " + s8fn(F) + " mm / " + N + " = " + s8fn(est) + " mm. C'est une estimation, la méthode que le laboratoire de base utilise, pas une mesure exacte.", {});
}, ["Partage le champ entre les cellules.", "Champ de vision divisé par les cellules à travers."]);

E("s8f-u4-estimate-compare", 4, ["SC8.12.2"], 1, "var", varset([
  function () { return mcq("Un élève passe de l'objectif de faible puissance à l'objectif de moyenne puissance. Qu'arrive-t-il au champ de vision?",
    "Il devient plus petit, donc moins de cellules sont visibles mais chacune semble plus grande",
    ["Il devient plus grand à mesure que la puissance monte, donc plus de cellules sur la lame deviennent visibles", "Il reste exactement de la même taille qu'il était sous l'objectif de faible puissance avant le changement", "Il disparaît de la vue entièrement jusqu'à ce que la vis macrométrique soit tournée encore une fois"],
    "Un grossissement plus élevé rétrécit le champ de vision : tu vois une plus petite surface en plus grand détail. C'est pourquoi les estimations de taille doivent utiliser le champ de vision de l'objectif en usage.", {}); }
]), ["Plus de grossissement, moins de surface.", "Le champ rétrécit à mesure que la puissance monte."]);

E("s8f-u4-estimate-scenario", 4, ["SC8.12.2"], 2, "var", varset([
  function () { return mcq("Le champ de vision à moyenne puissance est de 1,2 mm. Un élève voit environ 4 cellules d'oignon côte à côte à travers le champ. La meilleure estimation de la largeur d'une cellule est",
    "environ 0,3 mm",
    ["environ 4,8 mm", "environ 1,2 mm", "environ 0,03 mm"],
    "Partage le champ entre les cellules : 1,2 mm / 4 = 0,3 mm par cellule. Des estimations comme celle-ci sont approximatives par conception; aucun calcul de rapport au-delà du partage n'est attendu.", {}); }
]), ["Divise le champ par le compte.", "1,2 partagé par 4 cellules."]);

/* ---------- SC8.12.4 et SC8.12.5 Modèles de cellules ---------- */

E("s8f-u4-model-accuracy", 4, ["SC8.12.4"], 2, "var", varset([
  function () { return mcq("Le modèle d'une cellule animale d'un groupe est un disque de papier plat avec des chloroplastes dessinés dessus. Quels deux changements amélioreraient le plus l'exactitude du modèle?",
    "Rendre le modèle tridimensionnel, et enlever les chloroplastes",
    ["Colorer le disque en vert, et ajouter une paroi cellulaire", "Étiqueter le disque avec le nom de la cellule, et le rendre plus grand", "Ajouter plus de chloroplastes, et l'aplatir davantage"],
    "Les cellules sont tridimensionnelles, ce qui explique pourquoi le guide utilise des modèles en trois dimensions, et les cellules animales n'ont pas de chloroplastes. Une paroi cellulaire serait aussi fausse pour une cellule animale.", {}); }
]), ["Les cellules ne sont pas plates.", "Les cellules animales manquent de chloroplastes et de parois."]);

E("s8f-u4-eval-process", 4, ["SC8.12.5"], 3, "var", varset([
  function () { return mcq("Une classe construit des modèles de cellules, puis évalue le processus de chaque groupe. Quelle évaluation est la plus juste et la plus utile?",
    "Juger contre une liste de vérification dont la classe a convenu avant de construire (exactitude des parties, travail d'équipe, utilisation du temps), avec des preuves notées pour chaque point",
    ["Donner la plus haute note de la classe au modèle qui a la plus belle apparence finie, sans égard au processus que son groupe a utilisé pour le construire", "Laisser chaque groupe de la classe noter son propre travail par lui-même, sans critères donnés à qui que ce soit d'avance pour guider la notation", "Classer tous les groupes de la classe de la première place à la dernière place, sans aucune explication donnée pour l'ordre du classement final"],
    "Évaluer un processus exige des critères fixés d'avance et des preuves contre eux. Juger seulement le produit final ignore le processus évalué, et une notation sans critères ne peut être ni juste ni utile.", {}); }
]), ["Critères d'abord, preuves ensuite.", "Le processus, pas seulement le produit."]);

E("s8f-u4-cr-model-eval", 4, ["SC8.12.5"], 2, "var", varset([
  function () { return textq("Ton groupe a construit un modèle de cellule tridimensionnel. Évalue le processus de ton groupe : nomme une chose que le groupe a bien faite, une faiblesse dans votre façon de travailler, et un changement précis que vous feriez la prochaine fois. Juge votre processus contre des critères, pas seulement le modèle fini. (3 points)",
    ["une vraie force du processus du groupe", "une vraie faiblesse du processus, pas seulement du produit", "une amélioration précise et praticable"],
    "<b>Réponse modèle:</b> Force : nous avons divisé les organites entre nous quatre et chaque personne a vérifié sa partie contre le diagramme avant que nous assemblions, donc le modèle fini était exact. Faiblesse : nous avons passé trop de temps à choisir les matériaux et laissé l'assemblage à la dernière classe, donc la vacuole a été précipitée et trop petite. Changement : la prochaine fois, nous fixerions une échéance pour toutes les parties une classe plus tôt et utiliserions la liste de vérification de la classe au point milieu pour attraper les problèmes pendant qu'il reste du temps pour les réparer.<br><br><b>Points d'attribution:</b> 1 point pour une vraie force du processus du groupe. 1 point pour une vraie faiblesse du processus (pas seulement du produit). 1 point pour une amélioration précise et praticable.", {}); }
]), ["Force, faiblesse, amélioration.", "Juge le processus, pas le produit."]);

/* ---------- SC8.12.6 à SC8.12.9 L'expérience sur l'activité ---------- */

E("s8f-u4-variables", 4, ["SC8.12.6", "SC8.12.9"], 2, "var", varset([
  function () { return mcq("Dans l'expérience sur la fréquence cardiaque, une élève mesure sa fréquence au repos, après avoir marché, et après avoir couru. Quelle est la variable manipulée (indépendante), et qu'est-ce qui doit être contrôlé?",
    "Le niveau d'activité est manipulé; la même personne, la même méthode de comptage et le même minutage doivent être gardés les mêmes",
    ["La fréquence cardiaque est la variable manipulée; le niveau d'activité doit être gardé le même partout", "Le niveau d'activité est manipulé; une personne différente devrait être utilisée à chaque niveau d'activité dans l'expérience", "La fréquence respiratoire est la variable manipulée; la fréquence cardiaque doit être gardée la même à chaque niveau"],
    "L'expérimentateur change le niveau d'activité et mesure la réponse (la fréquence cardiaque). Une comparaison juste exige le même sujet, le même comptage de 15 secondes multiplié par 4, et le même minutage à chaque niveau.", {}); }
]), ["Qu'est-ce que l'expérimentateur change?", "Tout le reste reste le même."]);

E("s8f-u4-protocol", 4, ["SC8.12.6"], 1, "var", varset([
  function () { return mcq("Dans le laboratoire de base, la fréquence cardiaque au repos se mesure en comptant le pouls pendant 15 secondes et en multipliant par 4. Pourquoi le comptage est-il répété trois fois et moyenné?",
    "Moyenner trois essais donne une valeur au repos plus fiable qu'un seul comptage",
    ["Trois essais sont nécessaires pour que la moyenne atteigne exactement la vraie valeur au repos du pouls", "Les deux premiers des trois comptages sont seulement des essais de pratique et sont jetés sans être utilisés", "Multiplier le comptage par 4 donne une fréquence seulement quand le comptage est fait après trois essais complets"],
    "Les comptages uniques varient avec de petites erreurs de minutage et de comptage. Répéter et moyenner réduit l'effet de tout comptage fautif unique, donnant une fréquence au repos plus digne de confiance.", {}); }
]), ["Un comptage peut être faux.", "Répétitions plus une moyenne : la fiabilité."]);

E("s8f-u4-cr-design-rates", 4, ["SC8.12.6"], 3, "var", varset([
  function () { return textq("Conçois une expérience pour comparer la fréquence cardiaque et la fréquence respiratoire au repos et après deux niveaux d'activité. Énonce la question, la variable que tu changeras, deux variables que tu contrôleras, comment tu mesureras les deux fréquences, et comment tu rendras les résultats fiables. (4 points)",
    ["une question claire et la variable manipulée (le niveau d'activité)", "deux variables contrôlées sensées", "une méthode de mesure praticable pour les deux fréquences (comptage de 15 secondes multiplié par 4)", "une étape de fiabilité (répétitions ou moyenne)"],
    "<b>Réponse modèle:</b> Question : comment la fréquence cardiaque et la fréquence respiratoire changent-elles à mesure que le niveau d'activité monte? Variable manipulée : le niveau d'activité (assis au repos, marcher pendant 1 minute, monter et descendre des marches en courant pendant 1 minute). Variables contrôlées : la même personne partout, le même temps d'activité de 1 minute chacun, et le même délai avant de mesurer. Mesures : la fréquence cardiaque à partir du pouls au poignet compté pendant 15 secondes et multiplié par 4; la fréquence respiratoire à partir des respirations comptées pendant 15 secondes et multipliées par 4. Fiabilité : prendre chaque mesure au repos trois fois et moyenner, et répéter l'ensemble complet un autre jour pour comparer.<br><br><b>Points d'attribution:</b> 1 point pour une question claire et la variable manipulée. 1 point pour deux variables contrôlées sensées. 1 point pour une méthode de mesure praticable pour les deux fréquences. 1 point pour une étape de fiabilité (répétitions ou moyenne).", {}); }
]), ["Question, variables, méthode, fiabilité.", "Utilise le comptage de 15 secondes du laboratoire de base."]);

E("s8f-u4-testable", 4, ["SC8.12.7"], 2, "var", varset([
  function () { return mcq("Quelle reformulation transforme le sujet en une question testable sur la forme physique et la santé?",
    "La fréquence cardiaque au repos diminue-t-elle après six semaines de course quotidienne?",
    ["La course est-elle, en général, une bonne activité à laquelle les gens de tous âges peuvent participer?", "Pourquoi l'exercice est-il considéré par tout le monde comme la meilleure de toutes les activités physiques?", "Les élèves de l'école aiment-ils la course comme activité plus qu'ils aiment la marche dans leur vie?"],
    "Une question testable nomme quelque chose de mesurable (la fréquence cardiaque au repos) et un changement à tester (six semaines de course). Les autres demandent des opinions ou des jugements généraux qui ne peuvent pas se mesurer tels qu'énoncés.", {}); }
]), ["Cherche quelque chose de mesurable.", "Une variable que tu peux compter ou chronométrer."]);

E("s8f-u4-testable2", 4, ["SC8.12.7"], 1, "var", varset([
  function () { return mcq("Quelle question est déjà sous forme testable?",
    "Comment la fréquence respiratoire change-t-elle quand un élève monte des escaliers pendant une minute?",
    ["Être en forme et actif est-il important pour les adolescents dans leur vie quotidienne à l'école?", "Quel est le seul meilleur sport au monde pour la santé et la forme physique d'une personne en général?", "Pourquoi les athlètes de compétition passent-ils tant d'heures à s'entraîner pour leur sport chaque semaine?"],
    "La première question peut recevoir une réponse par la mesure : la fréquence respiratoire avant et après une activité définie. Les autres appellent des opinions ou des explications trop larges pour être testées directement.", {}); }
]), ["Mesurable telle qu'écrite?", "La fréquence respiratoire peut se compter."]);

E("s8f-u4-hypothesis", 4, ["SC8.12.8"], 2, "var", varset([
  function () { return mcq("Un élève observe que ses camarades respirent plus vite après le cours d'éducation physique. Laquelle est une hypothèse appropriée fondée sur ce patron?",
    "Si le niveau d'activité augmente, alors la fréquence respiratoire augmente, parce que les muscles ont besoin de plus d'oxygène",
    ["Faire de l'exercice régulièrement est une chose saine à faire pour tout le monde, quel que soit leur âge", "La respiration est simplement une partie du travail fait par le système respiratoire du corps humain", "Les élèves de l'école aiment leurs cours d'éducation physique plus qu'ils aiment leurs cours de mathématiques"],
    "Une hypothèse est une prédiction testable qui lie les variables, idéalement avec une raison. Les autres sont une affirmation générale, un fait et une opinion, aucun d'eux une prédiction à tester.", {}); }
]), ["Une prédiction qui lie deux variables.", "Si... alors... parce que..."]);

E("s8f-u4-hypothesis-basis", 4, ["SC8.12.8"], 1, "var", varset([
  function () { return mcq("Une hypothèse devrait être fondée sur",
    "des informations de base ou un patron observé",
    ["le résultat que l'élève espère obtenir", "une supposition faite sans aucune information du tout", "la conclusion d'une expérience différente"],
    "Les hypothèses grandissent à partir de ce qui est déjà connu ou remarqué : une lecture de base ou un patron dans les observations. Espérer un résultat n'est pas une base.", {}); }
]), ["Qu'est-ce qui vient avant l'hypothèse?", "Des connaissances ou un patron remarqué."]);

E("s8f-u4-control", 4, ["SC8.12.9"], 2, "var", varset([
  function () { return mcq("Pendant l'expérience sur l'activité, une partenaire compte son pouls à son poignet pendant que l'autre compte au cou, et ils comparent les résultats. Qu'est-ce qui ne va pas avec cette procédure?",
    "La méthode de mesure n'est pas contrôlée, donc les deux ensembles de résultats ne sont pas comparables justement",
    ["Rien ne va mal avec elle : tout point de pouls sur le corps donne des résultats identiques dans une expérience", "Le pouls au poignet ne peut pas du tout être senti par qui que ce soit pendant que l'exercice se fait", "Les partenaires qui travaillent ensemble au laboratoire n'ont simplement pas le droit de comparer leurs données l'un avec l'autre"],
    "Contrôler les variables principales comprend utiliser la même méthode de mesure pour chaque essai et chaque personne. Des points de pouls et des techniques différents introduisent des différences qui ne sont pas causées par l'activité.", {}); }
]), ["Les tests justes gardent les méthodes identiques.", "Même méthode pour tout le monde."]);

E("s8f-u4-control-error", 4, ["SC8.12.9"], 3, "var", varset([
  function () { return mcq("Un groupe teste les niveaux d'activité ainsi : la personne A se repose, la personne B marche, la personne C court, et ils comparent les trois fréquences cardiaques pour décider de l'effet de l'activité. Pourquoi ne peuvent-ils rien conclure sur l'activité à partir de ces résultats?",
    "Des personnes différentes ont des fréquences au repos différentes, donc la personne est une variable non contrôlée entremêlée avec le niveau d'activité",
    ["Utiliser seulement trois personnes au total est beaucoup trop peu pour qu'une expérience de ce genre signifie quoi que ce soit", "La fréquence cardiaque d'une personne ne peut pas du tout se mesurer dans les minutes après qu'elle finit de courir", "Les trois activités auraient simplement dû être faites par le groupe dans l'ordre opposé au leur pour conclure"],
    "Le plan confond deux variables : l'activité et la personne. La fréquence de course d'une personne en forme peut être plus basse que la fréquence au repos d'une personne pas en forme, donc la comparaison ne dit rien de fiable sur l'activité. Une seule personne devrait faire les trois niveaux.", {}); }
]), ["Deux choses ont changé à la fois.", "La personne et l'activité sont entremêlées."]);

/* ---------- SC8.12.10 à SC8.12.12 Afficher et organiser les données ---------- */

E("s8f-u4-graph-choice", 4, ["SC8.12.10"], 2, "var", varset([
  function () { return mcq("Un élève note sa fréquence cardiaque chaque 30 secondes pendant 5 minutes après l'exercice, pour montrer comment elle récupère. Quel affichage convient le mieux à ces données?",
    "Un graphique linéaire de la fréquence cardiaque contre le temps",
    ["Un diagramme à bandes des noms des cinq camarades", "Un diagramme circulaire des niveaux d'activité", "Une table des matières"],
    "La récupération est un changement dans le temps, qu'un graphique linéaire montre comme une tendance. Les diagrammes à bandes comparent des catégories; les données de récupération sont un changement continu.", {}); }
]), ["Changement dans le temps : quel type de graphique?", "Les graphiques linéaires montrent les tendances."]);

E("s8f-u4-rates-figure", 4, ["SC8.12.10"], 1, "var", varset([
  function () { var q = mcq("Le diagramme à bandes montre les fréquences cardiaques au repos de cinq animaux. Quel animal a la plus basse fréquence cardiaque au repos?",
    "La baleine", ["Le chat", "Le chien", "La souris"],
    "La bande de la baleine est de loin la plus courte à 8 battements par minute. La souris, le plus petit animal, a la fréquence la plus haute à 450.", {});
    q.figure = s8fBarSVG(["Souris", "Hamster", "Chat", "Chien", "Baleine"], [450, 300, 120, 70, 8], "Fréquence cardiaque au repos (battements par minute)"); return q; }
]), ["Trouve la bande la plus courte.", "Lis la valeur au-dessus d'elle."]);

E("s8f-u4-recovery-figure", 4, ["SC8.12.10", "SC8.12.6"], 3, "var", varset([
  function () { var q = mcq("Le graphique montre la fréquence cardiaque d'une élève pendant la récupération après un exercice intense. Sa fréquence au repos est d'environ 72 battements par minute. Après combien de minutes sa fréquence cardiaque tombe-t-elle sous 90 battements par minute pour la première fois?",
    "4 minutes", ["2 minutes", "3 minutes", "5 minutes"],
    "En lisant les points tracés : 138, 120, 106 et 94 battements par minute aux minutes 0 à 3 sont tous au-dessus de 90; à la minute 4, la fréquence est 84, la première lecture sous 90, à mesure qu'elle se stabilise vers la fréquence au repos d'environ 72.", {});
    q.figure = s8fLineGraphSVG([0, 1, 2, 3, 4, 5], [138, 120, 106, 94, 84, 78], "Minutes depuis la fin de l'exercice", "Fréquence cardiaque (battements par minute)"); return q; }
]), ["Suis les points minute par minute.", "Premier point sous 90."]);

E("s8f-u4-variation-explain", 4, ["SC8.12.11"], 2, "var", varset([
  function () { return mcq("Une classe répète l'expérience sur l'activité un deuxième jour. La fréquence cardiaque au repos d'un élève est 76 le premier jour et 84 le deuxième jour. Laquelle est une explication raisonnable de la variation?",
    "Il avait monté les escaliers en courant juste avant la mesure du deuxième jour, donc sa fréquence ne s'était pas stabilisée au vrai repos",
    ["La fréquence cardiaque au repos d'une personne ne change jamais d'un jour à l'autre, donc un des deux comptages a dû être fabriqué", "Le cœur de l'élève lui-même a grandi sensiblement dans le temps entre les deux jours de mesure au laboratoire", "La multiplication du comptage de 15 secondes par 4 fonctionne correctement seulement le premier jour d'une expérience"],
    "Les mesures au repos varient avec l'activité récente, le stress, les erreurs de comptage et le moment de la journée. Une fréquence prise juste après avoir monté les escaliers en courant n'est pas une vraie fréquence au repos, ce qui est exactement pourquoi les répétitions et le temps de stabilisation comptent.", {}); }
]), ["Qu'est-ce qui différait entre les deux jours?", "Le vrai repos doit être stabilisé."]);

E("s8f-u4-animal-pattern", 4, ["SC8.12.11", "SC8.10.6"], 3, "var", varset([
  function () { var q = mcq("Le diagramme à bandes montre les fréquences cardiaques au repos de cinq animaux. Quelle affirmation explique le mieux le patron?",
    "Les animaux plus petits ont des fréquences cardiaques au repos beaucoup plus hautes; leurs corps doivent faire circuler le sang et livrer l'oxygène à un taux plus rapide pour leur taille",
    ["Les animaux plus grands ont des fréquences cardiaques au repos plus hautes que les animaux plus petits, parce que leurs corps beaucoup plus grands contiennent une bien plus grande quantité de sang", "La fréquence cardiaque au repos d'un animal est complètement sans lien avec la taille du corps de l'animal ou avec le genre de vie qu'il mène dans son environnement naturel chaque jour", "La fréquence au repos de la baleine est la plus basse des cinq animaux seulement parce que la baleine vit toute sa vie dans l'eau froide de l'océan, loin des prédateurs et de l'activité"],
    "À travers les données, le patron est constant : souris 450, hamster 300, chat 120, chien 70, baleine 8 battements par minute. Plus l'animal est petit, plus sa fréquence cardiaque au repos est haute, parce que les besoins de ses cellules doivent être répondus par une circulation plus rapide par rapport à sa taille.", {});
    q.figure = s8fBarSVG(["Souris", "Hamster", "Chat", "Chien", "Baleine"], [450, 300, 120, 70, 8], "Fréquence cardiaque au repos (battements par minute)"); return q; }
]), ["Ordonne les animaux par taille, puis par fréquence.", "La tendance court à l'opposé de la taille."]);

E("s8f-u4-organize", 4, ["SC8.12.12"], 1, "var", varset([
  function () { return mcq("Deux partenaires mesurent chacun la fréquence cardiaque et la fréquence respiratoire à trois niveaux d'activité. Quel format organise le mieux les données pour la comparaison?",
    "Un tableau avec des rangées pour chaque personne et niveau d'activité, et des colonnes pour la fréquence cardiaque et la fréquence respiratoire, y compris les moyennes",
    ["Un paragraphe d'écriture décrivant en mots la plus occupée des journées où la classe a fait les activités au gymnase, avec les nombres racontés dans l'histoire", "Une seule longue liste de tous les nombres que les deux partenaires ont notés, écrite dans l'ordre où ils ont été mesurés pendant les trois niveaux d'activité", "Un dessin étiqueté du gymnase de l'école, montrant où la classe a mené chacune des mesures d'activité pendant le laboratoire, avec les endroits marqués dessus"],
    "Un tableau structuré garde chaque mesure liée à sa personne, son activité et son type de fréquence, et la colonne des moyennes que le laboratoire exige. Une liste libre perd quel nombre appartient à quoi.", {}); }
]), ["La comparaison exige une structure.", "Rangées et colonnes avec des étiquettes."]);

E("s8f-u4-organize-avg", 4, ["SC8.12.12"], 2, "var", varset([
  function () { return mcq("Un tableau de données pour les mesures au repos a trois colonnes d'essais et une colonne de moyenne. Pourquoi le laboratoire organise-t-il les données ainsi?",
    "Montrer les essais et leur moyenne rend les données transparentes et la valeur au repos plus digne de confiance",
    ["La colonne de la moyenne est là pour cacher tout essai qui est en désaccord avec le reste des données du tableau", "Trois essais séparés sont exigés dans le tableau simplement pour que les colonnes remplissent toute la page du cahier", "Les moyennes sont calculées au laboratoire afin de changer les résultats en les valeurs que la classe voulait obtenir"],
    "Organiser les essais à côté de leur moyenne laisse quiconque voir l'étendue des mesures et juger la valeur au repos. Rien n'est caché : les essais restent affichés.", {}); }
]), ["Transparence et confiance.", "Essais visibles, moyenne à côté d'eux."]);

/* Exclusion de composition (Nov 16, 2026) : les questions nommées ici
   portent noCompose, et composeExam les laisse hors de chaque examen
   composé (tests d'unité, révisions de mi-parcours et finales,
   compositions personnalisées), tandis que les tirages de pratique,
   les vérifications de préalables et les choix explicites de
   l'enseignant les gardent. La question de conception d'une
   expérience est réservée à la pratique et aux choix de l'enseignant. */
var NO_COMPOSE_U4 = {
  "s8f-u4-cr-design-rates": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });

/* Ajouts de l'allongement (20 nov. 2026). */
E("s8f-u4-theorie-cellulaire", 4, ["SC8.10.1"], 1, "var", varset([
  function () {
    return mcq("Lequel des énoncés fait partie de la théorie cellulaire?",
      "Toutes les cellules proviennent de cellules déjà existantes, par division",
      ["Les cellules peuvent apparaître spontanément à partir de matière non vivante", "Un organisme peut être vivant sans contenir aucune cellule en son corps", "Toutes les cellules d'un organisme ont exactement la même forme et la même tâche"],
      "La théorie cellulaire affirme que les êtres vivants sont faits de cellules, que la cellule est l'unité de base du vivant et que les cellules viennent de cellules. <b>Toutes les cellules proviennent de cellules déjà existantes</b>.", {});
  },
  function () {
    return mcq("Un élève observe une goutte d'eau d'étang au microscope et y découvre un organisme formé d'une seule cellule qui se déplace et se nourrit. Qu'est-ce que cette observation illustre de la théorie cellulaire?",
      "La cellule est l'unité de base de la vie : un organisme entier peut tenir en une seule cellule",
      ["Les organismes unicellulaires ne sont pas vraiment vivants, faute d'organes complets", "Toutes les cellules doivent faire partie d'un organisme formé de milliards de cellules", "Un organisme unicellulaire est une cellule défectueuse qui a quitté un plus gros organisme"],
      "Un organisme complet fait d'une seule cellule montre que la cellule suffit comme unité de base du vivant. <b>La cellule est l'unité de base de la vie</b>.", {});
  },
  function () {
    return mcq("Une égratignure sur la peau guérit en quelques jours parce que les cellules autour se divisent et produisent de nouvelles cellules de peau. Quel principe de la théorie cellulaire cette guérison illustre-t-elle?",
      "Les nouvelles cellules proviennent de cellules existantes, par division cellulaire",
      ["Les nouvelles cellules apparaissent spontanément dans le sang qui couvre la plaie", "Le corps fabrique des cellules à partir des aliments sans utiliser de cellules existantes", "Les cellules de peau voisines se transforment en plaie puis redeviennent normales"],
      "La guérison par division des cellules voisines illustre que toute cellule vient d'une cellule. <b>Les nouvelles cellules proviennent de cellules existantes</b>.", {});
  },
  function () {
    return mcq("Lequel des énoncés contredit la théorie cellulaire?",
      "Un morceau de liège sans aucune cellule peut être considéré comme un être vivant complet",
      ["Une bactérie, formée d'une seule cellule, est un être vivant à part entière", "Les plantes et les animaux sont tous formés d'une ou de plusieurs cellules", "Une cellule de feuille et une cellule de racine viennent toutes deux de divisions cellulaires"],
      "La théorie cellulaire exige que tout être vivant soit fait de cellules; un être « vivant » sans cellules la contredirait. <b>Un morceau de liège sans aucune cellule peut être considéré comme un être vivant complet</b>.", {});
  }
]), ["Rappelle les trois énoncés de la théorie cellulaire avant de juger.", "Des cellules nées de matière non vivante contrediraient la théorie."]);


E("s8f-u4-niveaux-identifier", 4, ["SC8.10.4"], 1, "var", varset([
  function () {
    return mcq("Le cœur humain pompe le sang et il est formé de tissu musculaire, de tissu nerveux et de tissu conjonctif qui travaillent ensemble. À quel niveau d'organisation appartient le cœur?",
      "Un organe : il combine plusieurs tissus différents qui accomplissent ensemble une fonction",
      ["Un tissu du corps : il n'est formé que d'un seul et unique genre de cellules, toutes parfaitement identiques entre elles et accomplissant la même tâche", "Un système complet du corps : il comprend plusieurs organes différents répartis dans tout le corps humain et reliés entre eux par de longs vaisseaux", "Un organisme : il accomplit à lui seul toutes les fonctions de la vie humaine"],
      "Plusieurs tissus différents réunis pour une fonction : c'est la définition d'un organe. <b>Un organe</b>.", {});
  },
  function () {
    return mcq("Dans une feuille, des cellules semblables alignées en couche mince protègent la surface et limitent la perte d'eau. À quel niveau d'organisation appartient cette couche?",
      "Un tissu : un ensemble de cellules semblables qui accomplissent ensemble la même fonction",
      ["Un organe complet de la plante : elle combine plusieurs genres de tissus différents qui travaillent ensemble pour accomplir une fonction commune de protection", "Une cellule unique et géante : elle n'est formée que d'une seule unité vivante microscopique qui recouvre toute la surface extérieure de la feuille entière", "Un système : elle relie plusieurs organes de la plante entre eux pour la protéger"],
      "Des cellules semblables qui travaillent ensemble forment un tissu. <b>Un tissu</b>.", {});
  },
  function () {
    return mcq("La bouche, l'estomac, le foie et les intestins travaillent ensemble à digérer les aliments. À quel niveau d'organisation appartient cet ensemble?",
      "Un système : plusieurs organes coopèrent pour accomplir une grande fonction du corps",
      ["Un organe unique et très étendu : c'est un seul et même organe continu qui traverse tout le corps humain de la bouche jusqu'à la fin du tube digestif", "Un tissu spécialisé du corps : c'est un ensemble de cellules toutes semblables entre elles qui digèrent directement les aliments dans tout le corps humain", "Une cellule géante : l'ensemble fonctionne comme une seule unité microscopique"],
      "Plusieurs organes qui coopèrent pour une fonction forment un système (ici, le système digestif). <b>Un système</b>.", {});
  },
  function () {
    return mcq("Une paramécie est un être vivant microscopique formé d'une seule cellule qui se nourrit, se déplace et se reproduit. À quel niveau d'organisation se situe-t-elle?",
      "À la fois une cellule et un organisme complet : sa seule cellule accomplit toutes les fonctions de la vie",
      ["Un tissu microscopique : une seule cellule isolée ne peut jamais, en aucun cas, former à elle seule un organisme vivant complet et indépendant", "Un organe microscopique : sa cellule unique combine plusieurs genres de tissus différents entassés ensemble dans un très petit espace sous le microscope", "Aucun niveau : les êtres microscopiques ne font pas partie de l'organisation du vivant"],
      "Chez les unicellulaires, la cellule unique est aussi l'organisme entier. <b>À la fois une cellule et un organisme complet</b>.", {});
  }
]), ["Compte l'organisation : une cellule, des cellules semblables, plusieurs tissus, plusieurs organes.", "Cellule, tissu, organe, système, organisme."]);


E("s8f-u4-besoins-appliques", 4, ["SC8.10.5"], 2, "var", varset([
  function () {
    return mcq("Une culture de levures dans un bocal fermé cesse de produire des bulles après deux jours, bien qu'il reste du liquide. On ajoute un peu de sucre et les bulles repartent. Qu'est-ce qui limitait les levures?",
      "La nourriture : les levures avaient épuisé le sucre, leur source d'énergie, et la fermentation s'était arrêtée",
      ["L'espace disponible dans le bocal : le bocal fermé était devenu beaucoup trop petit pour que les levures puissent respirer et continuer leur fermentation normale", "La lumière du jour : les levures cultivées ont absolument besoin de lumière directe pour produire les bulles de gaz carbonique observées au début de la culture", "La température : le liquide du bocal avait gelé complètement pendant les deux jours"],
      "Le redémarrage dès l'ajout de sucre désigne la nourriture comme le besoin limitant. <b>La nourriture : les levures avaient épuisé le sucre</b>.", {});
  },
  function () {
    return mcq("Des semis poussent bien dans une serre, sauf ceux d'un coin où l'air est stagnant et où ils jaunissent malgré un bon arrosage et une bonne lumière. Quel besoin des cellules est le plus probablement insuffisant dans ce coin?",
      "Les échanges gazeux : l'air stagnant renouvelle mal l'oxygène et le dioxyde de carbone autour des feuilles",
      ["L'eau d'arrosage : les semis du coin stagnant reçoivent nettement moins d'eau à chaque arrosage que tous les autres semis de la serre, qui sont bien arrosés", "La nourriture minérale du sol : le sol du coin stagnant de la serre contient beaucoup moins d'engrais et de minéraux dissous que le sol de toutes les autres sections", "L'espace : les semis du coin sont plantés beaucoup plus serrés que partout ailleurs"],
      "Eau et lumière étant suffisantes, c'est le renouvellement de l'air (échanges gazeux) qui fait défaut dans le coin stagnant. <b>Les échanges gazeux : l'air stagnant renouvelle mal les gaz autour des feuilles</b>.", {});
  },
  function () {
    return mcq("Un aquarium dont le filtre tombe en panne voit ses poissons venir respirer à la surface après quelques heures. Quel besoin cellulaire explique ce comportement?",
      "L'oxygène dissous : sans circulation ni aération, l'eau s'appauvrit en oxygène et les poissons cherchent l'air à la surface",
      ["La nourriture des poissons : les poissons de l'aquarium montent vers la surface parce que la nourriture en flocons flotte toujours à la surface de l'eau de l'aquarium", "L'espace au fond de l'aquarium : les poissons montent vers la surface parce que le fond de l'aquarium est devenu beaucoup trop petit et trop encombré pour eux", "L'élimination des déchets : les poissons montent pour rejeter leurs déchets hors de l'eau"],
      "Le comportement de respiration à la surface signale un manque d'oxygène dissous. <b>L'oxygène dissous : l'eau s'appauvrit en oxygène sans aération</b>.", {});
  },
  function () {
    return mcq("Des bactéries cultivées dans un tube produisent un déchet qui s'accumule; au bout d'un jour, elles cessent de se diviser même s'il reste de la nourriture. Quel besoin n'est plus satisfait?",
      "L'élimination des déchets : leurs propres déchets accumulés empoisonnent le milieu et arrêtent la division",
      ["La nourriture du milieu de culture : il reste encore de la nourriture dans le tube, mais elle est devenue complètement invisible et inaccessible aux bactéries cultivées", "L'espace et la chaleur du tube : le petit tube de culture est devenu beaucoup trop chaud pendant la journée pour que les bactéries puissent continuer à y vivre", "L'eau : toute l'eau du tube s'est évaporée pendant la journée de culture entière"],
      "Nourriture présente, division arrêtée : c'est l'accumulation des déchets qui limite la population. <b>L'élimination des déchets : leurs déchets accumulés empoisonnent le milieu</b>.", {});
  }
]), ["Éprouve chaque besoin contre le récit : qu'est-ce qui a manqué ou s'est accumulé?", "Le besoin dont l'apport a changé explique le résultat observé."]);


E("s8f-u4-cr-besoins-experience", 4, ["SC8.10.5"], 2, "var", varset([
  function () {
    return textq("Une élève fait germer des graines de haricot dans quatre plats : (1) humide et à la lumière, (2) humide et dans le noir, (3) sec et à la lumière, (4) sec et dans le noir. Après une semaine, les plats 1 et 2 ont germé, les plats 3 et 4 non. Explique ce que cette expérience démontre : quels besoins la germination exige-t-elle selon les résultats, et pourquoi le plat 2 a-t-il germé malgré l'obscurité? (3 points)",
      ["Les plats humides ont germé, que la lumière soit présente ou non."],
      "Points de notation (3) : 1 point pour la comparaison correcte (les deux plats humides germent, les deux plats secs non : la variable qui décide est l'eau). 1 point pour la conclusion sur les besoins (l'eau est nécessaire à la germination; la lumière ne l'est pas à ce stade). 1 point pour expliquer le plat 2 (la graine contient des réserves de nourriture qui alimentent la germination jusqu'à ce que les premières feuilles fassent la photosynthèse). Réponse modèle : Seuls les plats avec de l'eau ont germé : l'eau est donc le besoin décisif, et la lumière n'est pas requise pour germer. <b>Le plat 2 a germé dans le noir parce que la graine vit sur ses réserves jusqu'à l'apparition des feuilles</b>.", {});
  },
  function () {
    return textq("Un élève compare deux aquariums identiques de plantes aquatiques : le premier reçoit un engrais complet, le second aucun engrais; les deux ont la même lumière et la même eau. Après un mois, les plantes du premier sont grandes et vertes, celles du second petites et jaunâtres. Explique ce que démontre cette expérience : quel besoin était limitant, et pourquoi peut-on être sûr que c'est ce besoin-là et pas un autre? (3 points)",
      ["Les deux aquariums ne diffèrent que par la présence ou l'absence d'engrais."],
      "Points de notation (3) : 1 point pour identifier le besoin limitant (les nutriments minéraux, la « nourriture » des plantes, fournis par l'engrais). 1 point pour la justification expérimentale (tout le reste — lumière, eau, plantes, contenants — est gardé identique, donc la seule cause possible de l'écart est l'engrais). 1 point pour relier les signes aux besoins cellulaires (le jaunissement et la petite taille montrent des cellules qui ne peuvent ni construire leurs protéines ni se diviser normalement sans minéraux). Réponse modèle : Avec tout le reste identique, seuls les minéraux de l'engrais expliquent l'écart de croissance. <b>Les plantes sans engrais manquaient de nutriments pour fabriquer leurs protéines et leurs nouvelles cellules</b>.", {});
  },
  function () {
    return textq("Une classe cultive des moisissures sur du pain dans trois sacs : pain sec au garde-manger, pain humide au garde-manger, pain humide au réfrigérateur. La moisissure apparaît vite sur le pain humide du garde-manger, lentement sur le pain humide froid, et pas du tout sur le pain sec. Explique ces résultats : nomme DEUX conditions qui influencent la croissance des moisissures et dis le rôle de chacune. (3 points)",
      ["La moisissure pousse le plus vite sur le pain humide gardé à la température ambiante."],
      "Points de notation (3) : 1 point pour la première condition (l'eau : le pain sec ne permet aucune croissance, car les cellules des moisissures ont besoin d'eau pour leurs activités). 1 point pour la deuxième condition (la température : le froid du réfrigérateur ralentit les activités cellulaires et la croissance, sans les arrêter complètement). 1 point pour la synthèse (le pain humide et tiède réunit les deux conditions favorables, d'où la croissance la plus rapide). Réponse modèle : Sans eau, aucune croissance; au froid, une croissance lente; humide et tiède, la croissance est rapide. <b>L'eau est indispensable aux moisissures et la chaleur accélère leurs activités cellulaires</b>.", {});
  }
]), ["Compare les montages deux à deux : quelle condition diffère?", "La condition qui suit la différence de résultat est celle que l'expérience éprouve."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s8f-u4-cr-cellule-comparer
   closes Unit 4 Test 1 (2 marks, Level 3); s8f-u4-cr-niveaux-appliquer
   closes Unit 4 Test 2 (4 marks, Level 3); s8f-u4-cr-systemes-reponse
   closes Unit 4 Test 3 (4 marks, Level 2). SME-flagged for the
   specialist pass. */

E("s8f-u4-cr-cellule-comparer", 4, ["SC8.10.2"], 3, "var", varset([
  function () {
    return textq("Un élève affirme qu'une cellule de feuille et une cellule de joue sont pareilles parce que ce sont toutes deux des cellules. Évalue cette affirmation : nomme deux différences structurales entre la cellule de feuille (végétale) et la cellule de joue (animale) (1 point), et relie chacune des deux différences au travail que la cellule accomplit (1 point). (2 points)",
      ["la cellule de feuille a des chloroplastes, la cellule de joue n'en a pas", "la cellule de feuille a une paroi cellulaire, la cellule de joue n'en a pas", "les chloroplastes font la photosynthèse, le travail de fabrication de nourriture de la feuille", "la paroi donne à la cellule végétale soutien et forme régulière"],
      "<b>Réponse modèle :</b> L'affirmation est fausse : être des cellules donne aux deux les mêmes structures de base, comme une membrane cellulaire, un cytoplasme et un noyau, mais leurs autres structures diffèrent selon leur travail. Première différence : la cellule de feuille contient des chloroplastes et la cellule de joue n'en contient pas. Les chloroplastes font la photosynthèse, ce qui est le travail de fabrication de nourriture de la feuille; la cellule de joue, qui ne reçoit pas de lumière utile et ne fabrique pas de nourriture, n'en a pas besoin. Deuxième différence : la cellule de feuille a une paroi cellulaire à l'extérieur de sa membrane, et la cellule de joue n'en a pas. La paroi soutient la cellule végétale et lui donne une forme régulière, ce qui aide la feuille à garder sa forme étalée vers la lumière, tandis que la cellule de joue, sans paroi, garde une forme souple qui convient aux tissus mous de la bouche. (La grande vacuole de la cellule végétale, qui emmagasine l'eau et soutient la cellule, est une autre différence valide.)<br><br><b>Points d'attribution :</b> 1 point pour deux différences structurales correctes (par exemple les chloroplastes et la paroi cellulaire, présents dans la cellule de feuille et absents dans la cellule de joue). 1 point pour relier chacune des deux différences au travail de la cellule (la photosynthèse pour les chloroplastes; le soutien et la forme pour la paroi).",
      {});
  },
  function () {
    return textq("Un élève affirme qu'une cellule de racine et une cellule de muscle sont pareilles parce que ce sont toutes deux des cellules. Évalue cette affirmation : nomme deux différences structurales entre la cellule de racine (végétale) et la cellule de muscle (animale) (1 point), et relie chacune des deux différences au travail que la cellule accomplit (1 point). (2 points)",
      ["la cellule de racine a une paroi cellulaire, la cellule de muscle n'en a pas", "la cellule de racine a une grande vacuole, la cellule de muscle n'a que de petites vacuoles", "la paroi soutient la cellule de racine dans le sol", "l'absence de paroi laisse la cellule de muscle changer de forme pour se contracter"],
      "<b>Réponse modèle :</b> L'affirmation est fausse : être des cellules donne aux deux les mêmes structures de base, comme une membrane cellulaire, un cytoplasme et un noyau, mais leurs autres structures diffèrent selon leur travail. Première différence : la cellule de racine a une paroi cellulaire à l'extérieur de sa membrane, et la cellule de muscle n'en a pas. La paroi soutient la cellule de racine et protège sa forme pendant qu'elle pousse entre les particules du sol, tandis que la cellule de muscle doit raccourcir et changer de forme pour se contracter, ce qu'une paroi rigide empêcherait. Deuxième différence : la cellule de racine a une grande vacuole, et la cellule de muscle n'a que de petites vacuoles. La grande vacuole emmagasine l'eau que la racine absorbe et aide à garder la cellule ferme, au service de son travail d'absorption. On remarque aussi que la cellule de racine n'a pas de chloroplastes, car elle vit sous terre, sans lumière pour faire la photosynthèse.<br><br><b>Points d'attribution :</b> 1 point pour deux différences structurales correctes (par exemple la paroi cellulaire et la grande vacuole, présentes dans la cellule de racine et absentes ou petites dans la cellule de muscle). 1 point pour relier chacune des deux différences au travail de la cellule (le soutien et la protection dans le sol pour la paroi, et l'absence de paroi qui permet la contraction; l'emmagasinage de l'eau absorbée pour la grande vacuole).",
      {});
  },
  function () {
    return textq("Un élève affirme qu'une cellule d'épiderme d'oignon et un globule rouge sont pareils parce que ce sont tous deux des cellules. Évalue cette affirmation : nomme deux différences structurales entre la cellule d'épiderme d'oignon (végétale) et le globule rouge (animal) (1 point), et relie chacune des deux différences au travail que la cellule accomplit (1 point). (2 points)",
      ["la cellule d'oignon a une paroi cellulaire, le globule rouge n'en a pas", "la cellule d'oignon a un noyau, le globule rouge mature n'en a pas", "la paroi soutient la cellule d'oignon et lui donne une forme régulière", "sans noyau, le globule rouge a plus de place pour transporter l'oxygène"],
      "<b>Réponse modèle :</b> L'affirmation est fausse : être des cellules donne aux deux une membrane cellulaire et un cytoplasme, mais leurs autres structures diffèrent selon leur travail. Première différence : la cellule d'épiderme d'oignon a une paroi cellulaire à l'extérieur de sa membrane, et le globule rouge n'en a pas. La paroi soutient la cellule d'oignon et lui donne une forme régulière, ce qui convient à une couche protectrice de l'oignon, tandis que le globule rouge, sans paroi, reste souple pour se glisser dans les plus petits vaisseaux sanguins. Deuxième différence : la cellule d'oignon a un noyau qui contient son matériel génétique et contrôle ses activités, et le globule rouge mature n'a pas de noyau. Cette absence laisse plus de place dans le globule rouge pour son travail, qui est de transporter l'oxygène dans tout le corps. (La grande vacuole de la cellule d'oignon, qui emmagasine l'eau, est une autre différence valide.)<br><br><b>Points d'attribution :</b> 1 point pour deux différences structurales correctes (par exemple la paroi cellulaire, présente dans la cellule d'oignon et absente dans le globule rouge, et le noyau, présent dans la cellule d'oignon et absent dans le globule rouge mature). 1 point pour relier chacune des deux différences au travail de la cellule (le soutien et la forme pour la paroi, et la souplesse dans les vaisseaux; le contrôle des activités pour le noyau, et la place laissée au transport de l'oxygène dans le globule rouge).",
      {});
  }
]), ["Les deux cellules partagent les structures de base; cherche ce qu'une seule des deux possède.", "Une différence ne suffit pas : il faut la relier au travail de la cellule."]);

E("s8f-u4-cr-niveaux-appliquer", 4, ["SC8.10.4", "SC8.10.5"], 3, "var", varset([
  function () {
    return textq("Voici cinq structures dans le désordre : système circulatoire, cellule du muscle cardiaque, humain, cœur, tissu cardiaque. (a) Range ces cinq structures selon les niveaux d'organisation, du plus petit au plus grand, en nommant le niveau de chacune. (2 points) (b) Une cellule du muscle cardiaque a besoin d'oxygène pour vivre. Explique comment ce besoin est satisfait grâce à la coopération de deux niveaux d'organisation au-dessus de la cellule, en utilisant les structures de la liste. (2 points) (4 points)",
      ["cellule du muscle cardiaque, tissu cardiaque, cœur, système circulatoire, humain", "les niveaux sont cellule, tissu, organe, système et organisme", "le cœur, un organe, pompe le sang", "le système circulatoire transporte l'oxygène jusqu'à la cellule"],
      "<b>Réponse modèle :</b> (a) Du plus petit au plus grand : la cellule du muscle cardiaque (niveau de la cellule), le tissu cardiaque (niveau du tissu), le cœur (niveau de l'organe), le système circulatoire (niveau du système) et l'humain (niveau de l'organisme). (b) Le cœur est l'organe qui pompe le sang dans tout le corps, y compris dans son propre tissu. Le système circulatoire, formé du cœur et des vaisseaux sanguins, transporte le sang riche en oxygène des poumons jusqu'à chaque cellule, y compris les cellules du muscle cardiaque. L'organe fournit la pompe et le système fournit le transport : ensemble, ils livrent l'oxygène dont la cellule a besoin.<br><br><b>Points d'attribution :</b> 1 point pour les cinq structures rangées dans l'ordre correct. 1 point pour le nom correct du niveau de chaque structure (cellule, tissu, organe, système, organisme). 1 point pour le rôle d'un premier niveau au-dessus de la cellule (le cœur, organe, pompe le sang). 1 point pour le rôle d'un deuxième niveau (le système circulatoire transporte et livre l'oxygène à la cellule).",
      {});
  },
  function () {
    return textq("Voici cinq structures dans le désordre : feuille, plante, cellule de feuille, système de pousses, tissu photosynthétique. (a) Range ces cinq structures selon les niveaux d'organisation, du plus petit au plus grand, en nommant le niveau de chacune. (2 points) (b) Une cellule de feuille doit éliminer l'eau en excès qu'elle contient. Explique comment ce besoin est satisfait grâce à la coopération de deux niveaux d'organisation au-dessus de la cellule, en utilisant les structures de la liste. (2 points) (4 points)",
      ["cellule de feuille, tissu photosynthétique, feuille, système de pousses, plante", "les niveaux sont cellule, tissu, organe, système et organisme", "la feuille, un organe, laisse l'eau s'évaporer à sa surface", "le système de pousses conduit l'eau dans la plante et entretient ce mouvement"],
      "<b>Réponse modèle :</b> (a) Du plus petit au plus grand : la cellule de feuille (niveau de la cellule), le tissu photosynthétique (niveau du tissu), la feuille (niveau de l'organe), le système de pousses (niveau du système) et la plante (niveau de l'organisme). (b) La feuille est l'organe où l'eau en excès quitte la plante : l'eau s'évapore à la surface de la feuille, ce qui retire l'eau des cellules de la feuille. Le système de pousses, qui comprend la tige et les feuilles, entretient ce mouvement : l'évaporation à la feuille tire l'eau vers le haut dans les vaisseaux de la tige, donc l'eau continue de circuler et de quitter les cellules au lieu de s'y accumuler. L'organe fournit la surface d'évaporation et le système entretient le courant qui emporte l'eau.<br><br><b>Points d'attribution :</b> 1 point pour les cinq structures rangées dans l'ordre correct. 1 point pour le nom correct du niveau de chaque structure (cellule, tissu, organe, système, organisme). 1 point pour le rôle d'un premier niveau au-dessus de la cellule (la feuille, organe, laisse l'eau s'évaporer à sa surface). 1 point pour le rôle d'un deuxième niveau (le système de pousses entretient le mouvement de l'eau qui emporte l'excès).",
      {});
  },
  function () {
    return textq("Voici cinq structures dans le désordre : cerveau, humain, cellule nerveuse, système nerveux, tissu nerveux. (a) Range ces cinq structures selon les niveaux d'organisation, du plus petit au plus grand, en nommant le niveau de chacune. (2 points) (b) Une cellule nerveuse a besoin de glucose pour vivre. Explique comment ce besoin est satisfait grâce à la coopération de deux niveaux d'organisation au-dessus de la cellule, en utilisant les structures de la liste. (2 points) (4 points)",
      ["cellule nerveuse, tissu nerveux, cerveau, système nerveux, humain", "les niveaux sont cellule, tissu, organe, système et organisme", "le système nerveux détecte une baisse de glucose et produit la sensation de faim", "le cerveau, un organe, coordonne cette réponse qui pousse l'humain à manger"],
      "<b>Réponse modèle :</b> (a) Du plus petit au plus grand : la cellule nerveuse (niveau de la cellule), le tissu nerveux (niveau du tissu), le cerveau (niveau de l'organe), le système nerveux (niveau du système) et l'humain (niveau de l'organisme). (b) Le système nerveux surveille l'état du corps : quand le glucose disponible baisse, ses signaux produisent la sensation de faim. Le cerveau, l'organe qui reçoit et coordonne ces signaux, organise la réponse de l'organisme, qui cherche de la nourriture et mange. Le glucose des aliments digérés passe ensuite dans le sang et atteint toutes les cellules, y compris la cellule nerveuse. Le système détecte le manque et l'organe coordonne la réponse : ensemble, ils gardent l'approvisionnement en glucose de la cellule.<br><br><b>Points d'attribution :</b> 1 point pour les cinq structures rangées dans l'ordre correct. 1 point pour le nom correct du niveau de chaque structure (cellule, tissu, organe, système, organisme). 1 point pour le rôle d'un premier niveau au-dessus de la cellule (le système nerveux détecte la baisse de glucose et signale la faim). 1 point pour le rôle d'un deuxième niveau (le cerveau, organe, coordonne la réponse qui amène l'organisme à manger, donc le glucose atteint la cellule).",
      {});
  },
  function () {
    return textq("Voici cinq structures dans le désordre : racine, plante, cellule de poil racinaire, système racinaire, tissu racinaire. (a) Range ces cinq structures selon les niveaux d'organisation, du plus petit au plus grand, en nommant le niveau de chacune. (2 points) (b) Une cellule de poil racinaire a besoin d'oxygène pour vivre. Explique comment ce besoin est satisfait grâce à la coopération de deux niveaux d'organisation au-dessus de la cellule, en utilisant les structures de la liste. (2 points) (4 points)",
      ["cellule de poil racinaire, tissu racinaire, racine, système racinaire, plante", "les niveaux sont cellule, tissu, organe, système et organisme", "la racine, un organe, expose une grande surface de poils racinaires à l'air du sol", "le système racinaire étale les racines dans tout le volume de sol aéré"],
      "<b>Réponse modèle :</b> (a) Du plus petit au plus grand : la cellule de poil racinaire (niveau de la cellule), le tissu racinaire (niveau du tissu), la racine (niveau de l'organe), le système racinaire (niveau du système) et la plante (niveau de l'organisme). (b) Les cellules des racines respirent avec l'oxygène de l'air qui se trouve entre les particules du sol. La racine, en tant qu'organe, porte des milliers de poils racinaires qui offrent une très grande surface de contact avec cet air du sol, donc l'oxygène peut atteindre chaque cellule. Le système racinaire entier étale les racines dans tout le volume du sol autour de la plante, ce qui multiplie les endroits où l'oxygène du sol est accessible. L'organe fournit la surface d'échange et le système étend cette surface à tout le sol exploré.<br><br><b>Points d'attribution :</b> 1 point pour les cinq structures rangées dans l'ordre correct. 1 point pour le nom correct du niveau de chaque structure (cellule, tissu, organe, système, organisme). 1 point pour le rôle d'un premier niveau au-dessus de la cellule (la racine, organe, expose une grande surface de poils racinaires à l'air du sol). 1 point pour le rôle d'un deuxième niveau (le système racinaire étale les racines dans le sol aéré, multipliant l'accès à l'oxygène).",
      {});
  }
]), ["Pour la partie (a), commence par la structure qui est une seule cellule et monte d'un niveau à la fois.", "Pour la partie (b), choisis deux niveaux au-dessus de la cellule et donne à chacun un travail précis dans la réponse au besoin."]);

E("s8f-u4-cr-systemes-reponse", 4, ["SC8.10.6", "SC8.10.7"], 2, "var", varset([
  function () {
    return textq("Juste après le dîner, un élève monte des escaliers en courant. Explique le rôle coordonné de chacun de ces trois systèmes dans cet épisode : le système digestif, le système circulatoire et le système respiratoire (1 point par système). Puis explique ce qui irait mal si l'un de ces systèmes ne répondait pas. (1 point) (4 points)",
      ["le système digestif décompose le repas et absorbe le glucose", "le système circulatoire transporte le glucose et l'oxygène aux muscles des jambes", "le système respiratoire augmente l'apport d'oxygène et élimine le dioxyde de carbone produit en plus", "si le système respiratoire ne suivait pas, le dioxyde de carbone s'accumulerait et les muscles se fatigueraient vite"],
      "<b>Réponse modèle :</b> Le système digestif décompose le repas qui vient d'être mangé et absorbe les nutriments, dont le glucose, dans le sang. Le système circulatoire transporte ce glucose, avec l'oxygène, jusqu'aux muscles des jambes qui travaillent fort dans les escaliers, et il emporte leurs déchets. Le système respiratoire augmente le rythme et la profondeur de la respiration : il fait entrer l'oxygène supplémentaire dont les muscles ont besoin et élimine le dioxyde de carbone qu'ils produisent en plus grande quantité. Si le système respiratoire ne répondait pas, l'oxygène manquerait aux muscles pendant que le dioxyde de carbone s'accumulerait : l'élève serait vite essoufflé, ses muscles se fatigueraient et il devrait s'arrêter, même si les deux autres systèmes travaillaient bien.<br><br><b>Points d'attribution :</b> 1 point pour le rôle du système digestif (décomposer le repas et absorber les nutriments comme le glucose). 1 point pour le rôle du système circulatoire (transporter le glucose et l'oxygène aux muscles et emporter les déchets). 1 point pour le rôle du système respiratoire (augmenter l'apport d'oxygène et l'élimination du dioxyde de carbone). 1 point pour une conséquence correcte si un système nommé ne répond pas (par exemple un manque d'oxygène et une fatigue rapide si le système respiratoire ne suit pas).",
      {});
  },
  function () {
    return textq("Un élève touche une poêle chaude et retire sa main aussitôt. Explique le rôle coordonné de chacun de ces trois systèmes dans cet épisode : le système nerveux, le système musculaire et le système circulatoire (1 point par système). Puis explique ce qui irait mal si l'un de ces systèmes ne répondait pas. (1 point) (4 points)",
      ["le système nerveux détecte la chaleur et envoie le signal de retirer la main", "le système musculaire contracte les muscles du bras et retire la main", "le système circulatoire apporte le sang au tissu touché pour amorcer la réparation", "si le système nerveux ne répondait pas, la main resterait sur la poêle et la brûlure serait grave"],
      "<b>Réponse modèle :</b> Le système nerveux détecte la chaleur excessive par les récepteurs de la peau et envoie aussitôt des signaux aux muscles du bras, avant même que l'élève décide de bouger. Le système musculaire répond à ces signaux : les muscles du bras se contractent et retirent la main de la poêle en une fraction de seconde. Le système circulatoire augmente l'apport de sang au tissu touché, ce qui amène l'oxygène et les nutriments nécessaires au début de la réparation et contribue au rougissement de la peau. Si le système nerveux ne répondait pas, aucun signal n'ordonnerait le retrait : la main resterait sur la poêle plus longtemps et la brûlure serait beaucoup plus grave.<br><br><b>Points d'attribution :</b> 1 point pour le rôle du système nerveux (détecter la chaleur et signaler aux muscles). 1 point pour le rôle du système musculaire (contracter les muscles qui retirent la main). 1 point pour le rôle du système circulatoire (augmenter l'apport de sang au tissu touché pour la réparation). 1 point pour une conséquence correcte si un système nommé ne répond pas (par exemple une brûlure plus grave si le système nerveux ne signale pas le retrait).",
      {});
  },
  function () {
    return textq("Une joueuse dispute un match de soccer complet sous une forte chaleur. Explique le rôle coordonné de chacun de ces trois systèmes dans cet épisode : le système musculaire, le système circulatoire et le système respiratoire (1 point par système). Puis explique ce qui irait mal si l'un de ces systèmes ne répondait pas. (1 point) (4 points)",
      ["le système musculaire produit le mouvement de la course et produit aussi de la chaleur", "le système circulatoire transporte l'oxygène aux muscles et dirige le sang vers la peau pour libérer la chaleur", "le système respiratoire augmente l'apport d'oxygène et élimine le dioxyde de carbone", "si le système circulatoire ne pouvait pas refroidir le corps, la température interne monterait dangereusement"],
      "<b>Réponse modèle :</b> Le système musculaire produit les mouvements de la course pendant tout le match, et ce travail produit aussi beaucoup de chaleur dans le corps. Le système circulatoire transporte l'oxygène et le glucose aux muscles qui travaillent, et il dirige en même temps plus de sang vers la peau pour y libérer la chaleur produite. Le système respiratoire augmente le rythme de la respiration : il fait entrer l'oxygène supplémentaire que les muscles demandent et élimine le dioxyde de carbone produit en plus grande quantité. Si le système circulatoire ne répondait pas assez, le sang ne pourrait ni nourrir les muscles ni évacuer la chaleur vers la peau : la température interne de la joueuse monterait dangereusement, jusqu'au coup de chaleur, même si elle continuait de respirer fort.<br><br><b>Points d'attribution :</b> 1 point pour le rôle du système musculaire (produire le mouvement de la course et la chaleur qui l'accompagne). 1 point pour le rôle du système circulatoire (transporter l'oxygène et le glucose aux muscles et diriger le sang vers la peau pour libérer la chaleur). 1 point pour le rôle du système respiratoire (augmenter l'apport d'oxygène et l'élimination du dioxyde de carbone). 1 point pour une conséquence correcte si un système nommé ne répond pas (par exemple une température interne qui monte dangereusement si le système circulatoire ne refroidit pas le corps).",
      {});
  },
  function () {
    return textq("Un élève se remet d'une maladie d'estomac qui l'a empêché de garder la nourriture et l'eau pendant deux jours. Explique le rôle coordonné de chacun de ces trois systèmes dans sa récupération : le système digestif, le système circulatoire et le système nerveux (1 point par système). Puis explique ce qui irait mal si l'un de ces systèmes ne répondait pas. (1 point) (4 points)",
      ["le système digestif recommence à décomposer les aliments et à absorber l'eau et les nutriments", "le système circulatoire distribue l'eau et les nutriments récupérés à toutes les cellules", "le système nerveux coordonne la faim et la soif qui poussent l'élève à manger et à boire", "si le système digestif n'absorbait pas l'eau de nouveau, la déshydratation continuerait"],
      "<b>Réponse modèle :</b> Le système digestif recommence son travail normal : il décompose les aliments et, surtout après cette maladie, il absorbe de nouveau l'eau et les nutriments au lieu de les perdre. Le système circulatoire distribue cette eau et ces nutriments à toutes les cellules du corps, qui en ont manqué pendant deux jours, et il transporte les déchets vers les organes qui les éliminent. Le système nerveux coordonne la récupération : il produit les sensations de faim et de soif qui poussent l'élève à manger et à boire, et il surveille l'état du corps pendant que les réserves se refont. Si le système digestif ne répondait pas et n'absorbait pas l'eau de nouveau, l'élève continuerait de se déshydrater malgré ce qu'il boit, et la récupération serait impossible.<br><br><b>Points d'attribution :</b> 1 point pour le rôle du système digestif (décomposer les aliments et absorber de nouveau l'eau et les nutriments). 1 point pour le rôle du système circulatoire (distribuer l'eau et les nutriments aux cellules et transporter les déchets). 1 point pour le rôle du système nerveux (coordonner la faim et la soif et surveiller la récupération). 1 point pour une conséquence correcte si un système nommé ne répond pas (par exemple une déshydratation qui continue si le système digestif n'absorbe pas l'eau).",
      {});
  }
]), ["Traite les trois systèmes un par un, avec le travail précis de chacun dans cet épisode.", "Pour le dernier point, choisis un système et suis la conséquence de son silence jusqu'au bout."]);

/* ---------- Ajout du 21 novembre 2026 : plan de tests (decisions 9, 10, 11) ---------- */

/* ---------- SC8.10.1, SC8.10.5 et SC8.10.6 : cellule vivante, besoins et facteurs ---------- */

E("s8f-u4-cr-cellule-vivante", 4, ["SC8.10.1"], 2, "var", varset([
  function () {
    return textq("Une amibe est un organisme formé d'une seule cellule, qui vit librement dans l'eau d'un étang : elle se déplace vers sa nourriture, la capture, grandit, puis se divise en deux amibes. Explique comment cette unique cellule montre qu'elle est un système vivant complet, qui affiche les caractéristiques de la vie. (2 points)",
      ["l'amibe se déplace et répond à la présence de nourriture dans son milieu", "elle prend des nutriments et élimine ses déchets par sa membrane", "elle croît et se reproduit en se divisant en deux cellules", "elle accomplit seule toutes ces activités, sans faire partie d'un plus grand organisme"],
      "<b>Réponse modèle:</b> L'amibe n'est pas un fragment d'être vivant : sa seule cellule accomplit tout ce qui définit la vie. Elle se déplace vers sa nourriture et y répond, ce qui montre le mouvement et la réponse aux stimuli. Elle prend des nutriments et de l'oxygène et élimine ses déchets à travers sa membrane, donc elle satisfait seule les besoins de base d'une cellule. Elle grandit, puis se divise en deux amibes, ce qui est la reproduction. Comme elle affiche les caractéristiques de la vie par elle-même, cette cellule unique est un organisme vivant complet.<br><br><b>Points d'attribution:</b> 1 point pour au moins trois caractéristiques de la vie correctement appliquées à l'amibe (par exemple le mouvement et la réponse vers la nourriture, la croissance, et la reproduction par division). 1 point pour la conclusion complète (la cellule satisfait seule ses besoins de base, nutriments et élimination des déchets, et forme à elle seule un système vivant, pas seulement une partie d'un organisme).",
      {});
  },
  function () {
    return textq("Une cellule de levure placée dans une pâte sucrée se nourrit du sucre, dégage des bulles de gaz, grandit et produit de nouvelles cellules par bourgeonnement, jusqu'à faire lever toute la pâte. Explique comment cette unique cellule montre qu'elle est un système vivant complet, qui affiche les caractéristiques de la vie. (2 points)",
      ["la levure prend le sucre comme nutriment et dégage des déchets gazeux", "elle croît dans la pâte tiède et humide", "elle se reproduit en produisant de nouvelles cellules par bourgeonnement", "elle accomplit seule toutes ces activités, sans faire partie d'un plus grand organisme"],
      "<b>Réponse modèle:</b> La cellule de levure accomplit à elle seule les activités d'un être vivant. Elle prend des nutriments, le sucre de la pâte, et élimine des déchets, le gaz qui forme les bulles : elle satisfait donc seule les besoins de base d'une cellule. Elle grandit dans la pâte, ce qui est la croissance, et elle produit de nouvelles cellules par bourgeonnement, ce qui est la reproduction; elle répond aussi à son milieu, car elle cesse ces activités dans une pâte froide ou sans sucre. Cette cellule unique est donc un système vivant complet, un organisme à part entière, et non la simple partie d'un organisme plus grand.<br><br><b>Points d'attribution:</b> 1 point pour au moins trois caractéristiques ou activités de la vie correctement appliquées à la levure (par exemple se nourrir du sucre et dégager des déchets, croître, et se reproduire par bourgeonnement). 1 point pour la conclusion complète (la cellule satisfait seule ses besoins de base et forme à elle seule un système vivant, pas seulement une partie d'un organisme).",
      {});
  },
  function () {
    return textq("Dans une goutte d'eau de mare, une algue microscopique formée d'une seule cellule capte la lumière, fabrique sa nourriture, se déplace vers la lumière et, après avoir grandi, se divise en deux algues. Explique comment cette unique cellule montre qu'elle est un système vivant complet, qui affiche les caractéristiques de la vie. (2 points)",
      ["l'algue se déplace vers la lumière et y répond", "elle fabrique sa nourriture et satisfait seule ses besoins de base", "elle croît puis se divise en deux cellules, ce qui est la reproduction", "elle accomplit seule toutes ces activités, sans faire partie d'un plus grand organisme"],
      "<b>Réponse modèle:</b> Cette algue d'une seule cellule affiche les caractéristiques de la vie sans l'aide d'aucune autre cellule. Elle se déplace vers la lumière et y répond, ce qui montre le mouvement et la réponse aux stimuli. Elle fabrique sa nourriture à la lumière et échange ce dont elle a besoin avec l'eau de la goutte, nutriments contre déchets, donc elle satisfait seule les besoins de base d'une cellule. Elle grandit, puis se divise en deux algues, ce qui est la reproduction. Sa seule cellule est donc un système vivant complet : un organisme entier tient dans cette unique cellule.<br><br><b>Points d'attribution:</b> 1 point pour au moins trois caractéristiques de la vie correctement appliquées à l'algue (par exemple le mouvement et la réponse vers la lumière, la croissance, et la reproduction par division). 1 point pour la conclusion complète (la cellule satisfait seule ses besoins de base, nourriture, échanges et élimination des déchets, et forme à elle seule un système vivant, pas seulement une partie d'un organisme).",
      {});
  }
]), ["Une seule cellule suffit-elle à la vie? Cherche les caractéristiques une à une.", "Nomme les caractéristiques, puis montre que la cellule satisfait seule ses besoins de base."]);

E("s8f-u4-besoins-cellules", 4, ["SC8.10.5"], 2, "var", varset([
  function () {
    return mcq("Après un repas, une cellule du cerveau reçoit du glucose qui ne se trouvait pas dans le cerveau une heure plus tôt. Quel énoncé explique le mieux le lien entre le besoin de cette cellule et le fonctionnement de l'organisme entier?",
      "La cellule partage les besoins de l'organisme entier : le système digestif a décomposé les aliments du repas, et le système circulatoire a transporté le glucose absorbé jusqu'à cette cellule du cerveau",
      ["La cellule produit ses besoins elle-même, indépendamment de l'organisme : elle a fabriqué son glucose sur place à partir de l'air respiré, et le repas mangé une heure plus tôt n'a joué aucun rôle pour elle",
       "La cellule reçoit ses besoins directement du milieu extérieur : le glucose du repas est passé de la bouche au cerveau par les nerfs, sans que le sang ni la digestion aient eu à intervenir dans ce trajet",
       "La cellule attend que l'organisme entier ait fini de digérer : le glucose reste emmagasiné dans l'estomac pendant des heures, puis il est libéré d'un seul coup vers toutes les cellules en même temps le soir"],
      "Les besoins d'une cellule et ceux de l'organisme sont les mêmes, à deux échelles. La cellule du cerveau a besoin de nutriments comme tout l'organisme; elle ne peut pas les obtenir seule, donc les systèmes de l'organisme travaillent pour elle : le digestif décompose et absorbe, le circulatoire transporte et livre jusqu'à la cellule.",
      {});
  },
  function () {
    return mcq("Par une journée chaude, un coureur qui n'a presque rien bu sent la soif, sa bouche devient sèche et tout son corps se fatigue. Quel énoncé explique le mieux le lien entre cette sensation et les besoins de ses cellules?",
      "Chaque cellule du coureur a besoin d'eau comme l'organisme entier : quand l'eau manque, les cellules fonctionnent moins bien partout, et la soif est le signal de l'organisme qui pousse à rétablir l'apport d'eau",
      ["Seules les cellules de la bouche ont besoin d'eau dans le corps : quand elles s'assèchent, elles envoient la sensation de soif, tandis que les autres cellules du coureur continuent sans eau indéfiniment",
       "La soif vient uniquement de la chaleur sur la peau du coureur : ses cellules contiennent encore toute leur eau, mais la peau chaude trompe le cerveau, qui produit une sensation de soif sans aucun manque réel",
       "Les cellules du coureur fabriquent leur propre eau quand il court : la fatigue vient seulement de la chaleur accumulée, et boire ne sert qu'à rafraîchir la bouche sans rien changer au travail des cellules"],
      "L'eau est un besoin de base de chaque cellule, pas seulement de l'organisme vu de l'extérieur. Quand l'apport d'eau baisse, c'est le fonctionnement des cellules partout dans le corps qui ralentit, d'où la fatigue générale. La soif est la réponse de l'organisme entier au manque ressenti à l'échelle de ses cellules.",
      {});
  },
  function () {
    return mcq("Les cellules des reins filtrent le sang jour et nuit et en retirent les déchets, que l'organisme élimine ensuite dans l'urine. Quel énoncé décrit le mieux le lien entre le travail de ces cellules et l'organisme entier?",
      "Le besoin d'élimination des déchets appartient à chaque cellule : les cellules des reins accomplissent ce travail pour toutes les autres cellules, dont les déchets, transportés par le sang, seraient sinon restés dans tout le corps",
      ["Le besoin d'élimination des déchets appartient seulement aux reins : les autres cellules du corps ne produisent aucun déchet, donc le travail des cellules des reins ne concerne que les reins eux-mêmes et leur propre survie",
       "Chaque cellule élimine ses déchets directement vers l'extérieur du corps : les cellules des reins ne font que surveiller ce travail, et le sang ne transporte jamais de déchets d'une partie du corps vers une autre partie",
       "Les déchets des cellules sont emmagasinés pour toujours dans le sang : les cellules des reins se contentent de les compter, et l'urine produite par l'organisme ne contient que l'eau bue en trop pendant la journée entière"],
      "L'élimination des déchets est un des besoins de base partagés par les cellules et l'organisme. Chaque cellule produit des déchets, le sang les transporte, et les cellules spécialisées des reins font pour l'organisme entier le travail d'élimination : si elles s'arrêtaient, les déchets de toutes les cellules s'accumuleraient partout.",
      {});
  },
  function () {
    return mcq("Pendant un entraînement intense, les cellules musculaires d'une joueuse consomment beaucoup plus d'oxygène et de nutriments qu'au repos, et produisent beaucoup plus de déchets. Quel énoncé explique le mieux la réponse de son organisme entier?",
      "L'organisme entier répond aux besoins accrus de ces cellules : la respiration et le battement du coeur accélèrent pour livrer davantage d'oxygène et de nutriments aux muscles et en emporter les déchets plus vite qu'au repos",
      ["L'organisme entier ignore les besoins changeants de ses cellules : la respiration et le battement du coeur restent exactement au rythme du repos, et les cellules musculaires se débrouillent seules avec leurs réserves locales",
       "Les cellules musculaires répondent seules à leurs besoins accrus : elles ouvrent des passages directs vers l'air extérieur à travers la peau, ce qui leur apporte l'oxygène sans que les poumons ni le coeur participent davantage",
       "L'organisme entier répond en arrêtant les autres cellules du corps : le cerveau, les reins et l'intestin cessent tout travail pendant l'entraînement, afin que toute l'énergie économisée passe aux seuls muscles des jambes"],
      "Les besoins des cellules commandent le fonctionnement de l'organisme. Quand les cellules musculaires demandent plus, les systèmes respiratoire et circulatoire de l'organisme entier augmentent leur travail pour livrer l'oxygène et les nutriments et emporter les déchets : le lien entre l'échelle de la cellule et celle de l'organisme est direct.",
      {});
  }
]), ["Les besoins sont les mêmes aux deux échelles : oxygène, nutriments, eau, élimination des déchets.", "Cherche quel système de l'organisme fait, pour la cellule, ce qu'elle ne peut pas faire seule."]);

E("s8f-u4-systemes-facteurs", 4, ["SC8.10.6"], 2, "var", varset([
  function () {
    return mcq("Un élève dort à peine cinq heures par nuit pendant une semaine. En classe, sa concentration baisse et ses temps de réaction aux consignes ralentissent nettement. Quel système est le plus directement touché par ce facteur, et comment?",
      "Le système nerveux : le manque de sommeil réduit l'efficacité du cerveau, qui traite l'information et coordonne les réponses plus lentement et avec plus d'erreurs qu'après un sommeil suffisant",
      ["Le système digestif : le manque de sommeil empêche l'estomac de décomposer les aliments du déjeuner, donc aucun nutriment n'atteint le cerveau de l'élève pendant toute la semaine de classe observée",
       "Le système circulatoire : le manque de sommeil arrête presque la circulation du sang vers le cerveau, donc les cellules du cerveau cessent complètement de recevoir de l'oxygène pendant la journée",
       "Le système musculaire : le manque de sommeil dissout peu à peu les muscles des yeux de l'élève, donc ses yeux ne peuvent plus suivre les consignes écrites au tableau pendant les cours de la semaine"],
      "Le sommeil est un facteur fondamental pour le système nerveux. Sans sommeil suffisant, le cerveau, qui coordonne la concentration, la mémoire et les réactions, fonctionne moins efficacement : l'information est traitée plus lentement et les erreurs augmentent, sans que les autres systèmes soient la cause première.",
      {});
  },
  function () {
    return mcq("Un randonneur boit très peu pendant une longue marche au soleil. Son sang devient plus épais, son coeur bat plus vite au moindre effort et il se sent étourdi. Quel système est le plus directement touché par ce facteur, et comment?",
      "Le système circulatoire : avec moins d'eau dans le sang, le volume à transporter diminue et le sang s'épaissit, donc le coeur doit travailler plus fort pour livrer l'oxygène aux cellules au même rythme",
      ["Le système respiratoire : avec moins d'eau bue pendant la marche, les poumons du randonneur cessent d'échanger l'oxygène et le dioxyde de carbone, donc l'air inspiré ressort sans aucun échange gazeux",
       "Le système nerveux : avec moins d'eau dans le corps du randonneur, les nerfs cessent de transmettre tout signal entre le cerveau et les muscles, donc ses jambes ne reçoivent plus aucun ordre de marche",
       "Le système digestif : avec moins d'eau bue pendant la marche, l'estomac du randonneur transforme les aliments en pierres, donc aucun nutriment ne peut plus être absorbé par son intestin pendant des jours"],
      "L'eau fait partie du sang : la déshydratation réduit le volume sanguin et épaissit le sang. Le système circulatoire devient moins efficace, le coeur compense en battant plus vite, et la livraison d'oxygène aux cellules souffre, d'où les étourdissements à l'effort.",
      {});
  },
  function () {
    return mcq("Une personne mange rarement des légumes, des fruits ou des grains entiers, donc très peu de fibres. Avec le temps, son transit intestinal ralentit et elle souffre souvent de constipation. Quel système est le plus directement touché par ce facteur, et comment?",
      "Le système digestif : les fibres aident les aliments à progresser dans l'intestin; sans elles, le travail de l'intestin ralentit et l'élimination des résidus devient difficile et moins régulière qu'avant",
      ["Le système excréteur : les fibres sont le seul carburant des reins, donc sans elles les reins cessent de filtrer le sang et les déchets s'accumulent dans tout le corps de la personne en quelques jours seulement",
       "Le système circulatoire : les fibres servent à construire les globules rouges du sang, donc sans elles le sang ne transporte plus d'oxygène du tout et la personne s'évanouit chaque fois qu'elle se lève le matin",
       "Le système respiratoire : les fibres absorbent l'air dans les poumons pendant la digestion, donc sans elles les poumons reçoivent moins d'air et la personne respire de plus en plus difficilement avec le temps"],
      "L'alimentation est un facteur fondamental du système digestif. Les fibres donnent du volume au contenu de l'intestin et favorisent sa progression; une alimentation pauvre en fibres rend le système digestif moins efficace, avec un transit ralenti et une élimination irrégulière.",
      {});
  },
  function () {
    return mcq("Chez une personne asthmatique, la poussière et le pollen peuvent faire se resserrer les petites voies respiratoires des poumons pendant quelques heures. Comment ce facteur touche-t-il son système respiratoire?",
      "Les voies resserrées laissent passer moins d'air à chaque respiration, donc les échanges d'oxygène et de dioxyde de carbone deviennent moins efficaces et l'effort physique devient vite essoufflant",
      ["Les voies resserrées laissent passer plus d'air à chaque respiration, donc les échanges gazeux deviennent plus efficaces qu'à l'habitude et la personne peut courir plus longtemps sans aucun essoufflement",
       "Les voies resserrées transforment les poumons en organes de filtration du sang, donc le système respiratoire remplace les reins pendant quelques heures et élimine les déchets par l'air expiré à chaque souffle",
       "Les voies resserrées n'ont aucun effet sur les échanges gazeux des poumons, donc la personne asthmatique respire exactement comme d'habitude et seul son sens de l'odorat est touché pendant ces quelques heures"],
      "L'efficacité du système respiratoire dépend du passage de l'air jusqu'aux surfaces d'échange. Des voies respiratoires resserrées par un facteur comme la poussière ou le pollen réduisent le débit d'air : moins d'oxygène entre et moins de dioxyde de carbone sort par unité de temps, d'où l'essoufflement à l'effort.",
      {});
  },
  function () {
    return mcq("Une nageuse s'entraîne régulièrement plusieurs fois par semaine pendant une saison entière. À la fin de la saison, elle récupère beaucoup plus vite après un effort intense. Quel système a gagné en efficacité, et comment?",
      "Le système respiratoire : l'entraînement régulier renforce les muscles de la respiration et améliore les échanges gazeux, donc l'oxygène entre et le dioxyde de carbone sort plus efficacement pendant et après l'effort",
      ["Le système respiratoire : l'entraînement régulier remplace peu à peu les poumons par des muscles plus forts, donc la nageuse respire directement avec sa cage thoracique sans que ses poumons participent aux échanges",
       "Le système digestif : l'entraînement régulier de la natation accélère la digestion des repas, donc la nageuse récupère plus vite parce que ses aliments se transforment instantanément en énergie dès qu'elle les avale",
       "Le système excréteur : l'entraînement régulier rend la peau capable d'éliminer tout le dioxyde de carbone du corps, donc les poumons de la nageuse n'ont presque plus aucun échange gazeux à faire après la saison"],
      "Les facteurs peuvent aussi améliorer un système. L'exercice régulier renforce les muscles respiratoires et rend les échanges gazeux plus efficaces : le système respiratoire répond plus vite à la demande d'oxygène de l'effort et rétablit plus vite l'équilibre après l'effort, d'où la récupération raccourcie.",
      {});
  }
]), ["Nomme le système sur lequel le facteur agit d'abord, avant de juger les autres.", "Efficacité veut dire : le système accomplit son travail mieux, moins bien, ou au prix d'un effort accru."]);

E("s8f-u4-systemes-efficacite", 4, ["SC8.10.6"], 3, "var", varset([
  function () {
    return mcq("Après une maladie, le coeur d'une personne pompe le sang moins efficacement qu'avant : à chaque battement, il en envoie moins dans le corps. Quelle évaluation de l'effet sur l'ensemble du corps est la plus juste?",
      "Tout le corps en souffre : les muscles et le cerveau reçoivent moins d'oxygène et de nutriments par minute, donc la fatigue et l'essoufflement arrivent vite à l'effort, même si les poumons et les muscles eux-mêmes sont sains",
      ["Seul le coeur en souffre : les muscles et le cerveau reçoivent exactement autant d'oxygène et de nutriments qu'avant, parce que le sang restant dans les vaisseaux se déplace tout seul sans avoir besoin d'être pompé",
       "Tout le corps en profite : les muscles et le cerveau reçoivent le sang plus lentement, ce qui leur laisse plus de temps pour en extraire l'oxygène, donc l'endurance de la personne augmente nettement après sa maladie",
       "Rien ne change pour le corps : les poumons ajoutent tellement d'oxygène supplémentaire au sang que la quantité livrée aux cellules reste identique, quelle que soit la force avec laquelle le coeur pompe le sang"],
      "Le système circulatoire est le transporteur de tous les autres systèmes. S'il perd en efficacité, chaque cellule reçoit moins d'oxygène et de nutriments et se débarrasse plus lentement de ses déchets : l'effet est donc pour le corps entier, fatigue et essoufflement à l'effort, même avec des poumons et des muscles en bon état.",
      {});
  },
  function () {
    return mcq("Une infection laisse les voies respiratoires d'un élève enflées pendant des semaines, et ses échanges gazeux sont nettement moins efficaces qu'avant. Quelle évaluation de l'effet sur l'ensemble du corps est la plus juste?",
      "Le sang transporte moins d'oxygène vers toutes les cellules, donc l'élève se fatigue vite en éducation physique et peut même peiner à se concentrer en classe, bien que son coeur et ses muscles soient en bon état",
      ["Seuls les poumons en souffrent : le sang transporte exactement autant d'oxygène qu'avant vers les cellules, parce que le coeur pompe plus fort et fabrique lui-même l'oxygène qui manque aux échanges gazeux affaiblis",
       "Le corps entier en profite : avec moins d'oxygène chargé dans les poumons, les cellules ralentissent leur travail et économisent leur énergie, donc l'élève devient plus endurant qu'avant son infection des voies respiratoires",
       "Rien ne change pour le corps : le système digestif absorbe l'oxygène des aliments à la place des poumons pendant ces semaines, donc les cellules reçoivent leur oxygène habituel par la nourriture comme toujours"],
      "Les systèmes sont interdépendants : le circulatoire ne peut livrer que l'oxygène que le respiratoire a chargé. Des échanges gazeux moins efficaces signifient un sang moins oxygéné pour toutes les cellules, d'où une fatigue rapide à l'effort et une concentration réduite, malgré un coeur et des muscles sains.",
      {});
  },
  function () {
    return mcq("Un trouble intestinal réduit fortement la capacité d'une personne à absorber les nutriments de ses aliments, même si elle mange des repas complets et équilibrés. Quelle évaluation de l'effet sur l'ensemble du corps est la plus juste?",
      "Toutes les cellules reçoivent moins de nutriments que les repas devraient fournir, donc l'énergie baisse, la croissance et la réparation des tissus ralentissent, et la personne perd du poids malgré une alimentation suffisante",
      ["Seul l'intestin en souffre : les cellules du reste du corps reçoivent exactement les nutriments des repas, parce que les aliments traversent la paroi intestinale d'eux-mêmes sans qu'aucune absorption organisée soit nécessaire",
       "Le corps entier en profite : les nutriments non absorbés restent plus longtemps dans l'intestin, qui les distribue ensuite lentement aux cellules pendant des semaines, ce qui rend la personne plus énergique qu'avant son trouble",
       "Rien ne change pour le corps : les poumons absorbent les nutriments manquants à partir de l'air respiré, donc les cellules reçoivent par la respiration tout ce que l'intestin affaibli ne réussit plus à absorber des aliments"],
      "Manger ne suffit pas : encore faut-il absorber. Si le système digestif perd en efficacité, le sang a moins de nutriments à livrer, et chaque cellule du corps en reçoit moins. L'effet dépasse donc largement l'intestin : énergie, croissance, réparation et poids en témoignent, malgré des repas complets.",
      {});
  },
  function () {
    return mcq("Les reins d'une personne âgée filtrent le sang de moins en moins efficacement, et les déchets que ses cellules produisent s'éliminent de plus en plus lentement. Quelle évaluation de l'effet sur l'ensemble du corps est la plus juste?",
      "Les déchets s'accumulent peu à peu dans le sang et atteignent toutes les cellules, donc la personne se sent fatiguée et malade dans tout son corps, bien que le problème de départ se limite à un seul système d'élimination",
      ["Seuls les reins en souffrent : les déchets produits par les autres cellules restent enfermés dans les reins eux-mêmes, donc le reste du corps continue de fonctionner exactement comme avant, sans fatigue ni malaise général",
       "Le corps entier en profite : les déchets accumulés dans le sang servent de réserve de matériaux pour les cellules, qui les réutilisent pour construire de nouvelles structures, ce qui rend la personne plus forte avec le temps",
       "Rien ne change pour le corps : la peau et les poumons éliminent instantanément tous les déchets que les reins affaiblis laissent passer, donc le sang reste toujours aussi propre qu'avec des reins en parfait état de marche"],
      "Le système excréteur sert toutes les cellules : leurs déchets voyagent par le sang jusqu'aux reins. Si la filtration perd en efficacité, ces déchets restent dans le sang et rejoignent chaque cellule du corps. Un seul système affaibli produit donc un malaise général, preuve que l'efficacité d'un système soutient celle de l'organisme entier.",
      {});
  }
]), ["Suis ce que le système affaibli livre ou retire : qui d'autre en dépend?", "Un système moins efficace ne reste presque jamais un problème local : le sang relie toutes les cellules."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s8f-u1-abiotic":2,"s8f-u1-abiotic-identify":2,"s8f-u1-abiotic-measure-choice":3,"s8f-u1-aquaculture":3,"s8f-u1-basin-process":3,"s8f-u1-climat-effets-glaciers":3,"s8f-u1-climate-claim-judge":4,"s8f-u1-climate-current-effect":3,"s8f-u1-cr-abiotic":3,"s8f-u1-cr-bassin-versant":4,"s8f-u1-cr-coastal-climate":3,"s8f-u1-cr-cycle-role":3,"s8f-u1-cr-decision":4,"s8f-u1-cr-deplacement-aire":4,"s8f-u1-cr-design-salinity":4,"s8f-u1-cr-distribution-deplacement":3,"s8f-u1-cr-glacier":3,"s8f-u1-cr-headland":3,"s8f-u1-cr-indirect":3,"s8f-u1-cr-pond-data":3,"s8f-u1-cr-population":3,"s8f-u1-cr-protect":3,"s8f-u1-cr-results-summary":3,"s8f-u1-cr-tech-effects":3,"s8f-u1-cr-tides":3,"s8f-u1-cycle-process":2,"s8f-u1-distribution":2,"s8f-u1-distribution-abiotique":2,"s8f-u1-erosion-deposition":2,"s8f-u1-fog":3,"s8f-u1-formation-glaciers":2,"s8f-u1-fresh-env":2,"s8f-u1-fresh-sources":2,"s8f-u1-glaciation-role":3,"s8f-u1-glacier-retreat":3,"s8f-u1-headland-energy":3,"s8f-u1-health-figure":2,"s8f-u1-ice-age":2,"s8f-u1-iceberg":4,"s8f-u1-institutions":2,"s8f-u1-invasive":3,"s8f-u1-lab-extension":3,"s8f-u1-lab-procedure":2,"s8f-u1-landform-figure":2,"s8f-u1-landform-formation":3,"s8f-u1-method-choice":3,"s8f-u1-nino-nina":2,"s8f-u1-pop-extrapolate":2,"s8f-u1-pop-interpolate":2,"s8f-u1-process-evaluate":4,"s8f-u1-productivity":3,"s8f-u1-profile-figure":2,"s8f-u1-profile-order":2,"s8f-u1-protection":2,"s8f-u1-protection-choice":3,"s8f-u1-research-judge":4,"s8f-u1-research-landform":2,"s8f-u1-rock-resistance":2,"s8f-u1-sonar":2,"s8f-u1-species-category":2,"s8f-u1-sustain-aspects":2,"s8f-u1-tech":2,"s8f-u1-tech-change":3,"s8f-u1-tech-improve":2,"s8f-u1-tech-strength":3,"s8f-u1-temp-oxygen":3,"s8f-u1-temp-population":4,"s8f-u1-threshold-judge":3,"s8f-u1-tidal-range":2,"s8f-u1-tides":2,"s8f-u1-upwelling":2,"s8f-u1-wave-energy":2,"s8f-u1-wave-size":4,"s8f-u1-zones":2,"s8f-u2-archimedes":3,"s8f-u2-average-density":4,"s8f-u2-bargraph":4,"s8f-u2-buoyancy-rule":2,"s8f-u2-calc-area":3,"s8f-u2-calc-density":2,"s8f-u2-calc-force":2,"s8f-u2-calc-mass":2,"s8f-u2-calc-pressure":2,"s8f-u2-calc-volume":2,"s8f-u2-cleaning":3,"s8f-u2-compressible":2,"s8f-u2-concentration":3,"s8f-u2-cr-ballon":2,"s8f-u2-cr-car-lift":3,"s8f-u2-cr-cleaning-claim":4,"s8f-u2-cr-data-infer":3,"s8f-u2-cr-density-block":3,"s8f-u2-cr-design-viscosity":4,"s8f-u2-cr-displacement-calc":3,"s8f-u2-cr-layers":3,"s8f-u2-cr-mass-weight":3,"s8f-u2-cr-molasses":3,"s8f-u2-cr-piggyback":3,"s8f-u2-cr-pressure-crate":3,"s8f-u2-cr-raise-ship":3,"s8f-u2-cr-temp-situations":3,"s8f-u2-cr-underlying":3,"s8f-u2-cr-viscosite-experience":4,"s8f-u2-cr-viscosite-test":3,"s8f-u2-densite-quotidien":3,"s8f-u2-density-life":2,"s8f-u2-depth-pressure":3,"s8f-u2-disciplines":2,"s8f-u2-discrepancy-density":4,"s8f-u2-discrepancy-flow":3,"s8f-u2-displacement":2,"s8f-u2-displacement-calc":2,"s8f-u2-displacement-error":4,"s8f-u2-factors":2,"s8f-u2-flow-lab":2,"s8f-u2-flow-ranking":2,"s8f-u2-force-figure":3,"s8f-u2-forces":2,"s8f-u2-gas-laws":2,"s8f-u2-graph-choice":2,"s8f-u2-heating-honey":3,"s8f-u2-hot-air":2,"s8f-u2-identify-substance":3,"s8f-u2-instruments":2,"s8f-u2-lives":2,"s8f-u2-mass-weight":2,"s8f-u2-masse-poids-lieux":2,"s8f-u2-moon-suitcase":4,"s8f-u2-pascal":2,"s8f-u2-personal":2,"s8f-u2-products":2,"s8f-u2-question-problem":3,"s8f-u2-questions":2,"s8f-u2-ratio-constant":2,"s8f-u2-rephrase":2,"s8f-u2-seasoning":3,"s8f-u2-sk-calc-density":2,"s8f-u2-sk-calc-mass":2,"s8f-u2-sk-calc-volume":2,"s8f-u2-snowshoes":2,"s8f-u2-submarine":3,"s8f-u2-underlying":2,"s8f-u2-variables":3,"s8f-u2-viscosite-facteur":3,"s8f-u2-viscosity-compare":3,"s8f-u2-viscosity-def":2,"s8f-u2-viscosity-use":2,"s8f-u2-winter-oil":4,"s8f-u3-angle-calc":2,"s8f-u3-applications-question":3,"s8f-u3-coin-question":2,"s8f-u3-colour-seen":3,"s8f-u3-concave-spot":2,"s8f-u3-convex-spot":2,"s8f-u3-corning-siemens":3,"s8f-u3-cr-conclusion":3,"s8f-u3-cr-design-refraction":4,"s8f-u3-cr-diffuse":3,"s8f-u3-cr-em":3,"s8f-u3-cr-em-usages":4,"s8f-u3-cr-estimate":3,"s8f-u3-cr-fibre":4,"s8f-u3-cr-identify-medium":3,"s8f-u3-cr-image-miroir":4,"s8f-u3-cr-mirror-lab":3,"s8f-u3-cr-predict":3,"s8f-u3-cr-properties":3,"s8f-u3-cr-reflection":3,"s8f-u3-cr-reflexion-quotidien":2,"s8f-u3-cr-refraction":3,"s8f-u3-cr-refraction-bol":4,"s8f-u3-cr-refraction-expliquer":3,"s8f-u3-cr-refraction-lumiere":3,"s8f-u3-cr-refraction-paille":3,"s8f-u3-cr-research":3,"s8f-u3-cr-speed":3,"s8f-u3-cr-words":3,"s8f-u3-definitions":2,"s8f-u3-definitions-figure":3,"s8f-u3-delimit":3,"s8f-u3-early-tech":2,"s8f-u3-em-compare":3,"s8f-u3-em-detection":3,"s8f-u3-em-energy":2,"s8f-u3-em-order":2,"s8f-u3-estimate-bend":2,"s8f-u3-estimate-compare":3,"s8f-u3-estimate-incidence":2,"s8f-u3-estimate-reflect":2,"s8f-u3-fish-question":3,"s8f-u3-focal-judge":3,"s8f-u3-focal-procedure":3,"s8f-u3-freq-relation":3,"s8f-u3-harm-energy":2,"s8f-u3-history":2,"s8f-u3-individual-group":2,"s8f-u3-lateral":3,"s8f-u3-law":2,"s8f-u3-lens-key":2,"s8f-u3-lens-key-apply":3,"s8f-u3-lens-key-evidence":4,"s8f-u3-materials":2,"s8f-u3-mirror-key":2,"s8f-u3-mirror-key-apply":3,"s8f-u3-mirror-types":2,"s8f-u3-personal-optics":2,"s8f-u3-plane-spot":2,"s8f-u3-predict-media":3,"s8f-u3-properties":2,"s8f-u3-protractor":2,"s8f-u3-real-virtual":2,"s8f-u3-safety":2,"s8f-u3-spectrum-order":2,"s8f-u3-vacuum":2,"s8f-u3-vision":2,"s8f-u4-analogy":2,"s8f-u4-besoins-appliques":2,"s8f-u4-care":2,"s8f-u4-care-error":3,"s8f-u4-careers":2,"s8f-u4-careers-match":2,"s8f-u4-cell-figure":2,"s8f-u4-community-need":3,"s8f-u4-control":3,"s8f-u4-control-error":3,"s8f-u4-cr-artificial":4,"s8f-u4-cr-besoins-experience":3,"s8f-u4-cr-cell-division":3,"s8f-u4-cr-cellule-comparer":2,"s8f-u4-cr-cellule-vivante":2,"s8f-u4-cr-community":3,"s8f-u4-cr-decision":3,"s8f-u4-cr-decision-personal":3,"s8f-u4-cr-design-rates":4,"s8f-u4-cr-factors":3,"s8f-u4-cr-interdependence":3,"s8f-u4-cr-levels":3,"s8f-u4-cr-living":3,"s8f-u4-cr-microscope":3,"s8f-u4-cr-model-eval":3,"s8f-u4-cr-niveaux-appliquer":4,"s8f-u4-cr-organelles":3,"s8f-u4-cr-propose":3,"s8f-u4-cr-systemes-reponse":4,"s8f-u4-decision-sr":3,"s8f-u4-differences":2,"s8f-u4-division-count":2,"s8f-u4-dynamic":3,"s8f-u4-early-modern":3,"s8f-u4-estimate-compare":2,"s8f-u4-estimate-gen":2,"s8f-u4-estimate-scenario":2,"s8f-u4-example-level":2,"s8f-u4-factor-effect":3,"s8f-u4-factor-positive":2,"s8f-u4-focus-sequence":2,"s8f-u4-graph-choice":3,"s8f-u4-hypothesis":3,"s8f-u4-hypothesis-basis":2,"s8f-u4-identical":2,"s8f-u4-interdependence-why":4,"s8f-u4-knowledge-tech2":3,"s8f-u4-living-chars":2,"s8f-u4-micro-development":2,"s8f-u4-micro-parts":2,"s8f-u4-model-accuracy":3,"s8f-u4-needs":2,"s8f-u4-needs-apply":3,"s8f-u4-needs-system":3,"s8f-u4-niveaux-identifier":2,"s8f-u4-nonliving":2,"s8f-u4-order":2,"s8f-u4-organelle-figure":2,"s8f-u4-organelle-function":2,"s8f-u4-organelle-match":2,"s8f-u4-organelle-plant":2,"s8f-u4-organize":2,"s8f-u4-organize-avg":3,"s8f-u4-pair-circ-resp":2,"s8f-u4-pair-dig-circ":2,"s8f-u4-pair-nerv-musc":3,"s8f-u4-parts-action":2,"s8f-u4-personal-decision":3,"s8f-u4-propose-sr":3,"s8f-u4-protocol":2,"s8f-u4-rates-figure":2,"s8f-u4-recovery-figure":3,"s8f-u4-regular-shape":2,"s8f-u4-sedentary":3,"s8f-u4-tech-examples":2,"s8f-u4-tech-match":2,"s8f-u4-testable":3,"s8f-u4-testable2":2,"s8f-u4-vacuole-compare":3,"s8f-u4-variables":3};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={"s8f-u1-abiotic":"a","s8f-u1-abiotic-identify":"a","s8f-u1-abiotic-measure-choice":"b","s8f-u1-aquaculture":"b","s8f-u1-basin-process":"b","s8f-u1-climat-effets-glaciers":"b","s8f-u1-climate-claim-judge":"b","s8f-u1-climate-current-effect":"b","s8f-u1-cycle-process":"a","s8f-u1-distribution":"a","s8f-u1-distribution-abiotique":"a","s8f-u1-erosion-deposition":"a","s8f-u1-fog":"b","s8f-u1-formation-glaciers":"b","s8f-u1-fresh-env":"a","s8f-u1-fresh-sources":"a","s8f-u1-glaciation-role":"b","s8f-u1-glacier-retreat":"b","s8f-u1-headland-energy":"b","s8f-u1-health-figure":"a","s8f-u1-ice-age":"b","s8f-u1-iceberg":"b","s8f-u1-institutions":"a","s8f-u1-invasive":"b","s8f-u1-lab-extension":"b","s8f-u1-lab-procedure":"b","s8f-u1-landform-figure":"a","s8f-u1-landform-formation":"b","s8f-u1-method-choice":"b","s8f-u1-nino-nina":"a","s8f-u1-pop-extrapolate":"a","s8f-u1-pop-interpolate":"a","s8f-u1-process-evaluate":"b","s8f-u1-productivity":"b","s8f-u1-profile-figure":"a","s8f-u1-profile-order":"b","s8f-u1-protection":"a","s8f-u1-protection-choice":"b","s8f-u1-research-judge":"b","s8f-u1-research-landform":"b","s8f-u1-rock-resistance":"b","s8f-u1-sonar":"b","s8f-u1-species-category":"b","s8f-u1-sustain-aspects":"b","s8f-u1-tech":"a","s8f-u1-tech-change":"b","s8f-u1-tech-improve":"b","s8f-u1-tech-strength":"b","s8f-u1-temp-oxygen":"b","s8f-u1-temp-population":"b","s8f-u1-threshold-judge":"b","s8f-u1-tidal-range":"a","s8f-u1-tides":"a","s8f-u1-upwelling":"b","s8f-u1-wave-energy":"a","s8f-u1-wave-size":"b","s8f-u1-zones":"a","s8f-u2-archimedes":"b","s8f-u2-average-density":"b","s8f-u2-bargraph":"b","s8f-u2-buoyancy-rule":"b","s8f-u2-calc-area":"a","s8f-u2-calc-density":"a","s8f-u2-calc-force":"a","s8f-u2-calc-mass":"a","s8f-u2-calc-pressure":"a","s8f-u2-calc-volume":"a","s8f-u2-cleaning":"b","s8f-u2-compressible":"b","s8f-u2-concentration":"b","s8f-u2-densite-quotidien":"b","s8f-u2-density-life":"b","s8f-u2-depth-pressure":"b","s8f-u2-disciplines":"b","s8f-u2-discrepancy-density":"b","s8f-u2-discrepancy-flow":"b","s8f-u2-displacement":"b","s8f-u2-displacement-calc":"a","s8f-u2-displacement-error":"b","s8f-u2-factors":"a","s8f-u2-flow-lab":"a","s8f-u2-flow-ranking":"a","s8f-u2-force-figure":"b","s8f-u2-forces":"b","s8f-u2-gas-laws":"b","s8f-u2-graph-choice":"b","s8f-u2-heating-honey":"b","s8f-u2-hot-air":"b","s8f-u2-identify-substance":"a","s8f-u2-instruments":"b","s8f-u2-lives":"b","s8f-u2-mass-weight":"b","s8f-u2-masse-poids-lieux":"a","s8f-u2-moon-suitcase":"b","s8f-u2-pascal":"b","s8f-u2-personal":"b","s8f-u2-products":"b","s8f-u2-question-problem":"b","s8f-u2-questions":"b","s8f-u2-ratio-constant":"a","s8f-u2-rephrase":"b","s8f-u2-seasoning":"b","s8f-u2-sk-calc-density":"a","s8f-u2-sk-calc-mass":"a","s8f-u2-sk-calc-volume":"a","s8f-u2-snowshoes":"b","s8f-u2-submarine":"b","s8f-u2-underlying":"b","s8f-u2-variables":"b","s8f-u2-viscosite-facteur":"b","s8f-u2-viscosity-compare":"b","s8f-u2-viscosity-def":"b","s8f-u2-viscosity-use":"b","s8f-u2-winter-oil":"b","s8f-u3-angle-calc":"a","s8f-u3-applications-question":"b","s8f-u3-coin-question":"b","s8f-u3-colour-seen":"b","s8f-u3-concave-spot":"a","s8f-u3-convex-spot":"a","s8f-u3-corning-siemens":"b","s8f-u3-definitions":"a","s8f-u3-definitions-figure":"b","s8f-u3-delimit":"b","s8f-u3-early-tech":"b","s8f-u3-em-compare":"a","s8f-u3-em-detection":"b","s8f-u3-em-energy":"a","s8f-u3-em-order":"a","s8f-u3-estimate-bend":"a","s8f-u3-estimate-compare":"b","s8f-u3-estimate-incidence":"a","s8f-u3-estimate-reflect":"a","s8f-u3-fish-question":"b","s8f-u3-focal-judge":"b","s8f-u3-focal-procedure":"b","s8f-u3-freq-relation":"b","s8f-u3-harm-energy":"a","s8f-u3-history":"b","s8f-u3-individual-group":"b","s8f-u3-lateral":"b","s8f-u3-law":"b","s8f-u3-lens-key":"b","s8f-u3-lens-key-apply":"b","s8f-u3-lens-key-evidence":"b","s8f-u3-materials":"a","s8f-u3-mirror-key":"b","s8f-u3-mirror-key-apply":"b","s8f-u3-mirror-types":"b","s8f-u3-personal-optics":"b","s8f-u3-plane-spot":"a","s8f-u3-predict-media":"b","s8f-u3-properties":"a","s8f-u3-protractor":"b","s8f-u3-real-virtual":"b","s8f-u3-safety":"b","s8f-u3-spectrum-order":"a","s8f-u3-vacuum":"b","s8f-u3-vision":"a","s8f-u4-analogy":"a","s8f-u4-besoins-appliques":"a","s8f-u4-care":"b","s8f-u4-care-error":"b","s8f-u4-careers":"a","s8f-u4-careers-match":"b","s8f-u4-cell-figure":"a","s8f-u4-community-need":"b","s8f-u4-control":"b","s8f-u4-control-error":"b","s8f-u4-decision-sr":"b","s8f-u4-differences":"a","s8f-u4-division-count":"a","s8f-u4-dynamic":"b","s8f-u4-early-modern":"b","s8f-u4-estimate-compare":"b","s8f-u4-estimate-gen":"a","s8f-u4-estimate-scenario":"a","s8f-u4-example-level":"a","s8f-u4-factor-effect":"b","s8f-u4-factor-positive":"a","s8f-u4-focus-sequence":"b","s8f-u4-graph-choice":"b","s8f-u4-hypothesis":"b","s8f-u4-hypothesis-basis":"a","s8f-u4-identical":"a","s8f-u4-interdependence-why":"b","s8f-u4-knowledge-tech2":"b","s8f-u4-living-chars":"a","s8f-u4-micro-development":"b","s8f-u4-micro-parts":"a","s8f-u4-model-accuracy":"b","s8f-u4-needs":"a","s8f-u4-needs-apply":"b","s8f-u4-needs-system":"b","s8f-u4-niveaux-identifier":"a","s8f-u4-nonliving":"b","s8f-u4-order":"a","s8f-u4-organelle-figure":"a","s8f-u4-organelle-function":"b","s8f-u4-organelle-match":"a","s8f-u4-organelle-plant":"a","s8f-u4-organize":"b","s8f-u4-organize-avg":"b","s8f-u4-pair-circ-resp":"b","s8f-u4-pair-dig-circ":"a","s8f-u4-pair-nerv-musc":"b","s8f-u4-parts-action":"b","s8f-u4-personal-decision":"b","s8f-u4-propose-sr":"b","s8f-u4-protocol":"b","s8f-u4-rates-figure":"a","s8f-u4-recovery-figure":"a","s8f-u4-regular-shape":"a","s8f-u4-sedentary":"b","s8f-u4-tech-examples":"a","s8f-u4-tech-match":"b","s8f-u4-testable":"b","s8f-u4-testable2":"b","s8f-u4-vacuole-compare":"b","s8f-u4-variables":"b"};
/* ============ Level basis labels (generated) ============ */
/* Built by assemble-bank.py from the LEVELBASIS comments at each
   audited entry (November 25, 2026): the criterion that decided
   the entry's level under the adopted criteria card, shown in
   teacher mode beside the level on the question card. Entries
   no audit has covered have no label. */
window.__BANK_LEVELBASIS={};
