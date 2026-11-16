// CRMARKS: s8f-u1-cr-cycle-role=3
// CRMARKS: s8f-u1-cr-glacier=3
// CRMARKS: s8f-u1-cr-abiotic=3
// CRMARKS: s8f-u1-cr-coastal-climate=3
// CRMARKS: s8f-u1-cr-tides=3
// CRMARKS: s8f-u1-cr-headland=3
// CRMARKS: s8f-u1-cr-indirect=3
// CRMARKS: s8f-u1-cr-protect=3
// CRMARKS: s8f-u1-cr-tech-effects=3
// CRMARKS: s8f-u1-cr-decision=4
// CRMARKS: s8f-u1-cr-design-salinity=4
// CRMARKS: s8f-u1-cr-results-summary=3
// CRMARKS: s8f-u1-cr-pond-data=3
// CRMARKS: s8f-u1-cr-population=3
// Sciences 8, Unité 1 : Les réseaux hydrographiques sur la Terre
// (SC8.1.1 à SC8.3.11), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Honnêteté de couverture : SC8.1.10 reprend l'objet de SC8.1.6 (les
// interactions entre les courants océaniques, les vents et les climats
// régionaux) avec des scénarios distincts, et SC8.3.11 reprend l'objet
// de SC8.1.9 (la recherche sur l'érosion et la formation de dépôts)
// avec des scénarios distincts. SC8.3.6 porte l'identification des
// facteurs abiotiques en contexte d'habiletés, et SC8.3.7 porte le
// choix des méthodes et des outils.
// Discipline du contenu : l'eau de mer et l'eau douce sont comparées
// de façon qualitative (salinité, masse volumique, point de
// congélation); aucune question n'exige une valeur de salinité ou de
// masse volumique mémorisée. Les technologies de recherche sont
// évaluées selon leur utilité seulement.
// Résidu CORE : les questions de SC8.3.1 évaluent les étapes de la
// procédure, l'extension à l'estuaire et la conception d'une
// recherche; elles n'évaluent pas la réalisation du laboratoire au
// comptoir. SC8.3.2 porte une seule question sur la pratique sûre; la
// manipulation sûre elle-même relève de l'évaluation en classe. Les
// questions de SC8.3.5 évaluent le jugement et l'énoncé de
// conclusions à partir de résultats décrits, et non la conclusion
// tirée en direct au laboratoire.

/* ---------- SC8.1.1 Le cycle de l'eau et l'eau de la Terre ---------- */

E("s8f-u1-cycle-process", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { d: "le Soleil chauffe un lac et de la vapeur d'eau s'élève de sa surface", k: "Évaporation", w: ["Condensation", "Précipitation", "Ruissellement"] },
    { d: "la vapeur d'eau haut dans l'air se refroidit et se transforme en minuscules gouttelettes liquides qui forment un nuage", k: "Condensation", w: ["Évaporation", "Précipitation", "Ruissellement"] },
    { d: "la pluie tombe d'un nuage sur le flanc d'une colline", k: "Précipitation", w: ["Condensation", "Évaporation", "Ruissellement"] },
    { d: "l'eau de pluie s'écoule sur la surface du sol jusqu'à un ruisseau voisin", k: "Ruissellement", w: ["Condensation", "Évaporation", "Précipitation"] },
    { d: "la neige entassée sur une montagne se compacte lentement en une masse de glace", k: "Formation d'un glacier", w: ["Condensation", "Évaporation", "Précipitation"] }
  ];
  var c = pick(cases);
  return mcq("Dans le cycle de l'eau, quel processus est décrit ici : " + c.d + "?",
    c.k, c.w,
    "Le cycle de l'eau déplace l'eau entre les océans, les terres et l'atmosphère. L'évaporation transforme l'eau liquide en vapeur, la condensation transforme la vapeur en gouttelettes liquides, les précipitations ramènent l'eau à la surface, et le ruissellement transporte l'eau de surface vers les ruisseaux, les lacs et l'océan. La neige compactée qui devient de la glace forme un glacier, l'un des réservoirs d'eau douce de la Terre.",
    {});
}, ["Nomme d'abord ce que l'eau est en train de faire, puis associe-le au mot du processus.", "Demande-toi si l'eau s'élève en vapeur, forme des gouttelettes, tombe ou s'écoule sur le sol."]);

E("s8f-u1-distribution", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "Environ quelle proportion de toute l'eau de la Terre est de l'eau salée dans les océans?", k: "Environ 97 pour cent", w: ["Environ 1 pour cent", "Environ 50 pour cent", "Environ 75 pour cent"] },
    { q: "Environ quelle proportion de l'eau de la Terre est gelée dans les calottes glaciaires et les glaciers?", k: "Environ 2 pour cent", w: ["Environ 1 pour cent", "Environ 25 pour cent", "Environ 97 pour cent"] },
    { q: "Environ quelle proportion de l'eau de la Terre est de l'eau douce disponible dans les lacs, les rivières et les eaux souterraines?", k: "Environ 1 pour cent", w: ["Environ 2 pour cent", "Environ 25 pour cent", "Environ 97 pour cent"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "L'eau de la Terre est répartie de façon très inégale : environ 97 pour cent est de l'eau salée dans les océans, environ 2 pour cent est gelée dans les calottes glaciaires et les glaciers, et seulement environ 1 pour cent est de l'eau douce disponible dans les lacs, les rivières et les eaux souterraines. C'est cette petite part disponible qui rend les sources d'eau douce si importantes.",
    {});
}, ["Les trois proportions sont 97, 2 et 1 pour cent. Associe la description à sa proportion.", "Presque toute l'eau de la Terre est de l'eau d'océan."]);

E("s8f-u1-fresh-sources", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "Une ville puise son eau potable dans des puits forés profondément dans le sol. Quelle source d'eau douce la ville utilise-t-elle?", k: "Les eaux souterraines", w: ["Un bassin versant", "Un glacier de montagne", "Le ruissellement de surface"] },
    { q: "L'approvisionnement en eau d'une communauté provient d'une énorme masse de glace qui se déplace lentement. Quelle est cette source d'eau douce?", k: "Un glacier de montagne", w: ["Un bassin versant", "Les eaux souterraines", "Le ruissellement de surface"] },
    { q: "Toute la pluie qui tombe sur une vallée finit par s'écouler dans une seule grande rivière. Comment appelle-t-on toute la superficie de terre qui se draine ainsi?", k: "Un bassin versant", w: ["Un glacier de montagne", "Les eaux souterraines", "Un estuaire de rivière"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "On nomme trois sources d'eau douce : les bassins versants (la superficie de terre qui se draine dans une rivière commune), les eaux souterraines (l'eau emmagasinée sous terre) et les glaciers (l'eau emmagasinée sous forme de glace). Chaque cas ici décrit l'une des trois.",
    {});
}, ["On nomme trois sources d'eau douce. Décide laquelle chaque cas décrit.", "Les puits puisent les eaux souterraines; les masses de glace sont des glaciers; la terre qui se draine vers une rivière forme un bassin versant."]);

E("s8f-u1-ocean-vs-fresh", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé compare correctement l'eau de mer à l'eau douce?",
      "L'eau de mer a une salinité plus élevée et une masse volumique plus grande, et elle gèle à une température plus basse que l'eau douce",
      ["L'eau de mer a une salinité plus élevée et une masse volumique plus faible, et elle gèle à une température plus basse que l'eau douce",
       "L'eau de mer a une salinité plus faible et une masse volumique plus grande, et elle gèle à une température plus haute que l'eau douce",
       "L'eau de mer a une salinité plus faible et une masse volumique plus faible, et elle gèle à la même température que l'eau douce"],
      "Les sels dissous rendent l'eau de mer différente de l'eau douce de trois façons liées : sa salinité est plus élevée, la matière dissoute la rend plus dense, et le sel abaisse son point de congélation, si bien que l'eau de mer doit devenir plus froide que 0 degré Celsius avant de geler. Les comparaisons sont qualitatives.",
      {});
  },
  function () {
    return mcq("Une hydrologue et un océanographe comparent leurs notes. Quel énoncé accepteraient-ils tous les deux?",
      "L'eau de mer est plus dense que l'eau douce à cause des sels qui y sont dissous",
      ["L'eau douce est plus dense que l'eau de mer parce qu'elle est plus froide",
       "L'eau de mer et l'eau douce ont la même masse volumique parce que ce sont surtout de l'eau",
       "L'eau douce gèle à une température plus basse que l'eau de mer"],
      "Les sels dissous dans l'eau de mer ajoutent de la masse sans ajouter beaucoup de volume, donc l'eau de mer est plus dense que l'eau douce. L'eau douce gèle à 0 degré Celsius; le sel dissous abaisse le point de congélation de l'eau de mer sous cette valeur.",
      {});
  }
]), ["Pense à ce que le sel dissous fait à l'eau : il y ajoute de la matière dissoute.", "Le sel augmente la masse volumique et abaisse le point de congélation."]);

E("s8f-u1-cr-cycle-role", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return textq("Les océans contiennent environ 97 pour cent de l'eau de la Terre, et pourtant le cycle de l'eau continue d'approvisionner les lacs, les rivières et les eaux souterraines en eau douce. Explique comment le cycle de l'eau y parvient. (3 points)",
      ["l'évaporation laisse le sel derrière elle", "condensation", "précipitations", "ruissellement et eaux souterraines"],
      "<b>Réponse modèle :</b> L'énergie du Soleil fait évaporer l'eau de la surface de l'océan, et les sels dissous restent derrière, donc la vapeur est douce. La vapeur se refroidit et se condense en nuages, puis tombe en précipitations. La pluie et la neige qui tombent sur les terres s'accumulent dans les lacs et les rivières, s'infiltrent pour devenir des eaux souterraines ou reviennent par ruissellement, si bien que le cycle livre continuellement de l'eau douce aux terres même si presque toute l'eau de la Terre est de l'eau d'océan salée.<br><br><b>Points d'attribution :</b> 1 point pour l'évaporation qui laisse les sels derrière dans l'océan. 1 point pour la condensation et les précipitations qui ramènent l'eau. 1 point pour l'eau qui s'accumule en eau de surface ou en eau souterraine (ou qui revient par ruissellement).",
      {});
  }
]), ["Commence à la surface de l'océan et suis l'eau jusqu'à un lac.", "L'étape clé est ce qui arrive au sel pendant l'évaporation."]);

/* ---------- SC8.1.2 Les changements climatiques et les glaciers ---------- */

E("s8f-u1-ice-age", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce qu'une période glaciaire?",
      "Une longue période de refroidissement global pendant laquelle les glaciers avancent et couvrent de grandes superficies de terre",
      ["Une seule saison d'hiver très froide dans une petite région, avec beaucoup de neige et des lacs gelés",
       "Une période pendant laquelle l'eau de l'océan gèle complètement sur toute la surface de l'océan",
       "Une courte période de réchauffement pendant laquelle un glacier recule d'une petite distance à partir de son front"],
      "Une période glaciaire est une longue période de refroidissement global, qui dure bien au-delà d'une seule saison, pendant laquelle les glaciers avancent et s'étendent sur de grandes superficies. Des périodes de changements climatiques de ce genre ont fait avancer et reculer les glaciers de nombreuses fois dans l'histoire de la Terre.",
      {});
  }
]), ["Pense à l'échelle : une période glaciaire se mesure en milliers d'années, et non en un seul hiver.", "Les glaciers grossissent et avancent quand tout le climat se refroidit pendant longtemps."]);

E("s8f-u1-glacier-retreat", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Dans le Nord, les glaciers reculent à mesure que le climat se réchauffe. Quel ensemble d'effets découle de ce recul?",
      "Le niveau de la mer monte à mesure que l'eau de fonte atteint l'océan, et la réserve d'eau douce emmagasinée diminue",
      ["Le niveau de la mer baisse à mesure que l'eau de fonte atteint l'océan, et la réserve d'eau douce emmagasinée augmente",
       "Le niveau de la mer reste le même, parce que la glace des glaciers n'a jamais fait partie du cycle de l'eau",
       "Le pergélisol s'approfondit, parce que les glaciers qui reculent refroidissent le sol sous eux"],
      "Les glaciers emmagasinent l'eau douce sous forme de glace sur les terres. Quand ils reculent, l'eau de fonte s'écoule vers l'océan et le niveau de la mer monte, la réserve d'eau douce emmagasinée diminue, et le réchauffement dégèle aussi le pergélisol dans le sol du Nord. Chaque effet découle de l'eau qui quitte son emmagasinage sur les terres.",
      {});
  }
]), ["La glace d'un glacier est de l'eau douce emmagasinée sur les terres. Suis où l'eau de fonte s'en va.", "L'eau qui quitte l'emmagasinage sur les terres finit dans l'océan."]);

E("s8f-u1-cr-glacier", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return textq("Une communauté du Nord tire une grande partie de son approvisionnement en eau d'été d'une rivière alimentée par un glacier. Le glacier recule régulièrement depuis des décennies. Explique deux effets que ce recul pourrait avoir, un sur l'approvisionnement en eau de la communauté et un sur l'environnement en général. (3 points)",
      ["moins d'eau de fonte en été une fois le glacier réduit", "montée du niveau de la mer", "dégel du pergélisol"],
      "<b>Réponse modèle :</b> Pendant qu'un glacier recule, le débit d'eau de fonte peut être fort, mais à mesure que le glacier rapetisse, il reste moins de glace à fondre, donc le débit d'été de la rivière baisse et l'approvisionnement en eau douce emmagasinée de la communauté devient moins fiable. Dans l'environnement en général, l'eau de fonte qui quitte les terres atteint l'océan et contribue à la montée du niveau de la mer, et le même réchauffement dégèle le pergélisol, ce qui change le drainage et les terres du Nord. (L'un ou l'autre effet environnemental, développé, mérite le point.)<br><br><b>Points d'attribution :</b> 1 point pour la réserve de glace qui diminue. 1 point pour l'effet sur l'approvisionnement en eau d'été de la communauté. 1 point pour un effet environnemental plus large (montée du niveau de la mer ou dégel du pergélisol) avec sa cause énoncée.",
      {});
  }
]), ["Sépare les deux échelles : la rivière de la communauté, puis l'environnement en général.", "Un glacier est une réserve d'eau douce. Qu'arrive-t-il quand la réserve se vide?"]);

/* ---------- SC8.1.3 La productivité et la répartition des espèces ---------- */

E("s8f-u1-fresh-env", 1, ["SC8.1.3"], 1, "gen", function () {
  var cases = [
    { d: "une zone de basse terre qui reste saturée d'eau pendant une grande partie de l'année, avec des quenouilles et de la sphaigne qui y poussent", k: "Un milieu humide", w: ["Un estuaire côtier", "Un lac profond", "Une rivière vive"] },
    { d: "l'endroit où une rivière rencontre l'océan et où son eau douce se mélange à l'eau salée", k: "Un estuaire", w: ["Un lac", "Un milieu humide", "La zone benthique"] },
    { d: "un milieu d'eau douce en mouvement qui transporte l'eau des terres hautes vers un lac ou l'océan", k: "Une rivière ou un ruisseau", w: ["Un estuaire de rivière côtière", "Un milieu humide saturé d'eau", "La zone pélagique de l'océan"] },
    { d: "une masse d'eau douce stagnante, assez profonde au milieu pour que la lumière du soleil n'atteigne pas le fond", k: "Un lac ou un étang", w: ["Un estuaire", "Une rivière", "Un milieu humide"] }
  ];
  var c = pick(cases);
  return mcq("Quel milieu d'eau douce ou côtier est décrit ici : " + c.d + "?",
    c.k, c.w,
    "Les milieux d'eau douce sont les lacs et les étangs (eau stagnante), les milieux humides (terres saturées d'eau), les rivières et les ruisseaux (eau en mouvement), et les estuaires, où l'eau douce d'une rivière se mélange à l'eau salée de l'océan.",
    {});
}, ["Décide d'abord si l'eau est stagnante, en mouvement, une terre saturée, ou en train de se mélanger à l'océan.", "Un estuaire se définit par le mélange : l'eau douce qui rencontre l'eau salée."]);

E("s8f-u1-species-category", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("Un relevé d'un étang consigne des escargots, des grenouilles, des bactéries et des quenouilles. Quelle liste associe correctement chaque sorte d'organisme à sa catégorie?",
      "Les escargots sont des invertébrés, les grenouilles des vertébrés, les bactéries des microorganismes et les quenouilles des plantes",
      ["Les escargots sont des vertébrés, les grenouilles des invertébrés, les bactéries des plantes et les quenouilles des microorganismes",
       "Les escargots sont des microorganismes, les grenouilles des vertébrés, les bactéries des invertébrés et les quenouilles des plantes",
       "Les escargots sont des invertébrés, les grenouilles des microorganismes, les bactéries des vertébrés et les quenouilles des plantes"],
      "Les espèces d'un milieu se classent en invertébrés (animaux sans colonne vertébrale, comme les escargots), en vertébrés (animaux avec une colonne vertébrale, comme les grenouilles), en microorganismes (êtres vivants minuscules comme les bactéries) et en plantes (comme les quenouilles).",
      {});
  }
]), ["Utilise d'abord le critère de la colonne vertébrale : les escargots n'en ont pas, les grenouilles en ont une.", "Les bactéries sont des microorganismes; les quenouilles sont des plantes."]);

E("s8f-u1-zones", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("Une plie repose à plat sur le plancher océanique et s'y nourrit. Quelle zone du milieu marin est le domicile de la plie?",
      "La zone benthique, le milieu du plancher océanique",
      ["La zone pélagique, le milieu de l'eau libre",
       "Un estuaire, où la rivière rencontre l'océan",
       "Un milieu humide, où la terre reste saturée"],
      "Les milieux marins se divisent en zone pélagique, l'eau libre, et en zone benthique, le plancher océanique. Un poisson qui vit sur le fond, comme une plie, vit dans la zone benthique.",
      {});
  }
]), ["Pélagique veut dire l'eau libre; benthique veut dire le fond.", "Le domicile de la plie est le plancher lui-même."]);

E("s8f-u1-productivity", 1, ["SC8.1.3"], 3, "var", varset([
  function () {
    return mcq("On étudie deux baies. La baie A reçoit une remontée régulière d'eaux froides profondes. La baie B n'a aucune remontée et peu d'éléments nutritifs atteignent ses eaux de surface. Les deux baies reçoivent un ensoleillement et des températures semblables. Quelle baie devrait abriter plus d'espèces, et pourquoi?",
      "La baie A, parce que l'eau remontée transporte des éléments nutritifs qui nourrissent le plancton, lequel soutient le reste du réseau alimentaire",
      ["La baie A, parce que l'eau profonde est plus froide, et que l'eau froide abrite toujours plus d'espèces que l'eau chaude dans n'importe quelle baie",
       "La baie B, parce que de faibles niveaux d'éléments nutritifs empêchent les algues d'utiliser l'oxygène de l'eau, donc plus d'espèces y survivent",
       "Les deux baies également, parce que l'ensoleillement et la température sont les seuls facteurs qui comptent pour les espèces d'une baie"],
      "La productivité dépend de plus que de la lumière et de la température. La remontée d'eaux froides amène à la surface une eau profonde riche en éléments nutritifs, les éléments nutritifs nourrissent la croissance du plancton, et le plancton soutient le réseau alimentaire au-dessus de lui. La baie B n'a pas cet apport d'éléments nutritifs, donc sa productivité et la répartition de ses espèces en sont limitées.",
      {});
  }
]), ["Suis la chaîne : éléments nutritifs, plancton, puis tout ce qui mange le plancton.", "La remontée d'eaux froides est le facteur marin qui nourrit la productivité."]);

/* ---------- SC8.1.4 Les facteurs abiotiques ---------- */

E("s8f-u1-upwelling", 1, ["SC8.1.4"], 1, "var", varset([
  function () {
    return mcq("Qu'est-ce que la remontée d'eaux froides?",
      "Le mouvement vertical de l'eau plus froide, plus dense et riche en éléments nutritifs qui monte du dessous vers la surface de l'océan",
      ["Le mouvement de l'eau chaude de surface qui descend dans la colonne d'eau jusqu'au plancher océanique en dessous",
       "Le mouvement latéral de l'eau de surface poussée le long de la côte par le vent qui souffle sur l'océan",
       "La montée et la descente de la surface de l'océan à mesure que les marées entrent et sortent le long du rivage"],
      "La remontée d'eaux froides est le mouvement vertical qui amène à la surface l'eau de subsurface, qui est plus froide, plus dense et riche en éléments nutritifs. Elle est la plus fréquente le long des côtes ouest des continents, et elle nourrit la productivité de ces eaux de surface.",
      {});
  }
]), ["La remontée déplace l'eau dans une seule direction : vers le haut. Quelle sorte d'eau monte?", "L'eau qui monte est froide, dense et pleine d'éléments nutritifs."]);

E("s8f-u1-abiotic", 1, ["SC8.1.4"], 2, "gen", function () {
  var cases = [
    { d: "De fortes pluies entraînent de la terre dans un étang, et l'eau reste trouble pendant des semaines. Les plantes aquatiques du fond commencent à dépérir.", k: "Turbidité : les particules en suspension bloquent la lumière du soleil dont les plantes ont besoin", w: ["Oxygène dissous : la pluie ajoute de l'oxygène que les plantes ne peuvent pas utiliser", "Phosphates : la terre retire les éléments nutritifs dont les plantes ont besoin", "Température : la pluie refroidit l'eau sous ce que les plantes tolèrent"] },
    { d: "Le ruissellement d'engrais entre dans un lac, et les algues poussent si dru que l'eau devient verte.", k: "Phosphates : des éléments nutritifs supplémentaires nourrissent une poussée de croissance des algues", w: ["Acidité : l'engrais rend l'eau trop acide pour les algues", "Pollution : l'engrais empoisonne seulement les prédateurs des algues", "Turbidité : l'engrais trouble l'eau et ombrage les algues"] },
    { d: "Une usine rejette de l'eau chaude dans une rivière tout l'été, et les poissons qui y vivaient se déplacent vers l'aval.", k: "Température : l'eau plus chaude contient moins d'oxygène dissous, donc les poissons partent", w: ["Acidité : l'eau chaude est toujours plus acide que l'eau froide", "Phosphates : l'eau chaude transporte des phosphates qui repoussent les poissons", "Remontée d'eaux froides : l'eau chaude coule et pousse les poissons au loin"] }
  ];
  var c = pick(cases);
  return mcq("Quel facteur abiotique explique le mieux ce changement : " + c.d,
    c.k, c.w,
    "Les facteurs abiotiques agissent par des mécanismes précis. La turbidité est la matière en suspension qui bloque la lumière. Les phosphates sont des éléments nutritifs, donc des phosphates supplémentaires nourrissent la croissance des algues. La température compte en partie parce que l'eau chaude contient moins d'oxygène dissous que l'eau froide, ce qui explique que les poissons quittent l'eau réchauffée. Associer le facteur à son mécanisme est l'habileté visée.",
    {});
}, ["Nomme le facteur, puis vérifie son mécanisme contre ce qui a changé.", "Une eau trouble pointe vers la turbidité; une poussée d'éléments nutritifs pointe vers les phosphates; une eau réchauffée pointe vers la température et l'oxygène."]);

E("s8f-u1-cr-abiotic", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("Un étang qui abritait des grenouilles, des poissons et des plantes aquatiques change au cours d'un été : le ruissellement d'une nouvelle route rend l'eau trouble pendant des semaines à la fois, et l'engrais des pelouses voisines y est entraîné après chaque pluie. Explique l'effet que chaque changement aurait sur les espèces de l'étang, en nommant le facteur abiotique dans chaque cas. (3 points)",
      ["la turbidité bloque la lumière du soleil, donc les plantes aquatiques dépérissent", "les phosphates nourrissent la croissance des algues", "les espèces qui dépendent des plantes sont touchées"],
      "<b>Réponse modèle :</b> Le ruissellement de la route augmente la turbidité de l'étang : les particules en suspension bloquent la lumière du soleil, donc les plantes aquatiques du fond reçoivent moins de lumière et commencent à dépérir, et les animaux qui se nourrissent des plantes ou s'y abritent sont touchés avec elles. L'engrais augmente les niveaux de phosphates : les phosphates sont des éléments nutritifs, donc les algues poussent rapidement, et la croissance des algues ombrage encore les plantes et change l'équilibre d'oxygène de l'étang en se décomposant. Les deux changements modifient les espèces que l'étang peut abriter.<br><br><b>Points d'attribution :</b> 1 point pour la turbidité nommée et liée à la lumière bloquée et à la perte des plantes. 1 point pour les phosphates nommés et liés à la croissance accrue des algues. 1 point pour une conséquence suivie jusqu'aux autres espèces de l'étang.",
      {});
  }
]), ["Traite les deux changements un à la fois : l'eau trouble, puis l'engrais.", "Chaque facteur agit par un mécanisme. Nomme le facteur, puis son mécanisme, puis l'effet sur les espèces."]);

E("s8f-u1-temp-oxygen", 1, ["SC8.1.4"], 3, "var", varset([
  function () {
    return mcq("Les températures de l'océan dans une région de pêche augmentent sur plusieurs années. Selon la chaîne d'effets décrite, quelle suite est correcte?",
      "L'eau plus chaude contient moins d'oxygène dissous, donc les poissons se déplacent vers d'autres zones, et la pêche locale est touchée",
      ["L'eau plus chaude contient plus d'oxygène dissous, donc les populations de poissons augmentent, et la pêche locale prend de l'expansion",
       "L'eau plus chaude contient moins d'oxygène dissous, mais les poissons restent parce que la température n'influe pas sur la répartition",
       "L'eau plus chaude change la salinité de l'eau, donc les poissons se déplacent, et la pêche locale est touchée"],
      "La chaîne d'exemple fonctionne ainsi : la température de l'océan augmente, l'eau plus chaude contient moins d'oxygène dissous, les poissons quittent la région, et la pêche locale est touchée. La température agit sur la répartition par l'oxygène que l'eau peut contenir.",
      {});
  }
]), ["La chaîne a quatre maillons : température, oxygène, poissons, pêche. Vérifie chaque choix contre elle.", "L'eau chaude contient moins d'oxygène dissous que l'eau froide."]);

/* ---------- SC8.1.5 La formation des bassins océaniques ---------- */

E("s8f-u1-profile-figure", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque le talus continental?",
      "B",
      ["A", "C", "D"],
      "Dans le profil du bassin, A se trouve sur le plateau continental, l'extension plate du continent sous une eau peu profonde. B se trouve là où le plancher descend abruptement, le talus continental. C repose sur la vaste plaine abyssale plate, et D est la dorsale médio-océanique surélevée.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque la plaine abyssale?",
      "C",
      ["A", "B", "D"],
      "La plaine abyssale est la vaste région plate du plancher océanique profond, marquée C. A est le plateau continental, B est le talus continental abrupt, et D est la dorsale médio-océanique surélevée.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre une coupe d'un bassin océanique. Quelle lettre marque la dorsale médio-océanique?",
      "D",
      ["A", "B", "C"],
      "La dorsale médio-océanique est la chaîne de montagnes sous-marine où se forme le nouveau plancher océanique, marquée D là où le profil s'élève. A est le plateau continental, B le talus continental, et C la plaine abyssale plate.",
      {});
    q.figure = S8F_PROFILE_SVG;
    return q;
  }
]), ["Pars du rivage vers le large : plateau, puis la descente abrupte, puis le plancher profond plat, puis la dorsale.", "Le talus est la partie abrupte du profil."]);

E("s8f-u1-basin-process", 1, ["SC8.1.5"], 3, "gen", function () {
  var cases = [
    { d: "une longue chaîne de montagnes sous-marine où la matière fondue s'élève, se refroidit et durcit en un nouveau plancher océanique", k: "L'action des volcans et la tectonique des plaques qui construisent un nouveau plancher à une dorsale médio-océanique", w: ["L'érosion qui use le bord extérieur du continent sur une longue période de temps", "La glaciation qui creuse un profond chenal de drainage dans les terres à mesure que la glace avance", "La formation de dépôts de sédiments qui se déposent lentement sur la plaine abyssale plate avec le temps"] },
    { d: "un profond réseau de vallées sur les terres qui transporte maintenant l'eau d'une rivière vers l'océan, creusé sur des milliers d'années par la glace en mouvement puis par l'eau qui s'écoule", k: "La glaciation et l'érosion qui façonnent un réseau de drainage continental", w: ["La tectonique des plaques qui soulève une dorsale médio-océanique au milieu du plancher océanique", "L'action des volcans qui forme un nouveau plancher océanique là où les plaques s'écartent", "La formation de dépôts qui construit le bord extérieur du plateau continental sur une longue période"] }
  ];
  var c = pick(cases);
  return mcq("Quel processus ou quelle paire de processus explique le mieux cet élément : " + c.d + "?",
    c.k, c.w,
    "Les bassins océaniques et les réseaux de drainage continentaux se forment par l'action des volcans, la tectonique des plaques, l'érosion et la glaciation. Le nouveau plancher océanique se construit là où les plaques s'écartent et où la matière volcanique durcit aux dorsales médio-océaniques. Sur les terres, le rôle de la glaciation est l'érosion : la glace en mouvement et l'eau qui la suit creusent les réseaux de drainage qui transportent l'eau vers l'océan.",
    {});
}, ["Décide si l'élément se construit (nouveau plancher) ou se creuse et se façonne (drainage).", "Un nouveau plancher océanique veut dire l'action des volcans à une dorsale; des vallées creusées veulent dire l'érosion, avec la glaciation comme sa part due à la glace."]);

E("s8f-u1-glaciation-role", 1, ["SC8.1.5"], 2, "var", varset([
  function () {
    return mcq("Dans la formation des bassins océaniques et des réseaux de drainage continentaux, quel est le rôle de la glaciation?",
      "La glaciation érode les terres à mesure que la glace avance, façonnant les réseaux de drainage qui transportent l'eau vers l'océan",
      ["La glaciation construit un nouveau plancher océanique aux endroits où les plaques de la croûte s'écartent",
       "La glaciation dépose les sédiments qui se déposent et forment la plaine abyssale plate",
       "La glaciation crée l'action des volcans qui se produit tout le long des dorsales médio-océaniques"],
      "Le rôle de la glaciation se limite à l'érosion dans les réseaux de drainage : la glace en mouvement gratte et creuse les terres, façonnant les vallées et les bassins qui se drainent vers l'océan. Le nouveau plancher océanique vient de l'action des volcans et de la tectonique des plaques, et non de la glace.",
      {});
  }
]), ["La glaciation a un seul travail précis ici. C'est un travail d'usure, et non de construction.", "La glace avance et gratte : c'est l'érosion."]);

E("s8f-u1-profile-order", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    return mcq("En partant du rivage et en avançant vers l'océan profond, quel ordre d'éléments est correct?",
      "Plateau continental, talus continental, plaine abyssale, dorsale médio-océanique",
      ["Talus continental, plateau continental, dorsale médio-océanique, plaine abyssale",
       "Plaine abyssale, talus continental, plateau continental, dorsale médio-océanique",
       "Plateau continental, plaine abyssale, talus continental, dorsale médio-océanique"],
      "À partir du rivage, le continent se prolonge sous une eau peu profonde en plateau continental. Le plancher descend ensuite abruptement le long du talus continental jusqu'à la vaste plaine abyssale plate, et la dorsale médio-océanique s'élève au-delà.",
      {});
  }
]), ["Imagine le profil : plateau doux, descente abrupte, plancher profond plat, puis la dorsale s'élève.", "Le plateau vient en premier parce que c'est le bord du continent lui-même."]);

/* ---------- SC8.1.6 Les courants, les vents et les climats régionaux ---------- */

E("s8f-u1-currents", 1, ["SC8.1.6"], 1, "gen", function () {
  var cases = [
    { q: "Quelle description convient au courant du Labrador?", k: "Un courant froid qui coule vers le sud le long de Terre-Neuve-et-Labrador", w: ["Un courant froid qui coule vers le nord le long de la Floride", "Un courant chaud qui coule vers le nord le long de Terre-Neuve-et-Labrador", "Un courant chaud qui coule vers le sud à partir du golfe du Mexique"] },
    { q: "Quelle description convient au Gulf Stream?", k: "Un courant chaud qui coule vers le nord à partir du golfe du Mexique le long de la côte est", w: ["Un courant froid qui coule vers le sud à partir de l'Arctique", "Un courant chaud qui coule vers le sud le long du Labrador", "Un courant froid qui coule vers le nord le long de la côte ouest"] },
    { q: "L'équipage d'un navire veut savoir quel courant transporte les icebergs vers le sud le long de Terre-Neuve chaque printemps. Quel courant est-ce?", k: "Le courant du Labrador", w: ["Le Gulf Stream", "La dérive nord-atlantique seulement", "La thermocline"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Deux courants dominent l'océan de cette province. Le courant du Labrador transporte l'eau froide de l'Arctique vers le sud le long du Labrador et de Terre-Neuve, avec les icebergs. Le Gulf Stream transporte l'eau chaude vers le nord à partir du golfe du Mexique le long de la côte est de l'Amérique du Nord.",
    {});
}, ["L'eau froide vient du nord : c'est le courant du Labrador. L'eau chaude vient du sud : le Gulf Stream.", "Les icebergs voyagent avec le courant froid."]);

E("s8f-u1-fog", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Les côtes de Terre-Neuve sont réputées pour leur brouillard épais. Qu'est-ce qui le produit?",
      "L'air chaud et humide transporté par le Gulf Stream passe au-dessus de l'eau froide du courant du Labrador et se condense",
      ["L'air froid et sec du courant du Labrador se mélange à l'eau froide au large et se transforme en bancs de brouillard",
       "L'eau chaude du Gulf Stream s'évapore directement en un brouillard qui reste suspendu au-dessus des Grands Bancs",
       "L'air froid descend au-dessus du Gulf Stream chaud et forme une couche de nuages juste à la surface de l'eau"],
      "Le brouillard se forme quand l'air chaud et humide au-dessus du Gulf Stream se déplace au-dessus de l'eau de surface beaucoup plus froide du courant du Labrador. L'air se refroidit, sa vapeur d'eau se condense en minuscules gouttelettes, et le brouillard en résulte. La rencontre des deux courants explique pourquoi cette province est si brumeuse.",
      {});
  }
]), ["Le brouillard est une condensation à la surface. Quelle masse d'air transporte l'humidité, et qu'est-ce qui la refroidit?", "Un air chaud et humide plus une surface froide donnent du brouillard."]);

E("s8f-u1-nino-nina", 1, ["SC8.1.6"], 2, "gen", function () {
  var cases = [
    { q: "Pendant un épisode El Niño, qu'arrive-t-il aux alizés et à l'océan de surface dans le Pacifique?", k: "Les alizés diminuent et l'océan de surface se réchauffe", w: ["Les alizés diminuent et l'océan de surface se refroidit", "Les alizés augmentent et l'océan de surface se refroidit", "Les alizés augmentent et l'océan de surface se réchauffe"] },
    { q: "Pendant un épisode La Niña, qu'arrive-t-il aux alizés et à l'océan de surface dans le Pacifique?", k: "Les alizés augmentent et l'océan de surface se refroidit", w: ["Les alizés diminuent et l'océan de surface se refroidit", "Les alizés diminuent et l'océan de surface se réchauffe", "Les alizés augmentent et l'océan de surface se réchauffe"] },
    { q: "Un rapport indique que les alizés du Pacifique ont faibli et que ses eaux de surface sont plus chaudes que d'habitude cette année. Quel épisode est décrit?", k: "El Niño", w: ["La Niña", "Une marée de morte-eau", "La remontée d'eaux froides"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "La distinction entre les deux épisodes se fait par les alizés. Pendant El Niño, les alizés diminuent et l'océan se réchauffe. Pendant La Niña, les alizés augmentent et l'océan se refroidit. Le changement de vent vient en premier dans chaque définition.",
    {});
}, ["Accroche-toi aux vents : des vents plus faibles vont avec le réchauffement, des vents plus forts avec le refroidissement.", "El Niño : les vents diminuent, l'océan se réchauffe. La Niña est l'inverse."]);

E("s8f-u1-cr-coastal-climate", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return textq("Une ville côtière et une ville de l'intérieur se trouvent à la même latitude. En janvier, la ville côtière affiche en moyenne moins 4 degrés Celsius tandis que la ville de l'intérieur affiche moins 14 degrés Celsius, et en juillet la ville côtière est la plus fraîche des deux. Explique le rôle de l'océan dans ce régime. (3 points)",
      ["l'océan emmagasine la chaleur parce que l'eau se réchauffe et se refroidit lentement", "la chaleur emmagasinée est libérée en hiver et l'océan reste frais en été", "les courants et les vents déplacent l'air tempéré au-dessus de la côte"],
      "<b>Réponse modèle :</b> L'eau se réchauffe et se refroidit très lentement, donc l'océan emmagasine une grande quantité de chaleur. Pendant l'hiver, l'océan cède graduellement sa chaleur emmagasinée, ce qui réchauffe l'air au-dessus de la côte, tandis que la ville de l'intérieur, sans une telle réserve à côté d'elle, devient beaucoup plus froide. En été, l'océan est encore frais de l'hiver et maintient la température de la ville côtière plus basse. Des courants comme le Gulf Stream chaud ajoutent de la chaleur à l'eau au large, et les vents et la convection transportent l'air tempéré par l'océan au-dessus de la ville côtière.<br><br><b>Points d'attribution :</b> 1 point pour le réchauffement et le refroidissement lents de l'eau (l'emmagasinage de la chaleur). 1 point pour la chaleur emmagasinée qui tempère l'hiver (et l'océan frais qui tempère l'été). 1 point pour un mécanisme de transport : les courants qui fournissent la chaleur, ou les vents et la convection qui déplacent l'air tempéré vers la côte.",
      {});
  }
]), ["Le régime fonctionne dans les deux sens : plus chaud en hiver, plus frais en été. Une seule propriété de l'eau explique les deux.", "Pense à l'océan comme un appareil de chauffage et de refroidissement très lent à côté de la ville."]);

E("s8f-u1-iceberg", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return mcq("Chaque printemps, les excursionnistes au large de St. John's annoncent l'observation des icebergs à mesure que les glaces dérivent vers le sud le long de la péninsule d'Avalon. Un élève affirme que le Gulf Stream amène les icebergs. Quelle correction est juste, et pourquoi compte-t-elle pour la saison des excursions?",
      "Le courant froid du Labrador transporte les icebergs vers le sud à partir du Groenland; cela compte parce que les icebergs arrivent à mesure que le courant les transporte le long de la côte au printemps",
      ["Le Gulf Stream amène bien les icebergs vers le sud, et cela compte parce que son eau chaude les fait fondre rapidement une fois qu'ils atteignent la côte",
       "Le courant du Labrador transporte les icebergs vers le nord à partir de l'Antarctique; cela compte parce qu'ils arrivent au large de la côte à l'automne plutôt",
       "Aucun courant n'est en cause; les icebergs dérivent vers le sud avec les marées seulement, ce qui explique pourquoi la saison d'observation reste si courte chaque année"],
      "Les icebergs se détachent des glaciers du Groenland dans le courant froid du Labrador, qui coule vers le sud le long du Labrador et de Terre-Neuve en les transportant. Le Gulf Stream chaud coule dans l'autre direction et ferait fondre les icebergs au lieu de les livrer. La saison d'observation suit la livraison printanière du courant froid.",
      {});
  }
]), ["Les icebergs viennent du Groenland, au nord. Quel courant coule vers le sud à partir de là?", "Un courant chaud serait un problème pour un iceberg, et non un service de livraison."]);

/* ---------- SC8.1.7 Les vagues et les marées ---------- */

E("s8f-u1-wave-energy", 1, ["SC8.1.7"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre une vague d'eau. D'où vient l'énergie des vagues de surface de l'océan?",
      "De l'air en mouvement : le vent transfère son énergie à la surface de l'eau",
      ["De l'attraction gravitationnelle de la Lune",
       "Des tremblements de terre sous le plancher océanique",
       "Des courants océaniques qui coulent sous la surface"],
      "Une vague à la surface de l'eau est de l'eau en mouvement qui transfère de l'énergie. Les vagues ordinaires de l'océan sont produites principalement par le vent : l'air en mouvement transfère son énergie à travers la surface de l'eau. L'attraction de la Lune produit plutôt les marées, et les tremblements de terre sous-marins produisent le cas exceptionnel, les tsunamis.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la crête de la vague?",
      "A",
      ["B", "C", "D"],
      "La crête est le sommet de la vague, marquée A. B se trouve dans le creux, le point le plus bas, C couvre la longueur d'onde, la distance d'une crête à la suivante, et D couvre la hauteur de la vague, du niveau de la crête jusqu'au niveau du creux.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la longueur d'onde?",
      "C",
      ["A", "B", "D"],
      "La longueur d'onde est la distance entre deux crêtes voisines, couverte par C. A marque une seule crête, B se trouve dans un creux, et D couvre la hauteur de la vague.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("Dans le schéma de la vague, quelle lettre marque la hauteur de la vague?",
      "D",
      ["A", "B", "C"],
      "La hauteur de la vague est la distance verticale du niveau du creux au niveau de la crête, couverte par D. A marque une seule crête, B se trouve dans un creux, et C couvre la longueur d'onde horizontalement.",
      {});
    q.figure = S8F_WAVE_SVG;
    return q;
  }
]), ["Les vagues ordinaires sont poussées par le vent. Les marées sont le mouvement poussé par la Lune.", "La crête est le point haut; la longueur d'onde va d'une crête à l'autre; la hauteur va de la crête au creux."]);

E("s8f-u1-tides", 1, ["SC8.1.7"], 1, "gen", function () {
  var cases = [
    { q: "La Terre, la Lune et le Soleil sont alignés. Qu'arrive-t-il à l'amplitude de la marée?", k: "Elle est à son maximum : ce sont les marées de vive-eau", w: ["Elle est à son minimum : ce sont les marées de vive-eau", "Elle est à son maximum : ce sont les marées de morte-eau", "Elle ne change pas : l'alignement n'influe pas sur les marées"] },
    { q: "Le Soleil, la Lune et la Terre forment un angle droit. Qu'arrive-t-il à l'amplitude de la marée?", k: "Elle est à son minimum : ce sont les marées de morte-eau", w: ["Elle est à son maximum : ce sont les marées de morte-eau", "Elle est à son minimum : ce sont les marées de vive-eau", "Elle ne change pas : les angles droits annulent les marées"] },
    { q: "L'équipage d'un bateau de pêche veut la plus grande amplitude de marée possible pour que son bateau puisse franchir un haut-fond peu profond. Quand devrait-il prévoir de partir?", k: "Pendant les marées de vive-eau, quand la Terre, la Lune et le Soleil sont alignés", w: ["Pendant les marées de morte-eau, quand le Soleil et la Lune forment un angle droit avec la Terre", "À n'importe quel moment, parce que l'amplitude de la marée ne change pas au cours du mois", "Seulement pendant un épisode El Niño"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les marées sont produites par l'attraction gravitationnelle de la Lune, à laquelle le Soleil ajoute une attraction moindre. Quand la Terre, la Lune et le Soleil sont alignés, les attractions s'additionnent et l'amplitude de la marée est à son maximum : les marées de vive-eau. Quand le Soleil et la Lune sont à angle droit par rapport à la Terre, les attractions s'annulent en partie et l'amplitude est à son minimum : les marées de morte-eau. Chacune se produit deux fois par mois.",
    {});
}, ["Alignés veut dire que les attractions s'additionnent. Angle droit veut dire qu'elles s'annulent en partie.", "Les marées de vive-eau ont la plus grande amplitude; les marées de morte-eau, la plus petite."]);

E("s8f-u1-tidal-range", 1, ["SC8.1.7"], 2, "gen", function () {
  var hi = pick([5.5, 6, 7.5, 8, 9.5, 11, 12.5, 14]);
  var lo = pick([0.5, 1, 1.5, 2]);
  var range = Math.round((hi - lo) * 10) / 10;
  function fmt(v) { return (Math.round(v * 10) / 10) + " m"; }
  var cand = [range + 2, hi, hi + lo, range * 2, Math.max(0.5, range - 1.5), range + 0.5];
  var dis = [];
  for (var ci = 0; ci < cand.length && dis.length < 3; ci++) {
    var cv = Math.round(cand[ci] * 10) / 10;
    if (cv !== range && dis.indexOf(cv) < 0) dis.push(cv);
  }
  return mcq("Dans un port, la marée haute est mesurée à " + hi + " m et la marée basse suivante à " + lo + " m. Quelle est l'amplitude de la marée?",
    fmt(range),
    dis.map(fmt),
    "L'amplitude de la marée est la différence entre la marée haute et la marée basse : " + hi + " m moins " + lo + " m égale " + range + " m. De grandes amplitudes comme celle-ci expliquent pourquoi des ports comme ceux de la baie de Fundy exigent une planification soigneuse des horaires.",
    {});
}, ["L'amplitude de la marée est une différence : marée haute moins marée basse.", "Soustrais la mesure de la marée basse de la mesure de la marée haute."]);

E("s8f-u1-cr-tides", 1, ["SC8.1.7"], 2, "var", varset([
  function () {
    return textq("Explique pourquoi les marées de vive-eau ont une plus grande amplitude que les marées de morte-eau, en faisant référence aux positions de la Terre, de la Lune et du Soleil dans chaque cas. (3 points)",
      ["les marées sont produites par l'attraction gravitationnelle de la Lune", "pendant les marées de vive-eau, les trois corps sont alignés et les attractions s'additionnent", "pendant les marées de morte-eau, le Soleil et la Lune sont à angle droit et les attractions s'annulent en partie"],
      "<b>Réponse modèle :</b> Les marées sont produites principalement par l'attraction gravitationnelle de la Lune sur les océans de la Terre, le Soleil ajoutant une attraction moindre qui lui est propre. Pendant les marées de vive-eau, la Terre, la Lune et le Soleil sont alignés, donc l'attraction du Soleil renforce celle de la Lune et l'amplitude de la marée est à son maximum. Pendant les marées de morte-eau, le Soleil et la Lune sont à angle droit vus de la Terre, donc leurs attractions agissent l'une contre l'autre et l'amplitude est à son minimum. Les deux se produisent deux fois par mois.<br><br><b>Points d'attribution :</b> 1 point pour les marées causées par l'attraction gravitationnelle de la Lune (et celle du Soleil, moindre). 1 point pour les positions alignées des marées de vive-eau et les attractions qui s'additionnent. 1 point pour les positions à angle droit des marées de morte-eau et les attractions qui s'annulent en partie.",
      {});
  }
]), ["Commence par ce qui cause les marées en général, puis compare les deux dispositions des trois corps.", "Même cause, deux géométries : alignés, ou à angle droit."]);

E("s8f-u1-wave-size", 1, ["SC8.1.7"], 3, "var", varset([
  function () {
    return mcq("On compare trois tempêtes. Tempête 1 : un vent fort pendant deux heures sur une petite baie. Tempête 2 : le même vent pendant deux jours sur une petite baie. Tempête 3 : le même vent pendant deux jours sur un vaste océan. Quelle tempête produit les plus grandes vagues, et pourquoi?",
      "La tempête 3, parce que la taille des vagues augmente avec la vitesse du vent, avec la durée pendant laquelle le vent souffle, et avec la taille de la superficie d'eau qu'il traverse",
      ["La tempête 1, parce qu'une petite baie concentre l'énergie du vent dans une plus petite superficie d'eau et y fait grossir les vagues",
       "La tempête 2, parce que la durée pendant laquelle le vent souffle est le seul facteur qui influe sur la taille des vagues qu'une tempête produit",
       "Les trois tempêtes également, parce que la vitesse du vent est exactement la même dans chacune des trois tempêtes comparées ici"],
      "La taille des vagues dépend de trois choses ensemble : la vitesse du vent, la durée pendant laquelle il souffle, et la taille de la superficie d'eau qu'il traverse. La tempête 3 égale la tempête 2 en vitesse et en durée et ajoute une superficie d'eau bien plus grande, donc ses vagues grossissent le plus avant que leur énergie atteigne un rivage.",
      {});
  }
]), ["Trois facteurs construisent une vague. Vérifie quelle tempête a les trois de son côté.", "La vitesse, la durée, et la distance d'eau libre que le vent traverse."]);

/* ---------- SC8.1.8 L'érosion et la formation de dépôts aux rivages ---------- */

E("s8f-u1-slope", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Le long d'un même tronçon de côte, une plage en pente douce gagne du sable tandis qu'un rivage de falaise abrupte voisin s'effrite dans la mer. Quel énoncé explique la différence?",
      "La formation de dépôts se produit sur les rivages à pente faible, tandis que l'érosion domine sur les pentes plus abruptes",
      ["La formation de dépôts se produit sur les pentes abruptes, tandis que l'érosion domine sur les pentes faibles",
       "La pente ne fait aucune différence; seul le type de roche compte",
       "Les deux rivages s'érodent; la formation de dépôts n'ajoute jamais de matière à un rivage"],
      "L'énergie des vagues érode et dépose. Sur les rivages à pente faible, les vagues perdent leur énergie et laissent tomber les sédiments qu'elles transportent : la formation de dépôts. Sur les pentes abruptes, l'énergie des vagues reste concentrée et arrache la matière : l'érosion. La pente est l'un des facteurs, avec la forme du rivage, le type de roche et l'énergie des vagues, qui décident quel processus l'emporte.",
      {});
  }
]), ["Gagner du sable veut dire formation de dépôts; s'effriter veut dire érosion. Associe chacun à sa pente.", "Les pentes douces laissent les vagues déposer leur charge."]);

E("s8f-u1-headland-energy", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return mcq("Les vagues qui approchent d'une côte faite de caps et de baies ne la frappent pas uniformément. Où l'énergie des vagues se concentre-t-elle, et qu'en découle-t-il?",
      "L'énergie se concentre sur les caps, donc ils s'érodent le plus vite, tandis que l'énergie s'étale dans les baies, où la formation de dépôts construit les plages",
      ["L'énergie se concentre dans les baies, donc elles s'érodent le plus vite, tandis que les caps reçoivent une énergie étalée et gagnent des dépôts",
       "L'énergie est égale partout, donc les caps et les baies changent au même rythme",
       "L'énergie se concentre sur les caps, donc le sable s'y dépose et les caps grandissent"],
      "À mesure que les vagues se courbent vers une côte, leur énergie se concentre sur les caps qui avancent dans l'eau et s'étale en atteignant les baies. L'énergie concentrée érode les caps; l'énergie étalée dans les baies laisse tomber les sédiments et construit les plages. C'est pourquoi les caps reculent pendant que les baies se remplissent.",
      {});
  }
]), ["Un cap avance dans l'eau et rencontre les vagues en premier. Qu'est-ce que cela fait à l'énergie qu'il reçoit?", "Une énergie concentrée érode; une énergie étalée dépose."]);

E("s8f-u1-rock-resistance", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Les roches rouges de St. George's s'usent sensiblement plus vite que les falaises de l'île Bell dans la baie Conception. Que montre cette comparaison?",
      "Les types de roches moins résistants s'érodent plus vite que les types de roches plus résistants sous la même action des vagues",
      ["La roche rouge s'érode toujours plus vite que la roche grise, quel que soit le type de roche réel ou sa résistance aux vagues",
       "Le type de roche ne fait aucune différence dans les taux d'érosion; seule l'énergie des vagues qui frappent le rivage compte",
       "Les falaises s'érodent lentement seulement parce qu'elles sont plus hautes que les autres rivages le long du même tronçon de côte"],
      "La comparaison même du contenu : une roche moins résistante, comme le grès de St. George's, s'érode plus vite qu'une roche plus résistante, comme les falaises de l'île Bell. Le type de roche est l'un des facteurs qui déterminent la vitesse à laquelle un rivage change, avec la pente, la forme et l'énergie des vagues.",
      {});
  }
]), ["Les deux rivages font face à l'action des vagues. La différence nommée dans la question est la roche elle-même.", "La résistance est la propriété de la roche qui compte ici."]);

E("s8f-u1-cr-headland", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return textq("Un cap de roche résistante avance dans l'océan entre deux baies sablonneuses. Au fil de nombreuses années, le cap développe des fissures, une grotte, puis éventuellement une arche, tandis que les baies gagnent des plages plus larges. Explique les deux changements, en faisant référence à l'énergie des vagues. (3 points)",
      ["l'énergie des vagues se concentre sur le cap", "l'énergie concentrée érode la roche et creuse des grottes et des arches", "l'énergie s'étale dans les baies, donc les sédiments s'y déposent"],
      "<b>Réponse modèle :</b> Les vagues se courbent en approchant de la côte, et leur énergie se concentre sur le cap qui avance à leur rencontre. Cette énergie concentrée érode la roche, s'infiltre dans les fissures et creuse des grottes; là où une grotte traverse le cap, une arche se forme, et l'érosion continue finit par laisser un empilement. Dans les baies, la même énergie des vagues s'étale sur un front plus large, perd de sa force et ne peut plus transporter ses sédiments, donc les sédiments se déposent et les plages grandissent.<br><br><b>Points d'attribution :</b> 1 point pour l'énergie des vagues concentrée sur le cap. 1 point pour l'érosion du cap qui produit la suite grotte et arche. 1 point pour l'énergie qui s'étale dans les baies et y dépose les sédiments.",
      {});
  }
]), ["Une côte, deux histoires d'énergie : concentrée sur le cap, étalée dans les baies.", "L'érosion exige une énergie concentrée; la formation de dépôts se produit là où l'énergie se perd."]);

/* ---------- SC8.1.9 Les formes de relief ---------- */

E("s8f-u1-landform-figure", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque une arche marine?",
      "B",
      ["A", "C", "D"],
      "Les formes de relief montrent la suite de l'érosion. A est une grotte marine, creusée dans le cap. B est une arche marine, là où l'érosion a traversé le cap. C est un empilement, un pilier laissé debout quand une arche s'effondre, et D est la souche basse qui reste à mesure qu'un empilement s'use.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque un empilement?",
      "C",
      ["A", "B", "D"],
      "Un empilement est le pilier de roche isolé laissé quand une arche marine s'effondre, marqué C. A est une grotte marine, B est une arche marine encore reliée au cap, et D est la souche usée d'un empilement plus ancien.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("Le schéma montre un rivage avec plusieurs formes de relief. Quelle lettre marque une grotte marine?",
      "A",
      ["B", "C", "D"],
      "Une grotte marine est le creux usé à la base du cap, marqué A. B est une arche marine, C un empilement, et D une souche : les étapes suivantes de la même suite d'érosion.",
      {});
    q.figure = S8F_LANDFORM_SVG;
    return q;
  }
]), ["Suis la suite : la grotte d'abord, puis l'arche qui traverse, puis l'empilement debout.", "Chaque forme de relief est une étape du cap qui s'use."]);

E("s8f-u1-landform-formation", 1, ["SC8.1.9"], 2, "gen", function () {
  var cases = [
    { q: "Comment se forme une barre de sable?", k: "Les vagues et les courants déposent du sable en eau peu profonde et construisent une crête de sédiments", w: ["Les vagues érodent un cap jusqu'à ce qu'une crête de roche solide reste debout dans l'eau", "Une grotte traverse un cap et le toit s'effondre dans l'eau en dessous", "Le vent souffle le sable sec de la plage en de gros tas au-dessus de la ligne de marée haute sur le rivage"] },
    { q: "Comment une plage se forme-t-elle et grandit-elle?", k: "Formation de dépôts : les vagues déposent le sable et les sédiments le long d'un rivage en pente douce plus vite qu'elles ne les retirent", w: ["Érosion : les vagues arrachent le sable du rivage et l'entassent en une crête à la ligne d'eau", "Formation de dépôts : les glaciers laissent le sable et les sédiments derrière eux en reculant lentement de la côte", "Altération : la roche se brise sur place et les morceaux brisés restent entassés là où ils sont tombés"] },
    { q: "Comment se forme un haut-fond?", k: "Les sédiments déposés en eau peu profonde construisent une zone qui présente un danger pour les bateaux", w: ["Un empilement s'effondre et ses débris s'étalent à travers l'entrée peu profonde du port", "Les marées creusent un chenal profond dans le port qui se remplit de sédiments à marée basse", "L'action des volcans soulève une nouvelle crête sur le plancher océanique près du rivage"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les plages, les hauts-fonds et les barres de sable sont des formes de relief de dépôts : elles existent parce que les vagues et les courants ont déposé des sédiments en eau peu profonde. Les grottes marines, les arches et les empilements forment la famille de l'érosion. Classer une forme de relief dans sa famille est la première étape pour l'expliquer.",
    {});
}, ["Demande-toi si la matière est déposée ou arrachée.", "Les formes de sable sont construites par la formation de dépôts."]);

E("s8f-u1-erosion-deposition", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    return mcq("Quelle liste contient seulement des formes de relief construites par la formation de dépôts?",
      "Plage, haut-fond, barre de sable",
      ["Plage, arche marine, barre de sable",
       "Grotte marine, arche marine, empilement",
       "Haut-fond, empilement, barre de sable"],
      "Les plages, les hauts-fonds et les barres de sable sont tous construits là où les vagues et les courants déposent des sédiments. Les grottes marines, les arches marines et les empilements sont creusés par l'érosion. Les deux familles forment le classement de base des formes de relief des rivages.",
      {});
  }
]), ["Trois des six formes de relief nommées sont déposées; trois sont érodées. Trouve la liste entièrement de dépôts.", "Les grottes, les arches et les empilements sont creusés dans la roche : l'érosion."]);

/* ---------- SC8.1.10 Les courants, les vents et les climats régionaux (scénarios distincts) ---------- */

E("s8f-u1-climate-current-effect", 1, ["SC8.1.10"], 2, "var", varset([
  function () {
    return mcq("Deux villes portuaires se trouvent à la même latitude. Au large de l'une passe un courant chaud; au large de l'autre passe un courant froid. Toutes choses égales par ailleurs, quelle prévision est la mieux appuyée?",
      "La ville au courant chaud aura un climat plus doux que la ville au courant froid, parce que le courant réchauffe l'air qui passe au-dessus de lui",
      ["La ville au courant froid aura un climat plus doux que la ville au courant chaud, parce que l'eau froide emmagasine plus de chaleur que l'eau chaude",
       "Les deux villes auront exactement le même climat, parce que les courants océaniques n'ont aucune interaction avec les vents ni avec l'air",
       "La ville au courant chaud sera plus sèche dans toutes les saisons, parce qu'un courant chaud empêche toujours la formation de nuages au-dessus de lui"],
      "Les courants océaniques transportent la chaleur avec l'eau. Un courant chaud réchauffe l'air au-dessus de lui, et les vents transportent cet air tempéré vers la côte, ce qui adoucit le climat régional. Un courant froid refroidit l'air au-dessus de lui et produit l'effet contraire le long de sa côte.",
      {});
  }
]), ["Un courant est de l'eau en mouvement qui transporte sa température avec elle. Que fait-il à l'air au-dessus?", "Les vents complètent le travail en transportant l'air tempéré vers les terres."]);

E("s8f-u1-climate-claim-judge", 1, ["SC8.1.10"], 3, "var", varset([
  function () {
    return mcq("Un élève écrit : « Les climats régionaux sont déterminés seulement par la latitude. Les courants océaniques et les vents ne changent rien, parce que l'eau et l'air ne se mélangent jamais. » Quelle évaluation de cet énoncé est correcte?",
      "L'énoncé est faux : les courants transportent l'eau chaude et l'eau froide vers de nouvelles régions, les vents déplacent l'air tempéré par l'océan au-dessus des terres, et les deux ensemble modifient les climats régionaux",
      ["L'énoncé est juste : la latitude fixe chaque climat régional à elle seule, et ni les courants ni les vents ne peuvent modifier la température d'une région côtière, quelle que soit la chaleur que l'eau transporte avec elle",
       "L'énoncé est faux seulement parce que l'eau et l'air se mélangent directement à la surface; les courants eux-mêmes ne transportent aucune chaleur d'une région à l'autre, et les vents ne déplacent jamais l'air tempéré vers les terres",
       "L'énoncé est juste pour les côtes et faux pour l'intérieur des terres, parce que les courants océaniques tempèrent seulement les climats des îles éloignées et ne changent rien aux régions côtières des continents, même tout près d'eux"],
      "La latitude fixe l'ensoleillement de base, mais les interactions entre les courants, les vents et l'air modifient le résultat régional. Les courants transportent la chaleur, l'eau froide et même les icebergs sur de grandes distances, et les vents et la convection déplacent l'air que l'océan a tempéré au-dessus des terres voisines. C'est cette interaction qui explique des contrastes comme le brouillard de Terre-Neuve et ses hivers côtiers plus doux.",
      {});
  }
]), ["Vérifie les deux affirmations de l'élève : « seulement la latitude » et « jamais d'interaction ».", "Un seul contre-exemple solide suffit à faire tomber un « seulement » ou un « jamais »."]);

/* ---------- SC8.2.1 Les organisations de recherche sur les océans ---------- */

E("s8f-u1-institutions", 1, ["SC8.2.1"], 1, "gen", function () {
  var cases = [
    { q: "Un élève fait une recherche sur les systèmes météorologiques au-dessus de l'Atlantique. Le travail de quelle organisation canadienne est le plus directement lié à la météo?", k: "Environnement Canada", w: ["Le centre C-CORE", "Les sciences océaniques", "Les Pêches fédérales"] },
    { q: "Un élève veut en apprendre sur la recherche en ingénierie des océans froids, par exemple comment les structures résistent aux icebergs. Quelle organisation convient le mieux?", k: "C-CORE, le Centre de recherche sur les océans froids à l'Université Memorial", w: ["Environnement Canada, le ministère fédéral de la météo et du climat", "Le ministère fédéral des Pêches et des Océans, responsable des pêches", "Le Centre des sciences océaniques de l'Université Memorial à St. John's"] },
    { q: "Un élève étudie la science des stocks de poissons et des écosystèmes océaniques. Quelle organisation convient le mieux?", k: "Le Centre des sciences océaniques à l'Université Memorial", w: ["C-CORE, le centre d'ingénierie des océans froids de Memorial", "Environnement Canada, le ministère fédéral de la météo", "Un office provincial du tourisme de Terre-Neuve-et-Labrador"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Le Canada soutient la recherche sur les océans par des organisations publiques et privées, dont Environnement Canada (la météo), le ministère fédéral des Pêches, et à l'Université Memorial le Centre des sciences océaniques, son Département d'océanographie, l'Institut maritime des pêches, et C-CORE pour la recherche sur les océans froids. L'essentiel est de savoir que ces organisations existent et ce qu'elles font en gros.",
    {});
}, ["Associe l'organisation à son grand domaine : la météo, les pêches et la science des océans, ou l'ingénierie des océans froids.", "Le nom de C-CORE porte son domaine : la recherche sur les océans froids."]);

E("s8f-u1-institution-focus", 1, ["SC8.2.1"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé sur les organisations canadiennes de recherche sur les océans est correct?",
      "Des organisations comme Environnement Canada, le ministère fédéral des Pêches et le Centre des sciences océaniques de l'Université Memorial soutiennent toutes la recherche qui touche les océans",
      ["Seules les universités mènent la recherche sur les océans au Canada, et aucun ministère à aucun niveau ne prend part au travail, dans aucune région du pays",
       "La recherche sur les océans au Canada est menée entièrement par des entreprises privées de pêche sur les côtes de l'Atlantique et du Pacifique, sans aucun autre organisme en cause",
       "Les organisations existent et emploient beaucoup de scientifiques, mais elles n'étudient que les lacs et les rivières d'eau douce du Canada et jamais les océans autour de ses côtes"],
      "La recherche sur les océans au Canada est partagée entre des ministères et des centres universitaires. Environnement Canada s'occupe de la météo, le ministère fédéral des Pêches des pêches et des océans, et le Centre des sciences océaniques, C-CORE et l'Institut maritime de l'Université Memorial étudient l'océan à partir de St. John's. L'essentiel est de savoir que ces organisations existent et soutiennent la recherche sur les océans.",
      {});
  }
]), ["L'idée centrale est la sensibilisation : ces organisations existent et étudient les océans.", "Des organisations gouvernementales et universitaires figurent toutes deux sur la liste."]);

/* ---------- SC8.2.2 Les technologies d'étude des bassins océaniques ---------- */

E("s8f-u1-tech", 1, ["SC8.2.2"], 1, "gen", function () {
  var cases = [
    { q: "Des scientifiques cartographient la forme du plancher océanique en envoyant des impulsions sonores vers le bas et en chronométrant leurs échos. Quelle technologie est-ce?", k: "Le sonar", w: ["La plongée", "Les satellites", "La photographie sous-marine"] },
    { q: "Des scientifiques veulent observer l'épave du Titanic et prélever des échantillons autour d'elle, bien plus profondément qu'un plongeur ne peut descendre. Quelle technologie convient?", k: "Un submersible océanique", w: ["Un satellite", "La plongée en scaphandre autonome", "Le sonar seulement"] },
    { q: "Des scientifiques suivent les conditions générales de la surface de l'océan, comme les courants et les systèmes de tempêtes, sur tout l'Atlantique à la fois. Quelle technologie convient le mieux?", k: "Les satellites", w: ["Les submersibles océaniques", "La plongée", "La photographie sous-marine"] },
    { q: "Des scientifiques veulent des enregistrements visuels rapprochés des organismes qui vivent sur un récif peu profond. Quelle technologie convient le mieux?", k: "La photographie et la vidéographie sous-marines", w: ["Un submersible océanique", "Les satellites", "Le sonar"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Une grande partie de ce que l'on sait des bassins océaniques vient d'observations indirectes recueillies par la technologie : le sonar cartographie le plancher avec le son, les satellites surveillent la surface en général, la photographie et la vidéographie sous-marines enregistrent ce qui s'y trouve, les submersibles transportent des personnes et des instruments en profondeur, et la plongée sert aux travaux peu profonds. Associer l'outil au travail est le contenu visé.",
    {});
}, ["Décide de ce dont les scientifiques ont besoin : une carte, une vue d'ensemble, des images, ou une visite en profondeur.", "Le son et les échos veulent dire le sonar."]);

E("s8f-u1-sonar", 1, ["SC8.2.2"], 1, "var", varset([
  function () {
    return mcq("Pourquoi le sonar est-il si utile pour étudier les bassins océaniques?",
      "Le son voyage dans l'eau et renvoie des échos du plancher, donc la forme du plancher peut être cartographiée sans la voir directement",
      ["Les caméras du sonar prennent des photographies nettes du plancher océanique même dans l'obscurité totale loin sous la surface",
       "Le sonar permet aux plongeurs de respirer en sécurité à n'importe quelle profondeur où ils choisissent de descendre en pleine mer",
       "Le sonar mesure directement la teneur en sel et la température de l'eau océanique profonde à mesure qu'elle passe"],
      "Le sonar fonctionne en envoyant des impulsions sonores dans l'eau et en chronométrant les échos qui reviennent du plancher océanique. À partir du chronométrage, les scientifiques construisent une image de la forme du bassin. C'est une observation indirecte : le plancher est cartographié sans que personne le voie, et c'est ainsi que se déroule la plus grande partie de la recherche sur les bassins.",
      {});
  }
]), ["Le sonar utilise le son. Que disent les échos qui reviennent aux scientifiques?", "Le temps des échos devient la profondeur, et les lectures de profondeur deviennent une carte."]);

E("s8f-u1-cr-indirect", 1, ["SC8.2.2"], 2, "var", varset([
  function () {
    return textq("Personne ne peut voir directement la plus grande partie du plancher océanique, et pourtant les scientifiques produisent des cartes détaillées des bassins océaniques et peuvent décrire des éléments comme les dorsales médio-océaniques et les fosses. Explique comment ces connaissances se construisent, en nommant deux technologies et ce que chacune apporte. (3 points)",
      ["le sonar cartographie le plancher au moyen des échos sonores", "les satellites, les submersibles ou la photographie ajoutent d'autres preuves", "les connaissances viennent d'observations indirectes combinées"],
      "<b>Réponse modèle :</b> Les connaissances sur les bassins océaniques se construisent à partir d'observations indirectes. Les navires qui utilisent le sonar envoient des impulsions sonores vers le bas et chronométrent les échos du plancher, et des milliers de ces lectures de profondeur sont combinées en une carte de la forme du bassin, révélant des éléments comme les dorsales médio-océaniques et les fosses. D'autres technologies ajoutent des preuves différentes : les satellites observent la surface de l'océan et ses conditions sur des bassins entiers à la fois, et les submersibles océaniques et la photographie sous-marine permettent aux scientifiques d'examiner et d'enregistrer des éléments précis de près. Mises ensemble, les preuves indirectes soutiennent des affirmations détaillées sur des endroits que personne ne peut visiter sans aide.<br><br><b>Points d'attribution :</b> 1 point pour le sonar expliqué comme des échos sonores qui donnent la profondeur et la forme. 1 point pour une deuxième technologie avec son apport (satellites, submersibles, photographie sous-marine ou plongée). 1 point pour avoir énoncé que les connaissances sont indirectes et construites en combinant les preuves.",
      {});
  }
]), ["Le casse-tête : des connaissances détaillées sur un endroit que personne ne peut voir. Quels outils fournissent les preuves?", "Le sonar est l'outil de cartographie. Ajoute une autre technologie et dis ce qu'elle ajoute."]);

/* ---------- SC8.2.3 L'amélioration des technologies du plancher océanique ---------- */

E("s8f-u1-tech-change", 1, ["SC8.2.3"], 2, "var", varset([
  function () {
    return mcq("Les premiers chercheurs sur les océans mesuraient la profondeur en laissant descendre un fil lesté par-dessus bord et en notant sa longueur quand il atteignait le fond. Les navires modernes utilisent le sonar à la place. Quelle est la principale amélioration?",
      "Le sonar produit un enregistrement continu de la profondeur à mesure que le navire avance, donc un profil entier de bassin peut être cartographié plutôt que des profondeurs isolées et dispersées",
      ["Le sonar ne fonctionne que dans l'eau côtière peu profonde près du rivage, là où les vieux fils lestés ne pouvaient jamais atteindre le fond sous le navire",
       "Le sonar supprime le besoin d'un navire dans les travaux de profondeur, parce que ses signaux peuvent être envoyés de la rive plutôt que d'un bâtiment",
       "Les fils lestés étaient bien plus précis que le sonar ne l'est jamais; le sonar est utilisé sur les navires aujourd'hui seulement parce qu'il est le moins coûteux des deux méthodes"],
      "Un fil lesté donne une profondeur à un endroit, lentement. Le sonar chronomètre les échos sonores en continu à mesure que le navire voyage, produisant un profil suivi du plancher. L'amélioration tient à la quantité et à la continuité des preuves, et c'est ce qui a transformé des sondages dispersés en cartes de bassins.",
      {});
  }
]), ["Compare ce que chaque méthode livre : un point à la fois, ou un enregistrement continu?", "Plus de preuves, recueillies plus vite : voilà le modèle d'amélioration dans ce volet."]);

E("s8f-u1-tech-improve", 1, ["SC8.2.3"], 1, "var", varset([
  function () {
    return mcq("Comment les submersibles océaniques ont-ils amélioré la plongée pour la recherche sur les océans?",
      "Les submersibles transportent les chercheurs et les instruments bien plus profondément et plus longtemps que le corps et la réserve d'air d'un plongeur ne le permettent",
      ["Les submersibles sont plus petits, plus simples et moins coûteux que l'équipement que les plongeurs doivent transporter avec eux",
       "Les submersibles ont remplacé le besoin de tout navire de surface pour soutenir le travail de recherche fait en dessous",
       "Les plongeurs peuvent maintenant rester en bas aussi longtemps que les submersibles, en utilisant l'équipement de plongée ordinaire"],
      "La plongée est limitée par le corps humain et sa réserve d'air, donc elle sert à l'eau peu profonde. Les submersibles océaniques protègent leurs équipages de la pression et transportent des instruments, ouvrant le plancher océanique profond à la recherche directe. Le modèle est le même pour tout cet indicateur : chaque génération de technologie étend où et combien de temps les scientifiques peuvent recueillir des preuves.",
      {});
  }
]), ["Qu'est-ce qui limite un plongeur? La profondeur et l'air. Que fait un submersible au sujet de ces limites?", "L'amélioration ici veut dire atteindre des endroits et des profondeurs qui étaient fermés auparavant."]);

/* ---------- SC8.2.4 Les technologies qui limitent les dommages des vagues et des marées ---------- */

E("s8f-u1-protection", 1, ["SC8.2.4"], 1, "gen", function () {
  var cases = [
    { q: "Un port construit un mur de roche dans l'eau, devant les quais, pour que les vagues qui arrivent s'y brisent et perdent leur énergie. Quelle est cette structure?", k: "Un brise-lames", w: ["Une jetée utilisée comme quai", "Un mur de protection construit le long de la plage", "La plantation de végétation"] },
    { q: "Une communauté plante des herbes et des arbustes le long de son rivage pour que leurs racines retiennent le sol contre le lavage des vagues. Quelle méthode de protection est-ce?", k: "La végétation", w: ["Un brise-lames", "Des rochers placés contre le quai", "Un mur de protection"] },
    { q: "Des ouvriers entassent de très gros rochers contre la face d'un quai pour absorber la force des vagues de tempête. Quelle méthode de protection est-ce?", k: "De gros rochers placés contre le quai", w: ["Un brise-lames", "La reconfiguration du littoral", "La végétation"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Les technologies conçues pour limiter les dommages causés par les vagues et les marées comprennent les brise-lames, les jetées et les quais, la végétation, les murs de protection, la reconfiguration du littoral, et de gros rochers placés contre les quais. Chacune brise l'énergie des vagues avant qu'elle arrive ou retient le rivage contre elle.",
    {});
}, ["Imagine où la structure se trouve : dans l'eau, le long du rivage, ou des racines vivantes dans le sol.", "Un brise-lames se tient au large et prend l'énergie de la vague en premier."]);

E("s8f-u1-protection-choice", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return mcq("Une ville doit protéger une plage qui est aussi une zone de nidification pour les oiseaux de rivage. Des ingénieurs comparent trois plans : un mur de protection en béton, un brise-lames en roche, et la restauration des herbes de dune qui couvraient autrefois la plage. Le conseil municipal demande quel plan semble le plus efficace pour limiter les dommages avec le moins d'impact sur l'écosystème présent. Quelle réponse est la mieux appuyée?",
      "Restaurer la végétation des dunes, parce que les racines vivantes retiennent le rivage et absorbent le lavage des vagues tout en laissant l'habitat en place",
      ["Le mur de protection en béton, parce que la structure la plus dure a toujours le moins d'impact sur l'environnement",
       "Le brise-lames en roche, parce que toute structure placée au large supprime le besoin de tenir compte de la plage elle-même",
       "Aucun d'eux, parce que toutes les méthodes de protection sont traitées comme également dommageables"],
      "L'activité de comparaison demande de déterminer quelle méthode semble la plus efficace avec le moins d'impact sur l'environnement des écosystèmes présents. La végétation retient le sol avec des racines vivantes, absorbe graduellement l'énergie des vagues et préserve l'habitat que les oiseaux utilisent. Les structures dures protègent les biens mais remplacent ou perturbent l'écosystème du rivage. Le jugement découle du fait de peser ensemble la protection et l'impact.",
      {});
  }
]), ["La question a deux critères : limite-t-elle les dommages, et qu'est-ce qu'elle fait à l'écosystème qui est là?", "Un rivage vivant peut faire les deux travaux; un mur échange l'habitat contre la dureté."]);

E("s8f-u1-cr-protect", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return textq("Une petite communauté côtière a un quai utilisé par les bateaux de pêche et un rivage bas en pente douce qui est inondé pendant les tempêtes d'hiver. Choisis une technologie de protection pour ce rivage et justifie ton choix : dis comment elle limite les dommages des vagues ou des marées, et nomme un inconvénient que la communauté devrait peser. (3 points)",
      ["une technologie nommée comme un brise-lames, un mur de protection, des rochers ou la végétation", "comment elle réduit l'énergie des vagues ou retient le rivage", "un inconvénient comme le coût, l'impact sur l'habitat ou l'entretien"],
      "<b>Réponse modèle :</b> Un brise-lames convient à ce rivage. Construit dans l'eau devant le quai, il force les vagues de tempête qui arrivent à se briser sur les roches et à y dépenser leur énergie, donc l'eau qui atteint le quai et le rivage bas est beaucoup plus calme et les inondations et les dommages sont réduits. L'inconvénient à peser est qu'un brise-lames coûte cher à construire et à entretenir, et qu'il change le mouvement de l'eau le long de ce rivage, ce qui peut déplacer l'endroit où les sédiments se déposent et toucher l'habitat du rivage voisin. (Un mur de protection, des rochers ou la végétation, justifiés selon le même modèle, méritent aussi tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour une technologie nommée qui convient. 1 point pour la façon dont elle limite les dommages (brise l'énergie des vagues, retient le rivage, ou absorbe le lavage). 1 point pour un véritable inconvénient pesé.",
      {});
  }
]), ["Associe la technologie à ce rivage : un quai de travail et une pente basse qui s'inonde.", "Une justification complète a trois parties : le choix, son fonctionnement, et son coût."]);

/* ---------- SC8.2.5 Les effets des technologies marines ---------- */

E("s8f-u1-overfishing", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Les stocks de poissons ont décliné brusquement pendant les décennies où les chalutiers-usines congélateurs se sont répandus dans la flotte. Quel énoncé convient le mieux au traitement de la technologie et de la surpêche?",
      "Les nouvelles technologies ont contribué à la surpêche : des navires plus grands, une meilleure technologie de repérage des poissons et des méthodes de capture plus efficaces permettent aux flottes de prendre les poissons plus vite que les stocks ne peuvent les remplacer",
      ["La technologie a réduit la surpêche, parce que les chalutiers congélateurs gaspillent moins de chaque prise, donc les flottes avaient besoin de prendre beaucoup moins de poissons pour approvisionner les mêmes marchés",
       "La surpêche a été causée seulement par le comportement des poissons eux-mêmes qui changeait, et non par un changement quelconque de la technologie de pêche",
       "Les chalutiers-usines congélateurs ont touché seulement les pêches d'eau douce des lacs et des rivières de l'intérieur du Canada"],
      "Le sujet se limite à l'impact de la technologie de pêche améliorée : les méthodes de capture, la technologie de repérage des poissons et le type de navire. Les chalutiers-usines congélateurs combinent les trois, capturant et transformant d'énormes quantités en mer, et cette capacité est un facteur reconnu du déclin de stocks comme la morue.",
      {});
  }
]), ["Le sujet ici est étroit : la technologie de pêche améliorée. Quel choix reste sur ce point?", "Des navires plus grands, un meilleur repérage, une meilleure capture : la capacité a grandi plus vite que les stocks."]);

E("s8f-u1-invasive", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Le crabe vert européen, une espèce qui n'est pas originaire de cette province, est maintenant établi dans la baie Placentia, et la tunicière violette est apparue à Belleoram. Quelle voie liée à la technologie explique le mieux des introductions comme celles-ci?",
      "Les pétroliers et d'autres navires rejettent l'eau de cale et de ballast qui transporte des organismes étrangers dans les habitats indigènes",
      ["Les cages d'aquaculture rejettent les poissons d'élevage dans la baie, et ces poissons échappés se transforment en crabes et en tunicières avec le temps",
       "Les chalutiers-usines congélateurs transportent les nouvelles espèces dans leurs filets en se déplaçant de port en port le long de la côte",
       "Les turbines marémotrices transportent les organismes par leurs passages d'une baie à une autre baie voisine"],
      "La voie est nommée directement : quand les pétroliers rejettent leur eau de cale, des espèces étrangères peuvent être introduites, mettant en danger les habitats et les organismes indigènes. Le crabe vert dans la baie Placentia et la tunicière violette à Belleoram en sont les exemples locaux.",
      {});
  }
]), ["Les espèces sont arrivées par une eau que les navires transportent et rejettent. Quelle eau est-ce?", "L'eau de cale et de ballast déplace les organismes autour du monde."]);

E("s8f-u1-aquaculture", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Les fermes de moules suspendent de longues lignes de moules en croissance dans une baie. Quel effet négatif sur le milieu marin est décrit pour ce genre d'aquaculture?",
      "Une matière organique accrue, appelée pluie de détritus, tombe des fermes et s'accumule sur le plancher marin",
      ["Les moules filtrent tellement d'eau en se nourrissant que la salinité de la baie monte brusquement en une seule année",
       "Les longues lignes bloquent les courants océaniques et changent le climat de toute la région autour de la baie",
       "Les fermes attirent les chalutiers-usines dans la baie, et les chalutiers surpêchent ensuite les stocks sauvages qui y vivent"],
      "Les effets de l'aquaculture comprennent la libération accidentelle d'organismes d'élevage dans les populations indigènes, la propagation de maladies, et, pour les fermes de moules en particulier, la pluie de détritus : une matière organique accrue qui tombe et s'accumule sur le plancher marin sous la ferme.",
      {});
  }
]), ["L'effet nommé pour les fermes de moules concerne ce qui tombe de la ferme au plancher.", "La pluie de détritus est le terme même utilisé pour le désigner."]);

E("s8f-u1-cr-tech-effects", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return textq("Choisis une technologie marine dans cette liste : chalutiers-usines congélateurs, plateformes de forage pétrolier au large, énergie marémotrice, ou aquaculture. Décris un effet positif et un effet négatif de cette technologie sur les espèces océaniques ou leur milieu, et énonce la balance telle que tu la vois. (3 points)",
      ["un effet positif lié à la technologie", "un effet négatif lié à la technologie", "une balance ou un jugement énoncé"],
      "<b>Réponse modèle :</b> Les plateformes de forage pétrolier au large. Du côté positif, la structure d'une plateforme agit comme un récif artificiel qui abrite les organismes marins, et l'industrie finance la surveillance de l'océan environnant. Du côté négatif, les déversements de pétrole peuvent tuer les oiseaux de mer et endommager les écosystèmes, le forage ravage le plancher océanique et détruit l'habitat marin, et les pétroliers qui desservent les plateformes peuvent introduire des espèces étrangères dans l'eau de cale. En balance, les effets négatifs portent plus loin et durent plus longtemps que l'avantage d'abri, donc la valeur de la technologie dépend d'une prévention stricte des déversements et des dommages à l'habitat. (Toute technologie de la liste, traitée selon le même modèle, mérite tous les points.)<br><br><b>Points d'attribution :</b> 1 point pour un effet positif véritablement lié à la technologie choisie. 1 point pour un effet négatif véritablement lié à elle. 1 point pour une balance énoncée qui découle des deux effets donnés.",
      {});
  }
]), ["Choisis la technologie dont tu peux dire le plus, puis garde les deux effets liés à elle.", "Le troisième point est pour la balance : dis quel côté pèse le plus, à partir de tes deux effets."]);

/* ---------- SC8.2.6 La science ne peut pas tout résoudre ---------- */

E("s8f-u1-sustain-aspects", 1, ["SC8.2.6"], 1, "var", varset([
  function () {
    return mcq("Une proposition d'expansion d'un champ pétrolifère au large est débattue. Un intervenant dit : « Elle apporterait des emplois bien payés à la région, mais un déversement pourrait tuer les oiseaux de mer et endommager l'écosystème pendant des années. » Quelle paire d'aspects du développement durable l'intervenant pèse-t-il?",
      "Économique (les emplois) contre environnemental (le tort aux oiseaux de mer et aux écosystèmes)",
      ["Environnemental (les emplois bien payés) contre économique (le tort causé aux oiseaux de mer)",
       "Social et culturel (les emplois) contre économique (les dommages aux écosystèmes marins)",
       "Scientifique (les emplois) contre technologique (le tort aux oiseaux de mer et aux écosystèmes)"],
      "Les décisions de développement durable pèsent trois aspects : environnemental, économique, et social et culturel. Les emplois sont un effet économique; le tort aux oiseaux de mer et aux écosystèmes est un effet environnemental. L'intervenant pèse exactement le genre de compromis décrit, où une décision satisfait rarement tous les aspects à la fois.",
      {});
  }
]), ["Classe les deux conséquences : les emplois appartiennent à un aspect, les oiseaux de mer à un autre.", "Les trois aspects sont environnemental, économique, et social et culturel."]);

E("s8f-u1-cr-decision", 1, ["SC8.2.6"], 3, "var", varset([
  function () {
    return textq("Une entreprise propose un nouveau développement d'aquaculture dans une baie qui soutient aussi une petite pêche côtière et une communauté qui valorise son mode de vie traditionnel. Présente la décision de la façon dont de telles décisions sont encadrées : donne un effet positif possible et un effet négatif possible, couvrant des aspects différents du développement durable, énonce ta recommandation, et explique pourquoi les connaissances scientifiques et technologiques à elles seules ne peuvent pas régler la question. (4 points)",
      ["un effet positif dans un aspect, comme les emplois économiques", "un effet négatif dans un autre aspect, comme l'environnemental ou le social et culturel", "une recommandation claire", "la science éclaire la décision, mais les valeurs et les compromis la décident"],
      "<b>Réponse modèle :</b> Positivement, le développement pourrait apporter des emplois et un revenu stables à la communauté (économique). Négativement, les poissons d'élevage échappés et les maladies pourraient nuire aux stocks sauvages dont dépend la pêche côtière, et une matière organique accrue pourrait s'accumuler sur le plancher de la baie (environnemental), tandis qu'une baie changée pourrait modifier le mode de vie traditionnel de la communauté (social et culturel). Ma recommandation est de permettre un développement plus petit avec un confinement et une surveillance stricts, parce que cela pèse les emplois contre des protections pour la pêche. Les connaissances scientifiques et technologiques peuvent mesurer les risques et concevoir les mesures de protection, mais elles ne peuvent pas décider quel risque pour la pêche et le mode de vie vaut les emplois : cette pesée des avantages et des inconvénients est une décision pour les parties concernées, et elle ne satisfera pas tout le monde.<br><br><b>Points d'attribution :</b> 1 point pour un effet positif placé dans son aspect. 1 point pour un effet négatif placé dans un aspect différent. 1 point pour une recommandation claire qui découle des effets donnés. 1 point pour avoir expliqué que la science éclaire la décision mais ne peut pas la régler, parce qu'elle repose sur la pesée des valeurs et les compromis.",
      {});
  }
]), ["Structure-la ainsi : les effets d'abord, dans des aspects différents, puis la décision, puis la limite de la science.", "Quatre parties, quatre points : positif, négatif, recommandation, et pourquoi la science seule ne peut pas décider."]);

/* ---------- SC8.3.1 Laboratoire principal : réaliser la procédure sur la salinité ---------- */

E("s8f-u1-lab-procedure", 1, ["SC8.3.1"], 1, "var", varset([
  function () {
    return mcq("Dans le laboratoire principal sur la salinité, un élève étudie comment la salinité influe sur la masse volumique de l'eau en ajoutant des gouttes d'eau douce colorée à un récipient d'eau salée. Quelle étape de procédure est correcte?",
      "Ajouter les gouttes doucement à la surface et observer où l'eau colorée se dépose avant tout brassage",
      ["Brasser le récipient vigoureusement après chaque goutte pour que les deux eaux se mélangent uniformément dans le récipient",
       "Verser l'eau douce rapidement d'une hauteur pour qu'elle plonge directement au fond",
       "Chauffer l'eau salée d'abord pour que l'eau douce s'étale uniformément dans tout le récipient d'un coup"],
      "Le laboratoire étudie comment l'eau douce et l'eau salée interagissent quand elles se rencontrent. L'eau douce colorée doit être ajoutée doucement et observée pendant qu'elle se dépose : elle reste près du haut, parce que l'eau douce est moins dense que l'eau salée. Brasser, verser fort ou chauffer détruirait la superposition même que la procédure est censée révéler.",
      {});
  }
]), ["Le but entier du laboratoire est d'observer où l'eau douce se dépose. Quelle étape protège cette observation?", "Tout ce qui mélange les eaux ruine la recherche."]);

E("s8f-u1-lab-extension", 1, ["SC8.3.1"], 2, "var", varset([
  function () {
    return mcq("Le laboratoire principal se termine en étendant le résultat aux milieux où l'eau douce et l'eau de l'océan se rencontrent. Dans un estuaire, où l'eau d'une rivière s'écoule dans l'océan, quelle disposition le résultat du laboratoire devrait-il prédire?",
      "L'eau douce moins dense de la rivière glisse au-dessus de l'eau salée plus dense qu'elle rencontre",
      ["L'eau douce plus dense descend sous l'eau salée qu'elle rencontre dans l'estuaire",
       "Les deux eaux se mélangent toujours instantanément en une seule couche uniforme de haut en bas",
       "L'eau salée flotte au-dessus de l'eau douce parce qu'elle est la plus chaude des deux"],
      "Le résultat du laboratoire est que l'eau douce, étant moins dense, flotte sur l'eau salée. Étendu à un estuaire, l'eau douce de la rivière glisse au-dessus de l'eau salée de l'océan là où elles se rencontrent, ce qui fait partie de ce qui rend les estuaires des milieux en couches et productifs.",
      {});
  }
]), ["Transporte le résultat du laboratoire dehors : les mêmes deux eaux, maintenant une rivière qui rencontre l'océan.", "L'eau moins dense reste au-dessus, au laboratoire et dans l'estuaire."]);

E("s8f-u1-cr-design-salinity", 1, ["SC8.3.1"], 3, "var", varset([
  function () {
    return textq("Conçois une recherche pour vérifier comment la salinité influe sur la masse volumique de l'eau. Ton plan doit énoncer la question que tu vérifies, la variable que tu changeras, les variables que tu garderas les mêmes, ce que tu observeras ou mesureras, et comment tes observations te permettront de tirer une conclusion. (4 points)",
      ["une question vérifiable sur la salinité et la masse volumique", "la salinité changée pendant que le volume et la température restent les mêmes", "observer où chaque échantillon se dépose ou si un objet flotte plus haut", "une conclusion tirée de la comparaison des échantillons"],
      "<b>Réponse modèle :</b> Question : comment l'augmentation de la salinité de l'eau influe-t-elle sur sa masse volumique? Prépare trois échantillons d'eau avec des quantités mesurées différentes de sel dissous (par exemple aucune, une quantité modérée, et une grande quantité), en gardant le volume de chaque échantillon et sa température les mêmes. Ajoute doucement des gouttes d'eau colorée d'une salinité fixe à chaque échantillon, ou fais flotter le même objet dans chacun, et observe où les gouttes se déposent ou à quelle hauteur l'objet flotte. Si les gouttes se déposent plus bas, ou si l'objet flotte plus bas, dans les échantillons moins salés, la conclusion s'ensuit : augmenter la salinité augmente la masse volumique, parce que l'eau plus salée soutient l'eau ajoutée ou l'objet plus haut.<br><br><b>Points d'attribution :</b> 1 point pour une question vérifiable nommant la salinité et la masse volumique. 1 point pour la salinité comme variable changée. 1 point pour au moins deux variables gardées les mêmes (volume, température, l'objet ou la goutte utilisée). 1 point pour des observations qui se relient à la conclusion (niveau de dépôt ou hauteur de flottaison comparés entre les échantillons).",
      {});
  }
]), ["Planifie-la comme le laboratoire principal : question, variable changée, variables gardées, observations, conclusion.", "Quatre parties méritent les quatre points. Ne saute pas les variables que tu gardes les mêmes."]);

/* ---------- SC8.3.2 Utiliser les outils et les instruments de façon sûre ---------- */

E("s8f-u1-safe-practice", 1, ["SC8.3.2"], 1, "var", varset([
  function () {
    return mcq("Pendant le test de santé de l'eau, un élève s'apprête à transporter un récipient plein d'eau d'étang et un thermomètre en verre à travers la salle. Quel choix est la pratique sûre?",
      "Transporter le récipient à deux mains, marcher lentement, et garder le thermomètre dans son étui jusqu'à ce qu'on en ait besoin au comptoir",
      ["Transporter le récipient d'une main et le thermomètre dans l'autre main pour éviter de faire un deuxième voyage",
       "Courir l'échantillon au comptoir aussi vite que possible pour que les lectures puissent être prises plus tôt",
       "Tenir le thermomètre par son réservoir en marchant dans la salle pour qu'il se réchauffe, prêt à l'emploi au comptoir"],
      "L'utilisation sûre des outils dans les laboratoires de ce volet veut dire protéger à la fois l'élève et les instruments : deux mains pour un récipient plein, une marche lente, et les instruments en verre comme les thermomètres gardés protégés jusqu'à leur utilisation au comptoir. Cette banque porte cette seule question sur la pratique sûre; la manipulation sûre elle-même est évaluée en classe.",
      {});
  }
]), ["Pense à ce qui pourrait se renverser ou se briser, et choisis le choix qui empêche les deux.", "Deux mains, un pas lent, le verre gardé dans son étui."]);

/* ---------- SC8.3.3 Interpréter les tendances dans les données ---------- */

E("s8f-u1-health-figure", 1, ["SC8.3.3"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre l'oxygène dissous mesuré à quatre sites le long d'une rivière. L'eau qui soutient bien les poissons contient un oxygène dissous de 5 mg/L ou plus, montré par la ligne en tirets. Quel site tombe sous ce niveau sain?",
      "Le site C",
      ["Le site A", "Le site B", "Le site D"],
      "En lisant les barres contre la ligne en tirets de 5 mg/L : les sites A, B et D se trouvent au-dessus d'elle, tandis que la barre du site C n'atteint qu'environ 3,5 mg/L, sous le niveau qui soutient bien les poissons. Interpréter des données veut dire comparer les valeurs à la norme qui leur donne leur sens.",
      {});
    q.figure = s8fHealthSVG([{ name: "Site A", value: 8.2 }, { name: "Site B", value: 6.4 }, { name: "Site C", value: 3.5 }, { name: "Site D", value: 7.1 }], "Oxygène dissous", "mg/L", 5);
    return q;
  },
  function () {
    var q = mcq("Le graphique montre l'oxygène dissous mesuré dans quatre étangs. L'eau qui soutient bien les poissons contient un oxygène dissous de 5 mg/L ou plus, montré par la ligne en tirets. Quel étang a le niveau d'oxygène dissous le plus sain?",
      "L'étang W",
      ["L'étang X", "L'étang Y", "L'étang Z"],
      "Les quatre étangs sont comparés à la même ligne en tirets à 5 mg/L. La barre de l'étang W est la plus haute, à environ 9 mg/L, confortablement au-dessus du seuil sain. L'habileté consiste à lire chaque valeur contre la norme, et non à choisir simplement la barre la plus longue sans vérifier la ligne.",
      {});
    q.figure = s8fHealthSVG([{ name: "Étang W", value: 9 }, { name: "Étang X", value: 5.8 }, { name: "Étang Y", value: 4.2 }, { name: "Étang Z", value: 6.6 }], "Oxygène dissous", "mg/L", 5);
    return q;
  }
]), ["Compare chaque barre à la ligne de seuil en tirets, et non seulement les unes aux autres.", "La ligne en tirets est la norme : 5 mg/L."]);

E("s8f-u1-data-relationship", 1, ["SC8.3.3"], 3, "var", varset([
  function () {
    return mcq("Une classe mesure un étang pendant l'été. En juin, l'eau est à 12 degrés Celsius et contient 9,5 mg/L d'oxygène dissous. En juillet, elle est à 18 degrés et contient 8,1 mg/L. En août, elle est à 24 degrés et contient 6,8 mg/L. Quel énoncé interprète correctement la tendance dans ces données?",
      "À mesure que la température de l'eau augmentait, l'oxygène dissous diminuait : l'eau plus chaude contient moins d'oxygène dissous",
      ["À mesure que la température de l'eau augmentait pendant l'été, l'oxygène dissous augmentait au même rythme qu'elle",
       "La température et l'oxygène dissous sont restés à un total fixe additionnés ensemble pendant tout l'été",
       "Les données ne montrent aucune relation du tout, parce que trois mesures sont trop peu nombreuses pour en lire une tendance"],
      "En lisant les paires en ordre : 12 degrés avec 9,5 mg/L, 18 avec 8,1, 24 avec 6,8. Chaque hausse de température vient avec une baisse d'oxygène, une tendance inverse constante. C'est la relation utilisée dans la chaîne d'exemple : l'eau plus chaude contient moins d'oxygène dissous.",
      {});
  }
]), ["Associe chaque température à sa valeur d'oxygène et lis les paires en ordre.", "Les deux nombres bougent chaque mois. Bougent-ils ensemble ou dans des directions opposées?"]);

/* ---------- SC8.3.4 Communiquer les questions et les résultats ---------- */

E("s8f-u1-conclusion-statement", 1, ["SC8.3.4"], 1, "var", varset([
  function () {
    return mcq("Une élève doit écrire le résultat de la recherche sur la salinité dans ses notes en une phrase claire. Quelle phrase communique le mieux le résultat?",
      "L'eau douce colorée a flotté sur l'eau salée, ce qui montre que l'eau douce est moins dense que l'eau salée",
      ["Le laboratoire était intéressant et l'eau a fait ce que nous pensions",
       "Nous avons mis des gouttes et nous les avons regardées pendant un moment",
       "L'eau salée et l'eau douce sont toutes les deux de l'eau, donc le laboratoire a montré qu'elles sont pareilles"],
      "Communiquer un résultat veut dire énoncer ce qui a été observé et ce que cela montre, en une phrase qu'un lecteur qui a manqué le laboratoire peut utiliser. Le premier choix rapporte l'observation (l'eau douce a flotté) et la conclusion qu'elle soutient (l'eau douce est moins dense). Les autres sont vagues, ou contredisent l'observation.",
      {});
  }
]), ["Une bonne phrase de résultat a deux parties : ce qui a été vu, et ce que cela montre.", "Les phrases vagues et les phrases contredites déçoivent toutes les deux le lecteur."]);

E("s8f-u1-cr-results-summary", 1, ["SC8.3.4"], 2, "var", varset([
  function () {
    return textq("Un groupe a testé quatre échantillons d'un ruisseau pour le laboratoire sur la santé de l'eau. Leurs résultats : oxygène dissous 7,8 mg/L; phosphates 6 microgrammes par litre; pH 6,4; l'eau était légèrement trouble. Intervalles sains du laboratoire : oxygène dissous 5 mg/L ou plus; phosphates moins de 10 microgrammes par litre; pH entre 5 et 8,5. Écris un court résumé des résultats pour le rapport du groupe : énonce chaque résultat contre son intervalle sain et donne la conclusion générale. (3 points)",
      ["chaque mesure comparée à son intervalle sain", "les trois facteurs mesurés dans l'intervalle", "conclusion générale que l'eau du ruisseau est saine, avec le trouble noté"],
      "<b>Réponse modèle :</b> L'oxygène dissous, 7,8 mg/L, est au-dessus du minimum sain de 5 mg/L. Les phosphates, 6 microgrammes par litre, sont sous la limite saine de 10. Le pH, 6,4, se trouve dans l'intervalle sain de 5 à 8,5. L'eau était légèrement trouble, une observation de turbidité qui vaut la peine d'être notée. En général, les trois facteurs mesurés se trouvent dans leurs intervalles sains, donc les résultats soutiennent la conclusion que l'eau de ce ruisseau est en état sain pour les espèces testées.<br><br><b>Points d'attribution :</b> 1 point pour au moins deux mesures énoncées contre leurs intervalles sains. 1 point pour la troisième mesure et l'observation de turbidité incluses. 1 point pour une conclusion générale qui découle des comparaisons.",
      {});
  }
]), ["Un résumé de résultats compare; il ne fait pas que lister. Place chaque nombre à côté de son intervalle sain.", "Termine par la conclusion générale que les comparaisons soutiennent."]);

/* ---------- SC8.3.5 Énoncer une conclusion sur la salinité et la masse volumique ---------- */

E("s8f-u1-lab-conclusion", 1, ["SC8.3.5"], 1, "var", varset([
  function () {
    return mcq("Dans le laboratoire principal, l'eau douce colorée ajoutée doucement à l'eau salée reste en une couche près du haut au lieu de se mélanger ou de couler. Quelle conclusion sur la salinité et la masse volumique cette observation soutient-elle?",
      "Augmenter la salinité augmente la masse volumique, donc l'eau douce moins salée flotte sur l'eau salée plus dense",
      ["Augmenter la salinité diminue la masse volumique, donc l'eau douce flotte parce qu'elle est plus dense",
       "La salinité n'a aucun effet sur la masse volumique; le colorant retient l'eau douce en haut",
       "L'eau douce et l'eau salée ont une masse volumique égale, et la couche est temporaire"],
      "La conclusion énoncée du laboratoire principal : la salinité influe sur la masse volumique. Le sel dissous rend l'eau plus dense, donc l'eau douce ajoutée doucement à l'eau salée flotte au-dessus d'elle. La superposition est la preuve; la différence de masse volumique est la conclusion.",
      {});
  }
]), ["L'observation est la superposition. Quelle disposition des masses volumiques produit une superposition avec l'eau douce au-dessus?", "L'eau qui flotte est la moins dense."]);

E("s8f-u1-conclusion-judge", 1, ["SC8.3.5"], 2, "var", varset([
  function () {
    return mcq("Un élève fait flotter le même bloc de bois dans trois réservoirs : de l'eau douce, de l'eau légèrement salée, et de l'eau très salée. Le bloc flotte le plus bas dans l'eau douce et le plus haut dans l'eau très salée. Quelle conclusion ces observations soutiennent-elles?",
      "À mesure que la salinité augmente, la masse volumique augmente, donc le bloc est soutenu plus haut dans l'eau plus salée",
      ["À mesure que la salinité augmente, le bloc lui-même devient plus léger, donc il flotte plus haut dans le réservoir",
       "Le bloc flotte plus haut dans l'eau salée simplement parce que l'eau salée est toujours l'eau la plus chaude",
       "Aucune conclusion n'est possible à partir du test, parce que le bloc n'a pas été pesé avant d'être mis à flotter"],
      "Le même bloc, avec la même masse, flotte à des hauteurs différentes, donc la différence doit être dans l'eau. Flotter plus haut veut dire que l'eau le soutient plus fortement, et c'est ce que fait une plus grande masse volumique. Les observations soutiennent la conclusion que la salinité augmente la masse volumique, la même conclusion que le laboratoire principal, atteinte par une observation différente.",
      {});
  }
]), ["Le bloc ne change jamais. Qu'est-ce qui change d'un réservoir à l'autre, et qu'est-ce que cela doit faire?", "La hauteur de flottaison est la preuve; la masse volumique est l'explication."]);

/* ---------- SC8.3.6 Identifier les effets des facteurs abiotiques (habiletés) ---------- */

E("s8f-u1-abiotic-identify", 1, ["SC8.3.6"], 1, "var", varset([
  function () {
    return mcq("Une équipe de terrain note ceci à propos d'un lac : après des semaines sans pluie, le niveau de l'eau a baissé et les zones peu profondes où les grenouilles pondaient leurs œufs sont à sec. Quel facteur abiotique l'équipe devrait-elle consigner comme celui qui a changé?",
      "La quantité d'eau disponible dans le lac",
      ["La population de grenouilles du lac",
       "Le nombre de prédateurs dans le lac",
       "Les plantes qui poussent au bord du lac"],
      "La quantité d'eau est un facteur abiotique : un élément non vivant du milieu. Les grenouilles, leurs prédateurs et les plantes sont des êtres vivants, donc des facteurs biotiques, et ce sont eux qui subissent le changement plutôt que de le causer ici. Identifier le facteur abiotique est la première étape avant d'expliquer ses effets.",
      {});
  },
  function () {
    return mcq("Un rapport de terrain indique qu'un déversement en amont a rendu l'eau d'une rivière laiteuse pendant des jours, et que les plantes du fond ont commencé à jaunir. Quel facteur abiotique le rapport identifie-t-il par son effet?",
      "La turbidité, par la lumière qu'elle bloque",
      ["L'oxygène dissous, par l'air qu'elle ajoute",
       "Les phosphates, par les sels qu'ils retirent",
       "La température, par la chaleur qu'elle libère"],
      "Une eau laiteuse est une eau trouble : la turbidité. Les particules en suspension bloquent la lumière du soleil, et les plantes du fond jaunissent faute de lumière. Chaque autre facteur agit par un mécanisme différent qui ne correspond pas à une eau laiteuse.",
      {});
  }
]), ["Cherche l'élément non vivant de la description : c'est le facteur abiotique.", "Les êtres vivants subissent le changement; le facteur abiotique est la condition qui a changé."]);

E("s8f-u1-abiotic-measure-choice", 1, ["SC8.3.6"], 2, "var", varset([
  function () {
    return mcq("Une classe veut vérifier si les poissons d'un ruisseau sont stressés par un rejet d'eau chaude d'une usine. Quelle mesure cible directement le facteur abiotique en cause et son mécanisme?",
      "Mesurer la température et l'oxygène dissous en amont et en aval du rejet, parce que l'eau chaude contient moins d'oxygène dissous",
      ["Mesurer seulement le pH en aval du rejet, parce que l'eau chaude est toujours beaucoup plus acide que l'eau froide",
       "Compter les plantes sur la rive près du rejet, parce que les plantes mesurent directement l'oxygène de l'eau",
       "Mesurer la turbidité une seule fois au rejet, parce qu'une eau trouble est le signe certain d'un stress thermique"],
      "Le facteur en cause est la température, et son mécanisme est l'oxygène : l'eau chaude contient moins d'oxygène dissous. Mesurer la température et l'oxygène des deux côtés du rejet vérifie à la fois le facteur et le mécanisme, et la comparaison amont et aval isole l'effet de l'usine.",
      {});
  }
]), ["Nomme le facteur, puis son mécanisme, puis choisis les mesures qui vérifient les deux.", "La comparaison amont et aval est ce qui isole l'effet du rejet."]);

/* ---------- SC8.3.7 Choisir des méthodes et des outils qui conviennent ---------- */

E("s8f-u1-tool-choice", 1, ["SC8.3.7"], 1, "var", varset([
  function () {
    return mcq("Pour le test de santé de l'eau, un groupe doit mesurer à quel point un échantillon d'étang est trouble, puisque la turbidité est l'un des facteurs abiotiques vérifiés. Quel choix d'outil convient au travail?",
      "Un tube ou un disque de turbidité, qui mesure jusqu'où la lumière pénètre l'échantillon",
      ["Un thermomètre, lu soigneusement à l'ombre au bord de l'étang à côté de l'échantillon",
       "Une trousse de test de pH, utilisée deux fois sur le même échantillon pour être sûr de la lecture du trouble",
       "Un appareil de mesure de l'oxygène dissous, réglé sur son échelle de trouble pour lire l'échantillon d'étang"],
      "Choisir un outil veut dire l'associer à la quantité mesurée. La turbidité est le trouble, le blocage de la lumière par les particules en suspension, donc elle se mesure par jusqu'où la lumière ou un disque marqué peut être vu à travers l'eau. Les thermomètres mesurent la température, les trousses de pH mesurent l'acidité, et les appareils d'oxygène mesurent l'oxygène dissous.",
      {});
  }
]), ["Associe l'outil à la quantité : la turbidité concerne la lumière qui traverse l'eau.", "Chacun des autres outils mesure un facteur différent du même laboratoire."]);

E("s8f-u1-method-choice", 1, ["SC8.3.7"], 2, "var", varset([
  function () {
    return mcq("On demande à une classe de juger la santé de l'eau d'un étang entier, et non d'un seul endroit. Quelle méthode donne l'image la plus fiable?",
      "Prélever des échantillons à plusieurs endroits autour de l'étang et à travers celui-ci et faire la moyenne des résultats pour chaque facteur",
      ["Prélever un échantillon à l'endroit le plus facile à atteindre et le tester très soigneusement",
       "Échantillonner seulement là où l'eau semble la plus sale, puisque c'est là que les problèmes se montreraient",
       "Demander à un élève qui se baigne dans l'étang de décrire l'eau"],
      "Un étang n'est pas uniforme : les entrées d'eau, l'ombre, la profondeur et la végétation changent les conditions d'un endroit à l'autre. Échantillonner plusieurs endroits et faire la moyenne donne une image de l'étang entier et protège la conclusion contre un seul endroit inhabituel. Tester soigneusement un seul échantillon commode ne décrit toujours que cet échantillon.",
      {});
  }
]), ["La question concerne l'étang entier. Quelle méthode couvre vraiment l'étang entier?", "Un échantillon soigneux reste un seul échantillon."]);

/* ---------- SC8.3.8 Préparer un exposé et évaluer les procédures ---------- */

E("s8f-u1-threshold-judge", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return mcq("Un échantillon d'eau douce donne ces résultats : oxygène dissous 4,1 mg/L, phosphates 6 microgrammes par litre, pH 6,8. Intervalles sains : oxygène dissous 5 mg/L ou plus; phosphates moins de 10 microgrammes par litre; pH de 5 à 8,5. Quel jugement est correct?",
      "L'oxygène dissous est sous son intervalle sain, tandis que les phosphates et le pH sont dans les leurs, donc l'eau pourrait ne pas bien soutenir les poissons",
      ["Les trois facteurs sont dans leurs intervalles sains, tandis qu'aucun ne manque sa limite, donc l'échantillon montre que l'eau est saine pour les poissons",
       "Les phosphates sont au-dessus de leur limite saine, tandis que l'oxygène et le pH sont dans les leurs, et c'est le principal problème que montre cet échantillon d'eau",
       "Le pH est en dehors de son intervalle sain, tandis que l'oxygène dissous et les phosphates sont dans les leurs, et c'est le principal problème que montre cet échantillon"],
      "Compare chaque valeur à son intervalle. L'oxygène dissous à 4,1 mg/L est sous le minimum de 5 mg/L. Les phosphates à 6 sont sous la limite de 10, et le pH 6,8 se trouve dans l'intervalle de 5 à 8,5. Seul l'oxygène échoue, et un faible oxygène est ce qui limite les poissons que l'eau peut soutenir.",
      {});
  }
]), ["Juge les trois valeurs une à la fois contre leurs intervalles avant de choisir.", "Une seule des trois valeurs manque son intervalle. Trouve-la."]);

E("s8f-u1-cr-pond-data", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return textq("Une classe fait rapport sur un étang. Résultats : oxygène dissous 3,8 mg/L (sain : 5 ou plus); phosphates 14 microgrammes par litre (sain : moins de 10); pH 6,1 (sain : de 5 à 8,5); l'eau était visiblement trouble après la pluie. Écris les conclusions du groupe : identifie chaque facteur qui se trouve en dehors de son intervalle sain, et explique ce que les résultats combinés suggèrent sur la capacité de l'étang à soutenir les poissons et les plantes aquatiques. (3 points)",
      ["l'oxygène dissous et les phosphates en dehors de leurs intervalles, le pH dans le sien", "un faible oxygène limite les poissons", "les algues nourries par les phosphates et la turbidité réduisent la lumière pour les plantes"],
      "<b>Réponse modèle :</b> Deux facteurs se trouvent en dehors de leurs intervalles sains. L'oxygène dissous, à 3,8 mg/L, est sous le minimum sain de 5 mg/L, donc l'étang pourrait ne pas bien soutenir les poissons. Les phosphates, à 14 microgrammes par litre, sont au-dessus de la limite saine de 10, ce qui nourrit une croissance excessive des algues. Le pH, 6,1, est dans son intervalle sain. Avec le trouble après la pluie (la turbidité qui bloque la lumière), les résultats suggèrent un étang sous stress : les poissons sont limités par le faible oxygène, et les plantes aquatiques sont serrées à la fois par la turbidité et par les algues que les phosphates nourrissent.<br><br><b>Points d'attribution :</b> 1 point pour avoir identifié l'oxygène dissous et les phosphates comme en dehors de leurs intervalles et le pH comme dans le sien. 1 point pour la conséquence pour les poissons (faible oxygène). 1 point pour la conséquence pour les plantes (lumière réduite par la turbidité et les algues nourries par les phosphates).",
      {});
  }
]), ["Fais rapport facteur par facteur d'abord, puis combine-les dans l'image générale de l'étang.", "Deux facteurs échouent à leurs intervalles. La conclusion les relie."]);

E("s8f-u1-process-evaluate", 1, ["SC8.3.8"], 3, "var", varset([
  function () {
    return mcq("Un groupe a évalué sa recherche sur la santé de l'eau par la suite. Son plan avait été : un échantillon, prélevé au bord de l'étang un après-midi, testé une fois pour chaque facteur. Son rapport a conclu que l'étang entier était malsain parce que la lecture d'oxygène était basse. Quelle évaluation de son processus est la plus juste?",
      "Le processus était trop faible pour la conclusion : un seul échantillon du bord en un jour ne peut pas représenter l'étang entier, et une seule lecture basse aurait dû être vérifiée par des échantillons répétés avant de conclure",
      ["Le processus était solide du début à la fin et n'a besoin d'aucune amélioration, parce que le groupe a utilisé le bon test pour chaque facteur et consigné chaque résultat soigneusement dans ses cahiers de laboratoire",
       "La seule faiblesse de tout son processus était d'avoir prélevé l'échantillon l'après-midi plutôt que le matin du même jour, quand le niveau d'oxygène de l'étang aurait pu lire différemment",
       "Le processus lui-même était faible d'une seule façon qui compte : le groupe a écrit la conclusion avec trop de confiance pour la seule série de lectures qu'il avait prise à l'étang cet après-midi-là"],
      "Évaluer un processus veut dire juger si le plan pouvait soutenir la conclusion qu'on en a tirée. Un échantillon d'un seul bord en un seul jour décrit cet endroit à ce moment, et non l'étang entier, et une seule lecture surprenante appelle des répétitions. Les tests eux-mêmes étaient bons; le plan d'échantillonnage et le saut vers une conclusion sur l'étang entier étaient les faiblesses.",
      {});
  }
]), ["Juge le plan contre la taille de la conclusion : un échantillon, un étang entier.", "Des tests corrects ne peuvent pas sauver un échantillon non représentatif."]);

/* ---------- SC8.3.9 Les tendances des populations à partir de graphiques ---------- */

E("s8f-u1-pop-interpolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans. Estime le décompte en 2021, une année entre les mesures.",
      "Environ 185",
      ["Environ 160", "Environ 210", "Environ 240"],
      "Interpoler veut dire estimer entre des points connus. Le décompte de 2020 est 160 et celui de 2022 est 210, donc 2021 se trouve entre eux, environ à leur point milieu, 185. Lire une année mesurée (160 ou 210) n'est pas une interpolation.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [120, 160, 210, 250], "Individus décomptés");
    return q;
  },
  function () {
    var q = mcq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans. Estime le décompte en 2023, une année entre les mesures.",
      "Environ 175",
      ["Environ 150", "Environ 160", "Environ 200"],
      "Le décompte de 2022 est 150 et celui de 2024 est 200. L'année entre les deux, 2023, est estimée environ au point milieu, 175. C'est l'interpolation : estimer une valeur à l'intérieur de l'intervalle mesuré.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [90, 130, 150, 200], "Individus décomptés");
    return q;
  }
]), ["L'année voulue se trouve entre deux années mesurées. Sa valeur se trouve entre leurs valeurs aussi.", "Prends le point milieu des deux décomptes voisins."]);

E("s8f-u1-pop-extrapolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre le décompte d'une espèce marine qui augmente régulièrement de 2019 à 2023. Si la tendance continue au même rythme, quelle est la meilleure prévision pour 2024?",
      "Environ 250",
      ["Environ 220", "Environ 235", "Environ 280"],
      "Les décomptes augmentent d'environ 30 chaque année : 100, 130, 160, 190, 220. Extrapoler continue le motif un pas au-delà des données, donnant environ 250 pour 2024. L'extrapolation suppose que la tendance continue, ce qui explique pourquoi c'est une prévision, et non une lecture.",
      {});
    q.figure = s8fPopGraphSVG([2019, 2020, 2021, 2022, 2023], [100, 130, 160, 190, 220], "Individus décomptés");
    return q;
  },
  function () {
    var q = mcq("Le graphique montre le décompte d'une espèce marine qui diminue régulièrement de 2019 à 2023. Si la tendance continue au même rythme, quelle est la meilleure prévision pour 2024?",
      "Environ 150",
      ["Environ 120", "Environ 180", "Environ 200"],
      "Les décomptes diminuent d'environ 30 chaque année : 300, 270, 240, 210, 180. Continuer la tendance une année de plus donne environ 150. C'est l'extrapolation : prolonger le motif au-delà des années mesurées.",
      {});
    q.figure = s8fPopGraphSVG([2019, 2020, 2021, 2022, 2023], [300, 270, 240, 210, 180], "Individus décomptés");
    return q;
  }
]), ["Trouve le pas annuel dans les données, puis fais un pas de plus de la même taille.", "L'extrapolation prolonge la tendance; elle ne répète pas la dernière valeur."]);

E("s8f-u1-cr-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    var q = textq("Le graphique montre les décomptes d'une espèce marine dans une baie, pris tous les deux ans de 2018 à 2024. (a) Interpole : estime le décompte en 2021. (b) Extrapole : prévois le décompte en 2026 si la tendance continue. (c) Énonce l'hypothèse dont ta prévision dépend. (3 points)",
      ["2021 environ 130, entre 110 et 150", "2026 environ 230, en continuant l'augmentation d'environ 40 tous les deux ans", "la prévision suppose que les conditions et la tendance restent les mêmes"],
      "<b>Réponse modèle :</b> (a) Le décompte de 2020 est 110 et celui de 2022 est 150, donc le décompte de 2021 est estimé entre eux, à environ 130. (b) Les décomptes augmentent d'environ 40 tous les deux ans (80, 110, 150, 190, avec des pas de deux ans de 30, 40, 40), donc continuer la tendance donne environ 230 en 2026. (c) La prévision suppose que les conditions qui poussent l'augmentation restent les mêmes : si la nourriture, les prédateurs, la pression de pêche ou les conditions de l'eau changent, la tendance peut se briser, ce qui explique pourquoi une extrapolation est une prévision plutôt qu'une mesure.<br><br><b>Points d'attribution :</b> 1 point pour une interpolation d'environ 130 (accepter de 125 à 135). 1 point pour une extrapolation d'environ 230 (accepter de 220 à 240) à partir de la tendance. 1 point pour l'hypothèse que les conditions et la tendance continuent sans changement.",
      {});
    q.figure = s8fPopGraphSVG([2018, 2020, 2022, 2024], [80, 110, 150, 190], "Individus décomptés");
    return q;
  }
]), ["La partie (a) lit entre les points; la partie (b) prolonge le motif; la partie (c) nomme ce qui pourrait le briser.", "Les pas de deux ans dans les décomptes sont ton guide pour les deux estimations."]);

E("s8f-u1-temp-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    return mcq("Une classe trace deux graphiques pour la même baie sur huit ans : la température moyenne de l'eau en été, qui augmente régulièrement, et la population d'une espèce de poisson d'eau froide, qui diminue régulièrement. Elle sait aussi que la pression de pêche est restée à peu près la même. Quelle suggestion convient le mieux à la démarche de mise en relation des graphiques?",
      "La hausse de température est une cause suggérée raisonnable du déclin, parce que l'eau plus chaude contient moins d'oxygène dissous, mais les graphiques à eux seuls montrent une relation, et non une preuve, et d'autres facteurs changeants devraient être vérifiés",
      ["Les deux graphiques ensemble prouvent carrément que la hausse de température a causé le déclin, donc aucun autre facteur changeant dans la baie n'a besoin d'être vérifié avant de conclure",
       "Aucune relation ne peut jamais être suggérée à partir des graphiques, parce que les deux graphiques mesurent des choses différentes, et des mesures différentes ne peuvent jamais être comparées de façon utile",
       "Le déclin de la population de poissons doit lui-même avoir causé la hausse de température de la baie, puisque le graphique de la population baisse régulièrement à mesure que le graphique de la température monte sur les mêmes années"],
      "Comparer les graphiques de population aux graphiques de température et suggérer des relations possibles est exactement l'activité prévue. La suggestion gagne en force d'un mécanisme, l'eau chaude qui contient moins d'oxygène, et du fait que la pression de pêche est restée stable. Mais deux tendances qui bougent ensemble montrent une relation, et non une preuve : une suggestion honnête nomme le mécanisme et garde la porte ouverte à d'autres facteurs.",
      {});
  }
]), ["Une relation suggérée a besoin de deux choses : un mécanisme, et de l'honnêteté sur ce que les graphiques ne peuvent pas prouver.", "La chaîne d'exemple passe par l'oxygène dissous."]);

/* ---------- SC8.3.10 Les forces et les faiblesses des technologies du plancher océanique ---------- */

E("s8f-u1-tech-strength", 1, ["SC8.3.10"], 2, "var", varset([
  function () {
    return mcq("Quel appariement donne une véritable force et une véritable faiblesse du sonar pour étudier le plancher océanique?",
      "Force : il cartographie la forme du plancher sur des bassins entiers à partir d'un navire en mouvement. Faiblesse : il montre la forme, et non de quoi le plancher est fait ni ce qui y vit",
      ["Force : il photographie les organismes qui vivent dans l'obscurité totale sur tout le plancher. Faiblesse : il ne fonctionne que dans l'eau côtière peu profonde près du rivage",
       "Force : il transporte les chercheurs jusqu'au plancher lui-même pour y travailler directement. Faiblesse : il met son équipage en danger en travaillant à grande profondeur",
       "Force : il mesure la température de l'eau à n'importe quelle profondeur sous le navire. Faiblesse : il ne peut pas détecter le plancher océanique du tout, à aucune profondeur"],
      "Juger une technologie veut dire apparier ce qu'elle fait bien avec ce qu'elle ne peut pas faire. La force du sonar est sa couverture : des lectures continues de profondeur à partir d'un navire en mouvement deviennent des cartes de bassins. Sa faiblesse est que les échos donnent la forme seulement; la composition et la vie sur le plancher exigent d'autres technologies, comme l'échantillonnage, la photographie et les submersibles.",
      {});
  }
]), ["Vérifie chaque moitié de l'appariement séparément : la force est-elle réelle, et la faiblesse est-elle réelle?", "Le sonar donne la forme. Il ne donne ni la composition ni la vie."]);

E("s8f-u1-tech-weakness", 1, ["SC8.3.10"], 1, "var", varset([
  function () {
    return mcq("Les submersibles océaniques ont transformé la recherche sur le plancher océanique, mais ils ont une véritable limite. Quel énoncé la nomme?",
      "Ils coûtent cher, transportent seulement quelques personnes, et peuvent rester en profondeur pour un temps limité, donc ils n'échantillonnent que de minuscules parties du plancher",
      ["Ils ne peuvent pas descendre sous le bord du plateau continental dans le bassin océanique profond au-delà, quelle que soit la durée de la plongée ou la taille de l'équipage à bord",
       "Ils perturbent tellement l'eau autour d'eux que le sonar ne peut pas être utilisé près d'eux pendant une plongée, et leurs lectures de profondeur sont perdues pour tout le bassin",
       "Ils ne peuvent travailler que les jours où la surface de l'océan est complètement calme d'une rive à l'autre, et chaque plongée exige des semaines de préparation au port d'attache"],
      "Les submersibles atteignent le plancher profond directement, ce qu'aucune autre technologie ne fait avec des personnes à bord, mais chaque plongée coûte cher, est brève et petite en équipage et en couverture. C'est pourquoi ils complètent plutôt qu'ils ne remplacent les outils à grande couverture comme le sonar : la force de l'un couvre la faiblesse de l'autre.",
      {});
  }
]), ["La limite concerne l'échelle : le coût, l'équipage et le temps, et non si la technologie fonctionne.", "Un submersible visite une minuscule parcelle de plancher à la fois."]);

/* ---------- SC8.3.11 Rechercher l'érosion et la formation de dépôts (scénarios distincts) ---------- */

E("s8f-u1-research-landform", 1, ["SC8.3.11"], 1, "var", varset([
  function () {
    return mcq("Pour un rapport, une élève rassemble des notes de recherche sur un cordon littoral, une longue crête étroite de sable qui s'avance dans une baie à partir du rivage. Selon ses notes, quel processus explique le cordon?",
      "La formation de dépôts : les vagues et les courants qui longent le rivage déposent le sable là où l'eau ralentit, construisant la crête",
      ["L'érosion : les vagues creusent le rivage et laissent la crête de sable debout comme le reste d'un rivage plus ancien",
       "La glaciation : la glace en recul a laissé la crête de sable derrière elle quand elle a fondu loin de la baie",
       "L'action des volcans : la matière du plancher océanique a été poussée vers le haut pour former la crête sous l'eau"],
      "Un cordon littoral est une forme de relief de dépôts. Les vagues et les courants littoraux transportent le sable le long du rivage et le déposent là où l'eau perd de sa vitesse, par exemple là où le rivage tourne dans une baie, construisant une crête de sédiments. Les formes d'érosion comme les grottes et les arches sont creusées dans la roche, et non construites de sable déposé.",
      {});
  }
]), ["Une crête faite de sable déposé ou de roche creusée? Le matériau donne la réponse.", "Le sable transporté le long du rivage doit aller quelque part quand l'eau ralentit."]);

E("s8f-u1-research-judge", 1, ["SC8.3.11"], 3, "var", varset([
  function () {
    return mcq("Deux sources décrivent la même plage. La source 1, un relevé côtier mesuré sur vingt ans, montre que la plage a gagné deux mètres de largeur et nomme les courants littoraux qui déposent le sable. La source 2, un dépliant touristique, dit que la plage « a toujours été exactement ainsi ». Un rapport doit expliquer pourquoi la plage grandit. Quelle utilisation des sources est la mieux justifiée?",
      "S'appuyer sur le relevé : ses mesures sur vingt ans montrent le changement et son explication par les dépôts nomme un processus qui correspond aux formes de relief de dépôts de la plage",
      ["S'appuyer sur le dépliant : un énoncé imprimé sur la plage elle-même l'emporte sur des mesures prises par des étrangers sur vingt ans",
       "Utiliser les deux également : chaque source imprimée compte autant, qu'elle donne des mesures ou non",
       "N'utiliser aucune des deux : une plage qui grandit ne peut être expliquée par aucun processus connu, donc le rapport devrait seulement la décrire"],
      "Rechercher veut dire peser les sources selon ce qu'elles peuvent soutenir. Le relevé apporte des mesures répétées sur vingt ans et un processus, la formation de dépôts par les courants littoraux, qui correspond à la famille de la forme de relief. Le dépliant affirme sans mesure et contredit le changement mesuré. Une explication de rapport s'appuie sur la source mesurée et nomme le processus qu'elle documente.",
      {});
  }
]), ["Demande ce que chaque source peut réellement soutenir : des mesures et un processus, ou une affirmation sans mesure?", "Le changement mesuré a besoin d'un processus mesuré pour l'expliquer."]);

/* Exclusion de la composition : la question de conception de recherche
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composés. */
var NO_COMPOSE_U1 = { "s8f-u1-cr-design-salinity": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U1[e.id]) { e.noCompose = true; } });
