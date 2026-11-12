// Math 9 (French) Unit 3 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1991 to 2471).
/* Top-up tranche (November 7, 2026): Unit 3 additions from tranche1/unit3-topup.js */
// Unit 3 top-up: Powers and Exponent Laws (new shapes only)

function u3tMult(factor, count) {
  var parts = [];
  for (var i = 0; i < count; i++) parts.push(factor);
  return "\\(" + parts.join("\\times ") + "\\)";
}
function u3tGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3tRed(n, d) { var g = u3tGcd(n, d); return [n / g, d / g]; }
function u3tFracOpt(n, d) {
  var r = u3tRed(n, d); n = r[0]; d = r[1];
  if (d === 1) return fmtD(n);
  if (n < 0) return "\\(-\\frac{" + (-n) + "}{" + d + "}\\)";
  return "\\(\\frac{" + n + "}{" + d + "}\\)";
}
function u3tFracInner(n, d) { return "\\frac{" + n + "}{" + d + "}"; }
var u3tFracs = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [2, 7], [3, 7], [1, 8], [3, 8]];
var u3tFracsSmall = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5], [3, 5]];

E("u3-repeated-product-form", 3, ["3.6"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, powerInner, altFactor, altFb;
  var e = ri(2, 4);
  if (mode === "neg") {
    var b = ri(2, 9);
    factor = "(-" + b + ")";
    powerInner = "(-" + b + ")^{" + e + "}";
    altFactor = "(" + b + ")";
    altFb = "Cela enlève le signe négatif de chaque facteur. La base est négative.";
  } else if (mode === "frac") {
    var f = pick(u3tFracs);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    powerInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f[1], f[0]) + ")";
    altFb = "Cela échange le numérateur et le dénominateur de la base.";
  } else {
    var f2 = pick(u3tFracsSmall);
    e = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    powerInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + e + "}";
    altFactor = "(" + u3tFracInner(f2[0], f2[1]) + ")";
    altFb = "Cela enlève le signe négatif de chaque facteur. La base est négative.";
  }
  var correct = u3tMult(factor, e);
  var pool = [
    { t: u3tMult(factor, e + 1), fb: "Cela utilise un facteur de trop. Compte l'exposant." },
    { t: u3tMult(factor, e - 1), fb: "Cela utilise un facteur de moins. Compte l'exposant." },
    { t: u3tMult(altFactor, e), fb: altFb },
    { t: "\\(" + factor + "\\times " + e + "\\)", fb: "Cela multiplie la base par l'exposant une seule fois. Une puissance répète la base comme facteur." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) { if (!seen[pool[i].t]) { seen[pool[i].t] = 1; ds.push(pool[i]); } }
  var stem = pick([
    "Comment écrit-on \\(" + powerInner + "\\) comme multiplication répétée ?",
    "Quelle multiplication répétée est égale à \\(" + powerInner + "\\)?",
    "Exprime \\(" + powerInner + "\\) comme multiplication répétée. Quel choix le montre ?"
  ]);
  return mcq(stem,
    { t: correct, fb: "Exact. Toute la base, signe compris, se répète autant de fois que l'exposant l'indique." }, ds,
    "La base est \\(" + factor + "\\) et l'exposant est \\(" + e + "\\), donc écris la base comme facteur \\(" + e + "\\) fois : \\[ \\begin{aligned} " + powerInner + " &= " + correct.replace("\\(", "").replace("\\)", "") + " \\end{aligned} \\] Donc la multiplication répétée est <b>" + correct + "</b>.",
    { mode: "topup-repeated-" + mode, e: e });
}, ["L'exposant te dit combien de fois toute la base apparaît comme facteur.", "Écris la base exactement comme elle apparaît, parenthèses et signe compris, puis répète-la."]);

E("u3-power-from-product", 3, ["3.7"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "frac", "frac", "negfrac"]);
  var factor, correctInner, ds;
  if (mode === "neg") {
    var b = ri(2, 9), c = ri(2, 5);
    while (b === c) { b = ri(2, 9); }
    factor = "(-" + b + ")";
    correctInner = "(-" + b + ")^{" + c + "}";
    ds = [
      { t: "\\((-" + c + ")^{" + b + "}\\)", fb: "Cela échange la valeur de la base et le nombre de facteurs." },
      { t: "\\(" + b + "^{" + c + "}\\)", fb: "Cela enlève le signe négatif de la base." },
      { t: "\\((-" + b + ")^{" + (c + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." }
    ];
  } else if (mode === "frac") {
    var f = pick(u3tFracs), c2 = ri(2, 4);
    factor = "(" + u3tFracInner(f[0], f[1]) + ")";
    correctInner = "(" + u3tFracInner(f[0], f[1]) + ")^{" + c2 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f[1], f[0]) + ")^{" + c2 + "}\\)", fb: "Cela échange le numérateur et le dénominateur de la base." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { t: "\\((" + u3tFracInner(f[0], f[1]) + ")^{" + (c2 - 1) + "}\\)", fb: "Cela soustrait un de l'exposant. Compte les facteurs montrés." }
    ];
    var cc = c2;
  } else {
    var f2 = pick(u3tFracsSmall), c3 = ri(2, 3);
    factor = "(-" + u3tFracInner(f2[0], f2[1]) + ")";
    correctInner = "(-" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}";
    ds = [
      { t: "\\((" + u3tFracInner(f2[0], f2[1]) + ")^{" + c3 + "}\\)", fb: "Cela enlève le signe négatif de la base." },
      { t: "\\((-" + u3tFracInner(f2[0], f2[1]) + ")^{" + (c3 + 1) + "}\\)", fb: "Cela ajoute un à l'exposant. Compte les facteurs montrés." },
      { t: "\\((-" + u3tFracInner(f2[1], f2[0]) + ")^{" + c3 + "}\\)", fb: "Cela échange le numérateur et le dénominateur de la base." }
    ];
    var cc2 = c3;
  }
  var count = (mode === "neg") ? c : (mode === "frac" ? cc : cc2);
  var shown = u3tMult(factor, count);
  var stem = pick([
    "Comment écrit-on " + shown + " comme une seule puissance ?",
    "Quelle puissance unique est égale à " + shown + " ?",
    "Exprime " + shown + " comme une seule puissance. Quel choix le montre ?"
  ]);
  return mcq(stem,
    { t: "\\(" + correctInner + "\\)", fb: "Exact. Le facteur répété est la base et le nombre de facteurs est l'exposant." }, ds,
    "Il y a \\(" + count + "\\) facteurs, et chaque facteur est \\(" + factor + "\\), donc la puissance est \\(" + correctInner + "\\). \\[ \\begin{aligned} " + shown.replace("\\(", "").replace("\\)", "") + " &= " + correctInner + " \\end{aligned} \\] Donc la puissance unique est <b>\\(" + correctInner + "\\)</b>.",
    { mode: "topup-from-product-" + mode, count: count });
}, ["Compte d'abord les facteurs. Ce nombre devient l'exposant.", "Écris le facteur répété exactement comme base, signe compris, puis utilise ton nombre comme exposant."]);

E("u3-evaluate-power-neg", 3, ["3.10"], 1, "gen", function () {
  var mode = pick(["neg", "neg", "one", "negone", "frac"]);
  var stemVerb = pick(["Calcule", "Que vaut", "Trouve la valeur de"]);
  if (mode === "frac") {
    var f = pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [1, 5], [5, 6], [3, 8]]);
    var e = ri(2, 3);
    var vn = Math.pow(f[0], e), vd = Math.pow(f[1], e);
    var correct = u3tFracOpt(vn, vd);
    var poolF = [
      { n: -vn, d: vd, fb: "Cela a le mauvais signe. La base est positive, donc la valeur est positive." },
      { n: Math.pow(f[0], e), d: f[1], fb: "Cela élève seulement le numérateur de la fraction à la puissance. Le dénominateur est élevé aussi." },
      { n: f[0], d: Math.pow(f[1], e), fb: "Cela élève seulement le dénominateur de la fraction à la puissance. Le numérateur est élevé aussi." },
      { n: f[0] * e, d: f[1], fb: "Cela multiplie la base par l'exposant. Une puissance répète la base comme facteur." },
      { n: vd, d: vn, fb: "Cela retourne la fraction. Garde le numérateur et le dénominateur en place." }
    ];
    var dsF = [], seenF = {}; seenF[u3tRed(vn, vd).join("/")] = 1;
    for (var i = 0; i < poolF.length && dsF.length < 3; i++) {
      var key = u3tRed(poolF[i].n, poolF[i].d).join("/");
      if (!seenF[key]) { seenF[key] = 1; dsF.push({ t: u3tFracOpt(poolF[i].n, poolF[i].d), fb: poolF[i].fb }); }
    }
    var shownF = "(" + u3tFracInner(f[0], f[1]) + ")^{" + e + "}";
    return mcq(stemVerb + " \\(" + shownF + "\\).",
      { t: correct, fb: "Exact. Le numérateur et le dénominateur de la fraction sont tous les deux élevés à la puissance." }, dsF,
      "Élève le numérateur et le dénominateur séparément : \\[ \\begin{aligned} " + shownF + " &= \\frac{" + f[0] + "^{" + e + "}}{" + f[1] + "^{" + e + "}} \\\\ &= \\frac{" + vn + "}{" + vd + "} \\end{aligned} \\] Donc la valeur est <b>" + correct + "</b>.",
      { mode: "topup-eval-frac", n: f[0], d: f[1], e: e });
  }
  var base, e2, val, shown;
  if (mode === "neg") { var b = ri(2, 9); e2 = ri(2, 5); base = -b; val = Math.pow(-b, e2); shown = "(-" + b + ")^{" + e2 + "}"; }
  else if (mode === "one") { base = 1; e2 = ri(2, 9); val = 1; shown = "1^{" + e2 + "}"; }
  else { base = -1; e2 = ri(2, 12); val = (e2 % 2 === 0) ? 1 : -1; shown = "(-1)^{" + e2 + "}"; }
  var pool = [
    { v: -val, fb: "Cela a le signe opposé. Compte combien de facteurs négatifs sont multipliés." },
    { v: base * e2, fb: "Cela multiplie la base par l'exposant. Une puissance répète la base comme facteur." },
    { v: 0, fb: "Cela donne zéro. Une puissance d'une base non nulle n'est jamais zéro ici." },
    { v: val + base, fb: "C'est proche, mais faux. Développe la puissance en multiplication répétée." },
    { v: -Math.abs(val), fb: "Cela force une réponse négative. Un nombre pair de facteurs négatifs donne un produit positif." },
    { v: Math.abs(val), fb: "Cela enlève le signe. Un nombre impair de facteurs négatifs donne un produit négatif." },
    { v: base + e2, fb: "Cela additionne la base et l'exposant. Utilise la multiplication répétée." }
  ];
  var ds = [], seen = {}; seen[String(val)] = 1;
  for (var j = 0; j < pool.length && ds.length < 3; j++) { if (!seen[String(pool[j].v)]) { seen[String(pool[j].v)] = 1; ds.push({ t: fmtD(pool[j].v), fb: pool[j].fb }); } }
  var factors = [];
  for (var k = 0; k < Math.min(e2, 5); k++) factors.push("(" + base + ")");
  var expand = (e2 > 5) ? "(" + base + ")\\times (" + base + ")\\times \\cdots \\times (" + base + ")" : factors.join("\\times ");
  var signNote = (mode === "one") ? "Chaque facteur est 1, donc le produit reste 1." : ((e2 % 2 === 0) ? "L'exposant est pair, donc les facteurs négatifs se regroupent en un produit positif." : "L'exposant est impair, donc il reste un facteur négatif et le produit est négatif.");
  return mcq(stemVerb + " \\(" + shown + "\\).",
    { t: fmtD(val), fb: "Exact. Tu as développé la puissance et bien géré le signe." }, ds,
    signNote + " \\[ \\begin{aligned} " + shown + " &= " + expand + " \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(val) + "</b>.",
    { mode: "topup-eval-" + mode, base: base, e: e2 });
}, ["Développe d'abord la puissance en multiplication répétée, et surveille le signe de chaque facteur.", "Multiplie la base par elle-même, en utilisant l'exposant comme nombre de fois, puis règle le signe."]);

function u3tGrid(rows, cols) {
  var sp = 26, pad = 16;
  var w = (cols - 1) * sp + 2 * pad, h = (rows - 1) * sp + 2 * pad;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
    s += '<circle cx="' + (pad + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
  }
  return s + '</svg>';
}
function u3tLayers(a) {
  var sp = 26, pad = 16, gap = 24;
  var gw = (a - 1) * sp;
  var w = 2 * pad + a * gw + (a - 1) * gap;
  var h = 2 * pad + gw + 26;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img">';
  for (var L = 0; L < a; L++) {
    var x0 = pad + L * (gw + gap);
    for (var r = 0; r < a; r++) for (var c = 0; c < a; c++) {
      s += '<circle cx="' + (x0 + c * sp) + '" cy="' + (pad + r * sp) + '" r="7" fill="#17352a"/>';
    }
  }
  s += '<text x="' + (w / 2) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="13" fill="#17352a">' + a + ' couches, chacune de ' + a + ' par ' + a + '</text>';
  return s + '</svg>';
}
function u3tFig(q, fig) { q.figure = fig; return q; }
function u3tPowOpt(a, e) { return "\\(" + a + "^{" + e + "}\\)"; }

E("u3-power-model-var", 3, ["3.4"], 1, "var", varset([
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(3, 2), fb: "Exact. Le côté a 3 points et la grille a 2 dimensions." },
      [
        { t: u3tPowOpt(2, 3), fb: "Cela échange la base et l'exposant. Le nombre de points sur un côté est la base." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise aussi 3 comme exposant. Une grille plate a 2 dimensions." },
        { t: u3tPowOpt(3, 1), fb: "Cela utilise l'exposant 1. Une grille est faite de deux dimensions égales." }
      ],
      "Compte les points le long d'un côté et compte les dimensions : \\[ \\begin{aligned} \\text{côté} &= 3 \\text{ points} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] La base est le nombre de points sur un côté, 3, et l'exposant est le nombre de dimensions, 2. Donc le modèle montre <b>\\(3^{2}\\)</b>.",
      { mode: "model-grid-3" });
    return u3tFig(q, u3tGrid(3, 3));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(4, 2), fb: "Exact. Le côté a 4 points et la grille a 2 dimensions." },
      [
        { t: u3tPowOpt(2, 4), fb: "Cela échange la base et l'exposant. Le nombre de points sur un côté est la base." },
        { t: u3tPowOpt(4, 3), fb: "Cela utilise l'exposant 3, ce qui demanderait des couches. Ce modèle est une seule grille plate." },
        { t: u3tPowOpt(4, 1), fb: "Cela utilise l'exposant 1. Une grille est faite de deux dimensions égales." }
      ],
      "Compte les points le long d'un côté et compte les dimensions : \\[ \\begin{aligned} \\text{côté} &= 4 \\text{ points} \\\\ \\text{dimensions} &= 2 \\end{aligned} \\] La base est le nombre de points sur un côté, 4, et l'exposant est le nombre de dimensions, 2. Donc le modèle montre <b>\\(4^{2}\\)</b>.",
      { mode: "model-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(2, 3), fb: "Exact. Chaque couche est de 2 par 2 et il y a 2 couches, ce qui donne la base 2 avec 3 dimensions en tout." },
      [
        { t: u3tPowOpt(3, 2), fb: "Cela échange la base et l'exposant. Le côté d'une couche est la base." },
        { t: u3tPowOpt(2, 2), fb: "Cela compte une seule couche plate. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise 3 comme base. Chaque couche ici est de 2 par 2, pas de 3 par 3." }
      ],
      "Lis la base à partir d'une couche et l'exposant à partir de la construction complète : \\[ \\begin{aligned} \\text{côté de la couche} &= 2 \\text{ points} \\\\ \\text{couches} &= 2, \\text{ chacune de } 2 \\text{ par } 2 \\end{aligned} \\] La base est le nombre de points le long d'un côté d'une couche, 2, et l'exposant compte les dimensions, 3 en tout. Donc le modèle montre <b>\\(2^{3}\\)</b>.",
      { mode: "model-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Quelle puissance ce modèle montre-t-il ?",
      { t: u3tPowOpt(3, 3), fb: "Exact. Chaque couche est de 3 par 3 et il y a 3 couches." },
      [
        { t: u3tPowOpt(3, 2), fb: "Cela compte une seule couche plate. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(2, 3), fb: "Cela utilise 2 comme base. Chaque couche ici est de 3 par 3, pas de 2 par 2." },
        { t: u3tPowOpt(3, 1), fb: "Cela utilise l'exposant 1. La construction utilise trois dimensions en tout." }
      ],
      "Lis la base à partir d'une couche et l'exposant à partir de la construction complète : \\[ \\begin{aligned} \\text{côté de la couche} &= 3 \\text{ points} \\\\ \\text{couches} &= 3, \\text{ chacune de } 3 \\text{ par } 3 \\end{aligned} \\] La base est le nombre de points le long d'un côté d'une couche, 3, et l'exposant compte les dimensions, 3 en tout. Donc le modèle montre <b>\\(3^{3}\\)</b>.",
      { mode: "model-cube-3" });
    return u3tFig(q, u3tLayers(3));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance carrée est représentée par une grille, avec la base comme nombre de points le long d'un côté et l'exposant 2 comme les deux dimensions de la grille, les rangées et les colonnes. Combien de points y a-t-il dans ce modèle en tout ?",
      { t: "16", fb: "Exact. La grille est de 4 par 4, et 4 fois 4 donne 16." },
      [
        { t: "8", fb: "Cela additionne les longueurs des côtés, 4 plus 4. Multiplie-les pour compter la grille." },
        { t: "4", fb: "Cela compte un seul côté. Compte chaque rangée de la grille." },
        { t: "12", fb: "Cela compte 3 rangées de 4. La grille a 4 rangées complètes." }
      ],
      "La grille a 4 rangées avec 4 points dans chaque rangée : \\[ \\begin{aligned} \\text{total} &= 4\\times 4 \\\\ &= 16 \\end{aligned} \\] La base, 4, est le nombre de points sur un côté, et l'exposant, 2, est le nombre de dimensions multipliées. Donc le total est <b>16</b> points.",
      { mode: "model-total-grid-4" });
    return u3tFig(q, u3tGrid(4, 4));
  },
  function () {
    var q = mcq("Convention du modèle de points : une puissance cubique est représentée par des couches carrées identiques dessinées côte à côte, avec la base comme côté de chaque couche et l'exposant 3 comme le nombre de couches. Combien de points y a-t-il dans ce modèle en tout ?",
      { t: "8", fb: "Exact. Il y a 2 couches avec 4 points chacune, et 2 fois 4 donne 8." },
      [
        { t: "6", fb: "Cela additionne 2 et 4. Multiplie les points par couche par le nombre de couches." },
        { t: "4", fb: "Cela compte une seule couche. Il y a 2 couches dans le modèle." },
        { t: "12", fb: "Cela compte 3 couches de 4. Le modèle a 2 couches." }
      ],
      "Chaque couche contient 2 par 2 points et il y a 2 couches : \\[ \\begin{aligned} \\text{total} &= 2\\times (2\\times 2) \\\\ &= 8 \\end{aligned} \\] La base, 2, est le nombre de points sur un côté d'une couche, et l'exposant, 3, compte les dimensions multipliées. Donc le total est <b>8</b> points.",
      { mode: "model-total-cube-2" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Un élève essaie de représenter \\(3^{2}\\) avec les conventions du modèle de points : une puissance carrée est une grille plate, et une puissance cubique est des couches carrées identiques dessinées côte à côte. Le modèle construit par l'élève est montré. Quelle puissance le modèle montre-t-il en réalité ?",
      { t: u3tPowOpt(2, 3), fb: "Exact. Les couches en font une puissance cubique de base 2, pas une puissance carrée de base 3." },
      [
        { t: u3tPowOpt(3, 2), fb: "C'est la puissance que l'élève voulait. Lis le modèle lui-même : il a des couches, pas une seule grille plate." },
        { t: u3tPowOpt(2, 2), fb: "Cela compte une seule couche. Les couches côte à côte ajoutent la troisième dimension." },
        { t: u3tPowOpt(3, 3), fb: "Cela utilise 3 comme base. Chaque couche ici est de 2 par 2, pas de 3 par 3." }
      ],
      "Lis le modèle selon ses propres termes : \\[ \\begin{aligned} \\text{côté de la couche} &= 2 \\text{ points} \\\\ \\text{couches} &= 2, \\text{ chacune de } 2 \\text{ par } 2 \\end{aligned} \\] La base est le côté d'une couche, 2, et l'exposant est 3 parce que la construction a trois dimensions. Donc le modèle montre en réalité <b>\\(2^{3}\\)</b>.",
      { mode: "model-interchanged-cube" });
    return u3tFig(q, u3tLayers(2));
  },
  function () {
    var q = mcq("Un élève essaie de représenter \\(2^{3}\\) avec les conventions du modèle de points : une puissance carrée est une grille plate, et une puissance cubique est des couches carrées identiques dessinées côte à côte. Le modèle construit par l'élève est montré. Qu'est-ce que l'élève a confondu ?",
      { t: "La base et l'exposant ont été échangés : le modèle montre \\(3^{2}\\), une grille plate de 3 par 3", fb: "Exact. Une grille plate de côté 3 est la puissance carrée 3 au carré." },
      [
        { t: "Les points ont été mal comptés : le modèle montre \\(2^{3}\\) avec 9 points dans chaque couche", fb: "Cela garde la puissance voulue. Le modèle est une seule grille plate, et chaque côté a 3 points." },
        { t: "Il manque une couche : ajouter une couche à cette grille compléterait le modèle de \\(2^{3}\\)", fb: "Cela traite la grille comme une couche du cube. Son côté est 3, donc elle ne peut pas être une couche d'une puissance de base 2." },
        { t: "Le modèle est correct tel quel : une grille plate de 3 par 3 est le modèle standard de \\(2^{3}\\)", fb: "Cela accepte l'échange. Une puissance cubique demande des couches, et cette grille a un côté de 3, pas de 2." }
      ],
      "Lis le modèle selon ses propres termes : \\[ \\begin{aligned} \\text{côté de la grille} &= 3 \\text{ points} \\\\ \\text{couches} &= 1 \\text{ grille plate} \\end{aligned} \\] La base est le nombre de points sur un côté, 3, et une grille plate a l'exposant 2, donc le modèle montre \\(3^{2}\\). L'élève a échangé la base et l'exposant. Donc l'énoncé correct est <b>La base et l'exposant ont été échangés : le modèle montre \\(3^{2}\\), une grille plate de 3 par 3</b>.",
      { mode: "model-interchanged-grid" });
    return u3tFig(q, u3tGrid(3, 3));
  }
]), ["Lis d'abord la base à partir des points le long d'un côté ou d'une couche.", "Compte ensuite les dimensions : une grille plate en a deux, une construction en couches en a trois."]);

E("u3-zero-pattern", 3, ["3.9"], 1, "gen", function () {
  var mode = pick(["int", "int", "frac", "neg"]);
  var lines = [], baseTxt, lastStep, baseOpt, recipOpt;
  if (mode === "int") {
    var a = ri(2, 9), s = pick([3, 4, 5]);
    for (var k = s; k >= 1; k--) lines.push("\\(" + a + "^{" + k + "}=" + fmtD(Math.pow(a, k)) + "\\)");
    baseTxt = a + "";
    lastStep = a + "^{1}\\div " + a + " &= " + a + "\\div " + a + " \\\\ &= 1";
    baseOpt = fmtD(a);
    recipOpt = "\\(\\frac{1}{" + a + "}\\)";
  } else if (mode === "neg") {
    var a2 = ri(2, 6), s2 = pick([3, 4, 5]);
    for (var k2 = s2; k2 >= 1; k2--) lines.push("\\((-" + a2 + ")^{" + k2 + "}=" + fmtD(Math.pow(-a2, k2)) + "\\)");
    baseTxt = "(-" + a2 + ")";
    lastStep = "(-" + a2 + ")^{1}\\div (-" + a2 + ") &= (-" + a2 + ")\\div (-" + a2 + ") \\\\ &= 1";
    baseOpt = fmtD(-a2);
    recipOpt = "\\(-\\frac{1}{" + a2 + "}\\)";
  } else {
    var f = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5], [1, 6], [5, 6]]);
    var s3 = pick([3, 4]);
    for (var k3 = s3; k3 >= 1; k3--) lines.push("\\((" + u3tFracInner(f[0], f[1]) + ")^{" + k3 + "}=" + u3tFracInner(Math.pow(f[0], k3), Math.pow(f[1], k3)) + "\\)");
    baseTxt = "(" + u3tFracInner(f[0], f[1]) + ")";
    lastStep = "(" + u3tFracInner(f[0], f[1]) + ")^{1}\\div (" + u3tFracInner(f[0], f[1]) + ") &= " + u3tFracInner(f[0], f[1]) + "\\div " + u3tFracInner(f[0], f[1]) + " \\\\ &= 1";
    baseOpt = u3tFracOpt(f[0], f[1]);
    recipOpt = u3tFracOpt(f[1], f[0]);
  }
  var prompt = pick([
    "Une régularité pour la base \\(" + baseTxt + "\\) est montrée. Chaque étape vers le bas divise par la base.<br>" + lines.join("<br>") + "<br>Quelle est la valeur de \\(" + baseTxt + "^{0}\\) qui continue la régularité ?",
    "Les puissances de \\(" + baseTxt + "\\) ci-dessous suivent une régularité, et chaque valeur est celle du dessus divisée par la base.<br>" + lines.join("<br>") + "<br>En suivant la régularité une étape de plus, que vaut \\(" + baseTxt + "^{0}\\)?",
    "Lis la régularité pour la base \\(" + baseTxt + "\\) de haut en bas. Chaque étape divise par la base.<br>" + lines.join("<br>") + "<br>Quelle valeur la régularité donne-t-elle pour \\(" + baseTxt + "^{0}\\)?"
  ]);
  return mcq(prompt,
    { t: "1", fb: "Exact. Diviser la valeur de la puissance d'exposant 1 par la base une fois de plus donne un." },
    [
      { t: "0", fb: "Cela traite l'exposant zéro comme s'il donnait zéro. Suis la régularité de division une étape plus bas." },
      { t: baseOpt, fb: "C'est la base elle-même, la valeur de la puissance d'exposant 1. Divise-la par la base une fois de plus." },
      { t: recipOpt, fb: "Cela divise une fois de trop, ou divise dans le mauvais sens. Une division à partir de la valeur de la puissance d'exposant 1 donne un." }
    ],
    "Chaque étape vers le bas divise par la base, donc continue à partir de la puissance d'exposant 1 : \\[ \\begin{aligned} " + lastStep + " \\end{aligned} \\] Donc la valeur qui continue la régularité est <b>1</b>.",
    { mode: "topup-zero-" + mode });
}, ["Observe ce qui arrive à la valeur chaque fois que l'exposant diminue de un.", "Prends la valeur de la puissance d'exposant 1 et divise-la par la base."]);

E("u3-paren-powers-set", 3, ["3.8"], 1, "gen", function () {
  var b = ri(2, 5), e = ri(2, 4);
  var forms = [
    { txt: "(-" + b + ")^{" + e + "}", val: Math.pow(-b, e) },
    { txt: "(-" + b + "^{" + e + "})", val: -Math.pow(b, e) },
    { txt: "-" + b + "^{" + e + "}", val: -Math.pow(b, e) }
  ];
  var order = shuffle([0, 1, 2]);
  var shownForms = order.map(function (i) { return forms[i]; });
  var listTxt = shownForms.map(function (f, i) { return "Forme " + (i + 1) + " : \\(" + f.txt + "\\)"; }).join("<br>");
  var mode = (e % 2 === 0 && Math.random() < 0.45) ? "pair" : "triple";
  if (mode === "pair") {
    function pairTxt(i, j) { return "\\(" + shownForms[i].txt + "\\) et \\(" + shownForms[j].txt + "\\)"; }
    var eqPair = null;
    for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) { if (shownForms[i].val === shownForms[j].val) eqPair = [i, j]; }
    var pairs = [[0, 1], [0, 2], [1, 2]];
    var dsP = pairs.filter(function (p) { return !(p[0] === eqPair[0] && p[1] === eqPair[1]); }).map(function (p) {
      return { t: pairTxt(p[0], p[1]), fb: "Ces deux formes ont des valeurs différentes. Vérifie quelles formes gardent le signe négatif à l'extérieur de la puissance." };
    });
    dsP.push({ t: "Les trois formes ont la même valeur", fb: "Ce n'est pas le cas ici. La forme entre parenthèses a une valeur différente des deux autres." });
    return mcq("Trois formes sont montrées.<br>" + listTxt + "<br>Quelles deux formes ont la même valeur ?",
      { t: pairTxt(eqPair[0], eqPair[1]), fb: "Exact. Dans les deux formes, la puissance est calculée d'abord et le signe négatif reste à l'extérieur." }, dsP,
      "Calcule chaque forme : \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmtD(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] Les deux formes qui ont la même valeur sont <b>" + pairTxt(eqPair[0], eqPair[1]) + "</b>.",
      { mode: "topup-paren-pair", b: b, e: e });
  }
  var vals = shownForms.map(function (f) { return f.val; });
  function trip(v) { return "\\(" + v.map(function (x) { return fmtD(x); }).join(", ") + "\\)"; }
  var poolT = [
    { v: [-vals[0], vals[1], vals[2]], fb: "Cela change le signe de la première forme. Vérifie ce que ses parenthèses couvrent." },
    { v: [vals[0], -vals[1], vals[2]], fb: "Cela change le signe de la deuxième forme. Vérifie où se trouve son signe négatif." },
    { v: [vals[0], vals[1], -vals[2]], fb: "Cela change le signe de la troisième forme. Vérifie où se trouve son signe négatif." },
    { v: [-vals[0], -vals[1], -vals[2]], fb: "Cela change tous les signes. Calcule d'abord la forme entre parenthèses toute seule." },
    { v: [Math.abs(vals[0]), Math.abs(vals[1]), Math.abs(vals[2])], fb: "Cela enlève tous les signes négatifs. Certaines formes gardent une valeur négative." },
    { v: [vals[1], vals[0], vals[2]], fb: "Cela échange les deux premières valeurs. Garde les valeurs dans l'ordre où les formes sont montrées." }
  ];
  var dsT = [], seenT = {}; seenT[trip(vals)] = 1;
  for (var t = 0; t < poolT.length && dsT.length < 3; t++) { var tt = trip(poolT[t].v); if (!seenT[tt]) { seenT[tt] = 1; dsT.push({ t: tt, fb: poolT[t].fb }); } }
  return mcq("Trois formes sont montrées.<br>" + listTxt + "<br>Quelles sont les valeurs des trois formes, dans l'ordre montré ?",
    { t: trip(vals), fb: "Exact. Tu as vérifié ce que les parenthèses couvrent dans chaque forme." }, dsT,
    "Calcule chaque forme à tour de rôle : \\[ \\begin{aligned} " + shownForms.map(function (f) { return f.txt + " &= " + fmtD(f.val); }).join(" \\\\ ") + " \\end{aligned} \\] Dans la forme entre parenthèses, la valeur négative est la base. Dans les deux autres formes, la puissance est calculée d'abord et le signe négatif reste à l'extérieur. Donc les valeurs, dans l'ordre, sont <b>" + trip(vals) + "</b>.",
    { mode: "topup-paren-triple", b: b, e: e });
}, ["Regarde chaque forme séparément et détermine quelle est sa base.", "Calcule la première forme en la développant, puis fais la même chose pour les deux autres."]);

E("u3-two-laws-context", 3, ["3.12"], 2, "gen", function () {
  var fam = pick(["prodquot", "powprod"]);
  if (fam === "prodquot") {
    var a = ri(2, 5), m = ri(2, 3), n = ri(2, 3), p = ri(1, 2);
    var tot = m + n - p, val = Math.pow(a, tot);
    var ctx = pick([
      "Un parterre de jardin rectangulaire mesure \\(" + a + "^{" + m + "}\\) mètres de long et \\(" + a + "^{" + n + "}\\) mètres de large. Son aire est le produit des deux longueurs. Le parterre est partagé également entre \\(" + a + "^{" + p + "}\\) jardiniers. Combien de mètres carrés chaque jardinier reçoit-il ?",
      "Une section de plancher utilise \\(" + a + "^{" + m + "}\\) carreaux dans chaque rangée et a \\(" + a + "^{" + n + "}\\) rangées en tout. Tous les carreaux sont rangés également dans \\(" + a + "^{" + p + "}\\) boîtes. Combien de carreaux y a-t-il dans chaque boîte ?",
      "Une imprimerie fait \\(" + a + "^{" + m + "}\\) cartes sur chaque feuille et imprime \\(" + a + "^{" + n + "}\\) feuilles. Les cartes sont groupées également en \\(" + a + "^{" + p + "}\\) paquets. Combien de cartes y a-t-il dans chaque paquet ?"
    ]);
    return numq(ctx, val, 0,
      "Multiplie d'abord avec la loi du produit, puis divise avec la loi du quotient : \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "}\\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} \\\\ &= " + fmtD(val) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(val) + "</b>.",
      { mode: "topup-context-prodquot", a: a, m: m, n: n, p: p });
  }
  var a2 = ri(2, 4), m2 = ri(2, 3), p2 = ri(1, 3);
  var tot2 = 2 * m2 + p2, val2 = Math.pow(a2, tot2);
  if (val2 > 90000) { p2 = 1; tot2 = 2 * m2 + p2; val2 = Math.pow(a2, tot2); }
  var ctx2 = pick([
    "Chaque jardinière carrée a des côtés de \\(" + a2 + "^{" + m2 + "}\\) mètres, donc l'aire d'une jardinière est le carré de son côté. Un parc a \\(" + a2 + "^{" + p2 + "}\\) jardinières identiques. Quelle est l'aire de la surface de toutes les jardinières, en mètres carrés ?",
    "Chaque autocollant carré a des côtés de \\(" + a2 + "^{" + m2 + "}\\) centimètres, donc l'aire d'un autocollant est le carré de son côté. Une feuille contient \\(" + a2 + "^{" + p2 + "}\\) autocollants identiques. Quelle est l'aire de la surface de tous les autocollants, en centimètres carrés ?",
    "Chaque parcelle de jardin carrée a des côtés de \\(" + a2 + "^{" + m2 + "}\\) mètres, donc l'aire d'une parcelle est le carré de son côté. Une école a \\(" + a2 + "^{" + p2 + "}\\) parcelles identiques. Quelle est l'aire de la surface de toutes les parcelles, en mètres carrés ?"
  ]);
  return numq(ctx2, val2, 0,
    "Mets le côté au carré avec la loi de la puissance d'une puissance, puis multiplie avec la loi du produit : \\[ \\begin{aligned} (" + a2 + "^{" + m2 + "})^{2} &= " + a2 + "^{" + (2 * m2) + "} \\\\ " + a2 + "^{" + (2 * m2) + "}\\times " + a2 + "^{" + p2 + "} &= " + a2 + "^{" + tot2 + "} \\\\ &= " + fmtD(val2) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(val2) + "</b>.",
    { mode: "topup-context-powprod", a: a2, m: m2, p: p2 });
}, ["Transforme d'abord le contexte en puissances d'une même base, puis choisis les lois.", "Écris le total comme un produit ou un quotient de puissances avant de calculer quoi que ce soit."]);

E("u3-laws-mixed-eval", 3, ["3.12"], 3, "gen", function () {
  var tuples = [];
  var A, B, N, P, Q, val;
  for (A = 2; A <= 4; A++) for (B = 2; B <= 4; B++) for (N = 2; N <= 3; N++) for (P = 1; P <= N; P++) for (Q = 1; Q <= N; Q++) {
    val = Math.pow(A, N - P) * Math.pow(B, N - Q);
    if (val > 1 && val < 100000) tuples.push({ kind: "prodquot", a: A, b: B, n: N, p: P, q: Q, val: val });
  }
  for (B = 2; B <= 4; B++) for (var C = 2; C <= 4; C++) for (N = 2; N <= 3; N++) for (P = 1; P < N; P++) {
    var big = B * C;
    val = Math.pow(big, N - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "quotprod", big: big, b: B, c: C, n: N, p: P, val: val });
  }
  for (A = 2; A <= 4; A++) for (B = 2; B <= 3; B++) for (P = 2; P <= 3; P++) {
    val = Math.pow(A * B, 4 - P);
    if (val > 1 && val < 100000) tuples.push({ kind: "powpow", a: A, b: B, p: P, val: val });
  }
  var t = pick(tuples);
  if (t.kind === "prodquot") {
    var expr = "\\frac{(" + t.a + "\\times " + t.b + ")^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}}";
    return numq("Calcule \\(" + expr + "\\).", t.val, 0,
      "Commence par la puissance d'un produit, puis utilise la loi du quotient sur chaque base : \\[ \\begin{aligned} " + expr + " &= \\frac{" + t.a + "^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.a + "^{" + t.p + "}\\times " + t.b + "^{" + t.q + "}} \\\\ &= " + t.a + "^{" + (t.n - t.p) + "}\\times " + t.b + "^{" + (t.n - t.q) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
      { mode: "topup-mixed-prodquot", a: t.a, b: t.b, n: t.n, p: t.p, q: t.q });
  }
  if (t.kind === "quotprod") {
    var expr2 = "\\frac{(" + t.big + "\\div " + t.b + ")^{" + t.n + "}\\times " + t.b + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}}";
    return numq("Calcule \\(" + expr2 + "\\).", t.val, 0,
      "Commence par la puissance d'un quotient, puis termine avec les lois du produit et du quotient : \\[ \\begin{aligned} " + expr2 + " &= \\frac{" + t.big + "^{" + t.n + "}}{" + t.big + "^{" + t.p + "}} \\\\ &= " + t.big + "^{" + (t.n - t.p) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
      { mode: "topup-mixed-quotprod", big: t.big, b: t.b, n: t.n, p: t.p });
  }
  var expr3 = "\\frac{((" + t.a + "\\times " + t.b + ")^{2})^{2}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}}";
  return numq("Calcule \\(" + expr3 + "\\).", t.val, 0,
    "Commence par la puissance d'une puissance sur la base produit, puis utilise la loi du quotient : \\[ \\begin{aligned} " + expr3 + " &= \\frac{(" + t.a + "\\times " + t.b + ")^{4}}{(" + t.a + "\\times " + t.b + ")^{" + t.p + "}} \\\\ &= (" + t.a + "\\times " + t.b + ")^{" + (4 - t.p) + "} \\\\ &= " + fmtD(t.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(t.val) + "</b>.",
    { mode: "topup-mixed-powpow", a: t.a, b: t.b, p: t.p });
}, ["Divise l'expression en étapes : une loi à la fois, en commençant à l'intérieur des parenthèses.", "Applique d'abord la loi de la puissance d'un produit ou de la puissance d'un quotient, puis combine ce qui reste."]);

E("u3-error-two-laws", 3, ["3.15"], 3, "gen", function () {
  var fam = pick(["prod", "quot"]);
  var a = ri(2, 6), m = ri(2, 4), n = ri(2, 3), p = ri(2, 4);
  if (m === 2 && n === 2) n = 3;
  var err = ri(1, 2);
  var e1ok = m * n;
  var e1 = (err === 1) ? (m + n) : e1ok;
  var ec, e2, opSym, errNote;
  if (fam === "prod") {
    ec = e1ok + p;
    e2 = (err === 1) ? (e1 + p) : (e1ok * p);
    opSym = "\\times ";
    errNote = (err === 1)
      ? "À l'étape 1, les exposants ont été additionnés, mais une puissance d'une puissance multiplie les exposants."
      : "À l'étape 2, les exposants ont été multipliés, mais la loi du produit additionne les exposants.";
  } else {
    if (p >= e1ok) p = e1ok - 1;
    if (err === 1 && p >= e1) p = Math.max(1, e1 - 1);
    ec = e1ok - p;
    e2 = (err === 1) ? (e1 - p) : (e1ok + p);
    opSym = "\\div ";
    errNote = (err === 1)
      ? "À l'étape 1, les exposants ont été additionnés, mais une puissance d'une puissance multiplie les exposants."
      : "À l'étape 2, les exposants ont été additionnés, mais la loi du quotient soustrait les exposants.";
  }
  var expr = "((" + a + "^{" + m + "})^{" + n + "}" + opSym + a + "^{" + p + "})";
  var prompt = "Un élève simplifie \\(" + expr + "\\) en deux étapes. Le calcul contient une erreur.<br>Étape 1 : \\((" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + e1 + "}\\)<br>Étape 2 : \\(" + a + "^{" + e1 + "}" + opSym + a + "^{" + p + "} = " + a + "^{" + e2 + "}\\)<br>Quel est le résultat simplifié correct, comme une seule puissance ?";
  var pool = [
    { v: e2, fb: "C'est le résultat du calcul montré, qui contient l'erreur." },
    { v: (fam === "prod") ? (e1ok - p) : (e1ok + p), fb: "Cela utilise la mauvaise loi à la deuxième étape. Vérifie si l'expression multiplie ou divise." },
    { v: m + n + p, fb: "Cela additionne tous les exposants. Une puissance d'une puissance multiplie ses exposants." },
    { v: ec + 1, fb: "C'est un de trop. Refais les deux étapes de lois avec soin." },
    { v: ec - 1, fb: "C'est un de moins. Refais les deux étapes de lois avec soin." },
    { v: e1ok, fb: "Cela arrête après la première étape. La deuxième loi doit encore être appliquée." }
  ];
  var ds = [], seen = {}; seen[String(ec)] = 1;
  for (var i = 0; i < pool.length && ds.length < 3; i++) {
    if (pool[i].v > 0 && !seen[String(pool[i].v)]) { seen[String(pool[i].v)] = 1; ds.push({ t: "\\(" + a + "^{" + pool[i].v + "}\\)", fb: pool[i].fb }); }
  }
  var step2ok = a + "^{" + e1ok + "}" + opSym + a + "^{" + p + "} &= " + a + "^{" + ec + "}";
  return mcq(prompt,
    { t: "\\(" + a + "^{" + ec + "}\\)", fb: "Exact. Tu as refait les deux étapes de lois et corrigé la loi mal appliquée." }, ds,
    errNote + " Le calcul correct est \\[ \\begin{aligned} ((" + a + "^{" + m + "})^{" + n + "}) &= " + a + "^{" + e1ok + "} \\\\ " + step2ok + " \\end{aligned} \\] Donc le résultat simplifié correct est <b>\\(" + a + "^{" + ec + "}\\)</b>.",
    { mode: "topup-error-" + fam + "-" + err, a: a, m: m, n: n, p: p });
}, ["Refais la simplification toi-même, une loi à la fois, avant de regarder les choix.", "Commence par la puissance d'une puissance, puis applique la deuxième loi à ton propre résultat."]);

