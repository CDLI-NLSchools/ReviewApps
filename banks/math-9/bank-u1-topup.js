// Math 9 Unit 1 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1505 to 1696).
/* Top-up tranche (November 7, 2026): Unit 1 additions from tranche1/unit1-topup.js */
// Unit 1 top-up: Rational Numbers (Math 9, NL). Entries only; uses the u1
// helpers (u1gcd, u1red, u1frac, u1round) already defined in unit1.js.

// T1. L2, 6.2: nested brackets mixing a fraction and decimals, no calculator, MC.
E("u1-ooo-brackets-mc", 1, ["6.2"], 2, "gen", function () {
  var fracPool = [
    { n: 1, d: 2, v: 0.5 }, { n: 3, d: 4, v: 0.75 }, { n: 1, d: 4, v: 0.25 },
    { n: 2, d: 5, v: 0.4 }, { n: 3, d: 5, v: 0.6 }, { n: 4, d: 5, v: 0.8 },
    { n: 1, d: 5, v: 0.2 }, { n: 3, d: 10, v: 0.3 }, { n: 7, d: 10, v: 0.7 },
    { n: 9, d: 10, v: 0.9 }, { n: 5, d: 4, v: 1.25 }, { n: 3, d: 2, v: 1.5 }
  ];
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var fr = pick(fracPool);
    var c = ri(2, 40) / 4;
    var S = fr.v + c;
    var D = ri(3, 30) / 2;
    var a = D + S;
    var d = pick([2, 3, 4, 5, 6]);
    var e = pick([2, 3, 4, 5]);
    var f = ri(5, 95) / 10;
    var g = pick([2, 5, 10]);
    var q1 = D / d, q2 = f / g;
    if (Math.abs(q1 - u1round(q1, 2)) > 1e-9) continue;
    if (Math.abs(q2 - u1round(q2, 2)) > 1e-9) continue;
    var V = q1 * e + q2;
    var E1 = D / (d * e) + q2;
    var E2 = (a - fr.v + c) / d * e + q2;
    var E3 = (q1 * e + f) / g;
    var E4 = (a + S) / d * e + q2;
    var keys = [V, E1, E2, E3, E4].map(function (x) { return fmt(u1round(x, 2)); });
    if (new Set(keys).size < 5) continue;
    P = { fn: fr.n, fd: fr.d, fv: fr.v, c: c, S: S, D: D, a: a, d: d, e: e, f: f, g: g, q1: q1, q2: q2, V: V, E1: E1, E2: E2, E3: E3, E4: E4 };
  }
  if (!P) {
    P = { fn: 3, fd: 4, fv: 0.75, c: 2.25, S: 3, D: 6, a: 9, d: 3, e: 2, f: 4.5, g: 5, q1: 2, q2: 0.9, V: 4.9, E1: 1.9, E2: 7.9, E3: 1.7, E4: 8.9 };
  }
  var expr = "\\((" + fmt(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmt(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + "\\)";
  var prompt = "Evaluate: " + expr;
  var steps = "\\[ \\begin{aligned} (" + fmt(P.a) + " - (" + FR(P.fn, P.fd) + " + " + fmt(P.c) + ")) \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + " &= (" + fmt(P.a) + " - " + fmt(P.S) + ") \\div " + P.d + " \\times " + P.e + " + " + fmt(P.f) + " \\div " + P.g + " \\\\ &= " + fmt(P.D) + " \\div " + P.d + " \\times " + P.e + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.q1) + " \\times " + P.e + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.q1 * P.e) + " + " + fmt(P.q2) + " \\\\ &= " + fmt(P.V) + " \\end{aligned} \\]";
  var solution = "Work the inner brackets first, then do divisions and multiplications from left to right, then the addition: " + steps + " So the value is <b>" + fmt(P.V) + "</b>.";
  var errs = [
    { t: fmt(u1round(P.E1, 2)), fb: "This multiplies " + P.d + " by " + P.e + " before dividing, but division and multiplication are done from left to right, and the division comes first here." },
    { t: fmt(u1round(P.E2, 2)), fb: "This begins the outer bracket before finishing the inner brackets, so the subtraction uses the wrong amount." },
    { t: fmt(u1round(P.E3, 2)), fb: "This adds " + fmt(P.f) + " before the final division, but division is done before addition." },
    { t: fmt(u1round(P.E4, 2)), fb: "This adds the bracket amount to " + fmt(P.a) + " instead of subtracting it, a sign slip." }
  ];
  var selDs = fmtPairDs(fmt(P.V), shuffle(errs).slice(0, 3).map(function (e) { return { v: parseFloat(e.t), fb: e.fb }; }));
  return mcq(prompt,
    { t: fmt(P.V), fb: "Correct. The inner brackets are done first, then divisions and multiplications from left to right." },
    selDs,
    solution, { mode: "ooo-brackets", a: P.a, c: P.c, d: P.d, e: P.e, f: P.f, g: P.g });
}, ["Do the innermost brackets first, then work divisions and multiplications from left to right.", "First add the fraction and the decimal inside the inner brackets."]);

// T2. L2, 6.3: one calculator entry, ask for the displayed rounded value, MC.
E("u1-ooo-calc-display", 1, ["6.3"], 1, "gen", function () {
  var names = ["Alex", "Jamie", "Robin", "Casey", "Taylor", "Jordan"];
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var nm = pick(names);
    var a = ri(15, 95) / 10;
    var b = ri(5, 60) / 10;
    var c = ri(5, 95) / 10;
    var d = pick([2, 4, 5, 8]);
    var e = ri(2, 9);
    var f = ri(5, 60) / 10;
    var places = pick([1, 2]);
    var S = b + c;
    var Q = S / d;
    var V = a + Q * e - f;
    if (V <= 0.5) continue;
    var EL = ((a + b + c) / d) * e - f;
    var ED = a + b + (c / d) * e - f;
    var EM = a + u1round(Q, places === 2 ? 1 : 0) * e - f;
    var keys = [V, EL, ED, EM].map(function (x) { return fmtF(u1round(x, places), places); });
    if (new Set(keys).size < 4) continue;
    P = { nm: nm, a: a, b: b, c: c, d: d, e: e, f: f, places: places, S: S, Q: Q, V: V, EL: EL, ED: ED, EM: EM };
  }
  if (!P) {
    P = { nm: "Alex", a: 2.5, b: 1.5, c: 4.7, d: 4, e: 3, f: 1.2, places: 2, S: 6.2, Q: 1.55, V: 5.95, EL: 5.325, ED: 6.325, EM: 6.1 };
  }
  var ans = u1round(P.V, P.places);
  var expr = "\\(" + fmt(P.a) + " + (" + fmt(P.b) + " + " + fmt(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + "\\)";
  var prompt = P.nm + " keys the whole expression into a calculator in one entry: " + expr + " What value does the calculator show, rounded to " + P.places + " decimal place" + (P.places > 1 ? "s" : "") + "?";
  var steps = "\\[ \\begin{aligned} " + fmt(P.a) + " + (" + fmt(P.b) + " + " + fmt(P.c) + ") \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + " &= " + fmt(P.a) + " + " + fmt(P.S) + " \\div " + P.d + " \\times " + P.e + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.a) + " + " + fmt(P.Q, 4) + " \\times " + P.e + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.a) + " + " + fmt(P.Q * P.e, 4) + " - " + fmt(P.f) + " \\\\ &= " + fmt(P.V, 4) + " \\end{aligned} \\]";
  var solution = "The calculator follows the order of operations, brackets first, and keeps full precision until the end: " + steps + " Rounded to " + P.places + " decimal place" + (P.places > 1 ? "s" : "") + ", the calculator shows <b>" + fmtF(ans, P.places) + "</b>.";
  return mcq(prompt,
    { t: fmtF(ans, P.places), fb: "Correct. The calculator follows the order of operations and rounds only at the end." },
    [
      { t: fmtF(u1round(P.EL, P.places), P.places), fb: "This is the result of keying the numbers strictly from left to right and ignoring the brackets." },
      { t: fmtF(u1round(P.ED, P.places), P.places), fb: "This drops the brackets around the sum, so only " + fmt(P.c) + " is divided by " + P.d + " instead of the whole sum." },
      { t: fmtF(u1round(P.EM, P.places), P.places), fb: "This rounds the quotient to " + (P.places === 2 ? "1 decimal place" : "the nearest whole number") + " before multiplying, instead of rounding only the final answer." }
    ],
    solution, { mode: "ooo-calc-display", a: P.a, b: P.b, c: P.c, d: P.d, e: P.e, f: P.f, places: P.places });
}, ["A calculator follows the order of operations when the whole expression is keyed in as one entry.", "Work out the bracketed sum first, and keep full precision until the final rounding."]);

// T3. L2, 6.4: worked solution with one error, ask for the correct final value, MC.
E("u1-ooo-error-value", 1, ["6.4"], 3, "gen", function () {
  var scen = ri(0, 3);
  var R = null;
  for (var tries = 0; tries < 500 && !R; tries++) {
    var exprM, worked, solSteps, correctVal, wrongVal, e1Val, e2Val, e1fb, e2fb, errText, tag;
    if (scen === 0) {
      var a0 = ri(2, 15), b0 = ri(2, 12), c0 = ri(3, 9), d0 = ri(1, 12);
      var S0 = a0 + b0;
      correctVal = a0 + b0 * c0 - d0;
      wrongVal = S0 * c0 - d0;
      e1Val = a0 + b0 * (c0 - d0);
      e2Val = a0 + b0 * c0 + d0;
      exprM = a0 + " + " + b0 + " \\times " + c0 + " - " + d0;
      worked = exprM + " &= " + S0 + " \\times " + c0 + " - " + d0 + " \\\\ &= " + (S0 * c0) + " - " + d0 + " \\\\ &= " + wrongVal;
      solSteps = exprM + " &= " + a0 + " + " + (b0 * c0) + " - " + d0 + " \\\\ &= " + correctVal;
      errText = "The student added before multiplying in the first step, but multiplication is done before addition.";
      e1fb = "This groups the subtraction with the multiplication, which changes the order of operations.";
      e2fb = "This adds the last number instead of subtracting it.";
      tag = "errval-add-first";
    } else if (scen === 1) {
      var a1 = ri(2, 9), b1 = ri(2, 12), c1 = ri(1, 12), d1 = pick([2, 3, 4, 5, 6]);
      var S1 = b1 + c1;
      if ((a1 * S1) % d1 !== 0) continue;
      correctVal = a1 * S1 / d1;
      wrongVal = (a1 * b1 + c1) / d1;
      e1Val = a1 * b1 + c1 / d1;
      e2Val = a1 * S1 * d1;
      exprM = a1 + " \\times (" + b1 + " + " + c1 + ") \\div " + d1;
      worked = exprM + " &= (" + (a1 * b1) + " + " + c1 + ") \\div " + d1 + " \\\\ &= " + fmt(wrongVal);
      solSteps = exprM + " &= " + a1 + " \\times " + S1 + " \\div " + d1 + " \\\\ &= " + correctVal;
      errText = "The student multiplied before evaluating the brackets, but brackets are done first.";
      e1fb = "This drops the brackets entirely, so only " + c1 + " is divided by " + d1 + ".";
      e2fb = "This multiplies by " + d1 + " at the end instead of dividing by it.";
      tag = "errval-mult-first";
    } else if (scen === 2) {
      var dv = pick([2, 3, 4, 5]);
      var b2 = dv * ri(1, 6);
      var a2 = b2 + dv * ri(1, 6);
      var d2 = ri(2, 9), e2 = ri(2, 9);
      correctVal = a2 - b2 / dv + d2 * e2;
      wrongVal = (a2 - b2) / dv + d2 * e2;
      e1Val = a2 - b2 / dv - d2 * e2;
      e2Val = ((a2 - b2) / dv + d2) * e2;
      exprM = a2 + " - " + b2 + " \\div " + dv + " + " + d2 + " \\times " + e2;
      worked = exprM + " &= (" + (a2 - b2) + ") \\div " + dv + " + " + d2 + " \\times " + e2 + " \\\\ &= " + ((a2 - b2) / dv) + " + " + (d2 * e2) + " \\\\ &= " + wrongVal;
      solSteps = exprM + " &= " + a2 + " - " + (b2 / dv) + " + " + (d2 * e2) + " \\\\ &= " + correctVal;
      errText = "The student subtracted before dividing, but division is done before subtraction.";
      e1fb = "This subtracts the product as well, but the expression adds it.";
      e2fb = "This works strictly from left to right, multiplying at the end instead of multiplying before adding.";
      tag = "errval-sub-first";
    } else {
      var a3 = ri(15, 40) / 2, b3 = ri(1, 10), c3 = ri(1, 10), d3 = ri(2, 9);
      var S3 = b3 + c3;
      if (a3 <= S3) continue;
      correctVal = (a3 - S3) * d3;
      wrongVal = (a3 - b3 + c3) * d3;
      e1Val = a3 - S3 * d3;
      e2Val = (a3 - S3) + d3;
      exprM = "(" + fmt(a3) + " - (" + b3 + " + " + c3 + ")) \\times " + d3;
      worked = exprM + " &= (" + fmt(a3 - b3) + " + " + c3 + ") \\times " + d3 + " \\\\ &= " + fmt(a3 - b3 + c3) + " \\times " + d3 + " \\\\ &= " + fmt(wrongVal);
      solSteps = exprM + " &= (" + fmt(a3) + " - " + S3 + ") \\times " + d3 + " \\\\ &= " + fmt(a3 - S3) + " \\times " + d3 + " \\\\ &= " + fmt(correctVal);
      errText = "The student started the outer bracket before finishing the inner brackets, but the innermost brackets are done first.";
      e1fb = "This drops the outer brackets and multiplies the inner sum before subtracting.";
      e2fb = "This adds the last number instead of multiplying by it.";
      tag = "errval-outer-first";
    }
    var keys = [correctVal, wrongVal, e1Val, e2Val].map(function (x) { return fmt(u1round(x, 2)); });
    if (new Set(keys).size < 4) continue;
    R = { exprM: exprM, worked: worked, solSteps: solSteps, correctVal: correctVal, wrongVal: wrongVal, e1Val: e1Val, e2Val: e2Val, e1fb: e1fb, e2fb: e2fb, errText: errText, tag: tag };
  }
  if (!R) {
    R = {
      exprM: "4 + 3 \\times 5 - 2",
      worked: "4 + 3 \\times 5 - 2 &= 7 \\times 5 - 2 \\\\ &= 35 - 2 \\\\ &= 33",
      solSteps: "4 + 3 \\times 5 - 2 &= 4 + 15 - 2 \\\\ &= 17",
      correctVal: 17, wrongVal: 33, e1Val: 13, e2Val: 21,
      e1fb: "This groups the subtraction with the multiplication, which changes the order of operations.",
      e2fb: "This adds the last number instead of subtracting it.",
      errText: "The student added before multiplying in the first step, but multiplication is done before addition.",
      tag: "errval-add-first"
    };
  }
  var prompt = "A student's work for an expression is shown below. \\[ \\begin{aligned} " + R.worked + " \\end{aligned} \\] What is the correct value of the expression?";
  var solution = R.errText + " Done correctly: \\[ \\begin{aligned} " + R.solSteps + " \\end{aligned} \\] So the correct value is <b>" + fmt(R.correctVal) + "</b>.";
  return mcq(prompt,
    { t: fmt(R.correctVal), fb: "Correct. Redone in the proper order, the expression gives this value." },
    [
      { t: fmt(u1round(R.wrongVal, 2)), fb: "That is the value in the student's work, which contains the order of operations error." },
      { t: fmt(u1round(R.e1Val, 2)), fb: R.e1fb },
      { t: fmt(u1round(R.e2Val, 2)), fb: R.e2fb }
    ],
    solution, { mode: R.tag, scen: scen });
}, ["Compare the student's steps with the order of operations to spot where the order went wrong.", "Redo the expression yourself: brackets first, then multiplication and division, then addition and subtraction."]);

