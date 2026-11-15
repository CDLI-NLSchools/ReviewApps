// Math 2200 Unit 9 Sequences and Series question bank
// CRMARKS: u9-arith-diff=1
// CRMARKS: u9-arith-find-missing=2
// CRMARKS: u9-arith-general-term=2
// CRMARKS: u9-arith-graph-link=2
// CRMARKS: u9-arith-nth-count=2
// CRMARKS: u9-arith-series-context=2
// CRMARKS: u9-arith-sum-formula=2
// CRMARKS: u9-crossover=3
// CRMARKS: u9-derive-formulas=4
// CRMARKS: u9-evaluate-offers=3
// CRMARKS: u9-geo-find-index=2
// CRMARKS: u9-geo-nth-term=2
// CRMARKS: u9-geo-ratio=1
// CRMARKS: u9-geo-sum-finite=2
// CRMARKS: u9-infinite-sum=2
/* ================= Unit 9: Sequences and Series ================= */
/* ================= Unit 9: Sequences and Series =================
   Helpers are prefixed u9; the only other top-level statements are E(...) calls.
   16 entries: L1 3, L2 10, L3 3. Codes: MA2200.4.55 to 4.71 (stored in the
   short form "4.55" etc., as elsewhere in this bank). All angles-free exact
   arithmetic: sums and terms are kept as reduced fractions wherever the
   parameters produce them, and infinite series use only |r| < 1. */

function u9gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }

function u9fr(n, d) { /* signed reduced fraction as a KaTeX body (no delimiters) */
  if (d < 0) { n = -n; d = -d; }
  if (n === 0) return "0";
  var g = u9gcd(n, d); n /= g; d /= g;
  var s = n < 0 ? "-" : ""; n = Math.abs(n);
  if (d === 1) return s + n;
  return s + "\\frac{" + n + "}{" + d + "}";
}

function u9dist3(correct, cands) { /* first three candidate strings that differ from the key and each other */
  var out = [];
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    if (c !== null && c !== undefined && c !== correct && out.indexOf(c) < 0) out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

function u9lin(d, c) { /* body of a linear expression dn + c, e.g. "3n - 4", "n + 2", "-n", "5n" */
  var co = d === 1 ? "n" : d === -1 ? "-n" : d + "n";
  if (c === 0) return co;
  return co + (c > 0 ? " + " + c : " - " + (-c));
}

function u9ord(n) { /* 4 -> "4th", 21 -> "21st" */
  var s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function u9money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function u9arithTerms(t1n, t1d, dn, dd, count) { /* formatted first `count` terms of an arithmetic sequence */
  var out = [], den = t1d * dd;
  for (var k = 0; k < count; k++) out.push(u9fr(t1n * dd + k * dn * t1d, den));
  return out;
}

function u9geoTerms(t1, rn, rd, count) { /* formatted first `count` terms of a geometric sequence with integer first term */
  var out = [], num = t1, den = 1;
  for (var k = 0; k < count; k++) {
    out.push(u9fr(num, den));
    num *= rn; den *= rd;
    var g = u9gcd(num, den); num /= g; den /= g;
  }
  return out;
}

/* ---- 4.55, 4.57: common difference of an arithmetic sequence ---- */
E("u9-arith-diff", 9, ["4.55", "4.57"], 1, "gen", function () {
  var D = [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [-2, 1], [-3, 1], [-4, 1], [-5, 1], [-6, 1],
           [1, 2], [3, 2], [5, 2], [7, 2], [-1, 2], [-3, 2], [-5, 2]];
  var dp = pick(D), dn = dp[0], dd = dp[1];
  var t1n = ri(-12, 20), t1d = pick([1, 1, 2]);
  if (t1d === 2 && t1n % 2 === 0) t1n += 1;
  var terms = u9arithTerms(t1n, t1d, dn, dd, 5);
  var key = "\\(" + u9fr(dn, dd) + "\\)";
  var cands = [[dn + dd, dd], [dn - dd, dd], [-dn, dd], [2 * dn, dd], [dn, 2 * dd], [dn + 2 * dd, dd]]
    .map(function (p) { return "\\(" + u9fr(p[0], p[1]) + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "An arithmetic sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the common difference?";
  var sol = "The common difference is the amount added to get from one term to the next. Subtract the first two terms:"
    + "\\[ \\begin{aligned} d &= t_2 - t_1 \\\\ &= " + terms[1] + " - \\left(" + terms[0] + "\\right) \\\\ &= " + u9fr(dn, dd) + " \\end{aligned} \\]"
    + "Every later pair of terms differs by the same amount, so the common difference is \\(" + u9fr(dn, dd) + "\\).";
  return mcq(prompt, key, dis, sol, { t1n: t1n, t1d: t1d, dn: dn, dd: dd });
});

/* ---- 4.63, 4.65: common ratio of a geometric sequence ---- */
E("u9-geo-ratio", 9, ["4.63", "4.65"], 1, "gen", function () {
  var RT = [
    { rn: 2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 3, rd: 1, t1: [1, 2, 3, 4, 5, 6, 7, 8] },
    { rn: 4, rd: 1, t1: [1, 2, 3, 4, 5] }, { rn: 5, rd: 1, t1: [2, 3, 4] },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8, 9] }, { rn: -3, rd: 1, t1: [1, 2, 3, 4, 5] },
    { rn: 1, rd: 2, t1: [16, 24, 32, 48, 64, 96, 128] }, { rn: 1, rd: 3, t1: [27, 54, 81, 108] },
    { rn: 2, rd: 3, t1: [54, 81, 162, 243] }, { rn: -1, rd: 2, t1: [16, 32, 48, 64, 96] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 5);
  var key = "\\(" + u9fr(c.rn, c.rd) + "\\)";
  var cands = [[c.rd, c.rn], [-c.rn, c.rd], [c.rn + c.rd, c.rd], [2 * c.rn, c.rd], [c.rn, c.rd + c.rn]]
    .map(function (p) { return "\\(" + u9fr(p[0], p[1]) + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "A geometric sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the common ratio?";
  var sol = "The common ratio is the quotient of two consecutive terms:"
    + "\\[ \\begin{aligned} r &= \\frac{t_2}{t_1} \\\\ &= \\frac{" + terms[1] + "}{" + terms[0] + "} \\\\ &= " + u9fr(c.rn, c.rd) + " \\end{aligned} \\]"
    + "Dividing any term by the term before it gives the same quotient, so the common ratio is \\(" + u9fr(c.rn, c.rd) + "\\).";
  return mcq(prompt, key, dis, sol, { t1: t1, rn: c.rn, rd: c.rd });
});

/* ---- 4.70, 4.71: does an infinite geometric series converge? ---- */
E("u9-converge-check", 9, ["4.70", "4.71"], 1, "gen", function () {
  var CASES = [
    { rn: 1, rd: 2, t1: [8, 12, 16, 24, 40], cat: "conv" }, { rn: 3, rd: 4, t1: [64, 128], cat: "conv" },
    { rn: 2, rd: 3, t1: [81], cat: "conv" }, { rn: 1, rd: 3, t1: [54], cat: "conv" },
    { rn: -1, rd: 2, t1: [24, 32], cat: "convNeg" }, { rn: -3, rd: 4, t1: [64], cat: "convNeg" },
    { rn: -2, rd: 3, t1: [81], cat: "convNeg" }, { rn: -1, rd: 5, t1: [125], cat: "convNeg" },
    { rn: 3, rd: 2, t1: [8, 16], cat: "divPos" }, { rn: 5, rd: 4, t1: [64], cat: "divPos" },
    { rn: 4, rd: 3, t1: [81], cat: "divPos" }, { rn: 2, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9], cat: "divPos" },
    { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8], cat: "divNeg" }, { rn: -4, rd: 3, t1: [81], cat: "divNeg" },
    { rn: 1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "one" },
    { rn: -1, rd: 1, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cat: "negOne" }
  ];
  var OPTS = {
    conv: { key: "It converges, because \\(|r| < 1\\): the partial sums approach one fixed value.",
      dis: ["It diverges, because a series with infinitely many terms cannot settle on a finite sum.",
            "It diverges, because the ratio must be a whole number for a sum to exist.",
            "It converges, because every ratio below 1 produces a sum for the series."] },
    convNeg: { key: "It converges, because \\(|r| < 1\\), even though the terms alternate in sign.",
      dis: ["It diverges, because the terms alternate in sign as the series goes on.",
            "It diverges, because the common ratio is negative, so no sum can exist.",
            "It converges, because every negative ratio produces a sum for the series."] },
    divPos: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size, so the partial sums never approach a value.",
      dis: ["It converges, because the common ratio is positive, so the terms keep the same sign throughout.",
            "It converges, because each term is built from the one before it by the same rule, from the first term onward.",
            "It diverges, because the first term is positive and the terms grow steadily from there."] },
    divNeg: { key: "It diverges, because \\(|r| > 1\\): the terms grow in size as they alternate in sign.",
      dis: ["It converges, because the positive and negative terms cancel each other out.",
            "It converges, because the common ratio is less than 1, so the terms shrink.",
            "It diverges, because every negative ratio produces a diverging series, whatever its size."] },
    one: { key: "It diverges, because \\(r = 1\\): the partial sums grow by the same amount every step.",
      dis: ["It converges, because the terms are constant, so the sum settles quickly.",
            "It converges to the value of the first term, since the terms never change from term to term.",
            "It diverges, because the ratio must be a fraction for a sum to exist at all."] },
    negOne: { key: "It diverges, because \\(r = -1\\): the partial sums alternate between two values and never settle.",
      dis: ["It converges to 0, because the terms cancel in pairs as they are added up, one after another.",
            "It converges, because the size of the ratio is not greater than 1 in this case.",
            "It diverges, because every negative ratio produces a diverging series in the end, whatever the terms are."] }
  };
  var c = pick(CASES), t1 = pick(c.t1);
  var terms = u9geoTerms(t1, c.rn, c.rd, 4);
  var o = OPTS[c.cat];
  var prompt = "A geometric series begins \\(" + terms.join(", ") + ", \\ldots\\) and continues with the same pattern forever. Which statement about the series is correct?";
  var sol = "The common ratio is \\(r = \\dfrac{t_2}{t_1} = " + u9fr(c.rn, c.rd) + "\\), so \\(|r| = " + u9fr(Math.abs(c.rn), c.rd) + "\\). "
    + (c.cat === "conv" || c.cat === "convNeg"
      ? "Since \\(|r| < 1\\), the terms shrink toward 0 and the partial sums approach one fixed value: the series converges."
      : c.cat === "one"
        ? "With \\(r = 1\\) every term equals the first, so each partial sum is larger than the last: the series diverges."
        : c.cat === "negOne"
          ? "With \\(r = -1\\) the partial sums alternate between \\(" + terms[0] + "\\) and 0, never settling on one value: the series diverges."
          : "Since \\(|r| > 1\\), the terms grow in size instead of shrinking toward 0, so the partial sums never approach a value: the series diverges.")
    + " The correct statement is: <b>" + o.key + "</b>";
  return mcq(prompt, o.key, o.dis, sol, { t1: t1, rn: c.rn, rd: c.rd, cat: c.cat });
});

/* ---- 4.57, 4.58: general term of an arithmetic sequence ---- */
E("u9-arith-general-term", 9, ["4.57", "4.58"], 2, "gen", function () {
  var t1 = ri(-9, 15); while (t1 === 0) t1 = ri(-9, 15);
  var d = ri(-6, 9); while (d === 0) d = ri(-6, 9);
  var terms = u9arithTerms(t1, 1, d, 1, 4);
  var key = "\\(t_n = " + u9lin(d, t1 - d) + "\\)";
  var cands = [u9lin(d, t1), u9lin(t1, d), u9lin(d, t1 + d), u9lin(-d, t1 - d), u9lin(d, -(t1 - d))]
    .map(function (s) { return "\\(t_n = " + s + "\\)"; });
  var dis = u9dist3(key, cands);
  var prompt = "An arithmetic sequence begins \\(" + terms.join(", ") + ", \\ldots\\) What is the general term of the sequence?";
  var sol = "The common difference is \\(d = " + terms[1] + " - " + terms[0] + " = " + d + "\\). Start from \\(t_n = t_1 + (n - 1)d\\) and expand:"
    + "\\[ \\begin{aligned} t_n &= " + t1 + " + (n - 1)(" + d + ") \\\\ &= " + u9lin(d, t1 - d) + " \\end{aligned} \\]"
    + "Checking with \\(n = 1\\): \\(" + u9lin(d, t1 - d) + "\\) gives \\(" + terms[0] + "\\) when \\(n = 1\\), as it should.";
  return mcq(prompt, key, dis, sol, { t1: t1, d: d });
});

/* ---- 4.55, 4.56, 4.59: a later term, or the term number of a given value ---- */
E("u9-arith-nth-count", 9, ["4.55", "4.56", "4.59"], 2, "gen", function () {
  var t1 = ri(-12, 30);
  var d = ri(-9, 10); while (d === 0) d = ri(-9, 10);
  if (Math.random() < 0.5) {
    var n = ri(6, 30), ans = t1 + (n - 1) * d;
    var promptA = "An arithmetic sequence has first term \\(" + t1 + "\\) and common difference \\(" + d + "\\). Find the value of the " + u9ord(n) + " term.";
    var solA = "Use \\(t_n = t_1 + (n - 1)d\\) with \\(n = " + n + "\\):"
      + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + " + (" + n + " - 1)(" + d + ") \\\\ &= " + t1 + " + " + ((n - 1) * d) + " \\\\ &= " + ans + " \\end{aligned} \\]";
    return numq(promptA, ans, 0.01, solA, { mode: "term", t1: t1, d: d, n: n });
  }
  var k = ri(8, 40), v = t1 + (k - 1) * d;
  var promptB = "An arithmetic sequence has first term \\(" + t1 + "\\) and common difference \\(" + d + "\\). One of the terms of the sequence is \\(" + v + "\\). Find its term number.";
  var solB = "Set the general term equal to \\(" + v + "\\) and solve for \\(n\\):"
    + "\\[ \\begin{aligned} t_1 + (n - 1)d &= " + v + " \\\\ " + t1 + " + (n - 1)(" + d + ") &= " + v + " \\\\ (n - 1)(" + d + ") &= " + (v - t1) + " \\\\ n - 1 &= " + (k - 1) + " \\\\ n &= " + k + " \\end{aligned} \\]"
    + "So \\(" + v + "\\) is the " + u9ord(k) + " term.";
  return numq(promptB, k, 0.01, solB, { mode: "count", t1: t1, d: d, n: k });
});

/* ---- 4.61: sum of the first n terms of an arithmetic sequence ---- */
E("u9-arith-sum-formula", 9, ["4.61"], 1, "gen", function () {
  var t1 = ri(-15, 30);
  var d = ri(-8, 10); while (d === 0) d = ri(-8, 10);
  var n = ri(8, 40);
  var S = n * (2 * t1 + (n - 1) * d) / 2;
  var tn = t1 + (n - 1) * d;
  var prompt = "Find the sum of the first \\(" + n + "\\) terms of the arithmetic sequence with first term \\(" + t1 + "\\) and common difference \\(" + d + "\\).";
  var sol = "First find the last term needed, then use \\(S_n = \\dfrac{n}{2}(t_1 + t_n)\\):"
    + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + " + (" + n + " - 1)(" + d + ") = " + tn + " \\\\ S_{" + n + "} &= \\frac{" + n + "}{2}\\left(" + t1 + " + " + tn + "\\right) \\\\ &= " + S + " \\end{aligned} \\]";
  return numq(prompt, S, 0.01, sol, { t1: t1, d: d, n: n });
});

/* ---- 4.61, 4.62: arithmetic series in a seating or stacking context ---- */
E("u9-arith-series-context", 9, ["4.61", "4.62"], 2, "gen", function () {
  var CTX = [
    { key: "theatre", A: [16, 32], D: [2, 5], R: [14, 28],
      text: "A community theatre has {R} rows of seats. The first row has {A} seats, and each row after the first has {D} more seats than the row before it. How many seats does the theatre have in all?" },
    { key: "arena", A: [20, 40], D: [2, 4], R: [15, 30],
      text: "One section of a hockey arena has {R} rows of seats. The first row has {A} seats, and each row after the first has {D} more seats than the row before it. How many seats are in the section?" },
    { key: "amphitheatre", A: [18, 36], D: [3, 6], R: [12, 24],
      text: "An outdoor amphitheatre has {R} rows of benches. The first row seats {A} people, and each row after the first seats {D} more people than the row before it. How many people can the amphitheatre seat?" },
    { key: "library", A: [12, 26], D: [2, 4], R: [10, 20],
      text: "A library display has {R} shelves. The bottom shelf holds {A} books, and each shelf above it holds {D} more books than the shelf below it. How many books are on display in total?" },
    { key: "choir", A: [10, 24], D: [2, 4], R: [8, 18],
      text: "A choir performs on risers with {R} rows. The front row fits {A} singers, and each row behind it fits {D} more singers than the row in front of it. How many singers can the risers hold in total?" }
  ];
  var c = pick(CTX);
  var A = ri(c.A[0], c.A[1]), D = ri(c.D[0], c.D[1]), R = ri(c.R[0], c.R[1]);
  var last = A + (R - 1) * D;
  var S = R * (A + last) / 2;
  var prompt = c.text.replace("{R}", R).replace("{A}", A).replace("{D}", D);
  var sol = "The row sizes form an arithmetic sequence with first term \\(" + A + "\\) and common difference \\(" + D + "\\). The last of the \\(" + R + "\\) rows holds:"
    + "\\[ \\begin{aligned} t_{" + R + "} &= " + A + " + (" + R + " - 1)(" + D + ") = " + last + " \\\\ S_{" + R + "} &= \\frac{" + R + "}{2}\\left(" + A + " + " + last + "\\right) = " + S + " \\end{aligned} \\]"
    + "The total is \\(" + S + "\\).";
  return numq(prompt, S, 0.01, sol, { ctx: c.key, A: A, D: D, R: R });
});

/* ---- 4.62: recover a missing piece of an arithmetic series ---- */
E("u9-arith-find-missing", 9, ["4.62"], 2, "gen", function () {
  var n = ri(6, 25);
  var d0 = ri(-6, 9); while (d0 === 0) d0 = ri(-6, 9);
  var t10 = ri(-5, 28);
  var S = n * (2 * t10 + (n - 1) * d0) / 2;
  if (Math.random() < 0.5) {
    var promptA = "The sum of the first \\(" + n + "\\) terms of an arithmetic series is \\(" + S + "\\), and the first term is \\(" + t10 + "\\). Find the common difference.";
    var solA = "Substitute into \\(S_n = \\dfrac{n}{2}\\left(2t_1 + (n - 1)d\\right)\\) and solve for \\(d\\):"
      + "\\[ \\begin{aligned} " + S + " &= \\frac{" + n + "}{2}\\left(2(" + t10 + ") + " + (n - 1) + "d\\right) \\\\ " + (2 * S) + " &= " + n + "\\left(" + (2 * t10) + " + " + (n - 1) + "d\\right) \\\\ " + fmt(2 * S / n) + " &= " + (2 * t10) + " + " + (n - 1) + "d \\\\ " + (n - 1) + "d &= " + (2 * S / n - 2 * t10) + " \\\\ d &= " + d0 + " \\end{aligned} \\]";
    return numq(promptA, d0, 0.01, solA, { mode: "findD", t1: t10, d: d0, n: n, S: S });
  }
  var promptB = "The sum of the first \\(" + n + "\\) terms of an arithmetic series is \\(" + S + "\\), and the common difference is \\(" + d0 + "\\). Find the first term.";
  var solB = "Substitute into \\(S_n = \\dfrac{n}{2}\\left(2t_1 + (n - 1)d\\right)\\) and solve for \\(t_1\\):"
    + "\\[ \\begin{aligned} " + S + " &= \\frac{" + n + "}{2}\\left(2t_1 + (" + (n - 1) + ")(" + d0 + ")\\right) \\\\ " + fmt(2 * S / n) + " &= 2t_1 + (" + (n - 1) * d0 + ") \\\\ 2t_1 &= " + (2 * S / n - (n - 1) * d0) + " \\\\ t_1 &= " + t10 + " \\end{aligned} \\]";
  return numq(promptB, t10, 0.01, solB, { mode: "findT1", t1: t10, d: d0, n: n, S: S });
});

/* ---- 4.63, 4.66: a later term of a geometric sequence ---- */
E("u9-geo-nth-term", 9, ["4.63", "4.66"], 1, "gen", function () {
  var RT = [
    { rn: 2, rd: 1, t1: [3, 4, 5, 6, 7, 8], n: [4, 5, 6, 7] }, { rn: 3, rd: 1, t1: [2, 3, 4, 5], n: [4, 5, 6] },
    { rn: 4, rd: 1, t1: [1, 2, 3], n: [4, 5] }, { rn: -2, rd: 1, t1: [2, 3, 4, 5, 6], n: [4, 5, 6] },
    { rn: -3, rd: 1, t1: [1, 2, 3], n: [4, 5] }, { rn: 1, rd: 2, t1: [32, 48, 64, 96, 128], n: [4, 5, 6] },
    { rn: 3, rd: 2, t1: [8, 16, 32], n: [4, 5] }, { rn: -1, rd: 2, t1: [32, 64, 96], n: [4, 5, 6] },
    { rn: 2, rd: 3, t1: [81], n: [4, 5] }, { rn: 5, rd: 2, t1: [8, 16], n: [4] }
  ];
  var c = pick(RT), t1 = pick(c.t1), n = pick(c.n);
  var vn = t1 * Math.pow(c.rn, n - 1), vd = Math.pow(c.rd, n - 1);
  var rBody = u9fr(c.rn, c.rd);
  var key = "\\(" + u9fr(vn, vd) + "\\)";
  var cands = [
    "\\(" + u9fr(t1 * Math.pow(c.rn, n), Math.pow(c.rd, n)) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rn, n - 2), Math.pow(c.rd, n - 2)) + "\\)",
    "\\(" + u9fr(-vn, vd) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rd, n - 1), Math.pow(c.rn, n - 1)) + "\\)",
    "\\(" + u9fr(t1 * Math.pow(c.rn, n - 1) * -1, Math.pow(c.rd, n - 1)) + "\\)"
  ];
  var dis = u9dist3(key, cands);
  var prompt, sol;
  if (Math.random() < 0.5) {
    prompt = "A geometric sequence has first term \\(" + t1 + "\\) and common ratio \\(" + rBody + "\\). Find the " + u9ord(n) + " term.";
  } else {
    prompt = "A geometric sequence has general term \\(t_n = " + t1 + "\\left(" + rBody + "\\right)^{n-1}\\). Find the value of \\(t_{" + n + "}\\).";
  }
  sol = "Use \\(t_n = t_1 r^{n-1}\\) with \\(n = " + n + "\\):"
    + "\\[ \\begin{aligned} t_{" + n + "} &= " + t1 + "\\left(" + rBody + "\\right)^{" + (n - 1) + "} \\\\ &= " + u9fr(vn, vd) + " \\end{aligned} \\]";
  return mcq(prompt, key, dis, sol, { t1: t1, rn: c.rn, rd: c.rd, n: n, vn: vn, vd: vd });
});

/* ---- 4.64, 4.67, 4.69: finite geometric series, including the bouncing ball ---- */
E("u9-geo-sum-finite", 9, ["4.64", "4.67", "4.69"], 2, "gen", function () {
  if (Math.random() < 0.55) {
    var COMBOS = [
      { t1: 3, rn: 2, rd: 1, n: [5, 6, 7, 8] }, { t1: 4, rn: 2, rd: 1, n: [5, 6, 7] }, { t1: 5, rn: 2, rd: 1, n: [5, 6, 7] },
      { t1: 6, rn: 2, rd: 1, n: [5, 6] }, { t1: 2, rn: 3, rd: 1, n: [5, 6] }, { t1: 4, rn: 3, rd: 1, n: [5, 6] },
      { t1: 3, rn: -2, rd: 1, n: [5, 6, 7] }, { t1: 5, rn: -2, rd: 1, n: [5, 6] },
      { t1: 32, rn: 1, rd: 2, n: [5, 6, 7] }, { t1: 48, rn: 1, rd: 2, n: [5, 6] },
      { t1: 64, rn: 1, rd: 2, n: [5, 6, 7, 8] }, { t1: 96, rn: 1, rd: 2, n: [6] },
      { t1: 32, rn: -1, rd: 2, n: [5, 6] }, { t1: 64, rn: -1, rd: 2, n: [5, 6, 7] },
      { t1: 16, rn: 3, rd: 2, n: [4, 5] }, { t1: 32, rn: 3, rd: 2, n: [4, 5] }
    ];
    var cb = pick(COMBOS), t1 = cb.t1, n = pick(cb.n);
    var sumN = 0, sumD = 1, tn = t1, td = 1;
    for (var k = 0; k < n; k++) {
      var a = sumN * td + tn * sumD, b = sumD * td;
      var g = u9gcd(a, b); sumN = a / g; sumD = b / g;
      tn *= cb.rn; td *= cb.rd;
      g = u9gcd(tn, td); tn /= g; td /= g;
    }
    var S = sumN / sumD;
    var first4 = u9geoTerms(t1, cb.rn, cb.rd, Math.min(4, n));
    var promptA = "Find the sum of the geometric series \\(" + first4.join(" + ") + " + \\ldots\\) where the series has \\(" + n + "\\) terms in total.";
    var solA = "The first term is \\(" + t1 + "\\) and the common ratio is \\(r = " + u9fr(cb.rn, cb.rd) + "\\). Use \\(S_n = \\dfrac{t_1(r^n - 1)}{r - 1}\\):"
      + "\\[ \\begin{aligned} S_{" + n + "} &= \\frac{" + t1 + "\\left(\\left(" + u9fr(cb.rn, cb.rd) + "\\right)^{" + n + "} - 1\\right)}{" + u9fr(cb.rn, cb.rd) + " - 1} \\\\ &= " + S + " \\end{aligned} \\]";
    return numq(promptA, S, 0.01, solA, { mode: "series", t1: t1, rn: cb.rn, rd: cb.rd, n: n });
  }
  var BALL = [
    { H: 24, fn: 1, fd: 2, N: [4, 5, 6, 7] }, { H: 20, fn: 1, fd: 2, N: [4, 5, 6] },
    { H: 32, fn: 3, fd: 4, N: [4, 5, 6] }, { H: 16, fn: 3, fd: 4, N: [4, 5] },
    { H: 27, fn: 2, fd: 3, N: [4, 5] }, { H: 36, fn: 2, fd: 3, N: [4, 5] }
  ];
  var bb = pick(BALL), H = bb.H, N = pick(bb.N);
  var bounce = H * bb.fn / bb.fd, dist = H, heights = [];
  for (var j = 1; j < N; j++) { heights.push(bounce); dist += 2 * bounce; bounce *= bb.fn / bb.fd; }
  var fBody = u9fr(bb.fn, bb.fd);
  var promptB = "A ball is dropped from a height of \\(" + H + "\\) m onto a hard floor. Each time it bounces, it rises to \\(" + fBody + "\\) of the height of the previous bounce. Find the total distance the ball travels by the time it hits the floor for the " + u9ord(N) + " time.";
  var heightsStr = heights.map(function (h) { return fmt(h); }).join(" m, ");
  var solB = "The heights the ball reaches after each bounce form a geometric sequence: \\(" + heightsStr + "\\) m, and so on. The drop counts once, but every bounce height is travelled twice, once up and once down:"
    + "\\[ \\begin{aligned} D &= " + H + " + 2\\left(" + heights.map(function (h) { return fmt(h); }).join(" + ") + "\\right) \\\\ &= " + fmt(dist) + " \\text{ m} \\end{aligned} \\]"
    + "The total distance travelled is \\(" + fmt(dist) + "\\) m.";
  return numq(promptB, dist, 0.01, solB, { mode: "ball", H: H, fn: bb.fn, fd: bb.fd, N: N });
});

/* ---- 4.66, 4.68: which term, or what ratio, in a geometric sequence ---- */
E("u9-geo-find-index", 9, ["4.66", "4.68"], 2, "gen", function () {
  if (Math.random() < 0.6) {
    var RT = [
      { rn: 2, rd: 1, t1: [2, 3, 4, 5, 6, 7, 8], k: [2, 3, 4, 5, 6, 7] },
      { rn: 3, rd: 1, t1: [1, 2, 3, 4], k: [2, 3, 4, 5, 6] },
      { rn: 4, rd: 1, t1: [1, 2, 3], k: [2, 3, 4] },
      { rn: -2, rd: 1, t1: [2, 3, 4, 5], k: [2, 3, 4, 5] },
      { rn: -3, rd: 1, t1: [1, 2, 3], k: [2, 3, 4] },
      { rn: 1, rd: 2, t1: [64, 128, 256], k: [2, 3, 4, 5, 6] },
      { rn: 1, rd: 3, t1: [81, 243], k: [2, 3, 4] }
    ];
    var c = pick(RT), t1 = pick(c.t1), k = pick(c.k);
    var v = t1 * Math.pow(c.rn, k) / Math.pow(c.rd, k);
    var promptA = "A geometric sequence has first term \\(" + t1 + "\\) and common ratio \\(" + u9fr(c.rn, c.rd) + "\\). One term of the sequence is \\(" + u9fr(Math.round(v * Math.pow(c.rd, k)), Math.pow(c.rd, k)) + "\\). Find its term number.";
    var solA = "A term \\(t_n\\) satisfies \\(t_1 r^{n-1} = " + u9fr(Math.round(v * Math.pow(c.rd, k)), Math.pow(c.rd, k)) + "\\). Dividing by \\(t_1\\) gives \\(r^{n-1} = \\left(" + u9fr(c.rn, c.rd) + "\\right)^{" + k + "}\\), so \\(n - 1 = " + k + "\\) and \\(n = " + (k + 1) + "\\). The value is the " + u9ord(k + 1) + " term.";
    return numq(promptA, k + 1, 0.01, solA, { mode: "findN", t1: t1, rn: c.rn, rd: c.rd, k: k });
  }
  var n = pick([4, 6]);
  var r = pick([2, 3, -2, -3, 4]);
  var t1 = ri(1, 6);
  var v = t1 * Math.pow(r, n - 1);
  var promptB = "A geometric sequence has first term \\(" + t1 + "\\) and the value of the " + u9ord(n) + " term is \\(" + v + "\\). Find the common ratio.";
  var solB = "Use \\(t_n = t_1 r^{n-1}\\):"
    + "\\[ \\begin{aligned} " + v + " &= " + t1 + " \\cdot r^{" + (n - 1) + "} \\\\ r^{" + (n - 1) + "} &= " + Math.pow(r, n - 1) + " \\\\ r &= " + r + " \\end{aligned} \\]"
    + "Since the exponent \\(" + (n - 1) + "\\) is odd, there is only one real value of \\(r\\) with this power.";
  return numq(promptB, r, 0.01, solB, { mode: "findR", t1: t1, r: r, n: n, v: v });
});

/* ---- 4.70: sum of an infinite geometric series ---- */
E("u9-infinite-sum", 9, ["4.70"], 2, "gen", function () {
  var RT = [
    { rn: 1, rd: 2, t1: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }, { rn: 1, rd: 3, t1: [4, 6, 8, 10, 12, 14, 16] },
    { rn: 2, rd: 3, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { rn: 1, rd: 4, t1: [6, 9, 12, 15] },
    { rn: 3, rd: 4, t1: [2, 3, 4, 5, 6, 7, 8, 9, 10] }, { rn: -1, rd: 2, t1: [6, 9, 12, 15] },
    { rn: -1, rd: 3, t1: [8, 12, 16] }, { rn: 2, rd: 5, t1: [6, 9, 12] },
    { rn: -2, rd: 3, t1: [10, 15] }, { rn: 1, rd: 5, t1: [8, 12, 16] }
  ];
  var c = pick(RT), t1 = pick(c.t1);
  var rBody = u9fr(c.rn, c.rd);
  var Sn = t1 * c.rd, Sd = c.rd - c.rn;
  if (Math.random() < 0.55) {
    var key = "\\(" + u9fr(Sn, Sd) + "\\)";
    var cands = [
      "\\(" + u9fr(t1 * c.rd, c.rd + c.rn) + "\\)",
      "\\(" + u9fr(-Sn, Sd) + "\\)",
      "\\(" + u9fr(t1 * c.rn, Sd) + "\\)",
      "\\(" + u9fr(2 * Sn, Sd) + "\\)"
    ];
    var dis = u9dist3(key, cands);
    var first3 = u9geoTerms(t1, c.rn, c.rd, 3);
    var promptA = "Find the sum of the infinite geometric series \\(" + first3.join(" + ") + " + \\ldots\\)";
    var solA = "The first term is \\(" + t1 + "\\) and the common ratio is \\(r = " + rBody + "\\). Since \\(|r| < 1\\), the series converges, and"
      + "\\[ S_\\infty = \\frac{t_1}{1 - r} = \\frac{" + t1 + "}{1 - \\left(" + rBody + "\\right)} = " + u9fr(Sn, Sd) + " \\]";
    return mcq(promptA, key, dis, solA, { mode: "findS", t1: t1, rn: c.rn, rd: c.rd, Sn: Sn, Sd: Sd });
  }
  var S = ri(6, 40);
  var t1n = S * (c.rd - c.rn), t1d = c.rd;
  var keyB = "\\(" + u9fr(t1n, t1d) + "\\)";
  var candsB = [
    "\\(" + u9fr(S * (c.rd + c.rn), c.rd) + "\\)",
    "\\(" + S + "\\)",
    "\\(" + u9fr(S * c.rd, c.rd - c.rn) + "\\)",
    "\\(" + u9fr(-t1n, t1d) + "\\)"
  ];
  var disB = u9dist3(keyB, candsB);
  var promptB = "An infinite geometric series with common ratio \\(" + rBody + "\\) has a sum of \\(" + S + "\\). Find its first term.";
  var solB = "Use \\(S_\\infty = \\dfrac{t_1}{1 - r}\\) and solve for \\(t_1\\):"
    + "\\[ \\begin{aligned} " + S + " &= \\frac{t_1}{1 - \\left(" + rBody + "\\right)} \\\\ t_1 &= " + S + " \\cdot \\left(1 - \\left(" + rBody + "\\right)\\right) \\\\ &= " + u9fr(t1n, t1d) + " \\end{aligned} \\]";
  return mcq(promptB, keyB, disB, solB, { mode: "findT1", t1n: t1n, t1d: t1d, rn: c.rn, rd: c.rd, S: S });
});

/* ---- 4.60: arithmetic sequence plotted as a line ---- */
E("u9-arith-graph-link", 9, ["4.60"], 2, "gen", function () {
  var d = ri(1, 5);
  var t1 = ri(d + 2, 16);
  var npts = pick([5, 6]);
  var maxY = t1 + (npts - 1) * d;
  var yMax = Math.ceil(maxY / 5) * 5 + 5;
  var W = 240, H = 210, L = 38, B = 30, pw = W - L - 14, ph = H - B - 12;
  var xs = function (k) { return L + k * pw / (npts + 1); };
  var ys = function (v) { return B + ph - v * ph / yMax; };
  var fig = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="240" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points of an arithmetic sequence">';
  fig += '<line x1="' + L + '" y1="' + (B + ph) + '" x2="' + (L + pw) + '" y2="' + (B + ph) + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  fig += '<line x1="' + L + '" y1="' + B + '" x2="' + L + '" y2="' + (B + ph) + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  for (var g = 0; g <= yMax; g += 5) {
    fig += '<line x1="' + L + '" y1="' + ys(g) + '" x2="' + (L + pw) + '" y2="' + ys(g) + '" stroke="' + FIG_INK + '" stroke-width="0.4" opacity="0.3"/>';
    fig += _txt(L - 6, ys(g) + 4, String(g), 10, false, "end");
  }
  for (var k = 1; k <= npts; k++) {
    var v = t1 + (k - 1) * d;
    fig += '<circle cx="' + fmt(xs(k), 1) + '" cy="' + fmt(ys(v), 1) + '" r="4" fill="' + FIG_ACC + '"/>';
    fig += _txt(xs(k), B + ph + 16, String(k), 10, false, "middle");
  }
  fig += _txt(L + pw / 2, H - 4, "n (term number)", 11, false, "middle");
  fig += _txt(10, B + ph / 2, "t_n", 11, true, "middle");
  fig += '</svg>';
  var key = "Slope = " + d + " and y-intercept = " + (t1 - d);
  var cands = [
    "Slope = " + d + " and y-intercept = " + t1,
    "Slope = " + (t1 - d) + " and y-intercept = " + d,
    "Slope = " + d + " and y-intercept = " + (t1 + d),
    "Slope = " + t1 + " and y-intercept = " + (t1 - d),
    "Slope = " + (d + 1) + " and y-intercept = " + (t1 - d)
  ];
  var dis = u9dist3(key, cands);
  var prompt = "The first " + (npts === 5 ? "five" : "six") + " terms of an arithmetic sequence are plotted below as points \\((n, t_n)\\). The points lie on a straight line. What are the slope and the y-intercept of that line?";
  var sol = "Each step from one term to the next adds the common difference \\(d = " + d + "\\), so the slope of the line is \\(" + d + "\\). The general term is \\(t_n = " + t1 + " + (n - 1)(" + d + ") = " + u9lin(d, t1 - d) + "\\), which has the form \\(t_n = dn + (t_1 - d)\\): the line meets the vertical axis where \\(n = 0\\), at \\(" + (t1 - d) + "\\). So the slope is \\(" + d + "\\) and the y-intercept is \\(" + (t1 - d) + "\\).";
  var q = mcq(prompt, key, dis, sol, { t1: t1, d: d, npts: npts });
  q.figure = fig;
  return q;
});

/* ---- 4.58, 4.61, 4.67: derivation steps and sequence combinations (variant set) ---- */
E("u9-derive-formulas", 9, ["4.58", "4.61", "4.67"], 3, "var", varset([
  function () {
    var key = "\\(2S_n = n\\left(t_1 + t_n\\right)\\)";
    var dis = ["\\(2S_n = t_1 + t_n\\)", "\\(2S_n = 2n\\left(t_1 + t_n\\right)\\)", "\\(2S_n = n\\left(t_n - t_1\\right)\\)"];
    var prompt = "A student derives a formula for the sum of an arithmetic series by writing the sum in reverse order underneath itself and adding the two rows, pairing the first term with the last. The series has \\(n\\) terms, first term \\(t_1\\) and last term \\(t_n\\). What does the addition produce?";
    var sol = "In each column, the pair of terms adds to \\(t_1 + t_n\\): the lower row runs from \\(t_n\\) down to \\(t_1\\), so as the top term grows by \\(d\\), the bottom term shrinks by \\(d\\). There are \\(n\\) columns, so the combined sum is \\(n\\) copies of \\(t_1 + t_n\\). But the combined sum is also \\(S_n + S_n = 2S_n\\), giving \\(2S_n = n(t_1 + t_n)\\), and dividing by 2 produces the sum formula.";
    return mcq(prompt, key, dis, sol, { variant: "arithPair" });
  },
  function () {
    var key = "\\(t_1\\left(1 - r^n\\right)\\)";
    var dis = ["\\(t_1\\left(1 - r^{n-1}\\right)\\)", "\\(t_1\\left(r^n - 1\\right)\\)", "\\(t_1\\left(1 - r\\right)\\)"];
    var prompt = "To derive a formula for the sum of a geometric series, a student writes \\(S_n = t_1 + t_1 r + t_1 r^2 + \\cdots + t_1 r^{n-1}\\), multiplies the whole equation by \\(r\\), and then works out \\(S_n - rS_n\\). What is the result of that subtraction?";
    var sol = "Multiplying by \\(r\\) shifts every term one place: \\(rS_n = t_1 r + t_1 r^2 + \\cdots + t_1 r^n\\). In the subtraction, all the middle terms appear in both rows and cancel. Only the first term of the top row and the last term of the bottom row survive: \\(S_n - rS_n = t_1 - t_1 r^n = t_1(1 - r^n)\\). Factoring \\(1 - r\\) out of the left side then gives the sum formula.";
    return mcq(prompt, key, dis, sol, { variant: "geoSubtract" });
  },
  function () {
    var key = "It is arithmetic: the general term is \\(3n + 4\\) and the common difference is 3.";
    var dis = [
      "It is arithmetic: the general term is \\(3n + 4\\) and the common difference is 4.",
      "It is arithmetic: the general term is \\(5n + 4\\) and the common difference is 5.",
      "It is not arithmetic, because sequence B is decreasing."
    ];
    var prompt = "Sequence A has general term \\(a_n = 4n - 3\\) and sequence B has general term \\(b_n = 7 - n\\). A new sequence is formed by adding corresponding terms of A and B. Which statement about the new sequence is correct?";
    var sol = "Add the general terms: \\((4n - 3) + (7 - n) = 3n + 4\\). The first few sums are \\(7, 10, 13, \\ldots\\), increasing by exactly 3 each time. Adding two arithmetic sequences always gives an arithmetic sequence whose common difference is the sum of the two differences, here \\(4 + (-1) = 3\\). So the new sequence is arithmetic with general term \\(3n + 4\\) and common difference 3.";
    return mcq(prompt, key, dis, sol, { variant: "sumSeq" });
  },
  function () {
    var key = "It is not arithmetic: the products are 12, 25, 42, and the differences between consecutive products are 13 and 17, which are not equal.";
    var dis = [
      "It is arithmetic, with common difference 13, since the products grow by that amount from each term to the next.",
      "It is arithmetic, with common difference 4, since each factor grows by a fixed amount from each term to the next.",
      "It is not arithmetic, because the product of two sequences can never be an arithmetic sequence, whatever the factors in the two sequences are."
    ];
    var prompt = "Sequence A has general term \\(a_n = 2n + 1\\) and sequence B has general term \\(b_n = n + 3\\). A new sequence is formed by multiplying corresponding terms of A and B. Which statement about the new sequence is correct?";
    var sol = "Compute the first few products: \\(3 \\times 4 = 12\\), \\(5 \\times 5 = 25\\), \\(7 \\times 6 = 42\\). The differences are \\(25 - 12 = 13\\) and \\(42 - 25 = 17\\). Since the differences are not equal, the product sequence is not arithmetic. (Multiplying is not like adding here: the differences grow because both factors grow.)";
    return mcq(prompt, key, dis, sol, { variant: "prodSeq" });
  }
]));

/* ---- 4.62: evaluate two pay offers over several years ---- */
E("u9-evaluate-offers", 9, ["4.62"], 3, "gen", function () {
  var SA, dA, SB, dB, Y, diff, tries = 0;
  do {
    SA = pick([42000, 45000, 48000, 50000, 52000]);
    dA = pick([1500, 1800, 2000, 2200, 2500]);
    var delta = pick([3000, 4000, 5000, 6000]);
    var extra = pick([700, 900, 1100, 1300, 1500]);
    Y = ri(6, 10);
    SB = SA - delta; dB = dA + extra;
    diff = -Y * delta + extra * Y * (Y - 1) / 2;
    tries++;
  } while ((diff < 2000 || diff > 40000) && tries < 300);
  var totA = Y * (2 * SA + (Y - 1) * dA) / 2;
  var totB = Y * (2 * SB + (Y - 1) * dB) / 2;
  var prompt = "Two job offers are on the table. Offer A pays a starting salary of $" + u9money(SA) + " per year, with a raise of $" + u9money(dA) + " at the start of each following year. Offer B pays a starting salary of $" + u9money(SB) + " per year, with a raise of $" + u9money(dB) + " at the start of each following year. Over the first " + Y + " years, how much more does Offer B pay in total than Offer A? Give your answer in dollars.";
  var sol = "Each offer's yearly pay forms an arithmetic sequence, so each total is an arithmetic series with \\(n = " + Y + "\\):"
    + "\\[ \\begin{aligned} \\text{Offer A total} &= \\frac{" + Y + "}{2}\\left(2(" + u9money(SA) + ") + " + (Y - 1) + "(" + u9money(dA) + ")\\right) = " + u9money(totA) + " \\\\ \\text{Offer B total} &= \\frac{" + Y + "}{2}\\left(2(" + u9money(SB) + ") + " + (Y - 1) + "(" + u9money(dB) + ")\\right) = " + u9money(totB) + " \\end{aligned} \\]"
    + "Offer B starts lower but its larger raises overtake A: it pays $" + u9money(diff) + " more over the " + Y + " years.";
  return numq(prompt, diff, 0.01, sol, { SA: SA, dA: dA, SB: SB, dB: dB, Y: Y });
});

/* ---- 4.59, 4.60: when does the faster-growing sequence catch up? ---- */
E("u9-crossover", 9, ["4.59", "4.60"], 3, "gen", function () {
  var CTX = [
    { key: "clubs", unit: "month",
      text: "Two curling clubs record their memberships at the start of each month. Club A starts with {A0} members and gains {dA} members each month. Club B starts with {B0} members and gains {dB} members each month. In which month does Club B first have more members than Club A?",
      A0: [240, 800], gap: [60, 280], dA: [8, 24], gain: [6, 26] },
    { key: "jars", unit: "week",
      text: "Mina and Theo each start a savings jar in week 1. Mina's jar starts with ${A0} and she adds ${dA} each week. Theo's jar starts with ${B0} and he adds ${dB} each week. In which week does Theo's jar first contain more money than Mina's?",
      A0: [60, 200], gap: [20, 90], dA: [5, 15], gain: [3, 12] },
    { key: "seedlings", unit: "week",
      text: "Two tomato seedlings are measured at the start of each week. Plant A starts at {A0} cm tall and grows {dA} cm each week. Plant B starts at {B0} cm tall and grows {dB} cm each week. In which week is Plant B first taller than Plant A?",
      A0: [18, 40], gap: [4, 14], dA: [2, 5], gain: [1, 4] }
  ];
  var c, A0, B0, dA, dB, n, tries = 0;
  do {
    c = pick(CTX);
    A0 = ri(c.A0[0], c.A0[1]);
    var gap = ri(c.gap[0], c.gap[1]);
    dA = ri(c.dA[0], c.dA[1]);
    var gain = ri(c.gain[0], c.gain[1]);
    B0 = A0 - gap; dB = dA + gain;
    n = Math.floor(gap / gain) + 2;
    tries++;
  } while ((n < 4 || n > 30 || B0 <= 0) && tries < 300);
  var prompt = c.text.replace("{A0}", A0).replace("{B0}", B0).replace("{dA}", dA).replace("{dB}", dB);
  var aPrev = A0 + (n - 2) * dA, bPrev = B0 + (n - 2) * dB;
  var aNow = A0 + (n - 1) * dA, bNow = B0 + (n - 1) * dB;
  var sol = "Both amounts form arithmetic sequences. The gap between them starts at \\(" + (A0 - B0) + "\\) and closes by \\(" + dB + " - " + dA + " = " + (dB - dA) + "\\) each " + c.unit + ". B first moves ahead when \\((n - 1)(" + (dB - dA) + ") > " + (A0 - B0) + "\\), which first happens at \\(n = " + n + "\\). Checking the two " + c.unit + "s either side: in " + c.unit + " " + (n - 1) + " the amounts are \\(" + aPrev + "\\) and \\(" + bPrev + "\\) (B still behind), and in " + c.unit + " " + n + " they are \\(" + aNow + "\\) and \\(" + bNow + "\\), so B is first ahead in " + c.unit + " " + n + ".";
  return numq(prompt, n, 0.01, sol, { ctx: c.key, A0: A0, B0: B0, dA: dA, dB: dB });
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u9-pk-pattern-word: borrowed verbatim from math-9 entry u6-pattern-word-total (math-9:7.1). */
E("u9-pk-pattern-word",9,["4.57"], 1, "gen", function () {
  var S = ri(4, 48), r = ri(2, 9), N = ri(11, 30);
  var ctx = pick([
    "A savings jar starts with $" + S + ". Each week, $" + r + " is added to the jar. How much money, in dollars, is in the jar after " + N + " weeks?",
    "A tomato plant is " + S + " cm tall. It grows " + r + " cm each week. How tall, in centimetres, is the plant after " + N + " weeks?",
    "A reader has finished " + S + " pages of a novel. She reads " + r + " more pages each day. How many pages has she finished after " + N + " days?",
    "A water tank holds " + S + " litres. A hose adds " + r + " litres each hour. How many litres are in the tank after " + N + " hours?"
  ]);
  var ans = S + r * N;
  var sol = "Start with the opening amount, then add the step once for each stage: \\[ \\begin{aligned} \\text{total} &= " + S + " + " + fmt(r) + " \\times " + N + " \\\\ &= " + S + " + " + fmt(r * N) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the total after " + N + " stages is <b>" + fmt(ans) + "</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "pattern-word-total", S: S, r: r, N: N });
}, ["The total is the start amount plus the step, added once for each stage.", "First multiply the step by the number of stages."]);

/* u9-pk-pattern-figure: borrowed verbatim from math-9 entry u6-pattern-figure-expr (math-9:7.1). */
E("u9-pk-pattern-figure",9,["4.57"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + n6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + n6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + n6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = n6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);

/* u9-pk-table-equation: borrowed verbatim from math-9 entry u6-table-equation (math-9:7.4). */
E("u9-pk-table-equation",9,["4.57"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + n6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + n6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + n6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + n6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);

/* u9-pk-context-equation: borrowed verbatim from math-9 entry u6-context-equation (math-9:7.2). */
E("u9-pk-context-equation",9,["4.60"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "A taxi ride costs a base fee of $" + B + " plus $" + R + " for each kilometre driven. Let \\(x\\) be the number of kilometres and \\(y\\) be the total cost in dollars.",
    "A gym charges a sign-up fee of $" + B + " plus $" + R + " for each class attended. Let \\(x\\) be the number of classes and \\(y\\) be the total cost in dollars.",
    "A plumber charges a call-out fee of $" + B + " plus $" + R + " for each hour of work. Let \\(x\\) be the number of hours and \\(y\\) be the total cost in dollars.",
    "A snack cart charges $" + B + " for a tray plus $" + R + " for each drink on it. Let \\(x\\) be the number of drinks and \\(y\\) be the total cost in dollars."
  ]);
  var corr = "\\(y = " + n6lin(R, B, "x") + "\\)";
  var sol = "The fee of $" + B + " is paid once, and the $" + R + " charge is paid \\(x\\) times: \\[ \\begin{aligned} y &= " + B + " + " + fmt(R) + "x \\end{aligned} \\] So the equation is <b>" + corr + "</b>.";
  return mcq(ctx + " Which equation gives \\(y\\)?",
    { t: corr, fb: "Correct. The one-time fee is the start value and the per-unit charge is the step." },
    [
      { t: "\\(y = " + n6lin(B, R, "x") + "\\)", fb: "That swaps the two amounts. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "That adds the rate instead of multiplying it by the number of units." },
      { t: "\\(y = " + fmt(B + R) + "x\\)", fb: "That adds the fee and the rate together and multiplies the sum by x, so the fee gets charged every unit." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Decide which amount is paid once and which amount is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount stands alone."]);

/* u9-pk-fn-notation: borrowed verbatim from math-1201 entry u4-fn-notation (math-1201:4.45). */
E("u9-pk-fn-notation",9,["4.57"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* u9-pk-solve-input: borrowed verbatim from math-1201 entry u4-solve-input (math-1201:4.48). */
E("u9-pk-solve-input",9,["4.58"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* u9-pk-laws-integral: borrowed verbatim from math-1201 entry u2-laws-integral (math-1201:1.6). */
E("u9-pk-laws-integral",9,["4.65"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var a=ri(2,9),b=ri(2,9),t=0;
    while((a*b===a+b||Math.abs(a-b)===a+b||a+b+1===a*b)&&t<100){a=ri(2,9);b=ri(2,9);t++;}
    var key="\\(x^{"+(a+b)+"}\\)";
    var ds=u2pickS3(key,["\\(x^{"+(a*b)+"}\\)","\\(x^{"+Math.abs(a-b)+"}\\)","\\(x^{"+(a+b+1)+"}\\)","\\(x^{"+(a+b-1)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a+"} \\times x^{"+b+"}\\)",
      key,ds,
      "When multiplying powers with the same base, add the exponents: \\["+
      "\\begin{aligned} x^{"+a+"} \\times x^{"+b+"} &= x^{"+a+" + "+b+"} \\\\ &= x^{"+(a+b)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a+b)+"}\\)</b>.",
      {mode:mode,a:a,b:b,keyStr:key});
  }
  if(mode===2){
    var a2=ri(5,12),b2=ri(2,10),t2=0;
    while((a2-b2<1||a2+b2===a2||a2-b2+1===a2)&&t2<100){a2=ri(5,12);b2=ri(2,a2-2);t2++;}
    var key2="\\(x^{"+(a2-b2)+"}\\)";
    var ds2=u2pickS3(key2,["\\(x^{"+(a2+b2)+"}\\)","\\(x^{"+a2+"}\\)","\\(x^{"+(a2-b2+1)+"}\\)","\\(x^{"+(a2*b2)+"}\\)"]);
    return mcq("Simplify: \\("+FR("x^{"+a2+"}","x^{"+b2+"}")+"\\)",
      key2,ds2,
      "When dividing powers with the same base, subtract the exponents: \\["+
      "\\begin{aligned} "+FR("x^{"+a2+"}","x^{"+b2+"}")+" &= x^{"+a2+" - "+b2+"} \\\\ &= x^{"+(a2-b2)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a2-b2)+"}\\)</b>.",
      {mode:mode,a:a2,b:b2,keyStr:key2});
  }
  if(mode===3){
    var a3=ri(2,4),b3=ri(2,4);
    if(a3===2&&b3===2)a3=3;
    var key3="\\(x^{"+(a3*b3)+"}\\)";
    var ds3=u2pickS3(key3,["\\(x^{"+(a3+b3)+"}\\)","\\(x^{"+Math.pow(a3,b3)+"}\\)","\\(x^{"+Math.pow(b3,a3)+"}\\)","\\(x^{"+(a3*b3+2)+"}\\)"]);
    return mcq("Simplify: \\(\\left(x^{"+a3+"}\\right)^{"+b3+"}\\)",
      key3,ds3,
      "When a power is raised to a power, multiply the exponents: \\["+
      "\\begin{aligned} \\left(x^{"+a3+"}\\right)^{"+b3+"} &= x^{"+a3+" \\times "+b3+"} \\\\ &= x^{"+(a3*b3)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a3*b3)+"}\\)</b>.",
      {mode:mode,a:a3,b:b3,keyStr:key3});
  }
  if(mode===4){
    var a4=ri(2,6);
    var key4="\\(x^{"+a4+"}y^{"+a4+"}\\)";
    var ds4=u2pickS3(key4,["\\(x^{"+a4+"}y\\)","\\(xy^{"+a4+"}\\)","\\((xy)^{"+(a4*a4)+"}\\)"]);
    return mcq("Simplify: \\((xy)^{"+a4+"}\\)",
      key4,ds4,
      "A power of a product applies the exponent to each factor: \\["+
      "\\begin{aligned} (xy)^{"+a4+"} &= x^{"+a4+"}y^{"+a4+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+a4+"}y^{"+a4+"}\\)</b>.",
      {mode:mode,a:a4,keyStr:key4});
  }
  if(mode===5){
    var a5=ri(3,8),b5=ri(3,8),c5=ri(3,8),d5=ri(3,8);
    var key5="\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)";
    var ds5=u2pickS3(key5,["\\(x^{"+(a5*c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5+c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5*c5)+"}y^{"+(b5+d5)+"}\\)","\\(x^{"+Math.abs(a5-c5)+"}y^{"+(b5+d5)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"}\\)",
      key5,ds5,
      "Group the powers base by base and add exponents for each base: \\["+
      "\\begin{aligned} x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"} &= x^{"+a5+" + "+c5+"}y^{"+b5+" + "+d5+"} \\\\ &= x^{"+(a5+c5)+"}y^{"+(b5+d5)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)</b>.",
      {mode:mode,a:a5,b:b5,c:c5,d:d5,keyStr:key5});
  }
  var b6=ri(2,8),c6=pick([3,4,5,6,7]);
  var key6="\\("+c6+"y^{"+b6+"}\\)";
  var ds6=u2pickS3(key6,["\\(0\\)","\\("+c6+"xy^{"+b6+"}\\)","\\(y^{"+b6+"}\\)"]);
  return mcq("Simplify: \\("+c6+"x^0y^{"+b6+"}\\)",
    key6,ds6,
    "Any nonzero base to the exponent \\(0\\) equals \\(1\\), so \\(x^0 = 1\\) and the factor \\(x\\) drops out without changing the coefficient: \\["+
    "\\begin{aligned} "+c6+"x^0y^{"+b6+"} &= "+c6+"(1)y^{"+b6+"} \\\\ &= "+c6+"y^{"+b6+"} \\end{aligned} \\]"+
    " The simplified form is <b>\\("+c6+"y^{"+b6+"}\\)</b>.",
    {mode:mode,b:b6,c:c6,keyStr:key6});
});

/* u9-pk-growth: authored micro-item (authored:percent-growth-repeated-multiplication),
   written for this tranche. */
E("u9-pk-growth",9,["4.65"],2,"gen",function(){
  if(ri(0,1)===0){
    var pair=pick([[800,5],[500,10],[1000,20],[400,25],[200,50],[1200,5],[600,10],[250,20],[900,10],[800,25]]);
    var P=pair[0], r=pair[1], g=1+r/100;
    var y1=P*g, y2=y1*g;
    return numq("A town has "+P+" people. Its population grows by "+r+"% each year. How many people will there be after 2 years?",
      Math.round(y2*100)/100,0.01,
      "Growing by "+r+"% means multiplying by \\(1 + "+r+"\\% = "+fmt(g)+"\\), once for each year. After 1 year: \\("+P+" \\times "+fmt(g)+" = "+fmt(y1)+"\\). After 2 years: \\("+fmt(y1)+" \\times "+fmt(g)+" = "+fmt(y2)+"\\). There will be <b>"+fmt(y2)+" people</b>.",
      {mode:"percent",P:P,r:r,ans:y2});
  }
  var s=pick([20,25,30,40,50,60]), f=pick([2,3]), ans=s*f*f*f;
  return numq("A rumour starts with "+s+" people who have heard it. Each day, the number of people who have heard it is multiplied by "+f+". How many people have heard it after 3 days?",
    ans,0.01,
    "Multiply by "+f+" once for each day: \\("+s+" \\times "+f+" = "+(s*f)+"\\), then \\("+(s*f)+" \\times "+f+" = "+(s*f*f)+"\\), then \\("+(s*f*f)+" \\times "+f+" = "+ans+"\\). After 3 days, <b>"+ans+" people</b> have heard it.",
    {mode:"repeated",s:s,f:f,ans:ans});
}, ["Growth by a percent is repeated multiplication, not repeated addition.", "Work one year (or one day) at a time."]);

/* PK tranche pass for Unit 9. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U9_FOR=["4.55","4.56","4.57","4.58","4.59","4.60","4.61","4.62","4.63","4.64","4.65","4.66","4.67","4.68","4.69","4.70","4.71"];
var PKT_U9={
 "u9-pk-pattern-word":{src:"math-9:7.1",group:"patterns"},
 "u9-pk-pattern-figure":{src:"math-9:7.1",group:"patterns"},
 "u9-pk-table-equation":{src:"math-9:7.4",group:"patterns"},
 "u9-pk-context-equation":{src:"math-9:7.2",group:"patterns"},
 "u9-pk-fn-notation":{src:"math-1201:4.45",group:"function-notation"},
 "u9-pk-solve-input":{src:"math-1201:4.48",group:"isolate-variable"},
 "u9-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u9-pk-growth":{src:"authored:percent-growth-repeated-multiplication",group:"growth-percent"}
};
BANK.forEach(function(e){var t=PKT_U9[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U9_FOR.slice();e.pkGroup=t.group;}});
