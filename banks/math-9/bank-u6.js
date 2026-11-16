// Math 9 Unit 6 Linear Relations question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 3264 to 3749).
// CRMARKS: u6-pattern-word-total=2
// CRMARKS: u6-table-extend=3
// CRMARKS: u6-point-on-graph=2
// CRMARKS: u6-interpolate-graph=3
// CRMARKS: u6-two-plans-graph=3
// CRMARKS: u6-pattern-solve-n=3
// CRMARKS: u6-pattern-large=2
E("u6-pattern-figure-expr", 6, ["7.1"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + u6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + u6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + u6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = u6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);

// 2. L2, 7.1, CR 2: pattern in words, total at a larger stage.
E("u6-pattern-word-total", 6, ["7.1"], 1, "gen", function () {
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

// 3. L1, 7.2: choose the equation for a simple cost context.
E("u6-context-equation", 6, ["7.2"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "A taxi ride costs a base fee of $" + B + " plus $" + R + " for each kilometre driven. Let \\(x\\) be the number of kilometres and \\(y\\) be the total cost in dollars.",
    "A gym charges a sign-up fee of $" + B + " plus $" + R + " for each class attended. Let \\(x\\) be the number of classes and \\(y\\) be the total cost in dollars.",
    "A plumber charges a call-out fee of $" + B + " plus $" + R + " for each hour of work. Let \\(x\\) be the number of hours and \\(y\\) be the total cost in dollars.",
    "A snack cart charges $" + B + " for a tray plus $" + R + " for each drink on it. Let \\(x\\) be the number of drinks and \\(y\\) be the total cost in dollars."
  ]);
  var corr = "\\(y = " + u6lin(R, B, "x") + "\\)";
  var sol = "The fee of $" + B + " is paid once, and the $" + R + " charge is paid \\(x\\) times: \\[ \\begin{aligned} y &= " + B + " + " + fmt(R) + "x \\end{aligned} \\] So the equation is <b>" + corr + "</b>.";
  return mcq(ctx + " Which equation gives \\(y\\)?",
    { t: corr, fb: "Correct. The one-time fee is the start value and the per-unit charge is the step." },
    [
      { t: "\\(y = " + u6lin(B, R, "x") + "\\)", fb: "That swaps the two amounts. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "That adds the rate instead of multiplying it by the number of units." },
      { t: "\\(y = " + fmt(B + R) + "x\\)", fb: "That adds the fee and the rate together and multiplies the sum by x, so the fee gets charged every unit." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Decide which amount is paid once and which amount is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount stands alone."]);

// 4. L2, 7.3: given an equation, choose a context it could describe.
E("u6-equation-context", 6, ["7.3"], 1, "var", varset([
  function () {
    return mcq("Which situation could be described by the equation \\(y = 3x + 2\\)?",
      { t: "A plant is 2 cm tall at the first measuring, then grows 3 cm each week. y is its height in centimetres after x weeks.", fb: "Correct. The start value is 2 and the step is 3 each week." },
      [
        { t: "A plant is 3 cm tall at the first measuring, then grows 2 cm each week. y is its height in centimetres after x weeks.", fb: "That situation gives y = 2x + 3: the start and step are swapped." },
        { t: "A full tank holds 2 L of water and drains 3 L each hour until it is empty. y is the water left after x hours.", fb: "Draining makes y decrease, but the equation has y growing by 3 each step." },
        { t: "A store sells notebooks for $3 each and pens for $2 each. y is the cost of x notebooks and x pens bought together.", fb: "That cost is 3x + 2x, which is 5x, with no start value added once." }
      ],
      "In \\(y = 3x + 2\\), the start value is 2 and the step is +3 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 2 + 3x \\end{aligned} \\] So the matching situation is <b>the plant that starts at 2 cm and grows 3 cm each week</b>.",
      { mode: "eq-context-plant" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 5x + 10\\)?",
      { t: "A courier charges a $10 pickup fee plus $5 for each kilometre. y is the total charge in dollars for x kilometres.", fb: "Correct. The start value is 10 and the step is 5 per kilometre." },
      [
        { t: "A courier charges a $5 pickup fee plus $10 for each kilometre. y is the total charge in dollars for x kilometres.", fb: "That situation gives y = 10x + 5: the fee and the rate are swapped." },
        { t: "A savings jar holds $10 and $5 is taken out each week. y is the money left after x weeks.", fb: "Taking money out makes y decrease, but the equation has y growing by 5 each step." },
        { t: "A shop sells shirts for $5 each and hats for $10 each. y is the cost of x shirts and x hats.", fb: "That cost is 5x + 10x, which is 15x, with no fee added once." }
      ],
      "In \\(y = 5x + 10\\), the start value is 10 and the step is +5 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 10 + 5x \\end{aligned} \\] So the matching situation is <b>the courier with a $10 fee and $5 per kilometre</b>.",
      { mode: "eq-context-courier" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 2x + 7\\)?",
      { t: "A jar starts with $7 in it, and $2 is added each week. y is the amount in the jar after x weeks.", fb: "Correct. The start value is 7 and the step is 2 each week." },
      [
        { t: "A jar starts with $2 in it, and $7 is added each week. y is the amount in the jar after x weeks.", fb: "That situation gives y = 7x + 2: the start and step are swapped." },
        { t: "A rope 7 m long is cut into pieces of 2 m each. y is the number of pieces cut from x ropes in total.", fb: "That count depends on division, and it has no start value of 7 added once." },
        { t: "A class buys 2 markers for each of x students and 7 for each of x teachers. y is the total markers.", fb: "That total is 2x + 7x, which is 9x, with no start value added once." }
      ],
      "In \\(y = 2x + 7\\), the start value is 7 and the step is +2 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 7 + 2x \\end{aligned} \\] So the matching situation is <b>the jar that starts with $7 and gains $2 each week</b>.",
      { mode: "eq-context-jar" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 4x + 1\\)?",
      { t: "A tank holds 1 L of water and is filled at 4 L each minute. y is the amount of water after x minutes.", fb: "Correct. The start value is 1 and the step is 4 each minute." },
      [
        { t: "A tank holds 4 L of water and is filled at 1 L each minute. y is the amount of water after x minutes.", fb: "That situation gives y = x + 4: the start and step are swapped." },
        { t: "A cake is shared equally among 4 friends, and 1 extra slice is saved for later. y is the size of each share.", fb: "Sharing is division, and the shares get smaller as x grows, unlike this equation." },
        { t: "A gym sells 4 passes in the morning and 1 pass each hour after that. y is the passes sold after x hours.", fb: "That wording makes the 4 a one-time amount for the morning, which swaps the roles of 4 and 1." }
      ],
      "In \\(y = 4x + 1\\), the start value is 1 and the step is +4 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 1 + 4x \\end{aligned} \\] So the matching situation is <b>the tank that starts with 1 L and fills at 4 L each minute</b>.",
      { mode: "eq-context-tank" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 6x + 3\\)?",
      { t: "A bus has 3 passengers at its first stop, and 6 more passengers board at each stop after that. y is the number of passengers after x stops.", fb: "Correct. The start value is 3 and the step is 6 at each stop." },
      [
        { t: "A bus has 6 passengers at its first stop, and 3 more passengers board at each stop after that. y is the number of passengers after x stops.", fb: "That situation gives y = 3x + 6: the start and step are swapped." },
        { t: "A baker packs 6 rolls in each box and keeps 3 boxes aside. y is the number of rolls in x boxes that are packed for sale each day.", fb: "That count is 6x with 3 boxes, not 3 rolls, held back; the equation adds 3 once to y." },
        { t: "A team scores 6 points for each of x games and 3 points for each of x practices. y is the total points scored by the team.", fb: "That total is 6x + 3x, which is 9x, with no start value added once." }
      ],
      "In \\(y = 6x + 3\\), the start value is 3 and the step is +6 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 3 + 6x \\end{aligned} \\] So the matching situation is <b>the bus that starts with 3 passengers and gains 6 at each stop</b>.",
      { mode: "eq-context-bus" });
  },
  function () {
    return mcq("Which situation could be described by the equation \\(y = 10x + 5\\)?",
      { t: "A hall rental costs a $5 booking fee plus $10 for each hour. y is the total cost in dollars for x hours.", fb: "Correct. The start value is 5 and the step is 10 per hour." },
      [
        { t: "A hall rental costs a $10 booking fee plus $5 for each hour. y is the total cost in dollars for x hours.", fb: "That situation gives y = 5x + 10: the fee and the rate are swapped." },
        { t: "A trail pass costs $5 for each of x walkers, and the group also pays $10 for parking. y is the total cost in dollars.", fb: "That situation gives y = 5x + 10: the per-person cost and the one-time cost are swapped." },
        { t: "A farm stand sells melons for $10 each and berries for $5 a box. y is the cost of x melons and x boxes of berries.", fb: "That cost is 10x + 5x, which is 15x, with no fee added once." }
      ],
      "In \\(y = 10x + 5\\), the start value is 5 and the step is +10 for each increase of 1 in \\(x\\): \\[ \\begin{aligned} y &= 5 + 10x \\end{aligned} \\] So the matching situation is <b>the hall rental with a $5 fee and $10 per hour</b>.",
      { mode: "eq-context-hall" });
  }
]), ["In the equation, the number added once is the start value and the number multiplying x is the step.", "Match the start value first: look for the situation with that one-time amount."]);

// 5. L1, 7.4: table of values as text lines, choose the equation.
E("u6-table-equation", 6, ["7.4"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + u6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + u6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + u6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + u6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);

// 6. L2, 7.4, CR 3: table pattern, value beyond the table.
E("u6-table-extend", 6, ["7.4"], 2, "gen", function () {
  var S = ri(2, 15), P = ri(2, 8), X = ri(8, 15);
  var xs = [0, 1, 2, 3], ys = xs.map(function (x) { return S + P * x; });
  var ans = S + P * X;
  var sol = "The step is the change in \\(y\\) for each increase of 1 in \\(x\\), and the start value is the \\(y\\) value at \\(x = 0\\): \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\\\ y &= " + S + " + " + fmt(P) + "x \\\\ y(" + X + ") &= " + S + " + " + fmt(P) + "(" + X + ") \\\\ &= " + S + " + " + fmt(P * X) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value at \\(x = " + X + "\\) is <b>" + fmt(ans) + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>The pattern continues with the same step. What is the value of y when x = " + X + "?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-extend", S: S, P: P, X: X });
}, ["Build the equation from the table first: start value plus step times x.", "The start value is the y value at x = 0, and the step is the change in y for each +1 in x."]);

// 7. L2, 7.5: graphed relation, choose the description of its pattern.
E("u6-graph-describe", 6, ["7.5"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  for (var att = 0; att < 300; att++) {
    var b = ri(1, 6), m = ri(1, 3), ctx = pick(ctxs);
    var corr = "It starts at " + fmt(b) + " and increases by " + fmt(m) + " each step.";
    var cands = [
      { t: "It starts at " + fmt(m) + " and increases by " + fmt(b) + " each step.", fb: "That swaps the start and the step. The line crosses the y-axis at " + fmt(b) + "." },
      { t: "It starts at " + fmt(b) + " and increases by " + fmt(m + 1) + " each step.", fb: "The start is right, but check the rise between two neighbouring points: it is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "It starts at " + fmt(b + 1) + " and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not " + fmt(b + 1) + "." },
      { t: "It starts at " + fmt(b) + " and decreases by " + fmt(m) + " each step.", fb: "The line rises as x grows, so the values increase; they do not decrease." },
      { t: "It starts at 0 and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not at 0." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
    var sol = "Read the start where the line crosses the y-axis, then the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the pattern is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which sentence describes the pattern in the graph?",
      { t: corr, fb: "Correct. The y-intercept is the start, and the rise per step is the step." }, ds, sol,
      { mode: "graph-describe", b: b, m: m, ctx: ctx.x });
    q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation. The x-axis is measured in hours and the y-axis in km. Which sentence describes the pattern in the graph?",
    { t: "It starts at 2 and increases by 1 each step.", fb: "Correct. The y-intercept is the start, and the rise per step is the step." },
    [
      { t: "It starts at 1 and increases by 2 each step.", fb: "That swaps the start and the step." },
      { t: "It starts at 2 and increases by 2 each step.", fb: "The rise between neighbouring points is 1, not 2." },
      { t: "It starts at 2 and decreases by 1 each step.", fb: "The line rises, so the values increase." }
    ],
    "The line crosses the y-axis at 2 and rises by 1 per step, so the pattern is <b>It starts at 2 and increases by 1 each step.</b>",
    { mode: "graph-describe", b: 2, m: 1, ctx: "hours" });
  var ptsf = []; for (var k2 = 0; k2 <= 5; k2++) ptsf.push({ x: k2, y: 2 + k2 });
  qf.figure = u6graph({ xmax: 5, ymax: 7, xlab: "hours", ylab: "km", lines: [{ pts: ptsf.map(function (p) { return [p.x, p.y]; }) }], points: ptsf });
  return qf;
}, ["The start value is where the line crosses the y-axis.", "Pick two neighbouring plotted points and find how much y rises from one to the next."]);

// 8. L2, 7.6: one graph drawn, choose its equation.
E("u6-graph-equation", 6, ["7.6"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  var ctx = pick(ctxs);
  var b = ri(1, 8), m = ri(1, 4), att = 0;
  while (b === m && att < 40) { b = ri(1, 8); m = ri(1, 4); att++; }
  if (b === m) { b = 5; m = 2; }
  var xmax = pick([4, 5, 6]), ymax = b + m * xmax;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var corr = "\\(y = " + u6lin(m, b, "x") + "\\)";
  var sol = "Read the start from the y-intercept and the step from two points on the line: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + 2 * m) + " - " + fmt(b + m) + " = " + fmt(m) + " \\end{aligned} \\] So the equation of the line is <b>" + corr + "</b>.";
  var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which equation matches the graphed line?",
    { t: corr, fb: "Correct. The line starts at " + fmt(b) + " and rises by " + fmt(m) + " for each step in x." },
    [
      { t: "\\(y = " + u6lin(b, m, "x") + "\\)", fb: "That swaps the start value and the step. The y-intercept is " + fmt(b) + "." },
      { t: "\\(y = " + u6lin(m, -b, "x") + "\\)", fb: "That subtracts the start value. The line crosses the y-axis above zero, at " + fmt(b) + "." },
      { t: "\\(x = " + u6lin(m, b, "y") + "\\)", fb: "That exchanges the roles of x and y. On this graph, y depends on x." }
    ], sol, { mode: "graph-equation", b: b, m: m, ctx: ctx.x, xmax: xmax });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Start with the y-intercept: it is the constant in the equation.", "Then find the step: how much y changes when x grows by 1."]);

// 9. L2, 7.7, CR 2: sloped, horizontal or vertical graph; choose a point on it.
E("u6-point-on-graph", 6, ["7.7"], 1, "gen", function () {
  var kind = pick(["slope", "slope", "horiz", "vert"]);
  function pt(x, y) { return "(" + fmt(x) + ", " + fmt(y) + ")"; }
  if (kind === "slope") {
    for (var att = 0; att < 300; att++) {
      var b = ri(1, 5), m = ri(1, 3);
      var xmax = 6, ymax = b + m * xmax;
      var x0 = ri(2, 5), y0 = b + m * x0;
      var corr = pt(x0, y0);
      var raw = [[x0, y0 + 1], [x0, y0 - 1], [x0 + 1, y0], [x0 - 1, y0], [0, m], [y0, x0]];
      var cands = [];
      raw.forEach(function (c) {
        if (c[0] < 0 || c[1] < 0) return;
        if (b + m * c[0] === c[1]) return;
        cands.push({ t: pt(c[0], c[1]), fb: "That point is not on the line. At x = " + fmt(c[0]) + ", the line has y = " + fmt(b + m * c[0]) + "." });
      });
      var ds = u6pick3(corr, cands);
      if (!ds) continue;
      var sol = "Points on the line follow its pattern, starting at " + fmt(b) + " and rising by " + fmt(m) + " per step: \\[ \\begin{aligned} y(" + x0 + ") &= " + b + " + " + fmt(m) + "(" + x0 + ") \\\\ &= " + fmt(y0) + " \\end{aligned} \\] So a point on the graph is <b>" + corr + "</b>.";
      var q = mcq("Which point lies on the graph shown?", { t: corr, fb: "Correct. That point sits exactly on the line." }, ds, sol, { mode: "point-slope", b: b, m: m, x0: x0 });
      q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: "x", ylab: "y", lines: [{ pts: [[0, b], [xmax, ymax]] }] });
      return q;
    }
  } else if (kind === "horiz") {
    var c = ri(2, 9), x0 = ri(1, 5);
    var corrH = pt(x0, c);
    var rawH = [[x0, c + 1], [x0, c + 2], [x0 + 1, c - 1], [c, x0], [x0 + 2, c + 3]];
    var candsH = [];
    rawH.forEach(function (cc) {
      if (cc[1] === c || cc[1] < 0) return;
      candsH.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has y = " + fmt(c) + ", and that point has y = " + fmt(cc[1]) + "." });
    });
    var dsH = u6pick3(corrH, candsH);
    if (dsH) {
      var solH = "The graph is a horizontal line: \\[ \\begin{aligned} y &= " + fmt(c) + " \\end{aligned} \\] Every point on it has \\(y = " + fmt(c) + "\\), whatever its \\(x\\) value is. So a point on the graph is <b>" + corrH + "</b>.";
      var qH = mcq("Which point lies on the graph shown?", { t: corrH, fb: "Correct. Its y value is " + fmt(c) + ", like every point on the line." }, dsH, solH, { mode: "point-horiz", c: c, x0: x0 });
      qH.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[0, c], [6, c]] }] });
      return qH;
    }
  } else {
    var cv = ri(2, 5), y0v = ri(1, 10);
    var corrV = pt(cv, y0v);
    var rawV = [[cv + 1, y0v], [cv - 1, y0v], [y0v, cv], [cv + 2, y0v + 1]];
    var candsV = [];
    rawV.forEach(function (cc) {
      if (cc[0] === cv) return;
      candsV.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has x = " + fmt(cv) + ", and that point has x = " + fmt(cc[0]) + "." });
    });
    var dsV = u6pick3(corrV, candsV);
    if (dsV) {
      var solV = "The graph is a vertical line: \\[ \\begin{aligned} x &= " + fmt(cv) + " \\end{aligned} \\] Every point on it has \\(x = " + fmt(cv) + "\\), whatever its \\(y\\) value is. So a point on the graph is <b>" + corrV + "</b>.";
      var qV = mcq("Which point lies on the graph shown?", { t: corrV, fb: "Correct. Its x value is " + fmt(cv) + ", like every point on the line." }, dsV, solV, { mode: "point-vert", c: cv, y0: y0v });
      qV.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[cv, 0], [cv, 12]] }] });
      return qV;
    }
  }
  var qf = mcq("Which point lies on the graph shown?", { t: "(3, 7)", fb: "Correct. That point sits exactly on the line." },
    [
      { t: "(3, 6)", fb: "At x = 3, the line has y = 7." },
      { t: "(3, 8)", fb: "At x = 3, the line has y = 7." },
      { t: "(4, 7)", fb: "At x = 4, the line has y = 9." }
    ],
    "The line starts at 1 and rises by 2 per step, so at x = 3, y = 7. A point on the graph is <b>(3, 7)</b>.",
    { mode: "point-slope", b: 1, m: 2, x0: 3 });
  qf.figure = u6graph({ xmax: 6, ymax: 13, xlab: "x", ylab: "y", lines: [{ pts: [[0, 1], [6, 13]] }] });
  return qf;
}, ["For a sloped line, use its start and step to find the y value for a given x. For a flat or upright line, check which coordinate stays the same.", "First decide what kind of line it is: sloped, horizontal or vertical."]);

// 10. L2, 7.8, CR 3: interpolate on a context graph.
E("u6-interpolate-graph", 6, ["7.8"], 1, "gen", function () {
  var ctxs = [
    { xl: "hours", yl: "km", prompt: "The graph shows the distance a bus has travelled since leaving the depot. The x-axis is time in hours and the y-axis is distance in kilometres.", ask: "How many kilometres has the bus travelled after XQ hours?" },
    { xl: "minutes", yl: "L", prompt: "The graph shows the water in a tank as it fills. The x-axis is time in minutes and the y-axis is volume in litres.", ask: "How many litres are in the tank after XQ minutes?" },
    { xl: "photos", yl: "$", prompt: "The graph shows the cost of printing photos. The x-axis is the number of photos and the y-axis is the cost in dollars.", ask: "What is the cost of printing XQ photos, in dollars?" },
    { xl: "hours", yl: "cm", prompt: "The graph shows the depth of snow during a storm. The x-axis is time in hours and the y-axis is the depth of snow in centimetres.", ask: "What is the depth of snow after XQ hours, in centimetres?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 10), m = ri(2, 5), xmax = 6, xq = ri(2, 5);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "Read across from \\(x = " + xq + "\\) to the line, then down to the y-axis. The pattern starts at " + fmt(b) + " and steps by " + fmt(m) + ": \\[ \\begin{aligned} y &= " + b + " + " + fmt(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmt(m * xq) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value at \\(x = " + xq + "\\) is <b>" + fmt(ans) + "</b>.";
  var q = numq(ctx.prompt + " " + ctx.ask.replace("XQ", xq), ans, 0.01, sol, { mode: "interpolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Go across from the given x value to the line, then straight down to read the y value.", "You can also use the pattern: start value plus step times x."]);

// 11. L3, 7.9: extrapolate beyond the drawn range.
E("u6-extrapolate-graph", 6, ["7.9"], 3, "gen", function () {
  var ctxs = [
    { xl: "hours", yl: "km", prompt: "The graph shows the distance a delivery van has travelled on a highway trip. The x-axis is time in hours and the y-axis is distance in kilometres.", ask: "If the van keeps travelling in the same way, how many kilometres will it have travelled after XQ hours?" },
    { xl: "weeks", yl: "cm", prompt: "The graph shows the height of a sunflower over its first weeks. The x-axis is time in weeks and the y-axis is height in centimetres.", ask: "If the sunflower keeps growing in the same way, how tall will it be at week XQ, in centimetres?" },
    { xl: "days", yl: "$", prompt: "The graph shows the money in a class fundraising account. The x-axis is time in days and the y-axis is the amount in dollars.", ask: "If the account keeps growing in the same way, how many dollars will be in it after XQ days?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 12), m = ri(2, 6), xmax = 5, xq = ri(8, 12);
  var ymax = b + m * xmax, ans = b + m * xq;
  // Distractors sit in strict order on every draw (m >= 2 and xq >= 8):
  // start plus one step (b + m) < last drawn value (b + 5m) < one step
  // too few (ans - m) < extrapolated value (ans), so all four differ.
  var lastVal = b + m * xmax, shortVal = ans - m, oneStepVal = b + m;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "The asked value is beyond the drawn part of the graph, so extend the pattern. The relation starts at " + fmt(b) + " and steps by " + fmt(m) + ": \\[ \\begin{aligned} y &= " + b + " + " + fmt(m) + "x \\\\ y(" + xq + ") &= " + b + " + " + fmt(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmt(m * xq) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the predicted value at \\(x = " + xq + "\\) is <b>" + fmt(ans) + "</b>.";
  var q = mcq(ctx.prompt + " " + ctx.ask.replace("XQ", xq),
    { t: fmt(ans), fb: "Correct. The pattern starts at " + fmt(b) + " and steps by " + fmt(m) + ", so at x = " + xq + " the value is " + fmt(b) + " + " + fmt(m) + " x " + xq + " = " + fmt(ans) + "." },
    [
      { t: fmt(lastVal), fb: "That is the last value actually drawn on the graph, at x = " + xmax + ". The question asks for x = " + xq + ", which is past the drawn range, so keep extending the pattern instead of stopping there." },
      { t: fmt(shortVal), fb: "That counts one step too few. Reaching x = " + xq + " takes " + xq + " steps of " + fmt(m) + " from the start, not " + (xq - 1) + " steps." },
      { t: fmt(oneStepVal), fb: "That is only the start value plus one step, the value at x = 1. The asked x is " + xq + ", so the step of " + fmt(m) + " must be applied " + xq + " times, not once." }
    ], sol, { mode: "extrapolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["The asked x value is past the end of the drawn graph, so work out the pattern and extend it.", "First get the start value and the step from the drawn part of the graph."]);

// 12. L3, 7.10, CR 3: solve a problem by graphing two plans.
E("u6-two-plans-graph", 6, ["7.10"], 3, "gen", function () {
  var ctxs = [
    { xl: "GB", yl: "$", thing: "phone plans", xu: "GB of data", prompt: "The graph shows the monthly cost of two phone plans for different amounts of data. The x-axis is data used in GB and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." },
    { xl: "days", yl: "$", thing: "car rentals", xu: "days rented", prompt: "The graph shows the cost of two car rental deals for different rental lengths. The x-axis is days rented and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." },
    { xl: "hours", yl: "$", thing: "bike rentals", xu: "hours rented", prompt: "The graph shows the cost of two bike rental deals for different rental times. The x-axis is hours rented and the y-axis is cost in dollars. Plan A is the solid line and Plan B is the dashed line." }
  ];
  var ctx = pick(ctxs);
  var d = ri(1, 3), xs = ri(3, 7), bA = ri(0, 12), mB = ri(1, 4);
  var mA = mB + d, bB = bA + d * xs, ystar = bA + mA * xs;
  var xmax = xs + 3, ymax = bA + mA * xmax + d;
  var mode = pick(["breakeven-x", "breakeven-y", "difference"]);
  var prompt, ans, sol;
  if (mode === "breakeven-x") {
    prompt = ctx.prompt + " At how many " + ctx.xu.split(" ")[0] + " do the two plans cost the same?";
    if (ctx.xu === "GB of data") prompt = ctx.prompt + " At how many GB do the two plans cost the same?";
    if (ctx.xu === "days rented") prompt = ctx.prompt + " After how many days do the two plans cost the same?";
    if (ctx.xu === "hours rented") prompt = ctx.prompt + " After how many hours do the two plans cost the same?";
    ans = xs;
    sol = "The plans cost the same where the two lines cross: \\[ \\begin{aligned} " + bA + " + " + fmt(mA) + "x &= " + bB + " + " + fmt(mB) + "x \\\\ " + fmt(mA) + "x - " + fmt(mB) + "x &= " + bB + " - " + bA + " \\\\ " + fmt(d) + "x &= " + fmt(bB - bA) + " \\\\ x &= " + fmt(xs) + " \\end{aligned} \\] So the two plans cost the same at <b>" + fmt(xs) + "</b>.";
  } else if (mode === "breakeven-y") {
    prompt = ctx.prompt + " The two plans cost the same at one point on the graph. What is that cost, in dollars?";
    ans = ystar;
    sol = "Find the cost where the two lines cross, using either plan: \\[ \\begin{aligned} y &= " + bA + " + " + fmt(mA) + "(" + fmt(xs) + ") \\\\ &= " + bA + " + " + fmt(mA * xs) + " \\\\ &= " + fmt(ystar) + " \\end{aligned} \\] So the cost where the plans are equal is <b>$" + fmt(ystar) + "</b>.";
  } else {
    var u = xs + ri(1, 3);
    var cA = bA + mA * u, cB = bB + mB * u;
    prompt = ctx.prompt + " At " + u + " " + ctx.xu + ", how much cheaper is Plan B than Plan A? Give the difference in dollars.";
    ans = cA - cB;
    sol = "Work out each plan's cost at " + u + " " + ctx.xu + ", then subtract: \\[ \\begin{aligned} \\text{Plan A} &= " + bA + " + " + fmt(mA) + "(" + u + ") = " + fmt(cA) + " \\\\ \\text{Plan B} &= " + bB + " + " + fmt(mB) + "(" + u + ") = " + fmt(cB) + " \\\\ \\text{difference} &= " + fmt(cA) + " - " + fmt(cB) + " = " + fmt(ans) + " \\end{aligned} \\] So Plan B is cheaper by <b>$" + fmt(ans) + "</b>.";
  }
  var q = numq(prompt, ans, 0.01, sol, { mode: "two-plans-" + mode, d: d, xs: xs, bA: bA, mA: mA, bB: bB, mB: mB, ctx: ctx.thing });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [
    { pts: [[0, bA], [xmax, bA + mA * xmax]], col: FIG_INK, lab: "Plan A" },
    { pts: [[0, bB], [xmax, bB + mB * xmax]], col: FIG_ALT, dash: true, lab: "Plan B" }
  ] });
  return q;
}, ["Each line is one plan: its start is its flat fee and its step is its rate.", "Where the lines cross, the plans cost the same; past that point, the lower line is the cheaper plan."]);

// 13. L2, 8.23, CR 3: pictorial pattern in words, solve for the figure number.
E("u6-pattern-solve-n", 6, ["8.23"], 2, "gen", function () {
  var F = ri(4, 10), m = ri(2, 5), nT = ri(8, 20);
  var c2 = F + m, c3 = F + 2 * m, T = F + m * (nT - 1);
  var ctx = pick([
    { item: "matchsticks", prompt: "A pattern is built with matchsticks. Figure 1 uses " + F + " matchsticks, Figure 2 uses " + c2 + " matchsticks, and Figure 3 uses " + c3 + " matchsticks. The pattern continues in the same way. Which figure number uses exactly " + T + " matchsticks?" },
    { item: "tiles", prompt: "A pattern is built with tiles along a border. Figure 1 uses " + F + " tiles, Figure 2 uses " + c2 + " tiles, and Figure 3 uses " + c3 + " tiles. The pattern continues in the same way. Which figure number uses exactly " + T + " tiles?" },
    { item: "dots", prompt: "A dot pattern is growing. Figure 1 has " + F + " dots, Figure 2 has " + c2 + " dots, and Figure 3 has " + c3 + " dots. The pattern continues in the same way. Which figure number has exactly " + T + " dots?" }
  ]);
  var sol = "Each new figure adds " + fmt(m) + ", and Figure 1 uses " + F + ". Let \\(n\\) be the figure number: \\[ \\begin{aligned} " + F + " + " + fmt(m) + "(n - 1) &= " + T + " \\\\ " + fmt(m) + "(n - 1) &= " + T + " - " + F + " = " + fmt(T - F) + " \\\\ n - 1 &= " + fmt((T - F) / m) + " \\\\ n &= " + fmt(nT) + " \\end{aligned} \\] So the figure that uses exactly " + T + " is <b>Figure " + fmt(nT) + "</b>.";
  return numq(ctx.prompt, nT, 0.01, sol, { mode: "pattern-solve-n", F: F, m: m, nT: nT, item: ctx.item });
}, ["Write an equation first: the first figure's count plus the step times the number of added figures.", "The step is the difference between the counts of two neighbouring figures."]);

// 14. L3, 8.23, CR 2: fractional step size, solve for n or total at a large stage.
E("u6-pattern-large", 6, ["8.23"], 3, "gen", function () {
  var Fh = ri(8, 24), sh = pick([3, 5, 7]);
  var F = Fh / 2, step = sh / 2;
  var c2 = (Fh + sh) / 2, c3 = (Fh + 2 * sh) / 2;
  var ctx = pick([
    "A training plan grows each week. The Week 1 ride is " + fmt(F) + " km long, and each week the ride is " + fmt(step) + " km longer than the week before.",
    "A young plant is measured each week. In Week 1 it is " + fmt(F) + " cm tall, and it grows " + fmt(step) + " cm each week."
  ]);
  var unit = ctx.indexOf("ride") >= 0 ? "km" : "cm";
  if (Math.random() < 0.5) {
    var nT = ri(15, 36), T = (Fh + sh * (nT - 1)) / 2;
    var promptA = ctx + " In which week does the value reach exactly " + fmt(T) + " " + unit + "?";
    var solA = "Let \\(n\\) be the week number. The first value is " + fmt(F) + " and the step is " + fmt(step) + ": \\[ \\begin{aligned} " + fmt(F) + " + " + fmt(step) + "(n - 1) &= " + fmt(T) + " \\\\ " + fmt(step) + "(n - 1) &= " + fmt(T) + " - " + fmt(F) + " = " + fmt(T - F) + " \\\\ n - 1 &= " + fmt((T - F) / step) + " \\\\ n &= " + fmt(nT) + " \\end{aligned} \\] So the value reaches " + fmt(T) + " " + unit + " in <b>Week " + fmt(nT) + "</b>.";
    return numq(promptA, nT, 0.01, solA, { mode: "pattern-large-solve", Fh: Fh, sh: sh, nT: nT, unit: unit });
  }
  var N = ri(24, 60), ans = (Fh + sh * (N - 1)) / 2;
  var promptB = ctx + " What is the value in Week " + N + ", in " + unit + "?";
  var solB = "The first value is " + fmt(F) + " and the step is " + fmt(step) + ", so Week \\(n\\) has value " + fmt(F) + " plus the step taken \\(n - 1\\) times: \\[ \\begin{aligned} \\text{value} &= " + fmt(F) + " + " + fmt(step) + "(" + N + " - 1) \\\\ &= " + fmt(F) + " + " + fmt(step) + "(" + (N - 1) + ") \\\\ &= " + fmt(F) + " + " + fmt(step * (N - 1)) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value in Week " + N + " is <b>" + fmt(ans) + " " + unit + "</b>.";
  return numq(promptB, ans, 0.01, solB, { mode: "pattern-large-total", Fh: Fh, sh: sh, N: N, unit: unit });
}, ["Write the pattern as a first value plus a step taken once for each move to the next week.", "When solving for the week, undo the steps in reverse: subtract the first value, divide by the step, then add 1."]);

// Unit 7: Similarity and Transformations (Math 9, NL). Entries only; helpers prefixed u7.
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); }
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Line(p, q, dash, w, col) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + (col || FIG_INK) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Dot(p, r) { return '<circle cx="' + fmt(p[0], 1) + '" cy="' + fmt(p[1], 1) + '" r="' + (r || 3) + '" fill="' + FIG_INK + '"/>'; }
function u7Grid(o) {
  var cell = o.cell || 24, W = (o.xMax - o.xMin) * cell + 40, H = (o.yMax - o.yMin) * cell + 40;
  var ox = 20 - o.xMin * cell, oy = 20 + o.yMax * cell;
  function X(x) { return ox + x * cell; } function Y(y) { return oy - y * cell; }
  var s = "", x, y;
  for (x = o.xMin; x <= o.xMax; x++) s += '<line x1="' + fmt(X(x), 1) + '" y1="' + fmt(Y(o.yMin), 1) + '" x2="' + fmt(X(x), 1) + '" y2="' + fmt(Y(o.yMax), 1) + '" stroke="#d7e0da" stroke-width="1"/>';
  for (y = o.yMin; y <= o.yMax; y++) s += '<line x1="' + fmt(X(o.xMin), 1) + '" y1="' + fmt(Y(y), 1) + '" x2="' + fmt(X(o.xMax), 1) + '" y2="' + fmt(Y(y), 1) + '" stroke="#d7e0da" stroke-width="1"/>';
  s += u7Line([X(o.xMin), Y(0)], [X(o.xMax), Y(0)], false, 2);
  s += u7Line([X(0), Y(o.yMin)], [X(0), Y(o.yMax)], false, 2);
  s += u7T(X(o.xMax) - 6, Y(0) - 11, "x", 13, true) + u7T(X(0) + 11, Y(o.yMax) + 4, "y", 13, true);
  (o.lines || []).forEach(function (L) { s += u7Line([X(L.a[0]), Y(L.a[1])], [X(L.b[0]), Y(L.b[1])], L.dash, L.w || 2, L.col); });
  (o.shapes || []).forEach(function (sh) { s += u7Poly(sh.pts.map(function (p) { return [X(p[0]), Y(p[1])]; }), sh.fill, sh.dash); });
  (o.marks || []).forEach(function (mk) {
    s += u7Dot([X(mk.p[0]), Y(mk.p[1])], 3.2);
    if (mk.label) s += u7T(X(mk.p[0]) + (mk.dx || 10), Y(mk.p[1]) + (mk.dy || -10), mk.label, 13, true);
  });
  (o.labels || []).forEach(function (lb) { s += u7T(X(lb.p[0]) + (lb.dx || 0), Y(lb.p[1]) + (lb.dy || 0), lb.str, lb.size || 13, lb.bold); });
  return u7Svg(W, H, s, o.aria || "Diagram on a grid");
}
function u7TriCoords(sides) {
  var a = sides[0], b = sides[1], c = sides[2];
  var cx = (b * b + c * c - a * a) / (2 * c);
  var h = Math.sqrt(Math.max(b * b - cx * cx, 0.01));
  return [[0, 0], [c, 0], [cx, h]];
}
function u7FitTri(sides, bx, by, bw, bh) {
  var pts = u7TriCoords(sides);
  var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
  var w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
  var sc = Math.min(bw / Math.max(w, 0.01), bh / Math.max(h, 0.01));
  var cx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, cy = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2;
  return pts.map(function (p) { return [bx + bw / 2 + (p[0] - cx) * sc, by + bh / 2 - (p[1] - cy) * sc]; });
}
function u7TriLabels(P, letters, angs, sides) {
  var G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], s = "", i;
  for (i = 0; i < 3; i++) {
    var V = P[i], dx = V[0] - G[0], dy = V[1] - G[1], dl = Math.sqrt(dx * dx + dy * dy) || 1;
    s += u7T(V[0] + dx / dl * 15, V[1] + dy / dl * 15, letters[i], 14, true);
    var bx2 = G[0] - V[0], by2 = G[1] - V[1], bl = Math.sqrt(bx2 * bx2 + by2 * by2) || 1;
    if (angs) s += u7T(V[0] + bx2 / bl * 21, V[1] + by2 / bl * 21, angs[i] + "°", 12, false);
  }
  if (sides) {
    var seg = [[1, 2], [2, 0], [0, 1]];
    for (i = 0; i < 3; i++) {
      var M = [(P[seg[i][0]][0] + P[seg[i][1]][0]) / 2, (P[seg[i][0]][1] + P[seg[i][1]][1]) / 2];
      var ox2 = M[0] - G[0], oy2 = M[1] - G[1], ol = Math.sqrt(ox2 * ox2 + oy2 * oy2) || 1;
      s += u7T(M[0] + ox2 / ol * 15, M[1] + oy2 / ol * 15, sides[i], 12, false);
    }
  }
  return s;
}
function u7Coord(p) { return "(" + fmt(p[0]) + ", " + fmt(p[1]) + ")"; }

// 1. 10.8 L1 var: what a stated scale means in media and real-life contexts.
