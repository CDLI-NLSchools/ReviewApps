/* Sciences 7 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-7-fr/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Sciences 7 (français) : générateurs de figures partagés, adaptés des générateurs anglais de sci-7 avec le préfixe s7f, Nov 16, 2026.
   Tout le texte dans les figures est en français; les noms d’organismes sont passés en données et traduits aux points d’appel.
   All figures are inline SVG (or one HTML panel for the key family),
   generated from each item's own values where the family is data
   driven, and drawn once as constants where the family is an
   illustration (pond scene, organization panels, nutrient cycle).
   No figure labels its own answer: callouts are numbers or letters
   only, and the keyed feature is always one of several plausible
   features. */

function s7fEsc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* F2: temperature tolerance curve. sp = {lo, optLo, optHi, hi, peak}
   Temperatures in degrees C on the x axis from lo-6 to hi+6. The
   curve is drawn smooth through failure, tolerance and optimum
   zones; the zones are NOT named on the figure. */
function s7fTolCurveSVG(sp) {
  var x0 = sp.lo - 6, x1 = sp.hi + 6, W = 560, H = 250, base = 205, top = 35;
  function X(t) { return 45 + (t - x0) / (x1 - x0) * (W - 70); }
  function Y(v) { return base - v * (base - top); }
  var pts = [];
  var t, v;
  for (t = sp.lo; t <= sp.hi; t += 1) {
    if (t < sp.optLo) v = 0.12 + 0.5 * (t - sp.lo) / (sp.optLo - sp.lo);
    else if (t <= sp.optHi) v = 0.92 + 0.06 * Math.sin((t - sp.optLo) / (sp.optHi - sp.optLo) * Math.PI);
    else v = 0.12 + 0.5 * (sp.hi - t) / (sp.hi - sp.optHi);
    pts.push(X(t).toFixed(1) + "," + Y(Math.min(v, 1)).toFixed(1));
  }
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:560px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"45\" y1=\"" + base + "\" x2=\"" + (W - 25) + "\" y2=\"" + base + "\" stroke=\"#666\"/>";
  s += "<line x1=\"45\" y1=\"" + base + "\" x2=\"45\" y2=\"20\" stroke=\"#666\"/>";
  s += "<polyline fill=\"none\" stroke=\"#1a7f4b\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  [sp.lo, sp.optLo, sp.optHi, sp.hi].forEach(function (tv) {
    s += "<line x1=\"" + X(tv) + "\" y1=\"" + base + "\" x2=\"" + X(tv) + "\" y2=\"" + (base + 5) + "\" stroke=\"#666\"/>";
    s += "<text x=\"" + X(tv) + "\" y=\"" + (base + 20) + "\" text-anchor=\"middle\">" + tv + "</text>";
  });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 2) + "\" text-anchor=\"middle\">Température (°C)</text>";
  s += "<text x=\"14\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 14 " + (H / 2) + ")\">Santé de la population</text>";
  s += "</svg>";
  return s;
}

/* F3: food chain boxes. arrows=true draws energy arrows between the
   boxes; arrows=false leaves the organisms unconnected. */
function s7fChainSVG(orgs, arrows) {
  var W = 620, H = 92, bw = 128, gap = (W - 4 * bw) / 3;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:620px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  orgs.forEach(function (o, i) {
    var x = i * (bw + gap);
    s += "<rect x=\"" + x + "\" y=\"26\" width=\"" + bw + "\" height=\"40\" rx=\"6\" fill=\"#eef6ee\" stroke=\"#1a7f4b\"/>";
    var words = o.split(" "), lines = [], cur = "";
    words.forEach(function (w) { if ((cur + " " + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
    lines.push(cur.trim());
    lines.forEach(function (ln, li) {
      s += "<text x=\"" + (x + bw / 2) + "\" y=\"" + (40 + li * 15) + "\" text-anchor=\"middle\">" + s7fEsc(ln) + "</text>";
    });
    if (arrows && i < orgs.length - 1) {
      var ax = x + bw + 3;
      s += "<line x1=\"" + ax + "\" y1=\"46\" x2=\"" + (ax + gap - 6) + "\" y2=\"46\" stroke=\"#333\" stroke-width=\"2\"/>";
      s += "<polygon points=\"" + (ax + gap - 6) + ",46 " + (ax + gap - 14) + ",41 " + (ax + gap - 14) + ",51\" fill=\"#333\"/>";
    }
  });
  s += "</svg>";
  return s;
}

/* F4: food web. nodes: [{n, x, y}] on a 640x400 canvas; links:
   [preyIndex, eaterIndex], arrows point in the direction of energy
   flow (toward the eater). Each node carries a letter badge. */
function s7fWebSVG(nodes, links) {
  var W = 640, H = 400;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<defs><marker id=\"s7fah\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 8,3 0,6\" fill=\"#555\"/></marker></defs>";
  links.forEach(function (lk) {
    var a = nodes[lk[0]], b = nodes[lk[1]];
    var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / len, uy = dy / len;
    s += "<line x1=\"" + (a.x + ux * 34) + "\" y1=\"" + (a.y + uy * 16) + "\" x2=\"" + (b.x - ux * 38) + "\" y2=\"" + (b.y - uy * 18) + "\" stroke=\"#888\" stroke-width=\"1.5\" marker-end=\"url(#s7fah)\"/>";
  });
  nodes.forEach(function (nd, i) {
    var label = String.fromCharCode(65 + i);
    var w = Math.max(64, nd.n.length * 7.4 + 14);
    s += "<rect x=\"" + (nd.x - w / 2) + "\" y=\"" + (nd.y - 15) + "\" width=\"" + w + "\" height=\"30\" rx=\"7\" fill=\"#fdfdf5\" stroke=\"#7a6a2f\"/>";
    s += "<text x=\"" + nd.x + "\" y=\"" + (nd.y + 4) + "\" text-anchor=\"middle\">" + s7fEsc(nd.n) + "</text>";
    s += "<circle cx=\"" + (nd.x - w / 2 + 2) + "\" cy=\"" + (nd.y - 15) + "\" r=\"9\" fill=\"#1a7f4b\"/>";
    s += "<text x=\"" + (nd.x - w / 2 + 2) + "\" y=\"" + (nd.y - 11) + "\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"11\" font-weight=\"bold\">" + label + "</text>";
  });
  s += "</svg>";
  return s;
}

/* F1: pond ecosystem scene (drawn once). Numbered callouts:
   1 sunlight warming the pond surface, 2 rain shower over the pond,
   3 bird nesting in the shoreline tree, 4 fish rising to an insect,
   5 cattail roots taking up water, 6 wind bending the reeds. */
var S7F_POND_SVG = "<svg viewBox=\"0 0 640 400\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#eaf4fb\"/>"
  + "<circle cx=\"90\" cy=\"55\" r=\"26\" fill=\"#f7c948\" stroke=\"#d9a41c\"/>"
  + "<g stroke=\"#f7c948\" stroke-width=\"3\"><line x1=\"90\" y1=\"12\" x2=\"90\" y2=\"24\"/><line x1=\"48\" y1=\"55\" x2=\"60\" y2=\"55\"/><line x1=\"120\" y1=\"55\" x2=\"132\" y2=\"55\"/><line x1=\"60\" y1=\"26\" x2=\"68\" y2=\"34\"/><line x1=\"112\" y1=\"34\" x2=\"120\" y2=\"26\"/></g>"
  + "<g stroke=\"#7fb2d9\" stroke-width=\"2\"><line x1=\"470\" y1=\"70\" x2=\"462\" y2=\"92\"/><line x1=\"500\" y1=\"66\" x2=\"492\" y2=\"88\"/><line x1=\"530\" y1=\"70\" x2=\"522\" y2=\"92\"/><line x1=\"560\" y1=\"66\" x2=\"552\" y2=\"88\"/></g>"
  + "<path d=\"M440 60 q30 -18 60 0 q30 -18 60 0 q-10 14 -30 12 q-30 10 -60 0 q-20 2 -30 -12\" fill=\"#cfdde8\"/>"
  + "<ellipse cx=\"330\" cy=\"300\" rx=\"270\" ry=\"80\" fill=\"#bfe0ea\" stroke=\"#6fa8bd\"/>"
  + "<path d=\"M0 240 L640 240 L640 400 L0 400 Z\" fill=\"#d9e8c9\" opacity=\"0.55\"/>"
  + "<rect x=\"52\" y=\"150\" width=\"14\" height=\"95\" fill=\"#8a6b45\"/>"
  + "<circle cx=\"59\" cy=\"128\" r=\"46\" fill=\"#7cb56b\"/>"
  + "<circle cx=\"30\" cy=\"148\" r=\"30\" fill=\"#8fc47e\"/><circle cx=\"90\" cy=\"146\" r=\"32\" fill=\"#8fc47e\"/>"
  + "<ellipse cx=\"82\" cy=\"112\" rx=\"13\" ry=\"8\" fill=\"#a9805a\"/>"
  + "<circle cx=\"96\" cy=\"102\" r=\"6\" fill=\"#4a90d9\"/><polygon points=\"102,102 112,104 102,107\" fill=\"#e08b2d\"/>"
  + "<path d=\"M300 292 q26 -16 52 0 q-26 12 -52 0\" fill=\"#e08b2d\"/><circle cx=\"342\" cy=\"288\" r=\"3\" fill=\"#333\"/>"
  + "<g stroke=\"#333\" stroke-width=\"1.6\"><line x1=\"238\" y1=\"262\" x2=\"252\" y2=\"252\"/><line x1=\"252\" y1=\"252\" x2=\"266\" y2=\"262\"/></g><circle cx=\"252\" cy=\"250\" r=\"3\" fill=\"#333\"/>"
  + "<g stroke=\"#3e7d3a\" stroke-width=\"3\"><path d=\"M520 330 q-4 -50 4 -84\" fill=\"none\"/><path d=\"M545 330 q2 -46 12 -78\" fill=\"none\"/><path d=\"M495 330 q-8 -44 -2 -76\" fill=\"none\"/></g>"
  + "<g stroke=\"#6b4a2a\" stroke-width=\"4\"><path d=\"M520 246 q2 -14 6 -20\" fill=\"none\"/><path d=\"M549 252 q4 -12 8 -18\" fill=\"none\"/></g>"
  + "<path d=\"M520 330 q0 22 -6 34 M545 330 q2 20 -2 32 M495 330 q-2 20 -8 30\" stroke=\"#7a5c36\" stroke-width=\"2\" fill=\"none\"/>"
  + "<g stroke=\"#9db8c6\" stroke-width=\"2\" fill=\"none\"><path d=\"M150 190 q40 -10 80 0\"/><path d=\"M170 205 q40 -10 80 0\"/></g>"
  + "<g font-weight=\"bold\" font-size=\"13\">"
  + "<circle cx=\"150\" cy=\"120\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"150\" y=\"125\" text-anchor=\"middle\">1</text>"
  + "<circle cx=\"585\" cy=\"110\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"585\" y=\"115\" text-anchor=\"middle\">2</text>"
  + "<circle cx=\"130\" cy=\"86\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"130\" y=\"91\" text-anchor=\"middle\">3</text>"
  + "<circle cx=\"205\" cy=\"300\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"205\" y=\"305\" text-anchor=\"middle\">4</text>"
  + "<circle cx=\"470\" cy=\"352\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"470\" y=\"357\" text-anchor=\"middle\">5</text>"
  + "<circle cx=\"590\" cy=\"270\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"590\" y=\"275\" text-anchor=\"middle\">6</text>"
  + "</g></svg>";

/* F5: general nutrient cycle (drawn once, redrawn from the guide's
   treatment). Arrows lettered: A soil to plants, B plants to animals,
   C organisms to decomposers, D decomposers to soil. Label placement:
   B sits on the horizontal shaft midway between the Plants box and
   the crossing; D sits beside the vertical shaft, midway between the
   crossing and the soil box, so the two labels never cluster at the
   crossing (fixed Nov 19, 2026). */
var S7F_NUTRIENT_SVG = "<svg viewBox=\"0 0 560 330\" width=\"100%\" style=\"max-width:560px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">"
  + "<defs><marker id=\"s7fna\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 8,3 0,6\" fill=\"#555\"/></marker></defs>"
  + "<rect x=\"200\" y=\"262\" width=\"160\" height=\"42\" rx=\"7\" fill=\"#efe3cb\" stroke=\"#8a6b45\"/><text x=\"280\" y=\"288\" text-anchor=\"middle\">Nutriments dans le sol</text>"
  + "<rect x=\"40\" y=\"130\" width=\"140\" height=\"42\" rx=\"7\" fill=\"#e2f0da\" stroke=\"#1a7f4b\"/><text x=\"110\" y=\"156\" text-anchor=\"middle\">Plantes</text>"
  + "<rect x=\"380\" y=\"130\" width=\"140\" height=\"42\" rx=\"7\" fill=\"#fdeeda\" stroke=\"#b06f28\"/><text x=\"450\" y=\"156\" text-anchor=\"middle\">Animaux</text>"
  + "<rect x=\"185\" y=\"18\" width=\"190\" height=\"42\" rx=\"7\" fill=\"#ece4f2\" stroke=\"#6a4a8a\"/><text x=\"280\" y=\"44\" text-anchor=\"middle\">Décomposeurs</text>"
  + "<path d=\"M215 262 Q110 235 108 178\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7fna)\"/>"
  + "<path d=\"M186 151 L374 151\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7fna)\"/>"
  + "<path d=\"M450 124 Q400 70 340 62 M110 124 Q160 70 220 62\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7fna)\"/>"
  + "<path d=\"M300 66 L292 256\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7fna)\"/>"
  + "<g font-weight=\"bold\"><circle cx=\"128\" cy=\"222\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"128\" y=\"227\" text-anchor=\"middle\">A</text>"
  + "<circle cx=\"240\" cy=\"151\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"240\" y=\"156\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"404\" cy=\"88\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"404\" y=\"93\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"316\" cy=\"206\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"316\" y=\"211\" text-anchor=\"middle\">D</text></g>"
  + "</svg>";

/* F6: organization panels (drawn once): one bog setting shown four
   ways. A one lynx, B a group of lynx, C lynx with hares and spruce,
   D the whole scene with pond, sun and soil. */
function s7fLynx(x, y, s) {
  return "<g transform=\"translate(" + x + "," + y + ") scale(" + s + ")\" fill=\"#8a6b45\">"
    + "<ellipse cx=\"0\" cy=\"0\" rx=\"17\" ry=\"9\"/><circle cx=\"19\" cy=\"-8\" r=\"7\"/>"
    + "<polygon points=\"15,-14 17,-21 20,-14\"/><polygon points=\"21,-14 24,-20 25,-13\"/>"
    + "<rect x=\"-13\" y=\"6\" width=\"4\" height=\"11\"/><rect x=\"9\" y=\"6\" width=\"4\" height=\"11\"/>"
    + "<path d=\"M-17 0 q-12 -3 -14 -12\" stroke=\"#8a6b45\" stroke-width=\"3\" fill=\"none\"/></g>";
}
var S7F_ORG_SVG = "<svg viewBox=\"0 0 640 210\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<g><rect x=\"5\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7fLynx(78, 100, 1.1) + "<text x=\"16\" y=\"32\" font-weight=\"bold\">A</text></g>"
  + "<g><rect x=\"165\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7fLynx(215, 82, 0.95) + s7fLynx(262, 118, 0.95) + s7fLynx(212, 140, 0.8) + "<text x=\"176\" y=\"32\" font-weight=\"bold\">B</text></g>"
  + "<g><rect x=\"325\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7fLynx(372, 120, 0.9)
  + "<ellipse cx=\"440\" cy=\"128\" rx=\"10\" ry=\"6\" fill=\"#cbb79a\"/><circle cx=\"450\" cy=\"122\" r=\"4.5\" fill=\"#cbb79a\"/>"
  + "<polygon points=\"405,60 417,28 429,60\" fill=\"#4d7c4d\"/><rect x=\"414\" y=\"60\" width=\"5\" height=\"12\" fill=\"#8a6b45\"/>"
  + "<text x=\"336\" y=\"32\" font-weight=\"bold\">C</text></g>"
  + "<g><rect x=\"485\" y=\"10\" width=\"150\" height=\"170\" fill=\"#eef6fb\" stroke=\"#999\"/>"
  + "<circle cx=\"600\" cy=\"42\" r=\"14\" fill=\"#f7c948\"/>" + s7fLynx(545, 108, 0.85)
  + "<ellipse cx=\"560\" cy=\"152\" rx=\"52\" ry=\"15\" fill=\"#bfe0ea\"/>"
  + "<polygon points=\"492,74 501,48 510,74\" fill=\"#4d7c4d\"/>"
  + "<path d=\"M485 166 L635 166 L635 180 L485 180 Z\" fill=\"#c9a877\"/>"
  + "<text x=\"496\" y=\"32\" font-weight=\"bold\">D</text></g>"
  + "</svg>";

/* F8: line graph of tree height over years, generated from the
   item's own data values. */
function s7fGrowthSVG(years, heights) {
  var W = 540, H = 270, base = 225, left = 52, right = W - 25, top = 25;
  var maxH = Math.max.apply(null, heights) * 1.15;
  function X(i) { return left + i / (years.length - 1) * (right - left); }
  function Y(v) { return base - v / maxH * (base - top); }
  var pts = heights.map(function (h, i) { return X(i).toFixed(1) + "," + Y(h).toFixed(1); });
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:540px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/>";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) {
    var gv = maxH * g / 4;
    s += "<line x1=\"" + left + "\" y1=\"" + Y(gv) + "\" x2=\"" + right + "\" y2=\"" + Y(gv) + "\" stroke=\"#ddd\"/>";
    s += "<text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + gv.toFixed(1) + "</text>";
  }
  s += "<polyline fill=\"none\" stroke=\"#1a7f4b\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  heights.forEach(function (h, i) {
    s += "<circle cx=\"" + X(i) + "\" cy=\"" + Y(h) + "\" r=\"3.5\" fill=\"#1a7f4b\"/>";
    s += "<text x=\"" + X(i) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + years[i] + "</text>";
  });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">Années depuis la récolte</text>";
  s += "<text x=\"14\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 14 " + (H / 2) + ")\">Hauteur moyenne des arbres (m)</text>";
  s += "</svg>";
  return s;
}

/* F9: succession stage panels. Stage art drawn once per stage;
   s7fSuccessionSVG composes the four stages in a given display
   order and letters the panels A to D in display order. */
function s7fStageArt(stage) {
  var g = "";
  if (stage === 0) {
    g = "<path d=\"M8 96 L142 96 L132 62 L96 52 L50 58 L20 74 Z\" fill=\"#b9b3a8\" stroke=\"#8d877c\"/>"
      + "<circle cx=\"52\" cy=\"70\" r=\"5\" fill=\"#a8bf7a\"/><circle cx=\"92\" cy=\"62\" r=\"4\" fill=\"#a8bf7a\"/><circle cx=\"118\" cy=\"76\" r=\"5\" fill=\"#93ad66\"/>";
  } else if (stage === 1) {
    g = "<path d=\"M5 98 L145 98 L145 104 L5 104 Z\" fill=\"#9c8a6d\"/>"
      + "<g stroke=\"#5d8a48\" stroke-width=\"2.5\" fill=\"none\"><path d=\"M30 98 q-3 -16 -8 -22\"/><path d=\"M34 98 q0 -18 4 -26\"/><path d=\"M70 98 q-3 -14 -9 -20\"/><path d=\"M74 98 q1 -16 6 -24\"/><path d=\"M112 98 q-3 -15 -8 -21\"/><path d=\"M116 98 q0 -17 5 -25\"/></g>"
      + "<circle cx=\"52\" cy=\"88\" r=\"6\" fill=\"#a8bf7a\"/><circle cx=\"96\" cy=\"90\" r=\"5\" fill=\"#a8bf7a\"/>";
  } else if (stage === 2) {
    g = "<path d=\"M5 98 L145 98 L145 104 L5 104 Z\" fill=\"#9c8a6d\"/>"
      + "<ellipse cx=\"38\" cy=\"72\" rx=\"20\" ry=\"14\" fill=\"#6da257\"/><ellipse cx=\"112\" cy=\"68\" rx=\"23\" ry=\"16\" fill=\"#639550\"/>"
      + "<polygon points=\"72,84 82,44 92,84\" fill=\"#7cb56b\"/><rect x=\"80\" y=\"84\" width=\"4\" height=\"14\" fill=\"#8a6b45\"/>"
      + "<g stroke=\"#5d8a48\" stroke-width=\"2\" fill=\"none\"><path d=\"M58 98 q-2 -10 -6 -14\"/><path d=\"M128 98 q0 -11 4 -16\"/></g>";
  } else {
    g = "<path d=\"M5 98 L145 98 L145 104 L5 104 Z\" fill=\"#8a7a5c\"/>"
      + "<polygon points=\"22,88 38,26 54,88\" fill=\"#3f7038\"/><polygon points=\"60,90 80,14 100,90\" fill=\"#356b30\"/><polygon points=\"102,88 118,30 134,88\" fill=\"#3f7038\"/>"
      + "<rect x=\"36\" y=\"88\" width=\"4\" height=\"12\" fill=\"#6e5133\"/><rect x=\"78\" y=\"90\" width=\"5\" height=\"12\" fill=\"#6e5133\"/><rect x=\"116\" y=\"88\" width=\"4\" height=\"12\" fill=\"#6e5133\"/>"
      + "<ellipse cx=\"48\" cy=\"94\" rx=\"12\" ry=\"5\" fill=\"#6da257\"/><ellipse cx=\"110\" cy=\"95\" rx=\"11\" ry=\"5\" fill=\"#639550\"/>";
  }
  return g;
}
function s7fSuccessionSVG(order) {
  var s = "<svg viewBox=\"0 0 640 130\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  order.forEach(function (stage, i) {
    var x = 5 + i * 160;
    s += "<g transform=\"translate(" + x + ",8)\"><rect x=\"0\" y=\"0\" width=\"150\" height=\"112\" fill=\"#f7faf3\" stroke=\"#999\"/>"
      + s7fStageArt(stage)
      + "<text x=\"8\" y=\"18\" font-weight=\"bold\">" + String.fromCharCode(65 + i) + "</text></g>";
  });
  s += "</svg>";
  return s;
}

/* F7: dichotomous key panel (HTML figure). keyLines: array of key
   couplets as text; specimens: array of short descriptions. */
function s7fKeyFigure(keyLines, specimens) {
  var h = "<div style=\"border:1px solid #999;border-radius:6px;padding:10px 14px;background:#fdfdf5;max-width:620px\">";
  h += "<b>Clé d'identification</b><br>" + keyLines.map(s7fEsc).join("<br>");
  h += "<br><br><b>Spécimens</b><br>" + specimens.map(function (sp, i) { return "<b>" + (i + 1) + ".</b> " + s7fEsc(sp); }).join("<br>");
  h += "</div>";
  return h;
}

/* ----- Unit 4 figure families (Earth's Crust, Nov 15, 2026) -----
   G1 layered Earth interior, G2 world distribution map, G3 mineral
   classification key panel, G4 rock cycle diagram, G5 soil drainage
   data display, G6 geological time strip. Same conventions as the
   Unit 1 families: no figure labels its own answer, and data-driven
   families are generated from each item's own values. */

/* G1: layered interior of the Earth, drawn once. Labels name the
   layers only (reference content, as in the nutrient cycle family);
   items ask about composition, state and thickness relations. */
function s7fEarthLayersSVG() {
  var cx = 130, cy = 130;
  var s = "<svg viewBox=\"0 0 460 260\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"118\" fill=\"#f3e2c7\" stroke=\"#8a6d3b\" stroke-width=\"2\"/>";
  s += "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"112\" fill=\"#e8a04c\"/>";
  s += "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"52\" fill=\"#d94f30\"/>";
  s += "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"22\" fill=\"#8f1d1d\"/>";
  function leader(r, ang, tx, label, sub) {
    var rad = ang * Math.PI / 180;
    var x1 = cx + r * Math.cos(rad), y1 = cy + r * Math.sin(rad);
    var x2 = cx + 128 * Math.cos(rad), y2 = cy + 128 * Math.sin(rad);
    s += "<line x1=\"" + x1.toFixed(1) + "\" y1=\"" + y1.toFixed(1) + "\" x2=\"" + x2.toFixed(1) + "\" y2=\"" + y2.toFixed(1) + "\" stroke=\"#555\" stroke-width=\"1\"/>";
    s += "<text x=\"" + tx + "\" y=\"" + y2.toFixed(1) + "\" font-weight=\"bold\">" + label + "</text>";
    if (sub) s += "<text x=\"" + tx + "\" y=\"" + (y2 + 15).toFixed(1) + "\" fill=\"#444\">" + sub + "</text>";
  }
  leader(115, -38, 268, "Croûte", "mince couche de roche solide");
  leader(82, -8, 268, "Manteau", "");
  leader(38, 28, 268, "Noyau externe", "");
  leader(10, 62, 268, "Noyau interne", "");
  s += "</svg>";
  return s;
}

/* G2: world distribution map, drawn once. Continent outlines are
   simplified coastlines placed from real longitude and latitude
   coordinates (equirectangular projection); the plotted earthquake
   and emplacement d’un volcans are real places. The pattern is the content:
   the points cluster along belts, they do not scatter evenly. */
function s7fWorldMapSVG() {
  var W = 660, H = 300;
  function X(lon) { return (lon + 180) / 360 * W; }
  function Y(lat) { return (84 - lat) / 144 * H; }
  var lands = [
    [[-168,66],[-158,71],[-142,70],[-130,70],[-118,69],[-106,68],[-97,69],[-92,69],[-88,66],[-86,62],[-90,58],[-94,56],[-93,52],[-88,51],[-82,50],[-79,51],[-77,54],[-79,58],[-82,62],[-77,62],[-72,62],[-68,58],[-65,60],[-64,58],[-60,55],[-56,52],[-59,49],[-64,47],[-65,44],[-69,44],[-70,42],[-73,40],[-75,38],[-76,35],[-79,33],[-81,31],[-81,26],[-80,22],[-82,24],[-84,29],[-87,30],[-90,29],[-94,29],[-97,27],[-97,23],[-95,19],[-92,19],[-90,21],[-88,21],[-86,16],[-83,15],[-80,9],[-78,8],[-80,9],[-84,11],[-87,13],[-91,14],[-95,16],[-98,17],[-103,19],[-106,22],[-109,24],[-111,27],[-114,30],[-117,33],[-121,35],[-123,38],[-124,43],[-125,48],[-129,51],[-132,54],[-135,57],[-141,60],[-149,60],[-154,58],[-160,56],[-164,59],[-166,61],[-168,66]],
    [[-53,47],[-53,49],[-56,50],[-59,48],[-57,47],[-54,46],[-53,47]],
    [[-45,60],[-42,62],[-38,65],[-32,68],[-24,70],[-19,74],[-24,78],[-36,80],[-50,79],[-57,76],[-57,72],[-54,68],[-53,64],[-51,61],[-45,60]],
    [[-78,8],[-75,10],[-72,12],[-68,11],[-62,10],[-56,6],[-51,4],[-50,0],[-44,-3],[-35,-8],[-38,-13],[-40,-20],[-42,-23],[-48,-27],[-52,-33],[-57,-38],[-62,-41],[-65,-45],[-67,-50],[-69,-52],[-68,-55],[-71,-54],[-73,-50],[-73,-43],[-73,-37],[-71,-31],[-70,-24],[-70,-18],[-74,-15],[-77,-12],[-80,-6],[-81,-3],[-80,1],[-77,4],[-78,8]],
    [[-9,37],[-9,43],[-2,44],[-1,46],[-4,48],[0,50],[4,52],[7,54],[8,57],[11,58],[14,56],[18,56],[21,59],[23,63],[25,66],[30,70],[40,68],[50,69],[62,69],[72,70],[82,71],[92,72],[102,73],[112,74],[122,73],[132,72],[142,72],[152,71],[162,70],[172,70],[179,66],[179,63],[171,60],[163,58],[159,52],[156,48],[151,45],[143,42],[141,39],[139,36],[135,34],[131,33],[127,30],[122,28],[120,25],[118,22],[110,20],[108,16],[107,12],[104,8],[101,6],[99,9],[97,14],[94,16],[91,22],[88,21],[85,19],[82,16],[80,13],[77,8],[74,13],[72,19],[70,22],[66,25],[61,25],[57,27],[52,28],[49,30],[48,30],[44,29],[40,31],[36,36],[31,36],[27,37],[26,39],[23,37],[21,39],[19,41],[14,43],[11,44],[8,44],[6,43],[3,42],[0,39],[-2,37],[-6,36],[-9,37]],
    [[-5,50],[-3,53],[-5,55],[-7,57],[-5,58],[-3,57],[-1,54],[-1,52],[1,51],[-3,50],[-5,50]],
    [[130,31],[132,33],[135,34],[137,35],[139,36],[140,38],[141,40],[141,42],[142,44],[143,45],[141,43],[140,40],[138,37],[136,35],[133,34],[131,32],[130,31]],
    [[-6,35],[-2,35],[3,37],[10,37],[11,34],[16,32],[22,33],[30,31],[32,31],[34,28],[36,24],[38,21],[39,18],[41,15],[43,12],[44,11],[48,11],[51,12],[50,14],[46,10],[42,4],[41,-1],[40,-6],[39,-11],[38,-16],[36,-21],[34,-26],[31,-29],[28,-33],[21,-35],[19,-34],[18,-31],[16,-27],[14,-21],[13,-15],[12,-9],[13,-4],[9,0],[9,4],[4,6],[-3,5],[-8,5],[-13,8],[-16,12],[-17,15],[-17,20],[-16,25],[-14,29],[-10,31],[-6,35]],
    [[44,-16],[47,-14],[49,-16],[50,-20],[47,-24],[45,-25],[44,-21],[43,-18],[44,-16]],
    [[95,5],[100,0],[104,-3],[106,-6],[103,-5],[99,0],[96,4],[95,5]],
    [[109,1],[113,4],[117,6],[119,2],[117,-2],[113,-3],[110,-2],[109,1]],
    [[106,-6],[110,-7],[114,-8],[114,-9],[108,-8],[106,-7],[106,-6]],
    [[131,-1],[136,-2],[141,-3],[146,-6],[150,-9],[147,-10],[142,-8],[137,-7],[132,-4],[131,-1]],
    [[114,-22],[113,-26],[115,-32],[117,-35],[121,-34],[126,-32],[131,-32],[135,-35],[137,-35],[139,-37],[142,-38],[146,-38],[149,-37],[151,-35],[153,-31],[153,-27],[151,-23],[149,-20],[146,-19],[144,-14],[142,-11],[142,-14],[141,-17],[139,-18],[136,-15],[135,-12],[132,-11],[129,-12],[126,-14],[122,-17],[118,-20],[114,-22]],
    [[167,-45],[170,-43],[172,-41],[174,-39],[176,-38],[175,-37],[173,-39],[171,-42],[169,-44],[167,-46],[167,-45]]
  ];
  var quakes = [[138,37],[95,3],[85,28],[30,39],[53,32],[70,29],[-70,-33],[-72,-13],[-121,36],[-150,61],[-102,18],[22,38],[119,-2],[-18,65],[159,56]];
  var volcs = [[-18,65],[14,41],[105,-6],[110,-7],[138,35],[121,13],[-156,20],[-68,-23],[-78,-1],[29,-1],[-28,39],[159,55],[-165,54],[-99,19],[115,-8],[-30,-2]];
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:660px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11\">";
  s += "<rect x=\"0\" y=\"0\" width=\"" + W + "\" height=\"" + H + "\" fill=\"#dceef7\"/>";
  lands.forEach(function (poly) {
    var pts = poly.map(function (p) { return X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); }).join(" ");
    s += "<polygon points=\"" + pts + "\" fill=\"#e9e2cd\" stroke=\"#8a8266\" stroke-width=\"1\"/>";
  });
  quakes.forEach(function (p) {
    s += "<circle cx=\"" + X(p[0]).toFixed(1) + "\" cy=\"" + Y(p[1]).toFixed(1) + "\" r=\"3.4\" fill=\"#c0392b\" fill-opacity=\"0.85\"/>";
  });
  volcs.forEach(function (p) {
    var x = X(p[0]), y = Y(p[1]);
    s += "<polygon points=\"" + x.toFixed(1) + "," + (y - 4.4).toFixed(1) + " " + (x - 4).toFixed(1) + "," + (y + 3.2).toFixed(1) + " " + (x + 4).toFixed(1) + "," + (y + 3.2).toFixed(1) + "\" fill=\"#e67e22\" stroke=\"#a3540d\" stroke-width=\"0.6\"/>";
  });
  s += "<rect x=\"10\" y=\"" + (H - 40) + "\" width=\"196\" height=\"32\" fill=\"#ffffff\" fill-opacity=\"0.9\" stroke=\"#999\"/>";
  s += "<circle cx=\"24\" cy=\"" + (H - 29) + "\" r=\"3.4\" fill=\"#c0392b\"/>";
  s += "<text x=\"34\" y=\"" + (H - 25) + "\">emplacement d’un séisme</text>";
  s += "<polygon points=\"24," + (H - 19) + " 20," + (H - 12) + " 28," + (H - 12) + "\" fill=\"#e67e22\" stroke=\"#a3540d\" stroke-width=\"0.6\"/>";
  s += "<text x=\"34\" y=\"" + (H - 11) + "\">emplacement d’un volcan</text>";
  s += "</svg>";
  return s;
}

/* G3: mineral classification key panel. The key is a constant (it is
   the key from the guide's mineral study, written for the bank); the
   specimen property rows are supplied per item. The panel never
   names a specimen's identity: the student works the key. */
var S7F_MINERAL_KEY_LINES = [
  "1a. Le minéral est attiré par un aimant ... magnétite",
  "1b. Le minéral n\u2019est pas attiré par un aimant ... aller à 2",
  "2a. Le minéral laisse une trace rouge-brun ... hématite",
  "2b. La trace n\u2019est pas rouge-brun ... aller à 3",
  "3a. Le minéral se brise en morceaux en forme de cube et semble très lourd pour sa taille ... galène",
  "3b. Il ne se brise pas en cubes ... aller à 4",
  "4a. Le minéral se sépare en feuilles minces et souples ... mica",
  "4b. Il ne se sépare pas en feuilles ... aller à 5",
  "5a. Un ongle raye le minéral ... aller à 6",
  "5b. Un ongle ne raye pas le minéral ... aller à 8",
  "6a. Le minéral semble graisseux et marque facilement le papier ... graphite",
  "6b. Il ne marque pas le papier ... aller à 7",
  "7a. Le minéral semble savonneux ou graisseux et il est blanc nacré ... talc",
  "7b. Soyeux ou nacré, blanc ou transparent, et non graisseux ... gypse",
  "8a. Le minéral pétille (fait des bulles) quand on y dépose un acide faible ... calcite",
  "8b. Il ne pétille pas dans l\u2019acide ... aller à 9",
  "9a. Couleur jaune laiton avec un éclat métallique ... pyrite",
  "9b. Pas jaune laiton ... aller à 10",
  "10a. Éclat vitreux, aucun clivage, se brise avec une cassure en forme de coquille, dureté 7 ... quartz",
  "10b. Clivage dans deux directions, éclat nacré à vitreux, dureté 6 ... feldspath"
];
function s7fMineralKeyFigure(specimens) {
  return s7fKeyFigure(S7F_MINERAL_KEY_LINES, specimens);
}

/* G4: rock cycle diagram, drawn once. Boxes name the three rock
   families and magma; arrows are labelled with the processes. The
   guide's own example path (sedimentary to igneous only by way of
   metamorphic rock and melting) is a labelled route through the
   diagram, not an answer key. */
function s7fRockCycleSVG() {
  var s = "<svg viewBox=\"0 0 600 330\" width=\"100%\" style=\"max-width:600px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<defs><marker id=\"s7frcA\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#555\"/></marker></defs>";
  function box(x, y, w, label, fill) {
    s += "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"36\" rx=\"6\" fill=\"" + fill + "\" stroke=\"#555\"/>";
    s += "<text x=\"" + (x + w / 2) + "\" y=\"" + (y + 22) + "\" text-anchor=\"middle\" font-weight=\"bold\">" + label + "</text>";
  }
  function arrow(x1, y1, x2, y2, tx, ty, label, anchor) {
    s += "<line x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 + "\" y2=\"" + y2 + "\" stroke=\"#555\" stroke-width=\"1.6\" marker-end=\"url(#s7frcA)\"/>";
    s += "<text x=\"" + tx + "\" y=\"" + ty + "\" text-anchor=\"" + (anchor || "middle") + "\" fill=\"#333\">" + label + "</text>";
  }
  box(240, 12, 120, "Magma", "#f6c9a0");
  box(452, 92, 128, "Roche ignée", "#d9d9d9");
  box(420, 238, 150, "Sédiments", "#efe3b0");
  box(196, 268, 168, "Roche sédimentaire", "#cfe0ef");
  box(20, 92, 150, "Roche métamorphique", "#d8cdea");
  arrow(362, 40, 470, 88, 448, 52, "refroidissement", "middle");
  arrow(512, 130, 500, 232, 522, 186, "altération", "start");
  arrow(512, 196, 500, 232, 522, 204, "et érosion", "start");
  arrow(418, 262, 368, 278, 392, 254, "compaction et", "middle");
  arrow(418, 274, 368, 284, 392, 300, "cimentation", "middle");
  arrow(196, 268, 150, 132, 128, 208, "chaleur et", "middle");
  arrow(196, 268, 158, 132, 128, 222, "pression", "middle");
  arrow(150, 92, 268, 46, 196, 58, "fusion", "middle");
  arrow(452, 110, 172, 110, 312, 100, "chaleur et pression", "middle");
  arrow(300, 268, 300, 52, 312, 168, "fusion", "start");
  s += "</svg>";
  return s;
}

/* G5: soil drainage data display, data driven. samples is a list of
   {name, secs}: the time for 25 mL of water to drain through each
   sample, drawn as horizontal bars. The display shows the data; the
   item asks for the relationship. */
function s7fDrainSVG(samples) {
  var max = 0;
  samples.forEach(function (sm) { if (sm.secs > max) max = sm.secs; });
  var W = 520, rowH = 34, top = 30, H = top + samples.length * rowH + 26;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:520px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<text x=\"150\" y=\"18\" font-weight=\"bold\">Temps nécessaire pour que 25 mL d’eau traversent chaque échantillon de sol</text>";
  samples.forEach(function (sm, i) {
    var y = top + i * rowH;
    var w = Math.max(4, sm.secs / max * 300);
    s += "<text x=\"142\" y=\"" + (y + 17) + "\" text-anchor=\"end\">" + s7fEsc(sm.name) + "</text>";
    s += "<rect x=\"150\" y=\"" + (y + 3) + "\" width=\"" + w.toFixed(1) + "\" height=\"20\" fill=\"#7fb069\" stroke=\"#4c7a3f\"/>";
    s += "<text x=\"" + (158 + w).toFixed(1) + "\" y=\"" + (y + 17) + "\">" + sm.secs + " s</text>";
  });
  s += "</svg>";
  return s;
}

/* G6: geological time strip, drawn once, era blocks to proportional
   length on a 4.6 billion year line (Precambrian about 87 percent of
   Earth's history). Labels give each era's name and the major events
   the guide names; the proportions are the content. */
function s7fTimeStripSVG() {
  var W = 640, x0 = 30, x1 = 610, y = 58, h = 44;
  var eras = [
    { name: "Précambrien", yrs: 4000, fill: "#b08968", ev: "premières formes de vie" },
    { name: "Paléozoïque", yrs: 290, fill: "#7fb069", ev: "premiers poissons; premières forêts" },
    { name: "Mésozoïque", yrs: 185, fill: "#e0a458", ev: "premiers mammifères; premières plantes à fleurs" },
    { name: "Cénozoïque", yrs: 66, fill: "#5b8e7d", ev: "premiers humains" }
  ];
  var total = 4541, x = x0;
  var s = "<svg viewBox=\"0 0 " + W + " 190\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<text x=\"" + x0 + "\" y=\"24\" font-weight=\"bold\">Le temps géologique : 4,6 milliards d’années d’histoire de la Terre, à l’échelle</text>";
  s += "<text x=\"" + x0 + "\" y=\"44\">il y a 4,6 milliards d’années</text>";
  s += "<text x=\"" + x1 + "\" y=\"44\" text-anchor=\"end\">aujourd’hui</text>";
  eras.forEach(function (e, i) {
    var w = e.yrs / total * (x1 - x0);
    s += "<rect x=\"" + x.toFixed(1) + "\" y=\"" + y + "\" width=\"" + Math.max(w, 3).toFixed(1) + "\" height=\"" + h + "\" fill=\"" + e.fill + "\" stroke=\"#555\"/>";
    if (i < 2) {
      s += "<text x=\"" + (x + w / 2).toFixed(1) + "\" y=\"" + (y + 26) + "\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#fff\">" + e.name + "</text>";
      s += "<text x=\"" + (x + w / 2).toFixed(1) + "\" y=\"" + (y + h + 20) + "\" text-anchor=\"middle\">" + e.ev + "</text>";
    } else {
      var lx = x + w + 6;
      s += "<line x1=\"" + (x + w / 2).toFixed(1) + "\" y1=\"" + (y + h) + "\" x2=\"" + (x + w / 2).toFixed(1) + "\" y2=\"" + (y + h + 12) + "\" stroke=\"#555\"/>";
      s += "<text x=\"" + Math.min(lx, W - 190) + "\" y=\"" + (y + h + 26 + (i - 2) * 18) + "\" font-weight=\"bold\">" + e.name + ": <tspan font-weight=\"normal\">" + e.ev + "</tspan></text>";
    }
    x += w;
  });
  s += "</svg>";
  return s;
}

/* ================= Unit 2 (Heat) figure families =================
   H1: heating curve, drawn from the item's own plateau values.
   H2: particle panel for the three states at two temperatures, drawn once.
   H3: specific heat bar display, drawn from the item's own values.
   H4: two-line temperature graph for the absorption investigation. */

// H1: temperature-time heating curve. melt and boil are the plateau
// temperatures; tEnd the final time; yMax the top of the temperature axis.
function s7fHeatingCurveSVG(melt, boil, tEnd, yMax) {
  var W = 460, H = 300, x0 = 62, x1 = 428, y0 = 252, y1 = 34;
  function X(t) { return (x0 + (x1 - x0) * t / tEnd).toFixed(1); }
  function Y(v) { return (y0 - (y0 - y1) * v / yMax).toFixed(1); }
  var start = Math.max(0, melt - 18);
  var t1 = tEnd * 0.22, t2 = tEnd * 0.46, t3 = tEnd * 0.72;
  var pts = X(0) + "," + Y(start) + " " + X(t1) + "," + Y(melt) + " " + X(t2) + "," + Y(melt) +
    " " + X(t3) + "," + Y(boil) + " " + X(tEnd) + "," + Y(boil);
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="300" role="img" aria-label="Heating curve graph" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#33424e" stroke-width="1.5"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#33424e" stroke-width="1.5"/>';
  [melt, boil].forEach(function (v) {
    s += '<line x1="' + x0 + '" y1="' + Y(v) + '" x2="' + x1 + '" y2="' + Y(v) + '" stroke="#c9d4da" stroke-width="1" stroke-dasharray="4 3"/>';
    s += '<text x="' + (x0 - 8) + '" y="' + (Y(v) + 4) + '" font-size="12" text-anchor="end" fill="#1c2b33">' + v + '</text>';
  });
  s += '<text x="' + (x0 - 8) + '" y="' + (y0 + 4) + '" font-size="12" text-anchor="end" fill="#1c2b33">0</text>';
  for (var tt = 0; tt <= tEnd; tt += 5) {
    s += '<text x="' + X(tt) + '" y="' + (y0 + 18) + '" font-size="11" text-anchor="middle" fill="#1c2b33">' + tt + '</text>';
  }
  s += '<polyline points="' + pts + '" fill="none" stroke="#b3541e" stroke-width="2.5"/>';
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Temps (min)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Température (°C)</text>';
  s += '</svg>';
  return s;
}

// H2: the three states at two temperatures. Dots are particle positions;
// arrow length stands for particle speed. Drawn once as a constant.
function s7fParticlePanelSVG() {
  function box(x, y, label, kind, warm) {
    var s = '<rect x="' + x + '" y="' + y + '" width="118" height="86" fill="#f4f7fb" stroke="#33424e" stroke-width="1.2"/>';
    s += '<text x="' + (x + 59) + '" y="' + (y + 100) + '" font-size="12" text-anchor="middle" fill="#1c2b33">' + label + '</text>';
    var pts = [];
    var r, c;
    if (kind === "solid") {
      for (r = 0; r < 3; r++) for (c = 0; c < 4; c++) pts.push([x + 22 + c * 25, y + 22 + r * 20]);
    } else if (kind === "liquid") {
      var lp = [[20, 58], [42, 64], [64, 56], [86, 62], [30, 38], [56, 42], [80, 36], [98, 52], [46, 24], [72, 22]];
      lp.forEach(function (p) { pts.push([x + p[0], y + p[1]]); });
    } else {
      var gp = [[16, 16], [58, 12], [100, 20], [34, 44], [82, 48], [14, 70], [104, 68], [60, 66]];
      gp.forEach(function (p) { pts.push([x + p[0], y + p[1]]); });
    }
    var alen = warm ? 13 : 6;
    pts.forEach(function (p, i) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#2e6f8e"/>';
      var dx = (i % 2 === 0) ? alen : -alen, dy = (i % 3 === 0) ? alen * 0.5 : -alen * 0.4;
      s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + (p[0] + dx) + '" y2="' + (p[1] + dy) + '" stroke="#b3541e" stroke-width="1.4"/>';
    });
    return s;
  }
  var s = '<svg viewBox="0 0 460 250" width="460" height="250" role="img" aria-label="Particles in the three states of matter at two temperatures" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="460" height="250" fill="#ffffff"/>';
  s += '<text x="8" y="52" font-size="12" fill="#1c2b33">Cooler</text>';
  s += '<text x="8" y="168" font-size="12" fill="#1c2b33">Warmer</text>';
  s += box(70, 14, "Solide", "solid", false) + box(206, 14, "Liquide", "liquid", false) + box(342, 14, "Gaz", "gas", false);
  s += box(70, 130, "Solide", "solid", true) + box(206, 130, "Liquide", "liquid", true) + box(342, 130, "Gaz", "gas", true);
  s += '</svg>';
  return s;
}

// H3: horizontal bars of temperature rise for equal masses given equal energy.
function s7fSHCBarsSVG(rows) {
  var W = 460, rowH = 34, top = 26, H = top + rows.length * rowH + 34;
  var maxV = 0; rows.forEach(function (r) { if (r.rise > maxV) maxV = r.rise; });
  var x0 = 118, x1 = 420;
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="' + H + '" role="img" aria-label="Temperature rise of equal masses given equal energy" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  rows.forEach(function (r, i) {
    var y = top + i * rowH;
    var wdt = (x1 - x0) * r.rise / maxV;
    s += '<text x="' + (x0 - 8) + '" y="' + (y + 17) + '" font-size="12" text-anchor="end" fill="#1c2b33">' + r.name + '</text>';
    s += '<rect x="' + x0 + '" y="' + y + '" width="' + wdt.toFixed(1) + '" height="20" fill="#2e6f8e"/>';
    s += '<text x="' + (x0 + wdt + 8) + '" y="' + (y + 15) + '" font-size="12" fill="#1c2b33">' + r.rise + ' °C</text>';
  });
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Hausse de température (°C)</text>';
  s += '</svg>';
  return s;
}

// H4: two temperature lines over time for the dark and light cans.
function s7fAbsorbGraphSVG(times, dark, light) {
  var W = 460, H = 290, x0 = 62, x1 = 428, y0 = 240, y1 = 30;
  var tMax = times[times.length - 1];
  var vMax = 0; dark.concat(light).forEach(function (v) { if (v > vMax) vMax = v; });
  vMax = Math.ceil(vMax / 10) * 10;
  function X(t) { return (x0 + (x1 - x0) * t / tMax).toFixed(1); }
  function Y(v) { return (y0 - (y0 - y1) * v / vMax).toFixed(1); }
  function line(vals, color) {
    var pts = vals.map(function (v, i) { return X(times[i]) + "," + Y(v); }).join(" ");
    var out = '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2.5"/>';
    vals.forEach(function (v, i) { out += '<circle cx="' + X(times[i]) + '" cy="' + Y(v) + '" r="3.5" fill="' + color + '"/>'; });
    return out;
  }
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="290" role="img" aria-label="Temperature of two cans under a lamp over time" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#33424e" stroke-width="1.5"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#33424e" stroke-width="1.5"/>';
  for (var v = 0; v <= vMax; v += 10) {
    s += '<text x="' + (x0 - 8) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="#1c2b33">' + v + '</text>';
    s += '<line x1="' + x0 + '" y1="' + Y(v) + '" x2="' + x1 + '" y2="' + Y(v) + '" stroke="#e3eaee" stroke-width="1"/>';
  }
  times.forEach(function (t) {
    s += '<text x="' + X(t) + '" y="' + (y0 + 18) + '" font-size="11" text-anchor="middle" fill="#1c2b33">' + t + '</text>';
  });
  s += line(dark, "#26343d") + line(light, "#b3541e");
  s += '<rect x="' + (x1 - 128) + '" y="' + (y1 + 4) + '" width="124" height="40" fill="#ffffff" stroke="#c9d4da"/>';
  s += '<line x1="' + (x1 - 120) + '" y1="' + (y1 + 16) + '" x2="' + (x1 - 96) + '" y2="' + (y1 + 16) + '" stroke="#26343d" stroke-width="2.5"/>';
  s += '<text x="' + (x1 - 90) + '" y="' + (y1 + 20) + '" font-size="11" fill="#1c2b33">Boîte foncée</text>';
  s += '<line x1="' + (x1 - 120) + '" y1="' + (y1 + 34) + '" x2="' + (x1 - 96) + '" y2="' + (y1 + 34) + '" stroke="#b3541e" stroke-width="2.5"/>';
  s += '<text x="' + (x1 - 90) + '" y="' + (y1 + 38) + '" font-size="11" fill="#1c2b33">Boîte claire</text>';
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 4) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Temps (min)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Température (°C)</text>';
  s += '</svg>';
  return s;
}

/* ================= Unit 3 (Mixtures and Solutions) figure families ====
   M1: solubility curves with lines of best fit, from the item's data.
   M2: particle panel, pure substance against mixtures, drawn once.
   M3: concentration vessels with stated amounts, from the item's data. */

// M1: solubility (g per 100 mL of water) against temperature for two
// solutes. Points are plotted; the line drawn is the least-squares line
// of best fit through each solute's points.
function s7fSolubilitySVG(series, yMax) {
  var W = 460, H = 300, x0 = 62, x1 = 428, y0 = 252, y1 = 34;
  function X(t) { return (x0 + (x1 - x0) * t / 100).toFixed(1); }
  function Y(v) { return (y0 - (y0 - y1) * v / yMax).toFixed(1); }
  function fit(pts) {
    var n = pts.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
    pts.forEach(function (p) { sx += p[0]; sy += p[1]; sxx += p[0] * p[0]; sxy += p[0] * p[1]; });
    var m = (n * sxy - sx * sy) / (n * sxx - sx * sx), b = (sy - m * sx) / n;
    return [m, b];
  }
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="300" role="img" aria-label="Solubility curves for two solutes" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#33424e" stroke-width="1.5"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#33424e" stroke-width="1.5"/>';
  for (var v = 0; v <= yMax; v += 20) {
    s += '<text x="' + (x0 - 8) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="#1c2b33">' + v + '</text>';
    s += '<line x1="' + x0 + '" y1="' + Y(v) + '" x2="' + x1 + '" y2="' + Y(v) + '" stroke="#e3eaee" stroke-width="1"/>';
  }
  for (var t = 0; t <= 100; t += 20) {
    s += '<text x="' + X(t) + '" y="' + (y0 + 18) + '" font-size="11" text-anchor="middle" fill="#1c2b33">' + t + '</text>';
  }
  series.forEach(function (sr) {
    var fb = fit(sr.pts), m = fb[0], b = fb[1];
    var ta = Math.max(0, sr.pts[0][0] - 4), tb = Math.min(100, sr.pts[sr.pts.length - 1][0] + 10);
    s += '<line x1="' + X(ta) + '" y1="' + Y(m * ta + b) + '" x2="' + X(tb) + '" y2="' + Y(m * tb + b) + '" stroke="' + sr.color + '" stroke-width="2.2"/>';
    sr.pts.forEach(function (p) { s += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="3.5" fill="' + sr.color + '"/>'; });
  });
  var lx = x1 - 150, ly = y1 + 4;
  s += '<rect x="' + lx + '" y="' + ly + '" width="146" height="' + (series.length * 18 + 8) + '" fill="#ffffff" stroke="#c9d4da"/>';
  series.forEach(function (sr, i) {
    s += '<line x1="' + (lx + 8) + '" y1="' + (ly + 13 + i * 18) + '" x2="' + (lx + 32) + '" y2="' + (ly + 13 + i * 18) + '" stroke="' + sr.color + '" stroke-width="2.5"/>';
    s += '<text x="' + (lx + 38) + '" y="' + (ly + 17 + i * 18) + '" font-size="11" fill="#1c2b33">' + sr.name + '</text>';
  });
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Température (°C)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Solubilité (g par 100 mL d’eau)</text>';
  s += '</svg>';
  return s;
}

// M2: three containers of particles. Container 1: one kind throughout.
// Container 2: two kinds mixed evenly. Container 3: two kinds in layers.
function s7fMixturePanelSVG() {
  function container(x, label, kind) {
    var s = '<rect x="' + x + '" y="30" width="118" height="120" fill="#f4f7fb" stroke="#33424e" stroke-width="1.2"/>';
    s += '<text x="' + (x + 59) + '" y="172" font-size="12" text-anchor="middle" fill="#1c2b33">' + label + '</text>';
    var pts = [];
    for (var r = 0; r < 5; r++) for (var c = 0; c < 4; c++) pts.push([x + 20 + c * 26 + (r % 2) * 6, 52 + r * 20]);
    pts.forEach(function (p, i) {
      var fill = "#2e6f8e";
      if (kind === "mixed") fill = (i % 2 === 0) ? "#2e6f8e" : "#b3541e";
      if (kind === "layered") fill = (p[1] < 100) ? "#2e6f8e" : "#b3541e";
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + fill + '"/>';
    });
    return s;
  }
  var s = '<svg viewBox="0 0 460 190" width="460" height="190" role="img" aria-label="Particles in three containers" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="460" height="190" fill="#ffffff"/>';
  s += container(28, "Récipient 1", "pure") + container(171, "Récipient 2", "mixed") + container(314, "Récipient 3", "layered");
  s += '</svg>';
  return s;
}

// M3: vessels with stated amounts of solute and water.
function s7fConcentrationSVG(vessels) {
  var W = 460, H = 210;
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="210" role="img" aria-label="Three vessels with stated amounts of solute and water" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  vessels.forEach(function (v, i) {
    var x = 36 + i * 148;
    var fillH = 20 + 70 * (v.vol / 200);
    s += '<path d="M ' + x + ' 30 L ' + (x + 14) + ' ' + (30 + 110) + ' L ' + (x + 86) + ' ' + (30 + 110) + ' L ' + (x + 100) + ' 30" fill="none" stroke="#33424e" stroke-width="1.6"/>';
    s += '<rect x="' + (x + 8) + '" y="' + (140 - fillH) + '" width="84" height="' + fillH + '" fill="#bcd6e4" opacity="0.75"/>';
    s += '<text x="' + (x + 50) + '" y="162" font-size="12" text-anchor="middle" fill="#1c2b33">' + v.label + '</text>';
    s += '<text x="' + (x + 50) + '" y="182" font-size="11" text-anchor="middle" fill="#1c2b33">' + v.solute + ' g dans ' + v.vol + ' mL</text>';
  });
  s += '</svg>';
  return s;
}

/* ----- bank-u1.js ----- */
// CRMARKS: s7f-u1-cr-factor-effect=2
// CRMARKS: s7f-u1-cr-three-interactions=3
// CRMARKS: s7f-u1-cr-web-change=3
// CRMARKS: s7f-u1-cr-energy-flow=3
// CRMARKS: s7f-u1-cr-recycling=2
// CRMARKS: s7f-u1-cr-succession-compare=2
// CRMARKS: s7f-u1-cr-web-interpret=3
// CRMARKS: s7f-u1-cr-silviculture=2
// CRMARKS: s7f-u1-cr-harvest-decision=3
// CRMARKS: s7f-u1-cr-boreal-example=3
// CRMARKS: s7f-u1-cr-habitat-defence=3
// CRMARKS: s7f-u1-cr-design-experiment=4
// CRMARKS: s7f-u1-cr-data-display=3
// CRMARKS: s7f-u1-cr-defend-position=3
// CRMARKS: s7f-u1-cr-succession-stages=2
// CRMARKS: s7f-u1-cr-succession-signs=3
// Sciences 7, Unité 1 : Les interactions au sein des écosystèmes
// (SC7.1.1 à SC7.3.13), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Honnêteté de couverture : SC7.3.5 (Travailler en collaboration avec des
// membres d'une équipe) est NONE pour ce format et ne porte aucune question,
// par choix, selon le précédent de l'indicateur anglais correspondant.
// Résidu CORE : les questions de SC7.3.3 évaluent le choix d'instruments, le
// format de consignation et le jugement sur un plan de consignation; elles
// n'évaluent pas la prise de mesures sur le terrain. Les questions de SC7.3.4
// évaluent le choix et le jugement d'un format de communication à l'écrit;
// elles n'évaluent pas la communication orale ni la production de la
// communication elle-même. Les questions de SC7.3.6 évaluent les connaissances
// sur l'évaluation des processus de groupe; elles n'évaluent pas l'évaluation
// de son propre groupe par l'élève. Les questions de SC7.3.8 évaluent la
// conception d'expériences; la réalisation est un travail de classe.
// Symbiose : contrairement à la banque anglaise, la symbiose est nommée et
// évaluée comme telle à SC7.1.4 (mutualisme, commensalisme, parasitisme),
// parce que le guide français la définit à cet endroit.

/* Données des réseaux alimentaires pour la famille F4 (les lettres suivent l'ordre des nœuds). */
var S7F_WEB_POND = {
  nodes: [
    { n: "Algues", x: 90, y: 340 }, { n: "Quenouille", x: 250, y: 350 },
    { n: "Puce d'eau", x: 130, y: 215 }, { n: "Escargot", x: 300, y: 225 },
    { n: "Méné", x: 330, y: 105 }, { n: "Libellule", x: 480, y: 235 },
    { n: "Grenouille", x: 500, y: 105 }, { n: "Héron", x: 610, y: 60 }
  ],
  links: [[0, 2], [0, 3], [1, 3], [2, 4], [2, 5], [4, 6], [4, 7], [5, 6], [6, 7]]
};
var S7F_WEB_FOREST = {
  nodes: [
    { n: "Herbe", x: 80, y: 340 }, { n: "Sapin baumier", x: 250, y: 350 },
    { n: "Lièvre", x: 140, y: 205 }, { n: "Écureuil", x: 330, y: 215 },
    { n: "Orignal", x: 480, y: 330 }, { n: "Martre", x: 470, y: 200 },
    { n: "Hibou", x: 560, y: 95 }, { n: "Lynx", x: 300, y: 80 }
  ],
  links: [[0, 2], [0, 4], [1, 4], [1, 3], [2, 7], [2, 6], [3, 5], [3, 6], [5, 7]]
};
var S7F_WEB_MEADOW = {
  nodes: [
    { n: "Herbe", x: 80, y: 340 }, { n: "Trèfle", x: 240, y: 350 },
    { n: "Sauterelle", x: 150, y: 210 }, { n: "Souris", x: 330, y: 225 },
    { n: "Abeille", x: 430, y: 330 }, { n: "Grenouille", x: 460, y: 200 },
    { n: "Serpent", x: 540, y: 95 }, { n: "Faucon", x: 330, y: 75 }
  ],
  links: [[0, 2], [0, 3], [1, 2], [1, 4], [2, 5], [2, 3], [5, 6], [3, 6], [3, 7], [6, 7]]
};
function s7fWebQ(web) { return s7fWebSVG(web.nodes, web.links); }

/* ---------- SC7.1.1 Facteurs biotiques et abiotiques ---------- */
E("s7f-u1-factor-classify", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Une élève énumère les éléments d’une tourbière : mousse de sphaigne, mouches noires, sarracénies et eau acide. Quel élément est un facteur abiotique?", "L’eau acide de la tourbière", ["La mousse de sphaigne verte", "Les mouches noires actives", "Les sarracénies en fleurs"], "Les facteurs abiotiques sont les éléments non vivants d’un écosystème. L’eau acide est non vivante, tandis que la mousse, les mouches et les sarracénies sont des organismes vivants, donc des facteurs biotiques.", {});
  },
  function () {
    return mcq("Un élève énumère les éléments d’un rivage rocheux : varech, balanes, goélands et embruns salés. Quel élément est un facteur abiotique?", "Les embruns salés du rivage", ["Le varech brun des rochers", "Les balanes fixées aux roches", "Les goélands sur les falaises"], "Les embruns salés sont non vivants : c’est un facteur abiotique. Le varech, les balanes et les goélands sont vivants, donc ce sont des facteurs biotiques.", {});
  }
]), ["Biotique veut dire vivant. Élimine d’abord tout élément qui est vivant.", "Un seul élément de la liste n’est pas vivant. C’est le facteur abiotique."]);
E("s7f-u1-factor-local", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Lequel des éléments suivants est un facteur abiotique dans un écosystème de landes de Terre-Neuve-et-Labrador?", "Un vent fort et desséchant", ["Des caribous qui broutent le lichen", "Des plants de plaquebière étalés", "Des lièvres arctiques au crépuscule"], "Le vent est non vivant : c’est un facteur abiotique. Les caribous, les plants et les lièvres sont des organismes vivants, donc des facteurs biotiques.", {});
  },
  function () {
    return mcq("Lequel des éléments suivants est un facteur biotique dans un écosystème d’étang?", "Des marcheurs d’eau sur la surface", ["La lumière du soleil dans l’eau peu profonde", "Le gravier au fond de l’étang", "La pluie qui alimente l’étang"], "Les marcheurs d’eau sont des insectes vivants : c’est un facteur biotique. La lumière, le gravier et la pluie sont non vivants, donc abiotiques.", {});
  }
]), ["Classe d’abord chaque choix : vivant ou non vivant.", "La question demande un seul type; trois choix sont de l’autre type."]);
E("s7f-u1-tolerance-curve", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre comment la santé d’une population d’ombles de fontaine varie selon la température de l’eau. Entre quelles températures la population est-elle en meilleure santé?", "Entre 10 °C et 16 °C", ["Entre 4 °C et 10 °C", "Entre 16 °C et 22 °C", "Entre 4 °C et 22 °C"], "La partie supérieure et plate de la courbe est l’intervalle optimal, où la population est en meilleure santé : de 10 °C à 16 °C. À l’extérieur, la courbe descend dans l’intervalle de tolérance, puis vers l’intervalle d’échec à chaque extrémité.", {}); q.figure = s7fTolCurveSVG({ lo: 4, optLo: 10, optHi: 16, hi: 22 }); return q;
  },
  function () {
    var q = mcq("Le graphique montre comment la santé d’une population de capelans varie selon la température de l’eau. À quelle température la population survit-elle, mais subit-elle le plus grand stress?", "À 19 °C, près de la limite chaude", ["À 12 °C, au centre de l’intervalle optimal", "À 8 °C, bien à l’intérieur de la tolérance", "À 15 °C, juste au-dessus de l’optimal"], "Le stress est le plus grand près des extrémités de l’intervalle de tolérance, où la courbe est tombée près de l’échec, mais où la population survit encore. À 19 °C, la courbe est basse sans avoir atteint le point d’échec.", {}); q.figure = s7fTolCurveSVG({ lo: 2, optLo: 9, optHi: 14, hi: 20 }); return q;
  }
]), ["Repère d’abord le sommet plat de la courbe; c’est là que la population se porte le mieux.", "Les extrémités de la courbe forment l’intervalle d’échec. Juste à l’intérieur se trouve la partie de tolérance où le stress est élevé."]);
E("s7f-u1-cr-factor-effect", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    return textq("Le niveau d’eau d’un étang baisse pendant un long été sec, et les bords peu profonds s’assèchent complètement. (a) Nomme le facteur abiotique qui a changé. (b) Explique un effet que ce changement pourrait avoir sur les organismes de l’étang. (2 points)", ["le facteur abiotique est l’eau (niveau ou quantité d’eau)", "perte d’habitat peu profond", "les œufs pondus dans les parties peu profondes s’assèchent", "l’eau restante se réchauffe et contient moins d’oxygène"], "<b>Réponse modèle :</b> (a) Le facteur abiotique est l’eau : la quantité d’eau dans l’étang a diminué. (b) Par exemple, les grenouilles et les insectes qui pondent leurs œufs dans les bords peu profonds perdent leur habitat de reproduction quand ces bords s’assèchent, donc moins de jeunes survivent; ou encore, le plus petit volume d’eau se réchauffe et contient moins d’oxygène dissous, ce qui stresse les poissons.<br><br><b>Points d’attribution :</b> 1 point pour avoir nommé l’eau (quantité ou niveau) comme facteur abiotique. 1 point pour un effet sur les organismes, expliqué comme une conséquence du changement.", {});
  },
  function () {
    return textq("On coupe un groupe d’épinettes près d’un jardin scolaire, si bien qu’une parcelle à l’ombre toute la journée est maintenant en plein soleil. (a) Nomme le facteur abiotique qui a changé pour les plantes de la parcelle. (b) Explique un effet que ce changement pourrait avoir sur ces plantes. (2 points)", ["le facteur abiotique est la lumière du soleil (intensité lumineuse)", "les plantes d’ombre sont stressées ou dépérissent", "les plantes de soleil poussent plus vite", "le sol s’assèche plus vite"], "<b>Réponse modèle :</b> (a) Le facteur abiotique est la lumière du soleil : la parcelle reçoit maintenant beaucoup plus de lumière. (b) Par exemple, les plantes adaptées à l’ombre peuvent être stressées et dépérir, tandis que les plantes de soleil poussent plus vite grâce à la lumière supplémentaire pour la photosynthèse; ou encore, le sol exposé s’assèche plus rapidement, donc les plantes manquent d’eau.<br><br><b>Points d’attribution :</b> 1 point pour avoir nommé la lumière du soleil comme facteur abiotique. 1 point pour un effet sur les plantes, expliqué comme une conséquence du changement.", {});
  }
]), ["Sépare d’abord les éléments vivants de l’élément non vivant qui a changé.", "Pour la partie (b), suis la chaîne : le changement modifie une condition, et cette condition compte pour un organisme."]);

/* ---------- SC7.1.2 Interactions entre les facteurs ---------- */
E("s7f-u1-interaction-classify", 1, ["SC7.1.2"], 1, "var", varset([
  function () {
    return mcq("Dans un écosystème local, les vers de terre creusent des tunnels dans le sol et y laissent entrer l’air. C’est un exemple", "d’une interaction biotique-abiotique", ["d’une interaction abiotique-abiotique", "d’une interaction biotique-biotique", "d’un changement qui n’est pas une interaction"], "Classe l’interaction selon les deux facteurs en cause. Le ver de terre est vivant (biotique) et le sol et l’air sont non vivants (abiotiques) : c’est donc une interaction biotique-abiotique.", {});
  },
  function () {
    return mcq("Dans un écosystème local, la lumière du soleil réchauffe la surface d’un lac au printemps. C’est un exemple", "d’une interaction abiotique-abiotique", ["d’une interaction biotique-abiotique", "d’une interaction biotique-biotique", "d’un changement qui n’est pas une interaction"], "La lumière du soleil et l’eau du lac sont toutes les deux non vivantes : c’est une interaction abiotique-abiotique. Nomme toujours chaque facteur avant de décider s’il est vivant.", {});
  },
  function () {
    return mcq("Dans un écosystème local, un lynx chasse un lièvre d’Amérique dans la neige. C’est un exemple", "d’une interaction biotique-biotique", ["d’une interaction biotique-abiotique", "d’une interaction abiotique-abiotique", "d’un changement qui n’est pas une interaction"], "Le lynx et le lièvre sont tous les deux des organismes vivants : c’est une interaction biotique-biotique.", {});
  }
]), ["Nomme les deux facteurs de l’exemple avant de choisir.", "Pour chaque facteur, demande-toi : est-il vivant (biotique) ou non vivant (abiotique)?"]);
E("s7f-u1-pond-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    var q = mcq("Dans le schéma de l’étang, quel numéro d’appel montre une interaction abiotique-abiotique?", "L’appel 1, le soleil sur l’eau", ["L’appel 3, l’oiseau dans l’arbre", "L’appel 4, le poisson et l’insecte", "L’appel 5, les racines dans l’eau"], "L’appel 1 montre la lumière du soleil qui réchauffe la surface de l’étang : la lumière et l’eau sont non vivantes, donc l’interaction est abiotique-abiotique. L’appel 3 réunit deux êtres vivants, l’appel 4 aussi, et l’appel 5 réunit une plante vivante et l’eau.", {}); q.figure = S7F_POND_SVG; return q;
  },
  function () {
    var q = mcq("Dans le schéma de l’étang, quel numéro d’appel montre une interaction biotique-abiotique?", "L’appel 5, les racines dans l’eau", ["L’appel 2, la pluie sur l’étang", "L’appel 3, l’oiseau dans l’arbre", "L’appel 4, le poisson et l’insecte"], "L’appel 5 montre les racines de quenouilles qui absorbent l’eau : une plante vivante interagit avec l’eau non vivante, donc c’est une interaction biotique-abiotique. L’appel 2 ne réunit que des éléments non vivants, et les appels 3 et 4 réunissent deux êtres vivants chacun.", {}); q.figure = S7F_POND_SVG; return q;
  }
]), ["Examine les appels un à la fois et nomme les deux facteurs à chacun.", "Un facteur vivant et un facteur non vivant donnent une interaction biotique-abiotique."]);
E("s7f-u1-cr-three-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return textq("Choisis un écosystème local que tu connais (un étang, une forêt, une tourbière ou ta cour d’école). Donne UN exemple de chaque type d’interaction dans cet écosystème : biotique-abiotique, abiotique-abiotique et biotique-biotique. Étiquette chaque exemple avec son type. (3 points)", ["trois exemples correctement étiquetés, un de chaque type, dans un même écosystème nommé", "grenouille sur une roche chaude (biotique-abiotique)", "vent qui ride l’eau (abiotique-abiotique)", "héron qui attrape un méné (biotique-biotique)"], "<b>Réponse modèle :</b> Pour un étang : biotique-abiotique : une grenouille se tient sur une roche réchauffée par le soleil et prend la chaleur de la roche et de la lumière, qui sont non vivantes. Abiotique-abiotique : le vent souffle sur l’étang et soulève des rides à la surface de l’eau; les deux facteurs sont non vivants. Biotique-biotique : un héron attrape et mange un méné; deux organismes vivants interagissent. Tout écosystème bien connu convient, pourvu que chaque exemple réunisse vraiment les deux sortes de facteurs que son étiquette annonce.<br><br><b>Points d’attribution :</b> 1 point pour un véritable exemple biotique-abiotique, correctement étiqueté. 1 point pour un véritable exemple abiotique-abiotique, correctement étiqueté. 1 point pour un véritable exemple biotique-biotique, correctement étiqueté.", {});
  }
]), ["Choisis un seul écosystème et reste dans celui-ci pour les trois exemples.", "Pour chaque exemple, nomme les deux facteurs à voix haute et étiquette chacun : vivant ou non vivant."]);

/* ---------- SC7.1.3 Interaction biotique-abiotique exploree ---------- */
E("s7f-u1-biotic-abiotic-explore", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("Une grenouille passe la matinée assise sur une roche plate au bord d’un étang, puis retourne à l’eau. Quelle interaction entre un facteur biotique et un facteur abiotique est décrite ici?", "La grenouille prend la chaleur de la roche réchauffée par le soleil", ["La grenouille chasse les insectes qui volent au-dessus de l’étang", "La grenouille pond ses œufs parmi les quenouilles du bord", "La grenouille échappe à un héron en plongeant dans l’eau"], "La grenouille est vivante (biotique) et la roche réchauffée par le soleil est non vivante (abiotique) : leur interaction est biotique-abiotique. Dans les autres choix, les deux facteurs en cause sont vivants.", {});
  },
  function () {
    return mcq("Les racines d’une quenouille absorbent l’eau et les nutriments du fond boueux d’un étang. Cette interaction réunit", "une plante vivante et des éléments non vivants du milieu", ["deux plantes vivantes qui se font concurrence pour l’espace", "deux animaux vivants qui partagent le même habitat calme", "deux éléments non vivants qui se mélangent dans l’étang"], "La quenouille est vivante, tandis que l’eau, la boue et les nutriments dissous sont non vivants : c’est une interaction entre un facteur biotique et des facteurs abiotiques.", {});
  }
]), ["Repère le facteur vivant, puis le facteur non vivant avec lequel il interagit.", "Si les deux facteurs sont vivants, ce n’est pas le type d’interaction demandé."]);
E("s7f-u1-biotic-abiotic-effect", 1, ["SC7.1.3"], 2, "var", varset([
  function () {
    return mcq("Dans une tourbière, l’eau acide ralentit la décomposition, si bien que la matière végétale morte s’accumule au lieu de pourrir. Quel énoncé décrit le mieux cette interaction?", "Un facteur abiotique, l’acidité de l’eau, limite l’activité des décomposeurs vivants", ["Un facteur biotique, la mousse vivante, rend l’eau de la tourbière plus acide", "Deux facteurs abiotiques, l’eau et l’acidité, se combinent sans effet sur le vivant", "Deux facteurs biotiques, les plantes et l’eau, échangent des nutriments dissous"], "L’acidité est une propriété non vivante de l’eau (abiotique), et elle agit sur des organismes vivants, les décomposeurs : c’est une interaction biotique-abiotique dont l’effet est de ralentir la décomposition.", {});
  },
  function () {
    return mcq("Après un hiver très enneigé, la fonte tardive garde un pré froid et détrempé, et les fleurs y fleurissent deux semaines plus tard que d’habitude. Quel énoncé décrit le mieux cette interaction?", "Des facteurs abiotiques, la neige et le froid, retardent la croissance des plantes vivantes", ["Des facteurs biotiques, les fleurs vivantes, font fondre la neige du pré plus tard", "Deux facteurs biotiques, les fleurs et la neige, se disputent la lumière du soleil", "Deux facteurs abiotiques, les fleurs et le froid, changent la date de la fonte"], "La neige, l’eau de fonte et le froid sont non vivants (abiotiques), et ils agissent sur les plantes vivantes : c’est une interaction biotique-abiotique qui retarde la floraison.", {});
  }
]), ["Demande-toi dans quel sens va l’effet : quel facteur agit, et quel facteur le subit?", "Le facteur qui agit ici est non vivant; celui qui est touché est vivant."]);

/* ---------- SC7.1.4 Definir la symbiose ---------- */
E("s7f-u1-symbiosis-define", 1, ["SC7.1.4"], 1, "var", varset([
  function () {
    return mcq("Quelle est la meilleure définition de la symbiose?", "Une relation étroite et durable entre deux organismes d’espèces différentes", ["Une relation passagère entre deux organismes qui se rencontrent une seule fois", "Une relation de chasse entre un prédateur et la proie qu’il mange rapidement", "Une relation entre les membres d’une même espèce qui vivent en groupe"], "La symbiose est une relation étroite qui dure dans le temps entre deux organismes d’espèces différentes. Elle comprend le mutualisme, le commensalisme et le parasitisme.", {});
  },
  function () {
    return mcq("Deux organismes vivent en contact étroit pendant presque toute leur vie, et l’un d’eux au moins en retire un avantage. Cette relation est", "une symbiose entre les deux organismes", ["une concurrence entre les deux organismes", "une prédation entre les deux organismes", "une décomposition entre les deux organismes"], "Un contact étroit et durable entre deux organismes d’espèces différentes, dont au moins un retire un avantage, est une symbiose.", {});
  }
]), ["Pense à la durée : la symbiose est une relation qui dure, pas une rencontre brève.", "Les trois types de symbiose sont le mutualisme, le commensalisme et le parasitisme."]);
E("s7f-u1-symbiosis-types", 1, ["SC7.1.4"], 1, "var", varset([
  function () {
    return mcq("Dans le mutualisme, que retire chaque organisme de la relation?", "Chaque organisme retire un avantage de la relation vécue ensemble", ["Un organisme retire un avantage et l’autre organisme est lésé", "Un organisme retire un avantage et l’autre n’est ni aidé ni lésé", "Aucun organisme ne retire d’avantage de la relation vécue"], "Dans le mutualisme, les deux organismes profitent de la relation. Quand un seul profite et que l’autre est lésé, c’est du parasitisme; quand un seul profite sans nuire à l’autre, c’est du commensalisme.", {});
  },
  function () {
    return mcq("Dans le parasitisme, que retire chaque organisme de la relation?", "Un organisme profite de la relation et l’autre organisme est lésé", ["Chaque organisme retire un avantage de la relation vécue ensemble", "Un organisme retire un avantage et l’autre n’est ni aidé ni lésé", "Aucun organisme ne retire d’avantage de la relation vécue"], "Dans le parasitisme, le parasite profite de la relation aux dépens de son hôte, qui est lésé. Si les deux profitaient, ce serait du mutualisme.", {});
  }
]), ["Pour chaque type, demande-toi : qui profite, et qui est lésé?", "Mutualisme : les deux profitent. Parasitisme : un profite, l’autre est lésé."]);
E("s7f-u1-symbiosis-scenarios", 1, ["SC7.1.4"], 2, "var", varset([
  function () {
    return mcq("Une baleine transporte des balanes fixées à sa peau. Les balanes atteignent ainsi des eaux riches en nourriture; la baleine n’est ni aidée ni lésée. De quel type de symbiose s’agit-il?", "Le commensalisme, car un organisme profite sans nuire à l’autre", ["Le mutualisme, car les deux organismes profitent de la relation", "Le parasitisme, car un organisme profite aux dépens de l’autre", "Le commensalisme, car les deux organismes sont lésés ensemble"], "Les balanes profitent du transport et la baleine n’est ni aidée ni lésée : c’est du commensalisme. Le type se décide par l’effet sur chaque partenaire.", {});
  },
  function () {
    return mcq("Une puce vit sur un chien et se nourrit de son sang. Le chien perd du sang et souffre de démangeaisons. De quel type de symbiose s’agit-il?", "Le parasitisme, car la puce profite aux dépens du chien lésé", ["Le mutualisme, car les deux organismes profitent de la relation", "Le commensalisme, car la puce profite sans nuire à son hôte", "Le parasitisme, car le chien profite aux dépens de la puce"], "La puce (le parasite) profite de la relation et le chien (l’hôte) est lésé : c’est du parasitisme.", {});
  },
  function () {
    return mcq("Les abeilles recueillent le nectar des fleurs de trèfle, et le pollen collé à leur corps atteint d’autres fleurs. De quel type de symbiose s’agit-il?", "Le mutualisme, car les abeilles et le trèfle profitent tous les deux", ["Le commensalisme, car les abeilles profitent sans effet sur le trèfle", "Le parasitisme, car les abeilles profitent aux dépens du trèfle lésé", "Le mutualisme, car le trèfle profite seul de la visite des abeilles"], "Les abeilles obtiennent de la nourriture et le trèfle est pollinisé : les deux partenaires profitent, donc c’est du mutualisme.", {});
  }
]), ["Pour chaque partenaire, décide : aidé, lésé, ou ni l’un ni l’autre?", "La combinaison des deux effets donne le type de symbiose."]);

/* ---------- SC7.1.5 Roles des producteurs, consommateurs et decomposeurs ---------- */
E("s7f-u1-role-identify", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    return mcq("Dans un écosystème de pré, quel organisme joue le rôle de producteur?", "L’herbe qui fabrique sa nourriture par photosynthèse", ["Le campagnol qui mange les graines et les tiges d’herbe", "Le champignon qui décompose l’herbe morte au sol", "Le faucon qui chasse les campagnols au-dessus du pré"], "Les producteurs fabriquent leur propre nourriture par photosynthèse : c’est l’herbe. Le campagnol et le faucon sont des consommateurs, et le champignon est un décomposeur.", {});
  },
  function () {
    return mcq("Dans un écosystème forestier, quel organisme joue le rôle de décomposeur?", "Les bactéries qui décomposent une souche en décomposition", ["L’épinette qui fabrique sa nourriture par photosynthèse", "L’écureuil roux qui mange les graines des cônes d’épinette", "La martre qui chasse les écureuils entre les arbres"], "Les décomposeurs décomposent la matière morte et en libèrent les nutriments : ce sont les bactéries de la souche. L’épinette est un producteur, et l’écureuil et la martre sont des consommateurs.", {});
  }
]), ["Demande-toi comment chaque organisme obtient sa nourriture.", "Producteur : il la fabrique. Consommateur : il mange. Décomposeur : il décompose la matière morte."]);
E("s7f-u1-consumer-types", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    return mcq("Un lièvre d’Amérique mange des brindilles et de l’écorce pendant l’hiver. Le lièvre est", "un consommateur qui se nourrit de plantes", ["un producteur qui fabrique sa propre nourriture", "un décomposeur qui décompose la matière morte", "un consommateur qui se nourrit d’autres animaux"], "Le lièvre mange des plantes : c’est un consommateur (un herbivore). Il ne fabrique pas sa nourriture et il ne décompose pas la matière morte.", {});
  },
  function () {
    return mcq("Un vison chasse des campagnols et des poissons près d’un ruisseau. Le vison est", "un consommateur qui se nourrit d’autres animaux", ["un consommateur qui se nourrit seulement de plantes", "un producteur qui fabrique sa propre nourriture", "un décomposeur qui décompose la matière morte"], "Le vison mange d’autres animaux : c’est un consommateur (un carnivore).", {});
  }
]), ["Regarde le menu : plantes, animaux, ou matière morte?", "Le rôle suit la source de nourriture de l’organisme."]);
E("s7f-u1-niche-reason", 1, ["SC7.1.5"], 2, "var", varset([
  function () {
    return mcq("Pourquoi les décomposeurs sont-ils essentiels au rôle des producteurs dans un écosystème?", "Ils libèrent les nutriments de la matière morte, que les producteurs absorbent ensuite", ["Ils fabriquent la nourriture que les producteurs utilisent directement pour grandir", "Ils mangent les consommateurs qui, autrement, mangeraient tous les producteurs", "Ils fournissent l’oxygène que les producteurs utilisent pour la photosynthèse"], "Les décomposeurs décomposent les organismes morts et les déchets, et libèrent leurs nutriments dans le sol. Les producteurs absorbent ces nutriments pour grandir : sans décomposeurs, les nutriments resteraient enfermés dans la matière morte.", {});
  },
  function () {
    return mcq("Un étang contient des algues, des ménés et des bactéries sur les plantes mortes du fond. Quel énoncé décrit correctement les rôles dans cet étang?", "Les algues produisent, les ménés consomment et les bactéries décomposent la matière", ["Les algues consomment, les ménés décomposent et les bactéries produisent la matière", "Les algues décomposent, les ménés produisent et les bactéries consomment la matière", "Les algues produisent, les ménés décomposent et les bactéries consomment la matière"], "Les algues fabriquent leur nourriture par photosynthèse (producteurs), les ménés mangent d’autres organismes (consommateurs), et les bactéries décomposent la matière morte (décomposeurs).", {});
  }
]), ["Suis les nutriments : où vont-ils quand un organisme meurt?", "Chaque rôle se définit par la façon dont l’organisme obtient matière et énergie."]);

/* ---------- SC7.1.6 Classer les organismes ---------- */
E("s7f-u1-classify-set", 1, ["SC7.1.6"], 1, "var", varset([
  function () {
    return mcq("Classe ces organismes d’un marais : quenouille, canard colvert, champignon, héron. Lequel est le décomposeur du groupe?", "Le champignon qui pousse sur le bois mort du marais", ["La quenouille qui pousse au bord de l’eau du marais", "Le canard colvert qui mange les graines du marais", "Le héron qui attrape les poissons dans le marais"], "Le champignon décompose la matière morte : c’est le décomposeur. La quenouille est un producteur, et le canard et le héron sont des consommateurs.", {});
  },
  function () {
    return mcq("Classe ces organismes d’une forêt : sapin baumier, lièvre, moisissure, renard. Lequel est le producteur du groupe?", "Le sapin baumier qui pousse dans la forêt claire", ["Le lièvre qui broute les plantes basses de la forêt", "La moisissure qui pousse sur une bûche morte", "Le renard qui chasse les petits mammifères"], "Le sapin fabrique sa nourriture par photosynthèse : c’est le producteur. Le lièvre et le renard sont des consommateurs, et la moisissure est un décomposeur.", {});
  }
]), ["Classe les quatre organismes un par un avant de répondre.", "Un seul des quatre décompose la matière morte (ou fabrique sa nourriture, selon la question)."]);
E("s7f-u1-classify-set-hard", 1, ["SC7.1.6"], 1, "var", varset([
  function () {
    return mcq("Une sarracénie attire des insectes dans ses feuilles en forme de pichet et les digère. Comment faut-il classer la sarracénie?", "Comme un producteur qui obtient un supplément de nutriments des insectes", ["Comme un consommateur qui obtient toute son énergie des insectes mangés", "Comme un décomposeur qui obtient son énergie de la matière morte digérée", "Comme un consommateur qui obtient ses nutriments sans faire de photosynthèse"], "La sarracénie fait la photosynthèse comme les autres plantes vertes : c’est un producteur. Les insectes digérés lui fournissent des nutriments (surtout de l’azote) qui manquent dans le sol de la tourbière, et non son énergie.", {});
  },
  function () {
    return mcq("Le gui est une plante verte qui pousse sur les branches d’un arbre et absorbe l’eau et les nutriments de son hôte, tout en faisant un peu de photosynthèse. Comment faut-il classer le gui?", "Comme un producteur qui vole des nutriments à un autre producteur vivant", ["Comme un décomposeur qui se nourrit de l’écorce morte de l’arbre hôte", "Comme un consommateur qui mange l’arbre hôte morceau par morceau", "Comme un producteur qui n’a aucun lien avec l’arbre sur lequel il pousse"], "Le gui est vert et fait la photosynthèse : il reste un producteur, même s’il prend l’eau et les nutriments de l’arbre hôte vivant.", {});
  }
]), ["Demande-toi d’abord si l’organisme fait la photosynthèse.", "Un cas inhabituel ne change pas la règle de base du classement."]);
E("s7f-u1-ecosystem-infer", 1, ["SC7.1.6"], 2, "var", varset([
  function () {
    return mcq("On retire tous les décomposeurs d’un écosystème forestier, mais les producteurs et les consommateurs restent. Quelle conséquence apparaîtrait en premier?", "La litière morte s’accumulerait et les nutriments resteraient enfermés dedans", ["Les producteurs cesseraient de faire la photosynthèse dès la première saison", "Les consommateurs cesseraient de manger et mourraient en quelques jours", "Le sol deviendrait plus riche en nutriments dès la première année"], "Sans décomposeurs, les feuilles mortes et les organismes morts ne sont plus décomposés : la litière s’accumule et ses nutriments ne retournent pas au sol pour les producteurs.", {});
  },
  function () {
    return mcq("Un jardin reçoit chaque automne une épaisse couche de compost riche en matière décomposée. Pourquoi les plantes du jardin poussent-elles mieux?", "Le compost rend au sol les nutriments libérés par les décomposeurs du tas", ["Le compost ajoute des consommateurs qui mangent les insectes nuisibles du sol", "Le compost remplace la lumière du soleil dont les plantes ont moins besoin", "Le compost empêche complètement les producteurs de perdre leurs nutriments"], "Le travail des décomposeurs dans le compost libère les nutriments de la matière morte; versés au sol du jardin, ces nutriments sont absorbés par les producteurs, qui poussent mieux.", {});
  }
]), ["Suis le trajet des nutriments quand un maillon du classement disparaît.", "Le classement n’est pas qu’une étiquette : chaque rôle fait un travail dans l’écosystème."]);

/* ---------- SC7.1.7 Energie dans le reseau alimentaire ---------- */
E("s7f-u1-energy-loss", 1, ["SC7.1.7"], 1, "var", varset([
  function () {
    return mcq("Dans un réseau alimentaire, qu’arrive-t-il à la plus grande partie de l’énergie à chaque transfert d’un organisme à celui qui le mange?", "Elle est perdue sous forme de chaleur pendant les activités de l’organisme", ["Elle est emmagasinée entière dans le corps de l’organisme qui le mange", "Elle retourne directement au soleil pour être utilisée une autre fois", "Elle est transformée en nutriments que les décomposeurs utilisent"], "À chaque transfert, la plus grande partie de l’énergie sert aux activités de l’organisme (bouger, garder sa chaleur, grandir) et se perd sous forme de chaleur. Seule une petite partie devient la chair que le mangeur suivant peut utiliser.", {});
  },
  function () {
    return mcq("Pourquoi un réseau alimentaire compte-t-il beaucoup plus de producteurs que de grands prédateurs?", "Parce que l’énergie se perd à chaque transfert, il en reste peu pour les prédateurs", ["Parce que les prédateurs fabriquent leur propre nourriture à partir du soleil", "Parce que les producteurs mangent les prédateurs et gardent leur population basse", "Parce que l’énergie augmente à chaque transfert vers les grands prédateurs"], "L’énergie diminue à chaque maillon, car elle se perd en chaleur. Au sommet, il reste peu d’énergie, ce qui ne peut nourrir que quelques grands prédateurs.", {});
  }
]), ["L’énergie ne se recycle pas comme la matière; elle traverse le réseau une seule fois.", "Pense à ce que l’organisme fait de l’énergie avant d’être mangé."]);
E("s7f-u1-web-removal", 1, ["SC7.1.7"], 3, "var", varset([
  function () {
    var q = mcq("Dans le réseau alimentaire de l’étang, que se passerait-il probablement si les ménés disparaissaient complètement?", "Les grenouilles et les hérons perdraient une proie et devraient se tourner vers d’autres aliments", ["Les puces d’eau disparaîtraient aussi, car les ménés sont leur seule nourriture connue", "Les algues cesseraient de pousser, car les ménés leur fournissent leurs nutriments", "Les libellules deviendraient les seuls prédateurs de tout le réseau de l’étang"], "Les ménés sont une proie des grenouilles et des hérons dans ce réseau : sans eux, ces prédateurs perdent une source de nourriture et doivent compter sur leurs autres proies. Les puces d’eau, elles, seraient libérées d’un prédateur, et non privées de nourriture.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  },
  function () {
    var q = mcq("Dans le réseau alimentaire de la forêt, que se passerait-il probablement si les lièvres disparaissaient complètement?", "Les lynx et les hiboux perdraient une proie importante et leurs populations pourraient diminuer", ["Les épinettes et les sapins disparaîtraient, car les lièvres sont leurs pollinisateurs", "Les orignaux deviendraient la seule proie de tous les prédateurs de la forêt", "Les écureuils cesseraient de manger, car les lièvres leur préparent la nourriture"], "Le lièvre est une proie du lynx et du hibou dans ce réseau. Sa disparition enlève une source importante de nourriture à ces prédateurs, qui peuvent alors diminuer, même s’ils ont d’autres proies.", {}); q.figure = s7fWebQ(S7F_WEB_FOREST); return q;
  }
]), ["Suis les flèches qui partent de l’organisme retiré et celles qui y arrivent.", "La flèche pointe dans le sens du transfert d’énergie : de la proie vers le mangeur."]);
E("s7f-u1-cr-web-change", 1, ["SC7.1.7"], 3, "var", varset([
  function () {
    var q = textq("Dans le réseau alimentaire de l’étang, une maladie fait presque disparaître les grenouilles. Prédis DEUX changements qui pourraient suivre dans le réseau, et explique chacun par les liens du réseau. (3 points)", ["les libellules augmentent, car les grenouilles les mangeaient", "les hérons perdent une proie et mangent plus de ménés", "les ménés subissent plus de prédation de la part des hérons"], "<b>Réponse modèle :</b> Premier changement : les libellules peuvent augmenter, parce que les grenouilles qui les mangeaient ont presque disparu, donc moins de libellules sont capturées. Deuxième changement : les hérons perdent les grenouilles comme proie; ils chassent alors davantage les ménés, dont la population peut diminuer sous cette pression accrue. Chaque prédiction suit un lien précis du réseau : qui mange qui.<br><br><b>Points d’attribution :</b> 1 point pour le premier changement prédit. 1 point pour le deuxième changement prédit. 1 point pour avoir expliqué les deux changements par les liens d’alimentation du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  }
]), ["Choisis deux organismes liés aux grenouilles dans le réseau : une proie et un prédateur.", "Chaque prédiction doit passer par un lien précis : qui mange qui."]);

/* ---------- SC7.1.8 Energie et pyramide ---------- */
E("s7f-u1-chain-order", 1, ["SC7.1.8"], 1, "var", varset([
  function () {
    var q = mcq("Quelle suite place une chaîne alimentaire d’étang dans le bon ordre, du producteur au consommateur du sommet?", "Algues, puis puce d’eau, puis méné, puis héron", ["Puce d’eau, puis algues, puis héron, puis méné", "Héron, puis méné, puis puce d’eau, puis algues", "Méné, puis héron, puis algues, puis puce d’eau"], "Une chaîne alimentaire commence par le producteur (les algues), suivi des consommateurs dans l’ordre où ils se mangent : la puce d’eau mange les algues, le méné mange la puce d’eau, et le héron mange le méné.", {}); q.figure = s7fChainSVG(["Algues", "Puce d’eau", "Méné", "Héron"], false); return q;
  },
  function () {
    var q = mcq("Quelle suite place une chaîne alimentaire de pré dans le bon ordre, du producteur au consommateur du sommet?", "Herbe, puis sauterelle, puis grenouille, puis serpent", ["Sauterelle, puis herbe, puis serpent, puis grenouille", "Serpent, puis grenouille, puis sauterelle, puis herbe", "Grenouille, puis serpent, puis herbe, puis sauterelle"], "La chaîne commence par le producteur (l’herbe), puis chaque consommateur mange le maillon précédent : la sauterelle mange l’herbe, la grenouille mange la sauterelle, et le serpent mange la grenouille.", {}); q.figure = s7fChainSVG(["Herbe", "Sauterelle", "Grenouille", "Serpent"], false); return q;
  }
]), ["Commence toujours par l’organisme qui fabrique sa nourriture.", "Chaque flèche va de l’organisme mangé vers l’organisme qui le mange."]);
E("s7f-u1-energy-transfer", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return mcq("Dans la pyramide d’énergie d’une chaîne alimentaire, pourquoi chaque niveau est-il plus petit que celui du dessous?", "Parce qu’une grande partie de l’énergie se perd en chaleur à chaque transfert", ["Parce que les organismes du sommet fabriquent leur propre énergie au soleil", "Parce que l’énergie des niveaux du bas retourne entière au niveau du haut", "Parce que les organismes du bas mangent ceux qui se trouvent au-dessus d’eux"], "La pyramide rétrécit parce que l’énergie disponible diminue à chaque transfert : la plus grande partie sert aux activités de l’organisme et se perd en chaleur, donc il en reste moins pour le niveau suivant.", {});
  },
  function () {
    return mcq("Une chaîne alimentaire reçoit 10 000 unités d’énergie au niveau des producteurs. Environ combien d’unités restent-elles pour le troisième niveau de consommateurs?", "Environ 10 unités, car il reste à peu près un dixième à chaque transfert", ["Environ 1 000 unités, car il reste à peu près la moitié à chaque transfert", "Environ 5 000 unités, car l’énergie diminue très lentement dans la chaîne", "Environ 10 000 unités, car l’énergie se conserve entière dans la chaîne"], "À chaque transfert, seulement environ un dixième de l’énergie passe au niveau suivant : 10 000, puis 1 000, puis 100, puis environ 10 unités au troisième niveau de consommateurs.", {});
  }
]), ["La forme de la pyramide raconte l’histoire de l’énergie perdue.", "Compte les transferts : producteurs, puis trois niveaux de consommateurs."]);
E("s7f-u1-cr-energy-flow", 1, ["SC7.1.8"], 3, "var", varset([
  function () {
    return textq("Décris comment l’énergie est fournie à une chaîne alimentaire d’un pré et comment elle la traverse, des producteurs jusqu’au consommateur du sommet. Ton explication doit dire d’où vient l’énergie au départ et pourquoi elle diminue le long de la chaîne. (3 points)", ["l’énergie vient de la lumière du soleil, captée par les producteurs pendant la photosynthèse", "l’énergie passe de l’organisme mangé à celui qui le mange", "elle diminue parce qu’une grande partie se perd en chaleur à chaque transfert"], "<b>Réponse modèle :</b> L’énergie entre dans la chaîne par la lumière du soleil : les producteurs du pré, comme l’herbe, la captent pendant la photosynthèse et la transforment en nourriture. Quand un consommateur mange un autre organisme, l’énergie passe de l’organisme mangé à celui qui le mange, maillon par maillon, jusqu’au consommateur du sommet. À chaque transfert, la plus grande partie de l’énergie sert aux activités de l’organisme et se perd sous forme de chaleur; il n’en reste qu’environ un dixième pour le maillon suivant, donc l’énergie disponible diminue tout le long de la chaîne.<br><br><b>Points d’attribution :</b> 1 point pour la source d’énergie (la lumière du soleil captée par les producteurs). 1 point pour le transfert d’un organisme à celui qui le mange, jusqu’au sommet. 1 point pour la diminution de l’énergie, expliquée par les pertes en chaleur à chaque transfert.", {});
  }
]), ["Commence par la source : qui capte l’énergie le premier, et comment?", "Termine par les pertes : où va l’énergie qui n’atteint pas le sommet?"]);

/* ---------- SC7.1.9 Recyclage de la matiere ---------- */
E("s7f-u1-decomposer-role", 1, ["SC7.1.9"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé décrit le mieux le rôle des décomposeurs dans le recyclage de la matière?", "Ils décomposent la matière morte et libèrent ses nutriments dans le sol", ["Ils fabriquent de la nourriture neuve à partir de la lumière du soleil", "Ils mangent les organismes vivants et empêchent leur multiplication", "Ils emmagasinent les nutriments dans leur corps pour toujours"], "Les décomposeurs (champignons, bactéries et autres) décomposent les organismes morts et les déchets. Les nutriments libérés retournent au sol, où les plantes les absorbent : c’est le recyclage de la matière.", {});
  },
  function () {
    return mcq("Après la mort d’un arbre, des champignons poussent sur son tronc pendant des années. Quel rôle ces champignons jouent-ils dans le recyclage de la matière?", "Ils décomposent le bois mort et rendent ses nutriments au sol forestier", ["Ils fabriquent le bois neuf qui remplacera le tronc de l’arbre mort", "Ils protègent le tronc pour qu’il reste intact pendant des siècles", "Ils transforment le bois mort en nourriture pour les grands prédateurs"], "Les champignons sont des décomposeurs : ils décomposent le bois mort lentement et libèrent ses nutriments dans le sol, où d’autres plantes peuvent les utiliser.", {});
  }
]), ["Le recyclage concerne la matière, pas l’énergie : suis les nutriments.", "Qui décompose, et qu’est-ce qui est libéré?"]);
E("s7f-u1-nutrient-cycle", 1, ["SC7.1.9"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma du cycle des nutriments, quelle flèche montre les nutriments qui passent des décomposeurs au sol?", "La flèche D, des décomposeurs vers le sol", ["La flèche A, du sol vers les plantes", "La flèche B, des plantes vers les animaux", "La flèche C, des organismes vers les décomposeurs"], "La flèche D va des décomposeurs au sol : en décomposant la matière morte, les décomposeurs libèrent les nutriments dans le sol. La flèche A montre l’absorption par les plantes, la B le passage aux animaux, et la C l’arrivée de la matière morte chez les décomposeurs.", {}); q.figure = S7F_NUTRIENT_SVG; return q;
  },
  function () {
    var q = mcq("Dans le schéma du cycle des nutriments, quelle flèche montre les plantes qui absorbent les nutriments du sol?", "La flèche A, du sol vers les plantes", ["La flèche B, des plantes vers les animaux", "La flèche C, des organismes vers les décomposeurs", "La flèche D, des décomposeurs vers le sol"], "La flèche A va du sol aux plantes : c’est l’absorption des nutriments par les racines. Les autres flèches montrent les étapes suivantes du cycle.", {}); q.figure = S7F_NUTRIENT_SVG; return q;
  }
]), ["Pars de la case nommée dans la question et suis la flèche dans le bon sens.", "Le cycle tourne : sol, plantes, animaux, décomposeurs, puis retour au sol."]);
E("s7f-u1-cr-recycling", 1, ["SC7.1.9"], 2, "var", varset([
  function () {
    return textq("Un méné meurt dans un étang. Décris le trajet de la matière de son corps jusqu’à ce qu’elle serve de nouveau à une plante de l’étang, en nommant les groupes d’organismes qui participent à chaque étape. (2 points)", ["les décomposeurs (bactéries et champignons) décomposent le corps et libèrent les nutriments dans l’eau et le fond", "les plantes absorbent les nutriments libérés et les utilisent pour grandir"], "<b>Réponse modèle :</b> Après la mort du méné, les décomposeurs, surtout les bactéries et les champignons, décomposent son corps et libèrent les nutriments qu’il contenait dans l’eau et dans les sédiments du fond. Les plantes de l’étang, comme les quenouilles et les algues, absorbent ensuite ces nutriments et les utilisent pour fabriquer leur nouvelle matière : la matière du méné est ainsi recyclée dans l’écosystème.<br><br><b>Points d’attribution :</b> 1 point pour l’étape de décomposition, avec les décomposeurs nommés et les nutriments libérés. 1 point pour l’absorption des nutriments par les plantes, qui les réutilisent.", {});
  }
]), ["Le trajet compte deux grandes étapes : décomposer, puis absorber.", "Nomme les organismes de chaque étape : qui décompose, qui absorbe?"]);

/* ---------- SC7.1.10 Signes de la succession ecologique ---------- */
E("s7f-u1-succession-identify", 1, ["SC7.1.10"], 1, "var", varset([
  function () {
    return mcq("Un champ abandonné est d’abord couvert d’herbes, puis d’arbustes, et enfin de jeunes arbres après plusieurs années. Ce changement graduel est", "la succession écologique dans le champ abandonné", ["la décomposition écologique dans le champ abandonné", "la photosynthèse écologique dans le champ abandonné", "la concurrence écologique dans le champ abandonné"], "Le remplacement graduel et ordonné des communautés d’un site, ici herbes, puis arbustes, puis jeunes arbres, est la succession écologique.", {});
  },
  function () {
    return mcq("Lequel des signes suivants annonce qu’une succession écologique est en cours sur un terrain rocheux dénudé?", "Des lichens et des mousses colonisent la roche et un sol mince commence à se former", ["Des arbres matures couvrent déjà tout le terrain depuis plusieurs générations", "Le terrain reste complètement nu, sans aucun organisme, année après année", "Un étang profond se forme au centre du terrain dès la première saison chaude"], "Les premiers signes de succession sur la roche nue sont les organismes pionniers (lichens et mousses) et le début de la formation du sol : sans sol, les étapes suivantes sont impossibles.", {});
  }
]), ["La succession est un changement d’espèces dans le temps, dans un ordre reconnaissable.", "Cherche le signe qui montre un début de changement, pas un état final."]);
E("s7f-u1-succession-types", 1, ["SC7.1.10"], 2, "var", varset([
  function () {
    return mcq("Un feu de forêt détruit les arbres d’une pente, mais le sol et quelques racines survivent. La repousse qui suit est un exemple de", "succession secondaire, car le sol est déjà présent au départ", ["succession primaire, car tout recommence à partir de la roche nue", "succession secondaire, car elle commence sur une surface sans aucun sol", "succession primaire, car le feu a laissé des racines vivantes dans le sol"], "Quand un sol formé et des organismes survivent à la perturbation, la repousse est une succession secondaire. La succession primaire commence sur une surface sans sol, comme la roche nue.", {});
  },
  function () {
    return mcq("Une coulée de lave refroidie forme une surface de roche neuve, sans sol. Les lichens qui s’y installent commencent une", "succession primaire, car elle commence sur une surface sans sol", ["succession secondaire, car elle commence sur une surface sans sol", "succession primaire, car le sol profond est déjà présent au départ", "succession secondaire, car des racines survivent déjà dans la roche"], "Sans sol au départ, les lichens pionniers amorcent une succession primaire : ils contribuent à former le premier sol.", {});
  }
]), ["Une seule question décide du type : y a-t-il un sol au départ?", "Sol présent : secondaire. Aucun sol : primaire."]);
E("s7f-u1-cr-succession-compare", 1, ["SC7.1.10"], 2, "var", varset([
  function () {
    return textq("Un terrain A est une carrière de roche abandonnée, sans sol. Un terrain B est une forêt rasée par le feu, dont le sol est intact. Compare la succession qui se déroulera sur chaque terrain : dis quel type de succession aura lieu sur chacun et pourquoi l’un des terrains atteindra l’étape forestière beaucoup plus vite que l’autre. (2 points)", ["terrain A : succession primaire, car il n’y a pas de sol; la formation du sol prend très longtemps", "terrain B : succession secondaire, car le sol survit; la repousse est beaucoup plus rapide"], "<b>Réponse modèle :</b> Sur le terrain A, la succession est primaire : elle commence sur la roche nue, sans sol, et les organismes pionniers doivent d’abord contribuer à former un sol, ce qui prend très longtemps avant que des arbustes et des arbres puissent s’installer. Sur le terrain B, la succession est secondaire : le sol, avec ses nutriments et ses graines, a survécu au feu, donc les plantes repoussent vite et l’étape forestière revient beaucoup plus rapidement.<br><br><b>Points d’attribution :</b> 1 point pour le terrain A : succession primaire, liée à l’absence de sol. 1 point pour le terrain B : succession secondaire, liée au sol intact et à la repousse plus rapide.", {});
  }
]), ["Applique le même test aux deux terrains : le sol est-il présent au départ?", "La vitesse de la succession dépend surtout du travail de formation du sol déjà fait ou non."]);

/* Ajout du 19 novembre 2026 : comble l’écart de dénomination des
   réponses construites du Test 3 de l’unité 1 dans le plan d’épreuves.
   Le test ne porte que sur SC7.1.10, dont le bassin ne contenait qu’une
   réponse construite de 2 points contre une cible de 3 points. Voir
   Spec-French-Test-Map-2026-11-19.md, section 4. */
E("s7f-u1-cr-succession-signs", 1, ["SC7.1.10"], 2, "var", varset([
  function () {
    return textq("Sur une dune de sable nouvellement formée au bord de la mer, on observe d’abord quelques herbes éparses. Des années plus tard, des arbustes y poussent, et plus tard encore, de petits arbres apparaissent du côté abrité du vent. (a) Nomme le type de succession en cours et justifie ta réponse. (b) Explique comment les herbes rendent possible l’arrivée des arbustes. (c) Explique pourquoi les arbres apparaissent seulement à la fin. (3 points)",
      ["(a) Succession primaire : la dune est une surface neuve, sans sol au départ.",
       "(b) Les herbes retiennent le sable, et leurs racines et leurs restes morts commencent à former un sol qui garde l’eau et les nutriments dont les arbustes ont besoin.",
       "(c) Les arbres exigent un sol plus profond et plus riche; il faut le temps que les étapes précédentes le construisent."],
      "<b>Réponse modèle :</b> (a) C’est une succession primaire : la dune est une surface nouvellement formée, sans sol; la vie doit s’y installer à partir du sable nu. (b) Les herbes sont les organismes pionniers de la dune : leurs racines retiennent le sable et empêchent le vent de tout emporter, et leurs restes morts, en se décomposant, commencent à former un sol qui retient l’eau et les nutriments. C’est ce début de sol qui permet aux arbustes de s’enraciner. (c) Les arbres demandent un sol plus profond, plus riche et plus stable que le sable des débuts. Ce sol n’existe qu’après des années de travail des herbes puis des arbustes, donc les arbres ne peuvent apparaître qu’à la fin de la séquence.<br><br><b>Points d’attribution :</b> 1 point pour la succession primaire, justifiée par l’absence de sol au départ. 1 point pour le rôle des herbes : retenir le sable et amorcer la formation du sol. 1 point pour les arbres en dernier, liés au sol profond et riche construit par les étapes précédentes.", {});
  },
  function () {
    return textq("Un glacier recule lentement et laisse derrière lui une surface de roche nue. Près du glacier, on ne trouve que des lichens et des mousses; un peu plus loin, des herbes et des arbustes; et encore plus loin, une jeune forêt. (a) Nomme le type de succession en cours et justifie ta réponse. (b) Explique pourquoi les organismes changent ainsi avec la distance au glacier. (c) Explique le rôle des lichens dans l’apparition éventuelle de la forêt. (3 points)",
      ["(a) Succession primaire : la roche laissée par le glacier est une surface sans sol.",
       "(b) La roche loin du glacier est exposée depuis plus longtemps : son sol est plus développé, donc des espèces plus exigeantes peuvent y vivre; la distance au glacier reflète le temps écoulé depuis le début de la succession.",
       "(c) Les lichens, organismes pionniers, colonisent la roche nue et contribuent à la désagréger et à former le premier sol, sans lequel ni les herbes, ni les arbustes, ni la forêt ne peuvent s’installer."],
      "<b>Réponse modèle :</b> (a) C’est une succession primaire : le glacier laisse une surface de roche nue, sans aucun sol, et la colonisation recommence à zéro. (b) Plus on s’éloigne du glacier, plus la surface est exposée depuis longtemps. Le sol y est donc plus épais et plus riche, formé par les étapes déjà franchies, ce qui permet à des espèces plus exigeantes, herbes, arbustes puis arbres, de s’y installer. La distance au glacier est en fait une échelle de temps. (c) Les lichens sont les pionniers : ils vivent sur la roche nue, la désagrègent peu à peu et, en mourant, fournissent la matière des premiers sols. Sans ce premier sol, aucune des étapes suivantes, jusqu’à la forêt, ne serait possible.<br><br><b>Points d’attribution :</b> 1 point pour la succession primaire, justifiée par la roche sans sol. 1 point pour le lien entre la distance, le temps d’exposition et le développement du sol. 1 point pour le rôle des lichens pionniers dans la formation du premier sol.", {});
  }
]), ["Une seule question décide du type : y a-t-il un sol au départ?", "Chaque étape prépare le sol dont la suivante a besoin."]);

/* ---------- SC7.2.1 Termes scientifiques pertinents ---------- */
E("s7f-u1-term-context", 1, ["SC7.2.1"], 1, "var", varset([
  function () {
    return mcq("Une élève décrit un étang en disant que « les bibittes mangent les plantes vertes ». Quelle reformulation utilise des termes scientifiques pertinents?", "« Les consommateurs se nourrissent des producteurs de l’étang. »", ["« Les petites choses mangent les affaires vertes de l’étang. »", "« Les bibittes dévorent tout le vert qui pousse dans l’étang. »", "« Les créatures grignotent les plantes de l’étang le matin. »"], "Les termes scientifiques pertinents nomment précisément les rôles : les consommateurs se nourrissent des producteurs. Les autres formulations restent vagues ou familières.", {});
  },
  function () {
    return mcq("Pourquoi les scientifiques préfèrent-ils le terme « facteur abiotique » à une expression comme « les choses non vivantes du coin »?", "Parce que le terme scientifique a un sens précis, compris de la même façon par tous", ["Parce que le terme scientifique est plus long et semble plus impressionnant", "Parce que le terme scientifique cache le sens aux personnes non scientifiques", "Parce que le terme scientifique change de sens selon la personne qui l’emploie"], "Un terme scientifique pertinent est choisi pour son sens précis et partagé : tout le monde comprend la même chose, ce qui rend la communication exacte.", {});
  }
]), ["Cherche la formulation où chaque mot a un sens scientifique précis.", "La précision partagée est la raison d’être des termes scientifiques."]);
E("s7f-u1-organization-set", 1, ["SC7.2.1"], 2, "var", varset([
  function () {
    var q = mcq("Dans les schémas, quel panneau montre une COMMUNAUTÉ d’un écosystème de tourbière?", "Le panneau C, le lynx avec les lièvres et les épinettes réunis", ["Le panneau A, un seul lynx montré seul dans son cadre", "Le panneau B, un groupe de lynx de la même espèce", "Le panneau D, la scène complète avec l’étang et le soleil"], "Une communauté réunit toutes les populations d’espèces différentes d’un endroit : le lynx, les lièvres et les épinettes du panneau C. Le panneau A montre un organisme, le B une population, et le D l’écosystème entier, facteurs abiotiques compris.", {}); q.figure = S7F_ORG_SVG; return q;
  },
  function () {
    var q = mcq("Dans les schémas, quel panneau montre une POPULATION de lynx?", "Le panneau B, un groupe de lynx de la même espèce", ["Le panneau A, un seul lynx montré seul dans son cadre", "Le panneau C, le lynx avec les lièvres et les épinettes", "Le panneau D, la scène complète avec l’étang et le soleil"], "Une population est l’ensemble des individus d’une même espèce dans un endroit : les lynx du panneau B. Le panneau A ne montre qu’un organisme.", {}); q.figure = S7F_ORG_SVG; return q;
  }
]), ["Organisme, population, communauté, écosystème : chaque panneau ajoute un niveau.", "La communauté contient plusieurs espèces, mais pas les facteurs abiotiques."]);

/* ---------- SC7.2.2 Le reseau alimentaire comme outil ---------- */
E("s7f-u1-web-chains", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Dans le réseau alimentaire du pré, quelle chaîne alimentaire complète peut-on lire dans le réseau?", "Herbe, puis sauterelle, puis grenouille, puis serpent", ["Trèfle, puis abeille, puis grenouille, puis serpent", "Herbe, puis souris, puis abeille, puis faucon", "Sauterelle, puis herbe, puis souris, puis faucon"], "Une chaîne tirée d’un réseau doit suivre les flèches du transfert d’énergie : l’herbe est mangée par la sauterelle, elle-même mangée par la grenouille, puis par le serpent. Les autres suites brisent au moins un lien réel du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_MEADOW); return q;
  },
  function () {
    var q = mcq("Dans le réseau alimentaire de l’étang, quel organisme est mangé par le héron selon le réseau?", "Le méné et la grenouille sont tous les deux mangés par le héron", ["La puce d’eau et l’escargot sont tous les deux mangés par le héron", "Les algues et les quenouilles sont toutes les deux mangées par le héron", "La libellule et l’escargot sont tous les deux mangés par le héron"], "Les flèches qui arrivent au héron viennent du méné et de la grenouille : ce sont ses proies dans ce réseau. Lire les flèches vers un organisme donne son menu.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  }
]), ["Un réseau alimentaire contient plusieurs chaînes; suis les flèches une à une.", "Les flèches pointent vers l’organisme qui reçoit l’énergie, donc vers le mangeur."]);
E("s7f-u1-web-predict", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = mcq("Un hiver très doux fait doubler la population de souris dans le pré du réseau. Quelle prédiction est la mieux appuyée par le réseau?", "Les serpents et les faucons auront plus de nourriture, et les sauterelles seront moins mangées par les souris", ["Les abeilles disparaîtront, car les souris mangent tout le trèfle du pré en une saison", "Les grenouilles augmenteront, car les souris sont leur principale source de nourriture", "L’herbe disparaîtra, car les souris sont les seuls consommateurs du réseau entier"], "La souris est une proie du serpent et du faucon, et elle mange l’herbe et les sauterelles. Plus de souris signifie plus de nourriture pour ses prédateurs et une pression différente sur ses proies : le réseau appuie cette prédiction, lien par lien.", {}); q.figure = s7fWebQ(S7F_WEB_MEADOW); return q;
  }
]), ["Pars de la souris : qui la mange, et qu’est-ce qu’elle mange?", "Une bonne prédiction ne suit que des liens qui existent dans le réseau."]);
E("s7f-u1-cr-web-interpret", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = textq("Utilise le réseau alimentaire de la forêt comme outil d’interprétation. (a) Nomme un organisme qui joue à la fois le rôle de proie et de prédateur. (b) Explique ce que le réseau nous apprend sur ce qui arriverait aux écureuils si les martres disparaissaient. (3 points)", ["l’écureuil (ou le lièvre, ou la martre) est à la fois proie et prédateur", "sans martres, les écureuils perdent un prédateur et peuvent augmenter, même si les hiboux les chassent encore"], "<b>Réponse modèle :</b> (a) L’écureuil est à la fois une proie (du hibou et de la martre) et un prédateur (il mange les graines et les jeunes pousses du sapin). Le lièvre et la martre conviennent aussi. (b) Le réseau montre une flèche de l’écureuil vers la martre : la martre mange des écureuils. Sans martres, les écureuils perdent un de leurs prédateurs, donc leur population peut augmenter; le hibou continue toutefois de les chasser, ce que le réseau montre aussi.<br><br><b>Points d’attribution :</b> 1 point pour un organisme correctement nommé comme proie et prédateur. 1 point pour la prédiction sur les écureuils sans les martres. 1 point pour l’explication appuyée sur les liens du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_FOREST); return q;
  }
]), ["Un organisme à la fois proie et prédateur a des flèches qui arrivent et qui partent.", "Pour la partie (b), pars du lien martre et écureuil, puis vérifie les autres prédateurs."]);

/* ---------- SC7.2.3 Sylviculture ---------- */
E("s7f-u1-silviculture-why", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Pourquoi la sylviculture a-t-elle été créée comme domaine de pratiques forestières?", "Parce que le besoin d’un approvisionnement continu en bois exigeait de gérer la repousse des forêts", ["Parce que le besoin de terrains de camping exigeait de dégager de grandes zones forestières", "Parce que le besoin de papier exigeait de remplacer toutes les forêts par des plantations", "Parce que le besoin de routes exigeait de couper les forêts le plus rapidement possible"], "La sylviculture est née du besoin d’un approvisionnement continu en bois : récolter aujourd’hui sans épuiser la forêt de demain exige de planifier la repousse et les soins aux jeunes peuplements.", {});
  },
  function () {
    return mcq("Lequel des énoncés décrit le mieux le but central de la sylviculture?", "Assurer la récolte du bois aujourd’hui tout en garantissant la forêt de demain", ["Assurer la récolte du bois aujourd’hui sans se soucier de la forêt de demain", "Assurer la protection des forêts en interdisant toute récolte de bois partout", "Assurer la conversion des forêts en terres agricoles le plus tôt possible"], "La sylviculture vise l’équilibre : récolter le bois dont la société a besoin tout en renouvelant la forêt pour que l’approvisionnement se poursuive.", {});
  }
]), ["Le mot clé est « continu » : le bois doit être là aujourd’hui et demain.", "Élimine les choix qui sacrifient entièrement un côté de l’équilibre."]);
E("s7f-u1-silviculture-practice", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle des pratiques suivantes relève de la sylviculture?", "Replanter des semis d’épinette sur un parterre de coupe et suivre leur croissance", ["Vendre le bois coupé au plus offrant sans planifier la suite du peuplement", "Brûler les résidus de coupe sans vérifier la repousse naturelle du secteur", "Construire un chemin forestier sans tenir compte des peuplements voisins"], "Replanter et suivre la croissance, c’est prendre soin de la prochaine forêt pendant qu’on récolte l’actuelle : c’est le cœur de la sylviculture.", {});
  },
  function () {
    return mcq("Un gestionnaire forestier réserve des bandes d’arbres non coupés le long d’un ruisseau et replante le secteur récolté. Cette démarche montre", "la sylviculture en action, car la récolte est planifiée avec le renouvellement de la forêt", ["la sylviculture en action, car aucun arbre n’est récolté dans le secteur entier", "une récolte sans sylviculture, car la replantation ne fait pas partie du travail", "une récolte sans sylviculture, car les bandes réservées empêchent toute gestion"], "Planifier la récolte, protéger le ruisseau et replanter : c’est la sylviculture, qui joint la récolte du bois au renouvellement de la forêt.", {});
  }
]), ["Cherche le choix où la récolte s’accompagne de soins à la forêt future.", "La sylviculture ne supprime pas la récolte; elle l’organise."]);
E("s7f-u1-cr-silviculture", 1, ["SC7.2.3"], 2, "var", varset([
  function () {
    return textq("Explique en quoi notre besoin d’un approvisionnement continu en bois a donné lieu à la création de la sylviculture. Ton explication doit nommer le problème que la coupe sans gestion posait et ce que la sylviculture fait différemment. (2 points)", ["sans gestion, la coupe épuise la forêt et l’approvisionnement futur n’est plus garanti", "la sylviculture planifie la récolte et le renouvellement (replantation, soins aux jeunes peuplements) pour que la forêt se régénère"], "<b>Réponse modèle :</b> Le bois sert à la construction, au papier et au chauffage, et ce besoin ne disparaît pas après une récolte. Si l’on coupe sans gérer la repousse, la forêt s’épuise et l’approvisionnement futur n’est plus assuré. La sylviculture répond à ce problème en planifiant ensemble la récolte et le renouvellement : replanter, éclaircir et soigner les jeunes peuplements pour que la forêt se régénère et continue de fournir du bois.<br><br><b>Points d’attribution :</b> 1 point pour le problème nommé (la coupe sans gestion épuise la forêt et menace l’approvisionnement continu). 1 point pour ce que la sylviculture fait différemment (planifier la récolte avec le renouvellement de la forêt).", {});
  }
]), ["Commence par le besoin : le bois doit revenir année après année.", "Nomme ensuite le changement de pratique : récolter et renouveler ensemble."]);

/* ---------- SC7.2.4 Decisions sur les techniques d'exploitation ---------- */
E("s7f-u1-harvest-effects", 1, ["SC7.2.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle des techniques de récolte forestière enlève tous les arbres d’un secteur en une seule opération?", "La coupe à blanc, qui enlève tous les arbres du secteur en une fois", ["La coupe sélective, qui enlève seulement certains arbres choisis du secteur", "La coupe par bandes, qui enlève les arbres d’une bande à la fois du secteur", "La coupe de jardinage, qui enlève quelques arbres dispersés dans le secteur"], "La coupe à blanc enlève tous les arbres d’un secteur en une seule opération. Les autres techniques n’en enlèvent qu’une partie à la fois.", {});
  },
  function () {
    return mcq("Quel est un avantage environnemental souvent associé à la coupe sélective par rapport à la coupe à blanc?", "Une partie du couvert forestier reste en place et continue d’abriter les espèces du secteur", ["Tous les arbres du secteur repoussent en même temps dès la saison suivante", "Le sol du secteur est entièrement exposé au soleil et au vent après la coupe", "Aucun chemin forestier n’est nécessaire pour sortir le bois récolté du secteur"], "En coupe sélective, une partie des arbres demeure : le couvert, l’ombre et une partie de l’habitat persistent, ce qui adoucit les effets sur les espèces du secteur.", {});
  }
]), ["Compare ce qui reste debout après chaque technique.", "L’avantage cherché concerne ce qui est conservé, pas la vitesse de la récolte."]);
E("s7f-u1-harvest-knowledge", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return mcq("Une pente abrupte au sol mince surplombe un ruisseau à truites. Quelle technique de récolte est la plus défendable pour ce secteur?", "La coupe sélective, qui garde un couvert et limite l’érosion du sol mince de la pente", ["La coupe à blanc, qui expose le sol mince de la pente au ruissellement vers le ruisseau", "La coupe par bandes larges, qui dénude la pente entière en quelques passages rapides", "La coupe à blanc suivie d’un brûlage, qui laisse la pente sans protection contre la pluie"], "Sur une pente au sol mince près d’un ruisseau, garder un couvert végétal limite l’érosion et protège l’eau : la coupe sélective est la plus défendable. Les autres choix exposent le sol et menacent le ruisseau.", {});
  },
  function () {
    return mcq("Quel facteur doit peser le plus lourd dans le choix d’une technique de récolte pour un secteur donné?", "Les caractéristiques du secteur, comme la pente, le sol, l’eau et les espèces présentes", ["La vitesse à laquelle les machines peuvent terminer le travail dans le secteur", "La quantité totale de bois que le secteur peut fournir en une seule saison", "La préférence habituelle de l’entreprise, quel que soit le secteur à récolter"], "Une décision avisée part du secteur lui-même : sa pente, son sol, ses cours d’eau et ses espèces déterminent quelle technique cause le moins de dommages tout en récoltant le bois.", {});
  }
]), ["Fais correspondre la technique aux conditions du secteur décrit.", "Une décision avisée compare les avantages et les inconvénients pour ce secteur précis."]);
E("s7f-u1-cr-harvest-decision", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return textq("Une entreprise propose une coupe à blanc sur un secteur plat au sol profond, loin des cours d’eau, où l’épinette repousse vite. Un groupe local s’y oppose et propose de ne rien couper. Prends une décision avisée : choisis une démarche, appuie-la sur UN avantage et UN inconvénient pour l’environnement, et dis ce qui rend ta décision raisonnable malgré l’inconvénient. (3 points)", ["une démarche choisie et tenue jusqu’au bout (par exemple coupe à blanc avec replantation, coupe par bandes, ou coupe sélective)", "un avantage environnemental ou lié à l’approvisionnement, et un inconvénient environnemental, tous deux réels", "une mesure qui réduit l’inconvénient (replantation, bandes tampons, suivi de la repousse)"], "<b>Réponse modèle :</b> Décision : autoriser la récolte par bandes avec replantation immédiate. Avantage : le secteur plat au sol profond, loin des cours d’eau, se prête à une récolte efficace qui maintient l’approvisionnement en bois, et la repousse rapide de l’épinette assure le renouvellement. Inconvénient : même par bandes, la récolte enlève un habitat et expose temporairement le sol. La décision reste raisonnable parce que la replantation immédiate, les bandes non coupées laissées comme abri et le suivi de la repousse réduisent l’inconvénient, tandis que ne rien couper déplacerait simplement la récolte vers un secteur peut-être plus fragile.<br><br><b>Points d’attribution :</b> 1 point pour une décision claire et tenue. 1 point pour un avantage et un inconvénient réels pour l’environnement. 1 point pour la mesure qui rend la décision raisonnable malgré l’inconvénient.", {});
  }
]), ["Une décision avisée ne prétend pas qu’il n’y a aucun inconvénient.", "Nommer une mesure concrète (replanter, laisser des bandes) renforce une décision."]);

/* ---------- SC7.2.5 Ecologie de la foret boreale ---------- */
E("s7f-u1-boreal-practice", 1, ["SC7.2.5"], 1, "var", varset([
  function () {
    return mcq("La compréhension de l’écologie de la forêt boréale a conduit à récolter par parcelles de tailles variées qui imitent les trouées laissées par les feux naturels. Quel effet positif cette méthode cherche-t-elle?", "Conserver une mosaïque d’habitats d’âges différents, comme le fait le feu naturel dans la forêt boréale", ["Éliminer complètement les effets des feux naturels sur la composition de la forêt boréale", "Produire une forêt d’un seul âge et d’une seule essence sur tout le territoire récolté", "Empêcher toute repousse après la récolte afin de garder les parcelles ouvertes longtemps"], "La forêt boréale se renouvelle naturellement par le feu, qui crée des trouées variées. Imiter cette mosaïque conserve des habitats d’âges différents pour les espèces qui en dépendent.", {});
  },
  function () {
    return mcq("Quel exemple montre une méthode d’exploitation forestière influencée par l’écologie de la forêt boréale?", "Laisser des arbres semenciers et des chicots debout dans les parterres de coupe pour la faune", ["Enlever chaque arbre mort ou vivant du parterre pour ne laisser qu’un sol entièrement nu", "Planter une seule essence exotique à croissance rapide sur tous les parterres de coupe", "Récolter sans tenir compte des cycles naturels de feu qui renouvellent la forêt boréale"], "Laisser des arbres semenciers et des chicots (arbres morts debout) imite ce que le feu laisse derrière lui et sert la faune : c’est l’écologie de la forêt boréale appliquée à la récolte.", {});
  }
]), ["Demande-toi ce que le feu naturel laisse derrière lui dans la forêt boréale.", "La méthode cherchée copie un processus naturel au lieu de l’effacer."]);
E("s7f-u1-boreal-effects", 1, ["SC7.2.5"], 2, "var", varset([
  function () {
    return mcq("Pourquoi laisser des bandes de forêt intacte entre les parterres de coupe aide-t-il les espèces de la forêt boréale?", "Parce que ces bandes servent de corridors et de refuges pendant que les parterres coupés repoussent", ["Parce que ces bandes empêchent définitivement toute repousse dans les parterres coupés", "Parce que ces bandes remplacent complètement les habitats des parterres coupés pour toujours", "Parce que ces bandes augmentent la température du sol dans les parterres coupés voisins"], "Les bandes intactes gardent un habitat mature, un abri et des passages pour les espèces pendant la repousse des parterres : c’est un effet positif direct d’une récolte inspirée de l’écologie boréale.", {});
  }
]), ["Pense à ce dont une espèce a besoin pendant les années de repousse.", "Refuge et corridor : les deux mots décrivent le travail des bandes."]);
E("s7f-u1-cr-boreal-example", 1, ["SC7.2.5"], 3, "var", varset([
  function () {
    return textq("Donne UN exemple précis d’une méthode d’exploitation forestière qui découle de notre compréhension de l’écologie de la forêt boréale, et explique l’effet positif de cette méthode sur la forêt. (3 points)", ["un exemple précis (par exemple récolte par parcelles imitant les trouées de feu, arbres semenciers laissés sur place, bandes tampons le long des cours d’eau)", "le lien avec l’écologie boréale (le feu renouvelle la forêt, les espèces dépendent d’habitats d’âges variés)", "l’effet positif expliqué (mosaïque d’habitats, refuges, régénération assurée)"], "<b>Réponse modèle :</b> Exemple : récolter la forêt boréale par parcelles de tailles variées qui imitent les trouées laissées par les feux naturels, en laissant des arbres semenciers debout dans chaque parcelle. Lien avec l’écologie : la forêt boréale se renouvelle par le feu, et ses espèces sont adaptées à une mosaïque de peuplements d’âges différents. Effet positif : la mosaïque est conservée, les arbres semenciers assurent la régénération naturelle, et les espèces gardent des habitats de chaque âge au lieu d’un territoire uniforme.<br><br><b>Points d’attribution :</b> 1 point pour un exemple précis de méthode. 1 point pour le lien avec l’écologie de la forêt boréale. 1 point pour l’effet positif expliqué.", {});
  }
]), ["Choisis une méthode que tu peux décrire en une phrase précise.", "Enchaîne : la méthode copie un processus naturel, donc elle produit un effet précis."]);

/* ---------- SC7.2.6 Carrieres forestieres ---------- */
E("s7f-u1-career-match", 1, ["SC7.2.6"], 1, "var", varset([
  function () {
    return mcq("Qui, dans le domaine forestier, a pour travail de planifier où et comment les arbres seront récoltés et replantés?", "Le technicien forestier qui planifie les récoltes et les replantations du territoire", ["Le conducteur de machinerie qui transporte les billes de bois vers la scierie", "Le cuisinier du camp forestier qui prépare les repas des équipes de récolte", "Le mécanicien d’atelier qui répare les scies et les moteurs des machines"], "La planification des récoltes et des replantations est le travail des techniciens et des forestiers professionnels en gestion forestière.", {});
  },
  function () {
    return mcq("Laquelle des carrières suivantes appartient au domaine de la gestion et de l’exploitation forestières?", "Biologiste de la faune qui étudie les habitats dans les secteurs de récolte forestière", ["Biologiste marin qui étudie les populations de poissons dans les eaux côtières", "Météorologue qui prépare les prévisions du temps pour les bulletins quotidiens", "Architecte qui dessine les plans de bâtiments pour les entreprises de construction"], "Le biologiste de la faune qui travaille sur les habitats des secteurs de récolte fait partie des carrières liées à la gestion forestière.", {});
  }
]), ["Relie chaque carrière au lieu et à l’objet de son travail.", "La carrière cherchée travaille avec la forêt gérée ou récoltée."]);
E("s7f-u1-career-scenario", 1, ["SC7.2.6"], 2, "var", varset([
  function () {
    return mcq("Une personne passe ses journées à mesurer la croissance des jeunes peuplements, à vérifier la repousse après la coupe et à consigner les données pour les plans de gestion. Quelle carrière exerce-t-elle?", "Technicienne forestière chargée du suivi de la repousse des peuplements récoltés", ["Operatrice de machinerie chargée de la coupe des arbres des peuplements matures", "Conductrice de camion chargée du transport des billes vers l’usine de transformation", "Cuisinière de camp chargée des repas des équipes qui travaillent en forêt éloignée"], "Mesurer la croissance, vérifier la repousse et alimenter les plans de gestion : c’est le suivi sylvicole du technicien forestier.", {});
  }
]), ["Les gestes décrits (mesurer, vérifier, consigner) désignent la carrière.", "Ce travail se fait après la coupe, pour la forêt qui revient."]);

/* ---------- SC7.2.7 Defendre un plan d'action pour un habitat ---------- */
E("s7f-u1-habitat-influences", 1, ["SC7.2.7"], 1, "var", varset([
  function () {
    return mcq("Pour défendre la protection de l’habitat local d’un organisme, quel argument repose sur des faits écologiques plutôt que sur une préférence personnelle?", "« Sans les milieux humides du secteur, cette espèce n’a aucun autre lieu où se reproduire près d’ici. »", ["« Je préfère garder ce secteur intact parce que j’aime m’y promener la fin de semaine. »", "« Ce secteur devrait rester intact parce qu’il a toujours été comme cela dans le passé. »", "« Les gens du voisinage aiment ce secteur et ne veulent pas qu’il change du tout. »"], "L’argument écologique nomme un besoin précis de l’espèce (un lieu de reproduction sans solution de rechange) : il peut être vérifié et défendu. Les autres énoncés expriment des préférences ou des habitudes.", {});
  },
  function () {
    return mcq("Quel élément renforce le plus un plan d’action pour protéger l’habitat d’une espèce locale?", "Des observations consignées qui montrent comment l’espèce utilise l’habitat menacé", ["Des opinions recueillies auprès de personnes qui visitent rarement le secteur", "Une pétition signée par des personnes qui ne connaissent pas l’espèce visée", "Une description générale des habitats semblables dans d’autres provinces"], "Un plan défendable s’appuie sur des observations directes de l’espèce dans l’habitat en cause : c’est la preuve que le plan répond à un besoin réel.", {});
  }
]), ["Cherche l’énoncé qui pourrait être vérifié par l’observation.", "Un plan d’action se défend avec des faits sur l’espèce et son habitat."]);
E("s7f-u1-habitat-tradeoffs", 1, ["SC7.2.7"], 2, "var", varset([
  function () {
    return mcq("Un promoteur veut drainer un milieu humide où nichent des canards pour y construire un stationnement. Quel plan d’action protège l’habitat tout en répondant au besoin de stationnement?", "Construire le stationnement sur le terrain sec voisin et conserver le milieu humide intact", ["Drainer le milieu humide et promettre de creuser un étang ailleurs dans quelques années", "Construire le stationnement sur le milieu humide en gardant une petite mare décorative", "Abandonner le stationnement et interdire tout accès du public au secteur entier"], "Déplacer le projet sur le terrain sec répond au besoin de stationnement sans détruire l’habitat de nidification : c’est un plan d’action défendable, car il protège l’habitat visé au lieu de le remplacer plus tard.", {});
  }
]), ["Le bon plan satisfait les deux besoins au lieu d’en sacrifier un.", "Un habitat remplacé plus tard ne protège pas l’espèce maintenant."]);
E("s7f-u1-cr-habitat-defence", 1, ["SC7.2.7"], 3, "var", varset([
  function () {
    return textq("Choisis un organisme local et un habitat dont il dépend. Propose un plan d’action pour protéger cet habitat et défends ton plan avec DEUX raisons fondées sur les besoins de l’organisme. (3 points)", ["un organisme et son habitat nommés, avec le lien de dépendance", "un plan d’action concret (par exemple zone protégée, bande tampon, restriction saisonnière)", "deux raisons liées aux besoins de l’organisme (reproduction, nourriture, abri)"], "<b>Réponse modèle :</b> Organisme et habitat : le pluvier siffleur, qui niche sur les plages de sable et de galets. Plan d’action : fermer la section de plage où les pluviers nichent pendant la saison de nidification, avec des affiches qui expliquent la fermeture. Défense : premièrement, les nids sont posés à même le sol et presque invisibles, donc les marcheurs et les véhicules les détruisent sans le savoir; la fermeture protège directement la reproduction. Deuxièmement, les adultes ont besoin d’un accès tranquille au rivage pour nourrir leurs petits; une plage achalandée les éloigne de leur nourriture.<br><br><b>Points d’attribution :</b> 1 point pour l’organisme, l’habitat et leur lien de dépendance. 1 point pour un plan d’action concret. 1 point pour deux raisons fondées sur les besoins de l’organisme.", {});
  }
]), ["Choisis un organisme dont tu connais un besoin précis (nicher, se nourrir, s’abriter).", "Chaque raison doit répondre à la question : qu’arriverait-il à l’organisme sans ce plan?"]);

/* ---------- SC7.2.8 Groupes qui protegent l'environnement ---------- */
E("s7f-u1-groups-match", 1, ["SC7.2.8"], 1, "var", varset([
  function () {
    return mcq("Une élève fait une recherche sur les personnes et les groupes au Canada qui protègent l’environnement. Laquelle des sources suivantes convient le mieux pour trouver un groupe LOCAL?", "Le site d’un groupe communautaire de protection d’un bassin versant de sa région", ["Le site d’une organisation internationale dont le siège est dans un autre pays", "Un article général sur l’histoire de l’environnement dans le monde entier", "Le catalogue d’un magasin qui vend de l’équipement de plein air au Canada"], "Un groupe communautaire de bassin versant agit localement : c’est une source directe sur les personnes et les groupes de protection près de chez elle.", {});
  },
  function () {
    return mcq("Quel ensemble de sources couvre les niveaux local, national et international demandés pour une recherche sur la protection de l’environnement?", "Un groupe local de rivière, un organisme national canadien et une organisation mondiale", ["Trois groupes locaux de rivière situés dans la même région que l’élève", "Trois organisations mondiales dont les sièges sont dans trois autres pays", "Un groupe local, un magasin de plein air et un bulletin de prévisions météo"], "La recherche couvre trois niveaux : un groupe local, un organisme national et une organisation internationale. Les autres ensembles répètent un seul niveau ou ajoutent des sources hors sujet.", {});
  }
]), ["La recherche demande trois niveaux : local, national et international.", "Vérifie que chaque source parle bien de protection de l’environnement."]);
E("s7f-u1-groups-interest", 1, ["SC7.2.8"], 2, "var", varset([
  function () {
    return mcq("Un groupe national publie un rapport sur la disparition des milieux humides, et un groupe local organise le nettoyage d’un ruisseau. Quel énoncé compare correctement leur travail?", "Le groupe national documente le problème à grande échelle pendant que le groupe local agit directement sur le terrain", ["Le groupe national agit directement sur le terrain pendant que le groupe local documente le problème mondial", "Les deux groupes font exactement le même travail, seulement dans des bureaux de tailles différentes", "Aucun des deux groupes ne s’occupe de protection de l’environnement dans son travail quotidien"], "Les organismes nationaux étudient et signalent les problèmes à l’échelle du pays, tandis que les groupes locaux mènent des actions directes dans leur milieu : les deux niveaux se complètent.", {});
  }
]), ["Compare l’échelle de chaque groupe : le pays entier contre un seul ruisseau.", "Les deux groupes protègent l’environnement, mais pas de la même façon."]);

/* ---------- SC7.3.1 Definir des questions ---------- */
E("s7f-u1-question-identify", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle des questions suivantes porte directement sur un écosystème local et peut guider une exploration sur le terrain?", "« Quels types d’espèces vivent dans le marais derrière l’école ce printemps? »", ["« Pourquoi les marais sont-ils importants pour la planète en général? »", "« Quelle est la plus belle saison pour visiter un marais de la région? »", "« Depuis combien d’années le marais derrière l’école existe-t-il ici? »"], "La question sur les espèces présentes dans ce marais, ce printemps, porte sur un écosystème local précis et se répond par l’observation sur le terrain.", {});
  },
  function () {
    return mcq("Un élève veut formuler une question d’exploration sur l’étang du parc. Laquelle est la mieux définie pour commencer?", "« Quelles espèces d’oiseaux visitent l’étang du parc pendant le mois de mai? »", ["« Qu’est-ce qui rend les étangs intéressants pour les gens du quartier? »", "« Comment les étangs du monde entier changent-ils avec les saisons? »", "« Pourquoi l’étang du parc est-il le plus beau de toute la ville? »"], "La question nomme le lieu (l’étang du parc), le sujet (les espèces d’oiseaux) et la période (mai) : elle est définie et peut guider une exploration.", {});
  }
]), ["Une bonne question d’exploration nomme le lieu et ce qu’on va y observer.", "Élimine les questions d’opinion et les questions trop vastes pour un terrain."]);
E("s7f-u1-question-identify-2", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle des questions suivantes est une question d’exploration sur un écosystème local, et non une question de fait général?", "« Combien d’espèces de plantes poussent le long du sentier de la rivière cette semaine? »", ["« Combien d’espèces de plantes existe-t-il sur la Terre à l’heure actuelle? »", "« Quelle plante apparaît sur le drapeau de la province cette année? »", "« Pourquoi les plantes ont-elles évolué sur la Terre il y a longtemps? »"], "Compter les espèces le long d’un sentier précis, cette semaine, est une exploration locale qu’on peut réaliser par l’observation. Les autres questions sont générales ou historiques.", {});
  }
]), ["Cherche la question à laquelle on répond en allant observer un lieu précis.", "Un lieu et un moment nommés rendent la question locale."]);
E("s7f-u1-question-best", 1, ["SC7.3.1"], 2, "var", varset([
  function () {
    return mcq("Une équipe veut savoir si les oiseaux utilisent davantage le côté ensoleillé ou le côté ombragé d’un boisé. Quelle question d’exploration est la mieux formulée?", "« Combien d’oiseaux observe-t-on de chaque côté du boisé pendant des périodes égales? »", ["« Pourquoi les oiseaux préfèrent-ils certains côtés des boisés en général? »", "« Les oiseaux aiment-ils mieux le soleil ou l’ombre, en fin de compte? »", "« Quels oiseaux vivent dans les boisés de la province cette année? »"], "La question gagnante se mesure : compter les oiseaux des deux côtés pendant des périodes égales donne des données qui répondent directement à ce que l’équipe veut savoir.", {});
  }
]), ["La meilleure question est celle à laquelle des observations comptées peuvent répondre.", "Compare les questions : une seule précise quoi compter et où."]);

/* ---------- SC7.3.2 Delimiter des questions ---------- */
E("s7f-u1-delimit-choose", 1, ["SC7.3.2"], 1, "var", varset([
  function () {
    return mcq("La question « Qu’est-ce qui vit dans la forêt? » est trop vaste pour une exploration. Quelle reformulation la délimite correctement?", "« Quelles espèces d’arbres poussent dans le boisé derrière l’école, sur une parcelle de 10 m sur 10 m? »", ["« Quelles espèces vivent dans les forêts de la province pendant toute l’année en cours? »", "« Pourquoi la forêt derrière l’école est-elle importante pour tout le monde du quartier? »", "« Comment les forêts du Canada ont-elles changé depuis les cent dernières années? »"], "Délimiter, c’est réduire la question à un lieu, un sujet et une étendue qu’une équipe peut vraiment explorer : ici, les arbres d’une parcelle précise du boisé de l’école.", {});
  },
  function () {
    return mcq("Que fait-on quand on délimite une question d’exploration?", "On la réduit à un lieu, un sujet et une étendue qu’on peut vraiment explorer", ["On l’élargit pour couvrir le plus grand nombre de sujets et de lieux possible", "On la transforme en opinion que l’équipe défendra pendant la présentation", "On la remplace par une réponse trouvée dans un livre avant l’exploration"], "Délimiter une question, c’est en fixer les frontières : un lieu précis, un sujet précis et une étendue réalisable.", {});
  }
]), ["Délimiter veut dire rétrécir de façon précise, pas élargir.", "Cherche le lieu, le sujet et l’étendue nommés dans la formulation."]);
E("s7f-u1-delimit-rewrite", 1, ["SC7.3.2"], 2, "var", varset([
  function () {
    return mcq("« Comment les animaux utilisent-ils la rivière? » Quelle version délimitée permettrait une exploration d’une journée?", "« Quels animaux laissent des traces sur la rive boueuse du pont au sentier, entre 9 h et midi? »", ["« Quels animaux ont utilisé les rivières de la région pendant les dix dernières années? »", "« Pourquoi les animaux des rivières sont-ils importants pour les écosystèmes du pays? »", "« Comment chaque animal de la province utilise-t-il l’eau des rivières au printemps? »"], "La version délimitée fixe le lieu (du pont au sentier), la preuve cherchée (les traces) et la période (une matinée) : une équipe peut la réaliser en une journée.", {});
  }
]), ["Une journée d’exploration impose un lieu court et une période courte.", "La preuve observable (les traces) rend la question réalisable."]);

/* ---------- SC7.3.3 Organiser et consigner les donnees ---------- */
E("s7f-u1-instrument-choose", 1, ["SC7.3.3"], 1, "var", varset([
  function () {
    return mcq("Pour mesurer la température de l’eau d’un étang pendant une exploration, quel instrument convient le mieux?", "Un thermomètre plongé dans l’eau à l’ombre pendant quelques minutes", ["Un baromètre posé sur la rive pour mesurer la pression de l’air ambiant", "Une règle graduée tenue au-dessus de l’eau pour estimer sa profondeur", "Un anémomètre tourné vers le vent pour mesurer la vitesse des rafales"], "La température de l’eau se mesure avec un thermomètre placé dans l’eau. Les autres instruments mesurent la pression, une longueur ou le vent.", {});
  },
  function () {
    return mcq("Pour consigner l’étendue d’une flaque de tourbière, quel instrument convient le mieux?", "Un ruban à mesurer étendu le long du plus grand diamètre de la flaque", ["Un thermomètre plongé dans la flaque pour mesurer sa température", "Un hygromètre tenu au-dessus de la flaque pour mesurer l’humidité", "Un baromètre posé près de la flaque pour mesurer la pression d’air"], "Une étendue est une longueur : elle se mesure au ruban à mesurer. Chaque instrument correspond à une grandeur précise.", {});
  }
]), ["Nomme la grandeur à mesurer, puis choisis l’instrument de cette grandeur.", "Un instrument juste donne une mesure exacte et utilisable."]);
E("s7f-u1-record-format", 1, ["SC7.3.3"], 2, "var", varset([
  function () {
    return mcq("Une équipe compte les oiseaux à quatre stations d’un boisé, à trois moments de la journée. Quel format de consignation garde les données organisées et exactes?", "Un tableau avec une ligne par station et une colonne par moment d’observation", ["Un paragraphe rédigé le soir, de mémoire, sur l’ensemble de la journée passée", "Une liste de nombres sans étiquettes, écrite au fur et à mesure des observations", "Un dessin du boisé avec les totaux de la journée inscrits dans un coin du papier"], "Un tableau étiqueté (stations en lignes, moments en colonnes) conserve chaque comptage à sa place : les données restent organisées, exactes et comparables.", {});
  },
  function () {
    return mcq("Pourquoi consigner les mesures au moment même où on les prend, plutôt que le soir de mémoire?", "Parce que les valeurs exactes et les conditions du moment seraient vite oubliées ou confondues", ["Parce que les instruments cessent de fonctionner quand on attend trop longtemps", "Parce que les tableaux remplis sur le terrain comptent double dans les résultats", "Parce que les observations du soir sont toujours considérées comme des opinions"], "Consigner sur-le-champ préserve les valeurs exactes et les conditions (heure, météo) : la mémoire mélange vite les stations et les moments.", {});
  }
]), ["Le bon format associe chaque valeur à son lieu et à son moment.", "Pense à ce qui se perd quand on attend : l’exactitude."]);
E("s7f-u1-record-plan", 1, ["SC7.3.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe mesurera le pH de l’eau à cinq endroits d’un ruisseau. Quel plan de consignation est le plus rigoureux?", "Préparer à l’avance un tableau étiqueté par endroit, avec colonnes pour le pH, l’heure et les conditions", ["Noter les résultats sur des bouts de papier séparés et les rassembler à la fin du trimestre", "Retener la valeur la plus surprenante et la rapporter comme résultat de l’équipe", "Écrire un résumé en phrases complètes après avoir jeté les mesures brutes du terrain"], "Un tableau préparé à l’avance, avec une ligne par endroit et des colonnes pour la mesure, l’heure et les conditions, garantit des données complètes, exactes et comparables.", {});
  }
]), ["Un plan rigoureux se prépare avant de partir, pas après.", "Heure et conditions font partie de la donnée, pas du décor."]);

/* ---------- SC7.3.4 Communiquer ---------- */
E("s7f-u1-communicate-format", 1, ["SC7.3.4"], 1, "var", varset([
  function () {
    return mcq("Une équipe veut communiquer ses résultats de comptage d’oiseaux à la classe. Quel moyen convient le mieux pour montrer les nombres recueillis?", "Un tableau ou un graphique qui présente les comptages par station et par moment", ["Un récit oral qui raconte la journée sans présenter les nombres recueillis", "Une affiche de photos du boisé sans aucun résultat de comptage indiqué", "Une liste de questions que l’équipe aimerait explorer l’année prochaine"], "Des résultats chiffrés se communiquent par un tableau ou un graphique : le lecteur y voit les valeurs et peut les comparer.", {});
  },
  function () {
    return mcq("Pour communiquer un plan d’exploration avant de partir, quel format est le plus utile à l’équipe?", "Une liste claire des étapes, du matériel et des rôles de chaque membre de l’équipe", ["Un long paragraphe qui raconte pourquoi l’équipe aime le sujet choisi", "Un dessin du lieu sans aucune indication des étapes ou du matériel", "Un résumé des résultats obtenus lors d’une exploration de l’an passé"], "Un plan se communique par une liste organisée : étapes, matériel et rôles. Chacun sait quoi faire avant le départ.", {});
  }
]), ["Fais correspondre le format au contenu : des nombres demandent un tableau ou un graphique.", "Communiquer, c’est rendre l’information utilisable par son lecteur."]);
E("s7f-u1-communicate-judge", 1, ["SC7.3.4"], 2, "var", varset([
  function () {
    return mcq("Une équipe présente ses résultats dans un texte continu de deux pages où les mesures sont noyées dans les phrases. Quelle amélioration rendrait la communication nettement meilleure?", "Sortir les mesures dans un tableau étiqueté et garder le texte pour l’interprétation des résultats", ["Allonger le texte à quatre pages pour ajouter encore plus de détails au récit", "Remplacer toutes les mesures par des impressions générales sur la journée passée", "Lire le texte à voix haute à la classe au lieu de le distribuer aux élèves"], "Un tableau étiqueté rend les mesures lisibles et comparables; le texte sert alors à interpréter. Séparer les données de l’interprétation est le cœur d’une bonne communication de résultats.", {});
  }
]), ["Juge la communication du point de vue du lecteur : peut-il retrouver les valeurs?", "Données dans un tableau, sens dans le texte."]);

/* ---------- SC7.3.6 Evaluer les processus de groupe ---------- */
E("s7f-u1-evaluate-criteria", 1, ["SC7.3.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe évalue sa façon de travailler après une exploration. Quel critère évalue vraiment son processus de groupe?", "« Avons-nous réparti les tâches et écouté chaque membre avant de décider ensemble? »", ["« Notre affiche finale est-elle la plus colorée parmi celles de la classe? »", "« Avons-nous obtenu la note la plus élevée parmi les équipes de la classe? »", "« Notre sujet était-il le plus intéressant parmi ceux des autres équipes? »"], "Évaluer un processus de groupe, c’est examiner la façon de travailler : répartition des tâches, écoute et décision partagée. Les autres critères jugent le produit ou le sujet, pas le processus.", {});
  }
]), ["Le processus, c’est comment l’équipe a travaillé, pas ce qu’elle a produit.", "Cherche le critère qui parle des membres et de leurs décisions."]);
E("s7f-u1-evaluate-next-step", 1, ["SC7.3.6"], 3, "var", varset([
  function () {
    return mcq("Après une exploration, une équipe constate qu’une seule personne a pris toutes les mesures pendant que les autres attendaient. Quelle conclusion d’évaluation est la plus utile pour la prochaine fois?", "« Notre répartition des tâches a échoué; la prochaine fois, nous ferons tourner les rôles à chaque station. »", ["« Notre exploration a échoué; la prochaine fois, nous choisirons un sujet beaucoup plus facile. »", "« Notre membre le plus rapide devrait toujours prendre toutes les mesures à chaque station. »", "« Notre équipe devrait éviter d’évaluer son travail pour ne pas décourager ses membres. »"], "Une évaluation utile nomme la faiblesse du processus (la répartition des tâches) et propose un correctif précis pour la prochaine fois : faire tourner les rôles.", {});
  }
]), ["Une bonne évaluation débouche sur un changement précis du processus.", "Le problème décrit est un problème de répartition, pas de sujet."]);

/* ---------- SC7.3.7 Utiliser une cle d'identification ---------- */
E("s7f-u1-key-work", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Une clé d’identification commence ainsi : « 1a. L’oiseau a un long bec pointu... héron. 1b. L’oiseau a un bec court et crochu... aller à 2. » Un spécimen a un bec court et crochu. Que fait-on?", "On suit le choix 1b et on passe à l’étape 2 de la clé d’identification", ["On conclut que le spécimen est un héron et on arrête l’identification", "On recommence la clé au début jusqu’à obtenir un autre résultat final", "On choisit le nom le plus connu parmi ceux de la première étape"], "Dans une clé, chaque étape offre deux choix opposés : on suit celui qui décrit le spécimen. Un bec court et crochu correspond au choix 1b, qui envoie à l’étape 2.", {});
  },
  function () {
    return mcq("À quoi sert une clé d’identification sur le terrain?", "À identifier un organisme en répondant à une suite de choix sur ses caractères observables", ["À mesurer la taille d’un organisme avec une précision de laboratoire reconnue", "À dessiner un organisme en suivant les étapes numérotées du modèle fourni", "À classer les organismes du plus grand au plus petit selon leur taille réelle"], "Une clé d’identification guide une suite de choix entre caractères opposés jusqu’au nom de l’organisme : c’est un outil d’identification, pas de mesure.", {});
  }
]), ["Une clé avance étape par étape; chaque réponse choisit le chemin suivant.", "Le spécimen décide du choix, pas la préférence de l’observateur."]);
E("s7f-u1-key-work-2", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Avec une clé des arbres (1a : feuilles en aiguilles; 1b : feuilles larges; 2a : aiguilles en faisceaux de cinq; 2b : aiguilles une à une), un spécimen à feuilles larges et à écorce qui s’écaille en longues bandes arrive à l’étape des feuilles larges. Que peut-on conclure?", "La clé le dirige vers les étapes des arbres à feuilles larges, où d’autres caractères décideront", ["La clé l’identifie immédiatement comme un pin, car son écorce s’écaille en bandes", "La clé ne peut pas servir, car le spécimen aurait dû avoir des aiguilles fines", "La clé le renvoie au groupe des conifères, car l’écorce compte plus que les feuilles"], "La première étape sépare selon les feuilles : des feuilles larges envoient le spécimen dans la branche des feuillus, où les étapes suivantes (écorce, bourgeons, fruits) décideront du nom.", {});
  }
]), ["Travaille la clé dans l’ordre : la première étape tranche la grande division.", "Un caractère ne peut pas annuler le résultat des étapes précédentes."]);
E("s7f-u1-key-choose", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Un spécimen recueilli ne correspond à aucun des deux choix d’une étape de la clé. Quelle est la démarche la plus rigoureuse?", "Revenir à l’étape précédente et vérifier chaque caractère observé du spécimen", ["Choisir le nom le plus proche et consigner l’identification comme certaine", "Sauter les étapes suivantes et passer directement au dernier nom de la clé", "Rejeter le spécimen et recommencer l’exploration avec un autre organisme"], "Un blocage dans une clé signale presque toujours une observation erronée à une étape antérieure : on revient en arrière et on revérifie chaque caractère avant de continuer.", {});
  }
]), ["Une clé ne se force pas : une impasse signale une erreur d’observation.", "Revérifier vaut mieux que deviner un nom."]);

/* ---------- SC7.3.8 Concevoir une experience ---------- */
E("s7f-u1-variables-identify", 1, ["SC7.3.8"], 1, "var", varset([
  function () {
    return mcq("Une équipe arrose trois groupes de semis avec 50 mL, 100 mL et 150 mL d’eau par semaine et mesure leur croissance. Quelle est la variable indépendante (celle qu’on fait varier)?", "La quantité d’eau donnée à chaque groupe de semis chaque semaine", ["La croissance des semis mesurée à la fin de l’expérience en classe", "La lumière du soleil reçue également par tous les groupes de semis", "La sorte de terre utilisée de la même façon dans tous les groupes"], "La variable indépendante est celle que l’équipe change délibérément : la quantité d’eau. La croissance est la variable mesurée, et la lumière et la terre sont gardées constantes.", {});
  },
  function () {
    return mcq("Dans l’expérience précédente sur les semis, quelles variables doivent rester constantes pour que la comparaison soit juste?", "La lumière, la sorte de terre et le nombre de semis dans chaque groupe étudié", ["La quantité d’eau, la lumière et la croissance mesurée des semis du groupe", "La croissance des semis, la quantité d’eau et la sorte de terre utilisée", "Le nombre de semis, la quantité d’eau et la croissance de chaque groupe"], "Un test juste ne change qu’une variable à la fois : la lumière, la terre et le nombre de semis restent constants, pendant que seule la quantité d’eau varie.", {});
  }
]), ["Variable indépendante : celle qu’on change. Variable dépendante : celle qu’on mesure.", "Tout le reste doit rester pareil, sinon la comparaison n’est pas juste."]);
E("s7f-u1-design-controls", 1, ["SC7.3.8"], 2, "var", varset([
  function () {
    return mcq("Pour tester si la lumière influence la croissance des semis de pois, quelle organisation contrôle correctement les variables?", "Deux groupes de semis identiques, l’un en pleine lumière et l’autre à l’ombre, avec la même eau et la même terre", ["Deux groupes de semis différents, l’un arrosé davantage et placé en pleine lumière du soleil", "Un seul groupe de semis placé près d’une fenêtre, observé pendant une seule semaine de classe", "Deux groupes de semis identiques, l’un avec plus d’eau et plus de lumière que l’autre groupe"], "Un seul facteur change (la lumière) pendant que l’eau, la terre et les semis restent identiques : toute différence de croissance peut alors être attribuée à la lumière.", {});
  }
]), ["Compte les différences entre les groupes : il ne doit y en avoir qu’une.", "Si deux choses changent à la fois, on ne peut pas savoir laquelle a agi."]);
E("s7f-u1-cr-design-experiment", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return textq("Conçois une expérience pour vérifier cette question : « Les semis de haricot poussent-ils plus vite dans un sol de tourbière ou dans un sol de jardin? » Décris (a) ton hypothèse, (b) la variable que tu feras varier, (c) la variable que tu mesureras, (d) deux variables que tu garderas constantes et (e) comment tu décideras si tes données appuient ton hypothèse. (4 points)", ["une hypothèse vérifiable qui compare la croissance dans les deux sols", "variable indépendante : la sorte de sol (tourbière ou jardin)", "variable dépendante : la croissance mesurée (par exemple la hauteur après un nombre fixe de jours)", "deux constantes (même eau, même lumière, même nombre et sorte de graines, même température)", "une règle de décision (comparer les hauteurs moyennes des deux groupes)"], "<b>Réponse modèle :</b> (a) Hypothèse : les semis de haricot poussent plus vite dans le sol de jardin, car il contient plus de nutriments disponibles. (b) Variable indépendante : la sorte de sol, tourbière ou jardin. (c) Variable dépendante : la hauteur des semis après 14 jours, mesurée en millimètres. (d) Constantes : la même quantité d’eau chaque jour, la même lumière, la même température, la même sorte et le même nombre de graines par pot, et des pots identiques. (e) Décision : je compare la hauteur moyenne des deux groupes; si le groupe du sol de jardin est nettement plus haut, les données appuient l’hypothèse, sinon elles la réfutent.<br><br><b>Points d’attribution :</b> 1 point pour une hypothèse vérifiable. 1 point pour la variable indépendante et la variable dépendante correctement identifiées. 1 point pour deux constantes pertinentes. 1 point pour une règle de décision fondée sur la comparaison des résultats.", {});
  }
]), ["Une expérience complète tient en cinq morceaux : hypothèse, variable variée, variable mesurée, constantes, décision.", "La règle de décision se formule avant de voir les résultats."]);

/* ---------- SC7.3.9 Tableaux de donnees ---------- */
E("s7f-u1-table-choose", 1, ["SC7.3.9"], 1, "var", varset([
  function () {
    return mcq("Une équipe a compté les canards sur un étang chaque matin pendant une semaine. Quel tableau présente correctement ces données?", "Un tableau avec un titre, une colonne pour le jour et une colonne pour le nombre de canards", ["Un tableau avec un titre, une colonne pour le jour et une colonne pour la météo prévue", "Un tableau sans titre, avec les nombres de canards écrits sans les jours correspondants", "Un tableau avec une colonne pour le jour et les nombres remplacés par des impressions"], "Un bon tableau de données a un titre et des colonnes étiquetées qui associent chaque valeur à son jour : c’est ce qui rend les données lisibles et comparables.", {});
  },
  function () {
    return mcq("Que doit contenir l’en-tête de chaque colonne d’un tableau de données?", "Le nom de la grandeur consignée et son unité, quand elle en a une", ["Le nom de l’élève qui a recueilli les données de cette colonne précise", "La couleur utilisée pour écrire les valeurs de la colonne entière", "Le numéro de la page du cahier où la colonne a été recopiée"], "L’en-tête nomme la grandeur (et son unité) : le lecteur sait immédiatement ce que chaque colonne contient.", {});
  }
]), ["Un tableau se juge à sa lecture : titre, étiquettes, unités.", "Chaque valeur doit rester attachée à son jour et à sa grandeur."]);
E("s7f-u1-graph-interpret", 1, ["SC7.3.9"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre la hauteur moyenne des arbres d’un parterre replanté, mesurée chaque année après la récolte. Quelle lecture du graphique est correcte?", "La hauteur augmente chaque année, et la croissance est plus rapide dans les dernières années montrées", ["La hauteur diminue chaque année, car les arbres perdent leurs feuilles chaque automne", "La hauteur reste exactement la même pendant toutes les années montrées au graphique", "La hauteur augmente seulement la première année, puis les arbres cessent de grandir"], "La courbe monte d’année en année et sa pente s’accentue : la croissance se poursuit et s’accélère sur la période montrée.", {}); q.figure = s7fGrowthSVG([0, 1, 2, 3, 4, 5], [0.3, 0.7, 1.4, 2.6, 4.2, 6.1]); return q;
  }
]), ["Lis la pente : monte-t-elle, descend-elle, reste-t-elle plate?", "Une pente qui s’accentue signifie une croissance qui s’accélère."]);
E("s7f-u1-cr-data-display", 1, ["SC7.3.9", "SC7.1.10"], 3, "var", varset([
  function () {
    return textq("Une équipe a compté les arbustes sur une ancienne terre agricole pendant cinq ans : année 1, 2 arbustes; année 2, 5; année 3, 11; année 4, 19; année 5, 30. (a) Présente ces données dans un tableau organisé. (b) Décris la tendance que montrent les données. (c) Relie cette tendance à la succession écologique. (3 points)", ["un tableau avec titre et colonnes étiquetées (année, nombre d’arbustes)", "la tendance : le nombre d’arbustes augmente chaque année, de plus en plus vite", "le lien : les arbustes colonisent l’ancienne terre, une étape de la succession vers la forêt"], "<b>Réponse modèle :</b> (a) Tableau intitulé « Nombre d’arbustes sur l’ancienne terre agricole » : colonne 1, Année (1 à 5); colonne 2, Nombre d’arbustes (2, 5, 11, 19, 30). (b) Tendance : le nombre d’arbustes augmente chaque année, et l’augmentation s’accélère (de 3, puis 6, puis 8, puis 11 arbustes de plus). (c) Lien : l’ancienne terre, d’abord herbacée, est colonisée par les arbustes : c’est une étape de la succession écologique qui mène graduellement vers un peuplement d’arbustes puis d’arbres.<br><br><b>Points d’attribution :</b> 1 point pour un tableau organisé avec titre et en-têtes. 1 point pour la tendance correctement décrite. 1 point pour le lien avec la succession écologique.", {});
  }
]), ["Le tableau d’abord : titre, colonnes étiquetées, valeurs dans l’ordre.", "Pour la tendance, regarde comment les écarts entre les années évoluent."]);

/* ---------- SC7.3.10 Defendre une position ---------- */
E("s7f-u1-position-support", 1, ["SC7.3.10"], 2, "var", varset([
  function () {
    return mcq("Une élève défend la position « Il faut protéger le milieu humide derrière l’école ». Laquelle de ses phrases appuie sa position sur une découverte de son exploration?", "« Nous y avons compté six espèces d’oiseaux nicheurs et des centaines de têtards ce printemps. »", ["« Tout le monde sait que les milieux humides sont importants pour la nature en général. »", "« Le milieu humide est mon endroit préféré pour observer les oiseaux après les cours. »", "« Un article dit que les milieux humides disparaissent dans plusieurs pays du monde. »"], "Une position défendue à partir de découvertes s’appuie sur les données de sa propre exploration : les comptages d’oiseaux nicheurs et de têtards observés sur place.", {});
  }
]), ["La défense demandée repose sur des découvertes, donc sur des observations faites.", "Distingue les données recueillies des opinions et des généralités."]);
E("s7f-u1-cr-defend-position", 1, ["SC7.3.10"], 3, "var", varset([
  function () {
    return textq("Une entreprise veut assécher un marais pour agrandir un terrain industriel. Ton équipe a exploré ce marais pendant un mois. Défends la position « Il faut conserver le marais » en t’appuyant sur DEUX découvertes précises qu’une exploration peut produire, et réponds à UN argument de l’entreprise. (3 points)", ["deux découvertes précises (par exemple des espèces nicheuses comptées, des amphibiens observés, le rôle du marais dans le contrôle des crues observé après une pluie)", "une réponse à un argument de l’entreprise (par exemple l’emploi ou le terrain, traitée par une solution de rechange ou une limite du projet)"], "<b>Réponse modèle :</b> Position : il faut conserver le marais. Découverte 1 : pendant notre exploration, nous avons compté des nids de canards et entendu des grenouilles à chaque visite; le marais est un lieu de reproduction actif, pas un terrain vide. Découverte 2 : après la grosse pluie du printemps, le marais a retenu l’eau pendant des jours pendant que le fossé voisin débordait; il protège les terrains voisins des inondations. Réponse à l’entreprise : l’agrandissement peut se faire sur le terrain déjà défriché au nord du site, ce qui donne l’espace voulu sans détruire un habitat de reproduction ni la protection contre les crues.<br><br><b>Points d’attribution :</b> 1 point pour la première découverte précise à l’appui de la position. 1 point pour la deuxième découverte précise. 1 point pour une réponse raisonnable à un argument de l’entreprise.", {});
  }
]), ["Une découverte précise se compte ou s’observe : espèces, nids, eau retenue.", "Répondre à l’argument adverse renforce une défense au lieu de l’affaiblir."]);

/* ---------- SC7.3.11 Limites des modeles ---------- */
E("s7f-u1-limits-chains", 1, ["SC7.3.11"], 1, "var", varset([
  function () {
    return mcq("Laquelle des affirmations suivantes nomme une limite réelle d’une chaîne alimentaire comme représentation d’un écosystème?", "Elle montre un seul trajet d’alimentation, alors que la plupart des organismes mangent plusieurs proies différentes", ["Elle montre les organismes dans un ordre fixe, alors que les chaînes changent à chaque saison de l’année", "Elle utilise des flèches, alors que les scientifiques préfèrent toujours des tableaux pour ce travail", "Elle nomme les organismes, alors qu’un bon modèle ne devrait jamais nommer les espèces représentées"], "Une chaîne alimentaire ne trace qu’un seul trajet : elle ne peut pas montrer qu’un organisme mange plusieurs proies et sert de proie à plusieurs prédateurs. C’est la limite que le réseau alimentaire corrige en partie.", {});
  },
  function () {
    return mcq("Laquelle des affirmations suivantes nomme une limite réelle d’une pyramide d’énergie?", "Elle montre l’énergie à un moment donné, mais pas les changements du réseau au fil des saisons", ["Elle montre les niveaux dans le mauvais ordre, avec les producteurs placés au sommet du schéma", "Elle oblige à connaître le nom de chaque espèce avant de pouvoir la dessiner correctement", "Elle remplace les nombres par des dessins, ce qui la rend inutilisable pour les scientifiques"], "Une pyramide d’énergie fige une situation : les populations et les transferts changent avec les saisons, ce que la pyramide seule ne montre pas.", {});
  }
]), ["Une limite est ce que le modèle ne peut pas montrer, même bien dessiné.", "Compare le modèle à la réalité : qu’est-ce qui manque?"]);
E("s7f-u1-limits-webs", 1, ["SC7.3.11"], 2, "var", varset([
  function () {
    return mcq("Un réseau alimentaire bien dessiné reste un modèle limité. Laquelle de ses limites est la plus importante pour interpréter un écosystème réel?", "Il ne montre ni la taille des populations ni la quantité d’énergie qui passe par chaque lien du réseau", ["Il ne montre pas la couleur réelle des organismes qui composent le réseau alimentaire dessiné", "Il ne classe pas les organismes par ordre alphabétique dans les cases du réseau alimentaire", "Il ne précise pas le nom de la personne qui a dessiné le réseau alimentaire la première fois"], "Un réseau montre les liens, mais pas leur poids : sans la taille des populations ni les quantités d’énergie, on ne peut pas savoir quels liens comptent le plus dans l’écosystème réel.", {});
  }
]), ["Les liens sont montrés; leurs quantités ne le sont pas.", "Une limite importante change l’interprétation, pas seulement l’apparence."]);

/* ---------- SC7.3.12 Predire l'avenir d'un ecosysteme ---------- */
E("s7f-u1-future-predict", 1, ["SC7.3.12"], 2, "var", varset([
  function () {
    return mcq("Une région côtière au climat froid, couverte de landes et de petits étangs, connaît des étés de plus en plus chauds et secs. Quelle prédiction sur son écosystème futur est la mieux fondée sur ses caractéristiques actuelles?", "Les étangs peu profonds s’assécheront plus souvent et les espèces qui en dépendent déclineront dans la région", ["Les landes deviendront une forêt tropicale dense dès que les étés auront durci quelques années", "Les étangs deviendront plus profonds, car la chaleur augmente toujours la quantité d’eau présente", "Aucun changement ne se produira, car les écosystèmes restent toujours identiques à eux-mêmes"], "Une prédiction fondée part des caractéristiques actuelles (étangs peu profonds, climat qui se réchauffe et s’assèche) et suit leurs conséquences : des assèchements plus fréquents et un déclin des espèces qui dépendent de ces étangs.", {});
  },
  function () {
    return mcq("Un lac nordique peu profond est entouré de forêts de conifères. Si les hivers deviennent plus courts et plus doux pendant des décennies, quelle prédiction est la mieux fondée?", "La glace couvrira le lac moins longtemps, ce qui changera les conditions des espèces adaptées au long hiver", ["Le lac se transformera en désert, car les hivers doux éliminent toute l’eau des lacs nordiques", "Les conifères deviendront des arbres tropicaux en quelques années seulement après le changement", "Les espèces du lac resteront inchangées, car seuls les étés comptent pour les écosystèmes lacustres"], "Des hivers plus courts signifient une couverture de glace plus brève : les espèces adaptées au long hiver (périodes de lumière, de froid et de reproduction) verront leurs conditions changer.", {});
  }
]), ["Une prédiction fondée suit les caractéristiques données, sans les exagérer.", "Élimine les choix qui contredisent les faits de départ ou qui sautent les étapes."]);
E("s7f-u1-future-predict-2", 1, ["SC7.3.12"], 3, "var", varset([
  function () {
    return mcq("Une tourbière reçoit de moins en moins de pluie, année après année, et son niveau d’eau baisse lentement. Quelle description de la tourbière dans quelques décennies est la plus plausible?", "La mousse de sphaigne reculera sur les bords asséchés et des arbustes adaptés aux sols plus secs s’y installeront", ["La tourbière deviendra un lac profond, car les mousses retiendront de plus en plus d’eau chaque année", "La tourbière restera exactement la même, car les tourbières ne changent jamais avec le climat régional", "Des arbres tropicaux coloniseront la tourbière dès que le niveau d’eau aura baissé de quelques centimètres"], "Moins de pluie et un niveau d’eau qui baisse assèchent les bords de la tourbière : la sphaigne, qui exige l’humidité, recule, et des arbustes de sols plus secs peuvent s’installer. La prédiction suit graduellement les conditions décrites.", {});
  }
]), ["Projette le changement donné (moins d’eau) sur les organismes qui en dépendent le plus.", "Une bonne prédiction est graduelle et reste dans le même type de milieu."]);

/* ---------- SC7.3.13 Representer la succession ---------- */
E("s7f-u1-succession-order", 1, ["SC7.3.13"], 1, "var", varset([
  function () {
    var q = mcq("Les panneaux montrent des étapes de la succession sur la roche nue, dans le désordre. Quelle suite place les panneaux dans l’ordre réel de la succession, de la première étape à la dernière?", "Roche nue avec lichens, puis herbes, puis arbustes, puis forêt mature en dernier", ["Herbes et arbustes mélangés, puis roche nue, puis forêt mature, puis lichens", "Forêt mature, puis arbustes, puis herbes, puis roche nue avec lichens", "Arbustes, puis forêt mature, puis lichens, puis herbes en dernier"], "La succession primaire suit un ordre : les lichens colonisent la roche nue et amorcent le sol, puis les herbes, puis les arbustes, et enfin la forêt mature.", {}); q.figure = s7fSuccessionSVG([2, 0, 3, 1]); return q;
  },
  function () {
    var q = mcq("Dans la représentation graphique de la succession, quel panneau montre l’étape qui vient juste après les lichens sur la roche nue?", "Le panneau des herbes et des mousses qui poussent dans le sol mince formé", ["Le panneau de la forêt mature avec ses grands arbres et son sol profond", "Le panneau des arbustes et des jeunes arbres qui ombragent le sol mince", "Le panneau de la roche nue où les lichens commencent à peine à s’installer"], "Après les lichens, le sol mince qu’ils ont contribué à former permet aux mousses et aux herbes de s’installer : c’est l’étape suivante de la succession primaire.", {}); q.figure = s7fSuccessionSVG([0, 1, 2, 3]); return q;
  }
]), ["Le fil conducteur est le sol : il s’épaissit d’étape en étape.", "Chaque étape pousse dans les conditions créées par l’étape précédente."]);
E("s7f-u1-cr-succession-stages", 1, ["SC7.3.13", "SC7.1.10"], 2, "var", varset([
  function () {
    var q = textq("Les panneaux montrent quatre étapes de la succession sur la roche nue, en ordre, de la première à la dernière. Décris le changement qui se produit à CHAQUE étape, et nomme la condition que chaque étape crée pour permettre la suivante. (2 points)", ["étape 1 : les lichens colonisent la roche nue et amorcent la formation du sol", "étape 2 : mousses et herbes poussent dans le sol mince et l’épaississent de matière organique", "étape 3 : arbustes et jeunes arbres poussent dans le sol plus profond", "étape 4 : forêt mature, sol profond et sol forestier ombragé"], "<b>Réponse modèle :</b> Étape 1 : les lichens s’installent sur la roche nue et, avec l’altération, commencent à en briser la surface; le premier sol mince se forme. Étape 2 : les mousses et les herbes s’enracinent dans ce sol mince et, en vivant et en mourant, y ajoutent de la matière organique, ce qui l’épaissit et lui permet de retenir l’eau. Étape 3 : les arbustes et les jeunes arbres peuvent alors pousser; leurs racines et leur litière enrichissent encore le sol, et leur ombre change les conditions au sol. Étape 4 : la forêt mature s’installe, avec un sol profond et un parterre ombragé, conditions construites étape par étape par les étapes précédentes.<br><br><b>Points d’attribution :</b> 1 point pour les changements des étapes 1 et 2 décrits en ordre (colonisation, début et épaississement du sol). 1 point pour les changements des étapes 3 et 4 décrits en ordre, avec la condition habilitante nommée (sol plus profond, abri ou ombre).", {}); q.figure = s7fSuccessionSVG([0, 1, 2, 3]); return q;
  }
]), ["Raconte l’histoire du sol : c’est le fil qui relie les quatre étapes.", "Pour chaque étape, pose deux questions : qu’est-ce qui pousse maintenant, et que laisse-t-il derrière lui?"]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U1 = { "s7f-u1-cr-design-experiment": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U1[e.id]) { e.noCompose = true; } });

/* ----- bank-u2.js ----- */
// CRMARKS: s7f-u2-cr-temp-explain=3
// CRMARKS: s7f-u2-cr-expansion=3
// CRMARKS: s7f-u2-cr-plateau=3
// CRMARKS: s7f-u2-cr-transfer-explain=3
// CRMARKS: s7f-u2-cr-absorb=2
// CRMARKS: s7f-u2-cr-heating-example=2
// CRMARKS: s7f-u2-cr-heating-decision=3
// CRMARKS: s7f-u2-cr-improvement=2
// CRMARKS: s7f-u2-cr-pump-chain=3
// CRMARKS: s7f-u2-cr-thermometer-display=2
// CRMARKS: s7f-u2-cr-inquiry=3
// CRMARKS: s7f-u2-cr-display=3
// CRMARKS: s7f-u2-cr-design-test=4
// CRMARKS: s7f-u2-cr-conclusion=3
// CRMARKS: s7f-u2-cr-instrument-jobs=3
// Sciences 7, Unite 2 : La chaleur (SC7.4.1 a SC7.6.9), banque
// construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Residus CORE : les questions de SC7.6.1 et SC7.6.2 evaluent le choix des
// methodes, l'etalonnage juge par ecrit et l'affichage des donnees; elles
// n'evaluent pas la construction materielle du thermometre par l'eleve.
// Les questions de SC7.6.4 et SC7.6.7 evaluent le jugement sur l'usage sur
// et precis des appareils; elles n'evaluent pas la manipulation reelle.
// Les questions de SC7.6.6 evaluent la conception d'experiences; la
// realisation est un travail de classe.

/* ---------- SC7.4.1 Instruments de mesure de la temperature ---------- */
E("s7f-u2-instrument-match", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("Quel instrument mesure la température du corps en lisant le rayonnement émis par la peau, sans contact?", "Le thermomètre à infrarouge, qui capte le rayonnement émis par la surface", ["Le thermomètre à liquide, qui doit toucher la surface pendant un moment", "Le thermocouple, dont les fils doivent toucher la surface à mesurer", "Le thermomètre à bilame, dont la lame doit toucher la surface chaude"], "Le thermomètre à infrarouge mesure sans contact : il capte le rayonnement infrarouge émis par la surface. Les autres instruments exigent un contact avec l’objet mesuré.", {});
  },
  function () {
    return mcq("Quel instrument de mesure de la température utilise deux métaux soudés dont la jonction produit un signal électrique?", "Le thermocouple, formé de deux fils de métaux différents soudés ensemble", ["Le thermomètre à résistance, formé d’un fil dont la résistance varie toujours", "Le thermomètre à liquide, formé d’un liquide qui monte dans un tube scellé", "Le thermomètre à bilame, formé de deux lames qui se courbent en chauffant"], "Le thermocouple joint deux métaux différents : la jonction produit un signal électrique qui dépend de la température. Chaque instrument nommé fonctionne par un principe différent.", {});
  }
]), ["Relie chaque instrument à son principe de fonctionnement.", "Sans contact : un seul instrument lit un rayonnement."]);
E("s7f-u2-instrument-how", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("Comment un thermomètre à liquide indique-t-il la température?", "Le liquide se dilate en chauffant et monte dans le tube gradué du thermomètre", ["Le liquide change de couleur en chauffant et teinte le tube gradué du thermomètre", "Le liquide bout en chauffant et remplit complètement le tube gradué du thermomètre", "Le liquide gèle en chauffant et descend dans le tube gradué du thermomètre"], "En chauffant, les particules du liquide s’agitent davantage et le liquide prend plus d’espace : il monte dans le tube. La hauteur atteinte indique la température sur l’échelle.", {});
  },
  function () {
    return mcq("Comment un thermostat à bilame commande-t-il un système de chauffage?", "La lame double se courbe quand la température change et ouvre ou ferme un contact", ["La lame double fond quand la température change et bloque le passage du courant", "La lame double vibre quand la température change et produit le courant du système", "La lame double gonfle quand la température change et pousse le liquide du système"], "Un bilame joint deux métaux qui se dilatent inégalement : la lame se courbe avec la température, ce qui ouvre ou ferme le contact qui commande le chauffage.", {});
  }
]), ["Chaque instrument transforme la température en un mouvement ou un signal lisible.", "Dilatation : c’est le principe du liquide et du bilame."]);
E("s7f-u2-thermometer-read", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return mcq("Un thermomètre à liquide plongé dans l’eau d’un bécher montre le liquide arrêté entre les marques 20 °C et 30 °C, exactement à la marque du milieu, chaque petite division valant 1 °C. Quelle est la lecture correcte si le liquide dépasse la marque 24 d’une division?", "25 °C, en lisant la hauteur du liquide à la hauteur des yeux", ["24 °C, en lisant la hauteur du liquide depuis le dessus du bécher", "26 °C, en lisant le bas du tube plutôt que la hauteur du liquide", "20 °C, en lisant la grande marque la plus proche sous le liquide"], "Chaque division vaut 1 °C : une division au-dessus de 24 donne 25 °C. On lit la hauteur de la colonne à la hauteur des yeux pour éviter une lecture faussée par l’angle.", {});
  },
  function () {
    return mcq("Pourquoi faut-il attendre avant de lire un thermomètre à liquide qu’on vient de plonger dans l’eau chaude?", "Parce que le liquide a besoin de temps pour atteindre la température de l’eau mesurée", ["Parce que le verre du thermomètre a besoin de temps pour changer de couleur", "Parce que l’échelle du thermomètre a besoin de temps pour devenir lisible", "Parce que l’eau a besoin de temps pour devenir plus chaude que le liquide"], "Le thermomètre indique sa propre température : il faut attendre que son liquide se réchauffe jusqu’à la température de l’eau, sinon la lecture est trop basse.", {});
  }
]), ["Une lecture exacte demande le bon instrument, bien placé et lu au bon moment.", "Le thermomètre mesure d’abord sa propre température."]);
E("s7f-u2-instrument-choose", 2, ["SC7.4.1"], 3, "var", varset([
  function () {
    return mcq("Il faut surveiller la température à l’intérieur d’un four industriel très chaud et enregistrer les valeurs à distance, sans ouvrir le four. Quel instrument convient le mieux?", "Un thermocouple relié à un enregistreur, conçu pour les températures très élevées", ["Un thermomètre à liquide en verre, glissé par la porte entrouverte du four chaud", "Un thermomètre à bilame domestique, fixé à la poignée extérieure du four chaud", "Un thermomètre à infrarouge de cuisine, pointé une fois sur la porte du four"], "Le thermocouple supporte de très hautes températures et produit un signal électrique qu’on peut enregistrer à distance. Le thermomètre à liquide en verre se briserait et n’enregistre rien.", {});
  }
]), ["Énumère les exigences : chaleur extrême, mesure continue, distance.", "L’instrument gagnant satisfait les trois exigences à la fois."]);

/* Ajout du 19 novembre 2026 : comble l’écart de dénomination des
   réponses construites du Test 1 de l’unité 2 dans le plan d’épreuves.
   Le test ne porte que sur SC7.4.1, qui ne contenait aucune réponse
   construite, contre une cible de 3 points. Entrée jumelle de
   s7-u2-cr-instrument-jobs (même question, même niveau, même nombre
   de points). Voir Spec-French-Test-Map-2026-11-19.md, section 4. */
E("s7f-u2-cr-instrument-jobs", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return textq("Trois tâches de mesure de la température (3 points)\n(a) Une sauveteuse doit vérifier si la surface métallique d’une glissoire est trop chaude pour les enfants, sans la toucher elle-même. (1)\n(b) Un potier doit connaître la température à l’intérieur d’un four de cuisson en marche, bien au-delà du point d’ébullition de l’eau. (1)\n(c) Le propriétaire d’une serre veut que le chauffage se mette en marche et s’arrête tout seul selon la température de l’air, sans personne sur place. (1)\nPour chaque tâche, nomme l’instrument qui convient et dis pourquoi il convient.",
      ["(a) Un thermomètre à infrarouge : il lit le rayonnement émis par la surface, donc aucun contact n’est nécessaire.",
       "(b) Un thermocouple : il est conçu pour supporter et mesurer des températures bien au-delà de la portée d’un thermomètre en verre.",
       "(c) Un thermostat à bilame : la lame se courbe quand la température change et peut actionner l’interrupteur toute seule."],
      "<b>Réponse modèle :</b> (a) Un thermomètre à infrarouge : il mesure le rayonnement invisible émis par la surface chaude, donc la sauveteuse obtient la lecture à distance, sans toucher la glissoire. (b) Un thermocouple : ses fils soudés de deux métaux différents supportent la chaleur extrême d’un four en marche et transforment la température en signal électrique, là où un thermomètre à liquide en verre se briserait. (c) Un thermostat à bilame : ses deux métaux soudés se dilatent inégalement, la lame se courbe quand la température change, et cette courbure peut ouvrir et fermer l’interrupteur du chauffage toute seule.<br><br><b>Points d’attribution :</b> 1 point par tâche : l’instrument qui convient, nommé, avec la raison pour laquelle il répond aux conditions de la tâche.", {});
  },
  function () {
    return textq("Trois tâches de mesure de la température (3 points)\n(a) Une station météorologique enregistre la température de l’air jour et nuit et envoie chaque lecture par des fils jusqu’à un affichage situé dans un bâtiment. (1)\n(b) Une élève mesure la température d’une eau tiède dans un bécher pendant une expérience en classe. (1)\n(c) Une alarme de chaleur doit déclencher un interrupteur toute seule si l’air d’une salle d’entreposage dépasse une température réglée. (1)\nPour chaque tâche, nomme l’instrument qui convient et dis pourquoi il convient.",
      ["(a) Un thermomètre à résistance : la résistance électrique de sa sonde varie avec la température et le signal voyage par les fils jusqu’à l’affichage.",
       "(b) Un thermomètre à liquide en verre : l’instrument courant pour un liquide en laboratoire, lu directement selon la hauteur de la colonne.",
       "(c) Un bilame : il se courbe quand la température monte et peut déclencher l’interrupteur de l’alarme tout seul."],
      "<b>Réponse modèle :</b> (a) Un thermomètre à résistance : la résistance de sa sonde varie avec la température, et ce signal électrique peut être envoyé par des fils jusqu’à un affichage et enregistré, ce qu’exige une station météorologique. (b) Un thermomètre à liquide en verre : c’est l’outil habituel pour mesurer un liquide en laboratoire; le liquide se dilate en chauffant et la hauteur de la colonne donne directement la lecture. (c) Un bilame : deux métaux soudés se dilatent inégalement, la lame se courbe à mesure que la salle se réchauffe, et à la température réglée, la courbure déclenche l’interrupteur, donc l’alarme fonctionne sans surveillance.<br><br><b>Points d’attribution :</b> 1 point par tâche : l’instrument qui convient, nommé, avec la raison pour laquelle il répond aux conditions de la tâche.", {});
  }
]), ["Chaque tâche a une condition qui élimine la plupart des instruments : aucun contact, chaleur extrême, déclenchement automatique, signal par fils, liquide ordinaire.", "Nomme l’instrument et la condition qu’il satisfait, une tâche à la fois."]);

/* ---------- SC7.4.2 La temperature et le modele particulaire ---------- */
E("s7f-u2-temp-define", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    return mcq("Selon le modèle particulaire de la matière, qu’est-ce que la température d’une substance mesure?", "L’énergie cinétique moyenne des particules de la substance mesurée", ["La quantité totale de particules contenue dans la substance mesurée", "La grosseur moyenne des particules qui composent la substance mesurée", "L’espace total occupé par les particules de la substance mesurée"], "La température est liée au mouvement des particules : elle mesure leur énergie cinétique moyenne. Plus les particules bougent vite en moyenne, plus la température est élevée.", {});
  },
  function () {
    return mcq("Un élève réchauffe de l’eau dans un bécher. Au niveau des particules, que se passe-t-il quand la température monte?", "Les particules d’eau bougent en moyenne plus vite qu’avant le chauffage", ["Les particules d’eau deviennent en moyenne plus grosses qu’avant", "Les particules d’eau deviennent en moyenne plus nombreuses qu’avant", "Les particules d’eau cessent en moyenne de bouger entre elles"], "Chauffer ajoute de l’énergie aux particules : elles bougent plus vite en moyenne, ce qui correspond exactement à une température plus élevée.", {});
  }
]), ["Température et mouvement des particules vont ensemble.", "Ni la grosseur ni le nombre des particules ne changent quand on chauffe."]);
E("s7f-u2-particle-points", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma des particules, que représentent les petites flèches attachées aux particules?", "Le mouvement des particules, dont la longueur indique la vitesse moyenne", ["L’attraction des particules, dont la longueur indique la force moyenne", "La grosseur des particules, dont la longueur indique le diamètre moyen", "Le nombre des particules, dont la longueur indique la quantité moyenne"], "Les flèches montrent le mouvement : dans la rangée plus chaude, les flèches sont plus longues, car les particules bougent plus vite en moyenne.", {}); q.figure = s7fParticlePanelSVG(); return q;
  },
  function () {
    var q = mcq("Dans le schéma des particules, comment reconnaît-on la rangée la plus chaude?", "Ses particules portent les flèches les plus longues dans chaque état montré", ["Ses particules sont dessinées plus grosses que celles de la rangée froide", "Ses particules sont dessinées plus nombreuses que celles de la rangée froide", "Ses particules sont dessinées sans espace entre elles dans chaque état"], "La température se lit au mouvement : les flèches plus longues de la rangée chaude montrent des particules qui bougent plus vite en moyenne, dans les trois états.", {}); q.figure = s7fParticlePanelSVG(); return q;
  }
]), ["Compare les mêmes états entre les deux rangées du schéma.", "La seule chose qui change entre les rangées, c’est le mouvement."]);
E("s7f-u2-particle-speed", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return mcq("Deux échantillons d’eau, l’un à 20 °C et l’autre à 60 °C, contiennent exactement les mêmes particules d’eau. Quel énoncé compare correctement leurs particules?", "Les particules de l’échantillon à 60 °C ont une énergie cinétique moyenne plus grande", ["Les particules de l’échantillon à 60 °C sont devenues plus grosses que les autres", "Les particules de l’échantillon à 20 °C ont cessé tout mouvement entre elles", "Les deux échantillons ont des particules d’énergie cinétique moyenne égale"], "Les particules sont les mêmes; seule leur énergie de mouvement diffère. À 60 °C, l’énergie cinétique moyenne est plus grande, et même à 20 °C les particules bougent toujours.", {});
  }
]), ["Mêmes particules, températures différentes : une seule propriété peut différer.", "Le mouvement des particules ne cesse pas à basse température ordinaire."]);
E("s7f-u2-cr-temp-explain", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return textq("Une soupe froide placée sur un élément chaud atteint peu à peu la même température que l’élément. Explique ce qui se passe au niveau des particules, de l’élément jusqu’à la soupe, en utilisant le modèle particulaire de la matière. (3 points)", ["les particules de l’élément chaud bougent très vite et transmettent leur énergie par collisions", "l’énergie passe de particule en particule jusqu’à la soupe, dont les particules bougent de plus en plus vite", "l’équilibre est atteint quand les particules des deux côtés ont la même énergie cinétique moyenne"], "<b>Réponse modèle :</b> Les particules de l’élément chaud vibrent et bougent très vite, car sa température est élevée. Au contact, elles entrent en collision avec les particules du contenant, puis avec celles de la soupe, et leur transmettent une partie de leur énergie. Les particules de la soupe bougent alors de plus en plus vite : sa température monte. Le transfert se poursuit jusqu’à ce que les particules des deux côtés aient la même énergie cinétique moyenne, c’est-à-dire la même température.<br><br><b>Points d’attribution :</b> 1 point pour le point de départ (les particules chaudes bougent vite). 1 point pour le mécanisme de transfert par collisions de particule en particule. 1 point pour l’équilibre décrit comme une énergie cinétique moyenne devenue égale.", {});
  }
]), ["Pense en chaîne : élément, contenant, soupe, collision par collision.", "L’équilibre thermique est un équilibre d’énergie moyenne des particules."]);

/* ---------- SC7.4.3 Les etats de la matiere et la temperature ---------- */
E("s7f-u2-states-compare", 2, ["SC7.4.3"], 1, "var", varset([
  function () {
    return mcq("Quand on chauffe un solide, un liquide et un gaz de la même substance, lequel se dilate généralement le plus pour le même réchauffement?", "Le gaz, dont les particules libres s’écartent beaucoup plus les unes des autres", ["Le solide, dont les particules liées s’écartent beaucoup plus les unes des autres", "Le liquide, dont les particules serrées s’écartent beaucoup plus les unes des autres", "Les trois états se dilatent exactement autant pour le même réchauffement donné"], "Les particules d’un gaz sont déjà libres et éloignées : en chauffant, elles bougent plus vite et occupent beaucoup plus d’espace. Les solides, aux particules liées, se dilatent le moins.", {});
  },
  function () {
    return mcq("Pourquoi un liquide se dilate-t-il plus qu’un solide quand on les chauffe autant?", "Parce que ses particules, moins liées, peuvent s’écarter davantage les unes des autres", ["Parce que ses particules deviennent plus grosses que celles du solide chauffé autant", "Parce que ses particules se multiplient quand la température du liquide augmente", "Parce que ses particules cessent de s’attirer dès que la température du liquide monte"], "Dans un liquide, les particules glissent les unes contre les autres et sont moins retenues que dans un solide : le réchauffement les écarte davantage, donc la dilatation est plus grande.", {});
  }
]), ["Compare la liberté des particules dans chaque état.", "Plus les particules sont libres, plus la dilatation est grande."]);
E("s7f-u2-expansion-scenario", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return mcq("Par une chaude journée d’été, une porte métallique qui fermait bien en hiver coince dans son cadre. Quelle explication est correcte?", "Le métal de la porte s’est dilaté avec la chaleur et remplit davantage son cadre", ["Le métal de la porte s’est contracté avec la chaleur et force contre son cadre", "Le cadre de la porte s’est dilaté vers l’intérieur sous l’effet du froid hivernal", "L’humidité de l’été a fait gonfler le métal de la porte comme elle gonfle le bois"], "En chauffant, les particules du métal vibrent davantage et le métal se dilate : la porte occupe plus d’espace et coince. Le froid, lui, contracte les matériaux.", {});
  },
  function () {
    return mcq("On laisse des espaces entre les sections d’un pont d’acier. À quoi servent ces joints de dilatation?", "Ils laissent l’acier se dilater par temps chaud sans pousser ni déformer la structure", ["Ils laissent l’eau de pluie s’écouler sous le pont pendant les orages de l’été", "Ils laissent passer les vibrations des véhicules qui traversent le pont chaque jour", "Ils laissent l’acier se contracter par temps chaud sans tirer sur la structure"], "L’acier se dilate quand il chauffe : sans joints, les sections se pousseraient et déformeraient le pont. Les joints absorbent ce changement de longueur.", {});
  }
]), ["Chaleur : dilatation. Froid : contraction. Pars de là.", "Le scénario décrit un matériau qui prend plus de place qu’avant."]);
E("s7f-u2-states-heated", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return mcq("Un ballon gonflé placé au soleil devient plus ferme et tendu, sans qu’on y ajoute d’air. Quelle explication particulaire est correcte?", "Les particules d’air chauffées frappent les parois plus fort et plus souvent qu’avant", ["Les particules d’air chauffées deviennent plus nombreuses à l’intérieur du ballon", "Les particules d’air chauffées deviennent plus lourdes et tombent au fond du ballon", "Les particules d’air chauffées se collent aux parois et gonflent le caoutchouc du ballon"], "L’air chauffé a des particules plus rapides : elles frappent les parois plus fort et plus souvent, ce qui tend le ballon. Le nombre de particules n’a pas changé.", {});
  }
]), ["Même quantité d’air, température plus élevée : que font les particules?", "La fermeté vient des collisions contre les parois."]);
E("s7f-u2-cr-expansion", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return textq("Un thermomètre à liquide et une bande bimétallique utilisent tous les deux la dilatation. Explique, pour CHACUN des deux dispositifs, comment la dilatation produit l’indication de température, en nommant ce qui se dilate et ce qui bouge visiblement. (3 points)", ["thermomètre : le liquide se dilate plus que le verre et monte dans le tube; la hauteur indique la température", "bilame : deux métaux se dilatent inégalement, la bande se courbe; la courbure déplace une aiguille ou un contact"], "<b>Réponse modèle :</b> Thermomètre à liquide : en chauffant, le liquide du réservoir se dilate davantage que le verre; il est poussé dans le tube étroit, et la hauteur de la colonne indique la température sur l’échelle. Bande bimétallique : deux métaux soudés se dilatent de quantités différentes quand la température change; la bande se courbe donc d’un côté ou de l’autre, et ce mouvement déplace une aiguille ou ouvre et ferme un contact électrique.<br><br><b>Points d’attribution :</b> 1 point pour le liquide qui se dilate et monte dans le tube. 1 point pour les deux métaux qui se dilatent inégalement et courbent la bande. 1 point pour le lien, dans chaque cas, entre le mouvement produit et l’indication de température.", {});
  }
]), ["Deux dispositifs, un même principe : la dilatation inégale ou visible.", "Pour chacun, nomme ce qui se dilate et ce que l’œil voit bouger."]);

/* ---------- SC7.4.4 Les changements d'etat ---------- */
E("s7f-u2-change-name", 2, ["SC7.4.4"], 1, "var", varset([
  function () {
    return mcq("De la buée se forme sur un miroir froid pendant une douche chaude. Quel changement d’état se produit?", "La condensation, quand la vapeur d’eau devient liquide au contact du miroir froid", ["L’évaporation, quand l’eau liquide devient vapeur au contact du miroir froid", "La fusion, quand la glace du miroir devient liquide sous la chaleur de la douche", "La congélation, quand la vapeur d’eau devient solide au contact du miroir froid"], "La vapeur d’eau de l’air chaud perd de l’énergie au contact du miroir froid et redevient liquide : c’est la condensation.", {});
  },
  function () {
    return mcq("Un glaçon laissé sur le comptoir devient une flaque d’eau. Quel changement d’état se produit?", "La fusion, quand la glace solide devient liquide en absorbant de l’énergie", ["La congélation, quand l’eau solide devient liquide en perdant de l’énergie", "L’évaporation, quand la glace solide devient vapeur en absorbant de l’énergie", "La condensation, quand l’eau liquide devient solide en perdant de l’énergie"], "Le passage du solide au liquide s’appelle la fusion : la glace absorbe l’énergie de la pièce et ses particules se libèrent de leur arrangement fixe.", {});
  }
]), ["Nomme l’état de départ et l’état d’arrivée, puis le nom suit.", "Solide vers liquide : fusion. Gaz vers liquide : condensation."]);
E("s7f-u2-plateau-read", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    var q = mcq("La courbe de chauffage montre la température d’une substance chauffée régulièrement. Pendant le plateau de la courbe, que se passe-t-il?", "La substance change d’état pendant que sa température reste constante sur le plateau", ["La substance cesse d’absorber l’énergie pendant que sa température reste constante", "La substance change de composition pendant que sa température augmente sur le plateau", "La substance se contracte pendant que sa température diminue lentement sur le plateau"], "Sur un plateau, l’énergie absorbée sert à briser les liens entre les particules pour changer d’état : la température ne monte pas tant que le changement n’est pas terminé.", {}); q.figure = s7fHeatingCurveSVG(0, 100, 25, 120); return q;
  },
  function () {
    var q = mcq("Sur la courbe de chauffage, à quelles températures se produisent les deux changements d’état de cette substance?", "À 0 °C pour la fusion et à 100 °C pour l’ébullition de la substance chauffée", ["À 20 °C pour la fusion et à 80 °C pour l’ébullition de la substance chauffée", "À 0 °C pour la congélation et à 100 °C pour la condensation de la substance", "À 50 °C pour la fusion et à 100 °C pour l’ébullition de la substance chauffée"], "Les deux plateaux de la courbe se situent à 0 °C et à 100 °C : ce sont les températures des changements d’état, la fusion puis l’ébullition, pendant le chauffage.", {}); q.figure = s7fHeatingCurveSVG(0, 100, 25, 120); return q;
  }
]), ["Un plateau signifie : énergie absorbée, température constante.", "Lis les valeurs des plateaux sur l’axe des températures."]);
E("s7f-u2-change-particles", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    return mcq("Pendant l’évaporation à la surface d’une flaque, quelles particules quittent le liquide en premier?", "Les particules de la surface qui ont le plus d’énergie cinétique à ce moment-là", ["Les particules du fond qui ont le moins d’énergie cinétique à ce moment-là", "Les particules de la surface qui sont les plus grosses de tout le liquide entier", "Toutes les particules du liquide en même temps, dès que le soleil brille dessus"], "L’évaporation est un phénomène de surface : seules les particules de surface assez énergiques échappent aux attractions du liquide. C’est pourquoi une flaque s’évapore sans bouillir.", {});
  }
]), ["L’évaporation se passe à la surface, pas dans tout le liquide.", "Il faut assez d’énergie pour vaincre les attractions du liquide."]);
E("s7f-u2-cr-plateau", 2, ["SC7.4.4"], 3, "var", varset([
  function () {
    return textq("On chauffe régulièrement de la glace pilée et on consigne sa température. Elle monte jusqu’à 0 °C, reste à 0 °C pendant que la glace fond, puis remonte. Explique, avec le modèle particulaire, pourquoi la température reste à 0 °C pendant la fusion même si le chauffage continue. (3 points)", ["avant la fusion, l’énergie augmente l’énergie cinétique des particules, donc la température monte", "pendant la fusion, l’énergie sert à briser les liens qui tiennent les particules en arrangement solide", "l’énergie cinétique moyenne ne change pas pendant la fusion, donc la température reste à 0 °C"], "<b>Réponse modèle :</b> Avant 0 °C, l’énergie fournie augmente l’énergie cinétique des particules de la glace : la température monte. À 0 °C, l’énergie fournie change de travail : elle sert à briser les liens qui maintiennent les particules dans l’arrangement fixe du solide, pour former le liquide. Pendant tout ce temps, l’énergie cinétique moyenne des particules ne change pas, donc la température reste à 0 °C. Quand toute la glace est fondue, l’énergie recommence à augmenter l’énergie cinétique des particules d’eau, et la température remonte.<br><br><b>Points d’attribution :</b> 1 point pour l’énergie qui augmente l’énergie cinétique avant le plateau. 1 point pour l’énergie employée à briser les liens pendant la fusion. 1 point pour le lien entre énergie cinétique moyenne constante et température constante.", {});
  }
]), ["Demande-toi où va l’énergie si elle ne fait pas monter la température.", "Température égale énergie cinétique moyenne : si l’une est constante, l’autre aussi."]);

/* ---------- SC7.4.5 Conduction, convection et rayonnement ---------- */
E("s7f-u2-transfer-classify", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Une cuillère de métal laissée dans une soupe chaude devient chaude jusqu’au manche. De quel mode de transmission de la chaleur s’agit-il?", "La conduction, de particule en particule le long du métal de la cuillère", ["La convection, par un courant de soupe chaude qui monte le long du manche", "Le rayonnement, par les ondes émises par la soupe vers le manche exposé", "La conduction, par l’air chaud qui circule librement autour de la cuillère"], "Dans un solide, la chaleur se transmet de particule en particule par collisions : c’est la conduction, qui fait chauffer le manche de proche en proche.", {});
  },
  function () {
    return mcq("On sent la chaleur d’un feu de camp sur son visage, à distance, sans toucher les flammes et sans vent. De quel mode de transmission s’agit-il?", "Le rayonnement, qui transporte l’énergie en ondes sans matière intermédiaire", ["La conduction, qui transporte l’énergie de particule en particule dans l’air", "La convection, qui transporte l’énergie par un courant d’air dirigé vers le visage", "Le rayonnement, qui transporte l’énergie seulement quand un liquide la conduit"], "Le rayonnement voyage en ondes (infrarouges) et n’a besoin d’aucune matière : c’est ainsi que la chaleur du feu atteint le visage à distance.", {});
  }
]), ["Contact dans un solide : conduction. Courant dans un fluide : convection. Ondes à distance : rayonnement.", "Le mode se reconnaît au mécanisme, pas à la source."]);
E("s7f-u2-transfer-particles", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Dans la convection, comment la chaleur se déplace-t-elle d’un endroit à l’autre?", "La matière chaude, devenue moins dense, monte et est remplacée par de la matière plus froide", ["Les particules transmettent leur énergie de proche en proche sans se déplacer elles-mêmes", "Les ondes traversent la matière et la réchauffent sans déplacer aucune de ses parties", "La matière froide, devenue plus dense, monte et pousse la matière chaude vers le bas"], "Dans la convection, c’est la matière elle-même qui se déplace : chauffée, elle se dilate, devient moins dense et monte, pendant que la matière froide descend prendre sa place.", {});
  }
]), ["Convection : la matière bouge. Conduction : seule l’énergie bouge.", "Chaud et moins dense monte; froid et plus dense descend."]);
E("s7f-u2-transfer-compare", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé compare correctement la conduction et le rayonnement?", "La conduction exige un contact de matière, tandis que le rayonnement traverse même le vide", ["La conduction traverse le vide, tandis que le rayonnement exige un contact de matière", "La conduction et le rayonnement exigent tous les deux un courant de matière en mouvement", "La conduction et le rayonnement ne fonctionnent tous les deux que dans les métaux chauds"], "La conduction passe de particule en particule dans la matière : il faut un milieu. Le rayonnement voyage en ondes et traverse le vide, comme la chaleur du soleil qui atteint la Terre.", {});
  }
]), ["Une question décide : le mode a-t-il besoin de matière pour voyager?", "La chaleur du soleil traverse le vide de l’espace : un seul mode le peut."]);
E("s7f-u2-stove-three", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("Une poêle sur un élément électrique rougi chauffe l’eau qu’elle contient. Quel ensemble associe correctement les trois modes à cette scène?", "Conduction de l’élément à la poêle, convection dans l’eau, rayonnement de l’élément rougi", ["Convection de l’élément à la poêle, conduction dans l’eau, rayonnement de l’élément rougi", "Rayonnement de l’élément à la poêle, conduction dans l’eau, convection de l’élément rougi", "Conduction de l’élément à la poêle, rayonnement dans l’eau, convection de l’élément rougi"], "L’élément touche la poêle : conduction. L’eau chauffée circule en courants : convection. L’élément rougi émet des ondes qu’on sent à distance : rayonnement.", {});
  }
]), ["Associe chaque mode à son mécanisme dans la scène, un par un.", "L’eau qui circule est la convection; le contact est la conduction."]);
E("s7f-u2-cr-transfer-explain", 2, ["SC7.4.5"], 3, "var", varset([
  function () {
    return textq("Une journée d’hiver ensoleillée réchauffe une serre de trois façons. Donne un exemple précis de conduction, de convection et de rayonnement dans la serre, et explique le mécanisme de chacun en une phrase. (3 points)", ["rayonnement : les ondes du soleil traversent la vitre et réchauffent les surfaces de la serre", "conduction : une surface chaude transmet la chaleur par contact (par exemple une dalle ou un contenant chauffé qui réchauffe le sol ou l’eau par contact)", "convection : l’air chaud monte et circule dans la serre, distribuant la chaleur"], "<b>Réponse modèle :</b> Rayonnement : les ondes infrarouges du soleil traversent la vitre et sont absorbées par les surfaces de la serre, qui se réchauffent sans aucun contact. Conduction : une dalle sombre chauffée par le soleil transmet sa chaleur par contact au sol et aux contenants posés dessus, de particule en particule. Convection : l’air réchauffé au sol devient moins dense, monte, puis redescend en se refroidissant, ce qui fait circuler la chaleur dans toute la serre.<br><br><b>Points d’attribution :</b> 1 point pour le rayonnement avec son mécanisme (ondes absorbées, sans contact). 1 point pour la conduction avec son mécanisme (contact, de particule en particule). 1 point pour la convection avec son mécanisme (la matière chaude qui monte et circule).", {});
  }
]), ["Un mode par mécanisme : ondes, contact, circulation.", "Chaque exemple doit se passer réellement dans une serre ensoleillée."]);

/* ---------- SC7.4.6 Absorption de la chaleur radiante ---------- */
E("s7f-u2-absorb-classify", 2, ["SC7.4.6"], 1, "var", varset([
  function () {
    return mcq("Deux boîtes identiques, l’une peinte en noir mat et l’autre en blanc brillant, sont placées au soleil. Laquelle se réchauffe le plus vite?", "La boîte noire et mate, car les surfaces foncées et mates absorbent plus de rayonnement", ["La boîte blanche et brillante, car les surfaces claires absorbent plus de rayonnement", "Les deux boîtes se réchauffent également, car la couleur ne change rien à l’absorption", "La boîte blanche et brillante, car les surfaces lisses absorbent toujours plus de chaleur"], "Les surfaces foncées et mates absorbent une plus grande partie du rayonnement reçu; les surfaces claires et brillantes en réfléchissent davantage. La boîte noire se réchauffe donc plus vite.", {});
  },
  function () {
    return mcq("Pourquoi les vêtements d’été sont-ils souvent pâles dans les régions très ensoleillées?", "Parce que les surfaces pâles réfléchissent une grande partie du rayonnement du soleil", ["Parce que les surfaces pâles absorbent une grande partie du rayonnement du soleil", "Parce que les surfaces pâles produisent elles-mêmes de la fraîcheur au soleil", "Parce que les surfaces pâles empêchent complètement la chaleur d’atteindre le corps"], "Une surface pâle réfléchit une bonne partie du rayonnement solaire au lieu de l’absorber : le vêtement et la personne restent plus frais.", {});
  }
]), ["Absorber ou réfléchir : la couleur et le fini décident du partage.", "Foncé et mat absorbe; clair et brillant réfléchit."]);
E("s7f-u2-absorb-lab", 2, ["SC7.4.6"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre la température de deux boîtes, l’une foncée et l’autre claire, placées sous la même lampe. Quelle conclusion les données appuient-elles?", "La surface foncée absorbe le rayonnement plus vite, car sa température monte plus rapidement sous la lampe", ["La surface claire absorbe le rayonnement plus vite, car sa température monte plus rapidement sous la lampe", "Les deux surfaces absorbent également, car leurs températures finales sous la lampe sont identiques", "La lampe réchauffe seulement la boîte foncée, car la boîte claire ne reçoit aucun rayonnement du tout"], "Sous la même lampe, la courbe de la boîte foncée monte plus vite : sa surface absorbe une plus grande partie du rayonnement et se réchauffe plus rapidement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Même lampe, mêmes conditions : seule la surface diffère.", "Compare les pentes des deux courbes, pas seulement les valeurs finales."]);
E("s7f-u2-cr-absorb", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return textq("Un jardinier hésite entre un tuyau d’arrosage noir et un tuyau pâle pour alimenter en eau tiède une petite serre au printemps. Conseille un choix et appuie-le sur la façon dont les surfaces absorbent la chaleur radiante, en nommant l’effet attendu sur l’eau du tuyau. (2 points)", ["le tuyau noir, car les surfaces foncées absorbent plus de rayonnement solaire", "l’eau du tuyau noir se réchauffera davantage au soleil que celle du tuyau pâle"], "<b>Réponse modèle :</b> Je conseille le tuyau noir. Les surfaces foncées absorbent une plus grande partie du rayonnement du soleil que les surfaces pâles, qui en réfléchissent davantage. Au soleil du printemps, le tuyau noir se réchauffera donc davantage et transmettra cette chaleur à l’eau qu’il contient, ce qui donnera une eau d’arrosage plus tiède pour la serre.<br><br><b>Points d’attribution :</b> 1 point pour le choix du tuyau noir, lié à l’absorption plus forte des surfaces foncées. 1 point pour l’effet attendu sur l’eau, expliqué par le transfert de la chaleur du tuyau à l’eau.", {});
  }
]), ["Le choix suit la règle d’absorption : foncé absorbe, pâle réfléchit.", "Termine la chaîne : surface chauffée, puis eau réchauffée."]);

/* ---------- SC7.4.7 Chaleurs massiques comparees ---------- */
E("s7f-u2-shc-compare", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre la hausse de température de masses égales d’eau, d’aluminium, de ciment et d’acier qui reçoivent la même quantité d’énergie. Quel énoncé est correct?", "L’eau a la plus grande chaleur massique, car sa température monte le moins pour la même énergie reçue", ["L’eau a la plus petite chaleur massique, car sa température monte le moins pour la même énergie reçue", "L’acier a la plus grande chaleur massique, car sa température monte le plus pour la même énergie reçue", "Les quatre matériaux ont la même chaleur massique, car ils reçoivent la même quantité d’énergie"], "La chaleur massique mesure l’énergie nécessaire pour élever la température d’un matériau. À énergie égale, celui qui se réchauffe le moins, l’eau, a la plus grande chaleur massique.", {}); q.figure = s7fSHCBarsSVG([{name: 'Eau', rise: 5}, {name: 'Glace', rise: 10}, {name: 'Ciment', rise: 24}, {name: 'Aluminium', rise: 23}, {name: 'Acier', rise: 45}]); return q;
  },
  function () {
    return mcq("Des masses égales d’eau et de sable reçoivent la même énergie du soleil pendant une heure. Le sable devient brûlant pendant que l’eau reste fraîche. Quelle propriété explique cette différence?", "La chaleur massique de l’eau est beaucoup plus grande que celle du sable exposé au soleil", ["La chaleur massique du sable est beaucoup plus grande que celle de l’eau exposée au soleil", "La température du sable augmente parce que le sable absorbe toute l’énergie sans exception", "La température de l’eau n’augmente jamais, quelle que soit l’énergie qu’elle reçoit du soleil"], "L’eau exige beaucoup plus d’énergie pour élever sa température : sa chaleur massique est grande. Le sable, de faible chaleur massique, se réchauffe vite avec la même énergie.", {});
  }
]), ["À énergie égale, la plus petite hausse signale la plus grande chaleur massique.", "Le graphique compare des masses égales qui reçoivent la même énergie."]);
E("s7f-u2-shc-coastal", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    return mcq("Les localités côtières de Terre-Neuve-et-Labrador ont des étés plus frais et des hivers moins froids que les localités de l’intérieur. Quel rôle joue l’océan dans ce climat plus doux?", "L’eau de l’océan, de grande chaleur massique, se réchauffe et se refroidit lentement, ce qui adoucit les températures voisines", ["L’eau de l’océan, de faible chaleur massique, change de température très vite, ce qui adoucit les températures voisines", "L’eau de l’océan ne change jamais de température, ce qui fige complètement les températures des localités voisines", "L’eau de l’océan transmet instantanément sa chaleur aux localités, ce qui rend leurs étés aussi chauds qu’à l’intérieur"], "Parce que l’eau a une grande chaleur massique, l’océan emmagasine l’énergie l’été et la rend lentement l’hiver : les températures côtières varient moins que celles de l’intérieur.", {});
  }
]), ["Le même principe que le sable et l’eau de la plage, à l’échelle d’une région.", "Grande chaleur massique égale changements de température lents."]);
E("s7f-u2-heat-vs-temp", 2, ["SC7.4.7"], 1, "var", varset([
  function () {
    return mcq("Une tasse d’eau bouillante et une baignoire d’eau tiède : laquelle contient le plus d’énergie thermique totale?", "La baignoire d’eau tiède, car sa très grande quantité d’eau contient plus d’énergie au total", ["La tasse d’eau bouillante, car sa température élevée lui donne plus d’énergie au total", "Les deux contiennent exactement la même énergie thermique, car l’eau est la même substance", "La tasse d’eau bouillante, car l’énergie thermique dépend uniquement de la température mesurée"], "La température mesure l’énergie moyenne par particule, mais l’énergie totale dépend aussi de la quantité de matière. La baignoire contient énormément plus d’eau : son énergie thermique totale est plus grande, même à température plus basse.", {});
  }
]), ["Température : moyenne par particule. Énergie totale : moyenne fois quantité.", "Une très grande masse tiède peut contenir plus d’énergie qu’une petite masse chaude."]);

/* ---------- SC7.5.1 Activites personnelles et temperature ---------- */
E("s7f-u2-familiar-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces activités personnelles dépend le plus directement de la mesure de la température?", "Vérifier la température d’un four avant d’y mettre un pain à cuire au repas", ["Choisir la couleur d’un chandail avant de partir pour l’école le matin", "Compter les marches d’un escalier avant de monter à l’étage de la maison", "Plier les vêtements avant de les ranger dans le tiroir de la chambre"], "Régler et vérifier un four, c’est mesurer et contrôler une température pour réussir une cuisson : l’activité dépend directement de la température.", {});
  },
  function () {
    return mcq("Un joueur de hockey vérifie la glace et l’air de l’aréna avant un match. Quel lien avec la température est le plus direct?", "La dureté de la glace dépend de sa température, ce qui change le glissement des patins", ["La couleur des chandails dépend de la température de l’air dans l’aréna du match", "Le nombre de joueurs dépend de la température de la glace pendant le match entier", "La durée du match dépend entièrement de la température mesurée avant le match"], "Une glace plus froide est plus dure et plus rapide; une glace plus chaude est plus molle et plus lente. La température de la glace influence directement le jeu.", {});
  }
]), ["Cherche l’activité où une valeur de température change une décision.", "Formel ou informel, le lien doit passer par la température elle-même."]);
E("s7f-u2-activity-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces situations informelles montre la température qui guide un choix personnel?", "Mettre un manteau chaud après avoir vu qu’il fait moins 10 °C dehors ce matin", ["Mettre un manteau chaud parce que sa couleur s’accorde avec le pantalon du jour", "Choisir un manteau parce qu’il est accroché le plus près de la porte d’entrée", "Porter un manteau parce que tous les amis en portent un semblable cette saison"], "Le choix est guidé par une température mesurée (moins 10 °C) : c’est un lien direct entre une activité personnelle et la température.", {});
  }
]), ["Le thermomètre doit jouer un rôle dans la décision.", "Les autres choix reposent sur la couleur, la commodité ou l’habitude."]);

/* ---------- SC7.5.2 Technologies anciennes de mesure ---------- */
E("s7f-u2-thermoscope", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Comment le thermomètre à air de Galilée indiquait-il un changement de température?", "L’air emprisonné se dilatait ou se contractait et faisait monter ou descendre l’eau du tube", ["Un liquide coloré montait dans un tube scellé gradué selon une échelle fixe et précise", "Une aiguille tournait sur un cadran divisé en degrés égaux comme les horloges de l’époque", "Des billes de verre flottaient ou coulaient selon la température exacte de la pièce mesurée"], "Le thermoscope de Galilée utilisait l’air : réchauffé, l’air se dilatait et repoussait l’eau du tube; refroidi, il se contractait et l’eau remontait. Il montrait des changements, sans échelle de degrés précise.", {});
  },
  function () {
    return mcq("Quelle limite partageaient les premiers instruments de mesure de la température?", "Ils montraient qu’il faisait plus chaud ou plus froid, sans échelle commune et précise de degrés", ["Ils donnaient des lectures en degrés Celsius identiques à celles des instruments actuels", "Ils fonctionnaient seulement à l’extérieur, jamais à l’intérieur des maisons de l’époque", "Ils mesuraient la température sans utiliser la dilatation d’une substance quelconque"], "Les premiers thermomètres à air et à liquide indiquaient des variations, mais chaque instrument avait ses repères : il a fallu des points fixes et des échelles communes pour comparer les lectures.", {});
  }
]), ["Les premiers instruments montraient un changement avant de mesurer un nombre.", "Sans points fixes partagés, deux instruments ne s’accordent pas."]);
E("s7f-u2-scales", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Quels points fixes ont permis de graduer les premiers thermomètres à liquide de façon reproductible?", "La température de la glace qui fond et celle de l’eau qui bout, mesurées dans des conditions définies", ["La température du corps humain et celle d’une journée d’été, mesurées dans des conditions variables", "La température d’un four de cuisine et celle d’une cave, mesurées dans des maisons différentes", "La température du soleil levant et celle de la nuit, mesurées à des saisons différentes de l’année"], "La glace fondante et l’eau bouillante donnent les mêmes températures partout (à pression égale) : ce sont des points fixes fiables pour graduer une échelle.", {});
  }
]), ["Un point fixe doit être le même partout et en tout temps.", "La glace qui fond garde sa température tant qu’elle fond."]);
E("s7f-u2-past-tech", 2, ["SC7.5.2"], 2, "var", varset([
  function () {
    return mcq("Un musée expose un thermomètre à liquide ancien, sans chiffres, avec seulement des perles de verre comme repères. Qu’est-ce que cet objet nous apprend sur la mesure de la température autrefois?", "On pouvait comparer les jours plus chauds et plus froids avant de pouvoir nommer des températures exactes en degrés", ["On mesurait déjà les températures en degrés Celsius exacts, mais on préférait cacher les chiffres aux visiteurs", "On ne s’intéressait pas du tout à la température avant l’invention des thermomètres numériques modernes", "On utilisait les thermomètres seulement comme décorations, sans jamais observer la hauteur du liquide dedans"], "Des repères sans échelle chiffrée permettaient des comparaisons (plus chaud, plus froid) avant que des échelles communes en degrés rendent les lectures exactes et partageables.", {});
  }
]), ["L’objet montre une étape : comparer avant de quantifier.", "Les perles sont des repères, pas des degrés."]);

/* ---------- SC7.5.3 Technologies de chauffage a Terre-Neuve-et-Labrador ---------- */
E("s7f-u2-heating-tech", 2, ["SC7.5.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle des technologies suivantes sert aujourd’hui à chauffer des maisons à Terre-Neuve-et-Labrador?", "La pompe à chaleur air-air, qui déplace la chaleur de l’air extérieur vers l’intérieur de la maison", ["Le poêle à bois, qui déplace la chaleur de l’air extérieur vers l’intérieur de la maison sans brûler", "La chaudière à mazout, qui capte la chaleur du soleil pour la distribuer dans toute la maison", "Le chauffage électrique, qui brûle un combustible dans un foyer fermé au sous-sol de la maison"], "La pompe à chaleur air-air déplace la chaleur au lieu de la produire par combustion : c’est une technologie de chauffage domestique actuelle dans la province. Chaque autre choix mélange deux technologies.", {});
  },
  function () {
    return mcq("Quel ensemble ne contient que des technologies de chauffage domestique utilisées autrefois ou aujourd’hui dans la province?", "Poêle à bois, chaudière à mazout et chauffage électrique à plinthes dans les maisons", ["Poêle à bois, panneau solaire de piscine et chauffage électrique à plinthes dans les maisons", "Chaudière à mazout, fournaise de forge et poêle à bois pour les ateliers des forgerons", "Chauffage électrique, foyer extérieur de camping et radiateur de voiture pour les maisons"], "Le poêle à bois (autrefois et encore), la chaudière à mazout et les plinthes électriques sont des technologies de chauffage de maisons dans la province.", {});
  }
]), ["Vérifie chaque technologie : sert-elle à chauffer une maison, ici?", "Un seul ensemble ne contient aucun intrus."]);
E("s7f-u2-cr-heating-example", 2, ["SC7.5.3"], 2, "var", varset([
  function () {
    return textq("Donne un exemple d’une technologie de chauffage utilisée autrefois à Terre-Neuve-et-Labrador et un exemple d’une technologie utilisée de nos jours. Pour chacune, dis en une phrase comment elle produit ou déplace la chaleur. (2 points)", ["autrefois : le poêle à bois, qui produit la chaleur en brûlant du bois (ou la chaudière à mazout, qui brûle du mazout)", "de nos jours : la pompe à chaleur, qui déplace la chaleur de l’extérieur vers l’intérieur (ou le chauffage électrique, qui transforme l’électricité en chaleur)"], "<b>Réponse modèle :</b> Autrefois : le poêle à bois, qui produit la chaleur en brûlant du bois dans un foyer et la diffuse dans la pièce. De nos jours : la pompe à chaleur air-air, qui ne brûle rien; elle capte la chaleur de l’air extérieur, même froid, et la déplace à l’intérieur de la maison.<br><br><b>Points d’attribution :</b> 1 point pour la technologie d’autrefois avec son mode de production de chaleur. 1 point pour la technologie actuelle avec son mode de production ou de déplacement de la chaleur.", {});
  }
]), ["Une technologie par époque, et le mécanisme de chacune.", "Produire la chaleur et déplacer la chaleur sont deux mécanismes différents."]);

/* ---------- SC7.5.4 Approches du probleme de chauffage ---------- */
E("s7f-u2-approaches", 2, ["SC7.5.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle des démarches suivantes est une approche différente pour résoudre le problème du chauffage domestique en hiver?", "Isoler et étanchéifier la maison pour garder à l’intérieur la chaleur déjà produite", ["Brûler davantage de bois dans le même poêle pour produire plus de chaleur chaque soir", "Installer une chaudière plus puissante pour produire plus de chaleur pendant tout l’hiver", "Ajouter des plinthes électriques pour produire plus de chaleur dans chaque pièce froide"], "Les trois autres démarches produisent plus de chaleur. Isoler la maison attaque le problème autrement : elle réduit les pertes, donc le besoin de chauffage lui-même.", {});
  },
  function () {
    return mcq("Une famille chauffe sa maison en brûlant du bois qu’elle coupe elle-même. Quelle autre approche, fondée sur une autre idée, pourrait réduire son besoin de chauffage?", "Couvrir les fenêtres de pellicules isolantes et calfeutrer les fuites d’air de la maison", ["Acheter un poêle à bois plus grand pour brûler plus de bois pendant les nuits froides", "Couper une réserve de bois plus grande pour alimenter le poêle pendant tout l’hiver", "Ouvrir les portes des pièces pour laisser la chaleur du poêle circuler dans la maison"], "Réduire les pertes de chaleur (pellicules, calfeutrage) est une approche différente de produire plus de chaleur : elle diminue le besoin à la source.", {});
  }
]), ["Une approche différente change d’idée, pas seulement de quantité.", "Produire plus contre perdre moins : ce sont deux approches."]);
E("s7f-u2-approaches-compare", 2, ["SC7.5.4"], 2, "var", varset([
  function () {
    return mcq("Deux voisins chauffent leur maison : l’un remplace sa chaudière par un modèle plus efficace, l’autre ajoute de l’isolant dans le grenier. Quel énoncé compare correctement leurs approches?", "Le premier améliore la production de chaleur pendant que le second réduit les pertes de chaleur de la maison", ["Le premier réduit les pertes de chaleur pendant que le second améliore la production de chaleur de la maison", "Les deux voisins réduisent les pertes de chaleur, mais avec des matériaux complètement différents", "Les deux voisins améliorent la production de chaleur, mais avec des combustibles différents"], "Une chaudière efficace produit la même chaleur avec moins d’énergie; l’isolant du grenier garde la chaleur produite. Ce sont les deux grandes approches du problème de chauffage.", {});
  }
]), ["Classe chaque démarche : produire mieux, ou perdre moins?", "L’isolant ne produit aucune chaleur; il la conserve."]);

/* ---------- SC7.5.5 Decisions sur les technologies de chauffage ---------- */
E("s7f-u2-heating-adv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Quel est un avantage réel du chauffage électrique à plinthes pour une maison de la province?", "Il s’installe facilement pièce par pièce et ne demande ni combustible ni conduit de fumée", ["Il produit sa chaleur sans consommer aucune énergie, quelle que soit la température dehors", "Il coûte toujours moins cher à faire fonctionner que toutes les autres technologies connues", "Il continue de chauffer la maison pendant les pannes de courant prolongées de l’hiver"], "Les plinthes électriques sont simples à installer, sans réservoir ni cheminée, et se règlent pièce par pièce. En revanche, elles cessent de fonctionner en cas de panne et leur coût d’usage dépend du prix de l’électricité.", {});
  },
  function () {
    return mcq("Quel est un avantage réel d’une pompe à chaleur par rapport à une chaudière à mazout?", "Elle déplace la chaleur au lieu de la produire, donc elle livre plus de chaleur que l’énergie qu’elle consomme", ["Elle produit de la chaleur sans consommer aucune énergie, même par les journées les plus froides", "Elle fonctionne sans électricité, ce qui la rend utile pendant les pannes de courant de l’hiver", "Elle n’exige aucun entretien pendant toute sa durée de vie utile dans une maison de la province"], "Une pompe à chaleur déplace la chaleur de l’extérieur vers l’intérieur : pour chaque unité d’électricité consommée, elle peut livrer plusieurs unités de chaleur. Elle a toutefois besoin d’électricité et d’entretien.", {});
  }
]), ["Un avantage réel reste vrai même quand on connaît les limites de la technologie.", "Élimine les énoncés absolus : toujours, jamais, aucune énergie."]);
E("s7f-u2-heating-disadv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Quel est un inconvénient réel du poêle à bois comme source principale de chauffage?", "Il demande un approvisionnement constant en bois et un chargement régulier pour garder la maison chaude", ["Il ne peut chauffer qu’une seule maison à la fois dans tout un village de la province", "Il produit de la fumée seulement quand le bois brûlé est complètement sec et bien fendu", "Il cesse de fonctionner dès que la température extérieure descend sous le point de congélation"], "Le poêle à bois exige du travail continu : couper, entreposer et charger le bois, et vider les cendres. C’est un inconvénient réel, reconnu dans toute comparaison des technologies.", {});
  }
]), ["Un inconvénient réel se vérifie dans l’usage quotidien de la technologie.", "Les énoncés exagérés ou inversés ne décrivent pas la réalité du poêle."]);
E("s7f-u2-cr-heating-decision", 2, ["SC7.5.5"], 3, "var", varset([
  function () {
    return textq("Une famille d’un village côtier doit remplacer sa vieille chaudière à mazout. Elle hésite entre une nouvelle chaudière à mazout, des plinthes électriques et une pompe à chaleur. Prends une décision avisée pour cette famille : choisis une technologie, donne UN avantage et UN inconvénient de ton choix pour cette situation, et nomme un fait qui pourrait te faire changer d’avis. (3 points)", ["une technologie choisie et tenue", "un avantage et un inconvénient réels, liés à la situation (coût, climat côtier, pannes, entretien, approvisionnement)", "un fait qui changerait la décision (par exemple le prix du mazout, la fréquence des pannes, l’isolation de la maison)"], "<b>Réponse modèle :</b> Décision : la pompe à chaleur, avec les plinthes existantes conservées en appoint. Avantage : elle déplace la chaleur au lieu de brûler du mazout, donc ses coûts de fonctionnement sont plus bas et elle ne dépend pas des livraisons de mazout dans un village côtier. Inconvénient : par grand froid et pendant les pannes de courant, elle ne suffit pas seule, d’où l’appoint électrique conservé. Fait qui changerait la décision : si la maison était très mal isolée, il vaudrait mieux investir d’abord dans l’isolation, car la pompe à chaleur perdrait son avantage dans une maison qui perd sa chaleur.<br><br><b>Points d’attribution :</b> 1 point pour une décision claire. 1 point pour un avantage et un inconvénient réels et liés à la situation. 1 point pour un fait pertinent qui pourrait changer la décision.", {});
  }
]), ["Une décision avisée connaît le prix de son choix : nomme l’inconvénient toi-même.", "Relie chaque argument à la situation : village côtier, vieille chaudière, hiver."]);

/* ---------- SC7.5.6 Amelioration des technologies de chauffage ---------- */
E("s7f-u2-improvement", 2, ["SC7.5.6"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces affirmations décrit une amélioration réelle des technologies de chauffage domestique au fil du temps?", "Les thermostats programmables règlent la température automatiquement selon l’heure et réduisent le gaspillage de chaleur", ["Les maisons anciennes se chauffaient automatiquement selon l’heure, sans aucun réglage de la part des occupants", "Les poêles anciens réglaient leur propre température avec une précision que les systèmes actuels n’atteignent pas", "Les chaudières anciennes consommaient moins de combustible que les modèles efficaces vendus aujourd’hui"], "Le réglage automatique par thermostat programmable est une amélioration moderne : il évite de chauffer une maison vide et réduit le gaspillage.", {});
  },
  function () {
    return mcq("Quel changement montre que le chauffage domestique s’est amélioré au fil du temps?", "Les chaudières actuelles tirent plus de chaleur du même combustible que les chaudières anciennes", ["Les maisons actuelles exigent plus de combustible par hiver que les maisons anciennes comparables", "Les systèmes actuels demandent un chargement manuel du combustible plusieurs fois par jour", "Les fenêtres actuelles laissent passer plus d’air froid que les fenêtres anciennes des maisons"], "L’efficacité a augmenté : une chaudière actuelle convertit une plus grande part de son combustible en chaleur utile pour la maison.", {});
  }
]), ["Une amélioration signifie : même service, moins de pertes ou moins d’efforts.", "Compare les époques dans le bon sens."]);
E("s7f-u2-cr-improvement", 2, ["SC7.5.6"], 2, "var", varset([
  function () {
    return textq("Décris UN exemple précis montrant comment une technologie de chauffage domestique s’est améliorée au fil du temps, et explique en quoi ce changement améliore la vie des occupants. (2 points)", ["un exemple précis (thermostat programmable, chaudière à haut rendement, pompe à chaleur, isolation moderne)", "l’amélioration expliquée (moins de combustible, température stable, moins de travail, moins de gaspillage)"], "<b>Réponse modèle :</b> Exemple : le thermostat programmable a remplacé le réglage manuel des anciens systèmes. Au lieu de chauffer la maison au même niveau jour et nuit, il abaisse la température pendant les absences et la relève avant le retour des occupants. L’amélioration : la maison reste confortable quand elle est occupée, tout en consommant moins de combustible ou d’électricité, donc les coûts et le gaspillage diminuent.<br><br><b>Points d’attribution :</b> 1 point pour un exemple précis d’amélioration au fil du temps. 1 point pour l’effet de cette amélioration sur les occupants, expliqué.", {});
  }
]), ["Choisis un changement que tu peux dater en gros : autrefois contre aujourd’hui.", "L’amélioration doit changer quelque chose de mesurable ou de vécu."]);

/* ---------- SC7.5.7 Evaporation, condensation et pompe a chaleur ---------- */
E("s7f-u2-pump-cycle", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Dans une pompe à chaleur, que fait le liquide frigorigène quand il s’évapore dans l’unité extérieure?", "Il absorbe la chaleur de l’air extérieur en passant de l’état liquide à l’état gazeux", ["Il libère la chaleur de la maison en passant de l’état gazeux à l’état liquide", "Il absorbe la chaleur de la maison en passant de l’état liquide à l’état gazeux", "Il libère la chaleur de l’air extérieur en passant de l’état solide à l’état liquide"], "À l’extérieur, le frigorigène froid s’évapore : ce changement d’état absorbe la chaleur de l’air extérieur, même froid. La condensation, qui libère la chaleur, se produit à l’intérieur.", {});
  },
  function () {
    return mcq("Pourquoi la compréhension de la condensation a-t-elle été essentielle au développement de la pompe à chaleur?", "Parce que la condensation du frigorigène à l’intérieur libère la chaleur captée dehors, au bon endroit", ["Parce que la condensation du frigorigène à l’extérieur libère la chaleur captée dans la maison", "Parce que la condensation transforme le frigorigène en combustible qui brûle dans l’unité intérieure", "Parce que la condensation empêche le frigorigène de changer d’état pendant tout son parcours"], "La pompe à chaleur fonctionne sur les deux changements d’état : l’évaporation capte la chaleur dehors, et la condensation la libère dedans. Sans la condensation, la chaleur captée ne serait jamais livrée à la maison.", {});
  }
]), ["Évaporation : absorbe. Condensation : libère. Place chacun au bon endroit.", "Le cycle déplace la chaleur; il ne la fabrique pas par combustion."]);
E("s7f-u2-pump-science", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé explique le mieux comment la science de l’évaporation et de la condensation a mené à la pompe à chaleur?", "En comprenant que les changements d’état absorbent et libèrent de la chaleur, on a pu concevoir un cycle qui déplace la chaleur d’un endroit à l’autre", ["En comprenant que les liquides brûlent plus proprement, on a pu concevoir un brûleur qui déplace la chaleur d’un endroit à l’autre", "En comprenant que les gaz sont toujours chauds, on a pu concevoir un ventilateur qui déplace la chaleur d’un endroit à l’autre", "En comprenant que le froid se déplace comme un liquide, on a pu concevoir un cycle qui déplace le froid d’un endroit à l’autre"], "La découverte clé est énergétique : évaporer absorbe la chaleur et condenser la libère. Enchaîner les deux dans un circuit fermé déplace la chaleur au lieu de la produire.", {});
  }
]), ["La pompe à chaleur est une application directe des changements d’état.", "Ce n’est ni une combustion ni un simple ventilateur."]);
E("s7f-u2-cr-pump-chain", 2, ["SC7.5.7"], 3, "var", varset([
  function () {
    return textq("Explique la chaîne complète qui mène de la compréhension de l’évaporation et de la condensation jusqu’au chauffage d’une maison par une pompe à chaleur. Ta réponse doit suivre le frigorigène dans son cycle et nommer le changement d’état à chaque étape. (3 points)", ["à l’extérieur, le frigorigène s’évapore et absorbe la chaleur de l’air extérieur", "le gaz est comprimé et transporté à l’intérieur", "à l’intérieur, le frigorigène se condense et libère sa chaleur dans la maison, puis le cycle recommence"], "<b>Réponse modèle :</b> Étape 1 : dans l’unité extérieure, le frigorigène liquide et froid s’évapore; ce changement d’état absorbe la chaleur de l’air extérieur, même quand il fait froid. Étape 2 : le gaz est comprimé, ce qui le rend très chaud, et il est envoyé à l’unité intérieure. Étape 3 : dans l’unité intérieure, le gaz se condense en liquide; ce changement d’état libère la chaleur captée, qui chauffe l’air de la maison. Le liquide retourne ensuite à l’extérieur et le cycle recommence : la pompe déplace la chaleur au lieu de la produire.<br><br><b>Points d’attribution :</b> 1 point pour l’évaporation à l’extérieur et la chaleur absorbée. 1 point pour le transport du gaz (compression) vers l’intérieur. 1 point pour la condensation à l’intérieur et la chaleur libérée dans la maison.", {});
  }
]), ["Suis le frigorigène : dehors, trajet, dedans.", "Chaque changement d’état a un travail : absorber ou libérer."]);

/* ---------- SC7.5.8 Technologies isolantes, hier et aujourd'hui ---------- */
E("s7f-u2-insulator-examples", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces technologies isolantes était utilisée autrefois dans la province pour isoler les maisons?", "Le gazon posé en blocs sur les toits et contre les murs des maisons anciennes", ["La fibre de verre soufflée dans les murs par des machines spécialisées modernes", "Les panneaux de mousse rigide collés sur les fondations des maisons récentes", "Les fenêtres à triple vitrage scellées installées dans les maisons neuves"], "Le gazon (les mottes de tourbe et d’herbe) servait autrefois d’isolant local et gratuit. La fibre de verre soufflée, la mousse rigide et le triple vitrage sont des technologies récentes.", {});
  },
  function () {
    return mcq("Pourquoi la fourrure animale servait-elle d’isolant efficace autrefois?", "Parce que ses poils emprisonnent l’air, et que l’air immobile conduit très mal la chaleur", ["Parce que ses poils produisent de la chaleur quand ils sont exposés au froid de l’hiver", "Parce que ses poils sont métalliques et renvoient la chaleur vers le corps des personnes", "Parce que ses poils absorbent l’eau et deviennent plus lourds pendant les tempêtes"], "Un bon isolant emprisonne l’air : l’air immobile est un mauvais conducteur de chaleur. Les poils de la fourrure gardent une couche d’air contre le corps, comme le font les fibres modernes.", {});
  }
]), ["Un isolant ralentit la conduction; il ne produit pas de chaleur.", "Pense à ce que la fourrure et la fibre de verre ont en commun : l’air emprisonné."]);
E("s7f-u2-insulation-past", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Quel point commun relie les isolants d’autrefois (fourrure, gazon) et ceux d’aujourd’hui (fibre de verre, matériaux isothermes)?", "Ils emprisonnent tous de l’air immobile, qui ralentit le passage de la chaleur par conduction", ["Ils produisent tous une petite quantité de chaleur quand la température extérieure baisse", "Ils sont tous fabriqués à partir de produits du pétrole raffinés en usine spécialisée", "Ils réfléchissent tous le rayonnement du soleil comme le ferait un miroir métallique"], "D’hier à aujourd’hui, le principe est le même : emprisonner l’air pour ralentir la conduction de la chaleur. Seuls les matériaux et leur mise en œuvre ont changé.", {});
  }
]), ["Le principe n’a pas changé; les matériaux, oui.", "Air immobile : voilà l’isolant véritable dans chaque cas."]);
E("s7f-u2-thermos", 2, ["SC7.5.8"], 2, "var", varset([
  function () {
    return mcq("Une bouteille isotherme garde une soupe chaude pendant des heures. Quelle caractéristique de la bouteille combat la conduction?", "Sa double paroi vide d’air, qui empêche la chaleur de traverser par conduction et par convection", ["Sa paroi extérieure métallique, qui conduit la chaleur vers l’extérieur de la bouteille", "Son bouchon en plastique épais, qui produit une petite quantité de chaleur en continu", "Sa surface intérieure colorée, qui absorbe le rayonnement émis par la soupe chaude"], "Le vide entre les deux parois ne contient presque pas de particules : la conduction et la convection n’ont pas de milieu pour transporter la chaleur, qui reste donc dans la soupe.", {});
  }
]), ["Isotherme veut dire isolant : chaque caractéristique combat un mode de transfert.", "Le vide est l’absence de milieu : deux modes en dépendent."]);

/* ---------- SC7.5.9 Les besoins menent aux developpements ---------- */
E("s7f-u2-needs-tech", 2, ["SC7.5.9"], 1, "var", varset([
  function () {
    return mcq("Quel exemple montre le mieux un besoin humain qui mène à un développement technologique lié à la chaleur?", "Le besoin de conserver les aliments au frais a mené au développement des réfrigérateurs domestiques", ["Le besoin de décorer les cuisines a mené au développement des réfrigérateurs domestiques colorés", "Le besoin de voyager plus vite a mené au développement des réfrigérateurs domestiques modernes", "Le besoin de communiquer à distance a mené au développement des réfrigérateurs domestiques"], "Conserver les aliments est un besoin réel : il a poussé le développement de la réfrigération, une technologie de contrôle de la température.", {});
  },
  function () {
    return mcq("Des pêcheurs devaient autrefois conserver le poisson plusieurs jours sans glace naturelle en été. Quel développement ce besoin a-t-il encouragé?", "Le développement de glacières et de systèmes de réfrigération pour conserver le poisson au froid", ["Le développement de fours plus chauds pour cuire le poisson dès sa sortie de l’eau salée", "Le développement de filets plus fins pour capturer seulement les plus gros poissons pêchés", "Le développement de bateaux plus rapides pour vendre le poisson le jour même de la pêche"], "Le besoin de conserver le poisson a encouragé les technologies du froid : glacières, puis réfrigération mécanique, qui contrôlent la température de conservation.", {});
  }
]), ["Le besoin vient d’abord; la technologie répond ensuite.", "Cherche la technologie qui contrôle la température pour répondre au besoin."]);
E("s7f-u2-winter-clothing", 2, ["SC7.5.9"], 2, "var", varset([
  function () {
    return mcq("Le besoin de travailler dehors par grand froid a mené à des vêtements isolants de plus en plus performants. Quel énoncé décrit correctement ce lien entre besoin et développement?", "Le besoin de rester au chaud a poussé la recherche de fibres qui emprisonnent l’air tout en restant légères et sèches", ["Le besoin de rester au chaud a poussé la recherche de fibres métalliques qui produisent leur propre chaleur", "Le besoin de rester au chaud a éliminé tout intérêt pour la science des matériaux isolants modernes", "Le besoin de rester au chaud a rendu les vêtements d’hiver plus lourds chaque année sans exception"], "Le besoin (travailler au froid) oriente la science des matériaux : des fibres légères qui emprisonnent l’air et gèrent l’humidité gardent la chaleur du corps sans l’alourdir.", {});
  }
]), ["Le développement répond au besoin précis : chaud, léger, sec.", "L’isolant emprisonne l’air; il ne fabrique pas de chaleur."]);

/* ---------- SC7.5.10 Carrieres liees a la chaleur ---------- */
E("s7f-u2-career-match", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces carrières est directement liée à la chaleur et à la température?", "Technicien en chauffage et en climatisation qui installe et entretient les systèmes des maisons", ["Technicien en informatique qui installe et entretient les réseaux des écoles du district", "Technicien en automobile qui installe et entretient les freins des voitures des clients", "Technicien en éclairage qui installe et entretient les projecteurs des salles de spectacle"], "Le technicien en chauffage et en climatisation (systèmes CVAC) travaille chaque jour avec la production, le déplacement et le contrôle de la chaleur dans les bâtiments.", {});
  },
  function () {
    return mcq("Qui, parmi ces personnes, exerce une carrière fondée sur les sciences de la chaleur?", "L’inspectrice en efficacité énergétique qui mesure les pertes de chaleur des bâtiments anciens", ["L’inspectrice des aliments qui mesure les portions servies dans les cafétérias des écoles", "L’inspectrice des ponts qui mesure la résistance des structures d’acier des ouvrages", "L’inspectrice des élections qui mesure la participation des électeurs aux scrutins"], "Mesurer les pertes de chaleur et conseiller l’isolation : c’est appliquer les sciences de la chaleur et de la température dans une carrière.", {});
  }
]), ["La carrière cherchée manipule la chaleur ou sa mesure chaque jour.", "Le mot « technicien » ne suffit pas; c’est l’objet du travail qui compte."]);
E("s7f-u2-career-scenario", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Une personne installe des pompes à chaleur, vérifie leur frigorigène et règle leurs thermostats chez des clients. Quelle carrière exerce-t-elle?", "Technicienne en systèmes de chauffage, de ventilation et de climatisation des bâtiments", ["Technicienne en systèmes de plomberie, d’égouts et d’alimentation en eau des bâtiments", "Technicienne en systèmes d’alarme, de surveillance et de sécurité des bâtiments publics", "Technicienne en systèmes de sonorisation, d’éclairage et de scène des bâtiments culturels"], "Installer et entretenir des pompes à chaleur et leurs commandes, c’est le travail des techniciens en chauffage, ventilation et climatisation.", {});
  }
]), ["Les objets nommés (pompe à chaleur, frigorigène, thermostat) désignent le métier.", "Frigorigène égale cycle de chauffage et de refroidissement."]);

/* ---------- SC7.6.1 Construire et mettre a l'essai un thermometre ---------- */
E("s7f-u2-thermometer-build", 2, ["SC7.6.1"], 1, "var", varset([
  function () {
    return mcq("Pour construire un thermomètre scolaire avec une bouteille, de l’eau colorée et une paille, quel choix de méthode convient le mieux?", "Sceller la paille dans le bouchon pour que l’eau colorée monte dans la paille quand elle se dilate", ["Laisser la bouteille ouverte pour que l’eau colorée s’évapore librement pendant les mesures", "Percer le fond de la bouteille pour que l’eau colorée s’écoule pendant le réchauffement", "Remplir la bouteille à ras bord sans aucun espace pour l’air ni pour la paille du modèle"], "Le thermomètre scolaire fonctionne par dilatation : l’eau réchauffée prend plus d’espace et monte dans la paille scellée, où sa hauteur se lit comme une température relative.", {});
  },
  function () {
    return mcq("Quel outil convient le mieux pour marquer les repères d’un thermomètre construit en classe?", "Un thermomètre du commerce placé dans la même eau, pour comparer les lectures des deux instruments", ["Une règle graduée en centimètres, pour espacer les repères également sur toute la paille", "Un chronomètre précis, pour marquer un repère à chaque minute écoulée du chauffage", "Un baromètre de classe, pour associer chaque repère à la pression de l’air du moment"], "Étalonner, c’est comparer : placer le thermomètre construit à côté d’un thermomètre fiable dans la même eau permet de marquer des repères qui correspondent à de vraies températures.", {});
  }
]), ["Construire un thermomètre, c’est choisir une méthode de dilatation lisible, puis l’étalonner.", "Les repères valent ce que vaut l’instrument de comparaison."]);
E("s7f-u2-calibrate", 2, ["SC7.6.1"], 2, "var", varset([
  function () {
    return mcq("Une équipe plonge son thermomètre construit dans l’eau glacée, puis dans l’eau bouillante, et marque la hauteur du liquide dans chaque cas. Que fait l’équipe?", "Elle étalonne son thermomètre en marquant deux points fixes connus de son échelle", ["Elle vérifie si son thermomètre est étanche en le plongeant dans deux eaux différentes", "Elle mesure la quantité d’eau que son thermomètre peut contenir sans déborder", "Elle compare la couleur de son liquide avec celle des liquides des autres équipes"], "Marquer la hauteur à la glace fondante (0 °C) et à l’eau bouillante (100 °C), ce sont les deux points fixes : c’est l’étalonnage qui rend l’échelle utilisable.", {});
  }
]), ["Deux températures connues donnent deux repères : c’est la base de toute échelle.", "Étalonner précède mesurer."]);
E("s7f-u2-thermometer-test", 2, ["SC7.6.1"], 3, "var", varset([
  function () {
    return mcq("Le thermomètre construit par une équipe réagit lentement et ses lectures varient de plusieurs degrés pour la même eau tiède. Quelle modification améliorerait le plus sa mise à l’essai?", "Utiliser une paille plus fine et attendre que la lecture se stabilise avant de la consigner à chaque essai", ["Utiliser une bouteille plus grande et consigner la première lecture aperçue à chaque essai sans attendre", "Colorer l’eau davantage et lire la hauteur du liquide depuis le dessus de la bouteille à chaque essai", "Plonger le thermomètre quelques secondes seulement et estimer la lecture entre deux essais différents"], "Une paille fine amplifie les petites dilatations, et attendre la stabilisation donne des lectures reproductibles : la mise à l’essai devient à la fois plus sensible et plus fiable.", {});
  }
]), ["Deux défauts sont décrits : lenteur et instabilité. La correction doit traiter les lectures elles-mêmes.", "Lire trop tôt est la source classique des lectures qui varient."]);

/* ---------- SC7.6.2 Compiler et afficher les donnees du thermometre ---------- */
E("s7f-u2-thermometer-data", 2, ["SC7.6.2"], 1, "var", varset([
  function () {
    return mcq("Une équipe met à l’essai son thermomètre construit dans trois eaux (glacée, tiède, chaude) et compare ses lectures à celles d’un thermomètre du commerce. Quel affichage présente correctement ces données?", "Un tableau avec une ligne par eau, une colonne pour le thermomètre construit et une colonne pour le thermomètre du commerce", ["Un tableau avec une ligne par membre de l’équipe, une colonne pour le thermomètre construit et une colonne pour les commentaires", "Un paragraphe qui décrit les trois eaux sans présenter aucune des lectures consignées pendant les essais en classe", "Un dessin du thermomètre construit avec la lecture la plus élevée inscrite dans un coin de la feuille de l’équipe"], "Les données d’une mise à l’essai se comparent côte à côte : pour chaque eau, la lecture construite et la lecture de référence, dans un tableau étiqueté.", {});
  }
]), ["Compiler et afficher, c’est mettre les lectures comparables dans un même tableau.", "Chaque eau a deux lectures : construite et de référence."]);
E("s7f-u2-cr-thermometer-display", 2, ["SC7.6.2"], 2, "var", varset([
  function () {
    return textq("Voici les lectures d’une mise à l’essai : eau glacée, construit 1, commerce 0; eau tiède, construit 22, commerce 25; eau chaude, construit 45, commerce 50 (en degrés de chaque échelle). (a) Présente ces données dans un tableau organisé. (b) Énonce ce que les données montrent sur la précision du thermomètre construit. (2 points)", ["un tableau avec titre et colonnes étiquetées (eau, thermomètre construit, thermomètre du commerce)", "la conclusion : le thermomètre construit sous-estime, et l’écart grandit quand la température monte (0, 3, puis 5 degrés)"], "<b>Réponse modèle :</b> (a) Tableau intitulé « Lectures du thermomètre construit comparées au thermomètre du commerce » : lignes Eau glacée (1, 0), Eau tiède (22, 25), Eau chaude (45, 50). (b) Les données montrent que le thermomètre construit lit toujours plus bas que le thermomètre du commerce, et que l’écart augmente avec la température : 0 degré dans l’eau glacée, 3 degrés dans l’eau tiède et 5 degrés dans l’eau chaude. Son échelle s’étire donc moins vite que l’échelle réelle.<br><br><b>Points d’attribution :</b> 1 point pour un tableau organisé avec titre et en-têtes. 1 point pour la conclusion tirée des écarts, y compris leur augmentation avec la température.", {});
  }
]), ["Le tableau compare les deux instruments eau par eau.", "Calcule les écarts avant de conclure : leur comportement est la découverte."]);

/* ---------- SC7.6.3 Hypothese, experience, variables, conclusion ---------- */
E("s7f-u2-variables-plateau", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("Une équipe chauffe deux béchers d’eau, l’un de 100 mL et l’autre de 200 mL, sur des éléments identiques, pour comparer le temps d’ébullition. Quelle variable est la variable indépendante?", "La quantité d’eau dans chaque bécher, qui est la variable que l’équipe a fait varier", ["Le temps nécessaire pour atteindre l’ébullition, qui est la variable que l’équipe mesure", "La puissance des éléments chauffants, qui est la variable que l’équipe garde constante", "La sorte de bécher utilisée pour les deux chauffages, qui est gardée identique par l’équipe"], "La variable indépendante est celle qu’on fait varier délibérément : ici, la quantité d’eau. Le temps d’ébullition est la variable dépendante mesurée.", {});
  }
]), ["Indépendante : on la change. Dépendante : on la mesure.", "Les constantes sont nommées comme telles dans les choix."]);
E("s7f-u2-hypothesis-form", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces hypothèses est vérifiable par une expérience sur la fonte de la glace?", "« Si on saupoudre du sel sur la glace, alors elle fondra plus vite que la glace sans sel. »", ["« La glace fond parce que le printemps est la plus belle saison de toute l’année. »", "« Si on regarde la glace assez longtemps, alors elle finira par fondre un jour. »", "« La glace fond toujours trop lentement quand on a hâte de partir en excursion. »"], "Une hypothèse vérifiable relie une variable qu’on change (le sel) à un résultat qu’on mesure (la vitesse de fonte) : elle peut être appuyée ou réfutée par des données.", {});
  }
]), ["Format utile : si (variable changée), alors (résultat mesuré).", "Une opinion ou une évidence ne se vérifie pas par expérience."]);
E("s7f-u2-experiment-chain", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe veut vérifier si la couleur d’un contenant change la vitesse de refroidissement de l’eau chaude. Quelle suite d’étapes respecte l’ordre complet d’une démarche expérimentale?", "Formuler une hypothèse, faire varier seulement la couleur, mesurer les températures, puis énoncer une conclusion fondée sur les données", ["Énoncer une conclusion, formuler une hypothèse ensuite, puis décider quelles variables l’équipe aurait dû contrôler pendant l’essai", "Mesurer les températures, changer plusieurs variables à la fois, puis formuler une hypothèse qui explique les résultats obtenus", "Faire varier seulement la couleur, formuler la conclusion avant les mesures, puis choisir les données qui appuient la conclusion"], "La démarche complète suit un ordre : hypothèse d’abord, expérience contrôlée ensuite, mesures, et conclusion tirée des données à la fin, jamais avant.", {});
  }
]), ["La conclusion vient en dernier, et elle naît des données.", "Une seule variable change à la fois pendant l’expérience."]);
E("s7f-u2-cr-inquiry", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return textq("Une équipe chauffe 100 mL d’eau et consigne : 20 °C au départ, 45 °C après 2 minutes, 70 °C après 4 minutes, 95 °C après 6 minutes, puis 100 °C à 8 minutes et encore 100 °C à 10 minutes. (a) Énonce une conclusion fondée sur ces données. (b) Explique comment les données appuient ta conclusion, en citant les valeurs. (3 points)", ["la température monte régulièrement d’environ 25 °C par 2 minutes jusqu’à l’ébullition, puis reste à 100 °C", "les valeurs citées montrent la montée régulière, puis le plateau à 100 °C malgré le chauffage continu"], "<b>Réponse modèle :</b> (a) Conclusion : l’eau se réchauffe à un rythme régulier jusqu’à son point d’ébullition, puis sa température cesse de monter même si le chauffage continue. (b) Appui : les données montent de 20 à 45, puis 70, puis 95 °C, soit environ 25 °C toutes les 2 minutes; ensuite, les lectures restent à 100 °C à 8 et à 10 minutes, ce qui montre le plateau de l’ébullition, où l’énergie sert au changement d’état.<br><br><b>Points d’attribution :</b> 1 point pour la conclusion sur la montée régulière. 1 point pour la conclusion sur le plateau à 100 °C. 1 point pour les valeurs citées à l’appui des deux parties de la conclusion.", {});
  }
]), ["Décris d’abord le motif des nombres, puis nomme ce qu’il signifie.", "Les deux dernières lectures identiques sont aussi des données."]);

/* ---------- SC7.6.4 Outils et appareils : surete et precision ---------- */
E("s7f-u2-tools-safety", 2, ["SC7.6.4"], 1, "var", varset([
  function () {
    return mcq("Quelle pratique rend l’utilisation d’un élément chauffant à la fois sûre et précise pendant une expérience?", "Placer le bécher au centre de l’élément, surveiller le chauffage et lire le thermomètre à la hauteur des yeux", ["Placer le bécher au bord de l’élément, quitter la table et lire le thermomètre depuis le dessus du bécher", "Chauffer le bécher fermé hermétiquement, sans surveillance, et secouer le thermomètre pour lire la valeur", "Tenir le bécher à la main au-dessus de l’élément et deviner la température sans utiliser le thermomètre"], "Sécurité et précision vont ensemble : montage stable et surveillé, instrument lu correctement à la hauteur des yeux, et jamais de contenant scellé sur un élément chauffant.", {});
  },
  function () {
    return mcq("Avant de verser de l’eau chaude d’un bécher, quelle précaution est la plus importante?", "Vérifier que le bécher est conçu pour la chaleur et le saisir avec une pince ou un gant isolant prévu à cet effet", ["Secouer le bécher pour vérifier la température de l’eau avant de la verser dans l’évier de la classe", "Verser l’eau le plus vite possible pour passer moins de temps près du bécher chaud pendant l’expérience", "Tenir le bécher par le haut avec les doigts pour mieux contrôler le versement de l’eau chaude dedans"], "Un contenant chaud se manipule avec l’outil prévu (pince ou gant isolant) après avoir vérifié qu’il supporte la chaleur : c’est la précaution qui prévient les brûlures et les éclats.", {});
  }
]), ["Sûr et précis : les deux critères doivent être satisfaits ensemble.", "Un contenant scellé ou tenu à la main près d’un élément est un danger."]);
E("s7f-u2-tools-accurate", 2, ["SC7.6.4"], 2, "var", varset([
  function () {
    return mcq("Une équipe mesure la température d’une eau chauffée, mais le thermomètre touche le fond du bécher posé sur l’élément. Pourquoi leurs lectures sont-elles faussées?", "Parce que le thermomètre mesure alors la température du fond chauffé plutôt que celle de l’eau du bécher", ["Parce que le thermomètre mesure alors la température de l’air au-dessus de l’eau du bécher chauffé", "Parce que le fond du bécher refroidit le thermomètre et abaisse toutes ses lectures de moitié", "Parce que le contact avec le fond empêche complètement le liquide du thermomètre de se dilater"], "Le fond du bécher, en contact avec l’élément, est plus chaud que l’eau. Le thermomètre doit être suspendu dans l’eau, sans toucher les parois ni le fond, pour mesurer l’eau elle-même.", {});
  }
]), ["Un instrument mesure ce qu’il touche.", "L’erreur vient de l’emplacement de l’instrument, pas de l’instrument."]);

/* ---------- SC7.6.5 Organiser et afficher les donnees ---------- */
E("s7f-u2-table-build", 2, ["SC7.6.5"], 1, "var", varset([
  function () {
    return mcq("Une équipe consigne la température d’une eau qui refroidit chaque minute pendant dix minutes. Quel affichage organise correctement ces données?", "Un tableau avec une colonne pour le temps en minutes et une colonne pour la température en degrés Celsius", ["Un tableau avec une colonne pour le temps en minutes et une colonne pour la couleur de l’eau à chaque minute", "Un paragraphe qui raconte le refroidissement en phrases, sans présenter les températures consignées chaque minute", "Une liste des températures sans les minutes correspondantes, écrite dans l’ordre où l’équipe s’en souvient"], "Temps et température, avec leurs unités, dans des colonnes étiquetées : c’est l’organisation qui rend les données utilisables et graphables.", {});
  }
]), ["Chaque valeur doit rester liée à son moment et à son unité.", "Un affichage organisé prépare directement le graphique."]);
E("s7f-u2-graph-choice", 2, ["SC7.6.5"], 3, "var", varset([
  function () {
    return mcq("Des données montrent la température d’une eau chauffée, relevée toutes les deux minutes pendant vingt minutes. Quel graphique convient le mieux pour montrer l’évolution de la température?", "Un graphique en ligne, car la température varie continûment avec le temps pendant tout le chauffage", ["Un diagramme en barres, car la température varie continûment avec le temps pendant tout le chauffage", "Un pictogramme, car la température varie continûment avec le temps pendant tout le chauffage de l’eau", "Un graphique circulaire, car la température varie continûment avec le temps pendant tout le chauffage"], "Une grandeur qui varie continûment dans le temps se représente par un graphique en ligne : la pente y montre directement la vitesse du réchauffement et les plateaux.", {});
  }
]), ["Le type de graphique suit le type de données : continues ou en catégories.", "Temps continu égale ligne continue."]);
E("s7f-u2-cr-display", 2, ["SC7.6.5", "SC7.6.8"], 2, "var", varset([
  function () {
    return textq("Une équipe a mesuré la température d’une eau qui refroidit : 0 min, 80 °C; 2 min, 71 °C; 4 min, 63 °C; 6 min, 56 °C; 8 min, 50 °C; 10 min, 45 °C. (a) Dis quel affichage convient le mieux à ces données et pourquoi. (b) Décris la tendance que l’affichage révèle. (3 points)", ["un graphique en ligne (ou un tableau organisé), car les données varient continûment avec le temps", "la tendance : la température baisse de moins en moins vite (les écarts diminuent : 9, 8, 7, 6, 5 degrés)"], "<b>Réponse modèle :</b> (a) Un graphique en ligne convient le mieux : le temps et la température sont des grandeurs continues, et la ligne montre d’un coup d’œil comment le refroidissement évolue. (b) La température baisse tout au long des dix minutes, mais de moins en moins vite : les baisses par intervalle de 2 minutes sont de 9, 8, 7, 6 puis 5 degrés. Le refroidissement ralentit à mesure que l’eau s’approche de la température de la pièce.<br><br><b>Points d’attribution :</b> 1 point pour l’affichage choisi avec sa justification. 1 point pour la baisse continue décrite. 1 point pour le ralentissement du refroidissement, appuyé sur les écarts entre les lectures.", {});
  }
]), ["Choisis l’affichage selon la nature des données, puis lis sa forme.", "Compare les écarts successifs : ils racontent la tendance."]);

/* ---------- SC7.6.6 Concevoir une experience controlee ---------- */
E("s7f-u2-design-absorb", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("Pour vérifier si les surfaces foncées absorbent plus de rayonnement que les surfaces pâles, quelle organisation d’expérience contrôle correctement les variables?", "Deux boîtes identiques de couleurs différentes, sous la même lampe, à la même distance, avec la même durée d’exposition", ["Deux boîtes de tailles différentes, sous des lampes différentes, placées à des distances choisies au hasard", "Une seule boîte foncée sous une lampe pendant une heure, comparée au souvenir d’une boîte pâle testée hier", "Deux boîtes identiques de couleurs différentes, l’une au soleil et l’autre à l’ombre d’un rideau de la classe"], "Seule la couleur change; la lampe, la distance, la taille des boîtes et la durée restent identiques. Toute différence de température peut alors être attribuée à la surface.", {});
  }
]), ["Une variable changée (la couleur), toutes les autres gardées constantes.", "Si la lumière diffère entre les boîtes, l’expérience ne prouve rien."]);
E("s7f-u2-design-challenge", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe veut concevoir l’expérience suivante : quel contenant garde l’eau chaude le plus longtemps? Quelle formulation transforme cette question en expérience contrôlée complète?", "Comparer des contenants de formes différentes mais de même volume, remplis de la même eau à la même température de départ, mesurée aux mêmes intervalles", ["Comparer des contenants remplis de quantités d’eau différentes à des températures de départ choisies par chaque membre de l’équipe", "Comparer un seul contenant mesuré un jour chaud, puis le même contenant mesuré un jour froid de la semaine suivante à l’école", "Comparer des contenants de formes différentes en demandant aux élèves lequel semble garder l’eau chaude le plus longtemps"], "Une expérience complète fixe ce qui varie (la forme du contenant), ce qui se mesure (la température dans le temps) et ce qui reste constant (volume, température de départ, intervalles de mesure).", {});
  }
]), ["Question, variable, mesure, constantes : les quatre morceaux d’un plan complet.", "Une opinion (« semble ») n’est pas une mesure."]);
E("s7f-u2-cr-design-test", 2, ["SC7.6.6"], 3, "var", varset([
  function () {
    return textq("Conçois une expérience pour vérifier cette question : « Un contenant enveloppé de papier journal garde-t-il l’eau chaude plus longtemps qu’un contenant sans enveloppe? » Décris (a) ton hypothèse, (b) la variable que tu feras varier, (c) la variable que tu mesureras et comment, (d) deux variables constantes et (e) ta règle de décision. (4 points)", ["une hypothèse vérifiable comparant les deux contenants", "variable indépendante : la présence ou l’absence de l’enveloppe de papier journal", "variable dépendante : la température de l’eau mesurée aux mêmes intervalles pendant une durée fixe", "deux constantes (même contenant de base, même volume et même température de départ, même pièce)", "une règle de décision (comparer les températures finales ou les baisses totales des deux contenants)"], "<b>Réponse modèle :</b> (a) Hypothèse : l’eau du contenant enveloppé de papier journal restera plus chaude, car le papier emprisonne l’air et ralentit les pertes de chaleur. (b) Variable indépendante : la présence ou l’absence de l’enveloppe de papier journal. (c) Variable dépendante : la température de l’eau, mesurée avec le même thermomètre toutes les 2 minutes pendant 20 minutes. (d) Constantes : deux contenants identiques, le même volume d’eau à la même température de départ, la même pièce et les mêmes moments de mesure. (e) Décision : je compare la baisse totale de température des deux contenants; si le contenant enveloppé a perdu nettement moins de degrés, les données appuient l’hypothèse.<br><br><b>Points d’attribution :</b> 1 point pour une hypothèse vérifiable. 1 point pour la variable indépendante et la variable dépendante avec son mode de mesure. 1 point pour deux constantes pertinentes. 1 point pour une règle de décision fondée sur la comparaison des résultats.", {});
  }
]), ["Cinq morceaux : hypothèse, variable variée, variable mesurée, constantes, décision.", "La mesure doit préciser l’instrument, les intervalles et la durée."]);

/* ---------- SC7.6.7 Utiliser les appareils de facon securitaire ---------- */
E("s7f-u2-apparatus-safety", 2, ["SC7.6.7"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces conduites est sécuritaire pendant une expérience avec de l’eau chaude et du verre?", "Signaler immédiatement tout bris de verre à l’enseignant et ne jamais ramasser les morceaux à mains nues", ["Ramasser les morceaux de verre à mains nues et les jeter rapidement dans la poubelle de la classe", "Continuer l’expérience avec un bécher fêlé en le tenant fermement pendant tout le chauffage de l’eau", "Goûter l’eau chauffée pour vérifier sa température avant de la mesurer avec le thermomètre prévu"], "Le verre brisé se signale et se laisse aux soins de l’enseignant avec l’équipement prévu. Un bécher fêlé ne s’utilise jamais, et on ne goûte jamais les substances d’une expérience.", {});
  }
]), ["La sécurité d’abord : signaler, ne pas toucher, ne pas utiliser le matériel endommagé.", "Une seule conduite respecte toutes les règles à la fois."]);
E("s7f-u2-apparatus-choice", 2, ["SC7.6.7"], 2, "var", varset([
  function () {
    return mcq("Pour transférer 100 mL d’eau chaude d’un bécher à un cylindre gradué sans éclaboussures, quel choix d’outil et de geste est le plus sûr?", "Verser lentement le long d’une tige de verre, le cylindre posé sur la table, en tenant le bécher avec une pince prévue", ["Verser rapidement en tenant le cylindre à bout de bras au-dessus de l’évier, en saisissant le bécher à mains nues", "Verser l’eau en secouant le bécher pour vider les dernières gouttes, le cylindre tenu à la main par un coéquipier", "Verser l’eau chaude à travers un entonnoir étroit tenu au-dessus du cylindre posé sur le bord de la table de travail"], "Un versement sûr est lent et contrôlé : récipient stable sur la table, tige de verre pour guider le liquide, et bécher chaud tenu avec l’outil isolant prévu.", {});
  }
]), ["Stabilité, lenteur et protection des mains : les trois critères du geste sûr.", "Tout ce qui est tenu en l’air ou secoué augmente le risque."]);

/* ---------- SC7.6.8 Afficher les donnees en tableaux et graphiques ---------- */
E("s7f-u2-graph-key", 2, ["SC7.6.8"], 1, "var", varset([
  function () {
    var q = mcq("Sur le graphique des deux boîtes sous la lampe, que faut-il consulter pour savoir quelle courbe appartient à la boîte foncée?", "La légende du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience", ["Le titre des axes du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience", "La taille du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience menée", "La date de l’expérience, qui associe chaque couleur de courbe à la boîte qu’elle représente dans le graphique affiché"], "La légende est la clé du graphique : elle dit quelle courbe correspond à quelle boîte. Sans elle, les courbes ne peuvent pas être interprétées correctement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Un graphique complet comprend une légende quand plusieurs séries y figurent.", "Axes, titre et légende ont chacun leur travail."]);
E("s7f-u2-display-absorb", 2, ["SC7.6.8", "SC7.6.5"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre les températures des deux boîtes sous la lampe. Après 20 minutes, quel écart sépare les deux boîtes, et que montre cet écart?", "Un écart de 12 °C, qui montre que la surface foncée a absorbé le rayonnement plus vite que la surface claire", ["Un écart de 12 °C, qui montre que la surface claire a absorbé le rayonnement plus vite que la surface foncée", "Un écart de 22 °C, qui montre que la surface foncée a absorbé le rayonnement plus vite que la surface claire", "Un écart de 2 °C, qui montre que les deux surfaces ont absorbé le rayonnement exactement au même rythme"], "À 20 minutes, la boîte foncée atteint 42 °C et la boîte claire 30 °C : l’écart est de 12 °C. Sous la même lampe, cet écart montre que la surface foncée absorbe le rayonnement plus efficacement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Lis les deux valeurs finales, puis soustrais.", "L’écart se lit à la fin; son interprétation suit la règle d’absorption."]);

/* ---------- SC7.6.9 Conclusions fondees sur les donnees ---------- */
E("s7f-u2-conclusion-support", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Hypothèse : « L’eau salée bout à une température plus élevée que l’eau pure. » Les mesures donnent 100 °C pour l’eau pure et 102 °C pour l’eau salée, répétées trois fois. Quelle conclusion est correcte?", "Les données appuient l’hypothèse, car l’eau salée a bouilli à une température plus élevée à chaque essai répété", ["Les données réfutent l’hypothèse, car l’eau salée a bouilli à une température plus élevée à chaque essai répété", "Les données ne disent rien, car un seul essai aurait suffi pour trancher la question dès le départ de l’expérience", "Les données appuient l’hypothèse contraire, car l’eau pure a bouilli à une température plus basse à chaque essai"], "L’hypothèse prévoyait une ébullition plus chaude pour l’eau salée; les mesures répétées le confirment (102 °C contre 100 °C) : les données appuient l’hypothèse.", {});
  }
]), ["Compare la prévision et les mesures, sans inverser les rôles.", "Des essais répétés qui s’accordent renforcent une conclusion."]);
E("s7f-u2-conclusion-refute", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Hypothèse : « Un contenant noir garde l’eau chaude plus longtemps qu’un contenant blanc. » Après 15 minutes, l’eau du contenant noir est à 48 °C et celle du contenant blanc à 55 °C. Quelle conclusion est correcte?", "Les données réfutent l’hypothèse, car l’eau du contenant noir s’est refroidie davantage que celle du contenant blanc", ["Les données appuient l’hypothèse, car l’eau du contenant noir s’est refroidie davantage que celle du contenant blanc", "Les données appuient l’hypothèse, car les deux contenants ont gardé leur eau exactement à la même température finale", "Les données ne disent rien, car une seule mesure finale ne peut jamais servir à conclure quoi que ce soit du tout"], "L’hypothèse prévoyait un avantage pour le contenant noir; les mesures montrent le contraire (48 °C contre 55 °C) : les données réfutent l’hypothèse pour cet essai.", {});
  }
]), ["La conclusion suit les nombres, pas l’attente de l’équipe.", "Réfuter est un résultat valide, pas un échec."]);
E("s7f-u2-cr-conclusion", 2, ["SC7.6.9"], 3, "var", varset([
  function () {
    return textq("Hypothèse d’une équipe : « Doubler l’épaisseur du papier journal autour d’un contenant doublera le temps pendant lequel l’eau reste au-dessus de 60 °C. » Résultats : sans enveloppe, 6 minutes; une épaisseur, 11 minutes; deux épaisseurs, 15 minutes. Énonce une conclusion complète : dis ce que les données appuient, ce qu’elles réfutent, et cite les valeurs. (3 points)", ["les données appuient l’idée que l’enveloppe ralentit le refroidissement (6, puis 11, puis 15 minutes)", "les données réfutent le doublement exact (11 n’est pas 12, et 15 n’est pas 22)", "la conclusion distingue l’effet réel de l’isolant de la proportion exacte prédite"], "<b>Réponse modèle :</b> Les données appuient l’idée générale de l’hypothèse : chaque épaisseur ajoutée prolonge le temps au-dessus de 60 °C, qui passe de 6 minutes sans enveloppe à 11 minutes avec une épaisseur, puis à 15 minutes avec deux épaisseurs. En revanche, les données réfutent le doublement exact prévu : une épaisseur aurait dû donner 12 minutes (elle donne 11), et deux épaisseurs 22 minutes (elles donnent 15). La conclusion complète est donc nuancée : l’isolant fonctionne, mais son effet augmente moins vite que le doublement annoncé.<br><br><b>Points d’attribution :</b> 1 point pour la partie appuyée, avec les valeurs. 1 point pour la partie réfutée, avec les valeurs comparées aux prévisions. 1 point pour une conclusion qui distingue l’effet réel de la proportion prédite.", {});
  }
]), ["Une conclusion complète peut appuyer une partie et réfuter l’autre.", "Compare chaque résultat à la prévision exacte, pas seulement à l’idée générale."]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U2 = { "s7f-u2-cr-design-test": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });

/* ----- bank-u3.js ----- */
// CRMARKS: s7f-u3-cr-pure=2
// CRMARKS: s7f-u3-cr-classify=3
// CRMARKS: s7f-u3-cr-dissolving=3
// CRMARKS: s7f-u3-cr-concentration=3
// CRMARKS: s7f-u3-cr-solubility=2
// CRMARKS: s7f-u3-cr-separate=3
// CRMARKS: s7f-u3-cr-three-part=3
// CRMARKS: s7f-u3-cr-distill=2
// CRMARKS: s7f-u3-cr-salt-decision=3
// CRMARKS: s7f-u3-cr-best-fit=3
// CRMARKS: s7f-u3-cr-design-solubility=4
// CRMARKS: s7f-u3-cr-new-question=2
// Sciences 7, Unite 3 : Les melanges et les solutions (SC7.7.1 a
// SC7.9.8), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Residus CORE : les questions de SC7.7.6 et SC7.9.6 evaluent le choix et
// l'ordre des techniques de separation ainsi que le jugement sur les
// procedures; elles n'evaluent pas la manipulation reelle en laboratoire.
// Les questions de SC7.9.7 evaluent le jugement sur l'usage efficace et
// exact des instruments; elles n'evaluent pas la manipulation elle-meme.

/* ---------- SC7.7.1 Substances pures et melanges ---------- */
E("s7f-u3-classify-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces substances est une substance pure, selon la théorie particulaire de la matière?", "L’eau distillée, formée d’un seul type de particules identiques entre elles", ["L’eau de mer, formée de particules d’eau et de sels dissous variés", "L’air de la classe, formé de plusieurs gaz mélangés les uns aux autres", "Le jus d’orange, formé d’eau, de sucres et de pulpe en suspension"], "Une substance pure ne contient qu’un seul type de particules. L’eau distillée n’en contient qu’un; l’eau de mer, l’air et le jus sont des mélanges de plusieurs types de particules.", {});
  },
  function () {
    var q = mcq("Dans le schéma des particules, quel récipient montre une substance pure?", "Le récipient 1, qui contient un seul type de particules du début à la fin", ["Le récipient 2, qui contient deux types de particules mélangés également", "Le récipient 3, qui contient deux types de particules séparés en couches", "Aucun récipient, car les trois contiennent plusieurs types de particules"], "Le récipient 1 ne contient qu’un seul type de particules : c’est une substance pure. Les récipients 2 et 3 contiennent deux types de particules : ce sont des mélanges.", {}); q.figure = s7fMixturePanelSVG(); return q;
  }
]), ["Substance pure égale un seul type de particules.", "Compte les types de particules, pas leur nombre."]);
E("s7f-u3-particle-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    return mcq("Un échantillon contient uniquement des particules toutes identiques. Comment classe-t-on cet échantillon?", "Comme une substance pure, car un seul type de particules le compose entièrement", ["Comme un mélange homogène, car un seul type de particules le compose entièrement", "Comme un mélange hétérogène, car les particules sont réparties également partout", "Comme une solution, car les particules sont trop petites pour être vues à l’œil nu"], "Un seul type de particules signifie une substance pure. Un mélange, homogène ou non, contient toujours au moins deux types de particules.", {});
  }
]), ["La définition décide : un type ou plusieurs types de particules?", "La répartition égale ne transforme pas une substance pure en mélange."]);
E("s7f-u3-pure-misconception", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return mcq("Un élève affirme : « L’eau du robinet est une substance pure parce qu’elle est claire et propre. » Quelle réponse corrige correctement cette affirmation?", "« L’eau du robinet est un mélange : elle contient des minéraux dissous et des produits de traitement en plus des particules d’eau. »", ["« L’eau du robinet est une substance pure : toute eau claire et propre ne contient qu’un seul type de particules. »", "« L’eau du robinet est un mélange hétérogène : on peut voir ses minéraux à l’œil nu quand on la regarde de près. »", "« L’eau du robinet est une substance pure seulement l’hiver, quand les minéraux dissous gèlent dans les tuyaux. »"], "La clarté ne décide pas de la pureté chimique. L’eau du robinet contient des substances dissoutes invisibles : c’est un mélange (une solution), pas une substance pure.", {});
  }
]), ["Pur, en sciences, décrit les particules, pas l’apparence.", "Invisible ne veut pas dire absent : les substances dissoutes comptent."]);
E("s7f-u3-cr-pure", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return textq("Un élève mélange du sable fin dans de l’eau distillée, agite, puis laisse reposer. (a) Classe l’eau distillée de départ et le mélange final, en utilisant la théorie particulaire. (b) Explique pourquoi le classement change après l’ajout du sable. (2 points)", ["l’eau distillée est une substance pure (un seul type de particules)", "le mélange final contient deux types de particules (eau et sable) : c’est un mélange, et comme le sable finit par se déposer, un mélange hétérogène"], "<b>Réponse modèle :</b> (a) L’eau distillée de départ est une substance pure : elle ne contient qu’un seul type de particules. Après l’ajout du sable, le contenu du récipient est un mélange, car il contient deux types de particules, celles de l’eau et celles du sable; comme le sable se dépose au fond au lieu de se répartir également, c’est un mélange hétérogène. (b) Le classement change parce que le nombre de types de particules change : un seul type donne une substance pure, deux types ou plus donnent un mélange.<br><br><b>Points d’attribution :</b> 1 point pour les deux classements corrects. 1 point pour l’explication fondée sur le nombre de types de particules.", {});
  }
]), ["Classe par les particules : avant, un type; après, deux types.", "Le sable déposé au fond annonce le caractère hétérogène."]);

/* ---------- SC7.7.2 Melanges heterogenes et homogenes ---------- */
E("s7f-u3-classify-mixtures", 3, ["SC7.7.2"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces mélanges est un mélange homogène (une solution)?", "L’eau salée, où le sel dissous est réparti également dans toute l’eau contenue", ["Le mélange de sable et d’eau, où le sable se dépose au fond du récipient", "La salade de fruits, où chaque morceau de fruit reste visible et distinct", "Le granit, où chaque minéral forme des grains visibles dans la roche"], "Dans un mélange homogène, les particules sont réparties également et on ne distingue pas les composantes : l’eau salée en est un exemple. Les autres mélanges montrent des parties distinctes : ils sont hétérogènes.", {});
  },
  function () {
    return mcq("Lequel de ces mélanges est un mélange hétérogène (mécanique)?", "Le mélange de céréales, où chaque sorte de grain reste visible et séparable", ["L’eau sucrée, où le sucre dissous est réparti également dans toute l’eau", "L’air, où les gaz sont répartis également dans toute l’atmosphère terrestre", "Le vinaigre, où l’acide est réparti également dans toute l’eau du produit"], "Un mélange hétérogène garde des parties distinctes et visibles : les grains de céréales. Les autres exemples sont des solutions, aux composantes réparties également.", {});
  }
]), ["Homogène : impossible de distinguer les parties. Hétérogène : les parties se voient.", "Dissous et réparti également égale solution."]);
E("s7f-u3-light-test", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("On fait traverser un faisceau lumineux à deux liquides : dans le premier, le faisceau reste invisible; dans le second, son trajet brille dans le liquide. Que peut-on conclure?", "Le second liquide contient des particules en suspension assez grosses pour diffuser la lumière : ce n’est pas une vraie solution", ["Le premier liquide contient des particules en suspension assez grosses pour diffuser la lumière dans toutes les directions", "Les deux liquides sont des solutions véritables, car un faisceau peut traverser n’importe quel mélange sans exception", "Le second liquide est une substance pure, car seules les substances pures peuvent diffuser la lumière d’un faisceau"], "Dans une vraie solution, les particules dissoutes sont trop petites pour diffuser la lumière : le faisceau reste invisible. Un trajet brillant signale des particules en suspension : un mélange hétérogène très fin.", {});
  }
]), ["Le faisceau visible trahit des particules assez grosses pour diffuser la lumière.", "Dissous égale trop petit pour être vu, même par un faisceau."]);
E("s7f-u3-combination", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("Un verre contient de l’eau, du sable déposé au fond, du sel dissous invisible et une goutte d’huile qui flotte. Quel énoncé classe correctement le contenu du verre?", "C’est un mélange globalement hétérogène, qui contient en plus une solution (l’eau salée) comme l’une de ses parties", ["C’est une solution complète, car le sel dissous rend tout le contenu homogène du haut jusqu’au fond du verre", "C’est une substance pure, car l’eau constitue la plus grande partie du contenu du verre examiné en classe", "C’est un mélange homogène, car l’huile, le sable et l’eau finissent toujours par se mélanger également"], "Le verre entier n’est pas uniforme (sable au fond, huile en surface) : c’est un mélange hétérogène. Mais sa partie liquide, l’eau salée, est elle-même une solution : les deux classements coexistent à des niveaux différents.", {});
  }
]), ["Classe le tout, puis classe chaque partie séparément.", "Un mélange peut contenir une solution sans être une solution."]);
E("s7f-u3-cr-classify", 3, ["SC7.7.2"], 3, "var", varset([
  function () {
    return textq("Classe chacun de ces mélanges comme homogène ou hétérogène, et justifie chaque classement par la répartition de ses particules : (a) du lait au chocolat bien brassé; (b) de l’eau de mer filtrée des débris; (c) un bol de soupe aux légumes. (3 points)", ["le lait au chocolat bien brassé : homogène en apparence d’usage courant (les particules sont réparties finement); on accepte aussi hétérogène très fin si la justification parle de particules de cacao et de gras en suspension", "l’eau de mer filtrée : homogène, car les sels sont dissous et répartis également", "la soupe aux légumes : hétérogène, car les morceaux restent distincts et inégalement répartis"], "<b>Réponse modèle :</b> (a) Le lait au chocolat bien brassé paraît homogène à l’œil : ses particules sont réparties très finement dans tout le liquide (on accepte aussi « hétérogène très fin », si la justification nomme les particules de cacao et de matière grasse en suspension). (b) L’eau de mer filtrée est homogène : une fois les débris retirés, les sels dissous sont répartis également dans toute l’eau. (c) La soupe aux légumes est hétérogène : ses morceaux restent visibles, distincts et inégalement répartis. Dans chaque cas, le classement suit la répartition des particules : égale et indistincte pour l’homogène, inégale et distincte pour l’hétérogène.<br><br><b>Points d’attribution :</b> 1 point pour le classement du lait au chocolat avec sa justification. 1 point pour l’eau de mer homogène, justifiée par la dissolution. 1 point pour la soupe hétérogène, justifiée par les parties distinctes.", {});
  }
]), ["Un classement par mélange, chacun justifié par les particules.", "La question se décide sur la répartition, pas sur l’apparence générale."]);

/* ---------- SC7.7.3 Dissolution, solute et solvant ---------- */
E("s7f-u3-solute-solvent", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("On prépare une limonade en dissolvant du sucre dans de l’eau. Quels sont le soluté et le solvant?", "Le soluté est le sucre dissous et le solvant est l’eau qui le dissout dans la limonade", ["Le soluté est l’eau dissoute et le solvant est le sucre qui la dissout dans la limonade", "Le soluté est le sucre dissous et le solvant est le verre qui contient la limonade préparée", "Le soluté est la limonade entière et le solvant est le sucre ajouté à la fin de la préparation"], "Le soluté est la substance qui se dissout (le sucre); le solvant est la substance qui dissout (l’eau). Leur union forme la solution.", {});
  },
  function () {
    return mcq("Dans une teinture d’iode, une petite quantité d’iode est dissoute dans beaucoup d’alcool. Quels sont le soluté et le solvant?", "Le soluté est l’iode et le solvant est l’alcool, présent en plus grande quantité dans la teinture", ["Le soluté est l’alcool et le solvant est l’iode, présent en plus grande quantité dans la teinture", "Le soluté est la teinture entière et le solvant est le flacon qui la contient au complet", "Le soluté est l’iode et le solvant est l’air qui entoure le flacon pendant son utilisation"], "Le solvant est généralement la substance présente en plus grande quantité, celle qui dissout : ici l’alcool. L’iode, dissous, est le soluté.", {});
  }
]), ["Soluté : dissous. Solvant : dissout. Les deux mots se ressemblent; leurs rôles sont opposés.", "Le solvant est souvent le liquide présent en plus grande quantité."]);
E("s7f-u3-dissolving-particles", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("Selon le modèle particulaire, que se passe-t-il quand du sel se dissout dans l’eau?", "Les particules de sel se détachent les unes des autres et se répartissent également parmi les particules d’eau", ["Les particules de sel fondent et deviennent des particules d’eau identiques à celles du solvant utilisé", "Les particules de sel disparaissent complètement et cessent d’exister dans la solution obtenue", "Les particules de sel deviennent plus grosses et se déposent lentement au fond du récipient agité"], "Dissoudre ne détruit rien : les particules du soluté se séparent et se dispersent également parmi les particules du solvant. C’est pourquoi le sel reste récupérable par évaporation.", {});
  }
]), ["Les particules du soluté survivent à la dissolution; elles se dispersent.", "Récupérable par évaporation : la preuve que rien n’a disparu."]);
E("s7f-u3-solution-states", 3, ["SC7.7.3"], 2, "var", varset([
  function () {
    return mcq("Laquelle de ces solutions contient un soluté gazeux?", "Une boisson gazeuse, où du dioxyde de carbone est dissous dans l’eau sous pression", ["Une eau salée, où du sel solide est dissous dans l’eau à la pression ordinaire", "Un sirop, où du sucre solide est dissous dans l’eau chaude du récipient utilisé", "Un vinaigre, où un liquide est dissous dans l’eau à la température de la pièce"], "Les bulles d’une boisson gazeuse viennent d’un gaz dissous, le dioxyde de carbone : une solution peut donc contenir un soluté gazeux dans un solvant liquide.", {});
  }
]), ["Un soluté n’est pas forcément un solide : il peut être liquide ou gazeux.", "Les bulles qui s’échappent à l’ouverture étaient dissoutes sous pression."]);
E("s7f-u3-cr-dissolving", 3, ["SC7.7.3"], 3, "var", varset([
  function () {
    return textq("Un cube de sucre déposé dans un thé chaud « disparaît » en quelques minutes. Explique, avec le modèle particulaire de la matière, où est passé le sucre et pourquoi on goûte le sucre dans tout le thé, même dans la première gorgée du haut. (3 points)", ["les particules de sucre se détachent du cube et se séparent les unes des autres", "elles se répartissent également parmi les particules d’eau dans tout le thé", "le goût uniforme prouve la répartition égale; le sucre existe toujours et serait récupérable par évaporation"], "<b>Réponse modèle :</b> Le sucre n’a pas disparu. Au contact de l’eau chaude, ses particules se détachent du cube une à une et se dispersent parmi les particules d’eau. Le brassage et le mouvement des particules les répartissent également dans tout le thé : c’est pourquoi chaque gorgée, même la première en surface, goûte le sucre. La dissolution est une dispersion, pas une destruction : en faisant évaporer l’eau, on récupérerait le sucre.<br><br><b>Points d’attribution :</b> 1 point pour les particules de sucre qui se détachent et se séparent. 1 point pour la répartition égale dans tout le solvant. 1 point pour la conservation du sucre, appuyée par le goût uniforme ou la récupération par évaporation.", {});
  }
]), ["Le mot « disparaît » est le piège : suis les particules.", "Le goût uniforme est une preuve de répartition, pas seulement un détail."]);

/* ---------- SC7.7.4 Concentrations des solutions ---------- */
E("s7f-u3-conc-compare", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    var q = mcq("Trois béchers contiennent des solutions de jus en poudre : le bécher A, 10 g dans 200 mL; le bécher B, 10 g dans 100 mL; le bécher C, 20 g dans 200 mL. Quel énoncé compare correctement leurs concentrations?", "Les béchers B et C ont la même concentration, deux fois plus élevée que celle du bécher A montré", ["Le bécher A a la concentration la plus élevée, car il contient le plus grand volume de solution", "Le bécher C a une concentration deux fois plus faible que celle du bécher B, car son volume double", "Les trois béchers ont la même concentration, car ils contiennent tous du jus en poudre dissous"], "La concentration compare la quantité de soluté au volume de solution. B : 10 g par 100 mL. C : 20 g par 200 mL, c’est-à-dire aussi 10 g par 100 mL. A : 10 g par 200 mL, soit la moitié. B et C sont donc égaux et doubles de A.", {}); q.figure = s7fConcentrationSVG([{label: 'Becher A', solute: 10, vol: 200}, {label: 'Becher B', solute: 10, vol: 100}, {label: 'Becher C', solute: 20, vol: 200}]); return q;
  },
  function () {
    return mcq("On verse la moitié d’une solution de 20 g de sel dans 200 mL d’eau dans un autre bécher. Que devient la concentration de chaque moitié?", "Elle reste la même dans les deux béchers, car le rapport entre le sel et l’eau ne change pas au partage", ["Elle double dans le premier bécher, car il contient maintenant la même quantité de sel qu’au départ", "Elle tombe à zéro dans le second bécher, car le sel reste toujours dans le premier bécher versé", "Elle diminue de moitié dans les deux béchers, car le volume de chacun a diminué de moitié aussi"], "Partager une solution partage le soluté et le solvant dans la même proportion : le rapport, donc la concentration, reste identique dans chaque moitié.", {});
  }
]), ["Concentration égale quantité de soluté par volume de solution.", "Ramène chaque bécher à la même base : grammes par 100 mL."]);
E("s7f-u3-saturated", 3, ["SC7.7.4"], 1, "var", varset([
  function () {
    return mcq("On ajoute du sucre à un verre d’eau en brassant. À un moment, le sucre ajouté cesse de se dissoudre et reste au fond malgré le brassage. Comment qualifie-t-on la solution?", "Elle est saturée : elle contient le maximum de sucre qu’elle peut dissoudre à cette température", ["Elle est diluée : elle contient le maximum de sucre qu’elle peut dissoudre à cette température", "Elle est concentrée au point de devenir une substance pure à cette température précise", "Elle est devenue un mélange hétérogène définitif qui ne peut plus dissoudre de sucre du tout"], "Une solution saturée contient le maximum de soluté dissous possible à cette température : tout ajout reste non dissous au fond. Chauffer la solution permettrait d’en dissoudre davantage.", {});
  }
]), ["Le soluté qui refuse de se dissoudre annonce la saturation.", "Saturée ne veut pas dire « pour toujours » : la température change la limite."]);
E("s7f-u3-conc-change", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    return mcq("Une solution de 15 g de sel dans 100 mL d’eau est trop salée pour une expérience. Quelle action la rend moins concentrée sans changer la quantité de sel déjà dissoute?", "Ajouter de l’eau pure pour augmenter le volume, ce qui dilue le même sel dans plus de solvant", ["Faire évaporer une partie de l’eau pour diminuer le volume, ce qui étend le même sel partout", "Brasser la solution plus longtemps pour répartir le même sel dans le même volume d’eau froide", "Refroidir la solution pour ralentir les particules, ce qui rend le même sel moins présent"], "Diluer, c’est ajouter du solvant : la même quantité de sel se répartit dans un plus grand volume, donc la concentration baisse. Évaporer l’eau ferait l’inverse.", {});
  }
]), ["Deux leviers : plus de solvant dilue; moins de solvant concentre.", "La quantité de sel ne change pas dans la bonne réponse."]);
E("s7f-u3-cr-concentration", 3, ["SC7.7.4"], 3, "var", varset([
  function () {
    return textq("Une recette d’expérience demande une solution de sel à 5 g par 100 mL. Un élève a préparé 300 mL d’une solution à 10 g par 100 mL. (a) Calcule la quantité de sel dissoute dans ses 300 mL. (b) Explique comment il peut obtenir la concentration demandée à partir de sa solution, et calcule le volume final. (3 points)", ["le sel dissous : 10 g par 100 mL fois 3, donc 30 g de sel dans les 300 mL", "la dilution : ajouter de l’eau pour doubler le volume, car la concentration doit être divisée par deux", "le volume final : 600 mL à 5 g par 100 mL, qui contient toujours les mêmes 30 g de sel"], "<b>Réponse modèle :</b> (a) À 10 g par 100 mL, chaque tranche de 100 mL contient 10 g de sel; 300 mL contiennent donc 3 fois 10 g, soit 30 g de sel. (b) Pour passer de 10 g à 5 g par 100 mL, il faut diviser la concentration par deux, donc doubler le volume en ajoutant de l’eau pure : le volume final est de 600 mL. Les 30 g de sel sont inchangés; ils sont simplement répartis dans deux fois plus d’eau, ce qui donne bien 5 g par 100 mL.<br><br><b>Points d’attribution :</b> 1 point pour la quantité de sel calculée (30 g). 1 point pour la méthode de dilution par ajout d’eau. 1 point pour le volume final de 600 mL, avec la conservation des 30 g de sel.", {});
  }
]), ["Travaille par tranches de 100 mL pour le calcul de départ.", "Diluer ne retire pas de sel; cela ajoute de l’eau."]);

/* ---------- SC7.7.5 Facteurs de la solubilite ---------- */
E("s7f-u3-solubility-temp", 3, ["SC7.7.5"], 1, "var", varset([
  function () {
    return mcq("Comment la solubilité de la plupart des solutés solides change-t-elle quand la température de l’eau augmente?", "Elle augmente : l’eau chaude peut dissoudre une plus grande quantité du solide donné", ["Elle diminue : l’eau chaude peut dissoudre une plus petite quantité du solide donné", "Elle reste exactement la même : la température ne change jamais la solubilité des solides", "Elle devient nulle : l’eau chaude ne peut plus dissoudre aucun solide quel qu’il soit"], "Pour la plupart des solides, la solubilité augmente avec la température : c’est pourquoi le sucre se dissout davantage dans un thé chaud que dans un thé glacé.", {});
  },
  function () {
    return mcq("Pourquoi une boisson gazeuse tiède perd-elle ses bulles plus vite qu’une boisson gazeuse froide?", "Parce que la solubilité des gaz diminue quand la température augmente, donc le gaz s’échappe de la boisson tiède", ["Parce que la solubilité des gaz augmente quand la température augmente, donc le gaz s’échappe de la boisson tiède", "Parce que le gaz d’une boisson tiède se transforme en liquide et coule au fond de la bouteille ouverte", "Parce que la chaleur crée de nouvelles bulles qui poussent les anciennes hors de la boisson tiède"], "Les gaz se comportent à l’inverse des solides : leur solubilité diminue quand la température monte. Réchauffée, la boisson ne peut plus garder son gaz dissous, qui s’échappe en bulles.", {});
  }
]), ["Solides et gaz réagissent en sens opposés à la température.", "Pense au thé sucré pour les solides et à la boisson gazeuse pour les gaz."]);
E("s7f-u3-solubility-pressure", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return mcq("Une bouteille de boisson gazeuse est fermée sous pression. Au moment de l’ouverture, un sifflement se fait entendre et des bulles se forment partout. Quelle explication est correcte?", "La pression baisse à l’ouverture, la solubilité du gaz diminue, et le gaz dissous s’échappe en bulles dans la boisson", ["La pression monte à l’ouverture, la solubilité du gaz augmente, et le gaz dissous s’échappe en bulles dans la boisson", "La température baisse à l’ouverture, la solubilité du gaz diminue, et le gaz dissous se transforme en glace dans la boisson", "La pression baisse à l’ouverture, le gaz se dissout davantage, et les bulles viennent de l’air extérieur qui entre"], "Sous pression dans la bouteille fermée, beaucoup de gaz reste dissous. À l’ouverture, la pression chute, la solubilité du gaz diminue d’autant, et l’excès de gaz s’échappe : ce sont les bulles et le sifflement.", {});
  }
]), ["La pression agit surtout sur les gaz dissous.", "Bouteille fermée : haute pression, gaz gardé. Ouverte : pression basse, gaz libéré."]);
E("s7f-u3-cr-solubility", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return textq("Un lac se réchauffe pendant une longue canicule, et les poissons montrent des signes de manque d’oxygène même si l’eau reste claire. Explique ce phénomène à l’aide des facteurs qui affectent la solubilité d’un gaz. (2 points)", ["l’oxygène est un gaz dissous dans l’eau du lac", "la solubilité des gaz diminue quand la température augmente, donc l’eau chaude du lac contient moins d’oxygène dissous pour les poissons"], "<b>Réponse modèle :</b> Les poissons respirent l’oxygène dissous dans l’eau, un gaz en solution. Or la solubilité d’un gaz diminue quand la température de l’eau augmente. Pendant la canicule, l’eau du lac, plus chaude, ne peut donc plus garder autant d’oxygène dissous : la quantité disponible pour les poissons baisse, même si l’eau reste claire et semble inchangée.<br><br><b>Points d’attribution :</b> 1 point pour l’oxygène identifié comme un gaz dissous dont dépendent les poissons. 1 point pour le lien entre température élevée et solubilité réduite des gaz.", {});
  }
]), ["Le facteur en jeu est la température, et le soluté est un gaz.", "Applique la règle des gaz, pas celle des solides."]);

/* ---------- SC7.7.6 Identifier et separer les composantes ---------- */
E("s7f-u3-method-match", 3, ["SC7.7.6"], 1, "var", varset([
  function () {
    return mcq("Quelle technique sépare un mélange de sable et d’eau en exploitant la grosseur des particules?", "La filtration, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", ["L’évaporation, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", "La distillation, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", "La décantation magnétique, qui retient le sable et laisse passer l’eau du mélange versé"], "La filtration sépare selon la grosseur : les grains de sable, trop gros pour les pores du filtre, sont retenus, pendant que l’eau traverse.", {});
  },
  function () {
    return mcq("Quelle technique sépare le sel dissous de l’eau salée en exploitant le point d’ébullition de l’eau?", "L’évaporation, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", ["La filtration, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", "Le tamisage, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", "La décantation, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée"], "Le sel dissous passe à travers tout filtre : il faut changer l’eau d’état. L’évaporation transforme l’eau en vapeur et laisse le sel solide derrière.", {});
  }
]), ["Chaque technique exploite une propriété différente : grosseur, ébullition, densité, magnétisme.", "Dissous signifie trop petit pour un filtre."]);
E("s7f-u3-method-property", 3, ["SC7.7.6"], 2, "var", varset([
  function () {
    return mcq("Un mélange contient de la limaille de fer, du sable et des copeaux de bois dans l’eau. Quelle suite de techniques sépare les trois solides le plus efficacement?", "Un aimant retire le fer, la filtration retient le sable et les copeaux, puis le tri des copeaux qui flottent complète la séparation", ["L’évaporation retire le fer, la filtration dissout le sable, puis le séchage transforme les copeaux en sable fin séparable", "Un aimant retire le sable, la distillation retient le fer, puis la filtration fait flotter les copeaux hors du mélange", "La filtration retire d’abord les trois solides mélangés, puis un aimant sépare le mélange sec sans autre étape utile"], "Chaque propriété est exploitée à son tour : le magnétisme pour le fer, la filtration pour les solides restants, et la flottation pour distinguer les copeaux légers du sable lourd.", {});
  }
]), ["Associe chaque composante à sa propriété distinctive, dans un ordre réalisable.", "L’aimant ne fonctionne que sur le fer : commence par lui."]);
E("s7f-u3-cr-separate", 3, ["SC7.7.6"], 3, "var", varset([
  function () {
    return textq("On te remet un mélange d’eau, de sable, de sel dissous et de petits cailloux. Décris un plan complet, étape par étape, pour récupérer le sable sec, les cailloux et le sel séparément. Nomme la technique de chaque étape et la propriété qu’elle exploite. (3 points)", ["le tamisage ou le tri retient les cailloux (grosseur)", "la filtration sépare le sable de l’eau salée (grosseur des grains contre pores du filtre)", "l’évaporation de l’eau salée récupère le sel (point d’ébullition différent, l’eau devient vapeur)"], "<b>Réponse modèle :</b> Étape 1 : tamiser le mélange pour retirer les cailloux, trop gros pour passer à travers le tamis (propriété : la grosseur des particules). Étape 2 : filtrer le reste; le sable est retenu par le filtre pendant que l’eau salée traverse, puis laisser sécher le sable (propriété : la grosseur des grains de sable contre les pores du filtre). Étape 3 : faire évaporer l’eau du filtrat, par chauffage doux ou au soleil; l’eau devient vapeur et le sel reste au fond du récipient (propriété : l’eau s’évapore à une température où le sel reste solide).<br><br><b>Points d’attribution :</b> 1 point pour le retrait des cailloux par tamisage, avec sa propriété. 1 point pour la filtration du sable, avec sa propriété. 1 point pour l’évaporation qui récupère le sel, avec sa propriété.", {});
  }
]), ["Du plus gros au plus fin, puis le dissous en dernier.", "Chaque étape nomme sa technique et la propriété exploitée."]);

/* ---------- SC7.7.7 Techniques de separation quotidiennes ---------- */
E("s7f-u3-home-techniques", 3, ["SC7.7.7"], 1, "var", varset([
  function () {
    return mcq("Égoutter des spaghettis dans une passoire est un exemple quotidien de quelle technique de séparation?", "La filtration, car la passoire retient les spaghettis et laisse passer l’eau de cuisson chaude", ["La distillation, car la passoire retient les spaghettis et laisse passer l’eau de cuisson chaude", "L’évaporation, car la passoire transforme l’eau de cuisson en vapeur pendant l’égouttage", "La décantation magnétique, car la passoire attire les spaghettis et repousse l’eau de cuisson"], "La passoire est un filtre de cuisine : ses trous laissent passer l’eau et retiennent les spaghettis, selon la grosseur des morceaux.", {});
  },
  function () {
    return mcq("Faire sécher du linge sur une corde sépare l’eau du tissu par quelle technique?", "L’évaporation, car l’eau du tissu devient vapeur et s’échappe dans l’air ambiant du dehors", ["La filtration, car l’eau du tissu traverse les fibres et tombe goutte à goutte au sol", "La condensation, car l’eau du tissu devient vapeur et s’échappe dans l’air ambiant du dehors", "Le tamisage, car le vent trie les gouttes d’eau selon leur grosseur pendant le séchage"], "Le séchage est une évaporation lente : l’eau liquide du linge devient vapeur et quitte le tissu, qui reste sec.", {});
  }
]), ["Les techniques de laboratoire ont leurs jumelles à la maison.", "Passoire égale filtre; séchage égale évaporation."]);
E("s7f-u3-choose-technique", 3, ["SC7.7.7"], 2, "var", varset([
  function () {
    return mcq("Une soupe refroidie montre une couche de gras solide à sa surface. Quelle technique quotidienne permet de retirer ce gras?", "Écumer ou dégraisser la surface, car le gras moins dense flotte au-dessus du bouillon refroidi de la soupe", ["Filtrer la soupe entière à travers un papier filtre fin, car le gras dissous traverse le papier avec le bouillon", "Faire bouillir la soupe longuement, car le gras s’évapore toujours avant l’eau du bouillon refroidi de la soupe", "Ajouter du sel à la soupe, car le sel dissout complètement le gras qui flotte à la surface du bouillon"], "Le gras refroidi forme une couche solide qui flotte : on l’écume à la cuillère. C’est une séparation par densité et par état, utilisée chaque jour en cuisine.", {});
  }
]), ["Le gras flotte et se fige : la technique suit ces deux propriétés.", "Une technique quotidienne doit fonctionner avec des outils de cuisine."]);
E("s7f-u3-cr-three-part", 3, ["SC7.7.7"], 3, "var", varset([
  function () {
    return textq("Nomme TROIS techniques de séparation utilisées dans la vie quotidienne (à la maison, à la ferme ou dans la communauté). Pour chacune, dis quel mélange elle sépare et quelle propriété des composantes elle exploite. (3 points)", ["un exemple avec mélange et propriété (par exemple la passoire sépare les pâtes de l’eau par la grosseur)", "un deuxième exemple différent (par exemple la moustiquaire ou l’écran sépare les insectes de l’air par la grosseur des ouvertures)", "un troisième exemple différent (par exemple le dégraissage d’une soupe exploite la densité et la solidification du gras)"], "<b>Réponse modèle :</b> Exemple 1 : la passoire sépare les spaghettis de leur eau de cuisson; elle exploite la grosseur, car les trous laissent passer l’eau et retiennent les pâtes. Exemple 2 : faire sécher le linge sépare l’eau du tissu; elle exploite l’évaporation, car l’eau devient vapeur bien avant que le tissu ne change. Exemple 3 : dégraisser une soupe refroidie sépare le gras du bouillon; elle exploite la densité et l’état, car le gras flotte et se fige en surface, où on l’écume.<br><br><b>Points d’attribution :</b> 1 point par technique quotidienne correctement nommée, avec son mélange et la propriété exploitée.", {});
  }
]), ["Trois scènes différentes de la vie quotidienne valent mieux que trois variantes de la même.", "Chaque exemple tient en trois morceaux : technique, mélange, propriété."]);

/* ---------- SC7.8.1 Science de la distillation ---------- */
E("s7f-u3-distill-parts", 3, ["SC7.8.1"], 1, "var", varset([
  function () {
    return mcq("Dans un dispositif de distillation, à quoi sert le condenseur?", "Il refroidit la vapeur pour la transformer de nouveau en liquide, qu’on recueille séparément", ["Il chauffe le liquide pour le transformer en vapeur au début du dispositif de distillation", "Il filtre le liquide pour retenir les particules solides avant le début de la distillation", "Il mélange la vapeur au liquide pour accélérer le chauffage du dispositif entier"], "La distillation compte deux changements d’état : l’ébullition produit la vapeur dans le ballon, puis le condenseur la refroidit pour la rendre liquide dans le récipient de collecte.", {});
  },
  function () {
    return mcq("Dans un dispositif de distillation d’eau salée, quelle substance recueille-t-on à la sortie du condenseur?", "De l’eau pure, car la vapeur qui se condense vient de l’eau seule, le sel restant dans le ballon chauffé", ["Du sel pur, car la vapeur qui se condense vient du sel seul, l’eau restant dans le ballon chauffé", "De l’eau salée identique, car la distillation ne sépare jamais les composantes d’une solution chauffée", "De l’air chaud, car la vapeur qui se condense dans le dispositif ne produit jamais de liquide recueilli"], "Seule l’eau s’évapore à l’ébullition de la solution; sa vapeur, condensée, donne de l’eau pure. Le sel, qui ne s’évapore pas, reste dans le ballon.", {});
  }
]), ["Ébullition d’un côté, condensation de l’autre : la distillation joint les deux.", "Ce qui ne s’évapore pas ne peut pas être recueilli à la sortie."]);
E("s7f-u3-distill-vs-evap", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return mcq("Quelle est la différence essentielle entre la distillation et la simple évaporation d’une solution?", "La distillation recueille le liquide vaporisé par condensation, tandis que l’évaporation simple le laisse s’échapper dans l’air", ["La distillation recueille le solide vaporisé par condensation, tandis que l’évaporation simple le laisse s’échapper dans l’air", "La distillation chauffe le liquide, tandis que l’évaporation simple ne peut jamais se produire avec un liquide chauffé", "La distillation sépare les mélanges hétérogènes, tandis que l’évaporation simple ne sépare que les substances pures"], "Les deux techniques vaporisent le liquide; seule la distillation le récupère, en condensant sa vapeur dans un récipient séparé. On choisit selon la composante qu’on veut garder.", {});
  }
]), ["La question décide : veut-on récupérer le liquide, oui ou non?", "Même début (vaporiser), fin différente (recueillir ou laisser partir)."]);
E("s7f-u3-cr-distill", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return textq("Décris le trajet complet d’une particule d’eau pendant la distillation d’une eau salée, en utilisant correctement les termes ébullition, évaporation et condensation dans ta description. (2 points)", ["la particule d’eau quitte la solution à l’ébullition (évaporation rapide dans tout le liquide chauffé)", "la vapeur voyage jusqu’au condenseur, où la condensation la rend liquide; le sel ne fait pas ce trajet"], "<b>Réponse modèle :</b> La particule d’eau fait partie de la solution chauffée dans le ballon. Quand l’ébullition commence, elle reçoit assez d’énergie pour quitter le liquide : c’est l’évaporation, produite dans tout le liquide pendant l’ébullition. Devenue vapeur, elle voyage dans le tube jusqu’au condenseur, où elle perd son énergie et redevient liquide : c’est la condensation. Elle s’écoule alors dans le récipient de collecte, comme eau pure. Les particules de sel, qui ne s’évaporent pas, restent dans le ballon.<br><br><b>Points d’attribution :</b> 1 point pour le départ (ébullition et évaporation correctement placées et définies). 1 point pour l’arrivée (condensation dans le condenseur et collecte de l’eau, le sel restant derrière).", {});
  }
]), ["Suis une seule particule, du ballon au récipient de collecte.", "Trois termes, trois moments du trajet."]);

/* ---------- SC7.8.2 Evolution du raffinage et de la separation ---------- */
E("s7f-u3-fractional", 3, ["SC7.8.2"], 1, "var", varset([
  function () {
    return mcq("En quoi la distillation fractionnée diffère-t-elle de la distillation simple?", "Elle sépare plusieurs liquides mélangés en profitant de leurs points d’ébullition différents, recueillis un à un", ["Elle sépare un solide d’un liquide en profitant de la grosseur différente de leurs particules respectives", "Elle sépare plusieurs liquides mélangés en les filtrant à travers des couches de plus en plus fines", "Elle sépare un liquide de ses gaz en profitant de la pression différente exercée sur le mélange chauffé"], "La distillation fractionnée traite un mélange de liquides : chacun bout à sa température, donc on recueille les composantes une à une selon leur point d’ébullition.", {});
  },
  function () {
    return mcq("Le raffinage du pétrole brut repose sur la distillation fractionnée. Qu’est-ce qui rend cette technique adaptée au pétrole?", "Le pétrole est un mélange de liquides dont les points d’ébullition différents permettent de les séparer en fractions utiles", ["Le pétrole est une substance pure dont le point d’ébullition unique permet de le purifier en une seule fraction utile", "Le pétrole est un mélange de solides dont les grosseurs différentes permettent de les séparer en fractions utiles", "Le pétrole est un mélange magnétique dont les composantes se séparent sous l’effet d’aimants en fractions utiles"], "Le pétrole brut contient de nombreux hydrocarbures liquides aux points d’ébullition variés : la colonne de fractionnement les sépare en essence, kérosène, diesel et autres fractions.", {});
  }
]), ["Fractionnée égale plusieurs liquides, plusieurs points d’ébullition.", "Le raffinage est l’exemple industriel de la distillation fractionnée."]);
E("s7f-u3-refining-evolve", 3, ["SC7.8.2"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé décrit correctement l’évolution des techniques de raffinage et de séparation?", "On est passé de la distillation simple, qui sépare un liquide d’un mélange, à la distillation fractionnée, qui sépare plusieurs liquides en une seule opération continue", ["On est passé de la distillation fractionnée industrielle à la distillation simple de cuisine, devenue la norme dans toutes les raffineries modernes du monde", "On est passé de la filtration du pétrole à sa distillation, car les filtres séparaient mieux les liquides que les colonnes de fractionnement actuelles", "On est resté à la distillation simple, car aucune amélioration des techniques de séparation n’a été nécessaire depuis les débuts du raffinage du pétrole"], "L’évolution va du simple au fractionné : d’abord séparer un liquide par ébullition et condensation, puis séparer toute une famille de liquides en continu grâce à leurs points d’ébullition échelonnés.", {});
  }
]), ["L’évolution suit la complexité des mélanges traités.", "Une seule opération continue remplace de nombreuses distillations simples."]);

/* ---------- SC7.8.3 Les melanges et solutions dans nos vies ---------- */
E("s7f-u3-lives-examples", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces exemples montre la science des mélanges et des solutions à l’œuvre dans la vie quotidienne?", "Préparer un sirop contre la toux en dissolvant les ingrédients actifs dans un liquide sucré mesuré", ["Préparer un sirop contre la toux en devinant les quantités d’ingrédients sans jamais les mesurer", "Choisir un sirop contre la toux selon la couleur de son étiquette plutôt que selon sa composition", "Conserver un sirop contre la toux dans un flacon décoratif plutôt que dans son flacon d’origine scellé"], "Un sirop est une solution dosée : dissoudre les ingrédients et mesurer leur concentration relève directement de la science des solutions.", {});
  },
  function () {
    return mcq("Quel exemple relie la science des solutions à la santé et à la sécurité?", "Les solutions de réhydratation, qui dissolvent des sels et du sucre dans l’eau selon des proportions précises pour soigner la déshydratation", ["Les solutions de réhydratation, qui dissolvent des sels et du sucre dans l’eau selon des proportions choisies au hasard chaque fois", "Les boissons énergisantes, qui dissolvent des colorants dans l’eau selon des proportions tenues secrètes par leurs fabricants", "Les eaux embouteillées, qui dissolvent des bulles d’air dans l’eau selon des proportions variables d’une bouteille à l’autre"], "Une solution de réhydratation ne fonctionne qu’à la bonne concentration : trop faible, elle n’aide pas; trop forte, elle nuit. C’est la science des solutions appliquée à la santé.", {});
  }
]), ["Cherche l’exemple où la concentration ou la dissolution compte vraiment.", "La précision des proportions est le signe de la science à l’œuvre."]);
E("s7f-u3-lives-effects", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Un village puise son eau dans un lac où se déversent des engrais dissous des fermes voisines. Quel énoncé relie correctement ce fait à la science des solutions?", "Les engrais dissous voyagent avec l’eau et atteignent le lac, même si l’eau semble claire à l’œil nu des villageois", ["Les engrais dissous restent sur les champs, car une substance dissoute ne peut jamais se déplacer avec l’eau courante", "Les engrais dissous disparaissent complètement dès qu’ils touchent l’eau du ruisseau qui traverse les fermes voisines", "Les engrais dissous rendent l’eau du lac pure, car la dissolution détruit toutes les substances qu’elle touche en chemin"], "Une substance dissoute se déplace avec son solvant : claire ne veut pas dire pure. C’est une conséquence directe de la science des solutions dans la vie d’une communauté.", {});
  }
]), ["Dissous égale invisible, mais présent et mobile.", "La dissolution disperse; elle ne détruit pas."]);

/* ---------- SC7.8.4 Effets positifs et negatifs du sel de voirie ---------- */
E("s7f-u3-salt-positive", 3, ["SC7.8.4"], 1, "var", varset([
  function () {
    return mcq("Quel est un effet positif prévu de l’épandage de sel sur les routes en hiver?", "Le sel abaisse le point de congélation de l’eau, fait fondre la glace et rend la chaussée moins glissante pour les véhicules", ["Le sel élève le point de congélation de l’eau, fait fondre la glace et rend la chaussée moins glissante pour les véhicules", "Le sel colore la glace en blanc, ce qui permet aux conducteurs de mieux voir la chaussée glissante pendant la nuit", "Le sel sèche complètement la chaussée en absorbant toute l’eau de la neige fondue pendant les tempêtes hivernales"], "Le sel dissous dans l’eau de surface abaisse son point de congélation : la glace fond à des températures où l’eau pure resterait gelée, ce qui améliore la sécurité routière.", {});
  }
]), ["L’effet recherché est la fonte de la glace par abaissement du point de congélation.", "Prévu signifie voulu dès le départ par ceux qui épandent."]);
E("s7f-u3-salt-negative", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Quel est un effet négatif imprévu de l’épandage de sel sur les routes?", "Le sel entraîné par la fonte corrode les véhicules et les ponts et nuit aux plantes et aux cours d’eau voisins des routes", ["Le sel entraîné par la fonte rend l’eau des cours d’eau voisins potable et protège les plantes des bords des routes", "Le sel épandu en hiver fait fondre la glace des lacs voisins et prolonge la saison de navigation des bateaux de pêche", "Le sel épandu en hiver nourrit les sols des bords de route et fait pousser les plantes plus vite au printemps suivant"], "Personne n’épand du sel pour corroder les ponts ou charger les ruisseaux en sel : ce sont des conséquences imprévues, documentées, de l’usage du sel de voirie.", {});
  },
  function () {
    return mcq("On constate que les arbres plantés le long d’une route très salée dépérissent plus que ceux des rues peu salées. Comment classer cet effet?", "Comme un effet négatif imprévu : le sel atteint les racines par le sol, sans que cet effet ait été le but de l’épandage hivernal", ["Comme un effet positif prévu : le sel atteint les racines par le sol, ce qui était le but principal de l’épandage hivernal", "Comme un effet positif imprévu : le sel améliore la santé des arbres en atteignant leurs racines par le sol de la route", "Comme un effet sans lien avec le sel : les arbres des routes dépérissent toujours plus vite que ceux des rues calmes"], "Le dépérissement des arbres n’était pas le but de l’épandage (qui vise la sécurité) et il nuit : c’est un effet négatif imprévu du sel de voirie.", {});
  }
]), ["Classer un effet demande deux questions : positif ou négatif? prévu ou imprévu?", "Le but de l’épandage décide du caractère prévu ou non."]);
E("s7f-u3-salt-classify-effects", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Quel ensemble classe correctement deux effets du sel de voirie?", "Moins d’accidents sur la glace (positif prévu) et corrosion accrue des véhicules (négatif imprévu) dans la région traitée", ["Moins d’accidents sur la glace (négatif imprévu) et corrosion accrue des véhicules (positif prévu) dans la région traitée", "Moins d’accidents sur la glace (positif imprévu) et disparition complète de la glace (positif prévu) dans la région traitée", "Plus d’accidents sur la glace (positif prévu) et corrosion réduite des véhicules (négatif imprévu) dans la région traitée"], "La sécurité accrue est l’effet positif recherché dès le départ; la corrosion est un effet négatif que personne ne cherchait. Les deux classements doivent être justes ensemble.", {});
  }
]), ["Vérifie chaque classement séparément : sens (positif ou négatif) et intention (prévu ou imprévu).", "Un seul ensemble a ses deux classements corrects."]);

/* ---------- SC7.8.5 Comprendre les solutions pour mieux deglacer ---------- */
E("s7f-u3-deicer-compare", 3, ["SC7.8.5"], 2, "var", varset([
  function () {
    return mcq("Comment notre compréhension des propriétés des solutions a-t-elle amélioré les technologies de déglaçage?", "Elle a permis de choisir et de doser des produits qui abaissent le point de congélation à des températures plus basses, avec moins de produit épandu", ["Elle a permis de colorer les produits de déglaçage pour les rendre visibles sur la glace pendant les tempêtes de neige de l’hiver", "Elle a permis de remplacer tous les produits de déglaçage par de l’eau chaude épandue sur les routes pendant les tempêtes", "Elle a permis de chauffer les routes de l’intérieur grâce à des tuyaux installés sous toutes les chaussées de la province"], "Connaître l’abaissement du point de congélation selon le produit et sa concentration a mené à des déglaçants mieux choisis et mieux dosés : efficaces plus froid, en quantités moindres.", {});
  },
  function () {
    return mcq("Une municipalité épand une saumure (une solution de sel préparée d’avance) avant une tempête plutôt que du sel sec pendant la tempête. Quel avantage des solutions explique ce choix?", "La saumure est déjà dissoute, donc elle agit dès son contact avec la chaussée et reste en place au lieu d’être balayée par les véhicules", ["La saumure est déjà dissoute, donc elle colore la chaussée et avertit les conducteurs de ralentir avant la tempête annoncée", "La saumure contient plus de sel par litre que le sel sec, donc elle fait fondre la glace deux fois plus vite que le sel sec", "La saumure élève le point de congélation de l’eau, donc la glace se forme plus tôt et devient plus facile à briser ensuite"], "Un produit déjà en solution agit immédiatement et adhère à la chaussée; le sel sec doit d’abord se dissoudre et il est en partie balayé par la circulation. C’est une application directe des propriétés des solutions.", {});
  }
]), ["Le déglaçage moderne applique la science des solutions : concentration, dissolution, point de congélation.", "Déjà dissous égale déjà actif."]);
E("s7f-u3-deicing-improve", 3, ["SC7.8.5"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces pratiques est une amélioration du déglaçage fondée sur la compréhension des solutions?", "Épandre le produit au bon moment et à la bonne concentration, mesurée selon la température prévue de la chaussée", ["Épandre le double de produit à chaque tempête, quelle que soit la température prévue de la chaussée ce jour-là", "Épandre le produit seulement après que la glace a atteint son épaisseur maximale sur la chaussée de la route", "Épandre le produit au hasard sur les routes, en laissant le vent décider de sa répartition finale sur la glace"], "Doser selon la température prévue, c’est appliquer la relation entre concentration et point de congélation : assez de produit pour fondre, sans gaspillage ni excès.", {});
  }
]), ["L’amélioration vient de la mesure et du moment, pas de la quantité brute.", "La science des solutions sert à doser juste."]);
E("s7f-u3-salt-science", 3, ["SC7.8.5"], 3, "var", varset([
  function () {
    return mcq("Par une nuit de moins 25 °C, le sel ordinaire épandu sur une route ne fait presque plus fondre la glace. Quelle explication fondée sur les propriétés des solutions est correcte?", "Chaque produit a sa limite : la solution de sel ordinaire n’abaisse le point de congélation que jusqu’à une certaine température", ["Le sel ordinaire cesse complètement d’exister comme substance dès que la température descend sous moins 20 °C pendant la nuit froide", "La glace devient une substance pure à moins 25 °C, donc aucun produit connu ne peut plus jamais réussir à la faire fondre ensuite", "Le sel ordinaire fait fondre la glace seulement quand le soleil brille sur la route, jamais pendant les longues nuits d’hiver froides"], "L’abaissement du point de congélation a une limite propre à chaque produit. Sous cette limite, il faut un autre produit (comme le chlorure de calcium) : c’est la science des solutions qui guide le choix.", {});
  }
]), ["Chaque déglaçant a sa température limite d’efficacité.", "La limite vient de la solution elle-même, pas du soleil ni de l’heure."]);

/* ---------- SC7.8.6 Decision eclairee : le sel de voirie ---------- */
E("s7f-u3-salt-adv", 3, ["SC7.8.6"], 2, "var", varset([
  function () {
    return mcq("Quel argument en faveur du sel comme principal déglaçant repose sur un avantage économique réel?", "Le sel est abondant, peu coûteux et facile à entreposer et à épandre avec l’équipement que les municipalités possèdent déjà", ["Le sel est le seul produit qui ne cause aucun dommage à l’environnement, aux véhicules ni aux infrastructures routières", "Le sel fonctionne à toutes les températures hivernales sans exception, ce qui élimine le besoin de tout autre produit", "Le sel rend les routes complètement sèches après chaque tempête, ce qui élimine tous les accidents de l’hiver entier"], "L’avantage économique du sel est réel : il est bon marché, disponible et compatible avec l’équipement existant. Les autres énoncés exagèrent jusqu’à devenir faux.", {});
  }
]), ["Un avantage défendable reste vrai sans exagération.", "Élimine les énoncés absolus : aucun, toutes, complètement."]);
E("s7f-u3-cr-salt-decision", 3, ["SC7.8.6"], 3, "var", varset([
  function () {
    return textq("Une municipalité doit décider si le sel reste son principal produit de déglaçage. Prends une décision avisée : choisis une position, appuie-la sur UN avantage et UN inconvénient (sociaux, économiques ou environnementaux), et nomme une mesure qui réduit l’inconvénient de ta position. (3 points)", ["une position claire (garder le sel comme produit principal, ou le remplacer progressivement)", "un avantage et un inconvénient réels, classés par type (social, économique ou environnemental)", "une mesure de réduction (par exemple saumure préventive, dosage selon la température, produits de rechange sur les tronçons sensibles)"], "<b>Réponse modèle :</b> Position : garder le sel comme principal déglaçant, mais en réduire l’usage par un meilleur dosage. Avantage (économique et social) : le sel est peu coûteux, disponible et éprouvé; il garde les routes praticables et réduit les accidents pendant les tempêtes. Inconvénient (environnemental) : le sel entraîné par la fonte charge les cours d’eau et corrode les ponts et les véhicules. Mesure de réduction : épandre une saumure avant les tempêtes et doser selon la température de la chaussée, ce qui obtient la même fonte avec beaucoup moins de sel, et réserver des produits de rechange aux tronçons proches des cours d’eau sensibles.<br><br><b>Points d’attribution :</b> 1 point pour une position claire et tenue. 1 point pour un avantage et un inconvénient réels et correctement caractérisés. 1 point pour une mesure concrète qui réduit l’inconvénient.", {});
  }
]), ["Une décision avisée reconnaît le coût de sa propre position.", "La mesure de réduction doit s’attaquer à l’inconvénient nommé."]);

/* ---------- SC7.9.1 Enoncer une hypothese ---------- */
E("s7f-u3-hypothesis-pattern", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("En observant que les glaçons fondent plus vite au soleil qu’à l’ombre, un élève formule une hypothèse. Laquelle est fondée sur ce schéma d’événements observés?", "« Les glaçons exposés à plus de lumière fondent plus vite que les glaçons gardés à l’ombre pendant le même temps. »", ["« Les glaçons préfèrent fondre au soleil parce qu’ils aiment la chaleur des journées d’été ensoleillées. »", "« Les glaçons fondent toujours en exactement dix minutes, peu importe où on les place dans la cour. »", "« Les glaçons fondent parce que l’hiver est terminé et que le printemps est la plus belle saison. »"], "L’hypothèse reprend le motif observé (soleil contre ombre) et le formule en prévision mesurable : la vitesse de fonte selon l’exposition.", {});
  }
]), ["Une hypothèse naît d’un motif observé et le transforme en prévision vérifiable.", "Ni préférence ni saison : la prévision parle de la fonte mesurée."]);
E("s7f-u3-hypothesis-form", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces phrases est une hypothèse bien formulée pour une expérience de dissolution?", "« Si on brasse l’eau, alors le sucre se dissoudra plus vite que dans l’eau laissée au repos. »", ["« Le sucre se dissout dans l’eau parce que c’est ce que les sucres font depuis toujours. »", "« Si on brasse l’eau, alors l’expérience sera plus intéressante pour toute l’équipe. »", "« Le sucre se dissoudra un jour ou l’autre, peu importe ce qu’on fait pendant l’expérience. »"], "Le format « si... alors... » relie une variable changée (le brassage) à un résultat mesurable (la vitesse de dissolution) : l’hypothèse est vérifiable.", {});
  }
]), ["Cherche le couple : variable changée, résultat mesuré.", "Intéressante n’est pas un résultat mesurable."]);
E("s7f-u3-hypothesis-background", 3, ["SC7.9.1"], 2, "var", varset([
  function () {
    return mcq("Un élève sait que les particules bougent plus vite quand la température monte. Quelle hypothèse utilise correctement ce renseignement de fond pour une expérience sur la dissolution du sel?", "« Si l’eau est plus chaude, alors le sel s’y dissoudra plus vite, car ses particules rencontreront plus souvent celles du sel. »", ["« Si l’eau est plus chaude, alors le sel deviendra une substance pure, car ses particules bougeront plus vite dans l’eau. »", "« Si l’eau est plus chaude, alors le sel cessera de se dissoudre, car ses particules bougeront trop vite pour se séparer. »", "« Si l’eau est plus froide, alors le sel s’y dissoudra plus vite, car ses particules rencontreront plus souvent celles du sel. »"], "Le renseignement de fond (les particules chaudes bougent plus vite et entrent plus souvent en collision) mène logiquement à la prévision : une dissolution plus rapide dans l’eau chaude.", {});
  }
]), ["L’hypothèse doit découler du renseignement, pas le contredire.", "Plus de collisions égale une dissolution plus rapide."]);

/* ---------- SC7.9.2 Definir et delimiter questions et problemes ---------- */
E("s7f-u3-delimit", 3, ["SC7.9.2"], 1, "var", varset([
  function () {
    return mcq("La question « Comment sépare-t-on les mélanges? » est trop vaste pour une recherche scolaire. Quelle reformulation la définit et la délimite correctement?", "« Quelle technique sépare le mieux le sable du sel dans un mélange sec, parmi la dissolution, la filtration et l’évaporation? »", ["« Quelles techniques ont séparé tous les mélanges étudiés par les scientifiques depuis les débuts de la chimie moderne? »", "« Pourquoi les mélanges sont-ils importants pour l’industrie et pour la vie quotidienne des gens en général? »", "« Comment chaque mélange du monde pourrait-il être séparé par une seule technique universelle et parfaite? »"], "La reformulation délimitée nomme le mélange précis (sable et sel), les techniques comparées et le critère (la meilleure) : une recherche réelle peut y répondre.", {});
  }
]), ["Délimiter : un mélange, des techniques nommées, un critère.", "Une question de recherche scolaire doit tenir dans le temps et le matériel disponibles."]);
E("s7f-u3-delimit-plan", 3, ["SC7.9.2"], 3, "var", varset([
  function () {
    return mcq("Une équipe veut étudier « les solutions dans la cuisine ». Quelle première étape définit et délimite correctement son problème de recherche?", "Choisir une question précise et réalisable, comme l’effet de la température de l’eau sur la vitesse de dissolution du sucre de cuisine", ["Lister toutes les solutions utilisées dans toutes les cuisines du monde et décider de les étudier une à une cette année", "Acheter tout le matériel de laboratoire disponible et décider de la question seulement après les premières expériences", "Copier la question d’une autre équipe et l’élargir pour couvrir aussi les solutions utilisées dans l’industrie alimentaire"], "Définir et délimiter vient en premier : une question précise, avec des variables nommées et un matériel de cuisine, transforme un thème immense en recherche réalisable.", {});
  }
]), ["Le problème se délimite avant le matériel et les expériences.", "Une variable, un effet, un lieu : la recherche devient possible."]);

/* ---------- SC7.9.3 Droite la mieux ajustee, interpolation, extrapolation ---------- */
E("s7f-u3-best-fit", 3, ["SC7.9.3"], 1, "var", varset([
  function () {
    return mcq("Sur un graphique de solubilité, à quoi sert la droite la mieux ajustée?", "Elle résume la tendance des points et permet de lire des valeurs entre les points mesurés et au-delà de ceux-ci", ["Elle relie tous les points un à un en zigzag pour montrer exactement le trajet des mesures prises en laboratoire", "Elle remplace les points mesurés, qu’on peut alors effacer du graphique avant de le présenter à la classe", "Elle garantit que toutes les mesures futures tomberont exactement sur la droite tracée par l’équipe"], "La droite la mieux ajustée passe au milieu du nuage de points, selon leur tendance générale : elle sert à interpoler (entre les points) et à extrapoler (au-delà).", {});
  }
]), ["La droite suit la tendance, pas chaque point.", "Interpoler et extrapoler sont ses deux emplois."]);
E("s7f-u3-interpolate", 3, ["SC7.9.3"], 2, "var", varset([
  function () {
    var q = mcq("La droite la mieux ajustée d’une courbe de solubilité passe par 36 g à 20 °C et 52 g à 60 °C, en ligne droite. Quelle lecture par interpolation donne la solubilité à 40 °C?", "Environ 44 g par 100 mL, à mi-chemin entre les deux valeurs lues sur la droite ajustée du graphique", ["Environ 36 g par 100 mL, la même valeur qu’à 20 °C sur la droite ajustée du graphique de solubilité", "Environ 52 g par 100 mL, la même valeur qu’à 60 °C sur la droite ajustée du graphique de solubilité", "Environ 88 g par 100 mL, la somme des deux valeurs lues sur la droite ajustée du graphique"], "Interpoler, c’est lire entre deux points connus : à 40 °C, à mi-chemin entre 20 et 60 °C, la droite donne environ (36 + 52) divisé par 2, soit 44 g par 100 mL.", {}); q.figure = s7fSolubilitySVG([{name: 'Solute A', color: '#2e6f8e', pts: [[20, 35], [40, 45], [60, 51], [80, 60]]}, {name: 'Solute B', color: '#b3541e', pts: [[20, 18], [40, 22], [60, 25], [80, 29]]}], 80); return q;
  }
]), ["40 °C est entre 20 et 60 : c’est une interpolation.", "Sur une droite, le milieu en température donne le milieu en valeur."]);
E("s7f-u3-extrapolate", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe prolonge la droite la mieux ajustée au-delà de ses mesures pour prédire la solubilité à 120 °C. Quelle réserve doit accompagner cette prédiction?", "C’est une extrapolation : la tendance peut changer au-delà des données, donc la prédiction est moins sûre que les lectures entre les points mesurés", ["C’est une extrapolation : la prédiction est automatiquement exacte, car une droite la mieux ajustée ne se trompe jamais hors des données", "C’est une interpolation : la prédiction est aussi sûre que les lectures faites entre les points mesurés pendant l’expérience en classe", "C’est une mesure directe : prolonger la droite équivaut à mesurer réellement la solubilité à 120 °C dans le laboratoire de l’école"], "Extrapoler prolonge une tendance hors des données : rien ne garantit que la tendance se maintient (l’eau bout à 100 °C, par exemple). La prédiction doit être présentée comme moins sûre.", {});
  }
]), ["Au-delà des points, la confiance diminue.", "Un événement nouveau (l’ébullition) peut briser la tendance prolongée."]);
E("s7f-u3-cr-best-fit", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    return textq("Les points d’une expérience de solubilité montent régulièrement, sauf un point, très au-dessus des autres, que l’équipe soupçonne venir d’une erreur de pesée. (a) Explique comment tracer la droite la mieux ajustée dans cette situation. (b) Dis comment l’équipe devrait traiter le point suspect et pourquoi. (3 points)", ["la droite suit la tendance générale de la majorité des points, avec autant de points au-dessus qu’au-dessous, sans passer forcément par chaque point", "le point suspect ne doit pas attirer la droite à lui seul", "l’équipe devrait vérifier ou refaire la mesure et signaler le point plutôt que de le cacher"], "<b>Réponse modèle :</b> (a) La droite la mieux ajustée se trace selon la tendance générale des points : elle passe au milieu du nuage, avec à peu près autant de points au-dessus qu’au-dessous, et elle ne doit pas être tirée vers le seul point suspect. (b) Le point suspect vient probablement d’une erreur de pesée; l’équipe devrait refaire cette mesure si c’est possible et, sinon, signaler ouvertement le point douteux dans son compte rendu au lieu de le supprimer en silence. La droite représente alors honnêtement la tendance des mesures fiables.<br><br><b>Points d’attribution :</b> 1 point pour la méthode de traçage selon la tendance générale. 1 point pour le refus de laisser le point suspect commander la droite. 1 point pour le traitement honnête du point (refaire ou signaler).", {});
  }
]), ["La droite sert la tendance de l’ensemble, pas un point isolé.", "Signaler une donnée douteuse est une force, pas une faute."]);

/* ---------- SC7.9.4 Hypothese verifiable : temperature et solubilite ---------- */
E("s7f-u3-hypothesis-temp", 3, ["SC7.9.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces hypothèses est vérifiable et porte précisément sur l’effet de la température sur la solubilité d’un solide?", "« Si la température de l’eau augmente, alors la quantité de sel qu’on peut y dissoudre augmentera aussi. »", ["« Si la température de l’eau augmente, alors l’expérience de solubilité deviendra plus intéressante. »", "« La température et la solubilité sont deux sujets importants du chapitre sur les solutions. »", "« Si le sel est beau à regarder, alors sa solubilité augmentera avec la température de l’eau. »"], "L’hypothèse relie la variable changée (la température) au résultat mesuré (la quantité dissoute) : elle se vérifie par une expérience de solubilité.", {});
  }
]), ["Température changée, quantité dissoute mesurée : le couple complet.", "Un sujet de chapitre n’est pas une hypothèse."]);
E("s7f-u3-variables-solubility", 3, ["SC7.9.4"], 2, "var", varset([
  function () {
    return mcq("Pour vérifier l’hypothèse précédente, une équipe dissout du sel dans des béchers d’eau à 10 °C, 25 °C, 40 °C et 60 °C. Quelles variables doivent rester constantes?", "Le volume d’eau, la sorte de sel, le brassage et la façon de juger que la solution est saturée à chaque température", ["La température de l’eau, le volume d’eau et la sorte de sel utilisée dans chaque bécher de l’expérience menée", "La quantité de sel dissoute, la température de l’eau et le volume d’eau de chaque bécher de l’expérience menée", "Le volume d’eau, la température de l’eau et la quantité de sel dissoute dans chaque bécher de l’expérience"], "Seule la température varie. Le volume, le sel, le brassage et le critère de saturation restent identiques, sinon les différences de solubilité ne peuvent pas être attribuées à la température.", {});
  }
]), ["La température est la variable indépendante : tout le reste se fige.", "La quantité dissoute est le résultat, pas une constante."]);

/* ---------- SC7.9.5 Procedures controlant les variables (solubilite) ---------- */
E("s7f-u3-controls", 3, ["SC7.9.5"], 1, "var", varset([
  function () {
    return mcq("Dans une expérience sur l’effet de la température sur la solubilité, pourquoi utilise-t-on le même volume d’eau dans chaque bécher?", "Pour que seule la température diffère entre les béchers, ce qui rend la comparaison des quantités dissoutes juste et valable", ["Pour que les béchers aient l’air identiques sur la table, ce qui rend la comparaison des quantités dissoutes plus jolie", "Pour que l’eau atteigne la même température dans chaque bécher, ce qui rend la comparaison des quantités plus rapide", "Pour que le sel se dissolve à la même vitesse dans chaque bécher, ce qui rend la comparaison des quantités inutile"], "Contrôler les variables, c’est ne laisser qu’une différence entre les essais : ici la température. Le même volume garantit que les quantités dissoutes sont comparables.", {});
  }
]), ["Un test juste ne laisse varier qu’un seul facteur.", "Le volume égal sert la comparaison, pas l’apparence."]);
E("s7f-u3-controls-judge", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return mcq("Une équipe compare la solubilité à 20 °C et à 50 °C, mais utilise 50 mL d’eau froide et 150 mL d’eau chaude, et brasse seulement le bécher chaud. Pourquoi sa conclusion sur la température est-elle invalide?", "Parce que trois variables changent à la fois (température, volume et brassage), donc l’effet observé ne peut pas être attribué à la température seule", ["Parce que deux béchers ne suffisent jamais, quelles que soient les variables contrôlées pendant l’expérience de solubilité menée en classe", "Parce que le brassage ne change jamais la vitesse de dissolution, donc son effet sur l’expérience de solubilité est toujours nul", "Parce que la conclusion serait valide seulement si l’équipe avait utilisé de l’eau distillée dans les deux béchers chauffés"], "Le volume et le brassage influencent aussi la quantité dissoute et sa vitesse. Avec trois différences à la fois, impossible d’attribuer le résultat à la température : le contrôle des variables a échoué.", {});
  }
]), ["Compte les différences entre les deux béchers : chacune est une explication rivale.", "Une conclusion valide exige une seule différence à la fois."]);
E("s7f-u3-cr-design-solubility", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return textq("Conçois la procédure complète d’une expérience pour vérifier si la température de l’eau change la quantité de sucre qu’on peut y dissoudre. Décris (a) les étapes dans l’ordre, (b) les variables contrôlées et comment, (c) la mesure qui servira de résultat et (d) la précaution de sécurité liée au chauffage de l’eau. (4 points)", ["des étapes ordonnées : volumes égaux d’eau à plusieurs températures, ajout du sucre par petites quantités en brassant jusqu’à saturation, consignation des quantités", "les contrôles : même volume, même sucre, même brassage, même critère de saturation", "le résultat : la masse totale de sucre dissoute à chaque température", "la sécurité : manipuler l’eau chaude avec les outils prévus et ne jamais chauffer un contenant scellé"], "<b>Réponse modèle :</b> (a) Étapes : verser 100 mL d’eau dans quatre béchers; porter chaque bécher à une température différente (10, 25, 40 et 60 °C) et la vérifier au thermomètre; ajouter le sucre par cuillerées comptées, en brassant après chaque ajout, jusqu’à ce qu’un ajout refuse de se dissoudre malgré le brassage; noter la quantité totale dissoute à chaque température. (b) Contrôles : le même volume d’eau, le même sucre, le même brassage et le même critère de saturation dans chaque bécher. (c) Résultat : la masse de sucre dissoute à saturation, comparée entre les températures. (d) Sécurité : manipuler les béchers chauds avec une pince ou un gant isolant et ne jamais chauffer un contenant fermé.<br><br><b>Points d’attribution :</b> 1 point pour des étapes complètes et ordonnées. 1 point pour les variables contrôlées, nommées avec leur mode de contrôle. 1 point pour la mesure de résultat clairement définie. 1 point pour une précaution de sécurité pertinente.", {});
  }
]), ["Saturation est le critère : on ajoute jusqu’au refus de dissoudre.", "La procédure doit permettre à une autre équipe de reproduire l’expérience."]);

/* ---------- SC7.9.6 Procedures controlant les variables (separation) ---------- */
E("s7f-u3-procedure-order", 3, ["SC7.9.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe sépare un mélange de sable et de sel sec. Quelle suite de procédures est dans le bon ordre et contrôle le problème pratique de la perte de matière?", "Dissoudre le sel dans l’eau, filtrer pour retenir le sable, puis évaporer l’eau du filtrat pour récupérer le sel séparé", ["Évaporer le mélange sec, filtrer les vapeurs obtenues, puis dissoudre le sable pour récupérer le sel séparé du mélange", "Filtrer le mélange sec sans eau, dissoudre le sable dans l’eau, puis chauffer le sel pour le séparer du sable restant", "Dissoudre le sable dans l’eau, évaporer la solution obtenue, puis filtrer le sel pour le récupérer à la fin du travail"], "L’ordre exploite les propriétés une à une : l’eau dissout le sel (pas le sable), la filtration retient le sable, et l’évaporation récupère le sel du filtrat.", {});
  }
]), ["Le sel doit d’abord devenir invisible (dissous) pour traverser le filtre.", "Chaque étape prépare la suivante."]);
E("s7f-u3-procedure-problem", 3, ["SC7.9.6"], 1, "var", varset([
  function () {
    return mcq("Pendant une filtration, une équipe constate que son filtrat est trouble et contient encore du sable fin. Quelle correction de procédure règle le problème?", "Recommencer la filtration avec un filtre plus fin ou un double filtre, en versant lentement le long d’une tige de verre", ["Brasser le filtrat trouble très fort pour faire disparaître le sable fin qu’il contient encore après la filtration", "Ajouter de l’eau au filtrat trouble pour diluer le sable fin jusqu’à ce qu’il devienne invisible à l’œil nu des élèves", "Déclarer le filtrat pur, car un peu de sable fin ne change jamais les résultats d’une expérience de séparation menée"], "Un filtrat trouble signale un passage de particules : un filtre plus fin et un versement lent corrigent la procédure. Diluer ou déclarer ne sépare rien.", {});
  }
]), ["Le problème est mécanique : des particules passent où elles ne devraient pas.", "La correction change la procédure, pas la description du résultat."]);

/* ---------- SC7.9.7 Outils et instruments : efficacite et exactitude ---------- */
E("s7f-u3-tools-safety", 3, ["SC7.9.7"], 1, "var", varset([
  function () {
    return mcq("Quelle conduite assure un usage efficace et exact des instruments pendant une expérience de séparation?", "Peser le récipient vide avant l’expérience, puis le récipient plein, et consigner les deux masses immédiatement dans le tableau prévu", ["Peser seulement le récipient plein à la fin et deviner la masse du récipient vide d’après son apparence générale", "Estimer les volumes à l’œil plutôt qu’au cylindre gradué, pour gagner du temps pendant l’expérience de séparation", "Consigner les masses de mémoire à la fin de la journée, après avoir rangé tout le matériel de l’expérience menée"], "La précision vient des gestes : tare mesurée, instruments adaptés (balance, cylindre gradué) et consignation immédiate. Deviner et attendre détruisent l’exactitude.", {});
  }
]), ["Efficace et exact : mesurer avec l’instrument prévu, au moment prévu.", "Une masse de départ devinée fausse tous les calculs suivants."]);
E("s7f-u3-tools-accurate", 3, ["SC7.9.7"], 2, "var", varset([
  function () {
    return mcq("Pour lire le volume d’eau dans un cylindre gradué, quelle technique donne la mesure la plus exacte?", "Placer les yeux à la hauteur du liquide et lire le bas du ménisque, la surface courbe de l’eau dans le cylindre gradué", ["Regarder le liquide depuis le haut du cylindre et lire le bord supérieur du ménisque formé par l’eau dedans", "Tenir le cylindre à bout de bras et lire la graduation la plus proche de la surface de l’eau qu’il contient", "Lire la graduation pendant qu’on verse encore l’eau, pour gagner du temps sur les étapes suivantes du travail"], "Le ménisque est la surface courbe du liquide : on lit son bas, les yeux à sa hauteur, le cylindre posé et au repos. Toute autre position fausse la lecture par l’angle.", {});
  }
]), ["Ménisque : on lit le bas de la courbe, à hauteur des yeux.", "Un cylindre qui bouge ou qu’on regarde en angle donne une fausse mesure."]);

/* ---------- SC7.9.8 Nouvelles questions issues des separations ---------- */
E("s7f-u3-new-questions", 3, ["SC7.9.8"], 1, "var", varset([
  function () {
    return mcq("Après avoir séparé un mélange de sable et de sel, une équipe remarque que le sel récupéré pèse moins que le sel de départ. Quelle nouvelle question découle directement de cette activité?", "« Où le sel manquant est-il resté pendant nos étapes, et quelle étape l’a retenu le plus? »", ["« Pourquoi le sel et le sable sont-ils deux substances différentes au départ du mélange? »", "« Quelle est la capitale du pays où le sel de table est produit en plus grande quantité? »", "« Le sel récupéré est-il plus beau que le sel de départ utilisé dans le mélange sec? »"], "Une nouvelle question naît d’un résultat à expliquer : la perte de masse pendant les étapes. Elle se rattache directement aux observations de l’activité de séparation.", {});
  }
]), ["La nouvelle question part d’un résultat observé pendant l’activité.", "Une perte mesurée demande une explication mesurable."]);
E("s7f-u3-cr-new-question", 3, ["SC7.9.8"], 2, "var", varset([
  function () {
    return textq("Une équipe essaie de séparer une solution de sucre par filtration, et le sucre traverse le filtre avec l’eau. (a) Énonce la nouvelle question que ce résultat soulève. (b) Nomme la technique de séparation vers laquelle le résultat oriente l’équipe, et dis pourquoi elle devrait réussir là où la filtration a échoué. (2 points)", ["la nouvelle question porte sur la raison pour laquelle le sucre dissous traverse le filtre (la taille des particules dissoutes)", "l’évaporation (ou la distillation) : les particules dissoutes sont trop petites pour un filtre, mais l’eau et le sucre se séparent par le changement d’état de l’eau"], "<b>Réponse modèle :</b> (a) Nouvelle question : pourquoi la filtration sépare-t-elle certains mélanges, mais pas une solution? Autrement dit, quelle propriété d’une substance dissoute lui permet de traverser un filtre? (b) Le résultat oriente vers l’évaporation (ou la distillation, si on veut aussi récupérer l’eau) : les particules de sucre dissous sont beaucoup trop petites pour être retenues par un filtre, mais l’eau s’évapore en laissant le sucre derrière; la distillation ajoute la condensation pour recueillir l’eau.<br><br><b>Points d’attribution :</b> 1 point pour une nouvelle question qui naît du résultat raté (particules dissoutes, taille, limites de la filtration). 1 point pour l’évaporation ou la distillation nommée, avec le raisonnement sur le changement d’état.", {});
  }
]), ["L’échec est une donnée : demande ce qu’il enseigne.", "De la grosseur des particules au point d’ébullition : c’est le changement de technique."]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U3 = { "s7f-u3-cr-design-solubility": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });

/* ----- bank-u4.js ----- */
// CRMARKS: s7f-u4-cr-mineral-tests=3
// CRMARKS: s7f-u4-cr-rock-journey=3
// CRMARKS: s7f-u4-cr-event-compare=3
// CRMARKS: s7f-u4-cr-distribution=3
// CRMARKS: s7f-u4-cr-mountain-explain=2
// CRMARKS: s7f-u4-cr-timeline=2
// CRMARKS: s7f-u4-cr-weathering=3
// CRMARKS: s7f-u4-cr-soil-case=2
// CRMARKS: s7f-u4-cr-theory-evolved=3
// CRMARKS: s7f-u4-cr-big-picture=3
// CRMARKS: s7f-u4-cr-change-explain=3
// CRMARKS: s7f-u4-cr-past-theory=2
// CRMARKS: s7f-u4-cr-mineral-id=2
// CRMARKS: s7f-u4-cr-design-investigation=4
// CRMARKS: s7f-u4-cr-table-display=2
// CRMARKS: s7f-u4-cr-pattern=3
// CRMARKS: s7f-u4-cr-conclusion=3
// Sciences 7, Unite 4 : La croute terrestre (SC7.10.1 a SC7.12.9),
// banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Residus CORE : les questions de SC7.12.1 a SC7.12.3 evaluent le travail
// d'une cle de classification et le choix des methodes a l'ecrit; elles
// n'evaluent pas l'identification manipulative d'echantillons reels.
// Les questions de SC7.12.5 a SC7.12.7 evaluent la conception de
// procedures, le jugement sur les instruments et l'affichage de donnees;
// la realisation est un travail de classe.

/* ---------- SC7.10.1 Classifier les mineraux ---------- */
E("s7f-u4-mineral-properties", 4, ["SC7.10.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces propriétés aide à identifier un minéral en frottant un échantillon sur une plaque de porcelaine non émaillée?", "La trace, c’est-à-dire la couleur de la poudre que le minéral laisse sur la plaque", ["L’éclat, c’est-à-dire la façon dont la surface du minéral réfléchit la lumière", "Le clivage, c’est-à-dire la façon dont le minéral se brise en surfaces planes", "La dureté, c’est-à-dire la résistance du minéral à être rayé par d’autres objets"], "La trace est la couleur de la poudre du minéral, obtenue en le frottant sur la porcelaine. C’est une propriété distincte de la couleur de l’échantillon lui-même.", {});
  },
  function () {
    return mcq("Un minéral se brise en feuilles minces et régulières. Quelle propriété cette cassure illustre-t-elle?", "Le clivage, la tendance du minéral à se séparer selon des plans de faiblesse réguliers", ["La fracture, la tendance du minéral à se briser en surfaces courbes ou irrégulières", "L’éclat, la tendance du minéral à réfléchir la lumière selon des plans réguliers", "La trace, la tendance du minéral à laisser une poudre colorée sur les surfaces"], "Se séparer proprement selon des plans réguliers, c’est le clivage. Une cassure irrégulière ou courbe serait une fracture.", {});
  }
]), ["Chaque propriété a son test : trace sur porcelaine, rayure pour la dureté, cassure pour le clivage.", "Le test décrit dans la question nomme la propriété."]);
E("s7f-u4-mineral-define", 4, ["SC7.10.1"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces échantillons est un minéral, au sens scientifique du terme?", "Le quartz, un solide naturel, inorganique, à la composition et à la structure définies", ["Le charbon, un solide naturel formé entièrement des restes compressés de plantes", "Le verre, un solide fabriqué par les humains à partir de sable fondu en usine", "L’ambre, une résine fossile produite autrefois par des arbres vivants de la forêt"], "Un minéral est un solide naturel et inorganique, de composition définie. Le charbon et l’ambre viennent d’êtres vivants, et le verre est fabriqué : aucun des trois n’est un minéral.", {});
  }
]), ["Naturel, inorganique, solide, composition définie : les quatre critères.", "Ce qui vient d’êtres vivants ou d’une usine n’est pas un minéral."]);
E("s7f-u4-mohs-order", 4, ["SC7.10.1"], 1, "var", varset([
  function () {
    return mcq("Quelle suite place ces minéraux du plus tendre au plus dur selon l’échelle de Mohs?", "Talc, puis gypse, puis calcite, puis quartz, du plus tendre au plus dur de la liste donnée", ["Quartz, puis calcite, puis gypse, puis talc, du plus tendre au plus dur de la liste donnée", "Gypse, puis talc, puis quartz, puis calcite, du plus tendre au plus dur de la liste donnée", "Calcite, puis quartz, puis talc, puis gypse, du plus tendre au plus dur de la liste donnée"], "Sur l’échelle de Mohs : talc 1, gypse 2, calcite 3 et quartz 7. L’ordre croissant est donc talc, gypse, calcite, quartz.", {});
  },
  function () {
    return mcq("Un minéral est rayé par une pièce de cuivre (dureté environ 3), mais il raye le gypse (dureté 2). Quelle est sa dureté approximative?", "Entre 2 et 3 sur l’échelle de Mohs, plus dur que le gypse mais plus tendre que le cuivre utilisé", ["Entre 5 et 6 sur l’échelle de Mohs, plus dur que le gypse mais plus tendre que le cuivre utilisé", "Exactement 7 sur l’échelle de Mohs, comme le quartz qui raye presque tous les objets courants", "Moins de 1 sur l’échelle de Mohs, plus tendre que le talc qui est le minéral le plus tendre connu"], "Rayer le gypse place le minéral au-dessus de 2; être rayé par le cuivre le place sous 3 environ. Sa dureté se situe donc entre 2 et 3.", {});
  }
]), ["L’échelle de Mohs classe de 1 (talc) à 10 (diamant).", "Rayer et être rayé placent le minéral entre deux repères."]);
E("s7f-u4-streak-reliable", 4, ["SC7.10.1"], 2, "var", varset([
  function () {
    return mcq("Deux échantillons d’hématite, l’un rouge et l’autre gris acier, laissent tous les deux une trace rouge-brun. Pourquoi la trace est-elle plus fiable que la couleur pour identifier l’hématite?", "Parce que la couleur d’un minéral varie d’un échantillon à l’autre, tandis que la couleur de sa poudre reste constante", ["Parce que la couleur d’un minéral est toujours fausse, tandis que la poudre montre la vraie composition de la roche", "Parce que la trace se mesure sur l’échelle de Mohs, tandis que la couleur ne se mesure sur aucune échelle connue", "Parce que la trace change de couleur selon la lumière, tandis que la couleur de l’échantillon reste toujours constante"], "La couleur visible d’un minéral peut varier (impuretés, altération), mais la couleur de sa poudre, sa trace, est constante : c’est un meilleur indice d’identification.", {});
  }
]), ["Fiable veut dire : le même résultat pour chaque échantillon du même minéral.", "La couleur varie; la trace demeure."]);
E("s7f-u4-cr-mineral-tests", 4, ["SC7.10.1"], 3, "var", varset([
  function () {
    return textq("Un échantillon inconnu est jaune laiton, très lourd pour sa taille, et il se brise en cubes. Un autre échantillon est aussi jaune laiton, mais léger et feuilleté. Décris TROIS tests qui distinguent les minéraux par leurs propriétés physiques, et dis ce que chaque test révélerait pour séparer ces deux échantillons. (3 points)", ["le test de la trace (la pyrite laisse une trace noir verdâtre; un autre minéral jaune peut différer)", "le test de la dureté (la pyrite, dureté environ 6, n’est pas rayée par l’acier de la même façon; un minéral feuilleté tendre se raye facilement)", "le test du clivage et de la densité (les cubes et la lourdeur indiquent la galène si la trace et la dureté concordent; les feuillets indiquent le mica ou un minéral à clivage en feuilles)"], "<b>Réponse modèle :</b> Test 1, la trace : frotter chaque échantillon sur la porcelaine; la poudre d’un minéral métallique jaune comme la pyrite est noir verdâtre, différente de celle de plusieurs minéraux jaunes. Test 2, la dureté : la pyrite (dureté environ 6) résiste à la lime d’acier, tandis qu’un minéral feuilleté et léger se raye et se sépare facilement. Test 3, le clivage et la masse relative : l’échantillon lourd qui se brise en cubes montre un clivage cubique et une forte densité, indices qui, combinés à la trace, permettent de trancher entre des minéraux d’apparence semblable. Aucune propriété seule ne suffit : c’est leur combinaison qui identifie.<br><br><b>Points d’attribution :</b> 1 point par test correctement décrit et appliqué à la distinction des deux échantillons.", {});
  }
]), ["Trois propriétés indépendantes valent mieux qu’une seule apparence.", "Applique chaque test aux deux échantillons, pas à un seul."]);

/* ---------- SC7.10.2 Classifier les roches ---------- */
E("s7f-u4-rock-families", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    return mcq("Quelle famille de roches se forme par le refroidissement et la solidification du magma ou de la lave?", "Les roches ignées, formées quand la matière fondue refroidit et se solidifie complètement", ["Les roches sédimentaires, formées quand des couches de sédiments sont compactées et cimentées", "Les roches métamorphiques, formées quand une roche existante est transformée par la chaleur", "Les roches ignées, formées quand des sédiments sont compactés au fond des anciens océans"], "Ignée vient du feu : ces roches naissent du refroidissement d’une matière fondue, magma sous la surface ou lave à la surface.", {});
  },
  function () {
    return mcq("Quelle famille de roches se forme quand une roche existante est transformée par la chaleur et la pression, sans fondre?", "Les roches métamorphiques, transformées à l’état solide par la chaleur et la pression subies", ["Les roches ignées, transformées à l’état liquide par la chaleur et la pression subies", "Les roches sédimentaires, transformées par le dépôt de nouvelles couches de sédiments", "Les roches métamorphiques, formées par le refroidissement rapide de la lave en surface"], "Métamorphique veut dire « forme changée » : la chaleur et la pression transforment la roche à l’état solide. Si elle fondait, elle redeviendrait du magma.", {});
  }
]), ["Trois familles, trois modes de formation : feu, couches, transformation.", "Sans fondre est le détail qui décide pour le métamorphisme."]);
E("s7f-u4-igneous-cooling", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    return mcq("Une lave qui refroidit en quelques jours à la surface forme une roche aux cristaux minuscules, presque invisibles. Pourquoi ses cristaux sont-ils si petits?", "Parce que le refroidissement rapide laisse très peu de temps aux cristaux pour grossir dans la lave", ["Parce que le refroidissement lent sous la surface laisse très peu de temps aux cristaux pour grossir", "Parce que la lave de surface contient moins de minéraux que le magma des profondeurs de la croûte", "Parce que la pression de l’air écrase les cristaux pendant qu’ils se forment à la surface de la coulée"], "La taille des cristaux raconte la vitesse de refroidissement : rapide en surface, cristaux minuscules; lent en profondeur, gros cristaux, comme dans le granite.", {});
  },
  function () {
    return mcq("Le granite d’une carrière montre de gros cristaux visibles à l’œil nu. Que révèle cette texture sur sa formation?", "Son magma a refroidi lentement sous la surface, ce qui a laissé le temps aux cristaux de grossir", ["Sa lave a refroidi rapidement à la surface, ce qui a laissé le temps aux cristaux de grossir", "Ses sédiments ont été compactés lentement, ce qui a laissé le temps aux cristaux de grossir", "Sa roche mère a été transformée par la pression, ce qui a fait grossir tous ses cristaux"], "De gros cristaux exigent un refroidissement lent : le granite s’est solidifié en profondeur, à l’abri, pendant que les particules s’organisaient en grands cristaux.", {});
  }
]), ["Texture égale vitesse : petits cristaux, refroidissement rapide; gros cristaux, refroidissement lent.", "Le granite est la roche ignée de profondeur par excellence."]);
E("s7f-u4-cycle-diagram", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma du cycle des roches, quel trajet mène d’une roche sédimentaire à une roche ignée?", "La roche sédimentaire est transformée par la chaleur et la pression, fond, puis le magma refroidit en roche ignée", ["La roche sédimentaire est altérée et érodée en sédiments, qui sont compactés de nouveau en roche ignée", "La roche sédimentaire refroidit directement en surface et devient une roche ignée sans autre étape", "La roche sédimentaire est compactée et cimentée une seconde fois, ce qui la transforme en roche ignée"], "Il n’existe pas de flèche directe : la roche sédimentaire doit d’abord devenir métamorphique sous la chaleur et la pression, puis fondre en magma, dont le refroidissement donne une roche ignée.", {}); q.figure = s7fRockCycleSVG(); return q;
  }
]), ["Suis les flèches du schéma; aucun raccourci n’existe entre ces deux familles.", "La fusion est l’étape obligée avant toute roche ignée."]);
E("s7f-u4-sedimentary-form", 4, ["SC7.10.2"], 2, "var", varset([
  function () {
    return mcq("Quelle suite d’étapes forme une roche sédimentaire à partir d’une montagne de granite?", "Altération et érosion du granite, transport et dépôt des sédiments, puis compaction et cimentation des couches déposées", ["Fusion du granite en magma, refroidissement lent du magma, puis cristallisation des minéraux dans la roche formée", "Chaleur et pression sur le granite, transformation de ses minéraux, puis recristallisation de la roche entière", "Dépôt des sédiments en couches, fusion des couches en magma, puis refroidissement du magma en surface"], "La voie sédimentaire commence par la destruction de la roche (altération et érosion), se poursuit par le dépôt des débris, et se termine par leur transformation en roche par compaction et cimentation.", {});
  }
]), ["La roche sédimentaire naît de débris, pas de matière fondue.", "Compaction et cimentation sont les deux dernières étapes."]);
E("s7f-u4-metamorphic-parent", 4, ["SC7.10.2"], 2, "var", varset([
  function () {
    return mcq("Le marbre est une roche métamorphique formée à partir du calcaire. Qu’est-ce qui a transformé le calcaire en marbre?", "La chaleur et la pression profondes, qui ont recristallisé le calcaire sans le faire fondre complètement", ["La fusion complète du calcaire en magma, qui a refroidi lentement sous la surface de la croûte", "La compaction des coquillages au fond de l’océan, qui a cimenté le calcaire en une roche plus dure", "L’érosion du calcaire par les rivières, qui a poli sa surface pendant des millions d’années entières"], "Le calcaire enfoui et soumis à la chaleur et à la pression recristallise en marbre, à l’état solide. Une fusion complète aurait produit une roche ignée au refroidissement.", {});
  }
]), ["La roche mère du marbre est sédimentaire; son agent de transformation est double.", "Recristalliser sans fondre : c’est la signature du métamorphisme."]);
E("s7f-u4-cr-rock-journey", 4, ["SC7.10.2"], 3, "var", varset([
  function () {
    return textq("Raconte le voyage complet d’une roche : un magma refroidit en profondeur, la roche formée est soulevée jusqu’en montagne, détruite par les intempéries, transportée par une rivière, déposée au fond d’un lac, transformée en roche en couches, puis enfouie et transformée de nouveau. Nomme la famille de roches à chaque étape et le processus qui mène à l’étape suivante. (3 points)", ["magma refroidi en profondeur : roche ignée (refroidissement lent)", "altération et érosion, transport et dépôt : sédiments, puis compaction et cimentation : roche sédimentaire", "enfouissement avec chaleur et pression : roche métamorphique"], "<b>Réponse modèle :</b> Étape 1 : le magma refroidit lentement en profondeur et devient une roche ignée, comme le granite. Étape 2 : soulevée en montagne, cette roche est attaquée par l’altération et l’érosion; ses débris, transportés par la rivière, se déposent en couches au fond du lac. Étape 3 : sous le poids des couches suivantes, les sédiments subissent la compaction et la cimentation et deviennent une roche sédimentaire. Étape 4 : enfouie profondément, cette roche est transformée par la chaleur et la pression, sans fondre, en roche métamorphique. Chaque famille naît d’un processus précis, et le cycle peut continuer.<br><br><b>Points d’attribution :</b> 1 point pour la roche ignée et son refroidissement. 1 point pour le trajet complet vers la roche sédimentaire (altération, transport, dépôt, compaction et cimentation). 1 point pour la roche métamorphique et son agent (chaleur et pression sans fusion).", {});
  }
]), ["Quatre étapes, quatre noms : ignée, sédiments, sédimentaire, métamorphique.", "Chaque transition a son processus : nomme-le à chaque fois."]);

/* ---------- SC7.10.3 Caracteristiques de la croute terrestre ---------- */
E("s7f-u4-earth-layers", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma de l’intérieur de la Terre, quelle couche est la mince couche de roche solide sur laquelle nous vivons?", "La croûte, la couche solide la plus mince et la plus externe de la Terre entière", ["Le manteau, la couche solide la plus épaisse située juste sous la surface terrestre", "Le noyau externe, la couche liquide la plus chaude située au centre de la Terre", "Le noyau interne, la couche solide la plus dense située au centre de la Terre"], "La croûte est la mince pellicule de roche solide qui forme la surface de la Terre. Le manteau, beaucoup plus épais, se trouve dessous.", {}); q.figure = s7fEarthLayersSVG(); return q;
  },
  function () {
    var q = mcq("Quelle couche de la Terre est liquide et composée surtout de fer et de nickel fondus?", "Le noyau externe, la couche liquide qui entoure le noyau interne solide de la Terre", ["Le noyau interne, la couche liquide qui entoure le manteau solide de la Terre entière", "Le manteau inférieur, la couche liquide qui entoure la croûte solide de la Terre", "La croûte océanique, la couche liquide qui entoure les continents solides de la Terre"], "Le noyau externe est liquide (fer et nickel fondus), tandis que le noyau interne, malgré une chaleur extrême, reste solide sous l’énorme pression.", {}); q.figure = s7fEarthLayersSVG(); return q;
  }
]), ["De l’extérieur vers le centre : croûte, manteau, noyau externe, noyau interne.", "Un seul des noyaux est liquide."]);
E("s7f-u4-crust-plates", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    return mcq("En quoi la croûte océanique diffère-t-elle de la croûte continentale?", "Elle est plus mince et plus dense que la croûte continentale, et elle se trouve sous les océans de la Terre", ["Elle est plus épaisse et moins dense que la croûte continentale, et elle se trouve sous les continents", "Elle est composée de magma liquide, tandis que la croûte continentale est composée de roche solide froide", "Elle fait partie du manteau, tandis que la croûte continentale fait partie du noyau externe de la Terre"], "La croûte océanique est mince (quelques kilomètres) et dense; la croûte continentale est plus épaisse et moins dense. Toutes deux forment la partie supérieure des plaques.", {});
  }
]), ["Deux croûtes, deux épaisseurs et deux densités opposées.", "Les plaques portent les deux sortes de croûte."]);
E("s7f-u4-study-tech", 4, ["SC7.10.3"], 2, "var", varset([
  function () {
    return mcq("Les scientifiques ne peuvent pas forer jusqu’au manteau. Quelle technologie leur permet quand même d’étudier l’intérieur profond de la Terre?", "L’étude des ondes sismiques des séismes, dont la vitesse et la trajectoire changent selon les couches traversées de la Terre", ["Les forages très profonds, qui atteignent directement le manteau et en rapportent des échantillons de roche fraîche", "Les satellites photographiques, qui voient à travers la croûte et photographient les couches profondes de la Terre", "Les sous-marins profonds, qui descendent dans des fissures de la croûte jusqu’aux limites du manteau terrestre"], "Les ondes sismiques traversent la Terre entière et changent en passant d’une couche à l’autre : leur étude révèle l’épaisseur et l’état des couches. Aucun forage n’atteint le manteau.", {});
  }
]), ["L’intérieur profond s’étudie indirectement, par des ondes qui le traversent.", "Les forages réels ne percent qu’une fraction de la croûte."]);

/* ---------- SC7.10.4 Evenements catastrophiques ---------- */
E("s7f-u4-earthquake-why", 4, ["SC7.10.4"], 1, "var", varset([
  function () {
    return mcq("Quelle est la cause immédiate de la plupart des séismes?", "Le glissement soudain de roches le long d’une faille, qui libère d’un coup l’énergie accumulée par les contraintes", ["L’éruption soudaine d’un volcan voisin, qui secoue le sol chaque fois que la lave atteint la surface terrestre", "L’effondrement soudain des cavernes souterraines, qui libère l’air accumulé sous la surface de la croûte", "Le passage soudain des marées océaniques, qui tire sur la croûte et la fait vibrer pendant quelques minutes"], "Les plaques poussent lentement contre les failles; quand la contrainte dépasse la résistance de la roche, elle glisse d’un coup : c’est le séisme.", {});
  }
]), ["La cause est un mouvement de roche le long d’une faille.", "L’énergie s’accumule lentement et se libère en quelques secondes."]);
E("s7f-u4-volcano-where", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("Pourquoi les volcans se forment-ils souvent là où une plaque océanique plonge sous une autre plaque?", "Parce que la plaque qui plonge fond en profondeur et que le magma formé remonte pour alimenter des volcans en surface", ["Parce que la plaque qui plonge se refroidit en profondeur et que la glace formée remonte pour alimenter des volcans", "Parce que l’eau de l’océan s’infiltre dans la faille et bout au contact de la croûte pour former des volcans en surface", "Parce que les deux plaques frottent l’une contre l’autre et que la friction seule fait fondre la surface des continents"], "En plongeant, la plaque atteint des profondeurs chaudes et fond partiellement; le magma, moins dense, remonte et perce la surface : une chaîne de volcans naît au-dessus de la zone de plongement.", {});
  }
]), ["Plongement, fusion, remontée du magma : la chaîne compte trois maillons.", "Le frottement seul ne fait pas fondre les plaques."]);
E("s7f-u4-event-effects", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("Quel effet distingue une éruption volcanique d’un séisme dans ses conséquences pour les populations voisines?", "L’éruption peut projeter des cendres qui voyagent sur de grandes distances et nuisent à la respiration et à l’aviation", ["Le séisme peut projeter des cendres qui voyagent sur de grandes distances et nuisent à la respiration et à l’aviation", "L’éruption secoue le sol par vagues successives pendant que le séisme produit des coulées de lave lente en surface", "Le séisme émet des gaz chauds qui brûlent les récoltes pendant que l’éruption fissure seulement les fondations"], "Les cendres volcaniques sont propres aux éruptions : elles se dispersent au loin et affectent la santé et le transport aérien. Le séisme, lui, secoue et fissure, sans produire de cendres.", {});
  }
]), ["Chaque événement a sa signature : secousses contre cendres et lave.", "Attribution juste des effets à chaque événement."]);
E("s7f-u4-cr-event-compare", 4, ["SC7.10.4"], 3, "var", varset([
  function () {
    return textq("Compare un séisme et une éruption volcanique : pour chacun, nomme sa cause immédiate, un effet à la surface de la Terre, et un point commun entre les deux événements. (3 points)", ["le séisme : glissement soudain le long d’une faille; effet : secousses, fissures, bâtiments endommagés", "l’éruption : magma qui remonte et perce la surface; effet : lave, cendres, gaz", "le point commun : les deux sont liés aux mouvements des plaques et libèrent l’énergie de l’intérieur de la Terre"], "<b>Réponse modèle :</b> Séisme : sa cause immédiate est le glissement soudain des roches le long d’une faille, qui libère l’énergie accumulée; à la surface, le sol tremble, se fissure et peut endommager les bâtiments. Éruption volcanique : sa cause immédiate est le magma qui remonte par une fissure et perce la surface; à la surface, elle produit des coulées de lave, des projections de cendres et des gaz. Point commun : les deux événements se produisent surtout près des limites de plaques et libèrent, chacun à sa façon, l’énergie interne de la Terre.<br><br><b>Points d’attribution :</b> 1 point pour le séisme (cause et effet). 1 point pour l’éruption (cause et effet). 1 point pour un point commun juste.", {});
  }
]), ["Deux colonnes mentales : cause, effet; puis la ligne commune.", "Le point commun remonte aux plaques."]);

/* ---------- SC7.10.5 Distribution des seismes et des volcans ---------- */
E("s7f-u4-distribution-data", 4, ["SC7.10.5"], 1, "var", varset([
  function () {
    var q = mcq("Sur la carte mondiale, comment les emplacements des séismes et des volcans sont-ils répartis?", "Ils se concentrent le long de bandes étroites qui dessinent les limites des plaques de la croûte terrestre", ["Ils sont répartis également sur toute la surface des continents et des océans de la planète entière", "Ils se concentrent au centre des continents, loin des côtes et des chaînes de montagnes connues", "Ils sont répartis au hasard, sans aucune régularité que les scientifiques puissent décrire ou utiliser"], "Les points de la carte forment des bandes, notamment autour du Pacifique : ce sont les limites de plaques, où les mouvements de la croûte produisent séismes et volcans.", {}); q.figure = s7fWorldMapSVG(); return q;
  }
]), ["Regarde la forme que dessinent les points, pas chaque point séparément.", "Des bandes, pas une dispersion uniforme."]);
E("s7f-u4-distribution-map", 4, ["SC7.10.5"], 2, "var", varset([
  function () {
    return mcq("Que révèle la superposition des emplacements des séismes et des volcans sur la même carte?", "Les deux phénomènes se produisent souvent aux mêmes endroits, le long des mêmes limites de plaques de la croûte", ["Les deux phénomènes se produisent toujours à des endroits opposés, sans jamais partager la même région du globe", "Les volcans se produisent seulement dans les océans, tandis que les séismes se produisent seulement sur les continents", "Les séismes se produisent seulement près des volcans, tandis que les volcans n’ont aucun lien avec les limites de plaques"], "Séismes et volcans se recouvrent largement le long des limites de plaques : la même cause, le mouvement des plaques, explique les deux distributions.", {});
  }
]), ["Compare les deux séries de symboles de la légende.", "Un recouvrement fréquent signale une cause commune."]);
E("s7f-u4-ring-of-fire", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    return mcq("La « ceinture de feu » du Pacifique concentre une grande partie des volcans actifs du monde. Quelle interprétation des données de distribution explique cette concentration?", "Le pourtour du Pacifique suit les limites de plusieurs plaques, où les plongements alimentent des chaînes de volcans actifs", ["Le pourtour du Pacifique est la région la plus chaude de la planète, ce qui fait fondre la croûte sous les volcans actifs", "Les volcans se forment au hasard, et leur concentration autour du Pacifique est une coïncidence sans cause géologique", "Le Pacifique est l’océan le plus ancien, donc ses volcans ont eu plus de temps pour devenir actifs que les autres"], "Les données montrent des bandes, et la ceinture de feu suit les limites de plaques du Pacifique : là où une plaque plonge sous une autre, le magma remonte et nourrit des volcans.", {});
  }
]), ["La ceinture épouse le contour d’un océan : pense aux limites de plaques qui le bordent.", "Une régularité mondiale exige une cause mondiale."]);
E("s7f-u4-cr-distribution", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    return textq("On te donne les coordonnées de 20 séismes récents : 15 se situent le long de la côte ouest de l’Amérique du Sud, 3 au centre de l’océan Atlantique sur une ligne nord-sud, et 2 sont isolés au centre de continents. Organise ces données en un résumé, décris la régularité qu’elles montrent, et énonce ce qu’elle permet d’inférer sur la croûte terrestre. (3 points)", ["un résumé organisé (par exemple un tableau par région avec les comptages 15, 3 et 2)", "la régularité : les séismes se concentrent en bandes, le long de certaines côtes et d’une ligne océanique, et sont rares au centre des continents", "l’inférence : ces bandes marquent les limites des plaques de la croûte, qui est donc divisée en plaques en mouvement"], "<b>Réponse modèle :</b> Résumé : côte ouest de l’Amérique du Sud, 15 séismes; centre de l’Atlantique (ligne nord-sud), 3 séismes; centres de continents, 2 séismes. Régularité : les séismes ne sont pas répartis au hasard; ils se concentrent en bandes étroites (une côte, une ligne au milieu d’un océan) et sont rares à l’intérieur des continents. Inférence : ces bandes correspondent aux limites des plaques qui composent la croûte terrestre; les séismes se produisent là où les plaques se rencontrent et bougent les unes par rapport aux autres.<br><br><b>Points d’attribution :</b> 1 point pour le résumé organisé des données. 1 point pour la régularité décrite (concentration en bandes). 1 point pour l’inférence sur les limites de plaques.", {});
  }
]), ["Organise, puis décris la forme, puis infère la cause.", "Les nombres par région font apparaître la régularité."]);

/* ---------- SC7.10.6 Formation des montagnes ---------- */
E("s7f-u4-fold-fault", 4, ["SC7.10.6"], 1, "var", varset([
  function () {
    return mcq("Quand deux plaques convergent lentement, que peuvent subir les couches de roche prises entre elles?", "Elles peuvent se plisser en plis, comme les pages d’un livre qu’on pousse des deux côtés à la fois", ["Elles peuvent fondre instantanément en magma, comme la lave d’un volcan en éruption soudaine", "Elles peuvent se transformer en sédiments, comme le sable déposé au fond d’un lac tranquille", "Elles peuvent s’évaporer sous la pression, comme l’eau d’une bouilloire laissée sur le feu"], "Une compression lente plisse les couches de roche ductile : ces plis, redressés et érodés, forment plusieurs chaînes de montagnes.", {});
  }
]), ["Converger égale comprimer; comprimer des couches égale les plisser ou les casser.", "Le processus est lent, à l’échelle des millions d’années."]);
E("s7f-u4-mountain-process", 4, ["SC7.10.6"], 2, "var", varset([
  function () {
    return mcq("Quelle suite explique le mieux la formation d’une grande chaîne de montagnes comme les Rocheuses ou l’Himalaya?", "Des plaques convergent pendant des millions d’années; la croûte se plisse, se faille et s’épaissit, puis le soulèvement et l’érosion façonnent les sommets", ["Un volcan unique entre en éruption pendant quelques années; ses cendres s’accumulent en couches épaisses, puis le vent façonne les sommets", "Les rivières déposent des sédiments pendant des millions d’années; les couches s’empilent jusqu’à former des sommets de plusieurs kilomètres", "La croûte se refroidit et se contracte en quelques siècles; ses rides se figent en montagnes que l’érosion ne peut plus jamais modifier ensuite"], "Les grandes chaînes naissent de la convergence durable des plaques : plissement, failles et épaississement de la croûte soulèvent la roche, que l’érosion sculpte ensuite.", {});
  }
]), ["Montagnes égale convergence plus temps géologique.", "Le dépôt de sédiments fait des couches, pas des sommets."]);
E("s7f-u4-cr-mountain-explain", 4, ["SC7.10.6"], 3, "var", varset([
  function () {
    return textq("Explique, en deux ou trois phrases liées, comment la collision de deux plaques continentales peut élever une chaîne de montagnes là où il y avait autrefois un océan. (2 points)", ["les plaques convergent et compriment les sédiments et les roches de l’ancien fond océanique", "la croûte se plisse, se faille et s’épaissit; le soulèvement élève les roches (dont des fossiles marins) en montagnes"], "<b>Réponse modèle :</b> Quand deux plaques continentales convergent, l’océan qui les séparait se referme : les sédiments et les roches de son fond sont comprimés entre les deux masses. La croûte se plisse, se brise en failles et s’épaissit sous la compression, et ce soulèvement prolongé élève l’ensemble en chaîne de montagnes. C’est pourquoi on trouve des fossiles d’organismes marins dans des roches aujourd’hui hautes en montagne.<br><br><b>Points d’attribution :</b> 1 point pour la compression des matériaux de l’ancien océan entre les plaques. 1 point pour le plissement, l’épaississement et le soulèvement qui forment la chaîne.", {});
  }
]), ["Refermer un océan, comprimer son contenu, élever le tout.", "Les fossiles marins en montagne sont la preuve à expliquer."]);

/* ---------- SC7.10.7 Echelle du temps geologique ---------- */
E("s7f-u4-era-order", 4, ["SC7.10.7"], 1, "var", varset([
  function () {
    var q = mcq("Quelle suite place les ères géologiques dans l’ordre chronologique, de la plus ancienne à la plus récente?", "Précambrien, puis Paléozoïque, puis Mésozoïque, puis Cénozoïque, de la plus ancienne à la plus récente des ères", ["Cénozoïque, puis Mésozoïque, puis Paléozoïque, puis Précambrien, de la plus ancienne à la plus récente des ères", "Paléozoïque, puis Précambrien, puis Cénozoïque, puis Mésozoïque, de la plus ancienne à la plus récente des ères", "Mésozoïque, puis Paléozoïque, puis Précambrien, puis Cénozoïque, de la plus ancienne à la plus récente des ères"], "L’échelle du temps géologique se lit du Précambrien (le plus ancien et le plus long) au Cénozoïque (l’ère actuelle), en passant par le Paléozoïque et le Mésozoïque.", {}); q.figure = s7fTimeStripSVG(); return q;
  },
  function () {
    var q = mcq("Dans la bande du temps géologique dessinée à l’échelle, quelle ère occupe de loin la plus grande partie de l’histoire de la Terre?", "Le Précambrien, qui couvre environ 87 pour cent de toute l’histoire de la Terre représentée à l’échelle", ["Le Paléozoïque, qui couvre environ 87 pour cent de toute l’histoire de la Terre représentée à l’échelle", "Le Mésozoïque, qui couvre environ la moitié de toute l’histoire de la Terre représentée à l’échelle ici", "Le Cénozoïque, qui couvre environ le tiers de toute l’histoire de la Terre représentée à l’échelle ici"], "Dessinée à l’échelle, la bande montre que le Précambrien occupe environ 87 pour cent des 4,6 milliards d’années : les autres ères se partagent le reste.", {}); q.figure = s7fTimeStripSVG(); return q;
  }
]), ["À l’échelle, les proportions sont le contenu : la plus longue bande domine.", "L’ère actuelle est la plus courte des quatre."]);
E("s7f-u4-era-scale", 4, ["SC7.10.7"], 2, "var", varset([
  function () {
    return mcq("Pourquoi un modèle chronologique de l’histoire de la Terre doit-il être dessiné à l’échelle pour être honnête?", "Parce que sans échelle, les ères semblent de durées égales, alors que le Précambrien dure beaucoup plus longtemps que toutes les autres réunies", ["Parce que sans échelle, les noms des ères deviennent impossibles à lire sur le modèle chronologique de la classe", "Parce que sans échelle, les événements récents semblent plus anciens que les événements du début de la Terre", "Parce que sans échelle, les couleurs des ères changent et rendent le modèle chronologique impossible à imprimer"], "Un modèle à l’échelle respecte les durées réelles : il montre que l’histoire de la vie complexe tient dans une petite fraction récente de l’histoire de la Terre.", {});
  }
]), ["L’honnêteté du modèle est une question de proportions.", "Quatre cases égales raconteraient un mensonge sur les durées."]);
E("s7f-u4-cr-timeline", 4, ["SC7.10.7"], 3, "var", varset([
  function () {
    return textq("Construis le plan d’un modèle chronologique à l’échelle de l’histoire de la Terre (4,6 milliards d’années) sur une bande de 4,6 m. Indique la longueur approximative de chaque ère et place UN événement majeur dans l’ère qui lui convient : premières formes de vie, premiers poissons, premiers mammifères, premiers humains. (2 points)", ["le Précambrien occupe environ 4,0 m de la bande, avec les premières formes de vie", "le Paléozoïque environ 0,29 m (premiers poissons), le Mésozoïque environ 0,19 m (premiers mammifères), le Cénozoïque environ 0,07 m (premiers humains)"], "<b>Réponse modèle :</b> Sur une bande de 4,6 m où 1 m vaut 1 milliard d’années : le Précambrien occupe environ 4,0 m et contient les premières formes de vie. Le Paléozoïque occupe environ 0,29 m, avec les premiers poissons et les premières forêts. Le Mésozoïque occupe environ 0,19 m, avec les premiers mammifères et les premières plantes à fleurs. Le Cénozoïque occupe environ 0,07 m, avec les premiers humains vers son tout début récent. Le modèle montre ainsi que presque toute l’histoire de la Terre précède les ères des animaux et des plantes complexes.<br><br><b>Points d’attribution :</b> 1 point pour des longueurs approximatives proportionnelles aux durées. 1 point pour les quatre événements placés dans les bonnes ères.", {});
  }
]), ["Un mètre par milliard d’années : convertis chaque durée en longueur.", "Les humains appartiennent à la toute dernière ère."]);

/* ---------- SC7.10.8 Alteration, erosion et formation des sols ---------- */
E("s7f-u4-weathering-types", 4, ["SC7.10.8"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces situations illustre une altération mécanique (physique) d’une roche?", "L’eau qui gèle dans une fissure de la roche la fait éclater en morceaux plus petits au printemps", ["L’eau de pluie acide qui dissout lentement la surface d’une statue de calcaire exposée dehors", "Les racines qui produisent des acides faibles qui attaquent les minéraux de la roche du jardin", "L’oxygène qui rouille les minéraux de fer d’une roche exposée à l’air pendant de longues années"], "L’altération mécanique brise la roche sans changer sa composition : le gel de l’eau dans les fissures la fait éclater. Dissoudre, rouiller et attaquer par des acides sont des altérations chimiques.", {});
  },
  function () {
    return mcq("Laquelle de ces situations illustre une altération chimique d’une roche?", "Les acides faibles des racines et de la pluie décomposent les minéraux d’un granite, qui s’effrite peu à peu", ["Le gel et le dégel répétés brisent un granite en éclats anguleux au pied d’une falaise exposée au nord", "Le vent chargé de sable polit et creuse la surface d’un granite dans un désert chaud et très sec", "Une rivière rapide roule et arrondit les galets de granite arrachés aux berges pendant les crues"], "Décomposer les minéraux eux-mêmes, c’est une altération chimique. Briser, polir et arrondir sans changer la composition relèvent de l’altération mécanique et de l’érosion.", {});
  }
]), ["Mécanique : la roche se brise, sa composition reste. Chimique : ses minéraux changent.", "Le gel dans les fissures est l’exemple classique du mécanique."]);
E("s7f-u4-frost-wedging", 4, ["SC7.10.8"], 1, "var", varset([
  function () {
    return mcq("Pourquoi l’eau qui gèle dans une fissure peut-elle faire éclater une roche?", "Parce que l’eau se dilate en gelant et pousse les parois de la fissure, ce qui l’élargit un peu plus à chaque gel", ["Parce que l’eau se contracte en gelant et tire les parois de la fissure vers l’intérieur à chaque gel de l’hiver", "Parce que la glace dissout les minéraux de la roche plus vite que l’eau liquide des pluies du printemps", "Parce que la glace devient plus lourde que la roche et l’écrase sous son poids pendant tout l’hiver entier"], "L’eau est l’une des rares substances qui se dilatent en gelant : la glace pousse les parois de la fissure, et les gels répétés finissent par détacher des éclats de roche.", {});
  }
]), ["La glace prend plus de place que l’eau dont elle vient.", "Répété chaque hiver, le petit élargissement devient une cassure."]);
E("s7f-u4-weathering-erosion", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("Quelle est la différence correcte entre l’altération et l’érosion?", "L’altération brise ou décompose la roche sur place, tandis que l’érosion déplace les débris ainsi formés vers un autre endroit", ["L’altération déplace les débris de roche, tandis que l’érosion brise la roche sur place sans jamais la déplacer ensuite", "L’altération ne concerne que les roches sédimentaires, tandis que l’érosion ne concerne que les roches ignées des volcans", "L’altération se produit seulement sous l’eau, tandis que l’érosion se produit seulement dans les déserts chauds et secs"], "Altération : la roche se défait là où elle est. Érosion : l’eau, la glace, le vent ou la gravité emportent les morceaux. La formation des sols enchaîne les deux.", {});
  }
]), ["Sur place contre en déplacement : c’est la ligne de partage.", "Les sols naissent des débris altérés, souvent déplacés ensuite."]);
E("s7f-u4-winter-chime", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("Au printemps, au pied d’une falaise de la côte, on trouve un amas frais d’éclats de roche anguleux. Quel enchaînement explique le mieux cet amas?", "L’eau a pénétré les fissures pendant l’hiver, gelé et fait éclater la roche, puis la gravité a fait tomber les éclats au pied de la falaise", ["Les vagues ont poli les éclats pendant l’hiver, puis le vent les a triés et déposés en amas au pied de la falaise côtière", "Les racines des plantes ont dissous la falaise pendant l’hiver, puis la pluie a lavé les éclats jusqu’au pied de la falaise", "Le sel de la mer a fait fondre la roche pendant l’hiver, puis la marée a déposé les éclats fondus au pied de la falaise"], "Des éclats anguleux et frais signalent une cassure récente sans transport : le gel dans les fissures (altération mécanique), suivi de la chute par gravité (déplacement minimal).", {});
  }
]), ["Anguleux égale cassé sur place, pas transporté au loin.", "Gel, éclatement, chute : trois étapes dans l’ordre."]);
E("s7f-u4-cr-weathering", 4, ["SC7.10.8"], 3, "var", varset([
  function () {
    return textq("Un affleurement rocheux devient peu à peu un sol cultivable. Décris la contribution de l’altération mécanique, de l’altération chimique et des organismes à cette transformation, en donnant un exemple précis de chacun. (3 points)", ["l’altération mécanique brise la roche (par exemple le gel de l’eau dans les fissures)", "l’altération chimique décompose les minéraux et libère des nutriments (par exemple les acides des racines ou la pluie acide naturelle)", "les organismes ajoutent la matière organique et mélangent le sol (racines, vers, décomposition des êtres vivants)"], "<b>Réponse modèle :</b> Altération mécanique : l’eau qui gèle dans les fissures fait éclater la roche en fragments de plus en plus petits, ce qui multiplie les surfaces exposées. Altération chimique : l’eau de pluie légèrement acide et les acides des racines décomposent les minéraux des fragments et libèrent des éléments nutritifs comme le potassium et le calcium. Organismes : les plantes s’enracinent dans les débris, les vers et les microorganismes y mélangent la matière organique des êtres morts et en décomposition, ce qui transforme les débris minéraux en un sol capable de nourrir de nouvelles plantes.<br><br><b>Points d’attribution :</b> 1 point pour l’altération mécanique avec un exemple. 1 point pour l’altération chimique avec un exemple. 1 point pour le rôle des organismes dans la formation du sol.", {});
  }
]), ["Trois agents, trois travaux : briser, décomposer, enrichir.", "Le sol final contient du minéral altéré et de la matière organique."]);

/* ---------- SC7.10.9 Classifier les sols ---------- */
E("s7f-u4-soil-texture", 4, ["SC7.10.9"], 1, "var", varset([
  function () {
    return mcq("Quel sol a la texture la plus grossière, formée des plus grosses particules?", "Le sol de gravier sableux, dont les particules grossières laissent passer l’eau très rapidement entre elles", ["Le sol loameux, dont les particules moyennes retiennent l’eau et les nutriments de façon équilibrée", "Le sol argileux, dont les particules très fines retiennent l’eau longtemps à la surface du terrain", "Le sol de tourbe, dont les particules organiques retiennent l’eau comme une éponge végétale épaisse"], "La texture suit la grosseur des particules : grossière pour le gravier et le sable, moyenne pour le loam, fine pour l’argile. Les grosses particules laissent de grands espaces où l’eau circule vite.", {});
  },
  function () {
    return mcq("Lequel de ces sols est de texture fine?", "Le sol argileux, formé de particules très fines qui se tassent et retiennent l’eau longtemps après la pluie", ["Le sol sableux, formé de particules grossières qui laissent l’eau s’écouler rapidement après la pluie", "Le sol graveleux, formé de pierres et de particules grossières qui drainent très vite après la pluie", "Le sol loameux, formé d’un mélange équilibré qui retient l’eau modérément après les pluies du printemps"], "L’argile est la texture fine : ses particules minuscules laissent peu d’espace à l’eau, qui s’y écoule très lentement.", {});
  }
]), ["Texture égale grosseur des particules : grossière, moyenne, fine.", "Fine égale argile; grossière égale sable et gravier."]);
E("s7f-u4-soil-form", 4, ["SC7.10.9"], 1, "var", varset([
  function () {
    return mcq("De quoi un sol est-il principalement composé?", "De débris de roche altérée mélangés à de la matière organique provenant d’êtres vivants morts et décomposés", ["De roche solide non altérée mélangée à de l’eau pure provenant des pluies accumulées dans le terrain", "De sable importé mélangé à des engrais fabriqués en usine et épandus par les agriculteurs chaque année", "De cendres volcaniques mélangées à de la lave refroidie provenant d’éruptions anciennes de la région"], "Un sol naît sur place : la roche altérée fournit la partie minérale, et les êtres vivants morts et décomposés fournissent la matière organique qui le rend fertile.", {});
  }
]), ["Deux ingrédients : le minéral altéré et l’organique décomposé.", "Un sol n’est ni de la roche intacte ni un produit fabriqué."]);
E("s7f-u4-soil-drainage", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre le temps que mettent 25 mL d’eau à traverser trois échantillons de sol. Quelle conclusion sur les textures est correcte?", "L’échantillon le plus rapide est le sol grossier (sableux) et le plus lent est le sol fin (argileux), car les espaces entre les particules diffèrent", ["L’échantillon le plus rapide est le sol fin (argileux) et le plus lent est le sol grossier (sableux), car les espaces entre les particules diffèrent", "Les trois échantillons ont la même texture, car ils contiennent tous la même quantité de matière organique décomposée", "L’échantillon le plus lent est le sol grossier, car ses grosses particules bloquent complètement le passage de l’eau versée"], "De grosses particules laissent de grands espaces : l’eau traverse vite le sol sableux. Les particules fines de l’argile laissent des espaces minuscules : l’eau y met beaucoup plus de temps.", {}); q.figure = s7fDrainSVG([{name: 'Echantillon 1', secs: 12}, {name: 'Echantillon 2', secs: 47}, {name: 'Echantillon 3', secs: 130}]); return q;
  }
]), ["Relie la vitesse de drainage à la grosseur des particules et à leurs espaces.", "Le temps le plus court appartient à la texture la plus grossière."]);
E("s7f-u4-cr-soil-case", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    return textq("Un jardinier compare deux terrains : le premier, sableux, sèche dès le lendemain d’une pluie; le second, argileux, garde des flaques pendant des jours. Classe chaque terrain selon sa texture et explique, par la grosseur des particules, pourquoi leur drainage diffère autant. (2 points)", ["le terrain sableux est de texture grossière : ses grosses particules laissent de grands espaces où l’eau s’écoule vite", "le terrain argileux est de texture fine : ses particules minuscules laissent des espaces très petits où l’eau avance lentement"], "<b>Réponse modèle :</b> Le terrain sableux est un sol de texture grossière : ses particules sont grosses et les espaces entre elles sont grands, donc l’eau de pluie les traverse rapidement et le terrain sèche dès le lendemain. Le terrain argileux est un sol de texture fine : ses particules sont minuscules et tassées, les espaces entre elles sont très petits, donc l’eau avance lentement et forme des flaques qui persistent pendant des jours.<br><br><b>Points d’attribution :</b> 1 point pour le terrain sableux (texture grossière et drainage rapide expliqués par les particules). 1 point pour le terrain argileux (texture fine et drainage lent expliqués par les particules).", {});
  }
]), ["La texture explique le drainage : suis les espaces entre les particules.", "Un terrain par point, avec le même raisonnement en miroir."]);

/* ---------- SC7.11.1 Evolution de la theorie de la tectonique des plaques ---------- */
E("s7f-u4-wegener-evidence", 4, ["SC7.11.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces observations a appuyé l’idée que les continents ont déjà été réunis?", "Des fossiles de la même plante ancienne se trouvent en Amérique du Sud et en Afrique, séparées aujourd’hui par un océan entier", ["Des fossiles de poissons actuels se trouvent dans tous les océans du monde, reliés aujourd’hui par les courants marins", "Des roches volcaniques récentes se trouvent sur plusieurs continents, formées par des éruptions des derniers siècles", "Des couches de charbon se trouvent dans plusieurs pays, formées dans des forêts qui poussaient sous des climats chauds"], "Une plante terrestre ancienne ne traverse pas un océan : ses fossiles sur deux continents aujourd’hui séparés suggèrent que ces continents étaient autrefois joints.", {});
  }
]), ["L’observation gagnante doit être impossible à expliquer si les continents n’ont jamais bougé.", "Une plante terrestre ne nage pas jusqu’à un autre continent."]);
E("s7f-u4-boundaries", 4, ["SC7.11.1"], 1, "var", varset([
  function () {
    return mcq("À une limite de plaques convergente, que se passe-t-il généralement?", "Les plaques se rapprochent l’une de l’autre, et l’une peut plonger sous l’autre ou la croûte se comprime en montagnes à leur rencontre", ["Les plaques s’écartent l’une de l’autre, et du magma remonte pour former une nouvelle croûte au fond de l’océan entre elles", "Les plaques glissent horizontalement l’une contre l’autre, sans créer ni détruire de croûte à leur limite de rencontre", "Les plaques cessent complètement de bouger, et leur limite devient une zone calme sans séismes ni volcans pendant toujours"], "Convergente veut dire qui se rapproche : plongement d’une plaque ou compression en chaînes de montagnes. L’écartement décrit une limite divergente.", {});
  }
]), ["Convergente, divergente, transformante : trois mouvements, trois limites.", "Le mot « convergente » contient déjà la réponse."]);
E("s7f-u4-convection", 4, ["SC7.11.1"], 2, "var", varset([
  function () {
    return mcq("Quel mécanisme est proposé pour expliquer le mouvement lent des plaques?", "Des courants de convection dans le manteau chaud, où la matière chaude monte et la matière plus froide descend très lentement", ["Des courants de convection dans les océans, où l’eau chaude monte et entraîne les continents comme des radeaux à la surface", "Le vent et les marées, qui poussent les continents un peu plus chaque année dans la direction des courants dominants", "La rotation de la Terre, qui projette les continents vers l’extérieur comme la boue sur une roue qui tourne vite"], "Le manteau, bien que solide, peut s’écouler très lentement : ses courants de convection, alimentés par la chaleur interne, accompagnent le mouvement des plaques à leur surface.", {});
  }
]), ["Le moteur est sous les plaques, dans le manteau chaud.", "Le mouvement se mesure en centimètres par année."]);
E("s7f-u4-new-evidence", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return mcq("Quelle nouvelle donnée, recueillie au vingtième siècle, a transformé la dérive des continents en théorie de la tectonique des plaques?", "La découverte des dorsales océaniques et des bandes magnétiques symétriques du fond des océans, qui montrent une croûte neuve qui s’écarte des dorsales", ["La découverte de fossiles plus anciens sur les continents, qui montrent des plantes identiques sur des continents séparés par des océans entiers", "La mesure précise des marées par satellite, qui montre que les continents montent et descendent avec les cycles de la Lune chaque jour", "La photographie des continents depuis l’espace, qui montre que leurs côtes s’emboîtent comme les pièces d’un casse-tête géant"], "Le fond des océans a livré la preuve décisive : une croûte neuve se forme aux dorsales et s’en écarte symétriquement, comme le prouvent les bandes magnétiques. La dérive a alors reçu un mécanisme et une mesure.", {});
  }
]), ["La donnée décisive vient du fond des océans, pas des continents.", "Une croûte qui naît et qui s’écarte explique le mouvement."]);
E("s7f-u4-cr-theory-evolved", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return textq("Décris comment la théorie de la tectonique des plaques a évolué à la lumière de nouvelles données géologiques, en nommant l’idée de départ, la donnée nouvelle qui l’a transformée, et ce que la théorie actuelle explique de plus. (3 points)", ["l’idée de départ : la dérive des continents, appuyée par les côtes qui s’emboîtent et les fossiles communs, mais sans mécanisme convaincant", "la donnée nouvelle : les dorsales océaniques, l’expansion du fond des océans et les bandes magnétiques symétriques", "la théorie actuelle explique le mouvement des plaques entières, la formation des océans, des montagnes, des séismes et des volcans aux limites de plaques"], "<b>Réponse modèle :</b> Au départ, l’idée de la dérive des continents reposait sur des indices continentaux : des côtes qui semblent s’emboîter et des fossiles identiques sur des continents séparés. Elle a été longtemps rejetée, faute d’un mécanisme capable de déplacer des continents. Les données nouvelles sont venues des océans : la découverte des dorsales océaniques, de l’expansion du fond des océans et des bandes magnétiques symétriques de part et d’autre des dorsales a prouvé que la croûte bouge et se renouvelle. La théorie actuelle, celle de la tectonique des plaques, explique alors d’un seul tenant le déplacement des plaques, la naissance des océans, la formation des montagnes et la distribution des séismes et des volcans.<br><br><b>Points d’attribution :</b> 1 point pour l’idée de départ et sa limite. 1 point pour les données océaniques nouvelles. 1 point pour la portée explicative de la théorie actuelle.", {});
  }
]), ["Trois temps : idée, donnée nouvelle, théorie élargie.", "La transformation vient d’un nouveau lieu d’observation : le fond des océans."]);

/* ---------- SC7.11.2 Contributions canadiennes a la geologie ---------- */
E("s7f-u4-canadian-match", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("Quelle contribution canadienne à la géologie est correctement décrite?", "J. Tuzo Wilson, géologue canadien, a proposé les failles transformantes et le concept des points chauds dans la tectonique des plaques moderne", ["J. Tuzo Wilson, géologue canadien, a proposé la dérive des continents et les bandes magnétiques du fond des océans entiers", "Un géologue canadien a découvert le noyau interne de la Terre en forant le forage le plus profond du monde au Manitoba", "Des géologues canadiens ont inventé le sismographe et mesuré le premier séisme de l’histoire dans un laboratoire de Toronto"], "J. Tuzo Wilson (Université de Toronto) a enrichi la tectonique des plaques par les failles transformantes et les points chauds : une contribution canadienne majeure à la géologie mondiale.", {});
  },
  function () {
    return mcq("Le Bouclier canadien contribue à notre compréhension de la géologie mondiale surtout parce qu’il", "expose des roches parmi les plus anciennes de la Terre, qui documentent ses premiers milliards d’années d’histoire géologique", ["contient les volcans les plus actifs du monde, qui documentent la formation actuelle des montagnes sur la planète entière", "renferme les océans les plus profonds du monde, qui documentent la formation du fond des océans à l’heure actuelle", "montre les couches de glace les plus épaisses du monde, qui documentent le climat des premiers milliards d’années"], "Le Bouclier canadien expose au jour des roches très anciennes, ailleurs enfouies : il sert de fenêtre sur les débuts de l’histoire de la croûte terrestre.", {});
  }
]), ["La contribution canadienne se rattache à la tectonique des plaques et aux roches anciennes.", "Wilson et le Bouclier sont les deux exemples sûrs."]);
E("s7f-u4-canadian-scenario", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("Des géologues étudient les très anciennes roches du Bouclier canadien près de la baie d’Hudson pour comprendre la jeune croûte terrestre. Quel énoncé décrit correctement la portée de ce travail?", "C’est un exemple de contribution canadienne à la géologie mondiale : un terrain local qui éclaire l’histoire de toute la planète Terre", ["C’est un travail purement local sans portée mondiale, car les roches anciennes ne se trouvent qu’au Canada seulement", "C’est un exemple de géologie appliquée aux mines, qui ne contribue jamais à la compréhension de l’histoire de la Terre", "C’est un travail qui contredit la tectonique des plaques, car les roches anciennes prouvent que la croûte ne bouge pas"], "Les roches du Bouclier comptent parmi les plus vieilles connues : les étudier au Canada renseigne sur les premiers temps de toutes les croûtes continentales du monde.", {});
  }
]), ["Local par le lieu, mondial par la portée.", "Les plus vieilles roches racontent les débuts de toutes les croûtes."]);

/* ---------- SC7.11.3 Les explications reposent sur les donnees ---------- */
E("s7f-u4-imagination-role", 4, ["SC7.11.3"], 1, "var", varset([
  function () {
    return mcq("Pourquoi les explications géologiques de l’évolution de la Terre exigent-elles de relier de nombreuses observations différentes?", "Parce qu’aucune observation seule ne montre le processus entier : les roches, les fossiles et les formes du terrain doivent être reliés pour raconter l’histoire complète", ["Parce que les géologues n’ont pas le droit d’utiliser une seule observation, même quand elle suffit à expliquer un phénomène entier", "Parce que les observations anciennes sont toujours fausses et doivent être remplacées par des observations récentes plus nombreuses", "Parce que chaque observation contredit les autres, et que seule la majorité des observations peut décider de l’explication finale"], "L’histoire de la Terre ne s’observe pas directement : elle se reconstruit en reliant des indices de natures différentes (roches, fossiles, reliefs, mesures) qui se confirment mutuellement.", {});
  }
]), ["Relier des indices différents renforce une explication.", "Le passé profond ne se regarde pas; il se reconstruit."]);
E("s7f-u4-evidence-link", 4, ["SC7.11.3"], 2, "var", varset([
  function () {
    return mcq("On trouve des fossiles de coquillages marins dans une roche sédimentaire située à 500 m d’altitude, loin de la mer. Quel raisonnement relie correctement cette observation aux autres connaissances?", "La roche s’est formée sous la mer (les coquillages), puis les mouvements de la croûte l’ont soulevée jusqu’à son altitude actuelle au fil du temps", ["Les coquillages ont été transportés là par des oiseaux marins, puis enfouis et transformés en fossiles dans la roche des montagnes", "La mer atteignait autrefois 500 m de plus qu’aujourd’hui partout sur la Terre, puis son niveau a baissé uniformément partout", "Les coquillages marins vivaient autrefois en montagne, avant que leurs descendants ne descendent vivre dans les océans actuels"], "Deux observations se relient : des fossiles marins (une mer ancienne sur place) et une altitude élevée (un soulèvement ultérieur). La tectonique des plaques fournit le lien entre les deux.", {});
  }
]), ["Deux faits, un lien : mer ancienne, puis soulèvement.", "Le raisonnement gagnant respecte les deux observations à la fois."]);
E("s7f-u4-cr-big-picture", 4, ["SC7.11.3"], 3, "var", varset([
  function () {
    return textq("Un élève affirme : « Cette montagne est faite de roche qui contient des fossiles marins, donc les montagnes se forment au fond des océans. » Évalue cette explication : dis ce qu’elle a de juste, ce qu’elle oublie, et comment une explication complète relie les observations. (3 points)", ["le juste : la roche s’est bien formée dans un milieu marin, comme le prouvent les fossiles", "l’oubli : la roche a été soulevée après sa formation; la montagne actuelle n’est pas au fond de l’océan", "l’explication complète relie formation marine, compression et soulèvement par les plaques, puis érosion qui expose les fossiles"], "<b>Réponse modèle :</b> Ce que l’explication a de juste : la roche s’est formée dans la mer, car elle contient des fossiles d’organismes marins déposés en sédiments. Ce qu’elle oublie : le soulèvement. La montagne ne s’est pas formée au fond de l’océan; la roche marine a d’abord été durcie, puis comprimée et soulevée par la rencontre des plaques jusqu’à son altitude actuelle. L’explication complète relie donc trois observations : les fossiles (une mer ancienne), la roche en couches (des sédiments durcis) et l’altitude (un soulèvement tectonique), avant que l’érosion n’expose les fossiles en surface.<br><br><b>Points d’attribution :</b> 1 point pour la partie juste, appuyée sur les fossiles. 1 point pour l’oubli identifié (le soulèvement). 1 point pour l’explication complète qui relie les observations.", {});
  }
]), ["Une explication se juge en deux temps : ce qu’elle explique, ce qu’elle oublie.", "Le chaînon manquant est un mouvement vertical de la croûte."]);

/* ---------- SC7.11.4 L'evolution de notre comprehension des forces terrestres ---------- */
E("s7f-u4-change-timeline", 4, ["SC7.11.4"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé décrit correctement l’évolution de notre compréhension des forces qui ont façonné la Terre?", "Elle a changé graduellement à mesure que de nouvelles données s’accumulaient, des explications par catastrophes soudaines vers des processus lents et des plaques en mouvement", ["Elle est restée exactement la même depuis les premières explications, car les données nouvelles n’ont jamais contredit les anciennes idées reçues", "Elle a changé d’un seul coup en une année, quand un seul scientifique a prouvé toutes ses idées sans l’aide d’aucune donnée nouvelle accumulée", "Elle a reculé avec le temps, car les explications anciennes par catastrophes expliquaient mieux les montagnes que la tectonique des plaques actuelle"], "La compréhension géologique a avancé par accumulation : observations des fossiles, des fonds océaniques et des séismes ont graduellement remplacé les anciennes explications.", {});
  }
]), ["Le changement scientifique suit l’accumulation des données.", "Ni figée ni instantanée : graduelle et fondée sur des preuves."]);
E("s7f-u4-change-why", 4, ["SC7.11.4"], 2, "var", varset([
  function () {
    return mcq("Pourquoi l’exploration du fond des océans, au milieu du vingtième siècle, a-t-elle autant changé notre compréhension des forces terrestres?", "Parce qu’elle a révélé un système mondial de dorsales et une croûte océanique jeune et en expansion, que les anciennes explications ne prévoyaient pas du tout", ["Parce qu’elle a révélé que le fond des océans est immobile et très ancien partout, ce qui a confirmé toutes les anciennes explications géologiques", "Parce qu’elle a permis de photographier le noyau de la Terre pour la première fois, ce qui a réglé toutes les questions sur les forces terrestres", "Parce qu’elle a montré que les continents flottent sur l’eau des océans, ce qui a remplacé toutes les explications fondées sur les roches solides"], "Les dorsales, l’âge jeune des fonds océaniques et les bandes magnétiques formaient un faisceau de données nouvelles incompatibles avec une croûte immobile : la compréhension a dû changer.", {});
  }
]), ["Une donnée qui change tout est une donnée que l’ancienne théorie ne peut pas absorber.", "Le fond des océans était le continent inconnu de la géologie."]);
E("s7f-u4-cr-change-explain", 4, ["SC7.11.4"], 3, "var", varset([
  function () {
    return textq("Choisis UNE force qui a façonné la Terre (les séismes, les volcans ou la formation des montagnes) et explique comment notre compréhension de cette force a évolué à mesure que de nouvelles données étaient recueillies. Ta réponse doit nommer l’ancienne compréhension, une donnée nouvelle et la compréhension actuelle. (3 points)", ["une ancienne compréhension nommée (par exemple les montagnes comme rides d’une Terre qui se contracte en refroidissant)", "une donnée nouvelle (par exemple la distribution des séismes et des volcans en bandes, ou les mesures du fond des océans)", "la compréhension actuelle (les forces liées aux mouvements des plaques)"], "<b>Réponse modèle :</b> Exemple, la formation des montagnes. Ancienne compréhension : on expliquait les montagnes par la contraction d’une Terre qui se refroidit, comme la peau ridée d’une pomme qui sèche. Donnée nouvelle : les séismes et les volcans se distribuent en bandes étroites, les fonds océaniques sont jeunes et en expansion, et les chaînes de montagnes se trouvent le long de ces mêmes bandes. Compréhension actuelle : les montagnes naissent de la convergence des plaques, qui plissent, faillent et épaississent la croûte pendant des millions d’années. Chaque donnée nouvelle a rendu l’ancienne explication moins tenable et la nouvelle plus complète.<br><br><b>Points d’attribution :</b> 1 point pour l’ancienne compréhension. 1 point pour une donnée nouvelle pertinente. 1 point pour la compréhension actuelle et son lien avec la donnée.", {});
  }
]), ["Trois temps : avant, la donnée, maintenant.", "Choisis une seule force et tiens-toi à elle."]);

/* ---------- SC7.11.5 La derive des continents ---------- */
E("s7f-u4-drift-identify", 4, ["SC7.11.5"], 1, "var", varset([
  function () {
    return mcq("Quelle idée la théorie de la dérive des continents proposait-elle?", "Que les continents étaient autrefois réunis en un supercontinent et qu’ils se sont lentement séparés pour atteindre leurs positions actuelles sur la Terre", ["Que les continents ont toujours occupé leurs positions actuelles et que seuls les océans ont changé de forme au cours de l’histoire de la Terre", "Que les continents flottent sur les océans et dérivent au gré des courants marins de surface, en quelques années seulement à chaque fois", "Que les océans étaient autrefois réunis en un superocéan et que les continents sont apparus récemment par l’activité des volcans sous-marins"], "La dérive des continents (Wegener) proposait un supercontinent ancien, la Pangée, lentement disloqué en continents qui se sont écartés les uns des autres.", {});
  }
]), ["L’idée centrale : des continents autrefois joints, aujourd’hui séparés.", "La dérive concerne les continents, pas les courants de surface."]);
E("s7f-u4-drift-evidence", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("Lequel de ces indices appuyait la dérive des continents, mais n’expliquait pas comment les continents pouvaient bouger?", "La correspondance des formes des côtes de l’Amérique du Sud et de l’Afrique, qui s’emboîtent comme les pièces d’un casse-tête presque parfait", ["La découverte des dorsales océaniques et de l’expansion du fond des océans, qui a fourni le mécanisme du mouvement des plaques entières", "La mesure directe par satellite du déplacement actuel des continents, qui confirme le mouvement à quelques centimètres par année mesurée", "L’enregistrement des bandes magnétiques du fond des océans, qui date l’écartement des plaques depuis les dorsales océaniques du monde"], "Les côtes qui s’emboîtent suggèrent un ancien assemblage, mais ne disent rien du moteur du déplacement. Les autres indices, découverts plus tard, ont fourni mécanisme et mesure.", {});
  }
]), ["Indice ancien contre preuve tardive : trie par époque et par fonction.", "Suggérer un assemblage n’est pas expliquer un mouvement."]);
E("s7f-u4-drift-flaw", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("Pourquoi la théorie de la dérive des continents a-t-elle été rejetée par de nombreux scientifiques de son époque?", "Parce qu’elle ne proposait aucun mécanisme plausible capable de déplacer d’énormes masses continentales à travers le fond des océans solides", ["Parce qu’elle contredisait les formes des côtes, qui ne s’emboîtent d’aucune façon entre l’Amérique du Sud et l’Afrique du tout", "Parce qu’elle reposait sur des fossiles inventés, que les scientifiques ont découverts faux dès les premières vérifications menées", "Parce qu’elle affirmait que les continents n’avaient jamais bougé, ce que les mesures de l’époque réfutèrent immédiatement après"], "Les indices de Wegener étaient réels, mais sans moteur crédible, la communauté scientifique a refusé l’idée : il a fallu les données des fonds océaniques pour la relancer sous forme de tectonique des plaques.", {});
  }
]), ["Un rejet scientifique peut viser le mécanisme, pas les observations.", "Les indices étaient bons; le moteur manquait."]);

/* ---------- SC7.11.6 La tectonique des plaques, changement de vision du monde ---------- */
E("s7f-u4-shift-identify", 4, ["SC7.11.6"], 1, "var", varset([
  function () {
    return mcq("Pourquoi la tectonique des plaques est-elle décrite comme un changement radical de notre vision du monde?", "Parce qu’elle a remplacé l’image d’une Terre fixe et immuable par celle d’une surface entière en mouvement permanent, qui recycle sa croûte au fil du temps", ["Parce qu’elle a remplacé l’image d’une Terre ronde par celle d’une Terre légèrement aplatie aux pôles, mesurée par les satellites modernes", "Parce qu’elle a prouvé que la Terre est beaucoup plus jeune qu’on le croyait, ce qui a raccourci toute l’échelle du temps géologique connue", "Parce qu’elle a remplacé l’étude des roches par l’étude des étoiles comme fondement principal de la géologie moderne des continents"], "Passer d’une croûte fixe à des plaques mobiles qui créent et détruisent la croûte change l’interprétation de presque tous les phénomènes géologiques : c’est un changement de vision du monde.", {});
  }
]), ["Un changement radical touche les fondements, pas un détail.", "Fixe contre mobile : tout le reste en découle."]);
E("s7f-u4-shift-contrast", 4, ["SC7.11.6"], 2, "var", varset([
  function () {
    return mcq("Quel contraste résume le mieux le passage des anciennes explications à la tectonique des plaques?", "Avant : une croûte fixe où chaque phénomène s’explique séparément. Après : des plaques mobiles qui relient séismes, volcans, montagnes et océans en un seul système", ["Avant : des plaques mobiles sans preuves. Après : une croûte fixe confirmée par les mesures modernes du fond des océans et des satellites récents", "Avant : une Terre très jeune expliquée par des catastrophes. Après : une Terre du même âge expliquée par les mêmes catastrophes mieux décrites", "Avant : une géologie sans fossiles. Après : une géologie qui utilise les fossiles pour la première fois de son histoire scientifique entière"], "La force de la nouvelle théorie est son unité : un seul mécanisme, le mouvement des plaques, relie des phénomènes autrefois expliqués séparément.", {});
  }
]), ["Le contraste porte sur l’unité de l’explication autant que sur le mouvement.", "Un système contre des cas séparés."]);

/* ---------- SC7.11.7 Theories anciennes des volcans, seismes et montagnes ---------- */
E("s7f-u4-past-explanations", 4, ["SC7.11.7"], 1, "var", varset([
  function () {
    return mcq("Autrefois, comment expliquait-on souvent les éruptions volcaniques avant la tectonique des plaques?", "Par des feux souterrains et des matières qui brûlaient sous la croûte, sans lien avec des plaques en mouvement les unes par rapport aux autres", ["Par le plongement des plaques océaniques, qui fondent en profondeur et alimentent les volcans des arcs insulaires du Pacifique entier", "Par les courants de convection du manteau, mesurés par les satellites qui suivent le mouvement actuel des plaques de la croûte", "Par l’expansion du fond des océans, qui pousse le magma vers les volcans des dorsales et des limites de plaques convergentes"], "Les anciennes explications invoquaient des feux et des combustions souterraines : elles décrivaient un phénomène local, sans le système global des plaques découvert plus tard.", {});
  }
]), ["Les théories anciennes étaient locales; la nouvelle est globale.", "Élimine les choix qui utilisent le vocabulaire des plaques."]);
E("s7f-u4-past-purpose", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return mcq("Pourquoi est-il utile d’étudier les théories anciennes sur les volcans et les séismes, même si elles sont fausses?", "Parce qu’elles montrent comment les explications dépendent des données disponibles et comment de meilleures données produisent de meilleures théories en sciences", ["Parce qu’elles pourraient redevenir vraies un jour, et qu’il faut donc les mémoriser au cas où la tectonique des plaques serait abandonnée bientôt", "Parce qu’elles prouvent que les scientifiques anciens étaient moins intelligents que les scientifiques actuels qui étudient les mêmes phénomènes", "Parce qu’elles contiennent les mesures les plus précises des séismes anciens, supérieures à celles des sismographes modernes du monde entier"], "Les anciennes théories étaient des réponses raisonnables aux données de leur temps. Les étudier montre la démarche scientifique elle-même : les explications changent quand les données s’améliorent.", {});
  }
]), ["L’utilité est méthodologique : comprendre comment la science avance.", "Fausse ne veut pas dire stupide : les données manquaient."]);
E("s7f-u4-cr-past-theory", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return textq("Donne un exemple d’une théorie utilisée autrefois pour expliquer l’activité volcanique, les séismes OU la formation des montagnes, et explique pourquoi cette théorie a été remplacée. (2 points)", ["une ancienne théorie nommée (par exemple les feux souterrains pour les volcans, ou la contraction d’une Terre qui refroidit pour les montagnes)", "la raison du remplacement (des données nouvelles qu’elle ne pouvait pas expliquer, comme la distribution en bandes ou l’expansion des fonds océaniques)"], "<b>Réponse modèle :</b> Exemple : les montagnes expliquées par la contraction d’une Terre qui se refroidit et se ride comme la peau d’une pomme qui sèche. Cette théorie a été remplacée parce que de nouvelles données ne s’y ajustaient pas : les montagnes se concentrent en bandes étroites plutôt que partout, les fonds océaniques sont jeunes et en expansion, et les séismes dessinent les limites de plaques. La tectonique des plaques explique ensemble toutes ces régularités, ce que la contraction ne pouvait pas faire.<br><br><b>Points d’attribution :</b> 1 point pour une ancienne théorie correctement décrite. 1 point pour la raison de son remplacement, appuyée sur des données nouvelles.", {});
  }
]), ["Une théorie tombe quand des données qu’elle ne peut pas expliquer s’accumulent.", "Nommer la donnée décisive vaut mieux qu’un jugement général."]);

/* ---------- SC7.12.1 Utiliser une cle de classification des mineraux ---------- */
E("s7f-u4-key-mineral", 4, ["SC7.12.1"], 1, "var", varset([
  function () {
    var q = mcq("Avec la clé de classification des minéraux, un spécimen attiré par un aimant est identifié dès la première étape. De quel minéral s’agit-il?", "La magnétite, le seul minéral de la clé qui soit attiré par un aimant dès la première étape du classement", ["La pyrite, un minéral jaune laiton que la clé identifie par sa couleur et son éclat métallique marqué", "La galène, un minéral lourd que la clé identifie par son clivage en cubes et sa grande densité relative", "Le quartz, un minéral vitreux que la clé identifie par sa dureté de 7 et son absence de clivage net"], "La première étape de la clé sépare sur le magnétisme : un spécimen attiré par un aimant est la magnétite, sans autre test nécessaire.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : attire un aimant, couleur gris fonce, eclat metallique']); return q;
  },
  function () {
    var q = mcq("Un spécimen n’est pas attiré par un aimant et laisse une trace rouge-brun. Selon la clé, de quel minéral s’agit-il?", "L’hématite, identifiée à l’étape 2 par sa trace rouge-brun caractéristique sur la porcelaine non émaillée", ["La magnétite, identifiée à l’étape 1 par son attraction pour les aimants ordinaires utilisés en classe", "La pyrite, identifiée à l’étape 9 par sa couleur jaune laiton et son éclat métallique sur les faces fraîches", "La calcite, identifiée à l’étape 8 par son effervescence au contact d’un acide faible versé en gouttes"], "Après l’étape 1 (non magnétique), l’étape 2 trie sur la trace : une trace rouge-brun désigne l’hématite.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : non attire par un aimant, trace rouge-brun, eclat terreux']); return q;
  }
]), ["Travaille la clé dans l’ordre; chaque étape élimine des possibilités.", "La clé décide par les caractères, jamais par la ressemblance générale."]);
E("s7f-u4-key-mineral-2", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    var q = mcq("Un spécimen non magnétique, à trace pâle, se sépare en feuilles minces et souples. Selon la clé, de quel minéral s’agit-il?", "Le mica, identifié par son clivage parfait en feuilles minces et souples à l’étape prévue de la clé utilisée", ["Le talc, identifié par son toucher savonneux et sa très faible dureté à l’étape prévue de la clé utilisée", "Le gypse, identifié par son éclat soyeux et sa faible dureté à l’étape prévue de la clé utilisée en classe", "Le feldspath, identifié par son clivage en deux directions et sa dureté de 6 à l’étape prévue de la clé"], "Des feuilles minces et souples qui se séparent facilement décrivent le clivage du mica : la clé y mène à l’étape des minéraux en feuilles.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : non magnetique, trace pale, se separe en feuilles souples']); return q;
  }
]), ["Le caractère décisif est la séparation en feuilles.", "Suis la clé : non magnétique, trace pâle, puis les feuilles."]);
E("s7f-u4-key-choose", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    return mcq("Pour appliquer une clé de classification à un problème pratique (identifier le minéral qui raye les tuiles d’un atelier), quelle démarche est la plus rigoureuse?", "Observer les caractères du minéral inconnu dans l’ordre de la clé et suivre chaque étape jusqu’au nom qu’elle donne pour ce spécimen", ["Comparer le minéral inconnu à des photographies et choisir le nom de celui qui lui ressemble le plus au premier regard", "Deviner le nom d’après la couleur seule, puis chercher dans la clé les étapes qui confirment ce premier choix personnel", "Utiliser seulement la dernière étape de la clé, car les noms des minéraux y sont tous énumérés en ordre alphabétique"], "Une clé se travaille du début à la fin, caractère par caractère : contourner les étapes ou partir de la couleur seule produit des identifications fragiles.", {});
  }
]), ["La rigueur d’une clé tient à l’ordre de ses étapes.", "La couleur seule est le caractère le moins fiable."]);

/* ---------- SC7.12.2 Choisir methodes et outils pour identifier les mineraux ---------- */
E("s7f-u4-tool-ladder", 4, ["SC7.12.2"], 1, "var", varset([
  function () {
    return mcq("Pour tester la dureté d’un minéral inconnu, quelle suite d’outils essaie-t-on dans l’ordre croissant habituel?", "L’ongle, puis la pièce de cuivre, puis la lime ou la lame d’acier, puis la plaque de verre, du plus tendre au plus dur des outils", ["La plaque de verre, puis la lime d’acier, puis la pièce de cuivre, puis l’ongle, du plus tendre au plus dur des outils", "L’aimant, puis la porcelaine, puis l’acide faible, puis la loupe, du plus tendre au plus dur des outils de la trousse", "La balance, puis le cylindre gradué, puis le bécher, puis l’entonnoir, du plus tendre au plus dur des outils de la trousse"], "Les tests de dureté montent en échelle : ongle (environ 2,5), cuivre (environ 3), acier (environ 5,5) et verre (environ 5,5 à 6), ce qui encadre la dureté du minéral.", {});
  }
]), ["Chaque outil a sa dureté approximative; l’ordre va du tendre au dur.", "Aimant, porcelaine et acide testent d’autres propriétés."]);
E("s7f-u4-method-match", 4, ["SC7.12.2"], 1, "var", varset([
  function () {
    return mcq("Pour recueillir des données afin d’identifier un minéral, quelle méthode convient pour vérifier s’il réagit à l’acide?", "Déposer une goutte d’acide faible sur une surface fraîche du minéral et observer s’il pétille sous l’effet de l’acide versé", ["Déposer une goutte d’eau sur la surface du minéral et observer si sa couleur change sous l’effet de l’eau versée", "Chauffer le minéral au-dessus d’une flamme et observer s’il change de couleur sous l’effet de la chaleur appliquée", "Plonger le minéral dans l’eau pendant une journée et observer s’il se dissout sous l’effet de l’immersion prolongée"], "Le test à l’acide se fait avec une goutte d’acide faible sur une surface fraîche : l’effervescence (les bulles) signale un carbonate comme la calcite.", {});
  }
]), ["Chaque propriété a son outil et son geste précis.", "L’effervescence est la réponse cherchée pour les carbonates."]);
E("s7f-u4-method-plan", 4, ["SC7.12.2"], 2, "var", varset([
  function () {
    return mcq("Une équipe doit identifier trois minéraux inconnus et organiser ses données. Quel plan de collecte est le plus complet et le plus ordonné?", "Préparer un tableau avec une ligne par minéral et une colonne par propriété testée (trace, dureté, clivage, réaction à l’acide, magnétisme), puis effectuer chaque test pour chaque minéral", ["Effectuer les tests au hasard selon l’humeur du moment et consigner les résultats marquants dans un paragraphe rédigé à la fin de la période de laboratoire prévue", "Tester seulement la couleur des trois minéraux et classer les résultats par ordre de préférence de l’équipe pour la présentation finale devant la classe entière", "Confier chaque minéral à un membre différent qui choisira ses propres tests, puis rassembler les noms devinés par chacun à la fin de la période de laboratoire"], "Un plan complet croise tous les spécimens et toutes les propriétés dans un tableau préparé : les données sont alors comparables et la clé peut être appliquée à chaque ligne.", {});
  }
]), ["Complet égale chaque test pour chaque minéral; ordonné égale un tableau préparé.", "Des tests différents selon les membres rendent les données incomparables."]);

/* ---------- SC7.12.3 Identifier les mineraux courants avec une cle ---------- */
E("s7f-u4-mineral-id", 4, ["SC7.12.3"], 1, "var", varset([
  function () {
    var q = mcq("Un minéral vitreux, sans clivage, qui se brise en cassure en forme de coquille et que l’acier ne raye pas (dureté 7). Selon la clé, de quel minéral s’agit-il?", "Le quartz, dont la dureté de 7, l’éclat vitreux et l’absence de clivage correspondent à la fin de la clé des minéraux courants", ["Le feldspath, dont la dureté de 6, l’éclat nacré et le clivage en deux directions correspondent à la fin de la clé", "La calcite, dont la faible dureté et l’effervescence dans l’acide correspondent à une étape du milieu de la clé", "Le gypse, dont la faible dureté et l’éclat soyeux correspondent à une étape du début de la clé des minéraux"], "Dureté 7, éclat vitreux, pas de clivage et cassure conchoïdale (en coquille) : la clé mène au quartz.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : eclat vitreux, aucun clivage, cassure en coquille, durete 7']); return q;
  },
  function () {
    var q = mcq("Un minéral pétille quand on y dépose une goutte d’acide faible et un ongle ne le raye pas, mais une pièce de cuivre le raye. Selon la clé, de quel minéral s’agit-il?", "La calcite, qui réagit à l’acide faible par une effervescence visible à l’étape correspondante de la clé des minéraux", ["Le quartz, qui réagit à l’acide faible par une effervescence visible à l’étape correspondante de la clé des minéraux", "La magnétite, qui réagit à l’acide faible par une effervescence visible à l’étape correspondante de la clé des minéraux", "La pyrite, qui réagit à l’acide faible par une effervescence visible à l’étape correspondante de la clé des minéraux"], "L’effervescence dans l’acide faible est le caractère décisif de la calcite dans la clé.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : petille dans un acide faible, durete environ 3']); return q;
  }
]), ["Un caractère décisif peut suffire quand la clé le place en évidence.", "L’acide tranche pour les carbonates."]);
E("s7f-u4-mineral-id-2", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    var q = mcq("Un minéral blanc nacré, très tendre, au toucher savonneux, qu’un ongle raye facilement et qui ne marque pas le papier. Selon la clé, de quel minéral s’agit-il?", "Le talc, le minéral le plus tendre de la clé, au toucher savonneux ou graisseux caractéristique des spécimens blancs nacrés", ["Le graphite, un minéral très tendre qui marque le papier facilement et laisse les doigts noirs au toucher des spécimens", "Le gypse, un minéral tendre à l’éclat soyeux ou nacré, qui ne présente pas le toucher savonneux du spécimen décrit ici", "Le mica, un minéral qui se sépare en feuilles souples et dont le toucher n’est pas décrit comme savonneux dans la clé"], "Toucher savonneux, dureté minimale (1) et couleur blanc nacré : la clé mène au talc, après avoir écarté le graphite, qui marquerait le papier.", {}); q.figure = s7fMineralKeyFigure(['Specimen 1 : blanc nacre, tres tendre, toucher savonneux, ne marque pas le papier']); return q;
  }
]), ["Deux caractères éliminent les voisins : savonneux, et ne marque pas le papier.", "La dureté 1 est le plancher de l’échelle de Mohs."]);
E("s7f-u4-mineral-pair", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    return mcq("La pyrite et l’or se ressemblent par leur couleur jaune métallique. Quel test les distingue le plus sûrement en classe?", "La trace et la dureté : la pyrite laisse une trace noir verdâtre et elle est dure et cassante, tandis que l’or laisse une trace jaune et reste malléable", ["La couleur sous une autre lampe : la pyrite devient argentée sous la lumière fluorescente, tandis que l’or devient rougeâtre sous la même lumière", "Le magnétisme : la pyrite est attirée par un aimant ordinaire, tandis que l’or est repoussé par le même aimant ordinaire de la classe", "La flottation : la pyrite flotte sur l’eau à cause de sa faible densité, tandis que l’or coule immédiatement dans l’eau du bécher"], "La ressemblance visuelle trompe (« l’or des fous ») : la trace sombre et la dureté cassante de la pyrite la distinguent de l’or, mou et à trace jaune.", {});
  }
]), ["Quand la couleur confond, passe à la trace et à la dureté.", "Cassante contre malléable : le comportement tranche."]);
E("s7f-u4-cr-mineral-id", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    return textq("Un spécimen inconnu présente les caractères suivants : non attiré par un aimant; trace blanche; clivage en deux directions; éclat nacré à vitreux; l’acier le raye difficilement et sa dureté est d’environ 6. Travaille la clé à voix haute, étape par étape, et conclus par le nom du minéral. (2 points)", ["le parcours écarte la magnétite (non magnétique), l’hématite (trace non rouge-brun), la galène (pas de cubes), le mica (pas de feuilles), les minéraux tendres (dureté 6) et la calcite (pas d’effervescence décrite), la pyrite (pas jaune laiton)", "la conclusion : le feldspath, dureté 6, clivage en deux directions, éclat nacré à vitreux"], "<b>Réponse modèle :</b> Étape 1 : non attiré par un aimant, donc pas la magnétite; on continue. Étape 2 : la trace n’est pas rouge-brun, donc pas l’hématite. Étapes 3 et 4 : pas de cassure en cubes (pas la galène) et pas de feuilles souples (pas le mica). Étape 5 : un ongle ne le raye pas; sa dureté est d’environ 6, donc on passe les minéraux tendres (graphite, talc, gypse). Étape 8 : aucune effervescence n’est décrite et la dureté dépasse celle de la calcite. Étapes 9 et 10 : il n’est pas jaune laiton (pas la pyrite); il reste le minéral à clivage en deux directions, éclat nacré à vitreux et dureté 6 : le feldspath.<br><br><b>Points d’attribution :</b> 1 point pour un parcours d’étapes cohérent qui écarte les voisins. 1 point pour la conclusion correcte : le feldspath.", {});
  }
]), ["Énonce chaque étape et le minéral qu’elle écarte.", "Le nom final doit être le seul que les caractères n’ont pas écarté."]);

/* ---------- SC7.12.4 Questions issues de l'etude du cycle des roches ---------- */
E("s7f-u4-question-identify", 4, ["SC7.12.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces questions peut naître directement de l’étude du cycle des roches et mener à une recherche?", "« Une roche sédimentaire peut-elle devenir ignée sans passer par l’état de magma, selon le cycle des roches étudié? »", ["« Quelle est la plus belle roche du cycle des roches parmi celles que la classe a examinées cette semaine? »", "« Combien de roches différentes un collectionneur peut-il ranger dans une boîte de rangement ordinaire? »", "« Pourquoi le cycle des roches porte-t-il le mot cycle dans son nom, selon le manuel de la classe? »"], "La question gagnante interroge un trajet du cycle lui-même et se répond par l’étude du schéma et des processus : c’est une question de recherche née du cycle des roches.", {});
  }
]), ["Une question de recherche interroge un processus, pas une préférence.", "Le cycle lui-même fournit les trajets à questionner."]);
E("s7f-u4-question-best", 4, ["SC7.12.4"], 3, "var", varset([
  function () {
    return mcq("Une équipe veut transformer son étonnement devant le schéma du cycle des roches en question de recherche vérifiable. Laquelle y parvient le mieux?", "« La roche métamorphique formée à partir d’un grès contient-elle encore des traces visibles des grains de sable d’origine, et comment les observer? »", ["« Pourquoi le cycle des roches est-il dessiné en cercle plutôt qu’en ligne droite dans les manuels de sciences de la Terre? »", "« Les roches métamorphiques sont-elles plus intéressantes que les roches sédimentaires pour les collectionneurs de la région? »", "« Combien de temps faudrait-il à une roche pour accomplir un tour complet du cycle des roches dans la nature réelle? »"], "La question gagnante est précise et vérifiable par l’observation d’échantillons (les grains hérités dans la roche transformée). La durée d’un tour complet, elle, ne se mesure pas à l’échelle d’une recherche scolaire.", {});
  }
]), ["Vérifiable à l’école signifie observable sur des échantillons ou des données accessibles.", "Une question immense n’est pas une question de recherche scolaire."]);
E("s7f-u4-cycle-path", 4, ["SC7.12.4"], 2, "var", varset([
  function () {
    var q = mcq("L’étude du cycle soulève cette question : « Que doit subir une roche ignée pour devenir sédimentaire? » Quelle réponse le schéma appuie-t-il?", "Elle doit être altérée et érodée en sédiments, qui seront ensuite compactés et cimentés en roche sédimentaire au fil du temps géologique", ["Elle doit fondre en magma, puis refroidir lentement sous la surface pour devenir une roche sédimentaire aux couches bien visibles", "Elle doit être chauffée et pressée sans fondre, ce qui la transforme directement en roche sédimentaire en couches minérales", "Elle doit être enfouie et attendre, sans aucun changement, jusqu’à ce que son nom devienne sédimentaire dans les classifications"], "Le schéma ne montre aucune flèche directe de l’ignée à la sédimentaire : le trajet passe par les sédiments (altération et érosion), puis par la compaction et la cimentation.", {}); q.figure = s7fRockCycleSVG(); return q;
  }
]), ["Suis les flèches : le trajet passe obligatoirement par les sédiments.", "Une question née du cycle se répond par le cycle."]);

/* ---------- SC7.12.5 Procedures controlant les variables ---------- */
E("s7f-u4-fizz-variables", 4, ["SC7.12.5"], 1, "var", varset([
  function () {
    return mcq("Une équipe compare la vitesse d’effervescence de trois minéraux dans l’acide. Pour que la comparaison soit juste, que doit-elle garder constant?", "La quantité et la concentration de l’acide, la grosseur des échantillons et la durée d’observation de chaque essai effectué en classe", ["La vitesse d’effervescence de chaque minéral, la quantité d’acide et la grosseur des échantillons utilisés pendant les essais", "La quantité d’acide, la concentration de l’acide et la vitesse d’effervescence attendue de chaque minéral testé en classe", "La grosseur des échantillons, la durée d’observation et le nom des minéraux choisis par l’équipe pour ses trois essais"], "Un test juste garde constants l’acide (quantité et concentration), la taille des échantillons et la durée : seule la sorte de minéral varie, et l’effervescence est le résultat mesuré.", {});
  }
]), ["Ce qui varie : le minéral. Ce qui se mesure : l’effervescence. Tout le reste se fige.", "Le résultat ne peut pas être une constante."]);
E("s7f-u4-fair-test-design", 4, ["SC7.12.5"], 2, "var", varset([
  function () {
    return mcq("Pour répondre à la question pratique « Quel échantillon de sol laisse passer l’eau le plus vite? », quelle organisation contrôle correctement les variables?", "Des volumes égaux de chaque sol dans des entonnoirs identiques, le même volume d’eau versé de la même façon, et le temps de drainage mesuré pour chacun des échantillons testés", ["Des volumes différents de chaque sol dans des entonnoirs variés, des volumes d’eau choisis au hasard, et le temps estimé de mémoire à la fin de la journée de laboratoire", "Un seul échantillon de sol testé trois fois, comparé au souvenir d’autres sols testés le mois précédent dans un autre local de l’école par une autre équipe", "Des volumes égaux de chaque sol, mais l’eau chaude pour l’un et l’eau froide pour l’autre, avec des entonnoirs de tailles différentes pour chacun des deux sols"], "Même volume de sol, même entonnoir, même eau, même geste : seul le sol change, donc la différence de drainage lui est attribuable.", {});
  }
]), ["La question pratique exige la même rigueur qu’une expérience de laboratoire.", "Chaque « même » nommé est une variable contrôlée."]);
E("s7f-u4-cr-design-investigation", 4, ["SC7.12.5"], 3, "var", varset([
  function () {
    return textq("Une question pratique se pose : « Les éclats de calcaire se dissolvent-ils plus vite dans une eau de pluie acide quand ils sont petits ou quand ils sont gros? » Conçois une recherche complète pour y répondre : (a) l’hypothèse, (b) la variable indépendante, (c) la variable dépendante et son mode de mesure, (d) deux variables constantes et (e) la règle de décision. (4 points)", ["une hypothèse vérifiable (par exemple les petits éclats se dissolvent plus vite, car ils offrent plus de surface à l’acide)", "variable indépendante : la grosseur des éclats de calcaire", "variable dépendante : la perte de masse des éclats après un temps fixe, mesurée à la balance", "deux constantes (même masse de départ, même eau acide, même volume, même durée, même température)", "une règle de décision (comparer les pertes de masse moyennes des deux groupes)"], "<b>Réponse modèle :</b> (a) Hypothèse : les petits éclats se dissolvent plus vite que les gros, car, à masse égale, ils présentent une plus grande surface totale au contact de l’acide. (b) Variable indépendante : la grosseur des éclats (petits contre gros). (c) Variable dépendante : la perte de masse après 30 minutes dans l’eau acide, mesurée à la balance au dixième de gramme, les éclats étant séchés de la même façon avant chaque pesée. (d) Constantes : la même masse totale de calcaire par bécher, le même volume et la même concentration d’eau acide, la même durée et la même température. (e) Décision : je compare la perte de masse moyenne des deux groupes; si les petits éclats perdent nettement plus de masse, les données appuient l’hypothèse.<br><br><b>Points d’attribution :</b> 1 point pour une hypothèse vérifiable avec sa raison. 1 point pour la variable indépendante et la variable dépendante avec son mode de mesure. 1 point pour deux constantes pertinentes. 1 point pour une règle de décision fondée sur la comparaison.", {});
  }
]), ["Cinq morceaux : hypothèse, variable variée, variable mesurée, constantes, décision.", "À masse égale, la surface totale est le cœur de l’hypothèse."]);

/* ---------- SC7.12.6 Instruments de collecte de donnees ---------- */
E("s7f-u4-instrument-read", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("Pour mesurer la masse d’un échantillon de minéral au dixième de gramme près, quel instrument et quel geste donnent une donnée exacte?", "Une balance électronique remise à zéro avec le récipient vide dessus, puis l’échantillon posé doucement au centre du plateau de la balance", ["Une balance électronique utilisée sans remise à zéro, l’échantillon posé sur le bord du plateau pendant que la balance bouge encore", "Un cylindre gradué rempli d’eau, en lisant la hausse du niveau depuis le dessus du cylindre tenu à bout de bras par un coéquipier", "Une règle graduée, en comparant la longueur de l’échantillon à celle d’échantillons de masse connue rangés dans la même boîte"], "La tare (remise à zéro avec le récipient) et un plateau stable donnent la masse nette exacte de l’échantillon.", {});
  }
]), ["Exactitude égale bon instrument plus bon geste plus consignation.", "La tare élimine la masse du récipient de la lecture."]);
E("s7f-u4-instrument-choose", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("Pour recueillir la donnée « densité relative » d’un minéral en le pesant dans l’air puis dans l’eau, quel instrument est indispensable aux deux pesées?", "Une balance précise, utilisée de façon identique pour la pesée dans l’air et pour la pesée dans l’eau du même échantillon de minéral", ["Un thermomètre précis, utilisé de façon identique pour la pesée dans l’air et pour la pesée dans l’eau du même échantillon", "Un aimant puissant, utilisé de façon identique pour la pesée dans l’air et pour la pesée dans l’eau du même échantillon de minéral", "Une loupe éclairante, utilisée de façon identique pour la pesée dans l’air et pour la pesée dans l’eau du même échantillon"], "La densité relative compare deux masses du même échantillon (dans l’air, puis suspendu dans l’eau) : la balance est l’instrument des deux mesures.", {});
  }
]), ["La donnée demandée est un rapport de masses : l’instrument suit.", "Deux pesées, un seul instrument, un même échantillon."]);

/* ---------- SC7.12.7 Compiler et afficher les donnees en tableaux ---------- */
E("s7f-u4-table-build", 4, ["SC7.12.7"], 1, "var", varset([
  function () {
    return mcq("Une équipe a mesuré la dureté, la trace et la masse de cinq minéraux. Quel affichage compile correctement ces données?", "Un tableau avec un titre, une ligne par minéral et une colonne par propriété mesurée, avec les unités quand elles s’appliquent aux données recueillies", ["Un tableau avec un titre, une ligne par membre de l’équipe et une colonne par propriété préférée, avec les unités quand elles s’appliquent aux données", "Un paragraphe par minéral qui raconte les mesures dans des phrases, sans colonnes pour comparer les propriétés entre les minéraux de l’ensemble", "Une liste des masses seulement, car la dureté et la trace ne peuvent pas figurer dans le même affichage que les données numériques recueillies"], "Compiler, c’est croiser les spécimens et les propriétés dans un tableau étiqueté : chaque minéral y a sa ligne et chaque propriété sa colonne.", {});
  }
]), ["Lignes égale spécimens; colonnes égale propriétés.", "Un tableau sert à comparer : il faut les deux dimensions."]);
E("s7f-u4-table-read", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return mcq("Dans un tableau de résultats, la colonne « Dureté (Mohs) » donne : quartz 7, calcite 3, talc 1, feldspath 6, gypse 2. Quel minéral du tableau raye tous les autres?", "Le quartz, dont la dureté de 7 est la plus élevée des cinq minéraux consignés dans le tableau des résultats de l’équipe", ["Le feldspath, dont la dureté de 6 est la plus élevée des cinq minéraux consignés dans le tableau des résultats de l’équipe", "La calcite, dont la dureté de 3 est la plus élevée des cinq minéraux consignés dans le tableau des résultats de l’équipe", "Le talc, dont la dureté de 1 est la plus élevée des cinq minéraux consignés dans le tableau des résultats de l’équipe"], "Un minéral raye ceux qui sont moins durs que lui : avec 7, le quartz dépasse le feldspath (6), la calcite (3), le gypse (2) et le talc (1).", {});
  }
]), ["Lire un tableau, c’est comparer une colonne entière.", "Le plus dur raye tous les moins durs."]);
E("s7f-u4-cr-table-display", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return textq("Voici des données brutes recueillies en désordre : magnétite, trace noire, dureté 6, attirée par l’aimant; talc, trace blanche, dureté 1, toucher savonneux; quartz, trace blanche, dureté 7, éclat vitreux. (a) Présente ces données dans un tableau organisé. (b) Dis quelle colonne du tableau permet de repérer immédiatement le minéral magnétique. (2 points)", ["un tableau avec titre, une ligne par minéral et des colonnes pour la trace, la dureté et le caractère spécial", "la colonne du caractère spécial (ou du magnétisme), où la mention « attirée par l’aimant » n’apparaît que pour la magnétite"], "<b>Réponse modèle :</b> (a) Tableau intitulé « Propriétés de trois minéraux » : colonnes Minéral, Trace, Dureté (Mohs), Caractère spécial. Lignes : Magnétite, noire, 6, attirée par l’aimant; Talc, blanche, 1, toucher savonneux; Quartz, blanche, 7, éclat vitreux. (b) La colonne « Caractère spécial » permet de repérer immédiatement la magnétite : c’est la seule ligne qui y mentionne l’attraction par l’aimant.<br><br><b>Points d’attribution :</b> 1 point pour un tableau organisé avec titre et en-têtes, toutes les données placées. 1 point pour la colonne correctement identifiée avec sa raison.", {});
  }
]), ["Le tableau d’abord : les données brutes deviennent des lignes et des colonnes.", "La bonne colonne est celle où le caractère cherché n’apparaît qu’une fois."]);

/* ---------- SC7.12.8 Regularites et tendances dans les donnees ---------- */
E("s7f-u4-pattern-drainage", 4, ["SC7.12.8"], 2, "var", varset([
  function () {
    var q = mcq("Les temps de drainage de 25 mL d’eau sont : gravier sableux 10 s, loam 45 s, argile 150 s. Quelle relation entre les variables ces données montrent-elles?", "Plus les particules du sol sont fines, plus le drainage est lent : la grosseur des particules et la vitesse de drainage varient en sens opposés", ["Plus les particules du sol sont fines, plus le drainage est rapide : la grosseur des particules et la vitesse de drainage varient dans le même sens", "La grosseur des particules n’a aucun lien avec le drainage : les trois temps sont trop rapprochés pour montrer une relation quelconque", "Le drainage dépend seulement de la couleur du sol : les sols pâles drainent vite et les sols foncés drainent lentement à tout coup"], "Les données ordonnent les sols de la texture grossière (rapide) à la texture fine (lente) : c’est une relation claire entre la grosseur des particules et la vitesse de drainage.", {}); q.figure = s7fDrainSVG([{name: 'Gravier sableux', secs: 10}, {name: 'Loam', secs: 45}, {name: 'Argile', secs: 150}]); return q;
  }
]), ["Ordonne les données, puis décris le sens de la variation.", "Une tendance régulière dans des données ordonnées est une relation."]);
E("s7f-u4-pattern-infer", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return mcq("Sur dix sites d’une région, les sols sableux sont toujours secs deux jours après la pluie, les loams sont humides et les argiles sont encore détrempées. Quelle inférence ces régularités autorisent-elles pour un nouveau site argileux de la même région?", "On peut inférer qu’il restera détrempé plusieurs jours après la pluie, car la relation entre texture fine et drainage lent s’est répétée sur tous les sites observés", ["On peut inférer qu’il séchera en quelques heures, car chaque nouveau site se comporte toujours à l’inverse des sites déjà observés dans la région", "On ne peut rien inférer du tout, car une régularité observée sur dix sites ne dit jamais rien sur un onzième site de la même région étudiée", "On peut inférer qu’il deviendra sableux après la pluie, car les sols changent de texture chaque fois qu’ils sont détrempés par la pluie"], "Inférer, c’est appliquer une régularité établie à un cas nouveau comparable : dix sites concordants autorisent la prévision pour le onzième, sans la garantir absolument.", {});
  }
]), ["Une inférence étend une régularité à un cas semblable nouveau.", "Dix cas concordants pèsent plus qu’un seul cas isolé."]);
E("s7f-u4-cr-pattern", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return textq("Une équipe a mesuré la dureté de huit échantillons d’un même minéral provenant de huit carrières : 6, 6, 5,5, 6, 6, 5,5, 6 (échelle de Mohs). (a) Décris la régularité que montrent ces données. (b) Un neuvième échantillon du même minéral donne 3. Explique ce que cette valeur suggère et ce que l’équipe devrait vérifier. (3 points)", ["la régularité : la dureté est presque constante (5,5 à 6) pour ce minéral, d’une carrière à l’autre", "la valeur 3 rompt la régularité : elle suggère un autre minéral ou une erreur de test", "les vérifications : refaire le test, vérifier l’identification par d’autres propriétés (trace, clivage)"], "<b>Réponse modèle :</b> (a) Régularité : les huit mesures se tiennent entre 5,5 et 6, avec une valeur dominante de 6. La dureté de ce minéral est donc pratiquement constante, quel que soit le lieu d’origine de l’échantillon : c’est une propriété caractéristique du minéral. (b) La valeur 3 rompt complètement la régularité. Elle suggère que le neuvième échantillon n’est pas le même minéral, ou que le test a été mal fait (par exemple une surface altérée). L’équipe devrait refaire le test de dureté sur une surface fraîche et vérifier l’identité de l’échantillon par d’autres propriétés, comme la trace et le clivage, avant de l’ajouter aux données.<br><br><b>Points d’attribution :</b> 1 point pour la régularité décrite avec les valeurs. 1 point pour l’interprétation de la valeur 3 comme rupture significative. 1 point pour les vérifications proposées.", {});
  }
]), ["Une régularité se décrit par l’étendue et la valeur dominante.", "Une valeur qui rompt une régularité forte demande une explication, pas un rejet silencieux."]);

/* ---------- SC7.12.9 Conclusions fondees sur les donnees ---------- */
E("s7f-u4-conclusion-state", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("Idée de départ : « Le sol le plus foncé draine le plus vite. » Les mesures donnent : sol foncé (riche en matière organique) 90 s, sol pâle sableux 12 s, sol rouge loameux 40 s. Quelle conclusion les données imposent-elles?", "Les données réfutent l’idée de départ : le sol pâle sableux draine le plus vite, et le sol foncé est le plus lent des trois sols mesurés par l’équipe", ["Les données appuient l’idée de départ : le sol foncé draine le plus vite, et le sol pâle est le plus lent des trois sols mesurés par l’équipe", "Les données ne permettent aucune conclusion, car les trois temps de drainage sont trop différents les uns des autres pour être comparés", "Les données appuient l’idée contraire : la couleur détermine toujours le drainage, et les sols foncés drainent toujours plus vite que les pâles"], "La conclusion suit les nombres : 12 s pour le sableux pâle contre 90 s pour le foncé. L’idée de départ est réfutée; c’est la texture, pas la couleur, qui gouverne le drainage.", {});
  }
]), ["La conclusion lit les données, pas l’idée de départ.", "Le plus petit temps gagne le drainage."]);
E("s7f-u4-conclusion-refute", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("Idée de départ : « Tous les minéraux jaunes sont de l’or. » Un échantillon jaune laisse une trace noir verdâtre et se brise en éclats sous le marteau. Quelle conclusion correcte tire-t-on de ces données?", "Les données réfutent l’idée pour cet échantillon : sa trace sombre et sa fragilité montrent qu’il s’agit de pyrite, et non d’or malléable à trace jaune", ["Les données appuient l’idée pour cet échantillon : sa couleur jaune suffit à prouver qu’il s’agit d’or véritable et précieux", "Les données ne disent rien, car la trace et la fragilité ne sont pas des propriétés reconnues des minéraux en géologie", "Les données prouvent que l’or laisse une trace noir verdâtre, car cet échantillon jaune est certainement de l’or véritable"], "La trace et le comportement sous le marteau contredisent l’identification à l’or : la conclusion réfute l’idée de départ pour cet échantillon, qui est de la pyrite.", {});
  }
]), ["Deux propriétés mesurées valent mieux qu’une couleur observée.", "Réfuter une idée par des données est une conclusion complète."]);
E("s7f-u4-cr-conclusion", 4, ["SC7.12.9"], 3, "var", varset([
  function () {
    return textq("Idée de départ d’une équipe : « L’eau acide dissout le calcaire deux fois plus vite que l’eau pure. » Résultats après 24 heures : perte de masse dans l’eau pure, 0,2 g; dans l’eau acide faible, 0,5 g; dans l’eau acide forte, 1,1 g. Énonce une conclusion complète qui dit ce que les données appuient, ce qu’elles ne permettent pas d’affirmer, et pourquoi. (3 points)", ["les données appuient l’effet de l’acide : la perte augmente avec l’acidité (0,2, puis 0,5, puis 1,1 g)", "le « deux fois plus vite » exact n’est pas établi : l’acide faible donne 2,5 fois la perte de l’eau pure, et un seul essai par condition ne suffit pas à fixer un rapport exact", "la conclusion doit rester proportionnée aux données (un essai par condition, une seule durée)"], "<b>Réponse modèle :</b> Ce que les données appuient : l’acide accélère nettement la dissolution du calcaire. La perte de masse passe de 0,2 g dans l’eau pure à 0,5 g dans l’eau acide faible et à 1,1 g dans l’eau acide forte : plus l’eau est acide, plus la dissolution est rapide. Ce que les données ne permettent pas d’affirmer : le rapport exact de « deux fois plus vite ». L’acide faible donne environ 2,5 fois la perte de l’eau pure, et chaque condition n’a été essayée qu’une fois pendant une seule durée de 24 heures : un rapport précis exigerait des essais répétés. La conclusion honnête est donc : l’effet de l’acide est réel et croissant, mais son ampleur exacte reste à mesurer.<br><br><b>Points d’attribution :</b> 1 point pour la partie appuyée, avec les valeurs. 1 point pour la limite identifiée (le rapport exact non établi). 1 point pour la raison de la limite (essais uniques, une seule durée).", {});
  }
]), ["Appuyé, non établi, et pourquoi : les trois morceaux d’une conclusion complète.", "Un seul essai par condition ne fixe pas un rapport exact."]);

/* Exclusion de la composition : la question de conception de recherche
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U4 = { "s7f-u4-cr-design-investigation": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s7f-u1-cr-boreal-example":3,"s7f-u1-cr-data-display":3,"s7f-u1-cr-defend-position":3,"s7f-u1-cr-design-experiment":4,"s7f-u1-cr-energy-flow":3,"s7f-u1-cr-factor-effect":2,"s7f-u1-cr-habitat-defence":3,"s7f-u1-cr-harvest-decision":3,"s7f-u1-cr-recycling":2,"s7f-u1-cr-silviculture":2,"s7f-u1-cr-succession-compare":2,"s7f-u1-cr-succession-signs":3,"s7f-u1-cr-succession-stages":2,"s7f-u1-cr-three-interactions":3,"s7f-u1-cr-web-change":3,"s7f-u1-cr-web-interpret":3,"s7f-u2-cr-absorb":2,"s7f-u2-cr-conclusion":3,"s7f-u2-cr-design-test":4,"s7f-u2-cr-display":3,"s7f-u2-cr-expansion":3,"s7f-u2-cr-heating-decision":3,"s7f-u2-cr-heating-example":2,"s7f-u2-cr-improvement":2,"s7f-u2-cr-inquiry":3,"s7f-u2-cr-instrument-jobs":3,"s7f-u2-cr-plateau":3,"s7f-u2-cr-pump-chain":3,"s7f-u2-cr-temp-explain":3,"s7f-u2-cr-thermometer-display":2,"s7f-u2-cr-transfer-explain":3,"s7f-u3-cr-best-fit":3,"s7f-u3-cr-classify":3,"s7f-u3-cr-concentration":3,"s7f-u3-cr-design-solubility":4,"s7f-u3-cr-dissolving":3,"s7f-u3-cr-distill":2,"s7f-u3-cr-new-question":2,"s7f-u3-cr-pure":2,"s7f-u3-cr-salt-decision":3,"s7f-u3-cr-separate":3,"s7f-u3-cr-solubility":2,"s7f-u3-cr-three-part":3,"s7f-u4-cr-big-picture":3,"s7f-u4-cr-change-explain":3,"s7f-u4-cr-conclusion":3,"s7f-u4-cr-design-investigation":4,"s7f-u4-cr-distribution":3,"s7f-u4-cr-event-compare":3,"s7f-u4-cr-mineral-id":2,"s7f-u4-cr-mineral-tests":3,"s7f-u4-cr-mountain-explain":2,"s7f-u4-cr-past-theory":2,"s7f-u4-cr-pattern":3,"s7f-u4-cr-rock-journey":3,"s7f-u4-cr-soil-case":2,"s7f-u4-cr-table-display":2,"s7f-u4-cr-theory-evolved":3,"s7f-u4-cr-timeline":2,"s7f-u4-cr-weathering":3};
