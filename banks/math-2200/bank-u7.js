// Math 2200 Unit 7 Systems of Equations question bank
// CRMARKS: u7-classify-algebraic=2
// CRMARKS: u7-context-area=2
// CRMARKS: u7-context-projectile=3
// CRMARKS: u7-graph-count=1
// CRMARKS: u7-graph-solutions=2
// CRMARKS: u7-intersection-meaning=1
// CRMARKS: u7-model-two-numbers=3
// CRMARKS: u7-solve-linquad=2
// CRMARKS: u7-solve-quadquad=2
// CRMARKS: u7-tangent-param=4
/* ================= Unit 7: Systems of Equations ================= */
/* ================= Unit 7: Systems of Equations (MA2200.4.48 to 4.54) =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u7; entries register through E(...).
   11 entries: L1 2, L2 7, L3 2. Every system is built from chosen integer
   intersection points, so every solution is exact and hand-solvable.
   Codes: 4.48 meaning of intersection points; 4.49 number of solutions;
   4.50 solve graphically; 4.51 solve algebraically; 4.52 model a situation;
   4.53 relate the system to its context; 4.54 solve and explain strategy. */

/* ---------- u7 helpers ---------- */
function u7gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u7fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u7gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}
function u7Std(a, b, c) { /* ax^2 + bx + c as a KaTeX body */
  var s = (a === 1 ? "x^2" : a === -1 ? "-x^2" : a + "x^2");
  if (b !== 0) s += (b > 0 ? " + " : " - ") + (Math.abs(b) === 1 ? "x" : Math.abs(b) + "x");
  if (c !== 0) s += (c > 0 ? " + " : " - ") + Math.abs(c);
  return s;
}
function u7Lin(m, b) { /* mx + b as a KaTeX body */
  var s = "";
  if (m === 1) s = "x"; else if (m === -1) s = "-x"; else if (m !== 0) s = m + "x";
  if (b !== 0) { if (s === "") s = "" + b; else s += (b > 0 ? " + " + b : " - " + (-b)); }
  if (s === "") s = "0";
  return s;
}
function u7Pt(x, y) { return "(" + x + ", " + y + ")"; }
function u7PairStr(p1, p2) { return "\\(" + u7Pt(p1[0], p1[1]) + "\\) and \\(" + u7Pt(p2[0], p2[1]) + "\\)"; }
function u7Fac(v, vn) { /* (x - v) or (x + |v|) factor text */ return "(" + vn + (v < 0 ? " + " + (-v) : " - " + v) + ")"; }
function u7dist3(correct, cands) { /* first three candidate strings differing from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u7Plot(f, g, pts, x0, x1) { /* two curves on fitted axes, intersection points marked */
  var W = 440, H = 250, pad = 26, i, x, y, mn = 1e18, mx = -1e18;
  for (i = 0; i <= 200; i++) { x = x0 + (x1 - x0) * i / 200; [f, g].forEach(function (fn) { y = fn(x); if (isFinite(y)) { if (y < mn) mn = y; if (y > mx) mx = y; } }); }
  pts.forEach(function (p) { if (p[1] < mn) mn = p[1]; if (p[1] > mx) mx = p[1]; });
  var y1 = Math.min(120, Math.max(10, Math.ceil(mx * 1.3))), y0 = Math.max(-120, Math.min(-10, Math.floor(mn * 1.3)));
  if (mn >= 0) y0 = -2; if (mx <= 0) y1 = 2;
  var X = function (v) { return pad + (v - x0) / (x1 - x0) * (W - 2 * pad); };
  var Y = function (v) { return H - pad - (v - y0) / (y1 - y0) * (H - 2 * pad); };
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy = (y1 - y0 > 90) ? 20 : ((y1 - y0 > 45) ? 10 : ((y1 - y0 > 22) ? 5 : 2)), gx, gyv;
  for (gx = Math.ceil(x0); gx <= x1; gx += 1) { out += '<line x1="' + fmt(X(gx), 1) + '" y1="' + pad + '" x2="' + fmt(X(gx), 1) + '" y2="' + (H - pad) + '" stroke="#eae5d6" stroke-width="1"/>'; out += '<text x="' + fmt(X(gx), 1) + '" y="' + (H - 6) + '" font-size="9" fill="#5a5344" text-anchor="middle">' + gx + '</text>'; }
  for (gyv = Math.ceil(y0 / gy) * gy; gyv <= y1; gyv += gy) { out += '<line x1="' + pad + '" y1="' + fmt(Y(gyv), 1) + '" x2="' + (W - pad) + '" y2="' + fmt(Y(gyv), 1) + '" stroke="#eae5d6" stroke-width="1"/>'; if (gyv !== 0) out += '<text x="' + (pad - 4) + '" y="' + fmt(Y(gyv) + 3, 1) + '" font-size="9" fill="#5a5344" text-anchor="end">' + gyv + '</text>'; }
  if (y0 < 0 && y1 > 0) out += '<line x1="' + pad + '" y1="' + fmt(Y(0), 1) + '" x2="' + (W - pad) + '" y2="' + fmt(Y(0), 1) + '" stroke="#17352a" stroke-width="1.3"/>';
  if (x0 < 0 && x1 > 0) out += '<line x1="' + fmt(X(0), 1) + '" y1="' + pad + '" x2="' + fmt(X(0), 1) + '" y2="' + (H - pad) + '" stroke="#17352a" stroke-width="1.3"/>';
  out += '<text x="' + (W - pad - 2) + '" y="' + fmt(Y(0) - 6, 1) + '" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out += '<text x="' + fmt(X(0) + 6, 1) + '" y="' + (pad - 8) + '" font-size="12" fill="#17352a">y</text>';
  [ { fn: f, col: "#0f766e" }, { fn: g, col: "#b3541e" } ].forEach(function (cv) {
    var ptsArr = [], N = 160;
    for (i = 0; i <= N; i++) { x = x0 + (x1 - x0) * i / N; y = cv.fn(x); if (y < y0) y = y0; if (y > y1) y = y1; ptsArr.push(fmt(X(x), 1) + "," + fmt(Y(y), 1)); }
    out += '<polyline points="' + ptsArr.join(" ") + '" fill="none" stroke="' + cv.col + '" stroke-width="2.2"/>';
  });
  pts.forEach(function (p) { out += '<circle cx="' + fmt(X(p[0]), 1) + '" cy="' + fmt(Y(p[1]), 1) + '" r="4" fill="#17352a" stroke="#ffffff" stroke-width="1.4"/>'; });
  return out + '</svg>';
}
/* Builders: every system is assembled from chosen intersection points, so the
   coefficients are integers and the solutions are exact. quad is [a, b, c]. */
function u7makeLQ2() { /* linear-quadratic, two intersections */
  var a = pick([1, 1, -1]), r1 = ri(-6, 3), r2 = r1 + ri(2, 5);
  if (r2 > 6) r2 = 6;
  var m = ri(-3, 3), b = ri(-6, 6);
  var quad = [a, m - a * (r1 + r2), a * r1 * r2 + b];
  return { quad: quad, m: m, b: b, roots: [r1, r2], pts: [[r1, m * r1 + b], [r2, m * r2 + b]] };
}
function u7makeLQ1() { /* linear-quadratic, tangent (one intersection) */
  var a = pick([1, -1]), r = ri(-5, 5), m = ri(-3, 3), b = ri(-6, 6);
  var quad = [a, m - 2 * a * r, a * r * r + b];
  return { quad: quad, m: m, b: b, roots: [r, r], pts: [[r, m * r + b]] };
}
function u7makeLQ0() { /* linear-quadratic, no intersection: parabola offset from the line */
  var a = pick([1, -1]), h = ri(-3, 3), k = ri(2, 5), m = ri(-3, 3), b = ri(-6, 6);
  var quad = a === 1 ? [1, m - 2 * h, b + h * h + k] : [-1, m + 2 * h, b - h * h - k];
  return { quad: quad, m: m, b: b, roots: [], pts: [] };
}
function u7makeQQ2() { /* quadratic-quadratic, two intersections, moderate heights */
  for (var att = 0; att < 60; att++) {
    var a2 = pick([1, -1]), a1 = a2 + pick([1, -1, 2, -2]);
    if (a1 === 0) a1 = 2;
    var r1 = ri(-5, 2), r2 = r1 + ri(2, 5);
    if (r2 > 5) r2 = 5;
    var b2 = ri(-5, 5), c2 = ri(-7, 7), D = a1 - a2;
    var q2 = [a2, b2, c2], q1 = [a1, b2 - D * (r1 + r2), c2 + D * r1 * r2];
    var yA = q2[0] * r1 * r1 + q2[1] * r1 + q2[2], yB = q2[0] * r2 * r2 + q2[1] * r2 + q2[2];
    if (Math.abs(yA) <= 60 && Math.abs(yB) <= 60) return { q1: q1, q2: q2, roots: [r1, r2], pts: [[r1, yA], [r2, yB]] };
  }
  return { q1: [1, 0, 0], q2: [-1, 0, 8], roots: [-2, 2], pts: [[-2, 4], [2, 4]] };
}

function u7wrongPts(solves, yOn, roots, n) { /* points on one curve (via yOn) that are NOT solutions */
  var out = [], xs = [roots[0] - 1, roots[0] + 1, roots[1] - 1, roots[1] + 1, -roots[0], -roots[1], roots[0] + 2, roots[1] - 2, 0, 1, -1, 2, -2];
  for (var i = 0; i < xs.length && out.length < n; i++) {
    var p = [xs[i], yOn(xs[i])];
    if (!solves(p[0], p[1]) && Math.abs(p[0]) <= 9 && Math.abs(p[1]) <= 80 && !out.some(function (w) { return w[0] === p[0] && w[1] === p[1]; })) out.push(p);
  }
  return out;
}

/* ---------- 4.50, 4.48: read the solutions of a system from its graph (L2) ---------- */
E("u7-graph-solutions", 7, ["4.50", "4.48"], 1, "gen", function () {
  var S = u7makeLQ2(), q = S.quad;
  var f = function (x) { return q[0] * x * x + q[1] * x + q[2]; }, g = function (x) { return S.m * x + S.b; };
  function solves(x, y) { return f(x) === y && g(x) === y; }
  var W = u7wrongPts(solves, function (x) { return S.m * x + S.b; }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [
    u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]]),
    u7PairStr([S.roots[0], -S.pts[0][1]], [S.roots[1], -S.pts[1][1]])
  ].filter(function (c) { return c !== key; });
  var qq = mcq("The graph shows the system \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\). What are the solutions of the system?",
    key, u7dist3(key, cands),
    "The solutions of a system are the points that lie on both graphs: the intersection points. Reading the marked points from the graph, the curves meet at \\(" + u7Pt(S.pts[0][0], S.pts[0][1]) + "\\) and \\(" + u7Pt(S.pts[1][0], S.pts[1][1]) + "\\). Checking in the line: \\(" + S.m + "(" + S.roots[0] + ") + (" + S.b + ") = " + S.pts[0][1] + "\\) and \\(" + S.m + "(" + S.roots[1] + ") + (" + S.b + ") = " + S.pts[1][1] + "\\), and each point also satisfies the quadratic. The solutions are <b>" + key + "</b>.",
    { quad: q, m: S.m, b: S.b, pts: S.pts });
  qq.figure = u7Plot(f, g, S.pts, Math.max(-9, S.roots[0] - 3), Math.min(9, S.roots[1] + 3));
  return qq;
});

/* ---------- 4.49, 4.50: count the solutions from a graph (L1) ---------- */
E("u7-graph-count", 7, ["4.49", "4.50"], 1, "gen", function () {
  var mode = pick(["lq2", "lq1", "lq0", "qq2", "qq0"]);
  var f, g, pts = [], eqText, cnt, S, Q;
  if (mode === "lq2" || mode === "lq1" || mode === "lq0") {
    S = mode === "lq2" ? u7makeLQ2() : mode === "lq1" ? u7makeLQ1() : u7makeLQ0();
    f = function (x) { return S.quad[0] * x * x + S.quad[1] * x + S.quad[2]; };
    g = function (x) { return S.m * x + S.b; };
    pts = S.pts; cnt = mode === "lq2" ? 2 : mode === "lq1" ? 1 : 0;
    eqText = "\\(y = " + u7Std(S.quad[0], S.quad[1], S.quad[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\)";
  } else {
    Q = u7makeQQ2();
    if (mode === "qq0") { /* rebuild q1 so the difference of the parabolas is never zero */
      var sgn = Q.q2[0] > 0 ? 1 : -1, hh = ri(-3, 3), kk2 = ri(2, 5);
      Q.q1 = [Q.q2[0] + sgn, Q.q2[1] - sgn * 2 * hh, Q.q2[2] + sgn * (hh * hh + kk2)];
      pts = []; cnt = 0;
    }
    else { pts = Q.pts; cnt = 2; }
    f = function (x) { return Q.q1[0] * x * x + Q.q1[1] * x + Q.q1[2]; };
    g = function (x) { return Q.q2[0] * x * x + Q.q2[1] * x + Q.q2[2]; };
    eqText = "\\(y = " + u7Std(Q.q1[0], Q.q1[1], Q.q1[2]) + "\\) and \\(y = " + u7Std(Q.q2[0], Q.q2[1], Q.q2[2]) + "\\)";
  }
  var words = { 0: "No solutions", 1: "One solution", 2: "Two solutions" };
  var key = words[cnt];
  var dis = ["No solutions", "One solution", "Two solutions", "Infinitely many solutions"].filter(function (w) { return w !== key; });
  var why = cnt === 2 ? "The two graphs cross at two marked points, and each crossing point is one solution of the system."
    : cnt === 1 ? "The line just touches the parabola at one marked point, so that single point is the only solution of the system."
    : "The two graphs never meet, so no point can satisfy both equations at once.";
  var qq = mcq("The graph shows the system " + eqText + ". How many solutions does the system have?",
    key, dis,
    why + " The system has <b>" + key.toLowerCase() + "</b>.",
    { mode: mode, cnt: cnt, quad: S ? S.quad : Q.q1, quad2: S ? null : Q.q2, m: S ? S.m : null, b: S ? S.b : null });
  qq.figure = u7Plot(f, g, pts, -7, 7);
  return qq;
});

/* ---------- 4.48: what an intersection point means (L1) ---------- */
E("u7-intersection-meaning", 7, ["4.48"], 1, "gen", function () {
  var S = u7makeLQ2(), q = S.quad, P1 = S.pts[0], P2 = S.pts[1];
  var sysText = "The graphs of \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\) intersect at \\(" + u7Pt(P1[0], P1[1]) + "\\) and \\(" + u7Pt(P2[0], P2[1]) + "\\). ";
  if (Math.random() < 0.5) {
    var key = "A pair of values that satisfies both equations together";
    var dis = ["The turning point of the parabola, where it changes direction",
      "The point where the two graphs cross the vertical axis",
      "The greatest value that either function can take"];
    return mcq(sysText + "What does an intersection point of the two graphs represent?",
      key, dis,
      "An intersection point lies on both graphs, so its coordinates make both equations true at the same time. It represents <b>a pair of values that satisfies both equations together</b>. It is not a vertex, a y-intercept, or an extreme value of either function on its own.",
      { tpl: 1, quad: q, m: S.m, b: S.b, pts: S.pts });
  }
  var r = P1[0], yv = P1[1];
  var xv = -q[1] / (2 * q[0]);
  var cands = [
    { t: "When \\(x = " + yv + "\\), both of the equations give the value \\(y = " + r + "\\)", ok: false },
    { t: "\\(x = " + r + "\\) is the only value that satisfies both equations", ok: false },
    { t: "The parabola has its vertex at the point \\(" + u7Pt(r, yv) + "\\)", ok: xv === r && q[0] * r * r + q[1] * r + q[2] === yv },
    { t: "Both graphs cross the horizontal axis at the point \\(" + u7Pt(r, yv) + "\\)", ok: yv === 0 }
  ,
    { t: "Substituting \\(x = " + P2[0] + "\\) gives two different values of \\(y\\)", ok: false },
    { t: "The point \\(" + u7Pt(r, yv) + "\\) lies on the parabola but not on the line", ok: false }];
  var dis2 = cands.filter(function (c) { return !c.ok; }).map(function (c) { return c.t; });
  var key2 = "At \\(x = " + r + "\\), the two equations have the same value, \\(y = " + yv + "\\)";
  return mcq(sysText + "What does the point \\(" + u7Pt(r, yv) + "\\) tell you?",
    key2, u7dist3(key2, dis2),
    "The point \\(" + u7Pt(r, yv) + "\\) lies on both graphs. Substituting \\(x = " + r + "\\) into the line gives \\(y = " + S.m + "(" + r + ") + (" + S.b + ") = " + yv + "\\), and into the quadratic gives the same value, so at \\(x = " + r + "\\) the two equations agree. The point tells you: <b>at \\(x = " + r + "\\), the two equations have the same value, \\(y = " + yv + "\\)</b>.",
    { tpl: 2, quad: q, m: S.m, b: S.b, pts: S.pts });
});

/* ---------- 4.51: solve a linear-quadratic system algebraically (L2) ---------- */
E("u7-solve-linquad", 7, ["4.51"], 2, "gen", function () {
  var S = u7makeLQ2(), q = S.quad;
  function solves(x, y) { return q[0] * x * x + q[1] * x + q[2] === y && S.m * x + S.b === y; }
  var W = u7wrongPts(solves, function (x) { return S.m * x + S.b; }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]])];
  var dA = q[0], dB = q[1] - S.m, dC = q[2] - S.b;
  var diff = u7Std(dA, dB, dC);
  var sol = "Both equations give \\(y\\), so set them equal and solve: \\[ \\begin{aligned} " + u7Std(q[0], q[1], q[2]) + " &= " + u7Lin(S.m, S.b) + " \\\\ " + diff + " &= 0 \\\\ " + (dA < 0 ? "-" : "") + u7Fac(S.roots[0], "x") + u7Fac(S.roots[1], "x") + " &= 0 \\end{aligned} \\] So \\(x = " + S.roots[0] + "\\) or \\(x = " + S.roots[1] + "\\). Substituting into the line, \\(y = " + S.m + "(" + S.roots[0] + ") + (" + S.b + ") = " + S.pts[0][1] + "\\) and \\(y = " + S.m + "(" + S.roots[1] + ") + (" + S.b + ") = " + S.pts[1][1] + "\\). Each point checks in the quadratic as well. The solutions are <b>" + key + "</b>.";
  return mcq("Solve the system \\(y = " + u7Std(q[0], q[1], q[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\) algebraically.",
    key, u7dist3(key, cands), sol,
    { quad: q, m: S.m, b: S.b, pts: S.pts });
});

/* ---------- 4.51: solve a quadratic-quadratic system algebraically (L2) ---------- */
E("u7-solve-quadquad", 7, ["4.51"], 2, "gen", function () {
  var S = u7makeQQ2(), q1 = S.q1, q2 = S.q2;
  function yAt(q, x) { return q[0] * x * x + q[1] * x + q[2]; }
  function solves(x, y) { return yAt(q1, x) === y && yAt(q2, x) === y; }
  var W = u7wrongPts(solves, function (x) { return yAt(q2, x); }, S.roots, 4);
  var key = u7PairStr(S.pts[0], S.pts[1]);
  var cands = [u7PairStr(S.pts[0], W[0]), u7PairStr(W[1], S.pts[1]), u7PairStr(W[0], W[1]),
    u7PairStr([S.pts[0][1], S.pts[0][0]], [S.pts[1][1], S.pts[1][0]])];
  var dA = q1[0] - q2[0], dB = q1[1] - q2[1], dC = q1[2] - q2[2];
  var sol = "Set the two expressions for \\(y\\) equal and collect terms: \\[ \\begin{aligned} " + u7Std(q1[0], q1[1], q1[2]) + " &= " + u7Std(q2[0], q2[1], q2[2]) + " \\\\ " + u7Std(dA, dB, dC) + " &= 0 \\end{aligned} \\] Factoring, the equation gives \\(x = " + S.roots[0] + "\\) or \\(x = " + S.roots[1] + "\\). Substituting into the second quadratic, \\(y = " + yAt(q2, S.roots[0]) + "\\) when \\(x = " + S.roots[0] + "\\) and \\(y = " + yAt(q2, S.roots[1]) + "\\) when \\(x = " + S.roots[1] + "\\); both points also check in the first quadratic. The solutions are <b>" + key + "</b>.";
  return mcq("Solve the system \\(y = " + u7Std(q1[0], q1[1], q1[2]) + "\\) and \\(y = " + u7Std(q2[0], q2[1], q2[2]) + "\\) algebraically.",
    key, u7dist3(key, cands), sol,
    { q1: q1, q2: q2, pts: S.pts });
});

/* ---------- 4.49, 4.51: classify the number of solutions algebraically (L2) ---------- */
E("u7-classify-algebraic", 7, ["4.49", "4.51"], 2, "gen", function () {
  var mode = pick(["lq2", "lq1", "lq0", "qq2", "qqSameA", "qqIdentical"]);
  var eqText, cnt, dA, dB, dC, note, P;
  if (mode === "lq2" || mode === "lq1" || mode === "lq0") {
    var S = mode === "lq2" ? u7makeLQ2() : mode === "lq1" ? u7makeLQ1() : u7makeLQ0();
    eqText = "\\(y = " + u7Std(S.quad[0], S.quad[1], S.quad[2]) + "\\) and \\(y = " + u7Lin(S.m, S.b) + "\\)";
    dA = S.quad[0]; dB = S.quad[1] - S.m; dC = S.quad[2] - S.b;
    cnt = mode === "lq2" ? 2 : mode === "lq1" ? 1 : 0;
    P = { dA: dA, dB: dB, dC: dC, identical: false };
    note = "Setting the expressions equal gives the single quadratic \\(" + u7Std(dA, dB, dC) + " = 0\\).";
  } else if (mode === "qqIdentical") {
    var hp = ri(-4, 4), kq = ri(-5, 6);
    var B = -2 * hp, C = hp * hp + kq;
    eqText = "\\(y = (x " + (hp > 0 ? "- " + hp : hp < 0 ? "+ " + (-hp) : "") + ")^2 " + (kq > 0 ? "+ " + kq : kq < 0 ? "- " + (-kq) : "") + "\\) and \\(y = " + u7Std(1, B, C) + "\\)";
    cnt = -1; dA = 0; dB = 0; dC = 0;
    P = { dA: 0, dB: 0, dC: 0, identical: true };
    note = "Expanding the vertex form gives \\(y = " + u7Std(1, B, C) + "\\), which is exactly the second equation.";
  } else {
    var Q = u7makeQQ2();
    if (mode === "qqSameA") { /* force equal leading coefficients: difference is linear */
      Q.q1 = [Q.q2[0], Q.q1[1], Q.q1[2]];
      if (Q.q1[1] === Q.q2[1]) Q.q1[1] += 2;
      cnt = 1;
    } else cnt = 2;
    eqText = "\\(y = " + u7Std(Q.q1[0], Q.q1[1], Q.q1[2]) + "\\) and \\(y = " + u7Std(Q.q2[0], Q.q2[1], Q.q2[2]) + "\\)";
    dA = Q.q1[0] - Q.q2[0]; dB = Q.q1[1] - Q.q2[1]; dC = Q.q1[2] - Q.q2[2];
    P = { dA: dA, dB: dB, dC: dC, identical: false };
    note = "Setting the expressions equal and collecting terms gives \\(" + u7Std(dA, dB, dC) + " = 0\\)" + (dA === 0 ? ", a linear equation" : "") + ".";
  }
  var words = { "-1": "Infinitely many real solutions", "0": "No real solutions", "1": "One real solution", "2": "Two real solutions" };
  var key = words[cnt];
  var dis = ["No real solutions", "One real solution", "Two real solutions", "Infinitely many real solutions"].filter(function (w) { return w !== key; });
  var disc = dB * dB - 4 * dA * dC;
  var why = cnt === -1 ? note + " The two equations describe the same parabola, so every point on it is a solution."
    : cnt === 1 && dA === 0 ? note + " A linear equation has exactly one solution, so the parabolas meet at exactly one point."
    : cnt === 1 ? note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + "\\). A discriminant of zero means the equation has one repeated root, so the graphs touch at one point."
    : cnt === 0 ? note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + " < 0\\). A negative discriminant means the equation has no real roots, so the graphs never meet."
    : note + " Its discriminant is \\(" + dB + "^2 - 4(" + dA + ")(" + dC + ") = " + disc + " > 0\\). A positive discriminant means two distinct real roots, so the graphs meet at two points.";
  return mcq("Consider the system " + eqText + ". Without graphing, determine how many real solutions the system has.",
    key, dis, why + " The system has <b>" + key.toLowerCase() + "</b>.",
    P);
});

/* ---------- 4.52: model and solve a two-number problem (L2) ---------- */
E("u7-model-two-numbers", 7, ["4.52"], 2, "gen", function () {
  var mode = pick(["diffSq", "sumSq", "sqLin"]);
  var p = ri(4, 15), q = ri(2, p - 1);
  var S = p + q, keyNums = [p, q], stem, sysText, work;
  function pairT(a, b) { return a + " and " + b; }
  var key = pairT(p, q), cands = [];
  if (mode === "diffSq") {
    var D = p * p - q * q;
    stem = "The sum of two positive numbers is " + S + ", and the difference of their squares is " + D + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 - y^2 = " + D + "\\)";
    work = "Modelling with \\(x\\) and \\(y\\) gives the system " + sysText + ". Since \\(x^2 - y^2 = (x - y)(x + y)\\), substituting the sum gives \\((x - y)(" + S + ") = " + D + "\\), so \\(x - y = " + (p - q) + "\\). Solving \\(x + y = " + S + "\\) together with \\(x - y = " + (p - q) + "\\) gives \\(x = " + p + "\\) and \\(y = " + q + "\\). Check: \\(" + p + "^2 - " + q + "^2 = " + (p * p) + " - " + (q * q) + " = " + D + "\\).";
    cands = [pairT(p + 1, q - 1), pairT(p, -q), pairT(p - q, q), pairT(p + 2, q - 2)];
  } else if (mode === "sumSq") {
    var Q = p * p + q * q;
    stem = "The sum of two positive numbers is " + S + ", and the sum of their squares is " + Q + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 + y^2 = " + Q + "\\)";
    work = "Modelling with \\(x\\) and \\(y\\) gives the system " + sysText + ". From the first equation, \\(y = " + S + " - x\\); substituting into the second and simplifying gives \\(x^2 - " + S + "x + " + (p * q) + " = 0\\), which factors as \\((x - " + p + ")(x - " + q + ") = 0\\). So the numbers are \\(" + p + "\\) and \\(" + q + "\\). Check: \\(" + p + "^2 + " + q + "^2 = " + (p * p) + " + " + (q * q) + " = " + Q + "\\).";
    cands = [pairT(p + 1, q - 1), pairT(p, -q), pairT(p - q, q), pairT(q + 1, p - 1)];
  } else {
    var T = p * p + q;
    stem = "The sum of two positive numbers is " + S + ". The square of the larger number, added to the smaller number, gives " + T + ". What are the two numbers?";
    sysText = "\\(x + y = " + S + "\\) and \\(x^2 + y = " + T + "\\)";
    work = "Modelling with \\(x\\) the larger and \\(y\\) the smaller number gives the system " + sysText + ". Substituting \\(y = " + S + " - x\\) into the second equation gives \\(x^2 - x + " + (S - T) + " = 0\\), which factors as \\((x - " + p + ")(x + " + (p - 1) + ") = 0\\). The positive root is \\(x = " + p + "\\), so \\(y = " + S + " - " + p + " = " + q + "\\). Check: \\(" + p + "^2 + " + q + " = " + T + "\\).";
    cands = [pairT(p - 1, q + 1), pairT(p, -q), pairT(q, p - q), pairT(p + 1, q - 1)];
  }
  /* keep only distractors that fail at least one stated condition */
  function conds(a, b) {
    if (a + b !== S) return false;
    if (mode === "diffSq") return a * a - b * b === D;
    if (mode === "sumSq") return a * a + b * b === Q;
    return a * a + b === T;
  }
  var dis = [];
  cands.forEach(function (c) {
    var parts = c.split(" and ").map(Number);
    if (!conds(parts[0], parts[1]) && c !== key && dis.indexOf(c) < 0) dis.push(c);
  });
  var extra = 3;
  while (dis.length < 3) { var cc = pairT(p + extra, q - extra); var pp = cc.split(" and ").map(Number); if (!conds(pp[0], pp[1]) && cc !== key && dis.indexOf(cc) < 0) dis.push(cc); extra++; }
  return mcq(stem, key, dis.slice(0, 3), work + " The two numbers are <b>" + key + "</b>.",
    { mode: mode, p: p, q: q, S: S, D: mode === "diffSq" ? D : mode === "sumSq" ? Q : T });
});

/* ---------- 4.52, 4.54: when are a thrown ball and a rising drone level? (L2) ---------- */
E("u7-context-projectile", 7, ["4.52", "4.54"], 2, "gen", function () {
  var ctxs = [
    { name: "drone", mover: "a drone that takes off from a tall mast and climbs at a steady rate", verb: "climbs" },
    { name: "balloon", mover: "a weather balloon released from a hilltop station that rises at a steady rate", verb: "rises" }
  ];
  var ctx = pick(ctxs);
  var t1 = ri(1, 2), t2 = t1 + ri(1, 2); if (t2 > 3) t2 = 3; if (t2 === t1) t2 = t1 + 1;
  var m = ri(2, 5), h0 = ri(2, 9);
  var c = 5 * t1 * t2 + h0;
  var B = m + 5 * (t1 + t2);
  var hB = function (t) { return -5 * t * t + B * t + h0; }, hL = function (t) { return m * t + c; };
  var key = "t = " + t1 + " s and t = " + t2 + " s";
  var tv = (t1 + t2) / 2;
  var cands = ["t = " + t2 + " s and t = " + (t2 + t1) + " s",
    "t = " + (t2 - t1) + " s and t = " + t2 + " s",
    "t = " + t1 + " s and t = " + (t1 + t2) + " s",
    "t = " + t2 + " s only"];
  var sol = "Model the ball's height by \\(h = -5t^2 + " + B + "t + " + h0 + "\\) and the height of the other object by \\(h = " + m + "t + " + c + "\\). The strategy is to set the heights equal, since the objects are level exactly when the system has a solution: \\[ \\begin{aligned} -5t^2 + " + B + "t + " + h0 + " &= " + m + "t + " + c + " \\\\ -5t^2 + " + (B - m) + "t - " + (c - h0) + " &= 0 \\\\ t^2 - " + (t1 + t2) + "t + " + (t1 * t2) + " &= 0 \\\\ (t - " + t1 + ")(t - " + t2 + ") &= 0 \\end{aligned} \\] So \\(t = " + t1 + "\\) or \\(t = " + t2 + "\\). Both times come after the throw and the shared height is positive (at \\(t = " + t1 + "\\), both are at " + hL(t1) + " m), so both count. The objects are level at <b>" + key + "</b>.";
  var stem = "A ball is thrown upward from a platform " + h0 + " m above the ground. Its height, in metres, after t seconds is given by \\(h = -5t^2 + " + B + "t + " + h0 + "\\). At the same moment, " + ctx.mover + "; its height is given by \\(h = " + m + "t + " + c + "\\). At what times are the ball and the other object at the same height?";
  return mcq(stem, key, u7dist3(key, cands), sol,
    { ctx: ctx.name, t1: t1, t2: t2, m: m, h0: h0, c: c, B: B });
});

/* ---------- 4.52, 4.53: perimeter and area give the dimensions (L2) ---------- */
E("u7-context-area", 7, ["4.52", "4.53"], 2, "gen", function () {
  var ctxs = [
    { name: "garden", what: "rectangular garden plot", thing: "The plot" },
    { name: "patio", what: "rectangular patio", thing: "The patio" },
    { name: "pen", what: "rectangular dog pen", thing: "The pen" },
    { name: "bed", what: "rectangular vegetable bed", thing: "The bed" }
  ];
  var ctx = pick(ctxs);
  var w = ri(3, 14), l = w + ri(1, 8);
  var P = 2 * (l + w), A = l * w;
  var key = "Length " + l + " m, width " + w + " m";
  function dimT(a, b) { return "Length " + a + " m, width " + b + " m"; }
  function fits(a, b) { return 2 * (a + b) === P && a * b === A; }
  var raw = [[l + 1, w - 1], [l + 2, w + 1], [l - 1, w + 1], [l + 3, w - 1], [w + 1, l - w + 1], [l + 1, w + 2], [l + 4, w - 2], [l - 2, w + 3]];
  var dis = [];
  raw.forEach(function (pr) { var t = dimT(pr[0], pr[1]); if (pr[0] > 0 && pr[1] > 0 && !fits(pr[0], pr[1]) && t !== key && dis.indexOf(t) < 0) dis.push(t); });
  var sol = "Let the length be \\(l\\) metres and the width be \\(w\\) metres. The perimeter and area give the system \\(2l + 2w = " + P + "\\) and \\(lw = " + A + "\\), a linear-quadratic system. From the first equation, \\(l = " + (P / 2) + " - w\\); substituting into the second gives \\[ \\begin{aligned} w(" + (P / 2) + " - w) &= " + A + " \\\\ w^2 - " + (P / 2) + "w + " + A + " &= 0 \\\\ (w - " + w + ")(w - " + l + ") &= 0 \\end{aligned} \\] So \\(w = " + w + "\\) (the width is the smaller measure) and \\(l = " + (P / 2) + " - " + w + " = " + l + "\\). In context: the dimensions multiply to " + A + " m² and add, doubled, to the " + P + " m of fencing. The dimensions are <b>" + key.toLowerCase() + "</b>.";
  return mcq("A " + ctx.what + " has a perimeter of " + P + " m and an area of " + A + " m². What are the dimensions of the " + ctx.what.split(" ").pop() + "?",
    key, dis.slice(0, 3), sol,
    { ctx: ctx.name, l: l, w: w, P: P, A: A });
});

/* ---------- 4.53, 4.54: one algebraic solution must be rejected in context (L3) ---------- */
E("u7-inadmissible-root", 7, ["4.53", "4.54"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var k = ri(1, 6), w = ri(3, 12), l = w + k, A = l * w;
    var key = "Length " + l + " m and width " + w + " m; the pair with negative measures is impossible";
    var dis = ["Length " + l + " m and width " + w + " m; both solution pairs describe possible gardens",
      "Length " + w + " m and width " + l + " m; the length is the smaller of the two measures",
      "Length " + (w + 2 * k) + " m and width " + (w + k) + " m; these come from solving directly"];
    var sol = "Let the width be \\(w\\) metres; then the length is \\(w + " + k + "\\) metres, and the area gives \\[ \\begin{aligned} w(w + " + k + ") &= " + A + " \\\\ w^2 + " + k + "w - " + A + " &= 0 \\\\ (w - " + w + ")(w + " + l + ") &= 0 \\end{aligned} \\] So \\(w = " + w + "\\) or \\(w = " + (-l) + "\\). The strategy is not finished at the algebra: a width of " + (-l) + " m, with its matching negative length, cannot describe a real garden, so that solution of the system is rejected in context. The garden measures <b>" + l + " m by " + w + " m</b>.";
    return mcq("The length of a rectangular garden is " + k + " m more than its width, and its area is " + A + " m². Which statement correctly gives the dimensions of the garden?",
      key, dis, sol,
      { mode: "rect", k: k, w: w, l: l, A: A });
  }
  var t1 = pick([-2, -1]), t2 = ri(3, 5), H = ri(6, 20);
  var vv = 5 * (t1 + t2), cc = H - 5 * t1 * t2;
  var key2 = "t = " + t2 + " s; the solution t = " + t1 + " s falls before the launch";
  var dis2 = ["Both t = " + t1 + " s and t = " + t2 + " s; each one solves the system",
    "t = " + t1 + " s; it is the first solution the algebra produces",
    "t = " + fmt((t1 + t2) / 2, 1) + " s; that is when the ball is at its greatest height"];
  var sol2 = "Setting the height equal to the beam height gives the system solution: \\[ \\begin{aligned} -5t^2 + " + vv + "t + " + cc + " &= " + H + " \\\\ -5t^2 + " + vv + "t + " + (cc - H) + " &= 0 \\\\ t^2 - " + (t1 + t2) + "t " + (t1 * t2 < 0 ? "- " + (-t1 * t2) : "+ " + (t1 * t2)) + " &= 0 \\\\ " + u7Fac(t1, "t") + u7Fac(t2, "t") + " &= 0 \\end{aligned} \\] So \\(t = " + t1 + "\\) or \\(t = " + t2 + "\\). Both values solve the system algebraically, but time in this problem is measured from the launch, so \\(t = " + t1 + "\\) s describes a moment before the ball existed in flight and is rejected. The ball reaches the beam height, on its way down, at <b>t = " + t2 + " s</b>.";
  return mcq("A ball is launched from a platform. Its height, in metres, after t seconds is \\(h = -5t^2 + " + vv + "t + " + cc + "\\). A sensor beam crosses the flight path at a height of " + H + " m. Which statement correctly gives when the ball passes the beam on its way down?",
    key2, dis2, sol2,
    { mode: "time", t1: t1, t2: t2, H: H, v: vv, c: cc });
});

/* ---------- 4.49, 4.51: the parameter that makes a system tangent (L3) ---------- */
E("u7-tangent-param", 7, ["4.49", "4.51"], 3, "gen", function () {
  var P = ri(-4, 4), M = ri(-3, 3);
  while ((P - M) % 2 !== 0) { M = ri(-3, 3); }
  var Q = ri(-6, 6), dm = P - M;
  var kk = Q - dm * dm / 4;
  var key = "" + kk;
  var cands = ["" + (Q + dm * dm / 4), "" + (Q - dm * dm / 2), "" + (kk + 2), "" + (kk - 3), "" + (Q + dm * dm / 2), "" + (kk + 1), "" + (kk - 1), "" + (kk + 4), "" + (Q + 2), "" + (Q - 2)];
  var sol = "Setting the expressions equal and collecting terms gives \\(" + u7Std(1, dm, 0) + " + (" + Q + " - k) = 0\\). Exactly one solution means the graphs touch, so this quadratic must have a repeated root: its discriminant is zero. \\[ \\begin{aligned} " + dm + "^2 - 4(1)(" + Q + " - k) &= 0 \\\\ " + (dm * dm) + " - (" + (4 * Q) + ") + 4k &= 0 \\\\ 4k &= " + (4 * Q - dm * dm) + " \\\\ k &= " + kk + " \\end{aligned} \\] With \\(k = " + kk + "\\), the system has exactly one solution. The value is <b>" + kk + "</b>.";
  var lineStr = M === 0 ? "k" : u7Lin(M, 0) + " + k";
  return mcq("The system \\(y = " + u7Std(1, P, Q) + "\\) and \\(y = " + lineStr + "\\) has exactly one solution. What is the value of \\(k\\)?",
    key, u7dist3(key, cands), sol,
    { P: P, M: M, Q: Q, k: kk });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u7-pk-relate: borrowed verbatim from math-1201 entry u6-relate (math-1201:4.51). */
E("u7-pk-relate",7,["4.48"],1,"var",varset([
  function(){var key="It says that the total number of muffins and scones bought adds up to 18 items in total";
    return mcq("Leah buys muffins and scones at a bakery. Let \\(x\\) be the number of muffins and \\(y\\) be the number of scones. One equation in the system for her purchase is \\(x + y = 18\\). What does this equation represent?",
    key,
    ["It says that the total cost of the muffins and scones bought comes to 18 dollars in all",
     "It says that the number of muffins bought is 18 more than the number of scones she bought",
     "It says that one muffin and one scone bought together cost a combined 18 dollars in all"],
    "The variables \\(x\\) and \\(y\\) count items, not dollars, so their sum counts items. The equation \\(x + y = 18\\) adds the number of muffins and the number of scones, so <b>it says that the total number of muffins and scones bought adds up to 18 items in total</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is the total cost, in dollars, of all the cars that used the parking lot that day";
    return mcq("A parking lot charges 20 dollars per car and 35 dollars per truck. Let \\(x\\) be the number of cars and \\(y\\) be the number of trucks that used the lot one day, with \\(x + y = 40\\) and \\(20x + 35y = 950\\). In the second equation, what does the term \\(20x\\) represent?",
    key,
    ["It is the total number of cars that used the parking lot on that particular busy day",
     "It is the cost, in dollars, of parking one single car in the lot for one full day there",
     "It is the total cost, in dollars, of all the trucks that used the lot that day instead"],
    "The term \\(20x\\) multiplies the price for one car, \\(20\\) dollars, by the number of cars, \\(x\\). A price times a count gives a total cost, so <b>it is the total cost, in dollars, of all the cars that used the parking lot that day</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It says the total amount spent on smoothies and salads together is exactly 84 dollars";
    return mcq("At a juice stand, a smoothie costs 6 dollars and a salad costs 9 dollars. Let \\(x\\) be the number of smoothies and \\(y\\) be the number of salads in one order. One equation for the order is \\(6x + 9y = 84\\). What does this equation represent?",
    key,
    ["It says the total number of smoothies and salads in the order together is 84 items",
     "It says one smoothie and one salad in the order together cost a combined 84 dollars",
     "It says the number of smoothies in the order is 84 more than the number of salads in it"],
    "Each term multiplies a price by a count: \\(6x\\) is the cost of the smoothies and \\(9y\\) is the cost of the salads. Their sum is a total cost, so <b>it says the total amount spent on smoothies and salads together is exactly 84 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The number of junior skaters at the session";
    return mcq("A skating rink records attendance at a session. Let \\(x\\) be the number of adult skaters and \\(y\\) be the number of junior skaters, with \\(x + y = 52\\) and \\(12x + 7y = 469\\). What does the variable \\(y\\) represent in this system?",
    key,
    ["The number of adult skaters at the session",
     "The total admission money collected at the session",
     "The admission price charged to one junior skater"],
    "The first equation, \\(x + y = 52\\), adds two counts of people to get the total attendance, so each variable counts one group of skaters. Since \\(x\\) counts the adult skaters, \\(y\\) is <b>the number of junior skaters at the session</b>.",
    {keyText:key});}
]));

/* u7-pk-intersection: borrowed verbatim from math-1201 entry u6-intersection (math-1201:4.52). */
E("u7-pk-intersection",7,["4.48"],1,"var",varset([
  function(){var key="When 18 posters are printed, both plans charge the same total cost, which is 126 dollars";
    return mcq("Two printing plans are graphed with cost in dollars against the number of posters printed. The graphs cross at the point \\((18, 126)\\). What does this point mean for the two plans?",
    key,
    ["When 126 posters are printed, both plans charge the same total cost, which is 18 dollars",
     "After 18 posters are printed, one of the plans stops charging and the work becomes free",
     "When 18 posters are printed, the two plans together charge a combined cost of 126 dollars"],
    "On the graph, the first coordinate counts posters and the second coordinate gives cost in dollars. Where the graphs cross, both plans give the same cost for the same number of posters. So the point means: <b>when 18 posters are printed, both plans charge the same total cost, which is 126 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 3 hours of riding, both cyclists are the same distance of 24 km from the start line";
    return mcq("Two cyclists leave the same start line, and each rider has a graph of distance from the start against time. The graphs cross at the point \\((3, 24)\\). What does this point mean for the two cyclists?",
    key,
    ["After 24 hours of riding, both cyclists are the same distance of 3 km from the start line",
     "After 3 hours of riding, the two cyclists have covered 24 km when their distances are added",
     "After 3 hours of riding, one cyclist stops for a rest and the other rider carries on alone"],
    "The first coordinate is the time in hours and the second is the distance from the start in kilometres. At a crossing point, both graphs share the same time and the same distance. So the point means: <b>after 3 hours of riding, both cyclists are the same distance of 24 km from the start line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres";
    return mcq("Two water tanks are being filled, and each tank has a graph of the volume of water against time. The graphs cross at the point \\((5, 40)\\). What does this point mean for the two tanks?",
    key,
    ["After 40 minutes of filling, both tanks hold the same amount of water, which is 5 litres",
     "After 5 minutes of filling, the two tanks together hold a combined amount of 40 litres",
     "After 5 minutes of filling, one tank is completely full and the other tank is fully empty"],
    "The first coordinate is the time in minutes and the second is the volume in litres. Where the graphs cross, the two tanks are measured at the same time and hold the same volume. So the point means: <b>after 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 2 hours of hiking, both hikers stand at the same height of 150 m above the valley";
    return mcq("Two hikers climb from the same valley, and each hiker has a graph of height above the valley against time. The graphs cross at the point \\((2, 150)\\). What does this point mean for the two hikers?",
    key,
    ["After 150 hours of hiking, both hikers stand at the same height of 2 m above the valley",
     "After 2 hours of hiking, the two hikers have heights that add together to give 150 m",
     "After 2 hours of hiking, one hiker reaches the summit and the other turns back to camp"],
    "The first coordinate is the time in hours and the second is the height in metres. At a crossing point, both hikers share the same time and the same height. So the point means: <b>after 2 hours of hiking, both hikers stand at the same height of 150 m above the valley</b>.",
    {stmt:true,keyText:key});}
]));

/* u7-pk-solve-graph: borrowed verbatim from math-1201 entry u6-solve-graph (math-1201:4.53). */
E("u7-pk-solve-graph",7,["4.50"],2,"gen",function(){
  var X=ri(-4,8),Y=ri(-3,11);
  var slopes=[-3,-2,-1,1,2,3];
  var m1=pick(slopes),m2=pick(slopes),t=0;
  while(m2===m1&&t<50){m2=pick(slopes);t++;}
  var b1=Y-m1*X,b2=Y-m2*X;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y),mode=ri(1,2);
  if(mode===1){
    return numq("A graph shows two straight lines. The first line has slope \\("+m1+"\\) and \\(y\\)-intercept \\("+b1+"\\). The second line has slope \\("+m2+"\\) and \\(y\\)-intercept \\("+b2+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
      ans,0.001,
      "Write each line in slope-intercept form: "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
      {mode:mode,m1:m1,b1:b1,m2:m2,b2:b2,X:X,Y:Y,ask:ask,ans:ans});
  }
  var dx1=ri(1,3),dx2=ri(1,3);
  var pts=[[X-dx1,Y-m1*dx1],[X+dx1,Y+m1*dx1],[X-dx2,Y-m2*dx2],[X+dx2,Y+m2*dx2]];
  return numq("A graph shows two straight lines. The first line passes through the points \\("+u6pair(pts[0][0],pts[0][1])+"\\) and \\("+u6pair(pts[1][0],pts[1][1])+"\\). The second line passes through the points \\("+u6pair(pts[2][0],pts[2][1])+"\\) and \\("+u6pair(pts[3][0],pts[3][1])+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
    ans,0.001,
    "Find the slope of each line from its two points, then write each equation. The first line has slope \\("+m1+"\\) and equation \\("+u6yEq(m1,b1)+"\\); the second line has slope \\("+m2+"\\) and equation \\("+u6yEq(m2,b2)+"\\). "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
    {mode:mode,pts:pts,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-verify: borrowed verbatim from math-1201 entry u6-verify (math-1201:4.53). */
E("u7-pk-verify",7,["4.51"],1,"gen",function(){
  var m1=pick([-3,-2,-1,1,2,3]),m2=pick([-3,-2,-1,1,2,3]),t=0;
  while(m2===m1&&t<50){m2=pick([-3,-2,-1,1,2,3]);t++;}
  var b1=ri(-8,8),b2=ri(-8,8),cat=ri(1,4),px,py;
  if(cat===1){px=ri(-5,8);py=m1*px+b1;b2=py-m2*px;}
  else if(cat===2){px=ri(-5,8);py=m1*px+b1;var g=0;while(py===m2*px+b2&&g<50){px++;py=m1*px+b1;g++;}}
  else if(cat===3){px=ri(-5,8);py=m2*px+b2;var g2=0;while(py===m1*px+b1&&g2<50){px++;py=m2*px+b2;g2++;}}
  else{px=ri(-5,8);py=m1*px+b1+pick([2,3,4]);var g3=0;while(py===m2*px+b2&&g3<50){py++;g3++;}}
  var key=(cat===1?"Yes, it is a solution because it satisfies both equations in the system":
    cat===2?"No, it is not a solution, because it satisfies the first equation alone":
    cat===3?"No, it is not a solution, because it satisfies the second equation only":
    "No, it is not a solution, because it satisfies neither of the equations");
  var all=["Yes, it is a solution because it satisfies both equations in the system",
    "No, it is not a solution, because it satisfies the first equation alone",
    "No, it is not a solution, because it satisfies the second equation only",
    "No, it is not a solution, because it satisfies neither of the equations"];
  var ds=all.filter(function(s){return s!==key;});
  var v1=m1*px+b1,v2=m2*px+b2;
  return mcq("Consider the system \\("+u6yEq(m1,b1)+"\\) and \\("+u6yEq(m2,b2)+"\\) (first equation listed first). Is the ordered pair \\("+u6pair(px,py)+"\\) a solution of the system?",
    key,ds,
    "A solution must satisfy both equations. Substitute \\(x = "+px+"\\) and \\(y = "+py+"\\) into each one: \\["+
    "\\begin{aligned} "+m1+"("+px+")"+u6sgn(b1)+" &= "+v1+" \\\\ "+m2+"("+px+")"+u6sgn(b2)+" &= "+v2+" \\end{aligned} \\]"+
    " The pair gives \\(y = "+v1+"\\) in the first equation and \\(y = "+v2+"\\) in the second, while the pair itself has \\(y = "+py+"\\). So the pair <b>"+(cat===1?"satisfies both equations and is a solution":(cat===2?"satisfies the first equation only, so it is not a solution":(cat===3?"satisfies the second equation only, so it is not a solution":"satisfies neither equation, so it is not a solution")))+"</b>.",
    {m1:m1,b1:b1,m2:m2,b2:b2,px:px,py:py,cat:cat,stmt:true,keyText:key});
});

/* u7-pk-solve-algebra: borrowed verbatim from math-1201 entry u6-solve-algebra (math-1201:4.55). */
E("u7-pk-solve-algebra",7,["4.51"],2,"gen",function(){
  var X=ri(-4,9),Y=ri(-3,10);
  var m=pick([-3,-2,-1,1,2,3]),mode=ri(1,2);
  var b=(mode===1)?(Y-m*X):(X-m*Y);
  var p,q,d,t=0;
  do{p=ri(-4,4);q=ri(-4,4);t++;}while(t<200&&((p===0||q===0)||(mode===1?(p+q*m===0):(q+p*m===0))));
  d=p*X+q*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var givenEq,otherEq,sol;
  if(mode===1){
    givenEq=u6yEq(m,b);otherEq=u6std(p,q,d);
    var coef=p+q*m,rest=d-q*b;
    var qPart=(q>0?(" + "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"):(" - "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"));
    sol="The first equation is already solved for \\(y\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+u6coefVar(p,"x")+qPart+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+u6sgn(q*b)+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+" &= "+rest+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " Substitute \\(x = "+X+"\\) back into \\("+givenEq+"\\) to get \\(y\\): \\["+
    "\\begin{aligned} y &= "+m+"("+X+")"+u6sgn(b)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }else{
    givenEq="x = "+u6coefVar(m,"y")+u6sgn(b);otherEq=u6std(p,q,d);
    var coef2=q+p*m,rest2=d-p*b;
    var pPart=(p>0?((Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"):(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    var lead=(p>0?pPart:(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    /* build the substituted left side carefully: p*(x expression) followed by the q y term */
    var subLhs=(p>0?((p===1?"":p)+"("):("-"+(p===-1?"":(-p))+"("))+u6coefVar(m,"y")+u6sgn(b)+")"+(q>0?(" + "+u6coefVar(q,"y")):(" - "+u6coefVar(-q,"y")));
    sol="The first equation is already solved for \\(x\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+subLhs+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+u6sgn(p*b)+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+" &= "+rest2+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " Substitute \\(y = "+Y+"\\) back into \\("+givenEq+"\\) to get \\(x\\): \\["+
    "\\begin{aligned} x &= "+m+"("+Y+")"+u6sgn(b)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }
  return numq("Solve this system of equations using substitution, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+givenEq+" \\\\ "+otherEq+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,m:m,b:b,p:p,q:q,d:d,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-solve-elimination: borrowed verbatim from math-1201 entry u6-solve-elimination (math-1201:4.55). */
E("u7-pk-solve-elimination",7,["4.51"],2,"gen",function(){
  var X=ri(-5,9),Y=ri(-4,10);
  var a1=ri(-4,4),b1=ri(-3,3),t=0;
  while((a1===0||b1===0)&&t<100){a1=ri(-4,4);b1=ri(-3,3);t++;}
  var mode=ri(1,3),a2,b2,k=1;
  if(mode===1){b2=-b1;a2=ri(-4,4);var t1=0;while((a2===0||a2===-a1)&&t1<100){a2=ri(-4,4);t1++;}}
  else if(mode===2){b2=b1;a2=ri(-4,4);var t2=0;while((a2===0||a2===a1)&&t2<100){a2=ri(-4,4);t2++;}}
  else{k=pick([2,3]);b2=-k*b1;a2=ri(-4,4);var t3=0;while((a2===0||k*a1+a2===0)&&t3<100){a2=ri(-4,4);t3++;}}
  var c1=a1*X+b1*Y,c2=a2*X+b2*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var elimLine,firstLines;
  if(mode===1){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Add the two equations so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1+a2,"x")+" &= "+(c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else if(mode===2){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Subtract the second equation from the first so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1-a2,"x")+" &= "+(c1-c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else{
    firstLines=u6std(k*a1,k*b1,k*c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Multiply the first equation by \\("+k+"\\) so the \\(y\\) terms become opposites, then add: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(k*a1+a2,"x")+" &= "+(k*c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }
  var subTerm=(b1>0?(" + "+u6coefVar(b1,"y")):(" - "+u6coefVar(-b1,"y")));
  var sol=elimLine+" Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} "+(a1*X)+subTerm+" &= "+c1+" \\\\ "+u6coefVar(b1,"y")+" &= "+(c1-a1*X)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+a2+"("+X+")"+(b2>0?(" + "+b2+"("+Y+")"):(" - "+(-b2)+"("+Y+")"))+" = "+c2+"\\), confirming the solution in both equations). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  return numq("Solve this system of equations using elimination, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2)+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,k:k,a1:a1,b1:b1,a2:a2,b2:b2,c1:c1,c2:c2,X:X,Y:Y,ask:ask,ans:ans});
});

/* u7-pk-strategy: borrowed verbatim from math-1201 entry u6-strategy (math-1201:4.56). */
E("u7-pk-strategy",7,["4.51"],1,"var",varset([
  function(){var key="Use substitution, because the first equation already gives y directly in terms of x, so it drops right into the second equation";
    return mcq("A system begins with the equation \\(y = 3x - 2\\), followed by \\(2x + 5y = 31\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the second equation has coefficients 2 and 5, and those numbers line up for adding right away here",
     "Use graphing, because the first equation already gives y directly in terms of x, and a picture is the only way to use that fact",
     "Use substitution, because the second equation has both variables in it, so the first equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(y\\) is given directly as \\(3x - 2\\), so replacing \\(y\\) in the second equation leaves one equation in \\(x\\) alone. The best fit is <b>substitution, because the first equation already gives y directly in terms of x</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination here, because the x terms are opposites, so adding the two equations removes x in a single step right away";
    return mcq("A system consists of \\(4x + 3y = 26\\) and \\(-4x + 5y = 6\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because the x terms are opposites, so one variable must be isolated before anything can be combined here",
     "Use elimination, because the y terms are opposites, so adding the two equations removes y in a single step right away here",
     "Use graphing, because the x terms are opposites, so only a picture can show what happens when the equations are combined"],
    "Elimination works when one pair of terms cancels on adding or subtracting. Here the \\(x\\) terms, \\(4x\\) and \\(-4x\\), are opposites, so adding the equations removes \\(x\\) at once and leaves a single equation in \\(y\\). The best fit is <b>elimination, because the x terms are opposites</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use graphing, because the question asks only for an estimate of where the lines meet, and the graph gives that estimate directly";
    return mcq("A question gives two lines drawn on a grid and asks for an estimate of the point where the two lines cross. Which strategy fits this task best, and why?",
    key,
    ["Use substitution, because the question asks only for an estimate of where the lines meet, and algebra gives exact values only",
     "Use elimination, because the question asks only for an estimate of where the lines meet, and the coefficients are already lined up",
     "Use graphing, because the question asks only for an exact algebraic answer, and a graph is the tool that produces exact values"],
    "When only an estimate is needed and the lines are already drawn, reading the crossing point off the graph is the direct route; algebra would give an exact answer the question did not ask for. The best fit is <b>graphing, because the question asks only for an estimate of where the lines meet</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use substitution, because the second equation already gives x directly in terms of y, so it drops right into the first equation";
    return mcq("A system consists of \\(3x - 2y = 12\\) and \\(x = 4y + 1\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the first equation has coefficients 3 and 2, and those numbers line up for adding right away here",
     "Use graphing, because the second equation already gives x directly in terms of y, and a picture is the only way to use that fact",
     "Use substitution, because the first equation has both variables in it, so the second equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(x\\) is given directly as \\(4y + 1\\), so replacing \\(x\\) in the first equation leaves one equation in \\(y\\) alone. The best fit is <b>substitution, because the second equation already gives x directly in terms of y</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination, because tripling the first equation lines the x terms up, so subtracting then removes x in one clean step";
    return mcq("A system consists of \\(2x + y = 9\\) and \\(6x - y = 7\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because tripling the first equation lines the x terms up, so one variable must be isolated beforehand",
     "Use elimination, because doubling the second equation lines the x terms up, so subtracting then removes x in one clean step",
     "Use graphing, because tripling the first equation lines the x terms up, so only a picture can show the two equations combined"],
    "Elimination also works after one equation is multiplied to line up a pair of terms. Tripling the first equation makes its \\(x\\) term \\(6x\\), matching the second equation, so subtracting removes \\(x\\). The best fit is <b>elimination, because tripling the first equation lines the x terms up</b>.",
    {stmt:true,keyText:key});}
]));

/* u7-pk-solve-by-factoring: authored micro-item (authored:solve-quadratic-by-factoring),
   written for this tranche. */
E("u7-pk-solve-by-factoring",7,["4.51"],2,"gen",function(){
  var lo=0,hi=0,tries=0;
  do { var r1=ri(-6,6),r2=ri(-6,8); lo=Math.min(r1,r2); hi=Math.max(r1,r2); tries++; } while((lo===hi||lo===0||hi===0)&&tries<80);
  var B=-(lo+hi), C=lo*hi;
  var lin=function(v){ return v===1?"x":(v===-1?"-x":v+"x"); };
  var eq="x^2";
  if(B!==0) eq+= B>0 ? " + "+lin(B) : " - "+lin(-B);
  eq+= C>0 ? " + "+C : " - "+(-C);
  var fac=function(r){ return r>0 ? "(x - "+r+")" : "(x + "+(-r)+")"; };
  var askLarger=ri(0,1)===0;
  var ans=askLarger?hi:lo;
  return numq("Solve the equation \\("+eq+" = 0\\) by factoring. What is the "+(askLarger?"larger":"smaller")+" root?",
    ans,0.01,
    "The quadratic factors as \\("+eq+" = "+fac(lo)+fac(hi)+"\\). A product is 0 when one of its factors is 0, so \\(x = "+lo+"\\) or \\(x = "+hi+"\\). The "+(askLarger?"larger":"smaller")+" root is <b>"+ans+"</b>.",
    {lo:lo,hi:hi,ans:ans});
}, ["Find two numbers that multiply to the constant term and add to the middle coefficient.", "Set each factor equal to 0."]);

/* PK tranche pass for Unit 7. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U7_FOR=["4.48","4.49","4.50","4.51","4.52","4.53","4.54"];
var PKT_U7={
 "u7-pk-relate":{src:"math-1201:4.51",group:"intersection-meaning"},
 "u7-pk-intersection":{src:"math-1201:4.52",group:"intersection-meaning"},
 "u7-pk-solve-graph":{src:"math-1201:4.53",group:"systems-graphical"},
 "u7-pk-verify":{src:"math-1201:4.53",group:"verify-solution"},
 "u7-pk-solve-algebra":{src:"math-1201:4.55",group:"systems-algebraic"},
 "u7-pk-solve-elimination":{src:"math-1201:4.55",group:"systems-algebraic"},
 "u7-pk-strategy":{src:"math-1201:4.56",group:"systems-algebraic"},
 "u7-pk-solve-by-factoring":{src:"authored:solve-quadratic-by-factoring",group:"solve-quadratic"}
};
BANK.forEach(function(e){var t=PKT_U7[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U7_FOR.slice();e.pkGroup=t.group;}});
