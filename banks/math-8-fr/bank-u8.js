// Math 8 (French) Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 3775 to 4488).
// CRMARKS: u8-around-point-num=3
// CRMARKS: u8-build-max-num=3
// CRMARKS: u8-cubes-total-num=3
// CRMARKS: u8-front-squares-num=3
// CRMARKS: u8-irregular-angle-num=2
// CRMARKS: u8-mixed-point-num=2
// CRMARKS: u8-rotate-front-num=2
/*
 * TRANSLATOR NOTES
 * Chunk: Unit 8 (Geometry), Math 8 FR. Entries translated: 19 (all stems,
 * options, per-answer feedback, worked solutions, hint1 and hint2).
 * Term choices: tessellation = dallage; views = vue de dessus, vue de
 * face, vue de côté (figure labels DESSUS, FACE, CÔTÉ DROIT); height map
 * = carte des hauteurs (glossary silent, working choice); grid cell =
 * case, to keep it distinct from carré (the shape); stack = pile; glide
 * reflection = réflexion glissée. "symétrie axiale" is the grade 8
 * working choice per the glossary (no symmetry entries occur here).
 * Height-map side labels: BACK = ARRIÈRE, FRONT = AVANT, L = G (gauche),
 * R = D (droite); display labels only, no logic uses them. Row names in
 * u8HMStr: rangée arrière, rangée du milieu, rangée avant. In
 * u8-around-point-num the pair names became French (hexagone, carré) and
 * the check pair[0] === "hexagone" was updated to match; the mathematics
 * is unchanged. One plural-agreement ternary was added in mode 2 of the
 * same entry, where the English simply appended "s".
 * FMT-GEOM lines left as fmt( (each carries the marker): u8T x/y
 * attributes; u8Rect x/y/width/height; u8Sil baseline line; u8RegPoly
 * polygon points; the tile polygon/circle return lines in
 * u8-tess-transform and u8-combo-transform. Every other fmt( became
 * fmtD(, including u8ProfStr and the height numbers drawn by u8HM
 * (visible labels). No fmtF( and no .toFixed in this chunk, so no
 * fmtDF( conversions.
 * Literal numbers in static prose: degree values keep the source form
 * (120° in labels, degrés in prose, following the Math 9 FR pattern);
 * no decimal commas, thousands groupings, percents or dollars occur in
 * static prose. All generated numbers route through fmtD(.
 * Unsure: carte des hauteurs for height map has no guide evidence yet;
 * flagged for the reconciliation pass.
 */
/* Unit 8: Geometry */
// Unit 8: Geometry (Math 8, NL). Entries only; helpers prefixed u8.
// Block objects are shown as height maps: a labelled grid where each number
// tells how many cubes are stacked on that square. Back row is at the top of
// the grid, front row at the bottom, matching looking down at the object.
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>'; /* FMT-GEOM */
}
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u8Rect(x, y, w, h, fill) {
  return '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + fmt(w, 1) + '" height="' + fmt(h, 1) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; /* FMT-GEOM */
}
// Height-map grid drawn with its top-left corner at (x0, y0). hm rows run back to front.
function u8HM(hm, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < hm.length; r++) for (c = 0; c < hm[r].length; c++) {
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, hm[r][c] > 0 ? FIG_SHADE : "#ffffff");
    s += u8T(x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 1, fmtD(hm[r][c]), 13, true);
  }
  var w = hm[0].length * cell, h = hm.length * cell;
  s += u8T(x0 + w / 2, y0 - 11, "ARRIÈRE", 10, true);
  s += u8T(x0 + w / 2, y0 + h + 12, "AVANT", 10, true);
  s += u8T(x0 - 13, y0 + h / 2, "G", 10, true);
  s += u8T(x0 + w + 13, y0 + h / 2, "D", 10, true);
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
  s += '<line x1="' + fmt(x0 - 3, 1) + '" y1="' + fmt(yBase, 1) + '" x2="' + fmt(x0 + prof.length * cell + 3, 1) + '" y2="' + fmt(yBase, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>'; /* FMT-GEOM */
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
function u8ProfStr(p) { return p.map(function (v) { return fmtD(v); }).join(", "); }
function u8HMStr(hm) {
  var names = hm.length === 2 ? ["Rangée arrière", "Rangée avant"] : ["Rangée arrière", "Rangée du milieu", "Rangée avant"];
  return hm.map(function (row, i) { return names[i] + " (de gauche à droite) : " + u8ProfStr(row); }).join(". ") + ".";
}
function u8RegPoly(cx, cy, R, n, rotDeg) {
  var pts = [], i, a;
  for (i = 0; i < n; i++) { a = (rotDeg + i * 360 / n - 90) * Math.PI / 180; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>'; /* FMT-GEOM */
}
function u8Interior(n) { return (n - 2) * 180 / n; }
var U8_POLY_NAMES = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 10: "décagone régulier", 12: "dodécagone régulier" };

// 1. 10.15 L1 gen MC with figure: pick the top view from four drawn candidates.
E("u8-top-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var occ = u8OccOf(hm);
    var trans = [[occ[0][0], occ[1][0]], [occ[0][1], occ[1][1]], [occ[0][2], occ[1][2]]];
    var mirror = occ.map(function (row) { return row.slice().reverse(); });
    var full = occ.map(function (row) { return row.map(function () { return 1; }); });
    var cands = [
      { g: occ, lab: "la vue de dessus", good: true },
      { g: trans, lab: "la vue de dessus tournée de côté", good: false, why: "Ce candidat tourne le plan de côté; il échange les sens arrière-avant et gauche-droite." },
      { g: mirror, lab: "la vue de dessus en miroir", good: false, why: "Ce candidat est l'image miroir; les côtés gauche et droit sont échangés." },
      { g: full, lab: "la vue de dessus entièrement remplie", good: false, why: "Ce candidat remplit chaque case, mais certaines cases de l'objet ne contiennent aucun cube." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.g); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 26, hmW = 3 * cell, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
    body += u8HM(hm, 160 - hmW / 2, 30, cell);
    var cc = 13, pos = [[52, 128], [196, 128], [52, 196], [196, 196]];
    cands.forEach(function (cd, i) {
      var w = cd.g[0].length * cc, h = cd.g.length * cc;
      body += u8Occ(cd.g, pos[i][0], pos[i][1], cc);
      body += u8T(pos[i][0] + w / 2, pos[i][1] + h + 12, "Vue " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 252, body, "Carte des hauteurs d'un objet en cubes et quatre vues de dessus candidates étiquetées A à D");
    var opts = cands.map(function (cd, i) {
      return { t: "Vue " + "ABCD"[i], fb: cd.good ? "Exact. Chaque case remplie correspond à une case qui contient au moins un cube, et la rangée arrière reste à l'arrière." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("Le haut du diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Lequel des candidats ci-dessous est la vue de dessus de l'objet ? La vue de dessus montre une case remplie pour chaque pile.",
      corr, rest,
      "En regardant directement vers le bas, la hauteur ne compte pas : une case est remplie exactement quand sa pile contient au moins un cube. En comparant les cases remplies, rangée arrière contre rangée arrière et de gauche à droite, on obtient <b>Vue " + "ABCD"[gi] + "</b>.",
      { mode: "top-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Quel candidat est la vue de dessus de l'objet ?",
    { t: "Vue A", fb: "Exact." },
    [{ t: "Vue B", fb: "Cela échange la gauche et la droite." }, { t: "Vue C", fb: "Cela remplit des cases qui ne contiennent aucun cube." }, { t: "Vue D", fb: "Cela tourne le plan de côté." }],
    "Une case est remplie exactement quand sa pile contient au moins un cube, donc la vue de dessus est <b>Vue A</b>.", { mode: "top-choice", hm: "fb", good: 0 });
}, ["La vue de dessus tient compte seulement des cases qui contiennent des cubes, pas de la hauteur de chaque pile.", "Commence par la rangée arrière et marque chaque case comme remplie ou vide."]);

// 2. 10.18 L1 var: views of objects in the environment.
E("u8-env-views-var", 8, ["10.18"], 1, "var", varset([
  function () {
    var q=mcq("Sofia dessine une boîte de céréales posée sur une table de cuisine. Directement du dessus, quelle forme dessine-t-elle pour la vue de dessus ?",
      { t: "Un rectangle, de la taille de la face supérieure de la boîte.", fb: "Exact. En regardant directement vers le bas, on voit la face supérieure dans sa vraie forme." },
      [{ t: "Un grand rectangle qui montre le devant de la boîte au complet.", fb: "C'est la vue de face; la vue de dessus montre seulement la face supérieure." }, { t: "Un carré de la taille du bout étroit de la boîte de céréales.", fb: "Cela ressemble à une vue de côté; la face supérieure est le long rectangle du dessus." }, { t: "Un cercle qui montre toute la boîte à la fois sur la table.", fb: "Une vue montre une seule direction; du dessus, on voit la face supérieure." }],
      "Une vue montre la face que tu regardes directement. Du dessus, c'est la face supérieure, donc la vue de dessus est <b>un rectangle, de la taille de la face supérieure de la boîte</b>.",
      { mode: "env-cereal" }); q.figure=m8BoxLabSVG("","","",false); return q;
  },
  function () {
    var q=mcq("Un phare est à peu près un grand cylindre qui devient un peu plus étroit vers le haut. Quelle description convient à sa vue de dessus ?",
      { t: "Un cercle.", fb: "Exact. En regardant directement vers le bas d'un cylindre, on voit un cercle." },
      [{ t: "Un rectangle.", fb: "Cela convient à la vue de face ou de côté de la tour, pas à la vue du dessus." }, { t: "Un triangle.", fb: "Un triangle conviendrait à un cône ou à une pyramide vu de côté, pas à cette tour vue du dessus." }, { t: "Un long ovale.", fb: "Une vue de l'objet montre l'objet seulement; du dessus, la tour est un cercle." }],
      "Directement du dessus, un cylindre montre sa face supérieure ronde. Donc la vue de dessus est <b>un cercle</b>.",
      { mode: "env-lighthouse" }); q.figure=m8CylLabSVG("","",false,false); return q;
  },
  function () {
    return mcq("Marcus dessine la vue de face d'un autobus scolaire stationné face à lui. Que doit montrer sa vue de face ?",
      { t: "Un large rectangle avec le pare-brise, les phares et les roues avant.", fb: "Exact. La vue de face montre la face de l'autobus qui pointe vers lui." },
      [{ t: "Un long rectangle avec une rangée de fenêtres latérales et deux roues.", fb: "C'est la vue de côté; la vue de face est le bout court de l'autobus." }, { t: "Un rectangle plat de la taille du toit de l'autobus au complet.", fb: "C'est la vue de dessus; la vue de face est debout." }, { t: "L'autobus coupé en deux pour montrer les sièges à l'intérieur.", fb: "Un dessin de vue montre la face extérieure, pas une coupe de l'objet." }],
      "La vue de face montre la face qui pointe vers l'observateur, donc elle montre <b>un large rectangle avec le pare-brise, les phares et les roues avant</b>.",
      { mode: "env-bus" });
  },
  function () {
    return mcq("Une tasse est sur une table, son anse pointant vers la droite. Quelle description convient à la vue du côté droit de la tasse ?",
      { t: "Le corps de la tasse avec l'anse qui dépasse de l'autre côté du dessin.", fb: "Exact. De la droite, tu regardes dans le sens de l'anse et tu vois le profil de l'anse." },
      [{ t: "Un cercle pour le dessus de la tasse, vu directement du haut de la table.", fb: "C'est la vue de dessus; une vue de côté est debout." }, { t: "Le corps de la tasse sans aucune anse visible d'aucun côté du dessin.", fb: "Cela convient à la vue du côté gauche; de la droite, l'anse est alignée avec ton regard et elle paraît." }, { t: "Une ligne plate de la largeur de la tasse, sans aucune hauteur visible.", fb: "Ce serait un bord seulement; la vue de côté montre toute la hauteur de la tasse." }],
      "Chaque vue montre l'objet d'une seule direction. Du côté droit, l'anse pointe vers toi, donc la vue est <b>le corps de la tasse avec l'anse qui dépasse de l'autre côté du dessin</b>.",
      { mode: "env-mug" });
  },
  function () {
    return mcq("Priya photographie un traversier directement de face, pendant qu'il arrive au quai. Dans sa photo, qu'arrive-t-il au long côté du traversier ?",
      { t: "Il pointe loin d'elle, donc la photo montre surtout le bout étroit de la proue.", fb: "Exact. Dans une vue de face, la longueur s'éloigne de l'observateur et ne s'étale pas dans l'image." },
      [{ t: "Il s'étale sur toute la photo et montre chaque fenêtre le long du côté.", fb: "Cela décrit une vue de côté du traversier, pas la vue de face." }, { t: "Il paraît comme un rectangle plat sur le dessus du traversier, d'un bout à l'autre du pont.", fb: "Cela décrit la vue de dessus; la photo est prise de face." }, { t: "Il double de longueur parce que le traversier bouge sur l'eau en arrivant au quai.", fb: "Une vue dépend de la direction, pas de la vitesse du traversier." }],
      "Dans une vue de face, le sens long de l'objet pointe loin de l'observateur. Donc la photo montre <b>surtout le bout étroit de la proue</b>.",
      { mode: "env-ferry" });
  }
]), ["Demande-toi quelle face de l'objet pointe directement vers l'observateur.", "Les vues de dessus sont à plat, les vues de face et de côté sont debout, et chaque vue montre une seule direction."]);

// 3. 10.4 L1 var: which regular polygon tessellates on its own.
E("u8-regular-tessellates-var", 8, ["10.4"], 1, "var", varset([
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Hexagone régulier, angle intérieur 120°.", fb: "Exact. 360 divisé par 120 donne 3, donc trois hexagones se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Octogone régulier, angle intérieur 135°.", fb: "360 divisé par 135 ne donne pas un nombre entier, donc les octogones seuls laissent des espaces." }, { t: "Dodécagone régulier, angle intérieur 150°.", fb: "360 divisé par 150 ne donne pas un nombre entier, donc les dodécagones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 120° &= 3 \\end{aligned} \\] Donc <b>l'hexagone régulier, angle intérieur 120°</b>, forme un dallage à lui seul.",
      { mode: "reg-hex" }); q.figure=m8PolyRowSVG([[6,"120\u00B0"],[5,"108\u00B0"],[8,"135\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Carré, angle intérieur 90°.", fb: "Exact. 360 divisé par 90 donne 4, donc quatre carrés se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Heptagone régulier, angle intérieur d'environ 129°.", fb: "360 divisé par environ 129 ne donne pas un nombre entier, donc les heptagones laissent des espaces." }, { t: "Octogone régulier, angle intérieur 135°.", fb: "360 divisé par 135 ne donne pas un nombre entier, donc les octogones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 90° &= 4 \\end{aligned} \\] Donc le <b>carré, angle intérieur 90°</b>, forme un dallage à lui seul.",
      { mode: "reg-square" }); q.figure=m8PolyRowSVG([[4,"90\u00B0"],[5,"108\u00B0"],[7,"\u2248129\u00B0"],[8,"135\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Triangle équilatéral, angle intérieur 60°.", fb: "Exact. 360 divisé par 60 donne 6, donc six triangles se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Décagone régulier, angle intérieur 144°.", fb: "360 divisé par 144 ne donne pas un nombre entier, donc les décagones laissent des espaces." }, { t: "Dodécagone régulier, angle intérieur 150°.", fb: "360 divisé par 150 ne donne pas un nombre entier, donc les dodécagones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 60° &= 6 \\end{aligned} \\] Donc le <b>triangle équilatéral, angle intérieur 60°</b>, forme un dallage à lui seul.",
      { mode: "reg-tri" }); q.figure=m8PolyRowSVG([[3,"60\u00B0"],[5,"108\u00B0"],[10,"144\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("On essaie trois polygones réguliers comme tuiles de patio : un pentagone régulier (108°), un hexagone régulier (120°) et un octogone régulier (135°). Lequel couvre le patio sans espaces ?",
      { t: "L'hexagone régulier seulement.", fb: "Exact. Seul 120 divise 360 exactement, ce qui donne 3 tuiles à chaque point." },
      [{ t: "Le pentagone régulier seulement.", fb: "108 ne divise pas 360, donc les pentagones ne peuvent pas se rencontrer exactement autour d'un point." }, { t: "L'octogone régulier seulement.", fb: "135 ne divise pas 360, donc les octogones seuls laissent des espaces en forme de carrés." }, { t: "Les trois couvrent le patio à eux seuls.", fb: "Un seul angle intérieur ici divise 360 exactement; vérifie chacun." }],
      "Teste chaque angle contre 360 : \\[ \\begin{aligned} 360° \\div 120° &= 3 \\\\ 360° \\div 108° &\\text{ n'est pas entier} \\\\ 360° \\div 135° &\\text{ n'est pas entier} \\end{aligned} \\] Donc <b>l'hexagone régulier seulement</b> couvre le patio.",
      { mode: "reg-patio" }); q.figure=m8PolyRowSVG([[5,"108\u00B0"],[6,"120\u00B0"],[8,"135\u00B0"]]); return q;
  }
]), ["À chaque point de rencontre, les angles doivent totaliser exactement 360 degrés.", "Divise 360 par l'angle intérieur; la forme forme un dallage à elle seule seulement quand la réponse est un nombre entier."]);

// 4. 10.6 L1 var: tessellations in the environment.
E("u8-env-tess-var", 8, ["10.6"], 1, "var", varset([
  function () {
    return mcq("Quelle description est un dallage que tu peux voir dans l'environnement ? Un dallage couvre une surface sans espaces et sans chevauchements.",
      { t: "Des cellules hexagonales dans un nid d'abeilles, ajustées bord à bord.", fb: "Exact. Les hexagones couvrent la surface complètement, sans espaces." },
      [{ t: "Des pierres rondes dispersées sur une plage, avec du sable visible entre elles.", fb: "Des espaces de sable paraissent entre les pierres, donc la surface n'est pas couverte complètement." }, { t: "Des bardeaux qui se chevauchent, cloués en rangées sur un toit.", fb: "Les bardeaux se chevauchent, et un dallage n'a aucun chevauchement." }, { t: "Un seul grand tableau accroché au mur d'une salle de classe de l'école.", fb: "Une seule image ne se répète pas pour couvrir une surface avec un motif de formes." }],
      "Un dallage répète des formes pour couvrir une surface complètement, sans espaces et sans chevauchements. Cela correspond à <b>des cellules hexagonales dans un nid d'abeilles, ajustées bord à bord</b>.",
      { mode: "env-honeycomb" });
  },
  function () {
    return mcq("Un plancher de corridor est couvert de tuiles carrées posées en rangées et en colonnes droites, et les lignes de coulis forment une grille. Comment décrirais-tu ce plancher ?",
      { t: "Un dallage de carrés fait en glissant la tuile de côté et vers le bas.", fb: "Exact. Les carrés couvrent le plancher complètement et se répètent par translation." },
      [{ t: "Un dallage de cercles fait en tournant une tuile ronde.", fb: "Les tuiles sont des carrés, et des cercles laisseraient des espaces entre eux." }, { t: "Pas un dallage, parce que les lignes de coulis du plancher brisent le motif.", fb: "Les lignes de coulis sont simplement les bords des tuiles; les carrés couvrent quand même le plancher sans espaces." }, { t: "Pas un dallage, parce que toutes les tuiles du plancher ont la même forme.", fb: "Un dallage peut utiliser une seule forme; utiliser une seule forme est le genre le plus simple." }],
      "Les carrés couvrent le plancher sans espaces ni chevauchements et se répètent par glissement, donc le plancher est <b>un dallage de carrés fait en glissant la tuile de côté et vers le bas</b>.",
      { mode: "env-floor" });
  },
  function () {
    return mcq("Les briques d'un mur sont posées en rangées, et chaque rangée est décalée d'une demi-brique. Pourquoi le motif de briques compte-t-il comme un dallage ?",
      { t: "Les rectangles couvrent le mur sans espaces et sans chevauchements, et le motif se répète.", fb: "Exact. Décaler une rangée donne quand même un recouvrement qui se répète, sans espaces." },
      [{ t: "Parce que les briques sont des matériaux de construction lourds et solides utilisés pour le mur.", fb: "Le poids des pièces n'a rien à voir avec le fait qu'un motif forme un dallage." }, { t: "Parce que chaque brique a une taille différente de ses voisines dans le mur de l'école.", fb: "Les briques ont la même taille; le motif fonctionne parce qu'elles s'ajustent sans espaces." }, { t: "Parce que le mur est à l'extérieur, du côté de la cour de l'école élémentaire.", fb: "Être à l'extérieur ne décide rien; c'est le recouvrement sans espaces ni chevauchements qui décide." }],
      "Un dallage exige un recouvrement qui se répète, sans espaces ni chevauchements. C'est pourquoi <b>les rectangles qui couvrent le mur sans espaces et sans chevauchements, dans un motif qui se répète</b>, comptent.",
      { mode: "env-brick" });
  },
  function () {
    return mcq("Quel motif trouvé autour d'une école est un dallage ?",
      { t: "Une mosaïque de petites tuiles carrées et triangulaires qui couvre complètement le dessus d'un banc.", fb: "Exact. Les tuiles s'ajustent bord à bord et couvrent tout le dessus du banc." },
      [{ t: "Des cailloux collés au hasard sur une planche de bois, avec la planche visible entre eux.", fb: "La planche visible entre les cailloux signifie des espaces, donc ce n'est pas un recouvrement complet." }, { t: "Des autocollants placés sur un casier de façon que certains couvrent des parties d'autres autocollants.", fb: "Des autocollants qui se couvrent sont des chevauchements, ce qu'un dallage n'a pas." }, { t: "Un tapis en damier dont plusieurs carrés ont été découpés un peu partout dans le motif du tapis.", fb: "Les carrés découpés sont des espaces dans le recouvrement, donc le tapis ne forme plus un dallage à cet endroit." }],
      "Cherche un recouvrement complet, sans espaces ni chevauchements : <b>une mosaïque de petites tuiles carrées et triangulaires qui couvre complètement le dessus d'un banc</b>.",
      { mode: "env-mosaic" });
  }
]), ["Vérifie les deux conditions : aucun espace, et aucun chevauchement.", "Nomme la forme qui fait le recouvrement et la façon dont elle se répète."]);

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
      { p: side, good: false, why: "Ce candidat est la vue du côté droit; ses colonnes vont de l'avant à l'arrière, pas de gauche à droite." },
      { p: backV, good: false, why: "Ce candidat inverse la gauche et la droite; c'est ce que tu verrais de l'arrière." },
      { p: tall, good: false, why: "Ce candidat change la hauteur d'une colonne; chaque colonne de la vue de face doit correspondre à la pile la plus haute de cette colonne." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.p); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 24, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
    body += u8HM(hm, 160 - 36, 30, cell);
    var cc = 11, pos = [[40, 148], [185, 148], [40, 218], [185, 218]];
    cands.forEach(function (cd, i) {
      body += u8Sil(cd.p, pos[i][0], pos[i][1] + 30, cc);
      body += u8T(pos[i][0] + 16, pos[i][1] + 44, "Vue " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 268, body, "Carte des hauteurs d'un objet en cubes et quatre vues de face candidates étiquetées A à D");
    var opts = cands.map(function (cd, i) {
      return { t: "Vue " + "ABCD"[i], fb: cd.good ? "Exact. Chaque colonne correspond à la pile la plus haute de cette colonne de l'objet, lue de gauche à droite." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("Le haut du diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Lequel des candidats ci-dessous est la vue de face de l'objet ? Dans une vue de face, chaque colonne est aussi haute que la pile la plus haute de cette colonne.",
      corr, rest,
      "Lis l'objet colonne par colonne et prends le plus grand des nombres arrière et avant : les hauteurs des colonnes de face sont \\( " + u8ProfStr(front) + " \\). La silhouette correspondante est <b>Vue " + "ABCD"[gi] + "</b>.",
      { mode: "front-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Quel candidat est la vue de face de l'objet ?",
    { t: "Vue A", fb: "Exact." },
    [{ t: "Vue B", fb: "C'est une vue de côté." }, { t: "Vue C", fb: "Cela inverse la gauche et la droite." }, { t: "Vue D", fb: "Cela change la hauteur d'une colonne." }],
    "Chaque colonne de face correspond à la pile la plus haute de cette colonne, donc la vue de face est <b>Vue A</b>.", { mode: "front-choice", hm: "fb", good: 0 });
}, ["Pour chaque colonne, de gauche à droite, la hauteur dans la vue de face est la pile la plus haute de cette colonne.", "Écris d'abord les hauteurs des colonnes à partir de la carte des hauteurs, puis compare les silhouettes."]);

// 6. 10.9 L2 gen MC with figure: three views shown, pick the matching object description.
E("u8-match-object", 8, ["10.9"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm), tot = u8Sum(hm);
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    var spots = (hm[0].concat(hm[1]).filter(function (v) { return v === tv; }).length);
    if (spots !== 1) continue;
    var rowName = ti === 0 ? "rangée arrière" : "rangée avant";
    var colName = tj === 0 ? "à l'extrémité gauche" : (tj === 1 ? "au milieu" : "à l'extrémité droite");
    var altRow = ti === 0 ? "rangée avant" : "rangée arrière";
    var altCol = tj === 0 ? "à droite" : "à gauche";
    var cell = 15;
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ DROIT", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Vues d'un objet en cubes", 11, true);
    var fig = u8Svg(320, 112, body, "Vues de dessus, de face et du côté droit d'un objet en cubes");
    var corrT = "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout.";
    var q = mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle description correspond à l'objet d'où viennent les vues ?",
      { t: corrT, fb: "Exact. La colonne la plus haute des vues de face et de côté situe la pile la plus haute, et les vues ensemble fixent le total." },
      [
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + altRow + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout.", fb: "Cela place la pile la plus haute dans la mauvaise rangée; compare sa position dans la vue de côté, où les colonnes vont de l'avant à l'arrière." },
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + altCol + ", et l'objet compte " + fmtD(tot) + " cubes en tout.", fb: "Cela reflète l'objet de gauche à droite; compare sa position dans la vue de face." },
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot + tv) + " cubes en tout.", fb: "La position est bonne, mais le total compte la pile la plus haute deux fois; additionne chaque pile une seule fois." }
      ],
      "La vue de face place la pile la plus haute " + colName + ", la vue de côté la place dans la " + rowName + ", et en combinant les vues on obtient " + fmtD(tot) + " cubes en tout. Donc la description correspondante est : <b>la pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout</b>.",
      { mode: "match-object", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle description correspond à l'objet d'où viennent les vues ?",
    { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité gauche, et l'objet compte 8 cubes en tout.", fb: "Exact." },
    [{ t: "La pile la plus haute compte 3 cubes, dans la rangée avant à l'extrémité gauche, et l'objet compte 8 cubes en tout.", fb: "Cela place la pile la plus haute dans la mauvaise rangée." }, { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité droite, et l'objet compte 8 cubes en tout.", fb: "Cela reflète l'objet." }, { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité gauche, et l'objet compte 11 cubes en tout.", fb: "Cela compte la pile la plus haute deux fois." }],
    "En combinant les vues, on obtient <b>la pile la plus haute de 3 cubes dans la rangée arrière à l'extrémité gauche, avec 8 cubes en tout</b>.", { mode: "match-object", hm: "fb" });
}, ["Utilise la vue de face pour placer les éléments de gauche à droite, et la vue de côté pour les placer de l'avant à l'arrière.", "Trouve d'abord la pile la plus haute : c'est la colonne la plus haute dans la vue de face et dans la vue de côté."]);

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
    var dirWord = turns === 1 ? "90° dans le sens horaire" : (turns === 2 ? "180°" : "90° dans le sens antihoraire");
    var cell = 24, body = u8T(160, 14, "Objet avant le tour (nombres = cubes)", 11, true);
    body += u8HM(hm, 124, 30, cell);
    var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes avant une rotation");
    var q = mcq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs. L'objet entier est tourné de " + dirWord + " sur la table, vu de dessus. Après le tour, quelles sont les hauteurs des colonnes de la vue de face, lues de gauche à droite ? Chaque hauteur est la pile la plus haute de cette colonne.",
      { t: u8ProfStr(newFront), fb: "Exact. En tournant le plan puis en prenant la pile la plus haute de chaque nouvelle colonne, on obtient ces hauteurs." },
      [
        { t: u8ProfStr(oldFront), fb: "Ce sont les hauteurs de face avant le tour; le tour déplace les piles vers de nouvelles colonnes." },
        { t: u8ProfStr(newSide), fb: "Cela lit un sens de côté de l'objet tourné plutôt que sa face." },
        { t: u8ProfStr(mirrorFront), fb: "Cela inverse la vue de face tournée de gauche à droite; vérifie vers quel bout les grandes piles se déplacent." }
      ],
      "Tourne d'abord la carte des hauteurs de " + dirWord + ", puis prends la pile la plus haute de chaque colonne de la carte tournée. Les hauteurs des colonnes de face tournées sont <b>" + u8ProfStr(newFront) + "</b>.",
      { mode: "rotate-predict", hm: u8Key(hm), turns: turns });
    q.figure = fig;
    return q;
  }
  return mcq("Un objet en cubes est tourné de 180° sur la table. Quelles sont les hauteurs des colonnes de la vue de face après le tour ?",
    { t: "1, 2, 3", fb: "Exact." },
    [{ t: "3, 2, 1", fb: "C'est la vue avant le tour." }, { t: "2, 2, 2", fb: "Cela aplatit les piles." }, { t: "3, 1, 2", fb: "Cela mélange les colonnes." }],
    "Tourner la carte de 180 degrés inverse les colonnes, ce qui donne <b>1, 2, 3</b>.", { mode: "rotate-predict", hm: "fb", turns: 2 });
}, ["Tourne d'abord toute la carte des hauteurs, dans le sens nommé, en gardant l'arrière de la carte en haut.", "Après le tour, prends la pile la plus haute de chaque colonne, de gauche à droite."]);

// 8. 10.16 L2 gen num, CR 2: front view squares after a described rotation.
E("u8-rotate-front-num", 8, ["10.16"], 2, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 6, 10);
  var turns = pick([1, 2, 3]);
  var rot = u8RotHM(hm, turns);
  var prof = u8FrontProf(rot), ans = u8SumArr(prof);
  var dirWord = turns === 1 ? "90° dans le sens horaire" : (turns === 2 ? "180°" : "90° dans le sens antihoraire");
  var cell = 24, body = u8T(160, 14, "Objet avant le tour (nombres = cubes)", 11, true);
  body += u8HM(hm, 124, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes avant une rotation");
  var chain = prof.map(function (v, i) { return (i === 0 ? "" : " &+ ") + fmtD(v); }).join("");
  var q = numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. L'objet est tourné de " + dirWord + " sur la table, vu de dessus, puis on dessine la vue de face. Combien de cases paraissent dans cette vue de face ? Compte chaque case visible dans chaque colonne.",
    ans, 0,
    "Tourne la carte de " + dirWord + ", puis prends la pile la plus haute de chaque colonne de la carte tournée : \\[ \\begin{aligned} \\text{hauteurs de face} &= " + u8ProfStr(prof) + " \\\\ \\text{cases} &= " + prof.join(" + ") + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la vue de face après le tour montre <b>" + fmtD(ans) + "</b> cases.",
    { mode: "rotate-front-num", hm: u8Key(hm), turns: turns });
  q.figure = fig;
  return q;
}, ["La rotation change quelles piles s'alignent dans chaque colonne de face.", "Tourne d'abord la carte, écris les nouvelles hauteurs des colonnes, puis additionne-les."]);

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
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ DROIT", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Construis l'objet qui a ces vues", 11, true);
    var fig = u8Svg(320, 112, body, "Vues de dessus, de face et du côté droit d'un objet en cubes");
    var q = mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle carte des hauteurs construit un objet qui a exactement ces vues ? Dans une carte des hauteurs, chaque nombre indique combien de cubes sont empilés sur cette case.",
      { t: optsT[0], fb: "Exact. Sa vue de dessus, ses hauteurs de colonnes de face et ses hauteurs de colonnes de côté correspondent toutes au diagramme." },
      [
        { t: optsT[1], fb: "Cela échange les rangées arrière et avant; la vue de côté se lirait alors dans le mauvais sens." },
        { t: optsT[2], fb: "Cela reflète l'objet de gauche à droite; la vue de face serait inversée." },
        { t: optsT[3], fb: "Cela abaisse la pile la plus haute d'un cube, donc les vues de face et de côté seraient plus courtes." }
      ],
      "La vue de dessus fixe quelles cases sont utilisées, la vue de face fixe la pile la plus haute de chaque colonne, et la vue de côté fixe la pile la plus haute de chaque rangée. La carte qui satisfait les trois est : <b>" + optsT[0] + "</b>",
      { mode: "build-from-views", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Quelle carte des hauteurs construit un objet avec les vues montrées ?",
    { t: "Rangée arrière (de gauche à droite) : 2, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Exact." },
    [{ t: "Rangée arrière (de gauche à droite) : 1, 1, 1. Rangée avant (de gauche à droite) : 2, 0, 1.", fb: "Cela échange les rangées." }, { t: "Rangée arrière (de gauche à droite) : 1, 0, 2. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Cela reflète l'objet." }, { t: "Rangée arrière (de gauche à droite) : 1, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Cela abaisse la pile la plus haute." }],
    "La carte qui correspond aux trois vues est <b>Rangée arrière (de gauche à droite) : 2, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.</b>", { mode: "build-from-views", hm: "fb" });
}, ["Utilise les trois vues ensemble : le dessus pour l'empreinte, la face pour les hauteurs des colonnes, le côté pour les hauteurs des rangées.", "Teste d'abord chaque carte candidate contre la vue de face; la plupart des mauvaises cartes échouent là."]);

// 10. 10.17 L2 gen num, CR 3: total cubes in the object shown as a height map.
E("u8-cubes-total-num", 8, ["10.17"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Construis cet objet (nombres = cubes sur chaque case)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes à construire");
  var flat = hm[0].concat(hm[1]);
  var q = numq("Le diagramme est le plan d'un objet en cubes : chaque nombre indique combien de cubes sont empilés sur cette case. Combien de cubes faut-il en tout pour construire l'objet ?",
    tot, 0,
    "Additionne la pile sur chaque case, rangée arrière puis rangée avant : \\[ \\begin{aligned} \\text{total} &= " + flat.join(" + ") + " \\\\ &= " + fmtD(tot) + " \\end{aligned} \\] Donc l'objet demande <b>" + fmtD(tot) + "</b> cubes.",
    { mode: "cubes-total", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Chaque nombre du plan est une pile de cubes dans l'objet fini.", "Additionne d'abord les nombres de la rangée arrière, puis ceux de la rangée avant."]);

// 11. 10.9 L2 gen num, CR 3: squares showing in the front view.
E("u8-front-squares-num", 8, ["10.9"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var prof = u8FrontProf(hm), ans = u8SumArr(prof), tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes");
  var q = numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Combien de cases paraissent dans la vue de face de l'objet ? Dans la vue de face, une pile plus haute cache toute pile plus courte directement derrière elle.",
    ans, 0,
    "Dans chaque colonne, seule la pile la plus haute paraît, donc les hauteurs des colonnes sont le plus grand nombre de chaque colonne : \\[ \\begin{aligned} \\text{hauteurs de face} &= " + u8ProfStr(prof) + " \\\\ \\text{cases} &= " + prof.join(" + ") + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] L'objet a " + fmtD(tot) + " cubes, mais la vue de face montre seulement <b>" + fmtD(ans) + "</b> cases.",
    { mode: "front-squares", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Une vue montre des silhouettes, pas chaque cube; les cubes cachés n'ajoutent pas de cases.", "Pour chaque colonne, compare les nombres arrière et avant et garde le plus grand, puis additionne les trois résultats."]);

// 12. 10.4 L2 gen num, CR 3: angles around a point with regular tiles.
E("u8-around-point-num", 8, ["10.4"], 1, "gen", function () {
  var mode = ri(0, 2), n, ang, k, ans, prompt, sol;
  var R = ri(24, 34), rot = ri(0, 50);
  if (mode === 0) {
    n = pick([3, 4, 6]); ang = u8Interior(n); ans = 360 / ang;
    prompt = "Des copies d'un " + U8_POLY_NAMES[n] + " sont placées autour d'un seul point, coin contre coin, sans espaces. L'angle intérieur de la tuile est de " + fmtD(ang) + " degrés. Combien de tuiles se rencontrent au point ?";
    sol = "Les angles autour d'un point totalisent 360 degrés, et chaque tuile ajoute un angle intérieur : \\[ \\begin{aligned} \\text{tuiles} &= 360° \\div " + fmtD(ang) + "° \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc <b>" + fmtD(ans) + "</b> tuiles se rencontrent au point.";
  } else if (mode === 1) {
    n = pick([3, 4, 6, 8, 12]); ang = u8Interior(n); k = ri(1, Math.floor(359 / ang) - 0);
    if (k * ang >= 360) k = 1;
    ans = 360 - k * ang;
    prompt = "Un " + U8_POLY_NAMES[n] + " a un angle intérieur de " + fmtD(ang) + " degrés. " + fmtD(k) + (k === 1 ? " copie est placée" : " copies sont placées") + " autour d'un point, coin contre coin. Combien de degrés des 360 degrés complets autour du point restent encore non couverts ?";
    sol = "Trouve l'angle que les tuiles placées couvrent, puis soustrais-le d'un tour complet : \\[ \\begin{aligned} \\text{couvert} &= " + fmtD(k) + " \\times " + fmtD(ang) + "° = " + fmtD(k * ang) + "° \\\\ \\text{non couvert} &= 360° - " + fmtD(k * ang) + "° \\\\ &= " + fmtD(ans) + "° \\end{aligned} \\] Donc <b>" + fmtD(ans) + " degrés</b> restent non couverts.";
  } else {
    var pair = pick([["hexagone", 120, "triangle", 60, 1], ["hexagone", 120, "triangle", 60, 2], ["carré", 90, "triangle", 60, 2]]);
    var covered = pair[4] * pair[1];
    ans = (360 - covered) / pair[3];
    prompt = "Des tuiles se rencontrent en un point sans espaces. Au point, il y a " + fmtD(pair[4]) + " " + pair[0] + (pair[4] > 1 ? "s réguliers" : " régulier") + " (angle intérieur " + fmtD(pair[1]) + " degrés) et des triangles équilatéraux (angle intérieur 60 degrés). Combien de triangles se rencontrent au point ?";
    sol = "Les angles autour du point doivent totaliser 360 degrés : \\[ \\begin{aligned} \\text{reste pour les triangles} &= 360° - " + fmtD(pair[4]) + " \\times " + fmtD(pair[1]) + "° = " + fmtD(360 - covered) + "° \\\\ \\text{triangles} &= " + fmtD(360 - covered) + "° \\div 60° \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc <b>" + fmtD(ans) + "</b> triangles se rencontrent au point.";
    n = pair[0] === "hexagone" ? 6 : 4;
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n || 6, rot), "Une tuile en polygone régulier");
  var q = numq(prompt, ans, 0, sol, { mode: "around-point-" + mode, n: n, k: k || 0 });
  q.figure = fig;
  return q;
}, ["Les angles autour d'un point totalisent exactement 360 degrés.", "Multiplie l'angle intérieur par le nombre de tuiles placées, puis compare avec 360."]);

// 13. 10.5 L2 gen num, CR 2: the missing angle of an irregular quadrilateral, and tessellating.
E("u8-irregular-angle-num", 8, ["10.5"], 1, "gen", function () {
  for (var att = 0; att < 100; att++) {
    var a = ri(55, 130), b = ri(55, 130), c = ri(55, 130);
    var d = 360 - a - b - c;
    if (d < 40 || d > 160) continue;
    var R = ri(26, 34), rot = ri(0, 40);
    var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, 4, rot), "Une tuile en quadrilatère irrégulier");
    var q = numq("Une tuile en quadrilatère irrégulier a trois angles intérieurs de " + fmtD(a) + " degrés, " + fmtD(b) + " degrés et " + fmtD(c) + " degrés. Les angles intérieurs de tout quadrilatère totalisent 360 degrés. Quel est le quatrième angle intérieur, en degrés ?",
      d, 0,
      "Additionne les trois angles connus et soustrais de 360 : \\[ \\begin{aligned} \\text{connus} &= " + fmtD(a) + "° + " + fmtD(b) + "° + " + fmtD(c) + "° = " + fmtD(a + b + c) + "° \\\\ \\text{quatrième angle} &= 360° - " + fmtD(a + b + c) + "° \\\\ &= " + fmtD(d) + "° \\end{aligned} \\] Donc le quatrième angle est <b>" + fmtD(d) + " degrés</b>. Des copies de tout quadrilatère forment un dallage, parce que ses quatre angles peuvent se rencontrer en un point et totaliser exactement 360 degrés.",
      { mode: "irregular-quad", a: a, b: b, c: c });
    q.figure = fig;
    return q;
  }
  var qf = numq("Une tuile en quadrilatère irrégulier a trois angles intérieurs de 80 degrés, 100 degrés et 90 degrés. Quel est le quatrième angle intérieur, en degrés ?",
    90, 0, "Les angles totalisent 360 degrés : \\[ \\begin{aligned} 360° - (80° + 100° + 90°) &= 90° \\end{aligned} \\] Donc le quatrième angle est <b>90 degrés</b>.", { mode: "irregular-quad", a: 80, b: 100, c: 90 });
  qf.figure = u8Svg(120, 120, u8RegPoly(60, 60, 30, 4, 10), "Une tuile en quadrilatère irrégulier");
  return qf;
}, ["Les angles intérieurs d'un quadrilatère totalisent toujours 360 degrés.", "Additionne d'abord les trois angles donnés, puis soustrais de 360."]);

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
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>'; /* FMT-GEOM */
  }
  var kind2 = mode === "translation" ? "base" : (mode === "reflection" ? "mirror" : "rot");
  var body = tile(70, 60, "base") + tile(70 + s + gap + 40, 60, kind2);
  body += u8T(70, 60 - s / 2 - 16, "Tuile 1", 12, true) + u8T(70 + s + gap + 40, 60 - s / 2 - 16, "Tuile 2", 12, true);
  var W = 70 + s + gap + 40 + 60;
  var fig = u8Svg(W, 120, body, "Deux tuiles dans un motif de dallage, la deuxième une image de la première");
  var desc = {
    translation: "La tuile 2 est la tuile 1 glissée de côté : même taille, même sens, et le point reste près du même coin.",
    reflection: "La tuile 2 est la tuile 1 retournée : le point passe au coin correspondant de l'autre côté, comme une image miroir.",
    rotation: "La tuile 2 est la tuile 1 tournée autour d'un point : le point suit son coin pendant que la tuile tourne."
  };
  var names = { translation: "Une translation (un glissement)", reflection: "Une réflexion (un retournement)", rotation: "Une rotation (un tour)" };
  var others = ["translation", "reflection", "rotation"].filter(function (m) { return m !== mode; });
  var q = mcq("Le diagramme montre deux tuiles voisines dans un dallage. Chaque tuile est un triangle rectangle avec un point près d'un coin. Quelle transformation envoie la tuile 1 sur la tuile 2 ?",
    { t: names[mode], fb: "Exact. " + desc[mode] },
    [
      { t: names[others[0]], fb: "Regarde le point : sa position élimine ce choix. " + desc[mode] },
      { t: names[others[1]], fb: "Regarde le point : sa position élimine ce choix. " + desc[mode] },
      { t: "Un agrandissement (taille changée)", fb: "Les deux tuiles ont exactement la même taille, donc aucun changement de taille n'est en jeu." }
    ],
    "Compare le point et les coins des deux tuiles. " + desc[mode] + " Donc la transformation est <b>" + names[mode].toLowerCase() + "</b>.",
    { mode: "tess-transform-" + mode, s: s, gap: gap });
  q.figure = fig;
  return q;
}, ["Suis un élément marqué, comme le point, de la première tuile à la deuxième.", "Un glissement garde la tuile dans le même sens, un retournement la reflète, et un tour la fait tourner."]);

// 15. 10.13 L2 var: which plan creates a tessellation.
E("u8-create-tess-var", 8, ["10.13"], 1, "var", varset([
  function () {
    return mcq("Un élève crée un dallage à partir de copies d'une tuile carrée. Quel plan fonctionne, et pourquoi ?",
      { t: "Glisser les copies de côté et vers le bas dans une grille; l'aire couverte est le nombre de tuiles fois l'aire d'une tuile.", fb: "Exact. Glisser (translater) des carrés remplit le plan, et le glissement garde l'aire de chaque tuile inchangée." },
      [{ t: "Tourner chaque copie un peu pour que le motif s'ouvre en éventail; l'aire grandit quand l'éventail s'étend.", fb: "Ouvrir les tuiles en éventail crée des espaces en coin entre elles, donc le plan n'est pas couvert." }, { t: "Réduire chaque copie légèrement pour qu'elles s'ajustent plus facilement; l'aire totale reste la même qu'au départ.", fb: "Réduire laisse des espaces, et changer la taille des tuiles change l'aire totale couverte." }, { t: "Faire chevaucher chaque copie un peu sur la précédente dans le motif; les chevauchements gardent l'aire totale la même qu'au départ.", fb: "Les chevauchements couvrent une partie du sol deux fois et ne sont pas permis dans un dallage." }],
      "Les carrés forment un dallage par translation sur une grille, et les transformations ne changent pas l'aire d'une tuile. Donc le plan qui fonctionne est de <b>glisser les copies de côté et vers le bas dans une grille; l'aire couverte est le nombre de tuiles fois l'aire d'une tuile</b>.",
      { mode: "create-square" });
  },
  function () {
    return mcq("Une classe fait un motif de plancher avec des triangles équilatéraux et des carrés ensemble. Quel énoncé au sujet du dallage fini est vrai ?",
      { t: "À chaque point, les angles totalisent 360 degrés, et l'aire totale est la somme des aires de toutes les tuiles.", fb: "Exact. Des sommes d'angles de 360 gardent le recouvrement sans espaces, et combiner des tuiles additionne leurs aires." },
      [{ t: "À chaque point, les angles totalisent 180 degrés, parce que les tuiles sont posées sur un plancher plat de la classe.", fb: "Autour d'un point sur un plancher plat, les angles totalisent 360 degrés, pas 180." }, { t: "L'aire totale est l'aire d'un triangle fois l'aire d'un carré, pour tout le plancher couvert par le dallage.", fb: "Les aires des tuiles combinées s'additionnent; elles ne se multiplient pas." }, { t: "Le motif fonctionne seulement si chaque tuile est tournée du même angle à chaque fois dans le motif.", fb: "Les tuiles d'un dallage mixte peuvent être tournées de quantités différentes; c'est la somme des angles à chaque point qui compte." }],
      "Un dallage exige des sommes d'angles de 360 degrés à chaque point, et les aires s'additionnent quand on combine des formes. Donc <b>à chaque point, les angles totalisent 360 degrés, et l'aire totale est la somme des aires de toutes les tuiles</b>.",
      { mode: "create-mixed" });
  },
  function () {
    return mcq("Quel plan crée un dallage avec des hexagones réguliers et des triangles équilatéraux ?",
      { t: "Entourer chaque hexagone de triangles dans ses espaces, en répétant le groupe par glissement sur le plancher.", fb: "Exact. Les angles d'hexagone de 120 degrés et les angles de triangle de 60 degrés se combinent pour donner 360 à chaque point, et le groupe se répète par translation." },
      [{ t: "Placer les hexagones en rangée et laisser les espaces vides pour ajouter les triangles plus tard sur le plancher.", fb: "Des espaces vides signifient que la surface n'est pas couverte, donc ce n'est pas encore un dallage." }, { t: "Utiliser seulement des hexagones, mais pousser chaque rangée à moitié dans la rangée au-dessus du motif.", fb: "Pousser les rangées les unes dans les autres crée des chevauchements, ce qu'un dallage ne permet pas." }, { t: "Couper chaque triangle en deux et jeter les moitiés pour que les morceaux s'ajustent aux espaces des hexagones.", fb: "Jeter des morceaux change les formes et leurs aires; un dallage utilise des tuiles entières qui s'ajustent telles quelles." }],
      "Les angles de l'hexagone (120 degrés) et du triangle (60 degrés) se combinent pour donner 360 degrés en un point, et le groupe fini se répète par glissement. Donc le plan est d'<b>entourer chaque hexagone de triangles dans ses espaces, en répétant le groupe par glissement sur le plancher</b>.",
      { mode: "create-hex-tri" });
  },
  function () {
    return mcq("Un élève couvre une page d'un dallage de copies d'une forme de poisson faite plus tôt. Chaque copie a la même taille, et les poissons voisins sont retournés pour que la tête rencontre la queue. Quelle description du dallage est exacte ?",
      { t: "Il est construit avec des réflexions, et son aire totale est le nombre de poissons fois l'aire d'un poisson.", fb: "Exact. Retourner est une réflexion, et les réflexions conservent l'aire." },
      [{ t: "Il est construit avec des agrandissements, et son aire totale du dallage est le double de l'aire d'un poisson.", fb: "Toutes les copies ont la même taille, donc aucun agrandissement n'est utilisé, et le total est le nombre fois une aire." }, { t: "Il est construit avec des rotations seulement, et les réflexions changeraient l'aire de chaque poisson.", fb: "Les poissons sont retournés, ce qui est une réflexion, et une réflexion garde l'aire la même." }, { t: "Ce n'est pas un dallage, à moins que les poissons se chevauchent aussi légèrement les uns sur les autres.", fb: "Un dallage ne doit avoir aucun chevauchement; des copies retournées qui se rencontrent bord à bord suffisent." }],
      "Retourner une copie est une réflexion, et les réflexions, comme toutes les transformations rigides, conservent l'aire. Donc le dallage est <b>construit avec des réflexions, et son aire totale est le nombre de poissons fois l'aire d'un poisson</b>.",
      { mode: "create-fish" });
  }
]), ["Un plan qui fonctionne doit couvrir sans espaces et sans chevauchements, et les aires s'additionnent d'une tuile à l'autre.", "Nomme la transformation qui fait la répétition, puis vérifie ce qui arrive à l'aire."]);

// 16. 10.8 L3 gen MC with figure: a combination of transformations in a tessellation.
E("u8-combo-transform", 8, ["10.8"], 3, "gen", function () {
  var s = ri(26, 34), gap = ri(16, 24), lift = ri(6, 12);
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    else pts = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7];
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>'; /* FMT-GEOM */
  }
  var cx2 = 70 + s + gap + 40;
  var body = tile(70, 66, "base") + tile(cx2, 66 - lift, "flip");
  body += u8T(70, 66 - s / 2 - 16, "Tuile 1", 12, true) + u8T(cx2, 66 - lift - s / 2 - 16, "Tuile 2", 12, true);
  var fig = u8Svg(cx2 + 60, 132, body, "Deux tuiles dans un motif où la deuxième est retournée et décalée par rapport à la première");
  var q = mcq("Le diagramme montre deux tuiles voisines dans un dallage. Chaque tuile est un triangle rectangle avec un point près d'un coin. La tuile 2 est retournée par rapport à la tuile 1, et elle est aussi plus haut et plus à droite. Quelle description convient le mieux à la transformation de la tuile 1 à la tuile 2 ?",
    { t: "Une réflexion combinée à une translation (une réflexion glissée).", fb: "Exact. La tuile est reflétée et aussi décalée, donc deux transformations agissent ensemble." },
    [
      { t: "Une réflexion seule, sans aucun déplacement le long du motif.", fb: "Une réflexion seule placerait la tuile directement de l'autre côté d'un axe miroir, sans décalage supplémentaire le long du motif." },
      { t: "Une translation seule, sans aucun retournement de la tuile.", fb: "Une translation garde la tuile dans le même sens; cette tuile est retournée, donc un glissement seul ne peut pas le faire." },
      { t: "Une rotation seule, sans aucun retournement de la tuile ici.", fb: "Un seul tour garderait le sens de la tuile; le point montre que la tuile a été reflétée et aussi déplacée." }
    ],
    "Le point montre que la tuile a été reflétée, et sa position montre qu'elle a aussi été décalée de côté et vers le haut. Deux transformations agissent ensemble : <b>une réflexion combinée à une translation (une réflexion glissée)</b>.",
    { mode: "combo-glide", s: s, gap: gap, lift: lift });
  q.figure = fig;
  return q;
}, ["Vérifie deux choses séparément : la tuile a-t-elle été retournée, et a-t-elle été décalée ?", "Quand une tuile est à la fois reflétée et déplacée, la transformation est une combinaison."]);

// 17. 10.14 L3 var: creating a new tessellating shape from a tessellating polygon.
E("u8-new-shape-var", 8, ["10.14"], 3, "var", varset([
  function () {
    var q=mcq("Un carré forme un dallage. Un élève coupe un petit triangle au milieu du côté gauche du carré et colle le même triangle au milieu du côté droit. Qu'est-ce qui est vrai de la nouvelle forme ?",
      { t: "Elle forme encore un dallage par glissement, et son aire est la même que celle du carré.", fb: "Exact. La bosse d'un côté s'ajuste à l'entaille du côté opposé, et déplacer un morceau garde l'aire totale inchangée." },
      [{ t: "Elle forme encore un dallage, mais son aire est plus grande que celle du carré d'origine.", fb: "Le triangle a été déplacé, pas ajouté; aucun nouveau matériau n'a été créé, donc l'aire est inchangée." }, { t: "Elle ne forme plus un dallage, parce que seul le carré d'origine peut couvrir le plan.", fb: "Les formes faites ainsi forment un dallage; la bosse et l'entaille correspondantes sont exactement ce qui fait que les copies s'ajustent." }, { t: "Elle forme un dallage seulement si le triangle coupé est jeté du carré d'origine.", fb: "Jeter le morceau laisse une entaille sans rien pour la remplir et réduit l'aire." }],
      "Le morceau coupé d'un côté est ajouté au côté opposé, donc les copies s'ajustent, bosse dans entaille, par un glissement, et l'aire est conservée. Donc <b>elle forme encore un dallage par glissement, et son aire est la même que celle du carré</b>.",
      { mode: "new-square-slide" }); q.figure=m8NotchSquareSVG(); return q;
  },
  function () {
    return mcq("Un triangle équilatéral forme un dallage. Une élève coupe un petit morceau d'un côté et le colle sur le côté suivant du même triangle, en tournant le morceau pendant qu'elle le déplace. Les copies de la nouvelle forme sont ajustées ensemble en tournant chaque copie d'un tiers de tour complet autour d'un coin. Quel énoncé décrit le résultat ?",
      { t: "La nouvelle forme forme un dallage avec des rotations, et son aire égale l'aire du triangle.", fb: "Exact. Le morceau déplacé correspond à la coupe de la copie voisine sous un tour de 120 degrés, et l'aire est conservée." },
      [{ t: "La nouvelle forme forme un dallage avec des translations seulement, et son aire est plus petite.", fb: "Déplacer un morceau vers un côté adjacent apparie les copies par rotation, pas par un simple glissement, et aucune aire n'est perdue." }, { t: "La nouvelle forme ne peut pas former un dallage, car ce n'est plus un polygone.", fb: "Les formes qui ne sont pas des polygones peuvent former un dallage; la coupe et le morceau ajouté correspondent entre les copies voisines." }, { t: "La nouvelle forme forme un dallage seulement après que chaque copie est agrandie.", fb: "Toutes les copies gardent la même taille; agrandir ne fait pas partie de la méthode." }],
      "Couper un morceau d'un côté et l'ajouter au côté adjacent apparie les copies sous un tour de 120 degrés, et déplacer un morceau conserve l'aire. Donc <b>la nouvelle forme forme un dallage avec des rotations, et son aire égale l'aire du triangle</b>.",
      { mode: "new-triangle-rotate" });
  },
  function () {
    return mcq("Un élève veut transformer un parallélogramme qui forme un dallage en une nouvelle forme qui forme un dallage. Quelle méthode fonctionne ?",
      { t: "Couper une courbe du côté du haut et coller la même courbe sur le côté du bas, puis répéter les copies par glissement.", fb: "Exact. Les côtés opposés d'un parallélogramme s'apparient par un glissement, donc la courbe et sa copie s'ajustent ensemble et l'aire est conservée." },
      [{ t: "Couper une courbe du côté du haut et la jeter, puis répéter les copies par glissement sur tout le plancher de la pièce.", fb: "Jeter le morceau laisse un espace qu'aucune copie ne peut remplir, et l'aire change." }, { t: "Couper une courbe du côté du haut et la coller aussi sur le côté du haut du même parallélogramme d'origine.", fb: "Ajouter au même côté laisse le côté du bas droit, donc les bosses rencontrent les bosses et les copies ne peuvent pas s'ajuster." }, { t: "Étirer le parallélogramme au double de sa largeur et couper un morceau d'un coin du parallélogramme d'origine.", fb: "Étirer change les angles de la forme, donc les copies ne se rencontrent plus nettement autour de chaque point." }],
      "Les morceaux déplacés entre les côtés opposés d'une forme qui forme un dallage gardent l'ajustement par un glissement et conservent l'aire. Donc la méthode qui fonctionne est de <b>couper une courbe du côté du haut et coller la même courbe sur le côté du bas, puis répéter les copies par glissement</b>.",
      { mode: "new-parallelogram" });
  },
  function () {
    return mcq("Après avoir modifié un hexagone qui forme un dallage, une élève vérifie sa nouvelle forme et trouve que son aire est plus grande que l'aire de l'hexagone. Qu'est-ce qui a dû arriver dans sa modification ?",
      { t: "Elle a ajouté un morceau sans couper le même morceau ailleurs.", fb: "Exact. L'aire grandit seulement quand du matériau est ajouté sans qu'un morceau égal soit enlevé." },
      [{ t: "Elle a déplacé un morceau d'un côté au côté opposé de la forme.", fb: "Déplacer un morceau garde la quantité totale de matériau, et donc l'aire, la même." }, { t: "Elle a retourné la forme entière avant de la copier dans le motif.", fb: "Retourner est une réflexion; cela ne change pas l'aire." }, { t: "Elle a tourné chaque copie de 60 degrés dans le motif du dallage.", fb: "Tourner les copies ne change pas l'aire de la forme elle-même." }],
      "Les transformations et les déplacements de morceaux conservent l'aire; l'aire peut grandir seulement quand du matériau supplémentaire est ajouté. Donc <b>elle a ajouté un morceau sans couper le même morceau ailleurs</b>.",
      { mode: "new-area-check" });
  }
]), ["La méthode fiable déplace un morceau d'un côté au côté avec lequel il s'apparie, pour que les copies s'ajustent encore.", "Déplacer un morceau ne change jamais l'aire totale; ajouter ou jeter un morceau la change."]);

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
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE : " + u8ProfStr(front), 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ : " + u8ProfStr(side), 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 104, "Les colonnes de la vue de côté vont de l'avant à l'arrière", 10, false);
    var fig = u8Svg(320, 114, body, "Vues de dessus, de face et de côté d'un objet en cubes");
    var q = numq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Les hauteurs des colonnes de la vue de face sont " + u8ProfStr(front) + ", et les hauteurs des colonnes de la vue de côté, lues de l'avant de l'objet vers l'arrière, sont " + u8ProfStr(side) + ". Quel est le plus grand nombre possible de cubes dans un objet qui a exactement ces vues ?",
      tot, 0,
      "Une pile sur une case donnée ne peut pas dépasser la hauteur de sa colonne de face ni la hauteur de sa colonne de côté, donc sa plus grande hauteur est la plus petite des deux. En additionnant ces plus grandes hauteurs sur chaque case remplie de la vue de dessus, on obtient \\[ \\begin{aligned} \\text{plus grand total} &= " + fmtD(tot) + " \\end{aligned} \\] Donc le plus grand nombre possible de cubes est <b>" + fmtD(tot) + "</b>.",
      { mode: "build-max", hm: u8Key(hm), tot: tot });
    q.figure = fig;
    return q;
  }
  return numq("Quel est le plus grand nombre possible de cubes dans un objet dont les hauteurs de la vue de face sont 2, 2, dont la vue de dessus est une seule rangée de 2 cases, et dont la hauteur de la vue de côté est 2 ?",
    4, 0, "Chaque pile peut être aussi haute que la plus petite de ses limites de colonne et de rangée, 2, et il y a 2 cases : \\[ \\begin{aligned} 2 \\times 2 &= 4 \\end{aligned} \\] Donc le plus grand total est <b>4</b>.", { mode: "build-max", hm: "fb", tot: 4 });
}, ["Chaque pile est limitée par deux vues à la fois : sa colonne de face et sa colonne de côté.", "Pour chaque case remplie de la vue de dessus, prends la plus petite des deux hauteurs limites, puis additionne."]);

// 19. 10.13 L3 gen num, CR 2: mixed regular shapes around a point in a created tessellation.
E("u8-mixed-point-num", 8, ["10.13"], 3, "gen", function () {
  var mode = ri(0, 2), ans, prompt, sol, n;
  var R = ri(24, 33), rot = ri(0, 50);
  if (mode === 0) {
    ans = 360 - 135 - 90;
    n = 8;
    prompt = "Un élève crée un dallage avec des octogones réguliers (angle intérieur 135 degrés) et des carrés (angle intérieur 90 degrés). À un point du motif, un octogone et un carré se rencontrent déjà. Un deuxième octogone est placé dans l'espace restant. Quel est l'angle intérieur, en degrés, de cet espace restant avant que le deuxième octogone soit placé ? Autrement dit, combien de degrés autour du point restent après le premier octogone et le carré ?";
    sol = "Les angles autour d'un point totalisent 360 degrés : \\[ \\begin{aligned} \\text{restant} &= 360° - 135° - 90° \\\\ &= " + fmtD(ans) + "° \\end{aligned} \\] Les <b>" + fmtD(ans) + " degrés</b> restants correspondent exactement à l'angle intérieur de 135 degrés du deuxième octogone, et c'est pourquoi les octogones et les carrés forment un dallage ensemble.";
  } else if (mode === 1) {
    ans = 4;
    n = 6;
    prompt = "Un élève crée un dallage avec des hexagones réguliers (angle intérieur 120 degrés) et des triangles équilatéraux (angle intérieur 60 degrés). À chaque point, un hexagone rencontre le point, et le reste du point est rempli par des triangles. Combien de triangles se rencontrent à chaque point ?";
    sol = "Soustrais l'angle de l'hexagone d'un tour complet, puis partage le reste entre des angles de triangle de 60 degrés : \\[ \\begin{aligned} \\text{restant} &= 360° - 120° = 240° \\\\ \\text{triangles} &= 240° \\div 60° \\\\ &= 4 \\end{aligned} \\] Donc <b>4</b> triangles se rencontrent à chaque point.";
  } else {
    ans = 120;
    n = 12;
    prompt = "Un élève crée un dallage avec trois formes à chaque point : un dodécagone régulier (angle intérieur 150 degrés), un carré (angle intérieur 90 degrés) et un hexagone régulier. Quel est l'angle intérieur, en degrés, que l'hexagone doit contribuer au point pour que les trois formes le remplissent exactement ?";
    sol = "Les trois angles doivent totaliser un tour complet : \\[ \\begin{aligned} \\text{angle de l'hexagone} &= 360° - 150° - 90° \\\\ &= 120° \\end{aligned} \\] Donc la troisième forme doit contribuer <b>120 degrés</b>, ce qui est exactement l'angle intérieur d'un hexagone régulier, donc la combinaison remplit le point sans espace.";
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n, rot), "Une tuile en polygone régulier utilisée dans le motif");
  var q = numq(prompt, ans, 0, sol, { mode: "mixed-point-" + mode, n: n });
  q.figure = fig;
  return q;
}, ["Les angles autour d'un point dans un dallage totalisent exactement 360 degrés.", "Additionne les angles déjà au point et soustrais de 360."]);



