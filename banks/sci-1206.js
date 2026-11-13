/* Science 1206 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-1206/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Science 1206 bank helpers: shared RNG and formatting, significant
// figure machinery implementing Appendix A of the curriculum guide,
// generated figure builders (graphs, wind belts, front symbols, the
// carbon cycle, food webs) and the chemistry data tables the naming,
// formula and balancing generators draw on. All figures are original
// generated SVG drawn from each question's own values, per the
// rewrite rule for this course. Front colours follow weather-map
// convention; graph ink follows the chassis palette.

function s6ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function s6pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function s6shuf(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function s6fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function s6f1(x) { return Math.round(x * 10) / 10; }

/* Format x to n significant figures (Appendix A: the calculated
   answer carries the sig figs of the least precise measurement). */
function s6sf(x, n) {
  if (x === 0) return "0";
  var neg = x < 0; x = Math.abs(x);
  var p = Math.floor(Math.log10(x));
  var scale = Math.pow(10, p - n + 1);
  var v = Math.round(x / scale) * scale;
  p = Math.floor(Math.log10(v) + 1e-9);
  var dec = Math.max(0, n - 1 - p);
  var s = v.toFixed(dec);
  return (neg ? "-" : "") + s;
}
/* Count the significant figures in a displayed measurement, Appendix A
   rules: non-zero digits count; captive zeros count; leading zeros
   never count; trailing zeros count only when a decimal point is
   shown (25.0 has three, 250 has two). */
function s6countSF(s) {
  s = String(s).replace(/[\s,]/g, "");
  var hasDot = s.indexOf(".") >= 0;
  var digs = s.replace(".", "").replace(/^-/, "").replace(/^0+/, "");
  if (digs === "") return 0;
  if (!hasDot) digs = digs.replace(/0+$/, "");
  return digs.length;
}
/* Round a displayed decimal string to n significant figures, as text. */
function s6roundSF(s, n) {
  var v = parseFloat(s);
  return s6sf(v, n);
}
/* Three distinct wrong numbers near a key value. */
function s6numDist(key, cands, suffix) {
  var seen = {}; seen[key] = 1; var out = [];
  var pool = s6shuf(cands);
  for (var i = 0; i < pool.length && out.length < 3; i++) {
    var v = Math.round(pool[i] * 100) / 100;
    if (!seen[v]) { seen[v] = 1; out.push(v); }
  }
  var bump = 2;
  while (out.length < 3) { var w = key + bump; if (!seen[w]) { seen[w] = 1; out.push(w); } bump += 3; }
  return out.map(function (v) { return String(v) + (suffix || ""); });
}

var S6_INK = "#17352a", S6_ACC = "#2e7d4f", S6_ALT = "#b3541e", S6_GRID = "#c8d8ce", S6_BLUE = "#2456a6", S6_RED = "#c0392b";
function s6txt(x, y, s, size, bold, anchor, fill) {
  return '<text x="' + s6f1(x) + '" y="' + s6f1(y) + '" font-size="' + (size || 12.5) + '" fill="' + (fill || S6_INK) + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + ">" + s + "</text>";
}

/* Generic line graph: cfg {xMax, yMax, xStep, yStep, xLab, yLab,
   lines: [{pts:[[x,y],...]} or {fn:fn, n:samples}], each with col and
   optional dash; dots: [[x,y],...] markers; title}. Axis values are
   formatted compactly. */
function s6GraphSVG(cfg) {
  var W = 430, H = 300, L = 56, B = 40, T = 16, R = 14;
  var iw = W - L - R, ih = H - T - B;
  function X(x) { return L + iw * x / cfg.xMax; }
  function Y(y) { return T + ih - ih * y / cfg.yMax; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="430" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Generated graph">';
  for (var gx = 0; gx <= cfg.xMax + 1e-9; gx += cfg.xStep) {
    out += '<line x1="' + s6f1(X(gx)) + '" y1="' + T + '" x2="' + s6f1(X(gx)) + '" y2="' + (T + ih) + '" stroke="' + S6_GRID + '" stroke-width="1"/>';
    out += s6txt(X(gx), T + ih + 14, String(Math.round(gx * 100) / 100), 11, false);
  }
  for (var gy = 0; gy <= cfg.yMax + 1e-9; gy += cfg.yStep) {
    out += '<line x1="' + L + '" y1="' + s6f1(Y(gy)) + '" x2="' + (L + iw) + '" y2="' + s6f1(Y(gy)) + '" stroke="' + S6_GRID + '" stroke-width="1"/>';
    out += s6txt(L - 7, Y(gy), String(Math.round(gy * 100) / 100), 11, false, "end");
  }
  out += '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + ih) + '" stroke="' + S6_INK + '" stroke-width="1.8"/>';
  out += '<line x1="' + L + '" y1="' + (T + ih) + '" x2="' + (L + iw) + '" y2="' + (T + ih) + '" stroke="' + S6_INK + '" stroke-width="1.8"/>';
  out += s6txt(L + iw / 2, H - 4, cfg.xLab, 12.5, true);
  out += '<text x="15" y="' + (T + ih / 2) + '" font-size="12.5" font-weight="bold" fill="' + S6_INK + '" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 15 ' + (T + ih / 2) + ')">' + cfg.yLab + "</text>";
  (cfg.lines || []).forEach(function (ln) {
    var pts = ln.pts;
    if (ln.fn) { pts = []; for (var i = 0; i <= (ln.n || 40); i++) { var x = cfg.xMax * i / (ln.n || 40); pts.push([x, ln.fn(x)]); } }
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + s6f1(X(p[0])) + "," + s6f1(Y(p[1])); }).join(" ");
    out += '<path d="' + d + '" fill="none" stroke="' + (ln.col || S6_ACC) + '" stroke-width="2.4"' + (ln.dash ? ' stroke-dasharray="6 4"' : "") + "/>";
    if (ln.label) { var lp = ln.labelPt || pts[pts.length - 1]; out += s6txt(X(lp[0]) - 4, Y(lp[1]) - 10, ln.label, 13, true, "end", ln.col || S6_ACC); }
  });
  (cfg.dots || []).forEach(function (p) {
    out += '<circle cx="' + s6f1(X(p[0])) + '" cy="' + s6f1(Y(p[1])) + '" r="3.6" fill="' + S6_INK + '"/>';
  });
  return out + "</svg>";
}

/* A single front segment with its standard symbols. kind: "cold"
   (triangles), "warm" (semicircles), "stationary" (both, opposite
   sides). The symbols sit on the side the front moves toward for cold
   and warm fronts. */
function s6FrontSVG(kind) {
  var out = '<svg viewBox="0 0 360 110" width="360" height="110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Front symbol segment">';
  var y = 55, col = kind === "cold" ? S6_BLUE : (kind === "warm" ? S6_RED : S6_INK);
  out += '<line x1="25" y1="' + y + '" x2="335" y2="' + y + '" stroke="' + col + '" stroke-width="3"/>';
  for (var x = 60; x <= 320; x += 52) {
    if (kind === "cold" || kind === "stationary")
      out += '<polygon points="' + (x - 9) + ',' + y + ' ' + x + ',' + (y - 15) + ' ' + (x + 9) + ',' + y + '" fill="' + S6_BLUE + '"/>';
    if (kind === "warm")
      out += '<path d="M' + (x - 9) + ',' + y + ' A 9 9 0 0 1 ' + (x + 9) + ',' + y + ' Z" fill="' + S6_RED + '"/>';
    if (kind === "stationary")
      out += '<path d="M' + (x - 9 + 26) + ',' + y + ' A 9 9 0 0 0 ' + (x + 9 + 26) + ',' + y + ' Z" fill="' + S6_RED + '"/>';
  }
  return out + "</svg>";
}

/* Global wind belts on an Earth schematic. mode "zones": the six
   bands carry letters A to F (north to south) for identification
   questions; mode "calm": the equator and the two 30 degree lines are
   lettered instead. Belt directions follow the standard model the
   FrenchWinds app teaches: trades blow toward the equator and west,
   westerlies toward the poles and east, polar winds toward the
   equator and west. */
function s6WindBeltSVG(mode) {
  var cx = 215, cy = 165, r = 128;
  function latY(lat) { return cy - r * Math.sin(lat * Math.PI / 180); }
  var out = '<svg viewBox="0 0 430 330" width="430" height="330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Earth wind belt diagram">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#f4f8fb" stroke="' + S6_INK + '" stroke-width="1.8"/>';
  [60, 30, 0, -30, -60].forEach(function (lat) {
    out += '<line x1="' + (cx - Math.sqrt(r * r - Math.pow(r * Math.sin(lat * Math.PI / 180), 2))) + '" y1="' + s6f1(latY(lat)) + '" x2="' + (cx + Math.sqrt(r * r - Math.pow(r * Math.sin(lat * Math.PI / 180), 2))) + '" y2="' + s6f1(latY(lat)) + '" stroke="#9db8a8" stroke-width="1.1"' + (lat === 0 ? ' stroke-dasharray="5 3"' : "") + "/>";
    out += s6txt(cx + r + 16, latY(lat), Math.abs(lat) + "°" + (lat > 0 ? "N" : (lat < 0 ? "S" : "")), 11, false, "start");
  });
  function arrow(x, y, dx, dy, col) {
    var len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    var ex = x + dx, ey = y + dy;
    var a1 = Math.atan2(uy, ux) + 2.65, a2 = Math.atan2(uy, ux) - 2.65;
    return '<line x1="' + x + '" y1="' + y + '" x2="' + ex + '" y2="' + ey + '" stroke="' + col + '" stroke-width="2.6"/>' +
      '<polygon points="' + ex + ',' + ey + ' ' + (ex + 11 * Math.cos(a1)) + ',' + (ey + 11 * Math.sin(a1)) + ' ' + (ex + 11 * Math.cos(a2)) + ',' + (ey + 11 * Math.sin(a2)) + '" fill="' + col + '"/>';
  }
  var bands = [
    { mid: 75, dx: -34, dy: 16, col: S6_BLUE },   /* polar easterlies N: toward equator-west (down-left on the page) */
    { mid: 45, dx: 36, dy: -16, col: S6_ACC },    /* westerlies N: toward pole-east (up-right) */
    { mid: 15, dx: -36, dy: 15, col: S6_ALT },    /* NE trades: toward equator-west */
    { mid: -15, dx: -36, dy: -15, col: S6_ALT },  /* SE trades: toward equator-west (up-left on the page) */
    { mid: -45, dx: 36, dy: 15, col: S6_ACC },    /* westerlies S: toward pole-east */
    { mid: -75, dx: -34, dy: -16, col: S6_BLUE }  /* polar easterlies S: toward equator-west */
  ];
  bands.forEach(function (b, i) {
    var y = latY(b.mid);
    out += arrow(cx + 18, y, b.dx, b.dy, b.col);
    out += arrow(cx - 62, y, b.dx, b.dy, b.col);
    if (mode === "zones") out += s6txt(38, y, "ABCDEF"[i], 16, true);
  });
  if (mode === "calm") {
    out += s6txt(38, latY(0), "X", 16, true);
    out += s6txt(38, latY(30), "Y", 16, true);
    out += s6txt(38, latY(-30), "Z", 16, true);
  }
  return out + "</svg>";
}

/* Carbon cycle schematic with numbered processes:
   1 air to plants (photosynthesis), 2 plants to animals (feeding),
   3 animals to air (respiration), 4 plants to air (respiration),
   5 animals to decomposers (death and waste),
   6 decomposers to air (decay releases carbon dioxide),
   7 fossil fuels to air (combustion). */
function s6CycleSVG() {
  var out = '<svg viewBox="0 0 470 300" width="470" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Carbon cycle diagram with numbered processes">';
  function box(x, y, w, label) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="34" rx="7" fill="#eef6f0" stroke="' + S6_INK + '" stroke-width="1.6"/>' + s6txt(x + w / 2, y + 17, label, 12.5, true);
  }
  function arr(x1, y1, x2, y2, n, lx, ly) {
    var a = Math.atan2(y2 - y1, x2 - x1), s = "";
    s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + S6_ACC + '" stroke-width="2.2"/>';
    s += '<polygon points="' + x2 + ',' + y2 + ' ' + (x2 + 10 * Math.cos(a + 2.7)) + ',' + (y2 + 10 * Math.sin(a + 2.7)) + ' ' + (x2 + 10 * Math.cos(a - 2.7)) + ',' + (y2 + 10 * Math.sin(a - 2.7)) + '" fill="' + S6_ACC + '"/>';
    s += '<circle cx="' + lx + '" cy="' + ly + '" r="10" fill="#fff" stroke="' + S6_INK + '" stroke-width="1.4"/>' + s6txt(lx, ly, String(n), 12, true);
    return s;
  }
  out += box(165, 12, 140, "Atmosphere (CO2)");
  out += box(28, 128, 120, "Plants");
  out += box(322, 128, 120, "Animals");
  out += box(322, 238, 120, "Decomposers");
  out += box(28, 238, 140, "Fossil fuels");
  out += arr(190, 46, 105, 124, 1, 128, 78);
  out += arr(148, 145, 318, 145, 2, 233, 132);
  out += arr(345, 124, 285, 50, 3, 330, 78);
  out += arr(120, 124, 195, 50, 4, 138, 78);
  out += arr(382, 162, 382, 234, 5, 398, 198);
  out += arr(345, 238, 282, 54, 6, 322, 150);
  out += arr(98, 234, 190, 52, 7, 118, 150);
  return out + "</svg>";
}

/* ---------- Chemistry data (Science 1206 Data Tables scope) ---------- */
var S6_SUBD = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
function s6sub(n) { return n === 1 ? "" : String(n).split("").map(function (d) { return S6_SUBD[d]; }).join(""); }
function s6gcd(a, b) { return b ? s6gcd(b, a % b) : a; }
/* Build a neutral formula string from a cation {sym, chg, poly} and an
   anion {sym, chg, poly}. */
function s6formula(cat, an) {
  var g = s6gcd(cat.chg, an.chg);
  var nc = an.chg / g, na = cat.chg / g;
  var cs = cat.poly && nc > 1 ? "(" + cat.sym + ")" : cat.sym;
  var as = an.poly && na > 1 ? "(" + an.sym + ")" : an.sym;
  return cs + s6sub(nc) + as + s6sub(na);
}
var S6_CATIONS = [
  { sym: "Na", chg: 1, name: "sodium" }, { sym: "K", chg: 1, name: "potassium" },
  { sym: "Li", chg: 1, name: "lithium" }, { sym: "Ag", chg: 1, name: "silver" },
  { sym: "Mg", chg: 2, name: "magnesium" }, { sym: "Ca", chg: 2, name: "calcium" },
  { sym: "Ba", chg: 2, name: "barium" }, { sym: "Zn", chg: 2, name: "zinc" },
  { sym: "Al", chg: 3, name: "aluminum" }
];
var S6_CATIONS_MULTI = [
  { sym: "Fe", chg: 2, name: "iron(II)" }, { sym: "Fe", chg: 3, name: "iron(III)" },
  { sym: "Cu", chg: 1, name: "copper(I)" }, { sym: "Cu", chg: 2, name: "copper(II)" },
  { sym: "Pb", chg: 2, name: "lead(II)" }, { sym: "Pb", chg: 4, name: "lead(IV)" },
  { sym: "Sn", chg: 2, name: "tin(II)" }, { sym: "Sn", chg: 4, name: "tin(IV)" }
];
var S6_ANIONS = [
  { sym: "Cl", chg: 1, name: "chloride" }, { sym: "F", chg: 1, name: "fluoride" },
  { sym: "Br", chg: 1, name: "bromide" }, { sym: "I", chg: 1, name: "iodide" },
  { sym: "O", chg: 2, name: "oxide" }, { sym: "S", chg: 2, name: "sulfide" },
  { sym: "N", chg: 3, name: "nitride" }
];
var S6_ANIONS_POLY = [
  { sym: "OH", chg: 1, name: "hydroxide", poly: 1 }, { sym: "NO3", chg: 1, name: "nitrate", poly: 1 },
  { sym: "HCO3", chg: 1, name: "hydrogen carbonate", poly: 1 },
  { sym: "CO3", chg: 2, name: "carbonate", poly: 1 }, { sym: "SO4", chg: 2, name: "sulfate", poly: 1 },
  { sym: "PO4", chg: 3, name: "phosphate", poly: 1 }
];
var S6_NH4 = { sym: "NH4", chg: 1, name: "ammonium", poly: 1 };
/* Formula text with unicode subscripts from a plain formula (NO3 -> NO₃). */
function s6fsub(plain) {
  return plain.replace(/(\d+)/g, function (m) { return m.split("").map(function (d) { return S6_SUBD[d]; }).join(""); });
}

/* ---------- Weather data generator (SC10.6.5) ----------
   A five-day station record in the Weather Station & Grapher format
   (temperature in °C, pressure in hPa, wind in km/h with a compass
   direction, precipitation in mm). One of three story arcs is rolled
   (a cold front passes, a high settles in, or steady unsettled low),
   and every day's values are generated from the arc, so the pressure
   tendency and the correct prediction are consistent by construction. */
function s6WxSeries() {
  var arc = s6pick(["front", "high", "low"]);
  var dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  var days = [], i, T, P, W, D, R;
  if (arc === "front") {
    T = s6ri(11, 16); P = s6f1(1012 + Math.random() * 4);
    var pre = [pick2dir(["S", "SE", "SW"]), pick2dir(["S", "SW"])];
    for (i = 0; i < 2; i++) {
      days.push({ T: T, P: P, W: s6ri(12, 26), D: pre[i], R: 0 });
      T += s6ri(0, 2); P = s6f1(P - (2 + Math.random() * 3));
    }
    days.push({ T: T, P: P, W: s6ri(28, 44), D: "SW", R: s6f1(4 + Math.random() * 9) });
    T -= s6ri(7, 11); P = s6f1(P + 3 + Math.random() * 3);
    days.push({ T: T, P: P, W: s6ri(24, 38), D: "NW", R: s6f1(Math.random() * 2) });
    T -= s6ri(1, 3); P = s6f1(P + 2 + Math.random() * 3);
    days.push({ T: T, P: P, W: s6ri(10, 20), D: "NW", R: 0 });
  } else if (arc === "high") {
    T = s6ri(6, 12); P = s6f1(1018 + Math.random() * 4);
    for (i = 0; i < 5; i++) {
      days.push({ T: T, P: P, W: s6ri(4, 12), D: s6pick(["N", "NE", "E", "NW"]), R: 0 });
      T += s6ri(0, 2); P = s6f1(Math.min(1036, P + 1 + Math.random() * 2.5));
    }
  } else {
    T = s6ri(4, 9); P = s6f1(996 + Math.random() * 6);
    for (i = 0; i < 5; i++) {
      days.push({ T: T, P: P, W: s6ri(20, 38), D: s6pick(["E", "SE", "S"]), R: s6f1(2 + Math.random() * 10) });
      T += s6ri(-1, 1); P = s6f1(P + (Math.random() * 3 - 1.5));
    }
  }
  function pick2dir(a) { return a[Math.floor(Math.random() * a.length)]; }
  var lines = days.map(function (d, ix) {
    return "Day " + (ix + 1) + ": Temp: " + d.T + "°C | Precip: " + d.R.toFixed(1) + " mm | Pressure: " + d.P.toFixed(1) + " hPa | Wind: " + d.W + " km/h " + d.D;
  });
  return { arc: arc, days: days, lines: lines };
}

/* A readable axis step for a graph range: about five to seven ticks. */
function s6niceStep(max) {
  var cands = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
  for (var i = 0; i < cands.length; i++) if (cands[i] >= max / 6) return cands[i];
  return 1000;
}
/* Pick the first n distinct strings from a candidate list, excluding the key. */
function s6dis(key, cands, n) {
  var out = [];
  for (var i = 0; i < cands.length && out.length < n; i++) {
    var c = String(cands[i]);
    if (c === "NaN") continue; /* sodium nitride's no-subscript string; reads as an error */
    if (c !== String(key) && out.indexOf(c) < 0) out.push(c);
  }
  return out;
}

/* ----- bank-u1.js ----- */
// CRMARKS: sci-u1-cr-climate=4
// CRMARKS: sci-u1-cr-frontpass=3
// CRMARKS: sci-u1-cr-forecast=3
// Science 1206 Unit 1 bank: Weather Dynamics (SC10.6.1 to 6.5).
// Original entries written for this app from the question types in
// the source analysis (heat sinks, heat transfer, currents, weather
// systems, meteorological data). Synoptic map reading items live in
// bank-u1-maps.js (approved prototype v3, Nov 12, 2026); the unit's
// other diagram types are front symbols, the wind belt diagram and
// generated data records (s6WxSeries in bank-helpers.js).

/* ---------- SC10.6.1 Heat sinks ---------- */

E("sci-u1-heatsink-def", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Why is the ocean described as a heat sink for coastal regions?",
      "It absorbs and stores large amounts of heat and releases it slowly",
      ["It reflects almost all of the Sun's energy back into space", "It produces its own heat through currents", "It blocks heat from reaching the land"],
      "A heat sink absorbs and stores heat. Water has a high heat capacity, so the ocean soaks up a great deal of solar energy in summer and gives it back slowly, moderating the climate of nearby land. The ocean does not make its own heat, and reflection is the albedo idea, not storage.", {});
  },
  function () {
    return mcq("Which property of water makes the oceans effective heat sinks?",
      "Water heats up and cools down slowly compared with land",
      ["Water is always warmer than the land beside it", "Water reflects more sunlight than any land surface", "Water stops moving once it has absorbed heat"],
      "Water's high specific heat capacity means it takes a lot of energy to change its temperature, so oceans warm and cool slowly and store heat in between. Water is not always warmer than land: in summer the land is usually warmer.", {});
  },
  function () {
    return mcq("The hydrosphere and atmosphere act as heat sinks mainly because they",
      "absorb, store and transport solar energy around the planet",
      ["prevent solar energy from reaching Earth's surface", "convert solar energy directly into wind", "keep every region at the same temperature"],
      "Oceans and air absorb solar energy, store it, and move it through currents and winds, evening out temperatures between regions. They do not block the energy or erase temperature differences completely.", {});
  }
]), ["Think about what a sink does: it takes something in and holds it. Which option has the ocean taking in and holding heat?"]);

E("sci-u1-specific-heat", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("Two towns sit at the same latitude. Town A is on the coast and Town B is 300 km inland. In January, Town A's average temperature is -2 °C and Town B's is -14 °C. The best explanation is that",
      "the ocean stores summer heat and releases it through the fall and winter, keeping the coast milder",
      ["the coast receives more direct sunlight in winter than the interior", "ocean water freezes and gives off heat all winter long", "winds blow only from the ocean toward Town A"],
      "At the same latitude both towns receive the same sunlight. The difference is storage: the ocean absorbed heat all summer and releases it slowly, so the coastal town stays milder. The inland town, surrounded by land that cools quickly, gets much colder.", {});
  },
  function () {
    return mcq("On a summer afternoon, the sand at a beach is too hot to walk on while the ocean water beside it is still cool. This happens because",
      "land has a lower specific heat capacity than water, so the sand's temperature rises faster",
      ["the Sun shines more strongly on sand than on water", "the water reflects all of the Sun's energy", "the sand absorbs heat and the water does not"],
      "Both surfaces receive the same sunlight. Sand (land) heats quickly because it takes little energy to raise its temperature; water needs much more energy for the same rise, so it stays cool. Both absorb energy: the difference is how much their temperatures change.", {});
  },
  function () {
    return mcq("A coastal city and an inland city have the same summer daytime high of 24 °C. At midnight the coastal city is at 19 °C and the inland city is at 11 °C. The coastal city cools less overnight because",
      "the nearby ocean releases stored heat, slowing the cooling of the air above the coast",
      ["the ocean produces heat during the night", "clouds never form over coastal cities", "the land near the coast cannot lose heat"],
      "The ocean stored heat during the day (and the season) and gives it back slowly at night, so coastal air cools less. Land stores little heat, so the inland city radiates its heat away and cools quickly.", {});
  },
  function () {
    return mcq("Which statement correctly compares how land and water respond to the same amount of added heat?",
      "The land's temperature rises more than the water's temperature",
      ["The water's temperature rises more than the land's temperature", "Both rise by exactly the same amount", "Neither changes temperature; the heat only drives currents"],
      "Water's specific heat capacity is much higher than land's, so the same energy input produces a smaller temperature change in water. This single fact drives coastal moderation, sea breezes and much of the weather in this unit.", {});
  }
]), ["Compare the two places: what is different about the surface beside each one, and how does that surface handle stored heat?"]);

E("sci-u1-heatsink-app", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("St. John's often has its warmest weather in late August and September, weeks after the longest day. The main reason is that",
      "the Atlantic Ocean takes all summer to warm up and keeps releasing heat into the fall",
      ["Earth is closest to the Sun in September", "the Labrador Current stops flowing in the fall", "daylight lasts longer in September than in June"],
      "The ocean is a slow heat store. It lags the seasons: still cold in spring, still warm in early fall. Day length peaks in June, so sunlight alone cannot explain a September warm peak.", {});
  },
  function () {
    return mcq("Gardeners near a large lake can often grow plants that would be killed by early frost a short distance inland. The lake helps because it",
      "releases stored heat at night and in the fall, keeping nearby air a few degrees warmer",
      ["reflects extra sunlight onto the plants in the evening", "stops frost from forming anywhere in the region", "raises the altitude of the shoreline"],
      "The lake's stored heat leaks back into the air during cool nights, delaying the first frost near shore. The effect is a few degrees and local; it does not prevent frost across the whole region.", {});
  },
  function () {
    return mcq("Why do weather forecasters treat the ocean surface temperature as important for predicting a coastal storm's strength?",
      "The ocean is the stored-energy source the storm draws its heat and moisture from",
      ["The ocean surface blocks storms from forming", "Storms are pushed only by the temperature of the land", "Ocean temperature determines the direction of the jet stream"],
      "Storms over water feed on the heat stored in the surface ocean and the moisture evaporating from it. Warm stored water means more available energy, which is why forecasters track it.", {});
  }
]), ["Look for the heat storage idea: slow warming, slow cooling, heat given back later."]);

E("sci-u1-albedo", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Albedo is a measure of",
      "the fraction of incoming sunlight a surface reflects",
      ["the heat a surface stores overnight", "the temperature a surface reaches at noon", "the amount of water vapour above a surface"],
      "Albedo is reflectivity: fresh snow reflects most incoming sunlight (high albedo), while dark ocean water absorbs most of it (low albedo). It is about reflection, not storage or temperature directly.", {});
  },
  function () {
    return mcq("Which surface has the highest albedo?",
      "Fresh snow",
      ["Open ocean water", "A dark asphalt parking lot", "A green forest"],
      "Fresh snow reflects up to about 80 to 90 percent of incoming sunlight. Ocean water, asphalt and forest are all dark surfaces that absorb most sunlight, so their albedos are low.", {});
  },
  function () {
    return mcq("A dark roof and a white roof receive the same sunlight on a summer day. The dark roof becomes much hotter because it has",
      "a lower albedo, so it absorbs more of the sunlight",
      ["a higher albedo, so it absorbs more of the sunlight", "a lower albedo, so it reflects more of the sunlight", "a higher albedo, so it reflects more of the sunlight"],
      "Low albedo means little reflection and much absorption, so the dark roof heats up. The two options that pair low albedo with reflection, or high albedo with absorption, contradict the meaning of the term.", {});
  }
]), ["Albedo is about reflection. Which surface sends the most sunlight back?"]);

E("sci-u1-albedo-effect", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("As Arctic sea ice melts, more dark ocean water is exposed. This speeds up further warming because the exposed water",
      "has a lower albedo than the ice, so it absorbs more sunlight and warms, melting still more ice",
      ["has a higher albedo than the ice, so it reflects more sunlight", "blocks sunlight from reaching the remaining ice", "cools the air, which then freezes more water elsewhere"],
      "This is the ice-albedo feedback: ice reflects, water absorbs. Losing ice replaces a reflector with an absorber, adding heat, which melts more ice. The loop reinforces itself.", {});
  },
  function () {
    return mcq("Two fields side by side receive equal sunlight. One is bare dark soil and the other is covered with light-coloured straw mulch. After several hours, the air just above the soil field is warmer mainly because the soil",
      "absorbed more sunlight due to its lower albedo and heated the air in contact with it",
      ["reflected more sunlight into the air above it", "stored heat from the previous night", "blocked the wind from cooling it"],
      "Dark soil absorbs more sunlight (lower albedo), becomes hotter, and heats the air touching it by conduction and then convection. Reflected sunlight mostly passes back through the air without warming it directly.", {});
  },
  function () {
    return mcq("A town paints its flat rooftops white. The most likely local effect on a sunny summer day is",
      "slightly cooler air temperatures in the town, because less solar energy is absorbed by the roofs",
      ["warmer air temperatures, because white surfaces store more heat", "no change, because albedo does not affect temperature", "more rainfall, because reflected sunlight seeds clouds"],
      "Raising the albedo of the roofs means more sunlight is reflected and less is absorbed as heat, so the surfaces and the air above them stay a little cooler. Albedo does affect temperature: that is the point of the change.", {});
  }
]), ["Follow the energy: does the surface reflect it away or absorb it as heat? Then ask what that does next."]);

/* ---------- SC10.6.2 Heat transfer ---------- */

var S6_TRANSFER_SCEN = [
  { s: "A metal spoon left in a pot of hot soup becomes hot at the handle end", k: "Conduction", w: "Heat travels through the metal itself, from particle to particle, from the hot end to the cooler end. That direct transfer through a material is conduction." },
  { s: "Warm air above a radiator rises and cooler air moves in to take its place, setting up a circulating current", k: "Convection", w: "The air itself moves and carries the heat with it. Bulk movement of a heated fluid is convection." },
  { s: "You can feel the heat of a campfire on your face from two metres away, with no contact and no air current toward you", k: "Radiation", w: "The energy crosses the gap as electromagnetic waves, needing no material between the fire and your face. That is radiation." },
  { s: "A cast-iron frying pan heats evenly after a few minutes on a burner", k: "Conduction", w: "Heat spreads through the solid iron by conduction, from the part touching the burner to the rest of the pan." },
  { s: "Water at the bottom of a pot is heated, becomes less dense and rises, while cooler water sinks to replace it", k: "Convection", w: "The water circulates: heated water rises and cooler water sinks. Moving fluid carrying heat is convection." },
  { s: "The Sun warms the sand on a beach even though space between the Sun and Earth is nearly empty", k: "Radiation", w: "No particles bridge the gap, so conduction and convection are impossible. The energy arrives as radiation." },
  { s: "Holding a mug of hot chocolate warms your hands", k: "Conduction", w: "Your hands touch the mug, and heat passes through the mug wall into your skin by direct contact: conduction." },
  { s: "Hot air balloons rise because the air inside the envelope is heated and expands", k: "Convection", w: "Heated air becomes less dense and rises, the core idea of convection, here lifting the balloon." },
  { s: "A black car roof becomes hot in the summer sun", k: "Radiation", w: "The energy arrives from the Sun as radiation and is absorbed by the dark surface. No contact or air movement is required." },
  { s: "Heat moves from a hot baking tray into the metal rack it rests on", k: "Conduction", w: "The tray and rack are solids in contact; heat flows through them particle to particle: conduction." },
  { s: "Ocean water at the equator is warmed and a surface current carries that warm water toward the poles", k: "Convection", w: "The moving water carries the heat with it over a long distance. Heat transported by a moving fluid is convection (on a planetary scale, in the currents)." },
  { s: "A greenhouse lets sunlight in and the inside air and soil become warm", k: "Radiation", w: "The incoming energy crosses the glass as radiation from the Sun. (The warming inside then involves the glass trapping heat, but the transfer from the Sun is radiation.)" }
];
E("sci-u1-transfer-id", 1, ["SC10.6.2"], 1, "gen", function () {
  var item = s6pick(S6_TRANSFER_SCEN);
  var others = ["Conduction", "Convection", "Radiation"].filter(function (m) { return m !== item.k; });
  return mcq("Which method of heat transfer is mainly at work here? " + item.s + ".",
    item.k, others.concat(["Evaporation"]),
    item.w, { k: item.k });
}, ["Ask two questions: does anything material move to carry the heat, and is there contact? Moving fluid means convection; contact through a solid means conduction; neither means radiation."]);

E("sci-u1-transfer-explain", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("Convection can happen in liquids and gases but not in solids, because convection requires",
      "the material itself to be able to flow and carry heat with it",
      ["the material to be transparent", "the particles to be held in a fixed crystal pattern", "a vacuum between the hot and cold regions"],
      "Convection is heat carried by the bulk movement of a fluid. Liquids and gases flow; the particles in a solid only vibrate in place, so a solid can conduct but cannot convect.", {});
  },
  function () {
    return mcq("Radiation is the only one of the three heat transfer methods that can cross a vacuum, because it travels as",
      "electromagnetic waves that need no material to carry them",
      ["tiny particles ejected from the hot object", "vibrations passed between neighbouring atoms", "currents in a very thin gas"],
      "Conduction needs particles passing vibrations along, and convection needs a flowing fluid. Radiation is electromagnetic waves, which travel through empty space, as sunlight does.", {});
  },
  function () {
    return mcq("A thermos keeps coffee hot for hours. Its silvered, vacuum-sealed double wall works by",
      "removing the material conduction and convection need, and reflecting radiation back",
      ["generating a small amount of heat inside the wall", "cooling the outside of the bottle", "letting conduction happen but blocking convection only"],
      "The vacuum has almost no particles, so conduction and convection have nothing to work through, and the silvering reflects radiation. All three transfer methods are attacked at once.", {});
  },
  function () {
    return mcq("Why does a down-filled winter jacket keep you warm?",
      "The trapped air in the down is a poor conductor and cannot circulate, so body heat escapes slowly",
      ["The down generates heat when it is compressed", "The jacket reflects all of the body's radiation back with a mirror effect", "The down conducts heat away from the skin quickly"],
      "Still, trapped air insulates: it conducts poorly and the small pockets stop convection currents from forming. The jacket slows heat loss; it does not create heat.", {});
  }
]), ["Each method needs something: conduction needs contact, convection needs flow, radiation needs nothing. Which need is present or missing?"]);

E("sci-u1-watercycle", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("When water evaporates from the ocean surface, the energy for the change of state comes from the water itself. As a result, evaporation",
      "cools the ocean surface slightly, storing the energy in the water vapour",
      ["warms the ocean surface, releasing energy to the air", "has no energy effect because the temperature does not change", "only happens when the water is heated by conduction from below"],
      "Evaporation takes energy: the fastest molecules escape, carrying energy into the vapour. The ocean surface loses that energy and cools slightly; the energy is released again later when the vapour condenses.", {});
  },
  function () {
    return mcq("Inside a rising cloud, water vapour condenses into droplets. Condensation affects the air in the cloud by",
      "releasing the energy that was stored during evaporation, warming the air and helping it keep rising",
      ["absorbing energy from the air, which makes the cloud sink", "having no effect, because changes of state involve no energy", "cooling the air, which is why clouds are cold on top"],
      "Condensation is evaporation in reverse: the stored latent energy is released as heat into the cloud air. That extra warmth is a real engine inside storms, making the air more buoyant.", {});
  },
  function () {
    return mcq("Which step of the water cycle moves the largest amount of energy from the ocean into the atmosphere?",
      "Evaporation from the ocean surface, with the energy released later when the vapour condenses",
      ["Rain falling back into the ocean", "Rivers flowing from land to the sea", "Ocean currents flowing poleward"],
      "Evaporation loads water vapour with latent energy drawn from the ocean; condensation in clouds releases it into the atmosphere. Rain and rivers move water, and currents move heat within the ocean, but the evaporation-condensation pair is the big ocean-to-air transfer.", {});
  },
  function () {
    return mcq("Sweating cools your skin through the same process that cools the ocean surface. That process is",
      "evaporation: the liquid takes energy from the surface as it changes to vapour",
      ["conduction: heat flows into the sweat and is trapped there", "radiation: the sweat reflects sunlight away from the skin", "condensation: vapour gives up its energy to the skin"],
      "In both cases liquid water evaporates and carries energy away from the surface it leaves, cooling what is left behind.", {});
  }
]), ["Evaporation and condensation are a pair: one stores energy, the other releases it. Which direction is this step going?"]);

E("sci-u1-transfer-homes", 1, ["SC10.6.2"], 1, "var", varset([
  function () {
    return mcq("Fibreglass insulation in a wall is mostly trapped air in a fibre mat. It slows heat loss mainly by",
      "stopping the air from circulating and conducting poorly itself",
      ["reflecting heat back like a mirror", "producing a thin layer of heat in the wall", "conducting heat around the house to spread it evenly"],
      "Insulation works by keeping air still: still air is a poor conductor and cannot form convection currents. The fibres' job is to hold the air in place.", {});
  },
  function () {
    return mcq("A wooden spoon is preferred over a metal spoon for stirring a hot pot because wood",
      "is a poor conductor, so the handle stays comfortable to hold",
      ["absorbs heat faster than metal", "reflects the heat of the soup back into the pot", "cools the soup as it stirs"],
      "Metal conducts heat quickly to your hand; wood conducts it slowly. The spoon material is chosen for its conduction behaviour.", {});
  },
  function () {
    return mcq("On a cold day, a tile floor feels much colder than a carpet at the same room temperature because the tile",
      "conducts heat away from your feet faster than the carpet does",
      ["is actually several degrees colder than the carpet", "radiates cold into your feet", "absorbs your body heat only by convection"],
      "Both are at room temperature. Tile is the better conductor, so it pulls heat from your feet faster, and the rate of heat loss is what your skin senses.", {});
  }
]), ["Same ideas as the textbook diagrams, in household clothes: contact, flow, or waves?"]);

E("sci-u1-conduction-materials", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("A metal rod and a wooden rod of the same size have one end each placed in hot water. After a minute the far end of the metal rod is warm but the wooden rod's far end is not. The difference is that",
      "metal's particles pass on vibrations (and its free electrons carry energy) far more effectively than wood's",
      ["metal absorbs more heat from the water because it is heavier", "wood reflects the heat back into the water", "the water heats metal by convection but wood by conduction"],
      "Both rods are heated by conduction at the hot end. Metals conduct well because their structure passes energy along efficiently; wood's structure does not. The method is the same; the rate differs.", {});
  },
  function () {
    return mcq("Which list puts the materials in order from best conductor to poorest conductor?",
      "Copper, then glass, then still air",
      ["Still air, then glass, then copper", "Glass, then copper, then still air", "Copper, then still air, then glass"],
      "Metals are the best common conductors, glass is a middling solid conductor, and still air is one of the poorest conductors, which is exactly why it is used in insulation.", {});
  },
  function () {
    return mcq("Double-glazed windows have a narrow gap of air or argon gas between the panes. The gap reduces heat loss because the gas",
      "conducts poorly and the narrow gap is too small for convection currents to form",
      ["absorbs the heat and stores it until night", "reflects all infrared radiation back into the room", "creates a vacuum that blocks radiation"],
      "The gas layer attacks conduction (gas conducts poorly) and convection (the gap is too narrow for currents). Radiation losses are handled by coatings, not by the gas itself, and the gap is not a vacuum.", {});
  }
]), ["Do not just name the method: think about how fast each material moves heat, and why."]);

E("sci-u1-radiation", 1, ["SC10.6.2"], 1, "var", varset([
  function () {
    return mcq("Which statement about radiation is correct?",
      "Every object emits radiation, and hotter objects emit more of it",
      ["Only the Sun emits radiation", "Radiation can only travel through air", "Radiation transfers heat only when objects touch"],
      "All objects radiate energy; the hotter the object, the more it emits. Radiation needs no medium and no contact, which is how the Sun's energy crosses space.", {});
  },
  function () {
    return mcq("A shiny silver surface and a dull black surface sit in the same sunlight. The black surface warms faster because dark, dull surfaces are better at",
      "absorbing radiation (and are also better emitters of it)",
      ["reflecting radiation into themselves", "conducting sunlight into the material", "stopping radiation from leaving the surface"],
      "Dark dull surfaces absorb a larger share of incoming radiation, so they warm faster; shiny surfaces reflect more. Good absorbers are also good emitters, which is why radiators are often painted in light colours only for looks, not physics.", {});
  },
  function () {
    return mcq("Earth receives the Sun's energy and loses energy back to space. Both transfers happen by",
      "radiation",
      ["conduction", "convection", "evaporation"],
      "Space is a near vacuum, so conduction and convection cannot operate across it. Energy arrives and leaves as electromagnetic radiation; the balance between the two sets Earth's overall temperature.", {});
  }
]), ["Radiation is the traveller: it needs no contact and no material."]);

/* ---------- SC10.6.3 Heat transfer and currents ---------- */

E("sci-u1-sea-breeze", 1, ["SC10.6.3", "SC10.6.2"], 3, "var", varset([
  function () {
    return mcq("On a sunny afternoon, a breeze blows from the ocean toward a beach. Put the chain of causes in the correct order: (1) air over the land rises; (2) the land heats faster than the water; (3) cooler ocean air moves in to replace the rising air; (4) the Sun heats land and water equally.",
      "4, then 2, then 1, then 3",
      ["2, then 4, then 3, then 1", "4, then 1, then 2, then 3", "1, then 2, then 4, then 3"],
      "Equal sunlight (4) falls on both surfaces, but the land's temperature climbs faster (2) because of its lower specific heat capacity. The air above the land warms and rises (1), and cooler air from over the ocean slides in underneath (3): an onshore sea breeze. At night the pattern reverses into a land breeze.", {});
  },
  function () {
    return mcq("Late at night, the breeze at the same beach blows from the land toward the ocean. The reversal happens because",
      "the land cools faster than the water, so the air over the water is now relatively warm and rises",
      ["the ocean stops storing heat at night", "the Moon's gravity pulls the air seaward", "the Sun heats the water more strongly at night"],
      "After sunset both surfaces cool, but the land cools faster (low specific heat capacity again). The ocean, still holding the day's heat, keeps the air above it warmer; that air rises and surface air flows from land to sea to replace it.", {});
  },
  function () {
    return mcq("A sea breeze is best classified as which process, driven by which property?",
      "Convection, driven by the different specific heat capacities of land and water",
      ["Conduction, driven by the different colours of land and water", "Radiation, driven by the albedo of the beach sand", "Conduction, driven by the depth of the ocean"],
      "The moving air carrying heat is convection. The reason the air moves at all is the unequal heating of land and water under the same sunlight, which comes from their specific heat capacities.", {});
  }
]), ["Build the chain: equal sunlight, unequal heating, rising air, replacement air. Land versus water response is the key difference."]);

E("sci-u1-currents-cause", 1, ["SC10.6.3"], 1, "var", varset([
  function () {
    return mcq("Surface ocean currents are driven mainly by",
      "the prevailing winds dragging on the water surface, deflected by the Coriolis effect and blocked by continents",
      ["the Moon's gravity alone", "differences in the salt content of the water only", "heat conducted up from Earth's core"],
      "Wind friction starts surface water moving; Coriolis bends the flow and continents redirect it into the great gyres. The Moon drives tides, and deep circulation involves density, but surface currents are wind-driven.", {});
  },
  function () {
    return mcq("Warm surface currents generally flow",
      "from the equator toward the poles along the eastern sides of ocean basins (western sides of oceans carry them poleward), carrying heat with them",
      ["from the poles toward the equator on both sides of every ocean", "in straight lines from east to west everywhere", "only in the Southern Hemisphere"],
      "Currents redistribute the heat the tropics absorb: warm water moves poleward and cold water returns equatorward. The Gulf Stream carrying warm water past the Atlantic provinces is the local example.", {});
  },
  function () {
    return mcq("The water in a current keeps moving in a curve even after the wind pattern changes, partly because of inertia, but the large-scale curving of ocean gyres is set by",
      "the Coriolis effect and the shape of the continents",
      ["the saltiness of the water", "the depth of the ocean floor", "the pull of the Sun's gravity"],
      "Gyres are the product of wind drive plus Coriolis deflection plus continents blocking the flow. Salinity matters for deep density currents, not for the surface gyre pattern.", {});
  }
]), ["Surface currents start with wind. Then ask what bends them and what blocks them."]);

E("sci-u1-coriolis", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("In the Northern Hemisphere, the Coriolis effect deflects moving air and water",
      "to the right of their direction of motion",
      ["to the left of their direction of motion", "directly toward the equator", "straight downward"],
      "North of the equator, moving objects appear to curve right because Earth rotates beneath them. In the Southern Hemisphere the deflection is to the left. This is the rule the FrenchWinds activities drill, and it shapes both wind belts and currents.", {});
  },
  function () {
    return mcq("A wind blowing from the equator toward the North Pole is deflected by the Coriolis effect so that it ends up blowing mainly from the",
      "southwest",
      ["northeast", "northwest", "southeast"],
      "Start with air moving north. Deflect it to its right (eastward) and the flow becomes a wind coming FROM the southwest: these are the westerlies of the middle latitudes. Winds are named for where they come from.", {});
  },
  function () {
    return mcq("The Coriolis effect is strongest",
      "near the poles, and zero at the equator",
      ["at the equator, and zero at the poles", "at 30 degrees latitude in both hemispheres", "over the oceans only"],
      "The deflection grows with latitude: nothing at the equator, maximum near the poles. That is why tropical systems need to form a few degrees off the equator to start spinning.", {});
  },
  function () {
    return mcq("Two identical rockets are fired due north, one from the equator and one from 50 degrees north latitude. The one fired from 50 degrees north will appear to curve",
      "more strongly to the right, because the Coriolis effect increases with latitude",
      ["less, because the Coriolis effect fades with latitude", "to the left, because it is over land", "not at all, because rockets are powered"],
      "Latitude controls the strength of the effect: stronger toward the poles. Being powered does not remove the rotating-frame deflection.", {});
  }
]), ["Right in the north, left in the south, nothing at the equator, strongest at the poles."]);

E("sci-u1-labrador-current", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("The Labrador Current flows southward along the Labrador coast and past the island of Newfoundland. Its effect on coastal weather is to bring",
      "cold water and cold air, giving cool summers, sea ice and icebergs, and frequent fog where it meets warm moist air",
      ["warm water that makes the coast warmer than inland areas in winter", "dry desert-like conditions to the coast", "hurricanes toward the province every summer"],
      "The Labrador Current is a cold current: it chills the air above it, keeps summers cool, carries icebergs south, and where its cold air undercuts warm moist air from the Gulf Stream region, fog forms. It is a major reason the province's east coast is cooler than places at the same latitude in Europe.", {});
  },
  function () {
    return mcq("Western Europe at the same latitude as Labrador has much milder winters. A major reason is that Europe is warmed by",
      "the warm North Atlantic Drift (an extension of the Gulf Stream) flowing past its coasts",
      ["the Labrador Current flowing toward Europe", "hot winds blowing off the Sahara in winter", "heat conducted through the Atlantic Ocean floor"],
      "Warm currents carry tropical heat to Europe's coasts while cold currents carry Arctic water past Labrador. Same latitude, opposite currents, opposite climates: currents move heat, and coasts feel it.", {});
  },
  function () {
    return mcq("Grand Banks fog forms most often when",
      "warm, moist air from over the Gulf Stream moves over the cold water of the Labrador Current and is chilled to its dewpoint",
      ["cold dry air moves over warm water in winter", "the Labrador Current stops flowing", "high pressure pushes the fog out to sea"],
      "Air chilled from below reaches its dewpoint and the moisture condenses into fog. The meeting of the warm Gulf Stream air and the cold Labrador Current water is one of the foggiest combinations on Earth.", {});
  }
]), ["The local example matters here: one cold current, and everything it explains about this province's weather."]);

var S6_BELTS = [
  { letter: "A", name: "Polar easterlies (Northern Hemisphere)", dir: "toward the southwest" },
  { letter: "B", name: "Westerlies (Northern Hemisphere)", dir: "toward the northeast" },
  { letter: "C", name: "Northeast trade winds", dir: "toward the southwest" },
  { letter: "D", name: "Southeast trade winds", dir: "toward the northwest" },
  { letter: "E", name: "Westerlies (Southern Hemisphere)", dir: "toward the southeast" },
  { letter: "F", name: "Polar easterlies (Southern Hemisphere)", dir: "toward the northwest" }
];
E("sci-u1-windbelts-id", 1, ["SC10.6.3"], 1, "gen", function () {
  var mode = Math.random() < 0.5 ? "name" : "dir";
  var b = s6pick(S6_BELTS);
  var others = s6shuf(S6_BELTS.filter(function (x) { return x !== b; })).slice(0, 3);
  var q;
  if (mode === "name") {
    q = mcq("On the wind belt diagram, which belt is labelled " + b.letter + "?",
      b.name, others.map(function (x) { return x.name; }),
      "Belt " + b.letter + " sits between the latitude lines shown on the diagram. From the poles to the equator the pattern in each hemisphere is polar easterlies, westerlies, then trade winds, and the arrows show the surface flow: " + b.name.toLowerCase() + " blow " + b.dir + ".",
      { belt: b.letter, mode: mode });
  } else {
    q = mcq("In belt " + b.letter + " on the wind belt diagram, surface winds blow mainly",
      b.dir, ["toward the northeast", "toward the northwest", "toward the southeast", "toward the southwest"].filter(function (d) { return d !== b.dir; }),
      "Belt " + b.letter + " is the " + b.name.toLowerCase() + ". Air moving toward the equator is deflected westward, and air moving toward the poles is deflected eastward, which sets the arrow directions drawn on the diagram.",
      { belt: b.letter, mode: mode });
  }
  q.figure = s6WindBeltSVG("zones");
  return q;
}, ["Read the latitude lines first: 60 to 90, 30 to 60, 0 to 30, in each hemisphere. Then match the band to its belt."]);

E("sci-u1-windbelts-calm", 1, ["SC10.6.3"], 2, "gen", function () {
  var zones = [
    { letter: "X", name: "the doldrums", why: "At the equator (X), air rises rather than blowing horizontally, so surface winds are light and variable: the doldrums, dreaded by sailing ships for the lack of wind (though squalls are common)." },
    { letter: "Y", name: "the horse latitudes", why: "At about 30 degrees north (Y), air sinks back toward the surface under high pressure, producing the calm horse latitudes and many of the world's deserts at the same latitudes." },
    { letter: "Z", name: "the horse latitudes", why: "At about 30 degrees south (Z), air sinks back toward the surface under high pressure, producing the calm horse latitudes, the mirror image of the northern belt." }
  ];
  var z = s6pick(zones);
  var q = mcq("On the wind belt diagram, the calm zone labelled " + z.letter + " is called",
    z.name, ["the doldrums", "the horse latitudes", "the polar front", "the jet stream"].filter(function (n) { return n !== z.name; }),
    z.why, { zone: z.letter });
  q.figure = s6WindBeltSVG("calm");
  return q;
}, ["Calm zones sit where air rises (equator) or sinks (about 30 degrees). Match the letter to its latitude first."]);

E("sci-u1-current-effects", 1, ["SC10.6.3"], 3, "var", varset([
  function () {
    return mcq("Suppose the warm Gulf Stream shifted so that it flowed closer to the Nova Scotia and Newfoundland coasts. The most likely change to coastal winters would be",
      "milder temperatures and more moisture available for snow and rain, because the warm current heats and moistens the air above it",
      ["colder temperatures, because a warm current pushes cold air ahead of it", "no change, because currents do not affect the air above them", "much drier winters, because warm water absorbs moisture from the air"],
      "Currents move heat, and the air takes on the character of the water it crosses. Warm water near the coast would warm and moisten the air, softening winter cold and feeding precipitation. The province's present climate is shaped the same way by the cold Labrador Current.", {});
  },
  function () {
    return mcq("A fishing town's records show the nearby ocean current has run about 2 °C warmer than usual for a whole summer. Which prediction is best supported?",
      "More fog and humidity near the coast, and warmer nights, as the warm water heats and moistens the air above it",
      ["Colder nights, because warm water reflects heat back to space", "Less fog, because warm water cannot chill air to its dewpoint under any conditions", "Stronger winds in every month, because warm currents always speed up the air"],
      "Warmer water transfers more heat and moisture to the air: nights stay warmer and humid air brings more low cloud and fog. Fog specifically needs the air to reach its dewpoint, which warm water makes more likely by loading the air with vapour, not less.", {});
  },
  function () {
    return mcq("Peru's coast is unusually cold and dry for its latitude because a cold current flows along it. The cold current produces this climate mainly by",
      "chilling the air above it so the air holds little moisture and sinks rather than rising to form rain",
      ["blocking warm winds from ever reaching the coast", "reflecting sunlight back into space from the water surface", "pulling all of the region's rain clouds out to sea"],
      "Cold water cools the air in contact with it; cool air holds less moisture and tends to sink, suppressing rain. It is the same mechanism, with the sign reversed, as warm currents moistening and warming the coasts they pass.", {});
  }
]), ["A current is a heat delivery system. Ask what the water does to the air above it, then what that air does to the coast."]);

/* ---------- SC10.6.4 Weather systems ---------- */

E("sci-u1-airmass-id", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("An air mass that forms over the cold, dry Canadian Arctic in winter is classified as",
      "continental Arctic (cA): very cold and very dry",
      ["maritime Tropical (mT): warm and moist", "continental Tropical (cT): hot and dry", "maritime Polar (mP): cool and moist"],
      "The first letter tells the source surface (continental = land = dry; maritime = water = moist) and the second the source temperature (Arctic, Polar, Tropical). Over Arctic land in winter: continental Arctic, the coldest and driest air mass affecting the province.", {});
  },
  function () {
    return mcq("In the code mT, the two letters mean the air mass is",
      "maritime (moist) and Tropical (warm)",
      ["mountain (dry) and Temperate (mild)", "maritime (dry) and Tundra (cold)", "continental (moist) and Tropical (warm)"],
      "Lowercase m is maritime: formed over water, so moist. Capital T is Tropical: formed in warm regions. Continental (c) air is dry because it forms over land. mT air is the warm, humid air that brings muggy summer weather and feeds storms.", {});
  },
  function () {
    return mcq("Which air mass is most likely to bring a July heat wave with high humidity to the island of Newfoundland?",
      "Maritime Tropical (mT) air moving up from the warm Atlantic and the Gulf Stream region",
      ["Continental Arctic (cA) air from the far north", "Continental Polar (cP) air from the Prairies", "Maritime Arctic air from the Labrador Sea"],
      "July heat with humidity needs a warm, moist source: the tropical Atlantic. The polar and arctic air masses are cold, and continental polar air is dry as well as cool.", {});
  },
  function () {
    return mcq("An air mass takes on the temperature and moisture characteristics of",
      "the surface it sits over for several days (its source region)",
      ["the last front it crossed", "the altitude at which it formed", "the season in which it is named"],
      "Air masses are made by contact: days spent over cold ocean make air cold and moist; days over hot desert make it hot and dry. That is why the classification names the source: surface first, temperature second.", {});
  }
]), ["Decode the two letters: surface (c or m) sets moisture, temperature (A, P or T) sets warmth."]);

E("sci-u1-airmass-source", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("A weather station reports three days of bitterly cold, very dry air with clear skies in January. The air mass overhead most likely formed over",
      "the snow-covered Canadian Arctic (continental Arctic)",
      ["the warm Gulf of Mexico (maritime Tropical)", "the Pacific Ocean off British Columbia (maritime Polar)", "the deserts of the southwestern United States (continental Tropical)"],
      "Bitter cold plus very dry means a cold, land source: the Arctic interior in winter. Each wrong option is warm or moist or both, which contradicts one of the two reported properties.", {});
  },
  function () {
    return mcq("After several days of warm, humid weather, a town's air becomes noticeably drier and cooler without any rain. The most likely cause is",
      "a continental Polar air mass replacing the maritime Tropical air mass over the town",
      ["the maritime Tropical air mass losing moisture to the Sun", "a front forming inside the air mass", "the town's altitude increasing"],
      "Air mass weather changes when one air mass replaces another. Cool and dry replacing warm and moist is the signature of continental Polar air (from the northern land interior) displacing maritime Tropical air.", {});
  },
  function () {
    return mcq("Why does maritime Polar air bring cool, cloudy, showery weather to the province in spring?",
      "It forms over cold North Pacific and North Atlantic water, so it arrives cool and loaded with moisture picked up from the ocean",
      ["It forms over the Arctic ice cap and picks up moisture crossing the Prairies", "It is heated from below by the warm ocean floor", "It only travels at night, when temperatures fall"],
      "Maritime means the moisture comes with it from its ocean source, and polar means cold water, so cool air. Cool moist air lifted over the coast gives cloud and showers: classic spring weather on the island.", {});
  }
]), ["Use the two properties separately: temperature points to the latitude of the source, moisture points to land or water."]);

E("sci-u1-front-symbols", 1, ["SC10.6.4"], 1, "gen", function () {
  var kinds = [
    { kind: "cold", name: "A cold front", why: "Triangles on the line mark a cold front. The triangles point in the direction the front is moving, into the warmer air. (Semicircles would mark a warm front; alternating symbols on opposite sides mark a stationary front.)" },
    { kind: "warm", name: "A warm front", why: "Semicircles on the line mark a warm front. The semicircles sit on the side toward which the front is advancing, as the warm air slides up over the cooler air ahead of it." },
    { kind: "stationary", name: "A stationary front", why: "Triangles on one side and semicircles on the other mark a stationary front: the boundary between two air masses where neither is advancing, so the front stalls and its weather can linger for days." }
  ];
  var k = s6pick(kinds);
  var q = mcq("The diagram shows a segment of a front as it would be drawn on a weather map. Which front is it?",
    k.name, kinds.filter(function (x) { return x !== k; }).map(function (x) { return x.name; }).concat(["An occluded front"]),
    k.why, { kind: k.kind });
  q.figure = s6FrontSVG(k.kind);
  return q;
}, ["Triangles mean cold, semicircles mean warm, both together on opposite sides mean stationary."]);

E("sci-u1-front-weather", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("A cold front is usually associated with",
      "a narrow band of heavy showers or thunderstorms, followed by clearing and cooler air",
      ["days of gentle, steady rain over a wide area", "fog and drizzle that last for a week", "no change in weather at all"],
      "A cold front lifts warm air abruptly along a steep boundary, producing a narrow, intense band of precipitation. Once it passes, cooler, drier air and clearing skies follow. Long, gentle, wide-area rain belongs to warm fronts.", {});
  },
  function () {
    return mcq("As a warm front approaches a town, the usual sequence is",
      "high thin clouds thickening into a wide shield of steady rain, then warmer air arriving as the front passes",
      ["a sudden thunderstorm, then an immediate drop in temperature", "clear skies until the front arrives, then heavy snow", "fog that lifts the moment the front passes into colder air"],
      "Warm air slides gradually up over the cool air ahead of a warm front, so clouds build and thicken over a wide area well before the surface front arrives, giving steady precipitation, and temperatures rise after passage.", {});
  },
  function () {
    return mcq("Which pairing of front and precipitation pattern is correct?",
      "Warm front: steady rain over a large area for many hours. Cold front: brief, heavy showers in a narrow band.",
      ["Warm front: brief, heavy showers. Cold front: steady rain over a large area.", "Both fronts: identical precipitation patterns.", "Warm front: no precipitation. Cold front: steady rain for days."],
      "The slope of the boundary sets the pattern: the warm front's gentle slope spreads lifting (and rain) over hundreds of kilometres, while the cold front's steep slope concentrates it in a narrow, intense band.", {});
  },
  function () {
    return mcq("A stationary front has stalled over a region for two days. The most likely weather there is",
      "prolonged cloud and repeated periods of rain along the boundary, with little temperature change",
      ["rapid clearing and warming", "a single short thunderstorm and then sunshine", "steadily falling temperatures for the whole period"],
      "Neither air mass is winning, so the boundary and its lifting zone sit in place. The result is persistent cloud and on-and-off rain with temperatures stuck on each side of the line.", {});
  }
]), ["Picture the boundary's slope: steep (cold front) means narrow and intense; gentle (warm front) means wide and steady."]);

E("sci-u1-front-passage", 1, ["SC10.6.4"], 3, "var", varset([
  function () {
    return mcq("A station records this sequence over six hours: temperature 16 °C and falling pressure; a brief period of heavy showers; then temperature 8 °C, pressure rising, and winds from the northwest. The best interpretation is that",
      "a cold front passed the station during the showers",
      ["a warm front passed the station during the showers", "a high-pressure centre passed directly overhead", "the station moved into a maritime Tropical air mass"],
      "Each clue points the same way: falling pressure ahead of the front, an intense narrow rain band at the front, then cold air, rising pressure and the northwest wind shift behind it. That is the textbook cold-front passage, told by the instruments in order.", {});
  },
  function () {
    return mcq("Ahead of an approaching cold front, a town's pressure is falling and its temperature is warm. A forecaster wants to warn residents about the wind change at frontal passage. The warning should say the winds will shift to blow from the",
      "northwest, and strengthen briefly in gusts with the showers",
      ["southeast, and die out completely", "south, and stay warm and gentle", "northeast, bringing warmer air"],
      "Winds ahead of the front blow from the south or southwest (warm sector). At passage they veer sharply to the northwest, the direction of the cold air behind the front, often with gusts in the shower band.", {});
  },
  function () {
    return mcq("Two neighbouring towns are on opposite sides of a cold front that is nearly stationary this morning. Town A reports 19 °C and humid; Town B, 60 km away, reports 7 °C and dry. Later the front surges southeast. By evening Town A should expect",
      "a sharp temperature drop into the range Town B reported, with a band of showers as the front crosses",
      ["no change, because fronts do not affect towns ahead of them", "a gradual warming as the front approaches", "the same weather as Town B had, but without any precipitation"],
      "A front is a boundary between two air masses; crossing it swaps one air mass for the other. Town B's current weather is the preview of Town A's post-frontal weather, delivered with the front's rain band.", {});
  }
]), ["Read the instruments as a story in time order: before, during and after the boundary crosses the station."]);

E("sci-u1-pressure-systems", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("In the Northern Hemisphere, surface winds around a low-pressure centre blow",
      "counterclockwise and inward toward the centre",
      ["clockwise and outward from the centre", "straight into the centre from all directions", "counterclockwise and outward from the centre"],
      "Coriolis deflection bends the inward-flowing air to the right, producing a counterclockwise spiral into a low. A high is the mirror image: clockwise and outward.", {});
  },
  function () {
    return mcq("High-pressure systems are usually associated with fair weather because the air in a high is",
      "sinking, which warms it slightly and prevents clouds from forming",
      ["rising, which cools it and squeezes out moisture", "moving so fast that clouds cannot form", "always colder than the air around it"],
      "Sinking air is compressed and warmed as it descends, so its relative humidity drops and clouds evaporate. Rising air (in a low) does the opposite: it cools, condenses and makes weather.", {});
  },
  function () {
    return mcq("On a weather map, the letter L marks the centre of a low. The closed curves drawn around it are isobars, which connect places with the same",
      "air pressure",
      ["temperature", "wind speed", "humidity"],
      "Isobars are lines of equal pressure (iso means equal, bar refers to pressure). Isotherms join equal temperatures. Closely spaced isobars, whatever the system, mean strong winds.", {});
  },
  function () {
    return mcq("A barometer at a coastal station reads 1041 hPa and has been steady for two days. The station is most likely under",
      "a high-pressure system, with settled, fair weather",
      ["an intense low-pressure system", "a cold front at the moment of passage", "a hurricane"],
      "1041 hPa is well above the average sea-level pressure of about 1013 hPa, and steady high pressure means sinking air and fair weather. Lows and fronts come with lower and changing pressure.", {});
  }
]), ["Lows: air rises, winds spiral in counterclockwise. Highs: air sinks, winds spiral out clockwise. Isobars are equal pressure."]);

E("sci-u1-isobars", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Two weather maps show lows of the same central pressure. On Map 1 the isobars are drawn close together; on Map 2 they are far apart. The winds will be stronger on",
      "Map 1, because closely spaced isobars mean the pressure changes quickly over distance, which drives strong winds",
      ["Map 2, because widely spaced isobars give the wind room to accelerate", "both maps equally, because the central pressures are the same", "Map 2, because weak pressure gradients always produce storms"],
      "Wind strength is set by the pressure gradient, the change in pressure over distance, not by the central value alone. Tight spacing equals a steep gradient equals strong wind. This is why forecasters look at spacing first.", {});
  },
  function () {
    return mcq("A town sits between the 1008 hPa and 1004 hPa isobars of a low, where the isobars are crowded together. Another town the same distance from the centre sits where the isobars are spread out. Compared with the second town, the first town's winds are",
      "stronger, because its local pressure gradient is steeper",
      ["weaker, because crowded isobars trap the air", "identical, because both towns are the same distance from the centre", "calm, because isobars cancel the wind where they are close"],
      "Distance from the centre does not set the wind; the local spacing does. Crowded isobars mean pressure is changing fast over a short distance, and that steep gradient drives fast air movement.", {});
  },
  function () {
    return mcq("Sailors in the centre of a large high-pressure system often report frustrating conditions for sailing. The reason is that near a high's centre",
      "the isobars are widely spaced, the pressure gradient is weak, and winds are light and variable",
      ["the pressure is so high it pushes the sails flat", "the air is too dense for a boat to move through", "the winds circle so fast the boat cannot steer"],
      "At the centre of a high the pressure barely changes from place to place, so there is almost no gradient to drive wind. The same weak-gradient logic explains calms in the doldrums and horse latitudes.", {});
  }
]), ["Forget the centre's number: spacing is the wind. Tight isobars, steep gradient, strong wind."]);

E("sci-u1-low-formation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Mid-latitude low-pressure systems (the storms that cross this province) typically develop",
      "along a front where cold polar air meets warm tropical air, with the boundary beginning to wave and wrap around a centre",
      ["in the middle of a uniform air mass, for no boundary reason", "only over tropical oceans in summer", "where two high-pressure systems collide"],
      "The energy for these storms comes from the contrast between air masses along a front. A wave forms on the boundary, pressure falls at the wave's crest, and the cold and warm fronts of the mature low develop from there. Hurricanes are the tropical exception, not the local rule.", {});
  },
  function () {
    return mcq("Why do so many of the province's storms arrive from the southwest and travel toward the northeast?",
      "The prevailing westerlies steer weather systems from west to east across the mid-latitudes, and the storm track follows the temperature contrast along the coast",
      ["Storms are pulled northeast by the Labrador Current", "The Coriolis effect pushes every storm northeast regardless of other factors", "Storms form over the province and drift backward"],
      "Systems are embedded in the westerly flow of the mid-latitudes, so they are carried west to east (here, southwest to northeast). The strong land-ocean temperature contrast along the east coast helps intensify them on the way.", {});
  },
  function () {
    return mcq("A low deepens (its central pressure falls) as it approaches the province. Deepening means the storm is",
      "intensifying: its pressure gradient steepens and its winds strengthen",
      ["weakening and about to clear", "slowing down and becoming stationary", "changing into a high-pressure system"],
      "Falling central pressure against the surrounding pressure steepens the gradient, and a steeper gradient means faster winds and usually more precipitation. A filling low (rising central pressure) is the one that is weakening.", {});
  }
]), ["Storms here are born on boundaries between air masses and ride the westerlies. Contrast is the fuel."]);

E("sci-u1-extreme", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("A hurricane gets its energy from",
      "the heat stored in warm tropical ocean water, released as water vapour condenses in the storm",
      ["the cold Labrador Current", "friction with the land as it approaches the coast", "the collision of two cold fronts"],
      "Hurricanes are heat engines run on warm water (generally above about 26.5 °C): evaporation loads the air with latent energy and condensation aloft releases it. Over land or cold water the fuel supply is cut and the storm weakens.", {});
  },
  function () {
    return mcq("Which conditions are required for a blizzard?",
      "Strong winds (at least 40 km/h), falling or blowing snow reducing visibility below about 400 m, lasting at least four hours (with dangerous cold in the Canadian definition)",
      ["A temperature below -30 °C, with any amount of snow", "Snowfall of exactly 25 cm in one hour", "A low-pressure centre passing directly overhead"],
      "A blizzard is defined by wind and visibility in snow, not by a snowfall total: even old snow blown by strong wind can produce one (a ground blizzard). The temperature criterion applies in the Canadian Prairie definition; the wind and visibility criteria are the core everywhere.", {});
  },
  function () {
    return mcq("During a winter storm warning for the island, the safest interpretation of a forecast calling for a nor'easter is",
      "a strong low tracking northeastward along the coast, bringing heavy snow and powerful northeast winds to the island",
      ["a gentle rain event with winds from the southwest", "a high-pressure system arriving from the northeast", "a thunderstorm moving in from the Labrador Sea"],
      "A nor'easter is named for its winds: a coastal low travelling up the seaboard drives strong northeasterlies into the province, usually with heavy snow. It is the classic major winter storm pattern here.", {});
  }
]), ["Extreme weather still runs on this unit's engines: stored ocean heat for hurricanes, wind plus snow for blizzards."]);

E("sci-u1-climate-factors", 1, ["SC10.6.4", "SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("St. John's, Newfoundland (47.6 °N) has much colder winters than Lisbon, Portugal (38.7 °N) mainly because of latitude, but Vancouver (49.3 °N) is far milder than St. John's at nearly the same latitude. The Vancouver difference is mostly due to",
      "ocean currents and prevailing winds: Vancouver receives air that has crossed the warm Pacific, St. John's receives air from the cold Arctic and sits beside the cold Labrador Current",
      ["Vancouver being much closer to the equator in practice", "St. John's higher altitude", "the tilt of Earth's axis changing over Canada"],
      "Latitude sets the sunlight budget, but currents and wind direction deliver the heat. Pacific air and a warm current moderate Vancouver; Arctic air masses and a cold current chill St. John's. Altitude is a red herring here: St. John's is near sea level.", {});
  },
  function () {
    return mcq("A mountain town at 1500 m elevation is consistently about 9 °C colder than a town in the valley below it. This is the effect of",
      "altitude: temperature falls as elevation increases because the air is thinner and less able to hold heat",
      ["latitude", "albedo of the valley floor", "distance from the ocean"],
      "Temperature drops roughly 6 to 10 °C per kilometre of elevation. The two towns share latitude and region, so elevation is the factor that differs.", {});
  },
  function () {
    return mcq("Which list contains only factors that affect a region's climate (not its day-to-day weather)?",
      "Latitude, altitude, nearness to water, ocean currents, prevailing winds",
      ["Today's pressure, tomorrow's front, wind gusts at noon", "Latitude, the passage of a single low, altitude", "Ocean currents, this week's rainfall, nearness to water"],
      "Climate is the long-term pattern: latitude, altitude, water, currents and prevailing winds. Individual fronts, gusts and this week's rain are weather events, not climate factors.", {});
  },
  function () {
    return mcq("A desert sits at 30 degrees south latitude on a continent's west coast, where a cold current flows and the horse-latitude high dominates. Its dryness is best explained by",
      "sinking air under the high (which suppresses cloud and rain) plus cold coastal water chilling and stabilizing the air",
      ["its distance from the equator alone", "the rain shadow of the ocean", "the absence of any air masses over the region"],
      "The great deserts cluster near 30 degrees in both hemispheres where air sinks, and a cold current adds stability on the west coasts. Two of this unit's mechanisms stack to produce the desert.", {});
  }
]), ["Separate the controls: latitude, altitude, water, currents, winds. Then ask which one actually differs between the two places."]);

E("sci-u1-greenhouse", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("The natural greenhouse effect works because greenhouse gases in the atmosphere",
      "let sunlight pass through but absorb much of the infrared radiation Earth emits, sending some of it back toward the surface",
      ["reflect sunlight back to space before it reaches the ground", "produce heat through chemical reactions in the air", "trap air so it cannot circulate to space"],
      "Sunlight (mostly visible) passes through; Earth's outgoing infrared is absorbed by gases such as water vapour, carbon dioxide and methane, warming the lower atmosphere. Without the natural effect Earth would average about -18 °C instead of about +15 °C.", {});
  },
  function () {
    return mcq("The enhanced greenhouse effect refers to",
      "human activities increasing greenhouse gas concentrations, strengthening the natural effect and warming the planet",
      ["the Sun becoming hotter over the last century", "greenhouses being used to grow food in winter", "a hole in the ozone layer letting heat in"],
      "The enhanced effect is the natural mechanism plus extra gases (mainly carbon dioxide from burning fossil fuels, and methane). The ozone hole is a separate issue about ultraviolet radiation, and the Sun's output has not risen enough to explain the warming.", {});
  },
  function () {
    return mcq("Venus is far hotter than Earth mainly because its atmosphere",
      "is very thick and almost all carbon dioxide, producing an extreme greenhouse effect",
      ["is closer to the Sun, which alone explains any temperature", "contains no clouds", "reflects no sunlight at all"],
      "Venus is closer to the Sun, but the runaway greenhouse effect of its massive carbon dioxide atmosphere is what pushes its surface to about 460 °C. It is the solar system's demonstration of the greenhouse mechanism at full strength.", {});
  }
]), ["Short wavelengths in, long wavelengths partly trapped. Natural effect keeps us livable; enhancement is the human addition."]);

/* ---------- SC10.6.5 Meteorological data ---------- */

E("sci-u1-instruments", 1, ["SC10.6.5"], 1, "var", varset([
  function () {
    return mcq("Which instrument measures air pressure, the reading forecasters watch most closely for coming weather changes?",
      "A barometer",
      ["An anemometer", "A hygrometer", "A rain gauge"],
      "Barometers measure pressure, and pressure tendency (rising, falling, steady) is a primary forecasting signal. Anemometers measure wind speed, hygrometers humidity, and rain gauges precipitation amounts.", {});
  },
  function () {
    return mcq("A school weather station needs to record wind speed and humidity. The two instruments to install are",
      "an anemometer for wind speed and a hygrometer for humidity",
      ["a barometer for wind speed and a thermometer for humidity", "a wind vane for wind speed and a barometer for humidity", "a rain gauge for wind speed and an anemometer for humidity"],
      "Anemometer: wind speed (the spinning cups type is standard). Hygrometer: humidity. A wind vane gives direction, not speed, and a barometer gives pressure, not humidity.", {});
  },
  function () {
    return mcq("Which pairing of instrument and unit is correct?",
      "Rain gauge and millimetres of precipitation",
      ["Anemometer and millibars of pressure", "Hygrometer and degrees Celsius", "Barometer and kilometres per hour"],
      "Precipitation is measured as a depth in millimetres. Anemometers report km/h (wind speed), hygrometers report percent relative humidity, and barometers report hPa (pressure).", {});
  },
  function () {
    return mcq("A thermometer reads the same at two stations, but only one reports fog in the morning. The extra instrument reading that best explains the difference is the",
      "hygrometer: the foggy station's air was at or near saturation (relative humidity near 100 percent)",
      ["anemometer: the foggy station had stronger winds", "barometer: the foggy station had higher pressure", "rain gauge: the foggy station had more rain the day before"],
      "Fog is condensed water vapour: it needs saturated air. Strong wind actually mixes air and tends to clear fog, and pressure alone does not make fog. Humidity is the deciding measurement.", {});
  },
  function () {
    return mcq("Weather satellites contribute to forecasting mainly by",
      "imaging cloud systems and tracking their movement, revealing fronts and storms over oceans where there are no stations",
      ["measuring pressure at the surface directly", "replacing the need for any ground stations", "changing the direction of approaching storms"],
      "Satellites see the cloud patterns of systems across data-empty oceans, exactly the region this province's weather comes from. Surface pressure still comes from barometers on the ground and on buoys and ships.", {});
  }
]), ["Name the quantity first, then the instrument: pressure, wind speed, humidity, precipitation, temperature."]);

E("sci-u1-wxdata-read", 1, ["SC10.6.5"], 1, "gen", function () {
  var S = s6WxSeries();
  var kind = s6pick(["warmest", "windiest", "totalrain", "pchange"]);
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  var q;
  if (kind === "warmest") {
    var bi = 0; S.days.forEach(function (d, i) { if (d.T > S.days[bi].T) bi = i; });
    var others = s6shuf([0, 1, 2, 3, 4].filter(function (i) { return i !== bi; })).slice(0, 3);
    q = mcq(head + "<br>On which day was the temperature highest?",
      "Day " + (bi + 1), others.map(function (i) { return "Day " + (i + 1); }),
      "Read the Temp value on each line: the readings are " + S.days.map(function (d) { return d.T + " °C"; }).join(", ") + ". The largest is Day " + (bi + 1) + " at " + S.days[bi].T + " °C.",
      { kind: kind, bi: bi });
  } else if (kind === "windiest") {
    var wi = 0; S.days.forEach(function (d, i) { if (d.W > S.days[wi].W) wi = i; });
    var others2 = s6shuf([0, 1, 2, 3, 4].filter(function (i) { return i !== wi; })).slice(0, 3);
    q = mcq(head + "<br>On which day was the wind strongest?",
      "Day " + (wi + 1), others2.map(function (i) { return "Day " + (i + 1); }),
      "The wind speeds recorded are " + S.days.map(function (d) { return d.W + " km/h"; }).join(", ") + ". The strongest is Day " + (wi + 1) + " at " + S.days[wi].W + " km/h.",
      { kind: kind, bi: wi });
  } else if (kind === "totalrain") {
    var tot = Math.round(S.days.reduce(function (a, d) { return a + d.R; }, 0) * 10) / 10;
    var cands = [tot + 2.5, tot + 5.1, tot * 1.5 + 1, tot + 0.7];
    if (tot >= 3.2) cands.push(tot - 3.2);
    var seenT = {}; seenT[tot.toFixed(1)] = 1; var disT = [];
    s6shuf(cands).forEach(function (v) { var s = v.toFixed(1); if (!seenT[s] && disT.length < 3) { seenT[s] = 1; disT.push(s + " mm"); } });
    q = mcq(head + "<br>What was the total precipitation over the five days?",
      tot.toFixed(1) + " mm", disT,
      "Add the Precip values: " + S.days.map(function (d) { return d.R.toFixed(1); }).join(" + ") + " = " + tot.toFixed(1) + " mm.",
      { kind: kind, tot: tot });
  } else {
    var chg = Math.round((S.days[4].P - S.days[0].P) * 10) / 10;
    var ans = Math.abs(chg) <= 0.5 ? "It stayed about the same" : ("It has " + (chg > 0 ? "risen" : "fallen") + " by about " + Math.abs(chg).toFixed(1) + " hPa");
    var fixed = ["It has risen by about " + Math.abs(chg).toFixed(1) + " hPa", "It has fallen by about " + Math.abs(chg).toFixed(1) + " hPa", "It stayed about the same"];
    q = mcq(head + "<br>How did the pressure change from Day 1 to Day 5?",
      ans, fixed.filter(function (o) { return o !== ans; }).concat(["It cannot be determined from the data"]).slice(0, 3),
      "Day 1 pressure is " + S.days[0].P.toFixed(1) + " hPa and Day 5 is " + S.days[4].P.toFixed(1) + " hPa, a change of " + (chg >= 0 ? "+" : "") + chg.toFixed(1) + " hPa over the period.",
      { kind: kind, chg: chg });
  }
  return q;
}, ["Use the recorded lines one at a time and keep the units attached to each column."]);

E("sci-u1-wxdata-predict", 1, ["SC10.6.5"], 2, "gen", function () {
  var S = s6WxSeries();
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  var correct, why;
  var pool = {
    front: "Colder air arriving with northwest winds and clearing skies, as the cold front has passed and high pressure builds in",
    high: "Continued fair, dry and settled weather, with light winds and slowly warming temperatures",
    low: "Continued unsettled weather with more rain and strong winds, as the low remains in control"
  };
  if (S.arc === "front") { correct = pool.front; why = "Read the story in the data: pressure falls through Day 2, Day 3 brings the strongest winds, a shift into southwest flow, and the period's rain, then temperatures drop sharply, winds swing northwest and pressure climbs. That is a cold front passing on Day 3, so Day 6 continues the post-frontal pattern: colder, clearing, northwest winds."; }
  else if (S.arc === "high") { correct = pool.high; why = "Pressure is high and rising through the whole record, winds are light, and no precipitation falls: a high-pressure system is in control and settling in further. The fair pattern continues."; }
  else { correct = pool.low; why = "Pressure stays low all five days, winds are strong throughout, and rain falls every day: an unsettled low-pressure pattern with no sign of a front passing or a high arriving, so more of the same is the supported forecast."; }
  var distractors = Object.keys(pool).filter(function (k) { return pool[k] !== correct; }).map(function (k) { return pool[k]; });
  distractors.push("A rapid warm-up with humidex conditions and thunderstorms, as tropical air floods in");
  return mcq(head + "<br>Which forecast for Day 6 is best supported by the data?",
    correct, distractors,
    why, { arc: S.arc });
}, ["Forecast from tendency: what has the pressure been doing, and what story do the wind shifts tell?"]);

E("sci-u1-wxdata-front", 1, ["SC10.6.5"], 3, "gen", function () {
  var S = null;
  for (var t = 0; t < 30 && !S; t++) { var cand = s6WxSeries(); if (cand.arc === "front") S = cand; }
  if (!S) S = s6WxSeries();
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  return mcq(head + "<br>On which day did a cold front most likely pass the station?",
    "Day 3", ["Day 1", "Day 2", "Day 5"],
    "Day 3 is the hinge of the record: it has the strongest winds of the five days, southwest flow, and the period's heavy rain, and it is followed by a sharp temperature drop (from " + S.days[2].T + " °C to " + S.days[3].T + " °C), a wind shift to the northwest, and rising pressure. Days 1 and 2 are the warm, falling-pressure approach; Day 5 is settled post-frontal weather.",
    { arc: S.arc });
}, ["The front's day is the hinge: strongest winds and rain, then temperature, wind direction and pressure all flip their behaviour."]);

E("sci-u1-pressure-tendency", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("A barometer has fallen steadily by 8 hPa over the last 12 hours. The most likely weather development is",
      "an approaching low or front: expect increasing cloud, strengthening winds and precipitation to follow",
      ["improving weather, as high pressure is building in", "no change, because pressure changes do not affect weather", "an earthquake warning for the region"],
      "Falling pressure means a low or front is approaching or deepening. The faster and further it falls, the worse the coming weather tends to be. Rising pressure is the improving signal.", {});
  },
  function () {
    return mcq("After two days of rain, a station's pressure has risen 10 hPa in 24 hours and the wind has shifted northwest. The best short forecast is",
      "clearing skies and cooler air, with the fair weather likely to last a day or more",
      ["heavier rain within the hour", "a warm front arriving by evening", "fog thickening overnight because of the pressure rise"],
      "Rising pressure plus a northwest shift is the post-frontal signature: the low has moved off and a high is building in behind it. Expect clearing and cooler, drier air.", {});
  },
  function () {
    return mcq("A pressure reading of 1013 hPa that has not changed in three days tells a forecaster",
      "less than the tendency does: the same value with a falling trend would mean approaching poor weather",
      ["that fair weather is guaranteed for the week", "that a storm is exactly 24 hours away", "that the barometer must be broken"],
      "The value alone is just near-average pressure. Forecasters read the tendency, the direction and rate of change: falling means trouble approaching, rising means improvement, steady means the current pattern persists.", {});
  }
]), ["The trend is the forecast: falling, trouble coming; rising, improvement; steady, more of the same."]);

E("sci-u1-station-model", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("A station model plots a temperature of 17 °C and a dewpoint of 16 °C, with a completely filled (black) station circle. The best interpretation is",
      "the air is nearly saturated and overcast, so fog or precipitation is likely",
      ["the air is very dry, with a wide gap between temperature and dewpoint, under a clear sky", "a cold front has just passed through, leaving cooler and drier air moving in behind it", "the station is at the centre of a high pressure system, where sinking air keeps skies clear"],
      "When the dewpoint nearly equals the temperature, the air is at saturation: cloud and precipitation processes are active, matching the filled circle (overcast). A large gap between temperature and dewpoint would mean dry air.", {});
  },
  function () {
    return mcq("On a station model, where are temperature and dewpoint plotted relative to the station circle?",
      "Temperature at the upper left, dewpoint at the lower left",
      ["Temperature at the upper right, dewpoint at the lower right", "Temperature above the circle, dewpoint inside it", "Temperature at the lower left, dewpoint at the upper left"],
      "The layout is fixed: temperature upper left, dewpoint lower left, and the coded pressure at the upper right. Reading any station model starts from knowing which number sits where.", {});
  },
  function () {
    return mcq("A station's wind shaft points toward the southeast with barbs totalling 25 knots. This means",
      "the wind is blowing FROM the northwest at 25 knots",
      ["the wind is blowing TOWARD the northwest at 25 knots", "the wind is blowing from the southeast at 25 knots", "the pressure is 25 hPa above normal"],
      "The shaft is drawn on the side the wind comes from, and the station sits at its base: the wind travels down the shaft toward the circle. A shaft on the northwest side means a northwest wind, and the barbs give its speed in knots.", {});
  }
]), ["Temperature upper left, dewpoint lower left, pressure coded upper right, and the wind shaft points back to where the wind comes from."]);

E("sci-u1-humidity", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("On a clear, calm night, grass becomes wet with dew even though no rain fell. This happens because",
      "the grass cools to the dewpoint of the air touching it, so water vapour condenses on it",
      ["the grass produces water overnight", "water rises from the soil through the grass blades", "the air's pressure falls below the dewpoint"],
      "Radiational cooling drops the grass to the dewpoint temperature; vapour in contact with it condenses into liquid droplets. Dew is condensation at the surface, not rain and not water from inside the plant.", {});
  },
  function () {
    return mcq("Two towns have the same temperature, 12 °C. Town A's dewpoint is 11 °C and Town B's is 3 °C. Which statement is correct?",
      "Town A's air is much closer to saturation, so fog or cloud forms far more easily there",
      ["Town B's air holds more water vapour", "Both towns have identical relative humidity", "Town A must be raining at the moment"],
      "The temperature-dewpoint spread measures closeness to saturation: 1 degree at Town A versus 9 degrees at Town B. Town A's air needs only slight cooling to condense; Town B's air is dry. Near saturation does not guarantee rain, but it makes condensation easy.", {});
  },
  function () {
    return mcq("Relative humidity rises through a clear evening even though no moisture is added to the air. This is because",
      "the air cools toward its (unchanging) dewpoint, and cooler air reaches saturation with less vapour",
      ["evaporation speeds up as the temperature falls", "the dewpoint rises all evening", "pressure changes alter the amount of vapour present"],
      "Relative humidity compares the vapour present to the amount needed for saturation at that temperature. Cooling shrinks the denominator, so the percentage rises until it hits 100 percent at the dewpoint and dew or fog forms.", {});
  }
]), ["Watch the gap between temperature and dewpoint: small gap, saturated air; shrinking gap, condensation coming."]);

E("sci-u1-forecast-reason", 1, ["SC10.6.5", "SC10.6.4"], 3, "var", varset([
  function () {
    return mcq("A forecaster in St. John's sees: a low southwest of Nova Scotia tracking northeast, pressure at St. John's falling steadily, and winds backing to the southeast and strengthening. The best forecast for the Avalon over the next 24 hours is",
      "increasing cloud and wind with rain arriving, heaviest as the low passes, because the region is entering the low's warm sector and frontal zones",
      ["clearing and colder conditions, because lows bring fair weather as they approach", "fair weather throughout, because falling pressure means a high is arriving", "snow flurries with light winds, because southeast winds are always cold"],
      "All three clues agree: an approaching low on the usual southwest-to-northeast track, falling pressure, and strengthening southeast flow ahead of the system. That combination delivers the low's cloud shield and frontal rain to the Avalon.", {});
  },
  function () {
    return mcq("Two forecasts are issued for a town. Forecast 1 uses only the current sunny conditions and predicts sun tomorrow. Forecast 2 uses falling pressure, thickening high cloud and a low approaching from the southwest, and predicts rain tomorrow. Forecast 2 is stronger because it",
      "is based on the system's approach signals (pressure tendency, cloud sequence and the storm track), not just persistence of current weather",
      ["uses more instruments than Forecast 1", "was made later in the day", "assumes the weather always changes every 24 hours"],
      "Good forecasts read the dynamics: pressure tendency and the warm-front cloud sequence are the atmosphere announcing an approaching system. Assuming today repeats itself fails exactly when a system is arriving, which is when the forecast matters most.", {});
  },
  function () {
    return mcq("A cold front passed a town at noon. At 3 p.m. the sky is clearing and the temperature has dropped 6 °C, but a second band of showers is showing on radar behind the front. The best interpretation is",
      "showers can continue for a time in the unstable cold air behind the front even as the overall trend is toward clearing and colder conditions",
      ["the front has reversed direction and is coming back", "a warm front is now passing", "the temperature drop was an instrument error"],
      "Post-frontal cold air moving over relatively warmer ground or water is unstable and often produces scattered showers behind the main band. The trend (falling temperature, rising pressure) still says clearing overall; the radar showers are the cold air mass's own weather, not the front returning.", {});
  }
]), ["Combine independent clues: pressure tendency, cloud sequence, system track, and what the air behind a front does."]);

E("sci-u1-heatsink-data", 1, ["SC10.6.1"], 3, "var", varset([
  function () {
    return mcq("Monthly average temperatures: Town X: January -9 °C, July 21 °C. Town Y: January -1 °C, July 16 °C. Both are at the same latitude. Which conclusion is best supported?",
      "Town Y is coastal and Town X is inland: the ocean narrows Town Y's yearly temperature range (milder winter, cooler summer)",
      ["Town X is coastal and Town Y is inland", "Town Y must be much farther south than Town X", "The data must be wrong, because towns at one latitude have identical climates"],
      "Compute the ranges: Town X swings 30 degrees between January and July; Town Y swings only 17. A narrow range with milder winters and cooler summers is the fingerprint of ocean moderation, the heat sink effect in data form.", {});
  },
  function () {
    return mcq("A lake town and an inland town 80 km apart record these July overnight lows on the same clear night: lake town 17 °C, inland town 10 °C. Three nights later, under cloudy and windy conditions, the lows are 15 °C and 14 °C. The best explanation for the difference between the two nights is that",
      "on the clear calm night the inland town radiated its heat away quickly while the lake kept the shore town warm; clouds and wind on the later night reduced the contrast for both",
      ["the lake stopped storing heat on the later night", "the inland town's altitude changed between the nights", "clouds always make coastal towns colder than inland towns"],
      "The lake's moderation is strongest when the land can cool freely (clear and calm). Cloud cover acts like a blanket over both towns and wind mixes the air, so the land water contrast shrinks. Same heat sink, different conditions for expressing it.", {});
  }
]), ["Compute the temperature range and ask which place the ocean is smoothing out."]);

/* ---------- Constructed response (marks in the CRMARKS manifest) ---------- */

E("sci-u1-cr-climate", 1, ["SC10.6.1", "SC10.6.3"], 2, "var", varset([
  function () {
    return textq("Two towns are at almost the same latitude. Portside, on the coast, has a January average of -3 °C and a July average of 17 °C. Inland Flats, 250 km from the ocean, has a January average of -16 °C and a July average of 24 °C. Explain why Portside has the milder winter AND the cooler summer. In your answer, refer to the heat stored and released by the ocean and to the different specific heat capacities of land and water.",
      ["The ocean stores heat in summer and releases it slowly, warming Portside in winter; land heats and cools quickly so Inland Flats is colder in winter and hotter in summer"],
      "<b>Model answer:</b> Water has a much higher specific heat capacity than land, so the ocean absorbs a great deal of heat through the summer with only a slow temperature rise, and it gives that heat back slowly through the fall and winter. Portside's air is in contact with this heat store: in January the ocean is still releasing stored heat, keeping Portside at -3 °C, while Inland Flats, surrounded by land that has long since lost its summer heat, falls to -16 °C. In July the pattern reverses: the land around Inland Flats heats quickly to give 24 °C, while the ocean beside Portside is still cool from winter and absorbs heat, holding Portside to 17 °C. One mechanism, the ocean acting as a heat sink, explains both halves of the pattern.<br><br><b>Marking points:</b> 1 mark for the ocean storing summer heat and releasing it slowly. 1 mark for applying the release to Portside's milder winter. 1 mark for land's low specific heat capacity making Inland Flats heat and cool quickly (both its cold winter and hot summer). 1 mark for applying the ocean's slow warming to Portside's cooler summer.", {});
  },
  function () {
    return textq("A coastal town and an inland town sit at the same latitude, and both are under the same high-pressure system on a clear January night. By morning the inland town is 11 °C colder than the coastal town. Explain the difference, referring to how land and water gain and lose heat.",
      ["Land loses heat quickly overnight while the ocean releases stored heat slowly, keeping the coastal town warmer"],
      "<b>Model answer:</b> On a clear night both surfaces radiate heat to space. Land has a low specific heat capacity and stores little heat, so its surface and the air above it cool rapidly through the night. The ocean has stored a large amount of heat because of water's high specific heat capacity, and it conducts and mixes that heat up to the surface as the top layer cools, releasing heat to the coastal air all night. The coastal town is therefore moderated by the ocean's heat store and ends the night much warmer than the inland town, whose air has no such supply.<br><br><b>Marking points:</b> 1 mark for both surfaces losing heat by radiation overnight. 1 mark for land cooling faster because of its lower specific heat capacity and small heat store. 1 mark for the ocean releasing stored heat through the night (mixing/conduction within the water acceptable). 1 mark for tying that release to the coastal town's smaller temperature drop.", {});
  },
  function () {
    return textq("(a) Define evaporation. (1)\n(b) Define condensation. (1)\n(c) A puddle on the schoolyard shrinks on a sunny, windy afternoon even though no one touches it, and dew appears on the grass that night. Explain BOTH observations using your definitions, and state the role each process plays in the water cycle. (2)",
      ["Evaporation is liquid water changing to vapour at the surface; condensation is vapour changing back to liquid. The puddle evaporates (faster with sun and wind); overnight the grass cools the air to its dew point and vapour condenses as dew"],
      "<b>Model answer:</b> (a) Evaporation: the change of liquid water into water vapour at the surface of the liquid, as the fastest-moving molecules escape; it is the atmosphere's intake step for water. (b) Condensation: the change of water vapour back into liquid water when air cools to its dew point, forming droplets on surfaces or on particles in the air (clouds). It is the return step that makes precipitation possible. (c) The puddle shrinks because evaporation carries its water into the air; sunshine warms the water (more fast molecules) and wind sweeps the vapour away so more can follow, speeding the loss. At night the grass radiates heat and cools the air touching it to the dew point, so vapour condenses onto the cold blades as dew. In the water cycle, evaporation moves water from surfaces into the atmosphere, and condensation gathers it back into liquid form, in clouds and as dew.<br><br><b>Marking points:</b> 1 mark for the evaporation definition (liquid to vapour at the surface). 1 mark for the condensation definition (vapour to liquid at the dew point). 1 mark for explaining the puddle with evaporation, including the sun or wind effect. 1 mark for explaining the dew with cooling to the dew point, with the water-cycle roles of both processes stated.", {});
  }
]));

E("sci-u1-cr-frontpass", 1, ["SC10.6.4", "SC10.6.5"], 3, "var", varset([
  function () {
    return textq("A weather station in Gander records the following over one day. Morning: temperature 15 °C, dewpoint 14 °C, pressure falling steadily, wind from the south at 20 km/h, overcast. Midday: a band of heavy showers with gusts to 60 km/h lasting about an hour. Afternoon: temperature 7 °C, dewpoint 4 °C, pressure rising, wind from the northwest at 30 km/h, skies clearing. (a) What weather feature passed Gander at midday? (b) Give three pieces of recorded evidence that support your answer, and state what each one shows.",
      ["A cold front passed; evidence: the narrow heavy shower band, the sharp temperature drop with dewpoint drop, and the wind shift to the northwest with pressure changing from falling to rising"],
      "<b>Model answer:</b> (a) A cold front passed at midday. (b) Evidence: (1) The precipitation came as a brief, intense band of showers with strong gusts, the signature of a steep cold-frontal boundary lifting warm air abruptly (a warm front gives long, steady rain over hours). (2) Temperature fell sharply (15 °C to 7 °C) and the dewpoint fell further (14 °C to 4 °C), showing colder, drier air replacing warm, moist air. (3) The wind shifted from southerly (the warm sector) to northwesterly (the cold air behind the front), and the pressure tendency reversed from falling to rising as the low moved away and high pressure built in. Any three of these, each tied to what it shows, earn the marks.<br><br><b>Marking points:</b> 1 mark for identifying the cold front. 1 mark for the precipitation pattern evidence (brief intense band versus warm-front steady rain). 1 mark for one of: the temperature/dewpoint drop, the wind shift to the northwest, or the pressure tendency reversal, with its meaning stated.", {});
  },
  function () {
    return textq("A station in Labrador City records high, thin cloud thickening through a morning, followed by light snow beginning at noon and continuing steadily for nine hours. The temperature rises slowly from -9 °C to -4 °C during the snow, winds are from the east, and pressure falls slowly throughout. (a) What weather feature is passing? (b) Explain the order of the cloud and precipitation changes, and why the temperature rises during the event.",
      ["A warm front; the warm air slides up over the cold air producing a thickening cloud shield and steady precipitation ahead of the surface front, and the station enters the warmer air as the front passes"],
      "<b>Model answer:</b> (a) A warm front is passing. (b) A warm front's boundary slopes very gently, so the advancing warm air slides up over the cold air mass for hundreds of kilometres ahead of the surface position. High in that slope the first sign is thin cirrus cloud, which thickens and lowers as the slope's thicker part arrives, until steady precipitation begins well ahead of the surface front and continues for many hours. The temperature rises slowly during the event because the cold air at the surface is gradually being displaced by the warm air mass behind (above) the front; once the surface front passes, the station sits in the warm sector with the higher temperature established.<br><br><b>Marking points:</b> 1 mark for identifying the warm front. 1 mark for the gentle slope producing the thickening cloud sequence and wide, steady precipitation ahead of the surface front. 1 mark for the temperature rise explained by the warm air mass replacing the cold air at the station.", {});
  }
]));

E("sci-u1-cr-forecast", 1, ["SC10.6.5"], 3, "var", varset([
  function () {
    return textq("A station in Corner Brook records four days of data. Day 1: Temp 13 °C, Pressure 1018.2 hPa, Wind 12 km/h SE, Precip 0.0 mm. Day 2: Temp 15 °C, Pressure 1012.6 hPa, Wind 20 km/h S, Precip 0.0 mm. Day 3: Temp 16 °C, Pressure 1005.9 hPa, Wind 30 km/h S, Precip 3.4 mm. Day 4: Temp 14 °C, Pressure 1001.8 hPa, Wind 38 km/h SW, Precip 9.6 mm. Write a forecast for Day 5 and Day 6, and support it with at least three observations from the data.",
      ["A cold front is approaching and should pass on Day 5 with heavy showers and a wind shift to the northwest, followed by colder, clearing weather on Day 6"],
      "<b>Model answer:</b> Forecast: Day 5 brings the cold front through: a band of heavy showers or thunderstorms, gusty winds shifting to the northwest, and temperatures falling during the day. Day 6 is colder and drier with clearing skies and rising pressure as high pressure builds in behind the front. Supporting observations (any three, developed): (1) Pressure has fallen every day and the fall is accelerating (1018.2 to 1001.8 hPa, down 16.4 hPa), showing a low approaching and deepening. (2) Winds have strengthened steadily and backed into the south and southwest, the warm-sector flow ahead of a cold front. (3) Temperatures rose into Day 3 (warm sector air established) and precipitation has begun and intensified, the front's outer bands arriving. (4) The pattern matches an approaching mid-latitude low on the usual southwest-to-northeast track, whose cold front is the next feature due.<br><br><b>Marking points:</b> 1 mark for a Day 5 forecast of frontal passage (heavy showers, wind shift to the northwest, temperatures falling). 1 mark for a Day 6 forecast of colder, clearing weather with rising pressure. 1 mark for at least three data observations correctly tied to the forecast (pressure tendency, wind strengthening and direction, temperature pattern, precipitation trend).", {});
  },
  function () {
    return textq("A station in St. Anthony records four days of data. Day 1: Temp 4 °C, Pressure 1008.4 hPa, Wind 34 km/h E, Precip 6.2 mm. Day 2: Temp 5 °C, Pressure 1014.9 hPa, Wind 26 km/h NE, Precip 1.8 mm. Day 3: Temp 6 °C, Pressure 1021.3 hPa, Wind 14 km/h N, Precip 0.0 mm. Day 4: Temp 8 °C, Pressure 1027.5 hPa, Wind 8 km/h NE, Precip 0.0 mm. Write a forecast for Day 5 and Day 6, and support it with at least three observations from the data.",
      ["Fair, settled weather continuing: a high-pressure system is building in, so expect dry conditions, light winds and slowly warming temperatures"],
      "<b>Model answer:</b> Forecast: Day 5 and Day 6 stay fair and dry, with light winds and temperatures continuing to edge upward, as the high-pressure system settles over the region. Supporting observations (any three, developed): (1) Pressure has risen strongly and steadily, from 1008.4 to 1027.5 hPa (up 19.1 hPa), the signature of a high building in behind a departing low. (2) Precipitation has ended: 6.2 mm, then 1.8 mm, then none for two days, as sinking air suppresses cloud. (3) Winds have eased from 34 km/h to 8 km/h and settled into the northeast, matching the weak pressure gradient of a high. (4) Temperatures are rising slowly in the settled air. No front is approaching: nothing in the record shows falling pressure or strengthening southerly flow.<br><br><b>Marking points:</b> 1 mark for forecasting continued fair, dry, settled weather for both days. 1 mark for naming the building high-pressure system as the cause. 1 mark for at least three data observations correctly tied to the forecast (pressure rise, precipitation ending, winds easing).", {});
  },
  function () {
    return textq("Using a relative humidity chart (3 marks)\nPart of a standard relative humidity chart: at an air temperature of 20 °C, wet-bulb depressions of 1, 2, 3, 4, 5 °C give relative humidities of 91, 83, 74, 66, 59 percent. At 24 °C, the same depressions give 91, 84, 76, 68, 61 percent.\nA psychrometer at a station reads a dry-bulb temperature of 24 °C and a wet-bulb temperature of 20 °C.\n(a) Calculate the wet-bulb depression. (1)\n(b) Use the chart to find the relative humidity. (1)\n(c) Overnight the air cools toward 15 °C without gaining or losing moisture. State what happens to the relative humidity, and what forms if the air reaches its dew point. (1)",
      ["(a) 4 °C. (b) 68 percent. (c) The relative humidity rises as the air cools, and dew (or fog) forms at the dew point"],
      "<b>Model answer:</b> (a) Depression = dry bulb - wet bulb = 24 - 20 = 4 °C. (b) At 24 °C with a depression of 4 °C, the chart gives a relative humidity of 68 percent: the air holds about two thirds of the vapour it could hold at that temperature. (c) Cooling the air lowers its capacity to hold vapour while the actual vapour stays the same, so the relative humidity climbs toward 100 percent. At the dew point the air is saturated and the excess vapour condenses: dew on surfaces, or fog if the whole air layer cools.<br><br><b>Marking points:</b> 1 mark for the depression of 4 °C. 1 mark for reading 68 percent from the correct row and column. 1 mark for the humidity rising on cooling (capacity falls, vapour unchanged) with dew or fog forming at the dew point.", {});
  }
]));

/* ---------- Inventory top-ups (library slot coverage: spheres, jet stream, clouds, precipitation, mountain winds, weather lore) ---------- */

E("sci-u1-spheres", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Weather happens in the troposphere, the lowest layer of the atmosphere. The four Earth systems that interact to produce weather are",
      "the atmosphere, hydrosphere, lithosphere (geosphere) and biosphere",
      ["the crust, mantle, outer core and inner core", "the troposphere, stratosphere, mesosphere and thermosphere (the layers of the air alone)", "the oceans, rivers, lakes and glaciers"],
      "The systems (spheres) are the air, the water, the land and the living things. Weather is what happens where they meet: the ocean stores heat, the land reflects sunlight, and the air carries both.", {});
  },
  function () {
    return mcq("Almost all weather occurs in the troposphere because that layer",
      "holds nearly all the atmosphere's water vapour and is heated from below by the Earth's surface, so air there rises, sinks and churns",
      ["is the hottest layer of the atmosphere", "is where the ozone layer absorbs ultraviolet light", "contains no gravity to hold clouds down"],
      "The troposphere is heated from the ground up, which makes it unstable and mixing, and it contains the water vapour that becomes clouds and precipitation. Weather needs both ingredients, and only this layer has them.", {});
  }
]), ["Weather is the four spheres interacting, and it lives in the lowest layer of the air."]);

E("sci-u1-jetstream", 1, ["SC10.6.3"], 1, "var", varset([
  function () {
    return mcq("The jet stream is best described as",
      "a narrow band of very strong winds high in the troposphere that flows generally from west to east",
      ["a fast ocean current along the Labrador coast", "a river of warm air at ground level that melts snow", "the boundary line drawn between two air masses"],
      "Jet streams are high-altitude wind rivers (around 10 km up) marking the boundary between cold polar air and warmer air to the south. Airliners ride them eastbound and avoid them westbound.", {});
  },
  function () {
    return mcq("Newfoundland and Labrador's weather is strongly affected by the jet stream because it",
      "steers surface low pressure systems (storms) across the province and separates the cold air to its north from warmer air to its south",
      ["blocks all storms from reaching the Atlantic provinces", "warms the ocean surface directly beneath it", "creates the tides in the Bay of Fundy"],
      "Storms travel along the jet stream like cars on a highway, and the province sits near its usual track: that is why systems so often sweep up the Atlantic coast toward the island and Labrador.", {});
  },
  function () {
    return mcq("In winter the jet stream over eastern Canada usually shifts",
      "southward, letting Arctic air spill down over the province more often and strengthening the storms along the boundary",
      ["northward over the pole, ending winter storms", "down to ground level, where it becomes a surface wind", "into a north-to-south flow that stops all weather systems"],
      "The polar jet follows the temperature contrast. In winter the cold air mass expands south, the jet moves with it, and the island and Labrador sit more often on the cold, stormy side of the boundary.", {});
  }
]), ["The jet stream is the storm highway: high, fast, west to east, and it moves with the seasons."]);

E("sci-u1-clouds", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("Clouds form when moist air rises and cools because",
      "cooling lowers the air's capacity to hold water vapour, so the vapour condenses onto tiny particles as droplets or ice crystals",
      ["rising air gets heavier and squeezes the water out", "the Sun's rays freeze the vapour at high altitude", "wind blows the water vapour together into visible clumps"],
      "Condensation is the trigger: a parcel of air cooled to its dew point cannot hold all its vapour, and the excess condenses on dust and salt particles. Clouds are the visible result, droplet by droplet.", {});
  },
  function () {
    return mcq("Towering cumulonimbus clouds are the type associated with",
      "thunderstorms: heavy showers, lightning and gusty winds",
      ["days of gentle, steady drizzle", "fog at ground level", "clear, calm winter nights"],
      "Cumulus family clouds grow upward where air rises strongly; the biggest, cumulonimbus, reach the top of the troposphere and carry the updrafts that build lightning and downpours. Flat layered stratus brings the steady drizzle instead.", {});
  },
  function () {
    return mcq("Thin, wispy cirrus clouds high in the sky are made of",
      "ice crystals: at that altitude the air is far below freezing",
      ["liquid water droplets only", "smoke from surface fires", "frozen carbon dioxide"],
      "Cirrus live at the top of the troposphere where temperatures are well below 0 C, so their moisture exists as ice crystals. Lower, warmer clouds are mostly liquid droplets.", {});
  }
]), ["Clouds are condensation made visible; their shape tells you how the air is moving."]);

E("sci-u1-precipitation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Freezing rain forms when",
      "rain falls through a shallow layer of below-freezing air near the ground and freezes on contact with cold surfaces",
      ["snowflakes partially melt and refreeze into pellets in mid-air", "the whole air column is below freezing from cloud to ground", "rain evaporates and re-condenses as ice in the cloud"],
      "The layer cake decides the precipitation type: freezing rain melts fully in a warm layer aloft, then lands on sub-freezing surfaces and glazes them. Pellets that refreeze in mid-air are ice pellets (sleet), a different structure.", {});
  },
  function () {
    return mcq("A winter storm drops snow on the island's west coast but rain on the Avalon Peninsula at the same time. The most likely reason is",
      "the Avalon is surrounded by ocean water that moderates its air temperature to just above freezing, while the west coast air is colder",
      ["the west coast is closer to the North Pole", "rain cannot fall west of the Long Range Mountains", "the Avalon receives more sunlight in January"],
      "The two coasts sit in the same storm but different air: the ocean keeps coastal Avalon air marginal (near 0 C), tipping the precipitation to rain, while colder air inland and west keeps it snow. Small temperature differences near zero flip the type.", {});
  },
  function () {
    return mcq("Hail forms inside strong thunderstorm clouds because",
      "powerful updrafts carry water droplets up into freezing air repeatedly, adding layers of ice until the stones are too heavy to hold up",
      ["rain falls so fast that it freezes from the speed", "lightning freezes the raindrops it strikes", "hailstones fall from the stratosphere where it is always cold"],
      "Hail is a cycling product: updraft, freeze, fall partly, rise again, grow another layer. Only the violent updrafts of cumulonimbus can keep stones aloft long enough to grow, which is why hail is a warm-season thunderstorm hazard.", {});
  }
]), ["Precipitation type is a temperature-profile question: read the column from cloud to ground."]);

E("sci-u1-mountain-winds", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("Moist air from the Gulf of St. Lawrence is forced up over the Long Range Mountains. As the air rises on the windward side it",
      "cools, its vapour condenses, and clouds and precipitation form on the slopes facing the wind",
      ["warms up and dries out, so any clouds already in the air break apart and the slopes stay clear", "stops moving entirely, pooling against the mountainside so that no clouds can form there at all", "gains water vapour from the rocks it passes over, growing warmer and heavier as it climbs"],
      "Lifting is cooling: forced ascent chills the air to its dew point, wringing out moisture as orographic precipitation. The same mechanism gives the west coast of the island its heavy rain and snow while sheltered valleys stay drier.", {});
  },
  function () {
    return mcq("After crossing a mountain range, the descending air on the leeward side typically arrives",
      "warmer and drier than it started (a foehn or chinook type wind), because it lost moisture on the way up and compresses as it sinks",
      ["colder and wetter than it started, because it picks up fresh moisture from the snowfields along the ridge as it crosses over", "at exactly the same temperature and humidity it had when it reached the shore, because moving air keeps its properties unchanged", "carrying the clouds it made on the windward side along with it, so the valleys just beyond the range receive the same heavy rain"],
      "The mountain takes its toll in moisture on the way up; the dried air then warms by compression on the way down, arriving as a warm, dry wind. Alberta's chinooks are the famous Canadian example of the same physics.", {});
  }
]), ["Mountains are weather machines: lift, cool, condense on the way up; sink, warm, dry on the way down."]);

E("sci-u1-weather-lore", 1, ["SC10.6.5"], 1, "var", varset([
  function () {
    return mcq("The old saying 'red sky at night, sailor's delight; red sky in the morning, sailor's warning' has a scientific basis in mid-latitudes because",
      "weather systems here travel west to east: a red sunset means dry air and clear skies to the west (coming our way), while a red sunrise means the clear air has passed and wet weather approaches",
      ["the colour red repels rain clouds", "sailors only ever sailed in the evening", "the Sun sets in the east, so a red sunset shows tomorrow's weather"],
      "The lore encodes the prevailing flow: we mostly receive tomorrow's weather from the west. Dusty, dry western air at sunset promises a fine tomorrow; the same sky at dawn means the dry air is already east of us and the next system follows.", {});
  },
  function () {
    return mcq("Weather lore such as 'when the wind is from the east, it is neither good for man nor beast' (an east wind in Newfoundland often brings cold, damp weather off the Atlantic) is best judged scientifically as",
      "a local observation pattern with a real mechanism behind it, useful as a clue but no substitute for measured data and a forecast",
      ["always true and more reliable than instruments", "pure superstition with no connection to real weather", "a rule that works the same way everywhere on Earth"],
      "Good lore is compressed local experience: an easterly flow here really does cross cold ocean water first. It fails as a universal rule and cannot beat barometers and models, which is exactly how forecasters treat it: a hint, not a verdict.", {});
  }
]), ["Lore is local experience in rhyme: respect the mechanism, verify with the instruments."]);

/* ----- bank-u1-maps.js ----- */
// CRMARKS: sci-u1-cr-mapdescribe=4
// CRMARKS: sci-u1-cr-airmass=3
// Science 1206 Unit 1 synoptic weather map items (SC10.6.4, SC10.6.5).
// Held out of the launch bank until Jason approved the weather map
// prototype; v3 approved Nov 12, 2026 with regional framings: every
// question is framed on the region it asks about (island view = the
// island plus southern Labrador; Labrador view = Labrador plus the
// Northern Peninsula tip; full view = the whole province, complete to
// about 60.6 N). The coastline is the real provincial outline from
// Natural Earth Admin 1 data (v5.1.1, public domain), projected at
// true aspect ratio; the 13 communities sit at their published
// lat/lon. The engine below is the approved prototype's generator:
// scenarios are placed per region, each community's weather role is
// derived from the drawn geometry, and keys are recomputed from the
// scenario, so the map, the question and the key always agree.

var S6M_INK="#17352a", S6M_BLUE="#2456a6", S6M_RED="#c0392b", S6M_ISO="#7d94a6", S6M_LAND="#e9f2e4";
var S6M_COMPASS=["N","NE","E","SE","S","SW","W","NW"];
var S6M_PATHS = ["M126.4,16.1 L131.4,19.3 L122.8,16.7 L118.8,19.7 L125.5,18.0 L128.7,19.7 L125.2,23.1 L127.3,22.9 L130.2,20.5 L130.9,20.8 L129.8,22.0 L131.4,23.4 L127.5,26.4 L128.7,27.9 L123.0,28.8 L116.9,32.2 L116.6,33.5 L124.5,29.4 L129.1,29.1 L131.5,25.6 L131.6,28.2 L130.7,27.9 L130.3,28.8 L131.7,30.5 L131.0,31.9 L126.1,32.1 L130.2,33.5 L130.7,35.8 L126.8,38.0 L131.8,36.6 L133.9,32.8 L136.7,32.8 L134.0,32.1 L133.3,29.4 L138.1,30.9 L139.2,33.5 L135.0,34.6 L134.2,35.7 L136.5,35.8 L138.1,37.3 L135.5,39.5 L140.0,37.7 L137.7,44.7 L135.5,44.2 L135.3,45.5 L139.2,49.9 L145.5,49.3 L146.1,49.6 L145.2,51.0 L146.8,51.4 L143.1,52.0 L140.1,58.9 L142.9,56.5 L143.9,53.1 L148.7,53.8 L148.3,55.3 L146.1,56.2 L144.8,59.5 L148.4,55.9 L152.0,57.3 L153.3,58.8 L151.1,64.1 L144.2,64.3 L142.2,66.0 L150.7,66.7 L152.6,65.9 L152.1,67.1 L153.9,67.1 L151.7,72.8 L150.0,73.8 L153.2,72.7 L155.9,67.1 L159.9,68.2 L160.2,69.5 L159.4,73.0 L156.6,75.3 L159.5,75.1 L163.7,71.3 L165.0,71.9 L162.7,73.8 L162.2,76.6 L164.8,75.1 L165.6,76.3 L162.9,80.5 L158.2,83.0 L152.7,84.2 L145.1,82.8 L142.9,86.1 L146.0,83.8 L147.7,83.8 L147.0,85.6 L148.1,89.2 L148.9,89.1 L148.5,85.3 L150.5,84.6 L152.8,86.1 L155.5,85.0 L159.8,85.1 L162.3,83.2 L163.6,83.6 L164.8,81.5 L165.9,81.4 L168.2,82.0 L168.0,83.1 L173.3,83.7 L172.3,85.5 L166.3,85.3 L170.3,86.8 L167.5,90.2 L171.6,87.9 L172.1,89.1 L170.0,90.2 L172.3,91.3 L166.8,94.7 L171.2,94.8 L172.1,93.5 L171.7,96.4 L172.5,96.6 L174.6,92.8 L177.2,92.7 L178.1,93.5 L176.0,94.7 L180.2,96.7 L180.6,100.6 L176.2,102.9 L182.0,102.6 L182.9,104.2 L179.9,109.1 L175.1,111.1 L172.1,114.1 L165.4,114.4 L162.9,113.0 L161.9,114.8 L160.2,115.5 L165.2,114.8 L166.3,116.3 L157.8,124.9 L163.6,121.5 L168.9,115.9 L172.9,115.5 L174.8,116.7 L172.3,121.5 L175.6,117.0 L177.4,118.2 L179.8,116.0 L183.6,115.9 L184.5,114.4 L184.9,116.6 L186.3,114.5 L191.9,114.1 L192.5,115.5 L189.3,119.0 L190.5,121.3 L190.4,124.7 L187.1,126.7 L182.6,126.9 L180.8,129.9 L181.5,130.5 L183.7,127.5 L187.9,127.7 L188.9,126.8 L191.7,128.7 L190.0,131.4 L175.1,133.1 L177.4,133.9 L171.0,137.8 L173.2,137.9 L172.1,140.0 L166.3,142.4 L173.7,141.3 L174.6,138.4 L178.7,136.3 L180.2,134.3 L183.3,133.5 L183.1,134.8 L186.1,134.7 L187.3,133.7 L189.4,134.8 L191.8,132.5 L192.7,134.5 L194.1,132.0 L195.8,131.6 L196.1,132.4 L193.5,135.9 L193.9,138.3 L195.6,135.7 L198.6,135.4 L198.8,136.3 L196.9,136.8 L198.3,137.6 L198.1,138.7 L200.3,138.0 L201.0,139.8 L198.3,141.7 L193.3,141.2 L188.6,145.0 L192.4,143.2 L197.1,143.5 L197.1,148.6 L199.9,142.4 L199.7,146.2 L200.4,146.5 L201.9,143.9 L204.3,146.5 L206.5,142.7 L208.5,144.4 L209.1,147.0 L206.5,150.6 L207.3,152.6 L211.0,153.4 L212.9,157.4 L212.3,158.5 L214.8,159.4 L215.1,161.3 L208.7,164.3 L208.3,166.5 L202.2,166.7 L199.6,171.1 L194.0,168.3 L193.0,168.2 L193.4,169.0 L198.6,172.6 L205.9,170.4 L210.2,171.1 L214.6,173.4 L217.8,176.0 L213.7,176.0 L215.6,177.3 L215.3,180.9 L210.5,182.0 L210.9,182.7 L215.2,184.5 L215.8,186.7 L218.5,185.3 L218.5,187.5 L223.0,183.3 L224.0,183.5 L221.4,187.4 L229.0,187.5 L232.5,190.2 L232.1,193.0 L233.2,198.4 L231.6,196.5 L228.0,197.1 L223.2,202.3 L222.5,206.4 L214.5,207.2 L215.1,212.2 L215.8,210.1 L217.3,209.2 L221.5,210.7 L220.2,212.1 L217.3,211.8 L218.3,213.3 L222.3,214.7 L222.6,216.2 L221.7,216.6 L214.5,215.4 L213.7,214.8 L214.4,213.5 L211.8,214.2 L194.4,207.7 L202.1,205.3 L209.8,205.5 L208.3,204.6 L199.9,204.3 L197.8,205.1 L194.7,203.9 L191.6,207.0 L207.9,215.0 L214.1,216.3 L203.1,216.6 L211.2,218.4 L215.6,218.1 L219.0,219.7 L220.9,219.1 L222.9,221.5 L222.4,223.0 L219.4,224.0 L210.0,222.8 L208.4,224.1 L212.3,223.9 L212.8,225.2 L206.3,225.6 L208.5,227.0 L212.1,227.4 L212.8,226.3 L214.5,227.9 L217.5,228.4 L218.3,229.0 L216.4,229.3 L217.0,229.9 L219.4,231.9 L220.8,231.6 L219.9,232.3 L220.6,232.8 L223.3,232.7 L224.5,235.0 L219.0,233.4 L217.4,233.8 L218.0,234.2 L222.6,235.3 L219.7,236.5 L216.9,235.7 L219.4,235.0 L217.0,234.2 L212.4,234.8 L210.0,233.6 L208.6,234.2 L209.0,234.9 L213.4,238.6 L215.2,237.7 L219.2,237.9 L218.7,239.0 L224.7,238.2 L226.4,239.5 L233.2,238.3 L233.6,240.7 L231.7,241.2 L231.1,243.2 L233.1,242.4 L233.4,244.4 L229.5,247.2 L234.1,246.7 L236.9,248.0 L233.9,248.4 L235.7,249.1 L229.1,248.8 L227.9,249.9 L231.9,250.6 L231.6,251.7 L229.3,250.3 L231.3,252.6 L236.0,252.1 L238.0,253.2 L238.9,251.7 L240.1,251.9 L242.4,254.3 L242.2,256.2 L239.0,255.9 L238.3,257.0 L241.5,258.7 L246.6,257.5 L253.3,258.6 L253.9,259.9 L252.8,262.3 L250.9,263.7 L246.5,263.7 L245.8,264.0 L246.7,265.1 L253.2,264.8 L256.4,259.9 L258.1,260.2 L257.3,262.2 L258.5,266.3 L256.3,268.0 L257.2,270.0 L255.5,274.1 L258.1,270.7 L261.3,261.1 L264.1,262.6 L264.9,261.8 L265.8,262.9 L267.1,262.3 L267.2,263.5 L265.4,265.5 L265.7,267.5 L261.8,268.9 L260.7,271.3 L260.5,272.6 L262.5,270.5 L263.8,270.3 L264.9,271.5 L263.1,277.5 L266.9,273.1 L267.6,273.5 L267.1,275.5 L268.1,276.0 L267.9,277.1 L266.8,276.8 L263.1,280.5 L263.4,283.0 L262.2,285.7 L267.3,277.9 L268.1,278.2 L266.1,281.2 L267.2,280.1 L268.8,280.9 L268.6,278.8 L269.8,277.4 L271.6,278.2 L271.8,281.6 L266.2,283.6 L264.8,288.9 L262.6,288.7 L261.5,290.1 L260.3,293.7 L257.8,295.7 L261.8,292.5 L263.0,292.0 L263.8,292.8 L265.0,290.8 L266.3,291.3 L262.6,294.6 L261.0,298.3 L255.7,302.1 L255.3,305.1 L259.6,300.2 L262.4,298.7 L263.0,296.4 L265.8,295.7 L268.7,292.1 L271.2,291.4 L273.2,289.0 L271.8,294.2 L276.7,290.0 L277.6,289.8 L277.3,290.6 L272.0,299.5 L269.9,300.1 L268.4,303.6 L275.0,297.2 L277.6,292.0 L281.2,291.6 L281.1,290.5 L283.5,288.0 L285.8,286.8 L286.3,289.4 L287.2,288.9 L287.7,289.9 L286.5,292.8 L287.2,293.9 L282.0,296.6 L279.2,296.4 L279.5,298.5 L281.0,296.9 L282.8,296.8 L282.8,298.3 L285.0,298.7 L287.2,296.6 L290.3,297.6 L293.8,295.2 L294.1,293.2 L295.2,294.2 L295.2,297.2 L297.4,297.1 L294.3,301.7 L287.2,306.6 L287.3,308.3 L283.4,311.7 L283.3,313.3 L284.4,313.5 L283.1,316.3 L280.1,318.1 L280.9,318.8 L285.3,316.5 L285.2,311.6 L290.9,307.7 L296.8,301.5 L298.0,301.7 L298.0,303.2 L302.8,293.5 L304.6,293.0 L304.4,295.7 L306.5,291.9 L307.7,294.2 L307.1,296.4 L298.9,304.6 L299.0,306.0 L303.0,303.2 L304.3,300.3 L305.8,299.5 L306.7,300.8 L307.6,297.9 L308.5,298.6 L308.3,300.6 L309.7,296.8 L310.9,296.0 L312.0,298.3 L313.4,297.7 L310.4,304.9 L312.3,303.8 L315.5,307.3 L311.3,310.7 L313.2,310.7 L315.0,309.1 L315.7,310.4 L314.7,313.1 L318.6,312.6 L320.2,315.6 L321.5,313.0 L323.5,315.2 L328.1,315.5 L326.5,317.4 L330.7,317.0 L331.2,318.8 L332.4,318.6 L332.4,316.0 L338.6,315.9 L340.0,318.9 L344.6,318.8 L345.7,320.3 L347.3,318.9 L349.9,318.7 L352.7,322.3 L354.5,321.7 L355.9,324.6 L362.6,323.4 L365.1,325.6 L364.9,326.7 L367.2,327.2 L367.1,328.4 L364.4,328.9 L366.3,330.6 L365.1,332.5 L355.2,333.4 L364.9,334.2 L361.1,334.6 L361.1,336.2 L357.7,338.4 L350.5,338.6 L349.4,337.9 L339.1,339.8 L336.6,342.4 L342.1,341.2 L337.1,343.5 L337.5,345.3 L329.7,346.6 L321.0,351.4 L315.9,351.3 L298.5,356.6 L294.6,355.8 L292.4,356.5 L294.7,359.2 L301.7,358.3 L319.6,352.5 L322.0,352.5 L327.2,348.7 L330.1,348.4 L332.1,346.4 L332.9,346.9 L324.4,356.9 L321.7,357.5 L316.6,356.6 L310.4,357.6 L314.5,358.4 L312.7,360.8 L304.6,363.1 L295.9,368.6 L283.6,367.7 L282.4,368.9 L284.6,369.4 L284.3,370.5 L276.2,372.2 L273.9,371.1 L277.8,375.2 L275.2,375.6 L274.6,380.1 L275.9,382.9 L273.8,384.9 L273.3,383.5 L267.0,379.7 L265.3,377.4 L251.4,371.7 L249.5,368.3 L248.8,368.5 L249.4,370.4 L247.0,374.1 L247.5,374.8 L250.3,374.1 L257.0,375.4 L263.5,378.5 L269.1,383.1 L276.7,386.6 L277.1,389.8 L273.9,388.6 L266.7,392.9 L266.1,394.6 L264.7,393.8 L265.5,395.4 L271.5,394.4 L272.2,395.4 L264.2,399.1 L268.2,398.9 L272.6,397.1 L274.0,398.7 L274.9,398.3 L275.3,397.0 L273.6,396.5 L273.5,395.6 L277.3,394.2 L281.7,388.6 L282.5,389.4 L282.6,387.2 L285.6,387.5 L283.0,386.5 L282.4,384.4 L286.5,385.2 L291.5,384.7 L294.7,383.5 L299.5,378.2 L300.8,377.9 L301.2,376.3 L302.8,377.5 L304.5,376.0 L305.9,377.1 L309.3,376.3 L309.6,374.5 L311.1,374.8 L311.6,372.9 L310.2,372.6 L309.5,370.4 L315.9,364.9 L317.2,362.2 L323.3,360.8 L335.7,355.7 L338.0,355.8 L341.1,354.0 L352.2,355.4 L350.4,353.7 L347.0,353.8 L340.3,351.6 L334.6,354.2 L331.5,351.6 L331.7,350.4 L333.4,347.9 L336.9,347.9 L338.7,346.2 L345.0,346.2 L350.0,348.2 L353.2,347.6 L353.1,348.5 L358.7,349.1 L358.2,350.2 L363.3,348.4 L365.8,350.9 L365.6,352.1 L367.0,351.7 L367.4,355.6 L370.1,360.5 L373.6,361.9 L374.1,362.9 L371.6,363.1 L371.5,364.9 L376.4,368.9 L374.3,368.9 L375.3,369.9 L373.7,371.7 L374.8,373.3 L363.6,378.4 L360.5,381.6 L364.0,379.7 L363.7,381.2 L366.3,380.7 L368.3,381.9 L367.4,384.1 L368.7,384.6 L368.6,386.8 L366.3,390.1 L369.5,389.8 L369.1,388.2 L374.4,383.8 L374.0,382.6 L373.4,383.1 L374.6,381.7 L374.5,379.9 L376.4,379.0 L376.6,377.4 L379.5,374.1 L385.8,374.5 L388.5,372.8 L392.5,374.8 L391.3,373.3 L391.7,371.8 L392.5,372.5 L396.4,370.7 L398.7,374.1 L394.2,375.0 L392.5,376.7 L388.7,376.9 L398.0,380.1 L400.8,379.1 L403.7,380.8 L401.5,380.8 L400.7,381.2 L401.4,381.6 L407.1,381.2 L411.2,382.1 L413.1,383.8 L411.9,386.3 L410.1,384.0 L403.6,383.6 L410.7,387.7 L411.3,390.1 L413.6,391.3 L411.1,393.5 L415.0,391.9 L417.3,393.5 L416.1,394.6 L418.6,395.2 L415.4,396.9 L418.5,397.4 L418.9,398.5 L417.0,400.2 L418.8,401.0 L421.0,399.8 L419.3,402.5 L417.7,402.0 L420.9,405.8 L418.2,408.4 L414.3,407.3 L416.6,409.5 L414.8,412.3 L410.5,411.4 L406.9,412.2 L409.7,412.5 L407.9,414.4 L408.3,415.2 L410.7,413.5 L415.7,414.6 L416.3,415.9 L415.4,416.2 L418.0,417.9 L419.1,422.4 L413.2,423.9 L412.5,424.8 L415.0,424.8 L413.3,425.8 L407.0,423.6 L407.9,425.3 L411.2,427.1 L411.5,428.9 L413.6,430.8 L419.9,431.1 L421.2,432.6 L419.8,433.8 L420.7,434.1 L419.1,435.6 L409.2,432.1 L408.3,433.0 L411.9,433.2 L413.2,434.5 L410.8,436.7 L412.9,437.8 L408.5,437.1 L405.1,438.7 L402.4,437.0 L395.7,435.6 L403.5,438.8 L411.1,438.5 L412.4,440.1 L418.2,439.7 L417.7,441.2 L421.2,441.3 L420.5,443.7 L424.3,444.0 L424.4,447.5 L423.5,448.7 L421.0,447.1 L418.9,447.2 L420.1,449.7 L405.8,443.8 L408.5,446.4 L411.6,446.8 L414.3,449.3 L418.4,450.2 L417.3,451.6 L418.5,451.4 L420.3,452.8 L422.2,452.0 L419.3,455.0 L422.3,454.3 L425.3,456.2 L420.1,456.5 L422.8,458.0 L423.0,462.1 L422.1,463.2 L419.1,463.6 L420.5,465.1 L418.8,466.9 L416.2,467.8 L413.6,467.0 L415.9,469.8 L415.3,471.7 L408.5,475.6 L404.6,479.7 L400.7,480.2 L398.7,482.7 L397.3,482.2 L396.5,484.2 L393.0,486.8 L389.6,487.3 L388.7,491.1 L386.9,492.0 L383.6,496.7 L381.4,495.3 L380.0,499.4 L375.5,499.8 L375.5,468.2 L153.0,468.2 L150.2,464.4 L155.2,466.2 L156.3,465.4 L153.8,455.7 L151.5,452.3 L152.6,450.6 L145.1,448.9 L141.5,442.4 L144.3,437.8 L148.4,435.0 L165.0,432.7 L163.0,429.2 L157.7,426.2 L157.2,421.3 L153.6,425.8 L140.6,429.0 L138.6,431.4 L138.7,435.7 L137.8,437.0 L139.4,441.5 L139.9,447.1 L136.8,453.7 L139.0,461.0 L138.4,461.9 L137.1,461.2 L135.7,461.9 L135.1,466.0 L136.3,469.2 L134.9,470.0 L132.9,467.5 L132.1,470.0 L133.0,478.0 L134.8,482.3 L132.6,486.2 L126.4,490.4 L118.3,481.0 L115.5,480.4 L113.4,481.2 L113.3,482.9 L112.1,483.2 L109.6,481.2 L108.0,481.7 L104.5,480.4 L104.5,477.8 L101.4,475.4 L99.3,478.0 L97.5,473.7 L98.6,470.9 L98.0,469.0 L96.8,469.0 L93.9,462.8 L92.2,466.4 L90.1,466.4 L88.5,468.8 L87.8,466.8 L88.7,462.3 L86.2,463.4 L83.0,462.3 L80.4,463.8 L79.1,463.0 L77.4,464.9 L74.2,463.2 L74.5,458.9 L70.6,456.1 L67.6,451.4 L67.0,452.5 L68.3,459.7 L67.0,461.0 L64.6,460.4 L61.0,449.9 L62.5,447.7 L65.4,448.6 L63.6,432.9 L64.6,431.8 L67.5,434.9 L63.7,422.2 L64.0,420.7 L67.5,422.0 L66.6,417.2 L64.9,413.6 L62.9,411.7 L61.8,412.1 L60.1,416.0 L56.2,417.2 L55.1,424.8 L51.3,426.5 L51.3,431.2 L48.6,428.4 L48.1,432.1 L45.3,428.0 L42.2,426.0 L41.5,420.5 L39.1,421.5 L38.1,423.5 L33.4,420.9 L32.0,418.3 L30.7,408.0 L33.6,405.2 L35.5,404.6 L39.6,407.0 L41.9,407.0 L42.0,409.7 L43.7,409.3 L44.9,397.7 L43.3,394.5 L44.1,392.8 L47.3,391.1 L42.6,385.7 L32.8,382.9 L30.2,379.1 L29.8,376.0 L23.6,371.1 L26.4,369.4 L26.1,368.1 L23.6,367.0 L23.0,363.4 L16.5,357.4 L17.6,352.4 L22.1,349.0 L20.4,342.6 L18.6,340.6 L18.5,336.1 L22.4,332.9 L23.3,333.7 L26.5,332.7 L26.9,326.9 L34.6,332.9 L35.8,331.2 L34.8,328.2 L38.4,325.8 L40.7,322.2 L40.7,319.4 L34.7,313.8 L29.4,305.0 L28.7,302.1 L29.9,300.5 L31.6,300.0 L34.4,301.3 L33.2,304.0 L42.7,310.5 L45.7,315.8 L50.8,318.7 L53.6,319.0 L52.9,317.1 L55.6,316.8 L56.8,315.5 L52.7,308.2 L52.7,307.0 L55.0,305.7 L51.6,299.2 L52.2,295.5 L54.0,293.9 L49.1,287.6 L49.2,286.6 L51.3,286.4 L53.7,288.1 L54.4,290.8 L58.4,291.8 L68.6,304.9 L72.6,306.7 L75.8,309.7 L78.1,308.8 L82.0,309.9 L83.2,314.8 L87.8,320.4 L89.7,318.5 L92.4,319.8 L94.6,319.5 L95.7,318.7 L94.8,313.4 L100.7,314.3 L103.2,312.9 L105.2,308.7 L107.2,307.2 L112.6,308.7 L115.8,313.0 L118.0,313.8 L118.8,314.8 L118.5,319.1 L124.9,319.7 L128.8,316.0 L131.0,316.3 L138.1,320.6 L140.4,324.9 L142.5,326.2 L147.6,326.5 L150.8,324.4 L152.9,325.3 L153.3,324.1 L147.4,316.7 L150.1,314.1 L149.4,311.4 L150.4,308.1 L157.4,310.2 L158.4,306.0 L158.0,298.3 L159.8,294.3 L163.7,292.6 L164.0,291.1 L159.3,292.5 L156.1,291.5 L155.6,290.1 L159.6,288.1 L158.3,286.4 L166.2,285.2 L166.7,283.7 L166.4,282.4 L156.2,281.7 L153.0,280.9 L152.0,279.7 L151.9,278.5 L154.7,276.6 L155.3,270.9 L154.9,269.4 L152.6,269.2 L154.4,262.6 L152.2,261.7 L149.5,255.1 L154.6,253.6 L162.8,249.2 L157.4,249.4 L154.1,247.8 L150.8,248.1 L148.3,246.1 L149.5,244.3 L148.8,243.7 L143.8,246.6 L143.8,241.9 L148.0,239.8 L148.3,238.6 L146.1,236.6 L141.1,236.1 L139.6,233.9 L140.6,230.0 L138.5,227.2 L145.5,227.6 L148.3,226.5 L146.0,224.1 L145.8,220.0 L143.7,218.3 L140.0,211.8 L141.4,208.7 L144.4,207.5 L144.3,203.9 L148.5,202.6 L147.0,199.4 L148.7,196.4 L148.3,192.7 L151.1,190.5 L151.2,186.8 L152.8,183.6 L151.8,181.7 L150.2,181.0 L149.2,185.5 L148.6,182.4 L149.6,178.3 L154.0,175.0 L152.1,170.8 L152.1,165.2 L153.2,163.1 L156.3,161.2 L158.1,157.4 L157.2,155.7 L156.0,156.2 L154.4,160.1 L151.9,156.2 L150.3,158.5 L149.3,156.6 L147.8,156.2 L146.2,152.4 L143.8,151.7 L143.6,153.6 L142.4,154.2 L137.0,142.8 L136.8,139.1 L129.9,137.5 L131.1,131.3 L137.2,128.6 L138.9,122.6 L142.5,121.3 L144.9,117.9 L148.7,117.7 L150.2,115.7 L147.9,110.7 L144.0,112.8 L141.6,111.5 L141.0,108.1 L142.2,105.1 L148.2,103.2 L158.5,102.6 L161.5,100.2 L158.5,96.1 L152.2,93.7 L149.5,96.4 L144.8,96.7 L138.9,100.7 L135.4,99.0 L135.5,95.3 L133.8,93.4 L125.1,93.2 L120.7,90.2 L116.6,91.9 L114.6,90.6 L116.0,89.5 L115.2,87.4 L116.6,85.1 L118.9,83.6 L129.5,88.0 L134.4,86.7 L132.5,83.5 L128.5,82.3 L126.3,76.5 L127.2,73.5 L126.2,70.9 L127.2,68.5 L126.2,66.8 L127.9,65.3 L127.3,63.7 L132.3,60.7 L132.5,59.6 L131.6,58.6 L129.0,58.5 L120.7,62.8 L118.8,61.3 L118.3,59.1 L114.2,56.4 L113.9,54.2 L114.5,51.0 L118.2,49.0 L116.9,42.5 L119.1,41.2 L118.4,39.2 L121.7,39.0 L122.2,37.2 L121.1,35.4 L115.8,34.4 L113.9,30.1 L114.8,29.4 L118.0,30.3 L120.5,29.2 L119.3,27.1 L124.1,26.2 L122.9,23.2 L119.1,23.2 L117.0,21.9 L115.4,19.8 L115.9,18.3 L118.6,16.9 L126.4,16.1 Z", "M475.4,705.4 L474.3,711.3 L471.3,718.1 L467.7,718.4 L472.2,711.0 L471.5,709.6 L473.8,706.5 L473.8,708.3 L475.3,703.9 L475.4,705.4 Z", "M415.0,703.5 L415.0,705.6 L416.6,706.8 L415.7,707.3 L408.8,705.7 L409.7,704.1 L415.0,703.5 Z", "M494.0,675.5 L494.8,674.6 L495.8,675.7 L494.5,680.0 L495.2,680.0 L494.1,681.4 L492.3,681.4 L483.7,680.1 L481.8,674.6 L484.8,676.6 L487.2,676.3 L490.3,677.7 L494.0,675.5 Z", "M449.9,601.2 L449.8,599.1 L451.5,598.6 L453.3,599.0 L452.9,600.8 L455.0,601.2 L457.0,600.0 L458.3,597.0 L458.9,597.9 L461.4,595.5 L461.2,599.6 L455.4,602.4 L454.6,604.6 L450.1,604.6 L452.5,603.4 L449.9,601.2 Z", "M470.2,600.1 L469.2,594.9 L471.0,594.6 L469.9,592.7 L471.3,591.9 L472.9,593.1 L473.1,594.6 L473.3,591.9 L474.9,591.6 L474.5,590.4 L476.4,590.6 L480.0,596.0 L478.5,595.7 L470.2,600.1 Z", "M428.9,533.2 L430.8,533.7 L428.4,537.8 L426.5,539.0 L424.4,537.7 L425.2,533.9 L426.0,534.9 L428.9,533.2 Z", "M525.5,711.7 L525.5,713.9 L523.4,715.0 L524.6,716.5 L521.8,722.9 L519.7,723.6 L521.1,724.0 L519.3,725.5 L517.5,734.8 L515.1,735.6 L518.1,736.5 L517.2,737.1 L517.9,738.9 L516.6,740.6 L517.0,743.0 L515.0,751.7 L512.0,754.7 L510.8,758.5 L508.3,760.5 L506.6,760.6 L504.5,757.6 L504.1,754.5 L502.2,757.0 L501.4,755.7 L500.0,757.6 L501.1,754.5 L498.0,758.6 L494.5,761.1 L492.2,759.1 L491.7,756.1 L492.9,750.5 L494.8,747.0 L496.8,745.6 L494.8,746.6 L491.4,751.2 L493.0,745.5 L495.6,743.4 L495.6,742.3 L494.0,743.4 L494.0,741.5 L492.6,742.9 L492.9,741.1 L491.5,741.1 L493.5,735.9 L496.3,733.0 L495.5,732.5 L495.6,731.1 L493.9,731.8 L494.3,729.2 L492.4,733.8 L491.3,734.4 L492.0,731.8 L491.3,732.3 L489.4,737.0 L487.3,738.2 L485.6,742.4 L483.9,743.4 L481.3,748.1 L476.2,751.2 L473.2,749.7 L473.3,744.3 L479.2,727.6 L481.8,727.6 L479.9,726.0 L479.6,723.1 L482.1,723.3 L483.7,720.7 L482.4,720.6 L483.1,719.0 L486.0,717.3 L484.6,716.1 L482.8,716.8 L482.1,715.6 L483.3,712.2 L483.1,707.7 L481.5,705.8 L479.3,695.7 L477.5,696.8 L476.8,692.7 L475.3,695.3 L473.8,692.7 L470.6,691.2 L472.9,693.0 L472.9,695.0 L470.1,702.3 L468.5,701.7 L468.6,705.1 L464.2,713.2 L466.0,715.8 L464.4,717.3 L464.6,715.9 L463.9,715.8 L462.6,718.4 L463.7,718.4 L462.5,719.5 L459.2,721.1 L458.9,720.3 L464.9,710.1 L465.5,707.2 L459.3,718.0 L457.2,719.9 L456.8,718.4 L455.7,721.0 L455.0,719.9 L453.7,720.4 L453.6,719.5 L452.0,720.3 L453.1,717.3 L451.7,719.9 L451.4,717.5 L445.1,727.3 L445.1,730.9 L443.5,731.8 L443.0,729.1 L441.4,731.1 L443.2,731.7 L442.8,737.1 L440.8,739.7 L440.2,736.7 L439.4,736.5 L439.5,740.3 L438.3,743.8 L436.5,745.4 L433.6,745.3 L433.9,747.2 L433.1,747.5 L430.8,747.1 L430.4,744.1 L428.4,744.6 L428.3,743.4 L427.5,745.7 L426.5,745.5 L423.6,747.8 L417.4,747.4 L413.5,744.8 L413.1,742.0 L416.8,736.2 L420.5,734.4 L423.0,735.2 L429.7,732.7 L430.5,730.5 L435.9,725.8 L437.4,717.9 L439.8,715.3 L447.5,712.8 L447.6,711.5 L450.9,709.8 L451.3,708.3 L450.1,708.7 L451.3,706.8 L456.1,703.8 L453.6,703.8 L453.8,703.1 L449.6,706.6 L443.0,707.6 L448.1,697.5 L441.6,708.6 L440.9,707.6 L441.6,704.2 L439.5,705.7 L435.2,703.8 L433.8,704.7 L433.7,700.5 L432.9,702.4 L431.7,701.2 L430.2,706.2 L432.0,705.8 L432.7,706.8 L431.5,708.3 L432.9,707.9 L432.3,713.0 L431.3,714.7 L428.5,715.0 L426.5,718.4 L426.2,715.4 L423.7,716.5 L426.2,712.4 L424.6,710.7 L424.1,711.7 L425.1,711.7 L423.7,713.6 L422.1,712.8 L422.6,713.9 L420.0,715.4 L420.7,710.9 L419.0,715.2 L417.3,714.3 L415.2,716.5 L420.9,708.3 L408.4,714.9 L406.8,712.9 L407.4,712.0 L415.4,709.4 L424.9,703.5 L423.2,703.4 L417.7,706.5 L415.3,704.5 L415.7,702.3 L418.2,700.1 L418.6,694.6 L421.2,690.0 L419.8,688.2 L417.1,697.3 L412.8,699.4 L410.5,702.3 L408.7,702.0 L410.6,697.9 L409.1,699.0 L407.4,694.5 L408.0,699.2 L406.7,701.2 L407.9,702.4 L406.0,703.5 L407.1,705.4 L406.4,706.0 L405.3,704.6 L404.6,705.9 L402.3,706.1 L402.1,699.4 L401.2,706.8 L389.9,706.2 L389.0,706.5 L391.1,708.3 L389.8,708.9 L387.2,705.7 L386.7,706.5 L388.8,709.4 L385.9,711.5 L383.9,711.4 L383.9,710.2 L382.5,710.5 L379.5,708.4 L374.0,709.2 L373.2,705.7 L372.0,708.0 L368.4,708.6 L367.8,705.4 L362.0,705.9 L361.2,704.9 L357.9,707.6 L354.3,704.6 L353.2,706.8 L349.9,704.6 L348.1,704.9 L349.3,702.4 L346.9,703.7 L344.0,702.3 L342.9,703.6 L343.1,702.4 L342.1,702.5 L337.8,704.6 L335.6,703.6 L334.0,705.4 L333.5,704.2 L334.9,700.7 L336.6,699.4 L333.7,700.1 L331.1,705.7 L329.6,704.8 L328.3,705.4 L327.6,704.1 L327.7,704.9 L325.2,706.6 L323.7,706.2 L321.8,707.6 L314.5,707.6 L313.1,708.7 L306.9,709.8 L304.2,709.1 L301.5,706.5 L302.4,699.0 L301.0,698.2 L298.4,690.8 L301.1,689.5 L306.2,682.7 L312.9,678.2 L314.9,675.0 L321.1,669.3 L323.0,665.0 L326.3,661.9 L328.8,661.3 L325.7,663.9 L329.5,662.1 L331.8,658.8 L336.3,657.5 L335.0,656.8 L330.9,658.7 L330.4,658.0 L327.3,658.0 L325.3,656.1 L321.8,655.7 L317.3,657.3 L309.2,657.9 L303.1,660.2 L304.3,656.5 L319.6,643.4 L314.6,649.0 L313.2,652.4 L315.2,654.0 L315.5,655.7 L317.0,653.4 L316.9,651.3 L318.1,654.8 L321.5,655.0 L323.0,646.4 L327.1,638.4 L328.6,631.1 L333.0,623.3 L333.8,624.3 L332.9,625.5 L333.8,625.5 L333.4,628.1 L338.2,627.4 L340.5,628.9 L343.1,632.6 L349.3,633.0 L343.8,631.7 L341.8,629.4 L340.8,624.6 L348.3,624.4 L350.4,621.4 L347.4,623.2 L346.4,622.4 L347.9,621.0 L342.7,623.5 L342.0,621.5 L344.9,621.8 L347.9,618.0 L344.2,619.6 L338.9,618.2 L337.5,616.0 L337.7,611.3 L340.8,605.1 L345.3,600.9 L348.1,602.5 L348.8,607.6 L349.7,608.0 L348.9,605.7 L349.7,603.9 L355.4,606.3 L352.2,603.7 L351.3,600.9 L350.3,602.7 L349.5,602.5 L347.3,598.0 L347.1,594.5 L358.5,568.0 L361.2,557.0 L367.0,544.0 L368.2,543.4 L372.3,544.5 L373.7,543.0 L369.7,543.1 L370.9,542.3 L370.4,541.6 L368.9,541.7 L368.1,539.6 L365.6,538.5 L373.4,536.0 L376.6,533.4 L379.9,527.4 L381.4,527.0 L379.1,525.4 L380.3,524.4 L377.8,523.7 L375.9,521.4 L378.6,521.4 L379.6,523.3 L382.3,521.6 L381.6,520.2 L379.6,519.6 L382.2,519.3 L383.5,516.4 L385.8,515.1 L385.3,512.1 L387.4,511.7 L385.8,509.5 L388.3,505.2 L395.9,500.2 L399.2,499.4 L401.9,497.1 L409.5,493.4 L416.0,488.4 L416.9,489.2 L418.4,488.6 L416.6,491.5 L416.4,492.5 L417.7,492.3 L416.7,495.6 L420.7,495.3 L425.5,496.4 L423.7,495.8 L422.9,493.3 L421.2,492.4 L421.6,491.2 L421.7,492.3 L424.8,489.4 L424.2,490.3 L425.5,491.7 L428.7,489.7 L430.0,491.1 L431.7,490.6 L432.4,491.9 L432.0,492.6 L430.1,491.9 L431.5,493.3 L430.7,495.3 L428.1,494.9 L429.8,496.7 L430.8,496.5 L430.6,497.4 L429.2,502.0 L427.0,501.4 L427.3,503.5 L425.5,503.5 L426.0,505.8 L419.0,503.4 L416.2,503.9 L414.1,502.4 L414.5,503.5 L413.6,503.7 L411.3,501.7 L411.1,503.1 L409.5,502.4 L409.2,505.0 L411.7,505.8 L412.0,507.6 L410.8,508.0 L412.0,509.1 L409.9,509.9 L411.8,510.7 L413.6,513.9 L414.3,514.0 L413.8,511.7 L417.5,510.0 L420.4,510.8 L421.9,512.6 L421.4,518.1 L419.8,519.6 L419.0,518.8 L420.0,520.7 L418.0,524.1 L418.6,526.3 L417.5,525.1 L416.9,526.2 L416.8,527.8 L417.7,527.8 L416.6,530.0 L416.1,528.2 L415.0,528.9 L409.8,537.8 L409.0,537.5 L409.5,535.6 L408.5,536.0 L407.9,534.9 L409.0,527.8 L407.0,529.2 L407.0,537.8 L409.1,540.6 L405.1,545.3 L404.1,548.3 L401.6,548.3 L403.5,549.5 L398.7,556.5 L397.3,555.4 L395.7,555.7 L398.1,557.3 L397.6,560.5 L394.9,566.3 L391.7,569.9 L389.9,569.9 L390.8,571.6 L388.1,574.8 L386.4,579.7 L386.2,581.5 L388.3,579.8 L386.7,586.3 L382.1,590.4 L386.2,591.8 L383.7,601.6 L393.8,585.3 L396.8,582.6 L398.2,585.4 L398.1,582.3 L398.9,581.5 L400.3,582.6 L399.6,579.9 L401.8,574.9 L403.4,573.8 L404.4,571.2 L408.5,568.4 L408.3,569.6 L409.3,569.8 L410.4,572.5 L406.0,581.1 L412.1,575.3 L412.7,576.2 L411.3,578.1 L412.3,578.6 L413.8,574.8 L417.0,576.1 L421.0,580.7 L422.1,580.6 L423.6,578.3 L426.5,578.5 L429.5,576.2 L430.4,579.1 L429.4,581.4 L426.7,582.4 L422.0,586.7 L413.7,591.1 L412.4,590.5 L412.3,591.9 L407.1,597.5 L406.9,600.2 L409.2,596.8 L413.5,593.2 L416.1,592.8 L413.8,594.6 L415.9,593.4 L418.0,593.8 L414.5,598.3 L416.6,599.0 L415.8,600.8 L409.9,604.7 L408.1,608.1 L414.1,604.3 L418.4,603.0 L421.9,605.6 L419.6,606.9 L423.2,605.7 L422.6,608.3 L423.5,608.3 L423.9,610.6 L426.5,605.8 L428.5,604.6 L426.9,611.7 L429.7,605.3 L430.1,606.4 L431.1,604.6 L433.6,603.9 L433.3,604.6 L434.3,604.6 L431.5,608.3 L435.4,606.9 L431.1,612.1 L432.9,611.3 L433.1,613.2 L434.8,609.5 L435.5,610.3 L436.3,609.6 L436.1,611.2 L434.5,612.1 L435.4,614.3 L435.7,612.6 L438.1,610.2 L435.4,602.4 L437.3,601.6 L439.3,603.9 L438.9,602.4 L441.4,602.0 L441.7,606.1 L438.4,611.4 L438.5,617.1 L433.7,622.1 L435.2,622.9 L434.5,624.8 L435.5,625.9 L433.1,628.9 L437.3,627.1 L439.8,624.8 L436.7,625.7 L437.5,621.0 L436.3,620.9 L444.2,615.4 L443.2,611.7 L445.1,613.5 L445.5,612.5 L446.2,616.0 L444.8,618.9 L447.8,615.1 L450.0,615.7 L449.9,611.0 L451.6,609.2 L452.1,616.5 L453.6,612.6 L454.2,612.1 L454.6,614.1 L461.3,602.7 L463.8,601.7 L464.6,601.9 L461.6,607.2 L465.1,605.7 L463.2,610.8 L464.2,613.0 L463.3,616.9 L466.2,613.2 L465.6,612.3 L467.0,608.5 L469.4,608.0 L469.3,608.9 L470.8,608.3 L471.2,609.4 L472.2,608.7 L471.7,611.7 L472.9,609.1 L473.6,610.6 L474.9,606.8 L476.9,606.7 L478.0,605.2 L480.0,606.5 L478.2,607.6 L482.1,606.9 L490.3,611.5 L491.1,613.4 L493.1,613.8 L494.7,615.8 L496.5,615.8 L497.8,618.3 L496.5,620.7 L494.9,621.2 L494.1,624.6 L492.8,624.0 L492.2,625.1 L493.5,626.7 L493.3,628.6 L484.9,629.6 L485.9,630.7 L488.7,630.7 L485.9,632.5 L483.4,631.9 L483.0,632.5 L485.9,635.2 L480.2,637.1 L483.4,637.1 L480.2,639.3 L480.7,640.1 L474.9,641.2 L472.9,643.8 L478.8,641.5 L479.8,642.0 L479.1,643.8 L479.8,644.1 L481.4,641.0 L484.7,640.2 L486.2,641.6 L482.3,642.3 L483.2,644.5 L484.8,643.8 L483.6,645.2 L478.8,645.3 L481.4,646.2 L481.2,649.4 L483.0,650.5 L481.8,651.6 L486.4,649.0 L482.3,649.3 L485.0,645.1 L484.4,647.5 L487.9,647.1 L489.4,648.3 L488.7,650.0 L491.9,647.9 L492.8,649.1 L485.3,653.5 L482.8,653.9 L480.9,656.1 L482.8,655.0 L489.2,655.4 L486.4,656.5 L487.9,657.6 L483.0,659.5 L479.2,662.6 L476.4,662.5 L474.0,664.6 L474.9,666.6 L477.2,663.6 L480.2,663.6 L484.4,660.0 L485.8,660.6 L483.7,663.6 L484.3,665.8 L487.2,660.0 L491.0,656.1 L492.2,656.5 L490.8,657.9 L492.4,658.7 L488.7,662.4 L491.8,661.3 L493.5,657.2 L493.3,659.8 L494.7,659.1 L492.4,663.6 L495.6,660.7 L496.3,657.9 L497.1,658.1 L498.4,652.4 L501.6,652.5 L502.9,654.4 L502.4,655.8 L503.7,655.4 L504.9,657.2 L507.9,651.5 L509.8,650.7 L510.5,647.6 L513.6,653.0 L512.9,654.6 L513.6,655.7 L512.1,656.7 L511.1,662.2 L506.8,666.6 L501.2,664.9 L500.7,669.9 L498.1,670.3 L491.6,676.7 L487.0,675.2 L484.7,675.5 L483.7,673.6 L482.0,673.0 L481.5,676.3 L482.7,681.3 L490.1,681.5 L490.8,682.6 L486.7,684.5 L482.6,683.8 L482.6,684.8 L487.0,685.9 L492.6,682.9 L489.7,691.5 L486.7,691.2 L488.7,691.9 L488.2,695.8 L486.5,698.2 L484.0,694.4 L481.9,693.9 L483.6,695.3 L485.3,700.3 L484.4,701.2 L487.5,706.3 L488.3,706.6 L489.4,703.5 L490.7,703.1 L489.2,707.1 L489.5,708.3 L490.2,707.7 L491.2,708.9 L490.6,711.7 L492.2,709.8 L492.8,711.0 L494.5,711.0 L495.2,707.9 L494.3,706.4 L495.9,706.8 L495.6,703.8 L496.9,702.6 L496.3,699.7 L499.0,693.5 L501.1,693.0 L500.9,691.4 L503.8,685.0 L507.3,682.6 L509.8,683.7 L511.0,683.1 L515.6,676.6 L518.5,680.2 L515.9,681.0 L513.7,686.6 L511.3,689.6 L510.7,693.9 L506.1,700.3 L507.6,701.2 L506.9,702.7 L507.8,703.1 L504.3,706.9 L504.6,707.6 L506.2,706.8 L504.6,708.7 L507.3,707.2 L504.3,709.9 L505.4,710.6 L506.9,709.8 L506.2,714.7 L507.6,713.1 L508.0,714.3 L506.5,716.5 L509.0,716.5 L508.7,717.6 L510.4,714.8 L517.2,708.3 L520.7,696.7 L523.0,699.2 L522.5,703.8 L524.5,704.4 L523.4,710.2 L525.5,711.7 Z", "M349.7,314.8 L349.7,313.9 L350.6,314.4 L350.2,315.5 L346.9,316.2 L344.6,318.1 L340.1,317.7 L337.8,311.8 L339.5,312.5 L347.2,308.8 L345.8,315.5 L347.4,314.2 L348.7,315.2 L349.7,314.8 Z", "M253.2,254.0 L253.1,254.8 L255.3,254.3 L254.5,255.6 L248.5,257.7 L248.5,256.6 L250.9,256.6 L248.8,254.7 L249.4,252.8 L253.4,253.2 L253.2,254.0 Z", "M244.5,248.0 L246.8,249.4 L245.9,249.9 L239.0,248.6 L237.0,245.0 L237.8,244.6 L238.1,245.9 L239.9,245.4 L238.5,244.5 L240.3,243.9 L241.5,240.9 L243.3,241.6 L243.0,243.6 L246.8,245.4 L244.5,248.0 Z", "M230.9,230.1 L229.3,231.6 L230.9,232.7 L224.8,232.3 L221.0,230.6 L218.1,227.5 L225.4,229.0 L229.3,228.2 L230.9,230.1 Z", "M237.1,225.6 L228.4,224.8 L228.0,226.3 L226.6,224.9 L223.5,224.8 L223.3,223.4 L230.4,224.1 L223.5,222.6 L225.6,221.9 L224.5,220.0 L229.3,220.5 L233.7,222.4 L234.3,223.4 L232.5,224.5 L239.2,224.5 L237.1,225.6 Z", "M223.7,204.3 L224.5,202.1 L227.1,200.6 L227.4,198.8 L233.4,199.5 L231.1,202.5 L233.0,203.6 L232.4,204.3 L230.3,205.6 L228.6,204.5 L227.7,206.7 L225.2,208.4 L225.9,209.4 L228.5,207.3 L231.9,208.4 L232.3,212.7 L231.1,214.1 L231.8,216.5 L229.6,216.3 L223.1,210.3 L223.7,204.3 Z", "M224.2,173.4 L221.9,174.2 L216.3,173.4 L214.6,171.5 L218.0,169.6 L219.9,166.9 L222.0,166.7 L223.5,168.2 L221.5,168.9 L223.1,169.7 L222.0,170.8 L218.3,171.0 L217.1,172.3 L219.6,171.7 L224.2,173.4 Z", "M216.2,164.1 L218.2,165.7 L218.2,168.4 L213.6,171.1 L210.7,167.8 L210.6,166.2 L212.4,163.9 L213.4,163.7 L213.2,165.9 L214.8,163.7 L216.2,164.1 Z", "M214.6,154.4 L218.0,150.0 L220.4,151.1 L221.5,150.6 L220.6,153.2 L222.9,153.0 L222.1,156.3 L219.8,157.2 L216.9,153.3 L215.4,154.8 L214.6,154.4 Z", "M213.6,152.7 L212.6,153.0 L209.4,150.6 L208.2,151.6 L207.7,150.3 L210.9,146.5 L213.6,146.2 L213.2,148.4 L215.1,148.4 L215.6,150.2 L213.6,152.7 Z", "M141.5,43.6 L145.4,46.2 L144.2,47.7 L139.5,48.9 L137.6,45.7 L138.5,45.0 L139.9,45.8 L139.0,44.3 L140.8,40.1 L142.7,40.6 L143.1,43.2 L141.5,43.6 Z", "M414.9,386.9 L420.3,387.8 L421.0,389.7 L419.1,388.9 L418.7,390.1 L420.2,391.8 L418.8,391.1 L419.2,392.3 L413.0,389.7 L413.3,387.3 L414.9,386.9 Z"];

var S6M_TOWNS = [
  { name:"St. John's", x:522.7, y:709.8 },
  { name:"Gander", x:459.0, y:634.9 },
  { name:"Corner Brook", x:347.1, y:634.2 },
  { name:"Deer Lake", x:364.2, y:621.8 },
  { name:"Stephenville", x:326.2, y:656.1 },
  { name:"Port aux Basques", x:307.3, y:709.2 },
  { name:"Burgeo", x:358.3, y:707.0 },
  { name:"St. Anthony", x:426.6, y:502.8 },
  { name:"Happy Valley-Goose Bay", x:267.4, y:397.3 },
  { name:"Labrador City", x:46.4, y:417.0 },
  { name:"Cartwright", x:378.3, y:375.2 },
  { name:"Hopedale", x:270.8, y:280.5 },
  { name:"Nain", x:221.6, y:220.9 }
];
var S6M_VIEW_TOWNS = {
  full: ["St. John's","Gander","Corner Brook","Deer Lake","Stephenville","Port aux Basques","Burgeo","St. Anthony","Happy Valley-Goose Bay","Labrador City","Cartwright","Hopedale","Nain"],
  island: ["St. John's","Gander","Corner Brook","Deer Lake","Stephenville","Port aux Basques","Burgeo","St. Anthony","Happy Valley-Goose Bay","Labrador City","Cartwright"],
  labrador: ["St. Anthony","Happy Valley-Goose Bay","Labrador City","Cartwright","Hopedale","Nain"]
};
var S6M_VIEWS = {
  full: { vb:"0 0 560 773", w:460, h:635, label:"Full province view" },
  island: { vb:"0 310 560 463", w:540, h:447, label:"Island view (island + southern Labrador)" },
  labrador: { vb:"0 0 470 544", w:470, h:545, label:"Labrador view (Labrador + Northern Peninsula tip)" }
};
var S6M_LOW = {
  full: [
    { x:228, y:691, cd:[-0.55,0.83], wd:[0.92,-0.28], where:"in the Gulf of St. Lawrence, southwest of the island" },
    { x:396, y:751, cd:[-0.83,0.45], wd:[0.95,-0.15], where:"over the Atlantic south of the island" },
    { x:416, y:634, cd:[-0.72,0.62], wd:[0.93,-0.25], where:"over central Newfoundland" },
    { x:245, y:332, cd:[-0.60,0.75], wd:[0.90,-0.30], where:"over Labrador" },
    { x:540, y:670, cd:[-0.94,0.28], wd:[0.25,-0.95], where:"over the Atlantic east of the Avalon Peninsula" }
  ],
  island: [
    { x:228, y:691, cd:[-0.55,0.83], wd:[0.92,-0.28], where:"in the Gulf of St. Lawrence, southwest of the island" },
    { x:396, y:751, cd:[-0.83,0.45], wd:[0.95,-0.15], where:"over the Atlantic south of the island" },
    { x:416, y:634, cd:[-0.72,0.62], wd:[0.93,-0.25], where:"over central Newfoundland" },
    { x:245, y:332, cd:[-0.60,0.75], wd:[0.90,-0.30], where:"over Labrador" },
    { x:540, y:670, cd:[-0.94,0.28], wd:[0.25,-0.95], where:"over the Atlantic east of the Avalon Peninsula" }
  ],
  labrador: [
    { x:245, y:332, cd:[-0.60,0.75], wd:[0.90,-0.30], where:"over Labrador" },
    { x:362, y:251, cd:[-0.75,0.65], wd:[0.85,-0.40], where:"over the Labrador Sea, east of the Labrador coast" },
    { x:60, y:360, cd:[0.55,0.80], wd:[0.95,-0.20], where:"over Quebec, west of Labrador" },
    { x:128, y:60, cd:[0.30,0.95], wd:[0.95,0.30], where:"over Hudson Strait, north of Labrador" },
    { x:352, y:506, cd:[-0.70,0.70], wd:[0.90,-0.35], where:"in the Strait of Belle Isle area, at Labrador's south coast" }
  ]
};
var S6M_HIGH = {
  full: [
    { x:211, y:305, where:"over Labrador" },
    { x:520, y:495, where:"over the Atlantic east of the province" },
    { x:396, y:615, where:"over the island" }
  ],
  island: [
    { x:211, y:330, where:"over southern Labrador" },
    { x:520, y:495, where:"over the Atlantic east of the province" },
    { x:396, y:615, where:"over the island" }
  ],
  labrador: [
    { x:211, y:305, where:"over Labrador" },
    { x:77, y:169, where:"over northern Quebec" },
    { x:430, y:180, where:"over the Labrador Sea" }
  ]
};
function s6mf1(x){return Math.round(x*10)/10;}
function s6mtxt(x,y,s,size,bold,anchor,fill){return '<text x="'+s6mf1(x)+'" y="'+s6mf1(y)+'" font-size="'+(size||13)+'" fill="'+(fill||S6M_INK)+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+s+'</text>';}
function s6mpcode(p){var t=Math.round(p*10)%1000;return ("00"+t).slice(-3);}
function s6mpdecode(c){var n=parseInt(c,10);return (n<500?1000+n/10:900+n/10);}
function s6mcompass(deg){return S6M_COMPASS[Math.round(((deg%360)+360)%360/45)%8];}
function s6mdegFor(dir){return S6M_COMPASS.indexOf(dir)*45;}
function s6mwindBarb(x,y,fromDeg,kt){
  var a=(fromDeg-90)*Math.PI/180, dx=Math.cos(a), dy=Math.sin(a), L=30;
  var ex=x+dx*L, ey=y+dy*L, out="";
  out+='<line x1="'+s6mf1(x)+'" y1="'+s6mf1(y)+'" x2="'+s6mf1(ex)+'" y2="'+s6mf1(ey)+'" stroke="'+S6M_INK+'" stroke-width="1.8"/>';
  var rem=kt, px=ex, py=ey, bx=-dy, by=dx;
  function barb(len,frac){var s='<line x1="'+s6mf1(px)+'" y1="'+s6mf1(py)+'" x2="'+s6mf1(px+(dx*0.45+bx*0.89)*len)+'" y2="'+s6mf1(py+(dy*0.45+by*0.89)*len)+'" stroke="'+S6M_INK+'" stroke-width="1.8"/>';px-=dx*5*frac;py-=dy*5*frac;return s;}
  while(rem>=50){out+='<polygon points="'+s6mf1(px)+','+s6mf1(py)+' '+s6mf1(px-dx*12+bx*9)+','+s6mf1(py-dy*12+by*9)+' '+s6mf1(px-dx*12)+','+s6mf1(py-dy*12)+'" fill="'+S6M_INK+'"/>';px-=dx*13;py-=dy*13;rem-=50;}
  while(rem>=10){out+=barb(11,1);rem-=10;}
  if(rem>=5){out+=barb(6,0.7);}
  return out;
}
function s6mcross(ax,ay,bx,by){return ax*by-ay*bx;}
function s6mdistToSeg(px,py,x1,y1,x2,y2){
  var dx=x2-x1, dy=y2-y1, L2=dx*dx+dy*dy;
  var t=L2?Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/L2)):0;
  return Math.hypot(px-(x1+t*dx), py-(y1+t*dy));
}
function s6mfrontSVG(pts, kind){
  var col = kind==="cold"?S6M_BLUE:S6M_RED;
  var d="M"+pts.map(function(p){return s6mf1(p[0])+","+s6mf1(p[1]);}).join(" L");
  var out='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2.6"/>';
  for(var i=0;i<pts.length-1;i++){
    var p=pts[i], q=pts[i+1], dx=q[0]-p[0], dy=q[1]-p[1], len=Math.hypot(dx,dy), ux=dx/len, uy=dy/len;
    var nx=uy, ny=-ux; /* movement side for the rolled front directions */
    var steps=Math.max(1,Math.floor(len/54));
    for(var s2=1;s2<=steps;s2++){
      var cx=p[0]+dx*s2/(steps+0.5), cy=p[1]+dy*s2/(steps+0.5);
      if(kind==="cold"){
        out+='<polygon points="'+s6mf1(cx-ux*8)+','+s6mf1(cy-uy*8)+' '+s6mf1(cx+nx*13)+','+s6mf1(cy+ny*13)+' '+s6mf1(cx+ux*8)+','+s6mf1(cy+uy*8)+'" fill="'+S6M_BLUE+'"/>';
      } else {
        var mx=cx+nx*4.5, my=cy+ny*4.5;
        out+='<path d="M'+s6mf1(mx-ux*8)+','+s6mf1(my-uy*8)+' A 8.5 8.5 0 0 1 '+s6mf1(mx+ux*8)+','+s6mf1(my+uy*8)+' Z" fill="'+S6M_RED+'"/>';
      }
    }
  }
  return out;
}
function s6misobars(cx,cy,spacing,p0,letter,col){
  var out="";
  for(var k=1;k<=4;k++){
    out+='<ellipse cx="'+s6mf1(cx)+'" cy="'+s6mf1(cy)+'" rx="'+s6mf1(spacing*k*1.55)+'" ry="'+s6mf1(spacing*k*1.12)+'" fill="none" stroke="'+S6M_ISO+'" stroke-width="1.3"/>';
  }
  out+='<circle cx="'+s6mf1(cx)+'" cy="'+s6mf1(cy)+'" r="3.2" fill="'+col+'"/>';
  out+=s6mtxt(cx,cy-16,letter,21,true,"middle",col);
  out+=s6mtxt(cx,cy+30,String(Math.round(p0)),12,false,"middle",col);
  return out;
}
function s6mstationSVG(t){
  var d=t.d, out="";
  out+=s6mwindBarb(t.x, t.y, s6mdegFor(d.windFrom), d.kt);
  out+='<circle cx="'+s6mf1(t.x)+'" cy="'+s6mf1(t.y)+'" r="7" fill="#fff" stroke="'+S6M_INK+'" stroke-width="1.8"/>';
  if(d.fill>=4) out+='<circle cx="'+s6mf1(t.x)+'" cy="'+s6mf1(t.y)+'" r="6.2" fill="'+S6M_INK+'"/>';
  else if(d.fill===3) out+='<path d="M'+s6mf1(t.x)+','+s6mf1(t.y-6.2)+' A 6.2 6.2 0 0 1 '+s6mf1(t.x)+','+s6mf1(t.y+6.2)+' Z" fill="'+S6M_INK+'"/>';
  else if(d.fill===1) out+='<path d="M'+s6mf1(t.x)+','+s6mf1(t.y-6.2)+' A 6.2 6.2 0 0 1 '+s6mf1(t.x)+','+s6mf1(t.y+6.2)+' L'+s6mf1(t.x)+','+s6mf1(t.y)+' Z" fill="'+S6M_INK+'" opacity="0.55"/>';
  out+=s6mtxt(t.x-16, t.y-13, String(d.T), 13, true, "middle");
  out+=s6mtxt(t.x-16, t.y+15, String(d.Td), 13, false, "middle");
  out+=s6mtxt(t.x+19, t.y-13, s6mpcode(d.P), 12, false, "middle");
  out+=s6mtxt(t.x+(t.name==="Deer Lake"?-4:0), t.y+(t.name==="Deer Lake"?-30:29), t.name, t.name.length>14?10:11.5, true, "middle");
  return out;
}
function s6mfrontPts(cx,cy,dir,len,bend){
  var mx=cx+dir[0]*len*0.52, my=cy+dir[1]*len*0.52;
  var nx=dir[1], ny=-dir[0];
  return [[cx,cy],[mx+nx*bend, my+ny*bend],[cx+dir[0]*len, cy+dir[1]*len]];
}
function s6mScenario(family, view){
  var sc={family:family, view:view, W:560, H:773};
  var spot, i;
  if(family==="high"){
    spot=s6mpick(S6M_HIGH[view]);
    sc.high={x:spot.x+s6mri(-15,15), y:spot.y+s6mri(-12,12), p:s6mri(1026,1038), where:spot.where};
    sc.spacingHigh=s6mpick([30,36]);
  } else {
    spot=s6mpick(S6M_LOW[view]);
    sc.low={x:spot.x+s6mri(-14,14), y:spot.y+s6mri(-12,12), p:s6mri(984,1000), where:spot.where};
    sc.spacingLow=s6mpick([15,17,26]);
    sc.coldPts=s6mfrontPts(sc.low.x, sc.low.y, spot.cd, s6mri(240,290), s6mri(-14,14));
    if(family==="cyclone") sc.warmPts=s6mfrontPts(sc.low.x, sc.low.y, spot.wd, s6mri(210,260), s6mri(-12,12));
    sc.cd=spot.cd; sc.wd=spot.wd;
  }
  /* Derive each community's role from the geometry. */
  sc.towns=S6M_TOWNS.filter(function(t){ return S6M_VIEW_TOWNS[view].indexOf(t.name)>=0; }).map(function(t){
    var o={name:t.name, x:t.x, y:t.y};
    var ctr=sc.low||sc.high, rel=[t.x-ctr.x, t.y-ctr.y], dist=Math.hypot(rel[0],rel[1]);
    o.dist=dist;
    if(sc.high){
      o.role = dist<190 ? "highNear" : "highEdge";
    } else {
      var sCold=s6mcross(sc.cd[0],sc.cd[1],rel[0],rel[1]);
      var sWarm=sc.warmPts?s6mcross(sc.wd[0],sc.wd[1],rel[0],rel[1]):1;
      var dColdLine=Math.min(s6mdistToSeg(t.x,t.y,sc.coldPts[0][0],sc.coldPts[0][1],sc.coldPts[1][0],sc.coldPts[1][1]), s6mdistToSeg(t.x,t.y,sc.coldPts[1][0],sc.coldPts[1][1],sc.coldPts[2][0],sc.coldPts[2][1]));
      var dWarmLine=sc.warmPts?Math.min(s6mdistToSeg(t.x,t.y,sc.warmPts[0][0],sc.warmPts[0][1],sc.warmPts[1][0],sc.warmPts[1][1]), s6mdistToSeg(t.x,t.y,sc.warmPts[1][0],sc.warmPts[1][1],sc.warmPts[2][0],sc.warmPts[2][1])):9999;
      o.dColdLine=dColdLine; o.dWarmLine=dWarmLine;
      if(dist>380) o.role = rel[1]<0 ? "coldFar" : "fairFar";
      else if(sCold>0) o.role = dist>230 ? "behindColdFar" : "behindCold";
      else if(sc.warmPts && sWarm<0) o.role = dWarmLine<95 ? "aheadWarm" : "coldSide";
      else o.role = dColdLine<70 ? "warmSectorWet" : "warmSector";
    }
    return o;
  });
  /* Weather per role: the consistency rules live here. */
  sc.towns.forEach(function(t){
    var d={};
    switch(t.role){
      case "behindCold": d={T:s6mri(0,6), windFrom:s6mpick(["NW","NW","W"]), kt:s6mpick([20,25,30]), fill:1, precip:false, trend:"rising"}; d.Td=d.T-s6mri(3,7); break;
      case "behindColdFar": d={T:s6mri(-2,5), windFrom:s6mpick(["NW","W"]), kt:s6mpick([10,15,20]), fill:1, precip:false, trend:"rising"}; d.Td=d.T-s6mri(4,8); break;
      case "warmSector": d={T:s6mri(13,20), windFrom:s6mpick(["S","SW"]), kt:s6mpick([10,15,20]), fill:3, precip:false, trend:"falling"}; d.Td=d.T-s6mri(1,3); break;
      case "warmSectorWet": d={T:s6mri(13,19), windFrom:s6mpick(["S","SW"]), kt:s6mpick([15,20,25]), fill:4, precip:true, trend:"falling"}; d.Td=d.T-s6mri(0,1); break;
      case "aheadWarm": d={T:s6mri(5,10), windFrom:s6mpick(["E","SE"]), kt:s6mpick([10,15,20]), fill:4, precip:true, trend:"falling"}; d.Td=d.T-s6mri(0,1); break;
      case "coldSide": d={T:s6mri(2,8), windFrom:s6mpick(["NE","E"]), kt:s6mpick([10,15]), fill:2, precip:false, trend:"falling slowly"}; d.Td=d.T-s6mri(2,4); break;
      case "coldFar": d={T:s6mri(-4,3), windFrom:s6mpick(["N","NW"]), kt:s6mpick([5,10,15]), fill:1, precip:false, trend:"steady"}; d.Td=d.T-s6mri(3,7); break;
      case "fairFar": d={T:s6mri(10,17), windFrom:s6mpick(["S","SW","W"]), kt:s6mpick([5,10]), fill:1, precip:false, trend:"steady"}; d.Td=d.T-s6mri(3,6); break;
      case "highNear": d={T:s6mri(7,16), windFrom:s6mpick(["N","NE","E","W"]), kt:s6mpick([0,5,5,10]), fill:0, precip:false, trend:"steady"}; d.Td=d.T-s6mri(4,9); break;
      case "highEdge": d={T:s6mri(5,14), windFrom:s6mpick(["NE","E","SE"]), kt:s6mpick([5,10]), fill:1, precip:false, trend:"steady"}; d.Td=d.T-s6mri(3,8); break;
    }
    var ctr=sc.low||sc.high;
    var base=sc.low? sc.low.p + t.dist/9 : sc.high.p - t.dist/11;
    if(sc.spacingLow===15 && sc.low && t.dist<140) d.kt=Math.min(45, d.kt+5);
    d.P=Math.round(base*10)/10;
    t.d=d;
  });
  return sc;
}
function s6mMapSVG(sc, showNames){
  var V=S6M_VIEWS[sc.view];
  var out='<svg viewBox="'+V.vb+'" width="'+V.w+'" height="'+V.h+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Generated weather map of Newfoundland and Labrador">';
  out+='<rect x="1" y="1" width="'+(sc.W-2)+'" height="'+(sc.H-2)+'" fill="#eef4f9" stroke="'+S6M_ISO+'" stroke-width="1.5"/>';
  S6M_PATHS.forEach(function(d){ out+='<path d="'+d+'" fill="'+S6M_LAND+'" stroke="'+S6M_INK+'" stroke-width="1.6"/>'; });
  if(sc.view==="labrador"){
    out+=s6mtxt(396,169,"LABRADOR SEA",12,false,"middle",S6M_ISO);
    out+=s6mtxt(446,24,"N",13,true,"middle",S6M_INK);
    out+='<polygon points="446,32 441,46 451,46" fill="'+S6M_INK+'"/>';
  } else if(sc.view==="island"){
    out+=s6mtxt(512,459,"ATLANTIC OCEAN",12,false,"middle",S6M_ISO);
    out+=s6mtxt(118,729,"Gulf of St. Lawrence",10.5,false,"middle",S6M_ISO);
    out+=s6mtxt(540,334,"N",13,true,"middle",S6M_INK);
    out+='<polygon points="540,342 535,356 545,356" fill="'+S6M_INK+'"/>';
  } else {
    out+=s6mtxt(512,459,"ATLANTIC OCEAN",12,false,"middle",S6M_ISO);
    out+=s6mtxt(396,169,"LABRADOR SEA",12,false,"middle",S6M_ISO);
    out+=s6mtxt(118,729,"Gulf of St. Lawrence",10.5,false,"middle",S6M_ISO);
    out+=s6mtxt(540,24,"N",13,true,"middle",S6M_INK);
    out+='<polygon points="540,32 535,46 545,46" fill="'+S6M_INK+'"/>';
  }
  if(sc.low){
    out+=s6misobars(sc.low.x, sc.low.y, sc.spacingLow, sc.low.p, "L", S6M_RED);
    out+=s6mfrontSVG(sc.coldPts, "cold");
    if(sc.warmPts) out+=s6mfrontSVG(sc.warmPts, "warm");
  }
  if(sc.high) out+=s6misobars(sc.high.x, sc.high.y, sc.spacingHigh, sc.high.p, "H", S6M_BLUE);
  sc.towns.forEach(function(t){ if(showNames.indexOf(t.name)>=0) out+=s6mstationSVG(t); });
  return out+"</svg>";
}
function s6mnumDist(key, cands, suffix){
  var seen={}; seen[key]=1; var out=[];
  var pool=s6mshuf(cands);
  for(var i=0;i<pool.length && out.length<3;i++){ if(!seen[pool[i]]){ seen[pool[i]]=1; out.push(String(pool[i])+suffix); } }
  var bump=3;
  while(out.length<3){ var v=key+bump; if(!seen[v]){ seen[v]=1; out.push(String(v)+suffix); } bump+=2; }
  return out;
}
function s6mbyRole(sc, roles){ return sc.towns.filter(function(t){ return roles.indexOf(t.role)>=0; }); }
function s6mothers(list, not, n){ return s6mshuf(list.filter(function(t){ return t!==not; })).slice(0, n||3); }
function s6mMakeQ(sc, type){
  if(type==="read"){
    var st=s6mpick(sc.towns);
    var field=s6mpick(["dewpoint","temperature","wind direction","pressure"]);
    if(field==="dewpoint") return s6mQ("What is the dewpoint at "+st.name+"?", String(st.d.Td)+" °C",
      s6mnumDist(st.d.Td, [st.d.T, st.d.Td+4, st.d.Td-5, st.d.Td+2, st.d.Td-3], " °C"),
      "The dewpoint is plotted at the lower left of the station circle. "+st.name+" shows "+st.d.Td+" °C there; its temperature, "+st.d.T+" °C, sits at the upper left.", [st.name]);
    if(field==="temperature") return s6mQ("What is the temperature at "+st.name+"?", String(st.d.T)+" °C",
      s6mnumDist(st.d.T, [st.d.Td, st.d.T+5, st.d.T-6, st.d.T+3, st.d.T-4], " °C"),
      "The temperature is plotted at the upper left of the station circle: "+st.d.T+" °C at "+st.name+".", [st.name]);
    if(field==="wind direction") return s6mQ("From which direction is the wind blowing at "+st.name+"?", st.d.windFrom,
      S6M_COMPASS.filter(function(c){return c!==st.d.windFrom;}).slice(0,3),
      "The wind shaft at "+st.name+" points out along the direction the wind comes FROM, and its barbs total "+st.d.kt+" knots from the "+st.d.windFrom+".", [st.name]);
    return s6mQ("The coded pressure plotted at "+st.name+" reads "+s6mpcode(st.d.P)+". What is the actual pressure there?", String(st.d.P.toFixed(1))+" hPa",
      [String((st.d.P+10).toFixed(1))+" hPa", String((st.d.P-10).toFixed(1))+" hPa", String((st.d.P+100).toFixed(1))+" hPa"],
      "Codes of 500 and above take a leading 9 and codes below 500 take a leading 10, with the decimal before the last digit: "+s6mpcode(st.d.P)+" decodes to "+st.d.P.toFixed(1)+" hPa.", [st.name]);
  }
  if(type==="front"){
    if(!sc.low) return s6mMakeQ(sc, "sector");
    if(sc.warmPts) return s6mQ("Two fronts are drawn from the low "+sc.low.where+". The front whose line carries semicircle symbols is what type of front, and toward which side is it moving?",
      "A warm front, moving toward the side the semicircles are on",
      ["A cold front, moving toward the side the semicircles are on","A warm front, moving away from the side the semicircles are on","A cold front, moving toward the side the triangles are on"],
      "Semicircles mark a warm front, triangles a cold front. Front symbols always sit on the side toward which the front is advancing, so the warm front is moving toward its semicircle side, overrunning the cooler air there.", []);
    return s6mQ("The front trailing from the low "+sc.low.where+" carries triangle symbols on its line. What type of front is it?",
      "A cold front",
      ["A warm front","An occluded front","A stationary front"],
      "Triangles are the cold-front symbol (semicircles mark warm fronts). The triangles point toward the warmer air the front is advancing into.", []);
  }
  if(type==="predict"){
    if(sc.family==="high"){
      var h=s6mpick(s6mbyRole(sc,["highNear","highEdge"]));
      return s6mQ(h.name+" is under the high-pressure system "+sc.high.where+". What weather should it expect over the next day?",
        "Continued fair, settled weather with light winds",
        ["Heavy rain as a cold front moves in","Rapidly falling pressure and strengthening winds","Showers as warm, moist air is lifted over the town"],
        h.name+" plots light winds ("+h.d.kt+" knots), a large temperature-dewpoint spread and a clear station circle. High pressure means sinking air, which suppresses cloud and rain, and the wide isobar spacing keeps winds light.", [h.name]);
    }
    var ahead=s6mbyRole(sc,["aheadWarm"]);
    if(sc.family==="cyclone" && ahead.length){
      var aw=s6mpick(ahead);
      return s6mQ(aw.name+" is in the cool air north of the warm front, and the front is advancing toward it. What change should "+aw.name+" expect as the warm front passes?",
        "Temperatures rise and winds shift to come from the south or southwest, with the steady rain ending",
        ["Temperatures fall sharply and winds shift to the northwest","Pressure rises quickly and skies clear within the hour","The rain changes to a long period of heavy snow"],
        aw.name+" currently plots "+aw.d.T+" °C with winds from the "+aw.d.windFrom+" and steady rain ahead of the front. Behind a warm front a town sits in the warm sector: warmer air, southerly winds, and the steady frontal rain gives way to the warm sector's milder, damper pattern.", [aw.name]);
    }
    var warm=s6mbyRole(sc,["warmSector","warmSectorWet"]);
    var target=warm.length?s6mpick(warm):s6mpick(sc.towns);
    return s6mQ("The cold front is advancing toward "+target.name+", which is still in the warm air ahead of it (plotted "+target.d.T+" °C, wind from the "+target.d.windFrom+"). What change should "+target.name+" expect when the front passes?",
      "A drop in temperature, a band of showers, and winds shifting to the northwest",
      ["A rise in temperature and winds shifting to the southeast","Fog forming as the pressure rises steadily","Several days of gentle, steady rain"],
      "Cold-front passage replaces warm-sector air with the post-frontal pattern: colder and drier air, a wind shift to the northwest, rising pressure and clearing skies, the pattern the communities behind the front are already plotting.", [target.name]);
  }
  if(type==="precip"){
    var wet=s6mbyRole(sc,["warmSectorWet","aheadWarm"]);
    var dry=sc.towns.filter(function(t){return !t.d.precip;});
    if(wet.length && dry.length>=3){
      var w=s6mpick(wet);
      return s6mQ("Which community is most likely receiving precipitation right now?",
        w.name, s6mothers(dry, w).map(function(t){return t.name;}),
        w.name+" sits in a frontal precipitation zone on this map (ahead of the warm front or in the cold-frontal band), plotting a temperature of "+w.d.T+" °C with a dewpoint of "+w.d.Td+" °C, nearly saturated, and an overcast station circle. The other communities sit in dry sectors.", [w.name].concat(s6mothers(dry, w).map(function(t){return t.name;})));
    }
    var near=sc.towns.reduce(function(a,b){return (a.d.T-a.d.Td)<(b.d.T-b.d.Td)?a:b;});
    return s6mQ("At which community is the air closest to saturation?",
      near.name, s6mothers(sc.towns, near).map(function(t){return t.name;}),
      "Saturation is nearest where the temperature-dewpoint spread is smallest. At "+near.name+" the spread is only "+(near.d.T-near.d.Td)+" °C ("+near.d.T+" °C and "+near.d.Td+" °C), the smallest on the map.", [near.name].concat(s6mothers(sc.towns, near).map(function(t){return t.name;})));
  }
  if(type==="first"){
    if(!sc.low || sc.family==="high") return s6mMakeQ(sc, "sector");
    var cand=s6mbyRole(sc,["warmSector","warmSectorWet"]).filter(function(t){return !t.d.precip;});
    if(cand.length<1) cand=s6mbyRole(sc,["warmSector"]);
    if(cand.length<1) return s6mMakeQ(sc, "precip");
    var first=cand.reduce(function(a,b){return a.dColdLine<b.dColdLine?a:b;});
    var ds=sc.towns.filter(function(t){return t!==first;});
    return s6mQ("The whole system is moving toward the northeast, carrying the cold front with it. Which community will the cold front reach first?",
      first.name, s6mothers(ds, first).map(function(t){return t.name;}),
      first.name+" is the warm-side community closest to the cold front line (about "+Math.round(first.dColdLine*2)+" km at this map's scale), still ahead of the front with a temperature of "+first.d.T+" °C. The front sweeps over it before reaching the communities farther east and north.", [first.name].concat(s6mothers(ds, first).map(function(t){return t.name;})));
  }
  if(type==="wind"){
    if(sc.family==="high"){
      return s6mQ("Why are the winds so light at every community on this map?",
        "The s6misobars around the high are widely spaced, so pressure changes only gradually from place to place",
        ["High-pressure systems never produce any wind","Every community is exactly at the centre of the high","A cold front has cancelled out the wind"],
        "Wind strength follows the pressure gradient: closely spaced s6misobars mean strong winds, and the wide spacing drawn around this high means a gentle gradient and light winds everywhere.", []);
    }
    var strongest=sc.towns.reduce(function(a,b){return a.d.kt>b.d.kt?a:(b.d.kt>a.d.kt?b:(a.dist<b.dist?a:b));});
    return s6mQ("Which community should be experiencing the strongest winds?",
      strongest.name, s6mothers(sc.towns, strongest).map(function(t){return t.name;}),
      "The s6misobars are packed most tightly near the low centre, and "+strongest.name+" plots the strongest barbs on the map at "+strongest.d.kt+" knots. Wind strength falls off with distance from the centre and with wider isobar spacing.", [strongest.name].concat(s6mothers(sc.towns, strongest).map(function(t){return t.name;})));
  }
  /* sector */
  if(sc.family==="cyclone"){
    var ws=s6mbyRole(sc,["warmSector","warmSectorWet"]);
    if(ws.length){
      var w2=s6mpick(ws);
      return s6mQ(w2.name+" lies between the cold front to its west and the warm front to its north, plotting "+w2.d.T+" °C with a dewpoint of "+w2.d.Td+" °C and winds from the "+w2.d.windFrom+". What region is "+w2.name+" in?",
        "The warm sector of the low",
        ["The cold air mass behind the cold front","The centre of a high-pressure system","The region of sinking air north of the warm front"],
        "The warm sector is the wedge of warm air between the cold front and the warm front. "+w2.name+"'s warm temperature, near-saturated dewpoint and southerly winds are the warm sector's signature on a station model.", [w2.name]);
    }
  }
  if(sc.family==="high"){
    return s6mQ("At the surface, air moves around this high-pressure centre in which pattern (Northern Hemisphere)?",
      "Clockwise and slightly outward from the centre",
      ["Counterclockwise and slightly inward toward the centre","Straight out from the centre in all directions at once","Clockwise and slightly inward toward the centre"],
      "Surface air spirals clockwise and outward around a Northern Hemisphere high; a low does the opposite (counterclockwise and inward). The station wind shafts plotted around this high follow the clockwise, outward pattern.", []);
  }
  var behind=s6mbyRole(sc,["behindCold","behindColdFar"]);
  var bt=behind.length?s6mpick(behind):s6mpick(sc.towns);
  return s6mQ(bt.name+" plots "+bt.d.T+" °C, a dewpoint of "+bt.d.Td+" °C, winds from the "+bt.d.windFrom+" and rising pressure. Which statement best explains its weather?",
    "The cold front has already passed "+bt.name+", leaving colder, drier air behind it",
    ["A warm front is about to pass "+bt.name, bt.name+" is in the warm sector of the low", bt.name+" is under the centre of the high"],
    bt.name+" sits behind the cold front on the map. Cold temperature, low dewpoint, northwest winds and rising pressure are the classic post-frontal pattern.", [bt.name]);
}
/* ---------- bank-side RNG and question plumbing ---------- */
function s6mri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function s6mrf(a, b) { return a + Math.random() * (b - a); }
function s6mpick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function s6mshuf(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function s6mQ(prompt, correct, distractors, why, towns) { return { prompt: prompt, correct: correct, distractors: distractors, why: why, towns: towns || [] }; }
function s6mShowNames(sc, named) {
  var show = named.slice();
  var fill = s6mshuf(sc.towns.map(function (t) { return t.name; }).filter(function (n) { return show.indexOf(n) < 0; }));
  while (show.length < 6 && fill.length) show.push(fill.pop());
  return show;
}
function s6mBuildQ(sc, spec) {
  var q = mcq(spec.prompt, spec.correct, spec.distractors, spec.why, {});
  q.figure = s6mMapSVG(sc, s6mShowNames(sc, spec.towns));
  return q;
}
var S6M_VIEWPOOL = ["island", "island", "labrador", "labrador", "full"];
function s6mDraw(families, types) {
  var sc = s6mScenario(s6mpick(families), s6mpick(S6M_VIEWPOOL));
  return s6mBuildQ(sc, s6mMakeQ(sc, s6mpick(types)));
}
function s6mFindScenario(fam, view, groups) {
  var sc = null;
  for (var i = 0; i < 80; i++) {
    sc = s6mScenario(fam, view);
    var okAll = true;
    for (var j = 0; j < groups.length; j++) if (!s6mbyRole(sc, groups[j]).length) { okAll = false; break; }
    if (okAll) return sc;
  }
  return sc;
}
function s6mSkyText(d) {
  if (d.fill >= 4) return " Its station circle is completely filled in: overcast.";
  if (d.fill === 0) return " Its station circle is open: a clear sky.";
  return "";
}
function s6mDescribe(t) {
  return t.name + " plots a temperature of " + t.d.T + " °C and a dewpoint of " + t.d.Td + " °C (a spread of " + (t.d.T - t.d.Td) + " °C), with wind from the " + t.d.windFrom + " at " + t.d.kt + " knots." + s6mSkyText(t.d);
}
function s6mInterp(t) {
  var s = "";
  if (t.d.precip) s += "Its temperature and dewpoint are nearly equal under a filled-in circle, the signature of precipitation falling now. ";
  switch (t.role) {
    case "warmSector": case "warmSectorWet": s += "It sits in the warm sector, in the warm, moist air between the fronts."; break;
    case "behindCold": case "behindColdFar": s += "The cold front has already passed it: colder, drier air behind the front, with northwest winds and rising pressure."; break;
    case "aheadWarm": s += "It is in the cool air ahead of the warm front, where warm air sliding up over it brings steady precipitation."; break;
    case "coldSide": s += "It sits on the cold side of the system, in cooler air away from the fronts."; break;
    case "highNear": case "highEdge": s += "Under the high, the wide temperature-dewpoint spread, light wind and open circle are the fair-weather pattern: sinking air and no precipitation."; break;
    default: s += "Its plot matches its position relative to the system drawn on the map.";
  }
  return s;
}


/* ---------- Selected response: synoptic map items ---------- */

E("sci-u1-map-read", 1, ["SC10.6.5"], 1, "gen", function () {
  return s6mDraw(["cyclone", "coldonly", "high"], ["read"]);
}, ["Temperature is plotted at the upper left of the station circle, dewpoint at the lower left and the coded pressure at the upper right. The wind shaft points out along the direction the wind comes FROM, and the barbs add up to its speed."]);

E("sci-u1-map-fronts", 1, ["SC10.6.4"], 2, "gen", function () {
  return s6mDraw(["cyclone", "coldonly"], ["front", "sector"]);
}, ["Triangles on a front line mark a cold front and semicircles mark a warm front; the symbols always sit on the side toward which the front is moving."]);

E("sci-u1-map-conditions", 1, ["SC10.6.5"], 2, "gen", function () {
  return s6mDraw(["cyclone", "coldonly", "high"], ["precip", "wind", "first"]);
}, ["Compare the station plots. Precipitation goes with a filled-in circle and a temperature almost equal to the dewpoint; wind strength is read from the barbs, and the tightest isobars sit near the low centre."]);

E("sci-u1-map-predict", 1, ["SC10.6.4", "SC10.6.5"], 3, "gen", function () {
  return s6mDraw(["cyclone", "coldonly", "high"], ["predict"]);
}, ["First work out which side of the front the community is on now. Then picture the air mass that replaces its air as the front passes, and what that does to its temperature, wind and sky."]);

/* ---------- Constructed response: the two held library map types ---------- */

function s6mDescribeDraw(view) {
  var sc = s6mFindScenario("cyclone", view, [["warmSector", "warmSectorWet"], ["behindCold", "behindColdFar"]]);
  var a = s6mpick(s6mbyRole(sc, ["warmSector", "warmSectorWet"]));
  var b = s6mpick(s6mbyRole(sc, ["behindCold", "behindColdFar"]));
  var region = view === "labrador" ? "Labrador" : "the island of Newfoundland and southern Labrador";
  var q = textq("The weather map shows a low-pressure system " + sc.low.where + ", with its fronts drawn across " + region + ". (a) Describe the weather being experienced now at " + a.name + ". Give its plotted temperature and dewpoint, its wind direction and speed, and what the map shows about its sky and precipitation. (2)\n(b) Do the same for " + b.name + ". (2)",
    [a.name + " is in the warm sector and " + b.name + " is behind the cold front; the two station plots differ in temperature, dewpoint spread, wind direction and sky cover"],
    "<b>Model answer:</b> (a) " + s6mDescribe(a) + " " + s6mInterp(a) + " (b) " + s6mDescribe(b) + " " + s6mInterp(b) + "<br><br><b>Marking points:</b> For each community: 1 mark for the plotted values read correctly (temperature, dewpoint, wind direction and speed). 1 mark for the interpretation tied to its position on the map (warm sector or behind the cold front, with the sky and precipitation state that follows).", {});
  q.figure = s6mMapSVG(sc, s6mShowNames(sc, [a.name, b.name]));
  return q;
}
function s6mDescribeHighDraw() {
  var sc = s6mScenario("high", "full");
  var near = s6mbyRole(sc, ["highNear"]);
  var a = near.length ? s6mpick(near) : sc.towns[0];
  var rest = sc.towns.filter(function (t) { return t !== a; });
  var b = s6mpick(rest);
  var q = textq("The weather map shows a high-pressure system " + sc.high.where + ", covering the whole province. (a) Describe the weather being experienced now at " + a.name + ". Give its plotted temperature and dewpoint, its wind direction and speed, and what the map shows about its sky and precipitation. (2)\n(b) Do the same for " + b.name + ". (2)",
    ["Both communities are under the high: light winds, wide temperature-dewpoint spreads, open station circles and no precipitation"],
    "<b>Model answer:</b> (a) " + s6mDescribe(a) + " " + s6mInterp(a) + " (b) " + s6mDescribe(b) + " " + s6mInterp(b) + "<br><br><b>Marking points:</b> For each community: 1 mark for the plotted values read correctly (temperature, dewpoint, wind direction and speed). 1 mark for the fair-weather interpretation tied to the high (sinking air, wide spread, light wind, no precipitation).", {});
  q.figure = s6mMapSVG(sc, s6mShowNames(sc, [a.name, b.name]));
  return q;
}

E("sci-u1-cr-mapdescribe", 1, ["SC10.6.5", "SC10.6.4"], 2, "var", varset([
  function () { return s6mDescribeDraw("island"); },
  function () { return s6mDescribeDraw("labrador"); },
  function () { return s6mDescribeHighDraw(); }
]));

function s6mAirmassDraw(view) {
  var sc = s6mFindScenario("cyclone", view, [["warmSector", "warmSectorWet"], ["behindCold", "behindColdFar"]]);
  var w = s6mpick(s6mbyRole(sc, ["warmSector", "warmSectorWet"]));
  var c = s6mpick(s6mbyRole(sc, ["behindCold", "behindColdFar"]));
  var q = textq("The weather map shows a low-pressure system " + sc.low.where + ", with its fronts drawn across the province. (a) Which air mass is affecting " + w.name + " now? Give two pieces of evidence from its station plot. (2)\n(b) Which air mass is affecting " + c.name + " now? (1)",
    ["Maritime Tropical (mT) air over " + w.name + "; Continental Polar (cP) air over " + c.name],
    "<b>Model answer:</b> (a) Maritime Tropical (mT). " + w.name + " plots a warm temperature of " + w.d.T + " °C with a dewpoint of " + w.d.Td + " °C close behind it, so the air is warm and moist, and its wind from the " + w.d.windFrom + " is bringing that air up from the warm Atlantic to the south: a maritime, tropical source. (b) Continental Polar (cP). " + c.name + " plots a cold temperature of " + c.d.T + " °C with a dewpoint of only " + c.d.Td + " °C, so the air is cold and dry, and its northwest wind is bringing it off the land interior: a continental, polar source.<br><br><b>Marking points:</b> 1 mark for Maritime Tropical (mT) over " + w.name + ". 1 mark for two evidence points from its plot (warm temperature, high dewpoint or small spread, southerly wind off the ocean). 1 mark for Continental Polar (cP) over " + c.name + " (cold, dry air on a northwest flow is the evidence expected).", {});
  q.figure = s6mMapSVG(sc, s6mShowNames(sc, [w.name, c.name]));
  return q;
}

E("sci-u1-cr-airmass", 1, ["SC10.6.4"], 3, "var", varset([
  function () { return s6mAirmassDraw("island"); },
  function () { return s6mAirmassDraw("labrador"); },
  function () { return s6mAirmassDraw("full"); }
]));

/* ----- bank-u2.js ----- */
// CRMARKS: sci-u2-cr-naming=4
// CRMARKS: sci-u2-cr-balance=3
// CRMARKS: sci-u2-cr-rates=3
// Science 1206 Unit 2 bank: Chemical Reactions (SC10.8.1 to 8.6).
// Original entries written for this app from the question types in
// the source analysis. Chemistry is the course's generator showcase:
// naming, formulas, balancing and classification are generated from
// the ion and species tables in bank-helpers.js and validated by
// brute-force draws; the balancer solves coefficients by search and
// every generated equation is verified atom by atom before use.

function s6ionName(cat, an) { return cat.name + " " + an.name; }
function s6ionFormula(cat, an) { return s6fsub(s6formula(cat, an)); }

/* ---------- SC10.8.1 Naming and formulas ---------- */

E("sci-u2-name-simple", 2, ["SC10.8.1"], 1, "gen", function () {
  var cat = s6pick(S6_CATIONS), an = s6pick(S6_ANIONS);
  var f = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var d1 = s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c !== cat; })), an);
  var d2 = s6ionName(cat, s6pick(S6_ANIONS.filter(function (a) { return a !== an; })));
  var d3 = s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c !== cat; })), s6pick(S6_ANIONS.filter(function (a) { return a !== an; })));
  var dis = [d1, d2, d3].filter(function (x, i, a) { return x !== nm && a.indexOf(x) === i; });
  while (dis.length < 3) dis.push("sodium chloride");
  return mcq("What is the name of the compound " + f + "?",
    nm, dis.slice(0, 3),
    "The cation (positive ion) is named first: " + cat.sym + " is " + cat.name + ". The anion is " + an.sym + ", named " + an.name + " (a nonmetal's name ends in -ide in a binary compound). Together: " + nm + ".",
    { f: f, nm: nm });
}, ["Name the positive ion first, then the negative ion with its -ide ending."]);

E("sci-u2-name-advanced", 2, ["SC10.8.1"], 2, "gen", function () {
  var useMulti = Math.random() < 0.5;
  var cat, an;
  if (useMulti) { cat = s6pick(S6_CATIONS_MULTI); an = s6pick(S6_ANIONS.concat(S6_ANIONS_POLY)); }
  else { cat = Math.random() < 0.4 ? S6_NH4 : s6pick(S6_CATIONS); an = s6pick(S6_ANIONS_POLY); }
  var f = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var dis = [];
  if (useMulti) {
    var sib = S6_CATIONS_MULTI.filter(function (c) { return c.sym === cat.sym && c !== cat; })[0];
    if (sib) dis.push(s6ionName(sib, an));
  }
  dis.push(s6ionName(cat, s6pick(S6_ANIONS.concat(S6_ANIONS_POLY).filter(function (a) { return a !== an; }))));
  dis.push(s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c.name !== cat.name; })), an));
  dis = dis.filter(function (x, i, a) { return x !== nm && a.indexOf(x) === i; });
  while (dis.length < 3) dis.push("iron(II) oxide");
  return mcq("What is the name of the compound " + f + "?",
    nm, dis.slice(0, 3),
    "Read the ions from the formula: the cation is " + cat.name + " (" + cat.sym + ", charge " + cat.chg + "+)" + (useMulti ? "; the Roman numeral is required because this metal forms more than one ion" : "") + ", and the anion is " + an.name + ". Cation first, then anion: " + nm + ".",
    { f: f, nm: nm });
}, ["Check whether the metal is multivalent: if it is, the name must carry the Roman numeral for its charge."]);

E("sci-u2-formula-simple", 2, ["SC10.8.1"], 1, "gen", function () {
  var cat = s6pick(S6_CATIONS), an = s6pick(S6_ANIONS);
  var right = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var swapped = s6fsub(an.sym + s6sub(cat.chg === 1 && an.chg === 1 ? 1 : an.chg) + cat.sym + s6sub(cat.chg === 1 && an.chg === 1 ? 1 : cat.chg));
  var oneOne = s6fsub(cat.sym + an.sym);
  var unreduced = s6fsub(cat.sym + s6sub(an.chg * 2 === 2 ? 1 : an.chg) + an.sym + s6sub(cat.chg));
  var dis = s6dis(right, [swapped, oneOne, unreduced, s6fsub(cat.sym + s6sub(an.chg + 1) + an.sym + s6sub(cat.chg)), s6fsub(cat.sym + "2" + an.sym + "2"), s6fsub(cat.sym + "3" + an.sym), s6fsub(cat.sym + an.sym + "2")], 3);
  return mcq("What is the chemical formula for " + nm + "?",
    right, dis.slice(0, 3),
    nm + " contains " + cat.name + " ions (" + cat.sym + ", " + cat.chg + "+) and " + an.name + " ions (" + an.sym + ", " + an.chg + "-). The charges must balance to zero: cross the charges down as subscripts and reduce, giving " + right + ". The cation is always written first.",
    { nm: nm, f: right });
}, ["Cross the charges: the cation's charge becomes the anion's subscript and the reverse, then reduce to the smallest whole numbers."]);

E("sci-u2-formula-poly", 2, ["SC10.8.1"], 2, "gen", function () {
  var cat = Math.random() < 0.35 ? S6_NH4 : s6pick(S6_CATIONS.concat(S6_CATIONS_MULTI));
  var an = s6pick(S6_ANIONS_POLY);
  var right = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var g = s6gcd(cat.chg, an.chg), nc = an.chg / g, na = cat.chg / g;
  var noBracket = s6fsub(cat.sym + s6sub(nc) + an.sym.replace(/\d/g, function (d) { return d; }) + s6sub(na));
  var flatAn = an.sym.replace(/(\d)/g, function (d) { return String(Number(d) * (na > 1 ? na : 1)); });
  var pairCands = [[2, 1], [1, 2], [2, 2], [3, 1], [1, 3], [3, 2], [2, 3]].map(function (pr) {
    var i = pr[0], j = pr[1];
    var anPart = (j > 1 && an.poly) ? "(" + an.sym + ")" + s6sub(j) : an.sym + s6sub(j);
    return s6fsub(cat.sym + s6sub(i) + anPart);
  });
  var dis = s6dis(right, pairCands.concat([
    noBracket,
    s6fsub(cat.sym + s6sub(nc) + flatAn),
    s6fsub(cat.sym + an.sym)
  ]), 3);
  return mcq("What is the chemical formula for " + nm + "?",
    right, dis.slice(0, 3),
    "The ions are " + cat.name + " (" + cat.sym + ", " + cat.chg + "+) and " + an.name + " (" + an.sym + ", " + an.chg + "-). Balancing charges gives " + nc + " cation(s) for every " + na + " anion(s)" + (na > 1 && an.poly ? ", and because more than one " + an.name + " ion is needed, the polyatomic ion goes in brackets with the subscript outside" : "") + ": " + right + ".",
    { nm: nm, f: right });
}, ["Brackets appear only when a polyatomic ion is needed more than once, and the subscript goes outside the bracket."]);

var S6_MOLECULAR = [
  { f: "CO", n: "carbon monoxide" }, { f: "CO2", n: "carbon dioxide" },
  { f: "N2O", n: "dinitrogen monoxide" }, { f: "NO", n: "nitrogen monoxide" },
  { f: "NO2", n: "nitrogen dioxide" }, { f: "SO2", n: "sulfur dioxide" },
  { f: "SO3", n: "sulfur trioxide" }, { f: "PCl3", n: "phosphorus trichloride" },
  { f: "CCl4", n: "carbon tetrachloride" }, { f: "SF6", n: "sulfur hexafluoride" },
  { f: "N2O4", n: "dinitrogen tetroxide" }, { f: "P2O5", n: "diphosphorus pentoxide" },
  { f: "CS2", n: "carbon disulfide" }, { f: "SiO2", n: "silicon dioxide" }
];
E("sci-u2-name-molecular", 2, ["SC10.8.1"], 2, "gen", function () {
  var item = s6pick(S6_MOLECULAR);
  var others = s6shuf(S6_MOLECULAR.filter(function (x) { return x !== item; })).slice(0, 3);
  if (Math.random() < 0.5) {
    return mcq("What is the name of the molecular compound " + s6fsub(item.f) + "?",
      item.n, others.map(function (x) { return x.n; }),
      "Molecular compounds are named with prefixes that state the atom counts (mono, di, tri, tetra, penta, hexa), the first element keeps its name (mono is dropped for it), and the second element's name ends in -ide: " + item.n + ".",
      { f: item.f, n: item.n });
  }
  return mcq("What is the formula for " + item.n + "?",
    s6fsub(item.f), others.map(function (x) { return s6fsub(x.f); }),
    "The prefixes give the atom counts directly: " + item.n + " is " + s6fsub(item.f) + ". No charge balancing is used for molecular compounds; the prefixes are the subscripts.",
    { f: item.f, n: item.n });
}, ["Two nonmetals means prefixes, not charges. The second element always ends in -ide."]);

E("sci-u2-naming-rules", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("In the name of a binary ionic compound, the negative ion's name is changed to end in",
      "-ide (chlorine becomes chloride, oxygen becomes oxide)",
      ["-ite (chlorine becomes chlorite)", "-ate (oxygen becomes oxate)", "-ium (oxygen becomes oxium)"],
      "Binary compounds (two elements) use -ide for the anion: chloride, oxide, sulfide, nitride. The -ite and -ate endings belong to polyatomic ions containing oxygen (sulfite, sulfate), not to single elements.", {});
  },
  function () {
    return mcq("A Roman numeral appears in the name iron(III) chloride because",
      "iron forms ions with more than one possible charge, and the numeral states which one this compound contains",
      ["there are three iron atoms in the formula", "iron is in group 3 of the periodic table", "the compound contains three chlorine atoms"],
      "Multivalent metals need the numeral to give the ion's charge: iron(III) is Fe with a 3+ charge. The numeral says nothing about atom counts, which the formula's subscripts handle.", {});
  },
  function () {
    return mcq("Why does the name sodium chloride need no Roman numeral and no prefixes?",
      "Sodium forms only one ion (Na with a 1+ charge), and ionic compounds are named without prefixes because the charges fix the ratio",
      ["Sodium is not a metal", "The compound is molecular, so prefixes are optional", "Roman numerals are only used for compounds containing oxygen"],
      "One possible charge means no ambiguity to resolve. Prefixes belong to the molecular naming system; in ionic compounds the neutral-charge requirement determines the subscripts on its own.", {});
  },
  function () {
    return mcq("The polyatomic ion SO4 with a 2- charge is named sulfate. In the compound CaSO4, the correct name is",
      "calcium sulfate (the polyatomic ion keeps its own name as a unit)",
      ["calcium sulfite", "calcium sulfur oxide", "calcium sulfide"],
      "Polyatomic ions are named as units and keep their names inside compounds: sulfate stays sulfate. Sulfide is the single sulfur ion (S, 2-), and sulfite is SO3 with a 2- charge, a different ion.", {});
  }
]), ["Three systems, three signal features: -ide for binary anions, Roman numerals for multivalent metals, prefixes for molecules."]);

E("sci-u2-ionic-molecular", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("A compound is made of a metal and a nonmetal. It conducts electricity when melted but not as a solid. The compound is",
      "ionic: its ions are locked in place in the solid but move freely when melted",
      ["molecular: its molecules break apart when melted", "a metal alloy", "an acid"],
      "Conductivity that switches on when a solid melts is the ionic signature: the charged particles exist in the solid but cannot move until the lattice breaks down. Molecular compounds do not conduct in either state.", {});
  },
  function () {
    return mcq("Which compound is molecular (covalent) rather than ionic?",
      "Carbon dioxide, CO2: two nonmetals sharing electrons",
      ["Sodium chloride, NaCl", "Magnesium oxide, MgO", "Calcium fluoride, CaF2"],
      "Metal plus nonmetal means ionic in this course's compounds. Carbon and oxygen are both nonmetals, so CO2 is molecular, named with prefixes and existing as separate molecules.", {});
  },
  function () {
    return mcq("Which property set belongs to ionic compounds?",
      "High melting points, brittle crystals, conduct when molten or dissolved",
      ["Low melting points, soft, never conduct in any state", "Gases at room temperature, conduct as solids", "High melting points, malleable like metals"],
      "The strong attraction throughout an ionic lattice gives high melting points and brittleness, and the ions conduct once they can move (molten or in solution). Malleability is a metal property, not an ionic one.", {});
  }
]), ["Metal plus nonmetal, think ionic. Then let the conductivity behaviour confirm it."]);

E("sci-u2-formula-atoms", 2, ["SC10.8.1"], 2, "gen", function () {
  var items = [
    { f: "Ca(OH)2", el: "oxygen", n: 2, parse: "The brackets multiply everything inside: Ca(OH)2 has 2 OH units, so 2 oxygen atoms (and 2 hydrogen)." },
    { f: "Ca(OH)2", el: "hydrogen", n: 2, parse: "The subscript 2 outside the brackets doubles the H inside: 2 hydrogen atoms." },
    { f: "Al2(SO4)3", el: "oxygen", n: 12, parse: "Each SO4 unit holds 4 oxygens and there are 3 units: 3 x 4 = 12 oxygen atoms." },
    { f: "Al2(SO4)3", el: "sulfur", n: 3, parse: "There are 3 sulfate units, each with 1 sulfur: 3 sulfur atoms." },
    { f: "Mg(NO3)2", el: "nitrogen", n: 2, parse: "Two nitrate units, one nitrogen each: 2 nitrogen atoms." },
    { f: "Mg(NO3)2", el: "oxygen", n: 6, parse: "Two nitrate units with 3 oxygens each: 2 x 3 = 6 oxygen atoms." },
    { f: "(NH4)3PO4", el: "hydrogen", n: 12, parse: "Three ammonium units with 4 hydrogens each: 3 x 4 = 12 hydrogen atoms." },
    { f: "(NH4)3PO4", el: "nitrogen", n: 3, parse: "Three ammonium units, one nitrogen each: 3 nitrogen atoms." },
    { f: "Fe2(SO4)3", el: "oxygen", n: 12, parse: "Three sulfate units with 4 oxygens each: 12 oxygen atoms." },
    { f: "Ca3(PO4)2", el: "phosphorus", n: 2, parse: "Two phosphate units, one phosphorus each: 2 phosphorus atoms." },
    { f: "Ca3(PO4)2", el: "oxygen", n: 8, parse: "Two phosphate units with 4 oxygens each: 8 oxygen atoms." },
    { f: "CuSO4", el: "oxygen", n: 4, parse: "No brackets and no subscript after the sulfate unit as a whole: the 4 belongs to oxygen inside SO4, giving 4 oxygen atoms." }
  ];
  var it = s6pick(items);
  return mcq("How many " + it.el + " atoms are shown in one formula unit of " + s6fsub(it.f) + "?",
    String(it.n), s6numDist(it.n, [it.n + 1, it.n - 1 > 0 ? it.n - 1 : it.n + 2, it.n * 2], ""),
    it.parse, { f: it.f, el: it.el, n: it.n });
}, ["Multiply inside-out: the subscript outside brackets applies to everything inside them."]);

/* ---------- SC10.8.2 Balancing and conservation of mass ---------- */

var S6_SPECIES = {
  "H2": { H: 2 }, "O2": { O: 2 }, "H2O": { H: 2, O: 1 }, "H2O2": { H: 2, O: 2 },
  "CH4": { C: 1, H: 4 }, "CO2": { C: 1, O: 2 }, "CO": { C: 1, O: 1 }, "C": { C: 1 },
  "Mg": { Mg: 1 }, "MgO": { Mg: 1, O: 1 }, "Na": { Na: 1 }, "Cl2": { Cl: 2 },
  "NaCl": { Na: 1, Cl: 1 }, "Fe": { Fe: 1 }, "Fe2O3": { Fe: 2, O: 3 },
  "Al": { Al: 1 }, "Al2O3": { Al: 2, O: 3 }, "Ca": { Ca: 1 }, "CaO": { Ca: 1, O: 1 },
  "Zn": { Zn: 1 }, "HCl": { H: 1, Cl: 1 }, "ZnCl2": { Zn: 1, Cl: 2 },
  "N2": { N: 2 }, "NH3": { N: 1, H: 3 }, "KClO3": { K: 1, Cl: 1, O: 3 }, "KCl": { K: 1, Cl: 1 },
  "S": { S: 1 }, "SO2": { S: 1, O: 2 }, "Cu": { Cu: 1 }, "CuO": { Cu: 1, O: 1 }, "Ag": { Ag: 1 },
  "CaCO3": { Ca: 1, C: 1, O: 3 }, "NaOH": { Na: 1, O: 1, H: 1 }, "H2SO4": { H: 2, S: 1, O: 4 },
  "Na2SO4": { Na: 2, S: 1, O: 4 }, "CH4O": { C: 1, H: 4, O: 1 }
};
function s6balance(reactants, products) {
  var species = reactants.concat(products);
  var els = {};
  species.forEach(function (s) { Object.keys(S6_SPECIES[s]).forEach(function (e) { els[e] = 1; }); });
  var elList = Object.keys(els);
  var n = species.length, coefs = new Array(n).fill(1);
  function totals() {
    var t = {};
    species.forEach(function (s, i) { Object.keys(S6_SPECIES[s]).forEach(function (e) { t[e] = (t[e] || 0) + S6_SPECIES[s][e] * coefs[i] * (i < reactants.length ? 1 : -1); }); });
    return elList.every(function (e) { return (t[e] || 0) === 0; });
  }
  function search(pos) {
    if (pos === n) return totals();
    for (var c = 1; c <= 4; c++) { coefs[pos] = c; if (search(pos + 1)) return true; }
    coefs[pos] = 1; return false;
  }
  if (!search(0)) return null;
  var g = coefs.reduce(function (a, b) { return s6gcd(a, b); });
  return coefs.map(function (c) { return c / g; });
}
function s6eqText(reactants, products, coefs, blankIdx) {
  function side(list, offset) {
    return list.map(function (s, i) {
      var c = coefs[offset + i];
      var coef = (blankIdx === offset + i) ? "__ " : (c > 1 ? c + " " : "");
      return coef + s6fsub(s);
    }).join(" + ");
  }
  return side(reactants, 0) + " → " + side(products, reactants.length);
}
var S6_REACTIONS_SD = [
  { r: ["Mg", "O2"], p: ["MgO"] }, { r: ["H2", "O2"], p: ["H2O"] },
  { r: ["Na", "Cl2"], p: ["NaCl"] }, { r: ["H2O2"], p: ["H2O", "O2"] },
  { r: ["KClO3"], p: ["KCl", "O2"] }, { r: ["CaCO3"], p: ["CaO", "CO2"] },
  { r: ["Fe", "O2"], p: ["Fe2O3"] }, { r: ["N2", "H2"], p: ["NH3"] },
  { r: ["Al", "O2"], p: ["Al2O3"] }, { r: ["S", "O2"], p: ["SO2"] },
  { r: ["H2O"], p: ["H2", "O2"] }, { r: ["Cu", "O2"], p: ["CuO"] }
];
function s6balDraw(pool) {
  for (var t = 0; t < 40; t++) {
    var rx = s6pick(pool);
    var co = s6balance(rx.r, rx.p);
    if (co) return { rx: rx, co: co };
  }
  return { rx: pool[0], co: s6balance(pool[0].r, pool[0].p) };
}
E("sci-u2-balance-sd", 2, ["SC10.8.2"], 2, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_SD);
  var species = d.rx.r.concat(d.rx.p);
  var idx = s6ri(0, species.length - 1);
  var key = d.co[idx];
  var full = s6eqText(d.rx.r, d.rx.p, d.co, -1);
  return mcq("When the equation " + s6eqText(d.rx.r, d.rx.p, d.co, idx) + " is balanced with the smallest whole-number coefficients, what is the coefficient of " + s6fsub(species[idx]) + "?",
    String(key), s6numDist(key, [key + 1, key === 1 ? 3 : key - 1, key + 2], ""),
    "Balancing this equation gives " + full + ". Count atoms on both sides to check: every element appears the same number of times on each side, which is what balancing requires. The coefficient of " + s6fsub(species[idx]) + " is " + key + ".",
    { eq: full, idx: idx, key: key });
}, ["Balance one element at a time, leaving single elements (like O2) for last, and never change a subscript."]);

var S6_REACTIONS_CR = [
  { r: ["CH4", "O2"], p: ["CO2", "H2O"] }, { r: ["C", "O2"], p: ["CO2"] },
  { r: ["Zn", "HCl"], p: ["ZnCl2", "H2"] }, { r: ["Fe", "HCl"], p: ["FeCl2x", "H2"] },
  { r: ["Mg", "HCl"], p: ["MgCl2x", "H2"] }, { r: ["CH4O", "O2"], p: ["CO2", "H2O"] },
  { r: ["H2SO4", "NaOH"], p: ["Na2SO4", "H2O"] }
];
S6_SPECIES["FeCl2x"] = { Fe: 1, Cl: 2 }; S6_SPECIES["MgCl2x"] = { Mg: 1, Cl: 2 };
var S6_DISPLAY = { "FeCl2x": "FeCl2", "MgCl2x": "MgCl2" };
function s6disp(s) { return s6fsub(S6_DISPLAY[s] || s); }
function s6eqText2(reactants, products, coefs, blankIdx) {
  function nm(s) { return s6fsub(S6_DISPLAY[s] || s); }
  function side(list, offset) {
    return list.map(function (s, i) {
      var c = coefs[offset + i];
      var coef = (blankIdx === offset + i) ? "__ " : (c > 1 ? c + " " : "");
      return coef + nm(s);
    }).join(" + ");
  }
  return side(reactants, 0) + " → " + side(products, reactants.length);
}
E("sci-u2-balance-cr", 2, ["SC10.8.2"], 2, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_CR);
  var species = d.rx.r.concat(d.rx.p);
  var idx = s6ri(0, species.length - 1);
  var key = d.co[idx];
  var full = s6eqText2(d.rx.r, d.rx.p, d.co, -1);
  var dispName = s6fsub(S6_DISPLAY[species[idx]] || species[idx]);
  return mcq("When the equation " + s6eqText2(d.rx.r, d.rx.p, d.co, idx) + " is balanced with the smallest whole-number coefficients, what is the coefficient of " + dispName + "?",
    String(key), s6numDist(key, [key + 1, key === 1 ? 3 : key - 1, key + 2], ""),
    "The balanced equation is " + full + ". Verify by counting: each element's atoms match on the two sides. The coefficient of " + dispName + " is " + key + ".",
    { eq: full, idx: idx, key: key });
}, ["Balance metals first, then nonmetals, then hydrogen and oxygen. Check by counting every atom on both sides."]);

E("sci-u2-eq-atoms", 2, ["SC10.8.2"], 3, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_SD.concat(S6_REACTIONS_CR));
  var species = d.rx.r.concat(d.rx.p);
  var els = {};
  species.forEach(function (s) { Object.keys(S6_SPECIES[s]).forEach(function (e) { els[e] = 1; }); });
  var el = s6pick(Object.keys(els));
  var side = Math.random() < 0.5 ? 0 : 1;
  var list = side === 0 ? d.rx.r : d.rx.p, offset = side === 0 ? 0 : d.rx.r.length;
  var total = 0;
  list.forEach(function (s, i) { total += (S6_SPECIES[s][el] || 0) * d.co[offset + i]; });
  var full = s6eqText2(d.rx.r, d.rx.p, d.co, -1);
  return mcq("In the balanced equation " + full + ", how many " + el + " atoms are shown on the " + (side === 0 ? "reactants" : "products") + " side?",
    String(total), s6numDist(total, [total + 2, total > 2 ? total - 2 : total + 3, total + 4], ""),
    "Multiply each formula's subscript for " + el + " by its coefficient and add across the " + (side === 0 ? "reactants" : "products") + " side: the total is " + total + ". (The other side must give the same count; that is the point of balancing.)",
    { eq: full, el: el, total: total });
}, ["Coefficient times subscript, summed over every substance on the side. Both sides must agree."]);

E("sci-u2-mass-basic", 2, ["SC10.8.2"], 2, "gen", function () {
  var mode = s6pick(["findproduct", "findreactant", "gas"]);
  var a = s6ri(12, 68), b = s6ri(8, 44), dec = function (x) { return (Math.round(x * 10) / 10).toFixed(1); };
  var skins = [
    { r1: "magnesium", r2: "oxygen", p: "magnesium oxide", verb: "burns in" },
    { r1: "zinc", r2: "hydrochloric acid solution", p: "zinc chloride solution and hydrogen gas", verb: "reacts with" },
    { r1: "calcium carbonate", r2: "heat (it decomposes)", p: "calcium oxide and carbon dioxide", verb: "is heated strongly" }
  ];
  var sk = s6pick(skins);
  if (mode === "findproduct") {
    var tot = a + b;
    return mcq("In a sealed container, " + dec(a) + " g of reactant A reacts completely with " + dec(b) + " g of reactant B. No other substances are involved. What mass of products forms?",
      dec(tot) + " g", s6numDist(tot, [tot - a / 2, tot + b, Math.abs(a - b)], " g").map(function (s) { return dec(parseFloat(s)) + " g"; }),
      "Conservation of mass: in a closed system the total mass of the products equals the total mass of the reactants, " + dec(a) + " + " + dec(b) + " = " + dec(tot) + " g. Atoms are rearranged, never created or destroyed.",
      { mode: mode, tot: tot });
  }
  if (mode === "findreactant") {
    var tot2 = a + b;
    return mcq("A reaction in a sealed flask produces " + dec(tot2) + " g of products in total. One reactant had a mass of " + dec(a) + " g. What was the mass of the other reactant?",
      dec(b) + " g", s6numDist(b, [tot2, a, b + 10], " g").map(function (s) { return dec(parseFloat(s)) + " g"; }),
      "Mass is conserved: reactants total " + dec(tot2) + " g, so the second reactant is " + dec(tot2) + " - " + dec(a) + " = " + dec(b) + " g.",
      { mode: mode, tot: tot2 });
  }
  var before = a + b, esc = s6ri(3, 18), after = before - esc;
  return mcq("A student reacts " + dec(a) + " g of a carbonate with " + dec(b) + " g of acid in an open beaker. When the fizzing stops, the beaker's contents have a mass " + dec(esc) + " g less than the starting total. The missing mass",
    "escaped into the air as carbon dioxide gas; counted with the gas, the mass is still conserved",
    ["was destroyed by the reaction", "turned into heat and no longer exists as matter", "is an error: mass can never change in any container"],
    "The reaction produced a gas that left the open beaker. Conservation of mass applies to everything, including the escaped gas: " + dec(before) + " g of reactants gave " + dec(after) + " g in the beaker plus " + dec(esc) + " g of carbon dioxide in the air.",
    { mode: mode, esc: esc });
}, ["Sealed system: totals must match exactly. Open system: ask what left or entered before doubting conservation."]);

E("sci-u2-conservation-why", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The law of conservation of mass holds in chemical reactions because",
      "the atoms are only rearranged: every atom present before the reaction is present after it",
      ["atoms change into energy and back again during reactions", "products are always heavier than reactants by the mass of the heat released", "mass is created to balance the equation"],
      "In a chemical reaction bonds break and form, but atoms themselves are unchanged and uncounted nowhere: same atoms in, same atoms out, so the mass is the same. (Mass-energy conversion is a nuclear process, not chemistry.)", {});
  },
  function () {
    return mcq("A log burns down to a small pile of ash weighing far less than the log. This does not break the conservation of mass because",
      "most of the log's mass left as carbon dioxide and water vapour in the smoke and gases",
      ["burning destroys the mass of the wood", "the ash absorbed the missing mass as heat", "conservation of mass does not apply to burning"],
      "The ash is only the part that stayed. The gases carried the rest away; weigh the log, the oxygen it consumed, and all the products (ash plus gases) and the totals match.", {});
  },
  function () {
    return mcq("Which change would let a student prove conservation of mass for a fizzing antacid tablet reaction?",
      "Run the reaction in a sealed container (or trap the gas in a balloon) so no product escapes before weighing",
      ["Use a bigger beaker", "Weigh the products while they are still fizzing", "Repeat the reaction three times and average"],
      "The apparent mass loss is gas escaping. Sealing the system keeps every product in the weighing, and then the totals match. Bigger glassware and averaging do nothing about the escaping gas.", {});
  }
]), ["Atoms are neither created nor destroyed in chemistry. If the scale disagrees, hunt for what crossed the container's boundary."]);

E("sci-u2-word-equation", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The word equation for the reaction of methane with oxygen is: methane + oxygen → carbon dioxide + water. Which statement about this reaction is correct?",
      "The reactants are methane and oxygen, and carbon dioxide and water are the products",
      ["The products are methane and oxygen", "Water is a reactant because it appears in the equation", "Carbon dioxide is a catalyst"],
      "In any equation the substances before the arrow are the reactants (starting materials) and those after it are the products (new substances formed).", {});
  },
  function () {
    return mcq("\"Hydrogen peroxide decomposes into water and oxygen\" written as a word equation is",
      "hydrogen peroxide → water + oxygen",
      ["water + oxygen → hydrogen peroxide", "hydrogen peroxide + water → oxygen", "oxygen → hydrogen peroxide + water"],
      "The starting substance (hydrogen peroxide) goes on the left of the arrow and the substances formed (water and oxygen) go on the right. Reversing the arrow describes the reverse reaction, which is not what the sentence says.", {});
  },
  function () {
    return mcq("In the word equation zinc + hydrochloric acid → zinc chloride + hydrogen, the zinc chloride is",
      "a product: a new substance formed by the reaction",
      ["a reactant left over from the start", "a catalyst speeding the reaction", "the solvent the reaction happens in"],
      "Zinc chloride does not exist in the beaker until the reaction makes it; it appears on the products side of the arrow. Hydrochloric acid provides the medium but is itself a reactant that gets used up.", {});
  }
]), ["Left of the arrow: what you start with. Right of the arrow: what you make."]);

E("sci-u2-reaction-evidence", 2, ["SC10.8.3"], 1, "var", varset([
  function () {
    return mcq("Which observation is the strongest evidence that a chemical reaction (not just a physical change) has occurred?",
      "A new substance with different properties has formed, such as a precipitate appearing when two clear solutions mix",
      ["The mixture became warmer while it was stirred over a flame", "A solid dissolved and the solution changed colour slightly", "Bubbles appeared while a liquid boiled"],
      "A chemical reaction makes new substances. A precipitate from two clear solutions is a new solid that was not there before. Dissolving, boiling and warming over a flame can all happen with no new substance at all.", {});
  },
  function () {
    return mcq("Fizzing is observed in four situations. In which one is the gas certainly from a chemical reaction?",
      "An antacid tablet in water producing gas while the tablet's material is used up and the water's acidity falls",
      ["Soda water releasing bubbles when the bottle is opened", "Water boiling on a stove", "Dry ice producing fog in warm air"],
      "The antacid's fizz comes from a reaction between the tablet and the acid, consuming reactants and changing the solution. The others are physical: released dissolved gas, a change of state, and condensing vapour.", {});
  },
  function () {
    return mcq("Which list contains only reliable signs that a chemical change may have occurred?",
      "Formation of a precipitate, production of a gas in a mixture at room temperature, a permanent colour change, an unexpected temperature change",
      ["Melting, dissolving, breaking, evaporating", "A change of shape, a change of state, a change of size", "Boiling, condensing, freezing, dissolving"],
      "Each item in the correct list points to a new substance forming. The other lists are physical changes, where the substance itself stays the same.", {});
  }
]), ["The test is always the same: is a NEW substance there at the end?"]);

/* ---------- SC10.8.3 Classification ---------- */

var S6_CLASSIFY = [
  { r: ["Mg", "O2"], p: ["MgO"], t: "synthesis", note: "Two substances (an element and an element) combine into a single product: synthesis, A + B → AB." },
  { r: ["N2", "H2"], p: ["NH3"], t: "synthesis", note: "Two reactants join into one product: synthesis." },
  { r: ["CaO", "H2O"], p: ["CaOH2x"], t: "synthesis", note: "Two compounds combine into a single product: synthesis." },
  { r: ["H2O2"], p: ["H2O", "O2"], t: "decomposition", note: "One reactant breaks down into two products: decomposition, AB → A + B." },
  { r: ["KClO3"], p: ["KCl", "O2"], t: "decomposition", note: "A single compound splits into two simpler substances: decomposition." },
  { r: ["CaCO3"], p: ["CaO", "CO2"], t: "decomposition", note: "One reactant, two products: decomposition (driven here by heat)." },
  { r: ["Zn", "HCl"], p: ["ZnCl2"], t: "single replacement", extra: ["H2"], note: "An element (Zn) takes the place of another element (H) in a compound: single replacement, A + BC → AC + B." },
  { r: ["Fe", "CuSO4x"], p: ["FeSO4x", "Cu"], t: "single replacement", note: "Iron displaces copper from its compound: a more reactive element replaces a less reactive one, single replacement." },
  { r: ["Cu", "AgNO3x"], p: ["CuNO32x", "Ag"], t: "single replacement", note: "Copper displaces silver from silver nitrate solution: single replacement." },
  { r: ["AgNO3x", "NaCl"], p: ["AgClx", "NaNO3x"], t: "double replacement", note: "The two compounds swap partners: the positive ions trade negative ions, double replacement (here forming the precipitate AgCl)." },
  { r: ["BaCl2x", "Na2SO4"], p: ["BaSO4x", "NaCl"], t: "double replacement", note: "Partner swap between two compounds, forming the precipitate BaSO4: double replacement." },
  { r: ["CH4", "O2"], p: ["CO2", "H2O"], t: "combustion", note: "A fuel reacts with oxygen to give carbon dioxide and water: combustion." },
  { r: ["C", "O2"], p: ["CO2"], t: "combustion", note: "Carbon burning in oxygen is combustion (it also fits the synthesis pattern, but a substance burning in oxygen is classified as combustion)." }
];
S6_SPECIES["CaOH2x"] = { Ca: 1, O: 2, H: 2 };
S6_SPECIES["CuSO4x"] = { Cu: 1, S: 1, O: 4 }; S6_SPECIES["FeSO4x"] = { Fe: 1, S: 1, O: 4 };
S6_SPECIES["AgNO3x"] = { Ag: 1, N: 1, O: 3 }; S6_SPECIES["CuNO32x"] = { Cu: 1, N: 2, O: 6 };
S6_SPECIES["AgClx"] = { Ag: 1, Cl: 1 }; S6_SPECIES["NaNO3x"] = { Na: 1, N: 1, O: 3 };
S6_SPECIES["BaCl2x"] = { Ba: 1, Cl: 2 }; S6_SPECIES["BaSO4x"] = { Ba: 1, S: 1, O: 4 };
S6_DISPLAY["CaOH2x"] = "Ca(OH)2"; S6_DISPLAY["CuSO4x"] = "CuSO4"; S6_DISPLAY["FeSO4x"] = "FeSO4";
S6_DISPLAY["AgNO3x"] = "AgNO3"; S6_DISPLAY["CuNO32x"] = "Cu(NO3)2"; S6_DISPLAY["AgClx"] = "AgCl";
S6_DISPLAY["NaNO3x"] = "NaNO3"; S6_DISPLAY["BaCl2x"] = "BaCl2"; S6_DISPLAY["BaSO4x"] = "BaSO4";
var S6_TYPES = ["synthesis", "decomposition", "single replacement", "double replacement", "combustion"];
function s6classDraw(filter) {
  var pool = S6_CLASSIFY.filter(filter);
  for (var t = 0; t < 40; t++) {
    var item = s6pick(pool);
    var prods = item.extra ? item.p.concat(item.extra) : item.p;
    var co = s6balance(item.r, prods);
    if (co) return { item: item, co: co, prods: prods };
  }
  var it0 = pool[0]; var pr0 = it0.extra ? it0.p.concat(it0.extra) : it0.p;
  return { item: it0, co: s6balance(it0.r, pr0), prods: pr0 };
}
function s6classQ(d) {
  var eq = s6eqText2(d.item.r, d.prods, d.co, -1);
  var others = s6shuf(S6_TYPES.filter(function (x) { return x !== d.item.t; })).slice(0, 3);
  return mcq("Classify the reaction: " + eq + ". What type of reaction is it?",
    d.item.t, others,
    d.item.note + " The balanced equation is " + eq + ".",
    { eq: eq, t: d.item.t });
}
E("sci-u2-classify-basic", 2, ["SC10.8.3"], 2, "gen", function () {
  return s6classQ(s6classDraw(function (x) { return x.t === "synthesis" || x.t === "decomposition"; }));
}, ["Count the substances on each side first: many-to-one is synthesis, one-to-many is decomposition."]);
E("sci-u2-classify-replacement", 2, ["SC10.8.3"], 2, "gen", function () {
  return s6classQ(s6classDraw(function (x) { return x.t !== "synthesis" && x.t !== "decomposition"; }));
}, ["Look for the swap: one element trading places is single replacement; two compounds trading partners is double. Burning in oxygen is combustion."]);

E("sci-u2-types-def", 2, ["SC10.8.3"], 1, "var", varset([
  function () {
    return mcq("Which general pattern describes a decomposition reaction?",
      "AB → A + B: one compound breaks into simpler substances",
      ["A + B → AB", "A + BC → AC + B", "AB + CD → AD + CB"],
      "Decomposition is the one-to-many pattern: a single reactant splits apart. The other patterns are synthesis, single replacement and double replacement respectively.", {});
  },
  function () {
    return mcq("A reaction in which a fuel burns in oxygen to produce carbon dioxide and water is classified as",
      "combustion",
      ["synthesis", "neutralization", "decomposition"],
      "Combustion is defined by the fuel plus oxygen reactants and the carbon dioxide plus water products (for a hydrocarbon fuel). It is its own class in this course's five-type scheme.", {});
  },
  function () {
    return mcq("In a single replacement reaction, the element doing the replacing must be",
      "more reactive than the element it displaces from the compound",
      ["less reactive than the element it displaces", "a nonmetal in every case", "present in a larger mass than the whole compound"],
      "Displacement is a competition: the more reactive element wins the partner. A less reactive element cannot push another out, and the reaction simply does not occur.", {});
  }
]), ["Five patterns: learn the shapes (many-to-one, one-to-many, one swap, two swaps, burn)."]);

/* ---------- SC10.8.4 and 8.5 Acids, bases, salts, neutralization ---------- */

E("sci-u2-acid-properties", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("Which list of properties belongs to acids?",
      "Sour taste, turn blue litmus red, react with metals to produce hydrogen gas, conduct electricity in solution",
      ["Bitter taste, slippery feel, turn red litmus blue", "Neutral taste, never conduct electricity, feel slippery", "Sour taste, turn red litmus blue, feel slippery"],
      "Acids: sour, blue litmus to red, fizz with active metals, and their solutions conduct (they form ions). Bitter and slippery with red-to-blue litmus is the base profile, the mirror image.", {});
  },
  function () {
    return mcq("A solution turns blue litmus paper red and has a pH of 3. The solution is",
      "acidic",
      ["basic", "neutral", "a salt with no ions"],
      "Blue litmus turning red and a pH below 7 are two independent acid tests agreeing with each other. Neutral solutions sit at pH 7 and leave litmus unchanged.", {});
  },
  function () {
    return mcq("Which substance is an acid, judging by its formula and behaviour?",
      "Vinegar (ethanoic acid): it tastes sour and turns blue litmus red",
      ["Baking soda solution: it feels slippery and turns red litmus blue", "Table salt solution: it leaves both litmus papers unchanged", "Soap solution: it is bitter and slippery"],
      "Judge by behaviour, not by the household name: sour plus blue-to-red litmus is the acid pattern. Baking soda and soap solutions are bases; salt solution is neutral.", {});
  }
]), ["Acids: sour, blue to red, pH under 7. Keep the mirror image (bases) straight by contrast."]);

E("sci-u2-base-properties", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("Which list of properties belongs to bases?",
      "Bitter taste, slippery soapy feel, turn red litmus blue, conduct electricity in solution",
      ["Sour taste, turn blue litmus red, produce hydrogen with metals", "No taste, no feel, never conduct in any form", "Bitter taste, turn blue litmus red, pH below 7"],
      "Bases are the mirror image of acids: bitter, slippery, red litmus to blue, pH above 7. The distractors each borrow one acid property, which is exactly the confusion to avoid.", {});
  },
  function () {
    return mcq("A cleaning solution has a pH of 11 and feels slippery. It is classified as",
      "a base (alkaline solution)",
      ["an acid", "a neutral salt solution", "pure water"],
      "pH 11 is well above 7 and the slippery feel is the classic base cue: an alkaline cleaner such as ammonia solution or oven cleaner behaves this way.", {});
  },
  function () {
    return mcq("A solution of sodium hydroxide is a base. Which test result confirms a solution is basic rather than acidic?",
      "It turns red litmus paper blue",
      ["It turns blue litmus paper red", "It leaves both litmus papers unchanged", "It produces hydrogen gas with zinc"],
      "Red to blue is the base direction. Blue to red is the acid direction, unchanged means neutral, and hydrogen with a metal is an acid reaction.", {});
  }
]), ["Bases: bitter, slippery, red to blue, pH over 7."]);

E("sci-u2-ph-scale", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("On the pH scale, a solution with pH 7 is",
      "neutral: neither acidic nor basic (pure water at room temperature)",
      ["a strong acid", "a weak base", "a concentrated salt"],
      "The scale runs 0 to 14 with 7 as the neutral midpoint. Below 7 is acidic, above 7 is basic (alkaline).", {});
  },
  function () {
    return mcq("Which list orders the solutions from most acidic to most basic?",
      "Lemon juice (pH 2), then rainwater (pH 5.6), then seawater (pH 8), then oven cleaner (pH 13)",
      ["Oven cleaner (pH 13), then seawater (pH 8), then rainwater (pH 5.6), then lemon juice (pH 2)", "Rainwater (pH 5.6), then lemon juice (pH 2), then oven cleaner (pH 13), then seawater (pH 8)", "Seawater (pH 8), then lemon juice (pH 2), then rainwater (pH 5.6), then oven cleaner (pH 13)"],
      "Lower pH means more acidic. Reading the values in increasing order gives lemon juice, rainwater (slightly acidic from dissolved carbon dioxide), seawater (slightly basic), oven cleaner (strongly basic).", {});
  },
  function () {
    return mcq("A soil sample tests at pH 5.2. For most garden plants this soil is",
      "slightly acidic",
      ["strongly basic", "exactly neutral", "strongly acidic"],
      "5.2 is below 7 but not far: slightly (weakly) acidic. Garden lime is the usual treatment to nudge it toward neutral, an everyday neutralization.", {});
  }
]), ["Under 7 acidic, 7 neutral, over 7 basic. Distance from 7 tells the strength of the character, not just the direction."]);

E("sci-u2-ph-compare", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("Solution A has pH 3 and Solution B has pH 5. How do their acidities compare?",
      "A is 100 times as acidic as B: each pH step is a factor of 10, and the solutions differ by 2 steps",
      ["A is twice as acidic as B", "A is 2 times as acidic as B because 5 - 3 = 2", "B is 100 times as acidic as A"],
      "The pH scale is logarithmic: one unit means ten times the hydrogen ion concentration. Two units of difference means 10 x 10 = 100 times. Subtracting the pH values directly is the classic error.", {});
  },
  function () {
    return mcq("Adding water to dilute an acid with pH 2 will move its pH",
      "upward toward 7, because the hydrogen ions are spread through more water (lower concentration)",
      ["downward toward 0", "past 7 into the basic range", "nowhere: dilution does not change pH"],
      "Dilution lowers the ion concentration, so the pH of an acid rises toward 7, but dilution alone can never carry it past neutral into basic territory.", {});
  },
  function () {
    return mcq("Stomach acid has a pH near 2, and an antacid raises it toward pH 4. By what factor has the hydrogen ion concentration changed?",
      "It has fallen by a factor of about 100",
      ["It has fallen by a factor of 2", "It has doubled", "It has fallen by a factor of 20"],
      "Two pH units of change is 10 squared: the hydrogen ion concentration drops to about one hundredth of its starting value. That is the arithmetic behind antacid relief.", {});
  }
]), ["Every pH step is a tenfold step. Two steps is not two times, it is a hundred times."]);

E("sci-u2-indicators", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("Phenolphthalein is colourless in an unknown solution and turns pink when a few drops of sodium hydroxide solution are added. The colour change shows that",
      "the mixture has become basic: phenolphthalein is colourless in acids and neutral solutions and pink in bases",
      ["the mixture has become acidic", "the unknown was a strong acid all along", "phenolphthalein reacts with water to make pink dye"],
      "Phenolphthalein's job is to signal the acid-base state: colourless at and below neutral, pink in base. The pink appears because the added base carried the mixture past neutral.", {});
  },
  function () {
    return mcq("A student tests three solutions with both litmus papers. Solution X turns blue litmus red; Solution Y turns red litmus blue; Solution Z changes neither. The classifications are",
      "X acidic, Y basic, Z neutral",
      ["X basic, Y acidic, Z neutral", "X acidic, Y neutral, Z basic", "X neutral, Y basic, Z acidic"],
      "Blue to red means acid, red to blue means base, and no change to either paper means neutral. The three results map one-to-one onto the three classes.", {});
  },
  function () {
    return mcq("Red cabbage juice turns red-pink in vinegar, purple in tap water and green in a baking soda solution. Cabbage juice is useful here because it is",
      "a natural indicator: a substance whose colour depends on whether the solution is acidic, neutral or basic",
      ["an acid that reacts with all three solutions", "a base that neutralizes the other solutions", "a salt that precipitates in vinegar"],
      "An indicator reports the solution's character through its own colour change without taking part as a reactant in any important way. Plant pigments like cabbage juice do this across a range of colours.", {});
  }
]), ["An indicator is a reporter, not a player: its colour tells you which side of neutral the solution is on."]);

E("sci-u2-acid-formulas", 2, ["SC10.8.4"], 2, "gen", function () {
  var items = [
    { show: "HCl", cls: "an acid", why: "Hydrogen at the front of the formula and it produces H+ ions in water: hydrochloric acid, a strong acid." },
    { show: "H2SO4", cls: "an acid", why: "Sulfuric acid: the leading hydrogen marks it as an acid, and it is a common laboratory acid." },
    { show: "HNO3", cls: "an acid", why: "Nitric acid: an acid by its leading hydrogen and its behaviour in solution." },
    { show: "NaOH", cls: "a base", why: "Sodium hydroxide: a metal hydroxide, and metal hydroxides are bases (the OH group is the giveaway)." },
    { show: "Ca(OH)2", cls: "a base", why: "Calcium hydroxide: a metal hydroxide, used as lime; bases carry the hydroxide group." },
    { show: "KOH", cls: "a base", why: "Potassium hydroxide: a metal hydroxide and a strong base." },
    { show: "NaCl", cls: "a salt", why: "Sodium chloride: a metal cation with a non-hydroxide anion and no leading hydrogen: a salt, the product type made in neutralizations." },
    { show: "KNO3", cls: "a salt", why: "Potassium nitrate: metal plus polyatomic anion, no leading H and no OH: a salt." },
    { show: "CaCO3", cls: "a salt", why: "Calcium carbonate: a salt (the compound in limestone and antacid tablets); it reacts with acids but is classed as a salt." },
    { show: "NH3", cls: "a base", why: "Ammonia forms a basic solution in water (it produces hydroxide ions there), so it is classed with the bases in this course." }
  ];
  var it = s6pick(items);
  var others = ["an acid", "a base", "a salt"].filter(function (c) { return c !== it.cls; });
  return mcq("Classify the substance " + s6fsub(it.show) + ": it is",
    it.cls, others.concat(["a molecular element"]),
    it.why, { show: it.show, cls: it.cls });
}, ["Formula clues: leading H usually means acid, OH in a metal compound means base, metal plus anion with neither means salt."]);

E("sci-u2-salts", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("In this course, a salt is best defined as",
      "an ionic compound whose positive ion comes from a base and whose negative ion comes from an acid; it is what neutralization produces along with water",
      ["any white crystalline solid", "a compound that always tastes salty", "an acid that has lost its hydrogen to a metal"],
      "Table salt (NaCl) is one example of a huge class: salts are the ionic products of neutralization, pairing the base's cation with the acid's anion. Many are not white and none should ever be tasted in a lab.", {});
  },
  function () {
    return mcq("When hydrochloric acid is neutralized by potassium hydroxide, the salt formed is",
      "potassium chloride",
      ["potassium hydroxide", "hydrogen chloride", "sodium chloride"],
      "Take the base's cation (potassium) and the acid's anion (chloride): potassium chloride, plus water. Naming the salt is a naming-system question wearing a reaction costume.", {});
  },
  function () {
    return mcq("Which substance is a salt used as a fertilizer, formed from nitric acid and ammonia?",
      "Ammonium nitrate",
      ["Sodium nitrate", "Ammonium chloride", "Potassium sulfate"],
      "The acid supplies nitrate and the base (ammonia) supplies ammonium: ammonium nitrate. The name of a neutralization salt is always cation-from-base plus anion-from-acid.", {});
  }
]), ["A salt's name is its recipe: cation from the base, anion from the acid."]);

var S6_NEUT = [
  { acid: "HCl", base: "NaOH", salt: "NaCl", saltName: "sodium chloride", water: 1, note: "HCl + NaOH → NaCl + H2O. One hydrogen and one hydroxide make one water." },
  { acid: "HCl", base: "KOH", salt: "KCl", saltName: "potassium chloride", water: 1, note: "HCl + KOH → KCl + H2O." },
  { acid: "HNO3", base: "NaOH", salt: "NaNO3", saltName: "sodium nitrate", water: 1, note: "HNO3 + NaOH → NaNO3 + H2O." },
  { acid: "H2SO4", base: "Ca(OH)2", salt: "CaSO4", saltName: "calcium sulfate", water: 2, note: "H2SO4 + Ca(OH)2 → CaSO4 + 2 H2O. Two hydrogens and two hydroxides make two waters; the equation is already balanced with ones elsewhere." },
  { acid: "HCl", base: "Mg(OH)2", salt: "MgCl2", saltName: "magnesium chloride", water: 2, note: "2 HCl + Mg(OH)2 → MgCl2 + 2 H2O. The magnesium needs two chlorides, so two acid units are required." },
  { acid: "H2SO4", base: "NaOH", salt: "Na2SO4", saltName: "sodium sulfate", water: 2, note: "H2SO4 + 2 NaOH → Na2SO4 + 2 H2O. Two sodiums are needed for the sulfate salt, so two base units and two waters." }
];
E("sci-u2-neut-equation", 2, ["SC10.8.5"], 2, "gen", function () {
  var it = s6pick(S6_NEUT);
  var ask = s6pick(["salt", "water"]);
  if (ask === "salt") {
    var others = s6shuf(S6_NEUT.filter(function (x) { return x !== it; })).slice(0, 3);
    return mcq("An acid and a base react: " + s6fsub(it.acid) + " + " + s6fsub(it.base) + " → ? + ? What salt is formed (along with water)?",
      it.saltName + " (" + s6fsub(it.salt) + ")", others.map(function (x) { return x.saltName + " (" + s6fsub(x.salt) + ")"; }),
      "Neutralization swaps the partners: the base's cation joins the acid's anion. " + it.note,
      { ask: ask, salt: it.salt });
  }
  return mcq("An acid and a base react: " + s6fsub(it.acid) + " + " + s6fsub(it.base) + " → salt + water. When the equation is balanced, the coefficient of water is",
    String(it.water), s6numDist(it.water, [1, 2, 3].filter(function (x) { return x !== it.water; }).concat([4]), ""),
    "Count the hydrogens the acid supplies and the hydroxides the base supplies: each H with an OH makes one H2O. " + it.note,
    { ask: ask, water: it.water });
}, ["Build the salt from the base's cation and the acid's anion; the waters come from matching H with OH."]);

E("sci-u2-neut-apps", 2, ["SC10.8.5"], 2, "var", varset([
  function () {
    return mcq("Antacid tablets contain bases such as magnesium hydroxide. They relieve heartburn by",
      "neutralizing some of the excess hydrochloric acid in the stomach, raising its pH toward a comfortable level",
      ["coating the stomach so acid cannot touch it", "stopping the stomach from producing acid permanently", "diluting the acid with the water in the tablet"],
      "Heartburn is excess stomach acid reaching the esophagus. The antacid base reacts with the acid (neutralization), consuming hydrogen ions and lifting the pH. It treats the excess, not the acid production itself.", {});
  },
  function () {
    return mcq("Farmers spread crushed limestone (calcium carbonate) on fields with acidic soil. The limestone helps because it",
      "reacts with and neutralizes some of the soil's acidity, moving the pH toward neutral where crops grow best",
      ["adds acid to balance the soil", "kills all organisms in the soil", "changes the soil's colour so it absorbs more sunlight"],
      "Limestone is a base in this context (a carbonate that consumes hydrogen ions). Liming is an industrial-scale neutralization, the same chemistry as the antacid, applied to a field.", {});
  },
  function () {
    return mcq("A factory must treat acidic wastewater before releasing it into a river. The correct treatment is to",
      "add a base in controlled amounts until the wastewater is near neutral (pH around 7)",
      ["add more acid so the river cannot change it further", "heat the wastewater until the acid evaporates", "release it at night when fewer organisms are active"],
      "Neutralization is the only option that removes the acidity itself: base plus acid gives a salt plus water. Dilution and timing do not change the total acid load the river receives.", {});
  },
  function () {
    return mcq("Bee stings inject a mild acid, and a traditional remedy applies baking soda paste. Wasp stings are alkaline, and vinegar is applied. The logic in both cases is",
      "neutralization: apply the opposite character (a mild base for the acid sting, a mild acid for the alkaline sting)",
      ["the paste smothers the sting so air cannot reach it", "both remedies work by cooling the skin", "the remedies dissolve the sting under the skin"],
      "Acid sting plus mild base, alkaline sting plus mild acid: each remedy is a small neutralization chosen to oppose the sting's chemistry.", {});
  }
]), ["Every application is the same reaction in different clothes: acid plus base, chosen to oppose the problem's character."]);

E("sci-u2-neut-reason", 2, ["SC10.8.5"], 3, "var", varset([
  function () {
    return mcq("Acid rain (pH about 4.5) falls on a limestone lake bed and the lake's pH stays near 6.5, while a nearby granite-bed lake falls to pH 5.0. The limestone lake is protected because",
      "the carbonate in the limestone neutralizes incoming acid, consuming hydrogen ions before they can lower the lake's pH much",
      ["limestone reflects the rain back into the clouds", "granite produces extra acid that adds to the rain", "the limestone lake is deeper, and depth alone sets pH"],
      "This is buffering by neutralization: CaCO3 reacts with the acid (producing a calcium salt, water and carbon dioxide), spending the acid on the rock instead of on the lake. Granite has no such chemistry to offer.", {});
  },
  function () {
    return mcq("A student neutralizes 25 mL of an acid with a base and reports the products are 'just water'. The report is wrong because",
      "a salt is also formed and remains dissolved in the water; evaporating the water would leave it behind",
      ["neutralization produces no water at all", "the acid disappears completely from the universe", "the base is still present unchanged at the end"],
      "Acid plus base gives salt plus water, always both. The salt is invisible only because it is dissolved; evaporation reveals it. Matter is conserved, so the acid's anion and the base's cation must be somewhere: they are the salt.", {});
  },
  function () {
    return mcq("Equal volumes of two acids are tested: Acid X at pH 1 and Acid Y at pH 3. Equal volumes of the same base are added to each. Which result is expected?",
      "Acid X needs roughly 100 times as much base to neutralize, so the added base will neutralize Y but leave X still strongly acidic",
      ["Both are neutralized, because equal volumes of base neutralize equal volumes of any acid", "Acid Y needs more base because weaker acids resist neutralization", "Neither can be predicted from pH at all"],
      "pH 1 versus pH 3 is a hundredfold difference in hydrogen ion concentration (two logarithmic steps). The base supply that handles Y is nowhere near enough for X. Equal volumes do not mean equal amounts of acid.", {});
  }
]), ["Neutralization is quantitative: count the hydrogen ions and the hydroxides, and remember the salt in the beaker."]);

/* ---------- SC10.8.6 Reaction rates ---------- */

E("sci-u2-rates-factors", 2, ["SC10.8.6"], 1, "var", varset([
  function () {
    return mcq("Which change would make a reaction between a solid and a liquid proceed FASTER?",
      "Crush the solid into a powder, increasing its surface area",
      ["Use one large lump of the solid", "Cool the mixture in ice", "Dilute the liquid with extra water"],
      "Powder exposes far more surface for collisions per second. A lump hides most of its particles inside, cooling slows particles down, and diluting spreads the liquid's particles thinner: all three slow the reaction.", {});
  },
  function () {
    return mcq("The five factors that change reaction rate studied in this course are",
      "temperature, surface area, concentration, catalyst and the nature of the reactants (including light for some reactions)",
      ["mass, volume, colour, density and pressure only", "the size of the container and the brand of chemicals", "stirring speed alone"],
      "Rate is controlled by anything that changes how often and how effectively particles collide: hotter (faster particles), more surface, more concentrated, a catalyst's lower-energy pathway, and the reactants' own nature.", {});
  },
  function () {
    return mcq("Milk sours faster on a warm counter than in a refrigerator. The best explanation is",
      "higher temperature: the particles move faster, collide more often and collide with more energy, so the souring reactions run faster",
      ["the refrigerator's darkness stops all chemistry", "cold milk has fewer bacteria because cold kills instantly at 4 °C", "warm air pushes the milk particles apart"],
      "Temperature is the rate factor at work. Refrigeration does not stop reactions or sterilize the milk; it slows particle motion enough that the same reactions take much longer.", {});
  }
]), ["Rate rises with anything that makes collisions more frequent or more effective."]);

E("sci-u2-collision", 2, ["SC10.8.6"], 2, "var", varset([
  function () {
    return mcq("According to collision theory, a reaction happens when particles",
      "collide with enough energy and the right orientation to break and rearrange bonds",
      ["touch each other gently at any speed", "collide any number of times, regardless of energy", "are heated until they melt"],
      "Most collisions do nothing: the particles bounce off unchanged. Only collisions with energy at or above the activation energy, and a workable orientation, rearrange bonds into products.", {});
  },
  function () {
    return mcq("Raising the concentration of a reactant speeds a reaction because",
      "with more particles in the same volume, collisions happen more frequently",
      ["each particle gains extra energy from its neighbours", "the activation energy of the reaction drops", "the particles become smaller"],
      "Concentration works through collision frequency alone: same energy per particle, same activation energy, but more encounters per second means more successful reactions per second.", {});
  },
  function () {
    return mcq("A catalyst speeds up a reaction by",
      "providing an alternative pathway with a lower activation energy, and it is not used up in the reaction",
      ["being consumed and turning into extra product", "raising the temperature of the mixture automatically", "increasing the concentration of the reactants permanently"],
      "The catalyst opens an easier route over a lower energy barrier, so a bigger fraction of collisions succeed. It emerges unchanged at the end, which is why a small amount can process a lot of reactant.", {});
  }
]), ["Collisions are the currency: rate factors all work by changing collision frequency, collision energy, or the energy a collision needs."]);

E("sci-u2-rate-scenarios", 2, ["SC10.8.6"], 2, "gen", function () {
  var sc = [
    { setup: "Two identical antacid tablets are dropped into equal volumes of water. One tablet is whole; the other is crushed to powder first. Both fizz until they disappear.",
      ask: "Which tablet finishes first, and why?",
      key: "The crushed tablet: powdering hugely increases surface area, so far more particles are exposed to collisions each second",
      dis: ["The whole tablet: its particles are packed tighter, which speeds reactions", "They finish together: the masses are equal, so the rates must be equal", "The whole tablet: powder particles dissolve into the water and are lost"],
      why: "Equal masses can react at very different rates. Surface area decides how many solid particles are available at the surface for collisions, and the powder wins by a wide margin despite identical mass and temperature." },
    { setup: "Zinc reacts with hydrochloric acid, producing hydrogen gas. Trial 1 uses acid labelled 1.0 mol/L; Trial 2 uses acid labelled 3.0 mol/L, with everything else identical.",
      ask: "Which trial bubbles faster at the start?",
      key: "Trial 2: the more concentrated acid packs three times as many acid particles into each volume, so collisions with the zinc are far more frequent",
      dis: ["Trial 1: dilute acid soaks into the metal better", "Both start equally: the zinc amount is the same in each", "Trial 1: concentrated acid particles crowd each other and cannot move"],
      why: "Concentration is collision frequency. Triple the particles per litre means roughly triple the collision rate at the metal surface, so hydrogen forms faster from the first seconds." },
    { setup: "Hydrogen peroxide decomposes slowly in a dark bottle, releasing oxygen. The rate is much slower in the dark than on a sunny windowsill, even at the same temperature.",
      ask: "What factor explains the difference?",
      key: "Light: for this reaction, light energy helps particles clear the activation energy, so decomposition speeds up in sunlight",
      dis: ["Concentration: sunlight concentrates the peroxide", "A catalyst: the glass bottle catalyzes the reaction in light", "Surface area: the windowsill exposes more of the bottle"],
      why: "Some reactions are light-sensitive: photons supply activation energy. That is why peroxide is sold in dark bottles. Temperature, concentration and amount are all unchanged between the two spots." },
    { setup: "A glow stick glows brightly in warm water and dimly in ice water.",
      ask: "What does this show about temperature and reaction rate?",
      key: "The reaction inside runs faster when warm: brighter glow means product (and light) forming faster, matching collision theory's prediction for hotter, faster particles",
      dis: ["Warm water melts the chemicals so they can finally mix", "Cold water absorbs the light before it can escape", "The glow chemicals evaporate in warm water and glow in the air"],
      why: "Brightness tracks the rate of the light-producing reaction. Warmth speeds the particles, raising both collision frequency and collision energy; ice water slows both, and the glow fades accordingly." }
  ];
  var it = s6pick(sc);
  return mcq(it.setup + " " + it.ask, it.key, it.dis, it.why, { setup: it.setup.slice(0, 40) });
}, ["Name the factor first (temperature, surface area, concentration, catalyst, light, nature), then tell the collision story."]);

E("sci-u2-rates-curve", 2, ["SC10.8.6"], 3, "gen", function () {
  var specs = [
    { name: "crushed solid, concentrated acid, warm", k: 3.4 },
    { name: "crushed solid, dilute acid, warm", k: 2.2 },
    { name: "lumps, concentrated acid, warm", k: 1.2 },
    { name: "lumps, dilute acid, cold", k: 0.5 }
  ];
  var L = s6shuf(["A", "B", "C", "D"]);
  var lines = specs.map(function (s, i) {
    var kk = s.k;
    return { fn: function (x) { return 60 * (1 - Math.exp(-kk * x / 40)); }, col: [S6_INK, S6_ACC, S6_ALT, S6_BLUE][i], label: L[i], labelPt: [38, 60 * (1 - Math.exp(-kk * 38 / 40)) + 3] };
  });
  var fig = s6GraphSVG({ xMax: 40, yMax: 70, xStep: 10, yStep: 10, xLab: "time (s)", yLab: "gas produced (mL)", lines: lines });
  var mode = s6pick(["fastest", "conditions", "plateau"]);
  var fastestLetter = L[0], slowestLetter = L[3];
  var q;
  if (mode === "fastest") {
    q = mcq("Four trials of the same gas-producing reaction were run under different conditions. Which curve shows the FASTEST reaction?",
      "Curve " + fastestLetter, ["Curve " + L[1], "Curve " + L[2], "Curve " + slowestLetter],
      "The fastest reaction produces gas quickest, so its curve climbs steepest and levels off first. Curve " + fastestLetter + " (" + specs[0].name + ") rises fastest; curve " + slowestLetter + " (" + specs[3].name + ") is the slowest combination.", { mode: mode });
  } else if (mode === "conditions") {
    q = mcq("Curve " + slowestLetter + " is the slowest of the four trials. Which conditions does it most likely represent?",
      "Lumps of solid in dilute acid, kept cold",
      ["Powdered solid in concentrated acid, kept warm", "Powdered solid in dilute acid, kept warm", "Lumps of solid in concentrated acid, kept warm"],
      "The slowest curve combines every rate-lowering choice: least surface area (lumps), lowest concentration (dilute) and lowest temperature (cold). Curve " + slowestLetter + " climbs the most gently of the four.", { mode: mode });
  } else {
    q = mcq("All four curves level off at the same height (about 60 mL). What does the shared plateau mean?",
      "Each trial produced the same total amount of gas: the same amount of reactant was used up in each; only the speed differed",
      ["The reactions stopped because the containers filled with pressure", "The measuring cylinders all broke at 60 mL", "Each reaction reversed at 60 mL and began consuming gas"],
      "The plateau is the finish line: reactant exhausted. Conditions change how fast the line is reached, not where it sits, because each trial started with the same amount of the limiting reactant.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Steepness is speed on a product-versus-time graph. The plateau height is the total amount, set by how much reactant you started with."]);

E("sci-u2-catalyst-curve", 2, ["SC10.8.6"], 3, "gen", function () {
  var w = 380, h = 240, x0 = 50, y0 = 200, x1 = 350, y1 = 30;
  function X(f) { return x0 + (x1 - x0) * f; }
  function Y(v) { return y0 - (y0 - y1) * (v / 100); }
  var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="380" role="img" aria-label="Energy diagram with and without catalyst">';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#888"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#888"/>';
  s += s6txt(X(0.99), y0 + 16, "reaction progress", 11, false, "end");
  s += s6txt(x0 - 6, Y(98), "energy", 11, false, "end");
  s += '<path d="M ' + X(0.02) + ' ' + Y(38) + ' C ' + X(0.25) + ' ' + Y(38) + ', ' + X(0.33) + ' ' + Y(88) + ', ' + X(0.5) + ' ' + Y(90) + ' C ' + X(0.68) + ' ' + Y(92) + ', ' + X(0.75) + ' ' + Y(60) + ', ' + X(0.97) + ' ' + Y(58) + '" fill="none" stroke="' + S6_INK + '" stroke-width="2.4"/>';
  s += '<path d="M ' + X(0.02) + ' ' + Y(38) + ' C ' + X(0.25) + ' ' + Y(38) + ', ' + X(0.35) + ' ' + Y(62) + ', ' + X(0.5) + ' ' + Y(64) + ' C ' + X(0.66) + ' ' + Y(66) + ', ' + X(0.75) + ' ' + Y(60) + ', ' + X(0.97) + ' ' + Y(58) + '" fill="none" stroke="' + S6_ACC + '" stroke-width="2.4" stroke-dasharray="6 4"/>';
  s += s6txt(X(0.30), Y(95), "without catalyst", 11);
  s += s6txt(X(0.30), Y(48), "with catalyst (dashed)", 11, false, "middle", S6_ACC);
  s += s6txt(X(0.06), Y(30), "reactants", 11);
  s += s6txt(X(0.82), Y(70), "products", 11);
  s += "</svg>";
  var mode = s6pick(["barrier", "energy"]);
  var q;
  if (mode === "barrier") {
    q = mcq("The diagram shows the energy pathway of a reaction with and without a catalyst. The catalyst works because the dashed pathway",
      "has a lower hump (lower activation energy), so more collisions have enough energy to succeed",
      ["starts from higher-energy reactants", "ends at lower-energy products", "removes the hump completely so no energy is needed"],
      "A catalyst changes the route, not the endpoints: reactants and products sit at the same energies on both curves. Only the barrier between them drops, letting a larger fraction of collisions succeed.", { mode: mode });
  } else {
    q = mcq("On the energy diagram, the reactants and products sit at exactly the same heights on both the solid and dashed curves. This shows that a catalyst",
      "does not change the overall energy change of the reaction, only how fast equilibrium amounts are reached",
      ["makes the reaction release more energy overall", "turns an endothermic reaction into an exothermic one", "stores the saved energy inside itself permanently"],
      "Endpoints identical means the energy difference between reactants and products is identical. The catalyst is a shortcut over the hill, not a change of destination, and it is regenerated unchanged.", { mode: mode });
  }
  q.figure = s;
  return q;
}, ["On an energy diagram, compare the hump (activation energy) and the endpoints (overall change). A catalyst moves only the hump."]);

E("sci-u2-rates-experiment", 2, ["SC10.8.6"], 3, "var", varset([
  function () {
    return mcq("A student times how long magnesium ribbon takes to disappear in acid. In Trial 1 the acid is at 20 °C; in Trial 2 at 40 °C; in Trial 3 at 40 °C but the ribbon is cut into small pieces. Which comparison isolates the effect of surface area alone?",
      "Trial 2 versus Trial 3: same temperature and acid, only the ribbon's form changes",
      ["Trial 1 versus Trial 2: only temperature changes there", "Trial 1 versus Trial 3: the biggest difference shows the biggest effect", "All three trials compared at once give the cleanest answer"],
      "A fair test changes one variable at a time. Trials 2 and 3 share temperature and acid concentration, differing only in the ribbon's surface area, so any time difference belongs to surface area alone. Trial 1 versus 3 changes two variables at once and proves nothing cleanly.", {});
  },
  function () {
    return mcq("Enzymes in the human body are catalysts. A high fever is dangerous partly because",
      "at temperatures well above 37 °C, enzyme molecules lose their shape and stop catalyzing, so essential reactions slow drastically",
      ["enzymes evaporate from the blood", "all reactions stop instantly at 40 °C", "the body runs out of activation energy"],
      "Biological catalysts are proteins folded into precise shapes; the pathway they offer depends on that shape. Excess heat unfolds (denatures) them, removing the low-energy route for reactions the body cannot do without. Rate and catalyst shape are the same story told twice.", {});
  }
]), ["Design questions are variable questions: find the pair of trials that differ in exactly one factor."]);

/* ---------- WHMIS (Unit 2 safety, tagged with 8.1 per the analysis) ---------- */

E("sci-u2-whmis-symbols", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("A container in the lab carries a WHMIS pictogram showing a flame. The hazard is that the contents are",
      "flammable: they can catch fire easily and must be kept away from heat and sparks",
      ["corrosive to skin and metal", "a health hazard affecting the lungs over time", "compressed gas under pressure"],
      "The flame pictogram means flammable (gases, liquids or solids, and materials that can ignite in air). Each WHMIS pictogram is a picture of its hazard: flame for fire, test tubes dripping for corrosion, a cylinder for compressed gas.", {});
  },
  function () {
    return mcq("The WHMIS pictogram showing a picture of a skull and crossbones means",
      "acute toxicity: the substance can cause death or serious harm from a small exposure",
      ["the substance is explosive", "the substance is harmful only to fish and aquatic life", "the substance is a mild skin irritant only"],
      "Skull and crossbones is the most serious immediate-health warning in the system: fatal or toxic if swallowed, inhaled or absorbed through skin. It demands the strictest handling in the room.", {});
  },
  function () {
    return mcq("A pictogram shows liquid dripping from test tubes onto a hand and a surface, eating into both. This warns that the substance is",
      "corrosive: it can burn skin and eyes and damage materials on contact",
      ["flammable", "an oxidizer that feeds fires", "radioactive"],
      "The corrosion pictogram shows the damage itself: drips eating into skin and metal. Corrosives like strong acids and bases carry it, which ties straight back to the acids and bases work in this unit.", {});
  },
  function () {
    return mcq("The exclamation mark pictogram on a lab container indicates",
      "a less severe health hazard, such as skin or eye irritation or skin sensitization",
      ["an explosive material", "a gas under pressure", "a substance fatal in small doses"],
      "The exclamation mark flags the lower-severity health hazards: irritation, allergic skin reaction, drowsiness. It still means read the label and handle with care, but it is a step below the skull and crossbones.", {});
  }
]), ["Read the picture literally: each WHMIS pictogram draws its own hazard."]);

E("sci-u2-whmis-safety", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("Before using any chemical in the lab, the first safety step is to",
      "read its label (and SDS when needed) for the WHMIS pictograms, hazard statements and precautions",
      ["smell it cautiously to identify it", "mix a small amount with water to see what happens", "check its colour against a wall chart"],
      "The label is the contract: pictograms, signal word, hazard and precautionary statements tell you the risks and the handling before you open the container. Never identify a chemical by smell or taste, and never test-react an unknown.", {});
  },
  function () {
    return mcq("A student gets a splash of a corrosive liquid on their skin. The correct immediate action is to",
      "flush the skin with plenty of water at the safety station right away and tell the teacher",
      ["wipe it off with a paper towel and continue working", "apply a neutralizing chemical from the shelf to the skin", "wait until the end of class to mention it"],
      "Water, immediately and in quantity, dilutes and carries the corrosive away; seconds matter with burns. Neutralizers are for benches and spills under teacher direction, never for skin, and delay makes chemical burns worse.", {});
  }
]), ["Label first, water first: the two reflexes that prevent most lab injuries."]);

/* ---------- Unit 2 CR ---------- */

E("sci-u2-cr-naming", 2, ["SC10.8.1"], 2, "var", varset([
  function () {
    return textq("Naming and formulas (4 marks)\n(a) Write the chemical formula for calcium nitrate. (1)\n(b) Write the name of the compound with the formula FeCl3. (1)\n(c) Write the chemical formula for copper(II) sulfate. (1)\n(d) A binary molecular compound has the formula P2O5. Write its full name. (1)", ["(a) Ca(NO3)2: calcium is Ca2+ and nitrate is NO3- (charge 1), so two nitrate groups in brackets balance one calcium."], 
      "(a) Ca(NO3)2: calcium is Ca2+ and nitrate is NO3- (charge 1), so two nitrate groups in brackets balance one calcium. (b) Iron(III) chloride: iron is multivalent, and three Cl- (total -3) mean the iron is Fe3+, which the name must state. (c) CuSO4: Cu2+ with SO4 2- cancel one-to-one. (d) Diphosphorus pentoxide: prefixes di- (2) and penta- (5), with the second element ending in -ide.", 
      {});
  },
  function () {
    return textq("Naming and formulas (4 marks)\n(a) Write the chemical formula for ammonium phosphate. (1)\n(b) Write the name of the compound with the formula SnO2. (1)\n(c) Write the chemical formula for magnesium hydroxide. (1)\n(d) A compound has the formula Cu2O. Write its name, including the charge on the metal. (1)", ["(a) (NH4)3PO4: three NH4+ balance one PO4 3-, with brackets around the ammonium."], 
      "(a) (NH4)3PO4: three NH4+ balance one PO4 3-, with brackets around the ammonium. (b) Tin(IV) oxide: two O2- (total -4) require Sn4+. (c) Mg(OH)2: Mg2+ needs two OH- groups, shown with brackets and a subscript 2. (d) Copper(I) oxide: two copper ions balance one O2-, so each copper is Cu+.", 
      {});
  },
  function () {
    return textq("A fictional element (4 marks)\nAvalonium (symbol Av) is a fictional metal that behaves like the Group 2 metals: its atoms form ions with a 2+ charge. Portium (symbol Po) is a fictional nonmetal that behaves like the halogens: its atoms form ions with a 1- charge.\n(a) Write the chemical formula for avalonium chloride. (1)\n(b) Write the chemical formula for avalonium oxide. (1)\n(c) Write the chemical formula for the compound of avalonium with portium, and write its full name. (1)\n(d) State the rule you used to decide each formula. (1)",
      ["(a) AvCl2. (b) AvO. (c) AvPo2, avalonium portide. (d) The total positive charge must equal the total negative charge: cross the ion charges down as subscripts and reduce"],
      "(a) AvCl2: one Av2+ needs two Cl- to balance. (b) AvO: Av2+ and O2- balance one-to-one, and the crossed subscripts (2 and 2) reduce to 1 and 1. (c) AvPo2, named avalonium portide: one Av2+ with two Po-, the nonmetal's name ending in -ide. (d) In every ionic formula the charges must sum to zero: the cation's charge becomes the anion's subscript and the anion's charge becomes the cation's subscript (the cross-over), then subscripts are reduced to the lowest whole-number ratio. The fictional symbols change nothing: the rule is about charges, not about which real elements are involved.",
      {});
  }
]), ["Formulas are written with the cross-over of charges, in lowest terms, with brackets around repeated polyatomic groups."]);

E("sci-u2-cr-balance", 2, ["SC10.8.2", "SC10.8.3"], 3, "var", varset([
  function () {
    return textq("Balancing and classifying (3 marks)\nConsider the unbalanced equation: ___ C3H8 + ___ O2 → ___ CO2 + ___ H2O (propane burning in a barbecue).\n(a) Balance the equation. (1)\n(b) Classify the reaction type and state the evidence. (1)\n(c) Explain, in terms of atoms, why the balanced equation obeys the law of conservation of mass. (1)", ["(a) C3H8 + 5 O2 → 3 CO2 + 4 H2O."], 
      "(a) C3H8 + 5 O2 → 3 CO2 + 4 H2O. (b) Combustion: a fuel reacts with oxygen to produce carbon dioxide and water (it is also an exothermic reaction releasing heat and light). (c) Counting atoms: left side C 3, H 8, O 10; right side C 3, H 8, O 6 + 4 = 10. Identical atom counts on both sides mean nothing is created or destroyed, only rearranged, so the total mass is unchanged.", 
      {});
  },
  function () {
    return textq("Balancing and classifying (3 marks)\nConsider the unbalanced equation: ___ Al + ___ CuCl2 → ___ AlCl3 + ___ Cu.\n(a) Balance the equation. (1)\n(b) Classify the reaction type and explain which element replaces which. (1)\n(c) A student claims the products will weigh less than the reactants because a shiny new metal appears 'from nowhere'. Correct the claim. (1)", ["(a) 2 Al + 3 CuCl2 → 2 AlCl3 + 3 Cu."], 
      "(a) 2 Al + 3 CuCl2 → 2 AlCl3 + 3 Cu. (b) Single replacement: aluminum, the more reactive element, displaces copper from copper(II) chloride; the copper appears as a solid coating. (c) The copper was always there, dissolved as copper ions in the CuCl2. Atoms are conserved (Al 2, Cu 3, Cl 6 on both sides), so the total mass of products equals the total mass of reactants exactly; the metal changed form, not amount.", 
      {});
  }
]), ["Balance by changing coefficients only, never subscripts. Classification evidence comes from the pattern of reactants and products."]);

E("sci-u2-cr-rates", 2, ["SC10.8.6"], 3, "var", varset([
  function () {
    return textq("Reaction rates investigation (3 marks)\nA group investigates how temperature affects the reaction of marble chips (calcium carbonate) with hydrochloric acid, which produces carbon dioxide gas.\n(a) State the factor being changed, and two variables that must be kept the same for a fair test. (1)\n(b) Describe one way to measure the rate of this reaction. (1)\n(c) Using collision theory, explain why the warm acid reacts faster than the cold acid. (1)", ["(a) Changed: temperature of the acid."], 
      "(a) Changed: temperature of the acid. Kept the same (any two): mass and size of marble chips, volume and concentration of acid, same apparatus and timing method. (b) Measure the volume of CO2 collected in a gas syringe over time (or the mass lost on a balance as gas escapes), and compare how much forms in the first minute. (c) In warm acid the particles move faster: they collide with the marble surface more often, and a greater fraction of collisions carry at least the activation energy, so more collisions per second succeed in reacting.", 
      {});
  },
  function () {
    return textq("Reaction rates in the kitchen and the cold room (3 marks)\nFood spoils because of slow reactions driven by microbes and enzymes.\n(a) Explain, using two rate factors, why food kept in a refrigerator spoils more slowly than food left on the counter. (2)\n(b) A cook wants a marinade to flavour meat quickly. Suggest one change, based on rate factors, and explain why it works. (1)", ["(a) Factor 1, temperature: cold particles move slowly, collisions are less frequent and less energetic, so spoilage reactions crawl."], 
      "(a) Factor 1, temperature: cold particles move slowly, collisions are less frequent and less energetic, so spoilage reactions crawl. Factor 2, nature of reactants / catalyst action: cold also keeps microbial enzymes working far below their best rate, slowing the catalyzed spoilage reactions. (Full credit needs the collision story for temperature plus the enzyme point, or an equivalent second mechanism.) (b) Any one: warm the marinade slightly (temperature), cut the meat into smaller pieces (surface area), or use a more concentrated marinade: each raises collision frequency or energy between marinade and meat surfaces.", 
      {});
  }
]), ["Every rate explanation needs the collision story: frequency, energy, or the activation energy barrier."]);

/* ---------- Inventory additions: WHMIS pictogram images, predicting products, identifying unknowns ---------- */

function s6WhmisSVG(kind) {
  var glyph = "";
  if (kind === "flame") {
    glyph = '<path d="M100 62 C 88 84, 76 94, 76 112 a24 22 0 0 0 48 0 C 124 94, 112 84, 100 62 Z M100 96 C 94 106, 90 110, 90 117 a10 9 0 0 0 20 0 C 110 110, 106 106, 100 96 Z" fill="#111"/>';
  } else if (kind === "skull") {
    glyph = '<circle cx="100" cy="88" r="26" fill="#111"/><rect x="86" y="104" width="28" height="10" fill="#111"/>' +
      '<circle cx="90" cy="86" r="6" fill="#fff"/><circle cx="110" cy="86" r="6" fill="#fff"/><rect x="97" y="94" width="6" height="8" fill="#fff"/>' +
      '<line x1="72" y1="126" x2="128" y2="144" stroke="#111" stroke-width="6"/><line x1="128" y1="126" x2="72" y2="144" stroke="#111" stroke-width="6"/>' +
      '<circle cx="70" cy="124" r="6" fill="#111"/><circle cx="130" cy="124" r="6" fill="#111"/><circle cx="70" cy="146" r="6" fill="#111"/><circle cx="130" cy="146" r="6" fill="#111"/>';
  } else if (kind === "corrosion") {
    glyph = '<g stroke="#111" stroke-width="5" fill="none"><path d="M58 58 L88 78"/><path d="M142 58 L112 78"/></g>' +
      '<rect x="50" y="48" width="16" height="8" fill="#111"/><rect x="134" y="48" width="16" height="8" fill="#111"/>' +
      '<circle cx="92" cy="92" r="4" fill="#111"/><circle cx="108" cy="92" r="4" fill="#111"/>' +
      '<rect x="56" y="116" width="40" height="10" fill="#111"/><rect x="104" y="116" width="40" height="10" fill="#111"/>' +
      '<path d="M64 126 l4 14 M84 126 l-2 12 M112 126 l2 12 M132 126 l-4 14" stroke="#111" stroke-width="4"/>';
  } else {
    glyph = '<rect x="94" y="58" width="12" height="56" rx="4" fill="#111"/><circle cx="100" cy="132" r="8" fill="#111"/>';
  }
  var pts = [];
  for (var i = 0; i < 8; i++) {
    var a = Math.PI / 8 + i * Math.PI / 4;
    pts.push((100 + 78 * Math.cos(a)).toFixed(1) + "," + (100 + 78 * Math.sin(a)).toFixed(1));
  }
  return '<svg viewBox="0 0 200 200" width="170" role="img" aria-label="WHMIS pictogram"><polygon points="' + pts.join(" ") + '" fill="#fff" stroke="#d42a24" stroke-width="10"/>' + glyph + "</svg>";
}
var S6_WHMIS_IMG = [
  { kind: "flame", ans: "Flammable: the contents can catch fire easily", others: ["Corrosive: the contents eat into skin and metal on contact", "Acute toxicity: a small exposure can be fatal", "Health hazard: the contents irritate skin and eyes"], why: "The flame inside the red octagon is the flammable pictogram: keep the material away from heat, sparks and open flame." },
  { kind: "skull", ans: "Acute toxicity: even a small exposure can cause death or serious harm", others: ["Flammable: the contents can catch fire easily", "Corrosive: the contents eat into skin and metal on contact", "Health hazard: the contents irritate skin and eyes"], why: "Skull and crossbones is the most serious immediate warning in WHMIS: fatal or toxic if swallowed, inhaled or absorbed." },
  { kind: "corrosion", ans: "Corrosive: the contents can burn skin and eyes and damage materials", others: ["Flammable: the contents can catch fire easily", "Acute toxicity: even a small exposure can be fatal", "Explosive: the contents can detonate"], why: "The pictogram shows liquid dripping from test tubes and eating into a surface and a hand: corrosion." },
  { kind: "exclaim", ans: "Health hazard: the contents can irritate skin or eyes or cause an allergic skin reaction", others: ["Acute toxicity: even a small exposure can be fatal", "Flammable: the contents can catch fire easily", "Corrosive: the contents eat into skin and metal on contact"], why: "The exclamation mark flags the less severe health hazards: irritation and sensitization. Serious does not mean ignorable; it means read the label and handle with care." }
];
E("sci-u2-whmis-images", 2, ["SC10.8.1"], 1, "gen", function () {
  var it = s6pick(S6_WHMIS_IMG);
  var q = mcq("A container in the science lab carries the WHMIS pictogram shown. It warns that",
    it.ans, it.others, it.why, { kind: it.kind });
  q.figure = s6WhmisSVG(it.kind);
  return q;
}, ["Match the picture to the hazard it draws: flame, skull, dripping tubes, exclamation mark."]);

E("sci-u2-products", 2, ["SC10.8.3"], 2, "gen", function () {
  var d = s6classDraw(function () { return true; });
  var left = s6eqText2(d.item.r, [], d.co, -1).replace(/\s*→\s*$/, "");
  var rightTxt = s6eqText2([], d.prods, d.co, -1).replace(/^\s*→\s*/, "");
  var right = d.co.slice(d.item.r.length).map(function (c, i) {
    var nm = s6disp(d.prods[i]);
    return (c > 1 ? c + " " : "") + nm;
  }).join(" + ");
  var wrongSets = [];
  var others = s6shuf(S6_CLASSIFY.filter(function (x) { return x !== d.item; }));
  for (var i = 0; i < others.length && wrongSets.length < 3; i++) {
    var o = others[i];
    var opr = o.extra ? o.p.concat(o.extra) : o.p;
    var oc = s6balance(o.r, opr);
    if (!oc) continue;
    var ot = oc.slice(o.r.length).map(function (c, j) { return (c > 1 ? c + " " : "") + s6disp(opr[j]); }).join(" + ");
    if (ot !== right && wrongSets.indexOf(ot) < 0) wrongSets.push(ot);
  }
  var eqFull = s6eqText2(d.item.r, d.prods, d.co, -1);
  return mcq("Predict the products: " + left + " → ? The reaction is a " + d.item.t + " reaction. The products are",
    right, wrongSets,
    "Follow the " + d.item.t + " pattern and balance: the full equation is " + eqFull + ".",
    { left: left, t: d.item.t });
}, ["Read the reaction type off the reactants, build the products from the pattern, then check the balance."]);

E("sci-u2-identify", 2, ["SC10.8.1"], 2, "var", varset([
  function () {
    return mcq("An unknown white solid does not conduct electricity as a solid OR when dissolved in water, and it melts at a low temperature. The compound is most likely",
      "a molecular compound (such as sugar): its neutral molecules carry no charge in any state",
      ["an ionic compound: its ions are locked in place until it melts", "a metal: its electrons are shared in a lattice", "an acid: it must produce hydrogen ions in water"],
      "No conduction in either state rules out ions entirely: ionic compounds conduct once their ions are free (molten or dissolved). Charge-free molecules explain both observations and the low melting point fits weak intermolecular forces.", {});
  },
  function () {
    return mcq("A dissolved sample is tested: it conducts electricity, turns blue litmus red, and fizzes with magnesium ribbon. The sample is",
      "an acid solution (such as dilute hydrochloric acid)",
      ["a base solution (such as sodium hydroxide)", "a salt solution (such as sodium chloride)", "a molecular compound that does not ionize (such as sugar)"],
      "Three tests, one conclusion: conduction says ions are present, blue-to-red litmus says acid, and hydrogen gas from a metal confirms it. A salt solution conducts but leaves litmus unchanged; a base flips litmus the other way.", {});
  },
  function () {
    return mcq("Two unlabelled bottles hold white powders: sodium chloride and glucose (a molecular compound). The safest distinguishing test is to",
      "dissolve each in distilled water and test the solutions with a conductivity tester: the salt solution conducts, the glucose solution does not",
      ["taste a tiny amount of each", "heat both until they decompose and compare the smells", "add acid to both and watch for fizzing"],
      "Ionic versus molecular shows up cleanly in solution conductivity: NaCl releases ions, glucose stays as neutral molecules. Tasting unknown chemicals is never an option, and both powders survive gentle tests without telling you anything as clear.", {});
  }
]), ["Let the properties vote: conduction sorts ionic from molecular, litmus sorts acid from base from neutral."]);

/* ---------- Unit 2 top-ups ---------- */

E("sci-u2-symbolic-read", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The equation 2 H2 + O2 → 2 H2O is read aloud correctly as",
      "'Two molecules of hydrogen react with one molecule of oxygen to produce two molecules of water'",
      ["'Two atoms of hydrogen react with oxygen to produce water'", "'Hydrogen and oxygen produce hydrogen peroxide'", "'Two grams of hydrogen react with one gram of oxygen'"],
      "Coefficients count molecules (or moles) of each substance, not atoms and not grams: the 2 in front of H2 doubles the whole H2 molecule. Subscripts belong to the formulas and are never read as quantities reacting.", {});
  },
  function () {
    return mcq("In the equation CH4 + 2 O2 → CO2 + 2 H2O, the coefficient 2 in front of O2 means",
      "two molecules of oxygen take part for every one molecule of methane burned",
      ["each oxygen molecule contains two atoms", "two grams of oxygen are needed", "the oxygen is twice as reactive as the methane"],
      "Coefficients are the recipe ratio between substances. The subscript in O2 (the 2 inside the formula) is the one that says two atoms per molecule; the coefficient outside multiplies whole molecules.", {});
  }
]), ["Coefficients count whole molecules in the recipe; subscripts live inside a formula and describe its makeup."]);

E("sci-u2-states", 2, ["SC10.8.2"], 1, "var", varset([
  function () {
    return mcq("In the equation AgNO3(aq) + NaCl(aq) → AgCl(s) + NaNO3(aq), the state symbols tell you that",
      "the silver chloride forms as a solid precipitate, while the other substances are dissolved in water (aqueous)",
      ["all four substances are gases", "the (s) substance is a solution", "the (aq) substances are pure liquids"],
      "(aq) means aqueous: dissolved in water. (s) is solid, and a solid appearing from two clear solutions is a precipitate, the visual evidence of this double replacement reaction.", {});
  },
  function () {
    return mcq("Which state symbol set is written correctly?",
      "H2O(l) for liquid water, CO2(g) for carbon dioxide gas, NaCl(s) for solid salt, NaCl(aq) for salt solution",
      ["H2O(g) for the water in a beaker", "CO2(s) for the gas in a soda", "NaCl(aq) for dry table salt in a shaker"],
      "(s), (l), (g) and (aq) describe the physical state in the reaction as written: beaker water is liquid, soda bubbles are gas, shaker salt is a dry solid, and (aq) requires actual water as the solvent.", {});
  }
]), ["State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water."]);

E("sci-u2-acid-rain", 2, ["SC10.8.5"], 3, "var", varset([
  function () {
    return mcq("Acid rain forms when sulfur dioxide and nitrogen oxides from burning fossil fuels react with water in the atmosphere to make sulfuric and nitric acids. In Newfoundland and Labrador the damage is worse than the emissions alone would suggest because",
      "much of the province's bedrock is granite with little carbonate, so soils and lakes have almost no natural base to neutralize the incoming acid",
      ["the province receives more rain than anywhere else on Earth", "the acids become stronger in cold climates", "local lakes contain no organisms to absorb the acid"],
      "Neutralization capacity (buffering) is geology: limestone country spends the acid on rock, granite country cannot. The same deposition that a limestone lake shrugs off acidifies a granite-bed lake, which is why monitoring here watches lake pH closely.", {});
  },
  function () {
    return mcq("A lake's pH has fallen from 6.5 to 5.0 over twenty years of acid deposition. The hydrogen ion concentration has",
      "increased by a factor of about 30 (1.5 pH units of change, at tenfold per unit)",
      ["increased by a factor of 1.5", "decreased by a factor of 30", "stayed the same: only the reading changed"],
      "Each pH unit is a tenfold step: 1 unit is x10, and the extra half unit multiplies by about 3 more, giving roughly x30. Small-looking pH changes are large chemistry changes, which is why a drop of 1.5 units transforms a lake's biology.", {});
  }
]), ["Acid rain is a neutralization problem written across a whole landscape: the damage depends on what base the land can offer."]);

E("sci-u2-ion-count", 2, ["SC10.8.1"], 2, "gen", function () {
  var items = [
    { f: "Ca(OH)2", ion: "hydroxide ions", n: 2, why: "The subscript 2 outside the brackets applies to the whole OH group: 2 hydroxide ions per formula unit (and 1 calcium ion)." },
    { f: "Al2(SO4)3", ion: "sulfate ions", n: 3, why: "The bracket subscript gives 3 sulfate ions; the Al subscript gives 2 aluminum ions." },
    { f: "(NH4)3PO4", ion: "ammonium ions", n: 3, why: "Three NH4+ groups balance the one PO4 3-: 3 ammonium ions per formula unit." },
    { f: "Mg(NO3)2", ion: "nitrate ions", n: 2, why: "Two nitrate groups for the one Mg2+: the bracket subscript 2 is the count." },
    { f: "Na2CO3", ion: "sodium ions", n: 2, why: "The subscript on Na is 2: two sodium ions for each carbonate." },
    { f: "Fe2O3", ion: "iron ions", n: 2, why: "The subscript 2 after Fe counts 2 iron ions (each Fe3+, balancing 3 O2-)." }
  ];
  var it = s6pick(items);
  return mcq("How many " + it.ion + " are in one formula unit of " + s6fsub(it.f) + "?",
    String(it.n), s6numDist(it.n, [it.n + 1, it.n + 2, Math.max(1, it.n - 1)], ""),
    it.why + " Bracket subscripts multiply everything inside the brackets; plain subscripts multiply only their own element or ion.", { f: it.f, n: it.n });
}, ["Read brackets as packages: the outside subscript counts whole packages."]);

/* ----- bank-u3.js ----- */
// CRMARKS: sci-u3-cr-trip=4
// CRMARKS: sci-u3-cr-dtgraph=3
// CRMARKS: sci-u3-cr-vtgraph=3
/* Science 1206 Unit 3: Motion (SC10.8.7 to 8.12). */
/* Appendix A significant figures are enforced: calculation answers carry the fewest sig figs of the measurements used. */

/* ---------- SC10.8.7 Measurement and significant figures ---------- */

var S6_SFNUMS = [
  { s: "0.00450", n: 3, why: "Leading zeros never count; the trailing zero after the 5 counts because a decimal point is present: 4, 5, 0 = 3." },
  { s: "3.060", n: 4, why: "The captive zero between digits counts, and the trailing zero counts (decimal point shown): 3, 0, 6, 0 = 4." },
  { s: "1200", n: 2, why: "With no decimal point shown, trailing zeros do not count: only 1 and 2 = 2 significant figures (as written in this course)." },
  { s: "1200.", n: 4, why: "The decimal point at the end is shown deliberately, so the trailing zeros count: all four digits = 4." },
  { s: "45.0", n: 3, why: "The zero after the decimal counts (decimal point present): 4, 5, 0 = 3." },
  { s: "700", n: 1, why: "No decimal point shown: only the 7 counts = 1 significant figure." },
  { s: "0.0208", n: 3, why: "Leading zeros are placeholders only: 2, 0, 8 count = 3 (the middle zero is captive)." },
  { s: "506.05", n: 5, why: "Every digit counts here: both zeros are captive (trapped between nonzero digits) = 5." },
  { s: "9.80", n: 3, why: "The trailing zero counts because the decimal point is present: 9, 8, 0 = 3." },
  { s: "0.0007", n: 1, why: "All the zeros are leading placeholders: only the 7 counts = 1." }
];
E("sci-u3-sigfigs-count", 3, ["SC10.8.7"], 1, "gen", function () {
  var it = s6pick(S6_SFNUMS);
  var opts = [it.n];
  [it.n + 1, it.n - 1, it.n + 2, it.n + 3, it.n - 2].forEach(function (v) { if (v >= 1 && opts.indexOf(v) < 0) opts.push(v); });
  var q = mcq("How many significant figures are in the measurement " + it.s + "?",
    String(it.n), opts.slice(1, 4).map(String),
    it.why + " Rules (Appendix A): nonzero digits always count, captive zeros count, leading zeros never count, trailing zeros count only when a decimal point is shown.",
    { s: it.s, n: it.n });
  return q;
}, ["Count by the rules, not by the number of digits printed: zeros are the whole game."]);

E("sci-u3-sigfigs-round", 3, ["SC10.8.7"], 2, "gen", function () {
  var cases = [
    { v: 4.6735, n: 3 }, { v: 0.02846, n: 2 }, { v: 13.75, n: 3 }, { v: 256.8, n: 2 },
    { v: 0.9046, n: 3 }, { v: 78.345, n: 4 }, { v: 5.096, n: 2 }, { v: 0.006318, n: 3 }
  ];
  var c = s6pick(cases);
  var key = s6roundSF(c.v, c.n);
  var ds = s6dis(key, [s6roundSF(c.v, c.n + 1), s6roundSF(c.v, Math.max(1, c.n - 1)), String(Math.round(c.v * 100) / 100), s6sf(c.v * 1.05, c.n), String(c.v)], 3);
  return mcq("Round " + c.v + " to " + c.n + " significant figures.",
    key, ds,
    "Keep the first " + c.n + " significant digit(s) and look at the next digit to decide rounding: " + c.v + " becomes " + key + ". Rounding to a number of decimal places instead is a different instruction, and keeping an extra digit overstates the precision.",
    { v: c.v, n: c.n, key: key });
}, ["Significant figures count digits from the first nonzero digit, wherever the decimal point sits."]);

E("sci-u3-sigfigs-calc", 3, ["SC10.8.7"], 2, "gen", function () {
  var aS = s6pick(["12.5", "8.40", "25.0", "3.60", "120", "6.25"]);
  var bS = s6pick(["4.0", "2.50", "0.80", "15.0", "9.6"]);
  var a = parseFloat(aS), b = parseFloat(bS);
  var sfA = s6countSF(aS), sfB = s6countSF(bS);
  var sf = Math.min(sfA, sfB);
  var prod = a * b;
  var key = s6sf(prod, sf);
  var ds = s6dis(key, [s6sf(prod, sf + 1), String(Math.round(prod * 1000) / 1000), s6sf(prod, Math.max(1, sf - 1)), s6sf(prod * 1.5, sf), s6sf(a / b, sf), s6sf(prod * 1.2, sf), s6sf(prod * 0.85, sf), s6sf(prod + 2, sf)], 3);
  return mcq("A student calculates " + aS + " x " + bS + ". What is the product, reported to the correct number of significant figures?",
    key, ds,
    "Multiplication rule: the answer carries the same number of significant figures as the measurement with the fewest. " + aS + " has " + sfA + " and " + bS + " has " + sfB + ", so report " + sf + ": the raw product " + (Math.round(prod * 1000) / 1000) + " is reported as " + key + ". Writing more digits claims precision the measurements never had.",
    { a: a, b: b, sf: sf, key: key });
}, ["The weakest measurement sets the precision of every answer built from it."]);

E("sci-u3-accuracy", 3, ["SC10.8.7"], 1, "var", varset([
  function () {
    return mcq("A set of darts all land in a tight cluster, but the cluster is well to the left of the bullseye. The throws are",
      "precise but not accurate: they agree with each other but miss the true target",
      ["accurate but not precise", "both accurate and precise", "neither: a tight cluster is always accurate"],
      "Accuracy is closeness to the true value; precision is closeness of results to each other. A tight cluster off target is the textbook picture of precision without accuracy, usually a systematic error (aim or equipment) behind it.", {});
  },
  function () {
    return mcq("Four students time the same pendulum swing as 1.48 s, 1.50 s, 1.49 s and 1.49 s. The teacher's photogate reads 1.49 s. Their results are",
      "both accurate (centred on the true value) and precise (tightly clustered)",
      ["precise but not accurate", "accurate in spread but imprecise", "neither accurate nor precise"],
      "The readings cluster tightly (precision) around the accepted value (accuracy). Both qualities can be judged from the same data set: compare the spread for precision, compare the centre to the true value for accuracy.", {});
  },
  function () {
    return mcq("A balance reads 0.3 g with nothing on the pan, and every mass measured afterward is 0.3 g too heavy. This is",
      "a systematic error: it shifts every reading the same way and destroys accuracy while precision can stay high",
      ["a random error: it scatters readings unpredictably", "a parallax error caused by viewing angle", "not an error at all if the readings are consistent"],
      "A zero error repeats identically, which is the mark of a systematic error. Re-zeroing (taring) the balance removes it. Random errors scatter both ways and cannot be corrected by a single adjustment.", {});
  },
  function () {
    return mcq("Reading a liquid level in a graduated cylinder from an angle, instead of at eye level with the meniscus, produces",
      "a parallax error, which can be avoided by always reading at eye level",
      ["a zero error in the cylinder's scale", "no error, because the angle cancels out", "a change in the liquid's actual volume"],
      "Parallax is the apparent shift from viewing position: the meniscus lines up against different scale marks from different heights. Eye level, bottom of the meniscus, every time, removes the error at its source.", {});
  }
]), ["Accuracy is about the truth; precision is about agreement. Both are judged differently, and each error type has its own fix."]);

E("sci-u3-units", 3, ["SC10.8.7"], 1, "var", varset([
  function () {
    return mcq("Which set lists the correct SI units for displacement, time, velocity and acceleration?",
      "metre (m), second (s), metre per second (m/s), metre per second squared (m/s²)",
      ["kilometre (km), hour (h), kilometre per hour (km/h), metre (m)", "metre (m), second (s), metre (m), second (s)", "centimetre (cm), minute (min), metre per second (m/s), metre per second (m/s)"],
      "Build units from the formulas: velocity is metres divided by seconds, acceleration is (m/s) divided by seconds, giving m/s². Calculations in this unit use metres and seconds so answers come out in these units directly.", {});
  },
  function () {
    return mcq("A measurement is recorded as '12.5' with no unit. The record is incomplete because",
      "a measurement is a number plus a unit: 12.5 m, 12.5 s and 12.5 m/s are entirely different quantities",
      ["numbers over 10 require two units", "the teacher prefers fractions", "12.5 has too many significant figures"],
      "Values and units travel together. Dropping the unit destroys the information: nobody downstream can tell a distance from a time from a speed, and any calculation using it is meaningless.", {});
  }
]), ["Never let a number travel without its unit."]);

/* ---------- SC10.8.7 and 8.8 Speed, velocity, displacement ---------- */

E("sci-u3-avgspeed", 3, ["SC10.8.7"], 2, "gen", function () {
  var sc = [
    { who: "A cyclist rides", dUnit: "m" }, { who: "A delivery van travels", dUnit: "m" },
    { who: "A swimmer completes laps totalling", dUnit: "m" }, { who: "A hiker walks", dUnit: "m" }
  ];
  var it = s6pick(sc);
  var t = s6pick([8.0, 10.0, 12.5, 20.0, 25.0, 40.0]);
  var v = s6pick([3.2, 4.5, 5.0, 6.4, 8.0, 9.5, 12.0]);
  var d = Math.round(v * t * 10) / 10;
  var dStr = Number.isInteger(d) ? d.toFixed(1) : String(d);
  var sf = Math.min(s6countSF(dStr), s6countSF(t.toFixed(1)));
  var key = s6sf(d / t, sf);
  var ds = s6dis(key, [s6sf(t / d * 100, sf), s6sf(d / t, sf + 1), s6sf(d + t, sf), s6sf(d / t * 2, sf), s6sf(d - t, sf)], 3).map(function (x) { return x + " m/s"; });
  return mcq(it.who + " " + dStr + " m in " + t.toFixed(1) + " s at a steady average rate. The average speed is",
    key + " m/s", ds,
    "Average speed = total distance / total time = " + dStr + " m / " + t.toFixed(1) + " s = " + key + " m/s, reported to " + sf + " significant figures (the fewest in the data). Dividing the wrong way, or keeping extra digits, misstates the result.",
    { d: d, t: t, key: key });
}, ["Speed is distance over time. Check the direction of the division with the units: metres per second can only come from m / s."]);

E("sci-u3-speed-solve", 3, ["SC10.8.7", "SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["findD", "findT"]);
  var v = s6pick([6.0, 7.5, 9.0, 11.0, 14.0]);
  var t = s6pick([12.0, 15.0, 18.0, 24.0, 30.0]);
  var d = v * t;
  var sf = Math.min(s6countSF(v.toFixed(1)), s6countSF(t.toFixed(1)));
  if (mode === "findD") {
    var key = s6sf(d, sf);
    return mcq("A snowmobile travels at an average velocity of " + v.toFixed(1) + " m/s [east] for " + t.toFixed(1) + " s. How far does it travel?",
      key + " m", s6dis(key, [s6sf(v / t * 100, sf), s6sf(d, sf + 1), s6sf(t / v * 10, sf), s6sf(d / 2, sf), s6sf(d + v, sf)], 3).map(function (x) { return x + " m"; }),
      "Rearrange v = d/t to d = v x t = " + v.toFixed(1) + " x " + t.toFixed(1) + " = " + key + " m. Rearranging before substituting keeps the relationship straight.",
      { mode: mode, key: key });
  }
  var key2 = s6sf(d / v, sf);
  return mcq("A boat must travel " + s6sf(d, sf) + " m across a harbour at an average speed of " + v.toFixed(1) + " m/s. How long does the crossing take?",
    key2 + " s", s6dis(key2, [s6sf(d * v / 100, sf), s6sf(v / d * 1000, sf), s6sf(d / v, sf + 1), s6sf(d / v * 2, sf), s6sf(t + v, sf)], 3).map(function (x) { return x + " s"; }),
    "Rearrange v = d/t to t = d/v = " + s6sf(d, sf) + " / " + v.toFixed(1) + " = " + key2 + " s. The seconds land in the answer's unit only when distance is divided by speed.",
    { mode: mode, key: key2 });
}, ["One formula, three shapes: v = d/t, d = vt, t = d/v. Pick by the unknown."]);

E("sci-u3-convert", 3, ["SC10.8.7", "SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["toMS", "toKMH"]);
  if (mode === "toMS") {
    var kmh = s6pick([36, 54, 72, 90, 108, 27, 45]);
    var ms = kmh / 3.6;
    var key = s6sf(ms, 2) + " m/s";
    var ds = [s6sf(kmh * 3.6, 3) + " m/s", s6sf(kmh / 10, 2) + " m/s", s6sf(ms, 3) + " m/s"];
    return mcq("Convert " + kmh + " km/h to metres per second.",
      key, ds,
      "Divide by 3.6 (because 1 m/s = 3.6 km/h): " + kmh + " / 3.6 = " + s6sf(ms, 2) + " m/s. Multiplying by 3.6 converts the other direction and is the classic slip; sanity check: the m/s value is always the smaller number.",
      { kmh: kmh, key: key });
  }
  var v = s6pick([5.0, 8.0, 12.5, 15.0, 20.0, 25.0]);
  var k2 = v * 3.6;
  var sf = s6countSF(v);
  var key2 = s6sf(k2, sf) + " km/h";
  return mcq("Convert " + v.toFixed(1) + " m/s to kilometres per hour.",
    key2, [s6sf(v / 3.6, sf) + " km/h", s6sf(k2, sf + 1) + " km/h", s6sf(v * 36, sf) + " km/h"],
    "Multiply by 3.6: " + v.toFixed(1) + " x 3.6 = " + key2 + ". The km/h value is always the larger number, a quick check on the direction of the conversion.",
    { v: v, key: key2 });
}, ["km/h to m/s: divide by 3.6. m/s to km/h: multiply by 3.6. The m/s number is always smaller."]);

E("sci-u3-scalar-vector", 3, ["SC10.8.8"], 1, "var", varset([
  function () {
    return mcq("Which list contains only vector quantities?",
      "Displacement, velocity, acceleration: each needs a magnitude and a direction",
      ["Distance, speed, time", "Displacement, speed, mass", "Velocity, distance, temperature"],
      "Vectors carry direction: 5 m [east] is a displacement, while 5 m alone is a distance (scalar). Speed is the scalar partner of velocity; distance pairs with displacement; time, mass and temperature are scalars.", {});
  },
  function () {
    return mcq("A student records a measurement as '24 m/s [north]'. Because it includes a direction, this quantity is the",
      "velocity (a vector), not the speed",
      ["speed (a scalar)", "distance travelled", "acceleration"],
      "The bracketed direction is the giveaway: speed plus direction is velocity. The same value without the direction (24 m/s) would be reported as speed.", {});
  },
  function () {
    return mcq("Which measurement is a scalar quantity?",
      "A temperature of -4 °C: it has size but no direction",
      ["A displacement of 300 m [west]", "A velocity of 12 m/s [downstream]", "An acceleration of 2.0 m/s² [south]"],
      "Negative is not a direction: -4 °C is a position on a temperature scale, not a heading in space. The other three each state a direction explicitly, which makes them vectors. (In one-dimensional motion a sign can stand in for direction, but a temperature sign is just above or below zero.)", {});
  }
]), ["Direction present means vector. Learn the pairs: distance/displacement, speed/velocity."]);

E("sci-u3-dist-disp", 3, ["SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["back1d", "perp"]);
  if (mode === "back1d") {
    var out = s6pick([120, 150, 200, 240, 300]);
    var back = s6pick([40, 50, 60, 80, 90]);
    var dist = out + back, disp = out - back;
    var ask = s6pick(["distance", "displacement"]);
    if (ask === "distance") {
      return mcq("A dog runs " + out + " m east along a beach, then turns and runs " + back + " m back west. What total distance did the dog travel?",
        dist + " m", [disp + " m", out + " m", (dist + 20) + " m"],
        "Distance adds every leg, direction ignored: " + out + " + " + back + " = " + dist + " m. The " + disp + " m option is the displacement, a different quantity.", { mode: mode, ask: ask });
    }
    return mcq("A dog runs " + out + " m east along a beach, then turns and runs " + back + " m back west. What is the dog's displacement?",
      disp + " m [east]", [dist + " m [east]", back + " m [west]", disp + " m"],
      "Displacement is finish minus start, with direction: " + out + " east - " + back + " west = " + disp + " m [east]. Total path length (" + dist + " m) is the distance, and a displacement answer without a direction is incomplete.", { mode: mode, ask: ask });
  }
  var tri = s6pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
  var k = s6pick([10, 20, 25]);
  var a = tri[0] * k, b = tri[1] * k, c = tri[2] * k;
  return mcq("A hiker walks " + a + " m north, then " + b + " m east. What is the magnitude of the hiker's displacement from the start?",
    c + " m", [(a + b) + " m", Math.abs(a - b) + " m", (c + k) + " m"],
    "The two legs are perpendicular, so the displacement is the hypotenuse: sqrt(" + a + "² + " + b + "²) = sqrt(" + (a * a + b * b) + ") = " + c + " m. Adding the legs (" + (a + b) + " m) gives the distance walked, not the straight-line displacement.", { a: a, b: b, c: c });
}, ["Distance counts the path; displacement measures the gap between start and finish, direction included."]);

E("sci-u3-avgvelocity", 3, ["SC10.8.8"], 3, "gen", function () {
  var legs = [
    { d: 300, t: 60, dir: 1 }, { d: 100, t: 50, dir: -1 }
  ];
  var disp = 200, tTot = 110, dist = 400;
  var keyV = s6sf(disp / tTot, 2);
  var avgSpd = s6sf(dist / tTot, 2);
  var legAvg = s6sf((300 / 60 + 100 / 50) / 2, 2);
  return mcq("A delivery driver goes 300 m east in 60 s, then 100 m west in 50 s. What is the driver's average velocity for the whole trip?",
    keyV + " m/s [east]", [avgSpd + " m/s [east]", legAvg + " m/s [east]", s6sf(disp / 60, 2) + " m/s [east]"],
    "Average velocity = total displacement / total time. Displacement = 300 - 100 = 200 m [east]; time = 110 s; 200/110 = " + keyV + " m/s [east]. The " + avgSpd + " option is the average speed (uses the 400 m path), and averaging the two leg velocities ignores that the legs took different times.", { keyV: keyV });
}, ["Average velocity divides total displacement by total time. Never average the leg velocities directly."]);

E("sci-u3-disp-scenarios", 3, ["SC10.8.8"], 2, "var", varset([
  function () {
    return mcq("An elevator rises 24 m, stops, then descends 9 m to a floor. A passenger's displacement from the start is",
      "15 m [up]", ["33 m [up]", "9 m [down]", "24 m [up]"],
      "Displacement tracks the endpoints only: +24 - 9 = +15 m, so 15 m [up]. The path length was 33 m, which is the distance, not the displacement.", {});
  },
  function () {
    return mcq("A swimmer completes a full lap in a 50 m pool and finishes at the starting wall. Her displacement for the lap is",
      "0 m: she ends where she started",
      ["100 m", "50 m", "200 m"],
      "Out 50 m and back 50 m returns her to the start, so displacement is zero even though she swam 100 m of distance. Zero displacement with nonzero distance is the signature of any closed loop.", {});
  },
  function () {
    return mcq("A car travels around a roundabout and exits on the same street it entered, heading back the way it came. At the moment it completes the circle, its displacement from entry is",
      "zero, because it is back at its starting position (its distance travelled is the circumference)",
      ["equal to the circumference of the roundabout", "equal to the diameter of the roundabout", "impossible to state without the car's speed"],
      "Displacement depends only on start and end positions. Same position means zero displacement, however long and curvy the path between them was.", {});
  }
]), ["If the finish is the start, the displacement is zero, whatever the odometer says."]);

/* ---------- SC10.8.9 Position-time graphs ---------- */

function s6dtGraph(segs, title) {
  var pts = [[0, segs[0].from]];
  var t = 0;
  segs.forEach(function (s) { t += s.dur; pts.push([t, s.to]); });
  var yMax = Math.max.apply(null, pts.map(function (p) { return p[1]; })) + 10;
  return s6GraphSVG({ xMax: t, yMax: yMax, xStep: s6niceStep(t), yStep: s6niceStep(yMax), xLab: "time (s)", yLab: "position (m)", lines: [{ pts: pts, col: S6_INK }] });
}
E("sci-u3-dt-read", 3, ["SC10.8.9"], 2, "gen", function () {
  var segs = [
    { from: 0, to: 30, dur: 10 },
    { from: 30, to: 30, dur: 10 },
    { from: 30, to: 10, dur: 10 }
  ];
  var fig = s6dtGraph(segs);
  var mode = s6pick(["stopped", "speed1", "speed3"]);
  var q;
  if (mode === "stopped") {
    q = mcq("The graph shows a cyclist's position over 30 s. Between 10 s and 20 s the cyclist is",
      "stopped: the position stays at 30 m, so the slope (velocity) is zero",
      ["moving at a constant 3.0 m/s", "returning toward the start", "speeding up steadily"],
      "A flat section on a position-time graph means position is not changing: velocity is the slope, and the slope here is 0. The cyclist rides out for 10 s, rests for 10 s, then rides partway back.", { mode: mode });
  } else if (mode === "speed1") {
    q = mcq("Using the graph, the cyclist's velocity during the first 10 s is",
      "3.0 m/s", ["30 m/s", "0.33 m/s", "10 m/s"],
      "Velocity is the slope: (30 - 0) m / (10 - 0) s = 3.0 m/s. Reading the final position (30) alone, or inverting the division, are the two standard errors this question traps.", { mode: mode });
  } else {
    q = mcq("During the last 10 s of the graph, the cyclist's velocity is",
      "-2.0 m/s: the position falls from 30 m to 10 m, and the negative sign shows motion back toward the start",
      ["2.0 m/s", "-20 m/s", "0 m/s"],
      "Slope = (10 - 30) / 10 = -2.0 m/s. On a position-time graph the sign of the slope is the direction of travel: negative here means heading back toward the reference point.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["On a position-time graph, slope is velocity: rise over run, sign included."]);

E("sci-u3-dt-match", 3, ["SC10.8.9"], 2, "gen", function () {
  var lines = [
    { pts: [[0, 0], [10, 40]], col: S6_INK, label: "P", labelPt: [9, 42] },
    { pts: [[0, 0], [10, 15]], col: S6_ACC, label: "Q", labelPt: [9, 11] },
    { pts: [[0, 30], [10, 30]], col: S6_ALT, label: "R", labelPt: [9, 33] }
  ];
  var fig = s6GraphSVG({ xMax: 10, yMax: 50, xStep: 2, yStep: 10, xLab: "time (s)", yLab: "position (m)", lines: lines });
  var mode = s6pick(["fastest", "still", "startahead"]);
  var q;
  if (mode === "fastest") {
    q = mcq("Three objects' motions are graphed. Which line shows the fastest constant velocity?",
      "P: it has the steepest slope, covering 40 m in 10 s (4.0 m/s)",
      ["Q: it stays lowest on the graph", "R: it is already farthest from the start", "All three are equal because the lines are all straight"],
      "Steepness is speed on this graph type. P's slope is 4.0 m/s, Q's is 1.5 m/s, and R is flat (stopped). Starting position (R's head start) says nothing about speed.", { mode: mode });
  } else if (mode === "still") {
    q = mcq("Which line shows an object that is not moving?",
      "R: its position stays at 30 m for the whole 10 s",
      ["P: it ends farthest along", "Q: it moves the least distance", "None: every line on a motion graph shows movement"],
      "No change in position means no motion: R's flat line is a stopped object that started 30 m from the reference point. Q moves slowly but genuinely (15 m in 10 s).", { mode: mode });
  } else {
    q = mcq("Which object started farthest from the reference point?",
      "R: its line begins at 30 m at t = 0",
      ["P: its line ends highest", "Q: its line is in the middle", "They all started together at the origin"],
      "Starting position is read where the line meets the position axis (t = 0): R begins at 30 m, while P and Q both begin at 0. Where a line ends tells you the final position, not the start.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Read three things separately: intercept is the start, slope is the velocity, flat means stopped."]);

E("sci-u3-dt-slope", 3, ["SC10.8.9"], 3, "gen", function () {
  var v = s6pick([1.5, 2.0, 2.5, 4.0, 5.0]);
  var t1 = s6pick([4, 5, 6]);
  var t2 = t1 + s6pick([8, 10, 12]);
  var d1 = v * t1, d2 = v * t2;
  var pts = [[0, 0], [t1, d1], [t2, d2]];
  var fig = s6GraphSVG({ xMax: t2 + 2, yMax: d2 + 10, xStep: s6niceStep(t2 + 2), yStep: s6niceStep(d2 + 10), xLab: "time (s)", yLab: "position (m)", lines: [{ pts: pts, col: S6_INK }], dots: pts });
  var key = s6sf(v, 2);
  var q = mcq("A student's steady walk is graphed. Calculate the student's velocity from the slope between the marked points (" + t1 + " s, " + d1 + " m) and (" + t2 + " s, " + d2 + " m).",
    key + " m/s", [s6sf(1 / v, 2) + " m/s", s6sf(d2 / t2 === v ? v * 2 : d2 / t2, 2) + " m/s", s6sf(d2 - d1, 2) + " m/s"],
    "Slope = rise/run = (" + d2 + " - " + d1 + ") m / (" + t2 + " - " + t1 + ") s = " + (d2 - d1) + " / " + (t2 - t1) + " = " + key + " m/s. Use the changes between the two points, not a single point's values, and never flip the division.",
    { v: v, key: key });
  q.figure = fig;
  return q;
}, ["Pick two points on the line, subtract in the same order top and bottom, then divide."]);

/* ---------- SC10.8.10 Instantaneous vs average ---------- */

E("sci-u3-inst-avg", 3, ["SC10.8.10"], 2, "var", varset([
  function () {
    return mcq("A car's speedometer reads 62 km/h at the instant it passes a sign. That reading is the car's",
      "instantaneous speed: its speed at that one moment",
      ["average speed for the whole trip", "average velocity for the whole trip", "acceleration at the sign"],
      "A speedometer reports the moment-by-moment speed, not any trip average. Average values are computed afterward from totals (total distance over total time) and can differ a lot from what the needle showed at any instant.", {});
  },
  function () {
    return mcq("A bus completes a route with an average velocity of 8.0 m/s [east]. Which statement must be true?",
      "Its displacement divided by its travel time equals 8.0 m/s [east]; its speedometer may have read many different values along the way",
      ["Its speedometer read exactly 8.0 m/s at every moment", "It never stopped during the route", "Its instantaneous velocity was 8.0 m/s [east] at the midpoint"],
      "An average is a totals statement, not a moment-by-moment claim: stops, starts and speed changes all fold into it. Only the ratio of total displacement to total time is fixed by the average.", {});
  },
  function () {
    return mcq("On a position-time graph, the instantaneous velocity at a point on a CURVED line is found from",
      "the slope of the tangent line drawn touching the curve at that point",
      ["the slope of the line from the origin to that point", "the position value at that point divided by the total trip time", "the steepest slope anywhere on the curve"],
      "A curve's slope changes from point to point, so each point has its own tangent. The origin-to-point line gives the average velocity up to that moment, a useful number, but a different one.", {});
  }
]), ["Instantaneous is a moment; average is a summary. The speedometer shows the first, the trip totals give the second."]);

E("sci-u3-dt-instant", 3, ["SC10.8.10"], 3, "gen", function () {
  var a = s6pick([0.40, 0.50, 0.60, 0.80]);
  var t0 = s6pick([4, 6]);
  var T = 10;
  var dmax = 0.5 * a * T * T;
  var slope = a * t0;
  var d0 = 0.5 * a * t0 * t0;
  var tx1 = Math.max(0, t0 - 2.5), tx2 = Math.min(T, t0 + 2.5);
  var ty1 = d0 + slope * (tx1 - t0), ty2 = d0 + slope * (tx2 - t0);
  var yM = Math.ceil(dmax) + 4;
  var fig = s6GraphSVG({ xMax: T, yMax: yM, xStep: 2, yStep: s6niceStep(yM), xLab: "time (s)", yLab: "position (m)",
    lines: [
      { fn: function (x) { return 0.5 * a * x * x; }, col: S6_INK },
      { pts: [[tx1, ty1], [tx2, ty2]], col: S6_ALT }
    ], dots: [[t0, d0]] });
  var key = s6sf(slope, 2);
  var avg = s6sf(dmax / T, 2);
  var half = s6sf(slope / 2, 2);
  var q = mcq("A cart accelerating from rest follows the curved position-time graph shown. The straight line is the tangent at t = " + t0 + " s. The cart's instantaneous velocity at t = " + t0 + " s is",
    key + " m/s", s6dis(key, [avg, half, s6sf(d0, 2), s6sf(slope * 1.5, 2)], 3).map(function (x) { return x + " m/s"; }),
    "Instantaneous velocity is the tangent's slope. The tangent rises " + s6sf(slope * 5, 2) + " m over its 5 s span, giving " + key + " m/s. The " + avg + " m/s option is the average velocity over the whole 10 s, and " + half + " m/s comes from d/t at the point itself, neither of which is the tangent slope.",
    { a: a, t0: t0, key: key });
  q.figure = fig;
  return q;
}, ["Curved position graph means changing velocity: draw (or use) the tangent at the instant you care about."]);

/* ---------- SC10.8.11 Velocity-time graphs ---------- */

function s6vtBase() {
  return [
    { from: 0, to: 6, dur: 5 },
    { from: 6, to: 6, dur: 5 },
    { from: 6, to: 0, dur: 3 }
  ];
}
function s6vtGraph(segs, yMax, title) {
  var pts = [[0, segs[0].from]];
  var t = 0;
  segs.forEach(function (s) { t += s.dur; pts.push([t, s.to]); });
  var ym = yMax || 8;
  return s6GraphSVG({ xMax: t, yMax: ym, xStep: s6niceStep(t), yStep: s6niceStep(ym), xLab: "time (s)", yLab: "velocity (m/s)", lines: [{ pts: pts, col: S6_INK }] });
}
E("sci-u3-vt-read", 3, ["SC10.8.11"], 2, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var mode = s6pick(["const", "decel", "value"]);
  var q;
  if (mode === "const") {
    q = mcq("The velocity-time graph shows a scooter trip. Between 5 s and 10 s the scooter is",
      "travelling at a constant velocity of 6 m/s (zero acceleration)",
      ["stopped", "speeding up steadily", "slowing down steadily"],
      "The line is flat at 6 m/s across that stretch: velocity is not changing, so acceleration is zero. Flat on a velocity graph means steady motion, not rest (flat at zero would be rest).", { mode: mode });
  } else if (mode === "decel") {
    q = mcq("Between 10 s and 13 s, the scooter's motion is",
      "slowing down at a steady rate until it stops",
      ["speeding up", "moving backwards", "stopped for the whole segment"],
      "The velocity falls steadily from 6 m/s to 0: steady deceleration to a stop. It reaches zero only at the final instant, so 'stopped throughout' misreads the graph; and a falling positive velocity is slowing, not reversing.", { mode: mode });
  } else {
    q = mcq("At t = 2 s, the scooter's velocity is",
      "about 2.4 m/s: the line rises steadily from 0 to 6 m/s over the first 5 s",
      ["6 m/s", "0 m/s", "about 12 m/s"],
      "Read the value off the rising line: it gains 6 m/s in 5 s (1.2 m/s each second), so at 2 s it reads about 2.4 m/s. The peak value (6) is not reached until 5 s.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["On a velocity-time graph, the height is the velocity itself: read it before you compute anything."]);

E("sci-u3-vt-area", 3, ["SC10.8.11"], 3, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var q = mcq("Using the velocity-time graph of the scooter trip (velocity rises 0 to 6 m/s over 5 s, stays 6 m/s for 5 s, then falls to 0 over 3 s), the total displacement is",
    "54 m", ["78 m", "39 m", "93 m"],
    "Displacement equals the area under a velocity-time graph. Split it into shapes: triangle 0.5 x 5 x 6 = 15 m, rectangle 5 x 6 = 30 m, triangle 0.5 x 3 x 6 = 9 m. Total = 15 + 30 + 9 = 54 m. Peak times total time (78) overcounts because the scooter was below peak speed for most of the trip.",
    { total: 54 });
  q.figure = fig;
  return q;
}, ["Area under a velocity-time graph is displacement: cut it into triangles and rectangles."]);

E("sci-u3-vt-accel", 3, ["SC10.8.11", "SC10.8.12"], 3, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var mode = s6pick(["up", "down"]);
  var q;
  if (mode === "up") {
    q = mcq("From the velocity-time graph, the scooter's acceleration during the first 5 s is",
      "1.2 m/s²: the slope of the rising section, (6 - 0) / 5",
      ["6 m/s²", "30 m/s²", "0.83 m/s²"],
      "Acceleration is the slope of a velocity-time graph: rise 6 m/s over run 5 s gives 1.2 m/s². The inverted division (5/6) and the product are the standard traps.", { mode: mode });
  } else {
    q = mcq("From the velocity-time graph, the scooter's acceleration during the final 3 s is",
      "-2.0 m/s²: the slope of the falling section, (0 - 6) / 3",
      ["2.0 m/s²", "-6 m/s²", "-0.5 m/s²"],
      "Slope of the falling section: change in velocity -6 m/s over 3 s = -2.0 m/s². The negative sign carries the meaning: velocity shrinking in the positive direction. Dropping the sign erases the physics.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Slope of velocity-time is acceleration; area under it is displacement. The two readings answer different questions."]);

E("sci-u3-scale", 3, ["SC10.8.8"], 2, "gen", function () {
  var tri = s6pick([[3, 4, 5], [6, 8, 10]]);
  var cmA = tri[0], cmB = tri[1], cmC = tri[2];
  var scaleM = s6pick([2, 5, 10]);
  var s = '<svg viewBox="0 0 340 240" width="340" role="img" aria-label="Scale diagram of a displacement">';
  s += '<line x1="60" y1="190" x2="' + (60 + cmA * 22) + '" y2="190" stroke="' + S6_INK + '" stroke-width="2.5"/>';
  s += '<line x1="' + (60 + cmA * 22) + '" y1="190" x2="' + (60 + cmA * 22) + '" y2="' + (190 - cmB * 22) + '" stroke="' + S6_INK + '" stroke-width="2.5"/>';
  s += '<line x1="60" y1="190" x2="' + (60 + cmA * 22) + '" y2="' + (190 - cmB * 22) + '" stroke="' + S6_ALT + '" stroke-width="2.5" stroke-dasharray="6 4"/>';
  s += s6txt(60, 206, "start", 11);
  s += s6txt(60 + cmA * 11, 206, cmA + " cm", 11);
  s += s6txt(66 + cmA * 22, 195 - cmB * 11, cmB + " cm", 11);
  s += s6txt(60 + cmA * 11, 178 - cmB * 11, "displacement", 11, false, "middle", S6_ALT);
  s += "</svg>";
  var disp = cmC * scaleM, dist = (cmA + cmB) * scaleM;
  var q = mcq("A scale diagram of a walk uses the scale 1 cm represents " + scaleM + " m. The drawn path goes " + cmA + " cm east, then " + cmB + " cm north (dashed line = displacement). The walker's actual displacement is",
    disp + " m", s6dis(disp + " m", [dist + " m", (cmC + cmA) * scaleM + " m", (cmC - 1) * scaleM + " m", (cmA * scaleM + cmB) + " m", (cmC + 2) * scaleM + " m"], 3),
    "Measure the dashed displacement on the diagram: with legs of " + cmA + " cm and " + cmB + " cm it measures " + cmC + " cm (a " + cmA + "-" + cmB + "-" + cmC + " triangle). Convert with the scale: " + cmC + " cm x " + scaleM + " m/cm = " + disp + " m. The " + dist + " m option is the total distance, found from the solid path instead.",
    { disp: disp });
  q.figure = s;
  return q;
}, ["Scale diagrams are measurements: measure the drawing, then convert with the scale. Displacement uses the straight dashed line."]);

/* ---------- SC10.8.12 Acceleration ---------- */

E("sci-u3-accel-calc", 3, ["SC10.8.12"], 2, "gen", function () {
  var sc = [
    { ctx: "A car merges onto the highway", unit: "m/s" },
    { ctx: "A sprinter leaves the blocks", unit: "m/s" },
    { ctx: "A puck slides and is checked by friction (speeds given as positive magnitudes in the direction of travel)", unit: "m/s" }
  ];
  var it = s6pick(sc);
  var vi = s6pick([0, 2.0, 5.0, 8.0]);
  var dv = s6pick([6.0, 9.0, 12.0, 15.0]);
  var vf = vi + dv;
  var t = s6pick([3.0, 4.0, 5.0, 6.0]);
  var a = dv / t;
  var sf = Math.min(s6countSF(dv.toFixed(1)), s6countSF(t.toFixed(1)));
  var key = s6sf(a, sf);
  var q = mcq(it.ctx + ", changing velocity from " + vi.toFixed(1) + " m/s to " + vf.toFixed(1) + " m/s in " + t.toFixed(1) + " s. Its acceleration is",
    key + " m/s²",
    s6dis(key, [s6sf(vf / t, sf), s6sf(t / dv, sf), s6sf(a, sf + 1), s6sf(a * 2, sf), s6sf(a / 2, sf)], 3).map(function (x) { return x + " m/s²"; }),
    "a = (v_f - v_i) / t = (" + vf.toFixed(1) + " - " + vi.toFixed(1) + ") / " + t.toFixed(1) + " = " + dv.toFixed(1) + " / " + t.toFixed(1) + " = " + key + " m/s². Using the final velocity alone instead of the change is the most common error here.",
    { a: a, key: key });
  return q;
}, ["Acceleration uses the CHANGE in velocity: final minus initial, then divide by time."]);

E("sci-u3-accel-solve", 3, ["SC10.8.12"], 2, "gen", function () {
  var mode = s6pick(["findVf", "findT"]);
  var vi = s6pick([3.0, 6.0, 10.0]);
  var a = s6pick([1.5, 2.0, 2.5, 3.0]);
  var t = s6pick([4.0, 5.0, 8.0]);
  var vf = vi + a * t;
  var sf = 2;
  if (mode === "findVf") {
    return mcq("A cyclist rolling at " + vi.toFixed(1) + " m/s accelerates at " + a.toFixed(1) + " m/s² for " + t.toFixed(1) + " s. The final velocity is",
      s6sf(vf, sf) + " m/s", s6dis(s6sf(vf, sf), [s6sf(vi + a / t * 10, sf), s6sf(a * t, sf), s6sf(vf, 3), s6sf(vf + a, sf), s6sf(vi * t / 2, sf)], 3).map(function (x) { return x + " m/s"; }),
      "v_f = v_i + a t = " + vi.toFixed(1) + " + (" + a.toFixed(1) + " x " + t.toFixed(1) + ") = " + vi.toFixed(1) + " + " + s6sf(a * t, sf) + " = " + s6sf(vf, sf) + " m/s. The a t term alone is the change in velocity, not the final velocity: the starting velocity must be added.",
      { mode: mode });
  }
  return mcq("A cart starts at " + vi.toFixed(1) + " m/s and accelerates at " + a.toFixed(1) + " m/s² until it reaches " + vf.toFixed(1) + " m/s. How long does this take?",
    s6sf(t, sf) + " s", s6dis(s6sf(t, sf), [s6sf(vf / a, sf), s6sf((vf - vi) * a, sf), s6sf(t, 3), s6sf(t * 2, sf), s6sf(vf - vi, sf)], 3).map(function (x) { return x + " s"; }),
    "From a = (v_f - v_i)/t, rearrange: t = (v_f - v_i)/a = (" + vf.toFixed(1) + " - " + vi.toFixed(1) + ") / " + a.toFixed(1) + " = " + s6sf(t, sf) + " s. Dividing the final velocity alone forgets the cart was already moving.",
    { mode: mode });
}, ["Write the relationship first (a = Δv/t or v_f = v_i + at), then solve for the unknown before touching numbers."]);

E("sci-u3-accel-concept", 3, ["SC10.8.12"], 2, "var", varset([
  function () {
    return mcq("A car travelling east slows down for a stop sign. Taking east as positive, its acceleration is",
      "negative: the velocity (positive) is shrinking, so the change in velocity points west",
      ["positive: acceleration is always positive when a car moves forward", "zero: slowing down is not accelerating", "positive and equal to its speed"],
      "Acceleration is the rate of change of velocity, and slowing down is a change. The velocity change (final minus initial) is negative for an eastbound car braking, so the acceleration is negative: directed opposite the motion.", {});
  },
  function () {
    return mcq("Which object is definitely accelerating?",
      "A car rounding a curve at a steady 50 km/h: its direction changes, and velocity includes direction",
      ["A car parked with the engine off", "A train moving in a straight line at a constant 80 km/h", "A book sitting on a desk"],
      "Velocity is speed with direction, so changing direction at constant speed is still a velocity change, which is acceleration. Only the curve qualifies; the others have constant (or zero) velocity.", {});
  },
  function () {
    return mcq("An acceleration of -3.0 m/s² for an object moving in the positive direction means",
      "each second, its velocity drops by 3.0 m/s",
      ["it moves backwards at 3.0 m/s", "it travels 3.0 m every second", "its velocity is -3.0 m/s"],
      "Acceleration is measured in velocity change per second: -3.0 m/s² subtracts 3.0 m/s from the velocity every second while the sign convention holds. It says nothing directly about the current velocity, which could still be large and positive.", {});
  }
]), ["Acceleration is about change: speeding up, slowing down, or turning all count."]);

/* ---------- Unit 3 CR ---------- */

E("sci-u3-cr-trip", 3, ["SC10.8.8"], 2, "var", varset([
  function () {
    return textq("A trip in two legs (4 marks)\nA student walks 240 m east to a store in 200 s, then walks 60 m back west toward home in 75 s.\n(a) Calculate the total distance travelled. (1)\n(b) Calculate the student's displacement for the whole trip, with direction. (1)\n(c) Calculate the average speed for the whole trip. (1)\n(d) Calculate the average velocity for the whole trip. (1)", ["(a) Distance = 240 + 60 = 300 m."], 
      "(a) Distance = 240 + 60 = 300 m. (b) Displacement = 240 - 60 = 180 m [east]. (c) Average speed = 300 m / 275 s = 1.1 m/s. (d) Average velocity = 180 m [east] / 275 s = 0.65 m/s [east]. (Total time 200 + 75 = 275 s; answers to 2 significant figures as the data warrant.)", 
      {});
  },
  function () {
    return textq("Training laps (4 marks)\nA runner on a straight out-and-back course runs 400 m north in 100 s, turns, and runs 400 m south in 125 s, finishing exactly at the start.\n(a) Calculate the total distance run. (1)\n(b) State the runner's displacement for the full run, and explain the value. (1)\n(c) Calculate the average speed for the full run. (1)\n(d) State the average velocity for the full run, and explain why it differs from the average speed. (1)", ["(a) Distance = 400 + 400 = 800 m."], 
      "(a) Distance = 400 + 400 = 800 m. (b) Displacement = 0 m: the finish is the start, so the straight-line change in position is zero. (c) Average speed = 800 m / 225 s = 3.6 m/s. (d) Average velocity = 0 m / 225 s = 0 m/s. It differs because average velocity divides displacement (zero here), while average speed divides distance (800 m); the two quantities agree only for straight-line motion with no reversal.", 
      {});
  },
  function () {
    return textq("Comparing two drivers (4 marks)\nMaya drives for 2.00 hours at a steady 68.0 km/h. Tomas drives for 120 minutes at a steady 19.0 m/s.\n(a) Convert Tomas's speed to kilometres per hour. (1)\n(b) Who is travelling faster, and by how much? (1)\n(c) Calculate the distance Maya travels. (1)\n(d) Calculate the distance Tomas travels in his 120 minutes. (1)",
      ["(a) 19.0 x 3.6 = 68.4 km/h. (b) Tomas, by 0.4 km/h. (c) 136 km. (d) 136.8 km (about 137 km)"],
      "(a) 19.0 m/s x 3.6 = 68.4 km/h. (b) Tomas is faster, by 68.4 - 68.0 = 0.4 km/h: the comparison is only possible once both speeds share a unit. (c) Maya: d = v x t = 68.0 km/h x 2.00 h = 136 km. (d) Tomas: 120 min = 7200 s; d = 19.0 m/s x 7200 s = 136 800 m = 136.8 km. The slightly faster driver covers slightly more ground in the same time, as (b) predicts.",
      {});
  },
  function () {
    return textq("A warden's patrol (4 marks)\nA park warden walks 350 m north in 250 s, then 150 m south in 100 s, then 100 m north in 80 s.\n(a) Calculate the total distance walked. (1)\n(b) Calculate the warden's displacement for the whole patrol. (1)\n(c) Calculate the average speed for the patrol. (1)\n(d) Calculate the average velocity for the patrol. (1)",
      ["(a) 600 m. (b) 300 m [north]. (c) 1.4 m/s. (d) 0.70 m/s [north]"],
      "(a) Distance = 350 + 150 + 100 = 600 m. (b) Displacement = 350 - 150 + 100 = 300 m [north] (north taken as positive). (c) Total time = 250 + 100 + 80 = 430 s; average speed = 600 / 430 = 1.4 m/s. (d) Average velocity = 300 m [north] / 430 s = 0.70 m/s [north]. The southward leg cancels part of the northward progress, so the average velocity comes out well below the average speed even though the warden's walking pace was steady throughout.",
      {});
  }
]), ["Show the formula, the substitution and the unit in every part; direction is part of any displacement or velocity answer."]);

E("sci-u3-cr-dtgraph", 3, ["SC10.8.9"], 3, "var", varset([
  function () {
    var segs = [
      { from: 0, to: 20, dur: 10 },
      { from: 20, to: 20, dur: 5 },
      { from: 20, to: 0, dur: 10 }
    ];
    var q = textq("Interpreting a position-time graph (3 marks)\nThe graph shows a dog's position east of its home over 25 s.\n(a) Describe the dog's motion in each of the three sections of the graph. (1)\n(b) Calculate the dog's velocity in the first section. (1)\n(c) Calculate the dog's velocity in the last section, and explain what the sign of your answer means. (1)", ["(a) 0 to 10 s: moves steadily east away from home, reaching 20 m."], 
      "(a) 0 to 10 s: moves steadily east away from home, reaching 20 m. 10 to 15 s: stopped at 20 m (flat line). 15 to 25 s: moves steadily back west, arriving home at 25 s. (b) Slope = 20 m / 10 s = 2.0 m/s [east]. (c) Slope = (0 - 20) m / 10 s = -2.0 m/s. The negative sign means the velocity is directed west, back toward the reference point (home); the speed is the same 2.0 m/s as the first section, only the direction differs.", 
      {});
    q.figure = s6dtGraph(segs, "Position vs time: the dog");
    return q;
  },
  function () {
    var segs = [
      { from: 0, to: 12, dur: 4 },
      { from: 12, to: 24, dur: 8 },
      { from: 24, to: 24, dur: 4 }
    ];
    var q = textq("Interpreting a position-time graph (3 marks)\nThe graph shows a remote-controlled car's position over 16 s.\n(a) In which section is the car moving fastest? Justify with the slopes. (1)\n(b) Calculate the car's velocity in the second section. (1)\n(c) Calculate the car's average velocity over the whole 16 s. (1)", ["(a) First section: its slope is 12/4 = 3.0 m/s, steeper than the second section's 12/8 = 1.5 m/s; the third section is flat (stopped)."], 
      "(a) First section: its slope is 12/4 = 3.0 m/s, steeper than the second section's 12/8 = 1.5 m/s; the third section is flat (stopped). (b) (24 - 12) m / (12 - 4) s = 12/8 = 1.5 m/s. (c) Total displacement 24 m over 16 s = 1.5 m/s. (The average lands on the second section's value by coincidence of these numbers; the method, total displacement over total time, is what earns the mark.)", 
      {});
    q.figure = s6dtGraph(segs, "Position vs time: RC car");
    return q;
  }
]), ["Slope calculations earn the marks: show the two points you used and keep the direction sign."]);

E("sci-u3-cr-vtgraph", 3, ["SC10.8.11", "SC10.8.12"], 3, "var", varset([
  function () {
    var segs = [
      { from: 0, to: 8, dur: 4 },
      { from: 8, to: 8, dur: 6 },
      { from: 8, to: 0, dur: 4 }
    ];
    var q = textq("Interpreting a velocity-time graph (3 marks)\nThe graph shows a cyclist's velocity over 14 s.\n(a) Calculate the cyclist's acceleration in the first 4 s. (1)\n(b) Calculate the total displacement for the trip using the area under the graph. (1)\n(c) Describe the motion in the final 4 s, including the acceleration. (1)", ["(a) Slope = (8 - 0) m/s / 4 s = 2.0 m/s²."], 
      "(a) Slope = (8 - 0) m/s / 4 s = 2.0 m/s². (b) Area = triangle (0.5 x 4 x 8 = 16) + rectangle (6 x 8 = 48) + triangle (0.5 x 4 x 8 = 16) = 80 m. (c) The cyclist slows steadily from 8 m/s to a stop: acceleration = (0 - 8)/4 = -2.0 m/s², the negative sign showing deceleration in the original direction. The braking is exactly as strong as the starting acceleration, in the opposite sense.", 
      {});
    q.figure = s6vtGraph(segs, 10, "Velocity vs time: the cyclist");
    return q;
  },
  function () {
    var segs = [
      { from: 2, to: 10, dur: 4 },
      { from: 10, to: 10, dur: 4 },
      { from: 10, to: 4, dur: 6 }
    ];
    var q = textq("Interpreting a velocity-time graph (3 marks)\nThe graph shows a ferry's velocity leaving a dock over 14 s (the ferry is already moving at 2 m/s when timing starts).\n(a) Calculate the ferry's displacement in the first 8 s. (1)\n(b) Calculate the acceleration in the final 6 s. (1)\n(c) Explain why the displacement cannot be found by multiplying the final velocity by the total time. (1)", ["(a) Area 0 to 8 s = trapezoid under the rise (average velocity (2 + 10)/2 = 6 m/s over 4 s = 24 m) + rectangle (4 x 10 = 40 m) = 64 m."], 
      "(a) Area 0 to 8 s = trapezoid under the rise (average velocity (2 + 10)/2 = 6 m/s over 4 s = 24 m) + rectangle (4 x 10 = 40 m) = 64 m. (b) Slope = (4 - 10) m/s / 6 s = -1.0 m/s². (c) The velocity changes through most of the trip, so no single velocity multiplied by the time gives the displacement; only the area under the curve accounts for every moment's velocity. Final velocity x time (10 x 14 = 140 m) would badly overcount, since the ferry spent much of the trip below 10 m/s.", 
      {});
    q.figure = s6vtGraph(segs, 12, "Velocity vs time: the ferry");
    return q;
  }
]), ["Slope for acceleration, area for displacement: state which reading you are using before you compute."]);

/* ---------- Unit 3 depth additions ---------- */

E("sci-u3-motion-vocab", 3, ["SC10.8.8"], 1, "var", varset([
  function () {
    return mcq("In motion studies, a position measurement is always made relative to",
      "a reference point: the fixed place chosen as 'zero' that all positions are measured from",
      ["the moving object itself", "the North Pole in every problem", "wherever the object stops"],
      "Position has no meaning without an origin: '3 m' only locates something when you know 3 m from what, and in which direction. Changing the reference point changes every position value but no distances travelled.", {});
  },
  function () {
    return mcq("An object is in motion when",
      "its position changes relative to a reference point as time passes",
      ["it makes a sound", "its engine is running", "it feels like it is moving to a passenger"],
      "Motion is defined by changing position, full stop. A parked car with the engine running is not in motion; a passenger on a smooth train may feel still while their position changes rapidly. Feelings and engines are not part of the definition.", {});
  }
]), ["Position needs a reference point the way a price needs a currency."]);

E("sci-u3-speed-simple", 3, ["SC10.8.7"], 1, "gen", function () {
  var pairs = [[100, 20], [60, 12], [150, 30], [45, 9], [200, 25], [80, 16], [36, 6], [90, 15]];
  var p = s6pick(pairs);
  var v = p[0] / p[1];
  return mcq("A ball rolls " + p[0] + " m in " + p[1] + " s at a steady rate. Its speed is",
    v + " m/s", [v + 2, v * 2, Math.max(1, v - 2)].map(function (x) { return x + " m/s"; }),
    "Speed = distance / time = " + p[0] + " / " + p[1] + " = " + v + " m/s.", { v: v });
}, ["One division: distance over time."]);

E("sci-u3-dt-shapes", 3, ["SC10.8.9"], 1, "var", varset([
  function () {
    return mcq("On a position-time graph, a straight diagonal line (constant slope) tells you the object is",
      "moving at a constant velocity: equal distances in equal times",
      ["speeding up", "slowing down", "stopped"],
      "Constant slope means constant velocity, since slope IS velocity on this graph. A curve bending upward means speeding up; bending toward flat means slowing down; a flat line is stopped.", {});
  },
  function () {
    return mcq("A position-time graph curves upward, getting steeper and steeper. The object is",
      "speeding up: the slope (velocity) grows as time passes",
      ["moving at constant velocity", "slowing down", "returning to its start"],
      "Steepening slope is growing velocity. Read any curve by asking what the slope is doing: rising slope, speeding up; falling slope, slowing down; steady slope, steady speed.", {});
  }
]), ["Slope behaviour is the whole reading: steady, steepening, flattening or flat."]);

E("sci-u3-accel-plain", 3, ["SC10.8.12"], 1, "var", varset([
  function () {
    return mcq("Which situation involves the greatest acceleration, judged by how quickly velocity changes?",
      "A puck that goes from 0 to 20 m/s in 2 s",
      ["A car that goes from 0 to 20 m/s in 10 s", "A cyclist who gains 5 m/s over 5 s", "A boat that gains 8 m/s over 8 s"],
      "Acceleration is velocity change per second: the puck gains 10 m/s every second; the car 2; the cyclist 1; the boat 1. Same final speed as the car, one fifth of the time: five times the acceleration.", {});
  },
  function () {
    return mcq("A motion described as 'uniform' (constant velocity) has an acceleration of",
      "zero: the velocity is not changing at all",
      ["9.8 m/s², like gravity", "whatever the velocity is", "one, by definition"],
      "Acceleration measures change: no change in speed and no change in direction means no acceleration, however fast the object travels. A cruising airliner at 900 km/h in a straight line has zero acceleration.", {});
  }
]), ["Big acceleration means velocity changing fast, not velocity being big."]);

E("sci-u3-round-trip", 3, ["SC10.8.8"], 3, "gen", function () {
  var combos = [[10, 6], [12, 8], [8, 4], [15, 10], [9, 6]];
  var c = s6pick(combos);
  var vOut = c[0], vBack = c[1];
  var d = 120;
  var tTot = d / vOut + d / vBack;
  var avg = 2 * d / tTot;
  var key = s6sf(avg, 2);
  var naive = s6sf((vOut + vBack) / 2, 2);
  return mcq("A kayaker paddles 120 m across a pond at " + vOut + " m/s and returns the same 120 m at " + vBack + " m/s. The average speed for the round trip is",
    key + " m/s", [naive + " m/s", s6sf(vOut, 2) + " m/s", s6sf(2 * d / (d / vOut), 2) + " m/s"],
    "Average speed is total distance over total time: time out = 120/" + vOut + " = " + s6sf(d / vOut, 3) + " s; time back = 120/" + vBack + " = " + s6sf(d / vBack, 3) + " s; average = 240 / " + s6sf(tTot, 3) + " = " + key + " m/s. Simply averaging the two speeds (" + naive + ") is wrong because more time is spent at the slower speed.",
    { avg: avg, key: key });
}, ["Round trips punish the naive average: you spend longer at the slow speed, so it counts for more."]);

/* ----- bank-u4.js ----- */
// CRMARKS: sci-u4-cr-cycle=4
// CRMARKS: sci-u4-cr-bioaccum=3
// CRMARKS: sci-u4-cr-scene=3
/* Science 1206 Unit 4: Sustainability of Ecosystems (SC10.10.1 to 10.8). */

/* ---------- SC10.10.1 Ecological organization, biotic and abiotic ---------- */

E("sci-u4-organization", 4, ["SC10.10.1"], 1, "var", varset([
  function () {
    return mcq("All the caribou in the George River herd form a",
      "population: all the members of one species living in an area at one time",
      ["community: all the different species in an area", "ecosystem: a community plus its abiotic factors", "biome: a large region with a characteristic climate"],
      "One species, one place, one time: population. Add the other species and it becomes a community; add the non-living environment and it becomes an ecosystem; scale up to a climate region and it is a biome.", {});
  },
  function () {
    return mcq("A pond's community plus the water, sunlight, dissolved oxygen and mud it interacts with is called",
      "an ecosystem: the living community together with the abiotic factors it exchanges matter and energy with",
      ["a population", "a habitat only", "a biosphere"],
      "Ecosystem = community + abiotic environment, with the interactions counted. A habitat is just the place an organism lives; the biosphere is the global sum of all ecosystems.", {});
  },
  function () {
    return mcq("Which list contains only abiotic factors?",
      "Temperature, sunlight, soil pH, dissolved oxygen and wind",
      ["Bacteria, fungi, temperature and sunlight", "Soil pH, algae, wind and rainfall", "Predators, prey, temperature and water"],
      "Abiotic means non-living: physical and chemical conditions. Bacteria, fungi, algae, predators and prey are all living (biotic), whatever list they sneak into.", {});
  }
]), ["One species is a population; all the species are a community; community plus the non-living world is an ecosystem."]);

E("sci-u4-niche-habitat", 4, ["SC10.10.1"], 2, "var", varset([
  function () {
    return mcq("An organism's niche is best described as",
      "its role in the ecosystem: what it eats, what eats it, where and when it is active, and how it interacts with other organisms and factors",
      ["the exact physical spot where it sleeps", "the size of its territory", "the species it belongs to"],
      "Habitat is the address; niche is the job description. Two species can share a habitat, but if their niches overlap completely, competition sharpens until one wins out.", {});
  },
  function () {
    return mcq("A moose's habitat, stated properly, is",
      "the boreal forest and wetland environment where it lives and finds food, water and shelter",
      ["eating shrubs and aquatic plants", "being prey for wolves and bears", "competing with caribou for browse"],
      "Habitat names the place and its conditions. Eating, being eaten and competing are interactions, parts of the niche instead. Mixing the two lists is the classic slip.", {});
  }
]), ["Habitat is where; niche is what it does there."]);

/* ---------- SC10.10.2 Populations ---------- */

E("sci-u4-growth-curves", 4, ["SC10.10.2"], 2, "gen", function () {
  var K = s6pick([400, 600, 800, 1000]);
  var rE = Math.log(0.8 * (K + 200) / 8) / 40;
  var lines = [
    { fn: function (x) { return K / (1 + Math.exp(-0.16 * (x - 18))) + 5; }, col: S6_ACC, label: "L", labelPt: [35, K * 0.8] },
    { fn: function (x) { return 8 * Math.exp(rE * x); }, col: S6_ALT, label: "E", labelPt: [31, 8 * Math.exp(rE * 31) * 0.75] }
  ];
  var fig = s6GraphSVG({ xMax: 40, yMax: K + 200, xStep: 10, yStep: s6niceStep(K + 200), xLab: "time", yLab: "population size", lines: lines });
  var mode = s6pick(["which", "capacity", "phase"]);
  var q;
  if (mode === "which") {
    q = mcq("Two populations are graphed. Curve L levels off while curve E climbs ever more steeply. Curve L shows",
      "logistic growth: the population grows quickly, then levels at the environment's carrying capacity as limiting factors bite",
      ["exponential growth with no limits", "a population going extinct", "growth controlled only by predators arriving late"],
      "The S-curve is logistic: early exponential-like growth, then a ceiling. The ceiling is the carrying capacity, the population the environment can sustain with its food, space and other limits. Curve E is the unbounded exponential (J-curve).", { mode: mode });
  } else if (mode === "capacity") {
    q = mcq("From curve L on the graph, the carrying capacity of this environment for the population is approximately",
      K + " individuals: the level where the curve flattens",
      [(K + 400) + " individuals", Math.round(K / 2) + " individuals: the halfway point of the rise", " impossible to read from a growth curve"],
      "Carrying capacity is read where growth stops: the plateau. Curve L flattens at about " + K + ", so the environment sustains roughly " + K + " individuals of this species over the long term.", { mode: mode, K: K });
  } else {
    q = mcq("A population introduced to a new island with plentiful food and no predators at first follows the pattern of curve E. The realistic long-term expectation is that",
      "growth will slow and level off (switching to the logistic pattern) as food, space and waste limits appear",
      ["growth will stay exponential forever, because nothing eats them", "the population will stop growing the moment food drops by any amount", "the population will return to zero on its own"],
      "Exponential growth is always a temporary chapter: resources are finite, so limiting factors eventually bend the J into an S. Island introductions (rabbits, deer, and locally, moose in Newfoundland's history) show the boom first and the limits later.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["J-curve is exponential (no limits yet); S-curve is logistic (limits reached); the plateau is the carrying capacity."]);

E("sci-u4-pop-change", 4, ["SC10.10.2"], 2, "gen", function () {
  var start = s6pick([850, 1200, 2400]);
  var B = s6pick([120, 200, 340]), D = s6pick([80, 150, 210]), I = s6pick([30, 45, 60]), E2 = s6pick([25, 40, 55]);
  var end = start + B - D + I - E2;
  var mode = s6pick(["end", "factor"]);
  if (mode === "end") {
    return mcq("A snowshoe hare population starts the year at " + s6fmt(start) + ". Over the year: " + B + " are born, " + D + " die, " + I + " immigrate in and " + E2 + " emigrate out. The year-end population is",
      s6fmt(end), [s6fmt(start + B - D), s6fmt(start + B + D + I + E2), s6fmt(end + D)],
      "Change = (births + immigration) - (deaths + emigration) = (" + B + " + " + I + ") - (" + D + " + " + E2 + ") = " + (B + I - D - E2) + ". " + s6fmt(start) + " + (" + (B + I - D - E2) + ") = " + s6fmt(end) + ". Arrivals add and departures subtract, whatever door they use.", { end: end });
  }
  return mcq("In the hare population data (" + B + " births, " + D + " deaths, " + I + " immigrating, " + E2 + " emigrating), which pair of factors INCREASES the population?",
    "Births and immigration: both add individuals to the population",
    ["Births and emigration", "Deaths and immigration", "Deaths and emigration"],
    "Two doors in (birth, immigration) and two doors out (death, emigration). Net growth happens only when the in-door total beats the out-door total.", { mode: mode });
}, ["Population change is bookkeeping: (births + immigration) - (deaths + emigration)."]);

E("sci-u4-limiting", 4, ["SC10.10.2"], 2, "var", varset([
  function () {
    return mcq("A disease spreads through a dense caribou herd, killing a larger fraction of animals than it would in a scattered herd. Disease here is a",
      "density-dependent limiting factor: its impact grows as the population gets more crowded",
      ["density-independent factor: it strikes the same regardless of crowding", "an abiotic factor", "a carrying capacity"],
      "Density-dependent factors (disease, competition, predation pressure) bite harder as density rises, which is what makes them regulators. A flood or a hard frost is density-independent: it takes its share of a sparse herd and a dense one alike.", {});
  },
  function () {
    return mcq("A late-June frost kills half the new growth on blueberry barrens across the whole region, in crowded patches and sparse ones alike. The frost acts as a",
      "density-independent limiting factor: its effect does not depend on how crowded the plants are",
      ["density-dependent factor", "form of competition", "predator"],
      "Weather events are the standard density-independent examples: the fraction harmed is set by exposure, not by population density. They can crash a population, but they do not regulate it smoothly the way density-dependent factors do.", {});
  },
  function () {
    return mcq("As a moose population grows toward the carrying capacity of its range, the growth rate slows mainly because",
      "limiting factors (food shortage, competition, parasites) raise deaths and lower births until gains and losses balance",
      ["moose decide to reproduce less for the good of the herd", "the population reaches a fixed age and stops", "immigration becomes physically impossible"],
      "No planning is involved: scarcer browse per animal means poorer condition, fewer calves and more deaths. The balance point where births plus immigration equal deaths plus emigration is the carrying capacity in action.", {});
  }
]), ["Sort limiting factors by one question: does the impact grow with crowding?"]);

/* ---------- SC10.10.3 Cycles of matter ---------- */

E("sci-u4-carbon-cycle", 4, ["SC10.10.3"], 2, "gen", function () {
  var ask = s6pick([1, 2, 3, 4, 5, 6, 7]);
  var names = { 1: "photosynthesis: plants draw carbon dioxide out of the air and lock its carbon into sugars", 2: "feeding: animals take in carbon by eating plants (or other animals)", 3: "respiration by animals: carbon returns to the air as carbon dioxide", 4: "respiration by plants: some of the plant's carbon returns to the air as carbon dioxide", 5: "death and waste: carbon passes to decomposers in dead material and droppings", 6: "decay: decomposers release carbon back to the air as carbon dioxide", 7: "combustion: burning fossil fuels releases stored carbon as carbon dioxide" };
  var others = [1, 2, 3, 4, 5, 6, 7].filter(function (n) { return n !== ask; });
  var dis = s6shuf(others).slice(0, 3).map(function (n) { return names[n]; });
  var q = mcq("The diagram numbers the processes of the carbon cycle. Process " + ask + " is",
    names[ask], dis,
    "Trace the arrow for process " + ask + ": " + names[ask] + ". The cycle has no start and no waste pile: every arrow is carbon changing hands between the air, living things, and the ground.",
    { ask: ask });
  q.figure = s6CycleSVG();
  return q;
}, ["Follow the arrow's direction: into a box stores carbon there; out of a box releases it."]);

E("sci-u4-nitrogen", 4, ["SC10.10.3"], 2, "var", varset([
  function () {
    return mcq("Plants cannot use nitrogen gas (N2) directly from the air, even though air is 78 percent nitrogen. The step that makes nitrogen usable is",
      "nitrogen fixation: certain bacteria (and lightning) convert N2 into compounds such as ammonia and nitrates that plants can absorb",
      ["photosynthesis by the plant's leaves", "respiration in the roots", "evaporation of soil water"],
      "The triple bond in N2 is too strong for most organisms to break. Fixing bacteria, many living in legume root nodules, do the chemistry; that is why clover and alders enrich a soil and why farmers rotate legumes.", {});
  },
  function () {
    return mcq("Denitrification is the part of the nitrogen cycle that",
      "returns nitrogen to the atmosphere: bacteria in waterlogged soil convert nitrates back into nitrogen gas",
      ["builds proteins inside animal bodies", "adds nitrate fertilizer to fields", "converts ammonia into plant food"],
      "The cycle closes where it opened: denitrifying bacteria turn nitrates back into N2 gas, balancing the fixers. Waterlogged soils (bogs and wetlands, common here) are denitrification hotspots.", {});
  },
  function () {
    return mcq("Excess nitrogen fertilizer washing off fields into a pond most directly causes",
      "an algal bloom: the added nitrogen (with phosphorus) removes the nutrient limit on algae, which multiply, die and decay, using up the water's oxygen",
      ["the pond water to become sterile", "nitrogen gas to bubble out until the pond is empty of nitrogen", "fish to grow faster with no downside"],
      "Nitrogen is a limiting nutrient in most fresh water, so adding it lifts the limit. The bloom's decay is the oxygen problem: decomposers consume dissolved oxygen faster than it is replaced, and fish suffocate in water full of life gone wrong (eutrophication).", {});
  }
]), ["Nitrogen's problem is access: fixation opens the door, denitrification closes the loop."]);

E("sci-u4-cycle-reason", 4, ["SC10.10.3"], 3, "var", varset([
  function () {
    return mcq("Cutting down a forest and burning the wood affects the carbon cycle in two ways that both raise atmospheric carbon dioxide. The two ways are",
      "combustion releases the trees' stored carbon at once, and removing the trees ends their photosynthesis, so less carbon dioxide is drawn back out",
      ["the soil stops producing carbon dioxide entirely", "rainfall over the region becomes carbonated", "animals move in and breathe harder"],
      "A standing forest is both a store and a pump. Burning empties the store in days; clearing stops the pump for decades. Either alone raises CO2; together they are the double effect that makes deforestation a major term in the carbon budget.", {});
  },
  function () {
    return mcq("Peat bogs cover large areas of Newfoundland and Labrador and matter to the global carbon cycle because",
      "waterlogged, acidic peat slows decay almost to a stop, locking carbon away in the ground for thousands of years",
      ["peat produces oxygen faster than forests", "bogs convert carbon dioxide directly into peat fuel for export", "bog water dissolves carbon dioxide permanently"],
      "Decay needs what a bog denies: oxygen and warmth. Plant material sinks into cold, airless water and accumulates as peat instead of rotting back to CO2, making northern peatlands one of the planet's great long-term carbon stores. Draining or burning peat reverses the storage.", {});
  }
]), ["Cycles questions come down to stores and flows: what holds the element, and which arrows speed up or slow down."]);

/* ---------- SC10.10.4 Soil ---------- */

E("sci-u4-soil", 4, ["SC10.10.4"], 1, "var", varset([
  function () {
    return mcq("From the surface downward, the usual order of soil horizons is",
      "O (organic litter), A (topsoil), B (subsoil), C (parent material), over bedrock",
      ["A (topsoil), O (litter), C (parent material), B (subsoil)", "Bedrock, C, B, A, O from the top", "Topsoil, bedrock, subsoil, litter"],
      "Soil is built in layers: dead material on top, dark humus-rich topsoil where most roots and organisms live, paler subsoil where washed-down minerals collect, then broken parent rock. Remember 'O-A-B-C' from the surface down.", {});
  },
  function () {
    return mcq("Topsoil (the A horizon) is the most valuable layer for plants because it",
      "contains the humus (decayed organic matter) that holds nutrients and water, plus most of the soil's living organisms",
      ["is the deepest layer, closest to groundwater", "is made of pure sand that drains fastest", "contains no organisms to compete with roots"],
      "Humus is the soil's bank account: it stores nutrients, holds moisture and feeds the microbes that cycle matter. Lose the A horizon to erosion and the land's productivity goes with it, which is why topsoil loss is treated as a slow emergency.", {});
  },
  function () {
    return mcq("Leaching in soil refers to",
      "water percolating down through the soil and carrying dissolved minerals and nutrients with it, out of the upper horizons",
      ["plants pulling water upward against gravity", "earthworms mixing the horizons together", "frost heaving stones to the surface"],
      "Heavy rainfall regions (including this province) leach their soils steadily: nutrients wash from the A horizon into the B, leaving acidic, nutrient-poor topsoil. It is one reason local garden soils need lime and feeding.", {});
  }
]), ["O, A, B, C from the top down; the A horizon is where the value is."]);

E("sci-u4-soil-ph", 4, ["SC10.10.4"], 2, "var", varset([
  function () {
    return mcq("Most garden and farm plants grow best in soil that is",
      "slightly acidic to neutral (about pH 6.0 to 7.0): at that range, essential nutrients stay available to roots",
      ["strongly acidic (pH 3 to 4)", "strongly alkaline (pH 10 to 11)", "any pH at all: pH does not affect plants"],
      "Soil pH controls nutrient availability, not just comfort: in strongly acidic soil, aluminum becomes soluble (toxic) and phosphorus locks up; in strongly alkaline soil, iron and manganese lock up instead. The middle range keeps the pantry open.", {});
  },
  function () {
    return mcq("Newfoundland garden soils are often too acidic for vegetables. The standard correction is to add",
      "crushed limestone (lime): a base that neutralizes some of the soil acidity and raises the pH toward neutral",
      ["sulfur, to lower the pH further", "peat moss, to acidify the soil", "extra rainwater collected in barrels"],
      "Liming is neutralization applied to a field: calcium carbonate reacts with soil acids (the same chemistry as Unit 2's antacid). Peat and sulfur push pH the wrong way for this problem.", {});
  },
  function () {
    return mcq("Acid precipitation harms forests partly through the soil: as soil acidifies,",
      "toxic aluminum is released from soil minerals and damages roots, while nutrient cations such as calcium and magnesium leach away faster",
      ["the soil becomes so basic that roots dissolve", "all soil bacteria multiply beyond control", "the horizons physically swap places"],
      "Acid rain's damage runs underground: hydrogen ions displace nutrient cations (washed away by leaching) and free aluminum that healthy soil keeps locked up. Trees then starve and weaken even if the rain never touches their leaves.", {});
  }
]), ["Soil pH is a nutrient-availability switch: lime raises it, and the province's soils usually need exactly that."]);

/* ---------- SC10.10.5 Bioaccumulation ---------- */

E("sci-u4-bioaccum-table", 4, ["SC10.10.5"], 3, "gen", function () {
  var base = s6pick([0.002, 0.005, 0.01, 0.02]);
  var factor = 10;
  var levels = ["Water fleas (zooplankton)", "Capelin (small fish)", "Cod (larger fish)", "Harbour seal"];
  var conc = levels.map(function (_, i) { return base * Math.pow(factor, i); });
  var mode = s6pick(["top", "factor", "whyrisk"]);
  function fmt(v) { return v < 0.1 ? v.toFixed(3) : (v < 1 ? v.toFixed(2) : String(Math.round(v * 10) / 10)); }
  var tableTxt = "Concentrations of a persistent pesticide in a harbour food chain: " + levels.map(function (n, i) { return n + " " + fmt(conc[i]) + " ppm"; }).join("; ") + ".";
  if (mode === "top") {
    var key = fmt(conc[3]) + " ppm";
    return mcq(tableTxt + " The concentration in the harbour seal is",
      key, s6dis(key, [fmt(conc[2]) + " ppm", fmt(conc[3] * 10) + " ppm", fmt(base * 4) + " ppm", fmt(conc[1]) + " ppm"], 3),
      "Each trophic step multiplies the concentration by about 10: " + fmt(base) + " → " + fmt(conc[1]) + " → " + fmt(conc[2]) + " → " + fmt(conc[3]) + " ppm. The seal carries roughly 1000 times the water fleas' concentration.",
      { mode: mode });
  }
  if (mode === "factor") {
    return mcq(tableTxt + " By what factor is the pesticide concentrated from the water fleas to the harbour seal?",
      "1000 times: three trophic transfers at about 10 times each (10 x 10 x 10)",
      ["10 times", "30 times", "4 times, one for each level listed"],
      "Count the arrows, not the animals: flea to capelin (x10), capelin to cod (x10), cod to seal (x10). Three multiplications of 10 compound to 1000. This compounding is the magnification in biomagnification.", { mode: mode });
  }
  return mcq(tableTxt + " The seal faces the greatest risk from this pesticide mainly because",
    "it sits at the top of the chain: it eats many contaminated cod over a long life, and the persistent chemical is stored in fat faster than the body can break it down or excrete it",
    ["seals drink more harbour water than fish do", "the pesticide is produced inside seal tissue", "seals have no predators to keep their numbers down"],
    "Two ingredients make biomagnification dangerous: the chemical persists (it is not broken down), and each predator concentrates what its many prey carried. Long-lived top consumers collect the whole chain's burden.", { mode: mode });
}, ["Count the arrows between levels and multiply by ten for each: the top of the chain collects everything."]);

E("sci-u4-bioaccum-concepts", 4, ["SC10.10.5"], 2, "var", varset([
  function () {
    return mcq("Bioaccumulation and biomagnification differ in that",
      "bioaccumulation is the build-up of a substance inside one organism over its life; biomagnification is the increasing concentration at higher trophic levels of a food chain",
      ["bioaccumulation happens only in water, biomagnification only on land", "biomagnification is the build-up inside one organism over its life", "they are two names for exactly the same process"],
      "One organism versus the whole chain: a mussel accumulating metals from the water is bioaccumulation; the gull eating a thousand mussels and ending with far higher levels is biomagnification. The seal table question shows the chain effect.", {});
  },
  function () {
    return mcq("DDT was banned in Canada after it was linked to thinning eggshells in eagles and falcons. The birds were exposed so heavily because",
      "DDT persists in the environment and biomagnifies: top predators ate many contaminated prey, concentrating the chemical until it interfered with calcium use in eggshells",
      ["farmers sprayed DDT directly on the birds' nests", "the birds drank DDT from puddles on farms", "DDT was fed to the birds as medicine"],
      "The birds were never the target and never touched the spray: the food chain delivered the dose. Persistence plus trophic magnification is exactly the combination that makes a 'safe at low levels' chemical dangerous at the top.", {});
  },
  function () {
    return mcq("Mercury advisories tell people to limit how much large predatory fish (such as shark or swordfish) they eat, especially during pregnancy, because",
      "methylmercury biomagnifies, so long-lived top predators carry the highest mercury levels, and mercury damages the developing nervous system",
      ["large fish are harder to cook safely", "mercury evaporates from small fish before they are caught", "the advisories are about the fish's own health"],
      "Same pattern, different chemical: emissions become methylmercury in water, plankton take it up, and each trophic step multiplies it. A top predator's flesh can carry a million times the water's concentration, which is why size and trophic level, not freshness, drive the advice.", {});
  }
]), ["Persistence plus a food chain equals magnification: the top consumer always gets the largest dose."]);

/* ---------- Food webs (drawn) ---------- */

function s6WebSVG() {
  function box(x, y, label, fill) {
    return '<rect x="' + x + '" y="' + y + '" width="98" height="24" rx="5" fill="' + (fill || "#eef4ef") + '" stroke="' + S6_INK + '"/>' + s6txt(x + 49, y + 16, label, 11);
  }
  function arrow(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + S6_ALT + '" stroke-width="2" marker-end="url(#ah)"/>';
  }
  var s = '<svg viewBox="0 0 420 260" width="410" role="img" aria-label="A simple food web. Arrows point from the organism eaten to the eater.">';
  s += '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 Z" fill="' + S6_ALT + '"/></marker></defs>';
  s += box(30, 210, "Shrubs & grasses", "#e6f0e6"); s += box(165, 210, "Berries & seeds", "#e6f0e6"); s += box(300, 210, "Aquatic plants", "#e6f0e6");
  s += box(30, 140, "Snowshoe hare"); s += box(165, 140, "Field mouse"); s += box(300, 140, "Tadpole");
  s += box(95, 70, "Red fox"); s += box(240, 70, "Great horned owl"); s += box(310, 70, "Frog");
  s += box(165, 8, "Lynx");
  s += arrow(79, 210, 79, 166); s += arrow(214, 210, 214, 166); s += arrow(349, 210, 349, 166);
  s += arrow(100, 140, 130, 96); s += arrow(230, 140, 262, 96); s += arrow(349, 140, 349, 96);
  s += arrow(90, 70, 190, 34); s += arrow(215, 140, 150, 96); s += arrow(290, 70, 240, 34);
  s += s6txt(8, 18, "Arrows point from food to eater", 10, false, "start", "#666");
  s += "</svg>";
  return s;
}
E("sci-u4-foodweb", 4, ["SC10.10.1", "SC10.10.2"], 2, "gen", function () {
  var mode = s6pick(["producer", "topeater", "remove", "energy"]);
  var q;
  if (mode === "producer") {
    q = mcq("In the food web shown, the producers are",
      "shrubs and grasses, berries and seeds, and aquatic plants: they make their own food by photosynthesis and every arrow of energy starts with them",
      ["the snowshoe hare, field mouse and tadpole", "the red fox and the lynx", "the great horned owl and the frog"],
      "Producers sit at the base and have only outgoing arrows (others eat them; they eat nothing in the web). Every consumer in the web traces its energy back to one of these three.", { mode: mode });
  } else if (mode === "topeater") {
    q = mcq("Which organism in the web is a top consumer (nothing in this web eats it)?",
      "The lynx: arrows point into it from fox and owl prey lines, but no arrow leaves it toward another predator",
      ["The red fox", "The great horned owl", "The snowshoe hare"],
      "Follow the arrows: the fox is eaten by the lynx, and the owl is also taken by the lynx in this web (both arrows run upward into the lynx). The lynx alone has incoming arrows only.", { mode: mode });
  } else if (mode === "remove") {
    q = mcq("If the snowshoe hare were removed from this web, the most direct effects would be",
      "the fox loses a major prey, and the shrubs and grasses face less grazing pressure; the lynx then leans harder on its other prey",
      ["nothing changes: every species has exactly one food", "the producers all die out within a season", "the owl immediately goes extinct"],
      "Webs buffer shocks precisely because most consumers have more than one food (the fox also takes mice). Removal ripples: prey of the hare's predators get hunted harder, and the hare's food is released. Single-chain thinking overstates the damage; ignoring the ripples understates it.", { mode: mode });
  } else {
    q = mcq("A frog in this web gets its energy from the tadpole it eats. Tracing the energy back, the frog's energy originally came from",
      "the Sun, captured by the aquatic plants through photosynthesis, then passed to the tadpole and then the frog",
      ["the water itself, which produces energy as it flows", "the soil under the pond", "the frog's own respiration"],
      "Every food chain is a relay of captured sunlight: producer photosynthesis is the entry point, and each consumer passes along only a fraction (about 10 percent) of what it received, which is why chains stay short.", { mode: mode });
  }
  q.figure = s6WebSVG();
  return q;
}, ["Arrows point from the eaten to the eater: energy flows in the direction of the arrowheads."]);

/* ---------- SC10.10.6 and 10.7 Interactions, adaptations ---------- */

E("sci-u4-symbiosis", 4, ["SC10.10.7"], 1, "var", varset([
  function () {
    return mcq("Lichen is a partnership of a fungus and an alga: the fungus provides shelter and moisture, the alga photosynthesizes food for both. This relationship is",
      "mutualism: both partners benefit",
      ["commensalism: one benefits, the other is unaffected", "parasitism: one benefits at the other's expense", "predation"],
      "Score the relationship for each side: fungus + (shelter traded for food), alga +. Two pluses is mutualism. Parasitism is + and -, commensalism is + and 0.", {});
  },
  function () {
    return mcq("A black-legged tick feeds on a moose's blood and can weaken the animal through the winter. The tick and moose relationship is",
      "parasitism: the tick benefits and the moose is harmed",
      ["mutualism", "commensalism", "competition"],
      "The tick gains meals; the moose loses blood, energy and sometimes its life to heavy infestations (winter tick is a real and growing pressure on moose here). Plus for one, minus for the other: parasitism.", {});
  },
  function () {
    return mcq("Whale barnacles ride on a whale's skin, gaining transport to food-rich waters; the whale is neither helped nor noticeably harmed. This is",
      "commensalism: one benefits, the other is unaffected",
      ["mutualism: both benefit", "parasitism: one is harmed", "intraspecific competition"],
      "One plus and one zero: commensalism. The test is the second partner's score: no clear benefit rules out mutualism, and no harm rules out parasitism.", {});
  },
  function () {
    return mcq("Two bull moose fight over access to a cow moose during the rut. This interaction is",
      "intraspecific competition: members of the SAME species competing for a resource (here, mates)",
      ["interspecific competition: different species competing", "predation", "mutualism"],
      "Intra means within: same species. Inter means between species. The contested resource (food, mates, territory, light) can be anything; the classification turns only on whether the rivals are the same species.", {});
  }
]), ["Score each partner (+, -, 0) and the relationship names itself."]);

E("sci-u4-adaptations", 4, ["SC10.10.7"], 2, "var", varset([
  function () {
    return mcq("The snowshoe hare turns white in winter and brown in summer. This adaptation helps it survive mainly by",
      "camouflage: matching the background in each season makes it harder for predators (lynx, owls, foxes) to spot",
      ["keeping it warmer in winter through white fur insulation", "signalling to other hares that winter has arrived", "absorbing more sunlight in summer to speed digestion"],
      "The colour tracks the background, not the temperature: a white hare on snow and a brown hare on bare ground are both hard to see. Climate shifts that uncouple snow cover from the hare's timing expose it, which is why this adaptation is now a climate-change case study.", {});
  },
  function () {
    return mcq("A ptarmigan's feathered feet act like snowshoes, spreading its weight on snow. This is classified as a",
      "structural (physical) adaptation: a body feature that improves survival in its environment",
      ["behavioural adaptation: something the bird does", "physiological adaptation: an internal body process", "learned behaviour passed down by teaching"],
      "The three families: structural (built into the body), behavioural (actions, like migration), physiological (internal chemistry, like producing antifreeze proteins). Feathered feet are anatomy, so structural.", {});
  },
  function () {
    return mcq("Spruce trees in exposed coastal sites grow flagged: branches only on the sheltered side, trunks bent away from the wind (tuckamore). This growth pattern is",
      "a response to an abiotic factor: the constant wind prunes and shapes the growing tree",
      ["a disease caused by a fungus", "damage done by moose browsing", "a genetic defect in coastal spruce"],
      "Wind is abiotic, and the tree's shape is a living record of it. The same species grows tall and straight inland: the difference is environment, not genes, which is the mark of a plastic response to a non-living factor.", {});
  }
]), ["Adaptation questions ask 'what problem does this solve?' Name the problem first."]);

/* ---------- SC10.10.8 Biodiversity, succession, sustainability ---------- */

E("sci-u4-biodiversity", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("A forest with many species is generally more stable than a single-species plantation because",
      "biodiversity provides backups: if one species is hit by disease or a bad year, others fill its role, and food webs reroute",
      ["more species means more sunlight reaches the forest", "plantations are illegal in Canada", "diverse forests have no pests at all"],
      "Diversity is insurance. A spruce plantation can be levelled by one budworm outbreak with the right host everywhere; a mixed forest loses some trees and keeps functioning. Stability comes from the web having alternate paths.", {});
  },
  function () {
    return mcq("After a forest fire clears a stand, grasses and fireweed move in first, then shrubs, then birch and aspen, and finally spruce and fir return. This sequence is",
      "secondary succession: regrowth on a site where soil already exists",
      ["primary succession: life colonizing bare rock for the first time", "eutrophication", "biomagnification"],
      "The soil (and seeds, roots and microbes) survived the fire, so the community rebuilds in stages: that is secondary succession. Primary succession starts from bare rock or new land, where soil itself must be built first, and takes far longer.", {});
  },
  function () {
    return mcq("A keystone species is one whose",
      "effect on its ecosystem is far larger than its numbers suggest: removing it reshapes the whole community (sea otters holding kelp forests together by eating urchins is the classic case)",
      ["population is the largest in the ecosystem", "name appears first in the species list", "body size is the biggest of any consumer"],
      "Keystone status is about leverage, not abundance. Sea otters are few compared with urchins, but remove the otters and urchins strip the kelp, collapsing the habitat for hundreds of other species.", {});
  }
]), ["Diversity is insurance; succession is rebuilding, and it is secondary whenever the soil survives."]);

E("sci-u4-external", 4, ["SC10.10.6"], 3, "var", varset([
  function () {
    return mcq("The European green crab, an invasive species, has spread into Placentia Bay and other local waters, where it digs up eelgrass beds and eats juvenile shellfish. Its success as an invader is best explained by",
      "arriving without its natural predators and diseases, in an environment with food and habitat it can exploit, so its population grows unchecked",
      ["being the largest crab species in the Atlantic", "local species choosing not to compete with it", "the water being too warm for any native crabs"],
      "Invasions are population ecology with the limits removed: enemy release plus available resources gives exponential-style growth, and the damage falls on native species that evolved without this predator or competitor.", {});
  },
  function () {
    return mcq("The 1992 northern cod moratorium followed decades of improving fishing technology and rising catches. In population terms, the collapse happened because",
      "the harvest removed fish faster than births and growth could replace them, so the population was pushed far below a sustainable level and spawning stock shrank",
      ["cod migrated permanently to another ocean", "the ocean ran out of plankton in one season", "cod stopped reproducing for genetic reasons"],
      "A harvested population is a balance sheet: removals beyond the surplus production draw down the capital (the spawning stock). Once the breeders are too few, even stopping the harvest entirely gives a slow, uncertain recovery, which is the lesson the moratorium taught.", {});
  },
  function () {
    return mcq("A highway and subdivision split a forest into two patches, and a ground-nesting bird disappears from the smaller patch within a few years while surviving in the larger one. The best explanation is",
      "habitat fragmentation: the small patch cannot support a viable population (too few mates, too much edge exposure to predators and weather), so local extinction follows even though some habitat remains",
      ["the birds all chose to move to the bigger patch", "the smaller patch's soil changed type", "birds cannot cross roads under any circumstances"],
      "Fragmentation shrinks effective population size and raises edge effects. A patch can look green and suitable yet function as a sink, which is why conservation planning counts connected area, not just any green space.", {});
  }
]), ["External factors work through the same population bookkeeping: births, deaths, and the limits they run into."]);

E("sci-u4-sustainability", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("Sustainability, as used in this unit, means",
      "using resources and managing ecosystems so that present needs are met without destroying the ability of future generations (and other species) to meet theirs",
      ["never using any natural resource at all", "maximizing this year's harvest while prices are high", "keeping every ecosystem exactly as it is today, with no change allowed"],
      "Sustainability is not zero use and not frozen nature; it is use within the system's replacement rates, so the capital (soil, stocks, cycles) survives the spending of the interest. The cod collapse is the local monument to the opposite choice.", {});
  },
  function () {
    return mcq("A town wants its fishery to be sustainable. Which policy best fits the science of this unit?",
      "Set catch limits from population surveys so the harvest stays within the stock's surplus production, and protect spawning habitat",
      ["Let each boat catch as much as it can while fish are plentiful", "Ban all fishing permanently, everywhere", "Import fish and stop monitoring the local stock"],
      "Sustainable harvest is arithmetic plus habitat: measure the population, take less than the growth, and keep the nursery habitat intact. A permanent total ban is more than sustainability requires, and unmonitored freedom is how stocks collapse.", {});
  },
  function () {
    return mcq("An ecological footprint measures",
      "the area of land and water needed to supply a person's (or a nation's) resources and absorb its wastes, letting lifestyles be compared for sustainability",
      ["the physical size of a person's property", "the number of species a person can name", "the distance a person walks outdoors each year"],
      "The footprint converts consumption into the one currency ecosystems deal in: productive area. When humanity's total footprint exceeds the planet's productive area (overshoot), the difference is paid out of stored capital, like drawing down a bank account.", {});
  }
]), ["Sustainability is living on the interest, not the capital."]);

/* ---------- Unit 4 CR ---------- */

E("sci-u4-cr-cycle", 4, ["SC10.10.3"], 2, "var", varset([
  function () {
    return textq("The carbon cycle and the atmosphere (4 marks)\n(a) Name the process by which plants remove carbon dioxide from the atmosphere, and state where the carbon goes. (1)\n(b) Describe TWO different processes that return carbon to the atmosphere as carbon dioxide. (1)\n(c) Explain how burning fossil fuels AND clearing forests together increase atmospheric carbon dioxide more than either would alone. (1)\n(d) State one consequence of rising atmospheric carbon dioxide for ecosystems, and one action that reduces the increase. (1)", ["(a) Photosynthesis: the carbon is built into sugars and then into plant tissues (biomass)."], 
      "(a) Photosynthesis: the carbon is built into sugars and then into plant tissues (biomass). (b) Any two: respiration by plants, animals and decomposers; decay of dead matter by decomposers; combustion of wood or fossil fuels. (c) Burning releases carbon that was locked away underground for millions of years, adding new carbon to the active cycle; clearing forests releases the trees' stored carbon AND removes the photosynthesis that would draw carbon back down. The source grows while the sink shrinks, so the two effects add. (d) Consequence (any one): shifting climate zones stress species adapted to local conditions; ocean acidification harms shell-building organisms; longer growing seasons change species interactions. Action (any one): burn less fossil fuel (efficiency, renewables), protect or replant forests and peatlands, restore wetlands.", 
      {});
  },
  function () {
    return textq("The carbon cycle in a bog (4 marks)\nPeat bogs are common across Newfoundland and Labrador.\n(a) Explain why dead plants in a bog decay so slowly, referring to the conditions in the bog. (1)\n(b) State what happens to the carbon in those dead plants over thousands of years, and why bogs are called a carbon store. (1)\n(c) A developer drains a bog to build on it. Explain, using the carbon cycle, why draining the bog leads to carbon dioxide being released. (1)\n(d) Give one other reason, besides carbon storage, why protecting bogs matters to local ecosystems. (1)", ["(a) The bog is waterlogged, so the dead material sits in cold water with very little oxygen, and the water is acidic: decomposer organisms need oxygen, so decay nearly stops."], 
      "(a) The bog is waterlogged, so the dead material sits in cold water with very little oxygen, and the water is acidic: decomposer organisms need oxygen, so decay nearly stops. (b) The carbon accumulates as peat instead of returning to the air: layer on layer of partly decayed material locks carbon away for thousands of years, a long-term store rather than a quick pass-through. (c) Draining lets oxygen reach the peat: decomposers can then work, respiration and decay resume, and the stored carbon is released as carbon dioxide (the bog flips from store to source). (d) Any one: bogs are habitat for specialized species (orchids, pitcher plants, breeding birds); they hold water and reduce downstream flooding; they filter water entering streams.", 
      {});
  },
  function () {
    return textq("Fertilizer and a pond (4 marks)\nFarms above a pond apply nitrogen fertilizer to their fields each spring. By midsummer the pond is green with algae, and fish are found gasping at the surface on still mornings.\n(a) Explain how the fertilizer reaches the pond. (1)\n(b) Explain why the algae multiply so rapidly once the fertilizer arrives. (1)\n(c) Explain why the fish run short of oxygen, even though the algae produce oxygen while they grow. (1)\n(d) State one change in farm practice that would reduce the problem, and say why it works. (1)",
      ["(a) Rain washes dissolved fertilizer off the fields as runoff into streams feeding the pond. (b) Nitrogen is a limiting nutrient in the pond, so adding it removes the limit on algal growth. (c) When the algae die, decomposers multiply and their decay consumes dissolved oxygen faster than it is replaced. (d) Any practice that keeps nitrogen on the field or out of the water"],
      "(a) Rain and meltwater dissolve the fertilizer and carry it off the fields as runoff, through ditches and streams into the pond: the nutrient travels with the water cycle. (b) Nitrogen (with phosphorus) is normally the limiting nutrient for pond algae: in short supply, it caps their growth. The runoff removes the cap, and the algae bloom. (c) The bloom is short-lived; when the algae die, decomposer populations explode to decay them, and decay is respiration: it consumes dissolved oxygen faster than photosynthesis and the surface can replace it, worst at night and on still mornings when no new oxygen is being made. Fish suffocate in the depleted water (eutrophication). (d) Any one, with its mechanism: plant buffer strips of vegetation along waterways (roots and soil trap and absorb nutrients before they reach the pond); apply only the amount the crop needs, when it needs it (less surplus to wash away); avoid spreading before heavy rain is forecast (less runoff while the fertilizer sits on the surface).",
      {});
  }
]), ["For cycle questions, name the store, the process on each arrow, and what speeds it up or slows it down."]);

E("sci-u4-cr-bioaccum", 4, ["SC10.10.5"], 3, "var", varset([
  function () {
    return textq("Mercury in a northern food chain (3 marks)\nMercury entering a lake is converted by bacteria into methylmercury, which is stored in body fat and not excreted. Measurements in one lake: phytoplankton 0.004 ppm; zooplankton 0.04 ppm; small fish 0.4 ppm; lake trout (a top predator) 4 ppm.\n(a) By what factor does the concentration increase from phytoplankton to lake trout? Show your reasoning. (1)\n(b) Explain why the trout, and not the phytoplankton, ends up with a dangerous concentration even though the water itself tests at a barely measurable level. (1)\n(c) A public health advisory recommends limiting meals of large lake trout for pregnant people and young children, but sets no limit on small fish from the same lake. Use the data to justify the different advice. (1)", ["(a) 4 / 0.004 = 1000: a thousandfold increase, built from three trophic transfers of about x10 each."], 
      "(a) 4 / 0.004 = 1000: a thousandfold increase, built from three trophic transfers of about x10 each. (b) The chemical persists: each organism keeps what it eats, and a trout eats many small fish over years of life, each carrying the burden of the zooplankton and phytoplankton beneath them. Concentration compounds up the chain, so the top consumer collects the whole lake's worth in its own tissues. (c) The small fish sit at 0.4 ppm, one tenth of the trout's 4 ppm and far below it in total dose per meal; risk follows concentration, and the most vulnerable (developing nervous systems) get the strictest advice where the concentration is highest.", 
      {});
  },
  function () {
    return textq("A pesticide that would not go away (3 marks)\nA persistent pesticide was sprayed on farmland for years at rates considered safe for the organisms sprayed. A decade later, fish-eating birds in the region were found with pesticide levels hundreds of times higher than the water in their lakes, and their eggshells were thinning.\n(a) Name and define the process that produced the birds' high levels. (1)\n(b) Explain why the pesticide's persistence (it breaks down very slowly) is essential to the problem. (1)\n(c) Suggest why 'the spray was applied at a safe concentration' did not protect the birds, and state the lesson for approving new chemicals. (1)", ["(a) Biomagnification: the increasing concentration of a persistent substance at successively higher trophic levels of a food chain."], 
      "(a) Biomagnification: the increasing concentration of a persistent substance at successively higher trophic levels of a food chain. (b) If the chemical broke down quickly, each organism would clear it before being eaten, and concentrations could not compound; persistence means every meal's dose is kept and added to the next, in the prey and then in the predator. (c) Safety was judged at the level of the sprayed organism, but the food chain multiplied the dose a hundredfold before it reached the birds: the effective exposure of top consumers was never 'safe'. The lesson: approval must consider the whole food chain and the chemical's lifetime, not single-species tests at the applied concentration. (This is the DDT story, the case that created modern pesticide regulation.)", 
      {});
  }
]), ["Risk lives at the top of the chain: concentration, persistence and position together decide it."]);

E("sci-u4-cr-scene", 4, ["SC10.10.1", "SC10.10.2"], 3, "var", varset([
  function () {
    var q = textq("Reading an ecosystem scene (3 marks)\nThe illustration shows a forest clearing in late spring: snowshoe hares graze on new grass and low shrubs while a lynx watches from the treeline. Rain has pooled in a shallow hollow; spruce and birch ring the clearing, and fallen leaves cover the ground under the trees.\n(a) From the scene, identify one biotic factor and one abiotic factor. (1)\n(b) Give one example of competition that could occur in this scene, and state whether it is interspecific or intraspecific competition. (1)\n(c) The hare population in the clearing has grown at the same level for several years, with births balanced by deaths and predation. Is this population in equilibrium or in exponential growth? Explain your answer in one or two sentences. (1)", ["(a) Biotic (any one): hares, lynx, grass, shrubs, spruce, birch."],
      "(a) Biotic (any one): hares, lynx, grass, shrubs, spruce, birch. Abiotic (any one): the rainwater pooled in the hollow, sunlight, the soil beneath the fallen leaves. (b) Any one, correctly classified: hares competing with each other for grass or shrubs (intraspecific, same species); grass and shrubs competing for sunlight, water and space (interspecific, different species). (c) Equilibrium: the population size is steady because gains (births) are balanced by losses (deaths, including predation), the pattern of a population at or near carrying capacity. Exponential growth would show the population climbing at an ever-increasing rate with no balancing losses.",
      {});
    q.figure = '<img src="banks/sci-1206/assets/scene-forest-clearing.jpg" alt="Illustration of a forest clearing in late spring: two snowshoe hares grazing on grass and low shrubs, a lynx watching from the treeline, a rain-filled hollow, and spruce and birch trees ringing the clearing over fallen leaves" style="max-width:100%;height:auto">';
    return q;
  },
  function () {
    var q = textq("Reading an ecosystem scene (3 marks)\nThe illustration shows the edge of a pond in summer: a cow moose and her calf browse in the shallows while a beaver sits at the shore beside the alder trunk it has gnawed through. Cattails and sedges crowd the shallows, water lilies float on the open water, dragonflies hunt over the pond, and the shore is soft mud.\n(a) From the scene, identify one biotic factor and one abiotic factor. (1)\n(b) Give one example of competition that could occur in this scene, and state whether it is interspecific or intraspecific competition. (1)\n(c) The beaver population at the pond has doubled every year for three years since the first pair arrived, with plenty of food and no predators yet. Is this population in equilibrium or in exponential growth? Explain your answer in one or two sentences. (1)", ["(a) Biotic (any one): moose, calf, beaver, water lilies, alders, cattails, sedges, dragonflies."],
      "(a) Biotic (any one): moose, calf, beaver, water lilies, alders, cattails, sedges, dragonflies. Abiotic (any one): pond water, sunlight, mud (soil). (b) Any one, correctly classified: the moose and beaver both eating shoreline vegetation (interspecific); two beavers, or family members, competing for alders (intraspecific); cattails and sedges competing for light and space in the shallows (interspecific). (c) Exponential growth: a constant doubling pattern with no limiting factor yet in play (food plentiful, predators absent) is the J-curve pattern. It cannot continue indefinitely: food, space or predation will eventually bend it toward equilibrium at the carrying capacity.",
      {});
    q.figure = '<img src="banks/sci-1206/assets/scene-pond-edge.jpg" alt="Illustration of the edge of a pond in summer: a cow moose and her calf browsing in the shallows, a beaver beside a gnawed alder trunk, cattails and sedges in the shallows, water lilies and dragonflies over the open water, and a soft mud shore" style="max-width:100%;height:auto">';
    return q;
  }
]), ["Answer from the scene you are given: name the actual organisms and factors pictured, then apply the definitions."]);

/* ---------- Unit 4 depth additions ---------- */

E("sci-u4-biomes", 4, ["SC10.10.1"], 1, "var", varset([
  function () {
    return mcq("Most of Newfoundland and Labrador's land area belongs to which terrestrial biome?",
      "Boreal forest (taiga): coniferous forest of spruce and fir with cold winters, short cool summers and acidic, nutrient-poor soils",
      ["Tundra across the whole province", "Temperate deciduous forest of maple and oak", "Grassland: the province is mostly open prairie"],
      "The island and southern Labrador are boreal: conifers built for snow load and a short growing season. Tundra takes over in northern Labrador and at high elevations; deciduous forest and grassland belong to milder, drier regions far to the south and west.", {});
  },
  function () {
    return mcq("A biome is defined mainly by",
      "its climate (temperature and precipitation patterns) and the community of organisms adapted to that climate",
      ["the country it is in", "the single largest animal living there", "the type of rock under the soil alone"],
      "Climate is the sorting force: the same biome (boreal forest, desert, tundra) appears on different continents wherever the same temperature and rainfall pattern occurs, with different but similarly adapted species filling the roles.", {});
  },
  function () {
    return mcq("Tundra plants such as those in northern Labrador are typically low, ground-hugging and fast to flower. These traits are adaptations to",
      "a very short, cold growing season with strong winds and a layer of permanently frozen ground (permafrost) below the surface",
      ["extreme heat and drought", "deep shade under tall trees", "soil that is rich and deep"],
      "Tundra life is a race against the calendar: grow low (out of the wind), flower fast, and root shallow above the permafrost. Every trait on the list answers a specific hardship of the climate.", {});
  }
]), ["Biome equals climate plus its adapted community: name the climate and the community follows."]);

E("sci-u4-foodchain", 4, ["SC10.10.1", "SC10.10.2"], 1, "var", varset([
  function () {
    return mcq("In the chain grass → grasshopper → frog → heron, the frog is the",
      "secondary consumer: it eats a primary consumer (the grasshopper, which ate the producer)",
      ["producer", "primary consumer", "decomposer"],
      "Count from the producer: grass (producer), grasshopper (primary consumer, herbivore), frog (secondary consumer), heron (tertiary consumer). Trophic level and consumer level are the same count.", {});
  },
  function () {
    return mcq("Only about 10 percent of the energy at one trophic level becomes biomass at the next. The other 90 percent is mostly",
      "used by the organisms for living (movement, body heat, life processes) and lost as heat, or passed to decomposers in waste and uneaten parts",
      ["destroyed, violating conservation of energy", "stored in the soil as new minerals", "reflected back to the Sun"],
      "Energy is never destroyed, it is spent: an animal burns most of its food staying alive, and that energy leaves as heat. The 10 percent rule is why food chains rarely exceed four or five levels and why top predators are always rare.", {});
  },
  function () {
    return mcq("Decomposers (bacteria and fungi) are essential to every ecosystem because they",
      "break down dead organisms and waste, returning nutrients to the soil and water for producers to use again",
      ["produce energy from sunlight for the food web", "eat only invasive species", "prevent all disease in populations"],
      "Without decomposers, nutrients would stay locked in dead bodies and ecosystems would run out of the raw materials for new growth within years. They are the cycle-closers of Unit 4, just as they were in the carbon cycle.", {});
  }
]), ["Count trophic levels from the producer, and remember the 10 percent toll at every step."]);

E("sci-u4-invasive", 4, ["SC10.10.6"], 1, "var", varset([
  function () {
    return mcq("An invasive species is best defined as",
      "a non-native species whose population spreads and causes harm to native ecosystems, economies or health in its new home",
      ["any species that lives near people", "any species with a large population", "a species that is endangered in its home range"],
      "Three parts: not from here, spreading, and causing harm. Plenty of introduced species stay quiet (most garden plants); the invasive minority combine fast reproduction with freedom from their natural enemies.", {});
  },
  function () {
    return mcq("Moose are not native to the island of Newfoundland: a few were introduced in 1878 and 1904. Their population exploded in the new home mainly because",
      "the island offered abundant food and habitat with none of the mainland's established wolf packs to limit them",
      ["moose reproduce faster in cold climates by nature", "the introduced moose were a special fast-breeding variety", "there were no other animals eating plants on the island"],
      "Classic introduction pattern: resources plentiful, predators and parasites left behind, so the population grew exponentially for decades before food limits and management brought it toward balance. The moose is now both a valued game animal and an ecosystem force (its browsing reshapes forests).", {});
  }
]), ["Introduced is a fact; invasive is introduced plus spreading plus harmful."]);

E("sci-u4-species-risk", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("Newfoundland's woodland caribou herds declined sharply in recent decades. Which combination of factors do biologists most often cite?",
      "Predation on calves (including by coyotes, a recent arrival on the island), habitat change, and hunting pressure together outpacing calf survival",
      ["Caribou forgot their migration routes", "The herds all moved to Labrador permanently", "Winters became so warm that caribou overheat"],
      "Population decline is bookkeeping again: when deaths (calves especially) exceed births year after year, the herd shrinks. A new predator changed the death column while habitat change squeezed the birth column (lichen-rich mature forest lost), and management responds on both sides of the ledger.", {});
  },
  function () {
    return mcq("Protecting a species at risk usually requires protecting its habitat, not just banning hunting, because",
      "a population cannot recover without the food, shelter, breeding sites and space its life cycle needs, however safe individuals are from being killed",
      ["hunting bans are impossible to enforce anywhere", "habitats are cheaper to protect than species", "individual animals do not matter to populations"],
      "Individuals are the population only when the environment can carry them: protect the animals but lose the calving grounds or the winter range, and the births column collapses anyway. Habitat is the carrying capacity made visible.", {});
  }
]), ["Conservation works on the whole ledger: births, deaths and the habitat that sets both."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"sci-u1-cr-airmass":3,"sci-u1-cr-climate":4,"sci-u1-cr-forecast":3,"sci-u1-cr-frontpass":3,"sci-u1-cr-mapdescribe":4,"sci-u2-cr-balance":3,"sci-u2-cr-naming":4,"sci-u2-cr-rates":3,"sci-u3-cr-dtgraph":3,"sci-u3-cr-trip":4,"sci-u3-cr-vtgraph":3,"sci-u4-cr-bioaccum":3,"sci-u4-cr-cycle":4,"sci-u4-cr-scene":3};
