// CRMARKS: sci-u3-cr-trip=4
// CRMARKS: sci-u3-cr-dtgraph=3
// CRMARKS: sci-u3-cr-vtgraph=3
/* Science 1206 Unit 3: Motion (SC10.8.7 to 8.12). */
/* Appendix A significant figures are enforced: calculation answers carry the fewest sig figs of the measurements used. */

/* ---------- SC10.8.7 Measurement and significant figures ---------- */

var S6_SFNUMS = [
  { s: "0.00450", n: 3, why: "Leading zeros never count; the trailing zero after the 5 counts because a decimal point is present: 4, 5, 0 = 3." },
  { s: "3.060", n: 4, why: "The captive zero between digits counts, and the trailing zero counts (decimal point shown): 3, 0, 6, 0 = 4." },
  { s: "1200", n: 2, why: "With no decimal point shown, trailing zeros do not count: only 1 and 2 = 2 significant figures (as written in this course)." },
  { s: "1200.", n: 4, why: "The decimal point at the end is shown deliberately, so the trailing zeros count: all four digits = 4." },
  { s: "45.0", n: 3, why: "The zero after the decimal counts (decimal point present): 4, 5, 0 = 3." },
  { s: "700", n: 1, why: "No decimal point shown: only the 7 counts = 1 significant figure." },
  { s: "0.0208", n: 3, why: "Leading zeros are placeholders only: 2, 0, 8 count = 3 (the middle zero is captive)." },
  { s: "506.05", n: 5, why: "Every digit counts here: both zeros are captive (trapped between nonzero digits) = 5." },
  { s: "9.80", n: 3, why: "The trailing zero counts because the decimal point is present: 9, 8, 0 = 3." },
  { s: "0.0007", n: 1, why: "All the zeros are leading placeholders: only the 7 counts = 1." }
];
E("sci-u3-sigfigs-count", 3, ["SC10.8.7"], 1, "gen", function () {
  var it = s6pick(S6_SFNUMS);
  var opts = [it.n];
  [it.n + 1, it.n - 1, it.n + 2, it.n + 3, it.n - 2].forEach(function (v) { if (v >= 1 && opts.indexOf(v) < 0) opts.push(v); });
  var q = mcq("How many significant figures are in the measurement " + it.s + "?",
    String(it.n), opts.slice(1, 4).map(String),
    it.why + " Rules (Appendix A): nonzero digits always count, captive zeros count, leading zeros never count, trailing zeros count only when a decimal point is shown.",
    { s: it.s, n: it.n });
  return q;
}, ["Count by the rules, not by the number of digits printed: zeros are the whole game."]);

E("sci-u3-sigfigs-round", 3, ["SC10.8.7"], 2, "gen", function () {
  var cases = [
    { v: 4.6735, n: 3 }, { v: 0.02846, n: 2 }, { v: 13.75, n: 3 }, { v: 256.8, n: 2 },
    { v: 0.9046, n: 3 }, { v: 78.345, n: 4 }, { v: 5.096, n: 2 }, { v: 0.006318, n: 3 }
  ];
  var c = s6pick(cases);
  var key = s6roundSF(c.v, c.n);
  var ds = s6dis(key, [s6roundSF(c.v, c.n + 1), s6roundSF(c.v, Math.max(1, c.n - 1)), String(Math.round(c.v * 100) / 100), s6sf(c.v * 1.05, c.n), String(c.v)], 3);
  return mcq("Round " + c.v + " to " + c.n + " significant figures.",
    key, ds,
    "Keep the first " + c.n + " significant digit(s) and look at the next digit to decide rounding: " + c.v + " becomes " + key + ". Rounding to a number of decimal places instead is a different instruction, and keeping an extra digit overstates the precision.",
    { v: c.v, n: c.n, key: key });
}, ["Significant figures count digits from the first nonzero digit, wherever the decimal point sits."]);

E("sci-u3-sigfigs-calc", 3, ["SC10.8.7"], 2, "gen", function () {
  var aS = s6pick(["12.5", "8.40", "25.0", "3.60", "120", "6.25"]);
  var bS = s6pick(["4.0", "2.50", "0.80", "15.0", "9.6"]);
  var a = parseFloat(aS), b = parseFloat(bS);
  var sfA = s6countSF(aS), sfB = s6countSF(bS);
  var sf = Math.min(sfA, sfB);
  var prod = a * b;
  var key = s6sf(prod, sf);
  var ds = s6dis(key, [s6sf(prod, sf + 1), String(Math.round(prod * 1000) / 1000), s6sf(prod, Math.max(1, sf - 1)), s6sf(prod * 1.5, sf), s6sf(a / b, sf), s6sf(prod * 1.2, sf), s6sf(prod * 0.85, sf), s6sf(prod + 2, sf)], 3);
  return mcq("A student calculates " + aS + " x " + bS + ". What is the product, reported to the correct number of significant figures?",
    key, ds,
    "Multiplication rule: the answer carries the same number of significant figures as the measurement with the fewest. " + aS + " has " + sfA + " and " + bS + " has " + sfB + ", so report " + sf + ": the raw product " + (Math.round(prod * 1000) / 1000) + " is reported as " + key + ". Writing more digits claims precision the measurements never had.",
    { a: a, b: b, sf: sf, key: key });
}, ["The weakest measurement sets the precision of every answer built from it."]);

E("sci-u3-accuracy", 3, ["SC10.8.7"], 1, "var", varset([
  function () {
    return mcq("A set of darts all land in a tight cluster, but the cluster is well to the left of the bullseye. The throws are",
      "precise but not accurate: they agree with each other but miss the true target",
      ["accurate but not precise", "both accurate and precise", "neither: a tight cluster is always accurate"],
      "Accuracy is closeness to the true value; precision is closeness of results to each other. A tight cluster off target is the textbook picture of precision without accuracy, usually a systematic error (aim or equipment) behind it.", {});
  },
  function () {
    return mcq("Four students time the same pendulum swing as 1.48 s, 1.50 s, 1.49 s and 1.49 s. The teacher's photogate reads 1.49 s. Their results are",
      "both accurate (centred on the true value) and precise (tightly clustered)",
      ["precise but not accurate", "accurate in spread but imprecise", "neither accurate nor precise"],
      "The readings cluster tightly (precision) around the accepted value (accuracy). Both qualities can be judged from the same data set: compare the spread for precision, compare the centre to the true value for accuracy.", {});
  },
  function () {
    return mcq("A balance reads 0.3 g with nothing on the pan, and every mass measured afterward is 0.3 g too heavy. This is",
      "a systematic error: it shifts every reading the same way and destroys accuracy while precision can stay high",
      ["a random error: it scatters readings unpredictably", "a parallax error caused by viewing angle", "not an error at all if the readings are consistent"],
      "A zero error repeats identically, which is the mark of a systematic error. Re-zeroing (taring) the balance removes it. Random errors scatter both ways and cannot be corrected by a single adjustment.", {});
  },
  function () {
    return mcq("Reading a liquid level in a graduated cylinder from an angle, instead of at eye level with the meniscus, produces",
      "a parallax error, which can be avoided by always reading at eye level",
      ["a zero error in the cylinder's scale", "no error, because the angle cancels out", "a change in the liquid's actual volume"],
      "Parallax is the apparent shift from viewing position: the meniscus lines up against different scale marks from different heights. Eye level, bottom of the meniscus, every time, removes the error at its source.", {});
  }
]), ["Accuracy is about the truth; precision is about agreement. Both are judged differently, and each error type has its own fix."]);

E("sci-u3-units", 3, ["SC10.8.7"], 1, "var", varset([
  function () {
    return mcq("Which set lists the correct SI units for displacement, time, velocity and acceleration?",
      "metre (m), second (s), metre per second (m/s), metre per second squared (m/s²)",
      ["kilometre (km), hour (h), kilometre per hour (km/h), metre (m)", "metre (m), second (s), metre (m), second (s)", "centimetre (cm), minute (min), metre per second (m/s), metre per second (m/s)"],
      "Build units from the formulas: velocity is metres divided by seconds, acceleration is (m/s) divided by seconds, giving m/s². Calculations in this unit use metres and seconds so answers come out in these units directly.", {});
  },
  function () {
    return mcq("A measurement is recorded as '12.5' with no unit. The record is incomplete because",
      "a measurement is a number plus a unit: 12.5 m, 12.5 s and 12.5 m/s are entirely different quantities",
      ["numbers over 10 require two units", "the teacher prefers fractions", "12.5 has too many significant figures"],
      "Values and units travel together. Dropping the unit destroys the information: nobody downstream can tell a distance from a time from a speed, and any calculation using it is meaningless.", {});
  }
]), ["Never let a number travel without its unit."]);

/* ---------- SC10.8.7 and 8.8 Speed, velocity, displacement ---------- */

E("sci-u3-avgspeed", 3, ["SC10.8.7"], 2, "gen", function () {
  var sc = [
    { who: "A cyclist rides", dUnit: "m" }, { who: "A delivery van travels", dUnit: "m" },
    { who: "A swimmer completes laps totalling", dUnit: "m" }, { who: "A hiker walks", dUnit: "m" }
  ];
  var it = s6pick(sc);
  var t = s6pick([8.0, 10.0, 12.5, 20.0, 25.0, 40.0]);
  var v = s6pick([3.2, 4.5, 5.0, 6.4, 8.0, 9.5, 12.0]);
  var d = Math.round(v * t * 10) / 10;
  var dStr = Number.isInteger(d) ? d.toFixed(1) : String(d);
  var sf = Math.min(s6countSF(dStr), s6countSF(t.toFixed(1)));
  var key = s6sf(d / t, sf);
  var ds = s6dis(key, [s6sf(t / d * 100, sf), s6sf(d / t, sf + 1), s6sf(d + t, sf), s6sf(d / t * 2, sf), s6sf(d - t, sf)], 3).map(function (x) { return x + " m/s"; });
  return mcq(it.who + " " + dStr + " m in " + t.toFixed(1) + " s at a steady average rate. The average speed is",
    key + " m/s", ds,
    "Average speed = total distance / total time = " + dStr + " m / " + t.toFixed(1) + " s = " + key + " m/s, reported to " + sf + " significant figures (the fewest in the data). Dividing the wrong way, or keeping extra digits, misstates the result.",
    { d: d, t: t, key: key });
}, ["Speed is distance over time. Check the direction of the division with the units: metres per second can only come from m / s."]);

E("sci-u3-speed-solve", 3, ["SC10.8.7", "SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["findD", "findT"]);
  var v = s6pick([6.0, 7.5, 9.0, 11.0, 14.0]);
  var t = s6pick([12.0, 15.0, 18.0, 24.0, 30.0]);
  var d = v * t;
  var sf = Math.min(s6countSF(v.toFixed(1)), s6countSF(t.toFixed(1)));
  if (mode === "findD") {
    var key = s6sf(d, sf);
    return mcq("A snowmobile travels at an average velocity of " + v.toFixed(1) + " m/s [east] for " + t.toFixed(1) + " s. How far does it travel?",
      key + " m", s6dis(key, [s6sf(v / t * 100, sf), s6sf(d, sf + 1), s6sf(t / v * 10, sf), s6sf(d / 2, sf), s6sf(d + v, sf)], 3).map(function (x) { return x + " m"; }),
      "Rearrange v = d/t to d = v x t = " + v.toFixed(1) + " x " + t.toFixed(1) + " = " + key + " m. Rearranging before substituting keeps the relationship straight.",
      { mode: mode, key: key });
  }
  var key2 = s6sf(d / v, sf);
  return mcq("A boat must travel " + s6sf(d, sf) + " m across a harbour at an average speed of " + v.toFixed(1) + " m/s. How long does the crossing take?",
    key2 + " s", s6dis(key2, [s6sf(d * v / 100, sf), s6sf(v / d * 1000, sf), s6sf(d / v, sf + 1), s6sf(d / v * 2, sf), s6sf(t + v, sf)], 3).map(function (x) { return x + " s"; }),
    "Rearrange v = d/t to t = d/v = " + s6sf(d, sf) + " / " + v.toFixed(1) + " = " + key2 + " s. The seconds land in the answer's unit only when distance is divided by speed.",
    { mode: mode, key: key2 });
}, ["One formula, three shapes: v = d/t, d = vt, t = d/v. Pick by the unknown."]);

E("sci-u3-convert", 3, ["SC10.8.7", "SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["toMS", "toKMH"]);
  if (mode === "toMS") {
    var kmh = s6pick([36, 54, 72, 90, 108, 27, 45]);
    var ms = kmh / 3.6;
    var key = s6sf(ms, 2) + " m/s";
    var ds = [s6sf(kmh * 3.6, 3) + " m/s", s6sf(kmh / 10, 2) + " m/s", s6sf(ms, 3) + " m/s"];
    return mcq("Convert " + kmh + " km/h to metres per second.",
      key, ds,
      "Divide by 3.6 (because 1 m/s = 3.6 km/h): " + kmh + " / 3.6 = " + s6sf(ms, 2) + " m/s. Multiplying by 3.6 converts the other direction and is the classic slip; sanity check: the m/s value is always the smaller number.",
      { kmh: kmh, key: key });
  }
  var v = s6pick([5.0, 8.0, 12.5, 15.0, 20.0, 25.0]);
  var k2 = v * 3.6;
  var sf = s6countSF(v);
  var key2 = s6sf(k2, sf) + " km/h";
  return mcq("Convert " + v.toFixed(1) + " m/s to kilometres per hour.",
    key2, [s6sf(v / 3.6, sf) + " km/h", s6sf(k2, sf + 1) + " km/h", s6sf(v * 36, sf) + " km/h"],
    "Multiply by 3.6: " + v.toFixed(1) + " x 3.6 = " + key2 + ". The km/h value is always the larger number, a quick check on the direction of the conversion.",
    { v: v, key: key2 });
}, ["km/h to m/s: divide by 3.6. m/s to km/h: multiply by 3.6. The m/s number is always smaller."]);

E("sci-u3-scalar-vector", 3, ["SC10.8.8"], 1, "var", varset([
  function () {
    return mcq("Which list contains only vector quantities?",
      "Displacement, velocity, acceleration: each needs a magnitude and a direction",
      ["Distance, speed, time", "Displacement, speed, mass", "Velocity, distance, temperature"],
      "Vectors carry direction: 5 m [east] is a displacement, while 5 m alone is a distance (scalar). Speed is the scalar partner of velocity; distance pairs with displacement; time, mass and temperature are scalars.", {});
  },
  function () {
    return mcq("A student records a measurement as '24 m/s [north]'. Because it includes a direction, this quantity is the",
      "velocity (a vector), not the speed",
      ["speed (a scalar)", "distance travelled", "acceleration"],
      "The bracketed direction is the giveaway: speed plus direction is velocity. The same value without the direction (24 m/s) would be reported as speed.", {});
  },
  function () {
    return mcq("Which measurement is a scalar quantity?",
      "A temperature of -4 °C: it has size but no direction",
      ["A displacement of 300 m [west]", "A velocity of 12 m/s [downstream]", "An acceleration of 2.0 m/s² [south]"],
      "Negative is not a direction: -4 °C is a position on a temperature scale, not a heading in space. The other three each state a direction explicitly, which makes them vectors. (In one-dimensional motion a sign can stand in for direction, but a temperature sign is just above or below zero.)", {});
  }
]), ["Direction present means vector. Learn the pairs: distance/displacement, speed/velocity."]);

E("sci-u3-dist-disp", 3, ["SC10.8.8"], 2, "gen", function () {
  var mode = s6pick(["back1d", "perp"]);
  if (mode === "back1d") {
    var out = s6pick([120, 150, 200, 240, 300]);
    var back = s6pick([40, 50, 60, 80, 90]);
    var dist = out + back, disp = out - back;
    var ask = s6pick(["distance", "displacement"]);
    if (ask === "distance") {
      return mcq("A dog runs " + out + " m east along a beach, then turns and runs " + back + " m back west. What total distance did the dog travel?",
        dist + " m", [disp + " m", out + " m", (dist + 20) + " m"],
        "Distance adds every leg, direction ignored: " + out + " + " + back + " = " + dist + " m. The " + disp + " m option is the displacement, a different quantity.", { mode: mode, ask: ask });
    }
    return mcq("A dog runs " + out + " m east along a beach, then turns and runs " + back + " m back west. What is the dog's displacement?",
      disp + " m [east]", [dist + " m [east]", back + " m [west]", disp + " m"],
      "Displacement is finish minus start, with direction: " + out + " east - " + back + " west = " + disp + " m [east]. Total path length (" + dist + " m) is the distance, and a displacement answer without a direction is incomplete.", { mode: mode, ask: ask });
  }
  var tri = s6pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
  var k = s6pick([10, 20, 25]);
  var a = tri[0] * k, b = tri[1] * k, c = tri[2] * k;
  return mcq("A hiker walks " + a + " m north, then " + b + " m east. What is the magnitude of the hiker's displacement from the start?",
    c + " m", [(a + b) + " m", Math.abs(a - b) + " m", (c + k) + " m"],
    "The two legs are perpendicular, so the displacement is the hypotenuse: sqrt(" + a + "² + " + b + "²) = sqrt(" + (a * a + b * b) + ") = " + c + " m. Adding the legs (" + (a + b) + " m) gives the distance walked, not the straight-line displacement.", { a: a, b: b, c: c });
}, ["Distance counts the path; displacement measures the gap between start and finish, direction included."]);

E("sci-u3-avgvelocity", 3, ["SC10.8.8"], 3, "gen", function () {
  var legs = [
    { d: 300, t: 60, dir: 1 }, { d: 100, t: 50, dir: -1 }
  ];
  var disp = 200, tTot = 110, dist = 400;
  var keyV = s6sf(disp / tTot, 2);
  var avgSpd = s6sf(dist / tTot, 2);
  var legAvg = s6sf((300 / 60 + 100 / 50) / 2, 2);
  return mcq("A delivery driver goes 300 m east in 60 s, then 100 m west in 50 s. What is the driver's average velocity for the whole trip?",
    keyV + " m/s [east]", [avgSpd + " m/s [east]", legAvg + " m/s [east]", s6sf(disp / 60, 2) + " m/s [east]"],
    "Average velocity = total displacement / total time. Displacement = 300 - 100 = 200 m [east]; time = 110 s; 200/110 = " + keyV + " m/s [east]. The " + avgSpd + " option is the average speed (uses the 400 m path), and averaging the two leg velocities ignores that the legs took different times.", { keyV: keyV });
}, ["Average velocity divides total displacement by total time. Never average the leg velocities directly."]);

E("sci-u3-disp-scenarios", 3, ["SC10.8.8"], 2, "var", varset([
  function () {
    return mcq("An elevator rises 24 m, stops, then descends 9 m to a floor. A passenger's displacement from the start is",
      "15 m [up]", ["33 m [up]", "9 m [down]", "24 m [up]"],
      "Displacement tracks the endpoints only: +24 - 9 = +15 m, so 15 m [up]. The path length was 33 m, which is the distance, not the displacement.", {});
  },
  function () {
    return mcq("A swimmer completes a full lap in a 50 m pool and finishes at the starting wall. Her displacement for the lap is",
      "0 m: she ends where she started",
      ["100 m", "50 m", "200 m"],
      "Out 50 m and back 50 m returns her to the start, so displacement is zero even though she swam 100 m of distance. Zero displacement with nonzero distance is the signature of any closed loop.", {});
  },
  function () {
    return mcq("A car travels around a roundabout and exits on the same street it entered, heading back the way it came. At the moment it completes the circle, its displacement from entry is",
      "zero, because it is back at its starting position (its distance travelled is the circumference)",
      ["equal to the circumference of the roundabout", "equal to the diameter of the roundabout", "impossible to state without the car's speed"],
      "Displacement depends only on start and end positions. Same position means zero displacement, however long and curvy the path between them was.", {});
  }
]), ["If the finish is the start, the displacement is zero, whatever the odometer says."]);

/* ---------- SC10.8.9 Position-time graphs ---------- */

function s6dtGraph(segs, title) {
  var pts = [[0, segs[0].from]];
  var t = 0;
  segs.forEach(function (s) { t += s.dur; pts.push([t, s.to]); });
  var yMax = Math.max.apply(null, pts.map(function (p) { return p[1]; })) + 10;
  return s6GraphSVG({ xMax: t, yMax: yMax, xStep: s6niceStep(t), yStep: s6niceStep(yMax), xLab: "time (s)", yLab: "position (m)", lines: [{ pts: pts, col: S6_INK }] });
}
E("sci-u3-dt-read", 3, ["SC10.8.9"], 2, "gen", function () {
  var segs = [
    { from: 0, to: 30, dur: 10 },
    { from: 30, to: 30, dur: 10 },
    { from: 30, to: 10, dur: 10 }
  ];
  var fig = s6dtGraph(segs);
  var mode = s6pick(["stopped", "speed1", "speed3"]);
  var q;
  if (mode === "stopped") {
    q = mcq("The graph shows a cyclist's position over 30 s. Between 10 s and 20 s the cyclist is",
      "stopped: the position stays at 30 m, so the slope (velocity) is zero",
      ["moving at a constant 3.0 m/s", "returning toward the start", "speeding up steadily"],
      "A flat section on a position-time graph means position is not changing: velocity is the slope, and the slope here is 0. The cyclist rides out for 10 s, rests for 10 s, then rides partway back.", { mode: mode });
  } else if (mode === "speed1") {
    q = mcq("Using the graph, the cyclist's velocity during the first 10 s is",
      "3.0 m/s", ["30 m/s", "0.33 m/s", "10 m/s"],
      "Velocity is the slope: (30 - 0) m / (10 - 0) s = 3.0 m/s. Reading the final position (30) alone, or inverting the division, are the two standard errors this question traps.", { mode: mode });
  } else {
    q = mcq("During the last 10 s of the graph, the cyclist's velocity is",
      "-2.0 m/s: the position falls from 30 m to 10 m, and the negative sign shows motion back toward the start",
      ["2.0 m/s", "-20 m/s", "0 m/s"],
      "Slope = (10 - 30) / 10 = -2.0 m/s. On a position-time graph the sign of the slope is the direction of travel: negative here means heading back toward the reference point.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["On a position-time graph, slope is velocity: rise over run, sign included."]);

E("sci-u3-dt-match", 3, ["SC10.8.9"], 2, "gen", function () {
  var lines = [
    { pts: [[0, 0], [10, 40]], col: S6_INK, label: "P", labelPt: [9, 42] },
    { pts: [[0, 0], [10, 15]], col: S6_ACC, label: "Q", labelPt: [9, 11] },
    { pts: [[0, 30], [10, 30]], col: S6_ALT, label: "R", labelPt: [9, 33] }
  ];
  var fig = s6GraphSVG({ xMax: 10, yMax: 50, xStep: 2, yStep: 10, xLab: "time (s)", yLab: "position (m)", lines: lines });
  var mode = s6pick(["fastest", "still", "startahead"]);
  var q;
  if (mode === "fastest") {
    q = mcq("Three objects' motions are graphed. Which line shows the fastest constant velocity?",
      "P: it has the steepest slope, covering 40 m in 10 s (4.0 m/s)",
      ["Q: it stays lowest on the graph", "R: it is already farthest from the start", "All three are equal because the lines are all straight"],
      "Steepness is speed on this graph type. P's slope is 4.0 m/s, Q's is 1.5 m/s, and R is flat (stopped). Starting position (R's head start) says nothing about speed.", { mode: mode });
  } else if (mode === "still") {
    q = mcq("Which line shows an object that is not moving?",
      "R: its position stays at 30 m for the whole 10 s",
      ["P: it ends farthest along", "Q: it moves the least distance", "None: every line on a motion graph shows movement"],
      "No change in position means no motion: R's flat line is a stopped object that started 30 m from the reference point. Q moves slowly but genuinely (15 m in 10 s).", { mode: mode });
  } else {
    q = mcq("Which object started farthest from the reference point?",
      "R: its line begins at 30 m at t = 0",
      ["P: its line ends highest", "Q: its line is in the middle", "They all started together at the origin"],
      "Starting position is read where the line meets the position axis (t = 0): R begins at 30 m, while P and Q both begin at 0. Where a line ends tells you the final position, not the start.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Read three things separately: intercept is the start, slope is the velocity, flat means stopped."]);

E("sci-u3-dt-slope", 3, ["SC10.8.9"], 3, "gen", function () {
  var v = s6pick([1.5, 2.0, 2.5, 4.0, 5.0]);
  var t1 = s6pick([4, 5, 6]);
  var t2 = t1 + s6pick([8, 10, 12]);
  var d1 = v * t1, d2 = v * t2;
  var pts = [[0, 0], [t1, d1], [t2, d2]];
  var fig = s6GraphSVG({ xMax: t2 + 2, yMax: d2 + 10, xStep: s6niceStep(t2 + 2), yStep: s6niceStep(d2 + 10), xLab: "time (s)", yLab: "position (m)", lines: [{ pts: pts, col: S6_INK }], dots: pts });
  var key = s6sf(v, 2);
  var q = mcq("A student's steady walk is graphed. Calculate the student's velocity from the slope between the marked points (" + t1 + " s, " + d1 + " m) and (" + t2 + " s, " + d2 + " m).",
    key + " m/s", [s6sf(1 / v, 2) + " m/s", s6sf(d2 / t2 === v ? v * 2 : d2 / t2, 2) + " m/s", s6sf(d2 - d1, 2) + " m/s"],
    "Slope = rise/run = (" + d2 + " - " + d1 + ") m / (" + t2 + " - " + t1 + ") s = " + (d2 - d1) + " / " + (t2 - t1) + " = " + key + " m/s. Use the changes between the two points, not a single point's values, and never flip the division.",
    { v: v, key: key });
  q.figure = fig;
  return q;
}, ["Pick two points on the line, subtract in the same order top and bottom, then divide."]);

/* ---------- SC10.8.10 Instantaneous vs average ---------- */

E("sci-u3-inst-avg", 3, ["SC10.8.10"], 2, "var", varset([
  function () {
    return mcq("A car's speedometer reads 62 km/h at the instant it passes a sign. That reading is the car's",
      "instantaneous speed: its speed at that one moment",
      ["average speed for the whole trip", "average velocity for the whole trip", "acceleration at the sign"],
      "A speedometer reports the moment-by-moment speed, not any trip average. Average values are computed afterward from totals (total distance over total time) and can differ a lot from what the needle showed at any instant.", {});
  },
  function () {
    return mcq("A bus completes a route with an average velocity of 8.0 m/s [east]. Which statement must be true?",
      "Its displacement divided by its travel time equals 8.0 m/s [east]; its speedometer may have read many different values along the way",
      ["Its speedometer read exactly 8.0 m/s at every moment", "It never stopped during the route", "Its instantaneous velocity was 8.0 m/s [east] at the midpoint"],
      "An average is a totals statement, not a moment-by-moment claim: stops, starts and speed changes all fold into it. Only the ratio of total displacement to total time is fixed by the average.", {});
  },
  function () {
    return mcq("On a position-time graph, the instantaneous velocity at a point on a CURVED line is found from",
      "the slope of the tangent line drawn touching the curve at that point",
      ["the slope of the line from the origin to that point", "the position value at that point divided by the total trip time", "the steepest slope anywhere on the curve"],
      "A curve's slope changes from point to point, so each point has its own tangent. The origin-to-point line gives the average velocity up to that moment, a useful number, but a different one.", {});
  }
]), ["Instantaneous is a moment; average is a summary. The speedometer shows the first, the trip totals give the second."]);

E("sci-u3-dt-instant", 3, ["SC10.8.10"], 3, "gen", function () {
  var a = s6pick([0.40, 0.50, 0.60, 0.80]);
  var t0 = s6pick([4, 6]);
  var T = 10;
  var dmax = 0.5 * a * T * T;
  var slope = a * t0;
  var d0 = 0.5 * a * t0 * t0;
  var tx1 = Math.max(0, t0 - 2.5), tx2 = Math.min(T, t0 + 2.5);
  var ty1 = d0 + slope * (tx1 - t0), ty2 = d0 + slope * (tx2 - t0);
  var yM = Math.ceil(dmax) + 4;
  var fig = s6GraphSVG({ xMax: T, yMax: yM, xStep: 2, yStep: s6niceStep(yM), xLab: "time (s)", yLab: "position (m)",
    lines: [
      { fn: function (x) { return 0.5 * a * x * x; }, col: S6_INK },
      { pts: [[tx1, ty1], [tx2, ty2]], col: S6_ALT }
    ], dots: [[t0, d0]] });
  var key = s6sf(slope, 2);
  var avg = s6sf(dmax / T, 2);
  var half = s6sf(slope / 2, 2);
  var q = mcq("A cart accelerating from rest follows the curved position-time graph shown. The straight line is the tangent at t = " + t0 + " s. The cart's instantaneous velocity at t = " + t0 + " s is",
    key + " m/s", s6dis(key, [avg, half, s6sf(d0, 2), s6sf(slope * 1.5, 2)], 3).map(function (x) { return x + " m/s"; }),
    "Instantaneous velocity is the tangent's slope. The tangent rises " + s6sf(slope * 5, 2) + " m over its 5 s span, giving " + key + " m/s. The " + avg + " m/s option is the average velocity over the whole 10 s, and " + half + " m/s comes from d/t at the point itself, neither of which is the tangent slope.",
    { a: a, t0: t0, key: key });
  q.figure = fig;
  return q;
}, ["Curved position graph means changing velocity: draw (or use) the tangent at the instant you care about."]);

/* ---------- SC10.8.11 Velocity-time graphs ---------- */

function s6vtBase() {
  return [
    { from: 0, to: 6, dur: 5 },
    { from: 6, to: 6, dur: 5 },
    { from: 6, to: 0, dur: 3 }
  ];
}
function s6vtGraph(segs, yMax, title) {
  var pts = [[0, segs[0].from]];
  var t = 0;
  segs.forEach(function (s) { t += s.dur; pts.push([t, s.to]); });
  var ym = yMax || 8;
  return s6GraphSVG({ xMax: t, yMax: ym, xStep: s6niceStep(t), yStep: s6niceStep(ym), xLab: "time (s)", yLab: "velocity (m/s)", lines: [{ pts: pts, col: S6_INK }] });
}
E("sci-u3-vt-read", 3, ["SC10.8.11"], 2, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var mode = s6pick(["const", "decel", "value"]);
  var q;
  if (mode === "const") {
    q = mcq("The velocity-time graph shows a scooter trip. Between 5 s and 10 s the scooter is",
      "travelling at a constant velocity of 6 m/s (zero acceleration)",
      ["stopped", "speeding up steadily", "slowing down steadily"],
      "The line is flat at 6 m/s across that stretch: velocity is not changing, so acceleration is zero. Flat on a velocity graph means steady motion, not rest (flat at zero would be rest).", { mode: mode });
  } else if (mode === "decel") {
    q = mcq("Between 10 s and 13 s, the scooter's motion is",
      "slowing down at a steady rate until it stops",
      ["speeding up", "moving backwards", "stopped for the whole segment"],
      "The velocity falls steadily from 6 m/s to 0: steady deceleration to a stop. It reaches zero only at the final instant, so 'stopped throughout' misreads the graph; and a falling positive velocity is slowing, not reversing.", { mode: mode });
  } else {
    q = mcq("At t = 2 s, the scooter's velocity is",
      "about 2.4 m/s: the line rises steadily from 0 to 6 m/s over the first 5 s",
      ["6 m/s", "0 m/s", "about 12 m/s"],
      "Read the value off the rising line: it gains 6 m/s in 5 s (1.2 m/s each second), so at 2 s it reads about 2.4 m/s. The peak value (6) is not reached until 5 s.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["On a velocity-time graph, the height is the velocity itself: read it before you compute anything."]);

E("sci-u3-vt-area", 3, ["SC10.8.11"], 3, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var q = mcq("Using the velocity-time graph of the scooter trip (velocity rises 0 to 6 m/s over 5 s, stays 6 m/s for 5 s, then falls to 0 over 3 s), the total displacement is",
    "54 m", ["78 m", "39 m", "93 m"],
    "Displacement equals the area under a velocity-time graph. Split it into shapes: triangle 0.5 x 5 x 6 = 15 m, rectangle 5 x 6 = 30 m, triangle 0.5 x 3 x 6 = 9 m. Total = 15 + 30 + 9 = 54 m. Peak times total time (78) overcounts because the scooter was below peak speed for most of the trip.",
    { total: 54 });
  q.figure = fig;
  return q;
}, ["Area under a velocity-time graph is displacement: cut it into triangles and rectangles."]);

E("sci-u3-vt-accel", 3, ["SC10.8.11", "SC10.8.12"], 3, "gen", function () {
  var fig = s6vtGraph(s6vtBase());
  var mode = s6pick(["up", "down"]);
  var q;
  if (mode === "up") {
    q = mcq("From the velocity-time graph, the scooter's acceleration during the first 5 s is",
      "1.2 m/s²: the slope of the rising section, (6 - 0) / 5",
      ["6 m/s²", "30 m/s²", "0.83 m/s²"],
      "Acceleration is the slope of a velocity-time graph: rise 6 m/s over run 5 s gives 1.2 m/s². The inverted division (5/6) and the product are the standard traps.", { mode: mode });
  } else {
    q = mcq("From the velocity-time graph, the scooter's acceleration during the final 3 s is",
      "-2.0 m/s²: the slope of the falling section, (0 - 6) / 3",
      ["2.0 m/s²", "-6 m/s²", "-0.5 m/s²"],
      "Slope of the falling section: change in velocity -6 m/s over 3 s = -2.0 m/s². The negative sign carries the meaning: velocity shrinking in the positive direction. Dropping the sign erases the physics.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Slope of velocity-time is acceleration; area under it is displacement. The two readings answer different questions."]);

E("sci-u3-scale", 3, ["SC10.8.8"], 2, "gen", function () {
  var tri = s6pick([[3, 4, 5], [6, 8, 10]]);
  var cmA = tri[0], cmB = tri[1], cmC = tri[2];
  var scaleM = s6pick([2, 5, 10]);
  var s = '<svg viewBox="0 0 340 240" width="340" role="img" aria-label="Scale diagram of a displacement">';
  s += '<line x1="60" y1="190" x2="' + (60 + cmA * 22) + '" y2="190" stroke="' + S6_INK + '" stroke-width="2.5"/>';
  s += '<line x1="' + (60 + cmA * 22) + '" y1="190" x2="' + (60 + cmA * 22) + '" y2="' + (190 - cmB * 22) + '" stroke="' + S6_INK + '" stroke-width="2.5"/>';
  s += '<line x1="60" y1="190" x2="' + (60 + cmA * 22) + '" y2="' + (190 - cmB * 22) + '" stroke="' + S6_ALT + '" stroke-width="2.5" stroke-dasharray="6 4"/>';
  s += s6txt(60, 206, "start", 11);
  s += s6txt(60 + cmA * 11, 206, cmA + " cm", 11);
  s += s6txt(66 + cmA * 22, 195 - cmB * 11, cmB + " cm", 11);
  s += s6txt(60 + cmA * 11, 178 - cmB * 11, "displacement", 11, false, "middle", S6_ALT);
  s += "</svg>";
  var disp = cmC * scaleM, dist = (cmA + cmB) * scaleM;
  var q = mcq("A scale diagram of a walk uses the scale 1 cm represents " + scaleM + " m. The drawn path goes " + cmA + " cm east, then " + cmB + " cm north (dashed line = displacement). The walker's actual displacement is",
    disp + " m", s6dis(disp + " m", [dist + " m", (cmC + cmA) * scaleM + " m", (cmC - 1) * scaleM + " m", (cmA * scaleM + cmB) + " m", (cmC + 2) * scaleM + " m"], 3),
    "Measure the dashed displacement on the diagram: with legs of " + cmA + " cm and " + cmB + " cm it measures " + cmC + " cm (a " + cmA + "-" + cmB + "-" + cmC + " triangle). Convert with the scale: " + cmC + " cm x " + scaleM + " m/cm = " + disp + " m. The " + dist + " m option is the total distance, found from the solid path instead.",
    { disp: disp });
  q.figure = s;
  return q;
}, ["Scale diagrams are measurements: measure the drawing, then convert with the scale. Displacement uses the straight dashed line."]);

/* ---------- SC10.8.12 Acceleration ---------- */

E("sci-u3-accel-calc", 3, ["SC10.8.12"], 2, "gen", function () {
  var sc = [
    { ctx: "A car merges onto the highway", unit: "m/s" },
    { ctx: "A sprinter leaves the blocks", unit: "m/s" },
    { ctx: "A puck slides and is checked by friction (speeds given as positive magnitudes in the direction of travel)", unit: "m/s" }
  ];
  var it = s6pick(sc);
  var vi = s6pick([0, 2.0, 5.0, 8.0]);
  var dv = s6pick([6.0, 9.0, 12.0, 15.0]);
  var vf = vi + dv;
  var t = s6pick([3.0, 4.0, 5.0, 6.0]);
  var a = dv / t;
  var sf = Math.min(s6countSF(dv.toFixed(1)), s6countSF(t.toFixed(1)));
  var key = s6sf(a, sf);
  var q = mcq(it.ctx + ", changing velocity from " + vi.toFixed(1) + " m/s to " + vf.toFixed(1) + " m/s in " + t.toFixed(1) + " s. Its acceleration is",
    key + " m/s²",
    s6dis(key, [s6sf(vf / t, sf), s6sf(t / dv, sf), s6sf(a, sf + 1), s6sf(a * 2, sf), s6sf(a / 2, sf)], 3).map(function (x) { return x + " m/s²"; }),
    "a = (v_f - v_i) / t = (" + vf.toFixed(1) + " - " + vi.toFixed(1) + ") / " + t.toFixed(1) + " = " + dv.toFixed(1) + " / " + t.toFixed(1) + " = " + key + " m/s². Using the final velocity alone instead of the change is the most common error here.",
    { a: a, key: key });
  return q;
}, ["Acceleration uses the CHANGE in velocity: final minus initial, then divide by time."]);

E("sci-u3-accel-solve", 3, ["SC10.8.12"], 2, "gen", function () {
  var mode = s6pick(["findVf", "findT"]);
  var vi = s6pick([3.0, 6.0, 10.0]);
  var a = s6pick([1.5, 2.0, 2.5, 3.0]);
  var t = s6pick([4.0, 5.0, 8.0]);
  var vf = vi + a * t;
  var sf = 2;
  if (mode === "findVf") {
    return mcq("A cyclist rolling at " + vi.toFixed(1) + " m/s accelerates at " + a.toFixed(1) + " m/s² for " + t.toFixed(1) + " s. The final velocity is",
      s6sf(vf, sf) + " m/s", s6dis(s6sf(vf, sf), [s6sf(vi + a / t * 10, sf), s6sf(a * t, sf), s6sf(vf, 3), s6sf(vf + a, sf), s6sf(vi * t / 2, sf)], 3).map(function (x) { return x + " m/s"; }),
      "v_f = v_i + a t = " + vi.toFixed(1) + " + (" + a.toFixed(1) + " x " + t.toFixed(1) + ") = " + vi.toFixed(1) + " + " + s6sf(a * t, sf) + " = " + s6sf(vf, sf) + " m/s. The a t term alone is the change in velocity, not the final velocity: the starting velocity must be added.",
      { mode: mode });
  }
  return mcq("A cart starts at " + vi.toFixed(1) + " m/s and accelerates at " + a.toFixed(1) + " m/s² until it reaches " + vf.toFixed(1) + " m/s. How long does this take?",
    s6sf(t, sf) + " s", s6dis(s6sf(t, sf), [s6sf(vf / a, sf), s6sf((vf - vi) * a, sf), s6sf(t, 3), s6sf(t * 2, sf), s6sf(vf - vi, sf)], 3).map(function (x) { return x + " s"; }),
    "From a = (v_f - v_i)/t, rearrange: t = (v_f - v_i)/a = (" + vf.toFixed(1) + " - " + vi.toFixed(1) + ") / " + a.toFixed(1) + " = " + s6sf(t, sf) + " s. Dividing the final velocity alone forgets the cart was already moving.",
    { mode: mode });
}, ["Write the relationship first (a = Δv/t or v_f = v_i + at), then solve for the unknown before touching numbers."]);

E("sci-u3-accel-concept", 3, ["SC10.8.12"], 2, "var", varset([
  function () {
    return mcq("A car travelling east slows down for a stop sign. Taking east as positive, its acceleration is",
      "negative: the velocity (positive) is shrinking, so the change in velocity points west",
      ["positive: acceleration is always positive when a car moves forward", "zero: slowing down is not accelerating", "positive and equal to its speed"],
      "Acceleration is the rate of change of velocity, and slowing down is a change. The velocity change (final minus initial) is negative for an eastbound car braking, so the acceleration is negative: directed opposite the motion.", {});
  },
  function () {
    return mcq("Which object is definitely accelerating?",
      "A car rounding a curve at a steady 50 km/h: its direction changes, and velocity includes direction",
      ["A car parked with the engine off", "A train moving in a straight line at a constant 80 km/h", "A book sitting on a desk"],
      "Velocity is speed with direction, so changing direction at constant speed is still a velocity change, which is acceleration. Only the curve qualifies; the others have constant (or zero) velocity.", {});
  },
  function () {
    return mcq("An acceleration of -3.0 m/s² for an object moving in the positive direction means",
      "each second, its velocity drops by 3.0 m/s",
      ["it moves backwards at 3.0 m/s", "it travels 3.0 m every second", "its velocity is -3.0 m/s"],
      "Acceleration is measured in velocity change per second: -3.0 m/s² subtracts 3.0 m/s from the velocity every second while the sign convention holds. It says nothing directly about the current velocity, which could still be large and positive.", {});
  }
]), ["Acceleration is about change: speeding up, slowing down, or turning all count."]);

/* ---------- Unit 3 CR ---------- */

E("sci-u3-cr-trip", 3, ["SC10.8.8"], 2, "var", varset([
  function () {
    return textq("A trip in two legs (4 marks)\nA student walks 240 m east to a store in 200 s, then walks 60 m back west toward home in 75 s.\n(a) Calculate the total distance travelled. (1)\n(b) Calculate the student's displacement for the whole trip, with direction. (1)\n(c) Calculate the average speed for the whole trip. (1)\n(d) Calculate the average velocity for the whole trip. (1)", ["(a) Distance = 240 + 60 = 300 m."], 
      "(a) Distance = 240 + 60 = 300 m. (b) Displacement = 240 - 60 = 180 m [east]. (c) Average speed = 300 m / 275 s = 1.1 m/s. (d) Average velocity = 180 m [east] / 275 s = 0.65 m/s [east]. (Total time 200 + 75 = 275 s; answers to 2 significant figures as the data warrant.)", 
      {});
  },
  function () {
    return textq("Training laps (4 marks)\nA runner on a straight out-and-back course runs 400 m north in 100 s, turns, and runs 400 m south in 125 s, finishing exactly at the start.\n(a) Calculate the total distance run. (1)\n(b) State the runner's displacement for the full run, and explain the value. (1)\n(c) Calculate the average speed for the full run. (1)\n(d) State the average velocity for the full run, and explain why it differs from the average speed. (1)", ["(a) Distance = 400 + 400 = 800 m."], 
      "(a) Distance = 400 + 400 = 800 m. (b) Displacement = 0 m: the finish is the start, so the straight-line change in position is zero. (c) Average speed = 800 m / 225 s = 3.6 m/s. (d) Average velocity = 0 m / 225 s = 0 m/s. It differs because average velocity divides displacement (zero here), while average speed divides distance (800 m); the two quantities agree only for straight-line motion with no reversal.", 
      {});
  },
  function () {
    return textq("Comparing two drivers (4 marks)\nMaya drives for 2.00 hours at a steady 68.0 km/h. Tomas drives for 120 minutes at a steady 19.0 m/s.\n(a) Convert Tomas's speed to kilometres per hour. (1)\n(b) Who is travelling faster, and by how much? (1)\n(c) Calculate the distance Maya travels. (1)\n(d) Calculate the distance Tomas travels in his 120 minutes. (1)",
      ["(a) 19.0 x 3.6 = 68.4 km/h. (b) Tomas, by 0.4 km/h. (c) 136 km. (d) 136.8 km (about 137 km)"],
      "(a) 19.0 m/s x 3.6 = 68.4 km/h. (b) Tomas is faster, by 68.4 - 68.0 = 0.4 km/h: the comparison is only possible once both speeds share a unit. (c) Maya: d = v x t = 68.0 km/h x 2.00 h = 136 km. (d) Tomas: 120 min = 7200 s; d = 19.0 m/s x 7200 s = 136 800 m = 136.8 km. The slightly faster driver covers slightly more ground in the same time, as (b) predicts.",
      {});
  },
  function () {
    return textq("A warden's patrol (4 marks)\nA park warden walks 350 m north in 250 s, then 150 m south in 100 s, then 100 m north in 80 s.\n(a) Calculate the total distance walked. (1)\n(b) Calculate the warden's displacement for the whole patrol. (1)\n(c) Calculate the average speed for the patrol. (1)\n(d) Calculate the average velocity for the patrol. (1)",
      ["(a) 600 m. (b) 300 m [north]. (c) 1.4 m/s. (d) 0.70 m/s [north]"],
      "(a) Distance = 350 + 150 + 100 = 600 m. (b) Displacement = 350 - 150 + 100 = 300 m [north] (north taken as positive). (c) Total time = 250 + 100 + 80 = 430 s; average speed = 600 / 430 = 1.4 m/s. (d) Average velocity = 300 m [north] / 430 s = 0.70 m/s [north]. The southward leg cancels part of the northward progress, so the average velocity comes out well below the average speed even though the warden's walking pace was steady throughout.",
      {});
  }
]), ["Show the formula, the substitution and the unit in every part; direction is part of any displacement or velocity answer."]);

E("sci-u3-cr-dtgraph", 3, ["SC10.8.9"], 3, "var", varset([
  function () {
    var segs = [
      { from: 0, to: 20, dur: 10 },
      { from: 20, to: 20, dur: 5 },
      { from: 20, to: 0, dur: 10 }
    ];
    var q = textq("Interpreting a position-time graph (3 marks)\nThe graph shows a dog's position east of its home over 25 s.\n(a) Describe the dog's motion in each of the three sections of the graph. (1)\n(b) Calculate the dog's velocity in the first section. (1)\n(c) Calculate the dog's velocity in the last section, and explain what the sign of your answer means. (1)", ["(a) 0 to 10 s: moves steadily east away from home, reaching 20 m."], 
      "(a) 0 to 10 s: moves steadily east away from home, reaching 20 m. 10 to 15 s: stopped at 20 m (flat line). 15 to 25 s: moves steadily back west, arriving home at 25 s. (b) Slope = 20 m / 10 s = 2.0 m/s [east]. (c) Slope = (0 - 20) m / 10 s = -2.0 m/s. The negative sign means the velocity is directed west, back toward the reference point (home); the speed is the same 2.0 m/s as the first section, only the direction differs.", 
      {});
    q.figure = s6dtGraph(segs, "Position vs time: the dog");
    return q;
  },
  function () {
    var segs = [
      { from: 0, to: 12, dur: 4 },
      { from: 12, to: 24, dur: 8 },
      { from: 24, to: 24, dur: 4 }
    ];
    var q = textq("Interpreting a position-time graph (3 marks)\nThe graph shows a remote-controlled car's position over 16 s.\n(a) In which section is the car moving fastest? Justify with the slopes. (1)\n(b) Calculate the car's velocity in the second section. (1)\n(c) Calculate the car's average velocity over the whole 16 s. (1)", ["(a) First section: its slope is 12/4 = 3.0 m/s, steeper than the second section's 12/8 = 1.5 m/s; the third section is flat (stopped)."], 
      "(a) First section: its slope is 12/4 = 3.0 m/s, steeper than the second section's 12/8 = 1.5 m/s; the third section is flat (stopped). (b) (24 - 12) m / (12 - 4) s = 12/8 = 1.5 m/s. (c) Total displacement 24 m over 16 s = 1.5 m/s. (The average lands on the second section's value by coincidence of these numbers; the method, total displacement over total time, is what earns the mark.)", 
      {});
    q.figure = s6dtGraph(segs, "Position vs time: RC car");
    return q;
  }
]), ["Slope calculations earn the marks: show the two points you used and keep the direction sign."]);

E("sci-u3-cr-vtgraph", 3, ["SC10.8.11", "SC10.8.12"], 3, "var", varset([
  function () {
    var segs = [
      { from: 0, to: 8, dur: 4 },
      { from: 8, to: 8, dur: 6 },
      { from: 8, to: 0, dur: 4 }
    ];
    var q = textq("Interpreting a velocity-time graph (3 marks)\nThe graph shows a cyclist's velocity over 14 s.\n(a) Calculate the cyclist's acceleration in the first 4 s. (1)\n(b) Calculate the total displacement for the trip using the area under the graph. (1)\n(c) Describe the motion in the final 4 s, including the acceleration. (1)", ["(a) Slope = (8 - 0) m/s / 4 s = 2.0 m/s²."], 
      "(a) Slope = (8 - 0) m/s / 4 s = 2.0 m/s². (b) Area = triangle (0.5 x 4 x 8 = 16) + rectangle (6 x 8 = 48) + triangle (0.5 x 4 x 8 = 16) = 80 m. (c) The cyclist slows steadily from 8 m/s to a stop: acceleration = (0 - 8)/4 = -2.0 m/s², the negative sign showing deceleration in the original direction. The braking is exactly as strong as the starting acceleration, in the opposite sense.", 
      {});
    q.figure = s6vtGraph(segs, 10, "Velocity vs time: the cyclist");
    return q;
  },
  function () {
    var segs = [
      { from: 2, to: 10, dur: 4 },
      { from: 10, to: 10, dur: 4 },
      { from: 10, to: 4, dur: 6 }
    ];
    var q = textq("Interpreting a velocity-time graph (3 marks)\nThe graph shows a ferry's velocity leaving a dock over 14 s (the ferry is already moving at 2 m/s when timing starts).\n(a) Calculate the ferry's displacement in the first 8 s. (1)\n(b) Calculate the acceleration in the final 6 s. (1)\n(c) Explain why the displacement cannot be found by multiplying the final velocity by the total time. (1)", ["(a) Area 0 to 8 s = trapezoid under the rise (average velocity (2 + 10)/2 = 6 m/s over 4 s = 24 m) + rectangle (4 x 10 = 40 m) = 64 m."], 
      "(a) Area 0 to 8 s = trapezoid under the rise (average velocity (2 + 10)/2 = 6 m/s over 4 s = 24 m) + rectangle (4 x 10 = 40 m) = 64 m. (b) Slope = (4 - 10) m/s / 6 s = -1.0 m/s². (c) The velocity changes through most of the trip, so no single velocity multiplied by the time gives the displacement; only the area under the curve accounts for every moment's velocity. Final velocity x time (10 x 14 = 140 m) would badly overcount, since the ferry spent much of the trip below 10 m/s.", 
      {});
    q.figure = s6vtGraph(segs, 12, "Velocity vs time: the ferry");
    return q;
  }
]), ["Slope for acceleration, area for displacement: state which reading you are using before you compute."]);

/* ---------- Unit 3 depth additions ---------- */

E("sci-u3-motion-vocab", 3, ["SC10.8.8"], 1, "var", varset([
  function () {
    return mcq("In motion studies, a position measurement is always made relative to",
      "a reference point: the fixed place chosen as 'zero' that all positions are measured from",
      ["the moving object itself", "the North Pole in every problem", "wherever the object stops"],
      "Position has no meaning without an origin: '3 m' only locates something when you know 3 m from what, and in which direction. Changing the reference point changes every position value but no distances travelled.", {});
  },
  function () {
    return mcq("An object is in motion when",
      "its position changes relative to a reference point as time passes",
      ["it makes a sound", "its engine is running", "it feels like it is moving to a passenger"],
      "Motion is defined by changing position, full stop. A parked car with the engine running is not in motion; a passenger on a smooth train may feel still while their position changes rapidly. Feelings and engines are not part of the definition.", {});
  }
]), ["Position needs a reference point the way a price needs a currency."]);

E("sci-u3-speed-simple", 3, ["SC10.8.7"], 1, "gen", function () {
  var pairs = [[100, 20], [60, 12], [150, 30], [45, 9], [200, 25], [80, 16], [36, 6], [90, 15]];
  var p = s6pick(pairs);
  var v = p[0] / p[1];
  return mcq("A ball rolls " + p[0] + " m in " + p[1] + " s at a steady rate. Its speed is",
    v + " m/s", [v + 2, v * 2, Math.max(1, v - 2)].map(function (x) { return x + " m/s"; }),
    "Speed = distance / time = " + p[0] + " / " + p[1] + " = " + v + " m/s.", { v: v });
}, ["One division: distance over time."]);

E("sci-u3-dt-shapes", 3, ["SC10.8.9"], 1, "var", varset([
  function () {
    return mcq("On a position-time graph, a straight diagonal line (constant slope) tells you the object is",
      "moving at a constant velocity: equal distances in equal times",
      ["speeding up", "slowing down", "stopped"],
      "Constant slope means constant velocity, since slope IS velocity on this graph. A curve bending upward means speeding up; bending toward flat means slowing down; a flat line is stopped.", {});
  },
  function () {
    return mcq("A position-time graph curves upward, getting steeper and steeper. The object is",
      "speeding up: the slope (velocity) grows as time passes",
      ["moving at constant velocity", "slowing down", "returning to its start"],
      "Steepening slope is growing velocity. Read any curve by asking what the slope is doing: rising slope, speeding up; falling slope, slowing down; steady slope, steady speed.", {});
  }
]), ["Slope behaviour is the whole reading: steady, steepening, flattening or flat."]);

E("sci-u3-accel-plain", 3, ["SC10.8.12"], 1, "var", varset([
  function () {
    return mcq("Which situation involves the greatest acceleration, judged by how quickly velocity changes?",
      "A puck that goes from 0 to 20 m/s in 2 s",
      ["A car that goes from 0 to 20 m/s in 10 s", "A cyclist who gains 5 m/s over 5 s", "A boat that gains 8 m/s over 8 s"],
      "Acceleration is velocity change per second: the puck gains 10 m/s every second; the car 2; the cyclist 1; the boat 1. Same final speed as the car, one fifth of the time: five times the acceleration.", {});
  },
  function () {
    return mcq("A motion described as 'uniform' (constant velocity) has an acceleration of",
      "zero: the velocity is not changing at all",
      ["9.8 m/s², like gravity", "whatever the velocity is", "one, by definition"],
      "Acceleration measures change: no change in speed and no change in direction means no acceleration, however fast the object travels. A cruising airliner at 900 km/h in a straight line has zero acceleration.", {});
  }
]), ["Big acceleration means velocity changing fast, not velocity being big."]);

E("sci-u3-round-trip", 3, ["SC10.8.8"], 3, "gen", function () {
  var combos = [[10, 6], [12, 8], [8, 4], [15, 10], [9, 6]];
  var c = s6pick(combos);
  var vOut = c[0], vBack = c[1];
  var d = 120;
  var tTot = d / vOut + d / vBack;
  var avg = 2 * d / tTot;
  var key = s6sf(avg, 2);
  var naive = s6sf((vOut + vBack) / 2, 2);
  return mcq("A kayaker paddles 120 m across a pond at " + vOut + " m/s and returns the same 120 m at " + vBack + " m/s. The average speed for the round trip is",
    key + " m/s", [naive + " m/s", s6sf(vOut, 2) + " m/s", s6sf(2 * d / (d / vOut), 2) + " m/s"],
    "Average speed is total distance over total time: time out = 120/" + vOut + " = " + s6sf(d / vOut, 3) + " s; time back = 120/" + vBack + " = " + s6sf(d / vBack, 3) + " s; average = 240 / " + s6sf(tTot, 3) + " = " + key + " m/s. Simply averaging the two speeds (" + naive + ") is wrong because more time is spent at the slower speed.",
    { avg: avg, key: key });
}, ["Round trips punish the naive average: you spend longer at the slow speed, so it counts for more."]);
