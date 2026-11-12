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
