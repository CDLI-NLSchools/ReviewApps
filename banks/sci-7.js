/* Science 7 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-7/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Science 7 shared figure builders (Unit 1 first, Nov 15, 2026).
   All figures are inline SVG (or one HTML panel for the key family),
   generated from each item's own values where the family is data
   driven, and drawn once as constants where the family is an
   illustration (pond scene, organization panels, nutrient cycle).
   No figure labels its own answer: callouts are numbers or letters
   only, and the keyed feature is always one of several plausible
   features. */

function s7Esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* F2: temperature tolerance curve. sp = {lo, optLo, optHi, hi, peak}
   Temperatures in degrees C on the x axis from lo-6 to hi+6. The
   curve is drawn smooth through failure, tolerance and optimum
   zones; the zones are NOT named on the figure. */
function s7TolCurveSVG(sp) {
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
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 2) + "\" text-anchor=\"middle\">Temperature (°C)</text>";
  s += "<text x=\"14\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 14 " + (H / 2) + ")\">Population health</text>";
  s += "</svg>";
  return s;
}

/* F3: food chain boxes. arrows=true draws energy arrows between the
   boxes; arrows=false leaves the organisms unconnected. */
function s7ChainSVG(orgs, arrows) {
  var W = 620, H = 92, bw = 128, gap = (W - 4 * bw) / 3;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:620px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  orgs.forEach(function (o, i) {
    var x = i * (bw + gap);
    s += "<rect x=\"" + x + "\" y=\"26\" width=\"" + bw + "\" height=\"40\" rx=\"6\" fill=\"#eef6ee\" stroke=\"#1a7f4b\"/>";
    var words = o.split(" "), lines = [], cur = "";
    words.forEach(function (w) { if ((cur + " " + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
    lines.push(cur.trim());
    lines.forEach(function (ln, li) {
      s += "<text x=\"" + (x + bw / 2) + "\" y=\"" + (40 + li * 15) + "\" text-anchor=\"middle\">" + s7Esc(ln) + "</text>";
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
function s7WebSVG(nodes, links) {
  var W = 640, H = 400;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<defs><marker id=\"s7ah\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 8,3 0,6\" fill=\"#555\"/></marker></defs>";
  links.forEach(function (lk) {
    var a = nodes[lk[0]], b = nodes[lk[1]];
    var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / len, uy = dy / len;
    s += "<line x1=\"" + (a.x + ux * 34) + "\" y1=\"" + (a.y + uy * 16) + "\" x2=\"" + (b.x - ux * 38) + "\" y2=\"" + (b.y - uy * 18) + "\" stroke=\"#888\" stroke-width=\"1.5\" marker-end=\"url(#s7ah)\"/>";
  });
  nodes.forEach(function (nd, i) {
    var label = String.fromCharCode(65 + i);
    var w = Math.max(64, nd.n.length * 7.4 + 14);
    s += "<rect x=\"" + (nd.x - w / 2) + "\" y=\"" + (nd.y - 15) + "\" width=\"" + w + "\" height=\"30\" rx=\"7\" fill=\"#fdfdf5\" stroke=\"#7a6a2f\"/>";
    s += "<text x=\"" + nd.x + "\" y=\"" + (nd.y + 4) + "\" text-anchor=\"middle\">" + s7Esc(nd.n) + "</text>";
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
var S7_POND_SVG = "<svg viewBox=\"0 0 640 400\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
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
   C organisms to decomposers, D decomposers to soil. */
var S7_NUTRIENT_SVG = "<svg viewBox=\"0 0 560 330\" width=\"100%\" style=\"max-width:560px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">"
  + "<defs><marker id=\"s7na\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 8,3 0,6\" fill=\"#555\"/></marker></defs>"
  + "<rect x=\"200\" y=\"262\" width=\"160\" height=\"42\" rx=\"7\" fill=\"#efe3cb\" stroke=\"#8a6b45\"/><text x=\"280\" y=\"288\" text-anchor=\"middle\">Nutrients in soil</text>"
  + "<rect x=\"40\" y=\"130\" width=\"140\" height=\"42\" rx=\"7\" fill=\"#e2f0da\" stroke=\"#1a7f4b\"/><text x=\"110\" y=\"156\" text-anchor=\"middle\">Plants</text>"
  + "<rect x=\"380\" y=\"130\" width=\"140\" height=\"42\" rx=\"7\" fill=\"#fdeeda\" stroke=\"#b06f28\"/><text x=\"450\" y=\"156\" text-anchor=\"middle\">Animals</text>"
  + "<rect x=\"185\" y=\"18\" width=\"190\" height=\"42\" rx=\"7\" fill=\"#ece4f2\" stroke=\"#6a4a8a\"/><text x=\"280\" y=\"44\" text-anchor=\"middle\">Decomposers</text>"
  + "<path d=\"M215 262 Q110 235 108 178\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7na)\"/>"
  + "<path d=\"M186 151 L374 151\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7na)\"/>"
  + "<path d=\"M450 124 Q400 70 340 62 M110 124 Q160 70 220 62\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7na)\"/>"
  + "<path d=\"M300 66 L292 256\" fill=\"none\" stroke=\"#555\" stroke-width=\"2\" marker-end=\"url(#s7na)\"/>"
  + "<g font-weight=\"bold\"><circle cx=\"128\" cy=\"222\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"128\" y=\"227\" text-anchor=\"middle\">A</text>"
  + "<circle cx=\"280\" cy=\"138\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"280\" y=\"143\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"404\" cy=\"88\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"404\" y=\"93\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"322\" cy=\"160\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"322\" y=\"165\" text-anchor=\"middle\">D</text></g>"
  + "</svg>";

/* F6: organization panels (drawn once): one bog setting shown four
   ways. A one lynx, B a group of lynx, C lynx with hares and spruce,
   D the whole scene with pond, sun and soil. */
function s7Lynx(x, y, s) {
  return "<g transform=\"translate(" + x + "," + y + ") scale(" + s + ")\" fill=\"#8a6b45\">"
    + "<ellipse cx=\"0\" cy=\"0\" rx=\"17\" ry=\"9\"/><circle cx=\"19\" cy=\"-8\" r=\"7\"/>"
    + "<polygon points=\"15,-14 17,-21 20,-14\"/><polygon points=\"21,-14 24,-20 25,-13\"/>"
    + "<rect x=\"-13\" y=\"6\" width=\"4\" height=\"11\"/><rect x=\"9\" y=\"6\" width=\"4\" height=\"11\"/>"
    + "<path d=\"M-17 0 q-12 -3 -14 -12\" stroke=\"#8a6b45\" stroke-width=\"3\" fill=\"none\"/></g>";
}
var S7_ORG_SVG = "<svg viewBox=\"0 0 640 210\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">"
  + "<g><rect x=\"5\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7Lynx(78, 100, 1.1) + "<text x=\"16\" y=\"32\" font-weight=\"bold\">A</text></g>"
  + "<g><rect x=\"165\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7Lynx(215, 82, 0.95) + s7Lynx(262, 118, 0.95) + s7Lynx(212, 140, 0.8) + "<text x=\"176\" y=\"32\" font-weight=\"bold\">B</text></g>"
  + "<g><rect x=\"325\" y=\"10\" width=\"150\" height=\"170\" fill=\"#f4f8ef\" stroke=\"#999\"/>" + s7Lynx(372, 120, 0.9)
  + "<ellipse cx=\"440\" cy=\"128\" rx=\"10\" ry=\"6\" fill=\"#cbb79a\"/><circle cx=\"450\" cy=\"122\" r=\"4.5\" fill=\"#cbb79a\"/>"
  + "<polygon points=\"405,60 417,28 429,60\" fill=\"#4d7c4d\"/><rect x=\"414\" y=\"60\" width=\"5\" height=\"12\" fill=\"#8a6b45\"/>"
  + "<text x=\"336\" y=\"32\" font-weight=\"bold\">C</text></g>"
  + "<g><rect x=\"485\" y=\"10\" width=\"150\" height=\"170\" fill=\"#eef6fb\" stroke=\"#999\"/>"
  + "<circle cx=\"600\" cy=\"42\" r=\"14\" fill=\"#f7c948\"/>" + s7Lynx(545, 108, 0.85)
  + "<ellipse cx=\"560\" cy=\"152\" rx=\"52\" ry=\"15\" fill=\"#bfe0ea\"/>"
  + "<polygon points=\"492,74 501,48 510,74\" fill=\"#4d7c4d\"/>"
  + "<path d=\"M485 166 L635 166 L635 180 L485 180 Z\" fill=\"#c9a877\"/>"
  + "<text x=\"496\" y=\"32\" font-weight=\"bold\">D</text></g>"
  + "</svg>";

/* F8: line graph of tree height over years, generated from the
   item's own data values. */
function s7GrowthSVG(years, heights) {
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
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">Years since the harvest</text>";
  s += "<text x=\"14\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 14 " + (H / 2) + ")\">Average tree height (m)</text>";
  s += "</svg>";
  return s;
}

/* F9: succession stage panels. Stage art drawn once per stage;
   s7SuccessionSVG composes the four stages in a given display
   order and letters the panels A to D in display order. */
function s7StageArt(stage) {
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
function s7SuccessionSVG(order) {
  var s = "<svg viewBox=\"0 0 640 130\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  order.forEach(function (stage, i) {
    var x = 5 + i * 160;
    s += "<g transform=\"translate(" + x + ",8)\"><rect x=\"0\" y=\"0\" width=\"150\" height=\"112\" fill=\"#f7faf3\" stroke=\"#999\"/>"
      + s7StageArt(stage)
      + "<text x=\"8\" y=\"18\" font-weight=\"bold\">" + String.fromCharCode(65 + i) + "</text></g>";
  });
  s += "</svg>";
  return s;
}

/* F7: dichotomous key panel (HTML figure). keyLines: array of key
   couplets as text; specimens: array of short descriptions. */
function s7KeyFigure(keyLines, specimens) {
  var h = "<div style=\"border:1px solid #999;border-radius:6px;padding:10px 14px;background:#fdfdf5;max-width:620px\">";
  h += "<b>Identification key</b><br>" + keyLines.map(s7Esc).join("<br>");
  h += "<br><br><b>Specimens</b><br>" + specimens.map(function (sp, i) { return "<b>" + (i + 1) + ".</b> " + s7Esc(sp); }).join("<br>");
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
function s7EarthLayersSVG() {
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
  leader(115, -38, 268, "Crust", "thin solid rock layer");
  leader(82, -8, 268, "Mantle", "");
  leader(38, 28, 268, "Outer core", "");
  leader(10, 62, 268, "Inner core", "");
  s += "</svg>";
  return s;
}

/* G2: world distribution map, drawn once. Continent outlines are
   simplified coastlines placed from real longitude and latitude
   coordinates (equirectangular projection); the plotted earthquake
   and volcano locations are real places. The pattern is the content:
   the points cluster along belts, they do not scatter evenly. */
function s7WorldMapSVG() {
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
  s += "<text x=\"34\" y=\"" + (H - 25) + "\">earthquake location</text>";
  s += "<polygon points=\"24," + (H - 19) + " 20," + (H - 12) + " 28," + (H - 12) + "\" fill=\"#e67e22\" stroke=\"#a3540d\" stroke-width=\"0.6\"/>";
  s += "<text x=\"34\" y=\"" + (H - 11) + "\">volcano location</text>";
  s += "</svg>";
  return s;
}

/* G3: mineral classification key panel. The key is a constant (it is
   the key from the guide's mineral study, written for the bank); the
   specimen property rows are supplied per item. The panel never
   names a specimen's identity: the student works the key. */
var S7_MINERAL_KEY_LINES = [
  "1a. The mineral is attracted to a magnet ... magnetite",
  "1b. The mineral is not attracted to a magnet ... go to 2",
  "2a. The mineral leaves a red-brown streak ... hematite",
  "2b. The streak is not red-brown ... go to 3",
  "3a. The mineral breaks into cube-shaped pieces and feels very heavy for its size ... galena",
  "3b. It does not break into cubes ... go to 4",
  "4a. The mineral splits into thin, flexible sheets ... mica",
  "4b. It does not split into sheets ... go to 5",
  "5a. A fingernail scratches the mineral ... go to 6",
  "5b. A fingernail does not scratch the mineral ... go to 8",
  "6a. The mineral feels greasy and marks paper easily ... graphite",
  "6b. It does not mark paper ... go to 7",
  "7a. The mineral feels soapy or greasy and is pearly white ... talc",
  "7b. Silky or pearly, white or clear, and not greasy ... gypsum",
  "8a. The mineral fizzes (bubbles) when weak acid is dripped on it ... calcite",
  "8b. It does not fizz in acid ... go to 9",
  "9a. Brassy yellow colour with a metallic lustre ... pyrite",
  "9b. Not brassy yellow ... go to 10",
  "10a. Glassy lustre, no cleavage, breaks with a shell-like fracture, hardness 7 ... quartz",
  "10b. Cleavage in two directions, pearly to glassy lustre, hardness 6 ... feldspar"
];
function s7MineralKeyFigure(specimens) {
  return s7KeyFigure(S7_MINERAL_KEY_LINES, specimens);
}

/* G4: rock cycle diagram, drawn once. Boxes name the three rock
   families and magma; arrows are labelled with the processes. The
   guide's own example path (sedimentary to igneous only by way of
   metamorphic rock and melting) is a labelled route through the
   diagram, not an answer key. */
function s7RockCycleSVG() {
  var s = "<svg viewBox=\"0 0 600 330\" width=\"100%\" style=\"max-width:600px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<defs><marker id=\"s7rcA\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#555\"/></marker></defs>";
  function box(x, y, w, label, fill) {
    s += "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"36\" rx=\"6\" fill=\"" + fill + "\" stroke=\"#555\"/>";
    s += "<text x=\"" + (x + w / 2) + "\" y=\"" + (y + 22) + "\" text-anchor=\"middle\" font-weight=\"bold\">" + label + "</text>";
  }
  function arrow(x1, y1, x2, y2, tx, ty, label, anchor) {
    s += "<line x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 + "\" y2=\"" + y2 + "\" stroke=\"#555\" stroke-width=\"1.6\" marker-end=\"url(#s7rcA)\"/>";
    s += "<text x=\"" + tx + "\" y=\"" + ty + "\" text-anchor=\"" + (anchor || "middle") + "\" fill=\"#333\">" + label + "</text>";
  }
  box(240, 12, 120, "Magma", "#f6c9a0");
  box(452, 92, 128, "Igneous rock", "#d9d9d9");
  box(420, 238, 150, "Sediments", "#efe3b0");
  box(196, 268, 168, "Sedimentary rock", "#cfe0ef");
  box(20, 92, 150, "Metamorphic rock", "#d8cdea");
  arrow(362, 40, 470, 88, 448, 52, "cooling", "middle");
  arrow(512, 130, 500, 232, 522, 186, "weathering", "start");
  arrow(512, 196, 500, 232, 522, 204, "and erosion", "start");
  arrow(418, 262, 368, 278, 392, 254, "compaction and", "middle");
  arrow(418, 274, 368, 284, 392, 300, "cementation", "middle");
  arrow(196, 268, 150, 132, 128, 208, "heat and", "middle");
  arrow(196, 268, 158, 132, 128, 222, "pressure", "middle");
  arrow(150, 92, 268, 46, 196, 58, "melting", "middle");
  arrow(452, 110, 172, 110, 312, 100, "heat and pressure", "middle");
  arrow(300, 268, 300, 52, 312, 168, "melting", "start");
  s += "</svg>";
  return s;
}

/* G5: soil drainage data display, data driven. samples is a list of
   {name, secs}: the time for 25 mL of water to drain through each
   sample, drawn as horizontal bars. The display shows the data; the
   item asks for the relationship. */
function s7DrainSVG(samples) {
  var max = 0;
  samples.forEach(function (sm) { if (sm.secs > max) max = sm.secs; });
  var W = 520, rowH = 34, top = 30, H = top + samples.length * rowH + 26;
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:520px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<text x=\"150\" y=\"18\" font-weight=\"bold\">Time for 25 mL of water to drain through each soil sample</text>";
  samples.forEach(function (sm, i) {
    var y = top + i * rowH;
    var w = Math.max(4, sm.secs / max * 300);
    s += "<text x=\"142\" y=\"" + (y + 17) + "\" text-anchor=\"end\">" + s7Esc(sm.name) + "</text>";
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
function s7TimeStripSVG() {
  var W = 640, x0 = 30, x1 = 610, y = 58, h = 44;
  var eras = [
    { name: "Precambrian", yrs: 4000, fill: "#b08968", ev: "first life forms" },
    { name: "Paleozoic", yrs: 290, fill: "#7fb069", ev: "first fish; first forests" },
    { name: "Mesozoic", yrs: 185, fill: "#e0a458", ev: "first mammals; first flowering plants" },
    { name: "Cenozoic", yrs: 66, fill: "#5b8e7d", ev: "first humans" }
  ];
  var total = 4541, x = x0;
  var s = "<svg viewBox=\"0 0 " + W + " 190\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<text x=\"" + x0 + "\" y=\"24\" font-weight=\"bold\">Geological time: 4.6 billion years of Earth's history, drawn to scale</text>";
  s += "<text x=\"" + x0 + "\" y=\"44\">4.6 billion years ago</text>";
  s += "<text x=\"" + x1 + "\" y=\"44\" text-anchor=\"end\">today</text>";
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

/* ----- bank-u1.js ----- */
// CRMARKS: s7-u1-cr-factor-effect=2
// CRMARKS: s7-u1-cr-three-interactions=3
// CRMARKS: s7-u1-cr-energy-flow=3
// CRMARKS: s7-u1-cr-web-change=3
// CRMARKS: s7-u1-cr-recycling=2
// CRMARKS: s7-u1-cr-succession-compare=2
// CRMARKS: s7-u1-cr-web-interpret=3
// CRMARKS: s7-u1-cr-silviculture=2
// CRMARKS: s7-u1-cr-harvest-decision=3
// CRMARKS: s7-u1-cr-boreal-example=3
// CRMARKS: s7-u1-cr-habitat-defence=3
// CRMARKS: s7-u1-cr-design-experiment=4
// CRMARKS: s7-u1-cr-data-display=3
// CRMARKS: s7-u1-cr-defend-position=3
// CRMARKS: s7-u1-cr-succession-stages=2
// Science 7 Unit 1 bank: Interactions Within Ecosystems (SC7.1.1 to
// SC7.3.11), built Nov 15, 2026 to the Ecosystems authoring spec.
// All entries are original, mined for type from the harvested
// teacher tests, the MHR ExamView chapters 1 to 3, the core
// laboratories, the Two Centimetre Forest module and SLA 7 unit 1,
// and rewritten throughout (mine-and-rewrite).
// Coverage honesty: SC7.3.5 (work cooperatively with team members)
// is NONE for this format and carries no entries, by design.
// CORE residue: SC7.3.3 entries assess instrument choice, record
// format and recording-plan judgement; they do not assess taking
// measurements in the field. SC7.3.4 entries assess choosing and
// judging a communication format in writing; they do not assess
// oral communication or producing the communication itself.
// SC7.3.6 entries assess knowledge about evaluating group
// processes; they do not assess a student evaluating their own
// group. SC7.3.8 entries assess experiment design; the carrying
// out is classroom work.
// Symbiosis ruling: harvested relationship scenarios appear only
// as unnamed biotic-biotic interaction examples under SC7.1.2.

/* Food web data for the F4 family (letters are node order). */
var S7_WEB_POND = {
  nodes: [
    { n: "Algae", x: 90, y: 340 }, { n: "Cattail", x: 250, y: 350 },
    { n: "Water flea", x: 130, y: 215 }, { n: "Snail", x: 300, y: 225 },
    { n: "Minnow", x: 330, y: 105 }, { n: "Dragonfly", x: 480, y: 235 },
    { n: "Frog", x: 500, y: 105 }, { n: "Heron", x: 610, y: 60 }
  ],
  links: [[0, 2], [0, 3], [1, 3], [2, 4], [2, 5], [4, 6], [4, 7], [5, 6], [6, 7]]
};
var S7_WEB_FOREST = {
  nodes: [
    { n: "Grass", x: 80, y: 340 }, { n: "Balsam fir", x: 250, y: 350 },
    { n: "Hare", x: 140, y: 205 }, { n: "Squirrel", x: 330, y: 215 },
    { n: "Moose", x: 480, y: 330 }, { n: "Marten", x: 470, y: 200 },
    { n: "Owl", x: 560, y: 95 }, { n: "Lynx", x: 300, y: 80 }
  ],
  links: [[0, 2], [0, 4], [1, 4], [1, 3], [2, 7], [2, 6], [3, 5], [3, 6], [5, 7]]
};
var S7_WEB_MEADOW = {
  nodes: [
    { n: "Grass", x: 80, y: 340 }, { n: "Clover", x: 240, y: 350 },
    { n: "Grasshopper", x: 150, y: 210 }, { n: "Mouse", x: 330, y: 225 },
    { n: "Bee", x: 430, y: 330 }, { n: "Frog", x: 460, y: 200 },
    { n: "Snake", x: 540, y: 95 }, { n: "Hawk", x: 330, y: 75 }
  ],
  links: [[0, 2], [0, 3], [1, 2], [1, 4], [2, 5], [2, 3], [5, 6], [3, 6], [3, 7], [6, 7]]
};
function s7WebQ(web) { return s7WebSVG(web.nodes, web.links); }

/* ---------- SC7.1.1 Biotic and abiotic factors ---------- */

E("s7-u1-factor-classify", 1, ["SC7.1.1"], 1, "gen", function () {
  var sets = [
    { place: "a bog", ab: "acidic water", bi: ["sphagnum moss", "black flies", "pitcher plants"] },
    { place: "a rocky shoreline", ab: "salt spray", bi: ["barnacles", "seaweed", "gulls"] },
    { place: "a spruce forest", ab: "shade under the canopy", bi: ["spruce trees", "mushrooms", "red squirrels"] },
    { place: "a pond", ab: "dissolved oxygen in the water", bi: ["cattails", "minnows", "snails"] },
    { place: "a barrens", ab: "strong wind", bi: ["caribou", "lichens", "partridgeberries"] }
  ];
  var s = pick(sets);
  var opts = shuffle(s.bi.slice());
  return mcq("A student lists features of " + s.place + ": " + s.bi[0] + ", " + s.bi[1] + ", " + s.bi[2] + " and " + s.ab + ". Which feature is an abiotic factor?",
    s.ab,
    opts,
    "Abiotic factors are the non-living parts of an ecosystem. " + s.ab.charAt(0).toUpperCase() + s.ab.slice(1) + " is non-living, while the other three features are living organisms, so they are biotic factors.", {});
}, ["Biotic means living. Cross out every feature that is alive or made by a living organism.", "Only one feature on the list is not alive. That is the abiotic one."]);

E("s7-u1-factor-local", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Which of the following is an abiotic factor in a Newfoundland and Labrador barrens ecosystem?",
      "Strong, drying wind",
      ["Caribou grazing on lichens", "Partridgeberry plants spreading", "Arctic hares feeding at dusk"],
      "Wind is non-living, so it is an abiotic factor. The caribou, plants and hares are all living organisms, so they are biotic factors.", {});
  },
  function () {
    return mcq("Which of the following is a biotic factor in a pond ecosystem?",
      "Water striders skating on the surface",
      ["Sunlight reaching the shallow water", "Gravel on the pond bottom", "Rain adding water to the pond"],
      "Water striders are living insects, so they are a biotic factor. Sunlight, gravel and rain are non-living, so they are abiotic factors.", {});
  }
]), ["Sort the options into living and non-living first.", "The question asks for one kind only; three options are the other kind."]);

E("s7-u1-tolerance-curve", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows how the health of a brook trout population changes with water temperature. Between which temperatures is the population healthiest?",
      "10 °C and 16 °C",
      ["4 °C and 10 °C", "16 °C and 22 °C", "4 °C and 22 °C"],
      "The top, flat part of the curve is the optimum range, where the population is healthiest: 10 °C to 16 °C. Outside it the curve falls through the tolerance range toward the failure range at each end.", {});
    q.figure = s7TolCurveSVG({ lo: 4, optLo: 10, optHi: 16, hi: 22 });
    return q;
  },
  function () {
    var q = mcq("The graph shows how the health of a capelin population changes with water temperature. At which temperature is the population surviving but under the greatest stress?",
      "19 °C",
      ["12 °C", "8 °C", "15 °C"],
      "Stress is greatest near the ends of the tolerance range, where the curve has fallen close to failure but the population still survives. At 19 °C the curve is low but not yet at the failure point; 12 °C and 15 °C are in or near the optimum range, and 8 °C is comfortably inside the tolerance range.", {});
    q.figure = s7TolCurveSVG({ lo: 2, optLo: 9, optHi: 14, hi: 20 });
    return q;
  }
]), ["Find the flat top of the curve first; that is where the population does best.", "The ends of the curve are the failure range. Just inside them is the high-stress part of the tolerance range."]);

E("s7-u1-cr-factor-effect", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    return textq("A pond's water level drops through a long, dry summer, and the shallow edges dry out completely. (a) Name the abiotic factor that changed. (b) Explain one effect this change could have on the pond's organisms.",
      ["The abiotic factor is water (water level or amount). Effects could include: organisms that need shallow water lose habitat, eggs laid in the shallows dry out, or the remaining water warms and holds less oxygen, stressing fish"],
      "<b>Model answer:</b> (a) The abiotic factor is water: the amount of water in the pond fell. (b) Any one well-explained effect earns the mark, for example: frogs and insects that lay eggs in the shallow edges lose their breeding habitat when the edges dry, so fewer young survive; or the smaller volume of water warms up and holds less dissolved oxygen, which stresses the fish living in it.<br><br><b>Marking points:</b> 1 mark for naming water (amount or level) as the abiotic factor. 1 mark for one effect on organisms, explained as a consequence of the change, not just restated.", {});
  },
  function () {
    return textq("A stand of spruce trees beside a schoolyard is cut down, so a garden plot that was shaded all day is now in full sun. (a) Name the abiotic factor that changed for the plants in the plot. (b) Explain one effect this change could have on those plants.",
      ["The abiotic factor is sunlight (light intensity). Effects could include: shade-loving plants are stressed or die back, sun-loving plants grow faster, or the soil dries out faster so plants need more water"],
      "<b>Model answer:</b> (a) The abiotic factor is sunlight: the plot now receives much more light. (b) Any one well-explained effect earns the mark, for example: plants that were adapted to shade may be stressed and die back, while sun-loving plants grow faster with the extra light for photosynthesis; or the exposed soil dries out more quickly, so the plants face a shortage of water.<br><br><b>Marking points:</b> 1 mark for naming sunlight (light) as the abiotic factor. 1 mark for one effect on the plants, explained as a consequence of the change.", {});
  }
]), ["First separate the living parts from the non-living part that changed.", "For part (b), follow the chain: the change alters a condition, and that condition matters to an organism."]);

/* ---------- SC7.1.2 Interactions between factors ---------- */

E("s7-u1-interaction-classify", 1, ["SC7.1.2"], 1, "gen", function () {
  var pool = [
    { ex: "earthworms tunnel through the soil and let air into it", t: "biotic-abiotic" },
    { ex: "sunlight warms the surface of a lake", t: "abiotic-abiotic" },
    { ex: "a lynx hunts a snowshoe hare", t: "biotic-biotic" },
    { ex: "wind spreads dandelion seeds across a field", t: "abiotic-abiotic" },
    { ex: "tree roots crack a sidewalk as they grow", t: "biotic-abiotic" },
    { ex: "two male caribou lock antlers during the rut", t: "biotic-biotic" },
    { ex: "rainwater dissolves minerals in a rock surface", t: "abiotic-abiotic" },
    { ex: "bees carry pollen from flower to flower", t: "biotic-biotic" },
    { ex: "a beaver cuts down a poplar tree for its dam", t: "biotic-biotic" },
    { ex: "waves erode the soil along a shoreline", t: "abiotic-abiotic" }
  ];
  var names = { "biotic-abiotic": "A biotic-abiotic interaction", "abiotic-abiotic": "An abiotic-abiotic interaction", "biotic-biotic": "A biotic-biotic interaction" };
  var it = pick(pool);
  var others = Object.keys(names).filter(function (k) { return k !== it.t; });
  return mcq("In a local ecosystem, " + it.ex + ". This is an example of",
    names[it.t],
    [names[others[0]], names[others[1]], "A change that is not an interaction"],
    "Classify by the two factors involved. In this example the factors are " + it.t.replace("-", " and ") + ", so it is " + names[it.t].toLowerCase() + ". Every option that names two living or two non-living factors incorrectly can be checked the same way: name each factor first, then decide if it is living.", {});
}, ["Name the two factors in the example before you choose.", "Ask of each factor: is it living (biotic) or non-living (abiotic)?"]);

E("s7-u1-interaction-examples", 1, ["SC7.1.2"], 1, "var", varset([
  function () {
    return mcq("A whale carries a group of barnacles attached to its skin as it swims and feeds. The barnacles gain a ride to food-rich water; the whale is not helped or harmed. The interaction between the whale and the barnacles is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "Both the whale and the barnacles are living organisms, so any interaction between them is biotic-biotic, whatever its effect on each partner. The type of an interaction is set by what the two factors are, not by who benefits.", {});
  },
  function () {
    return mcq("A flea lives on a dog, feeding on the dog's blood. The interaction between the flea and the dog is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "The flea and the dog are both living organisms, so their interaction is biotic-biotic. Classifying an interaction starts with the two factors involved: living with living is biotic-biotic.", {});
  },
  function () {
    return mcq("Bees visit clover flowers to collect nectar, and pollen sticks to the bees and reaches other flowers. The interaction between the bees and the clover is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "Bees and clover are both living, so the interaction is biotic-biotic. It is also a useful reminder that biotic-biotic interactions are not all feeding interactions: pollination is an interaction between two organisms in which neither eats the other.", {});
  }
]), ["Decide whether each partner is living before thinking about who benefits.", "The interaction type names the two factors, not the outcome for either one."]);

E("s7-u1-pond-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    var q = mcq("In the pond diagram, which callout number shows an abiotic-abiotic interaction?",
      "Callout 1",
      ["Callout 3", "Callout 4", "Callout 5"],
      "Callout 1 marks sunlight warming the pond surface: sunlight and water are both non-living, so the interaction is abiotic-abiotic. Callout 3 is a bird nesting in a tree and callout 4 is a fish taking an insect (both living-living), and callout 5 is roots taking up water (living-non-living).", {});
    q.figure = S7_POND_SVG;
    return q;
  },
  function () {
    var q = mcq("In the pond diagram, which callout number shows a biotic-biotic interaction that is NOT a feeding interaction?",
      "Callout 3",
      ["Callout 1", "Callout 4", "Callout 6"],
      "Callout 3 marks a bird nesting in the shoreline tree: two living organisms interacting, and neither eats the other. Callout 4 is a feeding interaction (a fish taking an insect), callout 1 is sunlight on water (abiotic-abiotic), and callout 6 is wind bending the reeds (abiotic-biotic).", {});
    q.figure = S7_POND_SVG;
    return q;
  },
  function () {
    var q = mcq("In the pond diagram, which callout number shows a biotic-abiotic interaction?",
      "Callout 5",
      ["Callout 2", "Callout 3", "Callout 4"],
      "Callout 5 marks the cattail roots taking up water: a living plant interacting with non-living water, a biotic-abiotic interaction. Callout 2 is rain falling (abiotic-abiotic), and callouts 3 and 4 involve two living organisms each.", {});
    q.figure = S7_POND_SVG;
    return q;
  }
]), ["Work through the callouts one at a time and name the two factors at each.", "Feeding is only one kind of interaction; look for two living things where neither is eaten."]);

E("s7-u1-cr-three-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return textq("Choose a local ecosystem you know (a pond, a forest, a bog or your schoolyard). Give ONE example of each type of interaction in that ecosystem: biotic-abiotic, abiotic-abiotic, and biotic-biotic. Label each example with its type.",
      ["Three correctly labelled examples, one of each type, from one named ecosystem; for a pond, for example: a frog warming itself on a sunny rock (biotic-abiotic), wind making ripples on the water (abiotic-abiotic), and a heron catching a minnow (biotic-biotic)"],
      "<b>Model answer:</b> For a pond: biotic-abiotic: a frog sits on a sun-warmed rock, taking heat from the non-living rock and sunlight. Abiotic-abiotic: wind blows across the pond and raises ripples on the water; both factors are non-living. Biotic-biotic: a heron catches and eats a minnow; two living organisms interact. Any ecosystem the student knows well works, as long as each example truly joins the two kinds of factor its label claims.<br><br><b>Marking points:</b> 1 mark for a genuine biotic-abiotic example, correctly labelled. 1 mark for a genuine abiotic-abiotic example, correctly labelled. 1 mark for a genuine biotic-biotic example, correctly labelled.", {});
  },
  function () {
    return textq("A student writes these three examples for a forest ecosystem: (1) sunlight evaporates water from a puddle on the trail; (2) a squirrel buries seeds in the soil; (3) rain soaks into the ground and reaches tree roots. For EACH example, state its interaction type and how you can tell.",
      ["(1) Abiotic-abiotic: sunlight and water are both non-living. (2) Biotic-biotic or biotic-abiotic accepted only if justified by the factors named; the squirrel and the seeds are both living (biotic-biotic) while the soil is non-living, so the strongest reading is biotic-biotic for the burying of seeds. (3) Biotic-abiotic: rain is non-living and the tree is living"],
      "<b>Model answer:</b> (1) Abiotic-abiotic: sunlight and water are both non-living factors. (2) Biotic-biotic: the squirrel is living and the seeds it buries are living material from a tree; the interaction described is between the animal and the seeds. (3) Biotic-abiotic: rain is a non-living factor and the tree roots belong to a living organism. The method is the same each time: name the two factors, decide whether each is living, and the type follows.<br><br><b>Marking points:</b> 1 mark for example 1 correctly typed with its reason. 1 mark for example 2 correctly typed with its reason. 1 mark for example 3 correctly typed with its reason.", {});
  }
]), ["Pick one ecosystem and stay in it for all three examples.", "For each example, name the two factors out loud and label each one living or non-living."]);

/* ---------- SC7.1.3 Niches of producers, consumers, decomposers ---------- */

E("s7-u1-role-identify", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("In a spruce forest, a mushroom grows on a dead log, slowly breaking the wood down. The mushroom's role in the ecosystem is",
      "a decomposer",
      ["a consumer", "a producer", "an abiotic factor"],
      "The mushroom feeds by breaking down dead material, which is the decomposer role. Producers make their own food, consumers eat other organisms, and the mushroom is living, so it cannot be an abiotic factor.", {});
  },
  function () {
    return mcq("In a pond, green algae float near the surface in the sunlight and make their own food. The algae's role in the ecosystem is",
      "a producer",
      ["a consumer", "a decomposer", "a scavenger"],
      "Organisms that make their own food using sunlight are producers. The algae do not eat other organisms (consumer) or break down dead material (decomposer).", {});
  },
  function () {
    return mcq("A snowshoe hare feeds on twigs and bark through the winter. The hare's role in the ecosystem is",
      "a consumer",
      ["a decomposer", "a producer", "an abiotic factor"],
      "The hare gets its food by eating other organisms (plants), which makes it a consumer. It does not make its own food or break down dead material.", {});
  }
]), ["Ask how the organism gets its food: makes it, eats, or breaks down the dead.", "Every living organism in these items fills exactly one of the three roles."]);

E("s7-u1-consumer-types", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("A lynx hunts snowshoe hares and eats only other animals. The lynx is classified as",
      "a carnivore",
      ["a decomposer", "a herbivore", "an omnivore"],
      "A consumer that eats only animals is a carnivore. Herbivores eat only plants, omnivores eat both plants and animals, and decomposers break down dead material.", {});
  },
  function () {
    return mcq("A black bear eats berries in the fall and also catches fish and eats carrion. The bear is classified as",
      "an omnivore",
      ["a carnivore", "a decomposer", "a herbivore"],
      "The bear eats both plant material (berries) and animals (fish, carrion), and a consumer that eats both is an omnivore.", {});
  },
  function () {
    return mcq("A moose feeds entirely on twigs, leaves and aquatic plants. The moose is classified as",
      "a herbivore",
      ["a carnivore", "a decomposer", "an omnivore"],
      "A consumer that eats only plants is a herbivore. The moose eats no animal material, so it is not a carnivore or an omnivore.", {});
  }
]), ["Sort consumers by diet: plants only, animals only, or both.", "The bear item is the trap: one animal food in the list changes the class."]);

E("s7-u1-niche-reason", 1, ["SC7.1.3"], 2, "gen", function () {
  var pairs = [
    { a: "one warbler species feeds on insects near the top of the spruce trees", b: "another warbler species feeds on insects on the lower branches of the same trees" },
    { a: "one duck species dabbles at the surface for seeds", b: "another duck species dives to the bottom for molluscs" },
    { a: "an owl hunts mice in a meadow at night", b: "a hawk hunts mice in the same meadow by day" },
    { a: "one bat species catches insects high over a pond", b: "another bat species catches insects low along the shoreline" }
  ];
  var p = pick(pairs);
  return mcq("In one habitat, " + p.a + ", while " + p.b + ". The two species can share the habitat mainly because",
    "they occupy different niches, so they do not compete for exactly the same food in the same way",
    ["they belong to the same population, so the habitat's food is shared equally between them",
     "one of the two species is a producer, so it does not need the food the other species uses",
     "the habitat contains unlimited food, so competition between species never happens there"],
    "A niche is the role an organism plays, including how and where it gets its food. These two species take the same kind of food in different places or at different times, so their niches differ and direct competition is avoided. Neither species is a producer, and no habitat has unlimited food.", {});
}, ["The two species eat similar food. What differs between them: place, time, or method?", "That difference is exactly what the word niche names."]);

/* ---------- SC7.1.4 Classifying organisms ---------- */

E("s7-u1-classify-set", 1, ["SC7.1.4"], 1, "gen", function () {
  var sets = [
    { orgs: "spruce tree, grasses, cattails and algae", role: "producers", why: "every organism in the set makes its own food" },
    { orgs: "moose, snowshoe hare, caribou and beaver", role: "consumers", why: "every organism in the set eats other organisms" },
    { orgs: "bacteria, fungi, moulds and mushrooms", role: "decomposers", why: "every organism in the set breaks down dead material" },
    { orgs: "lynx, owl, fox and weasel", role: "consumers", why: "every organism in the set eats other organisms" }
  ];
  var s = pick(sets);
  var roles = ["producers", "consumers", "decomposers"];
  return mcq("A student groups these organisms together: " + s.orgs + ". The group is correctly classified as",
    s.role,
    roles.filter(function (r) { return r !== s.role; }).concat(["a mixture of all three roles"]),
    "The set is classified as " + s.role + " because " + s.why + ". Check each organism in a set before deciding: a single organism from another role would break the group.", {});
}, ["Test every organism in the set, not just the first one.", "If all four make their own food, eat, or break down the dead, the whole set takes that one role."]);

E("s7-u1-classify-set-hard", 1, ["SC7.1.4"], 1, "gen", function () {
  var qs = [
    { stem: "Which of the following organisms is a decomposer?", key: "Bacteria in the soil",
      dis: ["A crow feeding on a dead rabbit", "A vulture circling over a carcass", "Moss growing on a rock"],
      sol: "Bacteria break down dead material chemically and absorb the nutrients, which is the decomposer role. Crows and vultures are scavengers: they eat dead animals but do not break material down the way decomposers do. Moss is a producer." },
    { stem: "Which of the following organisms is a decomposer?", key: "A fungus growing through a rotting log",
      dis: ["A maggot feeding inside a dead fish", "An earthworm eating fallen leaves", "Algae growing on a pond rock"],
      sol: "The fungus breaks the dead wood down and absorbs nutrients from it, the decomposer role. Maggots and earthworms eat dead material as consumers (detritus feeders) without the chemical breakdown that defines decomposers at this level, and algae are producers." },
    { stem: "Which of the following organisms is a scavenger rather than a decomposer?", key: "A raven feeding on a dead seal",
      dis: ["Bacteria coating a dead fish", "A mushroom on a fallen birch", "Mould spreading on stale bread"],
      sol: "The raven eats the dead animal's flesh, which is scavenging. Bacteria, mushrooms and moulds break dead material down and absorb it, which is decomposing. The boundary is eating pieces of the dead organism versus breaking it down and absorbing it." }
  ];
  var q = pick(qs);
  return mcq(q.stem, q.key, q.dis, q.sol, {});
}, ["Scavengers eat the dead; decomposers break it down and absorb it.", "Look for the organism that does the chemical breaking down."]);

E("s7-u1-ecosystem-infer", 1, ["SC7.1.4"], 2, "var", varset([
  function () {
    return mcq("A field notebook lists the organisms found at one site: cattails, pondweed, frogs, minnows, snails and herons. The site is best identified as",
      "a pond ecosystem",
      ["a barrens ecosystem", "a desert ecosystem", "a spruce forest ecosystem"],
      "Every organism on the list lives in or around shallow fresh water: cattails and pondweed grow in it, and frogs, minnows, snails and herons feed in it. The organism set points to a pond.", {});
  },
  function () {
    return mcq("A field notebook lists the organisms found at one site: spruce trees, mosses, red squirrels, moose, mushrooms and lynx. The site is best identified as",
      "a spruce forest ecosystem",
      ["a grassland ecosystem", "a pond ecosystem", "a rocky shoreline ecosystem"],
      "Spruce trees dominate the list, and squirrels, moose, mushrooms and lynx are forest organisms. The set fits a spruce forest, not open grassland, water or shoreline.", {});
  }
]), ["Read the whole list and ask what kind of place all of them could share.", "The plants usually give the place away first; then check the animals fit."]);

/* ---------- SC7.1.5 Energy in a food chain ---------- */

E("s7-u1-energy-source", 1, ["SC7.1.5"], 1, "gen", function () {
  var kind = ri(1, 2);
  if (kind === 1) {
    var chains = ["grass, grasshoppers and frogs", "algae, water fleas and minnows", "spruce needles, squirrels and martens", "clover, bees and dragonflies"];
    return mcq("Consider the organisms " + pick(chains) + ". The original source of the energy in this food chain is",
      "the Sun",
      ["the soil", "the producer's seeds", "the wind"],
      "Almost every food chain runs on sunlight. Producers capture the Sun's energy in photosynthesis, and every later link gets its energy by eating an earlier one. Soil, seeds and wind supply materials or conditions, not the chain's energy.", {});
  }
  return mcq("Which word equation correctly shows photosynthesis?",
    "carbon dioxide + water -> food (sugar) + oxygen",
    ["carbon dioxide + oxygen -> food (sugar) + water", "food (sugar) + water -> carbon dioxide + oxygen", "food (sugar) + oxygen -> carbon dioxide + water"],
    "In photosynthesis a producer takes in carbon dioxide and water and, using sunlight energy, makes food (sugar) and releases oxygen. The last option is the reverse process, respiration.", {});
}, ["Trace the energy backwards: eater to eaten, all the way to the first link.", "Photosynthesis builds food; respiration breaks it down. Do not mix the two equations."]);

E("s7-u1-chain-order", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows four organisms from a pond, not yet linked. Which sequence shows the correct flow of energy through a food chain made from these organisms?",
      "Algae -> water flea -> minnow -> heron",
      ["Algae -> minnow -> water flea -> heron", "Heron -> minnow -> water flea -> algae", "Water flea -> algae -> minnow -> heron"],
      "Energy flows from the organism eaten to the eater. Algae (producer) are eaten by water fleas, water fleas by minnows, and minnows by herons, so the chain runs algae, water flea, minnow, heron.", {});
    q.figure = s7ChainSVG(["Heron", "Minnow", "Algae", "Water flea"], false);
    return q;
  },
  function () {
    var q = mcq("The diagram shows a completed food chain. In this chain, the minnow is best described as",
      "a consumer that is eaten by the heron",
      ["a consumer that eats the heron", "a decomposer that breaks down the algae", "a producer that feeds the water flea"],
      "Arrows point in the direction of energy flow, from the organism eaten to the eater. The arrow runs from the minnow to the heron, so the heron eats the minnow; the minnow is a consumer (it eats the water flea) and is itself prey for the heron.", {});
    q.figure = s7ChainSVG(["Algae", "Water flea", "Minnow", "Heron"], true);
    return q;
  }
]), ["Arrows in a food chain point from the food to the feeder: follow the energy.", "Start every chain at the producer and ask, at each step, who eats this?"]);

E("s7-u1-energy-transfer", 1, ["SC7.1.5"], 2, "var", varset([
  function () {
    return mcq("A moose eats grass and twigs. What happens to most of the energy in the food the moose eats?",
      "It is used for the moose's life processes, and much of it is lost from the chain as heat",
      ["It is stored in the moose's body, ready to pass on in full to whatever eats the moose",
       "It is returned to the grass when the moose breathes out, keeping the chain in balance",
       "It stays in the moose's droppings, which hold nearly all of the energy the moose took in"],
      "An animal uses most of the energy it takes in just to live: moving, growing, keeping warm. That energy leaves the food chain as heat, and only the smaller part stored in body tissue can pass to the next link. Energy is never returned to the producers to be used again.", {});
  },
  function () {
    return mcq("A food chain has far fewer lynx than snowshoe hares, and far fewer hares than the plants they eat. The best explanation is that",
      "energy is lost at every link, so each higher link can support fewer organisms",
      ["top consumers reproduce more slowly, and that alone sets the numbers at every link",
       "plants grow faster than animals, so there will always be more plants for other reasons",
       "predators keep the numbers of their prey low, which explains the pattern at every link"],
      "Because most energy is used or lost as heat at each link, only a fraction reaches the next one. Less available energy means fewer organisms can be supported at each higher link, which produces the pattern at every step of the chain, not just where predators act.", {});
  }
]), ["Follow one mouthful of food: living costs energy at every step.", "If most energy passed on, the numbers at each link would be about equal. They are not."]);

E("s7-u1-cr-energy-flow", 1, ["SC7.1.5"], 3, "var", varset([
  function () {
    return textq("Trace the energy in this food chain from its source to the top consumer: grass -> grasshopper -> frog -> heron. In your answer, name the original source of the energy, describe how it enters the chain, and explain why the heron ends up with only a small part of the energy the grass captured.",
      ["The Sun is the source; grass captures it by photosynthesis and stores it as food; each eater uses most of the energy it takes in for life processes and loses much as heat, so only a small part is stored in body tissue and passed on, link by link, leaving little for the heron"],
      "<b>Model answer:</b> The original source is the Sun. The grass captures sunlight energy by photosynthesis and stores it in the food it makes, which is how energy enters the chain. The grasshopper eats the grass, but it uses most of that energy for its own life processes (moving, growing, staying alive) and loses much of it as heat; only the part stored in its body can pass on. The same loss happens again at the frog link, and again at the heron link. After three rounds of losses, the heron receives only a small fraction of the energy the grass first captured.<br><br><b>Marking points:</b> 1 mark for naming the Sun as the original source and photosynthesis as the entry point. 1 mark for energy being used for life processes and lost as heat at a link. 1 mark for the losses repeating at every link, so the share shrinks step by step to the top consumer.", {});
  }
]), ["Work link by link: source, entry, then what each eater does with the energy it gets.", "The key idea is that the loss happens at EVERY link, not just once."]);

/* ---------- SC7.1.6 Energy in chains and webs ---------- */

E("s7-u1-energy-loss", 1, ["SC7.1.6"], 1, "gen", function () {
  var chains = [
    { from: "a water flea", to: "a minnow" }, { from: "a grasshopper", to: "a frog" },
    { from: "a snowshoe hare", to: "a lynx" }, { from: "a squirrel", to: "a marten" }
  ];
  var c = pick(chains);
  return mcq("As energy passes from " + c.from + " to " + c.to + " in a food chain, most of the energy is",
    "used by " + c.from + " for its life processes or lost as heat",
    ["passed on unchanged, so the eater receives all of it",
     "stored in the soil when the organism dies and decays",
     "sent back to the producers to be used a second time"],
    "The first organism spends most of the energy it took in on living: moving, growing and keeping its body working, and much of it leaves as heat. Only the small part stored in its body tissues is available to the eater. Energy does not cycle back to producers; matter cycles, energy flows through and out.", {});
}, ["Matter cycles in an ecosystem, but energy does not. Keep the two apart.", "Ask what the first organism does with energy before it is ever eaten."]);

E("s7-u1-web-readoff", 1, ["SC7.1.6"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. Which organisms does the frog eat?",
      "Minnows and dragonflies",
      ["Algae and cattails", "Minnows and herons", "Snails and water fleas"],
      "Arrows point from the organism eaten to the eater. The arrows running into the frog come from the minnow and the dragonfly, so those are what the frog eats. The arrow from the frog runs on to the heron, which means the heron eats the frog, not the reverse.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. Which organism is eaten by BOTH the lynx and the owl?",
      "The hare",
      ["The marten", "The squirrel", "The moose"],
      "Follow the arrows into each predator. Arrows run from the hare to both the lynx and the owl, so both eat the hare. The squirrel is eaten by the marten and the owl but not the lynx, and nothing in the web eats the moose.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Arrows point at the eater. Find the arrows that end at the animal in the question.", "To find shared prey, list what each predator's incoming arrows come from and compare the lists."]);

E("s7-u1-web-removal", 1, ["SC7.1.6"], 3, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. If every minnow in the pond were removed, the frog population would most likely",
      "decrease, because the frogs lose one of their two food sources",
      ["decrease, because the herons would have nothing else to eat at all",
       "increase, because the water fleas the minnows ate would all go to the frogs",
       "stay the same, because frogs can switch to eating algae and cattails"],
      "In the web, frogs eat minnows and dragonflies. Removing minnows removes half the frogs' food supply, so the frog population would most likely fall. Frogs do not eat the producers in this web, and herons also eat frogs, so the heron link does not rescue the frogs.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. If the hare population crashed after a disease outbreak, which population would be affected FIRST and most directly, besides the hares themselves?",
      "The lynx and owl populations, which both feed on hares",
      ["The grass population, which would be eaten down by hungry moose",
       "The marten population, which hunts squirrels in the same trees",
       "The balsam fir population, which the hares never fed on at all"],
      "The hare's outgoing arrows run to the lynx and the owl: they are the hare's predators, so they feel the loss of their food source first and most directly. The marten eats squirrels, and the fir is not hare food in this web.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Find the removed organism's arrows: who eats it, and what else do those eaters eat?", "The first effects travel one arrow away from the change. Start there."]);

E("s7-u1-cr-web-change", 1, ["SC7.1.6"], 3, "var", varset([
  function () {
    var q = textq("Use the meadow food web diagram. A farmer sprays the meadow and the grasshopper population falls sharply. Explain the effect of this change on TWO other populations in the web, giving the reason for each effect.",
      ["Effects traced through arrows, for example: frogs decrease because grasshoppers are their food in the web; mice decrease or are pressured because they also eat grasshoppers and now compete for less; snakes decrease later because frogs and mice (their food) decline; hawks may decline as mice and snakes decline"],
      "<b>Model answer:</b> Any two effects correctly traced through the web earn the marks. Frog population: frogs eat grasshoppers (arrow from grasshopper to frog), so with far fewer grasshoppers the frogs have less food and their population falls. Snake population: snakes eat frogs and mice; mice also depend on grasshoppers for part of their food, so both of the snake's food sources are squeezed and the snake population falls as well. Hawk numbers could also fall, since hawks eat mice and snakes.<br><br><b>Marking points:</b> 1 mark for a first population correctly identified as affected. 1 mark for the reason, traced through the arrows of the web. 1 mark for a second population with its reason, traced the same way.", {});
    q.figure = s7WebQ(S7_WEB_MEADOW);
    return q;
  }
]), ["Start at the grasshoppers and follow their outgoing arrows to what eats them.", "Then follow one more step: what happens to the animals that eat those animals?"]);

/* ---------- SC7.1.7 Recycling of matter ---------- */

E("s7-u1-decomposer-role", 1, ["SC7.1.7"], 1, "gen", function () {
  var places = [
    { p: "a forest", d: "fallen leaves and dead branches" },
    { p: "a pond", d: "dead algae and plant stems" },
    { p: "a meadow", d: "dead grasses and animal droppings" }
  ];
  var s = pick(places);
  return mcq("In " + s.p + ", decomposers such as bacteria and fungi work on " + s.d + ". Their role in the ecosystem is to",
    "break the dead material down and return its nutrients to the soil for plants to use again",
    ["eat the dead material and store its nutrients in their bodies permanently",
     "change the dead material into sunlight energy that producers can capture",
     "remove the dead material from the ecosystem so its nutrients are gone for good"],
    "Decomposers break dead material down, and the nutrients in it are released back into the soil, where producers take them up again. That is how matter is recycled. The nutrients are not locked away, destroyed, or turned into energy.", {});
}, ["The key word is recycled: where do the nutrients in dead material end up?", "Plants cannot take in dead leaves whole. Something has to release what is in them."]);

E("s7-u1-nutrient-cycle", 1, ["SC7.1.7"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows the general cycle of nutrients in an ecosystem. Which arrow shows decomposers returning nutrients to the soil?",
      "Arrow D",
      ["Arrow A", "Arrow B", "Arrow C"],
      "Arrow D runs from the decomposers down to the soil: that is the step where breakdown releases nutrients back into the soil. Arrow A is plants taking nutrients up, arrow B is animals eating plants, and arrow C is dead organisms and wastes reaching the decomposers.", {});
    q.figure = S7_NUTRIENT_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows the general cycle of nutrients in an ecosystem. Which arrow shows nutrients entering a producer?",
      "Arrow A",
      ["Arrow B", "Arrow C", "Arrow D"],
      "Arrow A runs from the soil to the plants: producers take nutrients in from the soil through their roots. Arrow B is feeding (plants to animals), arrow C carries dead material to the decomposers, and arrow D is the decomposers releasing nutrients back to the soil.", {});
    q.figure = S7_NUTRIENT_SVG;
    return q;
  }
]), ["Name the start and end of each arrow before choosing.", "Decomposers sit between dead organisms and the soil in the cycle."]);

E("s7-u1-cr-recycling", 1, ["SC7.1.7"], 2, "var", varset([
  function () {
    return textq("A maple leaf falls to the forest floor in autumn. Describe the journey of the nutrients in that leaf until they become part of a living plant again. Name every group of organisms that plays a part.",
      ["Decomposers (bacteria and fungi, with small soil animals helping) break the leaf down; the nutrients are released into the soil; a plant takes them up through its roots and uses them to build new tissue"],
      "<b>Model answer:</b> On the forest floor the leaf is broken down by decomposers: fungi and bacteria digest the dead tissue (small soil animals shred it and speed the process). As the leaf breaks down, the nutrients it contains are released into the soil. A living plant then takes those nutrients up through its roots and uses them to build new leaves, stems and roots, so the leaf's nutrients are part of a living plant again.<br><br><b>Marking points:</b> 1 mark for decomposers (bacteria and fungi) breaking the leaf down and releasing its nutrients into the soil. 1 mark for a plant taking the nutrients up through its roots and using them to grow.", {});
  }
]), ["Think of it as a relay: dead leaf, then what breaks it down, then where the nutrients wait, then who collects them.", "Matter is recycled, so the journey must end back inside a living organism."]);

/* ---------- SC7.1.8 Changes over time: succession ---------- */

E("s7-u1-succession-identify", 1, ["SC7.1.8"], 1, "var", varset([
  function () {
    return mcq("A gravel pit was abandoned twenty years ago. At first the bare gravel grew only lichens and mosses. Grasses followed, then shrubs, and now young spruce trees are growing among the shrubs. The change described is",
      "ecological succession",
      ["ecological competition", "ecological recycling", "ecological tolerance"],
      "The gradual, ordered replacement of one community by another over time is ecological succession. The site shows the classic pattern: simple organisms first, then grasses, shrubs and trees in turn.", {});
  },
  function () {
    return mcq("A beaver pond slowly fills with sediment and dead plant material year after year. Grasses begin to grow where open water used to be. This gradual change is an example of",
      "ecological succession",
      ["ecological competition", "ecological recycling", "ecological tolerance"],
      "One community (open-water pond life) is gradually being replaced by another (meadow grasses) as conditions change. That ordered change of communities over time is ecological succession.", {});
  }
]), ["Look for the pattern over time: one community replacing another in a sequence.", "Competition and recycling happen inside a community; this item describes the community itself changing."]);

E("s7-u1-succession-types", 1, ["SC7.1.8"], 1, "gen", function () {
  var pool = [
    { s: "a new volcanic island rises from the sea and lichens are the first organisms to grow on its bare rock", t: "Primary succession", w: "it begins on bare rock where no soil or community existed before" },
    { s: "a spruce forest burns in a wildfire, and grasses and fireweed grow back the next summer from the soil that remains", t: "Secondary succession", w: "a community was disturbed but the soil survived, so regrowth starts from an existing base" },
    { s: "a glacier melts back and exposes bare rock and gravel that no organism has lived on", t: "Primary succession", w: "it begins on a brand-new surface with no soil" },
    { s: "a hay field is left uncut, and shrubs and then young trees move in over twenty years", t: "Secondary succession", w: "the soil and seed sources of the old community remain, so this is regrowth after a change, not a start from bare surface" }
  ];
  var it = pick(pool);
  var other = it.t === "Primary succession" ? "Secondary succession" : "Primary succession";
  return mcq("Which type of succession is described? " + it.s.charAt(0).toUpperCase() + it.s.slice(1) + ".",
    it.t,
    [other, "Climax succession", "Cyclic succession"],
    it.t + " is correct because " + it.w + ". Primary succession starts where no soil or previous community exists; secondary succession is regrowth where soil remains after a disturbance.", {});
}, ["Ask one question first: was there soil and a community there before?", "Bare new surface means primary; disturbed but soiled means secondary."]);

E("s7-u1-succession-sequence", 1, ["SC7.1.8", "SC7.3.11"], 2, "var", varset([
  function () {
    return mcq("After a wildfire burns a spruce forest, which sequence shows the order in which plants most likely return?",
      "Grasses and fireweed -> shrubs -> young spruce -> mature spruce forest",
      ["Grasses and fireweed -> young spruce -> mature spruce forest -> shrubs",
       "Shrubs -> grasses and fireweed -> young spruce -> mature spruce forest",
       "Young spruce -> grasses and fireweed -> shrubs -> mature spruce forest"],
      "After a fire, fast-growing grasses and fireweed colonize first, shrubs follow as the soil deepens and stabilizes, and spruce seedlings then grow up through the shrubs until a mature spruce forest stands again. Trees come last, not first, because they grow slowly and need the conditions the earlier stages create.", {});
  },
  function () {
    return mcq("A pond is slowly filling in over many years. Which sequence shows the order of change most likely to occur?",
      "Open water -> marsh plants at the edges -> wet meadow -> shrubs and trees",
      ["Open water -> shrubs and trees -> wet meadow -> marsh plants at the edges",
       "Marsh plants at the edges -> open water -> shrubs and trees -> wet meadow",
       "Wet meadow -> marsh plants at the edges -> open water -> shrubs and trees"],
      "Sediment and dead material build up from the edges inward, so marsh plants take hold first, then the filled ground supports a wet meadow, and finally shrubs and trees colonize the dry land. The sequence runs from water to land, never the reverse.", {});
  }
]), ["At each step ask: could this stage grow in the conditions the last stage left behind?", "The first stage after a disturbance is always the fast, simple one."]);

E("s7-u1-cr-succession-compare", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return textq("Compare primary and secondary succession. In your answer, state how the starting conditions differ, and give one example of where each type could occur in Newfoundland and Labrador.",
      ["Primary succession starts on a bare surface with no soil (new volcanic or glacially exposed rock, a fresh landslide scar); secondary succession is regrowth where soil remains after a disturbance (forest regrowing after fire or harvesting, an abandoned field)"],
      "<b>Model answer:</b> Primary succession begins on a bare surface where there is no soil and no previous community, so it starts with organisms like lichens that can live on rock and begin soil formation; in this province, an example is rock newly exposed by a retreating glacier or a fresh landslide scar. Secondary succession is the regrowth of a community where soil already exists after a disturbance; an example is a spruce forest growing back after a wildfire, or shrubs and trees taking over an abandoned hay field. The starting conditions are the difference: no soil versus soil already present.<br><br><b>Marking points:</b> 1 mark for primary succession correctly described (bare surface, no soil) with a valid example. 1 mark for secondary succession correctly described (soil remains after disturbance) with a valid example.", {});
  }
]), ["The whole comparison turns on one thing: what is on the ground at the start.", "Give a real place for each type; an example proves the definition."]);

/* ---------- SC7.2.1 Scientifically appropriate word choice ---------- */

E("s7-u1-term-context", 1, ["SC7.2.1"], 1, "var", varset([
  function () {
    return mcq("Which statement uses the scientific terms correctly?",
      "The grasses are producers, the hares that eat them are consumers, and fungi return nutrients as decomposers",
      ["The grasses are consumers, the hares that eat them are producers, and fungi return nutrients as decomposers",
       "The grasses are producers, the hares that eat them are decomposers, and fungi return nutrients as consumers",
       "The grasses are decomposers, the hares that eat them are consumers, and fungi return nutrients as producers"],
      "Producers make their own food (grasses), consumers eat other organisms (hares), and decomposers break down dead material (fungi). Each wrong option swaps one pair of terms, so check all three roles before choosing.", {});
  },
  function () {
    return mcq("A student writes: \"The pond water is a biotic factor because fish swim in it.\" The error in this statement is that",
      "the water is an abiotic factor; only the fish are biotic",
      ["the fish are an abiotic factor; only the water is biotic",
       "pond water is a producer, not a factor of either kind",
       "there is no error; anything touching a living thing is biotic"],
      "Biotic means living. The water itself is non-living, so it is an abiotic factor, even though living fish swim in it. A factor is classified by what it is, not by what it touches.", {});
  }
]), ["Check every term in the statement, not just the first one.", "A term is right or wrong by what the thing IS, not by what is near it."]);

E("s7-u1-organization-set", 1, ["SC7.2.1"], 2, "var", varset([
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows a population?",
      "Panel B",
      ["Panel A", "Panel C", "Panel D"],
      "A population is all the members of one species in an area. Panel B shows a group of lynx, one species together. Panel A is a single individual, panel C is several species together (a community), and panel D adds the non-living surroundings (an ecosystem).", {});
    q.figure = S7_ORG_SVG;
    return q;
  },
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows an ecosystem?",
      "Panel D",
      ["Panel A", "Panel B", "Panel C"],
      "An ecosystem includes the living community AND its non-living surroundings. Only panel D shows the sun, pond and soil along with the organisms. Panel A is one individual, B is one species (a population), and C is the living species together (a community) without the abiotic parts.", {});
    q.figure = S7_ORG_SVG;
    return q;
  },
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows a community?",
      "Panel C",
      ["Panel A", "Panel B", "Panel D"],
      "A community is all the different species living together in an area: panel C shows lynx, hare and spruce together. It is not an ecosystem because the non-living parts are not shown; panel D adds those.", {});
    q.figure = S7_ORG_SVG;
    return q;
  }
]), ["Count species first: one organism, one species, many species, then many species plus non-living parts.", "The levels build in order: individual, population, community, ecosystem."]);

/* ---------- SC7.2.2 The food web as a tool ---------- */

E("s7-u1-web-roles", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram, in which each organism carries a letter. Which letter marks the only organism that eats the frog?",
      "H",
      ["E", "F", "G"],
      "Follow the arrows out of the frog: only one arrow leaves the frog, and it runs to the heron, letter H. The minnow (E) and dragonfly (F) are eaten by the frog (G), not the other way around.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram, in which each organism carries a letter. The organism at position D is best described as",
      "a consumer that is eaten by both the marten and the owl",
      ["a consumer that is eaten by both the lynx and the owl",
       "a producer that is eaten by both the marten and the moose",
       "a producer that is eaten by both the hare and the squirrel"],
      "Position D is the squirrel. Arrows run from the squirrel to the marten and to the owl, so both eat it, and the squirrel itself eats balsam fir seeds, making it a consumer. The hare is the organism eaten by both the lynx and the owl.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Find the letter first, then trace only that organism's arrows.", "Arrows point at the eater: an arrow FROM X TO Y means Y eats X."]);

E("s7-u1-web-chains", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. Which of these food chains is actually part of this web?",
      "Algae -> water flea -> minnow -> heron",
      ["Algae -> minnow -> dragonfly -> frog", "Cattail -> snail -> frog -> heron", "Heron -> frog -> dragonfly -> algae"],
      "Check each arrow: algae are eaten by water fleas, water fleas by minnows, and minnows by herons, so that chain exists link by link. Minnows do not eat algae directly in this web, nothing eats the snail, and the last chain runs the arrows backwards.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. Which of these food chains is actually part of this web?",
      "Grass -> hare -> owl",
      ["Balsam fir -> squirrel -> lynx", "Grass -> moose -> lynx", "Owl -> hare -> grass"],
      "Grass is eaten by hares and hares are eaten by owls, so that chain checks out link by link. Squirrels are eaten by martens and owls but not by lynx in this web, nothing eats the moose, and the last option runs the energy flow backwards.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Test a chain one arrow at a time; a chain fails if any single link is missing.", "Every arrow in your chain must exist in the diagram, pointing the same way."]);

E("s7-u1-web-predict", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = mcq("Use the meadow food web diagram. If all the clover in the meadow died in a drought, which population would be affected first and most directly?",
      "The bees, because clover is their only food source in the web",
      ["The frogs, because clover is their only food source in the web",
       "The hawks, because clover is their only food source in the web",
       "The mice, because clover is their only food source in the web"],
      "In the web, the only arrow into the bees comes from the clover: it is their sole food source shown. Grasshoppers also eat clover but eat grass as well, and frogs, hawks and mice do not eat clover at all, so the bees are hit first and hardest.", {});
    q.figure = s7WebQ(S7_WEB_MEADOW);
    return q;
  },
  function () {
    var q = mcq("Use the pond food web diagram. A summer of heavy heron predation sharply reduces the frog population. Which prediction follows most directly from the web?",
      "Dragonfly numbers rise, because one of their predators is now scarce",
      ["Dragonfly numbers fall, because the frogs were their main food source",
       "Minnow numbers fall, because the herons switch entirely to minnows",
       "Snail numbers rise, because the frogs were eating most of the snails"],
      "Frogs eat dragonflies in this web, so fewer frogs means less predation on dragonflies and their numbers rise. Frogs do not eat snails, and herons already eat minnows alongside frogs, so neither of those predictions follows directly.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  }
]), ["A population with only one incoming arrow has no backup food source.", "Predict one arrow at a time: food lost, eater down; predator lost, prey up."]);

E("s7-u1-cr-web-interpret", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = textq("Use the forest food web diagram. (a) Name the two producers in the web. (b) Explain what the arrows in a food web show. (c) A spruce budworm outbreak kills most of the balsam fir. State ONE effect this could have on the web and explain it using the arrows.",
      ["(a) Grass and balsam fir. (b) Arrows show the flow of energy: they point from the organism that is eaten to the organism that eats it. (c) Effects traced by arrows, for example: moose lose one of their two foods and may decline or depend wholly on grass; squirrels lose their only food in the web and decline; martens and owls then lose the squirrels"],
      "<b>Model answer:</b> (a) The producers are the grass and the balsam fir: nothing in the web points into them as food for themselves; every chain starts at one of them. (b) An arrow points from the organism that is eaten to the organism that eats it, so the arrows trace how energy flows through the web. (c) Example: the squirrel's only incoming arrow is from the balsam fir, so if the fir mostly dies, the squirrels lose their food supply and their population falls; the marten and the owl, which both eat squirrels, are then affected in turn. (The moose also eats fir, but it has grass as a second source.)<br><br><b>Marking points:</b> 1 mark for both producers named (grass and balsam fir). 1 mark for the arrow meaning: energy flow, from the eaten to the eater. 1 mark for one effect of the fir loss traced correctly through the arrows.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Producers are the organisms with no incoming food arrows; everything starts there.", "For part (c), pick one organism that eats the fir and follow what happens to it."]);

/* ---------- SC7.2.3 Silviculture ---------- */

E("s7-u1-silviculture-why", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Silviculture, the practice of managing how forests grow back, developed mainly because",
      "people needed a continuous supply of wood, so cut forests had to be renewed on purpose",
      ["people needed forests cleared permanently, so regrowth had to be stopped after cutting",
       "people needed wood only once, so a single harvest could supply every future demand",
       "people needed paper, so natural forests were replaced everywhere by plantations of one species"],
      "Wood is used continuously for lumber, paper, fuel and more. Once cutting outpaced natural regrowth, renewing the forest deliberately became necessary so the supply would not run out: that need is what produced silviculture.", {});
  },
  function () {
    return mcq("Which statement best explains why natural regrowth alone was not enough to meet the demand for wood?",
      "Harvesting removed trees faster than the forest could replace them on its own",
      ["Harvesting removed trees so slowly that young forests crowded out the old ones",
       "Natural regrowth produced more wood than the mills of the province could use",
       "Natural regrowth stopped completely once the first trees were cut in an area"],
      "Demand kept growing while natural regrowth stayed slow. When removal outruns replacement, the forest shrinks, so managing the regrowth became a deliberate practice.", {});
  }
]), ["Start from the demand: is wood needed once, or over and over?", "Silviculture is about the NEXT forest, not the one being cut."]);

E("s7-u1-silviculture-practice", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Which of the following is a silviculture practice?",
      "Planting spruce seedlings on a harvested site so a new stand grows back",
      ["Building a woods road so trucks can reach a harvesting site more easily",
       "Milling logs into lumber at a sawmill for house construction in the town",
       "Selling cutting permits to companies that want to harvest in the region"],
      "Silviculture is the tending of the growing forest: planting, thinning and otherwise renewing the stand. Roads, milling and permits belong to harvesting and industry, not to growing the next forest.", {});
  },
  function () {
    return mcq("A forestry crew returns to a young stand and removes some of the crowded trees so the remaining trees have room, light and nutrients to grow well. This practice is called",
      "thinning, a silviculture practice",
      ["clearcutting, a harvesting practice", "milling, an industrial practice", "surveying, a mapping practice"],
      "Removing some trees to improve the growth of the rest is thinning, and it is part of silviculture because its purpose is the health and growth of the standing forest, not the removal of the crop.", {});
  }
]), ["Ask whether the action grows the next forest or removes the present one.", "Planting and thinning tend trees; cutting and milling take them away."]);

E("s7-u1-cr-silviculture", 1, ["SC7.2.3"], 2, "var", varset([
  function () {
    return textq("For hundreds of years, people in this province cut wood for fuel, boats and building, taking the trees nearest to their communities. Explain how this growing, continuous need for wood led to the development of silviculture as a deliberate practice.",
      ["As demand continued and nearby stands were cut faster than they regrew, people faced shrinking forests and longer trips for wood; ensuring a future supply required renewing forests on purpose: planting, protecting young stands and managing growth, which is silviculture"],
      "<b>Model answer:</b> Wood was not a one-time need: every year brought new demand for fuel, boats, houses and later pulp and lumber. Cutting concentrated near communities, and trees were removed faster than natural regrowth replaced them, so usable forest near settlements shrank and people had to travel farther for wood. A continuous supply could only be guaranteed by renewing the forest deliberately: planting harvested sites, protecting and tending young stands, and planning harvests around regrowth. That deliberate renewal is silviculture, and it developed because the need for wood never stopped.<br><br><b>Marking points:</b> 1 mark for the pressure: continuous demand with cutting outrunning natural regrowth. 1 mark for the response: deliberate renewal (planting, tending, planning) named as silviculture and tied to securing the supply.", {});
  }
]), ["Tell it as a cause and a response: what pressure built up, and what did people start doing about it?", "The word continuous is doing the work in this indicator."]);

/* ---------- SC7.2.4 Harvesting decisions (SR entries are knowledge support for the decision CR) ---------- */

E("s7-u1-harvest-knowledge", 1, ["SC7.2.4"], 2, "var", varset([
  function () {
    return mcq("Which of the following is a genuine environmental disadvantage of clearcutting a forest site?",
      "Removing every tree exposes the soil, so rain can wash it into nearby streams",
      ["Removing every tree makes the site replant itself faster than any other method",
       "Removing every tree protects the streams nearby from sediment and runoff",
       "Removing every tree leaves the wildlife habitat of the site completely unchanged"],
      "With no roots or canopy left, clearcut ground erodes: soil washes into streams, harming fish habitat. Clearcutting is usually the cheapest harvest method, which is its advantage; habitat loss and erosion are its real disadvantages.", {});
  },
  function () {
    return mcq("Selective harvesting, in which only some trees are removed and the rest of the stand is left standing, is usually more expensive per load of wood than clearcutting mainly because",
      "crews and machines must work around the standing trees and make more trips for less wood",
      ["the trees left standing have to be paid for twice before the wood can be sold",
       "selective sites are always farther from the mills than clearcut sites are located",
       "the wood from a selective harvest is worth less per log than clearcut wood is"],
      "Working around standing trees is slower and yields less wood per trip, so costs per load rise. The wood itself is the same product; the difference is the effort of taking part of a stand while leaving the rest undamaged.", {});
  }
]), ["Keep advantages and disadvantages in separate columns as you read each option.", "A claimed advantage that is really a cost, or the reverse, is the trap in these items."]);

E("s7-u1-harvest-effects", 1, ["SC7.2.4"], 1, "var", varset([
  function () {
    return mcq("After a site is clearcut, planting seedlings promptly is important mainly because the young trees",
      "hold the soil and restart the forest before erosion and competing shrubs take over",
      ["stop all other plants from growing on the site for the life of the new stand",
       "make the site ready for a second clearcut within two or three years of planting",
       "remove the need to leave any buffer of trees along the streams on the site"],
      "Bare ground erodes and shrubs can crowd out slow-starting seedlings. Prompt planting gets roots into the soil and gives the new stand a head start. It does not remove the need for stream buffers, and a new stand takes decades, not years, to mature.", {});
  }
]), ["Think about what bare ground does in the rain, and what races the seedlings to grow.", "Replanting is about securing the next stand early, not about finishing the job."]);

E("s7-u1-cr-harvest-decision", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return textq("A company proposes to harvest a spruce valley in central Newfoundland. The valley has a salmon stream running through it, and the town nearby depends on the woods work for jobs. The company offers two plans: clearcut the whole valley in one season, or selective harvest over ten years, taking about a third of the trees. Choose ONE plan and defend it as the better decision. Your defence must use at least one environmental advantage and address at least one disadvantage of your chosen plan.",
      ["Either plan can earn full marks. Clearcut defence: cheaper and faster, one disturbance then replanting, jobs secured now; must address erosion or stream risk and habitat loss, with mitigation such as buffers. Selective defence: soil and habitat largely stay, stream protected, work spread over ten years; must address higher cost per load and repeated machine disturbance"],
      "<b>Model answer:</b> (Selective plan, as an example.) The selective harvest is the better decision. Environmentally, leaving two thirds of the stand standing keeps roots holding the soil, so the salmon stream is protected from the sediment that a full clearcut would wash into it, and much of the valley's wildlife habitat survives the harvest. Jobs also last: the work is spread over ten years instead of ending in one season. The plan's real disadvantage is cost: crews work around standing trees and haul less wood per trip, so the wood costs more to produce, and machines enter the valley repeatedly over the decade. On balance the stream and the longer employment outweigh the higher cost. A defence of the clearcut plan earns the same marks if it uses a real advantage (lowest cost, one disturbance followed by prompt replanting and buffers) and honestly addresses a real disadvantage.<br><br><b>Marking points:</b> 1 mark for a clear choice of plan. 1 mark for at least one genuine environmental advantage of the chosen plan, correctly explained. 1 mark for a genuine disadvantage of the chosen plan, addressed rather than ignored.", {});
  }
]), ["There is no single right plan here; there is only a well-defended one.", "Name a real cost of YOUR plan and deal with it. Pretending it has none loses the mark."]);

/* ---------- SC7.2.5 Boreal forest ecology and practice ---------- */

E("s7-u1-boreal-practice", 1, ["SC7.2.5"], 1, "var", varset([
  function () {
    return mcq("Black spruce, the main tree of the boreal forest, has cones that stay closed on the tree for years and open to release their seeds after the heat of a fire. This adaptation means the boreal forest is best described as",
      "adapted to renew itself after fire, a natural part of its cycle",
      ["unable to survive any disturbance, since fire destroys its seeds",
       "dependent on people planting seedlings after every disturbance",
       "slowest to recover of all forest types after any kind of damage"],
      "Cones that open with heat drop seeds onto freshly burned ground exactly when the parent trees are gone: the forest is built to regenerate after fire. Fire is a renewal event in the boreal cycle, not simply a disaster.", {});
  },
  function () {
    return mcq("In the boreal forest, insect outbreaks such as spruce budworm kill large patches of fir and spruce. For the forest ecosystem, these outbreaks are",
      "a natural disturbance that creates openings where new growth and other species move in",
      ["a sign that the forest has stopped following its natural cycle of renewal",
       "damage that the forest cannot recover from without people replanting it",
       "harmful only to the trees, with no effect on any other part of the forest"],
      "Budworm outbreaks are part of the boreal cycle: the dead patches let in light, young trees and shrubs grow, and the wildlife community shifts. The forest renews itself afterward without planting.", {});
  }
]), ["Ask whether the disturbance is foreign to this forest or part of how it has always worked.", "The boreal forest's own adaptations are the evidence. Start from the cones."]);

E("s7-u1-boreal-effects", 1, ["SC7.2.5"], 2, "var", varset([
  function () {
    return mcq("Knowing that the boreal forest renews itself in patches after fire, a harvesting company cuts in patches of different sizes and ages across a region instead of clearing one huge area. The positive effect of this practice is that",
      "the region keeps a mix of forest ages, so species that need young forest and species that need old forest both keep habitat",
      ["the region's forest becomes one even age, which is what most wildlife species prefer for habitat",
       "the patches grow back at exactly the same rate, so the harvest can repeat every single year",
       "no part of the region is ever disturbed, so the forest stays exactly as it was before"],
      "Fire leaves a patchwork of ages across the boreal landscape, and patch harvesting copies that pattern. A mix of ages means the full range of habitat survives somewhere in the region at all times, which a single huge cut or a single even-aged forest cannot offer.", {});
  },
  function () {
    return mcq("Harvest planners now leave a strip of uncut trees along both sides of a salmon stream. This practice, borrowed from how natural forests shade and protect waterways, has the positive effect of",
      "keeping the water shaded and cool and stopping soil from washing into the stream",
      ["warming the water so young salmon grow faster through the winter months",
       "diverting the stream so harvest machines can cross it at any point",
       "removing the need to replant the harvested areas beside the stream"],
      "Standing trees shade the water (salmon need it cool) and their roots hold the banks, keeping sediment out. The strip is left permanently; it is not a crossing or a substitute for replanting.", {});
  }
]), ["Both items describe copying a natural pattern. Name the pattern, then the effect follows.", "Ask: what does the natural version of this (fire patches, streamside forest) do for the ecosystem?"]);

E("s7-u1-cr-boreal-example", 1, ["SC7.2.5"], 3, "var", varset([
  function () {
    return textq("Provide ONE example of how our understanding of boreal forest ecology has influenced a harvesting practice, and identify the positive effect of that practice. Your answer must connect the ecology (what we learned about how this forest works) to the practice it produced.",
      ["Any well-connected example, for example: learning that fire renews the boreal forest in patches led to patch harvesting that mimics fire, whose positive effect is a lasting mix of forest ages and habitats; or learning that black spruce reseeds after disturbance led to leaving seed trees or relying on natural seeding on suitable sites"],
      "<b>Model answer:</b> Ecologists established that the boreal forest renews itself through fire, which leaves a patchwork of stands of different ages across the landscape. Harvesting practice changed to copy that pattern: companies cut in patches of varied sizes instead of clearing whole regions at once. The positive effect is that the region always holds some young forest, some middle-aged forest and some old forest at the same time, so the species that depend on each stage keep their habitat and the forest as a whole stays closer to its natural structure.<br><br><b>Marking points:</b> 1 mark for a correct piece of boreal ecology (fire renewal, patch structure, reseeding after disturbance). 1 mark for the harvesting practice that follows from it. 1 mark for the positive effect of the practice, stated as an outcome, not a hope.", {});
  }
]), ["Build the answer in three links: what we learned, what changed, what good it did.", "An example with the ecology missing is just a practice; the indicator asks for the connection."]);

/* ---------- SC7.2.6 Careers (thin feed; SME flag) ---------- */

E("s7-u1-career-match", 1, ["SC7.2.6"], 1, "var", varset([
  function () {
    return mcq("Which career is directly concerned with renewing and tending a forest after harvesting?",
      "Silviculture technician",
      ["Sawmill operator", "Truck dispatcher", "Woodlands surveyor"],
      "A silviculture technician plants, thins and tends young stands: the renewing and tending work itself. The other careers move, process or map wood and land rather than growing the next forest.", {});
  },
  function () {
    return mcq("Which career is directly concerned with protecting fish and wildlife populations in a forest region?",
      "Wildlife officer",
      ["Harvest supervisor", "Lumber grader", "Road engineer"],
      "A wildlife officer monitors and protects fish and wildlife populations and enforces the rules that protect them. The other careers organize cutting, judge lumber quality or build access roads.", {});
  }
]), ["Match the career to the verb: growing, protecting, cutting, processing, or mapping.", "The career name usually contains its own clue. Use it."]);

E("s7-u1-career-scenario", 1, ["SC7.2.6"], 2, "var", varset([
  function () {
    return mcq("For six weeks each spring, Dana walks harvested sites with a crew, checking that seedlings were planted at the right spacing and counting how many survived the winter. Dana's job is most likely",
      "silviculture technician",
      ["harvest supervisor", "lumber grader", "wildlife officer"],
      "Checking planting quality and seedling survival is tending the new stand: silviculture work. A harvest supervisor runs the cutting, a grader judges sawn lumber, and a wildlife officer protects animal populations.", {});
  },
  function () {
    return mcq("Through the fall, Marcus checks hunting licences in the woods, investigates reports of poaching, and helps count the caribou herd. Marcus's job is most likely",
      "wildlife officer",
      ["forestry technician", "harvest supervisor", "silviculture technician"],
      "Licences, poaching investigations and herd counts are wildlife protection work: a wildlife officer. The other careers tend trees or run harvest operations.", {});
  }
]), ["List the tasks in the scenario and ask which career's daily work they are.", "Ignore the season and the name; the duties decide the match."]);

/* ---------- SC7.2.7 Protecting a local habitat (SR entries are knowledge support for the decision CR) ---------- */

E("s7-u1-habitat-influences", 1, ["SC7.2.7"], 1, "var", varset([
  function () {
    return mcq("Which of the following is a human influence that directly removes an organism's habitat?",
      "Draining a wetland to build a parking lot",
      ["A drought drying a wetland for one summer", "A fox hunting the wetland's frogs in spring", "A storm blowing down trees at the wetland's edge"],
      "Draining is a deliberate human act that eliminates the habitat itself. Drought, predation and storms are natural events; the organism's habitat still exists after them.", {});
  },
  function () {
    return mcq("An introduced species, the green crab, arrives in a bay and eats young clams and eels grass beds. For the bay's native organisms, the green crab is a human influence because",
      "people's activities carried it to a place it could never have reached on its own",
      ["it is a stronger competitor than any species that evolved in the bay's waters",
       "it eats more species of prey than any native predator in the bay ever has",
       "people released it on purpose to control other species living in the bay"],
      "Introduced species count as a human influence because human transport (here, shipping) moved them. Whether they were released deliberately does not matter; the clams' problem began with people carrying the crab across an ocean it could not cross itself.", {});
  }
]), ["Separate what people did from what nature did; only one option is ours.", "An influence can be human even when nobody intended the harm."]);

E("s7-u1-habitat-tradeoffs", 1, ["SC7.2.7"], 2, "var", varset([
  function () {
    return mcq("A town protects a nesting beach for an endangered shorebird by closing it to visitors each summer. Which of the following is a genuine disadvantage of this protection?",
      "Local businesses lose some summer visitors who came for the beach",
      ["The shorebirds lose their nesting habitat to the visitors who stay away",
       "The beach erodes faster once people stop walking on the nesting area",
       "The shorebirds must find a new beach because protection drives them off"],
      "Protection has real costs: closing a popular beach costs the town visitor business. The other options reverse the effects: protection keeps the habitat and the birds, and less foot traffic means less erosion, not more.", {});
  },
  function () {
    return mcq("A company offers to build a wind farm on a ridge where a rare butterfly's only local habitat is found, promising jobs and clean power. Which statement identifies the central trade-off honestly?",
      "The project brings jobs and clean energy, but building on the ridge could destroy the butterfly's only local habitat",
      ["The project brings jobs and clean energy, and the ridge habitat will be improved by the construction work",
       "The project has no real benefits, since wind power does not reduce the use of other energy sources",
       "The project threatens the habitat, but butterflies can simply be moved to any other ridge in the region"],
      "An honest trade-off names a real gain and a real loss. The gain is jobs and clean power; the loss is the possible destruction of a habitat that exists nowhere else locally. Butterflies tied to one ridge cannot simply be relocated, and the habitat will not be improved by building on it.", {});
  }
]), ["A trade-off item always has one option with a real gain AND a real loss. Find it.", "Cross out any option that pretends one side of the decision is cost-free."]);

E("s7-u1-cr-habitat-defence", 1, ["SC7.2.7"], 3, "var", varset([
  function () {
    return textq("A rare shorebird nests each summer on one gravel beach in your region, the only nesting site it has locally. A developer proposes a campground on that beach, which would bring jobs and visitors to the town. Defend a course of action to protect the bird's habitat. Your defence must state your course of action clearly, give the reason it protects the habitat, and deal honestly with one thing your plan gives up or costs.",
      ["Any clear, defensible course of action, for example: refuse the campground on this beach and help the developer find another site; or allow a smaller campground set back from the nesting area with the beach closed during nesting season. Must name the habitat reason and one real cost (lost jobs or visitors, higher cost of another site, reduced access)"],
      "<b>Model answer:</b> Course of action: the campground should not be built on the nesting beach; the town should work with the developer to place it on the next beach along the coast, which has no nesting birds. Reason: this beach is the bird's only local nesting site, so building on it does not just disturb the birds for one season, it removes the habitat the local population depends on, and a displaced rare bird has nowhere equivalent to go. The honest cost: the alternate site is farther from the town's services, so the campground will cost more to service and may draw fewer visitors in its first years, and some of the promised jobs may be delayed. Protecting the only site is worth that cost because a delayed campground can still succeed, while a lost nesting site cannot be rebuilt.<br><br><b>Marking points:</b> 1 mark for a clear course of action. 1 mark for the habitat reason, tied to this organism and this site. 1 mark for one genuine cost of the plan, honestly faced.", {});
  }
]), ["State the action in one sentence first; everything else hangs off it.", "Your plan must cost something. Naming the cost makes the defence believable."]);

/* ---------- SC7.2.8 Groups interested in protecting the environment (THIN; SME flag) ---------- */

E("s7-u1-groups-match", 1, ["SC7.2.8"], 1, "var", varset([
  function () {
    return mcq("Which of the following groups works to protect the environment at the international level, in many countries at once?",
      "A worldwide conservation organization with offices in dozens of countries",
      ["A local naturalist club that leads walks in one community's parks",
       "A provincial government department that manages one province's parks",
       "A school science club that runs a cleanup of its own schoolyard"],
      "The scale decides the level: an organization working in dozens of countries is international. The club is local, the department is provincial, and the school club is smaller still.", {});
  },
  function () {
    return mcq("A group of residents forms a society to protect the marsh at the edge of their town and begins holding meetings and cleanups. This group is best described as",
      "a local community group interested in protecting the environment",
      ["a national conservation organization with chapters in every province",
       "a government department responsible for environmental regulations",
       "an international body that negotiates agreements between countries"],
      "Residents acting for their own community's marsh are a local group. Nothing in the description gives them national reach, government authority or an international role.", {});
  }
]), ["Judge each group by its scale: community, province, country, or world.", "The group's actions in the description tell you its level; do not be distracted by its enthusiasm."]);

E("s7-u1-groups-interest", 1, ["SC7.2.8"], 2, "var", varset([
  function () {
    return mcq("A company proposes a quarry beside a wetland. At the public meeting, one speaker says: \"My grandchildren fish in that pond every summer, and I want it kept clean and full of life for them.\" This speaker's interest in the wetland is best described as",
      "a local resident's interest in keeping a valued place healthy for family and community use",
      ["a scientist's interest in the wetland as a site for long-term research studies",
       "a business interest in the wetland as a source of gravel for construction",
       "a government interest in the wetland as a site for a new protected park"],
      "The speaker speaks as a resident and grandparent who uses and values the place. Nothing in the statement claims research, profit or government plans; the interest is personal and local.", {});
  },
  function () {
    return mcq("At the same meeting, a second speaker presents water-quality measurements taken at the wetland every month for five years and argues the quarry would change them. This speaker's interest is best described as",
      "a scientific interest in the wetland as a place to study and monitor over time",
      ["a business interest in the wetland as a source of gravel for construction",
       "a resident's interest in keeping a valued place for family recreation",
       "a tourism interest in the wetland as an attraction for visiting birdwatchers"],
      "Five years of monthly measurements is monitoring: the speaker's stake in the wetland is as a study site whose record would be broken by the quarry. Match the interest to the evidence the speaker actually brings.", {});
  }
]), ["Match the interest to what the speaker actually says and does.", "Different people can want the same outcome for different reasons; the reason is the interest."]);

/* ---------- SC7.3.1 Identifying questions ---------- */

E("s7-u1-question-identify", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("A class is about to study the schoolyard ecosystem. Which of the following questions could actually be investigated by observing and measuring in the schoolyard?",
      "Which plant species growing in the schoolyard attracts the most insects?",
      ["Why is the schoolyard the nicest ecosystem in the whole region?",
       "Do insects prefer living in the schoolyard to living anywhere else?",
       "Which organism in the schoolyard is the most important of all?"],
      "An investigable question can be answered with observations or measurements: students can count insects on each plant species. The other questions ask for opinions or judgements (nicest, most important) or compare against everywhere else, which cannot be observed.", {});
  },
  function () {
    return mcq("Which of the following questions about a pond could be investigated with a school field study?",
      "How does the number of frogs at the pond change between spring and fall?",
      ["Are ponds better ecosystems than forests for the animals that live in them?",
       "Why do frogs deserve to have the pond kept exactly as it is forever?",
       "Would the pond be more beautiful if it had more frogs living in it?"],
      "Counting frogs in different seasons is observation and measurement, so the question is investigable. The others ask for value judgements (better, deserve, more beautiful) that no measurement can settle.", {});
  }
]), ["Ask: could I answer this by counting, measuring or observing? If not, it is not investigable.", "Watch for opinion words: nicest, best, most important, deserve."]);

E("s7-u1-question-identify-2", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Which of the following is NOT an investigable question about a local ecosystem?",
      "Why do earthworms matter more than any other organism in the soil?",
      ["How many earthworms live in one square metre of the schoolyard soil?",
       "Does the number of earthworms change after a week of heavy rain?",
       "In which part of the schoolyard, sunny or shaded, are earthworms found most often?"],
      "The first question asks for a judgement about importance, which cannot be measured. The other three can each be answered by counting or comparing earthworms in the field.", {});
  },
  function () {
    return mcq("Which of the following is NOT an investigable question about a forest ecosystem?",
      "Which tree species is the most beautiful one growing in the forest?",
      ["How tall is the tallest spruce tree growing along the forest trail?",
       "Which insects are found on spruce trees and which on birch trees?",
       "How does the number of seedlings differ between the sunny and shaded sides of the trail?"],
      "Most beautiful is a matter of taste, not measurement. Heights, insect locations and seedling counts can all be observed and recorded, so those questions are investigable.", {});
  }
]), ["Three of the questions can be answered with a tape measure, a count or a tally. One cannot.", "The odd one out usually hides an opinion inside a scientific-sounding sentence."]);

E("s7-u1-question-best", 1, ["SC7.3.1"], 2, "var", varset([
  function () {
    return mcq("A class has one afternoon to study a bog near the school. Which question is the strongest choice for their investigation?",
      "How does the number of insect species caught differ between the open bog and its wooded edge?",
      ["What is everything that lives in the bog and how does each species affect all the others?",
       "Why is the bog an important ecosystem for the whole province of Newfoundland and Labrador?",
       "How has the bog changed over the past thousand years of its existence on this site?"],
      "The first question is bounded: one afternoon, one comparison, countable results. The others are too large for the time (everything, the whole province, a thousand years) and could not be answered with the class's own observations.", {});
  }
]), ["Strong questions fit the time, the place and the tools actually available.", "If a question needs a thousand years or a whole province, it is not a one-afternoon question."]);

/* ---------- SC7.3.2 Defining and delimiting questions ---------- */

E("s7-u1-delimit-choose", 1, ["SC7.3.2"], 1, "var", varset([
  function () {
    return mcq("A student starts with the question \"How do plants grow?\" Which rewritten version is properly delimited for an investigation?",
      "How does the amount of sunlight affect the growth of bean seedlings over three weeks?",
      ["How do plants grow in different places all around the world?",
       "How do plants grow, and what do animals do while they are growing?",
       "Why do plants grow the way they do in nature over long periods?"],
      "The delimited version names the organism (bean seedlings), the factor tested (sunlight), the outcome measured (growth) and the time frame (three weeks). The others stay just as broad as the original or get broader.", {});
  },
  function () {
    return mcq("A student starts with the question \"What lives in soil?\" Which rewritten version is properly delimited for an investigation?",
      "Which organisms can be found in the top 10 cm of soil under the schoolyard's spruce trees?",
      ["What lives in soil in every ecosystem found across the island of Newfoundland?",
       "What lives in soil, and how do those organisms feel about living there?",
       "Why does soil contain so many different kinds of living things inside it?"],
      "The delimited version fixes the place (under the schoolyard spruce trees), the depth (top 10 cm) and what will be recorded (which organisms). The others widen the question or ask for feelings and reasons that cannot be observed.", {});
  }
]), ["A delimited question names what, where, and over how long.", "Cross out any rewrite that is as wide as the question you started with."]);

E("s7-u1-delimit-rewrite", 1, ["SC7.3.2"], 2, "var", varset([
  function () {
    return mcq("A class observes that some bean seeds in a tray sprouted and others did not. They want to investigate the effect of salt in the soil. Which problem statement best delimits their investigation?",
      "Does adding salt to the soil change the percentage of bean seeds that germinate within ten days?",
      ["Does salt affect plants in general, in any soil, at any time of the year?",
       "What happens to bean seeds when conditions around them are changed somehow?",
       "Why do bean seeds sometimes fail to sprout when they are planted in soil?"],
      "The first statement can be tested directly: salt is added or not, germination is counted, and the time is fixed at ten days. The others either widen the scope to all plants everywhere or never name the factor being tested.", {});
  }
]), ["A testable problem statement names the factor changed and the result counted.", "If the statement could describe a hundred different experiments, it is not delimited yet."]);

/* ---------- SC7.3.3 Organizing and recording field information (CORE: cognitive core only) ---------- */

E("s7-u1-instrument-choose", 1, ["SC7.3.3"], 1, "var", varset([
  function () {
    return mcq("A team is recording conditions at four spots in the schoolyard. They need to measure the air temperature at each spot. Which instrument should they choose?",
      "A thermometer",
      ["A light meter", "A magnifying glass", "A wind recorder"],
      "Temperature is measured with a thermometer. A light meter measures light, a wind recorder measures wind, and a magnifying glass only makes small objects easier to see.", {});
  },
  function () {
    return mcq("A team wants to compare how bright the light is in the open schoolyard and under the spruce trees. Which instrument gives them a measurement they can record and compare?",
      "A light meter",
      ["A field guide", "A magnifying glass", "A thermometer"],
      "A light meter measures light intensity in numbers that can be recorded and compared between the two spots. A field guide identifies organisms, a magnifier enlarges them, and a thermometer measures temperature, not light.", {});
  }
]), ["Match the instrument to the quantity named in the question: temperature, light, or wind.", "An instrument is only the right choice if it measures the thing being recorded."]);

E("s7-u1-record-format", 1, ["SC7.3.3"], 2, "var", varset([
  function () {
    return mcq("A team records the schoolyard using fixed descriptive scales: for light they record full sun, part shade or full shade, and for wind they record calm, light breeze or strong wind. Why is recording with fixed scales better than each student writing their own description?",
      "Every spot is described with the same words, so the records can be compared fairly",
      ["Fixed scales make the records longer, so the report looks more complete",
       "Fixed scales remove the need to visit each spot more than one time",
       "Every spot receives the same description, so the data is easier to copy"],
      "Comparisons are only fair when every observation uses the same categories. If one student writes \"quite bright\" and another writes \"medium\", the two spots cannot be compared. Fixed scales give all observers the same words for the same conditions.", {});
  },
  function () {
    return mcq("Which recording table is set up correctly for comparing four schoolyard spots?",
      "A table with one row per spot and columns for temperature, light, wind and organisms observed",
      ["A table with one row per organism and a single column labelled \"schoolyard notes\"",
       "A paragraph describing the first spot, with the other spots added if space remains",
       "A list of temperatures with no record of which spot each was measured at"],
      "Comparing spots requires the same information recorded the same way for each spot: one row per spot, one column per measurement. Temperatures without locations, or notes without structure, cannot support a comparison.", {});
  }
]), ["Recording is for comparing later. Ask whether the format keeps every spot's data side by side.", "Same rows, same columns, same words: that is what makes field records usable."]);

E("s7-u1-record-plan", 1, ["SC7.3.3"], 3, "var", varset([
  function () {
    return mcq("A team plans to record the schoolyard at four spots. Which plan produces records that can actually be compared?",
      "Visit all four spots within the same hour, use the same instruments and scales at each, and record in the same table",
      ["Visit one spot each week for four weeks, so the team can take its time at every spot",
       "Let each member choose their own instruments and scales, so more kinds of data are collected",
       "Record the first spot in full detail and the others from memory at the end of the visit"],
      "Conditions change with time and weather, so spots visited weeks apart, or measured with different instruments and scales, cannot be compared fairly. Same hour, same tools, same table: those are what make the four records one data set.", {});
  }
]), ["A comparison fails if the conditions of measuring changed along with the place.", "Hold everything about the measuring constant; let only the spot vary."]);

/* ---------- SC7.3.4 Communicating questions, ideas, plans and results (CORE: cognitive core only) ---------- */

E("s7-u1-communicate-format", 1, ["SC7.3.4"], 1, "var", varset([
  function () {
    return mcq("A team must present its pond survey results to the class in five minutes, showing how the number of organisms differed between the sunny and shaded ends of the pond. Which format fits this purpose best?",
      "A bar graph of organism counts at the two ends, with a short spoken explanation",
      ["A long written essay describing every organism the team remembers seeing",
       "A poster of photographs of the pond with no counts or comparisons shown",
       "A list of the team's questions, with the results saved for a later presentation"],
      "The purpose is to compare counts, and a bar graph shows a comparison at a glance inside five minutes. An essay buries the comparison, photographs without counts show no results, and the questions alone omit the findings entirely.", {});
  },
  function () {
    return mcq("A student wants to explain to the school newsletter's readers, step by step, how her team carried out its schoolyard survey so another class could repeat it. Which format fits this purpose best?",
      "A written procedure in point form, in the order the steps were done",
      ["A single photograph of the schoolyard taken on the day of the survey",
       "A poem about the organisms the team found during the survey work",
       "A graph of the survey results with no description of the method used"],
      "Repeating a method requires the steps in order: a point-form procedure. A photograph, a poem and a results graph each communicate something, but none of them tells another class what to do.", {});
  }
]), ["Name the audience and the purpose first; the format follows from them.", "Comparing numbers wants a graph; repeating a method wants ordered steps."]);

E("s7-u1-communicate-judge", 1, ["SC7.3.4"], 2, "var", varset([
  function () {
    return mcq("A team's poster is titled \"Our Results\" but shows only drawings of the organisms they found, with no measurements, counts or comparisons. Judged against its stated purpose, the poster's main weakness is that",
      "it does not communicate the results it promises, only the organisms' appearance",
      ["it uses drawings instead of photographs, which are always required in science",
       "its title is too short to tell the audience what the poster is about",
       "it shows too many organisms, when a poster should show only one"],
      "A communication product is judged against its purpose. The title promises results, and results are measurements and comparisons; the poster delivers neither. Drawings are a legitimate choice, the title is clear, and showing several organisms is no fault in itself.", {});
  }
]), ["Judge the product against the job it claimed to do, not against a perfect poster.", "Ask: what did it promise, and what did it actually deliver?"]);

/* ---------- SC7.3.6 Evaluating group processes (CORE: cognitive core only; authored from the guide) ---------- */

E("s7-u1-evaluate-criteria", 1, ["SC7.3.6"], 2, "var", varset([
  function () {
    return mcq("A class is evaluating how well their teams worked during the schoolyard survey. Which question is a genuine evaluation of the group's process, rather than of its results?",
      "Did every member of the team get a fair share of the measuring, recording and reporting jobs?",
      ["Did the team record the highest temperature measured anywhere in the schoolyard that day?",
       "Did the team's table of results contain more rows of data than the other teams' tables?",
       "Did the team finish its survey and get back inside before any of the other teams in the class?"],
      "Evaluating a process asks how the work was done: sharing jobs fairly is about the process. The other options judge results (highest temperature, most rows) or speed, none of which says anything about how the group worked together.", {});
  },
  function () {
    return mcq("Which piece of evidence would best help a team evaluate its own planning process?",
      "A record of the decisions the team made before starting, compared with what it actually had to change in the field",
      ["The team's final mark on the survey report, compared with the average mark across the whole class",
       "A photograph of the team standing together at its first survey spot on the morning of the survey",
       "The number of instruments the team carried out to the schoolyard in its equipment box that day"],
      "Evaluating planning means checking the plan against what happened: decisions recorded beforehand, compared with the changes forced in the field, show exactly where the planning worked and where it failed. A mark judges the product, not the planning.", {});
  }
]), ["Process means how the work was done, not what the work produced.", "Evidence about a process has to come from during the work, not from the final product."]);

E("s7-u1-evaluate-next-step", 1, ["SC7.3.6"], 3, "var", varset([
  function () {
    return mcq("During a survey, one member of a four-person team did all the measuring while the others watched, and the team later could not explain how its own data was collected. Which next step best addresses the problem the team identified in its process?",
      "Rotate the jobs at each new spot, so every member measures, records and checks in turn",
      ["Let the same member keep measuring, since the data came out consistently this time",
       "Have the watching members write the report, so the work is shared out in the end",
       "Remove the member who measured from the team before the next survey begins"],
      "The problem is that the skills and the understanding stayed with one person. Rotating jobs at each spot spreads both, which fixes the process itself. Keeping the arrangement, shifting only the writing, or removing a member all leave the underlying problem in place.", {});
  }
]), ["The fix has to match the problem: if the doing was not shared, share the doing.", "A next step that only moves the paperwork has not repaired the process."]);

/* ---------- SC7.3.7 Using a key ---------- */

E("s7-u1-key-work", 1, ["SC7.3.7"], 1, "var", varset([
  function () {
    var q = mcq("Use the identification key figure. Specimen 1, found under a log, is identified by the key as",
      "a beetle",
      ["a fly", "a spider", "a butterfly"],
      "Work the key in order. Specimen 1 has six legs, so step 1 sends you to step 2. It has hard wing covers meeting in a straight line down its back, so step 2 identifies it as a beetle.", {});
    q.figure = s7KeyFigure(
      ["1a. Eight legs .......... spider", "1b. Six legs .......... go to 2",
       "2a. Hard wing covers meeting in a straight line down the back .......... beetle", "2b. No hard wing covers .......... go to 3",
       "3a. Only two wings .......... fly", "3b. Four wings .......... butterfly or moth"],
      ["Six legs; hard wing covers meeting in a straight line down its back; found under a log.",
       "Eight legs; two body sections; found at the centre of a web.",
       "Six legs; no hard wing covers; only two wings; found on a window."]);
    return q;
  }
]), ["Start at step 1 every time, and let the specimen's features choose the path.", "Never jump to the name that looks right; the key earns it step by step."]);

E("s7-u1-key-work-2", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    var q = mcq("Use the identification key figure. Which pair of key steps identifies specimen 3?",
      "Step 1b, then step 2b, then step 3a",
      ["Step 1a, then step 2a, then step 3a", "Step 1b, then step 2a", "Step 1a alone"],
      "Specimen 3 has six legs (step 1b, go to 2), no hard wing covers (step 2b, go to 3), and only two wings, so step 3a identifies it as a fly. The path has three steps because the key must separate it from spiders, beetles and four-winged insects in turn.", {});
    q.figure = s7KeyFigure(
      ["1a. Eight legs .......... spider", "1b. Six legs .......... go to 2",
       "2a. Hard wing covers meeting in a straight line down the back .......... beetle", "2b. No hard wing covers .......... go to 3",
       "3a. Only two wings .......... fly", "3b. Four wings .......... butterfly or moth"],
      ["Six legs; hard wing covers meeting in a straight line down its back; found under a log.",
       "Eight legs; two body sections; found at the centre of a web.",
       "Six legs; no hard wing covers; only two wings; found on a window."]);
    return q;
  }
]), ["Trace the path out loud: legs first, then wing covers, then wing count.", "Each step either names the organism or sends you onward. Count the steps you actually used."]);

E("s7-u1-key-choose", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Two insects both have six legs and no hard wing covers. One has two wings and the other has four. Which key feature separates them?",
      "The number of wings",
      ["The colour of the wings", "The size of the body", "The time of day each one is active"],
      "A usable key feature must be observable and must actually differ between the two specimens: wing number does both. Colour and size vary within a kind, and activity time cannot be observed on a collected specimen at all.", {});
  }
]), ["A key feature must split the pair cleanly: present in one, absent or different in the other.", "If both specimens could have the feature, it cannot separate them."]);

/* ---------- SC7.3.8 Designing experiments ---------- */

E("s7-u1-variables-identify", 1, ["SC7.3.8"], 1, "gen", function () {
  var pool = [
    { s: "A student waters bean plants with different amounts of salt water and measures how tall each plant grows in two weeks", iv: "The amount of salt in the water", dv: "the height the plants grow", dis: ["The type of bean plant used", "The size of the pots the plants grow in"] },
    { s: "A student places trays of seeds in rooms at different temperatures and counts how many seeds germinate", iv: "The temperature the seeds are kept at", dv: "the number of seeds that germinate", dis: ["The type of seed used in the trays", "The amount of water each tray receives"] },
    { s: "A student grows seedlings under lights of different colours and measures the mass of each seedling after a month", iv: "The colour of the light", dv: "the mass of each seedling", dis: ["The type of seedling grown", "The number of hours of light each day"] },
    { s: "A student adds different amounts of fertilizer to tomato plants and counts the tomatoes each plant produces", iv: "The amount of fertilizer added", dv: "the number of tomatoes produced", dis: ["The variety of tomato plant used", "The amount of sunlight the plants receive"] }
  ];
  var it = pick(pool);
  return mcq(it.s + ". The independent (manipulated) variable in this experiment is",
    it.iv.toLowerCase(),
    [it.dv, it.dis[0].toLowerCase(), it.dis[1].toLowerCase()],
    "The independent variable is the one the student deliberately changes: " + it.iv.toLowerCase() + ". The responding (dependent) variable is what gets measured in reply, here " + it.dv + ". The other two options are conditions a fair test holds constant.", {});
}, ["The independent variable is the one the experimenter changes on purpose.", "Ask: what did the student decide to make different between the groups?"]);

E("s7-u1-design-controls", 1, ["SC7.3.8"], 2, "var", varset([
  function () {
    return mcq("A student tests whether fertilizer helps bean plants grow taller. Four pots get fertilizer and four do not. Which set of conditions must be kept the SAME in all eight pots for the test to be fair?",
      "Same soil, same amount of water, same light, and the same kind and size of bean plant",
      ["Same soil, same amount of water, same light, and a different kind of bean plant in each pot",
       "Same fertilizer in all eight pots, with water and light allowed to differ between them",
       "Same size of pot, with the soil, water and light each different from pot to pot"],
      "A fair test changes only the fertilizer. Soil, water, light and the plants themselves must be identical across pots, or any difference in height could be blamed on them instead. Giving every pot fertilizer would remove the comparison entirely.", {});
  }
]), ["Only one thing may differ between the groups: the variable being tested.", "List everything that touches the plants, then protect all of it except one."]);

E("s7-u1-design-flaw", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return mcq("A student tests whether seedlings grow better in sunlight or shade. She puts one tray on a sunny windowsill and one tray in a dark cupboard, and waters the windowsill tray every day but the cupboard tray only once a week. The flaw in this design is that",
      "two variables change at once, so any difference in growth cannot be blamed on light alone",
      ["the trays hold too few seedlings for any pattern in the results to be trusted",
       "the student measured growth at the end instead of watching the seedlings daily",
       "seedlings should never be grown in a cupboard, even for a short experiment"],
      "Light and water both differ between the trays. If the windowsill seedlings grow better, the cause could be the light, the water, or both, so the experiment cannot answer its own question. A fair version waters both trays identically and changes only the light.", {});
  }
]), ["Compare the two groups item by item and count how many things differ.", "If the count is more than one, the experiment cannot point at a cause."]);

E("s7-u1-cr-design-experiment", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return textq("Design an experiment to answer this question: does the amount of salt in the soil affect whether bean seeds germinate? In your design, state a hypothesis, name the independent variable, the dependent variable and at least two variables you would control, and describe briefly how you would set the experiment up. (This entry is for practice and teacher-picked sets; it is not drawn by the unit test convention.)",
      ["A complete design: hypothesis linking salt to germination; independent variable the amount of salt; dependent variable the number or percentage of seeds germinating; controls such as same seed type and number, same soil, water, temperature and time; a set-up with several salt amounts plus a no-salt group, counted after a fixed time"],
      "<b>Model answer:</b> Hypothesis: if more salt is added to the soil, then a smaller percentage of bean seeds will germinate, because salt draws water away from the seeds. Independent variable: the amount of salt mixed into the soil (for example 0 g, 1 g, 2 g and 4 g per tray). Dependent variable: the percentage of seeds germinated after ten days. Controls: the same kind and number of bean seeds in each tray, the same soil, the same amount of water, the same temperature and light, and the same ten-day period. Set-up: prepare four trays of soil with the different salt amounts, plant twenty seeds in each at the same depth, water them equally, keep them together in the same place, and count the germinated seeds after ten days.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis connecting salt amount to germination. 1 mark for the independent and dependent variables correctly named. 1 mark for at least two sensible controls held constant. 1 mark for a workable set-up with more than one salt level and a no-salt comparison group.", {});
  }
]), ["Use the Salty Seeds pattern: hypothesis, what you change, what you count, what you hold still.", "A no-salt group is essential: without it there is nothing to compare against."]);

/* ---------- SC7.3.9 Organizing and displaying data ---------- */

E("s7-u1-table-choose", 1, ["SC7.3.9"], 1, "var", varset([
  function () {
    return mcq("A team counted germinated seeds in four trays (no salt, a little salt, more salt, most salt) on days 3, 6 and 9. Which table organizes this data correctly?",
      "A table with one row per tray and one column per day, with the counts where each row and column meet",
      ["A table with one row per day and a single column holding all four trays' counts added together",
       "A table listing the trays in the order the team happened to check them each day",
       "A table with the final day's counts only, since those are the results that matter"],
      "The data has two factors (tray and day), so the table needs rows for one and columns for the other, with every count kept separate. Adding the trays together, scrambling the order, or dropping the earlier days all destroy information the team collected.", {});
  }
]), ["Count the factors in the data: each one needs its own rows or columns.", "If a table throws data away, it is the wrong table."]);

E("s7-u1-table-read", 1, ["SC7.3.9"], 2, "var", varset([
  function () {
    return mcq("A results table shows the number of bean seeds germinated out of 20 after ten days: no salt, 19; 1 g of salt, 16; 2 g of salt, 11; 4 g of salt, 5. Which conclusion does the table support?",
      "As the amount of salt increased, the number of seeds that germinated decreased",
      ["As the amount of salt increased, the number of seeds that germinated increased",
       "Salt had no effect on germination, since seeds germinated at every salt level",
       "The seeds with 2 g of salt germinated fastest of all the groups tested"],
      "Read down the columns: 19, 16, 11, 5 is a steady decrease as salt rises. Seeds still germinating at high salt does not mean no effect; the counts fell by nearly three quarters. The table says nothing about speed, only totals at day ten.", {});
  }
]), ["Read the numbers in order and describe the direction of the pattern before choosing.", "An effect can be strong even when the outcome never reaches zero."]);

E("s7-u1-graph-interpret", 1, ["SC7.3.9"], 3, "var", varset([
  function () {
    var q = mcq("The graph shows the average height of spruce trees growing back on a clearcut site over ten years. Which statement best explains why the growth slows in the later years shown?",
      "As the trees grow larger and closer together, they compete more for light, water and nutrients, so each tree grows more slowly",
      ["As the trees grow larger, the soil runs out of nutrients completely and growth nearly stops for good",
       "The trees slow down because the site receives less sunlight each year than the year before it",
       "The slowing is a measuring error, because healthy trees grow by the same amount every year"],
      "Early on, the young trees have space, light and soil nutrients to themselves and grow fast. As the stand closes in, the same resources are shared among bigger, crowded trees, so growth per year falls. The soil is not exhausted, the sunlight has not changed, and uneven yearly growth is normal, not an error.", {});
    q.figure = s7GrowthSVG([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0.2, 0.6, 1.1, 1.8, 2.6, 3.4, 4.1, 4.7, 5.2, 5.6, 5.9]);
    return q;
  }
]), ["Look at the shape first: steep early, flattening later. Then ask what changes as a stand fills in.", "The resource supply stays roughly the same while the demand on it grows. That is competition."]);

E("s7-u1-cr-data-display", 1, ["SC7.3.9", "SC7.1.8"], 3, "var", varset([
  function () {
    var q = textq("The graph shows the average height of spruce trees on a replanted site over ten years after harvesting. (a) Describe the pattern the graph shows. (b) Explain what this pattern tells you about how the site is changing as an ecosystem.",
      ["(a) Growth is fast in the first years and slows steadily, with the stand still growing but by smaller amounts each year. (b) The site is passing through succession: the young stand is closing in, competition is increasing, and the ecosystem is moving from open ground toward a young forest"],
      "<b>Model answer:</b> (a) The trees grow quickly at first, gaining roughly a metre a year in the middle years, but the yearly gain shrinks steadily, so the curve rises steeply and then flattens toward the top. (b) The site is changing from open, harvested ground into a young forest: this is succession at work. As the trees grow and crowd together, they compete harder for light, water and nutrients, which is why growth slows; the ecosystem is settling into the young-forest stage that will, in time, become mature forest again.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately (fast early growth, slowing later). 1 mark for naming the change as succession or regrowth toward forest. 1 mark for the explanation connecting the slowdown to crowding and competition.", {});
    q.figure = s7GrowthSVG([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0.2, 0.6, 1.1, 1.8, 2.6, 3.4, 4.1, 4.7, 5.2, 5.6, 5.9]);
    return q;
  }
]), ["Describe before you explain: what does the line actually do?", "Then connect the shape to the site's story: open ground becoming forest."]);

/* ---------- SC7.3.10 Defending a position from findings ---------- */

E("s7-u1-position-support", 1, ["SC7.3.10"], 2, "var", varset([
  function () {
    return mcq("A student defends this position: \"Clearcutting this valley would seriously harm the salmon stream.\" Which finding from a survey of the valley best supports the position?",
      "After heavy rain, streams below clearcut areas in the region carried heavy loads of soil washed off the bare ground",
      ["The valley's spruce trees are the tallest of any stand surveyed in the region this year",
       "The company that would do the cutting has operated in the province for over thirty years",
       "Salmon from this stream are sold in stores across the province and in other countries"],
      "Support must connect the claim to evidence about the harm named. Soil washing into streams below clearcuts is direct evidence for the claimed harm. Tree height, company history and fish sales say nothing about whether clearcutting harms the stream.", {});
  },
  function () {
    return mcq("A student defends this position: \"The harvested area should be replanted within a year.\" Which finding best supports the position?",
      "On nearby sites left unplanted, shrubs crowded in and few spruce seedlings survived after five years",
      ["Spruce seedlings are available from the provincial nursery at a low cost per thousand",
       "The harvested area is the largest cutover in the region in the past decade",
       "Most residents surveyed said they preferred the look of a planted forest"],
      "The finding about unplanted sites shows a consequence that replanting prevents, which is what support for the position requires. Seedling price, the site's size and public taste do not show that replanting matters ecologically.", {});
  }
]), ["A supporting finding must be evidence for the claim, not just a fact about the topic.", "Ask of each finding: if this is true, does the position become more believable?"]);

E("s7-u1-cr-defend-position", 1, ["SC7.3.10"], 3, "var", varset([
  function () {
    return textq("Findings from a study of a harvested valley: (1) the stream below the clearcut carried three times as much sediment in the spring after cutting as in the spring before; (2) the number of young salmon in the stream fell by half over the same period; (3) the replanted part of the valley has seedlings growing well after two years; (4) the cutting provided forty jobs for one season. Defend this position: \"Future harvests in this valley should leave an uncut buffer strip along the stream.\" Use at least TWO of the findings in your defence.",
      ["A defence built on findings 1 and 2 (sediment tripled, young salmon halved when no buffer was left), concluding that a buffer addresses exactly that harm; finding 4 may be acknowledged, and finding 3 used to show replanting works but does not protect the stream during the bare-ground period"],
      "<b>Model answer:</b> Future harvests should leave an uncut buffer along the stream, because the study shows what happened without one. Finding 1: in the spring after cutting, the stream carried three times as much sediment, washed off the bare ground. Finding 2: over the same period the young salmon in the stream fell by half, exactly the harm sediment causes by smothering the gravel where eggs are laid. A standing buffer of trees would hold the soil and shade the water, preventing both effects. The forty jobs (finding 4) are real, but a buffer removes only the strip along the stream from the harvest, so most of the work remains; and while the replanting is growing well (finding 3), seedlings take years to hold soil the way standing trees do today.<br><br><b>Marking points:</b> 1 mark for the position clearly defended (not just described). 1 mark for the first finding used accurately as support. 1 mark for the second finding used accurately as support.", {});
  }
]), ["Quote the findings by number as you use them; your defence is built out of them.", "Two findings used well beat four findings listed without a job to do."]);

/* ---------- SC7.3.11 Flow charts of ecosystem change ---------- */

E("s7-u1-succession-order", 1, ["SC7.3.11"], 1, "var", varset([
  function () {
    var q = mcq("The four panels show stages of succession on bare rock, in mixed order. Which sequence puts the stages in the correct order, from first to last?",
      "B -> D -> A -> C",
      ["B -> A -> D -> C", "D -> B -> A -> C", "B -> D -> C -> A"],
      "Panel B is bare rock with the first lichens, panel D adds mosses and grasses, panel A brings shrubs and a young tree, and panel C is the mature forest. So the order is B, D, A, C: each stage prepares the ground for the next.", {});
    q.figure = s7SuccessionSVG([2, 0, 3, 1]);
    return q;
  }
]), ["Find the barest panel first and the forest last; the middle two follow the amount of growth.", "Each stage makes the next one possible: lichens make soil, soil holds grasses, grasses shelter shrubs, shrubs shelter trees."]);

E("s7-u1-flowchart-complete", 1, ["SC7.3.11"], 2, "var", varset([
  function () {
    var q = mcq("A flow chart of succession on bare rock reads: panel C -> panel A -> ? -> panel B. Which panel completes the flow chart?",
      "Panel D",
      ["Panel A", "Panel B", "Panel C"],
      "Panel C is bare rock with lichens (the first stage) and panel A is mosses and grasses (the second). Panel B is the mature forest, the final stage, so the missing third stage must be the shrubs and young trees: panel D.", {});
    q.figure = s7SuccessionSVG([1, 3, 0, 2]);
    return q;
  }
]), ["Put all four panels in order first; then read off which one the chart is missing.", "The chart gives you the first, second and last stages. Only one panel is left."]);

E("s7-u1-succession-predict", 1, ["SC7.3.11"], 3, "var", varset([
  function () {
    var q = mcq("The panels show succession on bare rock in mixed order. A site today looks like panel B. If the site is left undisturbed, which description best predicts its next stage?",
      "Shrubs spread and young trees grow up through them, shading out many of the grasses and mosses",
      ["Lichens spread across the remaining bare rock and the grasses and mosses die back",
       "The site returns to bare rock as the soil slowly washes away down the slope",
       "Mature forest trees appear at full size within a single growing season"],
      "Panel B shows the shrub stage beginning among grasses. The next stage in the sequence is shrubs spreading with young trees rising through them, on the way to the mature forest of panel D. Succession moves forward through the stages; it does not reverse to bare rock or skip to full-grown forest in a season.", {});
    q.figure = s7SuccessionSVG([0, 2, 1, 3]);
    return q;
  }
]), ["Locate today's panel in the full sequence; the answer is the stage after it.", "Predictions in succession follow the order: no stage is skipped and none runs backwards on its own."]);

E("s7-u1-cr-succession-stages", 1, ["SC7.3.11", "SC7.1.8"], 2, "var", varset([
  function () {
    var q = textq("The panels show four stages of succession on bare rock, in order from first to last. Describe the change that takes place at EACH stage, and name the condition each stage creates that allows the next stage to happen.",
      ["Stage 1: lichens colonize bare rock and begin breaking it down, starting soil. Stage 2: mosses and grasses grow in the thin soil, adding organic matter and deepening it. Stage 3: shrubs and young trees grow in the deeper soil, sheltering the ground. Stage 4: a mature forest stands, with deep soil and a shaded forest floor"],
      "<b>Model answer:</b> Stage 1: lichens settle on the bare rock and, with weathering, begin to break its surface down; the first thin soil starts to form. Stage 2: mosses and grasses root in that thin soil, and as they live and die they add organic matter, deepening the soil and letting it hold water. Stage 3: shrubs and young trees can now grow; their roots and leaf litter deepen and enrich the soil further, and their shade changes the conditions at ground level. Stage 4: the mature forest stands, with deep soil and a shaded floor, the conditions the earlier stages built step by step. Each stage survives because the stage before it changed the site.<br><br><b>Marking points:</b> 1 mark for the changes at stages 1 and 2 described in order (colonizing, soil beginning and deepening). 1 mark for the changes at stages 3 and 4 described in order, with the enabling condition named (deeper soil, shelter or shade).", {});
    q.figure = s7SuccessionSVG([0, 1, 2, 3]);
    return q;
  }
]), ["Tell the story of the soil: it is the thread that links all four stages.", "For each stage ask two things: what grows now, and what does its living and dying leave behind?"]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-experiment item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE={
  "s7-u1-cr-design-experiment":true
};
BANK.forEach(function(e){ if(NO_COMPOSE[e.id]){ e.noCompose=true; } });

/* ----- bank-u4.js ----- */
/* Science 7, Unit 4: Earth's Crust (built Nov 15, 2026).
   85 entries across the strand's 25 indicators: Knowledge SC7.10.1
   to SC7.10.9, STSE SC7.11.1 to SC7.11.7, Skills SC7.12.1 to
   SC7.12.9. Guide-led (current guide, Version 2023.001.010) with a
   harvested source base under mine-and-rewrite: the ExamView
   Chapters 10 to 12 publisher banks, Core Lab 10-1C (A Mineralogist's
   Mystery), Core Lab 12-1B (Rocks that Fizz), Be a Soil Sleuth (the
   guide's Core Lab 12-2B), the Seeing the Big Picture STSE module and
   its portfolio assignment, the WNLSD Chapter 10 test and review
   sheet, the ESD unit plan and rock classification activity, and
   three STEAM app scenarios rewritten as contexts. No verbatim
   textbook or test items. Terminology follows the guide throughout:
   the guide's term for earthquake strength is the moment magnitude
   scale, and harvested material naming the Richter scale was mined
   for type only. Content with no home in the current 25 indicators
   (soil humus and leaching detail, desertification, soil enrichment,
   rock and mineral resources) carries no entries. */
// CRMARKS: s7-u4-cr-mineral-tests=3
// CRMARKS: s7-u4-cr-rock-journey=3
// CRMARKS: s7-u4-cr-event-compare=3
// CRMARKS: s7-u4-cr-distribution=3
// CRMARKS: s7-u4-cr-mountain-explain=2
// CRMARKS: s7-u4-cr-timeline=2
// CRMARKS: s7-u4-cr-weathering=3
// CRMARKS: s7-u4-cr-soil-case=2
// CRMARKS: s7-u4-cr-theory-evolved=3
// CRMARKS: s7-u4-cr-big-picture=3
// CRMARKS: s7-u4-cr-change-explain=3
// CRMARKS: s7-u4-cr-past-theory=2
// CRMARKS: s7-u4-cr-mineral-id=2
// CRMARKS: s7-u4-cr-design-investigation=4
// CRMARKS: s7-u4-cr-table-display=2
// CRMARKS: s7-u4-cr-pattern=3
// CRMARKS: s7-u4-cr-conclusion=3

/* ---------- SC7.10.1 Classify minerals by physical properties ---------- */

E("s7-u4-mineral-properties", 4, ["SC7.10.1"], 1, "gen", function () {
  var sets = [
    { obs: "A student rubs a mineral across an unglazed porcelain plate and studies the colour of the powder it leaves behind", prop: "Its streak", others: ["Its cleavage", "Its crystal form", "Its hardness"] },
    { obs: "A student tries to scratch a mineral with a fingernail, then a copper penny, then a steel nail, noting which tools leave a mark", prop: "Its hardness", others: ["Its lustre", "Its streak", "Its transparency"] },
    { obs: "A student holds a mineral up to the light and describes how its surface reflects light, as shiny as a coin or dull like soil", prop: "Its lustre", others: ["Its cleavage", "Its fracture", "Its streak"] },
    { obs: "A broken mineral sample shows flat, smooth surfaces where it split along straight planes in two directions", prop: "Its cleavage", others: ["Its crystal form", "Its hardness", "Its lustre"] },
    { obs: "A student picks up two mineral samples of about the same size and is surprised that one feels much heavier than the other", prop: "Its heft (density)", others: ["Its cleavage", "Its fracture", "Its streak"] },
    { obs: "A student holds a thin mineral sample up to a window and finds that light passes through it clearly enough to read print behind it", prop: "Its transparency", others: ["Its hardness", "Its lustre", "Its streak"] }
  ];
  var s = pick(sets);
  return mcq(s.obs + ". Which physical property of the mineral is being tested?",
    s.prop, s.others,
    "Each test targets one property: a porcelain plate shows streak, scratching tools test hardness, reflected light shows lustre, flat split surfaces show cleavage, unusual weight for size is heft, and light passing through is transparency.", {});
}, ["Match the tool or action in the description to the property it can reveal.", "Ask what the student is actually looking at or comparing in each case."]);

E("s7-u4-mineral-define", 4, ["SC7.10.1"], 1, "var", varset([
  function () {
    return mcq("Which statement best describes what a mineral is?",
      "A pure, naturally occurring, inorganic solid with a definite chemical composition",
      ["Any rock or crystal found in the ground, whether natural or made by people",
       "A living material that forms slowly inside rocks over millions of years",
       "A mixture of several substances that always contains some rock"],
      "A mineral must be pure, naturally occurring, inorganic (not made by living things) and solid. Rocks are mixtures of minerals, and materials made by people or by living things do not count.", {});
  },
  function () {
    return mcq("Ice forms naturally in a pond in winter and is a pure solid. Why is ice sometimes described as a mineral while the water in the pond is not?",
      "Ice is a solid with a definite composition; liquid water is not a solid",
      ["Ice is colder than the water, and minerals must be cold",
       "Ice forms in winter, and minerals only form in winter",
       "Ice is harder than water, and minerals must be the hardest form of a substance"],
      "One requirement of a mineral is that it be a solid. Ice meets the definition (pure, naturally occurring, inorganic, solid); liquid water fails the solid requirement, whatever its temperature.", {});
  }
]), ["Run the definition as a checklist: pure, naturally occurring, inorganic, solid.", "If an option fails even one part of the checklist, it is not the best description."]);

E("s7-u4-mohs-order", 4, ["SC7.10.1"], 1, "gen", function () {
  var sets = [
    { a: "gypsum (hardness 2)", b: "quartz (hardness 7)", test: "A steel file (hardness 6.5) scratches one of two samples but not the other", ans: "The file scratches the gypsum but not the quartz", others: ["The file scratches both samples equally", "The file scratches the quartz but not the gypsum", "Neither sample can be scratched by any tool"] },
    { a: "calcite (hardness 3)", b: "feldspar (hardness 6)", test: "A copper penny (hardness 3.5) is rubbed across both samples", ans: "The penny scratches the calcite but not the feldspar", others: ["The penny scratches both samples equally", "The penny scratches the feldspar but not the calcite", "The penny is scratched by both samples and leaves no mark on either"] },
    { a: "talc (hardness 1)", b: "calcite (hardness 3)", test: "A fingernail (hardness 2.5) is drawn across both samples", ans: "The fingernail scratches the talc but not the calcite", others: ["The fingernail scratches both samples equally", "The fingernail scratches the calcite but not the talc", "The fingernail cannot scratch any mineral"] }
  ];
  var s = pick(sets);
  return mcq("Two samples are " + s.a + " and " + s.b + ". " + s.test + ". What happens?",
    s.ans, s.others,
    "A tool scratches a mineral only when the tool is harder than the mineral. Compare each hardness value with the tool's: the softer mineral is scratched, the harder one is not.", {});
}, ["A scratch happens only when the tool is harder than the mineral.", "Compare the three numbers: tool against each mineral, one at a time."]);

E("s7-u4-streak-reliable", 4, ["SC7.10.1"], 2, "var", varset([
  function () {
    return mcq("Hematite samples can look silver-grey, dark grey or reddish brown, yet every sample leaves the same red-brown powder on a streak plate. Why is streak a more reliable property for identifying hematite than colour?",
      "The streak colour stays the same even when the mineral's surface colour varies",
      ["The streak plate changes the mineral into a different, easier mineral",
       "Colour can never be used to identify any mineral at all",
       "Hematite is the only mineral whose colour changes from sample to sample"],
      "Surface colour varies between samples of the same mineral, but the colour of the powdered mineral, its streak, is consistent. That is why identification keys lean on streak when colour misleads.", {});
  },
  function () {
    return mcq("A student finds a shiny yellow mineral and hopes it is gold. Gold leaves a yellow streak; pyrite (fool's gold) leaves a greenish-black streak. The sample's streak is greenish-black. What should the student conclude?",
      "The sample is pyrite, not gold, because its streak does not match gold",
      ["The sample is gold, because all shiny yellow minerals are gold",
       "The streak test cannot tell gold and pyrite apart",
       "The sample must be a third mineral, since streaks are never yellow or black"],
      "Streak separates the look-alikes: gold's streak is yellow, pyrite's is greenish-black. The greenish-black streak rules out gold even though the sample's colour suggested it.", {});
  }
]), ["Colour is the property that varies most between samples of one mineral.", "The streak is the colour of the mineral as a powder, and it stays constant."]);

E("s7-u4-cr-mineral-tests", 4, ["SC7.10.1"], 3, "var", varset([
  function () {
    return textq("Two mineral samples look almost alike: both are brassy yellow with a metallic shine. One is gold and the other is pyrite. Describe TWO tests you could do to tell them apart, and state what result each test would give for gold and for pyrite.",
      ["Any two of: streak test (gold leaves a yellow streak, pyrite a greenish-black streak); hardness test (gold is soft, about 2.5 to 3, and can be scratched by a copper penny or nail, pyrite is hard, about 6 to 6.5, and cannot); shape test (gold is malleable and flattens when hammered, pyrite is brittle and shatters)"],
      "<b>Model answer:</b> Test 1, the streak test: rub each sample on an unglazed porcelain plate. Gold leaves a yellow streak; pyrite leaves a greenish-black streak. Test 2, the hardness test: try to scratch each sample with a steel nail. Gold is soft (hardness about 2.5 to 3), so the nail scratches it; pyrite is much harder (about 6 to 6.5), so the nail leaves no mark. Either test separates them, because the two minerals differ in streak and in hardness even though their colour and lustre match.<br><br><b>Marking points:</b> 1 mark for a first valid test with both expected results stated. 1 mark for a second valid test with both expected results stated. 1 mark for the reasoning: the tests work because the minerals differ in the tested property even though they look alike.", {});
  },
  function () {
    return textq("Two clear, glassy mineral samples sit in a tray. One is quartz and the other is calcite. Describe TWO tests you could do to tell them apart, and state what result each test would give for quartz and for calcite.",
      ["Any two of: hardness test (quartz, hardness 7, scratches glass and cannot be scratched by a steel file; calcite, hardness 3, is scratched by a copper penny); acid test (calcite fizzes in weak acid, quartz does not react); cleavage test (calcite splits along flat cleavage planes, quartz breaks with a shell-like fracture and shows no cleavage)"],
      "<b>Model answer:</b> Test 1, the hardness test: try scratching each sample with a steel file (hardness about 6.5). Quartz has hardness 7, so the file cannot scratch it, and quartz can scratch glass. Calcite has hardness 3, so even a copper penny scratches it. Test 2, the acid test: drip weak acid on each sample. Calcite fizzes as bubbles of gas form; quartz does not react at all. The two tests separate the samples because quartz and calcite differ greatly in hardness and in their reaction to acid, even though both look clear and glassy.<br><br><b>Marking points:</b> 1 mark for a first valid test with both expected results stated. 1 mark for a second valid test with both expected results stated. 1 mark for the reasoning: the tests work because the minerals differ in the tested property even though they look alike.", {});
  }
]), ["Look-alike minerals are separated by properties, not by appearance: think streak, hardness and special reactions.", "For each test, give the result for BOTH minerals. A test with only one result earns half its value."]);

/* ---------- SC7.10.2 Classify rocks by characteristics and formation ---------- */

E("s7-u4-rock-families", 4, ["SC7.10.2"], 1, "gen", function () {
  var PROC = {
    "Sedimentary rock": "formed from sediments that were compacted and cemented",
    "Igneous rock": "formed when molten rock cooled and hardened",
    "Metamorphic rock": "formed when an existing rock was changed by heat and pressure"
  };
  var sets = [
    { d: "a rock made of layers of sand grains cemented tightly together, with a seashell fossil in one layer", fam: "Sedimentary rock" },
    { d: "a rock that cooled from molten rock deep underground, made of large, interlocking crystals of quartz and feldspar", fam: "Igneous rock" },
    { d: "a rock with wavy bands of light and dark minerals, formed when an older rock was squeezed and heated deep in the crust", fam: "Metamorphic rock" },
    { d: "a rock full of rounded pebbles stuck together in a natural cement", fam: "Sedimentary rock" },
    { d: "a glassy black rock with no visible crystals, formed when lava cooled almost instantly at the surface", fam: "Igneous rock" },
    { d: "a rock that splits into flat sheets and was once a muddy sediment buried and changed by heat and pressure", fam: "Metamorphic rock" }
  ];
  var s = pick(sets);
  var fams = Object.keys(PROC);
  var others = fams.filter(function (f) { return f !== s.fam; });
  var wrongProc = PROC[others[0]];
  return mcq("A student examines " + s.d + ". Which classification is correct?",
    s.fam + ": " + PROC[s.fam],
    [others[0] + ": " + PROC[others[0]], others[1] + ": " + PROC[others[1]], s.fam + ": " + wrongProc],
    "Classify by how the rock formed: sedimentary rocks build up from sediments that are compacted and cemented (and may hold fossils), igneous rocks cool from molten rock, and metamorphic rocks are older rocks changed by heat and pressure. The right option pairs the family with its own formation process.", {});
}, ["Ask how the rock formed, not just how it looks.", "Check both halves of each option: a right family with a wrong process is still a wrong answer."]);

E("s7-u4-igneous-cooling", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    return mcq("What is the difference between magma and lava?",
      "Magma is molten rock below the surface; lava is molten rock that has reached the surface",
      ["Magma is molten rock at the surface; lava is molten rock below the surface",
       "Magma is solid rock and lava is molten rock",
       "Magma comes from volcanoes and lava comes from earthquakes"],
      "The same molten rock has two names depending on where it is: magma while it is underground, lava once it erupts onto the surface.", {});
  },
  function () {
    return mcq("Granite has large crystals that are easy to see, while basalt's crystals are too small to see without a lens. What does the crystal size tell about how each rock cooled?",
      "Granite cooled slowly underground, giving crystals time to grow; basalt cooled quickly at the surface",
      ["Granite cooled quickly at the surface; basalt cooled slowly underground",
       "Both rocks cooled at the same rate, and crystal size depends only on colour",
       "Large crystals form when rock cools in water, and small crystals when it cools in air"],
      "Crystal size records cooling time: slow cooling deep underground (intrusive) lets large crystals grow, while fast cooling at the surface (extrusive) leaves only tiny crystals.", {});
  }
]), ["One word changes with location: below ground or above it.", "Crystal size is a clock: big crystals needed a long, slow cool."]);

E("s7-u4-cycle-diagram", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    var q = mcq("Use the rock cycle diagram. A rock melts deep underground and the melt later cools and hardens at the surface. Which two boxes does the material pass through, in order?",
      "Magma, then igneous rock",
      ["Igneous rock, then sediments", "Metamorphic rock, then sedimentary rock", "Sediments, then sedimentary rock"],
      "Melting produces magma, and magma that cools and hardens becomes igneous rock, whether it cools underground or erupts and cools at the surface.", {});
    q.figure = s7RockCycleSVG();
    return q;
  },
  function () {
    var q = mcq("Use the rock cycle diagram. Which process must happen to an igneous rock before its material can become part of a sedimentary rock?",
      "It must be weathered and eroded into sediments, which are then compacted and cemented",
      ["It must melt and then cool again as a new igneous rock",
       "It must be changed by heat and pressure into a metamorphic rock",
       "Nothing: igneous rock turns directly into sedimentary rock over time"],
      "Follow the arrows: igneous rock reaches sedimentary rock only through sediments. Weathering and erosion break it down, and compaction and cementation build the sedimentary rock from those sediments.", {});
    q.figure = s7RockCycleSVG();
    return q;
  }
]), ["Trace the arrows with your finger; every change of family follows an arrow.", "There are no shortcuts in the cycle: if no arrow runs directly between two boxes, an in-between step is needed."]);

E("s7-u4-sedimentary-form", 4, ["SC7.10.2"], 2, "var", varset([
  function () {
    return mcq("Sediments settle in a lake bed. Which sequence turns them into sedimentary rock?",
      "More sediments pile on top, squeezing the layers (compaction), and dissolved minerals cement the grains together (cementation)",
      ["The sediments melt from the heat of burial, then cool into solid rock",
       "Heat and pressure deep in the crust recrystallize the sediments into bands",
       "The sediments dry out in the sun until they harden into rock"],
      "Sedimentary rock forms at or near the surface: burial compacts the sediment layers, and mineral cement glues the grains. Melting and recrystallizing belong to the igneous and metamorphic paths.", {});
  },
  function () {
    return mcq("Three sedimentary rocks are made of different sediment sizes: one of pebbles and cobbles, one of sand, and one of fine mud. Which pairing is correct?",
      "Pebbles and cobbles form conglomerate, sand forms sandstone, and fine mud forms shale",
      ["Pebbles and cobbles form shale, sand forms conglomerate, and fine mud forms sandstone",
       "All three sediments form the same rock, since size does not matter",
       "Pebbles and cobbles form sandstone, sand forms shale, and fine mud forms conglomerate"],
      "Sedimentary rocks are named by their grain size: the coarsest sediments (pebbles, cobbles) make conglomerate, sand makes sandstone, and the finest mud makes shale.", {});
  }
]), ["Two near-surface steps do the work: squeezing, then gluing.", "For the naming item, match the biggest grains to the rock built from the biggest pieces."]);

E("s7-u4-metamorphic-parent", 4, ["SC7.10.2"], 2, "gen", function () {
  var sets = [
    { parent: "limestone", meta: "marble", others: ["gneiss", "quartzite", "slate"] },
    { parent: "shale", meta: "slate", others: ["gneiss", "marble", "quartzite"] },
    { parent: "sandstone", meta: "quartzite", others: ["gneiss", "marble", "slate"] },
    { parent: "granite", meta: "gneiss", others: ["marble", "quartzite", "slate"] }
  ];
  var s = pick(sets);
  return mcq("Heat and pressure deep in the crust change a rock of " + s.parent + ". Which metamorphic rock does it become?",
    s.meta, s.others,
    "Each parent rock has its metamorphic product: limestone becomes marble, shale becomes slate, sandstone becomes quartzite, and granite becomes gneiss.", {});
}, ["The parent rock decides the product: the minerals are rearranged, not replaced.", "If you know two of the four pairs for certain, use them to eliminate."]);

E("s7-u4-cr-rock-journey", 4, ["SC7.10.2"], 3, "var", varset([
  function () {
    return textq("Choose ONE starting rock: a granite, a sandstone, or a slate. Describe a journey that rock could take through the rock cycle until it becomes a rock of a DIFFERENT family. Name each process in your journey, in order.",
      ["A complete journey names the starting rock, at least two processes in order (from weathering and erosion, compaction and cementation, heat and pressure, melting, cooling), and a finishing rock from a different family. Example: granite is weathered and eroded into sediments; the sediments are compacted and cemented into sandstone (sedimentary)"],
      "<b>Model answer:</b> Start with granite, an igneous rock exposed at the surface. Weathering breaks the granite down and erosion carries the pieces away as sediments, which settle in layers. Buried under more sediments, the layers are compacted and then cemented together into sandstone, a sedimentary rock. The journey crosses one family boundary: igneous to sedimentary, by way of weathering and erosion, then compaction and cementation.<br><br><b>Marking points:</b> 1 mark for a named starting rock and a finishing rock from a different family. 1 mark for each of two processes named correctly and in a workable order (weathering and erosion before compaction and cementation; melting before cooling; heat and pressure applied to an existing rock).", {});
  },
  function () {
    return textq("A piece of shale is buried deeper and deeper as mountains build above it. Describe the journey this rock could take until it becomes an igneous rock. Name each process in your journey, in order.",
      ["Shale is changed by heat and pressure into slate (metamorphic); buried deeper still, it melts into magma; the magma cools and hardens into an igneous rock such as granite (if it cools underground) or basalt (if it erupts and cools at the surface)"],
      "<b>Model answer:</b> As burial deepens, heat and pressure change the shale into slate, a metamorphic rock. If the slate is buried deeper still, the heat becomes great enough to melt it, and it joins the magma below the crust. When that magma cools and hardens, underground or after erupting at the surface, it forms an igneous rock. The journey is sedimentary to metamorphic to igneous, and it cannot skip the melting step: no sedimentary or metamorphic rock becomes igneous without first melting.<br><br><b>Marking points:</b> 1 mark for heat and pressure changing the shale into a metamorphic rock. 1 mark for melting into magma. 1 mark for cooling and hardening into a named or described igneous rock.", {});
  }
]), ["Every change of family needs its process: nothing in the cycle changes by waiting alone.", "Check your journey against the cycle: melting must come before any igneous rock, and sediments before any sedimentary rock."]);

/* ---------- SC7.10.3 Crust characteristics and technologies ---------- */

E("s7-u4-earth-layers", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    var q = mcq("Use the diagram of Earth's interior. Which layer is liquid, and what is it mostly made of?",
      "The outer core, mostly liquid iron and nickel",
      ["The crust, mostly liquid rock", "The inner core, mostly liquid iron and nickel", "The mantle, mostly liquid water and rock"],
      "The outer core is the liquid layer, made of iron and nickel. The inner core is the same metals but solid, squeezed solid by pressure; the mantle is solid rock that flows very slowly, and the crust is a thin solid shell.", {});
    q.figure = s7EarthLayersSVG();
    return q;
  },
  function () {
    var q = mcq("Use the diagram of Earth's interior. A student says the crust is like the skin of an apple compared with the whole fruit. What makes the comparison reasonable?",
      "The crust is extremely thin compared with the rest of the Earth beneath it",
      ["The crust is the softest layer of the Earth", "The crust is the hottest layer of the Earth", "The crust is made of the same material as the core"],
      "Even under the continents the crust is only a few tens of kilometres thick, against thousands of kilometres of mantle and core below it. Thin in proportion, like an apple's skin.", {});
    q.figure = s7EarthLayersSVG();
    return q;
  }
]), ["Find the layer in the diagram first, then match its state and material.", "Only one layer is liquid; the deepest layer is solid despite being hottest, because of pressure."]);

E("s7-u4-crust-plates", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    return mcq("Which statement about Earth's crust is correct?",
      "The crust is broken into large pieces called plates that move slowly, carrying continents and ocean floor with them",
      ["The crust is one unbroken shell, and only the continents on top of it move",
       "The crust is broken into plates, but the plates are exactly the same as the continents",
       "The crust floats as separate continent pieces on a completely liquid interior"],
      "The crust (with the uppermost mantle) is broken into plates, and each plate can carry both continent and ocean floor. Plates are not the same as continents: several plates carry no continent at all, and some continents sit on more than one plate.", {});
  },
  function () {
    return mcq("A map shows a tectonic plate that includes South America and the western half of the Atlantic Ocean floor. What does this show about plates?",
      "A plate can carry both a continent and ocean floor; plates and continents are not the same thing",
      ["Ocean floor is not part of the crust",
       "Every continent sits on exactly one plate of its own",
       "The Atlantic Ocean floor belongs to no plate"],
      "Plates are pieces of crust, and a single plate often carries a continent plus the ocean floor beside it out to a mid-ocean ridge. The plate boundaries do not follow the coastlines.", {});
  }
]), ["Plates are pieces of crust; continents are passengers on some of them.", "If an option makes plates and continents identical, it is the misconception, not the answer."]);

E("s7-u4-study-tech", 4, ["SC7.10.3"], 2, "var", varset([
  function () {
    return mcq("Scientists in the 1950s towed magnetometers behind ships and recorded stripes of normal and reversed magnetism in the ocean floor rocks. What did this technology let them study?",
      "How the ocean floor had spread apart over time, recorded in its magnetic stripes",
      ["The exact age of the Earth, read directly from the stripes",
       "The depth of the mantle below the ocean floor",
       "The kinds of fish living along the mid-ocean ridge"],
      "Magnetometers detect the magnetism locked into rocks as they cool. The striped pattern, matching on both sides of a mid-ocean ridge, recorded the history of sea floor spreading.", {});
  },
  function () {
    return mcq("Which pairing of technology and what it reveals is correct?",
      "Sonar reveals the shape of the ocean floor by timing echoes from sound pulses",
      ["Core sampling reveals the temperature of the inner core directly",
       "Satellite imaging reveals the composition of the mantle",
       "A seismograph reveals the magnetism of ocean floor rocks"],
      "Sonar times sound echoes to map the sea floor, which is how the mid-ocean ridges were found. Core samples reach only the crust, satellites see the surface, and magnetism is the magnetometer's job.", {});
  }
]), ["Each technology answers one kind of question; match the tool to the evidence it produces.", "If an option claims a tool reaches the core or the mantle directly, be suspicious: no tool does."]);

/* ---------- SC7.10.4 Catastrophic events ---------- */

E("s7-u4-earthquake-why", 4, ["SC7.10.4"], 1, "var", varset([
  function () {
    return mcq("What is an earthquake?",
      "A sudden release of energy in the crust, as rock that has been slowly bent or squeezed snaps and shifts, sending out seismic waves",
      ["A crack that opens in the ground and swallows the surface above it",
       "A shaking caused by magma rising through a volcano",
       "A giant wave that starts in the ocean and strikes the coast"],
      "Forces from moving plates slowly stress the rock until it breaks or slips along a fault; the stored energy is released as seismic waves. Ground cracks and ocean waves can result from an earthquake, but neither one is the earthquake itself.", {});
  },
  function () {
    return mcq("Which pairing is correct?",
      "A seismograph records seismic waves, and the moment magnitude scale describes the strength of an earthquake",
      ["A seismograph predicts the exact day of the next earthquake",
       "The moment magnitude scale measures how long an earthquake lasts",
       "A seismograph measures the magnetism of the rocks at a fault"],
      "Seismographs record the waves an earthquake sends out, and scientists use the records to locate the earthquake and rate its strength on the moment magnitude scale. No instrument predicts the exact day of an earthquake.", {});
  }
]), ["Start from the cause: stressed rock, a sudden slip, energy released as waves.", "Separate the event itself from its effects: waves, cracks and tsunamis are results, not definitions."]);

E("s7-u4-volcano-where", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("Volcanoes form in three settings. Which setting matches the Hawaiian Islands?",
      "A hot spot: a plate moves slowly over a place where magma rises through the crust, building island after island",
      ["A converging boundary, where one plate dives under another",
       "A diverging boundary, where two plates pull apart in the ocean",
       "A transform boundary, where two plates slide sideways past each other"],
      "Hawaii sits in the middle of a plate, far from any boundary. A rising plume of magma (a hot spot) punches through the crust, and as the plate moves, the plume builds a chain of islands.", {});
  },
  function () {
    return mcq("Japan's volcanoes sit where one plate is diving beneath another. Which volcano setting is this?",
      "A converging boundary, where the diving plate melts and magma rises through the plate above",
      ["A hot spot in the middle of a plate",
       "A diverging boundary along a mid-ocean ridge",
       "A transform boundary where plates slide sideways"],
      "Where plates converge and one dives (subducts), the diving plate melts at depth and the magma rises to build volcanoes on the plate above, as in Japan. Sideways sliding (transform) builds no volcanoes.", {});
  }
]), ["Three settings only: plates colliding, plates parting, and hot spots.", "Middle of a plate rules out every boundary setting; look for the hot spot."]);

E("s7-u4-event-effects", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("In 1929, an earthquake on the ocean floor south of Newfoundland triggered an underwater landslide. What effect reached the Burin Peninsula?",
      "A tsunami: a series of huge waves that flooded coastal communities",
      ["A volcanic eruption that covered the peninsula in ash",
       "A landslide that buried the peninsula's harbours under rock",
       "A flood caused by rivers changing course on land"],
      "The earthquake's energy displaced the sea floor and set off a tsunami. The waves, not lava or a land landslide, struck the Burin Peninsula, destroying homes and taking lives. It remains Canada's deadliest known tsunami.", {});
  },
  function () {
    return mcq("Mount St. Helens erupted in 1980 after a bulge grew on its side and an earthquake shook the mountain. What was the eruption's most destructive effect?",
      "The side of the mountain collapsed in a huge landslide and a sideways blast flattened forests over a wide area",
      ["Lava flows slowly covered the surrounding towns",
       "A tsunami from the mountain flooded the coast",
       "Ash buried the entire country under a metre of debris"],
      "The bulge gave way: the mountain's side slid off and the exposed magma blasted sideways, flattening forest for kilometres. Lava flows were minor by comparison, and there was no tsunami from the mountain.", {});
  }
]), ["Match the effect to the event's setting: sea floor earthquakes move water; bulging mountainsides fall.", "Watch for effects borrowed from the wrong event type."]);

E("s7-u4-cr-event-compare", 4, ["SC7.10.4"], 3, "var", varset([
  function () {
    return textq("A coastal town sits near a plate boundary where earthquakes occur offshore, and a volcano stands 60 km inland. Compare an earthquake and a volcanic eruption as risks to this town: for EACH event, state its cause and one effect the town could experience.",
      ["Earthquake: caused by rock under stress snapping or slipping along a fault as plates move; effects include shaking that damages buildings, and, because it is offshore, a possible tsunami. Volcano: caused by magma rising through the crust and erupting; effects include ash fall over the town, lava or mudflows nearer the volcano, and gases. Full credit compares cause and effect for both events"],
      "<b>Model answer:</b> Earthquake: the plates pressing against each other stress the rock until it snaps along a fault, releasing energy as seismic waves. The town would feel strong shaking that can crack buildings and roads, and an offshore earthquake could also send a tsunami toward the coast. Volcanic eruption: magma builds up under the volcano until it erupts. Sixty kilometres away, the town's main risk is ash falling on roofs, roads and water supplies, along with poor air from gases; lava flows would threaten places much closer to the volcano. Both events come from plate movement, but the earthquake releases stored energy in seconds with little warning, while the volcano often gives warning signs (small earthquakes, a growing bulge, gas) before it erupts.<br><br><b>Marking points:</b> 1 mark for the earthquake's cause (stressed rock snapping or slipping) and one effect (shaking damage or tsunami). 1 mark for the eruption's cause (magma rising and erupting) and one effect suited to the distance (ash fall, gases). 1 mark for a genuine comparison point (for example warning time, or how the effects differ with distance).", {});
  }
]), ["Give each event its own cause and its own effect; a comparison needs both halves for both events.", "Distance matters: judge the volcano's effects from 60 km away, not from its slopes."]);

/* ---------- SC7.10.5 Distribution of earthquakes and volcanoes ---------- */

E("s7-u4-distribution-data", 4, ["SC7.10.5"], 1, "var", varset([
  function () {
    return mcq("A class collects the locations of the world's major earthquakes and volcanoes for the past 50 years. Which way of organizing the data would best reveal a pattern?",
      "Plot every location as a point on a world map, using one symbol for earthquakes and another for volcanoes",
      ["List the locations alphabetically by the nearest city",
       "Sort the events by date, from oldest to newest",
       "Average all the locations together into a single world position"],
      "Patterns in distribution are spatial: they only appear when the data sits on a map. Alphabetical and date orderings hide where the events are, and averaging destroys the locations entirely.", {});
  },
  function () {
    return mcq("Why do scientists plot earthquake and volcano locations on a map instead of studying a table of the same data?",
      "The map shows where the events cluster, and the clusters are the pattern that needs explaining",
      ["Maps are always more accurate than tables",
       "Tables cannot hold latitude and longitude numbers",
       "The map removes the need to collect any data at all"],
      "The table holds the same numbers, but the pattern (long belts of activity, empty stretches elsewhere) is visible only when the points are plotted. The pattern is what connects the events to plate boundaries.", {});
  }
]), ["Ask what each organization lets you SEE. The pattern lives in the geography.", "If an option throws the locations away, it throws the pattern away with them."]);

E("s7-u4-distribution-map", 4, ["SC7.10.5"], 2, "var", varset([
  function () {
    var q = mcq("Use the map of earthquake and volcano locations. Which statement best describes the pattern the map shows?",
      "The locations cluster along lines and belts, many of them around the edges of oceans and along the middle of the Atlantic",
      ["The locations are spread evenly over the whole Earth",
       "The locations occur only on land, never in the oceans",
       "The locations form a single straight line around the equator"],
      "Plot the points and the pattern is belts, not scatter: a ring around the Pacific, a line down the middle of the Atlantic, and a band through the Mediterranean to the Himalayas. Most of the Earth's surface has few or none.", {});
    q.figure = s7WorldMapSVG();
    return q;
  },
  function () {
    var q = mcq("Use the map of earthquake and volcano locations. A student claims earthquakes and volcanoes happen in completely different places. What does the map show?",
      "The claim is wrong: the two symbols mostly fall along the same belts",
      ["The claim is right: no belt contains both symbols",
       "The claim is right: volcanoes appear only in the oceans",
       "The map cannot compare the two, because it uses symbols"],
      "Along the Pacific ring, the mid-Atlantic line and the Mediterranean band, circles and triangles sit side by side. Where the crust is active, both earthquakes and volcanoes tend to occur.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["Read the map as a whole first: where are the points dense, and where are they absent?", "Compare the two symbols belt by belt before judging the claim."]);

E("s7-u4-ring-of-fire", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    var q = mcq("Use the map. The dense belt of earthquakes and volcanoes around the edge of the Pacific Ocean is called the Ring of Fire. What does this belt coincide with?",
      "The boundaries of the plate that lies under the Pacific Ocean, where it meets the plates around it",
      ["The equator, where the Earth spins fastest",
       "The edges of the Pacific's continents, by coincidence only",
       "A chain of underwater mountains with no relation to plates"],
      "The Ring of Fire traces the Pacific Plate's edges: where that plate dives under, pulls from or slides past its neighbours, earthquakes and volcanoes concentrate. The belt is a plate boundary drawn in events.", {});
    q.figure = s7WorldMapSVG();
    return q;
  },
  function () {
    var q = mcq("Use the map. The middle of the Atlantic Ocean shows a line of earthquakes and volcanoes running north to south, far from any continent. What is the best inference from this line?",
      "A plate boundary runs down the middle of the Atlantic, even though it lies under the ocean",
      ["Ships crossing the Atlantic cause the earthquakes along their routes",
       "The line marks the equator, where earthquakes are most common",
       "Volcanoes can only form in the middle of oceans"],
      "Events cluster at plate boundaries wherever the boundaries are, including under oceans. A straight belt of events in mid-ocean is evidence of a boundary there: the mid-Atlantic ridge, where plates pull apart.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["A belt of events is a boundary made visible; ask what the belt outlines.", "Test each option against the map: does the belt follow the equator, the coasts, or something else?"]);

E("s7-u4-cr-distribution", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    var q = textq("Use the map of earthquake and volcano locations. (a) Describe the pattern in where these events occur. (b) Infer the relationship between the pattern and plate boundaries, and explain your reasoning.",
      ["(a) The events are not evenly spread: they cluster in belts, around the Pacific Ocean, down the middle of the Atlantic, and across the Mediterranean to the Himalayas, with large areas (central continents, much of the ocean floors away from the belts) nearly empty. (b) The belts coincide with plate boundaries: the events happen where plates meet, because that is where plates dive, pull apart or slide, stressing rock (earthquakes) and letting magma rise (volcanoes). The map's pattern is evidence for the plate model"],
      "<b>Model answer:</b> (a) Earthquakes and volcanoes are not scattered evenly. They crowd into narrow belts: a ring around the Pacific Ocean, a line down the centre of the Atlantic, and a band running from the Mediterranean through the Middle East to the Himalayas. Wide regions, such as the centres of continents and most of the Pacific floor away from its edges, have almost none. (b) The belts line up with the boundaries between tectonic plates. That is where the action is: plates diving under each other, pulling apart or grinding past each other stress the rock until it snaps (earthquakes) and open paths for magma to rise (volcanoes). The middles of plates are quiet because the rock there is not being stressed or opened. The distribution pattern is therefore evidence that the plate boundary model is correct.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately (belts named, uneven spread stated). 1 mark for the inference that the belts coincide with plate boundaries. 1 mark for the reasoning connecting boundary processes (diving, parting, sliding) to the two event types.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["Describe first, infer second: the pattern is your evidence, the boundary is your conclusion.", "Name at least two belts, and say plainly that the events are NOT evenly spread."]);

/* ---------- SC7.10.6 Processes of mountain formation ---------- */

E("s7-u4-fold-fault", 4, ["SC7.10.6"], 1, "var", varset([
  function () {
    return mcq("Layers of sedimentary rock in a cliff face are bent into wave-like curves, like a rug pushed from both ends. Which process bent them?",
      "Folding: the layers were squeezed by compression until they bent",
      ["Faulting: the layers broke and slid past each other",
       "Weathering: wind and water wore the layers into curves",
       "Cementation: minerals glued the layers into curves as they formed"],
      "Compression squeezes rock layers until they bend: that is folding. Faulting is what happens when the rock cannot bend and breaks instead; weathering and cementation work at the surface and do not bend buried layers.", {});
  },
  function () {
    return mcq("A road cut shows rock layers that were once level, but one side of a crack in the rock sits several metres higher than the other side. Which process does this show?",
      "Faulting: the rock broke along a fault and the two sides shifted",
      ["Folding: the layers bent without breaking",
       "Erosion: water carried the lower side away",
       "Compaction: the weight of sediments squeezed one side down"],
      "A break with movement along it is a fault. The layers did not bend (folding) and nothing was worn or squeezed away: the two blocks of rock shifted against each other.", {});
  }
]), ["Bent without breaking is one process; broken and shifted is the other.", "Look for the crack: a break with offset means the rock faulted."]);

E("s7-u4-mountain-process", 4, ["SC7.10.6"], 2, "var", varset([
  function () {
    return mcq("The Appalachian Mountains, which run through western Newfoundland, formed hundreds of millions of years ago when continents collided. Which process built them?",
      "Folding and faulting: the collision squeezed the rock layers between the continents until they crumpled upward",
      ["Volcanic build-up: lava piled up layer on layer until it stood high",
       "Erosion: rivers carved the mountains out of a flat plain",
       "Deposition: sediments piled up until they reached mountain height"],
      "Continents colliding compress everything between them; the rock folds and faults upward into a range, as happened when the Appalachians rose. Erosion later wears ranges down; it does not raise them.", {});
  },
  function () {
    return mcq("In 1943, a Mexican farmer watched a crack open in his cornfield; within a year a new volcano, Paricutin, stood over 300 m tall where the field had been. Which mountain-building process does Paricutin show?",
      "Volcanic build-up: erupted lava and ash piled up around the vent until they formed a mountain",
      ["Folding: rock layers bent upward under compression",
       "Faulting: a block of crust was pushed up along a fault",
       "Glacial deposition: ice left a pile of rock and soil behind"],
      "Some mountains are built by accumulation: eruption after eruption stacks lava and ash into a cone. Paricutin grew in a field within a year, far too fast for folding or faulting, which work over millions of years.", {});
  }
]), ["Three builders: squeezing (folding and faulting), stacking (volcanic), and neither erosion nor deposition raises a range.", "Time is a clue: a mountain that appears in a year was stacked, not squeezed."]);

E("s7-u4-cr-mountain-explain", 4, ["SC7.10.6"], 3, "var", varset([
  function () {
    return textq("The Himalayas are still growing taller today. Using plate tectonics, explain how this mountain range formed and why it is still rising.",
      ["Two plates carrying continents are converging; neither continent sinks easily, so the collision squeezes the rock between them, which folds and faults upward into mountains. The plates are still converging today, so the squeezing continues and the range keeps rising (while erosion wears it down)"],
      "<b>Model answer:</b> The Himalayas stand where two plates, one carrying India and one carrying the rest of Asia, are moving toward each other. When ocean floor dives under a continent it can sink, but continent crust is too buoyant to sink far, so when the two continents met, the collision had nowhere to go: the rock layers between them were squeezed, folded and faulted upward into a mountain range. The plates have not stopped converging, so the squeeze continues today and the Himalayas are still being pushed up, even as weathering and erosion wear their tops down.<br><br><b>Marking points:</b> 1 mark for converging plates carrying continents. 1 mark for the mechanism: compression folding and faulting the rock upward because the continents cannot sink. 1 mark for the range still rising because convergence continues.", {});
  }
]), ["Continents cannot dive the way ocean floor does; ask where the collision's force goes instead.", "A range still rising needs a process still running: name it."]);

/* ---------- SC7.10.7 Chronological model or geological time scale ---------- */

E("s7-u4-era-order", 4, ["SC7.10.7"], 1, "gen", function () {
  var sets = [
    { ev: "the first fish appear in the oceans", era: "Paleozoic era", others: ["Cenozoic era", "Mesozoic era", "Precambrian"] },
    { ev: "the first mammals appear on land", era: "Mesozoic era", others: ["Cenozoic era", "Paleozoic era", "Precambrian"] },
    { ev: "the first humans appear", era: "Cenozoic era", others: ["Mesozoic era", "Paleozoic era", "Precambrian"] },
    { ev: "the first life forms appear in the oceans", era: "Precambrian", others: ["Cenozoic era", "Mesozoic era", "Paleozoic era"] },
    { ev: "the first forests spread across the land", era: "Paleozoic era", others: ["Cenozoic era", "Mesozoic era", "Precambrian"] },
    { ev: "the first flowering plants appear", era: "Mesozoic era", others: ["Cenozoic era", "Paleozoic era", "Precambrian"] }
  ];
  var s = pick(sets);
  return mcq("On a geological time scale of Earth's history, in which era does this event belong: " + s.ev + "?",
    s.era, s.others,
    "The four divisions in order are Precambrian (first life), Paleozoic (first fish, first forests), Mesozoic (first mammals, first flowering plants) and Cenozoic (first humans). Match the event to its era.", {});
}, ["Learn the order first: Precambrian, Paleozoic, Mesozoic, Cenozoic.", "Humans are the most recent arrival of all; life itself is the oldest event on the list."]);

E("s7-u4-era-scale", 4, ["SC7.10.7"], 2, "var", varset([
  function () {
    var q = mcq("Use the geological time strip, which is drawn to scale. Which statement about the Precambrian is correct?",
      "It covers most of Earth's history, about 87 percent of the 4.6 billion years, even though its name is less familiar",
      ["It is the shortest of the four divisions of Earth's history",
       "It began when the first fish appeared in the oceans",
       "It covers about the same length of time as the Cenozoic era"],
      "Read the strip's proportions: the Precambrian block takes up nearly nine tenths of the whole line. The other three eras, which hold the fish, the forests, the mammals and us, share the remaining sliver.", {});
    q.figure = s7TimeStripSVG();
    return q;
  },
  function () {
    return mcq("A class models Earth's 4.6 billion year history on a 4.6 m strip of paper, one metre per billion years. Roughly how much of the strip do humans occupy?",
      "A tiny fraction of the last centimetre: humans have existed for only a very small part of Earth's history",
      ["About half the strip, since humans are the most advanced life",
       "About one full metre at the end of the strip",
       "The whole strip, because the scale is a model of human history"],
      "Humans appear only in the last part of the Cenozoic era, which is itself the last 66 million years: about 6.6 cm of the strip, and humans occupy only a sliver of that. On the scale of Earth's history, we are very recent arrivals.", {});
  }
]), ["The strip is drawn to scale: judge lengths, not the fame of the events.", "Recent does not mean long: the era we live in is the shortest on the strip."]);

E("s7-u4-cr-timeline", 4, ["SC7.10.7"], 3, "var", varset([
  function () {
    return textq("A student is building a chronological model of Earth's history as a timeline. Place these four events in order from oldest to most recent, and justify where you placed ONE of the boundaries between the eras: first life forms appear; first fish appear; first mammals appear; first humans appear.",
      ["Order: first life forms (Precambrian); first fish (Paleozoic); first mammals (Mesozoic); first humans (Cenozoic). A justified boundary names an era change and the event that marks it, for example the Paleozoic to Mesozoic boundary is placed where new dominant life (mammals, flowering plants) appears after the era of fish and forests, or the Cenozoic is justified as the era in which humans appear, the most recent era"],
      "<b>Model answer:</b> Oldest to most recent: (1) first life forms appear, in the Precambrian; (2) first fish appear, in the Paleozoic era; (3) first mammals appear, in the Mesozoic era; (4) first humans appear, in the Cenozoic era. Boundary justification: the boundary between the Paleozoic and Mesozoic eras is placed where the fossil record changes character, from the era marked by the first fish and the first forests to the era marked by the first mammals and the first flowering plants. Each era on the model is defined by the major events and life forms that appear in it, so an event's era is decided by which set of first appearances it belongs with.<br><br><b>Marking points:</b> 1 mark for all four events in the correct order with their eras named. 1 mark for a boundary justified by the events or life forms that define the eras on either side of it.", {});
  }
]), ["Each era owns its first appearances: life, fish, mammals, humans, in that order.", "A boundary is justified by what changes across it, not by the line itself."]);

/* ---------- SC7.10.8 Weathering and erosion to form soils ---------- */

E("s7-u4-weathering-types", 4, ["SC7.10.8"], 1, "gen", function () {
  var DEF = {
    "Mechanical weathering": "the rock is broken into smaller pieces without changing what it is made of",
    "Chemical weathering": "the rock's material is changed by chemical reactions"
  };
  var sets = [
    { d: "Water seeps into cracks in a cliff, freezes on cold nights, and wedges pieces of rock off the cliff face", kind: "Mechanical weathering" },
    { d: "Acidic rainwater slowly dissolves the surface of a limestone statue, blurring its carved details", kind: "Chemical weathering" },
    { d: "Tree roots grow into the cracks of a boulder and pry the boulder apart as they thicken", kind: "Mechanical weathering" },
    { d: "Iron in a rock reacts with oxygen and water, forming rust that weakens and crumbles the rock", kind: "Chemical weathering" },
    { d: "Sand carried by the wind blasts and polishes the surface of rocks in a desert", kind: "Mechanical weathering" },
    { d: "Slightly acidic groundwater seeps through limestone and slowly eats out an underground cave", kind: "Chemical weathering" }
  ];
  var s = pick(sets);
  var other = s.kind === "Mechanical weathering" ? "Chemical weathering" : "Mechanical weathering";
  return mcq("Which classification is correct for this case: " + s.d + "?",
    s.kind + ": " + DEF[s.kind],
    [other + ": " + DEF[other], s.kind + ": " + DEF[other], other + ": " + DEF[s.kind]],
    "Mechanical weathering breaks rock into smaller pieces without changing what it is made of (freezing water, roots, wind-blown sand). Chemical weathering changes the rock's material itself through reactions (dissolving, rusting). The right option pairs the case with the correct type and that type's true definition.", {});
}, ["Ask one question: is the rock only being broken, or is its material being changed?", "Check both halves of each option: two of them pair a type with the other type's definition."]);

E("s7-u4-frost-wedging", 4, ["SC7.10.8"], 1, "var", varset([
  function () {
    return mcq("Why does frost wedging break rock apart in a Newfoundland and Labrador spring?",
      "Water in the cracks freezes and expands at night, then melts by day; repeated freezing pries the cracks wider until pieces break off",
      ["Ice is heavier than water and crushes the rock under its weight",
       "Cold makes rock contract until it shatters into pieces",
       "Frost dissolves the minerals that hold the rock together"],
      "Water is unusual: it expands as it freezes. In a crack, that expansion pushes outward with great force, and freeze-thaw cycles through a spring wedge the crack wider each time until the rock splits. This is mechanical weathering.", {});
  },
  function () {
    return mcq("A gardener finds that the soil in spring is full of small stones that were not at the surface in the fall, pushed up by the freezing ground. Which weathering process is connected to this lifting and breaking of buried rock?",
      "Frost action: freezing water expands and heaves the ground, cracking rock as it does so",
      ["Chemical weathering by plant roots dissolving the stones",
       "Erosion by the wind blowing stones to the surface",
       "Compaction of the soil under the snow's weight"],
      "Freezing water expands, heaving soil and stones upward (frost heave) and wedging cracks in rock wider. The stones rose because the ground itself moved and broke rock apart, a mechanical process.", {});
  }
]), ["Water expands when it freezes: that one fact drives the whole process.", "Any answer about dissolving or chemical change belongs to the other kind of weathering."]);

E("s7-u4-weathering-erosion", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("Which statement correctly distinguishes weathering from erosion?",
      "Weathering breaks rock down where it sits; erosion moves the broken material away",
      ["Weathering moves rock pieces away; erosion breaks rock down where it sits",
       "Weathering happens only in water and erosion only in air",
       "Weathering and erosion are two names for exactly the same process"],
      "The two processes work in sequence: weathering does the breaking, erosion does the carrying. Rivers, wind, gravity and glaciers erode; they move what weathering has loosened.", {});
  },
  function () {
    return mcq("A river runs brown with sediment after heavy rain on a steep, logged hillside. Which pairing of process and agent is correct?",
      "Erosion, carried out by running water moving weathered material downhill",
      ["Weathering, carried out by the rain dissolving the hillside",
       "Deposition, carried out by gravity pulling the sediment upward",
       "Compaction, carried out by the river squeezing the sediment"],
      "The material was weathered earlier, in place; the river is now transporting it, which is erosion, and running water is the agent. Deposition comes later, where the river slows and drops its load.", {});
  }
]), ["Breaking in place, or carrying away? That single question separates the two.", "Name the agent as well: water, wind, gravity and glaciers are the carriers."]);

E("s7-u4-winter-chime", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("A class hangs a wind chime made of glass tubes and metal bells outside for a winter design challenge. By spring, the glass is chipped where small stones struck it on windy nights, and the metal bells show rust spots. Which pairing is correct?",
      "The chipping is mechanical weathering by wind-blown particles; the rusting is chemical weathering",
      ["The chipping is chemical weathering; the rusting is mechanical weathering",
       "Both the chipping and the rusting are erosion",
       "Both the chipping and the rusting are chemical weathering"],
      "Impacts break the glass without changing what glass is: mechanical weathering. Rust is a new substance formed when iron reacts with oxygen and water: chemical weathering. Nothing here was carried away, so neither is erosion.", {});
  },
  function () {
    return mcq("For the same wind chime challenge, a team wants to slow the weathering of the metal bells. Which design choice targets the CHEMICAL weathering they observed?",
      "Coat the bells so water and oxygen cannot reach the metal surface as easily",
      ["Hang the chime where wind-blown sand cannot strike it",
       "Make the bells thicker so impacts chip them less",
       "Hang the chime lower so it is easier to inspect"],
      "Rusting needs water and oxygen at the metal's surface; a coating blocks both and slows the reaction. Shielding from blown sand and thickening the metal target the mechanical damage instead.", {});
  }
]), ["Sort each damage type first: broken, or chemically changed?", "A protection only works on the process it blocks: coatings block reactions, shields block impacts."]);

E("s7-u4-cr-weathering", 4, ["SC7.10.8"], 3, "var", varset([
  function () {
    return textq("A granite cliff stands above a river. Explain how material from this cliff could, over a very long time, end up as part of a soil or a sedimentary rock. Name the processes in order.",
      ["Weathering breaks the cliff down (frost wedging in cracks, root action, chemical weathering of its minerals); erosion (gravity dropping pieces, the river carrying them) moves the material; the pieces are broken down further as they travel; where the material settles and stays, it can build soil in place (with decaying organic matter added) or be buried, compacted and cemented into sedimentary rock"],
      "<b>Model answer:</b> First, weathering attacks the cliff where it stands: water freezes in its cracks and wedges pieces off (frost wedging), roots pry at the cracks, and rainwater chemically weakens some of its minerals. Gravity drops the loosened pieces to the cliff's base, and the river erodes them, carrying them downstream and breaking them smaller as they tumble. Where the river slows, the sediment is deposited. From there the paths divide: sediment that stays at the surface, mixed with decaying plant and animal material, becomes soil over time; sediment that is buried under later layers is compacted and cemented into sedimentary rock.<br><br><b>Marking points:</b> 1 mark for weathering named and described at the cliff (any agent). 1 mark for erosion and transport by gravity or the river. 1 mark for a correct ending: soil formation at the surface with organic matter, or burial, compaction and cementation into sedimentary rock.", {});
  }
]), ["Keep the sequence in order: break down, carry away, settle, then become soil or rock.", "Soil needs one ingredient rock alone cannot supply: material from living things."]);

/* ---------- SC7.10.9 Classify soils by characteristics ---------- */

E("s7-u4-soil-texture", 4, ["SC7.10.9"], 1, "gen", function () {
  var DESC = {
    "Coarse-textured (sandy) soil": "made of coarse particles that feel gritty",
    "Fine-textured (clay) soil": "made of very fine particles that feel smooth and sticky",
    "Medium-textured (loamy) soil": "made of a mixture of particle sizes"
  };
  var sets = [
    { d: "feels gritty between the fingers, falls apart easily when squeezed, and is made of coarse particles", cls: "Coarse-textured (sandy) soil" },
    { d: "feels smooth and greasy, sticks together in a lump, and is made of very fine particles", cls: "Fine-textured (clay) soil" },
    { d: "feels like a mixture: some grit, some smooth material, and it holds together loosely without being sticky", cls: "Medium-textured (loamy) soil" },
    { d: "is full of small stones and coarse grains that you can see and feel individually", cls: "Coarse-textured (sandy) soil" }
  ];
  var s = pick(sets);
  var classes = Object.keys(DESC);
  var others = classes.filter(function (c) { return c !== s.cls; });
  return mcq("A soil sample " + s.d + ". Which classification is correct?",
    s.cls + ": " + DESC[s.cls],
    [others[0] + ": " + DESC[others[0]], others[1] + ": " + DESC[others[1]], s.cls + ": " + DESC[others[0]]],
    "Texture class follows particle size: coarse particles you can feel as grit make a sandy (coarse-textured) soil; the finest particles, smooth and sticky, make clay (fine-textured); a mixture of sizes makes loam (medium-textured). The right option pairs the class with its own particle description.", {});
}, ["Feel is data here: grit means coarse, grease and stickiness mean fine, a mixture means loam.", "Check both halves of each option: a right class with a wrong particle description is still wrong."]);

E("s7-u4-soil-form", 4, ["SC7.10.9"], 1, "var", varset([
  function () {
    return mcq("What is soil made from?",
      "Weathered rock material mixed with decaying organic matter from living things, plus air and water in its spaces",
      ["Rock dust alone, ground fine by glaciers",
       "Decayed plants alone, with no rock material in it",
       "Sand washed up from the ocean over thousands of years"],
      "Soil needs both parents: weathering supplies the mineral particles from rock, and living things supply the organic matter as they die and decay. Neither one alone makes soil.", {});
  },
  function () {
    return mcq("Two soils form side by side, one on granite bedrock and one on shale bedrock, under the same climate and plants. Why do the two soils differ?",
      "Soil inherits characteristics from its parent rock, so different bedrock produces different soil",
      ["The climate must secretly be different over the two soils",
       "Soils never differ when the plants growing in them are the same",
       "The soil on granite is older, and age is the only thing that matters"],
      "The parent material is one of the things that shapes a soil: granite weathers to a coarser, sandier soil, while shale weathers toward finer, clay-rich soil. Same weather, same plants, different starting rock, different soil.", {});
  }
]), ["Soil has two parents: broken rock and once-living material.", "Where a soil forms decides what it starts from: the rock underneath matters."]);

E("s7-u4-soil-drainage", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    var q = mcq("Use the drainage results. Which soil would leave a plant's roots sitting in water longest after rain, and why?",
      "The clay soil: its fine particles pack tightly, leaving small spaces, so water moves through it very slowly (low permeability)",
      ["The sandy soil: its large particles trap water between them",
       "The gravel: its spaces are too small for water to enter",
       "All three soils drain at the same rate once they are wet"],
      "Read the bars: clay took by far the longest for the same volume of water. Fine particles pack closely, so the connected spaces are small and water creeps through slowly; sand and gravel have larger spaces and drain fast.", {});
    q.figure = s7DrainSVG([{ name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }, { name: "gravel", secs: 6 }]);
    return q;
  },
  function () {
    return mcq("What is the difference between a soil's porosity and its permeability?",
      "Porosity is how much open space the soil has to hold water; permeability is how easily water can move through those spaces",
      ["Porosity is how fast water drains; permeability is how much water the soil holds",
       "They are two names for the same property of a soil",
       "Porosity applies only to clay and permeability only to sand"],
      "A soil can hold a lot of water yet let it move slowly: clay is porous but not very permeable, because its spaces are tiny. Porosity is storage; permeability is movement.", {});
  }
]), ["Longest bar means slowest drainage; connect slow drainage to small, tightly packed particles.", "Hold versus flow: one word is about space, the other about movement through the space."]);

E("s7-u4-cr-soil-case", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    return textq("A gardener digs a sample of soil from a new plot. The sample feels greasy and sticks together in a lump when squeezed, its particles are too fine to see individually, and after rain the plot stays puddled for days. (a) Classify this soil by its texture. (b) Justify your classification with TWO of the observations. (c) The bedrock under the plot is shale. Explain why that fits your classification.",
      ["(a) Fine-textured (clay) soil. (b) Any two of: greasy feel and sticking together (fine particles), particles too fine to see (smallest particle size), very slow drainage leaving puddles (low permeability of packed fine particles). (c) Shale is a fine-grained rock; it weathers into fine particles, so a shale parent rock produces a fine-textured, clay-rich soil"],
      "<b>Model answer:</b> (a) The soil is a fine-textured (clay) soil. (b) Its particles are too fine to see one by one, the smallest of the three texture classes, and it feels greasy and sticks together when squeezed, which is how fine clay particles behave; it also drains so slowly that puddles sit for days, because the tightly packed fine particles leave only tiny spaces for water to move through. (c) Soil inherits its particle sizes from its parent rock. Shale is itself made of fine mud particles, so as it weathers it breaks down into fine material, producing a clay soil rather than a sandy one.<br><br><b>Marking points:</b> 1 mark for the classification (fine-textured, clay) supported by at least one observation tied to particle size or drainage. 1 mark for the parent rock explanation: shale is fine-grained and weathers into fine particles, producing a fine-textured soil.", {});
  }
]), ["Classify from the feel and the drainage together; one observation alone can mislead.", "Finish the chain: bedrock weathers into particles, and the particles set the texture."]);

/* ---------- SC7.11.1 How plate tectonic theory evolved ---------- */

E("s7-u4-wegener-evidence", 4, ["SC7.11.1"], 1, "var", varset([
  function () {
    return mcq("Alfred Wegener argued that the continents had once been joined. Which of the following was one of his four main types of evidence?",
      "Fossils of the same land animals and plants found on continents now separated by oceans",
      ["Photographs of the continents taken from space",
       "Measurements showing the continents moving several metres each year",
       "Rock samples drilled from the middle of the ocean floor"],
      "Wegener's evidence was the fit of the continents, matching fossils across oceans, matching rock layers and mountain ranges, and evidence of past climates. Drilling the ocean floor and measuring movement came decades later and belonged to the next stage of the theory.", {});
  },
  function () {
    return mcq("Coal, which forms in warm, swampy climates, is found in Antarctica, now covered in ice. For Wegener, what kind of evidence was this?",
      "Climate evidence: the continent must once have sat in a warmer climate zone",
      ["Fossil evidence, because coal is made of fossils",
       "Rock layer evidence, because coal is a type of rock layer",
       "Evidence against his theory, since it had nothing to do with continents"],
      "Wegener sorted his evidence into fit, fossils, rock layers and climate. Coal in a frozen continent is climate evidence: either the continent moved from a warmer place, or the whole Earth's climate was once different, and the fossil and rock evidence pointed to the continent moving.", {});
  }
]), ["Wegener worked in 1912: if an option needs ships, drills or satellites, it is not his.", "Sort each option into his four boxes: fit, fossils, rocks, climate."]);

E("s7-u4-boundaries", 4, ["SC7.11.1"], 1, "gen", function () {
  var MOVE = {
    "A diverging boundary": "the plates are pulling apart",
    "A converging boundary": "the plates are pushing together",
    "A transform boundary": "the plates are sliding sideways past each other"
  };
  var sets = [
    { d: "New crust forms in the gap between two plates, as along the mid-Atlantic ridge", b: "A diverging boundary" },
    { d: "One plate dives beneath another, as off the coast of Japan", b: "A converging boundary" },
    { d: "Two plates grind past each other horizontally, as along the San Andreas Fault in California", b: "A transform boundary" },
    { d: "Two plates carrying continents collide, and the crust between them crumples upward into mountains", b: "A converging boundary" }
  ];
  var s = pick(sets);
  var types = Object.keys(MOVE);
  var others = types.filter(function (t) { return t !== s.b; });
  return mcq(s.d + ". Which classification is correct?",
    s.b + ": " + MOVE[s.b],
    [others[0] + ": " + MOVE[others[0]], others[1] + ": " + MOVE[others[1]], s.b + ": " + MOVE[others[0]]],
    "Boundary names describe the movement: diverging plates pull apart, converging plates push together, and transform plates slide sideways past each other. The right option pairs the boundary with its own movement.", {});
}, ["Name the movement in the description first (apart, together, sideways), then pick the option that pairs it with the right word.", "Check both halves: a right name with a wrong movement is still a wrong answer."]);

E("s7-u4-convection", 4, ["SC7.11.1"], 2, "var", varset([
  function () {
    return mcq("Scientists model the mantle's movement with a pot of thick soup heating on a stove: hot soup rises, spreads at the surface, cools and sinks at the edges. In the Earth model, what do these convection currents do?",
      "They carry the plates along as the mantle material slowly circulates",
      ["They melt the crust from below wherever they rise",
       "They cause the ocean tides as the mantle sloshes",
       "They spin the inner core to make Earth's magnetic field"],
      "Heat from the core drives slow convection in the mantle: rising, spreading, sinking. The plates ride on this moving material, which supplies the mechanism Wegener's theory lacked.", {});
  },
  function () {
    return mcq("Why did the idea of convection currents in the mantle matter so much to plate tectonic theory?",
      "It supplied a possible mechanism: a way for the plates to be moved, which continental drift had never explained",
      ["It proved that the continents themselves were liquid",
       "It explained why earthquakes happen on the Moon",
       "It showed that the mantle was the same temperature throughout"],
      "Wegener could say the continents moved but not what moved them, and that gap sank his theory. Convection currents gave plate tectonics the engine it needed: heat-driven circulation in the mantle dragging the plates.", {});
  }
]), ["The soup pot is a model: rising, spreading, sinking, in a slow loop.", "Ask what problem the idea solved. The theory before it had a famous missing piece."]);

E("s7-u4-new-evidence", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return mcq("In the 1960s, drilling ships brought up rock samples from the ocean floor. The rocks were youngest at the mid-ocean ridges and older farther away, on both sides. Why was this evidence so powerful for plate tectonics?",
      "It showed new crust forming at the ridges and spreading outward, exactly as sea floor spreading predicted",
      ["It proved the ocean floor was the oldest part of the Earth",
       "It showed that the continents had never moved at all",
       "It revealed that ocean water was slowly dissolving the crust"],
      "A prediction confirmed is strong evidence: sea floor spreading said crust is born at ridges and ages as it moves away, and the drilled ages matched on both sides of the ridge. Continental drift alone never predicted this.", {});
  },
  function () {
    return mcq("Three technologies produced three discoveries: sonar mapped a mountain ridge down the middle of the Atlantic; magnetometers found magnetic stripes matching on both sides of the ridge; drilling showed the floor aging away from the ridge. Taken together, what did they establish?",
      "That the ocean floor is spreading apart from the ridges, carrying the continents with it",
      ["That the Atlantic Ocean has always been its present size",
       "That Wegener's original evidence had all been mistaken",
       "That the continents plough through a stationary ocean floor"],
      "Each technology added a piece: shape (sonar), record (magnetism), and age (drilling). Together they replaced Wegener's picture of continents ploughing through the floor with plates, ocean floor included, moving as one.", {});
  }
]), ["Judge evidence by what it confirms: a prediction that comes true carries weight.", "Three tools, three different kinds of data, one conclusion: check that the conclusion uses all three."]);

E("s7-u4-cr-theory-evolved", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return textq("Explain how the explanation of the moving Earth changed from Wegener's continental drift to modern plate tectonics. In your answer, name the evidence Wegener started with, the problem his theory could not solve, and the new evidence that solved it.",
      ["Wegener's evidence: the fit of the continents, matching fossils across oceans, matching rock layers, and climate evidence such as coal in Antarctica. The problem: no mechanism; he could not say what force moved the continents, so most scientists rejected the theory. The new evidence: sonar mapping of mid-ocean ridges, magnetometer records of magnetic stripes, and deep sea drilling showing the ocean floor aging away from the ridges, leading to sea floor spreading and convection currents as the mechanism. The theory that resulted (plate tectonics) has whole plates, continents and ocean floor together, moving"],
      "<b>Model answer:</b> Wegener began with continental drift: the continents fit together like puzzle pieces, the same fossils appear on continents now separated by oceans, rock layers and mountain ranges match across the Atlantic, and coal in Antarctica points to continents having sat in different climates. But he could not explain what moved the continents, and without a mechanism most scientists rejected his theory. After the Second World War, new technology changed the picture. Sonar mapped a great ridge down the middle of the Atlantic. Magnetometers found stripes of normal and reversed magnetism in the ocean floor, matching on both sides of the ridge. Drilling ships showed the floor is youngest at the ridge and older with distance, proof that new crust forms at ridges and spreads outward. With convection currents in the mantle proposed as the engine, the explanation became plate tectonics: not continents ploughing through the ocean floor, but whole plates, continent and ocean floor together, in motion.<br><br><b>Marking points:</b> 1 mark for Wegener's evidence, at least two types named. 1 mark for the problem: no mechanism for moving the continents. 1 mark for the new evidence (any two of sonar, magnetometers, drilling) and what it established (sea floor spreading, plates moving as wholes).", {});
  }
]), ["Structure the story in three acts: the claim, the flaw, the fix.", "Every act needs its evidence named, not just its conclusion."]);

/* ---------- SC7.11.2 Canadian contributions ---------- */

E("s7-u4-canadian-match", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("Which Canadian scientist is matched with the contribution he is known for?",
      "J. Tuzo Wilson recognized transform boundaries, where plates slide sideways past each other",
      ["J. Tuzo Wilson discovered the fossil dinosaurs of Alberta",
       "Joseph Tyrrell proposed the theory of continental drift",
       "Harold Williams invented the seismograph"],
      "Wilson's contribution was transform boundaries, the third boundary type, which plate tectonics needed. Tyrrell is the dinosaur and past-climate name; Williams worked on plate activity along eastern North America; continental drift was Wegener, who was German.", {});
  },
  function () {
    return mcq("Harold Williams, working in Newfoundland, studied the rocks of the Appalachian region. What was his contribution?",
      "He recognized evidence of ancient plate activity along the eastern margin of North America, helping explain how the Appalachians formed",
      ["He proved that Newfoundland was once part of Europe by drilling the ocean floor",
       "He discovered the mid-Atlantic ridge using sonar",
       "He named the three types of plate boundaries"],
      "Williams read the rocks of Newfoundland and the Appalachians as the remains of an ancient ocean and its plate collisions, evidence that plate tectonics had been at work along eastern North America hundreds of millions of years ago.", {});
  }
]), ["Three Canadians, three contributions: boundaries, dinosaurs and climate, ancient plates in the east.", "If an option hands a Canadian someone else's famous work (drift, sonar, the seismograph), it is wrong."]);

E("s7-u4-canadian-scenario", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("In the 1880s, a Canadian geologist surveying in Alberta found dinosaur fossils and other evidence that the region had once had a much warmer climate. Which contributor and scale does this describe?",
      "Joseph Tyrrell, whose fossil evidence spoke to the climate history of a whole region",
      ["J. Tuzo Wilson, whose work was on the scale of single rock samples",
       "Harold Williams, whose work concerned only his local outcrop",
       "Alfred Wegener, whose work was Canadian and regional"],
      "Tyrrell's Alberta finds, dinosaurs and signs of a warmer past climate, fed the same kind of climate evidence Wegener later used. The contribution worked at regional scale: what Alberta's rocks said about the past of a whole region.", {});
  },
  function () {
    return mcq("A contribution to geology can work at a local, regional or global scale. Wilson's recognition of transform boundaries applies to plates all over the Earth. At which scale did his contribution work?",
      "The global scale: it changed how every plate boundary on Earth is understood",
      ["The local scale: it explained one outcrop near his university",
       "The regional scale: it applied only to Canada's west coast",
       "No scale: it was later shown to be wrong everywhere"],
      "Transform boundaries completed the boundary set (diverging, converging, transform) for the whole planet. A contribution that changes a worldwide theory works at the global scale, wherever its author lived.", {});
  }
]), ["Match the person to the finding first; the scale follows from how far the finding reaches.", "A theory-level contribution is global even when the scientist worked in one place."]);

/* ---------- SC7.11.3 Explanations rest on evidence ---------- */

E("s7-u4-imagination-role", 4, ["SC7.11.3"], 1, "var", varset([
  function () {
    return mcq("Fossils of ocean animals are found in rock high in the mountains of Newfoundland. What does this observation suggest, when scientists reason imaginatively from the evidence?",
      "That the rock formed under an ancient ocean and was later pushed up as mountains formed",
      ["That the ocean animals once lived on dry land",
       "That people carried the fossils up the mountains long ago",
       "That the mountains were built by the fossils piling up"],
      "The fossils are evidence; the explanation is inferred. Ocean animals live in oceans, so their fossils in mountain rock mean the rock was once sea floor, raised up by the same plate forces that built the mountains.", {});
  },
  function () {
    return mcq("Minerals that form only in warm climates are found in rocks in the polar regions. Which statement best describes how a scientist uses this observation?",
      "The observation is evidence; imagining the continent in a warmer place in the past is the inference built on it",
      ["The observation proves by itself exactly where the continent was",
       "The observation is an opinion, because it cannot be seen today",
       "The observation should be ignored, since the minerals might be wrong"],
      "Scientific explanations are built from evidence plus inferred relationships: the minerals (evidence) connect to a past climate, and the past climate connects to a continent that has moved. The observation alone is not the whole explanation.", {});
  }
]), ["Separate the two parts: what was observed, and what was inferred from it.", "An inference is not a guess: it is a relationship the evidence supports."]);

E("s7-u4-evidence-link", 4, ["SC7.11.3"], 2, "var", varset([
  function () {
    return mcq("A scientist argues that South America and Africa were once joined. Which PAIR of observations, taken together, makes the strongest case?",
      "The two coastlines fit together, and the same distinctive rock layers and fossils appear on both sides of the Atlantic",
      ["Both continents have beaches, and both are in the southern hemisphere",
       "Both continents are large, and both have mountains somewhere",
       "Both continents have rivers, and both have warm climates today"],
      "One observation can be coincidence; two independent ones that point the same way are a relationship. Fit plus matching rocks and fossils is the combination Wegener built on. The other pairs are true of many places that were never joined.", {});
  },
  function () {
    return mcq("Which observation most directly supports the explanation that the Atlantic Ocean is still widening?",
      "Measurements show the ocean floor is youngest at the mid-Atlantic ridge and gets older toward both continents",
      ["The Atlantic has storms that push water toward both shores",
       "Ships take longer to cross the Atlantic than they used to",
       "The coastlines of the Atlantic continents are slowly eroding"],
      "A widening ocean predicts new crust at the ridge aging outward, and that is exactly what drilling found. The relationship between ridge, age and distance is the evidence; the other options do not measure the floor at all.", {});
  }
]), ["Strong cases pair independent observations that point the same way.", "Ask of each option: if this were true, would it actually support the claim?"]);

E("s7-u4-cr-big-picture", 4, ["SC7.11.3"], 3, "var", varset([
  function () {
    return textq("In the 1950s, scientists had three separate observations: a mountain ridge runs down the middle of the Atlantic Ocean; the rocks of the ocean floor carry stripes of normal and reversed magnetism; and the ocean floor is youngest in the middle and older toward the continents. Explain how scientists connected these separate observations into ONE explanation.",
      ["The three observations fit a single process: new crust forms at the ridge (explaining the ridge and the young rocks there), spreads outward carrying the magnetic record with it (explaining the matching stripes), and ages as it travels (explaining the age pattern). The explanation, sea floor spreading, is built by finding the relationship among the observations, not from any one of them alone"],
      "<b>Model answer:</b> No single observation explains itself, but together they interlock. The ridge in the middle of the Atlantic is where new crust could be forming. The magnetic stripes match on both sides of the ridge, as if the floor were a tape recording made at the ridge and carried away in both directions. The ages confirm it: youngest at the ridge, older the farther you drill from it. The one explanation that fits all three is sea floor spreading: crust is born at the ridge and moves outward, recording Earth's magnetic reversals as it goes and aging as it travels. This is how scientific explanations are built: evidence collected separately, then connected by an inferred relationship that accounts for all of it at once.<br><br><b>Marking points:</b> 1 mark for using at least two of the three observations accurately. 1 mark for the single explanation (sea floor spreading) stated. 1 mark for the connection: how the explanation accounts for the observations together rather than one at a time.", {});
  }
]), ["One observation is a fact; three that interlock are an explanation.", "Say what process would produce ALL of the observations at once."]);

/* ---------- SC7.11.4 Understanding changed as evidence collected ---------- */

E("s7-u4-change-timeline", 4, ["SC7.11.4"], 1, "var", varset([
  function () {
    return mcq("Which sequence shows how the scientific understanding of Earth's moving crust changed over time, in the correct order?",
      "Continental drift proposed, drift widely rejected, sea floor spreading discovered, plate tectonics accepted",
      ["Plate tectonics accepted, sea floor spreading discovered, drift proposed, drift rejected",
       "Sea floor spreading discovered, drift proposed, plate tectonics accepted, drift rejected",
       "Drift rejected, drift proposed, plate tectonics accepted, sea floor spreading discovered"],
      "The order matters: Wegener proposed drift (1912), the missing mechanism led to rejection, the ocean floor evidence of the 1950s and 1960s supplied spreading, and plate tectonics followed as the accepted explanation.", {});
  },
  function () {
    return mcq("Early maps, such as one from 1482, showed a world very different from the world map of 1587, after explorers had sailed the oceans. What made the pictured world change between the two maps?",
      "New observations: explorers' reports and measurements replaced guesses about lands no one had mapped",
      ["Artists became more skilled at drawing coastlines",
       "The continents moved noticeably during those hundred years",
       "Mapmakers agreed to draw the world differently as a fashion"],
      "The world did not change; the evidence did. Each voyage added observations, and the picture of the Earth was redrawn to fit them, the same pattern by which plate tectonics later redrew it again.", {});
  }
]), ["The theory's story has a fixed order: proposal, rejection, new evidence, acceptance.", "When a picture of the world changes, ask what new observations forced the change."]);

E("s7-u4-change-why", 4, ["SC7.11.4"], 2, "var", varset([
  function () {
    return mcq("Wegener's continental drift was rejected by most scientists of his time, even though his fossil and coastline evidence was real. What was the main scientific reason for the rejection?",
      "He could not explain what force could move the continents; his theory had no mechanism",
      ["His fossils were later shown to be fakes",
       "Scientists had already proven the continents were fixed using satellites",
       "He refused to publish his evidence for others to check"],
      "The evidence was genuine but incomplete: a theory that says continents move must say how. With no workable mechanism, the scientific community set the theory aside until the ocean floor evidence and convection supplied one.", {});
  },
  function () {
    return mcq("Why did acceptance of moving continents come in the 1960s rather than in Wegener's lifetime?",
      "New technology (sonar, magnetometers, drilling ships) produced ocean floor evidence that Wegener never had",
      ["Scientists of the 1960s were simply more open-minded people",
       "Wegener's original notes were rediscovered in an archive",
       "A single large earthquake proved the continents were moving"],
      "The change was driven by evidence, not fashion: instruments that did not exist in 1912 mapped the ridges, read the magnetic stripes and dated the floor. Understanding changed when the evidence arrived.", {});
  }
]), ["A theory can have true evidence and still fail: check for the missing mechanism.", "Understanding changes when evidence changes; look for the new instrument or data set."]);

E("s7-u4-cr-change-explain", 4, ["SC7.11.4"], 3, "var", varset([
  function () {
    return textq("Describe how scientific understanding of the forces that shape the Earth changed as ONE of these bodies of evidence was collected: the magnetic stripes in the ocean floor, OR the ages of ocean floor rocks from drilling. In your answer, state what scientists believed before the evidence, what the evidence showed, and how the understanding changed.",
      ["Before: the ocean floor was assumed old and unchanging, and continents were widely believed fixed (drift rejected). The magnetic stripes showed bands of normal and reversed magnetism matching on both sides of the mid-ocean ridge, a record of the floor spreading from the ridge; OR the drilling ages showed the floor youngest at the ridge and older with distance, proving new crust forms at ridges. After: the floor itself moves, carrying continents as parts of plates; the fixed-Earth understanding gave way to plate tectonics"],
      "<b>Model answer:</b> Before the evidence: after Wegener's rejection, the standard understanding was that the continents and ocean floor were fixed, and the ocean floor was assumed to be ancient. What the evidence showed: ships towing magnetometers found stripes of normal and reversed magnetism in the ocean floor rocks, and the stripe pattern on one side of the mid-Atlantic ridge matched the pattern on the other side, stripe for stripe. How the understanding changed: matching stripes are the signature of a recording made in the middle and carried both ways. The floor must be forming at the ridge, locking in the magnetism of the day, and spreading outward. Once the floor itself moves, the continents riding on the plates move with it, and the fixed-Earth picture was replaced by plate tectonics.<br><br><b>Marking points:</b> 1 mark for the before state (fixed continents, ancient unchanging floor). 1 mark for what the chosen evidence actually showed. 1 mark for the changed understanding (moving floor, plates, continents carried).", {});
  }
]), ["Use a before, evidence, after structure; the change is the story.", "Pick one body of evidence and follow it all the way through."]);

/* ---------- SC7.11.5 Continental drift as an early explanation ---------- */

E("s7-u4-drift-identify", 4, ["SC7.11.5"], 1, "var", varset([
  function () {
    return mcq("What did the theory of continental drift claim?",
      "That the continents were once joined in a single landmass and have slowly moved apart to their present positions",
      ["That the continents are shrinking as the Earth cools",
       "That ocean water is slowly covering the continents",
       "That the continents formed where they are and have never moved"],
      "Continental drift (Wegener, 1912) proposed one supercontinent, Pangaea, breaking apart and drifting to today's map. It was the early explanation that plate tectonics later replaced and completed.", {});
  },
  function () {
    return mcq("Wegener named the single landmass that he believed later broke apart. What was it called?",
      "Pangaea",
      ["Atlantis", "Gondwana was the name he gave the whole landmass", "The name was never recorded"],
      "Wegener called the joined landmass Pangaea, meaning all lands. (Gondwana was its southern part, not the whole.)", {});
  }
]), ["Drift is the early explanation: joined once, apart now.", "One name belongs to the whole landmass; the others are parts or legends."]);

E("s7-u4-drift-evidence", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("Trilobite fossils found in the rocks of Newfoundland's Avalon Peninsula match fossils found in Wales, in the United Kingdom, more closely than fossils on the North American mainland nearby. How does this support continental drift?",
      "The Avalon region and Wales were once joined or close together, and drifted apart to their present positions",
      ["Trilobites swam across the Atlantic and settled in both places",
       "The fossils prove that Wales was once part of Canada politically",
       "The matching is a coincidence with no geological meaning"],
      "Trilobites were shallow-water animals that could not cross a deep ocean. Matching fossils across the Atlantic make sense if the two coasts were once neighbours, as Newfoundland's Avalon zone is now understood to have been attached to the European side.", {});
  },
  function () {
    return mcq("Which observation did Wegener use that involves the SHAPE of the continents?",
      "The coastlines of South America and Africa fit together like pieces of a jigsaw puzzle",
      ["Both continents are roughly triangular in shape",
       "The continents are all wider in the north than in the south",
       "The continents' shapes change noticeably every century"],
      "The fit of the Atlantic coastlines was Wegener's starting observation, and it grew stronger when the fit was made at the edge of the continental shelves rather than the modern beaches.", {});
  }
]), ["Fossils that match across an ocean need the ocean to have been absent or narrow.", "Wegener's first clue was a map: look for the option about fit."]);

E("s7-u4-drift-flaw", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("What was the major flaw in Wegener's theory of continental drift?",
      "It offered no workable mechanism: no force or process that could actually move the continents",
      ["It claimed the continents moved at several metres per year",
       "It was based on fossils that did not exist",
       "It said the continents had once been joined, which was the flaw"],
      "The claim itself turned out to be right; the flaw was the missing engine. Wegener suggested forces far too weak to do the job, and until convection and sea floor spreading supplied a mechanism, the theory could not be accepted.", {});
  },
  function () {
    return mcq("Wegener suggested the continents ploughed through the ocean floor as they moved. Why did this part of his theory fail?",
      "The ocean floor is strong rock; continents cannot plough through it, and no grooves or crushed floor from such ploughing exist",
      ["The ocean floor is liquid, so the continents would have sunk",
       "Continents move too fast to leave any mark on the floor",
       "The continents are lighter than air and float above the floor"],
      "Sea floor spreading replaced the ploughing picture: the floor moves with the continent as part of the same plate. Wegener's mechanism predicted a battered ocean floor that surveys never found.", {});
  }
]), ["The flaw was not the claim but the how: no mechanism strong enough.", "A mechanism makes predictions; check whether the predicted traces exist."]);

/* ---------- SC7.11.6 Plate tectonics as a major shift in world view ---------- */

E("s7-u4-shift-identify", 4, ["SC7.11.6"], 1, "var", varset([
  function () {
    return mcq("Why is plate tectonics described as a major shift in the scientific world view, rather than a small correction?",
      "It replaced the picture of a fixed Earth with a picture of an Earth whose surface is constantly being created, moved and recycled",
      ["It changed the names of the continents on world maps",
       "It corrected the measured size of the Earth by a small amount",
       "It only affected how earthquakes are named"],
      "A world view shift changes the framework itself: before, the Earth's surface was fixed and only wore down; after, the surface is a system of moving plates that builds mountains, opens oceans and recycles crust. Everything in geology is read differently inside the new picture.", {});
  },
  function () {
    return mcq("Which statement belongs to the plate tectonics world view?",
      "The Earth's surface is divided into plates that move, carrying continents and ocean floor, and interact at their boundaries",
      ["The continents are fixed, and only the oceans change over time",
       "Mountains form mainly where rivers deposit sediment",
       "The Earth's interior is completely solid and still"],
      "The plate tectonics picture: a moving, divided surface, with earthquakes, volcanoes and mountains concentrated at the boundaries where plates interact. The fixed-surface statements belong to the older view.", {});
  }
]), ["A shift replaces the framework, not a detail inside it.", "Look for the option in which the surface itself is in motion."]);

E("s7-u4-shift-contrast", 4, ["SC7.11.6"], 2, "var", varset([
  function () {
    return mcq("A student writes: 'The Atlantic Ocean has always been the same width, because the continents cannot move.' Which world view is the student using, and what evidence contradicts it?",
      "The old fixed-continent view; the matching coastlines, fossils and rock layers across the Atlantic, and the young, spreading ocean floor between them, contradict it",
      ["The plate tectonics view; no evidence contradicts it",
       "The continental drift view; satellite photographs contradict it",
       "The old fixed-continent view; the existence of tides contradicts it"],
      "Fixed continents was the pre-drift world view. It cannot explain why the Atlantic's shores match in shape, fossils and rocks, nor why the floor between them is young at the ridge and spreading: the ocean opened as the continents parted.", {});
  },
  function () {
    return mcq("Before plate tectonics, folded mountain ranges were explained by a cooling, shrinking Earth wrinkling like a baked apple. What did the plate tectonics shift change about this explanation?",
      "Mountains are now explained by plates colliding and squeezing the rock, a process still running today, not by a one-way shrinking of the whole Earth",
      ["Mountains are now believed to form in a single day",
       "The shrinking-apple explanation was proven correct in every detail",
       "Mountains are no longer considered worth explaining"],
      "The shift replaced a global shrinking with local, ongoing collisions: ranges rise where plates converge, which is why the Himalayas still grow and why ranges sit along boundary belts rather than anywhere at all.", {});
  }
]), ["Name the view from its claim: fixed, or moving?", "The contradicting evidence is the drift and spreading evidence, not everyday observations like tides."]);

/* ---------- SC7.11.7 Past theories ---------- */

E("s7-u4-past-explanations", 4, ["SC7.11.7"], 1, "var", varset([
  function () {
    return mcq("In Hawaiian tradition, volcanic eruptions were explained through Pele, the goddess of fire, whose anger or movements produced the lava. What observation was this explanation trying to account for?",
      "Lava erupting from the Earth and building new land, sometimes destructively and sometimes gently",
      ["The movement of the stars across the Hawaiian sky",
       "The arrival of the rainy season each year",
       "The formation of fossils in mountain rocks"],
      "Past explanations addressed real observations: Hawaiians lived with active volcanoes, and the Pele tradition explained when and why eruptions came, and how new land formed, in the terms their culture had.", {});
  },
  function () {
    return mcq("Which pairing of a past explanation with its idea is correct?",
      "Anaxagoras, a Greek thinker, suggested earthquakes were caused by winds and gases moving inside a hollow Earth",
      ["Descartes suggested earthquakes were caused by plates sliding past each other",
       "The Mi'kmaq tradition of Glooscap explains the Sugarloaf Mountains of New Brunswick as the remains of a giant beaver dam and its beavers, turned to stone",
       "Pele was a Greek goddess said to shake the Earth when angry"],
      "Anaxagoras blamed underground winds; Descartes imagined a once-incandescent Earth cooling and cracking; Glooscap's beaver dam story belongs to the Sugarloaf Mountains (the dam became the mountains and the beavers the islands); Pele is Hawaiian, not Greek.", {});
  }
]), ["Match each explanation to its culture and its event: volcano, earthquake, or mountains.", "Watch for swapped owners: the right idea with the wrong name attached is a wrong answer."]);

E("s7-u4-past-purpose", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return mcq("What do past explanations of volcanoes and earthquakes (such as Pele, or underground winds) have in common with modern scientific theories?",
      "Both try to explain observations of the natural world using the knowledge available at the time",
      ["Both are tested by controlled experiments before anyone believes them",
       "Both are written down by professional scientists",
       "Both turn out to be correct in their details"],
      "The shared purpose is explanation: people in every era connect observations into accounts of why events happen. What changed is the method: modern theories must survive testing against new evidence, and are revised or replaced when they do not.", {});
  },
  function () {
    return mcq("How do past explanations differ most importantly from the modern theory of plate tectonics?",
      "Plate tectonics is tested against new evidence and revised when evidence demands; the past explanations were not put to such tests",
      ["Plate tectonics is much older than the past explanations",
       "Past explanations were never believed by the people who told them",
       "Plate tectonics explains fewer observations than the past explanations"],
      "Belief and storytelling are not the difference; testing is. Plate tectonics makes predictions (where events occur, how old the floor is) that were checked and could have failed. The past explanations explained after the fact and were not tested that way.", {});
  }
]), ["Same job, different method: both explain; only one is tested.", "If an option says past peoples did not believe their own explanations, it underrates them and misses the point."]);

E("s7-u4-cr-past-theory", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return textq("Long ago, people living near an active volcano explained its eruptions as the work of a powerful being who lived inside the mountain. (a) What observation was this explanation trying to explain? (b) How is this explanation different from the modern scientific explanation of the same volcano?",
      ["(a) The observed eruptions themselves: lava, ash, rumblings and new land forming, events that were powerful, dangerous and irregular. (b) The past explanation names a being's actions and is not tested; the modern explanation (magma rising through a plate boundary or hot spot) is built from evidence, makes predictions (where eruptions occur, warning signs) and is revised when evidence changes"],
      "<b>Model answer:</b> (a) The explanation was trying to account for the eruptions people actually observed: the mountain rumbling, ash darkening the sky, lava flowing and sometimes destroying villages, and new land appearing where lava met the sea. (b) The difference is in how the explanation is held. The past explanation rests on the being's moods, so it fits any eruption after it happens and cannot be tested or used to predict the next one. The modern explanation says magma rises where plates part, collide or pass over a hot spot; it is built from evidence (the volcano's position in the worldwide pattern, gas and earthquake monitoring), it predicts where volcanoes should and should not occur, and it would be revised if the evidence stopped fitting.<br><br><b>Marking points:</b> 1 mark for the observation correctly identified (the eruptions and their effects). 1 mark for the difference stated in terms of testing, evidence or prediction, not merely that one is old and one is new.", {});
  }
]), ["Every explanation, old or new, starts from something observed: name it.", "The sharpest difference is testability: can the explanation be checked, and could it fail?"]);

/* ---------- SC7.12.1 Use a mineral classification key ---------- */

E("s7-u4-key-mineral", 4, ["SC7.12.1"], 1, "var", varset([
  function () {
    var q = mcq("Use the classification key and the specimen data. Which mineral is Specimen 1?",
      "Calcite",
      ["Feldspar", "Gypsum", "Quartz"],
      "Work the key: Specimen 1 is not magnetic (step 1), its streak is not red-brown (step 2), it does not break into heavy cubes (step 3) and does not split into sheets (step 4). A fingernail does not scratch it, and it fizzes in acid (step 8): calcite.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen 1: white and glassy; streak white; a fingernail does not scratch it, but a copper penny does; it fizzes (bubbles) when weak acid is dripped on it; not attracted to a magnet",
      "Specimen 2: clear and glassy; no streak visible on the plate; cannot be scratched by a steel file; breaks with a shell-like fracture; not attracted to a magnet"
    ]);
    return q;
  },
  function () {
    var q = mcq("Use the classification key and the specimen data. Which mineral is Specimen 2?",
      "Quartz",
      ["Calcite", "Feldspar", "Pyrite"],
      "Work the key: Specimen 2 passes steps 1 to 5 without matching, does not fizz in acid (step 8), is not brassy yellow (step 9), and at step 10 it is glassy with no cleavage, a shell-like fracture and hardness 7: quartz.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen 1: white and glassy; streak white; a fingernail does not scratch it, but a copper penny does; it fizzes (bubbles) when weak acid is dripped on it; not attracted to a magnet",
      "Specimen 2: clear and glassy; no streak visible on the plate; cannot be scratched by a steel file; breaks with a shell-like fracture; not attracted to a magnet"
    ]);
    return q;
  }
]), ["Work the key in order and eliminate as you go; do not jump to a mineral that merely looks right.", "The acid result is decisive for one specimen; the file result is decisive for the other."]);

E("s7-u4-key-mineral-2", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    var q = mcq("Use the classification key. Two dark specimens both have a metallic shine. Specimen A is strongly attracted to a magnet; Specimen B is not, but leaves a red-brown streak. What are A and B?",
      "A is magnetite and B is hematite",
      ["A is hematite and B is magnetite", "A is galena and B is pyrite", "Both specimens are magnetite"],
      "The key separates them at the first two steps: attraction to a magnet names magnetite at step 1, and a red-brown streak names hematite at step 2. Their similar appearance is exactly why the key starts with these tests.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen A: black, metallic shine; strongly attracted to a magnet; streak black",
      "Specimen B: dark grey, metallic shine; not attracted to a magnet; streak red-brown"
    ]);
    return q;
  },
  function () {
    var q = mcq("Use the classification key. A specimen is soft enough to be scratched by a fingernail, feels greasy, and leaves a black mark when rubbed on paper. Which mineral is it?",
      "Graphite",
      ["Gypsum", "Magnetite", "Talc"],
      "At step 5 the fingernail scratch sends the specimen to step 6, and at step 6 the greasy feel and the mark on paper name graphite. Talc is also soft and greasy-feeling, but it does not mark paper.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen: black and soft; scratched by a fingernail; feels greasy; marks paper with a black streak"
    ]);
    return q;
  }
]), ["When two specimens look alike, find the key step where their data first differs.", "Soft minerals are separated late in the key: follow the fingernail branch."]);

E("s7-u4-key-choose", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    return mcq("A student must identify an unknown mineral for a practical problem: it will be used to test whether a 'gold' nugget from a stream is real. Which property from the key should the student test FIRST to settle the question?",
      "Streak: gold leaves a yellow streak and its common look-alike, pyrite, leaves a greenish-black one",
      ["Colour: gold is the only yellow mineral",
       "Crystal form: gold never forms crystals",
       "Transparency: gold lets light through and pyrite does not"],
      "The practical problem is gold against pyrite, and streak separates them in one test. Colour cannot settle it (that is the whole difficulty), and the other options are not reliable differences.", {});
  },
  function () {
    return mcq("A key user reaches step 8 with a specimen and is unsure whether it fizzed in acid, because only one tiny bubble appeared. What is the most sensible next step?",
      "Repeat the acid test on a fresh surface of the specimen and watch carefully, since the identification depends on it",
      ["Skip the step and choose whichever mineral seems more likely",
       "Abandon the key and identify the mineral by colour alone",
       "Record the mineral as both calcite and not calcite"],
      "A key is only as good as its observations. When a decisive observation is doubtful, the practical move is to repeat the test properly, not to guess past it.", {});
  }
]), ["Choose the test that separates the actual candidates, not a test that is merely easy.", "A doubtful observation at a branching step is worth repeating; guessing compounds the error."]);

/* ---------- SC7.12.2 Select methods and tools to identify minerals ---------- */

E("s7-u4-tool-ladder", 4, ["SC7.12.2"], 1, "gen", function () {
  var sets = [
    { q: "A mineral is scratched by a steel nail (hardness 4.5) but not by a copper penny (hardness 3.5). Which tool should be tried next to narrow down its hardness?", tool: "A glass plate (hardness 5.5): if the mineral scratches the glass, it is harder than 5.5; if not, its hardness lies between 4.5 and 5.5", others: ["A fingernail (hardness 2.5), which is softer than the penny that already failed", "Sandpaper alone, without comparing it to the known tools", "A magnet, to test the mineral's hardness by attraction"] },
    { q: "A mineral cannot be scratched by a fingernail (hardness 2.5) but is scratched by a copper penny (hardness 3.5). What is the best next test?", tool: "Try the steel nail (hardness 4.5) to check whether the hardness reaches that high, bracketing the value between 3.5 and 4.5", others: ["Try the emery cloth (hardness 9) to see the mineral at its hardest test first", "Stop testing: the hardness is exactly 3.5", "Test the streak, which gives the hardness directly"] },
    { q: "A mineral scratches a glass plate (hardness 5.5) but is scratched by a steel file (hardness 6.5). Which statement about its hardness is correct?", tool: "Its hardness is between 5.5 and 6.5", others: ["Its hardness is exactly 6.5, the file's value", "Its hardness is below 5.5, because the file scratched it", "Its hardness cannot be estimated from scratch tests"] }
  ];
  var s = pick(sets);
  return mcq(s.q, s.tool, s.others,
    "Scratch testing brackets a mineral's hardness between the hardest tool that fails and the softest tool that succeeds. Each new test should narrow the bracket, using the ladder of known tools: fingernail 2.5, penny 3.5, nail 4.5, glass 5.5, file 6.5.", {});
}, ["Build a bracket: the hardness sits between the last tool that failed and the first that worked.", "A useful next test is one whose result would shrink the bracket, not repeat it."]);

E("s7-u4-method-match", 4, ["SC7.12.2"], 1, "var", varset([
  function () {
    return mcq("A student wants to find out whether an unknown mineral reacts with acid, the way calcite does. Which method should the student select?",
      "Place a drop of weak acid (or vinegar) on a fresh surface of the mineral and watch for bubbles of gas",
      ["Rub the mineral on a porcelain plate and examine the powder",
       "Hold a magnet near the mineral and watch for movement",
       "Shine a bright light through a thin edge of the mineral"],
      "Each method answers one question: acid tests for the carbonate reaction (fizzing), the plate gives streak, the magnet tests magnetism, and the light tests transparency. Match the method to the property asked about.", {});
  },
  function () {
    return mcq("Which method is the right tool for examining the tiny crystals on a mineral sample's surface?",
      "A hand lens, held close, to magnify the surface so the crystals can be seen and described",
      ["A streak plate, rubbed across the surface",
       "A steel file, drawn across the surface",
       "A magnet, passed slowly over the surface"],
      "Observation tools and testing tools do different jobs: the hand lens magnifies for looking; the plate, file and magnet all change or test the sample rather than help you see it.", {});
  }
]), ["One method per property: acid for reaction, plate for streak, magnet for magnetism, lens for looking.", "If a method would damage or alter the sample, it is not an observation tool."]);

E("s7-u4-method-plan", 4, ["SC7.12.2"], 2, "var", varset([
  function () {
    return mcq("A student is given one small unknown mineral sample that must be returned undamaged if possible. Which order of tests is the best plan?",
      "Observe colour and lustre, test magnetism and streak, then scratch tests from softest tool upward, and acid last on a small corner",
      ["Acid first, then the steel file, then observation of colour and lustre",
       "Scratch with the steel file first to settle the hardness at once",
       "Break the sample in half first so the inside can be tested"],
      "A good plan runs from least to most damaging and from observation to intervention: looking costs nothing, streak and magnetism leave the sample nearly untouched, scratch tools go soft to hard so the first successful scratch does the least harm, and acid, which consumes a little of the sample, goes last.", {});
  },
  function () {
    return mcq("Why do mineral testers work UP the hardness ladder (fingernail, penny, nail, glass, file) instead of starting with the steel file?",
      "Starting soft brackets the hardness with the least damage: each failed tool leaves no mark, and the first tool that works sets the upper edge of the bracket",
      ["The file is too expensive to use on unknown minerals",
       "The ladder's order is a tradition with no practical reason",
       "Soft tools give more accurate hardness values than hard tools"],
      "If the file went first, every soft mineral would be gouged before its hardness was known, and the result would only say 'softer than 6.5'. Climbing the ladder narrows the value step by step and leaves failed tests unmarked.", {});
  }
]), ["Order tests by cost: free observations first, damaging tests last.", "Soft-to-hard is not politeness; it is how the bracket narrows without ruining the sample."]);

/* ---------- SC7.12.3 Identify common minerals using a key ---------- */

E("s7-u4-mineral-id", 4, ["SC7.12.3"], 1, "gen", function () {
  var sets = [
    { props: "brassy yellow colour, metallic lustre, greenish-black streak, hardness about 6, not attracted to a magnet", name: "Pyrite", others: ["Galena", "Graphite", "Magnetite"] },
    { props: "lead grey colour, metallic lustre, grey streak, hardness 2.5, breaks into cube-shaped pieces and feels very heavy for its size", name: "Galena", others: ["Graphite", "Hematite", "Pyrite"] },
    { props: "white to clear, silky lustre, hardness 2, can be scratched by a fingernail, does not feel greasy and does not mark paper", name: "Gypsum", others: ["Calcite", "Quartz", "Talc"] },
    { props: "black, metallic lustre, black streak, hardness about 6, strongly attracted to a magnet", name: "Magnetite", others: ["Galena", "Graphite", "Hematite"] }
  ];
  var s = pick(sets);
  var q = mcq("Use the classification key. A specimen shows these properties: " + s.props + ". Which mineral is it?",
    s.name, s.others,
    "Run the property set through the key in order, checking the decisive properties (magnetism, streak, hardness, special features like cubic cleavage or fizzing) rather than matching on colour alone.", {});
  q.figure = s7MineralKeyFigure(["Specimen: " + s.props]);
  return q;
}, ["Check the decisive properties first: magnetism, streak colour, and any special feature.", "Colour alone matches several minerals; the key exists because colour is not enough."]);

E("s7-u4-mineral-id-2", 4, ["SC7.12.3"], 2, "gen", function () {
  var sets = [
    { props: "dark silver-grey and metallic looking, but its streak on the plate is red-brown; hardness about 6; not attracted to a magnet", name: "Hematite", others: ["Galena", "Magnetite", "Pyrite"] },
    { props: "clear and glassy, hardness 3, splits along flat planes, and fizzes steadily when weak acid is dripped on it", name: "Calcite", others: ["Feldspar", "Gypsum", "Quartz"] },
    { props: "pale pink, pearly to glassy lustre, hardness 6, white streak, and it splits along flat planes in two directions", name: "Feldspar", others: ["Calcite", "Gypsum", "Quartz"] },
    { props: "silvery and pearly, hardness about 2.5 to 3, and it peels apart into thin, flexible, transparent sheets", name: "Mica", others: ["Galena", "Gypsum", "Talc"] }
  ];
  var s = pick(sets);
  var q = mcq("Use the classification key. A specimen shows these properties: " + s.props + ". Which mineral is it?",
    s.name, s.others,
    "Each set carries one decisive property: hematite's red-brown streak contradicts its grey look, calcite fizzes in acid, feldspar has two-direction cleavage at hardness 6, and mica peels into flexible sheets.", {});
  q.figure = s7MineralKeyFigure(["Specimen: " + s.props]);
  return q;
}, ["These sets hide one decisive property each; find it before choosing.", "When looks and streak disagree, believe the streak."]);

E("s7-u4-mineral-pair", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    return mcq("Quartz and calcite can both be clear and glassy. Which single property from the key separates them most reliably?",
      "Hardness: quartz (7) cannot be scratched by a steel file, while calcite (3) is scratched even by a copper penny",
      ["Colour: quartz is always white and calcite is always clear",
       "Lustre: calcite is metallic and quartz is not",
       "Streak: both leave a bright red streak"],
      "Their looks overlap, but their hardnesses are far apart (7 against 3), so one scratch test settles it; calcite's acid fizz also separates them. Colour and lustre overlap too much to trust.", {});
  },
  function () {
    return mcq("Hematite and magnetite are both dark, heavy, metallic minerals. Which single test separates them fastest?",
      "A magnet: magnetite is attracted to it and hematite is not (and their streaks also differ, black against red-brown)",
      ["Weighing them: both are heavy, so the heavier one is magnetite",
       "Colour: magnetite is dark and hematite is light",
       "Hardness: their hardnesses are at opposite ends of the scale"],
      "Magnetism is decisive and instant for this pair: only magnetite responds. Weight and colour are too similar to separate them, and their hardness ranges overlap.", {});
  }
]), ["For a look-alike pair, hunt the property where the two minerals differ most.", "If both minerals share the property in an option, that option cannot separate them."]);

E("s7-u4-cr-mineral-id", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    var q = textq("Use the classification key. Identify Specimen X and justify your identification with TWO properties from its data.",
      ["Specimen X is hematite: the red-brown streak is decisive (step 2 of the key), supported by its hardness (about 6, not scratched by a nail) or its dark metallic appearance combined with no magnetism (ruling out magnetite)"],
      "<b>Model answer:</b> Specimen X is hematite. First property: its streak is red-brown, which the key gives at step 2 as hematite's signature; no other mineral in the key leaves that streak. Second property: it is not attracted to a magnet, which rules out magnetite, the other dark metallic mineral it resembles; its hardness of about 6 also fits hematite and rules out the soft dark minerals such as graphite.<br><br><b>Marking points:</b> 1 mark for the correct identification (hematite). 1 mark for two properties from the data correctly used as justification, at least one of them decisive (the red-brown streak).", {});
    q.figure = s7MineralKeyFigure([
      "Specimen X: dark grey, metallic shine; streak red-brown; hardness about 6 (a steel nail does not scratch it); not attracted to a magnet"
    ]);
    return q;
  }
]), ["Name the mineral, then defend it: two properties, at least one of them decisive.", "A justification that only repeats the colour earns nothing; use the key's branching properties."]);

/* ---------- SC7.12.4 Identify questions from rock cycle study ---------- */

E("s7-u4-question-identify", 4, ["SC7.12.4"], 1, "var", varset([
  function () {
    return mcq("A class is studying the rock cycle with a tray of local rock samples. Which of the following is an investigable question arising from that study?",
      "How do the crystals or minerals form in a rock?",
      ["What is the exact age of the Earth?",
       "Which rock in the tray is the prettiest?",
       "Who first named the three rock families?"],
      "An investigable question can be pursued with observations, samples or research into processes: crystal formation can be investigated through cooling experiments and samples. Exact ages, tastes and naming history cannot be investigated from the rock study itself.", {});
  },
  function () {
    return mcq("Which question arising from rock cycle study could actually be investigated with the samples and tools in a classroom?",
      "Why are some rocks rounded and others angular: what does the shape record about how far the pieces travelled?",
      ["Why did the Earth form with exactly three rock families?",
       "What will this rock look like in exactly one million years?",
       "Which rock family is the most important on Earth?"],
      "Rounded against angular pieces can be compared across samples and connected to transport distance, an investigation the class can run. The others ask for unknowable exact futures, purposes, or rankings no evidence can settle.", {});
  }
]), ["Investigable means evidence can be brought to bear: samples, observations, comparisons.", "Questions of taste, purpose or exact distant futures cannot be investigated, however interesting they are."]);

E("s7-u4-question-best", 4, ["SC7.12.4"], 3, "var", varset([
  function () {
    return mcq("After studying the rock cycle, a student still has a question and wants one that could drive a real investigation with rock samples, a freezer, water and a tumbler of sand. Which question is strongest?",
      "Does freezing and thawing water in rock cracks break rock faster than tumbling the same rock in sand and water?",
      ["Why is the rock cycle a cycle and not a line?",
       "How many rocks are there in the world?",
       "What is the best rock for a pet rock?"],
      "The strongest question compares two weathering processes under controlled conditions with the equipment named, and its answer comes from measurements the student can take. The others are definitional, uncountable, or matters of taste.", {});
  },
  function () {
    return mcq("A student asks: 'I wonder why this sedimentary rock has layers of different colours.' Which follow-up turns it into the strongest investigable question?",
      "Do the different-coloured layers contain different sediment sizes or materials, suggesting the conditions changed as each layer was deposited?",
      ["Are the layers pretty enough to display in the classroom?",
       "Who coloured the layers, and why did they choose those colours?",
       "How old is each layer, to the exact year?"],
      "The strong follow-up points at observable differences (grain size, material) that can be checked in the sample and connected to deposition conditions. Exact years are beyond the tools, and the rest are taste or false agency.", {});
  }
]), ["A strong question names something measurable and a comparison to make.", "If the question cannot be answered with the samples and tools at hand, it is not yet investigable."]);

E("s7-u4-cycle-path", 4, ["SC7.12.4"], 2, "var", varset([
  function () {
    var q = mcq("Use the rock cycle diagram. A question arises from the diagram: can a sedimentary rock become an igneous rock directly, in one step? What does the diagram show?",
      "No: the sedimentary rock must first be changed by heat and pressure and then melt, or melt as burial deepens, before cooling can make it igneous",
      ["Yes: any rock can become any other rock in one step",
       "No: sedimentary rock can never become igneous rock, even over millions of years",
       "Yes, if the sedimentary rock is left at the surface long enough"],
      "Follow the arrows from the sedimentary box: none runs straight to igneous. The route passes through metamorphic rock and magma: heat and pressure, then melting, then cooling. The cycle allows the journey, but never in one step.", {});
    q.figure = s7RockCycleSVG();
    return q;
  },
  function () {
    var q = mcq("Use the rock cycle diagram. Which route takes a metamorphic rock back to the start of the cycle as sediments?",
      "Weathering and erosion break the metamorphic rock down into sediments",
      ["Melting turns it directly into sediments",
       "Compaction and cementation press it into sediments",
       "Cooling hardens it into sediments"],
      "Sediments are made by breaking rock down at the surface: weathering and erosion. Melting makes magma, compaction and cementation consume sediments rather than create them, and cooling makes igneous rock.", {});
    q.figure = s7RockCycleSVG();
    return q;
  }
]), ["Answer from the arrows, not from intuition: a route exists only if arrows trace it.", "Sediments come from breaking down, never from melting or cooling."]);

/* ---------- SC7.12.5 Carry out procedures controlling variables (CORE) ----------
   Cognitive core covered here and in the design CR: naming the
   manipulated, responding and controlled variables in the Rocks
   that Fizz and Soil Sleuth procedures, and designing a fair test
   on paper. Performance residue: carrying out the procedures
   themselves (handling acid safely, timing drainage, controlling
   the variables in a real laboratory) stands outside the bank. */

E("s7-u4-fizz-variables", 4, ["SC7.12.5"], 1, "var", varset([
  function () {
    return mcq("In the Rocks that Fizz investigation, a student places drops of acid on six different rocks and rates how much each one fizzes. What is the manipulated (independent) variable?",
      "The type of rock tested",
      ["The amount of fizz produced",
       "The number of drops of acid used",
       "The time of day the test is done"],
      "The student deliberately changes the rock from trial to trial: that is the manipulated variable. The fizz is what responds. The drops of acid are kept the same on purpose, which makes them a controlled variable, not the manipulated one.", {});
  },
  function () {
    return mcq("In the same investigation, what is the responding (dependent) variable?",
      "The amount of fizz each rock produces",
      ["The type of rock tested",
       "The strength of the acid used",
       "The size of the drops"],
      "The responding variable is the one measured as the outcome: how much each rock fizzes. The rock type is manipulated by the student, and the acid strength and drop size are controlled so they cannot confuse the result.", {});
  }
]), ["Manipulated means the investigator changes it on purpose; responding means it is measured as the outcome.", "Anything deliberately kept the same is controlled, and belongs to neither answer."]);

E("s7-u4-fair-test-design", 4, ["SC7.12.5"], 2, "var", varset([
  function () {
    return mcq("A class designs a fair test of how fast water drains through sand, clay and gravel. Which set of choices keeps the test fair?",
      "The same volume of each soil, the same volume of water poured the same way, the same cup and filter set-up, and timing started the same way for each",
      ["More water for the clay, since it is slower, to help it finish in time",
       "A bigger cup for the gravel so its large pieces fit better",
       "Different amounts of soil, using whatever each group scooped up"],
      "A fair test changes only the soil type. Helping the clay with extra water, or changing the apparatus between samples, would mix other variables into the drainage times and ruin the comparison.", {});
  },
  function () {
    return mcq("Midway through the drainage test, a group notices their clay sample was packed down hard while the sand was poured loosely. What should they do?",
      "Restart the clay trial with the sample prepared the same way as the others, and note the change",
      ["Keep the result, since clay is slow anyway",
       "Pack the sand down in the next class to make up for it",
       "Drop the clay result and report only sand and gravel"],
      "Packing is a variable: if it differs between samples, the times no longer compare soils alone. The fair move is to redo the affected trial under the same preparation and record what was done.", {});
  }
]), ["Fair means one difference only: the thing being tested.", "A discovered unfairness is fixed by redoing the trial properly, not by adjusting the numbers."]);

E("s7-u4-cr-design-investigation", 4, ["SC7.12.5"], 3, "var", varset([
  function () {
    return textq("Design a fair test to answer this question: does the size of a soil's particles affect how fast water drains through it? In your design, state a hypothesis, name the manipulated variable, the responding variable and at least two variables you would control, and describe briefly how you would set the test up. (This entry is for practice and teacher-picked sets; it is not drawn by the unit test convention.)",
      ["A complete design: hypothesis linking particle size to drainage speed; manipulated variable the soil type (particle size: sand, loam, clay or gravel); responding variable the time for a fixed volume of water (for example 25 mL) to drain through; controls such as same volume of soil, same cup and filter, same volume and pouring of water, same preparation; a set-up repeating the timing for each soil under identical conditions"],
      "<b>Model answer:</b> Hypothesis: if a soil's particles are larger, then water will drain through it faster, because larger particles leave larger connected spaces for water to move through. Manipulated variable: the type of soil (gravel, sand, loam, clay), which sets the particle size. Responding variable: the time taken for 25 mL of water to drain through the sample. Controls: the same volume of each soil, the same cup with the same filter, the same 25 mL of water poured at the same rate, each sample prepared the same way (poured in loosely, not packed), and the same timing method. Set-up: line identical cups with filter material, add the same volume of each soil, pour 25 mL of water over each, and time how long the water takes to drain through, repeating each soil at least twice to check the times are consistent.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis connecting particle size to drainage. 1 mark for the manipulated and responding variables correctly named. 1 mark for at least two sensible controls held constant. 1 mark for a workable set-up in which only the soil changes between trials.", {});
  }
]), ["Use the Soil Sleuth pattern: hypothesis, what you change, what you time, what you hold still.", "Same water, same volume, same set-up: fairness is a list of sames."]);

/* ---------- SC7.12.6 Use instruments effectively and accurately (CORE) ----------
   Cognitive core covered here: choosing the instrument for a
   measurement and reading a stated measurement accurately.
   Performance residue: using the instruments themselves
   (estimating particle diameter through a hand lens, reading a
   meniscus on a real cylinder, timing a drainage accurately)
   stands outside the bank. */

E("s7-u4-instrument-read", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("A student times how long 25 mL of water takes to drain through a soil sample. The stopwatch shows the water finished draining somewhere between 44 and 45 seconds, closer to 45. Which is the most accurate way to record the result?",
      "Record the time to the precision the watch allows (for example 44.8 s if the watch shows tenths), and use the same method for every sample",
      ["Record exactly 45 s, since it must be a whole number",
       "Record 'about a minute', since precision does not matter in a comparison",
       "Record 44 s for this sample and round other samples differently to save time"],
      "Accuracy means reading the instrument to its real precision and reading every trial the same way. Invented round numbers and changing methods between samples both corrupt the comparison the times are for.", {});
  },
  function () {
    return mcq("A graduated cylinder holds water for the drainage test. The bottom of the water's curved surface (the meniscus) sits level with the 25 mark when viewed at eye level, but a student reading from above sees it at 27. Which reading is accurate, and why?",
      "25 mL: a meniscus is read at eye level, from the bottom of the curve, to avoid the viewing-angle error",
      ["27 mL: the view from above is always the true one",
       "26 mL: the average of the two views is most accurate",
       "Either reading is fine, since 2 mL cannot affect the test"],
      "Liquid surfaces curve, and the scale is read at the bottom of the meniscus with the eye level with it. Reading from above introduces a consistent error, and 2 mL in 25 is an 8 percent error, large enough to distort a drainage comparison.", {});
  }
]), ["Read the instrument the way it was designed to be read: eye level, bottom of the meniscus, real precision.", "Consistency across trials is part of accuracy, not a nicety."]);

E("s7-u4-instrument-choose", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("A Soil Sleuth team must compare the particle sizes of sand, clay and gravel samples. Which instrument and practice best serves the measurement?",
      "A hand lens and a ruler: examine the particles magnified and measure or compare their diameters against the ruler's scale",
      ["A graduated cylinder: pour the particles in and read their size from the scale",
       "A stopwatch: time how fast the particles settle and report the time as the size",
       "A magnet: sort the particles by attraction and report the groups as sizes"],
      "Particle size is a length: it is measured by looking (magnified, with the hand lens) and comparing against a scale (the ruler). The cylinder measures volume, the watch measures time, and the magnet sorts by magnetism, none of which is a diameter.", {});
  },
  function () {
    return mcq("Which pairing of measurement and instrument is correct for the soil investigations?",
      "Volume of water: graduated cylinder; drainage time: stopwatch; particle size: hand lens with a ruler",
      ["Volume of water: stopwatch; drainage time: graduated cylinder; particle size: magnet",
       "Volume of water: hand lens; drainage time: ruler; particle size: graduated cylinder",
       "All three measurements: the graduated cylinder alone"],
      "Each quantity has its instrument: volumes in the cylinder, times on the watch, sizes under the lens against a scale. Instruments are chosen by the quantity they measure, not by which is nearest.", {});
  }
]), ["Name the quantity first (volume, time, length), then pick the instrument that measures it.", "A familiar instrument used on the wrong quantity gives a precise wrong answer."]);

/* ---------- SC7.12.7 Compile, organize and display data in tables ---------- */

E("s7-u4-table-build", 4, ["SC7.12.7"], 1, "var", varset([
  function () {
    return mcq("A Soil Sleuth team records, for each of four samples (sand, clay, gravel, local soil), its colour, average particle size, texture and drainage time. Which table organizes this data correctly?",
      "A table with one row per sample and one column per measurement (colour, particle size, texture, drainage time), with a title naming what was measured",
      ["A table with one row per measurement and the four samples' values added together in a single column",
       "A list of the samples in the order the team happened to test them, with notes underneath",
       "A table showing only the drainage times, since those are the results that matter"],
      "The data has two factors (sample and measurement), so the table needs rows for one and columns for the other, with every value kept separate and a title. Adding values together or dropping measurements destroys data the team collected.", {});
  },
  function () {
    return mcq("A mineral team tested eight samples and recorded colour, streak, hardness and the mineral each turned out to be. Which feature must their results table have to be useful for spotting patterns later?",
      "One row per sample with the properties in the same columns for every sample, so any property can be compared down its column",
      ["The samples arranged by how much the team liked them",
       "A separate small table for each sample, each with its own layout",
       "Only the correctly identified samples included, to keep the table tidy"],
      "Patterns appear down columns: streak against identification, hardness against identification. That requires a consistent grid, every sample in the same columns, including the misses, which are data too.", {});
  }
]), ["Rows for one factor, columns for the other, every value kept, and a title.", "A table that drops the failures drops the pattern with them."]);

E("s7-u4-table-read", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return mcq("A results table from the mineral laboratory shows: Sample 1, streak white, hardness 3, fizzes in acid, identified as calcite; Sample 2, streak white, hardness 7, no fizz, identified as quartz; Sample 3, streak red-brown, hardness 6, no fizz, identified as hematite; Sample 4, streak yellow, hardness 3, no fizz, not in the key's ten minerals. Which conclusion does the table support?",
      "Streak colour alone does not identify a mineral: two samples share a white streak but are different minerals, separated by hardness and the acid test",
      ["Every mineral with a white streak is calcite",
       "Hardness never matters when the streak is known",
       "Sample 4 must be gold, because its streak is yellow"],
      "Read down the columns: Samples 1 and 2 share a streak but differ in hardness and acid reaction, and they are different minerals. Identification needs the combination of properties, which is the table's whole lesson. Sample 4's yellow streak is noted without an identification; the table does not name it gold.", {});
  }
]), ["Read down each column and look for what stays together and what splits.", "Shared values in one column mean that property alone cannot be the identifier."]);

E("s7-u4-cr-table-display", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return textq("A student ran the Rocks that Fizz test and recorded the results in rough notes: granite, no fizz; chalk, strong fizz; sandstone, no fizz; shale, no fizz; marble, strong fizz; limestone, strong fizz. Organize these results into a data table. Give your table a title, and state in one sentence what the table makes easy to see.",
      ["A table titled, for example, 'Amount of fizz when acid is dripped on six rocks', with one row per rock and columns for the rock and its fizz result (none or strong). The sentence: the table makes it easy to see at a glance which rocks reacted with the acid and which did not, so the reacting group (chalk, marble, limestone) can be compared with the non-reacting group"],
      "<b>Model answer:</b> Title: Amount of fizz produced when acid is dripped on six rocks. Table: Rock | Fizz result. Granite | none. Chalk | strong. Sandstone | none. Shale | none. Marble | strong. Limestone | strong. What the table makes easy to see: the six rocks split cleanly into two groups, three that fizz strongly in acid and three that do not react at all, a pattern that is hard to spot in the rough notes but obvious in the table.<br><br><b>Marking points:</b> 1 mark for a correctly organized table (title, one row per rock, the fizz results accurately placed). 1 mark for the sentence identifying what the table reveals (the clean split into reacting and non-reacting rocks).", {});
  }
]), ["A table needs a title that says what was measured, not just 'Results'.", "The sentence after the table is the point of the exercise: name the pattern the table exposes."]);

/* ---------- SC7.12.8 Interpret patterns and trends in data ---------- */

E("s7-u4-pattern-drainage", 4, ["SC7.12.8"], 2, "var", varset([
  function () {
    var q = mcq("Use the drainage data display. Which relationship between particle size and drainage does the data show?",
      "As particle size increases, drainage gets faster: the coarse gravel drains quickest and the fine clay slowest",
      ["As particle size increases, drainage gets slower",
       "Particle size makes no difference to drainage in this data",
       "The relationship reverses halfway: medium particles drain slowest of all"],
      "Read the bars against the particle sizes: gravel (coarsest) 6 s, sand 14 s, loam 47 s, clay (finest) 168 s. The times rise steadily as the particles get finer, a single clear relationship.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  },
  function () {
    var q = mcq("Use the drainage data display. A fifth sample, a coarse sand mixed with small pebbles, is tested the same way. Based on the pattern, what drainage time is most reasonable to predict?",
      "A short time, closer to gravel and sand than to clay, because its particles are coarse",
      ["The longest time of all, because new samples always drain slowest",
       "Exactly 168 s, the same as clay",
       "The pattern gives no basis for any prediction"],
      "Patterns earn their keep by predicting: drainage time falls as particle size rises, so a coarse mixture should drain fast, in the range of the other coarse samples, not near the clay's time.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  }
]), ["Order the samples by particle size first, then read the times in that order.", "A pattern you cannot predict from is a pattern you have not really read."]);

E("s7-u4-pattern-infer", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return mcq("In the fizz test, the results were: granite no fizz, sandstone no fizz, shale no fizz, chalk strong fizz, marble strong fizz, limestone strong fizz. Marble is metamorphosed limestone, and chalk is a soft form of limestone. Which inference best explains the pattern?",
      "The fizzing rocks are all forms of the same material (limestone), so the acid reaction depends on what the rock is made of, not on the rock family it belongs to",
      ["Metamorphic rocks always fizz and igneous rocks never do",
       "Rocks with shorter names fizz more than rocks with longer names",
       "The acid was stronger on the days the fizzing rocks were tested"],
      "Group the results by composition and the pattern resolves: the three fizzers share limestone's material across two families (sedimentary chalk and limestone, metamorphic marble), while the non-fizzers are other materials. The variable that explains the split is composition.", {});
  },
  function () {
    return mcq("A class plots its mineral results: every sample with hardness above 5.5 scratched glass, every sample below 5.5 did not, and the one sample at about 5.5 left a faint mark. What relationship can the class infer?",
      "Whether a mineral scratches glass depends on whether its hardness is above or below the glass's hardness of 5.5",
      ["Harder minerals are always darker in colour",
       "Glass scratches every mineral given enough time",
       "Hardness and scratching are unrelated, and the plot is a coincidence"],
      "The split in the data falls exactly at the glass's own hardness, which is the relationship scratch testing is built on: the harder material scratches the softer. Colour plays no part in the pattern.", {});
  }
]), ["Group the results two ways (by family, by composition; by colour, by hardness) and see which grouping explains the split.", "The explaining variable is the one whose groups line up perfectly with the outcomes."]);

E("s7-u4-cr-pattern", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return textq("A class tested how long 25 mL of water took to drain through four soils: gravel 6 s, sand 14 s, loam 47 s, clay 168 s. (a) Describe the pattern in the data. (b) Explain the relationship between the soils' particle sizes and the drainage times, using the idea of spaces between particles.",
      ["(a) Drainage time increases steadily as the soil gets finer: gravel fastest, then sand, then loam, with clay far slower than all the others. (b) Larger particles leave larger connected spaces (pores) between them, so water moves through quickly (high permeability); fine clay particles pack tightly with tiny spaces, so water creeps through slowly even though the clay can hold a lot of water in total"],
      "<b>Model answer:</b> (a) The pattern is a steady rise: as the soils go from coarsest to finest (gravel, sand, loam, clay), the drainage time climbs from 6 seconds to 168 seconds, with the biggest jump at the clay. (b) The relationship runs through the spaces between particles. Coarse particles cannot pack closely, so they leave large, connected spaces, and water flows through them quickly. Fine clay particles pack tightly together, leaving only tiny spaces; the clay can hold plenty of water in total (it is porous), but the water can barely move (it is not very permeable), so draining takes far longer. Particle size controls the size of the spaces, and the size of the spaces controls the drainage.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately, in order, with the clay's jump noted. 1 mark for the relationship stated (finer particles, slower drainage). 1 mark for the explanation through pore size and permeability.", {});
  }
]), ["Describe the numbers in order before explaining them.", "The explanation lives in the spaces: big particles, big spaces, fast flow."]);

/* ---------- SC7.12.9 State a conclusion from experimental data ---------- */

E("s7-u4-conclusion-state", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("A student's initial idea was: 'Any rock will fizz if you use enough acid.' In the test, granite, sandstone and shale produced no fizz at all with the acid used, while chalk, marble and limestone fizzed strongly. Which conclusion should the student state?",
      "The data refutes the initial idea as stated: with this acid, only the limestone-family rocks fizzed, so fizzing depends on what the rock is made of",
      ["The data supports the initial idea, because some rocks fizzed",
       "The data proves no rock anywhere can fizz",
       "The conclusion is that the acid was too weak to test anything"],
      "A conclusion answers the initial idea directly: it predicted all rocks would fizz, and three did not. The supported conclusion is narrower and matches the data: composition decides. Some rocks fizzing does not rescue a claim about all rocks.", {});
  },
  function () {
    return mcq("A team hypothesized that the local soil would drain like sand, because it looks gritty. Their times were: local soil 41 s, sand 14 s, loam 47 s, clay 168 s. Which conclusion fits the data?",
      "The hypothesis is not supported: the local soil drained much more slowly than sand and closest to loam, so it behaves as a loamy soil despite its gritty look",
      ["The hypothesis is supported, because the local soil did drain",
       "The data is useless, because the hypothesis turned out wrong",
       "The conclusion is that drainage times cannot be compared"],
      "Compare the local soil's time with the references: 41 s sits beside loam's 47 s, far from sand's 14 s. The conclusion must follow the numbers, and a refuted hypothesis is a result, not a failure of the data.", {});
  }
]), ["A conclusion speaks to the initial idea by name: supported, or refuted, and by which numbers.", "'Some' never proves 'all': check the claim's exact wording against the data."]);

E("s7-u4-conclusion-refute", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("A student predicted that a dark, heavy rock sample would fizz in acid 'because it looks like the rocks that fizzed yesterday'. It produced no fizz at all, and its streak was red-brown. What is the best conclusion?",
      "The prediction is refuted: appearance misled, and the data (no fizz, red-brown streak) point to the sample being hematite, an iron mineral that does not react with acid",
      ["The prediction stands, because the rock still looks like a fizzing rock",
       "The test must have been done wrong, since predictions are never wrong",
       "The conclusion is that streak tests cause rocks not to fizz"],
      "Conclusions follow data, not hopes: the fizz test says not a limestone-family rock, and the streak identifies hematite. The refuted prediction is useful: it shows appearance is a poor guide, which the conclusion should say.", {});
  }
]), ["When the data and the prediction disagree, the conclusion sides with the data and says so.", "A refuted prediction is a finding: state what the data points to instead."]);

E("s7-u4-cr-conclusion", 4, ["SC7.12.9"], 3, "var", varset([
  function () {
    return textq("A class began with this idea: 'Adding sand to a clay soil will not change how it drains, because the clay will still be there.' They tested pure clay (drainage time 168 s), then clay mixed with sand (74 s), then clay mixed with twice as much sand (38 s), using the same volume of soil and water each time. State a conclusion from this data, and explain how the data supports or refutes the class's initial idea.",
      ["Conclusion: adding sand makes clay soil drain faster, and more sand makes it faster still. The initial idea is refuted: the drainage time fell from 168 s to 74 s to 38 s as sand was added, even though the clay was still present in every mixture. Explanation: the sand's larger particles open larger spaces in the mixture, raising its permeability"],
      "<b>Model answer:</b> Conclusion: adding sand to clay soil speeds up its drainage, and the more sand is added, the faster it drains. The class's initial idea is refuted by the data: with the same volumes and the same test each time, the drainage time dropped from 168 s for pure clay to 74 s with sand added and 38 s with twice the sand, even though clay was present in all three samples. The reason fits the particle-space model: the sand grains hold the clay particles apart and open larger connected spaces, so water moves through the mixture more easily. The clay being 'still there' did not preserve the drainage time, because drainage depends on the spaces in the whole mixture, not on one ingredient.<br><br><b>Marking points:</b> 1 mark for a conclusion that states the effect (sand speeds drainage, more sand speeds it more). 1 mark for the verdict on the initial idea (refuted) tied to the actual times. 1 mark for the explanation through particle spaces or permeability.", {});
  }
]), ["Quote the times in your answer; a conclusion without its numbers is an opinion.", "Refuted is a respectable verdict: say it plainly and show the data that forces it."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-a-fair-test item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U4 = {
  "s7-u4-cr-design-investigation": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s7-u1-cr-boreal-example":3,"s7-u1-cr-data-display":3,"s7-u1-cr-defend-position":3,"s7-u1-cr-design-experiment":4,"s7-u1-cr-energy-flow":3,"s7-u1-cr-factor-effect":2,"s7-u1-cr-habitat-defence":3,"s7-u1-cr-harvest-decision":3,"s7-u1-cr-recycling":2,"s7-u1-cr-silviculture":2,"s7-u1-cr-succession-compare":2,"s7-u1-cr-succession-stages":2,"s7-u1-cr-three-interactions":3,"s7-u1-cr-web-change":3,"s7-u1-cr-web-interpret":3,"s7-u4-cr-big-picture":3,"s7-u4-cr-change-explain":3,"s7-u4-cr-conclusion":3,"s7-u4-cr-design-investigation":4,"s7-u4-cr-distribution":3,"s7-u4-cr-event-compare":3,"s7-u4-cr-mineral-id":2,"s7-u4-cr-mineral-tests":3,"s7-u4-cr-mountain-explain":2,"s7-u4-cr-past-theory":2,"s7-u4-cr-pattern":3,"s7-u4-cr-rock-journey":3,"s7-u4-cr-soil-case":2,"s7-u4-cr-table-display":2,"s7-u4-cr-theory-evolved":3,"s7-u4-cr-timeline":2,"s7-u4-cr-weathering":3};
