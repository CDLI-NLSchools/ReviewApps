// Math 8 Unit 6 Linear Equations and Graphing question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 2565 to 2951).
// CRMARKS: u6-graph-extend-pair=2
// CRMARKS: u6-missing-ordered-pair=2
// CRMARKS: u6-missing-ordered-pair-backward=2
// CRMARKS: u6-solve-context-problem=3
// CRMARKS: u6-solve-distributive=3
// CRMARKS: u6-solve-div-plus=2
// CRMARKS: u6-solve-group-problem=3
// CRMARKS: u6-solve-two-step=3
/* Unit 6: Linear Equations and Graphing */
// Unit 6: Linear Equations and Graphing (Math 8, NL). Entries only; helpers prefixed u6.
function u6pick3(corr, cands) {
  var out = [], seen = {}; seen[corr] = 1;
  var sh = shuffle(cands);
  for (var i = 0; i < sh.length && out.length < 3; i++) {
    if (!seen[sh[i].t]) { seen[sh[i].t] = 1; out.push(sh[i]); }
  }
  return out.length === 3 ? out : null;
}
function u6sgn(v) { return v >= 0 ? " + " + fmt(v) : " - " + fmt(-v); }
function u6graphPts(o) {
  var W = 330, H = 290, x0 = 52, y0 = 238, x1 = 312, y1 = 26;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); }
  function Y(v) { return fmt(y0 - v * sy, 1); }
  var xs = o.xstep || 1, ys = o.ystep || (o.ymax <= 12 ? 1 : 2);
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graph of a linear relation shown as separate points">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P[0]) + '" cy="' + Y(P[1]) + '" r="4" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
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

// 1. L1, 8.4: solve a one-step equation, ax = b or x/a = b.
E("u6-solve-one-step", 6, ["8.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = pick(["ax", "xa"]);
    var a = ri(2, 9), x = ri(2, 12), b = form === "ax" ? a * x : x;
    if (form === "xa") { b = x; x = a * b; } // equation x/a = b, solution x = a*b
    var solX = form === "ax" ? b / a : a * b;
    var eq = form === "ax" ? fmt(a) + "x = " + fmt(b) : "\\frac{x}{" + a + "} = " + fmt(b);
    var wrong = form === "ax" ? [b * a, b - a, b + a] : [b / a, b - a, b + a];
    var corr = fmt(solX);
    var dpA = (fmt(wrong[0]).split(".")[1] || "").length;
    var cands = wrong.map(function (w, wi) {
      return { t: (form === "xa" && wi === 1 && dpA > 0) ? fmtF(w, dpA) : fmt(w), fb: form === "ax" ? "That uses the wrong operation. To undo multiplying by " + a + ", divide both sides by " + a + "." : "That uses the wrong operation. To undo dividing by " + a + ", multiply both sides by " + a + "." };
    });
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var steps = form === "ax"
      ? "\\begin{aligned} " + fmt(a) + "x &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}"
      : "\\begin{aligned} \\frac{x}{" + a + "} &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}";
    var sol = "Use the inverse operation on both sides: \\[ " + steps + " \\] So the solution is <b>\\(x = " + fmt(solX) + "\\)</b>.";
    return mcq("Solve the equation \\(" + eq + "\\). What is the value of \\(x\\)?",
      { t: corr, fb: "Correct. The inverse operation isolates x." }, ds, sol,
      { mode: "solve-one-step", form: form, a: a, b: b });
  }
  return mcq("Solve the equation \\(3x = 12\\). What is the value of \\(x\\)?",
    { t: "4", fb: "Correct. Divide both sides by 3." },
    [{ t: "36", fb: "That multiplies instead of dividing." }, { t: "9", fb: "That subtracts 3 instead of dividing by 3." }, { t: "15", fb: "That adds 3 instead of dividing by 3." }],
    "Divide both sides by 3: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] So the solution is <b>\\(x = 4\\)</b>.", { mode: "solve-one-step-fallback" });
}, ["Think about what is being done to x, then use the opposite operation.", "For ax = b divide both sides by a; for x/a = b multiply both sides by a."]);

// 2. L1, 8.3: verify by substitution, find the value of the left side.
E("u6-verify-left-side", 6, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 7), b = ri(1, 9), xt = ri(2, 9);
    var c = a * xt + b;
    var claim = Math.random() < 0.5 ? xt : xt + pick([-2, -1, 1, 2]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = fmt(lhs);
    var cands = [
      { t: fmt(c), fb: "That is the right side of the equation. The question asks for the left side after substituting x = " + claim + "." },
      { t: fmt(a + claim + b), fb: "That adds the numbers. The term " + fmt(a) + "x means " + a + " times x, not " + a + " plus x." },
      { t: fmt(a * claim), fb: "That works out " + fmt(a) + "x but forgets to add the " + fmt(b) + " that follows it." },
      { t: fmt(lhs + a), fb: "Check the multiplication: " + a + " times " + claim + " is " + fmt(a * claim) + ", then add " + fmt(b) + "." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var verdict = claim === xt ? " and it equals the right side, " + fmt(c) + ", so x = " + claim + " checks out" : " and it does not equal the right side, " + fmt(c) + ", so x = " + claim + " is not the solution";
    var sol = "Substitute \\(x = " + claim + "\\) into the left side: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(a) + "(" + claim + ") + " + fmt(b) + " \\\\ &= " + fmt(a * claim) + " + " + fmt(b) + " \\\\ &= " + fmt(lhs) + " \\end{aligned} \\] The left side is <b>" + fmt(lhs) + "</b>" + verdict + ".";
    return mcq("To check a solution, substitute \\(x = " + claim + "\\) into the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of the left side?",
      { t: corr, fb: "Correct. Substitution replaces x, then the arithmetic gives the left side." }, ds, sol,
      { mode: "verify-left-side", a: a, b: b, claim: claim });
  }
  return mcq("To check a solution, substitute \\(x = 3\\) into the equation \\(2x + 4 = 10\\). What is the value of the left side?",
    { t: "10", fb: "Correct. 2(3) + 4 = 10." },
    [{ t: "6", fb: "That forgets to add the 4." }, { t: "9", fb: "That adds 2 + 3 + 4 instead of multiplying 2 by 3 first." }, { t: "12", fb: "Check the multiplication: 2 times 3 is 6, then add 4." }],
    "Substitute: \\[ \\begin{aligned} 2x + 4 &= 2(3) + 4 \\\\ &= 10 \\end{aligned} \\] The left side is <b>10</b>.", { mode: "verify-left-side-fallback" });
}, ["Substitution means replacing x with the given number everywhere x appears.", "Work out the multiplication first, then add."]);

// 3. L1, 7.2: build a table value from an equation.
E("u6-table-missing-value", 6, ["7.2"], 1, "gen", function () {
  var m = ri(2, 6), b = ri(1, 9), qx = ri(0, 4);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (x) { return m * x + b; });
  var shown = ys.map(function (y, i) { return i === qx ? "?" : fmt(y); });
  var ans = ys[qx];
  var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\). For the missing entry, \\(x = " + qx + "\\): \\[ \\begin{aligned} y &= " + fmt(m) + "(" + qx + ") + " + fmt(b) + " \\\\ &= " + fmt(m * qx) + " + " + fmt(b) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the missing table value is <b>" + fmt(ans) + "</b>.";
  var prompt = "A table of values is made from the equation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\).<br>x: " + xs.join(", ") + "<br>y: " + shown.join(", ") + "<br>What is the missing y value?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-missing-value", m: m, b: b, qx: qx });
}, ["Each y value comes from substituting its x value into the equation.", "Multiply the missing row's x value by the coefficient, then add the constant."]);

// 4. L2, 8.4, CR 3: solve ax + b = c symbolically (some fractional solutions).
E("u6-solve-two-step", 6, ["8.4"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(a * x) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + ") + " + fmt(b) + " = " + fmt(a * x) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the coefficient of x."]);

// 5. L2, 8.1: model a context with an equation of the form ax + b = c.
E("u6-model-equation", 6, ["8.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 9), b = ri(3, 20), x = ri(3, 12), c = a * x + b;
    if (a === b) continue;
    var ctx = pick([
      "A rink rental costs a $" + b + " booking fee plus $" + a + " for each hour. The total cost was $" + c + ". Let x be the number of hours rented.",
      "A ferry tour costs a $" + b + " harbour fee plus $" + a + " for each passenger. The total cost was $" + c + ". Let x be the number of passengers.",
      "A snow-clearing service charges a $" + b + " call-out fee plus $" + a + " for each driveway cleared. The total charge was $" + c + ". Let x be the number of driveways cleared."
    ]);
    var corr = "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\)";
    var ds = u6pick3(corr, [
      { t: "\\(" + fmt(b) + "x + " + fmt(a) + " = " + fmt(c) + "\\)", fb: "That swaps the fee and the per-unit charge. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\)", fb: "That multiplies the fee by " + a + " as well. The fee is paid once, not once per unit." },
      { t: "\\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\)", fb: "That divides x by the per-unit charge. Each unit adds $" + a + ", so x is multiplied by " + a + "." },
      { t: "\\(" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + "\\)", fb: "That moves the fee to the wrong side. In the model, the fee and the unit charges together make the total." }
    ]);
    if (!ds) continue;
    var sol = "The $" + b + " fee is paid once, and the $" + a + " charge is paid x times, for a total of $" + c + ": \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\end{aligned} \\] So the equation that models the problem is <b>" + corr + "</b>.";
    return mcq(ctx + " Which equation models this problem?",
      { t: corr, fb: "Correct. The per-unit charge multiplies x, the one-time fee stands alone, and together they equal the total." }, ds, sol,
      { mode: "model-equation", a: a, b: b, c: c });
  }
  return mcq("A rink rental costs a $10 booking fee plus $4 for each hour. The total cost was $34. Let x be the number of hours rented. Which equation models this problem?",
    { t: "\\(4x + 10 = 34\\)", fb: "Correct. The per-hour charge multiplies x and the fee stands alone." },
    [{ t: "\\(10x + 4 = 34\\)", fb: "That swaps the fee and the per-hour charge." }, { t: "\\(4(x + 10) = 34\\)", fb: "That multiplies the fee by 4 as well." }, { t: "\\(4x = 34 + 10\\)", fb: "That moves the fee to the wrong side." }],
    "The $4 charge is paid x times and the $10 fee once: \\[ \\begin{aligned} 4x + 10 &= 34 \\end{aligned} \\] So the model is <b>\\(4x + 10 = 34\\)</b>.", { mode: "model-equation-fallback" });
}, ["Decide which amount is paid once and which is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount is added once."]);

// 6. L2, 8.7, CR 3: solve a problem using a linear equation.
E("u6-solve-context-problem", 6, ["8.7"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(4, 25), x = ri(3, 14), c = a * x + b;
  var ctx = pick([
    { q: "A school rents a bus for a field trip. The rental costs a $" + b + " booking fee plus $" + a + " for each kilometre driven. The total bill was $" + c + ". How many kilometres did the bus drive?", unit: "kilometres" },
    { q: "A community hall charges a $" + b + " setup fee plus $" + a + " for each table rented. A group paid $" + c + " in total. How many tables did the group rent?", unit: "tables" },
    { q: "A bike shop charges a $" + b + " service fee plus $" + a + " for each gear adjusted. A customer paid $" + c + " in total. How many gears were adjusted?", unit: "gears" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + ". The fee is paid once and the $" + a + " charge is paid \\(x\\) times: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the answer is <b>" + fmt(x) + " " + ctx.unit + "</b>.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-context-problem", a: a, b: b, c: c, unit: ctx.unit });
}, ["Write an equation first: one-time fee plus per-unit charge times the unknown, equal to the total.", "Subtract the fee from the total, then divide what is left by the per-unit charge."]);

// 7. L2, 8.6: identify an error in a worked solution.
E("u6-identify-error", 6, ["8.6"], 2, "gen", function () {
  var type = pick(["add-instead", "divide-one-term", "distribute-part"]);
  if (type === "add-instead") {
    var a = ri(2, 8), b = a * ri(1, 2), x = ri(2, 11), c = a * x + b;
    var wrong = (c + b) / a;
    var prompt = "A student solves \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\) and writes: \"" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + ", so x = " + fmt(wrong) + ".\" What error did the student make?";
    var corr = "The student added " + fmt(b) + " to both sides instead of subtracting it.";
    var sol = "To undo adding " + fmt(b) + ", subtract " + fmt(b) + " from both sides: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " = " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the error is <b>" + corr + "</b>";
    return mcq(prompt, { t: corr, fb: "Correct. The inverse of adding " + fmt(b) + " is subtracting " + fmt(b) + "." },
      [
        { t: "The student divided by " + fmt(a) + " too early, before dealing with the " + fmt(b) + ".", fb: "Look at the student's first line: the division step never happened. The change made to the " + fmt(b) + " is where the work goes wrong." },
        { t: "The student multiplied both sides by " + fmt(a) + " instead of dividing.", fb: "No multiplication by " + fmt(a) + " appears in the work. Compare the first line with the original equation." },
        { t: "There is no error; the student's answer is correct after all.", fb: "Check the answer by substitution: " + fmt(a) + "(" + fmt(wrong) + ") + " + fmt(b) + " does not equal " + fmt(c) + "." }
      ], sol, { mode: "identify-error-add", a: a, b: b });
  }
  if (type === "divide-one-term") {
    var a2 = ri(2, 8), b2 = a2 * ri(1, 2), x2 = ri(3, 11), c2 = a2 * x2 + b2;
    var prompt2 = "A student solves \\(" + fmt(a2) + "x + " + fmt(b2) + " = " + fmt(c2) + "\\) and writes: \"x + " + fmt(b2) + " = " + fmt(c2 / a2) + ", so x = " + fmt(c2 / a2 - b2) + ".\" What error did the student make?";
    var corr2 = "The student divided the " + fmt(a2) + "x term and the total by " + fmt(a2) + ", but did not divide the " + fmt(b2) + " term.";
    var sol2 = "Every term must be treated the same way. It is simpler to subtract first: \\[ \\begin{aligned} " + fmt(a2) + "x + " + fmt(b2) + " &= " + fmt(c2) + " \\\\ " + fmt(a2) + "x &= " + fmt(c2 - b2) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the error is <b>" + corr2 + "</b>";
    return mcq(prompt2, { t: corr2, fb: "Correct. Dividing only some terms by " + fmt(a2) + " changes the equation." },
      [
        { t: "The student subtracted " + fmt(b2) + " from one side only, not from both sides of the equation.", fb: "The student never subtracted " + fmt(b2) + " at all. Look at which terms were divided in the first line." },
        { t: "The student used the wrong variable in the final answer and in the working.", fb: "The variable is x throughout. The problem is in how the terms were divided." },
        { t: "There is no error in the student's work; dividing the terms in that way is valid and the answer is correct.", fb: "Check by substitution: " + fmt(a2) + "(" + fmt(c2 / a2 - b2) + ") + " + fmt(b2) + " does not equal " + fmt(c2) + "." }
      ], sol2, { mode: "identify-error-divide", a: a2, b: b2 });
  }
  var a3 = ri(2, 6), b3 = ri(2, 9), x3 = ri(2, 10), c3 = a3 * (x3 + b3);
  var prompt3 = "A student solves \\(" + fmt(a3) + "(x + " + fmt(b3) + ") = " + fmt(c3) + "\\) and writes: \"" + fmt(a3) + "x + " + fmt(b3) + " = " + fmt(c3) + ".\" What error did the student make?";
  var corr3 = "The student multiplied only the x term by " + fmt(a3) + " and left the " + fmt(b3) + " term unchanged.";
  var sol3 = "The distributive property multiplies every term inside the brackets: \\[ \\begin{aligned} " + fmt(a3) + "(x + " + fmt(b3) + ") &= " + fmt(c3) + " \\\\ " + fmt(a3) + "x + " + fmt(a3 * b3) + " &= " + fmt(c3) + " \\end{aligned} \\] So the error is <b>" + corr3 + "</b>";
  return mcq(prompt3, { t: corr3, fb: "Correct. The number outside the brackets multiplies both terms inside." },
    [
      { t: "The student added " + fmt(a3) + " and " + fmt(b3) + " instead of multiplying the terms inside the brackets.", fb: "No addition of " + fmt(a3) + " and " + fmt(b3) + " appears. One bracket term was multiplied and the other was not." },
      { t: "The student should have divided both sides by " + fmt(b3) + " first, before expanding the brackets.", fb: "Dividing by " + fmt(a3) + " first would be a valid start; dividing by " + fmt(b3) + " is not the issue in this work." },
      { t: "There is no error; expanding the brackets gives exactly that line.", fb: "Expanding gives " + fmt(a3) + "x + " + fmt(a3 * b3) + ", not " + fmt(a3) + "x + " + fmt(b3) + "." }
    ], sol3, { mode: "identify-error-distribute", a: a3, b: b3 });
}, ["Compare the student's first line with the original equation, term by term.", "Ask what the student did to each term, and whether the same was done to every term."]);

// 8. L2, 8.2: visual (tile/balance) representation of a solving step.
E("u6-visual-step", 6, ["8.2"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 6), b = ri(2, 12), x = ri(2, 11), c = a * x + b;
    var step = pick(["remove", "split"]);
    if (step === "remove") {
      var corr = "\\(" + fmt(a) + "x = " + fmt(c - b) + "\\)";
      var ds = u6pick3(corr, [
        { t: "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c - b) + "\\)", fb: "That removes the unit tiles from one side only. A balance stays level only when the same tiles leave both sides." },
        { t: "\\(" + fmt(a) + "x = " + fmt(c + b) + "\\)", fb: "That adds tiles to the right side. The picture removes " + fmt(b) + " unit tiles from each side." },
        { t: "\\(x = " + fmt(c - b) + "\\)", fb: "That skips a step. The bags are still closed at this stage, so the left side is still " + fmt(a) + "x." }
      ]);
      if (!ds) continue;
      var sol = "Removing " + fmt(b) + " unit tiles from both sides keeps the balance level: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\end{aligned} \\] So the picture after this step shows <b>" + corr + "</b>.";
      return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) and " + fmt(b) + " loose counters on the left pan, balanced by " + fmt(c) + " counters on the right pan. The next picture removes " + fmt(b) + " loose counters from each pan. Which equation does the next picture show?",
        { t: corr, fb: "Correct. The same removal on both sides gives " + fmt(a) + "x = " + fmt(c - b) + "." }, ds, sol,
        { mode: "visual-remove", a: a, b: b });
    }
    var tot = a * x, per = x;
    var corrS = "\\(x = " + fmt(x) + "\\)";
    var dsS = u6pick3(corrS, [
      { t: "\\(x = " + fmt(per + 1) + "\\)", fb: "Count again: " + fmt(tot) + " counters split into " + fmt(a) + " equal groups gives " + fmt(per) + " in each group." },
      { t: "\\(" + fmt(a) + "x = " + fmt(tot) + "\\)", fb: "That is the picture before splitting. After the split, each single bag stands alone." },
      { t: "\\(x = " + fmt(tot) + "\\)", fb: "That gives one bag all " + fmt(tot) + " counters. The counters are shared equally among " + fmt(a) + " bags." }
    ]);
    if (!dsS) continue;
    var solS = "The model splits " + fmt(tot) + " counters into " + fmt(a) + " equal groups, one group for each bag: \\[ \\begin{aligned} x &= " + fmt(tot) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the final picture shows <b>" + corrS + "</b>.";
    return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) balanced by " + fmt(tot) + " counters. The final picture splits the counters into " + fmt(a) + " equal groups and matches one group with one bag. Which equation does the final picture show?",
      { t: corrS, fb: "Correct. Each bag matches one equal group of " + fmt(per) + " counters." }, dsS, solS,
      { mode: "visual-split", a: a, c: tot });
  }
  return mcq("A balance model shows 3 closed bags (each holding x counters) and 4 loose counters on the left pan, balanced by 19 counters on the right pan. The next picture removes 4 loose counters from each pan. Which equation does the next picture show?",
    { t: "\\(3x = 15\\)", fb: "Correct. The same removal on both sides gives 3x = 15." },
    [{ t: "\\(3x + 4 = 15\\)", fb: "That removes counters from one side only." }, { t: "\\(3x = 23\\)", fb: "That adds counters instead of removing them." }, { t: "\\(x = 15\\)", fb: "The bags are still closed, so the left side is still 3x." }],
    "Removing 4 from both sides: \\[ \\begin{aligned} 3x + 4 &= 19 \\\\ 3x &= 15 \\end{aligned} \\] So the picture shows <b>\\(3x = 15\\)</b>.", { mode: "visual-remove-fallback" });
}, ["A balance picture changes the equation only when the same change is made on both sides.", "Match each part of the picture to a term: bags are x terms, loose counters are numbers."]);

// 9. L2, 8.5, CR 3: solve a(x + b) = c using the distributive property.
E("u6-solve-distributive", 6, ["8.5"], 2, "gen", function () {
  var a = ri(2, 7), b = ri(1, 10), x = ri(2, 13), c = a * (x + b);
  var sol = "Apply the distributive property first, then solve: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(a * b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + " + " + fmt(b) + ") = " + fmt(a) + "(" + fmt(x + b) + ") = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-distributive", a: a, b: b });
}, ["The number outside the brackets multiplies every term inside the brackets.", "Expand the brackets first, then subtract and divide as usual."]);

// 10. L2, 8.4, CR 2: solve x/a + b = c.
E("u6-solve-div-plus", 6, ["8.4"], 2, "gen", function () {
  var a = ri(2, 8), b = ri(1, 12), d = ri(2, 11), x = a * d, c = d + b;
  var sol = "Subtract first, then undo the division by multiplying: \\[ \\begin{aligned} \\frac{x}{" + a + "} + " + fmt(b) + " &= " + fmt(c) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(c) + " - " + fmt(b) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(d) + " \\\\ x &= " + fmt(d) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(\\frac{" + fmt(x) + "}{" + a + "} + " + fmt(b) + " = " + fmt(d) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-div-plus", a: a, b: b, d: d });
}, ["Work in reverse order: deal with the added number before the division.", "Subtract the constant from both sides, then multiply both sides by the divisor."]);

// 11. L1, 7.3: missing y value in an ordered pair (forward mode; split under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair", 6, ["7.3"], 1, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var x = ri(1, 9), y = m * x + b;
  var sol = "Substitute \\(x = " + x + "\\) into the equation: \\[ \\begin{aligned} y &= " + fmt(m) + "(" + x + ")" + u6sgn(b) + " \\\\ &= " + fmt(m * x) + u6sgn(b) + " \\\\ &= " + fmt(y) + " \\end{aligned} \\] So the missing value in the pair \\((" + x + ", \\ ?)\\) is <b>" + fmt(y) + "</b>.";
  return numq("The ordered pair \\((" + x + ", \\ ?)\\) lies on the relation \\(y = " + fmt(m) + "x" + u6sgn(b) + "\\). What is the missing y value?", y, 0.01, sol,
    { mode: "missing-pair-y", m: m, b: b, x: x });
}, ["An ordered pair on a relation must satisfy its equation when the known value is substituted.", "Substitute the known coordinate, then solve the small equation that remains."]);

// 11b. L2, 7.3, CR 2: missing x value in an ordered pair (backward mode; split from u6-missing-ordered-pair under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair-backward", 6, ["7.3"], 2, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var xt = ri(2, 10), yt = m * xt + b;
  var sol2 = "Substitute \\(y = " + yt + "\\) and solve for \\(x\\): \\[ \\begin{aligned} " + fmt(yt) + " &= " + fmt(m) + "x" + u6sgn(b) + " \\\\ " + fmt(yt) + (b >= 0 ? " - " + fmt(b) : " + " + fmt(-b)) + " &= " + fmt(m) + "x \\\\ " + fmt(yt - b) + " &= " + fmt(m) + "x \\\\ x &= " + fmt(xt) + " \\end{aligned} \\] So the missing value in the pair \\((?, " + fmt(yt) + ")\\) is <b>" + fmt(xt) + "</b>.";
  return numq("The ordered pair \\((?, " + fmt(yt) + ")\\) lies on the relation \\(y = " + fmt(m) + "x" + u6sgn(b) + "\\). What is the missing x value?", xt, 0.01, sol2,
    { mode: "missing-pair-x", m: m, b: b, yt: yt });
}, ["An ordered pair on a relation must satisfy its equation when the known value is substituted.", "Substitute the known coordinate, then solve the small equation that remains."]);

// 12. L2, 7.1: describe the relationship shown in a graph of discrete points.
E("u6-describe-graph", 6, ["7.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var ctx = pick([
      { xl: "guests", yl: "cost ($)", thing: "total cost in dollars", per: "guest" },
      { xl: "hours", yl: "distance (km)", thing: "distance in kilometres", per: "hour" },
      { xl: "weeks", yl: "savings ($)", thing: "savings in dollars", per: "week" }
    ]);
    var b = ri(0, 8), m = ri(2, 6);
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
    var corr = "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m) + ", starting from " + fmt(b) + ".";
    var ds = u6pick3(corr, [
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(b) + ", starting from " + fmt(m) + ".", fb: "That swaps the start and the step. The first point sits at " + fmt(b) + ", and neighbouring points rise by " + fmt(m) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m + 1) + ", starting from " + fmt(b) + ".", fb: "The start is right, but compare two neighbouring points: the rise is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " shrinks by " + fmt(m) + ", starting from " + fmt(b) + ".", fb: "The points rise as x grows, so the values grow; they do not shrink." },
      { t: "As the x value grows by " + fmt(m) + ", the " + ctx.thing + " grows by 1, starting from " + fmt(b) + ".", fb: "That reverses the roles of the step and the x change. Read across one step in x and check the rise in y." }
    ]);
    if (!ds) continue;
    var sol = "Read the first point and the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the relationship is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation as separate points. The x-axis is measured in " + ctx.xl + " and the y-axis in " + ctx.yl + ". Which sentence describes the relationship between the variables?",
      { t: corr, fb: "Correct. The first point gives the start and the steady rise gives the step." }, ds, sol,
      { mode: "describe-graph", b: b, m: m, ctx: ctx.xl });
    q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation as separate points. The x-axis is measured in hours and the y-axis in distance (km). Which sentence describes the relationship between the variables?",
    { t: "As the x value grows by 1, the distance in kilometres grows by 3, starting from 2.", fb: "Correct. The first point gives the start and the steady rise gives the step." },
    [{ t: "As the x value grows by 1, the distance in kilometres grows by 2, starting from 3.", fb: "That swaps the start and the step." }, { t: "As the x value grows by 1, the distance in kilometres grows by 4, starting from 2.", fb: "The rise between neighbouring points is 3, not 4." }, { t: "As the x value grows by 1, the distance in kilometres shrinks by 3, starting from 2.", fb: "The points rise, so the values grow." }],
    "The first point is 2 and neighbouring points rise by 3, so the relationship is <b>as x grows by 1, the distance grows by 3, starting from 2</b>.", { mode: "describe-graph-fallback" });
  var pf = []; for (var k2 = 0; k2 <= 5; k2++) pf.push([k2, 2 + 3 * k2]);
  qf.figure = u6graphPts({ xmax: 5, ymax: 17, xlab: "hours", ylab: "distance (km)", points: pf });
  return qf;
}, ["Start with the point where x is 0: that is the starting value of the relation.", "Compare two neighbouring points to find how much y changes for each step of 1 in x."]);

// 13. L2, 7.4: construct the graph (choose the correct set of plotted points) for an equation.
E("u6-construct-graph-points", 6, ["7.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var m = ri(2, 6), b = ri(1, 8);
    if (m === b) continue;
    var win = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4], [2, 3, 4, 5]]);
    function setStr(mm, bb) { var p = []; for (var k = 0; k < win.length; k++) p.push("(" + win[k] + ", " + fmt(mm * win[k] + bb) + ")"); return p.join(", "); }
    var corr = setStr(m, b);
    var ds = u6pick3(corr, [
      { t: setStr(b, m), fb: "That set comes from swapping the step and the start. Check the point where x = 0: its y value should be " + fmt(b) + "." },
      { t: setStr(m, -b), fb: "That set subtracts the start value. At x = 0 the equation gives y = " + fmt(b) + ", a positive value." },
      { t: setStr(m + 1, b), fb: "That set uses a step of " + fmt(m + 1) + ". The equation's step is the number multiplying x, which is " + fmt(m) + "." },
      { t: setStr(m, b + m), fb: "That set starts one step too high. At x = 0 the y value is the start, " + fmt(b) + ", not " + fmt(b + m) + "." }
    ]);
    if (!ds) continue;
    var lines = win.map(function (xv) { return "x=" + xv + "&:\\ y = " + fmt(m * xv + b); }).join(" \\\\ ");
    var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\): \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Plotting those values gives the point set <b>" + corr + "</b>.";
    return mcq("A graph of the relation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\) is constructed by plotting points for \\(x = " + win.join(", ") + "\\). Which set of points is plotted?",
      { t: corr, fb: "Correct. Each point comes from substituting its x value into the equation." }, ds, sol,
      { mode: "construct-graph-points", m: m, b: b });
  }
  return mcq("A graph of the relation \\(y = 2x + 3\\) is constructed by plotting points for \\(x = 0, 1, 2, 3\\). Which set of points is plotted?",
    { t: "(0, 3), (1, 5), (2, 7), (3, 9)", fb: "Correct. Each point comes from substituting its x value into the equation." },
    [{ t: "(0, 2), (1, 5), (2, 8), (3, 11)", fb: "That set swaps the step and the start." }, { t: "(0, -3), (1, -1), (2, 1), (3, 3)", fb: "That set subtracts the start value." }, { t: "(0, 3), (1, 6), (2, 9), (3, 12)", fb: "That set uses a step of 3 instead of 2." }],
    "Substitute each x value: \\[ \\begin{aligned} x=0&:\\ y = 3 \\\\ x=1&:\\ y = 5 \\\\ x=2&:\\ y = 7 \\\\ x=3&:\\ y = 9 \\end{aligned} \\] The plotted set is <b>(0, 3), (1, 5), (2, 7), (3, 9)</b>.", { mode: "construct-graph-points-fallback" });
}, ["Build the points one at a time by substituting x = 0, 1, 2, 3 into the equation.", "The point at x = 0 always has y equal to the start value in the equation."]);

// 14. L3, 8.7, CR 3: a problem in the a(x + b) = c form.
E("u6-solve-group-problem", 6, ["8.7"], 3, "gen", function () {
  var a = ri(3, 6), b = ri(1, 4), x = ri(4, 15), c = a * (x + b);
  var ctx = pick([
    { q: "A school books " + a + " vans for a trip. Each van carries x students and " + b + " teachers. In total, " + c + " people are travelling. How many students are in each van?", unit: "students" },
    { q: "A coach packs " + a + " identical kits. Each kit holds x pucks and " + b + " rolls of tape. In total, the kits hold " + c + " items. How many pucks are in each kit?", unit: "pucks" },
    { q: "A baker fills " + a + " boxes. Each box holds x muffins and " + b + " cookies. In total, the boxes hold " + c + " baked items. How many muffins are in each box?", unit: "muffins" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + " in each group. Each of the " + a + " groups holds \\(x + " + b + "\\) items: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So there are <b>" + fmt(x) + " " + ctx.unit + "</b> in each group.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-group-problem", a: a, b: b, unit: ctx.unit });
}, ["Each group holds the unknown amount plus the fixed extra, and there are several identical groups.", "Write the equation with brackets, expand, then subtract and divide."]);

// 15. L3, 7.3, CR 2: extend a graphed discrete relation to a missing ordered pair.
E("u6-graph-extend-pair", 6, ["7.3"], 3, "gen", function () {
  var ctx = pick([
    { xl: "crates", yl: "bottles", thing: "bottles" },
    { xl: "days", yl: "laps", thing: "laps" },
    { xl: "bags", yl: "marbles", thing: "marbles" }
  ]);
  var b = ri(1, 9), m = ri(2, 5), xmax = 4, xq = ri(6, 9);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
  var sol = "The points follow a steady pattern with start " + fmt(b) + " and step " + fmt(m) + ", so the relation is \\(y = " + fmt(m) + "x + " + fmt(b) + "\\). Extend it to \\(x = " + xq + "\\): \\[ \\begin{aligned} y &= " + fmt(m) + "(" + xq + ") + " + fmt(b) + " \\\\ &= " + fmt(m * xq) + " + " + fmt(b) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the missing value in the pair \\((" + xq + ", \\ ?)\\) is <b>" + fmt(ans) + "</b>.";
  var q = numq("The graph shows a linear relation as separate points. The x-axis is measured in " + ctx.xl + " and the y-axis in " + ctx.yl + ". The pattern continues in the same way. What is the missing y value in the ordered pair (" + xq + ", ?)?", ans, 0.01, sol,
    { mode: "graph-extend-pair", b: b, m: m, xq: xq, ctx: ctx.xl });
  q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
  return q;
}, ["Work out the pattern from the plotted points first: a start value and a steady step.", "Build the equation from the start and step, then substitute the given x value."]);

// 16. L3, 8.3: verify a claimed solution by substitution and judge the conclusion.
E("u6-verify-conclusion", 6, ["8.3"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 8), b = ri(1, 12), xt = ri(2, 12), c = a * xt + b;
    var claim = xt + pick([-3, -2, -1, 1, 2, 3]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = "The check gives a left side of " + fmt(lhs) + ", not " + fmt(c) + ", so x = " + claim + " is not the solution; the solution is x = " + fmt(xt) + ".";
    var ds = u6pick3(corr, [
      { t: "The check gives a left side of " + fmt(lhs) + ", which matches " + fmt(c) + ", so x = " + claim + " is the solution and the claim is correct.", fb: "Compare the two sides: the left side works out to " + fmt(lhs) + " and the right side is " + fmt(c) + ". They are not equal." },
      { t: "The check gives a left side of " + fmt(c) + ", so x = " + claim + " is the solution; no further work is needed.", fb: "That states the right side as the result of the check without doing the substitution. Work out " + fmt(a) + "(" + claim + ") + " + fmt(b) + " first." },
      { t: "Substitution cannot check this equation, so the claim must be accepted as it stands.", fb: "Substitution checks any equation: replace x with the claimed value and compare the two sides." },
      { t: "The check gives a left side of " + fmt(lhs + a) + ", so the solution is x = " + fmt(claim) + " after all, and the claim was right all along.", fb: "Recheck the multiplication: " + fmt(a) + " times " + claim + " is " + fmt(a * claim) + ", and adding " + fmt(b) + " gives " + fmt(lhs) + "." }
    ]);
    if (!ds) continue;
    var sol = "Substitute the claimed value and compare the sides: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(a) + "(" + claim + ") + " + fmt(b) + " \\\\ &= " + fmt(lhs) + " \\\\ " + fmt(lhs) + " &\\ne " + fmt(c) + " \\end{aligned} \\] Solving the equation gives \\(x = " + fmt(xt) + "\\), since \\(" + fmt(a) + "(" + fmt(xt) + ") + " + fmt(b) + " = " + fmt(c) + "\\). So the correct conclusion is <b>" + corr + "</b>";
    return mcq("A student claims that \\(x = " + claim + "\\) is the solution of \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\) and checks it by substitution. Which conclusion is correct?",
      { t: corr, fb: "Correct. The substituted left side does not match the right side, so the claim fails the check." }, ds, sol,
      { mode: "verify-conclusion", a: a, b: b, claim: claim });
  }
  return mcq("A student claims that \\(x = 5\\) is the solution of \\(3x + 2 = 14\\) and checks it by substitution. Which conclusion is correct?",
    { t: "The check gives a left side of 17, not 14, so x = 5 is not the solution; the solution is x = 4.", fb: "Correct. 3(5) + 2 = 17, which does not equal 14." },
    [{ t: "The check gives a left side of 17, which matches 14, so x = 5 is the solution and the claim is correct.", fb: "17 and 14 are not equal, so the claim fails." }, { t: "The check gives a left side of 14, so x = 5 is the solution; no further work is needed.", fb: "Work out 3(5) + 2: it is 17, not 14." }, { t: "Substitution cannot check this equation, so the claim must be accepted as it stands.", fb: "Substitution checks any equation." }],
    "Substitute: \\[ \\begin{aligned} 3x + 2 &= 3(5) + 2 \\\\ &= 17 \\\\ 17 &\\ne 14 \\end{aligned} \\] So the correct conclusion is <b>x = 5 is not the solution; the solution is x = 4</b>.", { mode: "verify-conclusion-fallback" });
}, ["A check by substitution compares the worked-out left side with the right side.", "Do the substitution yourself first, then judge each conclusion against your numbers."]);
