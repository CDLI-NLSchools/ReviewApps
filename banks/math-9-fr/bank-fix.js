// Math 9 (French) pool-gap fill additions question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 6043 to 6684).
// CRMARKS: u1-gap-order-ops-cr=2
// CRMARKS: u1-gap-two-expr-diff-cr=2
// CRMARKS: u1-gap-mean-target-cr=3
// CRMARKS: u1-gap-div-add-cr=3
// CRMARKS: u1-gap-total-change-cr=3
// CRMARKS: u1-gap-brackets-cr=3
// CRMARKS: u2-gap-estimate-gap-cr=2
// CRMARKS: u2-gap-pyramid-slant-cr=3
// CRMARKS: u3-gap-laws-eval-cr=2
// CRMARKS: u3-gap-simplify-sub-cr=2
// CRMARKS: u3-gap-solve-exponent-cr=3
// CRMARKS: u3-gap-sci-product-cr=3
// CRMARKS: u3-gap-growth-excess-cr=3
// CRMARKS: u3-gap-power-diff-cr=3
// CRMARKS: u4-gap-add-eval-cr=2
// CRMARKS: u4-gap-mono-coeff-cr=2
// CRMARKS: u4-gap-area-eval-cr=3
// CRMARKS: u4-gap-sub-eval-neg-cr=3
// CRMARKS: u4-gap-perimeter-eval-cr=3
// CRMARKS: u4-gap-div-eval-cr=3
// CRMARKS: u5-gap-ineq-boundary-cr=2
// CRMARKS: u5-gap-both-sides-cr=2
// CRMARKS: u5-gap-min-items-cr=3
// CRMARKS: u5-gap-solve-eval-cr=3
// CRMARKS: u6-gap-slope-table-cr=2
// CRMARKS: u6-gap-missing-coord-cr=2
// CRMARKS: u6-gap-break-even-cr=3
// CRMARKS: u6-gap-pattern-far-cr=3
// CRMARKS: u6-gap-inverse-cr=3
// CRMARKS: u7-gap-scale-apply-cr=2
// CRMARKS: u7-gap-map-time-cr=2
// CRMARKS: u7-gap-area-scale-cr=3
// CRMARKS: u7-gap-shadow-diff-cr=3
// CRMARKS: u7-gap-perimeter-scale-cr=3
// CRMARKS: u8-gap-reflex-arc-cr=2
// CRMARKS: u8-gap-cyclic-diag-cr=2
// CRMARKS: u8-gap-tangent-central-cr=3
// CRMARKS: u8-gap-chord-bisect-cr=3
// CRMARKS: u8-gap-semicircle-pyth-cr=3
// CRMARKS: u9-gap-freq-mean-cr=2
// CRMARKS: u9-gap-expected-freq-cr=2
// CRMARKS: u9-gap-complement-pct-cr=3
// CRMARKS: u9-gap-mean-diff-cr=3
// CRMARKS: u9-gap-sample-scale-cr=3
// CRMARKS: u9-gap-win-points-cr=3
/* Pool-gap fill, November 9, 2026: new Level 2 entries closing the unit-test
   and exam composition gaps found after the level calibration. CR entries
   always return numq; SR entries always return mcq and stay out of CR_MARKS. */

/* Unit 1: Rational Numbers */

// PG. L2, 6.2, CR 2: signed fraction times a negative decimal, then an addition.
E("u1-gap-order-ops-cr", 1, ["6.2"], 2, "gen", function () {
  var q = pick([2, 4, 5, 8, 10]);
  var p = ri(1, 9);
  var dec = -(ri(2, 12) / 2);
  var add = ri(-30, 30) / 4;
  if (add === 0) add = 1.5;
  var prod = Math.round((p / q) * dec * 10000) / 10000;
  var ans = Math.round((prod + add) * 10000) / 10000;
  var prompt = "Évalue \\(" + FR(p, q) + " \\times (" + fmtD(dec) + ") + " + fmtD(add) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Multiplie d'abord, puis additionne : \\[ \\begin{aligned} " + FR(p, q) + " \\times (" + fmtD(dec) + ") &= " + fmtD(prod, 4) + " \\\\ " + fmtD(prod, 4) + " + " + fmtD(add) + " &= " + fmtD(ans, 4) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-order-ops", p: p, q: q, dec: dec, add: add });
}, ["Suis l'ordre des opérations : la multiplication se termine avant l'addition.", "Change d'abord la fraction en nombre décimal, puis multiplie-la par le nombre décimal négatif."]);

// PG. L2, 6.1, CR 2: evaluate two rational expressions, then give the difference.
E("u1-gap-two-expr-diff-cr", 1, ["6.1"], 2, "gen", function () {
  var d1 = pick([2, 3, 4, 6]), d2 = pick([3, 4, 6, 8]);
  var n1 = ri(1, 7), n2 = ri(1, 7), n3 = ri(1, 7), n4 = ri(1, 7);
  var A = Math.round((n1 / d1 + n2 / d2) * 10000) / 10000;
  var B = Math.round((n3 / d1 - n4 / d2) * 10000) / 10000;
  var ans = Math.round((A - B) * 10000) / 10000;
  var prompt = "L'expression A est \\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\) et l'expression B est \\(" + FR(n3, d1) + " - " + FR(n4, d2) + "\\). Trouve la valeur de A moins B, sous forme décimale.";
  var sol = "Évalue d'abord chaque expression : \\[ \\begin{aligned} A &= " + FR(n1, d1) + " + " + FR(n2, d2) + " = " + fmtD(A, 4) + " \\\\ B &= " + FR(n3, d1) + " - " + FR(n4, d2) + " = " + fmtD(B, 4) + " \\\\ A - B &= " + fmtD(A, 4) + " - " + fmtD(B, 4) + " = " + fmtD(ans, 4) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-two-expr", A: A, B: B });
}, ["Calcule la valeur de chaque expression séparément avant de soustraire.", "Commence par l'expression A : additionne ses deux fractions avec un dénominateur commun."]);

// PG. L2, 6.1, CR 3: mean of signed decimals, then the distance from a target.
E("u1-gap-mean-target-cr", 1, ["6.1"], 2, "gen", function () {
  var t1 = ri(-80, 80), t2 = ri(-80, 80), t3 = ri(-80, 80);
  var rem = (4 - (((t1 + t2 + t3) % 4) + 4) % 4) % 4;
  var t4 = rem + 4 * ri(-18, 18);
  if (t4 < -80 || t4 > 80) t4 = rem;
  var vals = [t1 / 10, t2 / 10, t3 / 10, t4 / 10];
  var mean = (t1 + t2 + t3 + t4) / 40;
  var target = pick([-4, -2, -1, 0, 1, 2, 3, 5]);
  if (Math.abs(mean - target) < 0.5) target = target + 3;
  var ans = Math.round(Math.abs(mean - target) * 100) / 100;
  var prompt = "Quatre températures du matin en degrés sont " + vals.map(function (v) { return fmtD(v); }).join(" ; ") + ". Trouve la distance entre la moyenne des quatre températures et la température cible de " + fmtD(target) + " degrés.";
  var sol = "Additionne les températures et divise par 4 pour obtenir la moyenne, puis mesure la distance jusqu'à la cible : \\[ \\begin{aligned} \\text{moyenne} &= \\frac{" + fmtD(vals[0]) + " + " + fmtD(vals[1]) + " + " + fmtD(vals[2]) + " + " + fmtD(vals[3]) + "}{4} = " + fmtD(mean) + " \\\\ \\text{distance} &= |" + fmtD(mean) + " - " + fmtD(target) + "| = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-target", mean: mean, target: target });
}, ["La moyenne vient d'abord ; la distance se mesure ensuite de cette moyenne jusqu'à la cible.", "Additionne les quatre températures ensemble comme première étape."]);

// PG. L2, 6.1/6.2, CR 3: fraction division (flip), then an unlike-denominator addition.
E("u1-gap-div-add-cr", 1, ["6.1", "6.2"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Évalue \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Divise d'abord en multipliant par l'inverse, puis additionne : \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmtD(quot) + " \\\\ " + fmtD(quot) + " + " + FR(e, f) + " &= " + fmtD(quot) + " + " + fmtD(e / f, 3) + " = " + fmtD(ans, 3) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["La division est le premier travail : inverse le diviseur et multiplie, puis fais l'addition.", "Réécris la division comme une multiplication par l'inverse de la deuxième fraction."]);

// PG. L2, 6.1, CR 3: total of three signed amounts, then the change from a round bill.
E("u1-gap-total-change-cr", 1, ["6.1"], 2, "gen", function () {
  var a1 = ri(300, 2400) / 100, a2 = ri(200, 1800) / 100, disc = ri(100, 800) / 100;
  var total = Math.round((a1 + a2 - disc) * 100) / 100;
  var bill = total <= 30 ? 50 : 100;
  var ans = Math.round((bill - total) * 100) / 100;
  var prompt = "Une cliente achète deux articles au prix de " + fmtDF(a1, 2) + " $ et de " + fmtDF(a2, 2) + " $. Un coupon enlève " + fmtDF(disc, 2) + " $ du total. La cliente paie avec un billet de " + bill + " $. Combien de monnaie la cliente reçoit-elle, en dollars ?";
  var sol = "Trouve d'abord le montant dû, puis soustrais-le du billet : \\[ \\begin{aligned} \\text{total} &= " + fmtDF(a1, 2) + " + " + fmtDF(a2, 2) + " - " + fmtDF(disc, 2) + " = " + fmtDF(total, 2) + " \\\\ \\text{monnaie} &= " + bill + " - " + fmtDF(total, 2) + " = " + fmtDF(ans, 2) + " \\end{aligned} \\] La réponse est <b>" + fmtDF(ans, 2) + " $</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-total-change", total: total, bill: bill });
}, ["La monnaie dépend du total final, alors calcule ce qui est dû avant de soustraire.", "Additionne les deux prix et enlève le coupon comme première étape."]);

// PG. L2, 6.2, CR 3: brackets with signed decimals, then multiply, then add a fraction value.
E("u1-gap-brackets-cr", 1, ["6.2"], 2, "gen", function () {
  var d1 = ri(-40, 60) / 10, d2 = ri(-40, 60) / 10;
  var mult = ri(2, 6);
  var f = pick([2, 4, 8]);
  var e = ri(1, f - 1);
  var inner = Math.round((d1 - d2) * 10) / 10;
  var ans = Math.round((inner * mult + e / f) * 1000) / 1000;
  var prompt = "Évalue \\(((" + fmtD(d1) + ") - (" + fmtD(d2) + ")) \\times " + mult + " + " + FR(e, f) + "\\). Donne ta réponse sous forme décimale.";
  var sol = "Calcule d'abord les parenthèses, puis multiplie, puis additionne : \\[ \\begin{aligned} (" + fmtD(d1) + ") - (" + fmtD(d2) + ") &= " + fmtD(inner) + " \\\\ " + fmtD(inner) + " \\times " + mult + " &= " + fmtD(inner * mult) + " \\\\ " + fmtD(inner * mult) + " + " + fmtD(e / f, 3) + " &= " + fmtD(ans, 3) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-brackets", inner: inner, mult: mult });
}, ["Les parenthèses se calculent avant toute multiplication ou addition à l'extérieur.", "Soustrais les deux nombres décimaux dans les parenthèses comme première étape."]);

/* Unit 2: Square Roots and Surface Area */

// PG. L2, 6.5, CR 2: estimate a square root to 1 decimal place from the closest perfect squares (revised Nov 12, 2026 at Jason's direction: the earlier version also asked for the gap to the perfect square, two asks in one question; now the estimate only, tolerance 0.1, worked solution gives the best estimate).
E("u2-gap-estimate-gap-cr", 2, ["6.5"], 2, "gen", function () {
  var n = u2nonSquare(30, 95);
  var lo = Math.floor(Math.sqrt(n));
  var gapLo = n - lo * lo, gapHi = (lo + 1) * (lo + 1) - n;
  var best = gapLo <= gapHi ? lo : lo + 1;
  var est = Math.round(Math.sqrt(n) * 10) / 10;
  var t1 = Math.round((est - 0.1) * 10) / 10, t2 = Math.round((est + 0.1) * 10) / 10;
  var sq = function (x) { return Math.round(x * x * 100) / 100; };
  var prompt = "Estime \\(\\sqrt{" + n + "}\\). Donne ta réponse au dixième près.";
  var sol = "Les carrés parfaits près de " + n + " sont \\(" + lo + "^{2} = " + (lo * lo) + "\\) et \\(" + (lo + 1) + "^{2} = " + ((lo + 1) * (lo + 1)) + "\\), donc \\(\\sqrt{" + n + "}\\) se situe entre " + lo + " et " + (lo + 1) + ", plus près de " + best + ". En élevant au carré les dixièmes autour de l'estimation : \\[ \\begin{aligned} " + fmtD(t1, 1) + "^{2} &= " + fmtD(sq(t1), 2) + " \\\\ " + fmtD(est, 1) + "^{2} &= " + fmtD(sq(est), 2) + " \\\\ " + fmtD(t2, 1) + "^{2} &= " + fmtD(sq(t2), 2) + " \\end{aligned} \\] " + fmtD(sq(est), 2) + " est le plus proche de " + n + ", donc la meilleure estimation est <b>" + fmtD(est, 1) + "</b>.";
  return numq(prompt, est, 0.1, sol, { mode: "gap-estimate-gap", n: n, best: best });
}, ["Une estimation utilise le carré parfait le plus proche du nombre sous la racine.", "Écris d'abord les carrés parfaits juste au-dessous et juste au-dessus du nombre."]);

// PG. L2, 9.3, CR 3: surface area of a square pyramid with the slant height derived by Pythagoras.
E("u2-gap-pyramid-slant-cr", 2, ["9.3"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [20, 21, 29]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2, 3]);
  var half = (swap ? tr[1] : tr[0]) * kk, height = (swap ? tr[0] : tr[1]) * kk, slant = tr[2] * kk;
  var base = 2 * half;
  var sa = base * base + 2 * base * slant;
  var thing = pick(["pyramide", "tente", "monument"]);
  var prompt = thing === "tente"
    ? "Une tente a la forme d'une pyramide à base carrée. Sa base a un côté de " + base + " cm et sa hauteur verticale est de " + height + " cm. Trouve l'aire de la surface totale de la tente, en centimètres carrés."
    : "Une " + (thing === "pyramide" ? "pyramide à base carrée" : "pyramide à base carrée en forme de monument") + " a une base dont le côté mesure " + base + " cm et une hauteur verticale de " + height + " cm. Trouve l'aire de la surface totale, en centimètres carrés.";
  var sol = "L'apothème n'est pas donné, alors trouve-le avec le théorème de Pythagore en utilisant la moitié de la base et la hauteur : \\[ \\begin{aligned} \\text{apothème}^{2} &= " + half + "^{2} + " + height + "^{2} = " + (half * half + height * height) + " \\\\ \\text{apothème} &= " + slant + " \\\\ SA &= " + base + "^{2} + 4\\left(" + FR(1, 2) + " \\times " + base + " \\times " + slant + "\\right) = " + (base * base) + " + " + (2 * base * slant) + " = " + sa + " \\end{aligned} \\] La réponse est <b>" + sa + " cm\\(^{2}\\)</b>.";
  return numq(prompt, sa, 0.01, sol, { mode: "gap-pyramid-slant", base: base, height: height, slant: slant });
}, ["Les faces triangulaires ont besoin de l'apothème, que la pyramide ne donne pas directement.", "Prends la moitié du côté de la base, puis utilise le théorème de Pythagore avec la hauteur pour obtenir l'apothème."]);

// PG. L2, 9.2, SR: surface area of a two-solid composite (box joined to a triangular prism).
E("u2-gap-composite-sa-mc", 2, ["9.2"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
  var a = tr[0], b = tr[1], c = tr[2];
  var L = ri(5, 12), W = ri(4, 9), H = ri(3, 8);
  var saBox = 2 * (L * W + L * H + W * H);
  var saPrism = a * b + (a + b + c) * L;
  var contact = a * L;
  var tot = saBox + saPrism - 2 * contact;
  var prompt = "Un présentoir est fait d'une boîte et d'un prisme droit à base triangulaire joints ensemble. La boîte mesure " + L + " cm de long, " + W + " cm de large et " + H + " cm de haut. Le prisme mesure " + L + " cm de long, et chaque extrémité triangulaire est un triangle rectangle avec des cathètes de " + a + " cm et " + b + " cm et une hypoténuse de " + c + " cm. Le prisme repose sur la boîte, et les deux solides se touchent sur un rectangle de " + a + " cm sur " + L + " cm. Quelle est l'aire de la surface totale du présentoir, en centimètres carrés ?";
  var sol = "Trouve d'abord chaque solide séparément, puis soustrais le rectangle de contact deux fois parce qu'il est caché sur les deux solides : \\[ \\begin{aligned} SA &= " + saBox + " + " + saPrism + " - 2(" + contact + ") \\\\ &= " + tot + " \\end{aligned} \\] La réponse est <b>" + tot + " cm\\(^{2}\\)</b>.";
  return mcq(prompt,
    { t: fmtD(tot), fb: "Exact : les deux solides sont comptés, et le rectangle de contact caché est enlevé de chacun des deux." },
    [{ t: fmtD(saBox + saPrism), fb: "Cela additionne les deux solides mais laisse les faces de contact cachées comptées sur les deux solides." },
     { t: fmtD(saBox + saPrism - contact), fb: "Cela enlève le rectangle de contact une seule fois, mais il est caché sur les deux solides, alors il doit partir deux fois." },
     { t: fmtD(saBox + saPrism - 3 * contact), fb: "Cela enlève le rectangle de contact trois fois ; il est caché sur exactement deux faces, une sur chaque solide." }],
    sol, { mode: "gap-composite-sa", tot: tot });
}, ["Traite le présentoir comme deux solides séparés d'abord, puis ajuste pour le joint.", "Additionne les deux aires de surface, puis soustrais le rectangle de contact deux fois puisqu'il est caché sur les deux solides."]);


/* Unit 3: Powers and Exponent Laws */

// PG. L2, 3.12, CR 2: product law and quotient law chained, then evaluate.
E("u3-gap-laws-eval-cr", 3, ["3.12"], 2, "gen", function () {
  var a = pick([2, 3]);
  var m = ri(2, 4), n = ri(2, 4), p = ri(1, 3); if (m + n - p < 2) p = 1;
  var tot = m + n - p;
  var val = Math.pow(a, tot);
  var prompt = "Évalue \\(\\frac{" + a + "^{" + m + "} \\times " + a + "^{" + n + "}}{" + a + "^{" + p + "}}\\).";
  var sol = "Multiplie d'abord avec la loi du produit, puis divise avec la loi du quotient : \\[ \\begin{aligned} " + a + "^{" + m + "} \\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ " + a + "^{" + (m + n) + "} \\div " + a + "^{" + p + "} &= " + a + "^{" + tot + "} = " + fmtD(val) + " \\end{aligned} \\] La réponse est <b>" + fmtD(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-laws-eval", a: a, tot: tot });
}, ["Les puissances de même base se combinent avec les lois des exposants avant tout calcul.", "Additionne les exposants pour la multiplication au numérateur comme première étape."]);

// PG. L2, 3.12, CR 2: simplify in x with the laws, then substitute a value.
E("u3-gap-simplify-sub-cr", 3, ["3.12"], 2, "gen", function () {
  var a = ri(2, 4), b = ri(2, 4), c = ri(1, 2);
  var e = a + b - c;
  var v = pick([2, 3, -2]);
  var val = Math.pow(v, e);
  var prompt = "Simplifie \\(\\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}}\\), puis évalue l'expression simplifiée quand \\(x = " + v + "\\).";
  var sol = "Simplifie d'abord avec les lois du produit et du quotient, puis remplace : \\[ \\begin{aligned} \\frac{x^{" + a + "} \\times x^{" + b + "}}{x^{" + c + "}} &= x^{" + e + "} \\\\ (" + v + ")^{" + e + "} &= " + fmtD(val) + " \\end{aligned} \\] La réponse est <b>" + fmtD(val) + "</b>.";
  return numq(prompt, val, 0.01, sol, { mode: "gap-simplify-sub", e: e, v: v });
}, ["L'expression doit être simplifiée en une seule puissance avant d'y mettre la valeur.", "Additionne les exposants au numérateur comme première étape."]);

// PG. L2, 3.11/3.12, CR 3: solve for the exponent by writing the target as a power of the base.
E("u3-gap-solve-exponent-cr", 3, ["3.11", "3.12"], 2, "gen", function () {
  var a = pick([2, 3, 5]);
  var m = ri(1, 3), k = ri(4, 7);
  if (k - m < 2) m = 1;
  var x = k - m;
  var T = Math.pow(a, k);
  var flip = Math.random() < 0.5;
  var lhs = flip ? (a + "^{x} \\times " + a + "^{" + m + "}") : (a + "^{" + m + "} \\times " + a + "^{x}");
  var prompt = "Trouve la valeur de \\(x\\) dans l'équation \\(" + lhs + " = " + fmtD(T) + "\\).";
  var sol = "Écris d'abord le côté droit comme une puissance de " + a + ", puis utilise la loi du produit et compare les exposants : \\[ \\begin{aligned} " + fmtD(T) + " &= " + a + "^{" + k + "} \\\\ " + m + " + x &= " + k + " \\\\ x &= " + x + " \\end{aligned} \\] La réponse est <b>" + x + "</b>.";
  return numq(prompt, x, 0.01, sol, { mode: "gap-solve-exponent", a: a, m: m, k: k });
}, ["Les deux côtés doivent être des puissances de la même base avant de comparer les exposants.", "Réécris le nombre de droite comme une puissance de la base comme première étape."]);

// PG. L2, 3.12, CR 3: product of two scientific-notation numbers, then normalize the coefficient.
E("u3-gap-sci-product-cr", 3, ["3.12"], 2, "gen", function () {
  var i = ri(15, 45), j = ri(15, 45), guard = 0;
  while (i * j < 1000 && guard < 200) { i = ri(15, 45); j = ri(15, 45); guard++; }
  var c1 = i / 10, c2 = j / 10;
  var p = ri(2, 5), q = ri(2, 5);
  var prod = i * j / 100;
  var coeff = Math.round(prod / 10 * 1000) / 1000;
  var prompt = "Multiplie \\((" + fmtD(c1) + " \\times 10^{" + p + "}) \\times (" + fmtD(c2) + " \\times 10^{" + q + "})\\). Le produit s'écrit en notation scientifique comme un coefficient fois une puissance de 10, avec le coefficient entre 1 et 10. Donne le coefficient.";
  var sol = "Multiplie les coefficients et additionne les exposants, puis normalise parce que le coefficient est trop grand : \\[ \\begin{aligned} " + fmtD(c1) + " \\times " + fmtD(c2) + " &= " + fmtD(prod, 3) + " \\\\ " + fmtD(prod, 3) + " \\times 10^{" + (p + q) + "} &= " + fmtD(coeff, 3) + " \\times 10^{" + (p + q + 1) + "} \\end{aligned} \\] La réponse est <b>" + fmtD(coeff, 3) + "</b>.";
  return numq(prompt, coeff, 0.01, sol, { mode: "gap-sci-product", coeff: coeff });
}, ["Multiplie les nombres de devant et les puissances de 10 séparément, puis vérifie la taille du nombre de devant.", "Multiplie les deux coefficients comme première étape."]);

// PG. L2, 3.12, CR 3: doubling growth over k periods, then the excess over a target.
E("u3-gap-growth-excess-cr", 3, ["3.12"], 2, "gen", function () {
  var n0 = ri(3, 9) * 10;
  var k = ri(3, 6);
  var total = n0 * Math.pow(2, k);
  var frac = pick([0.6, 0.7, 0.75, 0.8]);
  var target = Math.round(total * frac / 10) * 10;
  var ans = total - target;
  var prompt = "Une culture de bactéries commence avec " + n0 + " bactéries et double chaque heure. Trouve combien de bactéries de plus il y a après " + k + " heures qu'un compte cible de " + fmtD(target) + " bactéries.";
  var sol = "Applique le doublement " + k + " fois d'abord, puis compare avec la cible : \\[ \\begin{aligned} \\text{après " + k + " heures} &= " + n0 + " \\times 2^{" + k + "} = " + fmtD(total) + " \\\\ \\text{excès} &= " + fmtD(total) + " - " + fmtD(target) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-growth-excess", total: total, target: target });
}, ["Calcule d'abord le compte après croissance ; l'excès est une comparaison faite ensuite.", "Multiplie le compte de départ par 2 à la puissance du nombre d'heures comme première étape."]);

// PG. L2, 3.12/3.14, CR 3: power of a power, then the difference of two powers.
E("u3-gap-power-diff-cr", 3, ["3.12", "3.14"], 2, "gen", function () {
  var a, m, n, p, big, small, diff, guard = 0;
  do { a = pick([2, 3]); m = ri(2, 4); n = ri(2, 3); p = ri(1, 4); big = Math.pow(a, m * n); small = Math.pow(a, p); diff = big - small; guard++; } while ((diff <= 0 || diff > 5000) && guard < 300);
  var c = pick([2, 3]);
  var ans = c * diff;
  var prompt = "Évalue \\(" + c + "[(" + a + "^{" + m + "})^{" + n + "} - " + a + "^{" + p + "}]\\).";
  var sol = "Utilise d'abord la loi de la puissance d'une puissance, évalue les deux puissances, soustrais, puis multiplie : \\[ \\begin{aligned} (" + a + "^{" + m + "})^{" + n + "} &= " + a + "^{" + (m * n) + "} = " + fmtD(big) + " \\\\ " + a + "^{" + p + "} &= " + fmtD(small) + " \\\\ " + c + " \\times (" + fmtD(big) + " - " + fmtD(small) + ") &= " + c + " \\times " + fmtD(diff) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-power-diff", a: a, ans: ans });
}, ["La puissance d'une puissance doit être simplifiée avant d'évaluer l'une ou l'autre puissance.", "Multiplie les deux exposants de la première puissance comme première étape."]);

// PG. L2, 3.12, SR: multi-law simplification with one-law-at-a-time error distractors.
E("u3-gap-laws-mc", 3, ["3.12"], 2, "gen", function () {
  var m = ri(2, 4), n = ri(1, 3), p = ri(2, 4), q = ri(1, 2);
  var e1 = m + n, e2 = p + q;
  function expr(u, v) { return "\\(x^{" + u + "} \\times y^{" + v + "}\\)"; }
  var prompt = "Simplifie \\(\\frac{(x^{" + m + "} \\times y^{" + p + "})(x^{" + n + "} \\times y^{" + q + "})}{x^{" + n + "} \\times y^{" + q + "}}\\) en appliquant les lois des exposants. Quelle expression est la forme simplifiée ?";
  var sol = "Applique la loi du produit à chaque base, puis la loi du quotient à chaque base : \\[ \\begin{aligned} x^{" + m + "} \\times x^{" + n + "} \\div x^{" + n + "} &= x^{" + e1 + "} \\\\ y^{" + p + "} \\times y^{" + q + "} \\div y^{" + q + "} &= y^{" + e2 + "} \\end{aligned} \\] La réponse est <b>" + expr(e1, e2) + "</b>.";
  return mcq(prompt,
    { t: expr(e1, e2), fb: "Exact : chaque base est combinée avec la loi du produit, puis réduite avec la loi du quotient." },
    [{ t: expr(e1, p), fb: "Cela garde seulement le premier exposant de y ; les puissances de y doivent aussi être combinées avec la loi du produit avant la division." },
     { t: expr(m, e2), fb: "Cela garde seulement le premier exposant de x ; les puissances de x doivent aussi être combinées avec la loi du produit avant la division." },
     { t: expr(m, p), fb: "C'est le premier facteur du numérateur tout seul ; aucune base n'a encore été combinée ni divisée." }],
    sol, { mode: "gap-laws-mc", e1: e1, e2: e2 });
}, ["Travaille une base à la fois, et chaque base a besoin de la loi du produit et de la loi du quotient.", "Combine les deux puissances de x au numérateur comme première étape."]);

/* Unit 4: Polynomials */

// PG. L2, 8.6/8.11, CR 2: add two polynomials, then evaluate at a given x.
E("u4-gap-add-eval-cr", 4, ["8.6", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 + a2, sb = b1 + b2, sc = c1 + c2;
  var v = ri(2, 4);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Additionne les polynômes \\((" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ")\\), puis évalue la somme quand \\(x = " + v + "\\).";
  var sol = "Combine d'abord les termes semblables, puis remplace : \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") + (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-add-eval", sa: sa, sb: sb, sc: sc, v: v });
}, ["La somme doit être simplifiée avant de pouvoir y mettre la valeur de x.", "Additionne les coefficients de x carré ensemble comme première étape."]);

// PG. L2, 8.8/8.12, CR 2: multiply a monomial through a polynomial, give a named coefficient.
E("u4-gap-mono-coeff-cr", 4, ["8.8", "8.12"], 2, "gen", function () {
  var m = u4nz(-5, 5);
  if (m === 1 || m === -1) m = 3;
  var a = u4nz(-6, 6), b = u4nz(-6, 6), c = ri(-6, 6);
  var ans = m * b;
  var prodStr = u4expr([[m * a, "x^{3}"], [m * b, "x^{2}"], [m * c, "x"]]);
  var prompt = "Multiplie \\(" + fmtD(m) + "x(" + u4p(a, b, c) + ")\\). Quel est le coefficient du terme en \\(x^{2}\\) dans le produit ?";
  var sol = "Multiplie d'abord le monôme par chaque terme : \\[ \\begin{aligned} " + fmtD(m) + "x(" + u4p(a, b, c) + ") &= " + prodStr + " \\end{aligned} \\] Le coefficient du terme en \\(x^{2}\\) vient de \\(" + fmtD(m) + "x \\times " + fmtD(b) + "x\\). La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mono-coeff", m: m, b: b });
}, ["Chaque terme dans les parenthèses est multiplié, et le terme nommé se lit ensuite.", "Multiplie le monôme par le terme en x dans les parenthèses comme première étape."]);

// PG. L2, 8.12, CR 3: area of a rectangle with binomial sides, evaluated at a given x.
E("u4-gap-area-eval-cr", 4, ["8.12"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), v = ri(2, 6);
  var s1 = v + a, s2 = v + b, ans = s1 * s2;
  var prompt = "Un jardin rectangulaire a une longueur de \\((x + " + a + ")\\) mètres et une largeur de \\((x + " + b + ")\\) mètres. Trouve l'aire du jardin, en mètres carrés, quand \\(x = " + v + "\\).";
  var sol = "Évalue d'abord chaque côté, puis multiplie les côtés pour l'aire : \\[ \\begin{aligned} \\text{longueur} &= " + v + " + " + a + " = " + s1 + " \\\\ \\text{largeur} &= " + v + " + " + b + " = " + s2 + " \\\\ \\text{aire} &= " + s1 + " \\times " + s2 + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + " m\\(^{2}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-area-eval", s1: s1, s2: s2 });
}, ["L'aire est un produit des deux longueurs de côté, et chaque côté doit être évalué d'abord.", "Remplace la valeur de x dans la longueur comme première étape."]);

// PG. L2, 8.7/8.11, CR 3: subtract polynomials (distribute the negative), then evaluate at a negative x.
E("u4-gap-sub-eval-neg-cr", 4, ["8.7", "8.11"], 2, "gen", function () {
  var a1 = u4nz(-5, 5), b1 = u4nz(-6, 6), c1 = ri(-6, 6);
  var a2 = u4nz(-5, 5), b2 = u4nz(-6, 6), c2 = ri(-6, 6);
  var sa = a1 - a2, sb = b1 - b2, sc = c1 - c2;
  var v = -ri(1, 3);
  var ans = sa * v * v + sb * v + sc;
  var prompt = "Soustrais \\((" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ")\\), puis évalue la différence quand \\(x = " + v + "\\).";
  var sol = "Change d'abord chaque signe dans le deuxième polynôme, puis combine et remplace : \\[ \\begin{aligned} (" + u4p(a1, b1, c1) + ") - (" + u4p(a2, b2, c2) + ") &= " + u4p(sa, sb, sc) + " \\\\ " + u4p(sa, sb, sc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sub-eval-neg", sa: sa, sb: sb, sc: sc, v: v });
}, ["La soustraction inverse chaque signe dans le deuxième polynôme avant de combiner les termes semblables.", "Réécris le deuxième polynôme avec chaque signe changé comme première étape."]);

// PG. L2, 8.5/8.6, CR 3: simplify a polynomial perimeter, then evaluate.
E("u4-gap-perimeter-eval-cr", 4, ["8.5", "8.6"], 2, "gen", function () {
  var a1 = u4nz(-4, 4), b1 = ri(-5, 5), a2 = u4nz(-4, 4), b2 = ri(-5, 5), a3 = u4nz(-4, 4), b3 = ri(-5, 5);
  var sx = a1 + a2 + a3, sk = b1 + b2 + b3;
  var v = ri(2, 5);
  var ans = sx * v + sk;
  function side(a, b) { return u4expr([[a, "x"], [b, ""]]); }
  var prompt = "Un triangle a des côtés de longueurs \\((" + side(a1, b1) + ")\\), \\((" + side(a2, b2) + ")\\) et \\((" + side(a3, b3) + ")\\), en centimètres. Trouve le périmètre du triangle, en centimètres, quand \\(x = " + v + "\\).";
  var sol = "Additionne les trois côtés et simplifie d'abord, puis remplace : \\[ \\begin{aligned} P &= (" + side(a1, b1) + ") + (" + side(a2, b2) + ") + (" + side(a3, b3) + ") \\\\ &= " + side(sx, sk) + " \\\\ &= " + fmtD(ans) + "\\text{ à } x = " + v + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-eval", sx: sx, sk: sk, v: v });
}, ["Un périmètre est une somme de tous les côtés, simplifiée avant d'y mettre la valeur.", "Additionne les coefficients de x des trois côtés comme première étape."]);

// PG. L2, 8.9/8.12, CR 3: divide a polynomial by a monomial, then evaluate the quotient.
E("u4-gap-div-eval-cr", 4, ["8.9", "8.12"], 2, "gen", function () {
  var m = pick([2, 3, 4]);
  var qa = u4nz(-5, 5), qb = u4nz(-6, 6), qc = ri(-5, 5);
  var A = m * qa, B = m * qb, C = m * qc;
  var v = ri(2, 4);
  var ans = qa * v * v + qb * v + qc;
  var prompt = "Divise \\((" + u4p(A, B, C) + ") \\div " + m + "x\\), puis évalue le quotient quand \\(x = " + v + "\\).";
  var sol = "Divise chaque terme par le monôme d'abord, puis remplace : \\[ \\begin{aligned} (" + u4p(A, B, C) + ") \\div " + m + "x &= " + u4p(qa, qb, qc) + " \\\\ " + u4p(qa, qb, qc) + "\\text{ à } x = " + v + " &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-eval", qa: qa, qb: qb, qc: qc, v: v });
}, ["Chaque terme du polynôme est divisé séparément avant d'y mettre la valeur.", "Divise le terme en x carré par le monôme comme première étape."]);


/* Unit 5: Linear Equations and Inequalities */

// PG. L2, 8.27/8.28, CR 2: two-step inequality, answer is its boundary value.
E("u5-gap-ineq-boundary-cr", 5, ["8.27", "8.28"], 2, "gen", function () {
  var a = ri(2, 9), x0 = ri(2, 12), b = ri(-12, 12);
  if (b === 0) b = 5;
  var c = a * x0 + b;
  var sym = pick(["<", ">", "\\le", "\\ge"]);
  var prompt = "L'inéquation \\(" + u5lin(a, b) + " " + sym + " " + fmtD(c) + "\\) a une valeur limite où les deux côtés sont exactement égaux. Quelle est la valeur limite de \\(x\\) ?";
  var sol = "Pose les deux côtés égaux et résous en deux étapes : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c - b) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] La réponse est <b>" + fmtD(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-ineq-boundary", a: a, b: b, c: c });
}, ["La valeur limite se trouve en traitant l'inéquation comme une équation avec des côtés égaux.", "Déplace le terme constant de l'autre côté comme première étape."]);

// PG. L2, 8.17, CR 2: equation with the variable on both sides.
E("u5-gap-both-sides-cr", 5, ["8.17"], 2, "gen", function () {
  var x0 = ri(-9, 9);
  if (x0 === 0) x0 = 4;
  var a = ri(4, 9), c = ri(2, a - 2), b = ri(-10, 10), d = b + (a - c) * x0;
  var prompt = "Résous l'équation \\(" + u5lin(a, b) + " = " + u5lin(c, d) + "\\). Quelle est la valeur de \\(x\\) ?";
  var sol = "Rassemble d'abord les termes en x d'un côté, puis rassemble les constantes : \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + u5lin(c, d) + " \\\\ " + fmtD(a - c) + "x &= " + fmtD(d - b) + " \\\\ x &= " + fmtD(x0) + " \\end{aligned} \\] La réponse est <b>" + fmtD(x0) + "</b>.";
  return numq(prompt, x0, 0.01, sol, { mode: "gap-both-sides", a: a, c: c, b: b, d: d });
}, ["Les termes en x commencent des deux côtés, alors il faut les rassembler avant de diviser.", "Soustrais le plus petit terme en x des deux côtés comme première étape."]);

// PG. L2, 8.30/8.21, CR 3: minimum whole number of items to reach a target (solve, then round up).
E("u5-gap-min-items-cr", 5, ["8.30", "8.21"], 2, "gen", function () {
  var s = ri(10, 60), p = ri(4, 9), q = ri(3, 11);
  var target = s + p * q + ri(1, p - 1);
  var ans = q + 1;
  var prompt = "Un kiosque de collecte de fonds commence avec " + s + " $ et gagne " + p + " $ pour chaque article vendu. Le kiosque veut atteindre au moins " + target + " $. Quel est le plus petit nombre entier d'articles que le kiosque doit vendre ?";
  var sol = "Résous d'abord l'inéquation : \\[ \\begin{aligned} " + s + " + " + p + "n &\\ge " + target + " \\\\ " + p + "n &\\ge " + (target - s) + " \\\\ n &\\ge " + fmtD((target - s) / p) + " \\end{aligned} \\] Une partie d'article ne peut pas être vendue, alors le compte s'arrondit au nombre entier suivant. La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-min-items", s: s, p: p, target: target });
}, ["Résous d'abord l'inéquation ; le sens entier du compte se décide ensuite.", "Soustrais le montant de départ de la cible comme première étape."]);

// PG. L2, 8.17/8.29, CR 3: solve (x + a)/b = c, then evaluate a short expression at the solution.
E("u5-gap-solve-eval-cr", 5, ["8.17", "8.29"], 2, "gen", function () {
  var b = ri(2, 6), c = ri(3, 9), a = ri(2, 12);
  var x = b * c - a;
  var e = ri(2, 15);
  var ans = 2 * x + e;
  var prompt = "Résous l'équation \\(\\frac{x + " + a + "}{" + b + "} = " + c + "\\), puis évalue \\(2x + " + e + "\\) à la solution. Donne la valeur de l'expression.";
  var sol = "Défais d'abord la division, puis l'addition, puis remplace dans l'expression : \\[ \\begin{aligned} x + " + a + " &= " + (b * c) + " \\\\ x &= " + x + " \\\\ 2(" + x + ") + " + e + " &= " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-solve-eval", x: x, e: e });
}, ["L'équation doit être complètement résolue avant que sa solution puisse servir dans l'expression.", "Multiplie les deux côtés par le dénominateur comme première étape."]);

/* Unit 6: Linear Relations */

// PG. L2, 7.4/7.2, CR 2: slope extracted from a table's differences, then the value at a new x.
E("u6-gap-slope-table-cr", 6, ["7.4", "7.2"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(3, 15);
  var X = ri(9, 14);
  var ans = b + m * X;
  var rows = [0, 1, 2, 3].map(function (x) { return x + " : " + (b + m * x); }).join(" ; ");
  var prompt = "Une relation linéaire a cette table de valeurs. Les paires x et y sont : " + rows + ". La régularité continue de la même façon. Quelle est la valeur de y quand x = " + X + " ?";
  var sol = "Les valeurs de y augmentent de " + m + " à chaque étape, et la valeur de départ à x = 0 est " + b + " : \\[ \\begin{aligned} y &= " + b + " + " + m + "x \\\\ y(" + X + ") &= " + b + " + " + m + "(" + X + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-slope-table", m: m, b: b, X: X });
}, ["La taille du pas se cache dans les différences entre les valeurs voisines de y.", "Soustrais deux valeurs voisines de y pour trouver le pas comme première étape."]);

// PG. L2, 7.7/7.8, CR 2: missing coordinate of a point on the line through two given points.
E("u6-gap-missing-coord-cr", 6, ["7.7", "7.8"], 2, "gen", function () {
  var m = ri(2, 5), b = ri(1, 12);
  var x1 = ri(0, 3), x2 = x1 + ri(2, 4), x3 = x2 + ri(2, 5);
  var y1 = b + m * x1, y2 = b + m * x2, ans = b + m * x3;
  var prompt = "Les points (" + x1 + ", " + y1 + ") et (" + x2 + ", " + y2 + ") sont sur une droite. Le point (" + x3 + ", y) est aussi sur la même droite. Quelle est la valeur de y ?";
  var sol = "Trouve d'abord la pente à partir des deux points donnés, puis prolonge la régularité jusqu'au nouveau x : \\[ \\begin{aligned} \\text{pente} &= \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} = " + m + " \\\\ y &= " + y2 + " + " + m + "(" + x3 + " - " + x2 + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-missing-coord", m: m, x3: x3 });
}, ["Le taux de la droite doit être calculé à partir des deux points complets avant de pouvoir utiliser le point incomplet.", "Divise le changement de y par le changement de x pour les deux points donnés comme première étape."]);

// PG. L2, 7.2/7.10, CR 3: break-even point of two cost plans (set equal, then solve).
E("u6-gap-break-even-cr", 6, ["7.2", "7.10"], 2, "gen", function () {
  var m1 = ri(2, 6), d = ri(2, 6), t = ri(3, 9);
  var m2 = m1 + d;
  var a2 = ri(5, 30), a1 = a2 + d * t;
  var prompt = "Le forfait A demande des frais de " + a1 + " $ plus " + m1 + " $ par heure. Le forfait B demande des frais de " + a2 + " $ plus " + m2 + " $ par heure. Après combien d'heures les deux forfaits coûtent-ils exactement la même chose ?";
  var sol = "Pose les deux coûts égaux et résous : \\[ \\begin{aligned} " + a1 + " + " + m1 + "h &= " + a2 + " + " + m2 + "h \\\\ " + (a1 - a2) + " &= " + d + "h \\\\ h &= " + t + " \\end{aligned} \\] La réponse est <b>" + t + "</b>.";
  return numq(prompt, t, 0.01, sol, { mode: "gap-break-even", t: t });
}, ["Le seuil de rentabilité veut dire que les deux coûts totaux sont égaux, ce qui donne une équation à résoudre.", "Écris les deux coûts avec h heures et pose-les égaux comme première étape."]);

// PG. L2, 7.1/7.4, CR 3: build the relation from a pattern table, then evaluate far outside the table.
E("u6-gap-pattern-far-cr", 6, ["7.1", "7.4"], 2, "gen", function () {
  var m = ri(3, 7), s = ri(4, 12);
  var N = ri(18, 30);
  var ans = s + m * (N - 1);
  var c1 = s, c2 = s + m, c3 = s + 2 * m, c4 = s + 3 * m;
  var prompt = "Une régularité de tuiles grandit de la même façon à chaque étape. La figure 1 utilise " + c1 + " tuiles, la figure 2 utilise " + c2 + " tuiles, la figure 3 utilise " + c3 + " tuiles et la figure 4 utilise " + c4 + " tuiles. Combien de tuiles la figure " + N + " utilise-t-elle ?";
  var sol = "Chaque figure ajoute " + m + " tuiles, en partant de " + s + " à la figure 1 : \\[ \\begin{aligned} \\text{tuiles} &= " + s + " + " + m + "(n - 1) \\\\ &= " + s + " + " + m + "(" + (N - 1) + ") = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-pattern-far", m: m, s: s, N: N });
}, ["Une règle générale pour la régularité doit être construite avant de pouvoir évaluer une figure éloignée.", "Trouve la différence entre les comptes de deux figures voisines comme première étape."]);

// PG. L2, 7.9/7.10, CR 3: use a stated linear relation in reverse (substitute the target, then solve).
E("u6-gap-inverse-cr", 6, ["7.9", "7.10"], 2, "gen", function () {
  var m = ri(2, 6), b = ri(20, 80), t0 = ri(6, 14);
  var T = b + m * t0;
  var prompt = "Un réservoir d'eau se remplit à un rythme constant. La quantité d'eau dans le réservoir, en litres, après t minutes est donnée par A = " + b + " + " + m + "t. Après combien de minutes la quantité atteint-elle " + T + " litres ?";
  var sol = "Pose la relation égale à la quantité cible et résous pour t : \\[ \\begin{aligned} " + b + " + " + m + "t &= " + T + " \\\\ " + m + "t &= " + (T - b) + " \\\\ t &= " + t0 + " \\end{aligned} \\] La réponse est <b>" + t0 + "</b>.";
  return numq(prompt, t0, 0.01, sol, { mode: "gap-inverse", m: m, b: b, T: T });
}, ["La relation s'utilise à l'envers ici : la quantité est connue et le temps est manquant.", "Pose l'expression égale à la quantité cible comme première étape."]);

/* Unit 7: Similarity and Transformations */

// PG. L2, 10.17/10.15, CR 2: find the scale factor from one pair, then apply it to a second length.
E("u7-gap-scale-apply-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var o1 = pick([6, 8, 10, 12]);
  var i1 = o1 * k;
  var o2 = pick([5, 7, 9, 11, 14]);
  var ans = Math.round(o2 * k * 100) / 100;
  var ctx = pick([
    "Une affiche est un agrandissement d'un dessin. Un côté du dessin mesure " + o1 + " cm et le côté correspondant de l'affiche mesure " + fmtD(i1) + " cm. Un autre côté du dessin mesure " + o2 + " cm. Quelle est la longueur du côté correspondant de l'affiche, en centimètres ?",
    "Une bannière est un agrandissement d'un logo. Un côté du logo mesure " + o1 + " cm et le côté correspondant de la bannière mesure " + fmtD(i1) + " cm. Un autre côté du logo mesure " + o2 + " cm. Quelle est la longueur du côté correspondant de la bannière, en centimètres ?"
  ]);
  var sol = "Trouve d'abord le facteur d'échelle à partir de la paire connue, puis applique-le au deuxième côté : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(i1) + " \\div " + o1 + " = " + fmtD(k) + " \\\\ \\text{nouveau côté} &= " + o2 + " \\times " + fmtD(k) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "gap-scale-apply", k: k });
}, ["Le facteur d'échelle n'est pas donné ; il doit d'abord être retrouvé à partir de la paire de côtés correspondants.", "Divise le côté de l'image par son côté original correspondant comme première étape."]);

// PG. L2, 10.19/10.8, CR 2: map distance to real distance, then travel time at a stated speed.
E("u7-gap-map-time-cr", 7, ["10.19", "10.8"], 2, "gen", function () {
  var R, d, speed, real, hours, guard = 0;
  do { R = pick([4, 5, 6, 8, 9, 10, 12]); d = ri(4, 18); real = R * d; speed = pick([30, 40, 50, 60, 80, 90, 100, 120]); guard++; } while (((2 * real) % speed !== 0 || real / speed < 1 || real / speed > 4) && guard < 300);
  hours = real / speed;
  var prompt = "Sur une carte, 1 cm représente " + R + " km. Deux villes sont à " + d + " cm l'une de l'autre sur la carte. Un autobus roule entre les villes à " + speed + " km/h. Combien d'heures le trajet prend-il ?";
  var sol = "Utilise d'abord l'échelle pour obtenir la distance réelle, puis divise par la vitesse : \\[ \\begin{aligned} \\text{distance réelle} &= " + d + " \\times " + R + " = " + real + "\\text{ km} \\\\ \\text{temps} &= " + real + " \\div " + speed + " = " + fmtD(hours) + "\\text{ h} \\end{aligned} \\] La réponse est <b>" + fmtD(hours) + "</b>.";
  return numq(prompt, hours, 0.01, sol, { mode: "gap-map-time", R: R, real: real, speed: speed });
}, ["La mesure sur la carte doit être convertie en distance réelle avant de pouvoir utiliser la vitesse.", "Multiplie la distance sur la carte par la valeur de l'échelle comme première étape."]);

// PG. L2, 10.15/10.17, CR 3: area of the image using the square of the scale factor.
E("u7-gap-area-scale-cr", 7, ["10.15", "10.17"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var w = pick([4, 6, 8, 10]), h = pick([3, 5, 6, 9]);
  var iw = w * k;
  var area = Math.round(w * h * k * k * 100) / 100;
  var prompt = "Un rectangle mesure " + w + " cm de large et " + h + " cm de haut. On l'agrandit pour que la largeur devienne " + fmtD(iw) + " cm. Quelle est l'aire du rectangle agrandi, en centimètres carrés ?";
  var sol = "Trouve d'abord le facteur d'échelle à partir des largeurs ; les aires grandissent par le carré du facteur d'échelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(iw) + " \\div " + w + " = " + fmtD(k) + " \\\\ \\text{aire originale} &= " + w + " \\times " + h + " = " + (w * h) + " \\\\ \\text{aire de l'image} &= " + (w * h) + " \\times " + fmtD(k) + "^{2} = " + fmtD(area) + " \\end{aligned} \\] La réponse est <b>" + fmtD(area) + " cm\\(^{2}\\)</b>.";
  return numq(prompt, area, 0.01, sol, { mode: "gap-area-scale", k: k });
}, ["Les longueurs et les aires ne changent pas de la même façon : le facteur d'aire est le carré du facteur de longueur.", "Divise la nouvelle largeur par la largeur originale pour obtenir le facteur d'échelle comme première étape."]);

// PG. L2, 10.19/10.15, CR 3: two shadow heights by proportion, then their difference.
E("u7-gap-shadow-diff-cr", 7, ["10.19", "10.15"], 2, "gen", function () {
  var hp = pick([1.5, 1.6, 1.8]);
  var sp = pick([1, 1.2, 1.5, 2]);
  var m1 = ri(2, 4), m2 = ri(4, 6);
  if (m2 === m1) m2 = m1 + 2;
  var s1 = Math.round(sp * m1 * 10) / 10, s2 = Math.round(sp * m2 * 10) / 10;
  var h1 = Math.round(hp * m1 * 100) / 100, h2 = Math.round(hp * m2 * 100) / 100;
  var ans = Math.round(Math.abs(h2 - h1) * 100) / 100;
  var prompt = "Une personne de " + fmtD(hp) + " m projette une ombre de " + fmtD(sp) + " m de long. Au même moment, une clôture projette une ombre de " + fmtD(s1) + " m de long et un arbre projette une ombre de " + fmtD(s2) + " m de long. Les objets et leurs ombres forment des triangles semblables. Trouve la différence entre la hauteur de l'arbre et la hauteur de la clôture, en mètres.";
  var sol = "Utilise d'abord le rapport d'ombre de la personne sur chaque objet, puis compare les deux hauteurs : \\[ \\begin{aligned} \\text{clôture} &= " + fmtD(hp) + " \\times \\frac{" + fmtD(s1) + "}{" + fmtD(sp) + "} = " + fmtD(h1) + " \\\\ \\text{arbre} &= " + fmtD(hp) + " \\times \\frac{" + fmtD(s2) + "}{" + fmtD(sp) + "} = " + fmtD(h2) + " \\\\ \\text{différence} &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " m</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-shadow-diff", h1: h1, h2: h2 });
}, ["Chaque hauteur vient de la même proportion d'ombre, et la différence se trouve seulement après que les deux hauteurs sont connues.", "Divise l'ombre de la clôture par l'ombre de la personne pour obtenir la première échelle comme première étape."]);

// PG. L2, 10.17/10.15, CR 3: perimeter of the image after finding the factor from one pair of sides.
E("u7-gap-perimeter-scale-cr", 7, ["10.17", "10.15"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = ri(3, 9);
  var k = pick([1.5, 2, 2.5, 3, 4]);
  var ai = Math.round(a * k * 10) / 10;
  var P = a + b + c;
  var ans = Math.round(P * k * 100) / 100;
  var prompt = "Un triangle a des côtés de longueurs " + a + " cm, " + b + " cm et " + c + " cm. Un triangle semblable a le côté correspondant au côté de " + a + " cm qui mesure " + fmtD(ai) + " cm. Quel est le périmètre du triangle semblable, en centimètres ?";
  var sol = "Trouve d'abord le facteur d'échelle à partir des côtés correspondants, puis mets tout le périmètre à l'échelle : \\[ \\begin{aligned} \\text{facteur d'échelle} &= " + fmtD(ai) + " \\div " + a + " = " + fmtD(k) + " \\\\ \\text{périmètre} &= (" + a + " + " + b + " + " + c + ") \\times " + fmtD(k) + " = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-perimeter-scale", k: k, P: P });
}, ["Les périmètres changent par le même facteur que les côtés, et ce facteur vient de la seule paire connue.", "Divise le côté de l'image par son côté original correspondant comme première étape."]);


/* Unit 8: Circle Geometry */

// PG. L2, 9.7, CR 2: reflex arc measure from an inscribed angle (inscribed to central to reflex).
E("u8-gap-reflex-arc-cr", 8, ["9.7"], 2, "gen", function () {
  var ins = ri(28, 80);
  var central = 2 * ins, ans = 360 - central;
  var prompt = "Les points A, B et C sont sur un cercle de centre O. L'angle inscrit ACB mesure \\(" + ins + "^{\\circ}\\) et il intercepte l'arc mineur AB. Trouve la mesure de l'arc réflexe AB, en degrés.";
  var sol = "L'angle au centre sur l'arc mineur vaut d'abord le double de l'angle inscrit ; l'arc réflexe est ce qui reste du cercle complet : \\[ \\begin{aligned} \\text{arc mineur AB} &= 2 \\times " + ins + "^{\\circ} = " + central + "^{\\circ} \\\\ \\text{arc réflexe AB} &= 360^{\\circ} - " + central + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + ans + "^{\\circ}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-reflex-arc", ins: ins });
}, ["Un angle inscrit et son angle au centre sont liés, et un arc réflexe complète le tour complet.", "Double l'angle inscrit pour obtenir l'arc mineur comme première étape."]);

// PG. L2, 9.5, CR 2: angle in a cyclic quadrilateral after combining the parts split by a diagonal.
E("u8-gap-cyclic-diag-cr", 8, ["9.5"], 2, "gen", function () {
  var p = ri(20, 55), q = ri(20, 55);
  var ans = 180 - p - q;
  var prompt = "Les points A, B, C et D sont sur un cercle dans cet ordre, alors ABCD est un quadrilatère cyclique. La diagonale AC partage l'angle A en deux parties : l'angle BAC mesure \\(" + p + "^{\\circ}\\) et l'angle CAD mesure \\(" + q + "^{\\circ}\\). Trouve la mesure de l'angle BCD, en degrés.";
  var sol = "Combine d'abord les deux parties de l'angle A ; les angles opposés d'un quadrilatère cyclique totalisent \\(180^{\\circ}\\) : \\[ \\begin{aligned} \\angle A &= " + p + "^{\\circ} + " + q + "^{\\circ} = " + (p + q) + "^{\\circ} \\\\ \\angle BCD &= 180^{\\circ} - " + (p + q) + "^{\\circ} = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + ans + "^{\\circ}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-cyclic-diag", p: p, q: q });
}, ["L'angle A est donné en deux morceaux, et la propriété des quadrilatères cycliques s'applique à l'angle entier.", "Additionne les deux parties de l'angle A ensemble comme première étape."]);

// PG. L2, 9.7/9.5, CR 3: central angle found from a tangent-radius triangle, then halved for the inscribed angle.
E("u8-gap-tangent-central-cr", 8, ["9.7", "9.5"], 2, "gen", function () {
  var g = 14 + 2 * ri(0, 31);
  var central = 90 - g, ans = central / 2;
  var frame = pick(["droite", "exterieur"]);
  var prompt = frame === "droite"
    ? "Une droite passant par T et P est une tangente à un cercle de centre O, et elle touche le cercle en T. La droite de O passant par P recoupe le cercle en D. Dans le triangle OTP, l'angle en P mesure \\(" + g + "^{\\circ}\\). Le point C est sur l'arc majeur TD. Trouve la mesure de l'angle inscrit TCD, en degrés."
    : "D'un point P à l'extérieur d'un cercle de centre O, une tangente touche le cercle en T, et la droite de P passant par O recoupe le cercle en D. Dans le triangle OTP, l'angle en P mesure \\(" + g + "^{\\circ}\\). Le point C est sur l'arc majeur TD. Trouve la mesure de l'angle inscrit TCD, en degrés.";
  var sol = "Le rayon vers un point de tangence est perpendiculaire à la tangente, alors le triangle OTP est rectangle en T. Trouve d'abord l'angle au centre, puis prends sa moitié : \\[ \\begin{aligned} \\angle TOD &= 180^{\\circ} - 90^{\\circ} - " + g + "^{\\circ} = " + central + "^{\\circ} \\\\ \\angle TCD &= " + central + "^{\\circ} \\div 2 = " + fmtD(ans) + "^{\\circ} \\end{aligned} \\] La réponse est <b>\\(" + fmtD(ans) + "^{\\circ}\\)</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-tangent-central", g: g });
}, ["Deux faits sur les cercles s'enchaînent ici : le fait de la tangente construit le triangle, et l'angle inscrit vaut la moitié de l'angle au centre.", "Utilise l'angle droit en T pour trouver l'angle au centre TOD comme première étape."]);

// PG. L2, 9.6/9.5, CR 3: chord radius where the perpendicular-from-centre bisection comes before Pythagoras.
E("u8-gap-chord-bisect-cr", 8, ["9.6", "9.5"], 2, "gen", function () {
  var tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var half = (swap ? tr[1] : tr[0]) * kk, d = (swap ? tr[0] : tr[1]) * kk, r = tr[2] * kk;
  var chord = 2 * half;
  var frame = pick(["cercle", "fenetre"]);
  var prompt = frame === "cercle"
    ? "AB est une corde d'un cercle de centre O. La corde AB mesure " + chord + " cm de long, et la distance perpendiculaire de O à la corde est de " + d + " cm. Trouve le rayon du cercle, en centimètres."
    : "Une fenêtre circulaire a pour centre O, et une barre droite AB qui traverse la fenêtre est une corde du cercle. La barre AB mesure " + chord + " cm de long, et la distance perpendiculaire de O à la barre est de " + d + " cm. Trouve le rayon de la fenêtre, en centimètres.";
  var sol = "La perpendiculaire depuis le centre coupe d'abord la corde en deux ; ensuite le rayon est l'hypoténuse du triangle rectangle : \\[ \\begin{aligned} \\text{moitié de la corde} &= " + chord + " \\div 2 = " + half + " \\\\ r^{2} &= " + d + "^{2} + " + half + "^{2} = " + (d * d + half * half) + " \\\\ r &= " + r + " \\end{aligned} \\] La réponse est <b>" + r + " cm</b>.";
  return numq(prompt, r, 0.01, sol, { mode: "gap-chord-bisect", half: half, d: d, r: r });
}, ["Le rayon est l'hypoténuse d'un triangle rectangle dont un côté vaut seulement la moitié de la corde donnée.", "Prends la moitié de la longueur de la corde comme première étape."]);

// PG. L2, 9.8/9.5, CR 3: semicircle right angle first, then Pythagoras for the third side.
E("u8-gap-semicircle-pyth-cr", 8, ["9.8", "9.5"], 2, "gen", function () {
  var tr = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
  var swap = Math.random() < 0.5;
  var kk = pick([1, 2]);
  var given = (swap ? tr[1] : tr[0]) * kk, ans = (swap ? tr[0] : tr[1]) * kk, hyp = tr[2] * kk;
  var frame = pick(["cercle", "arche"]);
  var prompt = frame === "cercle"
    ? "AB est un diamètre d'un cercle, et C est un point sur le cercle. Le diamètre AB mesure " + hyp + " cm de long et le côté AC mesure " + given + " cm de long. Trouve la longueur de BC, en centimètres."
    : "Une arche en demi-cercle a un diamètre AB de " + hyp + " cm. Le point C est sur l'arche, et la distance en ligne droite AC est de " + given + " cm. Trouve la distance en ligne droite BC, en centimètres.";
  var sol = "Un angle inscrit dans un demi-cercle est un angle droit, alors le triangle ABC est rectangle en C et Pythagore s'applique : \\[ \\begin{aligned} BC^{2} &= " + hyp + "^{2} - " + given + "^{2} = " + (hyp * hyp - given * given) + " \\\\ BC &= " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + " cm</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-semicircle-pyth", given: given, hyp: hyp });
}, ["Le diamètre te dit que le triangle est rectangle avant de pouvoir trouver un côté.", "Remarque que l'angle C est un angle droit parce qu'il est dans un demi-cercle, comme première étape."]);

// PG. L2, 9.7, SR: an angle requiring two circle theorems in sequence, with single-theorem distractors.
E("u8-gap-two-theorems-mc", 8, ["9.7"], 2, "gen", function () {
  var p = pick([18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70]);
  var nm = pick([["Q", "R", "S", "T"], ["A", "B", "C", "D"], ["K", "L", "M", "N"], ["W", "X", "Y", "Z"]]);
  var P1 = nm[0], P2 = nm[1], P3 = nm[2], P4 = nm[3];
  var ans = 180 - p;
  function deg(v) { return "\\(" + v + "^{\\circ}\\)"; }
  var prompt = "Les points " + P1 + ", " + P2 + ", " + P3 + " et " + P4 + " sont sur un cercle de centre O. Le point " + P3 + " est sur l'arc majeur " + P1 + P2 + " et l'angle inscrit " + P1 + P3 + P2 + " mesure " + deg(p) + ". Le point " + P4 + " est sur l'arc mineur " + P1 + P2 + ". Quelle est la mesure de l'angle inscrit " + P1 + P4 + P2 + " ?";
  var sol = "L'arc mineur est d'abord fixé par l'angle au centre, et l'angle sur l'arc mineur utilise l'angle au centre réflexe : \\[ \\begin{aligned} \\text{angle au centre mineur} &= 2 \\times " + p + "^{\\circ} = " + (2 * p) + "^{\\circ} \\\\ \\text{angle au centre réflexe} &= 360^{\\circ} - " + (2 * p) + "^{\\circ} = " + (360 - 2 * p) + "^{\\circ} \\\\ \\angle " + P1 + P4 + P2 + " &= " + (360 - 2 * p) + "^{\\circ} \\div 2 = " + ans + "^{\\circ} \\end{aligned} \\] La réponse est <b>" + deg(ans) + "</b>.";
  return mcq(prompt,
    { t: deg(ans), fb: "Exact : l'angle au centre réflexe est divisé en deux, ce qui demande l'étape du doublement et l'étape de l'angle réflexe." },
    [{ t: deg(2 * p), fb: "C'est l'angle au centre mineur tout seul ; l'angle inscrit doit encore venir de l'angle réflexe sur l'autre arc." },
     { t: deg(p), fb: "Cela répète l'angle donné, mais le point demandé est sur l'arc opposé, alors son angle n'est pas le même." },
     { t: deg(360 - 2 * p), fb: "C'est l'angle au centre réflexe lui-même ; un angle inscrit vaut la moitié de son angle au centre, alors il faut encore diviser en deux." }],
    sol, { mode: "gap-two-theorems", p: p });
}, ["Le point est sur l'arc opposé, alors l'angle au centre réflexe est celui qui lui appartient.", "Double l'angle inscrit donné pour obtenir l'angle au centre mineur comme première étape."]);

/* Unit 9: Probability and Statistics */

// PG. L2, 11.9, CR 2: mean from a frequency table (sum of fx, then divide).
E("u9-gap-freq-mean-cr", 9, ["11.9"], 2, "gen", function () {
  var f1 = ri(2, 9), f2 = ri(2, 9), f3 = ri(2, 9), f4 = ri(2, 9);
  var S = 1 * f1 + 2 * f2 + 3 * f3 + 4 * f4, N = f1 + f2 + f3 + f4;
  var ans = Math.round(S / N * 100) / 100;
  var prompt = "Une classe note combien de livres chaque élève a lus en un mois. Les résultats sont : 1 livre pour " + f1 + " élèves, 2 livres pour " + f2 + " élèves, 3 livres pour " + f3 + " élèves et 4 livres pour " + f4 + " élèves. Trouve la moyenne du nombre de livres lus, avec deux décimales.";
  var sol = "Multiplie d'abord chaque valeur par sa fréquence et additionne, puis divise par le nombre total d'élèves : \\[ \\begin{aligned} \\text{total de livres} &= 1(" + f1 + ") + 2(" + f2 + ") + 3(" + f3 + ") + 4(" + f4 + ") = " + S + " \\\\ \\text{moyenne} &= \\frac{" + S + "}{" + N + "} = " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.02, sol, { mode: "gap-freq-mean", S: S, N: N });
}, ["La moyenne d'une table de fréquences pondère chaque valeur par le nombre de fois qu'elle se produit.", "Multiplie chaque nombre de livres par son nombre d'élèves comme première étape."]);

// PG. L2, 12.4, CR 2: expected frequency from a probability over N trials.
E("u9-gap-expected-freq-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8, 10]);
  var a = ri(1, b - 1);
  var mult = ri(12, 30);
  var N = b * mult, ans = a * mult;
  var prompt = "Une roulette est divisée en " + b + " secteurs égaux, et " + a + " des secteurs sont rouges. On fait tourner la roulette " + N + " fois. Combien de tours devraient aboutir au rouge ?";
  var sol = "La probabilité du rouge donne la part prévue des tours : \\[ \\begin{aligned} P(\\text{rouge}) &= \\frac{" + a + "}{" + b + "} \\\\ \\text{rouges prévus} &= \\frac{" + a + "}{" + b + "} \\times " + N + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-expected-freq", a: a, b: b, N: N });
}, ["Un compte prévu est la probabilité appliquée à l'ensemble complet des essais.", "Écris la probabilité du rouge comme une fraction comme première étape."]);

// PG. L2, 12.2, CR 3: probability of at least one success via the complement, as a percent.
E("u9-gap-complement-pct-cr", 9, ["12.2"], 2, "gen", function () {
  var p = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]);
  var trials = pick([2, 3]);
  var ctx = pick([
    { subj: "Un joueur de lancers francs", verb: "marque", named: "le joueur" },
    { subj: "Une archère", verb: "atteint la cible", named: "l'archère" },
    { subj: "Un joueur de soccer", verb: "marque", named: "le joueur" }
  ]);
  var fail = 100 - p;
  var bothFail = Math.round(Math.pow(fail, trials) / Math.pow(100, trials - 1) * 100) / 100;
  var ans = Math.round((100 - bothFail) * 100) / 100;
  var chain = [];
  for (var i = 0; i < trials; i++) chain.push(fail + "\\%");
  var prompt = ctx.subj + " " + ctx.verb + " sur " + p + " % de ses tentatives, et les tentatives sont indépendantes. Dans une série de " + trials + " tentatives, trouve la probabilité, en pourcentage, que " + ctx.named + " réussisse au moins une fois.";
  var sol = "Passe d'abord par le complémentaire : la seule façon de réussir zéro fois est d'échouer à chaque tentative : \\[ \\begin{aligned} P(\\text{échec}) &= 100\\% - " + p + "\\% = " + fail + "\\% \\\\ P(\\text{échec partout}) &= " + chain.join(" \\times ") + " = " + fmtD(bothFail) + "\\% \\\\ P(\\text{au moins une fois}) &= 100\\% - " + fmtD(bothFail) + "\\% = " + fmtD(ans) + "\\% \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-complement-pct", p: p, trials: trials });
}, ["Au moins une fois, c'est tout sauf le seul cas où cela n'arrive jamais.", "Trouve la probabilité d'un échec comme première étape."]);

// PG. L2, 11.9, CR 3: difference of the means of two small data sets.
E("u9-gap-mean-diff-cr", 9, ["11.9"], 2, "gen", function () {
  function makeSet() {
    var v = [ri(2, 20), ri(2, 20), ri(2, 20), ri(2, 20)];
    return { v: v, s: v[0] + v[1] + v[2] + v[3] };
  }
  var A = makeSet(), B = makeSet(), guard = 0;
  while (A.s === B.s && guard < 60) { B = makeSet(); guard++; }
  var mA = A.s / 4, mB = B.s / 4;
  var ans = Math.round(Math.abs(mA - mB) * 100) / 100;
  var prompt = "L'équipe A marque " + A.v.join(" ; ") + " points en quatre matchs. L'équipe B marque " + B.v.join(" ; ") + " points en quatre matchs. Trouve la différence entre le score moyen de l'équipe A et le score moyen de l'équipe B.";
  var sol = "Trouve d'abord la moyenne de chaque équipe, puis prends la différence : \\[ \\begin{aligned} \\text{moyenne A} &= \\frac{" + A.s + "}{4} = " + fmtD(mA) + " \\\\ \\text{moyenne B} &= \\frac{" + B.s + "}{4} = " + fmtD(mB) + " \\\\ \\text{différence} &= " + fmtD(ans) + " \\end{aligned} \\] La réponse est <b>" + fmtD(ans) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-mean-diff", mA: mA, mB: mB });
}, ["Deux moyennes doivent être calculées séparément avant de pouvoir les comparer.", "Additionne les quatre scores de l'équipe A comme première étape."]);

// PG. L2, 11.6, CR 3: sample count scaled to a population, then the excess over a threshold.
E("u9-gap-sample-scale-cr", 9, ["11.6"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "Un sondage auprès de " + ns + " élèves montre que " + c + " d'entre eux marchent pour aller à l'école. L'école entière compte " + fmtD(pop) + " élèves. Prédis combien d'élèves dans toute l'école marchent pour aller à l'école, et trouve de combien cette prédiction dépasse " + fmtD(T) + " élèves. Donne l'excès comme ta réponse.";
  var sol = "Mets d'abord le compte de l'échantillon à l'échelle de la population : \\[ \\begin{aligned} \\text{échelle} &= " + fmtD(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prédiction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excès} &= " + pred + " - " + fmtD(T) + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["Le résultat de l'échantillon doit être mis à l'échelle de la population entière avant toute comparaison.", "Divise la population par la taille de l'échantillon pour obtenir l'échelle comme première étape."]);

// PG. L2, 12.4, CR 3: expected wins from a probability over many plays, then the total points.
E("u9-gap-win-points-cr", 9, ["12.4"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8]);
  var a = ri(1, b - 1);
  var N = b * ri(15, 40);
  var w = ri(2, 6);
  var wins = a * (N / b), ans = wins * w;
  var prompt = "Un jeu de fête foraine se gagne avec une probabilité de \\(" + FR(a, b) + "\\). Une joueuse joue au jeu " + N + " fois, et chaque victoire vaut " + w + " points. Combien de points la joueuse devrait-elle marquer au total ?";
  var sol = "Trouve d'abord le nombre prévu de victoires, puis multiplie par les points de chaque victoire : \\[ \\begin{aligned} \\text{victoires prévues} &= " + FR(a, b) + " \\times " + N + " = " + wins + " \\\\ \\text{points prévus} &= " + wins + " \\times " + w + " = " + ans + " \\end{aligned} \\] La réponse est <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-win-points", wins: wins, w: w });
}, ["Les points viennent des victoires, alors le nombre prévu de victoires doit être trouvé avant de totaliser les points.", "Multiplie la probabilité par le nombre de parties comme première étape."]);

// PG. L2, 11.9, SR: frequency-table mean with forgot-to-divide and wrong-divisor distractors.
E("u9-gap-freq-mean-mc", 9, ["11.9"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "Un sondage note le nombre d'animaux par ménage. La table montre : " + v1 + " animal pour " + f1 + " ménages, " + v2 + " animaux pour " + f2 + " ménages et " + v3 + " animaux pour " + f3 + " ménages. Quelle est la moyenne du nombre d'animaux par ménage ?";
  var sol = "Multiplie chaque valeur par sa fréquence, additionne, et divise par la fréquence totale : \\[ \\begin{aligned} \\text{moyenne} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmtD(mean) + " \\end{aligned} \\] La réponse est <b>" + fmtDF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtDF(mean, 2), fb: "Exact : le total pondéré est divisé par le nombre total de ménages." },
    [{ t: fmtDF(S, 2), fb: "C'est le total pondéré tout seul ; il doit encore être divisé par le nombre total de ménages." },
     { t: fmtDF(dWrongDiv, 2), fb: "Cela divise par le nombre de lignes de la table ; le diviseur devrait être le nombre total de ménages." },
     { t: fmtDF(dDouble, 2), fb: "Cela compte la dernière ligne de la table deux fois avant de diviser, ce qui gonfle le total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["La moyenne d'une table de fréquences pondère chaque valeur par le nombre de fois qu'elle se produit, puis divise par le compte total.", "Multiplie chaque nombre d'animaux par son nombre de ménages comme première étape."]);

