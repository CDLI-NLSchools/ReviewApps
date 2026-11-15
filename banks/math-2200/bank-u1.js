// Math 2200 Unit 1 Trigonometry question bank
// CRMARKS: u1-ambiguous-case=3
// CRMARKS: u1-axis-ratios=2
// CRMARKS: u1-context-distance=3
// CRMARKS: u1-cosine-law=2
// CRMARKS: u1-exact-values=2
// CRMARKS: u1-law-proof-steps=3
// CRMARKS: u1-point-angle=2
// CRMARKS: u1-point-distance=2
// CRMARKS: u1-point-ratios=2
// CRMARKS: u1-quadrant=1
// CRMARKS: u1-read-sketch=1
// CRMARKS: u1-reference-angle=1
// CRMARKS: u1-same-reference=2
// CRMARKS: u1-sine-law=2
// CRMARKS: u1-solve-equation=2
/* ================= Unit 1: Trigonometry ================= */
/* ================= Unit 1: Trigonometry =================
   Helpers are prefixed u1; the only other top-level statements are E(...) calls.
   18 entries: L1 4, L2 11, L3 3. Codes: MA2200.7.1 to 7.22 (all degrees; this
   course has no radians). Cluster A: the sine and cosine laws (7.1 to 7.6).
   Cluster B: angles in standard position (7.7 to 7.22). */

function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

function u1fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u1gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}

function u1dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

function u1quadOf(deg) { var p = ((deg % 360) + 360) % 360; return p < 90 ? 1 : p < 180 ? 2 : p < 270 ? 3 : 4; }
function u1refOf(deg) { var p = ((deg % 360) + 360) % 360; return p <= 90 ? p : p <= 180 ? 180 - p : p <= 270 ? p - 180 : 360 - p; }

function u1mag(kind, av) { /* exact magnitude string for a special-angle ratio value */
  var table;
  if (kind === "sin" || kind === "cos") table = [[0, "0"], [0.5, "\\frac{1}{2}"], [0.7071, "\\frac{\\sqrt{2}}{2}"], [0.866, "\\frac{\\sqrt{3}}{2}"], [1, "1"]];
  else table = [[0, "0"], [0.5774, "\\frac{\\sqrt{3}}{3}"], [1, "1"], [1.7321, "\\sqrt{3}"]];
  for (var i = 0; i < table.length; i++) if (Math.abs(av - table[i][0]) < 0.01) return table[i][1];
  return null;
}

function u1exact(kind, deg) { /* {s, v}: exact string and value of sin/cos/tan at a special degree, or null */
  var th = deg * Math.PI / 180, sv = Math.sin(th), cv = Math.cos(th), v;
  if (kind === "sin") v = sv;
  else if (kind === "cos") v = cv;
  else { if (Math.abs(cv) < 1e-9) return null; v = sv / cv; }
  var mag = u1mag(kind, Math.abs(v));
  if (mag === null) return null;
  return { s: (v < 0 && mag !== "0" ? "-" : "") + mag, v: v };
}

function u1armSVG(deg) { /* axes, unit circle, rotation arc and terminal arm for a standard-position angle */
  var th = deg * Math.PI / 180, cx = 88, cy = 88, R = 64;
  var ex = cx + R * Math.cos(th), ey = cy - R * Math.sin(th);
  var large = Math.abs(deg) > 180 ? 1 : 0, sweep = deg >= 0 ? 0 : 1;
  var ax = cx + 38 * Math.cos(th), ay = cy - 38 * Math.sin(th);
  var out = '<svg viewBox="0 0 176 176" width="176" height="176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle in standard position">';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
  out += '<line x1="' + (cx - R - 12) + '" y1="' + cy + '" x2="' + (cx + R + 12) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<line x1="' + cx + '" y1="' + (cy - R - 12) + '" x2="' + cx + '" y2="' + (cy + R + 12) + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  out += '<path d="M ' + (cx + 38) + ' ' + cy + ' A 38 38 0 ' + large + ' ' + sweep + ' ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + fmt(ex, 1) + '" cy="' + fmt(ey, 1) + '" r="3.2" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

function u1ptSVG(x, y) { /* axes with the terminal arm to the point P(x, y) and dashed coordinate drops */
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

/* ---- 7.1: match a described situation to the labels of its diagram ---- */
E("u1-diagram-choice", 1, ["7.1"], 1, "gen", function () {
  var ctxs = [
    { name: "surveyor", open: "A surveyor is mapping a triangular plot of land with corners " },
    { name: "gardener", open: "A gardener is laying out a triangular garden bed with corners " },
    { name: "engineer", open: "An engineer is sketching a triangular brace with corners " },
    { name: "hiker", open: "A hiker is plotting three landmarks, " }
  ];
  var ctx = pick(ctxs);
  var L = pick([["P", "Q", "R"], ["A", "B", "C"], ["X", "Y", "Z"], ["D", "E", "F"]]);
  var len = pick([24, 30, 36, 45, 52, 68, 85, 120]);
  var A = ri(38, 78), B = ri(35, 145 - A);
  while (B === A) B = ri(35, 145 - A);
  var side = L[0] + L[1], side2 = L[1] + L[2], side3 = L[2] + L[0];
  function opt(s, a1, a2) { return s + " = " + len + ", angle " + L[0] + " = " + a1 + "°, angle " + L[1] + " = " + a2 + "°"; }
  var corr = opt(side, A, B);
  var dis = [opt(side2, A, B), opt(side3, A, B), opt(side, B, A)];
  return mcq(ctx.open + L[0] + ", " + L[1] + " and " + L[2] + ". The distance between " + L[0] + " and " + L[1] + " is " + len + " m. The angle at " + L[0] + " is " + A + "° and the angle at " + L[1] + " is " + B + "°. Which set of labels belongs on a diagram of this situation?",
    corr, dis,
    "The measured distance joins vertices " + L[0] + " and " + L[1] + ", so the side " + side + " carries the label " + len + ". The two given angles sit at the ends of that side: angle " + L[0] + " is " + A + "° and angle " + L[1] + " is " + B + "°. The matching labels are <b>" + corr + "</b>.",
    { ctx: ctx.name, len: len, A: A, B: B });
});

/* ---- 7.8: quadrant of an angle in standard position ---- */
E("u1-quadrant", 1, ["7.8"], 1, "gen", function () {
  var deg = ri(3, 357);
  while (deg % 90 < 3 || deg % 90 > 87) deg = ri(3, 357);
  var q = u1quadOf(deg), names = ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"];
  var corr = names[q - 1];
  var dis = names.filter(function (n) { return n !== corr; });
  var lo = (q - 1) * 90, hi = q * 90;
  return mcq("An angle of " + deg + "° is drawn in standard position. In which quadrant does its terminal arm lie?",
    corr, dis,
    "Standard position angles are measured counterclockwise from the positive x-axis. Since \\(" + lo + "^\\circ < " + deg + "^\\circ < " + hi + "^\\circ\\), the terminal arm of the " + deg + "° angle lies in <b>" + corr + "</b>.",
    { deg: deg });
});

/* ---- 7.9: reference angle ---- */
E("u1-reference-angle", 1, ["7.9"], 1, "gen", function () {
  var deg = ri(5, 355);
  while (deg % 90 === 0) deg = ri(5, 355);
  var ref = u1refOf(deg), q = u1quadOf(deg);
  var step = q === 1 ? deg + "^\\circ" : q === 2 ? "180^\\circ - " + deg + "^\\circ" : q === 3 ? deg + "^\\circ - 180^\\circ" : "360^\\circ - " + deg + "^\\circ";
  return numq("Determine the reference angle for an angle of " + deg + "° in standard position. Give the answer in degrees.",
    ref, 0.5,
    "The reference angle is the acute angle between the terminal arm and the x-axis. The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ": \\[ \\begin{aligned} \\text{reference angle} &= " + step + " \\\\ &= " + ref + "^\\circ \\end{aligned} \\] The reference angle is <b>" + ref + "°</b>.",
    { deg: deg });
});

/* ---- 7.7: read the measure of a sketched standard-position angle ---- */
E("u1-read-sketch", 1, ["7.7"], 1, "gen", function () {
  var pool = [];
  for (var d = 20; d <= 340; d += 5) if (d % 90 !== 0) pool.push(d);
  var deg = pick(pool);
  var corr = deg + "°";
  var cands = [360 - deg, (deg + 180) % 360, (540 - deg) % 360, (deg + 90) % 360, (deg + 270) % 360, (180 - deg + 360) % 360].map(function (x) { return x + "°"; });
  var q = mcq("The diagram shows an angle in standard position. What is the measure of the angle?",
    corr, u1dist3(corr, cands),
    "The initial arm lies on the positive x-axis and the rotation is counterclockwise. The terminal arm is in Quadrant " + ["I", "II", "III", "IV"][u1quadOf(deg) - 1] + " with reference angle " + u1refOf(deg) + "°, which gives the measure <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = u1armSVG(deg);
  return q;
});

/* ---- 7.4: sine law, find a side or an angle ---- */
E("u1-sine-law", 1, ["7.4"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var A = ri(25, 80), B = ri(25, 155 - A), C = 180 - A - B;
    var a = ri(6, 38);
    var b = a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180);
    var q1 = numq("In triangle ABC, angle A is " + A + "°, angle B is " + B + "°, and side a is " + a + " cm. Determine the length of side b, to the nearest tenth of a centimetre.",
      b, 0.06,
      "Side a is opposite angle A and side b is opposite angle B, so the sine law gives: \\[ \\begin{aligned} \\frac{b}{\\sin B} &= \\frac{a}{\\sin A} \\\\ b &= \\frac{a \\sin B}{\\sin A} \\\\ &= \\frac{" + a + " \\sin " + B + "^\\circ}{\\sin " + A + "^\\circ} \\\\ &\\approx " + fmt(b, 1) + " \\end{aligned} \\] The length of side b is <b>" + fmt(b, 1) + " cm</b>.",
      { mode: "side", A: A, B: B, a: a });
    q1.figure = triAngSVG(A, B, C, { L: ["A", "B", "C"], ang: [A + "°", B + "°", ""], side: ["" + a, "?", ""] });
    return q1;
  }
  var A2 = ri(25, 60), Bt = ri(A2 + 8, 85), b2 = ri(12, 30);
  var aRaw = b2 * Math.sin(A2 * Math.PI / 180) / Math.sin(Bt * Math.PI / 180);
  var a2 = Math.ceil(aRaw * 10) / 10; /* round UP so the printed side a keeps sin B below 1 */
  var Bans = Math.asin(Math.min(1, b2 * Math.sin(A2 * Math.PI / 180) / a2)) * 180 / Math.PI;
  var q2 = numq("In triangle ABC, angle A is " + A2 + "°, side a is " + fmt(a2, 1) + " cm, and side b is " + b2 + " cm. Angle B is acute. Determine the measure of angle B, to the nearest degree.",
    Bans, 0.6,
    "Side a is opposite angle A and side b is opposite angle B, so the sine law gives: \\[ \\begin{aligned} \\frac{\\sin B}{b} &= \\frac{\\sin A}{a} \\\\ \\sin B &= \\frac{b \\sin A}{a} \\\\ &= \\frac{" + b2 + " \\sin " + A2 + "^\\circ}{" + fmt(a2, 1) + "} \\\\ &\\approx " + fmt(Math.sin(Bans * Math.PI / 180)) + " \\\\ B &\\approx " + Math.round(Bans) + "^\\circ \\end{aligned} \\] The measure of angle B is <b>" + Math.round(Bans) + "°</b>.",
    { mode: "angle", A: A2, a: a2, b: b2 });
  q2.figure = triAngSVG(A2, Bt, 180 - A2 - Bt, { L: ["A", "B", "C"], ang: [A2 + "°", "?", ""], side: ["" + fmt(a2, 1), "" + b2, ""] });
  return q2;
});

/* ---- 7.6: cosine law, find a side or an angle ---- */
E("u1-cosine-law", 1, ["7.6"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var A = ri(35, 140), b = ri(7, 30), c = ri(7, 30);
    var a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * Math.PI / 180));
    var B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180 / Math.PI;
    var C = 180 - A - B;
    var q1 = numq("In triangle ABC, side b is " + b + " cm, side c is " + c + " cm, and the included angle A is " + A + "°. Determine the length of side a, to the nearest tenth of a centimetre.",
      a, 0.06,
      "Side a is opposite the included angle A, so the cosine law gives: \\[ \\begin{aligned} a^2 &= b^2 + c^2 - 2bc \\cos A \\\\ &= " + b + "^2 + " + c + "^2 - 2(" + b + ")(" + c + ") \\cos " + A + "^\\circ \\\\ &\\approx " + fmt(a * a, 1) + " \\\\ a &\\approx " + fmt(a, 1) + " \\end{aligned} \\] The length of side a is <b>" + fmt(a, 1) + " cm</b>.",
      { mode: "side", A: A, b: b, c: c });
    q1.figure = triAngSVG(A, B, C, { L: ["A", "B", "C"], ang: [A + "°", "", ""], side: ["?", "" + b, "" + c] });
    return q1;
  }
  var a2 = ri(9, 30), b2 = ri(9, 30), c2 = ri(9, 30), tries = 0;
  while ((a2 + b2 <= c2 + 2 || b2 + c2 <= a2 + 2 || c2 + a2 <= b2 + 2) && tries < 60) { a2 = ri(9, 30); b2 = ri(9, 30); c2 = ri(9, 30); tries++; }
  var cosA = (b2 * b2 + c2 * c2 - a2 * a2) / (2 * b2 * c2);
  var Aans = Math.acos(Math.max(-1, Math.min(1, cosA))) * 180 / Math.PI;
  var q2 = numq("In triangle ABC, side a is " + a2 + " cm, side b is " + b2 + " cm, and side c is " + c2 + " cm. Determine the measure of angle A, to the nearest degree.",
    Aans, 0.6,
    "The cosine law, rearranged for angle A, gives: \\[ \\begin{aligned} \\cos A &= \\frac{b^2 + c^2 - a^2}{2bc} \\\\ &= \\frac{" + b2 + "^2 + " + c2 + "^2 - " + a2 + "^2}{2(" + b2 + ")(" + c2 + ")} \\\\ &\\approx " + fmt(cosA) + " \\\\ A &\\approx " + Math.round(Aans) + "^\\circ \\end{aligned} \\] The measure of angle A is <b>" + Math.round(Aans) + "°</b>.",
    { mode: "angle", a: a2, b: b2, c: c2 });
  q2.figure = triSVG(a2, b2, c2, { L: ["A", "B", "C"], side: ["" + a2, "" + b2, "" + c2] });
  return q2;
});

/* ---- 7.2, 7.22: contextual distance problems (cosine law and sine law settings) ---- */
E("u1-context-distance", 1, ["7.2", "7.22"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var ctxs = [
      { name: "roads", dmin: 12, dmax: 58, text: function (ang, d1, d2) { return "Two straight roads leave town P, one running to town Q and one to town R. The angle between the two roads is " + ang + "°. Town Q is " + d1 + " km from P and town R is " + d2 + " km from P. How far apart are towns Q and R, to the nearest tenth of a kilometre?"; } },
      { name: "boats", dmin: 6, dmax: 40, text: function (ang, d1, d2) { return "Two boats leave a marina at the same time and travel in straight lines. The angle between their paths is " + ang + "°. After some time, one boat has travelled " + d1 + " km and the other has travelled " + d2 + " km. How far apart are the two boats, to the nearest tenth of a kilometre?"; } },
      { name: "hikers", dmin: 3, dmax: 15, text: function (ang, d1, d2) { return "Two hikers leave a trailhead and walk in straight lines. The angle between their routes is " + ang + "°. One hiker walks " + d1 + " km and the other walks " + d2 + " km. How far apart are the two hikers, to the nearest tenth of a kilometre?"; } }
    ];
    var ctx = pick(ctxs);
    var ang = ri(40, 145), d1 = ri(ctx.dmin, ctx.dmax), d2 = ri(ctx.dmin, ctx.dmax);
    var dist = Math.sqrt(d1 * d1 + d2 * d2 - 2 * d1 * d2 * Math.cos(ang * Math.PI / 180));
    return numq(ctx.text(ang, d1, d2),
      dist, 0.06,
      "The two distances from the starting point and the distance between the endpoints form a triangle, with the given angle included between the known sides. The cosine law gives: \\[ \\begin{aligned} d^2 &= " + d1 + "^2 + " + d2 + "^2 - 2(" + d1 + ")(" + d2 + ") \\cos " + ang + "^\\circ \\\\ &\\approx " + fmt(dist * dist, 1) + " \\\\ d &\\approx " + fmt(dist, 1) + " \\end{aligned} \\] The distance is <b>" + fmt(dist, 1) + " km</b>.",
      { ctx: ctx.name, ang: ang, d1: d1, d2: d2, law: "cosine" });
  }
  var ctxs2 = [
    { name: "lighthouse", bmin: 60, bmax: 300, text: function (base, A, B) { return "A lighthouse stands offshore. From point A on a straight shoreline, the angle between the shoreline and the line of sight to the lighthouse is " + A + "°. Point B is " + base + " m from A along the shoreline, and from B the angle between the shoreline and the line of sight to the lighthouse is " + B + "°. Determine the distance from A to the lighthouse, to the nearest metre."; } },
    { name: "tower", bmin: 40, bmax: 180, text: function (base, A, B) { return "A water tower stands on the far side of a river. From point A on the near bank, the angle between the bank and the line of sight to the tower is " + A + "°. Point B is " + base + " m from A along the bank, and from B the angle between the bank and the line of sight to the tower is " + B + "°. Determine the distance from A to the tower, to the nearest metre."; } }
  ];
  var ctx2 = pick(ctxs2);
  var base = ri(ctx2.bmin, ctx2.bmax), A = ri(38, 78), B = ri(38, 155 - A), L = 180 - A - B;
  var dist2 = base * Math.sin(B * Math.PI / 180) / Math.sin(L * Math.PI / 180);
  return numq(ctx2.text(base, A, B),
    dist2, 0.6,
    "The two sight lines and the shoreline form a triangle. The angle at the lighthouse is \\(180^\\circ - " + A + "^\\circ - " + B + "^\\circ = " + L + "^\\circ\\). The distance from A is opposite the " + B + "° angle, so the sine law gives: \\[ \\begin{aligned} \\frac{d}{\\sin " + B + "^\\circ} &= \\frac{" + base + "}{\\sin " + L + "^\\circ} \\\\ d &= \\frac{" + base + " \\sin " + B + "^\\circ}{\\sin " + L + "^\\circ} \\\\ &\\approx " + Math.round(dist2) + " \\end{aligned} \\] The distance is <b>" + Math.round(dist2) + " m</b>.",
    { ctx: ctx2.name, base: base, A: A, B: B, law: "sine" });
});

/* ---- 7.10, 7.11: angles sharing a reference angle; reflections ---- */
E("u1-same-reference", 1, ["7.10", "7.11"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = pick([15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80]);
    function setStr(arr) { return arr.join("°, ") + "°"; }
    var corrArr = [r, 180 - r, 180 + r, 360 - r];
    var corr = setStr(corrArr);
    var cands = [
      setStr([r, 90 + r, 180 + r, 360 - r]),
      setStr([r, 180 - r, 270 + r, 360 - r]),
      setStr([r, 180 - r, 180 + r, 270 - r]),
      setStr([90 - r, 180 - r, 180 + r, 360 - r])
    ];
    return mcq("Which list gives all the angles between 0° and 360° that have a reference angle of " + r + "°?",
      corr, u1dist3(corr, cands),
      "An angle with reference angle " + r + "° can terminate in any quadrant. In Quadrant I the angle is " + r + "°; reflecting the terminal arm into Quadrant II gives \\(180^\\circ - " + r + "^\\circ = " + (180 - r) + "^\\circ\\); into Quadrant III gives \\(180^\\circ + " + r + "^\\circ = " + (180 + r) + "^\\circ\\); into Quadrant IV gives \\(360^\\circ - " + r + "^\\circ = " + (360 - r) + "^\\circ\\). The list is <b>" + corr + "</b>.",
      { mode: "sets", r: r });
  }
  var q = pick([2, 3, 4]);
  var deg = q === 2 ? ri(100, 170) : q === 3 ? ri(190, 260) : ri(280, 350);
  var ref = u1refOf(deg);
  var opts = ["the x-axis only", "the y-axis only", "both axes", "the line y = x"];
  var corr = q === 2 ? opts[1] : q === 3 ? opts[2] : opts[0];
  var dis = opts.filter(function (o) { return o !== corr; });
  var how = q === 2 ? "Quadrant II is reached by reflecting the reference arm in the y-axis." : q === 3 ? "Quadrant III is reached by reflecting the reference arm in both axes." : "Quadrant IV is reached by reflecting the reference arm in the x-axis.";
  return mcq("An angle of " + deg + "° has a reference angle of " + ref + "°. The terminal arm of the " + deg + "° angle is the reflection of the terminal arm of its reference angle in",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ". " + how + " The reflection is in <b>" + corr + "</b>.",
    { mode: "reflect", deg: deg });
});

/* ---- 7.14: distance from the origin to a point on the terminal arm ---- */
E("u1-point-distance", 1, ["7.14"], 1, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  var bs = pick(bases), s = ri(1, 3);
  var lx = bs[0] * s, ly = bs[1] * s, r = bs[2] * s;
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  return numq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Determine the distance from the origin to point P.",
    r, 0.1,
    "The distance from the origin to P is the hypotenuse of a right triangle with legs \\(|" + x + "|\\) and \\(|" + y + "|\\). The Pythagorean theorem gives: \\[ \\begin{aligned} r^2 &= (" + x + ")^2 + (" + y + ")^2 \\\\ &= " + (x * x) + " + " + (y * y) + " \\\\ &= " + (r * r) + " \\\\ r &= " + r + " \\end{aligned} \\] The distance is <b>" + r + "</b>.",
    { x: x, y: y });
});

/* ---- 7.15: a trigonometric ratio from a point on the terminal arm ---- */
E("u1-point-ratios", 1, ["7.15"], 2, "gen", function () {
  var bases = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  var bs = pick(bases);
  var lx = bs[0], ly = bs[1], r = bs[2];
  if (Math.random() < 0.5) { var t = lx; lx = ly; ly = t; }
  var x = lx * pick([1, -1]), y = ly * pick([1, -1]);
  var kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var num = kind === "sin" ? y : kind === "cos" ? x : y;
  var den = kind === "sin" ? r : kind === "cos" ? r : x;
  var corr = "\\(" + u1fr(num, den) + "\\)";
  var candBodies = [u1fr(x, r), u1fr(y, r), u1fr(y, x), u1fr(x, y), u1fr(-y, r), u1fr(-x, r), u1fr(-y, x), u1fr(r, y), u1fr(r, x)];
  var dis = u1dist3(u1fr(num, den), candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var defn = kind === "sin" ? "\\sin\\theta = \\frac{y}{r}" : kind === "cos" ? "\\cos\\theta = \\frac{x}{r}" : "\\tan\\theta = \\frac{y}{x}";
  return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. What is the exact value of \\(" + kd + " \\theta\\)?",
    corr, dis,
    "First find the distance from the origin: \\(r = \\sqrt{(" + x + ")^2 + (" + y + ")^2} = " + r + "\\). Using \\(" + defn + "\\): \\[ \\begin{aligned} \\" + kd + " \\theta &= " + corr.slice(2, -2) + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { x: x, y: y, kind: kind });
});

/* ---- 7.12, 7.17: read an angle from its sketched terminal-arm point ---- */
E("u1-point-angle", 1, ["7.12", "7.17"], 2, "gen", function () {
  var x = ri(2, 9) * pick([1, -1]), y = ri(2, 9) * pick([1, -1]);
  var theta = Math.atan2(y, x) * 180 / Math.PI;
  if (theta < 0) theta += 360;
  var refA = Math.atan(Math.abs(y / x)) * 180 / Math.PI;
  var q = u1quadOf(Math.round(theta));
  var adjust = q === 1 ? "the angle is the reference angle itself" : q === 2 ? "\\(\\theta = 180^\\circ - " + fmt(refA, 1) + "^\\circ\\)" : q === 3 ? "\\(\\theta = 180^\\circ + " + fmt(refA, 1) + "^\\circ\\)" : "\\(\\theta = 360^\\circ - " + fmt(refA, 1) + "^\\circ\\)";
  var qq = numq("The diagram shows the point P(" + x + ", " + y + ") on the terminal arm of an angle \\(\\theta\\) in standard position. Determine the measure of \\(\\theta\\), to the nearest degree.",
    theta, 0.6,
    "The reference angle satisfies \\(\\tan\\theta' = \\left|\\frac{" + y + "}{" + x + "}\\right|\\), so \\(\\theta' \\approx " + fmt(refA, 1) + "^\\circ\\). The point is in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", so " + adjust + ". To the nearest degree, \\(\\theta\\) is <b>" + Math.round(theta) + "°</b>.",
    { x: x, y: y });
  qq.figure = u1ptSVG(x, y);
  return qq;
});

/* ---- 7.18: ratio values at axis angles, from a point on the terminal arm ---- */
E("u1-axis-ratios", 1, ["7.18"], 1, "gen", function () {
  var dirs = [
    { deg: 0, dx: 1, dy: 0 }, { deg: 90, dx: 0, dy: 1 }, { deg: 180, dx: -1, dy: 0 },
    { deg: 270, dx: 0, dy: -1 }, { deg: 360, dx: 1, dy: 0 }
  ];
  var d = pick(dirs), m = ri(2, 9);
  var x = d.dx * m, y = d.dy * m;
  var kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var corr, why;
  if (kind === "sin") { corr = "" + d.dy; why = "\\sin\\theta = \\frac{y}{r} = \\frac{" + y + "}{" + m + "}"; }
  else if (kind === "cos") { corr = "" + d.dx; why = "\\cos\\theta = \\frac{x}{r} = \\frac{" + x + "}{" + m + "}"; }
  else if (d.dx === 0) { corr = "undefined"; why = "\\tan\\theta = \\frac{y}{x} = \\frac{" + y + "}{0}"; }
  else { corr = "0"; why = "\\tan\\theta = \\frac{y}{x} = \\frac{" + y + "}{" + x + "}"; }
  var all = ["-1", "0", "1", "undefined"];
  var dis = all.filter(function (s) { return s !== corr; });
  var sol = "The point is on the terminal arm of the " + d.deg + "° angle, and \\(r = " + m + "\\). Using the definition, \\(" + why + "\\)." + (corr === "undefined" ? " Division by zero is undefined." : "") + " The exact value of \\(" + kd + " " + d.deg + "^\\circ\\) is <b>" + corr + "</b>.";
  return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle \\(\\theta\\) in standard position. Without using technology, determine the exact value of \\(" + kd + "\\theta\\).",
    corr, dis, sol,
    { deg: d.deg, kind: kind, m: m });
});

/* ---- 7.19: solve sin/cos/tan equations on 0 to 360 degrees ---- */
E("u1-solve-equation", 1, ["7.19"], 2, "gen", function () {
  function pairFmt(p) { return "\\(\\theta = " + p[0] + "^\\circ\\) or \\(\\theta = " + p[1] + "^\\circ\\)"; }
  function pairFor(ratio, ref, sign) {
    if (ratio === "sin") { if (ref === 0) return [0, 180]; return sign > 0 ? [ref, 180 - ref] : [180 + ref, 360 - ref]; }
    if (ratio === "cos") { if (ref === 0) return [90, 270]; return sign > 0 ? [ref, 360 - ref] : [180 - ref, 180 + ref]; }
    if (ref === 0) return [0, 180];
    return sign > 0 ? [ref, 180 + ref] : [180 - ref, 360 - ref];
  }
  function validPair(p) { return p[0] !== p[1] && p[0] >= 0 && p[0] < 360 && p[1] >= 0 && p[1] < 360; }
  function samePair(p, q) { return (p[0] === q[0] && p[1] === q[1]) || (p[0] === q[1] && p[1] === q[0]); }
  function distPairs(corrP, candPs) {
    var out = [];
    for (var i = 0; i < candPs.length; i++) {
      var p = candPs[i];
      if (!validPair(p) || samePair(p, corrP)) continue;
      var s = pairFmt(p);
      if (out.indexOf(s) < 0) out.push(s);
      if (out.length === 3) break;
    }
    return out;
  }
  if (Math.random() < 0.55) {
    var table = [
      { ratio: "sin", a: "\\frac{1}{2}", ref: 30, sign: 1 }, { ratio: "sin", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "sin", a: "\\frac{\\sqrt{3}}{2}", ref: 60, sign: 1 }, { ratio: "sin", a: "-\\frac{1}{2}", ref: 30, sign: -1 },
      { ratio: "sin", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "sin", a: "-\\frac{\\sqrt{3}}{2}", ref: 60, sign: -1 },
      { ratio: "sin", a: "0", ref: 0, sign: 1 },
      { ratio: "cos", a: "\\frac{1}{2}", ref: 60, sign: 1 }, { ratio: "cos", a: "\\frac{\\sqrt{2}}{2}", ref: 45, sign: 1 },
      { ratio: "cos", a: "\\frac{\\sqrt{3}}{2}", ref: 30, sign: 1 }, { ratio: "cos", a: "-\\frac{1}{2}", ref: 60, sign: -1 },
      { ratio: "cos", a: "-\\frac{\\sqrt{2}}{2}", ref: 45, sign: -1 }, { ratio: "cos", a: "-\\frac{\\sqrt{3}}{2}", ref: 30, sign: -1 },
      { ratio: "cos", a: "0", ref: 0, sign: 1 },
      { ratio: "tan", a: "1", ref: 45, sign: 1 }, { ratio: "tan", a: "\\sqrt{3}", ref: 60, sign: 1 },
      { ratio: "tan", a: "\\frac{\\sqrt{3}}{3}", ref: 30, sign: 1 }, { ratio: "tan", a: "-1", ref: 45, sign: -1 },
      { ratio: "tan", a: "-\\sqrt{3}", ref: 60, sign: -1 }, { ratio: "tan", a: "-\\frac{\\sqrt{3}}{3}", ref: 30, sign: -1 },
      { ratio: "tan", a: "0", ref: 0, sign: 1 }
    ];
    var e = pick(table);
    var rd = "\\" + e.ratio;
    var corrP = pairFor(e.ratio, e.ref, e.sign);
    var others = e.ratio === "sin" ? ["cos", "tan"] : e.ratio === "cos" ? ["sin", "tan"] : ["sin", "cos"];
    var candPs = [
      pairFor(e.ratio, e.ref, -e.sign),
      pairFor(e.ratio, 90 - e.ref, e.sign),
      pairFor(others[0], e.ref, e.sign),
      pairFor(others[1], e.ref, e.sign),
      pairFor(e.ratio, e.ref === 30 ? 60 : 30, e.sign),
      pairFor(e.ratio, e.ref === 45 ? 30 : 45, e.sign)
    ];
    var corr = pairFmt(corrP);
    return mcq("Solve \\(" + rd + " \\theta = " + e.a + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\).",
      corr, distPairs(corrP, candPs),
      "The reference angle is " + e.ref + "°, since \\(" + rd + " " + e.ref + "^\\circ = " + (e.a === "0" ? "0" : e.a.replace("-", "")) + "\\). The ratio \\(" + rd + "\\) is " + (e.sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP[0] + "^\\circ\\) and \\(\\theta = " + corrP[1] + "^\\circ\\). The solutions are <b>" + corr + "</b>.",
      { mode: "exact", ratio: e.ratio, ref: e.ref, sign: e.sign });
  }
  var ratio = pick(["sin", "cos"]);
  var rd2 = "\\" + ratio;
  var av = ri(15, 95) / 100, sign = pick([1, -1]);
  var ref = Math.round((ratio === "sin" ? Math.asin(av) : Math.acos(av)) * 180 / Math.PI);
  var corrP2 = pairFor(ratio, ref, sign);
  var candPs2 = [
    pairFor(ratio, ref, -sign),
    pairFor(ratio, 90 - ref, sign),
    pairFor(ratio === "sin" ? "cos" : "sin", ref, sign),
    pairFor(ratio, Math.max(5, ref - 15), sign),
    pairFor(ratio, Math.min(85, ref + 15), sign)
  ];
  var corr2 = pairFmt(corrP2);
  var aStr = (sign < 0 ? "-" : "") + fmt(av);
  return mcq("Solve \\(" + rd2 + " \\theta = " + aStr + "\\) for \\(0^\\circ \\le \\theta < 360^\\circ\\), to the nearest degree.",
    corr2, distPairs(corrP2, candPs2),
    "The reference angle is \\(" + rd2 + "^{-1}(" + fmt(av) + ") \\approx " + ref + "^\\circ\\). The ratio \\(" + rd2 + "\\) is " + (sign > 0 ? "positive" : "negative") + " in the quadrants that give the solutions \\(\\theta = " + corrP2[0] + "^\\circ\\) and \\(\\theta = " + corrP2[1] + "^\\circ\\). The solutions are <b>" + corr2 + "</b>.",
    { mode: "dec", ratio: ratio, a: aStr });
});

/* ---- 7.20: exact values at angles with reference angle 30, 45 or 60 ---- */
E("u1-exact-values", 1, ["7.20"], 2, "gen", function () {
  var degs = [120, 135, 150, 210, 225, 240, 300, 315, 330, 30, 45, 60];
  var deg = pick(degs), kind = pick(["sin", "cos", "tan"]);
  var kd = "\\" + kind;
  var pres = pick([deg, deg, deg + 360, deg - 360]);
  var ex = u1exact(kind, deg);
  var ref = u1refOf(deg);
  var corr = "\\(" + ex.s + "\\)";
  var others = ["sin", "cos", "tan"].filter(function (k) { return k !== kind; });
  var candBodies = [];
  var e1 = u1exact(kind, ref); if (e1) candBodies.push(e1.s);
  var e2 = u1exact(others[0], deg); if (e2) candBodies.push(e2.s);
  var e3 = u1exact(others[1], deg); if (e3) candBodies.push(e3.s);
  var e4 = u1exact(kind, (deg + 180) % 360); if (e4) candBodies.push(e4.s);
  var e5 = u1exact(kind, (360 - deg) % 360); if (e5) candBodies.push(e5.s);
  candBodies.push(ex.s.charAt(0) === "-" ? ex.s.slice(1) : "-" + ex.s);
  candBodies = candBodies.concat(["\\frac{1}{2}", "-\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "-\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "-\\frac{\\sqrt{3}}{2}", "\\frac{\\sqrt{3}}{3}", "-\\frac{\\sqrt{3}}{3}", "\\sqrt{3}", "-\\sqrt{3}", "1", "-1", "0"]);
  var dis = u1dist3(ex.s, candBodies).map(function (s) { return "\\(" + s + "\\)"; });
  var q = u1quadOf(deg);
  var cotNote = pres === deg ? "" : "The angle " + pres + "° is coterminal with " + deg + "°, so it has the same ratio values. ";
  return mcq("Determine the exact value of \\(" + kd + " " + pres + "^\\circ\\).",
    corr, dis,
    cotNote + "The reference angle for " + deg + "° is " + ref + "°, and the angle terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where \\(" + kd + "\\) is " + (ex.v < 0 ? "negative" : "positive") + ". Since \\(" + kd + " " + ref + "^\\circ = " + (u1exact(kind, ref) || {}).s + "\\), the value is \\[ \\begin{aligned} " + kd + " " + deg + "^\\circ &= " + ex.s + " \\end{aligned} \\] The exact value is <b>" + corr + "</b>.",
    { deg: deg, pres: pres, kind: kind });
});

/* ---- 7.16: which sign statement is true for a given angle ---- */
E("u1-sign-statements", 1, ["7.16"], 1, "gen", function () {
  var q = pick([1, 2, 3, 4]);
  var deg = q === 1 ? ri(8, 82) : q === 2 ? ri(98, 172) : q === 3 ? ri(188, 262) : ri(278, 352);
  var stmts = [
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both positive",
    "\\(\\sin\\theta\\) is positive and \\(\\cos\\theta\\) is negative",
    "\\(\\sin\\theta\\) and \\(\\cos\\theta\\) are both negative",
    "\\(\\sin\\theta\\) is negative and \\(\\cos\\theta\\) is positive"
  ];
  var corr = stmts[q - 1];
  var dis = stmts.filter(function (s) { return s !== corr; });
  var signs = q === 1 ? "both x and y are positive on the terminal arm, so sine and cosine are both positive"
    : q === 2 ? "x is negative and y is positive on the terminal arm, so sine is positive and cosine is negative"
    : q === 3 ? "both x and y are negative on the terminal arm, so sine and cosine are both negative"
    : "x is positive and y is negative on the terminal arm, so sine is negative and cosine is positive";
  return mcq("For \\(\\theta = " + deg + "^\\circ\\), which statement is true?",
    corr, dis,
    "The angle " + deg + "° terminates in Quadrant " + ["I", "II", "III", "IV"][q - 1] + ", where " + signs + ". The true statement is <b>" + corr + "</b>.",
    { deg: deg });
});

/* ---- 7.5: the ambiguous case, how many triangles ---- */
E("u1-ambiguous-case", 1, ["7.5"], 3, "gen", function () {
  var opts = ["No triangle can be drawn", "One triangle can be drawn", "Two triangles can be drawn", "It cannot be determined"];
  var mode = pick(["two", "zero", "oneRight", "oneLong", "obtOne", "obtZero"]);
  var A, b, a, key, expl;
  if (mode === "two" || mode === "zero") {
    A = pick([35, 42, 48, 55, 62]); b = pick([12, 14, 15, 16, 18, 20]);
    var h = b * Math.sin(A * Math.PI / 180);
    a = mode === "two" ? Math.round((h + b) / 2 * 10) / 10 : Math.round(h * 0.75 * 10) / 10;
    key = mode === "two" ? opts[2] : opts[0];
    expl = "The altitude from the third vertex would be \\(h = b \\sin A = " + b + " \\sin " + A + "^\\circ \\approx " + fmt(h, 1) + "\\). Since side a is " + fmt(a, 1) + ", which is " + (mode === "two" ? "greater than h but less than b = " + b : "less than h") + ", " + (mode === "two" ? "the side of length a can swing to meet the base in two positions" : "the side of length a is too short to reach the base at all") + ".";
  } else if (mode === "oneRight") {
    A = 30; b = pick([10, 14, 18, 22]); a = b / 2;
    key = opts[1];
    expl = "The altitude from the third vertex would be \\(h = b \\sin A = " + b + " \\sin 30^\\circ = " + a + "\\). Side a equals h exactly, so the side of length a just reaches the base, forming a single right triangle.";
  } else if (mode === "oneLong") {
    A = pick([40, 50, 60]); b = pick([11, 13, 17]); a = b + ri(2, 7);
    key = opts[1];
    expl = "Side a (" + a + ") is longer than side b (" + b + "). The side of length a can meet the base in only one position on the correct side of the given angle, so only one triangle fits.";
  } else {
    A = pick([100, 110, 120, 130]); b = pick([10, 12, 14, 16, 18]);
    if (mode === "obtOne") { a = b + ri(2, 8); key = opts[1]; expl = "Angle A is obtuse, so side a must be the longest side of the triangle. Since a = " + a + " is greater than b = " + b + ", exactly one triangle fits."; }
    else { a = b - ri(1, 4); key = opts[0]; expl = "Angle A is obtuse, so side a must be the longest side of the triangle. Since a = " + a + " is not greater than b = " + b + ", no triangle fits."; }
  }
  var dis = opts.filter(function (o) { return o !== key; });
  return mcq("In triangle ABC, angle A is " + A + "°, side b is " + b + " cm, and side a is " + fmt(a, 1) + " cm. How many different triangles satisfy these measurements?",
    key, dis,
    expl + " So <b>" + key.charAt(0).toLowerCase() + key.slice(1) + "</b>.",
    { mode: mode, A: A, b: b, a: a });
});

/* ---- 7.3: steps in the proofs of the sine law and cosine law ---- */
E("u1-law-proof-steps", 1, ["7.3"], 3, "var", varset([
  function () {
    return mcq("A proof of the sine law starts by drawing the altitude from vertex C of triangle ABC to side AB. The altitude has length h, with \\(h = b\\sin A\\) from one right triangle and \\(h = a\\sin B\\) from the other. Which step completes the proof of the sine law?",
      "Set the two expressions for h equal, then divide both sides by \\(\\sin A \\sin B\\)",
      ["Add the two expressions for h to get \\(2h = b\\sin A + a\\sin B\\)",
       "Apply the Pythagorean theorem in both right triangles and add the results",
       "Replace h with c in both expressions and simplify the result"],
      "Setting the two expressions for the same altitude equal gives \\(b\\sin A = a\\sin B\\). Dividing both sides by \\(\\sin A \\sin B\\) gives \\(\\frac{b}{\\sin B} = \\frac{a}{\\sin A}\\), which is the sine law. The completing step is: <b>set the two expressions for h equal, then divide both sides by \\(\\sin A \\sin B\\)</b>.",
      { v: 1 });
  },
  function () {
    return mcq("In a proof of the cosine law, the altitude from C divides side AB into segments of length x and \\(c - x\\). The two right triangles give \\(b^2 = h^2 + x^2\\) and \\(a^2 = h^2 + (c - x)^2\\). Which step produces the cosine law from these equations?",
      "Expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(b^2\\), and use \\(x = b\\cos A\\)",
      ["Expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(a^2\\), and use \\(x = b\\sin A\\)",
       "Set the two equations equal to eliminate h, then solve for x in terms of c",
       "Expand \\((c - x)^2\\) and replace h with \\(b\\sin A\\) throughout both equations"],
      "Expanding gives \\(a^2 = h^2 + c^2 - 2cx + x^2 = (h^2 + x^2) + c^2 - 2cx\\). The first equation says \\(h^2 + x^2 = b^2\\), and in the right triangle at A, \\(\\cos A = \\frac{x}{b}\\), so \\(x = b\\cos A\\). Substituting gives \\(a^2 = b^2 + c^2 - 2bc\\cos A\\). The step is: <b>expand \\((c - x)^2\\), replace \\(h^2 + x^2\\) with \\(b^2\\), and use \\(x = b\\cos A\\)</b>.",
      { v: 2 });
  },
  function () {
    return mcq("A second proof of the sine law writes the area of triangle ABC in two ways: \\(\\text{Area} = \\frac{1}{2}bc\\sin A\\) and \\(\\text{Area} = \\frac{1}{2}ac\\sin B\\). Which equality follows directly from setting these equal and dividing both sides by \\(\\frac{1}{2}c\\)?",
      "\\(b\\sin A = a\\sin B\\)",
      ["\\(b\\sin B = a\\sin A\\)", "\\(c\\sin A = a\\sin B\\)", "\\(b\\sin A = c\\sin B\\)"],
      "Setting the two area expressions equal gives \\(\\frac{1}{2}bc\\sin A = \\frac{1}{2}ac\\sin B\\). Dividing both sides by \\(\\frac{1}{2}c\\) removes the common factors and leaves <b>\\(b\\sin A = a\\sin B\\)</b>, which rearranges into the sine law.",
      { v: 3 });
  },
  function () {
    return mcq("A proof of the cosine law for side a ends with \\(a^2 = b^2 + c^2 - 2bc\\cos A\\). Which fact is responsible for the \\(\\cos A\\) in the final term?",
      "The side adjacent to angle A in the right triangle at A has length \\(x = b\\cos A\\)",
      ["The identity \\(\\sin^2 A + \\cos^2 A = 1\\) is used to replace \\(h^2\\) in the final step",
       "The sine law is applied to the altitude to rewrite h in terms of angle A",
       "Angle A is assumed to be acute, so each of its ratios is a positive number"],
      "When \\((c - x)^2\\) is expanded, the term \\(-2cx\\) appears. In the right triangle with hypotenuse b at vertex A, \\(\\cos A = \\frac{x}{b}\\), so \\(x = b\\cos A\\) and \\(-2cx = -2bc\\cos A\\). The fact is: <b>the side adjacent to angle A in the right triangle at A has length \\(x = b\\cos A\\)</b>.",
      { v: 4 });
  }
]));

/* ---- 7.13, 7.21: reflected terminal-arm points; patterns among ratio values ---- */
E("u1-reflection-points", 1, ["7.13", "7.21"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x = ri(2, 9), y = ri(2, 9);
    var target = pick([2, 3, 4]);
    var pts = { 2: "(" + (-x) + ", " + y + ")", 3: "(" + (-x) + ", " + (-y) + ")", 4: "(" + x + ", " + (-y) + ")" };
    var corr = pts[target];
    var others = ["(" + (-x) + ", " + y + ")", "(" + (-x) + ", " + (-y) + ")", "(" + x + ", " + (-y) + ")", "(" + y + ", " + x + ")"];
    var dis = others.filter(function (s) { return s !== corr; });
    var how = target === 2 ? "Quadrant II has the opposite x-sign from Quadrant I, with y unchanged" : target === 3 ? "Quadrant III has both signs opposite to Quadrant I" : "Quadrant IV has the opposite y-sign from Quadrant I, with x unchanged";
    return mcq("The point P(" + x + ", " + y + ") lies on the terminal arm of an angle in standard position. Which point lies on the terminal arm of the angle in Quadrant " + ["I", "II", "III", "IV"][target - 1] + " that has the same reference angle?",
      corr, dis,
      "Angles with the same reference angle have terminal arms that are reflections of one another, so their points have the same coordinate magnitudes with signs set by the quadrant. " + how + ". The point is <b>" + corr + "</b>.",
      { mode: "points", x: x, y: y, target: target });
  }
  var pats = [
    { prompt: "Which statement about the sine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1",
      dis: ["As \\(\\theta\\) increases from \\(0^\\circ\\) to \\(90^\\circ\\), \\(\\sin\\theta\\) decreases from 1 to 0",
            "As \\(\\theta\\) increases from \\(90^\\circ\\) to \\(180^\\circ\\), \\(\\sin\\theta\\) increases from 1 to 2",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to 1"],
      sol: "In Quadrant I, the y-coordinate on the terminal arm grows from 0 to its maximum, so \\(\\sin\\theta\\) increases from 0 to 1. It then falls back through Quadrant II, and it is negative through Quadrants III and IV." },
    { prompt: "Which statement about ratio signs is true?",
      correct: "\\(\\sin\\theta\\) is negative for every angle in Quadrant III",
      dis: ["\\(\\sin\\theta\\) is positive for every angle in Quadrant III",
            "\\(\\tan\\theta\\) is negative for every angle in Quadrant III",
            "\\(\\cos\\theta\\) is positive for every angle in Quadrant III"],
      sol: "In Quadrant III both coordinates on the terminal arm are negative, so sine and cosine are negative while tangent, a ratio of the two, is positive." },
    { prompt: "Which statement about ratio values at axis angles is true?",
      correct: "\\(\\cos\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
      dis: ["\\(\\sin\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)",
            "\\(\\cos\\theta = 0\\) when \\(\\theta = 0^\\circ\\) or \\(\\theta = 180^\\circ\\)",
            "\\(\\tan\\theta = 0\\) when \\(\\theta = 90^\\circ\\) or \\(\\theta = 270^\\circ\\)"],
      sol: "At 90° and 270° the terminal arm is vertical, so the x-coordinate is 0 and \\(\\cos\\theta = \\frac{x}{r} = 0\\). At those angles sine is 1 or -1 and tangent is undefined." },
    { prompt: "Which statement about the tangent ratio is true?",
      correct: "The values of \\(\\tan\\theta\\) are positive in Quadrants I and III",
      dis: ["The values of \\(\\tan\\theta\\) are positive in Quadrants I and II",
            "The values of \\(\\tan\\theta\\) are negative in Quadrants I and III",
            "The values of \\(\\tan\\theta\\) are positive in Quadrants II and IV"],
      sol: "Tangent is \\(\\frac{y}{x}\\), which is positive exactly when x and y have the same sign. That happens in Quadrant I (both positive) and Quadrant III (both negative)." },
    { prompt: "Which statement about the cosine ratio on the interval from 0° to 360° is true?",
      correct: "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) increases from \\(-1\\) to 0",
      dis: ["As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from \\(-1\\) to 0",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\sin\\theta\\) increases from 0 to \\(-1\\)",
            "As \\(\\theta\\) increases from \\(180^\\circ\\) to \\(270^\\circ\\), \\(\\cos\\theta\\) decreases from 0 to \\(-1\\)"],
      sol: "At 180° the terminal arm points along the negative x-axis, so \\(\\cos\\theta = -1\\). Turning toward 270° brings the x-coordinate back up to 0, so cosine increases from -1 to 0." }
  ];
  var p = pick(pats);
  return mcq(p.prompt, p.correct, p.dis, p.sol + " The true statement is <b>" + p.correct + "</b>.", { mode: "pattern" });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u1-pk-label-sides: borrowed verbatim from math-1201 entry u7-label-sides (math-1201:7.1). */
E("u1-pk-label-sides",1,["7.1"],1,"gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var marked=pick([X,Y]),other=(marked===X?Y:X);
  var hyp=u7side(X,Y),oppM=u7side(other,R),adjM=u7side(marked,R);
  var ask=pick(["hyp","opp","adj"]);
  function stmt(side1,role1,side2,role2){return side1+" is "+role1+", and "+side2+" is "+role2;}
  var key,ds,promptCore,solRole;
  if(ask==="hyp"){
    key=stmt(hyp,"the hypotenuse",oppM,"opposite angle "+marked);
    ds=[stmt(adjM,"the hypotenuse",oppM,"opposite angle "+marked),
        stmt(hyp,"the hypotenuse",adjM,"opposite angle "+marked),
        stmt(oppM,"the hypotenuse",hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the <b>hypotenuse</b>";
    solRole="The hypotenuse is the side opposite the right angle at "+R+", so it is <b>\\("+hyp+"\\)</b>.";
  }else if(ask==="opp"){
    key=stmt(oppM,"opposite angle "+marked,adjM,"adjacent to angle "+marked);
    ds=[stmt(adjM,"opposite angle "+marked,oppM,"adjacent to angle "+marked),
        stmt(hyp,"opposite angle "+marked,adjM,"adjacent to angle "+marked),
        stmt(oppM,"opposite angle "+marked,hyp,"adjacent to angle "+marked)];
    promptCore="correctly identifies the side <b>opposite</b> angle "+marked;
    solRole="The side opposite angle "+marked+" does not touch angle "+marked+"; it joins "+other+" and "+R+", so it is <b>\\("+oppM+"\\)</b>. The side adjacent to angle "+marked+" (other than the hypotenuse) is \\("+adjM+"\\).";
  }else{
    key=stmt(adjM,"adjacent to angle "+marked,oppM,"opposite angle "+marked);
    ds=[stmt(oppM,"adjacent to angle "+marked,adjM,"opposite angle "+marked),
        stmt(hyp,"adjacent to angle "+marked,oppM,"opposite angle "+marked),
        stmt(adjM,"adjacent to angle "+marked,hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the side <b>adjacent</b> to angle "+marked;
    solRole="The side adjacent to angle "+marked+" forms that angle together with the hypotenuse; it joins "+marked+" and "+R+", so it is <b>\\("+adjM+"\\)</b>. The side opposite angle "+marked+" is \\("+oppM+"\\).";
  }
  var tri=X+Y+R;
  var prompt=pick([
    "Triangle "+tri+" is a right triangle with the right angle at "+R+". Angle "+marked+" is marked. Which statement "+promptCore+"?",
    "In right triangle "+tri+", the right angle is at "+R+" and angle "+marked+" is marked. Which statement "+promptCore+"?"
  ]);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var q=mcq(prompt,key,ds,
    "In triangle "+tri+" the right angle is at "+R+". "+solRole,
    {stmt:true,keyText:key,X:X,Y:Y,R:R,marked:marked,ask:ask});
  q.figure=triSVG(4,3,5,{L:[X,Y,R],ang:angLab,side:[Y+R,X+R,X+Y]});
  return q;
});

/* u1-pk-ratio-def: borrowed verbatim from math-1201 entry u7-ratio-def (math-1201:7.2). */
E("u1-pk-ratio-def",1,["7.2"],1,"gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,5);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den;
  if(fn==="sin"){num=opp;den=hyp;}else if(fn==="cos"){num=adj;den=hyp;}else{num=opp;den=adj;}
  var key="\\("+u7fracS(num,den)+"\\)";
  var all=[[opp,hyp],[adj,hyp],[opp,adj],[adj,opp],[hyp,opp],[hyp,adj]];
  var cands=[];
  all.forEach(function(pr){var s="\\("+u7fracS(pr[0],pr[1])+"\\)";if(s!==key)cands.push(s);});
  cands=shuffle(cands);
  var ds=u7pickS3(key,cands);
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var prompt="Triangle "+X+Y+R+" is a right triangle with the right angle at "+R+". Side "+X+R+" is \\("+legXR+"\\) "+unit+", side "+Y+R+" is \\("+legYR+"\\) "+unit+", and side "+X+Y+" is \\("+hyp+"\\) "+unit+". What is the value of \\(\\"+fn+" "+ang+"\\)?";
  var q=mcq(prompt,key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+": \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+(u7red(num,den)[1]===1?"":" \\\\ &= "+u7fracS(num,den))+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triSVG(legYR,legXR,hyp,{L:[X,Y,R],side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit]});
  return q;
});

/* u1-pk-ratio-similar: borrowed verbatim from math-1201 entry u7-ratio-similar (math-1201:7.2). */
E("u1-pk-ratio-similar",1,["7.2"],1,"var",varset([
  function(){var key="The triangles are similar, so matching sides stay in proportion, and the opposite side divided by the hypotenuse is the same in both";
    return mcq("Two right triangles each have an acute angle of \\(38^\\circ\\). One triangle is an enlargement of the other. Why is \\(\\sin 38^\\circ\\) the same for both triangles?",
    key,
    ["The triangles are congruent, so matching sides stay equal in length, and the opposite side divided by the hypotenuse is the same in both",
     "The sine ratio uses only the angle in its name, and the side lengths of a triangle play no part at all in the value of the ratio",
     "The larger triangle has longer sides all round, so its ratios grow in step, and the value works out the same by coincidence"],
    "Enlarging a triangle keeps its angles and multiplies every side by the same scale factor, so the triangles are similar. In the ratio for \\(\\sin 38^\\circ\\), the scale factor appears in both the opposite side and the hypotenuse and cancels. The ratio depends on the angle alone: <b>the triangles are similar, so the ratio is the same in both</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Both sides in the ratio are doubled, so the doubling cancels and the value of the tangent ratio stays exactly the same as at first";
    return mcq("Every side of a right triangle is doubled to make a larger triangle. What happens to the value of \\(\\tan A\\) for the matching acute angle \\(A\\)?",
    key,
    ["Only the side opposite the angle is doubled, so the doubling stays in the ratio and the value of the tangent ratio doubles as well",
     "Both sides in the ratio are halved when the triangle grows, so the value of the tangent ratio falls to exactly one half of its value",
     "The tangent ratio compares side lengths with the angle size, so a larger triangle gives a larger value for the tangent ratio overall"],
    "The tangent ratio is opposite divided by adjacent. Doubling the triangle doubles both of those sides, and the factor of \\(2\\) cancels in the fraction: \\[ \\begin{aligned} \\tan A &= \\frac{2 \\times \\text{opposite}}{2 \\times \\text{adjacent}} \\\\ &= \\frac{\\text{opposite}}{\\text{adjacent}} \\end{aligned} \\] The value of the tangent ratio <b>stays exactly the same</b>.",
    {stmt:true,keyText:key});},
  function(){var key="\\(\\cos A\\) is the adjacent side over the hypotenuse, \\(AC\\) over \\(AB\\), because \\(AC\\) forms angle \\(A\\) with the hypotenuse";
    var q=mcq("Triangle \\(ABC\\) has the right angle at \\(C\\). Which statement correctly gives \\(\\cos A\\) and the reason for the sides it uses?",
    key,
    ["\\(\\cos A\\) is the opposite side over the hypotenuse, \\(BC\\) over \\(AB\\), because \\(BC\\) forms angle \\(A\\) with the hypotenuse",
     "\\(\\cos A\\) is the adjacent side over the opposite side, \\(AC\\) over \\(BC\\), because \\(AC\\) forms angle \\(A\\) with the side \\(BC\\)",
     "\\(\\cos A\\) is the hypotenuse over the adjacent side, \\(AB\\) over \\(AC\\), because \\(AB\\) is the longest side of the whole triangle"],
    "By definition, \\(\\cos A = "+FR("\\text{adjacent}","\\text{hypotenuse}")+"\\). For angle \\(A\\), the adjacent side is \\(AC\\), the side that forms angle \\(A\\) with the hypotenuse \\(AB\\). So \\(\\cos A\\) is <b>\\("+FR("AC","AB")+"\\)</b>, the adjacent side over the hypotenuse.",
    {stmt:true,keyText:key});
    q.figure=triSVG(3,4,5,{L:["A","B","C"],ang:["A",null,null],side:["BC","AC","AB"]});
    return q;},
  function(){var key="The hypotenuse grew, but the opposite side grew by the same factor, so their ratio is unchanged and the sine value stays the same";
    return mcq("A student says the sine of an acute angle must be larger in a bigger right triangle because the hypotenuse is longer. Which statement corrects the student?",
    key,
    ["The hypotenuse grew, and the opposite side stayed the same length, so their ratio is smaller and the sine value actually goes down",
     "The hypotenuse is the only side used in the sine ratio, so a longer hypotenuse does give a larger value for the sine of the angle",
     "The sine of an angle is set by the size of the triangle, so the bigger triangle does have the larger sine value for its angles"],
    "Sine is a ratio, opposite divided by hypotenuse, not a length. In a bigger similar triangle both the opposite side and the hypotenuse are multiplied by the same scale factor, which cancels in the ratio. So <b>the sine value stays the same</b>; it depends on the angle, not on the size of the triangle.",
    {stmt:true,keyText:key});},
  function(){var key="Scaling by \\(3\\) multiplies the opposite side and the hypotenuse alike, so their ratio is still \\("+FR(4,5)+"\\), as in the small triangle";
    var q=mcq("In a small right triangle, an acute angle has opposite side \\(4\\) cm and hypotenuse \\(5\\) cm. The triangle is enlarged by a scale factor of \\(3\\). Which statement gives the sine of the matching angle in the large triangle?",
    key,
    ["Scaling by \\(3\\) multiplies the opposite side only, so their ratio becomes \\("+FR(12,5)+"\\), which is larger than the ratio in the small triangle",
     "Scaling by \\(3\\) multiplies the hypotenuse only, so their ratio becomes \\("+FR(4,15)+"\\), which is smaller than the ratio in the small triangle",
     "Scaling by \\(3\\) adds \\(3\\) cm to each side in turn, so their ratio becomes \\("+FR(7,8)+"\\), a value close to the ratio in the small one"],
    "In the large triangle the opposite side is \\(3 \\times 4 = 12\\) cm and the hypotenuse is \\(3 \\times 5 = 15\\) cm: \\[ \\begin{aligned} \\sin &= \\frac{12}{15} \\\\ &= \\frac{4}{5} \\end{aligned} \\] The scale factor cancels, so the sine is <b>\\("+FR(4,5)+"\\)</b>, the same as in the small triangle.",
    {stmt:true,keyText:key});
    q.figure=u7pairSVG();
    return q;}
]));

/* u1-pk-find-angle: borrowed verbatim from math-1201 entry u7-find-angle (math-1201:7.3). */
E("u1-pk-find-angle",1,["7.3"],1,"gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var rt=pick(["sin","cos","tan"]),num,den,sideText,ratioDisp,raw,tries=0;
  do{
    tries++;
    if(rt==="sin"){num=ri(4,30);den=num+ri(3,30);}
    else if(rt==="cos"){num=ri(4,30);den=num+ri(3,30);}
    else{num=ri(4,30);den=ri(4,30);}
    raw=(rt==="sin"?u7asinD(num/den):rt==="cos"?u7acosD(num/den):u7atanD(num/den));
  }while((raw<15||raw>75)&&tries<100);
  var ans=Math.round(raw);
  if(rt==="sin"){sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\sin "+V+" &= "+FR(num,den);}
  else if(rt==="cos"){sideText="the side adjacent to angle "+V+", "+adjName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\cos "+V+" &= "+FR(num,den);}
  else{sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+den+"\\) cm";
    ratioDisp="\\tan "+V+" &= "+FR(num,den);}
  var inv=(rt==="sin"?"\\sin^{-1}":rt==="cos"?"\\cos^{-1}":"\\tan^{-1}");
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+sideText+". Give the measure of angle "+V+", in degrees, to the nearest degree.",
    ans,0.51,
    "Use the ratio that involves the two known sides, then undo it with the inverse ratio: \\[ \\begin{aligned} "+ratioDisp+" \\\\ "+V+" &= "+inv+"\\left("+FR(num,den)+"\\right) \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+V+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {V:V,rt:rt,num:num,den:den,ans:ans});
  var oppV,adjV,hypV;
  if(rt==="sin"){oppV=num;hypV=den;adjV=Math.sqrt(den*den-num*num);}
  else if(rt==="cos"){adjV=num;hypV=den;oppV=Math.sqrt(den*den-num*num);}
  else{oppV=num;adjV=den;hypV=Math.sqrt(num*num+den*den);}
  var sLab=[null,null,null];
  if(rt==="sin"){sLab[V==="A"?0:1]=num+" cm";sLab[2]=den+" cm";}
  else if(rt==="cos"){sLab[V==="A"?1:0]=num+" cm";sLab[2]=den+" cm";}
  else{sLab[V==="A"?0:1]=num+" cm";sLab[V==="A"?1:0]=den+" cm";}
  var aLab=[null,null,null];aLab[V==="A"?0:1]="?";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});

/* u1-pk-find-side: borrowed verbatim from math-1201 entry u7-find-side (math-1201:7.4). */
E("u1-pk-find-side",1,["7.4"],1,"gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES),mode=ri(1,4),given,targetName,givenText,raw,steps;
  if(mode===1){
    given=ri(12,48);targetName=oppName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7sinD(theta);
    steps="\\sin "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===2){
    given=ri(12,48);targetName=adjName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7cosD(theta);
    steps="\\cos "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===3){
    given=ri(8,40);targetName=oppName;theta=pick(U7_ANGLES.filter(function(a){return a>=25&&a<=60;}));
    givenText="the side adjacent to angle "+V+", "+adjName+", is \\("+given+"\\) cm";
    raw=given*u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else{
    given=ri(8,40);targetName=adjName;theta=pick(U7_ANGLES.filter(function(a){return a>=30&&a<=65;}));
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+given+"\\) cm";
    raw=given/u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }
  var ans=u7r1(raw);
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+givenText+". Find the length of side "+targetName+", in centimetres, to the nearest tenth.",
    ans,0.06,
    "Let \\(x\\) be the length of side "+targetName+". The known and unknown sides give this ratio at angle "+V+": \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] The length of side "+targetName+" is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV,adjV,hypV;
  if(mode===1){hypV=given;oppV=given*u7sinD(theta);adjV=given*u7cosD(theta);}
  else if(mode===2){hypV=given;adjV=given*u7cosD(theta);oppV=given*u7sinD(theta);}
  else if(mode===3){adjV=given;oppV=given*u7tanD(theta);hypV=given/u7cosD(theta);}
  else{oppV=given;adjV=given/u7tanD(theta);hypV=given/u7sinD(theta);}
  var oi=(V==="A"?0:1),ai=(V==="A"?1:0);
  var sLab=[null,null,null];
  sLab[(mode<=2)?2:(mode===3?ai:oi)]=given+" cm";
  sLab[(mode===1||mode===3)?oi:ai]="?";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});

/* u1-pk-pythagoras: borrowed verbatim from math-1201 entry u7-pythagoras (math-1201:7.5). */
E("u1-pk-pythagoras",1,["7.14"],1,"gen",function(){
  var ctx=ri(1,11);
  var maxHyp=(ctx===1||ctx===6)?15:((ctx===8||ctx===11)?20:(ctx===3?30:(ctx===7?12:(ctx===2?60:150))));
  var scales=[0.5,1,1.5,2,2.5,3,4,5];
  var t=pick(U7_TRIPLES),k=pick(scales),trC=0;
  while(t[2]*k>maxHyp&&trC<200){t=pick(U7_TRIPLES);k=pick(scales);trC++;}
  var legA=t[0]*k,legB=t[1]*k,hyp=t[2]*k;
  if(pick([true,false])){var swp=legA;legA=legB;legB=swp;}
  var kind,prompt,solSteps,ans,known1,known2;
  if(ctx===1||ctx===6||ctx===8||ctx===11){
    kind="leg";var heightLeg=(ctx===1?legA:legB),otherLeg=(ctx===1?legB:legA);
    ans=otherLeg;known1=hyp;known2=heightLeg;
    if(ctx===1)prompt="A ladder \\("+hyp+"\\) m long leans against a vertical wall. The top of the ladder touches the wall \\("+heightLeg+"\\) m above the ground. How far, in metres, is the foot of the ladder from the wall?";
    else if(ctx===6)prompt="A ladder \\("+hyp+"\\) m long is placed with its foot \\("+heightLeg+"\\) m from the base of a vertical wall. How high, in metres, does the ladder reach up the wall?";
    else if(ctx===8)prompt="A staircase stringer \\("+hyp+"\\) m long rises \\("+heightLeg+"\\) m vertically from floor to landing. How long, in metres, is the horizontal run of the staircase?";
    else prompt="A loading ramp \\("+hyp+"\\) m long rises to a dock \\("+heightLeg+"\\) m above the ground. How far, in metres, does the foot of the ramp sit from the base of the dock?";
    solSteps="\\begin{aligned} x^2 + "+heightLeg+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+heightLeg+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===3){
    kind="leg";ans=legB;known1=hyp;known2=legA;
    prompt="A guy wire \\("+hyp+"\\) m long runs from the top of a vertical pole to a ground anchor. The wire is attached \\("+legA+"\\) m up the pole. How far, in metres, is the anchor from the base of the pole?";
    solSteps="\\begin{aligned} x^2 + "+legA+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+legA+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===2){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular garden plot measures \\("+legA+"\\) m by \\("+legB+"\\) m. How long, in metres, is a path that runs straight from one corner of the plot to the opposite corner?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===4){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular playing field is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A player runs in a straight line from one corner of the field to the diagonally opposite corner. How far, in metres, does the player run?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===9){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular building lot is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A survey line runs straight from one corner of the lot to the opposite corner. How long, in metres, is the survey line?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===10){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular meadow is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A hiker walks in a straight line from one corner of the meadow to the diagonally opposite corner. How far, in metres, does the hiker walk?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===7){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular driveway gate is \\("+legA+"\\) m wide and \\("+legB+"\\) m tall. A brace runs straight from one corner of the gate to the opposite corner. How long, in metres, is the brace?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else{
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A kite string is held so that the kite is directly above a point \\("+legA+"\\) m away from the flyer, at a height of \\("+legB+"\\) m above the flyer's hand. How long, in metres, is the straight section of string from the hand to the kite?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }
  var cands;
  if(kind==="leg")cands=[known1,known2,known1-known2,known1+known2,Math.abs(known2-2),ans+known2];
  else cands=[known1+known2,Math.abs(known1-known2),Math.max(known1,known2),known1+known2-1,Math.max(known1,known2)+1];
  var seenD={},ds=[];
  cands.forEach(function(c){if(ds.length<3&&typeof c==="number"&&isFinite(c)&&c>0&&c!==ans&&!seenD[c]){seenD[c]=1;ds.push(""+c);}});
  var pad=1;while(ds.length<3){var cc=ans+pad+2;pad++;if(!seenD[cc]){seenD[cc]=1;ds.push(""+cc);}}
  var q=mcq(prompt,""+ans,balDp(""+ans,ds),
    "The situation forms a right triangle, so the Pythagorean theorem applies. Let \\(x\\) be the length asked for: \\[ "+solSteps+" \\] The length is <b>\\("+ans+"\\) m</b>.",
    {kind:kind,x:known1,y:known2,ans:ans});
  if(ctx===2||ctx===4||ctx===7||ctx===9||ctx===10){
    q.figure=u7rectDiagSVG(legA,legB);
  }else if(ctx===5){
    q.figure=u7triSceneSVG({vert:legB,ground:legA,slant:hyp,vertLabel:legB+" m",groundLabel:legA+" m",slantLabel:"?",dashedVert:true});
  }else if(ctx===3){
    q.figure=u7triSceneSVG({vert:legA,ground:ans,slant:hyp,vertLabel:legA+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }else if(ctx===6){
    q.figure=u7triSceneSVG({vert:ans,ground:heightLeg,slant:hyp,vertLabel:"?",groundLabel:heightLeg+" m",slantLabel:hyp+" m"});
  }else{
    q.figure=u7triSceneSVG({vert:heightLeg,ground:ans,slant:hyp,vertLabel:heightLeg+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }
  return q;
});

/* u1-pk-grid-distance: borrowed verbatim from math-8 entry u1-grid-distance-gap (math-8:9.12). */
E("u1-pk-grid-distance",1,["7.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]);
  var kk=ri(1,2); var dx=base[0]*kk, dy=base[1]*kk, c=base[2]*kk;
  var x1=ri(0,4), y1=ri(0,4), x2=x1+dx, y2=y1+dy;
  var q=numq("On a grid map, a library stands at ("+x1+", "+y1+") and a skating rink stands at ("+x2+", "+y2+"). Each grid square represents 1 km. What is the straight-line distance between the library and the rink, in kilometres?", c, 0.01,
    "The two points give the legs of a right triangle: the horizontal change is "+x2+" - "+x1+" = "+dx+" and the vertical change is "+y2+" - "+y1+" = "+dy+". Then: \\[ \\begin{aligned} d^{2} &= "+dx+"^{2} + "+dy+"^{2} \\\\ &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" km</b>.",
    {mode:"grid-distance", x1:x1, y1:y1, x2:x2, y2:y2}); q.figure=m8GridDistSVG(x1,y1,x2,y2); return q;
}, ["Subtract the coordinates to find the two legs before using the theorem.", "Find the horizontal change and the vertical change first, then square and add them."]);

/* u1-pk-solve-triangle: borrowed verbatim from math-1201 entry u7-solve-triangle (math-1201:7.6). */
E("u1-pk-solve-triangle",1,["7.2"],2,"gen",function(){
  var fam=ri(1,4),facts,tasks=[];
  var P={fam:fam};
  if(fam===1){
    var H=ri(14,50),theta=pick(U7_ANGLES);P.H=H;P.theta=theta;
    facts="the hypotenuse AB is \\("+H+"\\) cm and angle A is \\("+theta+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-theta,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+theta+"^\\circ \\\\ &= "+(90-theta)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-theta)+"^\\circ\\)</b>."},
      {f:"hSin",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(H*u7sinD(theta)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine with the hypotenuse: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR("BC",""+H)+" \\\\ BC &= "+H+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7sinD(theta))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(H*u7sinD(theta))+"\\) cm</b>."},
      {f:"hCos",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(H*u7cosD(theta)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine with the hypotenuse: \\[ \\begin{aligned} \\cos "+theta+"^\\circ &= "+FR("AC",""+H)+" \\\\ AC &= "+H+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7cosD(theta))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(H*u7cosD(theta))+"\\) cm</b>."}
    ];
  }else if(fam===2){
    var G2=ri(10,42),th2=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G2;P.theta=th2;
    facts="side AC, adjacent to angle A, is \\("+G2+"\\) cm and angle A is \\("+th2+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th2,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th2+"^\\circ \\\\ &= "+(90-th2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th2)+"^\\circ\\)</b>."},
      {f:"aTan",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(G2*u7tanD(th2)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent: \\[ \\begin{aligned} \\tan "+th2+"^\\circ &= "+FR("BC",""+G2)+" \\\\ BC &= "+G2+" \\times \\tan "+th2+"^\\circ \\\\ &\\approx "+u7f1(G2*u7tanD(th2))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(G2*u7tanD(th2))+"\\) cm</b>."},
      {f:"aHypCos",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G2/u7cosD(th2)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\cos "+th2+"^\\circ &= "+FR(G2,"AB")+" \\\\ AB &= "+FR(G2,"\\cos "+th2+"^\\circ")+" \\\\ &\\approx "+u7f1(G2/u7cosD(th2))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G2/u7cosD(th2))+"\\) cm</b>."}
    ];
  }else if(fam===3){
    var G3=ri(10,42),th3=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G3;P.theta=th3;
    facts="side BC, opposite angle A, is \\("+G3+"\\) cm and angle A is \\("+th3+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th3,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th3+"^\\circ \\\\ &= "+(90-th3)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th3)+"^\\circ\\)</b>."},
      {f:"oAdjTan",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(G3/u7tanD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent and rearrange: \\[ \\begin{aligned} \\tan "+th3+"^\\circ &= "+FR(G3,"AC")+" \\\\ AC &= "+FR(G3,"\\tan "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7tanD(th3))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(G3/u7tanD(th3))+"\\) cm</b>."},
      {f:"oHypSin",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G3/u7sinD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\sin "+th3+"^\\circ &= "+FR(G3,"AB")+" \\\\ AB &= "+FR(G3,"\\sin "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7sinD(th3))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G3/u7sinD(th3))+"\\) cm</b>."}
    ];
  }else{
    var t=pick(U7_TRIPLES),k=ri(1,4),aL=t[0]*k,bL=t[1]*k,cL=t[2]*k;
    var sub=pick(["legs","hypLeg"]);P.a=aL;P.b=bL;P.c=cL;P.sub=sub;
    if(sub==="legs"){
      facts="side BC is \\("+aL+"\\) cm and side AC is \\("+bL+"\\) cm";
      var angA=u7atanD(aL/bL);
      tasks=[
        {f:"pythHyp",ask:"the length of the hypotenuse AB, in centimetres",ans:cL,tol:0.001,
         sol:"Use the Pythagorean theorem with the two legs: \\[ \\begin{aligned} AB^2 &= "+aL+"^2 + "+bL+"^2 \\\\ AB^2 &= "+(cL*cL)+" \\\\ AB &= "+cL+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+cL+"\\) cm</b>."},
        {f:"invTanA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA),tol:0.51,
         sol:"Side BC is opposite angle A and side AC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan A &= "+FR(aL,bL)+" \\\\ A &= \\tan^{-1}\\left("+FR(aL,bL)+"\\right) \\\\ &\\approx "+Math.round(angA)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA)+"^\\circ\\)</b>."},
        {f:"invTanB",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA),tol:0.51,
         sol:"Side AC is opposite angle B and side BC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan B &= "+FR(bL,aL)+" \\\\ B &= \\tan^{-1}\\left("+FR(bL,aL)+"\\right) \\\\ &\\approx "+Math.round(90-angA)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA)+"^\\circ\\)</b>."}
      ];
    }else{
      facts="the hypotenuse AB is \\("+cL+"\\) cm and side BC is \\("+aL+"\\) cm";
      var angA2=u7asinD(aL/cL);
      tasks=[
        {f:"pythLeg",ask:"the length of side AC, in centimetres",ans:bL,tol:0.001,
         sol:"Use the Pythagorean theorem and rearrange for the missing leg: \\[ \\begin{aligned} AC^2 &= "+cL+"^2 - "+aL+"^2 \\\\ AC^2 &= "+(bL*bL)+" \\\\ AC &= "+bL+" \\end{aligned} \\] The length of side AC is <b>\\("+bL+"\\) cm</b>."},
        {f:"invSinA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA2),tol:0.51,
         sol:"Side BC is opposite angle A and AB is the hypotenuse, so use inverse sine: \\[ \\begin{aligned} \\sin A &= "+FR(aL,cL)+" \\\\ A &= \\sin^{-1}\\left("+FR(aL,cL)+"\\right) \\\\ &\\approx "+Math.round(angA2)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA2)+"^\\circ\\)</b>."},
        {f:"compFromA",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA2),tol:0.51,
         sol:"First find angle A with inverse sine, since BC is opposite A: \\(A \\approx "+u7f1(angA2)+"^\\circ\\). The acute angles add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+u7f1(angA2)+"^\\circ \\\\ &\\approx "+Math.round(90-angA2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA2)+"^\\circ\\)</b>."}
      ];
    }
  }
  var task=pick(tasks);P.f=task.f;
  var fig;
  if(fam===1){
    var sL1=[null,null,H+" cm"],aL1=[theta+"°",null,null];
    if(task.f==="comp")aL1[1]="?";else if(task.f==="hSin")sL1[0]="?";else sL1[1]="?";
    fig=triSVG(H*u7sinD(theta),H*u7cosD(theta),H,{L:["A","B","C"],side:sL1,ang:aL1});
  }else if(fam===2){
    var sL2=[null,G2+" cm",null],aL2=[th2+"°",null,null];
    if(task.f==="comp")aL2[1]="?";else if(task.f==="aTan")sL2[0]="?";else sL2[2]="?";
    fig=triSVG(G2*u7tanD(th2),G2,G2/u7cosD(th2),{L:["A","B","C"],side:sL2,ang:aL2});
  }else if(fam===3){
    var sL3=[G3+" cm",null,null],aL3=[th3+"°",null,null];
    if(task.f==="comp")aL3[1]="?";else if(task.f==="oAdjTan")sL3[1]="?";else sL3[2]="?";
    fig=triSVG(G3,G3/u7tanD(th3),G3/u7sinD(th3),{L:["A","B","C"],side:sL3,ang:aL3});
  }else if(sub==="legs"){
    var sL4=[aL+" cm",bL+" cm",null],aL4=[null,null,null];
    if(task.f==="pythHyp")sL4[2]="?";else if(task.f==="invTanA")aL4[0]="?";else aL4[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL4,ang:aL4});
  }else{
    var sL5=[aL+" cm",null,cL+" cm"],aL5=[null,null,null];
    if(task.f==="pythLeg")sL5[1]="?";else if(task.f==="invSinA")aL5[0]="?";else aL5[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL5,ang:aL5});
  }
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+facts+". Find "+task.ask+".",
    task.ans,task.tol,task.sol,P);
  q.figure=fig;
  return q;
});

/* u1-pk-rope-angle: borrowed verbatim from math-1201 entry u7-rope-angle (math-1201:7.3). */
E("u1-pk-rope-angle",1,["7.22"],2,"var",varset([
  function(){return u7slantAngle("rope");},
  function(){return u7slantAngle("slide");},
  function(){return u7slantAngle("zip");},
  function(){return u7slantAngle("kite");}
]));

/* u1-pk-ramp-run: borrowed verbatim from math-1201 entry u7-ramp-run (math-1201:7.4). */
E("u1-pk-ramp-run",1,["7.22"],2,"var",varset([
  function(){return u7riseRun("dock");},
  function(){return u7riseRun("belt");},
  function(){return u7riseRun("escalator");}
]));

/* PK tranche pass for Unit 1. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U1_FOR=["7.1","7.2","7.3","7.4","7.5","7.6","7.7","7.8","7.9","7.10","7.11","7.12","7.13","7.14","7.15","7.16","7.17","7.18","7.19","7.20","7.21","7.22"];
var PKT_U1={
 "u1-pk-label-sides":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-def":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-similar":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-angle":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-find-side":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-pythagoras":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-grid-distance":{src:"math-8:9.12",group:"pythagoras"},
 "u1-pk-solve-triangle":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-rope-angle":{src:"math-1201:7.3",group:"trig-context"},
 "u1-pk-ramp-run":{src:"math-1201:7.4",group:"trig-context"}
};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});
