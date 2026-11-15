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
