// Math 9 Unit 8 Circle Geometry question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 4730 to 4980).
// CRMARKS: u8-tangent-length=3
// CRMARKS: u8-chord-length=3
// CRMARKS: u8-inscribed-reflex=3
// CRMARKS: u8-semicircle-angle=2
// CRMARKS: u8-same-arc-angles=2
// CRMARKS: u8-chord-two-step=3
// CRMARKS: u8-tangent-central-inscribed=2
E("u8-tangent-right-angle", 8, ["9.4"], 1, "gen", function () {
  var tAng = pick([160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 10, 25]);
  var r = pick([4, 5, 6, 7, 8, 9, 10, 12]);
  var T = u8P(tAng);
  var fig = u8Fig({ pts: { T: T }, segs: [["O", "T"]], tangentAt: "T", sideLabs: [{ a: "O", b: "T", text: fmt(r) + " cm", off: 15 }] });
  var prompt = "The diagram shows a circle with centre O. The straight line through T is a tangent: a tangent is a line that touches the circle at exactly one point. OT is a radius of length \\(" + fmt(r) + "\\) cm. Which statement is true?";
  var solution = "The radius to a point of tangency is perpendicular to the tangent line. OT meets the tangent at T, so the angle between them is <b>\\(90^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "The angle between OT and the tangent at T is \\(90^{\\circ}\\).", fb: "Correct. A radius to a point of tangency is perpendicular to the tangent." },
    [
      { t: "The angle between OT and the tangent at T is \\(45^{\\circ}\\).", fb: "The radius meets a tangent at a right angle, not at \\(45^{\\circ}\\)." },
      { t: "OT is parallel to the tangent line.", fb: "OT meets the tangent at T, so the two lines are not parallel." },
      { t: "The tangent touches the circle at two points.", fb: "A tangent touches a circle at exactly one point, here the point T." }
    ],
    solution, { mode: "tangent-right-angle", tAng: tAng, r: r });
  q.figure = fig;
  return q;
}, ["Use the tangent property: what angle does a radius make with a tangent at the point where it touches?", "The radius OT ends at T, the exact point where the tangent touches the circle."]);

// 2. 9.4 L2 num, CR 3: tangent length from a right triangle with a triple.
E("u8-tangent-length", 8, ["9.4"], 1, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var legA = tr[0] * k, legB = tr[1] * k, hyp = tr[2] * k;
  var swap = Math.random() < 0.5;
  var OT = swap ? legB : legA, PT = swap ? legA : legB, OP = hyp;
  var mode = pick(["PT", "OP", "OT"]);
  var tAng = pick([205, 225, 245, 290, 310, 330]);
  var T = u8P(tAng), th = tAng * Math.PI / 180;
  var td = [-Math.sin(th), Math.cos(th)];
  if (Math.random() < 0.5) { td = [-td[0], -td[1]]; }
  var P = [T[0] + td[0] * (PT / OT), T[1] + td[1] * (PT / OT)];
  var vals = { OT: OT, PT: PT, OP: OP };
  var lab = function (n) { return n === mode ? "?" : fmt(vals[n]) + " cm"; };
  var fig = u8Fig({
    pts: { T: T, P: P }, segs: [["O", "T"], ["O", "P"]], tangentSeg: { at: "T", to: "P", beyond: 1.1, back: 0.3 },
    rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }],
    sideLabs: [{ a: "O", b: "T", text: lab("OT") }, { a: "T", b: "P", text: lab("PT") }, { a: "O", b: "P", text: lab("OP") }]
  });
  var given, ask, sol;
  if (mode === "PT") {
    given = "\\(OT = " + fmt(OT) + "\\) cm and \\(OP = " + fmt(OP) + "\\) cm"; ask = "PT";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. Use Pythagoras: \\[ \\begin{aligned} PT^{2} &= OP^{2} - OT^{2} \\\\ &= " + fmt(OP) + "^{2} - " + fmt(OT) + "^{2} = " + fmt(OP * OP - OT * OT) + " \\\\ PT &= \\sqrt{" + fmt(OP * OP - OT * OT) + "} = " + fmt(PT) + " \\end{aligned} \\] So the tangent length is <b>" + fmt(PT) + " cm</b>.";
  } else if (mode === "OP") {
    given = "\\(OT = " + fmt(OT) + "\\) cm and \\(PT = " + fmt(PT) + "\\) cm"; ask = "OP";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. OP is the hypotenuse: \\[ \\begin{aligned} OP^{2} &= OT^{2} + PT^{2} \\\\ &= " + fmt(OT) + "^{2} + " + fmt(PT) + "^{2} = " + fmt(OT * OT + PT * PT) + " \\\\ OP &= \\sqrt{" + fmt(OT * OT + PT * PT) + "} = " + fmt(OP) + " \\end{aligned} \\] So the distance is <b>" + fmt(OP) + " cm</b>.";
  } else {
    given = "\\(OP = " + fmt(OP) + "\\) cm and \\(PT = " + fmt(PT) + "\\) cm"; ask = "OT, the radius";
    sol = "Triangle OTP is right-angled at T, because the radius to a point of tangency is perpendicular to the tangent. Use Pythagoras: \\[ \\begin{aligned} OT^{2} &= OP^{2} - PT^{2} \\\\ &= " + fmt(OP) + "^{2} - " + fmt(PT) + "^{2} = " + fmt(OP * OP - PT * PT) + " \\\\ OT &= \\sqrt{" + fmt(OP * OP - PT * PT) + "} = " + fmt(OT) + " \\end{aligned} \\] So the radius is <b>" + fmt(OT) + " cm</b>.";
  }
  var prompt = "In the diagram, P is a point outside the circle with centre O. The line through P and T is a tangent (it touches the circle at exactly one point, T), and " + given + ". Find the length of " + ask + ", in centimetres.";
  var q = numq(prompt, vals[mode], 0.01, sol, { mode: "tangent-" + mode, OT: OT, PT: PT, OP: OP, tAng: tAng });
  q.figure = fig;
  return q;
}, ["The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T.", "Mark the right angle at T, then use the Pythagorean relationship on triangle OTP."]);

// 3. 9.6 L2 MC: the perpendicular from the centre bisects the chord.
E("u8-chord-perp-bisects", 8, ["9.6"], 1, "gen", function () {
  var phi = pick([42, 48, 54, 66, 72, 78, 84, 88]);
  var r = pick([5, 6, 7, 8, 9, 10, 11, 12]);
  var tilt = pick([0, 12, -12, 24]);
  var A = u8Rot(u8P(90 + phi), tilt), B = u8Rot(u8P(90 - phi), tilt);
  var fig = u8Fig({ pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"], sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }] });
  var prompt = "In the diagram, AB is a chord: a chord is a segment joining two points on the circle. The segment from the centre O is drawn perpendicular to AB and meets AB at M. The radius is \\(" + fmt(r) + "\\) cm. Which statement is true?";
  var solution = "The perpendicular from the centre of a circle to a chord bisects the chord, so M is the midpoint of AB and <b>\\(AM = MB\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(AM = MB\\)", fb: "Correct. The perpendicular from the centre bisects the chord, so M is its midpoint." },
    [
      { t: "M is the centre of the circle.", fb: "The centre is O. M is a point on the chord AB." },
      { t: "\\(OM = OA\\)", fb: "M is inside the circle, so OM is shorter than the radius OA, not equal to it." },
      { t: "AB passes through the centre O.", fb: "The chord AB sits away from O; only a diameter passes through the centre." }
    ],
    solution, { mode: "chord-perp-bisects", phi: phi, r: r, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Use the chord property: what does the perpendicular from the centre do to a chord?", "The foot of the perpendicular is M, the point where OM meets AB at a right angle."]);

// 4. 9.6 L2 num, CR 3: chord length from the radius and the distance to the chord.
E("u8-chord-length", 8, ["9.6"], 1, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var tilt = pick([0, 15, -15, 30, -30]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B }, segs: [["A", "B"], ["O", "A"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }, { a: "O", b: "M", text: fmt(d) + " cm", off: 15 }]
  });
  var prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The perpendicular from O meets AB at M, and \\(OM = " + fmt(d) + "\\) cm. Find the length of the chord AB, in centimetres.";
  var solution = "The perpendicular from the centre bisects the chord, so \\(AM = MB\\). Triangle OMA is right-angled at M: \\[ \\begin{aligned} AM^{2} &= OA^{2} - OM^{2} \\\\ &= " + fmt(r) + "^{2} - " + fmt(d) + "^{2} = " + fmt(r * r - d * d) + " \\\\ AM &= " + fmt(half) + " \\\\ AB &= 2 \\times " + fmt(half) + " = " + fmt(2 * half) + " \\end{aligned} \\] So the chord length is <b>" + fmt(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-length", r: r, d: d, half: half, tilt: tilt });
  q.figure = fig;
  return q;
}, ["The perpendicular from the centre to a chord bisects the chord, and it makes a right triangle with a radius.", "Find AM with Pythagoras in triangle OMA, then double it to get the whole chord."]);

// 5. 9.7 L1 num: central angle is twice the inscribed angle on the same arc.
E("u8-central-inscribed", 8, ["9.7"], 1, "gen", function () {
  var th = pick([16, 18, 20, 22, 24, 25, 28, 30, 32, 34, 35, 36, 38, 40, 42, 44, 45, 48, 50, 52, 54, 55, 56, 58, 60, 62, 64, 65, 68, 70, 72]);
  var rot = pick([0, 15, 30, 45, 60, 75, 90, 105]);
  var dbl = Math.random() < 0.5;
  var A = u8P(270 - th + rot), B = u8P(270 + th + rot), C = u8P(90 + rot);
  var cen = 2 * th;
  var aO = [{ v: "O", a1: u8Dir([0, 0], A), a2: u8Dir([0, 0], B), r: 0.3, lr: 0.52, label: dbl ? null : fmt(cen) + "°" }];
  var aC = [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.52, label: dbl ? fmt(th) + "°" : null }];
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: dbl ? aC : aO });
  var prompt, solution, ans;
  if (!dbl) {
    prompt = "In the diagram, O is the centre of the circle. Angle AOB is a central angle (its vertex is at the centre) and it measures \\(" + fmt(cen) + "^{\\circ}\\). Angle ACB is an inscribed angle (its vertex is on the circle) standing on the same arc AB. Find the measure of angle ACB, in degrees.";
    solution = "The central angle on an arc is twice the inscribed angle on the same arc: \\[ \\begin{aligned} \\angle ACB &= " + fmt(cen) + "^{\\circ} \\div 2 \\\\ &= " + fmt(th) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(th) + "^{\\circ}\\)</b>.";
    ans = th;
  } else {
    prompt = "In the diagram, O is the centre of the circle. Angle ACB is an inscribed angle (its vertex is on the circle) and it measures \\(" + fmt(th) + "^{\\circ}\\). Angle AOB is a central angle (its vertex is at the centre) standing on the same arc AB. Find the measure of angle AOB, in degrees.";
    solution = "The central angle on an arc is twice the inscribed angle on the same arc: \\[ \\begin{aligned} \\angle AOB &= 2 \\times " + fmt(th) + "^{\\circ} \\\\ &= " + fmt(cen) + "^{\\circ} \\end{aligned} \\] So angle AOB is <b>\\(" + fmt(cen) + "^{\\circ}\\)</b>.";
    ans = cen;
  }
  var q = numq(prompt, ans, 0.01, solution, { mode: dbl ? "inscribed-to-central" : "central-to-inscribed", th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["The central angle subtending an arc is twice the inscribed angle subtending the same arc.", "Decide whether the asked angle is the double or the half, then calculate."]);

// 6. 9.7 L2 num, CR 3: inscribed angle where the reflex central angle is the one to halve.
E("u8-inscribed-reflex", 8, ["9.7"], 2, "gen", function () {
  var th = pick([22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var rot = pick([0, 20, 40, 60, 80, 100]);
  var mode = pick(["minor", "reflex", "minorC"]);
  var aA = 270 - th + rot, aB = 270 + th + rot;
  var A = u8P(aA), B = u8P(aB);
  var minor = 2 * th, reflex = 360 - minor, ans = reflex / 2;
  var C, angs, prompt, solution;
  if (mode === "minor") {
    C = u8P(90 + rot); ans = th;
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmt(minor) + "°" }];
    prompt = "In the diagram, O is the centre of the circle and the central angle AOB measures \\(" + fmt(minor) + "^{\\circ}\\). Point C is on the major arc AB (the longer arc between A and B). Find the measure of the inscribed angle ACB, in degrees.";
    solution = "Point C is on the major arc, so angle ACB subtends the minor arc AB and is half its central angle: \\[ \\begin{aligned} \\angle ACB &= " + fmt(minor) + "^{\\circ} \\div 2 \\\\ &= " + fmt(th) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(th) + "^{\\circ}\\)</b>.";
  } else if (mode === "reflex") {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aB, a2: aB + reflex, r: 0.34, lr: 0.6, label: fmt(reflex) + "°" }];
    prompt = "In the diagram, O is the centre of the circle. The marked central angle AOB is the reflex angle (greater than \\(180^{\\circ}\\)) and it measures \\(" + fmt(reflex) + "^{\\circ}\\). Point C is on the minor arc AB. Find the measure of the inscribed angle ACB, in degrees.";
    solution = "Angle ACB stands on the major arc AB, so it is half the reflex central angle on that same arc: \\[ \\begin{aligned} \\angle ACB &= " + fmt(reflex) + "^{\\circ} \\div 2 \\\\ &= " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  } else {
    C = u8P(270 + rot);
    angs = [{ v: "O", a1: aA, a2: aB, r: 0.3, lr: 0.52, label: fmt(minor) + "°" }];
    prompt = "In the diagram, O is the centre of the circle and the marked central angle AOB measures \\(" + fmt(minor) + "^{\\circ}\\). Point C is on the minor arc AB (the shorter arc between A and B), so angle ACB stands on the major arc AB. Find the measure of angle ACB, in degrees.";
    solution = "Angle ACB stands on the major arc, so first find the reflex central angle on that arc, then halve it: \\[ \\begin{aligned} \\text{reflex } \\angle AOB &= 360^{\\circ} - " + fmt(minor) + "^{\\circ} = " + fmt(reflex) + "^{\\circ} \\\\ \\angle ACB &= " + fmt(reflex) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle ACB is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  }
  var fig = u8Fig({ pts: { A: A, B: B, C: C }, segs: [["O", "A"], ["O", "B"], ["C", "A"], ["C", "B"]], angles: angs });
  var q = numq(prompt, ans, 0.01, solution, { mode: "reflex-" + mode, th: th, rot: rot });
  q.figure = fig;
  return q;
}, ["An inscribed angle is half the central angle on the same arc, and the arc it stands on decides which central angle to use.", "Check which arc C sits on: the inscribed angle uses the central angle on the opposite arc, reflex if needed."]);

// 7. 9.8 L2 num, CR 2: angle in a semicircle is a right angle.
E("u8-semicircle-angle", 8, ["9.8"], 1, "gen", function () {
  var gam = pick([44, 52, 60, 68, 76, 84, 96, 104, 112, 120, 128, 136]);
  var rot = pick([0, 14, -14, 28]);
  var atA = Math.random() < 0.5;
  var A = u8Rot([-1, 0], rot), B = u8Rot([1, 0], rot), C = u8Rot(u8P(gam), rot);
  var angA = gam / 2, angB = 90 - angA;
  var given = atA ? angA : angB, ans = atA ? angB : angA;
  var gv = atA ? "A" : "B", ask = atA ? "B" : "A";
  var angs = [{ v: gv, a1: u8Dir(pts0(gv), C), a2: u8Dir(pts0(gv), pts0(ask)), r: 0.3, lr: 0.55, label: fmt(given) + "°" }];
  function pts0(n) { return n === "A" ? A : (n === "B" ? B : C); }
  var fig = u8Fig({
    pts: { A: A, B: B, C: C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], angles: angs,
    rightMarks: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B) }]
  });
  var prompt = "In the diagram, AB is a diameter of the circle with centre O, and C is a point on the circle. Angle " + gv + " measures \\(" + fmt(given) + "^{\\circ}\\). Find the measure of angle " + ask + ", in degrees.";
  var solution = "An angle inscribed in a semicircle is a right angle, so angle C is \\(90^{\\circ}\\). The angles of triangle ABC add to \\(180^{\\circ}\\): \\[ \\begin{aligned} \\angle " + ask + " &= 180^{\\circ} - 90^{\\circ} - " + fmt(given) + "^{\\circ} \\\\ &= " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle " + ask + " is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = numq(prompt, ans, 0.01, solution, { mode: "semicircle-" + gv, gam: gam, rot: rot });
  q.figure = fig;
  return q;
}, ["An angle inscribed in a semicircle is a right angle, so angle C is 90 degrees.", "Use the angle sum of a triangle: subtract 90 and the given angle from 180."]);

// 8. 9.9 L2 MC, CR 2: inscribed angles on the same arc are equal.
E("u8-same-arc-angles", 8, ["9.9"], 1, "gen", function () {
  var v = pick([18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 62, 64, 66, 68, 70, 72]);
  var rot = pick([0, 18, 36, 54, 72, 90]);
  var A = u8P(200 + rot), B = u8P(340 + rot), C = u8P(80 + rot), D = u8P(135 + rot);
  var fig = u8Fig({
    pts: { A: A, B: B, C: C, D: D }, segs: [["C", "A"], ["C", "B"], ["D", "A"], ["D", "B"]],
    angles: [{ v: "C", a1: u8Dir(C, A), a2: u8Dir(C, B), r: 0.3, lr: 0.55, label: fmt(v) + "°" },
             { v: "D", a1: u8Dir(D, A), a2: u8Dir(D, B), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "In the diagram, C and D are points on the same side of chord AB, so the inscribed angles ACB and ADB both stand on the same arc AB. Angle ACB measures \\(" + fmt(v) + "^{\\circ}\\). What is the measure of angle ADB?";
  var solution = "Inscribed angles subtending the same arc are equal, so angle ADB has the same measure as angle ACB: <b>\\(" + fmt(v) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmt(v) + "^{\\circ}\\)", fb: "Correct. Inscribed angles on the same arc are equal." },
    [
      { t: "\\(" + fmt(v / 2) + "^{\\circ}\\)", fb: "Halving is for a central angle compared with an inscribed angle; these two angles are both inscribed on the same arc." },
      { t: "\\(" + fmt(2 * v) + "^{\\circ}\\)", fb: "Doubling gives the central angle on this arc, not another inscribed angle." },
      { t: "\\(" + fmt(180 - v) + "^{\\circ}\\)", fb: "That is the supplement of the angle; angles on the same arc are equal, not supplementary." }
    ],
    solution, { mode: "same-arc", v: v, rot: rot });
  q.figure = fig;
  return q;
}, ["Use the same-arc property: compare the two inscribed angles that stand on arc AB.", "Both angles have their vertices on the circle and their sides through A and B."]);

// 9. 9.5 L3 num, CR 3: two-step chord problem through the sagitta MD.
E("u8-chord-two-step", 8, ["9.5"], 3, "gen", function () {
  var tr = pick(U8_TRIPLES), k = pick([1, 2]);
  var d = tr[0] * k, half = tr[1] * k, r = tr[2] * k;
  if (Math.random() < 0.5) { var tmp = d; d = half; half = tmp; }
  var md = r - d, tilt = pick([0, 15, -15]);
  var A = u8Rot([-half / r, d / r], tilt), B = u8Rot([half / r, d / r], tilt), D = u8Rot([0, 1], tilt);
  var fig = u8Fig({
    pts: { A: A, B: B, D: D }, segs: [["A", "B"], ["O", "A"], ["M", "D"]], perp: ["A", "B"],
    sideLabs: [{ a: "O", b: "A", text: fmt(r) + " cm", off: 15 }, { a: "M", b: "D", text: fmt(md) + " cm", off: 15 }]
  });
  var prompt = "In the diagram, AB is a chord of a circle with centre O and radius \\(" + fmt(r) + "\\) cm. The line from O perpendicular to AB meets AB at M and meets the circle at D, with \\(MD = " + fmt(md) + "\\) cm. Find the length of the chord AB, in centimetres.";
  var solution = "First find OM: OD is a radius, so \\(OM = OD - MD\\). Then use the right triangle OMA, remembering the perpendicular from the centre bisects the chord: \\[ \\begin{aligned} OM &= " + fmt(r) + " - " + fmt(md) + " = " + fmt(d) + " \\\\ AM^{2} &= " + fmt(r) + "^{2} - " + fmt(d) + "^{2} = " + fmt(r * r - d * d) + " \\\\ AM &= " + fmt(half) + " \\\\ AB &= 2 \\times " + fmt(half) + " = " + fmt(2 * half) + " \\end{aligned} \\] So the chord length is <b>" + fmt(2 * half) + " cm</b>.";
  var q = numq(prompt, 2 * half, 0.01, solution, { mode: "chord-two-step", r: r, d: d, half: half, md: md, tilt: tilt });
  q.figure = fig;
  return q;
}, ["Work in two steps: a length first, then the chord property with the perpendicular from the centre.", "OD is a radius, so subtract MD from it to get OM, then use triangle OMA."]);

// 10. 9.5 L3 MC, CR 2: tangent right angle, then central to inscribed.
E("u8-tangent-central-inscribed", 8, ["9.5"], 3, "gen", function () {
  var delta = pick([40, 50, 55, 65, 70, 75]);
  var tAng = pick([200, 230, 260, 290, 320]);
  var sgn = Math.random() < 0.5 ? 1 : -1;
  var T = u8P(tAng);
  var rayAng = tAng + sgn * delta;
  var U = u8P(rayAng);
  var s = 1 / Math.cos(delta * Math.PI / 180);
  var P = [U[0] * s, U[1] * s];
  var D = U;
  var midMinor = tAng + sgn * delta / 2;
  var C = u8P(midMinor + 180);
  var pAng = 90 - delta, ans = delta / 2;
  var fig = u8Fig({
    pts: { T: T, P: P, D: D, C: C }, segs: [["O", "T"], ["O", "P"], ["C", "T"], ["C", "D"]],
    tangentSeg: { at: "T", to: "P", beyond: 1.05, back: 0.3 },
    rightMarks: [{ v: "T", a1: u8Dir(T, [0, 0]), a2: u8Dir(T, P) }],
    angles: [{ v: "P", a1: u8Dir(P, T), a2: u8Dir(P, [0, 0]), r: 0.3, lr: 0.55, label: fmt(pAng) + "°" },
             { v: "C", a1: u8Dir(C, T), a2: u8Dir(C, D), r: 0.3, lr: 0.55, label: "?" }]
  });
  var prompt = "In the diagram, the line through T and P is a tangent to the circle with centre O (a tangent touches the circle at exactly one point). The line from O through P meets the circle at D. Angle OPT measures \\(" + fmt(pAng) + "^{\\circ}\\), and C is a point on the major arc TD. Find the measure of the inscribed angle TCD, in degrees.";
  var solution = "The radius to a point of tangency is perpendicular to the tangent, so triangle OTP is right-angled at T. First find the central angle TOD, then halve it, since the inscribed angle on the same arc is half the central angle: \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + fmt(pAng) + "^{\\circ} = " + fmt(delta) + "^{\\circ} \\\\ \\angle TCD &= " + fmt(delta) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ} \\end{aligned} \\] So angle TCD is <b>\\(" + fmt(ans) + "^{\\circ}\\)</b>.";
  var q = mcq(prompt,
    { t: "\\(" + fmt(ans) + "^{\\circ}\\)", fb: "Correct. Angle TCD is the inscribed angle on arc TD, so it is half the central angle TOD: \\(" + fmt(delta) + "^{\\circ} \\div 2 = " + fmt(ans) + "^{\\circ}\\)." },
    [
      { t: "\\(" + fmt(delta) + "^{\\circ}\\)", fb: "That is the central angle TOD itself. The inscribed angle on the same arc is half the central angle, so \\(" + fmt(delta) + "^{\\circ}\\) still has to be halved." },
      { t: "\\(" + fmt(pAng) + "^{\\circ}\\)", fb: "That is angle OPT, the angle at P in right triangle OTP. The question asks for the inscribed angle TCD, which is half the central angle TOD." },
      { t: "\\(" + fmt(180 - ans) + "^{\\circ}\\)", fb: "That is the supplement of the answer, \\(180^{\\circ} - " + fmt(ans) + "^{\\circ}\\). Angle TCD is not supplementary to the central angle; it is half of it." }
    ],
    solution, { mode: "tangent-central-inscribed", delta: delta, tAng: tAng, sgn: sgn });
  q.figure = fig;
  return q;
}, ["Combine two properties: the radius to a tangent makes a right angle, and an inscribed angle is half the central angle on the same arc.", "First use the angle sum in right triangle OTP to find the central angle TOD."]);

// Unit 9: Probability and Statistics (Math 9, NL). Entries only; helpers prefixed u9.

