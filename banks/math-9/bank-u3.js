// Math 9 Unit 3 Powers and Exponent Laws question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 674 to 1127).
// CRMARKS: u3-two-laws-evaluate=3
// CRMARKS: u3-power-of-product-quotient=3
// CRMARKS: u3-sum-of-powers=3
// CRMARKS: u3-difference-of-powers=2
// CRMARKS: u3-find-the-error=2
// CRMARKS: u3-three-laws-evaluate=3
// CRMARKS: u3-law-then-sum-difference=2
/* Unit 3: Powers and Exponent Laws */
// Unit 3: Powers and Exponent Laws

function u3Pick3(correct, pairs) {
  var out = [], seen = {};
  seen[String(correct)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var v = pairs[i].v;
    if (!seen[String(v)]) { seen[String(v)] = 1; out.push({ t: fmt(v), fb: pairs[i].fb }); }
  }
  return out;
}
function u3PowDist(a, correctExp, pairs) {
  var out = [], seen = {};
  seen[String(correctExp)] = 1;
  for (var i = 0; i < pairs.length && out.length < 3; i++) {
    var e = pairs[i].v;
    if (!seen[String(e)]) { seen[String(e)] = 1; out.push({ t: "\\(" + a + "^{" + e + "}\\)", fb: pairs[i].fb }); }
  }
  return out;
}
function u3MultStr(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(String(factor));
  return "\\(" + parts.join("\\times ") + "\\)";
}

E("u3-repeated-multiplication", 3, ["3.6"], 1, "gen", function () {
  var b = ri(2, 12), e = ri(2, 6);
  var correct = u3MultStr(b, e);
  var cands = [
    { t: u3MultStr(b, e + 1), fb: "That uses one factor too many. Count the exponent." },
    { t: u3MultStr(b, e - 1), fb: "That uses one factor too few. Count the exponent." },
    { t: u3MultStr(e, e), fb: "That repeats the exponent. The base is the repeated factor." },
    { t: u3MultStr(b, b), fb: "That repeats the base as many times as its own value." },
    { t: u3MultStr(b + 1, e), fb: "That changes the base. Keep the base from the power." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < cands.length && ds.length < 3; i++) { if (!seen[cands[i].t]) { seen[cands[i].t] = 1; ds.push(cands[i]); } }
  return mcq("What is \\(" + b + "^{" + e + "}\\) written as repeated multiplication?",
    { t: correct, fb: "Correct. The base repeats as many times as the exponent says." }, ds,
    "The base is \\(" + b + "\\) and the exponent is \\(" + e + "\\), so write \\(" + b + "\\) as a factor \\(" + e + "\\) times: \\[ " + correct.replace("\\(", "").replace("\\)", "") + " \\] So the repeated multiplication is <b>" + correct + "</b>.",
    { mode: "power-to-repeated", b: b, e: e });
}, ["The exponent tells you how many times the base appears as a factor.", "Write the base down, then keep multiplying by it until you have used the exponent count."]);

E("u3-power-from-repeated", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["pos", "neg"]);
  if (mode === "pos") {
    var b = ri(2, 9), c = ri(2, 6);
    while (b === c) { b = ri(2, 9); }
    var shown = u3MultStr(b, c);
    var ds = u3PowDist(b, c, [
      { v: b, fb: "That swaps the base and the count of factors." },
      { v: c + 1, fb: "That adds one to the exponent. Count the factors shown." },
      { v: c - 1, fb: "That subtracts one from the exponent. Count the factors shown." },
      { v: b + c, fb: "That adds the base and count. The exponent is just the count." }
    ]);
    // u3PowDist builds options with base b, but the swapped option needs base c; fix by rebuilding manually when needed
    return mcq("What is " + shown + " written as a single power?",
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "Correct. The repeated factor is the base and the count is the exponent." },
      [
        { t: "\\(" + c + "^{" + b + "}\\)", fb: "That swaps the base and the count of factors." },
        { t: "\\(" + b + "^{" + (c + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
        { t: "\\(" + b + "^{" + Math.max(1, c - 1) + "}\\)", fb: "That subtracts one from the exponent. Count the factors shown." }
      ],
      "There are \\(" + c + "\\) factors, and each factor is \\(" + b + "\\), so the power is \\(" + b + "^{" + c + "}\\). So the single power is <b>\\(" + b + "^{" + c + "}\\)</b>.",
      { mode: "repeated-to-power-pos", b: b, c: c });
  }
  var nb = ri(2, 6), nc = ri(2, 5);
  while (nb === nc) { nb = ri(2, 6); }
  var nshown = u3MultStr("(-" + nb + ")", nc);
  return mcq("What is " + nshown + " written as a single power?",
    { t: "\\((-" + nb + ")^{" + nc + "}\\)", fb: "Correct. The whole bracketed value is the repeated base." },
    [
      { t: "\\(" + nb + "^{" + nc + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + nb + ")^{" + (nc + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((-" + nc + ")^{" + nb + "}\\)", fb: "That swaps the base value and the count of factors." }
    ],
    "There are \\(" + nc + "\\) factors, and each factor is \\((-" + nb + ")\\), so the power is \\((-" + nb + ")^{" + nc + "}\\). So the single power is <b>\\((-" + nb + ")^{" + nc + "}\\)</b>.",
    { mode: "repeated-to-power-neg", b: nb, c: nc });
}, ["Count the factors first. That count becomes the exponent.", "Write the repeated factor as the base, then use your count as the exponent."]);

E("u3-evaluate-single-power", 3, ["3.10"], 1, "gen", function () {
  var tuples = [];
  for (var pb = 2; pb <= 12; pb++) for (var pe = 2; pe <= 4; pe++) tuples.push([pb, pe, 1]);
  for (var qb = 2; qb <= 6; qb++) tuples.push([qb, 5, 1]);
  for (var nb2 = 2; nb2 <= 9; nb2++) for (var ne = 2; ne <= 3; ne++) tuples.push([nb2, ne, -1]);
  var tt = pick(tuples), b = tt[0], e = tt[1], mode = tt[2] < 0 ? "neg" : "pos";
  var val, shown;
  if (mode === "neg") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else { val = Math.pow(b, e); shown = b + "^{" + e + "}"; }
  var base = (mode === "neg") ? -b : b;
  var sol = "Expand as repeated multiplication and multiply step by step: \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.";
  return numq("Evaluate \\(" + shown + "\\).", val, 0, sol, { mode: "evaluate-single", base: base, e: e });
}, ["Expand the power as repeated multiplication first.", "Multiply the base by itself, using the exponent as the count."]);

E("u3-interchanged-base-exponent", 3, ["3.4", "3.5"], 1, "gen", function () {
  var tuples = [];
  for (var x = 2; x <= 8; x++) for (var y = 2; y <= 5; y++) {
    if (x === y) continue;
    var vx = Math.pow(x, y), vy = Math.pow(y, x);
    if (vx === vy || vx > 20000 || vy > 20000) continue;
    tuples.push([x, y, vx, vy]);
  }
  var t = pick(tuples), a = t[0], b = t[1], va = t[2], vb = t[3];
  var mode = pick(["evalA", "evalB", "greater", "difference"]);
  if (mode === "greater") {
    var greater = va > vb ? "\\(" + a + "^{" + b + "}\\)" : "\\(" + b + "^{" + a + "}\\)";
    var other = va > vb ? "\\(" + b + "^{" + a + "}\\)" : "\\(" + a + "^{" + b + "}\\)";
    return mcq("Which is greater, \\(" + a + "^{" + b + "}\\) or \\(" + b + "^{" + a + "}\\)?",
      { t: greater, fb: "Correct. Its repeated multiplication gives the larger value." },
      [
        { t: other, fb: "That power has the smaller value. Expand both and compare." },
        { t: "\\(" + a + "^{" + a + "}\\)", fb: "That changes the exponent to match the base." },
        { t: "\\(" + b + "^{" + b + "}\\)", fb: "That changes the exponent to match the base." }
      ],
      "Expand each power: \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmt(va) + " \\\\ " + b + "^{" + a + "} &= " + fmt(vb) + " \\end{aligned} \\] Comparing the values, the greater power is <b>" + greater + "</b>.",
      { mode: "which-greater", a: a, b: b });
  }
  if (mode === "difference") {
    var diff = Math.abs(va - vb);
    var ds = u3Pick3(diff, [
      { v: diff + a, fb: "That is a little too large. Subtract the two values carefully." },
      { v: Math.abs(diff - b), fb: "That is a little too small. Subtract the two values carefully." },
      { v: va + vb, fb: "That adds the values. The question asks for the difference." },
      { v: diff + 10, fb: "That is too large. Find each value, then subtract." },
      { v: Math.abs(a - b), fb: "That subtracts the small numbers, not the two power values." }
    ]);
    return mcq("What is the difference between \\(" + a + "^{" + b + "}\\) and \\(" + b + "^{" + a + "}\\)?",
      { t: fmt(diff), fb: "Correct. You found both values and subtracted." }, ds,
      "Find each value first: \\[ \\begin{aligned} " + a + "^{" + b + "} &= " + fmt(va) + " \\\\ " + b + "^{" + a + "} &= " + fmt(vb) + " \\end{aligned} \\] The difference is \\(" + fmt(Math.max(va, vb)) + "-" + fmt(Math.min(va, vb)) + "=" + fmt(diff) + "\\). So the difference is <b>" + fmt(diff) + "</b>.",
      { mode: "difference-interchanged", a: a, b: b });
  }
  var isA = (mode === "evalA");
  var base = isA ? a : b, exp = isA ? b : a, val = isA ? va : vb;
  var ds2 = u3Pick3(val, [
    { v: base * exp, fb: "That multiplies the base and exponent. Use repeated multiplication." },
    { v: isA ? vb : va, fb: "That is the value with the base and exponent swapped." },
    { v: val + base, fb: "That is a little too large. Expand the power fully." },
    { v: Math.abs(val - base), fb: "That is a little too small. Expand the power fully." },
    { v: base + exp, fb: "That adds the base and exponent. Use repeated multiplication." }
  ]);
  return mcq("What is the value of \\(" + base + "^{" + exp + "}\\)?",
    { t: fmt(val), fb: "Correct. The base repeats as many times as the exponent says." }, ds2,
    "The base \\(" + base + "\\) repeats \\(" + exp + "\\) times: \\[ \\begin{aligned} " + base + "^{" + exp + "} &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "evaluate-interchanged", base: base, exp: exp });
}, ["Expand both powers as repeated multiplication before you compare or subtract.", "Write out the first power in full, multiplying the base by itself."]);

E("u3-parentheses-sign", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 9), e = ri(2, 4);
  if (b >= 8 && e === 4) e = 3;
  var form = pick(["bracket", "outside", "inside"]);
  var val, shown;
  if (form === "bracket") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else if (form === "outside") { val = -Math.pow(b, e); shown = "-" + b + "^{" + e + "}"; }
  else { val = -Math.pow(b, e); shown = "(-" + b + "^{" + e + "})"; }
  var ds = u3Pick3(val, [
    { v: -val, fb: "That has the opposite sign. Check what the brackets cover." },
    { v: Math.pow(b, e), fb: "That ignores the negative sign in the expression." },
    { v: -Math.pow(b, e), fb: "That puts the negative sign outside the power." },
    { v: b * e, fb: "That multiplies the base and exponent. Use repeated multiplication." },
    { v: val + b, fb: "That is close, but the sign or value is off. Expand carefully." },
    { v: val - b, fb: "That is close, but the sign or value is off. Expand carefully." }
  ]);
  var explain = form === "bracket" ? "The brackets make \\((-" + b + ")\\) the base, so the negative value is multiplied each time." : "The power applies to \\(" + b + "\\) first, and the negative sign stays outside.";
  return mcq("Evaluate \\(" + shown + "\\).",
    { t: fmt(val), fb: "Correct. You handled the brackets and the sign correctly." }, ds,
    explain + " \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "parentheses-" + form, b: b, e: e });
}, ["Look at what the brackets cover. That tells you what the base is.", "Work out the power part first, then apply the sign the brackets give you."]);

E("u3-zero-exponent", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["direct", "direct", "pattern"]);
  if (mode === "pattern") {
    var a = ri(2, 9);
    var ds = u3Pick3(1, [
      { v: 0, fb: "That treats the zero exponent as giving zero. Follow the pattern down." },
      { v: a, fb: "That is the value of the first power, not the zero power." },
      { v: a * a, fb: "That is the value of the squared power, not the zero power." }
    ]);
    return mcq("A pattern shows \\(" + a + "^{3}=" + fmt(Math.pow(a, 3)) + "\\), \\(" + a + "^{2}=" + fmt(Math.pow(a, 2)) + "\\) and \\(" + a + "^{1}=" + fmt(a) + "\\). Each step divides by \\(" + a + "\\). What is \\(" + a + "^{0}\\)?",
      { t: "1", fb: "Correct. Dividing once more by the base gives one." }, ds,
      "Each step down divides by \\(" + a + "\\): \\[ \\begin{aligned} " + a + "^{1}\\div " + a + " &= " + fmt(a) + "\\div " + a + " \\\\ &= 1 \\end{aligned} \\] So the value is <b>1</b>.",
      { mode: "zero-pattern", a: a });
  }
  var aList = [];
  for (var ai = -20; ai <= 20; ai++) { if (ai !== 0 && ai !== 1 && ai !== -1) aList.push(ai); }
  aList = aList.concat([2.5, 3.5, 4.5, 5.5, -2.5, -3.5, -4.5, -5.5, 0.5, -0.5, 1.5, -1.5]);
  var a2 = pick(aList);
  var shownA = a2 < 0 ? "(" + a2 + ")^{0}" : a2 + "^{0}";
  var ds2 = u3Pick3(1, [
    { v: 0, fb: "That treats the zero exponent as giving zero." },
    { v: a2, fb: "That keeps the base as the answer. A zero exponent gives one." },
    { v: -1, fb: "That has the wrong sign. A zero exponent gives positive one." }
  ]);
  if (Math.abs(a2 - Math.round(a2)) > 1e-9) { for (var zi = 0; zi < ds2.length; zi++) { if (ds2[zi].t === "0") { ds2[zi].t = "0.0"; break; } } }
  return mcq("Evaluate \\(" + shownA + "\\).",
    { t: "1", fb: "Correct. Any nonzero base to the power zero equals one." }, ds2,
    "A power with exponent \\(0\\) and a nonzero base equals \\(1\\): \\[ \\begin{aligned} " + shownA + " &= 1 \\end{aligned} \\] So the value is <b>1</b>.",
    { mode: "zero-direct", a: a2 });
}, ["Think about the pattern as the exponent drops by one each time.", "Divide the value of the first power by the base to reach the zero power."]);

E("u3-product-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 6), n = ri(1, 6);
  if (m === 2 && n === 2) n = 3;
  var ds = u3PowDist(a, m + n, [
    { v: m * n, fb: "That multiplies the exponents. The product law adds them." },
    { v: m + n + 1, fb: "That adds one extra. Add the two exponents only." },
    { v: m + n - 1, fb: "That is one too small. Add the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. The product law adds them." },
    { v: m * n + 1, fb: "That multiplies and adds one. Add the exponents instead." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\times " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m + n) + "}\\)", fb: "Correct. Same base, so the exponents add." }, ds,
    "The bases match, so add the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + m + "+" + n + "} \\\\ &= " + a + "^{" + (m + n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m + n) + "}\\)</b>.",
    { mode: "product-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the product law.", "Add the two exponents and keep the same base."]);

E("u3-quotient-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), n = ri(1, 4), m = n + ri(2, 5);
  var ds = u3PowDist(a, m - n, [
    { v: m + n, fb: "That adds the exponents. The quotient law subtracts them." },
    { v: m * n, fb: "That multiplies the exponents. The quotient law subtracts them." },
    { v: m - n + 1, fb: "That is one too large. Subtract the exponents only." },
    { v: m - n - 1, fb: "That is one too small, or uses the wrong order." },
    { v: m, fb: "That keeps the top exponent. Subtract the bottom exponent." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\div " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m - n) + "}\\)", fb: "Correct. Same base, so the exponents subtract." }, ds,
    "The bases match, so subtract the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\div " + a + "^{" + n + "} &= " + a + "^{" + m + "-" + n + "} \\\\ &= " + a + "^{" + (m - n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m - n) + "}\\)</b>.",
    { mode: "quotient-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the quotient law.", "Subtract the bottom exponent from the top exponent."]);

E("u3-power-of-power-law", 3, ["3.11"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 5), n = ri(2, 4);
  var ds = u3PowDist(a, m * n, [
    { v: m + n, fb: "That adds the exponents. A power of a power multiplies them." },
    { v: m * n + 1, fb: "That is one too large. Multiply the two exponents only." },
    { v: m * n - 1, fb: "That is one too small. Multiply the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. Multiply them instead." },
    { v: m, fb: "That keeps only the inner exponent. Use both exponents." }
  ]);
  return mcq("Write \\((" + a + "^{" + m + "})^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m * n) + "}\\)", fb: "Correct. A power of a power multiplies the exponents." }, ds,
    "For a power of a power, multiply the exponents: \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + m + "\\times " + n + "} \\\\ &= " + a + "^{" + (m * n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m * n) + "}\\)</b>.",
    { mode: "power-of-power-law", a: a, m: m, n: n });
}, ["A power raised to another power is the power of a power law.", "Multiply the inner exponent by the outer exponent."]);

E("u3-two-laws-evaluate", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "quot", "powpow"]);
  var a, expr, val, steps;
  if (mode === "prod") {
    a = ri(2, 6); var m = ri(2, 3), n = ri(2, 3);
    val = Math.pow(a, m + n);
    expr = a + "^{" + m + "}\\times " + a + "^{" + n + "}";
    steps = a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ &= " + fmt(val);
  } else if (mode === "quot") {
    a = ri(2, 7); var n2 = ri(1, 2), m2 = n2 + ri(3, 4);
    val = Math.pow(a, m2 - n2);
    expr = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "}";
    steps = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "} &= " + a + "^{" + (m2 - n2) + "} \\\\ &= " + fmt(val);
  } else {
    a = ri(2, 5); var m3 = ri(2, 3), n3 = 2;
    val = Math.pow(a, m3 * n3);
    expr = "(" + a + "^{" + m3 + "})^{" + n3 + "}";
    steps = "(" + a + "^{" + m3 + "})^{" + n3 + "} &= " + a + "^{" + (m3 * n3) + "} \\\\ &= " + fmt(val);
  }
  return numq("Evaluate \\(" + expr + "\\) by first writing it as a single power.", val, 0,
    "Apply the exponent law first, then evaluate: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "two-laws-" + mode, a: a });
}, ["Use an exponent law to write the expression as one power first.", "Combine the exponents with the matching law, then evaluate that power."]);

E("u3-power-of-product-quotient", 3, ["3.12"], 1, "gen", function () {
  var mode = pick(["prod", "prod", "quotInt", "quotDec"]);
  if (mode === "prod") {
    var a = ri(2, 6), b = ri(2, 6), n = ri(2, 3);
    var val = Math.pow(a * b, n);
    return numq("Evaluate \\((" + a + "\\times " + b + ")^{" + n + "}\\).", val, 0,
      "Work out the value inside the brackets first, then apply the power: \\[ \\begin{aligned} (" + a + "\\times " + b + ")^{" + n + "} &= " + fmt(a * b) + "^{" + n + "} \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
      { mode: "power-of-product", a: a, b: b, n: n });
  }
  if (mode === "quotInt") {
    var pairs = [[6, 2], [6, 3], [8, 2], [8, 4], [9, 3], [10, 2], [10, 5], [12, 3], [12, 4], [15, 3], [15, 5], [20, 4]];
    var pr = pick(pairs), q = pr[0] / pr[1], n2 = ri(2, 3);
    var val2 = Math.pow(q, n2);
    return numq("Evaluate \\((" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "}\\).", val2, 0,
      "Work out the value inside the brackets first, then apply the power: \\[ \\begin{aligned} (" + pr[0] + "\\div " + pr[1] + ")^{" + n2 + "} &= " + fmt(q) + "^{" + n2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the value is <b>" + fmt(val2) + "</b>.",
      { mode: "power-of-quotient-int", a: pr[0], b: pr[1], n: n2 });
  }
  var dpairs = [[3, 2], [5, 2], [7, 2], [9, 2], [5, 4], [3, 4], [7, 4], [9, 4], [6, 4], [10, 4]];
  var dp = pick(dpairs), dv = dp[0] / dp[1], dval = dv * dv;
  return numq("Evaluate \\((" + dp[0] + "\\div " + dp[1] + ")^{2}\\). Give your answer as a decimal.", dval, 0.01,
    "Work out the value inside the brackets first, then square it: \\[ \\begin{aligned} (" + dp[0] + "\\div " + dp[1] + ")^{2} &= " + fmt(dv) + "^{2} \\\\ &= " + fmt(dval) + " \\end{aligned} \\] So the value is <b>" + fmt(dval) + "</b>.",
    { mode: "power-of-quotient-dec", a: dp[0], b: dp[1], n: 2 });
}, ["Start with the value inside the brackets.", "Calculate inside the brackets, then apply the outside power to that value."]);

E("u3-sum-of-powers", 3, ["3.13"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 + v2; expr = a + "^{" + m + "}+" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}+" + a + "^{" + n + "} &= " + fmt(v1) + "+" + fmt(v2) + " \\\\ &= " + fmt(val);
  } else {
    var a2 = ri(2, 7), b2 = ri(2, 7), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    val = w1 + w2; expr = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "}";
    steps = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "} &= " + fmt(w1) + "+" + fmt(w2) + " \\\\ &= " + fmt(val);
  }
  return numq("Determine the sum \\(" + expr + "\\). Show the value of each power in your work.", val, 0,
    "Evaluate each power on its own first, then add: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the sum is <b>" + fmt(val) + "</b>.",
    { mode: "sum-" + mode });
}, ["Evaluate each power separately before you add anything.", "Find the value of the first power, then the second power, then add them."]);

E("u3-difference-of-powers", 3, ["3.14"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    if (m === n) m = n + 1;
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 - v2; expr = a + "^{" + m + "}-" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}-" + a + "^{" + n + "} &= " + fmt(v1) + "-" + fmt(v2) + " \\\\ &= " + fmt(val);
  } else {
    var a2 = ri(3, 8), b2 = ri(2, 6), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    if (w1 <= w2) { var tmp = w1; w1 = w2; w2 = tmp; expr = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "}"; steps = b2 + "^{" + n2 + "}-" + a2 + "^{" + m2 + "} &= " + fmt(w1) + "-" + fmt(w2) + " \\\\ &= " + fmt(w1 - w2); val = w1 - w2; }
    else { expr = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "}"; steps = a2 + "^{" + m2 + "}-" + b2 + "^{" + n2 + "} &= " + fmt(w1) + "-" + fmt(w2) + " \\\\ &= " + fmt(w1 - w2); val = w1 - w2; }
  }
  return numq("Determine the difference \\(" + expr + "\\). Show the value of each power in your work.", val, 0,
    "Evaluate each power on its own first, then subtract: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the difference is <b>" + fmt(val) + "</b>.",
    { mode: "difference-" + mode });
}, ["Evaluate each power separately before you subtract anything.", "Find the value of the first power, then the second power, then subtract."]);

E("u3-find-the-error", 3, ["3.15"], 2, "gen", function () {
  var tuples = [];
  for (var a = 2; a <= 3; a++) for (var m = 2; m <= 4; m++) for (var n = 2; n <= 4; n++) for (var p = 2; p <= 4; p++) {
    if (m * n === m + n) continue;
    var worst = (a === 2) ? 16 : 10;
    if (m * n + p + 1 > worst) continue;
    tuples.push([a, m, n, p]);
  }
  var t = pick(tuples), a = t[0], m = t[1], n = t[2], p = t[3], q = 1;
  var err = ri(1, 4);
  var e1 = (err === 1) ? (m + n) : (m * n);
  var e2 = (err === 2) ? (e1 - p) : (e1 + p);
  var e3 = (err === 3) ? (e2 + q) : (e2 - q);
  var finalVal = Math.pow(a, e3);
  var shownFinal = (err === 4) ? finalVal * a : finalVal;
  var s1 = "(" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}";
  var s2 = a + "^{" + e1 + "}\\times " + a + "^{" + p + "} = " + a + "^{" + e2 + "}";
  var s3 = a + "^{" + e2 + "}\\div " + a + "^{" + q + "} = " + a + "^{" + e3 + "}";
  var s4 = a + "^{" + e3 + "} = " + fmt(shownFinal);
  var prompt = "A student simplifies \\(((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "}\\) in four steps.<br>Step 1: \\(" + s1 + "\\)<br>Step 2: \\(" + s2 + "\\)<br>Step 3: \\(" + s3 + "\\)<br>Step 4: \\(" + s4 + "\\)<br>In which step does the first error occur?";
  var fb = {
    1: "Step 1 uses the power of a power law, which multiplies the exponents.",
    2: "Step 2 uses the product law, which adds the exponents.",
    3: "Step 3 uses the quotient law, which subtracts the exponents.",
    4: "Step 4 evaluates the final power."
  };
  function mkOpt(k) { return { t: "Step " + k, fb: (k === err) ? "Correct. " + fb[k] : "That step follows correctly from the step before it. " + fb[k] }; }
  var correctExp = (function () {
    var ce1 = m * n, ce2 = ce1 + p, ce3 = ce2 - q;
    return { e1: ce1, e2: ce2, e3: ce3, v: Math.pow(a, ce3) };
  })();
  return mcq(prompt, mkOpt(err), [1, 2, 3, 4].filter(function (k) { return k !== err; }).map(mkOpt),
    "Check each law in order. The correct chain is \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}\\times " + a + "^{" + p + "})\\div " + a + "^{" + q + "} &= " + a + "^{" + correctExp.e1 + "}\\times " + a + "^{" + p + "}\\div " + a + "^{" + q + "} \\\\ &= " + a + "^{" + correctExp.e3 + "} \\\\ &= " + fmt(correctExp.v) + " \\end{aligned} \\] The first error is in <b>Step " + err + "</b>.",
    { mode: "find-error", a: a, m: m, n: n, p: p, err: err });
}, ["Check the steps in order, one law at a time.", "Start with Step 1 and ask whether the power of a power law was used correctly."]);

E("u3-three-laws-evaluate", 3, ["3.12"], 3, "gen", function () {
  var mode = pick(["chain", "negbase"]);
  if (mode === "negbase") {
    var b = ri(2, 6), e = pick([2, 3, 4]), f = ri(1, 2);
    var v1 = Math.pow(-b, e), v2 = Math.pow(b, f), val = v1 * v2;
    if (Math.abs(val) > 90000) { f = 1; v2 = b; val = v1 * v2; }
    return numq("Evaluate \\((-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "}\\).", val, 0,
      "Evaluate each power first, watching the brackets for the sign: \\[ \\begin{aligned} (-" + b + ")^{" + e + "}\\times " + b + "^{" + f + "} &= " + fmt(v1) + "\\times " + fmt(v2) + " \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
      { mode: "three-laws-negbase", b: b, e: e, f: f });
  }
  var tuples = [];
  for (var a = 2; a <= 5; a++) for (var m = 2; m <= 3; m++) for (var n = 2; n <= 3; n++) for (var p = 1; p <= 3; p++) {
    var tot = m * n + p - 1;
    if (Math.pow(a, tot) > 90000) continue;
    tuples.push([a, m, n, p, tot]);
  }
  var t = pick(tuples), a2 = t[0], m2 = t[1], n2 = t[2], p2 = t[3], tot2 = t[4];
  var val2 = Math.pow(a2, tot2);
  return numq("Evaluate \\(((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + "\\).", val2, 0,
    "Apply the laws one at a time: \\[ \\begin{aligned} ((" + a2 + "^{" + m2 + "})^{" + n2 + "}\\times " + a2 + "^{" + p2 + "})\\div " + a2 + " &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the value is <b>" + fmt(val2) + "</b>.",
    { mode: "three-laws-chain", a: a2, m: m2, n: n2, p: p2 });
}, ["Work through the laws in a sensible order, one law at a time.", "Start with the power of a power inside the brackets."]);

E("u3-law-then-sum-difference", 3, ["3.13", "3.14"], 3, "gen", function () {
  var a = ri(2, 6), mn = pick([[2, 2], [2, 3], [3, 2]]), m = mn[0], n = mn[1], p = ri(2, 5);
  var first = Math.pow(a, m * n), second = Math.pow(a, p);
  var isSum = pick([true, false]);
  var word = isSum ? "sum" : "difference";
  var expr, val, stepLine;
  if (isSum) {
    val = first + second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}+" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmt(first) + "+" + fmt(second) + " \\\\ &= " + fmt(val);
  } else if (first >= second) {
    val = first - second;
    expr = "(" + a + "^{" + m + "})^{" + n + "}-" + a + "^{" + p + "}";
    stepLine = expr + " &= " + fmt(first) + "-" + fmt(second) + " \\\\ &= " + fmt(val);
  } else {
    val = second - first;
    expr = a + "^{" + p + "}-(" + a + "^{" + m + "})^{" + n + "}";
    stepLine = expr + " &= " + fmt(second) + "-" + fmt(first) + " \\\\ &= " + fmt(val);
  }
  return numq("Determine the " + word + " \\(" + expr + "\\). Simplify the power of a power first.", val, 0,
    "Simplify the power of a power, evaluate each part, then combine: \\[ \\begin{aligned} " + stepLine + " \\end{aligned} \\] So the " + word + " is <b>" + fmt(val) + "</b>.",
    { mode: "law-then-" + word, a: a, m: m, n: n, p: p });
}, ["Simplify any power that needs a law before you combine values.", "Start with the power of a power, then evaluate each part."]);

E("u3-explanations-var", 3, ["3.5", "3.8"], 3, "var", varset([
  function () {
    return mcq("Which explanation shows why \\(2^{3}\\) and \\(3^{2}\\) have different values?",
      { t: "\\(2^{3}=2\\times 2\\times 2=8\\) while \\(3^{2}=3\\times 3=9\\)", fb: "Correct. The repeated multiplication is different in each power." },
      [
        { t: "\\(2^{3}=2\\times 3=6\\) while \\(3^{2}=3\\times 2=6\\)", fb: "That multiplies the base by the exponent in each power." },
        { t: "\\(2^{3}=3\\times 3=9\\) while \\(3^{2}=2\\times 2=4\\)", fb: "That repeats the exponent instead of the base." },
        { t: "Both powers equal 8 because the digits are the same", fb: "That keeps one value and ignores the second power." }
      ],
      "Write each power as repeated multiplication: \\[ \\begin{aligned} 2^{3} &= 2\\times 2\\times 2 = 8 \\\\ 3^{2} &= 3\\times 3 = 9 \\end{aligned} \\] So the correct explanation is <b>\\(2^{3}=2\\times 2\\times 2=8\\) while \\(3^{2}=3\\times 3=9\\)</b>.",
      { mode: "explain-interchanged" });
  },
  function () {
    return mcq("Which statement explains the difference between \\((-3)^{2}\\) and \\(-3^{2}\\)?",
      { t: "In \\((-3)^{2}\\) the base is \\(-3\\), giving 9; in \\(-3^{2}\\) only 3 is squared, giving -9", fb: "Correct. The brackets change what the base is." },
      [
        { t: "Both equal 9 because squaring always makes a value positive in every single case", fb: "That overlooks the negative sign sitting outside the second power." },
        { t: "Both equal -9 because the negative sign always stays with the answer in both powers", fb: "That overlooks the brackets making negative three the base in the first." },
        { t: "In \\((-3)^{2}\\) the answer is -9 and in \\(-3^{2}\\) the answer is 9, swapped around", fb: "That reverses the two results. Check each base carefully." }
      ],
      "In the first power the brackets make \\(-3\\) the base: \\[ \\begin{aligned} (-3)^{2} &= (-3)\\times (-3) = 9 \\\\ -3^{2} &= -(3\\times 3) = -9 \\end{aligned} \\] So the correct statement is <b>In \\((-3)^{2}\\) the base is \\(-3\\), giving 9; in \\(-3^{2}\\) only 3 is squared, giving -9</b>.",
      { mode: "explain-parentheses" });
  },
  function () {
    return mcq("The values \\(5^{3}=125\\), \\(5^{2}=25\\) and \\(5^{1}=5\\) follow a pattern. Which argument correctly gives \\(5^{0}\\)?",
      { t: "Each step divides by 5, so the next value is \\(5\\div 5=1\\)", fb: "Correct. Continuing the division pattern gives one." },
      [
        { t: "Each step subtracts 5, so the next value is \\(5-5=0\\)", fb: "That uses subtraction. The pattern divides by the base each time." },
        { t: "A zero exponent means zero factors, so the value must be 0", fb: "That gives zero, but the division pattern leads to one." },
        { t: "The exponent is zero, so the value stays at the base, which is 5", fb: "That keeps the base. Continue the pattern one more step." }
      ],
      "Follow the pattern downward: \\[ \\begin{aligned} 5^{3} &= 125 \\\\ 5^{2} &= 125\\div 5 = 25 \\\\ 5^{1} &= 25\\div 5 = 5 \\\\ 5^{0} &= 5\\div 5 = 1 \\end{aligned} \\] So the correct argument is <b>Each step divides by 5, so the next value is \\(5\\div 5=1\\)</b>.",
      { mode: "explain-zero-pattern" });
  }
]), ["Read each explanation fully and check its repeated multiplication or pattern.", "Test the first explanation against the actual values of the powers."]);

