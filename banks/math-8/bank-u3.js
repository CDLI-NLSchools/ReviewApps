// Math 8 Unit 3 Operations with Fractions question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 818 to 1280).
// CRMARKS: u3-divide-mixed-cr=3
// CRMARKS: u3-divide-word-cr=2
// CRMARKS: u3-mixed-multistep-cr=3
// CRMARKS: u3-model-division-bar=3
// CRMARKS: u3-mult-div-chain-cr=2
// CRMARKS: u3-multiply-mixed-cr=3
// CRMARKS: u3-order-of-ops-fractions=2
/* Unit 3: Operations with Fractions */
// Unit 3: Operations with Fractions (Math 8, NL). Entries only; helpers prefixed u3.
function u3gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3red(n, d) { var g = u3gcd(n, d); return [n / g, d / g]; }
function u3disp(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < d) return "\\(" + FR(n, d) + "\\)"; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "\\(" + w + "\\)"; return "\\(" + w + FR(rem, d) + "\\)"; }
function u3plain(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "" + n; if (n < d) return n + "/" + d; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "" + w; return w + " " + rem + "/" + d; }
function u3accepted(n, d) { var r = u3red(n, d); var rn = r[0], rd = r[1]; var out = []; if (rd === 1) { out.push("" + rn); return out; } out.push(rn + "/" + rd); out.push(rn + " / " + rd); var mix = u3plain(n, d); if (mix.indexOf(" ") >= 0) out.push(mix); var dd = rd; while (dd % 2 === 0) dd /= 2; while (dd % 5 === 0) dd /= 5; if (dd === 1) { var v = rn / rd; out.push(("" + v).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")); } return out; }
function u3areaSVG(n1, d1, n2, d2) {
  var W = 252, H = 144, cw = W / d2, ch = H / d1, cells = "";
  for (var r = 0; r < d1; r++) for (var c = 0; c < d2; c++) {
    var fill = "none";
    if (c < n2 && r < n1) fill = FIG_ACC; else if (c < n2) fill = FIG_SHADE;
    cells += "<rect x='" + (c * cw) + "' y='" + (r * ch) + "' width='" + cw + "' height='" + ch + "' fill='" + fill + "' fill-opacity='" + (fill === FIG_ACC ? "0.55" : "1") + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
  }
  return "<svg viewBox='0 0 252 144' width='252' height='144' xmlns='http://www.w3.org/2000/svg'>" + cells + "<rect x='0' y='0' width='252' height='144' fill='none' stroke='" + FIG_INK + "' stroke-width='2.5'/></svg>";
}
function u3barSVG(total, shaded, group) {
  var W = 280, H = 46, cw = W / total, cells = "";
  for (var i = 0; i < total; i++) {
    var fill = i < shaded ? FIG_SHADE : "none";
    var sw = (i % group === 0 || i === total - 1) ? 2.5 : 1;
    cells += "<rect x='" + (i * cw) + "' y='4' width='" + cw + "' height='38' fill='" + fill + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
    if (i % group === 0) cells += "<line x1='" + (i * cw) + "' y1='2' x2='" + (i * cw) + "' y2='44' stroke='" + FIG_INK + "' stroke-width='" + sw + "'/>";
  }
  cells += "<line x1='280' y1='2' x2='280' y2='44' stroke='" + FIG_INK + "' stroke-width='2.5'/>";
  return "<svg viewBox='0 0 280 50' width='280' height='50' xmlns='http://www.w3.org/2000/svg'>" + cells + "</svg>";
}

// 1. L1, 6.4: model fraction times whole (equal groups).
E("u3-model-frac-times-whole", 3, ["6.4"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d = ri(3, 8), n = ri(1, d - 1), w = ri(2, 6);
    var vals = [u3disp(w * n, d), u3disp(n + w, d), u3disp(n, d), u3disp(w, d)];
    if (new Set(vals).size < 4) continue;
    P = { d: d, n: n, w: w, vals: vals };
  }
  if (!P) P = { d: 4, n: 3, w: 3, vals: [u3disp(9, 4), u3disp(6, 4), u3disp(3, 4), u3disp(3, 4)] };
  var prompt = "A model shows \\(" + P.w + "\\) equal groups. In each group, " + u3disp(P.n, P.d) + " is shaded. What is the total amount shaded?";
  var adds = []; for (var i = 0; i < P.w; i++) adds.push(FR(P.n, P.d));
  var solution = "Add the same fraction once for each group, which is multiplication: \\[ \\begin{aligned} " + adds.join(" + ") + " &= " + P.w + " \\times " + FR(P.n, P.d) + " \\\\ &= " + FR(P.w * P.n, P.d) + " \\\\ &= " + u3plain(P.w * P.n, P.d) + " \\end{aligned} \\] So the total shaded is <b>" + u3disp(P.w * P.n, P.d) + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Each of the " + P.w + " groups contributes the same fraction." },
    [
      { t: P.vals[1], fb: "This adds the whole number to the numerator, but the model repeats the fraction instead." },
      { t: P.vals[2], fb: "That is the amount shaded in just one group." },
      { t: P.vals[3], fb: "This uses the whole number as a numerator over the same denominator, which is not repeated addition." }
    ],
    solution, { mode: "model-times-whole", n: P.n, d: P.d, w: P.w });
}, ["Multiplication by a whole number means adding the fraction the same number of times.", "First write the total as a repeated addition of the fraction."]);

// 2. L1, 6.7: estimate a product against benchmarks 0, 1/2, 1.
E("u3-estimate-product-benchmark", 3, ["6.7"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(3, 10), n1 = ri(1, d1 - 1), d2 = ri(3, 10), n2 = ri(1, d2 - 1);
    var p = (n1 / d1) * (n2 / d2);
    var bench = [0, 0.5, 1], bi = 0, best = 9;
    bench.forEach(function (b, i) { var dd = Math.abs(p - b); if (dd < best) { best = dd; bi = i; } });
    if (best > 0.18) continue;
    var second = 9; bench.forEach(function (b, i) { if (i !== bi) second = Math.min(second, Math.abs(p - b)); });
    if (second - best < 0.12) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, p: p, bi: bi };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 3, p: 0.5, bi: 1 };
  var labels = ["0", "\\(" + FR(1, 2) + "\\)", "\\(" + FR(2, 2) + "\\)", "2"];
  var correct = labels[P.bi];
  var distractors = labels.filter(function (l, i) { return i !== P.bi; }).map(function (l) {
    var fb = l === "2" ? "A product of two fractions less than 1 is less than 1, so it cannot be near 2." : "Compare each factor with \\(" + FR(1, 2) + "\\) first: the product lands nearer a different benchmark.";
    return { t: l, fb: fb };
  });
  var prompt = "The product " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + " is closest to which benchmark?";
  var solution = "Estimate each factor: \\(" + FR(P.n1, P.d1) + "\\) is about \\(" + fmt(Math.round(P.n1 / P.d1 * 2) / 2) + "\\) and \\(" + FR(P.n2, P.d2) + "\\) is about \\(" + fmt(Math.round(P.n2 / P.d2 * 2) / 2) + "\\), and the exact product is \\(" + fmt(Math.round(P.p * 1000) / 1000) + "\\). So the product is closest to <b>" + correct + "</b>.";
  return mcq(prompt, { t: correct, fb: "Correct. Estimating each factor first puts the product nearest this benchmark." }, distractors, solution, { mode: "est-product", bi: P.bi });
}, ["Compare each fraction with one half before you multiply.", "Ask whether each factor is small, near one half, or near one."]);

// 3. L1, 6.9: model whole divided by a unit fraction.
E("u3-model-whole-div-frac", 3, ["6.9"], 1, "gen", function () {
  var w = ri(2, 6), d = ri(3, 10);
  var ans = w * d;
  var thing = pick(["wholes", "pizzas", "ribbons", "litres of juice"]);
  var prompt = "A diagram shows \\(" + w + "\\) " + (thing === "wholes" ? "wholes" : "whole " + thing) + ". Each whole is split into \\(" + d + "\\) equal parts, modelling \\(" + w + " \\div " + FR(1, d) + "\\). How many parts are there in all?";
  var solution = "Each whole contributes \\(" + d + "\\) parts: \\[ \\begin{aligned} " + w + " \\div " + FR(1, d) + " &= " + w + " \\times " + d + " \\\\ &= " + ans + " \\end{aligned} \\] So there are <b>" + ans + " parts</b> in all.";
  return mcq(prompt,
    { t: "" + ans, fb: "Correct. Multiply the number of wholes by the parts in each whole." },
    [
      { t: "" + (w + d), fb: "This adds the two numbers, but each whole holds several parts." },
      { t: "" + d, fb: "That counts the parts in only one whole." },
      { t: "" + (w * (d + 1)), fb: "This counts one extra part in every whole." }
    ],
    solution, { mode: "model-whole-div", w: w, d: d });
}, ["Count the parts inside one whole first, then scale up to all the wholes.", "Division by a unit fraction asks how many of those parts fit."]);

// 4. L1, 6.8: multiply two proper fractions, small denominators.
E("u3-multiply-two-fractions", 3, ["6.8"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(2, 6), n1 = ri(1, d1 - 1), d2 = ri(2, 6), n2 = ri(1, d2 - 1);
    if (d1 === d2 && n1 === n2) continue;
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1 + n2, d1 + d2), u3disp(n1 * n2, d1 + d2), u3disp(n1 + n2, d1 * d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 5, vals: [u3disp(6, 15), u3disp(5, 8), u3disp(6, 8), u3disp(5, 15)] };
  var g1 = u3gcd(P.n1, P.d2), g2 = u3gcd(P.n2, P.d1);
  var prompt = "Multiply: " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var solution = "Multiply the numerators and multiply the denominators, cancelling first where possible: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the product is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Numerators multiply, denominators multiply, then reduce." },
    [
      { t: P.vals[1], fb: "This adds across the tops and bottoms, which is not how fractions multiply." },
      { t: P.vals[2], fb: "The numerators are multiplied but the denominators are added instead of multiplied." },
      { t: P.vals[3], fb: "The denominators are multiplied but the numerators are added instead of multiplied." }
    ],
    solution, { mode: "mult-basic", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["For multiplication, no common denominator is needed.", "Cancel any numerator with any denominator before you multiply."]);

// 5. L2, 6.5: area model product with a partitioned rectangle figure.
E("u3-area-model-product", 3, ["6.5"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(3, 5), n1 = ri(1, d1 - 1), d2 = ri(3, 6), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1, d1), u3disp(n2, d2), u3disp(n1 + n2, d1 + d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 4, vals: [u3disp(6, 12), u3disp(2, 3), u3disp(3, 4), u3disp(5, 7)] };
  var prompt = "A rectangle is split into \\(" + P.d1 + "\\) equal rows and \\(" + P.d2 + "\\) equal columns. " + P.n1 + " of the rows and " + P.n2 + " of the columns are shaded, modelling " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". What fraction of the whole rectangle is shaded both ways, in the overlap?";
  var solution = "The overlap covers \\(" + (P.n1 * P.n2) + "\\) of the \\(" + (P.d1 * P.d2) + "\\) small cells: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the overlap is <b>" + P.vals[0] + "</b> of the rectangle.";
  var q = mcq(prompt,
    { t: P.vals[0], fb: "Correct. The overlap is the product of the two shaded fractions." },
    [
      { t: P.vals[1], fb: "That is only the fraction of rows shaded, ignoring the columns." },
      { t: P.vals[2], fb: "That is only the fraction of columns shaded, ignoring the rows." },
      { t: P.vals[3], fb: "This adds the shaded parts instead of finding their overlap." }
    ],
    solution, { mode: "area-model", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
  q.figure = u3areaSVG(P.n1, P.d1, P.n2, P.d2);
  return q;
}, ["The overlap is where the row shading and the column shading cross.", "Count the overlap cells, then count all the cells in the rectangle."]);

// 6. L2, 6.6: provide a context, choose the multiplication expression.
E("u3-context-multiply-expression", 3, ["6.6"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "A recipe uses " + a + " of a bag of flour, and a baker makes " + b + " of the recipe. Which expression gives the fraction of the whole bag used?"; },
    function (a, b) { return "A garden plot is " + a + " planted. Of the planted part, " + b + " grows tomatoes. Which expression gives the fraction of the whole plot growing tomatoes?"; },
    function (a, b) { return "A ferry tank is " + a + " full. On one crossing, " + b + " of the fuel in the tank is used. Which expression gives the fraction of a full tank used?"; },
    function (a, b) { return "A class spends " + a + " of a school day on a field trip. Of that time, " + b + " is spent on the bus. Which expression gives the fraction of the whole day spent on the bus?"; }
  ];
  var d1 = ri(3, 8), n1 = ri(1, d1 - 1), d2 = ri(3, 8), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var mult = "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)";
  var solution = "Taking a fraction of a fraction is multiplication: \\[ \\begin{aligned} " + FR(n1, d1) + " \\times " + FR(n2, d2) + " \\end{aligned} \\] So the expression is <b>" + mult + "</b>.";
  return mcq(prompt,
    { t: mult, fb: "Correct. A fraction of a fraction is found by multiplying." },
    [
      { t: "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)", fb: "Division answers how many fit, but this context takes a part of a part." },
      { t: "\\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\)", fb: "Addition joins two separate amounts, but the second fraction acts on the first amount." },
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "This reverses the two amounts and divides, which does not match a part of a part." }
    ],
    solution, { mode: "ctx-mult-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Look for the words of or part of a part in the context.", "A fraction of another fraction is a multiplication."]);

// 7. L2, 6.8, CR 3: multiply a mixed number by a fraction in context (typed answer).
E("u3-multiply-mixed-cr", 3, ["6.8"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var w = ri(1, 3), d1 = pick([2, 3, 4, 5, 6]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 3, 4, 5, 6, 8]), n2 = ri(1, d2 - 1);
    var imp = w * d1 + n1;
    var rn = imp * n2, rd = d1 * d2;
    if (u3red(rn, rd)[1] > 8) continue;
    P = { w: w, n1: n1, d1: d1, n2: n2, d2: d2, imp: imp, rn: rn, rd: rd };
  }
  if (!P) P = { w: 2, n1: 1, d1: 2, n2: 3, d2: 4, imp: 5, rn: 15, rd: 8 };
  var prompt = "A hiking trail is " + u3disp(P.imp, P.d1) + " km long. A group hikes " + u3disp(P.n2, P.d2) + " of the trail. How many kilometres do they hike? Give your answer as a fraction or mixed number in lowest terms.";
  var rr = u3red(P.rn, P.rd);
  var solution = "Convert the mixed number to an improper fraction, then multiply: \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] So they hike <b>" + u3disp(P.rn, P.rd) + " km</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "mult-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Change the mixed number to an improper fraction before multiplying.", "First rewrite the trail length as a single fraction."]);

// 8. L2, 6.11: estimate a quotient against whole number benchmarks.
E("u3-estimate-quotient-benchmark", 3, ["6.11"], 2, "gen", function () {
  var cats = ["Less than 1", "About 1", "About 2", "More than 2"];
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
    var q = (n1 / d1) / (n2 / d2);
    var ci = -1;
    if (q < 0.8) ci = 0; else if (q <= 1.3) ci = 1; else if (q >= 1.6 && q <= 2.4) ci = 2; else if (q > 2.6) ci = 3;
    if (ci < 0) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, q: q, ci: ci };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 1, d2: 4, q: 3, ci: 3 };
  var prompt = "Estimate the quotient " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Which description fits it best?";
  var solution = "Dividing by a fraction asks how many of the divisor fit into the dividend. Here the exact quotient is \\(" + fmt(Math.round(P.q * 100) / 100) + "\\): \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " = " + fmt(Math.round(P.q * 100) / 100) + " \\end{aligned} \\] So the quotient is <b>" + cats[P.ci].toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: cats[P.ci], fb: "Correct. The divisor fits into the dividend about that many times." },
    cats.filter(function (c, i) { return i !== P.ci; }).map(function (c) { return { t: c, fb: "Compare the sizes: a smaller divisor fits more times, so check how many divisors fit before choosing." }; }),
    solution, { mode: "est-quotient", ci: P.ci });
}, ["Ask how many times the divisor fits into the dividend.", "If the divisor is smaller than the dividend, the quotient is greater than 1."]);

// 9. L2, 6.12: divide a proper fraction by a proper fraction.
E("u3-divide-frac-by-frac", 3, ["6.12"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(2, 9), n1 = ri(1, d1 - 1), d2 = ri(2, 9), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * n2, n1 * d2), u3disp(n1 * n2, d1 * d2), u3disp(d1 * n2, n1 * d2) === u3disp(n1 * d2, d1 * n2) ? "x" : u3disp(d1 * d2, n1 * n2)];
    var inv = u3disp(d1 * n2, n1 * d2);
    vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * d2, n1 * n2), u3disp(n1 * n2, d1 * d2), inv];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 5, vals: [u3disp(15, 8), u3disp(20, 6), u3disp(6, 20), u3disp(8, 15)] };
  var prompt = "Divide: " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var rr = u3red(P.n1 * P.d2, P.d1 * P.n2);
  var solution = "Multiply by the reciprocal of the divisor: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.n1 * P.d2, P.d1 * P.n2) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] So the quotient is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Only the divisor is flipped, then multiply." },
    [
      { t: P.vals[1], fb: "This flips both fractions, but only the divisor is flipped." },
      { t: P.vals[2], fb: "This multiplies straight across without flipping the divisor." },
      { t: P.vals[3], fb: "This flips the first fraction instead of the divisor." }
    ],
    solution, { mode: "div-frac-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Division by a fraction means multiply by its reciprocal.", "Flip only the second fraction, the divisor."]);

// 10. L2, 6.10, CR 3: model fraction divided by fraction with a bar figure (typed answer).
E("u3-model-division-bar", 3, ["6.10"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = pick([2, 3, 4, 5, 6, 8]), n1 = ri(1, d1 - 1), d2 = pick([2, 3, 4, 5, 6, 8]);
    var L = (d1 * d2) / u3gcd(d1, d2);
    if (L > 20) continue;
    var shaded = n1 * (L / d1), grp = L / d2;
    if (shaded % grp !== 0) continue;
    var cnt = shaded / grp;
    if (cnt < 2) continue;
    P = { n1: n1, d1: d1, d2: d2, L: L, shaded: shaded, grp: grp, cnt: cnt };
  }
  if (!P) P = { n1: 2, d1: 3, d2: 6, L: 6, shaded: 4, grp: 1, cnt: 4 };
  var item = pick(["strip", "ribbon", "rope", "board"]);
  var prompt = "A bar model shows " + u3disp(P.n1, P.d1) + " of a " + item + " shaded. The " + item + " is split into \\(" + P.L + "\\) equal small parts, and the bold marks group the parts into servings of " + u3disp(1, P.d2) + " of a " + item + " each. How many servings are in the shaded part?";
  var solution = "Use the common split of \\(" + P.L + "\\) parts: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " &= " + FR(P.shaded, P.L) + " \\\\ " + FR(1, P.d2) + " &= " + FR(P.grp, P.L) + " \\\\ " + P.shaded + " \\div " + P.grp + " &= " + P.cnt + " \\end{aligned} \\] So there are <b>" + P.cnt + " servings</b> in the shaded part.";
  var q = numq(prompt, P.cnt, 0, solution, { mode: "model-div-bar", n1: P.n1, d1: P.d1, d2: P.d2 });
  q.figure = u3barSVG(P.L, P.shaded, P.grp);
  return q;
}, ["Rewrite both fractions using the small parts shown on the bar.", "Count the shaded small parts, then divide by the parts in one serving."]);

// 11. L2, 6.13, CR 3: divide with a mixed number in context (typed answer).
E("u3-divide-mixed-cr", 3, ["6.13"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var w = ri(2, 5), d1 = pick([2, 3, 4]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 3, 4, 6]), n2 = ri(1, d2 - 1);
    var imp = w * d1 + n1;
    var rn = imp * d2, rd = d1 * n2;
    var rr = u3red(rn, rd);
    if (rr[1] > 4 || rr[0] / rr[1] < 2) continue;
    P = { w: w, n1: n1, d1: d1, n2: n2, d2: d2, imp: imp, rn: rn, rd: rd };
  }
  if (!P) P = { w: 3, n1: 1, d1: 2, n2: 1, d2: 2, imp: 7, rn: 14, rd: 2 };
  var prompt = "A rope is " + u3disp(P.imp, P.d1) + " m long. It is cut into pieces that are each " + u3disp(P.n2, P.d2) + " m long. How many pieces are cut? Give your answer as a number, fraction or mixed number in lowest terms.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Convert the mixed number, then multiply by the reciprocal of the piece length: \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] So the number of pieces is <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Change the mixed number to an improper fraction first.", "Dividing by a piece length asks how many pieces fit, so flip the divisor and multiply."]);

// 12. L2, 6.14: provide a context, choose the division expression.
E("u3-context-divide-expression", 3, ["6.14"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "A ribbon " + a + " m long is cut into pieces that are each " + b + " m long. Which expression gives the number of pieces?"; },
    function (a, b) { return "A jug holds " + a + " L of juice. It is poured equally into bottles that each hold " + b + " L. Which expression gives the number of bottles filled?"; },
    function (a, b) { return "A trail crew has " + a + " kg of gravel to spread in loads of " + b + " kg each. Which expression gives the number of loads?"; },
    function (a, b) { return "A tank holds " + a + " L of water. Each watering can takes " + b + " L. Which expression gives the number of cans that can be filled?"; }
  ];
  var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var div = "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)";
  var solution = "The context asks how many groups of one size fit into a total, which is division with the total first: \\[ \\begin{aligned} " + FR(n1, d1) + " \\div " + FR(n2, d2) + " \\end{aligned} \\] So the expression is <b>" + div + "</b>.";
  return mcq(prompt,
    { t: div, fb: "Correct. The total is divided by the size of each group." },
    [
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "This puts the group size first, but division starts from the total amount." },
      { t: "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)", fb: "Multiplication takes a part of a part, but this context counts how many groups fit." },
      { t: "\\(" + FR(n1, d1) + " - " + FR(n2, d2) + "\\)", fb: "Subtraction finds what is left after one removal, not the number of groups." }
    ],
    solution, { mode: "ctx-div-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Ask whether the context counts groups that fit into a total.", "In a division expression, the total amount comes first."]);

// 13. L2, 6.16, CR 2: order of operations with fractions (numeric answer as a decimal).
E("u3-order-of-ops-fractions", 3, ["6.16"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = pick([2, 4, 5, 8, 10]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 4, 5, 8, 10]), n2 = ri(1, d2 - 1);
    var w = ri(2, 6);
    var val = n1 / d1 + (n2 / d2) * w;
    if (Math.abs(val * 1000 - Math.round(val * 1000)) > 1e-9) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, w: w, val: Math.round(val * 1000) / 1000 };
  }
  if (!P) P = { n1: 1, d1: 2, n2: 3, d2: 4, w: 2, val: 2 };
  var prompt = "Evaluate: \\(" + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + "\\). Give your answer as a decimal.";
  var prod = u3red(P.n2 * P.w, P.d2);
  var solution = "Multiplication is done before addition: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + " &= " + FR(P.n1, P.d1) + " + " + FR(prod[0], prod[1]) + " \\\\ &= " + fmt(P.val) + " \\end{aligned} \\] So the value is <b>" + fmt(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "ooo-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, w: P.w });
}, ["Multiplication comes before addition in the order of operations.", "First work out the fraction times the whole number."]);

// 14. L2, 6.15: identify the operation a context requires.
E("u3-identify-operation", 3, ["6.15"], 1, "gen", function () {
  var dens = [3, 4, 5, 6, 8];
  function F() { var d = pick(dens); return u3disp(ri(1, d - 1), d); }
  function G() { var d = pick(dens); var n = ri(1, d - 1); return u3disp(d + n, d); }
  var scens = [
    { op: "Multiplication", txt: function () { return "A muffin recipe calls for " + F() + " cup of berries. A cook makes " + F() + " of the recipe. Which operation finds the cups of berries used?"; } },
    { op: "Multiplication", txt: function () { return "A rope is " + G() + " m long. A climber uses " + F() + " of the rope. Which operation finds the length used?"; } },
    { op: "Division", txt: function () { return "A board " + G() + " m long is cut into shelves that are each " + F() + " m long. Which operation finds the number of shelves?"; } },
    { op: "Division", txt: function () { return F() + " L of soup is shared equally into servings of " + F() + " L each. Which operation finds the number of servings?"; } },
    { op: "Addition", txt: function () { return "A hiker walks " + F() + " km before lunch and " + F() + " km after lunch. Which operation finds the total distance?"; } },
    { op: "Addition", txt: function () { return "A jug holds " + F() + " L of water and " + F() + " L more is poured in. Which operation finds how much water is in the jug now?"; } },
    { op: "Subtraction", txt: function () { return "A tank holds " + G() + " L of fuel and " + F() + " L is used on a trip. Which operation finds the fuel left?"; } },
    { op: "Subtraction", txt: function () { return "A ribbon is " + G() + " m long and a piece " + F() + " m long is cut off. Which operation finds the length remaining?"; } }
  ];
  var s = pick(scens);
  var ops = ["Addition", "Subtraction", "Multiplication", "Division"];
  var why = { "Multiplication": "It takes a fraction of an amount.", "Division": "It counts how many groups of a size fit into a total.", "Addition": "It joins two amounts into a total.", "Subtraction": "It finds what remains after part is taken away." };
  var prompt = s.txt();
  var solution = "Read the context for what is being found. " + why[s.op] + " So the operation is <b>" + s.op.toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: s.op, fb: "Correct. " + why[s.op] },
    ops.filter(function (o) { return o !== s.op; }).map(function (o) { return { t: o, fb: "That operation does not match what the context asks for. " + why[o] }; }),
    solution, { mode: "identify-op", op: s.op });
}, ["Decide what the answer measures: a total, a remainder, a part of a part, or a count of groups.", "Match the story to the operation before looking at the numbers."]);

// 15. L2, 6.12, CR 2: solve a division problem in context (typed answer).
E("u3-divide-word-cr", 3, ["6.12"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
    var rn = n1 * d2, rd = d1 * n2, rr = u3red(rn, rd);
    if (rr[1] > 6) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, rn: rn, rd: rd };
  }
  if (!P) P = { n1: 5, d1: 6, n2: 1, d2: 3, rn: 15, rd: 6 };
  var prompt = "A water tank holds " + u3disp(P.n1, P.d1) + " L. Each bottle is filled with " + u3disp(P.n2, P.d2) + " L. How many bottles can be filled? Give your answer as a number, fraction or mixed number in lowest terms.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Divide the total by the amount per bottle: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] So the number of bottles is <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-word-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["The total is divided by the size of one bottle.", "Flip the divisor and multiply."]);

// 16. L3, 6.15 and 6.16: successive fractions of an amount.
E("u3-successive-fractions", 3, ["6.15", "6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var a = pick([2, 3, 4, 5]), b = pick([2, 3, 4, 5]);
    var M = a * b * ri(2, 6);
    var spent1 = M / a, left1 = M - spent1, spent2 = left1 / b, left2 = left1 - spent2;
    var wrong1 = M - M / a - M / b;
    var wrong2 = left1;
    var wrong3 = M - spent2;
    var vals = [left2, wrong1, wrong2, wrong3];
    if (new Set(vals).size < 4 || wrong1 <= 0) continue;
    P = { a: a, b: b, M: M, spent1: spent1, left1: left1, spent2: spent2, left2: left2, wrong1: wrong1, wrong3: wrong3 };
  }
  if (!P) P = { a: 2, b: 3, M: 36, spent1: 18, left1: 18, spent2: 6, left2: 12, wrong1: 6, wrong3: 30 };
  var prompt = "Maya has $" + P.M + ". She spends " + u3disp(1, P.a) + " of her money on a book. Then she spends " + u3disp(1, P.b) + " of what is left on a game. How much money does she have left?";
  var solution = "Work one step at a time, because the second fraction acts on what remains: \\[ \\begin{aligned} " + P.M + " \\times " + FR(1, P.a) + " &= " + P.spent1 + " \\\\ " + P.M + " - " + P.spent1 + " &= " + P.left1 + " \\\\ " + P.left1 + " \\times " + FR(1, P.b) + " &= " + P.spent2 + " \\\\ " + P.left1 + " - " + P.spent2 + " &= " + P.left2 + " \\end{aligned} \\] So she has <b>$" + P.left2 + "</b> left.";
  return mcq(prompt,
    { t: "$" + P.left2, fb: "Correct. The second fraction is taken from the amount left after the first purchase." },
    [
      { t: "$" + P.wrong1, fb: "This takes both fractions from the full $" + P.M + ", but the second fraction acts on what is left." },
      { t: "$" + P.left1, fb: "That is the amount left after the book only; the game purchase still has to come off." },
      { t: "$" + P.wrong3, fb: "This subtracts only the second spending from the full amount and skips the book." }
    ],
    solution, { mode: "successive-frac", a: P.a, b: P.b, M: P.M });
}, ["The second fraction is of the amount left, not of the starting amount.", "Find what remains after the first spending before applying the second fraction."]);

// 17. L3, 6.15 and 6.16, CR 3: two step problem, use part then add more (typed answer).
E("u3-mixed-multistep-cr", 3, ["6.15", "6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = pick([2, 3, 4]), w = ri(2, 5), n1 = ri(1, d1 - 1);
    var imp = w * d1 + n1;
    var d2 = pick([2, 3, 4, 5, 6]), n2 = ri(1, d2 - 1);
    if ((imp * n2) % (d1 * d2) !== 0) continue;
    var used = (imp * n2) / (d1 * d2);
    var d3 = pick([2, 3, 4, 5, 6, 8]), n3 = ri(1, d3 - 1);
    var rn = (imp - used * d1) * d3 + n3 * d1, rd = d1 * d3;
    var rr = u3red(rn, rd);
    if (rr[1] > 8) continue;
    P = { w: w, n1: n1, d1: d1, imp: imp, n2: n2, d2: d2, used: used, n3: n3, d3: d3, rn: rn, rd: rd };
  }
  if (!P) P = { w: 3, n1: 1, d1: 2, imp: 7, n2: 1, d2: 2, used: 3, n3: 1, d3: 4, rn: 9, rd: 4 };
  var leftN = P.imp - P.used * P.d1;
  var prompt = "A baker has " + u3disp(P.imp, P.d1) + " kg of flour. She uses " + u3disp(P.n2, P.d2) + " of the flour in the morning. Then she buys " + u3disp(P.n3, P.d3) + " kg more. How many kilograms of flour does she have now? Give your answer as a fraction or mixed number in lowest terms.";
  var solution = "First find the part used, then subtract it and add the new flour: \\[ \\begin{aligned} " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + P.used + " \\\\ " + FR(P.imp, P.d1) + " - " + P.used + " &= " + FR(leftN, P.d1) + " \\\\ " + FR(leftN, P.d1) + " + " + FR(P.n3, P.d3) + " &= " + u3plain(P.rn, P.rd) + " \\end{aligned} \\] So she has <b>" + u3disp(P.rn, P.rd) + " kg</b> of flour now.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "multistep-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Split the problem into steps: find the part used, subtract, then add.", "First multiply to find how much flour the morning baking used."]);

// 18. L3, 6.16, CR 2: bracketed multiply then divide chain (numeric answer as a decimal).
E("u3-mult-div-chain-cr", 3, ["6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var pool = [2, 4, 5, 8, 10];
    var d1 = pick(pool), n1 = ri(1, d1 - 1), d2 = pick(pool), n2 = ri(1, d2 - 1), d3 = pick(pool), n3 = ri(1, d3 - 1);
    var d4 = pick(pool), n4 = ri(1, d4 - 1);
    var val = (n1 / d1) * (n2 / d2) / (n3 / d3) + n4 / d4;
    if (Math.abs(val * 1000 - Math.round(val * 1000)) > 1e-9) continue;
    if (val <= 0) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, n3: n3, d3: d3, n4: n4, d4: d4, val: Math.round(val * 1000) / 1000 };
  }
  if (!P) P = { n1: 1, d1: 2, n2: 3, d2: 4, n3: 1, d3: 2, n4: 1, d4: 4, val: 1 };
  var prompt = "Evaluate: \\(\\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + "\\). Give your answer as a decimal.";
  var step1 = fmt(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) * 1000) / 1000);
  var step2 = fmt(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) / (P.n3 / P.d3) * 1000) / 1000);
  var solution = "Do the brackets first, then the division, then the addition: \\[ \\begin{aligned} \\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " &= " + step1 + " \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " \\\\ &= " + step2 + " + " + FR(P.n4, P.d4) + " \\\\ &= " + fmt(P.val) + " \\end{aligned} \\] So the value is <b>" + fmt(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "chain-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Brackets first, then division, then addition.", "Start with the product inside the brackets."]);

// 19. L3, 6.7 and 6.11: reasoning about products and quotients (variant set).
E("u3-estimate-reasoning-var", 3, ["6.7", "6.11"], 3, "var", varset([
  function () {
    var prompt = "Which statement about the product \\(" + FR(7, 8) + " \\times " + FR(8, 9) + "\\) is true?";
    var solution = "Both factors are less than 1, so the product is smaller than each factor: \\[ \\begin{aligned} " + FR(7, 8) + " \\times " + FR(8, 9) + " &= " + FR(56, 72) + " = " + FR(7, 9) + " \\end{aligned} \\] Since \\(" + FR(7, 9) + "\\) is less than \\(" + FR(7, 8) + "\\), the product is <b>less than \\(" + FR(7, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "The product is less than \\(" + FR(7, 8) + "\\)", fb: "Correct. Multiplying by a fraction less than 1 shrinks the amount." },
      [
        { t: "The product is greater than 1", fb: "A product of two numbers each less than 1 stays less than 1." },
        { t: "The product is greater than \\(" + FR(8, 9) + "\\)", fb: "The product is smaller than both factors, not greater." },
        { t: "The product equals \\(" + FR(7, 8) + "\\)", fb: "That would only happen if the other factor were exactly 1." }
      ],
      solution, { mode: "reason-product-shrink" });
  },
  function () {
    var prompt = "Which statement about the quotient \\(" + FR(3, 4) + " \\div " + FR(1, 8) + "\\) is true?";
    var solution = "The divisor is small, so it fits many times: \\[ \\begin{aligned} " + FR(3, 4) + " \\div " + FR(1, 8) + " &= " + FR(3, 4) + " \\times 8 \\\\ &= 6 \\end{aligned} \\] So the quotient is <b>greater than \\(" + FR(3, 4) + "\\)</b>.";
    return mcq(prompt,
      { t: "The quotient is greater than \\(" + FR(3, 4) + "\\)", fb: "Correct. Dividing by a fraction less than 1 gives a larger result." },
      [
        { t: "The quotient is less than \\(" + FR(1, 8) + "\\) in size", fb: "The quotient counts how many eighths fit, and several fit." },
        { t: "The quotient equals exactly \\(" + FR(3, 4) + "\\)", fb: "That would only happen if the divisor were exactly 1." },
        { t: "The quotient is between 0 and 1 in value", fb: "A divisor smaller than the dividend gives a quotient greater than 1." }
      ],
      solution, { mode: "reason-quotient-grow" });
  },
  function () {
    var prompt = "Which statement about the product \\(" + FR(5, 6) + " \\times " + FR(2, 3) + "\\) is true?";
    var solution = "Both factors are less than 1, and the product sits below the smaller factor: \\[ \\begin{aligned} " + FR(5, 6) + " \\times " + FR(2, 3) + " &= " + FR(10, 18) + " = " + FR(5, 9) + " \\end{aligned} \\] Since \\(" + FR(5, 9) + "\\) is less than \\(" + FR(2, 3) + "\\), the product is <b>less than \\(" + FR(2, 3) + "\\)</b>.";
    return mcq(prompt,
      { t: "The product is less than \\(" + FR(2, 3) + "\\)", fb: "Correct. The product of two fractions less than 1 is less than each of them." },
      [
        { t: "The product is between \\(" + FR(2, 3) + "\\) and \\(" + FR(5, 6) + "\\)", fb: "Multiplying by a fraction less than 1 moves below the smaller factor, not between them." },
        { t: "The product is greater than \\(" + FR(5, 6) + "\\)", fb: "The product cannot grow past the larger factor when the other factor is less than 1." },
        { t: "The product equals 1", fb: "Only factors that are reciprocals of each other multiply to 1." }
      ],
      solution, { mode: "reason-product-below-both" });
  }
]), ["Multiplying by a fraction less than 1 makes an amount smaller; dividing by one makes it larger.", "Compare each factor or divisor with 1 before deciding."]);
