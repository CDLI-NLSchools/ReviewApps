// CRMARKS: s8f-u2-cr-molasses=3
// CRMARKS: s8f-u2-cr-layers=3
// CRMARKS: s8f-u2-cr-density-block=3
// CRMARKS: s8f-u2-cr-temp-situations=3
// CRMARKS: s8f-u2-cr-raise-ship=3
// CRMARKS: s8f-u2-cr-mass-weight=3
// CRMARKS: s8f-u2-cr-piggyback=3
// CRMARKS: s8f-u2-cr-pressure-crate=3
// CRMARKS: s8f-u2-cr-cleaning-claim=4
// CRMARKS: s8f-u2-cr-underlying=3
// CRMARKS: s8f-u2-cr-car-lift=3
// CRMARKS: s8f-u2-cr-design-viscosity=4
// CRMARKS: s8f-u2-cr-data-infer=3
// CRMARKS: s8f-u2-cr-displacement-calc=3
// Sciences 8, Unité 2 : Les fluides (SC8.4.1 à SC8.6.9),
// banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Correspondance de contenu : SC8.6.9 porte le calcul de la masse
// volumique de divers objets; SC8.6.3 porte les deux familles
// d'explications des écarts dans les données (un premier écart dans
// les données d'écoulement, et des explications concurrentes pesées
// pour un écart de masse volumique), consignées ici plutôt que
// fusionnées en silence.
// Discipline du contenu : les facteurs de la viscosité sont la
// température, la concentration et l'attraction entre les particules
// seulement; les situations d'attraction sont décrites, jamais
// évaluées par des termes spécialisés; le principe d'Archimède est
// énoncé comme le poids du fluide déplacé.
// Résidu CORE : les questions de SC8.6.5 évaluent l'identification
// des variables et la conception de recherches; elles n'évaluent pas
// la réalisation de la procédure. SC8.6.7 porte une seule question sur
// la lecture exacte d'instruments; la manipulation relève de
// l'évaluation en classe. Les questions de SC8.6.8 évaluent les étapes
// de la méthode de déplacement, le jugement d'erreur et le calcul; la
// procédure au comptoir elle-même n'est pas évaluée.

function s8fn(v) {
  var s = (Math.round(v * 100) / 100).toString();
  return s.replace(".", ",");
}
function s8fdis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var cv = Math.round(cand[i] * 100) / 100;
    if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv);
  }
  return out;
}

/* ---------- SC8.4.1 Comparer la viscosité ---------- */

E("s8f-u2-viscosity-def", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce que la viscosité?",
      "La résistance d'un liquide à l'écoulement, causée par la friction entre ses particules à mesure qu'elles se déplacent les unes par rapport aux autres",
      ["La résistance d'un liquide à être comprimé dans un volume plus petit que celui qu'il remplit déjà, mesurée par la force qu'il faut pour le presser",
       "La vitesse à laquelle un liquide s'évapore de la surface d'un récipient ouvert qui le contient, causée par ses particules qui s'échappent dans l'air",
       "La force avec laquelle un liquide pousse vers le haut sur tout objet qui est placé dans le liquide, causée par le liquide déplacé sous l'objet"],
      "La viscosité est une mesure de combien un liquide résiste à l'écoulement. La résistance vient de la friction entre les particules du liquide : plus la friction ou le frottement entre les particules est grand, plus la viscosité est élevée et plus le liquide s'écoule lentement.",
      {});
  }
]), ["La viscosité concerne l'écoulement. Quel choix parle de l'écoulement et de ce qui y résiste?", "Les liquides épais et lents sont ceux à viscosité élevée."]);

E("s8f-u2-flow-ranking", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Quatre liquides sont versés d'entonnoirs identiques : de l'eau, de l'huile de cuisson, du shampoing et de la mélasse. Lequel se verse le plus vite?", k: "L'eau", w: ["L'huile de cuisson", "La mélasse", "Le shampoing"] },
    { q: "Quatre liquides sont chronométrés pendant qu'ils coulent sur une rampe : de l'eau, du jus de tomate, de l'huile de cuisson et du miel. Lequel a la viscosité la plus élevée?", k: "Le miel", w: ["L'huile de cuisson", "Le jus de tomate", "L'eau"] },
    { q: "Un cuisinier compare du sirop à crêpes, du lait, du savon à vaisselle et de l'eau. Lequel a la viscosité la plus faible?", k: "L'eau", w: ["Le savon à vaisselle", "Le lait", "Le sirop à crêpes"] },
    { q: "Quelle liste ordonne les liquides de la viscosité la plus faible à la plus élevée?", k: "Eau, huile de cuisson, shampoing, mélasse", w: ["Huile de cuisson, eau, mélasse, shampoing", "Mélasse, shampoing, huile de cuisson, eau", "Eau, mélasse, shampoing, huile de cuisson"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les liquides à faible viscosité s'écoulent librement et vite; les liquides à viscosité élevée s'écoulent lentement. L'eau est mince et rapide, les huiles et le shampoing sont entre les deux, et le miel et la mélasse sont épais et lents. Comparer des liquides familiers est le visage quotidien de la viscosité.",
    {});
}, ["Un écoulement rapide veut dire une faible viscosité; lent et épais veut dire une viscosité élevée.", "L'eau est le liquide le plus mince de chaque liste ici."]);

E("s8f-u2-viscosity-use", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Pourquoi l'huile à moteur doit-elle avoir la viscosité appropriée pour faire son travail?", k: "Elle doit s'écouler assez bien pour enduire les pièces mobiles du moteur et les protéger, sans être si mince qu'elle n'arrive pas à adhérer et à lubrifier", w: ["Elle doit s'évaporer rapidement pour que le moteur reste propre", "Elle doit geler solide en hiver pour protéger le bloc-moteur", "Sa viscosité décide de la couleur des gaz d'échappement"] },
    { q: "Un peintre se plaint qu'une peinture est trop visqueuse pour le travail. Quel est le problème?", k: "La peinture est trop épaisse pour s'étaler correctement et uniformément", w: ["La peinture sèche avant de pouvoir être appliquée au pinceau", "La peinture est trop mince et coule le long du mur", "La peinture a perdu sa couleur dans la boîte"] },
    { q: "Le beurre d'arachide gardé au réfrigérateur est souvent trop visqueux pour être étalé. Qu'est-ce que cela te dit du beurre d'arachide au réfrigérateur?", k: "Sa viscosité a augmenté, donc il résiste à l'écoulement et à l'étalement", w: ["Sa viscosité a diminué, donc il coule du couteau", "Ses particules ont complètement cessé de s'attirer les unes les autres", "Sa concentration est tombée à presque zéro"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Beaucoup de substances ont besoin du degré de viscosité approprié pour remplir leur fonction prévue : l'huile à moteur doit s'écouler et adhérer comme lubrifiant, la peinture doit s'étaler correctement, et le beurre d'arachide doit s'étaler sur le pain. Trop visqueux veut dire trop résistant à l'écoulement pour le travail.",
    {});
}, ["Associe la plainte à ce que la viscosité fait : la résistance à l'écoulement.", "Trop visqueux veut toujours dire trop épais et trop lent pour son usage."]);

E("s8f-u2-flow-lab", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    var q = mcq("Dans le laboratoire principal sur le débit, des quantités égales de quatre liquides s'écoulent dans le même entonnoir et sont chronométrées. Le graphique montre les résultats. Quel liquide est le plus visqueux?",
      "Le liquide D",
      ["Le liquide A", "Le liquide B", "Le liquide C"],
      "Le débit et la viscosité vont en directions opposées : plus un liquide prend de temps à s'écouler, plus il résiste à l'écoulement, donc la barre la plus longue, le liquide D, est le plus visqueux. Le liquide A, avec le temps le plus court, est le moins visqueux.",
      {});
    q.figure = s8fHealthSVG([{ name: "Liquide A", value: 4 }, { name: "Liquide B", value: 9 }, { name: "Liquide C", value: 15 }, { name: "Liquide D", value: 26 }], "Temps d'écoulement", "s", null);
    return q;
  }
]), ["Dans un test d'écoulement, le temps est l'indice : écoulement lent, viscosité élevée.", "Trouve le temps d'écoulement le plus long sur le graphique."]);

E("s8f-u2-viscosity-compare", 2, ["SC8.4.1"], 2, "var", varset([
  function () {
    return mcq("Deux liquides sont décrits. Le liquide P se verse comme une crème mince et enduit une cuillère uniformément. Le liquide Q goutte lentement de la cuillère en un ruban épais. Quelle comparaison est correcte?",
      "Le liquide Q a la viscosité la plus élevée, parce qu'il s'écoule plus lentement et résiste au mouvement",
      ["Le liquide P a la viscosité la plus élevée, parce qu'il enduit la cuillère uniformément",
       "Les deux ont la même viscosité, parce que ce sont tous les deux des liquides",
       "La viscosité ne peut pas être comparée sans connaître leurs masses volumiques"],
      "La viscosité se compare par le comportement d'écoulement. Le liquide Q s'écoule lentement et épaississement, donc il résiste davantage à l'écoulement : viscosité plus élevée. Le liquide P s'écoule facilement : viscosité plus faible. La masse volumique est une propriété différente et ne règle pas une comparaison de viscosité.",
      {});
  }
]), ["Compare la façon dont chaque liquide bouge, rien d'autre.", "Lent et épais est la signature d'une viscosité élevée."]);

/* ---------- SC8.4.2 Les facteurs qui modifient la viscosité ---------- */

E("s8f-u2-factors", 2, ["SC8.4.2"], 1, "gen", function () {
  var cases = [
    { q: "Du miel gardé dans un garde-manger froid se verse lentement, mais le même miel réchauffé dans un bol d'eau chaude se verse facilement. Quel facteur a changé la viscosité du miel?", k: "La température", w: ["La concentration", "La force d'attraction ajoutée par le brassage", "La taille du pot de miel"] },
    { q: "Un cuisinier brasse de la farine supplémentaire dans une sauce et elle épaissit sensiblement. Quel facteur a changé la viscosité de la sauce?", k: "La concentration : plus de substance dissoute ou mélangée dans un volume donné", w: ["La température à laquelle la sauce a été chauffée sur la cuisinière", "La force d'attraction entre la cuillère et la sauce qu'elle brasse", "La couleur de la sauce à mesure que la farine y est mélangée"] },
    { q: "Des gouttelettes de pluie s'accrochent à une corde à linge au lieu de tomber directement, parce que les particules d'eau attirent le matériau de la corde. Quel facteur est à l'œuvre dans le comportement de l'eau?", k: "La force d'attraction entre les particules", w: ["La concentration de l'eau de pluie", "La température de l'air ce jour-là", "Le volume des gouttes de pluie sur la corde"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Trois facteurs modifient la viscosité d'un liquide : la température, la concentration, et la force d'attraction entre les particules (dans le liquide lui-même, et entre le liquide et la surface sur laquelle il s'écoule). Chaque cas ici isole l'un des trois.",
    {});
}, ["La liste des facteurs compte trois éléments. Lequel le cas a-t-il changé?", "Réchauffé ou refroidi veut dire la température; plus de substance dissoute veut dire la concentration."]);

E("s8f-u2-heating-honey", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("Selon la théorie particulaire, pourquoi le chauffage fait-il couler le miel plus vite?",
      "Les particules chauffées bougent plus vite et plus loin les unes des autres, donc il y a moins de friction entre elles et leur attraction faiblit, ce qui abaisse la viscosité",
      ["Les particules chauffées bougent plus lentement et se tassent plus près les unes des autres, donc le miel réchauffé glisse comme une seule feuille solide",
       "Le chauffage ajoute plus de particules au miel à mesure qu'il se réchauffe, augmentant sa concentration et abaissant sa viscosité de cette façon",
       "Le chauffage détruit complètement l'attraction entre les particules, donc le miel se transforme en gaz à mesure qu'il se réchauffe"],
      "La théorie particulaire l'explique en trois étapes : les particules sont toujours en mouvement, le chauffage leur donne plus d'énergie donc elles bougent plus vite et plus loin les unes des autres, et avec plus d'espace entre elles il y a moins de friction et une attraction plus faible entre les particules. Moins de friction interne veut dire une viscosité plus faible, donc le miel réchauffé s'écoule plus vite.",
      {});
  }
]), ["Travaille à travers les particules : énergie, espacement, friction, puis viscosité.", "Plus vite, plus loin, moins de friction : la viscosité baisse."]);

E("s8f-u2-concentration", 2, ["SC8.4.2"], 3, "var", varset([
  function () {
    return mcq("Une laiterie liste le lait écrémé, le lait à 1 pour cent, le lait à 2 pour cent, le lait entier et la crème en ordre de concentration croissante en matières grasses. Un élève prédit que leurs viscosités suivront le même ordre. La prédiction est-elle solide, et pourquoi?",
      "Oui : une concentration plus élevée veut dire plus de particules dans un volume donné, ce qui augmente la friction entre les particules et donc augmente la viscosité",
      ["Oui, la prédiction est solide jusque-là, mais seulement parce que la crème a une couleur différente du lait écrémé et des autres produits de la liste",
       "Non : la concentration est une propriété qui influe seulement sur les gaz de cette façon, et elle n'a aucun effet du tout sur la viscosité de liquides comme le lait",
       "Non : une concentration plus élevée de particules abaisse toujours la viscosité d'un liquide, quel que soit le liquide et ce qui y est dissous"],
      "La concentration est la quantité de substance dans un volume donné. Plus de particules entassées dans le même espace veut dire plus de frottement et de friction à mesure que le liquide s'écoule, ce qui est une viscosité plus élevée. L'ordre de concentration de la laiterie est donc aussi l'ordre prévu de viscosité, la crème étant la plus visqueuse.",
      {});
  }
]), ["La concentration veut dire des particules par volume. Plus de particules dans le même espace veut dire quoi pour la friction?", "La prédiction tient ou tombe sur le lien avec la friction."]);

E("s8f-u2-cr-molasses", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("Les gens disent qu'un travailleur lent bouge « comme de la mélasse froide en hiver ». Selon la théorie particulaire, explique la science dans cette expression, et explique pourquoi la mélasse pour les crêpes se garde mieux dans l'armoire qu'au réfrigérateur. (3 points)",
      ["les particules froides bougent plus lentement et restent plus près, augmentant la friction et la viscosité", "la mélasse froide s'écoule donc très lentement", "la garder dans l'armoire la garde plus chaude et moins visqueuse pour la verser"],
      "<b>Réponse modèle :</b> La mélasse est déjà un liquide visqueux. Quand elle est froide, ses particules ont peu d'énergie, bougent lentement et restent près les unes des autres, donc la friction entre les particules est élevée et l'attraction entre elles tient fortement : sa viscosité augmente encore et elle coule à peine, ce qui est l'image que l'expression utilise. Au réfrigérateur, la mélasse reste froide et très visqueuse, donc elle se verse et s'étale mal sur les crêpes. Gardée dans l'armoire plus chaude, ses particules bougent plus vite et plus loin les unes des autres, la friction baisse, et la mélasse s'écoule comme prévu.<br><br><b>Points d'attribution :</b> 1 point pour le comportement des particules au froid (plus lentes, plus près, plus de friction). 1 point pour le lien de ce comportement à une viscosité plus élevée et un écoulement très lent. 1 point pour la conclusion sur la conservation tirée du même raisonnement.",
      {});
  }
]), ["Une idée explique les deux moitiés : ce que le froid fait aux particules.", "Froid, particules lentes, friction élevée, viscosité élevée. Puis applique-la à l'armoire."]);

/* ---------- SC8.4.3 Masse, volume et masse volumique ---------- */

E("s8f-u2-definitions", 2, ["SC8.4.3"], 1, "var", varset([
  function () {
    return mcq("Quel ensemble de définitions est correct?",
      "La masse est la quantité de matière dans un objet, le volume est la quantité d'espace qu'il occupe, et la masse volumique est sa masse par unité de volume",
      ["La masse est la force de la gravité sur un objet, le volume est son poids, et la masse volumique est sa masse par unité de volume",
       "La masse est la quantité d'espace dans un objet, le volume est la quantité de matière, et la masse volumique est son volume par unité de masse",
       "La masse, le volume et la masse volumique sont trois noms pour la même propriété"],
      "Les trois quantités se construisent les unes sur les autres. La masse mesure la quantité de matière, le volume mesure l'espace occupé, et la masse volumique les combine comme le rapport masse sur volume, la masse dans chaque unité de volume.",
      {});
  }
]), ["La masse volumique est le rapport des deux autres. Lesquels, dans quel ordre?", "La masse par unité de volume : les grammes dans chaque millilitre ou centimètre cube."]);

E("s8f-u2-states-density", 2, ["SC8.4.3"], 1, "gen", function () {
  var cases = [
    { q: "La même substance est comparée comme solide, liquide et gaz. Selon la théorie particulaire, quel énoncé sur la masse volumique est généralement correct?", k: "Le solide est généralement l'état le plus dense, parce que ses particules sont tassées le plus près les unes des autres, et le gaz est le moins dense", w: ["Le gaz est généralement le plus dense des trois états, parce que ses particules sont celles qui bougent le plus vite de toutes", "Les trois états de la substance ont exactement la même masse volumique les uns que les autres, parce que c'est la même substance dans chaque état", "L'état liquide est toujours le plus dense des trois états, quelle que soit la substance comparée dans le test"] },
    { q: "Une seringue scellée d'air est enfoncée, réduisant de moitié le volume de l'air pendant que sa masse reste la même. Qu'arrive-t-il à la masse volumique de l'air, et pourquoi?", k: "Elle double, parce que la même masse de particules est tassée dans la moitié de l'espace", w: ["Elle diminue de moitié, parce que la masse volumique baisse chaque fois que le volume baisse", "Elle reste la même, parce que la masse n'a pas changé", "Elle tombe à zéro, parce que les gaz n'ont aucune masse volumique quand ils sont comprimés"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La masse volumique suit l'espacement des particules. Dans un solide, les particules sont tassées le plus près, dans un liquide elles sont un peu plus loin les unes des autres, et dans un gaz elles sont loin les unes des autres, donc en général l'état solide d'une substance est son plus dense et son état gazeux son moins dense. Comprimer un gaz dans la moitié du volume avec la même masse double l'entassement, et donc double la masse volumique.",
    {});
}, ["La masse volumique est l'entassement : la masse tassée dans l'espace.", "Des particules plus près, une masse volumique plus élevée, pour la même substance."]);

E("s8f-u2-ratio-constant", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return mcq("Un petit échantillon d'aluminium a une masse de 27 g et un volume de 10 cm3. Un bloc d'aluminium beaucoup plus grand a un volume de 100 cm3. Quelle devrait être la masse du grand bloc, et quel principe cela montre-t-il?",
      "270 g : le rapport masse sur volume d'un matériau est une valeur constante, donc la masse augmente en proportion du volume",
      ["27 g : la masse d'un échantillon d'un matériau ne dépend pas du tout de la quantité de matériau qu'il y a",
       "54 g : la masse d'un échantillon double chaque fois que son volume augmente du tout, de quelque quantité que ce soit",
       "2700 g : la masse d'un échantillon augmente avec le carré de son volume à mesure que l'échantillon devient de plus en plus grand"],
      "Le petit échantillon donne la masse volumique de l'aluminium : 27 g divisés par 10 cm3 égalent 2,7 g/cm3. La masse volumique est un rapport constant pour un matériau, donc la masse du grand bloc est 2,7 fois 100, ce qui égale 270 g. Un plus gros morceau a proportionnellement plus de masse, jamais la même masse et jamais une quantité au carré.",
      {});
  }
]), ["Trouve d'abord le rapport à partir du petit échantillon, puis applique-le au grand volume.", "Un rapport constant veut dire une simple proportion."]);

E("s8f-u2-cr-layers", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return textq("Un élève verse soigneusement trois liquides dans un tube à essai : du glycérol (masse volumique 1,26 g/mL), de l'eau (1,00 g/mL) et de l'huile à machine (0,90 g/mL). Ils se déposent en couches au lieu de se mélanger uniformément. Énonce l'ordre des couches de bas en haut et explique-le au moyen de la masse volumique et de la théorie particulaire. (3 points)",
      ["le glycérol en bas, l'eau au milieu, l'huile en haut", "les liquides plus denses coulent sous les moins denses", "l'explication par l'entassement des particules"],
      "<b>Réponse modèle :</b> De bas en haut, l'ordre est le glycérol, puis l'eau, puis l'huile à machine. Les liquides qui ne se mélangent pas se déposent selon la masse volumique : le liquide dont les particules tassent le plus de masse dans chaque millilitre coule sous les autres. Le glycérol, à 1,26 g/mL, a le plus de masse dans chaque unité de volume, donc il prend le bas; l'eau, à 1,00 g/mL, se dépose au-dessus de lui; et l'huile à machine, à 0,90 g/mL, avec le moins de masse par unité de volume, flotte en haut.<br><br><b>Points d'attribution :</b> 1 point pour l'ordre correct, de bas en haut. 1 point pour la règle de dépôt (une plus grande masse volumique coule). 1 point pour l'explication par les particules ou la masse par volume liée aux valeurs données.",
      {});
  }
]), ["Trie d'abord les trois masses volumiques; le tube se trie de la même façon.", "La couche du bas est la plus grande masse dans chaque millilitre."]);

/* ---------- SC8.4.4 La masse volumique, quantitativement ---------- */

E("s8f-u2-calc-density", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.0, 2.5, 4.0, 5.0]);
  var V = pick([20, 25, 40, 50, 80, 100]);
  var m = Math.round(D * V * 100) / 100;
  var unit = pick(["g/mL", "g/cm3"]);
  var dis = s8fdis(D, [V / m, D * 2, D / 2, D + 1, m / (V + 10)]);
  return mcq("Un échantillon d'une substance a une masse de " + s8fn(m) + " g et un volume de " + V + (unit === "g/mL" ? " mL" : " cm3") + ". Quelle est sa masse volumique?",
    s8fn(D) + " " + unit,
    dis.map(function (d) { return s8fn(d) + " " + unit; }),
    "La masse volumique est la masse divisée par le volume : MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + V + ", ce qui égale " + s8fn(D) + " " + unit + ". Les unités portent le sens : les grammes dans chaque millilitre (ou centimètre cube) de la substance.",
    {});
}, ["Masse volumique égale masse divisée par volume. Divise, et garde l'unité avec la réponse.", "Prends garde à la division inversée parmi les choix."]);

E("s8f-u2-calc-mass", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.5]);
  var V = pick([20, 40, 50, 100, 200]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(m, [m * 2, m / 2, D + V, m + 20, V / D]);
  return mcq("Un liquide a une masse volumique de " + s8fn(D) + " g/mL. Quelle est la masse de " + V + " mL de ce liquide?",
    s8fn(m) + " g",
    dis.map(function (d) { return s8fn(d) + " g"; }),
    "Réarrange la formule de la masse volumique : m égale MV fois V, soit " + s8fn(D) + " g/mL fois " + V + " mL, ce qui égale " + s8fn(m) + " g. Chaque millilitre transporte " + s8fn(D) + " g, et il y en a " + V + ".",
    {});
}, ["Masse égale masse volumique fois volume. Chaque millilitre contribue les grammes de la masse volumique.", "Multiplie, ne divise pas : la masse de 100 mL devrait dépasser le nombre de la masse volumique."]);

E("s8f-u2-calc-volume", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 5.0]);
  var V = pick([20, 25, 40, 50, 80]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(V, [m * D, V * 2, V / 2, m - D, m / (D + 1)]);
  return mcq("Un morceau solide de métal a une masse de " + s8fn(m) + " g et une masse volumique de " + s8fn(D) + " g/cm3. Quel est son volume?",
    s8fn(V) + " cm3",
    dis.map(function (d) { return s8fn(d) + " cm3"; }),
    "Réarrange la formule de la masse volumique : V égale m divisé par MV, soit " + s8fn(m) + " g divisés par " + s8fn(D) + " g/cm3, ce qui égale " + s8fn(V) + " cm3. Le volume compte combien d'unités de masse de la taille de la masse volumique le morceau contient.",
    {});
}, ["Volume égale masse divisée par masse volumique.", "Vérifie la taille : un matériau plus dense tasse la même masse dans moins de volume."]);

E("s8f-u2-identify-substance", 2, ["SC8.4.4"], 3, "var", varset([
  function () {
    var q = mcq("Un élève mesure un échantillon liquide : masse 63 g, volume 50 mL. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "Le glycérol",
      ["L'alcool éthylique", "L'huile à machine", "L'eau de mer"],
      "Calcule d'abord : MV égale m divisé par V, soit 63 g divisés par 50 mL, ce qui égale 1,26 g/mL. Puis associe au tableau : le glycérol y figure à 1,26 g/mL. Le tableau s'utilise après le calcul, et non à sa place.",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("Un échantillon de métal a une masse de 135 g et un volume de 50 cm3. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "L'aluminium",
      ["Le fer pur", "Le plomb pur", "Le sel gemme"],
      "MV égale m divisé par V, soit 135 g divisés par 50 cm3, ce qui égale 2,70 g/cm3. Le tableau liste l'aluminium à 2,70 g/cm3, bien sous le fer (7,87) et le plomb (11,34).",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("Un échantillon liquide a une masse de 39,5 g et un volume de 50 mL. Au moyen du tableau des masses volumiques, quelle substance est l'échantillon?",
      "L'alcool éthylique",
      ["L'huile à machine", "L'eau de mer", "L'eau"],
      "MV égale m divisé par V, soit 39,5 g divisés par 50 mL, ce qui égale 0,79 g/mL. Le tableau liste l'alcool éthylique à 0,79 g/mL, moins dense que l'eau, comme un alcool devrait l'être.",
      {});
    q.figure = s8fDensityTableFigure();
    return q;
  }
]), ["Deux étapes : calcule la masse volumique, puis trouve-la dans le tableau.", "Le tableau contient les réponses, mais seulement après ta division."]);

E("s8f-u2-displacement-calc", 2, ["SC8.4.4"], 2, "gen", function () {
  var Vi = pick([50, 100, 200]);
  var rise = pick([12, 15, 20, 25, 30]);
  var D = pick([1.2, 1.5, 2.0, 2.5, 3.0]);
  var m = Math.round(D * rise * 100) / 100;
  var dis = s8fdis(D, [m / Vi, m / (Vi + rise), D * 2, D / 2]);
  return mcq("Un cylindre gradué contient " + Vi + " mL d'eau. Une pierre est descendue dedans et le niveau monte à " + (Vi + rise) + " mL. La masse de la pierre est de " + s8fn(m) + " g. Quelle est la masse volumique de la pierre?",
    s8fn(D) + " g/cm3",
    dis.map(function (d) { return s8fn(d) + " g/cm3"; }),
    "Le volume de la pierre est l'eau déplacée : " + (Vi + rise) + " mL moins " + Vi + " mL égalent " + rise + " mL, et 1 mL égale 1 cm3. Puis MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + rise + " cm3, ce qui égale " + s8fn(D) + " g/cm3. Le niveau de départ n'est pas le volume de la pierre; la montée l'est.",
    {});
}, ["La montée du niveau est le volume. Soustrais avant de diviser.", "Le déplacement donne d'abord le volume; la masse volumique vient ensuite."]);

E("s8f-u2-cr-density-block", 2, ["SC8.4.4"], 2, "var", varset([
  function () {
    return textq("Un bloc rectangulaire mesure 20 cm sur 10 cm sur 5 cm et a une masse de 2700 g. (a) Calcule le volume du bloc. (b) Calcule sa masse volumique. (c) Énonce, avec une raison, si le bloc flotterait ou coulerait dans l'eau (masse volumique 1,00 g/cm3). (3 points)",
      ["le volume est 1000 cm3 à partir des trois dimensions multipliées", "la masse volumique est 2,7 g/cm3 à partir de la masse divisée par le volume", "il coule parce que sa masse volumique est plus grande que celle de l'eau"],
      "<b>Réponse modèle :</b> (a) V égale longueur fois largeur fois hauteur, soit 20 cm fois 10 cm fois 5 cm, ce qui égale 1000 cm3. (b) MV égale m divisé par V, soit 2700 g divisés par 1000 cm3, ce qui égale 2,7 g/cm3. (c) Le bloc coulerait : sa masse volumique, 2,7 g/cm3, est plus grande que la masse volumique de l'eau, 1,00 g/cm3, donc son poids l'emporte sur la force de flottabilité que l'eau peut fournir.<br><br><b>Points d'attribution :</b> 1 point pour le volume à partir des dimensions. 1 point pour le calcul de la masse volumique avec les unités. 1 point pour le jugement de couler lié à la comparaison des masses volumiques.",
      {});
  }
]), ["Trois étapes en ordre : les dimensions au volume, la masse et le volume à la masse volumique, la masse volumique à un appel flotter ou couler.", "La masse volumique de l'eau, 1,00, est la norme de comparaison pour la partie (c)."]);

/* ---------- SC8.4.5 La température et la masse volumique ---------- */

E("s8f-u2-temp-density", 2, ["SC8.4.5"], 1, "gen", function () {
  var cases = [
    { q: "Un ballon rempli d'air est mesuré, placé dans un congélateur, et mesuré de nouveau : sa circonférence est plus petite. Qu'est-il arrivé à la masse volumique de l'air à l'intérieur?", k: "Elle a augmenté, parce que la même masse d'air occupe maintenant un volume plus petit", w: ["Elle a diminué, parce que l'air froid pèse toujours moins que le même air quand il est chaud", "Elle est restée exactement la même, parce que la masse de l'air à l'intérieur n'a pas changé du tout", "Elle est tombée jusqu'à zéro, parce que l'air à l'intérieur s'est contracté dans le congélateur froid"] },
    { q: "L'alcool dans un thermomètre monte dans le tube par une journée chaude. Quel énoncé explique cela au moyen du volume et de la masse volumique?", k: "L'alcool réchauffé se dilate, prenant plus de volume, donc sa masse volumique baisse et il monte dans le tube", w: ["L'alcool réchauffé se contracte en chauffant, donc sa masse volumique augmente et le pousse dans le tube étroit", "Le tube de verre rétrécit dans la chaleur du jour, pressant l'alcool vers le haut à l'intérieur du tube", "La masse de l'alcool augmente à mesure qu'il se réchauffe, et la masse supplémentaire le force vers le haut dans le tube"] },
    { q: "Les lignes électriques sont tendues lâchement parce qu'elles pendents davantage en été qu'en hiver. Que montre l'affaissement?", k: "Le métal réchauffé se dilate, son volume augmente, et sa masse volumique diminue", w: ["Le métal réchauffé se contracte dans la chaleur et devient plus dense en le faisant", "Les lignes gagnent de la masse supplémentaire en restant dans la chaleur de l'été", "La gravité elle-même devient plus forte pendant les mois d'été"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La température change la masse volumique par le volume. Réchauffer une substance fait s'écarter ses particules : la même masse occupe plus de volume, donc la masse volumique baisse. Le refroidissement inverse le processus : le volume rétrécit et la masse volumique augmente. Le ballon, le thermomètre et les lignes électriques sont des démonstrations quotidiennes de la même relation.",
    {});
}, ["Garde la masse fixe et suis le volume : la masse volumique bouge dans l'autre direction.", "Se dilater veut dire moins dense; se contracter veut dire plus dense."]);

E("s8f-u2-ice-exception", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return mcq("La plupart des substances sont plus denses comme solides que comme liquides, mais la glace flotte sur l'eau. Quel énoncé explique l'exception?",
      "Quand l'eau gèle, elle se dilate à cause de sa structure moléculaire, donc la glace prend plus de volume pour la même masse et sa masse volumique tombe sous celle de l'eau liquide",
      ["La glace flotte seulement parce qu'elle emprisonne des bulles d'air en elle pendant qu'elle gèle, et l'eau gelée sans ces bulles coulerait au fond du lac",
       "La glace est plus froide que l'eau sous elle, et les objets froids flottent toujours sur les objets plus chauds sous eux, quelle que soit leur masse volumique",
       "L'eau est l'exception parce que son état liquide est plus dense que l'état liquide de toute autre substance connue, et son état solide suit la règle ordinaire"],
      "L'eau brise la règle générale. En gelant, ses molécules s'arrangent en une structure avec plus d'espace entre elles : le volume augmente pendant que la masse reste la même, donc la masse volumique diminue. La glace, à environ 0,92 g/cm3 dans les chiffres ronds utilisés en classe, est moins dense que l'eau liquide et flotte. L'eau est nommée l'exception explicitement.",
      {});
  }
]), ["L'exception concerne l'espacement : l'eau qui gèle écarte ses molécules.", "Plus de volume, même masse, masse volumique plus faible : la flottaison s'ensuit."]);

E("s8f-u2-hot-air", 2, ["SC8.4.5"], 1, "var", varset([
  function () {
    return mcq("Pourquoi l'air à l'intérieur d'une montgolfière devient-il moins dense quand il est chauffé?",
      "Les particules chauffées bougent plus vite et s'écartent davantage, donc chaque unité de volume contient moins de masse",
      ["Le chauffage retire les particules du ballon en les chassant par l'ouverture à sa base",
       "Les particules chauffées elles-mêmes rétrécissent en taille, laissant des vides entre elles qui ne contiennent aucune masse",
       "Le tissu du ballon s'étire et ajoute du volume, pendant que rien à l'intérieur du ballon ne change du tout"],
      "Le chauffage donne aux particules de l'air plus d'énergie; elles bougent plus vite et s'écartent davantage. Le volume du ballon contient alors moins de particules, moins de masse dans chaque unité de volume, ce qui est une masse volumique plus faible. Cette masse volumique plus faible est ce qui permet à l'air du ballon d'être soulevé par l'air extérieur plus frais et plus dense.",
      {});
  }
]), ["La même histoire que chaque cas de température : l'espacement décide de la masse volumique.", "Des particules écartées veulent dire moins de masse dans chaque unité de volume."]);

E("s8f-u2-cr-temp-situations", 2, ["SC8.4.5"], 3, "var", varset([
  function () {
    return textq("Utilise la relation entre la température, le volume et la masse volumique pour expliquer ces deux situations : (a) le revêtement de vinyle installé par temps froid doit être posé avec de petits espaces entre les morceaux; (b) on avertit les conducteurs de ne pas trop gonfler les pneus de voiture pendant les mois chauds d'été. (3 points)",
      ["le revêtement se dilate en se réchauffant, donc les espaces lui laissent de la place", "l'air chauffé dans les pneus se dilate et la pression augmente", "les deux découlent des particules qui s'écartent à mesure que la température augmente"],
      "<b>Réponse modèle :</b> Les deux situations viennent du même comportement : à mesure qu'une substance se réchauffe, ses particules bougent plus vite et s'écartent davantage, donc son volume augmente et sa masse volumique diminue. (a) Un revêtement posé serré au froid se dilaterait à mesure que le temps se réchauffe et, sans nulle part où aller, gondolerait; les petits espaces laissent de la place pour cette dilatation. (b) L'air scellé dans un pneu se dilate en chauffant l'été, et puisque le volume du pneu ne peut augmenter que légèrement, l'air qui se dilate augmente la pression à l'intérieur; un pneu rempli à sa limite le matin frais peut être poussé au-delà d'une pression sûre par la chaleur de l'après-midi.<br><br><b>Points d'attribution :</b> 1 point pour l'explication partagée par les particules (le réchauffement écarte les particules, le volume augmente, la masse volumique baisse). 1 point pour l'avoir appliquée à la place de dilatation du revêtement. 1 point pour l'avoir appliquée à l'air du pneu qui se dilate et augmente la pression.",
      {});
  }
]), ["Un principe, deux applications. Énonce le principe une fois, puis utilise-le deux fois.", "La dilatation est le mot clé dans les deux situations."]);

/* ---------- SC8.4.6 Les changements de masse volumique dans la vie quotidienne ---------- */

E("s8f-u2-seasoning", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("Les constructeurs de bateaux sèchent (assaisonnent) le bois avant de l'utiliser, et le bois séché flotte plus haut que le bois fraîchement coupé. Pourquoi le séchage change-t-il le bois de cette façon?",
      "Le séchage retire l'eau du bois, donc sa masse baisse pendant que son volume reste presque le même, ce qui abaisse sa masse volumique",
      ["Le séchage ajoute de l'air dans le bois à mesure qu'il s'assaisonne, et l'air ajouté augmente la masse du bois",
       "Le séchage chauffe le bois en permanence, ce qui garde ses particules écartées même après qu'il refroidit de nouveau",
       "Le séchage change la couleur du bois, et le changement de couleur est ce qui change la façon dont l'eau le soutient"],
      "L'assaisonnement est un changement délibéré de masse volumique. Le bois frais contient beaucoup d'eau; en séchant, cette eau part, la masse baisse, le volume change à peine, et la masse volumique tombe. Une masse volumique plus faible veut dire que le bois flotte plus haut, une raison pour laquelle les constructeurs assaisonnent le bois pour les embarcations.",
      {});
  }
]), ["Qu'est-ce qui quitte le bois pendant le séchage, et quel ingrédient de la masse volumique cela change-t-il?", "Masse en baisse, volume stable : masse volumique en baisse."]);

E("s8f-u2-density-life", 2, ["SC8.4.6"], 1, "gen", function () {
  var cases = [
    { q: "Un sous-marin plonge en ouvrant ses réservoirs de ballast à la mer. Quel changement de masse volumique fait se produire la plongée?", k: "L'eau qui entre dans les réservoirs augmente la masse volumique moyenne du sous-marin au-dessus de celle de l'eau de mer, donc il coule", w: ["L'air qui entre dans les réservoirs de ballast abaisse la masse volumique moyenne du sous-marin, et c'est ce qui le fait couler", "Les réservoirs chauffent l'eau de mer à mesure qu'elle entre, abaissant la masse volumique de l'eau autour du sous-marin", "La coque du sous-marin rétrécit en volume jusqu'à ce que le bâtiment entier soit plus dense que l'eau de mer autour de lui"] },
    { q: "Un poisson monte de l'eau profonde vers la surface en gonflant sa vessie natatoire de gaz. Qu'est-ce que le poisson a changé?", k: "Son volume a augmenté pendant que sa masse changeait à peine, abaissant sa masse volumique moyenne", w: ["Sa masse a augmenté à mesure que la vessie se remplissait, ce qui a augmenté sa masse volumique moyenne au lieu de l'abaisser", "La masse volumique de l'eau autour du poisson a diminué à mesure que le poisson commençait à monter", "Son poids a augmenté jusqu'à dépasser la force de flottabilité qui agit sur lui dans l'eau"] },
    { q: "Les nageurs trouvent plus facile de flotter dans l'océan que dans un étang d'eau douce. Quel fait de masse volumique explique cela?", k: "L'eau de mer est plus dense que l'eau douce, donc elle fournit un plus grand effet de flottabilité pour le même nageur", w: ["L'eau de mer est moins dense que l'eau douce, donc les nageurs coulent moins profondément quand ils flottent dans l'océan", "L'océan est beaucoup plus profond qu'un étang, et cette profondeur est ce qui tient les nageurs à la surface", "Le sel dans l'eau rend le corps même du nageur moins dense au moment où il touche la peau"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les masses volumiques changent naturellement et par conception. Un sous-marin inonde ses réservoirs de ballast pour augmenter sa masse volumique moyenne et plonger; un poisson gonfle sa vessie natatoire pour augmenter son volume et abaisser sa masse volumique moyenne et monter; et un nageur flotte plus facilement dans l'eau de mer plus dense que dans l'eau douce. Dans chaque cas, la comparaison des masses volumiques décide du mouvement.",
    {});
}, ["Demande de qui la masse volumique change, et dans quelle direction.", "Couler exige une masse volumique plus grande que le fluide; monter en exige une plus petite."]);

E("s8f-u2-cr-raise-ship", 2, ["SC8.4.6"], 3, "var", varset([
  function () {
    return textq("Un bateau de pêche a coulé dans un port et repose sur le fond. Des équipes de sauvetage attachent de gros barils scellés à la coque et les pompent pleins d'air, et le bateau monte lentement. Explique comment cela fonctionne, au moyen de la masse volumique moyenne et de la flottabilité. (3 points)",
      ["les barils ajoutent un grand volume avec peu de masse", "le bateau et les barils ensemble ont une masse volumique moyenne sous celle de l'eau", "donc la force de flottabilité l'emporte sur le poids total"],
      "<b>Réponse modèle :</b> Sur le fond, la masse volumique moyenne du bateau est plus grande que celle de l'eau, donc son poids bat la force de flottabilité. Les barils scellés changent la combinaison : ils ajoutent beaucoup de volume tout en ajoutant très peu de masse, parce que l'air en eux a une très faible masse volumique. La masse volumique moyenne du bateau plus les barils tombe sous la masse volumique de l'eau, donc la force de flottabilité sur le volume combiné devient plus grande que le poids total, et le bateau monte. C'est le même principe de masse volumique moyenne qui permet à un navire d'acier de flotter.<br><br><b>Points d'attribution :</b> 1 point pour les barils qui ajoutent du volume avec peu de masse. 1 point pour la masse volumique moyenne de la combinaison qui tombe sous la masse volumique de l'eau. 1 point pour la force de flottabilité qui dépasse alors le poids, donc le bateau monte.",
      {});
  }
]), ["Rien du bateau lui-même ne change. Qu'est-ce que la combinaison du bateau plus les barils change?", "La masse volumique moyenne est tout le jeu : volume en hausse, masse à peine en hausse."]);

/* ---------- SC8.4.7 Les forces équilibrées et non équilibrées ---------- */

E("s8f-u2-forces", 2, ["SC8.4.7"], 1, "gen", function () {
  var cases = [
    { q: "Un chariot reste immobile sur une pente parce que l'attraction vers le bas de la pente est exactement égalée par la friction qui le retient. Comment les forces sur le chariot sont-elles décrites?", k: "Des forces équilibrées : égales et opposées, donc le chariot n'accélère pas", w: ["Des forces non équilibrées : le chariot est sur une pente, donc la gravité doit gagner", "Des forces équilibrées : les deux forces qui agissent sur le chariot pointent dans la même direction", "Aucune force d'aucune sorte n'agit sur un chariot qui reste immobile et ne bouge pas du tout"] },
    { q: "Une pierre tombée accélère à mesure qu'elle tombe dans l'air vers le sol. Comment les forces sur la pierre sont-elles décrites?", k: "Des forces non équilibrées : l'attraction de la gravité est plus grande que la résistance de l'air, donc la pierre accélère", w: ["Des forces équilibrées : les objets qui tombent ont toujours des forces équilibrées qui agissent sur eux", "Des forces non équilibrées : la résistance de l'air est plus grande que l'attraction de la gravité sur la pierre", "Aucune force du tout n'agit sur la pierre une fois qu'elle a quitté la main qui l'a lâchée"] },
    { q: "Un bateau flotte immobile à un quai, sans monter ni couler. Comment les forces sur le bateau sont-elles décrites?", k: "Des forces équilibrées : son poids et la force de flottabilité sont égaux et opposés", w: ["Des forces non équilibrées : flotter veut toujours dire que la force de flottabilité est la plus grande", "Des forces équilibrées : aucune force du tout n'agit sur quoi que ce soit qui flotte sur l'eau", "Des forces non équilibrées : son poids est plus grand que la force de flottabilité, mais seulement lentement"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les forces équilibrées sont égales et opposées : l'objet reste au repos ou garde son mouvement inchangé. Les forces non équilibrées sont inégales, et l'objet accélère dans la direction de la plus grande force. Un chariot immobile, une pierre qui accélère et un bateau qui flotte couvrent les trois modèles.",
    {});
}, ["Pose deux questions : les forces sont-elles égales, et le mouvement change-t-il?", "Égales et opposées veut dire équilibrées, quel que soit le décor."]);

E("s8f-u2-force-figure", 2, ["SC8.4.7"], 2, "var", varset([
  function () {
    var q = mcq("Le schéma montre une roche dans l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids de la roche. Que te disent les flèches, et qu'arrive-t-il à la roche?",
      "Le poids est plus grand que la force de flottabilité, donc les forces sont non équilibrées et la roche coule",
      ["La force de flottabilité est plus grande que le poids de la roche, donc la roche monte dans l'eau",
       "Les deux forces sont équilibrées et égales, donc la roche flotte suspendue à cette profondeur dans l'eau",
       "Les flèches dans le schéma montrent la masse de la roche et son volume, et non les forces qui agissent sur elle"],
      "La longueur de la flèche représente la taille de la force. La flèche vers le bas, le poids, est plus longue que la flèche de flottabilité vers le haut, donc les forces sont non équilibrées avec le poids qui gagne : la roche coule. C'est la règle pour couler.",
      {});
    q.figure = s8fForceSVG("sink");
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un bateau à la surface de l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids du bateau. Que te disent les flèches?",
      "Les forces sont équilibrées et égales, donc le bateau flotte sans monter ni couler",
      ["Le poids est la plus grande des deux forces, donc le bateau est sur le point de couler sous la surface",
       "La force de flottabilité est la plus grande des deux, donc le bateau monte hors de l'eau",
       "Des flèches égales veulent dire qu'aucune force du tout n'agit sur le bateau pendant qu'il flotte là"],
      "Les deux flèches ont la même longueur, donc le poids et la force de flottabilité sont égaux et opposés : des forces équilibrées. Un objet qui flotte au repos est exactement cet équilibre, la règle pour flotter.",
      {});
    q.figure = s8fForceSVG("float");
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un ballon sous l'eau avec deux flèches de force : la flèche vers le haut représente la force de flottabilité et la flèche vers le bas le poids du ballon. Qu'arrive-t-il quand le ballon est relâché, et pourquoi?",
      "Il monte, parce que la force de flottabilité est plus grande que son poids, une paire de forces non équilibrées",
      ["Il coule directement au fond, parce que son poids est plus grand que la force de flottabilité qui pousse sur lui",
       "Il reste exactement où il est sous l'eau, parce que les deux forces qui agissent sur lui sont équilibrées",
       "Il se déplace de côté dans l'eau, parce que les deux flèches pointent verticalement vers le haut et le bas"],
      "La flèche vers le haut est beaucoup plus longue : la force de flottabilité sur le ballon rempli d'air dépasse de loin son petit poids. Les forces non équilibrées accélèrent l'objet vers la plus grande force, donc le ballon monte, le troisième modèle à côté de couler et de flotter.",
      {});
    q.figure = s8fForceSVG("rise");
    return q;
  }
]), ["La longueur de la flèche est la taille de la force. Compare les deux longueurs avant tout le reste.", "La flèche la plus longue gagne; des flèches égales s'équilibrent."]);

E("s8f-u2-newton", 2, ["SC8.4.7"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé sur la force et son unité est correct?",
      "La force se mesure en newtons; sur la Terre, une masse d'environ 100 g exerce une force d'environ 1 newton par la gravité",
      ["La force se mesure en kilogrammes; sur la Terre, une masse de 1 kg exerce une force d'exactement 1 newton",
       "La force se mesure en pascals; dans ce système, 1 newton de force égale exactement 1 pascal",
       "La force et la masse se mesurent toutes les deux dans la même unité, le gramme, dans chaque mesure prise en classe"],
      "Le newton est l'unité de la force. Le repère pratique : sur la Terre, environ 100 grammes de masse pèsent environ 1 newton. Les kilogrammes et les grammes mesurent la masse, et les pascals mesurent la pression; garder les unités séparées fait partie de garder les idées séparées.",
      {});
  }
]), ["La force a sa propre unité. Laquelle, et quel est le repère terrestre pour sa taille?", "Les newtons pour la force; les grammes et les kilogrammes pour la masse."]);

/* ---------- SC8.4.8 La masse et le poids ---------- */

E("s8f-u2-mass-weight", 2, ["SC8.4.8"], 1, "gen", function () {
  var cases = [
    { q: "Quelle quantité décrit la quantité de matière dans un objet, et avec quoi se mesure-t-elle?", k: "La masse, mesurée avec une balance en grammes ou en kilogrammes", w: ["La masse, mesurée avec un dynamomètre et consignée en newtons au laboratoire", "Le poids, mesuré avec une balance en grammes ou en kilogrammes", "Le poids, mesuré avec un dynamomètre en grammes"] },
    { q: "Quelle quantité décrit la force de la gravité qui tire sur un objet, et avec quoi se mesure-t-elle?", k: "Le poids, mesuré avec un dynamomètre (balance à ressort) en newtons", w: ["La masse, mesurée avec un dynamomètre et consignée en newtons au laboratoire", "Le poids, mesuré avec une balance et consigné en kilogrammes au laboratoire", "La masse, mesurée avec une balance et consignée en newtons au laboratoire"] },
    { q: "Une brique est pesée sur la Terre, puis descendue dans un réservoir d'eau, où son poids mesuré baisse. Qu'est-il arrivé à sa masse?", k: "Sa masse est restée la même; seul le poids mesuré a changé, parce que la force de flottabilité de l'eau en soutient une partie", w: ["Sa masse a diminué d'exactement la quantité d'eau qu'elle a déplacée en étant descendue sous la surface", "Sa masse a augmenté pendant qu'elle était dans le réservoir, parce que la brique a absorbé l'eau autour d'elle", "Sa masse est devenue zéro pour tout le temps qu'elle est restée submergée sous l'eau dans le réservoir"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La masse est la quantité de matière dans un objet; elle se mesure avec une balance et ne change pas quand l'objet est déplacé ou submergé. Le poids est la force de la gravité sur cette masse; il se mesure avec un dynamomètre en newtons et change quand la gravité change ou quand une autre force, comme la flottabilité, partage la charge.",
    {});
}, ["Quantité de matière : masse et balance. Attraction de la gravité : poids et dynamomètre.", "Submerger change l'attraction que tu mesures, jamais la matière dans la brique."]);

E("s8f-u2-moon-suitcase", 2, ["SC8.4.8"], 3, "var", varset([
  function () {
    return mcq("La valise d'une astronaute est remplie jusqu'à la limite de mission de 20 kg sur la Terre. À la station spatiale de la Lune, l'astronaute trouve que la valise pèse sensiblement moins, et s'inquiète que quelque chose a été retiré. Une collègue dit que rien ne manque. Qui a raison, et pourquoi?",
      "La collègue : la masse de la valise est toujours de 20 kg parce que sa matière est inchangée; son poids a baissé parce que la gravité de la Lune est plus faible que celle de la Terre",
      ["L'astronaute a raison de s'inquiéter : un poids plus faible veut toujours dire qu'une masse a été perdue de la valise quelque part pendant le voyage jusqu'à la station",
       "La collègue a raison que rien ne manque dans la valise, mais seulement parce que la masse de la valise a baissé avec son poids pendant la montée",
       "Ni l'une ni l'autre n'a raison : le poids d'un objet ne peut pas changer du tout à moins que la valise soit ouverte à la station et que quelque chose en soit retiré"],
      "La masse et le poids se séparent exactement ici. La valise contient la même quantité de matière sur la Lune, donc sa masse est toujours de 20 kg. Le poids est la force de la gravité sur cette masse, et l'attraction gravitationnelle de la Lune est plus faible que celle de la Terre, donc la même masse pèse moins. Ce scénario précis sert à séparer les deux idées.",
      {});
  }
]), ["Qu'est-ce qui voyage inchangé avec la valise, et qu'est-ce qui dépend d'où elle est?", "La matière se transporte; la gravité est locale."]);

E("s8f-u2-cr-mass-weight", 2, ["SC8.4.8"], 2, "var", varset([
  function () {
    return textq("Un camarade de classe insiste que la masse et le poids sont la même chose parce que « ma masse est de 50 kilogrammes, donc mon poids est de 50 aussi ». Corrige le camarade : décris la différence entre la masse et le poids, en utilisant les termes dynamomètre, balance et gravité, et donne la façon correcte d'énoncer chacune des deux quantités du camarade. (3 points)",
      ["la masse est la quantité de matière, mesurée avec une balance en kilogrammes", "le poids est la force de la gravité sur la masse, mesuré avec un dynamomètre en newtons", "le poids change si la gravité change pendant que la masse ne change pas"],
      "<b>Réponse modèle :</b> La masse et le poids sont des quantités différentes. La masse est la quantité de matière dans un objet; elle se mesure avec une balance et s'énonce en grammes ou en kilogrammes, donc la masse du camarade est bien de 50 kg, et elle reste de 50 kg où qu'il aille. Le poids est la force de la gravité qui tire sur cette masse; il se mesure avec un dynamomètre (une balance à ressort) et s'énonce en newtons. Sur la Terre, le poids du camarade est d'environ 500 N (environ 10 N pour chaque kilogramme, selon le repère d'environ 1 N par 100 g). Sur la Lune, la même masse de 50 kg pèserait beaucoup moins, parce que la gravité de la Lune est plus faible, pendant que la masse resterait inchangée.<br><br><b>Points d'attribution :</b> 1 point pour la masse définie comme la quantité de matière, mesurée avec une balance en kilogrammes. 1 point pour le poids défini comme la force de la gravité, mesuré avec un dynamomètre en newtons. 1 point pour le test du changement : le poids varie avec la gravité, la masse non.",
      {});
  }
]), ["Le camarade a le bon nombre sur la mauvaise quantité. Sépare les deux idées, puis réénonce les deux.", "L'une se mesure avec une balance, l'autre avec un dynamomètre."]);

/* ---------- SC8.4.9 La flottabilité ---------- */

E("s8f-u2-buoyancy-rule", 2, ["SC8.4.9"], 1, "var", varset([
  function () {
    return mcq("Un objet est placé entièrement sous l'eau et relâché. Quelle règle décide s'il flotte vers le haut ou coule?",
      "Il flotte si la force de flottabilité sur lui est plus grande que son poids, et coule si son poids est plus grand que la force de flottabilité",
      ["Il flotte s'il se trouve être plus léger, dans l'ensemble, que le récipient qui contient l'eau dans laquelle l'objet a été placé",
       "Il coule s'il est fait d'un matériau solide quelconque, quelles que soient les tailles des forces qui agissent sur lui",
       "Il flotte chaque fois que sa masse, mesurée en kilogrammes, est moindre que la température de l'eau dans laquelle il a été placé"],
      "La flottabilité est un concours de deux forces. La force de flottabilité pousse vers le haut; le poids de l'objet tire vers le bas. Une force de flottabilité plus grande veut dire que l'objet monte et flotte; un poids plus grand veut dire qu'il coule; des forces égales veulent dire qu'il reste suspendu ou flotte au repos. Le matériau seul ne décide rien; les forces décident.",
      {});
  }
]), ["Deux forces, une gagnante. Nomme les deux forces avant de choisir.", "Poussée vers le haut contre attraction vers le bas : c'est toute la règle."]);

E("s8f-u2-archimedes", 2, ["SC8.4.9"], 2, "var", varset([
  function () {
    return mcq("Qu'énonce le principe d'Archimède?",
      "La force de flottabilité qui agit sur un objet égale le poids du fluide déplacé par l'objet",
      ["La force de flottabilité qui agit sur un objet égale le volume du fluide déplacé par l'objet",
       "La force de flottabilité qui agit sur un objet égale le poids de l'objet lui-même",
       "La force de flottabilité qui agit sur un objet égale la force de la gravité qui agit sur le fluide dans le récipient"],
      "Le principe d'Archimède lie la flottabilité au déplacement : pousse l'eau de côté, et l'eau repousse avec une force égale au poids de l'eau poussée de côté. C'est le poids du fluide déplacé qui compte, et non son volume seul : le même volume d'un fluide plus dense pèse plus et soulève plus.",
      {});
  }
]), ["Le principe est une égalité. La force de flottabilité égale le poids de quoi?", "Le poids du fluide déplacé : force égale force."]);

E("s8f-u2-balls", 2, ["SC8.4.9"], 1, "gen", function () {
  var cases = [
    { q: "Trois balles de la même taille, faites de styromousse, de caoutchouc et de métal, sont poussées sous l'eau et relâchées au même moment. Quelle description de ce qui arrive est correcte?", k: "La balle de styromousse jaillit vers le haut et flotte haut, la balle de caoutchouc monte et flotte plus bas, et la balle de métal coule", w: ["Les trois balles flottent exactement au même niveau dans l'eau, parce que les trois ont la même taille", "La balle de métal flotte le plus haut des trois, parce que c'est la balle la plus lourde des trois", "La balle de caoutchouc coule directement au fond, parce que le caoutchouc absorbe l'eau à l'instant où il la touche"] },
    { q: "Un ballon de plage est très difficile à garder sous l'eau dans une piscine, et il jaillit dehors quand on le relâche. Quel énoncé explique le ballon de plage?", k: "Sa force de flottabilité quand il est entièrement immergé est beaucoup plus grande que son petit poids, donc la force non équilibrée le pousse vers le haut", w: ["Son poids est plus grand que la force de flottabilité sur lui, donc le ballon s'échappe vers le haut hors de l'eau", "La pression de l'eau annule son poids entièrement, donc aucune force n'agit sur le ballon du tout", "L'air scellé à l'intérieur du ballon est attiré par l'air au-dessus de la piscine, et cette attraction soulève le ballon"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La même taille veut dire la même eau déplacée et à peu près la même force de flottabilité disponible; les poids diffèrent énormément. La styromousse légère et un ballon de plage ont des poids bien sous cette force de flottabilité et sont poussés vers le haut; le poids du métal dense la dépasse et coule. La comparaison des deux forces explique chaque cas.",
    {});
}, ["Même taille, même eau déplacée. Qu'est-ce qui diffère d'une balle à l'autre?", "Le poids est la variable; la flottabilité est presque fixe selon la taille."]);

E("s8f-u2-cr-piggyback", 2, ["SC8.4.9"], 3, "var", varset([
  function () {
    return textq("Un élève trouve beaucoup plus facile de porter un petit frère sur son dos dans une piscine que dans le salon, même si la masse du frère est la même aux deux endroits. Explique la différence au moyen des forces de flottabilité. (3 points)",
      ["dans la piscine, l'eau exerce une force de flottabilité sur le frère", "la force de flottabilité agit à l'opposé de son poids, donc l'élève ne soutient que la différence", "sa masse et son vrai poids sont inchangés; la charge apparente est réduite"],
      "<b>Réponse modèle :</b> La masse du frère, et donc son vrai poids, est la même dans la piscine que dans le salon. La différence est une deuxième force. Submergé dans la piscine, l'eau exerce une force de flottabilité sur le frère, égale au poids de l'eau que son corps déplace, et cette force pousse vers le haut, à l'opposé de son poids. L'élève au fond n'a qu'à soutenir ce qui reste : le poids moins la force de flottabilité. Dans le salon, il n'y a aucune force de flottabilité qui vaille la peine d'être nommée, donc l'élève porte le poids entier.<br><br><b>Points d'attribution :</b> 1 point pour la force de flottabilité qui agit sur le frère submergé. 1 point pour elle qui agit à l'opposé de son poids, réduisant la charge que l'élève soutient. 1 point pour avoir énoncé que sa masse et son vrai poids sont inchangés.",
      {});
  }
]), ["Même frère, même masse. Quelle force supplémentaire existe dans la piscine qui n'existe pas dans le salon?", "L'eau aide à le porter. Dis comment, en termes de forces."]);

/* ---------- SC8.4.10 La pression, quantitativement ---------- */

E("s8f-u2-calc-pressure", 2, ["SC8.4.10"], 2, "gen", function () {
  var pairs = [[200, 4], [100, 0.5], [500, 10], [1000, 20], [250, 5], [400, 2], [2000, 0.5], [600, 20], [100, 4], [2000, 10], [150, 0.25], [900, 30]];
  var pr = pick(pairs);
  var F = pr[0], A = pr[1], P = F / A;
  var dis = s8fdis(P, [F * A, P * 2, P / 2, F - A, F + A]);
  return mcq("Une force de " + F + " N est appliquée sur une surface de " + s8fn(A) + " m2. Quelle pression est exercée?",
    s8fn(P) + " Pa",
    dis.map(function (d) { return s8fn(d) + " Pa"; }),
    "La pression est la force répartie sur la surface : P égale F divisé par A, soit " + F + " N divisés par " + s8fn(A) + " m2, ce qui égale " + s8fn(P) + " Pa. Un pascal est un newton réparti sur un mètre carré, donc l'unité découle du calcul.",
    {});
}, ["Pression égale force divisée par surface. Divise, et la réponse est en pascals.", "Répartir une force sur plus de surface abaisse la pression, ne l'augmente jamais."]);

E("s8f-u2-calc-force", 2, ["SC8.4.10"], 2, "gen", function () {
  var F1 = pick([10, 20, 25, 40, 50]);
  var ratio = pick([4, 5, 8, 10]);
  var A1 = 5, A2 = A1 * ratio, F2 = F1 * ratio;
  var dis = s8fdis(F2, [F1, F2 * 2, F1 + ratio, F2 - F1, F1 * 2]);
  return mcq("Dans un monte-charge hydraulique, une force de " + F1 + " N est appliquée à un petit piston d'une surface de " + A1 + " cm2. Le grand piston a une surface de " + A2 + " cm2. Quelle force le grand piston exerce-t-il?",
    F2 + " N",
    dis.map(function (d) { return s8fn(d) + " N"; }),
    "La pression est la même dans tout le liquide confiné : P égale F divisé par A, soit " + F1 + " N divisés par " + A1 + " cm2, ce qui égale " + (F1 / A1) + " N/cm2. Sur le grand piston, F égale P fois A, soit " + (F1 / A1) + " fois " + A2 + ", ce qui égale " + F2 + " N. La force est multipliée par le même rapport que les surfaces, " + ratio + " fois, ce qui est le but d'un monte-charge hydraulique.",
    {});
}, ["La pression est partagée; la force augmente en proportion de la surface. Trouve d'abord la pression, puis applique-la au grand piston.", "Le rapport des surfaces et le rapport des forces sont le même nombre."]);

E("s8f-u2-calc-area", 2, ["SC8.4.10"], 3, "gen", function () {
  var pairs = [[200, 50], [1000, 200], [500, 25], [2400, 400], [800, 80], [360, 60], [1500, 300], [720, 90]];
  var pr = pick(pairs);
  var F = pr[0], P = pr[1], A = F / P;
  var dis = s8fdis(A, [A * 2, A / 2, F * P / 100, P / F * 100, A + 5]);
  return mcq("Une pièce de machine doit exercer une force de " + F + " N tout en gardant la pression sur la surface à " + P + " Pa. Quelle surface de contact est exigée?",
    s8fn(A) + " m2",
    dis.map(function (d) { return s8fn(d) + " m2"; }),
    "Réarrange la formule de la pression : A égale F divisé par P, soit " + F + " N divisés par " + P + " Pa, ce qui égale " + s8fn(A) + " m2. Pour garder la pression basse à une force donnée, la surface doit être assez grande pour répartir la force; la division la dimensionne exactement.",
    {});
}, ["Surface égale force divisée par pression. C'est la troisième forme de la même formule.", "Vérifie la direction : plus de pression permise exigerait moins de surface."]);

E("s8f-u2-snowshoes", 2, ["SC8.4.10"], 1, "var", varset([
  function () {
    return mcq("Une personne portant des raquettes peut marcher sur la neige profonde et molle sans s'enfoncer, tandis que la même personne en bottes s'enfonce à chaque pas. Qu'est-ce qui explique la différence?",
      "Les raquettes répartissent le poids (la force) de la personne sur une surface beaucoup plus grande, donc la pression sur la neige est beaucoup plus faible",
      ["Les raquettes réduisent le poids réel de la personne pendant tout le temps qu'elle les porte sur la neige, donc chaque pas presse plus légèrement sur la surface",
       "Les raquettes augmentent la pression sur la neige en concentrant le poids sur leurs cadres, ce qui tasse la neige plus durement sous chaque pas que la personne fait",
       "Les raquettes changent la masse de la personne pendant qu'elles sont portées, donc la gravité tire moins sur elle et son poids total sur la neige diminue en conséquence"],
      "La force est identique dans les deux cas : le poids de la personne. La pression est la force divisée par la surface, donc répartir la même force sur la plus grande surface des raquettes abaisse la pression sous ce que la neige peut soutenir sans céder. Les bottes concentrent la force sur une petite surface et la pression perce.",
      {});
  }
]), ["Même personne, même poids. Une seule quantité dans P égale F divisé par A change.", "Plus grande surface, plus petite pression."]);

E("s8f-u2-cr-pressure-crate", 2, ["SC8.4.10"], 2, "var", varset([
  function () {
    return textq("Une caisse pèse 800 N et repose sur une base qui mesure 2 m sur 1 m. (a) Calcule la pression que la caisse exerce sur le plancher. (b) La caisse est placée sur une large planche qui double la surface de contact. Énonce la nouvelle pression et explique, au moyen de la relation de pression, pourquoi les travailleurs d'entrepôt utilisent de telles planches sous les caisses lourdes sur un sol mou. (3 points)",
      ["la surface de la base est 2 m2 et la pression est 400 Pa", "doubler la surface de contact réduit la pression de moitié à 200 Pa", "une pression plus faible veut dire que la surface est moins susceptible d'être endommagée ou de s'enfoncer"],
      "<b>Réponse modèle :</b> (a) La surface de la base est 2 m fois 1 m, ce qui égale 2 m2. P égale F divisé par A, soit 800 N divisés par 2 m2, ce qui égale 400 Pa. (b) Doubler la surface de contact à 4 m2 donne P égale 800 divisé par 4, soit 200 Pa : à la même force, doubler la surface réduit la pression de moitié. Les travailleurs utilisent des planches pour exactement cette raison : le poids de la caisse est inchangé, mais réparti sur une plus grande surface il presse moins sur chaque partie du sol, donc un sol mou est moins susceptible de céder ou d'être endommagé, le même principe que les raquettes.<br><br><b>Points d'attribution :</b> 1 point pour la surface et la pression de 400 Pa. 1 point pour la pression réduite de moitié, 200 Pa, quand la surface double. 1 point pour l'explication liant une pression plus faible à la protection de la surface à force inchangée.",
      {});
  }
]), ["La partie (a) exige d'abord la surface. La partie (b) est le principe des raquettes avec des nombres.", "La force reste fixe partout; seuls la surface et la pression bougent, en directions opposées."]);

/* ---------- SC8.4.11 La pression, le volume et la température dans les gaz ---------- */

E("s8f-u2-gas-laws", 2, ["SC8.4.11"], 1, "gen", function () {
  var cases = [
    { q: "Une seringue scellée d'air est enfoncée, réduisant de moitié le volume de l'air pendant que sa température reste la même. Qu'arrive-t-il à la pression de l'air à l'intérieur?", k: "Elle augmente, parce que les particules sont entassées dans un espace plus petit et frappent les parois plus souvent", w: ["Elle diminue, parce que l'air comprimé dans un espace plus petit perd toujours de la pression à mesure qu'il est pressé", "Elle reste exactement la même, parce que la quantité d'air scellée à l'intérieur de la seringue n'a pas changé du tout", "Elle tombe jusqu'à zéro et y reste jusqu'à ce que le piston de la seringue soit relâché de nouveau"] },
    { q: "Un ballon rempli d'air est placé au soleil chaud, libre de se dilater, et il grossit. Sa pression reste à peu près la même. Quelle relation cela montre-t-il?", k: "Augmenter la température d'un gaz augmente son volume quand la pression est gardée constante", w: ["Augmenter la température d'un gaz diminue son volume quand la pression est gardée constante", "La température d'un gaz n'a aucun effet du tout sur le volume que le gaz occupe", "Le volume du gaz a grossi parce que sa pression a doublé pendant qu'il restait au soleil"] },
    { q: "Une bouteille de plongée est remplie à haute pression à la boutique de plongée. En termes de particules, qu'est-ce qui est vrai de l'air à l'intérieur comparé à l'air à la pression ordinaire?", k: "Beaucoup plus de particules sont tassées dans le même volume, et c'est pourquoi les gaz, contrairement aux liquides, peuvent être comprimés de cette façon", w: ["Les particules de l'air elles-mêmes ont rétréci en taille pour que davantage d'entre elles entrent dans la bouteille", "L'air à l'intérieur de la bouteille est devenu un liquide sous la très haute pression utilisée pour remplir la bouteille", "La bouteille contient exactement le même nombre de particules que l'air ordinaire, chacune sous plus de force"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Pour les gaz, les deux relations sont : augmenter la pression sur un gaz diminue son volume quand la température est gardée constante, et augmenter la température augmente son volume quand la pression est gardée constante. Les deux fonctionnent parce que les particules de gaz sont loin les unes des autres avec de l'espace vide entre elles, donc les gaz peuvent être comprimés d'une façon dont les liquides sont incapables.",
    {});
}, ["Garde clair quelle quantité est gardée constante dans chaque cas.", "Les particules de gaz ont de l'espace entre elles : cet espace est ce que la compression retire."]);

E("s8f-u2-compressible", 2, ["SC8.4.11"], 1, "var", varset([
  function () {
    return mcq("Pourquoi les gaz peuvent-ils être comprimés dans un volume beaucoup plus petit pendant que les liquides se compriment à peine?",
      "Les particules de gaz sont loin les unes des autres avec beaucoup d'espace vide entre elles, pendant que les particules de liquide sont déjà près les unes des autres avec peu d'espace à retirer",
      ["Les particules d'un gaz sont beaucoup plus petites en taille que les particules d'un liquide, donc beaucoup plus d'entre elles entrent dans le même récipient",
       "Les particules d'un liquide se repoussent si fortement les unes les autres qu'elles ne peuvent pas être poussées plus près, pendant que les particules d'un gaz s'attirent faiblement",
       "Les gaz pèsent moins que des volumes égaux de liquides, donc la pression appliquée de l'extérieur touche les gaz beaucoup plus fortement qu'elle ne touche les liquides"],
      "La compressibilité concerne l'espace entre les particules. Dans un gaz, les particules sont largement séparées, donc les pousser plus près retire l'espace vide et rétrécit le volume grandement. Dans un liquide, les particules se touchent déjà presque, donc il n'y a presque aucun espace à retirer et le volume change à peine : les liquides sont effectivement incompressibles, et c'est pourquoi ils servent dans les systèmes hydrauliques.",
      {});
  }
]), ["Imagine l'espacement des particules dans chaque état. Lequel a de l'espace à céder?", "Loin les unes des autres se comprime; près les unes des autres ne se comprime pas."]);

E("s8f-u2-depth-pressure", 2, ["SC8.4.11"], 2, "var", varset([
  function () {
    return mcq("Une grande bouteille est remplie d'eau et a trois trous percés le long d'un côté, en haut, au milieu et en bas. Quand la bouteille est remplie, le jet du bas jaillit le plus loin et le jet du haut coule à peine. Que montre cette démonstration sur la pression des fluides?",
      "La pression d'un fluide augmente avec la profondeur, et elle pousse dans toutes les directions, poussant le jet le plus profond le plus fort",
      ["La pression d'un fluide est la même à toutes les profondeurs de la bouteille, et le trou du bas est simplement plus grand que les deux trous au-dessus de lui",
       "La pression d'un fluide agit seulement vers le bas dans la bouteille, ce qui explique pourquoi le jet du bas est le plus fort et les jets de côté sont les plus faibles",
       "L'eau au fond de la bouteille est plus dense que l'eau près du haut, et la masse volumique seule explique pourquoi les trois jets voyagent à des distances différentes"],
      "Le poids de l'eau au-dessus presse vers le bas à travers le fluide, donc la pression augmente avec la profondeur : le trou du bas ressent la plus grande pression et pousse son jet le plus loin. Les jets partent de côté, ce qui montre aussi que la pression d'un fluide à un point agit dans toutes les directions, et non seulement vers le bas.",
      {});
  }
]), ["Plus d'eau au-dessus veut dire plus de poids qui presse vers le bas. Que devrait-il arriver à la pression avec la profondeur?", "Les jets de côté portent le deuxième message : la pression pousse dans toutes les directions."]);

/* ---------- SC8.5.1 Les activités personnelles et la dynamique des fluides ---------- */

E("s8f-u2-personal", 2, ["SC8.5.1"], 1, "gen", function () {
  var cases = [
    { q: "Un cuisinier trouve que la pâte à crêpes faite trop mince coule partout sur la plaque, pendant que la pâte faite trop épaisse reste en tas. Quelle propriété des fluides le cuisinier ajuste-t-il?", k: "La viscosité : la résistance de la pâte à l'écoulement", w: ["La masse volumique : la masse de la pâte par unité de volume", "La pression : la force que la pâte exerce sur la plaque", "La flottabilité : la force que la plaque exerce sur la pâte"] },
    { q: "Un mécanicien choisit une huile à moteur plus mince pour une voiture qui roulera pendant un hiver de Terre-Neuve. Quel fait des fluides est derrière le choix?", k: "La viscosité de l'huile augmente à mesure que la température baisse, donc un grade plus mince est nécessaire pour la garder fluide dans le froid", w: ["La masse volumique de l'huile tombe jusqu'à zéro par temps froid à moins que l'huile soit un grade mince", "Le temps froid de l'hiver comprime l'huile dans le moteur, donc moins d'huile est nécessaire pour le remplir", "La pression de l'air d'hiver force l'huile épaisse et lourde hors des moteurs stationnés dans le froid"] },
    { q: "Une cycliste gonfle un pneu dur avant une course. Quel comportement des fluides utilise-t-elle?", k: "L'air est un fluide compressible, donc plus de particules peuvent être tassées dans le pneu pour augmenter sa pression", w: ["L'air est un fluide incompressible, tout comme les liquides scellés à l'intérieur des conduites de frein d'une voiture", "La viscosité de l'air baisse brusquement quand il est pompé dans un espace confiné comme un pneu", "La masse volumique du pneu lui-même diminue régulièrement à mesure que de plus en plus d'air y est ajouté"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La dynamique des fluides traverse les activités ordinaires : la pâte doit s'écouler au bon rythme, l'huile à moteur doit continuer de s'écouler dans le froid de l'hiver (la viscosité augmente à mesure que la température baisse, donc les grades d'hiver commencent plus minces), et les pneus fonctionnent parce que l'air se comprime. Relier l'activité à la propriété des fluides est la demande visée.",
    {});
}, ["Nomme le fluide, puis la propriété dont l'activité dépend.", "La pâte et l'huile sont des histoires de viscosité; le pneu est une histoire de compressibilité."]);

E("s8f-u2-winter-oil", 2, ["SC8.5.1"], 3, "var", varset([
  function () {
    return mcq("Deux moteurs identiques sont remplis de la même huile. L'un roule dans un garage chaud; l'autre est stationné dehors pendant une vague de froid de janvier à St. John's. À un démarrage à froid, l'huile du moteur extérieur circule mal et le moteur s'use plus vite. Quelle explication relie l'observation à la science des fluides?",
      "Le froid a augmenté la viscosité de l'huile, donc elle a résisté à l'écoulement vers les pièces mobiles; les particules de l'huile, bougeant lentement et restant près, ont produit plus de friction interne",
      ["La vague de froid a abaissé la viscosité de l'huile du moteur extérieur si loin que l'huile mince a coulé des pièces mobiles entièrement et les a laissées sans protection",
       "Le froid a comprimé l'huile dans le moteur extérieur jusqu'à ce qu'elle se transforme en un bloc solide, et un solide ne peut pas s'écouler pour lubrifier les pièces mobiles du moteur au démarrage",
       "Le froid de la nuit de janvier a changé la masse volumique de l'huile du moteur extérieur à zéro, donc la pompe à huile ne pouvait pas soulever l'huile jusqu'aux pièces mobiles qu'elle protège"],
      "L'observation, la propriété et l'explication par les particules s'alignent : une température qui baisse augmente la viscosité d'un liquide, l'huile épaissie résiste à l'écoulement dans les passages du moteur, et les pièces qui devraient être enduites roulent presque à sec. C'est pourquoi les grades d'huile d'hiver existent, et pourquoi le choix est une décision de dynamique des fluides, et non de marketing.",
      {});
  }
]), ["Une mauvaise circulation veut dire une grande résistance à l'écoulement. Que fait le froid à cette résistance?", "Suis-la entièrement : température, particules, friction, viscosité, circulation."]);

/* ---------- SC8.5.2 Les produits de la viscosité et les fluides de nettoyage ---------- */

E("s8f-u2-products", 2, ["SC8.5.2"], 1, "gen", function () {
  var cases = [
    { q: "Quel produit existe en plusieurs grades principalement à cause de notre compréhension de la viscosité?", k: "L'huile à moteur, classée pour que les moteurs puissent être assortis d'une huile qui s'écoule correctement à leurs températures de travail", w: ["Le verre à vitre, qui est classé pour les bâtiments selon la vitesse à laquelle le verre coule vers le bas avec le temps", "Le sel de table, qui est classé pour la vente selon l'épaisseur à laquelle les cristaux secs se versent de la boîte", "Les pneus de bicyclette, qui sont classés en tailles selon la viscosité du caoutchouc dont ils sont faits"] },
    { q: "Un shampoing est reformulé pour qu'il reste sur la main au lieu de couler, mais s'étale quand même dans les cheveux. Quelle compréhension a guidé la reformulation?", k: "La viscosité : ajuster la résistance du liquide à l'écoulement pour qu'il remplisse sa fonction", w: ["La flottabilité : ajuster la masse volumique moyenne du shampoing pour qu'il flotte sur l'eau", "La pression : ajuster la force que les parois de la bouteille de shampoing doivent supporter", "La masse volumique : ajuster la masse de shampoing qui est tassée dans chaque bouteille vendue"] },
    { q: "Le ketchup est conçu pour rester épais dans la bouteille et pourtant couler quand la bouteille est secouée et pressée. Sur quelle compréhension scientifique la conception est-elle construite?", k: "Comment le comportement d'écoulement d'un liquide peut être conçu pour sa fonction prévue", w: ["Comment les gaz sont comprimés et emmagasinés à l'intérieur de bouteilles scellées sous haute pression", "Comment les forces de flottabilité agissent sur les objets solides qui sont placés dans des liquides de masses volumiques différentes", "Comment la loi de Pascal transmet la pression à travers un fluide confiné d'un bout de la bouteille à l'autre"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Comprendre la viscosité permet aux fabricants de concevoir l'écoulement : l'huile à moteur vient en grades pour différentes températures, les shampoings et les peintures sont ajustés pour s'étaler sans couler, et des aliments comme le ketchup sont conçus autour de leur façon de se verser. La conception de chaque produit commence par la résistance du liquide à l'écoulement.",
    {});
}, ["Chaque produit est un problème d'écoulement résolu à dessein. Quelle propriété est conçue?", "Si le travail du produit concerne le versement, l'étalement ou l'enduction, la réponse est la viscosité."]);

E("s8f-u2-cleaning", 2, ["SC8.5.2"], 2, "var", varset([
  function () {
    return mcq("Le volet STSE principal étudie les fluides de nettoyage. Comment les savons et les détergents retirent-ils la graisse et la saleté que l'eau ordinaire laisse derrière?",
      "Leurs particules entourent et soulèvent la graisse, la brisant en minuscules gouttelettes qui restent en suspension dans l'eau et partent au rinçage",
      ["Ils dissolvent la surface sur laquelle la saleté repose, emportant toute la saleté avec elle à mesure que la surface se défait sous le nettoyage",
       "Ils augmentent la viscosité de l'eau jusqu'à ce que la saleté flotte de la surface entièrement d'elle-même et parte avec l'eau de rinçage versée dessus",
       "Ils compriment la graisse sur la surface jusqu'à ce que la graisse s'évapore dans l'air, laissant la surface propre sans aucun rinçage nécessaire"],
      "L'eau seule perle sur la graisse. Les particules de savon et de détergent ont des extrémités qui se comportent différemment : une extrémité se mélange à l'eau et l'autre à la graisse, donc elles entourent la graisse et la saleté, les soulèvent de la surface en minuscules gouttelettes en suspension, et l'eau de rinçage les emporte. C'est la science sur laquelle le sujet des fluides de nettoyage est construit.",
      {});
  }
]), ["L'eau ordinaire échoue sur la graisse. Que font les particules de nettoyage que l'eau ne peut pas faire?", "Entourer, soulever, suspendre, rincer : les quatre étapes."]);

E("s8f-u2-cr-cleaning-claim", 2, ["SC8.5.2"], 3, "var", varset([
  function () {
    return textq("Une publicité affirme : « Les fluides de nettoyage plus épais nettoient mieux, parce qu'une viscosité élevée veut dire un nettoyage plus fort. » Évalue cette affirmation : énonce ce que l'affirmation comprend bien ou mal au sujet de la viscosité, et décris un test équitable qui réglerait si un nettoyant de viscosité plus élevée nettoie réellement mieux. (4 points)",
      ["la viscosité est la résistance à l'écoulement, et non la force de nettoyage", "le nettoyage dépend de l'action du détergent sur la saleté et la graisse", "un test équitable garde la quantité de nettoyant, la surface, la saleté et le frottage les mêmes en variant le nettoyant", "un résultat mesurable comme la propreté jugée de la même façon pour chacun"],
      "<b>Réponse modèle :</b> L'affirmation confond deux propriétés différentes. La viscosité est la résistance d'un liquide à l'écoulement; elle dit avec quelle épaisseur un nettoyant se verse et s'étale, et non comment ses particules soulèvent la graisse. Le pouvoir de nettoyage vient de l'action du détergent : des particules qui entourent la saleté et la graisse et les suspendent pour qu'elles partent au rinçage, ce qu'un nettoyant mince peut faire aussi bien qu'un épais. Un test équitable : prépare des carreaux identiques avec la même quantité de la même saleté graisseuse; applique des quantités égales d'un nettoyant de viscosité élevée et d'un nettoyant de faible viscosité; frotte chacun le même nombre de coups avec la même brosse et rince de façon identique; puis compare la saleté restante au moyen de la même mesure pour les deux (par exemple, une photographie notée ou la masse de saleté retirée). Si le nettoyant plus épais ne retire pas plus de saleté dans des conditions identiques, l'affirmation échoue.<br><br><b>Points d'attribution :</b> 1 point pour avoir identifié la confusion (la viscosité est la résistance à l'écoulement, et non la force de nettoyage). 1 point pour la base correcte du nettoyage (l'action du détergent sur la saleté et la graisse). 1 point pour un test équitable avec les principales variables gardées les mêmes. 1 point pour un résultat mesurable, appliqué de façon identique.",
      {});
  }
]), ["Sépare d'abord les deux propriétés : ce que la viscosité mesure, et ce dont le nettoyage dépend.", "Puis conçois le test : même saleté, même quantité, même frottage, une chose changée."]);

/* ---------- SC8.5.3 La science et la technologie dans nos vies ---------- */

E("s8f-u2-lives", 2, ["SC8.5.3"], 1, "gen", function () {
  var cases = [
    { q: "Quel exemple montre la science et la technologie des fluides qui touchent la vie quotidienne dans une communauté?", k: "Le système d'eau d'une ville utilise des pompes et la pression pour livrer de l'eau propre aux maisons à toutes les hauteurs de la ville", w: ["Une ville peint l'extérieur de son château d'eau d'une nouvelle couleur chaque printemps pour le garder beau", "Une école achète un ensemble de nouveaux tapis de gym pour ses élèves à utiliser pendant le trimestre d'hiver à l'intérieur", "Une compagnie de traversier change son horaire de traversées pour la saison des fêtes à la fin de l'année"] },
    { q: "Quel exemple montre la science et la technologie des fluides qui touchent la vie quotidienne dans une maison?", k: "Les freins hydrauliques utilisent un liquide incompressible pour transporter la force du pied du conducteur aux quatre roues", w: ["Une famille choisit un plus grand écran de télévision à monter sur le mur de son salon à la maison", "Un élève aiguise un ensemble de crayons à l'aiguisoir avant le début des classes le matin", "Un boulanger règle la minuterie du four pour qu'un gâteau qui cuit dedans n'y soit pas laissé trop longtemps"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La science des fluides atteint la vie quotidienne par les systèmes construits sur elle : la livraison d'eau sous pression, les freins hydrauliques, les systèmes de chauffage et les pompes. Les exemples qui comptent sont ceux où une propriété des fluides fait le travail.",
    {});
}, ["Cherche l'exemple où une propriété des fluides fait un travail.", "Les pompes, la pression et l'hydraulique sont les fluides au travail."]);

E("s8f-u2-community", 2, ["SC8.5.3"], 1, "var", varset([
  function () {
    return mcq("Une communauté côtière remplace les freins et l'équipement de levage dans son centre de service de véhicules et modernise la direction hydraulique du traversier. Quel énoncé décrit le mieux comment la science et la technologie touchent cette communauté?",
      "Les technologies des fluides construites sur la loi de Pascal et l'incompressibilité des liquides font le gros travail dans tout le système de transport de la communauté",
      ["La communauté est touchée par le changement seulement parce que le nouvel équipement coûte considérablement plus cher que l'ancien équipement qu'il remplace dans le centre",
       "La science des fluides touche cette communauté côtière seulement à l'intérieur de ses propres classes de sciences, et nulle part ailleurs dans la vie quotidienne des gens qui y vivent",
       "La direction hydraulique du traversier compte comme une technologie dans la communauté, mais les freins installés dans les véhicules routiers ordinaires ne comptent pas du tout comme une technologie"],
      "Les systèmes hydrauliques transmettent la force à travers des liquides confinés, et ils font fonctionner les freins, les monte-charges et la direction de la communauté également. La science et la technologie touchent une communauté par les systèmes de travail dont elle dépend, et non seulement par les laboratoires et les classes.",
      {});
  }
]), ["Le fil commun est une loi qui travaille dans plusieurs machines.", "La loi de Pascal fait le travail dans chaque exemple nommé."]);

/* ---------- SC8.5.4 La science qui sous-tend les technologies ---------- */

E("s8f-u2-underlying", 2, ["SC8.5.4"], 1, "gen", function () {
  var cases = [
    { q: "Un densimètre flotte plus haut dans un liquide que dans un autre et lit la masse volumique du liquide selon la profondeur à laquelle il s'enfonce. Quelle science sous-tend cette technologie?", k: "La flottabilité et la masse volumique : un objet flottant se dépose là où la force de flottabilité équilibre son poids, plus profondément dans les liquides moins denses", w: ["La viscosité : l'enfoncement du densimètre est ralenti par les liquides qui sont épais et à écoulement lent", "La loi de Pascal : la pression dans le liquide est transmise à travers lui et sur le densimètre qui y flotte", "La compressibilité : le liquide sous le densimètre est pressé plus petit par le poids propre du densimètre"] },
    { q: "Un thermomètre à liquide dans le verre est une technologie construite sur quelle science?", k: "La dilatation thermique : le volume et la masse volumique du liquide changent avec la température d'une façon prévisible", w: ["Le principe d'Archimède : le liquide à l'intérieur du tube est soulevé par le liquide qui l'entoure", "La loi de Pascal : la pression appliquée à un point est transmise à travers le liquide à chaque autre point", "La viscosité : le liquide chaud s'écoule plus facilement, donc il monte à l'intérieur du tube plus vite quand il est chauffé"] },
    { q: "La chaise d'un dentiste monte en douceur quand une petite pédale est pressée. Quelle science sous-tend la technologie?", k: "La loi de Pascal dans un système hydraulique : la pression appliquée à un liquide confiné est transmise à un plus grand piston", w: ["La flottabilité : la chaise flotte vers le haut sur un réservoir d'eau caché construit dans la base de la chaise", "La dilatation thermique : presser la pédale réchauffe le liquide dans la chaise jusqu'à ce qu'il se dilate et la soulève", "La superposition des masses volumiques : les liquides à l'intérieur de la chaise se trient en couches selon leurs masses volumiques"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Chaque technologie des fluides repose sur un morceau de la science du volet : le densimètre sur la flottabilité et la masse volumique, le thermomètre sur la dilatation thermique, et la chaise hydraulique sur la loi de Pascal. Nommer la science sous-jacente est la demande visée.",
    {});
}, ["Demande ce que l'appareil fait, puis quelle idée du volet le rend possible.", "Jauge flottante : flottabilité. Liquide qui monte : dilatation. Force d'une pédale : Pascal."]);

E("s8f-u2-cr-underlying", 2, ["SC8.5.4"], 2, "var", varset([
  function () {
    return textq("Choisis une technologie : un sous-marin, une montgolfière, ou un vêtement de flottaison individuel (gilet de sauvetage). Décris la science qui sous-tend la technologie : nomme le principe des fluides dont elle dépend et explique comment la technologie utilise ce principe pour fonctionner. (3 points)",
      ["le principe nommé, comme la masse volumique moyenne et la flottabilité", "comment la technologie le change ou l'utilise", "le résultat qui fait fonctionner la technologie"],
      "<b>Réponse modèle :</b> Un sous-marin dépend de la masse volumique moyenne et de la flottabilité. Un bâtiment flotte quand sa masse volumique moyenne est moindre que celle de l'eau et coule quand elle est plus grande. Le sous-marin transporte des réservoirs de ballast : pour plonger, il inonde les réservoirs d'eau de mer, augmentant sa masse volumique moyenne au-dessus de celle de la mer pour que son poids l'emporte sur la force de flottabilité; pour faire surface, il chasse l'eau avec de l'air comprimé, abaissant sa masse volumique moyenne jusqu'à ce que la flottabilité gagne. Toute la technologie est une machine pour ajuster la masse volumique moyenne sur commande. (Une montgolfière, chauffant l'air pour abaisser sa masse volumique, ou un gilet de sauvetage, ajoutant un volume de faible masse volumique pour abaisser la masse volumique moyenne d'un nageur, traités selon le même modèle, méritent aussi tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour le principe directeur nommé correctement. 1 point pour la façon dont la technologie le manipule ou l'utilise. 1 point pour le résultat de fonctionnement expliqué.",
      {});
  }
]), ["Le principe d'abord, le mécanisme ensuite, le résultat en troisième.", "Les trois choix fonctionnent sur la masse volumique et la flottabilité, ajustées de façons différentes."]);

/* ---------- SC8.5.5 Les activités et les disciplines scientifiques ---------- */

E("s8f-u2-disciplines", 2, ["SC8.5.5"], 1, "var", varset([
  function () {
    return mcq("Un élève change l'huile à moteur d'une voiture à la maison et se demande pourquoi la vieille huile se verse plus lentement un matin froid. Quel appariement relie cette activité à la bonne discipline scientifique et au bon concept?",
      "Physique, mécanique des fluides : la viscosité de l'huile augmente à mesure que sa température baisse",
      ["Chimie, acides et bases : l'huile est devenue plus acide pendant la nuit",
       "Biologie, fonction cellulaire : les particules de l'huile sont vivantes et ralentissent au froid",
       "Sciences de la Terre, érosion : l'huile use le moteur comme une rivière use la roche"],
      "Les activités quotidiennes se relient à des disciplines précises. Verser de l'huile est une question de fluides, et les fluides appartiennent à la physique (mécanique des fluides); le concept à l'œuvre est la viscosité qui change avec la température. Associer l'activité à sa discipline et à son concept est l'habileté visée.",
      {});
  }
]), ["L'activité concerne un liquide qui s'écoule. Quelle discipline possède les liquides qui s'écoulent?", "Les fluides se trouvent en physique; le concept est la viscosité."]);

/* ---------- SC8.5.6 Les technologies de la masse volumique et de la flottabilité ---------- */

E("s8f-u2-pfd", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("Un gilet de sauvetage qui a servi pendant de nombreuses années est retiré parce qu'il ne garde plus un nageur à flot aussi bien qu'il le devrait. Quel énoncé donne l'explication correcte, et le principe sur lequel le gilet a été construit?",
      "Le gilet fonctionne en abaissant la masse volumique moyenne du nageur sous celle de l'eau; au fil des années, sa mousse se comprime et devient plus dense, donc il ajoute moins de volume de faible masse volumique et soulève moins",
      ["Le gilet fonctionne en augmentant la masse volumique moyenne du nageur au-dessus de celle de l'eau; au fil des années, il absorbe l'eau dans sa mousse et devient plus léger en vieillissant",
       "Le gilet fonctionne en chauffant l'eau autour du nageur pour le garder à flot; au fil des années d'utilisation, il perd graduellement cette capacité de chauffage et soulève donc moins",
       "Le gilet fonctionne en augmentant le poids du nageur pour qu'il s'assoie plus bas et plus stablement; au fil des années, les sangles s'étirent et il est trop lâche pour aider"],
      "Un vêtement de flottaison individuel est fait d'un matériau de très faible masse volumique. Porté, il rend la masse volumique moyenne du nageur plus le gilet moindre que celle de l'eau, donc la combinaison flotte. Le point du vieillissement : à mesure que les matériaux se brisent et se compriment au fil des années, ils deviennent plus denses, le gilet contribue moins de volume de faible masse volumique, et sa flottabilité s'estompe. La conception et sa défaillance fonctionnent toutes les deux sur la masse volumique moyenne.",
      {});
  }
]), ["Un principe explique à la fois pourquoi le gilet fonctionne et pourquoi un vieux gilet échoue.", "Masse volumique moyenne : le travail du gilet est de tirer la moyenne vers le bas."]);

E("s8f-u2-submarine", 2, ["SC8.5.6"], 2, "var", varset([
  function () {
    return mcq("Un sous-marin flotte à la surface. Son capitaine ordonne l'ouverture des réservoirs de ballast à la mer. Qu'arrive-t-il à l'intérieur des réservoirs, et qu'arrive-t-il au sous-marin?",
      "L'eau y entre en inondant, la masse volumique moyenne du sous-marin augmente au-dessus de celle de l'eau de mer, et il plonge",
      ["L'air y entre en jaillissant à la place de l'eau, la masse volumique moyenne du sous-marin baisse sous celle de l'eau de mer, et il plonge quand même",
       "L'eau y entre en inondant les réservoirs, le volume du sous-marin rétrécit sous la pression de l'eau ajoutée, et il monte vers la surface",
       "Les réservoirs se vident de leur eau dans la mer, et le poids du sous-marin augmente régulièrement jusqu'à ce qu'il plonge au fond"],
      "Les réservoirs de ballast sont les contrôles de masse volumique du sous-marin. Les inonder ajoute beaucoup de masse en eau pendant que le volume du sous-marin reste le même, donc sa masse volumique moyenne grimpe au-delà de la masse volumique de l'eau de mer et il coule dans une plongée contrôlée. Chasser l'eau de nouveau inverse le processus pour faire surface.",
      {});
  }
]), ["Inonder ajoute de la masse sans ajouter de volume. Suis la masse volumique moyenne.", "Plus dense que la mer veut dire vers le bas."]);

E("s8f-u2-average-density", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("Un bateau de bois flotte pendant des décennies, mais un bâton gorgé d'eau du même bois coule. Un bloc d'acier solide coule instantanément, mais un navire d'acier flotte. Quelle idée unique explique les deux paires?",
      "La masse volumique moyenne : ce qui compte est la masse totale divisée par le volume total de l'objet entier, y compris les espaces d'air et l'eau absorbée qu'il transporte",
      ["La forme seule : tout objet qui a la forme d'un bateau flottera sur l'eau, quel que soit le matériau dont il est fait et quel que soit son poids",
       "L'âge : les objets de bois plus vieux absorbent graduellement la capacité de flotter de l'eau autour d'eux à mesure que les années passent sur l'eau",
       "La surface : les objets avec plus de surface exposée à l'eau flottent toujours sur elle, quel que soit le matériau dont ils sont faits et quelle que soit leur densité"],
      "Ni le matériau ni la forme seule ne le décident. Le bâton gorgé d'eau a absorbé l'eau jusqu'à ce que sa masse volumique moyenne dépasse celle de l'eau; le bois sec du bateau et ses espaces d'air gardent sa moyenne en dessous. Le bloc d'acier est de l'acier solide partout, pendant que le navire est surtout de l'air enfermé : sa masse volumique moyenne, la masse sur le volume total, est sous celle de l'eau. Un rapport explique les quatre cas.",
      {});
  }
]), ["Les deux paires opposent le même matériau à lui-même. Quelle propriété peut différer entre deux objets du même matériau?", "La masse totale sur le volume total, espaces d'air compris."]);

/* ---------- SC8.5.7 Les technologies hydrauliques ---------- */

E("s8f-u2-pascal", 2, ["SC8.5.7"], 1, "var", varset([
  function () {
    return mcq("Qu'énonce la loi de Pascal?",
      "La pression appliquée à un fluide confiné est transmise également dans toutes les directions dans tout le fluide",
      ["La pression dans un fluide diminue régulièrement avec la profondeur, également dans toutes les directions dans tout le fluide",
       "Un gaz confiné se dilate à l'intérieur de son récipient jusqu'à ce que sa pression tombe jusqu'à zéro",
       "La force de flottabilité sur un objet égale le poids du fluide que l'objet déplace en coulant dedans"],
      "La loi de Pascal est le fondement de l'hydraulique et de la pneumatique : presse un fluide confiné à un point et l'augmentation de pression se ressent partout dans le fluide, dans toutes les directions. C'est ce qui permet à une petite force à un piston de produire une grande force à un autre.",
      {});
  }
]), ["Une loi, une idée : la pression appliquée ici se ressent partout dans le fluide.", "Ne la confonds pas avec le principe d'Archimède, qui concerne la flottabilité."]);

E("s8f-u2-hydraulic-pneumatic", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return mcq("Quelle comparaison des systèmes hydrauliques et pneumatiques est correcte?",
      "Les systèmes hydrauliques utilisent un liquide, qui est incompressible et garde un volume défini; les systèmes pneumatiques utilisent un gaz, qui est compressible et a un volume indéfini",
      ["Les systèmes hydrauliques utilisent un gaz, qui est compressible et indéfini en volume; les systèmes pneumatiques utilisent un liquide, qui n'est pas compressible",
       "Les deux systèmes utilisent des liquides comme fluide de travail; ils diffèrent seulement par la taille des pistons installés en eux",
       "Les systèmes hydrauliques utilisent un liquide qui se comprime facilement sous la pression, et cette compressibilité est ce qui les rend forts"],
      "Les deux familles de systèmes se divisent selon leur fluide. L'hydraulique fonctionne aux liquides : effectivement incompressibles, d'un volume défini, idéaux pour transmettre la force exactement, comme dans les freins et les monte-charges. La pneumatique fonctionne aux gaz : compressibles, d'un volume indéfini, comme dans les outils à air et les pneus. La loi de Pascal s'applique aux deux.",
      {});
  }
]), ["Les noms cachent les fluides : l'hydraulique est la famille de l'eau (les liquides), la pneumatique celle de l'air (les gaz).", "Incompressible va avec hydraulique."]);

E("s8f-u2-cr-car-lift", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return textq("Un monte-charge de station-service soulève une voiture de 12 000 N au moyen d'une pompe qui applique une force de seulement 300 N à un petit piston. Au moyen de la loi de Pascal et de la relation de pression, explique comment le monte-charge multiplie la force, et énonce quel doit être le rapport des surfaces des pistons. (3 points)",
      ["la pression appliquée au liquide confiné est transmise également", "la même pression agit sur le grand piston, donc la force augmente en proportion de la surface", "le rapport des surfaces doit être de 40 pour 1"],
      "<b>Réponse modèle :</b> Les 300 N de la pompe sur le petit piston créent une pression dans le liquide hydraulique confiné. Selon la loi de Pascal, cette pression est transmise également dans toutes les directions à travers le liquide, donc le grand piston sous la voiture ressent la même pression. La force est la pression fois la surface, F égale P fois A, donc le piston avec la plus grande surface produit la plus grande force. Pour transformer 300 N en 12 000 N, la force doit être multipliée par 40, donc la surface du grand piston doit être 40 fois celle du petit piston.<br><br><b>Points d'attribution :</b> 1 point pour la loi de Pascal qui transmet la pression à travers le liquide confiné. 1 point pour la force qui augmente en proportion de la surface à pression égale (F égale P fois A). 1 point pour le rapport des surfaces de 40 pour 1.",
      {});
  }
]), ["Le liquide transporte la pression, et non la force. La multiplication se produit à la surface du grand piston.", "Divise le poids de la voiture par la force de la pompe pour obtenir le rapport."]);

/* ---------- SC8.6.1 Identifier des questions sur les fluides ---------- */

E("s8f-u2-questions", 2, ["SC8.6.1"], 1, "var", varset([
  function () {
    return mcq("Une classe fait un remue-méninges de recherches après le laboratoire sur le débit. Quelle question découle d'un problème pratique des fluides et peut réellement être étudiée?",
      "Réchauffer l'huile à moteur change-t-il la vitesse à laquelle elle se vidange d'un moteur?",
      ["Pourquoi le miel est-il le liquide préféré de tout le monde?",
       "Quel liquide dans le monde est le meilleur de tous?",
       "Les fluides se comporteraient-ils différemment si la gravité était éteinte?"],
      "Une question qui peut être étudiée nomme quelque chose qui peut être changé et quelque chose qui peut être mesuré : réchauffer l'huile (changement) et chronométrer sa vidange (mesure). Les opinions, les superlatifs et les conditions impossibles ne peuvent pas être étudiés, même s'ils sonnent intéressants.",
      {});
  }
]), ["Une question qui peut être étudiée a besoin d'une variable changeable et d'un résultat mesurable.", "Les préférés et les mondes impossibles sont exclus; réchauffer et chronométrer sont dedans."]);

E("s8f-u2-question-problem", 2, ["SC8.6.1"], 2, "var", varset([
  function () {
    return mcq("Un atelier de bicyclettes trouve qu'un levier de frein hydraulique semble spongieux et que les freins sont faibles. Quelle question transforme ce problème pratique en une recherche?",
      "L'air emprisonné dans la conduite de frein réduit-il la force que les plaquettes de frein appliquent, comparé à une conduite contenant seulement du liquide de frein?",
      ["Pourquoi les clients qui entrent dans l'atelier de bicyclettes disent-ils toujours, quand on le leur demande, qu'ils préfèrent des freins forts sur une bicyclette?",
       "Qui était la personne qui a inventé les freins hydrauliques pour les bicyclettes en premier, et dans quel pays a-t-elle fait le travail?",
       "Les freins hydrauliques sur une bicyclette sont-ils simplement meilleurs que les freins à câble qu'ils remplacent de toutes les façons qui comptent pour un cycliste?"],
      "Le problème pratique est le levier spongieux. La version qui peut être étudiée nomme une cause soupçonnée qui peut être variée (l'air dans la conduite, qui se comprime, contrairement au liquide) et un effet qui peut être mesuré (la force aux plaquettes). Les questions d'histoire et d'opinion ne testent pas le problème.",
      {});
  }
]), ["Pars du problème de l'atelier. La question doit pouvoir tester une cause.", "L'air dans la conduite est le suspect testable : il se comprime, le liquide de frein non."]);

/* ---------- SC8.6.2 Reformuler les questions sous une forme testable ---------- */

E("s8f-u2-rephrase", 2, ["SC8.6.2"], 1, "var", varset([
  function () {
    return mcq("La question d'un élève se lit : « L'huile épaisse est-elle mauvaise pour les moteurs? » Quelle reformulation la met sous une forme testable?",
      "Comment la température de l'huile à moteur influe-t-elle sur le temps qu'il faut à 100 mL de l'huile pour s'écouler dans un entonnoir?",
      ["Pourquoi les moteurs des climats froids détestent-ils tant l'huile épaisse à écoulement lent en hiver?",
       "Le grade d'huile d'hiver est-il simplement une meilleure invention que le grade d'huile d'été dans l'ensemble?",
       "Quelle est la seule meilleure huile à moteur dans le monde entier pour chaque moteur jamais construit n'importe où?"],
      "La forme testable nomme la variable à changer (la température), la variable à mesurer (le temps d'écoulement pour un volume fixe), et le matériau testé. Le « mauvaise » de la question originale ne peut pas être mesuré; la reformulation le remplace par des quantités.",
      {});
  }
]), ["Testable veut dire : une variable à changer et une variable à mesurer, toutes les deux nommées.", "Remplace « mauvaise » par quelque chose qu'un chronomètre peut régler."]);

E("s8f-u2-define-problem", 2, ["SC8.6.2"], 2, "var", varset([
  function () {
    return mcq("Une équipe doit définir un problème pratique clairement avant d'étudier : les distributeurs de savon de son école se bouchent sans cesse en hiver. Quel énoncé définit le problème d'une façon qu'une recherche peut traiter?",
      "Pendant les mois froids, les distributeurs livrent le savon lentement ou pas du tout; l'équipe vérifiera si la viscosité plus élevée du savon à basse température en est la cause et si un savon de viscosité plus faible le corrige",
      ["Les distributeurs de savon dans les salles de bain de l'école sont ennuyants pendant les mois d'hiver, et ils devraient vraiment fonctionner beaucoup mieux qu'ils ne le font pour les élèves qui les utilisent chaque jour",
       "Quelqu'un devrait simplement inventer un nouveau savon parfait qui ne bouche jamais aucun distributeur ni drain n'importe où dans l'école, quel que soit le temps ou la saison de l'année",
       "Les distributeurs de l'école se bouchent en hiver simplement parce que l'hiver est froid dans cette province, donc il ne reste rien pour une recherche de l'équipe à tester ou à mesurer"],
      "Un problème pratique clairement défini énonce la difficulté observée, une cause soupçonnée testable, et à quoi ressemblerait une solution. Le premier choix fait les trois; les autres se plaignent, rêvent, ou déclarent la réponse avant de la tester.",
      {});
  }
]), ["Un problème défini a trois parties : la difficulté, une cause testable, et ce que le corriger veut dire.", "Déclarer la cause avant le test est le choix piège."]);

/* ---------- SC8.6.3 Les explications des écarts dans les données ---------- */

E("s8f-u2-discrepancy-flow", 2, ["SC8.6.3"], 2, "var", varset([
  function () {
    return mcq("Dans le laboratoire sur le débit, le temps du miel d'un groupe est de 9 secondes pendant que trois autres groupes consignent 24, 26 et 25 secondes pour le même miel dans des entonnoirs identiques. Quelle explication de l'écart devrait être étudiée en premier?",
      "Une différence de procédure dans l'essai du groupe rapide, comme l'entonnoir réchauffé, le miel qui est un échantillon différent, ou le chronométrage qui a commencé en retard",
      ["La viscosité du miel change au hasard d'une minute à l'autre dans le laboratoire, donc le résultat de chaque groupe est également valide tel quel et aucun ne devrait être revérifié",
       "Les trois groupes plus lents ont tous dû faire exactement la même erreur dans leurs essais avec le miel, au même moment et de la même façon, sans qu'aucun d'eux s'en aperçoive",
       "Le résultat rapide devrait simplement être moyenné avec les autres sans question, puisque plus de données est toujours mieux à la fin et qu'un écart ne peut jamais signaler un problème"],
      "Un seul résultat loin d'un groupe de résultats qui s'accordent pointe d'abord vers la procédure derrière lui : quelque chose différait dans cet essai. Le travail sur les écarts commence par chasser la différence (entonnoir réchauffé, miel différent, erreur de chronométrage), et non en rejetant ou en moyennant aveuglément la valeur bizarre.",
      {});
  }
]), ["Trois groupes s'accordent et un est loin. Où un scientifique regarde-t-il en premier?", "Un essai bizarre a habituellement une cause bizarre dans sa façon d'être mené."]);

E("s8f-u2-discrepancy-density", 2, ["SC8.6.3"], 3, "var", varset([
  function () {
    return mcq("Quatre groupes mesurent la masse volumique de la même barre d'aluminium. Trois rapportent 2,7 g/cm3. Le quatrième rapporte 3,4 g/cm3 et offre deux explications : (1) sa barre était un alliage différent; (2) il a lu le niveau du cylindre gradué d'en haut au lieu d'au niveau des yeux, sous-consignant le volume. Les barres ont toutes été coupées d'une seule feuille. Quelle évaluation est la plus forte?",
      "L'explication (2) est celle à appliquer : la source partagée exclut un alliage différent, et sous-consigner le volume gonfle la masse volumique calculée exactement dans la direction observée, donc le groupe devrait remesurer au niveau des yeux",
      ["L'explication (1) est celle à appliquer en premier, parce que toute barre de métal dans l'ensemble peut secrètement se révéler faite d'un alliage différent du reste des barres coupées pour la classe",
       "Les deux explications offertes par le quatrième groupe sont également susceptibles d'être justes, donc le résultat rapporté du groupe devrait simplement rester tel quel dans les données de la classe, sans aucun remesurage",
       "Aucune des explications ne compte ici : un écart de masse volumique de cette taille devrait simplement être supprimé de l'ensemble de données de la classe sans aucune vérification supplémentaire par le groupe ou l'enseignant"],
      "Peser des explications veut dire les tester contre les faits et la direction de l'erreur. Une seule feuille exclut un alliage différent. Un volume lu trop petit rend m divisé par V trop grand, ce qui correspond exactement au résultat élevé. L'évaluation la plus forte nomme l'explication qui correspond à la fois aux faits et à l'arithmétique, et prescrit le remesurage.",
      {});
  }
]), ["Teste chaque explication deux fois : correspond-elle aux faits, et pousse-t-elle le nombre de la façon dont le nombre a réellement bougé?", "Un volume trop petit rend la masse volumique trop grande. Cette correspondance de direction est décisive."]);

/* ---------- SC8.6.4 Compiler et afficher les données en histogramme ---------- */

E("s8f-u2-bargraph", 2, ["SC8.6.4"], 3, "var", varset([
  function () {
    var q = mcq("Un groupe a mesuré les temps d'écoulement de quatre liquides et les a affichés dans le diagramme à bandes montré. Son partenaire de laboratoire affirme que le graphique prouve que le liquide B est le plus visqueux parce que sa bande est « au milieu ». Quelle évaluation de l'affichage et de l'affirmation est correcte?",
      "Le diagramme à bandes est un affichage approprié pour comparer des liquides séparés, mais l'affirmation le lit mal : le liquide le plus visqueux est celui avec le temps d'écoulement le plus long, le liquide D",
      ["L'affirmation du partenaire est correcte telle quelle, parce que la bande du milieu dans tout diagramme à bandes représente toujours la valeur extrême dans les données",
       "Le diagramme à bandes est le mauvais affichage pour ces données; seul un graphique linéaire peut jamais être utilisé pour comparer les temps d'écoulement de liquides séparés",
       "Le graphique lui-même ne prouve rien du tout, parce que les temps d'écoulement mesurés ne peuvent être affichés sous aucune forme graphique pour comparaison"],
      "Les diagrammes à bandes conviennent à ces données : des catégories séparées (quatre liquides) chacune avec une valeur mesurée. Le lire est la deuxième habileté : la viscosité augmente avec le temps d'écoulement, donc la bande la plus longue, le liquide D, est le plus visqueux. L'affichage est bon et la lecture qu'en fait le partenaire est mauvaise.",
      {});
    q.figure = s8fHealthSVG([{ name: "Liquide A", value: 6 }, { name: "Liquide B", value: 14 }, { name: "Liquide C", value: 11 }, { name: "Liquide D", value: 23 }], "Temps d'écoulement", "s", null);
    return q;
  }
]), ["Deux jugements : un diagramme à bandes convient-il aux catégories, et quelle bande veut dire le plus visqueux?", "Les catégories prennent des bandes; le temps le plus long prend le titre de viscosité."]);

E("s8f-u2-graph-choice", 2, ["SC8.6.4"], 1, "var", varset([
  function () {
    return mcq("Un groupe a un temps d'écoulement pour chacun de cinq liquides différents et doit afficher les données. Quel affichage est approprié, et pourquoi?",
      "Un diagramme à bandes, parce que les données sont des catégories séparées (des liquides différents), chacune avec une seule valeur à comparer",
      ["Un graphique linéaire, parce que toutes les données recueillies en sciences doivent être dessinées comme des lignes sur un graphique",
       "Un diagramme circulaire, parce que les cinq temps d'écoulement séparés peuvent être additionnés pour faire un tout",
       "Aucun graphique du tout, parce que les temps mesurés en secondes ne peuvent être montrés sur aucun graphique"],
      "L'affichage suit la forme des données. Cinq liquides différents sont des catégories, et non une variable continue, donc les bandes les comparent honnêtement; une ligne inventerait une tendance entre des liquides sans lien. La correction même du laboratoire principal fait le même point en sens inverse : les résultats de la classe là appartiennent à un diagramme à bandes (histogramme), et non à un graphique linéaire.",
      {});
  }
]), ["Catégories ou continuum? Cela décide des bandes ou des lignes.", "Des liquides différents sont des catégories. Une ligne prétendrait qu'ils se relient."]);

/* ---------- SC8.6.5 Réaliser des procédures qui contrôlent les variables (CORE) ---------- */

E("s8f-u2-variables", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return mcq("Un groupe vérifie si la température influe sur le débit de l'huile de cuisson. Il réchauffe ou refroidit l'huile à trois températures, verse 100 mL dans le même entonnoir chaque fois, et chronomètre chaque versement. Quelle identification des variables est correcte?",
      "Variable changée : la température de l'huile. Variable mesurée : le temps d'écoulement. Gardés les mêmes : l'huile, son volume, et l'entonnoir",
      ["Variable changée : le temps d'écoulement. Variable mesurée : la température. Gardés les mêmes : l'huile et l'entonnoir",
       "Variable changée : l'entonnoir. Variable mesurée : le volume de l'huile. Gardée la même : la température",
       "Il n'y a aucune variable contrôlée, parce que la température est la seule chose dans l'expérience"],
      "L'identification des variables suit les rôles. Le groupe change délibérément la température, mesure le temps d'écoulement comme résultat, et garde l'huile, son volume et l'entonnoir constants pour que la comparaison soit équitable. Nommer les trois rôles correctement est le cœur cognitif de la réalisation d'une procédure contrôlée.",
      {});
  }
]), ["Trie par rôle : ce qu'ils ont réglé, ce qu'ils ont mesuré, ce qu'ils ont gelé en place.", "La variable changée est celle de la question vérifiée."]);

E("s8f-u2-cr-design-viscosity", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return textq("Conçois une recherche contrôlée pour comparer les viscosités de trois liquides : l'eau, l'huile de cuisson et le miel. Ton plan doit énoncer la méthode que tu utiliseras pour les comparer, la variable que tu changeras, la variable que tu mesureras, au moins deux variables que tu garderas les mêmes, et comment tu rendras la comparaison équitable et répétable. (4 points)",
      ["une méthode qui fonctionne comme chronométrer l'écoulement dans le même entonnoir ou sur la même rampe", "le liquide comme variable changée", "le temps d'écoulement ou la distance comme variable mesurée", "la quantité de liquide, l'appareil, la température et les répétitions gardés les mêmes"],
      "<b>Réponse modèle :</b> Méthode : verse chaque liquide dans le même entonnoir dans un cylindre à mesurer et chronomètre combien de temps un volume fixe, 100 mL, prend pour passer; répète chaque liquide trois fois et fais la moyenne. La variable changée est le liquide lui-même (eau, huile de cuisson, miel). La variable mesurée est le temps d'écoulement : le temps le plus long veut dire la viscosité la plus élevée. Gardés les mêmes : le volume de liquide (100 mL), l'entonnoir et le cylindre, la température des liquides (tous laissés dans la même salle), et la personne qui chronomètre avec la même règle de départ et d'arrêt. Faire la moyenne des répétitions protège la comparaison contre un écoulement mal chronométré. Les liquides peuvent alors être classés selon leurs temps moyens.<br><br><b>Points d'attribution :</b> 1 point pour une méthode de comparaison qui fonctionne. 1 point pour la variable changée (le liquide) et la variable mesurée (le temps d'écoulement ou la distance) nommées correctement. 1 point pour au moins deux variables gardées les mêmes. 1 point pour l'équité et la répétabilité (répétitions, moyenne, ou une règle de départ et d'arrêt identique).",
      {});
  }
]), ["Conçois-la comme le laboratoire principal, mais rends les contrôles explicites : c'est là que sont les points.", "Quatre parties : méthode, changée, mesurée, gardées les mêmes, plus l'équité."]);

/* ---------- SC8.6.6 Interpréter les régularités et les tendances ---------- */

E("s8f-u2-pattern", 2, ["SC8.6.6"], 1, "var", varset([
  function () {
    var q = mcq("Le graphique montre le temps d'écoulement de la même huile mesuré à cinq températures. Quel énoncé interprète correctement la régularité?",
      "À mesure que la température augmente, le temps d'écoulement diminue : l'huile plus chaude est moins visqueuse",
      ["À mesure que la température augmente, le temps d'écoulement augmente : l'huile plus chaude est plus visqueuse",
       "La température et le temps d'écoulement sont sans lien dans ces données",
       "Le temps d'écoulement change, mais la viscosité reste la même à chaque température"],
      "La ligne tombe régulièrement : des températures plus élevées viennent avec des temps d'écoulement plus courts. Le temps d'écoulement est le substitut de la viscosité au laboratoire, donc la régularité se lit : réchauffer l'huile abaisse sa viscosité, la relation que la théorie particulaire prédit.",
      {});
    q.figure = s8fLineGraphSVG([10, 20, 30, 40, 50], [42, 31, 23, 17, 12], "Température (°C)", "Temps d'écoulement (s)");
    return q;
  }
]), ["Lis d'abord la direction de la ligne, puis traduis le temps d'écoulement en viscosité.", "Un temps qui tombe veut dire une viscosité qui tombe."]);

E("s8f-u2-cr-data-infer", 2, ["SC8.6.6"], 2, "var", varset([
  function () {
    return textq("Une classe mesure deux matériaux inconnus. Matériau A : un échantillon de 20 cm3 a une masse de 54 g, et un échantillon de 40 cm3 a une masse de 108 g. Matériau B : un échantillon de 20 cm3 a une masse de 16 g, et un échantillon de 40 cm3 a une masse de 32 g. (a) Calcule la masse volumique de chaque matériau. (b) Infère, avec des raisons, quel matériau flotterait dans l'eau et lequel coulerait. (c) Énonce la régularité dans les données qui te dit que chaque masse volumique est une propriété du matériau, et non de la taille de l'échantillon. (3 points)",
      ["le matériau A est 2,7 g/cm3 et le matériau B est 0,8 g/cm3", "A coule et B flotte, par comparaison avec l'eau à 1,00 g/cm3", "doubler le volume double la masse, donc le rapport reste constant"],
      "<b>Réponse modèle :</b> (a) Matériau A : MV égale 54 g divisés par 20 cm3, ce qui égale 2,7 g/cm3. Matériau B : MV égale 16 g divisés par 20 cm3, ce qui égale 0,8 g/cm3. (b) La masse volumique de l'eau est de 1,00 g/cm3. Le matériau A, à 2,7 g/cm3, est plus dense que l'eau et coule; le matériau B, à 0,8 g/cm3, est moins dense et flotte. (c) Dans les deux matériaux, doubler le volume double exactement la masse, donc le rapport masse sur volume est le même pour les deux tailles d'échantillon : la masse volumique est constante pour le matériau, ce qui en fait une propriété du matériau plutôt que du morceau mesuré.<br><br><b>Points d'attribution :</b> 1 point pour les deux masses volumiques calculées. 1 point pour l'inférence flotter et couler liée à la masse volumique de l'eau. 1 point pour la régularité du rapport constant (le volume et la masse qui doublent ensemble).",
      {});
  }
]), ["Calcule d'abord, compare à l'eau ensuite, puis regarde ce qui reste constant entre les tailles d'échantillon.", "La régularité à nommer est dans la façon dont la masse augmente avec le volume."]);

/* ---------- SC8.6.7 Utiliser les instruments de façon efficace et exacte (CORE) ---------- */

E("s8f-u2-instruments", 2, ["SC8.6.7"], 1, "var", varset([
  function () {
    return mcq("Un élève mesure le volume d'un liquide dans un cylindre gradué pour un calcul de masse volumique. Quelle pratique donne une lecture exacte?",
      "Placer le cylindre sur une surface plane et lire le bas du ménisque au niveau des yeux",
      ["Tenir le cylindre vers la lumière et lire le haut du ménisque d'en haut",
       "Lire l'échelle d'où que tu te tiennes, puisque les nombres sont grands",
       "Estimer entre les marques rapidement avant que le liquide se dépose"],
      "L'utilisation exacte des instruments est un ensemble d'habitudes : une surface plane pour que le liquide repose juste, le niveau des yeux pour que la lecture ne soit pas déplacée par l'angle de vue, et le bas du ménisque (la courbe que la surface du liquide fait) comme point de lecture. Cette banque porte cette seule question; la manipulation des instruments elle-même relève de l'évaluation en classe.",
      {});
  }
]), ["Surface plane, niveau des yeux, bas de la courbe : trois habitudes, un seul choix les a toutes.", "Lire d'en haut ou d'en bas déplace la valeur : la parallaxe."]);

/* ---------- SC8.6.8 Le volume des objets irréguliers par déplacement (CORE) ---------- */

E("s8f-u2-displacement", 2, ["SC8.6.8"], 1, "var", varset([
  function () {
    return mcq("Quelle procédure détermine correctement le volume d'une pierre de forme irrégulière par déplacement de l'eau?",
      "Consigner le niveau d'eau dans un cylindre gradué, descendre la pierre doucement jusqu'à ce qu'elle soit entièrement submergée, consigner le nouveau niveau, et soustraire",
      ["Laisser tomber la pierre dans un bécher plein d'eau, la retirer, puis peser la pierre une deuxième fois pendant qu'elle est encore mouillée pour trouver son volume",
       "Mesurer la longueur, la largeur et la hauteur de la pierre avec une règle et multiplier les trois ensemble, en traitant la pierre comme si elle était un bloc parfait",
       "Faire flotter la pierre sur la surface de l'eau dans le cylindre et lire le niveau où la pierre repose au repos, en prenant ce niveau comme son volume déplacé"],
      "Le déplacement fonctionne parce que la pierre submergée pousse de côté son propre volume d'eau. La montée du niveau, le final moins l'initial, est ce volume. La pierre doit être entièrement submergée et descendue doucement pour qu'aucune eau n'éclabousse dehors; une règle ne peut pas saisir une forme irrégulière, et une pierre ne flotte pas.",
      {});
  }
]), ["Le volume est la montée. Quel choix mesure réellement une montée?", "Entièrement submergée, descendue doucement, soustrais les niveaux."]);

E("s8f-u2-displacement-error", 2, ["SC8.6.8"], 3, "var", varset([
  function () {
    return mcq("Un groupe détermine le volume d'un cube de métal par déplacement et obtient 14 mL, mais calculer à partir des côtés mesurés du cube donne 27 cm3. Ses notes disent que le cube « dépassait un peu de l'eau » dans le cylindre, qui était aussi trop étroit, donc le cube s'est coincé contre les côtés. Quel jugement évalue le mieux son résultat de déplacement?",
      "La valeur de déplacement est invalide : le cube n'était pas entièrement submergé, donc il a déplacé moins que son volume entier, et le coincement a empiré les choses; il a besoin d'un récipient plus large et d'une submersion complète",
      ["La valeur de déplacement doit être la meilleure des deux, parce que l'eau ne ment jamais au sujet du volume, donc les mesures des côtés du cube doivent être les mauvaises et le calcul devrait être rejeté",
       "Les deux valeurs que le groupe a obtenues devraient simplement être moyennées ensemble pour donner le vrai volume du cube, et la moyenne devrait être utilisée dans le calcul de masse volumique qui suit",
       "La différence entre les deux valeurs n'a pas d'importance du tout, parce que le chiffre du volume n'influe pas sur le calcul de masse volumique que le groupe fait ensuite avec lui dans son rapport"],
      "Juger une procédure veut dire la vérifier contre ses propres exigences. Le déplacement n'égale le volume que quand l'objet est entièrement submergé; un cube qui dépasse déplace une partie de lui-même, donc 14 mL sous-estime le volume, et la direction de l'erreur confirme le diagnostic. Moyenner une valeur valide avec une invalide contamine seulement la masse volumique qui suit.",
      {});
  }
]), ["Le déplacement a une condition non négociable. A-t-elle été remplie?", "En partie dehors veut dire en partie déplacé : la direction de l'erreur le révèle."]);

E("s8f-u2-cr-displacement-calc", 2, ["SC8.6.8"], 2, "var", varset([
  function () {
    return textq("Une élève étudie un objet de métal irrégulier. Elle consigne l'eau dans un cylindre gradué à 150 mL, descend l'objet dedans jusqu'à ce qu'il soit entièrement submergé, et lit 175 mL. La masse de l'objet, d'une balance, est de 135 g. (a) Énonce le volume de l'objet. (b) Calcule sa masse volumique. (c) Au moyen du tableau des masses volumiques de cette unité (aluminium 2,70 g/cm3, fer 7,87 g/cm3, plomb 11,34 g/cm3), énonce de quoi l'objet est le plus probablement fait, et une vérification qu'elle devrait faire sur sa lecture de déplacement avant de faire confiance à la conclusion. (3 points)",
      ["le volume est 25 cm3 à partir de la montée du niveau d'eau", "la masse volumique est 5,4 g/cm3 à partir de la masse divisée par le volume", "aucune correspondance exacte dans le tableau, avec une vérification de validité de la lecture"],
      "<b>Réponse modèle :</b> (a) Le volume est la montée du niveau : 175 mL moins 150 mL égalent 25 mL, soit 25 cm3. (b) MV égale m divisé par V, soit 135 g divisés par 25 cm3, ce qui égale 5,4 g/cm3. (c) À 5,4 g/cm3, l'objet ne correspond exactement à aucun métal listé; il se trouve entre l'aluminium (2,70) et le fer (7,87), donc la conclusion honnête est qu'il n'est pas de l'aluminium, du fer ou du plomb purs, et peut être un alliage ou un objet enduit. Avant de faire confiance même à cela, elle devrait vérifier la lecture de déplacement elle-même : confirmer que l'objet était entièrement submergé sans bulles d'air accrochées à lui, puisque l'air emprisonné gonflerait le volume et fausserait la masse volumique.<br><br><b>Points d'attribution :</b> 1 point pour le volume à partir de la montée du niveau. 1 point pour le calcul de la masse volumique avec les unités. 1 point pour une conclusion qui respecte le tableau (aucune correspondance exacte, donc aucune identification forcée) avec une vérification de validité de la lecture.",
      {});
  }
]), ["Le volume de la montée, la masse volumique de la formule, et une conclusion qui ne prétend pas plus que ce que le tableau soutient.", "Une valeur entre deux entrées du tableau est un résultat, et non un échec."]);

/* ---------- SC8.6.9 Calculer la masse volumique de divers objets ---------- */

E("s8f-u2-sk-calc-density", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 1.1, 1.4, 1.6, 2.2, 2.7, 3.0]);
  var V = pick([10, 20, 25, 50]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(D, [D * 2, D / 2, V / m * 10, D + 0.5, m / (V - 5)]);
  return mcq("Au laboratoire sur la masse volumique, l'échantillon d'un groupe a une masse de " + s8fn(m) + " g et un volume de " + V + " cm3 (mesuré par déplacement). Calcule la masse volumique de l'échantillon.",
    s8fn(D) + " g/cm3",
    dis.map(function (d) { return s8fn(d) + " g/cm3"; }),
    "MV égale m divisé par V, soit " + s8fn(m) + " g divisés par " + V + " cm3, ce qui égale " + s8fn(D) + " g/cm3. Les calculs de laboratoire utilisent la même formule que toute autre question de masse volumique; seule la source du volume (le déplacement) est nouvelle.",
    {});
}, ["Même formule, habits de laboratoire : masse volumique égale masse divisée par volume.", "Le travail de déplacement est déjà fait; le volume est donné."]);

E("s8f-u2-sk-calc-mass", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5]);
  var V = pick([30, 60, 120, 250, 400]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(m, [m * 2, m / 2, D + V, V - D, m + 15]);
  return mcq("Un technicien doit verser un liquide de masse volumique " + s8fn(D) + " g/mL pour que la masse de l'échantillon soit exacte pour un test. Quelle masse " + V + " mL du liquide auront-ils?",
    s8fn(m) + " g",
    dis.map(function (d) { return s8fn(d) + " g"; }),
    "m égale MV fois V, soit " + s8fn(D) + " g/mL fois " + V + " mL, ce qui égale " + s8fn(m) + " g. Multiplier la masse par millilitre par le nombre de millilitres donne la masse totale.",
    {});
}, ["Masse égale masse volumique fois volume, la forme réarrangée.", "Quelques centaines de millilitres devraient donner une masse bien au-dessus du nombre de la masse volumique."]);

E("s8f-u2-sk-calc-volume", 2, ["SC8.6.9"], 2, "gen", function () {
  var D = pick([0.8, 1.0, 1.2, 1.5, 2.0, 2.5]);
  var V = pick([15, 30, 45, 60, 90]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8fdis(V, [V * 2, V / 2, m * D / 2, m - D * 10, V + 10]);
  return mcq("Un échantillon d'un liquide a une masse de " + s8fn(m) + " g. La masse volumique du liquide est de " + s8fn(D) + " g/mL. Quel volume l'échantillon occupe-t-il?",
    s8fn(V) + " mL",
    dis.map(function (d) { return s8fn(d) + " mL"; }),
    "V égale m divisé par MV, soit " + s8fn(m) + " g divisés par " + s8fn(D) + " g/mL, ce qui égale " + s8fn(V) + " mL. Diviser la masse totale par la masse dans chaque millilitre compte les millilitres.",
    {});
}, ["Volume égale masse divisée par masse volumique, la troisième forme.", "Vérifie en multipliant à rebours : le volume fois la masse volumique devrait redonner la masse."]);

E("s8f-u2-units", 2, ["SC8.6.9"], 1, "var", varset([
  function () {
    return mcq("Quel appariement de quantité et d'expression d'unité est correct partout?",
      "La masse volumique d'un liquide s'exprime en g/mL, et la masse volumique d'un solide en g/cm3, avec 1 mL égal à 1 cm3",
      ["La masse volumique d'un liquide s'exprime en g/cm3 seulement, et les solides en mL/g",
       "La masse volumique s'exprime en grammes pour les liquides et en newtons pour les solides",
       "Le volume d'un solide s'exprime en mL et le volume d'un liquide en cm3, et les deux ne se convertissent jamais"],
      "La convention : la masse volumique d'un fluide s'exprime en g/mL et celle d'un solide en g/cm3, et puisque 1 mL égale 1 cm3 les nombres sont directement comparables, ce qui explique pourquoi la masse volumique d'un solide peut être comparée à celle de l'eau, 1,00, d'une façon ou de l'autre. Les unités font partie du calcul, et non une décoration après lui.",
      {});
  }
]), ["Une conversion fait fonctionner tout le système : 1 mL égale 1 cm3.", "Les liquides prennent les mL, les solides les cm3, et les deux unités sont égales en taille."]);

/* Exclusion de la composition : la question de conception de recherche
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composés. */
var NO_COMPOSE_U2 = { "s8f-u2-cr-design-viscosity": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });
