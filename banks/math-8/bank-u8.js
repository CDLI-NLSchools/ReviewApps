// Math 8 Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 3483 to 4165).
// CRMARKS: u8-around-point-num=3
// CRMARKS: u8-build-max-num=3
// CRMARKS: u8-cubes-total-num=3
// CRMARKS: u8-front-squares-num=3
// CRMARKS: u8-irregular-angle-num=2
// CRMARKS: u8-mixed-point-num=2
// CRMARKS: u8-rotate-front-num=2
/* Unit 8: Geometry */
// Unit 8: Geometry (Math 8, NL). Entries only; helpers prefixed u8.
// Block objects are shown as height maps: a labelled grid where each number
// tells how many cubes are stacked on that square. Back row is at the top of
// the grid, front row at the bottom, matching looking down at the object.
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u8Rect(x, y, w, h, fill) {
  return '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + fmt(w, 1) + '" height="' + fmt(h, 1) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
}
// Height-map grid drawn with its top-left corner at (x0, y0). hm rows run back to front.
function u8HM(hm, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < hm.length; r++) for (c = 0; c < hm[r].length; c++) {
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, hm[r][c] > 0 ? FIG_SHADE : "#ffffff");
    s += u8T(x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 1, fmt(hm[r][c]), 13, true);
  }
  var w = hm[0].length * cell, h = hm.length * cell;
  s += u8T(x0 + w / 2, y0 - 11, "BACK", 10, true);
  s += u8T(x0 + w / 2, y0 + h + 12, "FRONT", 10, true);
  s += u8T(x0 - 13, y0 + h / 2, "L", 10, true);
  s += u8T(x0 + w + 13, y0 + h / 2, "R", 10, true);
  return s;
}
function u8HMSize(hm, cell) { return [hm[0].length * cell + 30, hm.length * cell + 28]; }
// Occupancy grid (for top views): occ rows back to front, 1 = a stack is there.
function u8Occ(occ, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < occ.length; r++) for (c = 0; c < occ[r].length; c++)
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, occ[r][c] ? FIG_INK : "#ffffff");
  return s;
}
// Silhouette of a view: prof[c] = stack height in column c, drawn from a baseline.
function u8Sil(prof, x0, yBase, cell) {
  var s = "", c, k;
  for (c = 0; c < prof.length; c++) for (k = 0; k < prof[c]; k++)
    s += u8Rect(x0 + c * cell, yBase - (k + 1) * cell, cell, cell, FIG_SHADE);
  s += '<line x1="' + fmt(x0 - 3, 1) + '" y1="' + fmt(yBase, 1) + '" x2="' + fmt(x0 + prof.length * cell + 3, 1) + '" y2="' + fmt(yBase, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  return s;
}
function u8FrontProf(hm) {
  var out = [], c, r;
  for (c = 0; c < hm[0].length; c++) { var m = 0; for (r = 0; r < hm.length; r++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}
function u8SideProf(hm) { // right side view, left to right in the drawing = front row to back row
  var out = [], r, c;
  for (r = hm.length - 1; r >= 0; r--) { var m = 0; for (c = 0; c < hm[r].length; c++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}
function u8OccOf(hm) { return hm.map(function (row) { return row.map(function (v) { return v > 0 ? 1 : 0; }); }); }
function u8Sum(hm) { var s = 0; hm.forEach(function (row) { row.forEach(function (v) { s += v; }); }); return s; }
function u8SumArr(a) { var s = 0; a.forEach(function (v) { s += v; }); return s; }
function u8Key(a) { return JSON.stringify(a); }
function u8RandHM(rows, cols, maxH, minTot, maxTot) {
  for (var att = 0; att < 300; att++) {
    var hm = [], r, c, tot = 0, nz = 0;
    for (r = 0; r < rows; r++) { var row = []; for (c = 0; c < cols; c++) { var v = ri(0, maxH); row.push(v); tot += v; if (v > 0) nz++; } hm.push(row); }
    if (tot < minTot || tot > maxTot || nz < 3) continue;
    var heights = {}; hm.forEach(function (rw) { rw.forEach(function (v) { heights[v] = 1; }); });
    if (Object.keys(heights).length < 3) continue;
    return hm;
  }
  return [[2, 0, 1], [1, 3, 1]];
}
function u8RotHM(hm, turns) { // turns of 90 degrees clockwise, seen from above (back stays at top)
  var cur = hm, t, r, c;
  for (t = 0; t < turns; t++) {
    var nr = cur[0].length, nc = cur.length, nxt = [];
    for (r = 0; r < nr; r++) { var row = []; for (c = 0; c < nc; c++) row.push(cur[nc - 1 - c][r]); nxt.push(row); }
    cur = nxt;
  }
  return cur;
}
function u8ProfStr(p) { return p.map(function (v) { return fmt(v); }).join(", "); }
function u8HMStr(hm) {
  var names = hm.length === 2 ? ["Back row", "Front row"] : ["Back row", "Middle row", "Front row"];
  return hm.map(function (row, i) { return names[i] + " (left to right): " + u8ProfStr(row); }).join(". ") + ".";
}
function u8RegPoly(cx, cy, R, n, rotDeg) {
  var pts = [], i, a;
  for (i = 0; i < n; i++) { a = (rotDeg + i * 360 / n - 90) * Math.PI / 180; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
}
function u8Interior(n) { return (n - 2) * 180 / n; }
var U8_POLY_NAMES = { 3: "equilateral triangle", 4: "square", 5: "regular pentagon", 6: "regular hexagon", 8: "regular octagon", 10: "regular decagon", 12: "regular dodecagon" };

// 1. 10.15 L1 gen MC with figure: pick the top view from four drawn candidates.
E("u8-top-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var occ = u8OccOf(hm);
    var trans = [[occ[0][0], occ[1][0]], [occ[0][1], occ[1][1]], [occ[0][2], occ[1][2]]];
    var mirror = occ.map(function (row) { return row.slice().reverse(); });
    var full = occ.map(function (row) { return row.map(function () { return 1; }); });
    var cands = [
      { g: occ, lab: "the top view", good: true },
      { g: trans, lab: "the top view turned sideways", good: false, why: "That candidate turns the plan sideways, swapping the back-to-front and left-to-right directions." },
      { g: mirror, lab: "the mirrored top view", good: false, why: "That candidate is the mirror image; the left and right sides are swapped." },
      { g: full, lab: "the fully filled top view", good: false, why: "That candidate fills every square, but some squares of the object hold no cubes." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.g); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 26, hmW = 3 * cell, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
    body += u8HM(hm, 160 - hmW / 2, 30, cell);
    var cc = 13, pos = [[52, 128], [196, 128], [52, 196], [196, 196]];
    cands.forEach(function (cd, i) {
      var w = cd.g[0].length * cc, h = cd.g.length * cc;
      body += u8Occ(cd.g, pos[i][0], pos[i][1], cc);
      body += u8T(pos[i][0] + w / 2, pos[i][1] + h + 12, "View " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 252, body, "Height map of a block object and four candidate top views labelled A to D");
    var opts = cands.map(function (cd, i) {
      return { t: "View " + "ABCD"[i], fb: cd.good ? "Correct. Every filled square matches a square that holds at least one cube, and the back row stays at the back." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("The top part of the diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Which candidate below is the top view of the object? The top view shows one square for each stack, filled in.",
      corr, rest,
      "Looking straight down, height does not matter: a square is filled exactly when its stack has at least one cube. Matching the filled squares, back row to back row and left to right, gives <b>View " + "ABCD"[gi] + "</b>.",
      { mode: "top-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Which candidate is the top view of the object?",
    { t: "View A", fb: "Correct." },
    [{ t: "View B", fb: "That swaps left and right." }, { t: "View C", fb: "That fills squares that hold no cubes." }, { t: "View D", fb: "That turns the plan sideways." }],
    "A square is filled exactly when its stack has at least one cube, so the top view is <b>View A</b>.", { mode: "top-choice", hm: "fb", good: 0 });
}, ["The top view cares only about which squares hold cubes, not how tall each stack is.", "Work through the back row first, marking each square filled or empty."]);

// 2. 10.18 L1 var: views of objects in the environment.
E("u8-env-views-var", 8, ["10.18"], 1, "var", varset([
  function () {
    var q=mcq("Sofia sketches a cereal box standing on a kitchen table. From directly above, what shape does she draw for the top view?",
      { t: "A rectangle, the size of the top face of the box.", fb: "Correct. Looking straight down shows the top face in its true shape." },
      [{ t: "A tall rectangle showing the front face of the cereal box.", fb: "That is the front view; the top view shows only the top face." }, { t: "A square the size of the end panel of the box.", fb: "That is close to a side view; the top face is the long rectangle on top." }, { t: "A circle showing the whole box at once from above.", fb: "One view shows one direction only; from above you see the top face." }],
      "A view shows the face you are looking straight at. From above, that is the top face, so the top view is <b>a rectangle, the size of the top face of the box</b>.",
      { mode: "env-cereal" }); q.figure=m8BoxLabSVG("","","",false); return q;
  },
  function () {
    var q=mcq("A lighthouse is roughly a tall cylinder that gets a little narrower toward the top. Which description fits its top view?",
      { t: "A circle.", fb: "Correct. Looking straight down a cylinder shows a circle." },
      [{ t: "A rectangle.", fb: "That fits the front or side view of the tower, not the view from above." }, { t: "A triangle.", fb: "A triangle would fit a cone or pyramid shape seen from the side, not this tower from above." }, { t: "A long oval.", fb: "A view of the object shows the object only; from above the tower is a circle." }],
      "From directly above, a cylinder shows its round top face. So the top view is <b>a circle</b>.",
      { mode: "env-lighthouse" }); q.figure=m8CylLabSVG("","",false,false); return q;
  },
  function () {
    return mcq("Marcus draws the front view of a school bus parked facing him. What should his front view show?",
      { t: "A wide rectangle with the windshield, headlights and front wheels.", fb: "Correct. The front view shows the face of the bus that points at him." },
      [{ t: "A long rectangle with a row of side windows and two wheels.", fb: "That is the side view; the front view is the short end of the bus." }, { t: "A flat rectangle the size of the whole roof of the bus.", fb: "That is the top view; the front view stands upright." }, { t: "The bus cut in half lengthways so all the seats inside it show clearly.", fb: "A view drawing shows the outside face, not a cut through the object." }],
      "The front view shows the face pointing toward the viewer, so it shows <b>a wide rectangle with the windshield, headlights and front wheels</b>.",
      { mode: "env-bus" });
  },
  function () {
    return mcq("A mug sits on a table with its handle pointing to the right. Which description fits the right side view of the mug?",
      { t: "The body of the mug with the handle sticking out on the far side of the drawing.", fb: "Correct. From the right, you look along the handle direction and see the handle profile." },
      [{ t: "A circle for the top of the mug, seen from directly above the table.", fb: "That is the top view; a side view stands upright." }, { t: "The body of the mug with no handle showing at all on either side of the drawing of it.", fb: "That fits the left side view; from the right, the handle is in line with your view and shows." }, { t: "A flat line the full width of the mug, with nothing above or below it.", fb: "That would be an edge only; the side view shows the full height of the mug." }],
      "Each view shows the object from one direction. From the right side, the handle points toward you, so the view is <b>the body of the mug with the handle sticking out on the far side of the drawing</b>.",
      { mode: "env-mug" });
  },
  function () {
    return mcq("Priya photographs a ferry directly from the front as it comes into the wharf. In her photo, what happens to the long side of the ferry?",
      { t: "It points away from her, so the photo shows mainly the narrow bow end.", fb: "Correct. In a front view, the length runs away from the viewer and does not spread across the picture." },
      [{ t: "It spreads across the whole photo, showing every window along the side.", fb: "That describes a side view of the ferry, not the front view." }, { t: "It appears as a flat rectangle on top of the ferry.", fb: "That describes the top view; the photo is taken from the front." }, { t: "It doubles in length because the ferry is moving.", fb: "A view depends on direction, not on the ferry's speed." }],
      "In a front view, the long direction of the object points away from the viewer. So the photo shows <b>mainly the narrow bow end</b>.",
      { mode: "env-ferry" });
  }
]), ["Ask yourself which face of the object points straight at the viewer.", "Top views lie flat, front and side views stand upright, and each view shows one direction only."]);

// 3. 10.4 L1 var: which regular polygon tessellates on its own.
E("u8-regular-tessellates-var", 8, ["10.4"], 1, "var", varset([
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Regular hexagon, interior angle 120°.", fb: "Correct. 360 divided by 120 is 3, so three hexagons meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular octagon, interior angle 135°.", fb: "360 divided by 135 is not a whole number, so octagons alone leave gaps." }, { t: "Regular dodecagon, interior angle 150°.", fb: "360 divided by 150 is not a whole number, so dodecagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 120° &= 3 \\end{aligned} \\] So the <b>regular hexagon, interior angle 120°</b>, tessellates on its own.",
      { mode: "reg-hex" }); q.figure=m8PolyRowSVG([[6,"120\u00B0"],[5,"108\u00B0"],[8,"135\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Square, interior angle 90°.", fb: "Correct. 360 divided by 90 is 4, so four squares meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular heptagon, interior angle about 129°.", fb: "360 divided by about 129 is not a whole number, so heptagons leave gaps." }, { t: "Regular octagon, interior angle 135°.", fb: "360 divided by 135 is not a whole number, so octagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 90° &= 4 \\end{aligned} \\] So the <b>square, interior angle 90°</b>, tessellates on its own.",
      { mode: "reg-square" }); q.figure=m8PolyRowSVG([[4,"90\u00B0"],[5,"108\u00B0"],[7,"\u2248129\u00B0"],[8,"135\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Equilateral triangle, interior angle 60°.", fb: "Correct. 360 divided by 60 is 6, so six triangles meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular decagon, interior angle 144°.", fb: "360 divided by 144 is not a whole number, so decagons leave gaps." }, { t: "Regular dodecagon, interior angle 150°.", fb: "360 divided by 150 is not a whole number, so dodecagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 60° &= 6 \\end{aligned} \\] So the <b>equilateral triangle, interior angle 60°</b>, tessellates on its own.",
      { mode: "reg-tri" }); q.figure=m8PolyRowSVG([[3,"60\u00B0"],[5,"108\u00B0"],[10,"144\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Three regular polygons are tried as patio tiles: a regular pentagon (108°), a regular hexagon (120°) and a regular octagon (135°). Which one covers the patio with no gaps?",
      { t: "The regular hexagon only.", fb: "Correct. Only 120 divides 360 exactly, giving 3 tiles at each point." },
      [{ t: "The regular pentagon only.", fb: "108 does not divide 360, so pentagons cannot meet exactly around a point." }, { t: "The regular octagon only.", fb: "135 does not divide 360, so octagons alone leave square-shaped gaps." }, { t: "All three cover the patio on their own.", fb: "Only one interior angle here divides 360 exactly; check each one." }],
      "Test each angle against 360: \\[ \\begin{aligned} 360° \\div 120° &= 3 \\\\ 360° \\div 108° &\\text{ is not whole} \\\\ 360° \\div 135° &\\text{ is not whole} \\end{aligned} \\] So <b>the regular hexagon only</b> covers the patio.",
      { mode: "reg-patio" }); q.figure=m8PolyRowSVG([[5,"108\u00B0"],[6,"120\u00B0"],[8,"135\u00B0"]]); return q;
  }
]), ["At each meeting point the angles must add to exactly 360 degrees.", "Divide 360 by the interior angle; the shape tessellates alone only when the answer is a whole number."]);

// 4. 10.6 L1 var: tessellations in the environment.
E("u8-env-tess-var", 8, ["10.6"], 1, "var", varset([
  function () {
    return mcq("Which description is a tessellation you can see in the environment? A tessellation covers a surface with no gaps and no overlaps.",
      { t: "Hexagonal cells in a honeycomb, fitted together edge to edge.", fb: "Correct. The hexagons cover the surface completely with no gaps." },
      [{ t: "Round stones scattered on a beach with sand showing between them.", fb: "Gaps of sand show between the stones, so the surface is not fully covered." }, { t: "Overlapping shingles nailed in rows on a roof.", fb: "Shingles overlap each other, and a tessellation has no overlaps." }, { t: "A single large painting hanging on a wall.", fb: "One picture does not repeat to cover a surface in a pattern of shapes." }],
      "A tessellation repeats shapes to cover a surface fully, with no gaps and no overlaps. That matches <b>hexagonal cells in a honeycomb, fitted together edge to edge</b>.",
      { mode: "env-honeycomb" });
  },
  function () {
    return mcq("A hallway floor is covered in square tiles laid in straight rows and columns, grout lines forming a grid. How would you describe this floor?",
      { t: "A tessellation of squares made by sliding the tile across and down.", fb: "Correct. The squares cover the floor fully and repeat by translation." },
      [{ t: "A tessellation of circles made by rotating one tile.", fb: "The tiles are squares, and circles would leave gaps between them." }, { t: "Not a tessellation, because the grout lines break the pattern.", fb: "Grout lines are just the edges of the tiles; the squares still cover the floor with no gaps." }, { t: "Not a tessellation, because all the tiles are the same shape and size.", fb: "A tessellation can use a single shape; using one shape is the simplest kind." }],
      "The squares cover the floor with no gaps or overlaps and repeat by sliding, so the floor is <b>a tessellation of squares made by sliding the tile across and down</b>.",
      { mode: "env-floor" });
  },
  function () {
    return mcq("Bricks in a wall are laid in rows, with each row shifted by half a brick. Why does the brick pattern count as a tessellation?",
      { t: "The rectangles cover the wall with no gaps and no overlaps, and the pattern repeats.", fb: "Correct. Shifting a row is still a repeating covering with no gaps." },
      [{ t: "Because bricks are heavy, strong building materials used for building walls outside.", fb: "The weight of the pieces has nothing to do with whether a pattern tessellates." }, { t: "Because each brick in the wall is a different size from all of its neighbours.", fb: "The bricks are the same size; the pattern works because they fit with no gaps." }, { t: "Because the wall is outdoors, where everyone walking past can see it.", fb: "Being outdoors does not decide it; the covering with no gaps or overlaps does." }],
      "A tessellation needs a repeating covering with no gaps and no overlaps, which is why <b>the rectangles covering the wall with no gaps and no overlaps, in a repeating pattern</b>, counts.",
      { mode: "env-brick" });
  },
  function () {
    return mcq("Which pattern found around a school is a tessellation?",
      { t: "A mosaic of small square and triangle tiles covering a bench top completely.", fb: "Correct. The tiles fit edge to edge and cover the whole bench top." },
      [{ t: "Pebbles glued randomly onto a board in no pattern, with board showing between them.", fb: "Board showing between the pebbles means gaps, so it is not a full covering." }, { t: "Stickers placed on a locker so that some cover parts of others.", fb: "Stickers covering each other are overlaps, which a tessellation does not have." }, { t: "A checkerboard rug with several squares cut out of it.", fb: "The cut-out squares are gaps in the covering, so the rug no longer tessellates there." }],
      "Look for a full covering with no gaps and no overlaps: <b>a mosaic of small square and triangle tiles covering a bench top completely</b>.",
      { mode: "env-mosaic" });
  }
]), ["Check the two tests: no gaps, and no overlaps.", "Name the shape doing the covering and how it repeats."]);

// 5. 10.15 L2 gen MC with figure: pick the front view from four drawn silhouettes.
E("u8-front-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var front = u8FrontProf(hm), side = u8SideProf(hm);
    var backV = front.slice().reverse();
    var tall = front.map(function (v) { return Math.min(3, v + 1); });
    if (u8Key(tall) === u8Key(front)) tall = front.map(function (v) { return Math.max(0, v - 1); });
    var cands = [
      { p: front, good: true },
      { p: side, good: false, why: "That candidate is the right side view; its columns run front to back, not left to right." },
      { p: backV, good: false, why: "That candidate reverses left and right, which is what you would see from the back." },
      { p: tall, good: false, why: "That candidate changes a column height; each front column must match the tallest stack in that column." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.p); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 24, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
    body += u8HM(hm, 160 - 36, 30, cell);
    var cc = 11, pos = [[40, 148], [185, 148], [40, 218], [185, 218]];
    cands.forEach(function (cd, i) {
      body += u8Sil(cd.p, pos[i][0], pos[i][1] + 30, cc);
      body += u8T(pos[i][0] + 16, pos[i][1] + 44, "View " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 268, body, "Height map of a block object and four candidate front views labelled A to D");
    var opts = cands.map(function (cd, i) {
      return { t: "View " + "ABCD"[i], fb: cd.good ? "Correct. Each column matches the tallest stack in that column of the object, read left to right." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("The top part of the diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Which candidate below is the front view of the object? In a front view, each column is as tall as the tallest stack in that column.",
      corr, rest,
      "Read the object column by column and take the larger of the back and front numbers: the front column heights are \\( " + u8ProfStr(front) + " \\). Matching silhouette is <b>View " + "ABCD"[gi] + "</b>.",
      { mode: "front-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Which candidate is the front view of the object?",
    { t: "View A", fb: "Correct." },
    [{ t: "View B", fb: "That is a side view." }, { t: "View C", fb: "That reverses left and right." }, { t: "View D", fb: "That changes a column height." }],
    "Each front column matches the tallest stack in that column, so the front view is <b>View A</b>.", { mode: "front-choice", hm: "fb", good: 0 });
}, ["For each left-to-right column, the front view height is the tallest stack in that column.", "Write the column heights from the height map first, then match the silhouette."]);

// 6. 10.9 L2 gen MC with figure: three views shown, pick the matching object description.
E("u8-match-object", 8, ["10.9"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm), tot = u8Sum(hm);
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    var spots = (hm[0].concat(hm[1]).filter(function (v) { return v === tv; }).length);
    if (spots !== 1) continue;
    var rowName = ti === 0 ? "back row" : "front row";
    var colName = tj === 0 ? "left end" : (tj === 1 ? "middle" : "right end");
    var altRow = ti === 0 ? "front row" : "back row";
    var altCol = tj === 0 ? "right end" : "left end";
    var cell = 15;
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "RIGHT SIDE", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Views of one block object", 11, true);
    var fig = u8Svg(320, 112, body, "Top, front and right side views of a block object");
    var corrT = "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total.";
    var q = mcq("The diagram shows the top, front and right side views of a block object. Which description matches the object the views came from?",
      { t: corrT, fb: "Correct. The tallest column of the front and side views locates the tallest stack, and the views together fix the total." },
      [
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + altRow + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total.", fb: "That puts the tallest stack in the wrong row; match its position in the side view, where columns run front to back." },
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + altCol + ", and the object uses " + fmt(tot) + " cubes in total.", fb: "That mirrors the object left to right; match its position in the front view." },
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot + tv) + " cubes in total.", fb: "The position is right, but the total double-counts the tallest stack; add each stack once." }
      ],
      "The front view puts the tallest stack at the " + colName + ", the side view puts it in the " + rowName + ", and combining the views gives " + fmt(tot) + " cubes in total. So the matching description is: <b>the tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total</b>.",
      { mode: "match-object", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("The diagram shows the top, front and right side views of a block object. Which description matches the object the views came from?",
    { t: "The tallest stack is 3 cubes, in the back row at the left end, and the object uses 8 cubes in total.", fb: "Correct." },
    [{ t: "The tallest stack is 3 cubes, in the front row at the left end, and the object uses 8 cubes in total.", fb: "That puts the tallest stack in the wrong row." }, { t: "The tallest stack is 3 cubes, in the back row at the right end, and the object uses 8 cubes in total.", fb: "That mirrors the object." }, { t: "The tallest stack is 3 cubes, in the back row at the left end, and the object uses 11 cubes in total.", fb: "That double-counts the tallest stack." }],
    "Combining the views gives <b>the tallest stack of 3 cubes in the back row at the left end, with 8 cubes in total</b>.", { mode: "match-object", hm: "fb" });
}, ["Use the front view to place features left to right, and the side view to place them front to back.", "Find the tallest stack first: it is the tallest column in both the front and side views."]);

// 7. 10.10 L2 gen MC: predict the front view after a rotation on the plan.
E("u8-rotate-predict", 8, ["10.10"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var turns = pick([1, 2, 3]);
    var rot = u8RotHM(hm, turns);
    var newFront = u8FrontProf(rot), oldFront = u8FrontProf(hm), newSide = u8SideProf(rot);
    var mirrorFront = newFront.slice().reverse();
    var optsT = [u8ProfStr(newFront), u8ProfStr(oldFront), u8ProfStr(newSide), u8ProfStr(mirrorFront)];
    if (new Set(optsT).size < 4) continue;
    // where does the tallest stack go?
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < hm.length; r++) for (c = 0; c < hm[0].length; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    if (hm.flat().filter(function (v) { return v === tv; }).length !== 1) continue;
    var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
    var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
    body += u8HM(hm, 124, 30, cell);
    var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
    var q = mcq("The diagram shows a block object as a height map. The whole object is turned " + dirWord + " on the table, seen from above. After the turn, what are the column heights of the front view, read left to right? Each height is the tallest stack in that column.",
      { t: u8ProfStr(newFront), fb: "Correct. Turning the plan and then taking the tallest stack in each new column gives these heights." },
      [
        { t: u8ProfStr(oldFront), fb: "Those are the front heights before the turn; the turn moves the stacks to new columns." },
        { t: u8ProfStr(newSide), fb: "That reads a side direction of the turned object rather than its front." },
        { t: u8ProfStr(mirrorFront), fb: "That reverses the turned front view left to right; check which end the tall stacks move to." }
      ],
      "Turn the height map " + dirWord + " first, then take the tallest stack in each column of the turned map. The turned front column heights are <b>" + u8ProfStr(newFront) + "</b>.",
      { mode: "rotate-predict", hm: u8Key(hm), turns: turns });
    q.figure = fig;
    return q;
  }
  return mcq("A block object is turned 180° on the table. What are the front view column heights after the turn?",
    { t: "1, 2, 3", fb: "Correct." },
    [{ t: "3, 2, 1", fb: "That is the view before the turn." }, { t: "2, 2, 2", fb: "That flattens the stacks." }, { t: "3, 1, 2", fb: "That scrambles the columns." }],
    "Turning the map 180 degrees reverses the columns, giving <b>1, 2, 3</b>.", { mode: "rotate-predict", hm: "fb", turns: 2 });
}, ["Turn the whole height map first, in the direction named, keeping the back of the map at the top.", "After turning, take the tallest stack in each column, left to right."]);

// 8. 10.16 L2 gen num, CR 2: front view squares after a described rotation.
E("u8-rotate-front-num", 8, ["10.16"], 2, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 6, 10);
  var turns = pick([1, 2, 3]);
  var rot = u8RotHM(hm, turns);
  var prof = u8FrontProf(rot), ans = u8SumArr(prof);
  var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
  var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body += u8HM(hm, 124, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var chain = prof.map(function (v, i) { return (i === 0 ? "" : " &+ ") + fmt(v); }).join("");
  var q = numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned " + dirWord + " on the table, seen from above, and then the front view is drawn. How many squares show in that front view? Count each visible square in every column.",
    ans, 0,
    "Turn the map " + dirWord + ", then take the tallest stack in each column of the turned map: \\[ \\begin{aligned} \\text{front heights} &= " + u8ProfStr(prof) + " \\\\ \\text{squares} &= " + prof.join(" + ") + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the front view after the turn shows <b>" + fmt(ans) + "</b> squares.",
    { mode: "rotate-front-num", hm: u8Key(hm), turns: turns });
  q.figure = fig;
  return q;
}, ["The rotation changes which stacks line up in each front column.", "Turn the map first, write the new column heights, then add them."]);

// 9. 10.17 L2 gen MC with figure: given the three views, pick the object (height map in words).
E("u8-build-from-views", 8, ["10.17"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 2, 5, 8);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm);
    var swapped = [hm[1], hm[0]];
    var mirrored = hm.map(function (row) { return row.slice().reverse(); });
    var lowered = hm.map(function (row) { return row.slice(); });
    var mi = 0, mj = 0, mv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > mv) { mv = hm[r][c]; mi = r; mj = c; }
    lowered[mi][mj] = mv - 1;
    var optsT = [u8HMStr(hm), u8HMStr(swapped), u8HMStr(mirrored), u8HMStr(lowered)];
    if (new Set(optsT).size < 4) continue;
    var cell = 15;
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "RIGHT SIDE", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Build the object that has these views", 11, true);
    var fig = u8Svg(320, 112, body, "Top, front and right side views of a block object");
    var q = mcq("The diagram shows the top, front and right side views of a block object built from cubes. Which height map builds an object with exactly these views? In a height map, each number tells how many cubes are stacked on that square.",
      { t: optsT[0], fb: "Correct. Its top view, front column heights and side column heights all match the diagram." },
      [
        { t: optsT[1], fb: "That swaps the back and front rows; the side view would then read the wrong way." },
        { t: optsT[2], fb: "That mirrors the object left to right; the front view would be reversed." },
        { t: optsT[3], fb: "That lowers the tallest stack by one cube, so the front and side views would be shorter." }
      ],
      "The top view fixes which squares are used, the front view fixes the tallest stack in each column, and the side view fixes the tallest stack in each row. The map that satisfies all three is: <b>" + optsT[0] + "</b>",
      { mode: "build-from-views", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Which height map builds an object with the views shown?",
    { t: "Back row (left to right): 2, 0, 1. Front row (left to right): 1, 1, 1.", fb: "Correct." },
    [{ t: "Back row (left to right): 1, 1, 1. Front row (left to right): 2, 0, 1.", fb: "That swaps the rows." }, { t: "Back row (left to right): 1, 0, 2. Front row (left to right): 1, 1, 1.", fb: "That mirrors the object." }, { t: "Back row (left to right): 1, 0, 1. Front row (left to right): 1, 1, 1.", fb: "That lowers the tallest stack." }],
    "The map matching all three views is <b>Back row (left to right): 2, 0, 1. Front row (left to right): 1, 1, 1.</b>", { mode: "build-from-views", hm: "fb" });
}, ["Use all three views together: top for the footprint, front for column heights, side for row heights.", "Test each candidate map against the front view first; most wrong maps fail there."]);

// 10. 10.17 L2 gen num, CR 3: total cubes in the object shown as a height map.
E("u8-cubes-total-num", 8, ["10.17"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Build this object (numbers = cubes on each square)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object to build");
  var flat = hm[0].concat(hm[1]);
  var q = numq("The diagram is the plan for a block object: each number tells how many cubes are stacked on that square. How many cubes are needed to build the object in total?",
    tot, 0,
    "Add the stack on every square, back row then front row: \\[ \\begin{aligned} \\text{total} &= " + flat.join(" + ") + " \\\\ &= " + fmt(tot) + " \\end{aligned} \\] So the object needs <b>" + fmt(tot) + "</b> cubes.",
    { mode: "cubes-total", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Every number on the plan is one stack of cubes in the finished object.", "Add the back row numbers first, then the front row numbers."]);

// 11. 10.9 L2 gen num, CR 3: squares showing in the front view.
E("u8-front-squares-num", 8, ["10.9"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var prof = u8FrontProf(hm), ans = u8SumArr(prof), tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object");
  var q = numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. How many squares show in the front view of the object? In the front view, a taller stack hides any shorter stack directly behind it.",
    ans, 0,
    "In each column only the taller stack shows, so the column heights are the larger number in each column: \\[ \\begin{aligned} \\text{front heights} &= " + u8ProfStr(prof) + " \\\\ \\text{squares} &= " + prof.join(" + ") + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] The object has " + fmt(tot) + " cubes, but the front view shows only <b>" + fmt(ans) + "</b> squares.",
    { mode: "front-squares", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["A view shows silhouettes, not every cube; hidden cubes do not add squares.", "For each column, compare the back and front numbers and keep the larger one, then add the three results."]);

// 12. 10.4 L2 gen num, CR 3: angles around a point with regular tiles.
E("u8-around-point-num", 8, ["10.4"], 1, "gen", function () {
  var mode = ri(0, 2), n, ang, k, ans, prompt, sol;
  var R = ri(24, 34), rot = ri(0, 50);
  if (mode === 0) {
    n = pick([3, 4, 6]); ang = u8Interior(n); ans = 360 / ang;
    prompt = "Copies of a " + U8_POLY_NAMES[n] + " are placed around a single point, corner to corner, with no gaps. The interior angle of the tile is " + fmt(ang) + " degrees. How many tiles meet at the point?";
    sol = "The angles around a point add to 360 degrees, and each tile adds one interior angle: \\[ \\begin{aligned} \\text{tiles} &= 360° \\div " + fmt(ang) + "° \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So <b>" + fmt(ans) + "</b> tiles meet at the point.";
  } else if (mode === 1) {
    n = pick([3, 4, 6, 8, 12]); ang = u8Interior(n); k = ri(1, Math.floor(359 / ang) - 0);
    if (k * ang >= 360) k = 1;
    ans = 360 - k * ang;
    prompt = "A " + U8_POLY_NAMES[n] + " has interior angle " + fmt(ang) + " degrees. " + fmt(k) + (k === 1 ? " copy is" : " copies are") + " placed around a point, corner to corner. How many degrees of the full 360 degrees around the point are still uncovered?";
    sol = "Find the angle the placed tiles cover, then subtract from a full turn: \\[ \\begin{aligned} \\text{covered} &= " + fmt(k) + " \\times " + fmt(ang) + "° = " + fmt(k * ang) + "° \\\\ \\text{uncovered} &= 360° - " + fmt(k * ang) + "° \\\\ &= " + fmt(ans) + "° \\end{aligned} \\] So <b>" + fmt(ans) + " degrees</b> are still uncovered.";
  } else {
    var pair = pick([["hexagon", 120, "triangle", 60, 1], ["hexagon", 120, "triangle", 60, 2], ["square", 90, "triangle", 60, 2]]);
    var covered = pair[4] * pair[1];
    ans = (360 - covered) / pair[3];
    prompt = "Tiles meet at a point with no gaps. At the point there are " + fmt(pair[4]) + " regular " + pair[0] + "s (interior angle " + fmt(pair[1]) + " degrees) and some equilateral triangles (interior angle 60 degrees). How many triangles meet at the point?";
    sol = "The angles around the point must add to 360 degrees: \\[ \\begin{aligned} \\text{left for triangles} &= 360° - " + fmt(pair[4]) + " \\times " + fmt(pair[1]) + "° = " + fmt(360 - covered) + "° \\\\ \\text{triangles} &= " + fmt(360 - covered) + "° \\div 60° \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So <b>" + fmt(ans) + "</b> triangles meet at the point.";
    n = pair[0] === "hexagon" ? 6 : 4;
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n || 6, rot), "A regular polygon tile");
  var q = numq(prompt, ans, 0, sol, { mode: "around-point-" + mode, n: n, k: k || 0 });
  q.figure = fig;
  return q;
}, ["Angles around a point add to exactly 360 degrees.", "Multiply the interior angle by the number of tiles placed, then compare with 360."]);

// 13. 10.5 L2 gen num, CR 2: the missing angle of an irregular quadrilateral, and tessellating.
E("u8-irregular-angle-num", 8, ["10.5"], 1, "gen", function () {
  for (var att = 0; att < 100; att++) {
    var a = ri(55, 130), b = ri(55, 130), c = ri(55, 130);
    var d = 360 - a - b - c;
    if (d < 40 || d > 160) continue;
    var R = ri(26, 34), rot = ri(0, 40);
    var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, 4, rot), "An irregular quadrilateral tile");
    var q = numq("An irregular quadrilateral tile has three interior angles of " + fmt(a) + " degrees, " + fmt(b) + " degrees and " + fmt(c) + " degrees. The interior angles of any quadrilateral add to 360 degrees. What is the fourth interior angle, in degrees?",
      d, 0,
      "Add the three known angles and subtract from 360: \\[ \\begin{aligned} \\text{known} &= " + fmt(a) + "° + " + fmt(b) + "° + " + fmt(c) + "° = " + fmt(a + b + c) + "° \\\\ \\text{fourth angle} &= 360° - " + fmt(a + b + c) + "° \\\\ &= " + fmt(d) + "° \\end{aligned} \\] So the fourth angle is <b>" + fmt(d) + " degrees</b>. Copies of any quadrilateral tessellate, because all four of its angles can meet at a point and add to exactly 360 degrees.",
      { mode: "irregular-quad", a: a, b: b, c: c });
    q.figure = fig;
    return q;
  }
  var qf = numq("An irregular quadrilateral tile has three interior angles of 80 degrees, 100 degrees and 90 degrees. What is the fourth interior angle, in degrees?",
    90, 0, "The angles add to 360 degrees: \\[ \\begin{aligned} 360° - (80° + 100° + 90°) &= 90° \\end{aligned} \\] So the fourth angle is <b>90 degrees</b>.", { mode: "irregular-quad", a: 80, b: 100, c: 90 });
  qf.figure = u8Svg(120, 120, u8RegPoly(60, 60, 30, 4, 10), "An irregular quadrilateral tile");
  return qf;
}, ["The interior angles of a quadrilateral always add to 360 degrees.", "Add the three given angles first, then subtract from 360."]);

// 14. 10.7 L2 gen MC with figure: which single transformation maps tile 1 to tile 2.
E("u8-tess-transform", 8, ["10.7"], 1, "gen", function () {
  var mode = pick(["translation", "reflection", "rotation"]);
  var s = ri(26, 34), gap = ri(14, 22);
  // Asymmetric tile: a right triangle with a dot near its right-angle corner.
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    if (kind === "mirror") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx + s / 2, cy - s / 2]];
    if (kind === "rot") pts = [[cx + s / 2, cy - s / 2], [cx - s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : (kind === "mirror" ? [cx + s / 2 - 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7]);
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>';
  }
  var kind2 = mode === "translation" ? "base" : (mode === "reflection" ? "mirror" : "rot");
  var body = tile(70, 60, "base") + tile(70 + s + gap + 40, 60, kind2);
  body += u8T(70, 60 - s / 2 - 16, "Tile 1", 12, true) + u8T(70 + s + gap + 40, 60 - s / 2 - 16, "Tile 2", 12, true);
  var W = 70 + s + gap + 40 + 60;
  var fig = u8Svg(W, 120, body, "Two tiles in a tessellation pattern, the second an image of the first");
  var desc = {
    translation: "Tile 2 is tile 1 slid sideways: same size, same way up, and the dot stays by the same corner.",
    reflection: "Tile 2 is tile 1 flipped over: the dot moves to the matching corner on the other side, like a mirror image.",
    rotation: "Tile 2 is tile 1 turned around a point: the dot travels with its corner as the tile spins."
  };
  var names = { translation: "A translation (a slide)", reflection: "A reflection (a flip)", rotation: "A rotation (a turn)" };
  var others = ["translation", "reflection", "rotation"].filter(function (m) { return m !== mode; });
  var q = mcq("The diagram shows two neighbouring tiles in a tessellation. Each tile is a right triangle with a dot near one corner. Which transformation maps Tile 1 onto Tile 2?",
    { t: names[mode], fb: "Correct. " + desc[mode] },
    [
      { t: names[others[0]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: names[others[1]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: "An enlargement (a resize)", fb: "The two tiles are exactly the same size, so no resize is involved." }
    ],
    "Compare the dot and the corners of the two tiles. " + desc[mode] + " So the transformation is <b>" + names[mode].toLowerCase() + "</b>.",
    { mode: "tess-transform-" + mode, s: s, gap: gap });
  q.figure = fig;
  return q;
}, ["Track one marked feature, like the dot, from the first tile to the second.", "A slide keeps the tile the same way up, a flip mirrors it, and a turn spins it."]);

// 15. 10.13 L2 var: which plan creates a tessellation.
E("u8-create-tess-var", 8, ["10.13"], 1, "var", varset([
  function () {
    return mcq("A student creates a tessellation from copies of one square tile. Which plan works, and why?",
      { t: "Slide copies across and down in a grid; the area covered is the number of tiles times the area of one tile.", fb: "Correct. Sliding (translating) squares fills the plane, and sliding keeps each tile's area unchanged." },
      [{ t: "Rotate each copy a little more than the last so the pattern fans out; the area grows larger and larger as the fan spreads wider.", fb: "Fanning the tiles opens wedge gaps between them, so the plane is not covered." }, { t: "Shrink each copy slightly so they fit more easily; the total area covered stays exactly the same as before.", fb: "Shrinking leaves gaps, and changing tile size changes the total area covered." }, { t: "Overlap each copy a little over the last; the overlaps keep the total area the same.", fb: "Overlaps cover some ground twice and are not allowed in a tessellation." }],
      "Squares tessellate by translation on a grid, and transformations do not change a tile's area. So the working plan is to <b>slide copies across and down in a grid; the area covered is the number of tiles times the area of one tile</b>.",
      { mode: "create-square" });
  },
  function () {
    return mcq("A class makes a floor pattern from equilateral triangles and squares together. Which statement about the finished tessellation is true?",
      { t: "At each point the angles add to 360 degrees, and the total area is the sum of the areas of all the tiles.", fb: "Correct. Angle sums of 360 keep the covering gap-free, and combining tiles adds their areas." },
      [{ t: "At each point the angles add to 180 degrees, because the tiles lie flat on the floor of the classroom.", fb: "Around a point on a flat floor the angles add to 360 degrees, not 180." }, { t: "The total area of the whole finished pattern is the area of one triangle times the area of one square.", fb: "Areas of combined tiles add; they are not multiplied together." }, { t: "The pattern works only if every tile in it is rotated by exactly the same angle as all the others.", fb: "Tiles in a mixed tessellation can be turned by different amounts; the angle sum at each point is what matters." }],
      "A tessellation needs angle sums of 360 degrees at every point, and areas add when shapes are combined. So <b>at each point the angles add to 360 degrees, and the total area is the sum of the areas of all the tiles</b>.",
      { mode: "create-mixed" });
  },
  function () {
    return mcq("Which plan creates a tessellation using regular hexagons and equilateral triangles?",
      { t: "Surround each hexagon with triangles in its gaps, repeating the group by sliding it across the floor.", fb: "Correct. Hexagon angles of 120 degrees and triangle angles of 60 degrees combine to 360 at each point, and the group repeats by translation." },
      [{ t: "Place the hexagons in a row and leave the gaps empty so the triangles can be added later into the empty spaces.", fb: "Empty gaps mean the surface is not covered, so it is not yet a tessellation." }, { t: "Use only hexagons, but push each row halfway into the row above so the rows lock together.", fb: "Pushing rows into each other creates overlaps, which a tessellation does not allow." }, { t: "Cut each triangle in half and discard the halves so the pieces left over fit into the gaps.", fb: "Discarding pieces changes the shapes and their areas; a tessellation uses whole tiles that fit as they are." }],
      "The hexagon (120 degrees) and triangle (60 degrees) angles combine to 360 degrees at a point, and the finished group repeats by sliding. So the plan is to <b>surround each hexagon with triangles in its gaps, repeating the group by sliding it across the floor</b>.",
      { mode: "create-hex-tri" });
  },
  function () {
    return mcq("A student tessellates a page with copies of a fish shape made earlier. Every copy is the same size, and neighbouring fish are flipped over so head meets tail. Which description of the tessellation is correct?",
      { t: "It is built with reflections, and its total area is the number of fish times the area of one fish.", fb: "Correct. Flipping is reflection, and reflections preserve area." },
      [{ t: "It is built with enlargements, and its total area is twice the area of one single fish.", fb: "All the copies are the same size, so no enlargement is used, and the total is the count times one area." }, { t: "It is built with rotations only, and reflections would change the area of each fish in the pattern.", fb: "The fish are flipped, which is reflection, and a reflection keeps area the same." }, { t: "It is not a tessellation unless the fish also overlap slightly along their edges.", fb: "A tessellation must have no overlaps; flipped copies that meet edge to edge are enough." }],
      "Flipping a copy over is a reflection, and reflections, like all rigid transformations, preserve area. So the tessellation is <b>built with reflections, and its total area is the number of fish times the area of one fish</b>.",
      { mode: "create-fish" });
  }
]), ["A working plan must cover with no gaps and no overlaps, and areas add across tiles.", "Name the transformation doing the repeating, then check what happens to area."]);

// 16. 10.8 L3 gen MC with figure: a combination of transformations in a tessellation.
E("u8-combo-transform", 8, ["10.8"], 3, "gen", function () {
  var s = ri(26, 34), gap = ri(16, 24), lift = ri(6, 12);
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    else pts = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7];
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>';
  }
  var cx2 = 70 + s + gap + 40;
  var body = tile(70, 66, "base") + tile(cx2, 66 - lift, "flip");
  body += u8T(70, 66 - s / 2 - 16, "Tile 1", 12, true) + u8T(cx2, 66 - lift - s / 2 - 16, "Tile 2", 12, true);
  var fig = u8Svg(cx2 + 60, 132, body, "Two tiles in a pattern where the second is flipped and shifted from the first");
  var q = mcq("The diagram shows two neighbouring tiles in a tessellation. Each tile is a right triangle with a dot near one corner. Tile 2 is flipped over compared with Tile 1, and it also sits higher and further right. Which description best fits the transformation from Tile 1 to Tile 2?",
    { t: "A reflection combined with a translation (a glide reflection).", fb: "Correct. The tile is mirrored and also shifted, so two transformations act together." },
    [
      { t: "A reflection on its own, with no shift along the pattern.", fb: "A reflection alone would put the tile directly across a mirror line, with no extra shift along the pattern." },
      { t: "A translation on its own, sliding the tile without flipping it over.", fb: "A translation keeps the tile the same way up; this tile is flipped, so a slide alone cannot do it." },
      { t: "A rotation on its own, turning the tile about a point.", fb: "A single turn would keep the tile's handedness; the dot shows the tile has been mirrored as well as moved." }
    ],
    "The dot shows the tile has been mirrored, and its position shows it has also been shifted sideways and up. Two transformations act together: <b>a reflection combined with a translation (a glide reflection)</b>.",
    { mode: "combo-glide", s: s, gap: gap, lift: lift });
  q.figure = fig;
  return q;
}, ["Check two things separately: has the tile been flipped, and has it been shifted?", "When a tile is both mirrored and moved along, the transformation is a combination."]);

// 17. 10.14 L3 var: creating a new tessellating shape from a tessellating polygon.
E("u8-new-shape-var", 8, ["10.14"], 3, "var", varset([
  function () {
    var q=mcq("A square tessellates. A student cuts a small triangle from the middle of the square's left side and tapes the same triangle onto the middle of the right side. What is true of the new shape?",
      { t: "It still tessellates by sliding, and its area is the same as the square's.", fb: "Correct. The bump on one side fits the notch on the opposite side, and moving a piece keeps the total area unchanged." },
      [{ t: "It still tessellates, but its area is larger than the square's.", fb: "The triangle was moved, not added; no new material was created, so the area is unchanged." }, { t: "It no longer tessellates, because only the original square can tile the plane.", fb: "Shapes made this way do tessellate; the matching bump and notch are exactly what makes copies fit." }, { t: "It tessellates only if the cut triangle is thrown away.", fb: "Throwing the piece away leaves a notch with nothing to fill it and reduces the area." }],
      "The piece cut from one side is added to the opposite side, so copies fit bump into notch under a slide, and the area is conserved. So <b>it still tessellates by sliding, and its area is the same as the square's</b>.",
      { mode: "new-square-slide" }); q.figure=m8NotchSquareSVG(); return q;
  },
  function () {
    return mcq("An equilateral triangle tessellates. A student cuts a small piece from one side and tapes it onto the next side of the same triangle, turning the piece as she moves it. Copies of the new shape are fitted together by turning each copy one third of a full turn about a corner. Which statement describes the result?",
      { t: "The new shape tessellates using rotations, and its area equals the triangle's area.", fb: "Correct. The moved piece matches the cut on the neighbouring copy under a 120 degree turn, and the area is conserved." },
      [{ t: "The new shape tessellates using translations only, and its area is smaller.", fb: "Moving a piece to an adjacent side pairs copies under rotation, not a plain slide, and no area is lost." }, { t: "The new shape cannot tessellate, because it is no longer a polygon with straight sides only left.", fb: "Non-polygon shapes can tessellate; the cut and added piece match between neighbouring copies." }, { t: "The new shape tessellates, but only after each copy is enlarged to twice its size.", fb: "All copies stay the same size; enlarging is not part of the method." }],
      "Cutting a piece from one side and adding it to the adjacent side pairs copies under a turn of 120 degrees, and moving a piece conserves area. So <b>the new shape tessellates using rotations, and its area equals the triangle's area</b>.",
      { mode: "new-triangle-rotate" });
  },
  function () {
    return mcq("A student wants to turn a tessellating parallelogram into a new tessellating shape. Which method works?",
      { t: "Cut a curve from the top side and tape the same curve onto the bottom side, then repeat copies by sliding.", fb: "Correct. Opposite sides of a parallelogram pair up under a slide, so the curve and its copy fit together and area is conserved." },
      [{ t: "Cut a curve from the top side and discard it, then repeat copies by sliding them across the whole page in rows.", fb: "Discarding the piece leaves a gap no copy can fill, and the area changes." }, { t: "Cut a curve from the top side and tape it onto the top side as well, right above where it was cut from.", fb: "Adding to the same side leaves the bottom side straight, so bumps meet bumps and the copies cannot fit." }, { t: "Stretch the parallelogram out to twice its width and cut a small piece from one of its corners.", fb: "Stretching changes the shape's angles, so the copies no longer meet cleanly around each point." }],
      "Pieces moved between opposite sides of a tessellating shape keep the fit under a slide and conserve area. So the working method is to <b>cut a curve from the top side and tape the same curve onto the bottom side, then repeat copies by sliding</b>.",
      { mode: "new-parallelogram" });
  },
  function () {
    return mcq("After modifying a hexagon that tessellates, a student checks her new shape and finds its area is greater than the hexagon's area. What must have happened in her modification?",
      { t: "She added a piece without cutting the same piece away somewhere else.", fb: "Correct. Area grows only when material is added without an equal piece being removed." },
      [{ t: "She moved a piece from one side of the shape to the opposite side.", fb: "Moving a piece keeps the total amount of material, and so the area, the same." }, { t: "She flipped the shape over before copying it for the pattern she made.", fb: "Flipping is a reflection; it does not change area." }, { t: "She rotated each copy by 60 degrees as she placed it in the pattern.", fb: "Rotating copies does not change the area of the shape itself." }],
      "Transformations and moving pieces conserve area; area can grow only when extra material is added. So <b>she added a piece without cutting the same piece away somewhere else</b>.",
      { mode: "new-area-check" });
  }
]), ["The reliable method moves a piece from one side to the side it pairs with, so copies still fit.", "Moving a piece never changes total area; adding or discarding a piece does."]);

// 18. 10.17 L3 gen num, CR 3: greatest number of cubes that could match given views.
E("u8-build-max-num", 8, ["10.17"], 3, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var front = u8FrontProf(hm), side = u8SideProf(hm); // side listed front row to back row
    var occ = u8OccOf(hm);
    var used = occ[0].concat(occ[1]).filter(function (v) { return v; }).length;
    if (used < 5) continue;
    // tallest possible stack on a used square: limited by both its column and row maxima.
    var rowsFB = [hm[1], hm[0]]; // front row first, matching side order
    var tot = 0, rF, c;
    for (rF = 0; rF < 2; rF++) for (c = 0; c < 3; c++) {
      if (rowsFB[rF][c] > 0 || occ[rF === 0 ? 1 : 0][c]) { /* occupancy check below */ }
    }
    tot = 0;
    var occFB = [occ[1], occ[0]];
    for (rF = 0; rF < 2; rF++) for (c = 0; c < 3; c++) if (occFB[rF][c]) tot += Math.min(front[c], side[rF]);
    if (tot <= u8Sum(hm)) continue;
    var cell = 15;
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT: " + u8ProfStr(front), 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "SIDE: " + u8ProfStr(side), 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 104, "Side view columns run front to back", 10, false);
    var fig = u8Svg(320, 114, body, "Top, front and side views of a block object");
    var q = numq("The diagram shows the top, front and right side views of a block object. The front view column heights are " + u8ProfStr(front) + ", and the side view column heights, read from the front of the object to the back, are " + u8ProfStr(side) + ". What is the greatest possible number of cubes in an object with exactly these views?",
      tot, 0,
      "A stack on a given square can be no taller than its front column height and no taller than its side column height, so its greatest height is the smaller of the two. Adding those greatest heights over every filled square of the top view gives \\[ \\begin{aligned} \\text{greatest total} &= " + fmt(tot) + " \\end{aligned} \\] So the greatest possible number of cubes is <b>" + fmt(tot) + "</b>.",
      { mode: "build-max", hm: u8Key(hm), tot: tot });
    q.figure = fig;
    return q;
  }
  return numq("What is the greatest possible number of cubes in an object whose front view heights are 2, 2 and whose top view is a single row of 2 squares, with side view height 2?",
    4, 0, "Each stack can be as tall as the smaller of its column and row limits, 2, and there are 2 squares: \\[ \\begin{aligned} 2 \\times 2 &= 4 \\end{aligned} \\] So the greatest total is <b>4</b>.", { mode: "build-max", hm: "fb", tot: 4 });
}, ["Each stack is limited by two views at once: its front column and its side column.", "For every filled square in the top view, take the smaller of the two limiting heights, then add."]);

// 19. 10.13 L3 gen num, CR 2: mixed regular shapes around a point in a created tessellation.
E("u8-mixed-point-num", 8, ["10.13"], 3, "gen", function () {
  var mode = ri(0, 2), ans, prompt, sol, n;
  var R = ri(24, 33), rot = ri(0, 50);
  if (mode === 0) {
    ans = 360 - 135 - 90;
    n = 8;
    prompt = "A student creates a tessellation with regular octagons (interior angle 135 degrees) and squares (interior angle 90 degrees). At one point in the pattern, an octagon and a square already meet. A second octagon is placed in the remaining space. What is the interior angle, in degrees, of that remaining space before the second octagon is placed? In other words, how many degrees around the point are left after the first octagon and the square?";
    sol = "Angles around a point add to 360 degrees: \\[ \\begin{aligned} \\text{remaining} &= 360° - 135° - 90° \\\\ &= " + fmt(ans) + "° \\end{aligned} \\] The remaining <b>" + fmt(ans) + " degrees</b> exactly match the 135 degree interior angle of the second octagon, which is why octagons and squares tessellate together.";
  } else if (mode === 1) {
    ans = 4;
    n = 6;
    prompt = "A student creates a tessellation using regular hexagons (interior angle 120 degrees) and equilateral triangles (interior angle 60 degrees). At each point, one hexagon meets the point, and the rest of the point is filled by triangles. How many triangles meet at each point?";
    sol = "Subtract the hexagon angle from a full turn, then share the rest among 60 degree triangle angles: \\[ \\begin{aligned} \\text{remaining} &= 360° - 120° = 240° \\\\ \\text{triangles} &= 240° \\div 60° \\\\ &= 4 \\end{aligned} \\] So <b>4</b> triangles meet at each point.";
  } else {
    ans = 120;
    n = 12;
    prompt = "A student creates a tessellation using three shapes at each point: a regular dodecagon (interior angle 150 degrees), a square (interior angle 90 degrees) and one regular hexagon. What is the interior angle, in degrees, that the hexagon must contribute at the point for the three shapes to fill it exactly?";
    sol = "The three angles must add to a full turn: \\[ \\begin{aligned} \\text{hexagon angle} &= 360° - 150° - 90° \\\\ &= 120° \\end{aligned} \\] So the third shape must contribute <b>120 degrees</b>, which is exactly the interior angle of a regular hexagon, so the combination fills the point with no gap.";
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n, rot), "A regular polygon tile used in the pattern");
  var q = numq(prompt, ans, 0, sol, { mode: "mixed-point-" + mode, n: n });
  q.figure = fig;
  return q;
}, ["Angles around a point in a tessellation add to exactly 360 degrees.", "Add the angles already at the point and subtract from 360."]);
