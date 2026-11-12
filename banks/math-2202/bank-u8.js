// Math 2202 Unit 8 Trigonometry question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 4219 to 4755).
// CRMARKS: u8-cr-elevation-height=2
// CRMARKS: u8-cr-find-angle=2
// CRMARKS: u8-cr-direct-side=2
// CRMARKS: u8-cr-same-side-gap=3
// CRMARKS: u8-cr-shared-side-stage=3
// CRMARKS: u8-cr-clinometer-two-readings=3
// CRMARKS: u8-cr-two-depressions=2
// CRMARKS: u8-cr-baseline-height=3
/* ===== Unit 8 ===== */
/* Unit 8 Trigonometry, Mathematics 2202 Review. Helpers prefixed u8. */
var U8R = Math.PI / 180;
function u8tan(a) { return Math.tan(a * U8R); }
function u8sin(a) { return Math.sin(a * U8R); }
function u8cos(a) { return Math.cos(a * U8R); }
function u8svg(inner, W, H, label) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">' + inner + '</svg>';
}
function u8ln(x1, y1, x2, y2, dash, w) {
  return '<line x1="' + fmt(x1, 1) + '" y1="' + fmt(y1, 1) + '" x2="' + fmt(x2, 1) + '" y2="' + fmt(y2, 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
}
function u8numMC(prompt, correct, errs, unit, dec, fbC, sol, params) {
  function fv(v) { return fmtF(v, dec); }
  var used = {}; used[fv(correct)] = 1;
  var dist = errs.map(function (e, i) {
    var v = e.v, g = 0;
    while (used[fv(v)] || v <= 0) { v = v + (dec === 0 ? 2.3 : 1.7) + g * 0.9; g++; if (g > 25) { v = correct + (i + 2) * (dec === 0 ? 5 : 3.1); } }
    used[fv(v)] = 1;
    return { t: fv(v) + " " + unit, fb: e.fb };
  });
  return mcq(prompt, { t: fv(correct) + " " + unit, fb: fbC }, dist, sol, params);
}
/* Sight line figure: eye point left, object top right, drawn from the angle. */
function u8ElevFig(ang, distTxt, hTxt) {
  var run = 215, rise = run * u8tan(ang);
  if (rise > 138) { var s = 138 / rise; run *= s; rise *= s; }
  var E = [48, 168], F = [48 + run, 182], T = [48 + run, 182 - 14 - rise];
  var inner = u8ln(20, 182, 312, 182) + u8ln(F[0], F[1], T[0], T[1]) + u8ln(E[0], E[1], T[0], T[1]) + u8ln(E[0], E[1], T[0], E[1], true, 1.5);
  inner += '<circle cx="' + E[0] + '" cy="' + E[1] + '" r="3" fill="' + FIG_INK + '"/>';
  inner += _txt(E[0] + 34, E[1] - 12, ang + "°", 12, false);
  inner += _txt((E[0] + F[0]) / 2, 198, distTxt, 12, false);
  inner += _txt(F[0] + 16, (F[1] + T[1]) / 2, hTxt, 12, false, "start");
  return u8svg(inner, 330, 212, "Angle of elevation diagram");
}
function u8DepressFig(ang, hTxt, dTxt) {
  var vert = 128, run = vert / u8tan(ang);
  if (run > 225) { var s = 225 / run; run *= s; vert *= s; }
  if (run < 62) { var s2 = 62 / run; run *= s2; vert *= s2; if (vert > 150) { vert = 150; } }
  var T = [66, 42], W = [66, 42 + vert], B = [66 + run, 42 + vert];
  var inner = u8ln(T[0], T[1], W[0], W[1]) + u8ln(30, W[1], 316, W[1]) + u8ln(T[0], T[1], B[0], B[1]) + u8ln(T[0], T[1], T[0] + 238, T[1], true, 1.5);
  inner += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="3.2" fill="' + FIG_ACC + '"/>';
  inner += _txt(T[0] + 42, T[1] + 13, ang + "°", 12, false);
  inner += _txt(T[0] - 14, (T[1] + W[1]) / 2, hTxt, 12, false, "end");
  inner += _txt((W[0] + B[0]) / 2, W[1] + 16, dTxt, 12, false);
  return u8svg(inner, 330, 212, "Angle of depression diagram");
}
function u8RTFig(angTxt, abTxt, bcTxt, acTxt) {
  var A = [48, 172], B = [256, 172], C = [256, 52];
  var inner = u8ln(A[0], A[1], B[0], B[1]) + u8ln(B[0], B[1], C[0], C[1]) + u8ln(C[0], C[1], A[0], A[1]);
  inner += '<path d="M ' + (B[0] - 13) + ' ' + B[1] + ' l 0 -13 l 13 0" fill="none" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  inner += _txt(A[0] - 12, A[1] + 6, "A", 14, true) + _txt(B[0] + 4, B[1] + 16, "B", 14, true) + _txt(C[0] + 12, C[1] - 4, "C", 14, true);
  inner += _txt(A[0] + 32, A[1] - 12, angTxt, 12, false);
  inner += _txt((A[0] + B[0]) / 2, A[1] + 17, abTxt, 12, false);
  inner += _txt(B[0] + 14, (B[1] + C[1]) / 2, bcTxt, 12, false, "start");
  inner += _txt((A[0] + C[0]) / 2 - 16, (A[1] + C[1]) / 2 - 8, acTxt, 12, false);
  return u8svg(inner, 330, 205, "Right triangle ABC, right angled at B");
}
function u8TwoOppFig(a1, a2, hTxt) {
  var vert = 138, r1 = vert / u8tan(a1), r2 = vert / u8tan(a2), mx = Math.max(r1, r2), sc = 118 / mx;
  r1 *= sc; r2 *= sc;
  var T = [165, 34], F = [165, 34 + vert], L = [165 - r1, 34 + vert], R = [165 + r2, 34 + vert];
  var inner = u8ln(18, F[1], 316, F[1]) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], L[0], L[1]) + u8ln(T[0], T[1], R[0], R[1]) + u8ln(T[0], T[1], T[0] - 140, T[1], true, 1.4) + u8ln(T[0], T[1], T[0] + 140, T[1], true, 1.4);
  inner += _txt(T[0] - 30, T[1] + 14, a1 + "°", 12, false) + _txt(T[0] + 30, T[1] + 14, a2 + "°", 12, false);
  inner += _txt(T[0] - 12, (T[1] + F[1]) / 2, hTxt, 12, false, "end");
  inner += _txt(L[0], L[1] + 16, "point 1", 11.5, false) + _txt(R[0], R[1] + 16, "point 2", 11.5, false);
  return u8svg(inner, 334, 200, "Two points on opposite sides, seen from the top");
}
function u8TwoSameFig(aNear, aFar, hTxt) {
  var vert = 138, rn = vert / u8tan(aNear), rf = vert / u8tan(aFar), sc = 218 / rf;
  rn *= sc; rf *= sc; vert = 138;
  var T = [56, 34], F = [56, 34 + vert], N = [56 + rn, 34 + vert], Fa = [56 + rf, 34 + vert];
  var inner = u8ln(18, F[1], 322, F[1]) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], N[0], N[1]) + u8ln(T[0], T[1], Fa[0], Fa[1]) + u8ln(T[0], T[1], 306, T[1], true, 1.4);
  inner += _txt(T[0] + 30, T[1] + 24, aNear + "°", 12, false) + _txt(T[0] + 62, T[1] + 10, aFar + "°", 12, false);
  inner += _txt(T[0] - 12, (T[1] + F[1]) / 2, hTxt, 12, false, "end");
  inner += _txt(N[0], N[1] + 16, "near", 11.5, false) + _txt(Fa[0], Fa[1] + 16, "far", 11.5, false);
  return u8svg(inner, 334, 200, "Two points on the same side, seen from the top");
}
function u8SplitFig(mode, l1, l2) {
  var inner = "";
  if (mode === 0) {
    var A = [46, 58], B = [46, 178], C = [292, 178];
    var d = [C[0] - A[0], C[1] - A[1]], bb = [B[0] - A[0], B[1] - A[1]], tt = (bb[0] * d[0] + bb[1] * d[1]) / (d[0] * d[0] + d[1] * d[1]);
    var D = [A[0] + tt * d[0], A[1] + tt * d[1]];
    inner = u8ln(A[0], A[1], B[0], B[1]) + u8ln(B[0], B[1], C[0], C[1]) + u8ln(C[0], C[1], A[0], A[1]) + u8ln(B[0], B[1], D[0], D[1]);
    inner += '<path d="M ' + (B[0] + 12) + ' ' + B[1] + ' l 0 -12 l -12 0" fill="none" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
    inner += _txt((B[0] + C[0]) / 2, B[1] + 16, l1, 12, false) + _txt(A[0] - 8, (A[1] + B[1]) / 2, l2, 12, false, "end");
  } else if (mode === 1) {
    var F = [168, 180], T = [168, 54], L = [44, 180], R = [294, 180];
    inner = u8ln(20, 180, 318, 180) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], L[0], L[1]) + u8ln(T[0], T[1], R[0], R[1]);
    inner += _txt((L[0] + F[0]) / 2, 196, l1, 12, false) + _txt((F[0] + R[0]) / 2, 196, l2, 12, false);
  } else {
    inner = '<rect x="52" y="58" width="238" height="118" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>' + u8ln(52, 176, 290, 58);
    inner += _txt(171, 192, l1, 12, false) + _txt(38, 117, l2, 12, false, "end");
  }
  return u8svg(inner, 334, 208, "Diagram made of right triangles");
}
/* Diagram coverage additions (November 2026): helpers for the entries that
   had no figure or only a partial one. Labels come from each draw's own
   values; a "?" marks the unknown the question asks for. */
/* Right triangle ABC, right angled at B, with caller supplied vertex letters
   (pass empty strings where the stem names no vertices). Same layout as
   u8RTFig: angle text at the first vertex, side texts on AB, BC and AC. */
function u8RTFigV(L, angTxt, abTxt, bcTxt, acTxt) {
  var A = [48, 172], B = [256, 172], C = [256, 52];
  var inner = u8ln(A[0], A[1], B[0], B[1]) + u8ln(B[0], B[1], C[0], C[1]) + u8ln(C[0], C[1], A[0], A[1]);
  inner += '<path d="M ' + (B[0] - 13) + ' ' + B[1] + ' l 0 -13 l 13 0" fill="none" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  if (L[0]) inner += _txt(A[0] - 12, A[1] + 6, L[0], 14, true);
  if (L[1]) inner += _txt(B[0] + 4, B[1] + 16, L[1], 14, true);
  if (L[2]) inner += _txt(C[0] + 12, C[1] - 4, L[2], 14, true);
  if (angTxt) inner += _txt(A[0] + 32, A[1] - 12, angTxt, 12, false);
  if (abTxt) inner += _txt((A[0] + B[0]) / 2, A[1] + 17, abTxt, 12, false);
  if (bcTxt) inner += _txt(B[0] + 14, (B[1] + C[1]) / 2, bcTxt, 12, false, "start");
  if (acTxt) inner += _txt((A[0] + C[0]) / 2 - 16, (A[1] + C[1]) / 2 - 8, acTxt, 12, false);
  return u8svg(inner, 330, 205, "Right triangle diagram");
}
/* Two sighting points on the same side of a tree: far angle aF, near angle
   aN, the points sTxt apart, tree height hTxt. The geometry is solved from
   the two angles so the sight lines meet at the treetop. */
function u8TwoElevFig(aF, aN, sTxt, hTxt) {
  var ground = 180, treeX = 288;
  var Hpix = Math.min(132, 232 * u8tan(aF));
  var rF = Hpix / u8tan(aF), rN = Hpix / u8tan(aN);
  var T = [treeX, ground - Hpix], F = [treeX - rF, ground], N = [treeX - rN, ground];
  var inner = u8ln(16, ground, 322, ground) + u8ln(treeX, ground, T[0], T[1]) + u8ln(F[0], F[1], T[0], T[1]) + u8ln(N[0], N[1], T[0], T[1]);
  inner += '<circle cx="' + fmt(F[0], 1) + '" cy="' + F[1] + '" r="3" fill="' + FIG_INK + '"/>';
  inner += '<circle cx="' + fmt(N[0], 1) + '" cy="' + N[1] + '" r="3" fill="' + FIG_INK + '"/>';
  inner += _txt(F[0] + 30, ground - 12, aF + "°", 12, false);
  inner += _txt(N[0] + 30, ground - 12, aN + "°", 12, false);
  inner += _txt((F[0] + N[0]) / 2, ground + 16, sTxt, 12, false);
  inner += _txt(treeX + 13, (ground + T[1]) / 2, hTxt, 12, false, "start");
  return u8svg(inner, 334, 208, "Two angles of elevation to the top of a tree");
}
/* Two points on opposite sides of a lighthouse, p1 and p2 metres from its
   base. The post sits between the points and the spacing follows p1 and p2. */
function u8OppPointsFig(p1, p2) {
  var ground = 168, sc = 228 / (p1 + p2);
  var x0 = (334 - p1 * sc - p2 * sc) / 2, cx = x0 + p1 * sc, x1 = cx + p2 * sc;
  var inner = u8ln(x0 - 24, ground, x1 + 24, ground) + u8ln(cx, ground, cx, 62);
  inner += '<circle cx="' + fmt(cx, 1) + '" cy="58" r="4" fill="' + FIG_ACC + '"/>';
  inner += '<circle cx="' + fmt(x0, 1) + '" cy="' + ground + '" r="3.2" fill="' + FIG_ACC + '"/>';
  inner += '<circle cx="' + fmt(x1, 1) + '" cy="' + ground + '" r="3.2" fill="' + FIG_ACC + '"/>';
  inner += _txt((x0 + cx) / 2, ground + 16, p1 + " m", 12, false);
  inner += _txt((cx + x1) / 2, ground + 16, p2 + " m", 12, false);
  return u8svg(inner, 334, 200, "Two points on opposite sides of a lighthouse");
}

E("u8-elev-or-depress", 8, ["5.1"], 1, "gen", function () {
  var up = pick([true, false]);
  var a = ri(12, 68); if (a === 45) a = 46;
  var upC = [["a kite flyer", "the top of the kite"], ["a hiker", "the top of a lookout tower"], ["a student on the beach", "the top of a lighthouse"], ["a boater", "the top of a cliff"], ["a spectator", "a drone flying overhead"], ["a surveyor", "the top of a wind turbine"]];
  var dnC = [["a lifeguard in a tower", "a swimmer below"], ["a person on a cliff path", "a kayak on the water below"], ["a worker on a balcony", "a cyclist on the street below"], ["a lighthouse keeper", "a fishing boat below"], ["a person at a canyon lookout", "a raft on the river below"], ["a window cleaner on a scaffold", "a coworker on the ground below"]];
  var c = pick(up ? upC : dnC);
  var kind = up ? "angle of elevation" : "angle of depression";
  var other = up ? "angle of depression" : "angle of elevation";
  var comp = 90 - a;
  var q = mcq("From their position, " + c[0] + " looks " + (up ? "up" : "down") + " at " + c[1] + ". The line of sight makes a " + a + "° angle with the horizontal. What is this angle called?",
    { t: "The " + kind + ", " + a + "°", fb: "Yes: the angle is measured from the horizontal, and the line of sight goes " + (up ? "upward, so it is an angle of elevation." : "downward, so it is an angle of depression.") },
    [{ t: "The " + other + ", " + a + "°", fb: "That name is for looking " + (up ? "down" : "up") + " from the horizontal. This line of sight goes " + (up ? "up." : "down.") },
     { t: "The " + kind + ", " + comp + "°", fb: "The size is measured from the horizontal line itself, not from the vertical. The angle with the horizontal is " + a + "°." },
     { t: "The " + other + ", " + comp + "°", fb: "Two slips here: the direction is " + (up ? "up" : "down") + ", and the angle is measured from the horizontal, so it stays " + a + "°." }],
    "The reference line is the horizontal. Because the line of sight points " + (up ? "above" : "below") + " the horizontal, the angle is an <b>" + kind + " of " + a + "°</b>.",
    { mode: up ? "elev" : "depr", a: a });
  q.figure = u8ElevFig(up ? a : a, "", "");
  if (!up) { q.figure = u8DepressFig(a, "", ""); }
  return q;
}, ["First decide whether the line of sight goes up or down from the horizontal.", "Angles of elevation look up from the horizontal; angles of depression look down from it."]);

E("u8-choose-ratio-equation", 8, ["2.1"], 1, "gen", function () {
  var a = ri(18, 66);
  var modes = [
    { giv: "AC", givName: "hypotenuse", givVal: ri(12, 60), find: "BC", findName: "side opposite angle A", fn: "sin", op: "*", calc: function (g) { return g * u8sin(a); } },
    { giv: "AC", givName: "hypotenuse", givVal: ri(12, 60), find: "AB", findName: "side adjacent to angle A", fn: "cos", op: "*", calc: function (g) { return g * u8cos(a); } },
    { giv: "AB", givName: "side adjacent to angle A", givVal: ri(8, 48), find: "BC", findName: "side opposite angle A", fn: "tan", op: "*", calc: function (g) { return g * u8tan(a); } },
    { giv: "BC", givName: "side opposite angle A", givVal: ri(6, 40), find: "AC", findName: "hypotenuse", fn: "sin", op: "/", calc: function (g) { return g / u8sin(a); } },
    { giv: "AB", givName: "side adjacent to angle A", givVal: ri(8, 48), find: "AC", findName: "hypotenuse", fn: "cos", op: "/", calc: function (g) { return g / u8cos(a); } },
    { giv: "BC", givName: "side opposite angle A", givVal: ri(6, 40), find: "AB", findName: "side adjacent to angle A", fn: "tan", op: "/", calc: function (g) { return g / u8tan(a); } }
  ];
  var m = pick(modes);
  var wrongFn = m.fn === "sin" ? "cos" : "sin";
  var otherOp = m.op === "*" ? "/" : "*";
  function eq(fn, op) { return "\\(x = " + m.givVal + " " + (op === "*" ? "\\times" : "\\div") + " \\" + fn + "(" + a + "^\\circ)\\)"; }
  var q = mcq("In right triangle ABC, the right angle is at B and angle A is " + a + "°. The " + m.givName + ", " + m.giv + ", is " + m.givVal + " m. Which equation finds x, the " + m.findName + " (" + m.find + ")?",
    { t: eq(m.fn, m.op), fb: "Yes: " + m.fn + " links the given side and x for angle A, and the equation is solved for x." },
    [{ t: eq(wrongFn, m.op), fb: "That uses \\" + wrongFn + ", which pairs the wrong two sides for angle A. Check which sides " + m.fn + " connects." },
     { t: eq(m.fn, otherOp), fb: "The ratio choice is right, but the rearrangement is backwards. x is " + (m.op === "*" ? "the given side times the ratio." : "the given side divided by the ratio.") },
     { t: eq(m.fn === "tan" ? "cos" : "tan", m.op), fb: "That ratio pairs a different two sides for angle A. Check which sides " + m.fn + " connects." }],
    "For angle A, the two sides involved are the " + m.givName + " and the " + m.findName + ", so use \\(\\" + m.fn + "\\). Rearranged, the equation is " + eq(m.fn, m.op) + ". The correct equation is <b>" + eq(m.fn, m.op) + "</b>.",
    { mode: m.fn + m.op, a: a, g: m.givVal });
  var ab = m.giv === "AB" ? m.givVal + " m" : (m.find === "AB" ? "x" : "");
  var bc = m.giv === "BC" ? m.givVal + " m" : (m.find === "BC" ? "x" : "");
  var ac = m.giv === "AC" ? m.givVal + " m" : (m.find === "AC" ? "x" : "");
  q.figure = u8RTFig(a + "°", ab, bc, ac);
  return q;
}, ["Name the given side and the side you want, relative to the marked angle.", "Pick the ratio that uses exactly those two sides, then solve that ratio equation for x."]);

E("u8-count-right-triangles", 8, ["5.3"], 1, "gen", function () {
  var mode = ri(0, 2);
  var counts = [3, 2, 2];
  var cnt = counts[mode];
  var l1 = ri(6, 38) + " m", l2 = ri(5, 30) + " m";
  var ctx = ["a brace diagram for a gate", "a roof support sketch", "a surveyor's sketch of a plot", "a ramp support diagram", "a bridge truss sketch", "a shelving bracket diagram"][ri(0, 5)];
  var q = mcq("The diagram shows " + ctx + ", built from straight pieces. How many right triangles appear in the diagram?",
    { t: String(cnt), fb: "Yes: count each small right triangle and, where pieces combine into a larger one, the larger right triangle too." },
    [{ t: String(cnt + 1), fb: "That counts one shape that is not a right triangle. Check each three sided shape for a right angle." },
     { t: String(cnt - 1), fb: "That misses one. Besides the small right triangles, check whether pieces combine into a bigger right triangle." },
     { t: String(cnt + 2), fb: "That overcounts. Only shapes with three sides and one right angle count." }],
    mode === 0 ? "The two small triangles formed by the line from the right angle corner are right triangles, and the whole outer triangle is also a right triangle. That makes <b>3</b> right triangles." : "Each of the two triangles in the diagram has one right angle, and together they form a four sided shape, not another triangle. That makes <b>2</b> right triangles.",
    { mode: mode });
  q.figure = u8SplitFig(mode, l1, l2);
  return q;
}, ["Look for right angle corners first, then check each three sided shape.", "Count small triangles, then check whether they combine into a larger right triangle."]);

E("u8-ratio-meaning", 8, ["2.6"], 1, "gen", function () {
  var triples = [["P", "Q", "R"], ["D", "E", "F"], ["J", "K", "L"], ["M", "N", "S"], ["T", "U", "V"], ["W", "X", "Y"], ["A", "B", "C"], ["G", "H", "I"]];
  var tr = pick(triples);
  var A = tr[0], B = tr[1], C = tr[2];
  var opp = C + B, adj = A + B, hyp = A + C;
  function fr(x, y) { return "\\(" + FR(x, y) + "\\)"; }
  var mode = ri(0, 4);
  var prompt, correct, dist, sol;
  if (mode <= 2) {
    var fn = ["sin", "cos", "tan"][mode];
    var right = [fr(opp, hyp), fr(adj, hyp), fr(opp, adj)][mode];
    var others = [fr(opp, hyp), fr(adj, hyp), fr(opp, adj), fr(hyp, opp)].filter(function (s) { return s !== right; });
    prompt = "In triangle " + A + B + C + ", the right angle is at " + B + ". Which ratio equals \\(\\" + fn + " " + A + "\\)?";
    correct = { t: right, fb: "Yes: \\(\\" + fn + " " + A + "\\) pairs the correct two sides for angle " + A + "." };
    dist = others.map(function (s, i) { return { t: s, fb: ["That fraction is a different ratio for angle " + A + ". Match the two sides that \\" + fn + " uses.", "Check the numerator: \\" + fn + " " + A + " starts with the " + (mode === 1 ? "adjacent side." : "opposite side."), "That fraction has the sides in the wrong places for \\" + fn + " " + A + "."][i] }; });
    sol = "For angle " + A + ", the opposite side is " + opp + ", the adjacent side is " + adj + " and the hypotenuse is " + hyp + ". So \\(\\" + fn + " " + A + " = " + right.replace("\\(", "").replace("\\)", "") + "\\). The answer is <b>" + right + "</b>.";
  } else if (mode === 3) {
    prompt = "In a right triangle, which statement about angle " + A + " is true?";
    correct = { t: "\\(\\tan " + A + " = " + FR("\\sin " + A, "\\cos " + A) + "\\)", fb: "Yes: dividing sine by cosine gives opposite over adjacent, which is tangent." };
    dist = [{ t: "\\(\\tan " + A + " = " + FR("\\cos " + A, "\\sin " + A) + "\\)", fb: "That fraction is upside down: it gives adjacent over opposite, not tangent." },
            { t: "\\(\\tan " + A + " = \\sin " + A + " \\times \\cos " + A + "\\)", fb: "Tangent is a quotient of sine and cosine, not a product." },
            { t: "\\(\\tan " + A + " = \\sin " + A + " + \\cos " + A + "\\)", fb: "Tangent is a quotient of sine and cosine, not a sum." }];
    sol = "\\(\\sin " + A + "\\) is opposite over hypotenuse and \\(\\cos " + A + "\\) is adjacent over hypotenuse. Dividing them cancels the hypotenuse and leaves opposite over adjacent, which is \\(\\tan " + A + "\\). The answer is <b>\\(\\tan " + A + " = " + FR("\\sin " + A, "\\cos " + A) + "\\)</b>.";
  } else {
    var ang = pick([28, 35, 41, 53, 62]);
    prompt = "Angle " + A + " in a right triangle measures " + ang + "°. Which value equals \\(\\cos " + A + "\\)?";
    correct = { t: "\\(\\sin(" + (90 - ang) + "^\\circ)\\)", fb: "Yes: the two acute angles add to 90°, and cosine of one equals sine of the other." };
    dist = [{ t: "\\(\\sin(" + ang + "^\\circ)\\)", fb: "That equals the cosine of the other acute angle, not of " + A + " itself (unless the angle is 45°)." },
            { t: "\\(\\cos(" + (90 - ang) + "^\\circ)\\)", fb: "That equals \\(\\sin " + A + "\\), the complement pairing the other way around." },
            { t: "\\(\\tan(" + (90 - ang) + "^\\circ)\\)", fb: "Tangent pairs opposite with adjacent; it does not match a cosine value in general." }];
    sol = "The acute angles of a right triangle are complementary, so \\(\\cos " + A + " = \\sin(90^\\circ - " + ang + "^\\circ) = \\sin(" + (90 - ang) + "^\\circ)\\). The answer is <b>\\(\\sin(" + (90 - ang) + "^\\circ)\\)</b>.";
  }
  var q = mcq(prompt, correct, dist, sol, { mode: mode, tri: tr.join("") });
  if (mode <= 2) { q.figure = u8RTFigV(tr, A, adj, opp, hyp); }
  else if (mode === 3) { q.figure = u8RTFigV([A, "", ""], A, "", "", ""); }
  else { q.figure = u8RTFigV([A, "", ""], ang + "°", "", "", ""); }
  return q;
}, ["Name the sides relative to the marked angle: opposite, adjacent, hypotenuse.", "Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, tangent is opposite over adjacent."]);

E("u8-elevation-height-mc", 8, ["5.1", "2.1"], 2, "gen", function () {
  var a = ri(24, 58), d = ri(18, 85);
  var eye = pick([0, 0, 1.4, 1.5, 1.6, 1.7]);
  var ctx = pick([["communications tower", "a service road marker"], ["office building", "a point on the sidewalk"], ["flagpole", "a marker on the field"], ["wind turbine", "the fence gate"], ["water tower", "a point in the parking lot"], ["church steeple", "a point on the front lawn"]]);
  var raw = d * u8tan(a), ans = raw + eye;
  var errs = [{ v: d / u8tan(a), fb: "That divides by the tangent. The height is the side opposite the angle, so the distance is multiplied by the tangent." },
              { v: d * u8sin(a), fb: "That uses sine, which needs the hypotenuse. The known side here lies along the ground, so tangent is the ratio to use." },
              eye > 0 ? { v: raw, fb: "That is the height above the measuring point only. The angle was measured from instrument height, so that height still has to be added." } : { v: d * u8tan(90 - a), fb: "That uses the complement of the angle. The given angle is measured from the horizontal ground line, so use it as it stands." }];
  var prompt = "A surveyor stands " + d + " m from the base of a " + ctx[0] + ", at " + ctx[1] + ". The angle of elevation to the top is " + a + "°" + (eye > 0 ? ", measured with an instrument held " + fmtF(eye, 1) + " m above the ground" : "") + ". What is the height of the " + ctx[0].split(" ").pop() + "?";
  var sol = "The ground distance is adjacent to the angle and the height is opposite it, so use tangent. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR("h", d) + " \\\\ h &= " + d + " \\times \\tan(" + a + "^\\circ) \\\\ &= " + fmt(raw) + " \\text{ m}" + (eye > 0 ? " \\\\ \\text{total height} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m}" : "") + " \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: tangent with the ground distance, " + (eye > 0 ? "then add the instrument height." : "as shown in the worked solution."), sol, { a: a, d: d, eye: eye });
  q.figure = u8ElevFig(a, d + " m", "?");
  return q;
}, ["The ground distance and the height form the adjacent and opposite sides of the angle.", "Use tangent, then remember anything the angle was measured from above ground level."]);

E("u8-depression-distance-mc", 8, ["5.1", "2.2"], 2, "gen", function () {
  var a = ri(18, 55), h = ri(20, 120);
  var ctx = pick([["cliff lookout", "a kayak on the water"], ["lighthouse gallery", "a fishing boat"], ["hotel balcony", "a paddle boarder on the pond"], ["observation tower", "a trail marker in the valley"], ["ferry deck", "a navigation buoy"]]);
  var ans = h / u8tan(a);
  var errs = [{ v: h * u8tan(a), fb: "That multiplies by the tangent, which would find a height from a distance. Here the height is known, so rearrange and divide." },
              { v: h * u8sin(a), fb: "That uses sine with the height as if it were part of a sloped side. The sight line is sloped, but the height and the water distance are the two legs." },
              { v: h / u8tan(90 - a), fb: "That uses the complement of the angle. An angle of depression equals the angle at the far point measured from the water, so use the given angle directly." }];
  var prompt = "From a " + ctx[0] + " that is " + h + " m above the water, the angle of depression to " + ctx[1] + " is " + a + "°. How far is the " + ctx[1].split(" ").pop() + " from the base of the structure, measured along the water?";
  var sol = "The angle of depression from the top equals the angle of elevation from the water, so the height and the distance are opposite and adjacent in the same right triangle. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR(h, "d") + " \\\\ d &= " + FR(h, "\\tan(" + a + "^\\circ)") + " \\\\ &= " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: the height is opposite the angle and the water distance is adjacent, so the distance is the height divided by the tangent.", sol, { a: a, h: h });
  q.figure = u8DepressFig(a, h + " m", "?");
  return q;
}, ["Move the angle of depression down to the far point: it matches the angle of elevation there.", "Set up tangent with the known height, then rearrange to solve for the distance."]);

E("u8-two-triangles-gap-mc", 8, ["5.2", "5.3"], 2, "gen", function () {
  var h = ri(18, 55), a1 = ri(22, 48), a2 = ri(24, 50);
  var ctx = pick([["lighthouse", "two fishing boats"], ["lookout tower", "two trail markers"], ["harbour crane", "two work boats"], ["cliff top station", "two kayaks"]]);
  var d1 = h / u8tan(a1), d2 = h / u8tan(a2), ans = d1 + d2;
  var errs = [{ v: Math.abs(d1 - d2), fb: "That subtracts the two distances, which fits points on the same side. These two are on opposite sides, so the gap is the sum." },
              { v: h * (u8tan(a1) + u8tan(a2)), fb: "That multiplies the height by the tangents. Each ground distance is the height divided by its tangent." },
              { v: Math.max(d1, d2), fb: "That is only the distance to the farther point. The gap runs from one point, through the base, to the other point." }];
  var prompt = "From the top of a " + h + " m " + ctx[0] + ", the angles of depression to " + ctx[1] + " on opposite sides of the structure are " + a1 + "° and " + a2 + "°. How far apart are the two " + ctx[1].split(" ").pop() + "?";
  var sol = "Each sight line forms its own right triangle with the structure, and the two triangles share the height of " + h + " m. \\[ \\begin{aligned} d_1 &= " + FR(h, "\\tan(" + a1 + "^\\circ)") + " = " + fmt(d1) + " \\text{ m} \\\\ d_2 &= " + FR(h, "\\tan(" + a2 + "^\\circ)") + " = " + fmt(d2) + " \\text{ m} \\\\ \\text{gap} &= " + fmt(d1) + " + " + fmt(d2) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The points are on opposite sides, so the distances add. The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: one tangent calculation for each triangle, then add because the points are on opposite sides.", sol, { h: h, a1: a1, a2: a2 });
  q.figure = u8TwoOppFig(a1, a2, h + " m");
  return q;
}, ["Split the picture into two right triangles that share the height.", "Find the ground distance in each triangle, then decide from the diagram whether to add or subtract."]);

E("u8-fix-ratio-error", 8, ["2.5", "5.4"], 2, "gen", function () {
  var modes = [
    { text: function (a, g) { return "A ladder leans against a wall. Its foot is " + g + " m from the wall and the ladder makes a " + a + "° angle with the ground. A student writes \\(h = " + g + " \\times \\cos(" + a + "^\\circ)\\) to find the height h the ladder reaches."; }, fn: "tan", op: "*", wrong: "\\(\\cos\\)", givName: "ground distance (adjacent)", findName: "height (opposite)" },
    { text: function (a, g) { return "A kite string is " + g + " m long and makes a " + a + "° angle with the ground. A student writes \\(h = " + g + " \\div \\sin(" + a + "^\\circ)\\) to find the height h of the kite."; }, fn: "sin", op: "*", wrong: "division by \\(\\sin\\)", givName: "string (hypotenuse)", findName: "height (opposite)" },
    { text: function (a, g) { return "A roof rafter is " + g + " m long and rises at " + a + "° to the horizontal. A student writes \\(r = " + g + " \\times \\sin(" + a + "^\\circ)\\) to find the horizontal run r of the rafter."; }, fn: "cos", op: "*", wrong: "\\(\\sin\\)", givName: "rafter (hypotenuse)", findName: "run (adjacent)" },
    { text: function (a, g) { return "A student stands " + g + " m from a tower and measures a " + a + "° angle of elevation to the top. The student writes \\(h = " + g + " \\div \\tan(" + a + "^\\circ)\\) to find the height h of the tower."; }, fn: "tan", op: "*", wrong: "division by \\(\\tan\\)", givName: "ground distance (adjacent)", findName: "height (opposite)" },
    { text: function (a, g) { return "A guy wire runs from the top of a pole to a ground anchor " + g + " m from the pole, making a " + a + "° angle with the ground. A student writes \\(L = " + g + " \\times \\cos(" + a + "^\\circ)\\) to find the wire length L."; }, fn: "cos", op: "/", wrong: "\\(\\times \\cos\\)", givName: "ground distance (adjacent)", findName: "wire (hypotenuse)" },
    { text: function (a, g) { return "A playground slide drops " + g + " m and makes a " + a + "° angle with the ground. A student writes \\(L = " + g + " \\times \\sin(" + a + "^\\circ)\\) to find the slide length L."; }, fn: "sin", op: "/", wrong: "\\(\\times \\sin\\)", givName: "drop (opposite)", findName: "slide (hypotenuse)" }
  ];
  var m = pick(modes);
  var a = ri(24, 58), g = ri(6, 45);
  var sym = m.findName.split(" ")[0];
  var target = sym === "height" ? "h" : (sym === "run" ? "r" : "L");
  function eq(fn, op) { return "\\(" + target + " = " + g + " " + (op === "*" ? "\\times" : "\\div") + " \\" + fn + "(" + a + "^\\circ)\\)"; }
  var altFn = m.fn === "tan" ? "sin" : "tan";
  var altOp = m.op === "*" ? "/" : "*";
  var q = mcq(m.text(a, g) + " Which equation is correct?",
    { t: eq(m.fn, m.op), fb: "Yes: the given side is the " + m.givName + " and the wanted side is the " + m.findName + ", so \\(\\" + m.fn + "\\) rearranged gives this." },
    [{ t: eq(m.fn, altOp), fb: "The ratio is right but the operation is flipped. Solve the ratio equation for the wanted side before choosing." },
     { t: eq(altFn, m.op), fb: "That ratio pairs a different two sides. The sides here are the " + m.givName + " and the " + m.findName + "." },
     { t: eq(altFn, altOp), fb: "Both the ratio and the rearrangement are off. Start from the two sides named in the problem." }],
    "The student's slip involves " + m.wrong + ". The sides in play are the " + m.givName + " and the " + m.findName + ", which belong to \\(\\" + m.fn + "\\). Solved for the wanted side, the correct equation is <b>" + eq(m.fn, m.op) + "</b>.",
    { mode: modes.indexOf(m), a: a, g: g });
  var mi = modes.indexOf(m);
  if (mi === 3) { q.figure = u8ElevFig(a, g + " m", "?"); }
  else {
    var abAr = [g + " m", "", "?", "", g + " m", ""];
    var bcAr = ["?", "?", "", "", "", g + " m"];
    var acAr = ["", g + " m", g + " m", "", "?", "?"];
    q.figure = u8RTFigV(["", "", ""], a + "°", abAr[mi], bcAr[mi], acAr[mi]);
  }
  return q;
}, ["Ignore the student's working at first: name the given and wanted sides yourself.", "Choose the ratio for those two sides, then solve it for the wanted side."]);

E("u8-trig-in-trades", 8, ["2.3"], 2, "gen", function () {
  var mode = ri(0, 4);
  var prompt, correct, dist, sol;
  if (mode === 0 || mode === 3) {
    var rise = ri(2, 9), run = ri(8, 30); if (rise === run) run += 3;
    var who = mode === 0 ? ["A carpenter", "a wheelchair ramp", "steepness angle"] : ["A stair builder", "a set of stairs", "angle of the stair stringer"];
    prompt = who[0] + " builds " + who[1] + " with a rise of " + rise + " m over a run of " + run + " m. Which calculation gives the " + who[2] + " \\(\\theta\\)?";
    correct = { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Yes: rise over run is a tangent ratio, so the inverse tangent returns the angle." };
    dist = [{ t: "\\(\\theta = \\sin^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Sine needs the hypotenuse. Rise and run are the two legs, which is tangent territory." },
            { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(run, rise) + "\\right)\\)", fb: "That flips the ratio, which gives the complement of the angle instead." },
            { t: "\\(\\theta = \\cos^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Cosine pairs the adjacent side with the hypotenuse, and no hypotenuse is given here." }];
    sol = "Rise and run are the opposite and adjacent sides, so their ratio is a tangent. The worker uses the inverse tangent: \\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right) \\approx " + fmt(Math.atan(rise / run) / U8R) + "^\\circ\\). The answer is <b>\\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right)\\)</b>.";
    var q = mcq(prompt, correct, dist, sol, { mode: mode, rise: rise, run: run });
    q.figure = u8RTFigV(["", "", ""], "?", run + " m", rise + " m", "");
    return q;
  }
  if (mode === 1) {
    var a = ri(26, 48), d = ri(15, 60);
    prompt = "A surveyor stands " + d + " m from a building and measures a " + a + "° angle of elevation to the roofline. Which calculation gives the height h of the building above the surveyor's instrument?";
    correct = { t: "\\(h = " + d + " \\times \\tan(" + a + "^\\circ)\\)", fb: "Yes: surveyors turn a measured distance and angle into a height with tangent, since the height is opposite the angle." };
    dist = [{ t: "\\(h = " + d + " \\times \\sin(" + a + "^\\circ)\\)", fb: "Sine would need the sloped sight distance, which the surveyor did not measure." },
            { t: "\\(h = " + d + " \\div \\tan(" + a + "^\\circ)\\)", fb: "That rearrangement finds a distance from a height, the reverse of this job." },
            { t: "\\(h = " + d + " \\times \\cos(" + a + "^\\circ)\\)", fb: "Cosine pairs the ground distance with a sloped side, not with the vertical height." }];
    sol = "The measured ground distance is adjacent to the angle and the height is opposite, so the surveyor uses tangent: \\(h = " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(d * u8tan(a)) + "\\) m. The answer is <b>\\(h = " + d + " \\times \\tan(" + a + "^\\circ)\\)</b>.";
    var q = mcq(prompt, correct, dist, sol, { mode: mode, a: a, d: d });
    q.figure = u8ElevFig(a, d + " m", "?");
    return q;
  }
  if (mode === 2) {
    var a2 = ri(24, 44), L = ri(4, 12);
    prompt = "An installer tilts a solar panel of length " + L + " m at " + a2 + "° to a flat roof. Which calculation gives h, the height of the raised edge above the roof?";
    correct = { t: "\\(h = " + L + " \\times \\sin(" + a2 + "^\\circ)\\)", fb: "Yes: the panel is the hypotenuse and the raised edge is opposite the tilt angle, so sine does the job." };
    dist = [{ t: "\\(h = " + L + " \\times \\cos(" + a2 + "^\\circ)\\)", fb: "Cosine would give the distance along the roof under the panel, not the raised height." },
            { t: "\\(h = " + L + " \\div \\sin(" + a2 + "^\\circ)\\)", fb: "Dividing would make h longer than the panel itself, but a leg cannot exceed the hypotenuse." },
            { t: "\\(h = " + L + " \\times \\tan(" + a2 + "^\\circ)\\)", fb: "Tangent needs the roof distance under the panel, which is not the given length." }];
    sol = "The panel is the hypotenuse and the raised edge is the side opposite the " + a2 + "° angle, so the installer uses sine: \\(h = " + L + " \\times \\sin(" + a2 + "^\\circ) = " + fmt(L * u8sin(a2)) + "\\) m. The answer is <b>\\(h = " + L + " \\times \\sin(" + a2 + "^\\circ)\\)</b>.";
    var q = mcq(prompt, correct, dist, sol, { mode: mode, a: a2, L: L });
    q.figure = u8RTFigV(["", "", ""], a2 + "°", "", "?", L + " m");
    return q;
  }
  var drop = ri(1, 4), len = ri(10, 40);
  prompt = "A plumber runs a drain pipe that drops " + drop + " m over a horizontal run of " + len + " m. Which calculation gives the pipe's angle \\(\\theta\\) below the horizontal?";
  correct = { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right)\\)", fb: "Yes: drop over run is a tangent ratio, and the inverse tangent turns it into the angle." };
  dist = [{ t: "\\(\\theta = \\tan^{-1}\\left(" + FR(len, drop) + "\\right)\\)", fb: "That flips drop and run, giving the angle from the vertical instead of from the horizontal." },
          { t: "\\(\\theta = \\sin^{-1}\\left(" + FR(drop, len) + "\\right)\\)", fb: "Sine would need the sloped pipe length itself, not the horizontal run." },
          { t: "\\(\\theta = " + FR(drop, len) + " \\times 90^\\circ\\)", fb: "A ratio is not a fraction of a right angle. Angles from ratios come from an inverse trig function." }];
  sol = "Drop and run are opposite and adjacent sides, a tangent ratio. The plumber uses the inverse tangent: \\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right) \\approx " + fmt(Math.atan(drop / len) / U8R) + "^\\circ\\). The answer is <b>\\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right)\\)</b>.";
  var q = mcq(prompt, correct, dist, sol, { mode: mode, drop: drop, len: len });
  q.figure = u8RTFigV(["", "", ""], "?", len + " m", drop + " m", "");
  return q;
}, ["Decide what the worker knows and what the worker needs, as sides of a right triangle.", "Match those two sides to a ratio; an angle answer needs an inverse ratio."]);

E("u8-reasonable-or-not", 8, ["5.4"], 2, "gen", function () {
  var mode = ri(0, 3);
  var prompt, correct, dist, sol;
  if (mode === 0) {
    var hyp = ri(30, 80), extra = ri(3, 18), claim = hyp + extra;
    var ctx = pick([["cable car line", "support tower"], ["zipline", "platform"], ["ferry sight line", "harbour tower"]]);
    prompt = "A two-triangle problem uses a " + ctx[0] + ". In one triangle the sloped line is " + hyp + " m long, and a student reports that the vertical height in that same triangle is " + claim + " m. Why is the student's result not reasonable?";
    correct = { t: "A leg of a right triangle cannot be longer than its hypotenuse, and " + claim + " m is longer than the " + hyp + " m sloped side.", fb: "Yes: the hypotenuse is always the longest side of a right triangle." };
    dist = [{ t: "The height should have been rounded to the nearest metre, and rounding it would have fixed the problem.", fb: "Rounding shifts a value slightly; it cannot push a leg past the hypotenuse." },
            { t: "The two triangles in the problem must have the same height, since they share the same structure and the same kind.", fb: "Nothing requires the two triangles to match. The problem is the size compared with the hypotenuse." },
            { t: "Heights in trig problems are always less than 25 m, so any taller result is wrong on that ground alone.", fb: "There is no such limit. The check that fails here is leg versus hypotenuse." }];
    sol = "In the triangle named, the " + hyp + " m sloped side is the hypotenuse. Every leg must be shorter than the hypotenuse, so a height of " + claim + " m is impossible. The result is <b>not reasonable: a leg cannot exceed the hypotenuse</b>.";
  } else if (mode === 1) {
    var ang = ri(94, 138);
    var ctx2 = pick([["roof truss", "peak"], ["ramp brace", "top corner"], ["lookout", "sight post"]]);
    prompt = "Solving a two-triangle problem about a " + ctx2[0] + ", a student reports that one of the acute angles in a right triangle is " + ang + "°. Why is the student's result not reasonable?";
    correct = { t: "The acute angles of a right triangle are each between 0° and 90°, and " + ang + "° is past 90°.", fb: "Yes: with one angle already 90°, the other two must add to 90°, so each is under 90°." };
    dist = [{ t: "Angles in trig problems must be whole numbers of degrees, with no decimals allowed in the answer.", fb: ang + "° is a whole number, so that is not the issue. The issue is its size." },
            { t: "The angle should have been measured from the vertical, not from the horizontal line.", fb: "Measuring from the vertical gives the complement, which would be negative here. The reported size itself breaks the 90° limit for an acute angle." },
            { t: "The two acute angles of a right triangle are always equal to each other, in every right triangle.", fb: "They are equal only in an isosceles right triangle. They must add to 90°, not match each other." }];
    sol = "A right triangle already has a 90° angle, so the other two angles add to 90° and each one is less than 90°. A reported acute angle of " + ang + "° breaks that. The result is <b>not reasonable: an acute angle of a right triangle must be under 90°</b>.";
  } else if (mode === 2) {
    var p1 = ri(20, 60), p2 = ri(15, 55), claim2 = Math.min(p1, p2) - ri(2, 8);
    prompt = "Two boats lie on opposite sides of a lighthouse. Their distances from the base are " + p1 + " m and " + p2 + " m. A student says the boats are " + claim2 + " m apart. Why is the student's result not reasonable?";
    correct = { t: "The distance apart is the sum " + p1 + " + " + p2 + " = " + (p1 + p2) + " m, so it must be larger than either single distance.", fb: "Yes: with the base between the boats, the gap covers both distances end to end." };
    dist = [{ t: "The student should have averaged the two distances, (" + p1 + " + " + p2 + ") / 2 = " + fmt((p1 + p2) / 2) + " m, instead of adding them.", fb: "An average would still be smaller than the full gap. Opposite sides means the distances add." },
            { t: "Distances at sea are measured in kilometres, not metres, so the answer is in the wrong unit.", fb: "The unit choice does not change the comparison. The claimed gap is smaller than one of its own parts." },
            { t: "The boats must be the same distance from the lighthouse, since they are measured from the same base point.", fb: "Nothing requires that. The check that fails is part versus whole: the whole gap must exceed each part." }];
    sol = "The base of the lighthouse sits between the boats, so the gap is the sum of the two parts: " + p1 + " + " + p2 + " = " + (p1 + p2) + " m. A claim of " + claim2 + " m is less than the " + Math.min(p1, p2) + " m part alone. The result is <b>not reasonable: the whole must exceed each of its parts</b>.";
  } else {
    var str = ri(25, 60), claim3 = str + ri(4, 20);
    prompt = "A kite is flown on a " + str + " m string, and the vertical height is found from one triangle of a two-triangle problem. A student reports the kite's height as " + claim3 + " m. Why is the student's result not reasonable?";
    correct = { t: "The string is the hypotenuse of the triangle, so the height, a leg, must be less than " + str + " m.", fb: "Yes: no leg of a right triangle can be longer than the hypotenuse." };
    dist = [{ t: "Kites never fly higher than 20 m, no matter how long the string is or how strong the wind blows.", fb: "There is no fixed height limit for a kite. The failed check is the comparison with the string length." },
            { t: "The height should equal the string length when the string is tight and held firmly.", fb: "Height equals string length only if the string is straight up, which would leave no triangle at all." },
            { t: "The student forgot to convert the string length to centimetres before reporting the height.", fb: "A unit conversion keeps the same physical length. It cannot make a leg longer than the hypotenuse." }];
    sol = "The string forms the hypotenuse of the right triangle and the height is one leg. A leg is always shorter than the hypotenuse, so the height must be under " + str + " m, not " + claim3 + " m. The result is <b>not reasonable: a leg cannot exceed the hypotenuse</b>.";
  }
  var q = mcq(prompt, correct, dist, sol, { mode: mode });
  if (mode === 2) { q.figure = u8OppPointsFig(p1, p2); }
  return q;
}, ["Test the claimed answer against the triangle itself: side lengths and angle sizes have hard limits.", "Ask whether any leg beats the hypotenuse, any acute angle passes 90°, or a whole comes out smaller than a part."]);

E("u8-cr-elevation-height", 8, ["5.1", "2.2"], 2, "gen", function () {
  var a = ri(26, 56), d = ri(22, 78), eye = pick([1.3, 1.4, 1.5, 1.6, 1.7]);
  var ctx = pick([["tree in a park", "a park ranger"], ["school flagpole", "a student"], ["water tower", "a maintenance worker"], ["cell tower", "a technician"]]);
  var raw = d * u8tan(a), ans = raw + eye;
  var q = numq(ctx[1] + " uses a clinometer held " + fmtF(eye, 1) + " m above the ground, standing " + d + " m from the base of a " + ctx[0] + ". The angle of elevation to the top is " + a + "°. Find the total height of the " + ctx[0].split(" ").pop() + ", in metres. Give your answer to one decimal place.",
    ans, 0.3,
    "The height above the clinometer and the ground distance are opposite and adjacent, so use tangent, then add the clinometer height. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR("h", d) + " \\\\ h &= " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(raw) + " \\text{ m} \\\\ \\text{total height} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { a: a, d: d, eye: eye });
  q.figure = u8ElevFig(a, d + " m", "?");
  return q;
}, ["The angle, the ground distance and the height above the instrument form a right triangle.", "Use tangent to find the height above the instrument, then add the instrument height."]);

E("u8-cr-find-angle", 8, ["2.2", "5.1"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var rise = ri(1, 6), run = ri(6, 24), ang = Math.atan(rise / run) / U8R;
    var q = numq("A garden ramp rises " + rise + " m over a horizontal run of " + run + " m. Find the angle the ramp makes with the ground, in degrees, to one decimal place.",
      ang, 0.4,
      "Rise and run are opposite and adjacent, so the angle comes from the inverse tangent. \\[ \\begin{aligned} \\tan(\\theta) &= " + FR(rise, run) + " \\\\ \\theta &= \\tan^{-1}\\left(" + FR(rise, run) + "\\right) \\\\ &= " + fmt(ang) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang, 1) + "°</b>.",
      { mode: mode, rise: rise, run: run });
    q.figure = u8RTFigV(["", "", ""], "?", run + " m", rise + " m", "");
    return q;
  }
  if (mode === 1) {
    var str = ri(30, 90), ht = ri(12, str - 8), ang2 = Math.asin(ht / str) / U8R;
    var q = numq("A kite is flying " + ht + " m above the ground on a tight string " + str + " m long. Find the angle the string makes with the ground, in degrees, to one decimal place.",
      ang2, 0.4,
      "The height is opposite the angle and the string is the hypotenuse, so the angle comes from the inverse sine. \\[ \\begin{aligned} \\sin(\\theta) &= " + FR(ht, str) + " \\\\ \\theta &= \\sin^{-1}\\left(" + FR(ht, str) + "\\right) \\\\ &= " + fmt(ang2) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang2, 1) + "°</b>.",
      { mode: mode, str: str, ht: ht });
    q.figure = u8RTFigV(["", "", ""], "?", "", ht + " m", str + " m");
    return q;
  }
  var len = ri(4, 9), foot = ri(1, len - 1), ang3 = Math.acos(foot / len) / U8R;
  var q = numq("A ladder " + len + " m long leans against a wall with its foot " + foot + " m from the wall. Find the angle the ladder makes with the ground, in degrees, to one decimal place.",
    ang3, 0.4,
    "The ground distance is adjacent to the angle and the ladder is the hypotenuse, so the angle comes from the inverse cosine. \\[ \\begin{aligned} \\cos(\\theta) &= " + FR(foot, len) + " \\\\ \\theta &= \\cos^{-1}\\left(" + FR(foot, len) + "\\right) \\\\ &= " + fmt(ang3) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang3, 1) + "°</b>.",
    { mode: mode, len: len, foot: foot });
  q.figure = u8RTFigV(["", "", ""], "?", foot + " m", "", len + " m");
  return q;
}, ["Name the two given sides relative to the angle you want.", "Build the ratio from those sides, then use the matching inverse trig function."]);

E("u8-cr-direct-side", 8, ["2.1"], 2, "gen", function () {
  var modes = [
    { ctx: function (a, g) { return "A crane cable " + g + " m long runs from the top of a boom down to a load, making a " + a + "° angle with the horizontal. Find the vertical drop from the boom top to the load, in metres."; }, calc: function (a, g) { return g * u8sin(a); }, fn: "sin", rel: "the cable is the hypotenuse and the drop is opposite the angle" },
    { ctx: function (a, g) { return "A conveyor belt " + g + " m long is inclined at " + a + "° to the floor. Find the horizontal distance the belt covers, in metres."; }, calc: function (a, g) { return g * u8cos(a); }, fn: "cos", rel: "the belt is the hypotenuse and the floor distance is adjacent to the angle" },
    { ctx: function (a, g) { return "From a point " + g + " m from the base of a silo, the angle of elevation to the top is " + a + "°. Find the height of the silo, in metres."; }, calc: function (a, g) { return g * u8tan(a); }, fn: "tan", rel: "the ground distance is adjacent and the height is opposite" },
    { ctx: function (a, g) { return "A kite is " + g + " m above the ground and its string makes a " + a + "° angle with the ground. Find the length of string let out, in metres."; }, calc: function (a, g) { return g / u8sin(a); }, fn: "sin", rel: "the height is opposite the angle and the string is the hypotenuse" },
    { ctx: function (a, g) { return "A guy wire is anchored " + g + " m from the base of a pole and makes a " + a + "° angle with the ground. Find the length of the wire, in metres."; }, calc: function (a, g) { return g / u8cos(a); }, fn: "cos", rel: "the ground distance is adjacent and the wire is the hypotenuse" },
    { ctx: function (a, g) { return "The top of a " + g + " m tall wharf light is seen from a boat. The angle of elevation from the boat is " + a + "°. Find how far the boat is from the wharf, in metres."; }, calc: function (a, g) { return g / u8tan(a); }, fn: "tan", rel: "the height is opposite the angle and the water distance is adjacent" }
  ];
  var m = pick(modes), a = ri(22, 62), g = ri(8, 60), ans = m.calc(a, g);
  var divMode = (modes.indexOf(m) >= 3);
  var expr = divMode ? (g + " \\div \\" + m.fn + "(" + a + "^\\circ)") : (g + " \\times \\" + m.fn + "(" + a + "^\\circ)");
  var q = numq(m.ctx(a, g) + " Give your answer to one decimal place.",
    ans, 0.3,
    "Here " + m.rel + ", so use \\(\\" + m.fn + "\\) and solve for the unknown side. \\[ \\begin{aligned} \\text{unknown} &= " + expr + " \\\\ &= " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { mode: modes.indexOf(m), a: a, g: g });
  var mi = modes.indexOf(m);
  if (mi === 2) { q.figure = u8ElevFig(a, g + " m", "?"); }
  else if (mi === 5) { q.figure = u8ElevFig(a, "?", g + " m"); }
  else {
    var abAr = ["", "?", "", "", g + " m", ""];
    var bcAr = ["?", "", "", g + " m", "", ""];
    var acAr = [g + " m", g + " m", "", "?", "?", ""];
    q.figure = u8RTFigV(["", "", ""], a + "°", abAr[mi], bcAr[mi], acAr[mi]);
  }
  return q;
}, ["Name the given side and the wanted side relative to the angle.", "Use the one ratio that contains exactly those two sides, then solve for the unknown."]);

E("u8-cr-same-side-gap", 8, ["5.2"], 2, "gen", function () {
  var h = ri(24, 70), aN = ri(34, 58), aF = aN - ri(9, 20);
  var ctx = pick([["lighthouse", "ferries"], ["coast guard tower", "sailboats"], ["harbour light", "kayaks"], ["lookout platform", "tour boats"]]);
  var dN = h / u8tan(aN), dF = h / u8tan(aF), ans = dF - dN;
  var q = numq("From the top of a " + h + " m " + ctx[0] + ", the angles of depression to two " + ctx[1] + " on the same side of the structure are " + aN + "° for the nearer one and " + aF + "° for the farther one. Find the distance between the two " + ctx[1] + ", in metres, to one decimal place.",
    ans, 0.35,
    "Both sight lines form right triangles sharing the height of " + h + " m. \\[ \\begin{aligned} d_{\\text{near}} &= " + FR(h, "\\tan(" + aN + "^\\circ)") + " = " + fmt(dN) + " \\text{ m} \\\\ d_{\\text{far}} &= " + FR(h, "\\tan(" + aF + "^\\circ)") + " = " + fmt(dF) + " \\text{ m} \\\\ \\text{gap} &= " + fmt(dF) + " - " + fmt(dN) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The points are on the same side, so the distances subtract. The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { h: h, aN: aN, aF: aF });
  q.figure = u8TwoSameFig(aN, aF, h + " m");
  return q;
}, ["Each sight line makes its own right triangle with the structure, and both share the height.", "Find both ground distances from the base, then combine them the way the diagram shows."]);

E("u8-cr-shared-side-stage", 8, ["5.2", "2.4"], 2, "gen", function () {
  var d = ri(25, 70), a1 = ri(20, 38), a2 = a1 + ri(8, 18);
  var ctx = pick([["antenna", "office building"], ["flagpole", "school"], ["sign", "community centre"], ["weather mast", "fire hall"]]);
  var hB = d * u8tan(a1), hT = d * u8tan(a2), ans = hT - hB;
  var q = numq("An " + ctx[0] + " stands on the roof of a " + ctx[1] + ". From a point " + d + " m from the base of the building, the angle of elevation to the roofline is " + a1 + "° and the angle of elevation to the top of the " + ctx[0] + " is " + a2 + "°. Find the height of the " + ctx[0] + " itself, in metres, to one decimal place.",
    ans, 0.35,
    "Both angles are measured from the same point, so both triangles share the ground distance of " + d + " m. \\[ \\begin{aligned} h_{\\text{roof}} &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(hB) + " \\text{ m} \\\\ h_{\\text{top}} &= " + d + " \\times \\tan(" + a2 + "^\\circ) = " + fmt(hT) + " \\text{ m} \\\\ \\text{" + ctx[0] + "} &= " + fmt(hT) + " - " + fmt(hB) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { d: d, a1: a1, a2: a2 });
  q.figure = u8ElevFig(a2, d + " m", "?");
  return q;
}, ["Both sight lines start at the same ground point, so the two triangles share the ground distance.", "Find the height to the roofline and the height to the very top, then subtract."]);

E("u8-cr-clinometer-two-readings", 8, ["5.1", "2.4"], 2, "gen", function () {
  var mode = ri(0, 1);
  if (mode === 0) {
    var d = ri(15, 45), a = ri(30, 55), eye = pick([1.4, 1.5, 1.6]);
    var raw = d * u8tan(a), ans = raw + eye;
    var q0 = numq("For a clinometer activity, a student stands " + d + " m from a red maple and reads a " + a + "° angle of elevation to the top. The clinometer is " + fmtF(eye, 1) + " m above the ground. Find the height of the tree, in metres, to one decimal place.",
      ans, 0.3,
      "The clinometer reading gives the height above the instrument first. \\[ \\begin{aligned} h_{\\text{above}} &= " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(raw) + " \\text{ m} \\\\ \\text{tree} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
      { mode: mode, d: d, a: a, eye: eye });
    q0.figure = u8ElevFig(a, d + " m", "?");
    return q0;
  }
  var s = ri(8, 25), aF = ri(18, 32), aN = aF + ri(10, 22);
  var h = s / (1 / u8tan(aF) - 1 / u8tan(aN));
  var x = h / u8tan(aN), xf = h / u8tan(aF);
  var q1 = numq("For a clinometer activity, a student cannot reach the base of a tall spruce. From a first spot the angle of elevation to the top is " + aF + "°. The student walks " + s + " m straight toward the tree and reads " + aN + "°. Ignoring the small clinometer height, find the height of the tree, in metres, to one decimal place.",
    h, 0.5,
    "Let h be the tree height and x the distance from the nearer spot to the tree. Both readings form right triangles sharing h. \\[ \\begin{aligned} x &= " + FR("h", "\\tan(" + aN + "^\\circ)") + ", \\quad x + " + s + " = " + FR("h", "\\tan(" + aF + "^\\circ)") + " \\\\ " + s + " &= h\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right) \\\\ h &= " + FR(s, "\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right)") + " = " + fmt(h) + " \\text{ m} \\end{aligned} \\] Check: the nearer distance is " + fmt(x) + " m and the farther is " + fmt(xf) + " m, and they differ by " + s + " m. The answer is <b>" + fmtF(h, 1) + " m</b>.",
    { mode: mode, s: s, aF: aF, aN: aN });
  q1.figure = u8TwoElevFig(aF, aN, s + " m", "?");
  return q1;
}, ["Each reading makes a right triangle with the top of the tree, and the triangles share the tree height.", "Write the ground distance from each spot using the height, then use the gap between the spots."]);

E("u8-two-stage-target-mc", 8, ["5.2", "2.2"], 3, "gen", function () {
  var d = ri(20, 70), a1 = ri(28, 52), a2 = ri(20, 55);
  var h = d * u8tan(a1);
  var mode = ri(0, 1);
  var ctx = pick([["signal tower", "service cable", "anchor point"], ["lookout tower", "rescue line", "marked rock"], ["grain elevator", "loading cable", "rail car"], ["harbour tower", "mooring line", "buoy"]]);
  if (mode === 0) {
    var ans = h / u8sin(a2);
    var errs = [{ v: h / u8sin(a1), fb: "That reuses the first angle in the second triangle. The cable has its own angle, " + a2 + "°, at the top." },
                { v: h * u8sin(a2), fb: "That treats the height as the hypotenuse. The height is a leg here, and the cable is the hypotenuse, so the height is divided by the sine." },
                { v: h / u8tan(a2), fb: "That finds the ground distance to the " + ctx[2] + ", not the sloped cable length." }];
    var prompt = "A point on the ground is " + d + " m from the base of a " + ctx[0] + ". From that point, the angle of elevation to the top is " + a1 + "°. A " + ctx[1] + " runs from the top of the tower down to a " + ctx[2] + ", making a " + a2 + "° angle of depression from the top. What is the length of the " + ctx[1] + "?";
    var sol = "Stage one: find the tower height from the ground triangle. Stage two: the height is a leg of the cable triangle and the cable is its hypotenuse. \\[ \\begin{aligned} h &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(h) + " \\text{ m} \\\\ \\sin(" + a2 + "^\\circ) &= " + FR(fmt(h), "L") + " \\\\ L &= " + FR(fmt(h), "\\sin(" + a2 + "^\\circ)") + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
    var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: height first from the tangent, then the cable from the sine in the second triangle.", sol, { mode: mode, d: d, a1: a1, a2: a2 });
    q.figure = u8ElevFig(a1, d + " m", "?");
    return q;
  }
  var ans2 = h / u8tan(a2);
  var errs2 = [{ v: h / u8tan(a1), fb: "That gives back the original " + d + " m ground distance. The second point has its own angle, " + a2 + "°." },
               { v: h * u8tan(a2), fb: "That multiplies by the tangent, which would find a height from a distance. Here the height is known and the distance is wanted." },
               { v: h / u8sin(a2), fb: "That is the sloped sight distance to the second point, not the distance along the ground." }];
  var prompt2 = "A point on the ground is " + d + " m from the base of a " + ctx[0] + ". From that point, the angle of elevation to the top is " + a1 + "°. From the top, a second ground point is seen at an angle of depression of " + a2 + "°. How far is the second point from the base of the tower?";
  var sol2 = "Stage one: find the tower height from the ground triangle. Stage two: use that height in the second triangle to get the new ground distance. \\[ \\begin{aligned} h &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(h) + " \\text{ m} \\\\ d_2 &= " + FR(fmt(h), "\\tan(" + a2 + "^\\circ)") + " = " + fmt(ans2) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans2, 1) + " m</b>.";
  var q2 = u8numMC(prompt2.replace(/\?$/, ", in metres?"), ans2, errs2, "", 1, "Yes: the shared height links the two triangles, tangent first, then tangent again with the second angle.", sol2, { mode: mode, d: d, a1: a1, a2: a2 });
  q2.figure = u8DepressFig(a2, "?", "?");
  return q2;
}, ["The two triangles are linked by a side they share: find that side first.", "Stage one gives the shared side; stage two uses it with the second angle and the correct ratio."]);

E("u8-equivalent-forms-mc", 8, ["2.6", "2.5"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var a = pick([27, 34, 43, 56, 63, 71]);
    var q = mcq("Which statement correctly rewrites \\(\\tan(" + a + "^\\circ)\\) using sine and cosine?",
      { t: "\\(\\tan(" + a + "^\\circ) = " + FR("\\sin(" + a + "^\\circ)", "\\cos(" + a + "^\\circ)") + "\\)", fb: "Yes: sine over cosine gives opposite over adjacent, since the hypotenuses cancel." },
      [{ t: "\\(\\tan(" + a + "^\\circ) = " + FR("\\cos(" + a + "^\\circ)", "\\sin(" + a + "^\\circ)") + "\\)", fb: "That fraction is the reciprocal of tangent: adjacent over opposite." },
       { t: "\\(\\tan(" + a + "^\\circ) = \\sin(" + a + "^\\circ) \\times \\cos(" + a + "^\\circ)\\)", fb: "Tangent is a quotient of the two ratios, not their product." },
       { t: "\\(\\tan(" + a + "^\\circ) = \\sin(" + (90 - a) + "^\\circ) \\div \\cos(" + a + "^\\circ)\\)", fb: "The numerator was swapped for its complement value, which changes the result. Both parts must use the same angle, " + a + "°." }],
      "\\(\\sin(" + a + "^\\circ)\\) is opposite over hypotenuse and \\(\\cos(" + a + "^\\circ)\\) is adjacent over hypotenuse. Dividing gives \\(" + FR("\\text{opp}", "\\text{adj}") + "\\), which is the tangent. The answer is <b>\\(\\tan(" + a + "^\\circ) = " + FR("\\sin(" + a + "^\\circ)", "\\cos(" + a + "^\\circ)") + "\\)</b>.",
      { mode: mode, a: a });
    q.figure = u8RTFigV(["", "", ""], a + "°", "adjacent", "opposite", "hypotenuse");
    return q;
  }
  if (mode === 1) {
    var a2 = ri(24, 64), opp = ri(5, 30);
    function eq(rhs) { return "\\(x = " + rhs + "\\)"; }
    var q = mcq("A student writes \\(\\sin(" + a2 + "^\\circ) = " + FR(opp, "x") + "\\) for the hypotenuse x of a right triangle. Which equation is an equivalent form that gives x directly?",
      { t: eq(FR(opp, "\\sin(" + a2 + "^\\circ)")), fb: "Yes: multiplying both sides by x and then dividing by the sine isolates x with the same meaning." },
      [{ t: eq(opp + " \\times \\sin(" + a2 + "^\\circ)"), fb: "That value would be shorter than the opposite side, but x is the hypotenuse, the longest side. The rearrangement is wrong." },
       { t: eq(FR("\\sin(" + a2 + "^\\circ)", opp)), fb: "That inverts the fraction, giving a value under 1, which cannot be this hypotenuse." },
       { t: eq(FR(opp, "\\tan(" + a2 + "^\\circ)")), fb: "Tangent does not involve the hypotenuse at all, so it cannot be equivalent to this sine statement." }],
      "Start from \\(\\sin(" + a2 + "^\\circ) = " + FR(opp, "x") + "\\). Multiply both sides by x, then divide both sides by \\(\\sin(" + a2 + "^\\circ)\\): the equivalent solved form is <b>" + eq(FR(opp, "\\sin(" + a2 + "^\\circ)")) + "</b>.",
      { mode: mode, a: a2, opp: opp });
    q.figure = u8RTFigV(["", "", ""], a2 + "°", "", String(opp), "x");
    return q;
  }
  var ang = pick([26, 33, 47, 58, 64]);
  var adjv = ri(8, 40), hypv = adjv + ri(6, 30);
  var q = mcq("In a right triangle, \\(\\cos(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\). Which statement is equivalent to this one?",
    { t: "\\(\\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Yes: cosine of an angle equals sine of its complement, with the same side ratio." },
    [{ t: "\\(\\sin(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Sine of the same angle uses the opposite side over the hypotenuse, a different ratio (unless the angle is 45°)." },
     { t: "\\(\\cos(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Cosine of the complement equals sine of the original angle, not cosine of it." },
     { t: "\\(\\tan(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Tangent is opposite over adjacent; the hypotenuse does not appear in it." }],
    "The two acute angles of a right triangle add to 90°, and the cosine of one equals the sine of the other. So \\(\\cos(" + ang + "^\\circ) = \\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\). The answer is <b>\\(\\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)</b>.",
    { mode: mode, ang: ang, adj: adjv, hyp: hypv });
  q.figure = u8RTFigV(["", "", ""], ang + "°", String(adjv), "", String(hypv));
  return q;
}, ["Two forms are equivalent only if they say the same thing about the same sides.", "Check the ratio each form builds, and remember the complement pairing between sine and cosine."]);

E("u8-cr-two-depressions", 8, ["5.2"], 3, "gen", function () {
  var h = ri(30, 85), a1 = ri(21, 44), a2 = ri(23, 52);
  var ctx = pick([["airport control tower", "service vehicles"], ["ferry terminal tower", "buoys"], ["fire lookout", "clearings"], ["grain terminal", "rail cars"]]);
  var d1 = h / u8tan(a1), d2 = h / u8tan(a2), ans = d1 + d2;
  var q = numq("From the top of an " + ctx[0] + " that is " + h + " m tall, the angles of depression to two " + ctx[1] + " on opposite sides of the tower are " + a1 + "° and " + a2 + "°. Find the distance between the two " + ctx[1] + ", in metres, to one decimal place.",
    ans, 0.4,
    "Each sight line forms a right triangle with the tower, and the triangles share the height. \\[ \\begin{aligned} d_1 &= " + FR(h, "\\tan(" + a1 + "^\\circ)") + " = " + fmt(d1) + " \\text{ m} \\\\ d_2 &= " + FR(h, "\\tan(" + a2 + "^\\circ)") + " = " + fmt(d2) + " \\text{ m} \\\\ \\text{distance} &= " + fmt(d1) + " + " + fmt(d2) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] Opposite sides, so the parts add. The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { h: h, a1: a1, a2: a2 });
  q.figure = u8TwoOppFig(a1, a2, h + " m");
  return q;
}, ["Split the diagram at the tower: two right triangles share its height.", "Find the ground distance on each side, then combine them for opposite sides."]);

E("u8-cr-baseline-height", 8, ["2.4", "5.2", "2.3"], 3, "gen", function () {
  var s = ri(20, 60), aF = ri(16, 30), aN = aF + ri(9, 20);
  var ctx = pick([["unfinished bridge pier", "A surveyor"], ["headland light tower", "A surveyor"], ["wind turbine mast", "A survey crew"], ["ski hill summit tower", "A surveyor"]]);
  var h = s / (1 / u8tan(aF) - 1 / u8tan(aN));
  var x = h / u8tan(aN), xf = h / u8tan(aF);
  var q = numq(ctx[1] + " measures the height of an " + ctx[0] + " without reaching its base. From a far point, the angle of elevation to the top is " + aF + "°. Moving " + s + " m straight toward it, the angle of elevation is " + aN + "°. Find the height of the " + ctx[0].split(" ").pop() + ", in metres, to one decimal place.",
    h, 0.6,
    "Surveyors use this two angle method when the base cannot be reached. Let h be the height and x the nearer ground distance. \\[ \\begin{aligned} x &= " + FR("h", "\\tan(" + aN + "^\\circ)") + ", \\quad x + " + s + " = " + FR("h", "\\tan(" + aF + "^\\circ)") + " \\\\ h &= " + FR(s, "\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right)") + " = " + fmt(h) + " \\text{ m} \\end{aligned} \\] Check: the nearer distance is " + fmt(x) + " m and the farther is " + fmt(xf) + " m, differing by the measured " + s + " m baseline. The answer is <b>" + fmtF(h, 1) + " m</b>.",
    { s: s, aF: aF, aN: aN });
  q.figure = u8ElevFig(aN, "?", "?");
  return q;
}, ["Both sightings form right triangles that share the unknown height.", "Express each ground distance using the height, and set their difference equal to the measured baseline."]);


