// Math 9 Unit 3 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1847 to 2327).
/* Top-up tranche (November 7, 2026): Unit 3 additions from tranche1/unit3-topup.js */
// Unit 3 top-up: Powers and Exponent Laws (new shapes only)

function u3tMult(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(factor);
  return "\\(" + parts.join("\\times ") + "\\)";
}
function u3tGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3tRed(n, d) { var g = u3tGcd(n, d); return [n / g, d / g]; }
function u3tFracOpt(n, d) {
  var r = u3tRed(n, d); n = r[0]; d = r[1];
  if (d === 1) return fmt(n);
  if (n < 0) return "\\(-\\frac{" + (-n) + "}{" + d + "}\\)";
  return "\\(\\frac{" + n + "}{" + d + "}\\)";
}
function u3tFracInner(n, d) { return "\\frac{" + n + "}{" + d + "}"; }
var u3tFracs = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [2, 7], [3, 7], [1, 8], [3, 8]];
var u3tFracsSmall = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5], [3, 5]];

E("u3-repeated-product-form", 3, ["3.6"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, powerInner, altFactor, altFb;
  var e = ri(2, 4);
  if (mode === "neg") {
    var b = ri(2, 9);
    factor = "(-" + b + ")";
    powerInner = "(-" + b + ")^{" + e + "}";
    altFactor = "(" + b + ")";
    altFb = "That drops the negative sign from each factor. The base is negative.";
  } else if (mode === "frac") {
    var f = pick(u3tFracs);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    powerInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f[1], f[0]) + ")";
    altFb = "That swaps the top and bottom of the fraction base.";
  } else {
    var f2 = pick(u3tFracsSmall);
    e = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    powerInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f2[0], f2[1]) + ")";
    altFb = "That drops the negative sign from each factor. The base is negative.";
  }
  var correct = u3tMult(factor, e);
  var pool = [
    { t: u3tMult(factor, e + 1), fb: "That uses one factor too many. Count the exponent." },
    { t: u3tMult(factor, e - 1), fb: "That uses one factor too few. Count the exponent." },
    { t: u3tMult(altFactor, e), fb: altFb },
    { t: "\\(" + factor + "\\times " + e + "\\)", fb: "That multiplies the base by the exponent once. A power repeats the base as a factor." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) { if (!seen[pool[i].t]) { seen[pool[i].t] = 1; ds.push(pool[i]); } }
  var stem = pick([
    "What is \\(" + powerInner + "\\) written as repeated multiplication?",
    "Which repeated multiplication is equal to \\(" + powerInner + "\\)?",
    "Express \\(" + powerInner + "\\) as a repeated multiplication. Which choice shows it?"
  ]);
  return mcq(stem,
    { t: correct, fb: "Correct. The whole base, sign and all, repeats as many times as the exponent says." }, ds,
    "The base is \\(" + factor + "\\) and the exponent is \\(" + e + "\\), so write the base as a factor \\(" + e + "\\) times: \\[ \\begin{aligned} " + powerInner + " &= " + correct.replace("\\(", "").replace("\\)", "") + " \\end{aligned} \\] So the repeated multiplication is <b>" + correct + "</b>.",
    { mode: "topup-repeated-" + mode, e: e });
}, ["The exponent tells you how many times the whole base appears as a factor.", "Write the base down exactly as it appears, brackets and sign included, then repeat it."]);

E("u3-power-from-product", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, correctInner, ds;
  if (mode === "neg") {
    var b = ri(2, 9), c = ri(2, 5);
    while (b === c) { b = ri(2, 9); }
    factor = "(-" + b + ")";
    correctInner = "(-" + b + ")^{" + c + "}";
    ds = [
      { t: "\\((-" + c + ")^{" + b + "}\\)", fb: "That swaps the base value and the count of factors." },
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + b + ")^{" + (c + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." }
    ];
  } else if (mode === "frac") {
    var f = pick(u3tFracs), c2 = ri(2, 4);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    correctInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + c2 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f[1], f[0]) + ")^{" + c2 + "}\\)", fb: "That swaps the top and bottom of the fraction base." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 - 1) + "}\\)", fb: "That subtracts one from the exponent. Count the factors shown." }
    ];
    var cc = c2;
  } else {
    var f2 = pick(u3tFracsSmall), c3 = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    correctInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}\\)", fb: "That drops the negative sign from the base." },
      { t: "\\((-" + u3tFracInner(f2[0], f2[1]) + ")^{" + (c3 + 1) + "}\\)", fb: "That adds one to the exponent. Count the factors shown." },
      { t: "\\((-" + u3tFracInner(f2[1], f2[0]) + ")^{" + c3 + "}\\)", fb: "That swaps the top and bottom of the fraction base." }
    ];
    var cc2 = c3;
  }
  var count = (mode === "neg") ? c : (mode === "frac" ? cc : cc2);
  var shown = u3tMult(factor, count);
  var stem = pick([
    "What is " + shown + " written as a single power?",
    "Which single power is equal to " + shown + "?",
    "Express " + shown + " as a single power. Which choice shows it?"
  ]);
  return mcq(stem,
    { t: "\\(" + correctInner + "\\)", fb: "Correct. The repeated factor is the base and the count of factors is the exponent." }, ds,
    "There are \\(" + count + "\\) factors, and each factor is \\(" + factor + "\\), so the power is \\(" + correctInner + "\\). \\[ \\begin{aligned} " + shown.replace("\\(", "").replace("\\)", "") + " &= " + correctInner + " \\end{aligned} \\] So the single power is <b>\\(" + correctInner + "\\)</b>.",
    { mode: "topup-from-product-" + mode, count: count });
}, ["Count the factors first. That count becomes the exponent.", "Write the repeated factor exactly as the base, sign included, then use your count as the exponent."]);

E("u3-evaluate-power-neg", 3, ["3.10"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "one", "negone", "frac"]);
  var stemVerb = pick(["Evaluate", "What is the value of", "Find the value of"]);
  if (mode === "frac") {
    var f = pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [1, 5], [5, 6], [3, 8]]);
    var e = ri(2, 3);
    var vn = Math.pow(f[0], e), vd = Math.pow(f[1], e);
    var correct = u3tFracOpt(vn, vd);
    var poolF = [
      { n: -vn, d: vd, fb: "That has the wrong sign. The base is positive, so the value is positive." },
      { n: Math.pow(f[0], e), d: f[1], fb: "That raises only the top of the fraction to the power. The bottom is raised too." },
      { n: f[0], d: Math.pow(f[1], e), fb: "That raises only the bottom of the fraction to the power. The top is raised too." },
      { n: f[0] * e, d: f[1], fb: "That multiplies the base by the exponent. A power repeats the base as a factor." },
      { n: vd, d: vn, fb: "That flips the fraction over. Keep the top and bottom in place." }
    ];
    var dsF = [], seenF = {}; seenF[u3tRed(vn, vd).join("/")] = 1;
    for (var i = 0; i < poolF.length && dsF.length < 3; i++) {
      var key = u3tRed(poolF[i].n, poolF[i].d).join("/");
      if (!seenF[key]) { seenF[key] = 1; dsF.push({ t: u3tFracOpt(poolF[i].n, poolF[i].d), fb: poolF[i].fb }); }
    }
    var shownF = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    return mcq(stemVerb + " \\(" + shownF + "\\).",
      { t: correct, fb: "Correct. Both the top and the bottom of the fraction are raised to the power." }, dsF,
      "Raise the top and the bottom separately: \\[ \\begin{aligned} " + shownF + " &= \\frac{" + f[0] + "^{" + e + "}}{" + f[1] + "^{" + e + "}} \\\\ &= \\frac{" + vn + "}{" + vd + "} \\end{aligned} \\] So the value is <b>" + correct + "</b>.",
      { mode: "topup-eval-frac", n: f[0], d: f[1], e: e });
  }
  var base, e2, val, shown;
  if (mode === "neg") { var b = ri(2, 9); e2 = ri(2, 5); base = -b; val = Math.pow(-b, e2); shown = "(-" + b + ")^{" + e2 + "}"; }
  else if (mode === "one") { base = 1; e2 = ri(2, 9); val = 1; shown = "1^{" + e2 + "}"; }
  else { base = -1; e2 = ri(2, 12); val = (e2 % 2 === 0) ? 1 : -1; shown = "(-1)^{" + e2 + "}"; }
  var pool = [
    { v: -val, fb: "That has the opposite sign. Count how many negative factors are multiplied." },
    { v: base * e2, fb: "That multiplies the base by the exponent. A power repeats the base as a factor." },
    { v: 0, fb: "That gives zero. A power of a nonzero base is never zero here." },
    { v: val + base, fb: "That is close, but off. Expand the power as repeated multiplication." },
    { v: -Math.abs(val), fb: "That forces a negative answer. An even number of negative factors gives a positive product." },
    { v: Math.abs(val), fb: "That drops the sign. An odd number of negative factors gives a negative product." },
    { v: base + e2, fb: "That adds the base and exponent. Use repeated multiplication." }
  ];
  var ds = [], seen = {}; seen[String(val)] = 1;
  for (var j = 0; j < pool.length && ds.length < 3; j++) { if (!seen[String(pool[j].v)]) { seen[String(pool[j].v)] = 1; ds.push({ t: fmt(pool[j].v), fb: pool[j].fb }); } }
  var factors = [];
  for (var k = 0; k < Math.min(e2, 5); k++) factors.push("(" + base + ")");
  var expand = (e2 > 5) ? "(" + base + ")\\times (" + base + ")\\times \\cdots \\times (" + base + ")" : factors.join("\\times ");
  var signNote = (mode === "one") ? "Every factor is 1, so the product stays 1." : ((e2 % 2 === 0) ? "The exponent is even, so the negative factors pair up to a positive product." : "The exponent is odd, so one negative factor is left over and the product is negative.");
  return mcq(stemVerb + " \\(" + shown + "\\).",
    { t: fmt(val), fb: "Correct. You expanded the power and handled the sign correctly." }, ds,
    signNote + " \\[ \\begin{aligned} " + shown + " &= " + expand + " \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "topup-eval-" + mode, base: base, e: e2 });
}, ["Expand the power as repeated multiplication first, and watch the sign of each factor.", "Multiply the base by itself, using the exponent as the count, then settle the sign."]);

function u3tGrid(rows, cols) {
  var sp = 26, pad = 16;
  var w = (cols - 1) * sp + 2 * pad, h = (rows - 1) * sp + 2 * pad;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    s += '<circle cx="' + (pad + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
  }
  return s + '</svg>';
}
function u3tLayers(a) {
  var sp = 26, pad = 16, gap = 24;
  var gw = (a - 1) * sp;
  var w = 2 * pad + a * gw + (a - 1) * gap;
  var h = 2 * pad + gw + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var L = 0; L < a; L++) {
    var x0 = pad + L * (gw + gap);
    for (var r = 0; r < a; r++) for (var c = 0; c < a; c++) {
      s += '<circle cx="' + (x0 + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
    }
  }
  s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="13" fill="#17352a">' + a + ' layers, each ' + a + ' by ' + a + '</text>';
  return s + '</svg>';
}
function u3tFig(q, fig) { q.figure = fig; return q; }
function u3tPowOpt(a, e) { return "\\(" + a + "^{" + e + "}\\)"; }

E("u3-power-model-var", 3, ["3.4"], 1, "var", varset([
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. Which power does this model show?",
      { t: u3tPowOpt(3, 2), fb: "Correct. The side has 3 dots and the grid has 2 dimensions." },
      [
        { t: u3tPowOpt(2, 3), fb: "That swaps the base and the exponent. The side count is the base." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the exponent too. A flat grid has 2 dimensions." },
        { t: u3tPowOpt(3, 1), fb: "That uses exponent 1. A grid is built from two equal dimensions." }
      ],
      "Count the dots along one side and count the dimensions: \\[ \\begin{aligned} \\text{side} &= 3 \\text{ dots} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] The base is the side count, 3, and the exponent is the dimension count, 2. So the model shows <b>\\(3^{2}\\)</b>.",
      { mode: "model-grid-3" });
    return u3tFig(q, u3tGrid(3, 3));
  },
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. Which power does this model show?",
      { t: u3tPowOpt(4, 2), fb: "Correct. The side has 4 dots and the grid has 2 dimensions." },
      [
        { t: u3tPowOpt(2, 4), fb: "That swaps the base and the exponent. The side count is the base." },
        { t: u3tPowOpt(4, 3), fb: "That uses exponent 3, which would need layers. This model is one flat grid." },
        { t: u3tPowOpt(4, 1), fb: "That uses exponent 1. A grid is built from two equal dimensions." }
      ],
      "Count the dots along one side and count the dimensions: \\[ \\begin{aligned} \\text{side} &= 4 \\text{ dots} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] The base is the side count, 4, and the exponent is the dimension count, 2. So the model shows <b>\\(4^{2}\\)</b>.",
      { mode: "model-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. Which power does this model show?",
      { t: u3tPowOpt(2, 3), fb: "Correct. Each layer is 2 by 2 and there are 2 layers, giving base 2 with 3 dimensions in all." },
      [
        { t: u3tPowOpt(3, 2), fb: "That swaps the base and the exponent. The layer side is the base." },
        { t: u3tPowOpt(2, 2), fb: "That counts only one flat layer. The layers side by side add the third dimension." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the base. Each layer here is 2 by 2, not 3 by 3." }
      ],
      "Read the base from one layer and the exponent from the full build: \\[ \\begin{aligned} \\text{layer side} &= 2 \\text{ dots} \\\\ \\text{layers} &= 2, \\text{ each } 2 \\text{ by } 2 \\end{aligned} \\] The base is the dots along one side of a layer, 2, and the exponent counts the dimensions, 3 in all. So the model shows <b>\\(2^{3}\\)</b>.",
      { mode: "model-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. Which power does this model show?",
      { t: u3tPowOpt(3, 3), fb: "Correct. Each layer is 3 by 3 and there are 3 layers." },
      [
        { t: u3tPowOpt(3, 2), fb: "That counts only one flat layer. The layers side by side add the third dimension." },
        { t: u3tPowOpt(2, 3), fb: "That uses 2 as the base. Each layer here is 3 by 3, not 2 by 2." },
        { t: u3tPowOpt(3, 1), fb: "That uses exponent 1. The build uses three dimensions in all." }
      ],
      "Read the base from one layer and the exponent from the full build: \\[ \\begin{aligned} \\text{layer side} &= 3 \\text{ dots} \\\\ \\text{layers} &= 3, \\text{ each } 3 \\text{ by } 3 \\end{aligned} \\] The base is the dots along one side of a layer, 3, and the exponent counts the dimensions, 3 in all. So the model shows <b>\\(3^{3}\\)</b>.",
      { mode: "model-cube-3" });
    return u3tFig(q, u3tLayers(3));
  },
  function () {
    var q = mcq("Dot model convention: a square power is modelled as a grid, with the base as the number of dots along one side and the exponent 2 as the two grid dimensions, rows and columns. How many dots are in this model in total?",
      { t: "16", fb: "Correct. The grid is 4 by 4, and 4 times 4 is 16." },
      [
        { t: "8", fb: "That adds the side lengths, 4 plus 4. Multiply them to count the grid." },
        { t: "4", fb: "That counts one side only. Count every row of the grid." },
        { t: "12", fb: "That counts 3 rows of 4. The grid has 4 full rows." }
      ],
      "The grid has 4 rows with 4 dots in each row: \\[ \\begin{aligned} \\text{total} &= 4\\times 4 \\\\ &= 16 \\end{aligned} \\] The base, 4, is the side count, and the exponent, 2, is the number of dimensions multiplied. So the total is <b>16</b> dots.",
      { mode: "model-total-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Dot model convention: a cube power is modelled as identical square layers drawn side by side, with the base as the side of each layer and the exponent 3 as the number of layers. How many dots are in this model in total?",
      { t: "8", fb: "Correct. There are 2 layers with 4 dots each, and 2 times 4 is 8." },
      [
        { t: "6", fb: "That adds 2 and 4. Multiply the dots per layer by the number of layers." },
        { t: "4", fb: "That counts one layer only. There are 2 layers in the model." },
        { t: "12", fb: "That counts 3 layers of 4. The model has 2 layers." }
      ],
      "Each layer holds 2 by 2 dots and there are 2 layers: \\[ \\begin{aligned} \\text{total} &= 2\\times (2\\times 2) \\\\ &= 8 \\end{aligned} \\] The base, 2, is the side count of one layer, and the exponent, 3, counts the dimensions multiplied. So the total is <b>8</b> dots.",
      { mode: "model-total-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("A student tries to model \\(3^{2}\\) using the dot model conventions: a square power is a flat grid, and a cube power is identical square layers drawn side by side. The model the student built is shown. Which power does the model actually show?",
      { t: u3tPowOpt(2, 3), fb: "Correct. The layers make it a cube power with base 2, not a square power with base 3." },
      [
        { t: u3tPowOpt(3, 2), fb: "That is the power the student wanted. Read the model itself: it has layers, not one flat grid." },
        { t: u3tPowOpt(2, 2), fb: "That counts one layer only. The layers side by side add the third dimension." },
        { t: u3tPowOpt(3, 3), fb: "That uses 3 as the base. Each layer here is 2 by 2, not 3 by 3." }
      ],
      "Read the model on its own terms: \\[ \\begin{aligned} \\text{layer side} &= 2 \\text{ dots} \\\\ \\text{layers} &= 2, \\text{ each } 2 \\text{ by } 2 \\end{aligned} \\] The base is the side of one layer, 2, and the exponent is 3 because the build has three dimensions. So the model actually shows <b>\\(2^{3}\\)</b>.",
      { mode: "model-interchanged-cube" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("A student tries to model \\(2^{3}\\) using the dot model conventions: a square power is a flat grid, and a cube power is identical square layers drawn side by side. The model the student built is shown. What did the student mix up?",
      { t: "The base and exponent were swapped: the model shows \\(3^{2}\\), a flat 3 by 3 grid", fb: "Correct. A flat grid with side 3 is the square power 3 squared." },
      [
        { t: "The dots were counted wrongly: the model shows \\(2^{3}\\) with 9 dots in each layer", fb: "That keeps the wanted power. The model is one flat grid, and each side has 3 dots." },
        { t: "One layer is missing: adding a layer to this grid would complete the model of \\(2^{3}\\)", fb: "That treats the grid as a layer of the cube. Its side is 3, so it cannot be a layer of a power with base 2." },
        { t: "The model is correct as built: a flat 3 by 3 grid is the standard model of \\(2^{3}\\)", fb: "That accepts the swap. A cube power needs layers, and this grid has side 3, not 2." }
      ],
      "Read the model on its own terms: \\[ \\begin{aligned} \\text{grid side} &= 3 \\text{ dots} \\\\ \\text{layers} &= 1 \\text{ flat grid} \\end{aligned} \\] The base is the side count, 3, and a flat grid has exponent 2, so the model shows \\(3^{2}\\). The student swapped the base and the exponent. So the correct statement is <b>The base and exponent were swapped: the model shows \\(3^{2}\\), a flat 3 by 3 grid</b>.",
      { mode: "model-interchanged-grid" });
    return u3tFig(q, u3tGrid(3, 3));
  }
]), ["Read the base from the dots along one side or one layer first.", "Count the dimensions next: a flat grid has two, a layered build has three."]);

E("u3-zero-pattern", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["int", "int", "frac", "neg"]);
  var lines = [], baseTxt, lastStep, baseOpt, recipOpt;
  if (mode === "int") {
    var a = ri(2, 9), s = pick([3, 4, 5]);
    for (var k = s; k >= 1; k--) lines.push("\\(" + a + "^{" + k + "}=" + fmt(Math.pow(a, k)) + "\\)");
    baseTxt = a + "";
    lastStep = a + "^{1}\\div " + a + " &= " + a + "\\div " + a + " \\\\ &= 1";
    baseOpt = fmt(a);
    recipOpt = "\\(\\frac{1}{" + a + "}\\)";
  } else if (mode === "neg") {
    var a2 = ri(2, 6), s2 = pick([3, 4, 5]);
    for (var k2 = s2; k2 >= 1; k2--) lines.push("\\((-" + a2 + ")^{" + k2 + "}=" + fmt(Math.pow(-a2, k2)) + "\\)");
    baseTxt = "(-" + a2 + ")";
    lastStep = "(-" + a2 + ")^{1}\\div (-" + a2 + ") &= (-" + a2 + ")\\div (-" + a2 + ") \\\\ &= 1";
    baseOpt = fmt(-a2);
    recipOpt = "\\(-\\frac{1}{" + a2 + "}\\)";
  } else {
    var f = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [1, 6], [5, 6]]);
    var s3 = pick([3, 4]);
    for (var k3 = s3; k3 >= 1; k3--) lines.push("\\((" + u3tFracInner(f[0], f[1]) + ")^{" + k3 + "}=" + u3tFracInner(Math.pow(f[0], k3), Math.pow(f[1], k3)) + "\\)");
    baseTxt = "(" + u3tFracInner(f[0], f[1]) + ")";
    lastStep = "(" + u3tFracInner(f[0], f[1]) + ")^{1}\\div (" + u3tFracInner(f[0], f[1]) + ") &= " + u3tFracInner(f[0], f[1]) + "\\div " + u3tFracInner(f[0], f[1]) + " \\\\ &= 1";
    baseOpt = u3tFracOpt(f[0], f[1]);
    recipOpt = u3tFracOpt(f[1], f[0]);
  }
  var prompt = pick([
    "A pattern for the base \\(" + baseTxt + "\\) is shown. Each step down divides by the base.<br>" + lines.join("<br>") + "<br>What is the value of \\(" + baseTxt + "^{0}\\) that continues the pattern?",
    "The powers of \\(" + baseTxt + "\\) below follow a pattern, and each value is the one above it divided by the base.<br>" + lines.join("<br>") + "<br>Following the pattern one more step, what is \\(" + baseTxt + "^{0}\\)?",
    "Read the pattern for the base \\(" + baseTxt + "\\) from the top down. Every step divides by the base.<br>" + lines.join("<br>") + "<br>What value does the pattern give for \\(" + baseTxt + "^{0}\\)?"
  ]);
  return mcq(prompt,
    { t: "1", fb: "Correct. Dividing the first power value by the base one more time gives one." },
    [
      { t: "0", fb: "That treats the zero exponent as giving zero. Follow the division pattern down one more step." },
      { t: baseOpt, fb: "That is the base itself, the value of the first power. Divide it by the base once more." },
      { t: recipOpt, fb: "That divides once too often, or divides the wrong way. One division from the first power value gives one." }
    ],
    "Each step down divides by the base, so continue from the first power: \\[ \\begin{aligned} " + lastStep + " \\end{aligned} \\] So the value that continues the pattern is <b>1</b>.",
    { mode: "topup-zero-" + mode });
}, ["Watch what happens to the value each time the exponent drops by one.", "Take the value of the first power and divide it by the base."]);

E("u3-paren-powers-set", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 5), e = ri(2, 4);
  var forms = [
    { txt: "(-" + b + ")^{" + e + "}", val: Math.pow(-b, e) },
    { txt: "(-" + b + "^{" + e + "})", val: -Math.pow(b, e) },
    { txt: "-" + b + "^{" + e + "}", val: -Math.pow(b, e) }
  ];
  var order = shuffle([0, 1, 2]);
  var shownForms = order.map(function (i) { return forms[i]; });
  var listTxt = shownForms.map(function (f, i) { return "Form " + (i + 1) + ": \\(" + f.txt + "\\)"; }).join("<br>");
  var mode = (e % 2 === 0 && Math.random() < 0.45) ? "pair" : "triple";
  if (mode === "pair") {
    function pairTxt(i, j) { return "\\(" + shownForms[i].txt + "\\) and \\(" + shownForms[j].txt + "\\)"; }
    var eqPair = null;
    for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) { if (shownForms[i].val === shownForms[j].val) eqPair = [i, j]; }
    var pairs = [[0, 1], [0, 2], [1, 2]];
    var dsP = pairs.filter(function (p) { return !(p[0] === eqPair[0] && p[1] === eqPair[1]); }).map(function (p) {
      return { t: pairTxt(p[0], p[1]), fb: "Those two forms have different values. Check which forms keep the negative sign outside the power." };
    });
    dsP.push({ t: "All three forms have the same value", fb: "That is not so here. The bracketed form has a different value from the other two." });
    return mcq("Three forms are shown.<br>" + listTxt + "<br>Which two forms have the same value?",
      { t: pairTxt(eqPair[0], eqPair[1]), fb: "Correct. In both forms the power is worked out first and the negative sign stays outside." }, dsP,
      "Work out each form: \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmt(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] The two forms with the same value are <b>" + pairTxt(eqPair[0], eqPair[1]) + "</b>.",
      { mode: "topup-paren-pair", b: b, e: e });
  }
  var vals = shownForms.map(function (f) { return f.val; });
  function trip(v) { return "\\(" + v.map(function (x) { return fmt(x); }).join(", ") + "\\)"; }
  var poolT = [
    { v: [-vals[0], vals[1], vals[2]], fb: "That changes the sign of the first form. Check what its brackets cover." },
    { v: [vals[0], -vals[1], vals[2]], fb: "That changes the sign of the second form. Check where its negative sign sits." },
    { v: [vals[0], vals[1], -vals[2]], fb: "That changes the sign of the third form. Check where its negative sign sits." },
    { v: [-vals[0], -vals[1], -vals[2]], fb: "That changes every sign. Work out the bracketed form on its own first." },
    { v: [Math.abs(vals[0]), Math.abs(vals[1]), Math.abs(vals[2])], fb: "That drops every negative sign. Some forms keep a negative value." },
    { v: [vals[1], vals[0], vals[2]], fb: "That swaps the first two values. Keep the values in the order the forms are shown." }
  ];
  var dsT = [], seenT = {}; seenT[trip(vals)] = 1;
  for (var t = 0; t < poolT.length && dsT.length < 3; t++) { var tt = trip(poolT[t].v); if (!seenT[tt]) { seenT[tt] = 1; dsT.push({ t: tt, fb: poolT[t].fb }); } }
  return mcq("Three forms are shown.<br>" + listTxt + "<br>What are the values of the three forms, in the order shown?",
    { t: trip(vals), fb: "Correct. You checked what the brackets cover in each form." }, dsT,
    "Work out each form in turn: \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmt(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] In the bracketed form the negative value is the base. In the other two forms the power is worked out first and the negative sign stays outside. So the values, in order, are <b>" + trip(vals) + "</b>.",
    { mode: "topup-paren-triple", b: b, e: e });
}, ["Look at each form on its own and settle what its base is.", "Work out the first form by expanding it, then do the same for the other two."]);

E("u3-two-laws-context", 3, ["3.12"], 2, "gen", function () {
  var fam = pick(["prodquot", "powprod"]);
  if (fam === "prodquot") {
    var a = ri(2, 5), m = ri(2, 3), n = ri(2, 3), p = ri(1, 2);
    var tot = m + n - p, val = Math.pow(a, tot);
    var ctx = pick([
      "A rectangular garden bed is \\(" + a + "^{" + m + "}\\) metres long and \\(" + a + "^{" + n + "}\\) metres wide. Its area is the product of the two lengths. The bed is shared equally among \\(" + a + "^{" + p + "}\\) gardeners. How many square metres does each gardener get?",
      "A floor section uses \\(" + a + "^{" + m + "}\\) tiles in each row and has \\(" + a + "^{" + n + "}\\) rows in total. All of the tiles are packed equally into \\(" + a + "^{" + p + "}\\) boxes. How many tiles are in each box?",
      "A print shop makes \\(" + a + "^{" + m + "}\\) cards on each sheet and prints \\(" + a + "^{" + n + "}\\) sheets. The cards are bundled equally into \\(" + a + "^{" + p + "}\\) packs. How many cards are in each pack?"
    ]);
    return numq(ctx, val, 0,
      "Multiply first with the product law, then divide with the quotient law: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "}\\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} \\\\ &= " + fmt(val) + " \\end{aligned} \\] So the answer is <b>" + fmt(val) + "</b>.",
      { mode: "topup-context-prodquot", a: a, m: m, n: n, p: p });
  }
  var a2 = ri(2, 4), m2 = ri(2, 3), p2 = ri(1, 3);
  var tot2 = 2 * m2 + p2, val2 = Math.pow(a2, tot2);
  if (val2 > 90000) { p2 = 1; tot2 = 2 * m2 + p2; val2 = Math.pow(a2, tot2); }
  var ctx2 = pick([
    "Each square planter has sides of \\(" + a2 + "^{" + m2 + "}\\) metres, so the area of one planter is the square of its side. A park has \\(" + a2 + "^{" + p2 + "}\\) identical planters. What is the total area of all the planters, in square metres?",
    "Each square sticker has sides of \\(" + a2 + "^{" + m2 + "}\\) centimetres, so the area of one sticker is the square of its side. A sheet holds \\(" + a2 + "^{" + p2 + "}\\) identical stickers. What is the total area of all the stickers, in square centimetres?",
    "Each square garden plot has sides of \\(" + a2 + "^{" + m2 + "}\\) metres, so the area of one plot is the square of its side. A school has \\(" + a2 + "^{" + p2 + "}\\) identical plots. What is the total area of all the plots, in square metres?"
  ]);
  return numq(ctx2, val2, 0,
    "Square the side with the power of a power law, then multiply with the product law: \\[ \\begin{aligned} (" + a2 + "^{" + m2 + "})^{2} &= " + a2 + "^{" + (2 * m2) + "} \\\\ " + a2 + "^{" + (2 * m2) + "}\\times " + a2 + "^{" + p2 + "} &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmt(val2) + " \\end{aligned} \\] So the answer is <b>" + fmt(val2) + "</b>.",
    { mode: "topup-context-powprod", a: a2, m: m2, p: p2 });
}, ["Turn the context into powers of one base first, then choose the laws.", "Write the total as a product or quotient of powers before you evaluate anything."]);

E("u3-laws-mixed-eval", 3, ["3.12"], 3, "gen", function () {
  var tuples = [];
  var A, B, N, P, Q, val;
  for (A = 2; A <= 4; A++) for (B = 2; B <= 4; B++) for (N = 2; N <= 3; N++) for (P = 1; P <= N; P++) for (Q = 1; Q <= N; Q++) {
    val = Math.pow(A, N - P) * Math.pow(B, N - Q);
    if (val > 1 && val < 100000) tuples.push({ kind: "prodquot", a: A, b: B, n: N, p: P, q: Q, val: val });
  }
  for (B = 2; B <= 4; B++) for (var C = 2; C <= 4; C++) for (N = 2; N <= 3; N++) for (P = 1; P < N; P++) {
    var big = B * C;
    val = Math.pow(big, N - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "quotprod", big: big, b: B, c: C, n: N, p: P, val: val });
  }
  for (A = 2; A <= 4; A++) for (B = 2; B <= 3; B++) for (P = 2; P <= 3; P++) {
    val = Math.pow(A * B, 4 - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "powpow", a: A, b: B, p: P, val: val });
  }
  var t = pick(tuples);
  if (t.kind === "prodquot") {
    var expr = "\\frac{(" + t.a + "\\times " + t.b + ")^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}}";
    return numq("Evaluate \\(" + expr + "\\).", t.val, 0,
      "Start with the power of a product, then use the quotient law on each base: \\[ \\begin{aligned} " + expr + " &= \\frac{" + t.a + "^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}} \\\\ &= " + t.a + "^{" + (t.n - t.p) + "}\\times " + t.b + "^{" + (t.n - t.q) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
      { mode: "topup-mixed-prodquot", a: t.a, b: t.b, n: t.n, p: t.p, q: t.q });
  }
  if (t.kind === "quotprod") {
    var expr2 = "\\frac{(" + t.big + "\\div " + t.b + ")^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}}";
    return numq("Evaluate \\(" + expr2 + "\\).", t.val, 0,
      "Start with the power of a quotient, then tidy up with the product and quotient laws: \\[ \\begin{aligned} " + expr2 + " &= \\frac{" + t.big + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}} \\\\ &= " + t.big + "^{" + (t.n - t.p) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
      { mode: "topup-mixed-quotprod", big: t.big, b: t.b, n: t.n, p: t.p });
  }
  var expr3 = "\\frac{((" + t.a + "\\times " + t.b + ")^{2})^{2}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}}";
  return numq("Evaluate \\(" + expr3 + "\\).", t.val, 0,
    "Start with the power of a power on the product base, then use the quotient law: \\[ \\begin{aligned} " + expr3 + " &= \\frac{(" + t.a + "\\times " + t.b + ")^{4}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}} \\\\ &= (" + t.a + "\\times " + t.b + ")^{" + (4 - t.p) + "} \\\\ &= " + fmt(t.val) + " \\end{aligned} \\] So the value is <b>" + fmt(t.val) + "</b>.",
    { mode: "topup-mixed-powpow", a: t.a, b: t.b, p: t.p });
}, ["Sort the expression into steps: one law at a time, starting inside the brackets.", "Apply the power of a product or power of a quotient law first, then combine what is left."]);

E("u3-error-two-laws", 3, ["3.15"], 3, "gen", function () {
  var fam = pick(["prod", "quot"]);
  var a = ri(2, 6), m = ri(2, 4), n = ri(2, 3), p = ri(2, 4);
  if (m === 2 && n === 2) n = 3;
  var err = ri(1, 2);
  var e1ok = m * n;
  var e1 = (err === 1) ? (m + n) : e1ok;
  var ec, e2, opSym, errNote;
  if (fam === "prod") {
    ec = e1ok + p;
    e2 = (err === 1) ? (e1 + p) : (e1ok * p);
    opSym = "\\times ";
    errNote = (err === 1)
      ? "In Step 1 the exponents were added, but a power of a power multiplies the exponents."
      : "In Step 2 the exponents were multiplied, but the product law adds the exponents.";
  } else {
    if (p >= e1ok) p = e1ok - 1;
    if (err === 1 && p >= e1) p = Math.max(1, e1 - 1);
    ec = e1ok - p;
    e2 = (err === 1) ? (e1 - p) : (e1ok + p);
    opSym = "\\div ";
    errNote = (err === 1)
      ? "In Step 1 the exponents were added, but a power of a power multiplies the exponents."
      : "In Step 2 the exponents were added, but the quotient law subtracts the exponents.";
  }
  var expr = "((" + a + "^{" + m + "})^{" + n + "}" + opSym + a + "^{" + p + "})";
  var prompt = "A student simplifies \\(" + expr + "\\) in two steps. The working contains one error.<br>Step 1: \\((" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}\\)<br>Step 2: \\(" + a + "^{" + e1 + "}" + opSym + a + "^{" + p + "} = " + a + "^{" + e2 + "}\\)<br>What is the correct simplified result, as a single power?";
  var pool = [
    { v: e2, fb: "That is the result in the shown working, which contains the error." },
    { v: (fam === "prod") ? (e1ok - p) : (e1ok + p), fb: "That uses the wrong law in the second step. Check whether the expression multiplies or divides." },
    { v: m + n + p, fb: "That adds every exponent. A power of a power multiplies its exponents." },
    { v: ec + 1, fb: "That is one too large. Redo both law steps carefully." },
    { v: ec - 1, fb: "That is one too small. Redo both law steps carefully." },
    { v: e1ok, fb: "That stops after the first step. The second law still has to be applied." }
  ];
  var ds = [], seen = {}; seen[String(ec)] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) {
    if (pool[i].v > 0 && !seen[String(pool[i].v)]) { seen[String(pool[i].v)] = 1; ds.push({ t: "\\(" + a + "^{" + pool[i].v + "}\\)", fb: pool[i].fb }); }
  }
  var step2ok = a + "^{" + e1ok + "}" + opSym + a + "^{" + p + "} &= " + a + "^{" + ec + "}";
  return mcq(prompt,
    { t: "\\(" + a + "^{" + ec + "}\\)", fb: "Correct. You redid both law steps and fixed the misapplied law." }, ds,
    errNote + " The correct working is \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}) &= " + a + "^{" + e1ok + "} \\\\ " + step2ok + " \\end{aligned} \\] So the correct simplified result is <b>\\(" + a + "^{" + ec + "}\\)</b>.",
    { mode: "topup-error-" + fam + "-" + err, a: a, m: m, n: n, p: p });
}, ["Redo the simplification yourself, one law at a time, before you look at the choices.", "Start with the power of a power, then apply the second law to your own result."]);

