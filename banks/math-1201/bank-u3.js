// Math 1201 Unit 3 Factors and Products question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 1442 to 2188).
// CRMARKS: u3-binomial-expand=2
// CRMARKS: u3-binom-tri-expand=3
// CRMARKS: u3-special-products=2
// CRMARKS: u3-verify-sub=1
// CRMARKS: u3-gcf=2
// CRMARKS: u3-factor-monic=2
// CRMARKS: u3-factor-hard=3
// CRMARKS: u3-factor-product=2
// CRMARKS: u3-factor-gcf-first=2
// CRMARKS: u3-diff-squares=2
// CRMARKS: u3-mult-error=2
// CRMARKS: u3-factor-error=3
// CRMARKS: u3-factorable-k=3
/* Math 1201 Review, Unit 3 (Factors and Products) bank entries.
   Authored November 2026 from the tranche 1 briefs. All scenarios and
   values are original. Polynomials are rendered by the u3 helpers below:
   terms in descending powers, signs folded in, coefficients small.
   Helper prefix: u3. */

/* ============ u3 algebra and rendering helpers ============ */
function u3GCD(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
function u3GCD3(a, b, c) { return u3GCD(u3GCD(a, b), c); }
function u3VarPart(ex, ey) {
  var s = "";
  if (ex > 0) s += "x" + (ex > 1 ? "^" + ex : "");
  if (ey > 0) s += "y" + (ey > 1 ? "^" + ey : "");
  return s;
}
function u3Body(c, ex, ey) {
  var vp = u3VarPart(ex, ey);
  return (vp && Math.abs(c) === 1) ? vp : Math.abs(c) + vp;
}
/* Render a list of terms [coeff, xPow, yPow], combining like terms and
   sorting by descending total degree. */
function u3Str(list) {
  var map = {}, keys = [];
  list.forEach(function (t) {
    if (t[0] === 0) return;
    var k = t[1] * 100 + t[2];
    if (map[k] === undefined) { map[k] = [0, t[1], t[2]]; keys.push(k); }
    map[k][0] += t[0];
  });
  var terms = keys.map(function (k) { return map[k]; }).filter(function (t) { return t[0] !== 0; });
  terms.sort(function (p, q) { var dp = p[1] + p[2], dq = q[1] + q[2]; if (dp !== dq) return dq - dp; return q[1] - p[1]; });
  if (!terms.length) return "0";
  return terms.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}
/* Render terms in the given order without combining (partial products). */
function u3StrSeq(list) {
  var parts = list.filter(function (t) { return t[0] !== 0; });
  if (!parts.length) return "0";
  return parts.map(function (t, i) {
    var b = u3Body(t[0], t[1], t[2]);
    if (i === 0) return (t[0] < 0 ? "-" : "") + b;
    return (t[0] < 0 ? " - " : " + ") + b;
  }).join("");
}
function u3TermsOf(coeffs, v) {
  return coeffs.map(function (c, i) { var p = coeffs.length - 1 - i; return v === "y" ? [c, 0, p] : [c, p, 0]; });
}
function u3PC(coeffs, v) { return u3Str(u3TermsOf(coeffs, v)); }
function u3Par(coeffs, v) { return "(" + u3PC(coeffs, v) + ")"; }
function u3Mul(P, Q) {
  var out = [];
  P.forEach(function (p) { Q.forEach(function (q) { out.push([p[0] * q[0], p[1] + q[1], p[2] + q[2]]); }); });
  return out;
}
function u3Conv(A, B) {
  var out = [], i;
  for (i = 0; i < A.length + B.length - 1; i++) out.push(0);
  A.forEach(function (a, j) { B.forEach(function (b, k) { out[j + k] += a * b; }); });
  return out;
}
function u3Alg(lines) { return "\\[ \\begin{aligned} " + lines.join(" \\\\ ") + " \\end{aligned} \\]"; }
function u3M(raw) { return "\\(" + raw + "\\)"; }
function u3PerturbCoeffs(coeffs) {
  var out = [], i, c2;
  for (i = 1; i < coeffs.length; i++) {
    if (coeffs[i] !== 0) { c2 = coeffs.slice(); c2[i] = -c2[i]; out.push(c2); }
    c2 = coeffs.slice(); c2[i] += 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 1; out.push(c2);
    c2 = coeffs.slice(); c2[i] += 2; out.push(c2);
    c2 = coeffs.slice(); c2[i] -= 2; out.push(c2);
  }
  c2 = coeffs.slice(); c2[0] += 1; out.push(c2);
  if (coeffs[0] > 1) { c2 = coeffs.slice(); c2[0] -= 1; out.push(c2); }
  if (coeffs.length > 2) { c2 = coeffs.slice(); var t = c2[1]; c2[1] = c2[2]; c2[2] = t; out.push(c2); }
  return out;
}
function u3DistrCoeffs(keyCoeffs, v, count) {
  var key = u3PC(keyCoeffs, v), seen = {}, out = [];
  shuffle(u3PerturbCoeffs(keyCoeffs)).forEach(function (c) {
    var s = u3PC(c, v);
    if (s !== key && !seen[s]) { seen[s] = 1; out.push(u3M(s)); }
  });
  var guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    var c2 = keyCoeffs.slice(), i = ri(1, keyCoeffs.length - 1);
    c2[i] += pick([-3, -2, -1, 1, 2, 3]);
    var s2 = u3PC(c2, v);
    if (s2 !== key && !seen[s2]) { seen[s2] = 1; out.push(u3M(s2)); }
  }
  return out.slice(0, count);
}
function u3FacRaw(gRaw, facs, v) {
  return (gRaw || "") + facs.map(function (f) { return u3Par(f, v); }).join("");
}
function u3FacExpand(facs) {
  var acc = [1];
  facs.forEach(function (f) { acc = u3Conv(acc, f); });
  return acc;
}
function u3SameArr(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }
/* Distractors for a factored form: perturb constants or swap them, and
   reject any candidate that expands to the same polynomial. */
function u3FacDistr(gRaw, facs, v, targetCoeffs, count) {
  var key = u3FacRaw(gRaw, facs, v), seen = {}, out = [];
  var cands = [];
  facs.forEach(function (f, fi) {
    [1, -1, 2, -2].forEach(function (d) {
      var nf = facs.map(function (g) { return g.slice(); });
      nf[fi][nf[fi].length - 1] += d;
      cands.push(nf);
    });
    var sf = facs.map(function (g) { return g.slice(); });
    sf[fi][sf[fi].length - 1] = -sf[fi][sf[fi].length - 1];
    cands.push(sf);
  });
  if (facs.length > 1) {
    var sw = facs.map(function (g) { return g.slice(); });
    var t = sw[0][sw[0].length - 1]; sw[0][sw[0].length - 1] = sw[1][sw[1].length - 1]; sw[1][sw[1].length - 1] = t;
    cands.push(sw);
  }
  shuffle(cands).forEach(function (nf) {
    if (u3SameArr(u3FacExpand(nf), targetCoeffs)) return;
    var s = u3FacRaw(gRaw, nf, v);
    if (s !== key && !seen[s]) { seen[s] = 1; out.push(u3M(s)); }
  });
  return out.slice(0, count);
}
function u3Nz(a, b) { var n = 0; while (n === 0) n = ri(a, b); return n; }
/* Factor pairs [p, q] with p <= q and p * q = m, in increasing p. */
function u3PairsOf(m) {
  var out = [];
  for (var p = 1; p * p <= m; p++) if (m % p === 0) out.push([p, m / p]);
  return out;
}
/* A value set as a sorted, deduplicated array, and its KaTeX raw
   rendering as a brace set, for the find-all-k entry. */
function u3SetArr(a) {
  var seen = {}, out = [];
  a.forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
  return out.sort(function (x, y) { return x - y; });
}
function u3SetRaw(a) { return "\\{" + u3SetArr(a).join(", ") + "\\}"; }

/* ============ 1. monomial times a binomial or trinomial (3.4, L1) ============ */
E("u3-monomial-expand", 3, ["3.4"], 1, "gen", function () {
  var mode = ri(0, 2), P, Q, pdesc;
  if (mode === 0) {
    var a = u3Nz(-6, 6); if (Math.abs(a) < 2) a = a < 0 ? -3 : 3;
    var k = ri(1, 2), p = ri(1, 4), q = u3Nz(-7, 7);
    P = [[a, k, 0]]; Q = [[p, 1, 0], [q, 0, 0]];
    pdesc = u3Str(P) + u3Par([p, q], "x");
  } else if (mode === 1) {
    var a2 = u3Nz(-5, 5); if (Math.abs(a2) < 2) a2 = a2 < 0 ? -2 : 2;
    var p2 = ri(1, 3), q2 = u3Nz(-6, 6), r2 = u3Nz(-8, 8);
    P = [[a2, 1, 0]]; Q = [[p2, 2, 0], [q2, 1, 0], [r2, 0, 0]];
    pdesc = u3Str(P) + u3Par([p2, q2, r2], "x");
  } else {
    var a3 = u3Nz(-5, 5); if (Math.abs(a3) < 2) a3 = a3 < 0 ? -4 : 4;
    var p3 = ri(1, 3), q3 = u3Nz(-4, 4);
    P = [[a3, 1, 1]]; Q = [[p3, 1, 0], [q3, 0, 1]];
    pdesc = u3Str(P) + "(" + u3Str(Q) + ")";
  }
  var partials = u3Mul(P, Q), keyRaw = u3Str(partials);
  var seen = {}, distr = [];
  shuffle(u3PerturbTerms(partials)).forEach(function (s) {
    if (s !== keyRaw && !seen[s]) { seen[s] = 1; distr.push(u3M(s)); }
  });
  var prompt = "Expand and simplify \\(" + pdesc + "\\).";
  var sol = "Multiply the monomial by every term inside the brackets." +
    u3Alg([pdesc + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), distr.slice(0, 3), sol, { t: "expand", P: P, Q: Q });
});
function u3PerturbTerms(terms) {
  var base = [];
  var map = {}, keys = [];
  terms.forEach(function (t) { var k = t[1] * 100 + t[2]; if (map[k] === undefined) { map[k] = [0, t[1], t[2]]; keys.push(k); } map[k][0] += t[0]; });
  keys.forEach(function (k) { if (map[k][0] !== 0) base.push(map[k]); });
  var out = [];
  base.forEach(function (t, i) {
    [function (c) { return -c; }, function (c) { return c + 1; }, function (c) { return c - 1; }, function (c) { return c + 2; }].forEach(function (f) {
      var nt = base.map(function (g) { return g.slice(); });
      nt[i][0] = f(nt[i][0]);
      out.push(u3Str(nt));
    });
    var dropped = base.filter(function (g, j) { return j !== i; });
    if (dropped.length) out.push(u3Str(dropped));
  });
  return out;
}

/* ============ 2. multiplication and factoring relationship (3.8, L1, var) ============ */
E("u3-mult-factor-rel", 3, ["3.8"], 1, "var", varset([
  function () {
    var key = "Factoring is the reverse of multiplying: the factors of a polynomial multiply together to give the polynomial.";
    return mcq("Which statement best describes the relationship between multiplying polynomials and factoring polynomials?",
      key,
      ["Factoring is the reverse of multiplying: the factors of a polynomial add together to give the polynomial.",
       "Multiplying is the reverse of factoring: the terms of a product multiply together to give each separate factor.",
       "Multiplying and factoring are the same process: both rewrite a polynomial as a sum of its individual terms."],
      "Multiplying builds a product from factors, and factoring undoes that step by splitting a polynomial back into the expressions that multiply to give it. The statement that says this is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Multiply \\((x + 2)\\) by \\((x + 3)\\) and confirm that the product is \\(x^2 + 5x + 6\\).";
    return mcq("A student factors \\(x^2 + 5x + 6\\) as \\((x + 2)(x + 3)\\). Which action checks the factoring by using its relationship with multiplication?",
      key,
      ["Add \\((x + 2)\\) and \\((x + 3)\\) and confirm that the sum is \\(x^2 + 5x + 6\\).",
       "Multiply \\((x + 2)\\) by \\((x + 3)\\) and confirm that the product is \\(x^2 + 6x + 5\\).",
       "Substitute \\(x = 0\\) into \\(x^2 + 5x + 6\\) and confirm that the value is \\(6\\)."],
      "Factoring and multiplying are inverse processes, so a factorization is checked by multiplying the factors back together and comparing with the original polynomial. The checking action is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 1)(x + 4) = x^2 + 5x + 4\\) and \\(x^2 + 5x + 4 = (x + 1)(x + 4)\\)";
    return mcq("Which pair of equations shows multiplication and factoring as inverse processes?",
      key,
      ["\\((x + 1)(x + 4) = x^2 + 4x + 4\\) and \\(x^2 + 4x + 4 = (x + 1)(x + 4)\\)",
       "\\((x + 2)(x + 3) = x^2 + 6x + 6\\) and \\(x^2 + 6x + 6 = (x + 2)(x + 3)\\)",
       "\\((x + 1)(x + 4) = x^2 + 5x + 4\\) and \\(x^2 + 5x + 4 = (x + 2)(x + 3)\\)"],
      "The two equations must use the same polynomial and the same factors, with one equation expanding the product and the other splitting the polynomial into those factors. Since \\((x + 1)(x + 4) = x^2 + 5x + 4\\), the inverse pair is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Because factoring rewrites the polynomial as a product, and expanding a product reverses that rewriting exactly.";
    return mcq("A polynomial is factored correctly. Why does expanding the factored form always return the original polynomial?",
      key,
      ["Because factoring rewrites the polynomial as a sum, and expanding a sum reverses that rewriting exactly.",
       "Because each factor has the same degree as the polynomial, so expanding restores every original term in its place.",
       "Because expanding removes the common factor from each term of the polynomial, which returns the terms to their places."],
      "A factored form is a product of expressions that together equal the polynomial, so multiplying them back out must reproduce the polynomial exactly. The reason is **" + key + "**",
      { t: "stmt", ans: key });
  }
]));

/* ============ 3. binomials and two-digit numbers (3.1, L1, var) ============ */
E("u3-two-digit", 3, ["3.1"], 1, "var", varset([
  function () {
    var key = "\\((30 + 4)(20 + 6)\\)";
    return mcq("A student multiplies \\(34\\) by \\(26\\) by splitting each number into tens and ones, the same split used for binomials. Which expression matches this method?",
      key,
      ["\\((30 + 4)(20 + 4)\\)", "\\((30 + 4) + (20 + 6)\\)", "\\((30 \\times 20) + (4 \\times 6)\\)"],
      "Split each number into tens and ones: \\(34 = 30 + 4\\) and \\(26 = 20 + 6\\). The product keeps both splits as factors, exactly like a product of binomials." +
      u3Alg(["(30 + 4)(20 + 6) &= 600 + 180 + 80 + 24", "&= 884"]) +
      "This matches \\(34 \\times 26 = 884\\). The matching expression is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    return mcq("The product \\(47 \\times 35\\) is computed by splitting each factor into tens and ones: \\((40 + 7)(30 + 5)\\). What is the value of the product?",
      "1645",
      ["1235", "1435", "1640"],
      "Each part of one split multiplies each part of the other, as with binomials." +
      u3Alg(["(40 + 7)(30 + 5) &= 1200 + 200 + 210 + 35", "&= 1645"]) +
      "The value of the product is **1645**.",
      { t: "stmt", ans: "1645" });
  },
  function () {
    var key = "\\(13 \\times 15\\)";
    return mcq("Setting \\(x = 10\\) in the binomial product \\((x + 3)(x + 5)\\) produces a product of two two-digit numbers. Which product is it?",
      key,
      ["\\(10 \\times 15\\)", "\\(13 \\times 8\\)", "\\(30 \\times 50\\)"],
      "Replace \\(x\\) by \\(10\\) in each binomial: \\(x + 3 = 13\\) and \\(x + 5 = 15\\). A binomial in \\(x\\) with \\(x = 10\\) is a two-digit number split into tens and ones. The product is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "1000, 150, 40, 6";
    return mcq("The product \\(52 \\times 23\\) is split as \\((50 + 2)(20 + 3)\\). Which list gives all four partial products?",
      key,
      ["1000, 150, 40", "1000, 100, 60, 6", "100, 150, 40, 6"],
      "Multiply each part of the first split by each part of the second: \\(50 \\times 20 = 1000\\), \\(50 \\times 3 = 150\\), \\(2 \\times 20 = 40\\) and \\(2 \\times 3 = 6\\). Their sum is \\(1196 = 52 \\times 23\\). The four partial products are **" + key + "**.",
      { t: "stmt", ans: key });
  }
]));

/* ============ 4. area model (3.2, 3.3, L1, var) ============ */
E("u3-area-model", 3, ["3.2", "3.3"], 1, "var", varset([
  function () {
    var key = "\\(x^2 + 6x + 8\\)";
    return mcq("A rectangle with length \\(x + 4\\) and width \\(x + 2\\) is divided into four regions with areas \\(x^2\\), \\(2x\\), \\(4x\\) and \\(8\\). What is the area of the whole rectangle, in simplified form?",
      key,
      ["\\(x^2 + 8x + 8\\)", "\\(x^2 + 6x + 6\\)", "\\(x^2 + 4x + 8\\)"],
      "The area of the whole rectangle is the sum of the four partial areas." +
      u3Alg(["x^2 + 2x + 4x + 8 &= x^2 + 6x + 8"]) +
      "The total area is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 3)(x + 4)\\)";
    return mcq("Four regions of an area model have areas \\(x^2\\), \\(3x\\), \\(4x\\) and \\(12\\). The total area, \\(x^2 + 7x + 12\\), is the product of the rectangle's length and width. Which expressions give the length and width?",
      key,
      ["\\((x + 2)(x + 6)\\)", "\\((x + 1)(x + 12)\\)", "\\((x + 3)(x + 7)\\)"],
      "The side pieces must produce the partial areas: \\(3x\\) comes from a side piece of \\(3\\) meeting the \\(x\\) side, and \\(4x\\) from a side piece of \\(4\\), with \\(3 \\times 4 = 12\\) for the corner region. The sides are \\(x + 3\\) and \\(x + 4\\), so the length and width are given by **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\((x + 2)(x + 3)\\)";
    return mcq("An algebra-tile rectangle uses one \\(x^2\\) tile, five \\(x\\) tiles and six unit tiles, with no gaps. Which product does the rectangle model?",
      key,
      ["\\((x + 1)(x + 6)\\)", "\\((x + 2)(x + 2)\\)", "\\((x + 5)(x + 6)\\)"],
      "The tiles total \\(x^2 + 5x + 6\\). The side pieces must add to \\(5\\) (the number of \\(x\\) tiles along the sides) and multiply to \\(6\\) (the unit tiles in the corner), giving pieces of \\(2\\) and \\(3\\). The product modelled is **" + key + "**.",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "\\(x + 5\\)";
    return mcq("In an area model for \\((x + 2)(x + 5)\\), one side of the rectangle is \\(x + 2\\). The four regions have areas \\(x^2\\), \\(5x\\), \\(2x\\) and \\(10\\). What is the other side of the rectangle?",
      key,
      ["\\(x + 2\\)", "\\(x + 7\\)", "\\(x + 10\\)"],
      "The region \\(5x\\) is formed where the \\(x\\) part of the known side meets a piece of length \\(5\\) on the other side, and the corner \\(10 = 2 \\times 5\\) confirms that piece. The other side is **" + key + "**.",
      { t: "stmt", ans: key });
  }
]));

/* ============ 5. binomial times binomial (3.4, L2) ============ */
E("u3-binomial-expand", 3, ["3.4"], 2, "gen", function () {
  var v = pick(["x", "x", "y"]);
  var A = [ri(1, 3), u3Nz(-6, 6)], B = [ri(1, 3), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, v);
  var partials = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
  var prompt = "Expand and simplify \\(" + u3Par(A, v) + u3Par(B, v) + "\\).";
  var sol = "Multiply each term of the first binomial by each term of the second binomial, then combine like terms." +
    u3Alg([u3Par(A, v) + u3Par(B, v) + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, v, 3), sol,
    { t: "expand", P: u3TermsOf(A, v), Q: u3TermsOf(B, v) });
});

/* ============ 6. binomial times trinomial (3.4, L2) ============ */
E("u3-binom-tri-expand", 3, ["3.4"], 2, "gen", function () {
  var A = [ri(1, 3), u3Nz(-5, 5)];
  var B = [ri(1, 3), u3Nz(-5, 5), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, "x");
  var partials = u3Mul(u3TermsOf(A, "x"), u3TermsOf(B, "x"));
  var prompt = "Expand and simplify \\(" + u3Par(A, "x") + u3Par(B, "x") + "\\).";
  var sol = "Multiply each term of the binomial by each of the three terms of the trinomial, giving six partial products, then combine like terms." +
    u3Alg([u3Par(A, "x") + u3Par(B, "x") + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, "x", 3), sol,
    { t: "expand", P: u3TermsOf(A, "x"), Q: u3TermsOf(B, "x") });
});

/* ============ 7. special products, coefficient of the linear term (3.4, L2, num) ============ */
E("u3-special-products", 3, ["3.4"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var a = ri(1, 6), b = ri(1, 9);
  var mode = pick(["sq", "sq", "conj"]);
  var A, B, expr, steps;
  if (mode === "sq") {
    var s = pick([1, -1]);
    A = [a, s * b]; B = [a, s * b];
    expr = u3Par(A, v) + "^2";
    var parts = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
    steps = [expr + " &= " + u3StrSeq(parts), "&= " + u3PC(u3Conv(A, B), v)];
  } else {
    A = [a, b]; B = [a, -b];
    expr = u3Par(A, v) + u3Par(B, v);
    var parts2 = u3Mul(u3TermsOf(A, v), u3TermsOf(B, v));
    steps = [expr + " &= " + u3StrSeq(parts2), "&= " + u3PC(u3Conv(A, B), v)];
  }
  var prod = u3Conv(A, B), ans = prod[1];
  var prompt = "Expand \\(" + expr + "\\). What is the coefficient of \\(" + v + "\\) in the expansion?";
  var sol = (mode === "sq"
    ? "Squaring a binomial produces three terms; the middle term comes from both cross products together."
    : "The two factors are conjugates, so the two cross products are opposites and cancel.") +
    u3Alg(steps) +
    "The coefficient of \\(" + v + "\\) in the expansion is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "coef", P: A, Q: B, v: v });
});

/* ============ 8. verify by substitution (3.5, L2, num) ============ */
E("u3-verify-sub", 3, ["3.5"], 1, "gen", function () {
  var b = u3Nz(-8, 8), c = u3Nz(-8, 8);
  var B = b + c, C = b * c;
  var bad = Math.random() < 0.5, Bp = B, Cp = C;
  if (bad) {
    if (Math.random() < 0.5) Bp = B + pick([-2, -1, 1, 2]); else Cp = C + pick([-3, -1, 1, 3]);
  }
  var v = ri(-3, 5);
  var lhs = (v + b) * (v + c), rhs = v * v + Bp * v + Cp;
  var fac1 = u3Par([1, b], "x"), fac2 = u3Par([1, c], "x");
  var claim = u3PC([1, Bp, Cp], "x");
  var prompt = "A student claims that \\(" + fac1 + fac2 + " = " + claim + "\\). To test the claim, substitute \\(x = " + v + "\\). What value does the left side, \\(" + fac1 + fac2 + "\\), take when \\(x = " + v + "\\)?";
  var sub1 = "(" + v + (b < 0 ? " - " + (-b) : " + " + b) + ")(" + v + (c < 0 ? " - " + (-c) : " + " + c) + ")";
  var sol = "Substitute \\(x = " + v + "\\) into both sides of the claim." +
    u3Alg(["\\text{left side} &= " + sub1 + " = " + lhs,
           "\\text{right side} &= " + v + "^2 + " + Bp + "(" + v + ") + " + Cp + " = " + rhs]) +
    (bad
      ? "The two values differ, so the claim does not hold. "
      : "The two values agree, which supports the claim (one value is a check, not a proof). ") +
    "The value of the left side is **" + lhs + "**.";
  return numq(prompt, lhs, 0.01, sol, { t: "verify", b: b, c: c, v: v, rhs: rhs });
});

/* ============ 9. greatest common factor (3.10, L2) ============ */
E("u3-gcf", 3, ["3.10"], 2, "gen", function () {
  var gp = ri(0, 2), gn, tries = 0;
  if (gp === 0) gn = ri(2, 7); else gn = pick([1, 2, 3, 4, 5, 6]);
  var A = ri(1, 6), B = u3Nz(-6, 6), C = u3Nz(-6, 6);
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && tries < 60) { tries++; A = ri(1, 6); B = u3Nz(-6, 6); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw = gRaw + u3Par(quo, "x");
  var cands = [], seen = {};
  function addCand(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  /* partial factor: only part of the common factor is removed */
  if (gn > 1) {
    var divs = [];
    for (var d = 1; d < gn; d++) if (gn % d === 0) divs.push(d);
    var dv = pick(divs), sc = gn / dv;
    addCand(u3Str([[dv, gp, 0]]) + u3Par([A * sc, B * sc, C * sc], "x"));
  } else {
    addCand(u3Str([[1, gp - 1, 0]]) + "(" + u3Str([[A, 3, 0], [B, 2, 0], [C, 1, 0]]) + ")");
  }
  /* quotient slips: one term not divided correctly */
  addCand(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addCand(gRaw + u3Par([A, B, gn * C], "x"));
  addCand(gRaw + u3Par([A, B, -C], "x"));
  addCand(gRaw + u3Par([A + 1, B, C], "x"));
  var prompt = "Determine the greatest common factor of the terms of \\(" + polyRaw + "\\), and express the polynomial in factored form.";
  var sol = "Every term contains the factor \\(" + gRaw + "\\). Dividing each term by \\(" + gRaw + "\\) leaves \\(" + u3PC(quo, "x") + "\\), whose terms share no further common factor." +
    u3Alg([polyRaw + " &= " + keyRaw]) +
    "In factored form, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});

/* ============ 10. factor a monic trinomial, larger constant (3.12, L2, num) ============ */
E("u3-factor-monic", 3, ["3.12"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var r = u3Nz(-9, 9), s = u3Nz(-9, 9), guard = 0;
  while (r === s && guard < 40) { guard++; s = u3Nz(-9, 9); }
  var B = r + s, C = r * s;
  var poly = u3PC([1, B, C], v);
  var facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
  var ans = Math.max(r, s);
  var prompt = "When the trinomial \\(" + poly + "\\) is factored as a product of two binomials, the two constant terms are two numbers. What is the larger of those two numbers?";
  var sol = "Find two numbers that multiply to \\(" + C + "\\) and add to \\(" + B + "\\): the numbers are \\(" + Math.min(r, s) + "\\) and \\(" + Math.max(r, s) + "\\)." +
    u3Alg([poly + " &= " + u3FacRaw("", facs, v)]) +
    "The larger of the two constant terms is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "pair", r: r, s: s, B: B, C: C });
});

/* ============ 11. factor a non-monic trinomial (3.12, L2) ============ */
E("u3-factor-hard", 3, ["3.12"], 2, "gen", function () {
  var pairs = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 2], [1, 4], [4, 1], [2, 3], [3, 2], [1, 5], [5, 1], [1, 6], [6, 1]];
  var pr, b, d, prod, tries = 0;
  do {
    tries++;
    pr = pick(pairs); b = u3Nz(-6, 6); d = u3Nz(-6, 6);
    prod = u3Conv([pr[0], b], [pr[1], d]);
  } while ((u3GCD3(prod[0], Math.abs(prod[1]), Math.abs(prod[2])) !== 1 || prod[1] === 0) && tries < 80);
  var facs = [[pr[0], b], [pr[1], d]];
  facs.sort(function (f, g) { if (f[0] !== g[0]) return g[0] - f[0]; return f[1] - g[1]; });
  var keyRaw = u3FacRaw("", facs, "x");
  var poly = u3PC(prod, "x");
  var prompt = "Factor the trinomial \\(" + poly + "\\) completely.";
  var sol = "Look for two binomials \\((px + q)(rx + s)\\) with \\(pr = " + prod[0] + "\\), \\(qs = " + prod[2] + "\\) and cross sum \\(ps + qr = " + prod[1] + "\\). The pair that works is shown, and multiplying it back out returns the trinomial." +
    u3Alg([poly + " &= " + keyRaw,
           keyRaw + " &= " + u3StrSeq(u3Mul(u3TermsOf(facs[0], "x"), u3TermsOf(facs[1], "x"))),
           "&= " + poly]) +
    "The factored form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3FacDistr("", facs, "x", prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: "x" });
});

/* ============ 12. express as a product of factors, verified (3.9, 3.11, L2) ============ */
E("u3-factor-product", 3, ["3.9", "3.11"], 2, "gen", function () {
  var mode = pick(["bb", "mt"]);
  if (mode === "bb") {
    var a = ri(2, 4), b = u3Nz(-6, 6), c = u3Nz(-6, 6), prod, tries = 0;
    do { tries++; b = u3Nz(-6, 6); c = u3Nz(-6, 6); prod = u3Conv([a, b], [1, c]); }
    while (u3GCD3(prod[0], Math.abs(prod[1]), Math.abs(prod[2])) !== 1 && tries < 80);
    var facs = [[a, b], [1, c]];
    var keyRaw = u3FacRaw("", facs, "x");
    var poly = u3PC(prod, "x");
    var sol = "Find the two binomials whose product gives the polynomial, then verify by multiplying the factors back out." +
      u3Alg([poly + " &= " + keyRaw,
             keyRaw + " &= " + u3StrSeq(u3Mul(u3TermsOf(facs[0], "x"), u3TermsOf(facs[1], "x"))),
             "&= " + poly]) +
      "As a product of its factors, the polynomial is **" + u3M(keyRaw) + "**.";
    return mcq("Express the polynomial \\(" + poly + "\\) as a product of its factors.",
      u3M(keyRaw), u3FacDistr("", facs, "x", prod, 3), sol,
      { t: "fac", g: "", parts: facs, v: "x" });
  }
  var gn = ri(2, 5), gp = ri(1, 2);
  var A = ri(1, 3), B = u3Nz(-5, 5), C = u3Nz(-6, 6), t2 = 0;
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && t2 < 60) { t2++; A = ri(1, 3); B = u3Nz(-5, 5); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw2 = gRaw + u3Par(quo, "x");
  var prodTerms = u3Mul([[gn, gp, 0]], u3TermsOf(quo, "x"));
  var cands = [], seen = {};
  function addC(s) { if (s !== keyRaw2 && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  addC(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addC(gRaw + u3Par([A, B, -C], "x"));
  addC(u3Str([[gn, gp + 1, 0]]) + u3Par(quo, "x"));
  addC(gRaw + u3Par([A + 1, B, C], "x"));
  var sol2 = "The terms share the factor \\(" + gRaw + "\\). Removing it leaves \\(" + u3PC(quo, "x") + "\\). Verify by multiplying the factors back out." +
    u3Alg([keyRaw2 + " &= " + u3StrSeq(prodTerms), "&= " + polyRaw]) +
    "As a product of its factors, the polynomial is **" + u3M(keyRaw2) + "**.";
  return mcq("Express the polynomial \\(" + polyRaw + "\\) as a product of its factors.",
    u3M(keyRaw2), shuffle(cands).slice(0, 3), sol2,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});

/* ============ 13. factor completely, common factor first (3.9, 3.10, L2) ============ */
E("u3-factor-gcf-first", 3, ["3.9", "3.10"], 2, "gen", function () {
  var g0 = ri(2, 6);
  var mode = pick(["tri", "tri", "ds"]);
  var keyRaw, poly, quoRaw, quoCoeffs, facs, note;
  if (mode === "tri") {
    var r = u3Nz(-7, 7), s = u3Nz(-7, 7);
    var B = r + s, C = r * s;
    var prod = [g0, g0 * B, g0 * C];
    poly = u3PC(prod, "x");
    quoCoeffs = [1, B, C];
    quoRaw = u3PC(quoCoeffs, "x");
    facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
    keyRaw = g0 + u3FacRaw("", facs, "x");
    note = "Inside the brackets, the two numbers multiply to \\(" + C + "\\) and add to \\(" + B + "\\)";
  } else {
    var a = ri(1, 3), b = ri(1, 7);
    poly = u3PC([g0 * a * a, 0, -g0 * b * b], "x");
    quoCoeffs = [a * a, 0, -b * b];
    quoRaw = u3PC(quoCoeffs, "x");
    facs = [[a, b], [a, -b]];
    keyRaw = g0 + u3FacRaw("", facs, "x");
    note = "Inside the brackets is a difference of squares, \\((" + a + "x)^2 - " + b + "^2\\)";
  }
  var cands = [], seen = {};
  function addC(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  addC(g0 + "(" + quoRaw + ")");
  u3FacDistr(String(g0), facs, "x", mode === "tri" ? [1, facs[0][1] + facs[1][1], facs[0][1] * facs[1][1]] : u3FacExpand(facs), 3)
    .forEach(function (s) { addC(s.replace(/^\\\(|\\\)$/g, "")); });
  var divs = [];
  for (var d = 1; d < g0; d++) if (g0 % d === 0) divs.push(d);
  if (divs.length) {
    var dv2 = pick(divs), sc2 = g0 / dv2;
    addC(dv2 + "(" + u3PC(quoCoeffs.map(function (x) { return x * sc2; }), "x") + ")");
  }
  var prompt = "Factor the polynomial \\(" + poly + "\\) completely.";
  var sol = "First remove the greatest common factor, \\(" + g0 + "\\), then factor what remains. " + note + "." +
    u3Alg([poly + " &= " + g0 + "(" + quoRaw + ")", "&= " + keyRaw]) +
    "Factored completely, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: String(g0), parts: facs, v: "x" });
});

/* ============ 14. difference of squares (3.14, L2) ============ */
E("u3-diff-squares", 3, ["3.14"], 1, "gen", function () {
  var mode = pick(["pure", "pure", "twovar"]);
  if (mode === "twovar") {
    var a = ri(1, 4), b = ri(1, 6);
    var polyTerms = [[a * a, 2, 0], [-b * b, 0, 2]];
    var poly = u3Str(polyTerms);
    var f1 = u3Str([[a, 1, 0], [b, 0, 1]]), f2 = u3Str([[a, 1, 0], [-b, 0, 1]]);
    var keyRaw = "(" + f1 + ")(" + f2 + ")";
    var P = [[a, 1, 0], [b, 0, 1]], Q = [[a, 1, 0], [-b, 0, 1]];
    var cands = [], seen = {};
    function addT(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
    addT("(" + f2 + ")(" + f2 + ")");
    addT("(" + f1 + ")(" + f1 + ")");
    addT("(" + u3Str([[a, 1, 0], [b * b, 0, 1]]) + ")(" + u3Str([[a, 1, 0], [-b * b, 0, 1]]) + ")");
    addT("(" + u3Str([[1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[1, 1, 0], [-b, 0, 1]]) + ")");
    addT("(" + u3Str([[a, 1, 0], [b + 1, 0, 1]]) + ")(" + f2 + ")");
    addT("(" + u3Str([[a + 1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[a + 1, 1, 0], [-b, 0, 1]]) + ")");
    var solT = "Each term is a perfect square: \\(" + poly + " = (" + a + "x)^2 - (" + b + "y)^2\\). A difference of squares factors into a sum and a difference of the two square roots. As a trinomial the middle term is \\(0\\): a pair of numbers multiplying to the negative constant term and adding to \\(0\\) must be opposites, which is why the two factors differ only in sign." +
      u3Alg([poly + " &= " + keyRaw]) +
      "The factored form is **" + u3M(keyRaw) + "**.";
    return mcq("Factor the polynomial \\(" + poly + "\\).",
      u3M(keyRaw), shuffle(cands).slice(0, 3), solT, { t: "facT", P: P, Q: Q, poly: poly });
  }
  var v = pick(["x", "y"]);
  var a2 = ri(1, 5), b2 = ri(1, 9);
  var prod = [a2 * a2, 0, -b2 * b2];
  var poly2 = u3PC(prod, v);
  var facs = [[a2, b2], [a2, -b2]];
  var keyRaw2 = u3FacRaw("", facs, v);
  var sqTerm = a2 === 1 ? v + "^2" : (a2 * a2) + v + "^2";
  var sol = "Each term is a perfect square: \\(" + poly2 + " = (" + a2 + v + ")^2 - " + b2 + "^2\\). Written as a trinomial, this is \\(" + sqTerm + " + 0" + v + " - " + (b2 * b2) + "\\), the case where the middle coefficient is \\(0\\). A factor pair of \\(-" + (b2 * b2) + "\\) that adds to \\(0\\) must consist of opposites, \\(" + b2 + "\\) and \\(-" + b2 + "\\), so the factors differ only in sign." +
    u3Alg([poly2 + " &= " + keyRaw2]) +
    "The factored form is **" + u3M(keyRaw2) + "**.";
  return mcq("Factor the polynomial \\(" + poly2 + "\\).",
    u3M(keyRaw2), u3FacDistr("", facs, v, prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: v });
});

/* ============ 15. perfect-square trinomial, find k (3.12, L2, num) ============ */
E("u3-perfect-square", 3, ["3.12"], 1, "gen", function () {
  var v = pick(["x", "y"]);
  var a = ri(1, 6), b = ri(1, 10), s = pick([1, -1]);
  var coeffs = [a * a, 2 * a * b * s, b * b];
  var poly = u3PC(coeffs, v);
  var facRaw = u3Par([a, s * b], v) + "^2";
  var prompt = "The trinomial \\(" + poly + "\\) is a perfect-square trinomial. It factors as the square of a binomial, \\((p" + v + " + k)^2\\), for some numbers \\(p\\) and \\(k\\). What is the value of \\(k\\)?";
  var sol = "The first term is \\((" + a + v + ")^2\\), so \\(p = " + a + "\\). The last term is \\(" + b + "^2\\), and the middle term checks: \\(2 \\times " + a + " \\times " + b + " = " + (2 * a * b) + "\\), with the sign of the middle term giving the sign of \\(k\\)." +
    u3Alg([poly + " &= " + facRaw]) +
    "The value of \\(k\\) is **" + (s * b) + "**.";
  return numq(prompt, s * b, 0.01, sol, { t: "pst", a: a, b: b, s: s });
});

/* ============ 16. generalize a multiplication strategy (3.6, L3, var) ============ */
E("u3-strategy", 3, ["3.6"], 3, "var", varset([
  function () {
    var key = "Multiply each term of the first binomial by each term of the second binomial, then combine like terms.";
    return mcq("Which statement correctly generalizes how to multiply two binomials?",
      key,
      ["Multiply each term of the first binomial by the matching term of the second binomial, then combine like terms.",
       "Multiply the first terms together and the last terms together, then add the two products together.",
       "Add each term of the first binomial to each term of the second binomial, then combine like terms."],
      "Every term of one binomial must meet every term of the other, giving four partial products before like terms are combined; matching terms only, or using only the first and last products, misses the cross products. The correct generalization is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Six, because each of the 2 terms of the binomial multiplies each of the 3 terms of the trinomial.";
    return mcq("A student multiplies a binomial by a trinomial. How many partial products are there before like terms are combined?",
      key,
      ["Five, because the number of partial products is the sum of the numbers of terms in the factors, 2 + 3.",
       "Six, because the binomial contributes 3 partial products and the trinomial contributes 3 more.",
       "Nine, because each of the 3 terms of the trinomial multiplies each of the 3 terms of the trinomial."],
      "Count the pairings: each of the 2 terms of the binomial pairs with each of the 3 terms of the trinomial, giving \\(2 \\times 3 = 6\\) partial products. The correct count is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "FOIL names pairings for two binomials only; the trinomial's third term also has to be multiplied by both terms of the binomial.";
    return mcq("Why does the FOIL method, on its own, not multiply \\((x + 2)(x^2 + 3x + 4)\\) completely?",
      key,
      ["FOIL names pairings for two binomials only; the trinomial must be factored into binomials before any multiplication can begin.",
       "FOIL works only when both factors have positive terms; the trinomial's terms must be rearranged into the right order first.",
       "FOIL gives the outer and inner products twice, so two of the six partial products have to be discarded at the end of the work."],
      "FOIL is a checklist for the four pairings of two binomials. With a trinomial factor there are six pairings, and the two extra ones involve the third term. The reason is **" + key + "**",
      { t: "stmt", ans: key });
  },
  function () {
    var key = "Multiply the monomial by every term of the polynomial, then combine any like terms in the result.";
    return mcq("Which strategy multiplies a monomial by a polynomial of any number of terms?",
      key,
      ["Multiply the monomial by the first and last terms of the polynomial, then combine any like terms.",
       "Multiply the monomial by the term with the highest degree, then add the remaining terms unchanged.",
       "Add the monomial to every term of the polynomial, then combine any like terms in the result."],
      "Distribution has no term limit: the monomial multiplies every term of the polynomial, however many there are, and like terms are combined afterwards. The strategy is **" + key + "**",
      { t: "stmt", ans: key });
  }
]));

/* ============ 17. error in a polynomial multiplication (3.7, L3, var) ============ */
E("u3-mult-error", 3, ["3.7"], 3, "var", varset([
  function () {
    var key = "\\(x^2 + 8x + 15\\)";
    return mcq("A student expands \\((x + 3)(x + 5)\\) as shown. The work contains one error. \\[ (x + 3)(x + 5) = x^2 + 15 \\] What is the correct product?",
      key,
      ["\\(x^2 + 15\\)", "\\(x^2 + 5x + 15\\)", "\\(x^2 + 8x + 8\\)"],
      "The error: only the first and last terms were multiplied, so the two cross products are missing. Correct work:" +
      u3Alg(["(x + 3)(x + 5) &= x^2 + 5x + 3x + 15", "&= x^2 + 8x + 15"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [3, 0, 0]], Q: [[1, 1, 0], [5, 0, 0]] });
  },
  function () {
    var key = "\\(2x^2 + 9x + 4\\)";
    return mcq("A student expands \\((2x + 1)(x + 4)\\) as shown. The work contains one error. \\[ (2x + 1)(x + 4) = 2x^2 + 4x + x + 4 = 2x^2 + 5x + 4 \\] What is the correct product?",
      key,
      ["\\(2x^2 + 5x + 4\\)", "\\(2x^2 + 9x + 5\\)", "\\(2x^2 + 6x + 4\\)"],
      "The error is in the outer product: \\(2x \\times 4 = 8x\\), not \\(4x\\). Correct work:" +
      u3Alg(["(2x + 1)(x + 4) &= 2x^2 + 8x + x + 4", "&= 2x^2 + 9x + 4"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[2, 1, 0], [1, 0, 0]], Q: [[1, 1, 0], [4, 0, 0]] });
  },
  function () {
    var key = "\\(x^2 + 4x - 12\\)";
    return mcq("A student expands \\((x - 2)(x + 6)\\) as shown. The work contains one error. \\[ (x - 2)(x + 6) = x^2 + 6x - 2x - 12 = x^2 + 4x + 12 \\] What is the correct product?",
      key,
      ["\\(x^2 + 4x + 12\\)", "\\(x^2 - 4x - 12\\)", "\\(x^2 + 8x - 12\\)"],
      "The error is in the last step: the constant term \\(-12\\) changed sign while the \\(x\\) terms were combined. Correct work:" +
      u3Alg(["(x - 2)(x + 6) &= x^2 + 6x - 2x - 12", "&= x^2 + 4x - 12"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [-2, 0, 0]], Q: [[1, 1, 0], [6, 0, 0]] });
  },
  function () {
    var key = "\\(3x^3 + 6x^2 + 12x\\)";
    return mcq("A student expands \\(3x(x^2 + 2x + 4)\\) as shown. The work contains one error. \\[ 3x(x^2 + 2x + 4) = 3x^3 + 6x^2 + 4 \\] What is the correct product?",
      key,
      ["\\(3x^3 + 6x^2 + 4\\)", "\\(3x^3 + 6x^2 + 12\\)", "\\(3x^3 + 2x^2 + 12x\\)"],
      "The error: the last term was never multiplied by \\(3x\\); it should become \\(3x \\times 4 = 12x\\). Correct work:" +
      u3Alg(["3x(x^2 + 2x + 4) &= 3x^3 + 6x^2 + 12x"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[3, 1, 0]], Q: [[1, 2, 0], [2, 1, 0], [4, 0, 0]] });
  },
  function () {
    var key = "\\(x^2 + 8x + 16\\)";
    return mcq("A student expands \\((x + 4)^2\\) as shown. The work contains one error. \\[ (x + 4)^2 = x^2 + 16 \\] What is the correct product?",
      key,
      ["\\(x^2 + 16\\)", "\\(x^2 + 4x + 16\\)", "\\(x^2 + 8x + 8\\)"],
      "The error: squaring a binomial is not squaring each term separately; the cross term \\(2 \\times x \\times 4 = 8x\\) is missing. Correct work:" +
      u3Alg(["(x + 4)^2 &= x^2 + 4x + 4x + 16", "&= x^2 + 8x + 16"]) +
      "The correct product is **" + key + "**.",
      { t: "expand", P: [[1, 1, 0], [4, 0, 0]], Q: [[1, 1, 0], [4, 0, 0]] });
  }
]));

/* ============ 18. error in a polynomial factorization (3.13, L3, var) ============ */
E("u3-factor-error", 3, ["3.13"], 3, "var", varset([
  function () {
    var key = "\\((x + 3)(x + 4)\\)";
    return mcq("A student factors \\(x^2 + 7x + 12\\) as shown. The work contains one error. \\[ x^2 + 7x + 12 = (x + 6)(x + 2) \\] What is the correct factorization?",
      key,
      ["\\((x + 6)(x + 2)\\)", "\\((x + 1)(x + 12)\\)", "\\((x + 2)(x + 5)\\)"],
      "The error: \\(6\\) and \\(2\\) multiply to \\(12\\) but add to \\(8\\), not \\(7\\). The pair that multiplies to \\(12\\) and adds to \\(7\\) is \\(3\\) and \\(4\\)." +
      u3Alg(["x^2 + 7x + 12 &= (x + 3)(x + 4)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, 3], [1, 4]], v: "x" });
  },
  function () {
    var key = "\\((x - 2)(x - 3)\\)";
    return mcq("A student factors \\(x^2 - 5x + 6\\) as shown. The work contains one error. \\[ x^2 - 5x + 6 = (x - 1)(x - 6) \\] What is the correct factorization?",
      key,
      ["\\((x - 1)(x - 6)\\)", "\\((x + 2)(x + 3)\\)", "\\((x - 1)(x - 5)\\)"],
      "The error: \\(-1\\) and \\(-6\\) multiply to \\(6\\) but add to \\(-7\\), not \\(-5\\). The pair that multiplies to \\(6\\) and adds to \\(-5\\) is \\(-2\\) and \\(-3\\)." +
      u3Alg(["x^2 - 5x + 6 &= (x - 2)(x - 3)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, -2], [1, -3]], v: "x" });
  },
  function () {
    var key = "\\((2x + 1)(x + 3)\\)";
    return mcq("A student factors \\(2x^2 + 7x + 3\\) as shown. The work contains one error. \\[ 2x^2 + 7x + 3 = (2x + 3)(x + 1) \\] What is the correct factorization?",
      key,
      ["\\((2x + 3)(x + 1)\\)", "\\((2x + 3)(x + 3)\\)", "\\((2x + 1)(x + 1)\\)"],
      "The error: the student's factors expand to \\(2x^2 + 5x + 3\\); the cross sum is \\(2 \\times 1 + 3 \\times 1 = 5\\), not \\(7\\). Swapping the constants gives a cross sum of \\(2 \\times 3 + 1 \\times 1 = 7\\)." +
      u3Alg(["2x^2 + 7x + 3 &= (2x + 1)(x + 3)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[2, 1], [1, 3]], v: "x" });
  },
  function () {
    var key = "\\((x + 4)(x - 4)\\)";
    return mcq("A student factors \\(x^2 - 16\\) as shown. The work contains one error. \\[ x^2 - 16 = (x - 4)(x - 4) \\] What is the correct factorization?",
      key,
      ["\\((x - 4)(x - 4)\\)", "\\((x + 4)(x + 4)\\)", "\\((x - 2)(x - 8)\\)"],
      "The error: \\((x - 4)(x - 4)\\) expands to \\(x^2 - 8x + 16\\), which has an \\(x\\) term. A difference of squares needs one factor with \\(+4\\) and one with \\(-4\\), so the \\(x\\) terms cancel." +
      u3Alg(["x^2 - 16 &= (x + 4)(x - 4)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "", parts: [[1, 4], [1, -4]], v: "x" });
  },
  function () {
    var key = "\\(4x(x + 2)\\)";
    return mcq("A student factors \\(4x^2 + 8x\\) as shown. The work contains one error. \\[ 4x^2 + 8x = 4x(x + 8) \\] What is the correct factorization?",
      key,
      ["\\(4x(x + 8)\\)", "\\(4(x^2 + 8x)\\)", "\\(2x(2x + 8)\\)"],
      "The error: the second term inside the brackets was not divided by the common factor; \\(8x \\div 4x = 2\\), not \\(8\\)." +
      u3Alg(["4x^2 + 8x &= 4x(x + 2)"]) +
      "The correct factorization is **" + key + "**.",
      { t: "fac", g: "4x", parts: [[1, 2]], v: "x" });
  }
]));

/* ============ 19. find all k that make a trinomial factorable (3.12, L2) ============ */
/* The reverse factoring question: instead of factoring a given
   trinomial, find every integer k that would let one factor. The
   constant (or the middle coefficient's partner) is built from
   factor pairs, so the key is a set of k values. Four arms: k in
   the middle with a positive constant, k in the middle with a
   negative constant, k as the constant with only positive values
   possible to list (unrestricted, that set is infinite), and a
   positive-values-only variant of the middle arms. Parameters
   are bounded so the key set stays between two and six values:
   constants have two or three factor pairs. Distractors are
   wrong in one identifiable way each: one factor pair missed,
   a sign or restriction error, or a set built from a bogus
   split of the constant. */
E("u3-factorable-k", 3, ["3.12"], 2, "gen", function () {
  function pairList(P) { return P.map(function (f) { return "(" + f[0] + ", " + f[1] + ")"; }).join(", "); }
  function draw(arm) {
    var prompt, sol, sig, key, dMiss, dSign, dExtra;
    if (arm === "mid") {
      var c = ri(6, 48), P = u3PairsOf(c);
      if (P.length < 2 || P.length > 3) return null;
      var sums = P.map(function (f) { return f[0] + f[1]; });
      key = []; sums.forEach(function (s) { key.push(s, -s); });
      var last = P[P.length - 1], sl = last[0] + last[1];
      dMiss = key.filter(function (v) { return v !== sl && v !== -sl; });
      dSign = sums.slice();
      dExtra = key.concat([c + 2, -(c + 2)]);
      prompt = "Find all integer values of \\(k\\) for which the trinomial \\(x^2 + kx + " + c + "\\) is factorable over the integers.";
      sol = "The trinomial factors over the integers exactly when it splits as \\((x + p)(x + q)\\) with \\(pq = " + c + "\\) and \\(p + q = k\\). The factor pairs of \\(" + c + "\\) are " + pairList(P) + ". Their sums are " + sums.join(", ") + ", and taking both members of a pair negative gives the further sums " + sums.map(function (s) { return -s; }).join(", ") + ". No other pair of integers has product \\(" + c + "\\), so these are all the possible values of \\(k\\). The values of \\(k\\) are **" + u3M(u3SetRaw(key)) + "**.";
      sig = { t: "kfac", arm: "mid", c: c };
    } else if (arm === "midneg") {
      var m = ri(6, 48), P2 = u3PairsOf(m);
      if (P2.length < 2 || P2.length > 3) return null;
      var diffs = P2.map(function (f) { return f[1] - f[0]; });
      var hasZero = diffs.indexOf(0) >= 0;
      key = [];
      P2.forEach(function (f) { var d = f[1] - f[0]; if (d > 0) { key.push(d, -d); } else { key.push(0); } });
      var nz = P2.filter(function (f) { return f[1] > f[0]; });
      var dl = nz[nz.length - 1][1] - nz[nz.length - 1][0];
      dMiss = key.filter(function (v) { return v !== dl && v !== -dl; });
      dSign = []; P2.forEach(function (f) { var s = f[0] + f[1]; dSign.push(s, -s); });
      dExtra = hasZero ? key.filter(function (v) { return v !== 0; }) : key.concat([0]);
      prompt = "Find all integer values of \\(k\\) for which the trinomial \\(x^2 + kx - " + m + "\\) is factorable over the integers.";
      sol = "The trinomial factors over the integers exactly when it splits as \\((x + p)(x - q)\\) with \\(pq = " + m + "\\), and then \\(k = p - q\\). The factor pairs of \\(" + m + "\\) are " + pairList(P2) + ", and their differences \\(q - p\\) are " + diffs.join(", ") + ". Interchanging the two members of a pair changes the sign of the difference, which gives the negative values of \\(k\\) as well." +
        (hasZero ? " The pair with equal members has difference \\(0\\), so \\(k = 0\\) is included." : "") +
        " The values of \\(k\\) are **" + u3M(u3SetRaw(key)) + "**.";
      sig = { t: "kfac", arm: "midneg", c: -m };
    } else if (arm === "const") {
      var b = ri(4, 10), prods = [], prs = [];
      for (var p = 1; p < b; p++) { prods.push(p * (b - p)); if (p <= b - p) prs.push([p, b - p]); }
      key = u3SetArr(prods);
      var p0 = Math.floor(b / 2), prod0 = p0 * (b - p0);
      dMiss = key.filter(function (v) { return v !== prod0; });
      dSign = key.concat([0]);
      dExtra = key.concat([-(b + 1)]);
      prompt = "Find all positive integer values of \\(k\\) for which the trinomial \\(x^2 + " + b + "x + k\\) is factorable over the integers.";
      sol = "The trinomial factors over the integers exactly when it splits as \\((x + p)(x + q)\\) with \\(p + q = " + b + "\\) and \\(pq = k\\). Because \\(k\\) must be positive, \\(p\\) and \\(q\\) have the same sign, and because their sum is the positive number \\(" + b + "\\), both are positive. The pairs of positive integers with sum \\(" + b + "\\) are " + pairList(prs) + ", and their products are " + key.join(", ") + ". The positive integer values of \\(k\\) are **" + u3M(u3SetRaw(key)) + "**.";
      sig = { t: "kfac", arm: "const", b: b };
    } else {
      var sgn = pick([1, -1]), m2 = ri(6, 36), c2 = sgn * m2, P3 = u3PairsOf(m2);
      if (P3.length < 2 || P3.length > 3) return null;
      var contribs = P3.map(function (f) {
        return c2 > 0 ? { f: f, into: f[0] + f[1], out: f[1] - f[0] } : { f: f, into: f[1] - f[0], out: f[0] + f[1] };
      }).filter(function (x) { return x.into > 0; });
      key = u3SetArr(contribs.map(function (x) { return x.into; }));
      if (key.length < 2 || key.length > 3) return null;
      var lastC = contribs[contribs.length - 1];
      dMiss = key.filter(function (v) { return v !== lastC.into; });
      var byInto = contribs.slice().sort(function (x, y) { return x.into - y.into; }), swapped = null;
      for (var i = 0; i < byInto.length && !swapped; i++) {
        if (key.indexOf(byInto[i].out) < 0 && (c2 < 0 || byInto[i].out > 0)) swapped = byInto[i];
      }
      if (!swapped) return null;
      dSign = key.filter(function (v) { return v !== swapped.into; }).concat([swapped.out]);
      dExtra = key.concat([c2 > 0 ? m2 + 2 : m2]);
      prompt = "Find all positive integer values of \\(k\\) for which the trinomial \\(x^2 + kx " + (c2 > 0 ? "+ " + m2 : "- " + m2) + "\\) is factorable over the integers.";
      sol = (c2 > 0
        ? "The trinomial factors over the integers exactly when \\(k\\) is the sum of a factor pair of \\(" + m2 + "\\) or the negative of such a sum, since the two numbers in a pair are either both positive or both negative. The factor pairs of \\(" + m2 + "\\) are " + pairList(P3) + ", with sums " + P3.map(function (f) { return f[0] + f[1]; }).join(", ") + ". Only the positive sums answer the question."
        : "The trinomial factors over the integers exactly when it splits as \\((x + p)(x - q)\\) with \\(pq = " + m2 + "\\) and \\(k = p - q\\), or with the factors interchanged, which negates \\(k\\). The factor pairs of \\(" + m2 + "\\) are " + pairList(P3) + ", with differences " + P3.map(function (f) { return f[1] - f[0]; }).join(", ") + ". Only the positive differences answer the question.") +
        " The positive integer values of \\(k\\) are **" + u3M(u3SetRaw(key)) + "**.";
      sig = { t: "kfac", arm: "posonly", c: c2 };
    }
    var raws = [u3SetRaw(key), u3SetRaw(dMiss), u3SetRaw(dSign), u3SetRaw(dExtra)];
    if (new Set(raws).size !== 4) return null;
    return { prompt: prompt, sol: sol, sig: sig, key: u3M(raws[0]), distr: [u3M(raws[1]), u3M(raws[2]), u3M(raws[3])] };
  }
  var arm = pick(["mid", "mid", "midneg", "midneg", "const", "posonly"]);
  var drawn = null, guard = 0;
  while (!drawn && guard < 80) { guard++; drawn = draw(arm); }
  return mcq(drawn.prompt, drawn.key, drawn.distr, drawn.sol, drawn.sig);
});

/* ---- Prior knowledge tranche entries (Nov 15, 2026) ----
   Borrowed verbatim from the feeder banks named in each entry's
   pkSrc (see the metadata pass at the end of this file), under the
   Math 1201 PK tranche spec. */
E("u3-pk-degree", 3, ["3.1"], 1, "gen", function(){
  var form=ri(0,2),a=0,b=0,c=0,deg=0;
  if(form===0){a=u4nz(-6,6);b=ri(-6,6);c=ri(-6,6);deg=2;}
  else if(form===1){b=u4nz(-8,8);c=ri(-8,8);deg=1;}
  else{c=u4nz(-9,9);deg=0;}
  var terms=(a!==0?1:0)+(b!==0?1:0)+(c!==0?1:0);
  var lead=a!==0?a:(b!==0?b:c);
  var cands=[{t:fmt(deg+1),fb:"That is one more than the highest power of x."},{t:fmt(terms),fb:"That counts the terms, not the highest power."},{t:fmt(Math.abs(lead)),fb:"That is a coefficient, not the highest power."},{t:fmt(deg+2),fb:"That is higher than any power in the expression."},{t:fmt(deg+3),fb:"That is higher than any power in the expression."}];
  var ds=u4pick3(fmt(deg),cands);
  var sol="The degree is the highest power of \\(x\\) in "+u4m(a,b,c)+". The highest power here gives degree <b>"+fmt(deg)+"</b>.";
  return mcq("What is the degree of "+u4m(a,b,c)+"?",{t:fmt(deg),fb:"Correct: the degree is the highest power of x."},ds,sol,{mode:"degree",form:form,a:a,b:b,c:c});
}, ["Look for the highest power of x in the expression.", "Find the term with the largest exponent; that exponent is the degree."]);
E("u3-pk-parts", 3, ["3.1"], 1, "gen", function(){
  var a=u4nz(-8,8),b=u4nz(-9,9),c=u4nz(-9,9);
  var mode=pick(["terms","coeffx","coeffx2","const"]);
  var qtext="",ans=0;
  if(mode==="terms"){qtext="How many terms does "+u4m(a,b,c)+" have?";ans=3;}
  else if(mode==="coeffx"){qtext="What is the coefficient of the \\(x\\) term in "+u4m(a,b,c)+"?";ans=b;}
  else if(mode==="coeffx2"){qtext="What is the coefficient of the \\(x^{2}\\) term in "+u4m(a,b,c)+"?";ans=a;}
  else{qtext="What is the constant term in "+u4m(a,b,c)+"?";ans=c;}
  var cands=[{t:fmt(a),fb:"That is the coefficient of the x squared term."},{t:fmt(b),fb:"That is the coefficient of the x term."},{t:fmt(c),fb:"That is the constant term."},{t:fmt(3),fb:"That is the number of terms."},{t:fmt(ans+1),fb:"That is one more than the value asked for."},{t:fmt(ans-1),fb:"That is one less than the value asked for."},{t:fmt(-ans),fb:"Watch the sign: that value has the wrong sign."},{t:fmt(ans+2),fb:"That is two more than the value asked for."}];
  var ds=u4pick3(fmt(ans),cands);
  var label=mode==="terms"?"number of terms":(mode==="coeffx"?"coefficient of the x term":(mode==="coeffx2"?"coefficient of the x squared term":"constant term"));
  var sol="In "+u4m(a,b,c)+", the "+label+" is <b>"+fmt(ans)+"</b>.";
  return mcq(qtext,{t:fmt(ans),fb:"Correct: you read that value straight from the expression."},ds,sol,{mode:mode,a:a,b:b,c:c});
}, ["Read the value straight from the written expression; no simplifying is needed.", "Point to the part named in the question, then read off its value."]);
E("u3-pk-add", 3, ["3.4"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?ri(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1+a2,sb=b1+b2,sc=c1+c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(sa,sb,c1-c2),fb:"The constants were subtracted; addition keeps both signs as they are."},{t:u4m(sa,b1-b2,sc),fb:"The x coefficients were subtracted; addition keeps both signs as they are."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."},{t:u4m(sa+a2,sb,sc),fb:"The x squared terms were handled twice; add each pair once."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Group the like terms: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+") &= ("+u4expr([[a1,"x^{2}"],[a2,"x^{2}"],[b1,"x"],[b2,"x"]])+")+("+u4expr([[c1,""],[c2,""]])+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";
    return mcq("Add: \\(("+u4p(a1,b1,c1)+")+("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: like terms are added pair by pair."},ds,sol,{mode:tri?"add-tri":"add-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Add: \\((3x+5)+(2x-4)\\)",{t:u4m(0,5,1),fb:"Correct: like terms are added pair by pair."},[{t:u4m(0,5,9),fb:"The constants were handled with the wrong sign."},{t:u4m(0,1,1),fb:"The x coefficients were subtracted instead of added."},{t:u4m(0,6,0),fb:"That folds the constant into the x term."}],"Grouping like terms gives <b>"+u4m(0,5,1)+"</b>.",{mode:"add-bi",cr:3});
}, ["Add matching parts: x squared with x squared, x with x, constants with constants.", "First add the two x coefficients, keeping both signs."]);
E("u3-pk-subtract", 3, ["3.4"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var tri=ri(0,1)===1;
    var a1=tri?u4nz(-5,5):0,b1=u4nz(-8,8),c1=u4nz(-8,8);
    var a2=tri?u4nz(-5,5):0,b2=u4nz(-8,8),c2=u4nz(-8,8);
    var sa=a1-a2,sb=b1-b2,sc=c1-c2;
    var corr=u4m(sa,sb,sc);
    var ds=[{t:u4m(a1+a2,b1+b2,c1+c2),fb:"That adds the second polynomial; subtraction must change every sign in it first."},{t:u4m(sa,sb,c1+c2),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,b1+b2,sc),fb:"The x term sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(sa,sb+sc,0),fb:"That folds the constant into the x term, but they are unlike terms."}];
    if(!u4ok(corr,ds))continue;
    ds=ds.slice(0,3);
    var sol="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+") &= ("+u4p(a1,b1,c1)+")+("+u4p(-a2,-b2,-c2)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";
    return mcq("Subtract: \\(("+u4p(a1,b1,c1)+")-("+u4p(a2,b2,c2)+")\\)",{t:corr,fb:"Correct: every sign in the second polynomial changes, then like terms combine."},ds,sol,{mode:tri?"sub-tri":"sub-bi",a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,cr:3});
  }
  return mcq("Subtract: \\((5x+3)-(2x-4)\\)",{t:u4m(0,3,7),fb:"Correct: every sign in the second polynomial changes, then like terms combine."},[{t:u4m(0,3,-1),fb:"The constant sign was left unchanged; subtraction changes every sign in the second polynomial."},{t:u4m(0,7,7),fb:"That adds the second polynomial instead of subtracting it."},{t:u4m(0,3,1),fb:"The constant sign change was applied the wrong way."}],"Changing signs then adding gives <b>"+u4m(0,3,7)+"</b>.",{mode:"sub-bi",cr:3});
}, ["Subtraction changes the sign of every term in the second polynomial before you combine.", "First rewrite the second polynomial with every sign flipped, then add like terms."]);
E("u3-pk-addsub-xy", 3, ["3.4"], 2, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,1);
    if(mode===0){
      var x1=u4nz(-7,7),y1=u4nz(-7,7),k1=ri(-7,7);
      var x2=u4nz(-7,7),y2=u4nz(-7,7),k2=ri(-7,7);
      var sub=ri(0,1)===1;
      var sx=sub?x1-x2:x1+x2,sy=sub?y1-y2:y1+y2,sk=sub?k1-k2:k1+k2;
      var corr=u4mxy(sx,sy,sk);
      var ds=[{t:u4mxy(sx,sub?y1+y2:y1-y2,sk),fb:sub?"The y sign was left unchanged; subtraction flips every sign in the second polynomial.":"The y coefficients were subtracted in an addition question."},{t:u4mxy(sx,sy,sub?k1+k2:k1-k2),fb:sub?"The constant sign was left unchanged; subtraction flips every sign in the second polynomial.":"The constants were subtracted in an addition question."},{t:u4mxy(sx+sy,0,sk),fb:"That combines the x and y terms, but they are unlike terms."}];
      if(!u4ok(corr,ds))continue;
      var op=sub?"-":"+",act=sub?"difference":"sum";
      var sol="Combine each kind of term on its own: the result is <b>"+corr+"</b>.";
      if(sub){sol="Change every sign in the second polynomial, then combine each kind of term on its own: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")-("+u4pxy(x2,y2,k2)+") &= ("+u4pxy(x1,y1,k1)+")+("+u4pxy(-x2,-y2,-k2)+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the difference is <b>"+corr+"</b>.";}
      else{sol="Group the like terms: \\[ \\begin{aligned} ("+u4pxy(x1,y1,k1)+")+("+u4pxy(x2,y2,k2)+") &= ("+u4expr([[x1,"x"],[x2,"x"]])+")+("+u4expr([[y1,"y"],[y2,"y"]])+")+("+u4expr([[k1,""],[k2,""]])+") \\\\ &= "+u4pxy(sx,sy,sk)+" \\end{aligned} \\] So the sum is <b>"+corr+"</b>.";}
      return mcq((sub?"Subtract: \\((":"Add: \\((")+u4pxy(x1,y1,k1)+")"+op+"("+u4pxy(x2,y2,k2)+")\\)",{t:corr,fb:"Correct: x terms, y terms and constants are handled separately."},ds,sol,{mode:sub?"xy-sub":"xy-add",x1:x1,y1:y1,k1:k1,x2:x2,y2:y2,k2:k2});
    }else{
      var a=u4nz(-5,5),b=u4nz(-8,8),c=u4nz(-8,8);
      var d=ri(-5,5),e=-u4nz(2,8),f=-u4nz(2,8);
      var sa=a-d,sb=b-e,sc=c-f;
      var corr2=u4m(sa,sb,sc);
      var ds2=[{t:u4m(sa,b+e,sc),fb:"Subtracting a negative x term adds its value; the sign change step was missed."},{t:u4m(sa,sb,c+f),fb:"Subtracting a negative constant adds its value; the sign change step was missed."},{t:u4m(a+d,sb,sc),fb:"The x squared terms were added; this is a subtraction."}];
      if(!u4ok(corr2,ds2))continue;
      var sol2="Change every sign in the second polynomial, then add: \\[ \\begin{aligned} ("+u4p(a,b,c)+")-("+u4p(d,e,f)+") &= ("+u4p(a,b,c)+")+("+u4p(-d,-e,-f)+") \\\\ &= "+u4p(sa,sb,sc)+" \\end{aligned} \\] So the difference is <b>"+corr2+"</b>.";
      return mcq("Subtract: \\(("+u4p(a,b,c)+")-("+u4p(d,e,f)+")\\)",{t:corr2,fb:"Correct: subtracting a negative term adds its value."},ds2,sol2,{mode:"sub-neg",a:a,b:b,c:c,d:d,e:e,f:f});
    }
  }
  return mcq("Add: \\((2x+3y)+(x-2y)\\)",{t:u4mxy(3,1,0),fb:"Correct: x terms, y terms and constants are handled separately."},[{t:u4mxy(3,5,0),fb:"The y coefficients were handled with the wrong sign."},{t:u4mxy(4,1,0),fb:"That combines x and y terms, which are unlike."},{t:u4mxy(2,1,0),fb:"The x coefficients were not added."}],"Combining like terms gives <b>"+u4mxy(3,1,0)+"</b>.",{mode:"xy-add"});
}, ["Keep x terms, y terms and constants in separate groups; unlike terms stay separate.", "First combine the x coefficients, then do the same for the y coefficients."]);
E("u3-pk-multiply-monomial", 3, ["3.4"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    var mode=ri(0,2);
    if(mode===2){
      var b=u4nz(-7,7),c=u4nz(-8,8);
      var corr=u4m(b,c,0);
      var ds=[{t:u4m(0,b+c,0),fb:"Multiplying by x raises each power; the terms do not merge into one x term."},{t:u4m(b,0,0),fb:"That multiplies only the first term; x multiplies every term."},{t:u4m(-b,c,0),fb:"The first product has the wrong sign."},{t:u4m(b,-c,0),fb:"The second product has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Multiply every term by \\(x\\): \\[ \\begin{aligned} x("+u4p(0,b,c)+") &= x \\cdot "+u4expr([[b,"x"]])+" + x \\cdot ("+fmt(c)+") \\\\ &= "+u4p(b,c,0)+" \\end{aligned} \\] So the product is <b>"+corr+"</b>.";
      return mcq("Multiply: \\(x("+u4p(0,b,c)+")\\)",{t:corr,fb:"Correct: x multiplies every term and each power rises by one."},ds,sol,{mode:"x-times-bi",b:b,c:c,cr:3});
    }
    var k=pick([-5,-4,-3,-2,2,3,4,5]);
    var tri=mode===1;
    var a=tri?u4nz(-5,5):0,b2=u4nz(-7,7),c2=u4nz(-8,8);
    var corr2=u4m(k*a,k*b2,k*c2);
    var ds2=[{t:u4m(k*a,b2,c2),fb:"That multiplies only the first term; the monomial multiplies every term."},{t:u4m(k*a,k*b2,c2),fb:"The constant term was left unmultiplied; the monomial multiplies every term."},{t:u4m(k*a,k*b2,-k*c2),fb:"The constant product has the wrong sign."},{t:u4m(a+k,b2+k,c2+k),fb:"That adds the monomial to each coefficient; this question multiplies."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var prts=[];if(a!==0)prts.push("("+u4expr([[k*a,"x^{2}"]])+")");prts.push("("+u4expr([[k*b2,"x"]])+")");prts.push("("+fmt(k*c2)+")");
    var sol2="Multiply every term by \\("+fmt(k)+"\\): \\[ \\begin{aligned} "+fmt(k)+"("+u4p(a,b2,c2)+") &= "+prts.join("+")+" \\\\ &= "+u4p(k*a,k*b2,k*c2)+" \\end{aligned} \\] So the product is <b>"+corr2+"</b>.";
    return mcq("Multiply: \\("+fmt(k)+"("+u4p(a,b2,c2)+")\\)",{t:corr2,fb:"Correct: the monomial multiplies every term."},ds2,sol2,{mode:tri?"const-times-tri":"const-times-bi",k:k,a:a,b:b2,c:c2,cr:3});
  }
  return mcq("Multiply: \\(3(2x+5)\\)",{t:u4m(0,6,15),fb:"Correct: the monomial multiplies every term."},[{t:u4m(0,6,5),fb:"The constant was left unmultiplied."},{t:u4m(0,5,15),fb:"The x term was left unmultiplied."},{t:u4m(0,6,-15),fb:"The constant product has the wrong sign."}],"Multiplying every term gives <b>"+u4m(0,6,15)+"</b>.",{mode:"const-times-bi",cr:3});
}, ["The monomial multiplies every term inside the brackets, not just the first one.", "First multiply the monomial by the first term, then by each remaining term."]);
E("u3-pk-divide-monomial", 3, ["3.4"], 1, "gen", function(){
  for(var att=0;att<200;att++){
    if(ri(0,1)===0){
      var a=u4nz(-7,7),b=u4nz(-8,8);
      var corr=u4m(0,a,b);
      var ds=[{t:u4m(a,b,0),fb:"Dividing by x lowers each power by one; the result has an x term and a constant."},{t:u4m(0,a,0),fb:"That divides only the first term; every term is divided by x."},{t:u4m(0,-a,b),fb:"The first quotient term has the wrong sign."},{t:u4m(0,a,-b),fb:"The second quotient term has the wrong sign."}];
      if(!u4ok(corr,ds))continue;
      ds=ds.slice(0,3);
      var sol="Divide every term by \\(x\\): \\[ \\begin{aligned} ("+u4p(a,b,0)+") \\div x &= "+u4expr([[a,"x^{2}"]])+" \\div x + "+u4expr([[b,"x"]])+" \\div x \\\\ &= "+u4p(0,a,b)+" \\end{aligned} \\] So the quotient is <b>"+corr+"</b>.";
      return mcq("Divide: \\(("+u4p(a,b,0)+") \\div x\\)",{t:corr,fb:"Correct: every term is divided and each power drops by one."},ds,sol,{mode:"div-x",a:a,b:b,cr:2});
    }
    var d=pick([-4,-3,-2,2,3,4,5]);
    var q1=ri(0,1)===1?u4nz(-5,5):0,q2=u4nz(-6,6),q3=u4nz(-6,6);
    var corr2=u4m(q1,q2,q3);
    var A=d*q1,B=d*q2,C=d*q3;
    var ds2=[{t:u4m(q1,q2,C),fb:"The constant term was left undivided; every term is divided."},{t:u4m(A-d,B-d,C-d),fb:"That subtracts the divisor from each coefficient; this question divides."},{t:u4m(q1,-q2,q3),fb:"The middle quotient term has the wrong sign."},{t:u4m(q1,q2,-q3),fb:"The constant quotient term has the wrong sign."}];
    if(!u4ok(corr2,ds2))continue;
    ds2=ds2.slice(0,3);
    var dparts=[];if(A!==0)dparts.push("("+u4expr([[A,"x^{2}"]])+") \\div ("+fmt(d)+")");dparts.push("("+u4expr([[B,"x"]])+") \\div ("+fmt(d)+")");dparts.push("("+fmt(C)+") \\div ("+fmt(d)+")");
    var sol2="Divide every term by \\("+fmt(d)+"\\): \\[ \\begin{aligned} ("+u4p(A,B,C)+") \\div ("+fmt(d)+") &= "+dparts.join(" + ")+" \\\\ &= "+u4p(q1,q2,q3)+" \\end{aligned} \\] So the quotient is <b>"+corr2+"</b>.";
    return mcq("Divide: \\(("+u4p(A,B,C)+") \\div ("+fmt(d)+")\\)",{t:corr2,fb:"Correct: every term is divided by the monomial."},ds2,sol2,{mode:"div-const",d:d,q1:q1,q2:q2,q3:q3,cr:2});
  }
  return mcq("Divide: \\((6x+9) \\div 3\\)",{t:u4m(0,2,3),fb:"Correct: every term is divided by the monomial."},[{t:u4m(0,2,9),fb:"The constant was left undivided."},{t:u4m(0,3,6),fb:"That subtracts the divisor from each coefficient."},{t:u4m(0,2,-3),fb:"The constant quotient has the wrong sign."}],"Dividing every term gives <b>"+u4m(0,2,3)+"</b>.",{mode:"div-const",cr:2});
}, ["Every term of the polynomial is divided by the monomial, one term at a time.", "First divide the first term, then divide each remaining term by the same monomial."]);

/* PK tranche metadata pass for Unit 3. The tranche's own entries are flagged here.  */
var PKT_U3_FOR=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14"];
var PKT_U3={
 "u3-pk-degree":{src:"math-9:8.14",group:"polynomial-language"},
 "u3-pk-parts":{src:"math-9:8.14",group:"polynomial-language"},
 "u3-pk-add":{src:"math-9:8.6",group:"polynomial-operations"},
 "u3-pk-subtract":{src:"math-9:8.7",group:"polynomial-operations"},
 "u3-pk-addsub-xy":{src:"math-9:8.11",group:"polynomial-operations"},
 "u3-pk-multiply-monomial":{src:"math-9:8.8",group:"polynomial-operations"},
 "u3-pk-divide-monomial":{src:"math-9:8.9",group:"polynomial-operations"}
};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});
