// Math 2202 Unit 4 Interpreting Graphs question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 1894 to 2437).
// CRMARKS: u4-cr-histogram-total=2
// CRMARKS: u4-cr-read-compare=2
// CRMARKS: u4-cr-extrapolate=2
// CRMARKS: u4-cr-bar-total=3
// CRMARKS: u4-cr-histogram-range=3
// CRMARKS: u4-cr-interpolate=3
// CRMARKS: u4-cr-predict-trend=2
// CRMARKS: u4-cr-percent-change=3
/* ===== Unit 4 ===== */
/* Unit 4: Interpreting Graphs (indicators 6.1 to 6.7). Figure helpers prefixed u4. */
function u4X(i, n) { return 58 + i * (258 / Math.max(n - 1, 1)); }
function u4Y(v, yMax) { return 186 - (v / yMax) * 148; }
function u4Frame(yMax, yTitle, xTitle) {
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [0, yMax / 2, yMax];
  for (var i = 0; i < ticks.length; i++) {
    var y = u4Y(ticks[i], yMax);
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  return s;
}
function u4LineFig(labels, vals, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), pts = "";
  for (var i = 0; i < vals.length; i++) {
    var x = u4X(i, vals.length), y = u4Y(vals[i], yMax);
    pts += fmt(x, 1) + "," + fmt(y, 1) + " ";
    s += "";
  }
  s += '<polyline points="' + pts + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2.5"/>';
  for (var j = 0; j < vals.length; j++) {
    var x2 = u4X(j, vals.length), y2 = u4Y(vals[j], yMax);
    s += '<circle cx="' + fmt(x2, 1) + '" cy="' + fmt(y2, 1) + '" r="4" fill="' + FIG_INK + '"/>';
    s += _txt(x2, 202, labels[j], 11, false);
  }
  return s + "</svg>";
}
function u4BarFig(labels, vals, yMax, yTitle, xTitle, base) {
  base = base || 0;
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [base, base + (yMax - base) / 2, yMax], i, y;
  for (i = 0; i < ticks.length; i++) {
    y = 186 - ((ticks[i] - base) / (yMax - base)) * 148;
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  var bw = 258 / vals.length;
  for (i = 0; i < vals.length; i++) {
    var bx = 58 + i * bw + bw * 0.18, bwid = bw * 0.64;
    var by = 186 - ((vals[i] - base) / (yMax - base)) * 148;
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bwid, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bwid / 2, 202, labels[i], 11, false);
  }
  return s + "</svg>";
}
function u4HistFig(labels, freqs, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), bw = 264 / freqs.length;
  for (var i = 0; i < freqs.length; i++) {
    var bx = 52 + i * bw, by = u4Y(freqs[i], yMax);
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bw / 2, 202, labels[i], 10, false);
  }
  return s + "</svg>";
}
function u4ScatterFig(pts, xMax, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle);
  var xt = [0, xMax / 2, xMax];
  for (var i = 0; i < xt.length; i++) {
    var x = 52 + (xt[i] / xMax) * 270;
    s += _txt(x, 202, fmt(xt[i]), 11, false);
    s += '<line x1="' + fmt(x, 1) + '" y1="186" x2="' + fmt(x, 1) + '" y2="182" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  }
  for (var j = 0; j < pts.length; j++) {
    var px = 52 + (pts[j][0] / xMax) * 270, py = u4Y(pts[j][1], yMax);
    s += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="4" fill="' + FIG_ALT + '"/>';
  }
  return s + "</svg>";
}
function u4NiceMax(v) { var m = Math.ceil(v * 1.25); return Math.max(10, Math.ceil(m / 10) * 10); }
function u4Distractors(ans, pool) {
  var out = [], seen = { }, c = 0;
  seen[String(ans)] = 1;
  while (out.length < 3 && c < 60) {
    c++;
    var d = pick(pool);
    if (d > 0 && !seen[String(d)]) { seen[String(d)] = 1; out.push(d); }
  }
  var f = ans + 3;
  while (out.length < 3) { if (!seen[String(f)]) { seen[String(f)] = 1; out.push(f); } f++; }
  return out;
}

E("u4-choose-graph", 4, ["6.1"], 1, "var", varset([
  function () {
    return mcq("A cafeteria manager records the number of each lunch item sold on Monday: sandwiches, soup, salads and wraps. She wants to compare the four items side by side. Which graph suits this best?",
      { t: "Bar graph", fb: "Yes: separate bars compare separate categories clearly." },
      [{ t: "Line graph", fb: "A line graph shows change over time, and these items are not a time order." },
       { t: "Histogram", fb: "A histogram groups measured values into intervals, not named menu items." },
       { t: "Scatter plot", fb: "A scatter plot shows a relationship between two measured variables." }],
      "The data are counts in separate categories, so bars that can be compared side by side fit best. The answer is <b>Bar graph</b>.", {});
  },
  function () {
    return mcq("A lifeguard records the air temperature every hour from 9 AM to 5 PM to show parents how the day warmed up. Which graph suits this best?",
      { t: "Line graph", fb: "Yes: points joined in time order show how temperature changed." },
      [{ t: "Bar graph", fb: "Bars compare categories; here the point is change over time." },
       { t: "Circle graph", fb: "A circle graph shows parts of one whole, not change over hours." },
       { t: "Pictograph", fb: "A pictograph uses picture symbols for counts and hides the hourly pattern." }],
      "The values are ordered in time and the goal is to show change, so a line graph fits best. The answer is <b>Line graph</b>.", {});
  },
  function () {
    return mcq("A student council president wants to show what share of a $600 fundraiser came from each of four activities. Which graph suits this best?",
      { t: "Circle graph", fb: "Yes: slices show each part as a share of the whole $600." },
      [{ t: "Line graph", fb: "A line graph shows change over time, not shares of a total." },
       { t: "Histogram", fb: "A histogram groups measured values into intervals." },
       { t: "Scatter plot", fb: "A scatter plot compares two measured variables, not parts of a whole." }],
      "The message is parts of one whole total, so a circle graph fits best. The answer is <b>Circle graph</b>.", {});
  },
  function () {
    return mcq("A gym coach measures the resting heart rates of 40 members and groups them as 50 to 59, 60 to 69, 70 to 79 and 80 to 89 beats per minute. Which graph suits this best?",
      { t: "Histogram", fb: "Yes: a histogram shows how many values fall in each interval." },
      [{ t: "Bar graph", fb: "Bar graphs use separate named categories; these are intervals of a measurement." },
       { t: "Circle graph", fb: "A circle graph shows shares of a whole, not a spread of measurements." },
       { t: "Line graph", fb: "A line graph shows change over time; heart rates here are not ordered in time." }],
      "Measured values grouped into equal intervals are shown with a histogram. The answer is <b>Histogram</b>.", {});
  },
  function () {
    return mcq("A driving instructor records, for each of 12 learners, the hours of practice and the score on a road test. She wants to see if more practice goes with higher scores. Which graph suits this best?",
      { t: "Scatter plot", fb: "Yes: each learner is one point, so the pattern between the two measures shows." },
      [{ t: "Bar graph", fb: "Bars compare categories; both measures here are numbers per learner." },
       { t: "Circle graph", fb: "A circle graph shows parts of a whole, not a relationship." },
       { t: "Histogram", fb: "A histogram shows one measurement grouped into intervals, not two linked measures." }],
      "Two number measures recorded for the same learners call for a scatter plot. The answer is <b>Scatter plot</b>.", {});
  },
  function () {
    return mcq("A teacher wants one clear disadvantage of using a circle graph for the daily high temperatures of a whole month. Which statement gives it?",
      { t: "A circle graph cannot show how values change from day to day", fb: "Yes: slices have no time order, so the daily pattern is lost." },
      [{ t: "A circle graph uses too many colours to print clearly in a book", fb: "Colour is a design choice, not a limit of the graph type itself." },
       { t: "A circle graph can only hold four values at a time, no more", fb: "A circle graph can hold more parts; the issue is change over time." },
       { t: "A circle graph always starts its scale at a wrong value every time", fb: "Circle graphs have slices, not a scale that can start wrongly." }],
      "Daily temperatures are a time sequence, and a circle graph shows parts of a whole with no time order. The answer is <b>A circle graph cannot show how values change from day to day</b>.", {});
  }
]), ["Match the graph to the job: categories, change over time, parts of a whole, intervals, or two linked measures.", "Ask what the reader should see first, then pick the graph built for that job."]);

E("u4-histogram-read", 4, ["6.2"], 1, "gen", function () {
  var ctxs = [
    { item: "members at a gym in Clarenville", unit: "minutes of exercise per visit", w: 10 },
    { item: "students at a school in Corner Brook", unit: "pages read in one evening", w: 5 },
    { item: "shoppers at a market in Gander", unit: "dollars spent on groceries", w: 10 },
    { item: "workers at a plant in Labrador City", unit: "minutes for the drive to work", w: 5 }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(2, 13)); }
  var k = ri(0, 4), ans = freqs[k];
  var pool = [ans + 1, ans - 1, ans + 2, freqs[(k + 1) % 5], freqs[(k + 4) % 5], ans + 4];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " does not match the height of the " + labels[k] + " bar: read that bar against the frequency scale." }; });
  var q = mcq("A histogram shows " + c.unit + " for " + c.item + ". How many are in the " + labels[k] + " interval?",
    { t: String(ans), fb: "Yes: the bar for " + labels[k] + " reaches " + ans + " on the frequency axis." }, ds,
    "Find the bar labelled " + labels[k] + " and read its height on the frequency axis. It reaches " + ans + ". The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["Find the interval named in the question along the horizontal axis first.", "Follow the top of that bar across to the frequency scale and read the value."]);

E("u4-trend-basic", 4, ["6.4"], 1, "gen", function () {
  var ctxs = [
    { thing: "Daily visitors to a ski hill in Marble Mountain", x: "Day", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    { thing: "Water level in a rain barrel in St. John's, in cm", x: "Week", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"] },
    { thing: "Fuel left in a tour boat tank in Twillingate, in litres", x: "Hour", labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"] },
    { thing: "Tickets sold each day for a theatre show in Grand Falls-Windsor", x: "Day", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] }
  ];
  var c = pick(ctxs), mode = pick(["up", "down", "flat"]), vals = [], i, start = ri(15, 45), step = ri(2, 7);
  for (i = 0; i < 5; i++) vals.push(mode === "up" ? start + step * i : mode === "down" ? start + step * 4 - step * i : start);
  var correct = mode === "up" ? "It rises steadily across the whole period" : mode === "down" ? "It falls steadily across the whole period" : "It stays about the same across the whole period";
  var opts = ["It rises steadily across the whole period", "It falls steadily across the whole period", "It stays about the same across the whole period", "It rises, then falls back to its starting value"].filter(function (t) { return t !== correct; }).map(function (t) {
    return { t: t, fb: "Compare the first and last points and the direction between them: that pattern does not match this graph." };
  });
  var q = mcq(c.thing + " is graphed over time. Which sentence describes the trend?",
    { t: correct, fb: "Yes: the points move in that one direction (or stay level) from start to finish." }, opts,
    "The first value is " + vals[0] + " and the last value is " + vals[4] + ", and every step between them moves the same way. The answer is <b>" + correct + "</b>.",
    { mode: mode, start: start, step: step });
  q.figure = u4LineFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), "Value", c.x);
  return q;
}, ["Compare the first point with the last point, then check the direction in between.", "Decide whether the line climbs, drops, or stays level as you read left to right."]);

E("u4-read-value", 4, ["6.3"], 1, "gen", function () {
  var ctxs = [
    { thing: "concession sales at a rink in Mount Pearl", unit: "hot dogs sold", labels: ["Fri", "Sat", "Sun", "Mon"] },
    { thing: "a bakery in Bonavista", unit: "loaves sold", labels: ["Tue", "Wed", "Thu", "Fri"] },
    { thing: "a bike shop in St. John's", unit: "bikes serviced", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    { thing: "a ferry terminal in Port aux Basques", unit: "vehicles boarded", labels: ["6 AM", "9 AM", "12 PM", "3 PM"] }
  ];
  var c = pick(ctxs), vals = [], i;
  for (i = 0; i < 4; i++) vals.push(ri(3, 18) * 5);
  var k = ri(0, 3), ans = vals[k];
  var pool = [ans + 5, ans - 5, ans + 10, vals[(k + 1) % 4], vals[(k + 3) % 4]];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " is a reading from a different bar or a scale slip: check the " + c.labels[k] + " bar again." }; });
  var q = mcq("The bar graph shows " + c.unit + " for " + c.thing + ". How many were recorded for " + c.labels[k] + "?",
    { t: String(ans), fb: "Yes: the top of the " + c.labels[k] + " bar lines up with " + ans + "." }, ds,
    "Read the height of the " + c.labels[k] + " bar against the scale. It reaches " + ans + ". The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4BarFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Find the category named in the question along the bottom first.", "Follow the top of its bar across to the scale and read the value."]);

E("u4-histogram-combine", 4, ["6.2"], 2, "gen", function () {
  var ctxs = [
    { unit: "minutes waited for a bus in St. John's", w: 5, who: "riders" },
    { unit: "centimetres of snow in one storm, by town", w: 4, who: "towns" },
    { unit: "dollars spent at a craft fair in Trinity", w: 10, who: "shoppers" },
    { unit: "laps swum at a pool in Carbonear", w: 5, who: "swimmers" }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(3, 14)); }
  var k = ri(0, 3), ans = freqs[k] + freqs[k + 1];
  var pool = [freqs[k], freqs[k + 1], ans + freqs[(k + 2) % 5], ans + 2, ans - 2, freqs[k] * 2];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " comes from reading one bar only or adding a bar outside the two named intervals: add the heights of " + labels[k] + " and " + labels[k + 1] + "." }; });
  var q = mcq("The histogram shows " + c.unit + " for " + c.who + ". How many " + c.who + " fall in the " + labels[k] + " or " + labels[k + 1] + " intervals combined?",
    { t: String(ans), fb: "Yes: " + freqs[k] + " plus " + freqs[k + 1] + " equals " + ans + "." }, ds,
    "\\[ \\begin{aligned} \\text{Combined} &= " + freqs[k] + " + " + freqs[k + 1] + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["The word combined means add the bars for both named intervals.", "Read each of the two bar heights first, then add them."]);

E("u4-interpolate", 4, ["6.5"], 2, "gen", function () {
  var ctxs = [
    { thing: "temperature inside a greenhouse in Mount Pearl", x: "Hour after sunrise", y: "Degrees C", unit: "degrees" },
    { thing: "distance covered by a snowmobile tour near Deer Lake", x: "Hour", y: "Kilometres", unit: "km" },
    { thing: "water pumped into a tank at a fish plant in Harbour Grace", x: "Minute", y: "Litres", unit: "litres" },
    { thing: "height of a sunflower in a garden in Clarenville", x: "Week", y: "Centimetres", unit: "cm" }
  ];
  var c = pick(ctxs), start = ri(4, 30), step = pick([2, 4, 5, 6, 8, 10]), labels = [], vals = [], i;
  for (i = 0; i < 6; i++) { labels.push(String(i)); vals.push(start + step * i); }
  var k = ri(1, 4), ans = (vals[k] + vals[k + 1]) / 2;
  var pool = [vals[k], vals[k + 1], ans + step, ans - step / 2, vals[k] + step * 2];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d) + "", fb: "That value sits on a plotted point or past it: halfway in time means halfway between the two neighbouring values." }; });
  var q = mcq("The line graph shows " + c.thing + ". The value changes steadily between plotted points. Interpolate the value at " + k + ".5 on the horizontal axis, in " + c.unit + ".",
    { t: String(fmt(ans)) + "", fb: "Yes: halfway between " + vals[k] + " and " + vals[k + 1] + " is " + fmt(ans) + "." }, ds,
    "\\[ \\begin{aligned} \\text{Interpolated value} &= \\frac{" + vals[k] + " + " + vals[k + 1] + "}{2} \\\\ &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " " + c.unit + "</b>.",
    { k: k, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(vals[5]), c.y, c.x);
  return q;
}, ["Interpolation means reading a value between two plotted points.", "Find the two points on either side of the requested spot and take the value halfway between them."]);

E("u4-misleading-axis", 4, ["6.7"], 2, "gen", function () {
  var ctxs = [
    { thing: "monthly memberships at two gyms in St. John's", labels: ["Gym A", "Gym B"], unit: "members" },
    { thing: "weekly sales at two food trucks in Corner Brook", labels: ["Truck A", "Truck B"], unit: "meals" },
    { thing: "season points for two curling teams in Gander", labels: ["Team A", "Team B"], unit: "points" },
    { thing: "daily riders on two bus routes in Mount Pearl", labels: ["Route A", "Route B"], unit: "riders" }
  ];
  var c = pick(ctxs), v1 = ri(55, 90), gap = pick([4, 5, 6, 8, 10]), v2 = v1 + gap;
  var base = v1 - pick([5, 10, 15]), yMax = v2 + pick([2, 4, 6]);
  var q = mcq("The bar graph shows " + c.thing + ": " + v1 + " " + c.unit + " for " + c.labels[0] + " and " + v2 + " " + c.unit + " for " + c.labels[1] + ". The second bar looks far taller than the first. What makes the graph misleading?",
    { t: "The vertical axis starts at " + base + " instead of 0", fb: "Yes: starting above 0 stretches the visible gap between the bars." },
    [{ t: "The two bars are drawn in two different widths", fb: "Check the figure: the bars have the same width, so width is not the trick." },
     { t: "The bars are arranged in the wrong time order", fb: "These are two separate entries, not a time order, and order does not change bar heights." },
     { t: "The graph uses bars instead of a circle format", fb: "Bars suit this comparison; the problem is where the scale begins." }],
    "The values differ by only " + gap + ", but the scale begins at " + base + ", so only the tops of the bars are compared. A scale that starts above 0 exaggerates a small difference. The answer is <b>The vertical axis starts at " + base + " instead of 0</b>.",
    { v1: v1, v2: v2, base: base });
  q.figure = u4BarFig(c.labels, [v1, v2], yMax, c.unit, "", base);
  return q;
}, ["Compare the size of the real difference with how big it looks on the page.", "Check where the vertical scale starts before trusting the bar heights."]);

E("u4-scatter-trend", 4, ["6.4", "6.3"], 2, "gen", function () {
  var ctxs = [
    { x: "Hours of practice per week", y: "Songs played cleanly", xlab: "Hours", ylab: "Songs" },
    { x: "Centimetres of rain in a month", y: "Trail closures that month", xlab: "Rain (cm)", ylab: "Closures" },
    { x: "Minutes a soup simmers", y: "Flavour score out of 50", xlab: "Minutes", ylab: "Score" },
    { x: "Kilometres driven per day", y: "Fuel used that day (L)", xlab: "Kilometres", ylab: "Litres" }
  ];
  var c = pick(ctxs), mode = pick(["pos", "neg", "none"]), pts = [], i;
  for (i = 0; i < 9; i++) {
    var x = 2 + i * 2 + ri(0, 1), yv;
    if (mode === "pos") yv = Math.round(6 + x * 1.6 + ri(-4, 4));
    else if (mode === "neg") yv = Math.round(52 - x * 1.8 + ri(-4, 4));
    else yv = ri(14, 44);
    pts.push([x, Math.max(2, yv)]);
  }
  var correct = mode === "pos" ? "As one measure rises, the other tends to rise too" : mode === "neg" ? "As one measure rises, the other tends to fall" : "The points show no clear pattern linking the measures";
  var all = ["As one measure rises, the other tends to rise too", "As one measure rises, the other tends to fall", "The points show no clear pattern linking the measures", "Every point follows the pattern with no exceptions at all"];
  var opts = all.filter(function (t) { return t !== correct; }).map(function (t) {
    return { t: t, fb: mode === "none" && t.indexOf("Every point") === 0 ? "Scatter points are scattered, so no point by point rule holds here." : "Look at the overall drift of the cloud of points, not at any single point." };
  });
  var q = mcq("A scatter plot links " + c.x.toLowerCase() + " with " + c.y.toLowerCase() + ". Which sentence describes the trend?",
    { t: correct, fb: "Yes: that matches the overall drift of the points." }, opts,
    "Ignore single points and follow the cloud as a whole from left to right. Its overall drift gives the trend. The answer is <b>" + correct + "</b>.",
    { mode: mode });
  q.figure = u4ScatterFig(pts, 20, 60, c.ylab, c.xlab);
  return q;
}, ["Look at the whole cloud of points rather than any single point.", "Follow the cloud from left to right and judge whether it drifts up, drifts down, or spreads with no drift."]);

E("u4-representation-pov", 4, ["6.1", "6.7"], 2, "gen", function () {
  var modes = [
    function () {
      var a = ri(40, 70), b = a + pick([3, 4, 5, 6]), base = a - pick([4, 6, 8]);
      return { prompt: "A shop in Bay Roberts sold " + a + " gift baskets last December and " + b + " this December. The owner wants a poster graph that makes the growth look as large as possible. Which choice does that?",
        correct: "Start the vertical axis at " + base + " instead of 0", correctFb: "Yes: cutting the axis makes a gain of " + (b - a) + " fill far more of the page.",
        ds: [["Start the vertical axis at 0 and keep equal intervals", "A full axis from 0 shows the gain at its true, modest size."],
             ["Report the exact counts in a plain data table", "A table gives the numbers with no visual exaggeration at all."],
             ["Use a circle graph of the two monthly totals", "Circle slices show shares of a total, not growth over time."]],
        sol: "The real gain is only " + (b - a) + " baskets. Starting the scale at " + base + " shows only the tops of the bars, so the small gain looks dramatic. The answer is <b>Start the vertical axis at " + base + " instead of 0</b>.", p: { a: a, b: b, base: base } };
    },
    function () {
      var a = ri(20, 45), b = a * pick([2, 3]);
      return { prompt: "A charity in Happy Valley-Goose Bay helped " + a + " families two years ago and " + b + " families this year. A pictograph maker wants the increase to look even bigger than it is. Which choice does that?",
        correct: "Draw this year's symbol " + (b / a) + " times as tall and " + (b / a) + " times as wide", correctFb: "Yes: scaling a symbol both ways multiplies its area, so it looks far bigger than the count ratio.",
        ds: [["Draw each symbol the same size for both years on the poster", "Equal symbols make the picture match the counts honestly."],
             ["Label each symbol with the exact family count for its year", "Exact labels let readers check the real numbers directly."],
             ["Replace the pictograph with a bar graph from 0 instead", "A bar graph from 0 shows the increase at its true size."]],
        sol: "The count grew by a factor of " + (b / a) + ". A symbol scaled in both height and width grows in area by that factor squared, which overstates the change. The answer is <b>Draw this year's symbol " + (b / a) + " times as tall and " + (b / a) + " times as wide</b>.", p: { a: a, b: b } };
    },
    function () {
      var a = ri(6, 12), b = a + pick([8, 10, 12, 14]);
      return { prompt: "A town council in Placentia compares two graphs of the same road repair costs, which rose from $" + a + ",000 to $" + b + ",000 over five years. One graph uses 1-year steps on the time axis, the other uses 5-year steps. Which statement is true?",
        correct: "The 1-year steps make the rise look more gradual", correctFb: "Yes: spreading the same rise over more steps flattens the slope a reader sees.",
        ds: [["The 5-year steps change the actual repair costs", "Axis steps change the picture only; the costs stay the same."],
             ["The 1-year steps hide some of the repair costs", "Every year still appears; the rise is spread out, not hidden."],
             ["Both graphs must create the same impression", "Step size changes the steepness readers see, so impressions differ."]],
        sol: "The data are identical in both graphs. With 1-year steps the rise of $" + (b - a) + ",000 is spread across five segments, so it looks gradual. The answer is <b>The 1-year steps make the rise look more gradual</b>.", p: { a: a, b: b } };
    }
  ];
  var m = pick(modes)();
  var ds = m.ds.map(function (d) { return { t: d[0], fb: d[1] }; });
  return mcq(m.prompt, { t: m.correct, fb: m.correctFb }, ds, m.sol, m.p);
}, ["Ask which version changes the impression while keeping the same underlying numbers.", "Look for the choice that stretches, squeezes, or rescales the picture rather than reporting the data plainly."]);

E("u4-two-conclusions", 4, ["6.6"], 2, "gen", function () {
  var ctxs = [
    { thing: "registrations for a learn to curl program in St. John's", unit: "registrations", verb: "Registrations" },
    { thing: "attendance at a farmers market in Clarenville", unit: "visitors", verb: "Attendance" },
    { thing: "borrowing at a public library in Corner Brook", unit: "books borrowed", verb: "Borrowing" },
    { thing: "ridership on a town shuttle in Gander", unit: "riders", verb: "Ridership" }
  ];
  var c = pick(ctxs), up = pick([true, false]), start = ri(20, 60), change = pick([10, 15, 20, 25, 30]);
  var labels = ["Sep", "Oct", "Nov", "Dec", "Jan"], vals = [], i;
  for (i = 0; i < 5; i++) vals.push(up ? start + Math.round(change * i / 4) : start + change - Math.round(change * i / 4));
  var first = vals[0], last = vals[4];
  var claimA = up ? c.verb + " grew from " + first + " in Sep to " + last + " in Jan" : c.verb + " fell from " + first + " in Sep to " + last + " in Jan";
  var correct = up ? c.verb + " was higher in Jan than in Sep" : c.verb + " was lower in Jan than in Sep";
  var q = mcq("One reader concludes: \"" + claimA + ".\" Which second conclusion does the same graph also support?",
    { t: correct, fb: "Yes: comparing the first and last plotted values gives exactly that." },
    [{ t: "A new advertising campaign caused the change", fb: "The graph shows values over time only; it carries no information about causes." },
     { t: "The trend will continue in the same way next year", fb: "A graph of past months cannot guarantee what happens next year." },
     { t: "The program earned more money in Jan than in Sep", fb: "The graph counts " + c.unit + ", not money, so earnings cannot be read from it." }],
    "The graph supports readings of its own plotted values, such as comparing the first and last points. It says nothing about causes, future values, or money. The answer is <b>" + correct + "</b>.",
    { up: up, first: first, last: last });
  q.figure = u4LineFig(labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "Month");
  return q;
}, ["A graph supports conclusions about the values it actually plots.", "Test each option: is it read off the plotted values, or does it add a cause, a prediction, or a new measure?"]);

E("u4-cr-histogram-total", 4, ["6.2"], 2, "gen", function () {
  var ctxs = [
    { unit: "books borrowed in a month, by borrower", w: 5, who: "borrowers" },
    { unit: "centimetres grown by tomato plants in a greenhouse class", w: 4, who: "plants" },
    { unit: "minutes of screen time on a school night", w: 15, who: "students" },
    { unit: "fish caught per trip by harbour boats in Burin", w: 2, who: "boats" }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i, total = 0;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(2, 12)); total += freqs[i]; }
  var q = numq("The histogram shows " + c.unit + " for " + c.who + ". In total, how many " + c.who + " were counted?",
    total, 0,
    "\\[ \\begin{aligned} \\text{Total} &= " + freqs.join(" + ") + " \\\\ &= " + total + " \\end{aligned} \\] The answer is <b>" + total + "</b>.",
    { total: total });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["A total from a histogram means adding the heights of all the bars.", "Read every bar height first and write the five values down before adding."]);

E("u4-cr-read-compare", 4, ["6.3"], 2, "gen", function () {
  var ctxs = [
    { thing: "scones sold at a bakery in Twillingate", unit: "scones", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    { thing: "laps completed at a swim club in St. John's", unit: "laps", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"] },
    { thing: "visitors to a lighthouse site in Bonavista", unit: "visitors", labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] }
  ];
  var c = pick(ctxs), vals = [], i;
  for (i = 0; i < 6; i++) vals.push(ri(4, 22) * 5);
  var a = ri(0, 2), b = ri(3, 5);
  if (vals[b] === vals[a]) vals[b] += 10;
  var diff = Math.abs(vals[b] - vals[a]), more = vals[b] > vals[a] ? c.labels[b] : c.labels[a];
  var q = numq("The line graph shows " + c.thing + ". How many more were recorded in " + (vals[b] > vals[a] ? c.labels[b] : c.labels[a]) + " than in " + (vals[b] > vals[a] ? c.labels[a] : c.labels[b]) + "? Give the number only.",
    diff, 0,
    "\\[ \\begin{aligned} \\text{Difference} &= " + Math.max(vals[a], vals[b]) + " - " + Math.min(vals[a], vals[b]) + " \\\\ &= " + diff + " \\end{aligned} \\] The answer is <b>" + diff + "</b>.",
    { a: a, b: b, diff: diff });
  q.figure = u4LineFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Read both named points off the graph before doing any arithmetic.", "Subtract the smaller reading from the larger reading."]);

E("u4-cr-extrapolate", 4, ["6.5"], 2, "gen", function () {
  var ctxs = [
    { thing: "savings in a jar for a school trip to Fogo Island", unit: "dollars", y: "Dollars saved" },
    { thing: "height of a bean plant in a class in Grand Falls-Windsor", unit: "cm", y: "Height (cm)" },
    { thing: "distance cycled by a rider training in Terra Nova", unit: "km", y: "Distance (km)" },
    { thing: "pages finished by a reading club in Marystown", unit: "pages", y: "Pages" }
  ];
  var c = pick(ctxs), start = ri(6, 40), step = pick([3, 4, 5, 6, 7, 8, 9, 10]);
  var labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"], vals = [], i;
  for (i = 0; i < 5; i++) vals.push(start + step * i);
  var ans = vals[4] + step;
  var q = numq("The line graph shows " + c.thing + " rising by the same amount each week. Extrapolate the value for Week 6. Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Weekly increase} &= " + vals[1] + " - " + vals[0] + " = " + step + " \\\\ \\text{Week 6} &= " + vals[4] + " + " + step + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { start: start, step: step, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(ans), c.y, "Week");
  return q;
}, ["Extrapolation extends the pattern one step beyond the plotted points.", "Find the steady increase between neighbouring points, then add it once to the last value."]);

E("u4-cr-bar-total", 4, ["6.3"], 2, "gen", function () {
  var ctxs = [
    { thing: "meals served at a community kitchen in St. John's", unit: "meals", labels: ["Mon", "Tue", "Wed", "Thu"] },
    { thing: "seed packets sold at a garden centre in Mount Pearl", unit: "packets", labels: ["Apr", "May", "Jun", "Jul"] },
    { thing: "cars washed at a fundraiser in Bay Roberts", unit: "cars", labels: ["9 AM", "11 AM", "1 PM", "3 PM"] },
    { thing: "mittens knit by a craft circle in Trinity", unit: "pairs", labels: ["Sep", "Oct", "Nov", "Dec"] }
  ];
  var c = pick(ctxs), vals = [], i, total = 0;
  for (i = 0; i < 4; i++) { vals.push(ri(3, 20) * 5); total += vals[i]; }
  var q = numq("The bar graph shows " + c.thing + ". What is the total across all four bars? Give the number only.",
    total, 0,
    "\\[ \\begin{aligned} \\text{Total} &= " + vals.join(" + ") + " \\\\ &= " + total + " \\end{aligned} \\] The answer is <b>" + total + "</b>.",
    { total: total });
  q.figure = u4BarFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Read the height of every bar before adding anything.", "Add the four bar values in order, checking each reading against the scale."]);

E("u4-cr-histogram-range", 4, ["6.2", "6.3"], 2, "gen", function () {
  var ctxs = [
    { unit: "test score out of 100", w: 10, who: "students", start: 40 },
    { unit: "grams of blueberries picked per bucket helper", w: 50, who: "helpers", start: 100 },
    { unit: "minutes per shift worked by tour guides in Gros Morne", w: 30, who: "guides", start: 60 },
    { unit: "dollars of tips per shift at a cafe in St. John's", w: 5, who: "servers", start: 10 }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((c.start + i * c.w) + "-" + (c.start + (i + 1) * c.w - 1)); freqs.push(ri(2, 13)); }
  var ans = freqs[2] + freqs[3] + freqs[4], lo = c.start + 2 * c.w;
  var q = numq("The histogram shows " + c.unit + " for " + c.who + ". How many " + c.who + " recorded a value of " + lo + " or more? Give the number only.",
    ans, 0,
    "\\[ \\begin{aligned} \\text{At or above } " + lo + " &= " + freqs[2] + " + " + freqs[3] + " + " + freqs[4] + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.",
    { ans: ans, lo: lo });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["Find the first interval that starts at the named value; every interval from there on counts.", "Read those bar heights and add them."]);

E("u4-cr-interpolate", 4, ["6.5"], 2, "gen", function () {
  var ctxs = [
    { thing: "temperature in a cold storage room in Port aux Basques", unit: "degrees C", x: "hours", y: "Degrees C" },
    { thing: "water depth in a harbour tank in Harbour Grace", unit: "cm", x: "hours", y: "Depth (cm)" },
    { thing: "distance travelled by a delivery van leaving Deer Lake", unit: "km", x: "hours", y: "Distance (km)" },
    { thing: "charge level of a tour boat battery in Twillingate", unit: "percent", x: "hours", y: "Percent" }
  ];
  var c = pick(ctxs), y1 = ri(5, 30), per = pick([2, 3, 4, 5, 6]), span = 4, y2 = y1 + per * span;
  var at = ri(1, 3), ans = y1 + per * at, xq = at;
  var labels = [], vals = [], i;
  for (i = 0; i <= span; i++) { labels.push(String(i)); vals.push(y1 + per * i); }
  var q = numq("A line graph of " + c.thing + " passes through (" + 0 + ", " + y1 + ") and (" + span + ", " + y2 + ") and is straight between plotted points. The values at each whole hour lie on the graph shown. Interpolate the value at hour " + xq + ". Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Rise per hour} &= \\frac{" + y2 + " - " + y1 + "}{" + span + "} = " + per + " \\\\ \\text{Value at hour } " + xq + " &= " + y1 + " + " + xq + " \\times " + per + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { y1: y1, per: per, at: at, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(y2), c.y, "Hour");
  return q;
}, ["Interpolation uses the straight segment between two known points.", "Find the rise per unit step first, then move that many steps from the starting value."]);

E("u4-peak-pair", 4, ["6.6"], 3, "gen", function () {
  var ctxs = [
    { thing: "enrolment in evening fitness classes in Mount Pearl", unit: "members" },
    { thing: "visitors to a heritage site in Bonavista", unit: "visitors" },
    { thing: "orders at a takeout in Labrador City", unit: "orders" },
    { thing: "participants in a library program in Corner Brook", unit: "participants" }
  ];
  var c = pick(ctxs), labels = ["Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"];
  var a = ri(25, 45), d1 = pick([10, 15, 20]), d2 = pick([5, 10, 15]), drop = pick([15, 20, 25, 30]);
  var vals = [a, a + d1, a + d1 + d2, a + d1 + d2 - Math.round(drop / 2), a + d1 + d2 - drop];
  var peak = vals[2];
  var correct = "It peaked in Yr 3 at " + peak + ", then fell to " + vals[4] + " by Yr 5";
  var q = mcq("The graph shows " + c.thing + " over five years. Which pair of conclusions does the graph support?",
    { t: correct, fb: "Yes: both parts are read directly off the plotted points." },
    [{ t: "It peaked in Yr 3 at " + peak + ", and it will return to " + peak + " next year", fb: "The peak reading is right, but the graph cannot promise a future value." },
     { t: "It rose every year, reaching its highest value in Yr 5", fb: "Read the last three points again: the values fall after Yr 3." },
     { t: "It fell because a competing program opened in Yr 4", fb: "The fall is visible, but the graph gives no reason for it." }],
    "The points rise to a highest value of " + peak + " in Yr 3 and then fall, ending at " + vals[4] + " in Yr 5. Only conclusions read off the points are supported. The answer is <b>" + correct + "</b>.",
    { vals: vals });
  q.figure = u4LineFig(labels, vals, u4NiceMax(peak), c.unit, "Year");
  return q;
}, ["Check both halves of each pair against the plotted points.", "Reject any half that adds a cause or a future promise the graph cannot show."]);

E("u4-misleading-actual", 4, ["6.7", "6.3"], 3, "gen", function () {
  var ctxs = [
    { thing: "average weekly pay at two plants in Newfoundland and Labrador", labels: ["Plant A", "Plant B"], unit: "dollars" },
    { thing: "season snowmobile sales at two dealers in Labrador", labels: ["Dealer A", "Dealer B"], unit: "machines" },
    { thing: "monthly riders for two taxi firms in St. John's", labels: ["Firm A", "Firm B"], unit: "riders" }
  ];
  var c = pick(ctxs);
  var v1 = pick([40, 50, 60, 80, 100, 120, 150, 200]);
  var pct = pick([10, 20, 25, 40, 50]);
  var v2 = v1 * (1 + pct / 100);
  var base = Math.round(v1 * 0.75), yMax = Math.round(v2 * 1.05) + 2;
  var visual = Math.round(((v2 - base) - (v1 - base)) / (v1 - base) * 100);
  var pool = [visual, pct + 20, Math.max(5, pct - 10), pct * 2];
  var ds = u4Distractors(pct, pool).map(function (d) { return { t: String(d) + "%", fb: d + "% comes from judging the visible bar heights or a rounded guess: compute the change from the labelled values, not the picture." }; });
  var q = mcq("The bar graph's axis starts at " + base + ", so " + c.labels[1] + " looks far ahead in " + c.thing + ". The labelled values are " + v1 + " for " + c.labels[0] + " and " + fmt(v2) + " for " + c.labels[1] + ". By what percent is " + c.labels[1] + " actually higher?",
    { t: pct + "%", fb: "Yes: the increase of " + fmt(v2 - v1) + " is " + pct + "% of the starting value " + v1 + "." }, ds,
    "\\[ \\begin{aligned} \\text{Percent higher} &= \\frac{" + fmt(v2) + " - " + v1 + "}{" + v1 + "} \\times 100 \\% \\\\ &= " + pct + "\\% \\end{aligned} \\] The answer is <b>" + pct + "%</b>.",
    { v1: v1, v2: v2, pct: pct, base: base });
  q.figure = u4BarFig(c.labels, [v1, v2], yMax, c.unit, "", base);
  return q;
}, ["Use the labelled values, not the visible bar heights, when the axis does not start at 0.", "Divide the increase by the starting value and multiply by 100."]);

E("u4-cr-predict-trend", 4, ["6.5", "6.4"], 3, "gen", function () {
  var ctxs = [
    { thing: "weekly bookings for a boat tour in Gros Morne", unit: "bookings", y: "Bookings" },
    { thing: "height of a tomato plant in a school greenhouse in Gander", unit: "cm", y: "Height (cm)" },
    { thing: "savings toward a used car by a worker in Stephenville", unit: "dollars", y: "Dollars saved" },
    { thing: "distance run each Sunday by a runner in St. John's", unit: "km", y: "Distance (km)" }
  ];
  var c = pick(ctxs), start = ri(8, 35), step = pick([2, 3, 4, 5, 6, 8]);
  var labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"], vals = [], i;
  for (i = 0; i < 6; i++) vals.push(start + step * i);
  var ans = vals[5] + 2 * step;
  var q = numq("The line graph shows " + c.thing + " rising steadily. Assuming the same weekly increase continues, predict the value for Week 8. Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Weekly increase} &= " + vals[1] + " - " + vals[0] + " = " + step + " \\\\ \\text{Week 8} &= " + vals[5] + " + 2 \\times " + step + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { start: start, step: step, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(ans), c.y, "Week");
  return q;
}, ["A steady trend extends by the same increase for each extra step.", "Work out the increase per week, then add it once for each week beyond the last point."]);

E("u4-cr-percent-change", 4, ["6.7", "6.3"], 3, "gen", function () {
  var ctxs = [
    { thing: "monthly sales at a craft shop in Trinity before and after a ferry route reopened", labels: ["Before", "After"], unit: "items sold" },
    { thing: "weekly riders on a shuttle in Corner Brook before and after a schedule change", labels: ["Before", "After"], unit: "riders" },
    { thing: "daily orders at a bakery in Bay Roberts before and after a new sign went up", labels: ["Before", "After"], unit: "orders" }
  ];
  var c = pick(ctxs);
  var a = pick([40, 50, 60, 80, 100, 120, 160, 200]);
  var pct = pick([10, 20, 25, 40, 50, 60]);
  var b = a * (1 + pct / 100);
  var base = Math.round(a * 0.7), yMax = Math.round(b * 1.05) + 2;
  var q = numq("The bar graph shows " + c.thing + ". Its axis starts at " + base + ", so use the labelled values on the scale, " + a + " and " + fmt(b) + ". By what percent did the value increase from Before to After? Give the number only.",
    pct, 0.1,
    "\\[ \\begin{aligned} \\text{Percent increase} &= \\frac{" + fmt(b) + " - " + a + "}{" + a + "} \\times 100 \\% \\\\ &= " + pct + "\\% \\end{aligned} \\] The answer is <b>" + pct + "%</b>.",
    { a: a, b: b, pct: pct });
  q.figure = u4BarFig(c.labels, [a, b], yMax, c.unit, "", base);
  return q;
}, ["Read the values off the scale rather than judging the bar heights, since the axis is cut.", "Subtract to get the increase, divide by the starting value, and multiply by 100."]);



/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess a Math 1202 outcome (percent change, indicator 1.4), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-2202.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u4-cr-percent-change","u4-misleading-actual"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 6 (reading and describing graphs). Borrowed verbatim from Mathematics 9 (u6-graph-describe, u6-point-on-graph, u6-interpolate-graph, u6-gap-missing-coord-cr) and Mathematics 7 (u4-graph-read, u4-graph-quantities, u7-line-graph); feeder helper copies ride in bank-helpers.js. Cluster 7's stock (u4-misleading-actual, u4-cr-percent-change) sits in the unit's main block above, flagged on November 13, 2026; its metadata is completed by this tranche's pass below. ===== */
E("u4-pk-graph-describe", 4, ["6.4"], 2, "gen", function () {
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

E("u4-pk-point-on-graph", 4, ["6.3"], 1, "gen", function () {
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

E("u4-pk-interpolate", 4, ["6.5"], 1, "gen", function () {
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

E("u4-pk-missing-coord", 4, ["6.5"], 2, "gen", function () {
  var m = ri(2, 5), b = ri(1, 12);
  var x1 = ri(0, 3), x2 = x1 + ri(2, 4), x3 = x2 + ri(2, 5);
  var y1 = b + m * x1, y2 = b + m * x2, ans = b + m * x3;
  var prompt = "The points (" + x1 + ", " + y1 + ") and (" + x2 + ", " + y2 + ") lie on a straight line. The point (" + x3 + ", y) is also on the same line. What is the value of y?";
  var sol = "Find the slope from the two given points first, then extend the pattern to the new x: \\[ \\begin{aligned} \\text{slope} &= \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} = " + m + " \\\\ y &= " + y2 + " + " + m + "(" + x3 + " - " + x2 + ") = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-missing-coord", m: m, x3: x3 });
}, ["The rate of the line must be worked out from the two complete points before the incomplete point can be used.", "Divide the change in y by the change in x for the two given points as the first step."]);

E("u4-pk-graph-read", 4, ["6.3"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:c.pct+"%", fb:"That is the percent for "+c.name+": find "+cat.name+" in the legend."};
  });
  var q=mcq("The circle graph shows students' "+g.topic+". What percent of students chose "+cat.name+"?",
    {t:cat.pct+"%", fb:"Yes: the legend gives "+cat.name+" as "+cat.pct+"%."},
    ds,
    "Match "+cat.name+" in the legend to its sector: it is labelled "+cat.pct+"%. The answer is <b>"+cat.pct+"%</b>.",
    {topic:g.topic, idx:idx});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Use the legend to match each sector letter to its category and percent.", "Start by finding the category in the legend beside the graph."]);

E("u4-pk-graph-quantities", 4, ["6.3"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var T=pick([100,200,300,400]), qty=cat.pct*T/100;
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:String(c.pct*T/100), fb:"That is the count for "+c.name+": use the percent for "+cat.name+"."};
  });
  var q=mcq("The circle graph shows the "+g.topic+" of "+T+" students. How many students chose "+cat.name+"?",
    {t:String(qty), fb:"Yes: "+cat.pct+"% of "+T+" is "+qty+"."},
    ds,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(cat.pct,"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {topic:g.topic, idx:idx, T:T});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Turn the sector's percent into a count by multiplying it by the total surveyed.", "Start by reading the percent for the category from the legend."]);

E("u4-pk-line-graph", 4, ["6.4"],1,"gen",function(){
  var days=["Mon","Tue","Wed","Thu","Fri"];var vals=days.map(function(){return ri(6,24);});
  var mode=pick(["warmest","change","read"]);
  var prompt,correct,ds,sol;
  if(mode==="warmest"){var mi=vals.indexOf(Math.max.apply(null,vals));correct=days[mi];
    ds=days.filter(function(d,i){return i!==mi;}).slice(0,3).map(function(d){return {t:d,fb:"The highest point on the line graph marks the greatest temperature."};});
    prompt="The line graph shows the daily high temperature for five days. On which day was it warmest?";sol="The highest point is on "+days[mi]+" at "+vals[mi]+" degrees. The answer is <b>"+days[mi]+"</b>.";
  } else if(mode==="change"){var i1=ri(0,2),i2=ri(3,4);var d=vals[i2]-vals[i1];correct=String(d);
    ds=u7numOpts(d,[d+2,d-2,-d===d?d+3:-d]).map(function(v){return {t:String(v),fb:"Subtract the earlier temperature from the later temperature, keeping the sign."};});
    if(ds.length<3)ds.push({t:String(d+5),fb:"Subtract the earlier temperature from the later temperature, keeping the sign."});
    prompt="The line graph shows the daily high temperature for five days. By how many degrees did the temperature change from "+days[i1]+" to "+days[i2]+"?";sol="\\[ \\begin{aligned} \\text{change} &= "+vals[i2]+" - "+vals[i1]+" \\\\ &= "+d+" \\end{aligned} \\] The change is <b>"+d+" degrees</b>.";
  } else {var i3=ri(0,4);correct=String(vals[i3]);
    ds=u7numOpts(vals[i3],[vals[i3]+2,Math.max(vals[i3]-2,0),vals[(i3+2)%5]]).map(function(v){return {t:String(v),fb:"Find "+days[i3]+" on the horizontal axis and read the point value above it."};});
    prompt="The line graph shows the daily high temperature for five days. What was the temperature on "+days[i3]+"?";sol="The point above "+days[i3]+" sits at "+vals[i3]+" degrees. The answer is <b>"+vals[i3]+" degrees</b>.";
  }
  var q=mcq(prompt,{t:correct,fb:"Yes, that reading matches the line graph."},ds,sol,{mode:mode});
  q.figure=u7lineSVG(days,vals,"Degrees");
  return q;
},["Each point on a line graph gives the value for that day.","Start by reading the two values you need straight off the graph."]);

/* PK tranche metadata pass for Unit 4. The tranche's own entries are flagged here. This pass also completes the tranche metadata of the two entries flagged on November 13, 2026 (u4-misleading-actual, u4-cr-percent-change) without retagging or reflagging them. */
var PKT_U4_FOR=["6.1","6.2","6.3","6.4","6.5","6.6","6.7"];
var PKT_U4={
 "u4-misleading-actual":{src:"math-1202:1.4",group:"percent-change"},
 "u4-cr-percent-change":{src:"math-1202:1.4",group:"percent-change"},
 "u4-pk-graph-describe":{src:"math-9:7.5",group:"graph-trends"},
 "u4-pk-point-on-graph":{src:"math-9:7.7",group:"graph-reading"},
 "u4-pk-interpolate":{src:"math-9:7.8",group:"interp-extrap"},
 "u4-pk-missing-coord":{src:"math-9:7.7",group:"interp-extrap"},
 "u4-pk-graph-read":{src:"math-7:11.4",group:"graph-reading"},
 "u4-pk-graph-quantities":{src:"math-7:11.5",group:"graph-reading"},
 "u4-pk-line-graph":{src:"math-7:11.9",group:"graph-reading"}
};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});
