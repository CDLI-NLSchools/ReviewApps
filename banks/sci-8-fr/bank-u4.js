// CRMARKS: s8f-u4-cr-living=3
// CRMARKS: s8f-u4-cr-cell-division=3
// CRMARKS: s8f-u4-cr-levels=3
// CRMARKS: s8f-u4-cr-factors=3
// CRMARKS: s8f-u4-cr-interdependence=3
// CRMARKS: s8f-u4-cr-organelles=3
// CRMARKS: s8f-u4-cr-artificial=4
// CRMARKS: s8f-u4-cr-community=3
// CRMARKS: s8f-u4-cr-decision=3
// CRMARKS: s8f-u4-cr-propose=3
// CRMARKS: s8f-u4-cr-decision-personal=3
// CRMARKS: s8f-u4-cr-microscope=3
// CRMARKS: s8f-u4-cr-model-eval=3
// CRMARKS: s8f-u4-cr-design-rates=4
/* ============================================================
   Sciences 8 (FR) — Unité 4 : Les cellules, les tissus, les
   organes et les systèmes
   Banque construite le Nov 16, 2026. Indicateurs SC8.10.1 à
   SC8.12.12 (groupes 10, 11 et 12 du guide français).
   Existing tests and question banks were reviewed only to gauge
   the expected depth and range of treatment. All items in this
   bank were written new for this app.

   Discipline du guide : la théorie cellulaire au niveau
   d'introduction; la mitose sans ses étapes; les six systèmes
   traités de façon globale (aucune fonction organe par organe,
   aucun étiquetage de diagrammes de systèmes); l'interdépendance
   limitée aux trois paires du guide (circulatoire et
   respiratoire, digestif et circulatoire, nerveux et
   musculaire); l'estimation des tailles sans calculs de
   rapports. La figure de la cellule applique l'erratum du
   manuel : la paroi est étiquetée à l'extérieur de la membrane.
   Résidu CORE : SC8.12.1 et SC8.12.3 évaluent les connaissances
   sur le microscope, la séquence et les décisions d'entretien;
   la manipulation elle-même s'évalue en classe. SC8.12.4 porte
   une question sur l'exactitude des modèles; la construction
   coopérative est le résidu.
   ============================================================ */

/* Aides locales : format des nombres (virgule décimale) et
   choix de distracteurs numériques distincts. */
function s8fn(v) {
  var r = Math.round(v * 100) / 100;
  return String(r).replace(".", ",");
}
function s8fdis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var v = Math.round(cand[i] * 100) / 100;
    if (v !== key && v > 0 && out.indexOf(v) < 0) out.push(v);
  }
  return out;
}

/* ---------- SC8.10.1 Théorie cellulaire et caractéristiques de la vie ---------- */

E("s8f-u4-theory-parts", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "Toutes les cellules viennent d'autres cellules préexistantes",
    ["Toutes les cellules sont entourées de parois cellulaires", "Toutes les cellules possèdent un noyau en leur centre", "Tous les êtres vivants sont faits de deux cellules ou plus"],
    "La théorie cellulaire énonce que tous les êtres vivants sont faits de cellules, que la cellule est l'unité de base de la vie, et que toutes les cellules viennent d'autres cellules préexistantes. Les parois cellulaires et les noyaux se trouvent dans certaines cellules, pas toutes.", {}); },
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "Tous les êtres vivants sont faits d'une ou de plusieurs cellules",
    ["Toutes les cellules peuvent se voir sans microscope", "Toutes les cellules font la photosynthèse", "Tous les êtres vivants sont faits exactement du même genre de cellule"],
    "La théorie cellulaire énonce que tous les êtres vivants sont faits d'une ou de plusieurs cellules, que la cellule est l'unité de base de la vie, et que les cellules viennent de cellules préexistantes. La plupart des cellules sont microscopiques, et seulement certaines font la photosynthèse.", {}); },
  function () { return mcq("Quelle affirmation fait partie de la théorie cellulaire?",
    "La cellule est l'unité de base de la vie",
    ["La cellule est la plus grande unité de la vie", "Les cellules peuvent se former d'elles-mêmes à partir de matière non vivante", "Seuls les corps des animaux sont faits de cellules"],
    "La théorie cellulaire identifie la cellule comme l'unité de base de la vie : la plus petite unité qui accomplit les processus vitaux. Les cellules viennent d'autres cellules, et les corps des plantes sont faits de cellules aussi.", {}); }
]), ["Pense à ce que tous les êtres vivants partagent.", "La théorie compte trois énoncés principaux sur les cellules."]);

E("s8f-u4-living-chars", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Un tournesol tourne ses feuilles vers le Soleil à mesure que le Soleil se déplace dans le ciel. Quelle caractéristique de la vie le tournesol montre-t-il?",
    "La réponse aux stimuli",
    ["La croissance", "Le mouvement de l'organisme entier", "La reproduction"],
    "Le tournesol répond à un stimulus, la lumière. Répondre aux changements de l'environnement est une des quatre caractéristiques de la vie, avec la croissance, le mouvement et la reproduction.", {}); },
  function () { return mcq("Au cours d'un été, un chiot gagne 6 kg et ses os s'allongent. De quelle caractéristique de la vie s'agit-il?",
    "La croissance",
    ["Le mouvement", "La reproduction", "La réponse aux stimuli"],
    "Devenir plus grand à mesure que les cellules se divisent et que le corps se développe, c'est la croissance, une des quatre caractéristiques de la vie.", {}); },
  function () { return mcq("Une seule bactérie se divise et devient deux bactéries. De quelle caractéristique de la vie s'agit-il?",
    "La reproduction",
    ["La croissance", "Le mouvement", "La réponse aux stimuli"],
    "Produire de nouveaux individus de la même sorte, c'est la reproduction, une des quatre caractéristiques de la vie. Une bactérie se reproduit en se divisant en deux cellules.", {}); }
]), ["Rappelle-toi les quatre caractéristiques de la vie.", "Croissance, mouvement, réponse aux stimuli, reproduction."]);

E("s8f-u4-nonliving", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Lequel de ceux-ci est non vivant?",
    "Un rocher de granite",
    ["Un champignon", "Une cellule de levure", "Une algue marine"],
    "Un rocher ne croît pas, ne bouge pas de lui-même, ne répond pas aux stimuli et ne se reproduit pas, et il n'est pas fait de cellules. Les champignons, la levure et les algues sont des organismes vivants faits de cellules.", {}); },
  function () { return mcq("La flamme d'une bougie grandit, vacille et semble bouger. Pourquoi une flamme n'est-elle pas vivante?",
    "Elle n'est pas faite de cellules et ne se reproduit pas ni ne répond comme les organismes le font",
    ["Elle est simplement trop chaude, vacillant au sommet de la bougie, pour que quoi que ce soit de vivant y survive", "Elle n'a pas besoin de l'oxygène de l'air autour d'elle pour continuer à brûler sur la bougie allumée", "Elle dégage de la lumière et de la chaleur dans la pièce tout autour d'elle tant qu'elle brûle"],
    "Les flammes peuvent croître et bouger, mais elles ne sont pas faites de cellules, ne se reproduisent pas et ne répondent pas aux stimuli comme les organismes. Les êtres vivants montrent les quatre caractéristiques et sont faits de cellules.", {}); }
]), ["Vérifie chaque option contre les caractéristiques de la vie.", "Les êtres vivants sont faits de cellules."]);

E("s8f-u4-cr-living", 4, ["SC8.10.1"], 2, "var", varset([
  function () { return textq("Un élève soutient qu'une graine n'est pas vivante parce qu'elle ne bouge pas. Utilise les caractéristiques de la vie et la théorie cellulaire pour expliquer pourquoi une graine est un être vivant. (3 points)",
    ["une graine est faite de cellules", "le mouvement n'est qu'une des quatre caractéristiques de la vie", "une graine croît en une plante et répond à des conditions comme l'eau et la chaleur en germant"],
    "<b>Réponse modèle:</b> Une graine est faite de cellules, et la théorie cellulaire énonce que tous les êtres vivants sont faits de cellules. Le mouvement n'est qu'une des quatre caractéristiques de la vie. Une graine montre les autres : elle croît en une nouvelle plante, elle répond aux stimuli comme l'eau et la chaleur en germant, et elle existe à cause de la reproduction. Un organisme n'a pas besoin de montrer les quatre caractéristiques à chaque instant pour être vivant.<br><br><b>Points d'attribution:</b> 1 point pour noter que la graine est faite de cellules. 1 point pour nommer des caractéristiques de la vie au-delà du mouvement. 1 point pour appliquer au moins l'une d'elles à la graine (la croissance à la germination, ou la réponse à l'eau et à la chaleur).", {}); }
]), ["Le mouvement n'est qu'une des quatre caractéristiques.", "Qu'est-ce qu'une graine fait d'autre?"]);

/* ---------- SC8.10.2 Cellules végétales et animales ---------- */

E("s8f-u4-differences", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Quelle structure se trouve dans les cellules végétales mais pas dans les cellules animales?",
    "Les chloroplastes",
    ["La membrane cellulaire", "Le cytoplasme", "Le noyau"],
    "Les cellules végétales ont des chloroplastes, où la photosynthèse se produit. Les cellules animales n'en ont pas. Les deux types de cellules ont une membrane, du cytoplasme et un noyau.", {}); },
  function () { return mcq("Quelle structure se trouve dans les cellules végétales mais pas dans les cellules animales?",
    "Une paroi cellulaire",
    ["Les mitochondries", "Des vacuoles de toute taille", "Un noyau"],
    "Les cellules végétales ont une paroi cellulaire à l'extérieur de la membrane, ce que les cellules animales n'ont pas. Les deux ont des mitochondries et un noyau, et les deux ont des vacuoles, bien que les vacuoles végétales soient plus grandes.", {}); }
]), ["Rappelle-toi les trois différences entre les cellules végétales et animales.", "Chloroplastes, parois cellulaires, taille des vacuoles."]);

E("s8f-u4-cell-figure", 4, ["SC8.10.2", "SC8.11.3"], 1, "var", varset([
  function () { var q = mcq("Le diagramme montre une cellule végétale. Quelle lettre étiquette le chloroplaste?",
    "E", ["A", "C", "D"],
    "La lettre E pointe vers un chloroplaste, une des petites structures vertes où la photosynthèse a lieu. A est la paroi cellulaire, C le noyau et D la vacuole.", {});
    q.figure = s8fCellSVG("plant"); return q; },
  function () { var q = mcq("Le diagramme montre une cellule végétale. Quelle lettre étiquette la grande vacuole?",
    "D", ["B", "E", "F"],
    "La lettre D pointe vers la grande vacuole centrale, qui emmagasine l'eau et d'autres matériaux. Les cellules végétales ont des vacuoles moins nombreuses et plus grandes que les cellules animales. B est la membrane cellulaire, E un chloroplaste et F une mitochondrie.", {});
    q.figure = s8fCellSVG("plant"); return q; }
]), ["Trouve les petites structures ovales vertes.", "Les chloroplastes font la photosynthèse."]);

E("s8f-u4-vacuole-compare", 4, ["SC8.10.2"], 2, "var", varset([
  function () { return mcq("Comment les vacuoles diffèrent-elles entre les cellules végétales et animales?",
    "Les cellules végétales ont des vacuoles moins nombreuses et plus grandes; les cellules animales en ont de plus petites",
    ["Les cellules animales ont une très grande vacuole et les cellules végétales n'en ont aucune du tout", "Seules les cellules animales ont des vacuoles dans leur cytoplasme", "Les vacuoles sont identiques dans les deux types de cellules"],
    "Les deux types de cellules ont des vacuoles, mais les cellules végétales en ont moins et de plus grandes, souvent une grande vacuole centrale, tandis que les vacuoles des cellules animales sont plus petites.", {}); },
  function () { return mcq("Un élève regarde deux cellules. L'une a une très grande vacuole centrale qui occupe une bonne partie de la cellule. La cellule est le plus probablement une",
    "cellule végétale, parce que les cellules végétales ont des vacuoles moins nombreuses et plus grandes",
    ["cellule animale, parce que les vacuoles animales sont toujours la plus grande structure de la cellule", "bactérie, parce que les bactéries emmagasinent tout dans une seule vacuole au centre de la cellule", "cellule de champignon, parce que seuls les champignons ont des vacuoles dans leurs cellules"],
    "Une seule grande vacuole centrale est un trait de la cellule végétale : les cellules végétales ont des vacuoles moins nombreuses et plus grandes que les cellules animales.", {}); }
]), ["Rappelle-toi la différence des vacuoles.", "Moins nombreuses et plus grandes chez les plantes."]);

E("s8f-u4-regular-shape", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Les cellules végétales gardent habituellement une forme régulière et fixe. Qu'est-ce qui leur donne cette forme?",
    "La paroi cellulaire",
    ["La membrane cellulaire", "La vacuole", "Les chloroplastes"],
    "La paroi cellulaire rigide à l'extérieur de la membrane tient la cellule végétale dans une forme régulière. Les cellules animales, sans paroi, ont des formes plus variées.", {}); }
]), ["Quelle structure propre aux plantes est rigide?", "Elle se trouve à l'extérieur de la membrane."]);

/* ---------- SC8.10.3 La division cellulaire ---------- */

E("s8f-u4-identical", 4, ["SC8.10.3"], 1, "var", varset([
  function () { return mcq("Quand une cellule du corps se divise par mitose, le résultat est",
    "deux nouvelles cellules identiques à la cellule originale",
    ["deux cellules avec chacune la moitié du matériel original enlevé en permanence", "une grande cellule et une cellule sans noyau du tout", "des cellules d'un type complètement différent"],
    "La mitose produit de nouvelles cellules identiques à l'originale. Ton corps l'utilise pour croître et pour remplacer les cellules usées ou endommagées.", {}); }
]), ["Pense à ce qu'identique signifie ici.", "La croissance et la réparation exigent des cellules assorties."]);

E("s8f-u4-division-count", 4, ["SC8.10.3"], 2, "gen", function () {
  var rounds = pick([2, 3, 4]);
  var cells = Math.pow(2, rounds);
  var dis = s8fdis(cells, [cells * 2, rounds * 2, cells + rounds, cells - 2]);
  return mcq("Une seule cellule se divise pour former deux cellules, et chacune de celles-ci se divise encore, et ainsi de suite. Après " + rounds + " rondes de division, combien de cellules y a-t-il?",
    cells + "", dis.map(String),
    "Chaque ronde double le nombre de cellules : après 1 ronde il y en a 2, après 2 rondes 4, doublant chaque fois. Après " + rounds + " rondes, il y a 2 x 2" + (rounds > 2 ? " x 2" : "") + (rounds > 3 ? " x 2" : "") + " = " + cells + " cellules.", {});
}, ["Chaque division double le compte.", "Multiplie par 2 une fois par ronde."]);

E("s8f-u4-growth-example", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return mcq("Tu te coupes le doigt. Au cours de la semaine suivante, la coupure guérit à mesure qu'une nouvelle peau la couvre. D'où viennent les nouvelles cellules de la peau?",
    "Les cellules de peau existantes se sont divisées par mitose pour produire de nouvelles cellules identiques",
    ["Des cellules de peau toutes faites ont voyagé à travers le corps depuis l'estomac jusqu'à la coupure au doigt", "La coupure elle-même a produit les nouvelles cellules à partir de matière non vivante dans le pansement et l'air", "Des cellules d'os du fond du doigt se sont changées elles-mêmes en nouvelles cellules de peau à la coupure"],
    "La guérison est la croissance et la réparation par mitose : les cellules de peau près de la coupure se divisent pour produire de nouvelles cellules de peau identiques qui couvrent la blessure.", {}); },
  function () { return mcq("Lequel est un exemple de division cellulaire servant la reproduction plutôt que la croissance?",
    "Une bactérie qui se divise en deux bactéries",
    ["Des cellules de peau qui remplacent une éraflure", "Les os d'un enfant qui s'allongent", "Des cellules musculaires qui augmentent après l'entraînement"],
    "Quand une bactérie se divise, elle produit un nouvel organisme, donc la division est la reproduction. Les autres exemples sont la croissance ou la réparation à l'intérieur d'un seul organisme.", {}); }
]), ["La croissance et la réparation se produisent à l'intérieur d'un seul organisme.", "Un nouvel organisme veut dire reproduction."]);

E("s8f-u4-cr-cell-division", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return textq("Explique comment la division cellulaire par mitose sert deux buts différents chez les êtres vivants, un pour un organisme à plusieurs cellules et un pour un organisme à une seule cellule. Donne un exemple de chacun. (3 points)",
    ["la mitose produit de nouvelles cellules identiques", "chez un organisme à plusieurs cellules, elle permet la croissance et la réparation, comme les cellules de peau qui guérissent une coupure", "chez un organisme à une seule cellule comme une bactérie, se diviser produit un organisme entier nouveau, donc c'est la reproduction"],
    "<b>Réponse modèle:</b> La mitose est une division cellulaire qui produit de nouvelles cellules identiques à la cellule originale. Chez un organisme à plusieurs cellules, la mitose permet la croissance et la réparation : les cellules de peau se divisent pour guérir une coupure, produisant plus de cellules de peau exactement comme celles qui ont été endommagées. Chez un organisme à une seule cellule comme une bactérie, il n'y a pas de corps séparé à faire croître, donc quand la cellule se divise en deux, elle a produit un nouvel organisme : la division est sa reproduction.<br><br><b>Points d'attribution:</b> 1 point pour énoncer que la mitose produit de nouvelles cellules identiques. 1 point pour la croissance ou la réparation chez un organisme à plusieurs cellules avec un exemple valide. 1 point pour la division comme reproduction chez un organisme à une seule cellule avec un exemple valide.", {}); }
]), ["Cellules identiques d'abord, puis les deux buts.", "Pense à la peau qui guérit, puis à une bactérie."]);

/* ---------- SC8.10.4 Les niveaux d'organisation ---------- */

E("s8f-u4-order", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Quelle liste donne les niveaux d'organisation dans l'ordre correct, du plus petit au plus grand?",
    "Cellules, tissus, organes, systèmes d'organes, organismes",
    ["Cellules, organes, tissus, organismes, systèmes d'organes", "Tissus, cellules, organes, systèmes d'organes, organismes", "Organismes, systèmes d'organes, organes, tissus, cellules"],
    "Les niveaux se construisent : les cellules se groupent en tissus, les tissus en organes, les organes en systèmes d'organes, et les systèmes ensemble forment l'organisme.", {}); }
]), ["Commence par la cellule.", "Chaque niveau se construit à partir du précédent."]);

E("s8f-u4-example-level", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Un groupe de cellules semblables qui travaillent ensemble pour faire le même travail s'appelle un",
    "tissu", ["organe", "système d'organes", "organisme"],
    "Des cellules semblables qui travaillent ensemble forment un tissu, le deuxième niveau d'organisation. Des tissus différents se combinent en organes.", {}); },
  function () { return mcq("Le cœur est fait de tissu musculaire, de tissu nerveux et de tissu conjonctif qui travaillent ensemble. Le cœur est un exemple d'un",
    "organe", ["système d'organes", "organisme", "cellule"],
    "Un organe est fait de tissus différents qui travaillent ensemble pour un travail principal. Le cœur travaille avec les vaisseaux sanguins comme partie du système circulatoire.", {}); }
]), ["Associe la définition au niveau.", "Cellules semblables ensemble : un niveau au-dessus des cellules."]);

E("s8f-u4-analogy", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Dans l'analogie du bâtiment pour les niveaux d'organisation, les briques sont les cellules et les murs sont les tissus. Que représentent les étages du bâtiment?",
    "Les systèmes d'organes",
    ["Les organes du corps", "Les organismes vivants", "Les cellules du corps"],
    "Dans l'analogie, les briques (cellules) construisent les murs (tissus), les murs forment les pièces (organes), les pièces font les étages (systèmes d'organes), et la maison entière est l'organisme.", {}); }
]), ["Monte l'analogie niveau par niveau.", "Les pièces sont les organes; le niveau suivant est..."]);

E("s8f-u4-cr-levels", 4, ["SC8.10.4"], 2, "var", varset([
  function () { return textq("Nomme les cinq niveaux d'organisation chez un organisme à plusieurs cellules, en ordre du plus petit au plus grand, et donne un exemple du corps pour le niveau du tissu et un pour le niveau de l'organe. (3 points)",
    ["les niveaux sont cellules, tissus, organes, systèmes d'organes et organismes", "le tissu musculaire est un exemple de tissu", "le cœur (ou l'estomac, ou le poumon) est un exemple d'organe"],
    "<b>Réponse modèle:</b> Du plus petit au plus grand, les niveaux sont les cellules, les tissus, les organes, les systèmes d'organes et les organismes. Un tissu est un groupe de cellules semblables qui font le même travail, comme le tissu musculaire. Un organe est fait de tissus différents qui travaillent ensemble, comme le cœur.<br><br><b>Points d'attribution:</b> 1 point pour les cinq niveaux dans l'ordre correct. 1 point pour un exemple valide de tissu. 1 point pour un exemple valide d'organe.", {}); }
]), ["Cinq niveaux, le plus petit d'abord.", "Tissu : cellules semblables. Organe : tissus ensemble."]);

/* ---------- SC8.10.5 Besoins de base des cellules et des organismes ---------- */

E("s8f-u4-needs", 4, ["SC8.10.5"], 1, "var", varset([
  function () { return mcq("Les cellules et les organismes entiers partagent les mêmes nécessités de base. Quelle liste les nomme?",
    "L'oxygène, les nutriments et l'élimination des déchets",
    ["La lumière du soleil, un sol pour s'enraciner et un abri contre le temps", "Un squelette d'os, des muscles qui fonctionnent et un réseau de nerfs", "Des graines, des œufs et les jeunes rejetons produits chaque saison"],
    "Chaque cellule a besoin d'oxygène et de nutriments, et a besoin que ses déchets soient éliminés, exactement comme l'organisme entier. Les systèmes du corps existent pour répondre à ces besoins des cellules.", {}); }
]), ["Pense à ce qu'une seule cellule doit prendre et rejeter.", "La liste compte trois éléments."]);

E("s8f-u4-needs-apply", 4, ["SC8.10.5"], 2, "var", varset([
  function () { return mcq("Pourquoi une cellule musculaire meurt-elle si son approvisionnement en oxygène est coupé assez longtemps, même si la cellule elle-même est microscopique?",
    "Les cellules ont les mêmes nécessités de base que l'organisme entier, y compris l'oxygène",
    ["Les cellules musculaires sont trop grandes pour survivre sans poumons à l'intérieur d'elles", "L'oxygène est nécessaire seulement aux organes, donc la cellule l'emprunte au cœur", "La cellule s'arrête parce que le cerveau lui envoie un signal de s'éteindre"],
    "Une seule cellule a besoin d'oxygène, de nutriments et d'élimination des déchets tout comme l'organisme entier. Coupe l'oxygène et la cellule ne peut pas continuer ses processus vitaux.", {}); }
]), ["Applique l'idée des nécessités partagées à une seule cellule.", "De quoi chaque cellule a-t-elle besoin?"]);

E("s8f-u4-needs-system", 4, ["SC8.10.5", "SC8.10.7"], 3, "var", varset([
  function () { return mcq("Une cellule au fond du muscle de ta jambe a besoin de nutriments qui sont entrés dans ton corps par un repas. Quelle paire de systèmes amène les nutriments du repas à cette cellule?",
    "Le système digestif décompose la nourriture et absorbe les nutriments, et le système circulatoire les transporte dans le sang jusqu'à la cellule",
    ["Le système respiratoire absorbe les nutriments du repas et le système nerveux les transporte en signaux jusqu'à la cellule dans la jambe", "Le système excréteur absorbe les nutriments du repas et le système musculaire les presse à travers le corps jusqu'à la cellule", "Le système digestif transporte lui-même les nutriments absorbés, par ses propres tubes, directement à chaque cellule de la jambe"],
    "Les nutriments traversent la paroi de l'intestin grêle dans le sang, et le système circulatoire les transporte aux cellules dans tout le corps. Les deux systèmes dépendent l'un de l'autre pour répondre aux besoins des cellules.", {}); }
]), ["Deux systèmes partagent ce travail.", "L'absorption d'abord, puis le transport."]);

/* ---------- SC8.10.6 Facteurs qui affectent les systèmes ---------- */

E("s8f-u4-factor-positive", 4, ["SC8.10.6"], 1, "var", varset([
  function () { return mcq("Quel facteur de mode de vie améliore l'efficacité des systèmes circulatoire et respiratoire?",
    "L'exercice régulier",
    ["Le tabagisme", "Un mode de vie sédentaire avec peu de mouvement", "Sauter des repas régulièrement"],
    "L'exercice régulier renforce le cœur et améliore la capacité respiratoire, donc les deux systèmes fonctionnent plus efficacement. Le tabagisme et l'inactivité réduisent leur efficacité.", {}); }
]), ["Des effets positifs seulement dans cette question.", "Pense à la forme physique."]);

E("s8f-u4-factor-effect", 4, ["SC8.10.6"], 2, "var", varset([
  function () { return mcq("Comment le tabagisme nuit-il le plus directement au système respiratoire?",
    "Il endommage les poumons et les voies respiratoires, donc les échanges gazeux deviennent moins efficaces",
    ["Il fait croître la trachée dans la gorge plus longue et plus large qu'elle devrait l'être avec le temps", "Il augmente le nombre d'alvéoles dans les poumons, donnant plus de surface pour les échanges gazeux", "Il renforce les muscles utilisés pour respirer, donc les poumons travaillent plus fort à chaque souffle"],
    "La fumée endommage les poumons et les voies respiratoires, réduisant la surface et l'efficacité des échanges gazeux, donc le système respiratoire livre moins d'oxygène au sang.", {}); },
  function () { return mcq("Une alimentation constamment riche en gras met le plus directement de la pression sur quel système, et pourquoi?",
    "Le système circulatoire, parce que les dépôts de gras rétrécissent les vaisseaux sanguins et font travailler le cœur plus fort",
    ["Le système nerveux, parce que les dépôts de gras bloquent les signaux qui voyagent le long des nerfs du corps entier", "Le système excréteur, parce que le gras dans le sang ne peut pas du tout être filtré par les reins du corps humain", "Le système musculaire, parce que le gras emmagasiné remplace complètement le tissu musculaire sain avec le temps"],
    "Les dépôts de gras rétrécissent les vaisseaux, augmentant le travail du cœur et réduisant l'efficacité du système circulatoire avec le temps.", {}); }
]), ["Nomme le système sur lequel le facteur agit.", "Puis dis comment son efficacité change."]);

E("s8f-u4-sedentary", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return mcq("Deux élèves ont des alimentations semblables. L'un est actif chaque jour; l'autre est sédentaire. Après un an, l'élève sédentaire se fatigue beaucoup plus vite en montant les escaliers. La meilleure explication est que",
    "sans activité régulière, le cœur et les muscles de la respiration restent moins efficaces, donc l'oxygène atteint les muscles plus lentement pendant l'effort",
    ["les poumons de l'élève sédentaire ont cessé d'échanger des gaz avec l'air même pendant que l'élève est au repos complet à la maison", "Être actif agrandit de façon permanente le cœur de l'élève actif, et seulement de cet élève-là, au cours de l'année écoulée", "le sang de l'élève sédentaire a perdu sa capacité de transporter l'oxygène des poumons aux muscles du corps tout entier"],
    "L'exercice garde les systèmes circulatoire et respiratoire efficaces. Sans lui, le cœur pompe moins efficacement et la capacité respiratoire est plus basse, donc pendant l'effort les muscles reçoivent l'oxygène plus lentement et se fatiguent plus tôt.", {}); }
]), ["Compare l'efficacité des deux systèmes.", "La livraison d'oxygène pendant l'effort est la clé."]);

E("s8f-u4-cr-factors", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return textq("Choisis deux facteurs de mode de vie de la liste du guide (alimentation, nutrition, exercice, stress, tabagisme, alcool, mode de vie sédentaire). Pour chacun, explique son effet sur la fonction ou l'efficacité d'un système du corps nommé. (3 points)",
    ["deux facteurs de la liste du guide, chacun lié à un système nommé", "un effet correct sur la fonction ou l'efficacité pour chacun", "au moins un effet expliqué comme un changement d'efficacité"],
    "<b>Réponse modèle:</b> Exercice : l'exercice régulier renforce le muscle du cœur, donc le système circulatoire pompe le sang et livre l'oxygène aux cellules plus efficacement. Tabagisme : la fumée endommage les poumons et les voies respiratoires, donc le système respiratoire échange l'oxygène et le dioxyde de carbone moins efficacement, et le sang transporte moins d'oxygène au corps.<br><br><b>Points d'attribution:</b> 1 point pour chaque facteur lié correctement à un système nommé avec un effet correct sur sa fonction ou son efficacité (2 points), et 1 point pour un effet expliqué comme un changement d'efficacité (une livraison, un échange ou une élimination plus ou moins efficace).", {}); }
]), ["Deux facteurs, deux systèmes.", "Dis comment l'efficacité change, pas seulement que c'est mauvais."]);

/* ---------- SC8.10.7 Interdépendance des systèmes ---------- */

E("s8f-u4-pair-circ-resp", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Comment les systèmes circulatoire et respiratoire dépendent-ils l'un de l'autre?",
    "Les poumons prennent l'oxygène et le passent au sang, et le sang le transporte aux cellules et ramène le dioxyde de carbone",
    ["Le cœur est l'organe qui respire l'air, et les poumons pompent ensuite cet air dans tout le corps par les vaisseaux", "Le sang lui-même fabrique l'oxygène pendant qu'il est dans les poumons, puis emmagasine l'oxygène dans le cœur", "Les poumons font le travail de filtrer les déchets du sang à la place des reins dans le corps humain"],
    "Le système respiratoire échange les gaz et le système circulatoire les transporte : l'oxygène des poumons aux cellules, le dioxyde de carbone des cellules de retour aux poumons.", {}); }
]), ["Un système échange, l'autre transporte.", "Suis l'oxygène, puis le dioxyde de carbone."]);

E("s8f-u4-pair-dig-circ", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Où les nutriments de la nourriture digérée passent-ils dans le sang?",
    "À travers la paroi de l'intestin grêle",
    ["À travers la paroi de l'estomac", "À travers la trachée", "À travers la peau sur l'abdomen"],
    "Le système digestif décompose la nourriture et les nutriments sont absorbés à travers la paroi de l'intestin grêle dans le sang, que le système circulatoire transporte ensuite aux cellules.", {}); }
]), ["L'absorption se produit dans un organe nommé.", "Il fait partie du tube digestif, après l'estomac."]);

E("s8f-u4-pair-nerv-musc", 4, ["SC8.10.7"], 2, "var", varset([
  function () { return mcq("Quand tu as froid, tu frissonnes. Quels deux systèmes travaillent ensemble dans le frissonnement, et comment?",
    "Le système nerveux détecte le froid et signale au système musculaire de se contracter rapidement, produisant de la chaleur",
    ["Le système digestif détecte le froid et le système excréteur produit la chaleur dans le corps en réponse au froid", "Le système respiratoire détecte le froid et le système circulatoire secoue les muscles du corps entier en réponse", "Le système musculaire détecte le froid lui-même et répond sans aucun signal du système nerveux du tout"],
    "Les organes des sens et le système nerveux détectent le changement de température et signalent aux muscles de se contracter rapidement. Le frissonnement est les systèmes nerveux et musculaire qui dépendent l'un de l'autre.", {}); },
  function () { return mcq("Par une journée chaude, ton visage devient rouge. Que s'est-il passé entre les systèmes?",
    "Le système nerveux a signalé aux petits muscles dans les vaisseaux sanguins de la peau de se détendre, laissant plus de sang couler près de la surface et libérer de la chaleur",
    ["Le système digestif a envoyé du sang supplémentaire aux vaisseaux du visage, où le sang est emmagasiné jusqu'à ce que le corps en ait besoin ailleurs plus tard", "Le système excréteur a poussé la sueur qu'il a produite dans les vaisseaux sanguins de la peau, qui ont transporté la sueur jusqu'au visage pour le refroidir", "Le système respiratoire a pompé de l'air frais des poumons directement dans les petits vaisseaux sanguins de la peau du visage pour la refroidir de l'intérieur"],
    "Le système nerveux coordonne la réponse : les muscles dans les parois des vaisseaux se détendent sous ses signaux, le débit sanguin près de la peau augmente, et la chaleur s'échappe. Les systèmes nerveux, musculaire et circulatoire interagissent.", {}); }
]), ["Un système sent et signale; un autre agit.", "Le frissonnement est un travail musculaire ordonné par les nerfs."]);

E("s8f-u4-interdependence-why", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return mcq("Pendant un sprint, la fréquence respiratoire et la fréquence cardiaque d'un coureur augmentent toutes les deux brusquement. Pourquoi doivent-elles augmenter ensemble?",
    "Les muscles qui travaillent ont besoin de beaucoup plus d'oxygène et produisent plus de dioxyde de carbone; les poumons doivent échanger les gaz plus vite pendant que le cœur les transporte plus vite, donc aucun système ne peut répondre au besoin seul",
    ["La fréquence cardiaque augmente d'abord au début du sprint, et la pression qu'elle construit dans la poitrine force les poumons à suivre derrière elle au même taux exactement, battement pour battement", "La fréquence respiratoire augmente pendant un sprint surtout pour refroidir le sang du coureur, et la fréquence cardiaque augmente seulement pour déplacer ce sang refroidi dans le corps jusqu'à la peau", "Les deux fréquences sont contrôlées par le corps du coureur pour augmenter exactement de la même quantité fixe, battement pour battement, dans chaque situation qu'un coureur rencontre sur la piste"],
    "Les systèmes sont interdépendants : le système respiratoire peut seulement charger l'oxygène aussi vite que le sang l'emporte, et le cœur peut seulement livrer ce que les poumons chargent. Le sprint augmente la demande des cellules, donc les deux doivent augmenter ensemble.", {}); }
]), ["Aucun système ne peut faire tout le travail seul.", "La demande aux cellules pousse les deux."]);

E("s8f-u4-cr-interdependence", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return textq("Choisis une paire de systèmes du corps de cette unité (circulatoire et respiratoire, digestif et circulatoire, ou nerveux et musculaire). Explique comment les deux systèmes dépendent l'un de l'autre, en utilisant un exemple précis du corps. (3 points)",
    ["une paire valide de l'unité nommée", "ce que chaque système contribue expliqué", "un exemple précis du corps montrant la dépendance"],
    "<b>Réponse modèle:</b> Le système respiratoire amène l'air dans les poumons, où l'oxygène passe dans le sang et le dioxyde de carbone en sort. À lui seul, cet oxygène resterait dans les poumons. Le système circulatoire achève le travail : le cœur pompe le sang riche en oxygène à chaque cellule et retourne le dioxyde de carbone aux poumons pour être expiré. Chaque système dépend de l'autre; si la respiration s'arrêtait, le sang n'aurait pas d'oxygène à transporter, et si le cœur s'arrêtait, l'oxygène dans les poumons n'atteindrait jamais les cellules.<br><br><b>Points d'attribution:</b> 1 point pour nommer une paire valide de l'unité. 1 point pour expliquer ce que chaque système contribue. 1 point pour un exemple précis du corps montrant la dépendance.", {}); }
]), ["Choisis une des trois paires du guide.", "Dis ce que chaque système contribue."]);

/* ---------- SC8.11.1 Premières idées sur les êtres vivants ---------- */

E("s8f-u4-early-modern", 4, ["SC8.11.1"], 2, "var", varset([
  function () { return mcq("Les peuples anciens expliquaient les êtres vivants par des idées sur l'air, l'eau et le feu. Comment la théorie cellulaire moderne diffère-t-elle le plus de ces premières idées?",
    "Elle est construite sur des observations faites avec des microscopes, qui ont montré que les êtres vivants sont faits de cellules",
    ["Elle rejette chaque observation faite des êtres vivants et s'appuie seulement sur la tradition transmise au fil des années", "Elle explique tous les êtres vivants par un ensemble de quatre éléments, au lieu des trois que les peuples anciens utilisaient", "Elle a été entièrement développée longtemps avant que des outils pour observer les très petites choses aient été inventés"],
    "Les premières explications étaient des suppositions sur le monde sans moyens d'observer le très petit. La théorie cellulaire est venue d'observations systématiques une fois que les microscopes ont laissé les scientifiques voir que chaque être vivant est fait de cellules.", {}); }
]), ["Quel outil a changé ce qu'on pouvait observer?", "Le microscope est le point tournant."]);

E("s8f-u4-dynamic", 4, ["SC8.11.1", "SC8.11.2"], 3, "var", varset([
  function () { return mcq("Les premiers scientifiques ne pouvaient pas s'entendre sur la question de savoir si les minuscules organismes vus à travers les premiers microscopes étaient vraiment vivants. Le désaccord a été réglé surtout parce que",
    "des microscopes améliorés ont donné des observations plus claires, montrant que les organismes étaient faits de cellules avec les caractéristiques de la vie",
    ["les scientifiques de l'époque ont réglé le désaccord en votant sur la question lors d'une réunion entre eux", "les minuscules organismes eux-mêmes ont grandi avec le temps jusqu'à ce que tout le monde puisse convenir qu'ils étaient vivants", "les premiers scientifiques ont simplement cessé d'étudier la question et sont passés à d'autres problèmes à la place"],
    "La science est dynamique : à mesure que les outils se sont améliorés, les observations sont devenues plus claires et les théories ont été révisées. De meilleures lentilles ont montré les structures cellulaires et les processus vitaux, réglant ce que les organismes étaient.", {}); }
]), ["Qu'est-ce qui a changé : les outils ou les organismes?", "De meilleures observations révisent les théories."]);

/* ---------- SC8.11.2 Le microscope comme technologie en développement ---------- */

E("s8f-u4-micro-development", 4, ["SC8.11.2"], 1, "var", varset([
  function () { return mcq("Le microscope de Leeuwenhoek utilisait une seule petite lentille, pourtant il a été le premier à observer les bactéries. Les microscopes plus tardifs, jusqu'au microscope électronique à balayage, ont révélé beaucoup plus. Quel patron cette histoire montre-t-elle?",
    "La technologie optique s'est développée par des améliorations constantes, et chaque amélioration a permis aux scientifiques d'observer davantage et de réviser leurs idées",
    ["Chaque nouveau et meilleur microscope construit a rendu sans valeur toutes les découvertes précédentes faites avec les plus vieux, qui ont été jetées entièrement", "Les microscopes ont été perfectionnés d'un seul coup, en une seule étape, par la première personne qui en a construit un, sans aucune amélioration par la suite", "De meilleurs microscopes ont mis fin complètement, une fois pour toutes, au désaccord scientifique sur les cellules, et aucune question n'est restée ouverte après eux"],
    "Le développement du microscope a été un long processus d'essais et d'améliorations des lentilles et de la conception. Chaque avancée a étendu ce qu'on pouvait observer, et la science des cellules a avancé avec elle.", {}); }
]), ["Pense à la séquence des outils.", "Meilleurs outils, meilleures observations, idées révisées."]);

E("s8f-u4-micro-parts", 4, ["SC8.11.2", "SC8.12.1"], 1, "var", varset([
  function () { var q = mcq("Sur le diagramme du microscope, quelle lettre étiquette l'objectif?",
    "B", ["A", "C", "F"],
    "La lettre B est l'objectif, tenu par la tourelle porte-objectifs près du spécimen. A est l'oculaire, C la platine et F la source de lumière.", {});
    q.figure = s8fMicroscopeSVG(); return q; },
  function () { var q = mcq("Sur le diagramme du microscope, quelle lettre étiquette la platine?",
    "C", ["B", "D", "G"],
    "La lettre C est la platine, la plateforme plate qui tient la lame. B est l'objectif, D la vis macrométrique et G le bras.", {});
    q.figure = s8fMicroscopeSVG(); return q; }
]), ["L'objectif se trouve juste au-dessus de la lame.", "La platine est la plateforme qui tient la lame."]);

/* ---------- SC8.11.3 Organites, en utilisant les termes appropriés ---------- */

E("s8f-u4-organelle-figure", 4, ["SC8.11.3"], 2, "var", varset([
  function () { var q = mcq("Le diagramme montre une cellule animale. Quelle lettre étiquette le noyau?",
    "B", ["A", "D", "E"],
    "La lettre B est le noyau, la structure qui contient le matériel génétique de la cellule et contrôle les activités de la cellule. A est la membrane cellulaire, D une mitochondrie et E une vacuole.", {});
    q.figure = s8fCellSVG("animal"); return q; },
  function () { var q = mcq("Le diagramme montre une cellule animale. Quelle lettre étiquette la membrane cellulaire?",
    "A", ["B", "C", "E"],
    "La lettre A est la membrane cellulaire, la frontière qui contrôle ce qui entre dans la cellule et ce qui en sort. Une cellule animale n'a aucune paroi cellulaire à l'extérieur d'elle. B est le noyau, C le cytoplasme et E une vacuole.", {});
    q.figure = s8fCellSVG("animal"); return q; }
]), ["Le noyau est le grand centre de contrôle rond.", "La membrane est la frontière extérieure."]);

E("s8f-u4-organelle-function", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Quel est le rôle des mitochondries dans une cellule?",
    "Elles libèrent l'énergie de la nourriture pour que la cellule l'utilise",
    ["Elles fabriquent la nourriture en utilisant la lumière du soleil", "Elles emmagasinent le matériel génétique de la cellule", "Elles tiennent la forme de la cellule rigidement"],
    "Les mitochondries libèrent l'énergie de la nourriture pour que la cellule puisse accomplir ses activités. Fabriquer la nourriture est le rôle du chloroplaste, et le matériel génétique est gardé dans le noyau.", {}); },
  function () { return mcq("Quel est le rôle du chloroplaste dans une cellule végétale?",
    "Il utilise la lumière du soleil pour fabriquer la nourriture de la cellule",
    ["Il libère l'énergie de la nourriture", "Il contrôle ce qui entre dans la cellule et ce qui en sort", "Il emmagasine l'eau et les déchets"],
    "Les chloroplastes font la photosynthèse, utilisant la lumière du soleil pour fabriquer la nourriture. Les mitochondries libèrent l'énergie de cette nourriture, et les vacuoles emmagasinent l'eau et d'autres matériaux.", {}); }
]), ["Associe chaque organite à son unique travail.", "Mitochondries : libération d'énergie. Chloroplaste : fabrication de nourriture."]);

E("s8f-u4-organelle-match", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Quel organite contrôle le mouvement de la nourriture, des déchets et d'autres substances vers l'intérieur et l'extérieur de la cellule?",
    "La membrane cellulaire",
    ["La paroi cellulaire", "Le cytoplasme", "La vacuole"],
    "La membrane cellulaire est la gardienne : elle contrôle ce qui entre et ce qui sort. La paroi cellulaire donne le soutien et la forme, et le cytoplasme est la substance gélatineuse où les organites se trouvent.", {}); },
  function () { return mcq("Quel organite contient le matériel génétique de la cellule et contrôle les activités de la cellule?",
    "Le noyau",
    ["Les mitochondries", "La vacuole", "Le cytoplasme"],
    "Le noyau garde le matériel génétique et agit comme le centre de contrôle de la cellule.", {}); }
]), ["Gardienne ou centre de contrôle?", "La membrane contrôle le mouvement; le noyau contrôle la cellule."]);

E("s8f-u4-organelle-plant", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Un élève doit étiqueter un diagramme de cellule végétale en utilisant les termes appropriés. Quel ensemble d'étiquettes appartient seulement à la cellule végétale, pas à un diagramme de cellule animale?",
    "Paroi cellulaire et chloroplaste",
    ["Membrane cellulaire et noyau", "Cytoplasme et mitochondries", "Noyau et vacuole"],
    "Les parois cellulaires et les chloroplastes sont des structures propres aux plantes à ce niveau. Les membranes, les noyaux, le cytoplasme, les mitochondries et les vacuoles apparaissent dans les deux types de cellules.", {}); }
]), ["Utilise les trois différences entre plantes et animaux.", "Deux d'entre elles sont des structures."]);

E("s8f-u4-organelle-term", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return mcq("Quelle comparaison des cellules végétales et animales utilise les termes appropriés correctement?",
    "Les deux ont une membrane cellulaire, mais seule la cellule végétale a une paroi cellulaire à l'extérieur d'elle, et la vacuole de la cellule végétale est plus grande",
    ["Les deux genres de cellules ont une paroi cellulaire autour d'elles, mais seule la cellule animale a une membrane cellulaire à l'intérieur d'elle", "La membrane de la cellule végétale se trouve à l'extérieur de sa paroi cellulaire, contrairement à l'arrangement trouvé dans la cellule animale", "Les cellules animales portent des chloroplastes dispersés dans leur cytoplasme, tandis que les cellules végétales n'ont pas de chloroplastes du tout"],
    "Chaque cellule a une membrane; les cellules végétales ajoutent une paroi à l'extérieur de la membrane, et leurs vacuoles sont moins nombreuses et plus grandes. (Note : le diagramme de la cellule végétale du manuel échange deux étiquettes; A est la paroi cellulaire et C est la membrane cellulaire.)", {}); }
]), ["Paroi à l'extérieur, membrane à l'intérieur d'elle.", "Vérifie chaque affirmation contre les différences."]);

E("s8f-u4-cr-organelles", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return textq("En utilisant les termes appropriés, explique le rôle de chacune de ces structures cellulaires : membrane cellulaire, noyau et mitochondries. Puis nomme une structure trouvée dans les cellules végétales mais pas dans les cellules animales et énonce son rôle. (3 points)",
    ["la membrane cellulaire contrôle ce qui entre dans la cellule et ce qui en sort", "le noyau contient le matériel génétique et contrôle les activités de la cellule", "les mitochondries libèrent l'énergie de la nourriture", "la paroi cellulaire (ou le chloroplaste) est propre aux plantes, donnant le soutien et la forme (ou faisant la photosynthèse)"],
    "<b>Réponse modèle:</b> La membrane cellulaire contrôle le mouvement des substances vers l'intérieur et l'extérieur de la cellule. Le noyau contient le matériel génétique et contrôle les activités de la cellule. Les mitochondries libèrent l'énergie de la nourriture pour que la cellule l'utilise. La paroi cellulaire se trouve dans les cellules végétales seulement : elle soutient la cellule et lui donne une forme régulière. (Le chloroplaste, qui fabrique la nourriture par photosynthèse, est une structure propre aux plantes également valide.)<br><br><b>Points d'attribution:</b> 1 point pour deux des trois rôles nommés corrects. 1 point pour les trois corrects. 1 point pour une structure propre aux plantes avec son rôle correct.", {}); }
]), ["Trois rôles, puis une structure propre aux plantes.", "Membrane, noyau, mitochondries."]);

/* ---------- SC8.11.4 et SC8.11.5 Technologies issues des connaissances scientifiques ---------- */

E("s8f-u4-tech-examples", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Quelle technologie aide ou remplace le travail d'un organe malade?",
    "Un appareil de dialyse, qui filtre le sang quand les reins font défaut",
    ["Un stéthoscope, qui écoute les sons du cœur qui bat à l'intérieur de la poitrine", "Un appareil à rayons X, qui prend des images des os à l'intérieur du corps d'un patient à l'hôpital", "Un thermomètre, qui mesure la température du corps ou d'un liquide dans un laboratoire"],
    "La dialyse fait le travail du rein de nettoyer le sang quand les reins ne le peuvent pas. Les autres appareils observent ou mesurent; ils n'aident pas ni ne remplacent le travail d'un organe.", {}); },
  function () { return mcq("Une pompe à insuline est portée par une personne diabétique. Le travail de quel organe aide-t-elle?",
    "Le pancréas, en régulant les niveaux d'insuline dans le sang",
    ["Le foie, en emmagasinant le glucose supplémentaire de la nourriture", "Le rein, en filtrant l'insuline hors du sang", "Le cœur, en pompant l'insuline dans le corps par le sang"],
    "La pompe à insuline régule l'insuline dans le sang, aidant le pancréas, l'organe qui produit normalement l'insuline.", {}); }
]), ["L'appareil fait-il le travail de l'organe?", "La dialyse filtre le sang, comme un rein."]);

E("s8f-u4-tech-match", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Un stimulateur cardiaque est implanté dans la poitrine d'un patient. Que fait-il?",
    "Il envoie des impulsions électriques qui gardent le cœur battant à un rythme régulier",
    ["Il filtre tous les déchets du sang du patient à mesure que le sang traverse la poitrine", "Il pompe le sang du patient dans le corps à la place du cœur, faisant tout le travail du cœur", "Il produit de l'insuline à l'intérieur du corps du patient et la libère selon un horaire quotidien régulier"],
    "Un stimulateur cardiaque remplace les signaux électriques défectueux du cœur par des impulsions régulières, donc le cœur garde un battement régulier. Filtrer le sang est la dialyse; réguler l'insuline est une pompe à insuline.", {}); },
  function () { return mcq("Un implant cochléaire aide quel organe des sens, et comment?",
    "L'oreille, en convertissant le son en signaux électriques que les nerfs peuvent transporter",
    ["L'œil, en concentrant la lumière qui y entre sur la rétine au fond du globe oculaire", "La peau, en sentant les changements de pression contre sa surface et en envoyant des signaux au cerveau", "La langue, en détectant les produits chimiques dissous dans la nourriture et la boisson qui passent sur elle"],
    "Les implants cochléaires captent le son et le transforment en impulsions électriques pour le nerf auditif, aidant une oreille interne endommagée.", {}); }
]), ["Associe l'appareil à l'organe qu'il aide.", "Stimulateur cardiaque : rythme du cœur. Cochléaire : l'ouïe."]);

E("s8f-u4-cr-artificial", 4, ["SC8.11.4"], 3, "var", varset([
  function () { return textq("Choisis une technologie qui aide ou remplace un organe ou un système malade (par exemple un appareil de dialyse, une pompe à insuline, une valvule cardiaque artificielle ou un stimulateur cardiaque). Explique la science de l'organe qu'elle aide : ce que l'organe fait, ce qui va mal, et comment la technologie applique les connaissances scientifiques pour faire ou soutenir ce travail. (4 points)",
    ["une technologie nommée et l'organe qu'elle aide", "ce que l'organe sain fait", "ce qui va mal quand il fait défaut", "comment la technologie applique les connaissances scientifiques pour faire ou soutenir le travail"],
    "<b>Réponse modèle:</b> Les reins nettoient le sang : leurs néphrons enlèvent les déchets comme l'urée, gardent le bon équilibre d'eau et de sels, et aident à tenir le pH du sang stable. Quand les deux reins font défaut, les déchets s'accumulent et la personne devient gravement malade. Un appareil de dialyse applique ce que la science connaît de la filtration : le sang passe le long d'une membrane à côté d'un fluide spécial, les déchets diffusent hors du sang dans le fluide, et le sang nettoyé retourne au corps. Il fait le travail de filtrage du rein depuis l'extérieur du corps, habituellement pendant plusieurs heures à la fois, plusieurs fois par semaine.<br><br><b>Points d'attribution:</b> 1 point pour nommer la technologie et l'organe. 1 point pour ce que l'organe sain fait. 1 point pour ce qui va mal quand il fait défaut. 1 point pour la façon dont la technologie applique les connaissances scientifiques pour faire ou soutenir le travail.", {}); }
]), ["L'organe d'abord : que fait-il?", "Puis la défaillance, puis la technologie."]);

E("s8f-u4-knowledge-tech", 4, ["SC8.11.5"], 2, "var", varset([
  function () { return mcq("Lequel est l'exemple le plus clair de connaissances scientifiques menant à une technologie?",
    "Comprendre que le cœur est coordonné par des signaux électriques a mené au stimulateur cardiaque",
    ["Construire un hôpital a mené à la découverte du cœur dans le corps humain", "Utiliser un stéthoscope a mené à la découverte du sang dans le corps", "Inventer le thermomètre a mené à la découverte de la température du corps comme concept"],
    "La connaissance est venue en premier : une fois que les scientifiques ont compris le contrôle électrique du cœur, les ingénieurs ont pu construire un appareil qui fournit le signal. Dans les autres options, la direction de l'affirmation est renversée ou fausse.", {}); }
]), ["Qu'est-ce qui est venu en premier, la connaissance ou l'appareil?", "Comprendre les signaux, puis le stimulateur cardiaque."]);

E("s8f-u4-knowledge-tech2", 4, ["SC8.11.5"], 3, "var", varset([
  function () { return mcq("Les valvules cardiaques artificielles sont faites de matériaux que le corps tolère et façonnées pour s'ouvrir et se fermer avec le débit sanguin. Quelle chaîne explique le mieux comment cette technologie est venue à exister?",
    "La connaissance du fonctionnement des valvules cardiaques et des matériaux convenables a été appliquée pour concevoir une pièce de remplacement",
    ["Les valvules fonctionnelles ont été découvertes poussant naturellement à l'intérieur du corps et ont été copiées exactement telles que trouvées", "Les chirurgiens avaient besoin de la pièce de remplacement, donc la pièce est simplement apparue pour eux sans aucune recherche derrière elle", "La connaissance des globules rouges seule, et rien d'autre, a suffi pour que les ingénieurs produisent la valvule de remplacement"],
    "Les technologies grandissent à partir de connaissances scientifiques combinées : la fonction des valvules, le débit sanguin et le comportement des matériaux devaient tous être compris avant qu'un remplacement fonctionnel puisse être conçu.", {}); }
]), ["Plusieurs sortes de connaissances se combinent.", "Fonction plus matériaux plus débit."]);

/* ---------- SC8.11.6 Besoins de la communauté ---------- */

E("s8f-u4-community-need", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return mcq("Une communauté compte plusieurs résidents dont les reins ont fait défaut, mais l'unité de dialyse la plus proche est à des heures de route. Une unité de dialyse est construite dans l'hôpital local. C'est un exemple de",
    "besoins d'une communauté menant à un développement en science appliquée et en technologie",
    ["une nouvelle technologie créant un besoin dans la communauté qui n'y avait pas existé avant son arrivée", "des connaissances scientifiques d'experts extérieurs remplaçant l'apport de la communauté dans chaque décision", "une communauté choisissant d'éviter l'utilisation de la technologie médicale moderne dans son hôpital local entièrement"],
    "Le besoin existait en premier : les patients avaient besoin d'une dialyse régulière pour survivre. Le besoin de la communauté a poussé le développement et le placement de la technologie.", {}); }
]), ["Qu'est-ce qui est venu en premier, le besoin ou la technologie?", "Les patients avaient besoin d'un traitement près de chez eux."]);

E("s8f-u4-cr-community", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return textq("Décris un exemple d'un besoin de communauté qui a mené à un développement en science ou en technologie lié aux systèmes du corps. Explique le besoin, le développement qu'il a produit, et comment le développement répond au besoin. (3 points)",
    ["un vrai besoin de communauté lié aux systèmes du corps", "le développement qu'il a produit", "comment le développement répond au besoin"],
    "<b>Réponse modèle:</b> Plusieurs personnes dans chaque communauté vivent avec le diabète et doivent garder leur glycémie contrôlée toute la journée. Les injections plusieurs fois par jour sont difficiles à garder stables, et un mauvais contrôle endommage les organes avec le temps. Ce besoin de communauté a poussé le développement de la pompe à insuline : un petit appareil portable qui livre l'insuline continuellement selon un horaire programmé, gardant les niveaux plus stables que les injections seules et libérant les patients des routines constantes d'aiguilles.<br><br><b>Points d'attribution:</b> 1 point pour un vrai besoin de communauté lié aux systèmes du corps. 1 point pour le développement qu'il a produit. 1 point pour expliquer comment le développement répond au besoin.", {}); }
]), ["Besoin, développement, correspondance.", "Le diabète et la pompe à insuline forment un modèle."]);

/* ---------- SC8.11.7, SC8.11.8, SC8.11.10 Décisions et plans d'action ---------- */

E("s8f-u4-decision-sr", 4, ["SC8.11.7"], 2, "var", varset([
  function () { return mcq("Une ville décide si elle finance une nouvelle unité de dialyse. Quelle considération est une considération environnementale?",
    "L'unité produit des déchets médicaux qui doivent être éliminés de façon sûre",
    ["Les patients ne voyageraient plus des heures pour leur traitement", "Des infirmières seraient embauchées localement dans la ville", "Les familles pourraient visiter les patients plus facilement"],
    "L'élimination des déchets médicaux affecte l'environnement. Le temps de voyage, les emplois et les visites sont des considérations sociales. Une décision éclairée pèse les deux genres.", {}); }
]), ["Environnemental veut dire des effets sur les environs.", "Déchets, eau, énergie : environnemental."]);

E("s8f-u4-cr-decision", 4, ["SC8.11.7"], 3, "var", varset([
  function () { return textq("Une autorité de santé peut financer soit plus d'appareils de dialyse dans un hôpital d'une ville, soit une plus petite unité de dialyse dans une communauté rurale dont les patients voyagent maintenant trois heures dans chaque direction. Prends une décision éclairée : énonce ton choix, donne un avantage social et un désavantage social de ce choix, et une considération environnementale. (3 points)",
    ["un choix clair énoncé", "un vrai avantage social et un vrai désavantage social du choix", "une vraie considération environnementale"],
    "<b>Réponse modèle:</b> Je financerais l'unité rurale. Avantage social : les patients reçoivent un traitement qui maintient la vie près de chez eux, gardant les familles ensemble et évitant un voyage épuisant pendant la maladie. Désavantage social : une petite unité sert moins de patients par appareil, donc la liste d'attente de la ville diminue plus lentement. Considération environnementale : éliminer des voyages de trois heures pour plusieurs patients chaque semaine réduit grandement l'utilisation de carburant et les émissions, bien que les déchets médicaux de la nouvelle unité doivent être manipulés de façon sûre.<br><br><b>Points d'attribution:</b> 1 point pour une décision claire. 1 point pour un vrai avantage social et un vrai désavantage social de l'option choisie. 1 point pour une vraie considération environnementale.", {}); }
]), ["Décide, puis pèse les deux côtés.", "Social : les gens. Environnemental : les environs."]);

E("s8f-u4-propose-sr", 4, ["SC8.11.8"], 2, "var", varset([
  function () { return mcq("Une école propose un plan d'action sur les boissons énergisantes vendues aux élèves de moins de 18 ans. Quelle proposition tient le mieux compte des besoins humains et environnementaux?",
    "Restreindre les ventes aux moins de 18 ans près des écoles, avec la preuve sur la santé expliquée aux élèves et aux détaillants",
    ["Interdire chaque genre de boisson dans le bâtiment de l'école entièrement, y compris l'eau que les élèves apportent avec eux", "Ignorer la question complètement, parce que la vente des boissons rapporte de l'argent que l'école peut dépenser", "Laisser chaque élève de l'école décider par lui-même, sans aucune information sur les boissons fournie à qui que ce soit"],
    "Une proposition solide agit sur la preuve de santé (les besoins humains) d'une façon proportionnée et s'explique. Les interdictions générales de tout et ne rien faire échouent tous les deux le test.", {}); }
]), ["Proportionnée, fondée sur la preuve, expliquée.", "Les besoins humains comprennent la santé des élèves."]);

E("s8f-u4-cr-propose", 4, ["SC8.11.8"], 3, "var", varset([
  function () { return textq("Des adultes qui fument dans des voitures avec des enfants présents forment une question sociale liée au système respiratoire. Propose un plan d'action sur cette question. Ta proposition doit énoncer l'action, le besoin humain qu'elle protège, et une objection que les gens pourraient soulever avec ta réponse à cette objection. (3 points)",
    ["une action claire et praticable proposée", "le besoin humain qu'elle protège, lié aux systèmes du corps", "une objection juste avec une réponse raisonnée"],
    "<b>Réponse modèle:</b> Action : interdire de fumer dans tout véhicule transportant des enfants, appliquée de la même façon que les lois sur les ceintures de sécurité. Besoin humain protégé : les enfants respirent la fumée secondaire dans un petit espace fermé, et la fumée endommage les voies respiratoires et la capacité des poumons d'échanger les gaz, aggravant l'asthme et les infections; les enfants ne peuvent pas choisir de partir. Objection : les adultes peuvent dire que leur voiture est privée. Réponse : la loi limite déjà le comportement privé dans les voitures (ceintures de sécurité, sièges d'auto) quand la santé des enfants est en jeu, et le besoin de l'enfant d'air propre l'emporte sur l'inconvénient.<br><br><b>Points d'attribution:</b> 1 point pour une action claire et praticable. 1 point pour le besoin humain ou environnemental qu'elle protège, lié aux systèmes du corps. 1 point pour une objection juste avec une réponse raisonnée.", {}); }
]), ["Action, besoin, objection, réponse.", "Lie le besoin au système respiratoire."]);

E("s8f-u4-personal-decision", 4, ["SC8.11.10"], 2, "var", varset([
  function () { return mcq("Un jeune athlète se fait offrir des stéroïdes pour bâtir ses muscles plus vite. Quel raisonnement est une décision personnelle éclairée fondée sur les systèmes du corps?",
    "Refuser : les stéroïdes peuvent endommager le cœur, le foie et les systèmes hormonaux, échangeant la santé à long terme contre un gain musculaire à court terme",
    ["Les accepter : la taille des muscles d'un athlète est la seule mesure qui compte d'un système musculaire en santé, et les effets sur les autres systèmes ne comptent pas", "Refuser l'offre seulement parce que les stéroïdes coûtent plus d'argent que l'athlète peut se permettre de dépenser chaque mois, sans égard à ce qu'ils font au corps", "Accepter l'offre si un ami au gymnase a utilisé les mêmes stéroïdes sans aucun tort évident qui paraisse encore, puisque son expérience garantit la sécurité de l'athlète"],
    "Une décision éclairée pèse la science : les stéroïdes affectent plusieurs systèmes (circulatoire, des organes excréteurs comme le foie, et le contrôle hormonal), donc l'avantage personnel est dépassé par de vrais désavantages.", {}); }
]), ["Pèse l'avantage contre le dommage aux systèmes.", "Gain à court terme, coût à long terme."]);

E("s8f-u4-cr-decision-personal", 4, ["SC8.11.10"], 3, "var", varset([
  function () { return textq("Prends une décision éclairée sur cette application de la science et de la technologie : une entreprise de conditionnement physique vend une machine qui promet des muscles forts sans exercice, utilisant la stimulation électrique pendant que l'utilisateur est assis. Énonce ta décision au sujet de son utilisation, un avantage personnel revendiqué ou réel, un désavantage personnel ou social, et la science des systèmes du corps derrière ta décision. (3 points)",
    ["une décision claire énoncée", "un vrai avantage personnel et un désavantage personnel ou social", "une science correcte des systèmes du corps appuyant la décision"],
    "<b>Réponse modèle:</b> Je n'utiliserais pas la machine comme substitut à l'exercice. Son vrai avantage est la commodité, et la stimulation peut contracter les muscles. Mais la forme physique n'est pas un seul système : le vrai exercice entraîne le système musculaire avec les systèmes circulatoire et respiratoire, renforçant le cœur et améliorant les échanges gazeux. Un appareil assis laisse ces systèmes sans entraînement, donc les gains de santé globaux sont petits, et socialement un tel marketing peut tromper les gens pour qu'ils sautent l'activité qui fonctionne.<br><br><b>Points d'attribution:</b> 1 point pour une décision claire. 1 point pour un vrai avantage personnel et un désavantage personnel ou social. 1 point pour une science correcte des systèmes du corps appuyant la décision.", {}); }
]), ["Décide, puis appuie avec la science des systèmes.", "Les muscles ne travaillent pas seuls."]);

/* ---------- SC8.11.9 Carrières ---------- */

E("s8f-u4-careers", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Quelle carrière est directement associée à la santé des systèmes du corps?",
    "Physiothérapeute",
    ["Comptable agréé", "Électricien de chantier", "Journaliste sportif"],
    "Les physiothérapeutes aident les patients à récupérer le mouvement et la force après une blessure ou une maladie, travaillant directement avec les systèmes musculaire et nerveux. Les techniciens de laboratoire et de rayons X, les nutritionnistes, les médecins et les infirmières en santé publique sont d'autres exemples du guide.", {}); }
]), ["Quel emploi traite les systèmes du corps chaque jour?", "Pense à la réadaptation après une blessure."]);

E("s8f-u4-careers-match", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Le travail d'une infirmière en santé publique se relie aux systèmes du corps surtout en",
    "promouvant des habitudes saines et en prévenant la maladie dans toute la communauté",
    ["opérant sur des organes endommagés à l'intérieur des patients dans la salle d'opération d'un hôpital", "concevant des organes artificiels dans un laboratoire pour les patients dont les propres organes ont fait défaut", "installant des membres artificiels sur les patients qui ont perdu un bras ou une jambe dans un accident"],
    "Les infirmières en santé publique travaillent au niveau de la communauté : vaccination, dépistage et éducation à la santé qui gardent les systèmes du corps en santé. Les autres rôles appartiennent aux chirurgiens, aux ingénieurs biomédicaux et aux prothésistes.", {}); },
  function () { return mcq("Quelle carrière travaille avec le système digestif en conseillant les patients sur l'alimentation?",
    "Nutritionniste",
    ["Technicien en rayons X", "Entraîneur", "Technicien de laboratoire"],
    "Les nutritionnistes conseillent sur l'alimentation et la nutrition, ce qui affecte directement le système digestif et, par lui, chaque autre système.", {}); }
]), ["Associe la carrière à son rôle pour les systèmes.", "Prévention au niveau de la communauté : infirmière en santé publique."]);

/* ---------- SC8.12.1 et SC8.12.3 Utilisation et entretien du microscope (CORE) ---------- */

E("s8f-u4-focus-sequence", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("Quelle séquence amène correctement une lame au foyer?",
    "Commencer à faible puissance, mettre au point avec la vis macrométrique, puis passer à puissance moyenne et terminer avec la vis micrométrique",
    ["Commencer l'observation à l'objectif de plus haute puissance et mettre l'image au point en utilisant la vis macrométrique", "Mettre au point avec la vis micrométrique d'abord, et seulement ensuite tourner la vis macrométrique pour finir", "Passer l'objectif à puissance moyenne avant que la lame préparée soit placée sur la platine du microscope"],
    "La technique correcte commence à faible puissance avec la vis macrométrique, puis passe à puissance moyenne et aiguise avec la vis micrométrique. L'utilisation de la haute puissance n'est pas exigée à ce niveau, et la vis macrométrique sert à la mise au point à faible et moyenne puissance.", {}); }
]), ["Faible puissance d'abord.", "Macrométrique, puis micrométrique."]);

E("s8f-u4-parts-action", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("L'image sous le microscope est trop sombre pour voir les cellules clairement. Quelle partie devrait être ajustée?",
    "Le diaphragme, qui contrôle la quantité de lumière qui atteint le spécimen",
    ["La vis macrométrique, qui s'ouvre et se ferme pour contrôler la lumière du spécimen", "La tourelle porte-objectifs, qui s'ajuste pour contrôler la lumière du spécimen", "La base, qui se tourne pour contrôler la lumière qui atteint le spécimen"],
    "Le diaphragme s'ouvre et se ferme pour contrôler la lumière. La vis macrométrique change la mise au point, la tourelle change les objectifs, et la base n'est qu'un soutien.", {}); },
  function () { return mcq("Que fait la tourelle porte-objectifs?",
    "Elle pivote pour amener un objectif différent en position",
    ["Elle tient la lame préparée en place sur la platine pendant l'observation", "Elle met l'image au point quand le microscope sert à haute puissance", "Elle ajuste la luminosité de la source de lumière sous le spécimen"],
    "La tourelle tient les objectifs et pivote pour passer de l'un à l'autre. Les lames reposent sur la platine, la mise au point se fait avec les vis d'ajustement, et le diaphragme contrôle la lumière.", {}); }
]), ["Image sombre veut dire un problème de lumière.", "Diaphragme pour la lumière; tourelle pour les lentilles."]);

E("s8f-u4-cr-microscope", 4, ["SC8.12.1", "SC8.12.3"], 2, "var", varset([
  function () { return textq("Un nouvel élève est sur le point d'utiliser le microscope composé pour la première fois. Décris comment transporter et installer le microscope, et les étapes de mise au point pour obtenir une image claire de cellules à faible puis à moyenne puissance. (3 points)",
    ["transporter le microscope avec une main sous la base et l'autre agrippant le bras", "commencer avec l'objectif de faible puissance et mettre au point avec la vis macrométrique", "tourner la tourelle à la puissance moyenne et aiguiser l'image avec la vis micrométrique seulement"],
    "<b>Réponse modèle:</b> Transporte le microscope à deux mains, une sous la base et l'autre sur le bras, et dépose-le loin du bord de la table. Allume la lumière et place la lame sur la platine. Commence toujours avec l'objectif de faible puissance en place : regarde par l'oculaire et tourne la vis macrométrique jusqu'à ce que les cellules soient au point. Puis tourne la tourelle à l'objectif de moyenne puissance et utilise seulement la vis micrométrique pour aiguiser l'image. Quand tu as fini, retourne à faible puissance, enlève la lame, et range le microscope couvert.<br><br><b>Points d'attribution:</b> 1 point pour le transport et l'installation sûrs (deux mains, base et bras). 1 point pour commencer à faible puissance et mettre au point avec la vis macrométrique. 1 point pour passer à moyenne puissance et terminer avec la vis micrométrique seulement.", {}); }
]), ["Transporte, installe, mets au point faible, puis moyen.", "Macrométrique à faible puissance; micrométrique pour finir."]);

E("s8f-u4-care", 4, ["SC8.12.3"], 1, "var", varset([
  function () { return mcq("Quelle pratique montre un entretien approprié du microscope composé?",
    "Le transporter avec une main sous la base et l'autre sur le bras, et le ranger couvert à faible puissance",
    ["Le transporter dans le laboratoire par son tube, tenu dans une main en marchant entre les bancs", "Le ranger dans l'armoire avec une lame préparée encore assise sur sa platine après le laboratoire", "Nettoyer les lentilles de ses objectifs avec une serviette en papier ordinaire du banc de travail"],
    "Le transport à deux mains (base et bras), enlever les lames, retourner à faible puissance et couvrir le microscope pour le rangement sont les normes d'entretien. Les lentilles se nettoient seulement avec du papier à lentilles.", {}); }
]), ["Deux mains, couvert, faible puissance, aucune lame.", "Papier à lentilles seulement pour les lentilles."]);

E("s8f-u4-care-error", 4, ["SC8.12.3"], 2, "var", varset([
  function () { return mcq("Un élève finit un laboratoire et range le microscope avec l'objectif de moyenne puissance en place, une lame encore sur la platine, et aucun couvercle. Combien d'erreurs d'entretien est-ce là?",
    "Trois : il devrait être rangé à faible puissance, sans lame, et couvert",
    ["Aucune : c'est l'état de rangement correct", "Une : seulement le couvercle manquant compte", "Deux : la lame et le couvercle, mais l'objectif ne compte pas"],
    "Norme de rangement : objectif de faible puissance en place, lame enlevée, microscope couvert. L'état décrit brise les trois parties de la norme.", {}); }
]), ["Compare chaque détail à la norme de rangement.", "Faible puissance, aucune lame, couvert."]);

/* ---------- SC8.12.2 Estimer la taille des cellules ---------- */

E("s8f-u4-estimate-gen", 4, ["SC8.12.2"], 2, "gen", function () {
  var cases = [[2, 5], [3, 6], [1.6, 4], [2.4, 8], [4, 10], [2.5, 5], [1.8, 6], [3.2, 8]];
  var c = pick(cases), F = c[0], N = c[1], est = Math.round(F / N * 100) / 100;
  var dis = s8fdis(est, [est * 2, F, Math.round((est + 0.3) * 100) / 100, Math.round(est / 2 * 100) / 100]);
  return mcq("Sous le microscope, le champ de vision fait " + s8fn(F) + " mm de large. Environ " + N + " cellules d'un spécimen tiennent côte à côte à travers le champ. Estime la largeur d'une cellule.",
    s8fn(est) + " mm", dis.map(function (v) { return s8fn(v) + " mm"; }),
    "Divise le champ de vision par le nombre de cellules qui tiennent à travers lui : " + s8fn(F) + " mm / " + N + " = " + s8fn(est) + " mm. C'est une estimation, la méthode que le laboratoire de base utilise, pas une mesure exacte.", {});
}, ["Partage le champ entre les cellules.", "Champ de vision divisé par les cellules à travers."]);

E("s8f-u4-estimate-compare", 4, ["SC8.12.2"], 1, "var", varset([
  function () { return mcq("Un élève passe de l'objectif de faible puissance à l'objectif de moyenne puissance. Qu'arrive-t-il au champ de vision?",
    "Il devient plus petit, donc moins de cellules sont visibles mais chacune semble plus grande",
    ["Il devient plus grand à mesure que la puissance monte, donc plus de cellules sur la lame deviennent visibles", "Il reste exactement de la même taille qu'il était sous l'objectif de faible puissance avant le changement", "Il disparaît de la vue entièrement jusqu'à ce que la vis macrométrique soit tournée encore une fois"],
    "Un grossissement plus élevé rétrécit le champ de vision : tu vois une plus petite surface en plus grand détail. C'est pourquoi les estimations de taille doivent utiliser le champ de vision de l'objectif en usage.", {}); }
]), ["Plus de grossissement, moins de surface.", "Le champ rétrécit à mesure que la puissance monte."]);

E("s8f-u4-estimate-scenario", 4, ["SC8.12.2"], 2, "var", varset([
  function () { return mcq("Le champ de vision à moyenne puissance est de 1,2 mm. Un élève voit environ 4 cellules d'oignon côte à côte à travers le champ. La meilleure estimation de la largeur d'une cellule est",
    "environ 0,3 mm",
    ["environ 4,8 mm", "environ 1,2 mm", "environ 0,03 mm"],
    "Partage le champ entre les cellules : 1,2 mm / 4 = 0,3 mm par cellule. Des estimations comme celle-ci sont approximatives par conception; aucun calcul de rapport au-delà du partage n'est attendu.", {}); }
]), ["Divise le champ par le compte.", "1,2 partagé par 4 cellules."]);

/* ---------- SC8.12.4 et SC8.12.5 Modèles de cellules ---------- */

E("s8f-u4-model-accuracy", 4, ["SC8.12.4"], 2, "var", varset([
  function () { return mcq("Le modèle d'une cellule animale d'un groupe est un disque de papier plat avec des chloroplastes dessinés dessus. Quels deux changements amélioreraient le plus l'exactitude du modèle?",
    "Rendre le modèle tridimensionnel, et enlever les chloroplastes",
    ["Colorer le disque en vert, et ajouter une paroi cellulaire", "Étiqueter le disque avec le nom de la cellule, et le rendre plus grand", "Ajouter plus de chloroplastes, et l'aplatir davantage"],
    "Les cellules sont tridimensionnelles, ce qui explique pourquoi le guide utilise des modèles en trois dimensions, et les cellules animales n'ont pas de chloroplastes. Une paroi cellulaire serait aussi fausse pour une cellule animale.", {}); }
]), ["Les cellules ne sont pas plates.", "Les cellules animales manquent de chloroplastes et de parois."]);

E("s8f-u4-eval-process", 4, ["SC8.12.5"], 3, "var", varset([
  function () { return mcq("Une classe construit des modèles de cellules, puis évalue le processus de chaque groupe. Quelle évaluation est la plus juste et la plus utile?",
    "Juger contre une liste de vérification dont la classe a convenu avant de construire (exactitude des parties, travail d'équipe, utilisation du temps), avec des preuves notées pour chaque point",
    ["Donner la plus haute note de la classe au modèle qui a la plus belle apparence finie, sans égard au processus que son groupe a utilisé pour le construire", "Laisser chaque groupe de la classe noter son propre travail par lui-même, sans critères donnés à qui que ce soit d'avance pour guider la notation", "Classer tous les groupes de la classe de la première place à la dernière place, sans aucune explication donnée pour l'ordre du classement final"],
    "Évaluer un processus exige des critères fixés d'avance et des preuves contre eux. Juger seulement le produit final ignore le processus évalué, et une notation sans critères ne peut être ni juste ni utile.", {}); }
]), ["Critères d'abord, preuves ensuite.", "Le processus, pas seulement le produit."]);

E("s8f-u4-cr-model-eval", 4, ["SC8.12.5"], 2, "var", varset([
  function () { return textq("Ton groupe a construit un modèle de cellule tridimensionnel. Évalue le processus de ton groupe : nomme une chose que le groupe a bien faite, une faiblesse dans votre façon de travailler, et un changement précis que vous feriez la prochaine fois. Juge votre processus contre des critères, pas seulement le modèle fini. (3 points)",
    ["une vraie force du processus du groupe", "une vraie faiblesse du processus, pas seulement du produit", "une amélioration précise et praticable"],
    "<b>Réponse modèle:</b> Force : nous avons divisé les organites entre nous quatre et chaque personne a vérifié sa partie contre le diagramme avant que nous assemblions, donc le modèle fini était exact. Faiblesse : nous avons passé trop de temps à choisir les matériaux et laissé l'assemblage à la dernière classe, donc la vacuole a été précipitée et trop petite. Changement : la prochaine fois, nous fixerions une échéance pour toutes les parties une classe plus tôt et utiliserions la liste de vérification de la classe au point milieu pour attraper les problèmes pendant qu'il reste du temps pour les réparer.<br><br><b>Points d'attribution:</b> 1 point pour une vraie force du processus du groupe. 1 point pour une vraie faiblesse du processus (pas seulement du produit). 1 point pour une amélioration précise et praticable.", {}); }
]), ["Force, faiblesse, amélioration.", "Juge le processus, pas le produit."]);

/* ---------- SC8.12.6 à SC8.12.9 L'expérience sur l'activité ---------- */

E("s8f-u4-variables", 4, ["SC8.12.6", "SC8.12.9"], 2, "var", varset([
  function () { return mcq("Dans l'expérience sur la fréquence cardiaque, une élève mesure sa fréquence au repos, après avoir marché, et après avoir couru. Quelle est la variable manipulée (indépendante), et qu'est-ce qui doit être contrôlé?",
    "Le niveau d'activité est manipulé; la même personne, la même méthode de comptage et le même minutage doivent être gardés les mêmes",
    ["La fréquence cardiaque est la variable manipulée; le niveau d'activité doit être gardé le même partout", "Le niveau d'activité est manipulé; une personne différente devrait être utilisée à chaque niveau d'activité dans l'expérience", "La fréquence respiratoire est la variable manipulée; la fréquence cardiaque doit être gardée la même à chaque niveau"],
    "L'expérimentateur change le niveau d'activité et mesure la réponse (la fréquence cardiaque). Une comparaison juste exige le même sujet, le même comptage de 15 secondes multiplié par 4, et le même minutage à chaque niveau.", {}); }
]), ["Qu'est-ce que l'expérimentateur change?", "Tout le reste reste le même."]);

E("s8f-u4-protocol", 4, ["SC8.12.6"], 1, "var", varset([
  function () { return mcq("Dans le laboratoire de base, la fréquence cardiaque au repos se mesure en comptant le pouls pendant 15 secondes et en multipliant par 4. Pourquoi le comptage est-il répété trois fois et moyenné?",
    "Moyenner trois essais donne une valeur au repos plus fiable qu'un seul comptage",
    ["Trois essais sont nécessaires pour que la moyenne atteigne exactement la vraie valeur au repos du pouls", "Les deux premiers des trois comptages sont seulement des essais de pratique et sont jetés sans être utilisés", "Multiplier le comptage par 4 donne une fréquence seulement quand le comptage est fait après trois essais complets"],
    "Les comptages uniques varient avec de petites erreurs de minutage et de comptage. Répéter et moyenner réduit l'effet de tout comptage fautif unique, donnant une fréquence au repos plus digne de confiance.", {}); }
]), ["Un comptage peut être faux.", "Répétitions plus une moyenne : la fiabilité."]);

E("s8f-u4-cr-design-rates", 4, ["SC8.12.6"], 3, "var", varset([
  function () { return textq("Conçois une expérience pour comparer la fréquence cardiaque et la fréquence respiratoire au repos et après deux niveaux d'activité. Énonce la question, la variable que tu changeras, deux variables que tu contrôleras, comment tu mesureras les deux fréquences, et comment tu rendras les résultats fiables. (4 points)",
    ["une question claire et la variable manipulée (le niveau d'activité)", "deux variables contrôlées sensées", "une méthode de mesure praticable pour les deux fréquences (comptage de 15 secondes multiplié par 4)", "une étape de fiabilité (répétitions ou moyenne)"],
    "<b>Réponse modèle:</b> Question : comment la fréquence cardiaque et la fréquence respiratoire changent-elles à mesure que le niveau d'activité monte? Variable manipulée : le niveau d'activité (assis au repos, marcher pendant 1 minute, monter et descendre des marches en courant pendant 1 minute). Variables contrôlées : la même personne partout, le même temps d'activité de 1 minute chacun, et le même délai avant de mesurer. Mesures : la fréquence cardiaque à partir du pouls au poignet compté pendant 15 secondes et multiplié par 4; la fréquence respiratoire à partir des respirations comptées pendant 15 secondes et multipliées par 4. Fiabilité : prendre chaque mesure au repos trois fois et moyenner, et répéter l'ensemble complet un autre jour pour comparer.<br><br><b>Points d'attribution:</b> 1 point pour une question claire et la variable manipulée. 1 point pour deux variables contrôlées sensées. 1 point pour une méthode de mesure praticable pour les deux fréquences. 1 point pour une étape de fiabilité (répétitions ou moyenne).", {}); }
]), ["Question, variables, méthode, fiabilité.", "Utilise le comptage de 15 secondes du laboratoire de base."]);

E("s8f-u4-testable", 4, ["SC8.12.7"], 2, "var", varset([
  function () { return mcq("Quelle reformulation transforme le sujet en une question testable sur la forme physique et la santé?",
    "La fréquence cardiaque au repos diminue-t-elle après six semaines de course quotidienne?",
    ["La course est-elle, en général, une bonne activité à laquelle les gens de tous âges peuvent participer?", "Pourquoi l'exercice est-il considéré par tout le monde comme la meilleure de toutes les activités physiques?", "Les élèves de l'école aiment-ils la course comme activité plus qu'ils aiment la marche dans leur vie?"],
    "Une question testable nomme quelque chose de mesurable (la fréquence cardiaque au repos) et un changement à tester (six semaines de course). Les autres demandent des opinions ou des jugements généraux qui ne peuvent pas se mesurer tels qu'énoncés.", {}); }
]), ["Cherche quelque chose de mesurable.", "Une variable que tu peux compter ou chronométrer."]);

E("s8f-u4-testable2", 4, ["SC8.12.7"], 1, "var", varset([
  function () { return mcq("Quelle question est déjà sous forme testable?",
    "Comment la fréquence respiratoire change-t-elle quand un élève monte des escaliers pendant une minute?",
    ["Être en forme et actif est-il important pour les adolescents dans leur vie quotidienne à l'école?", "Quel est le seul meilleur sport au monde pour la santé et la forme physique d'une personne en général?", "Pourquoi les athlètes de compétition passent-ils tant d'heures à s'entraîner pour leur sport chaque semaine?"],
    "La première question peut recevoir une réponse par la mesure : la fréquence respiratoire avant et après une activité définie. Les autres appellent des opinions ou des explications trop larges pour être testées directement.", {}); }
]), ["Mesurable telle qu'écrite?", "La fréquence respiratoire peut se compter."]);

E("s8f-u4-hypothesis", 4, ["SC8.12.8"], 2, "var", varset([
  function () { return mcq("Un élève observe que ses camarades respirent plus vite après le cours d'éducation physique. Laquelle est une hypothèse appropriée fondée sur ce patron?",
    "Si le niveau d'activité augmente, alors la fréquence respiratoire augmente, parce que les muscles ont besoin de plus d'oxygène",
    ["Faire de l'exercice régulièrement est une chose saine à faire pour tout le monde, quel que soit leur âge", "La respiration est simplement une partie du travail fait par le système respiratoire du corps humain", "Les élèves de l'école aiment leurs cours d'éducation physique plus qu'ils aiment leurs cours de mathématiques"],
    "Une hypothèse est une prédiction testable qui lie les variables, idéalement avec une raison. Les autres sont une affirmation générale, un fait et une opinion, aucun d'eux une prédiction à tester.", {}); }
]), ["Une prédiction qui lie deux variables.", "Si... alors... parce que..."]);

E("s8f-u4-hypothesis-basis", 4, ["SC8.12.8"], 1, "var", varset([
  function () { return mcq("Une hypothèse devrait être fondée sur",
    "des informations de base ou un patron observé",
    ["le résultat que l'élève espère obtenir", "une supposition faite sans aucune information du tout", "la conclusion d'une expérience différente"],
    "Les hypothèses grandissent à partir de ce qui est déjà connu ou remarqué : une lecture de base ou un patron dans les observations. Espérer un résultat n'est pas une base.", {}); }
]), ["Qu'est-ce qui vient avant l'hypothèse?", "Des connaissances ou un patron remarqué."]);

E("s8f-u4-control", 4, ["SC8.12.9"], 2, "var", varset([
  function () { return mcq("Pendant l'expérience sur l'activité, une partenaire compte son pouls à son poignet pendant que l'autre compte au cou, et ils comparent les résultats. Qu'est-ce qui ne va pas avec cette procédure?",
    "La méthode de mesure n'est pas contrôlée, donc les deux ensembles de résultats ne sont pas comparables justement",
    ["Rien ne va mal avec elle : tout point de pouls sur le corps donne des résultats identiques dans une expérience", "Le pouls au poignet ne peut pas du tout être senti par qui que ce soit pendant que l'exercice se fait", "Les partenaires qui travaillent ensemble au laboratoire n'ont simplement pas le droit de comparer leurs données l'un avec l'autre"],
    "Contrôler les variables principales comprend utiliser la même méthode de mesure pour chaque essai et chaque personne. Des points de pouls et des techniques différents introduisent des différences qui ne sont pas causées par l'activité.", {}); }
]), ["Les tests justes gardent les méthodes identiques.", "Même méthode pour tout le monde."]);

E("s8f-u4-control-error", 4, ["SC8.12.9"], 3, "var", varset([
  function () { return mcq("Un groupe teste les niveaux d'activité ainsi : la personne A se repose, la personne B marche, la personne C court, et ils comparent les trois fréquences cardiaques pour décider de l'effet de l'activité. Pourquoi ne peuvent-ils rien conclure sur l'activité à partir de ces résultats?",
    "Des personnes différentes ont des fréquences au repos différentes, donc la personne est une variable non contrôlée entremêlée avec le niveau d'activité",
    ["Utiliser seulement trois personnes au total est beaucoup trop peu pour qu'une expérience de ce genre signifie quoi que ce soit", "La fréquence cardiaque d'une personne ne peut pas du tout se mesurer dans les minutes après qu'elle finit de courir", "Les trois activités auraient simplement dû être faites par le groupe dans l'ordre opposé au leur pour conclure"],
    "Le plan confond deux variables : l'activité et la personne. La fréquence de course d'une personne en forme peut être plus basse que la fréquence au repos d'une personne pas en forme, donc la comparaison ne dit rien de fiable sur l'activité. Une seule personne devrait faire les trois niveaux.", {}); }
]), ["Deux choses ont changé à la fois.", "La personne et l'activité sont entremêlées."]);

/* ---------- SC8.12.10 à SC8.12.12 Afficher et organiser les données ---------- */

E("s8f-u4-graph-choice", 4, ["SC8.12.10"], 2, "var", varset([
  function () { return mcq("Un élève note sa fréquence cardiaque chaque 30 secondes pendant 5 minutes après l'exercice, pour montrer comment elle récupère. Quel affichage convient le mieux à ces données?",
    "Un graphique linéaire de la fréquence cardiaque contre le temps",
    ["Un diagramme à bandes des noms des cinq camarades", "Un diagramme circulaire des niveaux d'activité", "Une table des matières"],
    "La récupération est un changement dans le temps, qu'un graphique linéaire montre comme une tendance. Les diagrammes à bandes comparent des catégories; les données de récupération sont un changement continu.", {}); }
]), ["Changement dans le temps : quel type de graphique?", "Les graphiques linéaires montrent les tendances."]);

E("s8f-u4-rates-figure", 4, ["SC8.12.10"], 1, "var", varset([
  function () { var q = mcq("Le diagramme à bandes montre les fréquences cardiaques au repos de cinq animaux. Quel animal a la plus basse fréquence cardiaque au repos?",
    "La baleine", ["Le chat", "Le chien", "La souris"],
    "La bande de la baleine est de loin la plus courte à 8 battements par minute. La souris, le plus petit animal, a la fréquence la plus haute à 450.", {});
    q.figure = s8fBarSVG(["Souris", "Hamster", "Chat", "Chien", "Baleine"], [450, 300, 120, 70, 8], "Fréquence cardiaque au repos (battements par minute)"); return q; }
]), ["Trouve la bande la plus courte.", "Lis la valeur au-dessus d'elle."]);

E("s8f-u4-recovery-figure", 4, ["SC8.12.10", "SC8.12.6"], 3, "var", varset([
  function () { var q = mcq("Le graphique montre la fréquence cardiaque d'une élève pendant la récupération après un exercice intense. Sa fréquence au repos est d'environ 72 battements par minute. Après combien de minutes sa fréquence cardiaque tombe-t-elle sous 90 battements par minute pour la première fois?",
    "4 minutes", ["2 minutes", "3 minutes", "5 minutes"],
    "En lisant les points tracés : 138, 120, 106 et 94 battements par minute aux minutes 0 à 3 sont tous au-dessus de 90; à la minute 4, la fréquence est 84, la première lecture sous 90, à mesure qu'elle se stabilise vers la fréquence au repos d'environ 72.", {});
    q.figure = s8fLineGraphSVG([0, 1, 2, 3, 4, 5], [138, 120, 106, 94, 84, 78], "Minutes depuis la fin de l'exercice", "Fréquence cardiaque (battements par minute)"); return q; }
]), ["Suis les points minute par minute.", "Premier point sous 90."]);

E("s8f-u4-variation-explain", 4, ["SC8.12.11"], 2, "var", varset([
  function () { return mcq("Une classe répète l'expérience sur l'activité un deuxième jour. La fréquence cardiaque au repos d'un élève est 76 le premier jour et 84 le deuxième jour. Laquelle est une explication raisonnable de la variation?",
    "Il avait monté les escaliers en courant juste avant la mesure du deuxième jour, donc sa fréquence ne s'était pas stabilisée au vrai repos",
    ["La fréquence cardiaque au repos d'une personne ne change jamais d'un jour à l'autre, donc un des deux comptages a dû être fabriqué", "Le cœur de l'élève lui-même a grandi sensiblement dans le temps entre les deux jours de mesure au laboratoire", "La multiplication du comptage de 15 secondes par 4 fonctionne correctement seulement le premier jour d'une expérience"],
    "Les mesures au repos varient avec l'activité récente, le stress, les erreurs de comptage et le moment de la journée. Une fréquence prise juste après avoir monté les escaliers en courant n'est pas une vraie fréquence au repos, ce qui est exactement pourquoi les répétitions et le temps de stabilisation comptent.", {}); }
]), ["Qu'est-ce qui différait entre les deux jours?", "Le vrai repos doit être stabilisé."]);

E("s8f-u4-animal-pattern", 4, ["SC8.12.11", "SC8.10.6"], 3, "var", varset([
  function () { var q = mcq("Le diagramme à bandes montre les fréquences cardiaques au repos de cinq animaux. Quelle affirmation explique le mieux le patron?",
    "Les animaux plus petits ont des fréquences cardiaques au repos beaucoup plus hautes; leurs corps doivent faire circuler le sang et livrer l'oxygène à un taux plus rapide pour leur taille",
    ["Les animaux plus grands ont des fréquences cardiaques au repos plus hautes que les animaux plus petits, parce que leurs corps beaucoup plus grands contiennent une bien plus grande quantité de sang", "La fréquence cardiaque au repos d'un animal est complètement sans lien avec la taille du corps de l'animal ou avec le genre de vie qu'il mène dans son environnement naturel chaque jour", "La fréquence au repos de la baleine est la plus basse des cinq animaux seulement parce que la baleine vit toute sa vie dans l'eau froide de l'océan, loin des prédateurs et de l'activité"],
    "À travers les données, le patron est constant : souris 450, hamster 300, chat 120, chien 70, baleine 8 battements par minute. Plus l'animal est petit, plus sa fréquence cardiaque au repos est haute, parce que les besoins de ses cellules doivent être répondus par une circulation plus rapide par rapport à sa taille.", {});
    q.figure = s8fBarSVG(["Souris", "Hamster", "Chat", "Chien", "Baleine"], [450, 300, 120, 70, 8], "Fréquence cardiaque au repos (battements par minute)"); return q; }
]), ["Ordonne les animaux par taille, puis par fréquence.", "La tendance court à l'opposé de la taille."]);

E("s8f-u4-organize", 4, ["SC8.12.12"], 1, "var", varset([
  function () { return mcq("Deux partenaires mesurent chacun la fréquence cardiaque et la fréquence respiratoire à trois niveaux d'activité. Quel format organise le mieux les données pour la comparaison?",
    "Un tableau avec des rangées pour chaque personne et niveau d'activité, et des colonnes pour la fréquence cardiaque et la fréquence respiratoire, y compris les moyennes",
    ["Un paragraphe d'écriture décrivant en mots la plus occupée des journées où la classe a fait les activités au gymnase, avec les nombres racontés dans l'histoire", "Une seule longue liste de tous les nombres que les deux partenaires ont notés, écrite dans l'ordre où ils ont été mesurés pendant les trois niveaux d'activité", "Un dessin étiqueté du gymnase de l'école, montrant où la classe a mené chacune des mesures d'activité pendant le laboratoire, avec les endroits marqués dessus"],
    "Un tableau structuré garde chaque mesure liée à sa personne, son activité et son type de fréquence, et la colonne des moyennes que le laboratoire exige. Une liste libre perd quel nombre appartient à quoi.", {}); }
]), ["La comparaison exige une structure.", "Rangées et colonnes avec des étiquettes."]);

E("s8f-u4-organize-avg", 4, ["SC8.12.12"], 2, "var", varset([
  function () { return mcq("Un tableau de données pour les mesures au repos a trois colonnes d'essais et une colonne de moyenne. Pourquoi le laboratoire organise-t-il les données ainsi?",
    "Montrer les essais et leur moyenne rend les données transparentes et la valeur au repos plus digne de confiance",
    ["La colonne de la moyenne est là pour cacher tout essai qui est en désaccord avec le reste des données du tableau", "Trois essais séparés sont exigés dans le tableau simplement pour que les colonnes remplissent toute la page du cahier", "Les moyennes sont calculées au laboratoire afin de changer les résultats en les valeurs que la classe voulait obtenir"],
    "Organiser les essais à côté de leur moyenne laisse quiconque voir l'étendue des mesures et juger la valeur au repos. Rien n'est caché : les essais restent affichés.", {}); }
]), ["Transparence et confiance.", "Essais visibles, moyenne à côté d'eux."]);

/* Exclusion de composition (Nov 16, 2026) : les questions nommées ici
   portent noCompose, et composeExam les laisse hors de chaque examen
   composé (tests d'unité, révisions de mi-parcours et finales,
   compositions personnalisées), tandis que les tirages de pratique,
   les vérifications de préalables et les choix explicites de
   l'enseignant les gardent. La question de conception d'une
   expérience est réservée à la pratique et aux choix de l'enseignant. */
var NO_COMPOSE_U4 = {
  "s8f-u4-cr-design-rates": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });
