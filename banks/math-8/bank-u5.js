// Math 8 Unit 5 Percent, Ratio and Rate question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 1745 to 2564).
// CRMARKS: u5-discount-then-tax=3
// CRMARKS: u5-find-the-whole=3
// CRMARKS: u5-percent-change=3
// CRMARKS: u5-percent-of-number=3
// CRMARKS: u5-percent-of-percent-quantity=2
// CRMARKS: u5-rate-problem-solve=2
// CRMARKS: u5-ratio-problem-solve=2
/* Unit 5: Percent, Ratio and Rate */
// Unit 5: Percent, Ratio and Rate (Math 8, NL). Entries only; helpers prefixed u5.
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5r2(x) { return Math.round(x * 100) / 100; }
function u5gridSVG(shaded) {
  var cell = 17, W = cell * 10 + 2, s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + W + '" viewBox="0 0 ' + W + ' ' + W + '" role="img" aria-label="Hundred grid with ' + shaded + ' squares shaded">';
  for (var r = 0; r < 10; r++) { for (var c = 0; c < 10; c++) { var idx = r * 10 + c; s += '<rect x="' + (1 + c * cell) + '" y="' + (1 + r * cell) + '" width="' + cell + '" height="' + cell + '" fill="' + (idx < shaded ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1"/>'; } }
  return s + '</svg>';
}

// 1. L1, 3.1, var: contexts where a percent is over 100% or between 0% and 1%.
E("u5-context-extreme-percent", 5, ["3.1"], 1, "var", varset([
  function () {
    var sol = "A percent over 100% compares a new amount with an earlier whole amount, and the new amount is larger: \\[ \\begin{aligned} 145\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>the ferry carried 145% as many passengers this July as it carried last July</b>.";
    return mcq("Which situation can be described by a percent of 145%?", { t: "The ferry carried 145% as many passengers this July as it carried last July.", fb: "Correct: the new total is compared with last July and is larger than that whole." }, [
      { t: "A student ate 145% of one whole sandwich at lunch in the cafeteria.", fb: "One sandwich is the whole that can be eaten, so the part eaten cannot pass 100% of it." },
      { t: "A class has 145% of its students absent today out of the whole class.", fb: "The absent students are part of the class, so that share cannot pass 100%." },
      { t: "A tank is filled to 145% of its full capacity with water pumped in from a hose.", fb: "Capacity is the whole tank, so the water in it cannot pass 100% of capacity." }
    ], sol, { mode: "ctx-145" });
  },
  function () {
    var sol = "A percent between 0% and 1% describes a very small part of a large whole: \\[ \\begin{aligned} 0\\% < 0.4\\% &< 1\\% \\end{aligned} \\] So a fitting context is <b>about 0.4% of the people in a town have a February 29 birthday</b>.";
    return mcq("Which situation can be described by a percent of 0.4%?", { t: "About 0.4% of the people in a town have a February 29 birthday.", fb: "Correct: it is a tiny share of a large group, well under 1%." }, [
      { t: "A player scored on 0.4% of 200 shots on goal this season.", fb: "That would be less than one goal out of 200 shots, and goals come in whole numbers here." },
      { t: "A survey of 10 students found 0.4% prefer winter.", fb: "With only 10 students, the smallest share for one student is 10%, not 0.4%." },
      { t: "A recipe uses 0.4% as the share of flour in a 10 g pinch of spice mix.", fb: "That share is far too small for a main ingredient measured in a 10 g pinch in this context." }
    ], sol, { mode: "ctx-04" });
  },
  function () {
    var sol = "Growth compared with an earlier value can pass the earlier whole: \\[ \\begin{aligned} 212\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>the garden club has 212% as many members this year as it had three years ago</b>.";
    return mcq("Which situation can be described by a percent of 212%?", { t: "The garden club has 212% as many members this year as it had three years ago.", fb: "Correct: membership is compared with an earlier total and has more than doubled." }, [
      { t: "A goalie stopped 212% of all the shots he faced in one hockey game this season.", fb: "Saves are part of the shots faced, so that share cannot pass 100%." },
      { t: "A pie has 212% of its slices served at supper to the family.", fb: "The slices served are part of the one pie, so the share cannot pass 100%." },
      { t: "A phone battery is charged to 212% on its display screen at noon.", fb: "A full charge is 100% on the display, so the charge shown cannot pass it." }
    ], sol, { mode: "ctx-212" });
  },
  function () {
    var sol = "A percent under 1% fits a rare event in a very large group: \\[ \\begin{aligned} 0\\% < 0.75\\% &< 1\\% \\end{aligned} \\] So a fitting context is <b>about 0.75% of the tickets in a large provincial draw were sold in one small community</b>.";
    return mcq("Which situation can be described by a percent of 0.75%?", { t: "About 0.75% of the tickets in a large provincial draw were sold in one small community.", fb: "Correct: one small community accounts for a tiny share of a very large total." }, [
      { t: "A class of only 8 students has 0.75% of its students away today, out of the whole class.", fb: "With 8 students, one student away is already 12.5%, far above 0.75%." },
      { t: "A 4-slice pizza has 0.75% of its slices left over after the meal is done.", fb: "Slices are whole here, and one slice of four is 25%, not a share under 1%." },
      { t: "A team won 0.75% of the 12 games it played this month in its league.", fb: "Wins come in whole games, and one win in 12 games is already over 8%." }
    ], sol, { mode: "ctx-075" });
  },
  function () {
    var sol = "A price compared with its earlier price can rise past the original whole: \\[ \\begin{aligned} 108\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>this month the price of a trail pass is 108% of its price last month</b>.";
    return mcq("Which situation can be described by a percent of 108%?", { t: "This month the price of a trail pass is 108% of its price last month.", fb: "Correct: the new price is compared with the old price and is a little larger." }, [
      { t: "A runner completed 108% of the whole 10 km race course during the race.", fb: "The course is the whole route, so the part completed in the race cannot pass 100% of it." },
      { t: "A survey says 108% of one whole class picked art as a favourite subject.", fb: "The students picking art are part of the class, so the share cannot pass 100%." },
      { t: "A jug holds 108% of its full volume in juice right now on the counter.", fb: "The volume of the jug is the whole space, so the juice in it cannot pass 100%." }
    ], sol, { mode: "ctx-108" });
  }
]), ["Ask whether the percent compares with an earlier amount, which can be passed, or takes part of one whole, which cannot.", "First decide if the percent is over 100% or under 1%, then match it to a comparison or a tiny share."]);

// 2. L1, 3.5: express a percent in decimal or fractional form.
E("u5-percent-convert", 5, ["3.5"], 1, "gen", function () {
  var pool = [
    { s: "5", pn: 5, pd: 1 }, { s: "10", pn: 10, pd: 1 }, { s: "15", pn: 15, pd: 1 }, { s: "20", pn: 20, pd: 1 },
    { s: "25", pn: 25, pd: 1 }, { s: "30", pn: 30, pd: 1 }, { s: "35", pn: 35, pd: 1 }, { s: "40", pn: 40, pd: 1 },
    { s: "45", pn: 45, pd: 1 }, { s: "55", pn: 55, pd: 1 }, { s: "60", pn: 60, pd: 1 }, { s: "65", pn: 65, pd: 1 },
    { s: "70", pn: 70, pd: 1 }, { s: "75", pn: 75, pd: 1 }, { s: "80", pn: 80, pd: 1 }, { s: "85", pn: 85, pd: 1 },
    { s: "90", pn: 90, pd: 1 }, { s: "95", pn: 95, pd: 1 }, { s: "7", pn: 7, pd: 1 }, { s: "3", pn: 3, pd: 1 },
    { s: "12.5", pn: 25, pd: 2 }, { s: "37.5", pn: 75, pd: 2 }, { s: "62.5", pn: 125, pd: 2 }, { s: "87.5", pn: 175, pd: 2 },
    { s: "2.5", pn: 5, pd: 2 }, { s: "0.5", pn: 1, pd: 2 }, { s: "125", pn: 125, pd: 1 }, { s: "150", pn: 150, pd: 1 },
    { s: "175", pn: 175, pd: 1 }, { s: "200", pn: 200, pd: 1 }, { s: "250", pn: 250, pd: 1 }, { s: "110", pn: 110, pd: 1 },
    { s: "240", pn: 240, pd: 1 }, { s: "1", pn: 1, pd: 1 }, { s: "99", pn: 99, pd: 1 }, { s: "33", pn: 33, pd: 1 }
  ];
  var it = pick(pool), pval = it.pn / it.pd;
  if (Math.random() < 0.5) {
    var dec = pval / 100;
    var dpK = (fmt(dec, 4).split(".")[1] || "").length;
    var cands = [
      { t: fmtF(pval / 10, dpK), fb: "That divides by 10 only; a percent is out of 100, so divide by 100." },
      { t: fmtF(pval / 1000, dpK + 1), fb: "That divides by 1000, one place too far; a percent is out of 100." },
      { t: fmtF(pval, dpK + 1), fb: "That is the percent number itself; it still needs to be divided by 100." },
      { t: fmt(pval * 100, 2), fb: "That multiplies by 100, which is the move for turning a decimal into a percent." }
    ];
    var ds = u5pick3(fmt(dec, 4), cands);
    var sol = "Percent means out of 100, so divide by 100: \\[ \\begin{aligned} " + it.s + "\\% &= " + it.s + " \\div 100 \\\\ &= " + fmt(dec, 4) + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a decimal is <b>" + fmt(dec, 4) + "</b>.";
    return mcq("Express \\(" + it.s + "\\%\\) as a decimal.", { t: fmt(dec, 4), fb: "Correct: dividing the percent by 100 gives the decimal." }, ds, sol, { mode: "pct-dec", p: it.s });
  }
  var fn = it.pn, fd = it.pd * 100, g = u5gcd(fn, fd); fn /= g; fd /= g;
  var fracTex = fd === 1 ? fmt(fn, 0) : FR(fn, fd);
  var corr = "\\(" + fracTex + "\\)";
  var cands2 = [
    { t: "\\(" + FR(it.pn, it.pd * 10) + "\\)", fb: "That uses tenths; a percent is out of 100, not out of 10." },
    { t: "\\(" + FR(fd, fn) + "\\)", fb: "That flips the fraction over; the percent amount belongs in the numerator." },
    { t: "\\(" + FR(it.pn * 2, it.pd * 100) + "\\)", fb: "That doubles the numerator, which changes the value of the fraction." },
    { t: "\\(" + FR(it.pn, it.pd) + "\\)", fb: "That drops the division by 100 that the percent sign stands for." }
  ];
  // reduce candidate fractions for display where they are unreduced by design; keep as written except flip candidate
  var ds2 = u5pick3(corr, cands2);
  var sol2 = "Write the percent as a fraction out of 100, then reduce: \\[ \\begin{aligned} " + it.s + "\\% &= " + FR(it.pn, it.pd * 100) + " \\\\ &= " + fracTex + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a fraction in lowest terms is <b>" + corr + "</b>.";
  return mcq("Express \\(" + it.s + "\\%\\) as a fraction in lowest terms.", { t: corr, fb: "Correct: the percent becomes a fraction out of 100, reduced to lowest terms." }, ds2, sol2, { mode: "pct-frac", p: it.s });
}, ["Percent means out of 100, so every conversion starts from hundredths.", "First write the percent over 100, then turn it into a decimal or reduce the fraction."]);

// 3. L1, 3.6: express a decimal in percent or fractional form.
E("u5-decimal-convert", 5, ["3.6"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var k = ri(1, 2500), v = k / 1000, pct = v * 100;
    var dpP = (fmt(pct, 2).split(".")[1] || "").length;
    var cands = [
      { t: fmtF(pct / 10, 3) + "%", fb: "That moves the decimal point one place only; a percent needs two places." },
      { t: fmtF(pct * 10, dpP) + "%", fb: "That moves the decimal point three places, one too many." },
      { t: fmtF(v, 3) + "%", fb: "That keeps the decimal value and just adds a percent sign; the value must be multiplied by 100." },
      { t: fmt(pct / 100, 3) + "%", fb: "That divides by 100, which is the move for turning a percent into a decimal." }
    ];
    var ds = u5pick3(fmt(pct, 2) + "%", cands);
    var sol = "Multiply by 100 to turn a decimal into a percent: \\[ \\begin{aligned} " + fmt(v, 3) + " \\times 100 &= " + fmt(pct, 2) + " \\end{aligned} \\] So \\(" + fmt(v, 3) + "\\) as a percent is <b>" + fmt(pct, 2) + "%</b>.";
    return mcq("Express \\(" + fmt(v, 3) + "\\) as a percent.", { t: fmt(pct, 2) + "%", fb: "Correct: multiplying the decimal by 100 gives the percent." }, ds, sol, { mode: "dec-pct", v: v });
  }
  var den0 = pick([10, 100, 1000]), num0 = ri(1, den0 * 2), attD = 0;
  while (num0 === den0 && attD < 60) { num0 = ri(1, den0 * 2); attD++; }
  if (num0 === den0) num0 = den0 + 1;
  var vv = num0 / den0, decPlaces = den0 === 10 ? 1 : den0 === 100 ? 2 : 3;
  var g2 = u5gcd(num0, den0), fn2 = num0 / g2, fd2 = den0 / g2;
  var fracTex2 = fd2 === 1 ? fmt(fn2, 0) : FR(fn2, fd2);
  var corr2 = "\\(" + fracTex2 + "\\)";
  var cands2 = [
    { t: "\\(" + FR(fd2, fn2) + "\\)", fb: "That flips the fraction over; the decimal value belongs in the numerator over its place value." },
    { t: "\\(" + FR(num0, den0 * 10) + "\\)", fb: "That uses the next place value down, which makes the fraction ten times too small." },
    { t: "\\(" + FR(num0 * 10, den0) + "\\)", fb: "That makes the numerator ten times too big for the place value shown." }
  ];
  var ds2b = u5pick3(corr2, cands2);
  var sol2 = "Write the decimal over its place value, then reduce: \\[ \\begin{aligned} " + fmt(vv, decPlaces) + " &= " + FR(num0, den0) + " \\\\ &= " + fracTex2 + " \\end{aligned} \\] So \\(" + fmt(vv, decPlaces) + "\\) as a fraction in lowest terms is <b>" + corr2 + "</b>.";
  return mcq("Express \\(" + fmt(vv, decPlaces) + "\\) as a fraction in lowest terms.", { t: corr2, fb: "Correct: the decimal is written over its place value and reduced." }, ds2b, sol2, { mode: "dec-frac", v: vv });
}, ["A decimal and a percent differ by a factor of 100, and a decimal fraction uses its place value as the denominator.", "First name the place value of the last decimal digit; that sets the denominator."]);

// 4. L1, 3.7: express a fraction in decimal or percent form.
E("u5-fraction-convert", 5, ["3.7"], 1, "gen", function () {
  var n = 3, d = 8;
  for (var att = 0; att < 200; att++) {
    d = pick([2, 4, 5, 8, 10, 20, 25, 40, 50]); n = ri(1, d * 3);
    if (n % d === 0) continue;
    if ((n * 1000) % d !== 0) continue;
    break;
  }
  if ((n * 1000) % d !== 0 || n % d === 0) { n = 3; d = 8; }
  var val = n / d, pct = val * 100;
  if (Math.random() < 0.5) {
    var dpV = (fmt(val, 3).split(".")[1] || "").length;
    var dpM = Math.max(3, dpV + 1);
    var cands = [
      { t: fmtF(val * 10, dpV), fb: "That is ten times too large; divide the numerator by the denominator as written." },
      { t: fmtF(val / 10, dpM), fb: "That is ten times too small; divide the numerator by the denominator as written." },
      { t: fmtF(d / n, dpM), fb: "That divides the denominator by the numerator, flipping the fraction over." },
      { t: fmt(Math.floor(val), 0) + "." + fmt(n, 0), fb: "That writes the numerator after the decimal point instead of dividing." }
    ];
    var ds = u5pick3(fmt(val, 3), cands);
    var sol = "A fraction means the numerator divided by the denominator: \\[ \\begin{aligned} " + FR(n, d) + " &= " + n + " \\div " + d + " \\\\ &= " + fmt(val, 3) + " \\end{aligned} \\] So the decimal form is <b>" + fmt(val, 3) + "</b>.";
    return mcq("Express \\(" + FR(n, d) + "\\) as a decimal.", { t: fmt(val, 3), fb: "Correct: dividing the numerator by the denominator gives the decimal." }, ds, sol, { mode: "frac-dec", n: n, d: d });
  }
  var dpV2 = (fmt(val, 3).split(".")[1] || "").length;
  var dpP2 = (fmt(pct, 2).split(".")[1] || "").length;
  var dpM2 = Math.max(dpP2 + 1, dpV2);
  var cands2 = [
    { t: fmtF(pct / 10, dpM2) + "%", fb: "That moves the decimal point one place only after dividing; a percent needs two places." },
    { t: fmtF(pct * 10, dpP2) + "%", fb: "That moves the decimal point one place too many after dividing." },
    { t: fmtF(val, dpM2) + "%", fb: "That is the decimal form with a percent sign added; the value still needs to be multiplied by 100." },
    { t: fmt(d / n * 100, 1) + "%", fb: "That flips the fraction before converting, so the percent is far too large." }
  ];
  var ds2 = u5pick3(fmt(pct, 2) + "%", cands2);
  var sol2 = "Divide first, then multiply by 100 for a percent: \\[ \\begin{aligned} " + FR(n, d) + " &= " + fmt(val, 3) + " \\\\ " + fmt(val, 3) + " \\times 100 &= " + fmt(pct, 2) + " \\end{aligned} \\] So the percent form is <b>" + fmt(pct, 2) + "%</b>.";
  return mcq("Express \\(" + FR(n, d) + "\\) as a percent.", { t: fmt(pct, 2) + "%", fb: "Correct: the fraction is divided out, then multiplied by 100." }, ds2, sol2, { mode: "frac-pct", n: n, d: d });
}, ["A fraction bar means division: numerator divided by denominator.", "First divide the numerator by the denominator, then decide if a percent is also needed."]);

// 5. L1, 3.8: express a two-term ratio from a context.
E("u5-two-term-ratio", 5, ["3.8"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters" }, { a: "girls", b: "boys" }, { a: "wins", b: "losses" },
    { a: "apples", b: "oranges" }, { a: "dogs", b: "cats" }, { a: "cars", b: "trucks" },
    { a: "forwards", b: "defenders" }, { a: "novels", b: "magazines" }
  ];
  var cx = pick(ctxs), a = ri(2, 15), b = ri(2, 15), att = 0;
  while (u5gcd(a, b) !== 1 && att < 60) { a = ri(2, 15); b = ri(2, 15); att++; }
  if (u5gcd(a, b) !== 1) { a = 3; b = 5; }
  var corr = a + ":" + b;
  var cands = [
    { t: b + ":" + a, fb: "That reverses the order; the ratio is asked as " + cx.a + " to " + cx.b + "." },
    { t: a + ":" + (a + b), fb: "That compares the first group with the total; the question asks for the first group to the second group." },
    { t: b + ":" + (a + b), fb: "That compares the second group with the total, not the two groups with each other." },
    { t: (a + b) + ":" + b, fb: "That puts the total first; a two-term ratio here compares the two named groups only." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Match the counts in the order named: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + a + " : " + b + " \\end{aligned} \\] So the ratio of " + cx.a + " to " + cx.b + " is <b>" + corr + "</b>.";
  return mcq("A group has " + a + " " + cx.a + " and " + b + " " + cx.b + ". What is the ratio of " + cx.a + " to " + cx.b + "?", { t: corr, fb: "Correct: the counts are written in the order the groups are named." }, ds, sol, { mode: "two-term", a: a, b: b });
}, ["A ratio keeps the order of the groups exactly as they are named in the question.", "First write the count for the group named first, then the count for the group named second."]);

// 6. L1, 3.16: express a rate using words or symbols.
E("u5-express-rate", 5, ["3.16"], 1, "gen", function () {
  var tmpls = [
    { desc: "A bus travels {A} km in {B} h", u1: "km", u2: "h", w1: "kilometres", w2: "hour" },
    { desc: "A tap fills {A} L in {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "A worker earns ${A} in {B} h", u1: "$", u2: "h", w1: "dollars", w2: "hour" },
    { desc: "A printer prints {A} pages in {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "A car uses {A} L of fuel for {B} km driven", u1: "L", u2: "km", w1: "litres", w2: "kilometre" },
    { desc: "A ferry carries {A} passengers in {B} trips", u1: "passengers", u2: "trips", w1: "passengers", w2: "trip" },
    { desc: "A heart beats {A} times in {B} min", u1: "beats", u2: "min", w1: "beats", w2: "minute" },
    { desc: "Snow falls {A} cm in {B} h", u1: "cm", u2: "h", w1: "centimetres", w2: "hour" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "That reverses the rate; the amount measured goes first and the unit it is measured against goes second." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "That swaps the two units; each number must keep the unit it was measured in." },
    { t: A + " " + t.u1 + " in total", fb: "That gives only the amount; a rate must also say what the amount is measured against." },
    { t: A + ":" + B, fb: "That is ratio notation for two amounts of the same kind; a rate keeps both units written in." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate joins an amount to the unit it is measured against: \\[ \\begin{aligned} \\text{rate} &= " + A + " \\text{ " + t.w1 + " per } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Written with symbols, the rate is <b>" + corr + "</b>.";
  return mcq(desc + ". Which expression records this rate with symbols?", { t: corr, fb: "Correct: the measured amount and its unit come first, then the unit it is measured against." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["A rate compares two different units, and both units stay in the written rate.", "First write the measured amount with its unit, then a slash, then the second amount with its unit."]);

// 7. L2, 3.2: represent a fractional percent on a grid.
E("u5-grid-fractional-percent", 5, ["3.2"], 1, "gen", function () {
  var fracs = [{ v: 0.25, w: "one quarter" }, { v: 0.5, w: "one half" }, { v: 0.75, w: "three quarters" }];
  var f = pick(fracs), base = pick([0, 1, 2, 3, 5, 6, 8, 9, 12, 15, 17, 21, 24, 28, 31, 35, 38, 42, 45, 52, 57, 63, 68, 74, 81, 90]);
  var p = base + f.v, pStr = fmt(p, 2);
  var comp = 1 - f.v, compW = comp === 0.25 ? "one quarter" : comp === 0.5 ? "one half" : "three quarters";
  var corr = base === 0 ? "Shade " + f.w + " of one square" : "Shade " + base + " full squares and " + f.w + " of one more square";
  var third = f.v === 0.5
    ? (base === 0 ? "Shade half of each of two squares" : "Shade " + base + " full squares and half of each of two more squares")
    : (base === 0 ? "Shade " + compW + " of one square" : "Shade " + base + " full squares and " + compW + " of one more square");
  var thirdFb = f.v === 0.5 ? "That splits the half across two squares, shading a full square in total instead of half of one square." : "That shades the rest of the last square instead of the fractional part named by the percent.";
  var cands = [
    { t: base === 0 ? "Shade one full square only" : "Shade " + (base + 1) + " full squares, with no part of another square", fb: "That rounds the percent up to the next whole square and loses the fractional part." },
    { t: base === 0 ? "Shade no squares at all on the grid" : "Shade " + base + " full squares only, with no part of another square", fb: "That drops the fractional part of the percent; part of one more square is still needed." },
    { t: third, fb: thirdFb }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Each full square on a 100 grid is 1%, and the leftover part shades part of one square: \\[ \\begin{aligned} " + pStr + "\\% &= " + base + "\\% + " + fmt(f.v, 2) + "\\% \\end{aligned} \\] So the representation is: <b>" + corr + "</b>.";
  return mcq("A 100-square grid is used to model a percent. Each full square stands for 1%. How is \\(" + pStr + "\\%\\) represented on the grid?", { t: corr, fb: "Correct: the whole part gives full squares and the fractional part gives part of one more square." }, ds, sol, { mode: "grid-frac-pct", p: pStr });
}, ["Split the percent into its whole part and its fractional part before thinking about squares.", "First count the full squares from the whole number part of the percent."]);

// 8. L2, 3.3: represent a percent over 100 using grids.
E("u5-grid-over-100", 5, ["3.3"], 1, "gen", function () {
  var grids = ri(1, 2), extra = ri(3, 95), p = grids * 100 + extra;
  var gw = grids === 1 ? "one full grid" : "two full grids";
  var corr = "Shade " + gw + " and " + extra + " squares of another grid";
  var cands = [
    { t: "Shade " + extra + " squares of one grid, and none of another", fb: "That shows only the part past the full grids; the full grids themselves must be shaded too." },
    { t: grids === 1 ? "Shade two full grids, and no squares of another grid" : "Shade three full grids, and no squares of another grid", fb: "That rounds up to whole grids only and adds squares the percent does not call for." },
    { t: "Shade " + gw + " and " + (100 - extra) + " squares of another grid", fb: "That shades the complement on the last grid instead of the extra squares named by the percent." },
    { t: "Shade " + p + " squares of one grid, and no squares of another", fb: "One grid holds only 100 squares, so a percent this large needs more than one grid." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Each grid holds 100 squares, so count off full hundreds first: \\[ \\begin{aligned} " + p + "\\% &= " + (grids * 100) + "\\% + " + extra + "\\% \\end{aligned} \\] So the representation is: <b>" + corr + "</b>.";
  return mcq("Hundred grids are used to model a percent. Each grid has 100 squares and each square stands for 1%. How is \\(" + p + "\\%\\) represented?", { t: corr, fb: "Correct: full hundreds fill whole grids and the remainder fills part of one more grid." }, ds, sol, { mode: "grid-over-100", p: p });
}, ["Count off full hundreds first, because each grid holds exactly 100 squares.", "First work out how many whole grids the hundreds in the percent fill."]);

// 9. L2, 3.4: read a shaded grid in percent, decimal and fraction form.
E("u5-shaded-grid-read", 5, ["3.4"], 1, "gen", function () {
  var k = ri(4, 96); if (k === 50) k = 54;
  var g = u5gcd(k, 100), fn = k / g, fd = 100 / g;
  var u = 100 - k, gu = u5gcd(u, 100);
  function forms(p, frn, frd) { return fmt(p, 0) + "%, " + fmtF(p / 100, 2) + ", \\(" + FR(frn, frd) + "\\)"; }
  var corr = forms(k, fn, fd);
  var cands = [
    { t: forms(u, u / gu, 100 / gu), fb: "That describes the unshaded squares; the question asks about the shaded part." },
    { t: fmt(k, 0) + "%, " + fmt(k / 10, 2) + ", \\(" + FR(fn, fd) + "\\)", fb: "The decimal there is ten times too large; a percent is divided by 100 to get its decimal." },
    { t: fmt(k, 0) + "%, " + fmtF(k / 100, 2) + ", \\(" + FR(k, u) + "\\)", fb: "That fraction compares shaded squares with unshaded squares; a part-to-whole fraction uses the whole grid as the denominator." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the shaded squares out of the 100 on the grid, then convert: \\[ \\begin{aligned} \\text{percent} &= " + k + "\\% \\\\ \\text{decimal} &= " + k + " \\div 100 = " + fmtF(k / 100, 2) + " \\\\ \\text{fraction} &= " + FR(k, 100) + " = " + FR(fn, fd) + " \\end{aligned} \\] So the shaded part, in percent, decimal and fraction form, is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a 100-square grid with some squares shaded. Which row gives the shaded part in percent form, decimal form and fraction form in lowest terms, in that order?", { t: corr, fb: "Correct: the count out of 100 gives the percent, and the other forms follow from it." }, ds, sol, { mode: "grid-read", k: k });
  q.figure = u5gridSVG(k);
  return q;
}, ["Count the shaded squares first; out of 100, that count is the percent itself.", "First count the shaded squares, then divide by 100 for the decimal and reduce for the fraction."]);

// 10. L2, 6.1, CR 3: percent of a number in context.
E("u5-percent-of-number", 5, ["6.1"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var pairs = [[20, 150], [25, 240], [30, 120], [40, 250], [50, 180], [60, 350], [75, 160], [80, 450], [15, 200], [35, 300], [90, 600], [10, 480], [45, 220], [55, 400], [65, 500], [70, 320], [85, 700], [95, 900], [5, 640], [12, 350], [18, 450], [22, 550]];
    var pr = pick(pairs), p = pr[0], W = pr[1], ans = W * p / 100;
    var ctxs = [
      "In a survey, " + p + "% of " + W + " students said they walk to school. How many students said they walk to school?",
      "A hockey team won " + p + "% of its " + W + " shots on goal as goals this season. How many goals did the team score?",
      "A store sold " + p + "% of " + W + " concert tickets in the first hour. How many tickets were sold in the first hour?"
    ];
    var prompt = pick(ctxs);
    var sol = "Find the percent of the whole amount: \\[ \\begin{aligned} " + p + "\\% \\text{ of } " + W + " &= " + fmt(p / 100, 2) + " \\times " + W + " \\\\ &= " + fmt(ans, 0) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans, 0) + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "pct-of-std", p: p, w: W });
  }
  if (mode === 1) {
    var pairs2 = [[110, 200], [120, 250], [125, 160], [130, 300], [150, 240], [175, 120], [200, 90], [140, 350], [115, 400], [135, 500], [160, 450], [180, 600], [225, 320], [250, 280]];
    var pr2 = pick(pairs2), p2 = pr2[0], W2 = pr2[1], ans2 = W2 * p2 / 100;
    var prompt2 = "Last year a trail crew cleared " + W2 + " m of trail. This year the crew cleared " + p2 + "% as much trail as last year. How many metres of trail did the crew clear this year?";
    var sol2 = "A percent over 100% gives an amount larger than the whole it is compared with: \\[ \\begin{aligned} " + p2 + "\\% \\text{ of } " + W2 + " &= " + fmt(p2 / 100, 2) + " \\times " + W2 + " \\\\ &= " + fmt(ans2, 0) + " \\end{aligned} \\] So the crew cleared <b>" + fmt(ans2, 0) + " m</b>.";
    return numq(prompt2, ans2, 0.01, sol2, { mode: "pct-of-over", p: p2, w: W2 });
  }
  var pairs3 = [[5, 4000], [4, 5000], [8, 2000], [5, 8000], [2, 10000], [8, 6000], [4, 12000], [2, 15000], [5, 20000], [8, 9000], [4, 25000], [2, 30000]];
  var pr3 = pick(pairs3), p10 = pr3[0], W3 = pr3[1], ans3 = W3 * p10 / 1000;
  var pStr3 = fmt(p10 / 10, 1);
  var prompt3 = "A town has " + W3 + " residents. About " + pStr3 + "% of the residents were born on a holiday. About how many residents were born on a holiday?";
  var sol3 = "A percent under 1% is a small fraction of the whole: \\[ \\begin{aligned} " + pStr3 + "\\% \\text{ of } " + W3 + " &= " + fmt(p10 / 1000, 4) + " \\times " + W3 + " \\\\ &= " + fmt(ans3, 0) + " \\end{aligned} \\] So about <b>" + fmt(ans3, 0) + " residents</b> were born on a holiday.";
  return numq(prompt3, ans3, 0.01, sol3, { mode: "pct-of-small", p: pStr3, w: W3 });
}, ["Turn the percent into a decimal first, then multiply by the whole amount.", "First write the percent as a decimal by dividing it by 100."]);

// 11. L2, 6.1, CR 3: find the whole given a part and a percent.
E("u5-find-the-whole", 5, ["6.1"], 2, "gen", function () {
  var pool = [[25, 60], [20, 80], [30, 90], [40, 150], [50, 70], [75, 120], [80, 200], [10, 240], [60, 300], [90, 400], [15, 200], [35, 260], [12, 250], [16, 150], [18, 200], [22, 150], [28, 250], [32, 200], [38, 150], [42, 200], [48, 250], [52, 200], [56, 150], [64, 200], [72, 250], [84, 150], [88, 200], [45, 180], [65, 140], [85, 220], [55, 160], [95, 300]];
  var pr = pick(pool), p = pr[0], W = pr[1], part = W * p / 100;
  var ctxs = [
    { q: part + " students is " + p + "% of the students in a school. How many students are in the school?", unit: "students" },
    { q: "A team scored " + part + " points, which is " + p + "% of the points it needs for a banner. How many points does the team need in total?", unit: "points" },
    { q: "After a morning sale, " + part + " tickets remained unsold, and that is " + p + "% of the tickets printed. How many tickets were printed?", unit: "tickets" }
  ];
  var cx = pick(ctxs);
  var sol = "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= " + part + " \\div " + fmt(p / 100, 2) + " \\\\ &= " + W + " \\end{aligned} \\] So the whole is <b>" + W + " " + cx.unit + "</b>.";
  return numq(cx.q, W, 0.01, sol, { mode: "find-whole", p: p, part: part });
}, ["The given amount is only the named percent of the whole, so the whole is larger.", "First write the percent as a decimal, then divide the part by that decimal."]);

// 12. L2, 6.2, CR 3: combined percents, discount then HST.
E("u5-discount-then-tax", 5, ["6.2"], 2, "gen", function () {
  var items = ["winter jacket", "bicycle helmet", "pair of snowshoes", "school backpack", "set of curling gloves", "rain coat"];
  var item = pick(items), P = pick([60, 80, 100, 120, 160, 200, 240, 300, 400]), d = pick([10, 20, 25, 30, 40, 50]);
  var sale = P * (1 - d / 100), fin = u5r2(sale * 1.15), tax = u5r2(fin - sale);
  var sol = "Apply the discount first, then add HST of 15% to the sale price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d / 100, 2) + " = " + fmtF(sale, 2) + " \\\\ \\text{final price} &= " + fmtF(sale, 2) + " \\times 1.15 = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
  return numq("A " + item + " is priced at $" + fmtF(P, 2) + ". It is on sale for " + d + "% off. HST of 15% is then added to the sale price. What is the final price, in dollars?", fin, 0.01, sol, { mode: "disc-tax", p: P, d: d });
}, ["Combined percents act one after the other, and the second percent acts on the new amount.", "First take the discount off the full price to get the sale price."]);

// 13. L2, 6.3: percent of a percent.
E("u5-percent-of-percent", 5, ["6.3"], 1, "gen", function () {
  var A = pick([20, 30, 40, 50, 60, 70, 80, 90]), B = pick([20, 30, 40, 50, 60, 70, 80, 90]);
  var ans = A * B / 100;
  var ctxs = [
    { q: "At a school, " + A + "% of students take the bus. Of the students who take the bus, " + B + "% ride Bus 4. What percent of all students ride Bus 4?", thing: "ride Bus 4" },
    { q: "On a team, " + A + "% of players are in Grade 8. Of those Grade 8 players, " + B + "% play defence. What percent of the whole team are Grade 8 players who play defence?", thing: "are Grade 8 defenders" },
    { q: "In a library, " + A + "% of the books are nonfiction. Of the nonfiction books, " + B + "% are about animals. What percent of all the books are nonfiction books about animals?", thing: "are animal nonfiction" }
  ];
  var cx = pick(ctxs);
  var cands = [
    { t: fmt(A + B, 0) + "%", fb: "That adds the two percents; the second percent acts only on the first group, so the percents are multiplied, not added." },
    { t: fmt(B, 0) + "%", fb: "That is the second percent alone; it describes only the smaller group, not the whole group." },
    { t: fmt(A, 0) + "%", fb: "That is the first percent alone; it does not narrow the group down the second time." },
    { t: fmt(Math.abs(A - B), 0) + "%", fb: "That subtracts the two percents; finding a percent of a percent uses multiplication." }
  ];
  var ds = u5pick3(fmt(ans, 0) + "%", cands);
  var sol = "A percent of a percent multiplies the two decimals: \\[ \\begin{aligned} " + fmt(A / 100, 2) + " \\times " + fmt(B / 100, 2) + " &= " + fmt(ans / 100, 4) + " \\\\ &= " + fmt(ans, 0) + "\\% \\end{aligned} \\] So <b>" + fmt(ans, 0) + "%</b> of the whole group " + cx.thing + ".";
  return mcq(cx.q, { t: fmt(ans, 0) + "%", fb: "Correct: the second percent is taken of the first group, so the decimals multiply." }, ds, sol, { mode: "pct-of-pct", a: A, b: B });
}, ["The second percent acts only on the group the first percent picked out.", "First change both percents to decimals, then multiply them."]);

// 14. L2, 3.9: express a three-term ratio from a context.
E("u5-three-term-ratio", 5, ["3.9"], 1, "gen", function () {
  var ctxs = [
    { n: ["red paint", "yellow paint", "white paint"] }, { n: ["nickels", "dimes", "quarters"] },
    { n: ["apples", "pears", "plums"] }, { n: ["drums", "guitars", "fiddles"] },
    { n: ["junior", "intermediate", "senior"] }, { n: ["sand", "gravel", "cement"] }
  ];
  var cx = pick(ctxs), vals = [3, 4, 5], att = 0;
  do { vals = [ri(2, 11), ri(2, 11), ri(2, 11)]; att++; } while (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1 && att < 80);
  if (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1) vals = [2, 3, 5];
  var a = vals[0], b = vals[1], c = vals[2], tot = a + b + c;
  var corr = a + ":" + b + ":" + c;
  var cands = [
    { t: c + ":" + b + ":" + a, fb: "That reverses the order; the terms must follow the order the groups are named." },
    { t: a + ":" + b + ":" + tot, fb: "That puts the total in place of the third group; the third term is the third group count." },
    { t: a + ":" + c + ":" + b, fb: "That swaps the second and third groups; check the order the groups are named." },
    { t: b + ":" + a + ":" + c, fb: "That swaps the first and second groups; check the order the groups are named." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Write the three counts in the order the groups are named: \\[ \\begin{aligned} " + cx.n[0] + " : " + cx.n[1] + " : " + cx.n[2] + " &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] So the three-term ratio is <b>" + corr + "</b>.";
  return mcq("A collection has " + a + " " + cx.n[0] + ", " + b + " " + cx.n[1] + " and " + c + " " + cx.n[2] + ". What is the ratio of " + cx.n[0] + " to " + cx.n[1] + " to " + cx.n[2] + "?", { t: corr, fb: "Correct: all three counts appear once, in the order named." }, ds, sol, { mode: "three-term", a: a, b: b, c: c });
}, ["A three-term ratio carries all three counts, in the exact order the groups are named.", "First list the three counts in order, then join them with colons."]);

// 15. L2, 3.10: part-to-part ratio as a part-to-whole fraction.
E("u5-part-to-whole-fraction", 5, ["3.10"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters", first: "red" }, { a: "boys", b: "girls", first: "boys" },
    { a: "wins", b: "losses", first: "wins" }, { a: "fiction books", b: "nonfiction books", first: "fiction" }
  ];
  var cx = pick(ctxs), a = ri(2, 14), b = ri(2, 14), att2 = 0;
  while (a === b && att2 < 60) { b = ri(2, 14); att2++; }
  if (a === b) b = a + 1;
  var tot = a + b;
  var g = u5gcd(a, tot), corr = "\\(" + FR(a / g, tot / g) + "\\)";
  var gb = u5gcd(b, tot);
  var cands = [
    { t: "\\(" + FR(a, b) + "\\)", fb: "That is the part-to-part ratio written as a fraction; a part-to-whole fraction needs the total in the denominator." },
    { t: "\\(" + FR(b / gb, tot / gb) + "\\)", fb: "That is the share of the second group; the question asks for the first group." },
    { t: "\\(" + FR(tot, a) + "\\)", fb: "That flips the fraction; the part belongs in the numerator and the whole in the denominator." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "The whole is the two parts added together, and the fraction uses part over whole: \\[ \\begin{aligned} \\text{whole} &= " + a + " + " + b + " = " + tot + " \\\\ \\text{fraction} &= " + FR(a, tot) + " = " + FR(a / g, tot / g) + " \\end{aligned} \\] So the fraction that are " + cx.first + " is <b>" + corr + "</b>.";
  return mcq("The ratio of " + cx.a + " to " + cx.b + " in a set is " + a + ":" + b + ". What fraction of the whole set is made up of " + cx.a + "? Give the fraction in lowest terms.", { t: corr, fb: "Correct: the first part is over the total of both parts, reduced." }, ds, sol, { mode: "part-whole", a: a, b: b });
}, ["Part-to-whole means the denominator is both parts added together, not the other part.", "First add the two ratio terms to get the whole."]);

// 16. L2, 3.11: express a ratio as a percent.
E("u5-ratio-as-percent", 5, ["3.11"], 1, "gen", function () {
  var ctxs = [
    { a: "wins", b: "losses", first: "wins" }, { a: "red marbles", b: "green marbles", first: "red marbles" },
    { a: "sunny days", b: "cloudy days", first: "sunny days" }, { a: "fiction picks", b: "nonfiction picks", first: "fiction picks" }
  ];
  var cx = pick(ctxs), T = pick([5, 10, 20, 25, 50]), a = ri(1, T - 1);
  if (a * 2 === T) a += 1;
  var b = T - a;
  var pct = a * 100 / T, comp = 100 - pct;
  var c1t = fmt(u5r2(a / b * 100), 1) + "%";
  var c2t = (c1t.indexOf(".") >= 0) ? fmtF(comp, 1) + "%" : fmt(comp, 1) + "%";
  var cands = [
    { t: c1t, fb: "That divides the first part by the second part; a percent of the whole divides the first part by the total." },
    { t: c2t, fb: "That is the percent for the second group; the question asks for the first group." },
    { t: fmt(a, 0) + "%", fb: "That uses the count itself as a percent; the count must be compared with the total first." },
    { t: fmt(pct / 10, 2) + "%", fb: "That is ten times too small; the fraction of the whole is multiplied by 100 to get a percent." }
  ];
  var ds = u5pick3(fmt(pct, 1) + "%", cands);
  var sol = "The percent is the first part over the whole, times 100: \\[ \\begin{aligned} \\text{whole} &= " + a + " + " + b + " = " + T + " \\\\ \\text{percent} &= " + FR(a, T) + " \\times 100 = " + fmt(pct, 1) + "\\% \\end{aligned} \\] So " + cx.first.trim() + " make up <b>" + fmt(pct, 1) + "%</b> of the whole.";
  return mcq("The ratio of " + cx.a + " to " + cx.b + " is " + a + ":" + b + ". What percent of the whole is made up of " + cx.a + "?", { t: fmt(pct, 1) + "%", fb: "Correct: the first part is divided by the total and multiplied by 100." }, ds, sol, { mode: "ratio-pct", a: a, b: b });
}, ["A ratio term becomes a percent only after it is compared with the whole, not with the other term.", "First add the terms to get the whole, then divide the first term by the whole."]);

// 17. L2, 3.13, var: explain the meaning of a/b in a ratio context.
E("u5-meaning-of-ratio-ab", 5, ["3.13"], 1, "var", varset([
  function () {
    var sol = "In ratio form, the two numbers compare two separate amounts: \\[ \\begin{aligned} " + FR(2, 3) + " &\\text{ means } 2 \\text{ to } 3 \\end{aligned} \\] So it means <b>for every 2 cups of syrup, there are 3 cups of water</b>.";
    return mcq("In a juice mix, the ratio of syrup to water is written as \\(" + FR(2, 3) + "\\). What does this ratio mean?", { t: "For every 2 cups of syrup, there are 3 cups of water.", fb: "Correct: the numerator and denominator are the two amounts being compared, in order." }, [
      { t: "Syrup makes up 2 of the 3 cups in the whole mix.", fb: "That reads the fraction as part to whole; here the two numbers compare syrup with water directly." },
      { t: "For every 3 cups of syrup, there are 2 cups of water.", fb: "That reverses the two amounts; syrup is named first, so its amount comes first." },
      { t: "The whole mix has 3 cups in total.", fb: "The 3 is the amount of water in the comparison, not the size of the whole mix." }
    ], sol, { mode: "meaning-23" });
  },
  function () {
    var sol = "The fraction compares the first group with the second group: \\[ \\begin{aligned} " + FR(4, 5) + " &\\text{ means } 4 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 4 boys at practice, there are 5 girls at practice</b>.";
    return mcq("At a practice, the ratio of boys to girls is written as \\(" + FR(4, 5) + "\\). What does this ratio mean?", { t: "For every 4 boys at practice, there are 5 girls at practice.", fb: "Correct: the two numbers are the sizes of the two groups, in the order named." }, [
      { t: "Boys make up 4 of the 5 students at practice.", fb: "That reads the fraction as part to whole; here the numbers compare the two groups with each other." },
      { t: "For every 5 boys at practice, there are 4 girls at practice.", fb: "That reverses the groups; boys are named first, so their number comes first." },
      { t: "There are 5 students at practice in total.", fb: "The 5 is the number of girls in the comparison group, not the total at practice." }
    ], sol, { mode: "meaning-45" });
  },
  function () {
    var sol = "A ratio fraction keeps both amounts and the order they are named in: \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ means } 5 \\text{ to } 2 \\end{aligned} \\] So it means <b>for every 5 cups of flour, there are 2 cups of sugar</b>.";
    return mcq("In a recipe, the ratio of flour to sugar is written as \\(" + FR(5, 2) + "\\). What does this ratio mean?", { t: "For every 5 cups of flour, there are 2 cups of sugar.", fb: "Correct: flour is compared with sugar, using the two amounts in order." }, [
      { t: "Flour makes up 5 of the 2 cups in the recipe.", fb: "A part cannot be larger than its whole that way; the numbers here compare two ingredients with each other." },
      { t: "For every 2 cups of flour, there are 5 cups of sugar.", fb: "That reverses the ingredients; flour is named first in the ratio." },
      { t: "The recipe uses 2 cups in total.", fb: "The 2 is the amount of sugar in the comparison, not the total amount in the recipe." }
    ], sol, { mode: "meaning-52" });
  },
  function () {
    var sol = "Each number in the ratio belongs to one of the two colours being compared: \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ means } 3 \\text{ to } 4 \\end{aligned} \\] So it means <b>for every 3 red counters, there are 4 blue counters</b>.";
    return mcq("In a bin, the ratio of red counters to blue counters is written as \\(" + FR(3, 4) + "\\). What does this ratio mean?", { t: "For every 3 red counters, there are 4 blue counters.", fb: "Correct: the ratio compares the red count with the blue count, in that order." }, [
      { t: "Red counters make up 3 of the 4 counters in the bin.", fb: "That reads the fraction as part to whole; the 4 here is the blue count, not the total." },
      { t: "For every 4 red counters, there are 3 blue counters.", fb: "That reverses the colours; red is named first, so its count comes first." },
      { t: "There are 4 counters in the bin in total.", fb: "The 4 is the blue count in the comparison, not the total number of counters." }
    ], sol, { mode: "meaning-34" });
  },
  function () {
    var sol = "The ratio links the two distances that go with one full turn: \\[ \\begin{aligned} " + FR(7, 5) + " &\\text{ means } 7 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 7 m the front gear wheel turns in distance, the rear wheel turns 5 m in the same comparison</b>.";
    return mcq("A gear chart writes the ratio of front wheel distance to rear wheel distance as \\(" + FR(7, 5) + "\\). What does this ratio mean?", { t: "For every 7 m of front wheel distance, there are 5 m of rear wheel distance.", fb: "Correct: the two numbers compare the two distances directly, in the order named." }, [
      { t: "The front wheel distance is 7 of the 5 m travelled in total.", fb: "That reads the fraction as part to whole; the 5 is the second distance, not a total." },
      { t: "For every 5 m of front wheel distance, there are 7 m of rear wheel distance.", fb: "That reverses the two wheels; the front wheel is named first." },
      { t: "The two wheels travel 5 m in total.", fb: "The 5 belongs to the rear wheel distance in the comparison, not to a total." }
    ], sol, { mode: "meaning-75" });
  }
]), ["In a ratio, a fraction compares two amounts with each other, not a part with a whole.", "First name which amount the top number belongs to and which amount the bottom number belongs to."]);

// 18. L2, 3.15, var: provide a context where a/b represents a ratio.
E("u5-context-for-ratio-ab", 5, ["3.15"], 1, "var", varset([
  function () {
    var sol = "A ratio compares two separate amounts of the same kind: \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ as a ratio means } 3 \\text{ to } 4 \\end{aligned} \\] So the ratio context is <b>a bin with 3 red pens for every 4 blue pens</b>.";
    return mcq("In which context does \\(" + FR(3, 4) + "\\) represent a ratio?", { t: "A bin holds 3 red pens for every 4 blue pens.", fb: "Correct: two separate groups, red pens and blue pens, are compared with each other." }, [
      { t: "Three of the 4 slices of one pizza have cheese.", fb: "That is a part of one whole pizza, a part-to-whole fraction, not a comparison of two groups." },
      { t: "A class shares 3 pizzas equally among 4 students.", fb: "That is a division sharing situation, not a comparison of two groups." },
      { t: "A car travels 3 km in 4 minutes on a road into town.", fb: "That compares two different units, distance and time, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-34" });
  },
  function () {
    var sol = "The two numbers must name two groups being compared: \\[ \\begin{aligned} " + FR(5, 3) + " &\\text{ as a ratio means } 5 \\text{ to } 3 \\end{aligned} \\] So the ratio context is <b>a shelf with 5 novels for every 3 comic books</b>.";
    return mcq("In which context does \\(" + FR(5, 3) + "\\) represent a ratio?", { t: "A shelf holds 5 novels for every 3 comic books.", fb: "Correct: novels and comic books are two separate groups being compared." }, [
      { t: "Five of the 3 pages assigned were read last night.", fb: "A part cannot be 5 of 3 pages this way; the numbers do not compare two groups here." },
      { t: "A group splits 5 granola bars among 3 friends.", fb: "That is a sharing division, not a comparison of two groups." },
      { t: "A hose fills 5 L in 3 minutes in the garden.", fb: "That compares litres with minutes, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-53" });
  },
  function () {
    var sol = "Wins and losses are two separate results being compared: \\[ \\begin{aligned} " + FR(7, 2) + " &\\text{ as a ratio means } 7 \\text{ to } 2 \\end{aligned} \\] So the ratio context is <b>a team with 7 wins for every 2 losses</b>.";
    return mcq("In which context does \\(" + FR(7, 2) + "\\) represent a ratio?", { t: "A team has 7 wins for every 2 losses this season.", fb: "Correct: wins and losses are two separate counts compared with each other." }, [
      { t: "Seven of the 2 periods in a game were scoreless.", fb: "A part cannot be 7 of 2 periods this way; the numbers do not compare two groups here." },
      { t: "Seven players share 2 water bottles at practice.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "A Zamboni covers 7 m in 2 seconds on the ice.", fb: "That compares metres with seconds, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-72" });
  },
  function () {
    var sol = "Two plant types in the same garden are compared directly: \\[ \\begin{aligned} " + FR(2, 5) + " &\\text{ as a ratio means } 2 \\text{ to } 5 \\end{aligned} \\] So the ratio context is <b>a garden with 2 rose bushes for every 5 tulip patches</b>.";
    return mcq("In which context does \\(" + FR(2, 5) + "\\) represent a ratio?", { t: "A garden has 2 rose bushes for every 5 tulip patches.", fb: "Correct: two separate groups of plants are compared with each other." }, [
      { t: "Two of the 5 rows in the garden are planted with roses.", fb: "That is a part of one whole garden, a part-to-whole fraction." },
      { t: "Two gardeners share 5 watering cans between them.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "Rain falls 2 cm in 5 hours during a storm overnight.", fb: "That compares centimetres with hours, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-25" });
  },
  function () {
    var sol = "Two song types in the same playlist are compared with each other: \\[ \\begin{aligned} " + FR(4, 9) + " &\\text{ as a ratio means } 4 \\text{ to } 9 \\end{aligned} \\] So the ratio context is <b>a playlist with 4 rock songs for every 9 pop songs</b>.";
    return mcq("In which context does \\(" + FR(4, 9) + "\\) represent a ratio?", { t: "A playlist has 4 rock songs for every 9 pop songs.", fb: "Correct: rock songs and pop songs are two separate groups being compared." }, [
      { t: "Four of the 9 songs on an album are rock songs.", fb: "That is a part of one whole album, a part-to-whole fraction." },
      { t: "Four singers share 9 microphones on the stage.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "A speaker plays 4 songs in 9 minutes at the school dance.", fb: "That compares songs with minutes, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-49" });
  }
]), ["A ratio context compares two separate amounts; a part of one whole and a comparison of different units are different ideas.", "First check what the two numbers describe: two groups, one whole, or two different units."]);

// 19. L2, 3.12: identify a ratio from a real-life example and record it in simplest form.
E("u5-identify-ratio-simplest", 5, ["3.12"], 1, "gen", function () {
  var ctxs = [
    { s: "A cafeteria tray count finds {A} juice boxes and {B} milk cartons on the lunch line.", a: "juice boxes", b: "milk cartons" },
    { s: "A pet survey counts {A} dogs and {B} cats in one neighbourhood.", a: "dogs", b: "cats" },
    { s: "A parking lot count finds {A} cars and {B} pickup trucks before a game.", a: "cars", b: "pickup trucks" },
    { s: "A class library audit counts {A} picture books and {B} chapter books on one shelf.", a: "picture books", b: "chapter books" },
    { s: "A rink canteen sells {A} hot chocolates and {B} teas during intermission.", a: "hot chocolates", b: "teas" },
    { s: "A trail group counts {A} adults and {B} youth on a Saturday hike.", a: "adults", b: "youth" }
  ];
  var cx = pick(ctxs);
  var basePairs = [[2, 3], [3, 4], [4, 5], [5, 6], [3, 5], [5, 7], [2, 5], [4, 7], [5, 3], [7, 4], [3, 2], [5, 4]];
  var bp = pick(basePairs), m = ri(2, 6), A = bp[0] * m, B = bp[1] * m;
  var corr = bp[0] + ":" + bp[1];
  var cands = [
    { t: A + ":" + B, fb: "That is the ratio with the raw counts; the question asks for simplest form, so divide both terms by " + m + "." },
    { t: bp[1] + ":" + bp[0], fb: "That reverses the two groups; the order must stay as named in the example." },
    { t: bp[0] + ":" + (bp[0] + bp[1]), fb: "That compares the first group with the total; a ratio here compares the two groups with each other." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Record the counts as a ratio, then divide both terms by their common factor: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + A + " : " + B + " \\\\ &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] So the ratio in simplest form is <b>" + corr + "</b>.";
  return mcq(cx.s.replace("{A}", A).replace("{B}", B) + " What is the ratio of " + cx.a + " to " + cx.b + ", in simplest form?", { t: corr, fb: "Correct: the counts keep their order and both terms are divided by the same common factor." }, ds, sol, { mode: "identify-ratio", a: A, b: B });
}, ["Real-life counts become a ratio first, and simplest form divides both terms by the same number.", "First write the ratio with the counted amounts, in the order named."]);

// 20. L2, 6.28, CR 2: solve a ratio problem.
E("u5-ratio-problem-solve", 5, ["6.28"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var pairs = [[2, 3], [3, 5], [2, 5], [3, 4], [4, 7], [5, 3]];
    var pr = pick(pairs), a = pr[0], b = pr[1], s = ri(2, 9), given = a * s, ans = b * s;
    var ctxs = [
      "Paint is mixed in the ratio " + a + ":" + b + " of blue paint to white paint. A batch uses " + given + " L of blue paint. How many litres of white paint does the batch use?",
      "A smoothie recipe uses berries and yogurt in the ratio " + a + ":" + b + ". A large batch uses " + given + " cups of berries. How many cups of yogurt does the large batch use?",
      "Trail mix has peanuts and raisins in the ratio " + a + ":" + b + ". A bag is made with " + given + " g of peanuts. How many grams of raisins are in the bag?"
    ];
    var prompt = pick(ctxs);
    var sol = "Each ratio part stands for the same scale amount: \\[ \\begin{aligned} \\text{scale} &= " + given + " \\div " + a + " = " + s + " \\\\ \\text{second amount} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] So the second amount is <b>" + ans + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "ratio-scale", a: a, b: b });
  }
  var pairs2 = [[3, 2], [5, 3], [4, 3], [7, 5], [3, 5], [5, 2]];
  var pr2 = pick(pairs2), a2 = pr2[0], b2 = pr2[1], s2 = ri(2, 8), tot = (a2 + b2) * s2, ans2 = a2 * s2;
  var ctxs2 = [
    "Two cousins share " + tot + " stickers in the ratio " + a2 + ":" + b2 + ", with the older cousin getting the first share. How many stickers does the older cousin get?",
    "A " + tot + " cm ribbon is cut into two pieces in the ratio " + a2 + ":" + b2 + ". How long is the first piece, in centimetres?",
    "A class fund of $" + tot + " is split between a field trip and supplies in the ratio " + a2 + ":" + b2 + ", with the field trip getting the first share. How many dollars go to the field trip?"
  ];
  var prompt2 = pick(ctxs2);
  var sol2 = "Add the ratio parts to find the value of one part, then take the first share: \\[ \\begin{aligned} \\text{one part} &= " + tot + " \\div " + (a2 + b2) + " = " + s2 + " \\\\ \\text{first share} &= " + a2 + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] So the first share is <b>" + ans2 + "</b>.";
  return numq(prompt2, ans2, 0.01, sol2, { mode: "ratio-share", a: a2, b: b2 });
}, ["Work out the value of one ratio part first; every part in the ratio has that same value.", "First find the scale or the value of one part from the amount you are given."]);

// 21. L2, 3.17: identify and describe a rate from a real-life example.
E("u5-identify-rate-example", 5, ["3.17"], 1, "gen", function () {
  var tmpls = [
    { s: "Maya rode {A} km in {B} h on a coastal trail and paid a $12 trail fee.", A: [12, 60], B: [2, 6], corr: function (A, B) { return A + " km in " + B + " h"; }, rev: function (A, B) { return B + " h in " + A + " km"; }, wrong: "12 dollars for the trail fee", wfb: "The fee is a single amount with no second amount to compare it with, so it is not the rate in this example." },
    { s: "A pump moved {A} L of water in {B} min while a crew of 6 workers watched.", A: [20, 90], B: [2, 9], corr: function (A, B) { return A + " L in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " L"; }, wrong: "6 workers on the crew", wfb: "The crew size is a single count with no comparison built in, so it is not the rate in this example." },
    { s: "Jonah earned ${A} for {B} h of yard work and bought a $9 snack afterward.", A: [30, 120], B: [2, 8], corr: function (A, B) { return "$" + A + " in " + B + " h"; }, rev: function (A, B) { return B + " h for $" + A; }, wrong: "$9 for the snack", wfb: "The snack price is a single amount, not a comparison of two amounts, so it is not the rate here." },
    { s: "A printer produced {A} pages in {B} min using 2 ink cartridges.", A: [30, 150], B: [2, 10], corr: function (A, B) { return A + " pages in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " pages"; }, wrong: "2 ink cartridges", wfb: "The cartridge count is a single count, not a comparison of two amounts, so it is not the rate here." }
  ];
  var t = pick(tmpls), A = ri(t.A[0], t.A[1]), B = ri(t.B[0], t.B[1]);
  var corr = t.corr(A, B);
  var cands = [
    { t: t.rev(A, B), fb: "That reverses the comparison; the amount earned, moved or produced is described over the time it took." },
    { t: t.wrong, fb: t.wfb },
    { t: A + " to " + B + " as a ratio of the same kind", fb: "The two amounts here have different units, so together they form a rate, not a same-kind ratio." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate is the pair of amounts with different units that go together in the example: \\[ \\begin{aligned} \\text{rate} &= \\text{two amounts measured in different units} \\end{aligned} \\] So the rate described is <b>" + corr + "</b>.";
  return mcq(t.s.replace("{A}", A).replace("{B}", B) + " Which pair of amounts gives the rate in this example?", { t: corr, fb: "Correct: those two amounts, with different units, are the ones compared in the example." }, ds, sol, { mode: "identify-rate", a: A, b: B });
}, ["A rate in an example is a pair of amounts with different units that belong together.", "First look for two amounts measured in different units that describe the same activity."]);

// 22. L2, 3.14, var: provide a context where a/b represents a rate.
E("u5-context-for-rate-ab", 5, ["3.14"], 1, "var", varset([
  function () {
    var sol = "A rate compares amounts in two different units: \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ as a rate links } 5 \\text{ cm with } 2 \\text{ weeks} \\end{aligned} \\] So the rate context is <b>a plant that grows 5 cm in 2 weeks</b>.";
    return mcq("In which context does \\(" + FR(5, 2) + "\\) represent a rate?", { t: "A plant grows 5 cm in 2 weeks.", fb: "Correct: centimetres and weeks are different units, so the comparison is a rate." }, [
      { t: "A shelf holds 5 board games for every 2 card games.", fb: "Both amounts count games, the same kind, so that comparison is a ratio." },
      { t: "Five of the 2 loaves baked were sold at noon.", fb: "A part cannot be 5 of 2 loaves this way; the numbers do not form a rate here." },
      { t: "Five friends share 2 pizzas at a party.", fb: "That is a sharing situation between people and pizzas at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-52" });
  },
  function () {
    var sol = "Distance compared with time is the classic rate pairing: \\[ \\begin{aligned} " + FR(90, 2) + " &\\text{ as a rate links } 90 \\text{ km with } 2 \\text{ h} \\end{aligned} \\] So the rate context is <b>a bus that travels 90 km in 2 h</b>.";
    return mcq("In which context does \\(" + FR(90, 2) + "\\) represent a rate?", { t: "A bus travels 90 km in 2 h.", fb: "Correct: kilometres and hours are different units, so the comparison is a rate." }, [
      { t: "A lot holds 90 cars for every 2 trucks.", fb: "Both amounts count vehicles, the same kind, so that comparison is a ratio." },
      { t: "Ninety of the 2 ferries were on time today.", fb: "A part cannot be 90 of 2 ferries this way; the numbers do not form a rate here." },
      { t: "Ninety students share 2 gyms for an assembly.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-902" });
  },
  function () {
    var sol = "Money earned compared with time worked forms a rate: \\[ \\begin{aligned} " + FR(36, 3) + " &\\text{ as a rate links } 36 \\text{ dollars with } 3 \\text{ h} \\end{aligned} \\] So the rate context is <b>a worker who earns $36 in 3 h</b>.";
    return mcq("In which context does \\(" + FR(36, 3) + "\\) represent a rate?", { t: "A worker earns $36 in 3 h of work.", fb: "Correct: dollars and hours are different units, so the comparison is a rate." }, [
      { t: "A shelf holds 36 novels for every 3 biographies.", fb: "Both amounts count books, the same kind, so that comparison is a ratio." },
      { t: "Thirty-six of the 3 shifts at a shop are day shifts.", fb: "A part cannot be 36 of 3 shifts this way; the numbers do not form a rate here." },
      { t: "Thirty-six campers share 3 tents on a trip.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-363" });
  },
  function () {
    var sol = "Volume compared with time forms a rate for flowing water: \\[ \\begin{aligned} " + FR(48, 4) + " &\\text{ as a rate links } 48 \\text{ L with } 4 \\text{ min} \\end{aligned} \\] So the rate context is <b>a hose that delivers 48 L in 4 min</b>.";
    return mcq("In which context does \\(" + FR(48, 4) + "\\) represent a rate?", { t: "A hose delivers 48 L of water in 4 min.", fb: "Correct: litres and minutes are different units, so the comparison is a rate." }, [
      { t: "A tank farm holds 48 large tanks for every 4 small tanks.", fb: "Both amounts count tanks, the same kind, so that comparison is a ratio." },
      { t: "Forty-eight of the 4 valves on a pipe are open.", fb: "A part cannot be 48 of 4 valves this way; the numbers do not form a rate here." },
      { t: "Forty-eight swimmers share 4 lanes at a pool.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-484" });
  },
  function () {
    var sol = "Pages compared with time forms a rate for reading speed: \\[ \\begin{aligned} " + FR(15, 5) + " &\\text{ as a rate links } 15 \\text{ pages with } 5 \\text{ min} \\end{aligned} \\] So the rate context is <b>a student who reads 15 pages in 5 min</b>.";
    return mcq("In which context does \\(" + FR(15, 5) + "\\) represent a rate?", { t: "A student reads 15 pages in 5 min.", fb: "Correct: pages and minutes are different units, so the comparison is a rate." }, [
      { t: "A display holds 15 hardcover books for every 5 paperback books.", fb: "Both amounts count books, the same kind, so that comparison is a ratio." },
      { t: "Fifteen of the 5 chapters assigned were finished.", fb: "A part cannot be 15 of 5 chapters this way; the numbers do not form a rate here." },
      { t: "Fifteen readers share 5 copies of a novel.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-155" });
  }
]), ["A rate context pairs two different units; a ratio context pairs amounts of the same kind.", "First check the units on the two numbers: different units points to a rate."]);

// 23. L2, 3.18, var: explain why a rate cannot be represented as a percent.
E("u5-why-rate-not-percent", 5, ["3.18"], 1, "var", varset([
  function () {
    var sol = "A percent compares a part with a whole measured the same way, while a rate keeps two different units: \\[ \\begin{aligned} 60 \\text{ km/h} &\\text{ compares km with h} \\end{aligned} \\] So the reason is that <b>a rate compares two different units, and a percent compares a part with a whole of the same kind</b>.";
    return mcq("A speed is recorded as 60 km/h. Why can this rate not be written as a percent?", { t: "It compares two different units, kilometres and hours, while a percent compares a part with a whole of the same kind.", fb: "Correct: the two quantities have different units, so there is no single whole to take a percent of." }, [
      { t: "The number 60 is too large to be a percent, because a percent can never go above the number 100 in any situation.", fb: "Percents can be any size, including over 100%; the size of the number is not the issue." },
      { t: "A percent must always be written as a fraction first, before it can be used, and a rate is never written that way.", fb: "Writing form is not the issue; percents and rates compare different kinds of quantities." },
      { t: "Speeds are measured with instruments such as speedometers, and percents are not measured with any instrument at all.", fb: "How a value is measured does not decide its type; the units being compared decide it." }
    ], sol, { mode: "why-speed" });
  },
  function () {
    var sol = "Litres and kilometres are different measures, even though 100 appears in the rate: \\[ \\begin{aligned} 8 \\text{ L}/100 \\text{ km} &\\text{ compares L with km} \\end{aligned} \\] So it is not 8%, because <b>the 100 in the rate counts kilometres, not a whole measured in litres</b>.";
    return mcq("A car uses fuel at 8 L/100 km. Why is this rate not the same as 8%?", { t: "The rate compares litres with kilometres, two different units, while a percent compares a part with a whole of the same kind.", fb: "Correct: the 100 belongs to the kilometres, so the rate is not a part out of 100 of one whole." }, [
      { t: "Fuel use is always larger than 8% in real cars that drive on highways, so a small rate like this cannot be read as a percent.", fb: "The size of real fuel use values is not the point; the units being compared decide the type." },
      { t: "A percent can never contain the number 100 in it, and this rate has 100 right in the middle of it, so it cannot be one.", fb: "Percents are built on 100; the issue is what the 100 measures in this rate." },
      { t: "Rates written with a slash can always be renamed as percents, whatever the two quantities in the rate happen to be.", fb: "A slash alone does not make a percent; the two sides must measure the same kind of whole." }
    ], sol, { mode: "why-fuel" });
  },
  function () {
    var sol = "Dollars and hours measure different things, so no single whole exists for a percent: \\[ \\begin{aligned} 15 \\text{ dollars/h} &\\text{ compares dollars with hours} \\end{aligned} \\] So the reason is that <b>a percent needs a part and a whole in the same unit, and this rate has two different units</b>.";
    return mcq("A wage is recorded as $15/h. Why can this rate not be written as a percent?", { t: "It compares dollars with hours, two different units, while a percent compares a part with a whole measured the same way.", fb: "Correct: pay and time are different measures, so the wage is a rate, not a share of one whole." }, [
      { t: "Wages are paid in money, and percents cannot involve money at all, so an amount paid for work can never be a percent.", fb: "Percents often involve money, such as tax on a price; the unit pairing is the issue here." },
      { t: "The value 15 is a whole number, and percents must always be decimals with a decimal point in them to be percents.", fb: "Percents can be whole numbers; the form of the number is not the issue." },
      { t: "An hourly wage stays the same every week, and percents must change from week to week to count as percents at all.", fb: "Whether a value changes has nothing to do with whether it is a percent." }
    ], sol, { mode: "why-wage" });
  },
  function () {
    var sol = "Beats and minutes are different units, so the count per minute is a rate: \\[ \\begin{aligned} 72 \\text{ beats/min} &\\text{ compares beats with minutes} \\end{aligned} \\] So the reason is that <b>a rate links two different units, and a percent is a share of one whole in a single unit</b>.";
    return mcq("A resting heart rate is 72 beats/min. Why can this rate not be written as a percent?", { t: "It compares beats with minutes, two different units, while a percent is a part out of 100 of one whole.", fb: "Correct: there is no single whole measured in beats that the rate is a share of." }, [
      { t: "Heart rates are about health, and percents are only for school subjects like mathematics.", fb: "Percents are used in health contexts too; the units being compared decide the type." },
      { t: "The number 72 has no decimal part, and percents always need a decimal part after the whole number to be percents.", fb: "Percents can be whole numbers; the form of the number is not the issue." },
      { t: "A percent must describe something that lasts exactly one minute at a time, never anything that is counted per minute.", fb: "Percents have no time requirement; the issue is the two different units in the rate." }
    ], sol, { mode: "why-heart" });
  },
  function () {
    var sol = "A price per kilogram links money with mass, two different measures: \\[ \\begin{aligned} 4 \\text{ dollars/kg} &\\text{ compares dollars with kilograms} \\end{aligned} \\] So the reason is that <b>the rate compares two different units, and a percent compares a part with a whole of the same kind</b>.";
    return mcq("Cheese is priced at $4/kg. Why can this rate not be written as a percent?", { t: "It compares dollars with kilograms, two different units, while a percent compares a part with a whole of the same kind.", fb: "Correct: money and mass are different measures, so the price is a rate, not a share of a whole." }, [
      { t: "Prices per kilogram are always less than 100, and percents are always numbers that are bigger than that in shops.", fb: "Percents can be under 100, equal to 100, or over 100; size is not the issue." },
      { t: "A percent cannot be used in a grocery store for any price, because percents belong only in mathematics classrooms.", fb: "Percents are used in stores for discounts and tax; the unit pairing is the issue here." },
      { t: "The rate uses a slash symbol between its two numbers, and percents never use any symbols in the way they are written.", fb: "Percents use the % symbol; the symbol used is not what decides the type." }
    ], sol, { mode: "why-cheese" });
  }
]), ["Compare what each idea links: a percent links a part to a whole of the same kind, a rate links two different units.", "First list the two units in the rate, then ask whether a percent could compare those same two things."]);

// 24. L2, 6.29, CR 2: solve a rate problem.
E("u5-rate-problem-solve", 5, ["6.29"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Find the unit rate first, then use it for the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars per hour} \\\\ \\text{new earnings} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] So the earnings are <b>$" + ans + "</b>.";
    return numq("Sam earned $" + earned + " for " + h1 + " h of work at a steady rate. At the same rate, how much will Sam earn for " + h2 + " h of work, in dollars?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "The speed is the unit rate, and time is distance divided by that rate: \\[ \\begin{aligned} \\text{time} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] So the trip takes <b>" + ansT + " h</b>.";
    return numq("A bus travels at a steady speed. It covers " + dist1 + " km in " + t1 + " h. At the same speed, how many hours will it take to travel " + D + " km?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Find the flow per minute first, then multiply by the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L per min} \\\\ \\text{new volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] So the volume is <b>" + ans3 + " L</b>.";
  return numq("A hose delivers " + vol + " L of water in " + m1 + " min at a steady rate. At the same rate, how many litres will it deliver in " + m2 + " min?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Every rate problem starts from the unit rate: the amount for one unit of the second quantity.", "First divide to get the amount per single hour, kilometre or minute in the problem."]);

// 25. L3, 6.1, CR 3: percent increase or decrease.
E("u5-percent-change", 5, ["6.1"], 3, "gen", function () {
  var inc = Math.random() < 0.5;
  var c = inc ? pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100]) : pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
  var O = pick([40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 500]);
  var N = O * (inc ? 1 + c / 100 : 1 - c / 100);
  var ctxs = inc ? [
    "School enrolment rose from " + O + " students one year to " + fmt(N, 0) + " students the next year. What is the percent increase in enrolment?",
    "A player's scoring total rose from " + O + " points last season to " + fmt(N, 0) + " points this season. What is the percent increase in the scoring total?",
    "A town trail network grew from " + O + " km of trails to " + fmt(N, 0) + " km of trails. What is the percent increase in trail length?"
  ] : [
    "A jacket price dropped from $" + O + " to $" + fmt(N, 0) + ". What is the percent decrease in the price?",
    "A pond water level count fell from " + O + " cm of depth in spring to " + fmt(N, 0) + " cm in late summer. What is the percent decrease in depth?",
    "A team bus fuel use fell from " + O + " L on one trip to " + fmt(N, 0) + " L on the same trip a year later. What is the percent decrease in fuel use?"
  ];
  var prompt = pick(ctxs), diff = Math.abs(N - O);
  var sol = "Percent change compares the change with the starting amount: \\[ \\begin{aligned} \\text{change} &= " + fmt(diff, 0) + " \\\\ \\text{percent change} &= " + FR(fmt(diff, 0), O) + " \\times 100 = " + c + "\\% \\end{aligned} \\] So the percent " + (inc ? "increase" : "decrease") + " is <b>" + c + "%</b>.";
  return numq(prompt + " Give the percent as a number.", c, 0.01, sol, { mode: inc ? "pct-inc" : "pct-dec", c: c, o: O });
}, ["Percent change always uses the starting amount as the whole, not the ending amount.", "First find the size of the change, then divide it by the starting amount."]);

// 26. L3, 6.2: successive percents, choose the final price.
E("u5-successive-percents", 5, ["6.2"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var P = pick([100, 150, 200, 300, 350, 400]), d1 = pick([10, 20, 25, 30]), d2 = pick([10, 20, 25].filter(function (x) { return x !== d1; }));
    var fin = u5r2(P * (1 - d1 / 100) * (1 - d2 / 100));
    var cands = [
      { t: "$" + fmtF(u5r2(P * (1 - (d1 + d2) / 100)), 2), fb: "That adds the two discounts into one; the second discount acts on the already reduced price, not the full price." },
      { t: "$" + fmtF(u5r2(P * (1 - d1 / 100)), 2), fb: "That applies only the first discount; the second discount still has to come off that price." },
      { t: "$" + fmtF(u5r2(P * (1 - d2 / 100)), 2), fb: "That applies only the second discount; the first discount comes off before it." }
    ];
    var ds = u5pick3("$" + fmtF(fin, 2), cands);
    var mid = u5r2(P * (1 - d1 / 100));
    var sol = "Each discount acts on the price left by the step before it: \\[ \\begin{aligned} \\text{after first discount} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d1 / 100, 2) + " = " + fmtF(mid, 2) + " \\\\ \\text{final price} &= " + fmtF(mid, 2) + " \\times " + fmt(1 - d2 / 100, 2) + " = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
    return mcq("A bike is priced at $" + fmtF(P, 2) + ". It is first discounted by " + d1 + "%, and then the sale price is discounted by another " + d2 + "% at checkout. What is the final price?", { t: "$" + fmtF(fin, 2), fb: "Correct: the second discount is taken off the reduced price, step by step." }, ds, sol, { mode: "two-discounts", p: P, d1: d1, d2: d2 });
  }
  var P2 = pick([100, 150, 200, 250, 300, 400]), r = pick([10, 15, 20, 25, 30]);
  var fin2 = u5r2(P2 * (1 - r / 100) * (1 + r / 100));
  var cands2 = [
    { t: "$" + fmtF(P2, 2), fb: "Equal percents do not cancel here; the tax is charged on the smaller sale price, so the result is under the full price." },
    { t: "$" + fmtF(u5r2(P2 * (1 - r / 100)), 2), fb: "That is the sale price only; the tax still has to be added to it." },
    { t: "$" + fmtF(u5r2(P2 * (1 + r / 100)), 2), fb: "That taxes the full price and skips the discount; the discount comes first." }
  ];
  var ds2 = u5pick3("$" + fmtF(fin2, 2), cands2);
  var mid2 = u5r2(P2 * (1 - r / 100));
  var sol2 = "The tax percent acts on the sale price, which is smaller than the full price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P2, 2) + " \\times " + fmt(1 - r / 100, 2) + " = " + fmtF(mid2, 2) + " \\\\ \\text{final price} &= " + fmtF(mid2, 2) + " \\times " + fmt(1 + r / 100, 2) + " = " + fmtF(fin2, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin2, 2) + "</b>, not the full price.";
  return mcq("A coat is priced at $" + fmtF(P2, 2) + ". It is discounted by " + r + "%, and then tax of " + r + "% is added to the sale price. What is the final price?", { t: "$" + fmtF(fin2, 2), fb: "Correct: the tax is added to the reduced price, so it adds less than the discount took off." }, ds2, sol2, { mode: "discount-tax-equal", p: P2, r: r });
}, ["Successive percents never act on the same starting amount; each one acts on the amount left by the step before.", "First work out the amount after the first percent change, and use that as the new starting amount."]);

// 27. L3, 6.3, CR 2: percent of a percent applied to a quantity.
E("u5-percent-of-percent-quantity", 5, ["6.3"], 3, "gen", function () {
  var T = 800, A = 50, B = 40, att = 0;
  do {
    T = pick([200, 400, 500, 600, 800, 1000, 1200, 2000]); A = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); B = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); att++;
  } while ((T * A) % 100 !== 0 || ((T * A / 100) * B) % 100 !== 0);
  var mid = T * A / 100, ans = mid * B / 100;
  var ctxs = [
    { q: "A school has " + T + " students. " + A + "% of the students joined a lunch club. Of those club members, " + B + "% signed up for the cooking session. How many students signed up for the cooking session?", unit: "students" },
    { q: "A community library holds " + T + " books. " + A + "% of the books are in the youth section. Of those youth books, " + B + "% are graphic novels. How many graphic novels does the library hold?", unit: "graphic novels" },
    { q: "A tournament drew " + T + " spectators. " + A + "% of the spectators bought a program. Of those buyers, " + B + "% also bought a raffle ticket. How many spectators bought both a program and a raffle ticket?", unit: "spectators" }
  ];
  var cx = pick(ctxs);
  var sol = "Narrow the group down twice, one percent at a time: \\[ \\begin{aligned} \\text{after first percent} &= " + fmt(A / 100, 2) + " \\times " + T + " = " + mid + " \\\\ \\text{final count} &= " + fmt(B / 100, 2) + " \\times " + mid + " = " + ans + " \\end{aligned} \\] So the answer is <b>" + ans + " " + cx.unit + "</b>.";
  return numq(cx.q, ans, 0.01, sol, { mode: "pct-pct-quantity", t: T, a: A, b: B });
}, ["Take the percents one stage at a time; the second percent acts only on the group left by the first.", "First find how many are in the group after the first percent is applied."]);

// 28. L3, 6.28: advanced ratio problem.
E("u5-ratio-problem-advanced", 5, ["6.28"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var trip = pick([[2, 3, 4], [3, 2, 5], [4, 3, 2], [5, 3, 2], [2, 5, 3], [3, 4, 5]]);
    var a = trip[0], b = trip[1], c = trip[2], s = ri(3, 12), tot = (a + b + c) * s, ans = b * s;
    var sol = "Add all three parts to get the value of one part, then take the middle share: \\[ \\begin{aligned} \\text{one part} &= " + tot + " \\div " + (a + b + c) + " = " + s + " \\\\ \\text{middle share} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] So the middle share is <b>" + ans + "</b>.";
    return numq("Prize tokens are shared among three players in the ratio " + a + ":" + b + ":" + c + ". There are " + tot + " tokens in total. How many tokens does the second player get?", ans, 0.01, sol, { mode: "ratio-three-total", a: a, b: b, c: c });
  }
  if (mode === 1) {
    var pr = pick([[5, 3], [7, 4], [9, 5], [8, 3], [7, 2], [5, 2]]);
    var a2 = pr[0], b2 = pr[1], s2 = ri(2, 9), diff = (a2 - b2) * s2, ans2 = (a2 + b2) * s2;
    var sol2 = "The difference in parts gives the value of one part: \\[ \\begin{aligned} \\text{one part} &= " + diff + " \\div " + (a2 - b2) + " = " + s2 + " \\\\ \\text{total} &= " + (a2 + b2) + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] So the total length is <b>" + ans2 + " cm</b>.";
    return numq("A board is cut into two pieces in the ratio " + a2 + ":" + b2 + ". The longer piece is " + diff + " cm longer than the shorter piece. What is the total length of the board, in centimetres?", ans2, 0.01, sol2, { mode: "ratio-difference", a: a2, b: b2 });
  }
  var pr3 = pick([[2, 3], [3, 5], [4, 7], [5, 4], [3, 7], [2, 5]]);
  var a3 = pr3[0], b3 = pr3[1], s3 = ri(3, 11), given = a3 * s3, ans3 = b3 * s3;
  var sol3 = "Equivalent ratios keep the same scale on both terms: \\[ \\begin{aligned} \\text{scale} &= " + given + " \\div " + a3 + " = " + s3 + " \\\\ \\text{missing term} &= " + b3 + " \\times " + s3 + " = " + ans3 + " \\end{aligned} \\] So the missing term is <b>" + ans3 + "</b>.";
  return numq("Two mixes follow the same ratio " + a3 + ":" + b3 + " of sand to cement. The second mix uses " + given + " scoops of sand. How many scoops of cement does the second mix use?", ans3, 0.01, sol3, { mode: "ratio-equivalent", a: a3, b: b3 });
}, ["Translate the extra information, a total, a difference or a known term, into the value of one ratio part.", "First decide which combination of the ratio parts matches the amount given in the problem."]);

// 29. L3, 6.29: compare unit rates, better buy.
E("u5-better-buy", 5, ["6.29"], 3, "gen", function () {
  var items = [
    { thing: "granola bars", unit: "bar" }, { thing: "juice boxes", unit: "box" }, { thing: "pencils", unit: "pencil" },
    { thing: "muffins", unit: "muffin" }, { thing: "stickers", unit: "sticker" }, { thing: "tennis balls", unit: "ball" }
  ];
  var it = pick(items);
  var c1 = ri(4, 12), c2 = ri(4, 16); if (c2 === c1) c2 += 4;
  var u1 = ri(40, 120), u2 = u1 + pick([-25, -20, -15, -10, 10, 15, 20, 25]); if (u2 < 25) u2 = u1 + 20;
  var p1 = c1 * u1 / 100, p2 = c2 * u2 / 100;
  var aBetter = u1 < u2;
  var corr = aBetter ? "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit : "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit;
  var other = aBetter ? "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit : "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit;
  var cands = [
    { t: other, fb: "That pack costs more for each " + it.unit + "; compare the price for one item, not the pack price alone." },
    { t: "Both packs cost the same for each " + it.unit + ".", fb: "The unit prices are different; divide each pack price by its count to see the gap." },
    { t: "The packs cannot be compared, since counts differ.", fb: "Different counts are exactly why unit rates are used; the price for one item can always be compared." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compare the price for a single item in each pack: \\[ \\begin{aligned} \\text{Pack A} &= " + fmtF(p1, 2) + " \\div " + c1 + " = " + fmtF(u1 / 100, 2) + " \\text{ per " + it.unit + "} \\\\ \\text{Pack B} &= " + fmtF(p2, 2) + " \\div " + c2 + " = " + fmtF(u2 / 100, 2) + " \\text{ per " + it.unit + "} \\end{aligned} \\] The lower unit price wins, so the better buy is <b>" + corr + "</b>.";
  return mcq("Pack A holds " + c1 + " " + it.thing + " and costs $" + fmtF(p1, 2) + ". Pack B holds " + c2 + " " + it.thing + " and costs $" + fmtF(p2, 2) + ". Which pack is the better buy?", { t: corr, fb: "Correct: that pack has the lower price for each single item." }, ds, sol, { mode: "better-buy", c1: c1, c2: c2 });
}, ["Pack prices cannot be compared directly when the packs hold different counts; compare one item at a time.", "First divide each pack price by the number of items in that pack."]);

// 30. L3, 3.5 and 3.7: order values given in percent, fraction and decimal form.
E("u5-mixed-forms-order", 5, ["3.5", "3.7"], 3, "gen", function () {
  var vals = [
    { v: 0.1, fr: [1, 10] }, { v: 0.2, fr: [1, 5] }, { v: 0.25, fr: [1, 4] }, { v: 0.4, fr: [2, 5] },
    { v: 0.5, fr: [1, 2] }, { v: 0.6, fr: [3, 5] }, { v: 0.75, fr: [3, 4] }, { v: 0.8, fr: [4, 5] },
    { v: 0.9, fr: [9, 10] }, { v: 1.2, fr: [6, 5] }, { v: 1.25, fr: [5, 4] }, { v: 1.5, fr: [3, 2] },
    { v: 1.75, fr: [7, 4] }, { v: 2.5, fr: [5, 2] }, { v: 0.35, fr: [7, 20] }, { v: 0.65, fr: [13, 20] }
  ];
  var trio = shuffle(vals).slice(0, 3);
  var forms = shuffle(["pct", "frac", "dec"]);
  function disp(item, form) {
    if (form === "pct") return fmt(item.v * 100, 0) + "%";
    if (form === "frac") return "\\(" + FR(item.fr[0], item.fr[1]) + "\\)";
    return fmt(item.v, 2);
  }
  var labelled = trio.map(function (item, i) { return { v: item.v, s: disp(item, forms[i]) }; });
  var sorted = labelled.slice().sort(function (x, y) { return x.v - y.v; });
  function listOf(arr) { return arr.map(function (x) { return x.s; }).join(", "); }
  var corr = listOf(sorted);
  var rev = sorted.slice().reverse();
  var swapA = sorted.slice(); var tmp = swapA[0]; swapA[0] = swapA[1]; swapA[1] = tmp;
  var swapB = sorted.slice(); var tmp2 = swapB[1]; swapB[1] = swapB[2]; swapB[2] = tmp2;
  var cands = [
    { t: listOf(rev), fb: "That lists the values from greatest to least instead of least to greatest." },
    { t: listOf(swapA), fb: "The first two values are swapped; convert all three to decimals and compare again." },
    { t: listOf(swapB), fb: "The last two values are swapped; convert all three to decimals and compare again." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Convert every value to a decimal before ordering: \\[ \\begin{aligned} " + sorted.map(function (x) { return fmt(x.v, 2); }).join(" &< ") + " \\end{aligned} \\] So the order from least to greatest is <b>" + corr + "</b>.";
  return mcq("Which list orders the values from least to greatest? The values are " + listOf(labelled) + ".", { t: corr, fb: "Correct: after conversion to decimals, the values rise steadily in that order." }, ds, sol, { mode: "mixed-order", vals: sorted.map(function (x) { return x.v; }).join(",") });
}, ["Values in different forms cannot be compared until they share one form.", "First convert the percent and the fraction into decimals, then sort all three decimals."]);
