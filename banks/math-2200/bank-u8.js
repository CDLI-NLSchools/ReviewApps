// Math 2200 Unit 8 Linear and Quadratic Inequalities question bank
// CRMARKS: u8-both-hold=3
// CRMARKS: u8-model-context=3
// CRMARKS: u8-numberline-quad=2
// CRMARKS: u8-numberline-read=1
// CRMARKS: u8-quad-graph-id=2
// CRMARKS: u8-quad-solve-inside=2
// CRMARKS: u8-quad-solve-special=3
// CRMARKS: u8-solve-linear-basic=1
// CRMARKS: u8-solve-linear-flip=2
// CRMARKS: u8-scenario-solve=2
/* ================= Unit 8: Linear and Quadratic Inequalities ================= */
/* ================= Unit 8: Linear and Quadratic Inequalities =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u8; entries register through E(...).
   13 entries: L1 3, L2 8, L3 2.
   Codes: 4.16 determine the solution region of a linear inequality
   using test points; 4.17 solid or broken boundary lines (both
   two-variable outcomes per the curriculum guide, corrected
   Nov 13, 2026; the one-variable solving entries in this file
   assess Math 9 outcomes and carry the pkFlag, below);
   4.18 graph linear inequalities in two variables (test point, solid/broken);
   4.19 model a context as a two-variable inequality, feasible combinations;
   4.20-4.23 quadratic inequalities in two variables (regions, test points,
   boundary type, error analysis); 4.24-4.26 solve quadratic inequalities in
   one variable (interval notation, sign analysis, special solution sets). */

function u8dist3(correct, cands) { /* first three candidate strings differing from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}
function u8sgn(n) { return n > 0 ? " + " + n : n < 0 ? " - " + (-n) : ""; }
function u8coef(a, v) { return a === 1 ? v : a === -1 ? "-" + v : a + v; }
function u8linB(a, b) { var s = u8coef(a, "x"); if (b !== 0) s += u8sgn(b); return s; }
function u8quadB(a, b, c) {
  var s = u8coef(a, "x^2");
  if (b !== 0) s += (b > 0 ? " + " : " - ") + (Math.abs(b) === 1 ? "x" : Math.abs(b) + "x");
  if (c !== 0) s += u8sgn(c);
  return s;
}
function u8facB(r) { return r === 0 ? "x" : r > 0 ? "(x - " + r + ")" : "(x + " + (-r) + ")"; }
function u8sqT(h) { return h === 0 ? "x^2" : h > 0 ? "(x - " + h + ")^2" : "(x + " + (-h) + ")^2"; }
var U8SYM = { lt: "<", le: "\\le", gt: ">", ge: "\\ge" };
function u8flip(s) { return { lt: "gt", le: "ge", gt: "lt", ge: "le" }[s]; }
function u8otherStrict(s) { return { lt: "le", le: "lt", gt: "ge", ge: "gt" }[s]; }
function u8incl(s) { return s === "le" || s === "ge"; }
function u8ivOne(k, sym) {
  if (sym === "lt") return "(-\\infty, " + k + ")";
  if (sym === "le") return "(-\\infty, " + k + "]";
  if (sym === "gt") return "(" + k + ", \\infty)";
  return "[" + k + ", \\infty)";
}
function u8ivBetween(lo, hi, incl) { return (incl ? "[" : "(") + lo + ", " + hi + (incl ? "]" : ")"); }
function u8ivOutside(lo, hi, incl) { return "(-\\infty, " + lo + (incl ? "]" : ")") + " \\cup " + (incl ? "[" : "(") + hi + ", \\infty)"; }
function u8wrap(s) { return "\\(" + s + "\\)"; }

/* ---------- number line figures ---------- */
function u8LineBase(xmin, xmax, inner, label) {
  var W = 340, H = 74, y0 = 30;
  function X(x) { return 18 + (x - xmin) * (304 / (xmax - xmin)); }
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">';
  for (var t = xmin; t <= xmax; t++) {
    s += '<line x1="' + fmt(X(t), 1) + '" y1="25" x2="' + fmt(X(t), 1) + '" y2="35" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
    s += _txt(X(t), 50, "" + t, 10, false);
  }
  s += inner(X);
  s += '<line x1="8" y1="' + y0 + '" x2="332" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<polygon points="8,' + y0 + ' 17,' + (y0 - 4) + ' 17,' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="332,' + y0 + ' 323,' + (y0 - 4) + ' 323,' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  return s + "</svg>";
}
function u8shadeSeg(X, x1, x2, y0) {
  return '<line x1="' + fmt(X(x1), 1) + '" y1="' + y0 + '" x2="' + fmt(X(x2), 1) + '" y2="' + y0 + '" stroke="' + FIG_ACC + '" stroke-width="5" opacity="0.85"/>';
}
function u8dot(X, x, closed, y0) {
  return '<circle cx="' + fmt(X(x), 1) + '" cy="' + y0 + '" r="5.5" fill="' + (closed ? FIG_ACC : "#ffffff") + '" stroke="' + FIG_ACC + '" stroke-width="2.2"/>';
}
function u8Line1(k, closed, dir) { /* one endpoint, shading to one side */
  var xmin = k - 4, xmax = k + 4, y0 = 30;
  return u8LineBase(xmin, xmax, function (X) {
    var s = "";
    if (dir === "low") {
      s += u8shadeSeg(X, xmin, k, y0);
      s += '<polygon points="' + fmt(X(xmin), 1) + ',' + y0 + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    } else {
      s += u8shadeSeg(X, k, xmax, y0);
      s += '<polygon points="' + fmt(X(xmax), 1) + ',' + y0 + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    }
    return s + u8dot(X, k, closed, y0);
  }, "Number line with shading from " + k + (dir === "low" ? " leftward" : " rightward"));
}
function u8Line2(r1, r2, region, incl) { /* two endpoints, shading between or outside */
  var xmin = r1 - 3, xmax = r2 + 3, y0 = 30;
  return u8LineBase(xmin, xmax, function (X) {
    var s = "";
    if (region === "between") {
      s += u8shadeSeg(X, r1, r2, y0);
    } else {
      s += u8shadeSeg(X, xmin, r1, y0) + u8shadeSeg(X, r2, xmax, y0);
      s += '<polygon points="' + fmt(X(xmin), 1) + ',' + y0 + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmin) + 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
      s += '<polygon points="' + fmt(X(xmax), 1) + ',' + y0 + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 - 5.5) + ' ' + fmt(X(xmax) - 11, 1) + ',' + (y0 + 5.5) + '" fill="' + FIG_ACC + '"/>';
    }
    return s + u8dot(X, r1, incl, y0) + u8dot(X, r2, incl, y0);
  }, "Number line with shading " + region + " " + r1 + " and " + r2);
}

/* ---------- parabola figure for a two-variable quadratic inequality ---------- */
function u8Para(h, k, a, dashed, shadeAbove) {
  var W = 320, H = 264, unit = 18, ox = 160, oy = 140;
  function PX(x) { return ox + x * unit; }
  function PY(y) { return oy - y * unit; }
  var g, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parabola with a shaded region">';
  for (g = -8; g <= 8; g++) s += '<line x1="' + fmt(PX(g), 1) + '" y1="6" x2="' + fmt(PX(g), 1) + '" y2="258" stroke="#e2e2e2" stroke-width="1"/>';
  for (g = -6; g <= 6; g++) s += '<line x1="6" y1="' + fmt(PY(g), 1) + '" x2="314" y2="' + fmt(PY(g), 1) + '" stroke="#e2e2e2" stroke-width="1"/>';
  var pts = [], x;
  for (x = -8.6; x <= 8.61; x += 0.2) pts.push([x, a * (x - h) * (x - h) + k]);
  var curve = pts.map(function (p, i) { return (i === 0 ? "M " : "L ") + fmt(PX(p[0]), 1) + " " + fmt(PY(p[1]), 1); }).join(" ");
  var edge = shadeAbove ? -6 : H + 6;
  s += '<path d="' + curve + " L " + fmt(PX(8.6), 1) + " " + edge + " L " + fmt(PX(-8.6), 1) + " " + edge + ' Z" fill="' + FIG_SHADE + '"/>';
  s += '<line x1="6" y1="' + fmt(PY(0), 1) + '" x2="314" y2="' + fmt(PY(0), 1) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<line x1="' + fmt(PX(0), 1) + '" y1="6" x2="' + fmt(PX(0), 1) + '" y2="258" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (g = -8; g <= 8; g++) if (g !== 0) s += _txt(PX(g), PY(0) + 11, "" + g, 9, false);
  for (g = -6; g <= 6; g++) if (g !== 0) s += _txt(PX(0) - 9, PY(g), "" + g, 9, false);
  s += '<path d="' + curve + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2.2"' + (dashed ? ' stroke-dasharray="7 5"' : "") + "/>";
  s += '<circle cx="' + fmt(PX(h), 1) + '" cy="' + fmt(PY(k), 1) + '" r="3.5" fill="' + FIG_ACC + '"/>';
  return s + "</svg>";
}

/* ---------- 4.16, 4.17: solve a two-step linear inequality (L1) ---------- */
E("u8-solve-linear-basic", 8, ["4.16", "4.17"], 1, "gen", function () {
  var a = ri(2, 9), b = ri(-9, 9), k = ri(-6, 8);
  if (k === 0) k = 3;
  var sym = pick(["lt", "le", "gt", "ge"]), rhs = a * k + b;
  var cor = "x " + U8SYM[sym] + " " + k;
  var dis = ["x " + U8SYM[u8flip(sym)] + " " + k,
             "x " + U8SYM[u8otherStrict(sym)] + " " + k,
             "x " + U8SYM[sym] + " " + (-k)];
  var sol = "Move the constant term to the right side, then divide by \\(" + a + "\\). The coefficient of \\(x\\) is positive, so the inequality sign keeps its direction: \\[ \\begin{aligned} " + u8linB(a, b) + " &" + U8SYM[sym] + " " + rhs + " \\\\ " + a + "x &" + U8SYM[sym] + " " + (rhs - b) + " \\\\ x &" + U8SYM[sym] + " " + k + " \\end{aligned} \\] The solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + u8linB(a, b) + " " + U8SYM[sym] + " " + rhs + "\\).",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "lin", A: a, B: b, C: rhs, sym: sym });
});

/* ---------- 4.17: read a one-sided solution set from a number line (L1) ---------- */
E("u8-numberline-read", 8, ["4.17"], 1, "gen", function () {
  var k = ri(-7, 7), closed = pick([true, false]), dir = pick(["low", "high"]);
  var sym = dir === "low" ? (closed ? "le" : "lt") : (closed ? "ge" : "gt");
  var cor = u8ivOne(k, sym);
  var dis = ["lt", "le", "gt", "ge"].map(function (s) { return u8ivOne(k, s); }).filter(function (s) { return s !== cor; });
  var q = mcq("The number line shows the solution set of an inequality in one variable. Which interval notation describes the set shown?",
    u8wrap(cor), dis.map(u8wrap),
    "The circle at \\(" + k + "\\) is " + (closed ? "filled in, so \\(" + k + "\\) itself is included in the set" : "open, so \\(" + k + "\\) itself is not included in the set") + ". The shading covers every value " + (dir === "low" ? "below" : "above") + " \\(" + k + "\\), running off the end of the line. The solution set is <b>\\(" + cor + "\\)</b>.",
    { kind: "spec", spec: { type: "one", k: k, sym: sym } });
  q.figure = u8Line1(k, closed, dir);
  return q;
});

/* ---------- 4.18, 4.20, 4.22: which point is a solution (L1) ---------- */
E("u8-point-test", 8, ["4.18", "4.20", "4.22"], 1, "gen", function () {
  var shape = pick(["lin", "quad"]), sym = pick(["lt", "le", "gt", "ge"]);
  var m, b, bb, cc, ineqStr;
  function fval(x, y) {
    return shape === "lin" ? y - (m * x + b) : y - (x * x + bb * x + cc);
  }
  function holds(x, y) {
    var v = fval(x, y);
    return sym === "lt" ? v < 0 : sym === "le" ? v <= 0 : sym === "gt" ? v > 0 : v >= 0;
  }
  if (shape === "lin") {
    m = pick([-3, -2, -1, 1, 2, 3]); b = ri(-5, 5);
    ineqStr = "y " + U8SYM[sym] + " " + u8linB(m, b);
  } else {
    bb = ri(-4, 4); cc = ri(-6, 6);
    ineqStr = "y " + U8SYM[sym] + " " + u8quadB(1, bb, cc);
  }
  var good = null, bads = [], seen = {}, guard = 0;
  while ((!good || bads.length < 3) && guard++ < 600) {
    var x = ri(-4, 4), y = ri(-6, 9), key = x + "," + y;
    if (seen[key]) continue;
    seen[key] = 1;
    if (holds(x, y)) { if (!good) good = [x, y]; }
    else if (bads.length < 3) bads.push([x, y]);
  }
  var bv = shape === "lin" ? m * good[0] + b : good[0] * good[0] + bb * good[0] + cc;
  var cor = "(" + good[0] + ", " + good[1] + ")";
  var dis = bads.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; });
  var sol = "A point is a solution when substituting it makes the inequality true. For \\(" + cor + "\\), the boundary value at \\(x = " + good[0] + "\\) is \\(" + bv + "\\), and \\(" + good[1] + " " + U8SYM[sym] + " " + bv + "\\) is a true statement. Substituting each of the other three points gives a false statement, so none of them lies in the solution region. The solution point is <b>" + cor + "</b>.";
  return mcq("Which point is a solution of the inequality \\(" + ineqStr + "\\)?",
    cor, dis, sol,
    { kind: "pt", shape: shape, sym: sym, m: m, b: b, bb: bb, cc: cc });
});

/* ---------- 4.16: solve a linear inequality, sign reversal (L2) ---------- */
E("u8-solve-linear-flip", 8, ["4.16"], 2, "gen", function () {
  var shape = pick(["plain", "dist"]);
  var sym = pick(["lt", "le", "gt", "ge"]);
  var k = ri(-7, 7); if (k === 0) k = 4;
  var A, B, C, stem, step1, firstLine;
  if (shape === "plain") {
    var a = ri(2, 8); A = -a; B = ri(-9, 9); C = A * k + B;
    stem = u8linB(A, B);
    firstLine = stem;
  } else {
    var m = ri(2, 6), n = ri(1, 6);
    A = -m; B = m * n; C = A * k + B;
    stem = m + "(" + n + " - x)";
    firstLine = u8linB(A, B);
  }
  var fsym = u8flip(sym);
  var cor = u8ivOne(k, fsym);
  var dis = [u8ivOne(k, sym), u8ivOne(k, u8otherStrict(fsym)), u8ivOne(-k, fsym)];
  var steps = (shape === "dist" ? stem + " &" + U8SYM[sym] + " " + C + " \\\\ " : "") +
    firstLine + " &" + U8SYM[sym] + " " + C + " \\\\ " + A + "x &" + U8SYM[sym] + " " + (C - B) + " \\\\ x &" + U8SYM[fsym] + " " + k;
  var sol = "Isolate \\(x\\). The last step divides both sides by \\(" + A + ")\\), a negative number, so the inequality sign must reverse: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] In interval notation, the solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " " + C + "\\). Give the solution in interval notation.",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "lin", A: A, B: B, C: C, sym: sym });
});

/* ---------- 4.18: describe the graph of a linear inequality in two variables (L2) ---------- */
E("u8-graph-linear-desc", 8, ["4.18"], 2, "gen", function () {
  var form = pick(["si", "std"]), sym = pick(["lt", "le", "gt", "ge"]);
  var a1, a2, C, ineqStr, lineStr;
  if (form === "si") {
    var m = pick([-3, -2, -1, 1, 2, 3]), b = ri(-5, 5); if (b === 0) b = 3;
    a1 = -m; a2 = 1; C = b;
    ineqStr = "y " + U8SYM[sym] + " " + u8linB(m, b);
    lineStr = "y = " + u8linB(m, b);
  } else {
    a1 = pick([-3, -2, -1, 1, 2, 3]); a2 = pick([-3, -2, -1, 2, 3]); C = ri(-9, 9); if (C === 0) C = 5;
    var lhs = u8coef(a1, "x") + (a2 > 0 ? " + " : " - ") + (Math.abs(a2) === 1 ? "y" : Math.abs(a2) + "y");
    ineqStr = lhs + " " + U8SYM[sym] + " " + C;
    lineStr = lhs + " = " + C;
  }
  var solid = u8incl(sym);
  var contains = sym === "lt" ? 0 < C : sym === "le" ? 0 <= C : sym === "gt" ? 0 > C : 0 >= C;
  function desc(sd, ct) { return (sd ? "Solid" : "Dashed") + " line, and the shading " + (ct ? "includes" : "excludes") + " the origin"; }
  var cor = desc(solid, contains);
  var dis = [desc(!solid, contains), desc(solid, !contains), desc(!solid, !contains)];
  var testVal = form === "si" ? "0" : "0";
  var sol = "The boundary is the line \\(" + lineStr + "\\). The symbol \\(" + U8SYM[sym] + "\\) " + (solid ? "includes equality, so points on the line are solutions and the boundary is drawn solid" : "is strict, so points on the line are not solutions and the boundary is drawn dashed") + ". To choose the shaded side, test the origin \\((0, 0)\\): substituting gives \\(" + testVal + " " + U8SYM[sym] + " " + C + ")\\), which is " + (contains ? "true, so the origin lies in the shaded region" : "false, so the shaded region is the side away from the origin") + ". The matching description is <b>" + cor + "</b>.";
  return mcq("Which statement describes the graph of the inequality \\(" + ineqStr + "\\)?",
    cor, dis, sol,
    { kind: "desc", a1: a1, a2: a2, C: C, sym: sym });
});

/* ---------- 4.19: model a context with a two-variable inequality (L2) ---------- */
var U8CTX = [
  { name: "snack cart", v1: "m", v2: "j", p1: 3, p2: 2, rel: "le", caps: [36, 40, 44, 48, 52, 60], maxXY: 14,
    defs: "Let \\(m\\) be the number of muffins and \\(j\\) be the number of juice boxes.",
    text: function (cap) { return "A snack cart sells muffins for $3 each and juice boxes for $2 each. A teacher spends at most $" + cap + " on muffins and juice boxes for a class."; },
    total: "total cost in dollars", pairWords: "muffins and juice boxes" },
  { name: "shuttle", v1: "v", v2: "c", p1: 8, p2: 5, rel: "ge", caps: [55, 60, 65, 70, 75, 80], maxXY: 12,
    defs: "Let \\(v\\) be the number of vans and \\(c\\) be the number of cars.",
    text: function (cap) { return "A shuttle company uses vans that carry 8 passengers and cars that carry 5 passengers. On one trip, the company must carry at least " + cap + " passengers."; },
    total: "total number of passengers carried", pairWords: "vans and cars" },
  { name: "bakery mix", v1: "a", v2: "c", p1: 12, p2: 6, rel: "le", caps: [60, 72, 84, 96, 108, 120], maxXY: 12,
    defs: "Let \\(a\\) be the number of kilograms of almonds and \\(c\\) be the number of kilograms of dried cranberries.",
    text: function (cap) { return "A bakery sells a trail mix of almonds at $12 per kilogram and dried cranberries at $6 per kilogram. A gift mix must cost at most $" + cap + "."; },
    total: "total cost in dollars", pairWords: "kilograms of almonds and kilograms of cranberries" },
  { name: "two jobs", v1: "t", v2: "s", p1: 15, p2: 11, rel: "ge", caps: [170, 185, 200, 215, 230], maxXY: 14,
    defs: "Let \\(t\\) be the number of hours spent tutoring and \\(s\\) be the number of hours spent shelving books.",
    text: function (cap) { return "Sam earns $15 per hour tutoring and $11 per hour shelving books at a library. Sam wants to earn at least $" + cap + " next week."; },
    total: "total earnings in dollars", pairWords: "hours of tutoring and hours shelving books" },
  { name: "delivery van", v1: "w", v2: "j", p1: 12, p2: 9, rel: "le", caps: [240, 270, 300, 330, 360], maxXY: 20,
    defs: "Let \\(w\\) be the number of crates of bottled water and \\(j\\) be the number of crates of juice.",
    text: function (cap) { return "A delivery van carries crates of bottled water weighing 12 kg each and crates of juice weighing 9 kg each. The total load must be at most " + cap + " kg."; },
    total: "total load in kilograms", pairWords: "crates of bottled water and crates of juice" },
  { name: "print order", v1: "p", v2: "f", p1: 5, p2: 2, rel: "le", caps: [50, 60, 70, 80, 90], maxXY: 16,
    defs: "Let \\(p\\) be the number of posters and \\(f\\) be the number of flyers.",
    text: function (cap) { return "A student council prints posters for $5 each and flyers for $2 each for a school event. The council can spend at most $" + cap + " on printing."; },
    total: "total printing cost in dollars", pairWords: "posters and flyers" }
];
E("u8-model-context", 8, ["4.19"], 1, "gen", function () {
  var ctx = pick(U8CTX), cap = pick(ctx.caps), shape = pick(["model", "feasible"]);
  var sym = ctx.rel, symT = U8SYM[sym];
  var body = ctx.p1 + ctx.v1 + " + " + ctx.p2 + ctx.v2;
  if (shape === "model") {
    var cor = body + " " + symT + " " + cap;
    var cap2 = cap + pick([-10, -5, 5, 10]);
    var dis = [ctx.p2 + ctx.v1 + " + " + ctx.p1 + ctx.v2 + " " + symT + " " + cap,
               body + " " + U8SYM[u8flip(sym)] + " " + cap,
               body + " " + symT + " " + cap2];
    var sol = ctx.defs + " The " + ctx.total + " is \\(" + body + "\\). The words " + (ctx.rel === "le" ? "\"at most\" mean the total can equal the limit but not pass it, giving \\(\\le\\)" : "\"at least\" mean the total can equal the goal but not fall below it, giving \\(\\ge\\)") + ", and the limit here is \\(" + cap + "\\). The model is <b>\\(" + cor + "\\)</b>.";
    return mcq(ctx.text(cap) + " " + ctx.defs + " Which inequality models this situation?",
      u8wrap(cor), dis.map(u8wrap), sol,
      { kind: "model", shape: shape, ctx: ctx.name, p1: ctx.p1, p2: ctx.p2, v1: ctx.v1, v2: ctx.v2, rel: ctx.rel, cap: cap });
  }
  function okPair(x, y) {
    var tot = ctx.p1 * x + ctx.p2 * y;
    return ctx.rel === "le" ? tot <= cap : tot >= cap;
  }
  var good = null, bads = [], seen = {}, guard = 0;
  while ((!good || bads.length < 3) && guard++ < 800) {
    var px = ri(0, ctx.maxXY), py = ri(0, ctx.maxXY), key = px + "," + py;
    if (seen[key]) continue;
    seen[key] = 1;
    if (okPair(px, py)) { if (!good && px >= 1 && py >= 1) good = [px, py]; }
    else if (bads.length < 3) bads.push([px, py]);
  }
  var gtot = ctx.p1 * good[0] + ctx.p2 * good[1];
  var corP = "(" + good[0] + ", " + good[1] + ")";
  var disP = bads.map(function (p) { return "(" + p[0] + ", " + p[1] + ")"; });
  var solP = ctx.defs + " The combinations are listed in the order (" + ctx.pairWords + "). For \\(" + corP + "\\), the " + ctx.total + " is \\(" + ctx.p1 + "(" + good[0] + ") + " + ctx.p2 + "(" + good[1] + ") = " + gtot + "\\), which " + (ctx.rel === "le" ? "does not exceed" : "reaches at least") + " \\(" + cap + "\\). Each other combination gives a total on the wrong side of \\(" + cap + "\\). The combination that works is <b>" + corP + "</b>.";
  return mcq(ctx.text(cap) + " " + ctx.defs + " The inequality is \\(" + body + " " + symT + " " + cap + "\\). Which combination meets the goal?",
    corP, disP, solP,
    { kind: "model", shape: shape, ctx: ctx.name, p1: ctx.p1, p2: ctx.p2, v1: ctx.v1, v2: ctx.v2, rel: ctx.rel, cap: cap });
});

/* ---------- 4.24, 4.25: solve a quadratic inequality, inside region (L2) ---------- */
E("u8-quad-solve-inside", 8, ["4.24", "4.25"], 2, "gen", function () {
  var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
  if (r2 > 7) r2 = 7;
  var A = pick([1, 1, 2, 3]), sym = pick(["lt", "le"]);
  var B = -A * (r1 + r2), C = A * r1 * r2, incl = u8incl(sym);
  var form = pick(["factored", "expanded"]);
  var stem = form === "factored" ? (A === 1 ? "" : "" + A) + u8facB(r1) + u8facB(r2) : u8quadB(A, B, C);
  var cor = u8ivBetween(r1, r2, incl);
  var dis = [u8ivOutside(r1, r2, incl), u8ivBetween(r1, r2, !incl), u8ivOutside(r1, r2, !incl)];
  var sol = "The expression equals zero at \\(x = " + r1 + "\\) and \\(x = " + r2 + "\\)" + (form === "expanded" ? ", since \\(" + u8quadB(A, B, C) + " = " + (A === 1 ? "" : "" + A) + u8facB(r1) + u8facB(r2) + "\\)" : "") + ". The parabola \\(y = " + u8quadB(A, B, C) + "\\) opens upward, so the expression is negative between its roots and positive outside them. The inequality asks where the expression is " + (sym === "lt" ? "negative, and the strict symbol excludes the endpoints" : "negative or zero, so the endpoints are included") + ". The solution is <b>\\(" + cor + "\\)</b>.";
  return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " 0\\). Give the solution in interval notation.",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "quad", A: A, B: B, C: C, sym: sym });
});

/* ---------- 4.24, 4.25, 4.26: negative leading coefficient and perfect-square cases (L2) ---------- */
E("u8-quad-solve-special", 8, ["4.24", "4.25", "4.26"], 1, "gen", function () {
  var shape = pick(["neg", "neg", "square"]);
  var sym = pick(["lt", "le", "gt", "ge"]), incl = u8incl(sym);
  if (shape === "neg") {
    var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
    if (r2 > 7) r2 = 7;
    var A0 = pick([1, 2]), A = -A0, B = A0 * (r1 + r2), C = -A0 * r1 * r2;
    var form = pick(["factored", "expanded"]);
    var stem = form === "factored" ? "-" + (A0 === 1 ? "" : "" + A0) + u8facB(r1) + u8facB(r2) : u8quadB(A, B, C);
    var inside = sym === "gt" || sym === "ge";
    var cor = inside ? u8ivBetween(r1, r2, incl) : u8ivOutside(r1, r2, incl);
    var dis = [inside ? u8ivOutside(r1, r2, incl) : u8ivBetween(r1, r2, incl),
               inside ? u8ivBetween(r1, r2, !incl) : u8ivOutside(r1, r2, !incl),
               inside ? u8ivOutside(r1, r2, !incl) : u8ivBetween(r1, r2, !incl)];
    var sol = "The expression equals zero at \\(x = " + r1 + "\\) and \\(x = " + r2 + "\\)" + (form === "expanded" ? ", since \\(" + u8quadB(A, B, C) + " = -" + (A0 === 1 ? "" : "" + A0) + u8facB(r1) + u8facB(r2) + "\\)" : "") + ". Because the leading coefficient is negative, the parabola opens downward: the expression is positive between its roots and negative outside them. The inequality asks where the expression is " + (sym === "lt" ? "negative, with the endpoints excluded" : sym === "le" ? "negative or zero, with the endpoints included" : sym === "gt" ? "positive, with the endpoints excluded" : "positive or zero, with the endpoints included") + ". The solution is <b>\\(" + cor + "\\)</b>.";
    return mcq("Solve the inequality \\(" + stem + " " + U8SYM[sym] + " 0\\). Give the solution in interval notation.",
      u8wrap(cor), dis.map(u8wrap), sol,
      { kind: "quad", A: A, B: B, C: C, sym: sym });
  }
  var h = ri(-5, 5), Aq = pick([1, 2, 3]);
  var stemS = (Aq === 1 ? "" : "" + Aq) + (h === 0 ? "x^2" : u8sqT(h));
  var specials = {
    gt: "(-\\infty, " + h + ") \\cup (" + h + ", \\infty)",
    ge: "All real numbers",
    lt: "No solution",
    le: "\\{" + h + "\\}"
  };
  var corS = specials[sym];
  var disS = ["gt", "ge", "lt", "le"].filter(function (s) { return s !== sym; }).map(function (s) { return specials[s]; });
  function optOf(s) { return (s === "All real numbers" || s === "No solution") ? s : u8wrap(s); }
  var reason = sym === "gt" ? "A square is positive except at \\(x = " + h + "\\), where it is zero, and a strict greater-than excludes that single point. Every other value works"
    : sym === "ge" ? "A square is never negative, so the expression is positive or zero for every real value of \\(x\\)"
    : sym === "lt" ? "A square is never negative, so the expression can never be less than zero, no matter the value of \\(x\\)"
    : "A square is never negative, and it equals zero only at \\(x = " + h + "\\), so that single value is the whole solution set";
  var solS = "The expression \\(" + stemS + "\\) is " + (Aq === 1 ? "" : Aq + " times ") + "a perfect square, \\(" + u8sqT(h) + "\\). " + reason + ". The solution is <b>" + optOf(corS) + "</b>.";
  return mcq("Solve the inequality \\(" + stemS + " " + U8SYM[sym] + " 0\\).",
    optOf(corS), disS.map(optOf), solS,
    { kind: "quad", A: Aq, B: -2 * Aq * h, C: Aq * h * h, sym: sym });
});

/* ---------- 4.26: read a quadratic solution set from a number line (L2) ---------- */
E("u8-numberline-quad", 8, ["4.26"], 2, "gen", function () {
  var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
  if (r2 > 7) r2 = 7;
  var region = pick(["between", "outside"]), incl = pick([true, false]);
  var sym = region === "between" ? (incl ? "le" : "lt") : (incl ? "ge" : "gt");
  var body = u8facB(r1) + u8facB(r2);
  var cor = body + " " + U8SYM[sym] + " 0";
  var dis = ["lt", "le", "gt", "ge"].filter(function (s) { return s !== sym; }).map(function (s) { return body + " " + U8SYM[s] + " 0"; });
  var q = mcq("The number line shows the solution set of a quadratic inequality. Which inequality has exactly this solution set?",
    u8wrap(cor), dis.map(u8wrap),
    "The endpoints are \\(" + r1 + "\\) and \\(" + r2 + ")\\), so the factors are \\(" + u8facB(r1) + "\\) and \\(" + u8facB(r2) + ")\\). The circles are " + (incl ? "filled, so the endpoints are included" : "open, so the endpoints are excluded") + ", and the shading lies " + (region === "between" ? "between the endpoints, where the product of the factors is negative" : "outside the endpoints, where the product of the factors is positive") + ". The inequality is <b>\\(" + cor + "\\)</b>.",
    { kind: "nlq", r1: r1, r2: r2, region: region, incl: incl, sym: sym });
  q.figure = u8Line2(r1, r2, region, incl);
  return q;
});

/* ---------- 4.20, 4.21: identify a quadratic inequality from its graph (L2) ---------- */
E("u8-quad-graph-id", 8, ["4.20", "4.21"], 1, "gen", function () {
  var h = ri(-3, 3), k = ri(-4, 3);
  if (h === 0 && k === 0) k = 2;
  var a = pick([1, -1]), dashed = pick([true, false]), above = pick([true, false]);
  var sym = above ? (dashed ? "gt" : "ge") : (dashed ? "lt" : "le");
  function fbody(hh, kk) { return (a === 1 ? "" : "-") + u8sqT(hh) + u8sgn(kk); }
  var cor = "y " + U8SYM[sym] + " " + fbody(h, k);
  var verr = h !== 0 ? fbody(-h, k) : fbody(h, -k);
  var dis = ["y " + U8SYM[u8flip(sym)] + " " + fbody(h, k),
             "y " + U8SYM[sym] + " " + verr,
             "y " + U8SYM[u8otherStrict(sym)] + " " + fbody(h, k)];
  var tp = k + (above ? 2 : -2);
  var sol = "The marked vertex is \\((" + h + ", " + k + ")\\), and the parabola opens " + (a === 1 ? "upward" : "downward") + ", so the boundary has equation \\(y = " + fbody(h, k) + "\\). The boundary is drawn " + (dashed ? "dashed, so the inequality is strict" : "solid, so the inequality includes equality") + ". The test point \\((" + h + ", " + tp + ")\\), straight " + (above ? "above" : "below") + " the vertex, lies in the shaded region, and it satisfies \\(y " + U8SYM[sym] + " " + fbody(h, k) + "\\). The inequality is <b>\\(" + cor + "\\)</b>.";
  var q = mcq("The shaded graph shows the solution region of a quadratic inequality. Which inequality is represented?",
    u8wrap(cor), dis.map(u8wrap), sol,
    { kind: "gid", h: h, k: k, a: a, sym: sym, dashed: dashed, above: above });
  q.figure = u8Para(h, k, a, dashed, above);
  return q;
});

/* ---------- 4.23: analyse a student's incorrect solution (L3) ---------- */
E("u8-error-analysis", 8, ["4.23"], 3, "gen", function () {
  var shape = pick(["region", "flip", "boundary"]);
  if (shape === "region") {
    var r1 = ri(-6, 3), r2 = r1 + ri(2, 6);
    if (r2 > 7) r2 = 7;
    var ineq = u8facB(r1) + u8facB(r2) + " > 0";
    var keyText = "The student chose the interval where the product is negative. A product greater than zero needs both factors to have the same sign, which happens on the two outer intervals.";
    var dis = ["The student should have reversed the inequality sign after dividing both sides by a negative number, which would have changed the direction of the final answer.",
               "The student excluded the endpoints, but the endpoints satisfy the inequality and should have been included in the final interval that is reported as the solution.",
               "The student used the wrong roots; the factors give roots of " + (r1 + 1) + " and " + (r2 - 1) + " instead, and the interval was taken from those wrong roots, so the endpoints of the answer are wrong as well."];
    return mcq("A student solves \\(" + ineq + "\\) and gives the solution \\(" + r1 + " < x < " + r2 + "\\). Which statement best describes the student's error?",
      keyText, dis,
      "Between \\(" + r1 + "\\) and \\(" + r2 + ")\\), one factor is positive and the other is negative, so the product is negative there, not positive. The product is positive when both factors are positive or both are negative: \\(x < " + r1 + "\\) or \\(x > " + r2 + "\\). <b>" + keyText + "</b>",
      { kind: "err", shape: shape, keyText: keyText });
  }
  if (shape === "flip") {
    var a = ri(2, 8), b = ri(-9, 9), k = ri(-7, 7);
    if (k === 0) k = 5;
    var sym = pick(["ge", "le"]), C = -a * k + b;
    var stem = u8linB(-a, b);
    var keyText2 = "Dividing both sides by a negative number reverses the inequality, so the sign should have been flipped in the last step.";
    var dis2 = ["The student made an arithmetic error when moving the constant term to the right side in the first step of the work.",
                "The endpoint should be excluded, because the final answer must use a strict inequality symbol rather than the one shown.",
                "The variable should have been isolated by first adding " + a + "x to both sides of the inequality before anything else was done."];
    var prompt = "A student solves \\(" + stem + " " + U8SYM[sym] + " " + C + "\\) with these steps: \\[ \\begin{aligned} " + stem + " &" + U8SYM[sym] + " " + C + " \\\\ " + (-a) + "x &" + U8SYM[sym] + " " + (C - b) + " \\\\ x &" + U8SYM[sym] + " " + k + " \\end{aligned} \\] Which statement best describes the error in the student's work?";
    return mcq(prompt, keyText2, dis2,
      "The arithmetic is correct up to the last step: \\(" + (-a) + "x " + U8SYM[sym] + " " + (C - b) + ")\\). Dividing by \\(" + (-a) + "\\) without reversing the symbol gives the stated answer, but division by a negative reverses the relation, so the correct final step is \\(x " + U8SYM[u8flip(sym)] + " " + k + "\\). <b>" + keyText2 + "</b>",
      { kind: "err", shape: shape, keyText: keyText2, a: a, b: b, C: C, sym: sym, k: k });
  }
  var bb = ri(-4, 4), cc = ri(-6, 6), bsym = pick(["gt", "lt"]);
  var fb = u8quadB(1, bb, cc);
  var keyText3 = bsym === "gt"
    ? "The boundary should be dashed, because the strict inequality does not include points on the parabola itself."
    : "The boundary should be dashed, because the strict inequality does not include points on the parabola itself.";
  var dis3 = bsym === "gt"
    ? ["The student shaded the wrong side; the region below the parabola is the one that satisfies the inequality.",
       "The parabola should open downward, because the inequality uses a greater-than symbol in the statement.",
       "The vertex of the parabola is in the wrong position, so the whole graph is shifted from where it belongs."]
    : ["The student shaded the wrong side; the region above the parabola is the one that satisfies the inequality.",
       "The parabola should open upward, because the inequality uses a less-than symbol in the given statement.",
       "The vertex of the parabola is in the wrong position, so the whole graph is shifted from where it belongs."];
  var sideWord = bsym === "gt" ? "above" : "below";
  return mcq("A student graphs \\(y " + U8SYM[bsym] + " " + fb + "\\) using a solid parabola, with the region " + sideWord + " the parabola shaded. Which statement best describes the student's error?",
    keyText3, dis3,
    "The shading is on the correct side: points " + sideWord + " the parabola have \\(y\\) values that satisfy \\(y " + U8SYM[bsym] + " " + fb + "\\). The mistake is the boundary itself. A strict symbol, \\(" + U8SYM[bsym] + "\\), excludes the points on the parabola, so it must be dashed. <b>" + keyText3 + "</b>",
    { kind: "err", shape: shape, keyText: keyText3 });
});

/* ---------- 4.25, 4.26: values that satisfy two quadratic inequalities (L3) ---------- */
E("u8-both-hold", 8, ["4.25", "4.26"], 3, "gen", function () {
  var pattern = pick(["overlap", "cross", "contain"]);
  var r1, r2, s1, s2, sym1 = "le", sym2, keyBody, solTail, spanDis;
  if (pattern === "overlap") {
    r1 = ri(-5, 0); s1 = r1 + ri(1, 3); r2 = s1 + ri(1, 3); s2 = r2 + ri(1, 3);
    sym2 = "lt";
    keyBody = "(" + s1 + ", " + r2 + "]";
    solTail = "greater than \\(" + s1 + "\\) (strictly, from the second inequality) and at most \\(" + r2 + "\\) (from the first)";
    spanDis = u8ivBetween(r1, s2, true);
  } else if (pattern === "cross") {
    r1 = ri(-5, 0); s1 = r1 - ri(1, 2); s2 = r1 + ri(1, 3); r2 = s2 + ri(1, 3);
    sym2 = "gt";
    keyBody = "(" + s2 + ", " + r2 + "]";
    solTail = "greater than \\(" + s2 + "\\) (from the outside part of the second solution) and at most \\(" + r2 + "\\) (from the first)";
    spanDis = "(" + s1 + ", " + r2 + "]";
  } else {
    r1 = ri(-6, -1); s1 = r1 + ri(1, 2); s2 = s1 + ri(2, 3); r2 = s2 + ri(1, 2);
    sym2 = "le";
    keyBody = u8ivBetween(s1, s2, true);
    solTail = "inside the second interval, which already lies inside the first, so the second interval is the overlap";
    spanDis = u8ivBetween(s1, r2, true);
  }
  var ineq1 = u8facB(r1) + u8facB(r2) + " " + U8SYM[sym1] + " 0";
  var ineq2 = u8facB(s1) + u8facB(s2) + " " + U8SYM[sym2] + " 0";
  var set1 = u8ivBetween(r1, r2, true);
  var set2 = pattern === "overlap" ? u8ivBetween(s1, s2, false)
    : pattern === "cross" ? u8ivOutside(s1, s2, false)
    : u8ivBetween(s1, s2, true);
  var flipDis = keyBody.replace("[", "(").replace("]", ")").replace("(", "TMP").replace("TMP", "[");
  if (pattern === "contain") flipDis = "(" + s1 + ", " + s2 + ")";
  else flipDis = "[" + keyBody.slice(1, -1) + ")";
  var dis = u8dist3(u8wrap(keyBody), [u8wrap(set1), u8wrap(flipDis), u8wrap(spanDis)]);
  var sol = "Solve each inequality on its own. The first gives \\(" + set1 + "\\), and the second gives \\(" + set2 + "\\). A value must lie in both sets at once, so it must be " + solTail + ". The values that satisfy both are <b>\\(" + keyBody + "\\)</b>.";
  return mcq("A value of \\(x\\) must satisfy both \\(" + ineq1 + "\\) and \\(" + ineq2 + "\\). Which interval gives all such values?",
    u8wrap(keyBody), dis, sol,
    { kind: "both", A1: 1, B1: -(r1 + r2), C1: r1 * r2, sym1: sym1, A2: 1, B2: -(s1 + s2), C2: s1 * s2, sym2: sym2 });
});

/* ---------- 4.16, 4.17: solve a one-variable inequality from a scenario (L2, CR 2) ----------
   Scenario arms harvested Nov 13, 2026 (build order step 9): budget
   limits, grade-needed, savings goals and within-tolerance bands from
   the Pure Math 20 inequality files, rewritten. Whole-number answers
   are built boundary-first: the budget and the goal are set relative
   to the answer so the floor and ceiling behaviour is exact. */
E("u8-scenario-solve", 8, ["4.16", "4.17"], 2, "gen", function () {
  var shape = pick(["budget", "grade", "tolerance", "goal"]);
  if (shape === "budget") {
    var ctxs = [
      { who: "A grad committee", fixed: "hall rental", unit: "tickets", item: "dance tickets", verb: "sell" },
      { who: "A hockey team", fixed: "equipment fee", unit: "jerseys", item: "team jerseys", verb: "buy" },
      { who: "A caterer", fixed: "room fee", unit: "guests", item: "guest meals", verb: "serve" }
    ];
    var cx = pick(ctxs);
    var x = ri(4, 30), p = pick([6, 8, 9, 10, 12, 15, 20, 25]), F = pick([40, 60, 75, 80, 100, 120, 150, 200]);
    var r = ri(0, p - 1), B = F + p * x + r;
    var sol = "Let \\(x\\) be the number of " + cx.unit + ". The total cost is the fixed " + cx.fixed + " plus the per-unit cost: \\(" + p + "x + " + F + " \\le " + B + "\\). Solving: \\[ \\begin{aligned} " + p + "x + " + F + " &\\le " + B + " \\\\ " + p + "x &\\le " + (B - F) + " \\\\ x &\\le " + (x + r / p).toFixed(2).replace(/\.?0+$/, "") + " \\end{aligned} \\] The number of " + cx.unit + " must be a whole number, so at most \\(" + x + "\\) can be afforded (one more would cost $" + (F + p * (x + 1)) + ", over the $" + B + " budget). The greatest number is <b>" + x + "</b>.";
    return numq(cx.who + " has $" + B + " to spend. The " + cx.fixed + " is a fixed $" + F + ", and each of the " + cx.item + " costs $" + p + ". What is the greatest number of " + cx.unit + " that can be paid for?",
      x, 0.01, sol,
      { kind: "scen", shape: shape, p: p, F: F, B: B, ans: x });
  }
  if (shape === "grade") {
    var a, b, c, G, need, t = 0;
    do {
      a = ri(55, 98); b = ri(55, 98); c = ri(55, 98); G = pick([70, 75, 80, 85]);
      need = 4 * G - (a + b + c); t++;
    } while (t < 300 && (need < 30 || need > 100));
    if (t >= 300) { a = 78; b = 84; c = 82; G = 80; need = 76; }
    var sum = a + b + c;
    var sol = "Let \\(x\\) be the score on the fourth test. The average of the four tests must reach the goal: \\(\\frac{" + sum + " + x}{4} \\ge " + G + "\\). Solving: \\[ \\begin{aligned} " + sum + " + x &\\ge " + (4 * G) + " \\\\ x &\\ge " + need + " \\end{aligned} \\] A score of \\(" + (need - 1) + "\\) would leave the average at \\(" + ((sum + need - 1) / 4) + "\\), just short, so the minimum score needed is <b>" + need + "</b>.";
    return numq("A student has written three tests, scoring " + a + ", " + b + " and " + c + " out of 100. The student wants the average of the four tests to be at least " + G + ". What is the minimum score the student needs on the fourth test?",
      need, 0.01, sol,
      { kind: "scen", shape: shape, sum: sum, G: G, ans: need });
  }
  if (shape === "tolerance") {
    var dec = Math.random() < 0.5;
    var cx2, cc, tt;
    if (dec) {
      var pr = pick([[25, 0.4, "mm"], [40, 0.25, "mm"], [12.5, 0.3, "cm"], [60, 0.75, "mm"], [8.5, 0.15, "cm"]]);
      cx2 = pick([
        "A machined pin must have a diameter of " + pr[0] + " " + pr[2] + ", within " + pr[1] + " " + pr[2] + " of the target",
        "A cut board must have a length of " + pr[0] + " " + pr[2] + ", within " + pr[1] + " " + pr[2] + " of the target"
      ]);
      cc = pr[0]; tt = pr[1];
    } else {
      var pr2 = pick([[500, 6, "mL"], [750, 10, "mL"], [2000, 25, "g"], [1000, 15, "g"]]);
      cx2 = pick([
        "A bottling machine fills bottles with a target of " + pr2[0] + " " + pr2[2] + ", within " + pr2[1] + " " + pr2[2] + " of the target",
        "A scale packs bags with a target mass of " + pr2[0] + " " + pr2[2] + ", within " + pr2[1] + " " + pr2[2] + " of the target"
      ]);
      cc = pr2[0]; tt = pr2[1];
    }
    var hi = Math.round((cc + tt) * 100) / 100, lo = Math.round((cc - tt) * 100) / 100;
    var askHi = Math.random() < 0.5, ans = askHi ? hi : lo;
    var sol = "Within \\(" + tt + "\\) of the target means the measurement \\(x\\) satisfies \\(|x - " + cc + "| \\le " + tt + "\\), the two-sided band \\[ " + lo + " \\le x \\le " + hi + " \\] Every value in this band is acceptable, and the endpoints themselves are included because \"within\" allows equality. The " + (askHi ? "greatest" : "least") + " acceptable measurement is <b>" + fmt(ans) + "</b>.";
    return numq(cx2 + ". What is the " + (askHi ? "greatest" : "least") + " acceptable measurement?",
      ans, 0.01, sol,
      { kind: "scen", shape: shape, c: cc, t: tt, askHi: askHi, ans: ans });
  }
  var ctxs3 = [
    { who: "Riley", have: "has saved", earn: "washing cars", item: "a bicycle", per: "week" },
    { who: "Jae", have: "has saved", earn: "mowing lawns", item: "a laptop", per: "week" },
    { who: "Priya", have: "has saved", earn: "babysitting", item: "a class trip", per: "week" }
  ];
  var cx3 = pick(ctxs3);
  var x3 = ri(2, 20), w = pick([15, 20, 25, 30, 40, 50]), S = pick([0, 25, 40, 60, 80, 100, 120]);
  var G3 = S + w * (x3 - 1) + ri(1, w);
  var sol3 = "Let \\(x\\) be the number of weeks. The savings reach the goal when \\(" + S + " + " + w + "x \\ge " + G3 + "\\). Solving: \\[ \\begin{aligned} " + w + "x &\\ge " + (G3 - S) + " \\\\ x &\\ge " + ((G3 - S) / w).toFixed(2).replace(/\.?0+$/, "") + " \\end{aligned} \\] A fraction of a week does not finish the saving, so round up: after \\(" + (x3 - 1) + "\\) weeks the savings are $" + (S + w * (x3 - 1)) + ", still short of $" + G3 + ". The number of weeks needed is <b>" + x3 + "</b>.";
  return numq(cx3.who + " " + cx3.have + " $" + S + " and earns $" + w + " per " + cx3.per + " " + cx3.earn + ". How many weeks until " + cx3.who + " can afford " + cx3.item + " costing $" + G3 + "?",
    x3, 0.01, sol3,
    { kind: "scen", shape: shape, S: S, w: w, G: G3, ans: x3 });
});

/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess Math 9 one-variable linear inequality outcomes (indicators 8.24, 8.26 and 8.27), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-2200.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u8-solve-linear-basic","u8-solve-linear-flip","u8-numberline-read"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u8-pk-graph-to-ineq: borrowed verbatim from math-9 entry u5-graph-to-ineq (math-9:8.24). */
E("u8-pk-graph-to-ineq",8,["4.24"], 1, "gen", function () {
  var k = ri(-8, 8), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var corr = n5ineqTex("x", r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== r; });
  var fbMap = { lt: "That uses a strict sign the wrong way for this graph; check the circle and the shading direction.", gt: "That points the shading the wrong way or uses the wrong circle for this graph.", le: "That does not match both the circle type and the shading direction in the graph.", ge: "That does not match both the circle type and the shading direction in the graph." };
  var ds = others.map(function (s) { return { t: n5ineqTex("x", s, fmt(k)), fb: fbMap[s] }; });
  var sol = "The circle sits at \\(" + fmt(k) + "\\), it is " + (closed ? "closed, so the endpoint is included and the sign has an equals part" : "open, so the endpoint is not included and the sign is strict") + ", and the shading goes to the " + dir + ". So the graph represents <b>" + corr + "</b>.";
  var q = mcq("The number line in the diagram graphs an inequality. Which inequality does the graph represent?", { t: corr, fb: "Correct: the circle type, its position and the shading direction all match." }, ds, sol, { mode: "graph-to-ineq", r: r, k: k });
  q.figure = n5line(k, closed, dir);
  return q;
}, ["Read the graph in three parts: where the circle sits, whether it is open or closed, and which way the shading goes.", "First find the number under the circle; that is the boundary value in every choice."]);

/* u8-pk-graph-boundary: borrowed verbatim from math-9 entry u5-graph-boundary (math-9:8.24). */
E("u8-pk-graph-boundary",8,["4.24"], 1, "gen", function () {
  var k = ri(-9, 9), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var sol = "The circle always sits on the boundary value of the inequality, the number the variable is compared with: \\[ \\begin{aligned} x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the circle sits on <b>" + fmt(k) + "</b>.";
  return numq("The inequality \\(" + "x " + n5sym(r) + " " + fmt(k) + "\\) is graphed on a number line. The graph has a" + (closed ? " closed" : "n open") + " circle and the shading goes to the " + dir + ". On what number does the circle sit?", k, 0.01, sol, { mode: "boundary", r: r, k: k });
}, ["The circle sits on the number the variable is compared with in the inequality.", "First find the constant on the other side of the inequality sign from x."]);

/* u8-pk-solve-ineq-pos-div: borrowed verbatim from math-9 entry u5-solve-ineq-pos-div (math-9:8.26). */
E("u8-pk-solve-ineq-pos-div",8,["4.24"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(-11, 11); if (b === 0) b = 4;
  var c = a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = n5flip(r);
  var alt = n5fracTex(c + b, a);
  var corr = n5ineqTex("x", r, fmt(k));
  var ds = [
    { t: n5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but dividing by a positive number keeps the sign direction; it does not flip." },
    { t: n5ineqTex("x", r, alt), fb: "That boundary comes from moving the constant the wrong way before dividing." },
    { t: n5ineqTex("x", fr, alt), fb: "That has both slips: the constant was moved the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Isolate x step by step; the divisor is positive, so the sign stays as it is: \\[ \\begin{aligned} " + n5lin(a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + n5lin(a, b) + " " + n5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the constant was undone, then both sides were divided by the positive coefficient." }, ds, sol, { mode: "pos-div", a: a, b: b, c: c, r: r });
}, ["Solve it like the matching equation, and remember dividing by a positive number never flips the sign.", "First undo the constant term, then divide both sides by the coefficient of x."]);

/* u8-pk-solve-ineq-two-step: borrowed verbatim from math-9 entry u5-solve-ineq-two-step-choose (math-9:8.27). */
E("u8-pk-solve-ineq-two-step",8,["4.24"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(2, 11), c = a * k - b, r = pick(["lt", "gt", "le", "ge"]), fr = n5flip(r);
  var alt = n5fracTex(c - b, a);
  var corr = n5ineqTex("x", r, fmt(k));
  var ds = [
    { t: n5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but nothing here flips the sign: the coefficient of x is positive." },
    { t: n5ineqTex("x", r, alt), fb: "That boundary comes from subtracting the constant again instead of adding it back." },
    { t: n5ineqTex("x", fr, alt), fb: "That has both slips: the constant was handled the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Undo the subtraction by adding to both sides, then divide by the positive coefficient: \\[ \\begin{aligned} " + fmt(a) + "x-" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c + b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the fully correct solution is <b>" + corr + "</b>.";
  return mcq("Which inequality is the fully correct solution of \\(" + fmt(a) + "x - " + fmt(b) + " " + n5sym(r) + " " + fmt(c) + "\\)?", { t: corr, fb: "Correct: both steps are right and the sign direction is unchanged." }, ds, sol, { mode: "two-step-choose", a: a, b: b, c: c, r: r });
}, ["Work the solution yourself, one step at a time, then match it against the choices.", "First undo the constant term by adding it to both sides, then divide."]);

/* u8-pk-context-graph: borrowed verbatim from math-9 entry u5-context-graph (math-9:8.30). */
E("u8-pk-context-graph",8,["4.19"], 1, "gen", function () {
  var ctxs = [
    { v: "s", r: "le", text: function (k) { return "A school club can spend at most $" + fmt(k) + " on supplies. Let s be the amount spent, in dollars."; } },
    { v: "a", r: "ge", text: function (k) { return "Riders must be at least " + fmt(k) + " cm tall for a certain ride. Let a be a rider's height, in centimetres."; } },
    { v: "p", r: "lt", text: function (k) { return "Each piece cut from a board must be shorter than " + fmt(k) + " cm. Let p be the length of a piece, in centimetres."; } },
    { v: "g", r: "gt", text: function (k) { return "A team needs to score more than " + fmt(k) + " points to advance. Let g be the points the team scores."; } }
  ];
  var cx = pick(ctxs), k = ri(6, 40) * pick([1, 1, 2, 5]);
  var closed = (cx.r === "le" || cx.r === "ge"), dir = (cx.r === "gt" || cx.r === "ge") ? "right" : "left";
  var corr = n5ineqTex(cx.v, cx.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== cx.r; });
  var ds = others.map(function (s) { return { t: n5ineqTex(cx.v, s, fmt(k)), fb: "That inequality does not match the graph: check the circle type and the shading direction against the story." }; });
  var sol = "The story gives the boundary \\(" + fmt(k) + "\\), and the graph shows a " + (closed ? "closed" : "open") + " circle there with shading to the " + dir + ". So the inequality for the situation is <b>" + corr + "</b>.";
  var q = mcq(cx.text(k) + " The number line in the diagram graphs the amounts that fit the situation. Which inequality describes the situation?", { t: corr, fb: "Correct: the variable, boundary, circle type and shading direction all match the story." }, ds, sol, { mode: "context-graph", r: cx.r, k: k, v: cx.v });
  q.figure = n5line(k, closed, dir);
  return q;
}, ["Translate the story into an inequality, then check it against the circle and shading in the graph.", "First find the boundary number in the story; the graph circle sits on that same number."]);

/* PK tranche pass for Unit 8. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U8_FOR=["4.16","4.17","4.18","4.19","4.20","4.21","4.22","4.23","4.24","4.25","4.26"];
var PKT_U8={
 "u8-pk-graph-to-ineq":{src:"math-9:8.24",group:"inequality-graphing"},
 "u8-pk-graph-boundary":{src:"math-9:8.24",group:"inequality-graphing"},
 "u8-pk-solve-ineq-pos-div":{src:"math-9:8.26",group:"inequality-solving"},
 "u8-pk-solve-ineq-two-step":{src:"math-9:8.27",group:"inequality-solving"},
 "u8-pk-context-graph":{src:"math-9:8.30",group:"inequality-context"}
};
BANK.forEach(function(e){var t=PKT_U8[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});

/* PK tranche metadata completion for Unit 8 (Nov 15, 2026): the
   three entries flagged in the Nov 13, 2026 pass above gain their
   pkSrc, pkFor and pkGroup records. They are not retagged and not
   reflagged; the flag pass above already set pkFlag. */
var PKT_U8_META={
 "u8-solve-linear-basic":{src:"math-9:8.27",group:"inequality-solving"},
 "u8-solve-linear-flip":{src:"math-9:8.26",group:"inequality-solving"},
 "u8-numberline-read":{src:"math-9:8.24",group:"inequality-graphing"}};
BANK.forEach(function(e){var t=PKT_U8_META[e.id];if(t){e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});
