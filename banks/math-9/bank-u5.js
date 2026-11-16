// Math 9 Unit 5 Linear Equations and Inequalities question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 2522 to 3263); the slice
// opens with the source's final-scope tranche header comment.
// CRMARKS: u5-solve-two-step=3
// CRMARKS: u5-solve-brackets-both=3
// CRMARKS: u5-verify-error=2
// CRMARKS: u5-word-two-step=3
// CRMARKS: u5-word-brackets=2
// CRMARKS: u5-list-satisfies=2
// CRMARKS: u5-solve-ineq-addsub=3
/* Final-scope tranche (Units 5 to 9), November 7, 2026: appended from
   tranche2/unit5.js to unit9.js. CR_MARKS extended to 63 entries. */
// Unit 5: Linear Equations and Inequalities (Math 9, NL). Entries only; helpers prefixed u5.
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5fracTex(p, q) { if (q < 0) { p = -p; q = -q; } var g = u5gcd(p, q); p /= g; q /= g; if (q === 1) return fmt(p); if (p < 0) return "-" + FR(-p, q); return FR(p, q); }
function u5lin(a, b) { var s; if (a === 1) s = "x"; else if (a === -1) s = "-x"; else s = fmt(a) + "x"; if (b > 0) s += "+" + fmt(b); else if (b < 0) s += "-" + fmt(-b); return s; }
function u5sym(r) { return r === "le" ? "\\le" : r === "ge" ? "\\ge" : r === "lt" ? "<" : ">"; }
function u5flip(r) { return r === "lt" ? "gt" : r === "gt" ? "lt" : r === "le" ? "ge" : "le"; }
function u5holds(v, r, k) { return r === "lt" ? v < k : r === "gt" ? v > k : r === "le" ? v <= k : v >= k; }
function u5ineqTex(v, r, rhs) { return "\\(" + v + " " + u5sym(r) + " " + rhs + "\\)"; }
function u5line(k, closed, dir) {
  var lo = k - 4, W = 320, H = 72, cy = 38;
  function X(v) { return 20 + (v - lo) * 35; }
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Number line graph">';
  s += '<line x1="8" y1="' + cy + '" x2="312" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<polygon points="312,' + cy + ' 302,' + (cy - 4) + ' 302,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<polygon points="8,' + cy + ' 18,' + (cy - 4) + ' 18,' + (cy + 4) + '" fill="' + FIG_INK + '"/>';
  for (var v = lo; v <= k + 4; v++) { s += '<line x1="' + X(v) + '" y1="' + (cy - 5) + '" x2="' + X(v) + '" y2="' + (cy + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (cy + 22) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + fmt(v) + '</text>'; }
  var ex = dir === "right" ? 306 : 14;
  s += '<line x1="' + X(k) + '" y1="' + cy + '" x2="' + ex + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="4"/>';
  if (dir === "right") s += '<polygon points="' + ex + ',' + cy + ' ' + (ex - 9) + ',' + (cy - 5) + ' ' + (ex - 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  else s += '<polygon points="' + ex + ',' + cy + ' ' + (ex + 9) + ',' + (cy - 5) + ' ' + (ex + 9) + ',' + (cy + 5) + '" fill="' + FIG_ACC + '"/>';
  s += '<circle cx="' + X(k) + '" cy="' + cy + '" r="6" fill="' + (closed ? FIG_INK : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  return s + '</svg>';
}
function u5balance(a, b, c) {
  var W = 340, H = 178, panY = 118;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Balance model">';
  s += '<line x1="18" y1="34" x2="322" y2="34" stroke="' + FIG_INK + '" stroke-width="3"/>';
  s += '<polygon points="170,34 156,66 184,66" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  s += '<rect x="160" y="66" width="20" height="8" fill="' + FIG_INK + '"/>';
  function pan(cx, nx, nu) {
    var w = nx * 27 + nu * 17, x = cx - w / 2, out = "";
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx - 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + cx + '" y1="34" x2="' + (cx + 62) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
    out += '<line x1="' + (cx - 72) + '" y1="' + panY + '" x2="' + (cx + 72) + '" y2="' + panY + '" stroke="' + FIG_INK + '" stroke-width="3"/>';
    var bx = x;
    for (var i = 0; i < nx; i++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 26) + '" width="24" height="26" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 12, 1) + '" y="' + (panY - 13) + '" font-size="13" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">x</text>'; bx += 27; }
    for (var j = 0; j < nu; j++) { out += '<rect x="' + fmt(bx, 1) + '" y="' + (panY - 16) + '" width="14" height="16" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + fmt(bx + 7, 1) + '" y="' + (panY - 8) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle" dominant-baseline="central">1</text>'; bx += 17; }
    return out;
  }
  s += pan(85, a, b);
  s += pan(255, 0, c);
  s += '<text x="85" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">left pan</text>';
  s += '<text x="255" y="140" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">right pan</text>';
  s += '<text x="170" y="164" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">The pans balance, so the two sides are equal.</text>';
  return s + '</svg>';
}

// 1. L1, 8.17: balance model shows an equation.
E("u5-balance-model", 5, ["8.17"], 1, "gen", function () {
  var a = ri(1, 3), b = ri(1, 4), c = ri(b + 2, 10);
  function eq(x, y, z) { return "\\(" + u5lin(x, y) + "=" + fmt(z) + "\\)"; }
  var corr = eq(a, b, c);
  var cands = [
    { t: eq(a, c, b), fb: "That swaps the unit blocks: the left pan has " + fmt(b) + " unit blocks and the right pan has " + fmt(c) + "." },
    { t: eq(b, a, c), fb: "That swaps the counts: there are " + fmt(a) + " x blocks and " + fmt(b) + " unit blocks on the left pan." },
    { t: eq(a + 1, b, c), fb: "That counts one x block too many; the left pan shows " + fmt(a) + " x blocks." },
    { t: eq(a, b, c + 1), fb: "That counts one unit block too many on the right pan; it shows " + fmt(c) + "." },
    { t: eq(a, b + 1, c), fb: "That counts one unit block too many on the left pan; it shows " + fmt(b) + "." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the blocks on each pan: \\[ \\begin{aligned} \\text{left pan} &= " + fmt(a) + " \\text{ x blocks} + " + fmt(b) + " \\text{ unit blocks} \\\\ \\text{right pan} &= " + fmt(c) + " \\text{ unit blocks} \\end{aligned} \\] The pans balance, so the model shows <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a balance model. Each large block is labelled x and each small block is labelled 1. The pans balance. Which equation does the model show?", { t: corr, fb: "Correct: the left pan gives the x terms and units, and the right pan gives the total." }, ds, sol, { mode: "balance", a: a, b: b, c: c });
  q.figure = u5balance(a, b, c);
  return q;
}, ["Count the blocks on the left pan first: x blocks give the x term, small blocks give the constant.", "The left pan is one side of the equation and the right pan is the other side."]);

// 2. L2, 8.18, CR 3: solve two-step equations, three forms.
E("u5-solve-two-step", 5, ["8.18"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);

// 3. L3, 8.18, CR 3: brackets and variables on both sides.
E("u5-solve-brackets-both", 5, ["8.18"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    if (Math.random() < 0.5) {
      var a = ri(2, 4), b = ri(2, 5), c = ri(-6, 6), d = ri(2, 4), e = ri(1, 4), f = ri(-6, 6);
      var den = a * b - d * e, num = d * f - a * c;
      if (den === 0 || num % den !== 0) continue;
      var x0 = num / den;
      if (x0 === 0 || Math.abs(x0) > 9) continue;
      var sol = "Expand both brackets, then collect terms: \\[ \\begin{aligned} " + a + "(" + u5lin(b, c) + ") &= " + d + "(" + u5lin(e, f) + ") \\\\ " + u5lin(a * b, a * c) + " &= " + u5lin(d * e, d * f) + " \\\\ " + fmt(den) + "x &= " + fmt(num) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
      return numq("Solve the equation \\(" + a + "(" + u5lin(b, c) + ") = " + d + "(" + u5lin(e, f) + ")\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "brackets", a: a, b: b, c: c, d: d, e: e, f: f });
    }
    var a1 = ri(2, 9), c1 = ri(2, 9), b1 = ri(-12, 12), d1 = ri(-12, 12);
    if (a1 === c1) continue;
    var den1 = a1 - c1, num1 = d1 - b1;
    if (num1 % den1 !== 0) continue;
    var x1 = num1 / den1;
    if (x1 === 0 || Math.abs(x1) > 9) continue;
    var sol1 = "Collect the x terms on one side and the constants on the other: \\[ \\begin{aligned} " + u5lin(a1, b1) + " &= " + u5lin(c1, d1) + " \\\\ " + fmt(den1) + "x &= " + fmt(num1) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a1, b1) + " = " + u5lin(c1, d1) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol1, { mode: "both-sides", a: a1, b: b1, c: c1, d: d1 });
  }
  return numq("Solve the equation \\(5x + 3 = 2x + 12\\). What is the value of \\(x\\)?", 3, 0.01, "Collect terms: \\[ \\begin{aligned} 5x+3 &= 2x+12 \\\\ 3x &= 9 \\\\ x &= 3 \\end{aligned} \\] So the solution is <b>\\(x = 3\\)</b>.", { mode: "both-sides", a: 5, b: 3, c: 2, d: 12 });
}, ["Expand any brackets first, then gather all the x terms on one side.", "First expand the brackets so every term is visible, then collect x terms and constants separately."]);

// 4. L1, 8.19: solve by inspection.
E("u5-inspection-basic", 5, ["8.19"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 6;
    var b = a * x0;
    var cands = [
      { t: fmt(x0 + a), fb: "That is too big: " + fmt(a) + " times that value is more than " + fmt(b) + "." },
      { t: fmt(x0 - a), fb: "That is too small: " + fmt(a) + " times that value is less than " + fmt(b) + "." },
      { t: fmt(x0 + 1), fb: "Close, but " + fmt(a) + " times that value does not equal " + fmt(b) + "." },
      { t: fmt(-x0), fb: "Watch the sign: " + fmt(a) + " times that value gives the opposite sign." },
      { t: fmt(a), fb: "That is the multiplier itself, not the value that works." }
    ];
    var ds = u5pick3(fmt(x0), cands);
    var sol = "Ask what number multiplied by \\(" + fmt(a) + "\\) gives \\(" + fmt(b) + "\\): \\[ \\begin{aligned} " + fmt(a) + " \\times " + fmt(x0) + " &= " + fmt(b) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return mcq("Solve \\(" + fmt(a) + "x = " + fmt(b) + "\\) by inspection. Inspection means spotting the value that works, without written steps.", { t: fmt(x0), fb: "Correct: " + fmt(a) + " times that value equals " + fmt(b) + "." }, ds, sol, { mode: "ax=b", a: a, b: b });
  }
  var a2 = ri(2, 6), b2 = ri(-8, 8); if (b2 === 0) b2 = 5;
  var x1 = a2 * b2;
  var cands2 = [
    { t: fmt(x1 + a2), fb: "That is too big: dividing it by " + fmt(a2) + " gives more than " + fmt(b2) + "." },
    { t: fmt(x1 - a2), fb: "That is too small: dividing it by " + fmt(a2) + " gives less than " + fmt(b2) + "." },
    { t: fmt(b2), fb: "That is the result of the division, not the starting value." },
    { t: fmt(-x1), fb: "Watch the sign: dividing that value by " + fmt(a2) + " gives the opposite sign." }
  ];
  var ds2 = u5pick3(fmt(x1), cands2);
  var sol2 = "Ask what number divided by \\(" + fmt(a2) + "\\) gives \\(" + fmt(b2) + "\\): \\[ \\begin{aligned} " + fmt(x1) + " \\div " + fmt(a2) + " &= " + fmt(b2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
  return mcq("Solve \\(" + FR("x", a2) + " = " + fmt(b2) + "\\) by inspection. Inspection means spotting the value that works, without written steps.", { t: fmt(x1), fb: "Correct: that value divided by " + fmt(a2) + " equals " + fmt(b2) + "." }, ds2, sol2, { mode: "x/a=b", a: a2, b: b2 });
}, ["Think of the multiplication or division fact hiding in the equation.", "First ask: what number, times the coefficient (or divided by it), gives the right side?"]);

// 5. L2, 8.19: systematic trial with tried values shown.
E("u5-trial-table", 5, ["8.19"], 1, "gen", function () {
  var a = ri(2, 6), x0 = ri(3, 9), b = ri(1, 9);
  var c = a * x0 + b, v1 = a * (x0 - 2) + b, v2 = a * (x0 - 1) + b, v3 = a * (x0 + 1) + b;
  var prompt = "Sam is solving \\(" + u5lin(a, b) + " = " + fmt(c) + "\\) by systematic trial, trying one value at a time. Trying \\(x = " + fmt(x0 - 2) + "\\) gives a left side of " + fmt(v1) + ". Trying \\(x = " + fmt(x0 - 1) + "\\) gives a left side of " + fmt(v2) + ". Which value solves the equation?";
  var cands = [
    { t: fmt(x0 - 1), fb: "That value was already tried: it gives " + fmt(v2) + ", not " + fmt(c) + "." },
    { t: fmt(x0 - 2), fb: "That value was already tried: it gives " + fmt(v1) + ", not " + fmt(c) + "." },
    { t: fmt(x0 + 1), fb: "That goes one too far: it gives a left side of " + fmt(v3) + ", past the target." }
  ];
  var sol = "The left side grows by \\(" + fmt(a) + "\\) each time x grows by 1, and it still needs to grow from \\(" + fmt(v2) + "\\) to \\(" + fmt(c) + "\\): \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\text{ when } x = " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq(prompt, { t: fmt(x0), fb: "Correct: substituting it makes the left side equal " + fmt(c) + "." }, cands, sol, { mode: "trial", a: a, b: b, c: c });
}, ["Look at how the left side changes from one tried value to the next.", "First find how far the last tried value is from the target, and how much each step of 1 in x adds."]);

// 6. L1, 8.20: choose the value that is the solution.
E("u5-which-is-solution", 5, ["8.20"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + u5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);

// 7. L2, 8.20, CR 2: a shown check with a wrong verdict or a slip.
E("u5-verify-error", 5, ["8.20"], 2, "gen", function () {
  var a = ri(2, 6), x0 = ri(-5, 8), b = ri(-8, 8);
  var c = a * x0 + b, w = x0 + pick([-2, -1, 1, 2]);
  var trueL = a * w + b;
  if (Math.random() < 0.5) {
    var promptA = "A student checks whether \\(x = " + fmt(w) + "\\) solves \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). The student substitutes and correctly gets a left side of " + fmt(trueL) + ", then writes: this matches, so \\(x = " + fmt(w) + "\\) is the solution. Give the correct conclusion about this check.";
    var corrA = "The arithmetic is correct, but " + fmt(trueL) + " does not equal " + fmt(c) + ", so \\(x = " + fmt(w) + "\\) is not the solution.";
    var dsA = [
      { t: "The check is fully correct, and \\(x = " + fmt(w) + "\\) is the solution of the equation, exactly as written.", fb: "Look again at the two values: the left side and the right side are different numbers." },
      { t: "The substitution has an arithmetic slip, and fixing it shows \\(x = " + fmt(w) + "\\) is the solution.", fb: "The substitution itself was worked out correctly; the mistake is in the conclusion drawn from it." },
      { t: "Any value that is substituted into an equation is automatically a solution of it.", fb: "Substitution is only the test; the value is a solution only when both sides come out equal." }
    ];
    var solA = "Compare the two sides after substitution: \\[ \\begin{aligned} \\text{left side} &= " + fmt(trueL) + " \\\\ \\text{right side} &= " + fmt(c) + " \\end{aligned} \\] The sides are not equal, so the correct conclusion is that <b>" + corrA + "</b>";
    return mcq(promptA, { t: corrA, fb: "Correct: a solution must make the two sides equal, and here they are not." }, dsA, solA, { mode: "wrong-verdict", a: a, b: b, c: c, w: w });
  }
  var fakeL = c;
  var promptB = "A student checks whether \\(x = " + fmt(w) + "\\) solves \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). The student writes the left side as " + fmt(fakeL) + " and concludes that \\(x = " + fmt(w) + "\\) is the solution. Give the correct conclusion about this check.";
  var corrB = "There is an arithmetic slip: the left side is really " + fmt(trueL) + ", not " + fmt(c) + ", so \\(x = " + fmt(w) + "\\) is not the solution.";
  var dsB = [
    { t: "The check is fully correct, and \\(x = " + fmt(w) + "\\) is the solution of the equation, with both sides equal.", fb: "Redo the substitution yourself: the left side does not come out to the value the student wrote." },
    { t: "The arithmetic is correct, but the two sides are still not equal, so it is not the solution here.", fb: "The stated left side is wrong; recomputing the substitution gives a different value." },
    { t: "Any value that is substituted into an equation is automatically a solution of it in every case.", fb: "Substitution is only the test; the value is a solution only when both sides come out equal." }
  ];
  var solB = "Redo the substitution carefully: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(w) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(trueL) + " \\end{aligned} \\] The left side is not " + fmt(c) + ", so the correct conclusion is that <b>" + corrB + "</b>";
  return mcq(promptB, { t: corrB, fb: "Correct: recomputing the substitution exposes the slip and the true left side." }, dsB, solB, { mode: "slip", a: a, b: b, c: c, w: w });
}, ["Redo the substitution yourself before judging the student's conclusion.", "First work out the left side with the given value, then compare it with the right side."]);

// 8. L2, 8.21, var: what a solution means in context.
E("u5-meaning-of-solution", 5, ["8.21"], 1, "var", varset([
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 8n+5 &= 53 \\\\ 8n &= 48 \\\\ n &= 6 \\end{aligned} \\] Here n counts tickets, so the solution means <b>you can buy 6 tickets for a total of $53</b>.";
    return mcq("Concert tickets cost $8 each, plus a $5 booking fee paid once. The equation \\(8n + 5 = 53\\) models the total cost, and its solution is \\(n = 6\\). What does the solution mean in this situation?", { t: "You can buy 6 tickets for a total of $53.", fb: "Correct: n counts tickets, and 6 makes the total come to $53." }, [
      { t: "Each ticket costs $6 in the end today.", fb: "The 6 counts tickets; the price of one ticket stays $8." },
      { t: "The booking fee works out to $6 in total.", fb: "The booking fee is the fixed $5; the 6 is the value of n, the number of tickets." },
      { t: "Six friends each pay a $53 fee in all.", fb: "The $53 is the single total cost, not a fee paid by each person." }
    ], sol, { mode: "meaning-tickets" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 3+2h &= 15 \\\\ 2h &= 12 \\\\ h &= 6 \\end{aligned} \\] Here h counts hours, so the solution means <b>after 6 hours, the temperature reaches 15 degrees</b>.";
    return mcq("A cold morning starts at 3 degrees and the temperature rises 2 degrees each hour. The equation \\(3 + 2h = 15\\) models the temperature, and its solution is \\(h = 6\\). What does the solution mean in this situation?", { t: "After 6 hours, the temperature reaches 15 degrees.", fb: "Correct: h counts hours, and 6 makes the temperature come to 15 degrees." }, [
      { t: "The temperature rises 6 degrees each hour all day.", fb: "The rise each hour is the fixed 2 degrees; the 6 is the value of h, the hours." },
      { t: "The temperature starts at 6 degrees early in the morning.", fb: "The starting temperature is the fixed 3 degrees; the 6 counts hours." },
      { t: "It takes 15 hours to reach a temperature of 6 degrees.", fb: "That swaps the two numbers: 15 is the target temperature and 6 is the hours." }
    ], sol, { mode: "meaning-temp" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 20+7w &= 62 \\\\ 7w &= 42 \\\\ w &= 6 \\end{aligned} \\] Here w counts weeks, so the solution means <b>after 6 weeks of saving, Mia has $62</b>.";
    return mcq("Mia has $20 saved and adds $7 each week. The equation \\(20 + 7w = 62\\) models her savings, and its solution is \\(w = 6\\). What does the solution mean in this situation?", { t: "After 6 weeks of saving, Mia has $62.", fb: "Correct: w counts weeks, and 6 makes her savings come to $62." }, [
      { t: "Mia saves $6 each week at her job.", fb: "She saves the fixed $7 each week; the 6 is the value of w, the weeks." },
      { t: "Mia started with $6 saved in a jar.", fb: "She started with the fixed $20; the 6 counts weeks of saving." },
      { t: "Mia will have $6 saved after 62 weeks.", fb: "That swaps the two numbers: 62 dollars is the goal and 6 is the weeks." }
    ], sol, { mode: "meaning-savings" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 2w+18 &= 34 \\\\ 2w &= 16 \\\\ w &= 8 \\end{aligned} \\] Here w is the width in centimetres, so the solution means <b>the width of the rectangle is 8 cm</b>.";
    return mcq("A rectangle has length 9 cm and width w cm. Its perimeter is 34 cm, modelled by \\(2w + 18 = 34\\), and the solution is \\(w = 8\\). What does the solution mean in this situation?", { t: "The width of the rectangle is 8 cm.", fb: "Correct: w measures the width, and 8 cm makes the perimeter come to 34 cm." }, [
      { t: "The perimeter of the rectangle is 8 cm.", fb: "The perimeter is the given 34 cm; the 8 is the value of w, the width." },
      { t: "The length of the rectangle is 8 cm.", fb: "The length is the given 9 cm; w stands for the width only." },
      { t: "The area of the rectangle is 8 square cm.", fb: "The equation models perimeter, not area; the 8 is a length, the width." }
    ], sol, { mode: "meaning-perimeter" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 3s+4 &= 40 \\\\ 3s &= 36 \\\\ s &= 12 \\end{aligned} \\] Here s counts students in one van, so the solution means <b>each van carries 12 students</b>.";
    return mcq("Three vans each carry s students, and 4 more students ride in a car. The equation \\(3s + 4 = 40\\) models the 40 students on a field trip, and its solution is \\(s = 12\\). What does the solution mean in this situation?", { t: "Each van carries 12 students.", fb: "Correct: s counts students per van, and 12 makes the total come to 40." }, [
      { t: "There are 12 vans on the trip.", fb: "There are only 3 vans; the 12 is the value of s, the students in each van." },
      { t: "A total of 12 students went on the trip.", fb: "The total is the given 40 students; the 12 counts students in one van." },
      { t: "The car carries 12 students.", fb: "The car carries the fixed 4 students; the 12 belongs to each van." }
    ], sol, { mode: "meaning-vans" });
  },
  function () {
    var sol = "Solve first, then read the answer back into the story: \\[ \\begin{aligned} 25+0.5g &= 31 \\\\ 0.5g &= 6 \\\\ g &= 12 \\end{aligned} \\] Here g counts gigabytes of data, so the solution means <b>the customer used 12 GB of data that month</b>.";
    return mcq("A phone plan costs $25 a month plus $0.50 for each gigabyte (GB) of data used. The equation \\(25 + 0.5g = 31\\) models one bill, and its solution is \\(g = 12\\). What does the solution mean in this situation?", { t: "The customer used 12 GB of data that month.", fb: "Correct: g counts gigabytes, and 12 makes the bill come to $31." }, [
      { t: "The monthly base cost is $12 on the plan.", fb: "The base cost is the fixed $25; the 12 is the value of g, the gigabytes." },
      { t: "Data costs $12 for each gigabyte of data.", fb: "Data costs the fixed $0.50 per gigabyte; the 12 counts gigabytes used." },
      { t: "The bill covers 12 months of service in a year.", fb: "The equation models a single month; the 12 counts gigabytes, not months." }
    ], sol, { mode: "meaning-phone" });
  }
]), ["Solve or use the given solution, then ask what the variable counts in the story.", "First name what the variable stands for in the story; the solution is that many of those."]);

// 9. L2, 8.22, CR 3: word problem, two-step equation.
E("u5-word-two-step", 5, ["8.22"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(3, 9), n = ri(3, 14), b = ri(2, 12), c = a * n + b;
    var sol = "Let n be the number of tickets. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the group bought <b>" + fmt(n) + " tickets</b>.";
    return numq("A group buys tickets that cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. The total cost is $" + fmt(c) + ". How many tickets did the group buy?", n, 0.01, sol, { mode: "word-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var L = ri(4, 15), w = ri(3, 14), P = 2 * w + 2 * L;
    var sol2 = "Let w be the width. The perimeter gives the equation and its solution: \\[ \\begin{aligned} 2w+" + fmt(2 * L) + " &= " + fmt(P) + " \\\\ 2w &= " + fmt(P - 2 * L) + " \\\\ w &= " + fmt(w) + " \\end{aligned} \\] So the width is <b>" + fmt(w) + " cm</b>.";
    return numq("A rectangle has length " + fmt(L) + " cm and perimeter " + fmt(P) + " cm. What is its width, in centimetres?", w, 0.01, sol2, { mode: "word-perimeter", a: L, b: P });
  }
  var a3 = ri(2, 8), n3 = ri(4, 16), b3 = ri(3, 15), c3 = a3 * n3 + b3;
  var sol3 = "Let n be the number of notebooks. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a3) + "n+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "n &= " + fmt(c3 - b3) + " \\\\ n &= " + fmt(n3) + " \\end{aligned} \\] So Sara bought <b>" + fmt(n3) + " notebooks</b>.";
  return numq("Sara buys notebooks that cost $" + fmt(a3) + " each, plus one pen for $" + fmt(b3) + ". She spends $" + fmt(c3) + " in total. How many notebooks did she buy?", n3, 0.01, sol3, { mode: "word-notebooks", a: a3, b: b3, c: c3 });
}, ["Write an equation for the story first: a rate times the unknown, plus a fixed amount, equals the total.", "First decide what the variable counts, then build the equation from the story."]);

// 10. L3, 8.22, CR 2: word problem, brackets or both sides.
E("u5-word-brackets", 5, ["8.22"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var x0 = ri(3, 12), a = ri(3, 8), c = ri(1, a - 1), b = ri(5, 30), d = b + (a - c) * x0;
    var sol = "Let g be the gigabytes used. Setting the two plan costs equal gives: \\[ \\begin{aligned} " + fmt(a) + "g+" + fmt(b) + " &= " + fmt(c) + "g+" + fmt(d) + " \\\\ " + fmt(a - c) + "g &= " + fmt(d - b) + " \\\\ g &= " + fmt(x0) + " \\end{aligned} \\] So the plans cost the same at <b>" + fmt(x0) + " GB</b>.";
    return numq("Plan A costs $" + fmt(b) + " a month plus $" + fmt(a) + " for each gigabyte (GB) of data. Plan B costs $" + fmt(d) + " a month plus $" + fmt(c) + " for each GB. For how many GB do the two plans cost the same, in dollars?", x0, 0.01, sol, { mode: "word-plans", a: a, b: b, c: c, d: d });
  }
  var a2 = ri(2, 6), c2 = ri(2, 9), x1 = ri(3, 15), T = a2 * (x1 + c2);
  var sol2 = "Let s be the seats in the short part of each row. The total gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a2) + "(s+" + fmt(c2) + ") &= " + fmt(T) + " \\\\ s+" + fmt(c2) + " &= " + fmt(T / a2) + " \\\\ s &= " + fmt(x1) + " \\end{aligned} \\] So the short part of each row has <b>" + fmt(x1) + " seats</b>.";
  return numq("A theatre has " + fmt(a2) + " identical rows. Each row has a short part with s seats and a long part with " + fmt(c2) + " more seats than the short part, so each row has s + " + fmt(c2) + " seats in all. The theatre has " + fmt(T) + " seats in total. How many seats are in the short part of each row?", x1, 0.01, sol2, { mode: "word-rows", a: a2, b: c2, c: T });
}, ["Set up the equation the story describes, brackets or both sides included, before solving.", "First write the cost or total for each side of the story as an expression in the unknown."]);

// 11. L1, 8.1: translate a word statement into an inequality.
E("u5-translate-inequality", 5, ["8.1"], 1, "gen", function () {
  var cases = [
    { phrase: "at least", r: "ge", why: "At least means that amount or more, so the sign is greater than or equal to." },
    { phrase: "at most", r: "le", why: "At most means that amount or less, so the sign is less than or equal to." },
    { phrase: "more than", r: "gt", why: "More than means strictly bigger, and the amount itself does not count." },
    { phrase: "fewer than", r: "lt", why: "Fewer than means strictly smaller, and the amount itself does not count." },
    { phrase: "no more than", r: "le", why: "No more than means that amount or less, so the sign is less than or equal to." }
  ];
  var ctxs = [
    { v: "n", what: "A number n", tail: "" },
    { v: "a", what: "Your age a, in years", tail: "" },
    { v: "s", what: "The amount spent, s dollars", tail: "" },
    { v: "h", what: "The height h, in centimetres", tail: "" }
  ];
  var cs = pick(cases), cx = pick(ctxs), k = pick([3, 5, 8, 10, 12, 16, 18, 21, 25, 30, 40, 50, 65, 100]);
  var corr = u5ineqTex(cx.v, cs.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (r) { return r !== cs.r; });
  var ds = others.map(function (r) { return { t: u5ineqTex(cx.v, r, fmt(k)), fb: "That sign does not match the phrase " + cs.phrase + "; check whether the amount itself is allowed." }; });
  var sol = cs.why + " So the statement translates to <b>" + corr + "</b>.";
  return mcq(cx.what + " is " + cs.phrase + " " + fmt(k) + ". Which inequality shows this?", { t: corr, fb: "Correct. " + cs.why }, ds, sol, { mode: "translate", r: cs.r, k: k, v: cx.v });
}, ["Decide first whether the boundary amount itself is allowed; that picks a strict or an or-equal-to sign.", "First match the phrase: at least and at most include the amount, more than and fewer than leave it out."]);

// 12. L1, 8.2: which rational number can be a solution.
E("u5-possible-solution", 5, ["8.2"], 1, "gen", function () {
  function disp(v) { if (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9 && Math.abs(v - Math.round(v)) > 1e-9) return "\\(" + FR(Math.round(2 * v), 2) + "\\)"; return fmt(v); }
  for (var att = 0; att < 200; att++) {
    var k = ri(-4, 9), r = pick(["lt", "gt", "le", "ge"]);
    var pool = [k - 2, k - 1.5, k - 1, k - 0.5, k, k + 0.5, k + 1, k + 1.5, k + 2];
    var sat = pool.filter(function (v) { return u5holds(v, r, k); });
    var not = pool.filter(function (v) { return !u5holds(v, r, k); });
    if (sat.length < 1 || not.length < 3) continue;
    var cv = pick(sat), bad = shuffle(not).slice(0, 3);
    var corr = disp(cv);
    var ds = bad.map(function (v) { return { t: disp(v), fb: "That value does not satisfy the inequality; substituting it makes the statement false." }; });
    if (u5pick3(corr, ds).length < 3) continue;
    var sol = "Test the value in the inequality: \\[ \\begin{aligned} " + fmt(cv) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] The statement is true for that value, so a possible solution is <b>" + corr + "</b>.";
    return mcq("Which number is a possible solution of \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\)? A possible solution is a value that makes the inequality true.", { t: corr, fb: "Correct: substituting it makes the inequality a true statement." }, ds, sol, { mode: "possible", r: r, k: k, v: cv });
  }
  return mcq("Which number is a possible solution of \\(x \\le 3\\)? A possible solution is a value that makes the inequality true.", { t: fmt(2), fb: "Correct: substituting it makes the inequality a true statement." }, [{ t: fmt(4), fb: "That value does not satisfy the inequality." }, { t: fmt(5), fb: "That value does not satisfy the inequality." }, { t: fmt(7), fb: "That value does not satisfy the inequality." }], "Testing gives \\(2 \\le 3\\), which is true, so a possible solution is <b>2</b>.", { mode: "possible", r: "le", k: 3, v: 2 });
}, ["Substitute each choice into the inequality and keep the one that makes a true statement.", "First check the boundary value itself, then check values on each side of it."]);

// 13. L2, 8.3, CR 2: which list all satisfy an inequality.
E("u5-list-satisfies", 5, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var k = ri(-3, 8), r = pick(["lt", "gt", "le", "ge"]);
    var sat = [], not = [];
    for (var v = k - 6; v <= k + 6; v++) { (u5holds(v, r, k) ? sat : not).push(v); }
    if (sat.length < 3 || not.length < 3) continue;
    var good = shuffle(sat).slice(0, 3).sort(function (x, y) { return x - y; });
    var bads = shuffle(not).slice(0, 3);
    var base = shuffle(sat).slice(0, 2);
    function listStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(fmt).join(", "); }
    var corr = listStr(good);
    var mk = function (badV, pos) { var arr = base.slice(); arr.splice(pos, 0, badV); return listStr(arr); };
    var cands = [
      { t: mk(bads[0], 0), fb: "The value " + fmt(bads[0]) + " in that list does not satisfy the inequality." },
      { t: mk(bads[1], 1), fb: "The value " + fmt(bads[1]) + " in that list does not satisfy the inequality." },
      { t: mk(bads[2], 2), fb: "The value " + fmt(bads[2]) + " in that list does not satisfy the inequality." }
    ];
    var ds = u5pick3(corr, cands);
    if (ds.length < 3) continue;
    var sol = "Check every value in the list by substitution. For the correct list: \\[ \\begin{aligned} " + good.map(function (g) { return fmt(g) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k); }).join(" \\\\ ") + " \\end{aligned} \\] Every statement is true, so the list where all values satisfy the inequality is <b>" + corr + "</b>.";
    return mcq("Which list has values that ALL satisfy \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\)?", { t: corr, fb: "Correct: every value in that list makes the inequality true." }, ds, sol, { mode: "list-all", r: r, k: k });
  }
  return mcq("Which list has values that ALL satisfy \\(x < 2\\)?", { t: "-1, 0, 1", fb: "Correct: every value in that list makes the inequality true." }, [{ t: "0, 1, 2", fb: "The value 2 in that list does not satisfy the inequality." }, { t: "-2, -1, 3", fb: "The value 3 in that list does not satisfy the inequality." }, { t: "1, 2, 3", fb: "The values 2 and 3 in that list do not satisfy the inequality." }], "Each of -1, 0 and 1 is less than 2, so the list is <b>-1, 0, 1</b>.", { mode: "list-all", r: "lt", k: 2 });
}, ["Test every value in a list; one failing value rules the whole list out.", "First test the boundary value in each list, since it is the one most likely to fail."]);

// 14. L2, 8.24: number line graph to inequality.
E("u5-graph-to-ineq", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-8, 8), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var corr = u5ineqTex("x", r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== r; });
  var fbMap = { lt: "That uses a strict sign the wrong way for this graph; check the circle and the shading direction.", gt: "That points the shading the wrong way or uses the wrong circle for this graph.", le: "That does not match both the circle type and the shading direction in the graph.", ge: "That does not match both the circle type and the shading direction in the graph." };
  var ds = others.map(function (s) { return { t: u5ineqTex("x", s, fmt(k)), fb: fbMap[s] }; });
  var sol = "The circle sits at \\(" + fmt(k) + "\\), it is " + (closed ? "closed, so the endpoint is included and the sign has an equals part" : "open, so the endpoint is not included and the sign is strict") + ", and the shading goes to the " + dir + ". So the graph represents <b>" + corr + "</b>.";
  var q = mcq("The number line in the diagram graphs an inequality. Which inequality does the graph represent?", { t: corr, fb: "Correct: the circle type, its position and the shading direction all match." }, ds, sol, { mode: "graph-to-ineq", r: r, k: k });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Read the graph in three parts: where the circle sits, whether it is open or closed, and which way the shading goes.", "First find the number under the circle; that is the boundary value in every choice."]);

// 15. L2, 8.24: boundary value of a described graph.
E("u5-graph-boundary", 5, ["8.24"], 1, "gen", function () {
  var k = ri(-9, 9), r = pick(["lt", "gt", "le", "ge"]);
  var closed = (r === "le" || r === "ge"), dir = (r === "gt" || r === "ge") ? "right" : "left";
  var sol = "The circle always sits on the boundary value of the inequality, the number the variable is compared with: \\[ \\begin{aligned} x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the circle sits on <b>" + fmt(k) + "</b>.";
  return numq("The inequality \\(" + "x " + u5sym(r) + " " + fmt(k) + "\\) is graphed on a number line. The graph has a" + (closed ? " closed" : "n open") + " circle and the shading goes to the " + dir + ". On what number does the circle sit?", k, 0.01, sol, { mode: "boundary", r: r, k: k });
}, ["The circle sits on the number the variable is compared with in the inequality.", "First find the constant on the other side of the inequality sign from x."]);

// 16. L2, 8.25, CR 3: solve an inequality with addition or subtraction.
E("u5-solve-ineq-addsub", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), sym = u5sym(r);
  if (Math.random() < 0.5) {
    var b = ri(2, 12), k = ri(-8, 10), c = k + b;
    var sol = "Undo the addition by subtracting the same amount from both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} x+" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k) + "</b>.";
    return numq("Solve the inequality \\(x + " + fmt(b) + " " + sym + " " + fmt(c) + "\\). The solution has the form \\(x " + sym + " k\\). What is \\(k\\)?", k, 0.01, sol, { mode: "x+b", b: b, c: c, r: r });
  }
  var b2 = ri(2, 12), k2 = ri(-8, 10), c2 = k2 - b2;
  var sol2 = "Undo the subtraction by adding the same amount to both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} x-" + fmt(b2) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c2) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k2) + "</b>.";
  return numq("Solve the inequality \\(x - " + fmt(b2) + " " + sym + " " + fmt(c2) + "\\). The solution has the form \\(x " + sym + " k\\). What is \\(k\\)?", k2, 0.01, sol2, { mode: "x-b", b: b2, c: c2, r: r });
}, ["Use the inverse operation on both sides, just as you would for an equation.", "First decide what was done to x, then undo it on both sides of the sign."]);

// 17. L2, 8.26: solve an inequality, positive division.
E("u5-solve-ineq-pos-div", 5, ["8.26"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(-11, 11); if (b === 0) b = 4;
  var c = a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c + b, a);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but dividing by a positive number keeps the sign direction; it does not flip." },
    { t: u5ineqTex("x", r, alt), fb: "That boundary comes from moving the constant the wrong way before dividing." },
    { t: u5ineqTex("x", fr, alt), fb: "That has both slips: the constant was moved the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Isolate x step by step; the divisor is positive, so the sign stays as it is: \\[ \\begin{aligned} " + u5lin(a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + u5lin(a, b) + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the constant was undone, then both sides were divided by the positive coefficient." }, ds, sol, { mode: "pos-div", a: a, b: b, c: c, r: r });
}, ["Solve it like the matching equation, and remember dividing by a positive number never flips the sign.", "First undo the constant term, then divide both sides by the coefficient of x."]);

// 18. L3, 8.26: negative coefficient, sign must flip.
E("u5-solve-ineq-neg-flip", 5, ["8.26"], 3, "gen", function () {
  var a = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
  var b = ri(-9, 9); if (b === 0) b = 5;
  var c = -a * k + b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(-c, a);
  var corr = u5ineqTex("x", fr, fmt(k));
  var ds = [
    { t: u5ineqTex("x", r, fmt(k)), fb: "That keeps the original direction, but dividing both sides by a negative number reverses the sign." },
    { t: u5ineqTex("x", fr, alt), fb: "That boundary comes from dividing before the constant term was moved off the left side." },
    { t: u5ineqTex("x", r, alt), fb: "That has both slips: the constant was handled wrongly and the sign was not reversed for the negative divisor." }
  ];
  var sol = "Isolate x, and reverse the sign when dividing by the negative coefficient: \\[ \\begin{aligned} " + u5lin(-a, b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + (fr === "lt" || fr === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + u5lin(-a, b) + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the boundary is right and the sign was reversed for the negative divisor." }, ds, sol, { mode: "neg-flip", a: a, b: b, c: c, r: r });
}, ["Watch the step where you divide by the coefficient: a negative divisor reverses the inequality sign.", "First move the constant term, then note the sign of the coefficient before you divide."]);

// 19. L3, 8.27: multi-step inequality with a negative coefficient, boundary value.
E("u5-solve-ineq-multistep-neg", 5, ["8.27"], 3, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var fsym = (fr === "lt" || fr === "le") ? "<" : ">";
  if (Math.random() < 0.5) {
    var a = ri(2, 6), k = ri(-6, 7), b = ri(-10, 15), c = b - a * k;
    var sol = "Treat the term as a negative coefficient and reverse the sign at the division step: \\[ \\begin{aligned} " + fmt(b) + "-" + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(-a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c - b) + " \\\\ x &" + fsym + " " + fmt(k) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k) + "</b>.";
    return numq("Solve the inequality \\(" + fmt(b) + " - " + fmt(a) + "x " + u5sym(r) + " " + fmt(c) + "\\). The solution has the form \\(x " + u5sym(fr) + " k\\). What is \\(k\\)?", k, 0.01, sol, { mode: "b-ax", a: a, b: b, c: c, r: r });
  }
  var a2 = ri(2, 5), c0 = ri(2, 8), k2 = ri(-5, 7), d = a2 * (c0 - k2);
  var sol2 = "Expand the bracket first, then reverse the sign when dividing by the negative coefficient: \\[ \\begin{aligned} " + fmt(a2) + "(" + fmt(c0) + "-x) &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d) + " \\\\ " + fmt(a2 * c0) + "-" + fmt(a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d) + " \\\\ " + fmt(-a2) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(d - a2 * c0) + " \\\\ x &" + fsym + " " + fmt(k2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(k2) + "</b>.";
  return numq("Solve the inequality \\(" + fmt(a2) + "(" + fmt(c0) + " - x) " + u5sym(r) + " " + fmt(d) + "\\). The solution has the form \\(x " + u5sym(fr) + " k\\). What is \\(k\\)?", k2, 0.01, sol2, { mode: "a(c-x)", a: a2, b: c0, c: d, r: r });
}, ["Expand brackets and collect the x term first; the sign flip happens at the final division by a negative.", "First expand or simplify the left side until the x term stands with a negative coefficient."]);

// 20. L2, 8.27: choose the fully correct two-step solution.
E("u5-solve-ineq-two-step-choose", 5, ["8.27"], 2, "gen", function () {
  var a = ri(2, 8), k = ri(-6, 9), b = ri(2, 11), c = a * k - b, r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var alt = u5fracTex(c - b, a);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary is right, but nothing here flips the sign: the coefficient of x is positive." },
    { t: u5ineqTex("x", r, alt), fb: "That boundary comes from subtracting the constant again instead of adding it back." },
    { t: u5ineqTex("x", fr, alt), fb: "That has both slips: the constant was handled the wrong way and the sign was flipped needlessly." }
  ];
  var sol = "Undo the subtraction by adding to both sides, then divide by the positive coefficient: \\[ \\begin{aligned} " + fmt(a) + "x-" + fmt(b) + " &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c) + " \\\\ " + fmt(a) + "x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(c + b) + " \\\\ x &" + (r === "lt" || r === "le" ? "<" : ">") + " " + fmt(k) + " \\end{aligned} \\] So the fully correct solution is <b>" + corr + "</b>.";
  return mcq("Which inequality is the fully correct solution of \\(" + fmt(a) + "x - " + fmt(b) + " " + u5sym(r) + " " + fmt(c) + "\\)?", { t: corr, fb: "Correct: both steps are right and the sign direction is unchanged." }, ds, sol, { mode: "two-step-choose", a: a, b: b, c: c, r: r });
}, ["Work the solution yourself, one step at a time, then match it against the choices.", "First undo the constant term by adding it to both sides, then divide."]);

// 21. L3, 8.28, var: equation process vs inequality process.
E("u5-compare-eq-ineq-process", 5, ["8.28"], 3, "var", varset([
  function () {
    var sol = "Both problems divide by \\(-2\\), but only the inequality changes direction: \\[ \\begin{aligned} -2x &= 6 \\\\ x &= -3 \\end{aligned} \\] \\[ \\begin{aligned} -2x &> 6 \\\\ x &< -3 \\end{aligned} \\] So the true statement is that <b>the steps match, but the inequality sign reverses when dividing by a negative</b>.";
    return mcq("Compare solving \\(-2x = 6\\) with solving \\(-2x > 6\\). Which statement about the two processes is true?", { t: "The steps are the same, but the inequality sign reverses when both sides are divided by -2.", fb: "Correct: dividing by a negative reverses an inequality sign, and an equation has no sign to reverse." }, [
      { t: "The processes are identical in every way, including the final direction of the sign as well.", fb: "An equation has no inequality sign; only the inequality can reverse, and it does here." },
      { t: "The equation also reverses something of its own when both sides are divided by -2 here.", fb: "Equals signs never reverse; the reversal rule belongs to inequalities only." },
      { t: "Neither problem needs the division step at all, since -2 can just be dropped from both.", fb: "The coefficient must be undone in both problems; dropping it changes the value of x." }
    ], sol, { mode: "cmp-proc-neg" });
  },
  function () {
    var sol = "The solving steps are identical because the divisor is positive: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 3x &< 12 \\\\ x &< 4 \\end{aligned} \\] The difference is in the answers, so the true statement is that <b>the processes match, but the equation has one solution and the inequality has a range</b>.";
    return mcq("Compare solving \\(3x = 12\\) with solving \\(3x < 12\\). Which statement about the two processes is true?", { t: "The processes are the same; only the answers differ, one single value versus a range of values.", fb: "Correct: dividing by positive 3 works identically, and the answers differ in kind." }, [
      { t: "The inequality sign reverses, because every division step reverses an inequality in a problem.", fb: "The sign reverses only for a negative divisor; 3 is positive, so no reversal happens." },
      { t: "The inequality needs an extra step of its own that the equation does not need at any point.", fb: "Both take the same single division step; no extra step is added for the inequality." },
      { t: "The equation has a range of solutions stretching on and on, and the inequality has just one.", fb: "That is backwards: the equation pins x to one value, the inequality allows a range." }
    ], sol, { mode: "cmp-proc-pos" });
  },
  function () {
    var sol = "Adding and subtracting behave the same way in both: \\[ \\begin{aligned} x+5 &= 9 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} x+5 &> 9 \\\\ x &> 4 \\end{aligned} \\] No sign reversal happens for addition, so the true statement is that <b>the steps match and the sign direction stays the same</b>.";
    return mcq("Compare solving \\(x + 5 = 9\\) with solving \\(x + 5 > 9\\). Which statement about the two processes is true?", { t: "The steps are the same, and subtracting 5 from both sides leaves the inequality direction unchanged.", fb: "Correct: adding or subtracting the same amount never changes an inequality direction." }, [
      { t: "The inequality sign reverses its direction when 5 is subtracted from both sides of the problem.", fb: "Reversal is tied to multiplying or dividing by a negative, not to subtracting a constant." },
      { t: "The inequality must be solved by trial alone, while the equation is solved by inverse operations.", fb: "Both are solved by the same inverse operation here: subtract 5 from both sides." },
      { t: "The two problems have exactly the same final answer, the one single value 4, with nothing more.", fb: "The inequality answer is a range of values greater than 4, not the single value 4." }
    ], sol, { mode: "cmp-proc-add" });
  },
  function () {
    var sol = "Both problems need the x term isolated, and only the inequality flips: \\[ \\begin{aligned} -x &= 4 \\\\ x &= -4 \\end{aligned} \\] \\[ \\begin{aligned} -x &\\le 4 \\\\ x &\\ge -4 \\end{aligned} \\] So the true statement is that <b>dividing by -1 reverses the inequality but leaves the equation answer as one value</b>.";
    return mcq("Compare solving \\(-x = 4\\) with solving \\(-x \\le 4\\). Which statement about the two processes is true?", { t: "Both divide by -1, but only the inequality reverses, changing its direction to greater than or equal to.", fb: "Correct: the hidden coefficient is -1, and dividing by it flips the inequality only." }, [
      { t: "Neither answer changes direction, because the coefficient of x looks like just a minus sign in front.", fb: "That minus sign is a coefficient of -1, and dividing by a negative reverses an inequality." },
      { t: "The equation answer becomes a range of values and the inequality answer becomes one value only.", fb: "That is backwards: equations give one value here, inequalities give a range." },
      { t: "The inequality keeps its direction all the way through the working because equals parts never flip at all.", fb: "The whole sign, equals part included, reverses when dividing by a negative number." }
    ], sol, { mode: "cmp-proc-negone" });
  },
  function () {
    var sol = "The boundary value is shared, and the solving steps match: \\[ \\begin{aligned} 5x &= 20 \\\\ x &= 4 \\end{aligned} \\] \\[ \\begin{aligned} 5x &\\ge 20 \\\\ x &\\ge 4 \\end{aligned} \\] So the true statement is that <b>the equation solution is the boundary of the inequality solution, and it is included in it</b>.";
    return mcq("Compare solving \\(5x = 20\\) with solving \\(5x \\ge 20\\). Which statement about the two processes is true?", { t: "The processes match, and the equation solution, 4, is the boundary value of the inequality solution.", fb: "Correct: both divide by 5, and 4 is where the inequality range starts." }, [
      { t: "The processes differ because the inequality sign reverses whenever both sides are divided by 5.", fb: "Five is positive, so no reversal happens; the processes are step for step the same." },
      { t: "The equation solution, 4, is not part of the inequality answer at all and never can be.", fb: "The or-equal-to part includes the boundary, so 4 does satisfy the inequality." },
      { t: "The inequality has no boundary value at all, since its answer is a range of values instead of one number.", fb: "Every inequality range here starts at a boundary value; here it is 4." }
    ], sol, { mode: "cmp-proc-boundary" });
  }
]), ["Solve both problems side by side and watch for the one step where they can differ.", "First do the shared steps; then ask whether a negative divisor appears, because that is the only process difference."]);

// 22. L2, 8.29, var: numbers satisfying the inequality but not the equation.
E("u5-compare-eq-ineq-solutions", 5, ["8.29"], 1, "var", varset([
  function () {
    var sol = "The equation is satisfied only by 5, while the inequality allows anything bigger: \\[ \\begin{aligned} 6 &> 5 \\\\ 5 &= 5 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>6</b>.";
    return mcq("The equation \\(x = 5\\) and the inequality \\(x > 5\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "6", fb: "Correct: 6 is greater than 5, so it fits the inequality, and it is not the equation value." }, [
      { t: "5", fb: "That value satisfies the equation, and the strict inequality leaves it out." },
      { t: "4", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "3", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-gt" });
  },
  function () {
    var sol = "The equation is satisfied only by 3, while the inequality also allows smaller values: \\[ \\begin{aligned} 2 &\\le 3 \\\\ 3 &= 3 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>2</b>.";
    return mcq("The equation \\(x = 3\\) and the inequality \\(x \\le 3\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "2", fb: "Correct: 2 is less than 3, so it fits the inequality, and it is not the equation value." }, [
      { t: "3", fb: "That value satisfies both statements, so it is not the one asked for." },
      { t: "4", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "5", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-le" });
  },
  function () {
    var sol = "The equation is satisfied only by -2, while the inequality allows anything smaller: \\[ \\begin{aligned} -3 &< -2 \\\\ -2 &= -2 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>-3</b>.";
    return mcq("The equation \\(x = -2\\) and the inequality \\(x < -2\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "-3", fb: "Correct: -3 is less than -2, so it fits the inequality, and it is not the equation value." }, [
      { t: "-2", fb: "That value satisfies the equation, and the strict inequality leaves it out." },
      { t: "-1", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "0", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-ltneg" });
  },
  function () {
    var sol = "Solving both gives the same boundary, 4, and the inequality also allows bigger values: \\[ \\begin{aligned} 2(5) &= 10 > 8 \\\\ 2(4) &= 8 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>5</b>.";
    return mcq("The equation \\(2x = 8\\) and the inequality \\(2x > 8\\) share a boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "5", fb: "Correct: doubling 5 gives 10, which fits the inequality, and 5 is not the equation solution." }, [
      { t: "4", fb: "That value is the equation solution, and the strict inequality leaves it out." },
      { t: "3", fb: "That value satisfies neither statement; doubling it gives only 6." },
      { t: "2", fb: "That value satisfies neither statement; doubling it gives only 4." }
    ], sol, { mode: "cmp-sol-double" });
  },
  function () {
    var sol = "The equation is satisfied only by 7, while the inequality also allows bigger values, boundary included: \\[ \\begin{aligned} 8 &\\ge 7 \\\\ 7 &= 7 \\end{aligned} \\] So the number that satisfies the inequality but not the equation is <b>8</b>.";
    return mcq("The equation \\(x = 7\\) and the inequality \\(x \\ge 7\\) use the same boundary. Which number satisfies the inequality but does NOT satisfy the equation?", { t: "8", fb: "Correct: 8 is greater than 7, so it fits the inequality, and it is not the equation value." }, [
      { t: "7", fb: "That value satisfies both statements, so it is not the one asked for." },
      { t: "6", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." },
      { t: "5", fb: "That value satisfies neither statement; it is on the wrong side of the boundary." }
    ], sol, { mode: "cmp-sol-ge" });
  }
]), ["Test each choice in both statements; the wanted number passes the inequality and fails the equation.", "First find the equation solution and rule it out, then test the rest in the inequality."]);

// 23. L2, 8.30: context inequality with its graph shown.
E("u5-context-graph", 5, ["8.30"], 1, "gen", function () {
  var ctxs = [
    { v: "s", r: "le", text: function (k) { return "A school club can spend at most $" + fmt(k) + " on supplies. Let s be the amount spent, in dollars."; } },
    { v: "a", r: "ge", text: function (k) { return "Riders must be at least " + fmt(k) + " cm tall for a certain ride. Let a be a rider's height, in centimetres."; } },
    { v: "p", r: "lt", text: function (k) { return "Each piece cut from a board must be shorter than " + fmt(k) + " cm. Let p be the length of a piece, in centimetres."; } },
    { v: "g", r: "gt", text: function (k) { return "A team needs to score more than " + fmt(k) + " points to advance. Let g be the points the team scores."; } }
  ];
  var cx = pick(ctxs), k = ri(6, 40) * pick([1, 1, 2, 5]);
  var closed = (cx.r === "le" || cx.r === "ge"), dir = (cx.r === "gt" || cx.r === "ge") ? "right" : "left";
  var corr = u5ineqTex(cx.v, cx.r, fmt(k));
  var others = ["lt", "gt", "le", "ge"].filter(function (s) { return s !== cx.r; });
  var ds = others.map(function (s) { return { t: u5ineqTex(cx.v, s, fmt(k)), fb: "That inequality does not match the graph: check the circle type and the shading direction against the story." }; });
  var sol = "The story gives the boundary \\(" + fmt(k) + "\\), and the graph shows a " + (closed ? "closed" : "open") + " circle there with shading to the " + dir + ". So the inequality for the situation is <b>" + corr + "</b>.";
  var q = mcq(cx.text(k) + " The number line in the diagram graphs the amounts that fit the situation. Which inequality describes the situation?", { t: corr, fb: "Correct: the variable, boundary, circle type and shading direction all match the story." }, ds, sol, { mode: "context-graph", r: cx.r, k: k, v: cx.v });
  q.figure = u5line(k, closed, dir);
  return q;
}, ["Translate the story into an inequality, then check it against the circle and shading in the graph.", "First find the boundary number in the story; the graph circle sits on that same number."]);

// 24. L2, 8.30: context problem, boundary value.
E("u5-context-boundary", 5, ["8.30"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), b = ri(3, 15), n = ri(3, 15), c = a * n + b;
    var sol = "The boundary value is where the total exactly equals the budget: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n) + "</b>.";
    return numq("Movie tickets cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. Jay has at most $" + fmt(c) + " to spend, modelled by " + fmt(a) + "n + " + fmt(b) + " \\(\\le\\) " + fmt(c) + ", where n is the number of tickets. The boundary value is the value of n when the total equals the budget exactly. What is the boundary value?", n, 0.01, sol, { mode: "ctx-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(3, 8), b2 = ri(2, 10), n2 = ri(4, 14), c2 = a2 * n2 + b2;
    var sol2 = "The boundary value is where the total mass exactly equals the limit: \\[ \\begin{aligned} " + fmt(a2) + "m+" + fmt(b2) + " &= " + fmt(c2) + " \\\\ " + fmt(a2) + "m &= " + fmt(c2 - b2) + " \\\\ m &= " + fmt(n2) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n2) + "</b>.";
    return numq("A lift crate weighs " + fmt(b2) + " kg empty. Each box loaded into it weighs " + fmt(a2) + " kg. The total mass must be at most " + fmt(c2) + " kg, modelled by " + fmt(a2) + "m + " + fmt(b2) + " \\(\\le\\) " + fmt(c2) + ", where m is the number of boxes. The boundary value is the value of m when the total equals the limit exactly. What is the boundary value?", n2, 0.01, sol2, { mode: "ctx-mass", a: a2, b: b2, c: c2 });
  }
  var a3 = ri(2, 7), b3 = ri(4, 12), n3 = ri(3, 12), c3 = a3 * n3 + b3;
  var sol3 = "The boundary value is where the points exactly reach the target: \\[ \\begin{aligned} " + fmt(a3) + "g+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "g &= " + fmt(c3 - b3) + " \\\\ g &= " + fmt(n3) + " \\end{aligned} \\] So the boundary value is <b>" + fmt(n3) + "</b>.";
  return numq("A game awards " + fmt(a3) + " points for each goal and a one-time bonus of " + fmt(b3) + " points. A player wants at least " + fmt(c3) + " points, modelled by " + fmt(a3) + "g + " + fmt(b3) + " \\(\\ge\\) " + fmt(c3) + ", where g is the number of goals. The boundary value is the value of g when the points exactly equal the target. What is the boundary value?", n3, 0.01, sol3, { mode: "ctx-points", a: a3, b: b3, c: c3 });
}, ["The boundary value comes from the matching equation: turn the inequality into an equation and solve it.", "First replace the inequality sign with an equals sign; the solution of that equation is the boundary."]);


// Helpers for entries 25 to 28; prefixed u5b to avoid clashing with the u5 helpers above.
function u5bPhrase(r) { return r === "ge" ? "at least" : r === "le" ? "at most" : r === "gt" ? "more than" : "less than"; }
function u5bDirChar(r) { return (r === "lt" || r === "le") ? "<" : ">"; }
function u5bSolWord(isSol) { return isSol ? "is a solution" : "is not a solution"; }

// 25. L1, 8.1: read an inequality in symbols and choose the matching word statement.
E("u5-ineq-to-words", 5, ["8.1"], 1, "gen", function () {
  var ctxs = [
    { v: "h", desc: "h is a rider's height in centimetres", lead: "A rider's height is", unit: "centimetres", ks: [100, 110, 120, 130, 140, 150] },
    { v: "a", desc: "a is a student's age in years", lead: "A student's age is", unit: "years", ks: [5, 6, 10, 12, 14, 16, 18] },
    { v: "s", desc: "s is the amount spent in dollars", lead: "The amount spent is", unit: "dollars", ks: [10, 20, 25, 40, 50, 75, 100] },
    { v: "m", desc: "m is the total mass in a lift in kilograms", lead: "The total mass in the lift is", unit: "kilograms", ks: [200, 300, 400, 500, 600, 800, 1000] },
    { v: "t", desc: "t is the waiting time in minutes", lead: "The waiting time is", unit: "minutes", ks: [5, 10, 15, 20, 30, 45, 60] },
    { v: "w", desc: "w is the water in a tank in litres", lead: "The water in the tank is", unit: "litres", ks: [50, 80, 100, 150, 200, 250, 300] },
    { v: "p", desc: "p is the points a team scores", lead: "The points scored are", unit: "points", ks: [10, 20, 30, 40, 50, 60] },
    { v: "d", desc: "d is the distance walked in kilometres", lead: "The distance walked is", unit: "kilometres", ks: [2, 3, 5, 8, 10, 12, 15] }
  ];
  var cx = pick(ctxs), r = pick(["lt", "gt", "le", "ge"]), k = pick(cx.ks);
  function stmt(rr) { return cx.lead + " " + u5bPhrase(rr) + " " + fmt(k) + " " + cx.unit + "."; }
  var corr = stmt(r);
  var others = ["lt", "gt", "le", "ge"].filter(function (x) { return x !== r; });
  var ds = others.map(function (x) { return { t: stmt(x), fb: "That statement uses the phrase " + u5bPhrase(x) + ", which matches a different sign. Check the direction of the sign and whether the value " + fmt(k) + " itself is included." }; });
  var why = r === "ge" ? "The sign means the value itself or more, which is the phrase at least." : r === "le" ? "The sign means the value itself or less, which is the phrase at most." : r === "gt" ? "The sign means strictly more, and the value itself does not count, which is the phrase more than." : "The sign means strictly less, and the value itself does not count, which is the phrase less than.";
  var sol = why + " The inequality in symbols is: \\[ \\begin{aligned} " + cx.v + " &" + u5sym(r) + " " + fmt(k) + " \\end{aligned} \\] So the matching statement is <b>" + corr + "</b>";
  return mcq("In this situation, " + cx.desc + ". The condition is written as " + u5ineqTex(cx.v, r, fmt(k)) + ". Which statement matches this inequality?", { t: corr, fb: "Correct. " + why }, ds, sol, { mode: "ineq-to-words", r: r, k: k, v: cx.v });
}, ["Look at the sign first: its direction tells you which side of the value counts.", "Decide whether the value itself is included; an equals part in the sign means it is."]);

// 26. L2, 8.2: judge a shown substitution check for an inequality, where the work may slip or the verdict may be wrong.
E("u5-ineq-substitution-check", 5, ["8.2"], 2, "gen", function () {
  var a = ri(2, 5), b = ri(-6, 8); if (b === 0) b = 4;
  var w = ri(-4, 8), r = pick(["lt", "gt", "le", "ge"]);
  var trueL = a * w + b;
  var C = trueL + pick([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  var isSol = u5holds(trueL, r, C);
  var roll = Math.random();
  var flaw = roll < 0.4 ? "none" : roll < 0.7 ? "arith" : "verdict";
  var shownL = trueL, shownClaim;
  if (flaw === "arith") { shownL = trueL + pick([-3, -2, -1, 1, 2, 3, a, -a]); shownClaim = u5holds(shownL, r, C); }
  else if (flaw === "verdict") { shownClaim = !isSol; }
  else { shownClaim = isSol; }
  var hasErr = flaw !== "none";
  var sub = fmt(a) + "(" + fmt(w) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b));
  var ineq = u5lin(a, b) + " " + u5sym(r) + " " + fmt(C);
  var prompt = "A student checks whether \\(x = " + fmt(w) + "\\) is a solution of \\(" + ineq + "\\). The student substitutes and writes \\(" + sub + " = " + fmt(shownL) + "\\), then writes that \\(" + fmt(shownL) + " " + u5sym(r) + " " + fmt(C) + "\\) is " + (shownClaim ? "true" : "false") + ", so \\(x = " + fmt(w) + "\\) " + u5bSolWord(shownClaim) + ". Which statement about this check is correct?";
  function optText(err, solFlag) { return "The shown work " + (err ? "has an error" : "is correct") + ", and \\(x = " + fmt(w) + "\\) " + u5bSolWord(solFlag) + "."; }
  var corr = optText(hasErr, isSol);
  var combos = [[true, true], [true, false], [false, true], [false, false]].filter(function (pr) { return !(pr[0] === hasErr && pr[1] === isSol); });
  var ds = combos.map(function (pr) {
    var parts = [];
    if (pr[0] !== hasErr) parts.push(hasErr ? "the shown work does contain an error" : "the shown work has no error");
    if (pr[1] !== isSol) parts.push("in fact \\(x = " + fmt(w) + "\\) " + u5bSolWord(isSol));
    return { t: optText(pr[0], pr[1]), fb: "Check again: " + parts.join(", and ") + "." };
  });
  var errNote = flaw === "arith" ? "The student's value " + fmt(shownL) + " is wrong; the correct left side is " + fmt(trueL) + ". " : flaw === "verdict" ? "The student's left side is right, but the verdict is wrong. " : "The student's work matches this. ";
  var sol = "Redo the substitution and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + sub + " \\\\ &= " + fmt(trueL) + " \\end{aligned} \\] Since \\(" + fmt(trueL) + " " + u5sym(r) + " " + fmt(C) + "\\) is " + (isSol ? "true" : "false") + ", \\(x = " + fmt(w) + "\\) " + u5bSolWord(isSol) + ". " + errNote + "So the correct statement is <b>" + corr + "</b>";
  return mcq(prompt, { t: corr, fb: "Correct: redoing the substitution gives a left side of " + fmt(trueL) + ", and the comparison with " + fmt(C) + " settles the verdict." }, ds, sol, { mode: "ineq-check", a: a, b: b, w: w, r: r, c: C, flaw: flaw });
}, ["Redo the substitution yourself and compare the left side with the right side before judging the student's words.", "First work out the left side with the given value; then check both the student's number and the student's verdict against yours."]);

// 27. L2, 8.3: count how many listed values satisfy an inequality.
E("u5-count-satisfying", 5, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = ri(0, 1);
    var r = pick(["lt", "gt", "le", "ge"]);
    var k = ri(-4, 9);
    var b = ri(2, 6);
    var n = ri(4, 6);
    var pool = [];
    for (var v = k - 5; v <= k + 5; v++) pool.push(v);
    var vals = shuffle(pool).slice(0, n).sort(function (x, y) { return x - y; });
    var tests = vals.map(function (v) { return form === 0 ? v : v + b; });
    var cnt = 0;
    tests.forEach(function (tv) { if (u5holds(tv, r, k)) cnt++; });
    if (cnt < 1 || cnt > n - 1) continue;
    var lhs = form === 0 ? "x" : "x+" + fmt(b);
    var listStr = vals.map(fmt).join(", ");
    var lines = vals.map(function (v, i) { return fmt(tests[i]) + " &" + u5sym(r) + " " + fmt(k) + " \\quad \\text{" + (u5holds(tests[i], r, k) ? "true" : "false") + "}"; }).join(" \\\\ ");
    var sol = "Substitute each listed value" + (form === 1 ? " into \\(x + " + fmt(b) + "\\), giving " + tests.map(fmt).join(", ") + " in order," : "") + " and check each result against " + fmt(k) + ": \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Counting the true statements gives <b>" + fmt(cnt) + "</b> of the listed values satisfying the inequality.";
    return numq("How many of the values " + listStr + " satisfy the inequality \\(" + lhs + " " + u5sym(r) + " " + fmt(k) + "\\)?", cnt, 0.01, sol, { mode: form === 0 ? "count-x" : "count-x+b", r: r, k: k, b: b, n: n });
  }
  var solF = "Substitute each listed value and check the statement: \\[ \\begin{aligned} -1 &\\le 3 \\quad \\text{true} \\\\ 2 &\\le 3 \\quad \\text{true} \\\\ 3 &\\le 3 \\quad \\text{true} \\\\ 5 &\\le 3 \\quad \\text{false} \\end{aligned} \\] Counting the true statements gives <b>3</b> of the listed values satisfying the inequality.";
  return numq("How many of the values -1, 2, 3, 5 satisfy the inequality \\(x \\le 3\\)?", 3, 0.01, solF, { mode: "count-x", r: "le", k: 3, b: 0, n: 4 });
}, ["Test each listed value in the inequality one at a time and keep a running count.", "First test the boundary value itself, since the equals part of the sign decides whether it counts."]);

// 28. L2, 8.25: choose the correct solution of an inequality that needs only addition or subtraction.
E("u5-solve-ineq-addsub-choose", 5, ["8.25"], 1, "gen", function () {
  var r = pick(["lt", "gt", "le", "ge"]), fr = u5flip(r);
  var b = ri(2, 12), k = ri(-8, 10);
  var isAdd = Math.random() < 0.5;
  var c = isAdd ? k + b : k - b;
  var kW = isAdd ? c + b : c - b;
  var lhs = isAdd ? "x+" + fmt(b) : "x-" + fmt(b);
  var corr = u5ineqTex("x", r, fmt(k));
  var ds = [
    { t: u5ineqTex("x", r, fmt(kW)), fb: "The direction is right, but that boundary comes from " + (isAdd ? "adding" : "subtracting") + " " + fmt(b) + " again instead of undoing the operation on x." },
    { t: u5ineqTex("x", fr, fmt(k)), fb: "The boundary value is right, but adding or subtracting the same amount on both sides never changes the direction of the sign." },
    { t: u5ineqTex("x", fr, fmt(kW)), fb: "That has both slips: the boundary comes from the wrong operation, and the direction was changed even though only addition or subtraction is involved." }
  ];
  var step = isAdd ? "Subtract " + fmt(b) + " from" : "Add " + fmt(b) + " to";
  var sol = step + " both sides; adding or subtracting never changes the sign direction: \\[ \\begin{aligned} " + lhs + " &" + u5bDirChar(r) + " " + fmt(c) + " \\\\ x &" + u5bDirChar(r) + " " + fmt(k) + " \\end{aligned} \\] So the solution is <b>" + corr + "</b>.";
  return mcq("Solve the inequality \\(" + lhs + " " + u5sym(r) + " " + fmt(c) + "\\). Which inequality is the solution?", { t: corr, fb: "Correct: the operation on x was undone on both sides and the direction stayed the same." }, ds, sol, { mode: isAdd ? "choose-x+b" : "choose-x-b", b: b, c: c, r: r });
}, ["Undo what was done to x, using the same operation on both sides of the sign.", "First decide whether x had an amount added or subtracted, then undo that step and keep the sign direction."]);

// Unit 6: Linear Relations (Math 9, NL). Entries only; helpers prefixed u6.
function u6lin(m, b, v) {
  var head = (m === 1 ? v : fmt(m) + v);
  if (b > 0) return head + " + " + fmt(b);
  if (b < 0) return head + " - " + fmt(-b);
  return head;
}
function u6pick3(corr, cands) {
  var out = [], seen = {}; seen[corr] = 1;
  var sh = shuffle(cands);
  for (var i = 0; i < sh.length && out.length < 3; i++) {
    if (!seen[sh[i].t]) { seen[sh[i].t] = 1; out.push(sh[i]); }
  }
  return out.length === 3 ? out : null;
}
function u6graph(o) {
  var W = 360, H = 302, x0 = 56, y0 = 256, x1 = 338, y1 = 28;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); }
  function Y(v) { return fmt(y0 - v * sy, 1); }
  var xs = o.xstep || (o.xmax <= 10 ? 1 : 2);
  var ys = o.ystep || (o.ymax <= 12 ? 1 : (o.ymax <= 26 ? 2 : 5));
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graph of a linear relation">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.lines || []).forEach(function (L) {
    var pts = L.pts.map(function (p) { return X(p[0]) + "," + Y(p[1]); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + (L.col || FIG_INK) + '" stroke-width="' + (L.w || 2.5) + '"' + (L.dash ? ' stroke-dasharray="7 5"' : "") + '/>';
    if (L.lab) { var lp = L.pts[L.pts.length - 1]; s += '<text x="' + fmt(x0 + lp[0] * sx - 4, 1) + '" y="' + fmt(y0 - lp[1] * sy - 10, 1) + '" font-size="12" font-weight="bold" fill="' + (L.col || FIG_INK) + '" text-anchor="end">' + L.lab + '</text>'; }
  });
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P.x) + '" cy="' + Y(P.y) + '" r="3.5" fill="' + (P.col || FIG_ACC) + '"/>';
    if (P.lab) s += '<text x="' + fmt(x0 + P.x * sx + 8, 1) + '" y="' + fmt(y0 - P.y * sy - 8, 1) + '" font-size="12" fill="' + FIG_INK + '">' + P.lab + '</text>';
  });
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x1 + ',' + y0 + ' ' + (x1 - 9) + ',' + (y0 - 4) + ' ' + (x1 - 9) + ',' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x0 + ',' + y1 + ' ' + (x0 - 4) + ',' + (y1 + 9) + ' ' + (x0 + 4) + ',' + (y1 + 9) + '" fill="' + FIG_INK + '"/>';
  for (g = 0; g <= o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y0 + '" x2="' + X(g) + '" y2="' + (y0 + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(g) + '" y="' + (y0 + 20) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + g + '</text>';
  for (g = ys; g <= o.ymax; g += ys) s += '<line x1="' + (x0 - 5) + '" y1="' + Y(g) + '" x2="' + x0 + '" y2="' + Y(g) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + (x0 - 10) + '" y="' + Y(g) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + g + '</text>';
  s += '<text x="' + x1 + '" y="' + (y0 + 38) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="end">' + (o.xlab || "x") + '</text>';
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>';
  return s + '</svg>';
}
function u6stageFig(counts, item) {
  var sq = 15, gap = 3, per = 8, pad = 12, seg = 26;
  var widths = counts.map(function (c) { var cols = Math.min(per, c); return cols * (sq + gap) - gap; });
  var maxRows = 1;
  counts.forEach(function (c) { var r = Math.ceil(c / per); if (r > maxRows) maxRows = r; });
  var totW = pad * 2 + seg * (counts.length - 1);
  widths.forEach(function (w) { totW += w; });
  var H = 22 + (maxRows * (sq + gap) - gap) + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + totW + '" height="' + H + '" viewBox="0 0 ' + totW + ' ' + H + '" role="img" aria-label="First three stages of a growing pattern">';
  var cx = pad;
  counts.forEach(function (c, i) {
    var w = widths[i], mid = fmt(cx + w / 2, 1);
    s += '<text x="' + mid + '" y="12" font-size="12" font-weight="bold" fill="' + FIG_INK + '" text-anchor="middle">Stage ' + (i + 1) + '</text>';
    for (var k = 0; k < c; k++) {
      var col = k % per, row = Math.floor(k / per);
      s += '<rect x="' + (cx + col * (sq + gap)) + '" y="' + (22 + row * (sq + gap)) + '" width="' + sq + '" height="' + sq + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
    }
    s += '<text x="' + mid + '" y="' + (H - 6) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + c + ' ' + item + '</text>';
    cx += w + seg;
  });
  return s + '</svg>';
}

// 1. L1, 7.1: tile pattern in a figure, choose the expression for stage n.
