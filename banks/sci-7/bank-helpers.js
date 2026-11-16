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
