// CRMARKS: s7f-u2-cr-temp-explain=3
// CRMARKS: s7f-u2-cr-expansion=3
// CRMARKS: s7f-u2-cr-plateau=3
// CRMARKS: s7f-u2-cr-transfer-explain=3
// CRMARKS: s7f-u2-cr-absorb=2
// CRMARKS: s7f-u2-cr-heating-example=2
// CRMARKS: s7f-u2-cr-heating-decision=3
// CRMARKS: s7f-u2-cr-improvement=2
// CRMARKS: s7f-u2-cr-pump-chain=3
// CRMARKS: s7f-u2-cr-thermometer-display=2
// CRMARKS: s7f-u2-cr-inquiry=3
// CRMARKS: s7f-u2-cr-display=3
// CRMARKS: s7f-u2-cr-design-test=4
// CRMARKS: s7f-u2-cr-conclusion=3
// Sciences 7, Unite 2 : La chaleur (SC7.4.1 a SC7.6.9), banque
// construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Residus CORE : les questions de SC7.6.1 et SC7.6.2 evaluent le choix des
// methodes, l'etalonnage juge par ecrit et l'affichage des donnees; elles
// n'evaluent pas la construction materielle du thermometre par l'eleve.
// Les questions de SC7.6.4 et SC7.6.7 evaluent le jugement sur l'usage sur
// et precis des appareils; elles n'evaluent pas la manipulation reelle.
// Les questions de SC7.6.6 evaluent la conception d'experiences; la
// realisation est un travail de classe.

/* ---------- SC7.4.1 Instruments de mesure de la temperature ---------- */
E("s7f-u2-instrument-match", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("Quel instrument mesure la température du corps en lisant le rayonnement émis par la peau, sans contact?", "Le thermomètre à infrarouge, qui capte le rayonnement émis par la surface", ["Le thermomètre à liquide, qui doit toucher la surface pendant un moment", "Le thermocouple, dont les fils doivent toucher la surface à mesurer", "Le thermomètre à bilame, dont la lame doit toucher la surface chaude"], "Le thermomètre à infrarouge mesure sans contact : il capte le rayonnement infrarouge émis par la surface. Les autres instruments exigent un contact avec l’objet mesuré.", {});
  },
  function () {
    return mcq("Quel instrument de mesure de la température utilise deux métaux soudés dont la jonction produit un signal électrique?", "Le thermocouple, formé de deux fils de métaux différents soudés ensemble", ["Le thermomètre à résistance, formé d’un fil dont la résistance varie toujours", "Le thermomètre à liquide, formé d’un liquide qui monte dans un tube scellé", "Le thermomètre à bilame, formé de deux lames qui se courbent en chauffant"], "Le thermocouple joint deux métaux différents : la jonction produit un signal électrique qui dépend de la température. Chaque instrument nommé fonctionne par un principe différent.", {});
  }
]), ["Relie chaque instrument à son principe de fonctionnement.", "Sans contact : un seul instrument lit un rayonnement."]);
E("s7f-u2-instrument-how", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("Comment un thermomètre à liquide indique-t-il la température?", "Le liquide se dilate en chauffant et monte dans le tube gradué du thermomètre", ["Le liquide change de couleur en chauffant et teinte le tube gradué du thermomètre", "Le liquide bout en chauffant et remplit complètement le tube gradué du thermomètre", "Le liquide gèle en chauffant et descend dans le tube gradué du thermomètre"], "En chauffant, les particules du liquide s’agitent davantage et le liquide prend plus d’espace : il monte dans le tube. La hauteur atteinte indique la température sur l’échelle.", {});
  },
  function () {
    return mcq("Comment un thermostat à bilame commande-t-il un système de chauffage?", "La lame double se courbe quand la température change et ouvre ou ferme un contact", ["La lame double fond quand la température change et bloque le passage du courant", "La lame double vibre quand la température change et produit le courant du système", "La lame double gonfle quand la température change et pousse le liquide du système"], "Un bilame joint deux métaux qui se dilatent inégalement : la lame se courbe avec la température, ce qui ouvre ou ferme le contact qui commande le chauffage.", {});
  }
]), ["Chaque instrument transforme la température en un mouvement ou un signal lisible.", "Dilatation : c’est le principe du liquide et du bilame."]);
E("s7f-u2-thermometer-read", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return mcq("Un thermomètre à liquide plongé dans l’eau d’un bécher montre le liquide arrêté entre les marques 20 °C et 30 °C, exactement à la marque du milieu, chaque petite division valant 1 °C. Quelle est la lecture correcte si le liquide dépasse la marque 24 d’une division?", "25 °C, en lisant la hauteur du liquide à la hauteur des yeux", ["24 °C, en lisant la hauteur du liquide depuis le dessus du bécher", "26 °C, en lisant le bas du tube plutôt que la hauteur du liquide", "20 °C, en lisant la grande marque la plus proche sous le liquide"], "Chaque division vaut 1 °C : une division au-dessus de 24 donne 25 °C. On lit la hauteur de la colonne à la hauteur des yeux pour éviter une lecture faussée par l’angle.", {});
  },
  function () {
    return mcq("Pourquoi faut-il attendre avant de lire un thermomètre à liquide qu’on vient de plonger dans l’eau chaude?", "Parce que le liquide a besoin de temps pour atteindre la température de l’eau mesurée", ["Parce que le verre du thermomètre a besoin de temps pour changer de couleur", "Parce que l’échelle du thermomètre a besoin de temps pour devenir lisible", "Parce que l’eau a besoin de temps pour devenir plus chaude que le liquide"], "Le thermomètre indique sa propre température : il faut attendre que son liquide se réchauffe jusqu’à la température de l’eau, sinon la lecture est trop basse.", {});
  }
]), ["Une lecture exacte demande le bon instrument, bien placé et lu au bon moment.", "Le thermomètre mesure d’abord sa propre température."]);
E("s7f-u2-instrument-choose", 2, ["SC7.4.1"], 3, "var", varset([
  function () {
    return mcq("Il faut surveiller la température à l’intérieur d’un four industriel très chaud et enregistrer les valeurs à distance, sans ouvrir le four. Quel instrument convient le mieux?", "Un thermocouple relié à un enregistreur, conçu pour les températures très élevées", ["Un thermomètre à liquide en verre, glissé par la porte entrouverte du four chaud", "Un thermomètre à bilame domestique, fixé à la poignée extérieure du four chaud", "Un thermomètre à infrarouge de cuisine, pointé une fois sur la porte du four"], "Le thermocouple supporte de très hautes températures et produit un signal électrique qu’on peut enregistrer à distance. Le thermomètre à liquide en verre se briserait et n’enregistre rien.", {});
  }
]), ["Énumère les exigences : chaleur extrême, mesure continue, distance.", "L’instrument gagnant satisfait les trois exigences à la fois."]);

/* ---------- SC7.4.2 La temperature et le modele particulaire ---------- */
E("s7f-u2-temp-define", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    return mcq("Selon le modèle particulaire de la matière, qu’est-ce que la température d’une substance mesure?", "L’énergie cinétique moyenne des particules de la substance mesurée", ["La quantité totale de particules contenue dans la substance mesurée", "La grosseur moyenne des particules qui composent la substance mesurée", "L’espace total occupé par les particules de la substance mesurée"], "La température est liée au mouvement des particules : elle mesure leur énergie cinétique moyenne. Plus les particules bougent vite en moyenne, plus la température est élevée.", {});
  },
  function () {
    return mcq("Un élève réchauffe de l’eau dans un bécher. Au niveau des particules, que se passe-t-il quand la température monte?", "Les particules d’eau bougent en moyenne plus vite qu’avant le chauffage", ["Les particules d’eau deviennent en moyenne plus grosses qu’avant", "Les particules d’eau deviennent en moyenne plus nombreuses qu’avant", "Les particules d’eau cessent en moyenne de bouger entre elles"], "Chauffer ajoute de l’énergie aux particules : elles bougent plus vite en moyenne, ce qui correspond exactement à une température plus élevée.", {});
  }
]), ["Température et mouvement des particules vont ensemble.", "Ni la grosseur ni le nombre des particules ne changent quand on chauffe."]);
E("s7f-u2-particle-points", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    var q = mcq("Dans le schéma des particules, que représentent les petites flèches attachées aux particules?", "Le mouvement des particules, dont la longueur indique la vitesse moyenne", ["L’attraction des particules, dont la longueur indique la force moyenne", "La grosseur des particules, dont la longueur indique le diamètre moyen", "Le nombre des particules, dont la longueur indique la quantité moyenne"], "Les flèches montrent le mouvement : dans la rangée plus chaude, les flèches sont plus longues, car les particules bougent plus vite en moyenne.", {}); q.figure = s7fParticlePanelSVG(); return q;
  },
  function () {
    var q = mcq("Dans le schéma des particules, comment reconnaît-on la rangée la plus chaude?", "Ses particules portent les flèches les plus longues dans chaque état montré", ["Ses particules sont dessinées plus grosses que celles de la rangée froide", "Ses particules sont dessinées plus nombreuses que celles de la rangée froide", "Ses particules sont dessinées sans espace entre elles dans chaque état"], "La température se lit au mouvement : les flèches plus longues de la rangée chaude montrent des particules qui bougent plus vite en moyenne, dans les trois états.", {}); q.figure = s7fParticlePanelSVG(); return q;
  }
]), ["Compare les mêmes états entre les deux rangées du schéma.", "La seule chose qui change entre les rangées, c’est le mouvement."]);
E("s7f-u2-particle-speed", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return mcq("Deux échantillons d’eau, l’un à 20 °C et l’autre à 60 °C, contiennent exactement les mêmes particules d’eau. Quel énoncé compare correctement leurs particules?", "Les particules de l’échantillon à 60 °C ont une énergie cinétique moyenne plus grande", ["Les particules de l’échantillon à 60 °C sont devenues plus grosses que les autres", "Les particules de l’échantillon à 20 °C ont cessé tout mouvement entre elles", "Les deux échantillons ont des particules d’énergie cinétique moyenne égale"], "Les particules sont les mêmes; seule leur énergie de mouvement diffère. À 60 °C, l’énergie cinétique moyenne est plus grande, et même à 20 °C les particules bougent toujours.", {});
  }
]), ["Mêmes particules, températures différentes : une seule propriété peut différer.", "Le mouvement des particules ne cesse pas à basse température ordinaire."]);
E("s7f-u2-cr-temp-explain", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return textq("Une soupe froide placée sur un élément chaud atteint peu à peu la même température que l’élément. Explique ce qui se passe au niveau des particules, de l’élément jusqu’à la soupe, en utilisant le modèle particulaire de la matière. (3 points)", ["les particules de l’élément chaud bougent très vite et transmettent leur énergie par collisions", "l’énergie passe de particule en particule jusqu’à la soupe, dont les particules bougent de plus en plus vite", "l’équilibre est atteint quand les particules des deux côtés ont la même énergie cinétique moyenne"], "<b>Réponse modèle :</b> Les particules de l’élément chaud vibrent et bougent très vite, car sa température est élevée. Au contact, elles entrent en collision avec les particules du contenant, puis avec celles de la soupe, et leur transmettent une partie de leur énergie. Les particules de la soupe bougent alors de plus en plus vite : sa température monte. Le transfert se poursuit jusqu’à ce que les particules des deux côtés aient la même énergie cinétique moyenne, c’est-à-dire la même température.<br><br><b>Points d’attribution :</b> 1 point pour le point de départ (les particules chaudes bougent vite). 1 point pour le mécanisme de transfert par collisions de particule en particule. 1 point pour l’équilibre décrit comme une énergie cinétique moyenne devenue égale.", {});
  }
]), ["Pense en chaîne : élément, contenant, soupe, collision par collision.", "L’équilibre thermique est un équilibre d’énergie moyenne des particules."]);

/* ---------- SC7.4.3 Les etats de la matiere et la temperature ---------- */
E("s7f-u2-states-compare", 2, ["SC7.4.3"], 1, "var", varset([
  function () {
    return mcq("Quand on chauffe un solide, un liquide et un gaz de la même substance, lequel se dilate généralement le plus pour le même réchauffement?", "Le gaz, dont les particules libres s’écartent beaucoup plus les unes des autres", ["Le solide, dont les particules liées s’écartent beaucoup plus les unes des autres", "Le liquide, dont les particules serrées s’écartent beaucoup plus les unes des autres", "Les trois états se dilatent exactement autant pour le même réchauffement donné"], "Les particules d’un gaz sont déjà libres et éloignées : en chauffant, elles bougent plus vite et occupent beaucoup plus d’espace. Les solides, aux particules liées, se dilatent le moins.", {});
  },
  function () {
    return mcq("Pourquoi un liquide se dilate-t-il plus qu’un solide quand on les chauffe autant?", "Parce que ses particules, moins liées, peuvent s’écarter davantage les unes des autres", ["Parce que ses particules deviennent plus grosses que celles du solide chauffé autant", "Parce que ses particules se multiplient quand la température du liquide augmente", "Parce que ses particules cessent de s’attirer dès que la température du liquide monte"], "Dans un liquide, les particules glissent les unes contre les autres et sont moins retenues que dans un solide : le réchauffement les écarte davantage, donc la dilatation est plus grande.", {});
  }
]), ["Compare la liberté des particules dans chaque état.", "Plus les particules sont libres, plus la dilatation est grande."]);
E("s7f-u2-expansion-scenario", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return mcq("Par une chaude journée d’été, une porte métallique qui fermait bien en hiver coince dans son cadre. Quelle explication est correcte?", "Le métal de la porte s’est dilaté avec la chaleur et remplit davantage son cadre", ["Le métal de la porte s’est contracté avec la chaleur et force contre son cadre", "Le cadre de la porte s’est dilaté vers l’intérieur sous l’effet du froid hivernal", "L’humidité de l’été a fait gonfler le métal de la porte comme elle gonfle le bois"], "En chauffant, les particules du métal vibrent davantage et le métal se dilate : la porte occupe plus d’espace et coince. Le froid, lui, contracte les matériaux.", {});
  },
  function () {
    return mcq("On laisse des espaces entre les sections d’un pont d’acier. À quoi servent ces joints de dilatation?", "Ils laissent l’acier se dilater par temps chaud sans pousser ni déformer la structure", ["Ils laissent l’eau de pluie s’écouler sous le pont pendant les orages de l’été", "Ils laissent passer les vibrations des véhicules qui traversent le pont chaque jour", "Ils laissent l’acier se contracter par temps chaud sans tirer sur la structure"], "L’acier se dilate quand il chauffe : sans joints, les sections se pousseraient et déformeraient le pont. Les joints absorbent ce changement de longueur.", {});
  }
]), ["Chaleur : dilatation. Froid : contraction. Pars de là.", "Le scénario décrit un matériau qui prend plus de place qu’avant."]);
E("s7f-u2-states-heated", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return mcq("Un ballon gonflé placé au soleil devient plus ferme et tendu, sans qu’on y ajoute d’air. Quelle explication particulaire est correcte?", "Les particules d’air chauffées frappent les parois plus fort et plus souvent qu’avant", ["Les particules d’air chauffées deviennent plus nombreuses à l’intérieur du ballon", "Les particules d’air chauffées deviennent plus lourdes et tombent au fond du ballon", "Les particules d’air chauffées se collent aux parois et gonflent le caoutchouc du ballon"], "L’air chauffé a des particules plus rapides : elles frappent les parois plus fort et plus souvent, ce qui tend le ballon. Le nombre de particules n’a pas changé.", {});
  }
]), ["Même quantité d’air, température plus élevée : que font les particules?", "La fermeté vient des collisions contre les parois."]);
E("s7f-u2-cr-expansion", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return textq("Un thermomètre à liquide et une bande bimétallique utilisent tous les deux la dilatation. Explique, pour CHACUN des deux dispositifs, comment la dilatation produit l’indication de température, en nommant ce qui se dilate et ce qui bouge visiblement. (3 points)", ["thermomètre : le liquide se dilate plus que le verre et monte dans le tube; la hauteur indique la température", "bilame : deux métaux se dilatent inégalement, la bande se courbe; la courbure déplace une aiguille ou un contact"], "<b>Réponse modèle :</b> Thermomètre à liquide : en chauffant, le liquide du réservoir se dilate davantage que le verre; il est poussé dans le tube étroit, et la hauteur de la colonne indique la température sur l’échelle. Bande bimétallique : deux métaux soudés se dilatent de quantités différentes quand la température change; la bande se courbe donc d’un côté ou de l’autre, et ce mouvement déplace une aiguille ou ouvre et ferme un contact électrique.<br><br><b>Points d’attribution :</b> 1 point pour le liquide qui se dilate et monte dans le tube. 1 point pour les deux métaux qui se dilatent inégalement et courbent la bande. 1 point pour le lien, dans chaque cas, entre le mouvement produit et l’indication de température.", {});
  }
]), ["Deux dispositifs, un même principe : la dilatation inégale ou visible.", "Pour chacun, nomme ce qui se dilate et ce que l’œil voit bouger."]);

/* ---------- SC7.4.4 Les changements d'etat ---------- */
E("s7f-u2-change-name", 2, ["SC7.4.4"], 1, "var", varset([
  function () {
    return mcq("De la buée se forme sur un miroir froid pendant une douche chaude. Quel changement d’état se produit?", "La condensation, quand la vapeur d’eau devient liquide au contact du miroir froid", ["L’évaporation, quand l’eau liquide devient vapeur au contact du miroir froid", "La fusion, quand la glace du miroir devient liquide sous la chaleur de la douche", "La congélation, quand la vapeur d’eau devient solide au contact du miroir froid"], "La vapeur d’eau de l’air chaud perd de l’énergie au contact du miroir froid et redevient liquide : c’est la condensation.", {});
  },
  function () {
    return mcq("Un glaçon laissé sur le comptoir devient une flaque d’eau. Quel changement d’état se produit?", "La fusion, quand la glace solide devient liquide en absorbant de l’énergie", ["La congélation, quand l’eau solide devient liquide en perdant de l’énergie", "L’évaporation, quand la glace solide devient vapeur en absorbant de l’énergie", "La condensation, quand l’eau liquide devient solide en perdant de l’énergie"], "Le passage du solide au liquide s’appelle la fusion : la glace absorbe l’énergie de la pièce et ses particules se libèrent de leur arrangement fixe.", {});
  }
]), ["Nomme l’état de départ et l’état d’arrivée, puis le nom suit.", "Solide vers liquide : fusion. Gaz vers liquide : condensation."]);
E("s7f-u2-plateau-read", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    var q = mcq("La courbe de chauffage montre la température d’une substance chauffée régulièrement. Pendant le plateau de la courbe, que se passe-t-il?", "La substance change d’état pendant que sa température reste constante sur le plateau", ["La substance cesse d’absorber l’énergie pendant que sa température reste constante", "La substance change de composition pendant que sa température augmente sur le plateau", "La substance se contracte pendant que sa température diminue lentement sur le plateau"], "Sur un plateau, l’énergie absorbée sert à briser les liens entre les particules pour changer d’état : la température ne monte pas tant que le changement n’est pas terminé.", {}); q.figure = s7fHeatingCurveSVG(0, 100, 25, 120); return q;
  },
  function () {
    var q = mcq("Sur la courbe de chauffage, à quelles températures se produisent les deux changements d’état de cette substance?", "À 0 °C pour la fusion et à 100 °C pour l’ébullition de la substance chauffée", ["À 20 °C pour la fusion et à 80 °C pour l’ébullition de la substance chauffée", "À 0 °C pour la congélation et à 100 °C pour la condensation de la substance", "À 50 °C pour la fusion et à 100 °C pour l’ébullition de la substance chauffée"], "Les deux plateaux de la courbe se situent à 0 °C et à 100 °C : ce sont les températures des changements d’état, la fusion puis l’ébullition, pendant le chauffage.", {}); q.figure = s7fHeatingCurveSVG(0, 100, 25, 120); return q;
  }
]), ["Un plateau signifie : énergie absorbée, température constante.", "Lis les valeurs des plateaux sur l’axe des températures."]);
E("s7f-u2-change-particles", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    return mcq("Pendant l’évaporation à la surface d’une flaque, quelles particules quittent le liquide en premier?", "Les particules de la surface qui ont le plus d’énergie cinétique à ce moment-là", ["Les particules du fond qui ont le moins d’énergie cinétique à ce moment-là", "Les particules de la surface qui sont les plus grosses de tout le liquide entier", "Toutes les particules du liquide en même temps, dès que le soleil brille dessus"], "L’évaporation est un phénomène de surface : seules les particules de surface assez énergiques échappent aux attractions du liquide. C’est pourquoi une flaque s’évapore sans bouillir.", {});
  }
]), ["L’évaporation se passe à la surface, pas dans tout le liquide.", "Il faut assez d’énergie pour vaincre les attractions du liquide."]);
E("s7f-u2-cr-plateau", 2, ["SC7.4.4"], 3, "var", varset([
  function () {
    return textq("On chauffe régulièrement de la glace pilée et on consigne sa température. Elle monte jusqu’à 0 °C, reste à 0 °C pendant que la glace fond, puis remonte. Explique, avec le modèle particulaire, pourquoi la température reste à 0 °C pendant la fusion même si le chauffage continue. (3 points)", ["avant la fusion, l’énergie augmente l’énergie cinétique des particules, donc la température monte", "pendant la fusion, l’énergie sert à briser les liens qui tiennent les particules en arrangement solide", "l’énergie cinétique moyenne ne change pas pendant la fusion, donc la température reste à 0 °C"], "<b>Réponse modèle :</b> Avant 0 °C, l’énergie fournie augmente l’énergie cinétique des particules de la glace : la température monte. À 0 °C, l’énergie fournie change de travail : elle sert à briser les liens qui maintiennent les particules dans l’arrangement fixe du solide, pour former le liquide. Pendant tout ce temps, l’énergie cinétique moyenne des particules ne change pas, donc la température reste à 0 °C. Quand toute la glace est fondue, l’énergie recommence à augmenter l’énergie cinétique des particules d’eau, et la température remonte.<br><br><b>Points d’attribution :</b> 1 point pour l’énergie qui augmente l’énergie cinétique avant le plateau. 1 point pour l’énergie employée à briser les liens pendant la fusion. 1 point pour le lien entre énergie cinétique moyenne constante et température constante.", {});
  }
]), ["Demande-toi où va l’énergie si elle ne fait pas monter la température.", "Température égale énergie cinétique moyenne : si l’une est constante, l’autre aussi."]);

/* ---------- SC7.4.5 Conduction, convection et rayonnement ---------- */
E("s7f-u2-transfer-classify", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Une cuillère de métal laissée dans une soupe chaude devient chaude jusqu’au manche. De quel mode de transmission de la chaleur s’agit-il?", "La conduction, de particule en particule le long du métal de la cuillère", ["La convection, par un courant de soupe chaude qui monte le long du manche", "Le rayonnement, par les ondes émises par la soupe vers le manche exposé", "La conduction, par l’air chaud qui circule librement autour de la cuillère"], "Dans un solide, la chaleur se transmet de particule en particule par collisions : c’est la conduction, qui fait chauffer le manche de proche en proche.", {});
  },
  function () {
    return mcq("On sent la chaleur d’un feu de camp sur son visage, à distance, sans toucher les flammes et sans vent. De quel mode de transmission s’agit-il?", "Le rayonnement, qui transporte l’énergie en ondes sans matière intermédiaire", ["La conduction, qui transporte l’énergie de particule en particule dans l’air", "La convection, qui transporte l’énergie par un courant d’air dirigé vers le visage", "Le rayonnement, qui transporte l’énergie seulement quand un liquide la conduit"], "Le rayonnement voyage en ondes (infrarouges) et n’a besoin d’aucune matière : c’est ainsi que la chaleur du feu atteint le visage à distance.", {});
  }
]), ["Contact dans un solide : conduction. Courant dans un fluide : convection. Ondes à distance : rayonnement.", "Le mode se reconnaît au mécanisme, pas à la source."]);
E("s7f-u2-transfer-particles", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Dans la convection, comment la chaleur se déplace-t-elle d’un endroit à l’autre?", "La matière chaude, devenue moins dense, monte et est remplacée par de la matière plus froide", ["Les particules transmettent leur énergie de proche en proche sans se déplacer elles-mêmes", "Les ondes traversent la matière et la réchauffent sans déplacer aucune de ses parties", "La matière froide, devenue plus dense, monte et pousse la matière chaude vers le bas"], "Dans la convection, c’est la matière elle-même qui se déplace : chauffée, elle se dilate, devient moins dense et monte, pendant que la matière froide descend prendre sa place.", {});
  }
]), ["Convection : la matière bouge. Conduction : seule l’énergie bouge.", "Chaud et moins dense monte; froid et plus dense descend."]);
E("s7f-u2-transfer-compare", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé compare correctement la conduction et le rayonnement?", "La conduction exige un contact de matière, tandis que le rayonnement traverse même le vide", ["La conduction traverse le vide, tandis que le rayonnement exige un contact de matière", "La conduction et le rayonnement exigent tous les deux un courant de matière en mouvement", "La conduction et le rayonnement ne fonctionnent tous les deux que dans les métaux chauds"], "La conduction passe de particule en particule dans la matière : il faut un milieu. Le rayonnement voyage en ondes et traverse le vide, comme la chaleur du soleil qui atteint la Terre.", {});
  }
]), ["Une question décide : le mode a-t-il besoin de matière pour voyager?", "La chaleur du soleil traverse le vide de l’espace : un seul mode le peut."]);
E("s7f-u2-stove-three", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("Une poêle sur un élément électrique rougi chauffe l’eau qu’elle contient. Quel ensemble associe correctement les trois modes à cette scène?", "Conduction de l’élément à la poêle, convection dans l’eau, rayonnement de l’élément rougi", ["Convection de l’élément à la poêle, conduction dans l’eau, rayonnement de l’élément rougi", "Rayonnement de l’élément à la poêle, conduction dans l’eau, convection de l’élément rougi", "Conduction de l’élément à la poêle, rayonnement dans l’eau, convection de l’élément rougi"], "L’élément touche la poêle : conduction. L’eau chauffée circule en courants : convection. L’élément rougi émet des ondes qu’on sent à distance : rayonnement.", {});
  }
]), ["Associe chaque mode à son mécanisme dans la scène, un par un.", "L’eau qui circule est la convection; le contact est la conduction."]);
E("s7f-u2-cr-transfer-explain", 2, ["SC7.4.5"], 3, "var", varset([
  function () {
    return textq("Une journée d’hiver ensoleillée réchauffe une serre de trois façons. Donne un exemple précis de conduction, de convection et de rayonnement dans la serre, et explique le mécanisme de chacun en une phrase. (3 points)", ["rayonnement : les ondes du soleil traversent la vitre et réchauffent les surfaces de la serre", "conduction : une surface chaude transmet la chaleur par contact (par exemple une dalle ou un contenant chauffé qui réchauffe le sol ou l’eau par contact)", "convection : l’air chaud monte et circule dans la serre, distribuant la chaleur"], "<b>Réponse modèle :</b> Rayonnement : les ondes infrarouges du soleil traversent la vitre et sont absorbées par les surfaces de la serre, qui se réchauffent sans aucun contact. Conduction : une dalle sombre chauffée par le soleil transmet sa chaleur par contact au sol et aux contenants posés dessus, de particule en particule. Convection : l’air réchauffé au sol devient moins dense, monte, puis redescend en se refroidissant, ce qui fait circuler la chaleur dans toute la serre.<br><br><b>Points d’attribution :</b> 1 point pour le rayonnement avec son mécanisme (ondes absorbées, sans contact). 1 point pour la conduction avec son mécanisme (contact, de particule en particule). 1 point pour la convection avec son mécanisme (la matière chaude qui monte et circule).", {});
  }
]), ["Un mode par mécanisme : ondes, contact, circulation.", "Chaque exemple doit se passer réellement dans une serre ensoleillée."]);

/* ---------- SC7.4.6 Absorption de la chaleur radiante ---------- */
E("s7f-u2-absorb-classify", 2, ["SC7.4.6"], 1, "var", varset([
  function () {
    return mcq("Deux boîtes identiques, l’une peinte en noir mat et l’autre en blanc brillant, sont placées au soleil. Laquelle se réchauffe le plus vite?", "La boîte noire et mate, car les surfaces foncées et mates absorbent plus de rayonnement", ["La boîte blanche et brillante, car les surfaces claires absorbent plus de rayonnement", "Les deux boîtes se réchauffent également, car la couleur ne change rien à l’absorption", "La boîte blanche et brillante, car les surfaces lisses absorbent toujours plus de chaleur"], "Les surfaces foncées et mates absorbent une plus grande partie du rayonnement reçu; les surfaces claires et brillantes en réfléchissent davantage. La boîte noire se réchauffe donc plus vite.", {});
  },
  function () {
    return mcq("Pourquoi les vêtements d’été sont-ils souvent pâles dans les régions très ensoleillées?", "Parce que les surfaces pâles réfléchissent une grande partie du rayonnement du soleil", ["Parce que les surfaces pâles absorbent une grande partie du rayonnement du soleil", "Parce que les surfaces pâles produisent elles-mêmes de la fraîcheur au soleil", "Parce que les surfaces pâles empêchent complètement la chaleur d’atteindre le corps"], "Une surface pâle réfléchit une bonne partie du rayonnement solaire au lieu de l’absorber : le vêtement et la personne restent plus frais.", {});
  }
]), ["Absorber ou réfléchir : la couleur et le fini décident du partage.", "Foncé et mat absorbe; clair et brillant réfléchit."]);
E("s7f-u2-absorb-lab", 2, ["SC7.4.6"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre la température de deux boîtes, l’une foncée et l’autre claire, placées sous la même lampe. Quelle conclusion les données appuient-elles?", "La surface foncée absorbe le rayonnement plus vite, car sa température monte plus rapidement sous la lampe", ["La surface claire absorbe le rayonnement plus vite, car sa température monte plus rapidement sous la lampe", "Les deux surfaces absorbent également, car leurs températures finales sous la lampe sont identiques", "La lampe réchauffe seulement la boîte foncée, car la boîte claire ne reçoit aucun rayonnement du tout"], "Sous la même lampe, la courbe de la boîte foncée monte plus vite : sa surface absorbe une plus grande partie du rayonnement et se réchauffe plus rapidement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Même lampe, mêmes conditions : seule la surface diffère.", "Compare les pentes des deux courbes, pas seulement les valeurs finales."]);
E("s7f-u2-cr-absorb", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return textq("Un jardinier hésite entre un tuyau d’arrosage noir et un tuyau pâle pour alimenter en eau tiède une petite serre au printemps. Conseille un choix et appuie-le sur la façon dont les surfaces absorbent la chaleur radiante, en nommant l’effet attendu sur l’eau du tuyau. (2 points)", ["le tuyau noir, car les surfaces foncées absorbent plus de rayonnement solaire", "l’eau du tuyau noir se réchauffera davantage au soleil que celle du tuyau pâle"], "<b>Réponse modèle :</b> Je conseille le tuyau noir. Les surfaces foncées absorbent une plus grande partie du rayonnement du soleil que les surfaces pâles, qui en réfléchissent davantage. Au soleil du printemps, le tuyau noir se réchauffera donc davantage et transmettra cette chaleur à l’eau qu’il contient, ce qui donnera une eau d’arrosage plus tiède pour la serre.<br><br><b>Points d’attribution :</b> 1 point pour le choix du tuyau noir, lié à l’absorption plus forte des surfaces foncées. 1 point pour l’effet attendu sur l’eau, expliqué par le transfert de la chaleur du tuyau à l’eau.", {});
  }
]), ["Le choix suit la règle d’absorption : foncé absorbe, pâle réfléchit.", "Termine la chaîne : surface chauffée, puis eau réchauffée."]);

/* ---------- SC7.4.7 Chaleurs massiques comparees ---------- */
E("s7f-u2-shc-compare", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    var q = mcq("Le graphique montre la hausse de température de masses égales d’eau, d’aluminium, de ciment et d’acier qui reçoivent la même quantité d’énergie. Quel énoncé est correct?", "L’eau a la plus grande chaleur massique, car sa température monte le moins pour la même énergie reçue", ["L’eau a la plus petite chaleur massique, car sa température monte le moins pour la même énergie reçue", "L’acier a la plus grande chaleur massique, car sa température monte le plus pour la même énergie reçue", "Les quatre matériaux ont la même chaleur massique, car ils reçoivent la même quantité d’énergie"], "La chaleur massique mesure l’énergie nécessaire pour élever la température d’un matériau. À énergie égale, celui qui se réchauffe le moins, l’eau, a la plus grande chaleur massique.", {}); q.figure = s7fSHCBarsSVG([{name: 'Eau', rise: 5}, {name: 'Glace', rise: 10}, {name: 'Ciment', rise: 24}, {name: 'Aluminium', rise: 23}, {name: 'Acier', rise: 45}]); return q;
  },
  function () {
    return mcq("Des masses égales d’eau et de sable reçoivent la même énergie du soleil pendant une heure. Le sable devient brûlant pendant que l’eau reste fraîche. Quelle propriété explique cette différence?", "La chaleur massique de l’eau est beaucoup plus grande que celle du sable exposé au soleil", ["La chaleur massique du sable est beaucoup plus grande que celle de l’eau exposée au soleil", "La température du sable augmente parce que le sable absorbe toute l’énergie sans exception", "La température de l’eau n’augmente jamais, quelle que soit l’énergie qu’elle reçoit du soleil"], "L’eau exige beaucoup plus d’énergie pour élever sa température : sa chaleur massique est grande. Le sable, de faible chaleur massique, se réchauffe vite avec la même énergie.", {});
  }
]), ["À énergie égale, la plus petite hausse signale la plus grande chaleur massique.", "Le graphique compare des masses égales qui reçoivent la même énergie."]);
E("s7f-u2-shc-coastal", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    return mcq("Les localités côtières de Terre-Neuve-et-Labrador ont des étés plus frais et des hivers moins froids que les localités de l’intérieur. Quel rôle joue l’océan dans ce climat plus doux?", "L’eau de l’océan, de grande chaleur massique, se réchauffe et se refroidit lentement, ce qui adoucit les températures voisines", ["L’eau de l’océan, de faible chaleur massique, change de température très vite, ce qui adoucit les températures voisines", "L’eau de l’océan ne change jamais de température, ce qui fige complètement les températures des localités voisines", "L’eau de l’océan transmet instantanément sa chaleur aux localités, ce qui rend leurs étés aussi chauds qu’à l’intérieur"], "Parce que l’eau a une grande chaleur massique, l’océan emmagasine l’énergie l’été et la rend lentement l’hiver : les températures côtières varient moins que celles de l’intérieur.", {});
  }
]), ["Le même principe que le sable et l’eau de la plage, à l’échelle d’une région.", "Grande chaleur massique égale changements de température lents."]);
E("s7f-u2-heat-vs-temp", 2, ["SC7.4.7"], 1, "var", varset([
  function () {
    return mcq("Une tasse d’eau bouillante et une baignoire d’eau tiède : laquelle contient le plus d’énergie thermique totale?", "La baignoire d’eau tiède, car sa très grande quantité d’eau contient plus d’énergie au total", ["La tasse d’eau bouillante, car sa température élevée lui donne plus d’énergie au total", "Les deux contiennent exactement la même énergie thermique, car l’eau est la même substance", "La tasse d’eau bouillante, car l’énergie thermique dépend uniquement de la température mesurée"], "La température mesure l’énergie moyenne par particule, mais l’énergie totale dépend aussi de la quantité de matière. La baignoire contient énormément plus d’eau : son énergie thermique totale est plus grande, même à température plus basse.", {});
  }
]), ["Température : moyenne par particule. Énergie totale : moyenne fois quantité.", "Une très grande masse tiède peut contenir plus d’énergie qu’une petite masse chaude."]);

/* ---------- SC7.5.1 Activites personnelles et temperature ---------- */
E("s7f-u2-familiar-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces activités personnelles dépend le plus directement de la mesure de la température?", "Vérifier la température d’un four avant d’y mettre un pain à cuire au repas", ["Choisir la couleur d’un chandail avant de partir pour l’école le matin", "Compter les marches d’un escalier avant de monter à l’étage de la maison", "Plier les vêtements avant de les ranger dans le tiroir de la chambre"], "Régler et vérifier un four, c’est mesurer et contrôler une température pour réussir une cuisson : l’activité dépend directement de la température.", {});
  },
  function () {
    return mcq("Un joueur de hockey vérifie la glace et l’air de l’aréna avant un match. Quel lien avec la température est le plus direct?", "La dureté de la glace dépend de sa température, ce qui change le glissement des patins", ["La couleur des chandails dépend de la température de l’air dans l’aréna du match", "Le nombre de joueurs dépend de la température de la glace pendant le match entier", "La durée du match dépend entièrement de la température mesurée avant le match"], "Une glace plus froide est plus dure et plus rapide; une glace plus chaude est plus molle et plus lente. La température de la glace influence directement le jeu.", {});
  }
]), ["Cherche l’activité où une valeur de température change une décision.", "Formel ou informel, le lien doit passer par la température elle-même."]);
E("s7f-u2-activity-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces situations informelles montre la température qui guide un choix personnel?", "Mettre un manteau chaud après avoir vu qu’il fait moins 10 °C dehors ce matin", ["Mettre un manteau chaud parce que sa couleur s’accorde avec le pantalon du jour", "Choisir un manteau parce qu’il est accroché le plus près de la porte d’entrée", "Porter un manteau parce que tous les amis en portent un semblable cette saison"], "Le choix est guidé par une température mesurée (moins 10 °C) : c’est un lien direct entre une activité personnelle et la température.", {});
  }
]), ["Le thermomètre doit jouer un rôle dans la décision.", "Les autres choix reposent sur la couleur, la commodité ou l’habitude."]);

/* ---------- SC7.5.2 Technologies anciennes de mesure ---------- */
E("s7f-u2-thermoscope", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Comment le thermomètre à air de Galilée indiquait-il un changement de température?", "L’air emprisonné se dilatait ou se contractait et faisait monter ou descendre l’eau du tube", ["Un liquide coloré montait dans un tube scellé gradué selon une échelle fixe et précise", "Une aiguille tournait sur un cadran divisé en degrés égaux comme les horloges de l’époque", "Des billes de verre flottaient ou coulaient selon la température exacte de la pièce mesurée"], "Le thermoscope de Galilée utilisait l’air : réchauffé, l’air se dilatait et repoussait l’eau du tube; refroidi, il se contractait et l’eau remontait. Il montrait des changements, sans échelle de degrés précise.", {});
  },
  function () {
    return mcq("Quelle limite partageaient les premiers instruments de mesure de la température?", "Ils montraient qu’il faisait plus chaud ou plus froid, sans échelle commune et précise de degrés", ["Ils donnaient des lectures en degrés Celsius identiques à celles des instruments actuels", "Ils fonctionnaient seulement à l’extérieur, jamais à l’intérieur des maisons de l’époque", "Ils mesuraient la température sans utiliser la dilatation d’une substance quelconque"], "Les premiers thermomètres à air et à liquide indiquaient des variations, mais chaque instrument avait ses repères : il a fallu des points fixes et des échelles communes pour comparer les lectures.", {});
  }
]), ["Les premiers instruments montraient un changement avant de mesurer un nombre.", "Sans points fixes partagés, deux instruments ne s’accordent pas."]);
E("s7f-u2-scales", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Quels points fixes ont permis de graduer les premiers thermomètres à liquide de façon reproductible?", "La température de la glace qui fond et celle de l’eau qui bout, mesurées dans des conditions définies", ["La température du corps humain et celle d’une journée d’été, mesurées dans des conditions variables", "La température d’un four de cuisine et celle d’une cave, mesurées dans des maisons différentes", "La température du soleil levant et celle de la nuit, mesurées à des saisons différentes de l’année"], "La glace fondante et l’eau bouillante donnent les mêmes températures partout (à pression égale) : ce sont des points fixes fiables pour graduer une échelle.", {});
  }
]), ["Un point fixe doit être le même partout et en tout temps.", "La glace qui fond garde sa température tant qu’elle fond."]);
E("s7f-u2-past-tech", 2, ["SC7.5.2"], 2, "var", varset([
  function () {
    return mcq("Un musée expose un thermomètre à liquide ancien, sans chiffres, avec seulement des perles de verre comme repères. Qu’est-ce que cet objet nous apprend sur la mesure de la température autrefois?", "On pouvait comparer les jours plus chauds et plus froids avant de pouvoir nommer des températures exactes en degrés", ["On mesurait déjà les températures en degrés Celsius exacts, mais on préférait cacher les chiffres aux visiteurs", "On ne s’intéressait pas du tout à la température avant l’invention des thermomètres numériques modernes", "On utilisait les thermomètres seulement comme décorations, sans jamais observer la hauteur du liquide dedans"], "Des repères sans échelle chiffrée permettaient des comparaisons (plus chaud, plus froid) avant que des échelles communes en degrés rendent les lectures exactes et partageables.", {});
  }
]), ["L’objet montre une étape : comparer avant de quantifier.", "Les perles sont des repères, pas des degrés."]);

/* ---------- SC7.5.3 Technologies de chauffage a Terre-Neuve-et-Labrador ---------- */
E("s7f-u2-heating-tech", 2, ["SC7.5.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle des technologies suivantes sert aujourd’hui à chauffer des maisons à Terre-Neuve-et-Labrador?", "La pompe à chaleur air-air, qui déplace la chaleur de l’air extérieur vers l’intérieur de la maison", ["Le poêle à bois, qui déplace la chaleur de l’air extérieur vers l’intérieur de la maison sans brûler", "La chaudière à mazout, qui capte la chaleur du soleil pour la distribuer dans toute la maison", "Le chauffage électrique, qui brûle un combustible dans un foyer fermé au sous-sol de la maison"], "La pompe à chaleur air-air déplace la chaleur au lieu de la produire par combustion : c’est une technologie de chauffage domestique actuelle dans la province. Chaque autre choix mélange deux technologies.", {});
  },
  function () {
    return mcq("Quel ensemble ne contient que des technologies de chauffage domestique utilisées autrefois ou aujourd’hui dans la province?", "Poêle à bois, chaudière à mazout et chauffage électrique à plinthes dans les maisons", ["Poêle à bois, panneau solaire de piscine et chauffage électrique à plinthes dans les maisons", "Chaudière à mazout, fournaise de forge et poêle à bois pour les ateliers des forgerons", "Chauffage électrique, foyer extérieur de camping et radiateur de voiture pour les maisons"], "Le poêle à bois (autrefois et encore), la chaudière à mazout et les plinthes électriques sont des technologies de chauffage de maisons dans la province.", {});
  }
]), ["Vérifie chaque technologie : sert-elle à chauffer une maison, ici?", "Un seul ensemble ne contient aucun intrus."]);
E("s7f-u2-cr-heating-example", 2, ["SC7.5.3"], 2, "var", varset([
  function () {
    return textq("Donne un exemple d’une technologie de chauffage utilisée autrefois à Terre-Neuve-et-Labrador et un exemple d’une technologie utilisée de nos jours. Pour chacune, dis en une phrase comment elle produit ou déplace la chaleur. (2 points)", ["autrefois : le poêle à bois, qui produit la chaleur en brûlant du bois (ou la chaudière à mazout, qui brûle du mazout)", "de nos jours : la pompe à chaleur, qui déplace la chaleur de l’extérieur vers l’intérieur (ou le chauffage électrique, qui transforme l’électricité en chaleur)"], "<b>Réponse modèle :</b> Autrefois : le poêle à bois, qui produit la chaleur en brûlant du bois dans un foyer et la diffuse dans la pièce. De nos jours : la pompe à chaleur air-air, qui ne brûle rien; elle capte la chaleur de l’air extérieur, même froid, et la déplace à l’intérieur de la maison.<br><br><b>Points d’attribution :</b> 1 point pour la technologie d’autrefois avec son mode de production de chaleur. 1 point pour la technologie actuelle avec son mode de production ou de déplacement de la chaleur.", {});
  }
]), ["Une technologie par époque, et le mécanisme de chacune.", "Produire la chaleur et déplacer la chaleur sont deux mécanismes différents."]);

/* ---------- SC7.5.4 Approches du probleme de chauffage ---------- */
E("s7f-u2-approaches", 2, ["SC7.5.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle des démarches suivantes est une approche différente pour résoudre le problème du chauffage domestique en hiver?", "Isoler et étanchéifier la maison pour garder à l’intérieur la chaleur déjà produite", ["Brûler davantage de bois dans le même poêle pour produire plus de chaleur chaque soir", "Installer une chaudière plus puissante pour produire plus de chaleur pendant tout l’hiver", "Ajouter des plinthes électriques pour produire plus de chaleur dans chaque pièce froide"], "Les trois autres démarches produisent plus de chaleur. Isoler la maison attaque le problème autrement : elle réduit les pertes, donc le besoin de chauffage lui-même.", {});
  },
  function () {
    return mcq("Une famille chauffe sa maison en brûlant du bois qu’elle coupe elle-même. Quelle autre approche, fondée sur une autre idée, pourrait réduire son besoin de chauffage?", "Couvrir les fenêtres de pellicules isolantes et calfeutrer les fuites d’air de la maison", ["Acheter un poêle à bois plus grand pour brûler plus de bois pendant les nuits froides", "Couper une réserve de bois plus grande pour alimenter le poêle pendant tout l’hiver", "Ouvrir les portes des pièces pour laisser la chaleur du poêle circuler dans la maison"], "Réduire les pertes de chaleur (pellicules, calfeutrage) est une approche différente de produire plus de chaleur : elle diminue le besoin à la source.", {});
  }
]), ["Une approche différente change d’idée, pas seulement de quantité.", "Produire plus contre perdre moins : ce sont deux approches."]);
E("s7f-u2-approaches-compare", 2, ["SC7.5.4"], 2, "var", varset([
  function () {
    return mcq("Deux voisins chauffent leur maison : l’un remplace sa chaudière par un modèle plus efficace, l’autre ajoute de l’isolant dans le grenier. Quel énoncé compare correctement leurs approches?", "Le premier améliore la production de chaleur pendant que le second réduit les pertes de chaleur de la maison", ["Le premier réduit les pertes de chaleur pendant que le second améliore la production de chaleur de la maison", "Les deux voisins réduisent les pertes de chaleur, mais avec des matériaux complètement différents", "Les deux voisins améliorent la production de chaleur, mais avec des combustibles différents"], "Une chaudière efficace produit la même chaleur avec moins d’énergie; l’isolant du grenier garde la chaleur produite. Ce sont les deux grandes approches du problème de chauffage.", {});
  }
]), ["Classe chaque démarche : produire mieux, ou perdre moins?", "L’isolant ne produit aucune chaleur; il la conserve."]);

/* ---------- SC7.5.5 Decisions sur les technologies de chauffage ---------- */
E("s7f-u2-heating-adv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Quel est un avantage réel du chauffage électrique à plinthes pour une maison de la province?", "Il s’installe facilement pièce par pièce et ne demande ni combustible ni conduit de fumée", ["Il produit sa chaleur sans consommer aucune énergie, quelle que soit la température dehors", "Il coûte toujours moins cher à faire fonctionner que toutes les autres technologies connues", "Il continue de chauffer la maison pendant les pannes de courant prolongées de l’hiver"], "Les plinthes électriques sont simples à installer, sans réservoir ni cheminée, et se règlent pièce par pièce. En revanche, elles cessent de fonctionner en cas de panne et leur coût d’usage dépend du prix de l’électricité.", {});
  },
  function () {
    return mcq("Quel est un avantage réel d’une pompe à chaleur par rapport à une chaudière à mazout?", "Elle déplace la chaleur au lieu de la produire, donc elle livre plus de chaleur que l’énergie qu’elle consomme", ["Elle produit de la chaleur sans consommer aucune énergie, même par les journées les plus froides", "Elle fonctionne sans électricité, ce qui la rend utile pendant les pannes de courant de l’hiver", "Elle n’exige aucun entretien pendant toute sa durée de vie utile dans une maison de la province"], "Une pompe à chaleur déplace la chaleur de l’extérieur vers l’intérieur : pour chaque unité d’électricité consommée, elle peut livrer plusieurs unités de chaleur. Elle a toutefois besoin d’électricité et d’entretien.", {});
  }
]), ["Un avantage réel reste vrai même quand on connaît les limites de la technologie.", "Élimine les énoncés absolus : toujours, jamais, aucune énergie."]);
E("s7f-u2-heating-disadv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Quel est un inconvénient réel du poêle à bois comme source principale de chauffage?", "Il demande un approvisionnement constant en bois et un chargement régulier pour garder la maison chaude", ["Il ne peut chauffer qu’une seule maison à la fois dans tout un village de la province", "Il produit de la fumée seulement quand le bois brûlé est complètement sec et bien fendu", "Il cesse de fonctionner dès que la température extérieure descend sous le point de congélation"], "Le poêle à bois exige du travail continu : couper, entreposer et charger le bois, et vider les cendres. C’est un inconvénient réel, reconnu dans toute comparaison des technologies.", {});
  }
]), ["Un inconvénient réel se vérifie dans l’usage quotidien de la technologie.", "Les énoncés exagérés ou inversés ne décrivent pas la réalité du poêle."]);
E("s7f-u2-cr-heating-decision", 2, ["SC7.5.5"], 3, "var", varset([
  function () {
    return textq("Une famille d’un village côtier doit remplacer sa vieille chaudière à mazout. Elle hésite entre une nouvelle chaudière à mazout, des plinthes électriques et une pompe à chaleur. Prends une décision avisée pour cette famille : choisis une technologie, donne UN avantage et UN inconvénient de ton choix pour cette situation, et nomme un fait qui pourrait te faire changer d’avis. (3 points)", ["une technologie choisie et tenue", "un avantage et un inconvénient réels, liés à la situation (coût, climat côtier, pannes, entretien, approvisionnement)", "un fait qui changerait la décision (par exemple le prix du mazout, la fréquence des pannes, l’isolation de la maison)"], "<b>Réponse modèle :</b> Décision : la pompe à chaleur, avec les plinthes existantes conservées en appoint. Avantage : elle déplace la chaleur au lieu de brûler du mazout, donc ses coûts de fonctionnement sont plus bas et elle ne dépend pas des livraisons de mazout dans un village côtier. Inconvénient : par grand froid et pendant les pannes de courant, elle ne suffit pas seule, d’où l’appoint électrique conservé. Fait qui changerait la décision : si la maison était très mal isolée, il vaudrait mieux investir d’abord dans l’isolation, car la pompe à chaleur perdrait son avantage dans une maison qui perd sa chaleur.<br><br><b>Points d’attribution :</b> 1 point pour une décision claire. 1 point pour un avantage et un inconvénient réels et liés à la situation. 1 point pour un fait pertinent qui pourrait changer la décision.", {});
  }
]), ["Une décision avisée connaît le prix de son choix : nomme l’inconvénient toi-même.", "Relie chaque argument à la situation : village côtier, vieille chaudière, hiver."]);

/* ---------- SC7.5.6 Amelioration des technologies de chauffage ---------- */
E("s7f-u2-improvement", 2, ["SC7.5.6"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces affirmations décrit une amélioration réelle des technologies de chauffage domestique au fil du temps?", "Les thermostats programmables règlent la température automatiquement selon l’heure et réduisent le gaspillage de chaleur", ["Les maisons anciennes se chauffaient automatiquement selon l’heure, sans aucun réglage de la part des occupants", "Les poêles anciens réglaient leur propre température avec une précision que les systèmes actuels n’atteignent pas", "Les chaudières anciennes consommaient moins de combustible que les modèles efficaces vendus aujourd’hui"], "Le réglage automatique par thermostat programmable est une amélioration moderne : il évite de chauffer une maison vide et réduit le gaspillage.", {});
  },
  function () {
    return mcq("Quel changement montre que le chauffage domestique s’est amélioré au fil du temps?", "Les chaudières actuelles tirent plus de chaleur du même combustible que les chaudières anciennes", ["Les maisons actuelles exigent plus de combustible par hiver que les maisons anciennes comparables", "Les systèmes actuels demandent un chargement manuel du combustible plusieurs fois par jour", "Les fenêtres actuelles laissent passer plus d’air froid que les fenêtres anciennes des maisons"], "L’efficacité a augmenté : une chaudière actuelle convertit une plus grande part de son combustible en chaleur utile pour la maison.", {});
  }
]), ["Une amélioration signifie : même service, moins de pertes ou moins d’efforts.", "Compare les époques dans le bon sens."]);
E("s7f-u2-cr-improvement", 2, ["SC7.5.6"], 2, "var", varset([
  function () {
    return textq("Décris UN exemple précis montrant comment une technologie de chauffage domestique s’est améliorée au fil du temps, et explique en quoi ce changement améliore la vie des occupants. (2 points)", ["un exemple précis (thermostat programmable, chaudière à haut rendement, pompe à chaleur, isolation moderne)", "l’amélioration expliquée (moins de combustible, température stable, moins de travail, moins de gaspillage)"], "<b>Réponse modèle :</b> Exemple : le thermostat programmable a remplacé le réglage manuel des anciens systèmes. Au lieu de chauffer la maison au même niveau jour et nuit, il abaisse la température pendant les absences et la relève avant le retour des occupants. L’amélioration : la maison reste confortable quand elle est occupée, tout en consommant moins de combustible ou d’électricité, donc les coûts et le gaspillage diminuent.<br><br><b>Points d’attribution :</b> 1 point pour un exemple précis d’amélioration au fil du temps. 1 point pour l’effet de cette amélioration sur les occupants, expliqué.", {});
  }
]), ["Choisis un changement que tu peux dater en gros : autrefois contre aujourd’hui.", "L’amélioration doit changer quelque chose de mesurable ou de vécu."]);

/* ---------- SC7.5.7 Evaporation, condensation et pompe a chaleur ---------- */
E("s7f-u2-pump-cycle", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Dans une pompe à chaleur, que fait le liquide frigorigène quand il s’évapore dans l’unité extérieure?", "Il absorbe la chaleur de l’air extérieur en passant de l’état liquide à l’état gazeux", ["Il libère la chaleur de la maison en passant de l’état gazeux à l’état liquide", "Il absorbe la chaleur de la maison en passant de l’état liquide à l’état gazeux", "Il libère la chaleur de l’air extérieur en passant de l’état solide à l’état liquide"], "À l’extérieur, le frigorigène froid s’évapore : ce changement d’état absorbe la chaleur de l’air extérieur, même froid. La condensation, qui libère la chaleur, se produit à l’intérieur.", {});
  },
  function () {
    return mcq("Pourquoi la compréhension de la condensation a-t-elle été essentielle au développement de la pompe à chaleur?", "Parce que la condensation du frigorigène à l’intérieur libère la chaleur captée dehors, au bon endroit", ["Parce que la condensation du frigorigène à l’extérieur libère la chaleur captée dans la maison", "Parce que la condensation transforme le frigorigène en combustible qui brûle dans l’unité intérieure", "Parce que la condensation empêche le frigorigène de changer d’état pendant tout son parcours"], "La pompe à chaleur fonctionne sur les deux changements d’état : l’évaporation capte la chaleur dehors, et la condensation la libère dedans. Sans la condensation, la chaleur captée ne serait jamais livrée à la maison.", {});
  }
]), ["Évaporation : absorbe. Condensation : libère. Place chacun au bon endroit.", "Le cycle déplace la chaleur; il ne la fabrique pas par combustion."]);
E("s7f-u2-pump-science", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé explique le mieux comment la science de l’évaporation et de la condensation a mené à la pompe à chaleur?", "En comprenant que les changements d’état absorbent et libèrent de la chaleur, on a pu concevoir un cycle qui déplace la chaleur d’un endroit à l’autre", ["En comprenant que les liquides brûlent plus proprement, on a pu concevoir un brûleur qui déplace la chaleur d’un endroit à l’autre", "En comprenant que les gaz sont toujours chauds, on a pu concevoir un ventilateur qui déplace la chaleur d’un endroit à l’autre", "En comprenant que le froid se déplace comme un liquide, on a pu concevoir un cycle qui déplace le froid d’un endroit à l’autre"], "La découverte clé est énergétique : évaporer absorbe la chaleur et condenser la libère. Enchaîner les deux dans un circuit fermé déplace la chaleur au lieu de la produire.", {});
  }
]), ["La pompe à chaleur est une application directe des changements d’état.", "Ce n’est ni une combustion ni un simple ventilateur."]);
E("s7f-u2-cr-pump-chain", 2, ["SC7.5.7"], 3, "var", varset([
  function () {
    return textq("Explique la chaîne complète qui mène de la compréhension de l’évaporation et de la condensation jusqu’au chauffage d’une maison par une pompe à chaleur. Ta réponse doit suivre le frigorigène dans son cycle et nommer le changement d’état à chaque étape. (3 points)", ["à l’extérieur, le frigorigène s’évapore et absorbe la chaleur de l’air extérieur", "le gaz est comprimé et transporté à l’intérieur", "à l’intérieur, le frigorigène se condense et libère sa chaleur dans la maison, puis le cycle recommence"], "<b>Réponse modèle :</b> Étape 1 : dans l’unité extérieure, le frigorigène liquide et froid s’évapore; ce changement d’état absorbe la chaleur de l’air extérieur, même quand il fait froid. Étape 2 : le gaz est comprimé, ce qui le rend très chaud, et il est envoyé à l’unité intérieure. Étape 3 : dans l’unité intérieure, le gaz se condense en liquide; ce changement d’état libère la chaleur captée, qui chauffe l’air de la maison. Le liquide retourne ensuite à l’extérieur et le cycle recommence : la pompe déplace la chaleur au lieu de la produire.<br><br><b>Points d’attribution :</b> 1 point pour l’évaporation à l’extérieur et la chaleur absorbée. 1 point pour le transport du gaz (compression) vers l’intérieur. 1 point pour la condensation à l’intérieur et la chaleur libérée dans la maison.", {});
  }
]), ["Suis le frigorigène : dehors, trajet, dedans.", "Chaque changement d’état a un travail : absorber ou libérer."]);

/* ---------- SC7.5.8 Technologies isolantes, hier et aujourd'hui ---------- */
E("s7f-u2-insulator-examples", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces technologies isolantes était utilisée autrefois dans la province pour isoler les maisons?", "Le gazon posé en blocs sur les toits et contre les murs des maisons anciennes", ["La fibre de verre soufflée dans les murs par des machines spécialisées modernes", "Les panneaux de mousse rigide collés sur les fondations des maisons récentes", "Les fenêtres à triple vitrage scellées installées dans les maisons neuves"], "Le gazon (les mottes de tourbe et d’herbe) servait autrefois d’isolant local et gratuit. La fibre de verre soufflée, la mousse rigide et le triple vitrage sont des technologies récentes.", {});
  },
  function () {
    return mcq("Pourquoi la fourrure animale servait-elle d’isolant efficace autrefois?", "Parce que ses poils emprisonnent l’air, et que l’air immobile conduit très mal la chaleur", ["Parce que ses poils produisent de la chaleur quand ils sont exposés au froid de l’hiver", "Parce que ses poils sont métalliques et renvoient la chaleur vers le corps des personnes", "Parce que ses poils absorbent l’eau et deviennent plus lourds pendant les tempêtes"], "Un bon isolant emprisonne l’air : l’air immobile est un mauvais conducteur de chaleur. Les poils de la fourrure gardent une couche d’air contre le corps, comme le font les fibres modernes.", {});
  }
]), ["Un isolant ralentit la conduction; il ne produit pas de chaleur.", "Pense à ce que la fourrure et la fibre de verre ont en commun : l’air emprisonné."]);
E("s7f-u2-insulation-past", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Quel point commun relie les isolants d’autrefois (fourrure, gazon) et ceux d’aujourd’hui (fibre de verre, matériaux isothermes)?", "Ils emprisonnent tous de l’air immobile, qui ralentit le passage de la chaleur par conduction", ["Ils produisent tous une petite quantité de chaleur quand la température extérieure baisse", "Ils sont tous fabriqués à partir de produits du pétrole raffinés en usine spécialisée", "Ils réfléchissent tous le rayonnement du soleil comme le ferait un miroir métallique"], "D’hier à aujourd’hui, le principe est le même : emprisonner l’air pour ralentir la conduction de la chaleur. Seuls les matériaux et leur mise en œuvre ont changé.", {});
  }
]), ["Le principe n’a pas changé; les matériaux, oui.", "Air immobile : voilà l’isolant véritable dans chaque cas."]);
E("s7f-u2-thermos", 2, ["SC7.5.8"], 2, "var", varset([
  function () {
    return mcq("Une bouteille isotherme garde une soupe chaude pendant des heures. Quelle caractéristique de la bouteille combat la conduction?", "Sa double paroi vide d’air, qui empêche la chaleur de traverser par conduction et par convection", ["Sa paroi extérieure métallique, qui conduit la chaleur vers l’extérieur de la bouteille", "Son bouchon en plastique épais, qui produit une petite quantité de chaleur en continu", "Sa surface intérieure colorée, qui absorbe le rayonnement émis par la soupe chaude"], "Le vide entre les deux parois ne contient presque pas de particules : la conduction et la convection n’ont pas de milieu pour transporter la chaleur, qui reste donc dans la soupe.", {});
  }
]), ["Isotherme veut dire isolant : chaque caractéristique combat un mode de transfert.", "Le vide est l’absence de milieu : deux modes en dépendent."]);

/* ---------- SC7.5.9 Les besoins menent aux developpements ---------- */
E("s7f-u2-needs-tech", 2, ["SC7.5.9"], 1, "var", varset([
  function () {
    return mcq("Quel exemple montre le mieux un besoin humain qui mène à un développement technologique lié à la chaleur?", "Le besoin de conserver les aliments au frais a mené au développement des réfrigérateurs domestiques", ["Le besoin de décorer les cuisines a mené au développement des réfrigérateurs domestiques colorés", "Le besoin de voyager plus vite a mené au développement des réfrigérateurs domestiques modernes", "Le besoin de communiquer à distance a mené au développement des réfrigérateurs domestiques"], "Conserver les aliments est un besoin réel : il a poussé le développement de la réfrigération, une technologie de contrôle de la température.", {});
  },
  function () {
    return mcq("Des pêcheurs devaient autrefois conserver le poisson plusieurs jours sans glace naturelle en été. Quel développement ce besoin a-t-il encouragé?", "Le développement de glacières et de systèmes de réfrigération pour conserver le poisson au froid", ["Le développement de fours plus chauds pour cuire le poisson dès sa sortie de l’eau salée", "Le développement de filets plus fins pour capturer seulement les plus gros poissons pêchés", "Le développement de bateaux plus rapides pour vendre le poisson le jour même de la pêche"], "Le besoin de conserver le poisson a encouragé les technologies du froid : glacières, puis réfrigération mécanique, qui contrôlent la température de conservation.", {});
  }
]), ["Le besoin vient d’abord; la technologie répond ensuite.", "Cherche la technologie qui contrôle la température pour répondre au besoin."]);
E("s7f-u2-winter-clothing", 2, ["SC7.5.9"], 2, "var", varset([
  function () {
    return mcq("Le besoin de travailler dehors par grand froid a mené à des vêtements isolants de plus en plus performants. Quel énoncé décrit correctement ce lien entre besoin et développement?", "Le besoin de rester au chaud a poussé la recherche de fibres qui emprisonnent l’air tout en restant légères et sèches", ["Le besoin de rester au chaud a poussé la recherche de fibres métalliques qui produisent leur propre chaleur", "Le besoin de rester au chaud a éliminé tout intérêt pour la science des matériaux isolants modernes", "Le besoin de rester au chaud a rendu les vêtements d’hiver plus lourds chaque année sans exception"], "Le besoin (travailler au froid) oriente la science des matériaux : des fibres légères qui emprisonnent l’air et gèrent l’humidité gardent la chaleur du corps sans l’alourdir.", {});
  }
]), ["Le développement répond au besoin précis : chaud, léger, sec.", "L’isolant emprisonne l’air; il ne fabrique pas de chaleur."]);

/* ---------- SC7.5.10 Carrieres liees a la chaleur ---------- */
E("s7f-u2-career-match", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces carrières est directement liée à la chaleur et à la température?", "Technicien en chauffage et en climatisation qui installe et entretient les systèmes des maisons", ["Technicien en informatique qui installe et entretient les réseaux des écoles du district", "Technicien en automobile qui installe et entretient les freins des voitures des clients", "Technicien en éclairage qui installe et entretient les projecteurs des salles de spectacle"], "Le technicien en chauffage et en climatisation (systèmes CVAC) travaille chaque jour avec la production, le déplacement et le contrôle de la chaleur dans les bâtiments.", {});
  },
  function () {
    return mcq("Qui, parmi ces personnes, exerce une carrière fondée sur les sciences de la chaleur?", "L’inspectrice en efficacité énergétique qui mesure les pertes de chaleur des bâtiments anciens", ["L’inspectrice des aliments qui mesure les portions servies dans les cafétérias des écoles", "L’inspectrice des ponts qui mesure la résistance des structures d’acier des ouvrages", "L’inspectrice des élections qui mesure la participation des électeurs aux scrutins"], "Mesurer les pertes de chaleur et conseiller l’isolation : c’est appliquer les sciences de la chaleur et de la température dans une carrière.", {});
  }
]), ["La carrière cherchée manipule la chaleur ou sa mesure chaque jour.", "Le mot « technicien » ne suffit pas; c’est l’objet du travail qui compte."]);
E("s7f-u2-career-scenario", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Une personne installe des pompes à chaleur, vérifie leur frigorigène et règle leurs thermostats chez des clients. Quelle carrière exerce-t-elle?", "Technicienne en systèmes de chauffage, de ventilation et de climatisation des bâtiments", ["Technicienne en systèmes de plomberie, d’égouts et d’alimentation en eau des bâtiments", "Technicienne en systèmes d’alarme, de surveillance et de sécurité des bâtiments publics", "Technicienne en systèmes de sonorisation, d’éclairage et de scène des bâtiments culturels"], "Installer et entretenir des pompes à chaleur et leurs commandes, c’est le travail des techniciens en chauffage, ventilation et climatisation.", {});
  }
]), ["Les objets nommés (pompe à chaleur, frigorigène, thermostat) désignent le métier.", "Frigorigène égale cycle de chauffage et de refroidissement."]);

/* ---------- SC7.6.1 Construire et mettre a l'essai un thermometre ---------- */
E("s7f-u2-thermometer-build", 2, ["SC7.6.1"], 1, "var", varset([
  function () {
    return mcq("Pour construire un thermomètre scolaire avec une bouteille, de l’eau colorée et une paille, quel choix de méthode convient le mieux?", "Sceller la paille dans le bouchon pour que l’eau colorée monte dans la paille quand elle se dilate", ["Laisser la bouteille ouverte pour que l’eau colorée s’évapore librement pendant les mesures", "Percer le fond de la bouteille pour que l’eau colorée s’écoule pendant le réchauffement", "Remplir la bouteille à ras bord sans aucun espace pour l’air ni pour la paille du modèle"], "Le thermomètre scolaire fonctionne par dilatation : l’eau réchauffée prend plus d’espace et monte dans la paille scellée, où sa hauteur se lit comme une température relative.", {});
  },
  function () {
    return mcq("Quel outil convient le mieux pour marquer les repères d’un thermomètre construit en classe?", "Un thermomètre du commerce placé dans la même eau, pour comparer les lectures des deux instruments", ["Une règle graduée en centimètres, pour espacer les repères également sur toute la paille", "Un chronomètre précis, pour marquer un repère à chaque minute écoulée du chauffage", "Un baromètre de classe, pour associer chaque repère à la pression de l’air du moment"], "Étalonner, c’est comparer : placer le thermomètre construit à côté d’un thermomètre fiable dans la même eau permet de marquer des repères qui correspondent à de vraies températures.", {});
  }
]), ["Construire un thermomètre, c’est choisir une méthode de dilatation lisible, puis l’étalonner.", "Les repères valent ce que vaut l’instrument de comparaison."]);
E("s7f-u2-calibrate", 2, ["SC7.6.1"], 2, "var", varset([
  function () {
    return mcq("Une équipe plonge son thermomètre construit dans l’eau glacée, puis dans l’eau bouillante, et marque la hauteur du liquide dans chaque cas. Que fait l’équipe?", "Elle étalonne son thermomètre en marquant deux points fixes connus de son échelle", ["Elle vérifie si son thermomètre est étanche en le plongeant dans deux eaux différentes", "Elle mesure la quantité d’eau que son thermomètre peut contenir sans déborder", "Elle compare la couleur de son liquide avec celle des liquides des autres équipes"], "Marquer la hauteur à la glace fondante (0 °C) et à l’eau bouillante (100 °C), ce sont les deux points fixes : c’est l’étalonnage qui rend l’échelle utilisable.", {});
  }
]), ["Deux températures connues donnent deux repères : c’est la base de toute échelle.", "Étalonner précède mesurer."]);
E("s7f-u2-thermometer-test", 2, ["SC7.6.1"], 3, "var", varset([
  function () {
    return mcq("Le thermomètre construit par une équipe réagit lentement et ses lectures varient de plusieurs degrés pour la même eau tiède. Quelle modification améliorerait le plus sa mise à l’essai?", "Utiliser une paille plus fine et attendre que la lecture se stabilise avant de la consigner à chaque essai", ["Utiliser une bouteille plus grande et consigner la première lecture aperçue à chaque essai sans attendre", "Colorer l’eau davantage et lire la hauteur du liquide depuis le dessus de la bouteille à chaque essai", "Plonger le thermomètre quelques secondes seulement et estimer la lecture entre deux essais différents"], "Une paille fine amplifie les petites dilatations, et attendre la stabilisation donne des lectures reproductibles : la mise à l’essai devient à la fois plus sensible et plus fiable.", {});
  }
]), ["Deux défauts sont décrits : lenteur et instabilité. La correction doit traiter les lectures elles-mêmes.", "Lire trop tôt est la source classique des lectures qui varient."]);

/* ---------- SC7.6.2 Compiler et afficher les donnees du thermometre ---------- */
E("s7f-u2-thermometer-data", 2, ["SC7.6.2"], 1, "var", varset([
  function () {
    return mcq("Une équipe met à l’essai son thermomètre construit dans trois eaux (glacée, tiède, chaude) et compare ses lectures à celles d’un thermomètre du commerce. Quel affichage présente correctement ces données?", "Un tableau avec une ligne par eau, une colonne pour le thermomètre construit et une colonne pour le thermomètre du commerce", ["Un tableau avec une ligne par membre de l’équipe, une colonne pour le thermomètre construit et une colonne pour les commentaires", "Un paragraphe qui décrit les trois eaux sans présenter aucune des lectures consignées pendant les essais en classe", "Un dessin du thermomètre construit avec la lecture la plus élevée inscrite dans un coin de la feuille de l’équipe"], "Les données d’une mise à l’essai se comparent côte à côte : pour chaque eau, la lecture construite et la lecture de référence, dans un tableau étiqueté.", {});
  }
]), ["Compiler et afficher, c’est mettre les lectures comparables dans un même tableau.", "Chaque eau a deux lectures : construite et de référence."]);
E("s7f-u2-cr-thermometer-display", 2, ["SC7.6.2"], 2, "var", varset([
  function () {
    return textq("Voici les lectures d’une mise à l’essai : eau glacée, construit 1, commerce 0; eau tiède, construit 22, commerce 25; eau chaude, construit 45, commerce 50 (en degrés de chaque échelle). (a) Présente ces données dans un tableau organisé. (b) Énonce ce que les données montrent sur la précision du thermomètre construit. (2 points)", ["un tableau avec titre et colonnes étiquetées (eau, thermomètre construit, thermomètre du commerce)", "la conclusion : le thermomètre construit sous-estime, et l’écart grandit quand la température monte (0, 3, puis 5 degrés)"], "<b>Réponse modèle :</b> (a) Tableau intitulé « Lectures du thermomètre construit comparées au thermomètre du commerce » : lignes Eau glacée (1, 0), Eau tiède (22, 25), Eau chaude (45, 50). (b) Les données montrent que le thermomètre construit lit toujours plus bas que le thermomètre du commerce, et que l’écart augmente avec la température : 0 degré dans l’eau glacée, 3 degrés dans l’eau tiède et 5 degrés dans l’eau chaude. Son échelle s’étire donc moins vite que l’échelle réelle.<br><br><b>Points d’attribution :</b> 1 point pour un tableau organisé avec titre et en-têtes. 1 point pour la conclusion tirée des écarts, y compris leur augmentation avec la température.", {});
  }
]), ["Le tableau compare les deux instruments eau par eau.", "Calcule les écarts avant de conclure : leur comportement est la découverte."]);

/* ---------- SC7.6.3 Hypothese, experience, variables, conclusion ---------- */
E("s7f-u2-variables-plateau", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("Une équipe chauffe deux béchers d’eau, l’un de 100 mL et l’autre de 200 mL, sur des éléments identiques, pour comparer le temps d’ébullition. Quelle variable est la variable indépendante?", "La quantité d’eau dans chaque bécher, qui est la variable que l’équipe a fait varier", ["Le temps nécessaire pour atteindre l’ébullition, qui est la variable que l’équipe mesure", "La puissance des éléments chauffants, qui est la variable que l’équipe garde constante", "La sorte de bécher utilisée pour les deux chauffages, qui est gardée identique par l’équipe"], "La variable indépendante est celle qu’on fait varier délibérément : ici, la quantité d’eau. Le temps d’ébullition est la variable dépendante mesurée.", {});
  }
]), ["Indépendante : on la change. Dépendante : on la mesure.", "Les constantes sont nommées comme telles dans les choix."]);
E("s7f-u2-hypothesis-form", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces hypothèses est vérifiable par une expérience sur la fonte de la glace?", "« Si on saupoudre du sel sur la glace, alors elle fondra plus vite que la glace sans sel. »", ["« La glace fond parce que le printemps est la plus belle saison de toute l’année. »", "« Si on regarde la glace assez longtemps, alors elle finira par fondre un jour. »", "« La glace fond toujours trop lentement quand on a hâte de partir en excursion. »"], "Une hypothèse vérifiable relie une variable qu’on change (le sel) à un résultat qu’on mesure (la vitesse de fonte) : elle peut être appuyée ou réfutée par des données.", {});
  }
]), ["Format utile : si (variable changée), alors (résultat mesuré).", "Une opinion ou une évidence ne se vérifie pas par expérience."]);
E("s7f-u2-experiment-chain", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe veut vérifier si la couleur d’un contenant change la vitesse de refroidissement de l’eau chaude. Quelle suite d’étapes respecte l’ordre complet d’une démarche expérimentale?", "Formuler une hypothèse, faire varier seulement la couleur, mesurer les températures, puis énoncer une conclusion fondée sur les données", ["Énoncer une conclusion, formuler une hypothèse ensuite, puis décider quelles variables l’équipe aurait dû contrôler pendant l’essai", "Mesurer les températures, changer plusieurs variables à la fois, puis formuler une hypothèse qui explique les résultats obtenus", "Faire varier seulement la couleur, formuler la conclusion avant les mesures, puis choisir les données qui appuient la conclusion"], "La démarche complète suit un ordre : hypothèse d’abord, expérience contrôlée ensuite, mesures, et conclusion tirée des données à la fin, jamais avant.", {});
  }
]), ["La conclusion vient en dernier, et elle naît des données.", "Une seule variable change à la fois pendant l’expérience."]);
E("s7f-u2-cr-inquiry", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return textq("Une équipe chauffe 100 mL d’eau et consigne : 20 °C au départ, 45 °C après 2 minutes, 70 °C après 4 minutes, 95 °C après 6 minutes, puis 100 °C à 8 minutes et encore 100 °C à 10 minutes. (a) Énonce une conclusion fondée sur ces données. (b) Explique comment les données appuient ta conclusion, en citant les valeurs. (3 points)", ["la température monte régulièrement d’environ 25 °C par 2 minutes jusqu’à l’ébullition, puis reste à 100 °C", "les valeurs citées montrent la montée régulière, puis le plateau à 100 °C malgré le chauffage continu"], "<b>Réponse modèle :</b> (a) Conclusion : l’eau se réchauffe à un rythme régulier jusqu’à son point d’ébullition, puis sa température cesse de monter même si le chauffage continue. (b) Appui : les données montent de 20 à 45, puis 70, puis 95 °C, soit environ 25 °C toutes les 2 minutes; ensuite, les lectures restent à 100 °C à 8 et à 10 minutes, ce qui montre le plateau de l’ébullition, où l’énergie sert au changement d’état.<br><br><b>Points d’attribution :</b> 1 point pour la conclusion sur la montée régulière. 1 point pour la conclusion sur le plateau à 100 °C. 1 point pour les valeurs citées à l’appui des deux parties de la conclusion.", {});
  }
]), ["Décris d’abord le motif des nombres, puis nomme ce qu’il signifie.", "Les deux dernières lectures identiques sont aussi des données."]);

/* ---------- SC7.6.4 Outils et appareils : surete et precision ---------- */
E("s7f-u2-tools-safety", 2, ["SC7.6.4"], 1, "var", varset([
  function () {
    return mcq("Quelle pratique rend l’utilisation d’un élément chauffant à la fois sûre et précise pendant une expérience?", "Placer le bécher au centre de l’élément, surveiller le chauffage et lire le thermomètre à la hauteur des yeux", ["Placer le bécher au bord de l’élément, quitter la table et lire le thermomètre depuis le dessus du bécher", "Chauffer le bécher fermé hermétiquement, sans surveillance, et secouer le thermomètre pour lire la valeur", "Tenir le bécher à la main au-dessus de l’élément et deviner la température sans utiliser le thermomètre"], "Sécurité et précision vont ensemble : montage stable et surveillé, instrument lu correctement à la hauteur des yeux, et jamais de contenant scellé sur un élément chauffant.", {});
  },
  function () {
    return mcq("Avant de verser de l’eau chaude d’un bécher, quelle précaution est la plus importante?", "Vérifier que le bécher est conçu pour la chaleur et le saisir avec une pince ou un gant isolant prévu à cet effet", ["Secouer le bécher pour vérifier la température de l’eau avant de la verser dans l’évier de la classe", "Verser l’eau le plus vite possible pour passer moins de temps près du bécher chaud pendant l’expérience", "Tenir le bécher par le haut avec les doigts pour mieux contrôler le versement de l’eau chaude dedans"], "Un contenant chaud se manipule avec l’outil prévu (pince ou gant isolant) après avoir vérifié qu’il supporte la chaleur : c’est la précaution qui prévient les brûlures et les éclats.", {});
  }
]), ["Sûr et précis : les deux critères doivent être satisfaits ensemble.", "Un contenant scellé ou tenu à la main près d’un élément est un danger."]);
E("s7f-u2-tools-accurate", 2, ["SC7.6.4"], 2, "var", varset([
  function () {
    return mcq("Une équipe mesure la température d’une eau chauffée, mais le thermomètre touche le fond du bécher posé sur l’élément. Pourquoi leurs lectures sont-elles faussées?", "Parce que le thermomètre mesure alors la température du fond chauffé plutôt que celle de l’eau du bécher", ["Parce que le thermomètre mesure alors la température de l’air au-dessus de l’eau du bécher chauffé", "Parce que le fond du bécher refroidit le thermomètre et abaisse toutes ses lectures de moitié", "Parce que le contact avec le fond empêche complètement le liquide du thermomètre de se dilater"], "Le fond du bécher, en contact avec l’élément, est plus chaud que l’eau. Le thermomètre doit être suspendu dans l’eau, sans toucher les parois ni le fond, pour mesurer l’eau elle-même.", {});
  }
]), ["Un instrument mesure ce qu’il touche.", "L’erreur vient de l’emplacement de l’instrument, pas de l’instrument."]);

/* ---------- SC7.6.5 Organiser et afficher les donnees ---------- */
E("s7f-u2-table-build", 2, ["SC7.6.5"], 1, "var", varset([
  function () {
    return mcq("Une équipe consigne la température d’une eau qui refroidit chaque minute pendant dix minutes. Quel affichage organise correctement ces données?", "Un tableau avec une colonne pour le temps en minutes et une colonne pour la température en degrés Celsius", ["Un tableau avec une colonne pour le temps en minutes et une colonne pour la couleur de l’eau à chaque minute", "Un paragraphe qui raconte le refroidissement en phrases, sans présenter les températures consignées chaque minute", "Une liste des températures sans les minutes correspondantes, écrite dans l’ordre où l’équipe s’en souvient"], "Temps et température, avec leurs unités, dans des colonnes étiquetées : c’est l’organisation qui rend les données utilisables et graphables.", {});
  }
]), ["Chaque valeur doit rester liée à son moment et à son unité.", "Un affichage organisé prépare directement le graphique."]);
E("s7f-u2-graph-choice", 2, ["SC7.6.5"], 3, "var", varset([
  function () {
    return mcq("Des données montrent la température d’une eau chauffée, relevée toutes les deux minutes pendant vingt minutes. Quel graphique convient le mieux pour montrer l’évolution de la température?", "Un graphique en ligne, car la température varie continûment avec le temps pendant tout le chauffage", ["Un diagramme en barres, car la température varie continûment avec le temps pendant tout le chauffage", "Un pictogramme, car la température varie continûment avec le temps pendant tout le chauffage de l’eau", "Un graphique circulaire, car la température varie continûment avec le temps pendant tout le chauffage"], "Une grandeur qui varie continûment dans le temps se représente par un graphique en ligne : la pente y montre directement la vitesse du réchauffement et les plateaux.", {});
  }
]), ["Le type de graphique suit le type de données : continues ou en catégories.", "Temps continu égale ligne continue."]);
E("s7f-u2-cr-display", 2, ["SC7.6.5", "SC7.6.8"], 2, "var", varset([
  function () {
    return textq("Une équipe a mesuré la température d’une eau qui refroidit : 0 min, 80 °C; 2 min, 71 °C; 4 min, 63 °C; 6 min, 56 °C; 8 min, 50 °C; 10 min, 45 °C. (a) Dis quel affichage convient le mieux à ces données et pourquoi. (b) Décris la tendance que l’affichage révèle. (3 points)", ["un graphique en ligne (ou un tableau organisé), car les données varient continûment avec le temps", "la tendance : la température baisse de moins en moins vite (les écarts diminuent : 9, 8, 7, 6, 5 degrés)"], "<b>Réponse modèle :</b> (a) Un graphique en ligne convient le mieux : le temps et la température sont des grandeurs continues, et la ligne montre d’un coup d’œil comment le refroidissement évolue. (b) La température baisse tout au long des dix minutes, mais de moins en moins vite : les baisses par intervalle de 2 minutes sont de 9, 8, 7, 6 puis 5 degrés. Le refroidissement ralentit à mesure que l’eau s’approche de la température de la pièce.<br><br><b>Points d’attribution :</b> 1 point pour l’affichage choisi avec sa justification. 1 point pour la baisse continue décrite. 1 point pour le ralentissement du refroidissement, appuyé sur les écarts entre les lectures.", {});
  }
]), ["Choisis l’affichage selon la nature des données, puis lis sa forme.", "Compare les écarts successifs : ils racontent la tendance."]);

/* ---------- SC7.6.6 Concevoir une experience controlee ---------- */
E("s7f-u2-design-absorb", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("Pour vérifier si les surfaces foncées absorbent plus de rayonnement que les surfaces pâles, quelle organisation d’expérience contrôle correctement les variables?", "Deux boîtes identiques de couleurs différentes, sous la même lampe, à la même distance, avec la même durée d’exposition", ["Deux boîtes de tailles différentes, sous des lampes différentes, placées à des distances choisies au hasard", "Une seule boîte foncée sous une lampe pendant une heure, comparée au souvenir d’une boîte pâle testée hier", "Deux boîtes identiques de couleurs différentes, l’une au soleil et l’autre à l’ombre d’un rideau de la classe"], "Seule la couleur change; la lampe, la distance, la taille des boîtes et la durée restent identiques. Toute différence de température peut alors être attribuée à la surface.", {});
  }
]), ["Une variable changée (la couleur), toutes les autres gardées constantes.", "Si la lumière diffère entre les boîtes, l’expérience ne prouve rien."]);
E("s7f-u2-design-challenge", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe veut concevoir l’expérience suivante : quel contenant garde l’eau chaude le plus longtemps? Quelle formulation transforme cette question en expérience contrôlée complète?", "Comparer des contenants de formes différentes mais de même volume, remplis de la même eau à la même température de départ, mesurée aux mêmes intervalles", ["Comparer des contenants remplis de quantités d’eau différentes à des températures de départ choisies par chaque membre de l’équipe", "Comparer un seul contenant mesuré un jour chaud, puis le même contenant mesuré un jour froid de la semaine suivante à l’école", "Comparer des contenants de formes différentes en demandant aux élèves lequel semble garder l’eau chaude le plus longtemps"], "Une expérience complète fixe ce qui varie (la forme du contenant), ce qui se mesure (la température dans le temps) et ce qui reste constant (volume, température de départ, intervalles de mesure).", {});
  }
]), ["Question, variable, mesure, constantes : les quatre morceaux d’un plan complet.", "Une opinion (« semble ») n’est pas une mesure."]);
E("s7f-u2-cr-design-test", 2, ["SC7.6.6"], 3, "var", varset([
  function () {
    return textq("Conçois une expérience pour vérifier cette question : « Un contenant enveloppé de papier journal garde-t-il l’eau chaude plus longtemps qu’un contenant sans enveloppe? » Décris (a) ton hypothèse, (b) la variable que tu feras varier, (c) la variable que tu mesureras et comment, (d) deux variables constantes et (e) ta règle de décision. (4 points)", ["une hypothèse vérifiable comparant les deux contenants", "variable indépendante : la présence ou l’absence de l’enveloppe de papier journal", "variable dépendante : la température de l’eau mesurée aux mêmes intervalles pendant une durée fixe", "deux constantes (même contenant de base, même volume et même température de départ, même pièce)", "une règle de décision (comparer les températures finales ou les baisses totales des deux contenants)"], "<b>Réponse modèle :</b> (a) Hypothèse : l’eau du contenant enveloppé de papier journal restera plus chaude, car le papier emprisonne l’air et ralentit les pertes de chaleur. (b) Variable indépendante : la présence ou l’absence de l’enveloppe de papier journal. (c) Variable dépendante : la température de l’eau, mesurée avec le même thermomètre toutes les 2 minutes pendant 20 minutes. (d) Constantes : deux contenants identiques, le même volume d’eau à la même température de départ, la même pièce et les mêmes moments de mesure. (e) Décision : je compare la baisse totale de température des deux contenants; si le contenant enveloppé a perdu nettement moins de degrés, les données appuient l’hypothèse.<br><br><b>Points d’attribution :</b> 1 point pour une hypothèse vérifiable. 1 point pour la variable indépendante et la variable dépendante avec son mode de mesure. 1 point pour deux constantes pertinentes. 1 point pour une règle de décision fondée sur la comparaison des résultats.", {});
  }
]), ["Cinq morceaux : hypothèse, variable variée, variable mesurée, constantes, décision.", "La mesure doit préciser l’instrument, les intervalles et la durée."]);

/* ---------- SC7.6.7 Utiliser les appareils de facon securitaire ---------- */
E("s7f-u2-apparatus-safety", 2, ["SC7.6.7"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces conduites est sécuritaire pendant une expérience avec de l’eau chaude et du verre?", "Signaler immédiatement tout bris de verre à l’enseignant et ne jamais ramasser les morceaux à mains nues", ["Ramasser les morceaux de verre à mains nues et les jeter rapidement dans la poubelle de la classe", "Continuer l’expérience avec un bécher fêlé en le tenant fermement pendant tout le chauffage de l’eau", "Goûter l’eau chauffée pour vérifier sa température avant de la mesurer avec le thermomètre prévu"], "Le verre brisé se signale et se laisse aux soins de l’enseignant avec l’équipement prévu. Un bécher fêlé ne s’utilise jamais, et on ne goûte jamais les substances d’une expérience.", {});
  }
]), ["La sécurité d’abord : signaler, ne pas toucher, ne pas utiliser le matériel endommagé.", "Une seule conduite respecte toutes les règles à la fois."]);
E("s7f-u2-apparatus-choice", 2, ["SC7.6.7"], 2, "var", varset([
  function () {
    return mcq("Pour transférer 100 mL d’eau chaude d’un bécher à un cylindre gradué sans éclaboussures, quel choix d’outil et de geste est le plus sûr?", "Verser lentement le long d’une tige de verre, le cylindre posé sur la table, en tenant le bécher avec une pince prévue", ["Verser rapidement en tenant le cylindre à bout de bras au-dessus de l’évier, en saisissant le bécher à mains nues", "Verser l’eau en secouant le bécher pour vider les dernières gouttes, le cylindre tenu à la main par un coéquipier", "Verser l’eau chaude à travers un entonnoir étroit tenu au-dessus du cylindre posé sur le bord de la table de travail"], "Un versement sûr est lent et contrôlé : récipient stable sur la table, tige de verre pour guider le liquide, et bécher chaud tenu avec l’outil isolant prévu.", {});
  }
]), ["Stabilité, lenteur et protection des mains : les trois critères du geste sûr.", "Tout ce qui est tenu en l’air ou secoué augmente le risque."]);

/* ---------- SC7.6.8 Afficher les donnees en tableaux et graphiques ---------- */
E("s7f-u2-graph-key", 2, ["SC7.6.8"], 1, "var", varset([
  function () {
    var q = mcq("Sur le graphique des deux boîtes sous la lampe, que faut-il consulter pour savoir quelle courbe appartient à la boîte foncée?", "La légende du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience", ["Le titre des axes du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience", "La taille du graphique, qui associe chaque couleur de courbe à la boîte qu’elle représente dans l’expérience menée", "La date de l’expérience, qui associe chaque couleur de courbe à la boîte qu’elle représente dans le graphique affiché"], "La légende est la clé du graphique : elle dit quelle courbe correspond à quelle boîte. Sans elle, les courbes ne peuvent pas être interprétées correctement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Un graphique complet comprend une légende quand plusieurs séries y figurent.", "Axes, titre et légende ont chacun leur travail."]);
E("s7f-u2-display-absorb", 2, ["SC7.6.8", "SC7.6.5"], 3, "var", varset([
  function () {
    var q = mcq("Le graphique montre les températures des deux boîtes sous la lampe. Après 20 minutes, quel écart sépare les deux boîtes, et que montre cet écart?", "Un écart de 12 °C, qui montre que la surface foncée a absorbé le rayonnement plus vite que la surface claire", ["Un écart de 12 °C, qui montre que la surface claire a absorbé le rayonnement plus vite que la surface foncée", "Un écart de 22 °C, qui montre que la surface foncée a absorbé le rayonnement plus vite que la surface claire", "Un écart de 2 °C, qui montre que les deux surfaces ont absorbé le rayonnement exactement au même rythme"], "À 20 minutes, la boîte foncée atteint 42 °C et la boîte claire 30 °C : l’écart est de 12 °C. Sous la même lampe, cet écart montre que la surface foncée absorbe le rayonnement plus efficacement.", {}); q.figure = s7fAbsorbGraphSVG([0, 5, 10, 15, 20], [20, 27, 33, 38, 42], [20, 23, 26, 28, 30]); return q;
  }
]), ["Lis les deux valeurs finales, puis soustrais.", "L’écart se lit à la fin; son interprétation suit la règle d’absorption."]);

/* ---------- SC7.6.9 Conclusions fondees sur les donnees ---------- */
E("s7f-u2-conclusion-support", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Hypothèse : « L’eau salée bout à une température plus élevée que l’eau pure. » Les mesures donnent 100 °C pour l’eau pure et 102 °C pour l’eau salée, répétées trois fois. Quelle conclusion est correcte?", "Les données appuient l’hypothèse, car l’eau salée a bouilli à une température plus élevée à chaque essai répété", ["Les données réfutent l’hypothèse, car l’eau salée a bouilli à une température plus élevée à chaque essai répété", "Les données ne disent rien, car un seul essai aurait suffi pour trancher la question dès le départ de l’expérience", "Les données appuient l’hypothèse contraire, car l’eau pure a bouilli à une température plus basse à chaque essai"], "L’hypothèse prévoyait une ébullition plus chaude pour l’eau salée; les mesures répétées le confirment (102 °C contre 100 °C) : les données appuient l’hypothèse.", {});
  }
]), ["Compare la prévision et les mesures, sans inverser les rôles.", "Des essais répétés qui s’accordent renforcent une conclusion."]);
E("s7f-u2-conclusion-refute", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Hypothèse : « Un contenant noir garde l’eau chaude plus longtemps qu’un contenant blanc. » Après 15 minutes, l’eau du contenant noir est à 48 °C et celle du contenant blanc à 55 °C. Quelle conclusion est correcte?", "Les données réfutent l’hypothèse, car l’eau du contenant noir s’est refroidie davantage que celle du contenant blanc", ["Les données appuient l’hypothèse, car l’eau du contenant noir s’est refroidie davantage que celle du contenant blanc", "Les données appuient l’hypothèse, car les deux contenants ont gardé leur eau exactement à la même température finale", "Les données ne disent rien, car une seule mesure finale ne peut jamais servir à conclure quoi que ce soit du tout"], "L’hypothèse prévoyait un avantage pour le contenant noir; les mesures montrent le contraire (48 °C contre 55 °C) : les données réfutent l’hypothèse pour cet essai.", {});
  }
]), ["La conclusion suit les nombres, pas l’attente de l’équipe.", "Réfuter est un résultat valide, pas un échec."]);
E("s7f-u2-cr-conclusion", 2, ["SC7.6.9"], 3, "var", varset([
  function () {
    return textq("Hypothèse d’une équipe : « Doubler l’épaisseur du papier journal autour d’un contenant doublera le temps pendant lequel l’eau reste au-dessus de 60 °C. » Résultats : sans enveloppe, 6 minutes; une épaisseur, 11 minutes; deux épaisseurs, 15 minutes. Énonce une conclusion complète : dis ce que les données appuient, ce qu’elles réfutent, et cite les valeurs. (3 points)", ["les données appuient l’idée que l’enveloppe ralentit le refroidissement (6, puis 11, puis 15 minutes)", "les données réfutent le doublement exact (11 n’est pas 12, et 15 n’est pas 22)", "la conclusion distingue l’effet réel de l’isolant de la proportion exacte prédite"], "<b>Réponse modèle :</b> Les données appuient l’idée générale de l’hypothèse : chaque épaisseur ajoutée prolonge le temps au-dessus de 60 °C, qui passe de 6 minutes sans enveloppe à 11 minutes avec une épaisseur, puis à 15 minutes avec deux épaisseurs. En revanche, les données réfutent le doublement exact prévu : une épaisseur aurait dû donner 12 minutes (elle donne 11), et deux épaisseurs 22 minutes (elles donnent 15). La conclusion complète est donc nuancée : l’isolant fonctionne, mais son effet augmente moins vite que le doublement annoncé.<br><br><b>Points d’attribution :</b> 1 point pour la partie appuyée, avec les valeurs. 1 point pour la partie réfutée, avec les valeurs comparées aux prévisions. 1 point pour une conclusion qui distingue l’effet réel de la proportion prédite.", {});
  }
]), ["Une conclusion complète peut appuyer une partie et réfuter l’autre.", "Compare chaque résultat à la prévision exacte, pas seulement à l’idée générale."]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U2 = { "s7f-u2-cr-design-test": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });
