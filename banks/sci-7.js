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
   C organisms to decomposers, D decomposers to soil. Label placement:
   B sits on the horizontal shaft midway between the Plants box and
   the crossing; D sits beside the vertical shaft, midway between the
   crossing and the soil box, so the two labels never cluster at the
   crossing (fixed Nov 19, 2026). */
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
  + "<circle cx=\"240\" cy=\"151\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"240\" y=\"156\" text-anchor=\"middle\">B</text>"
  + "<circle cx=\"404\" cy=\"88\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"404\" y=\"93\" text-anchor=\"middle\">C</text>"
  + "<circle cx=\"316\" cy=\"206\" r=\"10\" fill=\"#fff\" stroke=\"#333\"/><text x=\"316\" y=\"211\" text-anchor=\"middle\">D</text></g>"
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

/* ================= Unit 2 (Heat) figure families =================
   H1: heating curve, drawn from the item's own plateau values.
   H2: particle panel for the three states at two temperatures, drawn once.
   H3: specific heat bar display, drawn from the item's own values.
   H4: two-line temperature graph for the absorption investigation. */

// H1: temperature-time heating curve. melt and boil are the plateau
// temperatures; tEnd the final time; yMax the top of the temperature axis.
function s7HeatingCurveSVG(melt, boil, tEnd, yMax) {
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
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Time (min)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Temperature (°C)</text>';
  s += '</svg>';
  return s;
}

// H2: the three states at two temperatures. Dots are particle positions;
// arrow length stands for particle speed. Drawn once as a constant.
function s7ParticlePanelSVG() {
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
  s += box(70, 14, "Solid", "solid", false) + box(206, 14, "Liquid", "liquid", false) + box(342, 14, "Gas", "gas", false);
  s += box(70, 130, "Solid", "solid", true) + box(206, 130, "Liquid", "liquid", true) + box(342, 130, "Gas", "gas", true);
  s += '</svg>';
  return s;
}

// H3: horizontal bars of temperature rise for equal masses given equal energy.
function s7SHCBarsSVG(rows) {
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
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Temperature rise (°C)</text>';
  s += '</svg>';
  return s;
}

// H4: two temperature lines over time for the dark and light cans.
function s7AbsorbGraphSVG(times, dark, light) {
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
  s += '<text x="' + (x1 - 90) + '" y="' + (y1 + 20) + '" font-size="11" fill="#1c2b33">Dark can</text>';
  s += '<line x1="' + (x1 - 120) + '" y1="' + (y1 + 34) + '" x2="' + (x1 - 96) + '" y2="' + (y1 + 34) + '" stroke="#b3541e" stroke-width="2.5"/>';
  s += '<text x="' + (x1 - 90) + '" y="' + (y1 + 38) + '" font-size="11" fill="#1c2b33">Light can</text>';
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 4) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Time (min)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Temperature (°C)</text>';
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
function s7SolubilitySVG(series, yMax) {
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
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 6) + '" font-size="12" text-anchor="middle" fill="#1c2b33">Temperature (°C)</text>';
  s += '<text x="16" y="' + ((y0 + y1) / 2) + '" font-size="12" text-anchor="middle" fill="#1c2b33" transform="rotate(-90 16 ' + ((y0 + y1) / 2) + ')">Solubility (g per 100 mL of water)</text>';
  s += '</svg>';
  return s;
}

// M2: three containers of particles. Container 1: one kind throughout.
// Container 2: two kinds mixed evenly. Container 3: two kinds in layers.
function s7MixturePanelSVG() {
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
  s += container(28, "Container 1", "pure") + container(171, "Container 2", "mixed") + container(314, "Container 3", "layered");
  s += '</svg>';
  return s;
}

// M3: vessels with stated amounts of solute and water.
function s7ConcentrationSVG(vessels) {
  var W = 460, H = 210;
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="460" height="210" role="img" aria-label="Three vessels with stated amounts of solute and water" style="max-width:100%;height:auto">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>';
  vessels.forEach(function (v, i) {
    var x = 36 + i * 148;
    var fillH = 20 + 70 * (v.vol / 200);
    s += '<path d="M ' + x + ' 30 L ' + (x + 14) + ' ' + (30 + 110) + ' L ' + (x + 86) + ' ' + (30 + 110) + ' L ' + (x + 100) + ' 30" fill="none" stroke="#33424e" stroke-width="1.6"/>';
    s += '<rect x="' + (x + 8) + '" y="' + (140 - fillH) + '" width="84" height="' + fillH + '" fill="#bcd6e4" opacity="0.75"/>';
    s += '<text x="' + (x + 50) + '" y="162" font-size="12" text-anchor="middle" fill="#1c2b33">' + v.label + '</text>';
    s += '<text x="' + (x + 50) + '" y="182" font-size="11" text-anchor="middle" fill="#1c2b33">' + v.solute + ' g in ' + v.vol + ' mL</text>';
  });
  s += '</svg>';
  return s;
}

/* ----- bank-u1.js ----- */
// CRMARKS: s7-u1-cr-marsh-change=2
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
// CRMARKS: s7-u1-cr-niche-roles=2
// CRMARKS: s7-u1-cr-effect-chain=3
// CRMARKS: s7-u1-cr-succession-evidence=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s7-u1-factor-classify=2
// CRMARKS: s7-u1-tolerance-curve=3
// CRMARKS: s7-u1-interaction-classify=2
// CRMARKS: s7-u1-interaction-examples=2
// CRMARKS: s7-u1-pond-interactions=3
// CRMARKS: s7-u1-role-identify=2
// CRMARKS: s7-u1-consumer-types=2
// CRMARKS: s7-u1-niche-reason=3
// CRMARKS: s7-u1-classify-set=2
// CRMARKS: s7-u1-ecosystem-infer=3
// CRMARKS: s7-u1-chain-order=2
// CRMARKS: s7-u1-energy-transfer=3
// CRMARKS: s7-u1-energy-loss=2
// CRMARKS: s7-u1-web-readoff=3
// CRMARKS: s7-u1-web-removal=4
// CRMARKS: s7-u1-decomposer-role=2
// CRMARKS: s7-u1-nutrient-cycle=2
// CRMARKS: s7-u1-succession-identify=2
// CRMARKS: s7-u1-succession-types=2
// CRMARKS: s7-u1-succession-sequence=3
// CRMARKS: s7-u1-organization-set=3
// CRMARKS: s7-u1-web-roles=3
// CRMARKS: s7-u1-web-chains=3
// CRMARKS: s7-u1-web-predict=4
// CRMARKS: s7-u1-harvest-effects=2
// CRMARKS: s7-u1-boreal-practice=2
// CRMARKS: s7-u1-boreal-effects=3
// CRMARKS: s7-u1-career-match=2
// CRMARKS: s7-u1-career-scenario=3
// CRMARKS: s7-u1-groups-interest=3
// CRMARKS: s7-u1-delimit-choose=2
// CRMARKS: s7-u1-delimit-rewrite=3
// CRMARKS: s7-u1-instrument-choose=2
// CRMARKS: s7-u1-record-format=3
// CRMARKS: s7-u1-record-plan=4
// CRMARKS: s7-u1-communicate-format=2
// CRMARKS: s7-u1-communicate-judge=3
// CRMARKS: s7-u1-evaluate-next-step=4
// CRMARKS: s7-u1-key-work=2
// CRMARKS: s7-u1-key-work-2=3
// CRMARKS: s7-u1-key-choose=3
// CRMARKS: s7-u1-variables-identify=2
// CRMARKS: s7-u1-design-controls=3
// CRMARKS: s7-u1-design-flaw=4
// CRMARKS: s7-u1-table-choose=2
// CRMARKS: s7-u1-succession-order=2
// CRMARKS: s7-u1-flowchart-complete=3
// CRMARKS: s7-u1-recycling-scenario=3
// CRMARKS: s7-u1-succession-next-stage=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s7-u1-factor-classify=a
// BIMODAL: s7-u1-tolerance-curve=a
// BIMODAL: s7-u1-interaction-classify=a
// BIMODAL: s7-u1-interaction-examples=a
// BIMODAL: s7-u1-pond-interactions=a
// BIMODAL: s7-u1-role-identify=a
// BIMODAL: s7-u1-consumer-types=a
// BIMODAL: s7-u1-niche-reason=b
// BIMODAL: s7-u1-classify-set=a
// BIMODAL: s7-u1-ecosystem-infer=a
// BIMODAL: s7-u1-chain-order=a
// BIMODAL: s7-u1-energy-transfer=b
// BIMODAL: s7-u1-energy-loss=b
// BIMODAL: s7-u1-web-readoff=a
// BIMODAL: s7-u1-web-removal=b
// BIMODAL: s7-u1-decomposer-role=b
// BIMODAL: s7-u1-nutrient-cycle=a
// BIMODAL: s7-u1-succession-identify=a
// BIMODAL: s7-u1-succession-types=a
// BIMODAL: s7-u1-succession-sequence=a
// BIMODAL: s7-u1-organization-set=a
// BIMODAL: s7-u1-web-roles=b
// BIMODAL: s7-u1-web-chains=a
// BIMODAL: s7-u1-web-predict=b
// BIMODAL: s7-u1-harvest-effects=b
// BIMODAL: s7-u1-boreal-practice=b
// BIMODAL: s7-u1-boreal-effects=b
// BIMODAL: s7-u1-career-match=a
// BIMODAL: s7-u1-career-scenario=a
// BIMODAL: s7-u1-groups-interest=b
// BIMODAL: s7-u1-delimit-choose=b
// BIMODAL: s7-u1-delimit-rewrite=b
// BIMODAL: s7-u1-instrument-choose=a
// BIMODAL: s7-u1-record-format=b
// BIMODAL: s7-u1-record-plan=b
// BIMODAL: s7-u1-communicate-format=b
// BIMODAL: s7-u1-communicate-judge=b
// BIMODAL: s7-u1-evaluate-next-step=b
// BIMODAL: s7-u1-key-work=a
// BIMODAL: s7-u1-key-work-2=a
// BIMODAL: s7-u1-key-choose=a
// BIMODAL: s7-u1-variables-identify=a
// BIMODAL: s7-u1-design-controls=b
// BIMODAL: s7-u1-design-flaw=b
// BIMODAL: s7-u1-table-choose=b
// BIMODAL: s7-u1-succession-order=a
// BIMODAL: s7-u1-flowchart-complete=a
// BIMODAL: s7-u1-recycling-scenario=b
// BIMODAL: s7-u1-succession-next-stage=b
// Science 7 Unit 1 bank: Interactions Within Ecosystems (SC7.1.1 to
// SC7.3.11), built Nov 15, 2026 to the Ecosystems authoring spec.
// All entries are original and were written new for this app.
// Existing tests and question banks, including teacher tests, the
// MHR ExamView chapters 1 to 3, the core laboratories, the Two
// Centimetre Forest module and SLA 7 unit 1, were reviewed only
// to gauge the expected depth and range of treatment.
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
// Symbiosis ruling: relationship scenarios from the reviewed
// sources appear only as unnamed biotic-biotic interaction
// examples under SC7.1.2.

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

/* Added November 19, 2026: closes the Unit 1 Test 2 CR denomination
   gap in the test blueprint. The test's CR pool was {3, 3, 2} against
   a 4-mark target; this second 2-mark entry at SC7.1.3 makes 2 + 2.
   See Junior-Science-Blueprint-Depth-Queue-2026-11-19.md. */
E("s7-u1-cr-niche-roles", 1, ["SC7.1.3"], 2, "var", varset([
  function () {
    return textq("A beaver eats the bark and twigs of the trees it cuts down. It also builds a dam across a stream, and the pond that forms behind the dam becomes home to fish, frogs and ducks. (a) State the beaver's role in this ecosystem, and give the evidence from the description. (b) A niche includes more than what an organism eats. Describe one other part of the beaver's niche shown in the description.",
      ["The beaver is a consumer (a herbivore): it eats other organisms, the bark and twigs of trees.",
       "The beaver also shapes its habitat: by building a dam it creates the pond that other organisms live in."],
      "<b>Model answer:</b> (a) The beaver is a consumer, specifically a herbivore, because it gets its food by eating other organisms: the bark and twigs of the trees it cuts down. (b) The beaver's niche also includes changing its habitat: its dam floods the stream valley and creates the pond that fish, frogs and ducks then live in, so the beaver's activities provide the habitat conditions other species depend on.<br><br><b>Marking points:</b> 1 mark for the role (consumer or herbivore) supported by the eating evidence. 1 mark for another part of the niche beyond food, such as the dam building that creates pond habitat for other species.", {});
  },
  function () {
    return textq("A fallen spruce log lies on the forest floor. Fungi grow through the dead wood, and over several years the wood softens and crumbles away. A woodpecker visits the same log to eat the insects living inside it. (a) State the fungi's role in this ecosystem, and give the evidence from the description. (b) Explain how the fungi's niche differs from the woodpecker's niche, even though both depend on the same log.",
      ["The fungi are decomposers: they feed by breaking down the dead wood itself.",
       "The fungi break down the dead wood and absorb its nutrients, while the woodpecker is a consumer that eats living insects in the log, so the two get their food in different ways."],
      "<b>Model answer:</b> (a) The fungi are decomposers. They feed by breaking down dead material, and the evidence is the wood softening and crumbling as the fungi grow through it. (b) The woodpecker is a consumer: it eats living insects it finds in the log, and it does not break down the wood itself. So although both organisms depend on the same log, they use it in different ways and get their food differently, which means their niches are different.<br><br><b>Marking points:</b> 1 mark for the fungi as decomposers, with the breakdown of the wood as evidence. 1 mark for the contrast: the woodpecker eats living insects (a consumer) while the fungi break down the wood itself.", {});
  }
]), ["Sort each organism by how it gets its food first.", "A niche is the whole job description: food, home, and effects on other organisms."]);

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
      ["The valley's spruce trees are the tallest of any stand surveyed in the region in the past ten years",
       "The company that would do the cutting has operated in the province for over thirty years without a serious accident",
       "Salmon from this stream are sold in stores across the province and in other countries every year"],
      "Support must connect the claim to evidence about the harm named. Soil washing into streams below clearcuts is direct evidence for the claimed harm. Tree height, company history and fish sales say nothing about whether clearcutting harms the stream.", {});
  },
  function () {
    return mcq("A student defends this position: \"The harvested area should be replanted within a year.\" Which finding best supports the position?",
      "On nearby sites left unplanted, shrubs crowded in and few spruce seedlings survived after five years",
      ["Spruce seedlings are available from the provincial nursery at a low cost per thousand",
       "The harvested area is the largest cutover in the region in the past decade by a wide margin",
       "Most residents surveyed in the nearby towns said they preferred the look of a planted forest"],
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




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC7.1.1, SC7.1.2, SC7.1.7, SC7.1.8 and one 2-mark Level 2 CR
   entry closing Unit 1 Test 1's CR gap. Case-table entries are
   registered as varsets, the junior banks' standing pattern.
   SME-flagged. */

E("s7-u1-factor-change-effect", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    return mcq("A dry summer lowers the water level in a pond. Which statement best describes the change itself?",
      "Abiotic change: the amount of water available in the pond decreased over the summer",
      ["Biotic change: a new predator species arrived in the pond area during the summer", "Biotic change: the population of one plant species grew larger around the pond", "No factor changed at all; only the behaviour of the pond animals changed"],
      "The change is to a non-living part of the ecosystem: the amount of water decreased. Living populations respond afterwards, but the change itself is <b>abiotic: the amount of water available in the pond decreased over the summer</b>.", {});
  },
  function () {
    return mcq("A dry summer lowers the water level in a pond. What is the most likely effect on the living community?",
      "Shore plants die back in the dry zone, and the animals that sheltered in them lose habitat",
      ["The pond's water becomes warmer in winter, and every fish species grows larger and more active than before", "New species appear from outside the ecosystem all at once in large numbers", "The soil around the pond slowly turns into solid rock over the season"],
      "A change in an abiotic factor changes the conditions living things depend on, and populations shift in response. Here, <b>shore plants die back in the dry zone, and the animals that sheltered in them lose habitat</b>.", {});
  },
  function () {
    return mcq("A factory warms the water of a river with its cooling outflow. Which statement best describes the change itself?",
      "Abiotic change: the temperature of the river water increased below the outflow",
      ["Biotic change: a new species of fish was introduced into the river by workers", "Biotic change: the population of algae in the river grew during the summer", "No factor changed at all; only the speed of the river's current changed"],
      "The change is to a non-living part of the ecosystem: the water temperature increased. Living populations respond afterwards, but the change itself is <b>abiotic: the temperature of the river water increased below the outflow</b>.", {});
  },
  function () {
    return mcq("A factory warms the water of a river with its cooling outflow. What is the most likely effect on the living community?",
      "Cold-water fish move away or decline, while warm-water species increase in the warmed stretch",
      ["The river begins to flow uphill past the factory, carrying all of its fish and plants along with it", "Every fish in the river grows larger within a single week of the change", "The river's banks slowly turn into sand dunes along the warmed stretch"],
      "A change in an abiotic factor changes the conditions living things depend on. Here, <b>cold-water fish move away or decline, while warm-water species increase in the warmed stretch</b>.", {});
  },
  function () {
    return mcq("Farm fertilizer washes into a lake after heavy rain. What is the most likely effect on the living community?",
      "Algae multiply quickly in the nutrient-rich water, clouding it and shading the plants below",
      ["The lake freezes earlier in the autumn than it used to, covering all of its plants in ice for much longer", "The fish stop needing oxygen from the water and breathe air at the surface instead", "The bottom of the lake rises to the surface as the nutrients pile up in it"],
      "The fertilizer raises the nutrient level of the water, an abiotic change, and the community responds: <b>algae multiply quickly in the nutrient-rich water, clouding it and shading the plants below</b>.", {});
  },
  function () {
    return mcq("A beaver dam floods a section of forest. What is the most likely effect on the living community?",
      "Trees in the flooded area die, while pond plants and water insects spread into the new habitat",
      ["The flooded trees grow faster than ever before now that their roots stand in water through the whole season", "Every insect leaves the flooded area for good and none ever returns to it", "The pond water turns to ice and stays frozen through the whole year"],
      "The dam raises the standing water, an abiotic change, and the community responds: <b>trees in the flooded area die, while pond plants and water insects spread into the new habitat</b>.", {});
  },
  function () {
    return mcq("Shade cloth is put over a school garden bed for the summer. Which statement best describes the change itself?",
      "Abiotic change: the amount of sunlight reaching the garden plants decreased",
      ["Biotic change: a new species of insect moved into the garden during the summer", "Biotic change: the population of weeds in the garden bed grew over the season", "No factor changed at all; only the colour of the garden bed's soil changed"],
      "The change is to a non-living part of the ecosystem: the amount of sunlight decreased. The change itself is <b>abiotic: the amount of sunlight reaching the garden plants decreased</b>.", {});
  },
  function () {
    return mcq("A long winter keeps snow on a meadow until late spring. What is the most likely effect on the living community?",
      "Plants start growing later in the year, shortening the feeding season for the herbivores",
      ["Herbivores grow much thicker coats during the summer that follows, in preparation for the next long winter", "The meadow's soil loses all of its nutrients before the plants can use them", "Predators stop hunting completely until the autumn of the following year"],
      "The longer cold season is an abiotic change, and the community responds: <b>plants start growing later in the year, shortening the feeding season for the herbivores</b>.", {});
  }
]), ["Ask what the change does to the other side: more food, less food, more shelter, less shelter?", "Then check the direction: a change that removes food or habitat pushes numbers down."]);

E("s7-u1-interaction-direction", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return mcq("Earthworms tunnel through garden soil, opening spaces in it. Which statement best classifies this interaction?",
      "A biotic factor, the worms, changes an abiotic factor, the soil's air and water spaces",
      ["An abiotic factor changes a biotic factor, and nothing at all happens in return", "Two abiotic factors, the soil and the air, interact with each other in the garden", "Neither factor affects the other in any way at all during the whole gardening season or the seasons after it"],
      "First decide which side is living (biotic) and which is non-living (abiotic), then follow the direction of the effect. <b>A biotic factor, the worms, changes an abiotic factor, the soil's air and water spaces</b>.", {});
  },
  function () {
    return mcq("A heat wave dries out a shallow pond in July. Which statement best classifies this interaction?",
      "An abiotic factor, the heat, changes a biotic factor, the pond life that can survive there",
      ["A biotic factor changes an abiotic factor, and nothing at all happens in return", "Two biotic factors, the pond plants and animals, interact with each other in July", "Neither factor affects the other in any way at all during the whole summer season or the seasons after it"],
      "First decide which side is living (biotic) and which is non-living (abiotic), then follow the direction of the effect. <b>An abiotic factor, the heat, changes a biotic factor, the pond life that can survive there</b>.", {});
  },
  function () {
    return mcq("Tree roots crack a concrete sidewalk as they grow over the years. Which statement best classifies this interaction?",
      "A biotic factor, the growing roots, changes an abiotic factor, the concrete surface",
      ["An abiotic factor changes a biotic factor, and nothing at all happens in return", "Two abiotic factors, the concrete and the soil, interact with each other over time", "Neither factor affects the other in any way at all while the tree is growing there or in later years"],
      "The roots are living and the concrete is not, and the effect runs from the living side to the non-living side. <b>A biotic factor, the growing roots, changes an abiotic factor, the concrete surface</b>.", {});
  },
  function () {
    return mcq("Drought makes a farmer's crop wilt during a dry August. Which statement best classifies this interaction?",
      "An abiotic factor, the lack of water, changes a biotic factor, the crop's growth",
      ["A biotic factor changes an abiotic factor, and nothing at all happens in return", "Two biotic factors, the crop and the weeds, interact with each other in the field", "Neither factor affects the other in any way at all during the whole growing season or the seasons after it"],
      "Water shortage is non-living and the crop is living, and the effect runs from the non-living side to the living side. <b>An abiotic factor, the lack of water, changes a biotic factor, the crop's growth</b>.", {});
  },
  function () {
    return mcq("Beavers build a dam that raises the water level of a stream. Which statement best classifies this interaction?",
      "A biotic factor, the beavers, changes an abiotic factor, the stream's water level",
      ["An abiotic factor changes an abiotic factor only, with no living thing involved at all", "Two biotic factors, the beavers and the fish, interact with each other in the stream", "Neither factor affects the other in any way at all while the dam is standing there or in later years"],
      "The beavers are living and the water level is not, and the effect runs from the living side to the non-living side. <b>A biotic factor, the beavers, changes an abiotic factor, the stream's water level</b>.", {});
  },
  function () {
    return mcq("Strong sunlight makes the air inside a greenhouse warmer. Which statement best classifies this interaction?",
      "An abiotic factor, the sunlight, changes an abiotic factor, the air temperature inside",
      ["A biotic factor changes an abiotic factor, and nothing at all happens in return", "A biotic factor changes another biotic factor somewhere inside the greenhouse", "Neither factor affects the other in any way at all on a bright sunny day or on any other day of the year"],
      "Both sides here are non-living: sunlight and air temperature are both abiotic factors. <b>An abiotic factor, the sunlight, changes an abiotic factor, the air temperature inside</b>.", {});
  }
]), ["Name both sides first: which is living (biotic) and which is not (abiotic)?", "The effect runs from the side that acts to the side that is changed."]);

E("s7-u1-recycling-scenario", 1, ["SC7.1.7"], 2, "var", varset([
  function () {
    return mcq("A fallen spruce tree lies on the forest floor for years. How is the matter in it recycled?",
      "Fungi and bacteria break the wood down, returning its nutrients to the soil for new plants",
      ["The wood's nutrients vanish completely from the forest forever at the moment the tree dies on the forest floor", "The nutrients stay locked inside the wood forever and are never used by anything again", "Animals carry every bit of the wood's nutrients away from the forest for good"],
      "Matter is not created or destroyed in an ecosystem; decomposers break dead material down and return its nutrients to the soil or water, where producers can use them again. <b>Fungi and bacteria break the wood down, returning its nutrients to the soil for new plants</b>.", {});
  },
  function () {
    return mcq("Leaves pile up under a maple tree each autumn. How is the matter in them recycled?",
      "Decomposers in the soil break the leaves down and release their nutrients for the tree's roots",
      ["The leaves' nutrients are destroyed completely by the fall from the branches down to the ground below them", "The nutrients float away into the air as gases and never return to the soil at all", "The tree reabsorbs the whole leaves back through the bark of its trunk"],
      "Decomposers break dead material down and return its nutrients to the soil, where producers can use them again. <b>Decomposers in the soil break the leaves down and release their nutrients for the tree's roots</b>.", {});
  },
  function () {
    return mcq("A dead fish washes up on the shore of a lake. How is the matter in it recycled?",
      "Scavengers and decomposers break the body down, returning nitrogen and other nutrients to the water and soil",
      ["The fish's nutrients disappear from the ecosystem entirely within a few days of its death on the shore", "The nutrients in the body are converted directly into sunlight by the scavengers", "The body stays completely unchanged at the bottom of the lake forever afterwards"],
      "Scavengers start the breakdown and decomposers finish it, returning nutrients to the water and soil for producers. <b>Scavengers and decomposers break the body down, returning nitrogen and other nutrients to the water and soil</b>.", {});
  },
  function () {
    return mcq("A farmer spreads composted manure on a field before planting. How is the matter in it recycled?",
      "Decomposers finish breaking the material down, releasing nutrients that the crop plants can absorb",
      ["The manure's nutrients pass straight down through the soil and are never used by the crops planted in the field", "The nutrients in the manure turn directly back into fresh manure for the next year", "The crop plants absorb the manure whole through their leaves while it lies on the field"],
      "Composting starts the breakdown, and soil decomposers finish it, releasing nutrients in a form roots can absorb. <b>Decomposers finish breaking the material down, releasing nutrients that the crop plants can absorb</b>.", {});
  },
  function () {
    return mcq("Grass clippings are left on a lawn after mowing. How is the matter in them recycled?",
      "Soil decomposers break the clippings down and return their nutrients to the soil for the grass",
      ["The clippings' nutrients are lost to the ecosystem completely as soon as the grass on the lawn is cut", "The nutrients in the clippings evaporate completely into the air within a day", "The grass roots absorb the clippings whole from the surface of the lawn"],
      "Decomposers in the soil break the clippings down and return their nutrients, which is why leaving clippings feeds the lawn. <b>Soil decomposers break the clippings down and return their nutrients to the soil for the grass</b>.", {});
  },
  function () {
    return mcq("A whale's body sinks to the deep ocean floor after it dies. How is the matter in it recycled?",
      "Scavengers and decomposers break the body down over years, recycling its nutrients into the ocean ecosystem",
      ["The nutrients are removed from the ocean forever once the body reaches the deep ocean floor far below", "The body dissolves into pure water within a single day of sinking to the bottom", "The nutrients rise back to the surface unchanged, still in one solid piece"],
      "Even in the deep ocean, scavengers and decomposers break the body down and return its nutrients to the ecosystem. <b>Scavengers and decomposers break the body down over years, recycling its nutrients into the ocean ecosystem</b>.", {});
  }
]), ["Matter is not created or destroyed in an ecosystem; it cycles.", "Decomposers are the recyclers: they return dead matter's nutrients to the soil."]);

E("s7-u1-succession-next-stage", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return mcq("Succession begins at a new site: a bare rock surface left by a retreating glacier. What is the first stage?",
      "Lichens and mosses colonize the bare rock and begin breaking its surface into soil",
      ["Tall spruce trees grow directly on the bare rock within the first few years after the glacier retreats from it", "A mature forest community appears on the rock within a single year of the ice leaving", "Grasses cover the whole rock surface before any soil has formed on it at all"],
      "Succession starts with pioneer species that can survive the site's harsh conditions and begin changing them; larger plants need the soil and shelter the pioneers create. The first stage is: <b>lichens and mosses colonize the bare rock and begin breaking its surface into soil</b>.", {});
  },
  function () {
    return mcq("Succession begins at a new site: an abandoned farm field in its first year. What is the first stage?",
      "Fast-growing weeds and grasses move in and cover the soil across the field",
      ["Shrubs and trees move in and shade out everything else in the field immediately during that first year", "The field returns to a mature forest community within one growing season", "Lichens break the field's soil back down into bare rock over the winter"],
      "The soil is already present, so the pioneers are fast-growing plants that cover it quickly. The first stage is: <b>fast-growing weeds and grasses move in and cover the soil across the field</b>.", {});
  },
  function () {
    return mcq("Succession begins at a new site: a pond that is slowly filling with sediment and plant growth. What is the first stage?",
      "Reeds and cattails spread in from the edges of the pond as the water shallows",
      ["The pond deepens again over time and the large fish return to its open water in greater numbers than before", "A spruce forest grows directly in the open water at the centre of the pond", "The pond dries instantly into bare rock across its whole bottom in one season"],
      "As sediment shallows the water, marsh plants advance from the edges. The first stage is: <b>reeds and cattails spread in from the edges of the pond as the water shallows</b>.", {});
  },
  function () {
    return mcq("Succession begins at a new site: a new sand dune forming along a coast. What is the first stage?",
      "Hardy dune grasses take root in the sand and trap still more sand around them",
      ["Trees take root and anchor the new dune firmly in place within its first month of forming along the coast", "The dune turns into a pond ecosystem behind the beach within a year", "Shrubs cover the whole dune before any grass has grown on it at all"],
      "Dune grasses tolerate the dry, shifting sand and stabilize it, letting later stages follow. The first stage is: <b>hardy dune grasses take root in the sand and trap still more sand around them</b>.", {});
  },
  function () {
    return mcq("A site has reached the stage where shrubs and young trees dominate, after grasses covered it for years. The site is an abandoned farm field. What happens as succession continues, if the climate stays the same?",
      "Taller trees gradually shade out the shrubs, and the community moves toward a stable forest",
      ["The community returns to bare ground every year and starts the whole sequence of succession over again", "Grasses take over the site again and remove the trees that have grown there", "Succession stops permanently at the shrub stage and nothing changes after that"],
      "Succession continues in a direction: each stage changes the conditions so the next, larger community can move in, until a stable community matching the climate is reached. <b>Taller trees gradually shade out the shrubs, and the community moves toward a stable forest</b>.", {});
  },
  function () {
    return mcq("A forest clearing left after a fire still has its soil intact. What is the first stage of succession there?",
      "Fireweed and other fast-growing plants colonize the ash-covered soil of the clearing",
      ["Lichens must first break down bare rock into fresh soil before anything at all can grow in the clearing", "Mature trees regrow to their full height across the clearing in one season", "The clearing stays completely bare of plants for centuries after the fire"],
      "Because the soil survived the fire, succession restarts with fast-growing plants rather than rock pioneers. The first stage is: <b>fireweed and other fast-growing plants colonize the ash-covered soil of the clearing</b>.", {});
  }
]), ["Succession runs in a rough order: pioneers, grasses, shrubs, then trees.", "Pick the stage that comes right after the one described, not the final forest."]);

E("s7-u1-cr-marsh-change", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return textq("A marsh beside a school is drained in the spring so a sports field can be built. By the next year, the frogs that lived in the marsh are gone from the area. Explain TWO effects of draining the marsh: one effect on an abiotic factor and one effect on a biotic factor. (2 marks)",
      ["Draining removes the standing water, an abiotic factor the marsh community depended on."],
      "Marking points (2): 1 mark for an abiotic effect (the standing water is removed, so the soil dries out and the area warms and loses its shallow-water habitat). 1 mark for a biotic effect linked to it (frogs lose the water they need for breeding, so their population disappears from the area; marsh plants and the insects and birds depending on them also decline). Model answer: Draining removes the marsh's standing water, drying the soil. Without water to lay eggs in, <b>the frogs cannot reproduce, so the biotic community loses them</b>.", {});
  },
  function () {
    return textq("A farmer plants a strip of trees along a windy field. After several years, the soil in the field stays moist longer after rain. Explain TWO effects of the tree strip: one effect on an abiotic factor and one effect on a biotic factor. (2 marks)",
      ["The trees slow the wind at ground level, an abiotic factor affecting the field."],
      "Marking points (2): 1 mark for an abiotic effect (the trees reduce wind speed over the field, so less water evaporates from the soil and the soil stays moist longer; shade also cools the soil surface). 1 mark for a biotic effect linked to it (crops grow better with the moisture, and birds and insects gain shelter and food in the strip). Model answer: The strip slows the wind, so the soil loses less water to evaporation. With moister soil, <b>the crop plants grow more strongly through dry spells</b>.", {});
  },
  function () {
    return textq("Road salt used in winter washes into a small pond each spring. By summer, the pond's snails have mostly disappeared. Explain TWO effects of the salt: one effect on an abiotic factor and one effect on a biotic factor. (2 marks)",
      ["The salt raises the salt concentration of the pond water, an abiotic factor."],
      "Marking points (2): 1 mark for an abiotic effect (the dissolved salt changes the chemistry of the water, raising its salt concentration each spring). 1 mark for a biotic effect linked to it (snails and other freshwater organisms cannot tolerate the saltier water, so their populations fall, affecting the animals that feed on them). Model answer: The runoff makes the pond water saltier each spring. Freshwater snails cannot survive the changed water, so <b>their population collapses, and the birds and fish that ate them lose a food source</b>.", {});
  }
]), ["One effect must land on a non-living factor and one on a living factor.", "Connect them: the abiotic change is usually what drives the biotic one."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s7-u1-cr-effect-chain closes Unit 1 Test
   1 (3 marks, Level 3); s7-u1-cr-succession-evidence closes Unit 1 Test
   3 (3 marks, Level 2). SME-flagged for the
   specialist pass. */
E("s7-u1-cr-effect-chain", 1, ["SC7.1.1", "SC7.1.2"], 3, "var", varset([
  function () {
    return textq("A beaver pond sits behind a dam on a small stream. To build a road, workers drain the pond and remove the dam, so the stream runs in a narrow channel again and the pond bed dries out. (a) Name the abiotic change that starts the chain of effects. (1) (b) Predict one effect on an organism or population that lived in the pond, and justify your prediction. (1) (c) Describe a further knock-on effect on another organism. (1) (3 marks)",
      ["Abiotic change: the standing water is removed and the pond bed dries (water amount falls). Pond organisms such as frogs or pondweed lose their habitat and decline. A knock-on effect follows for a predator or dependent organism, such as herons losing a food source."],
      "<b>Model answer:</b> (a) The abiotic change is the loss of the standing water: the pond is drained and its bed dries out. (b) Frogs that bred in the pond lose the water their eggs and tadpoles need, so the frog population falls; pond plants such as pondweed also die back because the shallow water they grew in is gone. The justification is that these organisms depended on the pond water for habitat or reproduction. (c) A knock-on effect is that herons and other predators that fed on the frogs and pond fish lose a food source, so fewer herons hunt in the area and their numbers may fall as well.<br><br><b>Marking points:</b> 1 mark for naming the abiotic change (the pond water is drained away and the bed dries). 1 mark for a predicted effect on one pond organism or population, justified by what that organism needed from the pond. 1 mark for a further knock-on effect on a different organism, linked to the first effect.", {});
  },
  function () {
    return textq("A late spring flood raises the water level of a marsh for several weeks. Areas of dry ground at the marsh edge stay under shallow water, and the marsh water spreads into the surrounding grassland. (a) Name the abiotic change that starts the chain of effects. (1) (b) Predict one effect on an organism or population in the marsh, and justify your prediction. (1) (c) Describe a further knock-on effect on another organism. (1) (3 marks)",
      ["Abiotic change: the amount and depth of water rises and flooding lasts for weeks. Marsh organisms respond to the deeper, longer lasting water, for example ground nesting birds lose nests or cattails spread. A knock-on effect follows for a predator or competitor that depended on the first organism."],
      "<b>Model answer:</b> (a) The abiotic change is the rise in water level: more water covers the marsh and it stays flooded for weeks. (b) Birds that nested on the dry ground at the marsh edge lose their nests to the flood water, so fewer young are raised that season; the justification is that their nesting habitat depended on that ground staying dry. Cattails and other marsh plants could also spread into the newly flooded grassland. (c) A knock-on effect is that predators such as foxes or hawks that hunted the nesting birds and their young find less food at the marsh edge, so they hunt elsewhere or their numbers fall.<br><br><b>Marking points:</b> 1 mark for naming the abiotic change (the water level rises and flooding covers more ground for longer). 1 mark for a predicted effect on one marsh organism or population, justified by what the flooding changed for it. 1 mark for a further knock-on effect on a different organism, linked to the first effect.", {});
  },
  function () {
    return textq("Shade trees are planted along both banks of a salmon stream. After several summers the growing tree canopy shades the stream for most of the day, and the stream water stays noticeably cooler through the summer than it used to. (a) Name the abiotic change that starts the chain of effects. (1) (b) Predict one effect on an organism or population in the stream, and justify your prediction. (1) (c) Describe a further knock-on effect on another organism. (1) (3 marks)",
      ["Abiotic change: the water temperature falls because the stream is shaded (less sunlight reaches the water). Cooler water holds more dissolved oxygen and suits salmon, so young salmon survive better. A knock-on effect follows for a predator such as herons or larger fish that gain more prey, or for warm water species that decline."],
      "<b>Model answer:</b> (a) The abiotic change is the drop in water temperature: with less sunlight reaching the stream, the water stays cooler. (b) Young salmon do better in the cooler water, because cold water holds more dissolved oxygen and salmon are stressed by warm water, so more young salmon survive and the population can grow. (c) A knock-on effect is that herons and other predators that feed on young salmon gain a more reliable food source and may become more common along the stream; warm water insects or fish that preferred the old conditions could decline instead.<br><br><b>Marking points:</b> 1 mark for naming the abiotic change (the stream water becomes cooler as shade reduces the sunlight reaching it). 1 mark for a predicted effect on one stream organism or population, justified by the cooler water, such as its oxygen content or the organism temperature needs. 1 mark for a further knock-on effect on a different organism, linked to the first effect.", {});
  },
  function () {
    return textq("Trucks and crushers at a gravel pit raise clouds of pale dust on dry, windy days. The dust settles on the leaves of the shrubs and small trees growing around the pit, coating many leaves in a thin grey layer week after week. (a) Name the abiotic change that starts the chain of effects. (1) (b) Predict one effect on an organism or population near the pit, and justify your prediction. (1) (c) Describe a further knock-on effect on another organism. (1) (3 marks)",
      ["Abiotic change: a coating of dust settles on the leaves, reducing the sunlight the leaves receive (an abiotic coating on a living surface). Coated plants photosynthesize less and grow more slowly or produce fewer berries. A knock-on effect follows for insects or birds that fed on those plants."],
      "<b>Model answer:</b> (a) The abiotic change is the layer of non-living dust coating the leaves, which cuts down the sunlight reaching the leaf surfaces. (b) The shrubs grow more slowly and produce fewer leaves and berries, because with less light reaching their leaves they can photosynthesize less and make less food. (c) A knock-on effect is that insects that fed on the shrubs, and birds that ate the berries or the insects, find less food near the pit, so their numbers there fall.<br><br><b>Marking points:</b> 1 mark for naming the abiotic change (dust coating the leaves and reducing the light they receive). 1 mark for a predicted effect on one plant population, justified by reduced photosynthesis. 1 mark for a further knock-on effect on a different organism, linked to the change in the plants.", {});
  }
]), ["Name the non-living change first; every later effect must follow from it.", "Build the chain in order: abiotic change, first organism affected and why, then who depends on that organism."]);

E("s7-u1-cr-succession-evidence", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return textq("A class visits an abandoned gravel pit. Their field notes read: bare gravel still shows in patches; grasses and mosses cover most of the ground; young shrubs are scattered across the site; no trees are growing yet; the soil layer is thin. (a) State what stage of succession this site has reached. (1) (b) Cite TWO observations from the notes as evidence for your answer. (1) (c) Predict the next change at the site and explain why it will happen. (1) (3 marks)",
      ["The site is in an early stage of succession, at the grass and shrub stage after the pioneer stage. Evidence: grasses and mosses cover most of the ground and young shrubs are scattered through it, while trees are absent and the soil is still thin. Next, shrubs will spread and young trees will move in as the soil deepens."],
      "<b>Model answer:</b> (a) The site is in an early stage of succession: it has moved past the pioneer stage and is at the grass and shrub stage. (b) Evidence: grasses and mosses already cover most of the ground and young shrubs are scattered across the site, which shows succession is under way; at the same time no trees are growing yet and the soil is still thin, which shows the site has not reached a later, forest stage. (c) Next the shrubs will spread and thicken and young trees will begin to grow among them, because the grasses and shrubs are building and deepening the soil and sheltering the ground, creating the conditions tree seedlings need.<br><br><b>Marking points:</b> 1 mark for the stage correctly stated (an early stage, grass and shrub stage, past the pioneers but before trees). 1 mark for two observations from the notes cited as evidence. 1 mark for a sensible next change (shrubs spreading and young trees moving in) with a reason tied to the soil or shelter the present stage creates.", {});
  },
  function () {
    return textq("Students survey a coastal sand dune. Their notes read: the front of the dune is bare sand; grasses are spreading across the middle of the dune and their roots hold the sand in place; low shrubs grow at the back of the dune where the sand no longer shifts; a thin layer of soil is forming under the shrubs. (a) State what stage of succession this site has reached. (1) (b) Cite TWO observations from the notes as evidence for your answer. (1) (c) Predict the next change at the site and explain why it will happen. (1) (3 marks)",
      ["The dune is in an early stage of succession, at the grass stage with shrubs just becoming established at the back. Evidence: grasses are spreading and stabilizing the sand, and shrubs grow only where the sand has stopped shifting and soil is forming. Next, shrubs will spread forward as the grasses stabilize more sand and soil builds up."],
      "<b>Model answer:</b> (a) The dune is in an early stage of succession: the grass stage, with the shrub stage just beginning at the back. (b) Evidence: grasses are spreading across the middle and holding the sand with their roots, which is the work of the early colonizing stage; and shrubs are growing only at the back, where the sand no longer shifts and a thin soil is forming, which shows later plants can survive only where the earlier stage has prepared the ground. (c) Next the shrubs will spread forward across more of the dune, because the grasses keep stabilizing the sand and decaying plant material keeps building soil, so ground that is now too loose and poor for shrubs will become suitable for them.<br><br><b>Marking points:</b> 1 mark for the stage correctly stated (an early stage, grasses established with shrubs just starting). 1 mark for two observations from the notes cited as evidence. 1 mark for a sensible next change (shrubs spreading, soil deepening) with a reason tied to the stabilization and soil building already under way.", {});
  },
  function () {
    return textq("Five years after a wildfire burned a spruce forest, a class records these observations: charred spruce trunks still stand over the site; grasses and fireweed cover the ground; birch and spruce saplings about a metre tall are growing among the charred trunks; the soil that survived the fire is still in place. (a) State what stage of succession this site has reached. (1) (b) Cite TWO observations from the notes as evidence for your answer. (1) (c) Predict the next change at the site and explain why it will happen. (1) (3 marks)",
      ["The site is in an early to middle stage of secondary succession: grasses and young trees are established, but the forest has not returned. Evidence: saplings are growing among the charred trunks and grasses and fireweed cover the ground, while mature trees are absent. Next, the saplings will grow taller and shade out the grasses and fireweed as a young forest closes in."],
      "<b>Model answer:</b> (a) The site is in an early to middle stage of succession, the young tree or sapling stage of regrowth after the fire. (b) Evidence: grasses and fireweed, the fast first plants after a fire, still cover the ground, which shows regrowth is recent; and birch and spruce saplings are already growing among the charred trunks, which shows the site has moved beyond the first plant stage but is far from a mature forest. (c) Next the saplings will grow taller and their crowns will close together, shading out the grasses and fireweed below, because the young trees are now established in soil that survived the fire and will outgrow and outshade the smaller plants as the young forest develops.<br><br><b>Marking points:</b> 1 mark for the stage correctly stated (an early to middle regrowth stage, saplings established, forest not yet restored). 1 mark for two observations from the notes cited as evidence. 1 mark for a sensible next change (saplings growing into a young closed forest, shading out the ground plants) with a reason.", {});
  },
  function () {
    return textq("A cleared lot was left alone for forty years. A survey records: dense shrubs cover much of the lot; young spruce trees now rise above the shrubs across the whole site; a deep layer of soil and leaf litter covers the ground; a few older shrubs are dying back in the shade of the spruce. (a) State what stage of succession this site has reached. (1) (b) Cite TWO observations from the notes as evidence for your answer. (1) (c) Predict the next change at the site and explain why it will happen. (1) (3 marks)",
      ["The site is in a later stage of succession, moving from the shrub stage into a young forest stage. Evidence: young spruce overtop the shrubs across the site and older shrubs are dying back in their shade, while the soil and litter layer is deep. Next, the spruce will form a mature forest as they grow and the shrubs thin out."],
      "<b>Model answer:</b> (a) The site is in a later stage of succession: it is passing from the shrub stage into the young forest stage. (b) Evidence: young spruce trees rise above the shrubs across the whole site, which shows trees are taking over from shrubs; and older shrubs are dying back in the spruce shade, which shows the change of community is actively happening, supported by the deep soil and litter layer that has built up over forty years. (c) Next the spruce will keep growing into a mature spruce forest and the shrubs will thin out further, because the taller trees capture the light the shrubs need, and the forest community will become stable if the site is left undisturbed.<br><br><b>Marking points:</b> 1 mark for the stage correctly stated (a later stage, shrubs giving way to young forest). 1 mark for two observations from the notes cited as evidence. 1 mark for a sensible next change (a mature spruce forest forming, shrubs thinning) with a reason tied to shading and competition for light.", {});
  }
]), ["Place the site on the sequence first: pioneers, grasses, shrubs, young trees, mature forest.", "Your evidence must come from the notes, and your prediction must be the stage that follows the evidence, not the final forest unless the notes support it."]);

/* ----- bank-u2.js ----- */
// CRMARKS: s7-u2-cr-thermometer-choice=3
// CRMARKS: s7-u2-cr-radiant-explain=2
// CRMARKS: s7-u2-cr-instrument-design=4
// CRMARKS: s7-u2-cr-expansion-use=2
// CRMARKS: s7-u2-cr-specific-heat=3
/* Science 7, Unit 2: Heat (SC7.4.1 to SC7.6.9, 26 indicators, 75 entries).
   Sources: the current English guide (Focus for Learning for all 26
   indicators; terminology governs), the outcome spreadsheet (tag set
   verified set-identical to the guide, in order), ExamView Chapters 4 to 6
   (305 items parsed), Core Lab 5-3C The Plateau Problem and Core Lab 6-1D
   Absorb That Energy (each in three artefacts, counted once), the Heat
   Pumps STSE module (WNLSD and ESD copies byte-identical, counted once),
   the WNLSD objectives list, Unit Test 2, Chapter Four Test and Key Terms,
   the ESD heat unit test sample, the rubbing alcohol heating curve case
   study, the SLA unit 2 reading, and the Heat Transfer Design Challenge.
   All items were written new for this app: existing tests and
   question banks were reviewed only to gauge the expected depth
   and range of treatment, and nothing was carried verbatim.
   Harvest catalogue and authoring spec: Science-7-Heat-Harvest-Catalogue-2026-11-15.md and
   Science-7-Heat-Authoring-Spec-2026-11-15.md. */
// CRMARKS: s7-u2-cr-temp-explain=3
// CRMARKS: s7-u2-cr-expansion=3
// CRMARKS: s7-u2-cr-plateau=3
// CRMARKS: s7-u2-cr-transfer-explain=3
// CRMARKS: s7-u2-cr-absorb=2
// CRMARKS: s7-u2-cr-heating-example=2
// CRMARKS: s7-u2-cr-heating-decision=3
// CRMARKS: s7-u2-cr-improvement=2
// CRMARKS: s7-u2-cr-pump-chain=3
// CRMARKS: s7-u2-cr-thermometer-display=2
// CRMARKS: s7-u2-cr-inquiry=3
// CRMARKS: s7-u2-cr-display=3
// CRMARKS: s7-u2-cr-design-test=4
// CRMARKS: s7-u2-cr-conclusion=3
// CRMARKS: s7-u2-cr-instrument-jobs=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s7-u2-instrument-match=2
// CRMARKS: s7-u2-instrument-how=2
// CRMARKS: s7-u2-thermometer-read=3
// CRMARKS: s7-u2-instrument-choose=4
// CRMARKS: s7-u2-temp-define=2
// CRMARKS: s7-u2-expansion-scenario=3
// CRMARKS: s7-u2-change-name=2
// CRMARKS: s7-u2-plateau-read=3
// CRMARKS: s7-u2-change-particles=3
// CRMARKS: s7-u2-transfer-classify=2
// CRMARKS: s7-u2-transfer-compare=3
// CRMARKS: s7-u2-stove-three=3
// CRMARKS: s7-u2-absorb-classify=2
// CRMARKS: s7-u2-shc-compare=3
// CRMARKS: s7-u2-familiar-temp=2
// CRMARKS: s7-u2-activity-temp=2
// CRMARKS: s7-u2-thermoscope=2
// CRMARKS: s7-u2-past-tech=3
// CRMARKS: s7-u2-heating-tech=2
// CRMARKS: s7-u2-approaches=2
// CRMARKS: s7-u2-heating-adv=3
// CRMARKS: s7-u2-heating-disadv=3
// CRMARKS: s7-u2-pump-cycle=3
// CRMARKS: s7-u2-insulation-past=2
// CRMARKS: s7-u2-thermos=3
// CRMARKS: s7-u2-needs-tech=2
// CRMARKS: s7-u2-winter-clothing=3
// CRMARKS: s7-u2-career-match=2
// CRMARKS: s7-u2-career-scenario=2
// CRMARKS: s7-u2-thermometer-build=2
// CRMARKS: s7-u2-calibrate=3
// CRMARKS: s7-u2-thermometer-test=4
// CRMARKS: s7-u2-thermometer-data=2
// CRMARKS: s7-u2-variables-plateau=2
// CRMARKS: s7-u2-hypothesis-form=2
// CRMARKS: s7-u2-experiment-chain=4
// CRMARKS: s7-u2-tools-safety=2
// CRMARKS: s7-u2-tools-accurate=3
// CRMARKS: s7-u2-table-build=2
// CRMARKS: s7-u2-graph-choice=4
// CRMARKS: s7-u2-design-absorb=3
// CRMARKS: s7-u2-design-challenge=3
// CRMARKS: s7-u2-apparatus-safety=2
// CRMARKS: s7-u2-apparatus-choice=3
// CRMARKS: s7-u2-graph-key=2
// CRMARKS: s7-u2-conclusion-refute=3
// CRMARKS: s7-u2-temp-compare-samples=3
// CRMARKS: s7-u2-absorb-predict=3
// CRMARKS: s7-u2-safety-scenario=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s7-u2-instrument-match=a
// BIMODAL: s7-u2-instrument-how=b
// BIMODAL: s7-u2-thermometer-read=b
// BIMODAL: s7-u2-instrument-choose=b
// BIMODAL: s7-u2-temp-define=b
// BIMODAL: s7-u2-expansion-scenario=b
// BIMODAL: s7-u2-change-name=a
// BIMODAL: s7-u2-plateau-read=b
// BIMODAL: s7-u2-change-particles=b
// BIMODAL: s7-u2-transfer-classify=a
// BIMODAL: s7-u2-transfer-compare=b
// BIMODAL: s7-u2-stove-three=b
// BIMODAL: s7-u2-absorb-classify=a
// BIMODAL: s7-u2-shc-compare=a
// BIMODAL: s7-u2-familiar-temp=a
// BIMODAL: s7-u2-activity-temp=b
// BIMODAL: s7-u2-thermoscope=b
// BIMODAL: s7-u2-past-tech=b
// BIMODAL: s7-u2-heating-tech=a
// BIMODAL: s7-u2-approaches=b
// BIMODAL: s7-u2-heating-adv=b
// BIMODAL: s7-u2-heating-disadv=b
// BIMODAL: s7-u2-pump-cycle=b
// BIMODAL: s7-u2-insulation-past=b
// BIMODAL: s7-u2-thermos=b
// BIMODAL: s7-u2-needs-tech=b
// BIMODAL: s7-u2-winter-clothing=b
// BIMODAL: s7-u2-career-match=b
// BIMODAL: s7-u2-career-scenario=a
// BIMODAL: s7-u2-thermometer-build=b
// BIMODAL: s7-u2-calibrate=b
// BIMODAL: s7-u2-thermometer-test=b
// BIMODAL: s7-u2-thermometer-data=b
// BIMODAL: s7-u2-variables-plateau=b
// BIMODAL: s7-u2-hypothesis-form=b
// BIMODAL: s7-u2-experiment-chain=b
// BIMODAL: s7-u2-tools-safety=b
// BIMODAL: s7-u2-tools-accurate=b
// BIMODAL: s7-u2-table-build=b
// BIMODAL: s7-u2-graph-choice=a
// BIMODAL: s7-u2-design-absorb=b
// BIMODAL: s7-u2-design-challenge=b
// BIMODAL: s7-u2-apparatus-safety=b
// BIMODAL: s7-u2-apparatus-choice=b
// BIMODAL: s7-u2-graph-key=b
// BIMODAL: s7-u2-conclusion-refute=b
// BIMODAL: s7-u2-temp-compare-samples=b
// BIMODAL: s7-u2-absorb-predict=b
// BIMODAL: s7-u2-safety-scenario=b

/* ---------- SC7.4.1 Instruments used to measure temperature ---------- */
E("s7-u2-instrument-match", 2, ["SC7.4.1"], 1, "gen", function () {
  var cases = [
    { job: "measuring the temperature inside a pottery kiln, far hotter than boiling water", key: "a thermocouple thermometer", d: ["a liquid-in-glass thermometer", "a bimetallic strip thermometer", "an infrared thermometer"] },
    { job: "finding the surface temperature of a hot engine part without touching it", key: "an infrared thermometer", d: ["a liquid-in-glass thermometer", "a resistance thermometer", "a thermocouple thermometer"] },
    { job: "switching a home heating system on and off as the room warms and cools", key: "a bimetallic strip thermostat", d: ["an infrared thermometer", "a liquid-in-glass thermometer", "a resistance thermometer"] },
    { job: "measuring the temperature of water in a beaker during a class investigation", key: "a liquid-in-glass thermometer", d: ["a bimetallic strip thermostat", "a thermocouple thermometer", "an infrared thermometer"] },
    { job: "recording air temperature at a weather station with a probe wired to a display", key: "a resistance thermometer", d: ["a liquid-in-glass thermometer", "a bimetallic strip thermostat", "an infrared thermometer"] }
  ];
  var c = pick(cases);
  return mcq("Which instrument is built for this job: " + c.job + "?",
    c.key, c.d,
    "Each instrument suits a different job. A thermocouple handles the extreme heat inside furnaces and kilns. An infrared thermometer reads a surface from a distance, with no contact. A bimetallic strip bends with temperature, which makes it useful as the switch inside a thermostat. A liquid-in-glass thermometer is the everyday tool for liquids in a lab, and a resistance thermometer sends its reading along wires to a display.",
    {});
}, ["Think about what each instrument can survive and how it takes its reading.", "Match the job's conditions first: extreme heat, no contact, automatic switching, an ordinary liquid, or a wired probe."]);

E("s7-u2-instrument-how", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("How does a bimetallic strip thermometer respond when it gets warmer?",
      "Its two joined metals expand by different amounts, so the strip bends",
      ["Its liquid rises because the liquid expands",
       "Its electrical resistance drops, and the drop is displayed as a temperature",
       "It detects invisible radiation given off by the surface"],
      "A bimetallic strip joins two different metals. Because the metals expand by different amounts when heated, the strip bends, and the bending moves a pointer or works a switch. Rising liquid belongs to a liquid-in-glass thermometer, resistance changes to a resistance thermometer, and radiation detection to an infrared thermometer.",
      {});
  },
  function () {
    return mcq("A liquid-in-glass thermometer shows a higher reading when the liquid warms because the liquid",
      "expands and rises up the narrow tube",
      ["contracts and pulls away from the bulb",
       "changes colour as its particles speed up",
       "boils and pushes vapour up the tube"],
      "The liquid in the bulb expands as it warms, and the only place it can go is up the narrow tube, so the height of the column shows the temperature. The liquid does not boil, change colour, or contract on warming.",
      {});
  },
  function () {
    return mcq("An infrared thermometer can take the temperature of a hot surface without touching it because it",
      "measures the invisible radiation the surface gives off",
      ["sends out a beam that bounces back carrying the temperature",
       "reads the temperature of the air just above the surface",
       "uses two joined metals that bend in the heat"],
      "Every warm surface gives off infrared radiation, and the hotter the surface, the more it gives off. The thermometer measures that radiation and converts it to a temperature, so it never has to touch the surface.",
      {});
  }
]), ["Each instrument works by a different physical effect.", "Ask which effect fits: expanding liquid, bending metals, changing resistance, or radiation."]);

E("s7-u2-thermometer-read", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return mcq("School thermometers usually contain coloured alcohol rather than mercury mainly because",
      "mercury is poisonous, so a broken thermometer would be a safety hazard",
      ["alcohol expands more evenly than mercury does",
       "mercury cannot be seen through glass",
       "alcohol works at much higher temperatures than mercury"],
      "Mercury is a poison. If a mercury thermometer broke in a classroom, the spilled mercury would be a health hazard and hard to clean up safely, so schools use alcohol thermometers instead. Alcohol also freezes at a much lower temperature than mercury, which suits outdoor winter readings.",
      {});
  },
  function () {
    return mcq("A student is reading an alcohol thermometer in a beaker of warm water. Which practice gives the most trustworthy reading?",
      "Wait until the column stops moving, keep the bulb in the water, and read at eye level",
      ["Lift the thermometer out of the water and read it quickly before it changes",
       "Shake the thermometer down before placing it in the water",
       "Read the top of the column from above while the bulb rests on the beaker's bottom"],
      "The column needs time to reach the water's temperature, the bulb must stay in the water while reading (it starts changing temperature the moment it is lifted out), and eye-level reading avoids a parallax error. Resting the bulb on the bottom measures the beaker, not the water.",
      {});
  }
]), ["Think about safety first, then about what makes a reading accurate.", "One answer is about why alcohol replaces mercury; the other is about waiting, keeping the bulb in place, and eye level."]);

E("s7-u2-instrument-choose", 2, ["SC7.4.1"], 3, "var", varset([
  function () {
    return mcq("A nurse needs the temperature of a burn patient's skin without touching the skin, and a furnace technician needs the temperature inside a running furnace. Which pairing of instruments fits both jobs?",
      "Infrared thermometer for the skin; thermocouple for the furnace",
      ["Liquid-in-glass thermometer for the skin; infrared thermometer for the furnace",
       "Bimetallic strip for the skin; liquid-in-glass thermometer for the furnace",
       "Infrared thermometer for the skin; liquid-in-glass thermometer for the furnace"],
      "The skin reading must not involve contact, which is exactly what an infrared thermometer does. The furnace is far beyond the range of glass or surface instruments, and a thermocouple is built to work at those temperatures. A liquid-in-glass thermometer would have to touch the skin and would be destroyed in the furnace.",
      {});
  },
  function () {
    return mcq("A greenhouse owner wants the heating to switch itself on at 15 °C and off at 19 °C, with no one present. Which instrument does that job, and why do the others fail it?",
      "A bimetallic strip thermostat, because its bending can work the switch by itself",
      ["A liquid-in-glass thermometer, because it is the most accurate of the four",
       "An infrared thermometer, because it can watch the whole greenhouse at once",
       "A resistance thermometer, because it can be read from the owner's house"],
      "Only the bimetallic strip turns a temperature change into movement, and that movement can open and close the heating switch automatically. The other instruments only display a temperature; none of them can switch anything.",
      {});
  }
]), ["Two jobs, two different demands. Test each instrument against both.", "Contact is the problem in one job and extreme heat in the other; automatic switching needs an instrument that moves."]);

/* Added November 19, 2026: closes the Unit 2 Test 1 CR denomination
   gap in the test blueprint. The test covers SC7.4.1 alone against a
   3-mark CR target, and the indicator held no CR entry. See
   Junior-Science-Blueprint-Depth-Queue-2026-11-19.md. */
E("s7-u2-cr-instrument-jobs", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return textq("Three temperature jobs (3 marks)\n(a) A lifeguard must check whether the metal surface of a playground slide is too hot for children to touch, without touching it herself. (1)\n(b) A potter must know the temperature inside a kiln while it is firing, far above the boiling point of water. (1)\n(c) A greenhouse owner wants the heater to switch itself on when the air cools and off when it warms, with nobody present. (1)\nFor each job, name the instrument that fits and state why it fits.",
      ["(a) An infrared thermometer: it reads the radiation from the surface, so no contact is needed.",
       "(b) A thermocouple thermometer: it is built to withstand and measure temperatures far beyond the range of a glass thermometer.",
       "(c) A bimetallic strip thermostat: the strip bends as the temperature changes and can work the switch by itself."],
      "<b>Model answer:</b> (a) An infrared thermometer: it measures the invisible radiation the hot surface gives off, so the lifeguard gets the reading from a distance without touching the slide. (b) A thermocouple thermometer: its joined wires of two different metals survive the extreme heat inside a firing kiln and turn the temperature into an electrical signal, where a liquid-in-glass thermometer would break. (c) A bimetallic strip thermostat: its two joined metals expand by different amounts as the temperature changes, so the strip bends, and the bending can open and close the heater's switch by itself.<br><br><b>Marking points:</b> 1 mark for each job: the fitting instrument named, with the reason it fits that job's conditions.", {});
  },
  function () {
    return textq("Three temperature jobs (3 marks)\n(a) A weather station records the air temperature day and night and sends each reading along wires to a display inside a building. (1)\n(b) A student measures the temperature of warm water in a beaker during a class investigation. (1)\n(c) A heat alarm must trigger a switch by itself if the air in a storage room rises above a set temperature. (1)\nFor each job, name the instrument that fits and state why it fits.",
      ["(a) A resistance thermometer: its probe's electrical resistance changes with temperature and the signal travels along wires to the display.",
       "(b) A liquid-in-glass thermometer: the everyday instrument for a liquid in a lab, read directly from the column's height.",
       "(c) A bimetallic strip: it bends as the temperature rises and can trip the alarm switch by itself."],
      "<b>Model answer:</b> (a) A resistance thermometer: the resistance of its probe changes with temperature, and that electrical signal can be sent along wires to a display and recorded, which is what a weather station needs. (b) A liquid-in-glass thermometer: it is the standard tool for measuring a liquid in a lab; the liquid expands as it warms and the height of the column gives the reading directly. (c) A bimetallic strip: two joined metals expand by different amounts, the strip bends as the room warms, and at the set temperature the bending trips the switch, so the alarm works with nobody watching it.<br><br><b>Marking points:</b> 1 mark for each job: the fitting instrument named, with the reason it fits that job's conditions.", {});
  }
]), ["Each job has one condition that rules most instruments out: no contact, extreme heat, automatic switching, a wired signal, an ordinary liquid.", "Name the instrument and the condition it satisfies, one job at a time."]);

/* ---------- SC7.4.2 Define temperature (particle theory) ---------- */
E("s7-u2-temp-define", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    return mcq("In the particle theory, temperature is a measure of",
      "the average kinetic energy of the particles of a substance",
      ["the total kinetic energy of all the particles of a substance",
       "the amount of heat a substance contains",
       "the speed of the fastest particles in a substance"],
      "Temperature measures the average kinetic energy of the particles, not the total. A bathtub of warm water holds more total particle energy than a cup of hotter water, but the cup's particles have the higher average, so the cup has the higher temperature. Temperature is also not an amount of heat: heat is energy being transferred.",
      {});
  },
  function () {
    return mcq("Kinetic energy is",
      "the energy an object or particle has because it is moving",
      ["the energy stored in the bonds between particles",
       "the energy given off as light by a warm object",
       "the energy needed to change a solid into a liquid"],
      "Kinetic energy is energy of motion. The faster a particle moves, the more kinetic energy it has, and temperature reflects the average of that energy across all the particles in a substance.",
      {});
  }
]), ["Temperature is about particles and their motion.", "It is an average, not a total, and not an amount of stored heat."]);

E("s7-u2-particle-points", 2, ["SC7.4.2"], 1, "gen", function () {
  var cases = [
    { topic: "what matter is made of", key: "All matter is made up of tiny particles", d: ["All particles of a substance are the same size and mass", "Particles disappear when a substance melts", "A substance's particles are joined together with no spaces between them"] },
    { topic: "the spaces between particles", key: "There are empty spaces between the particles of a substance", d: ["Particles touch each other with no gaps in every state of matter", "The spaces between particles are filled with air", "Particles in a gas have no spaces between them"] },
    { topic: "whether particles move", key: "Particles are constantly moving", d: ["Particles move only when a substance is heated", "Particles in a solid do not move at all", "Particles stop moving at 0 °C"] },
    { topic: "temperature and particle motion", key: "Particles move faster as the temperature increases", d: ["Particles grow larger as the temperature increases", "Particles move faster as the temperature decreases", "All particles in a substance move at exactly the same speed"] },
    { topic: "forces between particles", key: "Particles attract each other", d: ["Particles push each other away at all times", "Particles attract each other only in liquids", "Particles are held together by tiny hooks"] }
  ];
  var c = pick(cases);
  return mcq("Which statement about " + c.topic + " is one of the points of the particle theory of matter?",
    c.key, c.d,
    "The particle theory says: all matter is made of tiny particles; there are empty spaces between particles; particles are constantly moving; particles move faster as temperature increases; and particles attract each other. The distractors break one point each: particles of different substances differ, particles in a solid still vibrate, particles do not grow when heated, and particles keep moving well below 0 °C.",
    {});
}, ["Five statements make up the theory; four of these options break one of them.", "Watch for absolute claims: only, never, all the same, stop completely."]);

E("s7-u2-particle-speed", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return mcq("Two identical containers hold the same gas. In container A the particles are drawn with short movement arrows and are close together. In container B the particles are drawn with long movement arrows and fill the whole container. What can be concluded?",
      "B is at the higher temperature, and its particles have spread out because they are moving faster",
      ["A is at the higher temperature, because its particles are packed closer together in the container",
       "Both are at the same temperature, because they hold the same gas in identical containers",
       "B is at the higher temperature, because it holds more particles than container A holds"],
      "Arrow length stands for particle speed, and faster particles mean a higher average kinetic energy, which is a higher temperature. Moving faster, the particles also spread out to fill the container. Closeness does not mean hotter, and the containers hold the same amount of gas.",
      {});
  },
  function () {
    return mcq("A sealed balloon of air is moved from a cold porch into a warm room. After a while the balloon is slightly bigger. Which particle explanation is correct?",
      "The air particles move faster, push harder and more often on the balloon's walls, and spread farther apart",
      ["The air particles grow larger as they warm up, so each one takes up more room inside the balloon",
       "More air particles form inside the balloon as it warms, so the balloon fills with extra air",
       "The particles slow down and settle toward the bottom, leaving more empty space above them"],
      "Warming raises the particles' average kinetic energy: they move faster, collide harder and more often, and spread farther apart, which inflates the balloon. Particles never grow, no new particles appear, and warming speeds particles up rather than slowing them down.",
      {});
  }
]), ["Arrow length stands for speed; spacing stands for how far particles have spread.", "Higher temperature means faster particles, and faster particles spread out."]);

E("s7-u2-cr-temp-explain", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return textq("A thermometer in a pot of soup reads 20 °C. After heating, it reads 85 °C. Explain, using the particle theory, what the thermometer is actually measuring and what changed in the soup. (3 marks)",
      ["temperature measures average kinetic energy", "average kinetic energy of particles", "particles move faster when heated"],
      "<b>Model answer:</b> The thermometer measures the temperature of the soup, which is the average kinetic energy of the soup's particles. At 20 °C the particles move at a certain average speed. As heat energy is transferred into the soup, the particles move faster and faster, so their average kinetic energy rises, and the thermometer reads 85 °C. The particles themselves did not grow or multiply; only their motion changed.<br><br><b>Marking points:</b> 1 mark for temperature as average kinetic energy of the particles; 1 mark for the particles moving faster as energy is transferred in; 1 mark for a correct denial or correct handling of a misconception (particles do not grow, increase in number, or contain the temperature).",
      {});
  }
]), ["Name what temperature measures first, then describe what heating does to the particles.", "Average kinetic energy is the key phrase; then faster particles, and no growing or multiplying."]);

/* ---------- SC7.4.3 States of matter and temperature change ---------- */
E("s7-u2-states-compare", 2, ["SC7.4.3"], 1, "var", varset([
  function () {
    return mcq("Which comparison of the three states of matter is correct?",
      "A solid keeps its own shape and volume; a liquid keeps its volume but takes its container's shape; a gas takes both the shape and volume of its container",
      ["A solid takes its container's shape; a liquid keeps its own shape and volume; a gas keeps its own volume in any container",
       "A liquid expands to fill its whole container; a gas keeps a fixed volume of its own; a solid flows slowly to match its container's shape",
       "All three states keep their own shape and volume at any temperature, whatever container they are placed in"],
      "Solids hold both shape and volume because their particles are locked in place. Liquids hold volume but flow into their container's shape because their particles can slide past each other. Gases spread to fill all the space available because their particles move freely and far apart.",
      {});
  },
  function () {
    return mcq("In which state are the particles arranged in a regular pattern, vibrating in place, held by strong attractions?",
      "Solid",
      ["Liquid", "Gas", "All three states equally"],
      "In a solid the particles sit in a regular arrangement, held by strong attractions, and can only vibrate in place. Liquid particles are close but disordered and can slide past each other; gas particles are far apart and move freely.",
      {});
  }
]), ["Compare shape, volume, arrangement and movement, state by state.", "Solids are locked in place; liquids slide; gases spread out."]);

E("s7-u2-expansion-scenario", 2, ["SC7.4.3"], 2, "gen", function () {
  var cases = [
    { s: "A car's tires are filled to the correct pressure in a cool garage. After a long highway drive on a hot day, the pressure inside them is higher.", key: "The air inside expanded as it warmed, pushing harder on the tire walls", d: ["The rubber of the tires contracted and squeezed the air", "More air leaked into the tires through the valves", "The air particles shrank, leaving more room to press outward"] },
    { s: "A playground ball that felt firm indoors feels soft after being left outside on a very cold day.", key: "The air inside contracted as it cooled, so it pushes less on the ball", d: ["Air escaped through the ball's material because of the cold", "The air particles grew heavier and sank to the bottom", "The ball's material expanded and made more room inside"] },
    { s: "A balloon tied at room temperature is placed in a freezer. An hour later it is noticeably smaller.", key: "The air particles slowed and moved closer together, so the air contracted", d: ["Some air particles froze and disappeared", "The cold air pushed the balloon walls inward from outside", "The balloon rubber expanded and used up the space"] },
    { s: "A metal lid on a jam jar will not turn. Running hot water over the lid loosens it.", key: "The metal lid expanded slightly more than the glass, loosening its grip", d: ["The hot water melted the sealant holding the lid", "The glass jar contracted away from the lid", "The jam inside expanded and pushed the lid upward"] }
  ];
  var c = pick(cases);
  return mcq(c.s + " What is the best particle explanation?",
    c.key, c.d,
    "Heating makes particles move faster and spread farther apart, so substances expand; cooling slows particles and pulls them closer, so substances contract. In the tire, the warmed air expands against the walls; in the ball and the balloon, the cooled air contracts and pushes less; the metal lid expands a little more than the glass under hot water, which breaks its grip.",
    {});
}, ["Decide first whether the case is a warming (expansion) or a cooling (contraction).", "Particles spread apart when warmed and come closer when cooled; they never grow, shrink, or vanish."]);

E("s7-u2-states-heated", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows the particles of a solid, a liquid and a gas when cooler (top row) and warmer (bottom row). When a substance is heated, what changes about its particles?",
      "They move faster and, in liquids and gases, spread farther apart; the particles themselves stay the same size",
      ["They grow larger as they warm up, which is why the substance expands to fill more space",
       "They multiply as they warm, so there are more particles taking up space in the substance",
       "They change into particles of a completely different substance, which is why the substance expands"],
      "Heating raises the particles' kinetic energy, so they move faster; in liquids and gases they also spread farther apart, which is expansion. The particles themselves do not grow, multiply, or change identity.",
      {});
    q.figure = s7ParticlePanelSVG();
    return q;
  },
  function () {
    var q = mcq("A steel rail and a puddle of water are both left in the sun. By afternoon both are warmer. Which statement about their particles is true for both?",
      "In both, the particles are moving faster on average than they were in the morning",
      ["In both, the particles have spread far apart like the particles of a gas",
       "In both, the particles have stopped attracting each other altogether",
       "In both, the particles themselves are larger than they were in the morning"],
      "Whatever the state, warming means faster particles on average. The rail's particles still vibrate in place and the puddle's particles still slide past each other; neither spreads out like a gas, and no particle grows.",
      {});
    q.figure = s7ParticlePanelSVG();
    return q;
  }
]), ["Use the diagram: compare the top and bottom rows for spacing and arrow length.", "Speed and spacing change with temperature; particle size, number and identity do not."]);

E("s7-u2-cr-expansion", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return textq("On a hot afternoon, a sealed plastic water bottle left in the sun bulges outward, even though no air was added. Explain the bulging using the particle theory. (3 marks)",
      ["particles move faster and spread apart", "air expands when heated", "particles collide harder and more often"],
      "<b>Model answer:</b> The air trapped inside the bottle warms in the sun. Its particles gain kinetic energy and move faster, so they spread farther apart and collide with the bottle's walls harder and more often. The air expands, and because the bottle is flexible plastic, the extra push bulges the walls outward. No particles were added; the same particles simply take up more space when moving faster.<br><br><b>Marking points:</b> 1 mark for the trapped air warming; 1 mark for particles moving faster and spreading apart (expansion); 1 mark for harder or more frequent collisions pushing the flexible walls out.",
      {});
  }
]), ["Start with the air inside warming up.", "Faster particles, farther apart, pushing harder on the walls."]);

/* ---------- SC7.4.4 Changes of state ---------- */
E("s7-u2-change-name", 2, ["SC7.4.4"], 1, "gen", function () {
  var cases = [
    { s: "Frost appears on a car windshield overnight without any liquid water being present first", key: "Sublimation (gas directly to solid, in the depositing direction)", d: ["Condensation", "Freezing", "Evaporation"] },
    { s: "Droplets form on the outside of a cold drink can on a humid day", key: "Condensation", d: ["Evaporation", "Sublimation", "Melting"] },
    { s: "A puddle gradually disappears on a windy afternoon, long before the water could boil", key: "Evaporation", d: ["Condensation", "Boiling throughout the liquid at once", "Sublimation"] },
    { s: "An ice cube tray left in a freezer turns liquid water into cubes", key: "Freezing", d: ["Melting", "Condensation", "Evaporation"] },
    { s: "A block of dry ice in a cooler gives off fog and shrinks, with no liquid puddle forming", key: "Sublimation", d: ["Melting", "Evaporation", "Condensation"] },
    { s: "Butter in a warm pan turns from a solid block to a liquid pool", key: "Melting", d: ["Freezing", "Sublimation", "Condensation"] }
  ];
  var c = pick(cases);
  return mcq("Which change of state is happening? " + c.s + ".",
    c.key, c.d,
    "Name the change by its start and end states. Liquid to gas at the surface is evaporation; gas to liquid is condensation; liquid to solid is freezing; solid to liquid is melting; and a change directly between solid and gas, with no liquid stage, is sublimation, which is how the frost forms and how dry ice shrinks.",
    {});
}, ["Name the starting state and the ending state, then pick the change that connects them.", "If there is no liquid stage at all, the change is sublimation."]);

E("s7-u2-plateau-read", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows a sample of ice being heated steadily until the water boils. During which part of the graph is the average kinetic energy of the particles increasing?",
      "On the rising sections only; it stays steady along both flat sections",
      ["Along the whole graph, including the flat sections",
       "On the flat sections only, because that is when the state changes",
       "Nowhere; the kinetic energy is used up by the changes of state"],
      "Temperature measures average kinetic energy, so kinetic energy rises exactly where the temperature rises: the three sloping sections. Along the flat sections (the plateaus at 0 °C and 100 °C) the temperature, and so the average kinetic energy, holds steady while the added energy breaks attractions between particles instead.",
      {});
    q.figure = s7HeatingCurveSVG(0, 100, 30, 120);
    return q;
  },
  function () {
    var q = mcq("On the graph, the two flat sections (plateaus) are at 0 °C and 100 °C. What is happening to the water along those sections?",
      "It is changing state: melting at 0 °C and boiling at 100 °C, with the temperature holding steady",
      ["The heater has stopped working during those sections, then started again afterward",
       "The thermometer has reached the top of its scale and cannot show a higher temperature",
       "The water is cooling down between bursts of heating, then warming up again afterward"],
      "A plateau means energy is being added but the temperature is not rising: the energy is being used to break attractions between particles as the state changes. Melting happens at 0 °C and boiling at 100 °C for water.",
      {});
    q.figure = s7HeatingCurveSVG(0, 100, 30, 120);
    return q;
  }
]), ["Find the flat sections first; they are the plateaus.", "Where the line climbs, kinetic energy climbs; where it is flat, the state is changing."]);

E("s7-u2-change-particles", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    return mcq("Ice at 0 °C is heated and begins to melt, yet its temperature stays at 0 °C until all the ice has melted. Where does the added energy go?",
      "It breaks attractions between the particles, freeing them to slide past each other as a liquid",
      ["It raises the particles' kinetic energy, but the thermometer cannot show it",
       "It is stored inside each particle, making the particles larger",
       "It escapes through the container walls as fast as it is added"],
      "During a change of state, added energy does the work of breaking attractions between particles instead of speeding them up. Since the particles' average kinetic energy does not change, the temperature holds steady until the change is complete.",
      {});
  },
  function () {
    return mcq("Which particles escape from the surface of a liquid when it evaporates?",
      "The fastest-moving particles at the surface",
      ["The slowest-moving particles at the surface",
       "Particles from the bottom of the liquid only",
       "Particles that have stopped attracting each other completely"],
      "Evaporation happens at the surface, and only the fastest surface particles have enough energy to break free of the attractions holding them in the liquid. That is also why evaporation cools the liquid left behind: the particles that remain have a lower average kinetic energy.",
      {});
  }
]), ["During a change of state, energy breaks attractions instead of speeding particles up.", "Evaporation takes the fastest surface particles, which is why it cools what is left."]);

E("s7-u2-cr-plateau", 2, ["SC7.4.4"], 3, "var", varset([
  function () {
    var q = textq("The graph shows a solid substance being heated steadily. (a) At what temperatures does the substance melt and boil? (b) Explain why the temperature stays the same during each of those changes even though heat is still being added. (3 marks)",
      ["melts at 40", "boils at 140", "energy breaks attractions between particles"],
      "<b>Model answer:</b> (a) The first plateau is at 40 °C, so the substance melts at 40 °C; the second plateau is at 140 °C, so it boils at 140 °C. (b) During a change of state, the added energy is used to break the attractions between particles, pulling them out of their solid arrangement (melting) or free of the liquid altogether (boiling). None of the energy goes into speeding the particles up, so their average kinetic energy, and therefore the temperature, stays the same until the change is finished.<br><br><b>Marking points:</b> 1 mark for both plateau temperatures read correctly from the graph (40 °C and 140 °C); 1 mark for energy breaking attractions during a change of state; 1 mark for linking steady temperature to unchanged average kinetic energy.",
      {});
    q.figure = s7HeatingCurveSVG(40, 140, 30, 160);
    return q;
  }
]), ["Read the two plateau heights off the temperature axis first.", "Then explain the plateaus: energy breaks attractions, so particle speed and temperature hold steady."]);

/* ---------- SC7.4.5 Conduction, convection, radiation ---------- */
E("s7-u2-transfer-classify", 2, ["SC7.4.5"], 1, "gen", function () {
  var cases = [
    { s: "A metal saucepan heats evenly on a stove element, and its metal handle gets hot too", key: "Conduction", d: ["Convection", "Radiation", "Evaporation"] },
    { s: "An ice pack cools an injured ankle it is pressed against", key: "Conduction", d: ["Convection", "Radiation", "Condensation"] },
    { s: "Warm air rises above a heater and cooler air moves in to take its place, setting up a circulating current", key: "Convection", d: ["Conduction", "Radiation", "Sublimation"] },
    { s: "Water in a pot circulates as it is heated from below, carrying heat to the top", key: "Convection", d: ["Conduction", "Radiation", "Freezing"] },
    { s: "You feel the warmth of a campfire on your face while standing a metre away from it", key: "Radiation", d: ["Conduction", "Convection", "Evaporation"] },
    { s: "Sunlight warms the dashboard of a parked car", key: "Radiation", d: ["Conduction", "Convection", "Condensation"] }
  ];
  var c = pick(cases);
  return mcq("Which process is transferring the heat here? " + c.s + ".",
    c.key, c.d,
    "Conduction passes heat through matter by particle collisions, as in the saucepan, its handle and the ice pack. Convection carries heat by the movement of a liquid or gas, as in the rising warm air and the circulating water. Radiation transfers heat as electromagnetic waves that need no matter at all, as with the campfire's warmth and the sunlight on the dashboard.",
    {});
}, ["Ask how the heat travels: through touching matter, by a moving fluid, or as waves needing nothing.", "Pass hand to hand is conduction; carried along is convection; thrown across is radiation."]);

E("s7-u2-transfer-particles", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Which statement about the three heat transfer processes is correct?",
      "Conduction happens in solids, liquids and gases; convection happens only in liquids and gases; radiation needs no matter at all",
      ["Convection happens in solids, liquids and gases; conduction happens only in solids, never in fluids",
       "Radiation happens only when two objects are touching each other directly",
       "Conduction is fastest in gases because their particles have the most room to move freely and collide"],
      "Conduction works in all three states but is most efficient in solids, where particles are packed close and collide often, and least in gases. Convection needs a fluid that can flow, so it happens only in liquids and gases. Radiation is electromagnetic waves and crosses empty space, which is how the Sun's heat reaches Earth.",
      {});
  },
  function () {
    return mcq("In conduction, heat moves through a metal spoon because",
      "fast-moving particles collide with slower neighbours and pass kinetic energy along the spoon",
      ["particles travel all the way from the hot end of the spoon to the cold end",
       "heat flows through the spoon as a liquid from the hot end to the cold end",
       "the spoon's particles expand as they warm and carry the heat along with them"],
      "The particles themselves stay in place; what travels is the energy. Particles at the hot end vibrate faster, collide with their neighbours, and pass kinetic energy along particle by particle, like a parcel passed hand to hand down a line.",
      {});
  }
]), ["Sort the processes by what they need: any matter, a flowing fluid, or nothing at all.", "In conduction the energy travels, not the particles."]);

E("s7-u2-transfer-compare", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("A metal spoon and a wooden spoon are left standing in the same pot of hot soup. The metal spoon's handle soon feels hot; the wooden spoon's handle does not. Why?",
      "Metal conducts heat well because its particles pass kinetic energy along quickly; wood is a poor conductor",
      ["Wood absorbs the heat and destroys it completely before it can reach the handle",
       "The metal spoon attracts heat out of the hot soup into its handle",
       "The wooden spoon reflects the heat back into the soup, so none of it reaches the handle"],
      "Both spoons sit in the same soup, so the difference is in the materials. Metal is a good conductor: its particles pass kinetic energy along efficiently. Wood is an insulator: its particles pass energy along poorly, so the handle stays cool.",
      {});
  },
  function () {
    return mcq("A room is heated by a hot water radiator under a window. The air touching the radiator warms, rises, spreads across the ceiling, cools, and sinks on the far side of the room. The main process moving heat around the room is",
      "convection, because the moving air carries the heat with it",
      ["conduction, because the air touches the radiator",
       "radiation, because the radiator is hot",
       "conduction, because heat passes through the window glass"],
      "Once the air is warmed, it is the air's own movement that carries the heat around the room in a circulating current, and carrying heat by a moving fluid is convection. Conduction warms the first layer of air at the radiator's surface, but it does not move heat across the room.",
      {});
  }
]), ["Name the process doing most of the work in each situation, not every process present.", "A moving fluid carrying heat is convection; particle-to-particle passing is conduction."]);

E("s7-u2-stove-three", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("A wood stove heats a cabin in all three ways at once. Which list matches each way to its process correctly?",
      "The stove top heats a kettle by conduction; air warmed by the stove rises and circulates by convection; campers feel warmth on their faces across the room by radiation",
      ["The stove top heats a kettle by radiation; air warmed by the stove circulates by conduction; warmth is felt across the room by convection",
       "The stove top heats a kettle by convection; air warmed by the stove circulates by radiation; warmth is felt across the room by conduction",
       "All three effects are conduction, because everything in the cabin touches the stove or touches the air around it"],
      "The kettle touches the stove top, so heat passes particle to particle: conduction. The warmed air rises and circulates, carrying heat: convection. The warmth felt across the room travels as electromagnetic waves through the air without the air carrying it: radiation.",
      {});
  }
]), ["Take the three effects one at a time: touching, circulating air, felt at a distance.", "Contact is conduction, a circulating fluid is convection, across a gap is radiation."]);

E("s7-u2-cr-transfer-explain", 2, ["SC7.4.5"], 3, "var", varset([
  function () {
    return textq("A pot of water sits on a campfire. Explain how each of the three heat transfer processes is at work in this scene. (3 marks)",
      ["conduction through the pot", "convection in the water", "radiation from the fire"],
      "<b>Model answer:</b> Conduction: heat passes through the metal of the pot, particle to particle, from the side touching the flames to the side touching the water (and up the handle). Convection: the water at the bottom of the pot warms, expands and rises, while cooler water sinks to take its place, so currents carry heat through all the water. Radiation: the fire gives off electromagnetic waves that travel through the air with no matter needed, warming the outside of the pot and anyone sitting nearby.<br><br><b>Marking points:</b> 1 mark for conduction correctly placed (through the pot or its handle); 1 mark for convection correctly placed (currents in the water); 1 mark for radiation correctly placed (waves from the fire travelling without matter).",
      {});
  }
]), ["Give one process per part of the scene: the pot, the water, the space between fire and pot.", "Conduction needs contact, convection needs a flowing fluid, radiation needs nothing."]);

/* ---------- SC7.4.6 Absorption of radiant heat ---------- */
E("s7-u2-absorb-classify", 2, ["SC7.4.6"], 1, "gen", function () {
  var cases = [
    { q: "Four car roofs sit in the same sunshine. Which roof absorbs the most radiant heat?", key: "A dull black roof", d: ["A shiny black roof", "A dull white roof", "A shiny silver roof"] },
    { q: "Four metal sheets are placed under the same lamp. Which sheet absorbs the least radiant heat?", key: "A shiny light-coloured sheet", d: ["A dull black sheet", "A dull dark-grey sheet", "A shiny black sheet"] },
    { q: "Two identical cans hold equal amounts of water under a lamp. Which can's water warms fastest?", key: "The can painted dull black", d: ["The can painted shiny white", "The can wrapped in shiny foil", "The can painted light grey and polished"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "Dark surfaces absorb more radiant heat than light ones, and dull surfaces absorb more than shiny ones, because shiny surfaces reflect much of the radiation away. A dull black surface is the strongest absorber; a shiny light surface is the weakest.",
    {});
}, ["Two features matter: colour (dark beats light) and finish (dull beats shiny).", "The strongest absorber is dark and dull; the weakest is light and shiny."]);

E("s7-u2-absorb-lab", 2, ["SC7.4.6"], 3, "var", varset([
  function () {
    var q = mcq("Two cans of oil, one dark and one light, stood the same distance from a 100 W lamp. The graph shows their temperatures over 15 minutes. Which conclusion and caution are both sound?",
      "The dark can warmed faster; but before concluding, check that both cans held the same amount of oil and sat the same distance from the lamp",
      ["The dark can warmed faster, which proves dark surfaces always heat twice as fast as light surfaces in any test",
       "The light can warmed faster, because light surfaces attract heat from a lamp more strongly",
       "The graph shows nothing useful, because the two cans were different colours and cannot be compared"],
      "The dark line climbs more steeply, so the dark surface absorbed more radiant heat and warmed its oil faster. A careful conclusion also checks the controlled factors the laboratory itself names: equal amounts of oil and equal distance from the lamp, since either one could produce a difference on its own. Nothing in the graph supports a claim about twice as fast.",
      {});
    q.figure = s7AbsorbGraphSVG([0, 5, 10, 15], [22, 30, 37, 43], [22, 26, 30, 33]);
    return q;
  }
]), ["Read the steepness of the two lines first.", "Then ask what else could explain a difference: amounts and distances must have been kept the same."]);

E("s7-u2-cr-absorb", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return textq("Use the findings about absorbing and emitting radiant heat to explain both of these: (a) people in hot, sunny climates often wear light-coloured clothing; (b) gardeners sometimes mix dark soot into garden soil in spring. (2 marks)",
      ["light colours reflect radiant heat", "dark surfaces absorb more", "good absorbers are good emitters"],
      "<b>Model answer:</b> (a) Light-coloured surfaces reflect much of the Sun's radiant heat instead of absorbing it, so light clothing takes in less heat and keeps the wearer cooler. (b) Dark surfaces absorb radiant heat well, so soot-darkened soil takes in more of the spring sunshine and warms up faster, giving seeds and roots an earlier start.<br><br><b>Marking points:</b> 1 mark for light surfaces reflecting or poorly absorbing radiant heat, applied to clothing; 1 mark for dark surfaces absorbing radiant heat well, applied to the soil warming.",
      {});
  }
]), ["Both parts use the same finding from opposite ends.", "Light and shiny reflect; dark and dull absorb."]);

/* ---------- SC7.4.7 Specific heat capacity (qualitative) ---------- */
E("s7-u2-shc-compare", 2, ["SC7.4.7"], 2, "gen", function () {
  var cases = [
    { frame: "In a school laboratory", rows: [["Water", 6], ["Alcohol", 11], ["Steel", 22], ["Wood", 9]], key: "Steel", note: "steel rises most, so it stores the least energy per degree" },
    { frame: "In a materials testing lab", rows: [["Water", 5], ["Soil (dry)", 14], ["Steel", 24], ["Alcohol", 10]], key: "Steel", note: "steel rises most again with a fresh set of values" },
    { frame: "In a science fair experiment", rows: [["Water", 7], ["Alcohol", 13], ["Soil (dry)", 16], ["Wood", 10]], key: "Soil (dry)", note: "dry soil rises most in this set" }
  ];
  var c = pick(cases);
  var rows = c.rows.map(function (r) { return { name: r[0], rise: r[1] }; });
  var others = c.rows.map(function (r) { return r[0]; }).filter(function (n) { return n !== c.key; });
  var q = mcq(c.frame + ", equal masses of four materials are given exactly the same amount of energy. The display shows each material's temperature rise. Which material has the lowest specific heat capacity?",
    c.key, others,
    "Specific heat capacity is about how much energy a material can take in for each degree its temperature rises. Given equal energy, the material whose temperature rises most is storing the least energy per degree, so it has the lowest specific heat capacity. In this display, " + c.note + ". Water's rise is the smallest, which is why water is famous for soaking up energy with little temperature change.",
    {});
  q.figure = s7SHCBarsSVG(rows);
  return q;
}, ["Equal masses and equal energy: the biggest rise means the least stored per degree.", "Water's small rise is the clue to its high specific heat capacity."]);

E("s7-u2-shc-coastal", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    return mcq("A coastal town and an inland town get the same sunshine. The coastal town has cooler summer days and warmer winter nights than the inland town. Which explanation uses specific heat capacity correctly?",
      "The ocean's water has a high specific heat capacity, so it warms and cools slowly, evening out the coastal temperatures",
      ["The land has a high specific heat capacity, so it holds the summer heat into winter",
       "Water has a low specific heat capacity, so the ocean changes temperature quickly and the town follows",
       "The ocean reflects all the sunshine, so the coast never really warms up"],
      "Water stores a great deal of energy for each degree of temperature change, so the ocean warms slowly through summer and cools slowly through winter, moderating the air above the coast. Land materials like dry soil have lower specific heat capacities and swing temperature quickly, which is why inland temperatures are more extreme.",
      {});
  },
  function () {
    return mcq("Equal masses of water and dry soil receive the same amount of sunshine. Which statement is correct?",
      "The soil's temperature rises more, because dry soil has the lower specific heat capacity",
      ["The water's temperature rises more, because water has the lower specific heat capacity",
       "Both rise by the same amount, because they received the same energy",
       "The water's temperature does not rise at all, because water only stores energy"],
      "With equal masses and equal energy, the temperature rise is bigger for the material with the lower specific heat capacity. Dry soil rises quickly; water rises slowly because it can store much more energy per degree.",
      {});
  }
]), ["High specific heat capacity means slow temperature change for the same energy.", "Coasts are moderated by water; soil heats and cools fast."]);

E("s7-u2-heat-vs-temp", 2, ["SC7.4.7"], 1, "var", varset([
  function () {
    return mcq("Which statement correctly separates heat from temperature?",
      "Heat is energy transferred from a hotter object to a colder one; temperature measures the average kinetic energy of an object's particles",
      ["Heat and temperature are two names for the same measurement, taken in different units",
       "Temperature is the energy transferred between objects; heat measures the average kinetic energy of an object's particles",
       "Heat is a substance that flows into an object and raises the temperature of its particles"],
      "Heat is energy on the move, transferred because of a temperature difference, always from hotter to colder. Temperature is a property of one object: the average kinetic energy of its particles. Cold itself never travels; what people call cold moving is heat leaving.",
      {});
  },
  function () {
    return mcq("A student says, 'Close the door, you are letting the cold in.' What is wrong with that statement, scientifically?",
      "Cold does not travel; heat travels out of the warm room to the colder outdoors",
      ["Nothing; cold air is a substance that flows in through open doors",
       "The door blocks heat completely, so no transfer of any kind can happen",
       "Cold travels faster than heat, so the statement has it backwards"],
      "Transfer is always of heat, and always from warmer to colder. Opening the door lets the room's heat escape to the colder air outside (and lets cold air in as air, but what is transferred is heat leaving). There is no substance called cold that flows.",
      {});
  }
]), ["One of the pair is a transfer; the other is a measurement.", "Heat moves from hotter to colder. Cold never travels."]);

/* ---------- SC7.5.1 Personal activities and temperature (THIN) ---------- */
E("s7-u2-familiar-temp", 2, ["SC7.5.1"], 1, "gen", function () {
  var cases = [
    { q: "Which temperature best matches a comfortable classroom?", key: "22 °C", d: ["37 °C", "5 °C", "45 °C"] },
    { q: "Which temperature best matches a healthy human body?", key: "37 °C", d: ["22 °C", "32 °C", "42 °C"] },
    { q: "Which temperature best matches an oven baking bread?", key: "180 °C", d: ["100 °C", "120 °C", "250 °C"] },
    { q: "Which temperature best matches a January afternoon outdoors in this province?", key: "-8 °C", d: ["8 °C", "0 °C", "-28 °C"] },
    { q: "Which temperature best matches water in a kettle that has just boiled?", key: "100 °C", d: ["85 °C", "60 °C", "120 °C"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "Familiar reference temperatures anchor the scale: water freezes at 0 °C and boils at 100 °C, a comfortable room sits near 22 °C, and a healthy body is about 37 °C. A baking oven runs well above boiling, around 180 °C, and a January afternoon in Newfoundland and Labrador is typically a few degrees below zero.",
    {});
}, ["Anchor on the temperatures you know: freezing 0, room about 22, body 37, boiling 100.", "Rule out anything on the wrong side of those anchors."]);

E("s7-u2-activity-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("After an hour of pond hockey on a -10 °C day, a player says she feels warm, even hot. The thermometer still reads -10 °C. What does this show about judging temperature by feel?",
      "Feelings of warmth depend on what your body is doing, not only on the temperature, so skin is an unreliable thermometer",
      ["The thermometer must be broken, because it cannot read -10 °C while the player out on the ice feels warm",
       "Exercise raises the temperature of the air immediately around the player by several degrees",
       "Cold air always feels warm to anyone whenever the winter sun is shining on them"],
      "Your sense of hot and cold responds to your own state: exercise generates heat inside the body, so the same -10 °C air feels mild. That is why a thermometer, not skin, is the tool for measuring temperature, and why hands dipped in the same water can disagree about it.",
      {});
  },
  function () {
    return mcq("Two students disagree about whether their classroom is warm or cool. One just came in from outdoor recess; the other has been sitting inside all morning. What is the best way to settle it?",
      "Read a thermometer placed in the room, away from heaters and windows",
      ["Ask a third student to decide by feel",
       "Have both students hold their hands near the wall and compare again",
       "Average the two opinions and record that as the temperature"],
      "Feel depends on what each person's body was doing and what it was touching before, so opinions cannot settle the question. A thermometer gives a measurement that does not depend on the reader, as long as it is placed away from a heater or a cold window that would skew it.",
      {});
  }
]), ["Your skin reports on your body as much as on the air.", "A measurement beats an opinion: use a thermometer, placed sensibly."]);

/* ---------- SC7.5.2 Temperature technologies of the past ---------- */
E("s7-u2-thermoscope", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Galileo's early temperature instrument, the thermoscope, showed whether air was warmer or cooler than before, but it could not give a temperature reading in degrees. Why not?",
      "It had no scale marked on it, so there were no numbers to read",
      ["It was made of glass, which insulates too well",
       "It measured pressure instead of temperature",
       "Its liquid evaporated before a reading could be taken"],
      "The thermoscope's water level rose and fell with temperature, which showed change, but with no scale there was nothing to read a number from. Adding a marked scale to a liquid thermometer is what turned it into a measuring instrument whose readings could be compared between people and places.",
      {});
  }
]), ["Showing change is not the same as measuring.", "Without a scale, there are no numbers to compare."]);

E("s7-u2-scales", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Which statement about the three temperature scales is correct?",
      "The Celsius scale is built on water's freezing point (0) and boiling point (100); the Kelvin scale starts at absolute zero",
      ["The Kelvin scale is built on water's freezing and boiling points; Celsius starts at absolute zero",
       "The Fahrenheit scale starts at absolute zero and was the last of the three invented",
       "All three scales use the same two fixed points and differ only in name"],
      "Fahrenheit's was the first widely used scale. Celsius built his scale on two reproducible points, water freezing at 0 and boiling at 100. Kelvin starts his scale at absolute zero, the temperature at which particles have their minimum energy, so 0 K is about -273 °C.",
      {});
  },
  function () {
    return mcq("Absolute zero, 0 K, is best described as",
      "the temperature at which particles have the least kinetic energy possible",
      ["the temperature of deep space everywhere",
       "the coldest temperature ever recorded outdoors",
       "the temperature at which all particles stop and disappear"],
      "Absolute zero is the bottom of the Kelvin scale: the point where particles have the minimum kinetic energy they can have. It is far colder than any outdoor temperature and is a defined reference point, not a weather record. Particles do not disappear there; their motion is at its minimum.",
      {});
  }
]), ["Each scale has its own starting point and fixed points.", "Celsius belongs to water's two points; Kelvin belongs to absolute zero."]);

E("s7-u2-past-tech", 2, ["SC7.5.2"], 2, "var", varset([
  function () {
    return mcq("Early liquid thermometers existed before anyone could compare temperatures between towns. What development made such comparisons possible?",
      "Agreeing on a scale with fixed points, so the same reading meant the same temperature everywhere",
      ["Making the glass tube longer so the liquid rose higher when the temperature rose",
       "Colouring the liquid in the tube so it could be seen more easily from a distance",
       "Using wider tubes that held more liquid and were harder to break in use"],
      "A thermometer without a shared scale shows only warmer or cooler. Once scales were fixed to reproducible points, like water freezing and boiling, a reading of 20 meant the same thing in every town, and temperatures could be recorded, compared and used scientifically.",
      {});
  }
]), ["The missing piece was agreement, not glassware.", "Fixed points plus a shared scale turn change into measurement."]);

/* ---------- SC7.5.3 Home heating in NL, past and present ---------- */
E("s7-u2-heating-tech", 2, ["SC7.5.3"], 1, "gen", function () {
  var cases = [
    { s: "A stove in the kitchen burns split logs, and the family gathers in the one warm room", key: "A wood stove", d: ["An oil furnace", "An air-to-air heat pump", "Electric baseboard heaters"] },
    { s: "A unit outside the house pulls heat from the outdoor air and delivers it inside, running on electricity but producing no heat of its own", key: "An air-to-air heat pump", d: ["An oil furnace", "A wood stove", "Hot water radiation"] },
    { s: "Heaters mounted along the base of the walls in each room, each warming the air that touches it", key: "Electric baseboard heaters", d: ["Hot water radiation", "A wood stove", "A geothermal system"] },
    { s: "A furnace in the basement burns fuel delivered by truck and stored in a tank beside the house", key: "An oil furnace", d: ["A wood stove", "Solar heating panels", "An air-to-air heat pump"] },
    { s: "Pipes carry hot water from a boiler to radiators in each room of an older house", key: "Hot water radiation", d: ["Electric baseboard heaters", "A geothermal system", "An air-to-air heat pump"] },
    { s: "Pipes buried below the frost line bring the ground's steady warmth to a heat pump inside", key: "A geothermal (ground source) system", d: ["An oil furnace", "Solar heating panels", "A wood stove"] }
  ];
  var c = pick(cases);
  return mcq("Which home heating technology is described? " + c.s + ".",
    c.key, c.d,
    "The guide's named technologies each have a signature. A wood stove burns logs in the room it heats; an oil furnace burns delivered fuel; electric baseboards heat room air directly; hot water radiation circulates boiler water to radiators; an air-to-air heat pump moves heat from outdoor air; and a geothermal system moves heat from the ground below the frost line.",
    {});
}, ["Look for the fuel or the heat source in the description.", "Burning, direct electricity, circulating water, and moving heat are four different signatures."]);

E("s7-u2-cr-heating-example", 2, ["SC7.5.3"], 2, "var", varset([
  function () {
    return textq("Name one home heating technology used in Newfoundland and Labrador in the past and one used today, and explain how each one delivers heat to the rooms of a house. (2 marks)",
      ["wood stove", "heat pump", "electric baseboard", "oil furnace"],
      "<b>Model answer:</b> Past: a wood stove. Burning logs heated the stove itself, which warmed the room's air by convection and radiated heat to the people and objects around it; most of the house away from that room stayed cold. Present: an air-to-air heat pump. Running on electricity, it moves heat from the outdoor air into the house rather than making heat, and a fan circulates the warmed air through the rooms. (An oil furnace, electric baseboards, hot water radiation, geothermal or solar system is equally acceptable as the present-day example, with its delivery method explained.)<br><br><b>Marking points:</b> 1 mark for a correct past technology with its delivery explained; 1 mark for a correct present technology with its delivery explained.",
      {});
  }
]), ["One from the past, one from today, and the delivery method for each.", "Burning in the room, burning in a furnace, direct electricity, or moving heat."]);

/* ---------- SC7.5.4 Approaches to the heating problem ---------- */
E("s7-u2-approaches", 2, ["SC7.5.4"], 1, "var", varset([
  function () {
    return mcq("A family installs a heat pump instead of a bigger furnace. Which approach to the home heating problem have they taken?",
      "Move heat that already exists outdoors into the house, instead of making all the heat themselves",
      ["Burn a fuel on site in a furnace or stove to make all the heat the house needs",
       "Turn electricity directly into heat in every room with baseboard heaters",
       "Reduce the need for heat by sealing drafts and insulating the whole house well"],
      "A heat pump does not create its heat by burning or by direct electric heating; it moves heat from the outdoor air (or ground) into the house. The other options name the other approaches: burning a fuel, direct electric heat, and reducing the need through insulation.",
      {});
  },
  function () {
    return mcq("Which household has taken the 'reduce the need' approach to heating?",
      "A household that adds insulation and seals drafts, so their existing furnace runs far less",
      ["A household that switches from oil heat to a wood stove in the kitchen",
       "A household that installs a larger oil furnace to replace its old one",
       "A household that adds electric baseboard heaters to every room of the house"],
      "Reducing the need means the house loses less heat, so whatever system it has runs less. The other households changed how heat is made, not how much heat the house needs.",
      {});
  }
]), ["Name the approach, not the appliance: burn, direct electricity, move heat, capture sun, or need less.", "A heat pump moves heat; insulation reduces the need for it."]);

E("s7-u2-approaches-compare", 2, ["SC7.5.4"], 2, "var", varset([
  function () {
    return mcq("Household A heats with a wood stove because their property has plenty of free firewood and someone home all day. Household B, both adults working long shifts, heats with electric baseboards. Which statement best explains the difference?",
      "Each household's approach fits its situation: A can supply the labour wood heat demands; B needs heat that looks after itself",
      ["Household B has chosen the approach that is always better in every situation, whatever the house",
       "Household A is using an approach that no longer exists in this province, because wood heat has been given up everywhere",
       "The two households are actually using the same approach to heating their homes"],
      "Wood heat is cheap where firewood is free, but it demands daily labour: cutting, carrying, stoking. Electric baseboards cost more to run but need no labour at all. Neither approach is best in the abstract; each fits the household's circumstances, which is the heart of comparing approaches.",
      {});
  }
]), ["Compare the households' situations, not just their appliances.", "Labour, cost, and who is home decide which approach fits."]);

/* ---------- SC7.5.5 Informed decisions about heating ---------- */
E("s7-u2-heating-adv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Which is a genuine advantage of heating a home with a heat pump, as the Heat Pumps module presents it?",
      "It moves heat rather than making it, so it delivers more heat energy than the electrical energy it uses",
      ["It needs no electricity to run at all, even on the coldest days of the winter",
       "It works without any equipment outside the house or anywhere else on the property",
       "It costs nothing to install, so any household can have one put in without paying anything"],
      "Because a heat pump moves existing heat instead of converting electricity directly into heat, the heat delivered to the house can exceed the electrical energy consumed. It does use electricity, it does need an outdoor unit, and its installation cost is one of its real disadvantages.",
      {});
  },
  function () {
    return mcq("Which is a genuine advantage of heating with wood, as the Heat Pumps module presents it?",
      "The fuel is renewable and, for households with their own woodlot, can be very cheap",
      ["It requires no labour at all once the stove has been installed in the house",
       "It carries no risk of fuel spills or of air pollution inside or outside the house",
       "It heats every room of the house evenly, from the basement to the attic"],
      "Wood regrows, and a household cutting its own pays mostly in labour rather than money, which is wood's great advantage. Its disadvantages are just as real: heavy labour, storage space, smoke, and heat concentrated near the stove.",
      {});
  }
]), ["Advantages here come from the module's own question sets.", "Every technology has a real advantage and a real disadvantage; test each claim against both."]);

E("s7-u2-heating-disadv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Which is a genuine disadvantage of heating with oil, as the Heat Pumps module presents it?",
      "The fuel must be delivered and stored in a tank, and a leak or spill can seriously damage soil and water",
      ["Oil furnaces cannot heat a whole house, only one or two rooms at a time",
       "Oil produces no greenhouse gases at all, which confuses buyers comparing heating fuels",
       "Oil tanks refill themselves automatically from the ground beneath the house"],
      "Oil's costs include delivery, storage and price swings, and its environmental risk is the spill: a leaking tank can contaminate soil and groundwater, an expensive disaster. Oil furnaces heat whole houses perfectly well, and burning oil does produce greenhouse gases.",
      {});
  },
  function () {
    return mcq("Which is a genuine disadvantage of electric baseboard heating, as the Heat Pumps module presents it?",
      "Turning electricity directly into heat is one of the most expensive ways to heat a house",
      ["Baseboards cannot be controlled room by room or turned down at night",
       "Baseboards need a fuel truck to visit the house every month of the year",
       "Baseboards produce smoke and soot inside the rooms they are heating"],
      "Baseboards are simple, cheap to install and controllable room by room, but every unit of heat costs a full unit of electricity, which makes running them expensive. They need no deliveries and produce no smoke; their weakness is running cost.",
      {});
  }
]), ["Disadvantages here also come from the module's question sets.", "Oil's weakness is storage and spills; electricity's weakness is running cost; wood's is labour."]);

E("s7-u2-cr-heating-decision", 2, ["SC7.5.5"], 3, "var", varset([
  function () {
    return textq("A family is building a house on a wooded lot outside a small town. Both adults work full time away from home. Money is tight this year, but they plan to stay in the house for decades. Choose a main heating technology for this family and defend your choice with advantages and disadvantages, using what you know about the technologies. (3 marks)",
      ["heat pump", "wood stove", "oil furnace", "electric"],
      "<b>Model answer:</b> A strong choice is an air-to-air heat pump, possibly with electric baseboards as backup. Advantages: it moves heat instead of making it, so running costs are low over the decades the family will stay; it needs no daily labour, which suits two adults working away from home; and it produces no on-site spills, smoke or fuel storage. Disadvantages to acknowledge: the installation cost is high in a year when money is tight, and on the coldest days its output drops, so a backup source is wise. A defended choice of wood (free fuel on a wooded lot, but heavy daily labour against the work schedule), oil, or electric could also earn full marks if its advantages and disadvantages are honestly weighed against this family's situation.<br><br><b>Marking points:</b> 1 mark for a clear choice; 1 mark for at least two genuine advantages tied to this family's situation (work schedule, time horizon, lot, budget); 1 mark for at least one genuine disadvantage of the chosen technology, honestly stated. Any technology can earn full marks; an answer claiming a technology has no disadvantages cannot earn the third mark.",
      {});
  }
]), ["There is no single right choice; the defence is what is marked.", "Weigh the family's situation, and name a real disadvantage of your own choice."]);

/* ---------- SC7.5.6 Improvements in heating over time ---------- */
E("s7-u2-improvement", 2, ["SC7.5.6"], 1, "var", varset([
  function () {
    return mcq("Which change is an improvement in home heating technology over time, of the kind this unit studies?",
      "The open fireplace giving way to the airtight wood stove, which burns wood more completely and sends less heat up the chimney",
      ["Houses being built with larger open fireplaces than before in every main room",
       "Families returning to heating one room only, as in the past, and closing off the rest of the house",
       "Furnaces being designed to need stoking by hand every hour of the day and night"],
      "Improvements make heating more efficient, safer, cleaner or less labour-intensive. The airtight stove controls its air supply, burns wood more completely and keeps more heat in the room than an open fireplace, which loses most of its heat up the chimney.",
      {});
  },
  function () {
    return mcq("What did the thermostat improve about home heating when it became common?",
      "It let the heating system switch itself on and off to hold a set temperature, ending the need to tend the furnace by hand around the clock",
      ["It made furnaces burn hotter than ever before, so houses could be kept much warmer",
       "It removed the need for fuel deliveries to the house altogether, in every season",
       "It allowed one furnace to heat several houses at once, sending heat through long pipes buried under the street between them"],
      "A thermostat senses the room temperature and switches the system on and off to hold the setting, using a bimetallic strip or an electronic sensor. That automation is the improvement: steady temperatures with far less labour and less wasted fuel.",
      {});
  }
]), ["An improvement makes heating more efficient, safer, cleaner or easier.", "Think fireplace to airtight stove, and hand-tending to thermostat control."]);

E("s7-u2-cr-improvement", 2, ["SC7.5.6"], 2, "var", varset([
  function () {
    return textq("Choose one home heating technology and explain how it improved over time, and what that improvement changed for the household using it. (2 marks)",
      ["airtight wood stove", "thermostat", "heat pump", "insulation"],
      "<b>Model answer:</b> Example: the wood stove. Early open fireplaces and simple stoves let most of their heat escape up the chimney and needed constant tending. The airtight wood stove sealed the firebox and let the user control the air supply, so wood burns more completely and slowly, more of its heat stays in the room, and one load can burn for hours. For the household, that meant less wood cut and carried, steadier heat, and fewer trips to the stove through the night. (Equally acceptable: furnace control by thermostat, or making heat giving way to moving heat with the heat pump, each with its change explained.)<br><br><b>Marking points:</b> 1 mark for a correct improvement in a named technology; 1 mark for what the improvement changed in practice for the household (efficiency, labour, cost, safety or comfort).",
      {});
  }
]), ["Name the technology, the improvement, and the difference it made at home.", "Efficiency, labour, cost, safety or comfort: the improvement must change one of them."]);

/* ---------- SC7.5.7 Evaporation, condensation and heat pumps ---------- */
E("s7-u2-pump-cycle", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("A heat pump's refrigerant carries heat from outside a house to inside. Which sequence of steps does the refrigerant follow?",
      "It evaporates at low pressure, absorbing heat outdoors; it is compressed; it condenses at high pressure indoors, releasing the heat; then it expands back through a valve",
      ["It condenses outdoors, releasing heat; it evaporates indoors, absorbing the house's heat; then it is stored in a tank until it is needed again",
       "It is compressed outdoors until it glows hot, then blown through ducts directly into the rooms of the house",
       "It freezes outside into a solid, is carried indoors, and melts there, releasing its heat into the rooms"],
      "The cycle runs on the two changes of state. At low pressure in the outdoor coil the refrigerant evaporates, and evaporation takes in heat, even from cold air. The compressor squeezes it, and at high pressure indoors it condenses, and condensation gives heat off into the house. The expansion valve drops its pressure and the cycle repeats.",
      {});
  }
]), ["The cycle is evaporation, compression, condensation, expansion.", "Evaporation absorbs heat; condensation releases it. Pressure decides where each happens."]);

E("s7-u2-pump-science", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Why does lowering the pressure on a liquid refrigerant make it evaporate more easily, and why does that matter to a heat pump?",
      "At low pressure the particles need less energy to escape as a gas, so the refrigerant can evaporate at a low temperature and absorb heat from cold outdoor air",
      ["Low pressure heats the refrigerant directly, boiling it with friction as it squeezes through the narrow valve",
       "At low pressure the refrigerant turns into a fuel and burns slowly in the outdoor coil, and that burning is what warms the house",
       "Low pressure removes most of the refrigerant's particles from the liquid, leaving room for heat to move in"],
      "Evaporation means particles escaping the liquid, and pressure pressing down on the liquid makes escape harder. Drop the pressure and the refrigerant boils at a much lower temperature, low enough to take heat from winter air. That is the same effect that makes a propane tank feel cold as gas escapes and the remaining liquid evaporates to replace it.",
      {});
  },
  function () {
    return mcq("A common objection is: 'There is no heat in -18 °C air for a heat pump to take.' Which reply is scientifically correct?",
      "Air at -18 °C still holds most of the heat energy it has at room temperature; heat exists in matter at every temperature above absolute zero",
      ["The objection is correct; heat pumps stop working completely once the air falls below 0 °C",
       "The heat pump makes up the difference by burning a small amount of fuel in a backup furnace inside the house",
       "Cold air contains a different kind of heat that only heat pumps can use, stored in a form other machines cannot reach"],
      "Heat is particle energy, and particles hold energy at every temperature above absolute zero. Air at -18 °C holds roughly 85 percent of the heat it holds at 21 °C, so there is plenty for the refrigerant to absorb, even though the pump works harder as the temperature falls.",
      {});
  }
]), ["Evaporation absorbs heat; pressure controls how easily a liquid evaporates.", "There is heat in cold air, because heat exists above absolute zero."]);

E("s7-u2-cr-pump-chain", 2, ["SC7.5.7"], 3, "var", varset([
  function () {
    return textq("Explain, step by step, how the scientific understanding of evaporation and condensation led to the heat pump as a way of heating a house. (3 marks)",
      ["evaporation absorbs heat", "condensation releases heat", "low pressure evaporates refrigerant", "compressor raises pressure"],
      "<b>Model answer:</b> Scientists understood two facts: when a liquid evaporates, it absorbs heat from its surroundings, and when a gas condenses, it releases heat. They also knew pressure controls both changes: a liquid under low pressure evaporates at a low temperature, and a gas under high pressure condenses readily. The heat pump chains the facts together. A refrigerant evaporates at low pressure in an outdoor coil, absorbing heat from the outside air. A compressor then squeezes the gas, and at high pressure in the indoor coil it condenses, releasing the absorbed heat into the house. An expansion valve drops the pressure again, and the cycle repeats, moving heat from outdoors to indoors.<br><br><b>Marking points:</b> 1 mark for evaporation absorbing heat and condensation releasing it; 1 mark for the role of pressure (low pressure for evaporating, high pressure for condensing); 1 mark for the chain applied to the house (heat absorbed outdoors, released indoors).",
      {});
  }
]), ["Two facts and one control: evaporation absorbs, condensation releases, pressure steers both.", "Finish the chain inside the house: absorbed outdoors, released indoors."]);

/* ---------- SC7.5.8 Insulating technologies ---------- */
E("s7-u2-insulator-examples", 2, ["SC7.5.8"], 1, "gen", function () {
  var cases = [
    { q: "Which of these is used as an insulator in the situation described?", key: "The trapped air in a puffy winter jacket, slowing heat loss from the body", d: ["The metal pot conducting heat from the stove to the soup inside it", "The copper wire carrying electric current to a heater in the next room", "The steel radiator giving off its heat to the air of the room"] },
    { q: "Which material is doing insulating work here?", key: "The fibreglass batts packed into an attic floor", d: ["The aluminum foil lining a roasting pan to spread heat", "The cast iron of a wood stove radiating heat", "The metal handle of a saucepan left on the stove"] },
    { q: "Which is an example of insulation, past or present?", key: "Sod walls on an early settler's house, trapping air and slowing heat loss", d: ["A steel bridge expanding in the heat on a hot summer day", "A black roof absorbing the Sun's heat through the whole afternoon", "A metal spoon warming up quickly in a bowl of hot soup"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "An insulator slows the transfer of heat. Trapped air is one of the best insulators, which is why puffy jackets, fibreglass batts (mostly trapped air) and sod walls all work. The distractors are conductors doing the opposite job: carrying or giving off heat.",
    {});
}, ["An insulator slows heat transfer; a conductor speeds it.", "Trapped air is the quiet star: jackets, fibreglass and sod all trap it."]);

E("s7-u2-insulation-past", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Builders in Atlantic Canada once packed straw, seaweed, sawdust and even newspaper into house foundations and walls. Why did such loose, ordinary materials insulate at all?",
      "They trap a great deal of air in their spaces, and trapped air is a poor conductor of heat",
      ["They generate a small amount of heat of their own as they slowly decay",
       "They reflect heat back into the house like mirrors on every side",
       "They absorb a great deal of water, and wet materials insulate best"],
      "None of those materials is a remarkable insulator by itself; what they share is structure. Packed loosely, they hold pockets of still air, and still air conducts heat very poorly, so the wall loses heat slowly. Modern fibreglass and foam work on the same principle.",
      {});
  }
]), ["The material matters less than what it traps.", "Still air is the insulator; the material is the trap."]);

E("s7-u2-thermos", 2, ["SC7.5.8"], 2, "var", varset([
  function () {
    return mcq("A thermos keeps a cold drink cold for hours. Its wall is a vacuum (almost no air) between two layers, with a shiny inner surface. Which transfer processes do these features fight?",
      "The vacuum blocks conduction and convection, which need matter; the shiny surface reflects radiation",
      ["The vacuum blocks radiation completely; the shiny surface blocks conduction and convection",
       "The vacuum absorbs heat from the drink; the shiny surface generates cold to replace it",
       "Both features work together to block convection and nothing else"],
      "Conduction and convection both need matter to move through, so a vacuum, with almost no particles, stops both. Radiation needs no matter, so the vacuum cannot stop it; the shiny surface handles radiation by reflecting it instead of absorbing it. A good thermos fights all three processes at once.",
      {});
  },
  function () {
    return mcq("In the Heat Transfer Design Challenge, a team must keep a refrigerated juice box within 5 °C of a control juice box's temperature for two hours. Which design choice best fits the science?",
      "Wrap the juice box in layers that trap air, like foam or crumpled paper inside a sealed container",
      ["Wrap the juice box in a single layer of aluminum foil pressed tightly to it on all sides",
       "Stand the juice box inside a metal can so heat can spread evenly around it",
       "Paint the juice box black so it absorbs as much warmth from the room as possible"],
      "Layers that trap air insulate, because still air is a poor conductor, and sealing the container stops convection currents from carrying heat in. A tight metal wrap conducts; a metal can spreads heat; a black surface absorbs radiant heat, the opposite of the goal.",
      {});
  }
]), ["Match each feature to the process it blocks.", "Vacuum stops the two processes that need matter; shine handles the one that does not."]);

/* ---------- SC7.5.9 Needs driving developments ---------- */
E("s7-u2-needs-tech", 2, ["SC7.5.9"], 1, "var", varset([
  function () {
    return mcq("Which pairing correctly matches a heat-related human need to the development it produced?",
      "Treating sprains and sports injuries led to instant cold packs and heat packs that work without a freezer or stove",
      ["Wanting warmer houses in winter led to the invention of the thermometer to measure them",
       "Needing to cook food over open fires led to the development of fibreglass insulation for houses",
       "Wanting to measure temperature exactly led to the invention of the heat pump for houses"],
      "Instant packs answer a medical need: cold or heat applied on the spot, anywhere, with no equipment. The other pairings scramble the unit's stories: thermometers answer a measuring need, insulation a housing need, and the heat pump an energy need.",
      {});
  }
]), ["Match the need to the development it actually drove.", "Medical need, packs; measuring need, thermometer; heating need, pump and insulation."]);

E("s7-u2-winter-clothing", 2, ["SC7.5.9"], 2, "var", varset([
  function () {
    return mcq("Fishers in this province once wore wool sweaters coated in linseed oil when working on cold water. What problem was the oil solving?",
      "Plain wool insulates well when dry but loses much of its insulating power when soaked; the oil shed water and kept the trapped air in the wool",
      ["The oil made the wool fibres produce their own heat, like a small stove worn next to the skin",
       "The oil made the sweater much heavier, so it would not blow off in the strong wind coming off the cold water where the boats worked",
       "The oil attracted heat out of the sea air and held it in the wool fibres for the whole working day on the water"],
      "Wool insulates by trapping air, and trapped air only works while it stays in place. Soaked wool loses its air to water and its insulation with it. An oil coating sheds the water, keeping the air trapped and the fisher warm. Modern technical fabrics solve the same problem with synthetic fibres and waterproof-breathable layers.",
      {});
  }
]), ["The sweater insulates by trapped air; water is the enemy of trapped air.", "Oil sheds water; modern fabrics do the same job with new materials."]);

/* ---------- SC7.5.10 Careers in heat and temperature ---------- */
E("s7-u2-career-match", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Which career's daily work most directly involves controlling high temperatures to shape metal?",
      "A blacksmith",
      ["A furnace service technician", "A health care worker", "A light bulb manufacturer"],
      "A blacksmith heats metal until it is soft enough to shape, judging and controlling its temperature throughout the work. The other careers in the guide's list work with heat too: the furnace technician services heating systems, health care workers manage patients' temperatures and therapies, and light bulb manufacture involves heating glass and filaments.",
      {});
  },
  function () {
    return mcq("A homeowner's furnace stops working in January. Which career from this unit's list is called, and why?",
      "A furnace service technician, who installs, maintains and repairs heating systems",
      ["A blacksmith, who works with a forge furnace for shaping hot metal",
       "A health care worker, who deals with medical emergencies of every kind",
       "A light bulb manufacturer, who makes small parts that fit inside the furnace"],
      "Furnace service technicians are the heating-system specialists: they install, maintain and repair furnaces and heat pumps, which is exactly the January problem. The blacksmith's furnace is a forge for shaping metal, not a home heating system.",
      {});
  }
]), ["The guide names four careers; match each to its heat work.", "Shaping metal, servicing furnaces, caring for patients, making bulbs."]);

E("s7-u2-career-scenario", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("At work, this person checks patients' temperatures, uses warming blankets for patients who cannot hold their body heat, and applies cold packs to injuries. Which career is it?",
      "A health care worker",
      ["A furnace service technician", "A blacksmith", "A light bulb manufacturer"],
      "Managing the body's temperature is part of health care work: measuring it, warming patients who are losing heat, and cooling injuries with packs. That combination of temperature tasks belongs to health care workers in the guide's careers list.",
      {});
  },
  function () {
    return mcq("At work, this person heats glass until it softens, shapes it, and seals a filament inside so it can glow at a very high temperature without burning out. Which career is it?",
      "A light bulb manufacturer",
      ["A blacksmith", "A furnace service technician", "A health care worker"],
      "Light bulb manufacture is heat work: glass must be heated and shaped, and the filament inside runs extremely hot, protected from the air by the sealed bulb. The guide lists light bulb manufacturers among the careers built on heat and temperature.",
      {});
  }
]), ["Picture the working day described, then match it to the guide's four careers.", "Body temperature and packs point one way; hot glass and filaments point another."]);

/* ---------- SC7.6.1 Construct and test a thermometer ---------- */
E("s7-u2-thermometer-build", 2, ["SC7.6.1"], 1, "var", varset([
  function () {
    return mcq("A class is building air thermometers like the guide describes: a flask of air connected to a tube with a drop of coloured water in it. What makes the drop of water move when the flask warms?",
      "The air inside expands as it warms and pushes the drop along the tube",
      ["The coloured water boils and its vapour pushes the drop",
       "The glass flask contracts and squeezes the air out",
       "The drop evaporates and re-forms farther along the tube"],
      "The flask holds air, and air expands when warmed. The expanding air pushes the water drop along the tube, so the drop's position shows the temperature change. Marking the drop's positions against known temperatures is what turns the device into a thermometer.",
      {});
  }
]), ["The flask holds air; warming air expands.", "Expansion pushes the drop; its position becomes the reading."]);

E("s7-u2-calibrate", 2, ["SC7.6.1"], 2, "var", varset([
  function () {
    return mcq("To calibrate a homemade thermometer, a student marks the liquid level with the thermometer in melting ice water, then in boiling water. What should the student do next to finish the scale?",
      "Label the two marks 0 °C and 100 °C and divide the space between them into 100 equal parts",
      ["Label the marks 0 °C and 100 °C and leave the space between unmarked",
       "Mark every place the liquid stops during the day and average them",
       "Label the ice mark 100 °C and the boiling mark 0 °C, since the liquid rises when cold"],
      "Calibration fixes the scale to two known temperatures: melting ice at 0 °C and boiling water at 100 °C. Dividing the interval evenly gives every degree its place, so any later reading can be read off the scale. Without the divisions, only the two end points mean anything.",
      {});
  }
]), ["Two fixed points first: melting ice and boiling water.", "Then divide the space between them evenly."]);

E("s7-u2-thermometer-test", 2, ["SC7.6.1"], 3, "var", varset([
  function () {
    return mcq("A team built and calibrated an air thermometer and now tests it. Their plan: put their thermometer in three beakers (ice water, room-temperature water, warm water), read it, and also read a known-accurate thermometer in the same beakers at the same times. What makes this a sound test of their instrument?",
      "Their thermometer is compared against a trusted one, in the same substances, at the same times, across a range of temperatures",
      ["Their thermometer is tested in the warmest beaker only, where it matters most",
       "Their thermometer is read first and the trusted one an hour later, so the readings cannot influence each other",
       "The test uses three beakers, and three is always enough"],
      "A test of an instrument is a comparison: same substances, same times, a trusted standard, and a range wide enough to expose error anywhere on the scale. Testing one temperature, or at different times when the water has cooled, could hide a faulty scale.",
      {});
  }
]), ["A test compares: same substances, same times, trusted standard, wide range.", "Ask what could hide an error: one temperature, or readings taken at different times."]);

/* ---------- SC7.6.2 Display thermometer test data ---------- */
E("s7-u2-thermometer-data", 2, ["SC7.6.2"], 1, "var", varset([
  function () {
    return mcq("A team has five test results: their thermometer's reading and a reference thermometer's reading for each of five water baths. Which display shows the comparison most clearly?",
      "A table with one row per bath and two columns, one for each thermometer's reading",
      ["A paragraph describing each bath in the order tested",
       "A bar graph of the bath temperatures with the team's readings left out",
       "A list of the team's readings only, sorted from lowest to highest"],
      "The point of the test is the comparison, so the display must put the two readings side by side for each bath: rows for baths, paired columns for the two thermometers. Any display that drops one thermometer's readings hides exactly what the test was for.",
      {});
  }
]), ["The test is a comparison; the display must keep the two readings together.", "Rows for baths, paired columns for the two thermometers."]);

E("s7-u2-cr-thermometer-display", 2, ["SC7.6.2"], 2, "var", varset([
  function () {
    return textq("A team tested their homemade thermometer against a reference thermometer. Their notebook lists: ice water, ours 1, reference 0; cool water, ours 19, reference 20; room water, ours 24, reference 23; warm water, ours 41, reference 40; hot water, ours 63, reference 60. Organize these results into a table, and state what the display shows about their thermometer. (2 marks)",
      ["table with both readings", "readings within a few degrees", "close to the reference"],
      "<b>Model answer:</b> Table (title: Homemade thermometer test results, temperatures in °C): Bath | Homemade | Reference. Ice water | 1 | 0. Cool water | 19 | 20. Room water | 24 | 23. Warm water | 41 | 40. Hot water | 63 | 60. The display shows the homemade thermometer reads within 1 °C of the reference at the low end and drifts to 3 °C high at the hot end: it is accurate for cool water and slightly over-reads as temperatures rise.<br><br><b>Marking points:</b> 1 mark for a titled table with one row per bath and both readings in paired columns; 1 mark for a correct statement of what the comparison shows (close at low temperatures, reading high by the hot end).",
      {});
  }
]), ["Build the table first: one row per bath, both readings side by side.", "Then read the pattern: where is it close, and where does it drift?"]);

/* ---------- SC7.6.3 Hypothesis, variables, conclusion ---------- */
E("s7-u2-variables-plateau", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("In The Plateau Problem, students heated ice water and recorded its temperature every 3 minutes as it melted and then boiled. Which variable naming is correct?",
      "Time is the independent variable; the water's temperature is the dependent variable",
      ["Temperature is the independent variable; time is the dependent variable",
       "The amount of ice is the dependent variable; the hot plate setting is the independent variable",
       "Time and temperature are both dependent variables"],
      "The experimenters chose when to measure: time is what they controlled, the independent variable. The temperature is what responded and was recorded, the dependent variable. The laboratory sheet itself names them this way: temperature depends on time.",
      {});
  }
]), ["What did the experimenters set, and what did they record?", "Time was set by the measurers; temperature responded."]);

E("s7-u2-hypothesis-form", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("A student asks: 'What happens to the temperature of ice water while the ice is melting?' Which is a proper testable hypothesis for this question?",
      "The temperature will stay the same while the ice melts, because the energy goes into breaking the ice's structure rather than warming the water",
      ["Melting is an interesting process that has fascinated scientists and students for centuries in many countries",
       "The temperature will do something unexpected at some point during the melting of the ice",
       "Ice melts at 0 °C because that is its melting point, listed in every table of melting points for common substances"],
      "A hypothesis is a prediction the experiment can test, with a reason attached: here, a flat temperature during melting, explained by energy going into the change of state. The other options are a topic sentence, a prediction too vague to test, and a fact restated rather than a prediction about the experiment.",
      {});
  }
]), ["A hypothesis predicts a result and gives a reason the data can judge.", "Too vague to test is the flaw in one option; a restated fact is the flaw in another."]);

E("s7-u2-experiment-chain", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return mcq("A team investigated whether a black or a white can warms faster under a lamp. Their write-up says: 'Hypothesis: the black can will warm faster. We filled the black can with 200 mL of oil and the white can with 100 mL, put both under the lamp, and measured after 15 minutes. The black can was warmer, so our hypothesis was correct.' What is the serious flaw in this chain?",
      "The amounts of oil differed, so the colour was not the only difference between the cans; the conclusion cannot be trusted",
      ["The hypothesis was stated before the experiment began, which is when hypotheses are supposed to be stated",
       "The team measured the temperatures only once, at the end of 15 minutes of heating",
       "The team used oil instead of water in the cans for the whole investigation"],
      "A fair test changes one variable at a time. With 200 mL in one can and 100 mL in the other, the smaller amount would warm faster whatever its colour, so the warmer can proves nothing about colour. Stating the hypothesis first is correct practice, and single end measurements and oil are both workable choices.",
      {});
  }
]), ["Check the chain link by link: hypothesis, variables, procedure, conclusion.", "A conclusion is only as good as the controls behind it."]);

E("s7-u2-cr-inquiry", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return textq("A student's hypothesis for The Plateau Problem was: 'The temperature of the water will keep rising steadily the whole time it is heated, including while the ice melts.' Her results: the temperature stayed at 0 °C for the first 12 minutes while ice was present, then rose steadily to 100 °C, then stayed at 100 °C while the water boiled. State a conclusion from these results and explain how it stands against her hypothesis. (3 marks)",
      ["conclusion: temperature stays constant during changes of state", "hypothesis refuted during melting and boiling", "temperature rises only between changes of state"],
      "<b>Model answer:</b> Conclusion: while a substance is changing state, its temperature stays constant; it rises only when no change of state is happening. The results refute the hypothesis for the melting and boiling periods, where the temperature held at 0 °C and 100 °C instead of rising steadily, and support it only for the period between the two changes, when the temperature did rise steadily.<br><br><b>Marking points:</b> 1 mark for a conclusion naming the constant temperature during changes of state; 1 mark for the hypothesis judged refuted (not supported) for the melting and boiling periods; 1 mark for the data cited in support (0 °C held while ice was present, 100 °C held while boiling).",
      {});
  }
]), ["State the conclusion the data carry, then judge the hypothesis against it.", "Refuted where the temperature held; supported only where it rose."]);

/* ---------- SC7.6.4 Tools used accurately and safely (CORE) ---------- */
// CORE residue: the bank covers choosing safe handling and accurate
// measurement practice. The residue is the using itself: handling a hot
// plate and kettle, and reading a thermometer in a live investigation.
E("s7-u2-tools-safety", 2, ["SC7.6.4"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe one when heating water for a class investigation?",
      "Use a hot plate or kettle as directed, keep the cord and water apart from the edge of the bench, and treat every heated container as hot",
      ["Carry a full beaker of just-boiled water across the crowded room to your bench when you are ready for it in class",
       "Lean over the container of hot water to watch the thermometer reading inside it more closely",
       "Leave the hot plate switched on and unattended while you leave to get more materials"],
      "Heating investigations combine hot water, glassware and electricity. Working at the bench, keeping water and cords managed, and assuming heated containers are hot prevents the common injuries. Carrying boiling water, leaning over steam, and leaving a hot plate unattended are the accident patterns.",
      {});
  },
  function () {
    return mcq("A thermometer breaks during an investigation. Which response is correct?",
      "Tell the teacher and keep clear of the spill; school thermometers contain alcohol, and cleanup follows the teacher's directions",
      ["Pick up the glass quickly with bare hands and carry it to the bin before someone steps on it in the classroom",
       "Sweep the spill and the glass under the bench so the investigation can continue without delay",
       "Wash the spilled liquid down the sink with plenty of water without mentioning it to anyone"],
      "Broken glass and spilled liquid are a teacher-managed cleanup: bare hands on glass and hidden spills injure other people. School thermometers use alcohol rather than mercury, which is safer, but the spill and glass still need proper handling.",
      {});
  }
]), ["Hot water, glass and electricity meet in these investigations; plan for all three.", "Broken glass is never a bare-hands job."]);

E("s7-u2-tools-accurate", 2, ["SC7.6.4"], 2, "var", varset([
  function () {
    return mcq("A team records a different temperature every time they check the same beaker of warm water. Which change most improves the accuracy of their readings?",
      "Stir the water gently, keep the bulb off the beaker's bottom, and wait for the column to settle before reading at eye level",
      ["Read the thermometer as quickly as possible each time, before the column has settled",
       "Use a different thermometer for each reading and average the three readings together",
       "Hold the thermometer near the top of the water only, just under the surface, for every reading the team takes"],
      "Uneven temperatures in the beaker, a bulb touching hot glass, and reading a still-moving column all produce scattered readings. Stirring evens the water out, keeping the bulb in the liquid (not on the bottom) measures the water, and waiting for the column to settle, then reading at eye level, measures it the same way every time.",
      {});
  }
]), ["Scatter in readings usually has a physical cause: uneven water, a touching bulb, a moving column.", "Stir, suspend the bulb, wait, and read at eye level."]);

/* ---------- SC7.6.5 Display data in tables and graphs ---------- */
E("s7-u2-table-build", 2, ["SC7.6.5"], 1, "var", varset([
  function () {
    return mcq("Which table correctly organizes The Plateau Problem's data, where temperature was recorded every 3 minutes during melting and again during boiling?",
      "A table with a time column (0, 3, 6, 9... minutes) and two temperature columns, one for the melting run and one for the boiling run",
      ["A table with one row listing every temperature in the order the student happens to remember them afterward",
       "A table with temperatures down the side and the names of the group members across the top instead",
       "A table with a single column of temperatures and no times recorded beside any of them"],
      "The data are temperatures measured at times, in two runs. The table needs the independent variable (time) and a column for each run's temperatures so the two plateaus can be compared. Times are essential: without them, the plateaus cannot be seen at all.",
      {});
  }
]), ["The table must keep time with temperature, for both runs.", "No times, no plateaus: the display would hide the result."]);

E("s7-u2-graph-choice", 2, ["SC7.6.5"], 3, "gen", function () {
  var cases = [
    { sub: "a waxy solid", melt: -10, boil: 55, yMax: 80 },
    { sub: "a crystalline solid", melt: 5, boil: 78, yMax: 100 },
    { sub: "a powdered solid", melt: 18, boil: 96, yMax: 120 },
    { sub: "a metallic solid", melt: -4, boil: 64, yMax: 90 }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows " + c.sub + " being heated steadily until it has all boiled. At what temperatures does it melt and boil?",
    "It melts at " + c.melt + " °C and boils at " + c.boil + " °C",
    ["It melts at " + c.boil + " °C and boils at " + c.melt + " °C",
     "It melts at 0 °C and boils at 100 °C, like every substance",
     "It melts at " + c.melt + " °C and boils at " + (c.boil + 20) + " °C"],
    "Changes of state happen along the plateaus, where the temperature holds steady. The first plateau sits at " + c.melt + " °C, so that is the melting temperature; the second sits at " + c.boil + " °C, the boiling temperature. Only water melts at 0 °C and boils at 100 °C; every substance has its own pair of values.",
    {});
  q.figure = s7HeatingCurveSVG(c.melt, c.boil, 30, c.yMax);
  return q;
}, ["Find the two flat sections and read their heights off the temperature axis.", "First plateau is melting, second is boiling; only water is 0 and 100."]);

E("s7-u2-cr-display", 2, ["SC7.6.5", "SC7.6.8"], 2, "var", varset([
  function () {
    return textq("A student heated a beaker of ice water and recorded: 0 min, 0 °C; 3 min, 0 °C; 6 min, 0 °C; 9 min, 12 °C; 12 min, 31 °C; 15 min, 55 °C; 18 min, 82 °C; 21 min, 100 °C; 24 min, 100 °C; 27 min, 100 °C. Organize these results into a table, and state the two plateau temperatures the table shows and what each plateau means. (3 marks)",
      ["table of time and temperature", "plateau at 0 while melting", "plateau at 100 while boiling"],
      "<b>Model answer:</b> Table (title: Temperature of heated ice water over time): Time (min) | Temperature (°C). 0 | 0. 3 | 0. 6 | 0. 9 | 12. 12 | 31. 15 | 55. 18 | 82. 21 | 100. 24 | 100. 27 | 100. The first plateau is at 0 °C for the first 6 minutes: the ice was melting, and the temperature held steady during the change of state. The second plateau is at 100 °C from 21 minutes on: the water was boiling, and the temperature again held steady during the change of state.<br><br><b>Marking points:</b> 1 mark for a titled table with all ten time and temperature pairs in order; 1 mark for the 0 °C plateau identified as melting; 1 mark for the 100 °C plateau identified as boiling.",
      {});
  }
]), ["Table first, with a title and both columns complete.", "Then read the flat stretches: steady temperature means a change of state."]);

/* ---------- SC7.6.6 Design an experiment ---------- */
E("s7-u2-design-absorb", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("In Absorb That Energy, two cans of oil stood under one lamp: one can dark, one light. The investigation's hypothesis had two parts. Which set of design features matches the investigation?",
      "Compared: the cans' surfaces. Kept the same: the amount of oil, the lamp, and the distance. Measured: the oil temperature every 5 minutes",
      ["Compared: the amounts of oil. Kept the same: the cans' colours. Measured: the lamp's temperature",
       "Compared: two different lamps. Kept the same: the temperature readings. Measured: the colour of the oil",
       "Compared: oil against water. Kept the same: nothing, to keep it realistic. Measured: which can felt warmer"],
      "The investigation asks whether colour and finish affect absorption, so surface is the variable that changes; amount of oil, lamp and distance are controlled so the comparison is fair; and temperature, taken at regular times, is the measurement. The two-part hypothesis covers colour (dark against light) and finish (shiny against dull).",
      {});
  }
]), ["Name what changed, what was held, and what was measured.", "One variable changes; everything else that could matter is held the same."]);

E("s7-u2-design-challenge", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("In the Heat Transfer Design Challenge, every team insulates a juice box and compares it with an uninsulated control juice box taken from the same refrigerator. Why is the control box essential to the design?",
      "It shows how much an uninsulated box warms in the same conditions, so a team's result measures their insulation and not just the room",
      ["It gives the team a spare juice box to use if their insulated box leaks or is damaged during the two hours of the test",
       "It keeps the refrigerator at a steady temperature while the test is running",
       "It proves that all juice boxes taken from a refrigerator start out at exactly the same temperature"],
      "Rooms differ and afternoons warm up; without a control, a team cannot tell whether their box stayed cold because of their design or because the room was cool. The control warms under the same conditions with no insulation, so the difference between the two boxes is the design's effect.",
      {});
  }
]), ["A result means little without the comparison case.", "The control shows what happens with no treatment, in the same conditions."]);

E("s7-u2-cr-design-test", 2, ["SC7.6.6"], 3, "var", varset([
  function () {
    return textq("A school wants to know which of three wrapping materials (bubble wrap, newspaper, or a wool blanket) best keeps a hot drink hot during a winter bus ride. Design a fair test to find out. State the question your test answers, your hypothesis, the variables you will change, keep the same, and measure, and the procedure you will follow. This design question is for practice and teacher-picked sets; it does not appear in composed unit tests. (4 marks)",
      ["hypothesis naming a material", "same drink volume and starting temperature", "temperature measured at set times", "control cup with no wrapping"],
      "<b>Model answer:</b> Question: which wrapping material keeps a hot drink hottest over the time of a bus ride? Hypothesis: the wool blanket will keep the drink hottest, because its fibres trap the most air, and trapped air insulates. Changed variable: the wrapping material (bubble wrap, newspaper, wool blanket, and one unwrapped control cup). Kept the same: the cups, the drink, the volume in each cup, the starting temperature, the room, and the measuring schedule. Measured variable: the drink temperature in each cup every 10 minutes for an hour. Procedure: fill all four cups at the same time from the same kettle, wrap three as designed, leave one unwrapped, place all four side by side, record temperatures on schedule, and compare the temperature drops; repeat once to check the result.<br><br><b>Marking points:</b> 1 mark for a testable question and a hypothesis with a reason; 1 mark for the changed variable (wrapping material) with an unwrapped control; 1 mark for at least three factors kept the same (cups, volume, starting temperature, place, schedule); 1 mark for a measurement plan (temperature at set times over a set period) that would let the materials be ranked.",
      {});
  }
]), ["Question, hypothesis with a reason, one changed variable, controls, and a measuring plan.", "Do not forget the unwrapped control cup."]);

/* ---------- SC7.6.7 Apparatus used safely (CORE) ---------- */
// CORE residue: the bank covers recognizing safe set-up and practice
// around hot liquids, lamps and glassware. The residue is carrying out
// the procedure with the apparatus in hand.
E("s7-u2-apparatus-safety", 2, ["SC7.6.7"], 1, "var", varset([
  function () {
    return mcq("In Absorb That Energy, the apparatus includes a 100 W lamp, cans of oil, glassware and thermometers. Which set-up is the safe one?",
      "The lamp is clamped steady, cords are kept away from the oil and water, and the hot lamp is treated as hot even after it is switched off",
      ["The lamp rests loosely on the edge of the bench so anyone can aim it by hand at any point during the run",
       "The cans of oil are filled right up to the brim so that no oil can possibly slosh out during the whole run",
       "The thermometers are laid across the hot lamp before the run to warm them up faster"],
      "A 100 W lamp is a burn and electrical hazard: it must be secured, kept clear of liquids and cords, and treated as hot after use. Loose lamps fall, brim-full cans spill hot oil, and nothing belongs on the lamp itself.",
      {});
  }
]), ["The lamp is the hazard to plan around: secure it, keep liquids and cords clear.", "A switched-off lamp is still a hot lamp."]);

E("s7-u2-apparatus-choice", 2, ["SC7.6.7"], 2, "var", varset([
  function () {
    return mcq("A team's Absorb That Energy readings jump around between minutes. Their thermometer is pushed through a hole in the can's lid so its bulb touches the can's metal side. What should they fix?",
      "Reposition the thermometer so its bulb sits in the oil, not touching the can, and seal the lid hole so heat does not escape",
      ["Read the thermometer much faster each time, before its reading has a chance to change at all",
       "Use a bigger, more powerful lamp so the temperature of the oil changes more quickly",
       "Stir the oil with the thermometer while it is still plugged through the hole in the lid of the can"],
      "A bulb touching the metal reads the can's temperature, not the oil's, and the can responds to the lamp faster and unevenly. The bulb belongs in the oil, clear of the sides, and the plasticine seal around the lid keeps heat in and the thermometer steady, which is part of the laboratory's own set-up.",
      {});
  }
]), ["Ask what the thermometer is actually touching.", "The bulb belongs in the oil, clear of the can, with the lid sealed."]);

/* ---------- SC7.6.8 Display data using tables and graphs ---------- */
E("s7-u2-graph-key", 2, ["SC7.6.8"], 1, "var", varset([
  function () {
    return mcq("A student graphs both cans' temperatures from Absorb That Energy on one set of axes. What must the graph include so a reader can use it?",
      "A title, labelled axes with units, and a key telling which line is which can",
      ["A paragraph under the graph explaining every reading",
       "The two lines drawn in the same colour so they can be compared",
       "Only the final temperatures, since those decide the conclusion"],
      "A two-line graph is read by matching lines to cans, which needs a key, and by reading values off the axes, which need labels and units. A title states what the display shows. Same-colour lines and dropped data both destroy the comparison the graph exists to make.",
      {});
  }
]), ["Two lines need a key; values need labelled axes with units.", "A display that hides which line is which has failed at its job."]);

E("s7-u2-display-absorb", 2, ["SC7.6.8", "SC7.6.5"], 3, "var", varset([
  function () {
    var q = mcq("The graph shows the two cans from Absorb That Energy. At the 15-minute mark the lamp is switched off. Which statement is best supported?",
      "At 15 minutes the dark can is about 10 °C warmer, and because good absorbers are also good emitters, the dark can should also cool faster once the lamp is off",
      ["At 15 minutes the light can is warmer than the dark can, and because it warmed faster it will also cool faster once the lamp is off",
       "The two cans have reached exactly the same temperature as each other at the 15-minute mark",
       "The dark can will stay warmer than the light can forever, even long after the lamp is switched off"],
      "Reading the lines at 15 minutes: the dark can is near 43 °C and the light can near 33 °C, a difference of about 10 °C. The laboratory's analysis adds the emission principle: surfaces that absorb well also emit well, so the dark can gives its heat away faster and cools faster in the dark. Nothing supports forever; both cans return to room temperature.",
      {});
    q.figure = s7AbsorbGraphSVG([0, 5, 10, 15], [22, 30, 37, 43], [22, 26, 30, 33]);
    return q;
  }
]), ["Read both lines at 15 minutes and subtract.", "Then use the emission principle: good absorbers are good emitters."]);

/* ---------- SC7.6.9 Conclusions from data ---------- */
E("s7-u2-conclusion-support", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("In The Plateau Problem, a class's graph shows the temperature holding at 0 °C while ice melts, rising steadily, then holding at 100 °C while the water boils. Which conclusion do these data support?",
      "While a substance changes state, its temperature stays constant; the added energy goes into the change of state itself",
      ["A thermometer cannot measure temperature properly while a substance is in the middle of changing state",
       "Ice melts and water boils at one and the same temperature on the graph",
       "Heating a substance always raises its temperature steadily from start to finish"],
      "The two plateaus are the data's message: during melting and boiling, added energy does the work of changing state instead of raising temperature. The thermometer worked throughout, the two changes happen at different temperatures, and the steady-rise claim is exactly what the plateaus disprove.",
      {});
  }
]), ["The plateaus are the evidence; the conclusion must be about them.", "Constant temperature during a change of state is what the data show."]);

E("s7-u2-conclusion-refute", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Before the investigation, a student predicted the dark can and the light can would warm at the same rate, 'because the lamp shines on both equally.' The data show the dark can 10 °C warmer after 15 minutes. What should the student conclude?",
      "The prediction is refuted: equal shining is not equal absorbing, and the dark surface absorbed more of the lamp's radiant heat",
      ["The prediction is supported, because both cans did warm up under the lamp",
       "The data must be wrong, because the lamp shone equally on both cans the whole time",
       "Nothing at all can be concluded until the whole test is done over again with water instead of oil in both cans"],
      "A conclusion judges the prediction against the data. Both cans received the same radiation, but absorption depends on the surface, and the 10 °C gap shows the dark surface absorbed more. The prediction is refuted, and the data, not the prediction, carry the conclusion.",
      {});
  }
]), ["Judge the prediction against the numbers, not against the intention.", "Equal shining is not equal absorbing."]);

E("s7-u2-cr-conclusion", 2, ["SC7.6.9"], 3, "var", varset([
  function () {
    return textq("In Absorb That Energy, a team's hypothesis was: 'The dark can will warm faster than the light can, and the dull can will warm faster than the shiny can.' Their results after 15 minutes under the lamp: dark dull can, 43 °C; light shiny can, 33 °C; light dull can, 38 °C. State a conclusion and explain how the data support or refute each part of the hypothesis. (3 marks)",
      ["dark warmed faster, supported", "dull warmed faster, supported", "both parts supported by the data"],
      "<b>Model answer:</b> Both parts of the hypothesis are supported. For colour: the dark dull can reached 43 °C against the light dull can's 38 °C, so with finish held the same, the dark surface warmed faster. For finish: the light dull can reached 38 °C against the light shiny can's 33 °C, so with colour held the same, the dull surface warmed faster. Conclusion: dark and dull surfaces absorb radiant heat better than light and shiny ones.<br><br><b>Marking points:</b> 1 mark for the colour comparison made fairly (dark dull against light dull) with its verdict; 1 mark for the finish comparison made fairly (light dull against light shiny) with its verdict; 1 mark for an overall conclusion naming dark and dull surfaces as the better absorbers.",
      {});
  }
]), ["Compare fairly: hold one feature the same in each comparison.", "Colour is judged between the two dull cans; finish between the two light cans."]);

/* Practice-only entries: the design-an-investigation CR is excluded from
   composed unit tests by the composer's noCompose flag (v1.2.0). It stays
   available in practice draws and explicit teacher picks. */
var NO_COMPOSE_U2 = {
  "s7-u2-cr-design-test": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC7.4.2, SC7.4.6, SC7.6.7, and CR entries closing Unit 2
   Test 1 (3 marks, Level 2, SC7.4.1) and Unit 2 Test 3 (2 marks,
   Level 2, SC7.4.6). SME-flagged. */

E("s7-u2-temp-compare-samples", 2, ["SC7.4.2"], 2, "gen", function () {
  var subs = ["water in a beaker", "sand in a tray", "air in a balloon", "oil in a pan"];
  var s = pick(subs);
  var t1 = pick([10, 15, 20, 25]), t2 = t1 + pick([15, 20, 30, 40]);
  var mode = ri(0, 1);
  if (mode === 0) {
    return mcq("Two samples of " + s + " are at " + t1 + " \u00B0C and " + t2 + " \u00B0C. According to the particle theory, how do their particles compare?",
      "The particles of the " + t2 + " \u00B0C sample have a greater average kinetic energy and move faster on average",
      ["The particles of the " + t2 + " \u00B0C sample are larger in size than the particles of the other, cooler sample", "The particles of the " + t1 + " \u00B0C sample move faster on average than those of the warmer sample", "Both samples' particles have exactly the same average kinetic energy at the two temperatures"],
      "Temperature measures the average kinetic energy of the particles. The warmer sample's particles move faster on average; the particles themselves do not change size. <b>The particles of the " + t2 + " \u00B0C sample have a greater average kinetic energy and move faster on average</b>.", { t1: t1, t2: t2 });
  }
  return mcq("A sample of " + s + " is cooled from " + t2 + " \u00B0C to " + t1 + " \u00B0C. What happens to its particles, according to the particle theory?",
    "Their average kinetic energy decreases, so they move more slowly on average than before",
    ["Their average kinetic energy increases, so they move faster on average than before", "The particles shrink in size until they stop moving completely at the lower temperature", "The particles themselves get steadily smaller and lighter as the sample loses more and more of its heat"],
    "Cooling lowers the temperature, and temperature is the average kinetic energy of the particles: they move more slowly on average, but they do not shrink or stop. <b>Their average kinetic energy decreases, so they move more slowly on average than before</b>.", { t1: t1, t2: t2 });
}, ["Temperature compares average particle energy; subtract to find the difference.", "The bigger reading is the warmer sample, and the gap is the second minus the first."]);

E("s7-u2-absorb-predict", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return mcq("Two identical cans, one painted matte black and one painted shiny silver, are left in the sun with equal amounts of water inside. What is the correct prediction?",
      "The water in the matte black can warms faster, because dark, dull surfaces absorb radiant heat better",
      ["The water in the shiny silver can warms faster than the other, because shiny surfaces absorb radiant heat better", "Both cans warm at exactly the same rate all morning, because the two cans are the same size", "Neither can warms at all in the sun, because the paint blocks every bit of radiant heat"],
      "Dark, dull surfaces absorb radiant heat better than light, shiny surfaces, which reflect more of it. <b>The water in the matte black can warms faster, because dark, dull surfaces absorb radiant heat better</b>.", {});
  },
  function () {
    return mcq("A dark asphalt driveway and a light concrete sidewalk lie side by side on a sunny afternoon. What is the correct prediction?",
      "The asphalt becomes hotter than the concrete, because its dark surface absorbs more radiant heat",
      ["The concrete becomes hotter than the asphalt does, because light surfaces absorb more radiant heat than dark ones", "Both surfaces reach exactly the same temperature and stay there all afternoon long", "The asphalt stays cooler than the concrete, because dark surfaces reflect radiant heat away"],
      "Dark surfaces absorb more radiant heat than light surfaces. <b>The asphalt becomes hotter than the concrete, because its dark surface absorbs more radiant heat</b>.", {});
  },
  function () {
    return mcq("A gardener covers one soil bed with black plastic and another with clear plastic on a sunny morning. What is the correct prediction?",
      "The soil under the black plastic warms faster, because the black surface absorbs more radiant heat",
      ["The soil under the clear plastic warms faster than the other bed, because clear surfaces absorb the most radiant heat", "Both beds warm at exactly the same rate, because the two plastics are the same thickness", "Neither bed warms at all that morning, because plastic stops radiant heat completely"],
      "The black surface absorbs more of the sun's radiant heat and passes the energy to the soil. <b>The soil under the black plastic warms faster, because the black surface absorbs more radiant heat</b>.", {});
  },
  function () {
    return mcq("Two car roofs, one white and one dark blue, are parked in full sun for an hour. What is the correct prediction?",
      "The dark blue roof becomes hotter, because dark surfaces absorb radiant heat better than light ones",
      ["The white roof becomes hotter than the dark one, because light surfaces absorb radiant heat better than dark ones", "Both roofs reach exactly the same temperature after an hour in the full sun", "The white roof becomes hotter, because it reflects the heat back onto itself"],
      "Dark surfaces are the better absorbers of radiant heat. <b>The dark blue roof becomes hotter, because dark surfaces absorb radiant heat better than light ones</b>.", {});
  },
  function () {
    return mcq("A solar water heater panel is painted dull black in one design and polished chrome in another. What is the correct prediction?",
      "The dull black panel heats its water faster, because dull dark surfaces are the better absorbers of radiant heat",
      ["The polished chrome panel heats its water faster than the black one, because shiny surfaces absorb radiant heat best", "Both panels heat their water at exactly the same rate, because they are the same size and shape", "Neither panel can heat water at all, because paint and chrome both block radiant heat fully"],
      "Dull dark surfaces absorb radiant heat best; polished surfaces reflect most of it away. <b>The dull black panel heats its water faster, because dull dark surfaces are the better absorbers of radiant heat</b>.", {});
  },
  function () {
    return mcq("Snow melts sooner around the dark trunk of a tree than on the open white field beside it. What is the correct explanation?",
      "The dark trunk absorbs more radiant heat than the snow and warms the snow that touches it",
      ["The white snow absorbs more radiant heat than the trunk does and melts itself from below over the afternoon", "The trunk reflects radiant heat onto the snow from a distance all afternoon long", "Radiant heat has nothing at all to do with the pattern of melting around the tree"],
      "The dark trunk is the better absorber, so it warms up and melts the snow in contact with it first. <b>The dark trunk absorbs more radiant heat than the snow and warms the snow that touches it</b>.", {});
  }
]), ["Dark and dull surfaces absorb more radiation than pale and shiny ones.", "A good absorber is also a good emitter when the object is the hot one."]);

E("s7-u2-safety-scenario", 2, ["SC7.6.7"], 1, "var", varset([
  function () {
    return mcq("A student is heating a test tube of water over a Bunsen burner. Which action is safe?",
      "Pointing the open end of the test tube away from everyone at the bench",
      ["Pointing the open end toward a partner so they can watch the water boil", "Holding the test tube in a bare hand while it heats over the flame", "Leaning over the flame to smell the contents of the tube as it heats"],
      "Heated liquid can bump and spray out of the open end, so the opening is always pointed away from people. <b>Pointing the open end of the test tube away from everyone at the bench</b> is the safe action.", {});
  },
  function () {
    return mcq("A student notices a cracked beaker just before a heating activity. What should the student do?",
      "Tell the teacher and replace the beaker before starting",
      ["Use it anyway, because a small crack does not matter when heating", "Hide the crack by turning it away from the teacher's view", "Heat it gently over the flame so the crack does not spread"],
      "Cracked glass can fail completely when heated, spilling hot contents. It is never used: <b>tell the teacher and replace the beaker before starting</b>.", {});
  },
  function () {
    return mcq("A class is using thermometers in a water bath activity. Which practice is safe and correct?",
      "Using the thermometer only to measure temperature, never as a stirring rod",
      ["Stirring the water bath with the thermometer to save time during the activity", "Resting the thermometer across the rim of a hot beaker while it is heating", "Shaking the thermometer down hard before taking each new reading in the bath"],
      "Thermometers are fragile measuring instruments; stirring or shaking can break them and spill their contents. <b>Using the thermometer only to measure temperature, never as a stirring rod</b>, is the safe practice.", {});
  },
  function () {
    return mcq("A student's sleeve keeps dangling near the Bunsen flame during an activity. What is the safest response?",
      "Roll up the sleeves and tie back loose clothing and hair before lighting the burner",
      ["Work faster so the activity ends before anything has a chance to catch fire", "Move the burner closer to the edge of the bench so the sleeve hangs clear", "Ask a partner to hold the sleeve back during the whole activity at the bench"],
      "Loose clothing and hair are fire hazards around a flame and are secured before the burner is lit. <b>Roll up the sleeves and tie back loose clothing and hair before lighting the burner</b>.", {});
  },
  function () {
    return mcq("At the end of a heating activity, a metal tripod still looks hot. What should a student do before putting it away?",
      "Leave it to cool on the bench and warn others not to touch it",
      ["Pick it up quickly with bare fingers to test how hot it still is", "Carry it across the room to the storage shelf right away after class", "Cool it instantly by pouring cold water over it at the bench"],
      "Hot apparatus causes burns and can crack if shocked with cold water. It cools in place, with a warning to others: <b>leave it to cool on the bench and warn others not to touch it</b>.", {});
  }
]), ["Think of the standard lab rules for heat, glass and flames before choosing.", "The safe action is the one taken before or immediately after the hazard appears."]);

E("s7-u2-cr-thermometer-choice", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return textq("Choosing temperature instruments (3 marks)\nA class must measure three temperatures during a field study: (a) the air temperature in a shaded schoolyard, (b) the temperature inside a compost pile, and (c) whether a metal tray left in the sun has passed 60 \u00B0C. For EACH job, name a suitable instrument from this list: a liquid-in-glass thermometer (\u221230 \u00B0C to 110 \u00B0C), a probe thermometer with a metal spike (\u221250 \u00B0C to 200 \u00B0C), and a temperature strip that changes colour at set temperatures. Give a reason for each choice. (3)",
      ["(a) The liquid-in-glass thermometer suits the schoolyard air: its range covers outdoor temperatures and it reads the air directly."],
      "Marking points (3): 1 mark for each well-matched instrument with a reason: (a) liquid-in-glass thermometer, range covers air temperatures and it hangs in the shade; (b) probe thermometer, because the spike pushes into the compost and its range covers compost heat; (c) temperature strip, because the job only needs to know whether a set temperature was passed, which is what the colour change shows. Model answer: (a) liquid-in-glass thermometer, for its suitable range in air. (b) probe thermometer, to reach inside the pile. (c) temperature strip, because <b>only a pass/fail reading at 60 \u00B0C is needed</b>.", {});
  },
  function () {
    return textq("Choosing temperature instruments (3 marks)\nA bakery co-op student must check: (a) the temperature of a freezer that should stay below \u221218 \u00B0C, (b) the exact temperature of bread dough rising at about 27 \u00B0C, and (c) the temperature at the centre of a roast turkey. The available instruments are a liquid-in-glass thermometer (10 \u00B0C to 110 \u00B0C), a dial probe thermometer (\u221230 \u00B0C to 100 \u00B0C) and an oven-safe probe thermometer (up to 300 \u00B0C). For EACH job, name the suitable instrument and give a reason. (3)",
      ["(a) The dial probe thermometer: the liquid-in-glass thermometer cannot read below 10 \u00B0C, so only the dial probe's range reaches \u221218 \u00B0C."],
      "Marking points (3): 1 mark for each well-matched instrument with a reason based on range or design: (a) dial probe, the only one whose range goes below 0 \u00B0C; (b) liquid-in-glass thermometer, which reads precisely in its 10 to 110 \u00B0C range where the dough sits; (c) oven-safe probe, because it can be inserted into the roast and withstand oven heat. Model answer: (a) dial probe thermometer. (b) liquid-in-glass thermometer. (c) oven-safe probe thermometer, because <b>it can stay in the roast inside the oven</b>.", {});
  },
  function () {
    return textq("Choosing temperature instruments (3 marks)\nDuring a winter science day, students must measure: (a) the temperature of the air outside at about \u221215 \u00B0C, (b) the temperature of water warming in a solar heater, expected to reach about 45 \u00B0C, and (c) the temperature of the soil 20 cm below the surface. Available instruments: an alcohol thermometer (\u221240 \u00B0C to 50 \u00B0C), a liquid-in-glass thermometer (10 \u00B0C to 110 \u00B0C), and a long probe thermometer (\u221250 \u00B0C to 150 \u00B0C). For EACH job, name the suitable instrument and give a reason. (3)",
      ["(a) The alcohol thermometer: it is the one whose range extends well below 0 \u00B0C without the liquid freezing."],
      "Marking points (3): 1 mark for each well-matched instrument with a reason: (a) alcohol thermometer, range reaches \u221215 \u00B0C; (b) liquid-in-glass thermometer, its range covers 45 \u00B0C and it reads water directly (the alcohol thermometer also reaches 45 \u00B0C, accept with a range reason); (c) long probe thermometer, because only a probe can be pushed 20 cm into the soil. Model answer: (a) alcohol thermometer. (b) liquid-in-glass thermometer. (c) long probe thermometer, because <b>it measures below the surface where the others cannot reach</b>.", {});
  }
]), ["Match the instrument to the job: what must it do when nobody is watching?", "Name features of the instrument itself, not just that it measures temperature."]);

E("s7-u2-cr-radiant-explain", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return textq("Explaining an absorption result (2 marks)\nIn an investigation, two identical bottles of water were left in the sun for one hour. The bottle wrapped in black paper reached 34 \u00B0C; the bottle wrapped in white paper reached 27 \u00B0C. Explain the difference in results, using the idea of radiant heat absorption. (2)",
      ["The black paper absorbed more of the sun's radiant heat than the white paper."],
      "Marking points (2): 1 mark for identifying that the black surface absorbed more radiant heat while the white surface reflected more of it. 1 mark for linking the extra absorbed energy to the greater temperature rise of the water in the black-wrapped bottle. Model answer: The black wrapping absorbed more radiant heat and passed that energy to the water, while the white wrapping reflected more away. <b>The black-wrapped bottle warmed more because its surface absorbed more radiant heat</b>.", {});
  },
  function () {
    return textq("Explaining an absorption result (2 marks)\nA class places two metal sheets in the sun, one dull and dark, one polished and shiny, each with a thermometer taped to its back. After 20 minutes the dull dark sheet's thermometer reads 41 \u00B0C and the polished sheet's reads 30 \u00B0C. Explain the difference in results, using the idea of radiant heat absorption. (2)",
      ["The dull dark sheet absorbed more of the sun's radiant heat than the polished shiny sheet."],
      "Marking points (2): 1 mark for identifying that the dull dark surface absorbed more radiant heat while the polished surface reflected more of it away. 1 mark for linking the extra absorbed energy to the higher temperature measured behind the dull dark sheet. Model answer: The polished sheet reflected much of the radiant heat, while the dull dark sheet absorbed it and warmed up. <b>The dull dark sheet got hotter because dull dark surfaces are better absorbers of radiant heat</b>.", {});
  },
  function () {
    return textq("Explaining an absorption result (2 marks)\nTwo school garden beds are side by side. One is covered with dark mulch and one with pale straw. On a sunny afternoon the soil under the dark mulch is 6 \u00B0C warmer than the soil under the straw. Explain the difference, using the idea of radiant heat absorption. (2)",
      ["The dark mulch absorbed more radiant heat from the sun than the pale straw."],
      "Marking points (2): 1 mark for identifying that the dark surface absorbed more radiant heat while the pale surface reflected more. 1 mark for linking the extra absorbed energy to the warmer soil beneath the dark mulch. Model answer: The pale straw reflected more of the sun's radiant heat, while the dark mulch absorbed it and warmed the soil below. <b>The soil under the dark mulch is warmer because the dark surface absorbed more radiant heat</b>.", {});
  }
]), ["Start with absorption: which surface takes in more of the Sun's radiation?", "For the change, think of blocking, reflecting or shedding the radiation."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s7-u2-cr-instrument-design closes Unit 2 Test
   1 (4 marks, Level 3); s7-u2-cr-expansion-use closes Unit 2 Test
   2 (2 marks, Level 2); s7-u2-cr-specific-heat closes Unit 2 Test
   3 (3 marks, Level 2). SME-flagged for the
   specialist pass. */
E("s7-u2-cr-instrument-design", 2, ["SC7.4.1"], 3, "var", varset([
  function () {
    return textq("Choose instruments from this list: a liquid-in-glass thermometer, an infrared thermometer, a thermocouple thermometer, a resistance thermometer with a probe wired to a display. Job A: find the air temperature inside a sealed terrarium that must not be opened during the study. Job B: find the temperature inside a pottery kiln firing at about 1000 degrees Celsius. (a) Name the instrument for Job A and justify your choice with a property of the instrument. (1) (b) Name the instrument for Job B and justify your choice with a property of the instrument. (1) (c) Explain one limitation that rules out a liquid-in-glass thermometer for Job B. (1) (d) State what would make the Job A readings trustworthy. (1) (4 marks)",
      ["Job A: a resistance thermometer, because its probe can be sealed inside the terrarium before it is closed while its display stays outside on the wire. Job B: a thermocouple thermometer, because it is built to measure temperatures far beyond the range of glass instruments. A liquid-in-glass thermometer is ruled out for the kiln because its liquid would boil and the glass would break at kiln temperatures. Trustworthy Job A readings come from leaving the probe in place, waiting for the reading to settle, and repeating the reading."],
      "<b>Model answer:</b> (a) A resistance thermometer: its probe can be placed inside the terrarium before it is sealed and the probe is wired to a display outside, so the temperature is read without opening the terrarium and disturbing the conditions inside. (b) A thermocouple thermometer: its joined wires of two different metals withstand and measure the extreme heat inside a firing kiln, far above the boiling point of water. (c) A liquid-in-glass thermometer is ruled out for the kiln because its range ends far below 1000 degrees Celsius: the liquid would boil and the glass tube would crack or melt long before a reading could be taken. (d) The Job A readings are trustworthy if the probe stays fixed in the air inside the terrarium, each reading is taken only after the display settles, and readings are repeated to check they agree.<br><br><b>Marking points:</b> 1 mark for Job A: the resistance thermometer named, justified by the probe inside and the wired display outside the sealed terrarium. 1 mark for Job B: the thermocouple named, justified by its ability to withstand and measure extreme temperatures. 1 mark for the limitation: a liquid-in-glass thermometer has too low a range and would be destroyed at kiln temperatures. 1 mark for a trustworthiness point for Job A, such as a fixed probe, waiting for the reading to settle, or repeating readings.", {});
  },
  function () {
    return textq("Choose instruments from this list: a liquid-in-glass thermometer, an infrared thermometer, a thermocouple thermometer, a resistance thermometer with a probe wired to a display. Job A: check the temperature of the frozen food load inside a delivery truck that must stay near minus 20 degrees Celsius, with the driver reading the result in the cab without opening the doors. Job B: find the soil temperature 30 cm below the surface of a garden bed. (a) Name the instrument for Job A and justify your choice with a property of the instrument. (1) (b) Name the instrument for Job B and justify your choice with a property of the instrument. (1) (c) Explain one limitation that rules out an infrared thermometer for Job B. (1) (d) State what would make the Job B readings trustworthy. (1) (4 marks)",
      ["Job A: a resistance thermometer, because its probe can sit in the load and send the reading along wires to a display in the cab, and its range covers minus 20 degrees Celsius. Job B: a resistance thermometer with a long probe (a probe thermometer), because the probe can be pushed 30 cm into the soil to where the temperature is wanted. An infrared thermometer is ruled out for Job B because it reads only surface radiation and cannot sense the soil at depth. Trustworthy Job B readings come from pushing the probe to the full depth, waiting for it to settle, and repeating at the same depth."],
      "<b>Model answer:</b> (a) A resistance thermometer: a probe placed in the load changes its electrical resistance with temperature and sends the reading along wires to a display in the cab, so the doors stay closed, and the instrument range covers temperatures well below freezing. (b) A resistance thermometer with a long probe: the probe can be pushed down to the full 30 cm depth, so the sensing part sits in the soil layer whose temperature is wanted rather than at the surface. (c) An infrared thermometer is ruled out for Job B because it measures only the radiation given off by a surface; it would report the temperature of the soil surface or the plants above it and has no way to sense conditions 30 cm down. (d) The Job B readings are trustworthy if the probe is pushed to the same full depth each time, left until the reading settles at the soil temperature, and the measurement is repeated to check agreement.<br><br><b>Marking points:</b> 1 mark for Job A: the resistance thermometer named, justified by the wired probe and display or by a range that covers minus 20 degrees Celsius. 1 mark for Job B: a probe instrument named, justified by the probe reaching the required depth. 1 mark for the limitation: an infrared thermometer reads surfaces only and cannot measure at depth. 1 mark for a trustworthiness point for Job B, such as a consistent full depth, waiting for the reading to settle, or repeating readings.", {});
  },
  function () {
    return textq("Choose instruments from this list: a liquid-in-glass thermometer, an infrared thermometer, a thermocouple thermometer, a resistance thermometer with a probe wired to a display. Job A: screen arriving patients during an illness outbreak by taking each person's temperature without touching their skin. Job B: find the temperature inside a bakery oven holding at about 230 degrees Celsius while loaves bake. (a) Name the instrument for Job A and justify your choice with a property of the instrument. (1) (b) Name the instrument for Job B and justify your choice with a property of the instrument. (1) (c) Explain one limitation that rules out a liquid-in-glass thermometer for Job A. (1) (d) State what would make the Job A readings trustworthy. (1) (4 marks)",
      ["Job A: an infrared thermometer, because it measures the radiation the skin gives off and needs no contact, which avoids spreading illness and is fast. Job B: a thermocouple thermometer (or an oven rated probe thermometer), because it withstands oven heat well above the range of a school liquid-in-glass thermometer. A liquid-in-glass thermometer is ruled out for Job A because it must touch the skin and takes time to settle, which risks passing illness between patients. Trustworthy Job A readings come from holding the instrument at the correct distance, aiming at the same place on each patient, and repeating any doubtful reading."],
      "<b>Model answer:</b> (a) An infrared thermometer: it measures the invisible radiation given off by the skin and converts it to a temperature, so no contact is needed, screening is quick, and nothing that touched one patient touches the next. (b) A thermocouple thermometer: it is built for high temperatures and can stay in or be inserted into the hot oven, where a liquid-in-glass thermometer range of about minus 30 to 110 degrees Celsius would be exceeded. (c) A liquid-in-glass thermometer is ruled out for Job A because it works only in contact with what it measures: it would have to touch each patient skin and be cleaned between patients, and it is slow to settle, so it fails the no contact requirement that the screening job sets. (d) The Job A readings are trustworthy if the thermometer is held at the maker recommended distance, aimed at the same spot, such as the forehead, for every patient, and any reading that looks wrong is repeated.<br><br><b>Marking points:</b> 1 mark for Job A: the infrared thermometer named, justified by remote sensing with no contact. 1 mark for Job B: the thermocouple named, justified by its high temperature range and heat resistance. 1 mark for the limitation: a liquid-in-glass thermometer requires contact and is slow, so it cannot meet the no contact screening requirement. 1 mark for a trustworthiness point for Job A, such as a consistent distance and aim, or repeating doubtful readings.", {});
  },
  function () {
    return textq("Choose instruments from this list: a liquid-in-glass thermometer, an infrared thermometer, a thermocouple thermometer, a resistance thermometer with a probe wired to a display. Job A: find the temperature at the centre of a large compost pile as it heats up over a week. Job B: check whether the surface of a hot engine part is safe to touch, without touching it. (a) Name the instrument for Job A and justify your choice with a property of the instrument. (1) (b) Name the instrument for Job B and justify your choice with a property of the instrument. (1) (c) Explain one limitation that rules out an infrared thermometer for Job A. (1) (d) State what would make the Job A readings trustworthy. (1) (4 marks)",
      ["Job A: a resistance thermometer with a long probe, because the probe can be pushed to the centre of the pile and left in place or reinserted to the same depth for each reading. Job B: an infrared thermometer, because it reads the radiation from the surface at a distance, so nobody has to touch the part. An infrared thermometer is ruled out for Job A because it reads only the outside surface of the pile, not the centre. Trustworthy Job A readings come from measuring at the same depth and place each day and waiting for the reading to settle."],
      "<b>Model answer:</b> (a) A resistance thermometer with a long probe: the probe can be pushed into the centre of the pile, the place whose temperature is wanted, and its reading can be sent to a display outside the pile, so the pile does not have to be dug open. (b) An infrared thermometer: it measures the radiation the hot surface gives off from a safe distance, so the check is made with no contact at all. (c) An infrared thermometer is ruled out for Job A because it senses only the surface it is pointed at; the outside of a compost pile is cooled by the air and says nothing reliable about the much hotter centre. (d) The Job A readings are trustworthy if the probe reaches the same central depth for every reading across the week, is left until the reading settles, and readings are repeated to check they agree.<br><br><b>Marking points:</b> 1 mark for Job A: a probe instrument named, justified by the probe reaching the centre of the pile. 1 mark for Job B: the infrared thermometer named, justified by remote sensing with no contact. 1 mark for the limitation: an infrared thermometer reads surfaces only, so it cannot report the centre temperature. 1 mark for a trustworthiness point for Job A, such as a consistent depth and place, waiting for the reading to settle, or repeating readings.", {});
  }
]), ["Each job has one condition that rules most instruments out: sealed, at depth, no contact, or extreme heat.", "Justify each choice with a property of the instrument itself, and treat surface only instruments as surface only."]);

E("s7-u2-cr-expansion-use", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return textq("A tight metal lid on a glass jar will not turn. Running hot water over the lid for half a minute loosens it so it turns easily. Explain, using the particle theory, why the hot water loosens the lid. (2 marks)",
      ["The metal lid warms and expands more than the glass jar, so its grip loosens. In particle terms, the particles of the warmed metal move faster and spread slightly farther apart."],
      "<b>Model answer:</b> The hot water warms the metal lid. Its particles gain kinetic energy, move faster and spread slightly farther apart, so the lid expands. Metal expands more than the glass of the jar for the same temperature rise, so the lid grows slightly wider than the jar neck it grips, its hold loosens, and it turns. The particles themselves do not grow; the spaces between them increase.<br><br><b>Marking points:</b> 1 mark for the particle explanation: warming makes the particles move faster and spread farther apart, so the material expands. 1 mark for applying it to the jar: the metal lid expands more than the glass, so the fit loosens.", {});
  },
  function () {
    return textq("Railway rails are laid with small gaps left between the end of one rail section and the start of the next. Explain, using the particle theory, why the gaps are needed and what would happen on a hot day if the rails were laid with no gaps. (2 marks)",
      ["Steel rails expand in length when they warm in the sun, so the gaps give the metal room to expand. In particle terms, the warmed particles move faster and spread slightly farther apart along the rail. Without gaps, expanding rails would push against each other and could buckle."],
      "<b>Model answer:</b> On a hot day the Sun warms the steel rails. The particles of the steel move faster and spread slightly farther apart, so each rail section expands and grows longer. The gaps give that extra length somewhere to go. If the sections were laid end to end with no gaps, the expanding rails would push hard against each other with nowhere to expand, and the track could buckle or warp sideways, which would be dangerous for trains.<br><br><b>Marking points:</b> 1 mark for the particle explanation: warming makes the particles move faster and spread farther apart, so the rail expands in length. 1 mark for the consequence: the gaps absorb the expansion, and without them the rails would push against each other and could buckle.", {});
  },
  function () {
    return textq("A table tennis ball has a small dent but no hole. A student holds the ball in warm water for a minute and the dent pops out. Explain, using the particle theory, why the dent comes out. (2 marks)",
      ["The air inside the ball warms, its particles move faster and spread farther apart, and the air expands and pushes harder on the ball walls, pushing the dent back out."],
      "<b>Model answer:</b> The warm water heats the air trapped inside the ball. The air particles move faster, spread farther apart and collide with the inside walls harder and more often, so the air expands and its push on the walls increases. That extra push from inside forces the softened dented wall back out to the ball round shape. No air was added; the same particles take up more space when they move faster.<br><br><b>Marking points:</b> 1 mark for the particle explanation: the trapped air warms, its particles move faster and spread farther apart, so the air expands. 1 mark for applying it to the ball: the expanded air pushes harder on the walls from inside and pushes the dent out.", {});
  },
  function () {
    return textq("On a hot summer afternoon, power lines strung between poles sag noticeably lower than they do on a cold winter morning. Explain, using the particle theory, why the lines sag lower in the heat. (2 marks)",
      ["The metal cable expands in length when it is hot, so the longer cable hangs in a deeper curve between the poles. In particle terms, the warmed particles move faster and spread slightly farther apart along the cable."],
      "<b>Model answer:</b> The afternoon heat warms the metal of the power lines. Its particles move faster and spread slightly farther apart, so the cable expands and becomes slightly longer between the poles. A longer cable strung between two fixed poles has more slack, so it hangs in a deeper, lower curve. In the cold the particles move more slowly and sit closer together, the cable contracts, and the line pulls tighter and higher.<br><br><b>Marking points:</b> 1 mark for the particle explanation: warming makes the particles move faster and spread farther apart, so the cable expands in length. 1 mark for applying it to the sag: the longer cable has more slack between fixed poles, so it hangs lower.", {});
  }
]), ["Decide first whether the case is a warming or a cooling, then use faster or slower particles.", "Particles spread apart or come closer; they never grow, shrink, or appear from nowhere."]);

E("s7-u2-cr-specific-heat", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    return textq("At a beach on a sunny afternoon, the dry sand is too hot to walk on barefoot while the sea beside it still feels cool. That night, after sunset, the sand has cooled right down but the sea feels warmer than the sand. (a) Explain the afternoon observation. (1) (b) Explain the night observation. (1) (c) State the general principle about specific heat capacity that explains both observations. (1) (3 marks)",
      ["Sand has a low specific heat capacity, so the Sun energy raises its temperature a lot; water has a high specific heat capacity, so the same energy raises its temperature only a little. At night the sand loses its heat and cools quickly, while the water gives back the large amount of energy it stored through the day and cools slowly, staying warmer. Principle: for the same mass and the same energy change, a substance with a higher specific heat capacity changes temperature less, warming and cooling more slowly."],
      "<b>Model answer:</b> (a) Dry sand has a low specific heat capacity, so the energy it absorbs from the Sun produces a large temperature rise. Water has a high specific heat capacity, so the sea absorbs a great deal of the same sunshine with only a small temperature rise and still feels cool. (b) After sunset both lose energy. The sand, holding little stored energy per degree, cools quickly. The water stored a large amount of energy during the day and releases it slowly, so its temperature falls slowly and the sea stays warmer than the sand into the night. (c) General principle: specific heat capacity is the energy needed to raise the temperature of a given mass of a substance by one degree. The higher the specific heat capacity, the more energy a substance can take in or give out for each degree its temperature changes, so it warms and cools more slowly.<br><br><b>Marking points:</b> 1 mark for the afternoon observation explained by sand's low specific heat capacity against water's high specific heat capacity. 1 mark for the night observation explained by water releasing its large store of energy slowly while the sand cools fast. 1 mark for the general principle stated: higher specific heat capacity means more energy per degree, so a smaller temperature change for the same energy transfer.", {});
  },
  function () {
    return textq("A coastal town and an inland town sit at the same latitude and receive the same sunshine. The coastal town has cooler days in summer and milder, warmer nights in winter than the inland town, whose temperatures swing much further in both seasons. (a) Explain the coastal town cooler summer days. (1) (b) Explain the coastal town milder winter nights. (1) (c) State the general principle about specific heat capacity that explains both observations. (1) (3 marks)",
      ["The ocean beside the coastal town is water with a high specific heat capacity: it warms slowly in summer, keeping the air over the coast cooler, and cools slowly in winter, giving back stored energy and keeping coastal nights milder. Inland soil and rock have lower specific heat capacities and change temperature quickly. Principle: a higher specific heat capacity means a smaller temperature change for the same energy transfer."],
      "<b>Model answer:</b> (a) In summer the ocean warms very slowly because water has a high specific heat capacity: it absorbs large amounts of the Sun energy with little temperature rise, so the air above the coast stays cooler than the air over the fast heating inland ground. (b) In winter the ocean gives back the energy it stored through the summer, and because it cools slowly it keeps releasing that energy for a long time, warming the coastal air and making winter nights milder. The inland town has no such store: its soil and rock have lower specific heat capacities, heat up fast in summer and cool fast in winter. (c) General principle: the higher a substance's specific heat capacity, the more energy it takes in or gives out for each degree of temperature change, so its temperature changes slowly; lower specific heat capacity materials change temperature quickly for the same energy transfer.<br><br><b>Marking points:</b> 1 mark for the summer observation explained by the ocean warming slowly and moderating the coastal air. 1 mark for the winter observation explained by the ocean cooling slowly and releasing stored energy. 1 mark for the general principle stated: higher specific heat capacity means more energy per degree and slower temperature change.", {});
  },
  function () {
    return textq("A hot water bottle filled with hot water and placed in a bed is still warm hours later. A metal pan heated to the same starting temperature and left in the same room feels cold again within minutes. (a) Explain why the hot water bottle stays warm for so long. (1) (b) Explain why the metal pan cools so quickly. (1) (c) State the general principle about specific heat capacity that explains both observations. (1) (3 marks)",
      ["Water has a high specific heat capacity, so the water in the bottle stored a large amount of energy and must give out a large amount for each degree it cools, which takes hours. Metal has a low specific heat capacity, so the pan stored little energy per degree and loses it quickly. Principle: higher specific heat capacity means more energy stored or released per degree, so slower temperature change."],
      "<b>Model answer:</b> (a) Water has a high specific heat capacity, so heating the water in the bottle stored a large amount of energy in it. To cool by each degree, the water must give out a large amount of energy, and giving out the whole store takes hours, so the bottle stays warm for a long time. (b) The metal of the pan has a low specific heat capacity, so even at the same starting temperature the pan stored far less energy per degree. It gives that small store away to the room quickly and is soon back at room temperature. (c) General principle: specific heat capacity measures how much energy a given mass of a substance must gain or lose for its temperature to change by one degree. High specific heat capacity substances change temperature slowly; low specific heat capacity substances change temperature quickly for the same energy transfer.<br><br><b>Marking points:</b> 1 mark for the bottle explained by water's high specific heat capacity and its large stored energy being released slowly. 1 mark for the pan explained by metal's low specific heat capacity and its small stored energy being lost quickly. 1 mark for the general principle stated correctly.", {});
  },
  function () {
    return textq("Water is used as the coolant in a car engine. The coolant picks up heat from the hot engine block, yet its own temperature rises only slowly even though the engine is very hot. Long after the engine is switched off, the coolant in the radiator is still warm. (a) Explain why the coolant temperature rises only slowly as it absorbs engine heat. (1) (b) Explain why the coolant stays warm long after the engine stops. (1) (c) State the general principle about specific heat capacity that explains both observations. (1) (3 marks)",
      ["Water has a high specific heat capacity, so it can absorb a large amount of engine heat for each degree its temperature rises, carrying heat away without boiling quickly. It also cools slowly, because it must release a large amount of energy for each degree it falls, so it stays warm long after the engine stops. Principle: higher specific heat capacity means more energy per degree and slower warming and cooling."],
      "<b>Model answer:</b> (a) Water has a high specific heat capacity, so the coolant can absorb a large amount of heat energy from the engine block while its own temperature rises by only a small amount. That is what makes it a good coolant: it carries a great deal of heat away without quickly reaching its boiling point. (b) Cooling works the same way in reverse: for the coolant temperature to fall by each degree it must give out a large amount of energy, so it loses its stored heat slowly and is still warm long after the engine is switched off. (c) General principle: the higher a substance's specific heat capacity, the more energy it gains or loses for each degree of temperature change, so it warms slowly and cools slowly; substances with low specific heat capacities warm and cool quickly.<br><br><b>Marking points:</b> 1 mark for the slow rise explained by water absorbing much energy per degree. 1 mark for the slow cooling explained by water having to release much energy per degree. 1 mark for the general principle stated correctly.", {});
  }
]), ["Both observations in each variant run on the same comparison: water against a low specific heat capacity material.", "Finish with the principle in general words: energy per degree decides how fast temperature changes."]);

/* ----- bank-u3.js ----- */
// CRMARKS: s7-u3-cr-classify-explain=2
// CRMARKS: s7-u3-cr-particle-classify=3
// CRMARKS: s7-u3-cr-separation-plan=4
/* Science 7, Unit 3: Mixtures and Solutions (SC7.7.1 to SC7.9.8, 21
   indicators, 60 entries). Sources: the current English guide (Focus
   for Learning for all 21 indicators; terminology governs; particle,
   not atom or molecule), the outcome spreadsheet (tag set verified
   set-identical to the guide, in order), ExamView Chapters 7 to 9 (271
   items parsed), Core Labs 7-1C, 8-1C, 8-2A and 9-1C, the "Would You
   Like Salt On That?" road salt STSE module (the guide's Appendix A;
   ESD and WNLSD copies byte-identical, counted once), the ESD Unit 3
   exam, the WNLSD Unit 3 test family, Chapter 9 test and objectives
   sheet. All items were written new for this app: existing tests
   and question banks were reviewed only to gauge the expected
   depth and range of treatment, and nothing was carried
   verbatim. Harvest catalogue and authoring spec:
   Science-7-Mixtures-Harvest-Catalogue-2026-11-15.md and
   Science-7-Mixtures-Authoring-Spec-2026-11-15.md. */
// CRMARKS: s7-u3-cr-pure=2
// CRMARKS: s7-u3-cr-classify=3
// CRMARKS: s7-u3-cr-dissolving=3
// CRMARKS: s7-u3-cr-concentration=3
// CRMARKS: s7-u3-cr-solubility=2
// CRMARKS: s7-u3-cr-separate=3
// CRMARKS: s7-u3-cr-three-part=3
// CRMARKS: s7-u3-cr-distill=2
// CRMARKS: s7-u3-cr-salt-decision=3
// CRMARKS: s7-u3-cr-best-fit=3
// CRMARKS: s7-u3-cr-design-solubility=4
// CRMARKS: s7-u3-cr-new-question=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s7-u3-classify-pure=2
// CRMARKS: s7-u3-particle-pure=2
// CRMARKS: s7-u3-classify-mixtures=2
// CRMARKS: s7-u3-light-test=3
// CRMARKS: s7-u3-combination=3
// CRMARKS: s7-u3-solute-solvent=2
// CRMARKS: s7-u3-dissolving-particles=2
// CRMARKS: s7-u3-solution-states=3
// CRMARKS: s7-u3-conc-compare=3
// CRMARKS: s7-u3-conc-change=3
// CRMARKS: s7-u3-solubility-temp=2
// CRMARKS: s7-u3-method-match=2
// CRMARKS: s7-u3-method-property=3
// CRMARKS: s7-u3-home-techniques=2
// CRMARKS: s7-u3-choose-technique=3
// CRMARKS: s7-u3-distill-parts=2
// CRMARKS: s7-u3-distill-vs-evap=3
// CRMARKS: s7-u3-fractional=2
// CRMARKS: s7-u3-lives-effects=2
// CRMARKS: s7-u3-salt-positive=2
// CRMARKS: s7-u3-salt-negative=3
// CRMARKS: s7-u3-salt-classify-effects=3
// CRMARKS: s7-u3-deicer-compare=3
// CRMARKS: s7-u3-deicing-improve=2
// CRMARKS: s7-u3-salt-science=4
// CRMARKS: s7-u3-hypothesis-pattern=2
// CRMARKS: s7-u3-hypothesis-background=3
// CRMARKS: s7-u3-delimit=2
// CRMARKS: s7-u3-delimit-plan=4
// CRMARKS: s7-u3-best-fit=2
// CRMARKS: s7-u3-interpolate=3
// CRMARKS: s7-u3-extrapolate=4
// CRMARKS: s7-u3-hypothesis-temp=2
// CRMARKS: s7-u3-variables-solubility=3
// CRMARKS: s7-u3-controls=2
// CRMARKS: s7-u3-controls-judge=4
// CRMARKS: s7-u3-procedure-order=3
// CRMARKS: s7-u3-procedure-problem=2
// CRMARKS: s7-u3-tools-safety=2
// CRMARKS: s7-u3-tools-accurate=3
// CRMARKS: s7-u3-particle-diagram-judge=3
// CRMARKS: s7-u3-mixture-classify-more=3
// CRMARKS: s7-u3-dissolving-identify=3
// CRMARKS: s7-u3-separation-plan=3
// CRMARKS: s7-u3-separation-property=4
// CRMARKS: s7-u3-daily-technique-id=2
// CRMARKS: s7-u3-daily-technique-choose=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s7-u3-classify-pure=a
// BIMODAL: s7-u3-particle-pure=b
// BIMODAL: s7-u3-classify-mixtures=a
// BIMODAL: s7-u3-light-test=b
// BIMODAL: s7-u3-combination=b
// BIMODAL: s7-u3-solute-solvent=a
// BIMODAL: s7-u3-dissolving-particles=b
// BIMODAL: s7-u3-solution-states=b
// BIMODAL: s7-u3-conc-compare=a
// BIMODAL: s7-u3-conc-change=b
// BIMODAL: s7-u3-solubility-temp=b
// BIMODAL: s7-u3-method-match=a
// BIMODAL: s7-u3-method-property=b
// BIMODAL: s7-u3-home-techniques=a
// BIMODAL: s7-u3-choose-technique=b
// BIMODAL: s7-u3-distill-parts=b
// BIMODAL: s7-u3-distill-vs-evap=b
// BIMODAL: s7-u3-fractional=b
// BIMODAL: s7-u3-lives-effects=b
// BIMODAL: s7-u3-salt-positive=b
// BIMODAL: s7-u3-salt-negative=b
// BIMODAL: s7-u3-salt-classify-effects=b
// BIMODAL: s7-u3-deicer-compare=b
// BIMODAL: s7-u3-deicing-improve=b
// BIMODAL: s7-u3-salt-science=b
// BIMODAL: s7-u3-hypothesis-pattern=b
// BIMODAL: s7-u3-hypothesis-background=b
// BIMODAL: s7-u3-delimit=b
// BIMODAL: s7-u3-delimit-plan=b
// BIMODAL: s7-u3-best-fit=b
// BIMODAL: s7-u3-interpolate=a
// BIMODAL: s7-u3-extrapolate=a
// BIMODAL: s7-u3-hypothesis-temp=b
// BIMODAL: s7-u3-variables-solubility=b
// BIMODAL: s7-u3-controls=b
// BIMODAL: s7-u3-controls-judge=b
// BIMODAL: s7-u3-procedure-order=b
// BIMODAL: s7-u3-procedure-problem=b
// BIMODAL: s7-u3-tools-safety=b
// BIMODAL: s7-u3-tools-accurate=b
// BIMODAL: s7-u3-particle-diagram-judge=b
// BIMODAL: s7-u3-mixture-classify-more=b
// BIMODAL: s7-u3-dissolving-identify=a
// BIMODAL: s7-u3-separation-plan=b
// BIMODAL: s7-u3-separation-property=b
// BIMODAL: s7-u3-daily-technique-id=a
// BIMODAL: s7-u3-daily-technique-choose=b

/* ---------- SC7.7.1 Pure substances and mixtures ---------- */
E("s7-u3-classify-pure", 3, ["SC7.7.1"], 1, "gen", function () {
  var cases = [
    { s: "table salt, made of one kind of particle throughout", key: "A pure substance", d: ["A mixture", "A solution", "A mechanical mixture"] },
    { s: "distilled water, with nothing dissolved in it", key: "A pure substance", d: ["A mixture", "A heterogeneous mixture", "A solution"] },
    { s: "air, a blend of nitrogen, oxygen and other gases", key: "A mixture", d: ["A pure substance", "An element", "A compound"] },
    { s: "a gold bar, made only of gold particles", key: "A pure substance", d: ["A mixture", "A solution", "A heterogeneous mixture"] },
    { s: "concrete, made of cement, sand, gravel and water", key: "A mixture", d: ["A pure substance", "An element", "A compound"] },
    { s: "baking soda, one kind of particle made of several elements in fixed proportions", key: "A pure substance", d: ["A mixture", "A mechanical mixture", "A solution"] }
  ];
  var c = pick(cases);
  return mcq("Using the particle theory, how should this substance be classified: " + c.s + "?",
    c.key, c.d,
    "A pure substance contains only one kind of particle and is the same throughout; the particle may be a single atom (gold) or atoms chemically combined in fixed proportions (salt, baking soda, distilled water). A mixture physically combines two or more pure substances, like the gases in air or the ingredients in concrete.",
    {});
}, ["Ask one question: how many kinds of particle are present?", "One kind of particle means pure, even when the particle itself contains several elements."]);

E("s7-u3-particle-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows particles in three containers. Which container holds a pure substance, and why?",
      "Container 1, because it holds only one kind of particle throughout",
      ["Container 2, because its two kinds of particle are evenly mixed",
       "Container 3, because its particles are neatly separated into layers",
       "None of them, because pure substances cannot be drawn as particles"],
      "A pure substance is one kind of particle, the same throughout: Container 1. Container 2 is a mixture whose particles are evenly mixed (a solution), and Container 3 is a mixture whose particles sit in separate layers. Even mixing does not make a mixture pure.",
      {});
    q.figure = s7MixturePanelSVG();
    return q;
  },
  function () {
    var q = mcq("The diagram shows particles in three containers. Which containers hold mixtures?",
      "Containers 2 and 3, because each holds two kinds of particle",
      ["Container 2 only, because Container 3's particles are separated",
       "Container 3 only, because Container 2 looks uniform",
       "Containers 1 and 2, because their particles are evenly spread"],
      "A mixture is any physical combination of two or more kinds of particle. Container 2 mixes them evenly and Container 3 keeps them in layers, but both hold two kinds, so both are mixtures. Container 1 holds one kind only: a pure substance.",
      {});
    q.figure = s7MixturePanelSVG();
    return q;
  }
]), ["Count the kinds of particle in each container, not how tidy they look.", "Evenly mixed is still a mixture; layered is still a mixture."]);

E("s7-u3-pure-misconception", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return mcq("A juice box is labelled '100% pure orange juice.' A student says this means orange juice is a pure substance in the scientific sense. Which response is correct?",
      "The label uses 'pure' in the everyday sense; scientifically, orange juice is a mixture of water, sugars, pulp and other substances",
      ["The student is right, because the label says pure and labels must use words scientifically",
       "The student is right, because orange juice is clear enough to see through when held up to the light",
       "The label is wrong, because anything called a pure substance is always safe for people to drink or eat"],
      "Everyday 'pure' means something like unspoiled or nothing added. Scientific 'pure' means one kind of particle only. Orange juice contains many kinds of particle, so it is a mixture however honest the label is. The guide names this exact confusion, along with 'pure means safe to ingest' and 'pure means clear,' as misconceptions to correct.",
      {});
  },
  function () {
    return mcq("Which statement about pure substances is scientifically correct?",
      "Compounds such as salt, sugar and baking soda are pure substances, because each contains its particles in fixed proportions",
      ["Only elements can be pure substances; compounds are always mixtures of elements",
       "A pure substance is one that is safe for people to eat or drink, with nothing harmful in it",
       "If a substance looks clear and uniform all the way through, it must be a pure substance in the scientific sense"],
      "Pure substances are not limited to elements. A compound's particles are all alike, with their elements combined in fixed proportions, so compounds are pure substances. Safety and clarity are everyday meanings of 'pure,' not the scientific one: some pure substances are poisonous, and some mixtures look perfectly clear.",
      {});
  }
]), ["Separate the everyday meaning of 'pure' from the scientific one.", "One kind of particle, in fixed proportions: elements and compounds both qualify."]);

E("s7-u3-cr-pure", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return textq("Explain, using the particle theory, why table salt is classified as a pure substance but salt water is classified as a mixture. (2 marks)",
      ["salt has one kind of particle", "salt water has two kinds of particles", "physically combined"],
      "<b>Model answer:</b> Table salt contains only one kind of particle, the same throughout, so it is a pure substance (its particle is a compound particle, with elements combined in fixed proportions). Salt water contains two kinds of particle, salt particles and water particles, physically combined in no fixed proportion, so it is a mixture.<br><br><b>Marking points:</b> 1 mark for salt as one kind of particle throughout; 1 mark for salt water as two kinds of particle physically combined.",
      {});
  }
]), ["Count particle kinds in each substance.", "One kind means pure; two kinds physically combined means mixture."]);

/* ---------- SC7.7.2 Heterogeneous and homogeneous mixtures ---------- */
E("s7-u3-classify-mixtures", 3, ["SC7.7.2"], 1, "gen", function () {
  var cases = [
    { s: "salt water, clear and the same throughout", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "A compound"] },
    { s: "trail mix, with nuts, raisins and seeds visible separately", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "vegetable oil shaken with water, separating into layers", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "sugar water, with no sugar visible anywhere in it", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "An element"] },
    { s: "granite, with flecks of different minerals visible in the rock", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "brass, the same colour and composition throughout the metal", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "An element"] }
  ];
  var c = pick(cases);
  return mcq("How should this mixture be classified: " + c.s + "?",
    c.key, c.d,
    "In a homogeneous mixture (a solution) the particles mix so evenly that the mixture appears as one substance throughout, like salt water, sugar water and brass. In a heterogeneous (mechanical) mixture the parts stay visible or separate, like trail mix, oil and water, and granite. None of these is a pure substance: each combines two or more kinds of particle.",
    {});
}, ["Can you see separate parts, or does it look like one substance throughout?", "Appearing as one substance points to homogeneous; visible parts point to heterogeneous."]);

E("s7-u3-light-test", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("A flashlight beam is shone through two mixtures in a dark room. Through Mixture A the beam passes cleanly and cannot be seen from the side. In Mixture B the beam scatters and glows as it crosses. What does the light test show?",
      "A is homogeneous (light passes through unaffected); B is heterogeneous (its particles scatter the light)",
      ["A is heterogeneous; B is homogeneous, exactly the reverse of the correct reading",
       "Both are homogeneous, because both of them let at least some light pass through",
       "Both are pure substances, because light behaves in a special way when it crosses mixtures"],
      "Light behaviour separates the two mixture types: in a homogeneous mixture the particles are too evenly spread and small to disturb the beam, so it passes through unaffected. In a heterogeneous mixture the larger particles reflect and scatter the light, making the beam visible from the side.",
      {});
  },
  function () {
    return mcq("In a sunbeam crossing a classroom, the dust in the air becomes visible where the light passes. What does this reveal about classroom air?",
      "Classroom air is a heterogeneous mixture, because the dust particles in it scatter the light",
      ["Classroom air is a pure substance, because all gases are pure substances",
       "Classroom air is a homogeneous mixture, because air is homogeneous everywhere",
       "The sunbeam creates the dust particles, which were not in the air before"],
      "Air's gases form a homogeneous mixture, but classroom air also carries dust particles, and those particles scatter the light and give the mixture away as heterogeneous. Clean air in a breathing apparatus, without the dust, is the homogeneous case.",
      {});
  }
]), ["Watch what the beam does: passes clean, or scatters and glows.", "Scattering means larger particles are present: heterogeneous."]);

E("s7-u3-combination", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("Orange juice is described as a combination mixture. Why does it not fit neatly into either the homogeneous or the heterogeneous class?",
      "Its sugars are dissolved evenly in the water (a homogeneous part) while its pulp stays in visible pieces (a heterogeneous part)",
      ["It changes class depending on the temperature of the room, being one class when warm and the other when cold",
       "It is actually a pure substance in the scientific sense, so neither mixture class applies to it",
       "Its orange colour hides which class it belongs to from anyone looking at it"],
      "Many real mixtures combine both behaviours. In orange juice the dissolved sugars and water form a solution, while the pulp remains as separate visible pieces. Milk and soft drinks are the guide's other combination examples. Classification questions in this strand stick to clear examples for the two main classes and treat combinations honestly as combinations.",
      {});
  }
]), ["Look for two behaviours in one mixture: a dissolved part and a visible part.", "Combinations are real; the two classes are the ends of a continuum."]);

E("s7-u3-cr-classify", 3, ["SC7.7.2"], 3, "var", varset([
  function () {
    return textq("In a Core Lab activity, a group examined an unknown drink four ways. Their record: unaided eye, looks uniform; hand lens, tiny specks visible; microscope, particles of different sizes visible; flashlight, the beam scatters as it crosses the drink. Classify the drink as homogeneous or heterogeneous, and justify your classification with two of the observations. (3 marks)",
      ["heterogeneous", "particles visible under lens or microscope", "light scatters"],
      "<b>Model answer:</b> The drink is a heterogeneous mixture. Although it looks uniform to the unaided eye, the hand lens and microscope reveal particles of different sizes suspended in it, which a homogeneous mixture would not show (its particles are not visible even under a microscope). The flashlight test confirms it: the beam scatters as it crosses, which happens when light reflects off larger particles in a heterogeneous mixture; in a homogeneous mixture the beam passes through unaffected.<br><br><b>Marking points:</b> 1 mark for heterogeneous; 1 mark for the visible particles under the lens or microscope; 1 mark for the scattered beam. Any two of the three observation-based points earn the justification marks.",
      {});
  }
]), ["Trust the strongest observations, not the first impression.", "Visible particles and a scattered beam both point the same way."]);

/* ---------- SC7.7.3 Dissolving; solute and solvent ---------- */
E("s7-u3-solute-solvent", 3, ["SC7.7.3"], 1, "gen", function () {
  var cases = [
    { s: "a teaspoon of sugar stirred into a cup of hot water", key: "Sugar is the solute; water is the solvent", d: ["Water is the solute; sugar is the solvent", "Both are solutes", "Both are solvents"] },
    { s: "vinegar, which is 5 percent acetic acid and 95 percent water", key: "Acetic acid is the solute; water is the solvent", d: ["Water is the solute; acetic acid is the solvent", "Both are solvents in equal roles", "Neither; vinegar is a pure substance"] },
    { s: "air, which is about 78 percent nitrogen with oxygen and other gases making up the rest", key: "Nitrogen is the solvent; the other gases are solutes", d: ["Oxygen is the solvent; nitrogen is the solute", "All the gases are solutes; air has no solvent", "Air is a pure substance, so the terms do not apply"] },
    { s: "brass, made of 35 g of zinc combined in 65 g of copper", key: "Zinc is the solute; copper is the solvent", d: ["Copper is the solute; zinc is the solvent", "Both are solutes", "Brass is a pure substance, so the terms do not apply"] },
    { s: "soda water, carbon dioxide gas dissolved in water", key: "Carbon dioxide is the solute; water is the solvent", d: ["Water is the solute; carbon dioxide is the solvent", "Both are solvents", "Neither; the gas escapes, so it was never a solute"] }
  ];
  var c = pick(cases);
  return mcq("Identify the solute and the solvent in this solution: " + c.s + ".",
    c.key, c.d,
    "The solvent is the component present in the larger amount, the one doing the dissolving; the solute is the component dissolved in it. That rule holds across states: in vinegar the water (95 percent) is the solvent, in air the nitrogen is, and in brass the copper is, even though brass is a solid solution.",
    {});
}, ["The solvent is the part present in the larger amount.", "Solid solutions count too: brass has a solute and a solvent."]);

E("s7-u3-dissolving-particles", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("When sugar dissolves in water, what happens at the particle level?",
      "The sugar particles separate from each other and spread evenly among the water particles",
      ["The sugar particles melt in the water and become water particles themselves",
       "The sugar particles disappear completely and are gone for good",
       "The water particles break apart and form entirely new particles"],
      "Dissolving is a physical mixing at the particle level: the solute's particles leave each other and distribute evenly through the solvent's particles. The sugar is still there, which is why the water tastes sweet and why evaporation can recover it. Nothing melts, disappears, or changes into a different particle.",
      {});
  },
  function () {
    return mcq("A substance that cannot dissolve in a given solvent is described as",
      "insoluble in that solvent",
      ["saturated in that solvent",
       "concentrated in that solvent",
       "a solvent for that solvent"],
      "Solubility is the ability to dissolve: a solute that dissolves is soluble, and one that does not is insoluble, always in relation to a particular solvent. Flour is insoluble in water; salt is insoluble in oil. Saturated and concentrated describe how much has dissolved, not whether dissolving happens at all.",
      {});
  }
]), ["Dissolving spreads the solute's particles among the solvent's; nothing vanishes.", "Soluble and insoluble are always about a solute in a particular solvent."]);

E("s7-u3-solution-states", 3, ["SC7.7.3"], 2, "var", varset([
  function () {
    return mcq("Which list matches each solution to its solute and solvent states correctly?",
      "Brass: solid in solid. Soda water: gas in liquid. Air: gas in gas. Antifreeze: liquid in liquid",
      ["Brass: liquid in solid. Soda water: liquid in gas. Air: gas in liquid. Antifreeze: solid in liquid",
       "Brass: solid in solid. Soda water: solid in liquid. Air: liquid in gas. Antifreeze: gas in liquid",
       "All four are solid in liquid, because solutions are made in beakers"],
      "Solutions form between all three states of matter. Brass is zinc (solid) dissolved in copper (solid); soda water is carbon dioxide (gas) in water (liquid); air is gases dissolved in nitrogen (gas); antifreeze is alcohol (liquid) in water (liquid). Most classroom solutions are solid in liquid, but they are not the only kind.",
      {});
  }
]), ["Work through the four examples one state pair at a time.", "Brass is the giveaway: a solution can be solid."]);

E("s7-u3-cr-dissolving", 3, ["SC7.7.3"], 3, "var", varset([
  function () {
    return textq("A student stirs drink crystals into water and the colour spreads evenly through the whole glass. (a) Explain what is happening at the particle level. (b) Name the solute and the solvent. (c) The student then stirs sand into a second glass and it settles at the bottom. Explain why the sand behaves differently. (3 marks)",
      ["particles spread evenly among water particles", "drink crystals solute, water solvent", "sand is insoluble"],
      "<b>Model answer:</b> (a) The drink crystals' particles separate from one another and spread evenly among the water particles, which is dissolving; the even spread is why the colour is uniform throughout. (b) The drink crystals are the solute and the water is the solvent. (c) Sand is insoluble in water: its particles do not separate and spread among the water particles, so they stay together and settle. Dissolving depends on the particular solute and solvent pair, not on stirring alone.<br><br><b>Marking points:</b> 1 mark for the particle-level account of dissolving; 1 mark for solute and solvent named correctly; 1 mark for the sand explained as insoluble in water.",
      {});
  }
]), ["Particles first, names second, the contrast case last.", "Insoluble means the particles never separate into the solvent."]);

/* ---------- SC7.7.4 Concentration ---------- */
E("s7-u3-conc-compare", 3, ["SC7.7.4"], 2, "gen", function () {
  var cases = [
    { ctx: "Three drink mixes are made with powder and water", vessels: [{ label: "Mix A", solute: 20, vol: 100 }, { label: "Mix B", solute: 10, vol: 100 }, { label: "Mix C", solute: 20, vol: 200 }], key: "Mix A", why: "A and C hold the same amount of powder, but A has it in half the water, and B has half the powder in the same water as A" },
    { ctx: "Three lab solutions of the same solute are prepared", vessels: [{ label: "Solution A", solute: 15, vol: 100 }, { label: "Solution B", solute: 15, vol: 50 }, { label: "Solution C", solute: 30, vol: 200 }], key: "Solution B", why: "B holds A's amount of solute in half the water; C's larger amount is spread through twice the water, matching A" },
    { ctx: "Three juice jugs are mixed for a class party", vessels: [{ label: "Jug A", solute: 40, vol: 200 }, { label: "Jug B", solute: 25, vol: 100 }, { label: "Jug C", solute: 10, vol: 100 }], key: "Jug B", why: "per 100 mL, A works out to 20 g, B is 25 g, and C is 10 g" }
  ];
  var c = pick(cases);
  var others = c.vessels.map(function (v) { return v.label; }).filter(function (n) { return n !== c.key; });
  var q = mcq(c.ctx + ". Which is the most concentrated?",
    c.key, others.concat(["All three are equally concentrated"]),
    "Concentration compares amount of solute per amount of solvent, so the amounts must be brought to a common volume before judging. Here, " + c.why + ", which makes " + c.key + " the most concentrated. Judging by the solute amount alone, without the water it is dissolved in, is the error the distractors are built on.",
    {});
  q.figure = s7ConcentrationSVG(c.vessels);
  return q;
}, ["Bring every vessel to the same volume of water before comparing.", "Solute amount alone does not decide; amount per volume does."]);

E("s7-u3-saturated", 3, ["SC7.7.4"], 1, "var", varset([
  function () {
    return mcq("A student adds sugar to water and stirs. At first all the sugar dissolves; after several spoonfuls, sugar sits at the bottom no matter how long she stirs. The solution is now",
      "saturated, because it holds all the solute it can dissolve at that temperature",
      ["concentrated, because it has a lot of sugar in it",
       "insoluble, because no more sugar can ever be added",
       "a heterogeneous mixture, because the solution part changed class"],
      "A saturated solution holds the maximum amount of solute it can dissolve at that temperature; extra solute stays undissolved. Before that point the solution was unsaturated. Saturated is about the limit, not about strength in general: a saturated solution of a slightly soluble substance can still be very dilute.",
      {});
  },
  function () {
    return mcq("Which statement about concentrated and saturated is correct?",
      "A solution can be concentrated and still unsaturated, if it holds a lot of solute but could dissolve more",
      ["Concentrated and saturated are two words that mean exactly the same thing in science",
       "A saturated solution is always dilute, because being saturated means holding very little solute",
       "An unsaturated solution can never be a concentrated one, by definition"],
      "The two pairs of terms answer different questions. Dilute and concentrated compare how much solute is present; unsaturated and saturated ask whether more could still dissolve. A strong solution that could take still more solute is concentrated and unsaturated at once.",
      {});
  }
]), ["Saturated is about the limit; concentrated is about the amount.", "A solution can be concentrated and unsaturated at the same time."]);

E("s7-u3-conc-change", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    return mcq("A cook simmers an open pan of sauce for an hour. The sauce tastes stronger at the end, though nothing was added. Why is it more concentrated?",
      "Water evaporated from the sauce, so the same amount of flavouring is dissolved in less solvent",
      ["Simmering slowly creates more flavouring particles in the pan as the sauce cooks",
       "The heat of the stove dissolved part of the pan into the sauce",
       "Stirring the sauce forced more air into it while it simmered"],
      "Concentration can rise two ways: add solute, or remove solvent. Simmering removes water by evaporation, leaving the same solute in less solvent, which is exactly the guide's example. No new flavouring was created.",
      {});
  },
  function () {
    return mcq("A drink mix tastes too strong. Which change dilutes it, and what happens to its concentration?",
      "Add more water; the same solute is spread through more solvent, so the concentration falls",
      ["Add more powder; the concentration falls because there is more mixture",
       "Let it sit undisturbed; concentrations always fall on their own over time",
       "Pour half of it away; the concentration of the rest falls by half"],
      "Diluting means adding solvent: the solute amount stays the same while the volume grows, so the amount per volume falls. Pouring half away changes the amount of solution, not its concentration; what remains tastes exactly as strong.",
      {});
  }
]), ["Concentration changes by adding solute or by changing the solvent amount.", "Removing solvent concentrates; adding solvent dilutes."]);

E("s7-u3-cr-concentration", 3, ["SC7.7.4"], 3, "var", varset([
  function () {
    return textq("Two sports drinks are mixed. Drink A uses 30 g of powder in 200 mL of water. Drink B uses 20 g of powder in 100 mL of water. Which drink is more concentrated? Prove your answer by comparing the two at a common volume. (3 marks)",
      ["B is more concentrated", "per 100 mL: A is 15 g, B is 20 g", "common volume comparison"],
      "<b>Model answer:</b> Drink B is more concentrated. Compared at a common volume of 100 mL of water: Drink A carries 30 g in 200 mL, which is 15 g per 100 mL; Drink B carries 20 g per 100 mL. Since 20 g per 100 mL is more solute per volume than 15 g per 100 mL, B is the more concentrated drink, even though A used more powder in total.<br><br><b>Marking points:</b> 1 mark for B named as more concentrated; 1 mark for both amounts expressed at a common volume (15 g per 100 mL against 20 g per 100 mL, or an equivalent scaling); 1 mark for the conclusion tied to amount per volume rather than total amount.",
      {});
  }
]), ["Do not judge by the total powder; scale both to the same volume.", "Per 100 mL is the common volume the guide itself uses."]);

/* ---------- SC7.7.5 Factors affecting solubility ---------- */
E("s7-u3-solubility-temp", 3, ["SC7.7.5"], 1, "var", varset([
  function () {
    return mcq("As the temperature of water increases, what generally happens to the solubility of a solid solute and of a gas solute?",
      "The solid's solubility generally increases; the gas's solubility generally decreases",
      ["Both generally increase steadily as the temperature of the water rises",
       "Both generally decrease steadily as the temperature of the water rises",
       "The solid's generally decreases; the gas's generally increases"],
      "Temperature pushes the two solute kinds opposite ways. Most solids dissolve more in warmer water, which is why sugar dissolves faster and further in hot tea. Gases dissolve less in warmer water, which is why a warm soft drink loses its fizz. The guide states both as general rules; a few solids, like table salt, barely change.",
      {});
  }
]), ["Solids and gases answer temperature in opposite directions.", "Warm water holds more solid but less gas."]);

E("s7-u3-solubility-pressure", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return mcq("A sealed bottle of pop is opened and hisses. Over the next hour the pop goes flat. Which explanation is correct?",
      "Opening the bottle drops the pressure, so the carbon dioxide's solubility falls and the gas escapes from solution",
      ["Opening the bottle lets air rush in, and the incoming air pushes the carbon dioxide out of the pop",
       "The carbon dioxide reacts with the sugar in the pop once the bottle has been opened",
       "The pop warms up instantly on opening, and warm pop cannot hold any dissolved gas"],
      "Inside the sealed bottle, high pressure keeps extra carbon dioxide dissolved. Opening releases the pressure, the gas's solubility drops, and the excess gas comes out of solution as bubbles until the pop is flat. Pressure affects the solubility of gases; it has no comparable effect on solids.",
      {});
  },
  function () {
    return mcq("Two identical bottles of pop are opened at the same time. One is left on a warm counter; the other goes straight into a refrigerator. Which goes flat faster, and why?",
      "The warm one, because a gas's solubility decreases as temperature rises, so its carbon dioxide escapes sooner",
      ["The cold one, because cold liquids release their dissolved gas more easily",
       "Both at the same rate, because temperature does not affect how gases behave in solution",
       "The warm one, because the heat creates extra carbon dioxide inside the pop"],
      "Both bottles lost their pressure when opened. The warm bottle also fights temperature: warmer liquid holds less dissolved gas, so its carbon dioxide comes out of solution faster. The refrigerated bottle keeps more of its fizz for longer.",
      {});
  }
]), ["Pressure holds gas in; opening the bottle lets it drop.", "For gases, warmth also pushes them out of solution."]);

E("s7-u3-cr-solubility", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return textq("Explain why a bottle of pop that has been opened and left in a warm room goes flat much faster than a sealed bottle kept in the refrigerator. Use both factors that affect the solubility of a gas. (2 marks)",
      ["opening drops pressure, gas solubility falls", "warmth lowers gas solubility further"],
      "<b>Model answer:</b> Two factors work together. First, pressure: the sealed bottle holds carbon dioxide in solution under high pressure; opening it drops the pressure, so the gas's solubility falls and carbon dioxide escapes. Second, temperature: a gas's solubility decreases as temperature rises, so the warm room drives more gas out, while the refrigerator's cold keeps more gas dissolved. The sealed, cold bottle keeps both factors working in its favour.<br><br><b>Marking points:</b> 1 mark for the pressure factor correctly applied; 1 mark for the temperature factor correctly applied to a gas.",
      {});
  }
]), ["Two factors, both about gases: pressure and temperature.", "Opening drops the pressure; warmth lowers the solubility further."]);

/* ---------- SC7.7.6 Separation methods matched to mixtures ---------- */
E("s7-u3-method-match", 3, ["SC7.7.6"], 1, "gen", function () {
  var cases = [
    { s: "sand mixed into water", key: "Filtration", d: ["Distillation", "Paper chromatography", "Magnetism"] },
    { s: "salt dissolved in water, when only the salt is needed", key: "Evaporation", d: ["Filtration", "Mechanical sorting", "Flotation"] },
    { s: "iron filings mixed with sand", key: "Magnetism", d: ["Filtration", "Evaporation", "Paper chromatography"] },
    { s: "the colours mixed in a drop of black ink", key: "Paper chromatography", d: ["Filtration", "Distillation", "Mechanical sorting"] },
    { s: "alcohol mixed with water, when both liquids are needed", key: "Distillation", d: ["Evaporation", "Filtration", "Magnetism"] },
    { s: "cranberries mixed with small stones of the same size", key: "Flotation", d: ["Screening", "Magnetism", "Evaporation"] }
  ];
  var c = pick(cases);
  return mcq("Which separation method fits this mixture: " + c.s + "?",
    c.key, c.d,
    "Each method exploits a property difference. Filtration catches an undissolved solid in a liquid; evaporation removes a solvent to leave a dissolved solid; distillation recovers liquids by boiling point; magnetism pulls out a magnetic component; flotation separates by what floats; paper chromatography separates by how far components travel in a solvent.",
    {});
}, ["Name the property difference the method exploits.", "Undissolved solid: filter. Dissolved solid: evaporate. Two liquids: distill."]);

E("s7-u3-method-property", 3, ["SC7.7.6"], 2, "var", varset([
  function () {
    return mcq("A student tries to separate sugar water by pouring it through a coffee filter. The filtrate still tastes sweet. Why did filtration fail?",
      "Dissolved sugar particles are far too small to be trapped by the filter; filtration only separates undissolved solids from liquids",
      ["The filter paper was the wrong colour for separating sugar from water",
       "Sugar water is too heavy for a filter to hold back, so it breaks through the paper under its own weight",
       "The sugar dissolved the filter paper itself as the sweet water passed through it"],
      "A filter is a particle-size barrier: it stops pieces large enough to see and lets liquid and anything dissolved in it pass through. Dissolved sugar is spread at the particle level, so it passes with the water. Evaporation or distillation, which exploit the boiling point difference, are the methods that fit a solution.",
      {});
  },
  function () {
    return mcq("A magnet separates iron filings from sand easily, but cannot separate salt from sand. What property decides whether magnetism works?",
      "Whether one component of the mixture is magnetic; salt is not, so the magnet has nothing to pull",
      ["Whether the two components of the mixture differ in colour from each other",
       "Whether the mixture is a homogeneous or a heterogeneous one",
       "Whether the components were mixed together by hand or by a machine"],
      "Every separation method works on a property difference. Magnetism needs a magnetic component: iron filings respond, salt and sand do not. Salt and sand are separated instead by dissolving the salt in water, filtering out the sand, and evaporating the water, using solubility and boiling point differences.",
      {});
  }
]), ["A failed method usually means the property difference was not there.", "Filters catch size; magnets need magnetism; solutions need boiling point methods."]);

E("s7-u3-cr-separate", 3, ["SC7.7.6"], 3, "var", varset([
  function () {
    return textq("A mixture of sawdust and water must be separated so that both the sawdust and the water are recovered clean. Describe the method you would use and explain, in terms of the components' properties, why it works. (3 marks)",
      ["filtration", "sawdust is an undissolved solid", "water passes through the filter"],
      "<b>Model answer:</b> Use filtration. Pour the mixture through filter paper in a funnel. The sawdust is an undissolved solid whose pieces are far too large to pass through the paper's pores, so it is caught and can be dried and recovered. The water passes through as the filtrate and is collected below. The method works because the mixture pairs a liquid with an undissolved solid of much larger particle size; it would not work if the solid were dissolved.<br><br><b>Marking points:</b> 1 mark for filtration chosen; 1 mark for the property reasoning (undissolved solid, pieces too large for the pores); 1 mark for both components accounted for (sawdust caught, water collected as filtrate).",
      {});
  }
]), ["Choose the method, then defend it with a property.", "Both recovered components must be accounted for."]);

/* ---------- SC7.7.7 Common techniques; choosing a technique ---------- */
E("s7-u3-home-techniques", 3, ["SC7.7.7"], 1, "gen", function () {
  var cases = [
    { s: "straining cooked spaghetti in a colander", key: "Filtration (a coarse filter separates solid from liquid)", d: ["Evaporation (the liquid slowly leaves as a vapour)", "Distillation (the liquid is boiled and its vapour condensed)", "Paper chromatography (the parts spread out along paper)"] },
    { s: "skimming the fat off the top of cooled soup", key: "Mechanical sorting (removing one visible part from another)", d: ["Distillation (the liquid is boiled and its vapour condensed)", "Filtration through paper (the liquid passes and solids are caught)", "Magnetism (one part is pulled out by a magnet)"] },
    { s: "hanging wet clothes on a line until they are dry", key: "Evaporation (the water leaves as vapour)", d: ["Filtration (a filter catches the solid part)", "Paper chromatography (the parts spread out along paper)", "Flotation (one part floats and is skimmed off)"] },
    { s: "a window screen letting air in but keeping insects out", key: "Screening (a barrier with holes of a chosen size)", d: ["Evaporation (the liquid slowly leaves as a vapour)", "Distillation (the liquid is boiled and its vapour condensed)", "Magnetism (one part is pulled out by a magnet)"] },
    { s: "making coffee by pouring hot water through ground beans in a filter", key: "Filtration (the grounds are caught; the liquid passes)", d: ["Paper chromatography (the parts spread out along paper)", "Evaporation (the liquid slowly leaves as a vapour)", "Mechanical sorting (the parts are picked apart by hand)"] },
    { s: "spinning lettuce in a salad spinner to throw the water off", key: "Mechanical separation (the water is flung off the leaves)", d: ["Distillation (the liquid is boiled and its vapour condensed)", "Filtration through paper (the liquid passes and solids are caught)", "Evaporation (the liquid slowly leaves as a vapour)"] }
  ];
  var c = pick(cases);
  return mcq("Which separation technique is at work here: " + c.s + "?",
    c.key, c.d,
    "Separation techniques run all through a home. A colander and a coffee filter both filter; skimming and spinning sort mechanically; drying clothes evaporates water; a screen separates by size. Naming the technique means naming the property it uses: particle size, state, or visibility.",
    {});
}, ["Ask what is being separated from what, and by which property.", "Holes that catch solids are filtration or screening; water leaving as vapour is evaporation."]);

E("s7-u3-choose-technique", 3, ["SC7.7.7"], 2, "var", varset([
  function () {
    return mcq("A gardener has topsoil mixed with small stones and wants the stones out before planting. Both are dry solids of similar colour, but the stones are larger. Which technique fits best?",
      "Screening the soil through a mesh the soil passes and the stones do not",
      ["Dissolving the whole mixture in water and then filtering it",
       "Passing a strong magnet slowly over the whole mixture",
       "Spreading the mixture out and evaporating it in the sun"],
      "The usable property difference is particle size, and screening exploits exactly that: soil grains pass the mesh, stones stay behind. Neither solid is magnetic, nothing needs dissolving, and evaporation separates liquids from solids, not two dry solids.",
      {});
  },
  function () {
    return mcq("A cook has accidentally poured salt into the sugar bowl. Both are white crystals of similar size, and both must be recovered if possible. Which plan has the best chance?",
      "Dissolve the mixture in water, then use the difference in how much of each the water can hold and careful evaporation and crystallization steps, accepting the separation is difficult",
      ["Screen the mixture through a fine kitchen sieve to separate the two kinds of crystals by their slightly different sizes",
       "Pass a strong magnet slowly through the bowl again and again to lift out all of the salt, leaving the clean sugar behind in the bowl ready to use",
       "Filter the dry mixture through paper to catch the salt crystals, wash them off the paper with a little water, and dry both parts out again afterward"],
      "Salt and sugar defeat the simple methods: similar size rules out screening, neither is magnetic, and dry filtration separates solids from liquids, not two solids. Their solubilities differ, which gives a solution-based plan a chance, but this is genuinely one of the hard separations, which is why the guide asks students to consider mixtures that resist separating.",
      {});
  }
]), ["Start from the property difference you actually have.", "Similar size and no magnetism rules out the quick methods; say so when it is so."]);

E("s7-u3-cr-three-part", 3, ["SC7.7.7"], 3, "var", varset([
  function () {
    return textq("A jar holds a mixture of salt, sand and water. Describe, in order, the steps you would take to recover the salt and the sand separately, naming the technique used at each step. (3 marks)",
      ["filter out the sand", "evaporate the water from the filtrate", "salt remains"],
      "<b>Model answer:</b> Step 1, filtration: pour the mixture through filter paper. The sand is an undissolved solid and is caught by the paper; the salt is dissolved and passes through with the water. Wash the sand on the paper with a little clean water and let it dry; it is recovered. Step 2, evaporation: heat the filtrate (or leave it in a warm place) so the water evaporates, leaving the salt behind as crystals. The two techniques work on two different properties: particle size for the sand, and the boiling point difference between water and salt for the salt.<br><br><b>Marking points:</b> 1 mark for filtration first, separating the undissolved sand; 1 mark for evaporation of the filtrate to recover the salt; 1 mark for the order being workable (the sand must come out before evaporation, or the salt would crystallize into the sand).",
      {});
  }
]), ["Order matters: the undissolved solid comes out first.", "Filter, then evaporate. Evaporating first would trap the salt in the sand."]);

/* ---------- SC7.8.1 Distillation science ---------- */
E("s7-u3-distill-parts", 3, ["SC7.8.1"], 1, "var", varset([
  function () {
    return mcq("In a distillation apparatus separating salt water, where do boiling, evaporation and condensation each happen?",
      "The solution boils in the heated flask; the water evaporates from the solution's surface and as vapour; the vapour condenses back to liquid in the cooled condenser",
      ["Everything happens inside the condenser, which does all three of the jobs by itself",
       "Boiling happens in the receiving flask; condensation happens in the heated flask; evaporation happens in the condenser tube as well",
       "Evaporation happens in the receiving flask, after the liquid water has arrived there and settled"],
      "Distillation chains the changes of state in order. Heat boils the solution in the first flask and the solvent evaporates as vapour, leaving the solute behind. The vapour travels into the cooled condenser, where it condenses back to liquid and drips into the receiving flask. Both parts are recovered: the solvent as the distillate, the solute left in the first flask.",
      {});
  },
  function () {
    return mcq("Which parts of a solution does simple distillation recover?",
      "Both: the solvent is collected as the distillate and the solute remains in the boiling flask",
      ["Only the solvent is recovered; the solute is destroyed by the heat of boiling",
       "Only the solute is recovered; the solvent is lost as vapour into the air",
       "Neither part; distillation only works on mechanical mixtures, not on solutions"],
      "Recovering both parts is distillation's advantage over plain evaporation, which recovers the solute but loses the solvent to the air. In salt water distillation, pure water collects in the receiving flask and the salt stays behind in the first flask.",
      {});
  }
]), ["Follow the vapour: boiled off, travelled, condensed, collected.", "Both parts survive distillation; that is its advantage over evaporation alone."]);

E("s7-u3-distill-vs-evap", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return mcq("Evaporation and distillation both separate a solvent from a dissolved solute. What does distillation add that evaporation does not have?",
      "Condensation: the vapour is cooled and collected, so the solvent is recovered as a liquid",
      ["Filtration: the boiling solution is filtered through paper as it boils",
       "A magnet: the dissolved solute is pulled out of the liquid during boiling",
       "Chromatography: the components separate from each other along a tall column"],
      "Evaporation lets the solvent escape into the air; only the solute is recovered. Distillation captures the vapour and condenses it, so the solvent is recovered too. Condensation is the step that belongs to distillation and not to evaporation alone.",
      {});
  }
]), ["One word separates the two methods: condensation.", "Evaporation loses the solvent; distillation collects it."]);

E("s7-u3-cr-distill", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return textq("Explain how a distillation apparatus separates a salt water solution into pure water and salt. Your explanation must use the terms boiling, evaporation and condensation correctly. (2 marks)",
      ["solution boils, water evaporates as vapour", "vapour condenses in the condenser", "salt remains in the flask"],
      "<b>Model answer:</b> The salt water is heated until it boils. The water evaporates, turning to vapour and leaving the dissolved salt behind in the flask, because the salt does not evaporate with it. The vapour passes into a cooled condenser, where it undergoes condensation back into liquid water, which drips into a receiving flask as pure water (the distillate). The salt remains in the original flask, so both parts of the solution are recovered.<br><br><b>Marking points:</b> 1 mark for evaporation of the water with the salt left behind; 1 mark for condensation of the vapour in the condenser, collected as pure water.",
      {});
  }
]), ["Boil, evaporate, travel, condense, collect.", "The salt never leaves the first flask."]);

/* ---------- SC7.8.2 How separation techniques evolved ---------- */
E("s7-u3-fractional", 3, ["SC7.8.2"], 1, "var", varset([
  function () {
    return mcq("How does fractional distillation go beyond simple distillation?",
      "It separates a mixture of several liquids from each other, using their different boiling points, instead of separating one solute from one solvent",
      ["It uses a much stronger flame under the flask, so the boiling happens faster and harder",
       "It filters the vapour as it rises, catching impurities in a series of trays and screens stacked inside a tall column",
       "It works without any heating at all, using gravity alone to pull the liquids apart"],
      "Simple distillation handles one dissolved solute and its solvent. Fractional distillation, the refining technique used on crude oil, separates many liquids in one process: each component boils at its own temperature and is condensed and collected in turn. That is the evolution the indicator names: from separating a solution to refining a complex liquid mixture.",
      {});
  }
]), ["Simple: one solute from one solvent. Fractional: many liquids from each other.", "Different boiling points do the sorting in a fractional column."]);

E("s7-u3-refining-evolve", 3, ["SC7.8.2"], 2, "var", varset([
  function () {
    return mcq("Which account of how separation techniques developed is most accurate?",
      "They evolved by trial and error over a long time: simple methods for simple mixtures came first, and techniques like fractional distillation were developed when industries needed to separate complex mixtures like crude oil",
      ["They were all invented at the same moment, when the first proper chemistry laboratory was built and staffed",
       "They have not changed at all since ancient times, because mixtures themselves have not changed in any way that matters",
       "Each technique was designed on paper first, with every step calculated in advance by scientists, and only then was it tried on real mixtures in workshops and factories around the world"],
      "The guide describes separation technology as developed through trial and error. Settling, sifting and simple distillation are ancient; fractional distillation arrived with the petroleum industry's need to split crude oil into useful fractions, and modern water treatment chains several techniques in sequence. Need drove each step.",
      {});
  }
]), ["Trial and error, driven by need, over a long time.", "Crude oil is the case that forced fractional distillation into being."]);

/* ---------- SC7.8.3 Examples affecting our lives ---------- */
E("s7-u3-lives-examples", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Which example best shows the science of mixtures and solutions at work in daily life?",
      "A water treatment plant filtering and treating river water so a town can drink it safely",
      ["A library sorting all of its books by the author's last name",
       "A baker choosing a cake recipe from a book and baking the cake for a birthday",
       "A hockey team practising its passing drills at the arena"],
      "Water purification is one of the guide's named examples: a town's drinking water is a mixture problem solved by separation science, screening, filtering and treating. Sewage treatment, solvents lifting stains from clothes, recycling depots sorting materials, and screening topsoil are the guide's other examples of the same science at work.",
      {});
  },
  function () {
    return mcq("A dry cleaner uses a solvent to lift grease stains out of a jacket. Which idea from this unit is the cleaner relying on?",
      "A grease that will not dissolve in water can dissolve in a different solvent; choosing the solvent is applied solution science",
      ["Grease is a pure substance, so given enough time it will leave the fabric entirely on its own",
       "The solvent evaporates the fibres of the jacket itself along with all of the grease in the stain",
       "Stains are heterogeneous mixtures, so they can simply be picked off the surface of the fabric by hand"],
      "Dissolving depends on the solute-solvent pair. Grease is insoluble in water but soluble in the dry cleaner's solvent, so the solvent carries it out of the fabric. The guide lists stain extraction among its examples of mixtures science affecting daily life.",
      {});
  }
]), ["Look for a mixture being made, separated, or used on purpose.", "Water treatment and stain extraction are the guide's own examples."]);

E("s7-u3-lives-effects", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Smog hanging over a city is best described as which kind of effect of mixtures in our lives?",
      "An unintended one: exhaust gases and particles mix with air as a by-product of activities people value, not as a goal",
      ["An intended one: cities produce smog on purpose, to mark the boundaries of the city clearly",
       "A positive one: smog hanging over a city shows that the air is being cleaned by the traffic",
       "No effect at all: smog is a pure substance, not a mixture of anything"],
      "The guide asks students to notice that effects of mixture science can be intentional or unintentional. Smog is a mixture of exhaust gases and particles in air, produced as a side effect of driving and industry. Nobody aims to make it, which is what unintended means here; road salt's safety benefit, by contrast, is intended, while its corrosion is not.",
      {});
  }
]), ["Ask whether anyone meant for the effect to happen.", "Intended effects are goals; unintended effects are side effects."]);

/* ---------- SC7.8.4 Effects of salt on highways ---------- */
E("s7-u3-salt-positive", 3, ["SC7.8.4"], 1, "var", varset([
  function () {
    return mcq("Which is a positive, intended effect of spreading salt on highways in winter?",
      "Salt lowers the freezing point of water on the road, melting ice and giving tires traction, which reduces collisions",
      ["Salt scattered on the road washes into the soil and makes roadside plants grow faster in spring",
       "Salt protects cars and trucks from rusting through the winter",
       "Salt cleans and purifies the drinking water that people draw from nearby wells"],
      "The intended benefit is safety: dissolved salt depresses water's freezing point, so ice melts (down to salt's practical limit of -9 °C) and snow does not bond to the pavement, keeping roads passable and reducing skidding and collisions. The other options name effects salt does not have; its real side effects run the other way.",
      {});
  }
]), ["The intended effect is the safety effect.", "Freezing point down, traction up, collisions down."]);

E("s7-u3-salt-negative", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Which list contains only negative, unintended effects of road salt, as the STSE module presents them?",
      "Salt water reaching wells and streams, roadside vegetation dying back, soil hardening, and vehicles and bridges rusting faster",
      ["Fewer collisions on icy roads, passable highways, cheaper winter travel, and safer school bus routes",
       "Salt-tolerant plants moving in along the roads, which most gardeners prefer",
       "Animals finding a mineral they need at the roadside, with no other consequence for anyone"],
      "The module itemizes the harms: dissolved salt reaches surface and groundwater (drinking water and aquatic life suffer), soil hardens and loses fertility, roadside vegetation is damaged, wildlife is drawn to roadsides and into traffic, and salt dramatically speeds rusting of vehicles and damages concrete bridges. Even the animal item is double-edged in the module: the salt itself is not poison, but the collisions are the harm.",
      {});
  }
]), ["Sort by the module's own problem list, not by first impressions.", "Water, soil, vegetation, wildlife, corrosion: the harm list."]);

E("s7-u3-salt-classify-effects", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("A town notices two results of its road salt use: emergency calls for winter collisions fall by a third, and the lilies in the ditch beside the highway die back every spring. How are the two results classified?",
      "The collision drop is a positive intended effect; the dying lilies are a negative unintended effect",
      ["Both results are positive intended effects of salting",
       "Both results are negative unintended effects of salting",
       "The collision drop is an unintended effect; the dying lilies are an intended one"],
      "Effects are classified on two axes at once: positive or negative, and intended or unintended. Safer roads are the whole point of salting: positive and intended. The damaged roadside vegetation is a harm nobody aimed at: negative and unintended. Most real technologies carry both kinds, which is why the decision indicator asks for them separated out.",
      {});
  }
]), ["Two axes: good or bad, and meant or not meant.", "Safety is meant; ditch damage is not."]);

/* ---------- SC7.8.5 Better road deicing technologies ---------- */
E("s7-u3-deicer-compare", 3, ["SC7.8.5"], 2, "gen", function () {
  var cases = [
    { s: "a night when the temperature falls to -20 °C and the roads must be treated", key: "Calcium chloride, because it keeps working down to about -29 °C while sodium chloride stops being effective below about -9 °C", d: ["Sodium chloride, because it is the cheapest of the chemicals and the one every crew knows best", "Ammonium sulfate, because it also fertilizes the plants along the roadside while it melts the ice on the road", "Potassium acetate, because it is biodegradable and gentle on everything nearby"] },
    { s: "a road running beside a reservoir that supplies a town's drinking water", key: "Potassium acetate where budgets allow, because it is biodegradable, used with sand for traction", d: ["Extra sodium chloride, applied early in the storm and often afterward", "Calcium chloride spread at double the usual rate everywhere", "Ammonium sulfate, because it is also a fertilizer and would feed the plants by the reservoir"] },
    { s: "a highway department that needs ice melted as fast as possible during a storm", key: "Calcium chloride or magnesium chloride, because both melt ice faster than sodium chloride", d: ["Sodium chloride alone, because nothing else in the table melts ice any faster", "Ammonium sulfate, because it is the fastest melter in the table", "No chemical at all, because chemicals only prevent ice, never melt it"] }
  ];
  var c = pick(cases);
  return mcq("Using the de-icing chemicals table from the road salt module, which choice fits this situation best: " + c.s + "?",
    c.key, c.d,
    "The table's numbers decide. Sodium chloride's practical limit is about -9 °C; calcium chloride works to about -29 °C and melts faster, as does magnesium chloride (to about -15 °C). Potassium acetate is the biodegradable option near sensitive water, though it is corrosive and costly. Ammonium sulfate's fertilizer bonus does not make it a strong melter, and it damages concrete.",
    {});
}, ["Read the condition first, then the table's temperatures and disadvantages.", "Below -9 °C, plain salt is out of its range."]);

E("s7-u3-deicing-improve", 3, ["SC7.8.5"], 1, "var", varset([
  function () {
    return mcq("Which practice is an improvement in de-icing that came from understanding solutions, as the module presents it?",
      "Anti-icing: using Road Weather Information Systems to apply salt before snow bonds to the road, forming a brine layer that plows clear easily, so less salt is needed overall",
      ["Applying twice as much salt after every winter storm, just in case the first application was not enough to clear the road completely and safely",
       "Mixing all five de-icing chemicals together in one load so that at least one of them is sure to work",
       "Salting a road only after accidents have already been reported on it by drivers"],
      "The improvement is timing informed by science and data. Salt spread at a storm's start prevents bonding and creates a brine that clears easily; pre-wetting helps it stick and start working; and this province's Road Weather Information Systems tell crews when and where treatment will pay. The result the module stresses: the same safety with less salt and less harm.",
      {});
  }
]), ["The improvement is when and how, not just how much.", "Before the bond forms beats after: anti-icing, pre-wetting, weather data."]);

E("s7-u3-salt-science", 3, ["SC7.8.5"], 3, "var", varset([
  function () {
    return mcq("Freezing point depression depends on the number of particles a substance dissolves into, not on the type of particle. Sodium chloride dissolves into 2 particles per unit; calcium chloride into 3. What does this predict, and does the module's table agree?",
      "Calcium chloride should lower water's freezing point more than sodium chloride, and it does: its practical limit is about -29 °C against salt's -9 °C",
      ["Sodium chloride should work to the lower temperature, because it is far more common and more familiar to road crews",
       "Both should stop working at exactly the same temperature, because the particle counts do not matter at all",
       "Calcium chloride should work better only in its powder form, not once it has dissolved as a solution"],
      "More dissolved particles per unit means a larger freezing point depression. Calcium chloride's three particles beat sodium chloride's two, which is exactly why the table gives calcium chloride the far lower working temperature. This particle-count understanding is what let engineers choose and improve de-icing chemicals on evidence rather than habit.",
      {});
  }
]), ["The property is a particle count, not a particle type.", "Three particles per unit depress the freezing point more than two."]);

/* ---------- SC7.8.6 The road salt decision ---------- */
E("s7-u3-salt-adv", 3, ["SC7.8.6"], 2, "var", varset([
  function () {
    return mcq("Which statement fairly states the strongest point on the 'keep road salt as the main de-icer' side of the decision?",
      "Salt is inexpensive, available in huge quantities, familiar to every road crew, and proven to cut winter collisions; no alternative matches all four at once",
      ["Salt has no negative effects of any kind, so there is nothing at all on the other side of the decision to weigh",
       "Salt is the only substance that can melt ice at any temperature, and it keeps working no matter how cold the night becomes",
       "Alternatives to salt have never been tested anywhere in the world at any time"],
      "A fair decision starts by stating each side at its strongest. Salt's case is practical: cheap, abundant, understood, and effective for safety in the temperature range where most winter driving happens. Its limits are also real (it fails below about -9 °C and carries the harms the module lists), which is what the other side weighs.",
      {});
  },
  function () {
    return mcq("Which statement fairly states the strongest point on the 'reduce road salt use' side of the decision?",
      "Salt's harms accumulate in wells, streams, soil and vehicles year after year, and better timing, pre-wetting and weather information can hold much of the safety benefit with considerably less salt",
      ["Salt never improves safety at all, so nothing would be lost by stopping its use completely and relying only on plows, sand and slower driving from now on",
       "Roads in winter were safer for everyone before road salt was ever invented and used",
       "Every alternative is cheaper than salt in every situation, easier to spread, and just as quick to melt ice on any road in any weather"],
      "The reduction case is not that salt does nothing; it is that its environmental and corrosion costs are cumulative, while modern practice (anti-icing, RWIS timing, pre-wetting, faster chemicals for the coldest nights) can keep most of the safety with less salt spread. Stating the other side fairly means granting salt its real safety record.",
      {});
  }
]), ["State each side at its strongest; that is what a fair decision needs.", "Cheap and proven against cumulative harm and smarter use."]);

E("s7-u3-cr-salt-decision", 3, ["SC7.8.6"], 3, "var", varset([
  function () {
    return textq("A town council must decide whether to keep road salt as its main de-icing chemical. Make a recommendation for the council and defend it, taking into account the environmental, social and economic advantages and disadvantages of road salt and its alternatives. (3 marks)",
      ["recommendation stated", "environmental effects weighed", "social and economic effects weighed"],
      "<b>Model answer:</b> Recommendation: keep road salt as the main de-icer, but cut the amount through anti-icing practice. Social advantages: salt is proven to reduce winter collisions and keep roads, school routes and emergency access open, which is the council's first duty. Economic advantages: salt is the cheapest de-icer per tonne and is available in the quantities a town needs; the alternatives cost more and some (potassium acetate) far more. Environmental disadvantages: salt reaches wells and streams, hardens soil, damages roadside vegetation and rusts vehicles and bridges, and these harms accumulate. The recommendation answers them directly: Road Weather Information Systems timing, pre-wetting and early application hold the safety benefit with less salt, and calcium chloride covers the nights below salt's -9 °C limit. A recommendation to phase salt out could also earn full marks if it honestly carried the safety and cost consequences and named how they would be met.<br><br><b>Marking points:</b> 1 mark for a clear recommendation; 1 mark for environmental advantages or disadvantages accurately used; 1 mark for social and economic considerations accurately used. Either recommendation can earn full marks; a one-sided answer that ignores a whole category cannot earn the third mark.",
      {});
  }
]), ["Recommend, then weigh: environment, society, cost.", "A decision that ignores a whole category is not yet informed."]);

/* ---------- SC7.9.1 Hypothesis from background or pattern ---------- */
E("s7-u3-hypothesis-pattern", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 8-1C, a class observed that salt dissolved in water but not in oil, and flour dissolved in neither. Which hypothesis does this observed pattern best support for a follow-up test?",
      "Whether a solute dissolves depends on the particular solute and solvent pairing, so a new solute should be tested in both solvents before predicting",
      ["All solutes dissolve in water eventually, as long as they are stirred long enough and the water is given enough time to work on them",
       "Oil dissolves nothing at all, in any amount, no matter what is stirred into it",
       "Flour is not a real solute at all, because it is a food rather than a chemical"],
      "A hypothesis grows out of the pattern actually observed. The pattern here is pairing-dependent: the same solute behaved differently in two solvents, and one solute dissolved in neither. The follow-up hypothesis stays inside that pattern. The other options overclaim beyond the observations (flour never dissolved, and oil was tested with only two solutes).",
      {});
  }
]), ["Build the hypothesis out of what was actually observed, no further.", "Overclaiming past the data is the flaw to watch for."]);

E("s7-u3-hypothesis-form", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("Which statement is a testable hypothesis?",
      "More sugar will dissolve in hot water than in cold water, because temperature generally raises a solid's solubility",
      ["Dissolving is a fascinating process that can be found everywhere in the natural world around us every day",
       "Sugar will do something surprising at some point when it is put in water",
       "Water is the best solvent for everything that needs dissolving"],
      "A testable hypothesis makes a prediction an experiment can judge, with a reason attached: here, a comparison (more in hot than cold) and the general rule behind it. A topic sentence, a prediction too vague to test, and an absolute claim no single test could settle all fail the form.",
      {});
  }
]), ["Prediction plus reason, in a form an experiment can judge.", "Vague and absolute statements cannot be tested."]);

E("s7-u3-hypothesis-background", 3, ["SC7.9.1"], 2, "var", varset([
  function () {
    return mcq("A student notices that sugar vanishes quickly in hot tea but sits in grains in iced tea. She wants to investigate solubility and temperature. Which is the best statement of her hypothesis?",
      "The warmer the water, the more sugar will dissolve in it, up to its saturation point",
      ["Temperature and solubility are related to each other somehow",
       "Hot tea tastes sweeter than iced tea served in a glass",
       "Sugar always dissolves completely and quickly in any drink, whether hot or cold"],
      "Her background observation is a pattern (fast in hot, slow and incomplete in cold), and the hypothesis converts it into a measurable prediction about amount dissolved against temperature. The taste statement is about perception, the vague statement predicts nothing measurable, and the absolute statement is already falsified by her own iced tea.",
      {});
  }
]), ["Convert the noticed pattern into a measurable prediction.", "Amount dissolved against temperature is the measurable form."]);

/* ---------- SC7.9.2 Identify and delimit questions ---------- */
E("s7-u3-delimit", 3, ["SC7.9.2"], 1, "var", varset([
  function () {
    return mcq("A group wants to study 'what affects dissolving?' Which narrowing turns it into one investigable question?",
      "How does the temperature of water affect the amount of salt that dissolves in 100 mL of it?",
      ["What are all the factors that affect every solute in every solvent?",
       "Why is dissolving important in everyday life?",
       "How do temperature, stirring, particle size and solvent type all affect dissolving at once?"],
      "Delimiting means cutting a broad topic down to one question with one manipulated variable and a measurable outcome: here, temperature against amount dissolved in a fixed volume. The other options stay broad, ask for importance rather than data, or change everything at once so no cause could be identified.",
      {});
  }
]), ["One question, one changed variable, one measurable outcome.", "Changing everything at once identifies nothing."]);

E("s7-u3-delimit-plan", 3, ["SC7.9.2"], 3, "var", varset([
  function () {
    return mcq("A group's question is: 'How does water temperature affect how much sugar dissolves?' Their plan measures the dissolving time for one spoonful of sugar at three temperatures, stirring each cup a different number of times 'to help it along.' What is wrong with the plan against its own question?",
      "The plan measures time, not amount, and lets stirring vary, so it cannot answer a question about how much dissolves",
      ["Nothing is wrong; any plan that uses three different temperatures answers the question fully",
       "The plan uses too many temperatures; two temperatures would always be better",
       "The plan should have used salt instead of sugar as its solute"],
      "A delimited question dictates its data. This question asks about amount, so the plan must measure the amount dissolved at saturation at each temperature, with stirring (and volume, and sugar type) held the same. Measuring a different variable with a second variable left loose means the results cannot speak to the question, however carefully they are recorded.",
      {});
  }
]), ["Hold the plan against its own question: does it measure what the question asks?", "Amount asked, amount must be measured; every other factor held."]);

/* ---------- SC7.9.3 Line of best fit; interpolate and extrapolate ---------- */
E("s7-u3-best-fit", 3, ["SC7.9.3"], 1, "var", varset([
  function () {
    return mcq("What is a line of best fit on a solubility graph?",
      "A straight line drawn through the pattern of the points so it follows the overall trend, with points scattered on either side of it",
      ["A line connecting every single point in order, dot to dot, across the whole graph",
       "A line drawn from the first point straight to the last point, ignoring all of the points in between them",
       "The line that a graph must already have on it before any data are plotted"],
      "The line of best fit represents the trend the data show, passing as close as possible to all the points without necessarily touching each one; points scatter around it because measurements vary. It is the line used for reading off values between and beyond the measured points. Dot-to-dot lines, which the Plateau Problem also rejected, follow noise instead of trend.",
      {});
  }
]), ["Trend, not dot-to-dot.", "The line stands for the pattern; points scatter around it."]);

E("s7-u3-interpolate", 3, ["SC7.9.3"], 2, "gen", function () {
  var series = [
    { name: "Substance K", color: "#b3541e", pts: [[0, 10], [20, 27], [40, 44], [60, 61], [80, 78]] },
    { name: "Substance S", color: "#2e6f8e", pts: [[0, 36], [20, 37], [40, 38], [60, 39], [80, 40]] }
  ];
  var cases = [
    { ask: "Substance K", temp: 50, key: "About 52 g per 100 mL", d: ["About 38 g per 100 mL", "About 44 g per 100 mL", "About 61 g per 100 mL"] },
    { ask: "Substance S", temp: 30, key: "About 38 g per 100 mL", d: ["About 27 g per 100 mL", "About 44 g per 100 mL", "About 52 g per 100 mL"] }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows solubility data for two solutes, with lines of best fit. Using the line of best fit, estimate the solubility of " + c.ask + " at " + c.temp + " °C, a temperature between the measured points.",
    c.key, c.d,
    "Reading a value between measured points from the line of best fit is interpolation. For " + c.ask + " at " + c.temp + " °C, go up from " + c.temp + " on the temperature axis to that solute's line, then across to the solubility axis: " + c.key.toLowerCase() + ". The distractors come from reading the other solute's line or reading a plotted point instead of the line.",
    {});
  q.figure = s7SolubilitySVG(series, 100);
  return q;
}, ["Go up from the temperature to the right solute's line, then across.", "Between measured points is interpolation; use the line, not a nearby point."]);

E("s7-u3-extrapolate", 3, ["SC7.9.3"], 3, "gen", function () {
  var series = [
    { name: "Substance K", color: "#b3541e", pts: [[0, 10], [20, 27], [40, 44], [60, 61], [80, 78]] },
    { name: "Substance S", color: "#2e6f8e", pts: [[0, 36], [20, 37], [40, 38], [60, 39], [80, 40]] }
  ];
  var cases = [
    { ask: "Substance K", temp: 100, key: "About 95 g per 100 mL", d: ["About 78 g per 100 mL", "About 86 g per 100 mL", "About 110 g per 100 mL"] },
    { ask: "Substance S", temp: 100, key: "About 41 g per 100 mL", d: ["About 38 g per 100 mL", "About 52 g per 100 mL", "About 78 g per 100 mL"] }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows solubility data for two solutes, measured up to 80 °C, with lines of best fit. Predict the solubility of " + c.ask + " at " + c.temp + " °C by extending its line of best fit.",
    c.key, c.d,
    "Extending the line of best fit beyond the measured range and reading off a value is extrapolation, the move Core Lab 8-2A asks for at 90 °C. Extending " + c.ask + "'s line to " + c.temp + " °C gives " + c.key.toLowerCase() + ". It is a prediction, not a measurement: it assumes the trend continues, which is why extrapolated values are stated as estimates.",
    {});
  q.figure = s7SolubilitySVG(series, 100);
  return q;
}, ["Extend the line past the last point, then read across.", "Beyond the data is extrapolation: a prediction, stated as an estimate."]);

E("s7-u3-cr-best-fit", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    var q = textq("The graph shows a class's solubility results for Substance K. (a) Describe the trend the line of best fit shows. (b) Use the line to estimate the solubility at 30 °C. (c) Predict the solubility at 90 °C and state what kind of estimate that is. (3 marks)",
      ["solubility increases with temperature", "about 36 g at 30", "about 87 g at 90, extrapolation"],
      "<b>Model answer:</b> (a) As temperature increases, the solubility of Substance K increases steadily; the line of best fit rises in a straight, fairly steep pattern. (b) Reading from the line at 30 °C gives about 36 g per 100 mL of water (accept about 34 to 38 g); this is interpolation, since 30 °C lies between measured points. (c) Extending the line to 90 °C gives about 87 g per 100 mL (accept about 84 to 90 g); this is extrapolation, a prediction beyond the measured range that assumes the trend continues.<br><br><b>Marking points:</b> 1 mark for the trend described (solubility rises with temperature); 1 mark for an interpolated value in range at 30 °C; 1 mark for an extrapolated value in range at 90 °C, identified as a prediction beyond the data.",
      {});
    q.figure = s7SolubilitySVG([
      { name: "Substance K", color: "#b3541e", pts: [[0, 12], [20, 25], [40, 46], [60, 59], [80, 80]] },
      { name: "Substance S", color: "#2e6f8e", pts: [[0, 35], [20, 37], [40, 36], [60, 38], [80, 39]] }
    ], 100);
    return q;
  }
]), ["Trend first, then read the line twice: once inside the data, once beyond it.", "Inside is interpolation; beyond is extrapolation, and it is a prediction."]);

/* ---------- SC7.9.4 Testable hypothesis, temperature and solubility ---------- */
E("s7-u3-hypothesis-temp", 3, ["SC7.9.4"], 1, "var", varset([
  function () {
    return mcq("Core Lab 8-2A asks how temperature affects the solubility of a solid in water. Which is its testable hypothesis in proper form?",
      "As the temperature of the water increases, the amount of solid that dissolves in it will increase",
      ["Temperature will affect the solubility of the solid in some way or other",
       "Solubility is affected by many different factors, including the temperature of the water",
       "Hot water is simply better than cold water for dissolving things"],
      "The hypothesis predicts a direction (increase with increase) for the exact relationship the lab measures, so the data can support or refute it. 'In some way' predicts nothing; the factor list is background, not a prediction; 'better' is a value word, not a measurement.",
      {});
  }
]), ["A direction for the exact relationship being measured.", "Increase with increase: data can judge that."]);

E("s7-u3-variables-solubility", 3, ["SC7.9.4"], 2, "var", varset([
  function () {
    return mcq("In a group's temperature-solubility study, they heat 100 mL of water to several temperatures and add measured spoonfuls of the same solute until no more dissolves. Which variable naming is correct?",
      "Temperature is the manipulated variable; the amount of solute dissolved is the responding variable; water volume and solute type are controlled",
      ["The amount of solute dissolved is the manipulated variable, and the temperature of the water is the responding variable",
       "The water volume is the responding variable, and the stirring is the manipulated variable",
       "Temperature and the amount dissolved are both controlled variables throughout the study"],
      "The group chooses the temperatures (manipulated), measures how much dissolves at each (responding), and holds the water volume and the solute the same so the comparison is fair (controlled). Naming them correctly is what makes the study a test of the hypothesis rather than a demonstration.",
      {});
  }
]), ["What they set, what they measure, what they hold.", "Temperature set; amount measured; volume and solute held."]);

/* ---------- SC7.9.5 Carry out, controlling variables (CORE) ---------- */
// CORE residue: the bank covers designing the controls and judging
// flawed runs. The residue is the carrying out itself: measuring,
// heating and recording the solubility study in the laboratory.
E("s7-u3-controls", 3, ["SC7.9.5"], 1, "var", varset([
  function () {
    return mcq("Which set of controls belongs in a fair temperature-solubility study?",
      "The same volume of water, the same solute, the same spoon for measuring additions, and the same stirring routine at every temperature",
      ["A different solute at each temperature, to widen the study and make the results more interesting and useful overall",
       "Whatever volume of water happens to be convenient at each of the temperatures tested",
       "No stirring at all at the higher temperatures, because the extra heat does all of the stirring work"],
      "Only temperature may change between runs. Volume, solute, measuring tool and stirring all affect how much dissolves or how fast, so each must be held the same; otherwise a difference in the results could belong to any of them instead of to temperature.",
      {});
  }
]), ["Only temperature changes; everything else that could matter is held.", "Volume, solute, spoon, stirring: the control list."]);

E("s7-u3-controls-judge", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return mcq("A group reports: 'At 20 °C, 35 g dissolved in our beaker; at 60 °C, 52 g dissolved, so temperature increased the solubility.' Their notebook shows the 20 °C run used 100 mL of water and the 60 °C run used 150 mL. What should be concluded?",
      "Nothing yet: the larger volume at 60 °C would dissolve more solute on its own, so temperature and volume are confounded and the runs must be redone at one volume",
      ["The conclusion stands as it is, because more solute dissolved at the higher of the two temperatures",
       "The conclusion is wrong; temperature must actually decrease the solubility, and the volume difference has nothing to do with it",
       "The group should just average the two different volumes together and keep their conclusion as written"],
      "A fair test changes one variable. With volume differing alongside temperature, the extra dissolved solute could be the volume's doing, the temperature's, or both; the data cannot separate them. The fix is procedural, not mathematical: rerun both temperatures at the same volume.",
      {});
  }
]), ["Two variables changed; the conclusion can belong to either.", "Confounded data are redone, not averaged."]);

E("s7-u3-cr-design-solubility", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return textq("Design a study to answer this question: how does the temperature of water affect the amount of sugar that will dissolve in it? State your hypothesis, the variables you will change, measure and control, and the procedure you will follow. This design question is for practice and teacher-picked sets; it does not appear in composed unit tests. (4 marks)",
      ["hypothesis: more sugar dissolves as temperature increases", "same volume of water at each temperature", "measure mass dissolved until saturation", "controls: same sugar, same stirring"],
      "<b>Model answer:</b> Hypothesis: as the temperature of the water increases, the amount of sugar that dissolves in it will increase. Changed variable: the water temperature (for example 20, 40, 60 and 80 °C). Measured variable: the mass of sugar dissolved when the solution reaches saturation at each temperature (no more dissolves and a trace remains undissolved). Controlled variables: the same volume of water (100 mL) in each run, the same sugar, the same stirring routine, the same spoon and balance. Procedure: measure 100 mL of water, bring it to the first temperature and record it, add sugar a measured spoonful at a time, stirring after each, until no more dissolves; record the total mass added; repeat at each temperature, and repeat the whole study once to check the results.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis with a direction; 1 mark for temperature as the changed variable and dissolved amount as the measured variable; 1 mark for at least three controls (volume, solute, stirring, equipment); 1 mark for a workable saturation procedure (measured additions until no more dissolves, at each temperature).",
      {});
  }
]), ["Hypothesis, variables, controls, and a saturation procedure.", "Measure what dissolves at each temperature, with everything else held."]);

/* ---------- SC7.9.6 Carry out separation procedures (CORE) ---------- */
// CORE residue: the bank covers ordering, judging and troubleshooting
// the procedures. The residue is performing them with the apparatus
// in hand.
E("s7-u3-procedure-order", 3, ["SC7.9.6"], 2, "var", varset([
  function () {
    return mcq("In Core Lab 9-1C, a group separates salt water first by evaporation and then by distillation. Which sequence detail matters most for safety and success?",
      "The flask is secured with a clamp and ring stand before heating, so the hot solution cannot spill if the apparatus is knocked",
      ["The group tastes a little of the residue left behind to check that it really is salt",
       "The evaporating dish is filled right to the brim with solution to save time on refills",
       "The condenser is connected to the apparatus only after the solution has reached a full rolling boil"],
      "The guide's own safety note for this laboratory is the clamp and ring stand: hot salt solution spilled from an unsecured flask is the laboratory's main hazard. Tasting is never a laboratory test, brim-full dishes boil over, and the condenser must be in place before vapour is produced or the solvent is lost.",
      {});
  }
]), ["Secure the apparatus before the heat goes on.", "The guide's safety note is the clamp and ring stand."]);

E("s7-u3-procedure-problem", 3, ["SC7.9.6"], 1, "var", varset([
  function () {
    return mcq("Mid-procedure, a group filters a muddy sugar solution. The filtrate is clear but still sweet, and the group asks for a finer filter to 'get the sugar out.' What is the correct next step?",
      "Explain that no filter can remove a dissolved substance, and separate the sugar by evaporation or distillation instead",
      ["Stack three filter papers together to make a much finer barrier for the sugar",
       "Use a microscope and fine tweezers to pick the sugar particles out one by one",
       "Add more water to the solution so the sugar spreads thinner and passes through the filter more easily"],
      "Filtration has already done all it can: it removed the undissolved mud. The sugar is dissolved at the particle level and passes any filter. The procedure must switch properties, from particle size to boiling point: evaporate the water away, or distill to recover it as well.",
      {});
  }
]), ["A dissolved substance defeats every filter.", "Switch properties: from size to boiling point."]);

/* ---------- SC7.9.7 Tools safely and accurately (CORE) ---------- */
// CORE residue: the bank covers recognizing safe set-up and accurate
// measurement choices. The residue is the handling itself.
E("s7-u3-tools-safety", 3, ["SC7.9.7"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe one when evaporating salt water on a hot plate?",
      "Use a shallow evaporating dish filled no more than half, keep the hot plate's cord clear of the bench edge, and treat the dish as hot until it has cooled",
      ["Fill the evaporating dish right up to the top with solution so the whole run finishes sooner",
       "Carry the hot dish across the room to cool by an open window, holding it carefully with both hands the whole way and weaving between the benches",
       "Watch the dish closely from directly above it, at close range, while the last of the water boils dry"],
      "Hot solution, glassware and electricity meet in this procedure. A half-filled dish cannot boil over, a managed cord cannot pull the plate down, and heated glassware is treated as hot. Carrying hot dishes and leaning over boiling solution are the accident patterns.",
      {});
  }
]), ["Half full, cord managed, everything heated treated as hot.", "Never carry a hot dish across the room."]);

E("s7-u3-tools-accurate", 3, ["SC7.9.7"], 2, "var", varset([
  function () {
    return mcq("A group's solubility results scatter badly between repeats. Their notebook shows water measured 'to about the line' from above, and solute added in heaped spoonfuls. Which fix most improves their accuracy?",
      "Read the graduated cylinder at eye level at the bottom of the meniscus, and measure the solute by mass on the balance for each addition",
      ["Add all of the solute much faster, so the temperature of the water does not have time to change at all during the run",
       "Use a much larger beaker for the runs so that all of the numbers come out bigger",
       "Stir the solution much harder and faster so that the scattered readings settle down"],
      "Scattered results usually trace to scattered measurement. Eye-level meniscus reading removes the parallax error, and massing each addition replaces heaped spoonfuls, whose amounts vary, with measured quantities. Speed, beaker size and stirring force do not fix either error.",
      {});
  }
]), ["Scatter in results usually means scatter in measuring.", "Eye level for volume; the balance for mass."]);

/* ---------- SC7.9.8 New questions from the activities ---------- */
E("s7-u3-new-questions", 3, ["SC7.9.8"], 1, "var", varset([
  function () {
    return mcq("After the separation activities, which new question genuinely arises from the results students obtained?",
      "Why can one mixture be separated with a filter while another mixture cannot?",
      ["What is the capital city of the province called?",
       "Who invented the filter, and in what year was it invented?",
       "Which of the groups in the class finished the activity first?"],
      "New questions grow out of results: filtration succeeded on sand and water and failed on sugar water, and that contrast demands an explanation, which is the guide's own example of a question arising from these activities. The other options are trivia or logistics, not questions the data raise.",
      {});
  }
]), ["A new question grows out of a result that needs explaining.", "The filter contrast is the guide's own example."]);

E("s7-u3-cr-new-question", 3, ["SC7.9.8"], 2, "var", varset([
  function () {
    return textq("A group tried to separate a sugar solution by filtration, and the sugar passed straight through the filter with the water. (a) State the new question this result raises. (b) Name the separation method the result points to, and say why it should work where filtration failed. (2 marks)",
      ["why did the dissolved sugar pass through", "evaporation or distillation", "dissolved particles too small; boiling point difference"],
      "<b>Model answer:</b> (a) New question: why does filtration separate some mixtures but not a solution, or equivalently, what property of a dissolved substance lets it pass through a filter? (b) The result points to evaporation (or distillation, to recover the water as well): the sugar's dissolved particles are far too small for any filter to catch, but sugar and water differ in boiling behaviour, so heating drives the water off as vapour and leaves the sugar behind; distillation adds condensation to collect the water too.<br><br><b>Marking points:</b> 1 mark for a new question that grows out of the failed result (about dissolved particles, particle size, or the limits of filtration); 1 mark for evaporation or distillation named, with the boiling point reasoning.",
      {});
  }
]), ["The failure is the data: ask what it teaches.", "From size to boiling point: that is the method switch."]);

/* Practice-only entries: the design-an-investigation CR is excluded from
   composed unit tests by the composer's noCompose flag (v1.2.0). It stays
   available in practice draws and explicit teacher picks. */
var NO_COMPOSE_U3 = {
  "s7-u3-cr-design-solubility": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC7.7.1, SC7.7.2, SC7.7.3, SC7.7.5, SC7.7.6 x2, SC7.7.7 x2,
   and one 2-mark Level 2 CR entry closing Unit 3 Test 1's CR gap.
   Case-table entries are registered as varsets. SME-flagged. */

E("s7-u3-particle-diagram-judge", 3, ["SC7.7.1"], 2, "var", varset([
  { s: "every particle in the diagram is the same single atom, shown separate from the others", key: "A pure substance: an element", d: ["A pure substance: a compound", "A mixture of two elements", "A mixture of an element and a compound"] },
  { s: "every particle is the same molecule, each made of two different atoms joined together", key: "A pure substance: a compound", d: ["A pure substance: an element", "A mixture of two elements", "A mixture of two compounds"] },
  { s: "two kinds of single atoms are mixed together, none of them joined to any other", key: "A mixture of two elements", d: ["A pure substance: a compound", "A pure substance: an element", "A mixture of an element and a compound"] },
  { s: "one kind of molecule (two atoms joined) is mixed with single atoms of another kind", key: "A mixture of an element and a compound", d: ["A pure substance: a compound", "A pure substance: an element", "A mixture of two compounds"] },
  { s: "two different kinds of molecules are mixed, each kind made of atoms joined in the same way within its kind", key: "A mixture of two compounds", d: ["A pure substance: a compound", "A mixture of two elements", "A pure substance: an element"] },
  { s: "every particle is the same molecule, each made of three atoms of one kind joined together", key: "A pure substance: an element (its particles are molecules of one atom type)", d: ["A pure substance: a compound made of three elements", "A mixture of two elements shown as molecules", "A mixture of an element and a compound"] }
].map(function (c) {
  return function () {
    return mcq("A particle diagram shows this: " + c.s + ". What does the diagram represent?",
      c.key, c.d,
      "A pure substance has only one kind of particle throughout; a mixture has more than one kind. Atoms joined from different elements make a compound. <b>" + c.key + "</b>.", {});
  };
})), ["Spacing and movement give the state away: far apart and free means gas.", "Close but sliding means liquid; fixed positions in rows means solid."]);

E("s7-u3-mixture-classify-more", 3, ["SC7.7.2"], 2, "var", varset([
  { s: "brass, a blend of copper and zinc melted together", key: "Homogeneous: it looks the same throughout and its parts cannot be seen or picked out", d: ["Heterogeneous: its parts can be picked out and separated by hand, one metal at a time, like the parts of a salad", "A pure substance, because it is a metal and metals are always pure substances", "Neither kind: metals cannot be mixtures of any kind under any circumstances"] },
  { s: "a bowl of trail mix with nuts, raisins and seeds", key: "Heterogeneous: its different parts can be seen and picked out one kind at a time", d: ["Homogeneous: it looks exactly the same throughout in every spoonful once it has been poured into the bowl", "A pure substance, because everything in it is food and food is pure", "Neither kind: mixtures of solids do not count as mixtures at all"] },
  { s: "salt water from the ocean, filtered to remove the sand", key: "Homogeneous: the dissolved salt is spread evenly through it and cannot be seen", d: ["Heterogeneous: the dissolved salt can still be picked out of it by hand, grain by grain, after filtering", "A pure substance, because it is a clear liquid and clear liquids are pure", "Neither kind: it is an element, because it came from the ocean"] },
  { s: "granite rock with visible flecks of different minerals", key: "Heterogeneous: its different mineral parts can be seen scattered through the rock", d: ["Homogeneous: rock always looks exactly the same throughout every sample taken from it, wherever it is found", "A pure substance, because it is a single rock taken from one place", "Neither kind: rocks are never described as mixtures of any kind"] },
  { s: "air in a classroom", key: "Homogeneous: its gases are mixed evenly and cannot be told apart by looking", d: ["Heterogeneous: each of its gases can be seen separately, floating in layers at different heights in the room", "A pure substance, because air is invisible and invisible things are pure", "Neither kind: gases are unable to mix with each other at all"] },
  { s: "a Caesar salad with leaves, croutons and dressing", key: "Heterogeneous: its parts can be seen clearly and separated from each other", d: ["Homogeneous: it becomes one single uniform substance as soon as it is tossed together in the serving bowl", "A pure substance, because it is served to the table as a single dish", "Neither kind: it is a compound, because its parts are combined in a bowl"] },
  { s: "milk, which looks uniform but is made of tiny fat droplets spread through water", key: "Heterogeneous at the particle level: the droplets are a separate phase spread through the water", d: ["A pure substance, because it is white all through and pours smoothly and evenly out of the carton every time", "Homogeneous at every level, because it looks the same and pours evenly", "Neither kind: liquids can never be heterogeneous mixtures in any way"] },
  { s: "lemonade made by stirring lemon juice, sugar and water until it is clear", key: "Homogeneous: everything that dissolved is spread evenly throughout the drink", d: ["Heterogeneous: the sugar in it can still be picked out by hand after the stirring is finished and it clears", "A pure substance, because the finished drink is clear like pure water", "Neither kind: it is an element, because it is made in the kitchen"] }
].map(function (c) {
  return function () {
    return mcq("Classify this mixture: " + c.s + ".",
      c.key, c.d,
      "A homogeneous mixture looks the same throughout, with its parts spread evenly and not visible; a heterogeneous mixture has parts that can be seen or separated. <b>" + c.key + "</b>.", {});
  };
})), ["Can you see separate parts, unevenly spread? That is a mechanical mixture.", "Uniform all the way through with nothing to distinguish means a solution."]);

E("s7-u3-dissolving-identify", 3, ["SC7.7.3"], 2, "var", varset([
  { s: "sugar stirred into a cup of tea until it disappears", sol: "the sugar", solv: "the tea (mostly water)" },
  { s: "salt mixed into a pot of water for cooking pasta", sol: "the salt", solv: "the water" },
  { s: "powdered drink mix stirred into a jug of water", sol: "the drink powder", solv: "the water" },
  { s: "carbon dioxide gas pumped into water to make soda water", sol: "the carbon dioxide", solv: "the water" },
  { s: "iodine dissolved in alcohol to make a tincture for cuts", sol: "the iodine", solv: "the alcohol" },
  { s: "instant coffee granules stirred into hot water", sol: "the coffee granules", solv: "the hot water" }
].reduce(function (acc, c) {
  acc.push(function () {
    return mcq("In this solution, " + c.s + ". What is the solute?",
      c.sol, [c.solv + " (named as the solute)", "the container the solution is mixed in", "the part of the solution that evaporates first"],
      "The solute is the substance that dissolves; the solvent is the substance it dissolves into, usually present in the greater amount. Here the solute is <b>" + c.sol + "</b> and the solvent is " + c.solv + ".", {});
  });
  acc.push(function () {
    return mcq("In this solution, " + c.s + ". What is the solvent?",
      c.solv, [c.sol + " (named as the solvent)", "the container the solution is mixed in", "the part of the solution that settles out"],
      "The solvent is the substance that does the dissolving, usually present in the greater amount. Here the solvent is <b>" + c.solv + "</b> and the solute is " + c.sol + ".", {});
  });
  return acc;
}, [])), ["The solute is the substance that gets dissolved; the solvent does the dissolving.", "In drinks, the smaller ingredient is usually the solute."]);

E("s7-u3-solubility-change", 3, ["SC7.7.5"], 2, "var", varset([
  { s: "A bottle of soda is opened and left uncapped overnight; by morning it tastes flat", key: "Gas escapes because the pressure above the liquid dropped, lowering the gas's solubility in the soda", d: ["The gas dissolved even more deeply as the pressure above it dropped, which is why the taste of the soda changed", "The soda absorbed extra gas from the air overnight, pushing the original gas out", "The temperature of the soda removed all of the dissolved gas by itself overnight"] },
  { s: "Sugar dissolves faster and in greater amount in hot tea than in iced tea", key: "Raising the temperature increased the solid sugar's solubility in the liquid", d: ["Raising the temperature of the tea decreased the solid sugar's solubility in the liquid it was stirred into", "Temperature has no effect at all on how much of a solid dissolves in a liquid", "The sugar melted in the hot tea, and melting is exactly the same as dissolving"] },
  { s: "A diver's blood can form dangerous bubbles if the diver surfaces too quickly", key: "Falling pressure lowers the solubility of the gases dissolved in the blood, so they come out as bubbles", d: ["Rising pressure in the blood forces more gas out of it and into bubbles as the diver rises toward the surface", "Pressure has no effect at all on how much gas can stay dissolved in a liquid", "The bubbles form only because the diver's blood gets colder during the ascent"] },
  { s: "Warm lake water in summer holds less dissolved oxygen than the same water in spring", key: "Raising the temperature lowered the solubility of the oxygen gas in the lake water", d: ["Raising the temperature of the lake raised the solubility of the oxygen gas dissolved in its water in summer", "Oxygen behaves as a solid in water, so its solubility rose with the temperature", "The fish used up the oxygen, which is the only possible cause of the change"] },
  { s: "A sealed bottle of pop fizzes strongly the moment it is opened", key: "The sudden pressure drop lets dissolved carbon dioxide come out of solution as bubbles", d: ["The pressure rise inside the bottle creates the carbon dioxide gas at the very moment the cap is twisted off", "Opening the bottle lowers its temperature enough to manufacture the gas", "The gas was never dissolved at all; it was trapped in the pop as a solid"] },
  { s: "Salt keeps dissolving in a heated pan of water long after it stopped dissolving in cold water", key: "Heating the water raised the solubility of the solid salt in the water", d: ["Heating the pan of water lowered the solubility of the solid salt that was being dissolved into it", "The salt dissolved in the hot water only because it melted into it", "The solubility of solids in water never changes with temperature at all"] }
].map(function (c) {
  return function () {
    return mcq(c.s + ". Which explanation is correct?",
      c.key, c.d,
      "For solids, solubility in a liquid usually rises with temperature. For gases, solubility falls as temperature rises and falls as pressure drops. <b>" + c.key + "</b>.", {});
  };
})), ["Check the factor being changed: temperature, pressure, stirring or particle size.", "Gases behave opposite to solids when temperature rises."]);

E("s7-u3-separation-plan", 3, ["SC7.7.6"], 2, "var", varset([
  { s: "a mixture of iron filings, sand and salt, when all three are needed separately", key: "Magnetism for the filings, then dissolve the salt in water, filter out the sand, and evaporate the water to recover the salt", d: ["Evaporate the whole dry mixture first in a pan, then try to filter the dry powders apart from each other afterwards", "Filter the dry mixture through paper first, then use a magnet on the liquid that passes through", "Distill the dry mixture until it boils, then screen out the salt from what remains behind"] },
  { s: "a mixture of sand, small pebbles and water", key: "Screening to remove the pebbles, then filtration to separate the sand from the water", d: ["Evaporation of the whole mixture first in the sun, then magnetism to pull the sand grains out of the pebbles", "Distillation to remove the pebbles, then screening to separate the water from the sand", "Paper chromatography on the mixture, then flotation to lift the sand off the water"] },
  { s: "muddy water containing dissolved salt", key: "Filtration to remove the mud, then evaporation to recover the salt from the clear water", d: ["Magnetism to remove the mud from the water first, then screening the clear water to catch the dissolved salt in it", "Screening to remove the dissolved salt first, then distillation of the mud that is left", "Flotation to skim the dissolved salt off the surface before filtering out the mud"] },
  { s: "a mixture of rice grains and fine flour spilled together", key: "Screening: the fine flour passes through the screen while the rice grains stay on top of it", d: ["Filtration with water added to the mixture, then evaporation of all the water to get the rice grains back again", "Magnetism, because dry rice grains are attracted to magnets when mixed with flour", "Distillation, because flour boils at a lower temperature than rice grains do"] },
  { s: "used cooking oil floating on dishwater in a sink", key: "Let it settle, then skim or pour off the oil layer from the top (flotation and decanting)", d: ["Evaporate the whole mixture in a heated pan and collect the used cooking oil from whatever is left behind in it", "Filter the mixture and expect the oil to stay dissolved evenly in the water", "Hold a magnet over the surface to pull the oil layer off the dishwater"] },
  { s: "a mixture of salt and pepper shaken together in a jar", key: "Dissolve the salt in water, filter out the pepper, then evaporate the water to recover the salt", d: ["Use a strong magnet on the jar, because salt becomes magnetic whenever it is mixed together with ground pepper", "Screen the mixture, because salt grains are always larger than pepper grains are", "Distill the dry mixture, because the pepper in it boils away before the salt does"] }
].map(function (c) {
  return function () {
    return mcq("A full separation is needed for " + c.s + ". Which plan works?",
      c.key, c.d,
      "Plan the steps in order: remove the component with the most distinctive property first (magnetism, particle size), and handle dissolved solids by dissolving, filtering and evaporating. The working plan is: <b>" + c.key.toLowerCase() + "</b>.", {});
  };
})), ["Match the tool to the property that differs: magnetism, particle size, dissolving, density.", "Dissolved solids cannot be filtered out; they need evaporation."]);

E("s7-u3-separation-property", 3, ["SC7.7.6"], 3, "var", varset([
  { s: "separating the pulp from orange juice by pouring it through a strainer", key: "Particle size: the strainer's holes pass the juice but hold back the larger pulp pieces", d: ["Boiling point: the juice boils away completely before the pulp does while the mixture sits in the strainer", "Magnetism: the pulp is attracted to the metal of the strainer as it pours", "Solubility: the pulp dissolves in the juice and is left behind in solution"] },
  { s: "recovering drinking water from seawater aboard a ship by distillation", key: "Boiling point: the water evaporates and condenses while the dissolved salts stay behind", d: ["Particle size: the particles of salt in the seawater are too large to evaporate along with the water vapour", "Density: the salt floats on top of the vapour as the water boils away", "Magnetism: the salt is drawn out of the vapour by the cold condenser"] },
  { s: "separating the dyes in a felt-pen ink using a strip of wet filter paper", key: "How far each dye travels in the solvent: the dyes spread out along the paper at different rates", d: ["Particle size alone: the paper blocks the larger dye completely at the starting line and lets the smaller one pass", "Boiling point: each dye boils off the wet paper in turn as it warms up", "Density: the heaviest dye sinks off the bottom of the paper into the solvent"] },
  { s: "removing steel screws spilled into a box of plastic beads with a magnet", key: "Magnetism: the steel is attracted to the magnet while the plastic beads are not", d: ["Particle size: the screws are larger than the plastic beads, so the magnet is able to sort the two apart by size", "Solubility: the plastic dissolves around the magnet and the steel does not", "Boiling point: the plastic melts away from the steel when the magnet warms it"] },
  { s: "separating oil and vinegar salad dressing by letting it stand and pouring off the top layer", key: "Density and not mixing: the oil floats on the vinegar because the two liquids do not dissolve in each other", d: ["Boiling point: the oil evaporates slowly off the top of the dressing as it stands on the counter after mixing", "Magnetism: the vinegar is attracted away from the oil by the bottle's cap", "Particle size: the oil's particles are too big to sink through the vinegar"] },
  { s: "getting salt back from salt water left in a shallow pan in the sun", key: "Evaporation: the water leaves as vapour because it evaporates far more readily than the salt does", d: ["Magnetism: the warmth of the sun in the shallow pan draws the salt out of the water and onto the pan's surface", "Particle size: the salt is filtered out of the water by the bottom of the pan", "Density: the salt sinks and sticks to the pan before any water can evaporate"] }
].map(function (c) {
  return function () {
    return mcq("Which property difference makes this separation work: " + c.s + "?",
      c.key, c.d,
      "Every separation method exploits one property difference between the components. Here it is <b>" + c.key.toLowerCase() + "</b>.", {});
  };
})), ["Name the property that makes the technique work on this pair of substances.", "If an magnet is used, the property is magnetism; if water is added, think solubility."]);

E("s7-u3-daily-technique-id", 3, ["SC7.7.7"], 1, "var", varset([
  { s: "a coffee maker drips water through ground coffee held in a paper filter", key: "Filtration", d: ["Distillation", "Magnetism", "Evaporation"] },
  { s: "a washing machine spins the drum fast to push water out of wet clothes", key: "Centrifuging", d: ["Filtration", "Paper chromatography", "Flotation"] },
  { s: "a cook pours boiled pasta into a colander to drain it", key: "Screening", d: ["Distillation", "Evaporation", "Magnetism"] },
  { s: "cream is skimmed from the top of fresh whole milk that has stood overnight", key: "Flotation", d: ["Filtration", "Distillation", "Paper chromatography"] },
  { s: "a tea bag steeps in hot water and is lifted out, leaving the leaves behind in the bag", key: "Filtration", d: ["Evaporation", "Magnetism", "Centrifuging"] },
  { s: "a dryer screen catches the lint pulled from tumbling clothes", key: "Screening", d: ["Distillation", "Flotation", "Paper chromatography"] },
  { s: "a gold panner swirls water in a pan so the lighter sand washes away and the heavy gold stays", key: "Panning (density separation)", d: ["Filtration", "Evaporation", "Magnetism"] },
  { s: "a water treatment plant lets muddy water sit in settling tanks before further treatment", key: "Sedimentation", d: ["Paper chromatography", "Distillation", "Magnetism"] }
].map(function (c) {
  return function () {
    return mcq("Which separation technique is at work here: " + c.s + "?",
      c.key, c.d,
      "Everyday devices use the same separation principles as the lab: filters and screens trap by size, spinning and settling separate by density, and floating components can be skimmed. This one is <b>" + c.key.toLowerCase() + "</b>.", {});
  };
})), ["Ask what the device does: holds back a solid, lets a liquid evaporate, or pours a liquid off?", "Holding back solids while liquid passes is filtration."]);

E("s7-u3-daily-technique-choose", 3, ["SC7.7.7"], 2, "var", varset([
  { s: "a camper needs drinking water from a muddy stream and has a cloth and a pot", key: "Filter the water through the cloth to remove the mud, then boil it before drinking it", d: ["Distill the water by holding the pot lid in the steam over the fire and collecting every drop that condenses on it", "Hold a magnet in the stream water to pull all of the mud out of it at once", "Let the water evaporate completely in the sun and drink whatever is left behind"] },
  { s: "a cook has oversalted a soup and wants to reduce the saltiness without throwing the soup away", key: "Add more water and ingredients to dilute it; the dissolved salt cannot be filtered out of the soup", d: ["Pour the whole soup through a coffee filter to catch all of the dissolved salt in it before serving it at the table", "Hold a strong magnet over the pot to draw the dissolved salt out of the soup", "Skim the dissolved salt off the surface of the soup with a spoon before serving"] },
  { s: "a jeweller has spilled tiny steel pins into a tray of gold filings", key: "Pass a magnet over the tray to lift out the steel pins, leaving the gold filings behind", d: ["Wash the tray with water and filter the whole mixture through paper to separate out the gold filings from the pins", "Heat the tray until the steel pins evaporate away from the gold filings completely", "Shake the tray gently so the gold filings float to the top of the steel pins"] },
  { s: "a homeowner finds sand mixed into a bag of grass seed before planting", key: "Use a screen with holes that pass the sand grains but hold back the larger grass seeds", d: ["Dissolve all of the sand in water in a bucket and then filter the mixture to get the grass seeds back out of it", "Pass a magnet through the bag to remove all of the sand grains from the seed", "Let the mixture settle in water so the grass seeds float off the sand by themselves"] },
  { s: "a baker needs to remove the lumps from flour before mixing a cake", key: "Sift the flour through a sieve so the lumps are held back or broken up as it passes", d: ["Distill the flour in a sealed pot over heat to separate all of the lumps from the fine powder before baking", "Spin the flour in a bowl so the lumps evaporate out of it completely", "Float the flour on water and skim the lumps off the surface with a spoon"] },
  { s: "a mechanic drains used engine oil that has fine metal grit suspended in it", key: "Pour the oil through a filter that traps the metal grit while the oil passes through it", d: ["Stir a strong magnet around in the oil to dissolve all of the fine metal grit into the oil completely and evenly", "Evaporate all of the oil away and keep the metal grit as the finished product", "Add water to the oil so the metal grit floats to the top where it can be skimmed"] }
].map(function (c) {
  return function () {
    return mcq("Everyday problem: " + c.s + ". Which approach works?",
      c.key, c.d,
      "Match the technique to the property difference available: size for screens and filters, magnetism for steel, and dilution when a dissolved substance cannot be filtered. The working approach is: <b>" + c.key.toLowerCase() + "</b>.", {});
  };
})), ["Choose the technique that removes the unwanted part and keeps the wanted part.", "Suspended solids come out by filtration; settled solids by decanting."]);

E("s7-u3-cr-classify-explain", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return textq("Classifying and explaining mixtures (2 marks)\nA student stirs a spoon of sand into a glass of water and a spoon of salt into another glass of water. After stirring, the sand can still be seen settled at the bottom, but the salt cannot be seen at all. Classify EACH mixture as heterogeneous or homogeneous, and explain the difference using the particle theory. (2)",
      ["The sand and water form a heterogeneous mixture: the sand particles stay in visible clumps and settle."],
      "Marking points (2): 1 mark for both classifications (sand and water heterogeneous; salt and water homogeneous). 1 mark for the particle explanation: the salt's particles separate and spread evenly among the water particles so they cannot be seen, while the sand's particles stay together in grains that remain visible and settle. Model answer: Sand in water is heterogeneous and salt in water is homogeneous, because <b>the dissolved salt spreads evenly at the particle level while the sand stays in visible grains</b>.", {});
  },
  function () {
    return textq("Classifying and explaining mixtures (2 marks)\nA jar of mixed nuts and a bottle of well-shaken salad dressing are both mixtures. The nuts can be picked out one kind at a time. The dressing looks the same throughout while it is freshly shaken, but separates into layers if it stands. Classify EACH mixture and explain your reasoning. (2)",
      ["The mixed nuts are heterogeneous: each kind can be seen and picked out separately."],
      "Marking points (2): 1 mark for both classifications (nuts heterogeneous; the freshly shaken dressing homogeneous in appearance, becoming heterogeneous as it separates). 1 mark for the reasoning: a mixture is homogeneous only while its parts are spread evenly and cannot be told apart; once the dressing's parts separate into layers they can be told apart, so it is heterogeneous. Model answer: The nuts are heterogeneous, and the dressing is homogeneous only while shaken, because <b>a mixture is homogeneous only as long as its parts stay evenly spread and indistinguishable</b>.", {});
  },
  function () {
    return textq("Classifying and explaining mixtures (2 marks)\nFog and brass are both described as mixtures. Fog is made of tiny water droplets spread through air; brass is made of copper and zinc melted and solidified together. Classify EACH mixture as heterogeneous or homogeneous, and explain each classification. (2)",
      ["Brass is homogeneous: the copper and zinc are mixed evenly at the particle level, so a sample looks and behaves the same throughout."],
      "Marking points (2): 1 mark for brass as homogeneous with the particle-level reason. 1 mark for fog as heterogeneous: the droplets are a separate phase spread through the air, visible as cloudiness, and they can settle or evaporate separately. Model answer: Brass is homogeneous and fog is heterogeneous, because <b>brass is mixed evenly at the particle level while fog's droplets remain a separate, visible phase</b>.", {});
  }
]), ["Decide the class first, then hunt the description for two observations that prove it.", "Visible separate parts point one way; perfect uniformity points the other."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s7-u3-cr-particle-classify closes Unit 3 Test
   1 (3 marks, Level 2); s7-u3-cr-separation-plan closes Unit 3 Test
   3 (4 marks, Level 2). SME-flagged for the
   specialist pass. */
E("s7-u3-cr-particle-classify", 3, ["SC7.7.1", "SC7.7.2"], 2, "var", varset([
  function () {
    return textq("Two samples are described at the particle level. Sample A: every particle in the sample is the same kind, throughout the whole sample. Sample B: two kinds of particle are present, spread evenly through each other so the sample looks the same in every part, with no clumps or layers. Sample A is distilled water and Sample B is seawater. (a) Classify Sample A as a pure substance, a homogeneous mixture, or a heterogeneous mixture. (1) (b) Classify Sample B in the same way. (1) (c) Justify ONE of your classifications using the particle description. (1) (3 marks)",
      ["Sample A is a pure substance: it contains one kind of particle only. Sample B is a homogeneous mixture: it contains two kinds of particle (water particles and dissolved salt particles) mixed evenly throughout."],
      "<b>Model answer:</b> (a) Sample A is a pure substance. (b) Sample B is a homogeneous mixture. (c) Justification for either sample earns the mark. For Sample A: a pure substance contains only one kind of particle, and the description gives one kind throughout, so distilled water is pure. For Sample B: seawater contains two kinds of particle, so it is a mixture, and because the two kinds are spread evenly with no clumps or layers, the mixture is homogeneous.<br><br><b>Marking points:</b> 1 mark for Sample A classified as a pure substance. 1 mark for Sample B classified as a homogeneous mixture. 1 mark for one classification justified from the particle description: one kind of particle for a pure substance, or two kinds evenly mixed for a homogeneous mixture.", {});
  },
  function () {
    return textq("Two samples are described at the particle level. Sample A: every particle in the sample is the same kind, throughout the whole sample. Sample B: two kinds of particle are present in roughly even proportions in every part of the sample, spread evenly through each other. Sample A is oxygen gas and Sample B is air. (a) Classify Sample A as a pure substance, a homogeneous mixture, or a heterogeneous mixture. (1) (b) Classify Sample B in the same way. (1) (c) Justify ONE of your classifications using the particle description. (1) (3 marks)",
      ["Sample A is a pure substance: one kind of particle only. Sample B is a homogeneous mixture: several kinds of gas particle (mainly nitrogen and oxygen particles) mixed evenly throughout, so air is the same in every part."],
      "<b>Model answer:</b> (a) Sample A is a pure substance. (b) Sample B is a homogeneous mixture. (c) Justification for either sample earns the mark. For Sample A: oxygen gas contains only one kind of particle, which is the definition of a pure substance. For Sample B: air contains two or more kinds of particle, so it is a mixture, and because the kinds are spread evenly through each other with the same make-up in every part, it is a homogeneous mixture, even though it is a gas and nothing can be seen mixed in it.<br><br><b>Marking points:</b> 1 mark for Sample A classified as a pure substance. 1 mark for Sample B classified as a homogeneous mixture. 1 mark for one classification justified from the particle description: one kind of particle for a pure substance, or two or more kinds evenly mixed for a homogeneous mixture.", {});
  },
  function () {
    return textq("Two samples are described at the particle level. Sample A: two kinds of particle are present, gathered in uneven patches and visible clumps, so one part of the sample looks different from another. Sample B: two kinds of particle are present, spread evenly through each other so the sample is the same in every part. Sample A is granite and Sample B is brass. (a) Classify Sample A as a pure substance, a homogeneous mixture, or a heterogeneous mixture. (1) (b) Classify Sample B in the same way. (1) (c) Justify ONE of your classifications using the particle description. (1) (3 marks)",
      ["Sample A is a heterogeneous mixture: its two kinds of particle sit in uneven, visible clumps (the flecks of different minerals in granite). Sample B is a homogeneous mixture: its two kinds of metal particle are evenly mixed throughout the brass."],
      "<b>Model answer:</b> (a) Sample A is a heterogeneous mixture. (b) Sample B is a homogeneous mixture. (c) Justification for either sample earns the mark. For Sample A: granite holds more than one kind of particle, so it is a mixture, and the particles are unevenly arranged in visible clumps and patches, which makes the mixture heterogeneous. For Sample B: brass holds two kinds of particle, so it is a mixture and not a pure substance, but the particles are spread evenly so the metal is the same throughout, which makes it homogeneous.<br><br><b>Marking points:</b> 1 mark for Sample A classified as a heterogeneous mixture. 1 mark for Sample B classified as a homogeneous mixture. 1 mark for one classification justified from the particle description: uneven clumps for heterogeneous, or two kinds evenly spread for homogeneous.", {});
  },
  function () {
    return textq("Two samples are described at the particle level. Sample A: every particle in the sample is the same kind, throughout the whole sample. Sample B: two kinds of particle are present, mixed unevenly, with grains of one kind clustered together in some places and grains of the other kind clustered in other places. Sample A is sugar and Sample B is a mix of sugar and sand stirred together in a jar. (a) Classify Sample A as a pure substance, a homogeneous mixture, or a heterogeneous mixture. (1) (b) Classify Sample B in the same way. (1) (c) Justify ONE of your classifications using the particle description. (1) (3 marks)",
      ["Sample A is a pure substance: one kind of particle only. Sample B is a heterogeneous mixture: two kinds of particle, unevenly mixed with visible clusters of each."],
      "<b>Model answer:</b> (a) Sample A is a pure substance. (b) Sample B is a heterogeneous mixture. (c) Justification for either sample earns the mark. For Sample A: sugar contains only one kind of particle throughout, which makes it a pure substance (its particle is a compound particle, but every particle is the same kind). For Sample B: the jar holds two kinds of particle, so it is a mixture, and the kinds are mixed unevenly with clusters of each visible, which makes the mixture heterogeneous rather than homogeneous.<br><br><b>Marking points:</b> 1 mark for Sample A classified as a pure substance. 1 mark for Sample B classified as a heterogeneous mixture. 1 mark for one classification justified from the particle description: one kind of particle for a pure substance, or two kinds unevenly mixed with clumps for a heterogeneous mixture.", {});
  }
]), ["Count the kinds of particle first; that separates pure substances from mixtures.", "Then judge the mixing: even throughout means homogeneous, clumps or layers mean heterogeneous."]);

E("s7-u3-cr-separation-plan", 3, ["SC7.7.6", "SC7.7.7"], 2, "var", varset([
  function () {
    return textq("A beaker holds a mixture of iron filings, sand, salt and water. The salt is dissolved in the water. (a) Give an ordered plan to recover the iron filings, the sand and the salt separately, naming the technique used at each step. (2) (b) State the property that EACH technique in your plan exploits. (1) (c) State how ONE recovered component would be dried or checked for purity, and why that step is needed. (1) (4 marks)",
      ["Plan: pass a magnet through the mixture to lift out the iron filings; filter the rest to catch the sand; evaporate the filtrate to leave the salt. Properties: magnetism exploits the iron being magnetic while sand and salt are not; filtration exploits particle size, since undissolved sand grains are too large for the filter pores while the dissolved salt passes through; evaporation exploits the boiling point difference, since water evaporates and the dissolved salt does not. Drying: rinse and dry the sand on the filter paper so no salt solution clings to it, or dry the salt crystals fully so no water remains."],
      "<b>Model answer:</b> (a) Step 1, magnetism: stir a magnet wrapped in plastic through the mixture and lift out the iron filings. Step 2, filtration: pour what remains through filter paper; the sand is caught and the salt water passes through as the filtrate. Step 3, evaporation: heat the filtrate or leave it in a warm place so the water evaporates and salt crystals remain. (b) Magnetism exploits magnetism: iron is magnetic and the other components are not. Filtration exploits particle size: undissolved sand grains are far too large to pass through the filter pores, while a dissolved substance passes through with the water. Evaporation exploits the difference in boiling behaviour: water turns to vapour and leaves, while the salt does not evaporate. (c) The sand should be rinsed on the paper with a little clean water and then dried, so that no salt solution is left clinging to it; otherwise the recovered sand would be contaminated with salt when the water dried.<br><br><b>Marking points:</b> 1 mark for the techniques correctly matched to the components (magnetism for the iron, filtration for the sand, evaporation for the salt). 1 mark for a workable order with the dissolved salt recovered last, after the solids are out. 1 mark for the property correctly stated for each technique (magnetism, particle size, boiling point difference). 1 mark for a drying or purity check for one component, with its reason.", {});
  },
  function () {
    return textq("A beaker holds a mixture of chalk powder, sand, salt and water. The salt is dissolved in the water; the chalk and the sand do not dissolve. (a) Give an ordered plan to recover the chalk, the sand and the salt separately, naming the technique used at each step. (2) (b) State the property that EACH technique in your plan exploits. (1) (c) State how ONE recovered component would be dried or checked for purity, and why that step is needed. (1) (4 marks)",
      ["Plan: filter the mixture to catch the chalk and sand together while the salt water passes through; evaporate the filtrate to recover the salt; dry the caught solids and separate the fine chalk powder from the coarser sand by screening through a fine sieve that the chalk passes and the sand does not. Properties: filtration exploits particle size for undissolved solids; evaporation exploits the boiling point difference between water and salt; screening exploits the particle size difference between chalk powder and sand grains. Drying: dry the chalk and sand fully before screening, because damp powder clumps and will not pass the sieve."],
      "<b>Model answer:</b> (a) Step 1, filtration: pour the mixture through filter paper; the undissolved chalk and sand are caught together and the salt water passes through. Step 2, evaporation: heat the filtrate or leave it warm so the water evaporates and the salt remains. Step 3, screening: dry the caught solids, then shake them through a fine sieve; the fine chalk powder passes through and the coarser sand grains stay on the sieve. (b) Filtration exploits particle size: undissolved solid pieces are too large for the filter pores. Evaporation exploits the boiling point difference: water evaporates and dissolved salt does not. Screening exploits particle size again, this time between two dry solids: chalk particles are much smaller than sand grains. (c) The chalk and sand must be dried fully before screening, because damp chalk clumps together into lumps too large to pass the sieve, and the separation would fail.<br><br><b>Marking points:</b> 1 mark for the techniques correctly matched to the components (filtration for the undissolved solids, evaporation for the salt, screening for chalk against sand). 1 mark for a workable order, with the salt solution separated from the solids before evaporation. 1 mark for the property correctly stated for each technique. 1 mark for a drying or purity step for one component, with its reason, such as drying the solids so the screening works.", {});
  },
  function () {
    return textq("A bucket holds a mixture of sawdust, gravel, salt and water. The salt is dissolved in the water; the sawdust floats and the gravel sinks. (a) Give an ordered plan to recover the sawdust, the gravel and the salt separately, naming the technique used at each step. (2) (b) State the property that EACH technique in your plan exploits. (1) (c) State how ONE recovered component would be dried or checked for purity, and why that step is needed. (1) (4 marks)",
      ["Plan: skim or decant the floating sawdust off the surface (flotation and mechanical sorting); pour the rest through a coarse sieve or filter to catch the gravel; evaporate the salt water to recover the salt. Properties: flotation exploits density, since sawdust floats and gravel sinks; sieving or filtration exploits particle size; evaporation exploits the boiling point difference between water and the dissolved salt. Drying: spread the sawdust out to dry, or rinse and dry the gravel so no salt crust forms on it as leftover solution dries."],
      "<b>Model answer:</b> (a) Step 1, flotation and skimming: lift the floating sawdust off the surface with a sieve or by carefully decanting it with the top layer of water. Step 2, screening or filtration: pour what remains through a coarse sieve; the gravel is caught and the salt water passes through. Step 3, evaporation: heat the salt water or leave it in a warm place so the water evaporates and salt crystals remain. (b) Flotation exploits density and floating behaviour: sawdust floats on water while gravel sinks. Screening exploits particle size: gravel pieces are too large to pass the sieve openings. Evaporation exploits the boiling point difference: water evaporates and the dissolved salt is left behind. (c) The gravel should be rinsed with clean water and dried after sieving, so that no salt solution dries on it and leaves a salt crust mixed with the recovered gravel.<br><br><b>Marking points:</b> 1 mark for the techniques correctly matched to the components (skimming or flotation for the sawdust, screening or filtration for the gravel, evaporation for the salt). 1 mark for a workable order, with the floating and sunken solids removed before the salt water is evaporated. 1 mark for the property correctly stated for each technique (density or floating, particle size, boiling point difference). 1 mark for a drying or purity step for one component, with its reason.", {});
  },
  function () {
    return textq("A tray holds a mixture of gravel, sand, salt and water that was stirred together. The salt is dissolved in the water; the gravel pieces are much larger than the sand grains. (a) Give an ordered plan to recover the gravel, the sand and the salt separately, naming the technique used at each step. (2) (b) State the property that EACH technique in your plan exploits. (1) (c) State how ONE recovered component would be dried or checked for purity, and why that step is needed. (1) (4 marks)",
      ["Plan: pour the mixture through a coarse sieve to catch the gravel while the sand and salt water pass through; filter the rest to catch the sand; evaporate the filtrate to recover the salt. Properties: screening exploits the large particle size of gravel; filtration exploits particle size for the undissolved sand; evaporation exploits the boiling point difference between water and salt. Drying: rinse the sand on the filter paper with clean water and dry it, so dissolved salt is washed off and does not crystallize into the sand."],
      "<b>Model answer:</b> (a) Step 1, screening: pour the mixture through a coarse sieve; the large gravel pieces are caught and the sand and salt water pass through. Step 2, filtration: pour what passed through into filter paper; the sand is caught and the salt water runs through as the filtrate. Step 3, evaporation: heat the filtrate or leave it warm so the water evaporates and the salt remains as crystals. (b) Screening exploits particle size between two solids: gravel pieces are too large for the sieve openings and sand grains are not. Filtration exploits particle size between a solid and a liquid: undissolved sand cannot pass the filter pores, while the dissolved salt passes with the water. Evaporation exploits the boiling point difference: water evaporates and the salt does not. (c) The sand should be rinsed on the filter paper with a little clean water and then dried, because salt water clinging to the sand would otherwise leave salt crystals mixed through the recovered sand as it dried.<br><br><b>Marking points:</b> 1 mark for the techniques correctly matched to the components (screening for the gravel, filtration for the sand, evaporation for the salt). 1 mark for a workable order, largest solid out first and the dissolved salt recovered last. 1 mark for the property correctly stated for each technique. 1 mark for a drying or purity step for one component, with its reason.", {});
  }
]), ["Work through the mixture one component at a time, and keep the dissolved component for last.", "Every technique must be defended by a property: magnetism, particle size, density, or boiling point."]);

/* ----- bank-u4.js ----- */
// CRMARKS: s7-u4-cr-soil-choice=2
// CRMARKS: s7-u4-cr-mineral-identify=4
// CRMARKS: s7-u4-cr-soil-formation=3
/* Science 7, Unit 4: Earth's Crust (built Nov 15, 2026).
   85 entries across the strand's 25 indicators: Knowledge SC7.10.1
   to SC7.10.9, STSE SC7.11.1 to SC7.11.7, Skills SC7.12.1 to
   SC7.12.9. Guide-led (current guide, Version 2023.001.010) with a
   reviewed source base: the ExamView Chapters 10 to 12 publisher
   banks, Core Lab 10-1C (A Mineralogist's Mystery), Core Lab 12-1B
   (Rocks that Fizz), Be a Soil Sleuth (the guide's Core Lab 12-2B),
   the Seeing the Big Picture STSE module and its portfolio
   assignment, the WNLSD Chapter 10 test and review sheet, the ESD
   unit plan and rock classification activity, and three STEAM app
   scenarios were reviewed only to gauge the expected depth and
   range of treatment. All items were written new for this app.
   No verbatim textbook or test items. Terminology follows the guide throughout:
   the guide's term for earthquake strength is the moment magnitude
   scale, and reviewed material naming the Richter scale informed
   question types only. Content with no home in the current 25 indicators
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
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: s7-u4-mineral-properties=2
// CRMARKS: s7-u4-mohs-order=2
// CRMARKS: s7-u4-streak-reliable=3
// CRMARKS: s7-u4-rock-families=2
// CRMARKS: s7-u4-igneous-cooling=2
// CRMARKS: s7-u4-cycle-diagram=2
// CRMARKS: s7-u4-sedimentary-form=3
// CRMARKS: s7-u4-metamorphic-parent=3
// CRMARKS: s7-u4-earth-layers=2
// CRMARKS: s7-u4-study-tech=3
// CRMARKS: s7-u4-earthquake-why=2
// CRMARKS: s7-u4-volcano-where=3
// CRMARKS: s7-u4-event-effects=3
// CRMARKS: s7-u4-distribution-data=2
// CRMARKS: s7-u4-ring-of-fire=4
// CRMARKS: s7-u4-fold-fault=2
// CRMARKS: s7-u4-mountain-process=3
// CRMARKS: s7-u4-era-order=2
// CRMARKS: s7-u4-weathering-types=2
// CRMARKS: s7-u4-frost-wedging=2
// CRMARKS: s7-u4-winter-chime=3
// CRMARKS: s7-u4-soil-texture=2
// CRMARKS: s7-u4-soil-form=2
// CRMARKS: s7-u4-soil-drainage=3
// CRMARKS: s7-u4-boundaries=2
// CRMARKS: s7-u4-convection=3
// CRMARKS: s7-u4-new-evidence=4
// CRMARKS: s7-u4-canadian-match=2
// CRMARKS: s7-u4-canadian-scenario=2
// CRMARKS: s7-u4-evidence-link=3
// CRMARKS: s7-u4-change-timeline=2
// CRMARKS: s7-u4-change-why=3
// CRMARKS: s7-u4-drift-identify=2
// CRMARKS: s7-u4-drift-evidence=3
// CRMARKS: s7-u4-drift-flaw=3
// CRMARKS: s7-u4-shift-contrast=3
// CRMARKS: s7-u4-past-explanations=2
// CRMARKS: s7-u4-past-purpose=3
// CRMARKS: s7-u4-key-mineral=2
// CRMARKS: s7-u4-key-mineral-2=3
// CRMARKS: s7-u4-key-choose=3
// CRMARKS: s7-u4-method-match=2
// CRMARKS: s7-u4-method-plan=3
// CRMARKS: s7-u4-mineral-id=2
// CRMARKS: s7-u4-mineral-id-2=3
// CRMARKS: s7-u4-mineral-pair=3
// CRMARKS: s7-u4-cycle-path=3
// CRMARKS: s7-u4-fizz-variables=2
// CRMARKS: s7-u4-fair-test-design=3
// CRMARKS: s7-u4-instrument-read=2
// CRMARKS: s7-u4-instrument-choose=2
// CRMARKS: s7-u4-table-build=2
// CRMARKS: s7-u4-conclusion-refute=3
// CRMARKS: s7-u4-mountain-scenario=3
// CRMARKS: s7-u4-event-order=3
// CRMARKS: s7-u4-soil-feel-test=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: s7-u4-mineral-properties=a
// BIMODAL: s7-u4-mohs-order=b
// BIMODAL: s7-u4-streak-reliable=b
// BIMODAL: s7-u4-rock-families=a
// BIMODAL: s7-u4-igneous-cooling=b
// BIMODAL: s7-u4-cycle-diagram=b
// BIMODAL: s7-u4-sedimentary-form=b
// BIMODAL: s7-u4-metamorphic-parent=a
// BIMODAL: s7-u4-earth-layers=b
// BIMODAL: s7-u4-study-tech=b
// BIMODAL: s7-u4-earthquake-why=b
// BIMODAL: s7-u4-volcano-where=b
// BIMODAL: s7-u4-event-effects=b
// BIMODAL: s7-u4-distribution-data=b
// BIMODAL: s7-u4-ring-of-fire=b
// BIMODAL: s7-u4-fold-fault=b
// BIMODAL: s7-u4-mountain-process=b
// BIMODAL: s7-u4-era-order=a
// BIMODAL: s7-u4-weathering-types=b
// BIMODAL: s7-u4-frost-wedging=b
// BIMODAL: s7-u4-winter-chime=b
// BIMODAL: s7-u4-soil-texture=b
// BIMODAL: s7-u4-soil-form=b
// BIMODAL: s7-u4-soil-drainage=b
// BIMODAL: s7-u4-boundaries=b
// BIMODAL: s7-u4-convection=b
// BIMODAL: s7-u4-new-evidence=b
// BIMODAL: s7-u4-canadian-match=b
// BIMODAL: s7-u4-canadian-scenario=b
// BIMODAL: s7-u4-evidence-link=b
// BIMODAL: s7-u4-change-timeline=b
// BIMODAL: s7-u4-change-why=b
// BIMODAL: s7-u4-drift-identify=b
// BIMODAL: s7-u4-drift-evidence=b
// BIMODAL: s7-u4-drift-flaw=b
// BIMODAL: s7-u4-shift-contrast=b
// BIMODAL: s7-u4-past-explanations=b
// BIMODAL: s7-u4-past-purpose=b
// BIMODAL: s7-u4-key-mineral=a
// BIMODAL: s7-u4-key-mineral-2=a
// BIMODAL: s7-u4-key-choose=b
// BIMODAL: s7-u4-method-match=b
// BIMODAL: s7-u4-method-plan=b
// BIMODAL: s7-u4-mineral-id=a
// BIMODAL: s7-u4-mineral-id-2=a
// BIMODAL: s7-u4-mineral-pair=b
// BIMODAL: s7-u4-cycle-path=b
// BIMODAL: s7-u4-fizz-variables=a
// BIMODAL: s7-u4-fair-test-design=b
// BIMODAL: s7-u4-instrument-read=b
// BIMODAL: s7-u4-instrument-choose=b
// BIMODAL: s7-u4-table-build=b
// BIMODAL: s7-u4-conclusion-refute=b
// BIMODAL: s7-u4-mountain-scenario=b
// BIMODAL: s7-u4-event-order=a
// BIMODAL: s7-u4-soil-feel-test=b

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
      ["The sediments melt completely from the heat of burial, then cool and harden into solid rock",
       "Heat and pressure deep in the crust recrystallize the sediments, growing bands of new minerals through them",
       "The sediments simply dry out in the sun and wind until they harden into solid rock"],
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
      ["The crust is the softest and weakest layer of the Earth", "The crust is the hottest of all the layers of the Earth", "The crust is made of the same material as the core below it"],
      "Even under the continents the crust is only a few tens of kilometres thick, against thousands of kilometres of mantle and core below it. Thin in proportion, like an apple's skin.", {});
    q.figure = s7EarthLayersSVG();
    return q;
  }
]), ["Find the layer in the diagram first, then match its state and material.", "Only one layer is liquid; the deepest layer is solid despite being hottest, because of pressure."]);

E("s7-u4-crust-plates", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    return mcq("Which statement about Earth's crust is correct?",
      "The crust is broken into large pieces called plates that move slowly, carrying continents and ocean floor with them",
      ["The crust is one single unbroken shell, and only the continents sitting on top of it move",
       "The crust is broken into plates, but the plates are exactly the same things as the continents",
       "The crust floats as separate continent pieces on a completely liquid interior below"],
      "The crust (with the uppermost mantle) is broken into plates, and each plate can carry both continent and ocean floor. Plates are not the same as continents: several plates carry no continent at all, and some continents sit on more than one plate.", {});
  },
  function () {
    return mcq("A map shows a tectonic plate that includes South America and the western half of the Atlantic Ocean floor. What does this show about plates?",
      "A plate can carry both a continent and ocean floor; plates and continents are not the same thing",
      ["Ocean floor is not part of the Earth's crust at all",
       "Every continent sits on exactly one plate of its own, separate from all the others",
       "The floor of the Atlantic Ocean belongs to no plate at all"],
      "Plates are pieces of crust, and a single plate often carries a continent plus the ocean floor beside it out to a mid-ocean ridge. The plate boundaries do not follow the coastlines.", {});
  }
]), ["Plates are pieces of crust; continents are passengers on some of them.", "If an option makes plates and continents identical, it is the misconception, not the answer."]);

E("s7-u4-study-tech", 4, ["SC7.10.3"], 2, "var", varset([
  function () {
    return mcq("Scientists in the 1950s towed magnetometers behind ships and recorded stripes of normal and reversed magnetism in the ocean floor rocks. What did this technology let them study?",
      "How the ocean floor had spread apart over time, recorded in its magnetic stripes",
      ["The exact age of the Earth itself, read directly from the stripes",
       "The depth of the mantle lying below the ocean floor rocks",
       "The kinds of fish and sea life living along the mid-ocean ridge"],
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
      ["A crack that opens in the ground during the shaking and swallows the surface above it, buildings and all",
       "A shaking of the ground caused by magma rising up through the vent of a volcano",
       "A giant wave that starts out in the ocean and travels to strike the coast with great force"],
      "Forces from moving plates slowly stress the rock until it breaks or slips along a fault; the stored energy is released as seismic waves. Ground cracks and ocean waves can result from an earthquake, but neither one is the earthquake itself.", {});
  },
  function () {
    return mcq("Which pairing is correct?",
      "A seismograph records seismic waves, and the moment magnitude scale describes the strength of an earthquake",
      ["A seismograph predicts the exact day and hour of the next earthquake",
       "The moment magnitude scale measures how long an earthquake lasts, from start to finish",
       "A seismograph measures the magnetism of the rocks along a fault line"],
      "Seismographs record the waves an earthquake sends out, and scientists use the records to locate the earthquake and rate its strength on the moment magnitude scale. No instrument predicts the exact day of an earthquake.", {});
  }
]), ["Start from the cause: stressed rock, a sudden slip, energy released as waves.", "Separate the event itself from its effects: waves, cracks and tsunamis are results, not definitions."]);

E("s7-u4-volcano-where", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("Volcanoes form in three settings. Which setting matches the Hawaiian Islands?",
      "A hot spot: a plate moves slowly over a place where magma rises through the crust, building island after island",
      ["A converging boundary, where one plate dives down beneath another plate",
       "A diverging boundary, where two plates pull apart from each other under the ocean",
       "A transform boundary, where two plates slide sideways past each other for long distances"],
      "Hawaii sits in the middle of a plate, far from any boundary. A rising plume of magma (a hot spot) punches through the crust, and as the plate moves, the plume builds a chain of islands.", {});
  },
  function () {
    return mcq("Japan's volcanoes sit where one plate is diving beneath another. Which volcano setting is this?",
      "A converging boundary, where the diving plate melts and magma rises through the plate above",
      ["A hot spot located in the middle of a single large plate",
       "A diverging boundary, where plates pull apart from each other along a mid-ocean ridge",
       "A transform boundary, where two plates slide sideways past each other"],
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
      ["Lava flows slowly covered the surrounding towns and farmland in the weeks that followed",
       "A tsunami from the mountain rushed inland and flooded the whole coast for kilometres",
       "Ash buried the entire country under a metre of ash and debris from the eruption"],
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
      ["List all of the locations alphabetically by the name of the nearest city",
       "Sort all of the events by their dates, from the oldest to the newest",
       "Average all the locations together into a single position at the centre of the world"],
      "Patterns in distribution are spatial: they only appear when the data sits on a map. Alphabetical and date orderings hide where the events are, and averaging destroys the locations entirely.", {});
  },
  function () {
    return mcq("Why do scientists plot earthquake and volcano locations on a map instead of studying a table of the same data?",
      "The map shows where the events cluster, and the clusters are the pattern that needs explaining",
      ["Maps are always more accurate than tables are for the same data",
       "Tables cannot hold latitude and longitude numbers, so the locations would be lost",
       "The map removes the need to collect any field data at all"],
      "The table holds the same numbers, but the pattern (long belts of activity, empty stretches elsewhere) is visible only when the points are plotted. The pattern is what connects the events to plate boundaries.", {});
  }
]), ["Ask what each organization lets you SEE. The pattern lives in the geography.", "If an option throws the locations away, it throws the pattern away with them."]);

E("s7-u4-distribution-map", 4, ["SC7.10.5"], 2, "var", varset([
  function () {
    var q = mcq("Use the map of earthquake and volcano locations. Which statement best describes the pattern the map shows?",
      "The locations cluster along lines and belts, many of them around the edges of oceans and along the middle of the Atlantic",
      ["The locations are spread evenly over the whole Earth, with the same number in every region",
       "The locations occur only on land, and never anywhere in the oceans",
       "The locations form a single straight line that runs all the way around the Earth at the equator"],
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
      ["The equator, where the Earth spins fastest on its axis",
       "The edges of the continents around the Pacific, by coincidence only",
       "A chain of underwater mountains running around the Pacific with no relation to plates"],
      "The Ring of Fire traces the Pacific Plate's edges: where that plate dives under, pulls from or slides past its neighbours, earthquakes and volcanoes concentrate. The belt is a plate boundary drawn in events.", {});
    q.figure = s7WorldMapSVG();
    return q;
  },
  function () {
    var q = mcq("Use the map. The middle of the Atlantic Ocean shows a line of earthquakes and volcanoes running north to south, far from any continent. What is the best inference from this line?",
      "A plate boundary runs down the middle of the Atlantic, even though it lies under the ocean",
      ["Ships crossing the Atlantic Ocean cause the earthquakes that happen along their sailing routes",
       "The line marks the equator, where earthquakes and volcanoes are most common",
       "Volcanoes can only ever form in the middle of oceans"],
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
      ["Volcanic build-up: lava from eruptions piled up layer on layer until it stood high",
       "Erosion: rivers and ice carved the mountains out of an older flat plain",
       "Deposition: sediments piled up layer on layer until they reached the height of mountains"],
      "Continents colliding compress everything between them; the rock folds and faults upward into a range, as happened when the Appalachians rose. Erosion later wears ranges down; it does not raise them.", {});
  },
  function () {
    return mcq("In 1943, a Mexican farmer watched a crack open in his cornfield; within a year a new volcano, Paricutin, stood over 300 m tall where the field had been. Which mountain-building process does Paricutin show?",
      "Volcanic build-up: erupted lava and ash piled up around the vent until they formed a mountain",
      ["Folding: the flat rock layers bent upward under great compression",
       "Faulting: a block of crust was pushed upward along a large fault",
       "Glacial deposition: ice left behind a huge pile of rock and soil as it melted"],
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
      ["It is by far the shortest of the four divisions into which Earth's history is split",
       "It began only when the first fish appeared in the oceans, a relatively recent event",
       "It covers about the same total length of time as the Cenozoic era, the most recent one of all"],
      "Read the strip's proportions: the Precambrian block takes up nearly nine tenths of the whole line. The other three eras, which hold the fish, the forests, the mammals and us, share the remaining sliver.", {});
    q.figure = s7TimeStripSVG();
    return q;
  },
  function () {
    return mcq("A class models Earth's 4.6 billion year history on a 4.6 m strip of paper, one metre per billion years. Roughly how much of the strip do humans occupy?",
      "A tiny fraction of the last centimetre: humans have existed for only a very small part of Earth's history",
      ["About half the strip in total, since humans are the most advanced form of life on Earth",
       "About one full metre at the very end of the paper strip",
       "The whole strip, because the scale is meant as a model of human history"],
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
      ["Ice is heavier than the water it froze from, and its weight crushes the rock in the cracks apart",
       "The cold makes the rock contract again and again, night after night, until it shatters into small pieces",
       "Frost dissolves the minerals that hold the rock together, loosening it grain by grain"],
      "Water is unusual: it expands as it freezes. In a crack, that expansion pushes outward with great force, and freeze-thaw cycles through a spring wedge the crack wider each time until the rock splits. This is mechanical weathering.", {});
  },
  function () {
    return mcq("A gardener finds that the soil in spring is full of small stones that were not at the surface in the fall, pushed up by the freezing ground. Which weathering process is connected to this lifting and breaking of buried rock?",
      "Frost action: freezing water expands and heaves the ground, cracking rock as it does so",
      ["Chemical weathering, as plant roots slowly dissolve the stones in the soil",
       "Erosion by the wind, blowing loose stones up to the surface",
       "Compaction of the soil under the weight of the winter snow"],
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
      ["The chipping is chemical weathering, and the rusting is mechanical weathering",
       "Both the chipping and the rusting are erosion by the winter weather",
       "Both the chipping and the rusting are forms of chemical weathering"],
      "Impacts break the glass without changing what glass is: mechanical weathering. Rust is a new substance formed when iron reacts with oxygen and water: chemical weathering. Nothing here was carried away, so neither is erosion.", {});
  },
  function () {
    return mcq("For the same wind chime challenge, a team wants to slow the weathering of the metal bells. Which design choice targets the CHEMICAL weathering they observed?",
      "Coat the bells so water and oxygen cannot reach the metal surface as easily",
      ["Hang the chime where wind-blown sand and grit cannot strike it",
       "Make the metal bells thicker so that impacts chip them less",
       "Hang the chime lower down so it is easier to inspect in spring"],
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
      ["Rock dust alone, ground very fine by glaciers and mixed with nothing else at all",
       "Nothing but decayed plants, with no rock material of any kind in it, however long it took to form",
       "Sand washed up from the ocean and piled on the land over thousands of years"],
      "Soil needs both parents: weathering supplies the mineral particles from rock, and living things supply the organic matter as they die and decay. Neither one alone makes soil.", {});
  },
  function () {
    return mcq("Two soils form side by side, one on granite bedrock and one on shale bedrock, under the same climate and plants. Why do the two soils differ?",
      "Soil inherits characteristics from its parent rock, so different bedrock produces different soil",
      ["The climate must secretly be different over each of the two soils",
       "Soils never differ at all when the plants growing in them are the same",
       "The soil on granite is much older, and age is the only thing that matters for a soil"],
      "The parent material is one of the things that shapes a soil: granite weathers to a coarser, sandier soil, while shale weathers toward finer, clay-rich soil. Same weather, same plants, different starting rock, different soil.", {});
  }
]), ["Soil has two parents: broken rock and once-living material.", "Where a soil forms decides what it starts from: the rock underneath matters."]);

E("s7-u4-soil-drainage", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    var q = mcq("Use the drainage results. Which soil would leave a plant's roots sitting in water longest after rain, and why?",
      "The clay soil: its fine particles pack tightly, leaving small spaces, so water moves through it very slowly (low permeability)",
      ["The sandy soil: its large particles trap water between them and hold it there for days",
       "The gravel: its spaces are too small for water to enter, so the water sits on top of it",
       "All three soils drain at the same rate once they are wet, because wet soil of any kind lets water through equally fast"],
      "Read the bars: clay took by far the longest for the same volume of water. Fine particles pack closely, so the connected spaces are small and water creeps through slowly; sand and gravel have larger spaces and drain fast.", {});
    q.figure = s7DrainSVG([{ name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }, { name: "gravel", secs: 6 }]);
    return q;
  },
  function () {
    return mcq("What is the difference between a soil's porosity and its permeability?",
      "Porosity is how much open space the soil has to hold water; permeability is how easily water can move through those spaces",
      ["Porosity is how fast water drains through a soil; permeability is how much water the soil can hold",
       "They are two different names for one and the same property of a soil",
       "Porosity applies only to clay soils and permeability only to sandy soils"],
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
      ["It proved that the continents themselves were made of liquid rock all the way through",
       "It explained why earthquakes and volcanoes happen on the Moon",
       "It showed that the mantle was the same temperature throughout, at every depth inside the Earth"],
      "Wegener could say the continents moved but not what moved them, and that gap sank his theory. Convection currents gave plate tectonics the engine it needed: heat-driven circulation in the mantle dragging the plates.", {});
  }
]), ["The soup pot is a model: rising, spreading, sinking, in a slow loop.", "Ask what problem the idea solved. The theory before it had a famous missing piece."]);

E("s7-u4-new-evidence", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return mcq("In the 1960s, drilling ships brought up rock samples from the ocean floor. The rocks were youngest at the mid-ocean ridges and older farther away, on both sides. Why was this evidence so powerful for plate tectonics?",
      "It showed new crust forming at the ridges and spreading outward, exactly as sea floor spreading predicted",
      ["It proved the ocean floor was the oldest part of the Earth, older than any continent",
       "It showed that the continents had never moved at all in Earth's history",
       "It revealed that the ocean water was slowly dissolving the crust beneath it"],
      "A prediction confirmed is strong evidence: sea floor spreading said crust is born at ridges and ages as it moves away, and the drilled ages matched on both sides of the ridge. Continental drift alone never predicted this.", {});
  },
  function () {
    return mcq("Three technologies produced three discoveries: sonar mapped a mountain ridge down the middle of the Atlantic; magnetometers found magnetic stripes matching on both sides of the ridge; drilling showed the floor aging away from the ridge. Taken together, what did they establish?",
      "That the ocean floor is spreading apart from the ridges, carrying the continents with it",
      ["That the Atlantic Ocean has always been exactly its present size",
       "That all of Wegener's original evidence had been mistaken from the start",
       "That the continents plough their way through a stationary ocean floor"],
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
      ["J. Tuzo Wilson discovered the fossil dinosaurs in the badlands of Alberta",
       "Joseph Tyrrell proposed the theory of continental drift in 1912",
       "Harold Williams invented the seismograph used for recording earthquakes"],
      "Wilson's contribution was transform boundaries, the third boundary type, which plate tectonics needed. Tyrrell is the dinosaur and past-climate name; Williams worked on plate activity along eastern North America; continental drift was Wegener, who was German.", {});
  },
  function () {
    return mcq("Harold Williams, working in Newfoundland, studied the rocks of the Appalachian region. What was his contribution?",
      "He recognized evidence of ancient plate activity along the eastern margin of North America, helping explain how the Appalachians formed",
      ["He proved that Newfoundland was once part of Europe by drilling the ocean floor and matching the rocks he found",
       "He discovered the mid-Atlantic ridge using sonar surveys of the ocean",
       "He named and described the three types of plate boundaries"],
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
      ["That the ocean animals once lived their lives on dry land",
       "That people long ago carried the fossils up into the mountains by hand",
       "That the mountains themselves were built by the fossils piling up"],
      "The fossils are evidence; the explanation is inferred. Ocean animals live in oceans, so their fossils in mountain rock mean the rock was once sea floor, raised up by the same plate forces that built the mountains.", {});
  },
  function () {
    return mcq("Minerals that form only in warm climates are found in rocks in the polar regions. Which statement best describes how a scientist uses this observation?",
      "The observation is evidence; imagining the continent in a warmer place in the past is the inference built on it",
      ["The observation proves by itself exactly where the continent was in the past",
       "The observation is only an opinion, because it cannot be seen happening today",
       "The observation should simply be ignored, since the minerals identified might be wrong"],
      "Scientific explanations are built from evidence plus inferred relationships: the minerals (evidence) connect to a past climate, and the past climate connects to a continent that has moved. The observation alone is not the whole explanation.", {});
  }
]), ["Separate the two parts: what was observed, and what was inferred from it.", "An inference is not a guess: it is a relationship the evidence supports."]);

E("s7-u4-evidence-link", 4, ["SC7.11.3"], 2, "var", varset([
  function () {
    return mcq("A scientist argues that South America and Africa were once joined. Which PAIR of observations, taken together, makes the strongest case?",
      "The two coastlines fit together, and the same distinctive rock layers and fossils appear on both sides of the Atlantic",
      ["Both continents have beaches, and both are in the southern hemisphere, south of the equator",
       "Both continents are large landmasses, and both have high mountains somewhere on them",
       "Both continents have rivers flowing to the sea, and both have warm climates today"],
      "One observation can be coincidence; two independent ones that point the same way are a relationship. Fit plus matching rocks and fossils is the combination Wegener built on. The other pairs are true of many places that were never joined.", {});
  },
  function () {
    return mcq("Which observation most directly supports the explanation that the Atlantic Ocean is still widening?",
      "Measurements show the ocean floor is youngest at the mid-Atlantic ridge and gets older toward both continents",
      ["The Atlantic's storms push water toward both shores, widening the ocean a little each year",
       "Ships take longer to cross the Atlantic now than they used to in the past",
       "The coastlines of the continents around the Atlantic are slowly eroding away"],
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
      ["Artists and mapmakers became far more skilled at drawing coastlines",
       "The continents themselves moved noticeably during those hundred years",
       "Mapmakers agreed among themselves to draw the world differently, as a fashion"],
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
      ["Scientists of the 1960s were simply more open-minded and imaginative people than the scientists before them",
       "Wegener's original notes and maps were rediscovered in an archive in Germany",
       "A single very large earthquake in the Atlantic proved the continents were moving"],
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
      ["That the continents are slowly shrinking as the whole Earth cools down",
       "That ocean water is slowly covering the continents, which only look as if they moved",
       "That the continents formed where they are and have never moved from those places at all"],
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
      ["Trilobites swam all the way across the Atlantic Ocean and settled in both places",
       "The fossils prove that Wales was once politically part of Canada, long before Canada existed",
       "The close matching is a coincidence that carries no geological meaning at all"],
      "Trilobites were shallow-water animals that could not cross a deep ocean. Matching fossils across the Atlantic make sense if the two coasts were once neighbours, as Newfoundland's Avalon zone is now understood to have been attached to the European side.", {});
  },
  function () {
    return mcq("Which observation did Wegener use that involves the SHAPE of the continents?",
      "The coastlines of South America and Africa fit together like pieces of a jigsaw puzzle",
      ["Both of the continents are roughly triangular in their shape",
       "The continents are all much wider in the north than they are in the south",
       "The shapes of the continents change noticeably in every century"],
      "The fit of the Atlantic coastlines was Wegener's starting observation, and it grew stronger when the fit was made at the edge of the continental shelves rather than the modern beaches.", {});
  }
]), ["Fossils that match across an ocean need the ocean to have been absent or narrow.", "Wegener's first clue was a map: look for the option about fit."]);

E("s7-u4-drift-flaw", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("What was the major flaw in Wegener's theory of continental drift?",
      "It offered no workable mechanism: no force or process that could actually move the continents",
      ["It claimed that the continents moved at several metres per year",
       "It was based entirely on fossils that did not actually exist",
       "It said the continents had once been joined together, which was itself the flaw"],
      "The claim itself turned out to be right; the flaw was the missing engine. Wegener suggested forces far too weak to do the job, and until convection and sea floor spreading supplied a mechanism, the theory could not be accepted.", {});
  },
  function () {
    return mcq("Wegener suggested the continents ploughed through the ocean floor as they moved. Why did this part of his theory fail?",
      "The ocean floor is strong rock; continents cannot plough through it, and no grooves or crushed floor from such ploughing exist",
      ["The ocean floor is liquid, so the continents would have sunk through it to the centre of the Earth long ago",
       "Continents move far too fast to leave any mark on the ocean floor beneath them",
       "The continents are lighter than air and float above the floor, never touching it at all"],
      "Sea floor spreading replaced the ploughing picture: the floor moves with the continent as part of the same plate. Wegener's mechanism predicted a battered ocean floor that surveys never found.", {});
  }
]), ["The flaw was not the claim but the how: no mechanism strong enough.", "A mechanism makes predictions; check whether the predicted traces exist."]);

/* ---------- SC7.11.6 Plate tectonics as a major shift in world view ---------- */

E("s7-u4-shift-identify", 4, ["SC7.11.6"], 1, "var", varset([
  function () {
    return mcq("Why is plate tectonics described as a major shift in the scientific world view, rather than a small correction?",
      "It replaced the picture of a fixed Earth with a picture of an Earth whose surface is constantly being created, moved and recycled",
      ["It changed the names of the continents and oceans shown on world maps",
       "It corrected the measured size of the Earth by a small amount, and adjusted a few dates in the time scale",
       "It only affected how earthquakes and volcanoes are named"],
      "A world view shift changes the framework itself: before, the Earth's surface was fixed and only wore down; after, the surface is a system of moving plates that builds mountains, opens oceans and recycles crust. Everything in geology is read differently inside the new picture.", {});
  },
  function () {
    return mcq("Which statement belongs to the plate tectonics world view?",
      "The Earth's surface is divided into plates that move, carrying continents and ocean floor, and interact at their boundaries",
      ["The continents are fixed in place forever, and only the oceans change over time",
       "Mountains form mainly where rivers deposit their sediment, building it up over millions of years",
       "The Earth's interior is completely solid, cold and perfectly still"],
      "The plate tectonics picture: a moving, divided surface, with earthquakes, volcanoes and mountains concentrated at the boundaries where plates interact. The fixed-surface statements belong to the older view.", {});
  }
]), ["A shift replaces the framework, not a detail inside it.", "Look for the option in which the surface itself is in motion."]);

E("s7-u4-shift-contrast", 4, ["SC7.11.6"], 2, "var", varset([
  function () {
    return mcq("A student writes: 'The Atlantic Ocean has always been the same width, because the continents cannot move.' Which world view is the student using, and what evidence contradicts it?",
      "The old fixed-continent view; the matching coastlines, fossils and rock layers across the Atlantic, and the young, spreading ocean floor between them, contradict it",
      ["The plate tectonics view, and there is no evidence anywhere that contradicts any part of it",
       "The continental drift view; satellite photographs contradict it, as do modern laser and GPS measurements of the continents' positions",
       "The old fixed-continent view; the existence of tides, currents and storms in the Atlantic contradicts it"],
      "Fixed continents was the pre-drift world view. It cannot explain why the Atlantic's shores match in shape, fossils and rocks, nor why the floor between them is young at the ridge and spreading: the ocean opened as the continents parted.", {});
  },
  function () {
    return mcq("Before plate tectonics, folded mountain ranges were explained by a cooling, shrinking Earth wrinkling like a baked apple. What did the plate tectonics shift change about this explanation?",
      "Mountains are now explained by plates colliding and squeezing the rock, a process still running today, not by a one-way shrinking of the whole Earth",
      ["Mountains are now believed to form suddenly, in a single day of upheaval",
       "The shrinking-apple explanation was proven correct in every detail, and plate tectonics simply confirmed it years later",
       "Mountains are no longer considered worth explaining by scientists at all"],
      "The shift replaced a global shrinking with local, ongoing collisions: ranges rise where plates converge, which is why the Himalayas still grow and why ranges sit along boundary belts rather than anywhere at all.", {});
  }
]), ["Name the view from its claim: fixed, or moving?", "The contradicting evidence is the drift and spreading evidence, not everyday observations like tides."]);

/* ---------- SC7.11.7 Past theories ---------- */

E("s7-u4-past-explanations", 4, ["SC7.11.7"], 1, "var", varset([
  function () {
    return mcq("In Hawaiian tradition, volcanic eruptions were explained through Pele, the goddess of fire, whose anger or movements produced the lava. What observation was this explanation trying to account for?",
      "Lava erupting from the Earth and building new land, sometimes destructively and sometimes gently",
      ["The movement of the stars across the Hawaiian sky at night, which sailors steered by",
       "The arrival of the rainy season in the islands each year, with its floods and storms",
       "The formation of fossils inside the rocks of the mountains"],
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
      ["Both are tested by controlled experiments before anyone is allowed to believe them",
       "Both are written down in books by professional scientists",
       "Both turn out to be correct in all of their details"],
      "The shared purpose is explanation: people in every era connect observations into accounts of why events happen. What changed is the method: modern theories must survive testing against new evidence, and are revised or replaced when they do not.", {});
  },
  function () {
    return mcq("How do past explanations differ most importantly from the modern theory of plate tectonics?",
      "Plate tectonics is tested against new evidence and revised when evidence demands; the past explanations were not put to such tests",
      ["Plate tectonics is a much older theory than any of the past explanations",
       "Past explanations were never truly believed by the people who told and retold them",
       "Plate tectonics explains fewer observations than the past explanations, which claimed to cover everything on Earth"],
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
      ["Colour: gold is the only yellow mineral, so a yellow nugget must be gold",
       "Crystal form: gold never forms crystals of any shape",
       "Transparency: gold lets light pass through it when it is thin, and pyrite never does"],
      "The practical problem is gold against pyrite, and streak separates them in one test. Colour cannot settle it (that is the whole difficulty), and the other options are not reliable differences.", {});
  },
  function () {
    return mcq("A key user reaches step 8 with a specimen and is unsure whether it fizzed in acid, because only one tiny bubble appeared. What is the most sensible next step?",
      "Repeat the acid test on a fresh surface of the specimen and watch carefully, since the identification depends on it",
      ["Skip the step and choose whichever of the two minerals seems more likely, based on its looks",
       "Abandon the key completely and identify the mineral by its colour alone",
       "Record the mineral in the notebook as both calcite and not calcite"],
      "A key is only as good as its observations. When a decisive observation is doubtful, the practical move is to repeat the test properly, not to guess past it.", {});
  }
]), ["Choose the test that separates the actual candidates, not a test that is merely easy.", "A doubtful observation at a branching step is worth repeating; guessing compounds the error."]);

/* ---------- SC7.12.2 Select methods and tools to identify minerals ---------- */

E("s7-u4-tool-ladder", 4, ["SC7.12.2"], 1, "gen", function () {
  var sets = [
    { q: "A mineral is scratched by a steel nail (hardness 4.5) but not by a copper penny (hardness 3.5). Which tool should be tried next to narrow down its hardness?", tool: "A glass plate (hardness 5.5): if the mineral scratches the glass, it is harder than 5.5; if not, its hardness lies between 4.5 and 5.5", others: ["A fingernail (hardness 2.5), which is softer than the copper penny that has already failed to scratch it at all", "Sandpaper alone, used without comparing it against any of the known tools", "A magnet, to test the mineral's hardness by how strongly it is attracted"] },
    { q: "A mineral cannot be scratched by a fingernail (hardness 2.5) but is scratched by a copper penny (hardness 3.5). What is the best next test?", tool: "Try the steel nail (hardness 4.5) to check whether the hardness reaches that high, bracketing the value between 3.5 and 4.5", others: ["Try the emery cloth (hardness 9) to see the mineral at its hardest test first, before any other tool", "Stop testing at once: the hardness is exactly 3.5 and nothing more", "Test the streak on a plate, which gives the hardness directly"] },
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
      ["Rub the mineral on a porcelain plate and examine the powder left behind on it",
       "Hold a strong magnet near the mineral and watch carefully for any movement toward it",
       "Shine a bright light through a thin edge of the mineral sample and look through it"],
      "Each method answers one question: acid tests for the carbonate reaction (fizzing), the plate gives streak, the magnet tests magnetism, and the light tests transparency. Match the method to the property asked about.", {});
  },
  function () {
    return mcq("Which method is the right tool for examining the tiny crystals on a mineral sample's surface?",
      "A hand lens, held close, to magnify the surface so the crystals can be seen and described",
      ["A porcelain streak plate, rubbed firmly across the surface of the sample",
       "A steel file, drawn across the surface to scratch the tiny crystals off",
       "A magnet, passed slowly over the surface of the sample several times in a row"],
      "Observation tools and testing tools do different jobs: the hand lens magnifies for looking; the plate, file and magnet all change or test the sample rather than help you see it.", {});
  }
]), ["One method per property: acid for reaction, plate for streak, magnet for magnetism, lens for looking.", "If a method would damage or alter the sample, it is not an observation tool."]);

E("s7-u4-method-plan", 4, ["SC7.12.2"], 2, "var", varset([
  function () {
    return mcq("A student is given one small unknown mineral sample that must be returned undamaged if possible. Which order of tests is the best plan?",
      "Observe colour and lustre, test magnetism and streak, then scratch tests from softest tool upward, and acid last on a small corner",
      ["Acid first on the whole sample, then the steel file, then observation of its colour and lustre, in that order",
       "Scratch it with the steel file first, to settle the question of hardness at once, before anything else",
       "Break the sample in half first, so that its inside surfaces can be tested directly"],
      "A good plan runs from least to most damaging and from observation to intervention: looking costs nothing, streak and magnetism leave the sample nearly untouched, scratch tools go soft to hard so the first successful scratch does the least harm, and acid, which consumes a little of the sample, goes last.", {});
  },
  function () {
    return mcq("Why do mineral testers work UP the hardness ladder (fingernail, penny, nail, glass, file) instead of starting with the steel file?",
      "Starting soft brackets the hardness with the least damage: each failed tool leaves no mark, and the first tool that works sets the upper edge of the bracket",
      ["The steel file is far too expensive to risk using on unknown mineral samples",
       "The order of the ladder is just an old tradition, with no practical reason behind it at all",
       "Soft tools give more accurate hardness values than hard tools ever can, so starting with the file would ruin the measurement"],
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
      ["Colour: quartz is always white and calcite is always clear, so colour settles the question at once",
       "Lustre: calcite has a metallic lustre and quartz does not",
       "Streak: both minerals leave a bright red streak on the plate"],
      "Their looks overlap, but their hardnesses are far apart (7 against 3), so one scratch test settles it; calcite's acid fizz also separates them. Colour and lustre overlap too much to trust.", {});
  },
  function () {
    return mcq("Hematite and magnetite are both dark, heavy, metallic minerals. Which single test separates them fastest?",
      "A magnet: magnetite is attracted to it and hematite is not (and their streaks also differ, black against red-brown)",
      ["Weighing them carefully: both are heavy, so the heavier one is magnetite and the lighter is hematite",
       "Colour: magnetite is dark in colour and hematite is light",
       "Hardness: their hardness values sit at opposite ends of the hardness scale"],
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
      ["Why did the Earth form with exactly three rock families and no others?",
       "What will this rock look like in exactly one million years, and what colour will it be then?",
       "Which of the three rock families is the most important family on Earth?"],
      "Rounded against angular pieces can be compared across samples and connected to transport distance, an investigation the class can run. The others ask for unknowable exact futures, purposes, or rankings no evidence can settle.", {});
  }
]), ["Investigable means evidence can be brought to bear: samples, observations, comparisons.", "Questions of taste, purpose or exact distant futures cannot be investigated, however interesting they are."]);

E("s7-u4-question-best", 4, ["SC7.12.4"], 3, "var", varset([
  function () {
    return mcq("After studying the rock cycle, a student still has a question and wants one that could drive a real investigation with rock samples, a freezer, water and a tumbler of sand. Which question is strongest?",
      "Does freezing and thawing water in rock cracks break rock faster than tumbling the same rock in sand and water?",
      ["Why is the rock cycle a cycle that goes around, and not a line that ends?",
       "How many rocks are there in the world in total, if every single one could be counted today?",
       "What is the best kind of rock to choose for a pet rock?"],
      "The strongest question compares two weathering processes under controlled conditions with the equipment named, and its answer comes from measurements the student can take. The others are definitional, uncountable, or matters of taste.", {});
  },
  function () {
    return mcq("A student asks: 'I wonder why this sedimentary rock has layers of different colours.' Which follow-up turns it into the strongest investigable question?",
      "Do the different-coloured layers contain different sediment sizes or materials, suggesting the conditions changed as each layer was deposited?",
      ["Are the layers pretty enough for the rock to be put on display in the classroom for everyone to see?",
       "Who coloured the layers of the rock in the past, and why did they choose those colours rather than any others?",
       "How old is each separate layer of the rock, dated to the exact year it formed?"],
      "The strong follow-up points at observable differences (grain size, material) that can be checked in the sample and connected to deposition conditions. Exact years are beyond the tools, and the rest are taste or false agency.", {});
  }
]), ["A strong question names something measurable and a comparison to make.", "If the question cannot be answered with the samples and tools at hand, it is not yet investigable."]);

E("s7-u4-cycle-path", 4, ["SC7.12.4"], 2, "var", varset([
  function () {
    var q = mcq("Use the rock cycle diagram. A question arises from the diagram: can a sedimentary rock become an igneous rock directly, in one step? What does the diagram show?",
      "No: the sedimentary rock must first be changed by heat and pressure and then melt, or melt as burial deepens, before cooling can make it igneous",
      ["Yes: any kind of rock can become any other kind of rock in a single step",
       "No: sedimentary rock can never become igneous rock, even over millions of years, because the two kinds form in different places",
       "Yes, if the sedimentary rock is simply left at the surface for long enough"],
      "Follow the arrows from the sedimentary box: none runs straight to igneous. The route passes through metamorphic rock and magma: heat and pressure, then melting, then cooling. The cycle allows the journey, but never in one step.", {});
    q.figure = s7RockCycleSVG();
    return q;
  },
  function () {
    var q = mcq("Use the rock cycle diagram. Which route takes a metamorphic rock back to the start of the cycle as sediments?",
      "Weathering and erosion break the metamorphic rock down into sediments",
      ["Melting turns it directly into loose sediments",
       "Compaction and cementation press loose material into sediments",
       "Cooling and hardening turn it into sediments"],
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
      ["More water for the clay, since it is slower, to help it finish in time, and less water for the gravel, which needs no help",
       "A bigger cup for the gravel so its large pieces fit better, and a smaller cup for the fine clay",
       "Different amounts of soil for each test, using whatever each group scooped up from the bags"],
      "A fair test changes only the soil type. Helping the clay with extra water, or changing the apparatus between samples, would mix other variables into the drainage times and ruin the comparison.", {});
  },
  function () {
    return mcq("Midway through the drainage test, a group notices their clay sample was packed down hard while the sand was poured loosely. What should they do?",
      "Restart the clay trial with the sample prepared the same way as the others, and note the change",
      ["Keep the clay result as it is, since clay is slow to drain anyway",
       "Pack the sand down hard in the next class to make up for the difference",
       "Drop the clay result from the report and report only the sand and gravel results"],
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
      ["Record exactly 45 s, since every proper time must be a whole number",
       "Record the time as 'about a minute', since precision does not matter in a comparison test",
       "Record 44 s for this sample, and round each of the other samples to whatever whole number saves the most time"],
      "Accuracy means reading the instrument to its real precision and reading every trial the same way. Invented round numbers and changing methods between samples both corrupt the comparison the times are for.", {});
  },
  function () {
    return mcq("A graduated cylinder holds water for the drainage test. The bottom of the water's curved surface (the meniscus) sits level with the 25 mark when viewed at eye level, but a student reading from above sees it at 27. Which reading is accurate, and why?",
      "25 mL: a meniscus is read at eye level, from the bottom of the curve, to avoid the viewing-angle error",
      ["27 mL: the view from directly above is always the true and accurate one",
       "26 mL: the average of the two different views is the most accurate reading",
       "Either reading is fine for the test, since a difference of 2 mL cannot affect it"],
      "Liquid surfaces curve, and the scale is read at the bottom of the meniscus with the eye level with it. Reading from above introduces a consistent error, and 2 mL in 25 is an 8 percent error, large enough to distort a drainage comparison.", {});
  }
]), ["Read the instrument the way it was designed to be read: eye level, bottom of the meniscus, real precision.", "Consistency across trials is part of accuracy, not a nicety."]);

E("s7-u4-instrument-choose", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("A Soil Sleuth team must compare the particle sizes of sand, clay and gravel samples. Which instrument and practice best serves the measurement?",
      "A hand lens and a ruler: examine the particles magnified and measure or compare their diameters against the ruler's scale",
      ["A graduated cylinder: pour the particles into it and read their size off the scale on its side",
       "A stopwatch: time how fast the particles settle in water and report the settling time as the particle size",
       "A magnet: sort the particles by their attraction and report the groups as the sizes"],
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
      ["A table with one row per measurement and the values for all four samples added together in a single column at the end",
       "A list of the samples written in the order the team happened to test them, with notes underneath it",
       "A table showing only the drainage times for each sample, since those are the results that matter most"],
      "The data has two factors (sample and measurement), so the table needs rows for one and columns for the other, with every value kept separate and a title. Adding values together or dropping measurements destroys data the team collected.", {});
  },
  function () {
    return mcq("A mineral team tested eight samples and recorded colour, streak, hardness and the mineral each turned out to be. Which feature must their results table have to be useful for spotting patterns later?",
      "One row per sample with the properties in the same columns for every sample, so any property can be compared down its column",
      ["The samples arranged in order by how much the team liked each of them",
       "A separate small table for each of the samples, each one drawn up with its own layout and headings",
       "Only the correctly identified samples included in the table, to keep it looking tidy"],
      "Patterns appear down columns: streak against identification, hardness against identification. That requires a consistent grid, every sample in the same columns, including the misses, which are data too.", {});
  }
]), ["Rows for one factor, columns for the other, every value kept, and a title.", "A table that drops the failures drops the pattern with them."]);

E("s7-u4-table-read", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return mcq("A results table from the mineral laboratory shows: Sample 1, streak white, hardness 3, fizzes in acid, identified as calcite; Sample 2, streak white, hardness 7, no fizz, identified as quartz; Sample 3, streak red-brown, hardness 6, no fizz, identified as hematite; Sample 4, streak yellow, hardness 3, no fizz, not in the key's ten minerals. Which conclusion does the table support?",
      "Streak colour alone does not identify a mineral: two samples share a white streak but are different minerals, separated by hardness and the acid test",
      ["Every mineral with a white streak is calcite, so Samples 1 and 2 are both calcite despite their different hardnesses",
       "Hardness never matters at all in identification when the streak colour is already known",
       "Sample 4 must be gold, because gold is the mineral whose streak is yellow"],
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
      ["As the particle size increases, the drainage of water gets slower",
       "Particle size makes no difference at all to drainage in this data",
       "The relationship reverses halfway through: the medium-sized particles drain slowest of all"],
      "Read the bars against the particle sizes: gravel (coarsest) 6 s, sand 14 s, loam 47 s, clay (finest) 168 s. The times rise steadily as the particles get finer, a single clear relationship.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  },
  function () {
    var q = mcq("Use the drainage data display. A fifth sample, a coarse sand mixed with small pebbles, is tested the same way. Based on the pattern, what drainage time is most reasonable to predict?",
      "A short time, closer to gravel and sand than to clay, because its particles are coarse",
      ["The longest time of all the samples, because new samples always drain the slowest",
       "Exactly 168 s, precisely the same time as the clay sample",
       "The pattern in the data gives no basis for making any prediction"],
      "Patterns earn their keep by predicting: drainage time falls as particle size rises, so a coarse mixture should drain fast, in the range of the other coarse samples, not near the clay's time.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  }
]), ["Order the samples by particle size first, then read the times in that order.", "A pattern you cannot predict from is a pattern you have not really read."]);

E("s7-u4-pattern-infer", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return mcq("In the fizz test, the results were: granite no fizz, sandstone no fizz, shale no fizz, chalk strong fizz, marble strong fizz, limestone strong fizz. Marble is metamorphosed limestone, and chalk is a soft form of limestone. Which inference best explains the pattern?",
      "The fizzing rocks are all forms of the same material (limestone), so the acid reaction depends on what the rock is made of, not on the rock family it belongs to",
      ["Metamorphic rocks always fizz in acid and igneous rocks never fizz at all",
       "Rocks with shorter names fizz more strongly in acid than rocks with longer names",
       "The acid was stronger on the days the fizzing rocks were tested, and much weaker on the days the other rocks were tested in class"],
      "Group the results by composition and the pattern resolves: the three fizzers share limestone's material across two families (sedimentary chalk and limestone, metamorphic marble), while the non-fizzers are other materials. The variable that explains the split is composition.", {});
  },
  function () {
    return mcq("A class plots its mineral results: every sample with hardness above 5.5 scratched glass, every sample below 5.5 did not, and the one sample at about 5.5 left a faint mark. What relationship can the class infer?",
      "Whether a mineral scratches glass depends on whether its hardness is above or below the glass's hardness of 5.5",
      ["Harder minerals are always darker in colour than softer ones",
       "Glass will scratch every mineral if it is rubbed for long enough",
       "Hardness and scratching are completely unrelated, and the pattern in the plot is a coincidence"],
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
      ["The data supports the initial idea, because some rocks fizzed strongly, and partial support is enough to keep a claim",
       "The data proves that no rock anywhere in the world can ever fizz",
       "The conclusion is that the acid used was too weak to test anything about the rocks"],
      "A conclusion answers the initial idea directly: it predicted all rocks would fizz, and three did not. The supported conclusion is narrower and matches the data: composition decides. Some rocks fizzing does not rescue a claim about all rocks.", {});
  },
  function () {
    return mcq("A team hypothesized that the local soil would drain like sand, because it looks gritty. Their times were: local soil 41 s, sand 14 s, loam 47 s, clay 168 s. Which conclusion fits the data?",
      "The hypothesis is not supported: the local soil drained much more slowly than sand and closest to loam, so it behaves as a loamy soil despite its gritty look",
      ["The hypothesis is supported, because the local soil did drain, and any draining at all counts as support",
       "The data collected is useless, because the team's hypothesis turned out to be wrong",
       "The conclusion is that drainage times cannot be compared between different soils, so nothing at all can be said about the local soil"],
      "Compare the local soil's time with the references: 41 s sits beside loam's 47 s, far from sand's 14 s. The conclusion must follow the numbers, and a refuted hypothesis is a result, not a failure of the data.", {});
  }
]), ["A conclusion speaks to the initial idea by name: supported, or refuted, and by which numbers.", "'Some' never proves 'all': check the claim's exact wording against the data."]);

E("s7-u4-conclusion-refute", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("A student predicted that a dark, heavy rock sample would fizz in acid 'because it looks like the rocks that fizzed yesterday'. It produced no fizz at all, and its streak was red-brown. What is the best conclusion?",
      "The prediction is refuted: appearance misled, and the data (no fizz, red-brown streak) point to the sample being hematite, an iron mineral that does not react with acid",
      ["The prediction stands, because the rock still looks like a fizzing rock, and appearance is a more reliable guide than one acid test",
       "The test must have been done wrong in some way, since a prediction made beforehand is never wrong",
       "The conclusion is that doing a streak test on a rock causes it not to fizz in acid afterward"],
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




/* Lengthening tranche additions (Nov 20, 2026): depth priced in
   Science-Test-Lengthening-Feasibility-2026-11-20.md, Sections 6-7:
   SR on SC7.10.6, SC7.10.7, SC7.10.9 and one 2-mark Level 2 CR entry
   closing Unit 4 Test 3's CR gap. SME-flagged. */

E("s7-u4-mountain-scenario", 4, ["SC7.10.6"], 2, "var", varset([
  { s: "Two plates push toward each other and the rock layers between them crumple into wavy bends", key: "Folding: compression bends the rock layers into folds, building folded mountains over time", d: ["Faulting: the rock breaks cleanly along a crack and the blocks on either side slide past each other vertically", "Volcanism: lava erupts at the surface and piles up into a cone-shaped mountain", "Erosion: wind and water carve the rock away until only the mountains are left"] },
  { s: "Rock along a crack breaks, and one block is pushed up while the other drops down", key: "Faulting: the rock breaks along a fault and the blocks move, raising fault-block mountains", d: ["Folding: compression from the moving plates bends the rock layers into smooth waves without breaking them apart", "Volcanism: magma erupts at the surface and builds a cone of lava and ash", "Deposition: sediments settle in layers and harden into rock over a long time"] },
  { s: "Magma erupts at the surface again and again, and the lava and ash pile up into a cone-shaped peak", key: "Volcanism: erupted material builds up layer by layer into a volcanic mountain", d: ["Folding: the cooling lava bends itself into wavy folded layers as it piles up around the vent over the years", "Faulting: blocks of hardened lava slide past each other to form the cone", "Erosion: the cone is carved out of a solid block of rock by wind and rain"] },
  { s: "The Appalachian Mountains of eastern Canada show long ridges of bent and tilted sedimentary rock", key: "Folding and uplift from an ancient plate collision bent the layers and raised the whole range", d: ["Recent lava flows from volcanoes built the long ridges layer by layer over the bent sedimentary rock beneath them", "Glaciers stacked the loose rock into ridges during the last winter season", "The ridges are coastal sand dunes that hardened into rock in recent times"] },
  { s: "A plateau is cut by a crack, and the block on one side rises to form a steep-faced highland", key: "Faulting: movement along the fault raised one block of rock relative to the other block", d: ["Folding: the whole plateau bent slowly upward into a smooth arch over millions of years without any breaking", "Volcanism: lava flooded evenly over the plateau and built it up on one side", "Weathering: the highland was left standing as everything around it dissolved away"] },
  { s: "Underground magma pushes the rock layers above it upward into a dome, without erupting", key: "Uplift: pressure from the magma below raised the layers into a dome-shaped mountain", d: ["Faulting: the dome of rock dropped down along a crack in the rock beneath it as the pressure under it grew", "Erosion: rivers dug the dome out from below the surrounding rock layers", "Deposition: sediments rained down from above into a dome-shaped pile"] }
].map(function (c) {
  return function () {
    return mcq("Which mountain-forming process is described here: " + c.s + "?",
      c.key, c.d,
      "Mountains form by folding (layers bend under compression), faulting (blocks move along breaks), volcanism (erupted material piles up) or uplift. This description matches <b>" + c.key.split(":")[0].toLowerCase() + "</b>.", {});
  };
})), ["Is the rock being broken by a force or dissolved by a reaction?", "Ice, roots and rubbing are physical; acids are chemical."]);

E("s7-u4-event-order", 4, ["SC7.10.7"], 2, "gen", function () {
  var events = [
    ["The first fish appear in the oceans", 1], ["The first plants grow on land", 2], ["The first forests of tall trees spread", 3],
    ["Dinosaurs dominate the land", 4], ["The first flowering plants appear", 5], ["Dinosaurs become extinct", 6],
    ["The Atlantic Ocean begins to open", 7], ["The first humans appear", 8]
  ];
  var i = ri(0, events.length - 2), j = ri(i + 1, events.length - 1);
  var mode = ri(0, 1), A = events[i], B = events[j];
  if (mode === 0) {
    return mcq("On the geological time scale, which of these events happened FIRST: \"" + A[0] + "\" or \"" + B[0] + "\"?",
      A[0],
      [B[0], "They happened at exactly the same time", "Neither: both happened before the Earth formed"],
      "The geological time scale orders the major events of Earth's history. Of the two, the earlier event is <b>" + A[0].toLowerCase() + "</b>, which came before \"" + B[0].toLowerCase() + "\".", { a: A[0], b: B[0] });
  }
  var mid = events[ri(i, j)];
  return mcq("Three events from Earth's history are listed. Which list puts them in the correct chronological order, earliest first?",
    A[0] + " \u2192 " + mid[0] + " \u2192 " + B[0],
    [B[0] + " \u2192 " + mid[0] + " \u2192 " + A[0], A[0] + " \u2192 " + B[0] + " \u2192 " + mid[0], mid[0] + " \u2192 " + A[0] + " \u2192 " + B[0]].filter(function (w) { return w !== A[0] + " \u2192 " + mid[0] + " \u2192 " + B[0]; }).concat(["All three happened in the same year"]).slice(0, 3),
    "Chronological order follows the geological time scale: the earliest of the three is \"" + A[0].toLowerCase() + "\", then \"" + mid[0].toLowerCase() + "\", then \"" + B[0].toLowerCase() + "\". The correct order is <b>" + A[0] + " \u2192 " + mid[0] + " \u2192 " + B[0] + "</b>.", { a: A[0], b: B[0] });
}, ["Find the event that must come first: nothing else can happen before it.", "Then chain the rest: each step makes the next one possible."]);

E("s7-u4-soil-feel-test", 4, ["SC7.10.9"], 2, "var", varset([
  { s: "The moist soil feels gritty, falls apart when squeezed, and will not form a ribbon", key: "Sandy soil: mostly sand particles, which feel gritty and do not stick together at all", d: ["Clay soil: mostly clay particles, which feel sticky in the hand and hold together in long ribbons when rolled", "Loam: an even mix of particles that holds together in a weak ribbon shape", "Silt soil: feels smooth like flour and forms long ribbons when it is rolled"] },
  { s: "The moist soil is sticky, stains the hands, and can be rolled into a long thin ribbon", key: "Clay soil: mostly tiny clay particles, which stick together and hold a long ribbon", d: ["Sandy soil: mostly sand particles, which are gritty and never stick together in any shape, wet or dry", "Loam: an even mix of particles that cannot be rolled into a ribbon at all", "Peat soil: mostly decayed plant material, which feels spongy and springy"] },
  { s: "The moist soil feels smooth like flour, forms a short ribbon, and is not gritty or very sticky", key: "Silt soil: mostly silt particles, which feel smooth and floury to the touch", d: ["Clay soil: forms the longest and strongest ribbons of any soil and is very sticky and heavy to handle", "Sandy soil: gritty in the hand and falls apart the moment it is squeezed", "Gravel soil: mostly stones larger than two millimetres across throughout"] },
  { s: "The moist soil forms a weak ball that crumbles, feels slightly gritty and slightly smooth, and holds together briefly", key: "Loam: a balanced mix of sand, silt and clay particles in roughly even amounts", d: ["Pure clay: the stickiest soil of all, forming the strongest and longest ribbon of any sample in the test", "Pure sand: no ball shape can be formed from it at all, wet or dry", "Pure silt: feels exactly like dry flour and never forms any ball shape"] },
  { s: "The dry soil pours through the fingers like beach sand and will not clump even when it is wet", key: "Sandy soil: dominated by large sand particles with big air spaces between them", d: ["Clay soil: dominated by the tiniest particles of any soil, which clump together tightly whenever they are wet", "Loam: the balanced garden soil with a mix of particle sizes throughout", "Silt soil: dominated by floury particles that pack into a smooth mass"] }
].map(function (c) {
  return function () {
    return mcq("A soil sample is tested by hand. " + c.s + ". How is this soil classified?",
      c.key, c.d,
      "Texture class follows particle size: sand is gritty and loose, silt is smooth and floury, clay is sticky and holds ribbons, and loam is the balanced mix. <b>" + c.key + "</b>.", {});
  };
})), ["Gritty means sand, silky means silt, sticky and mouldable means clay.", "In the jar test, the finest particles settle last and cloud the water longest."]);

E("s7-u4-cr-soil-choice", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    return textq("Choosing a soil for a garden (2 marks)\nA gardener can plant vegetables in one of two beds. Bed A is mostly clay: sticky when wet, hard when dry, and puddles sit on it after rain. Bed B is a loam: it crumbles in the hand, drains after rain, and stays moist for days. State which bed is better for the vegetables, and explain your choice using TWO properties of the soils. (2)",
      ["Bed B, the loam, is better: its balanced texture drains excess water instead of puddling."],
      "Marking points (2): 1 mark for choosing the loam. 1 mark for two linked properties (any two of: loam drains while holding moisture, its mix of particle sizes lets roots spread and air reach them, clay puddles and shuts out air when wet and cracks when dry). Model answer: Bed B is better because <b>loam drains freely yet holds moisture, while clay waterlogs when wet and hardens when dry</b>.", {});
  },
  function () {
    return textq("Choosing a soil for a garden (2 marks)\nA farmer's field has two areas. Area A is sandy: water runs through it quickly and it dries out two days after rain. Area B is a clay loam: it holds water for a week but is sticky to work when wet. The farmer wants to grow a crop that needs steady moisture all summer. State which area suits the crop better, and explain your choice using TWO properties of the soils. (2)",
      ["Area B, the clay loam, suits the crop better: its smaller particles hold water in the soil far longer."],
      "Marking points (2): 1 mark for choosing the clay loam. 1 mark for two linked properties (any two of: clay loam's fine particles hold water against drainage, sand's large spaces let water escape quickly, the loam also holds nutrients better than sand). Model answer: Area B suits the crop because <b>its fine particles hold water and nutrients through dry spells, while the sandy area drains and dries too fast</b>.", {});
  },
  function () {
    return textq("Choosing a soil for a garden (2 marks)\nA school garden club tests two soils for a new bed. Soil A feels gritty, will not form a ball, and a jar test shows it is 80% sand. Soil B forms a weak ball, feels both gritty and smooth, and the jar test shows a mix of sand, silt and clay. State which soil the club should choose for vegetables, and explain your choice using TWO properties of the soils. (2)",
      ["Soil B should be chosen: its mixed texture holds a weak ball, showing it has enough fine particles to hold water."],
      "Marking points (2): 1 mark for choosing Soil B. 1 mark for two linked properties (any two of: the mix drains yet holds moisture, roots can spread in it, Soil A's 80% sand drains too fast and holds few nutrients). Model answer: Soil B is the better choice because <b>its balanced texture drains after rain but still holds the moisture and nutrients vegetables need</b>.", {});
  }
]), ["Match the soil to the job: drainage, water holding and firmness all follow texture.", "Give two texture-linked reasons, not just a preference."]);

/* CR denomination tranche additions (Nov 20, 2026): written
   entries closing the exact CR denomination gaps named in
   CR-Denomination-Gap-2026-11-20.md: s7-u4-cr-mineral-identify closes Unit 4 Test
   1 (4 marks, Level 2); s7-u4-cr-soil-formation closes Unit 4 Test
   3 (3 marks, Level 2). SME-flagged for the
   specialist pass. */
E("s7-u4-cr-mineral-identify", 4, ["SC7.10.1"], 2, "var", varset([
  function () {
    return textq("Two unknown samples are tested. The pair is calcite and quartz, in some order. Results: Sample A: hardness 3, scratched by a copper penny; white streak; glassy lustre; fizzes when a drop of dilute acid is placed on it. Sample B: hardness 7, scratches glass and is not scratched by a steel file; white streak; glassy lustre; no reaction to dilute acid. (a) Identify Sample A. (1) (b) Identify Sample B. (1) (c) Justify the identification of Sample A with TWO test results. (1) (d) Justify the identification of Sample B with TWO test results. (1) (4 marks)",
      ["Sample A is calcite: hardness 3 and fizzing in dilute acid both fit calcite and rule out quartz. Sample B is quartz: hardness 7 and no reaction to acid both fit quartz and rule out calcite."],
      "<b>Model answer:</b> (a) Sample A is calcite. (b) Sample B is quartz. (c) Sample A is calcite because its hardness is only 3, so a copper penny scratches it, which is far too soft for quartz; and it fizzes in dilute acid, the special reaction that identifies calcite, while quartz does not react at all. (d) Sample B is quartz because its hardness is 7, so it scratches glass and a steel file cannot scratch it, which is far too hard for calcite; and it shows no reaction to dilute acid, ruling calcite out. The streak and lustre are the same for both samples, so those results cannot separate the pair.<br><br><b>Marking points:</b> 1 mark for Sample A identified as calcite. 1 mark for Sample B identified as quartz. 1 mark for Sample A justified with two test results that fit calcite (hardness 3, or acid fizz). 1 mark for Sample B justified with two test results that fit quartz (hardness 7, or no acid reaction).", {});
  },
  function () {
    return textq("Two unknown samples are tested. The pair is hematite and magnetite, in some order. Results: Sample A: dark grey to black; metallic lustre; streak red-brown; hardness about 6; not attracted to a magnet. Sample B: black; metallic lustre; streak black; hardness about 6; strongly attracted to a magnet. (a) Identify Sample A. (1) (b) Identify Sample B. (1) (c) Justify the identification of Sample A with TWO test results. (1) (d) Justify the identification of Sample B with TWO test results. (1) (4 marks)",
      ["Sample A is hematite: its red-brown streak is the decisive result, and it is not magnetic. Sample B is magnetite: its black streak and strong attraction to a magnet both fit magnetite and rule out hematite."],
      "<b>Model answer:</b> (a) Sample A is hematite. (b) Sample B is magnetite. (c) Sample A is hematite because its streak is red-brown, the signature streak of hematite, whatever colour the sample itself appears; and it is not attracted to a magnet, which rules out magnetite, the look-alike it is most often confused with. (d) Sample B is magnetite because it is strongly attracted to a magnet, a property hematite does not show; and its streak is black, matching magnetite and not the red-brown streak of hematite. Hardness and lustre are about the same for the two, so they cannot do the separating.<br><br><b>Marking points:</b> 1 mark for Sample A identified as hematite. 1 mark for Sample B identified as magnetite. 1 mark for Sample A justified with two test results that fit hematite (red-brown streak, or no attraction to a magnet). 1 mark for Sample B justified with two test results that fit magnetite (strong attraction to a magnet, or black streak).", {});
  },
  function () {
    return textq("Two unknown samples are tested. The pair is mica and feldspar, in some order. Results: Sample A: silvery and shiny; splits easily into very thin, flexible sheets; hardness about 2.5, scratched by a fingernail with effort and easily by a copper penny; white streak. Sample B: dull pink to white; does not split into sheets, but breaks along flat surfaces in two directions; hardness 6, scratches glass; white streak. (a) Identify Sample A. (1) (b) Identify Sample B. (1) (c) Justify the identification of Sample A with TWO test results. (1) (d) Justify the identification of Sample B with TWO test results. (1) (4 marks)",
      ["Sample A is mica: splitting into thin flexible sheets and a low hardness of about 2.5 both fit mica. Sample B is feldspar: hardness 6 and flat cleavage surfaces in two directions, with no sheet splitting, both fit feldspar."],
      "<b>Model answer:</b> (a) Sample A is mica. (b) Sample B is feldspar. (c) Sample A is mica because it splits easily into very thin, flexible sheets, the cleavage behaviour that defines mica in this pair; and its hardness is only about 2.5, soft enough for a copper penny to scratch easily, which is far too soft for feldspar. (d) Sample B is feldspar because its hardness is 6, so it scratches glass, matching feldspar and ruling out the soft mica; and it breaks along flat cleavage surfaces in two directions without ever splitting into thin sheets, which is feldspar cleavage rather than mica sheet cleavage.<br><br><b>Marking points:</b> 1 mark for Sample A identified as mica. 1 mark for Sample B identified as feldspar. 1 mark for Sample A justified with two test results that fit mica (splitting into thin flexible sheets, or hardness about 2.5). 1 mark for Sample B justified with two test results that fit feldspar (hardness 6, or cleavage in two directions with no sheet splitting).", {});
  },
  function () {
    return textq("Two unknown samples are tested. The pair is halite and calcite, in some order. Results: Sample A: colourless to white; glassy lustre; hardness 2.5, scratched by a copper penny; breaks into small cube shaped pieces along flat surfaces; no reaction to dilute acid; a tiny cleaned grain tastes salty. Sample B: white; glassy to pearly lustre; hardness 3, scratched by a copper penny; breaks along flat surfaces that are not at right angles; fizzes when a drop of dilute acid is placed on it; no salty taste. (a) Identify Sample A. (1) (b) Identify Sample B. (1) (c) Justify the identification of Sample A with TWO test results. (1) (d) Justify the identification of Sample B with TWO test results. (1) (4 marks)",
      ["Sample A is halite: the salty taste and the cube shaped cleavage both fit halite, and it does not fizz in acid. Sample B is calcite: fizzing in dilute acid and hardness 3 both fit calcite and rule out halite."],
      "<b>Model answer:</b> (a) Sample A is halite. (b) Sample B is calcite. (c) Sample A is halite because a cleaned grain tastes salty, the special test for halite, which is rock salt; and it breaks into cube shaped pieces along flat surfaces at right angles, the cubic cleavage of halite, while showing no reaction to acid. (d) Sample B is calcite because it fizzes when dilute acid touches it, the reaction that identifies calcite in this pair; and its hardness is 3 with cleavage surfaces that are not at right angles, which fits calcite and not the cubic pattern of halite. Hardness alone is weak evidence here because the two values are close, so the taste, cleavage shape and acid results do the separating.<br><br><b>Marking points:</b> 1 mark for Sample A identified as halite. 1 mark for Sample B identified as calcite. 1 mark for Sample A justified with two test results that fit halite (salty taste, or cubic cleavage, or no acid reaction). 1 mark for Sample B justified with two test results that fit calcite (acid fizz, or hardness 3 with non cubic cleavage).", {});
  }
]), ["Find the decisive results first: a special reaction, a streak, or magnetism separates a pair faster than colour does.", "Each justification needs two results, and results the pair shares cannot separate them."]);

E("s7-u4-cr-soil-formation", 4, ["SC7.10.8", "SC7.10.9"], 2, "var", varset([
  function () {
    return textq("On a steep rocky hillside the soil is thin, stony and patchy, and bare rock shows through in many places. In the flat valley below the same hillside, the soil is deep, fine and dark, and few stones are found in it. (a) Explain how weathering, erosion and deposition together produced this difference between the hillside soil and the valley soil. (2) (b) State which soil better suits farming, and give a reason tied to particle size or to how the soil handles water. (1) (3 marks)",
      ["Weathering breaks the hillside rock down, but on the steep slope erosion by rain and gravity carries the weathered material downhill about as fast as it forms, so the hillside soil stays thin and stony. The eroded material is deposited where the slope levels out in the valley, building up deep, fine soil over time. The valley soil better suits farming: its finer particles and greater depth hold water and nutrients for roots instead of draining or washing away."],
      "<b>Model answer:</b> (a) Weathering acts in both places, breaking rock into smaller particles by processes such as frost wedging and root action. On the steep hillside, erosion wins: rain washes and gravity pulls the loosened material downhill about as fast as weathering can make it, so the soil never builds up and stays thin, stony and patchy over the rock. That same eroded material is carried to the valley and deposited there as the moving water slows on the flat ground. Deposition adds layer on layer in the valley, and mixed with decaying plant material it builds the deep, fine, dark soil. (b) The valley soil better suits farming. It is deep and made of finer particles, so it holds water and nutrients around plant roots, while the thin hillside soil holds little water, offers roots little depth, and keeps losing material to erosion.<br><br><b>Marking points:</b> 1 mark for weathering and erosion on the hillside: rock is broken down but the material is removed about as fast as it forms, leaving thin, stony soil. 1 mark for deposition in the valley: the eroded material settles on the flat ground and builds deep, fine soil. 1 mark for the valley soil chosen for farming, with a reason tied to depth, particle size, or water holding.", {});
  },
  function () {
    return textq("Beside a river, the soil on the flat riverside field is deep, smooth and fine grained, and it stays moist long after rain. On the hilltop above the river, the soil is thin and gritty, with small stones mixed through it, and it dries out quickly. (a) Explain how weathering, erosion and deposition together produced this difference between the riverside soil and the hilltop soil. (2) (b) State which soil better suits farming, and give a reason tied to particle size or to how the soil handles water. (1) (3 marks)",
      ["On the hilltop, weathering breaks rock down but wind and rain erode the fine material away, leaving a thin, gritty, stony soil. The river carries eroded material along and deposits it on the flat riverside field when flood water slows, building deep, fine soil. The riverside soil better suits farming because its fine particles hold water and nutrients, while the hilltop soil drains and dries quickly."],
      "<b>Model answer:</b> (a) Weathering breaks the hilltop rock into particles, but the hilltop is exposed: rain and wind erode the finer material and carry it down toward the river, so the soil left behind stays thin and gritty, with the coarser stones remaining. The river transports the eroded sediment, and when the river spreads over its flat bank or floods the field, the water slows and deposition drops its load of fine sediment on the riverside field. Repeated deposition builds the deep, smooth, fine grained soil there. (b) The riverside soil better suits farming. Its fine particles hold water in the soil for plant roots and keep it moist long after rain, while the thin, gritty hilltop soil lets water drain through quickly and dries out.<br><br><b>Marking points:</b> 1 mark for weathering and erosion on the hilltop: rock breaks down but fine material is carried away, leaving thin, gritty soil. 1 mark for transport and deposition by the river building deep, fine soil on the flat field. 1 mark for the riverside soil chosen for farming, with a reason tied to particle size or water holding.", {});
  },
  function () {
    return textq("A mountain slope is covered by a thin, coarse soil with angular rock fragments mixed through it, and patches of bare bedrock show between the plants. On the flat basin floor at the foot of the mountain, the soil is deep and much finer, with rounded grains and almost no large fragments near the surface. (a) Explain how weathering, erosion and deposition together produced this difference between the slope soil and the basin soil. (2) (b) State which soil better suits farming, and give a reason tied to particle size or to how the soil handles water. (1) (3 marks)",
      ["Weathering, including frost wedging, breaks the mountain rock into angular fragments, but gravity and running water erode them down the slope before a deep soil can form. Streams carry the fragments to the basin, breaking and rounding them on the way, and deposit them on the flat floor, where fine material settles and builds deep soil. The basin soil better suits farming: it is deep and fine, holding water for roots, while the slope soil is thin, coarse and drought prone."],
      "<b>Model answer:</b> (a) On the mountain, weathering breaks the bedrock down, and frost wedging in cracks pries angular fragments loose. The slope is steep, so erosion by gravity and by streams carries those fragments away downhill about as fast as they form, and the soil on the slope stays thin and coarse with bedrock showing. The streams transport the fragments toward the basin, tumbling and rounding them as they go. On the flat basin floor the water slows, deposition takes over, and the carried sediment, including the finest particles, settles out layer on layer, building a deep, fine soil. (b) The basin soil better suits farming. Its finer particles and greater depth hold water around roots instead of letting it drain straight through, while the thin, coarse slope soil dries quickly and gives roots little room.<br><br><b>Marking points:</b> 1 mark for weathering and erosion on the slope: rock is broken into fragments but they are removed downhill, leaving thin, coarse soil. 1 mark for transport and deposition on the basin floor building deep, fine soil. 1 mark for the basin soil chosen for farming, with a reason tied to particle size, depth, or water holding.", {});
  },
  function () {
    return textq("Along one farm, the upland field on a gentle rise has thin, sandy soil that warms and dries quickly in spring and needs watering in dry weeks. The lowland field at the bottom of the rise has deep, loamy soil that stays moist and is slow to dry after rain. (a) Explain how weathering, erosion and deposition together produced this difference between the upland soil and the lowland soil. (2) (b) State which soil better suits farming a crop that needs steady moisture, and give a reason tied to particle size or to how the soil handles water. (1) (3 marks)",
      ["Weathering forms soil material on the rise, but rain washes the finer particles down the slope (erosion), leaving the upland soil thin and sandy. The washed material is deposited at the bottom of the rise, building deep lowland soil with more fine particles mixed in. The lowland soil better suits a moisture loving crop because its finer, deeper soil holds water, while the sandy upland soil drains and dries fast."],
      "<b>Model answer:</b> (a) Weathering breaks down the rock and old soil material across the whole farm. On the rise, rain running down the gentle slope erodes the surface, and it carries the finer particles with it, so the upland soil is left thin and sandy, with mostly coarse particles that hold little water. At the bottom of the rise the running water slows, and deposition drops the carried fine material there. Over many years that deposited material, mixed with the soil forming in place and with decaying plant matter, builds the deep, loamy lowland soil. (b) The lowland soil better suits a crop that needs steady moisture. It is deeper and contains more fine particles, so it holds water in the root zone through dry weeks, while the sandy upland soil lets water drain away quickly and dries out.<br><br><b>Marking points:</b> 1 mark for weathering and erosion on the rise: fine material is washed away, leaving thin, sandy soil. 1 mark for deposition at the bottom of the rise building deep soil with more fine particles. 1 mark for the lowland soil chosen for the moisture loving crop, with a reason tied to particle size or water holding.", {});
  }
]), ["Keep the three processes apart: weathering breaks down in place, erosion carries away, deposition drops and builds up.", "The farming choice must be defended by particle size or water behaviour, not by depth alone without a reason."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s7-u1-boreal-effects":3,"s7-u1-boreal-practice":2,"s7-u1-career-match":2,"s7-u1-career-scenario":3,"s7-u1-chain-order":2,"s7-u1-classify-set":2,"s7-u1-communicate-format":2,"s7-u1-communicate-judge":3,"s7-u1-consumer-types":2,"s7-u1-cr-boreal-example":3,"s7-u1-cr-data-display":3,"s7-u1-cr-defend-position":3,"s7-u1-cr-design-experiment":4,"s7-u1-cr-effect-chain":3,"s7-u1-cr-energy-flow":3,"s7-u1-cr-factor-effect":2,"s7-u1-cr-habitat-defence":3,"s7-u1-cr-harvest-decision":3,"s7-u1-cr-marsh-change":2,"s7-u1-cr-niche-roles":2,"s7-u1-cr-recycling":2,"s7-u1-cr-silviculture":2,"s7-u1-cr-succession-compare":2,"s7-u1-cr-succession-evidence":3,"s7-u1-cr-succession-stages":2,"s7-u1-cr-three-interactions":3,"s7-u1-cr-web-change":3,"s7-u1-cr-web-interpret":3,"s7-u1-decomposer-role":2,"s7-u1-delimit-choose":2,"s7-u1-delimit-rewrite":3,"s7-u1-design-controls":3,"s7-u1-design-flaw":4,"s7-u1-ecosystem-infer":3,"s7-u1-energy-loss":2,"s7-u1-energy-transfer":3,"s7-u1-evaluate-next-step":4,"s7-u1-factor-classify":2,"s7-u1-flowchart-complete":3,"s7-u1-groups-interest":3,"s7-u1-harvest-effects":2,"s7-u1-instrument-choose":2,"s7-u1-interaction-classify":2,"s7-u1-interaction-examples":2,"s7-u1-key-choose":3,"s7-u1-key-work":2,"s7-u1-key-work-2":3,"s7-u1-niche-reason":3,"s7-u1-nutrient-cycle":2,"s7-u1-organization-set":3,"s7-u1-pond-interactions":3,"s7-u1-record-format":3,"s7-u1-record-plan":4,"s7-u1-recycling-scenario":3,"s7-u1-role-identify":2,"s7-u1-succession-identify":2,"s7-u1-succession-next-stage":3,"s7-u1-succession-order":2,"s7-u1-succession-sequence":3,"s7-u1-succession-types":2,"s7-u1-table-choose":2,"s7-u1-tolerance-curve":3,"s7-u1-variables-identify":2,"s7-u1-web-chains":3,"s7-u1-web-predict":4,"s7-u1-web-readoff":3,"s7-u1-web-removal":4,"s7-u1-web-roles":3,"s7-u2-absorb-classify":2,"s7-u2-absorb-predict":3,"s7-u2-activity-temp":2,"s7-u2-apparatus-choice":3,"s7-u2-apparatus-safety":2,"s7-u2-approaches":2,"s7-u2-calibrate":3,"s7-u2-career-match":2,"s7-u2-career-scenario":2,"s7-u2-change-name":2,"s7-u2-change-particles":3,"s7-u2-conclusion-refute":3,"s7-u2-cr-absorb":2,"s7-u2-cr-conclusion":3,"s7-u2-cr-design-test":4,"s7-u2-cr-display":3,"s7-u2-cr-expansion":3,"s7-u2-cr-expansion-use":2,"s7-u2-cr-heating-decision":3,"s7-u2-cr-heating-example":2,"s7-u2-cr-improvement":2,"s7-u2-cr-inquiry":3,"s7-u2-cr-instrument-design":4,"s7-u2-cr-instrument-jobs":3,"s7-u2-cr-plateau":3,"s7-u2-cr-pump-chain":3,"s7-u2-cr-radiant-explain":2,"s7-u2-cr-specific-heat":3,"s7-u2-cr-temp-explain":3,"s7-u2-cr-thermometer-choice":3,"s7-u2-cr-thermometer-display":2,"s7-u2-cr-transfer-explain":3,"s7-u2-design-absorb":3,"s7-u2-design-challenge":3,"s7-u2-expansion-scenario":3,"s7-u2-experiment-chain":4,"s7-u2-familiar-temp":2,"s7-u2-graph-choice":4,"s7-u2-graph-key":2,"s7-u2-heating-adv":3,"s7-u2-heating-disadv":3,"s7-u2-heating-tech":2,"s7-u2-hypothesis-form":2,"s7-u2-instrument-choose":4,"s7-u2-instrument-how":2,"s7-u2-instrument-match":2,"s7-u2-insulation-past":2,"s7-u2-needs-tech":2,"s7-u2-past-tech":3,"s7-u2-plateau-read":3,"s7-u2-pump-cycle":3,"s7-u2-safety-scenario":2,"s7-u2-shc-compare":3,"s7-u2-stove-three":3,"s7-u2-table-build":2,"s7-u2-temp-compare-samples":3,"s7-u2-temp-define":2,"s7-u2-thermometer-build":2,"s7-u2-thermometer-data":2,"s7-u2-thermometer-read":3,"s7-u2-thermometer-test":4,"s7-u2-thermos":3,"s7-u2-thermoscope":2,"s7-u2-tools-accurate":3,"s7-u2-tools-safety":2,"s7-u2-transfer-classify":2,"s7-u2-transfer-compare":3,"s7-u2-variables-plateau":2,"s7-u2-winter-clothing":3,"s7-u3-best-fit":2,"s7-u3-choose-technique":3,"s7-u3-classify-mixtures":2,"s7-u3-classify-pure":2,"s7-u3-combination":3,"s7-u3-conc-change":3,"s7-u3-conc-compare":3,"s7-u3-controls":2,"s7-u3-controls-judge":4,"s7-u3-cr-best-fit":3,"s7-u3-cr-classify":3,"s7-u3-cr-classify-explain":2,"s7-u3-cr-concentration":3,"s7-u3-cr-design-solubility":4,"s7-u3-cr-dissolving":3,"s7-u3-cr-distill":2,"s7-u3-cr-new-question":2,"s7-u3-cr-particle-classify":3,"s7-u3-cr-pure":2,"s7-u3-cr-salt-decision":3,"s7-u3-cr-separate":3,"s7-u3-cr-separation-plan":4,"s7-u3-cr-solubility":2,"s7-u3-cr-three-part":3,"s7-u3-daily-technique-choose":3,"s7-u3-daily-technique-id":2,"s7-u3-deicer-compare":3,"s7-u3-deicing-improve":2,"s7-u3-delimit":2,"s7-u3-delimit-plan":4,"s7-u3-dissolving-identify":3,"s7-u3-dissolving-particles":2,"s7-u3-distill-parts":2,"s7-u3-distill-vs-evap":3,"s7-u3-extrapolate":4,"s7-u3-fractional":2,"s7-u3-home-techniques":2,"s7-u3-hypothesis-background":3,"s7-u3-hypothesis-pattern":2,"s7-u3-hypothesis-temp":2,"s7-u3-interpolate":3,"s7-u3-light-test":3,"s7-u3-lives-effects":2,"s7-u3-method-match":2,"s7-u3-method-property":3,"s7-u3-mixture-classify-more":3,"s7-u3-particle-diagram-judge":3,"s7-u3-particle-pure":2,"s7-u3-procedure-order":3,"s7-u3-procedure-problem":2,"s7-u3-salt-classify-effects":3,"s7-u3-salt-negative":3,"s7-u3-salt-positive":2,"s7-u3-salt-science":4,"s7-u3-separation-plan":3,"s7-u3-separation-property":4,"s7-u3-solubility-temp":2,"s7-u3-solute-solvent":2,"s7-u3-solution-states":3,"s7-u3-tools-accurate":3,"s7-u3-tools-safety":2,"s7-u3-variables-solubility":3,"s7-u4-boundaries":2,"s7-u4-canadian-match":2,"s7-u4-canadian-scenario":2,"s7-u4-change-timeline":2,"s7-u4-change-why":3,"s7-u4-conclusion-refute":3,"s7-u4-convection":3,"s7-u4-cr-big-picture":3,"s7-u4-cr-change-explain":3,"s7-u4-cr-conclusion":3,"s7-u4-cr-design-investigation":4,"s7-u4-cr-distribution":3,"s7-u4-cr-event-compare":3,"s7-u4-cr-mineral-id":2,"s7-u4-cr-mineral-identify":4,"s7-u4-cr-mineral-tests":3,"s7-u4-cr-mountain-explain":2,"s7-u4-cr-past-theory":2,"s7-u4-cr-pattern":3,"s7-u4-cr-rock-journey":3,"s7-u4-cr-soil-case":2,"s7-u4-cr-soil-choice":2,"s7-u4-cr-soil-formation":3,"s7-u4-cr-table-display":2,"s7-u4-cr-theory-evolved":3,"s7-u4-cr-timeline":2,"s7-u4-cr-weathering":3,"s7-u4-cycle-diagram":2,"s7-u4-cycle-path":3,"s7-u4-distribution-data":2,"s7-u4-drift-evidence":3,"s7-u4-drift-flaw":3,"s7-u4-drift-identify":2,"s7-u4-earth-layers":2,"s7-u4-earthquake-why":2,"s7-u4-era-order":2,"s7-u4-event-effects":3,"s7-u4-event-order":3,"s7-u4-evidence-link":3,"s7-u4-fair-test-design":3,"s7-u4-fizz-variables":2,"s7-u4-fold-fault":2,"s7-u4-frost-wedging":2,"s7-u4-igneous-cooling":2,"s7-u4-instrument-choose":2,"s7-u4-instrument-read":2,"s7-u4-key-choose":3,"s7-u4-key-mineral":2,"s7-u4-key-mineral-2":3,"s7-u4-metamorphic-parent":3,"s7-u4-method-match":2,"s7-u4-method-plan":3,"s7-u4-mineral-id":2,"s7-u4-mineral-id-2":3,"s7-u4-mineral-pair":3,"s7-u4-mineral-properties":2,"s7-u4-mohs-order":2,"s7-u4-mountain-process":3,"s7-u4-mountain-scenario":3,"s7-u4-new-evidence":4,"s7-u4-past-explanations":2,"s7-u4-past-purpose":3,"s7-u4-ring-of-fire":4,"s7-u4-rock-families":2,"s7-u4-sedimentary-form":3,"s7-u4-shift-contrast":3,"s7-u4-soil-drainage":3,"s7-u4-soil-feel-test":3,"s7-u4-soil-form":2,"s7-u4-soil-texture":2,"s7-u4-streak-reliable":3,"s7-u4-study-tech":3,"s7-u4-table-build":2,"s7-u4-volcano-where":3,"s7-u4-weathering-types":2,"s7-u4-winter-chime":3};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={"s7-u1-boreal-effects":"b","s7-u1-boreal-practice":"b","s7-u1-career-match":"a","s7-u1-career-scenario":"a","s7-u1-chain-order":"a","s7-u1-classify-set":"a","s7-u1-communicate-format":"b","s7-u1-communicate-judge":"b","s7-u1-consumer-types":"a","s7-u1-decomposer-role":"b","s7-u1-delimit-choose":"b","s7-u1-delimit-rewrite":"b","s7-u1-design-controls":"b","s7-u1-design-flaw":"b","s7-u1-ecosystem-infer":"a","s7-u1-energy-loss":"b","s7-u1-energy-transfer":"b","s7-u1-evaluate-next-step":"b","s7-u1-factor-classify":"a","s7-u1-flowchart-complete":"a","s7-u1-groups-interest":"b","s7-u1-harvest-effects":"b","s7-u1-instrument-choose":"a","s7-u1-interaction-classify":"a","s7-u1-interaction-examples":"a","s7-u1-key-choose":"a","s7-u1-key-work":"a","s7-u1-key-work-2":"a","s7-u1-niche-reason":"b","s7-u1-nutrient-cycle":"a","s7-u1-organization-set":"a","s7-u1-pond-interactions":"a","s7-u1-record-format":"b","s7-u1-record-plan":"b","s7-u1-recycling-scenario":"b","s7-u1-role-identify":"a","s7-u1-succession-identify":"a","s7-u1-succession-next-stage":"b","s7-u1-succession-order":"a","s7-u1-succession-sequence":"a","s7-u1-succession-types":"a","s7-u1-table-choose":"b","s7-u1-tolerance-curve":"a","s7-u1-variables-identify":"a","s7-u1-web-chains":"a","s7-u1-web-predict":"b","s7-u1-web-readoff":"a","s7-u1-web-removal":"b","s7-u1-web-roles":"b","s7-u2-absorb-classify":"a","s7-u2-absorb-predict":"b","s7-u2-activity-temp":"b","s7-u2-apparatus-choice":"b","s7-u2-apparatus-safety":"b","s7-u2-approaches":"b","s7-u2-calibrate":"b","s7-u2-career-match":"b","s7-u2-career-scenario":"a","s7-u2-change-name":"a","s7-u2-change-particles":"b","s7-u2-conclusion-refute":"b","s7-u2-design-absorb":"b","s7-u2-design-challenge":"b","s7-u2-expansion-scenario":"b","s7-u2-experiment-chain":"b","s7-u2-familiar-temp":"a","s7-u2-graph-choice":"a","s7-u2-graph-key":"b","s7-u2-heating-adv":"b","s7-u2-heating-disadv":"b","s7-u2-heating-tech":"a","s7-u2-hypothesis-form":"b","s7-u2-instrument-choose":"b","s7-u2-instrument-how":"b","s7-u2-instrument-match":"a","s7-u2-insulation-past":"b","s7-u2-needs-tech":"b","s7-u2-past-tech":"b","s7-u2-plateau-read":"b","s7-u2-pump-cycle":"b","s7-u2-safety-scenario":"b","s7-u2-shc-compare":"a","s7-u2-stove-three":"b","s7-u2-table-build":"b","s7-u2-temp-compare-samples":"b","s7-u2-temp-define":"b","s7-u2-thermometer-build":"b","s7-u2-thermometer-data":"b","s7-u2-thermometer-read":"b","s7-u2-thermometer-test":"b","s7-u2-thermos":"b","s7-u2-thermoscope":"b","s7-u2-tools-accurate":"b","s7-u2-tools-safety":"b","s7-u2-transfer-classify":"a","s7-u2-transfer-compare":"b","s7-u2-variables-plateau":"b","s7-u2-winter-clothing":"b","s7-u3-best-fit":"b","s7-u3-choose-technique":"b","s7-u3-classify-mixtures":"a","s7-u3-classify-pure":"a","s7-u3-combination":"b","s7-u3-conc-change":"b","s7-u3-conc-compare":"a","s7-u3-controls":"b","s7-u3-controls-judge":"b","s7-u3-daily-technique-choose":"b","s7-u3-daily-technique-id":"a","s7-u3-deicer-compare":"b","s7-u3-deicing-improve":"b","s7-u3-delimit":"b","s7-u3-delimit-plan":"b","s7-u3-dissolving-identify":"a","s7-u3-dissolving-particles":"b","s7-u3-distill-parts":"b","s7-u3-distill-vs-evap":"b","s7-u3-extrapolate":"a","s7-u3-fractional":"b","s7-u3-home-techniques":"a","s7-u3-hypothesis-background":"b","s7-u3-hypothesis-pattern":"b","s7-u3-hypothesis-temp":"b","s7-u3-interpolate":"a","s7-u3-light-test":"b","s7-u3-lives-effects":"b","s7-u3-method-match":"a","s7-u3-method-property":"b","s7-u3-mixture-classify-more":"b","s7-u3-particle-diagram-judge":"b","s7-u3-particle-pure":"b","s7-u3-procedure-order":"b","s7-u3-procedure-problem":"b","s7-u3-salt-classify-effects":"b","s7-u3-salt-negative":"b","s7-u3-salt-positive":"b","s7-u3-salt-science":"b","s7-u3-separation-plan":"b","s7-u3-separation-property":"b","s7-u3-solubility-temp":"b","s7-u3-solute-solvent":"a","s7-u3-solution-states":"b","s7-u3-tools-accurate":"b","s7-u3-tools-safety":"b","s7-u3-variables-solubility":"b","s7-u4-boundaries":"b","s7-u4-canadian-match":"b","s7-u4-canadian-scenario":"b","s7-u4-change-timeline":"b","s7-u4-change-why":"b","s7-u4-conclusion-refute":"b","s7-u4-convection":"b","s7-u4-cycle-diagram":"b","s7-u4-cycle-path":"b","s7-u4-distribution-data":"b","s7-u4-drift-evidence":"b","s7-u4-drift-flaw":"b","s7-u4-drift-identify":"b","s7-u4-earth-layers":"b","s7-u4-earthquake-why":"b","s7-u4-era-order":"a","s7-u4-event-effects":"b","s7-u4-event-order":"a","s7-u4-evidence-link":"b","s7-u4-fair-test-design":"b","s7-u4-fizz-variables":"a","s7-u4-fold-fault":"b","s7-u4-frost-wedging":"b","s7-u4-igneous-cooling":"b","s7-u4-instrument-choose":"b","s7-u4-instrument-read":"b","s7-u4-key-choose":"b","s7-u4-key-mineral":"a","s7-u4-key-mineral-2":"a","s7-u4-metamorphic-parent":"a","s7-u4-method-match":"b","s7-u4-method-plan":"b","s7-u4-mineral-id":"a","s7-u4-mineral-id-2":"a","s7-u4-mineral-pair":"b","s7-u4-mineral-properties":"a","s7-u4-mohs-order":"b","s7-u4-mountain-process":"b","s7-u4-mountain-scenario":"b","s7-u4-new-evidence":"b","s7-u4-past-explanations":"b","s7-u4-past-purpose":"b","s7-u4-ring-of-fire":"b","s7-u4-rock-families":"a","s7-u4-sedimentary-form":"b","s7-u4-shift-contrast":"b","s7-u4-soil-drainage":"b","s7-u4-soil-feel-test":"b","s7-u4-soil-form":"b","s7-u4-soil-texture":"b","s7-u4-streak-reliable":"b","s7-u4-study-tech":"b","s7-u4-table-build":"b","s7-u4-volcano-where":"b","s7-u4-weathering-types":"b","s7-u4-winter-chime":"b"};
