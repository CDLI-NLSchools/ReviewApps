// Math 9 Unit 7 Similarity and Transformations question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 3750 to 4729).
// CRMARKS: u7-scale-draw-num=3
// CRMARKS: u7-draw-similar-num=3
// CRMARKS: u7-similar-context-num=3
// CRMARKS: u7-similar-two-step-num=3
// CRMARKS: u7-indirect-measure-num=2
// CRMARKS: u7-complete-half=2
// CRMARKS: u7-translation-rule=2
E("u7-scale-media-var", 7, ["10.8"], 1, "var", varset([
  function () {
    return mcq("A trail map in a park guide uses the scale 1 cm represents 5 km. What does this scale mean?",
      { t: "Each 1 cm on the map stands for 5 km on the ground.", fb: "Correct. The first number is the map length and the second is the real length." },
      [
        { t: "Each 5 cm on the map stands for 1 km on the ground.", fb: "That swaps the two numbers in the scale." },
        { t: "Each 1 cm on the ground stands for 5 km on the map.", fb: "That reverses the map and the ground." },
        { t: "The map is 5 times as large as the park it shows.", fb: "A map is a reduction, so it is smaller than the real park." }
      ],
      "In a scale, the map length comes first: 1 cm on the map matches 5 km in real life. So the scale means <b>each 1 cm on the map stands for 5 km on the ground</b>.",
      { mode: "scale-map" });
  },
  function () {
    return mcq("A photo is enlarged with a scale factor of 2. A scale factor compares the image length to the original length. What does scale factor 2 mean for the photo?",
      { t: "Every length in the enlargement is 2 times the matching length in the photo.", fb: "Correct. Scale factor 2 doubles every matching length." },
      [
        { t: "Every length in the enlargement is 2 cm longer than in the photo beside it.", fb: "A scale factor multiplies lengths; it does not add centimetres." },
        { t: "Every length in the enlargement is half the matching length in the photo.", fb: "Half would be a scale factor of 0.5, not 2." },
        { t: "Only the longest side of the photo is doubled in the printed copy shown.", fb: "A scale factor applies to every length, not just one side." }
      ],
      "The scale factor multiplies every length: \\[ \\begin{aligned} \\text{image length} &= 2 \\times \\text{original length} \\end{aligned} \\] So <b>every length in the enlargement is 2 times the matching length in the photo</b>.",
      { mode: "scale-photo" });
  },
  function () {
    return mcq("A blueprint of a classroom shows the scale 2 cm represents 1 m. What does this scale mean?",
      { t: "Each 2 cm on the blueprint stands for 1 m in the real classroom.", fb: "Correct. The drawing length is given first, then the real length." },
      [
        { t: "Each 1 cm on the blueprint stands for 2 m in the real classroom.", fb: "That swaps the two numbers in the scale." },
        { t: "The real classroom is 2 cm long for each metre on the blueprint.", fb: "That mixes up which length belongs to the drawing." },
        { t: "The blueprint is larger than the real classroom it shows.", fb: "A blueprint is a reduction, so it is smaller than the room." }
      ],
      "The first number belongs to the drawing and the second to the real room. So the scale means <b>each 2 cm on the blueprint stands for 1 m in the real classroom</b>.",
      { mode: "scale-blueprint" });
  },
  function () {
    return mcq("A model car is built to a scale of 1 : 24. The first number is the model length and the second is the real car length. What does this scale mean?",
      { t: "The real car is 24 times as long as the model.", fb: "Correct. Every model length is multiplied by 24 to get the real length." },
      [
        { t: "The model is 24 times as long as the real car.", fb: "That reverses the scale; the model is the smaller one." },
        { t: "The real car is 24 cm longer than the model.", fb: "A scale multiplies lengths; it does not add 24 cm." },
        { t: "The model and the real car are the same size.", fb: "A scale of 1 : 24 means the sizes differ by a factor of 24." }
      ],
      "Matching lengths follow \\[ \\begin{aligned} \\text{real length} &= 24 \\times \\text{model length} \\end{aligned} \\] So <b>the real car is 24 times as long as the model</b>.",
      { mode: "scale-model-car" });
  },
  function () {
    return mcq("A poster is printed from a small drawing using a scale factor of 0.5. What does scale factor 0.5 mean for the poster?",
      { t: "Every length on the poster is half the matching length on the drawing.", fb: "Correct. A scale factor below 1 makes a reduction." },
      [
        { t: "Every length on the poster is 0.5 cm longer than on the drawing.", fb: "A scale factor multiplies lengths; it does not add centimetres." },
        { t: "Every length on the poster is twice the matching length on the drawing.", fb: "Twice would be a scale factor of 2, not 0.5." },
        { t: "The poster has half as many sides as the drawing it was printed from.", fb: "A reduction keeps the same shape; only the lengths change." }
      ],
      "The image length is the original length times the scale factor: \\[ \\begin{aligned} \\text{image length} &= 0.5 \\times \\text{original length} \\end{aligned} \\] So <b>every length on the poster is half the matching length on the drawing</b>.",
      { mode: "scale-poster" });
  },
  function () {
    return mcq("A town website shows a map with the scale 1 : 50 000. The first number is the map length and the second is the real length, in the same units. What does this scale mean?",
      { t: "A distance of 1 unit on the map stands for 50 000 units in real life.", fb: "Correct. Both numbers use the same unit, and the real distance is much larger." },
      [
        { t: "A distance of 50 000 units on the map stands for 1 unit in real life.", fb: "That swaps the two numbers in the scale." },
        { t: "The map is 50 000 times as large as the town it shows.", fb: "A map is a reduction, so it is far smaller than the town." },
        { t: "Every real distance is 50 000 cm long, whatever the map shows.", fb: "The scale gives a ratio, not one fixed real distance." }
      ],
      "Read the ratio in order, map first and real life second. So the scale means <b>a distance of 1 unit on the map stands for 50 000 units in real life</b>.",
      { mode: "scale-web-map" });
  }
]), ["In a scale, decide which number belongs to the drawing and which to real life.", "The scale factor is image length divided by original length; below 1 means smaller, above 1 means larger."]);

// 2. 10.16 L2 gen num with figure, CR 3: redraw with a scale factor, find one image side.
E("u7-scale-draw-num", 7, ["10.16"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "reduction" : "enlargement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmt(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmt(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Original", 13, true);
    var q = numq("The diagram shows a rectangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side) + " cm side, in centimetres?",
      ans, 0.01,
      "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle with labelled sides");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmt(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmt(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Original", 13, true);
  var q2 = numq("The diagram shows a right triangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side2) + " cm side, in centimetres?",
    ans2, 0.01,
    "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side2) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Right triangle with labelled sides");
  return q2;
}, ["The image side is the original side multiplied by the scale factor.", "Find the given side in the diagram, then multiply it by the scale factor."]);

// 3. 10.17 L1 gen num: scale factor from a pair of corresponding lengths.
E("u7-scale-factor-num", 7, ["10.17"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["A drawing of a sunflower is ", " cm tall. The real sunflower is ", " cm tall."],
            ["A model boat is ", " cm long. The real boat is ", " cm long."],
            ["A photo print is ", " cm wide. The screen image it came from is ", " cm wide."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmt(iLen) + c[1] + fmt(oLen) + c[2] + " The first length is the image and the second is the original. What is the scale factor for the diagram? Give the scale factor as a decimal or whole number.";
  var sol = "The scale factor is the image length divided by the original length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iLen) + " \\div " + fmt(oLen) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the scale factor is <b>" + fmt(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmt(iLen) + " cm" }, { name: "Original", len: oLen, lab: fmt(oLen) + " cm" }], "Image and original lengths as bars");
    return q;
}, ["Scale factor is image length divided by original length.", "Put the image length first, then divide by the original length."]);

// 4. 10.18 L2 gen MC with figure: is the second rectangle proportional, and with what scale factor?
E("u7-proportional-check", 7, ["10.18"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var w = ri(3, 8), h = ri(2, 6);
    if (w === h) continue;
    var k = pick([0.5, 1.5, 2, 2.5, 3]);
    var prop = Math.random() < 0.5;
    var iw = Math.round(w * k * 10) / 10, ih = Math.round(h * k * 10) / 10;
    if (!prop) { ih = Math.round((ih + pick([-2, -1, 1, 2])) * 10) / 10; if (ih <= 0) continue; if (Math.abs(ih / h - k) < 0.01) continue; }
    var u = Math.min(14, 115 / Math.max(w, iw), 95 / Math.max(h, ih));
    var body = u7Poly([[30, 45], [30 + w * u, 45], [30 + w * u, 45 + h * u], [30, 45 + h * u]], FIG_SHADE);
    body += u7Poly([[195, 45], [195 + iw * u, 45], [195 + iw * u, 45 + ih * u], [195, 45 + ih * u]], "#ffffff");
    body += u7T(30 + w * u / 2, 31, fmt(w) + " cm", 12, false) + u7T(30 + w * u / 2, 45 + h * u + 18, "Original", 12, true);
    body += u7T(30 + w * u + 15, 45 + h * u / 2, fmt(h) + " cm", 12, false);
    body += u7T(195 + iw * u / 2, 31, fmt(iw) + " cm", 12, false) + u7T(195 + iw * u / 2, 45 + ih * u + 18, "Second", 12, true);
    body += u7T(195 + iw * u + 15, 45 + ih * u / 2, fmt(ih) + " cm", 12, false);
    var fig = u7Svg(345, 195, body, "An original rectangle and a second rectangle with labelled sides");
    var prompt = "The diagram shows an original rectangle and a second rectangle. Which statement about the second rectangle is true?";
    var sol, q;
    if (prop) {
      sol = "Check both side ratios: \\[ \\begin{aligned} " + fmt(iw) + " \\div " + fmt(w) + " &= " + fmt(k) + " \\\\ " + fmt(ih) + " \\div " + fmt(h) + " &= " + fmt(k) + " \\end{aligned} \\] Both ratios match, so the second rectangle is <b>proportional to the original, with scale factor " + fmt(k) + "</b>.";
      q = mcq(prompt,
        { t: "It is proportional to the original, with scale factor " + fmt(k) + ".", fb: "Correct. Both side ratios equal " + fmt(k) + "." },
        [
          { t: "It is proportional to the original, with scale factor " + fmt(Math.round(1 / k * 100) / 100) + ".", fb: "That divides the original by the image; the scale factor is image divided by original." },
          { t: "It is proportional to the original, with scale factor " + fmt(k + 1) + ".", fb: "Check a ratio: " + fmt(iw) + " divided by " + fmt(w) + " is not " + fmt(k + 1) + "." },
          { t: "It is not proportional, because the side ratios do not match.", fb: "The ratios do match here; divide each image side by its matching original side." }
        ], sol, { mode: "prop-yes", w: w, h: h, k: k, iw: iw, ih: ih });
    } else {
      var r1 = Math.round(iw / w * 100) / 100, r2 = Math.round(ih / h * 100) / 100;
      sol = "Check both side ratios: \\[ \\begin{aligned} " + fmt(iw) + " \\div " + fmt(w) + " &= " + fmt(r1) + " \\\\ " + fmt(ih) + " \\div " + fmt(h) + " &= " + fmt(r2) + " \\end{aligned} \\] The ratios differ, so the second rectangle is <b>not proportional, because the side ratios do not match</b>.";
      q = mcq(prompt,
        { t: "It is not proportional, because the side ratios do not match.", fb: "Correct. The two ratios are " + fmt(r1) + " and " + fmt(r2) + ", which differ." },
        [
          { t: "It is proportional to the original, with scale factor " + fmt(r1) + ".", fb: "That uses only the first pair of sides; the second pair gives a different ratio." },
          { t: "It is proportional to the original, with scale factor " + fmt(r2) + ".", fb: "That uses only the second pair of sides; the first pair gives a different ratio." },
          { t: "It is not proportional, because the angles are different.", fb: "Both shapes are rectangles, so all angles are 90 degrees; the side ratios are the problem." }
        ], sol, { mode: "prop-no", w: w, h: h, k: k, iw: iw, ih: ih });
    }
    q.figure = fig;
    return q;
  }
  var qf = mcq("The diagram shows an original rectangle and a second rectangle. Which statement about the second rectangle is true?",
    { t: "It is proportional to the original, with scale factor 2.", fb: "Correct. Both side ratios equal 2." },
    [
      { t: "It is proportional to the original, with scale factor 0.5.", fb: "That divides the original by the image." },
      { t: "It is proportional to the original, with scale factor 3.", fb: "Check a ratio: 8 divided by 4 is not 3." },
      { t: "It is not proportional, because the side ratios do not match.", fb: "The ratios do match here." }
    ], "Both ratios equal 2, so the second rectangle is <b>proportional to the original, with scale factor 2</b>.", { mode: "prop-yes", w: 4, h: 3, k: 2, iw: 8, ih: 6 });
  qf.figure = u7Svg(345, 195, u7Poly([[30, 45], [86, 45], [86, 87], [30, 87]], FIG_SHADE) + u7Poly([[195, 45], [307, 45], [307, 129], [195, 129]], "#ffffff") + u7T(58, 31, "4 cm", 12, false) + u7T(251, 31, "8 cm", 12, false) + u7T(101, 66, "3 cm", 12, false) + u7T(322, 87, "6 cm", 12, false) + u7T(58, 105, "Original", 12, true) + u7T(251, 147, "Second", 12, true), "An original rectangle and a second rectangle with labelled sides");
  return qf;
}, ["A diagram is proportional when every image side divided by its matching original side gives the same ratio.", "Divide the first pair of sides, then divide the second pair, and compare the two ratios."]);

// 5. 10.7 L2 gen MC with figure: similar or not, with the correct reason.
E("u7-similar-verdict", 7, ["10.7"], 1, "gen", function () {
  var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [5, 5, 8], [8, 15, 17]];
  function angsOf(s) {
    function ang(opp, x, y) { var v = (x * x + y * y - opp * opp) / (2 * x * y); v = Math.max(-1, Math.min(1, v)); return Math.round(Math.acos(v) * 180 / Math.PI); }
    return [ang(s[0], s[1], s[2]), ang(s[1], s[0], s[2]), ang(s[2], s[0], s[1])];
  }
  for (var att = 0; att < 200; att++) {
    var tr = pick(triples), angs = angsOf(tr);
    if (angs[0] + angs[1] + angs[2] !== 180) continue;
    var k = pick([1.5, 2, 2.5, 3]);
    var img = tr.map(function (s) { return Math.round(s * k * 10) / 10; });
    var mode = pick(["similar", "angles", "sides"]);
    var angs2 = angs.slice(), img2 = img.slice();
    if (mode === "angles") { angs2 = [angs[0] + 10, angs[1] - 10, angs[2]]; if (angs2[1] < 10) continue; }
    if (mode === "sides") { img2 = [img[0], img[1], Math.round((img[2] + 2) * 10) / 10]; }
    var P1 = u7FitTri(tr, 8, 18, 150, 140), P2 = u7FitTri(img2, 182, 18, 150, 140);
    var body = u7Poly(P1, FIG_SHADE) + u7Poly(P2, "#ffffff");
    body += u7TriLabels(P1, ["A", "B", "C"], angs, tr.map(function (s) { return fmt(s); }));
    body += u7TriLabels(P2, ["D", "E", "F"], angs2, img2.map(function (s) { return fmt(s); }));
    var fig = u7Svg(345, 185, body, "Two triangles with side and angle labels");
    var prompt = "Use the labels in the diagram. Which statement about triangles ABC and DEF is correct?";
    var simT = "They are similar, because matching angles are equal and matching sides are in proportion.";
    var angT = "They are not similar, because the matching angles are not all equal.";
    var sideT = "They are not similar, because matching sides are not in proportion.";
    var congT = "They are congruent, because they have the same angles.";
    var sol, q;
    if (mode === "similar") {
      sol = "The angles match, and the side ratios agree: \\[ \\begin{aligned} " + fmt(img[0]) + " \\div " + fmt(tr[0]) + " &= " + fmt(k) + " \\\\ " + fmt(img[1]) + " \\div " + fmt(tr[1]) + " &= " + fmt(k) + " \\\\ " + fmt(img[2]) + " \\div " + fmt(tr[2]) + " &= " + fmt(k) + " \\end{aligned} \\] So <b>they are similar, because matching angles are equal and matching sides are in proportion</b>.";
      q = mcq(prompt, { t: simT, fb: "Correct. Equal angles and one shared side ratio show similarity." },
        [{ t: angT, fb: "The angle labels do match here; compare them vertex by vertex." }, { t: sideT, fb: "The side ratios do match here; each one equals " + fmt(k) + "." }, { t: congT, fb: "Same angles alone do not make triangles congruent; the sides here are scaled, not equal." }],
        sol, { mode: "verdict-similar", tr: tr.join(","), k: k });
    } else if (mode === "angles") {
      sol = "Compare the angles: triangle ABC has an angle of " + angs[0] + " degrees where triangle DEF has " + angs2[0] + " degrees. Similar polygons need all matching angles equal, so <b>they are not similar, because the matching angles are not all equal</b>.";
      q = mcq(prompt, { t: angT, fb: "Correct. One pair of matching angles differs, so the triangles cannot be similar." },
        [{ t: simT, fb: "Check the angle labels again; one pair of matching angles differs." }, { t: sideT, fb: "The sides are in proportion here; the angles are the problem." }, { t: congT, fb: "The angles are not all the same, and the sides are scaled, not equal." }],
        sol, { mode: "verdict-angles", tr: tr.join(","), k: k });
    } else {
      sol = "The angles match, but the side ratios do not: \\[ \\begin{aligned} " + fmt(img2[0]) + " \\div " + fmt(tr[0]) + " &= " + fmt(k) + " \\\\ " + fmt(img2[2]) + " \\div " + fmt(tr[2]) + " &= " + fmt(Math.round(img2[2] / tr[2] * 100) / 100) + " \\end{aligned} \\] The ratios differ, so <b>they are not similar, because matching sides are not in proportion</b>.";
      q = mcq(prompt, { t: sideT, fb: "Correct. The angles match, but one side ratio differs from the others." },
        [{ t: simT, fb: "Check every side ratio; one of them differs from the rest." }, { t: angT, fb: "The angle labels do match here; compare them vertex by vertex." }, { t: congT, fb: "Same angles alone do not make triangles congruent; the sides here are scaled, not equal." }],
        sol, { mode: "verdict-sides", tr: tr.join(","), k: k });
    }
    q.figure = fig;
    return q;
  }
  return mcq("Use the labels in the diagram. Which statement about the two triangles is correct?",
    { t: "They are similar, because matching angles are equal and matching sides are in proportion.", fb: "Correct." },
    [{ t: "They are not similar, because the matching angles are not all equal.", fb: "The angle labels match here." }, { t: "They are not similar, because matching sides are not in proportion.", fb: "The side ratios match here." }, { t: "They are congruent, because they have the same angles.", fb: "Same angles alone do not show congruence." }],
    "The angles match and every side ratio is 2, so <b>they are similar</b>.", { mode: "verdict-similar", tr: "3,4,5", k: 2 });
}, ["Similar polygons need both checks: equal matching angles and proportional matching sides.", "First compare the angle labels, then divide each image side by its matching original side."]);

// 6. 10.7 L3 gen MC: three pairs in text, choose the pair that is similar.
E("u7-similar-pair", 7, ["10.7"], 3, "gen", function () {
  var triBases = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [8, 15, 17]];
  var quadBases = [[2, 3, 4, 5], [3, 4, 5, 6], [2, 4, 5, 7], [4, 5, 6, 8]];
  function sortedStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(function (v) { return fmt(v); }).join(", "); }
  function ratiosOK(a, b) {
    var sa = a.slice().sort(function (x, y) { return x - y; }), sb = b.slice().sort(function (x, y) { return x - y; });
    var r = sb[0] / sa[0];
    for (var i = 1; i < sa.length; i++) { if (Math.abs(sb[i] / sa[i] - r) > 0.001) return false; }
    return true;
  }
  for (var att = 0; att < 300; att++) {
    var useQuad = Math.random() < 0.4;
    var base = useQuad ? pick(quadBases) : pick(triBases);
    var k = pick([1.5, 2, 2.5, 3]);
    var simImg = base.map(function (s) { return Math.round(s * k * 10) / 10; });
    function badPair() {
      var b2 = useQuad ? pick(quadBases) : pick(triBases);
      var k2 = pick([1.5, 2, 2.5, 3]);
      var im = b2.map(function (s) { return Math.round(s * k2 * 10) / 10; });
      var idx = ri(0, im.length - 1);
      im[idx] = Math.round((im[idx] + pick([-2, -1, 1, 2])) * 10) / 10;
      if (im[idx] <= 0) return null;
      if (ratiosOK(b2, im)) return null;
      return { a: b2, b: im };
    }
    var bad1 = badPair(), bad2 = badPair();
    if (!bad1 || !bad2) continue;
    var pairs = [
      { a: base, b: simImg, good: true, tag: "sim" },
      { a: bad1.a, b: bad1.b, good: false, tag: "b1" },
      { a: bad2.a, b: bad2.b, good: false, tag: "b2" }
    ];
    pairs = shuffle(pairs);
    var texts = pairs.map(function (pr, i) { return "Pair " + (i + 1) + ": " + sortedStr(pr.a) + " cm and " + sortedStr(pr.b) + " cm"; });
    if (new Set(texts).size < 3) continue;
    var gi = pairs.findIndex(function (pr) { return pr.good; });
    var opts = texts.map(function (t, i) {
      return { t: t, fb: i === gi ? "Correct. Sorting each list and dividing gives one shared ratio of " + fmt(k) + "." : "Sort both lists and divide matching sides; the ratios in this pair are not all equal." };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    rest.push({ t: "None of the three pairs is similar.", fb: "One pair does share a single ratio for every side; check Pair " + (gi + 1) + " again." });
    var sb = base.slice().sort(function (x, y) { return x - y; }), si = simImg.slice().sort(function (x, y) { return x - y; });
    var chain = sb.map(function (s, i) { return fmt(si[i]) + " \\div " + fmt(s) + " &= " + fmt(k); }).join(" \\\\ ");
    var sol = "For the similar pair, sort the sides in each list, then divide matching sides: \\[ \\begin{aligned} " + chain + " \\end{aligned} \\] Every ratio is the same, so <b>Pair " + (gi + 1) + " is the similar pair</b>. In each other pair, one ratio breaks the pattern.";
    var q = mcq("Three pairs of polygons are listed by their side lengths. Exactly one pair is similar. Which pair is it?",
      corr, rest, sol, { mode: "similar-pair", base: base.join(","), k: k, good: gi });
    var figB = "";
    pairs.forEach(function (pr, i) {
      var by = 10 + i * 60;
      figB += solT(16, by + 25, "Pair " + (i + 1), 11, true);
      var P1 = pr.a.length === 3 ? u7FitTri(pr.a, 34, by, 105, 50) : solQuadPts(pr.a, 34, by, 105, 50);
      var P2 = pr.b.length === 3 ? u7FitTri(pr.b, 196, by, 105, 50) : solQuadPts(pr.b, 196, by, 105, 50);
      if (P1) { figB += u7Poly(P1, FIG_SHADE); figB += pr.a.length === 3 ? solSideLabels(P1, [fmt(pr.a[2]), fmt(pr.a[0]), fmt(pr.a[1])]) : solSideLabels(P1, pr.a.map(function (v) { return fmt(v); })); }
      if (P2) { figB += u7Poly(P2, "#ffffff"); figB += pr.b.length === 3 ? solSideLabels(P2, [fmt(pr.b[2]), fmt(pr.b[0]), fmt(pr.b[1])]) : solSideLabels(P2, pr.b.map(function (v) { return fmt(v); })); }
    });
    q.figure = u7Svg(345, 195, figB, "Three pairs of polygons with side labels");
    return q;
  }
  return mcq("Three pairs of polygons are listed by their side lengths. Exactly one pair is similar. Which pair is it?",
    { t: "Pair 1: 3, 4, 5 cm and 6, 8, 10 cm", fb: "Correct. Every ratio is 2." },
    [{ t: "Pair 2: 3, 4, 5 cm and 6, 8, 11 cm", fb: "The ratios are not all equal in this pair." }, { t: "Pair 3: 5, 5, 6 cm and 10, 10, 13 cm", fb: "The ratios are not all equal in this pair." }, { t: "None of the three pairs is similar.", fb: "Pair 1 shares one ratio for every side." }],
    "Sorting and dividing Pair 1 gives the ratio 2 for every side, so <b>Pair 1 is the similar pair</b>.", { mode: "similar-pair", base: "3,4,5", k: 2, good: 0 });
}, ["Sort the sides in each list from smallest to largest before comparing them.", "Divide each side in the second list by the matching side in the first list; similar pairs give one shared ratio."]);

// 7. 10.14 L2 gen num, CR 3: side of a similar polygon drawn with a given scale factor.
E("u7-draw-similar-num", 7, ["10.14"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks);
  var isTri = Math.random() < 0.5, sides, pickIdx;
  if (isTri) {
    var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 8], [9, 12, 15]]);
    var sc = pick([1, 1, 2]);
    sides = tr.map(function (s) { return s * sc; });
  } else {
    sides = [ri(3, 9), ri(3, 9), ri(3, 9), ri(3, 9)];
  }
  pickIdx = ri(0, sides.length - 1);
  var side = sides[pickIdx], ans = Math.round(side * k * 100) / 100;
  var shapeWord = isTri ? "triangle" : "quadrilateral";
  var prompt = "A " + shapeWord + " has sides " + sides.map(function (s) { return fmt(s); }).join(", ") + " cm. A similar " + shapeWord + " is drawn with scale factor " + fmt(k) + ". How long is the side of the new " + shapeWord + " that matches the " + fmt(side) + " cm side, in centimetres?";
  var sol = "Matching sides of similar polygons follow the scale factor: \\[ \\begin{aligned} \\text{new side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "draw-similar", sides: sides.join(","), k: k, side: side });
  var figB2 = "";
  if (isTri) {
    var PT = u7FitTri(sides, 95, 22, 160, 125);
    figB2 = u7Poly(PT, FIG_SHADE) + solSideLabels(PT, [fmt(sides[2]) + " cm", fmt(sides[0]) + " cm", fmt(sides[1]) + " cm"]);
  } else {
    var PQ = solQuadPts(sides, 95, 22, 160, 125);
    if (PQ) figB2 = u7Poly(PQ, FIG_SHADE) + solSideLabels(PQ, sides.map(function (v) { return fmt(v) + " cm"; }));
  }
  if (figB2) q.figure = u7Svg(345, 170, figB2, "Polygon with labelled sides");
  return q;
}, ["A similar drawing multiplies every side by the same scale factor.", "Take the named side and multiply it by the scale factor."]);

// 8. 10.15 L2 gen num, CR 3: similar figures in context.
E("u7-similar-context-num", 7, ["10.15"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var w = pick([8, 10, 12, 15, 20]), k = pick([1.5, 2, 2.5, 3]);
    var h = pick([6, 8, 9, 10, 12, 16]);
    var W = Math.round(w * k * 10) / 10, ans = Math.round(h * k * 100) / 100;
    var prompt = "A photo is " + fmt(w) + " cm wide and " + fmt(h) + " cm tall. It is enlarged so the print is " + fmt(W) + " cm wide, keeping the same shape. How tall is the print, in centimetres?";
    var sol = "The enlargement scale factor comes from the widths: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(W) + " \\div " + fmt(w) + " = " + fmt(k) + " \\\\ \\text{print height} &= " + fmt(h) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the print is <b>" + fmt(ans) + " cm</b> tall.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "photo-enlarge", w: w, h: h, k: k });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Photo", w2: W, h2: h * k, wLab2: fmt(W) + " cm", hLab2: "?", cap2: "Print", aria: "A photo and its enlargement with labelled sides" });
    return q;
  }
  if (mode === 1) {
    var real = pick([40, 50, 60, 80, 100]), mod = pick([8, 10, 12, 16, 20]);
    var k2 = mod / real;
    var part = pick([10, 15, 20, 25, 30]);
    var ans2 = Math.round(part * k2 * 100) / 100;
    if (Math.abs(ans2 - Math.round(ans2 * 10) / 10) > 0.001) { part = 20; ans2 = Math.round(part * k2 * 100) / 100; }
    var prompt2 = "A real shed is " + fmt(real) + " m long, and a scale model of it is " + fmt(mod) + " cm long. A door on the real shed is " + fmt(part) + " m wide, measured along the same direction as the lengths. How wide is the door on the model, in centimetres?";
    var sol2 = "The model scale factor is model length divided by real length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(mod) + " \\div " + fmt(real) + " = " + fmt(k2) + " \\\\ \\text{model door} &= " + fmt(part) + " \\times " + fmt(k2) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the door on the model is <b>" + fmt(ans2) + " cm</b> wide.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "model-door", real: real, mod: mod, part: part });
    var figB = "";
    figB += solPoly([[45, 36], [245, 36], [245, 78], [45, 78]], "#ffffff");
    figB += solPoly([[45, 36], [45 + 200 * part / real, 36], [45 + 200 * part / real, 78], [45, 78]], FIG_SHADE);
    figB += solT(145, 92, fmt(real) + " m", 12, false);
    figB += solT(45 + 100 * part / real, 26, fmt(part) + " m", 11, false);
    figB += solPoly([[85, 116], [205, 116], [205, 146], [85, 146]], "#ffffff");
    figB += solPoly([[85, 116], [85 + 120 * part / real, 116], [85 + 120 * part / real, 146], [85, 146]], FIG_SHADE);
    figB += solT(145, 160, fmt(mod) + " cm", 12, false);
    figB += solT(85 + 60 * part / real, 108, "?", 12, false);
    q.figure = solSvg(340, 172, figB, "A shed and its scale model with the door shaded");
    return q;
  }
  var hp = pick([1.5, 1.6, 1.8]), mult = pick([2, 3, 4, 5]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var sPole = Math.round(sp * mult * 10) / 10, ans3 = Math.round(hp * mult * 100) / 100;
  var prompt3 = "A person " + fmt(hp) + " m tall casts a shadow " + fmt(sp) + " m long. At the same time, a flagpole casts a shadow " + fmt(sPole) + " m long. The pole and its shadow form a triangle similar to the person and shadow triangle. How tall is the flagpole, in metres?";
  var sol3 = "The shadow is " + fmt(mult) + " times as long, so the pole is the same number of times as tall: \\[ \\begin{aligned} " + fmt(sPole) + " \\div " + fmt(sp) + " &= " + fmt(mult) + " \\\\ \\text{pole height} &= " + fmt(hp) + " \\times " + fmt(mult) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the flagpole is <b>" + fmt(ans3) + " m</b> tall.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "shadow-pole", hp: hp, sp: sp, mult: mult });
    q.figure = solShadowFig([{ name: "Person", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Flagpole", h: ans3, s: sPole, hLab: "?", sLab: fmt(sPole) + " m" }], "A person and a flagpole with their shadows");
    return q;
}, ["Find the scale factor from the pair of lengths you know, then use it on the matching length.", "Divide the known image length by its matching original length first."]);

// 9. 10.15 L3 gen num, CR 3: two-step similar-figures problems.
E("u7-similar-two-step-num", 7, ["10.15"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var so = pick([4, 5, 6, 8, 10]), k = pick([1.5, 2, 2.5, 3]);
    var si = Math.round(so * k * 10) / 10;
    var P = pick([24, 30, 36, 40, 44, 48, 52, 60]);
    var ans = Math.round(P * k * 100) / 100;
    var prompt = "Two rectangles are similar. In the smaller rectangle, one side is " + fmt(so) + " cm and the perimeter is " + fmt(P) + " cm. The matching side in the larger rectangle is " + fmt(si) + " cm. What is the perimeter of the larger rectangle, in centimetres?";
    var sol = "First get the scale factor from the matching sides, then apply it to the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(si) + " \\div " + fmt(so) + " = " + fmt(k) + " \\\\ \\text{larger perimeter} &= " + fmt(P) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the perimeter of the larger rectangle is <b>" + fmt(ans) + " cm</b>.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "perimeter-scale", so: so, si: si, P: P });
    q.figure = solRectPair({ w1: so, h1: P / 2 - so, wLab1: fmt(so) + " cm", hLab1: fmt(P / 2 - so) + " cm", cap1: "Smaller", w2: si, h2: (P / 2 - so) * k, wLab2: fmt(si) + " cm", hLab2: fmt((P / 2 - so) * k) + " cm", cap2: "Larger", aria: "Two similar rectangles with labelled sides" });
    return q;
  }
  if (mode === 1) {
    var w = pick([4, 5, 6, 8]), h = pick([3, 4, 5, 6, 7]);
    var k2 = pick([1.5, 2, 2.5, 3]);
    var W = Math.round(w * k2 * 10) / 10, H = Math.round(h * k2 * 10) / 10;
    var ans2 = Math.round(2 * (W + H) * 100) / 100;
    var prompt2 = "A rectangle is " + fmt(w) + " cm by " + fmt(h) + " cm. A similar rectangle has width " + fmt(W) + " cm. What is the perimeter of the similar rectangle, in centimetres?";
    var sol2 = "Find the scale factor, then the new height, then the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(W) + " \\div " + fmt(w) + " = " + fmt(k2) + " \\\\ \\text{new height} &= " + fmt(h) + " \\times " + fmt(k2) + " = " + fmt(H) + " \\\\ \\text{perimeter} &= 2 \\times (" + fmt(W) + " + " + fmt(H) + ") \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the perimeter is <b>" + fmt(ans2) + " cm</b>.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "rect-perimeter", w: w, h: h, k: k2 });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmt(w) + " cm", hLab1: fmt(h) + " cm", cap1: "Original", w2: W, h2: H, wLab2: fmt(W) + " cm", hLab2: "?", cap2: "Similar", aria: "A rectangle and a similar rectangle with labelled sides" });
    return q;
  }
  var sA = pick([3, 4, 5, 6]), kA = pick([2, 3]), kB = pick([1.5, 2, 2.5]);
  var sB = sA * kA, ans3 = Math.round(sB * kB * 100) / 100;
  var prompt3 = "Figure A, figure B and figure C are all similar. A side of figure A is " + fmt(sA) + " cm, and the matching side of figure B is " + fmt(sB) + " cm. Figure C is drawn from figure B with scale factor " + fmt(kB) + ". How long is the side of figure C that matches the " + fmt(sA) + " cm side of figure A, in centimetres?";
  var sol3 = "Work through figure B first, then apply the second scale factor: \\[ \\begin{aligned} \\text{side in B} &= " + fmt(sB) + " \\\\ \\text{side in C} &= " + fmt(sB) + " \\times " + fmt(kB) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the matching side of figure C is <b>" + fmt(ans3) + " cm</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "chain-scale", sA: sA, sB: sB, kB: kB });
    q.figure = solBarsFig([{ name: "Figure A", len: sA, lab: fmt(sA) + " cm" }, { name: "Figure B", len: sB, lab: fmt(sB) + " cm" }, { name: "Figure C", len: ans3, lab: "?" }], "Matching side lengths of three similar figures as bars");
    return q;
}, ["Split the problem into steps: find a scale factor first, then use it.", "Use the pair of matching lengths you are given to get the scale factor before finding anything else."]);

// 10. 10.19 L3 gen num, CR 2: indirect measurement with similar triangles.
E("u7-indirect-measure-num", 7, ["10.19"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var hs = pick([1, 1.2, 1.5]), ss = pick([0.8, 1, 1.2, 1.5]);
    var mult = pick([6, 8, 10, 12, 15]);
    var sTree = Math.round(ss * mult * 10) / 10, ans = Math.round(hs * mult * 100) / 100;
    var prompt = "A stick " + fmt(hs) + " m tall casts a shadow " + fmt(ss) + " m long. At the same time, a tree casts a shadow " + fmt(sTree) + " m long. The tree and stick triangles are similar. How tall is the tree, in metres?";
    var sol = "The tree shadow is a multiple of the stick shadow: \\[ \\begin{aligned} " + fmt(sTree) + " \\div " + fmt(ss) + " &= " + fmt(mult) + " \\\\ \\text{tree height} &= " + fmt(hs) + " \\times " + fmt(mult) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the tree is <b>" + fmt(ans) + " m</b> tall.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "tree-shadow", hs: hs, ss: ss, mult: mult });
    q.figure = solShadowFig([{ name: "Stick", h: hs, s: ss, hLab: fmt(hs) + " m", sLab: fmt(ss) + " m" }, { name: "Tree", h: ans, s: sTree, hLab: "?", sLab: fmt(sTree) + " m" }], "A stick and a tree with their shadows");
    return q;
  }
  if (mode === 1) {
    var hp = pick([1.5, 1.6, 1.8]), sp = pick([2, 2.4, 3]);
    var mult2 = pick([8, 10, 12, 15, 20]);
    var sB = Math.round(sp * mult2 * 10) / 10, ans2 = Math.round(hp * mult2 * 100) / 100;
    var prompt2 = "To measure a building, a student " + fmt(hp) + " m tall stands so her shadow is " + fmt(sp) + " m long. The building shadow at the same time is " + fmt(sB) + " m long. Using similar triangles, how tall is the building, in metres?";
    var sol2 = "Compare the shadows first, then scale the height by the same factor: \\[ \\begin{aligned} " + fmt(sB) + " \\div " + fmt(sp) + " &= " + fmt(mult2) + " \\\\ \\text{building height} &= " + fmt(hp) + " \\times " + fmt(mult2) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the building is <b>" + fmt(ans2) + " m</b> tall.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "building-shadow", hp: hp, sp: sp, mult: mult2 });
    q.figure = solShadowFig([{ name: "Student", h: hp, s: sp, hLab: fmt(hp) + " m", sLab: fmt(sp) + " m" }, { name: "Building", h: ans2, s: sB, hLab: "?", sLab: fmt(sB) + " m" }], "A student and a building with their shadows");
    return q;
  }
  var d = pick([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]), per = pick([6, 8, 10, 12, 15, 20]);
  var ans3 = Math.round(d * per * 100) / 100;
  var prompt3 = "On a scale diagram of a pond, the distance across the pond measures " + fmt(d) + " cm. The diagram scale is 1 cm represents " + fmt(per) + " m. What is the real distance across the pond, in metres?";
  var sol3 = "Multiply the diagram distance by the real length each centimetre stands for: \\[ \\begin{aligned} \\text{real distance} &= " + fmt(d) + " \\times " + fmt(per) + " \\\\ &= " + fmt(ans3) + " \\end{aligned} \\] So the real distance across the pond is <b>" + fmt(ans3) + " m</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "pond-scale", d: d, per: per });
    var figB = '<ellipse cx="170" cy="98" rx="118" ry="52" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="2"/>';
    figB += solLine([52, 98], [288, 98], true, 1.6);
    figB += solT(170, 72, fmt(d) + " cm", 12, false);
    q.figure = solSvg(340, 175, figB, "Diagram of a pond with the distance across marked");
    return q;
}, ["Set up the matching ratio from the object you can measure, then apply it to the object you cannot.", "Divide the two shadow lengths (or use the diagram scale) to get the factor first."]);

// 11. 10.1 L1 gen MC with figure: lines of symmetry of a drawn shape.
E("u7-lines-symmetry", 7, ["10.1"], 1, "gen", function () {
  function figFor(kind) {
    if (kind === "rect") { var w = ri(90, 140), h = ri(45, 68); return { n: 2, svg: u7Svg(230, 190, u7Poly([[115 - w / 2, 95 - h / 2], [115 + w / 2, 95 - h / 2], [115 + w / 2, 95 + h / 2], [115 - w / 2, 95 + h / 2]], FIG_SHADE), "Shape: rectangle") }; }
    if (kind === "iso") { var b = ri(95, 130), ht = ri(70, 105); return { n: 1, svg: u7Svg(230, 190, u7Poly([[115 - b / 2, 155], [115 + b / 2, 155], [115, 155 - ht]], FIG_SHADE), "Shape: isosceles triangle") }; }
    if (kind === "scal") { var b2 = ri(105, 135), off = ri(12, 30); return { n: 0, svg: u7Svg(230, 190, u7Poly([[115 - b2 / 2, 155], [115 + b2 / 2, 155], [115 - b2 / 2 + off, 50]], FIG_SHADE), "Shape: scalene triangle") }; }
    if (kind === "kite") { var tw = ri(28, 40), bw = ri(46, 60), th = ri(34, 48), bh = ri(62, 82); return { n: 1, svg: u7Svg(230, 200, u7Poly([[115, 15], [115 + tw, 15 + th], [115, 15 + th + bh], [115 - tw, 15 + th]], FIG_SHADE), "Shape: kite") }; }
    if (kind === "arrow") { var t = ri(26, 36); return { n: 1, svg: u7Svg(230, 190, u7Poly([[25, 95 - t / 2], [125, 95 - t / 2], [125, 62], [200, 95], [125, 128], [125, 95 + t / 2], [25, 95 + t / 2]], FIG_SHADE), "Shape: arrow") }; }
    if (kind === "semi") { var r = ri(55, 80); var d = "M " + fmt(115 - r, 1) + " 125 A " + r + " " + r + " 0 0 1 " + fmt(115 + r, 1) + " 125 Z"; return { n: 1, svg: u7Svg(230, 190, '<path d="' + d + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>', "Shape: semicircle") }; }
    if (kind === "tee") { var w3 = ri(112, 140), bh3 = ri(28, 38), sw = ri(34, 44), tot = ri(112, 132); var x0 = 115 - w3 / 2, sx = 115 - sw / 2; return { n: 1, svg: u7Svg(230, 200, u7Poly([[x0, 30], [x0 + w3, 30], [x0 + w3, 30 + bh3], [sx + sw, 30 + bh3], [sx + sw, 30 + tot], [sx, 30 + tot], [sx, 30 + bh3], [x0, 30 + bh3]], FIG_SHADE), "Shape: letter T block") }; }
    var w4 = ri(80, 100), h4 = ri(112, 132), th4 = ri(30, 40), fh = ri(30, 40);
    return { n: 0, svg: u7Svg(230, 200, u7Poly([[35, 30], [35 + th4, 30], [35 + th4, 30 + h4 - fh], [35 + w4, 30 + h4 - fh], [35 + w4, 30 + h4], [35, 30 + h4]], FIG_SHADE), "Shape: letter L block") };
  }
  var kind = pick(["rect", "iso", "scal", "kite", "arrow", "semi", "tee", "ell"]);
  var f = figFor(kind), n = f.n;
  var candNums = [n + 1, n + 2, n - 1, n + 3, n - 2].filter(function (v) { return v >= 0 && v !== n; });
  var ds = [];
  for (var i = 0; i < candNums.length && ds.length < 3; i++) {
    var v = candNums[i];
    ds.push({ t: fmt(v), fb: v > n ? "That counts fold lines the shape does not have; test each fold in your mind." : "That misses a fold line; check folds through the middle both ways." });
  }
  var q = mcq("How many lines of symmetry does the shape in the diagram have? A line of symmetry is a fold line that makes the two halves match exactly.",
    { t: fmt(n), fb: "Correct. The shape folds exactly onto itself along " + (n === 0 ? "no line" : n === 1 ? "1 line" : fmt(n) + " lines") + "." },
    ds,
    "Fold the shape in your mind each way it might fold. Only folds where the halves match exactly count, and this shape has <b>" + fmt(n) + "</b> such line" + (n === 1 ? "" : "s") + " of symmetry.",
    { mode: "lines-sym", kind: kind, n: n });
  q.figure = f.svg;
  return q;
}, ["Try folding the shape in your mind: vertical, horizontal, and slanted folds.", "A fold counts only when the two halves match exactly, edge for edge."]);

// 12. 10.9 L2 gen MC with figure, CR 2: complete a shape across a line of symmetry on a grid.
E("u7-complete-half", 7, ["10.9"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var vert = Math.random() < 0.6;
    var m = ri(-1, 2), d = ri(2, 3);
    var py = ri(-3, 4), px, P, Pp, others;
    if (vert) {
      px = m - d; P = [px, py]; Pp = [2 * m - px, py];
      others = [[m, py + ri(2, 3)], [m - ri(1, 2), py + ri(-1, 1)], [m, py - ri(2, 3)]];
    } else {
      px = ri(-3, 4); P = [px, m - d]; Pp = [px, 2 * m - (m - d)];
      others = [[px + ri(2, 3), m], [px + ri(-1, 1), m - ri(1, 2)], [px - ri(2, 3), m]];
    }
    var cand = [Pp, P, vert ? [Pp[0], Pp[1] + 1] : [Pp[0] + 1, Pp[1]], vert ? [Pp[0] + 1, Pp[1]] : [Pp[0], Pp[1] + 1], [P[1], P[0]]];
    var texts = cand.map(u7Coord);
    if (new Set(texts).size < 4) continue;
    var half = vert ? [others[0], others[1], P, others[2]] : [others[0], others[1], P, others[2]];
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      lines: vert ? [{ a: [m, -6], b: [m, 6], dash: true, w: 2 }] : [{ a: [-6, m], b: [6, m], dash: true, w: 2 }],
      shapes: [{ pts: half, fill: FIG_SHADE }],
      marks: [{ p: P, label: "P", dx: -12, dy: 0 }],
      aria: "Half of a shape on a grid with a dashed line of symmetry" });
    var prompt = "The diagram shows half of a shape on a grid, with a dashed line of symmetry. Vertex P is at " + u7Coord(P) + ". Which point is the mirror image of P that completes the shape?";
    var sol = vert
      ? "P is " + fmt(d) + " units to the left of the line \\(x = " + fmt(m) + "\\), so its mirror image is " + fmt(d) + " units to the right, at the same height: \\[ \\begin{aligned} x' &= " + fmt(m) + " + " + fmt(d) + " = " + fmt(Pp[0]) + " \\\\ y' &= " + fmt(P[1]) + " \\end{aligned} \\] So the mirror image of P is <b>" + u7Coord(Pp) + "</b>."
      : "P is " + fmt(d) + " units below the line \\(y = " + fmt(m) + "\\), so its mirror image is " + fmt(d) + " units above, in the same column: \\[ \\begin{aligned} y' &= " + fmt(m) + " + " + fmt(d) + " = " + fmt(Pp[1]) + " \\\\ x' &= " + fmt(P[0]) + " \\end{aligned} \\] So the mirror image of P is <b>" + u7Coord(Pp) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(Pp), fb: "Correct. It sits the same distance on the other side of the dashed line." },
      [
        { t: u7Coord(cand[1]), fb: "That is P itself; the mirror image must be on the other side of the line." },
        { t: u7Coord(cand[2]), fb: "The distance from the line is right, but the point is shifted one unit along the line." },
        { t: u7Coord(cand[3]), fb: vert ? "That moves P sideways across the line by the wrong amount." : "That moves P across the line by the wrong amount." }
      ], sol, { mode: vert ? "complete-vert" : "complete-horiz", P: P.join(","), Pp: Pp.join(","), m: m });
    q.figure = grid;
    return q;
  }
  var qf = mcq("The diagram shows half of a shape on a grid, with a dashed line of symmetry. Vertex P is at (-2, 1). Which point is the mirror image of P that completes the shape?",
    { t: "(2, 1)", fb: "Correct." },
    [{ t: "(-2, 1)", fb: "That is P itself." }, { t: "(2, 2)", fb: "That is shifted one unit along the line." }, { t: "(1, -2)", fb: "That swaps the coordinates." }],
    "P is 2 units left of the y-axis, so its mirror image is 2 units right at the same height: <b>(2, 1)</b>.", { mode: "complete-vert", P: "-2,1", Pp: "2,1", m: 0 });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, lines: [{ a: [0, -6], b: [0, 6], dash: true, w: 2 }], shapes: [{ pts: [[0, 3], [-1, 2], [-2, 1], [0, -1]], fill: FIG_SHADE }], marks: [{ p: [-2, 1], label: "P", dx: -12, dy: 0 }], aria: "Half of a shape on a grid with a dashed line of symmetry" });
  return qf;
}, ["Count how far P is from the dashed line; the mirror point is the same distance on the other side.", "The mirror point keeps the coordinate along the line and flips the distance across it."]);

// 13. 10.2 L1 var: order and angle of rotation symmetry of familiar shapes.
E("u7-rotation-symmetry-var", 7, ["10.2"], 1, "var", varset([
  function () {
    var q = mcq("A square is turned about its centre. It matches itself 4 times in one full turn. What are its order and angle of rotation symmetry? The order is how many times it matches in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 4, angle 90°", fb: "Correct. 360 divided by 4 is 90." },
      [{ t: "Order 2, angle 180°", fb: "A square matches more often than twice; count the turns that land on a matching position." }, { t: "Order 4, angle 45°", fb: "The angle is 360 divided by the order, and 360 divided by 4 is 90, not 45." }, { t: "It has no rotation symmetry", fb: "A square does match itself when turned by part of a full turn." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] So the square has <b>order 4, angle 90°</b>.",
      { mode: "rot-square" });
    q.figure = polySVG(4);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of an equilateral triangle, turned about its centre? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 3, angle 120°", fb: "Correct. 360 divided by 3 is 120." },
      [{ t: "Order 3, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 3 is 120, not 90." }, { t: "Order 6, angle 60°", fb: "The triangle has 3 matching turns, not 6; count each vertex moving to the next corner." }, { t: "It has no rotation symmetry", fb: "Turning by one third of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 3 &= 120° \\end{aligned} \\] So the equilateral triangle has <b>order 3, angle 120°</b>.",
      { mode: "rot-equi" });
    q.figure = polySVG(3);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a regular pentagon, turned about its centre? A regular pentagon has 5 equal sides. The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 5, angle 72°", fb: "Correct. 360 divided by 5 is 72." },
      [{ t: "Order 5, angle 60°", fb: "The angle is 360 divided by the order, and 360 divided by 5 is 72, not 60." }, { t: "Order 10, angle 36°", fb: "The pentagon matches 5 times in a full turn, once for each vertex." }, { t: "It has no rotation symmetry", fb: "Turning by one fifth of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 5 &= 72° \\end{aligned} \\] So the regular pentagon has <b>order 5, angle 72°</b>.",
      { mode: "rot-pent" });
    q.figure = polySVG(5);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a regular hexagon, turned about its centre? A regular hexagon has 6 equal sides. The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 6, angle 60°", fb: "Correct. 360 divided by 6 is 60." },
      [{ t: "Order 6, angle 120°", fb: "The angle is 360 divided by the order, and 360 divided by 6 is 60, not 120." }, { t: "Order 3, angle 120°", fb: "The hexagon matches 6 times in a full turn, once for each vertex." }, { t: "It has no rotation symmetry", fb: "Turning by one sixth of a full turn makes it match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the regular hexagon has <b>order 6, angle 60°</b>.",
      { mode: "rot-hex" });
    q.figure = polySVG(6);
    return q;
  },
  function () {
    var q = mcq("What are the order and angle of rotation symmetry of a rectangle that is not a square, turned about its centre? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. Only a half turn makes it match." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would put the long sides where the short sides were, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes it match itself exactly." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the rectangle has <b>order 2, angle 180°</b>.",
      { mode: "rot-rect" });
    q.figure = u7Svg(230, 190, u7Poly([[45, 60], [185, 60], [185, 130], [45, 130]], FIG_SHADE), "Rectangle");
    return q;
  },
  function () {
    return mcq("The capital letter H is drawn with equal strokes. It is turned about its centre. What are its order and angle of rotation symmetry? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. A half turn puts the letter back exactly as it started." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would stand the letter on its side, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes the letter match itself." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the letter H has <b>order 2, angle 180°</b>.",
      { mode: "rot-H" });
  },
  function () {
    return mcq("The capital letter N is turned about its centre. What are its order and angle of rotation symmetry? The order is how many times it matches itself in a full turn, and the angle is 360 degrees divided by the order.",
      { t: "Order 2, angle 180°", fb: "Correct. A half turn flips the diagonal the right way to match." },
      [{ t: "Order 4, angle 90°", fb: "A quarter turn would lay the letter on its side, so it does not match." }, { t: "Order 2, angle 90°", fb: "The angle is 360 divided by the order, and 360 divided by 2 is 180, not 90." }, { t: "It has no rotation symmetry", fb: "A half turn makes the letter match itself exactly." }],
      "Divide a full turn by the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the letter N has <b>order 2, angle 180°</b>.",
      { mode: "rot-N" });
  }
]), ["For a regular shape, the order equals the number of sides; the angle is 360 degrees divided by the order.", "First find how many turns in a full turn make the shape match, then divide 360 degrees by that number."]);

// 14. 10.10 L2 gen MC with figure: rotate a triangle 90 degrees about one of its vertices.
E("u7-rotate-vertex", 7, ["10.10"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var V = [ri(-2, 2), ri(-2, 2)];
    var othersL = ["A", "B", "C"];
    var pivotIdx = ri(0, 2);
    var pts = [null, null, null];
    pts[pivotIdx] = V;
    var placed = [V];
    var ok = true;
    for (var i = 0; i < 3; i++) {
      if (i === pivotIdx) continue;
      var p = [ri(-4, 4), ri(-4, 4)];
      var tries = 0;
      while ((p[0] === V[0] && p[1] === V[1]) || placed.some(function (q2) { return q2[0] === p[0] && q2[1] === p[1]; })) { p = [ri(-4, 4), ri(-4, 4)]; if (++tries > 40) { ok = false; break; } }
      if (!ok) break;
      pts[i] = p; placed.push(p);
    }
    if (!ok) continue;
    var area = Math.abs((pts[1][0] - pts[0][0]) * (pts[2][1] - pts[0][1]) - (pts[2][0] - pts[0][0]) * (pts[1][1] - pts[0][1]));
    if (area === 0) continue;
    var askIdx = pick([0, 1, 2].filter(function (i2) { return i2 !== pivotIdx; }));
    var P = pts[askIdx];
    var dx = P[0] - V[0], dy = P[1] - V[1];
    if (dx === 0 && dy === 0) continue;
    var cw = Math.random() < 0.5;
    var img = cw ? [V[0] + dy, V[1] - dx] : [V[0] - dy, V[1] + dx];
    var wrong = cw ? [V[0] - dy, V[1] + dx] : [V[0] + dy, V[1] - dx];
    var aboutOrigin = cw ? [P[1], -P[0]] : [-P[1], P[0]];
    var cand = [img, wrong, aboutOrigin, P];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    if (img[0] < -6 || img[0] > 6 || img[1] < -6 || img[1] > 6) continue;
    var dirWord = cw ? "clockwise" : "counterclockwise";
    var names = ["A", "B", "C"];
    var prompt = "Triangle ABC has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". The triangle is rotated 90° " + dirWord + " about vertex " + names[pivotIdx] + ". What are the coordinates of the image of vertex " + names[askIdx] + "?";
    var rotTxt = cw ? "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(dy) + ", " + fmt(-dx) + ")" : "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(-dy) + ", " + fmt(dx) + ")";
    var sol = "Work from the pivot " + names[pivotIdx] + u7Coord(V) + ". The step from the pivot to " + names[askIdx] + " is " + rotTxt + " under a 90° " + dirWord + " turn: \\[ \\begin{aligned} \\text{image} &= " + u7Coord(V) + " + (" + fmt(img[0] - V[0]) + ", " + fmt(img[1] - V[1]) + ") \\\\ &= " + u7Coord(img) + " \\end{aligned} \\] So the image of vertex " + names[askIdx] + " is <b>" + u7Coord(img) + "</b>.";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: p2[0] >= V[0] ? 11 : -11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The step from the pivot turns 90° " + dirWord + " and keeps its length." },
      [
        { t: u7Coord(wrong), fb: "That turns the step the other way; check the stated direction." },
        { t: u7Coord(aboutOrigin), fb: "That rotates about the origin; this turn is about vertex " + names[pivotIdx] + "." },
        { t: u7Coord(P), fb: "That is the starting point of vertex " + names[askIdx] + "; only the pivot stays in place." }
      ], sol, { mode: cw ? "rot-cw" : "rot-ccw", V: V.join(","), P: P.join(","), img: img.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Triangle ABC has vertices A(0, 0), B(3, 0) and C(0, 2). The triangle is rotated 90° clockwise about vertex A. What are the coordinates of the image of vertex B?",
    { t: "(0, -3)", fb: "Correct." },
    [{ t: "(0, 3)", fb: "That turns the step the other way." }, { t: "(3, 0)", fb: "That is the starting point of B." }, { t: "(-3, 0)", fb: "That is a half turn, not a quarter turn." }],
    "The step from A to B is (3, 0); a 90° clockwise turn makes it (0, -3), so the image of B is <b>(0, -3)</b>.", { mode: "rot-cw", V: "0,0", P: "3,0", img: "0,-3" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[0, 0], [3, 0], [0, 2]], fill: FIG_SHADE }], marks: [{ p: [0, 0], label: "A", dx: -11, dy: -11 }, { p: [3, 0], label: "B", dx: 11, dy: -11 }, { p: [0, 2], label: "C", dx: -11, dy: -11 }], aria: "A triangle on a grid" });
  return qf;
}, ["The pivot vertex stays fixed; every other vertex swings around it.", "Find the step from the pivot to the named vertex, turn that step 90 degrees, then add it back to the pivot."]);

// 15. 10.3 L2 var: symmetry in tessellations and repeating patterns.
E("u7-tessellation-var", 7, ["10.3"], 1, "var", varset([
  function () {
    return mcq("A honeycomb tessellation is made of regular hexagons that fit together with no gaps. About the centre of one hexagon, the whole pattern matches itself when it is turned. What is the angle of rotation symmetry there?",
      { t: "60°", fb: "Correct. A regular hexagon has order 6, and 360 divided by 6 is 60." },
      [{ t: "30°", fb: "That is half the correct angle; the hexagon first matches after one sixth of a turn." }, { t: "90°", fb: "That would be order 4; a hexagon matches 6 times in a full turn." }, { t: "120°", fb: "That skips a matching position; the first match comes sooner, after one sixth of a turn." }],
      "A regular hexagon has rotation order 6: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the angle of rotation symmetry is <b>60°</b>.",
      { mode: "tess-honeycomb" });
  },
  function () {
    return mcq("A floor is tiled in a checkerboard tessellation of black and white squares. Consider one white square. Which line is a line of symmetry of the whole pattern? A line of symmetry makes the two halves match exactly, colours included.",
      { t: "A vertical line through the centre of the white square", fb: "Correct. Each side mirrors onto squares of the same colour." },
      [{ t: "A vertical line along the left edge of the white square", fb: "Folding there swaps the white square with a black neighbour, so the colours do not match." }, { t: "A horizontal line along the top edge of the white square", fb: "Folding there swaps the white square with a black neighbour, so the colours do not match." }, { t: "A slanted line through the centre of the white square", fb: "A slanted fold does not land the squares back on the grid." }],
      "Folding along a line through the centre of the square maps each square onto a square of the same colour, while folding along an edge swaps black and white. So the line of symmetry is <b>a vertical line through the centre of the white square</b>.",
      { mode: "tess-checker" });
  },
  function () {
    return mcq("A tessellation is built from four identical right triangles arranged as a pinwheel about a point, and the pinwheel repeats across the floor. About the centre of the pinwheel, what are the order and angle of rotation symmetry of the pattern?",
      { t: "Order 4, angle 90°", fb: "Correct. Four matching turns fit in a full turn, and 360 divided by 4 is 90." },
      [{ t: "Order 2, angle 180°", fb: "The pinwheel matches sooner than a half turn; count the four blades." }, { t: "Order 4, angle 45°", fb: "The angle is 360 divided by the order, and 360 divided by 4 is 90, not 45." }, { t: "The pattern has no rotation symmetry", fb: "Turning the pinwheel by a quarter turn lands each blade where the next one was." }],
      "Four blades give order 4: \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] So the pattern has <b>order 4, angle 90°</b> about the pinwheel centre.",
      { mode: "tess-pinwheel" });
  },
  function () {
    return mcq("A bunting strip for a fair is a repeating pattern: five identical triangles point up, side by side along a base line, like flags on a string. Which line is a line of symmetry of the whole strip?",
      { t: "A vertical line through the middle triangle", fb: "Correct. The two triangles on each side mirror onto each other." },
      [{ t: "A horizontal line along the base line", fb: "Folding there would flip the triangles below the base, where the strip has nothing." }, { t: "A vertical line through the first triangle", fb: "That leaves two triangles on one side and none to match on the other side." }, { t: "A slanted line through the middle triangle", fb: "A slanted fold does not land the row of triangles back on itself." }],
      "The strip has two triangles on each side of the middle one, so folding on <b>a vertical line through the middle triangle</b> makes the halves match. No other listed line does this.",
      { mode: "tess-bunting" });
  },
  function () {
    return mcq("A tessellation is made of equilateral triangles only, with 6 triangles meeting at each point. About a point where 6 triangles meet, the pattern first matches itself after a turn of what angle?",
      { t: "60°", fb: "Correct. Six matching positions fit in a full turn, and 360 divided by 6 is 60." },
      [{ t: "30°", fb: "That is half a triangle step; the triangles would not line up with the pattern yet." }, { t: "90°", fb: "That would be order 4; here 6 triangles meet, giving order 6." }, { t: "180°", fb: "That is a half turn, but the pattern already matches after a smaller turn." }],
      "Six triangles around the point give order 6: \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] So the pattern first matches after a turn of <b>60°</b>.",
      { mode: "tess-triangles" });
  }
]), ["Look for the smallest turn or fold that makes the whole repeating pattern land back on itself.", "For rotation, count how many matching positions fit in a full turn, then divide 360 degrees by that count."]);

// 16. 10.4 L2 var: types of symmetry in described artwork.
E("u7-artwork-symmetry-var", 7, ["10.4"], 1, "var", varset([
  function () {
    var opts = [
      { t: "Both line symmetry and rotation symmetry", fb: "Correct. It folds along several lines and matches itself under part turns." },
      { t: "Line symmetry only", fb: "It also matches itself when turned by part of a full turn about its centre." },
      { t: "Rotation symmetry only", fb: "It also folds exactly onto itself along lines through its centre." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "A six-pointed snowflake has both kinds of symmetry." }
    ];
    return mcq("A photograph shows a snowflake with 6 identical points arranged evenly around its centre. Which types of symmetry does the snowflake show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The 6 even points give fold lines through the centre and matching turns of one sixth of a full turn. So the snowflake shows <b>both line symmetry and rotation symmetry</b>.",
      { mode: "art-snowflake" });
  },
  function () {
    var opts = [
      { t: "Rotation symmetry only", fb: "Correct. The swirling blades match under quarter turns but no fold makes the halves match." },
      { t: "Both line symmetry and rotation symmetry", fb: "The blades curve one way, so every fold line fails to make the halves match." },
      { t: "Line symmetry only", fb: "There is no fold line, but a quarter turn about the centre makes it match." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "A quarter turn about the centre does make it match itself." }
    ];
    return mcq("A quilt block shows a pinwheel: four curved blades swirl around the centre, each blade bent the same way. Which types of symmetry does the block show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Turning by a quarter turn lands each blade where the next one was, but the one-way curve defeats every fold. So the block shows <b>rotation symmetry only</b>.",
      { mode: "art-pinwheel" });
  },
  function () {
    var opts = [
      { t: "Line symmetry only", fb: "Correct. The wings mirror across one vertical line, and no part turn makes it match." },
      { t: "Both line symmetry and rotation symmetry", fb: "Turning it by any part turn moves the head and wing pattern out of place." },
      { t: "Rotation symmetry only", fb: "It does have a fold line: the vertical line down its middle." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "The two wings are mirror images, so it has line symmetry." }
    ];
    return mcq("A painting shows a butterfly from above, with the left and right wings as mirror images and the head at the top. Which types of symmetry does the painting show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The wings fold onto each other along the vertical middle line, and no turn smaller than a full turn works. So the painting shows <b>line symmetry only</b>.",
      { mode: "art-butterfly" });
  },
  function () {
    var opts = [
      { t: "Neither line symmetry nor rotation symmetry", fb: "Correct. The single slanted triangle defeats every fold and every part turn." },
      { t: "Both line symmetry and rotation symmetry", fb: "One scalene triangle in a corner breaks both kinds of symmetry." },
      { t: "Line symmetry only", fb: "There is no fold line that makes the badge match; check the corner triangle." },
      { t: "Rotation symmetry only", fb: "There is no part turn that makes the badge match; check the corner triangle." }
    ];
    return mcq("A round badge is plain except for one small scalene triangle printed in the top right area. A scalene triangle has all sides different. Which types of symmetry does the badge show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Every fold or part turn would move the lone triangle to a spot where the badge is plain. So the badge shows <b>neither line symmetry nor rotation symmetry</b>.",
      { mode: "art-badge" });
  },
  function () {
    var opts = [
      { t: "Both line symmetry and rotation symmetry", fb: "Correct. The letter H folds two ways and matches after a half turn." },
      { t: "Line symmetry only", fb: "It also matches itself after a half turn about its centre." },
      { t: "Rotation symmetry only", fb: "It also folds exactly onto itself, both across and up and down." },
      { t: "Neither line symmetry nor rotation symmetry", fb: "The letter H has both kinds of symmetry." }
    ];
    return mcq("A circular logo has a capital letter H in the exact centre, drawn with equal strokes. Which types of symmetry does the logo show?",
      opts[0], [opts[1], opts[2], opts[3]],
      "The letter H folds across a vertical line and a horizontal line, and a half turn puts it back exactly. So the logo shows <b>both line symmetry and rotation symmetry</b>.",
      { mode: "art-logoH" });
  }
]), ["Test the piece both ways: try folds first, then try part turns about the centre.", "Line symmetry needs a fold that matches exactly; rotation symmetry needs a part turn that matches exactly."]);

// 17. 10.11 L2 var: designs that demonstrate both line and rotation symmetry.
E("u7-both-symmetry-var", 7, ["10.11"], 1, "var", varset([
  function () {
    return mcq("Which design demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "A round badge with a five-pointed star in the exact centre", fb: "Correct. The star folds along 5 lines and matches itself under turns about the centre." },
      [
        { t: "A square tile with a pinwheel of four curved blades", fb: "The pinwheel has rotation symmetry, but its curved blades give it no fold line." },
        { t: "A flag with one arrow pointing right across the middle", fb: "The arrow has a horizontal fold line, but no part turn makes it match." },
        { t: "A poster with a capital letter F in the middle of it", fb: "The letter F has neither a fold line nor a matching part turn." }
      ],
      "Only the centred star passes both tests: it folds onto itself and turns onto itself. So the design with both is <b>a round badge with a five-pointed star in the exact centre</b>.",
      { mode: "both-star" });
  },
  function () {
    return mcq("Four tiles each show one capital letter in the centre. Which tile demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "The tile with the letter H", fb: "Correct. H folds two ways and matches after a half turn." },
      [
        { t: "The tile with the letter S", fb: "S matches after a half turn, but it has no fold line." },
        { t: "The tile with the letter A", fb: "A has a vertical fold line, but no part turn makes it match." },
        { t: "The tile with the letter L", fb: "L has neither a fold line nor a matching part turn." }
      ],
      "H is the only letter listed that folds onto itself and turns onto itself. So the tile with both is <b>the tile with the letter H</b>.",
      { mode: "both-H" });
  },
  function () {
    return mcq("Which piece of artwork demonstrates BOTH line symmetry and rotation symmetry?",
      { t: "A paper snowflake with 6 matching points, cut from folded paper", fb: "Correct. It folds along lines through its centre and matches under sixth turns." },
      [
        { t: "A spiral painted in rings around the centre of a dinner plate", fb: "A spiral winds one way, so it has no fold line and no matching part turn." },
        { t: "A kite with a long tail, drawn from the side over a field", fb: "The kite shape has a fold line along its spine, but no part turn makes it match." },
        { t: "A pinwheel quilt block with four curved blades that swirl", fb: "The pinwheel has rotation symmetry only; its curved blades give it no fold line." }
      ],
      "Only the snowflake passes both tests: folds through the centre and matching part turns. So the piece with both is <b>a paper snowflake with 6 matching points, cut from folded paper</b>.",
      { mode: "both-snowflake" });
  },
  function () {
    return mcq("A tile design folds exactly onto itself along 2 lines, and it matches itself twice in one full turn about its centre. Which statement names both of its symmetry features correctly?",
      { t: "It has line symmetry, and rotation symmetry of order 2 with angle 180°", fb: "Correct. Two matches in a full turn give order 2, and 360 divided by 2 is 180." },
      [
        { t: "It has line symmetry, and rotation symmetry of order 4 with angle 90°", fb: "Four matches would be needed for order 4; this design matches twice." },
        { t: "It has line symmetry only, with no matching turn about its centre", fb: "Matching twice in a full turn is rotation symmetry, so it has that too." },
        { t: "It has rotation symmetry of order 2 with angle 180° only, and no fold line", fb: "Folding onto itself along 2 lines is line symmetry, so it has that too." }
      ],
      "Folding gives line symmetry, and the turn count gives the order: \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] So the statement is <b>it has line symmetry, and rotation symmetry of order 2 with angle 180°</b>.",
      { mode: "both-features" });
  }
]), ["A design needs to pass both tests: a fold that matches and a part turn that matches.", "Check each choice for a fold line first, then for a matching turn about the centre."]);

// 18. 10.5 L2 gen MC with figure: how two shapes on a grid are related.
E("u7-related-shapes", 7, ["10.5"], 1, "gen", function () {
  function sqLens(pts) {
    var out = [];
    for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; out.push((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
    return out.sort(function (x, y) { return x - y; }).join(",");
  }
  for (var att = 0; att < 200; att++) {
    var A = [[-5 + ri(0, 1), -3 + ri(0, 2)], [-1 - ri(0, 1), -2 + ri(0, 2)], [-4 + ri(0, 1), 2 + ri(0, 2)]];
    var area = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
    if (area < 4) continue;
    var mode = pick(["reflection", "rotation", "neither"]);
    var B;
    if (mode === "reflection") B = A.map(function (p) { return [-p[0], p[1]]; });
    else if (mode === "rotation") B = A.map(function (p) { return [-p[0], -p[1]]; });
    else { B = A.map(function (p) { return [-p[0], p[1]]; }); B[1] = [B[1][0], B[1][1] + 1]; if (sqLens(A) === sqLens(B)) continue; }
    var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
    var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
      labels: [{ p: cenA, str: "A", size: 14, bold: true }, { p: cenB, str: "B", size: 14, bold: true }],
      aria: "Two triangles A and B on a grid" });
    var reflT = "They are related by a reflection (one is the mirror image of the other).";
    var rotT = "They are related by a rotation (one is a turned copy of the other).";
    var neiT = "They are not related by a reflection or a rotation.";
    var enlT = "Shape B is an enlargement of shape A.";
    var sol, q;
    var prompt = "Shape A and shape B are shown on the grid. How are the two shapes related?";
    if (mode === "reflection") {
      sol = "Shape B has the same side lengths as shape A but is flipped: each vertex of B is the mirror image of a vertex of A across the y-axis. So <b>they are related by a reflection (one is the mirror image of the other)</b>.";
      q = mcq(prompt, { t: reflT, fb: "Correct. B is the mirror image of A across the y-axis." },
        [{ t: rotT, fb: "A rotation keeps the handedness of a shape; B is flipped compared with A." }, { t: neiT, fb: "They are related: check what a mirror across the y-axis does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-refl", A: A.join(";") });
    } else if (mode === "rotation") {
      sol = "Shape B has the same side lengths and the same handedness as shape A, turned a half turn about the origin: each vertex " + "\\((x, y)\\)" + " of A lands at " + "\\((-x, -y)\\)" + " in B. So <b>they are related by a rotation (one is a turned copy of the other)</b>.";
      q = mcq(prompt, { t: rotT, fb: "Correct. B is A turned a half turn about the origin." },
        [{ t: reflT, fb: "A reflection would flip the shape; B keeps the same handedness as A." }, { t: neiT, fb: "They are related: check what a half turn about the origin does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-rot", A: A.join(";") });
    } else {
      sol = "Shape B does not have the same side lengths as shape A, so it cannot be a mirror image or a turned copy, since reflections and rotations keep side lengths. So <b>they are not related by a reflection or a rotation</b>.";
      q = mcq(prompt, { t: neiT, fb: "Correct. One side length differs, and reflections and rotations never change side lengths." },
        [{ t: reflT, fb: "A mirror image would keep every side length; compare the sides here." }, { t: rotT, fb: "A turned copy would keep every side length; compare the sides here." }, { t: enlT, fb: "An enlargement scales every side by one factor; here only part of the shape changed." }], sol, { mode: "related-neither", A: A.join(";") });
    }
    q.figure = grid;
    return q;
  }
  var qf = mcq("Shape A and shape B are shown on the grid. How are the two shapes related?",
    { t: "They are related by a reflection (one is the mirror image of the other).", fb: "Correct." },
    [{ t: "They are related by a rotation (one is a turned copy of the other).", fb: "B is flipped compared with A." }, { t: "They are not related by a reflection or a rotation.", fb: "Check a mirror across the y-axis." }, { t: "Shape B is an enlargement of shape A.", fb: "The side lengths are the same." }],
    "Each vertex of B is the mirror image of a vertex of A across the y-axis, so <b>they are related by a reflection</b>.", { mode: "related-refl", A: "-4,-2;-1,-1;-3,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[-4, -2], [-1, -1], [-3, 2]], fill: FIG_SHADE }, { pts: [[4, -2], [1, -1], [3, 2]], fill: "#ffffff" }], labels: [{ p: [-2.7, -0.3], str: "A", size: 14, bold: true }, { p: [2.7, -0.3], str: "B", size: 14, bold: true }], aria: "Two triangles A and B on a grid" });
  return qf;
}, ["Reflections and rotations never change side lengths, so compare the sides first.", "If the sides match, decide whether the second shape is flipped (reflection) or just turned (rotation)."]);

// 19. 10.6 L2 gen MC with figure: symmetry that arises from a transformation.
E("u7-transformation-symmetry", 7, ["10.6"], 1, "gen", function () {
  var mode = pick(["reflY", "reflX", "rot180"]);
  var A = [[ri(1, 2), ri(1, 2)], [ri(4, 5), ri(1, 2)], [ri(1, 3), ri(4, 5)]];
  var area19 = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
  if (area19 < 4) { A = [[1, 1], [5, 2], [2, 5]]; }
  var B;
  if (mode === "reflY") B = A.map(function (p) { return [-p[0], p[1]]; });
  else if (mode === "reflX") B = A.map(function (p) { return [p[0], -p[1]]; });
  else B = A.map(function (p) { return [-p[0], -p[1]]; });
  var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
  var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
  var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
    labels: [{ p: cenA, str: "Shape", size: 12, bold: true }, { p: cenB, str: "Image", size: 12, bold: true }],
    aria: "A shape and its image on a grid" });
  var yT = "The shape and its image have line symmetry across the y-axis.";
  var xT = "The shape and its image have line symmetry across the x-axis.";
  var rT = "The shape and its image have rotation symmetry of order 2 about the origin.";
  var nT = "The shape and its image have no line or rotation symmetry.";
  var corrT = mode === "reflY" ? yT : (mode === "reflX" ? xT : rT);
  var all = [yT, xT, rT, nT];
  var rest = all.filter(function (t) { return t !== corrT; }).map(function (t) {
    return { t: t, fb: t === nT ? "The combined picture does have a symmetry; picture folding it or turning it as one piece." : "That names the wrong mirror line or centre for this picture; check where the image sits." };
  });
  var expl = mode === "reflY" ? "The image is the mirror image of the shape across the y-axis, so the combined picture folds exactly onto itself along the y-axis."
    : mode === "reflX" ? "The image is the mirror image of the shape across the x-axis, so the combined picture folds exactly onto itself along the x-axis."
    : "The image is the shape turned a half turn about the origin, so the combined picture matches itself after a half turn about the origin, which is rotation symmetry of order 2.";
  var q = mcq("A shape and its image after a transformation are shown on the grid. Which statement describes the symmetry of the combined picture (the shape and its image together)?",
    { t: corrT, fb: "Correct. " + expl }, rest,
    expl + " So the statement is: <b>" + corrT + "</b>",
    { mode: "transf-" + mode, A: A.join(";") });
  q.figure = grid;
  return q;
}, ["Treat the shape and its image as one picture, then test folds and turns on the whole picture.", "Look at where the image sits compared with the shape: mirrored sideways, mirrored up and down, or turned a half turn."]);

// 20. 10.12 L3 gen MC with figure: complete a transformation and name the resulting symmetry.
E("u7-complete-transformation", 7, ["10.12"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var mode = pick(["reflY", "reflX", "rot180"]);
    var A = [ri(1, 2), ri(1, 2)], B = [ri(3, 5), ri(1, 3)], C = [ri(1, 3), ri(4, 5)];
    var pts = [A, B, C];
    var area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]));
    if (area < 4) continue;
    function tr(p) { return mode === "reflY" ? [-p[0], p[1]] : mode === "reflX" ? [p[0], -p[1]] : [-p[0], -p[1]]; }
    function trAlt(p) { return mode === "reflY" ? [p[0], -p[1]] : mode === "reflX" ? [-p[0], p[1]] : [-p[1], -p[0]]; }
    var Ap = tr(A), Bp = tr(B), BpAlt = trAlt(B);
    if (u7Coord(Bp) === u7Coord(BpAlt)) continue;
    var symT = mode === "reflY" ? "line symmetry across the y-axis" : mode === "reflX" ? "line symmetry across the x-axis" : "rotation symmetry of order 2 about the origin";
    var symWrong = mode === "rot180" ? "line symmetry across the y-axis" : "rotation symmetry of order 2 about the origin";
    var corrT = "B' is at " + u7Coord(Bp) + ", and the combined picture has " + symT + ".";
    var d1 = "B' is at " + u7Coord(BpAlt) + ", and the combined picture has " + symT + ".";
    var d2 = "B' is at " + u7Coord(Bp) + ", and the combined picture has " + symWrong + ".";
    var d3 = "B' is at " + u7Coord(BpAlt) + ", and the combined picture has " + symWrong + ".";
    if (new Set([corrT, d1, d2, d3]).size < 4) continue;
    var transWord = mode === "reflY" ? "reflected across the y-axis" : mode === "reflX" ? "reflected across the x-axis" : "rotated 180° about the origin";
    var ruleTxt = mode === "reflY" ? "\\((x, y) \\to (-x, y)\\)" : mode === "reflX" ? "\\((x, y) \\to (x, -y)\\)" : "\\((x, y) \\to (-x, -y)\\)";
    var prompt = "Triangle ABC has vertices A" + u7Coord(A) + ", B" + u7Coord(B) + " and C" + u7Coord(C) + ". It is " + transWord + ". The image of A is A' at " + u7Coord(Ap) + ", as shown. Which statement correctly completes the transformation and describes the symmetry of the combined picture?";
    var sol = "The rule is " + ruleTxt + ". Applying it to B" + u7Coord(B) + ": \\[ \\begin{aligned} B &\\to " + u7Coord(Bp) + " \\end{aligned} \\] The shape and its image together fold or turn onto themselves as stated, so the correct statement is: <b>" + corrT + "</b>";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p, i) { return { p: p, label: ["A", "B", "C"][i], dx: 11, dy: -11 }; }).concat([{ p: Ap, label: "A'", dx: -13, dy: -11 }]),
      aria: "A triangle and one image vertex on a grid" });
    var q = mcq(prompt,
      { t: corrT, fb: "Correct. The vertex follows the rule, and the symmetry matches the transformation." },
      [
        { t: d1, fb: "The symmetry part is right, but that point uses the wrong rule for B." },
        { t: d2, fb: "The point for B is right, but the combined picture does not have that symmetry." },
        { t: d3, fb: "Both parts are wrong: the point uses the wrong rule, and the symmetry does not match." }
      ], sol, { mode: "complete-" + mode, A: A.join(","), B: B.join(","), Bp: Bp.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Triangle ABC has vertices A(1, 1), B(4, 2) and C(2, 4). It is reflected across the y-axis. The image of A is A' at (-1, 1), as shown. Which statement correctly completes the transformation and describes the symmetry of the combined picture?",
    { t: "B' is at (-4, 2), and the combined picture has line symmetry across the y-axis.", fb: "Correct." },
    [{ t: "B' is at (4, -2), and the combined picture has line symmetry across the y-axis.", fb: "That point uses the wrong rule for B." }, { t: "B' is at (-4, 2), and the combined picture has rotation symmetry of order 2 about the origin.", fb: "The point is right, but the symmetry is wrong." }, { t: "B' is at (4, -2), and the combined picture has rotation symmetry of order 2 about the origin.", fb: "Both parts are wrong." }],
    "The rule is \\((x, y) \\to (-x, y)\\), so B lands at (-4, 2), and the pair folds along the y-axis.", { mode: "complete-reflY", A: "1,1", B: "4,2", Bp: "-4,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[1, 1], [4, 2], [2, 4]], fill: FIG_SHADE }], marks: [{ p: [1, 1], label: "A", dx: 11, dy: -11 }, { p: [4, 2], label: "B", dx: 11, dy: -11 }, { p: [2, 4], label: "C", dx: 11, dy: -11 }, { p: [-1, 1], label: "A'", dx: -13, dy: -11 }], aria: "A triangle and one image vertex on a grid" });
  return qf;
}, ["Apply the same rule to the named vertex that the given image vertex shows.", "First find where B lands using the rule, then name the symmetry of the shape and image together."]);

// 21. 10.13 L2 gen MC, CR 2: translation rule applied to a shape given by coordinates.
E("u7-translation-rule", 7, ["10.13"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var a = ri(1, 5), b = ri(1, 5);
    if (a === b) continue;
    var dx = (Math.random() < 0.5 ? 1 : -1) * a, dy = (Math.random() < 0.5 ? 1 : -1) * b;
    var pts = [[ri(-3, 3), ri(-3, 3)], [ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)]];
    if (new Set(pts.map(u7Coord)).size < 3) continue;
    var ask = ri(0, 2), P = pts[ask];
    var img = [P[0] + dx, P[1] + dy];
    var cand = [img, [P[0] - dx, P[1] + dy], [P[0] + dx, P[1] - dy], [P[0] + dy, P[1] + dx]];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    var hWord = dx > 0 ? "R" + fmt(dx) : "L" + fmt(-dx);
    var vWord = dy > 0 ? "U" + fmt(dy) : "D" + fmt(-dy);
    var hTxt = dx > 0 ? "right " + fmt(dx) : "left " + fmt(-dx);
    var vTxt = dy > 0 ? "up " + fmt(dy) : "down " + fmt(-dy);
    var names = ["A", "B", "C"];
    var prompt = "A shape has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". It is translated by the rule " + hWord + ", " + vWord + ", which means slide " + hTxt + " and " + vTxt + ". What are the coordinates of the image of vertex " + names[ask] + "?";
    var sol = "Apply the slide to vertex " + names[ask] + u7Coord(P) + ": \\[ \\begin{aligned} x' &= " + fmt(P[0]) + (dx >= 0 ? " + " + fmt(dx) : " - " + fmt(-dx)) + " = " + fmt(img[0]) + " \\\\ y' &= " + fmt(P[1]) + (dy >= 0 ? " + " + fmt(dy) : " - " + fmt(-dy)) + " = " + fmt(img[1]) + " \\end{aligned} \\] So the image of vertex " + names[ask] + " is <b>" + u7Coord(img) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The x slide and the y slide are both applied to the vertex." },
      [
        { t: u7Coord(cand[1]), fb: "The sideways slide went the wrong way; check whether the rule says left or right." },
        { t: u7Coord(cand[2]), fb: "The vertical slide went the wrong way; check whether the rule says up or down." },
        { t: u7Coord(cand[3]), fb: "That swaps the two slides; the first number in the rule is the sideways slide." }
      ], sol, { mode: "translation", dx: dx, dy: dy, P: P.join(","), img: img.join(",") });
    q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: 11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    return q;
  }
  var q = mcq("A shape has vertices A(0, 0), B(3, 1) and C(1, 4). It is translated by the rule R2, U3, which means slide right 2 and up 3. What are the coordinates of the image of vertex B?",
    { t: "(5, 4)", fb: "Correct." },
    [{ t: "(1, 4)", fb: "The sideways slide went the wrong way." }, { t: "(5, -2)", fb: "The vertical slide went the wrong way." }, { t: "(6, 3)", fb: "That swaps the two slides." }],
    "Adding the slides to B(3, 1) gives (5, 4), so the image of B is <b>(5, 4)</b>.", { mode: "translation", dx: 2, dy: 3, P: "3,1", img: "5,4" });
  q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: [[0, 0], [3, 1], [1, 4]], fill: FIG_SHADE }],
    marks: [{ p: [0, 0], label: "A", dx: 11, dy: -11 }, { p: [3, 1], label: "B", dx: 11, dy: -11 }, { p: [1, 4], label: "C", dx: 11, dy: -11 }],
    aria: "A triangle on a grid" });
  return q;
}, ["In the rule, the letter tells the direction and the number tells how far, first sideways then up or down.", "Add the sideways slide to the x coordinate and the vertical slide to the y coordinate (subtracting for left or down)."]);

// Unit 8: Circle Geometry (Math 9, NL). Entries only; helpers prefixed u8.
function u8P(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), Math.sin(a)]; }
function u8Rot(p, deg) { var a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }
function u8Dir(from, to) { return Math.atan2(to[1] - from[1], to[0] - from[0]) * 180 / Math.PI; }
function u8Txt(x, y, str, size) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central">' + str + '</text>';
}
/* Reusable circle figure. spec.pts maps names to math coords (centre O is [0,0],
   points on the circle have length 1). Options: segs [[a,b],...], tangentAt name
   (line perpendicular to the radius there), tangentSeg {at,to,beyond,back},
   perp [a,b] (draws O to the chord midpoint M, with a right-angle mark at M),
   angles [{v,a1,a2,r,lr,label}], rightMarks [{v,a1,a2}],
   sideLabs [{a,b,text,off}], ptOff {name:[dx,dy]} label nudges in px. */
function u8Fig(spec) {
  var W = spec.W || 330, H = spec.H || 270, pad = 36;
  var pts = {}; Object.keys(spec.pts).forEach(function (k) { pts[k] = spec.pts[k]; });
  pts.O = [0, 0];
  var fit = [[-1, -1], [1, 1]];
  Object.keys(pts).forEach(function (k) { fit.push(pts[k]); });
  var tanEnds = null;
  if (spec.tangentAt) {
    var T = pts[spec.tangentAt], th = Math.atan2(T[1], T[0]);
    var td = [-Math.sin(th), Math.cos(th)], ext = spec.tanExt || 0.62;
    tanEnds = [[T[0] - td[0] * ext, T[1] - td[1] * ext], [T[0] + td[0] * ext, T[1] + td[1] * ext]];
    fit.push(tanEnds[0]); fit.push(tanEnds[1]);
  }
  var tanSegEnds = null;
  if (spec.tangentSeg) {
    var A0 = pts[spec.tangentSeg.at], B0 = pts[spec.tangentSeg.to];
    var vx = B0[0] - A0[0], vy = B0[1] - A0[1];
    tanSegEnds = [[A0[0] - vx * (spec.tangentSeg.back || 0.35), A0[1] - vy * (spec.tangentSeg.back || 0.35)],
                  [A0[0] + vx * (spec.tangentSeg.beyond || 1.12), A0[1] + vy * (spec.tangentSeg.beyond || 1.12)]];
    fit.push(tanSegEnds[0]); fit.push(tanSegEnds[1]);
  }
  var Mpt = null;
  if (spec.perp) {
    var PA = pts[spec.perp[0]], PB = pts[spec.perp[1]];
    Mpt = [(PA[0] + PB[0]) / 2, (PA[1] + PB[1]) / 2]; pts.M = Mpt; fit.push(Mpt);
  }
  var xs = fit.map(function (p) { return p[0]; }), ys = fit.map(function (p) { return p[1]; });
  var mnx = Math.min.apply(null, xs), mxx = Math.max.apply(null, xs), mny = Math.min.apply(null, ys), mxy = Math.max.apply(null, ys);
  var sc = Math.min((W - 2 * pad) / Math.max(mxx - mnx, 0.01), (H - 2 * pad) / Math.max(mxy - mny, 0.01));
  var cxm = (mnx + mxx) / 2, cym = (mny + mxy) / 2;
  function S(p) { return [W / 2 + (p[0] - cxm) * sc, H / 2 - (p[1] - cym) * sc]; }
  function seg(p, q, w, dash) {
    return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
  }
  function scrDir(deg) { var a = deg * Math.PI / 180; return [Math.cos(a), -Math.sin(a)]; }
  function rightMark(vName, a1, a2) {
    var V = S(pts[vName]), u = scrDir(a1), w = scrDir(a2), sz = 11;
    var p1 = [V[0] + sz * u[0], V[1] + sz * u[1]], p2 = [V[0] + sz * (u[0] + w[0]), V[1] + sz * (u[1] + w[1])], p3 = [V[0] + sz * w[0], V[1] + sz * w[1]];
    return '<polyline points="' + fmt(p1[0], 1) + ',' + fmt(p1[1], 1) + ' ' + fmt(p2[0], 1) + ',' + fmt(p2[1], 1) + ' ' + fmt(p3[0], 1) + ',' + fmt(p3[1], 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  }
  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Circle diagram">';
  var Oc = S([0, 0]);
  out += '<circle cx="' + fmt(Oc[0], 1) + '" cy="' + fmt(Oc[1], 1) + '" r="' + fmt(sc, 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  if (tanEnds) out += seg(S(tanEnds[0]), S(tanEnds[1]), 2);
  if (tanSegEnds) out += seg(S(tanSegEnds[0]), S(tanSegEnds[1]), 2);
  (spec.segs || []).forEach(function (sg) { out += seg(S(pts[sg[0]]), S(pts[sg[1]]), 2, sg[2]); });
  if (spec.perp) {
    out += seg(Oc, S(Mpt), 2);
    out += rightMark('M', u8Dir(Mpt, pts.O), u8Dir(Mpt, pts[spec.perp[0]]));
  }
  (spec.rightMarks || []).forEach(function (rm) { out += rightMark(rm.v, rm.a1, rm.a2); });
  (spec.angles || []).forEach(function (an) {
    var V = S(pts[an.v]), r = an.r * sc, d = ((an.a2 - an.a1) % 360 + 360) % 360; if (d === 0) d = 360;
    var p1 = [V[0] + r * scrDir(an.a1)[0], V[1] + r * scrDir(an.a1)[1]], p2 = [V[0] + r * scrDir(an.a2)[0], V[1] + r * scrDir(an.a2)[1]];
    out += '<path d="M ' + fmt(p1[0], 1) + ' ' + fmt(p1[1], 1) + ' A ' + fmt(r, 1) + ' ' + fmt(r, 1) + ' 0 ' + (d > 180 ? 1 : 0) + ' 0 ' + fmt(p2[0], 1) + ' ' + fmt(p2[1], 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
    if (an.label) {
      var mid = an.a1 + d / 2, lp = [V[0] + an.lr * sc * scrDir(mid)[0], V[1] + an.lr * sc * scrDir(mid)[1]];
      out += u8Txt(lp[0], lp[1], an.label, 13);
    }
  });
  (spec.sideLabs || []).forEach(function (sl) {
    var A = S(pts[sl.a]), B = S(pts[sl.b]), Mx = (A[0] + B[0]) / 2, My = (A[1] + B[1]) / 2;
    var dx = B[0] - A[0], dy = B[1] - A[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / L, ny = dx / L, off = sl.off || 15;
    if (nx * (Mx - Oc[0]) + ny * (My - Oc[1]) < 0) { nx = -nx; ny = -ny; }
    out += u8Txt(Mx + nx * off, My + ny * off, sl.text, 12);
  });
  Object.keys(pts).forEach(function (k) {
    var P = S(pts[k]);
    out += '<circle cx="' + fmt(P[0], 1) + '" cy="' + fmt(P[1], 1) + '" r="2.6" fill="' + FIG_INK + '"/>';
    var off;
    if (spec.ptOff && spec.ptOff[k]) off = spec.ptOff[k];
    else if (k === 'O') off = [13, 13];
    else if (k === 'M') { var d = [pts.M[0] - 0, pts.M[1] - 0], dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]) || 1; off = [-d[1] / dl * 15, d[0] / dl * 15]; if (off[0] > 0) { off[0] = -off[0]; off[1] = -off[1]; } }
    else { var q = pts[k], ql = Math.sqrt(q[0] * q[0] + q[1] * q[1]) || 1; off = [q[0] / ql * 16, -q[1] / ql * 16]; }
    out += u8Txt(P[0] + off[0], P[1] + off[1], k, 13);
  });
  return out + '</svg>';
}
var U8_TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];

// 1. 9.4 L1 MC: radius to a tangent is perpendicular to the tangent.
