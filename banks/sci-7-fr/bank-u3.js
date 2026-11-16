// CRMARKS: s7f-u3-cr-pure=2
// CRMARKS: s7f-u3-cr-classify=3
// CRMARKS: s7f-u3-cr-dissolving=3
// CRMARKS: s7f-u3-cr-concentration=3
// CRMARKS: s7f-u3-cr-solubility=2
// CRMARKS: s7f-u3-cr-separate=3
// CRMARKS: s7f-u3-cr-three-part=3
// CRMARKS: s7f-u3-cr-distill=2
// CRMARKS: s7f-u3-cr-salt-decision=3
// CRMARKS: s7f-u3-cr-best-fit=3
// CRMARKS: s7f-u3-cr-design-solubility=4
// CRMARKS: s7f-u3-cr-new-question=2
// Sciences 7, Unite 3 : Les melanges et les solutions (SC7.7.1 a
// SC7.9.8), banque construite le Nov 16, 2026.
// Existing tests and question banks were reviewed only to gauge the expected depth and range of treatment. All items in this bank were written new for this app.
// Residus CORE : les questions de SC7.7.6 et SC7.9.6 evaluent le choix et
// l'ordre des techniques de separation ainsi que le jugement sur les
// procedures; elles n'evaluent pas la manipulation reelle en laboratoire.
// Les questions de SC7.9.7 evaluent le jugement sur l'usage efficace et
// exact des instruments; elles n'evaluent pas la manipulation elle-meme.

/* ---------- SC7.7.1 Substances pures et melanges ---------- */
E("s7f-u3-classify-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces substances est une substance pure, selon la théorie particulaire de la matière?", "L’eau distillée, formée d’un seul type de particules identiques entre elles", ["L’eau de mer, formée de particules d’eau et de sels dissous variés", "L’air de la classe, formé de plusieurs gaz mélangés les uns aux autres", "Le jus d’orange, formé d’eau, de sucres et de pulpe en suspension"], "Une substance pure ne contient qu’un seul type de particules. L’eau distillée n’en contient qu’un; l’eau de mer, l’air et le jus sont des mélanges de plusieurs types de particules.", {});
  },
  function () {
    var q = mcq("Dans le schéma des particules, quel récipient montre une substance pure?", "Le récipient 1, qui contient un seul type de particules du début à la fin", ["Le récipient 2, qui contient deux types de particules mélangés également", "Le récipient 3, qui contient deux types de particules séparés en couches", "Aucun récipient, car les trois contiennent plusieurs types de particules"], "Le récipient 1 ne contient qu’un seul type de particules : c’est une substance pure. Les récipients 2 et 3 contiennent deux types de particules : ce sont des mélanges.", {}); q.figure = s7fMixturePanelSVG(); return q;
  }
]), ["Substance pure égale un seul type de particules.", "Compte les types de particules, pas leur nombre."]);
E("s7f-u3-particle-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    return mcq("Un échantillon contient uniquement des particules toutes identiques. Comment classe-t-on cet échantillon?", "Comme une substance pure, car un seul type de particules le compose entièrement", ["Comme un mélange homogène, car un seul type de particules le compose entièrement", "Comme un mélange hétérogène, car les particules sont réparties également partout", "Comme une solution, car les particules sont trop petites pour être vues à l’œil nu"], "Un seul type de particules signifie une substance pure. Un mélange, homogène ou non, contient toujours au moins deux types de particules.", {});
  }
]), ["La définition décide : un type ou plusieurs types de particules?", "La répartition égale ne transforme pas une substance pure en mélange."]);
E("s7f-u3-pure-misconception", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return mcq("Un élève affirme : « L’eau du robinet est une substance pure parce qu’elle est claire et propre. » Quelle réponse corrige correctement cette affirmation?", "« L’eau du robinet est un mélange : elle contient des minéraux dissous et des produits de traitement en plus des particules d’eau. »", ["« L’eau du robinet est une substance pure : toute eau claire et propre ne contient qu’un seul type de particules. »", "« L’eau du robinet est un mélange hétérogène : on peut voir ses minéraux à l’œil nu quand on la regarde de près. »", "« L’eau du robinet est une substance pure seulement l’hiver, quand les minéraux dissous gèlent dans les tuyaux. »"], "La clarté ne décide pas de la pureté chimique. L’eau du robinet contient des substances dissoutes invisibles : c’est un mélange (une solution), pas une substance pure.", {});
  }
]), ["Pur, en sciences, décrit les particules, pas l’apparence.", "Invisible ne veut pas dire absent : les substances dissoutes comptent."]);
E("s7f-u3-cr-pure", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return textq("Un élève mélange du sable fin dans de l’eau distillée, agite, puis laisse reposer. (a) Classe l’eau distillée de départ et le mélange final, en utilisant la théorie particulaire. (b) Explique pourquoi le classement change après l’ajout du sable. (2 points)", ["l’eau distillée est une substance pure (un seul type de particules)", "le mélange final contient deux types de particules (eau et sable) : c’est un mélange, et comme le sable finit par se déposer, un mélange hétérogène"], "<b>Réponse modèle :</b> (a) L’eau distillée de départ est une substance pure : elle ne contient qu’un seul type de particules. Après l’ajout du sable, le contenu du récipient est un mélange, car il contient deux types de particules, celles de l’eau et celles du sable; comme le sable se dépose au fond au lieu de se répartir également, c’est un mélange hétérogène. (b) Le classement change parce que le nombre de types de particules change : un seul type donne une substance pure, deux types ou plus donnent un mélange.<br><br><b>Points d’attribution :</b> 1 point pour les deux classements corrects. 1 point pour l’explication fondée sur le nombre de types de particules.", {});
  }
]), ["Classe par les particules : avant, un type; après, deux types.", "Le sable déposé au fond annonce le caractère hétérogène."]);

/* ---------- SC7.7.2 Melanges heterogenes et homogenes ---------- */
E("s7f-u3-classify-mixtures", 3, ["SC7.7.2"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces mélanges est un mélange homogène (une solution)?", "L’eau salée, où le sel dissous est réparti également dans toute l’eau contenue", ["Le mélange de sable et d’eau, où le sable se dépose au fond du récipient", "La salade de fruits, où chaque morceau de fruit reste visible et distinct", "Le granit, où chaque minéral forme des grains visibles dans la roche"], "Dans un mélange homogène, les particules sont réparties également et on ne distingue pas les composantes : l’eau salée en est un exemple. Les autres mélanges montrent des parties distinctes : ils sont hétérogènes.", {});
  },
  function () {
    return mcq("Lequel de ces mélanges est un mélange hétérogène (mécanique)?", "Le mélange de céréales, où chaque sorte de grain reste visible et séparable", ["L’eau sucrée, où le sucre dissous est réparti également dans toute l’eau", "L’air, où les gaz sont répartis également dans toute l’atmosphère terrestre", "Le vinaigre, où l’acide est réparti également dans toute l’eau du produit"], "Un mélange hétérogène garde des parties distinctes et visibles : les grains de céréales. Les autres exemples sont des solutions, aux composantes réparties également.", {});
  }
]), ["Homogène : impossible de distinguer les parties. Hétérogène : les parties se voient.", "Dissous et réparti également égale solution."]);
E("s7f-u3-light-test", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("On fait traverser un faisceau lumineux à deux liquides : dans le premier, le faisceau reste invisible; dans le second, son trajet brille dans le liquide. Que peut-on conclure?", "Le second liquide contient des particules en suspension assez grosses pour diffuser la lumière : ce n’est pas une vraie solution", ["Le premier liquide contient des particules en suspension assez grosses pour diffuser la lumière dans toutes les directions", "Les deux liquides sont des solutions véritables, car un faisceau peut traverser n’importe quel mélange sans exception", "Le second liquide est une substance pure, car seules les substances pures peuvent diffuser la lumière d’un faisceau"], "Dans une vraie solution, les particules dissoutes sont trop petites pour diffuser la lumière : le faisceau reste invisible. Un trajet brillant signale des particules en suspension : un mélange hétérogène très fin.", {});
  }
]), ["Le faisceau visible trahit des particules assez grosses pour diffuser la lumière.", "Dissous égale trop petit pour être vu, même par un faisceau."]);
E("s7f-u3-combination", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("Un verre contient de l’eau, du sable déposé au fond, du sel dissous invisible et une goutte d’huile qui flotte. Quel énoncé classe correctement le contenu du verre?", "C’est un mélange globalement hétérogène, qui contient en plus une solution (l’eau salée) comme l’une de ses parties", ["C’est une solution complète, car le sel dissous rend tout le contenu homogène du haut jusqu’au fond du verre", "C’est une substance pure, car l’eau constitue la plus grande partie du contenu du verre examiné en classe", "C’est un mélange homogène, car l’huile, le sable et l’eau finissent toujours par se mélanger également"], "Le verre entier n’est pas uniforme (sable au fond, huile en surface) : c’est un mélange hétérogène. Mais sa partie liquide, l’eau salée, est elle-même une solution : les deux classements coexistent à des niveaux différents.", {});
  }
]), ["Classe le tout, puis classe chaque partie séparément.", "Un mélange peut contenir une solution sans être une solution."]);
E("s7f-u3-cr-classify", 3, ["SC7.7.2"], 3, "var", varset([
  function () {
    return textq("Classe chacun de ces mélanges comme homogène ou hétérogène, et justifie chaque classement par la répartition de ses particules : (a) du lait au chocolat bien brassé; (b) de l’eau de mer filtrée des débris; (c) un bol de soupe aux légumes. (3 points)", ["le lait au chocolat bien brassé : homogène en apparence d’usage courant (les particules sont réparties finement); on accepte aussi hétérogène très fin si la justification parle de particules de cacao et de gras en suspension", "l’eau de mer filtrée : homogène, car les sels sont dissous et répartis également", "la soupe aux légumes : hétérogène, car les morceaux restent distincts et inégalement répartis"], "<b>Réponse modèle :</b> (a) Le lait au chocolat bien brassé paraît homogène à l’œil : ses particules sont réparties très finement dans tout le liquide (on accepte aussi « hétérogène très fin », si la justification nomme les particules de cacao et de matière grasse en suspension). (b) L’eau de mer filtrée est homogène : une fois les débris retirés, les sels dissous sont répartis également dans toute l’eau. (c) La soupe aux légumes est hétérogène : ses morceaux restent visibles, distincts et inégalement répartis. Dans chaque cas, le classement suit la répartition des particules : égale et indistincte pour l’homogène, inégale et distincte pour l’hétérogène.<br><br><b>Points d’attribution :</b> 1 point pour le classement du lait au chocolat avec sa justification. 1 point pour l’eau de mer homogène, justifiée par la dissolution. 1 point pour la soupe hétérogène, justifiée par les parties distinctes.", {});
  }
]), ["Un classement par mélange, chacun justifié par les particules.", "La question se décide sur la répartition, pas sur l’apparence générale."]);

/* ---------- SC7.7.3 Dissolution, solute et solvant ---------- */
E("s7f-u3-solute-solvent", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("On prépare une limonade en dissolvant du sucre dans de l’eau. Quels sont le soluté et le solvant?", "Le soluté est le sucre dissous et le solvant est l’eau qui le dissout dans la limonade", ["Le soluté est l’eau dissoute et le solvant est le sucre qui la dissout dans la limonade", "Le soluté est le sucre dissous et le solvant est le verre qui contient la limonade préparée", "Le soluté est la limonade entière et le solvant est le sucre ajouté à la fin de la préparation"], "Le soluté est la substance qui se dissout (le sucre); le solvant est la substance qui dissout (l’eau). Leur union forme la solution.", {});
  },
  function () {
    return mcq("Dans une teinture d’iode, une petite quantité d’iode est dissoute dans beaucoup d’alcool. Quels sont le soluté et le solvant?", "Le soluté est l’iode et le solvant est l’alcool, présent en plus grande quantité dans la teinture", ["Le soluté est l’alcool et le solvant est l’iode, présent en plus grande quantité dans la teinture", "Le soluté est la teinture entière et le solvant est le flacon qui la contient au complet", "Le soluté est l’iode et le solvant est l’air qui entoure le flacon pendant son utilisation"], "Le solvant est généralement la substance présente en plus grande quantité, celle qui dissout : ici l’alcool. L’iode, dissous, est le soluté.", {});
  }
]), ["Soluté : dissous. Solvant : dissout. Les deux mots se ressemblent; leurs rôles sont opposés.", "Le solvant est souvent le liquide présent en plus grande quantité."]);
E("s7f-u3-dissolving-particles", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("Selon le modèle particulaire, que se passe-t-il quand du sel se dissout dans l’eau?", "Les particules de sel se détachent les unes des autres et se répartissent également parmi les particules d’eau", ["Les particules de sel fondent et deviennent des particules d’eau identiques à celles du solvant utilisé", "Les particules de sel disparaissent complètement et cessent d’exister dans la solution obtenue", "Les particules de sel deviennent plus grosses et se déposent lentement au fond du récipient agité"], "Dissoudre ne détruit rien : les particules du soluté se séparent et se dispersent également parmi les particules du solvant. C’est pourquoi le sel reste récupérable par évaporation.", {});
  }
]), ["Les particules du soluté survivent à la dissolution; elles se dispersent.", "Récupérable par évaporation : la preuve que rien n’a disparu."]);
E("s7f-u3-solution-states", 3, ["SC7.7.3"], 2, "var", varset([
  function () {
    return mcq("Laquelle de ces solutions contient un soluté gazeux?", "Une boisson gazeuse, où du dioxyde de carbone est dissous dans l’eau sous pression", ["Une eau salée, où du sel solide est dissous dans l’eau à la pression ordinaire", "Un sirop, où du sucre solide est dissous dans l’eau chaude du récipient utilisé", "Un vinaigre, où un liquide est dissous dans l’eau à la température de la pièce"], "Les bulles d’une boisson gazeuse viennent d’un gaz dissous, le dioxyde de carbone : une solution peut donc contenir un soluté gazeux dans un solvant liquide.", {});
  }
]), ["Un soluté n’est pas forcément un solide : il peut être liquide ou gazeux.", "Les bulles qui s’échappent à l’ouverture étaient dissoutes sous pression."]);
E("s7f-u3-cr-dissolving", 3, ["SC7.7.3"], 3, "var", varset([
  function () {
    return textq("Un cube de sucre déposé dans un thé chaud « disparaît » en quelques minutes. Explique, avec le modèle particulaire de la matière, où est passé le sucre et pourquoi on goûte le sucre dans tout le thé, même dans la première gorgée du haut. (3 points)", ["les particules de sucre se détachent du cube et se séparent les unes des autres", "elles se répartissent également parmi les particules d’eau dans tout le thé", "le goût uniforme prouve la répartition égale; le sucre existe toujours et serait récupérable par évaporation"], "<b>Réponse modèle :</b> Le sucre n’a pas disparu. Au contact de l’eau chaude, ses particules se détachent du cube une à une et se dispersent parmi les particules d’eau. Le brassage et le mouvement des particules les répartissent également dans tout le thé : c’est pourquoi chaque gorgée, même la première en surface, goûte le sucre. La dissolution est une dispersion, pas une destruction : en faisant évaporer l’eau, on récupérerait le sucre.<br><br><b>Points d’attribution :</b> 1 point pour les particules de sucre qui se détachent et se séparent. 1 point pour la répartition égale dans tout le solvant. 1 point pour la conservation du sucre, appuyée par le goût uniforme ou la récupération par évaporation.", {});
  }
]), ["Le mot « disparaît » est le piège : suis les particules.", "Le goût uniforme est une preuve de répartition, pas seulement un détail."]);

/* ---------- SC7.7.4 Concentrations des solutions ---------- */
E("s7f-u3-conc-compare", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    var q = mcq("Trois béchers contiennent des solutions de jus en poudre : le bécher A, 10 g dans 200 mL; le bécher B, 10 g dans 100 mL; le bécher C, 20 g dans 200 mL. Quel énoncé compare correctement leurs concentrations?", "Les béchers B et C ont la même concentration, deux fois plus élevée que celle du bécher A montré", ["Le bécher A a la concentration la plus élevée, car il contient le plus grand volume de solution", "Le bécher C a une concentration deux fois plus faible que celle du bécher B, car son volume double", "Les trois béchers ont la même concentration, car ils contiennent tous du jus en poudre dissous"], "La concentration compare la quantité de soluté au volume de solution. B : 10 g par 100 mL. C : 20 g par 200 mL, c’est-à-dire aussi 10 g par 100 mL. A : 10 g par 200 mL, soit la moitié. B et C sont donc égaux et doubles de A.", {}); q.figure = s7fConcentrationSVG([{label: 'Becher A', solute: 10, vol: 200}, {label: 'Becher B', solute: 10, vol: 100}, {label: 'Becher C', solute: 20, vol: 200}]); return q;
  },
  function () {
    return mcq("On verse la moitié d’une solution de 20 g de sel dans 200 mL d’eau dans un autre bécher. Que devient la concentration de chaque moitié?", "Elle reste la même dans les deux béchers, car le rapport entre le sel et l’eau ne change pas au partage", ["Elle double dans le premier bécher, car il contient maintenant la même quantité de sel qu’au départ", "Elle tombe à zéro dans le second bécher, car le sel reste toujours dans le premier bécher versé", "Elle diminue de moitié dans les deux béchers, car le volume de chacun a diminué de moitié aussi"], "Partager une solution partage le soluté et le solvant dans la même proportion : le rapport, donc la concentration, reste identique dans chaque moitié.", {});
  }
]), ["Concentration égale quantité de soluté par volume de solution.", "Ramène chaque bécher à la même base : grammes par 100 mL."]);
E("s7f-u3-saturated", 3, ["SC7.7.4"], 1, "var", varset([
  function () {
    return mcq("On ajoute du sucre à un verre d’eau en brassant. À un moment, le sucre ajouté cesse de se dissoudre et reste au fond malgré le brassage. Comment qualifie-t-on la solution?", "Elle est saturée : elle contient le maximum de sucre qu’elle peut dissoudre à cette température", ["Elle est diluée : elle contient le maximum de sucre qu’elle peut dissoudre à cette température", "Elle est concentrée au point de devenir une substance pure à cette température précise", "Elle est devenue un mélange hétérogène définitif qui ne peut plus dissoudre de sucre du tout"], "Une solution saturée contient le maximum de soluté dissous possible à cette température : tout ajout reste non dissous au fond. Chauffer la solution permettrait d’en dissoudre davantage.", {});
  }
]), ["Le soluté qui refuse de se dissoudre annonce la saturation.", "Saturée ne veut pas dire « pour toujours » : la température change la limite."]);
E("s7f-u3-conc-change", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    return mcq("Une solution de 15 g de sel dans 100 mL d’eau est trop salée pour une expérience. Quelle action la rend moins concentrée sans changer la quantité de sel déjà dissoute?", "Ajouter de l’eau pure pour augmenter le volume, ce qui dilue le même sel dans plus de solvant", ["Faire évaporer une partie de l’eau pour diminuer le volume, ce qui étend le même sel partout", "Brasser la solution plus longtemps pour répartir le même sel dans le même volume d’eau froide", "Refroidir la solution pour ralentir les particules, ce qui rend le même sel moins présent"], "Diluer, c’est ajouter du solvant : la même quantité de sel se répartit dans un plus grand volume, donc la concentration baisse. Évaporer l’eau ferait l’inverse.", {});
  }
]), ["Deux leviers : plus de solvant dilue; moins de solvant concentre.", "La quantité de sel ne change pas dans la bonne réponse."]);
E("s7f-u3-cr-concentration", 3, ["SC7.7.4"], 3, "var", varset([
  function () {
    return textq("Une recette d’expérience demande une solution de sel à 5 g par 100 mL. Un élève a préparé 300 mL d’une solution à 10 g par 100 mL. (a) Calcule la quantité de sel dissoute dans ses 300 mL. (b) Explique comment il peut obtenir la concentration demandée à partir de sa solution, et calcule le volume final. (3 points)", ["le sel dissous : 10 g par 100 mL fois 3, donc 30 g de sel dans les 300 mL", "la dilution : ajouter de l’eau pour doubler le volume, car la concentration doit être divisée par deux", "le volume final : 600 mL à 5 g par 100 mL, qui contient toujours les mêmes 30 g de sel"], "<b>Réponse modèle :</b> (a) À 10 g par 100 mL, chaque tranche de 100 mL contient 10 g de sel; 300 mL contiennent donc 3 fois 10 g, soit 30 g de sel. (b) Pour passer de 10 g à 5 g par 100 mL, il faut diviser la concentration par deux, donc doubler le volume en ajoutant de l’eau pure : le volume final est de 600 mL. Les 30 g de sel sont inchangés; ils sont simplement répartis dans deux fois plus d’eau, ce qui donne bien 5 g par 100 mL.<br><br><b>Points d’attribution :</b> 1 point pour la quantité de sel calculée (30 g). 1 point pour la méthode de dilution par ajout d’eau. 1 point pour le volume final de 600 mL, avec la conservation des 30 g de sel.", {});
  }
]), ["Travaille par tranches de 100 mL pour le calcul de départ.", "Diluer ne retire pas de sel; cela ajoute de l’eau."]);

/* ---------- SC7.7.5 Facteurs de la solubilite ---------- */
E("s7f-u3-solubility-temp", 3, ["SC7.7.5"], 1, "var", varset([
  function () {
    return mcq("Comment la solubilité de la plupart des solutés solides change-t-elle quand la température de l’eau augmente?", "Elle augmente : l’eau chaude peut dissoudre une plus grande quantité du solide donné", ["Elle diminue : l’eau chaude peut dissoudre une plus petite quantité du solide donné", "Elle reste exactement la même : la température ne change jamais la solubilité des solides", "Elle devient nulle : l’eau chaude ne peut plus dissoudre aucun solide quel qu’il soit"], "Pour la plupart des solides, la solubilité augmente avec la température : c’est pourquoi le sucre se dissout davantage dans un thé chaud que dans un thé glacé.", {});
  },
  function () {
    return mcq("Pourquoi une boisson gazeuse tiède perd-elle ses bulles plus vite qu’une boisson gazeuse froide?", "Parce que la solubilité des gaz diminue quand la température augmente, donc le gaz s’échappe de la boisson tiède", ["Parce que la solubilité des gaz augmente quand la température augmente, donc le gaz s’échappe de la boisson tiède", "Parce que le gaz d’une boisson tiède se transforme en liquide et coule au fond de la bouteille ouverte", "Parce que la chaleur crée de nouvelles bulles qui poussent les anciennes hors de la boisson tiède"], "Les gaz se comportent à l’inverse des solides : leur solubilité diminue quand la température monte. Réchauffée, la boisson ne peut plus garder son gaz dissous, qui s’échappe en bulles.", {});
  }
]), ["Solides et gaz réagissent en sens opposés à la température.", "Pense au thé sucré pour les solides et à la boisson gazeuse pour les gaz."]);
E("s7f-u3-solubility-pressure", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return mcq("Une bouteille de boisson gazeuse est fermée sous pression. Au moment de l’ouverture, un sifflement se fait entendre et des bulles se forment partout. Quelle explication est correcte?", "La pression baisse à l’ouverture, la solubilité du gaz diminue, et le gaz dissous s’échappe en bulles dans la boisson", ["La pression monte à l’ouverture, la solubilité du gaz augmente, et le gaz dissous s’échappe en bulles dans la boisson", "La température baisse à l’ouverture, la solubilité du gaz diminue, et le gaz dissous se transforme en glace dans la boisson", "La pression baisse à l’ouverture, le gaz se dissout davantage, et les bulles viennent de l’air extérieur qui entre"], "Sous pression dans la bouteille fermée, beaucoup de gaz reste dissous. À l’ouverture, la pression chute, la solubilité du gaz diminue d’autant, et l’excès de gaz s’échappe : ce sont les bulles et le sifflement.", {});
  }
]), ["La pression agit surtout sur les gaz dissous.", "Bouteille fermée : haute pression, gaz gardé. Ouverte : pression basse, gaz libéré."]);
E("s7f-u3-cr-solubility", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return textq("Un lac se réchauffe pendant une longue canicule, et les poissons montrent des signes de manque d’oxygène même si l’eau reste claire. Explique ce phénomène à l’aide des facteurs qui affectent la solubilité d’un gaz. (2 points)", ["l’oxygène est un gaz dissous dans l’eau du lac", "la solubilité des gaz diminue quand la température augmente, donc l’eau chaude du lac contient moins d’oxygène dissous pour les poissons"], "<b>Réponse modèle :</b> Les poissons respirent l’oxygène dissous dans l’eau, un gaz en solution. Or la solubilité d’un gaz diminue quand la température de l’eau augmente. Pendant la canicule, l’eau du lac, plus chaude, ne peut donc plus garder autant d’oxygène dissous : la quantité disponible pour les poissons baisse, même si l’eau reste claire et semble inchangée.<br><br><b>Points d’attribution :</b> 1 point pour l’oxygène identifié comme un gaz dissous dont dépendent les poissons. 1 point pour le lien entre température élevée et solubilité réduite des gaz.", {});
  }
]), ["Le facteur en jeu est la température, et le soluté est un gaz.", "Applique la règle des gaz, pas celle des solides."]);

/* ---------- SC7.7.6 Identifier et separer les composantes ---------- */
E("s7f-u3-method-match", 3, ["SC7.7.6"], 1, "var", varset([
  function () {
    return mcq("Quelle technique sépare un mélange de sable et d’eau en exploitant la grosseur des particules?", "La filtration, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", ["L’évaporation, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", "La distillation, qui retient le sable dans le filtre et laisse passer l’eau du mélange versé", "La décantation magnétique, qui retient le sable et laisse passer l’eau du mélange versé"], "La filtration sépare selon la grosseur : les grains de sable, trop gros pour les pores du filtre, sont retenus, pendant que l’eau traverse.", {});
  },
  function () {
    return mcq("Quelle technique sépare le sel dissous de l’eau salée en exploitant le point d’ébullition de l’eau?", "L’évaporation, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", ["La filtration, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", "Le tamisage, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée", "La décantation, qui laisse le sel derrière pendant que l’eau s’échappe en vapeur chauffée"], "Le sel dissous passe à travers tout filtre : il faut changer l’eau d’état. L’évaporation transforme l’eau en vapeur et laisse le sel solide derrière.", {});
  }
]), ["Chaque technique exploite une propriété différente : grosseur, ébullition, densité, magnétisme.", "Dissous signifie trop petit pour un filtre."]);
E("s7f-u3-method-property", 3, ["SC7.7.6"], 2, "var", varset([
  function () {
    return mcq("Un mélange contient de la limaille de fer, du sable et des copeaux de bois dans l’eau. Quelle suite de techniques sépare les trois solides le plus efficacement?", "Un aimant retire le fer, la filtration retient le sable et les copeaux, puis le tri des copeaux qui flottent complète la séparation", ["L’évaporation retire le fer, la filtration dissout le sable, puis le séchage transforme les copeaux en sable fin séparable", "Un aimant retire le sable, la distillation retient le fer, puis la filtration fait flotter les copeaux hors du mélange", "La filtration retire d’abord les trois solides mélangés, puis un aimant sépare le mélange sec sans autre étape utile"], "Chaque propriété est exploitée à son tour : le magnétisme pour le fer, la filtration pour les solides restants, et la flottation pour distinguer les copeaux légers du sable lourd.", {});
  }
]), ["Associe chaque composante à sa propriété distinctive, dans un ordre réalisable.", "L’aimant ne fonctionne que sur le fer : commence par lui."]);
E("s7f-u3-cr-separate", 3, ["SC7.7.6"], 3, "var", varset([
  function () {
    return textq("On te remet un mélange d’eau, de sable, de sel dissous et de petits cailloux. Décris un plan complet, étape par étape, pour récupérer le sable sec, les cailloux et le sel séparément. Nomme la technique de chaque étape et la propriété qu’elle exploite. (3 points)", ["le tamisage ou le tri retient les cailloux (grosseur)", "la filtration sépare le sable de l’eau salée (grosseur des grains contre pores du filtre)", "l’évaporation de l’eau salée récupère le sel (point d’ébullition différent, l’eau devient vapeur)"], "<b>Réponse modèle :</b> Étape 1 : tamiser le mélange pour retirer les cailloux, trop gros pour passer à travers le tamis (propriété : la grosseur des particules). Étape 2 : filtrer le reste; le sable est retenu par le filtre pendant que l’eau salée traverse, puis laisser sécher le sable (propriété : la grosseur des grains de sable contre les pores du filtre). Étape 3 : faire évaporer l’eau du filtrat, par chauffage doux ou au soleil; l’eau devient vapeur et le sel reste au fond du récipient (propriété : l’eau s’évapore à une température où le sel reste solide).<br><br><b>Points d’attribution :</b> 1 point pour le retrait des cailloux par tamisage, avec sa propriété. 1 point pour la filtration du sable, avec sa propriété. 1 point pour l’évaporation qui récupère le sel, avec sa propriété.", {});
  }
]), ["Du plus gros au plus fin, puis le dissous en dernier.", "Chaque étape nomme sa technique et la propriété exploitée."]);

/* ---------- SC7.7.7 Techniques de separation quotidiennes ---------- */
E("s7f-u3-home-techniques", 3, ["SC7.7.7"], 1, "var", varset([
  function () {
    return mcq("Égoutter des spaghettis dans une passoire est un exemple quotidien de quelle technique de séparation?", "La filtration, car la passoire retient les spaghettis et laisse passer l’eau de cuisson chaude", ["La distillation, car la passoire retient les spaghettis et laisse passer l’eau de cuisson chaude", "L’évaporation, car la passoire transforme l’eau de cuisson en vapeur pendant l’égouttage", "La décantation magnétique, car la passoire attire les spaghettis et repousse l’eau de cuisson"], "La passoire est un filtre de cuisine : ses trous laissent passer l’eau et retiennent les spaghettis, selon la grosseur des morceaux.", {});
  },
  function () {
    return mcq("Faire sécher du linge sur une corde sépare l’eau du tissu par quelle technique?", "L’évaporation, car l’eau du tissu devient vapeur et s’échappe dans l’air ambiant du dehors", ["La filtration, car l’eau du tissu traverse les fibres et tombe goutte à goutte au sol", "La condensation, car l’eau du tissu devient vapeur et s’échappe dans l’air ambiant du dehors", "Le tamisage, car le vent trie les gouttes d’eau selon leur grosseur pendant le séchage"], "Le séchage est une évaporation lente : l’eau liquide du linge devient vapeur et quitte le tissu, qui reste sec.", {});
  }
]), ["Les techniques de laboratoire ont leurs jumelles à la maison.", "Passoire égale filtre; séchage égale évaporation."]);
E("s7f-u3-choose-technique", 3, ["SC7.7.7"], 2, "var", varset([
  function () {
    return mcq("Une soupe refroidie montre une couche de gras solide à sa surface. Quelle technique quotidienne permet de retirer ce gras?", "Écumer ou dégraisser la surface, car le gras moins dense flotte au-dessus du bouillon refroidi de la soupe", ["Filtrer la soupe entière à travers un papier filtre fin, car le gras dissous traverse le papier avec le bouillon", "Faire bouillir la soupe longuement, car le gras s’évapore toujours avant l’eau du bouillon refroidi de la soupe", "Ajouter du sel à la soupe, car le sel dissout complètement le gras qui flotte à la surface du bouillon"], "Le gras refroidi forme une couche solide qui flotte : on l’écume à la cuillère. C’est une séparation par densité et par état, utilisée chaque jour en cuisine.", {});
  }
]), ["Le gras flotte et se fige : la technique suit ces deux propriétés.", "Une technique quotidienne doit fonctionner avec des outils de cuisine."]);
E("s7f-u3-cr-three-part", 3, ["SC7.7.7"], 3, "var", varset([
  function () {
    return textq("Nomme TROIS techniques de séparation utilisées dans la vie quotidienne (à la maison, à la ferme ou dans la communauté). Pour chacune, dis quel mélange elle sépare et quelle propriété des composantes elle exploite. (3 points)", ["un exemple avec mélange et propriété (par exemple la passoire sépare les pâtes de l’eau par la grosseur)", "un deuxième exemple différent (par exemple la moustiquaire ou l’écran sépare les insectes de l’air par la grosseur des ouvertures)", "un troisième exemple différent (par exemple le dégraissage d’une soupe exploite la densité et la solidification du gras)"], "<b>Réponse modèle :</b> Exemple 1 : la passoire sépare les spaghettis de leur eau de cuisson; elle exploite la grosseur, car les trous laissent passer l’eau et retiennent les pâtes. Exemple 2 : faire sécher le linge sépare l’eau du tissu; elle exploite l’évaporation, car l’eau devient vapeur bien avant que le tissu ne change. Exemple 3 : dégraisser une soupe refroidie sépare le gras du bouillon; elle exploite la densité et l’état, car le gras flotte et se fige en surface, où on l’écume.<br><br><b>Points d’attribution :</b> 1 point par technique quotidienne correctement nommée, avec son mélange et la propriété exploitée.", {});
  }
]), ["Trois scènes différentes de la vie quotidienne valent mieux que trois variantes de la même.", "Chaque exemple tient en trois morceaux : technique, mélange, propriété."]);

/* ---------- SC7.8.1 Science de la distillation ---------- */
E("s7f-u3-distill-parts", 3, ["SC7.8.1"], 1, "var", varset([
  function () {
    return mcq("Dans un dispositif de distillation, à quoi sert le condenseur?", "Il refroidit la vapeur pour la transformer de nouveau en liquide, qu’on recueille séparément", ["Il chauffe le liquide pour le transformer en vapeur au début du dispositif de distillation", "Il filtre le liquide pour retenir les particules solides avant le début de la distillation", "Il mélange la vapeur au liquide pour accélérer le chauffage du dispositif entier"], "La distillation compte deux changements d’état : l’ébullition produit la vapeur dans le ballon, puis le condenseur la refroidit pour la rendre liquide dans le récipient de collecte.", {});
  },
  function () {
    return mcq("Dans un dispositif de distillation d’eau salée, quelle substance recueille-t-on à la sortie du condenseur?", "De l’eau pure, car la vapeur qui se condense vient de l’eau seule, le sel restant dans le ballon chauffé", ["Du sel pur, car la vapeur qui se condense vient du sel seul, l’eau restant dans le ballon chauffé", "De l’eau salée identique, car la distillation ne sépare jamais les composantes d’une solution chauffée", "De l’air chaud, car la vapeur qui se condense dans le dispositif ne produit jamais de liquide recueilli"], "Seule l’eau s’évapore à l’ébullition de la solution; sa vapeur, condensée, donne de l’eau pure. Le sel, qui ne s’évapore pas, reste dans le ballon.", {});
  }
]), ["Ébullition d’un côté, condensation de l’autre : la distillation joint les deux.", "Ce qui ne s’évapore pas ne peut pas être recueilli à la sortie."]);
E("s7f-u3-distill-vs-evap", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return mcq("Quelle est la différence essentielle entre la distillation et la simple évaporation d’une solution?", "La distillation recueille le liquide vaporisé par condensation, tandis que l’évaporation simple le laisse s’échapper dans l’air", ["La distillation recueille le solide vaporisé par condensation, tandis que l’évaporation simple le laisse s’échapper dans l’air", "La distillation chauffe le liquide, tandis que l’évaporation simple ne peut jamais se produire avec un liquide chauffé", "La distillation sépare les mélanges hétérogènes, tandis que l’évaporation simple ne sépare que les substances pures"], "Les deux techniques vaporisent le liquide; seule la distillation le récupère, en condensant sa vapeur dans un récipient séparé. On choisit selon la composante qu’on veut garder.", {});
  }
]), ["La question décide : veut-on récupérer le liquide, oui ou non?", "Même début (vaporiser), fin différente (recueillir ou laisser partir)."]);
E("s7f-u3-cr-distill", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return textq("Décris le trajet complet d’une particule d’eau pendant la distillation d’une eau salée, en utilisant correctement les termes ébullition, évaporation et condensation dans ta description. (2 points)", ["la particule d’eau quitte la solution à l’ébullition (évaporation rapide dans tout le liquide chauffé)", "la vapeur voyage jusqu’au condenseur, où la condensation la rend liquide; le sel ne fait pas ce trajet"], "<b>Réponse modèle :</b> La particule d’eau fait partie de la solution chauffée dans le ballon. Quand l’ébullition commence, elle reçoit assez d’énergie pour quitter le liquide : c’est l’évaporation, produite dans tout le liquide pendant l’ébullition. Devenue vapeur, elle voyage dans le tube jusqu’au condenseur, où elle perd son énergie et redevient liquide : c’est la condensation. Elle s’écoule alors dans le récipient de collecte, comme eau pure. Les particules de sel, qui ne s’évaporent pas, restent dans le ballon.<br><br><b>Points d’attribution :</b> 1 point pour le départ (ébullition et évaporation correctement placées et définies). 1 point pour l’arrivée (condensation dans le condenseur et collecte de l’eau, le sel restant derrière).", {});
  }
]), ["Suis une seule particule, du ballon au récipient de collecte.", "Trois termes, trois moments du trajet."]);

/* ---------- SC7.8.2 Evolution du raffinage et de la separation ---------- */
E("s7f-u3-fractional", 3, ["SC7.8.2"], 1, "var", varset([
  function () {
    return mcq("En quoi la distillation fractionnée diffère-t-elle de la distillation simple?", "Elle sépare plusieurs liquides mélangés en profitant de leurs points d’ébullition différents, recueillis un à un", ["Elle sépare un solide d’un liquide en profitant de la grosseur différente de leurs particules respectives", "Elle sépare plusieurs liquides mélangés en les filtrant à travers des couches de plus en plus fines", "Elle sépare un liquide de ses gaz en profitant de la pression différente exercée sur le mélange chauffé"], "La distillation fractionnée traite un mélange de liquides : chacun bout à sa température, donc on recueille les composantes une à une selon leur point d’ébullition.", {});
  },
  function () {
    return mcq("Le raffinage du pétrole brut repose sur la distillation fractionnée. Qu’est-ce qui rend cette technique adaptée au pétrole?", "Le pétrole est un mélange de liquides dont les points d’ébullition différents permettent de les séparer en fractions utiles", ["Le pétrole est une substance pure dont le point d’ébullition unique permet de le purifier en une seule fraction utile", "Le pétrole est un mélange de solides dont les grosseurs différentes permettent de les séparer en fractions utiles", "Le pétrole est un mélange magnétique dont les composantes se séparent sous l’effet d’aimants en fractions utiles"], "Le pétrole brut contient de nombreux hydrocarbures liquides aux points d’ébullition variés : la colonne de fractionnement les sépare en essence, kérosène, diesel et autres fractions.", {});
  }
]), ["Fractionnée égale plusieurs liquides, plusieurs points d’ébullition.", "Le raffinage est l’exemple industriel de la distillation fractionnée."]);
E("s7f-u3-refining-evolve", 3, ["SC7.8.2"], 2, "var", varset([
  function () {
    return mcq("Quel énoncé décrit correctement l’évolution des techniques de raffinage et de séparation?", "On est passé de la distillation simple, qui sépare un liquide d’un mélange, à la distillation fractionnée, qui sépare plusieurs liquides en une seule opération continue", ["On est passé de la distillation fractionnée industrielle à la distillation simple de cuisine, devenue la norme dans toutes les raffineries modernes du monde", "On est passé de la filtration du pétrole à sa distillation, car les filtres séparaient mieux les liquides que les colonnes de fractionnement actuelles", "On est resté à la distillation simple, car aucune amélioration des techniques de séparation n’a été nécessaire depuis les débuts du raffinage du pétrole"], "L’évolution va du simple au fractionné : d’abord séparer un liquide par ébullition et condensation, puis séparer toute une famille de liquides en continu grâce à leurs points d’ébullition échelonnés.", {});
  }
]), ["L’évolution suit la complexité des mélanges traités.", "Une seule opération continue remplace de nombreuses distillations simples."]);

/* ---------- SC7.8.3 Les melanges et solutions dans nos vies ---------- */
E("s7f-u3-lives-examples", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Lequel de ces exemples montre la science des mélanges et des solutions à l’œuvre dans la vie quotidienne?", "Préparer un sirop contre la toux en dissolvant les ingrédients actifs dans un liquide sucré mesuré", ["Préparer un sirop contre la toux en devinant les quantités d’ingrédients sans jamais les mesurer", "Choisir un sirop contre la toux selon la couleur de son étiquette plutôt que selon sa composition", "Conserver un sirop contre la toux dans un flacon décoratif plutôt que dans son flacon d’origine scellé"], "Un sirop est une solution dosée : dissoudre les ingrédients et mesurer leur concentration relève directement de la science des solutions.", {});
  },
  function () {
    return mcq("Quel exemple relie la science des solutions à la santé et à la sécurité?", "Les solutions de réhydratation, qui dissolvent des sels et du sucre dans l’eau selon des proportions précises pour soigner la déshydratation", ["Les solutions de réhydratation, qui dissolvent des sels et du sucre dans l’eau selon des proportions choisies au hasard chaque fois", "Les boissons énergisantes, qui dissolvent des colorants dans l’eau selon des proportions tenues secrètes par leurs fabricants", "Les eaux embouteillées, qui dissolvent des bulles d’air dans l’eau selon des proportions variables d’une bouteille à l’autre"], "Une solution de réhydratation ne fonctionne qu’à la bonne concentration : trop faible, elle n’aide pas; trop forte, elle nuit. C’est la science des solutions appliquée à la santé.", {});
  }
]), ["Cherche l’exemple où la concentration ou la dissolution compte vraiment.", "La précision des proportions est le signe de la science à l’œuvre."]);
E("s7f-u3-lives-effects", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Un village puise son eau dans un lac où se déversent des engrais dissous des fermes voisines. Quel énoncé relie correctement ce fait à la science des solutions?", "Les engrais dissous voyagent avec l’eau et atteignent le lac, même si l’eau semble claire à l’œil nu des villageois", ["Les engrais dissous restent sur les champs, car une substance dissoute ne peut jamais se déplacer avec l’eau courante", "Les engrais dissous disparaissent complètement dès qu’ils touchent l’eau du ruisseau qui traverse les fermes voisines", "Les engrais dissous rendent l’eau du lac pure, car la dissolution détruit toutes les substances qu’elle touche en chemin"], "Une substance dissoute se déplace avec son solvant : claire ne veut pas dire pure. C’est une conséquence directe de la science des solutions dans la vie d’une communauté.", {});
  }
]), ["Dissous égale invisible, mais présent et mobile.", "La dissolution disperse; elle ne détruit pas."]);

/* ---------- SC7.8.4 Effets positifs et negatifs du sel de voirie ---------- */
E("s7f-u3-salt-positive", 3, ["SC7.8.4"], 1, "var", varset([
  function () {
    return mcq("Quel est un effet positif prévu de l’épandage de sel sur les routes en hiver?", "Le sel abaisse le point de congélation de l’eau, fait fondre la glace et rend la chaussée moins glissante pour les véhicules", ["Le sel élève le point de congélation de l’eau, fait fondre la glace et rend la chaussée moins glissante pour les véhicules", "Le sel colore la glace en blanc, ce qui permet aux conducteurs de mieux voir la chaussée glissante pendant la nuit", "Le sel sèche complètement la chaussée en absorbant toute l’eau de la neige fondue pendant les tempêtes hivernales"], "Le sel dissous dans l’eau de surface abaisse son point de congélation : la glace fond à des températures où l’eau pure resterait gelée, ce qui améliore la sécurité routière.", {});
  }
]), ["L’effet recherché est la fonte de la glace par abaissement du point de congélation.", "Prévu signifie voulu dès le départ par ceux qui épandent."]);
E("s7f-u3-salt-negative", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Quel est un effet négatif imprévu de l’épandage de sel sur les routes?", "Le sel entraîné par la fonte corrode les véhicules et les ponts et nuit aux plantes et aux cours d’eau voisins des routes", ["Le sel entraîné par la fonte rend l’eau des cours d’eau voisins potable et protège les plantes des bords des routes", "Le sel épandu en hiver fait fondre la glace des lacs voisins et prolonge la saison de navigation des bateaux de pêche", "Le sel épandu en hiver nourrit les sols des bords de route et fait pousser les plantes plus vite au printemps suivant"], "Personne n’épand du sel pour corroder les ponts ou charger les ruisseaux en sel : ce sont des conséquences imprévues, documentées, de l’usage du sel de voirie.", {});
  },
  function () {
    return mcq("On constate que les arbres plantés le long d’une route très salée dépérissent plus que ceux des rues peu salées. Comment classer cet effet?", "Comme un effet négatif imprévu : le sel atteint les racines par le sol, sans que cet effet ait été le but de l’épandage hivernal", ["Comme un effet positif prévu : le sel atteint les racines par le sol, ce qui était le but principal de l’épandage hivernal", "Comme un effet positif imprévu : le sel améliore la santé des arbres en atteignant leurs racines par le sol de la route", "Comme un effet sans lien avec le sel : les arbres des routes dépérissent toujours plus vite que ceux des rues calmes"], "Le dépérissement des arbres n’était pas le but de l’épandage (qui vise la sécurité) et il nuit : c’est un effet négatif imprévu du sel de voirie.", {});
  }
]), ["Classer un effet demande deux questions : positif ou négatif? prévu ou imprévu?", "Le but de l’épandage décide du caractère prévu ou non."]);
E("s7f-u3-salt-classify-effects", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Quel ensemble classe correctement deux effets du sel de voirie?", "Moins d’accidents sur la glace (positif prévu) et corrosion accrue des véhicules (négatif imprévu) dans la région traitée", ["Moins d’accidents sur la glace (négatif imprévu) et corrosion accrue des véhicules (positif prévu) dans la région traitée", "Moins d’accidents sur la glace (positif imprévu) et disparition complète de la glace (positif prévu) dans la région traitée", "Plus d’accidents sur la glace (positif prévu) et corrosion réduite des véhicules (négatif imprévu) dans la région traitée"], "La sécurité accrue est l’effet positif recherché dès le départ; la corrosion est un effet négatif que personne ne cherchait. Les deux classements doivent être justes ensemble.", {});
  }
]), ["Vérifie chaque classement séparément : sens (positif ou négatif) et intention (prévu ou imprévu).", "Un seul ensemble a ses deux classements corrects."]);

/* ---------- SC7.8.5 Comprendre les solutions pour mieux deglacer ---------- */
E("s7f-u3-deicer-compare", 3, ["SC7.8.5"], 2, "var", varset([
  function () {
    return mcq("Comment notre compréhension des propriétés des solutions a-t-elle amélioré les technologies de déglaçage?", "Elle a permis de choisir et de doser des produits qui abaissent le point de congélation à des températures plus basses, avec moins de produit épandu", ["Elle a permis de colorer les produits de déglaçage pour les rendre visibles sur la glace pendant les tempêtes de neige de l’hiver", "Elle a permis de remplacer tous les produits de déglaçage par de l’eau chaude épandue sur les routes pendant les tempêtes", "Elle a permis de chauffer les routes de l’intérieur grâce à des tuyaux installés sous toutes les chaussées de la province"], "Connaître l’abaissement du point de congélation selon le produit et sa concentration a mené à des déglaçants mieux choisis et mieux dosés : efficaces plus froid, en quantités moindres.", {});
  },
  function () {
    return mcq("Une municipalité épand une saumure (une solution de sel préparée d’avance) avant une tempête plutôt que du sel sec pendant la tempête. Quel avantage des solutions explique ce choix?", "La saumure est déjà dissoute, donc elle agit dès son contact avec la chaussée et reste en place au lieu d’être balayée par les véhicules", ["La saumure est déjà dissoute, donc elle colore la chaussée et avertit les conducteurs de ralentir avant la tempête annoncée", "La saumure contient plus de sel par litre que le sel sec, donc elle fait fondre la glace deux fois plus vite que le sel sec", "La saumure élève le point de congélation de l’eau, donc la glace se forme plus tôt et devient plus facile à briser ensuite"], "Un produit déjà en solution agit immédiatement et adhère à la chaussée; le sel sec doit d’abord se dissoudre et il est en partie balayé par la circulation. C’est une application directe des propriétés des solutions.", {});
  }
]), ["Le déglaçage moderne applique la science des solutions : concentration, dissolution, point de congélation.", "Déjà dissous égale déjà actif."]);
E("s7f-u3-deicing-improve", 3, ["SC7.8.5"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces pratiques est une amélioration du déglaçage fondée sur la compréhension des solutions?", "Épandre le produit au bon moment et à la bonne concentration, mesurée selon la température prévue de la chaussée", ["Épandre le double de produit à chaque tempête, quelle que soit la température prévue de la chaussée ce jour-là", "Épandre le produit seulement après que la glace a atteint son épaisseur maximale sur la chaussée de la route", "Épandre le produit au hasard sur les routes, en laissant le vent décider de sa répartition finale sur la glace"], "Doser selon la température prévue, c’est appliquer la relation entre concentration et point de congélation : assez de produit pour fondre, sans gaspillage ni excès.", {});
  }
]), ["L’amélioration vient de la mesure et du moment, pas de la quantité brute.", "La science des solutions sert à doser juste."]);
E("s7f-u3-salt-science", 3, ["SC7.8.5"], 3, "var", varset([
  function () {
    return mcq("Par une nuit de moins 25 °C, le sel ordinaire épandu sur une route ne fait presque plus fondre la glace. Quelle explication fondée sur les propriétés des solutions est correcte?", "Chaque produit a sa limite : la solution de sel ordinaire n’abaisse le point de congélation que jusqu’à une certaine température", ["Le sel ordinaire cesse complètement d’exister comme substance dès que la température descend sous moins 20 °C pendant la nuit froide", "La glace devient une substance pure à moins 25 °C, donc aucun produit connu ne peut plus jamais réussir à la faire fondre ensuite", "Le sel ordinaire fait fondre la glace seulement quand le soleil brille sur la route, jamais pendant les longues nuits d’hiver froides"], "L’abaissement du point de congélation a une limite propre à chaque produit. Sous cette limite, il faut un autre produit (comme le chlorure de calcium) : c’est la science des solutions qui guide le choix.", {});
  }
]), ["Chaque déglaçant a sa température limite d’efficacité.", "La limite vient de la solution elle-même, pas du soleil ni de l’heure."]);

/* ---------- SC7.8.6 Decision eclairee : le sel de voirie ---------- */
E("s7f-u3-salt-adv", 3, ["SC7.8.6"], 2, "var", varset([
  function () {
    return mcq("Quel argument en faveur du sel comme principal déglaçant repose sur un avantage économique réel?", "Le sel est abondant, peu coûteux et facile à entreposer et à épandre avec l’équipement que les municipalités possèdent déjà", ["Le sel est le seul produit qui ne cause aucun dommage à l’environnement, aux véhicules ni aux infrastructures routières", "Le sel fonctionne à toutes les températures hivernales sans exception, ce qui élimine le besoin de tout autre produit", "Le sel rend les routes complètement sèches après chaque tempête, ce qui élimine tous les accidents de l’hiver entier"], "L’avantage économique du sel est réel : il est bon marché, disponible et compatible avec l’équipement existant. Les autres énoncés exagèrent jusqu’à devenir faux.", {});
  }
]), ["Un avantage défendable reste vrai sans exagération.", "Élimine les énoncés absolus : aucun, toutes, complètement."]);
E("s7f-u3-cr-salt-decision", 3, ["SC7.8.6"], 3, "var", varset([
  function () {
    return textq("Une municipalité doit décider si le sel reste son principal produit de déglaçage. Prends une décision avisée : choisis une position, appuie-la sur UN avantage et UN inconvénient (sociaux, économiques ou environnementaux), et nomme une mesure qui réduit l’inconvénient de ta position. (3 points)", ["une position claire (garder le sel comme produit principal, ou le remplacer progressivement)", "un avantage et un inconvénient réels, classés par type (social, économique ou environnemental)", "une mesure de réduction (par exemple saumure préventive, dosage selon la température, produits de rechange sur les tronçons sensibles)"], "<b>Réponse modèle :</b> Position : garder le sel comme principal déglaçant, mais en réduire l’usage par un meilleur dosage. Avantage (économique et social) : le sel est peu coûteux, disponible et éprouvé; il garde les routes praticables et réduit les accidents pendant les tempêtes. Inconvénient (environnemental) : le sel entraîné par la fonte charge les cours d’eau et corrode les ponts et les véhicules. Mesure de réduction : épandre une saumure avant les tempêtes et doser selon la température de la chaussée, ce qui obtient la même fonte avec beaucoup moins de sel, et réserver des produits de rechange aux tronçons proches des cours d’eau sensibles.<br><br><b>Points d’attribution :</b> 1 point pour une position claire et tenue. 1 point pour un avantage et un inconvénient réels et correctement caractérisés. 1 point pour une mesure concrète qui réduit l’inconvénient.", {});
  }
]), ["Une décision avisée reconnaît le coût de sa propre position.", "La mesure de réduction doit s’attaquer à l’inconvénient nommé."]);

/* ---------- SC7.9.1 Enoncer une hypothese ---------- */
E("s7f-u3-hypothesis-pattern", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("En observant que les glaçons fondent plus vite au soleil qu’à l’ombre, un élève formule une hypothèse. Laquelle est fondée sur ce schéma d’événements observés?", "« Les glaçons exposés à plus de lumière fondent plus vite que les glaçons gardés à l’ombre pendant le même temps. »", ["« Les glaçons préfèrent fondre au soleil parce qu’ils aiment la chaleur des journées d’été ensoleillées. »", "« Les glaçons fondent toujours en exactement dix minutes, peu importe où on les place dans la cour. »", "« Les glaçons fondent parce que l’hiver est terminé et que le printemps est la plus belle saison. »"], "L’hypothèse reprend le motif observé (soleil contre ombre) et le formule en prévision mesurable : la vitesse de fonte selon l’exposition.", {});
  }
]), ["Une hypothèse naît d’un motif observé et le transforme en prévision vérifiable.", "Ni préférence ni saison : la prévision parle de la fonte mesurée."]);
E("s7f-u3-hypothesis-form", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces phrases est une hypothèse bien formulée pour une expérience de dissolution?", "« Si on brasse l’eau, alors le sucre se dissoudra plus vite que dans l’eau laissée au repos. »", ["« Le sucre se dissout dans l’eau parce que c’est ce que les sucres font depuis toujours. »", "« Si on brasse l’eau, alors l’expérience sera plus intéressante pour toute l’équipe. »", "« Le sucre se dissoudra un jour ou l’autre, peu importe ce qu’on fait pendant l’expérience. »"], "Le format « si... alors... » relie une variable changée (le brassage) à un résultat mesurable (la vitesse de dissolution) : l’hypothèse est vérifiable.", {});
  }
]), ["Cherche le couple : variable changée, résultat mesuré.", "Intéressante n’est pas un résultat mesurable."]);
E("s7f-u3-hypothesis-background", 3, ["SC7.9.1"], 2, "var", varset([
  function () {
    return mcq("Un élève sait que les particules bougent plus vite quand la température monte. Quelle hypothèse utilise correctement ce renseignement de fond pour une expérience sur la dissolution du sel?", "« Si l’eau est plus chaude, alors le sel s’y dissoudra plus vite, car ses particules rencontreront plus souvent celles du sel. »", ["« Si l’eau est plus chaude, alors le sel deviendra une substance pure, car ses particules bougeront plus vite dans l’eau. »", "« Si l’eau est plus chaude, alors le sel cessera de se dissoudre, car ses particules bougeront trop vite pour se séparer. »", "« Si l’eau est plus froide, alors le sel s’y dissoudra plus vite, car ses particules rencontreront plus souvent celles du sel. »"], "Le renseignement de fond (les particules chaudes bougent plus vite et entrent plus souvent en collision) mène logiquement à la prévision : une dissolution plus rapide dans l’eau chaude.", {});
  }
]), ["L’hypothèse doit découler du renseignement, pas le contredire.", "Plus de collisions égale une dissolution plus rapide."]);

/* ---------- SC7.9.2 Definir et delimiter questions et problemes ---------- */
E("s7f-u3-delimit", 3, ["SC7.9.2"], 1, "var", varset([
  function () {
    return mcq("La question « Comment sépare-t-on les mélanges? » est trop vaste pour une recherche scolaire. Quelle reformulation la définit et la délimite correctement?", "« Quelle technique sépare le mieux le sable du sel dans un mélange sec, parmi la dissolution, la filtration et l’évaporation? »", ["« Quelles techniques ont séparé tous les mélanges étudiés par les scientifiques depuis les débuts de la chimie moderne? »", "« Pourquoi les mélanges sont-ils importants pour l’industrie et pour la vie quotidienne des gens en général? »", "« Comment chaque mélange du monde pourrait-il être séparé par une seule technique universelle et parfaite? »"], "La reformulation délimitée nomme le mélange précis (sable et sel), les techniques comparées et le critère (la meilleure) : une recherche réelle peut y répondre.", {});
  }
]), ["Délimiter : un mélange, des techniques nommées, un critère.", "Une question de recherche scolaire doit tenir dans le temps et le matériel disponibles."]);
E("s7f-u3-delimit-plan", 3, ["SC7.9.2"], 3, "var", varset([
  function () {
    return mcq("Une équipe veut étudier « les solutions dans la cuisine ». Quelle première étape définit et délimite correctement son problème de recherche?", "Choisir une question précise et réalisable, comme l’effet de la température de l’eau sur la vitesse de dissolution du sucre de cuisine", ["Lister toutes les solutions utilisées dans toutes les cuisines du monde et décider de les étudier une à une cette année", "Acheter tout le matériel de laboratoire disponible et décider de la question seulement après les premières expériences", "Copier la question d’une autre équipe et l’élargir pour couvrir aussi les solutions utilisées dans l’industrie alimentaire"], "Définir et délimiter vient en premier : une question précise, avec des variables nommées et un matériel de cuisine, transforme un thème immense en recherche réalisable.", {});
  }
]), ["Le problème se délimite avant le matériel et les expériences.", "Une variable, un effet, un lieu : la recherche devient possible."]);

/* ---------- SC7.9.3 Droite la mieux ajustee, interpolation, extrapolation ---------- */
E("s7f-u3-best-fit", 3, ["SC7.9.3"], 1, "var", varset([
  function () {
    return mcq("Sur un graphique de solubilité, à quoi sert la droite la mieux ajustée?", "Elle résume la tendance des points et permet de lire des valeurs entre les points mesurés et au-delà de ceux-ci", ["Elle relie tous les points un à un en zigzag pour montrer exactement le trajet des mesures prises en laboratoire", "Elle remplace les points mesurés, qu’on peut alors effacer du graphique avant de le présenter à la classe", "Elle garantit que toutes les mesures futures tomberont exactement sur la droite tracée par l’équipe"], "La droite la mieux ajustée passe au milieu du nuage de points, selon leur tendance générale : elle sert à interpoler (entre les points) et à extrapoler (au-delà).", {});
  }
]), ["La droite suit la tendance, pas chaque point.", "Interpoler et extrapoler sont ses deux emplois."]);
E("s7f-u3-interpolate", 3, ["SC7.9.3"], 2, "var", varset([
  function () {
    var q = mcq("La droite la mieux ajustée d’une courbe de solubilité passe par 36 g à 20 °C et 52 g à 60 °C, en ligne droite. Quelle lecture par interpolation donne la solubilité à 40 °C?", "Environ 44 g par 100 mL, à mi-chemin entre les deux valeurs lues sur la droite ajustée du graphique", ["Environ 36 g par 100 mL, la même valeur qu’à 20 °C sur la droite ajustée du graphique de solubilité", "Environ 52 g par 100 mL, la même valeur qu’à 60 °C sur la droite ajustée du graphique de solubilité", "Environ 88 g par 100 mL, la somme des deux valeurs lues sur la droite ajustée du graphique"], "Interpoler, c’est lire entre deux points connus : à 40 °C, à mi-chemin entre 20 et 60 °C, la droite donne environ (36 + 52) divisé par 2, soit 44 g par 100 mL.", {}); q.figure = s7fSolubilitySVG([{name: 'Solute A', color: '#2e6f8e', pts: [[20, 35], [40, 45], [60, 51], [80, 60]]}, {name: 'Solute B', color: '#b3541e', pts: [[20, 18], [40, 22], [60, 25], [80, 29]]}], 80); return q;
  }
]), ["40 °C est entre 20 et 60 : c’est une interpolation.", "Sur une droite, le milieu en température donne le milieu en valeur."]);
E("s7f-u3-extrapolate", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    return mcq("Une équipe prolonge la droite la mieux ajustée au-delà de ses mesures pour prédire la solubilité à 120 °C. Quelle réserve doit accompagner cette prédiction?", "C’est une extrapolation : la tendance peut changer au-delà des données, donc la prédiction est moins sûre que les lectures entre les points mesurés", ["C’est une extrapolation : la prédiction est automatiquement exacte, car une droite la mieux ajustée ne se trompe jamais hors des données", "C’est une interpolation : la prédiction est aussi sûre que les lectures faites entre les points mesurés pendant l’expérience en classe", "C’est une mesure directe : prolonger la droite équivaut à mesurer réellement la solubilité à 120 °C dans le laboratoire de l’école"], "Extrapoler prolonge une tendance hors des données : rien ne garantit que la tendance se maintient (l’eau bout à 100 °C, par exemple). La prédiction doit être présentée comme moins sûre.", {});
  }
]), ["Au-delà des points, la confiance diminue.", "Un événement nouveau (l’ébullition) peut briser la tendance prolongée."]);
E("s7f-u3-cr-best-fit", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    return textq("Les points d’une expérience de solubilité montent régulièrement, sauf un point, très au-dessus des autres, que l’équipe soupçonne venir d’une erreur de pesée. (a) Explique comment tracer la droite la mieux ajustée dans cette situation. (b) Dis comment l’équipe devrait traiter le point suspect et pourquoi. (3 points)", ["la droite suit la tendance générale de la majorité des points, avec autant de points au-dessus qu’au-dessous, sans passer forcément par chaque point", "le point suspect ne doit pas attirer la droite à lui seul", "l’équipe devrait vérifier ou refaire la mesure et signaler le point plutôt que de le cacher"], "<b>Réponse modèle :</b> (a) La droite la mieux ajustée se trace selon la tendance générale des points : elle passe au milieu du nuage, avec à peu près autant de points au-dessus qu’au-dessous, et elle ne doit pas être tirée vers le seul point suspect. (b) Le point suspect vient probablement d’une erreur de pesée; l’équipe devrait refaire cette mesure si c’est possible et, sinon, signaler ouvertement le point douteux dans son compte rendu au lieu de le supprimer en silence. La droite représente alors honnêtement la tendance des mesures fiables.<br><br><b>Points d’attribution :</b> 1 point pour la méthode de traçage selon la tendance générale. 1 point pour le refus de laisser le point suspect commander la droite. 1 point pour le traitement honnête du point (refaire ou signaler).", {});
  }
]), ["La droite sert la tendance de l’ensemble, pas un point isolé.", "Signaler une donnée douteuse est une force, pas une faute."]);

/* ---------- SC7.9.4 Hypothese verifiable : temperature et solubilite ---------- */
E("s7f-u3-hypothesis-temp", 3, ["SC7.9.4"], 1, "var", varset([
  function () {
    return mcq("Laquelle de ces hypothèses est vérifiable et porte précisément sur l’effet de la température sur la solubilité d’un solide?", "« Si la température de l’eau augmente, alors la quantité de sel qu’on peut y dissoudre augmentera aussi. »", ["« Si la température de l’eau augmente, alors l’expérience de solubilité deviendra plus intéressante. »", "« La température et la solubilité sont deux sujets importants du chapitre sur les solutions. »", "« Si le sel est beau à regarder, alors sa solubilité augmentera avec la température de l’eau. »"], "L’hypothèse relie la variable changée (la température) au résultat mesuré (la quantité dissoute) : elle se vérifie par une expérience de solubilité.", {});
  }
]), ["Température changée, quantité dissoute mesurée : le couple complet.", "Un sujet de chapitre n’est pas une hypothèse."]);
E("s7f-u3-variables-solubility", 3, ["SC7.9.4"], 2, "var", varset([
  function () {
    return mcq("Pour vérifier l’hypothèse précédente, une équipe dissout du sel dans des béchers d’eau à 10 °C, 25 °C, 40 °C et 60 °C. Quelles variables doivent rester constantes?", "Le volume d’eau, la sorte de sel, le brassage et la façon de juger que la solution est saturée à chaque température", ["La température de l’eau, le volume d’eau et la sorte de sel utilisée dans chaque bécher de l’expérience menée", "La quantité de sel dissoute, la température de l’eau et le volume d’eau de chaque bécher de l’expérience menée", "Le volume d’eau, la température de l’eau et la quantité de sel dissoute dans chaque bécher de l’expérience"], "Seule la température varie. Le volume, le sel, le brassage et le critère de saturation restent identiques, sinon les différences de solubilité ne peuvent pas être attribuées à la température.", {});
  }
]), ["La température est la variable indépendante : tout le reste se fige.", "La quantité dissoute est le résultat, pas une constante."]);

/* ---------- SC7.9.5 Procedures controlant les variables (solubilite) ---------- */
E("s7f-u3-controls", 3, ["SC7.9.5"], 1, "var", varset([
  function () {
    return mcq("Dans une expérience sur l’effet de la température sur la solubilité, pourquoi utilise-t-on le même volume d’eau dans chaque bécher?", "Pour que seule la température diffère entre les béchers, ce qui rend la comparaison des quantités dissoutes juste et valable", ["Pour que les béchers aient l’air identiques sur la table, ce qui rend la comparaison des quantités dissoutes plus jolie", "Pour que l’eau atteigne la même température dans chaque bécher, ce qui rend la comparaison des quantités plus rapide", "Pour que le sel se dissolve à la même vitesse dans chaque bécher, ce qui rend la comparaison des quantités inutile"], "Contrôler les variables, c’est ne laisser qu’une différence entre les essais : ici la température. Le même volume garantit que les quantités dissoutes sont comparables.", {});
  }
]), ["Un test juste ne laisse varier qu’un seul facteur.", "Le volume égal sert la comparaison, pas l’apparence."]);
E("s7f-u3-controls-judge", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return mcq("Une équipe compare la solubilité à 20 °C et à 50 °C, mais utilise 50 mL d’eau froide et 150 mL d’eau chaude, et brasse seulement le bécher chaud. Pourquoi sa conclusion sur la température est-elle invalide?", "Parce que trois variables changent à la fois (température, volume et brassage), donc l’effet observé ne peut pas être attribué à la température seule", ["Parce que deux béchers ne suffisent jamais, quelles que soient les variables contrôlées pendant l’expérience de solubilité menée en classe", "Parce que le brassage ne change jamais la vitesse de dissolution, donc son effet sur l’expérience de solubilité est toujours nul", "Parce que la conclusion serait valide seulement si l’équipe avait utilisé de l’eau distillée dans les deux béchers chauffés"], "Le volume et le brassage influencent aussi la quantité dissoute et sa vitesse. Avec trois différences à la fois, impossible d’attribuer le résultat à la température : le contrôle des variables a échoué.", {});
  }
]), ["Compte les différences entre les deux béchers : chacune est une explication rivale.", "Une conclusion valide exige une seule différence à la fois."]);
E("s7f-u3-cr-design-solubility", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return textq("Conçois la procédure complète d’une expérience pour vérifier si la température de l’eau change la quantité de sucre qu’on peut y dissoudre. Décris (a) les étapes dans l’ordre, (b) les variables contrôlées et comment, (c) la mesure qui servira de résultat et (d) la précaution de sécurité liée au chauffage de l’eau. (4 points)", ["des étapes ordonnées : volumes égaux d’eau à plusieurs températures, ajout du sucre par petites quantités en brassant jusqu’à saturation, consignation des quantités", "les contrôles : même volume, même sucre, même brassage, même critère de saturation", "le résultat : la masse totale de sucre dissoute à chaque température", "la sécurité : manipuler l’eau chaude avec les outils prévus et ne jamais chauffer un contenant scellé"], "<b>Réponse modèle :</b> (a) Étapes : verser 100 mL d’eau dans quatre béchers; porter chaque bécher à une température différente (10, 25, 40 et 60 °C) et la vérifier au thermomètre; ajouter le sucre par cuillerées comptées, en brassant après chaque ajout, jusqu’à ce qu’un ajout refuse de se dissoudre malgré le brassage; noter la quantité totale dissoute à chaque température. (b) Contrôles : le même volume d’eau, le même sucre, le même brassage et le même critère de saturation dans chaque bécher. (c) Résultat : la masse de sucre dissoute à saturation, comparée entre les températures. (d) Sécurité : manipuler les béchers chauds avec une pince ou un gant isolant et ne jamais chauffer un contenant fermé.<br><br><b>Points d’attribution :</b> 1 point pour des étapes complètes et ordonnées. 1 point pour les variables contrôlées, nommées avec leur mode de contrôle. 1 point pour la mesure de résultat clairement définie. 1 point pour une précaution de sécurité pertinente.", {});
  }
]), ["Saturation est le critère : on ajoute jusqu’au refus de dissoudre.", "La procédure doit permettre à une autre équipe de reproduire l’expérience."]);

/* ---------- SC7.9.6 Procedures controlant les variables (separation) ---------- */
E("s7f-u3-procedure-order", 3, ["SC7.9.6"], 2, "var", varset([
  function () {
    return mcq("Une équipe sépare un mélange de sable et de sel sec. Quelle suite de procédures est dans le bon ordre et contrôle le problème pratique de la perte de matière?", "Dissoudre le sel dans l’eau, filtrer pour retenir le sable, puis évaporer l’eau du filtrat pour récupérer le sel séparé", ["Évaporer le mélange sec, filtrer les vapeurs obtenues, puis dissoudre le sable pour récupérer le sel séparé du mélange", "Filtrer le mélange sec sans eau, dissoudre le sable dans l’eau, puis chauffer le sel pour le séparer du sable restant", "Dissoudre le sable dans l’eau, évaporer la solution obtenue, puis filtrer le sel pour le récupérer à la fin du travail"], "L’ordre exploite les propriétés une à une : l’eau dissout le sel (pas le sable), la filtration retient le sable, et l’évaporation récupère le sel du filtrat.", {});
  }
]), ["Le sel doit d’abord devenir invisible (dissous) pour traverser le filtre.", "Chaque étape prépare la suivante."]);
E("s7f-u3-procedure-problem", 3, ["SC7.9.6"], 1, "var", varset([
  function () {
    return mcq("Pendant une filtration, une équipe constate que son filtrat est trouble et contient encore du sable fin. Quelle correction de procédure règle le problème?", "Recommencer la filtration avec un filtre plus fin ou un double filtre, en versant lentement le long d’une tige de verre", ["Brasser le filtrat trouble très fort pour faire disparaître le sable fin qu’il contient encore après la filtration", "Ajouter de l’eau au filtrat trouble pour diluer le sable fin jusqu’à ce qu’il devienne invisible à l’œil nu des élèves", "Déclarer le filtrat pur, car un peu de sable fin ne change jamais les résultats d’une expérience de séparation menée"], "Un filtrat trouble signale un passage de particules : un filtre plus fin et un versement lent corrigent la procédure. Diluer ou déclarer ne sépare rien.", {});
  }
]), ["Le problème est mécanique : des particules passent où elles ne devraient pas.", "La correction change la procédure, pas la description du résultat."]);

/* ---------- SC7.9.7 Outils et instruments : efficacite et exactitude ---------- */
E("s7f-u3-tools-safety", 3, ["SC7.9.7"], 1, "var", varset([
  function () {
    return mcq("Quelle conduite assure un usage efficace et exact des instruments pendant une expérience de séparation?", "Peser le récipient vide avant l’expérience, puis le récipient plein, et consigner les deux masses immédiatement dans le tableau prévu", ["Peser seulement le récipient plein à la fin et deviner la masse du récipient vide d’après son apparence générale", "Estimer les volumes à l’œil plutôt qu’au cylindre gradué, pour gagner du temps pendant l’expérience de séparation", "Consigner les masses de mémoire à la fin de la journée, après avoir rangé tout le matériel de l’expérience menée"], "La précision vient des gestes : tare mesurée, instruments adaptés (balance, cylindre gradué) et consignation immédiate. Deviner et attendre détruisent l’exactitude.", {});
  }
]), ["Efficace et exact : mesurer avec l’instrument prévu, au moment prévu.", "Une masse de départ devinée fausse tous les calculs suivants."]);
E("s7f-u3-tools-accurate", 3, ["SC7.9.7"], 2, "var", varset([
  function () {
    return mcq("Pour lire le volume d’eau dans un cylindre gradué, quelle technique donne la mesure la plus exacte?", "Placer les yeux à la hauteur du liquide et lire le bas du ménisque, la surface courbe de l’eau dans le cylindre gradué", ["Regarder le liquide depuis le haut du cylindre et lire le bord supérieur du ménisque formé par l’eau dedans", "Tenir le cylindre à bout de bras et lire la graduation la plus proche de la surface de l’eau qu’il contient", "Lire la graduation pendant qu’on verse encore l’eau, pour gagner du temps sur les étapes suivantes du travail"], "Le ménisque est la surface courbe du liquide : on lit son bas, les yeux à sa hauteur, le cylindre posé et au repos. Toute autre position fausse la lecture par l’angle.", {});
  }
]), ["Ménisque : on lit le bas de la courbe, à hauteur des yeux.", "Un cylindre qui bouge ou qu’on regarde en angle donne une fausse mesure."]);

/* ---------- SC7.9.8 Nouvelles questions issues des separations ---------- */
E("s7f-u3-new-questions", 3, ["SC7.9.8"], 1, "var", varset([
  function () {
    return mcq("Après avoir séparé un mélange de sable et de sel, une équipe remarque que le sel récupéré pèse moins que le sel de départ. Quelle nouvelle question découle directement de cette activité?", "« Où le sel manquant est-il resté pendant nos étapes, et quelle étape l’a retenu le plus? »", ["« Pourquoi le sel et le sable sont-ils deux substances différentes au départ du mélange? »", "« Quelle est la capitale du pays où le sel de table est produit en plus grande quantité? »", "« Le sel récupéré est-il plus beau que le sel de départ utilisé dans le mélange sec? »"], "Une nouvelle question naît d’un résultat à expliquer : la perte de masse pendant les étapes. Elle se rattache directement aux observations de l’activité de séparation.", {});
  }
]), ["La nouvelle question part d’un résultat observé pendant l’activité.", "Une perte mesurée demande une explication mesurable."]);
E("s7f-u3-cr-new-question", 3, ["SC7.9.8"], 2, "var", varset([
  function () {
    return textq("Une équipe essaie de séparer une solution de sucre par filtration, et le sucre traverse le filtre avec l’eau. (a) Énonce la nouvelle question que ce résultat soulève. (b) Nomme la technique de séparation vers laquelle le résultat oriente l’équipe, et dis pourquoi elle devrait réussir là où la filtration a échoué. (2 points)", ["la nouvelle question porte sur la raison pour laquelle le sucre dissous traverse le filtre (la taille des particules dissoutes)", "l’évaporation (ou la distillation) : les particules dissoutes sont trop petites pour un filtre, mais l’eau et le sucre se séparent par le changement d’état de l’eau"], "<b>Réponse modèle :</b> (a) Nouvelle question : pourquoi la filtration sépare-t-elle certains mélanges, mais pas une solution? Autrement dit, quelle propriété d’une substance dissoute lui permet de traverser un filtre? (b) Le résultat oriente vers l’évaporation (ou la distillation, si on veut aussi récupérer l’eau) : les particules de sucre dissous sont beaucoup trop petites pour être retenues par un filtre, mais l’eau s’évapore en laissant le sucre derrière; la distillation ajoute la condensation pour recueillir l’eau.<br><br><b>Points d’attribution :</b> 1 point pour une nouvelle question qui naît du résultat raté (particules dissoutes, taille, limites de la filtration). 1 point pour l’évaporation ou la distillation nommée, avec le raisonnement sur le changement d’état.", {});
  }
]), ["L’échec est une donnée : demande ce qu’il enseigne.", "De la grosseur des particules au point d’ébullition : c’est le changement de technique."]);

/* Exclusion de la composition : la question de conception d'experience
   ci-dessous porte noCompose et reste disponible dans les tirages de
   pratique et les choix explicites de l'enseignant, mais elle est exclue
   des examens composes. */
var NO_COMPOSE_U3 = { "s7f-u3-cr-design-solubility": true };
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });
