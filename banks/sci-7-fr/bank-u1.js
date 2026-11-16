// CRMARKS: s7f-u1-cr-factor-effect=2
// CRMARKS: s7f-u1-cr-three-interactions=3
// CRMARKS: s7f-u1-cr-web-change=3
// CRMARKS: s7f-u1-cr-energy-flow=3
// CRMARKS: s7f-u1-cr-recycling=2
// CRMARKS: s7f-u1-cr-succession-compare=2
// CRMARKS: s7f-u1-cr-web-interpret=3
// CRMARKS: s7f-u1-cr-silviculture=2
// CRMARKS: s7f-u1-cr-harvest-decision=3
// CRMARKS: s7f-u1-cr-boreal-example=3
// CRMARKS: s7f-u1-cr-habitat-defence=3
// CRMARKS: s7f-u1-cr-design-experiment=4
// CRMARKS: s7f-u1-cr-data-display=3
// CRMARKS: s7f-u1-cr-defend-position=3
// CRMARKS: s7f-u1-cr-succession-stages=2
// Sciences 7, Unité 1 : Les interactions au sein des écosystèmes
// (SC7.1.1 à SC7.3.13), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Honnêteté de couverture : SC7.3.5 (Travailler en collaboration avec des
// membres d'une équipe) est NONE pour ce format et ne porte aucune question,
// par choix, selon le précédent de l'indicateur anglais correspondant.
// Résidu CORE : les questions de SC7.3.3 évaluent le choix d'instruments, le
// format de consignation et le jugement sur un plan de consignation; elles
// n'évaluent pas la prise de mesures sur le terrain. Les questions de SC7.3.4
// évaluent le choix et le jugement d'un format de communication à l'écrit;
// elles n'évaluent pas la communication orale ni la production de la
// communication elle-même. Les questions de SC7.3.6 évaluent les connaissances
// sur l'évaluation des processus de groupe; elles n'évaluent pas l'évaluation
// de son propre groupe par l'élève. Les questions de SC7.3.8 évaluent la
// conception d'expériences; la réalisation est un travail de classe.
// Symbiose : contrairement à la banque anglaise, la symbiose est nommée et
// évaluée comme telle à SC7.1.4 (mutualisme, commensalisme, parasitisme),
// parce que le guide français la définit à cet endroit.

/* Données des réseaux alimentaires pour la famille F4 (les lettres suivent l'ordre des nœuds). */
var S7F_WEB_POND = {
  nodes: [
    { n: "Algues", x: 90, y: 340 }, { n: "Quenouille", x: 250, y: 350 },
    { n: "Puce d'eau", x: 130, y: 215 }, { n: "Escargot", x: 300, y: 225 },
    { n: "Méné", x: 330, y: 105 }, { n: "Libellule", x: 480, y: 235 },
    { n: "Grenouille", x: 500, y: 105 }, { n: "Héron", x: 610, y: 60 }
  ],
  links: [[0, 2], [0, 3], [1, 3], [2, 4], [2, 5], [4, 6], [4, 7], [5, 6], [6, 7]]
};
var S7F_WEB_FOREST = {
  nodes: [
    { n: "Herbe", x: 80, y: 340 }, { n: "Sapin baumier", x: 250, y: 350 },
    { n: "Lièvre", x: 140, y: 205 }, { n: "Écureuil", x: 330, y: 215 },
    { n: "Orignal", x: 480, y: 330 }, { n: "Martre", x: 470, y: 200 },
    { n: "Hibou", x: 560, y: 95 }, { n: "Lynx", x: 300, y: 80 }
  ],
  links: [[0, 2], [0, 4], [1, 4], [1, 3], [2, 7], [2, 6], [3, 5], [3, 6], [5, 7]]
};
var S7F_WEB_MEADOW = {
  nodes: [
    { n: "Herbe", x: 80, y: 340 }, { n: "Trèfle", x: 240, y: 350 },
    { n: "Sauterelle", x: 150, y: 210 }, { n: "Souris", x: 330, y: 225 },
    { n: "Abeille", x: 430, y: 330 }, { n: "Grenouille", x: 460, y: 200 },
    { n: "Serpent", x: 540, y: 95 }, { n: "Faucon", x: 330, y: 75 }
  ],
  links: [[0, 2], [0, 3], [1, 2], [1, 4], [2, 5], [2, 3], [5, 6], [3, 6], [3, 7], [6, 7]]
};
function s7fWebQ(web) { return s7fWebSVG(web.nodes, web.links); }

/* ---------- SC7.1.1 Facteurs biotiques et abiotiques ---------- */
E("s7f-u1-factor-classify", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Une élève énumère les éléments d’une tourbière : mousse de sphaigne, mouches noires, sarracénies et eau acide. Quel élément est un facteur abiotique?", "L’eau acide de la tourbière", ["La mousse de sphaigne verte", "Les mouches noires actives", "Les sarracénies en fleurs"], "Les facteurs abiotiques sont les éléments non vivants d’un écosystème. L’eau acide est non vivante, tandis que la mousse, les mouches et les sarracénies sont des organismes vivants, donc des facteurs biotiques.", {});
  },
  function () {
    return mcq("Un élève énumère les éléments d’un rivage rocheux : varech, balanes, goélands et embruns salés. Quel élément est un facteur abiotique?", "Les embruns salés du rivage", ["Le varech brun des rochers", "Les balanes fixées aux roches", "Les goélands sur les falaises"], "Les embruns salés sont non vivants : c’est un facteur abiotique. Le varech, les balanes et les goélands sont vivants, donc ce sont des facteurs biotiques.", {});
  }
]), ["Biotique veut dire vivant. Élimine d’abord tout élément qui est vivant.", "Un seul élément de la liste n’est pas vivant. C’est le facteur abiotique."]);
E("s7f-u1-factor-local", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Lequel des éléments suivants est un facteur abiotique dans un écosystème de landes de Terre-Neuve-et-Labrador?", "Un vent fort et desséchant", ["Des caribous qui broutent le lichen", "Des plants de plaquebière étalés", "Des lièvres arctiques au crépuscule"], "Le vent est non vivant : c’est un facteur abiotique. Les caribous, les plants et les lièvres sont des organismes vivants, donc des facteurs biotiques.", {});
  },
  function () {
    return mcq("Lequel des éléments suivants est un facteur biotique dans un écosystème d’étang?", "Des marcheurs d’eau sur la surface", ["La lumière du soleil dans l’eau peu profonde", "Le gravier au fond de l’étang", "La pluie qui alimente l’étang"], "Les marcheurs d’eau sont des insectes vivants : c’est un facteur biotique. La lumière, le gravier et la pluie sont non vivants, donc abiotiques.", {});
  }
]), ["Classe d’abord chaque choix : vivant ou non vivant.", "La question demande un seul type; trois choix sont de l’autre type."]);
E("s7f-u1-tolerance-curve", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre comment la santé d’une population d’ombles de fontaine varie selon la température de l’eau. Entre quelles températures la population est-elle en meilleure santé?", "Entre 10 °C et 16 °C", ["Entre 4 °C et 10 °C", "Entre 16 °C et 22 °C", "Entre 4 °C et 22 °C"], "La partie supérieure et plate de la courbe est l’intervalle optimal, où la population est en meilleure santé : de 10 °C à 16 °C. À l’extérieur, la courbe descend dans l’intervalle de tolérance, puis vers l’intervalle d’échec à chaque extrémité.", {}); q.figure = s7fTolCurveSVG({ lo: 4, optLo: 10, optHi: 16, hi: 22 }); return q;
  },
  function () {
    var q = mcq("Le graphique montre comment la santé d’une population de capelans varie selon la température de l’eau. À quelle température la population survit-elle, mais subit-elle le plus grand stress?", "À 19 °C, près de la limite chaude", ["À 12 °C, au centre de l’intervalle optimal", "À 8 °C, bien à l’intérieur de la tolérance", "À 15 °C, juste au-dessus de l’optimal"], "Le stress est le plus grand près des extrémités de l’intervalle de tolérance, où la courbe est tombée près de l’échec, mais où la population survit encore. À 19 °C, la courbe est basse sans avoir atteint le point d’échec.", {}); q.figure = s7fTolCurveSVG({ lo: 2, optLo: 9, optHi: 14, hi: 20 }); return q;
  }
]), ["Repère d’abord le sommet plat de la courbe; c’est là que la population se porte le mieux.", "Les extrémités de la courbe forment l’intervalle d’échec. Juste à l’intérieur se trouve la partie de tolérance où le stress est élevé."]);
E("s7f-u1-cr-factor-effect", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    return textq("Le niveau d’eau d’un étang baisse pendant un long été sec, et les bords peu profonds s’assèchent complètement. (a) Nomme le facteur abiotique qui a changé. (b) Explique un effet que ce changement pourrait avoir sur les organismes de l’étang. (2 points)", ["le facteur abiotique est l’eau (niveau ou quantité d’eau)", "perte d’habitat peu profond", "les œufs pondus dans les parties peu profondes s’assèchent", "l’eau restante se réchauffe et contient moins d’oxygène"], "<b>Réponse modèle :</b> (a) Le facteur abiotique est l’eau : la quantité d’eau dans l’étang a diminué. (b) Par exemple, les grenouilles et les insectes qui pondent leurs œufs dans les bords peu profonds perdent leur habitat de reproduction quand ces bords s’assèchent, donc moins de jeunes survivent; ou encore, le plus petit volume d’eau se réchauffe et contient moins d’oxygène dissous, ce qui stresse les poissons.<br><br><b>Points d’attribution :</b> 1 point pour avoir nommé l’eau (quantité ou niveau) comme facteur abiotique. 1 point pour un effet sur les organismes, expliqué comme une conséquence du changement.", {});
  },
  function () {
    return textq("On coupe un groupe d’épinettes près d’un jardin scolaire, si bien qu’une parcelle à l’ombre toute la journée est maintenant en plein soleil. (a) Nomme le facteur abiotique qui a changé pour les plantes de la parcelle. (b) Explique un effet que ce changement pourrait avoir sur ces plantes. (2 points)", ["le facteur abiotique est la lumière du soleil (intensité lumineuse)", "les plantes d’ombre sont stressées ou dépérissent", "les plantes de soleil poussent plus vite", "le sol s’assèche plus vite"], "<b>Réponse modèle :</b> (a) Le facteur abiotique est la lumière du soleil : la parcelle reçoit maintenant beaucoup plus de lumière. (b) Par exemple, les plantes adaptées à l’ombre peuvent être stressées et dépérir, tandis que les plantes de soleil poussent plus vite grâce à la lumière supplémentaire pour la photosynthèse; ou encore, le sol exposé s’assèche plus rapidement, donc les plantes manquent d’eau.<br><br><b>Points d’attribution :</b> 1 point pour avoir nommé la lumière du soleil comme facteur abiotique. 1 point pour un effet sur les plantes, expliqué comme une conséquence du changement.", {});
  }
]), ["Sépare d’abord les éléments vivants de l’élément non vivant qui a changé.", "Pour la partie (b), suis la chaîne : le changement modifie une condition, et cette condition compte pour un organisme."]);

/* ---------- SC7.1.2 Interactions entre les facteurs ---------- */
E("s7f-u1-interaction-classify", 1, ["SC7.1.2"], 1, "var", varset([
  function () {
    return mcq("Dans un écosystème local, les vers de terre creusent des tunnels dans le sol et y laissent entrer l’air. C’est un exemple", "d’une interaction biotique-abiotique", ["d’une interaction abiotique-abiotique", "d’une interaction biotique-biotique", "d’un changement qui n’est pas une interaction"], "Classe l’interaction selon les deux facteurs en cause. Le ver de terre est vivant (biotique) et le sol et l’air sont non vivants (abiotiques) : c’est donc une interaction biotique-abiotique.", {});
  },
  function () {
    return mcq("Dans un écosystème local, la lumière du soleil réchauffe la surface d’un lac au printemps. C’est un exemple", "d’une interaction abiotique-abiotique", ["d’une interaction biotique-abiotique", "d’une interaction biotique-biotique", "d’un changement qui n’est pas une interaction"], "La lumière du soleil et l’eau du lac sont toutes les deux non vivantes : c’est une interaction abiotique-abiotique. Nomme toujours chaque facteur avant de décider s’il est vivant.", {});
  },
  function () {
    return mcq("Dans un écosystème local, un lynx chasse un lièvre d’Amérique dans la neige. C’est un exemple", "d’une interaction biotique-biotique", ["d’une interaction biotique-abiotique", "d’une interaction abiotique-abiotique", "d’un changement qui n’est pas une interaction"], "Le lynx et le lièvre sont tous les deux des organismes vivants : c’est une interaction biotique-biotique.", {});
  }
]), ["Nomme les deux facteurs de l’exemple avant de choisir.", "Pour chaque facteur, demande-toi : est-il vivant (biotique) ou non vivant (abiotique)?"]);
E("s7f-u1-pond-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    var q = mcq("Dans le schéma de l’étang, quel numéro d’appel montre une interaction abiotique-abiotique?", "L’appel 1, le soleil sur l’eau", ["L’appel 3, l’oiseau dans l’arbre", "L’appel 4, le poisson et l’insecte", "L’appel 5, les racines dans l’eau"], "L’appel 1 montre la lumière du soleil qui réchauffe la surface de l’étang : la lumière et l’eau sont non vivantes, donc l’interaction est abiotique-abiotique. L’appel 3 réunit deux êtres vivants, l’appel 4 aussi, et l’appel 5 réunit une plante vivante et l’eau.", {}); q.figure = S7F_POND_SVG; return q;
  },
  function () {
    var q = mcq("Dans le schéma de l’étang, quel numéro d’appel montre une interaction biotique-abiotique?", "L’appel 5, les racines dans l’eau", ["L’appel 2, la pluie sur l’étang", "L’appel 3, l’oiseau dans l’arbre", "L’appel 4, le poisson et l’insecte"], "L’appel 5 montre les racines de quenouilles qui absorbent l’eau : une plante vivante interagit avec l’eau non vivante, donc c’est une interaction biotique-abiotique. L’appel 2 ne réunit que des éléments non vivants, et les appels 3 et 4 réunissent deux êtres vivants chacun.", {}); q.figure = S7F_POND_SVG; return q;
  }
]), ["Examine les appels un à la fois et nomme les deux facteurs à chacun.", "Un facteur vivant et un facteur non vivant donnent une interaction biotique-abiotique."]);
E("s7f-u1-cr-three-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return textq("Choisis un écosystème local que tu connais (un étang, une forêt, une tourbière ou ta cour d’école). Donne UN exemple de chaque type d’interaction dans cet écosystème : biotique-abiotique, abiotique-abiotique et biotique-biotique. Étiquette chaque exemple avec son type. (3 points)", ["trois exemples correctement étiquetés, un de chaque type, dans un même écosystème nommé", "grenouille sur une roche chaude (biotique-abiotique)", "vent qui ride l’eau (abiotique-abiotique)", "héron qui attrape un méné (biotique-biotique)"], "<b>Réponse modèle :</b> Pour un étang : biotique-abiotique : une grenouille se tient sur une roche réchauffée par le soleil et prend la chaleur de la roche et de la lumière, qui sont non vivantes. Abiotique-abiotique : le vent souffle sur l’étang et soulève des rides à la surface de l’eau; les deux facteurs sont non vivants. Biotique-biotique : un héron attrape et mange un méné; deux organismes vivants interagissent. Tout écosystème bien connu convient, pourvu que chaque exemple réunisse vraiment les deux sortes de facteurs que son étiquette annonce.<br><br><b>Points d’attribution :</b> 1 point pour un véritable exemple biotique-abiotique, correctement étiqueté. 1 point pour un véritable exemple abiotique-abiotique, correctement étiqueté. 1 point pour un véritable exemple biotique-biotique, correctement étiqueté.", {});
  }
]), ["Choisis un seul écosystème et reste dans celui-ci pour les trois exemples.", "Pour chaque exemple, nomme les deux facteurs à voix haute et étiquette chacun : vivant ou non vivant."]);

/* ---------- SC7.1.3 Interaction biotique-abiotique exploree ---------- */
E("s7f-u1-biotic-abiotic-explore", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("Une grenouille passe la matinée assise sur une roche plate au bord d’un étang, puis retourne à l’eau. Quelle interaction entre un facteur biotique et un facteur abiotique est décrite ici?", "La grenouille prend la chaleur de la roche réchauffée par le soleil", ["La grenouille chasse les insectes qui volent au-dessus de l’étang", "La grenouille pond ses œufs parmi les quenouilles du bord", "La grenouille échappe à un héron en plongeant dans l’eau"], "La grenouille est vivante (biotique) et la roche réchauffée par le soleil est non vivante (abiotique) : leur interaction est biotique-abiotique. Dans les autres choix, les deux facteurs en cause sont vivants.", {});
  },
  function () {
    return mcq("Les racines d’une quenouille absorbent l’eau et les nutriments du fond boueux d’un étang. Cette interaction réunit", "une plante vivante et des éléments non vivants du milieu", ["deux plantes vivantes qui se font concurrence pour l’espace", "deux animaux vivants qui partagent le même habitat calme", "deux éléments non vivants qui se mélangent dans l’étang"], "La quenouille est vivante, tandis que l’eau, la boue et les nutriments dissous sont non vivants : c’est une interaction entre un facteur biotique et des facteurs abiotiques.", {});
  }
]), ["Repère le facteur vivant, puis le facteur non vivant avec lequel il interagit.", "Si les deux facteurs sont vivants, ce n’est pas le type d’interaction demandé."]);
E("s7f-u1-biotic-abiotic-effect", 1, ["SC7.1.3"], 2, "var", varset([
  function () {
    return mcq("Dans une tourbière, l’eau acide ralentit la décomposition, si bien que la matière végétale morte s’accumule au lieu de pourrir. Quel énoncé décrit le mieux cette interaction?", "Un facteur abiotique, l’acidité de l’eau, limite l’activité des décomposeurs vivants", ["Un facteur biotique, la mousse vivante, rend l’eau de la tourbière plus acide", "Deux facteurs abiotiques, l’eau et l’acidité, se combinent sans effet sur le vivant", "Deux facteurs biotiques, les plantes et l’eau, échangent des nutriments dissous"], "L’acidité est une propriété non vivante de l’eau (abiotique), et elle agit sur des organismes vivants, les décomposeurs : c’est une interaction biotique-abiotique dont l’effet est de ralentir la décomposition.", {});
  },
  function () {
    return mcq("Après un hiver très enneigé, la fonte tardive garde un pré froid et détrempé, et les fleurs y fleurissent deux semaines plus tard que d’habitude. Quel énoncé décrit le mieux cette interaction?", "Des facteurs abiotiques, la neige et le froid, retardent la croissance des plantes vivantes", ["Des facteurs biotiques, les fleurs vivantes, font fondre la neige du pré plus tard", "Deux facteurs biotiques, les fleurs et la neige, se disputent la lumière du soleil", "Deux facteurs abiotiques, les fleurs et le froid, changent la date de la fonte"], "La neige, l’eau de fonte et le froid sont non vivants (abiotiques), et ils agissent sur les plantes vivantes : c’est une interaction biotique-abiotique qui retarde la floraison.", {});
  }
]), ["Demande-toi dans quel sens va l’effet : quel facteur agit, et quel facteur le subit?", "Le facteur qui agit ici est non vivant; celui qui est touché est vivant."]);

/* ---------- SC7.1.4 Definir la symbiose ---------- */
E("s7f-u1-symbiosis-define", 1, ["SC7.1.4"], 1, "var", varset([
  function () {
    return mcq("Quelle est la meilleure définition de la symbiose?", "Une relation étroite et durable entre deux organismes d’espèces différentes", ["Une relation passagère entre deux organismes qui se rencontrent une seule fois", "Une relation de chasse entre un prédateur et la proie qu’il mange rapidement", "Une relation entre les membres d’une même espèce qui vivent en groupe"], "La symbiose est une relation étroite qui dure dans le temps entre deux organismes d’espèces différentes. Elle comprend le mutualisme, le commensalisme et le parasitisme.", {});
  },
  function () {
    return mcq("Deux organismes vivent en contact étroit pendant presque toute leur vie, et l’un d’eux au moins en retire un avantage. Cette relation est", "une symbiose entre les deux organismes", ["une concurrence entre les deux organismes", "une prédation entre les deux organismes", "une décomposition entre les deux organismes"], "Un contact étroit et durable entre deux organismes d’espèces différentes, dont au moins un retire un avantage, est une symbiose.", {});
  }
]), ["Pense à la durée : la symbiose est une relation qui dure, pas une rencontre brève.", "Les trois types de symbiose sont le mutualisme, le commensalisme et le parasitisme."]);
E("s7f-u1-symbiosis-types", 1, ["SC7.1.4"], 1, "var", varset([
  function () {
    return mcq("Dans le mutualisme, que retire chaque organisme de la relation?", "Chaque organisme retire un avantage de la relation vécue ensemble", ["Un organisme retire un avantage et l’autre organisme est lésé", "Un organisme retire un avantage et l’autre n’est ni aidé ni lésé", "Aucun organisme ne retire d’avantage de la relation vécue"], "Dans le mutualisme, les deux organismes profitent de la relation. Quand un seul profite et que l’autre est lésé, c’est du parasitisme; quand un seul profite sans nuire à l’autre, c’est du commensalisme.", {});
  },
  function () {
    return mcq("Dans le parasitisme, que retire chaque organisme de la relation?", "Un organisme profite de la relation et l’autre organisme est lésé", ["Chaque organisme retire un avantage de la relation vécue ensemble", "Un organisme retire un avantage et l’autre n’est ni aidé ni lésé", "Aucun organisme ne retire d’avantage de la relation vécue"], "Dans le parasitisme, le parasite profite de la relation aux dépens de son hôte, qui est lésé. Si les deux profitaient, ce serait du mutualisme.", {});
  }
]), ["Pour chaque type, demande-toi : qui profite, et qui est lésé?", "Mutualisme : les deux profitent. Parasitisme : un profite, l’autre est lésé."]);
E("s7f-u1-symbiosis-scenarios", 1, ["SC7.1.4"], 2, "var", varset([
  function () {
    return mcq("Une baleine transporte des balanes fixées à sa peau. Les balanes atteignent ainsi des eaux riches en nourriture; la baleine n’est ni aidée ni lésée. De quel type de symbiose s’agit-il?", "Le commensalisme, car un organisme profite sans nuire à l’autre", ["Le mutualisme, car les deux organismes profitent de la relation", "Le parasitisme, car un organisme profite aux dépens de l’autre", "Le commensalisme, car les deux organismes sont lésés ensemble"], "Les balanes profitent du transport et la baleine n’est ni aidée ni lésée : c’est du commensalisme. Le type se décide par l’effet sur chaque partenaire.", {});
  },
  function () {
    return mcq("Une puce vit sur un chien et se nourrit de son sang. Le chien perd du sang et souffre de démangeaisons. De quel type de symbiose s’agit-il?", "Le parasitisme, car la puce profite aux dépens du chien lésé", ["Le mutualisme, car les deux organismes profitent de la relation", "Le commensalisme, car la puce profite sans nuire à son hôte", "Le parasitisme, car le chien profite aux dépens de la puce"], "La puce (le parasite) profite de la relation et le chien (l’hôte) est lésé : c’est du parasitisme.", {});
  },
  function () {
    return mcq("Les abeilles recueillent le nectar des fleurs de trèfle, et le pollen collé à leur corps atteint d’autres fleurs. De quel type de symbiose s’agit-il?", "Le mutualisme, car les abeilles et le trèfle profitent tous les deux", ["Le commensalisme, car les abeilles profitent sans effet sur le trèfle", "Le parasitisme, car les abeilles profitent aux dépens du trèfle lésé", "Le mutualisme, car le trèfle profite seul de la visite des abeilles"], "Les abeilles obtiennent de la nourriture et le trèfle est pollinisé : les deux partenaires profitent, donc c’est du mutualisme.", {});
  }
]), ["Pour chaque partenaire, décide : aidé, lésé, ou ni l’un ni l’autre?", "La combinaison des deux effets donne le type de symbiose."]);

/* ---------- SC7.1.5 Roles des producteurs, consommateurs et decomposeurs ---------- */
E("s7f-u1-role-identify", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    return mcq("Dans un écosystème de pré, quel organisme joue le rôle de producteur?", "L’herbe qui fabrique sa nourriture par photosynthèse", ["Le campagnol qui mange les graines et les tiges d’herbe", "Le champignon qui décompose l’herbe morte au sol", "Le faucon qui chasse les campagnols au-dessus du pré"], "Les producteurs fabriquent leur propre nourriture par photosynthèse : c’est l’herbe. Le campagnol et le faucon sont des consommateurs, et le champignon est un décomposeur.", {});
  },
  function () {
    return mcq("Dans un écosystème forestier, quel organisme joue le rôle de décomposeur?", "Les bactéries qui décomposent une souche en décomposition", ["L’épinette qui fabrique sa nourriture par photosynthèse", "L’écureuil roux qui mange les graines des cônes d’épinette", "La martre qui chasse les écureuils entre les arbres"], "Les décomposeurs décomposent la matière morte et en libèrent les nutriments : ce sont les bactéries de la souche. L’épinette est un producteur, et l’écureuil et la martre sont des consommateurs.", {});
  }
]), ["Demande-toi comment chaque organisme obtient sa nourriture.", "Producteur : il la fabrique. Consommateur : il mange. Décomposeur : il décompose la matière morte."]);
E("s7f-u1-consumer-types", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    return mcq("Un lièvre d’Amérique mange des brindilles et de l’écorce pendant l’hiver. Le lièvre est", "un consommateur qui se nourrit de plantes", ["un producteur qui fabrique sa propre nourriture", "un décomposeur qui décompose la matière morte", "un consommateur qui se nourrit d’autres animaux"], "Le lièvre mange des plantes : c’est un consommateur (un herbivore). Il ne fabrique pas sa nourriture et il ne décompose pas la matière morte.", {});
  },
  function () {
    return mcq("Un vison chasse des campagnols et des poissons près d’un ruisseau. Le vison est", "un consommateur qui se nourrit d’autres animaux", ["un consommateur qui se nourrit seulement de plantes", "un producteur qui fabrique sa propre nourriture", "un décomposeur qui décompose la matière morte"], "Le vison mange d’autres animaux : c’est un consommateur (un carnivore).", {});
  }
]), ["Regarde le menu : plantes, animaux, ou matière morte?", "Le rôle suit la source de nourriture de l’organisme."]);
E("s7f-u1-niche-reason", 1, ["SC7.1.5"], 2, "var", varset([
  function () {
    return mcq("Pourquoi les décomposeurs sont-ils essentiels au rôle des producteurs dans un écosystème?", "Ils libèrent les nutriments de la matière morte, que les producteurs absorbent ensuite", ["Ils fabriquent la nourriture que les producteurs utilisent directement pour grandir", "Ils mangent les consommateurs qui, autrement, mangeraient tous les producteurs", "Ils fournissent l’oxygène que les producteurs utilisent pour la photosynthèse"], "Les décomposeurs décomposent les organismes morts et les déchets, et libèrent leurs nutriments dans le sol. Les producteurs absorbent ces nutriments pour grandir : sans décomposeurs, les nutriments resteraient enfermés dans la matière morte.", {});
  },
  function () {
    return mcq("Un étang contient des algues, des ménés et des bactéries sur les plantes mortes du fond. Quel énoncé décrit correctement les rôles dans cet étang?", "Les algues produisent, les ménés consomment et les bactéries décomposent la matière", ["Les algues consomment, les ménés décomposent et les bactéries produisent la matière", "Les algues décomposent, les ménés produisent et les bactéries consomment la matière", "Les algues produisent, les ménés décomposent et les bactéries consomment la matière"], "Les algues fabriquent leur nourriture par photosynthèse (producteurs), les ménés mangent d’autres organismes (consommateurs), et les bactéries décomposent la matière morte (décomposeurs).", {});
  }
]), ["Suis les nutriments : où vont-ils quand un organisme meurt?", "Chaque rôle se définit par la façon dont l’organisme obtient matière et énergie."]);

/* ---------- SC7.1.6 Classer les organismes ---------- */
E("s7f-u1-classify-set", 1, ["SC7.1.6"], 1, "var", varset([
  function () {
    return mcq("Classe ces organismes d’un marais : quenouille, canard colvert, champignon, héron. Lequel est le décomposeur du groupe?", "Le champignon qui pousse sur le bois mort du marais", ["La quenouille qui pousse au bord de l’eau du marais", "Le canard colvert qui mange les graines du marais", "Le héron qui attrape les poissons dans le marais"], "Le champignon décompose la matière morte : c’est le décomposeur. La quenouille est un producteur, et le canard et le héron sont des consommateurs.", {});
  },
  function () {
    return mcq("Classe ces organismes d’une forêt : sapin baumier, lièvre, moisissure, renard. Lequel est le producteur du groupe?", "Le sapin baumier qui pousse dans la forêt claire", ["Le lièvre qui broute les plantes basses de la forêt", "La moisissure qui pousse sur une bûche morte", "Le renard qui chasse les petits mammifères"], "Le sapin fabrique sa nourriture par photosynthèse : c’est le producteur. Le lièvre et le renard sont des consommateurs, et la moisissure est un décomposeur.", {});
  }
]), ["Classe les quatre organismes un par un avant de répondre.", "Un seul des quatre décompose la matière morte (ou fabrique sa nourriture, selon la question)."]);
E("s7f-u1-classify-set-hard", 1, ["SC7.1.6"], 1, "var", varset([
  function () {
    return mcq("Une sarracénie attire des insectes dans ses feuilles en forme de pichet et les digère. Comment faut-il classer la sarracénie?", "Comme un producteur qui obtient un supplément de nutriments des insectes", ["Comme un consommateur qui obtient toute son énergie des insectes mangés", "Comme un décomposeur qui obtient son énergie de la matière morte digérée", "Comme un consommateur qui obtient ses nutriments sans faire de photosynthèse"], "La sarracénie fait la photosynthèse comme les autres plantes vertes : c’est un producteur. Les insectes digérés lui fournissent des nutriments (surtout de l’azote) qui manquent dans le sol de la tourbière, et non son énergie.", {});
  },
  function () {
    return mcq("Le gui est une plante verte qui pousse sur les branches d’un arbre et absorbe l’eau et les nutriments de son hôte, tout en faisant un peu de photosynthèse. Comment faut-il classer le gui?", "Comme un producteur qui vole des nutriments à un autre producteur vivant", ["Comme un décomposeur qui se nourrit de l’écorce morte de l’arbre hôte", "Comme un consommateur qui mange l’arbre hôte morceau par morceau", "Comme un producteur qui n’a aucun lien avec l’arbre sur lequel il pousse"], "Le gui est vert et fait la photosynthèse : il reste un producteur, même s’il prend l’eau et les nutriments de l’arbre hôte vivant.", {});
  }
]), ["Demande-toi d’abord si l’organisme fait la photosynthèse.", "Un cas inhabituel ne change pas la règle de base du classement."]);
E("s7f-u1-ecosystem-infer", 1, ["SC7.1.6"], 2, "var", varset([
  function () {
    return mcq("On retire tous les décomposeurs d’un écosystème forestier, mais les producteurs et les consommateurs restent. Quelle conséquence apparaîtrait en premier?", "La litière morte s’accumulerait et les nutriments resteraient enfermés dedans", ["Les producteurs cesseraient de faire la photosynthèse dès la première saison", "Les consommateurs cesseraient de manger et mourraient en quelques jours", "Le sol deviendrait plus riche en nutriments dès la première année"], "Sans décomposeurs, les feuilles mortes et les organismes morts ne sont plus décomposés : la litière s’accumule et ses nutriments ne retournent pas au sol pour les producteurs.", {});
  },
  function () {
    return mcq("Un jardin reçoit chaque automne une épaisse couche de compost riche en matière décomposée. Pourquoi les plantes du jardin poussent-elles mieux?", "Le compost rend au sol les nutriments libérés par les décomposeurs du tas", ["Le compost ajoute des consommateurs qui mangent les insectes nuisibles du sol", "Le compost remplace la lumière du soleil dont les plantes ont moins besoin", "Le compost empêche complètement les producteurs de perdre leurs nutriments"], "Le travail des décomposeurs dans le compost libère les nutriments de la matière morte; versés au sol du jardin, ces nutriments sont absorbés par les producteurs, qui poussent mieux.", {});
  }
]), ["Suis le trajet des nutriments quand un maillon du classement disparaît.", "Le classement n’est pas qu’une étiquette : chaque rôle fait un travail dans l’écosystème."]);

/* ---------- SC7.1.7 Energie dans le reseau alimentaire ---------- */
E("s7f-u1-energy-loss", 1, ["SC7.1.7"], 1, "var", varset([
  function () {
    return mcq("Dans un réseau alimentaire, qu’arrive-t-il à la plus grande partie de l’énergie à chaque transfert d’un organisme à celui qui le mange?", "Elle est perdue sous forme de chaleur pendant les activités de l’organisme", ["Elle est emmagasinée entière dans le corps de l’organisme qui le mange", "Elle retourne directement au soleil pour être utilisée une autre fois", "Elle est transformée en nutriments que les décomposeurs utilisent"], "À chaque transfert, la plus grande partie de l’énergie sert aux activités de l’organisme (bouger, garder sa chaleur, grandir) et se perd sous forme de chaleur. Seule une petite partie devient la chair que le mangeur suivant peut utiliser.", {});
  },
  function () {
    return mcq("Pourquoi un réseau alimentaire compte-t-il beaucoup plus de producteurs que de grands prédateurs?", "Parce que l’énergie se perd à chaque transfert, il en reste peu pour les prédateurs", ["Parce que les prédateurs fabriquent leur propre nourriture à partir du soleil", "Parce que les producteurs mangent les prédateurs et gardent leur population basse", "Parce que l’énergie augmente à chaque transfert vers les grands prédateurs"], "L’énergie diminue à chaque maillon, car elle se perd en chaleur. Au sommet, il reste peu d’énergie, ce qui ne peut nourrir que quelques grands prédateurs.", {});
  }
]), ["L’énergie ne se recycle pas comme la matière; elle traverse le réseau une seule fois.", "Pense à ce que l’organisme fait de l’énergie avant d’être mangé."]);
E("s7f-u1-web-removal", 1, ["SC7.1.7"], 3, "var", varset([
  function () {
    var q = mcq("Dans le réseau alimentaire de l’étang, que se passerait-il probablement si les ménés disparaissaient complètement?", "Les grenouilles et les hérons perdraient une proie et devraient se tourner vers d’autres aliments", ["Les puces d’eau disparaîtraient aussi, car les ménés sont leur seule nourriture connue", "Les algues cesseraient de pousser, car les ménés leur fournissent leurs nutriments", "Les libellules deviendraient les seuls prédateurs de tout le réseau de l’étang"], "Les ménés sont une proie des grenouilles et des hérons dans ce réseau : sans eux, ces prédateurs perdent une source de nourriture et doivent compter sur leurs autres proies. Les puces d’eau, elles, seraient libérées d’un prédateur, et non privées de nourriture.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  },
  function () {
    var q = mcq("Dans le réseau alimentaire de la forêt, que se passerait-il probablement si les lièvres disparaissaient complètement?", "Les lynx et les hiboux perdraient une proie importante et leurs populations pourraient diminuer", ["Les épinettes et les sapins disparaîtraient, car les lièvres sont leurs pollinisateurs", "Les orignaux deviendraient la seule proie de tous les prédateurs de la forêt", "Les écureuils cesseraient de manger, car les lièvres leur préparent la nourriture"], "Le lièvre est une proie du lynx et du hibou dans ce réseau. Sa disparition enlève une source importante de nourriture à ces prédateurs, qui peuvent alors diminuer, même s’ils ont d’autres proies.", {}); q.figure = s7fWebQ(S7F_WEB_FOREST); return q;
  }
]), ["Suis les flèches qui partent de l’organisme retiré et celles qui y arrivent.", "La flèche pointe dans le sens du transfert d’énergie : de la proie vers le mangeur."]);
E("s7f-u1-cr-web-change", 1, ["SC7.1.7"], 3, "var", varset([
  function () {
    var q = textq("Dans le réseau alimentaire de l’étang, une maladie fait presque disparaître les grenouilles. Prédis DEUX changements qui pourraient suivre dans le réseau, et explique chacun par les liens du réseau. (3 points)", ["les libellules augmentent, car les grenouilles les mangeaient", "les hérons perdent une proie et mangent plus de ménés", "les ménés subissent plus de prédation de la part des hérons"], "<b>Réponse modèle :</b> Premier changement : les libellules peuvent augmenter, parce que les grenouilles qui les mangeaient ont presque disparu, donc moins de libellules sont capturées. Deuxième changement : les hérons perdent les grenouilles comme proie; ils chassent alors davantage les ménés, dont la population peut diminuer sous cette pression accrue. Chaque prédiction suit un lien précis du réseau : qui mange qui.<br><br><b>Points d’attribution :</b> 1 point pour le premier changement prédit. 1 point pour le deuxième changement prédit. 1 point pour avoir expliqué les deux changements par les liens d’alimentation du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  }
]), ["Choisis deux organismes liés aux grenouilles dans le réseau : une proie et un prédateur.", "Chaque prédiction doit passer par un lien précis : qui mange qui."]);

/* ---------- SC7.1.8 Energie et pyramide ---------- */
E("s7f-u1-chain-order", 1, ["SC7.1.8"], 1, "var", varset([
  function () {
    var q = mcq("Quelle suite place une chaîne alimentaire d’étang dans le bon ordre, du producteur au consommateur du sommet?", "Algues, puis puce d’eau, puis méné, puis héron", ["Puce d’eau, puis algues, puis héron, puis méné", "Héron, puis méné, puis puce d’eau, puis algues", "Méné, puis héron, puis algues, puis puce d’eau"], "Une chaîne alimentaire commence par le producteur (les algues), suivi des consommateurs dans l’ordre où ils se mangent : la puce d’eau mange les algues, le méné mange la puce d’eau, et le héron mange le méné.", {}); q.figure = s7fChainSVG(["Algues", "Puce d’eau", "Méné", "Héron"], false); return q;
  },
  function () {
    var q = mcq("Quelle suite place une chaîne alimentaire de pré dans le bon ordre, du producteur au consommateur du sommet?", "Herbe, puis sauterelle, puis grenouille, puis serpent", ["Sauterelle, puis herbe, puis serpent, puis grenouille", "Serpent, puis grenouille, puis sauterelle, puis herbe", "Grenouille, puis serpent, puis herbe, puis sauterelle"], "La chaîne commence par le producteur (l’herbe), puis chaque consommateur mange le maillon précédent : la sauterelle mange l’herbe, la grenouille mange la sauterelle, et le serpent mange la grenouille.", {}); q.figure = s7fChainSVG(["Herbe", "Sauterelle", "Grenouille", "Serpent"], false); return q;
  }
]), ["Commence toujours par l’organisme qui fabrique sa nourriture.", "Chaque flèche va de l’organisme mangé vers l’organisme qui le mange."]);
E("s7f-u1-energy-transfer", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return mcq("Dans la pyramide d’énergie d’une chaîne alimentaire, pourquoi chaque niveau est-il plus petit que celui du dessous?", "Parce qu’une grande partie de l’énergie se perd en chaleur à chaque transfert", ["Parce que les organismes du sommet fabriquent leur propre énergie au soleil", "Parce que l’énergie des niveaux du bas retourne entière au niveau du haut", "Parce que les organismes du bas mangent ceux qui se trouvent au-dessus d’eux"], "La pyramide rétrécit parce que l’énergie disponible diminue à chaque transfert : la plus grande partie sert aux activités de l’organisme et se perd en chaleur, donc il en reste moins pour le niveau suivant.", {});
  },
  function () {
    return mcq("Une chaîne alimentaire reçoit 10 000 unités d’énergie au niveau des producteurs. Environ combien d’unités restent-elles pour le troisième niveau de consommateurs?", "Environ 10 unités, car il reste à peu près un dixième à chaque transfert", ["Environ 1 000 unités, car il reste à peu près la moitié à chaque transfert", "Environ 5 000 unités, car l’énergie diminue très lentement dans la chaîne", "Environ 10 000 unités, car l’énergie se conserve entière dans la chaîne"], "À chaque transfert, seulement environ un dixième de l’énergie passe au niveau suivant : 10 000, puis 1 000, puis 100, puis environ 10 unités au troisième niveau de consommateurs.", {});
  }
]), ["La forme de la pyramide raconte l’histoire de l’énergie perdue.", "Compte les transferts : producteurs, puis trois niveaux de consommateurs."]);
E("s7f-u1-cr-energy-flow", 1, ["SC7.1.8"], 3, "var", varset([
  function () {
    return textq("Décris comment l’énergie est fournie à une chaîne alimentaire d’un pré et comment elle la traverse, des producteurs jusqu’au consommateur du sommet. Ton explication doit dire d’où vient l’énergie au départ et pourquoi elle diminue le long de la chaîne. (3 points)", ["l’énergie vient de la lumière du soleil, captée par les producteurs pendant la photosynthèse", "l’énergie passe de l’organisme mangé à celui qui le mange", "elle diminue parce qu’une grande partie se perd en chaleur à chaque transfert"], "<b>Réponse modèle :</b> L’énergie entre dans la chaîne par la lumière du soleil : les producteurs du pré, comme l’herbe, la captent pendant la photosynthèse et la transforment en nourriture. Quand un consommateur mange un autre organisme, l’énergie passe de l’organisme mangé à celui qui le mange, maillon par maillon, jusqu’au consommateur du sommet. À chaque transfert, la plus grande partie de l’énergie sert aux activités de l’organisme et se perd sous forme de chaleur; il n’en reste qu’environ un dixième pour le maillon suivant, donc l’énergie disponible diminue tout le long de la chaîne.<br><br><b>Points d’attribution :</b> 1 point pour la source d’énergie (la lumière du soleil captée par les producteurs). 1 point pour le transfert d’un organisme à celui qui le mange, jusqu’au sommet. 1 point pour la diminution de l’énergie, expliquée par les pertes en chaleur à chaque transfert.", {});
  }
]), ["Commence par la source : qui capte l’énergie le premier, et comment?", "Termine par les pertes : où va l’énergie qui n’atteint pas le sommet?"]);

/* ---------- SC7.1.9 Recyclage de la matiere ---------- */
E("s7f-u1-decomposer-role", 1, ["SC7.1.9"], 1, "var", varset([
  function () {
    return mcq("Quel énoncé décrit le mieux le rôle des décomposeurs dans le recyclage de la matière?", "Ils décomposent la matière morte et libèrent ses nutriments dans le sol", ["Ils fabriquent de la nourriture neuve à partir de la lumière du soleil", "Ils mangent les organismes vivants et empêchent leur multiplication", "Ils emmagasinent les nutriments dans leur corps pour toujours"], "Les décomposeurs (champignons, bactéries et autres) décomposent les organismes morts et les déchets. Les nutriments libérés retournent au sol, où les plantes les absorbent : c’est le recyclage de la matière.", {});
  },
  function () {
    return mcq("Après la mort d’un arbre, des champignons poussent sur son tronc pendant des années. Quel rôle ces champignons jouent-ils dans le recyclage de la matière?", "Ils décomposent le bois mort et rendent ses nutriments au sol forestier", ["Ils fabriquent le bois neuf qui remplacera le tronc de l’arbre mort", "Ils protègent le tronc pour qu’il reste intact pendant des siècles", "Ils transforment le bois mort en nourriture pour les grands prédateurs"], "Les champignons sont des décomposeurs : ils décomposent le bois mort lentement et libèrent ses nutriments dans le sol, où d’autres plantes peuvent les utiliser.", {});
  }
]), ["Le recyclage concerne la matière, pas l’énergie : suis les nutriments.", "Qui décompose, et qu’est-ce qui est libéré?"]);
E("s7f-u1-nutrient-cycle", 1, ["SC7.1.9"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma du cycle des nutriments, quelle flèche montre les nutriments qui passent des décomposeurs au sol?", "La flèche D, des décomposeurs vers le sol", ["La flèche A, du sol vers les plantes", "La flèche B, des plantes vers les animaux", "La flèche C, des organismes vers les décomposeurs"], "La flèche D va des décomposeurs au sol : en décomposant la matière morte, les décomposeurs libèrent les nutriments dans le sol. La flèche A montre l’absorption par les plantes, la B le passage aux animaux, et la C l’arrivée de la matière morte chez les décomposeurs.", {}); q.figure = S7F_NUTRIENT_SVG; return q;
  },
  function () {
    var q = mcq("Dans le schéma du cycle des nutriments, quelle flèche montre les plantes qui absorbent les nutriments du sol?", "La flèche A, du sol vers les plantes", ["La flèche B, des plantes vers les animaux", "La flèche C, des organismes vers les décomposeurs", "La flèche D, des décomposeurs vers le sol"], "La flèche A va du sol aux plantes : c’est l’absorption des nutriments par les racines. Les autres flèches montrent les étapes suivantes du cycle.", {}); q.figure = S7F_NUTRIENT_SVG; return q;
  }
]), ["Pars de la case nommée dans la question et suis la flèche dans le bon sens.", "Le cycle tourne : sol, plantes, animaux, décomposeurs, puis retour au sol."]);
E("s7f-u1-cr-recycling", 1, ["SC7.1.9"], 2, "var", varset([
  function () {
    return textq("Un méné meurt dans un étang. Décris le trajet de la matière de son corps jusqu’à ce qu’elle serve de nouveau à une plante de l’étang, en nommant les groupes d’organismes qui participent à chaque étape. (2 points)", ["les décomposeurs (bactéries et champignons) décomposent le corps et libèrent les nutriments dans l’eau et le fond", "les plantes absorbent les nutriments libérés et les utilisent pour grandir"], "<b>Réponse modèle :</b> Après la mort du méné, les décomposeurs, surtout les bactéries et les champignons, décomposent son corps et libèrent les nutriments qu’il contenait dans l’eau et dans les sédiments du fond. Les plantes de l’étang, comme les quenouilles et les algues, absorbent ensuite ces nutriments et les utilisent pour fabriquer leur nouvelle matière : la matière du méné est ainsi recyclée dans l’écosystème.<br><br><b>Points d’attribution :</b> 1 point pour l’étape de décomposition, avec les décomposeurs nommés et les nutriments libérés. 1 point pour l’absorption des nutriments par les plantes, qui les réutilisent.", {});
  }
]), ["Le trajet compte deux grandes étapes : décomposer, puis absorber.", "Nomme les organismes de chaque étape : qui décompose, qui absorbe?"]);

/* ---------- SC7.1.10 Signes de la succession ecologique ---------- */
E("s7f-u1-succession-identify", 1, ["SC7.1.10"], 1, "var", varset([
  function () {
    return mcq("Un champ abandonné est d’abord couvert d’herbes, puis d’arbustes, et enfin de jeunes arbres après plusieurs années. Ce changement graduel est", "la succession écologique dans le champ abandonné", ["la décomposition écologique dans le champ abandonné", "la photosynthèse écologique dans le champ abandonné", "la concurrence écologique dans le champ abandonné"], "Le remplacement graduel et ordonné des communautés d’un site, ici herbes, puis arbustes, puis jeunes arbres, est la succession écologique.", {});
  },
  function () {
    return mcq("Lequel des signes suivants annonce qu’une succession écologique est en cours sur un terrain rocheux dénudé?", "Des lichens et des mousses colonisent la roche et un sol mince commence à se former", ["Des arbres matures couvrent déjà tout le terrain depuis plusieurs générations", "Le terrain reste complètement nu, sans aucun organisme, année après année", "Un étang profond se forme au centre du terrain dès la première saison chaude"], "Les premiers signes de succession sur la roche nue sont les organismes pionniers (lichens et mousses) et le début de la formation du sol : sans sol, les étapes suivantes sont impossibles.", {});
  }
]), ["La succession est un changement d’espèces dans le temps, dans un ordre reconnaissable.", "Cherche le signe qui montre un début de changement, pas un état final."]);
E("s7f-u1-succession-types", 1, ["SC7.1.10"], 2, "var", varset([
  function () {
    return mcq("Un feu de forêt détruit les arbres d’une pente, mais le sol et quelques racines survivent. La repousse qui suit est un exemple de", "succession secondaire, car le sol est déjà présent au départ", ["succession primaire, car tout recommence à partir de la roche nue", "succession secondaire, car elle commence sur une surface sans aucun sol", "succession primaire, car le feu a laissé des racines vivantes dans le sol"], "Quand un sol formé et des organismes survivent à la perturbation, la repousse est une succession secondaire. La succession primaire commence sur une surface sans sol, comme la roche nue.", {});
  },
  function () {
    return mcq("Une coulée de lave refroidie forme une surface de roche neuve, sans sol. Les lichens qui s’y installent commencent une", "succession primaire, car elle commence sur une surface sans sol", ["succession secondaire, car elle commence sur une surface sans sol", "succession primaire, car le sol profond est déjà présent au départ", "succession secondaire, car des racines survivent déjà dans la roche"], "Sans sol au départ, les lichens pionniers amorcent une succession primaire : ils contribuent à former le premier sol.", {});
  }
]), ["Une seule question décide du type : y a-t-il un sol au départ?", "Sol présent : secondaire. Aucun sol : primaire."]);
E("s7f-u1-cr-succession-compare", 1, ["SC7.1.10"], 2, "var", varset([
  function () {
    return textq("Un terrain A est une carrière de roche abandonnée, sans sol. Un terrain B est une forêt rasée par le feu, dont le sol est intact. Compare la succession qui se déroulera sur chaque terrain : dis quel type de succession aura lieu sur chacun et pourquoi l’un des terrains atteindra l’étape forestière beaucoup plus vite que l’autre. (2 points)", ["terrain A : succession primaire, car il n’y a pas de sol; la formation du sol prend très longtemps", "terrain B : succession secondaire, car le sol survit; la repousse est beaucoup plus rapide"], "<b>Réponse modèle :</b> Sur le terrain A, la succession est primaire : elle commence sur la roche nue, sans sol, et les organismes pionniers doivent d’abord contribuer à former un sol, ce qui prend très longtemps avant que des arbustes et des arbres puissent s’installer. Sur le terrain B, la succession est secondaire : le sol, avec ses nutriments et ses graines, a survécu au feu, donc les plantes repoussent vite et l’étape forestière revient beaucoup plus rapidement.<br><br><b>Points d’attribution :</b> 1 point pour le terrain A : succession primaire, liée à l’absence de sol. 1 point pour le terrain B : succession secondaire, liée au sol intact et à la repousse plus rapide.", {});
  }
]), ["Applique le même test aux deux terrains : le sol est-il présent au départ?", "La vitesse de la succession dépend surtout du travail de formation du sol déjà fait ou non."]);

/* ---------- SC7.2.1 Termes scientifiques pertinents ---------- */
E("s7f-u1-term-context", 1, ["SC7.2.1"], 1, "var", varset([
  function () {
    return mcq("Une élève décrit un étang en disant que « les bibittes mangent les plantes vertes ». Quelle reformulation utilise des termes scientifiques pertinents?", "« Les consommateurs se nourrissent des producteurs de l’étang. »", ["« Les petites choses mangent les affaires vertes de l’étang. »", "« Les bibittes dévorent tout le vert qui pousse dans l’étang. »", "« Les créatures grignotent les plantes de l’étang le matin. »"], "Les termes scientifiques pertinents nomment précisément les rôles : les consommateurs se nourrissent des producteurs. Les autres formulations restent vagues ou familières.", {});
  },
  function () {
    return mcq("Pourquoi les scientifiques préfèrent-ils le terme « facteur abiotique » à une expression comme « les choses non vivantes du coin »?", "Parce que le terme scientifique a un sens précis, compris de la même façon par tous", ["Parce que le terme scientifique est plus long et semble plus impressionnant", "Parce que le terme scientifique cache le sens aux personnes non scientifiques", "Parce que le terme scientifique change de sens selon la personne qui l’emploie"], "Un terme scientifique pertinent est choisi pour son sens précis et partagé : tout le monde comprend la même chose, ce qui rend la communication exacte.", {});
  }
]), ["Cherche la formulation où chaque mot a un sens scientifique précis.", "La précision partagée est la raison d’être des termes scientifiques."]);
E("s7f-u1-organization-set", 1, ["SC7.2.1"], 2, "var", varset([
  function () {
    var q = mcq("Dans les schémas, quel panneau montre une COMMUNAUTÉ d’un écosystème de tourbière?", "Le panneau C, le lynx avec les lièvres et les épinettes réunis", ["Le panneau A, un seul lynx montré seul dans son cadre", "Le panneau B, un groupe de lynx de la même espèce", "Le panneau D, la scène complète avec l’étang et le soleil"], "Une communauté réunit toutes les populations d’espèces différentes d’un endroit : le lynx, les lièvres et les épinettes du panneau C. Le panneau A montre un organisme, le B une population, et le D l’écosystème entier, facteurs abiotiques compris.", {}); q.figure = S7F_ORG_SVG; return q;
  },
  function () {
    var q = mcq("Dans les schémas, quel panneau montre une POPULATION de lynx?", "Le panneau B, un groupe de lynx de la même espèce", ["Le panneau A, un seul lynx montré seul dans son cadre", "Le panneau C, le lynx avec les lièvres et les épinettes", "Le panneau D, la scène complète avec l’étang et le soleil"], "Une population est l’ensemble des individus d’une même espèce dans un endroit : les lynx du panneau B. Le panneau A ne montre qu’un organisme.", {}); q.figure = S7F_ORG_SVG; return q;
  }
]), ["Organisme, population, communauté, écosystème : chaque panneau ajoute un niveau.", "La communauté contient plusieurs espèces, mais pas les facteurs abiotiques."]);

/* ---------- SC7.2.2 Le reseau alimentaire comme outil ---------- */
E("s7f-u1-web-chains", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Dans le réseau alimentaire du pré, quelle chaîne alimentaire complète peut-on lire dans le réseau?", "Herbe, puis sauterelle, puis grenouille, puis serpent", ["Trèfle, puis abeille, puis grenouille, puis serpent", "Herbe, puis souris, puis abeille, puis faucon", "Sauterelle, puis herbe, puis souris, puis faucon"], "Une chaîne tirée d’un réseau doit suivre les flèches du transfert d’énergie : l’herbe est mangée par la sauterelle, elle-même mangée par la grenouille, puis par le serpent. Les autres suites brisent au moins un lien réel du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_MEADOW); return q;
  },
  function () {
    var q = mcq("Dans le réseau alimentaire de l’étang, quel organisme est mangé par le héron selon le réseau?", "Le méné et la grenouille sont tous les deux mangés par le héron", ["La puce d’eau et l’escargot sont tous les deux mangés par le héron", "Les algues et les quenouilles sont toutes les deux mangées par le héron", "La libellule et l’escargot sont tous les deux mangés par le héron"], "Les flèches qui arrivent au héron viennent du méné et de la grenouille : ce sont ses proies dans ce réseau. Lire les flèches vers un organisme donne son menu.", {}); q.figure = s7fWebQ(S7F_WEB_POND); return q;
  }
]), ["Un réseau alimentaire contient plusieurs chaînes; suis les flèches une à une.", "Les flèches pointent vers l’organisme qui reçoit l’énergie, donc vers le mangeur."]);
E("s7f-u1-web-predict", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = mcq("Un hiver très doux fait doubler la population de souris dans le pré du réseau. Quelle prédiction est la mieux appuyée par le réseau?", "Les serpents et les faucons auront plus de nourriture, et les sauterelles seront moins mangées par les souris", ["Les abeilles disparaîtront, car les souris mangent tout le trèfle du pré en une saison", "Les grenouilles augmenteront, car les souris sont leur principale source de nourriture", "L’herbe disparaîtra, car les souris sont les seuls consommateurs du réseau entier"], "La souris est une proie du serpent et du faucon, et elle mange l’herbe et les sauterelles. Plus de souris signifie plus de nourriture pour ses prédateurs et une pression différente sur ses proies : le réseau appuie cette prédiction, lien par lien.", {}); q.figure = s7fWebQ(S7F_WEB_MEADOW); return q;
  }
]), ["Pars de la souris : qui la mange, et qu’est-ce qu’elle mange?", "Une bonne prédiction ne suit que des liens qui existent dans le réseau."]);
E("s7f-u1-cr-web-interpret", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = textq("Utilise le réseau alimentaire de la forêt comme outil d’interprétation. (a) Nomme un organisme qui joue à la fois le rôle de proie et de prédateur. (b) Explique ce que le réseau nous apprend sur ce qui arriverait aux écureuils si les martres disparaissaient. (3 points)", ["l’écureuil (ou le lièvre, ou la martre) est à la fois proie et prédateur", "sans martres, les écureuils perdent un prédateur et peuvent augmenter, même si les hiboux les chassent encore"], "<b>Réponse modèle :</b> (a) L’écureuil est à la fois une proie (du hibou et de la martre) et un prédateur (il mange les graines et les jeunes pousses du sapin). Le lièvre et la martre conviennent aussi. (b) Le réseau montre une flèche de l’écureuil vers la martre : la martre mange des écureuils. Sans martres, les écureuils perdent un de leurs prédateurs, donc leur population peut augmenter; le hibou continue toutefois de les chasser, ce que le réseau montre aussi.<br><br><b>Points d’attribution :</b> 1 point pour un organisme correctement nommé comme proie et prédateur. 1 point pour la prédiction sur les écureuils sans les martres. 1 point pour l’explication appuyée sur les liens du réseau.", {}); q.figure = s7fWebQ(S7F_WEB_FOREST); return q;
  }
]), ["Un organisme à la fois proie et prédateur a des flèches qui arrivent et qui partent.", "Pour la partie (b), pars du lien martre et écureuil, puis vérifie les autres prédateurs."]);

/* ---------- SC7.2.3 Sylviculture ---------- */
E("s7f-u1-silviculture-why", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Pourquoi la sylviculture a-t-elle été créée comme domaine de pratiques forestières?", "Parce que le besoin d’un approvisionnement continu en bois exigeait de gérer la repousse des forêts", ["Parce que le besoin de terrains de camping exigeait de dégager de grandes zones forestières", "Parce que le besoin de papier exigeait de remplacer toutes les forêts par des plantations", "Parce que le besoin de routes exigeait de couper les forêts le plus rapidement possible"], "La sylviculture est née du besoin d’un approvisionnement continu en bois : récolter aujourd’hui sans épuiser la forêt de demain exige de planifier la repousse et les soins aux jeunes peuplements.", {});
  },
  function () {
    return mcq("Lequel des énoncés décrit le mieux le but central de la sylviculture?", "Assurer la récolte du bois aujourd’hui tout en garantissant la forêt de demain", ["Assurer la récolte du bois aujourd’hui sans se soucier de la forêt de demain", "Assurer la protection des forêts en interdisant toute récolte de bois partout", "Assurer la conversion des forêts en terres agricoles le plus tôt possible"], "La sylviculture vise l’équilibre : récolter le bois dont la société a besoin tout en renouvelant la forêt pour que l’approvisionnement se poursuive.", {});
  }
]), ["Le mot clé est « continu » : le bois doit être là aujourd’hui et demain.", "Élimine les choix qui sacrifient entièrement un côté de l’équilibre."]);
E("s7f-u1-silviculture-practice", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle des pratiques suivantes relève de la sylviculture?", "Replanter des semis d’épinette sur un parterre de coupe et suivre leur croissance", ["Vendre le bois coupé au plus offrant sans planifier la suite du peuplement", "Brûler les résidus de coupe sans vérifier la repousse naturelle du secteur", "Construire un chemin forestier sans tenir compte des peuplements voisins"], "Replanter et suivre la croissance, c’est prendre soin de la prochaine forêt pendant qu’on récolte l’actuelle : c’est le cœur de la sylviculture.", {});
  },
  function () {
    return mcq("Un gestionnaire forestier réserve des bandes d’arbres non coupés le long d’un ruisseau et replante le secteur récolté. Cette démarche montre", "la sylviculture en action, car la récolte est planifiée avec le renouvellement de la forêt", ["la sylviculture en action, car aucun arbre n’est récolté dans le secteur entier", "une récolte sans sylviculture, car la replantation ne fait pas partie du travail", "une récolte sans sylviculture, car les bandes réservées empêchent toute gestion"], "Planifier la récolte, protéger le ruisseau et replanter : c’est la sylviculture, qui joint la récolte du bois au renouvellement de la forêt.", {});
  }
]), ["Cherche le choix où la récolte s’accompagne de soins à la forêt future.", "La sylviculture ne supprime pas la récolte; elle l’organise."]);
E("s7f-u1-cr-silviculture", 1, ["SC7.2.3"], 2, "var", varset([
  function () {
    return textq("Explique en quoi notre besoin d’un approvisionnement continu en bois a donné lieu à la création de la sylviculture. Ton explication doit nommer le problème que la coupe sans gestion posait et ce que la sylviculture fait différemment. (2 points)", ["sans gestion, la coupe épuise la forêt et l’approvisionnement futur n’est plus garanti", "la sylviculture planifie la récolte et le renouvellement (replantation, soins aux jeunes peuplements) pour que la forêt se régénère"], "<b>Réponse modèle :</b> Le bois sert à la construction, au papier et au chauffage, et ce besoin ne disparaît pas après une récolte. Si l’on coupe sans gérer la repousse, la forêt s’épuise et l’approvisionnement futur n’est plus assuré. La sylviculture répond à ce problème en planifiant ensemble la récolte et le renouvellement : replanter, éclaircir et soigner les jeunes peuplements pour que la forêt se régénère et continue de fournir du bois.<br><br><b>Points d’attribution :</b> 1 point pour le problème nommé (la coupe sans gestion épuise la forêt et menace l’approvisionnement continu). 1 point pour ce que la sylviculture fait différemment (planifier la récolte avec le renouvellement de la forêt).", {});
  }
]), ["Commence par le besoin : le bois doit revenir année après année.", "Nomme ensuite le changement de pratique : récolter et renouveler ensemble."]);

/* ---------- SC7.2.4 Decisions sur les techniques d'exploitation ---------- */
E("s7f-u1-harvest-effects", 1, ["SC7.2.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle des techniques de récolte forestière enlève tous les arbres d’un secteur en une seule opération?", "La coupe à blanc, qui enlève tous les arbres du secteur en une fois", ["La coupe sélective, qui enlève seulement certains arbres choisis du secteur", "La coupe par bandes, qui enlève les arbres d’une bande à la fois du secteur", "La coupe de jardinage, qui enlève quelques arbres dispersés dans le secteur"], "La coupe à blanc enlève tous les arbres d’un secteur en une seule opération. Les autres techniques n’en enlèvent qu’une partie à la fois.", {});
  },
  function () {
    return mcq("Quel est un avantage environnemental souvent associé à la coupe sélective par rapport à la coupe à blanc?", "Une partie du couvert forestier reste en place et continue d’abriter les espèces du secteur", ["Tous les arbres du secteur repoussent en même temps dès la saison suivante", "Le sol du secteur est entièrement exposé au soleil et au vent après la coupe", "Aucun chemin forestier n’est nécessaire pour sortir le bois récolté du secteur"], "En coupe sélective, une partie des arbres demeure : le couvert, l’ombre et une partie de l’habitat persistent, ce qui adoucit les effets sur les espèces du secteur.", {});
  }
]), ["Compare ce qui reste debout après chaque technique.", "L’avantage cherché concerne ce qui est conservé, pas la vitesse de la récolte."]);
E("s7f-u1-harvest-knowledge", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return mcq("Une pente abrupte au sol mince surplombe un ruisseau à truites. Quelle technique de récolte est la plus défendable pour ce secteur?", "La coupe sélective, qui garde un couvert et limite l’érosion du sol mince de la pente", ["La coupe à blanc, qui expose le sol mince de la pente au ruissellement vers le ruisseau", "La coupe par bandes larges, qui dénude la pente entière en quelques passages rapides", "La coupe à blanc suivie d’un brûlage, qui laisse la pente sans protection contre la pluie"], "Sur une pente au sol mince près d’un ruisseau, garder un couvert végétal limite l’érosion et protège l’eau : la coupe sélective est la plus défendable. Les autres choix exposent le sol et menacent le ruisseau.", {});
  },
  function () {
    return mcq("Quel facteur doit peser le plus lourd dans le choix d’une technique de récolte pour un secteur donné?", "Les caractéristiques du secteur, comme la pente, le sol, l’eau et les espèces présentes", ["La vitesse à laquelle les machines peuvent terminer le travail dans le secteur", "La quantité totale de bois que le secteur peut fournir en une seule saison", "La préférence habituelle de l’entreprise, quel que soit le secteur à récolter"], "Une décision avisée part du secteur lui-même : sa pente, son sol, ses cours d’eau et ses espèces déterminent quelle technique cause le moins de dommages tout en récoltant le bois.", {});
  }
]), ["Fais correspondre la technique aux conditions du secteur décrit.", "Une décision avisée compare les avantages et les inconvénients pour ce secteur précis."]);
E("s7f-u1-cr-harvest-decision", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return textq("Une entreprise propose une coupe à blanc sur un secteur plat au sol profond, loin des cours d’eau, où l’épinette repousse vite. Un groupe local s’y oppose et propose de ne rien couper. Prends une décision avisée : choisis une démarche, appuie-la sur UN avantage et UN inconvénient pour l’environnement, et dis ce qui rend ta décision raisonnable malgré l’inconvénient. (3 points)", ["une démarche choisie et tenue jusqu’au bout (par exemple coupe à blanc avec replantation, coupe par bandes, ou coupe sélective)", "un avantage environnemental ou lié à l’approvisionnement, et un inconvénient environnemental, tous deux réels", "une mesure qui réduit l’inconvénient (replantation, bandes tampons, suivi de la repousse)"], "<b>Réponse modèle :</b> Décision : autoriser la récolte par bandes avec replantation immédiate. Avantage : le secteur plat au sol profond, loin des cours d’eau, se prête à une récolte efficace qui maintient l’approvisionnement en bois, et la repousse rapide de l’épinette assure le renouvellement. Inconvénient : même par bandes, la récolte enlève un habitat et expose temporairement le sol. La décision reste raisonnable parce que la replantation immédiate, les bandes non coupées laissées comme abri et le suivi de la repousse réduisent l’inconvénient, tandis que ne rien couper déplacerait simplement la récolte vers un secteur peut-être plus fragile.<br><br><b>Points d’attribution :</b> 1 point pour une décision claire et tenue. 1 point pour un avantage et un inconvénient réels pour l’environnement. 1 point pour la mesure qui rend la décision raisonnable malgré l’inconvénient.", {});
  }
]), ["Une décision avisée ne prétend pas qu’il n’y a aucun inconvénient.", "Nommer une mesure concrète (replanter, laisser des bandes) renforce une décision."]);

/* ---------- SC7.2.5 Ecologie de la foret boreale ---------- */
E("s7f-u1-boreal-practice", 1, ["SC7.2.5"], 1, "var", varset([
  function () {
    return mcq("La compréhension de l’écologie de la forêt boréale a conduit à récolter par parcelles de tailles variées qui imitent les trouées laissées par les feux naturels. Quel effet positif cette méthode cherche-t-elle?", "Conserver une mosaïque d’habitats d’âges différents, comme le fait le feu naturel dans la forêt boréale", ["Éliminer complètement les effets des feux naturels sur la composition de la forêt boréale", "Produire une forêt d’un seul âge et d’une seule essence sur tout le territoire récolté", "Empêcher toute repousse après la récolte afin de garder les parcelles ouvertes longtemps"], "La forêt boréale se renouvelle naturellement par le feu, qui crée des trouées variées. Imiter cette mosaïque conserve des habitats d’âges différents pour les espèces qui en dépendent.", {});
  },
  function () {
    return mcq("Quel exemple montre une méthode d’exploitation forestière influencée par l’écologie de la forêt boréale?", "Laisser des arbres semenciers et des chicots debout dans les parterres de coupe pour la faune", ["Enlever chaque arbre mort ou vivant du parterre pour ne laisser qu’un sol entièrement nu", "Planter une seule essence exotique à croissance rapide sur tous les parterres de coupe", "Récolter sans tenir compte des cycles naturels de feu qui renouvellent la forêt boréale"], "Laisser des arbres semenciers et des chicots (arbres morts debout) imite ce que le feu laisse derrière lui et sert la faune : c’est l’écologie de la forêt boréale appliquée à la récolte.", {});
  }
]), ["Demande-toi ce que le feu naturel laisse derrière lui dans la forêt boréale.", "La méthode cherchée copie un processus naturel au lieu de l’effacer."]);
E("s7f-u1-boreal-effects", 1, ["SC7.2.5"], 2, "var", varset([
  function () {
    return mcq("Pourquoi laisser des bandes de forêt intacte entre les parterres de coupe aide-t-il les espèces de la forêt boréale?", "Parce que ces bandes servent de corridors et de refuges pendant que les parterres coupés repoussent", ["Parce que ces bandes empêchent définitivement toute repousse dans les parterres coupés", "Parce que ces bandes remplacent complètement les habitats des parterres coupés pour toujours", "Parce que ces bandes augmentent la température du sol dans les parterres coupés voisins"], "Les bandes intactes gardent un habitat mature, un abri et des passages pour les espèces pendant la repousse des parterres : c’est un effet positif direct d’une récolte inspirée de l’écologie boréale.", {});
  }
]), ["Pense à ce dont une espèce a besoin pendant les années de repousse.", "Refuge et corridor : les deux mots décrivent le travail des bandes."]);
E("s7f-u1-cr-boreal-example", 1, ["SC7.2.5"], 3, "var", varset([
  function () {
    return textq("Donne UN exemple précis d’une méthode d’exploitation forestière qui découle de notre compréhension de l’écologie de la forêt boréale, et explique l’effet positif de cette méthode sur la forêt. (3 points)", ["un exemple précis (par exemple récolte par parcelles imitant les trouées de feu, arbres semenciers laissés sur place, bandes tampons le long des cours d’eau)", "le lien avec l’écologie boréale (le feu renouvelle la forêt, les espèces dépendent d’habitats d’âges variés)", "l’effet positif expliqué (mosaïque d’habitats, refuges, régénération assurée)"], "<b>Réponse modèle :</b> Exemple : récolter la forêt boréale par parcelles de tailles variées qui imitent les trouées laissées par les feux naturels, en laissant des arbres semenciers debout dans chaque parcelle. Lien avec l’écologie : la forêt boréale se renouvelle par le feu, et ses espèces sont adaptées à une mosaïque de peuplements d’âges différents. Effet positif : la mosaïque est conservée, les arbres semenciers assurent la régénération naturelle, et les espèces gardent des habitats de chaque âge au lieu d’un territoire uniforme.<br><br><b>Points d’attribution :</b> 1 point pour un exemple précis de méthode. 1 point pour le lien avec l’écologie de la forêt boréale. 1 point pour l’effet positif expliqué.", {});
  }
]), ["Choisis une méthode que tu peux décrire en une phrase précise.", "Enchaîne : la méthode copie un processus naturel, donc elle produit un effet précis."]);

/* ---------- SC7.2.6 Carrieres forestieres ---------- */
E("s7f-u1-career-match", 1, ["SC7.2.6"], 1, "var", varset([
  function () {
    return mcq("Qui, dans le domaine forestier, a pour travail de planifier où et comment les arbres seront récoltés et replantés?", "Le technicien forestier qui planifie les récoltes et les replantations du territoire", ["Le conducteur de machinerie qui transporte les billes de bois vers la scierie", "Le cuisinier du camp forestier qui prépare les repas des équipes de récolte", "Le mécanicien d’atelier qui répare les scies et les moteurs des machines"], "La planification des récoltes et des replantations est le travail des techniciens et des forestiers professionnels en gestion forestière.", {});
  },
  function () {
    return mcq("Laquelle des carrières suivantes appartient au domaine de la gestion et de l’exploitation forestières?", "Biologiste de la faune qui étudie les habitats dans les secteurs de récolte forestière", ["Biologiste marin qui étudie les populations de poissons dans les eaux côtières", "Météorologue qui prépare les prévisions du temps pour les bulletins quotidiens", "Architecte qui dessine les plans de bâtiments pour les entreprises de construction"], "Le biologiste de la faune qui travaille sur les habitats des secteurs de récolte fait partie des carrières liées à la gestion forestière.", {});
  }
]), ["Relie chaque carrière au lieu et à l’objet de son travail.", "La carrière cherchée travaille avec la forêt gérée ou récoltée."]);
E("s7f-u1-career-scenario", 1, ["SC7.2.6"], 2, "var", varset([
  function () {
    return mcq("Une personne passe ses journées à mesurer la croissance des jeunes peuplements, à vérifier la repousse après la coupe et à consigner les données pour les plans de gestion. Quelle carrière exerce-t-elle?", "Technicienne forestière chargée du suivi de la repousse des peuplements récoltés", ["Operatrice de machinerie chargée de la coupe des arbres des peuplements matures", "Conductrice de camion chargée du transport des billes vers l’usine de transformation", "Cuisinière de camp chargée des repas des équipes qui travaillent en forêt éloignée"], "Mesurer la croissance, vérifier la repousse et alimenter les plans de gestion : c’est le suivi sylvicole du technicien forestier.", {});
  }
]), ["Les gestes décrits (mesurer, vérifier, consigner) désignent la carrière.", "Ce travail se fait après la coupe, pour la forêt qui revient."]);

/* ---------- SC7.2.7 Defendre un plan d'action pour un habitat ---------- */
E("s7f-u1-habitat-influences", 1, ["SC7.2.7"], 1, "var", varset([
  function () {
    return mcq("Pour défendre la protection de l’habitat local d’un organisme, quel argument repose sur des faits écologiques plutôt que sur une préférence personnelle?", "« Sans les milieux humides du secteur, cette espèce n’a aucun autre lieu où se reproduire près d’ici. »", ["« Je préfère garder ce secteur intact parce que j’aime m’y promener la fin de semaine. »", "« Ce secteur devrait rester intact parce qu’il a toujours été comme cela dans le passé. »", "« Les gens du voisinage aiment ce secteur et ne veulent pas qu’il change du tout. »"], "L’argument écologique nomme un besoin précis de l’espèce (un lieu de reproduction sans solution de rechange) : il peut être vérifié et défendu. Les autres énoncés expriment des préférences ou des habitudes.", {});
  },
  function () {
    return mcq("Quel élément renforce le plus un plan d’action pour protéger l’habitat d’une espèce locale?", "Des observations consignées qui montrent comment l’espèce utilise l’habitat menacé", ["Des opinions recueillies auprès de personnes qui visitent rarement le secteur", "Une pétition signée par des personnes qui ne connaissent pas l’espèce visée", "Une description générale des habitats semblables dans d’autres provinces"], "Un plan défendable s’appuie sur des observations directes de l’espèce dans l’habitat en cause : c’est la preuve que le plan répond à un besoin réel.", {});
  }
]), ["Cherche l’énoncé qui pourrait être vérifié par l’observation.", "Un plan d’action se défend avec des faits sur l’espèce et son habitat."]);
E("s7f-u1-habitat-tradeoffs", 1, ["SC7.2.7"], 2, "var", varset([
  function () {
    return mcq("Un promoteur veut drainer un milieu humide où nichent des canards pour y construire un stationnement. Quel plan d’action protège l’habitat tout en répondant au besoin de stationnement?", "Construire le stationnement sur le terrain sec voisin et conserver le milieu humide intact", ["Drainer le milieu humide et promettre de creuser un étang ailleurs dans quelques années", "Construire le stationnement sur le milieu humide en gardant une petite mare décorative", "Abandonner le stationnement et interdire tout accès du public au secteur entier"], "Déplacer le projet sur le terrain sec répond au besoin de stationnement sans détruire l’habitat de nidification : c’est un plan d’action défendable, car il protège l’habitat visé au lieu de le remplacer plus tard.", {});
  }
]), ["Le bon plan satisfait les deux besoins au lieu d’en sacrifier un.", "Un habitat remplacé plus tard ne protège pas l’espèce maintenant."]);
E("s7f-u1-cr-habitat-defence", 1, ["SC7.2.7"], 3, "var", varset([
  function () {
    return textq("Choisis un organisme local et un habitat dont il dépend. Propose un plan d’action pour protéger cet habitat et défends ton plan avec DEUX raisons fondées sur les besoins de l’organisme. (3 points)", ["un organisme et son habitat nommés, avec le lien de dépendance", "un plan d’action concret (par exemple zone protégée, bande tampon, restriction saisonnière)", "deux raisons liées aux besoins de l’organisme (reproduction, nourriture, abri)"], "<b>Réponse modèle :</b> Organisme et habitat : le pluvier siffleur, qui niche sur les plages de sable et de galets. Plan d’action : fermer la section de plage où les pluviers nichent pendant la saison de nidification, avec des affiches qui expliquent la fermeture. Défense : premièrement, les nids sont posés à même le sol et presque invisibles, donc les marcheurs et les véhicules les détruisent sans le savoir; la fermeture protège directement la reproduction. Deuxièmement, les adultes ont besoin d’un accès tranquille au rivage pour nourrir leurs petits; une plage achalandée les éloigne de leur nourriture.<br><br><b>Points d’attribution :</b> 1 point pour l’organisme, l’habitat et leur lien de dépendance. 1 point pour un plan d’action concret. 1 point pour deux raisons fondées sur les besoins de l’organisme.", {});
  }
]), ["Choisis un organisme dont tu connais un besoin précis (nicher, se nourrir, s’abriter).", "Chaque raison doit répondre à la question : qu’arriverait-il à l’organisme sans ce plan?"]);

/* ---------- SC7.2.8 Groupes qui protegent l'environnement ---------- */
E("s7f-u1-groups-match", 1, ["SC7.2.8"], 1, "var", varset([
  function () {
    return mcq("Une élève fait une recherche sur les personnes et les groupes au Canada qui protègent l’environnement. Laquelle des sources suivantes convient le mieux pour trouver un groupe LOCAL?", "Le site d’un groupe communautaire de protection d’un bassin versant de sa région", ["Le site d’une organisation internationale dont le siège est dans un autre pays", "Un article général sur l’histoire de l’environnement dans le monde entier", "Le catalogue d’un magasin qui vend de l’équipement de plein air au Canada"], "Un groupe communautaire de bassin versant agit localement : c’est une source directe sur les personnes et les groupes de protection près de chez elle.", {});
  },
  function () {
    return mcq("Quel ensemble de sources couvre les niveaux local, national et international demandés pour une recherche sur la protection de l’environnement?", "Un groupe local de rivière, un organisme national canadien et une organisation mondiale", ["Trois groupes locaux de rivière situés dans la même région que l’élève", "Trois organisations mondiales dont les sièges sont dans trois autres pays", "Un groupe local, un magasin de plein air et un bulletin de prévisions météo"], "La recherche couvre trois niveaux : un groupe local, un organisme national et une organisation internationale. Les autres ensembles répètent un seul niveau ou ajoutent des sources hors sujet.", {});
  }
]), ["La recherche demande trois niveaux : local, national et international.", "Vérifie que chaque source parle bien de protection de l’environnement."]);
E("s7f-u1-groups-interest", 1, ["SC7.2.8"], 2, "var", varset([
  function () {
    return mcq("Un groupe national publie un rapport sur la disparition des milieux humides, et un groupe local organise le nettoyage d’un ruisseau. Quel énoncé compare correctement leur travail?", "Le groupe national documente le problème à grande échelle pendant que le groupe local agit directement sur le terrain", ["Le groupe national agit directement sur le terrain pendant que le groupe local documente le problème mondial", "Les deux groupes font exactement le même travail, seulement dans des bureaux de tailles différentes", "Aucun des deux groupes ne s’occupe de protection de l’environnement dans son travail quotidien"], "Les organismes nationaux étudient et signalent les problèmes à l’échelle du pays, tandis que les groupes locaux mènent des actions directes dans leur milieu : les deux niveaux se complètent.", {});
  }
]), ["Compare l’échelle de chaque groupe : le pays entier contre un seul ruisseau.", "Les deux groupes protègent l’environnement, mais pas de la même façon."]);

/* ---------- SC7.3.1 Definir des questions ---------- */
E("s7f-u1-question-identify", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle des questions suivantes porte directement sur un écosystème local et peut guider une exploration sur le terrain?", "« Quels types d’espèces vivent dans le marais derrière l’école ce printemps? »", ["« Pourquoi les marais sont-ils importants pour la planète en général? »", "« Quelle est la plus belle saison pour visiter un marais de la région? »", "« Depuis combien d’années le marais derrière l’école existe-t-il ici? »"], "La question sur les espèces présentes dans ce marais, ce printemps, porte sur un écosystème local précis et se répond par l’observation sur le terrain.", {});
  },
  function () {
    return mcq("Un élève veut formuler une question d’exploration sur l’étang du parc. Laquelle est la mieux définie pour commencer?", "« Quelles espèces d’oiseaux visitent l’étang du parc pendant le mois de mai? »", ["« Qu’est-ce qui rend les étangs intéressants pour les gens du quartier? »", "« Comment les étangs du monde entier changent-ils avec les saisons? »", "« Pourquoi l’étang du parc est-il le plus beau de toute la ville? »"], "La question nomme le lieu (l’étang du parc), le sujet (les espèces d’oiseaux) et la période (mai) : elle est définie et peut guider une exploration.", {});
  }
]), ["Une bonne question d’exploration nomme le lieu et ce qu’on va y observer.", "Élimine les questions d’opinion et les questions trop vastes pour un terrain."]);
E("s7f-u1-question-identify-2", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle des questions suivantes est une question d’exploration sur un écosystème local, et non une question de fait général?", "« Combien d’espèces de plantes poussent le long du sentier de la rivière cette semaine? »", ["« Combien d’espèces de plantes existe-t-il sur la Terre à l’heure actuelle? »", "« Quelle plante apparaît sur le drapeau de la province cette année? »", "« Pourquoi les plantes ont-elles évolué sur la Terre il y a longtemps? »"], "Compter les espèces le long d’un sentier précis, cette semaine, est une exploration locale qu’on peut réaliser par l’observation. Les autres questions sont générales ou historiques.", {});
  }
]), ["Cherche la question à laquelle on répond en allant observer un lieu précis.", "Un lieu et un moment nommés rendent la question locale."]);
E("s7f-u1-question-best", 1, ["SC7.3.1"], 2, "var", varset([
  function () {
    return mcq("Une équipe veut savoir si les oiseaux utilisent davantage le côté ensoleillé ou le côté ombragé d’un boisé. Quelle question d’exploration est la mieux formulée?", "« Combien d’oiseaux observe-t-on de chaque côté du boisé pendant des périodes égales? »", ["« Pourquoi les oiseaux préfèrent-ils certains côtés des boisés en général? »", "« Les oiseaux aiment-ils mieux le soleil ou l’ombre, en fin de compte? »", "« Quels oiseaux vivent dans les boisés de la province cette année? »"], "La question gagnante se mesure : compter les oiseaux des deux côtés pendant des périodes égales donne des données qui répondent directement à ce que l’équipe veut savoir.", {});
  }
]), ["La meilleure question est celle à laquelle des observations comptées peuvent répondre.", "Compare les questions : une seule précise quoi compter et où."]);

/* ---------- SC7.3.2 Delimiter des questions ---------- */
E("s7f-u1-delimit-choose", 1, ["SC7.3.2"], 1, "var", varset([
  function () {
    return mcq("La question « Qu’est-ce qui vit dans la forêt? » est trop vaste pour une exploration. Quelle reformulation la délimite correctement?", "« Quelles espèces d’arbres poussent dans le boisé derrière l’école, sur une parcelle de 10 m sur 10 m? »", ["« Quelles espèces vivent dans les forêts de la province pendant toute l’année en cours? »", "« Pourquoi la forêt derrière l’école est-elle importante pour tout le monde du quartier? »", "« Comment les forêts du Canada ont-elles changé depuis les cent dernières années? »"], "Délimiter, c’est réduire la question à un lieu, un sujet et une étendue qu’une équipe peut vraiment explorer : ici, les arbres d’une parcelle précise du boisé de l’école.", {});
  },
  function () {
    return mcq("Que fait-on quand on délimite une question d’exploration?", "On la réduit à un lieu, un sujet et une étendue qu’on peut vraiment explorer", ["On l’élargit pour couvrir le plus grand nombre de sujets et de lieux possible", "On la transforme en opinion que l’équipe défendra pendant la présentation", "On la remplace par une réponse trouvée dans un livre avant l’exploration"], "Délimiter une question, c’est en fixer les frontières : un lieu précis, un sujet précis et une étendue réalisable.", {});
  }
]), ["Délimiter veut dire rétrécir de façon précise, pas élargir.", "Cherche le lieu, le sujet et l’étendue nommés dans la formulation."]);
E("s7f-u1-delimit-rewrite", 1, ["SC7.3.2"], 2, "var", varset([
  function () {
    return mcq("« Comment les animaux utilisent-ils la rivière? » Quelle version délimitée permettrait une exploration d’une journée?", "« Quels animaux laissent des traces sur la rive boueuse du pont au sentier, entre 9 h et midi? »", ["« Quels animaux ont utilisé les rivières de la région pendant les dix dernières années? »", "« Pourquoi les animaux des rivières sont-ils importants pour les écosystèmes du pays? »", "« Comment chaque animal de la province utilise-t-il l’eau des rivières au printemps? »"], "La version délimitée fixe le lieu (du pont au sentier), la preuve cherchée (les traces) et la période (une matinée) : une équipe peut la réaliser en une journée.", {});
  }
]), ["Une journée d’exploration impose un lieu court et une période courte.", "La preuve observable (les traces) rend la question réalisable."]);

/* ---------- SC7.3.3 Organiser et consigner les donnees ---------- */
E("s7f-u1-instrument-choose", 1, ["SC7.3.3"], 1, "var", varset([
  function () {
    return mcq("Pour mesurer la température de l’eau d’un étang pendant une exploration, quel instrument convient le mieux?", "Un thermomètre plongé dans l’eau à l’ombre pendant quelques minutes", ["Un baromètre posé sur la rive pour mesurer la pression de l’air ambiant", "Une règle graduée tenue au-dessus de l’eau pour estimer sa profondeur", "Un anémomètre tourné vers le vent pour mesurer la vitesse des rafales"], "La température de l’eau se mesure avec un thermomètre placé dans l’eau. Les autres instruments mesurent la pression, une longueur ou le vent.", {});
  },
  function () {
    return mcq("Pour consigner l’étendue d’une flaque de tourbière, quel instrument convient le mieux?", "Un ruban à mesurer étendu le long du plus grand diamètre de la flaque", ["Un thermomètre plongé dans la flaque pour mesurer sa température", "Un hygromètre tenu au-dessus de la flaque pour mesurer l’humidité", "Un baromètre posé près de la flaque pour mesurer la pression d’air"], "Une étendue est une longueur : elle se mesure au ruban à mesurer. Chaque instrument correspond à une grandeur précise.", {});
  }
]), ["Nomme la grandeur à mesurer, puis choisis l’instrument de cette grandeur.", "Un instrument juste donne une mesure exacte et utilisable."]);
E("s7f-u1-record-format", 1, ["SC7.3.3"], 2, "var", varset([
  function () {
    return mcq("Une équipe compte les oiseaux à quatre stations d’un boisé, à trois moments de la journée. Quel format de consignation garde les données organisées et exactes?", "Un tableau avec une ligne par station et une colonne par moment d’observation", ["Un paragraphe rédigé le soir, de mémoire, sur l’ensemble de la journée passée", "Une liste de nombres sans étiquettes, écrite au fur et à mesure des observations", "Un dessin du boisé avec les totaux de la journée inscrits dans un coin du papier"], "Un tableau étiqueté (stations en lignes, moments en colonnes) conserve chaque comptage à sa place : les données restent organisées, exactes et comparables.", {});
  },
  function () {
    return mcq("Pourquoi consigner les mesures au moment même où on les prend, plutôt que le soir de mémoire?", "Parce que les valeurs exactes et les conditions du moment seraient vite oubliées ou confondues", ["Parce que les instruments cessent de fonctionner quand on attend trop longtemps", "Parce que les tableaux remplis sur le terrain comptent double dans les résultats", "Parce que les observations du soir sont toujours considérées comme des opinions"], "Consigner sur-le-champ préserve les valeurs exactes et les conditions (heure, météo) : la mémoire mélange vite les stations et les moments.", {});
  }
]), ["Le bon format associe chaque valeur à son lieu et à son moment.", "Pense à ce qui se perd quand on attend : l’exactitude."]);
E("s7f-u1-record-plan", 1, ["SC7.3.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe mesurera le pH de l’eau à cinq endroits d’un ruisseau. Quel plan de consignation est le plus rigoureux?", "Préparer à l’avance un tableau étiqueté par endroit, avec colonnes pour le pH, l’heure et les conditions", ["Noter les résultats sur des bouts de papier séparés et les rassembler à la fin du trimestre", "Retener la valeur la plus surprenante et la rapporter comme résultat de l’équipe", "Écrire un résumé en phrases complètes après avoir jeté les mesures brutes du terrain"], "Un tableau préparé à l’avance, avec une ligne par endroit et des colonnes pour la mesure, l’heure et les conditions, garantit des données complètes, exactes et comparables.", {});
  }
]), ["Un plan rigoureux se prépare avant de partir, pas après.", "Heure et conditions font partie de la donnée, pas du décor."]);

/* ---------- SC7.3.4 Communiquer ---------- */
E("s7f-u1-communicate-format", 1, ["SC7.3.4"], 1, "var", varset([
  function () {
    return mcq("Une équipe veut communiquer ses résultats de comptage d’oiseaux à la classe. Quel moyen convient le mieux pour montrer les nombres recueillis?", "Un tableau ou un graphique qui présente les comptages par station et par moment", ["Un récit oral qui raconte la journée sans présenter les nombres recueillis", "Une affiche de photos du boisé sans aucun résultat de comptage indiqué", "Une liste de questions que l’équipe aimerait explorer l’année prochaine"], "Des résultats chiffrés se communiquent par un tableau ou un graphique : le lecteur y voit les valeurs et peut les comparer.", {});
  },
  function () {
    return mcq("Pour communiquer un plan d’exploration avant de partir, quel format est le plus utile à l’équipe?", "Une liste claire des étapes, du matériel et des rôles de chaque membre de l’équipe", ["Un long paragraphe qui raconte pourquoi l’équipe aime le sujet choisi", "Un dessin du lieu sans aucune indication des étapes ou du matériel", "Un résumé des résultats obtenus lors d’une exploration de l’an passé"], "Un plan se communique par une liste organisée : étapes, matériel et rôles. Chacun sait quoi faire avant le départ.", {});
  }
]), ["Fais correspondre le format au contenu : des nombres demandent un tableau ou un graphique.", "Communiquer, c’est rendre l’information utilisable par son lecteur."]);
E("s7f-u1-communicate-judge", 1, ["SC7.3.4"], 2, "var", varset([
  function () {
    return mcq("Une équipe présente ses résultats dans un texte continu de deux pages où les mesures sont noyées dans les phrases. Quelle amélioration rendrait la communication nettement meilleure?", "Sortir les mesures dans un tableau étiqueté et garder le texte pour l’interprétation des résultats", ["Allonger le texte à quatre pages pour ajouter encore plus de détails au récit", "Remplacer toutes les mesures par des impressions générales sur la journée passée", "Lire le texte à voix haute à la classe au lieu de le distribuer aux élèves"], "Un tableau étiqueté rend les mesures lisibles et comparables; le texte sert alors à interpréter. Séparer les données de l’interprétation est le cœur d’une bonne communication de résultats.", {});
  }
]), ["Juge la communication du point de vue du lecteur : peut-il retrouver les valeurs?", "Données dans un tableau, sens dans le texte."]);

/* ---------- SC7.3.6 Evaluer les processus de groupe ---------- */
E("s7f-u1-evaluate-criteria", 1, ["SC7.3.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe évalue sa façon de travailler après une exploration. Quel critère évalue vraiment son processus de groupe?", "« Avons-nous réparti les tâches et écouté chaque membre avant de décider ensemble? »", ["« Notre affiche finale est-elle la plus colorée parmi celles de la classe? »", "« Avons-nous obtenu la note la plus élevée parmi les équipes de la classe? »", "« Notre sujet était-il le plus intéressant parmi ceux des autres équipes? »"], "Évaluer un processus de groupe, c’est examiner la façon de travailler : répartition des tâches, écoute et décision partagée. Les autres critères jugent le produit ou le sujet, pas le processus.", {});
  }
]), ["Le processus, c’est comment l’équipe a travaillé, pas ce qu’elle a produit.", "Cherche le critère qui parle des membres et de leurs décisions."]);
E("s7f-u1-evaluate-next-step", 1, ["SC7.3.6"], 3, "var", varset([
  function () {
    return mcq("Après une exploration, une équipe constate qu’une seule personne a pris toutes les mesures pendant que les autres attendaient. Quelle conclusion d’évaluation est la plus utile pour la prochaine fois?", "« Notre répartition des tâches a échoué; la prochaine fois, nous ferons tourner les rôles à chaque station. »", ["« Notre exploration a échoué; la prochaine fois, nous choisirons un sujet beaucoup plus facile. »", "« Notre membre le plus rapide devrait toujours prendre toutes les mesures à chaque station. »", "« Notre équipe devrait éviter d’évaluer son travail pour ne pas décourager ses membres. »"], "Une évaluation utile nomme la faiblesse du processus (la répartition des tâches) et propose un correctif précis pour la prochaine fois : faire tourner les rôles.", {});
  }
]), ["Une bonne évaluation débouche sur un changement précis du processus.", "Le problème décrit est un problème de répartition, pas de sujet."]);

/* ---------- SC7.3.7 Utiliser une cle d'identification ---------- */
E("s7f-u1-key-work", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Une clé d’identification commence ainsi : « 1a. L’oiseau a un long bec pointu... héron. 1b. L’oiseau a un bec court et crochu... aller à 2. » Un spécimen a un bec court et crochu. Que fait-on?", "On suit le choix 1b et on passe à l’étape 2 de la clé d’identification", ["On conclut que le spécimen est un héron et on arrête l’identification", "On recommence la clé au début jusqu’à obtenir un autre résultat final", "On choisit le nom le plus connu parmi ceux de la première étape"], "Dans une clé, chaque étape offre deux choix opposés : on suit celui qui décrit le spécimen. Un bec court et crochu correspond au choix 1b, qui envoie à l’étape 2.", {});
  },
  function () {
    return mcq("À quoi sert une clé d’identification sur le terrain?", "À identifier un organisme en répondant à une suite de choix sur ses caractères observables", ["À mesurer la taille d’un organisme avec une précision de laboratoire reconnue", "À dessiner un organisme en suivant les étapes numérotées du modèle fourni", "À classer les organismes du plus grand au plus petit selon leur taille réelle"], "Une clé d’identification guide une suite de choix entre caractères opposés jusqu’au nom de l’organisme : c’est un outil d’identification, pas de mesure.", {});
  }
]), ["Une clé avance étape par étape; chaque réponse choisit le chemin suivant.", "Le spécimen décide du choix, pas la préférence de l’observateur."]);
E("s7f-u1-key-work-2", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Avec une clé des arbres (1a : feuilles en aiguilles; 1b : feuilles larges; 2a : aiguilles en faisceaux de cinq; 2b : aiguilles une à une), un spécimen à feuilles larges et à écorce qui s’écaille en longues bandes arrive à l’étape des feuilles larges. Que peut-on conclure?", "La clé le dirige vers les étapes des arbres à feuilles larges, où d’autres caractères décideront", ["La clé l’identifie immédiatement comme un pin, car son écorce s’écaille en bandes", "La clé ne peut pas servir, car le spécimen aurait dû avoir des aiguilles fines", "La clé le renvoie au groupe des conifères, car l’écorce compte plus que les feuilles"], "La première étape sépare selon les feuilles : des feuilles larges envoient le spécimen dans la branche des feuillus, où les étapes suivantes (écorce, bourgeons, fruits) décideront du nom.", {});
  }
]), ["Travaille la clé dans l’ordre : la première étape tranche la grande division.", "Un caractère ne peut pas annuler le résultat des étapes précédentes."]);
E("s7f-u1-key-choose", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Un spécimen recueilli ne correspond à aucun des deux choix d’une étape de la clé. Quelle est la démarche la plus rigoureuse?", "Revenir à l’étape précédente et vérifier chaque caractère observé du spécimen", ["Choisir le nom le plus proche et consigner l’identification comme certaine", "Sauter les étapes suivantes et passer directement au dernier nom de la clé", "Rejeter le spécimen et recommencer l’exploration avec un autre organisme"], "Un blocage dans une clé signale presque toujours une observation erronée à une étape antérieure : on revient en arrière et on revérifie chaque caractère avant de continuer.", {});
  }
]), ["Une clé ne se force pas : une impasse signale une erreur d’observation.", "Revérifier vaut mieux que deviner un nom."]);

/* ---------- SC7.3.8 Concevoir une experience ---------- */
E("s7f-u1-variables-identify", 1, ["SC7.3.8"], 1, "var", varset([
  function () {
    return mcq("Une équipe arrose trois groupes de semis avec 50 mL, 100 mL et 150 mL d’eau par semaine et mesure leur croissance. Quelle est la variable indépendante (celle qu’on fait varier)?", "La quantité d’eau donnée à chaque groupe de semis chaque semaine", ["La croissance des semis mesurée à la fin de l’expérience en classe", "La lumière du soleil reçue également par tous les groupes de semis", "La sorte de terre utilisée de la même façon dans tous les groupes"], "La variable indépendante est celle que l’équipe change délibérément : la quantité d’eau. La croissance est la variable mesurée, et la lumière et la terre sont gardées constantes.", {});
  },
  function () {
    return mcq("Dans l’expérience précédente sur les semis, quelles variables doivent rester constantes pour que la comparaison soit juste?", "La lumière, la sorte de terre et le nombre de semis dans chaque groupe étudié", ["La quantité d’eau, la lumière et la croissance mesurée des semis du groupe", "La croissance des semis, la quantité d’eau et la sorte de terre utilisée", "Le nombre de semis, la quantité d’eau et la croissance de chaque groupe"], "Un test juste ne change qu’une variable à la fois : la lumière, la terre et le nombre de semis restent constants, pendant que seule la quantité d’eau varie.", {});
  }
]), ["Variable indépendante : celle qu’on change. Variable dépendante : celle qu’on mesure.", "Tout le reste doit rester pareil, sinon la comparaison n’est pas juste."]);
E("s7f-u1-design-controls", 1, ["SC7.3.8"], 2, "var", varset([
  function () {
    return mcq("Pour tester si la lumière influence la croissance des semis de pois, quelle organisation contrôle correctement les variables?", "Deux groupes de semis identiques, l’un en pleine lumière et l’autre à l’ombre, avec la même eau et la même terre", ["Deux groupes de semis différents, l’un arrosé davantage et placé en pleine lumière du soleil", "Un seul groupe de semis placé près d’une fenêtre, observé pendant une seule semaine de classe", "Deux groupes de semis identiques, l’un avec plus d’eau et plus de lumière que l’autre groupe"], "Un seul facteur change (la lumière) pendant que l’eau, la terre et les semis restent identiques : toute différence de croissance peut alors être attribuée à la lumière.", {});
  }
]), ["Compte les différences entre les groupes : il ne doit y en avoir qu’une.", "Si deux choses changent à la fois, on ne peut pas savoir laquelle a agi."]);
E("s7f-u1-cr-design-experiment", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return textq("Conçois une expérience pour vérifier cette question : « Les semis de haricot poussent-ils plus vite dans un sol de tourbière ou dans un sol de jardin? » Décris (a) ton hypothèse, (b) la variable que tu feras varier, (c) la variable que tu mesureras, (d) deux variables que tu garderas constantes et (e) comment tu décideras si tes données appuient ton hypothèse. (4 points)", ["une hypothèse vérifiable qui compare la croissance dans les deux sols", "variable indépendante : la sorte de sol (tourbière ou jardin)", "variable dépendante : la croissance mesurée (par exemple la hauteur après un nombre fixe de jours)", "deux constantes (même eau, même lumière, même nombre et sorte de graines, même température)", "une règle de décision (comparer les hauteurs moyennes des deux groupes)"], "<b>Réponse modèle :</b> (a) Hypothèse : les semis de haricot poussent plus vite dans le sol de jardin, car il contient plus de nutriments disponibles. (b) Variable indépendante : la sorte de sol, tourbière ou jardin. (c) Variable dépendante : la hauteur des semis après 14 jours, mesurée en millimètres. (d) Constantes : la même quantité d’eau chaque jour, la même lumière, la même température, la même sorte et le même nombre de graines par pot, et des pots identiques. (e) Décision : je compare la hauteur moyenne des deux groupes; si le groupe du sol de jardin est nettement plus haut, les données appuient l’hypothèse, sinon elles la réfutent.<br><br><b>Points d’attribution :</b> 1 point pour une hypothèse vérifiable. 1 point pour la variable indépendante et la variable dépendante correctement identifiées. 1 point pour deux constantes pertinentes. 1 point pour une règle de décision fondée sur la comparaison des résultats.", {});
  }
]), ["Une expérience complète tient en cinq morceaux : hypothèse, variable variée, variable mesurée, constantes, décision.", "La règle de décision se formule avant de voir les résultats."]);

/* ---------- SC7.3.9 Tableaux de donnees ---------- */
E("s7f-u1-table-choose", 1, ["SC7.3.9"], 1, "var", varset([
  function () {
    return mcq("Une équipe a compté les canards sur un étang chaque matin pendant une semaine. Quel tableau présente correctement ces données?", "Un tableau avec un titre, une colonne pour le jour et une colonne pour le nombre de canards", ["Un tableau avec un titre, une colonne pour le jour et une colonne pour la météo prévue", "Un tableau sans titre, avec les nombres de canards écrits sans les jours correspondants", "Un tableau avec une colonne pour le jour et les nombres remplacés par des impressions"], "Un bon tableau de données a un titre et des colonnes étiquetées qui associent chaque valeur à son jour : c’est ce qui rend les données lisibles et comparables.", {});
  },
  function () {
    return mcq("Que doit contenir l’en-tête de chaque colonne d’un tableau de données?", "Le nom de la grandeur consignée et son unité, quand elle en a une", ["Le nom de l’élève qui a recueilli les données de cette colonne précise", "La couleur utilisée pour écrire les valeurs de la colonne entière", "Le numéro de la page du cahier où la colonne a été recopiée"], "L’en-tête nomme la grandeur (et son unité) : le lecteur sait immédiatement ce que chaque colonne contient.", {});
  }
]), ["Un tableau se juge à sa lecture : titre, étiquettes, unités.", "Chaque valeur doit rester attachée à son jour et à sa grandeur."]);
E("s7f-u1-graph-interpret", 1, ["SC7.3.9"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre la hauteur moyenne des arbres d’un parterre replanté, mesurée chaque année après la récolte. Quelle lecture du graphique est correcte?", "La hauteur augmente chaque année, et la croissance est plus rapide dans les dernières années montrées", ["La hauteur diminue chaque année, car les arbres perdent leurs feuilles chaque automne", "La hauteur reste exactement la même pendant toutes les années montrées au graphique", "La hauteur augmente seulement la première année, puis les arbres cessent de grandir"], "La courbe monte d’année en année et sa pente s’accentue : la croissance se poursuit et s’accélère sur la période montrée.", {}); q.figure = s7fGrowthSVG([0, 1, 2, 3, 4, 5], [0.3, 0.7, 1.4, 2.6, 4.2, 6.1]); return q;
  }
]), ["Lis la pente : monte-t-elle, descend-elle, reste-t-elle plate?", "Une pente qui s’accentue signifie une croissance qui s’accélère."]);
E("s7f-u1-cr-data-display", 1, ["SC7.3.9", "SC7.1.10"], 3, "var", varset([
  function () {
    return textq("Une équipe a compté les arbustes sur une ancienne terre agricole pendant cinq ans : année 1, 2 arbustes; année 2, 5; année 3, 11; année 4, 19; année 5, 30. (a) Présente ces données dans un tableau organisé. (b) Décris la tendance que montrent les données. (c) Relie cette tendance à la succession écologique. (3 points)", ["un tableau avec titre et colonnes étiquetées (année, nombre d’arbustes)", "la tendance : le nombre d’arbustes augmente chaque année, de plus en plus vite", "le lien : les arbustes colonisent l’ancienne terre, une étape de la succession vers la forêt"], "<b>Réponse modèle :</b> (a) Tableau intitulé « Nombre d’arbustes sur l’ancienne terre agricole » : colonne 1, Année (1 à 5); colonne 2, Nombre d’arbustes (2, 5, 11, 19, 30). (b) Tendance : le nombre d’arbustes augmente chaque année, et l’augmentation s’accélère (de 3, puis 6, puis 8, puis 11 arbustes de plus). (c) Lien : l’ancienne terre, d’abord herbacée, est colonisée par les arbustes : c’est une étape de la succession écologique qui mène graduellement vers un peuplement d’arbustes puis d’arbres.<br><br><b>Points d’attribution :</b> 1 point pour un tableau organisé avec titre et en-têtes. 1 point pour la tendance correctement décrite. 1 point pour le lien avec la succession écologique.", {});
  }
]), ["Le tableau d’abord : titre, colonnes étiquetées, valeurs dans l’ordre.", "Pour la tendance, regarde comment les écarts entre les années évoluent."]);

/* ---------- SC7.3.10 Defendre une position ---------- */
E("s7f-u1-position-support", 1, ["SC7.3.10"], 2, "var", varset([
  function () {
    return mcq("Une élève défend la position « Il faut protéger le milieu humide derrière l’école ». Laquelle de ses phrases appuie sa position sur une découverte de son exploration?", "« Nous y avons compté six espèces d’oiseaux nicheurs et des centaines de têtards ce printemps. »", ["« Tout le monde sait que les milieux humides sont importants pour la nature en général. »", "« Le milieu humide est mon endroit préféré pour observer les oiseaux après les cours. »", "« Un article dit que les milieux humides disparaissent dans plusieurs pays du monde. »"], "Une position défendue à partir de découvertes s’appuie sur les données de sa propre exploration : les comptages d’oiseaux nicheurs et de têtards observés sur place.", {});
  }
]), ["La défense demandée repose sur des découvertes, donc sur des observations faites.", "Distingue les données recueillies des opinions et des généralités."]);
E("s7f-u1-cr-defend-position", 1, ["SC7.3.10"], 3, "var", varset([
  function () {
    return textq("Une entreprise veut assécher un marais pour agrandir un terrain industriel. Ton équipe a exploré ce marais pendant un mois. Défends la position « Il faut conserver le marais » en t’appuyant sur DEUX découvertes précises qu’une exploration peut produire, et réponds à UN argument de l’entreprise. (3 points)", ["deux découvertes précises (par exemple des espèces nicheuses comptées, des amphibiens observés, le rôle du marais dans le contrôle des crues observé après une pluie)", "une réponse à un argument de l’entreprise (par exemple l’emploi ou le terrain, traitée par une solution de rechange ou une limite du projet)"], "<b>Réponse modèle :</b> Position : il faut conserver le marais. Découverte 1 : pendant notre exploration, nous avons compté des nids de canards et entendu des grenouilles à chaque visite; le marais est un lieu de reproduction actif, pas un terrain vide. Découverte 2 : après la grosse pluie du printemps, le marais a retenu l’eau pendant des jours pendant que le fossé voisin débordait; il protège les terrains voisins des inondations. Réponse à l’entreprise : l’agrandissement peut se faire sur le terrain déjà défriché au nord du site, ce qui donne l’espace voulu sans détruire un habitat de reproduction ni la protection contre les crues.<br><br><b>Points d’attribution :</b> 1 point pour la première découverte précise à l’appui de la position. 1 point pour la deuxième découverte précise. 1 point pour une réponse raisonnable à un argument de l’entreprise.", {});
  }
]), ["Une découverte précise se compte ou s’observe : espèces, nids, eau retenue.", "Répondre à l’argument adverse renforce une défense au lieu de l’affaiblir."]);

/* ---------- SC7.3.11 Limites des modeles ---------- */
E("s7f-u1-limits-chains", 1, ["SC7.3.11"], 1, "var", varset([
  function () {
    return mcq("Laquelle des affirmations suivantes nomme une limite réelle d’une chaîne alimentaire comme représentation d’un écosystème?", "Elle montre un seul trajet d’alimentation, alors que la plupart des organismes mangent plusieurs proies différentes", ["Elle montre les organismes dans un ordre fixe, alors que les chaînes changent à chaque saison de l’année", "Elle utilise des flèches, alors que les scientifiques préfèrent toujours des tableaux pour ce travail", "Elle nomme les organismes, alors qu’un bon modèle ne devrait jamais nommer les espèces représentées"], "Une chaîne alimentaire ne trace qu’un seul trajet : elle ne peut pas montrer qu’un organisme mange plusieurs proies et sert de proie à plusieurs prédateurs. C’est la limite que le réseau alimentaire corrige en partie.", {});
  },
  function () {
    return mcq("Laquelle des affirmations suivantes nomme une limite réelle d’une pyramide d’énergie?", "Elle montre l’énergie à un moment donné, mais pas les changements du réseau au fil des saisons", ["Elle montre les niveaux dans le mauvais ordre, avec les producteurs placés au sommet du schéma", "Elle oblige à connaître le nom de chaque espèce avant de pouvoir la dessiner correctement", "Elle remplace les nombres par des dessins, ce qui la rend inutilisable pour les scientifiques"], "Une pyramide d’énergie fige une situation : les populations et les transferts changent avec les saisons, ce que la pyramide seule ne montre pas.", {});
  }
]), ["Une limite est ce que le modèle ne peut pas montrer, même bien dessiné.", "Compare le modèle à la réalité : qu’est-ce qui manque?"]);
E("s7f-u1-limits-webs", 1, ["SC7.3.11"], 2, "var", varset([
  function () {
    return mcq("Un réseau alimentaire bien dessiné reste un modèle limité. Laquelle de ses limites est la plus importante pour interpréter un écosystème réel?", "Il ne montre ni la taille des populations ni la quantité d’énergie qui passe par chaque lien du réseau", ["Il ne montre pas la couleur réelle des organismes qui composent le réseau alimentaire dessiné", "Il ne classe pas les organismes par ordre alphabétique dans les cases du réseau alimentaire", "Il ne précise pas le nom de la personne qui a dessiné le réseau alimentaire la première fois"], "Un réseau montre les liens, mais pas leur poids : sans la taille des populations ni les quantités d’énergie, on ne peut pas savoir quels liens comptent le plus dans l’écosystème réel.", {});
  }
]), ["Les liens sont montrés; leurs quantités ne le sont pas.", "Une limite importante change l’interprétation, pas seulement l’apparence."]);

/* ---------- SC7.3.12 Predire l'avenir d'un ecosysteme ---------- */
E("s7f-u1-future-predict", 1, ["SC7.3.12"], 2, "var", varset([
  function () {
    return mcq("Une région côtière au climat froid, couverte de landes et de petits étangs, connaît des étés de plus en plus chauds et secs. Quelle prédiction sur son écosystème futur est la mieux fondée sur ses caractéristiques actuelles?", "Les étangs peu profonds s’assécheront plus souvent et les espèces qui en dépendent déclineront dans la région", ["Les landes deviendront une forêt tropicale dense dès que les étés auront durci quelques années", "Les étangs deviendront plus profonds, car la chaleur augmente toujours la quantité d’eau présente", "Aucun changement ne se produira, car les écosystèmes restent toujours identiques à eux-mêmes"], "Une prédiction fondée part des caractéristiques actuelles (étangs peu profonds, climat qui se réchauffe et s’assèche) et suit leurs conséquences : des assèchements plus fréquents et un déclin des espèces qui dépendent de ces étangs.", {});
  },
  function () {
    return mcq("Un lac nordique peu profond est entouré de forêts de conifères. Si les hivers deviennent plus courts et plus doux pendant des décennies, quelle prédiction est la mieux fondée?", "La glace couvrira le lac moins longtemps, ce qui changera les conditions des espèces adaptées au long hiver", ["Le lac se transformera en désert, car les hivers doux éliminent toute l’eau des lacs nordiques", "Les conifères deviendront des arbres tropicaux en quelques années seulement après le changement", "Les espèces du lac resteront inchangées, car seuls les étés comptent pour les écosystèmes lacustres"], "Des hivers plus courts signifient une couverture de glace plus brève : les espèces adaptées au long hiver (périodes de lumière, de froid et de reproduction) verront leurs conditions changer.", {});
  }
]), ["Une prédiction fondée suit les caractéristiques données, sans les exagérer.", "Élimine les choix qui contredisent les faits de départ ou qui sautent les étapes."]);
E("s7f-u1-future-predict-2", 1, ["SC7.3.12"], 3, "var", varset([
  function () {
    return mcq("Une tourbière reçoit de moins en moins de pluie, année après année, et son niveau d’eau baisse lentement. Quelle description de la tourbière dans quelques décennies est la plus plausible?", "La mousse de sphaigne reculera sur les bords asséchés et des arbustes adaptés aux sols plus secs s’y installeront", ["La tourbière deviendra un lac profond, car les mousses retiendront de plus en plus d’eau chaque année", "La tourbière restera exactement la même, car les tourbières ne changent jamais avec le climat régional", "Des arbres tropicaux coloniseront la tourbière dès que le niveau d’eau aura baissé de quelques centimètres"], "Moins de pluie et un niveau d’eau qui baisse assèchent les bords de la tourbière : la sphaigne, qui exige l’humidité, recule, et des arbustes de sols plus secs peuvent s’installer. La prédiction suit graduellement les conditions décrites.", {});
  }
]), ["Projette le changement donné (moins d’eau) sur les organismes qui en dépendent le plus.", "Une bonne prédiction est graduelle et reste dans le même type de milieu."]);

/* ---------- SC7.3.13 Representer la succession ---------- */
E("s7f-u1-succession-order", 1, ["SC7.3.13"], 1, "var", varset([
  function () {
    var q = mcq("Les panneaux montrent des étapes de la succession sur la roche nue, dans le désordre. Quelle suite place les panneaux dans l’ordre réel de la succession, de la première étape à la dernière?", "Roche nue avec lichens, puis herbes, puis arbustes, puis forêt mature en dernier", ["Herbes et arbustes mélangés, puis roche nue, puis forêt mature, puis lichens", "Forêt mature, puis arbustes, puis herbes, puis roche nue avec lichens", "Arbustes, puis forêt mature, puis lichens, puis herbes en dernier"], "La succession primaire suit un ordre : les lichens colonisent la roche nue et amorcent le sol, puis les herbes, puis les arbustes, et enfin la forêt mature.", {}); q.figure = s7fSuccessionSVG([2, 0, 3, 1]); return q;
  },
  function () {
    var q = mcq("Dans la représentation graphique de la succession, quel panneau montre l’étape qui vient juste après les lichens sur la roche nue?", "Le panneau des herbes et des mousses qui poussent dans le sol mince formé", ["Le panneau de la forêt mature avec ses grands arbres et son sol profond", "Le panneau des arbustes et des jeunes arbres qui ombragent le sol mince", "Le panneau de la roche nue où les lichens commencent à peine à s’installer"], "Après les lichens, le sol mince qu’ils ont contribué à former permet aux mousses et aux herbes de s’installer : c’est l’étape suivante de la succession primaire.", {}); q.figure = s7fSuccessionSVG([0, 1, 2, 3]); return q;
  }
]), ["Le fil conducteur est le sol : il s’épaissit d’étape en étape.", "Chaque étape pousse dans les conditions créées par l’étape précédente."]);
E("s7f-u1-cr-succession-stages", 1, ["SC7.3.13", "SC7.1.10"], 2, "var", varset([
  function () {
    var q = textq("Les panneaux montrent quatre étapes de la succession sur la roche nue, en ordre, de la première à la dernière. Décris le changement qui se produit à CHAQUE étape, et nomme la condition que chaque étape crée pour permettre la suivante. (2 points)", ["étape 1 : les lichens colonisent la roche nue et amorcent la formation du sol", "étape 2 : mousses et herbes poussent dans le sol mince et l’épaississent de matière organique", "étape 3 : arbustes et jeunes arbres poussent dans le sol plus profond", "étape 4 : forêt mature, sol profond et sol forestier ombragé"], "<b>Réponse modèle :</b> Étape 1 : les lichens s’installent sur la roche nue et, avec l’altération, commencent à en briser la surface; le premier sol mince se forme. Étape 2 : les mousses et les herbes s’enracinent dans ce sol mince et, en vivant et en mourant, y ajoutent de la matière organique, ce qui l’épaissit et lui permet de retenir l’eau. Étape 3 : les arbustes et les jeunes arbres peuvent alors pousser; leurs racines et leur litière enrichissent encore le sol, et leur ombre change les conditions au sol. Étape 4 : la forêt mature s’installe, avec un sol profond et un parterre ombragé, conditions construites étape par étape par les étapes précédentes.<br><br><b>Points d’attribution :</b> 1 point pour les changements des étapes 1 et 2 décrits en ordre (colonisation, début et épaississement du sol). 1 point pour les changements des étapes 3 et 4 décrits en ordre, avec la condition habilitante nommée (sol plus profond, abri ou ombre).", {}); q.figure = s7fSuccessionSVG([0, 1, 2, 3]); return q;
  }
]), ["Raconte l’histoire du sol : c’est le fil qui relie les quatre étapes.", "Pour chaque étape, pose deux questions : qu’est-ce qui pousse maintenant, et que laisse-t-il derrière lui?"]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U1 = { "s7f-u1-cr-design-experiment": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U1[e.id]) { e.noCompose = true; } });
