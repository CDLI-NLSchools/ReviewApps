// Math 9 (French) Unit 7 Similarity and Transformations question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 3905 to 4898).
// CRMARKS: u7-scale-draw-num=3
// CRMARKS: u7-draw-similar-num=3
// CRMARKS: u7-similar-context-num=3
// CRMARKS: u7-similar-two-step-num=3
// CRMARKS: u7-indirect-measure-num=2
// CRMARKS: u7-complete-half=2
// CRMARKS: u7-translation-rule=2
// Unit 7: Similarity and Transformations (Math 9, NL). Entries only; helpers prefixed u7.
function u7T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 13) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>'; /* FMT-GEOM */
}
function u7Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u7Pts(pts) { return pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" "); } /* FMT-GEOM */
function u7Poly(pts, fill, dash) {
  return '<polygon points="' + u7Pts(pts) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="2"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>';
}
function u7Line(p, q, dash, w, col) {
  return '<line x1="' + fmt(p[0], 1) + '" y1="' + fmt(p[1], 1) + '" x2="' + fmt(q[0], 1) + '" y2="' + fmt(q[1], 1) + '" stroke="' + (col || FIG_INK) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="6 4"' : "") + '/>'; /* FMT-GEOM */
}
function u7Dot(p, r) { return '<circle cx="' + fmt(p[0], 1) + '" cy="' + fmt(p[1], 1) + '" r="' + (r || 3) + '" fill="' + FIG_INK + '"/>'; } /* FMT-GEOM */
function u7Grid(o) {
  var cell = o.cell || 24, W = (o.xMax - o.xMin) * cell + 40, H = (o.yMax - o.yMin) * cell + 40;
  var ox = 20 - o.xMin * cell, oy = 20 + o.yMax * cell;
  function X(x) { return ox + x * cell; } function Y(y) { return oy - y * cell; }
  var s = "", x, y;
  for (x = o.xMin; x <= o.xMax; x++) s += '<line x1="' + fmt(X(x), 1) + '" y1="' + fmt(Y(o.yMin), 1) + '" x2="' + fmt(X(x), 1) + '" y2="' + fmt(Y(o.yMax), 1) + '" stroke="#d7e0da" stroke-width="1"/>'; /* FMT-GEOM */
  for (y = o.yMin; y <= o.yMax; y++) s += '<line x1="' + fmt(X(o.xMin), 1) + '" y1="' + fmt(Y(y), 1) + '" x2="' + fmt(X(o.xMax), 1) + '" y2="' + fmt(Y(y), 1) + '" stroke="#d7e0da" stroke-width="1"/>'; /* FMT-GEOM */
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
  return u7Svg(W, H, s, o.aria || "Diagramme sur une grille");
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
function u7Coord(p) { return "(" + fmtD(p[0]) + ", " + fmtD(p[1]) + ")"; }

// 1. 10.8 L1 var: what a stated scale means in media and real-life contexts.
E("u7-scale-media-var", 7, ["10.8"], 1, "var", varset([
  function () {
    return mcq("Une carte des sentiers dans un guide de parc utilise l'échelle suivante : 1 cm représente 5 km. Que signifie cette échelle ?",
      { t: "Chaque 1 cm sur la carte représente 5 km sur le terrain.", fb: "Exact. Le premier nombre est la longueur sur la carte et le deuxième est la longueur réelle." },
      [
        { t: "Chaque 5 cm sur la carte représente 1 km sur le terrain.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "Chaque 1 cm sur le terrain représente 5 km sur la carte.", fb: "Cela inverse la carte et le terrain." },
        { t: "La carte elle-même est 5 fois plus grande que le parc entier.", fb: "Une carte est une réduction, donc elle est plus petite que le parc réel." }
      ],
      "Dans une échelle, la longueur sur la carte vient en premier : 1 cm sur la carte correspond à 5 km dans la vie réelle. Donc l'échelle signifie <b>chaque 1 cm sur la carte représente 5 km sur le terrain</b>.",
      { mode: "scale-map" });
  },
  function () {
    return mcq("Une photo est agrandie avec un facteur d'échelle de 2. Un facteur d'échelle compare la longueur de l'image à la longueur d'origine. Que signifie un facteur d'échelle de 2 pour la photo ?",
      { t: "Chaque longueur dans l'agrandissement vaut 2 fois la longueur correspondante dans la photo.", fb: "Exact. Un facteur d'échelle de 2 double chaque longueur correspondante." },
      [
        { t: "Chaque longueur dans l'agrandissement mesure 2 cm de plus que dans la photo d'origine.", fb: "Un facteur d'échelle multiplie les longueurs ; il n'ajoute pas de centimètres." },
        { t: "Chaque longueur dans l'agrandissement vaut la moitié de la longueur correspondante dans la photo.", fb: "La moitié serait un facteur d'échelle de 0,5, pas 2." },
        { t: "Seul le côté le plus long de la photo est doublé, et les autres côtés restent pareils.", fb: "Un facteur d'échelle s'applique à chaque longueur, pas seulement à un côté." }
      ],
      "Le facteur d'échelle multiplie chaque longueur : \\[ \\begin{aligned} \\text{longueur de l'image} &= 2 \\times \\text{longueur d'origine} \\end{aligned} \\] Donc <b>chaque longueur dans l'agrandissement vaut 2 fois la longueur correspondante dans la photo</b>.",
      { mode: "scale-photo" });
  },
  function () {
    return mcq("Un plan d'une salle de classe montre l'échelle suivante : 2 cm représente 1 m. Que signifie cette échelle ?",
      { t: "Chaque 2 cm sur le plan représente 1 m dans la salle de classe réelle.", fb: "Exact. La longueur du dessin est donnée en premier, puis la longueur réelle." },
      [
        { t: "Chaque 1 cm sur le plan représente 2 m dans la salle de classe réelle.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "La salle de classe réelle mesure 2 cm pour chaque mètre sur le plan.", fb: "Cela confond la longueur qui appartient au dessin." },
        { t: "Le plan dessiné est plus grand que la salle de classe réelle elle-même.", fb: "Un plan est une réduction, donc il est plus petit que la salle." }
      ],
      "Le premier nombre appartient au dessin et le deuxième à la salle réelle. Donc l'échelle signifie <b>chaque 2 cm sur le plan représente 1 m dans la salle de classe réelle</b>.",
      { mode: "scale-blueprint" });
  },
  function () {
    return mcq("Une voiture miniature est construite à l'échelle 1 : 24. Le premier nombre est la longueur de la miniature et le deuxième est la longueur de la voiture réelle. Que signifie cette échelle ?",
      { t: "La voiture réelle est 24 fois plus longue que la miniature.", fb: "Exact. Chaque longueur de la miniature est multipliée par 24 pour donner la longueur réelle." },
      [
        { t: "La miniature est 24 fois plus longue que la voiture réelle.", fb: "Cela inverse l'échelle ; la miniature est la plus petite." },
        { t: "La voiture réelle mesure 24 cm de plus que la miniature.", fb: "Une échelle multiplie les longueurs ; elle n'ajoute pas 24 cm." },
        { t: "La miniature et la voiture réelle ont la même taille.", fb: "Une échelle de 1 : 24 signifie que les tailles diffèrent d'un facteur de 24." }
      ],
      "Les longueurs correspondantes suivent \\[ \\begin{aligned} \\text{longueur réelle} &= 24 \\times \\text{longueur du modèle} \\end{aligned} \\] Donc <b>la voiture réelle est 24 fois plus longue que la miniature</b>.",
      { mode: "scale-model-car" });
  },
  function () {
    return mcq("Une affiche est imprimée à partir d'un petit dessin avec un facteur d'échelle de 0,5. Que signifie un facteur d'échelle de 0,5 pour l'affiche ?",
      { t: "Chaque longueur sur l'affiche vaut la moitié de la longueur correspondante sur le dessin.", fb: "Exact. Un facteur d'échelle inférieur à 1 donne une réduction." },
      [
        { t: "Chaque longueur sur l'affiche mesure 0,5 cm de plus que sur le dessin original montré.", fb: "Un facteur d'échelle multiplie les longueurs ; il n'ajoute pas de centimètres." },
        { t: "Chaque longueur sur l'affiche vaut deux fois la longueur correspondante sur le dessin complet.", fb: "Deux fois serait un facteur d'échelle de 2, pas 0,5." },
        { t: "L'affiche a la moitié des côtés du dessin, avec les mêmes angles partout que l'original.", fb: "Une réduction garde la même forme ; seules les longueurs changent." }
      ],
      "La longueur de l'image est la longueur d'origine multipliée par le facteur d'échelle : \\[ \\begin{aligned} \\text{longueur de l'image} &= 0,5 \\times \\text{longueur d'origine} \\end{aligned} \\] Donc <b>chaque longueur sur l'affiche vaut la moitié de la longueur correspondante sur le dessin</b>.",
      { mode: "scale-poster" });
  },
  function () {
    return mcq("Le site Web d'une ville montre une carte avec l'échelle 1 : 50 000. Le premier nombre est la longueur sur la carte et le deuxième est la longueur réelle, dans les mêmes unités. Que signifie cette échelle ?",
      { t: "Une distance de 1 unité sur la carte représente 50 000 unités dans la vie réelle.", fb: "Exact. Les deux nombres utilisent la même unité, et la distance réelle est beaucoup plus grande." },
      [
        { t: "Une distance de 50 000 unités sur la carte représente 1 unité dans la vie réelle.", fb: "Cela échange les deux nombres de l'échelle." },
        { t: "La carte elle-même est 50 000 fois plus grande que toute la ville.", fb: "Une carte est une réduction, donc elle est beaucoup plus petite que la ville." },
        { t: "Chaque distance réelle dans la ville mesure exactement 50 000 cm.", fb: "L'échelle donne un rapport, pas une seule distance réelle fixe." }
      ],
      "Lis le rapport dans l'ordre, la carte en premier et la vie réelle en deuxième. Donc l'échelle signifie <b>une distance de 1 unité sur la carte représente 50 000 unités dans la vie réelle</b>.",
      { mode: "scale-web-map" });
  }
]), ["Dans une échelle, décide quel nombre appartient au dessin et lequel appartient à la vie réelle.", "Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine ; inférieur à 1 signifie plus petit, supérieur à 1 signifie plus grand."]);

// 2. 10.16 L2 gen num with figure, CR 3: redraw with a scale factor, find one image side.
E("u7-scale-draw-num", 7, ["10.16"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "d'une réduction" : "d'un agrandissement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmtD(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmtD(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Figure d'origine", 13, true);
    var q = numq("Le diagramme montre un rectangle. Il est redessiné sous forme " + word + " avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté de l'image qui correspond au côté de " + fmtD(side) + " cm ?",
      ans, 0.01,
      "Multiplie le côté d'origine par le facteur d'échelle : \\[ \\begin{aligned} \\text{côté de l'image} &= " + fmtD(side) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le côté correspondant de l'image mesure <b>" + fmtD(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle avec des côtés étiquetés");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmtD(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmtD(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Figure d'origine", 13, true);
  var q2 = numq("Le diagramme montre un triangle rectangle. Il est redessiné sous forme " + word + " avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté de l'image qui correspond au côté de " + fmtD(side2) + " cm ?",
    ans2, 0.01,
    "Multiplie le côté d'origine par le facteur d'échelle : \\[ \\begin{aligned} \\text{côté de l'image} &= " + fmtD(side2) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le côté correspondant de l'image mesure <b>" + fmtD(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Triangle rectangle avec des côtés étiquetés");
  return q2;
}, ["Le côté de l'image est le côté d'origine multiplié par le facteur d'échelle.", "Trouve le côté donné dans le diagramme, puis multiplie-le par le facteur d'échelle."]);

// 3. 10.17 L1 gen num: scale factor from a pair of corresponding lengths.
E("u7-scale-factor-num", 7, ["10.17"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["Un dessin d'un tournesol mesure ", " cm de haut. Le tournesol réel mesure ", " cm de haut."],
            ["Un bateau miniature mesure ", " cm de long. Le bateau réel mesure ", " cm de long."],
            ["Une photo imprimée mesure ", " cm de large. L'image à l'écran dont elle vient mesure ", " cm de large."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmtD(iLen) + c[1] + fmtD(oLen) + c[2] + " La première longueur est celle de l'image et la deuxième est celle d'origine. Quel est le facteur d'échelle du diagramme ? Donne le facteur d'échelle sous forme de nombre décimal ou de nombre entier.";
  var sol = "Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(iLen) + " \\div " + fmtD(oLen) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le facteur d'échelle est <b>" + fmtD(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmtD(iLen) + " cm" }, { name: "Figure d'origine", len: oLen, lab: fmtD(oLen) + " cm" }], "Longueurs de l'image et de la figure d'origine en barres");
    return q;
}, ["Le facteur d'échelle est la longueur de l'image divisée par la longueur d'origine.", "Mets la longueur de l'image en premier, puis divise par la longueur d'origine."]);

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
    body += u7T(30 + w * u / 2, 31, fmtD(w) + " cm", 12, false) + u7T(30 + w * u / 2, 45 + h * u + 18, "Figure d'origine", 12, true);
    body += u7T(30 + w * u + 15, 45 + h * u / 2, fmtD(h) + " cm", 12, false);
    body += u7T(195 + iw * u / 2, 31, fmtD(iw) + " cm", 12, false) + u7T(195 + iw * u / 2, 45 + ih * u + 18, "Deuxième", 12, true);
    body += u7T(195 + iw * u + 15, 45 + ih * u / 2, fmtD(ih) + " cm", 12, false);
    var fig = u7Svg(345, 195, body, "Un rectangle d'origine et un deuxième rectangle avec des côtés étiquetés");
    var prompt = "Le diagramme montre un rectangle d'origine et un deuxième rectangle. Quel énoncé au sujet du deuxième rectangle est vrai ?";
    var sol, q;
    if (prop) {
      sol = "Vérifie les deux rapports de côtés : \\[ \\begin{aligned} " + fmtD(iw) + " \\div " + fmtD(w) + " &= " + fmtD(k) + " \\\\ " + fmtD(ih) + " \\div " + fmtD(h) + " &= " + fmtD(k) + " \\end{aligned} \\] Les deux rapports sont égaux, donc le deuxième rectangle est <b>proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k) + "</b>.";
      q = mcq(prompt,
        { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k) + ".", fb: "Exact. Les deux rapports de côtés valent " + fmtD(k) + "." },
        [
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(Math.round(1 / k * 100) / 100) + ".", fb: "Cela divise l'original par l'image ; le facteur d'échelle est l'image divisée par l'original." },
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(k + 1) + ".", fb: "Vérifie un rapport : " + fmtD(iw) + " divisé par " + fmtD(w) + " ne donne pas " + fmtD(k + 1) + "." },
          { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Les rapports correspondent bien ici ; divise chaque côté de l'image par son côté d'origine correspondant." }
        ], sol, { mode: "prop-yes", w: w, h: h, k: k, iw: iw, ih: ih });
    } else {
      var r1 = Math.round(iw / w * 100) / 100, r2 = Math.round(ih / h * 100) / 100;
      sol = "Vérifie les deux rapports de côtés : \\[ \\begin{aligned} " + fmtD(iw) + " \\div " + fmtD(w) + " &= " + fmtD(r1) + " \\\\ " + fmtD(ih) + " \\div " + fmtD(h) + " &= " + fmtD(r2) + " \\end{aligned} \\] Les rapports diffèrent, donc le deuxième rectangle n'est <b>pas proportionnel, car les rapports de côtés ne correspondent pas</b>.";
      q = mcq(prompt,
        { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Exact. Les deux rapports sont " + fmtD(r1) + " et " + fmtD(r2) + ", qui diffèrent." },
        [
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(r1) + ", calculé à partir d'un seul côté.", fb: "Cela utilise seulement la première paire de côtés ; la deuxième paire donne un rapport différent." },
          { t: "Il est proportionnel à l'original, avec un facteur d'échelle de " + fmtD(r2) + ", calculé à partir d'un seul côté.", fb: "Cela utilise seulement la deuxième paire de côtés ; la première paire donne un rapport différent." },
          { t: "Il n'est pas proportionnel, car les angles correspondants sont différents.", fb: "Les deux figures sont des rectangles, donc tous les angles mesurent 90 degrés ; le problème vient des rapports de côtés." }
        ], sol, { mode: "prop-no", w: w, h: h, k: k, iw: iw, ih: ih });
    }
    q.figure = fig;
    return q;
  }
  var qf = mcq("Le diagramme montre un rectangle d'origine et un deuxième rectangle. Quel énoncé au sujet du deuxième rectangle est vrai ?",
    { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 2.", fb: "Exact. Les deux rapports de côtés valent 2." },
    [
      { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 0,5.", fb: "Cela divise l'original par l'image." },
      { t: "Il est proportionnel à l'original, avec un facteur d'échelle de 3.", fb: "Vérifie un rapport : 8 divisé par 4 ne donne pas 3." },
      { t: "Il n'est pas proportionnel, car les rapports de côtés ne correspondent pas.", fb: "Les rapports correspondent bien ici." }
    ], "Les deux rapports valent 2, donc le deuxième rectangle est <b>proportionnel à l'original, avec un facteur d'échelle de 2</b>.", { mode: "prop-yes", w: 4, h: 3, k: 2, iw: 8, ih: 6 });
  qf.figure = u7Svg(345, 195, u7Poly([[30, 45], [86, 45], [86, 87], [30, 87]], FIG_SHADE) + u7Poly([[195, 45], [307, 45], [307, 129], [195, 129]], "#ffffff") + u7T(58, 31, "4 cm", 12, false) + u7T(251, 31, "8 cm", 12, false) + u7T(101, 66, "3 cm", 12, false) + u7T(322, 87, "6 cm", 12, false) + u7T(58, 105, "Figure d'origine", 12, true) + u7T(251, 147, "Deuxième", 12, true), "Un rectangle d'origine et un deuxième rectangle avec des côtés étiquetés");
  return qf;
}, ["Un diagramme est proportionnel quand chaque côté de l'image, divisé par son côté d'origine correspondant, donne le même rapport.", "Divise la première paire de côtés, puis divise la deuxième paire, et compare les deux rapports."]);

// 5. 10.7 L2 gen MC with figure: similar or not, with the correct reason.
/*
 * TRANSLATOR NOTES
 * Chunk: Unit 7 (Similarity and Transformations), second part, chunkG2-u7b.
 * Entries translated: 17 (all prompts, options, per-answer feedback, worked
 * solutions, hint1 and hint2).
 * Judgement calls (glossary silent): "congruent" = congruents; "line symmetry"
 * (the property) = symétrie linéaire; "mirror image" = image miroir; "kite"
 * (shape) = cerf-volant; "honeycomb" = nid d'abeilles; "checkerboard" = damier;
 * "pinwheel" = moulinet; "bunting strip" = banderole de fanions; "quilt" =
 * courtepointe; "shed" = remise; "flagpole" = mât; "handedness" is rendered
 * as orientation (B garde la même orientation que A). The letter labels in
 * the u7-translation-rule rule codes use French initials D/G/H/B (droite,
 * gauche, haut, bas), including the fallback "D2, H3". The \text{...} labels
 * inside KaTeX are translated (facteur d'échelle, nouveau côté, etc.); the
 * KaTeX commands are unchanged. Aria labels and the visible figure labels
 * "Shape"/"Image" (Forme/Image) are translated.
 * FMT-GEOM lines left as fmt( : exactly one line, in u7-lines-symmetry, the
 * semicircle path data: var d = "M " + fmt(115 - r, 1) + " 125 A " ... +
 * fmt(115 + r, 1) + " 125 Z"; it carries an FMT-GEOM marker on that line.
 * Every other fmt( became fmtD(, including the visible figure side labels
 * fed to u7TriLabels in u7-similar-verdict. No fmtF( and no .toFixed occur
 * in this chunk, so there are no fmtDF( conversions.
 * Literal formatted numbers in static prose (for later reconciliation
 * against the curriculum guides): there are NO literal decimals, NO
 * thousands groupings, NO percent amounts and NO dollar amounts in static
 * prose in this chunk. The static numeric literals are plain integers and
 * degree measures copied unchanged from the English (360°, 90°, 180°,
 * order numbers, integer side lists and integer coordinates in the
 * fallback entries). All generated numbers route through fmtD(.
 * Unsure: "Pair" is rendered "Paire"; coordinate couples keep the comma
 * separator produced by u7Coord (code, unchanged), and side-length lists
 * keep comma separators, as in the English.
 */

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
    body += u7TriLabels(P1, ["A", "B", "C"], angs, tr.map(function (s) { return fmtD(s); }));
    body += u7TriLabels(P2, ["D", "E", "F"], angs2, img2.map(function (s) { return fmtD(s); }));
    var fig = u7Svg(345, 185, body, "Deux triangles avec des étiquettes de côtés et d'angles");
    var prompt = "Utilise les étiquettes du diagramme. Lequel des énoncés sur les triangles ABC et DEF est exact ?";
    var simT = "Ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels.";
    var angT = "Ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux.";
    var sideT = "Ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels.";
    var congT = "Ils sont congruents, car ils ont les mêmes angles.";
    var sol, q;
    if (mode === "similar") {
      sol = "Les angles correspondent et les rapports de côtés sont égaux : \\[ \\begin{aligned} " + fmtD(img[0]) + " \\div " + fmtD(tr[0]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img[1]) + " \\div " + fmtD(tr[1]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img[2]) + " \\div " + fmtD(tr[2]) + " &= " + fmtD(k) + " \\end{aligned} \\] Donc <b>ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels</b>.";
      q = mcq(prompt, { t: simT, fb: "Exact. Des angles égaux et un même rapport de côtés montrent la similarité." },
        [{ t: angT, fb: "Les étiquettes des angles correspondent ici; compare-les sommet par sommet." }, { t: sideT, fb: "Les rapports de côtés correspondent ici; chacun égale " + fmtD(k) + "." }, { t: congT, fb: "Les mêmes angles seuls ne rendent pas des triangles congruents; les côtés sont ici à l'échelle, pas égaux." }],
        sol, { mode: "verdict-similar", tr: tr.join(","), k: k });
    } else if (mode === "angles") {
      sol = "Compare les angles : le triangle ABC a un angle de " + angs[0] + " degrés là où le triangle DEF a " + angs2[0] + " degrés. Des polygones semblables exigent que tous les angles correspondants soient égaux, donc <b>ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux</b>.";
      q = mcq(prompt, { t: angT, fb: "Exact. Une paire d'angles correspondants diffère, donc les triangles ne peuvent pas être semblables." },
        [{ t: simT, fb: "Vérifie encore les étiquettes des angles; une paire d'angles correspondants diffère." }, { t: sideT, fb: "Les côtés sont proportionnels ici; le problème vient des angles." }, { t: congT, fb: "Les angles ne sont pas tous les mêmes, et les côtés sont à l'échelle, pas égaux." }],
        sol, { mode: "verdict-angles", tr: tr.join(","), k: k });
    } else {
      sol = "Les angles correspondent, mais pas les rapports de côtés : \\[ \\begin{aligned} " + fmtD(img2[0]) + " \\div " + fmtD(tr[0]) + " &= " + fmtD(k) + " \\\\ " + fmtD(img2[2]) + " \\div " + fmtD(tr[2]) + " &= " + fmtD(Math.round(img2[2] / tr[2] * 100) / 100) + " \\end{aligned} \\] Les rapports diffèrent, donc <b>ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels</b>.";
      q = mcq(prompt, { t: sideT, fb: "Exact. Les angles correspondent, mais un rapport de côtés diffère des autres." },
        [{ t: simT, fb: "Vérifie chaque rapport de côtés; l'un d'eux diffère des autres." }, { t: angT, fb: "Les étiquettes des angles correspondent ici; compare-les sommet par sommet." }, { t: congT, fb: "Les mêmes angles seuls ne rendent pas des triangles congruents; les côtés sont ici à l'échelle, pas égaux." }],
        sol, { mode: "verdict-sides", tr: tr.join(","), k: k });
    }
    q.figure = fig;
    return q;
  }
  return mcq("Utilise les étiquettes du diagramme. Lequel des énoncés sur les deux triangles est exact ?",
    { t: "Ils sont semblables, car les angles correspondants sont égaux et les côtés correspondants sont proportionnels.", fb: "Exact." },
    [{ t: "Ils ne sont pas semblables, car les angles correspondants ne sont pas tous égaux.", fb: "Les étiquettes des angles correspondent ici." }, { t: "Ils ne sont pas semblables, car les côtés correspondants ne sont pas proportionnels.", fb: "Les rapports de côtés correspondent ici." }, { t: "Ils sont congruents, car ils ont les mêmes angles.", fb: "Les mêmes angles seuls ne montrent pas la congruence." }],
    "Les angles correspondent et chaque rapport de côtés est 2, donc <b>ils sont semblables</b>.", { mode: "verdict-similar", tr: "3,4,5", k: 2 });
}, ["Des polygones semblables exigent deux vérifications : des angles correspondants égaux et des côtés correspondants proportionnels.", "Compare d'abord les étiquettes des angles, puis divise chaque côté de la figure image par son côté correspondant dans la figure d'origine."]);

// 6. 10.7 L3 gen MC: three pairs in text, choose the pair that is similar.
E("u7-similar-pair", 7, ["10.7"], 3, "gen", function () {
  var triBases = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [5, 5, 6], [8, 15, 17]];
  var quadBases = [[2, 3, 4, 5], [3, 4, 5, 6], [2, 4, 5, 7], [4, 5, 6, 8]];
  function sortedStr(arr) { return arr.slice().sort(function (x, y) { return x - y; }).map(function (v) { return fmtD(v); }).join(", "); }
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
    var texts = pairs.map(function (pr, i) { return "Paire " + (i + 1) + " : " + sortedStr(pr.a) + " cm et " + sortedStr(pr.b) + " cm"; });
    if (new Set(texts).size < 3) continue;
    var gi = pairs.findIndex(function (pr) { return pr.good; });
    var opts = texts.map(function (t, i) {
      return { t: t, fb: i === gi ? "Exact. En triant chaque liste et en divisant, on obtient un même rapport de " + fmtD(k) + "." : "Trie les deux listes et divise les côtés correspondants; les rapports de cette paire ne sont pas tous égaux." };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    rest.push({ t: "Aucune des trois paires n'est semblable.", fb: "Une paire a bien un même rapport pour chaque côté; vérifie encore la paire " + (gi + 1) + "." });
    var sb = base.slice().sort(function (x, y) { return x - y; }), si = simImg.slice().sort(function (x, y) { return x - y; });
    var chain = sb.map(function (s, i) { return fmtD(si[i]) + " \\div " + fmtD(s) + " &= " + fmtD(k); }).join(" \\\\ ");
    var sol = "Pour la paire semblable, trie les côtés de chaque liste, puis divise les côtés correspondants : \\[ \\begin{aligned} " + chain + " \\end{aligned} \\] Tous les rapports sont égaux, donc <b>la paire " + (gi + 1) + " est la paire semblable</b>. Dans chaque autre paire, un rapport ne suit pas les autres.";
    var q = mcq("Trois paires de polygones sont données par les longueurs de leurs côtés. Une seule paire est semblable. Quelle paire est-ce ?",
      corr, rest, sol, { mode: "similar-pair", base: base.join(","), k: k, good: gi });
    var figB = "";
    pairs.forEach(function (pr, i) {
      var by = 10 + i * 60;
      figB += solT(16, by + 25, "Paire " + (i + 1), 11, true);
      var P1 = pr.a.length === 3 ? u7FitTri(pr.a, 34, by, 105, 50) : solQuadPts(pr.a, 34, by, 105, 50);
      var P2 = pr.b.length === 3 ? u7FitTri(pr.b, 196, by, 105, 50) : solQuadPts(pr.b, 196, by, 105, 50);
      if (P1) { figB += u7Poly(P1, FIG_SHADE); figB += pr.a.length === 3 ? solSideLabels(P1, [fmtD(pr.a[2]), fmtD(pr.a[0]), fmtD(pr.a[1])]) : solSideLabels(P1, pr.a.map(function (v) { return fmtD(v); })); }
      if (P2) { figB += u7Poly(P2, "#ffffff"); figB += pr.b.length === 3 ? solSideLabels(P2, [fmtD(pr.b[2]), fmtD(pr.b[0]), fmtD(pr.b[1])]) : solSideLabels(P2, pr.b.map(function (v) { return fmtD(v); })); }
    });
    q.figure = u7Svg(345, 195, figB, "Trois paires de polygones avec des étiquettes de côtés");
    return q;
  }
  return mcq("Trois paires de polygones sont données par les longueurs de leurs côtés. Une seule paire est semblable. Quelle paire est-ce ?",
    { t: "Paire 1 : 3, 4, 5 cm et 6, 8, 10 cm", fb: "Exact. Tous les rapports valent 2." },
    [{ t: "Paire 2 : 3, 4, 5 cm et 6, 8, 11 cm", fb: "Les rapports ne sont pas tous égaux dans cette paire." }, { t: "Paire 3 : 5, 5, 6 cm et 10, 10, 13 cm", fb: "Les rapports ne sont pas tous égaux dans cette paire." }, { t: "Aucune des trois paires n'est semblable.", fb: "La paire 1 a un même rapport pour chaque côté." }],
    "En triant et en divisant la paire 1, on obtient le rapport 2 pour chaque côté, donc <b>la paire 1 est la paire semblable</b>.", { mode: "similar-pair", base: "3,4,5", k: 2, good: 0 });
}, ["Trie les côtés de chaque liste du plus petit au plus grand avant de les comparer.", "Divise chaque côté de la deuxième liste par le côté correspondant de la première liste; les paires semblables donnent un même rapport."]);

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
  var shapeWord = isTri ? "triangle" : "quadrilatère";
  var prompt = "Un " + shapeWord + " a des côtés de " + sides.map(function (s) { return fmtD(s); }).join(", ") + " cm. On trace un " + shapeWord + " semblable avec un facteur d'échelle de " + fmtD(k) + ". Quelle est la longueur, en centimètres, du côté du nouveau " + shapeWord + " qui correspond au côté de " + fmtD(side) + " cm ?";
  var sol = "Les côtés correspondants de polygones semblables suivent le facteur d'échelle : \\[ \\begin{aligned} \\text{nouveau côté} &= " + fmtD(side) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le côté correspondant mesure <b>" + fmtD(ans) + " cm</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "draw-similar", sides: sides.join(","), k: k, side: side });
  var figB2 = "";
  if (isTri) {
    var PT = u7FitTri(sides, 95, 22, 160, 125);
    figB2 = u7Poly(PT, FIG_SHADE) + solSideLabels(PT, [fmtD(sides[2]) + " cm", fmtD(sides[0]) + " cm", fmtD(sides[1]) + " cm"]);
  } else {
    var PQ = solQuadPts(sides, 95, 22, 160, 125);
    if (PQ) figB2 = u7Poly(PQ, FIG_SHADE) + solSideLabels(PQ, sides.map(function (v) { return fmtD(v) + " cm"; }));
  }
  if (figB2) q.figure = u7Svg(345, 170, figB2, "Polygone avec des côtés étiquetés");
  return q;
}, ["Un dessin semblable multiplie chaque côté par le même facteur d'échelle.", "Prends le côté nommé et multiplie-le par le facteur d'échelle."]);

// 8. 10.15 L2 gen num, CR 3: similar figures in context.
E("u7-similar-context-num", 7, ["10.15"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var w = pick([8, 10, 12, 15, 20]), k = pick([1.5, 2, 2.5, 3]);
    var h = pick([6, 8, 9, 10, 12, 16]);
    var W = Math.round(w * k * 10) / 10, ans = Math.round(h * k * 100) / 100;
    var prompt = "Une photo mesure " + fmtD(w) + " cm de largeur et " + fmtD(h) + " cm de hauteur. On l'agrandit pour que l'épreuve mesure " + fmtD(W) + " cm de largeur, en gardant la même forme. Quelle est la hauteur de l'épreuve, en centimètres ?";
    var sol = "Le facteur d'échelle de l'agrandissement vient des largeurs : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(W) + " \\div " + fmtD(w) + " = " + fmtD(k) + " \\\\ \\text{hauteur de l'épreuve} &= " + fmtD(h) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc l'épreuve mesure <b>" + fmtD(ans) + " cm</b> de hauteur.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "photo-enlarge", w: w, h: h, k: k });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmtD(w) + " cm", hLab1: fmtD(h) + " cm", cap1: "Photo", w2: W, h2: h * k, wLab2: fmtD(W) + " cm", hLab2: "?", cap2: "Épreuve", aria: "Une photo et son agrandissement avec des côtés étiquetés" });
    return q;
  }
  if (mode === 1) {
    var real = pick([40, 50, 60, 80, 100]), mod = pick([8, 10, 12, 16, 20]);
    var k2 = mod / real;
    var part = pick([10, 15, 20, 25, 30]);
    var ans2 = Math.round(part * k2 * 100) / 100;
    if (Math.abs(ans2 - Math.round(ans2 * 10) / 10) > 0.001) { part = 20; ans2 = Math.round(part * k2 * 100) / 100; }
    var prompt2 = "Une remise réelle mesure " + fmtD(real) + " m de longueur, et un modèle réduit de cette remise mesure " + fmtD(mod) + " cm de longueur. Une porte de la remise réelle mesure " + fmtD(part) + " m de largeur, mesurée dans le même sens que les longueurs. Quelle est la largeur de la porte sur le modèle, en centimètres ?";
    var sol2 = "Le facteur d'échelle du modèle est la longueur du modèle divisée par la longueur réelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(mod) + " \\div " + fmtD(real) + " = " + fmtD(k2) + " \\\\ \\text{porte du modèle} &= " + fmtD(part) + " \\times " + fmtD(k2) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc la porte du modèle mesure <b>" + fmtD(ans2) + " cm</b> de largeur.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "model-door", real: real, mod: mod, part: part });
    var figB = "";
    figB += solPoly([[45, 36], [245, 36], [245, 78], [45, 78]], "#ffffff");
    figB += solPoly([[45, 36], [45 + 200 * part / real, 36], [45 + 200 * part / real, 78], [45, 78]], FIG_SHADE);
    figB += solT(145, 92, fmtD(real) + " m", 12, false);
    figB += solT(45 + 100 * part / real, 26, fmtD(part) + " m", 11, false);
    figB += solPoly([[85, 116], [205, 116], [205, 146], [85, 146]], "#ffffff");
    figB += solPoly([[85, 116], [85 + 120 * part / real, 116], [85 + 120 * part / real, 146], [85, 146]], FIG_SHADE);
    figB += solT(145, 160, fmtD(mod) + " cm", 12, false);
    figB += solT(85 + 60 * part / real, 108, "?", 12, false);
    q.figure = solSvg(340, 172, figB, "Un abri et son modèle réduit avec la porte ombrée");
    return q;
  }
  var hp = pick([1.5, 1.6, 1.8]), mult = pick([2, 3, 4, 5]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var sPole = Math.round(sp * mult * 10) / 10, ans3 = Math.round(hp * mult * 100) / 100;
  var prompt3 = "Une personne de " + fmtD(hp) + " m projette une ombre de " + fmtD(sp) + " m. Au même moment, un mât projette une ombre de " + fmtD(sPole) + " m. Le mât et son ombre forment un triangle semblable au triangle de la personne et de son ombre. Quelle est la hauteur du mât, en mètres ?";
  var sol3 = "L'ombre est " + fmtD(mult) + " fois plus longue, donc le mât est le même nombre de fois plus haut : \\[ \\begin{aligned} " + fmtD(sPole) + " \\div " + fmtD(sp) + " &= " + fmtD(mult) + " \\\\ \\text{hauteur du mât} &= " + fmtD(hp) + " \\times " + fmtD(mult) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc le mât mesure <b>" + fmtD(ans3) + " m</b> de hauteur.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "shadow-pole", hp: hp, sp: sp, mult: mult });
    q.figure = solShadowFig([{ name: "Personne", h: hp, s: sp, hLab: fmtD(hp) + " m", sLab: fmtD(sp) + " m" }, { name: "Mât de drapeau", h: ans3, s: sPole, hLab: "?", sLab: fmtD(sPole) + " m" }], "Une personne et un mât de drapeau avec leurs ombres");
    return q;
}, ["Trouve le facteur d'échelle à partir de la paire de longueurs que tu connais, puis utilise-le sur la longueur correspondante.", "Divise d'abord la longueur image connue par sa longueur d'origine correspondante."]);

// 9. 10.15 L3 gen num, CR 3: two-step similar-figures problems.
E("u7-similar-two-step-num", 7, ["10.15"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var so = pick([4, 5, 6, 8, 10]), k = pick([1.5, 2, 2.5, 3]);
    var si = Math.round(so * k * 10) / 10;
    var P = pick([24, 30, 36, 40, 44, 48, 52, 60]);
    var ans = Math.round(P * k * 100) / 100;
    var prompt = "Deux rectangles sont semblables. Dans le plus petit rectangle, un côté mesure " + fmtD(so) + " cm et le périmètre est de " + fmtD(P) + " cm. Le côté correspondant dans le plus grand rectangle mesure " + fmtD(si) + " cm. Quel est le périmètre du plus grand rectangle, en centimètres ?";
    var sol = "Trouve d'abord le facteur d'échelle à partir des côtés correspondants, puis applique-le au périmètre : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(si) + " \\div " + fmtD(so) + " = " + fmtD(k) + " \\\\ \\text{grand périmètre} &= " + fmtD(P) + " \\times " + fmtD(k) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc le périmètre du plus grand rectangle est <b>" + fmtD(ans) + " cm</b>.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "perimeter-scale", so: so, si: si, P: P });
    q.figure = solRectPair({ w1: so, h1: P / 2 - so, wLab1: fmtD(so) + " cm", hLab1: fmtD(P / 2 - so) + " cm", cap1: "Plus petit", w2: si, h2: (P / 2 - so) * k, wLab2: fmtD(si) + " cm", hLab2: fmtD((P / 2 - so) * k) + " cm", cap2: "Plus grand", aria: "Deux rectangles semblables avec des côtés étiquetés" });
    return q;
  }
  if (mode === 1) {
    var w = pick([4, 5, 6, 8]), h = pick([3, 4, 5, 6, 7]);
    var k2 = pick([1.5, 2, 2.5, 3]);
    var W = Math.round(w * k2 * 10) / 10, H = Math.round(h * k2 * 10) / 10;
    var ans2 = Math.round(2 * (W + H) * 100) / 100;
    var prompt2 = "Un rectangle mesure " + fmtD(w) + " cm sur " + fmtD(h) + " cm. Un rectangle semblable a une largeur de " + fmtD(W) + " cm. Quel est le périmètre du rectangle semblable, en centimètres ?";
    var sol2 = "Trouve le facteur d'échelle, puis la nouvelle hauteur, puis le périmètre : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(W) + " \\div " + fmtD(w) + " = " + fmtD(k2) + " \\\\ \\text{nouvelle hauteur} &= " + fmtD(h) + " \\times " + fmtD(k2) + " = " + fmtD(H) + " \\\\ \\text{périmètre} &= 2 \\times (" + fmtD(W) + " + " + fmtD(H) + ") \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le périmètre est <b>" + fmtD(ans2) + " cm</b>.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "rect-perimeter", w: w, h: h, k: k2 });
    q.figure = solRectPair({ w1: w, h1: h, wLab1: fmtD(w) + " cm", hLab1: fmtD(h) + " cm", cap1: "Figure d'origine", w2: W, h2: H, wLab2: fmtD(W) + " cm", hLab2: "?", cap2: "Semblable", aria: "Un rectangle et un rectangle semblable avec des côtés étiquetés" });
    return q;
  }
  var sA = pick([3, 4, 5, 6]), kA = pick([2, 3]), kB = pick([1.5, 2, 2.5]);
  var sB = sA * kA, ans3 = Math.round(sB * kB * 100) / 100;
  var prompt3 = "Les figures A, B et C sont toutes semblables. Un côté de la figure A mesure " + fmtD(sA) + " cm, et le côté correspondant de la figure B mesure " + fmtD(sB) + " cm. La figure C est tracée à partir de la figure B avec un facteur d'échelle de " + fmtD(kB) + ". Quelle est la longueur, en centimètres, du côté de la figure C qui correspond au côté de " + fmtD(sA) + " cm de la figure A ?";
  var sol3 = "Passe d'abord par la figure B, puis applique le deuxième facteur d'échelle : \\[ \\begin{aligned} \\text{côté dans B} &= " + fmtD(sB) + " \\\\ \\text{côté dans C} &= " + fmtD(sB) + " \\times " + fmtD(kB) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc le côté correspondant de la figure C mesure <b>" + fmtD(ans3) + " cm</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "chain-scale", sA: sA, sB: sB, kB: kB });
    q.figure = solBarsFig([{ name: "Figure A", len: sA, lab: fmtD(sA) + " cm" }, { name: "Figure B", len: sB, lab: fmtD(sB) + " cm" }, { name: "Figure C", len: ans3, lab: "?" }], "Côtés correspondants de trois figures semblables en barres");
    return q;
}, ["Divise le problème en étapes : trouve d'abord un facteur d'échelle, puis utilise-le.", "Utilise la paire de longueurs correspondantes qu'on te donne pour obtenir le facteur d'échelle avant de chercher autre chose."]);

// 10. 10.19 L3 gen num, CR 2: indirect measurement with similar triangles.
E("u7-indirect-measure-num", 7, ["10.19"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var hs = pick([1, 1.2, 1.5]), ss = pick([0.8, 1, 1.2, 1.5]);
    var mult = pick([6, 8, 10, 12, 15]);
    var sTree = Math.round(ss * mult * 10) / 10, ans = Math.round(hs * mult * 100) / 100;
    var prompt = "Un bâton de " + fmtD(hs) + " m projette une ombre de " + fmtD(ss) + " m. Au même moment, un arbre projette une ombre de " + fmtD(sTree) + " m. Les triangles de l'arbre et du bâton sont semblables. Quelle est la hauteur de l'arbre, en mètres ?";
    var sol = "L'ombre de l'arbre est un multiple de l'ombre du bâton : \\[ \\begin{aligned} " + fmtD(sTree) + " \\div " + fmtD(ss) + " &= " + fmtD(mult) + " \\\\ \\text{hauteur de l'arbre} &= " + fmtD(hs) + " \\times " + fmtD(mult) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc l'arbre mesure <b>" + fmtD(ans) + " m</b> de hauteur.";
    var q = numq(prompt, ans, 0.01, sol, { mode: "tree-shadow", hs: hs, ss: ss, mult: mult });
    q.figure = solShadowFig([{ name: "Bâton", h: hs, s: ss, hLab: fmtD(hs) + " m", sLab: fmtD(ss) + " m" }, { name: "Arbre", h: ans, s: sTree, hLab: "?", sLab: fmtD(sTree) + " m" }], "Un bâton et un arbre avec leurs ombres");
    return q;
  }
  if (mode === 1) {
    var hp = pick([1.5, 1.6, 1.8]), sp = pick([2, 2.4, 3]);
    var mult2 = pick([8, 10, 12, 15, 20]);
    var sB = Math.round(sp * mult2 * 10) / 10, ans2 = Math.round(hp * mult2 * 100) / 100;
    var prompt2 = "Pour mesurer un bâtiment, une élève de " + fmtD(hp) + " m se place de façon que son ombre mesure " + fmtD(sp) + " m. L'ombre du bâtiment au même moment mesure " + fmtD(sB) + " m. À l'aide de triangles semblables, quelle est la hauteur du bâtiment, en mètres ?";
    var sol2 = "Compare d'abord les ombres, puis multiplie la hauteur par le même facteur : \\[ \\begin{aligned} " + fmtD(sB) + " \\div " + fmtD(sp) + " &= " + fmtD(mult2) + " \\\\ \\text{hauteur du bâtiment} &= " + fmtD(hp) + " \\times " + fmtD(mult2) + " \\\\ &= " + fmtD(ans2) + " \\end{aligned} \\] Donc le bâtiment mesure <b>" + fmtD(ans2) + " m</b> de hauteur.";
    var q = numq(prompt2, ans2, 0.01, sol2, { mode: "building-shadow", hp: hp, sp: sp, mult: mult2 });
    q.figure = solShadowFig([{ name: "Élève", h: hp, s: sp, hLab: fmtD(hp) + " m", sLab: fmtD(sp) + " m" }, { name: "Bâtiment", h: ans2, s: sB, hLab: "?", sLab: fmtD(sB) + " m" }], "Un élève et un bâtiment avec leurs ombres");
    return q;
  }
  var d = pick([3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]), per = pick([6, 8, 10, 12, 15, 20]);
  var ans3 = Math.round(d * per * 100) / 100;
  var prompt3 = "Sur un diagramme à l'échelle d'un étang, la distance à travers l'étang mesure " + fmtD(d) + " cm. L'échelle du diagramme est : 1 cm représente " + fmtD(per) + " m. Quelle est la distance réelle à travers l'étang, en mètres ?";
  var sol3 = "Multiplie la distance du diagramme par la longueur réelle que représente chaque centimètre : \\[ \\begin{aligned} \\text{distance réelle} &= " + fmtD(d) + " \\times " + fmtD(per) + " \\\\ &= " + fmtD(ans3) + " \\end{aligned} \\] Donc la distance réelle à travers l'étang est <b>" + fmtD(ans3) + " m</b>.";
  var q = numq(prompt3, ans3, 0.01, sol3, { mode: "pond-scale", d: d, per: per });
    var figB = '<ellipse cx="170" cy="98" rx="118" ry="52" fill="#ffffff" stroke="' + FIG_INK + '" stroke-width="2"/>';
    figB += solLine([52, 98], [288, 98], true, 1.6);
    figB += solT(170, 72, fmtD(d) + " cm", 12, false);
    q.figure = solSvg(340, 175, figB, "Schéma d'un étang avec la distance à travers marquée");
    return q;
}, ["Établis le rapport correspondant à partir de l'objet que tu peux mesurer, puis applique-le à l'objet que tu ne peux pas mesurer.", "Divise les deux longueurs d'ombre (ou utilise l'échelle du diagramme) pour obtenir d'abord le facteur."]);

// 11. 10.1 L1 gen MC with figure: lines of symmetry of a drawn shape.
E("u7-lines-symmetry", 7, ["10.1"], 1, "gen", function () {
  function figFor(kind) {
    if (kind === "rect") { var w = ri(90, 140), h = ri(45, 68); return { n: 2, svg: u7Svg(230, 190, u7Poly([[115 - w / 2, 95 - h / 2], [115 + w / 2, 95 - h / 2], [115 + w / 2, 95 + h / 2], [115 - w / 2, 95 + h / 2]], FIG_SHADE), "Forme : rectangle") }; }
    if (kind === "iso") { var b = ri(95, 130), ht = ri(70, 105); return { n: 1, svg: u7Svg(230, 190, u7Poly([[115 - b / 2, 155], [115 + b / 2, 155], [115, 155 - ht]], FIG_SHADE), "Forme : triangle isocèle") }; }
    if (kind === "scal") { var b2 = ri(105, 135), off = ri(12, 30); return { n: 0, svg: u7Svg(230, 190, u7Poly([[115 - b2 / 2, 155], [115 + b2 / 2, 155], [115 - b2 / 2 + off, 50]], FIG_SHADE), "Forme : triangle scalène") }; }
    if (kind === "kite") { var tw = ri(28, 40), bw = ri(46, 60), th = ri(34, 48), bh = ri(62, 82); return { n: 1, svg: u7Svg(230, 200, u7Poly([[115, 15], [115 + tw, 15 + th], [115, 15 + th + bh], [115 - tw, 15 + th]], FIG_SHADE), "Forme : cerf-volant") }; }
    if (kind === "arrow") { var t = ri(26, 36); return { n: 1, svg: u7Svg(230, 190, u7Poly([[25, 95 - t / 2], [125, 95 - t / 2], [125, 62], [200, 95], [125, 128], [125, 95 + t / 2], [25, 95 + t / 2]], FIG_SHADE), "Forme : flèche") }; }
    if (kind === "semi") { var r = ri(55, 80); var d = "M " + fmt(115 - r, 1) + " 125 A " + r + " " + r + " 0 0 1 " + fmt(115 + r, 1) + " 125 Z"; /* FMT-GEOM */ return { n: 1, svg: u7Svg(230, 190, '<path d="' + d + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>', "Forme : demi-cercle") }; }
    if (kind === "tee") { var w3 = ri(112, 140), bh3 = ri(28, 38), sw = ri(34, 44), tot = ri(112, 132); var x0 = 115 - w3 / 2, sx = 115 - sw / 2; return { n: 1, svg: u7Svg(230, 200, u7Poly([[x0, 30], [x0 + w3, 30], [x0 + w3, 30 + bh3], [sx + sw, 30 + bh3], [sx + sw, 30 + tot], [sx, 30 + tot], [sx, 30 + bh3], [x0, 30 + bh3]], FIG_SHADE), "Forme : bloc en forme de lettre T") }; }
    var w4 = ri(80, 100), h4 = ri(112, 132), th4 = ri(30, 40), fh = ri(30, 40);
    return { n: 0, svg: u7Svg(230, 200, u7Poly([[35, 30], [35 + th4, 30], [35 + th4, 30 + h4 - fh], [35 + w4, 30 + h4 - fh], [35 + w4, 30 + h4], [35, 30 + h4]], FIG_SHADE), "Forme : bloc en forme de lettre L") };
  }
  var kind = pick(["rect", "iso", "scal", "kite", "arrow", "semi", "tee", "ell"]);
  var f = figFor(kind), n = f.n;
  var candNums = [n + 1, n + 2, n - 1, n + 3, n - 2].filter(function (v) { return v >= 0 && v !== n; });
  var ds = [];
  for (var i = 0; i < candNums.length && ds.length < 3; i++) {
    var v = candNums[i];
    ds.push({ t: fmtD(v), fb: v > n ? "Cela compte des axes de pliage que la forme n'a pas; essaie chaque pliage dans ta tête." : "Cela oublie un axe de pliage; vérifie les pliages par le milieu dans les deux sens." });
  }
  var q = mcq("Combien d'axes de symétrie la forme du diagramme a-t-elle ? Un axe de symétrie est un axe de pliage qui fait correspondre exactement les deux moitiés.",
    { t: fmtD(n), fb: "Exact. La forme se plie exactement sur elle-même le long de " + (n === 0 ? "aucun axe" : n === 1 ? "1 axe" : fmtD(n) + " axes") + "." },
    ds,
    "Plie la forme dans ta tête dans chaque sens où elle pourrait se plier. Seuls les pliages où les moitiés correspondent exactement comptent, et cette forme a <b>" + fmtD(n) + "</b> axe" + (n === 1 ? "" : "s") + " de symétrie.",
    { mode: "lines-sym", kind: kind, n: n });
  q.figure = f.svg;
  return q;
}, ["Essaie de plier la forme dans ta tête : pliages vertical, horizontal et oblique.", "Un pliage compte seulement quand les deux moitiés correspondent exactement, bord à bord."]);

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
      aria: "La moitié d'une forme sur une grille avec un axe de symétrie en tirets" });
    var prompt = "Le diagramme montre la moitié d'une forme sur une grille, avec un axe de symétrie en tirets. Le sommet P est à " + u7Coord(P) + ". Quel point est l'image miroir de P qui complète la forme ?";
    var sol = vert
      ? "P est à " + fmtD(d) + " unités à gauche de la droite \\(x = " + fmtD(m) + "\\), donc son image miroir est à " + fmtD(d) + " unités à droite, à la même hauteur : \\[ \\begin{aligned} x' &= " + fmtD(m) + " + " + fmtD(d) + " = " + fmtD(Pp[0]) + " \\\\ y' &= " + fmtD(P[1]) + " \\end{aligned} \\] Donc l'image miroir de P est <b>" + u7Coord(Pp) + "</b>."
      : "P est à " + fmtD(d) + " unités sous la droite \\(y = " + fmtD(m) + "\\), donc son image miroir est à " + fmtD(d) + " unités au-dessus, dans la même colonne : \\[ \\begin{aligned} y' &= " + fmtD(m) + " + " + fmtD(d) + " = " + fmtD(Pp[1]) + " \\\\ x' &= " + fmtD(P[0]) + " \\end{aligned} \\] Donc l'image miroir de P est <b>" + u7Coord(Pp) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(Pp), fb: "Exact. Le point est à la même distance de l'autre côté de la droite en tirets." },
      [
        { t: u7Coord(cand[1]), fb: "C'est P lui-même; l'image miroir doit être de l'autre côté de la droite." },
        { t: u7Coord(cand[2]), fb: "La distance à la droite est bonne, mais le point est déplacé d'une unité le long de la droite." },
        { t: u7Coord(cand[3]), fb: vert ? "Cela déplace P latéralement à travers la droite, mais pas de la bonne distance." : "Cela déplace P à travers la droite, mais pas de la bonne distance." }
      ], sol, { mode: vert ? "complete-vert" : "complete-horiz", P: P.join(","), Pp: Pp.join(","), m: m });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le diagramme montre la moitié d'une forme sur une grille, avec un axe de symétrie en tirets. Le sommet P est à (-2, 1). Quel point est l'image miroir de P qui complète la forme ?",
    { t: "(2, 1)", fb: "Exact." },
    [{ t: "(-2, 1)", fb: "C'est P lui-même." }, { t: "(2, 2)", fb: "Le point est déplacé d'une unité le long de la droite." }, { t: "(1, -2)", fb: "Cela échange les coordonnées." }],
    "P est à 2 unités à gauche de l'axe des ordonnées, donc son image miroir est à 2 unités à droite, à la même hauteur : <b>(2, 1)</b>.", { mode: "complete-vert", P: "-2,1", Pp: "2,1", m: 0 });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, lines: [{ a: [0, -6], b: [0, 6], dash: true, w: 2 }], shapes: [{ pts: [[0, 3], [-1, 2], [-2, 1], [0, -1]], fill: FIG_SHADE }], marks: [{ p: [-2, 1], label: "P", dx: -12, dy: 0 }], aria: "La moitié d'une forme sur une grille avec un axe de symétrie en tirets" });
  return qf;
}, ["Compte la distance entre P et la droite en tirets; le point miroir est à la même distance de l'autre côté.", "Le point miroir garde la coordonnée le long de la droite et inverse la distance à travers elle."]);

// 13. 10.2 L1 var: order and angle of rotation symmetry of familiar shapes.
E("u7-rotation-symmetry-var", 7, ["10.2"], 1, "var", varset([
  function () {
    var q = mcq("On tourne un carré autour de son centre. Il correspond à lui-même 4 fois en un tour complet. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'il correspond en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 4, angle 90°", fb: "Exact. 360 divisé par 4 donne 90." },
      [{ t: "Ordre 2, angle 180°", fb: "Un carré correspond plus souvent que deux fois; compte les tours qui mènent à une position correspondante." }, { t: "Ordre 4, angle 45°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 4 donne 90, pas 45." }, { t: "Il n'a aucune symétrie de rotation", fb: "Un carré correspond à lui-même quand on le tourne d'une partie d'un tour complet." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] Donc le carré a <b>un ordre de 4 et un angle de 90°</b>.",
      { mode: "rot-square" });
    q.figure = polySVG(4);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un triangle équilatéral, tourné autour de son centre ? L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 3, angle 120°", fb: "Exact. 360 divisé par 3 donne 120." },
      [{ t: "Ordre 3, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 3 donne 120, pas 90." }, { t: "Ordre 6, angle 60°", fb: "Le triangle a 3 tours correspondants, pas 6; compte chaque sommet qui passe au coin suivant." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un tiers de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 3 &= 120° \\end{aligned} \\] Donc le triangle équilatéral a <b>un ordre de 3 et un angle de 120°</b>.",
      { mode: "rot-equi" });
    q.figure = polySVG(3);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un pentagone régulier, tourné autour de son centre ? Un pentagone régulier a 5 côtés égaux. L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 5, angle 72°", fb: "Exact. 360 divisé par 5 donne 72." },
      [{ t: "Ordre 5, angle 60°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 5 donne 72, pas 60." }, { t: "Ordre 10, angle 36°", fb: "Le pentagone correspond 5 fois en un tour complet, une fois pour chaque sommet." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un cinquième de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 5 &= 72° \\end{aligned} \\] Donc le pentagone régulier a <b>un ordre de 5 et un angle de 72°</b>.",
      { mode: "rot-pent" });
    q.figure = polySVG(5);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un hexagone régulier, tourné autour de son centre ? Un hexagone régulier a 6 côtés égaux. L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 6, angle 60°", fb: "Exact. 360 divisé par 6 donne 60." },
      [{ t: "Ordre 6, angle 120°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 6 donne 60, pas 120." }, { t: "Ordre 3, angle 120°", fb: "L'hexagone correspond 6 fois en un tour complet, une fois pour chaque sommet." }, { t: "Il n'a aucune symétrie de rotation", fb: "En tournant d'un sixième de tour complet, il correspond à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc l'hexagone régulier a <b>un ordre de 6 et un angle de 60°</b>.",
      { mode: "rot-hex" });
    q.figure = polySVG(6);
    return q;
  },
  function () {
    var q = mcq("Quels sont l'ordre et l'angle de symétrie de rotation d'un rectangle qui n'est pas un carré, tourné autour de son centre ? L'ordre est le nombre de fois qu'il correspond à lui-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Seul un demi-tour le fait correspondre." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait les grands côtés là où étaient les petits côtés, donc il ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Il n'a aucune symétrie de rotation", fb: "Un demi-tour le fait correspondre exactement à lui-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc le rectangle a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-rect" });
    q.figure = u7Svg(230, 190, u7Poly([[45, 60], [185, 60], [185, 130], [45, 130]], FIG_SHADE), "Rectangle");
    return q;
  },
  function () {
    return mcq("La lettre majuscule H est dessinée avec des traits égaux. On la tourne autour de son centre. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'elle correspond à elle-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Un demi-tour remet la lettre exactement comme au départ." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait la lettre sur le côté, donc elle ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Elle n'a aucune symétrie de rotation", fb: "Un demi-tour fait correspondre la lettre exactement à elle-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc la lettre H a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-H" });
  },
  function () {
    return mcq("On tourne la lettre majuscule N autour de son centre. Quels sont son ordre et son angle de symétrie de rotation ? L'ordre est le nombre de fois qu'elle correspond à elle-même en un tour complet, et l'angle est 360 degrés divisés par l'ordre.",
      { t: "Ordre 2, angle 180°", fb: "Exact. Un demi-tour retourne la diagonale dans le bon sens pour correspondre." },
      [{ t: "Ordre 4, angle 90°", fb: "Un quart de tour mettrait la lettre sur le côté, donc elle ne correspond pas." }, { t: "Ordre 2, angle 90°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 2 donne 180, pas 90." }, { t: "Elle n'a aucune symétrie de rotation", fb: "Un demi-tour fait correspondre la lettre exactement à elle-même." }],
      "Divise un tour complet par l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc la lettre N a <b>un ordre de 2 et un angle de 180°</b>.",
      { mode: "rot-N" });
  }
]), ["Pour une forme régulière, l'ordre égale le nombre de côtés; l'angle est 360 degrés divisés par l'ordre.", "Trouve d'abord combien de tours en un tour complet font correspondre la forme, puis divise 360 degrés par ce nombre."]);

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
    var dirWord = cw ? "dans le sens horaire" : "dans le sens antihoraire";
    var names = ["A", "B", "C"];
    var prompt = "Le triangle ABC a pour sommets A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " et C" + u7Coord(pts[2]) + ". Le triangle subit une rotation de 90° " + dirWord + " autour du sommet " + names[pivotIdx] + ". Quelles sont les coordonnées de l'image du sommet " + names[askIdx] + " ?";
    var rotTxt = cw ? "(" + fmtD(dx) + ", " + fmtD(dy) + ") devient (" + fmtD(dy) + ", " + fmtD(-dx) + ")" : "(" + fmtD(dx) + ", " + fmtD(dy) + ") devient (" + fmtD(-dy) + ", " + fmtD(dx) + ")";
    var sol = "Pars du pivot " + names[pivotIdx] + u7Coord(V) + ". Le déplacement du pivot au sommet " + names[askIdx] + " est " + rotTxt + " lors d'une rotation de 90° " + dirWord + " : \\[ \\begin{aligned} \\text{image} &= " + u7Coord(V) + " + (" + fmtD(img[0] - V[0]) + ", " + fmtD(img[1] - V[1]) + ") \\\\ &= " + u7Coord(img) + " \\end{aligned} \\] Donc l'image du sommet " + names[askIdx] + " est <b>" + u7Coord(img) + "</b>.";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: p2[0] >= V[0] ? 11 : -11, dy: -11 }; }),
      aria: "Un triangle sur une grille" });
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Exact. Le déplacement à partir du pivot tourne de 90° " + dirWord + " et garde sa longueur." },
      [
        { t: u7Coord(wrong), fb: "Cela tourne le déplacement dans l'autre sens; vérifie la direction donnée." },
        { t: u7Coord(aboutOrigin), fb: "Cela fait une rotation autour de l'origine; cette rotation se fait autour du sommet " + names[pivotIdx] + "." },
        { t: u7Coord(P), fb: "C'est le point de départ du sommet " + names[askIdx] + "; seul le pivot reste en place." }
      ], sol, { mode: cw ? "rot-cw" : "rot-ccw", V: V.join(","), P: P.join(","), img: img.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le triangle ABC a pour sommets A(0, 0), B(3, 0) et C(0, 2). Le triangle subit une rotation de 90° dans le sens horaire autour du sommet A. Quelles sont les coordonnées de l'image du sommet B ?",
    { t: "(0, -3)", fb: "Exact." },
    [{ t: "(0, 3)", fb: "Cela tourne le déplacement dans l'autre sens." }, { t: "(3, 0)", fb: "C'est le point de départ de B." }, { t: "(-3, 0)", fb: "C'est un demi-tour, pas un quart de tour." }],
    "Le déplacement de A à B est (3, 0); une rotation de 90° dans le sens horaire le transforme en (0, -3), donc l'image de B est <b>(0, -3)</b>.", { mode: "rot-cw", V: "0,0", P: "3,0", img: "0,-3" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[0, 0], [3, 0], [0, 2]], fill: FIG_SHADE }], marks: [{ p: [0, 0], label: "A", dx: -11, dy: -11 }, { p: [3, 0], label: "B", dx: 11, dy: -11 }, { p: [0, 2], label: "C", dx: -11, dy: -11 }], aria: "Un triangle sur une grille" });
  return qf;
}, ["Le sommet pivot reste fixe; chaque autre sommet tourne autour de lui.", "Trouve le déplacement du pivot au sommet nommé, tourne ce déplacement de 90 degrés, puis ajoute-le au pivot."]);

// 15. 10.3 L2 var: symmetry in tessellations and repeating patterns.
E("u7-tessellation-var", 7, ["10.3"], 1, "var", varset([
  function () {
    return mcq("Un dallage en nid d'abeilles est fait d'hexagones réguliers qui s'emboîtent sans aucun espace. Autour du centre d'un hexagone, tout le motif correspond à lui-même quand on le tourne. Quel est l'angle de symétrie de rotation à cet endroit ?",
      { t: "60°", fb: "Exact. Un hexagone régulier a un ordre de 6, et 360 divisé par 6 donne 60." },
      [{ t: "30°", fb: "C'est la moitié du bon angle; l'hexagone correspond d'abord après un sixième de tour." }, { t: "90°", fb: "Ce serait un ordre de 4; un hexagone correspond 6 fois en un tour complet." }, { t: "120°", fb: "Cela saute une position correspondante; la première correspondance vient plus tôt, après un sixième de tour." }],
      "Un hexagone régulier a un ordre de rotation de 6 : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc l'angle de symétrie de rotation est <b>60°</b>.",
      { mode: "tess-honeycomb" });
  },
  function () {
    return mcq("Un plancher est carrelé avec un dallage en damier de carrés noirs et blancs. Considère un carré blanc. Quelle droite est un axe de symétrie de tout le motif ? Un axe de symétrie fait correspondre exactement les deux moitiés, couleurs comprises.",
      { t: "Une droite verticale qui passe par le centre du carré blanc", fb: "Exact. Chaque côté se reflète sur des carrés de la même couleur." },
      [{ t: "Une droite verticale le long du bord gauche du carré blanc", fb: "Plier là échange le carré blanc avec un voisin noir, donc les couleurs ne correspondent pas." }, { t: "Une droite horizontale le long du bord supérieur du carré blanc", fb: "Plier là échange le carré blanc avec un voisin noir, donc les couleurs ne correspondent pas." }, { t: "Une droite oblique qui passe par le centre du carré blanc, inclinée de 30° par rapport à l'horizontale", fb: "Un pliage oblique à cet angle ne ramène pas les carrés sur la grille." }],
      "Plier le long d'une droite qui passe par le centre du carré envoie chaque carré sur un carré de la même couleur, tandis que plier le long d'un bord échange le noir et le blanc. Donc l'axe de symétrie est <b>une droite verticale qui passe par le centre du carré blanc</b>.",
      { mode: "tess-checker" });
  },
  function () {
    return mcq("Un dallage est fait de quatre triangles rectangles identiques disposés en moulinet autour d'un point, et le moulinet se répète sur tout le plancher. Autour du centre du moulinet, quels sont l'ordre et l'angle de symétrie de rotation du motif ?",
      { t: "Ordre 4, angle 90°", fb: "Exact. Quatre tours correspondants tiennent en un tour complet, et 360 divisé par 4 donne 90." },
      [{ t: "Ordre 2, angle 180°", fb: "Le moulinet correspond avant un demi-tour; compte les quatre pales." }, { t: "Ordre 4, angle 45°", fb: "L'angle est 360 divisé par l'ordre, et 360 divisé par 4 donne 90, pas 45." }, { t: "Le motif n'a aucune symétrie de rotation", fb: "Tourner le moulinet d'un quart de tour place chaque pale là où était la suivante." }],
      "Quatre pales donnent un ordre de 4 : \\[ \\begin{aligned} 360° \\div 4 &= 90° \\end{aligned} \\] Donc le motif a <b>un ordre de 4 et un angle de 90°</b> autour du centre du moulinet.",
      { mode: "tess-pinwheel" });
  },
  function () {
    return mcq("Une banderole pour une foire est un motif qui se répète : cinq triangles identiques pointent vers le haut, côte à côte le long d'une ligne de base, comme des fanions sur une corde. Quelle droite est un axe de symétrie de toute la banderole ?",
      { t: "Une droite verticale qui passe par le triangle du milieu", fb: "Exact. Les deux triangles de chaque côté se reflètent l'un sur l'autre." },
      [{ t: "Une droite horizontale le long de la ligne de base", fb: "Plier là retournerait les triangles sous la base, là où la banderole n'a rien." }, { t: "Une droite verticale qui passe par le premier triangle", fb: "Cela laisse deux triangles d'un côté et rien à faire correspondre de l'autre côté." }, { t: "Une droite oblique qui passe par le triangle du milieu", fb: "Un pliage oblique ne ramène pas la rangée de triangles sur elle-même." }],
      "La banderole a deux triangles de chaque côté de celui du milieu, donc plier sur <b>une droite verticale qui passe par le triangle du milieu</b> fait correspondre les moitiés. Aucune autre droite donnée ne fait cela.",
      { mode: "tess-bunting" });
  },
  function () {
    return mcq("Un dallage est fait de triangles équilatéraux seulement, avec 6 triangles qui se rencontrent à chaque point. Autour d'un point où 6 triangles se rencontrent, le motif correspond d'abord à lui-même après un tour de quel angle ?",
      { t: "60°", fb: "Exact. Six positions correspondantes tiennent en un tour complet, et 360 divisé par 6 donne 60." },
      [{ t: "30°", fb: "C'est la moitié d'un pas de triangle; les triangles ne s'aligneraient pas encore avec le motif." }, { t: "90°", fb: "Ce serait un ordre de 4; ici 6 triangles se rencontrent, ce qui donne un ordre de 6." }, { t: "180°", fb: "C'est un demi-tour, mais le motif correspond déjà après un tour plus petit." }],
      "Six triangles autour du point donnent un ordre de 6 : \\[ \\begin{aligned} 360° \\div 6 &= 60° \\end{aligned} \\] Donc le motif correspond d'abord après un tour de <b>60°</b>.",
      { mode: "tess-triangles" });
  }
]), ["Cherche le plus petit tour ou pliage qui fait retomber tout le motif répété sur lui-même.", "Pour la rotation, compte combien de positions correspondantes tiennent en un tour complet, puis divise 360 degrés par ce nombre."]);

// 16. 10.4 L2 var: types of symmetry in described artwork.
E("u7-artwork-symmetry-var", 7, ["10.4"], 1, "var", varset([
  function () {
    var opts = [
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Exact. Il se plie le long de plusieurs axes et correspond à lui-même lors de tours partiels." },
      { t: "La symétrie linéaire seulement", fb: "Il correspond aussi à lui-même quand on le tourne d'une partie d'un tour complet autour de son centre." },
      { t: "La symétrie de rotation seulement", fb: "Il se plie aussi exactement sur lui-même le long d'axes qui passent par son centre." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Un flocon à six pointes a les deux types de symétrie." }
    ];
    return mcq("Une photographie montre un flocon de neige avec 6 pointes identiques disposées régulièrement autour de son centre. Quels types de symétrie le flocon montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Les 6 pointes régulières donnent des axes de pliage qui passent par le centre et des tours correspondants d'un sixième de tour complet. Donc le flocon montre <b>la symétrie linéaire et la symétrie de rotation</b>.",
      { mode: "art-snowflake" });
  },
  function () {
    var opts = [
      { t: "La symétrie de rotation seulement", fb: "Exact. Les pales tournoyantes correspondent lors de quarts de tour, mais aucun pliage ne fait correspondre les moitiés." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Les pales courbent dans un seul sens, donc chaque axe de pliage échoue à faire correspondre les moitiés." },
      { t: "La symétrie linéaire seulement", fb: "Il n'y a aucun axe de pliage, mais un quart de tour autour du centre le fait correspondre." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Un quart de tour autour du centre le fait bien correspondre à lui-même." }
    ];
    return mcq("Un bloc de courtepointe montre un moulinet : quatre pales courbées tournent autour du centre, chaque pale courbée dans le même sens. Quels types de symétrie le bloc montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Tourner d'un quart de tour place chaque pale là où était la suivante, mais la courbe dans un seul sens empêche tout pliage. Donc le bloc montre <b>la symétrie de rotation seulement</b>.",
      { mode: "art-pinwheel" });
  },
  function () {
    var opts = [
      { t: "La symétrie linéaire seulement", fb: "Exact. Les ailes se reflètent de part et d'autre d'un axe vertical, et aucun tour partiel ne le fait correspondre." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Le tourner d'un tour partiel quelconque déplace la tête et le motif des ailes." },
      { t: "La symétrie de rotation seulement", fb: "Il a bien un axe de pliage : l'axe vertical en son milieu." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Les deux ailes sont des images miroirs, donc il a une symétrie linéaire." }
    ];
    return mcq("Un tableau montre un papillon vu de dessus, avec les ailes gauche et droite comme images miroirs et la tête en haut. Quels types de symétrie le tableau montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Les ailes se plient l'une sur l'autre le long de l'axe vertical du milieu, et aucun tour plus petit qu'un tour complet ne fonctionne. Donc le tableau montre <b>la symétrie linéaire seulement</b>.",
      { mode: "art-butterfly" });
  },
  function () {
    var opts = [
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "Exact. Le triangle seul empêche tout pliage et tout tour partiel." },
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Un triangle scalène dans un coin brise les deux types de symétrie." },
      { t: "La symétrie linéaire seulement", fb: "Il n'y a aucun axe de pliage qui fasse correspondre le badge; vérifie le triangle dans le coin." },
      { t: "La symétrie de rotation seulement", fb: "Il n'y a aucun tour partiel qui fasse correspondre le badge; vérifie le triangle dans le coin." }
    ];
    return mcq("Un badge rond est uni, sauf un petit triangle scalène imprimé dans la zone en haut à droite. Un triangle scalène a tous ses côtés différents. Quels types de symétrie le badge montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "Chaque pliage ou tour partiel déplacerait le triangle seul à un endroit où le badge est uni. Donc le badge ne montre <b>ni symétrie linéaire ni symétrie de rotation</b>.",
      { mode: "art-badge" });
  },
  function () {
    var opts = [
      { t: "Les deux : la symétrie linéaire et la symétrie de rotation", fb: "Exact. La lettre H se plie de deux façons et correspond après un demi-tour." },
      { t: "La symétrie linéaire seulement", fb: "Elle correspond aussi à elle-même après un demi-tour autour de son centre." },
      { t: "La symétrie de rotation seulement", fb: "Elle se plie aussi exactement sur elle-même, en travers et de haut en bas." },
      { t: "Ni la symétrie linéaire ni la symétrie de rotation", fb: "La lettre H a les deux types de symétrie." }
    ];
    return mcq("Un logo circulaire a la lettre majuscule H exactement au centre, dessinée avec des traits égaux. Quels types de symétrie le logo montre-t-il ?",
      opts[0], [opts[1], opts[2], opts[3]],
      "La lettre H se plie le long d'un axe vertical et d'un axe horizontal, et un demi-tour la remet exactement en place. Donc le logo montre <b>la symétrie linéaire et la symétrie de rotation</b>.",
      { mode: "art-logoH" });
  }
]), ["Teste l'oeuvre des deux façons : essaie d'abord les pliages, puis les tours partiels autour du centre.", "La symétrie linéaire exige un pliage qui correspond exactement; la symétrie de rotation exige un tour partiel qui correspond exactement."]);

// 17. 10.11 L2 var: designs that demonstrate both line and rotation symmetry.
E("u7-both-symmetry-var", 7, ["10.11"], 1, "var", varset([
  function () {
    return mcq("Quel motif présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "Un badge rond avec une étoile à cinq pointes exactement au centre", fb: "Exact. L'étoile se plie le long de 5 axes et correspond à elle-même lors de tours autour du centre." },
      [
        { t: "Une tuile carrée avec un moulinet de quatre pales courbées", fb: "Le moulinet a une symétrie de rotation, mais ses pales courbées ne lui donnent aucun axe de pliage." },
        { t: "Un drapeau avec une seule flèche qui pointe vers la droite au milieu", fb: "La flèche a un axe de pliage horizontal, mais aucun tour partiel ne la fait correspondre." },
        { t: "Une affiche avec la lettre majuscule F au milieu", fb: "La lettre F n'a ni axe de pliage ni tour partiel correspondant." }
      ],
      "Seule l'étoile centrée réussit les deux tests : elle se plie sur elle-même et tourne sur elle-même. Donc le motif qui a les deux est <b>un badge rond avec une étoile à cinq pointes exactement au centre</b>.",
      { mode: "both-star" });
  },
  function () {
    return mcq("Quatre tuiles montrent chacune une lettre majuscule au centre. Quelle tuile présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "La tuile avec la lettre H", fb: "Exact. H se plie de deux façons et correspond après un demi-tour." },
      [
        { t: "La tuile avec la lettre S", fb: "S correspond après un demi-tour, mais elle n'a aucun axe de pliage." },
        { t: "La tuile avec la lettre A", fb: "A a un axe de pliage vertical, mais aucun tour partiel ne la fait correspondre." },
        { t: "La tuile avec la lettre L", fb: "L n'a ni axe de pliage ni tour partiel correspondant." }
      ],
      "H est la seule lettre donnée qui se plie sur elle-même et tourne sur elle-même. Donc la tuile qui a les deux est <b>la tuile avec la lettre H</b>.",
      { mode: "both-H" });
  },
  function () {
    return mcq("Quelle oeuvre présente à la fois la symétrie linéaire et la symétrie de rotation ?",
      { t: "Un flocon de neige en papier avec 6 pointes correspondantes, découpé dans du papier plié", fb: "Exact. Il se plie le long d'axes qui passent par son centre et correspond lors de sixièmes de tour." },
      [
        { t: "Une spirale peinte en rouge sur une grande assiette ronde en céramique", fb: "Une spirale s'enroule dans un seul sens, donc elle n'a ni axe de pliage ni tour partiel correspondant." },
        { t: "Un cerf-volant avec une longue queue et des rubans, dessiné de côté dans le ciel", fb: "La forme du cerf-volant a un axe de pliage le long de sa ligne centrale, mais aucun tour partiel ne la fait correspondre." },
        { t: "Un bloc de courtepointe en moulinet avec quatre pales courbées, cousu dans un tissu à motifs", fb: "Le moulinet a une symétrie de rotation seulement; ses pales courbées ne lui donnent aucun axe de pliage." }
      ],
      "Seul le flocon réussit les deux tests : des pliages qui passent par le centre et des tours partiels correspondants. Donc l'oeuvre qui a les deux est <b>un flocon de neige en papier avec 6 pointes correspondantes, découpé dans du papier plié</b>.",
      { mode: "both-snowflake" });
  },
  function () {
    return mcq("Un motif de tuile se plie exactement sur lui-même le long de 2 axes, et il correspond à lui-même deux fois en un tour complet autour de son centre. Quel énoncé nomme correctement ses deux caractéristiques de symétrie ?",
      { t: "Il a une symétrie linéaire, et une symétrie de rotation d'ordre 2 avec un angle de 180°", fb: "Exact. Deux correspondances en un tour complet donnent un ordre de 2, et 360 divisé par 2 donne 180." },
      [
        { t: "Il a une symétrie linéaire, et une symétrie de rotation d'ordre 4 avec un angle de 90°", fb: "Il faudrait quatre correspondances pour un ordre de 4; ce motif correspond deux fois." },
        { t: "Il a une symétrie linéaire seulement, sans aucune symétrie de rotation", fb: "Correspondre deux fois en un tour complet est une symétrie de rotation, donc il a aussi celle-là." },
        { t: "Il a une symétrie de rotation d'ordre 2 avec un angle de 180° seulement, et rien de plus", fb: "Se plier sur lui-même le long de 2 axes est une symétrie linéaire, donc il a aussi celle-là." }
      ],
      "Le pliage donne la symétrie linéaire, et le nombre de tours donne l'ordre : \\[ \\begin{aligned} 360° \\div 2 &= 180° \\end{aligned} \\] Donc l'énoncé est <b>il a une symétrie linéaire, et une symétrie de rotation d'ordre 2 avec un angle de 180°</b>.",
      { mode: "both-features" });
  }
]), ["Un motif doit réussir les deux tests : un pliage qui correspond et un tour partiel qui correspond.", "Vérifie chaque choix d'abord pour un axe de pliage, puis pour un tour correspondant autour du centre."]);

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
      aria: "Deux triangles A et B sur une grille" });
    var reflT = "Ils sont liés par une réflexion (l'un est l'image miroir de l'autre).";
    var rotT = "Ils sont liés par une rotation (l'un est une copie tournée de l'autre).";
    var neiT = "Ils ne sont liés ni par une réflexion ni par une rotation.";
    var enlT = "La forme B est un agrandissement de la forme A.";
    var sol, q;
    var prompt = "La forme A et la forme B sont montrées sur la grille. Quel est le lien entre les deux formes ?";
    if (mode === "reflection") {
      sol = "La forme B a les mêmes longueurs de côtés que la forme A, mais elle est retournée : chaque sommet de B est l'image miroir d'un sommet de A par rapport à l'axe des ordonnées. Donc <b>ils sont liés par une réflexion (l'un est l'image miroir de l'autre)</b>.";
      q = mcq(prompt, { t: reflT, fb: "Exact. B est l'image miroir de A par rapport à l'axe des ordonnées." },
        [{ t: rotT, fb: "Une rotation garde l'orientation d'une forme; B est retournée par rapport à A." }, { t: neiT, fb: "Ils sont liés : vérifie ce qu'un miroir par rapport à l'axe des ordonnées fait à A." }, { t: enlT, fb: "Les longueurs de côtés sont les mêmes, donc B n'est pas plus grande que A." }], sol, { mode: "related-refl", A: A.join(";") });
    } else if (mode === "rotation") {
      sol = "La forme B a les mêmes longueurs de côtés et la même orientation que la forme A, tournée d'un demi-tour autour de l'origine : chaque sommet " + "\\((x, y)\\)" + " de A aboutit à " + "\\((-x, -y)\\)" + " dans B. Donc <b>ils sont liés par une rotation (l'un est une copie tournée de l'autre)</b>.";
      q = mcq(prompt, { t: rotT, fb: "Exact. B est A tournée d'un demi-tour autour de l'origine." },
        [{ t: reflT, fb: "Une réflexion retournerait la forme; B garde la même orientation que A." }, { t: neiT, fb: "Ils sont liés : vérifie ce qu'un demi-tour autour de l'origine fait à A." }, { t: enlT, fb: "Les longueurs de côtés sont les mêmes, donc B n'est pas plus grande que A." }], sol, { mode: "related-rot", A: A.join(";") });
    } else {
      sol = "La forme B n'a pas les mêmes longueurs de côtés que la forme A, donc elle ne peut pas être une image miroir ni une copie tournée, puisque les réflexions et les rotations gardent les longueurs de côtés. Donc <b>ils ne sont liés ni par une réflexion ni par une rotation</b>.";
      q = mcq(prompt, { t: neiT, fb: "Exact. Une longueur de côté diffère, et les réflexions et les rotations ne changent jamais les longueurs de côtés." },
        [{ t: reflT, fb: "Une image miroir garderait chaque longueur de côté; compare les côtés ici." }, { t: rotT, fb: "Une copie tournée garderait chaque longueur de côté; compare les côtés ici." }, { t: enlT, fb: "Un agrandissement multiplie chaque côté par un même facteur; ici, seule une partie de la forme a changé." }], sol, { mode: "related-neither", A: A.join(";") });
    }
    q.figure = grid;
    return q;
  }
  var qf = mcq("La forme A et la forme B sont montrées sur la grille. Quel est le lien entre les deux formes ?",
    { t: "Ils sont liés par une réflexion (l'un est l'image miroir de l'autre).", fb: "Exact." },
    [{ t: "Ils sont liés par une rotation (l'un est une copie tournée de l'autre).", fb: "B est retournée par rapport à A." }, { t: "Ils ne sont liés ni par une réflexion ni par une rotation.", fb: "Vérifie un miroir par rapport à l'axe des ordonnées." }, { t: "La forme B est un agrandissement de la forme A.", fb: "Les longueurs de côtés sont les mêmes." }],
    "Chaque sommet de B est l'image miroir d'un sommet de A par rapport à l'axe des ordonnées, donc <b>ils sont liés par une réflexion</b>.", { mode: "related-refl", A: "-4,-2;-1,-1;-3,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[-4, -2], [-1, -1], [-3, 2]], fill: FIG_SHADE }, { pts: [[4, -2], [1, -1], [3, 2]], fill: "#ffffff" }], labels: [{ p: [-2.7, -0.3], str: "A", size: 14, bold: true }, { p: [2.7, -0.3], str: "B", size: 14, bold: true }], aria: "Deux triangles A et B sur une grille" });
  return qf;
}, ["Les réflexions et les rotations ne changent jamais les longueurs de côtés, donc compare d'abord les côtés.", "Si les côtés correspondent, décide si la deuxième forme est retournée (réflexion) ou seulement tournée (rotation)."]);

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
    labels: [{ p: cenA, str: "Forme", size: 12, bold: true }, { p: cenB, str: "Image", size: 12, bold: true }],
    aria: "Une forme et son image sur une grille" });
  var yT = "La forme et son image ont une symétrie linéaire par rapport à l'axe des ordonnées.";
  var xT = "La forme et son image ont une symétrie linéaire par rapport à l'axe des abscisses.";
  var rT = "La forme et son image ont une symétrie de rotation d'ordre 2 autour de l'origine.";
  var nT = "La forme et son image n'ont ni symétrie linéaire ni symétrie de rotation.";
  var corrT = mode === "reflY" ? yT : (mode === "reflX" ? xT : rT);
  var all = [yT, xT, rT, nT];
  var rest = all.filter(function (t) { return t !== corrT; }).map(function (t) {
    return { t: t, fb: t === nT ? "L'ensemble a bien une symétrie; imagine le plier ou le tourner comme un tout." : "Cela nomme le mauvais axe miroir ou le mauvais centre pour cet ensemble; vérifie où se trouve l'image." };
  });
  var expl = mode === "reflY" ? "L'image est l'image miroir de la forme par rapport à l'axe des ordonnées, donc l'ensemble se plie exactement sur lui-même le long de l'axe des ordonnées."
    : mode === "reflX" ? "L'image est l'image miroir de la forme par rapport à l'axe des abscisses, donc l'ensemble se plie exactement sur lui-même le long de l'axe des abscisses."
    : "L'image est la forme tournée d'un demi-tour autour de l'origine, donc l'ensemble correspond à lui-même après un demi-tour autour de l'origine, ce qui est une symétrie de rotation d'ordre 2.";
  var q = mcq("Une forme et son image après une transformation sont montrées sur la grille. Quel énoncé décrit la symétrie de l'ensemble (la forme et son image ensemble) ?",
    { t: corrT, fb: "Exact. " + expl }, rest,
    expl + " Donc l'énoncé est : <b>" + corrT + "</b>",
    { mode: "transf-" + mode, A: A.join(";") });
  q.figure = grid;
  return q;
}, ["Traite la forme et son image comme un seul ensemble, puis teste les pliages et les tours sur tout l'ensemble.", "Regarde où se trouve l'image par rapport à la forme : reflétée de côté, reflétée de haut en bas, ou tournée d'un demi-tour."]);

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
    var symT = mode === "reflY" ? "une symétrie linéaire par rapport à l'axe des ordonnées" : mode === "reflX" ? "une symétrie linéaire par rapport à l'axe des abscisses" : "une symétrie de rotation d'ordre 2 autour de l'origine";
    var symWrong = mode === "rot180" ? "une symétrie linéaire par rapport à l'axe des ordonnées" : "une symétrie de rotation d'ordre 2 autour de l'origine";
    var corrT = "B' est à " + u7Coord(Bp) + ", et l'ensemble a " + symT + ".";
    var d1 = "B' est à " + u7Coord(BpAlt) + ", et l'ensemble a " + symT + ".";
    var d2 = "B' est à " + u7Coord(Bp) + ", et l'ensemble a " + symWrong + ".";
    var d3 = "B' est à " + u7Coord(BpAlt) + ", et l'ensemble a " + symWrong + ".";
    if (new Set([corrT, d1, d2, d3]).size < 4) continue;
    var transWord = mode === "reflY" ? "reflété par rapport à l'axe des ordonnées" : mode === "reflX" ? "reflété par rapport à l'axe des abscisses" : "tourné de 180° autour de l'origine";
    var ruleTxt = mode === "reflY" ? "\\((x, y) \\to (-x, y)\\)" : mode === "reflX" ? "\\((x, y) \\to (x, -y)\\)" : "\\((x, y) \\to (-x, -y)\\)";
    var prompt = "Le triangle ABC a pour sommets A" + u7Coord(A) + ", B" + u7Coord(B) + " et C" + u7Coord(C) + ". Il est " + transWord + ". L'image de A est A' à " + u7Coord(Ap) + ", comme montré. Quel énoncé complète correctement la transformation et décrit la symétrie de l'ensemble ?";
    var sol = "La règle est " + ruleTxt + ". En l'appliquant à B" + u7Coord(B) + " : \\[ \\begin{aligned} B &\\to " + u7Coord(Bp) + " \\end{aligned} \\] La forme et son image ensemble se plient ou tournent sur elles-mêmes comme indiqué, donc le bon énoncé est : <b>" + corrT + "</b>";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p, i) { return { p: p, label: ["A", "B", "C"][i], dx: 11, dy: -11 }; }).concat([{ p: Ap, label: "A'", dx: -13, dy: -11 }]),
      aria: "Un triangle et un sommet image sur une grille" });
    var q = mcq(prompt,
      { t: corrT, fb: "Exact. Le sommet suit la règle, et la symétrie correspond à la transformation." },
      [
        { t: d1, fb: "La partie symétrie est bonne, mais ce point utilise la mauvaise règle pour B." },
        { t: d2, fb: "Le point pour B est bon, mais l'ensemble n'a pas cette symétrie." },
        { t: d3, fb: "Les deux parties sont fausses : le point utilise la mauvaise règle, et la symétrie ne correspond pas." }
      ], sol, { mode: "complete-" + mode, A: A.join(","), B: B.join(","), Bp: Bp.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Le triangle ABC a pour sommets A(1, 1), B(4, 2) et C(2, 4). Il est reflété par rapport à l'axe des ordonnées. L'image de A est A' à (-1, 1), comme montré. Quel énoncé complète correctement la transformation et décrit la symétrie de l'ensemble ?",
    { t: "B' est à (-4, 2), et l'ensemble a une symétrie linéaire par rapport à l'axe des ordonnées.", fb: "Exact." },
    [{ t: "B' est à (4, -2), et l'ensemble a une symétrie linéaire par rapport à l'axe des ordonnées.", fb: "Ce point utilise la mauvaise règle pour B." }, { t: "B' est à (-4, 2), et l'ensemble a une symétrie de rotation d'ordre 2 autour de l'origine.", fb: "Le point est bon, mais la symétrie est fausse." }, { t: "B' est à (4, -2), et l'ensemble a une symétrie de rotation d'ordre 2 autour de l'origine.", fb: "Les deux parties sont fausses." }],
    "La règle est \\((x, y) \\to (-x, y)\\), donc B aboutit à (-4, 2), et la paire se plie le long de l'axe des ordonnées.", { mode: "complete-reflY", A: "1,1", B: "4,2", Bp: "-4,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[1, 1], [4, 2], [2, 4]], fill: FIG_SHADE }], marks: [{ p: [1, 1], label: "A", dx: 11, dy: -11 }, { p: [4, 2], label: "B", dx: 11, dy: -11 }, { p: [2, 4], label: "C", dx: 11, dy: -11 }, { p: [-1, 1], label: "A'", dx: -13, dy: -11 }], aria: "Un triangle et un sommet image sur une grille" });
  return qf;
}, ["Applique au sommet nommé la même règle que montre le sommet image donné.", "Trouve d'abord où B aboutit avec la règle, puis nomme la symétrie de la forme et de l'image ensemble."]);

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
    var hWord = dx > 0 ? "D" + fmtD(dx) : "G" + fmtD(-dx);
    var vWord = dy > 0 ? "H" + fmtD(dy) : "B" + fmtD(-dy);
    var hTxt = dx > 0 ? "vers la droite " + fmtD(dx) : "vers la gauche " + fmtD(-dx);
    var vTxt = dy > 0 ? "vers le haut " + fmtD(dy) : "vers le bas " + fmtD(-dy);
    var names = ["A", "B", "C"];
    var prompt = "Une forme a pour sommets A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " et C" + u7Coord(pts[2]) + ". Elle est translatée selon la règle " + hWord + ", " + vWord + ", ce qui veut dire glisser " + hTxt + " et " + vTxt + ". Quelles sont les coordonnées de l'image du sommet " + names[ask] + " ?";
    var sol = "Applique le glissement au sommet " + names[ask] + u7Coord(P) + " : \\[ \\begin{aligned} x' &= " + fmtD(P[0]) + (dx >= 0 ? " + " + fmtD(dx) : " - " + fmtD(-dx)) + " = " + fmtD(img[0]) + " \\\\ y' &= " + fmtD(P[1]) + (dy >= 0 ? " + " + fmtD(dy) : " - " + fmtD(-dy)) + " = " + fmtD(img[1]) + " \\end{aligned} \\] Donc l'image du sommet " + names[ask] + " est <b>" + u7Coord(img) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Exact. Le glissement en x et le glissement en y sont tous les deux appliqués au sommet." },
      [
        { t: u7Coord(cand[1]), fb: "Le glissement latéral est allé dans le mauvais sens; vérifie si la règle dit gauche ou droite." },
        { t: u7Coord(cand[2]), fb: "Le glissement vertical est allé dans le mauvais sens; vérifie si la règle dit haut ou bas." },
        { t: u7Coord(cand[3]), fb: "Cela échange les deux glissements; le premier nombre de la règle est le glissement latéral." }
      ], sol, { mode: "translation", dx: dx, dy: dy, P: P.join(","), img: img.join(",") });
    q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: 11, dy: -11 }; }),
      aria: "Un triangle sur une grille" });
    return q;
  }
  var q = mcq("Une forme a pour sommets A(0, 0), B(3, 1) et C(1, 4). Elle est translatée selon la règle D2, H3, ce qui veut dire glisser de 2 vers la droite et de 3 vers le haut. Quelles sont les coordonnées de l'image du sommet B ?",
    { t: "(5, 4)", fb: "Exact." },
    [{ t: "(1, 4)", fb: "Le glissement latéral est allé dans le mauvais sens." }, { t: "(5, -2)", fb: "Le glissement vertical est allé dans le mauvais sens." }, { t: "(6, 3)", fb: "Cela échange les deux glissements." }],
    "En ajoutant les glissements à B(3, 1), on obtient (5, 4), donc l'image de B est <b>(5, 4)</b>.", { mode: "translation", dx: 2, dy: 3, P: "3,1", img: "5,4" });
  q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: [[0, 0], [3, 1], [1, 4]], fill: FIG_SHADE }],
    marks: [{ p: [0, 0], label: "A", dx: 11, dy: -11 }, { p: [3, 1], label: "B", dx: 11, dy: -11 }, { p: [1, 4], label: "C", dx: 11, dy: -11 }],
    aria: "Un triangle sur une grille" });
  return q;
}, ["Dans la règle, la lettre indique la direction et le nombre indique la distance, d'abord latéralement, puis vers le haut ou le bas.", "Ajoute le glissement latéral à la coordonnée x et le glissement vertical à la coordonnée y (soustrais pour la gauche ou le bas)."]);
/*
TRANSLATOR NOTES
- Judgement calls (glossary silent): major arc = arc majeur, minor arc = arc mineur; reflex angle = angle réflexe, and \text{reflex } rendered as \text{réflexe }; subtend / stand on an arc rendered as intercepter un arc; bisect a chord rendered as couper la corde en deux parties égales, midpoint = milieu; supplement / supplementary rendered as angle supplémentaire / supplémentaires; diagram = diagramme; right-angled triangle = triangle rectangle en [point]; aria-label "Circle diagram" translated to "Diagramme du cercle" (accessible label, not a code comment).
- FMT-GEOM lines left as fmt( (each carries an FMT-GEOM marker comment on the line): u8Txt x and y attributes; u8Fig seg helper x1, y1, x2, y2; u8Fig rightMark polyline points; u8Fig main circle cx, cy, r; u8Fig angle arc path d; u8Fig point dots cx, cy. All other display fmt( became fmtD(. No fmtF( or .toFixed occurs in this chunk.
- Literal formatted numbers in static prose, for later guide reconciliation: NONE with a decimal comma, thousands grouping, %, or $ occur in this chunk. The only literal numbers in student prose are whole degree values inside KaTeX (90, 45, 180, 360) and the hint integers 90 and 180 in entry u8-semicircle-angle, all unchanged. Decimal literals 3.5, 1.6 and 2.6 occur only inside SVG attribute strings in the figure helpers (geometry, not display prose) and were left unchanged.
- Unsure: angle réflexe versus angle rentrant, and intercepter for subtend, both to confirm when the immersion guide extracts land.
*/
