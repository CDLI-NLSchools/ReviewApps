// Math 3200 Unit 4 Trigonometry and the Unit Circle question bank
// CRMARKS: u4-angle-from-ratio=2
// CRMARKS: u4-angle-measures-cr=3
// CRMARKS: u4-approx-ratio=1
// CRMARKS: u4-arc-compare=2
// CRMARKS: u4-arc-length=2
// CRMARKS: u4-circle-equation=1
// CRMARKS: u4-circle-point-reasoning=3
// CRMARKS: u4-coterminal=1
// CRMARKS: u4-deg-to-rad=1
// CRMARKS: u4-exact-special=1
// CRMARKS: u4-one-radian=1
// CRMARKS: u4-other-ratios=2
// CRMARKS: u4-point-ratios-angle=2
// CRMARKS: u4-rad-to-deg=1
// CRMARKS: u4-repair-solution-cr=3
// CRMARKS: u4-sketch-standard-position=1
// CRMARKS: u4-solve-equation-approx=2
// CRMARKS: u4-solve-equation-exact=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u4-error-analysis=3
// BIMODAL: u4-solve-equation-exact=a
// BIMODAL: u4-repair-solution-cr=a
// BIMODAL: u4-point-ratios-angle=a
// BIMODAL: u4-other-ratios=a
// BIMODAL: u4-circle-point-reasoning=a
// BIMODAL: u4-arc-compare=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u4-error-analysis=b
/* ================= Unit 4: Trigonometry and the Unit Circle ================= */
/* ================= Unit 4: Trigonometry and the Unit Circle =================
   Helpers are prefixed u4; the only other top-level statements are E(...) calls.
   21 entries: L1 10, L2 7, L3 4. Codes: MA3200.7.1 to 7.19, 7.34 to 7.37. */

function u4gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

function u4fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u4gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}

function u4mag(kind, av) { /* exact magnitude string for a special-angle ratio value */
  var table;
  if (kind === "sin" || kind === "cos") table = [[0, "0"], [0.5, "\\frac{1}{2}"], [0.7071, "\\frac{\\sqrt{2}}{2}"], [0.866, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  else if (kind === "tan" || kind === "cot") table = [[0, "0"], [0.5774, "\\frac{\\sqrt{3}}{3}"], [1, "1"], [1.7321, "\\sqrt{3}"]];
  else table = [[1, "1"], [1.1547, "\\frac{2\\sqrt{3}}{3}"], [1.4142, "\\sqrt{2}"], [2, "2"]];
  for (var i = 0; i < table.length; i++) if (Math.abs(av - table[i][0]) < 0.01) return table[i][1];
  return null;
}

function u4ratioVal(kind, deg) { /* numeric value of a ratio at a degree measure */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th);
  if (kind === "sin") return sv;
  if (kind === "cos") return cv;
  if (kind === "tan") return sv / cv;
  if (kind === "csc") return 1 / sv;
  if (kind === "sec") return 1 / cv;
  return cv / sv;
}

function u4exact(kind, deg) { /* {s, v}: exact string and value of a ratio at a special degree, or null if undefined */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th), v;
  if (kind === "sin") v = sv;
  else if (kind === "cos") v = cv;
  else if (kind === "tan") { if (Math.abs(cv) < 1e-9) return null; v = sv / cv; }
  else if (kind === "csc") { if (Math.abs(sv) < 1e-9) return null; v = 1 / sv; }
  else if (kind === "sec") { if (Math.abs(cv) < 1e-9) return null; v = 1 / cv; }
  else { if (Math.abs(sv) < 1e-9) return null; v = cv / sv; }
  var fam = (kind === "csc" || kind === "sec") ? "sec" : kind;
  var mag = u4mag(fam, Math.abs(v));
  if (mag === null) return null;
  return { s: (v < 0 && mag !== "0" ? "-" : "") + mag, v: v };
}

var u4DEGS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
var u4KINDS = ["sin", "cos", "tan", "csc", "sec", "cot"];

function u4radS(deg) { /* radian string body for a special degree, principal value in [0, 360) */
  deg = ((deg % 360) + 360) % 360;
  if (deg === 0) return "0";
  var g = u4gcd(deg, 180), n = deg / g, d = 180 / g;
  if (d === 1) return n === 1 ? "\\pi" : n + "\\pi";
  if (n === 1) return "\\frac{\\pi}{" + d + "}";
  return "\\frac{" + n + "\\pi}{" + d + "}";
}
function u4radSgn(deg) { return deg < 0 ? "-" + u4radS(-deg) : u4radS(deg); }
function u4radBig(deg) { /* radian string body for any integer degree total, no reduction mod 360 */
  if (deg === 0) return "0";
  var s = deg < 0 ? "-" : "", a = Math.abs(deg), g = u4gcd(a, 180), n = a / g, d = 180 / g;
  if (d === 1) return s + (n === 1 ? "\\pi" : n + "\\pi");
  if (n === 1) return s + "\\frac{\\pi}{" + d + "}";
  return s + "\\frac{" + n + "\\pi}{" + d + "}";
}
function u4dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u4quadOf(deg) { var p = ((deg % 360) + 360) % 360; return p < 90 ? 1 : p < 180 ? 2 : p < 270 ? 3 : 4; }
function u4refOf(deg) { var p = ((deg % 360) + 360) % 360; return p <= 90 ? p : p <= 180 ? 180 - p : p <= 270 ? p - 180 : 360 - p; }
function u4wrap(x) { var t = 2 * Math.PI; return ((x % t) + t) % t; }

function u4armSVG(deg) { /* unit circle, axes, rotation arc and terminal arm for a standard-position angle */
  var th = deg * Math.PI / 180, cx = 88, cy = 88, R = 64;
  var ex = cx + R * Math.cos(th), ey = cy - R * Math.sin(th);
  var large = Math.abs(deg) > 180 ? 1 : 0, sweep = deg >= 0 ? 0 : 1;
  var ax = cx + 38 * Math.cos(th), ay = cy - 38 * Math.sin(th);
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit circle with an angle in standard position">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
  out += '<line x1="' + (cx - R - 12) + '" y1="' + cy + '" x2="' + (cx + R + 12) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="' + (cy - R - 12) + '" x2="' + cx + '" y2="' + (cy + R + 12) + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<path d="M ' + (cx + 38) + ' ' + cy + ' A 38 38 0 ' + large + ' ' + sweep + ' ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(ex, 1) + '" cy="' + fmt(ey, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

function u4ptSVG(x, y) { /* axes with the terminal arm to the point P(x, y) and dashed coordinate drops */
  var r = Math.sqrt(x * x + y * y), cx = 88, cy = 88, R = 64;
  var px = cx + R * x / r, py = cy - R * y / r;
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point on a terminal arm">';
  out += '<line x1="8" y1="' + cy + '" x2="168" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="8" x2="' + cx + '" y2="168" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + fmt(px, 1) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
  out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + cx + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(px, 1) + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  out += _txt(px + (x >= 0 ? 8 : -8), py - 10, "P(" + x + ", " + y + ")", 12, true, x >= 0 ? "start" : "end");
  return out + '</svg>';
}

function u4triSVG(o) { /* right triangle: vertical side on the right, angle at bottom left, or at the top when o.dep */
  var out = '<svg viewBox="0 0 196 172" width="196" height="172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  out += '<polygon points="28,146 158,146 158,44" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<path d="M 146 146 L 146 134 L 158 134" fill="none" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  if (o.vlab) out += _txt(166, 95, o.vlab, 12.5, true, "start");
  if (o.hlab) out += _txt(93, 162, o.hlab, 12.5, true);
  if (o.hypLab) out += _txt(78, 84, o.hypLab, 12.5, true);
  if (o.dep) {
    out += '<line x1="158" y1="44" x2="92" y2="44" stroke="' + FIG_INK + '" stroke-width="1" stroke-dasharray="4 3"/>';
    out += '<path d="M 136 44 A 22 22 0 0 0 140.7 57.6" fill="none" stroke="' + FIG_ACC + '" stroke-width="1.8"/>';
    if (o.angLab) out += _txt(122, 32, o.angLab, 12, true);
  } else {
    out += '<path d="M 50 146 A 22 22 0 0 0 45.3 132.4" fill="none" stroke="' + FIG_ACC + '" stroke-width="1.8"/>';
    if (o.angLab) out += _txt(64, 134, o.angLab, 12, true);
  }
  return out + '</svg>';
}

function u4pairStr(pr, rad) { /* display a pair of special degrees as an option string, ascending */
  var a = Math.min(pr[0], pr[1]), b = Math.max(pr[0], pr[1]);
  if (rad) return "\\(" + u4radS(a) + "\\) and \\(" + u4radS(b) + "\\)";
  return a + "° and " + b + "°";
}

function u4twoStr(kind, v) { /* exact string for twice a special ratio value */
  var av = Math.abs(2 * v), t;
  if (kind === "tan" || kind === "cot") t = [[0, "0"], [1.1547, "\\frac{2\\sqrt{3}}{3}"], [2, "2"], [3.4641, "2\\sqrt{3}"]];
  else t = [[0, "0"], [1, "1"], [1.4142, "\\sqrt{2}"], [1.7321, "\\sqrt{3}"]];
  for (var i = 0; i < t.length; i++) if (Math.abs(av - t[i][0]) < 0.01) return (v < 0 && t[i][1] !== "0" ? "-" : "") + t[i][1];
  return null;
}

/* ---- 7.1, 7.4: read a standard-position sketch (degrees, then radians as k pi) ---- */
E("u4-sketch-standard-position", 4, ["7.1", "7.4"], 1, "gen", function () {
  var fig, q;
  if (Math.random() < 0.5) {
    var pool = [20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160, 170, 190, 200, 210, 220, 230, 240, 250, 260, 280, 290, 300, 310, 320, 330, 340, 350];
    var deg = pick(pool) * pick([1, -1]);
    fig = u4armSVG(deg);
    var dis = ["" + (-deg) + "°", "" + (deg - (deg > 0 ? 360 : -360)) + "°", "" + ((deg > 0 ? 1 : -1) * (180 - Math.abs(deg))) + "°"];
    q = mcq("The diagram shows an angle in standard position. What is the measure of the angle?",
      "" + deg + "°", dis,
      "The initial arm lies on the positive x-axis and the rotation is " + (deg > 0 ? "counterclockwise" : "clockwise") + ". The terminal arm is in Quadrant " + ["I", "II", "III", "IV"][u4quadOf(deg) - 1] + " with reference angle " + u4refOf(deg) + "°, which gives the signed measure <b>" + deg + "°</b>.",
      { mode: "deg", deg: deg });
  } else {
    var d = pick([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]) * pick([1, -1]);
    fig = u4armSVG(d);
    q = mcq("The diagram shows an angle in standard position. What is the measure of the angle, in radians?",
      "\\(" + u4radSgn(d) + "\\)",
      ["\\(" + u4radSgn(-d) + "\\)", "\\(" + u4radSgn(d - (d > 0 ? 360 : -360)) + "\\)", "\\(" + u4radSgn((d > 0 ? 1 : -1) * (180 - Math.abs(d))) + "\\)"],
      "The terminal arm is the one for " + d + "°, and " + d + "° expressed in radians is \\(" + u4radSgn(d) + "\\). The signed measure is <b>\\(" + u4radSgn(d) + "\\)</b>.",
      { mode: "rad", deg: d });
  }
  q.figure = fig;
  return q;
});

/* ---- 7.2, 7.3: one radian and the degree-radian relationship ---- */
E("u4-one-radian", 4, ["7.2", "7.3"], 1, "var", varset([
  function () {
    return mcq("An angle measures exactly 1 radian. To the nearest tenth of a degree, its measure is",
      "57.3°", ["60.0°", "45.0°", "90.0°"],
      "A full rotation is \\(360^\\circ = 2\\pi\\) rad, so \\(1\\) rad \\(= \\frac{180}{\\pi} \\approx 57.3^\\circ\\). The measure is <b>57.3°</b>.",
      { v: 1 });
  },
  function () {
    return mcq("Which statement correctly describes an angle of 1 radian?",
      "It cuts an arc equal in length to the radius",
      ["It is exactly one quarter of a full rotation", "It measures exactly 60 degrees", "It cuts an arc twice the length of the radius"],
      "By definition, an angle of 1 radian is the central angle that cuts an arc whose length equals the radius of the circle. A quarter rotation is \\(\\frac{\\pi}{2}\\) rad, and an arc of twice the radius belongs to 2 radians.",
      { v: 2 });
  },
  function () {
    return mcq("\\(\\pi\\) radians is equal to",
      "180°", ["360°", "90.0°", "57.3°"],
      "Half a rotation is \\(\\pi\\) rad and also \\(180^\\circ\\), so \\(\\pi\\) rad \\(= 180^\\circ\\). The value 57.3° is the size of 1 radian, not of \\(\\pi\\) radians.",
      { v: 3 });
  },
  function () {
    return mcq("A full rotation measures \\(2\\pi\\) radians. One radian is what fraction of a full rotation?",
      "\\(\\frac{1}{2\\pi}\\)", ["\\(\\frac{1}{\\pi}\\)", "\\(\\frac{\\pi}{2}\\)", "\\(\\frac{1}{2}\\)"],
      "One radian out of a full rotation of \\(2\\pi\\) radians is the fraction \\(\\frac{1}{2\\pi}\\).",
      { v: 4 });
  }
]));

/* ---- 7.5: degrees to radians (exact for special angles, decimal otherwise) ---- */
E("u4-deg-to-rad", 4, ["7.5"], 1, "gen", function () {
  if (Math.random() < 0.55) {
    var d = pick([15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345]);
    var corr = "\\(" + u4radS(d) + "\\)";
    var cands = [(d + 45) % 360, (d + 90) % 360, (d + 135) % 360, (d + 180) % 360, (360 - d) % 360, (d + 270) % 360].map(function (x) { return "\\(" + u4radS(x) + "\\)"; });
    return mcq("Convert " + d + "° to radians, in exact form.",
      corr, u4dist3(corr, cands),
      "Multiply by \\(\\frac{\\pi}{180}\\): \\[ \\begin{aligned} " + d + "^\\circ &= " + d + " \\times \\frac{\\pi}{180} \\\\ &= " + u4radS(d) + " \\end{aligned} \\] The exact measure is <b>\\(" + u4radS(d) + "\\)</b>.",
      { mode: "exact", d: d });
  }
  var dd = ri(10, 350);
  while (dd % 15 === 0) dd = ri(10, 350);
  var ans = Math.round(dd * Math.PI / 180 * 100) / 100;
  return numq("Convert " + dd + "° to radians, to the nearest hundredth.",
    ans, 0.006,
    "Multiply by \\(\\frac{\\pi}{180}\\): \\[ \\begin{aligned} " + dd + "^\\circ &= " + dd + " \\times \\frac{\\pi}{180} \\\\ &\\approx " + fmt(dd * Math.PI / 180) + " \\end{aligned} \\] To the nearest hundredth, the measure is <b>" + fmt(ans) + " rad</b>.",
    { mode: "dec", d: dd });
});

/* ---- 7.6: radians to degrees (exact for special angles, decimal otherwise) ---- */
E("u4-rad-to-deg", 4, ["7.6"], 1, "gen", function () {
  if (Math.random() < 0.55) {
    var d = pick([15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345]);
    var corr = d + "°";
    var cands = [(d + 45) % 360, (d + 90) % 360, (d + 135) % 360, (d + 180) % 360, (360 - d) % 360, (d + 270) % 360].map(function (x) { return x + "°"; });
    return mcq("Convert \\(" + u4radS(d) + "\\) radians to degrees.",
      corr, u4dist3(corr, cands),
      "Multiply by \\(\\frac{180}{\\pi}\\): \\[ \\begin{aligned} " + u4radS(d) + " \\text{ rad} &= " + u4radS(d) + " \\times \\frac{180}{\\pi} \\\\ &= " + d + "^\\circ \\end{aligned} \\] The measure is <b>" + d + "°</b>.",
      { mode: "exact", d: d });
  }
  var r = ri(21, 620) / 100;
  var ansD = Math.round(r * 180 / Math.PI);
  return numq("Convert " + fmt(r) + " radians to degrees, to the nearest degree.",
    ansD, 0.5,
    "Multiply by \\(\\frac{180}{\\pi}\\): \\[ \\begin{aligned} " + fmt(r) + " \\text{ rad} &= " + fmt(r) + " \\times \\frac{180}{\\pi} \\\\ &\\approx " + fmt(r * 180 / Math.PI, 1) + "^\\circ \\end{aligned} \\] To the nearest degree, the measure is <b>" + ansD + "°</b>.",
    { mode: "dec", r: r });
});

/* ---- 7.7, 7.8: coterminal angles and their general form ---- */
E("u4-coterminal", 4, ["7.7", "7.8"], 1, "gen", function () {
  var mode = pick(["find", "find", "form"]);
  if (mode === "find") {
    if (Math.random() < 0.5) {
      var b = ri(1, 35) * 10, k = pick([1, 1, 2, -1, -2]);
      var th = b + 360 * k;
      var corr = b + "°";
      var cands = [(b + 180) % 360, (360 - b) % 360, (b + 90) % 360, (b + 270) % 360, (180 - b + 360) % 360, (b + 45) % 360].map(function (x) { return x + "°"; });
      return mcq("Which angle is coterminal with " + th + "°?",
        corr, u4dist3(corr, cands),
        "Coterminal angles differ by a multiple of \\(360^\\circ\\). Since \\(" + th + "^\\circ " + (k >= 0 ? "- " + (360 * k) : "+ " + (360 * -k)) + "^\\circ = " + b + "^\\circ\\), the angle coterminal with " + th + "° in the interval from 0° to 360° is <b>" + b + "°</b>.",
        { mode: "findDeg", b: b, k: k });
    }
    var d = pick(u4DEGS), kk = pick([1, 1, 2, -1]);
    var given = d + 360 * kk;
    var corrR = "\\(" + u4radS(d) + "\\)";
    var candsR = [(d + 90) % 360, (d + 180) % 360, (360 - d) % 360, (d + 270) % 360, (d + 45) % 360].map(function (x) { return "\\(" + u4radS(x) + "\\)"; });
    return mcq("Which angle is coterminal with \\(" + u4radBig(given) + "\\)?",
      corrR, u4dist3(corrR, candsR),
      "Coterminal angles differ by a multiple of \\(2\\pi\\). Since \\(" + u4radBig(given) + " " + (kk >= 0 ? "- " + (2 * kk) : "+ " + (2 * -kk)) + "\\pi = " + u4radS(d) + "\\), the angle coterminal with \\(" + u4radBig(given) + "\\) in the interval from 0 to \\(2\\pi\\) is <b>\\(" + u4radS(d) + "\\)</b>.",
      { mode: "findRad", d: d, k: kk });
  }
  if (Math.random() < 0.6) {
    var bb = pick([10, 20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160, 170, 190, 200, 210, 220, 230, 240, 250, 260, 280, 290, 300, 310, 320, 330, 340, 350, -10, -20, -30, -40, -50, -60, -70, -80, -100, -110, -120, -130, -140, -150, -160, -170]);
    var corrF = bb + "° + 360°n, n ∈ I";
    var disF = shuffle([bb + "° + 180°n, n ∈ I", bb + "° + 90°n, n ∈ I", (bb + 360) + "° + 360°n, n ∈ I", (-bb) + "° + 360°n, n ∈ I"]).slice(0, 3);
    return mcq("The general form of the measures of all angles coterminal with " + bb + "° is",
      corrF, disF,
      "Angles coterminal with " + bb + "° are found by adding or subtracting full rotations of \\(360^\\circ\\), so the general form is <b>" + corrF + "</b>.",
      { mode: "formDeg", b: bb });
  }
  var dd2 = pick([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]);
  var corrG = "\\(" + u4radS(dd2) + " + 2\\pi n\\), \\(n \\in I\\)";
  var disG = ["\\(" + u4radS(dd2) + " + \\pi n\\), \\(n \\in I\\)",
    "\\(" + u4radBig(dd2 + 360) + " + 2\\pi n\\), \\(n \\in I\\)",
    "\\(" + u4radSgn(-dd2) + " + 2\\pi n\\), \\(n \\in I\\)"];
  return mcq("The general form of the measures of all angles coterminal with \\(" + u4radS(dd2) + "\\) is",
    corrG, disG,
    "Angles coterminal with \\(" + u4radS(dd2) + "\\) are found by adding or subtracting full rotations of \\(2\\pi\\), so the general form is <b>" + corrG + "</b>.",
    { mode: "formRad", d: dd2 });
});

/* ---- 7.9: arc length a = r(theta), solved for each of the three quantities ---- */
E("u4-arc-length", 4, ["7.9"], 1, "gen", function () {
  var mode = pick(["a", "a", "r", "t", "deg"]);
  if (mode === "a") {
    var r = ri(3, 30), th = ri(4, 31) / 10, a = r * th;
    return numq("An arc is cut on a circle of radius " + r + " cm by a central angle of " + fmt(th, 1) + " rad. What is the length of the arc, to the nearest tenth of a centimetre?",
      Math.round(a * 10) / 10, 0.06,
      "Arc length is \\(a = r\\theta\\), with the angle in radians: \\[ \\begin{aligned} a &= r\\theta \\\\ &= " + r + " \\times " + fmt(th, 1) + " \\\\ &= " + fmt(a, 1) + " \\text{ cm} \\end{aligned} \\] The arc length is <b>" + fmt(a, 1) + " cm</b>.",
      { mode: "a", r: r, th: th });
  }
  if (mode === "r") {
    var r2 = ri(3, 30), th2 = ri(4, 31) / 10, a2 = r2 * th2;
    return numq("An arc of length " + fmt(a2, 1) + " cm is cut on a circle by a central angle of " + fmt(th2, 1) + " rad. What is the radius of the circle, in centimetres?",
      r2, 0.01,
      "Solve \\(a = r\\theta\\) for \\(r\\): \\[ \\begin{aligned} r &= \\frac{a}{\\theta} \\\\ &= \\frac{" + fmt(a2, 1) + "}{" + fmt(th2, 1) + "} \\\\ &= " + r2 + " \\text{ cm} \\end{aligned} \\] The radius is <b>" + r2 + " cm</b>.",
      { mode: "r", r: r2, th: th2 });
  }
  if (mode === "t") {
    var r3 = pick([4, 5, 8, 10, 20, 25, 40, 50]), th3 = ri(3, 30) / 10, a3 = r3 * th3;
    return numq("An arc of length " + fmt(a3, 1) + " cm is cut on a circle of radius " + r3 + " cm. What is the measure of the central angle, to the nearest tenth of a radian?",
      Math.round(th3 * 10) / 10, 0.06,
      "Solve \\(a = r\\theta\\) for \\(\\theta\\): \\[ \\begin{aligned} \\theta &= \\frac{a}{r} \\\\ &= \\frac{" + fmt(a3, 1) + "}{" + r3 + "} \\\\ &= " + fmt(th3, 1) + " \\text{ rad} \\end{aligned} \\] The angle is <b>" + fmt(th3, 1) + " rad</b>.",
      { mode: "t", r: r3, th: th3 });
  }
  var thD = pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300, 315, 330]), rD = ri(2, 20);
  var aD = rD * thD * Math.PI / 180;
  return numq("An arc is cut on a circle of radius " + rD + " cm by a central angle of " + thD + "°. What is the length of the arc, to the nearest tenth of a centimetre?",
    Math.round(aD * 10) / 10, 0.06,
    "The formula \\(a = r\\theta\\) needs the angle in radians: \\(" + thD + "^\\circ = " + u4radS(thD) + "\\) rad. Then \\[ \\begin{aligned} a &= r\\theta \\\\ &= " + rD + " \\times " + u4radS(thD) + " \\\\ &\\approx " + fmt(aD, 1) + " \\text{ cm} \\end{aligned} \\] The arc length is <b>" + fmt(aD, 1) + " cm</b>.",
    { mode: "deg", r: rD, thD: thD });
});

/* ---- 7.10, 7.11: the equation of a circle centred at the origin ---- */
E("u4-circle-equation", 4, ["7.10", "7.11"], 1, "gen", function () {
  var mode = pick(["r", "diam", "fromEq", "point", "sqrt"]);
  if (mode === "r") {
    var r = ri(2, 15), corr = "\\(x^2 + y^2 = " + (r * r) + "\\)";
    return mcq("What is the equation of the circle with centre (0, 0) and radius " + r + "?",
      corr, ["\\(x^2 + y^2 = " + r + "\\)", "\\(x^2 + y^2 = " + (2 * r * r) + "\\)", "\\(x^2 - y^2 = " + (r * r) + "\\)"],
      "A circle centred at the origin with radius \\(r\\) has equation \\(x^2 + y^2 = r^2\\). With \\(r = " + r + "\\): \\[ \\begin{aligned} x^2 + y^2 &= " + r + "^2 \\\\ &= " + (r * r) + " \\end{aligned} \\] The equation is <b>" + corr + "</b>.",
      { mode: "r", r: r });
  }
  if (mode === "diam") {
    var d = pick([6, 8, 10, 12, 14, 16, 18, 20, 22, 24]), rr = d / 2, corr2 = "\\(x^2 + y^2 = " + (rr * rr) + "\\)";
    return mcq("What is the equation of the circle with centre (0, 0) and diameter " + d + "?",
      corr2, ["\\(x^2 + y^2 = " + (d * d) + "\\)", "\\(x^2 + y^2 = " + rr + "\\)", "\\(x^2 - y^2 = " + (rr * rr) + "\\)"],
      "The radius is half the diameter: \\(r = " + d + " \\div 2 = " + rr + "\\). Then \\[ \\begin{aligned} x^2 + y^2 &= r^2 \\\\ &= " + rr + "^2 \\\\ &= " + (rr * rr) + " \\end{aligned} \\] The equation is <b>" + corr2 + "</b>.",
      { mode: "diam", d: d });
  }
  if (mode === "fromEq") {
    var k = pick([9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196]), rk = Math.sqrt(k);
    return mcq("What is the radius of the circle \\(x^2 + y^2 = " + k + "\\)?",
      "" + rk, u4dist3("" + rk, ["" + k, (k % 2 === 1 ? "\\(\\frac{" + k + "}{2}\\)" : "" + (k / 2)), "" + (2 * rk), "" + (rk + 1), "" + (3 * rk)]),
      "Comparing with \\(x^2 + y^2 = r^2\\) gives \\(r^2 = " + k + "\\), so \\(r = \\sqrt{" + k + "} = " + rk + "\\). The radius is <b>" + rk + "</b>.",
      { mode: "fromEq", k: k });
  }
  if (mode === "point") {
    var pt = pick([[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [9, 12], [12, 9], [8, 15], [15, 8], [7, 24], [24, 7]]);
    var r2v = pt[0] * pt[0] + pt[1] * pt[1], corr3 = "\\(x^2 + y^2 = " + r2v + "\\)";
    return mcq("A circle with centre (0, 0) passes through the point (" + pt[0] + ", " + pt[1] + "). What is its equation?",
      corr3, u4dist3(corr3, ["\\(x^2 + y^2 = " + (pt[0] + pt[1]) + "\\)", "\\(x^2 + y^2 = " + Math.abs(pt[0] * pt[0] - pt[1] * pt[1]) + "\\)", "\\(x^2 + y^2 = " + (2 * r2v) + "\\)", "\\((x - " + pt[0] + ")^2 + (y - " + pt[1] + ")^2 = " + r2v + "\\)"]),
      "The radius squared is the squared distance from the origin to the point: \\[ \\begin{aligned} r^2 &= " + pt[0] + "^2 + " + pt[1] + "^2 \\\\ &= " + (pt[0] * pt[0]) + " + " + (pt[1] * pt[1]) + " \\\\ &= " + r2v + " \\end{aligned} \\] The equation is <b>" + corr3 + "</b>.",
      { mode: "point", pt: pt });
  }
  var m = pick([2, 3, 5, 6, 7, 10, 11, 13, 14, 15]), corr4 = "\\(x^2 + y^2 = " + m + "\\)";
  return mcq("What is the equation of the circle with centre (0, 0) and radius \\(\\sqrt{" + m + "}\\)?",
    corr4, u4dist3(corr4, ["\\(x^2 + y^2 = \\sqrt{" + m + "}\\)", "\\(x^2 + y^2 = " + (2 * m) + "\\)", "\\(x^2 + y^2 = " + (m * m) + "\\)", "\\(x^2 + y^2 = " + (3 * m) + "\\)"]),
    "Squaring the radius: \\(r^2 = \\left(\\sqrt{" + m + "}\\right)^2 = " + m + "\\), so the equation is <b>" + corr4 + "</b>.",
    { mode: "sqrt", m: m });
});

/* ---- 7.12, 7.17: a point on the terminal arm (find a ratio, or find the angle) ---- */
E("u4-point-ratios-angle", 4, ["7.12", "7.17"], 2, "gen", function () {
  var trip = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25], [20, 21, 29], [9, 40, 41]]);
  var sc = pick([1, 1, 2]), quad = ri(1, 4);
  var sx = (quad === 2 || quad === 3) ? -1 : 1, sy = (quad === 3 || quad === 4) ? -1 : 1;
  var X = sx * trip[0] * sc, Y = sy * trip[1] * sc, R = trip[2] * sc;
  var fig = u4ptSVG(X, Y);
  var q;
  if (Math.random() < 0.55) {
    var kind = pick(u4KINDS);
    var vals = { sin: [Y, R], cos: [X, R], tan: [Y, X], csc: [R, Y], sec: [R, X], cot: [X, Y] };
    var corr = "\\(" + u4fr(vals[kind][0], vals[kind][1]) + "\\)";
    var cands = u4KINDS.map(function (k2) { return "\\(" + u4fr(vals[k2][0], vals[k2][1]) + "\\)"; });
    cands.push("\\(" + u4fr(-vals[kind][0], vals[kind][1]) + "\\)");
    q = mcq("The point P(" + X + ", " + Y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the value of \\(\\" + kind + "\\theta\\)?",
      corr, u4dist3(corr, cands),
      "First find \\(r\\): \\[ \\begin{aligned} r &= \\sqrt{x^2 + y^2} \\\\ &= \\sqrt{" + (X * X) + " + " + (Y * Y) + "} \\\\ &= " + R + " \\end{aligned} \\] With \\(x = " + X + "\\), \\(y = " + Y + "\\) and \\(r = " + R + "\\), the ratio \\(\\" + kind + "\\theta\\) is <b>" + corr + "</b>.",
      { mode: "ratio", kind: kind, X: X, Y: Y });
  } else {
    var phi = Math.round(Math.atan2(Math.abs(Y), Math.abs(X)) * 180 / Math.PI);
    var angs = [phi, 180 - phi, 180 + phi, 360 - phi];
    var target = angs[quad - 1];
    q = mcq("The point P(" + X + ", " + Y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position, with \\(0^\\circ \\le \\theta < 360^\\circ\\). What is the measure of \\(\\theta\\), to the nearest degree?",
      target + "°", angs.filter(function (a) { return a !== target; }).map(function (a) { return a + "°"; }),
      "The reference angle is \\(\\tan^{-1}\\left(\\frac{|y|}{|x|}\\right) = \\tan^{-1}\\left(\\frac{" + Math.abs(Y) + "}{" + Math.abs(X) + "}\\right) \\approx " + phi + "^\\circ\\). The point is in Quadrant " + ["I", "II", "III", "IV"][quad - 1] + ", so \\(\\theta = " + target + "^\\circ\\) to the nearest degree.",
      { mode: "angle", X: X, Y: Y, quad: quad });
  }
  q.figure = fig;
  return q;
});

/* ---- 7.13: approximate value of a ratio (calculator work, 3 decimal places) ---- */
E("u4-approx-ratio", 4, ["7.13"], 1, "gen", function () {
  var kind = pick(["sin", "cos", "tan"]);
  if (Math.random() < 0.5) {
    var deg = ri(12, 168);
    while (deg % 15 === 0 || (kind === "tan" && deg > 78 && deg < 102)) deg = ri(12, 168);
    var val = u4ratioVal(kind, deg), ans = Math.round(val * 1000) / 1000;
    return numq("Determine the value of \\(\\" + kind + "(" + deg + "^\\circ)\\), to the nearest thousandth.",
      ans, 0.0021,
      "A calculator in degree mode gives \\(\\" + kind + "(" + deg + "^\\circ) \\approx " + fmt(val, 4) + "\\), which rounds to <b>" + fmt(ans, 3) + "</b>.",
      { mode: "deg", kind: kind, deg: deg });
  }
  var t = ri(25, 290) / 100;
  while (kind === "tan" && t > 1.4 && t < 1.75) t = ri(25, 290) / 100;
  var val2 = kind === "sin" ? Math.sin(t) : kind === "cos" ? Math.cos(t) : Math.tan(t);
  var ans2 = Math.round(val2 * 1000) / 1000;
  return numq("Determine the value of \\(\\" + kind + "(" + fmt(t) + ")\\), where the angle is in radians, to the nearest thousandth.",
    ans2, 0.0021,
    "A calculator in radian mode gives \\(\\" + kind + "(" + fmt(t) + ") \\approx " + fmt(val2, 4) + "\\), which rounds to <b>" + fmt(ans2, 3) + "</b>.",
    { mode: "rad", kind: kind, t: t });
});

/* ---- 7.14: exact value of a ratio at a special angle ---- */
E("u4-exact-special", 4, ["7.14"], 1, "gen", function () {
  var kind = pick(u4KINDS), d = pick(u4DEGS), ex = u4exact(kind, d);
  while (!ex) { d = pick(u4DEGS); ex = u4exact(kind, d); }
  var co = { sin: "cos", cos: "sin", tan: "cot", cot: "tan", csc: "sec", sec: "csc" }[kind];
  var rec = { sin: "csc", csc: "sin", cos: "sec", sec: "cos", tan: "cot", cot: "tan" }[kind];
  var coEx = u4exact(co, d), recEx = u4exact(rec, d);
  var supp = d <= 180 ? 180 - d : 540 - d, suppEx = u4exact(kind, supp);
  var plusEx = u4exact(kind, (d + 90) % 360);
  var neg = ex.s === "0" ? null : (ex.s.charAt(0) === "-" ? ex.s.slice(1) : "-" + ex.s);
  var cands = [neg, coEx ? coEx.s : null, recEx ? recEx.s : null, suppEx ? suppEx.s : null, plusEx ? plusEx.s : null,
    "1", "-1", "\\frac{1}{2}", "-\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "-\\frac{\\sqrt{3}}{2}", "0"];
  var corr = "\\(" + ex.s + "\\)";
  var dis = u4dist3(ex.s, cands).map(function (s) { return "\\(" + s + "\\)"; });
  var rad = Math.random() < 0.5;
  var angDisp = rad ? "\\(" + u4radS(d) + "\\)" : d + "°";
  return mcq("What is the exact value of \\(\\" + kind + "(" + (rad ? u4radS(d) : d + "^\\circ") + ")\\)?",
    corr, dis,
    "The angle " + angDisp + " is in Quadrant " + ["I", "II", "III", "IV"][u4quadOf(d) - 1] + " with reference angle " + u4refOf(d) + "°. There, \\(\\" + kind + "\\theta\\) has the sign and size of the ratio at the reference angle, giving <b>" + corr + "</b>.",
    { kind: kind, d: d, rad: rad });
});

/* ---- 7.16: angles in a domain from a given ratio value, quadrant specified ---- */
E("u4-angle-from-ratio", 4, ["7.16"], 1, "gen", function () {
  var kind = pick(["sin", "cos", "tan"]);
  var signs = { sin: [1, 1, -1, -1], cos: [1, -1, -1, 1], tan: [1, -1, 1, -1] };
  if (Math.random() < 0.55) {
    var phi = ri(15, 75);
    while (phi === 45) phi = ri(15, 75);
    var sgn = pick([1, -1]), val = sgn * Math.abs(u4ratioVal(kind, phi));
    var qs = [1, 2, 3, 4].filter(function (qq) { return signs[kind][qq - 1] === sgn; });
    var q = pick(qs), angs = [phi, 180 - phi, 180 + phi, 360 - phi], target = angs[q - 1];
    return mcq("If \\(\\" + kind + "\\theta = " + fmt(val, 3) + "\\) and \\(\\theta\\) is in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", what is the measure of \\(\\theta\\), to the nearest degree?",
      target + "°", angs.filter(function (a) { return a !== target; }).map(function (a) { return a + "°"; }),
      "The reference angle is \\(\\" + kind + "^{-1}(" + fmt(Math.abs(val), 3) + ") \\approx " + phi + "^\\circ\\). Placing that reference angle in Quadrant " + ["I", "II", "III", "IV"][q - 1] + " gives \\(\\theta = " + target + "^\\circ\\).",
      { mode: "deg", kind: kind, phi: phi, q: q });
  }
  var phiD = pick([30, 45, 60]), sgn2 = pick([1, -1]);
  var qs2 = [1, 2, 3, 4].filter(function (qq) { return signs[kind][qq - 1] === sgn2; });
  var q2 = pick(qs2), angsD = [phiD, 180 - phiD, 180 + phiD, 360 - phiD], solD = angsD[q2 - 1];
  var valStr = u4exact(kind, solD).s;
  var corr = "\\(" + u4radS(solD) + "\\)";
  var dis = angsD.filter(function (a) { return a !== solD; }).map(function (a) { return "\\(" + u4radS(a) + "\\)"; });
  return mcq("If \\(\\" + kind + "\\theta = " + valStr + "\\) and \\(\\theta\\) is in Quadrant " + ["I", "II", "III", "IV"][q2 - 1] + ", with \\(0 \\le \\theta < 2\\pi\\), what is the value of \\(\\theta\\)?",
    corr, dis,
    "The reference angle for \\(\\" + kind + "\\theta = " + valStr + "\\) is " + phiD + "°, which is \\(" + u4radS(phiD) + "\\) rad. Placing it in Quadrant " + ["I", "II", "III", "IV"][q2 - 1] + " gives <b>" + corr + "</b>.",
    { mode: "rad", kind: kind, phiD: phiD, q: q2 });
});

/* ---- 7.18: the other ratios from one given ratio in a specified domain ---- */
E("u4-other-ratios", 4, ["7.18"], 2, "gen", function () {
  var trip = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  var quad = ri(1, 4);
  var sx = (quad === 2 || quad === 3) ? -1 : 1, sy = (quad === 3 || quad === 4) ? -1 : 1;
  var X = sx * trip[0], Y = sy * trip[1], R = trip[2];
  var vals = { sin: [Y, R], cos: [X, R], tan: [Y, X], csc: [R, Y], sec: [R, X], cot: [X, Y] };
  var defs = { sin: "y/r", cos: "x/r", tan: "y/x", csc: "r/y", sec: "r/x", cot: "x/y" };
  var gi = ri(0, 5), ai = ri(0, 5);
  while (ai === gi) ai = ri(0, 5);
  var gk = u4KINDS[gi], ak = u4KINDS[ai];
  var gStr = u4fr(vals[gk][0], vals[gk][1]), aStr = u4fr(vals[ak][0], vals[ak][1]);
  var corr = "\\(" + aStr + "\\)";
  var cands = u4KINDS.map(function (k2) { return "\\(" + u4fr(vals[k2][0], vals[k2][1]) + "\\)"; });
  cands.push("\\(" + u4fr(-vals[ak][0], vals[ak][1]) + "\\)", "\\(" + u4fr(vals[ak][1], vals[ak][0]) + "\\)");
  var dom = pick(["\\(\\theta\\) is in Quadrant " + ["I", "II", "III", "IV"][quad - 1],
    "\\(" + [(0), 90, 180, 270][quad - 1] + "^\\circ < \\theta < " + [90, 180, 270, 360][quad - 1] + "^\\circ\\)"]);
  return mcq("If \\(\\" + gk + "\\theta = " + gStr + "\\) and " + dom + ", what is the value of \\(\\" + ak + "\\theta\\)?",
    corr, u4dist3(corr, cands),
    "From \\(\\" + gk + "\\theta = " + gStr + "\\), take \\(|x| = " + trip[0] + "\\), \\(|y| = " + trip[1] + "\\) and \\(r = " + R + "\\), a Pythagorean triple since \\(" + trip[0] + "^2 + " + trip[1] + "^2 = " + R + "^2\\). Quadrant " + ["I", "II", "III", "IV"][quad - 1] + " fixes the signs: \\(x = " + X + "\\), \\(y = " + Y + "\\). Then \\(\\" + ak + "\\theta = " + defs[ak] + " = \\) <b>" + corr + "</b>.",
    { gk: gk, ak: ak, quad: quad });
});

/* ---- 7.19, 7.15: problems in the standard-position and unit-circle setting, each with its diagram ---- */
E("u4-ratio-problem", 4, ["7.19", "7.15"], 2, "gen", function () {
  var QN = ["I", "II", "III", "IV"];
  var DEFS = { sin: "\\frac{y}{r}", cos: "\\frac{x}{r}", tan: "\\frac{y}{x}", csc: "\\frac{r}{y}", sec: "\\frac{r}{x}", cot: "\\frac{x}{y}" };
  function figP(x, y, lab) { /* terminal arm to P with a custom label and dashed coordinate drops */
    var r = Math.sqrt(x * x + y * y), cx = 88, cy = 88, R = 64;
    var px = cx + R * x / r, py = cy - R * y / r;
    var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Terminal arm with point P">';
    out += '<line x1="8" y1="' + cy + '" x2="168" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
    out += '<line x1="' + cx + '" y1="8" x2="' + cx + '" y2="168" stroke="' + FIG_INK + '" stroke-width="1"/>';
    out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + fmt(px, 1) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
    out += '<line x1="' + fmt(px, 1) + '" y1="' + fmt(py, 1) + '" x2="' + cx + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.8" stroke-dasharray="3 3"/>';
    out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(px, 1) + '" y2="' + fmt(py, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
    out += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
    out += _txt(px + (x >= 0 ? 8 : -8), py - 10, lab, 12, true, x >= 0 ? "start" : "end");
    return out + '</svg>';
  }
  var mode = pick(["A", "A", "B", "C", "D"]);
  var q;
  if (mode === "A") {
    var trA = pick([[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [5, 12, 13], [10, 24, 26], [15, 20, 25], [8, 15, 17], [16, 30, 34], [7, 24, 25], [14, 48, 50]]);
    var swapA = Math.random() < 0.5;
    var axA = swapA ? trA[1] : trA[0], ayA = swapA ? trA[0] : trA[1], RA = trA[2];
    var qA = ri(1, 4), sxA = (qA === 2 || qA === 3) ? -1 : 1, syA = (qA === 3 || qA === 4) ? -1 : 1;
    var XA = sxA * axA, YA = syA * ayA;
    var knownX = Math.random() < 0.5;
    var kVal = knownX ? XA : YA, uVal = knownX ? YA : XA;
    var kName = knownX ? "x" : "y", uName = knownX ? "y" : "x";
    var setupA = "The terminal arm of an angle \\(\\theta\\) in standard position meets the circle \\(x^2 + y^2 = " + (RA * RA) + "\\) at the point \\(P\\), as shown in the diagram. \\(P\\) is in Quadrant " + QN[qA - 1] + ", and the " + kName + "-coordinate of \\(P\\) is " + kVal + ".";
    var findU = "First find the " + uName + "-coordinate. Since \\(P\\) lies on the circle: \\[ \\begin{aligned} " + uName + "^2 &= " + (RA * RA) + " - " + (kVal * kVal) + " \\\\ &= " + (RA * RA - kVal * kVal) + " \\end{aligned} \\] so \\(" + uName + " = \\pm " + Math.abs(uVal) + "\\), and Quadrant " + QN[qA - 1] + " gives \\(" + uName + " = " + uVal + "\\).";
    var vA = pick(["ratio", "ratio", "coord", "dec"]);
    if (vA === "coord") {
      q = numq(setupA + " What is the " + uName + "-coordinate of \\(P\\)?",
        uVal, 0.01,
        findU + " The " + uName + "-coordinate of \\(P\\) is <b>" + uVal + "</b>.",
        { mode: "A-coord", tr: trA, quad: qA });
    } else if (vA === "dec") {
      var kindN = pick(["sin", "cos", "tan"]);
      var numN = kindN === "cos" ? XA : YA, denN = kindN === "tan" ? XA : RA;
      var valN = Math.round(numN / denN * 1000) / 1000;
      q = numq(setupA + " What is \\(\\" + kindN + "\\theta\\), to the nearest thousandth?",
        valN, 0.0011,
        findU + " Then \\(\\" + kindN + "\\theta = " + DEFS[kindN] + " = " + u4fr(numN, denN) + " \\approx " + fmt(valN, 3) + "\\). The value is <b>" + fmt(valN, 3) + "</b>.",
        { mode: "A-dec", kind: kindN, tr: trA, quad: qA });
    } else {
      var kindA = pick(u4KINDS);
      var valsA = { sin: [YA, RA], cos: [XA, RA], tan: [YA, XA], csc: [RA, YA], sec: [RA, XA], cot: [XA, YA] };
      var aStrA = u4fr(valsA[kindA][0], valsA[kindA][1]);
      var corrA = "\\(" + aStrA + "\\)";
      var candsA = u4KINDS.map(function (k2) { return "\\(" + u4fr(valsA[k2][0], valsA[k2][1]) + "\\)"; });
      candsA.push("\\(" + u4fr(-valsA[kindA][0], valsA[kindA][1]) + "\\)", "\\(" + u4fr(valsA[kindA][1], valsA[kindA][0]) + "\\)");
      q = mcq(setupA + " What is the exact value of \\(\\" + kindA + "\\theta\\)?",
        corrA, u4dist3(corrA, candsA),
        findU + " So \\(P = (" + XA + ", " + YA + ")\\) with \\(r = " + RA + "\\): \\[ \\begin{aligned} \\" + kindA + "\\theta &= " + DEFS[kindA] + " \\\\ &= " + aStrA + " \\end{aligned} \\] The exact value is <b>" + corrA + "</b>.",
        { mode: "A-ratio", kind: kindA, tr: trA, quad: qA });
    }
    q.figure = figP(XA, YA, knownX ? "P(" + XA + ", ?)" : "P(?, " + YA + ")");
    return q;
  }
  if (mode === "B") {
    var degB = pick(u4DEGS);
    var askXB = Math.random() < 0.5, radB = Math.random() < 0.4;
    var exXB = u4exact("cos", degB), exYB = u4exact("sin", degB);
    var keyB = askXB ? exXB.s : exYB.s, othB = askXB ? exYB.s : exXB.s;
    var corrB = "\\(" + keyB + "\\)";
    var negB = keyB === "0" ? null : "\\(" + (keyB.charAt(0) === "-" ? keyB.slice(1) : "-" + keyB) + "\\)";
    var candsB = ["\\(" + othB + "\\)", negB, "\\(1\\)", "\\(-1\\)", "\\(0\\)", "\\(\\frac{1}{2}\\)", "\\(-\\frac{1}{2}\\)", "\\(\\frac{\\sqrt{2}}{2}\\)", "\\(-\\frac{\\sqrt{2}}{2}\\)", "\\(\\frac{\\sqrt{3}}{2}\\)", "\\(-\\frac{\\sqrt{3}}{2}\\)"];
    var angB = radB ? u4radS(degB) : degB + "^\\circ";
    q = mcq("The terminal arm of \\(\\theta = " + angB + "\\) meets the unit circle at the point \\(P\\), as shown in the diagram. What is the " + (askXB ? "x" : "y") + "-coordinate of \\(P\\)?",
      corrB, u4dist3(corrB, candsB),
      "On the unit circle, \\(P = (\\cos\\theta, \\sin\\theta)\\). For \\(\\theta = " + angB + "\\), \\(\\cos\\theta = " + exXB.s + "\\) and \\(\\sin\\theta = " + exYB.s + "\\), so \\(P = \\left(" + exXB.s + ", " + exYB.s + "\\right)\\). The " + (askXB ? "x" : "y") + "-coordinate is <b>" + corrB + "</b>.",
      { mode: "B", deg: degB, askX: askXB, rad: radB });
    q.figure = u4armSVG(degB);
    return q;
  }
  if (mode === "C") {
    var ctxC = pick([
      ["A point \\(P\\) is marked on the rim of a Ferris wheel", [6, 8, 10, 12, 14, 15, 16, 20]],
      ["A point \\(P\\) is marked at the tip of a wind turbine blade", [18, 20, 24, 25, 30, 32, 36, 40]],
      ["A point \\(P\\) is marked on the rim of a water wheel", [2, 3, 4, 5, 6, 8]],
      ["A point \\(P\\) is marked at the end of a rotating arm on a carnival ride", [4, 5, 6, 7, 8, 9, 10, 12]]
    ]);
    var rC = pick(ctxC[1]);
    var vertC = Math.random() < 0.5;
    var degC = vertC ? pick([30, 90, 150, 210, 270, 330]) : pick([0, 60, 120, 180, 240, 300]);
    var kindC = vertC ? "sin" : "cos";
    var exC = u4exact(kindC, degC);
    var ansC = Math.round(rC * exC.v * 100) / 100;
    var stemC = ctxC[0] + " of radius " + rC + " m. At one instant, the radius from the centre to \\(P\\) makes an angle of \\(\\theta = " + degC + "^\\circ\\) in standard position, as shown in the diagram. ";
    if (vertC) {
      q = numq(stemC + "What is the height of \\(P\\) above the level of the centre, in metres? (Give a negative answer if \\(P\\) is below the centre.)",
        ansC, 0.011,
        "The height of \\(P\\) is the vertical component of the radius: \\[ \\begin{aligned} h &= r\\sin\\theta \\\\ &= " + rC + "\\sin(" + degC + "^\\circ) \\\\ &= " + rC + "\\left(" + exC.s + "\\right) \\\\ &= " + fmt(ansC, 1) + " \\text{ m} \\end{aligned} \\] The height is <b>" + fmt(ansC, 1) + " m</b>" + (ansC < 0 ? ", so \\(P\\) is below the centre" : "") + ".",
        { mode: "C-height", deg: degC, r: rC });
    } else {
      q = numq(stemC + "How far is \\(P\\) to the right of the vertical line through the centre, in metres? (Give a negative answer if \\(P\\) is to the left of that line.)",
        ansC, 0.011,
        "The displacement of \\(P\\) from the centre line is the horizontal component of the radius: \\[ \\begin{aligned} d &= r\\cos\\theta \\\\ &= " + rC + "\\cos(" + degC + "^\\circ) \\\\ &= " + rC + "\\left(" + exC.s + "\\right) \\\\ &= " + fmt(ansC, 1) + " \\text{ m} \\end{aligned} \\] The displacement is <b>" + fmt(ansC, 1) + " m</b>" + (ansC < 0 ? ", so \\(P\\) is to the left of the centre line" : "") + ".",
        { mode: "C-disp", deg: degC, r: rC });
    }
    q.figure = u4armSVG(degC);
    return q;
  }
  var trD = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
  var kD = ri(1, 3);
  var legXD = pick([trD[0], trD[1]]), legYD = legXD === trD[0] ? trD[1] : trD[0];
  var qD = ri(1, 4), sxD = (qD === 2 || qD === 3) ? -1 : 1, syD = (qD === 3 || qD === 4) ? -1 : 1;
  var XD = sxD * legXD * kD, YD = syD * legYD * kD, RD = trD[2] * kD;
  var gkD = pick(["sin", "cos"]);
  var givD = gkD === "sin" ? u4fr(YD, RD) : u4fr(XD, RD);
  var corrD = "\\((" + XD + ", " + YD + ")\\)";
  var disD = ["\\((" + (-XD) + ", " + YD + ")\\)", "\\((" + XD + ", " + (-YD) + ")\\)", "\\((" + YD + ", " + XD + ")\\)"];
  var solD;
  if (gkD === "sin") {
    solD = "Since \\(\\sin\\theta = \\frac{y}{r}\\) with \\(r = " + RD + "\\): \\[ \\begin{aligned} y &= " + RD + "\\left(" + givD + "\\right) \\\\ &= " + YD + " \\end{aligned} \\] Then \\[ \\begin{aligned} x^2 &= " + (RD * RD) + " - " + (YD * YD) + " \\\\ &= " + (RD * RD - YD * YD) + " \\end{aligned} \\] so \\(x = \\pm " + Math.abs(XD) + "\\), and Quadrant " + QN[qD - 1] + " gives \\(x = " + XD + "\\). The coordinates of \\(P\\) are <b>" + corrD + "</b>.";
  } else {
    solD = "Since \\(\\cos\\theta = \\frac{x}{r}\\) with \\(r = " + RD + "\\): \\[ \\begin{aligned} x &= " + RD + "\\left(" + givD + "\\right) \\\\ &= " + XD + " \\end{aligned} \\] Then \\[ \\begin{aligned} y^2 &= " + (RD * RD) + " - " + (XD * XD) + " \\\\ &= " + (RD * RD - XD * XD) + " \\end{aligned} \\] so \\(y = \\pm " + Math.abs(YD) + "\\), and Quadrant " + QN[qD - 1] + " gives \\(y = " + YD + "\\). The coordinates of \\(P\\) are <b>" + corrD + "</b>.";
  }
  q = mcq("The terminal arm of an angle \\(\\theta\\) in standard position meets the circle \\(x^2 + y^2 = " + (RD * RD) + "\\) at the point \\(P\\), as shown in the diagram. If \\(\\" + gkD + "\\theta = " + givD + "\\) and \\(\\theta\\) is in Quadrant " + QN[qD - 1] + ", what are the coordinates of \\(P\\)?",
    corrD, disD, solD,
    { mode: "D", gk: gkD, quad: qD, k: kD });
  q.figure = figP(XD, YD, "P");
  return q;
});

/* ---- 7.34, 7.36: solve a trigonometric equation exactly; verify a solution ---- */
E("u4-solve-equation-exact", 4, ["7.34", "7.36"], 2, "gen", function () {
  var kind = pick(["sin", "cos", "tan"]);
  var refPool = kind === "cos" ? [30, 45, 60, 90] : [0, 30, 45, 60];
  var refDeg = pick(refPool), sgn = pick([1, -1]);
  var v = sgn * Math.abs(u4ratioVal(kind, refDeg));
  var sols = u4DEGS.filter(function (d) { return Math.abs(u4ratioVal(kind, d) - v) < 1e-9; });
  var valStr = u4exact(kind, sols[0]).s;
  var form2 = Math.random() < 0.4;
  var eqn = form2 ? "2\\" + kind + "\\theta = " + u4twoStr(kind, v) : "\\" + kind + "\\theta = " + valStr;
  var rad = Math.random() < 0.6;
  var domTxt = rad ? "\\(0 \\le \\theta < 2\\pi\\)" : "\\(0^\\circ \\le \\theta < 360^\\circ\\)";
  if (Math.random() < 0.55) {
    var s1 = sols[0], s2 = sols[1];
    var corr = u4pairStr([s1, s2], rad);
    var candPairs = [[s1, (360 - s1) % 360], [s2, (360 - s2) % 360], [(180 - s1 + 360) % 360, (180 + s1) % 360],
      [s2, (360 - s1) % 360], [s1, (180 + s1) % 360], [(s1 + 180) % 360, (s2 + 180) % 360],
      [0, 180], [45, 315], [135, 225], [60, 300], [30, 210], [150, 330], [120, 240]];
    var candStrs = [];
    candPairs.forEach(function (pr) { if (pr[0] !== pr[1]) candStrs.push(u4pairStr(pr, rad)); });
    return mcq("Solve the equation \\(" + eqn + "\\) for " + domTxt + ".",
      corr, u4dist3(corr, candStrs),
      "Isolate the ratio: \\(\\" + kind + "\\theta = " + valStr + "\\). The reference angle is " + refDeg + "°, and the sign of the value places the solutions in the two quadrants where \\(\\" + kind + "\\theta\\) takes that sign. The solutions are <b>" + corr + "</b>.",
      { mode: "pair", kind: kind, v: valStr, form2: form2, rad: rad });
  }
  var good = pick(sols);
  var bads = shuffle(u4DEGS.filter(function (d) { return sols.indexOf(d) < 0; })).slice(0, 3);
  var corrV = rad ? "\\(" + u4radS(good) + "\\)" : good + "°";
  var disV = bads.map(function (d) { return rad ? "\\(" + u4radS(d) + "\\)" : d + "°"; });
  return mcq("Which value of \\(\\theta\\) is a solution of the equation \\(" + eqn + "\\) for " + domTxt + "?",
    corrV, disV,
    "Substitute \\(\\theta = " + (rad ? u4radS(good) : good + "°") + "\\): the left side becomes \\(\\" + kind + "(" + (rad ? u4radS(good) : good + "^\\circ") + ") = " + valStr + "\\)" + (form2 ? ", and doubling gives \\(" + u4twoStr(kind, v) + "\\)" : "") + ", which matches the equation. The value <b>" + corrV + "</b> is a solution.",
    { mode: "verify", kind: kind, v: valStr, form2: form2, rad: rad });
});

/* ---- 7.35: approximate solutions of a trigonometric equation ---- */
E("u4-solve-equation-approx", 4, ["7.35"], 2, "gen", function () {
  var kind = pick(["sin", "cos", "tan"]);
  var v = ri(12, 96) / 100 * pick([1, -1]);
  var a = kind === "sin" ? Math.asin(v) : kind === "cos" ? Math.acos(v) : Math.atan(v);
  var sols = kind === "sin" ? [u4wrap(a), u4wrap(Math.PI - a)] : kind === "cos" ? [u4wrap(a), u4wrap(-a)] : [u4wrap(a), u4wrap(a + Math.PI)];
  sols.sort(function (x, y) { return x - y; });
  var which = pick([0, 1]), target = sols[which];
  var wName = which === 0 ? "smaller" : "larger";
  var invTxt = "\\" + kind + "^{-1}(" + fmt(v) + ")";
  if (Math.random() < 0.5) {
    return numq("Solve the equation \\(\\" + kind + "\\theta = " + fmt(v) + "\\) for \\(0 \\le \\theta < 2\\pi\\). Give the " + wName + " solution, to the nearest hundredth.",
      Math.round(target * 100) / 100, 0.006,
      "Using the inverse ratio, one solution is \\(\\theta = " + invTxt + "\\); placing it and its symmetric partner in the interval gives \\(\\theta \\approx " + fmt(sols[0]) + "\\) and \\(\\theta \\approx " + fmt(sols[1]) + "\\). The " + wName + " solution is <b>" + fmt(target) + "</b>.",
      { mode: "rad", kind: kind, v: v, which: which });
  }
  var tDeg = target * 180 / Math.PI;
  return numq("Solve the equation \\(\\" + kind + "\\theta = " + fmt(v) + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\). Give the " + wName + " solution, to the nearest tenth of a degree.",
    Math.round(tDeg * 10) / 10, 0.06,
    "Using the inverse ratio, one solution is \\(\\theta = " + invTxt + "\\); placing it and its symmetric partner in the interval gives \\(\\theta \\approx " + fmt(sols[0] * 180 / Math.PI, 1) + "^\\circ\\) and \\(\\theta \\approx " + fmt(sols[1] * 180 / Math.PI, 1) + "^\\circ\\). The " + wName + " solution is <b>" + fmt(tDeg, 1) + "°</b>.",
    { mode: "deg", kind: kind, v: v, which: which });
});

/* ---- 7.37: identify and correct errors in a worked solution ---- */
E("u4-error-analysis", 4, ["7.37"], 3, "var", varset([
  function () {
    return mcq("A student solves the equation \\(\\sin\\theta = \\frac{1}{2}\\) for \\(0 \\le \\theta < 2\\pi\\) and writes only \\(\\theta = \\frac{\\pi}{6}\\). What is the error in this solution?",
      "The solution \\(\\theta = \\frac{5\\pi}{6}\\) in Quadrant II was missed",
      ["The reference angle for \\(\\sin\\theta = \\frac{1}{2}\\) is \\(\\frac{\\pi}{3}\\), not \\(\\frac{\\pi}{6}\\)",
        "\\(\\theta = \\frac{\\pi}{6}\\) does not satisfy the equation",
        "The solutions should have been given in degrees rather than radians"],
      "Sine is positive in Quadrants I and II, so there are two solutions in the interval: \\(\\theta = \\frac{\\pi}{6}\\) and \\(\\theta = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}\\). The error is the missed Quadrant II solution.",
      { v: 1 });
  },
  function () {
    return mcq("A student converts 150° to radians as shown: \\(150 \\times \\frac{180}{\\pi} \\approx 8594\\) rad. What is the error in this conversion?",
      "The conversion factor was inverted; degrees must be multiplied by \\(\\frac{\\pi}{180}\\)",
      ["The student should have divided 150 by 360 before converting to radians",
        "A radian measure can never exceed \\(2\\pi\\), so a full rotation should be subtracted first",
        "The value 150 should have been replaced by its reference angle, 30"],
      "To convert degrees to radians, multiply by \\(\\frac{\\pi}{180}\\), not by its reciprocal: \\[ \\begin{aligned} 150^\\circ &= 150 \\times \\frac{\\pi}{180} \\\\ &= \\frac{5\\pi}{6} \\\\ &\\approx 2.62 \\text{ rad} \\end{aligned} \\] The error is the inverted conversion factor.",
      { v: 2 });
  },
  function () {
    return mcq("A student solves \\(\\cos\\theta = -\\frac{\\sqrt{3}}{2}\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\) and gives \\(\\theta = 150^\\circ\\) and \\(\\theta = 330^\\circ\\). Which statement about this solution is <b>NOT</b> correct?",
      "\\(330^\\circ\\) is a solution, because cosine is negative in Quadrant IV",
      ["The value \\(\\theta = 150^\\circ\\) is a correct solution of the equation",
        "The reference angle for the equation is \\(30^\\circ\\), as the student used",
        "\\(210^\\circ\\) is also a solution, because cosine is negative in Quadrant III"],
      "Cosine is negative in Quadrants II and III only, so the solutions are \\(150^\\circ\\) and \\(210^\\circ\\). At \\(330^\\circ\\), in Quadrant IV, cosine is positive: \\(\\cos 330^\\circ = \\frac{\\sqrt{3}}{2}\\). The statement claiming \\(330^\\circ\\) is a solution with a negative cosine in Quadrant IV is the one that is NOT correct.",
      { v: 3 });
  },
  function () {
    return mcq("The point P(-3, 4) lies on the terminal arm of an angle \\(\\theta\\) in standard position. A student writes \\(\\sin\\theta = \\frac{4}{3}\\). What is the error in this value?",
      "The student divided by the x-coordinate instead of by r; since \\(r = 5\\), \\(\\sin\\theta = \\frac{4}{5}\\)",
      ["The sine value must be negative because the point is in Quadrant II, so the value should not be positive",
        "The student should have found \\(\\tan\\theta\\) first and worked from it to get the sine value",
        "There is no error in the work shown; \\(\\sin\\theta = \\frac{4}{3}\\) is the correct value for this point"],
      "The distance from the origin is \\[ \\begin{aligned} r &= \\sqrt{(-3)^2 + 4^2} \\\\ &= \\sqrt{25} \\\\ &= 5 \\end{aligned} \\] so \\(\\sin\\theta = \\frac{y}{r} = \\frac{4}{5}\\). The student divided by 3, the size of the x-coordinate, in place of r. A sine value greater than 1 is also impossible.",
      { v: 4 });
  }
]));

/* ---- 7.10, 7.12: combine a circle equation with a quadrant and one coordinate ---- */
E("u4-circle-point-reasoning", 4, ["7.10", "7.12"], 3, "gen", function () {
  var trip = pick([[5, 3, 4], [13, 5, 12], [17, 8, 15], [25, 7, 24], [29, 20, 21], [41, 9, 40], [15, 9, 12], [10, 6, 8], [20, 12, 16]]);
  var R = trip[0], a = trip[1], b = trip[2];
  var quad = ri(1, 4);
  var sx = (quad === 2 || quad === 3) ? -1 : 1, sy = (quad === 3 || quad === 4) ? -1 : 1;
  var X = sx * a, Y = sy * b;
  var giveX = Math.random() < 0.5;
  var kind = pick(u4KINDS);
  var vals = { sin: [Y, R], cos: [X, R], tan: [Y, X], csc: [R, Y], sec: [R, X], cot: [X, Y] };
  var corr = "\\(" + u4fr(vals[kind][0], vals[kind][1]) + "\\)";
  var cands = u4KINDS.map(function (k2) { return "\\(" + u4fr(vals[k2][0], vals[k2][1]) + "\\)"; });
  cands.push("\\(" + u4fr(-vals[kind][0], vals[kind][1]) + "\\)");
  var givenCoord = giveX ? "x" : "y", givenVal = giveX ? X : Y;
  var otherName = giveX ? "y" : "x", otherVal = giveX ? Y : X, otherMag = giveX ? b : a;
  return mcq("A point P lies on the terminal arm of an angle \\(\\theta\\) in standard position. P also lies on the circle \\(x^2 + y^2 = " + (R * R) + "\\) and in Quadrant " + ["I", "II", "III", "IV"][quad - 1] + ". The " + givenCoord + "-coordinate of P is " + givenVal + ". What is the value of \\(\\" + kind + "\\theta\\)?",
    corr, u4dist3(corr, cands),
    "The circle \\(x^2 + y^2 = " + (R * R) + "\\) has radius \\(r = " + R + "\\), so the " + otherName + "-coordinate has size \\(\\sqrt{" + R + "^2 - " + Math.abs(givenVal) + "^2} = " + otherMag + "\\); Quadrant " + ["I", "II", "III", "IV"][quad - 1] + " makes it " + otherVal + ". With \\(x = " + X + "\\), \\(y = " + Y + "\\) and \\(r = " + R + "\\), the ratio \\(\\" + kind + "\\theta\\) is <b>" + corr + "</b>.",
    { kind: kind, quad: quad, giveX: giveX });
});

/* ---- 7.9, 7.3: compare arcs, transferring between degrees and radians ---- */
E("u4-arc-compare", 4, ["7.9", "7.3"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var thA = ri(7, 26) / 10, degB = ri(35, 160), radB = degB * Math.PI / 180;
    while (Math.abs(thA - radB) < 0.12) { degB = ri(35, 160); radB = degB * Math.PI / 180; }
    var winA = thA > radB;
    var corr = winA ? "Angle A cuts the longer arc on the circle" : "Angle B cuts the longer arc on the circle";
    return mcq("Two angles in standard position cut arcs on the same circle. Angle A measures " + fmt(thA, 1) + " rad and angle B measures " + degB + "°. Which angle cuts the longer arc?",
      corr, ["Angle A cuts the longer arc on the circle", "Angle B cuts the longer arc on the circle", "The two arcs are exactly the same length", "The lengths cannot be compared without knowing the radius"].filter(function (s) { return s !== corr; }),
      "On the same circle the radius is shared, so the larger angle cuts the longer arc. Convert B to radians: \\[ \\begin{aligned} " + degB + "^\\circ &= " + degB + " \\times \\frac{\\pi}{180} \\\\ &\\approx " + fmt(radB) + " \\text{ rad} \\end{aligned} \\] Angle A measures " + fmt(thA, 1) + " rad, so <b>" + corr.toLowerCase() + "</b>.",
      { mode: "same", thA: thA, degB: degB });
  }
  var r1 = ri(5, 15), t1 = ri(7, 26) / 10, r2 = ri(5, 15), t2 = ri(7, 26) / 10;
  while (Math.abs(r1 * t1 - r2 * t2) < 0.8) { t2 = ri(7, 26) / 10; r2 = ri(5, 15); }
  var a1 = r1 * t1, a2 = r2 * t2, win1 = a1 > a2;
  var corr2 = win1 ? "The arc cut on circle 1 is the longer one" : "The arc cut on circle 2 is the longer one";
  return mcq("On circle 1, with radius " + r1 + " cm, a central angle of " + fmt(t1, 1) + " rad cuts an arc. On circle 2, with radius " + r2 + " cm, a central angle of " + fmt(t2, 1) + " rad cuts an arc. Which arc is longer?",
    corr2, ["The arc cut on circle 1 is the longer one", "The arc cut on circle 2 is the longer one", "The two arcs are exactly the same length", "The lengths cannot be compared because the radii are different"].filter(function (s) { return s !== corr2; }),
    "Compute both arcs with \\(a = r\\theta\\): \\[ \\begin{aligned} a_1 &= " + r1 + " \\times " + fmt(t1, 1) + " = " + fmt(a1, 1) + " \\text{ cm} \\\\ a_2 &= " + r2 + " \\times " + fmt(t2, 1) + " = " + fmt(a2, 1) + " \\text{ cm} \\end{aligned} \\] <b>" + corr2 + "</b>.",
    { mode: "diff", r1: r1, t1: t1, r2: r2, t2: t2 });
});

/* ---------- Unit-test pool fix, Nov 9, 2026: one Level 3 CR entry (3 marks, opens the 6 pick with the existing 3-mark entry) and one Level 2 CR entry (3 marks, makes the 9-mark remainder reachable). ---------- */
E("u4-repair-solution-cr",4,["7.37"],3,"var",varset([
  function(){
    return mcq("A student solves \\(\\sin x = \\frac{1}{2}\\) for \\(0 \\leq x < 2\\pi\\) and stops after writing \\(x = \\frac{\\pi}{6}\\), the value returned by the inverse sine key. What is the <b>complete</b> solution?",
      "\\(\\{\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\}\\)",
      ["\\(\\{\\frac{\\pi}{6}\\}\\)",
       "\\(\\{\\frac{\\pi}{6}, \\frac{7\\pi}{6}\\}\\)",
       "\\(\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\}\\)"],
      "Sine is positive in quadrants I and II. The reference angle is \\(\\frac{\\pi}{6}\\), so there is a second solution, \\(\\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}\\). The complete solution is \\(\\{\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\}\\). The inverse key alone returns only the quadrant I value.",
      {sc:"sin-half"});
  },
  function(){
    return mcq("A student solves \\(\\cos x = -\\frac{1}{2}\\) for \\(0 \\leq x < 2\\pi\\) and stops after writing \\(x = \\frac{2\\pi}{3}\\), the value returned by the inverse cosine key. What is the <b>complete</b> solution?",
      "\\(\\{\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\}\\)",
      ["\\(\\{\\frac{2\\pi}{3}\\}\\)",
       "\\(\\{\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\}\\)",
       "\\(\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\}\\)"],
      "Cosine is negative in quadrants II and III. The reference angle is \\(\\frac{\\pi}{3}\\), giving \\(\\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}\\) and \\(\\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}\\). The complete solution is \\(\\{\\frac{2\\pi}{3}, \\frac{4\\pi}{3}\\}\\). The inverse key alone returns only the quadrant II value.",
      {sc:"cos-neg-half"});
  },
  function(){
    return mcq("A student solves \\(\\sin x = -\\frac{\\sqrt{3}}{2}\\) for \\(0 \\leq x < 2\\pi\\) and stops after writing \\(x = \\frac{4\\pi}{3}\\), the first solution found on the unit circle. What is the <b>complete</b> solution?",
      "\\(\\{\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\}\\)",
      ["\\(\\{\\frac{4\\pi}{3}\\}\\)",
       "\\(\\{\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\}\\)",
       "\\(\\{\\frac{4\\pi}{3}, \\frac{7\\pi}{3}\\}\\)"],
      "Sine is negative in quadrants III and IV. The reference angle is \\(\\frac{\\pi}{3}\\), giving \\(\\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}\\) and \\(2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}\\). The complete solution is \\(\\{\\frac{4\\pi}{3}, \\frac{5\\pi}{3}\\}\\). The value \\(\\frac{7\\pi}{3}\\) lies outside the stated interval.",
      {sc:"sin-neg-root3"});
  },
  function(){
    return mcq("A student solves \\(\\tan x = 1\\) for \\(0 \\leq x < 2\\pi\\) and stops after writing \\(x = \\frac{\\pi}{4}\\), the value returned by the inverse tangent key. What is the <b>complete</b> solution?",
      "\\(\\{\\frac{\\pi}{4}, \\frac{5\\pi}{4}\\}\\)",
      ["\\(\\{\\frac{\\pi}{4}\\}\\)",
       "\\(\\{\\frac{\\pi}{4}, \\frac{3\\pi}{4}\\}\\)",
       "\\(\\{\\frac{3\\pi}{4}, \\frac{7\\pi}{4}\\}\\)"],
      "Tangent is positive in quadrants I and III, and its period is \\(\\pi\\), so the solutions repeat every \\(\\pi\\): \\(\\frac{\\pi}{4}\\) and \\(\\frac{\\pi}{4} + \\pi = \\frac{5\\pi}{4}\\). The complete solution is \\(\\{\\frac{\\pi}{4}, \\frac{5\\pi}{4}\\}\\).",
      {sc:"tan-one"});
  }
]));
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u4-angle-measures-cr",4,["7.16"],2,"var",varset([
  function(){
    var ref=Math.asin(3/5), ans=Math.PI+ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\sin\\theta = -\\frac{3}{5}\\) and \\(\\pi \\leq \\theta \\leq \\frac{3\\pi}{2}\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\sin^{-1}\\left(\\frac{3}{5}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant III, \\(\\theta = \\pi + \\alpha \\approx 3.1416 + "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"sin35-q3"});
  },
  function(){
    var ref=Math.asin(5/13), ans=2*Math.PI-ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\sin\\theta = -\\frac{5}{13}\\) and \\(\\frac{3\\pi}{2} \\leq \\theta \\leq 2\\pi\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\sin^{-1}\\left(\\frac{5}{13}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant IV, \\(\\theta = 2\\pi - \\alpha \\approx 6.2832 - "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"sin513-q4"});
  },
  function(){
    var ref=Math.acos(7/25), ans=Math.PI-ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\cos\\theta = -\\frac{7}{25}\\) and \\(\\frac{\\pi}{2} \\leq \\theta \\leq \\pi\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\cos^{-1}\\left(\\frac{7}{25}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant II, \\(\\theta = \\pi - \\alpha \\approx 3.1416 - "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"cos725-q2"});
  },
  function(){
    var ref=Math.acos(8/17), ans=Math.PI+ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\cos\\theta = -\\frac{8}{17}\\) and \\(\\pi \\leq \\theta \\leq \\frac{3\\pi}{2}\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\cos^{-1}\\left(\\frac{8}{17}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant III, \\(\\theta = \\pi + \\alpha \\approx 3.1416 + "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"cos817-q3"});
  },
  function(){
    var ref=Math.atan(3/4), ans=Math.PI+ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\tan\\theta = \\frac{3}{4}\\) and \\(\\pi \\leq \\theta \\leq \\frac{3\\pi}{2}\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\tan^{-1}\\left(\\frac{3}{4}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant III, \\(\\theta = \\pi + \\alpha \\approx 3.1416 + "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"tan34-q3"});
  },
  function(){
    var ref=Math.atan(5/12), ans=2*Math.PI-ref;
    return numq("The angle \\(\\theta\\) satisfies \\(\\tan\\theta = -\\frac{5}{12}\\) and \\(\\frac{3\\pi}{2} \\leq \\theta \\leq 2\\pi\\). Determine \\(\\theta\\), in radians, to two decimal places.",
      Math.round(ans*100)/100,0.01,
      "The reference angle is \\(\\alpha = \\tan^{-1}\\left(\\frac{5}{12}\\right) \\approx "+fmt(ref,4)+"\\). In quadrant IV, \\(\\theta = 2\\pi - \\alpha \\approx 6.2832 - "+fmt(ref,4)+" = \\)<b>"+fmt(ans,2)+"</b>.",
      {sc:"tan512-q4"});
  }
]));

/* ================= Numerical Response form, added Nov 13, 2026 =================
   Build step 6 of the Pure Math scan build order: the diploma
   Numerical Response code-assembly form on this unit's exact-value
   family (7.14). Two scaled special-angle ratios sharing a radicand
   combine into a single surd value a sqrt(b) / c, and the student
   records a, b, c in that order as a three-digit code, checked with
   the app's ordinary numeric answer checking (tol 0.4, so only the
   exact code is accepted). The code-format hazards are handled by
   construction: a is a positive single digit, so the code never
   carries a leading zero; b and c are single digits; the fraction
   is in lowest terms and b is squarefree, so the stated form is
   unique and the code is unambiguous. Level 2: the family entry
   u4-exact-special recalls a single value at Level 1, while
   combining two values into one lowest-terms form is the unit's
   Level 2 exact work (compare u4-other-ratios); the recording step
   itself adds no demand. A selected-response entry: no CR marks. */

var u4NRV = { /* exact ratio values at first-quadrant special angles as [n, d, r]: value = (n / d) * sqrt(r) */
  sin: { 30: [1, 2, 1], 45: [1, 2, 2], 60: [1, 2, 3] },
  cos: { 30: [1, 2, 3], 45: [1, 2, 2], 60: [1, 2, 1] },
  tan: { 30: [1, 3, 3], 45: [1, 1, 1], 60: [1, 1, 3] },
  csc: { 30: [2, 1, 1], 45: [1, 1, 2], 60: [2, 3, 3] },
  sec: { 30: [2, 3, 3], 45: [1, 1, 2], 60: [2, 1, 1] },
  cot: { 30: [1, 1, 3], 45: [1, 1, 1], 60: [1, 3, 3] }
};

function u4nrSurd(n, d, b) { /* (n / d) * sqrt(b) as a KaTeX body, n and d positive */
  var core = n === 1 ? "\\sqrt{" + b + "}" : n + "\\sqrt{" + b + "}";
  return d === 1 ? core : "\\frac{" + core + "}{" + d + "}";
}

/* ---- 7.14: Numerical Response code from the parts of an exact value ---- */
E("u4-nr-exact-code", 4, ["7.14"], 2, "gen", function () {
  var rad = Math.random() < 0.5;
  function angS(d) { return rad ? u4radS(d) : d + "^\\circ"; }
  var b = pick([2, 3]);
  var pool = [];
  u4KINDS.forEach(function (k) {
    [30, 45, 60].forEach(function (d) {
      var t = u4NRV[k][d];
      if (t[2] === b) pool.push({ k: k, d: d, n: t[0], dn: t[1] });
    });
  });
  var T1 = null, T2 = null, sgn = 1, A = 0, C = 0, guard = 0;
  while (guard++ < 300 && !T1) {
    var i1 = ri(0, pool.length - 1), i2 = ri(0, pool.length - 1);
    if (i1 === i2) continue;
    var c1 = ri(1, 3), c2 = ri(1, 3), sg = Math.random() < 0.45 ? -1 : 1;
    var num = c1 * pool[i1].n * pool[i2].dn + sg * c2 * pool[i2].n * pool[i1].dn;
    var den = pool[i1].dn * pool[i2].dn;
    if (num <= 0) continue;
    var g = u4gcd(num, den);
    if (num / g > 9 || den / g > 9) continue;
    T1 = { k: pool[i1].k, d: pool[i1].d, c: c1, n: pool[i1].n, dn: pool[i1].dn };
    T2 = { k: pool[i2].k, d: pool[i2].d, c: c2, n: pool[i2].n, dn: pool[i2].dn };
    sgn = sg; A = num / g; C = den / g;
  }
  if (!T1) { /* deterministic fallback draw: 2 tan 60 - sec 30 = 4 sqrt(3) / 3 */
    T1 = { k: "tan", d: 60, c: 2, n: 1, dn: 1 };
    T2 = { k: "sec", d: 30, c: 1, n: 2, dn: 3 };
    sgn = -1; A = 4; C = 3; b = 3;
  }
  function termStr(T) { return (T.c > 1 ? T.c : "") + "\\" + T.k + "\\left(" + angS(T.d) + "\\right)"; }
  function termVal(T) { var g2 = u4gcd(T.c * T.n, T.dn); return u4nrSurd(T.c * T.n / g2, T.dn / g2, b); }
  var expr = termStr(T1) + (sgn > 0 ? " + " : " - ") + termStr(T2);
  var valStr = u4nrSurd(A, C, b);
  var code = 100 * A + 10 * b + C;
  return numq("The exact value of \\(" + expr + "\\) can be written in the form \\(\\frac{a\\sqrt{b}}{c}\\), where \\(a\\), \\(b\\) and \\(c\\) are positive integers, the fraction is in lowest terms, and \\(b\\) is not divisible by any perfect square greater than 1. As a numerical response, record the values of \\(a\\), \\(b\\) and \\(c\\), in that order, as a single three-digit number.",
    code, 0.4,
    "Work out each ratio exactly: \\(" + termStr(T1) + " = " + termVal(T1) + "\\) and \\(" + termStr(T2) + " = " + termVal(T2) + "\\). Combine them: \\[ " + expr + " = " + valStr + " \\] So in the form \\(\\frac{a\\sqrt{b}}{c}\\), \\(a = " + A + "\\), \\(b = " + b + "\\) and \\(c = " + C + "\\). Recorded in that order, \\(a\\), then \\(b\\), then \\(c\\), the code is <b>" + code + "</b>.",
    { form: "abc", terms: [{ k: T1.k, d: T1.d, c: T1.c }, { k: T2.k, d: T2.d, c: T2.c }], sgn: sgn, rad: rad, a: A, b: b, c: C });
});
