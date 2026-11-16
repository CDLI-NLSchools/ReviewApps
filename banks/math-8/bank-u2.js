// Math 8 Unit 2 Integers question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 378 to 817).
// CRMARKS: u2-div-2by1=3
// CRMARKS: u2-div-2by2=3
// CRMARKS: u2-mixed-problem=2
// CRMARKS: u2-mult-problem=3
// CRMARKS: u2-ooo-brackets-num=3
// CRMARKS: u2-ooo-num=2
// CRMARKS: u2-sign-product-problem=2
/* Unit 2: Integers */
// Unit 2: Integers (Math 8, NL). Entries only; helpers prefixed u2.
function u2sg(n) { return n < 0 ? "(" + n + ")" : "" + n; }
function u2word(n) { return n < 0 ? "negative " + Math.abs(n) : "" + n; }
// Build 3 distinct numeric distractors from candidate {v, fb} pairs, with offset fallbacks.
function u2dist(ans, cands) {
  var out = [], used = {};
  used[fmt(ans)] = 1;
  cands.forEach(function (c) {
    if (out.length >= 3) return;
    var k = fmt(c.v);
    if (!used[k]) { used[k] = 1; out.push({ t: k, fb: c.fb }); }
  });
  var offs = [1, -1, 2, -2, 10, -10, 5, -5];
  var i = 0;
  while (out.length < 3 && i < offs.length) {
    var v = ans + offs[i]; i++;
    var k2 = fmt(v);
    if (!used[k2]) { used[k2] = 1; out.push({ t: k2, fb: "This comes from an arithmetic slip in the calculation." }); }
  }
  return out;
}

// 1. L1, 6.17: model multiplication with integer chips, described in words.
E("u2-mult-model-chips", 2, ["6.17"], 1, "gen", function () {
  var g = ri(2, 6), m = ri(2, 7);
  if (Math.random() < 0.5) {
    var val = g * (-m);
    var prompt = "A chip model shows " + g + " equal groups. Each group holds " + m + " red chips, and each red chip stands for \\(-1\\). What product and value does the model show?";
    var solution = "There are " + g + " groups of \\(-" + m + "\\): \\[ \\begin{aligned} " + g + " \\times (-" + m + ") &= " + val + " \\end{aligned} \\] So the model shows the product <b>\\(" + g + " \\times (-" + m + ") = " + val + "\\)</b>.";
    return mcq(prompt,
      { t: fmt(val), fb: "Correct. The model shows " + g + " groups of negative " + m + "." },
      u2dist(val, [
        { v: -val, fb: "The sign is wrong. Groups of red (negative) chips give a negative total." },
        { v: g - m, fb: "That subtracts the group size from the number of groups instead of multiplying." },
        { v: -(g + m), fb: "That adds the two numbers instead of multiplying them." }
      ]),
      solution, { mode: "chips-groups", g: g, m: m });
  }
  var val2 = g * m;
  var prompt2 = "Starting from zero pairs, a student takes away " + g + " groups of " + m + " red chips, where each red chip stands for \\(-1\\). Taking away red chips is recorded as multiplying by \\(-" + g + "\\). What is the value of the model?";
  var solution2 = "Taking away " + g + " groups of \\(-" + m + "\\) is the product \\((-" + g + ") \\times (-" + m + ")\\). Two negatives give a positive: \\[ \\begin{aligned} (-" + g + ") \\times (-" + m + ") &= " + val2 + " \\end{aligned} \\] So the value of the model is <b>" + val2 + "</b>.";
  return mcq(prompt2,
    { t: fmt(val2), fb: "Correct. Removing groups of negative chips raises the value." },
    u2dist(val2, [
      { v: -val2, fb: "The sign is wrong. A negative times a negative gives a positive." },
      { v: m - g, fb: "That subtracts the numbers of groups instead of multiplying." },
      { v: g + m, fb: "That adds the two numbers instead of multiplying them." }
    ]),
    solution2, { mode: "chips-removal", g: g, m: m });
}, ["Count the groups first, then the value in each group.", "Red chips stand for negatives, and taking groups away is also a negative action."]);

// 2. L1, 6.18: apply the sign rule through a direct product.
E("u2-product-sign-apply", 2, ["6.18"], 1, "gen", function () {
  var a = 0, b = 0;
  while (a === 0) a = ri(-9, 9);
  while (b === 0) b = ri(-9, 9);
  var val = a * b;
  var prompt = "Evaluate: \\(" + u2sg(a) + " \\times " + u2sg(b) + "\\)";
  var signNote = (a < 0 && b < 0) ? "The signs are the same, so the product is positive."
    : (a < 0 || b < 0) ? "The signs are different, so the product is negative."
    : "Both factors are positive, so the product is positive.";
  var solution = signNote + " Multiply the sizes: \\[ \\begin{aligned} " + u2sg(a) + " \\times " + u2sg(b) + " &= " + val + " \\end{aligned} \\] So the product is <b>" + val + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. " + signNote },
    u2dist(val, [
      { v: -val, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: a + b, fb: "That adds the two numbers instead of multiplying them." },
      { v: a - b, fb: "That subtracts the two numbers instead of multiplying them." }
    ]),
    solution, { mode: "product-sign", a: a, b: b });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Multiply the sizes of the two numbers, then attach the sign."]);

// 3. L1, 6.22: apply the sign rule through a direct quotient.
E("u2-quotient-sign-apply", 2, ["6.22"], 1, "gen", function () {
  var d = 0;
  while (d === 0 || Math.abs(d) < 2) d = ri(-9, 9);
  var q = 0;
  while (q === 0 || Math.abs(q) < 2) q = ri(-9, 9);
  var dvd = d * q;
  var prompt = "Evaluate: \\(" + dvd + " \\div " + u2sg(d) + "\\)";
  var signNote = (dvd < 0 && d < 0) || (dvd > 0 && d > 0) ? "The signs are the same, so the quotient is positive." : "The signs are different, so the quotient is negative.";
  var solution = signNote + " Divide the sizes: \\[ \\begin{aligned} " + dvd + " \\div " + u2sg(d) + " &= " + q + " \\end{aligned} \\] So the quotient is <b>" + q + "</b>.";
  return mcq(prompt,
    { t: fmt(q), fb: "Correct. " + signNote },
    u2dist(q, [
      { v: -q, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: dvd - d, fb: "That subtracts the divisor instead of dividing." },
      { v: d, fb: "That just repeats the divisor. The quotient tells how many groups of the divisor fit." }
    ]),
    solution, { mode: "quotient-sign", d: d, q: q });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Divide the size of the first number by the size of the second, then attach the sign."]);

// 4. L2, 6.21: model division with chips or sharing, described in words.
E("u2-div-model-groups", 2, ["6.21"], 1, "gen", function () {
  var g = ri(2, 8), per = ri(2, 9);
  var total = -g * per;
  if (Math.random() < 0.5) {
    var prompt = "A chip model shows " + Math.abs(total) + " red chips (total value \\(" + total + "\\)) shared equally into " + g + " groups. What is the value of each group?";
    var solution = "Sharing \\(" + total + "\\) equally into " + g + " groups is division: \\[ \\begin{aligned} " + total + " \\div " + g + " &= " + (-per) + " \\end{aligned} \\] So each group has value <b>" + (-per) + "</b>.";
    return mcq(prompt,
      { t: fmt(-per), fb: "Correct. Each group holds " + per + " red chips." },
      u2dist(-per, [
        { v: per, fb: "The sign is wrong. The chips are red, so each group is negative." },
        { v: total + g, fb: "That adds instead of dividing the total into equal groups." },
        { v: -g, fb: "That gives the number of groups, not the value inside each group." }
      ]),
      solution, { mode: "div-sharing", g: g, per: per });
  }
  var prompt2 = "On a number line, a student makes equal jumps of \\(-" + per + "\\) starting at 0 and lands exactly on \\(" + total + "\\). How many jumps were made?";
  var solution2 = "Counting jumps of \\(-" + per + "\\) that reach \\(" + total + "\\) is division: \\[ \\begin{aligned} " + total + " \\div (-" + per + ") &= " + g + " \\end{aligned} \\] So the student made <b>" + g + "</b> jumps.";
  return mcq(prompt2,
    { t: fmt(g), fb: "Correct. The total divided by the jump size gives the number of jumps." },
    u2dist(g, [
      { v: -g, fb: "The count of jumps is positive. A negative divided by a negative gives a positive." },
      { v: per, fb: "That is the size of each jump, not how many jumps were made." },
      { v: Math.abs(total), fb: "That is the landing point's size, not the number of jumps." }
    ]),
    solution2, { mode: "div-grouping", g: g, per: per });
}, ["Sharing equally and counting equal groups are both division.", "Write the division the model shows, then use the sign rule."]);

// 5. L2, 6.19: which context matches a given product.
E("u2-mult-context-match", 2, ["6.19"], 1, "gen", function () {
  var r = ri(2, 9), n = ri(3, 8);
  var scens = [
    {
      ok: "The temperature falls " + r + " degrees each hour for " + n + " hours. The total change in temperature.",
      opp: "The temperature rises " + r + " degrees each hour for " + n + " hours. The total change in temperature.",
      add: "The temperature starts at " + (-r) + " degrees and then rises " + n + " degrees. The final temperature.",
      div: "A total temperature drop of " + (r * n) + " degrees is spread evenly over " + n + " hours. The drop each hour."
    },
    {
      ok: "A diver goes " + r + " metres deeper each minute for " + n + " minutes. The total change in the diver's depth.",
      opp: "A diver rises " + r + " metres each minute for " + n + " minutes. The total change in the diver's depth.",
      add: "A diver is " + r + " metres below the surface and then dives " + n + " metres deeper. The diver's final depth.",
      div: "A diver descends " + (r * n) + " metres in equal steps over " + n + " minutes. The descent in each minute."
    },
    {
      ok: "Maya withdraws $" + r + " from her account each week for " + n + " weeks. The total change in her balance.",
      opp: "Maya deposits $" + r + " into her account each week for " + n + " weeks. The total change in her balance.",
      add: "Maya's balance is -$" + r + " and she then deposits $" + n + " into the account. Her new balance after the deposit.",
      div: "Maya pays off a $" + (r * n) + " debt in " + n + " equal payments. The size of each payment."
    },
    {
      ok: "A player loses " + r + " points in each of " + n + " rounds of a game. The player's total change in score.",
      opp: "A player gains " + r + " points in each of " + n + " rounds of a game. The player's total change in score.",
      add: "A player's score is " + (-r) + " points and then the player gains " + n + " more points in the last round. The final score.",
      div: "A player loses " + (r * n) + " points in total over " + n + " equal rounds. The points lost in each round."
    }
  ];
  var s = pick(scens);
  var prompt = "Which situation can be represented by the product \\((-" + r + ") \\times " + n + "\\)?";
  var solution = "The product multiplies a repeating negative change of \\(-" + r + "\\) by " + n + " repeats: \\[ \\begin{aligned} (-" + r + ") \\times " + n + " &= " + (-r * n) + " \\end{aligned} \\] So it matches the situation with the same negative change repeated <b>" + n + " times</b>.";
  return mcq(prompt,
    { t: s.ok, fb: "Correct. A negative change repeated " + n + " times is a multiplication." },
    [
      { t: s.opp, fb: "That change is positive, so it would be represented by a positive first factor." },
      { t: s.add, fb: "That situation combines two single amounts, which is addition, not a repeated change." },
      { t: s.div, fb: "That situation splits a total into equal parts, which is division, not multiplication." }
    ],
    solution, { mode: "mult-context", r: r, n: n });
}, ["A product with a negative factor means a negative change repeated several times.", "Check each situation: is the change negative, and is it repeated or split up?"]);

// 6. L2, 6.20, CR 3: solve a multiplication problem in context (start plus repeated change).
E("u2-mult-problem", 2, ["6.20"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-6, 8), r = ri(2, 6), h = ri(3, 7);
    var ans = start - r * h;
    var prompt = "At supper time the temperature in Corner Brook is " + start + " degrees. It then falls " + r + " degrees each hour for " + h + " hours. What is the temperature after " + h + " hours, in degrees?";
    var solution = "The total fall is a product, then subtract it from the start: \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " &= " + start + " - " + (r * h) + " \\\\ &= " + ans + " \\end{aligned} \\] So the temperature is <b>" + ans + " degrees</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "temp-fall", start: start, r: r, h: h });
  }
  if (mode === 1) {
    var bal = ri(60, 240), w = ri(6, 20), k = ri(3, 8);
    var ansB = bal - w * k;
    var promptB = "A bank account holds $" + bal + ". The owner withdraws $" + w + " each week for " + k + " weeks, with no other activity. What is the balance after " + k + " weeks, in dollars?";
    var solutionB = "The total withdrawn is a product, then subtract it from the opening balance: \\[ \\begin{aligned} " + bal + " + (-" + w + ") \\times " + k + " &= " + bal + " - " + (w * k) + " \\\\ &= " + ansB + " \\end{aligned} \\] So the balance is <b>$" + ansB + "</b>.";
    return numq(promptB, ansB, 0.01, solutionB, { mode: "bank-withdraw", bal: bal, w: w, k: k });
  }
  var depth = ri(10, 60), rate = ri(3, 9), mins = ri(3, 8);
  var ansD = -(depth + rate * mins);
  var promptD = "A small submersible is " + depth + " m below the surface. It descends a further " + rate + " m each minute for " + mins + " minutes. Using negative numbers for positions below the surface, what is its position after " + mins + " minutes, in metres?";
  var solutionD = "The extra descent is a product, added to the starting depth: \\[ \\begin{aligned} -" + depth + " + (-" + rate + ") \\times " + mins + " &= -" + depth + " - " + (rate * mins) + " \\\\ &= " + ansD + " \\end{aligned} \\] So its position is <b>" + ansD + " m</b>.";
  return numq(promptD, ansD, 0.01, solutionD, { mode: "sub-descend", depth: depth, rate: rate, mins: mins });
}, ["Find the total repeated change first: that part is a multiplication.", "Multiply the change per step by the number of steps, then combine it with the starting value."]);

// 7. L2, 6.23: which context matches a given quotient.
E("u2-div-context-match", 2, ["6.23"], 1, "gen", function () {
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var scens = [
    {
      ok: "A temperature drop of " + total + " degrees happens evenly over " + n + " hours. The drop in each hour.",
      mult: "The temperature falls " + per + " degrees each hour for " + n + " hours overnight. The total drop by morning.",
      add: "The temperature is " + (-total) + " degrees and then rises " + n + " degrees in the sun. The final temperature.",
      opp: "A temperature rise of " + total + " degrees happens evenly over " + n + " hours. The rise in each hour."
    },
    {
      ok: "A debt of $" + total + " is paid off in " + n + " equal weekly payments. The change in the debt from each payment.",
      mult: "A payment of $" + per + " is made each week for " + n + " weeks to pay off the whole debt. The total amount paid off in all.",
      add: "A debt of $" + total + " grows by $" + n + " in fees charged by the bank this month. The new debt after the fees.",
      opp: "A savings account grows by $" + total + " spread evenly over " + n + " weeks. The growth each week."
    },
    {
      ok: "A hiker's elevation drops " + total + " m in equal amounts over " + n + " trail sections. The change in elevation on each section.",
      mult: "A hiker drops " + per + " m in elevation on each of " + n + " trail sections along the route. The total drop in elevation.",
      add: "A hiker at " + (-total) + " m relative to the trailhead climbs " + n + " m up the steep slope. The hiker's new position on the trail above.",
      opp: "A hiker's elevation rises " + total + " m in equal amounts over " + n + " trail sections. The change on each section."
    }
  ];
  var s = pick(scens);
  var prompt = "Which situation can be represented by the quotient \\((-" + total + ") \\div " + n + "\\)?";
  var solution = "The quotient splits a total negative change of \\(-" + total + "\\) into " + n + " equal parts: \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] So it matches the situation where a total is <b>shared equally</b> into " + n + " parts.";
  return mcq(prompt,
    { t: s.ok, fb: "Correct. A total split into equal parts is a division." },
    [
      { t: s.mult, fb: "That situation repeats a change, which is multiplication, not splitting a total." },
      { t: s.add, fb: "That situation combines two single amounts, which is addition." },
      { t: s.opp, fb: "That total change is positive, so its quotient would be positive, not negative." }
    ],
    solution, { mode: "div-context", per: per, n: n });
}, ["A quotient splits a total into equal parts.", "Check each situation: is a total being shared equally, and is the change negative?"]);

// 8. L2, 6.24, CR 3: division of a 2-digit integer by a 1-digit integer in a problem.
E("u2-div-2by1", 2, ["6.24"], 1, "gen", function () {
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var d = ri(2, 9);
    var q = ri(3, 12) * (Math.random() < 0.5 ? -1 : 1);
    var dvd = d * q;
    if (Math.abs(dvd) < 10 || Math.abs(dvd) > 99) continue;
    P = { d: d, q: q, dvd: dvd };
  }
  if (!P) P = { d: 6, q: -7, dvd: -42 };
  var prompt = "A tide gauge shows the water level changed by a total of " + P.dvd + " cm, made up of " + P.d + " equal hourly changes. What was the change in each hour, in centimetres?";
  var solution = "Split the total change into " + P.d + " equal parts, then use the sign rule: \\[ \\begin{aligned} " + P.dvd + " \\div " + P.d + " &= " + P.q + " \\end{aligned} \\] So the change in each hour was <b>" + P.q + " cm</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by1", d: P.d, q: P.q });
}, ["The dividend has two digits and the divisor has one digit.", "Divide the sizes first, then use the sign rule for the quotient."]);

// 9. L2, 6.25, CR 3: division of a 2-digit integer by a 2-digit integer.
E("u2-div-2by2", 2, ["6.25"], 1, "gen", function () {
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var d = ri(11, 25) * (Math.random() < 0.5 ? -1 : 1);
    var q = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
    var dvd = d * q;
    if (Math.abs(dvd) < 10 || Math.abs(dvd) > 99) continue;
    P = { d: d, q: q, dvd: dvd };
  }
  if (!P) P = { d: 12, q: -7, dvd: -84 };
  var prompt = "Evaluate: \\(" + P.dvd + " \\div " + u2sg(P.d) + "\\)";
  var solution = "Divide the sizes, then decide the sign from the two signs: \\[ \\begin{aligned} " + P.dvd + " \\div " + u2sg(P.d) + " &= " + P.q + " \\end{aligned} \\] So the quotient is <b>" + P.q + "</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by2", d: P.d, q: P.q });
}, ["Both numbers have two digits here; the quotient is a single digit.", "Divide the sizes first, then use the sign rule for the quotient."]);

// 10. L2, 6.26: identify the operation (expression) that solves a problem.
E("u2-identify-operation", 2, ["6.26"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = ri(2, 8), h = ri(3, 9);
    var prompt = "Each hour, the water level in a harbour tank falls " + r + " cm. Which expression gives the total change in the water level after " + h + " hours?";
    var solution = "The same change repeats " + h + " times, so the operation is multiplication by a negative change: \\[ \\begin{aligned} (-" + r + ") \\times " + h + " &= " + (-r * h) + " \\end{aligned} \\] So the expression is <b>\\((-" + r + ") \\times " + h + "\\)</b>.";
    return mcq(prompt,
      { t: "\\((-" + r + ") \\times " + h + "\\)", fb: "Correct. A repeated negative change is a multiplication." },
      [
        { t: "\\((-" + r + ") + " + h + "\\)", fb: "That adds the two numbers once instead of repeating the change." },
        { t: "\\((-" + r + ") \\div " + h + "\\)", fb: "Division splits a total into parts; here a change is being repeated." },
        { t: "\\(" + h + " - " + r + "\\)", fb: "That subtracts one amount from the other instead of repeating the change." }
      ],
      solution, { mode: "identify-mult", r: r, h: h });
  }
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var prompt2 = "A group of friends shares a ferry fare debt of $" + total + " equally, recorded as \\(-" + total + "\\) dollars split among " + n + " friends. Which expression gives the amount each friend owes?";
  var solution2 = "A total split equally among " + n + " friends is division: \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] So the expression is <b>\\((-" + total + ") \\div " + n + "\\)</b>.";
  return mcq(prompt2,
    { t: "\\((-" + total + ") \\div " + n + "\\)", fb: "Correct. Sharing a total equally is division." },
    [
      { t: "\\((-" + total + ") \\times " + n + "\\)", fb: "That repeats the whole debt " + n + " times instead of splitting it." },
      { t: "\\((-" + total + ") + " + n + "\\)", fb: "That adds to the debt instead of splitting it into equal shares." },
      { t: "\\(" + n + " - " + total + "\\)", fb: "That subtracts the debt from the count of friends, which mixes unlike quantities." }
    ],
    solution2, { mode: "identify-div", per: per, n: n });
}, ["Ask whether the change repeats, or a total is split into equal parts.", "Repeated change means multiply; equal sharing means divide."]);

// 11. L2, 6.27: order of operations with integers, MC.
E("u2-ooo-evaluate-mc", 2, ["6.27"], 2, "gen", function () {
  var R = null;
  for (var tries = 0; tries < 300 && !R; tries++) {
    var tmpl = ri(0, 2), expr, val, steps, errs;
    if (tmpl === 0) {
      var a = ri(-9, 9), b = 0, c = 0;
      while (b === 0) b = ri(-8, 8);
      while (c === 0) c = ri(-6, 6);
      if (a === 0) continue;
      val = a + b * c;
      expr = "\\(" + a + " + " + u2sg(b) + " \\times " + u2sg(c) + "\\)";
      steps = "\\[ \\begin{aligned} " + a + " + " + u2sg(b) + " \\times " + u2sg(c) + " &= " + a + " + " + (b * c) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: (a + b) * c, fb: "This adds first, but multiplication is done before addition." },
        { v: a - b * c, fb: "This changes the addition into a subtraction." },
        { v: a + b + c, fb: "This changes the multiplication into an addition." }
      ];
    } else if (tmpl === 1) {
      var a1 = ri(-9, 12), b1 = ri(-9, 9), c1 = 0;
      while (c1 === 0 || Math.abs(c1) < 2) c1 = ri(-6, 6);
      val = (a1 - b1) * c1;
      expr = "\\((" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + "\\)";
      steps = "\\[ \\begin{aligned} (" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + " &= " + (a1 - b1) + " \\times " + u2sg(c1) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a1 - b1 * c1, fb: "This multiplies before doing the brackets, but brackets come first." },
        { v: (a1 + b1) * c1, fb: "This adds inside the brackets where the expression says to subtract." },
        { v: a1 - b1 - c1, fb: "This changes the multiplication into a subtraction." }
      ];
    } else {
      var d2 = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
      var q2 = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
      var c2 = d2 * q2;
      var a2 = 0, b2 = 0;
      while (a2 === 0) a2 = ri(-8, 8);
      while (b2 === 0) b2 = ri(-8, 8);
      val = a2 * b2 - q2;
      expr = "\\(" + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + "\\)";
      steps = "\\[ \\begin{aligned} " + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + " &= " + (a2 * b2) + " - " + q2 + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a2 * (b2 - q2), fb: "This groups the subtraction with the product, which changes the order." },
        { v: a2 * b2 + q2, fb: "This adds the quotient instead of subtracting it." },
        { v: (a2 * b2 - c2) * d2, fb: "This multiplies by the divisor at the end instead of dividing earlier." }
      ];
    }
    var keys = [val].concat(errs.map(function (e) { return e.v; })).map(fmt);
    if (new Set(keys).size < 4) continue;
    R = { expr: expr, val: val, steps: steps, errs: errs, tmpl: tmpl };
  }
  if (!R) {
    R = { expr: "\\(3 + (-4) \\times 5\\)", val: -17, steps: "\\[ \\begin{aligned} 3 + (-4) \\times 5 &= 3 - 20 \\\\ &= -17 \\end{aligned} \\]", errs: [{ v: -5, fb: "This adds first, but multiplication is done before addition." }, { v: 23, fb: "This changes the addition into a subtraction." }, { v: 4, fb: "This changes the multiplication into an addition." }], tmpl: 0 };
  }
  var prompt = "Evaluate: " + R.expr;
  var solution = "Follow the order of operations, brackets first, then multiplication and division, then addition and subtraction: " + R.steps + " So the value is <b>" + R.val + "</b>.";
  return mcq(prompt,
    { t: fmt(R.val), fb: "Correct. The operations were done in the proper order." },
    R.errs.map(function (e) { return { t: fmt(e.v), fb: e.fb }; }),
    solution, { mode: "ooo-mc-" + R.tmpl, val: R.val });
}, ["Do brackets first, then multiplication and division, then addition and subtraction.", "Rewrite the expression after each single step so the order stays clear."]);

// 12. L2, 6.27, CR 2: order of operations, typed answer.
E("u2-ooo-num", 2, ["6.27"], 2, "gen", function () {
  var s = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var qq = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
  var r = s * qq;
  var p = 0, q = 0;
  while (p === 0) p = ri(-8, 8);
  while (q === 0) q = ri(-8, 8);
  var val = p * q - qq;
  var prompt = "Evaluate: \\(" + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + "\\)";
  var solution = "Do the multiplication and the division before the subtraction: \\[ \\begin{aligned} " + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + " &= " + (p * q) + " - " + qq + " \\\\ &= " + val + " \\end{aligned} \\] So the value is <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-num", p: p, q: q, s: s });
}, ["Multiplication and division are done before addition and subtraction.", "Work out the product and the quotient separately, then combine them."]);

// 13. L2, 6.18 and 6.20, CR 2: signed per-round change applied in a game problem.
E("u2-sign-product-problem", 2, ["6.18", "6.20"], 1, "gen", function () {
  var start = ri(20, 90);
  var per = 0;
  while (per === 0 || Math.abs(per) < 2) per = ri(-9, 9);
  var rounds = ri(3, 8);
  var ans = start + per * rounds;
  var dirWord = per < 0 ? "loses " + Math.abs(per) : "gains " + per;
  var prompt = "In a board game tournament, Liam starts a match with " + start + " points. In each of the " + rounds + " rounds he " + dirWord + " points. What is his score after " + rounds + " rounds?";
  var solution = "The rounds give one product, and its sign follows the sign rule: \\[ \\begin{aligned} " + start + " + " + u2sg(per) + " \\times " + rounds + " &= " + start + " + " + (per * rounds) + " \\\\ &= " + ans + " \\end{aligned} \\] So his score is <b>" + ans + " points</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "game-score", start: start, per: per, rounds: rounds });
}, ["The rounds all change the score by the same signed amount, so that part is a product.", "Multiply the signed change by the number of rounds, then add it to the starting score."]);

// 14. L3, 6.27, CR 3: order of operations with brackets and three operations.
E("u2-ooo-brackets-num", 2, ["6.27"], 3, "gen", function () {
  var e = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var dq = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
  var d = e * dq;
  var a = ri(-10, 14), b = ri(-10, 10), c = 0;
  while (c === 0 || Math.abs(c) < 2) c = ri(-6, 6);
  var inner = a - b;
  var val = inner * c - dq;
  var prompt = "Evaluate: \\((" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + "\\)";
  var solution = "Do the brackets first, then the multiplication and division, then the subtraction: \\[ \\begin{aligned} (" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + " &= " + inner + " \\times " + u2sg(c) + " - " + dq + " \\\\ &= " + (inner * c) + " - " + dq + " \\\\ &= " + val + " \\end{aligned} \\] So the value is <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-brackets", a: a, b: b, c: c, e: e });
}, ["Start with the brackets, even when other operations look tempting first.", "Finish the bracket, then do the multiplication and division before the final subtraction."]);

// 15. L3, 6.26 and 6.27, CR 2: multi-step mixed problem, choose and order the operations.
E("u2-mixed-problem", 2, ["6.26", "6.27"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var start = ri(-4, 10), r = ri(2, 5), h = ri(3, 6), rise = ri(2, 9);
    var ans = start - r * h + rise;
    var prompt = "Overnight in Gander, the temperature starts at " + start + " degrees. It falls " + r + " degrees each hour for " + h + " hours, and then rises " + rise + " degrees the next morning. What is the final temperature, in degrees?";
    var solution = "The repeated fall is a multiplication, done before adding the morning rise: \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " + " + rise + " &= " + start + " - " + (r * h) + " + " + rise + " \\\\ &= " + ans + " \\end{aligned} \\] So the final temperature is <b>" + ans + " degrees</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "mixed-temp", start: start, r: r, h: h });
  }
  var bal = ri(80, 200), w = ri(5, 15), k = ri(3, 6), dep = ri(20, 90);
  var ansB = bal - w * k + dep;
  var promptB = "A school trip account holds $" + bal + ". The group pays $" + w + " in ferry fees for each of " + k + " students, then receives a $" + dep + " donation. What is the balance in the account, in dollars?";
  var solutionB = "The ferry fees are one product, done before the donation is added: \\[ \\begin{aligned} " + bal + " - " + w + " \\times " + k + " + " + dep + " &= " + bal + " - " + (w * k) + " + " + dep + " \\\\ &= " + ansB + " \\end{aligned} \\] So the balance is <b>$" + ansB + "</b>.";
  return numq(promptB, ansB, 0.01, solutionB, { mode: "mixed-bank", bal: bal, w: w, k: k });
}, ["One part of the problem repeats, so it is a multiplication; the single extra change is added or subtracted after.", "Work out the repeated part first, then combine it with the starting value and the single change."]);

// 16. L3, 6.19 and 6.23: variant set of context and model reasoning statics.
E("u2-context-reasoning-var", 2, ["6.19", "6.23"], 3, "var", varset([
  function () {
    var prompt = "Which situation can be represented by the product \\((-5) \\times 4\\)?";
    var solution = "The product repeats a negative change of \\(-5\\) four times: \\[ \\begin{aligned} (-5) \\times 4 &= -20 \\end{aligned} \\] So it matches the situation with the same loss repeated <b>4 times</b>.";
    return mcq(prompt,
      { t: "A goalie lets in 5 goals in each of 4 games. The total change in the team's goal difference.", fb: "Correct. A negative change of 5 is repeated 4 times." },
      [
        { t: "A goalie lets in 5 goals in one game and 4 goals in the next. The total goals let in.", fb: "That combines two different single amounts, which is addition." },
        { t: "A team is docked 20 points in total, split equally over 4 games. The points docked in each game.", fb: "That splits a total into equal parts, which is division." },
        { t: "A player scores 5 goals in each of 4 games. The total goals scored.", fb: "That change is positive, so it would use a positive first factor." }
      ],
      solution, { mode: "var-mult-context" });
  },
  function () {
    var prompt = "Which situation can be represented by the quotient \\((-36) \\div 6\\)?";
    var solution = "The quotient splits a total negative change of \\(-36\\) into 6 equal parts: \\[ \\begin{aligned} (-36) \\div 6 &= -6 \\end{aligned} \\] So it matches the situation where a total is <b>shared equally</b> into 6 parts.";
    return mcq(prompt,
      { t: "A hiker drops 36 m in elevation in equal amounts over 6 trail sections. The change on each section.", fb: "Correct. A total is split into 6 equal parts." },
      [
        { t: "A hiker drops 6 m in elevation on each of the 36 trail sections along the route. The total drop.", fb: "That repeats a change many times, which is multiplication." },
        { t: "A hiker at -36 m relative to the trailhead climbs 6 m up the bank. The hiker's new position.", fb: "That combines two single amounts, which is addition." },
        { t: "A hiker rises 36 m in elevation in equal amounts over 6 trail sections. The change on each section.", fb: "That total change is positive, so its quotient would be positive." }
      ],
      solution, { mode: "var-div-context" });
  },
  function () {
    var prompt = "A chip model starts from zero pairs. A student removes 3 groups of 4 red chips, where each red chip stands for \\(-1\\). Which product does the model record?";
    var solution = "Removing groups is a negative action on negative chips: \\[ \\begin{aligned} (-3) \\times (-4) &= 12 \\end{aligned} \\] So the model records the product <b>\\((-3) \\times (-4)\\)</b>.";
    return mcq(prompt,
      { t: "\\((-3) \\times (-4)\\)", fb: "Correct. Removing (negative action) groups of red (negative) chips gives two negative factors." },
      [
        { t: "\\(3 \\times (-4)\\)", fb: "That would mean adding 3 groups of red chips, not removing them." },
        { t: "\\((-3) \\times 4\\)", fb: "That treats the chips as positive yellow chips instead of red ones." },
        { t: "\\(3 \\times 4\\)", fb: "That ignores both the removal and the red chips, so nothing in it is negative." }
      ],
      solution, { mode: "var-model-product" });
  }
]), ["For each situation, decide whether a change repeats, a total is split, or single amounts are combined.", "Match the signs as well as the operation: removal and red chips are both negative."]);
