// Math 9 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 5767 to 6408).
// CRMARKS: u1-gap-order-ops-cr=2
// CRMARKS: u1-gap-two-expr-diff-cr=2
// CRMARKS: u1-gap-mean-target-cr=3
// CRMARKS: u1-gap-div-add-cr=3
// CRMARKS: u1-gap-total-change-cr=3
// CRMARKS: u1-gap-brackets-cr=3
// CRMARKS: u2-gap-estimate-gap-cr=2
// CRMARKS: u2-gap-pyramid-slant-cr=3
// CRMARKS: u3-gap-laws-eval-cr=2
// CRMARKS: u3-gap-simplify-sub-cr=2
// CRMARKS: u3-gap-solve-exponent-cr=3
// CRMARKS: u3-gap-sci-product-cr=3
// CRMARKS: u3-gap-growth-excess-cr=3
// CRMARKS: u3-gap-power-diff-cr=3
// CRMARKS: u4-gap-add-eval-cr=2
// CRMARKS: u4-gap-mono-coeff-cr=2
// CRMARKS: u4-gap-area-eval-cr=3
// CRMARKS: u4-gap-sub-eval-neg-cr=3
// CRMARKS: u4-gap-perimeter-eval-cr=3
// CRMARKS: u4-gap-div-eval-cr=3
// CRMARKS: u5-gap-ineq-boundary-cr=2
// CRMARKS: u5-gap-both-sides-cr=2
// CRMARKS: u5-gap-min-items-cr=3
// CRMARKS: u5-gap-solve-eval-cr=3
// CRMARKS: u6-gap-slope-table-cr=2
// CRMARKS: u6-gap-missing-coord-cr=2
// CRMARKS: u6-gap-break-even-cr=3
// CRMARKS: u6-gap-pattern-far-cr=3
// CRMARKS: u6-gap-inverse-cr=3
// CRMARKS: u7-gap-scale-apply-cr=2
// CRMARKS: u7-gap-map-time-cr=2
// CRMARKS: u7-gap-area-scale-cr=3
// CRMARKS: u7-gap-shadow-diff-cr=3
// CRMARKS: u7-gap-perimeter-scale-cr=3
// CRMARKS: u8-gap-reflex-arc-cr=2
// CRMARKS: u8-gap-cyclic-diag-cr=2
// CRMARKS: u8-gap-tangent-central-cr=3
// CRMARKS: u8-gap-chord-bisect-cr=3
// CRMARKS: u8-gap-semicircle-pyth-cr=3
// CRMARKS: u9-gap-freq-mean-cr=2
// CRMARKS: u9-gap-expected-freq-cr=2
// CRMARKS: u9-gap-complement-pct-cr=3
// CRMARKS: u9-gap-mean-diff-cr=3
// CRMARKS: u9-gap-sample-scale-cr=3
// CRMARKS: u9-gap-win-points-cr=3
/* Pool-gap fill, November 9, 2026: new Level 2 entries closing the unit-test
   and exam composition gaps found after the level calibration. CR entries
   always return numq; SR entries always return mcq and stay out of CR_MARKS. */

/* Unit 1: Rational Numbers */

// PG. L2, 6.2, CR 2: signed fraction times a negative decimal, then an addition.
E("u1-gap-order-ops-cr", 1, ["6.2"], 2, "gen", function () {
  var q = pick([2, 4, 5, 8, 10]);
  var p = ri(1, 9);
  var dec = -(ri(2, 12) / 2);
  var add = ri(-30, 30) / 4;
  if (add === 0) add = 1.5;
  var prod = Math.round((p / q) * dec * 10000) / 10000;
  var ans = Math.round((prod + add) * 10000) / 10000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\times (" + fmt(dec) + ") + " + fmt(add) + "\\). Give your answer as a decimal.";
  var sol = "Multiply first, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\times (" + fmt(dec) + ") &= " + fmt(prod, 4) + " \\\\ " + fmt(prod, 4) + " + " + fmt(add) + " &= " + fmt(ans, 4) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-order-ops", p: p, q: q, dec: dec, add: add });
}, ["Follow the order of operations: the multiplication is finished before the addition.", "Change the fraction to a decimal first, then multiply it by the negative decimal."]);

// PG. L2, 6.1, CR 2: evaluate two rational expressions, then give the difference.
E("u1-gap-two-expr-diff-cr", 1, ["6.1"], 2, "gen", function () {
  var d1 = pick([2, 3, 4, 6]), d2 = pick([3, 4, 6, 8]);
  var n1 = ri(1, 7), n2 = ri(1, 7), n3 = ri(1, 7), n4 = ri(1, 7);
  var A = Math.round((n1 / d1 + n2 / d2) * 10000) / 10000;
  var B = Math.round((n3 / d1 - n4 / d2) * 10000) / 10000;
  var ans = Math.round((A - B) * 10000) / 10000;
  var prompt = "Expression A is \\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\) and expression B is \\(" + FR(n3, d1) + " - " + FR(n4, d2) + "\\). Find the value of A minus B, as a decimal.";
  var sol = "Evaluate each expression first: \\[ \\begin{aligned} A &= " + FR(n1, d1) + " + " + FR(n2, d2) + " = " + fmt(A, 4) + " \\\\ B &= " + FR(n3, d1) + " - " + FR(n4, d2) + " = " + fmt(B, 4) + " \\\\ A - B &= " + fmt(A, 4) + " - " + fmt(B, 4) + " = " + fmt(ans, 4) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-two-expr", A: A, B: B });
}, ["Work out the value of each expression on its own before you subtract.", "Start with expression A: add its two fractions using a common denominator."]);

// PG. L2, 6.1, CR 3: mean of signed decimals, then the distance from a target.
E("u1-gap-mean-target-cr", 1, ["6.1"], 2, "gen", function () {
  var t1 = ri(-80, 80), t2 = ri(-80, 80), t3 = ri(-80, 80);
  var rem = (4 - (((t1 + t2 + t3) % 4) + 4) % 4) % 4;
  var t4 = rem + 4 * ri(-18, 18);
  if (t4 < -80 || t4 > 80) t4 = rem;
  var vals = [t1 / 10, t2 / 10, t3 / 10, t4 / 10];
  var mean = (t1 + t2 + t3 + t4) / 40;
  var target = pick([-4, -2, -1, 0, 1, 2, 3, 5]);
  if (Math.abs(mean - target) < 0.5) target = target + 3;
  var ans = Math.round(Math.abs(mean - target) * 100) / 100;
  var prompt = "Four morning temperatures in degrees are " + vals.map(function (v) { return fmt(v); }).join(", ") + ". Find the distance between the mean of the four temperatures and the target temperature of " + fmt(target) + " degrees.";
  var sol = "Add the temperatures and divide by 4 to get the mean, then measure the distance to the target: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + fmt(vals[0]) + " + " + fmt(vals[1]) + " + " + fmt(vals[2]) + " + " + fmt(vals[3]) + "}{4} = " + fmt(mean) + " \\\\ \\text{distance} &= |" + fmt(mean) + " - " + fmt(target) + "| = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-target", mean: mean, target: target });
}, ["The mean comes first; the distance is measured from that mean to the target.", "Add the four temperatures together as the first step."]);

// PG. L2, 6.1/6.2, CR 3: fraction division (flip), then an unlike-denominator addition.
E("u1-gap-div-add-cr", 1, ["6.1", "6.2"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Divide first by multiplying by the reciprocal, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmt(quot) + " \\\\ " + fmt(quot) + " + " + FR(e, f) + " &= " + fmt(quot) + " + " + fmt(e / f, 3) + " = " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["Division is the first job: flip the divisor and multiply, then do the addition.", "Rewrite the division as a multiplication by the reciprocal of the second fraction."]);

// PG. L2, 6.1, CR 3: total of three signed amounts, then the change from a round bill.
E("u1-gap-total-change-cr", 1, ["6.1"], 2, "gen", function () {
  var a1 = ri(300, 2400) / 100, a2 = ri(200, 1800) / 100, disc = ri(100, 800) / 100;
  var total = Math.round((a1 + a2 - disc) * 100) / 100;
  var bill = total <= 30 ? 50 : 100;
  var ans = Math.round((bill - total) * 100) / 100;
  var prompt = "A shopper buys two items priced at $" + a1.toFixed(2) + " and $" + a2.toFixed(2) + ". A coupon takes $" + disc.toFixed(2) + " off the total. The shopper pays with a $" + bill + " bill. How much change does the shopper get, in dollars?";
  var sol = "Find the amount owed first, then subtract it from the bill: \\[ \\begin{aligned} \\text{total} &= " + a1.toFixed(2) + " + " + a2.toFixed(2) + " - " + disc.toFixed(2) + " = " + total.toFixed(2) + " \\\\ \\text{change} &= " + bill + " - " + total.toFixed(2) + " = " + ans.toFixed(2) + " \\end{aligned} \\] The answer is <b>$" + ans.toFixed(2) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-total-change", total: total, bill: bill });
}, ["The change depends on the final total, so work out what is owed before you subtract.", "Add the two prices and take the coupon off as the first step."]);

// PG. L2, 6.2, CR 3: brackets with signed decimals, then multiply, then add a fraction value.
E("u1-gap-brackets-cr", 1, ["6.2"], 2, "gen", function () {
  var d1 = ri(-40, 60) / 10, d2 = ri(-40, 60) / 10;
  var mult = ri(2, 6);
  var f = pick([2, 4, 8]);
  var e = ri(1, f - 1);
  var inner = Math.round((d1 - d2) * 10) / 10;
  var ans = Math.round((inner * mult + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(((" + fmt(d1) + ") - (" + fmt(d2) + ")) \\times " + mult + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Work out the brackets first, then multiply, then add: \\[ \\begin{aligned} (" + fmt(d1) + ") - (" + fmt(d2) + ") &= " + fmt(inner) + " \\\\ " + fmt(inner) + " \\times " + mult + " &= " + fmt(inner * mult) + " \\\\ " + fmt(inner * mult) + " + " + fmt(e / f, 3) + " &= " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-brackets", inner: inner, mult: mult });
}, ["Brackets are evaluated before any multiplication or addition outside them.", "Subtract the two decimals inside the brackets as the first step."]);

/* Unit 2: Square Roots and Surface Area */

// PG. L2, 6.5, CR 2: estimate a square root to 1 decimal place from the closest perfect squares (revised Nov 12, 2026 at Jason's direction: the earlier version also asked for the gap to the perfect square, two asks in one question; now the estimate only, tolerance 0.1, worked solution gives the best estimate).
E("u2-gap-estimate-gap-cr", 2, ["6.5"], 2, "gen", function () {
  var n = u2nonSquare(30, 95);
  var lo = Math.floor(Math.sqrt(n));
  var gapLo = n - lo * lo, gapHi = (lo + 1) * (lo + 1) - n;
  var best = gapLo <= gapHi ? lo : lo + 1;
  var est = Math.round(Math.sqrt(n) * 10) / 10;
  var t1 = Math.round((est - 0.1) * 10) / 10, t2 = Math.round((est + 0.1) * 10) / 10;
  var sq = function (x) { return Math.round(x * x * 100) / 100; };
  var prompt = "Estimate \\(\\sqrt{" + n + "}\\). Give your answer to 1 decimal place.";
  var sol = "The perfect squares near " + n + " are \\(" + lo + "^{2} = " + (lo * lo) + "\\) and \\(" + (lo + 1) + "^{2} = " + ((lo + 1) * (lo + 1)) + "\\), so \\(\\sqrt{" + n + "}\\) lies between " + lo + " and " + (lo + 1) + ", nearer to " + best + ". Squaring the tenths around the estimate: \\[ \\begin{aligned} " + fmt(t1, 1) + "^{2} &= " + fmt(sq(t1), 2) + " \\\\ " + fmt(est, 1) + "^{2} &= " + fmt(sq(est), 2) + " \\\\ " + fmt(t2, 1) + "^{2} &= " + fmt(sq(t2), 2) + " \\end{aligned} \\] " + fmt(sq(est), 2) + " is the closest of these to " + n + ", so the best estimate is <b>" + fmt(est, 1) + "</b>.";
  return numq(prompt, est, 0.1, sol, { mode: "gap-estimate-gap", n: n, best: best });
}, ["An estimate uses the perfect square nearest to the number under the root.", "List the perfect squares just below and just above the number first."]);

// PG. L2, 9.3, CR 3: surface area of a square pyramid with the slant height derived by Pythagoras.
E("u2-gap-pyramid-slant-cr", 2, ["9.3"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [20, 21, 29]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2, 3]);
  var half = (swap ? tr[1] : tr[0]) * kk, height = (swap ? tr[0] : tr[1]) * kk, slant = tr[2] * kk;
  var base = 2 * half;
  var sa = base * base + 2 * base * slant;
  var thing = pick(["pyramid", "tent", "monument"]);
  var prompt = thing === "tent"
    ? "A tent is shaped like a square pyramid. Its base has side length " + base + " cm and its vertical height is " + height + " cm. Find the total surface area of the tent, in square centimetres."
    : "A square " + thing + " has a base with side length " + base + " cm and a vertical height of " + height + " cm. Find the total surface area of the " + thing + ", in square centimetres.";
  var sol = "The slant height is not given, so find it with the Pythagorean theorem using half the base and the height: \\[ \\begin{aligned} \\text{slant}^{2} &= " + half + "^{2} + " + height + "^{2} = " + (half * half + height * height) + " \\\\ \\text{slant} &= " + slant + " \\\\ SA &= " + base + "^{2} + 4\\left(" + FR(1, 2) + " \\times " + base + " \\times " + slant + "\\right) = " + (base * base) + " + " + (2 * base * slant) + " = " + sa + " \\end{aligned} \\] The answer is <b>" + sa + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, sa, 0.01, sol, { mode: "gap-pyramid-slant", base: base, height: height, slant: slant });
  q.figure = solPyramid(base, height, fmt(base) + " cm", fmt(height) + " cm", "?", "Square pyramid with base side and height labelled and slant height unknown");
  return q;
}, ["The triangular faces need the slant height, which the pyramid does not state directly.", "Halve the base side, then use the Pythagorean theorem with the height to get the slant height."]);

// PG. L2, 9.2, SR: surface area of a two-solid composite (box joined to a triangular prism).
E("u2-gap-composite-sa-mc", 2, ["9.2"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
  var a = tr[0], b = tr[1], c = tr[2];
  var L = ri(5, 12), W = ri(4, 9), H = ri(3, 8);
  var saBox = 2 * (L * W + L * H + W * H);
  var saPrism = a * b + (a + b + c) * L;
  var contact = a * L;
  var tot = saBox + saPrism - 2 * contact;
  var prompt = "A display stand is made from a box and a right triangular prism joined together. The box measures " + L + " cm long, " + W + " cm wide and " + H + " cm high. The prism is " + L + " cm long, and each triangular end is a right triangle with legs " + a + " cm and " + b + " cm and hypotenuse " + c + " cm. The prism sits on top of the box, and the two solids touch over a rectangle " + a + " cm by " + L + " cm. What is the total surface area of the stand, in square centimetres?";
  var sol = "Find each solid on its own, then subtract the touching rectangle twice because it is hidden on both solids: \\[ \\begin{aligned} SA &= " + saBox + " + " + saPrism + " - 2(" + contact + ") \\\\ &= " + tot + " \\end{aligned} \\] The answer is <b>" + tot + " cm\\(^{2}\\)</b>.";
  var q = mcq(prompt,
    { t: fmt(tot), fb: "Correct: both solids are counted, and the hidden touching rectangle is removed from each one." },
    [{ t: fmt(saBox + saPrism), fb: "That adds the two solids but leaves the hidden touching faces counted on both solids." },
     { t: fmt(saBox + saPrism - contact), fb: "That removes the touching rectangle only once, but it is hidden on both solids, so it must come off twice." },
     { t: fmt(saBox + saPrism - 3 * contact), fb: "That removes the touching rectangle three times; it is hidden on exactly two faces, one on each solid." }],
    sol, { mode: "gap-composite-sa", tot: tot });
  if (a <= W) q.figure = solBoxTri(a, b, c, L, W, H, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", fmt(W) + " cm", fmt(H) + " cm", "Triangular prism on a box with labelled dimensions");
  return q;
}, ["Treat the stand as two separate solids first, then adjust for the join.", "Add the two surface areas, then subtract the touching rectangle twice since it is hidden on both solids."]);


/* Unit 3: Powers and Exponent Laws */

// PG. L2, 3.12, CR 2: product law and quotient law chained, then evaluate.
E("u3-gap-laws-eval-cr", 3, ["3.12"], 2, "gen", function () {
  var a = pick([2, 3]);
  var m = ri(2, 4), n = ri(2, 4), p = ri(1, 3); if (m + n - p < 2) p = 1;
  var tot = m + n - p;
  var val = Math.pow(a, tot);
  var prompt = "Evaluate \\(\\frac{" + a + "^{" + m + "} \\times " + a + "^{" + n + "}}{" + a + "^{" + p + "}}\\).";
  var sol = "Multiply with the product law first, then divide with the quotient law: \\[ \\begin{aligned} " + a + "^{" + m + "} \\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "} \\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} = " + fmt(val) + " \\end{aligned} \\] The answer is <b>" + fmt(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-laws-eval", a: a, tot: tot });
}, ["Same-base powers are combined with the exponent laws before anything is evaluated.", "Add the exponents for the multiplication in the numerator as the first step."]);

// PG. L2, 3.12, CR 2: simplify in x with the laws, then substitute a value.
E("u3-gap-simplify-sub-cr", 3, ["3.12"], 2, "gen", function () {
  var a = ri(2, 4), b = ri(2, 4), c = ri(1, 2);
  var e = a + b - c;
  var v = pick([2, 3, -2]);
  var val = Math.pow(v, e);
  var prompt = "Simplify \\(\\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}}\\), then evaluate the simplified expression when \\(x = " + v + "\\).";
  var sol = "Simplify with the product and quotient laws first, then substitute: \\[ \\begin{aligned} \\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}} &= x^{" + e + "} \\\\ (" + v + ")^{" + e + "} &= " + fmt(val) + " \\end{aligned} \\] The answer is <b>" + fmt(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-simplify-sub", e: e, v: v });
}, ["The expression must be simplified to a single power before the value goes in.", "Add the exponents in the numerator as the first step."]);

// PG. L2, 3.11/3.12, CR 3: solve for the exponent by writing the target as a power of the base.
E("u3-gap-solve-exponent-cr", 3, ["3.11", "3.12"], 2, "gen", function () {
  var a = pick([2, 3, 5]);
  var m = ri(1, 3), k = ri(4, 7);
  if (k - m < 2) m = 1;
  var x = k - m;
  var T = Math.pow(a, k);
  var flip = Math.random() < 0.5;
  var lhs = flip ? (a + "^{x} \\times " + a + "^{" + m + "}") : (a + "^{" + m + "} \\times " + a + "^{x}");
  var prompt = "Find the value of \\(x\\) in the equation \\(" + lhs + " = " + fmt(T) + "\\).";
  var sol = "Write the right side as a power of " + a + " first, then use the product law and compare exponents: \\[ \\begin{aligned} " + fmt(T) + " &= " + a + "^{" + k + "} \\\\ " + m + " + x &= " + k + " \\\\ x &= " + x + " \\end{aligned} \\] The answer is <b>" + x + "</b>.";
  return numq(prompt, x, 0.01, sol, { mode: "gap-solve-exponent", a: a, m: m, k: k });
}, ["Both sides must be powers of the same base before the exponents can be compared.", "Rewrite the number on the right as a power of the base as the first step."]);

// PG. L2, 3.12, CR 3: product of two scientific-notation numbers, then normalize the coefficient.
E("u3-gap-sci-product-cr", 3, ["3.12"], 2, "gen", function () {
  var i = ri(15, 45), j = ri(15, 45), guard = 0;
  while (i * j < 1000 && guard < 200) { i = ri(15, 45); j = ri(15, 45); guard++; }
  var c1 = i / 10, c2 = j / 10;
  var p = ri(2, 5), q = ri(2, 5);
  var prod = i * j / 100;
  var coeff = Math.round(prod / 10 * 1000) / 1000;
  var prompt = "Multiply \\((" + fmt(c1) + " \\times 10^{" + p + "}) \\times (" + fmt(c2) + " \\times 10^{" + q + "})\\). The product is written in scientific notation as a coefficient times a power of 10, with the coefficient between 1 and 10. Give the coefficient.";
  var sol = "Multiply the coefficients and add the exponents, then normalize because the coefficient is too large: \\[ \\begin{aligned} " + fmt(c1) + " \\times " + fmt(c2) + " &= " + fmt(prod, 3) + " \\\\ " + fmt(prod, 3) + " \\times 10^{" + (p + q) + "} &= " + fmt(coeff, 3) + " \\times 10^{" + (p + q + 1) + "} \\end{aligned} \\] The answer is <b>" + fmt(coeff, 3) + "</b>.";
  return numq(prompt, coeff, 0.01, sol, { mode: "gap-sci-product", coeff: coeff });
}, ["Multiply the front numbers and the powers of 10 separately, then check the size of the front number.", "Multiply the two coefficients as the first step."]);

// PG. L2, 3.12, CR 3: doubling growth over k periods, then the excess over a target.
E("u3-gap-growth-excess-cr", 3, ["3.12"], 2, "gen", function () {
  var n0 = ri(3, 9) * 10;
  var k = ri(3, 6);
  var total = n0 * Math.pow(2, k);
  var frac = pick([0.6, 0.7, 0.75, 0.8]);
  var target = Math.round(total * frac / 10) * 10;
  var ans = total - target;
  var prompt = "A bacteria culture starts with " + n0 + " bacteria and doubles every hour. Find how many more bacteria there are after " + k + " hours than a target count of " + fmt(target) + " bacteria.";
  var sol = "Apply the doubling " + k + " times first, then compare with the target: \\[ \\begin{aligned} \\text{after " + k + " hours} &= " + n0 + " \\times 2^{" + k + "} = " + fmt(total) + " \\\\ \\text{excess} &= " + fmt(total) + " - " + fmt(target) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-growth-excess", total: total, target: target });
}, ["Work out the grown count first; the excess is a comparison made afterwards.", "Multiply the starting count by 2 raised to the number of hours as the first step."]);

// PG. L2, 3.12/3.14, CR 3: power of a power, then the difference of two powers.
E("u3-gap-power-diff-cr", 3, ["3.12", "3.14"], 2, "gen", function () {
  var a, m, n, p, big, small, diff, guard = 0;
  do { a = pick([2, 3]); m = ri(2, 4); n = ri(2, 3); p = ri(1, 4); big = Math.pow(a, m * n); small = Math.pow(a, p); diff = big - small; guard++; } while ((diff <= 0 || diff > 5000) && guard < 300);
  var c = pick([2, 3]);
  var ans = c * diff;
  var prompt = "Evaluate \\(" + c + "[(" + a + "^{" + m + "})^{" + n + "} - " + a + "^{" + p + "}]\\).";
  var sol = "Use the power of a power law first, evaluate both powers, subtract, then multiply: \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + (m * n) + "} = " + fmt(big) + " \\\\ " + a + "^{" + p + "} &= " + fmt(small) + " \\\\ " + c + " \\times (" + fmt(big) + " - " + fmt(small) + ") &= " + c + " \\times " + fmt(diff) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-power-diff", a: a, ans: ans });
}, ["The power of a power must be simplified before either power is evaluated.", "Multiply the two exponents in the first power as the first step."]);

// PG. L2, 3.12, SR: multi-law simplification with one-law-at-a-time error distractors.
E("u3-gap-laws-mc", 3, ["3.12"], 2, "gen", function () {
  var m = ri(2, 4), n = ri(1, 3), p = ri(2, 4), q = ri(1, 2);
  var e1 = m + n, e2 = p + q;
  function expr(u, v) { return "\\(x^{" + u + "} \\times y^{" + v + "}\\)"; }
  var prompt = "Simplify \\(\\frac{(x^{" + m + "} \\times y^{" + p + "})(x^{" + n + "} \\times y^{" + q + "})}{x^{" + n + "} \\times y^{" + q + "}}\\) by applying the exponent laws. Which expression is the simplified form?";
  var sol = "Apply the product law to each base, then the quotient law to each base: \\[ \\begin{aligned} x^{" + m + "} \\times x^{" + n + "} \\div x^{" + n + "} &= x^{" + e1 + "} \\\\ y^{" + p + "} \\times y^{" + q + "} \\div y^{" + q + "} &= y^{" + e2 + "} \\end{aligned} \\] The answer is <b>" + expr(e1, e2) + "</b>.";
  return mcq(prompt,
    { t: expr(e1, e2), fb: "Correct: each base is combined with the product law and then reduced with the quotient law." },
    [{ t: expr(e1, p), fb: "That keeps the first y exponent only; the y powers must also be combined with the product law before dividing." },
     { t: expr(m, e2), fb: "That keeps the first x exponent only; the x powers must also be combined with the product law before dividing." },
     { t: expr(m, p), fb: "That is the numerator's first factor on its own; neither base has been combined or divided yet." }],
    sol, { mode: "gap-laws-mc", e1: e1, e2: e2 });
}, ["Work one base at a time, and each base needs both the product law and the quotient law.", "Combine the two x powers in the numerator as the first step."]);

/* Unit 4: Polynomials */

// PG. L2, 8.6/8.11, CR 2: add two polynomials, then evaluate at a given x.
E("u4-gap-add-eval-cr", 4, ["8.6", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 + a2, sb = b1 + b2, sc = c1 + c2;
  var v = ri(2, 4);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Add the polynomials \\((" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ")\\), then evaluate the sum when \\(x = " + v + "\\).";
  var sol = "Combine like terms first, then substitute: \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-add-eval", sa: sa, sb: sb, sc: sc, v: v });
}, ["The sum must be simplified before the value of x can go in.", "Add the x squared coefficients together as the first step."]);

// PG. L2, 8.8/8.12, CR 2: multiply a monomial through a polynomial, give a named coefficient.
E("u4-gap-mono-coeff-cr", 4, ["8.8", "8.12"], 2, "gen", function () {
  var m = u4nz(-5, 5);
  if (m === 1 || m === -1) m = 3;
  var a = u4nz(-6, 6), b = u4nz(-6, 6), c = ri(-6, 6);
  var ans = m * b;
  var prodStr = u4expr([[m * a, "x^{3}"], [m * b, "x^{2}"], [m * c, "x"]]);
  var prompt = "Multiply \\(" + fmt(m) + "x(" + u4p(a, b, c) + ")\\). What is the coefficient of the \\(x^{2}\\) term in the product?";
  var sol = "Multiply the monomial through every term first: \\[ \\begin{aligned} " + fmt(m) + "x(" + u4p(a, b, c) + ") &= " + prodStr + " \\end{aligned} \\] The coefficient of the \\(x^{2}\\) term comes from \\(" + fmt(m) + "x \\times " + fmt(b) + "x\\). The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mono-coeff", m: m, b: b });
}, ["Every term inside the brackets is multiplied, and the named term is read off afterwards.", "Multiply the monomial by the x term inside the brackets as the first step."]);

// PG. L2, 8.12, CR 3: area of a rectangle with binomial sides, evaluated at a given x.
E("u4-gap-area-eval-cr", 4, ["8.12"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), v = ri(2, 6);
  var s1 = v + a, s2 = v + b, ans = s1 * s2;
  var prompt = "A rectangular garden plot has length \\((x + " + a + ")\\) metres and width \\((x + " + b + ")\\) metres. Find the area of the plot, in square metres, when \\(x = " + v + "\\).";
  var sol = "Evaluate each side first, then multiply the sides for the area: \\[ \\begin{aligned} \\text{length} &= " + v + " + " + a + " = " + s1 + " \\\\ \\text{width} &= " + v + " + " + b + " = " + s2 + " \\\\ \\text{area} &= " + s1 + " \\times " + s2 + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " m\\(^{2}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-area-eval", s1: s1, s2: s2 });
}, ["The area is a product of the two side lengths, and each side must be evaluated first.", "Substitute the value of x into the length as the first step."]);

// PG. L2, 8.7/8.11, CR 3: subtract polynomials (distribute the negative), then evaluate at a negative x.
E("u4-gap-sub-eval-neg-cr", 4, ["8.7", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 - a2, sb = b1 - b2, sc = c1 - c2;
  var v = -ri(1, 3);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Subtract \\((" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ")\\), then evaluate the difference when \\(x = " + v + "\\).";
  var sol = "Change every sign in the second polynomial first, then combine and substitute: \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sub-eval-neg", sa: sa, sb: sb, sc: sc, v: v });
}, ["Subtraction flips every sign in the second polynomial before like terms are combined.", "Rewrite the second polynomial with every sign changed as the first step."]);

// PG. L2, 8.5/8.6, CR 3: simplify a polynomial perimeter, then evaluate.
E("u4-gap-perimeter-eval-cr", 4, ["8.5", "8.6"], 2, "gen", function () {
  var a1 = u4nz(-4, 4), b1 = ri(-5, 5), a2 = u4nz(-4, 4), b2 = ri(-5, 5), a3 = u4nz(-4, 4), b3 = ri(-5, 5);
  var sx = a1 + a2 + a3, sk = b1 + b2 + b3;
  var v = ri(2, 5);
  var ans = sx * v + sk;
  function side(a, b) { return u4expr([[a, "x"], [b, ""]]); }
  var prompt = "A triangle has side lengths \\((" + side(a1, b1) + ")\\), \\((" + side(a2, b2) + ")\\) and \\((" + side(a3, b3) + ")\\), in centimetres. Find the perimeter of the triangle, in centimetres, when \\(x = " + v + "\\).";
  var sol = "Add the three sides and simplify first, then substitute: \\[ \\begin{aligned} P &= (" + side(a1, b1) + ") + (" + side(a2, b2) + ") + (" + side(a3, b3) + ") \\\\ &= " + side(sx, sk) + " \\\\ &= " + fmt(ans) + "\\text{ at } x = " + v + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-eval", sx: sx, sk: sk, v: v });
}, ["A perimeter is a sum of all the sides, simplified before the value goes in.", "Add the x coefficients from the three sides as the first step."]);

// PG. L2, 8.9/8.12, CR 3: divide a polynomial by a monomial, then evaluate the quotient.
E("u4-gap-div-eval-cr", 4, ["8.9", "8.12"], 2, "gen", function () {
  var m = pick([2, 3, 4]);
  var qa = u4nz(-5, 5), qb = u4nz(-6, 6), qc = ri(-5, 5);
  var A = m * qa, B = m * qb, C = m * qc;
  var v = ri(2, 4);
  var ans = qa * v * v + qb * v + qc;
  var prompt = "Divide \\((" + u4p(A, B, C) + ") \\div " + m + "x\\), then evaluate the quotient when \\(x = " + v + "\\).";
  var sol = "Divide every term by the monomial first, then substitute: \\[ \\begin{aligned} (" + u4p(A, B, C) + ") \\div " + m + "x &= " + u4p(qa, qb, qc) + " \\\\ " + u4p(qa, qb, qc) + "\\text{ at } x = " + v + " &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-eval", qa: qa, qb: qb, qc: qc, v: v });
}, ["Each term of the polynomial is divided separately before the value goes in.", "Divide the x squared term by the monomial as the first step."]);


/* Unit 5: Linear Equations and Inequalities */

// PG. L2, 8.27/8.28, CR 2: two-step inequality, answer is its boundary value.
E("u5-gap-ineq-boundary-cr", 5, ["8.27", "8.28"], 2, "gen", function () {
  var a = ri(2, 9), x0 = ri(2, 12), b = ri(-12, 12);
  if (b === 0) b = 5;
  var c = a * x0 + b;
  var sym = pick(["<", ">", "\\le", "\\ge"]);
  var prompt = "The inequality \\(" + u5lin(a, b) + " " + sym + " " + fmt(c) + "\\) has a boundary value where the two sides are exactly equal. What is the boundary value of \\(x\\)?";
  var sol = "Set the two sides equal and solve in two steps: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] The answer is <b>" + fmt(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-ineq-boundary", a: a, b: b, c: c });
}, ["The boundary is found by treating the inequality as an equation with equal sides.", "Move the constant term to the other side as the first step."]);

// PG. L2, 8.17, CR 2: equation with the variable on both sides.
E("u5-gap-both-sides-cr", 5, ["8.17"], 2, "gen", function () {
  var x0 = ri(-9, 9);
  if (x0 === 0) x0 = 4;
  var a = ri(4, 9), c = ri(2, a - 2), b = ri(-10, 10), d = b + (a - c) * x0;
  var prompt = "Solve the equation \\(" + u5lin(a, b) + " = " + u5lin(c, d) + "\\). What is the value of \\(x\\)?";
  var sol = "Collect the x terms on one side first, then collect the constants: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + u5lin(c, d) + " \\\\ " + fmt(a - c) + "x &= " + fmt(d - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] The answer is <b>" + fmt(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-both-sides", a: a, c: c, b: b, d: d });
}, ["The x terms start on both sides, so they must be gathered before dividing.", "Subtract the smaller x term from both sides as the first step."]);

// PG. L2, 8.30/8.21, CR 3: minimum whole number of items to reach a target (solve, then round up).
E("u5-gap-min-items-cr", 5, ["8.30", "8.21"], 2, "gen", function () {
  var s = ri(10, 60), p = ri(4, 9), q = ri(3, 11);
  var target = s + p * q + ri(1, p - 1);
  var ans = q + 1;
  var prompt = "A fundraising booth starts with $" + s + " and earns $" + p + " for each item sold. The booth wants to reach at least $" + target + ". What is the smallest whole number of items the booth must sell?";
  var sol = "Solve the inequality first: \\[ \\begin{aligned} " + s + " + " + p + "n &\\ge " + target + " \\\\ " + p + "n &\\ge " + (target - s) + " \\\\ n &\\ge " + fmt((target - s) / p, 2) + " \\end{aligned} \\] A part of an item cannot be sold, so the count rounds up to the next whole number. The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-min-items", s: s, p: p, target: target });
}, ["Solve the inequality first; the whole-number meaning of the count is decided afterwards.", "Subtract the starting amount from the target as the first step."]);

// PG. L2, 8.17/8.29, CR 3: solve (x + a)/b = c, then evaluate a short expression at the solution.
E("u5-gap-solve-eval-cr", 5, ["8.17", "8.29"], 2, "gen", function () {
  var b = ri(2, 6), c = ri(3, 9), a = ri(2, 12);
  var x = b * c - a;
  var e = ri(2, 15);
  var ans = 2 * x + e;
  var prompt = "Solve the equation \\(\\frac{x + " + a + "}{" + b + "} = " + c + "\\), then evaluate \\(2x + " + e + "\\) at the solution. Give the value of the expression.";
  var sol = "Undo the division first, then undo the addition, then substitute into the expression: \\[ \\begin{aligned} x + " + a + " &= " + (b * c) + " \\\\ x &= " + x + " \\\\ 2(" + x + ") + " + e + " &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-solve-eval", x: x, e: e });
}, ["The equation must be solved completely before its solution can be used in the expression.", "Multiply both sides by the denominator as the first step."]);

/* Unit 6: Linear Relations */

// PG. L2, 7.4/7.2, CR 2: slope extracted from a table's differences, then the value at a new x.
E("u6-gap-slope-table-cr", 6, ["7.4", "7.2"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(3, 15);
  var X = ri(9, 14);
  var ans = b + m * X;
  var rows = [0, 1, 2, 3].map(function (x) { return x + ": " + (b + m * x); }).join(", ");
  var prompt = "A linear relation has this table of values. x and y pairs: " + rows + ". The pattern continues in the same way. What is the value of y when x = " + X + "?";
  var sol = "The y values grow by " + m + " each step, and the start value at x = 0 is " + b + ": \\[ \\begin{aligned} y &= " + b + " + " + m + "x \\\\ y(" + X + ") &= " + b + " + " + m + "(" + X + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-slope-table", m: m, b: b, X: X });
}, ["The step size is hidden in the differences between neighbouring y values.", "Subtract two neighbouring y values to find the step as the first step."]);

// PG. L2, 7.7/7.8, CR 2: missing coordinate of a point on the line through two given points.
E("u6-gap-missing-coord-cr", 6, ["7.7", "7.8"], 2, "gen", function () {
  var m = ri(2, 5), b = ri(1, 12);
  var x1 = ri(0, 3), x2 = x1 + ri(2, 4), x3 = x2 + ri(2, 5);
  var y1 = b + m * x1, y2 = b + m * x2, ans = b + m * x3;
  var prompt = "The points (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ") lie on a straight line. The point (" + x3 + ", y) is also on the same line. What is the value of y?";
  var sol = "Find the slope from the two given points first, then extend the pattern to the new x: \\[ \\begin{aligned} \\text{slope} &= \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} = " + m + " \\\\ y &= " + y2 + " + " + m + "(" + x3 + " - " + x2 + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-missing-coord", m: m, x3: x3 });
}, ["The rate of the line must be worked out from the two complete points before the incomplete point can be used.", "Divide the change in y by the change in x for the two given points as the first step."]);

// PG. L2, 7.2/7.10, CR 3: break-even point of two cost plans (set equal, then solve).
E("u6-gap-break-even-cr", 6, ["7.2", "7.10"], 2, "gen", function () {
  var m1 = ri(2, 6), d = ri(2, 6), t = ri(3, 9);
  var m2 = m1 + d;
  var a2 = ri(5, 30), a1 = a2 + d * t;
  var prompt = "Plan A charges a fee of $" + a1 + " plus $" + m1 + " per hour. Plan B charges a fee of $" + a2 + " plus $" + m2 + " per hour. After how many hours do the two plans cost exactly the same?";
  var sol = "Set the two costs equal and solve: \\[ \\begin{aligned} " + a1 + " + " + m1 + "h &= " + a2 + " + " + m2 + "h \\\\ " + (a1 - a2) + " &= " + d + "h \\\\ h &= " + t + " \\end{aligned} \\] The answer is <b>" + t + "</b>.";
  return numq(prompt, t, 0.01, sol, { mode: "gap-break-even", t: t });
}, ["Break-even means the two total costs are equal, which gives an equation to solve.", "Write both plan costs with h hours and set them equal as the first step."]);

// PG. L2, 7.1/7.4, CR 3: build the relation from a pattern table, then evaluate far outside the table.
E("u6-gap-pattern-far-cr", 6, ["7.1", "7.4"], 2, "gen", function () {
  var m = ri(3, 7), s = ri(4, 12);
  var N = ri(18, 30);
  var ans = s + m * (N - 1);
  var c1 = s, c2 = s + m, c3 = s + 2 * m, c4 = s + 3 * m;
  var prompt = "A tile pattern grows in the same way at every step. Figure 1 uses " + c1 + " tiles, Figure 2 uses " + c2 + " tiles, Figure 3 uses " + c3 + " tiles and Figure 4 uses " + c4 + " tiles. How many tiles does Figure " + N + " use?";
  var sol = "Each figure adds " + m + " tiles, starting from " + s + " at Figure 1: \\[ \\begin{aligned} \\text{tiles} &= " + s + " + " + m + "(n - 1) \\\\ &= " + s + " + " + m + "(" + (N - 1) + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-pattern-far", m: m, s: s, N: N });
}, ["A general rule for the pattern must be built before a far figure can be evaluated.", "Find the difference between the counts of two neighbouring figures as the first step."]);

// PG. L2, 7.9/7.10, CR 3: use a stated linear relation in reverse (substitute the target, then solve).
E("u6-gap-inverse-cr", 6, ["7.9", "7.10"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(20, 80), t0 = ri(6, 14);
  var T = b + m * t0;
  var prompt = "A water tank is filling at a steady rate. The amount of water in the tank, in litres, after t minutes is given by A = " + b + " + " + m + "t. After how many minutes does the amount reach " + T + " litres?";
  var sol = "Set the relation equal to the target amount and solve for t: \\[ \\begin{aligned} " + b + " + " + m + "t &= " + T + " \\\\ " + m + "t &= " + (T - b) + " \\\\ t &= " + t0 + " \\end{aligned} \\] The answer is <b>" + t0 + "</b>.";
  return numq(prompt, t0, 0.01, sol, { mode: "gap-inverse", m: m, b: b, T: T });
}, ["The relation is used in reverse here: the amount is known and the time is missing.", "Set the expression equal to the target amount as the first step."]);

/* Unit 7: Similarity and Transformations */

// PG. L2, 10.17/10.15, CR 2: find the scale factor from one pair, then apply it to a second length.
E("u7-gap-scale-apply-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var o1 = pick([6, 8, 10, 12]);
  var i1 = o1 * k;
  var o2 = pick([5, 7, 9, 11, 14]);
  var ans = Math.round(o2 * k * 100) / 100;
  var ctx = pick([
    "A poster is an enlargement of a drawing. One side of the drawing is " + o1 + " cm and the matching side of the poster is " + fmt(i1) + " cm. Another side of the drawing is " + o2 + " cm. How long is the matching side of the poster, in centimetres?",
    "A banner is an enlargement of a logo. One side of the logo is " + o1 + " cm and the matching side of the banner is " + fmt(i1) + " cm. Another side of the logo is " + o2 + " cm. How long is the matching side of the banner, in centimetres?"
  ]);
  var sol = "Find the scale factor from the known pair first, then apply it to the second side: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(i1) + " \\div " + o1 + " = " + fmt(k) + " \\\\ \\text{new side} &= " + o2 + " \\times " + fmt(k) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(ctx, ans, 0.01, sol, { mode: "gap-scale-apply", k: k });
  q.figure = solBarsFig([{ name: "Original", len: o1, lab: fmt(o1) + " cm" }, { name: "Image", len: i1, lab: fmt(i1) + " cm" }, { name: "Original", len: o2, lab: fmt(o2) + " cm" }, { name: "Image", len: ans, lab: "?" }], "Matching sides of an original and its image as bars");
  return q;
}, ["The scale factor is not stated; it must be recovered from the pair of matching sides first.", "Divide the image side by its matching original side as the first step."]);

// PG. L2, 10.19/10.8, CR 2: map distance to real distance, then travel time at a stated speed.
E("u7-gap-map-time-cr", 7, ["10.19", "10.8"], 2, "gen", function () {
  var R, d, speed, real, hours, guard = 0;
  do { R = pick([4, 5, 6, 8, 9, 10, 12]); d = ri(4, 18); real = R * d; speed = pick([30, 40, 50, 60, 80, 90, 100, 120]); guard++; } while (((2 * real) % speed !== 0 || real / speed < 1 || real / speed > 4) && guard < 300);
  hours = real / speed;
  var prompt = "On a map, 1 cm represents " + R + " km. Two towns are " + d + " cm apart on the map. A bus drives between the towns at " + speed + " km/h. How many hours does the drive take?";
  var sol = "Use the scale to get the real distance first, then divide by the speed: \\[ \\begin{aligned} \\text{real distance} &= " + d + " \\times " + R + " = " + real + "\\text{ km} \\\\ \\text{time} &= " + real + " \\div " + speed + " = " + hours + "\\text{ h} \\end{aligned} \\] The answer is <b>" + hours + "</b>.";
  var q = numq(prompt, hours, 0.01, sol, { mode: "gap-map-time", R: R, real: real, speed: speed });
  var figB = solLine([60, 105], [280, 105], false, 2);
  figB += '<circle cx="60" cy="105" r="4" fill="' + FIG_INK + '"/><circle cx="280" cy="105" r="4" fill="' + FIG_INK + '"/>';
  figB += solT(170, 80, fmt(d) + " cm", 13, false);
  figB += solT(170, 134, "1 cm represents " + fmt(R) + " km", 12, false);
  q.figure = solSvg(340, 160, figB, "Map distance between two towns");
  return q;
}, ["The map measurement must be converted to a real distance before the speed can be used.", "Multiply the map distance by the scale value as the first step."]);

// PG. L2, 10.15/10.17, CR 3: area of the image using the square of the scale factor.
E("u7-gap-area-scale-cr", 7, ["10.15", "10.17"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var w = pick([4, 6, 8, 10]), h = pick([3, 5, 6, 9]);
  var iw = w * k;
  var area = Math.round(w * h * k * k * 100) / 100;
  var prompt = "A rectangle is " + w + " cm wide and " + h + " cm tall. It is enlarged so that the width becomes " + fmt(iw) + " cm. What is the area of the enlarged rectangle, in square centimetres?";
  var sol = "Find the scale factor from the widths first; areas grow by the square of the scale factor: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iw) + " \\div " + w + " = " + fmt(k) + " \\\\ \\text{original area} &= " + w + " \\times " + h + " = " + (w * h) + " \\\\ \\text{image area} &= " + (w * h) + " \\times " + fmt(k) + "^{2} = " + fmt(area) + " \\end{aligned} \\] The answer is <b>" + fmt(area) + " cm\\(^{2}\\)</b>.";
  var q = numq(prompt, area, 0.01, sol, { mode: "gap-area-scale", k: k });
  q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Original", w2: iw, h2: h * k, wLab2: fmt(iw) + " cm", hLab2: "?", cap2: "Enlarged", aria: "A rectangle and its enlargement with labelled sides" });
  return q;
}, ["Lengths and areas scale differently: the area factor is the square of the length factor.", "Divide the new width by the original width to get the scale factor as the first step."]);

// PG. L2, 10.19/10.15, CR 3: two shadow heights by proportion, then their difference.
E("u7-gap-shadow-diff-cr", 7, ["10.19", "10.15"], 2, "gen", function () {
  var hp = pick([1.5, 1.6, 1.8]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var m1 = ri(2, 4), m2 = ri(4, 6);
  if (m2 === m1) m2 = m1 + 2;
  var s1 = Math.round(sp * m1 * 10) / 10, s2 = Math.round(sp * m2 * 10) / 10;
  var h1 = Math.round(hp * m1 * 100) / 100, h2 = Math.round(hp * m2 * 100) / 100;
  var ans = Math.round(Math.abs(h2 - h1) * 100) / 100;
  var prompt = "A person " + fmt(hp) + " m tall casts a shadow " + fmt(sp) + " m long. At the same time, a fence casts a shadow " + fmt(s1) + " m long and a tree casts a shadow " + fmt(s2) + " m long. The objects and their shadows form similar triangles. Find the difference between the height of the tree and the height of the fence, in metres.";
  var sol = "Use the person's shadow ratio on each object first, then compare the two heights: \\[ \\begin{aligned} \\text{fence} &= " + fmt(hp) + " \\times \\frac{" + fmt(s1) + "}{" + fmt(sp) + "} = " + fmt(h1) + " \\\\ \\text{tree} &= " + fmt(hp) + " \\times \\frac{" + fmt(s2) + "}{" + fmt(sp) + "} = " + fmt(h2) + " \\\\ \\text{difference} &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " m</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-shadow-diff", h1: h1, h2: h2 });
  q.figure = solShadowFig([{ name: "Person", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Fence", h: h1, s: s1, hLab: "?", sLab: fmt(s1) + " m" }, { name: "Tree", h: h2, s: s2, hLab: "?", sLab: fmt(s2) + " m" }], "A person, a fence and a tree with their shadows");
  return q;
}, ["Each height comes from the same shadow proportion, and the difference is found only after both heights are known.", "Divide the fence shadow by the person's shadow to get the first scale as the first step."]);

// PG. L2, 10.17/10.15, CR 3: perimeter of the image after finding the factor from one pair of sides.
E("u7-gap-perimeter-scale-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9);
  var k = pick([1.5, 2, 2.5, 3, 4]);
  var ai = Math.round(a * k * 10) / 10;
  var P = a + b + c;
  var ans = Math.round(P * k * 100) / 100;
  var prompt = "A triangle has side lengths " + a + " cm, " + b + " cm and " + c + " cm. A similar triangle has the side matching the " + a + " cm side measuring " + fmt(ai) + " cm. What is the perimeter of the similar triangle, in centimetres?";
  var sol = "Find the scale factor from the matching sides first, then scale the whole perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(ai) + " \\div " + a + " = " + fmt(k) + " \\\\ \\text{perimeter} &= (" + a + " + " + b + " + " + c + ") \\times " + fmt(k) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-scale", k: k, P: P });
  if (a + b > c && a + c > b && b + c > a) {
    var P1 = u7FitTri([a, b, c], 16, 28, 128, 112), P2 = u7FitTri([a * k, b * k, c * k], 192, 28, 128, 112);
    q.figure = u7Svg(345, 165, u7Poly(P1, FIG_SHADE) + solSideLabels(P1, [fmt(c) + " cm", fmt(a) + " cm", fmt(b) + " cm"]) + u7Poly(P2, "#ffffff") + solSideLabels(P2, ["?", fmt(ai) + " cm", "?"]), "An original triangle and a similar triangle with side labels");
  }
  return q;
}, ["Perimeters scale by the same factor as the sides, and that factor comes from the one known pair.", "Divide the image side by its matching original side as the first step."]);


/* Unit 8: Circle Geometry */

// PG. L2, 9.7, CR 2: reflex arc measure from an inscribed angle (inscribed to central to reflex).
E("u8-gap-reflex-arc-cr", 8, ["9.7"], 2, "gen", function () {
  var ins = ri(28, 80);
  var central = 2 * ins, ans = 360 - central;
  var prompt = "Points A, B and C lie on a circle with centre O. The inscribed angle ACB measures \\(" + ins + "^{\\circ}\\) and it subtends the minor arc AB. Find the measure of the reflex arc AB, in degrees.";
  var sol = "The central angle on the minor arc is double the inscribed angle first; the reflex arc is what remains of the full circle: \\[ \\begin{aligned} \\text{minor arc AB} &= 2 \\times " + ins + "^{\\circ} = " + central + "^{\\circ} \\\\ \\text{reflex arc AB} &= 360^{\\circ} - " + central + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-reflex-arc", ins: ins });
  var A = u8P(270 - ins), B = u8P(270 + ins), C = u8P(90);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmt(ins) + "°" }] });
  return q;
}, ["An inscribed angle and its central angle are linked, and a reflex arc completes the full turn.", "Double the inscribed angle to get the minor arc as the first step."]);

// PG. L2, 9.5, CR 2: angle in a cyclic quadrilateral after combining the parts split by a diagonal.
E("u8-gap-cyclic-diag-cr", 8, ["9.5"], 2, "gen", function () {
  var p = ri(20, 55), q = ri(20, 55);
  var ans = 180 - p - q;
  var prompt = "Points A, B, C and D lie on a circle in that order, so ABCD is a cyclic quadrilateral. The diagonal AC splits angle A into two parts: angle BAC measures \\(" + p + "^{\\circ}\\) and angle CAD measures \\(" + q + "^{\\circ}\\). Find the measure of angle BCD, in degrees.";
  var sol = "Combine the two parts of angle A first; opposite angles of a cyclic quadrilateral add to \\(180^{\\circ}\\): \\[ \\begin{aligned} \\angle A &= " + p + "^{\\circ} + " + q + "^{\\circ} = " + (p + q) + "^{\\circ} \\\\ \\angle BCD &= 180^{\\circ} - " + (p + q) + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + ans + "^{\\circ}\\)</b>.";
  var qq = numq(prompt, ans, 0.01, sol, { mode: "gap-cyclic-diag", p: p, q: q });
  var A = u8P(200), B = u8P(300), C = u8P(300 + 2 * p), D = u8P(300 + 2 * p + 2 * q);
  qq.figure = u8Fig({ pts: { A: A, B: B, C: C, D: D }, segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]], angles: [{ v: "A", a1: u8Dir(A, B), a2: u8Dir(A, C), r: 0.26, lr: 0.46, label: fmt(p) + "°" }, { v: "A", a1: u8Dir(A, C), a2: u8Dir(A, D), r: 0.4, lr: 0.6, label: fmt(q) + "°" }] });
  return qq;
}, ["Angle A is given in two pieces, and the cyclic property applies to the whole angle.", "Add the two parts of angle A together as the first step."]);

// PG. L2, 9.7/9.5, CR 3: central angle found from a tangent-radius triangle, then halved for the inscribed angle.
E("u8-gap-tangent-central-cr", 8, ["9.7", "9.5"], 2, "gen", function () {
  var g = 14 + 2 * ri(0, 31);
  var central = 90 - g, ans = central / 2;
  var frame = pick(["line", "external"]);
  var prompt = frame === "line"
    ? "A line through T and P is a tangent to a circle with centre O, touching the circle at T. The line from O through P meets the circle again at D. In triangle OTP, the angle at P measures \\(" + g + "^{\\circ}\\). Point C is on the major arc TD. Find the measure of the inscribed angle TCD, in degrees."
    : "From a point P outside a circle with centre O, a tangent touches the circle at T, and the line from P through O meets the circle again at D. In triangle OTP, the angle at P measures \\(" + g + "^{\\circ}\\). Point C is on the major arc TD. Find the measure of the inscribed angle TCD, in degrees.";
  var sol = "The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T. Find the central angle first, then halve it: \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + g + "^{\\circ} = " + central + "^{\\circ} \\\\ \\angle TCD &= " + central + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] The answer is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-tangent-central", g: g });
  var tAng = pick([200, 230, 260, 290, 320]);
  var sgn = Math.random() < 0.5 ? 1 : -1;
  var T = u8P(tAng), U = u8P(tAng + sgn * central);
  var sc = 1 / Math.cos(central * Math.PI / 180);
  var P = [U[0] * sc, U[1] * sc], D = U, C = u8P(tAng + sgn * central / 2 + 180);
  q.figure = u8Fig({ pts: { T: T, P: P, D: D, C: C }, segs: [["O", "T"], ["O", "P"], ["C", "T"], ["C", "D"]], tangentSeg: { at: "T", to: "P", beyond: 1.05, back: 0.3 }, rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }], angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmt(g) + "°" }, { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["Two circle facts chain together here: the tangent fact builds the triangle, and the inscribed angle is half the central angle.", "Use the right angle at T to find the central angle TOD as the first step."]);

// PG. L2, 9.6/9.5, CR 3: chord radius where the perpendicular-from-centre bisection comes before Pythagoras.
E("u8-gap-chord-bisect-cr", 8, ["9.6", "9.5"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var half = (swap ? tr[1] : tr[0]) * kk, d = (swap ? tr[0] : tr[1]) * kk, r = tr[2] * kk;
  var chord = 2 * half;
  var frame = pick(["circle", "window"]);
  var prompt = frame === "circle"
    ? "AB is a chord of a circle with centre O. The chord AB is " + chord + " cm long, and the perpendicular distance from O to the chord is " + d + " cm. Find the radius of the circle, in centimetres."
    : "A circular window has centre O, and a straight bar AB across the window is a chord of the circle. The bar AB is " + chord + " cm long, and the perpendicular distance from O to the bar is " + d + " cm. Find the radius of the window, in centimetres.";
  var sol = "The perpendicular from the centre bisects the chord first; then the radius is the hypotenuse of the right triangle: \\[ \\begin{aligned} \\text{half the chord} &= " + chord + " \\div 2 = " + half + " \\\\ r^{2} &= " + d + "^{2} + " + half + "^{2} = " + (d * d + half * half) + " \\\\ r &= " + r + " \\end{aligned} \\] The answer is <b>" + r + " cm</b>.";
  var q = numq(prompt, r, 0.01, sol, { mode: "gap-chord-bisect", half: half, d: d, r: r });
  var A = [-half / r, d / r], B = [half / r, d / r];
  q.figure = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "A", b: "B", text: fmt(chord) + " cm", off: 15 }, { a: "O", b: "M", text: fmt(d) + " cm", off: 15 }, { a: "O", b: "A", text: "?", off: 15 }] });
  return q;
}, ["The radius is the hypotenuse of a right triangle whose one side is only half of the given chord.", "Halve the chord length as the first step."]);

// PG. L2, 9.8/9.5, CR 3: semicircle right angle first, then Pythagoras for the third side.
E("u8-gap-semicircle-pyth-cr", 8, ["9.8", "9.5"], 2, "gen", function () {
  var tr = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var given = (swap ? tr[1] : tr[0]) * kk, ans = (swap ? tr[0] : tr[1]) * kk, hyp = tr[2] * kk;
  var frame = pick(["circle", "arch"]);
  var prompt = frame === "circle"
    ? "AB is a diameter of a circle, and C is a point on the circle. The diameter AB is " + hyp + " cm long and the side AC is " + given + " cm long. Find the length of BC, in centimetres."
    : "A semicircular arch has diameter AB of " + hyp + " cm. The point C is on the arch, and the straight distance AC is " + given + " cm. Find the straight distance BC, in centimetres.";
  var sol = "An angle inscribed in a semicircle is a right angle, so triangle ABC is right-angled at C and Pythagoras applies: \\[ \\begin{aligned} BC^{2} &= " + hyp + "^{2} - " + given + "^{2} = " + (hyp * hyp - given * given) + " \\\\ BC &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "gap-semicircle-pyth", given: given, hyp: hyp });
  var gam = Math.acos(Math.max(-1, Math.min(1, 2 * (given / hyp) * (given / hyp) - 1))) * 180 / Math.PI;
  var A = [-1, 0], B = [1, 0], C = u8P(gam);
  q.figure = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }], sideLabs: [{ a: "A", b: "C", text: fmt(given) + " cm", off: 15 }, { a: "B", b: "C", text: "?", off: 15 }] });
  return q;
}, ["The diameter tells you the triangle is right-angled before any side can be found.", "Note that angle C is a right angle because it sits in a semicircle, as the first step."]);

// PG. L2, 9.7, SR: an angle requiring two circle theorems in sequence, with single-theorem distractors.
E("u8-gap-two-theorems-mc", 8, ["9.7"], 2, "gen", function () {
  var p = pick([18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var nm = pick([["Q", "R", "S", "T"], ["A", "B", "C", "D"], ["K", "L", "M", "N"], ["W", "X", "Y", "Z"]]);
  var P1 = nm[0], P2 = nm[1], P3 = nm[2], P4 = nm[3];
  var ans = 180 - p;
  function deg(v) { return "\\(" + v + "^{\\circ}\\)"; }
  var prompt = "Points " + P1 + ", " + P2 + ", " + P3 + " and " + P4 + " lie on a circle with centre O. Point " + P3 + " is on the major arc " + P1 + P2 + " and the inscribed angle " + P1 + P3 + P2 + " measures " + deg(p) + ". Point " + P4 + " is on the minor arc " + P1 + P2 + ". What is the measure of the inscribed angle " + P1 + P4 + P2 + "?";
  var sol = "The minor arc is fixed by the central angle first, and the angle on the minor arc uses the reflex central angle: \\[ \\begin{aligned} \\text{minor central angle} &= 2 \\times " + p + "^{\\circ} = " + (2 * p) + "^{\\circ} \\\\ \\text{reflex central angle} &= 360^{\\circ} - " + (2 * p) + "^{\\circ} = " + (360 - 2 * p) + "^{\\circ} \\\\ \\angle " + P1 + P4 + P2 + " &= " + (360 - 2 * p) + "^{\\circ} \\div 2 = " + ans + "^{\\circ} \\end{aligned} \\] The answer is <b>" + deg(ans) + "</b>.";
  var q = mcq(prompt,
    { t: deg(ans), fb: "Correct: the reflex central angle is halved, which takes both the doubling step and the reflex step." },
    [{ t: deg(2 * p), fb: "That is the minor central angle on its own; the inscribed angle still has to be taken from the reflex angle on the other arc." },
     { t: deg(p), fb: "That repeats the given angle, but the asked point sits on the opposite arc, so its angle is not the same." },
     { t: deg(360 - 2 * p), fb: "That is the reflex central angle itself; an inscribed angle is half of its central angle, so one more halving is needed." }],
    sol, { mode: "gap-two-theorems", p: p });
  var pts = {};
  var A = u8P(270 - p), B = u8P(270 + p), C3 = u8P(90), D4 = u8P(270);
  pts[P1] = A; pts[P2] = B; pts[P3] = C3; pts[P4] = D4;
  q.figure = u8Fig({ pts: pts, segs: [[P3, P1], [P3, P2], [P4, P1], [P4, P2]], angles: [{ v: P3, a1: u8Dir(C3, A), a2: u8Dir(C3, B), r: 0.3, lr: 0.55, label: fmt(p) + "°" }, { v: P4, a1: u8Dir(D4, A), a2: u8Dir(D4, B), r: 0.3, lr: 0.55, label: "?" }] });
  return q;
}, ["The point sits on the opposite arc, so the reflex central angle is the one that belongs to it.", "Double the given inscribed angle to get the minor central angle as the first step."]);

/* Unit 9: Probability and Statistics */

// PG. L2, 11.9, CR 2: mean from a frequency table (sum of fx, then divide).
E("u9-gap-freq-mean-cr", 9, ["11.9"], 2, "gen", function () {
  var f1 = ri(2, 9), f2 = ri(2, 9), f3 = ri(2, 9), f4 = ri(2, 9);
  var S = 1 * f1 + 2 * f2 + 3 * f3 + 4 * f4, N = f1 + f2 + f3 + f4;
  var ans = Math.round(S / N * 100) / 100;
  var prompt = "A class records how many books each student read in a month. The results are: 1 book for " + f1 + " students, 2 books for " + f2 + " students, 3 books for " + f3 + " students, and 4 books for " + f4 + " students. Find the mean number of books read, to two decimal places.";
  var sol = "Multiply each value by its frequency and add first, then divide by the total number of students: \\[ \\begin{aligned} \\text{total books} &= 1(" + f1 + ") + 2(" + f2 + ") + 3(" + f3 + ") + 4(" + f4 + ") = " + S + " \\\\ \\text{mean} &= \\frac{" + S + "}{" + N + "} = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.02, sol, { mode: "gap-freq-mean", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs.", "Multiply each book count by its number of students as the first step."]);

// PG. L2, 12.4, CR 2: expected frequency from a probability over N trials.
E("u9-gap-expected-freq-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8, 10]);
  var a = ri(1, b - 1);
  var mult = ri(12, 30);
  var N = b * mult, ans = a * mult;
  var prompt = "A spinner is divided into " + b + " equal sectors, and " + a + " of the sectors are red. The spinner is spun " + N + " times. How many of the spins are expected to land on red?";
  var sol = "The probability of red gives the expected share of the spins: \\[ \\begin{aligned} P(\\text{red}) &= \\frac{" + a + "}{" + b + "} \\\\ \\text{expected red} &= \\frac{" + a + "}{" + b + "} \\times " + N + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-expected-freq", a: a, b: b, N: N });
}, ["An expected count is the probability applied to the whole set of trials.", "Write the probability of red as a fraction as the first step."]);

// PG. L2, 12.2, CR 3: probability of at least one success via the complement, as a percent.
E("u9-gap-complement-pct-cr", 9, ["12.2"], 2, "gen", function () {
  var p = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  var trials = pick([2, 3]);
  var ctx = pick([
    { subj: "A free-throw shooter", verb: "scores" },
    { subj: "An archer", verb: "hits the target" },
    { subj: "A soccer player", verb: "scores" }
  ]);
  var fail = 100 - p;
  var bothFail = Math.round(Math.pow(fail, trials) / Math.pow(100, trials - 1) * 100) / 100;
  var ans = Math.round((100 - bothFail) * 100) / 100;
  var chain = [];
  for (var i = 0; i < trials; i++) chain.push(fail + "\\%");
  var prompt = ctx.subj + " " + ctx.verb + " on " + p + "% of attempts, and the attempts are independent. The attempts number " + trials + " in a row. Find the probability, as a percent, that the attempts include at least one success.";
  var named = ctx.subj === "An archer" ? "the archer" : (ctx.subj === "A soccer player" ? "the player" : "the shooter");
  prompt = ctx.subj + " " + ctx.verb + " on " + p + "% of attempts, and the attempts are independent. In a set of " + trials + " attempts, find the probability, as a percent, that " + named + " succeeds at least once.";
  var sol = "Work through the complement first: the only way to succeed zero times is to fail every attempt: \\[ \\begin{aligned} P(\\text{fail}) &= 100\\% - " + p + "\\% = " + fail + "\\% \\\\ P(\\text{fail all}) &= " + chain.join(" \\times ") + " = " + fmt(bothFail) + "\\% \\\\ P(\\text{at least once}) &= 100\\% - " + fmt(bothFail) + "\\% = " + fmt(ans) + "\\% \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-complement-pct", p: p, trials: trials });
}, ["At least once is everything except the single case where it never happens.", "Find the probability of one failure as the first step."]);

// PG. L2, 11.9, CR 3: difference of the means of two small data sets.
E("u9-gap-mean-diff-cr", 9, ["11.9"], 2, "gen", function () {
  function makeSet() {
    var v = [ri(2, 20), ri(2, 20), ri(2, 20), ri(2, 20)];
    return { v: v, s: v[0] + v[1] + v[2] + v[3] };
  }
  var A = makeSet(), B = makeSet(), guard = 0;
  while (A.s === B.s && guard < 60) { B = makeSet(); guard++; }
  var mA = A.s / 4, mB = B.s / 4;
  var ans = Math.round(Math.abs(mA - mB) * 100) / 100;
  var prompt = "Team A scores " + A.v.join(", ") + " points in four games. Team B scores " + B.v.join(", ") + " points in four games. Find the difference between the mean score of Team A and the mean score of Team B.";
  var sol = "Find each team's mean first, then take the difference: \\[ \\begin{aligned} \\text{mean A} &= \\frac{" + A.s + "}{4} = " + fmt(mA) + " \\\\ \\text{mean B} &= \\frac{" + B.s + "}{4} = " + fmt(mB) + " \\\\ \\text{difference} &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-diff", mA: mA, mB: mB });
}, ["Two means must be worked out separately before they can be compared.", "Add Team A's four scores as the first step."]);

// PG. L2, 11.6, CR 3: sample count scaled to a population, then the excess over a threshold.
E("u9-gap-sample-scale-cr", 9, ["11.6"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "A survey of " + ns + " students finds that " + c + " of them walk to school. The whole school has " + fmt(pop) + " students. Predict how many students in the whole school walk to school, and find how many more that prediction is than " + fmt(T) + " students. Give the excess as your answer.";
  var sol = "Scale the sample count up to the population first: \\[ \\begin{aligned} \\text{scale} &= " + fmt(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prediction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excess} &= " + pred + " - " + fmt(T) + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["The sample result must be scaled to the full population before any comparison is made.", "Divide the population by the sample size to get the scale as the first step."]);

// PG. L2, 12.4, CR 3: expected wins from a probability over many plays, then the total points.
E("u9-gap-win-points-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8]);
  var a = ri(1, b - 1);
  var N = b * ri(15, 40);
  var w = ri(2, 6);
  var wins = a * (N / b), ans = wins * w;
  var prompt = "A carnival game is won with probability \\(" + FR(a, b) + "\\). A player plays the game " + N + " times, and each win scores " + w + " points. How many points is the player expected to score in total?";
  var sol = "Find the expected number of wins first, then multiply by the points for each win: \\[ \\begin{aligned} \\text{expected wins} &= " + FR(a, b) + " \\times " + N + " = " + wins + " \\\\ \\text{expected points} &= " + wins + " \\times " + w + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-win-points", wins: wins, w: w });
}, ["Points come from wins, so the expected win count must be found before points can be totalled.", "Multiply the probability by the number of plays as the first step."]);

// PG. L2, 11.9, SR: frequency-table mean with forgot-to-divide and wrong-divisor distractors.
E("u9-gap-freq-mean-mc", 9, ["11.9"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "A survey records the number of pets per household. The table shows: " + v1 + " pet for " + f1 + " households, " + v2 + " pets for " + f2 + " households, and " + v3 + " pets for " + f3 + " households. What is the mean number of pets per household?";
  var sol = "Multiply each value by its frequency, add, and divide by the total frequency: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmt(mean) + " \\end{aligned} \\] The answer is <b>" + fmtF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtF(mean, 2), fb: "Correct: the weighted total is divided by the total number of households." },
    [{ t: fmtF(S, 2), fb: "That is the weighted total on its own; it still has to be divided by the total number of households." },
     { t: fmtF(dWrongDiv, 2), fb: "That divides by the number of rows in the table; the divisor should be the total number of households." },
     { t: fmtF(dDouble, 2), fb: "That counts the last row of the table twice before dividing, which inflates the total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs, then divides by the total count.", "Multiply each pet count by its number of households as the first step."]);

