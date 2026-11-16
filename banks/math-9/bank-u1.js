// Math 9 Unit 1 Rational Numbers question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 21 to 323).
// CRMARKS: u1-frac-context=3
// CRMARKS: u1-money-decimals=3
// CRMARKS: u1-ooo-evaluate-mc=3
// CRMARKS: u1-ooo-calculator=2
// CRMARKS: u1-ooo-first-error=2
// CRMARKS: u1-ordering-reasoning-var=2
// CRMARKS: u1-multistep-rational=3
/* Unit 1: Rational Numbers */
// Unit 1: Rational Numbers (Math 9, NL). Entries only; helpers prefixed u1.
function u1gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u1red(n, d) { var g = u1gcd(n, d); return [n / g, d / g]; }
function u1frac(n, d) { var r = u1red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < 0) return "\\(-" + FR(-n, d) + "\\)"; return "\\(" + FR(n, d) + "\\)"; }
function u1round(x, p) { var m = Math.pow(10, p); return Math.round(x * m) / m; }

// 1. L1, 3.1: order four rational numbers, least to greatest.
E("u1-order-four", 1, ["3.1"], 1, "gen", function () {
  var negPool = [
    { v: -2.5, f: "-" + FR(5, 2) }, { v: -1.75, f: "-" + FR(7, 4) }, { v: -1.5, f: "-" + FR(3, 2) },
    { v: -1.25, f: "-" + FR(5, 4) }, { v: -1.2, f: "-" + FR(6, 5) }, { v: -0.8, f: "-" + FR(4, 5) },
    { v: -0.75, f: "-" + FR(3, 4) }, { v: -0.5, f: "-" + FR(1, 2) }, { v: -0.4, f: "-" + FR(2, 5) },
    { v: -0.25, f: "-" + FR(1, 4) }
  ];
  var posPool = [
    { v: 0.2, f: FR(1, 5) }, { v: 0.25, f: FR(1, 4) }, { v: 0.4, f: FR(2, 5) }, { v: 0.5, f: FR(1, 2) },
    { v: 0.6, f: FR(3, 5) }, { v: 0.75, f: FR(3, 4) }, { v: 0.8, f: FR(4, 5) }, { v: 1.25, f: FR(5, 4) },
    { v: 1.5, f: FR(3, 2) }, { v: 1.75, f: FR(7, 4) }, { v: 2.25, f: FR(9, 4) }, { v: 2.5, f: FR(5, 2) },
    { v: 3.5, f: FR(7, 2) }
  ];
  var nNeg = ri(1, 2);
  var items = shuffle(negPool).slice(0, nNeg).concat(shuffle(posPool).slice(0, 4 - nNeg));
  items.forEach(function (it) { it.s = "\\(" + (Math.random() < 0.5 ? it.f : fmt(it.v)) + "\\)"; });
  var sorted = items.slice().sort(function (a, b) { return a.v - b.v; });
  function listOf(arr) { return arr.map(function (it) { return it.s; }).join(", "); }
  var correct = listOf(sorted);
  var rev = listOf(sorted.slice().reverse());
  var swapArr = sorted.slice(); var tmp = swapArr[0]; swapArr[0] = swapArr[1]; swapArr[1] = tmp;
  var swapped = listOf(swapArr);
  var shuf = listOf(shuffle(sorted));
  var guard = 0;
  while ((shuf === correct || shuf === rev || shuf === swapped) && guard < 60) { shuf = listOf(shuffle(sorted)); guard++; }
  if (shuf === correct || shuf === rev || shuf === swapped) { var s2 = sorted.slice(); var t2 = s2[2]; s2[2] = s2[3]; s2[3] = t2; shuf = listOf(s2); }
  var prompt = "Which set is ordered from least to greatest?";
  var solution = "Compare the values as decimals: \\[ \\begin{aligned} " + sorted.map(function (it) { return fmt(it.v); }).join(" &< ") + " \\end{aligned} \\] So the order from least to greatest is <b>" + correct + "</b>.";
  return mcq(prompt,
    { t: correct, fb: "Correct. The values increase steadily from left to right." },
    [
      { t: rev, fb: "This lists the numbers from greatest to least instead." },
      { t: swapped, fb: "The first two values are swapped, so it starts out of order." },
      { t: shuf, fb: "At least one pair in this list is out of order." }
    ],
    solution, { mode: "order-four", vals: sorted.map(function (it) { return it.v; }).join(",") });
}, ["Picture the numbers on a number line, with negatives on the left.", "Rewrite each fraction as a decimal, then compare the decimals."]);

// 2. L1, 3.2: a rational number between two given numbers.
E("u1-between-two", 1, ["3.2"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(-20, 24) / 4;
    var gap = ri(3, 10) / 4;
    var b = a + gap;
    var c = a + gap / 2;
    var low = a - ri(1, 4) / 4;
    var high = b + ri(1, 4) / 4;
    var promptD = "Which number is between \\(" + fmt(a) + "\\) and \\(" + fmt(b) + "\\)?";
    var solD = "The number must be greater than \\(" + fmt(a) + "\\) and less than \\(" + fmt(b) + "\\): \\[ \\begin{aligned} " + fmt(a) + " &< " + fmt(c) + " < " + fmt(b) + " \\end{aligned} \\] So the number between them is <b>\\(" + fmt(c) + "\\)</b>.";
    return mcq(promptD,
      { t: fmt(c), fb: "Correct. It is greater than the left endpoint and less than the right one." },
      fmtPairDs(fmt(c), [
        { v: low, fb: "That number is smaller than the left endpoint." },
        { v: high, fb: "That number is larger than the right endpoint." },
        { v: a, fb: "That is the left endpoint itself, not a number between them." }
      ]),
      solD, { mode: "between-dec", a: a, b: b });
  }
  var den = pick([6, 8, 10, 12]);
  var an = ri(-12, 12);
  var diff = ri(4, 10);
  var bn = an + diff;
  var cn = an + ri(1, diff - 1);
  var lowN = an - ri(1, 4);
  var highN = bn + ri(1, 4);
  var promptF = "Which number is between " + u1frac(an, den) + " and " + u1frac(bn, den) + "?";
  var solF = "With a common denominator, compare the numerators: \\[ \\begin{aligned} " + FR(an, den) + " &< " + FR(cn, den) + " < " + FR(bn, den) + " \\end{aligned} \\] So the number between them is <b>" + u1frac(cn, den) + "</b>.";
  return mcq(promptF,
    { t: u1frac(cn, den), fb: "Correct. Its numerator sits between the two given numerators." },
    [
      { t: u1frac(lowN, den), fb: "That number is smaller than the left endpoint." },
      { t: u1frac(highN, den), fb: "That number is larger than the right endpoint." },
      { t: u1frac(an, den), fb: "That is the left endpoint itself, not a number between them." }
    ],
    solF, { mode: "between-frac", a: an, b: bn, d: den });
}, ["A number between two others is bigger than the smaller one and smaller than the bigger one.", "Compare each choice with both endpoints, one at a time."]);

// 3. L2, 6.1, CR 3: add or subtract fractions in context, answer as a decimal.
E("u1-frac-context", 1, ["6.1"], 1, "gen", function () {
  var dens = [2, 4, 5, 8, 10, 20];
  var d1 = pick(dens), d2 = pick(dens);
  var n1 = ri(1, 15), n2 = ri(1, 15);
  var v1 = n1 / d1, v2 = n2 / d2;
  var sub = Math.random() < 0.5;
  if (sub && v2 > v1) { var tn = n1; n1 = n2; n2 = tn; var td = d1; d1 = d2; d2 = td; v1 = n1 / d1; v2 = n2 / d2; }
  if (sub && Math.abs(v1 - v2) < 0.01) { n1 += d1; v1 = n1 / d1; }
  var ctxs = ["cups of flour", "metres of ribbon", "litres of juice"];
  var thing = pick(ctxs);
  var ans = u1round(sub ? v1 - v2 : v1 + v2, 4);
  var lcm = (d1 * d2) / u1gcd(d1, d2);
  var e1 = n1 * (lcm / d1), e2 = n2 * (lcm / d2);
  var resN = sub ? e1 - e2 : e1 + e2;
  var prompt = sub
    ? "A project starts with " + u1frac(n1, d1) + " " + thing + ". Then " + u1frac(n2, d2) + " " + thing + " is used. How much is left? Give your answer as a decimal."
    : "A project uses " + u1frac(n1, d1) + " " + thing + " in the morning and " + u1frac(n2, d2) + " " + thing + " in the afternoon. How much is used in total? Give your answer as a decimal.";
  var solution = "Use the common denominator \\(" + lcm + "\\): \\[ \\begin{aligned} " + FR(n1, d1) + (sub ? " - " : " + ") + FR(n2, d2) + " &= " + FR(e1, lcm) + (sub ? " - " : " + ") + FR(e2, lcm) + " \\\\ &= " + FR(resN, lcm) + " = " + fmt(ans) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: sub ? "sub-frac-ctx" : "add-frac-ctx", a: n1, b: d1, c: n2, d: d2 });
}, ["Fractions with different denominators need a common denominator first.", "Rewrite both fractions with the least common denominator, then combine the numerators."]);

// 4. L2, 6.1, CR 3: money with decimals, total cost or change.
E("u1-money-decimals", 1, ["6.1"], 1, "gen", function () {
  var items = [["notebook", "pen", "snack bar"], ["juice box", "muffin", "apple"], ["poster", "marker set", "sticker pack"], ["bus pass top-up", "coffee", "sandwich"]];
  var set = pick(items);
  if (Math.random() < 0.5) {
    var p1 = ri(125, 2499), p2 = ri(125, 2499), p3 = ri(99, 1999);
    var tot = (p1 + p2 + p3) / 100;
    var promptT = "Sam buys a " + set[0] + " for $" + (p1 / 100).toFixed(2) + ", a " + set[1] + " for $" + (p2 / 100).toFixed(2) + ", and a " + set[2] + " for $" + (p3 / 100).toFixed(2) + ". What is the total cost, in dollars?";
    var solT = "Add the three prices: \\[ \\begin{aligned} " + (p1 / 100).toFixed(2) + " + " + (p2 / 100).toFixed(2) + " + " + (p3 / 100).toFixed(2) + " &= " + tot.toFixed(2) + " \\end{aligned} \\] So the total cost is <b>$" + tot.toFixed(2) + "</b>.";
    return numq(promptT, u1round(tot, 2), 0.005, solT, { mode: "money-total", p1: p1, p2: p2, p3: p3 });
  }
  var bill = pick([20, 50, 100]);
  var cost = ri(350, bill * 100 - 250);
  var change = (bill * 100 - cost) / 100;
  var promptC = "A school hoodie costs $" + (cost / 100).toFixed(2) + ". Priya pays with a $" + bill + " bill. How much change does she get, in dollars?";
  var solC = "Subtract the cost from the amount paid: \\[ \\begin{aligned} " + bill.toFixed(2) + " - " + (cost / 100).toFixed(2) + " &= " + change.toFixed(2) + " \\end{aligned} \\] So the change is <b>$" + change.toFixed(2) + "</b>.";
  return numq(promptC, u1round(change, 2), 0.005, solC, { mode: "money-change", bill: bill, cost: cost });
}, ["Line up the decimal points before you add or subtract money amounts.", "Work in dollars and cents, keeping two decimal places for cents."]);

// 5. L2, 6.2, CR 3: order of operations without technology, MC with complete-instruction prompt.
E("u1-ooo-evaluate-mc", 1, ["6.2"], 2, "gen", function () {
  var mode = ri(0, 2);
  var expr, val, errs, steps;
  if (mode === 0) {
    var x = ri(4, 24) / 2, y = ri(2, 16) / 2, c = ri(2, 6), d = ri(2, 20) / 2;
    val = (x + y) * c - d;
    expr = "\\((" + fmt(x) + " + " + fmt(y) + ") \\times " + c + " - " + fmt(d) + "\\)";
    errs = [
      { v: x + y * c - d, fb: "This ignores the brackets and multiplies before adding inside them." },
      { v: (x + y) * (c - d), fb: "This groups the subtraction with the multiplication, which changes the order." },
      { v: (x + y) * c + d, fb: "This adds the last number instead of subtracting it." }
    ];
    steps = "\\[ \\begin{aligned} (" + fmt(x) + " + " + fmt(y) + ") \\times " + c + " - " + fmt(d) + " &= " + fmt(x + y) + " \\times " + c + " - " + fmt(d) + " \\\\ &= " + fmt((x + y) * c) + " - " + fmt(d) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  } else if (mode === 1) {
    var a = ri(5, 40) / 2, b = ri(2, 12) / 2, k = ri(3, 9);
    val = a + b * k;
    expr = "\\(" + fmt(a) + " + " + fmt(b) + " \\times " + k + "\\)";
    errs = [
      { v: (a + b) * k, fb: "This adds first, but multiplication is done before addition." },
      { v: a + b + k, fb: "This changes the multiplication into an addition." },
      { v: a * b + k, fb: "This multiplies the first two numbers, which are not grouped together." }
    ];
    steps = "\\[ \\begin{aligned} " + fmt(a) + " + " + fmt(b) + " \\times " + k + " &= " + fmt(a) + " + " + fmt(b * k) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  } else {
    var fn = pick([1, 3]), fd = pick([2, 4]);
    var fv = fn / fd, bb = ri(5, 14), cc = ri(1, 4), dd = ri(2, 20) / 2;
    val = u1round(fv * (bb - cc) + dd, 4);
    expr = "\\(" + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmt(dd) + "\\)";
    errs = [
      { v: u1round(fv * bb - cc + dd, 4), fb: "This ignores the brackets and multiplies before subtracting inside them." },
      { v: u1round(fv * (bb - cc) - dd, 4), fb: "This subtracts the last number instead of adding it." },
      { v: u1round((fv + bb - cc) + dd, 4), fb: "This adds the first numbers instead of multiplying by the fraction." }
    ];
    steps = "\\[ \\begin{aligned} " + FR(fn, fd) + " \\times (" + bb + " - " + cc + ") + " + fmt(dd) + " &= " + FR(fn, fd) + " \\times " + (bb - cc) + " + " + fmt(dd) + " \\\\ &= " + fmt(u1round(fv * (bb - cc), 4)) + " + " + fmt(dd) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\]";
  }
  var ds = [];
  var used = {};
  used[fmt(val)] = 1;
  errs.forEach(function (e) { var key = fmt(u1round(e.v, 4)); if (!used[key] && ds.length < 3) { used[key] = 1; ds.push({ t: key, fb: e.fb }); } });
  var offs = [2, -2, 1, -1, 3, -3, 0.5, -0.5];
  var oi = 0;
  while (ds.length < 3 && oi < offs.length) { var cand = u1round(val + offs[oi], 4); oi++; var k2 = fmt(cand); if (!used[k2]) { used[k2] = 1; ds.push({ t: k2, fb: "This comes from an arithmetic slip in one of the steps." }); } }
  ds = fmtPairDs(fmt(val), ds.map(function (d) { return { v: parseFloat(d.t), fb: d.fb }; }));
  var prompt = "Evaluate: " + expr;
  var solution = "Follow the order of operations, brackets first, then multiplication, then addition and subtraction: " + steps + " So the value is <b>" + fmt(val) + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. Brackets first, then multiplication, then addition and subtraction." },
    ds, solution, { mode: "ooo-mc-" + mode, val: val });
}, ["Do brackets first, then multiplication and division, then addition and subtraction.", "Rewrite the expression after each single step so the order stays clear."]);

// 6. L2, 6.3, CR 2: order of operations with technology, longer decimal expression.
E("u1-ooo-calculator", 1, ["6.3"], 1, "gen", function () {
  var a = ri(20, 200) / 10, b = ri(10, 90) / 10, c = ri(2, 9), d = ri(5, 50) / 10;
  var e = pick([2, 4, 5]);
  var f = ri(5, 60) / 10;
  var s1 = a + b, s2 = s1 * c, s3 = s2 - d, s4 = s3 / e, val = s4 + f;
  var ans = u1round(val, 2);
  var expr = "\\(((" + fmt(a) + " + " + fmt(b) + ") \\times " + c + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + "\\)";
  var prompt = "Use a calculator to evaluate the expression in one full entry: " + expr + " Give your answer to 2 decimal places.";
  var solution = "Work through the brackets first, keeping full precision until the end: \\[ \\begin{aligned} ((" + fmt(a) + " + " + fmt(b) + ") \\times " + c + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + " &= (" + fmt(s2) + " - " + fmt(d) + ") \\div " + e + " + " + fmt(f) + " \\\\ &= " + fmt(u1round(s4, 4)) + " + " + fmt(f) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "ooo-calc", a: a, b: b, c: c, d: d, e: e, f: f });
}, ["Enter the whole expression at once, using bracket keys around grouped parts.", "Do the innermost brackets first if you check the value in stages."]);

// 7. L2, 6.4, CR 2: find the first error in a worked solution, MC.
E("u1-ooo-first-error", 1, ["6.4"], 2, "gen", function () {
  var scen = ri(0, 3);
  var expr, stepTexts, errIdx, correctVal, errExplain;
  if (scen === 0) {
    var a0 = ri(2, 9), b0 = ri(2, 9), c0 = ri(2, 6), d0 = ri(1, 8);
    var M0 = b0 * c0, S0 = a0 + M0, F0 = S0 - d0;
    expr = "\\((" + a0 + " + " + b0 + ") \\times " + c0 + " - " + d0 + "\\)";
    stepTexts = ["\\(" + b0 + " \\times " + c0 + " = " + M0 + "\\)", "\\(" + a0 + " + " + M0 + " = " + S0 + "\\)", "\\(" + S0 + " - " + d0 + " = " + F0 + "\\)", "the value is \\(" + F0 + "\\)"];
    errIdx = 0; correctVal = (a0 + b0) * c0 - d0;
    errExplain = "Step 1 multiplies before doing the brackets, but brackets come first";
  } else if (scen === 1) {
    var m1 = ri(2, 8), p1 = ri(2, 9), q1 = ri(1, 9), r1 = ri(1, 9);
    var S1 = p1 + q1, W1 = m1 + S1, F1 = W1 - r1;
    expr = "\\(" + m1 + " \\times (" + p1 + " + " + q1 + ") - " + r1 + "\\)";
    stepTexts = ["\\(" + p1 + " + " + q1 + " = " + S1 + "\\)", "\\(" + m1 + " + " + S1 + " = " + W1 + "\\)", "\\(" + W1 + " - " + r1 + " = " + F1 + "\\)", "the value is \\(" + F1 + "\\)"];
    errIdx = 1; correctVal = m1 * S1 - r1;
    errExplain = "Step 2 adds where the expression says to multiply";
  } else if (scen === 2) {
    var a2 = ri(3, 12), b2 = ri(2, 9), c2 = ri(2, 6), d2 = ri(1, 9);
    var M2 = b2 * c2, S2 = a2 + M2, W2 = S2 + d2;
    expr = "\\(" + a2 + " + " + b2 + " \\times " + c2 + " - " + d2 + "\\)";
    stepTexts = ["\\(" + b2 + " \\times " + c2 + " = " + M2 + "\\)", "\\(" + a2 + " + " + M2 + " = " + S2 + "\\)", "\\(" + S2 + " + " + d2 + " = " + W2 + "\\)", "the value is \\(" + W2 + "\\)"];
    errIdx = 2; correctVal = S2 - d2;
    errExplain = "Step 3 adds where the expression says to subtract";
  } else {
    var a3 = ri(2, 9), b3 = ri(2, 8), c3 = ri(1, 10), d3 = ri(1, 10);
    var P3 = a3 * b3, S3 = P3 - c3, F3 = S3 + d3, W3 = F3 + pick([2, 3, 4]);
    expr = "\\(" + a3 + " \\times " + b3 + " - " + c3 + " + " + d3 + "\\)";
    stepTexts = ["\\(" + a3 + " \\times " + b3 + " = " + P3 + "\\)", "\\(" + P3 + " - " + c3 + " = " + S3 + "\\)", "\\(" + S3 + " + " + d3 + " = " + F3 + "\\)", "the value is \\(" + W3 + "\\)"];
    errIdx = 3; correctVal = F3;
    errExplain = "Step 4 states a value that does not match the result of Step 3";
  }
  var prompt = "A student evaluates " + expr + ". Their work is shown. Step 1: " + stepTexts[0] + ". Step 2: " + stepTexts[1] + ". Step 3: " + stepTexts[2] + ". Step 4: " + stepTexts[3] + ". In which step does the first error occur?";
  var opts = [0, 1, 2, 3].map(function (i) {
    var fb;
    if (i === errIdx) fb = "Correct. " + errExplain + ".";
    else if (i < errIdx) fb = "This step is correct, so the first error is later.";
    else fb = "This step follows from the earlier wrong value, so it is not the first error.";
    return { t: "Step " + (i + 1), fb: fb };
  });
  var correctOpt = opts[errIdx];
  var distractors = opts.filter(function (o, i) { return i !== errIdx; });
  var solution = errExplain + ". Done correctly, the expression has value \\(" + fmt(correctVal) + "\\). So the first error is in <b>Step " + (errIdx + 1) + "</b>.";
  return mcq(prompt, correctOpt, distractors, solution, { mode: "first-error-" + scen, err: errIdx + 1 });
}, ["Check each step against the order of operations, starting at Step 1.", "A later step can look wrong only because it uses an earlier wrong value."]);

// 8. L3, 3.1 and 3.2, CR 2: varset of three MC statics.
E("u1-ordering-reasoning-var", 1, ["3.1", "3.2"], 3, "var", varset([
  function () {
    var prompt = "What number is exactly halfway between " + u1frac(-3, 4) + " and " + u1frac(1, 2) + "?";
    var solution = "Add the two numbers, then divide by 2: \\[ \\begin{aligned} -" + FR(3, 4) + " + " + FR(1, 2) + " &= -" + FR(1, 4) + " \\\\ -" + FR(1, 4) + " \\div 2 &= -" + FR(1, 8) + " \\end{aligned} \\] So the halfway number is <b>\\(-" + FR(1, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(-" + FR(1, 8) + "\\)", fb: "Correct. It is the average of the two endpoints." },
      [
        { t: "\\(-" + FR(1, 4) + "\\)", fb: "That is the sum of the endpoints, before dividing by 2." },
        { t: "\\(" + FR(1, 8) + "\\)", fb: "The sign is wrong, since the halfway point is still negative." },
        { t: "\\(-" + FR(5, 8) + "\\)", fb: "That point sits much closer to the lower endpoint." }
      ],
      solution, { mode: "halfway-neg-frac" });
  },
  function () {
    var prompt = "Numbers are equally spaced on a number line and are shown in order: \\(-0.9, -0.3, ?, 0.9\\). What is the missing number?";
    var solution = "Each step adds \\(0.6\\): \\[ \\begin{aligned} -0.9 + 0.6 &= -0.3 \\\\ -0.3 + 0.6 &= 0.3 \\\\ 0.3 + 0.6 &= 0.9 \\end{aligned} \\] So the missing number is <b>0.3</b>.";
    return mcq(prompt,
      { t: "0.3", fb: "Correct. Each step along the number line adds 0.6." },
      [
        { t: "0.0", fb: "Zero would make the steps uneven, since the gaps would differ." },
        { t: "0.6", fb: "That skips one step, giving a gap of 0.9 before it." },
        { t: "-0.6", fb: "The numbers are increasing, so the missing number is positive." }
      ],
      solution, { mode: "missing-spaced" });
  },
  function () {
    var prompt = "A set of numbers is \\(-" + FR(2, 3) + ", 0.\\overline{3}, -0.5, " + FR(3, 4) + "\\). What is the sum of the greatest and least numbers in the set?";
    var solution = "The greatest number is \\(" + FR(3, 4) + "\\) and the least is \\(-" + FR(2, 3) + "\\), since \\(-" + FR(2, 3) + "\\) is less than \\(-0.5\\): \\[ \\begin{aligned} " + FR(3, 4) + " + \\left(-" + FR(2, 3) + "\\right) &= " + FR(9, 12) + " - " + FR(8, 12) + " \\\\ &= " + FR(1, 12) + " \\end{aligned} \\] So the sum is <b>\\(" + FR(1, 12) + "\\)</b>.";
    return mcq(prompt,
      { t: "\\(" + FR(1, 12) + "\\)", fb: "Correct. The greatest and least are the two end values of the set." },
      [
        { t: "\\(-" + FR(1, 12) + "\\)", fb: "The sign is wrong, since the positive value has the larger size." },
        { t: "\\(" + FR(17, 12) + "\\)", fb: "That is the difference between the greatest and least, not their sum." },
        { t: "\\(" + FR(1, 4) + "\\)", fb: "That adds the greatest number to negative one half instead of the least." }
      ],
      solution, { mode: "sum-greatest-least" });
  }
]), ["For a halfway value, average the two endpoints.", "Compare every value in a set, watching signs and repeating decimals, before choosing."]);

// 9. L3, 6.1, CR 3: multi-step problem, numq.
E("u1-multistep-rational", 1, ["6.1"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-160, 80) / 4, r1 = ri(2, 20) / 4, f1 = ri(2, 16) / 4, r2 = ri(2, 12) / 4;
    var ans = u1round(start + r1 - f1 + r2, 4);
    var promptT = "At 6 a.m. the temperature in St. John's is " + fmt(start) + " degrees. By noon it rises by " + fmt(r1) + " degrees, by 6 p.m. it falls by " + fmt(f1) + " degrees, and by midnight it rises by " + fmt(r2) + " degrees. Determine the temperature at midnight, in degrees.";
    var solT = "Apply each change in order: \\[ \\begin{aligned} " + fmt(start) + " + " + fmt(r1) + " - " + fmt(f1) + " + " + fmt(r2) + " &= " + fmt(u1round(start + r1, 4)) + " - " + fmt(f1) + " + " + fmt(r2) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the temperature at midnight is <b>" + fmt(ans) + " degrees</b>.";
    return numq(promptT, ans, 0.01, solT, { mode: "temp-change", start: start });
  }
  if (mode === 1) {
    var startC = ri(2000, 20000), depC = ri(500, 8000), w1C = ri(400, 6000), w2C = ri(300, 5000);
    var ansB = u1round((startC + depC - w1C - w2C) / 100, 2);
    var promptB = "A bank account starts with $" + (startC / 100).toFixed(2) + ". A deposit of $" + (depC / 100).toFixed(2) + " is made, then withdrawals of $" + (w1C / 100).toFixed(2) + " and $" + (w2C / 100).toFixed(2) + " are made. Determine the final balance, in dollars.";
    var solB = "Add the deposit and subtract both withdrawals: \\[ \\begin{aligned} " + (startC / 100).toFixed(2) + " + " + (depC / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " &= " + ((startC + depC) / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " \\\\ &= " + ansB.toFixed(2) + " \\end{aligned} \\] So the final balance is <b>$" + ansB.toFixed(2) + "</b>.";
    return numq(promptB, ansB, 0.01, solB, { mode: "bank-balance", start: startC });
  }
  var dens = [2, 4, 5, 8, 10];
  var dA = pick(dens), dB = pick(dens), dC = pick(dens);
  var nA = ri(3, 30), nB = ri(3, 30), nC = ri(3, 30);
  var ansD = u1round(nA / dA + nB / dB + nC / dC, 4);
  var promptD = "On a three day hike, a group walks " + u1frac(nA, dA) + " km on day 1, " + u1frac(nB, dB) + " km on day 2, and " + u1frac(nC, dC) + " km on day 3. Determine the total distance walked, in kilometres, as a decimal.";
  var solD = "Add the three distances as decimals: \\[ \\begin{aligned} " + FR(nA, dA) + " + " + FR(nB, dB) + " + " + FR(nC, dC) + " &= " + fmt(u1round(nA / dA, 4)) + " + " + fmt(u1round(nB / dB, 4)) + " + " + fmt(u1round(nC / dC, 4)) + " \\\\ &= " + fmt(ansD) + " \\end{aligned} \\] So the total distance is <b>" + fmt(ansD) + " km</b>.";
  return numq(promptD, ansD, 0.01, solD, { mode: "distance-3day", a: nA, b: nB, c: nC });
}, ["Break the problem into one change or part at a time, in order.", "Start from the opening value and apply each step before moving to the next."]);

