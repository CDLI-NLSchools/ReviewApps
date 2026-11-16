/* Science 7, Unit 3: Mixtures and Solutions (SC7.7.1 to SC7.9.8, 21
   indicators, 60 entries). Sources: the current English guide (Focus
   for Learning for all 21 indicators; terminology governs; particle,
   not atom or molecule), the outcome spreadsheet (tag set verified
   set-identical to the guide, in order), ExamView Chapters 7 to 9 (271
   items parsed), Core Labs 7-1C, 8-1C, 8-2A and 9-1C, the "Would You
   Like Salt On That?" road salt STSE module (the guide's Appendix A;
   ESD and WNLSD copies byte-identical, counted once), the ESD Unit 3
   exam, the WNLSD Unit 3 test family, Chapter 9 test and objectives
   sheet. All items mine-and-rewrite; nothing verbatim. Harvest
   catalogue and authoring spec:
   Science-7-Mixtures-Harvest-Catalogue-2026-11-15.md and
   Science-7-Mixtures-Authoring-Spec-2026-11-15.md. */
// CRMARKS: s7-u3-cr-pure=2
// CRMARKS: s7-u3-cr-classify=3
// CRMARKS: s7-u3-cr-dissolving=3
// CRMARKS: s7-u3-cr-concentration=3
// CRMARKS: s7-u3-cr-solubility=2
// CRMARKS: s7-u3-cr-separate=3
// CRMARKS: s7-u3-cr-three-part=3
// CRMARKS: s7-u3-cr-distill=2
// CRMARKS: s7-u3-cr-salt-decision=3
// CRMARKS: s7-u3-cr-best-fit=3
// CRMARKS: s7-u3-cr-design-solubility=4
// CRMARKS: s7-u3-cr-new-question=2

/* ---------- SC7.7.1 Pure substances and mixtures ---------- */
E("s7-u3-classify-pure", 3, ["SC7.7.1"], 1, "gen", function () {
  var cases = [
    { s: "table salt, made of one kind of particle throughout", key: "A pure substance", d: ["A mixture", "A solution", "A mechanical mixture"] },
    { s: "distilled water, with nothing dissolved in it", key: "A pure substance", d: ["A mixture", "A heterogeneous mixture", "A solution"] },
    { s: "air, a blend of nitrogen, oxygen and other gases", key: "A mixture", d: ["A pure substance", "An element", "A compound"] },
    { s: "a gold bar, made only of gold particles", key: "A pure substance", d: ["A mixture", "A solution", "A heterogeneous mixture"] },
    { s: "concrete, made of cement, sand, gravel and water", key: "A mixture", d: ["A pure substance", "An element", "A compound"] },
    { s: "baking soda, one kind of particle made of several elements in fixed proportions", key: "A pure substance", d: ["A mixture", "A mechanical mixture", "A solution"] }
  ];
  var c = pick(cases);
  return mcq("Using the particle theory, how should this substance be classified: " + c.s + "?",
    c.key, c.d,
    "A pure substance contains only one kind of particle and is the same throughout; the particle may be a single atom (gold) or atoms chemically combined in fixed proportions (salt, baking soda, distilled water). A mixture physically combines two or more pure substances, like the gases in air or the ingredients in concrete.",
    {});
}, ["Ask one question: how many kinds of particle are present?", "One kind of particle means pure, even when the particle itself contains several elements."]);

E("s7-u3-particle-pure", 3, ["SC7.7.1"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows particles in three containers. Which container holds a pure substance, and why?",
      "Container 1, because it holds only one kind of particle throughout",
      ["Container 2, because its two kinds of particle are evenly mixed",
       "Container 3, because its particles are neatly separated into layers",
       "None of them, because pure substances cannot be drawn as particles"],
      "A pure substance is one kind of particle, the same throughout: Container 1. Container 2 is a mixture whose particles are evenly mixed (a solution), and Container 3 is a mixture whose particles sit in separate layers. Even mixing does not make a mixture pure.",
      {});
    q.figure = s7MixturePanelSVG();
    return q;
  },
  function () {
    var q = mcq("The diagram shows particles in three containers. Which containers hold mixtures?",
      "Containers 2 and 3, because each holds two kinds of particle",
      ["Container 2 only, because Container 3's particles are separated",
       "Container 3 only, because Container 2 looks uniform",
       "Containers 1 and 2, because their particles are evenly spread"],
      "A mixture is any physical combination of two or more kinds of particle. Container 2 mixes them evenly and Container 3 keeps them in layers, but both hold two kinds, so both are mixtures. Container 1 holds one kind only: a pure substance.",
      {});
    q.figure = s7MixturePanelSVG();
    return q;
  }
]), ["Count the kinds of particle in each container, not how tidy they look.", "Evenly mixed is still a mixture; layered is still a mixture."]);

E("s7-u3-pure-misconception", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return mcq("A juice box is labelled '100% pure orange juice.' A student says this means orange juice is a pure substance in the scientific sense. Which response is correct?",
      "The label uses 'pure' in the everyday sense; scientifically, orange juice is a mixture of water, sugars, pulp and other substances",
      ["The student is right, because the label says pure",
       "The student is right, because orange juice is clear enough to see through",
       "The label is wrong, because pure substances are always safe to drink"],
      "Everyday 'pure' means something like unspoiled or nothing added. Scientific 'pure' means one kind of particle only. Orange juice contains many kinds of particle, so it is a mixture however honest the label is. The guide names this exact confusion, along with 'pure means safe to ingest' and 'pure means clear,' as misconceptions to correct.",
      {});
  },
  function () {
    return mcq("Which statement about pure substances is scientifically correct?",
      "Compounds such as salt, sugar and baking soda are pure substances, because each contains its particles in fixed proportions",
      ["Only elements can be pure substances",
       "A pure substance is one that is safe to eat or drink",
       "If a substance looks clear and uniform, it must be a pure substance"],
      "Pure substances are not limited to elements. A compound's particles are all alike, with their elements combined in fixed proportions, so compounds are pure substances. Safety and clarity are everyday meanings of 'pure,' not the scientific one: some pure substances are poisonous, and some mixtures look perfectly clear.",
      {});
  }
]), ["Separate the everyday meaning of 'pure' from the scientific one.", "One kind of particle, in fixed proportions: elements and compounds both qualify."]);

E("s7-u3-cr-pure", 3, ["SC7.7.1"], 2, "var", varset([
  function () {
    return textq("Explain, using the particle theory, why table salt is classified as a pure substance but salt water is classified as a mixture. (2 marks)",
      ["salt has one kind of particle", "salt water has two kinds of particles", "physically combined"],
      "<b>Model answer:</b> Table salt contains only one kind of particle, the same throughout, so it is a pure substance (its particle is a compound particle, with elements combined in fixed proportions). Salt water contains two kinds of particle, salt particles and water particles, physically combined in no fixed proportion, so it is a mixture.<br><br><b>Marking points:</b> 1 mark for salt as one kind of particle throughout; 1 mark for salt water as two kinds of particle physically combined.",
      {});
  }
]), ["Count particle kinds in each substance.", "One kind means pure; two kinds physically combined means mixture."]);

/* ---------- SC7.7.2 Heterogeneous and homogeneous mixtures ---------- */
E("s7-u3-classify-mixtures", 3, ["SC7.7.2"], 1, "gen", function () {
  var cases = [
    { s: "salt water, clear and the same throughout", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "A compound"] },
    { s: "trail mix, with nuts, raisins and seeds visible separately", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "vegetable oil shaken with water, separating into layers", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "sugar water, with no sugar visible anywhere in it", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "An element"] },
    { s: "granite, with flecks of different minerals visible in the rock", key: "Heterogeneous (a mechanical mixture)", d: ["Homogeneous (a solution)", "A pure substance", "A compound"] },
    { s: "brass, the same colour and composition throughout the metal", key: "Homogeneous (a solution)", d: ["Heterogeneous (a mechanical mixture)", "A pure substance", "An element"] }
  ];
  var c = pick(cases);
  return mcq("How should this mixture be classified: " + c.s + "?",
    c.key, c.d,
    "In a homogeneous mixture (a solution) the particles mix so evenly that the mixture appears as one substance throughout, like salt water, sugar water and brass. In a heterogeneous (mechanical) mixture the parts stay visible or separate, like trail mix, oil and water, and granite. None of these is a pure substance: each combines two or more kinds of particle.",
    {});
}, ["Can you see separate parts, or does it look like one substance throughout?", "Appearing as one substance points to homogeneous; visible parts point to heterogeneous."]);

E("s7-u3-light-test", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("A flashlight beam is shone through two mixtures in a dark room. Through Mixture A the beam passes cleanly and cannot be seen from the side. In Mixture B the beam scatters and glows as it crosses. What does the light test show?",
      "A is homogeneous (light passes through unaffected); B is heterogeneous (its particles scatter the light)",
      ["A is heterogeneous; B is homogeneous",
       "Both are homogeneous, because both let some light through",
       "Both are pure substances, because light behaves specially in mixtures"],
      "Light behaviour separates the two mixture types: in a homogeneous mixture the particles are too evenly spread and small to disturb the beam, so it passes through unaffected. In a heterogeneous mixture the larger particles reflect and scatter the light, making the beam visible from the side.",
      {});
  },
  function () {
    return mcq("In a sunbeam crossing a classroom, the dust in the air becomes visible where the light passes. What does this reveal about classroom air?",
      "Classroom air is a heterogeneous mixture, because the dust particles in it scatter the light",
      ["Classroom air is a pure substance, because gases are pure",
       "Classroom air is homogeneous, because air always is",
       "The sunbeam creates the dust, which was not there before"],
      "Air's gases form a homogeneous mixture, but classroom air also carries dust particles, and those particles scatter the light and give the mixture away as heterogeneous. Clean air in a breathing apparatus, without the dust, is the homogeneous case.",
      {});
  }
]), ["Watch what the beam does: passes clean, or scatters and glows.", "Scattering means larger particles are present: heterogeneous."]);

E("s7-u3-combination", 3, ["SC7.7.2"], 2, "var", varset([
  function () {
    return mcq("Orange juice is described as a combination mixture. Why does it not fit neatly into either the homogeneous or the heterogeneous class?",
      "Its sugars are dissolved evenly in the water (a homogeneous part) while its pulp stays in visible pieces (a heterogeneous part)",
      ["It changes class depending on the temperature of the room",
       "It is actually a pure substance, so neither class applies",
       "Its colour hides which class it belongs to"],
      "Many real mixtures combine both behaviours. In orange juice the dissolved sugars and water form a solution, while the pulp remains as separate visible pieces. Milk and soft drinks are the guide's other combination examples. Classification questions in this strand stick to clear examples for the two main classes and treat combinations honestly as combinations.",
      {});
  }
]), ["Look for two behaviours in one mixture: a dissolved part and a visible part.", "Combinations are real; the two classes are the ends of a continuum."]);

E("s7-u3-cr-classify", 3, ["SC7.7.2"], 3, "var", varset([
  function () {
    return textq("In a Core Lab activity, a group examined an unknown drink four ways. Their record: unaided eye, looks uniform; hand lens, tiny specks visible; microscope, particles of different sizes visible; flashlight, the beam scatters as it crosses the drink. Classify the drink as homogeneous or heterogeneous, and justify your classification with two of the observations. (3 marks)",
      ["heterogeneous", "particles visible under lens or microscope", "light scatters"],
      "<b>Model answer:</b> The drink is a heterogeneous mixture. Although it looks uniform to the unaided eye, the hand lens and microscope reveal particles of different sizes suspended in it, which a homogeneous mixture would not show (its particles are not visible even under a microscope). The flashlight test confirms it: the beam scatters as it crosses, which happens when light reflects off larger particles in a heterogeneous mixture; in a homogeneous mixture the beam passes through unaffected.<br><br><b>Marking points:</b> 1 mark for heterogeneous; 1 mark for the visible particles under the lens or microscope; 1 mark for the scattered beam. Any two of the three observation-based points earn the justification marks.",
      {});
  }
]), ["Trust the strongest observations, not the first impression.", "Visible particles and a scattered beam both point the same way."]);

/* ---------- SC7.7.3 Dissolving; solute and solvent ---------- */
E("s7-u3-solute-solvent", 3, ["SC7.7.3"], 1, "gen", function () {
  var cases = [
    { s: "a teaspoon of sugar stirred into a cup of hot water", key: "Sugar is the solute; water is the solvent", d: ["Water is the solute; sugar is the solvent", "Both are solutes", "Both are solvents"] },
    { s: "vinegar, which is 5 percent acetic acid and 95 percent water", key: "Acetic acid is the solute; water is the solvent", d: ["Water is the solute; acetic acid is the solvent", "Both are solvents in equal roles", "Neither; vinegar is a pure substance"] },
    { s: "air, which is about 78 percent nitrogen with oxygen and other gases making up the rest", key: "Nitrogen is the solvent; the other gases are solutes", d: ["Oxygen is the solvent; nitrogen is the solute", "All the gases are solutes; air has no solvent", "Air is a pure substance, so the terms do not apply"] },
    { s: "brass, made of 35 g of zinc combined in 65 g of copper", key: "Zinc is the solute; copper is the solvent", d: ["Copper is the solute; zinc is the solvent", "Both are solutes", "Brass is a pure substance, so the terms do not apply"] },
    { s: "soda water, carbon dioxide gas dissolved in water", key: "Carbon dioxide is the solute; water is the solvent", d: ["Water is the solute; carbon dioxide is the solvent", "Both are solvents", "Neither; the gas escapes, so it was never a solute"] }
  ];
  var c = pick(cases);
  return mcq("Identify the solute and the solvent in this solution: " + c.s + ".",
    c.key, c.d,
    "The solvent is the component present in the larger amount, the one doing the dissolving; the solute is the component dissolved in it. That rule holds across states: in vinegar the water (95 percent) is the solvent, in air the nitrogen is, and in brass the copper is, even though brass is a solid solution.",
    {});
}, ["The solvent is the part present in the larger amount.", "Solid solutions count too: brass has a solute and a solvent."]);

E("s7-u3-dissolving-particles", 3, ["SC7.7.3"], 1, "var", varset([
  function () {
    return mcq("When sugar dissolves in water, what happens at the particle level?",
      "The sugar particles separate from each other and spread evenly among the water particles",
      ["The sugar particles melt and become water particles",
       "The sugar particles disappear completely",
       "The water particles break apart into new particles"],
      "Dissolving is a physical mixing at the particle level: the solute's particles leave each other and distribute evenly through the solvent's particles. The sugar is still there, which is why the water tastes sweet and why evaporation can recover it. Nothing melts, disappears, or changes into a different particle.",
      {});
  },
  function () {
    return mcq("A substance that cannot dissolve in a given solvent is described as",
      "insoluble in that solvent",
      ["saturated in that solvent",
       "concentrated in that solvent",
       "a solvent for that solvent"],
      "Solubility is the ability to dissolve: a solute that dissolves is soluble, and one that does not is insoluble, always in relation to a particular solvent. Flour is insoluble in water; salt is insoluble in oil. Saturated and concentrated describe how much has dissolved, not whether dissolving happens at all.",
      {});
  }
]), ["Dissolving spreads the solute's particles among the solvent's; nothing vanishes.", "Soluble and insoluble are always about a solute in a particular solvent."]);

E("s7-u3-solution-states", 3, ["SC7.7.3"], 2, "var", varset([
  function () {
    return mcq("Which list matches each solution to its solute and solvent states correctly?",
      "Brass: solid in solid. Soda water: gas in liquid. Air: gas in gas. Antifreeze: liquid in liquid",
      ["Brass: liquid in solid. Soda water: liquid in gas. Air: gas in liquid. Antifreeze: solid in liquid",
       "Brass: solid in solid. Soda water: solid in liquid. Air: liquid in gas. Antifreeze: gas in liquid",
       "All four are solid in liquid, because solutions are made in beakers"],
      "Solutions form between all three states of matter. Brass is zinc (solid) dissolved in copper (solid); soda water is carbon dioxide (gas) in water (liquid); air is gases dissolved in nitrogen (gas); antifreeze is alcohol (liquid) in water (liquid). Most classroom solutions are solid in liquid, but they are not the only kind.",
      {});
  }
]), ["Work through the four examples one state pair at a time.", "Brass is the giveaway: a solution can be solid."]);

E("s7-u3-cr-dissolving", 3, ["SC7.7.3"], 3, "var", varset([
  function () {
    return textq("A student stirs drink crystals into water and the colour spreads evenly through the whole glass. (a) Explain what is happening at the particle level. (b) Name the solute and the solvent. (c) The student then stirs sand into a second glass and it settles at the bottom. Explain why the sand behaves differently. (3 marks)",
      ["particles spread evenly among water particles", "drink crystals solute, water solvent", "sand is insoluble"],
      "<b>Model answer:</b> (a) The drink crystals' particles separate from one another and spread evenly among the water particles, which is dissolving; the even spread is why the colour is uniform throughout. (b) The drink crystals are the solute and the water is the solvent. (c) Sand is insoluble in water: its particles do not separate and spread among the water particles, so they stay together and settle. Dissolving depends on the particular solute and solvent pair, not on stirring alone.<br><br><b>Marking points:</b> 1 mark for the particle-level account of dissolving; 1 mark for solute and solvent named correctly; 1 mark for the sand explained as insoluble in water.",
      {});
  }
]), ["Particles first, names second, the contrast case last.", "Insoluble means the particles never separate into the solvent."]);

/* ---------- SC7.7.4 Concentration ---------- */
E("s7-u3-conc-compare", 3, ["SC7.7.4"], 2, "gen", function () {
  var cases = [
    { ctx: "Three drink mixes are made with powder and water", vessels: [{ label: "Mix A", solute: 20, vol: 100 }, { label: "Mix B", solute: 10, vol: 100 }, { label: "Mix C", solute: 20, vol: 200 }], key: "Mix A", why: "A and C hold the same amount of powder, but A has it in half the water, and B has half the powder in the same water as A" },
    { ctx: "Three lab solutions of the same solute are prepared", vessels: [{ label: "Solution A", solute: 15, vol: 100 }, { label: "Solution B", solute: 15, vol: 50 }, { label: "Solution C", solute: 30, vol: 200 }], key: "Solution B", why: "B holds A's amount of solute in half the water; C's larger amount is spread through twice the water, matching A" },
    { ctx: "Three juice jugs are mixed for a class party", vessels: [{ label: "Jug A", solute: 40, vol: 200 }, { label: "Jug B", solute: 25, vol: 100 }, { label: "Jug C", solute: 10, vol: 100 }], key: "Jug B", why: "per 100 mL, A works out to 20 g, B is 25 g, and C is 10 g" }
  ];
  var c = pick(cases);
  var others = c.vessels.map(function (v) { return v.label; }).filter(function (n) { return n !== c.key; });
  var q = mcq(c.ctx + ". Which is the most concentrated?",
    c.key, others.concat(["All three are equally concentrated"]),
    "Concentration compares amount of solute per amount of solvent, so the amounts must be brought to a common volume before judging. Here, " + c.why + ", which makes " + c.key + " the most concentrated. Judging by the solute amount alone, without the water it is dissolved in, is the error the distractors are built on.",
    {});
  q.figure = s7ConcentrationSVG(c.vessels);
  return q;
}, ["Bring every vessel to the same volume of water before comparing.", "Solute amount alone does not decide; amount per volume does."]);

E("s7-u3-saturated", 3, ["SC7.7.4"], 1, "var", varset([
  function () {
    return mcq("A student adds sugar to water and stirs. At first all the sugar dissolves; after several spoonfuls, sugar sits at the bottom no matter how long she stirs. The solution is now",
      "saturated, because it holds all the solute it can dissolve at that temperature",
      ["concentrated, because it has a lot of sugar in it",
       "insoluble, because no more sugar can ever be added",
       "a heterogeneous mixture, because the solution part changed class"],
      "A saturated solution holds the maximum amount of solute it can dissolve at that temperature; extra solute stays undissolved. Before that point the solution was unsaturated. Saturated is about the limit, not about strength in general: a saturated solution of a slightly soluble substance can still be very dilute.",
      {});
  },
  function () {
    return mcq("Which statement about concentrated and saturated is correct?",
      "A solution can be concentrated and still unsaturated, if it holds a lot of solute but could dissolve more",
      ["Concentrated and saturated mean the same thing",
       "A saturated solution is always dilute",
       "An unsaturated solution can never be concentrated"],
      "The two pairs of terms answer different questions. Dilute and concentrated compare how much solute is present; unsaturated and saturated ask whether more could still dissolve. A strong solution that could take still more solute is concentrated and unsaturated at once.",
      {});
  }
]), ["Saturated is about the limit; concentrated is about the amount.", "A solution can be concentrated and unsaturated at the same time."]);

E("s7-u3-conc-change", 3, ["SC7.7.4"], 2, "var", varset([
  function () {
    return mcq("A cook simmers an open pan of sauce for an hour. The sauce tastes stronger at the end, though nothing was added. Why is it more concentrated?",
      "Water evaporated from the sauce, so the same amount of flavouring is dissolved in less solvent",
      ["Simmering creates more flavouring particles in the pan",
       "The heat dissolved the pan into the sauce",
       "Stirring forced more air into the sauce"],
      "Concentration can rise two ways: add solute, or remove solvent. Simmering removes water by evaporation, leaving the same solute in less solvent, which is exactly the guide's example. No new flavouring was created.",
      {});
  },
  function () {
    return mcq("A drink mix tastes too strong. Which change dilutes it, and what happens to its concentration?",
      "Add more water; the same solute is spread through more solvent, so the concentration falls",
      ["Add more powder; the concentration falls because there is more mixture",
       "Let it sit; concentrations always fall on their own",
       "Pour half away; the concentration falls by half"],
      "Diluting means adding solvent: the solute amount stays the same while the volume grows, so the amount per volume falls. Pouring half away changes the amount of solution, not its concentration; what remains tastes exactly as strong.",
      {});
  }
]), ["Concentration changes by adding solute or by changing the solvent amount.", "Removing solvent concentrates; adding solvent dilutes."]);

E("s7-u3-cr-concentration", 3, ["SC7.7.4"], 3, "var", varset([
  function () {
    return textq("Two sports drinks are mixed. Drink A uses 30 g of powder in 200 mL of water. Drink B uses 20 g of powder in 100 mL of water. Which drink is more concentrated? Prove your answer by comparing the two at a common volume. (3 marks)",
      ["B is more concentrated", "per 100 mL: A is 15 g, B is 20 g", "common volume comparison"],
      "<b>Model answer:</b> Drink B is more concentrated. Compared at a common volume of 100 mL of water: Drink A carries 30 g in 200 mL, which is 15 g per 100 mL; Drink B carries 20 g per 100 mL. Since 20 g per 100 mL is more solute per volume than 15 g per 100 mL, B is the more concentrated drink, even though A used more powder in total.<br><br><b>Marking points:</b> 1 mark for B named as more concentrated; 1 mark for both amounts expressed at a common volume (15 g per 100 mL against 20 g per 100 mL, or an equivalent scaling); 1 mark for the conclusion tied to amount per volume rather than total amount.",
      {});
  }
]), ["Do not judge by the total powder; scale both to the same volume.", "Per 100 mL is the common volume the guide itself uses."]);

/* ---------- SC7.7.5 Factors affecting solubility ---------- */
E("s7-u3-solubility-temp", 3, ["SC7.7.5"], 1, "var", varset([
  function () {
    return mcq("As the temperature of water increases, what generally happens to the solubility of a solid solute and of a gas solute?",
      "The solid's solubility generally increases; the gas's solubility generally decreases",
      ["Both generally increase",
       "Both generally decrease",
       "The solid's generally decreases; the gas's generally increases"],
      "Temperature pushes the two solute kinds opposite ways. Most solids dissolve more in warmer water, which is why sugar dissolves faster and further in hot tea. Gases dissolve less in warmer water, which is why a warm soft drink loses its fizz. The guide states both as general rules; a few solids, like table salt, barely change.",
      {});
  }
]), ["Solids and gases answer temperature in opposite directions.", "Warm water holds more solid but less gas."]);

E("s7-u3-solubility-pressure", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return mcq("A sealed bottle of pop is opened and hisses. Over the next hour the pop goes flat. Which explanation is correct?",
      "Opening the bottle drops the pressure, so the carbon dioxide's solubility falls and the gas escapes from solution",
      ["Opening the bottle lets air in, and the air pushes the carbon dioxide out",
       "The carbon dioxide reacts with the sugar once the bottle is opened",
       "The pop warms up instantly on opening, and warm pop cannot hold gas"],
      "Inside the sealed bottle, high pressure keeps extra carbon dioxide dissolved. Opening releases the pressure, the gas's solubility drops, and the excess gas comes out of solution as bubbles until the pop is flat. Pressure affects the solubility of gases; it has no comparable effect on solids.",
      {});
  },
  function () {
    return mcq("Two identical bottles of pop are opened at the same time. One is left on a warm counter; the other goes straight into a refrigerator. Which goes flat faster, and why?",
      "The warm one, because a gas's solubility decreases as temperature rises, so its carbon dioxide escapes sooner",
      ["The cold one, because cold liquids release gas more easily",
       "Both at the same rate, because temperature does not affect gases in solution",
       "The warm one, because heat creates extra carbon dioxide in the pop"],
      "Both bottles lost their pressure when opened. The warm bottle also fights temperature: warmer liquid holds less dissolved gas, so its carbon dioxide comes out of solution faster. The refrigerated bottle keeps more of its fizz for longer.",
      {});
  }
]), ["Pressure holds gas in; opening the bottle lets it drop.", "For gases, warmth also pushes them out of solution."]);

E("s7-u3-cr-solubility", 3, ["SC7.7.5"], 2, "var", varset([
  function () {
    return textq("Explain why a bottle of pop that has been opened and left in a warm room goes flat much faster than a sealed bottle kept in the refrigerator. Use both factors that affect the solubility of a gas. (2 marks)",
      ["opening drops pressure, gas solubility falls", "warmth lowers gas solubility further"],
      "<b>Model answer:</b> Two factors work together. First, pressure: the sealed bottle holds carbon dioxide in solution under high pressure; opening it drops the pressure, so the gas's solubility falls and carbon dioxide escapes. Second, temperature: a gas's solubility decreases as temperature rises, so the warm room drives more gas out, while the refrigerator's cold keeps more gas dissolved. The sealed, cold bottle keeps both factors working in its favour.<br><br><b>Marking points:</b> 1 mark for the pressure factor correctly applied; 1 mark for the temperature factor correctly applied to a gas.",
      {});
  }
]), ["Two factors, both about gases: pressure and temperature.", "Opening drops the pressure; warmth lowers the solubility further."]);

/* ---------- SC7.7.6 Separation methods matched to mixtures ---------- */
E("s7-u3-method-match", 3, ["SC7.7.6"], 1, "gen", function () {
  var cases = [
    { s: "sand mixed into water", key: "Filtration", d: ["Distillation", "Paper chromatography", "Magnetism"] },
    { s: "salt dissolved in water, when only the salt is needed", key: "Evaporation", d: ["Filtration", "Mechanical sorting", "Flotation"] },
    { s: "iron filings mixed with sand", key: "Magnetism", d: ["Filtration", "Evaporation", "Paper chromatography"] },
    { s: "the colours mixed in a drop of black ink", key: "Paper chromatography", d: ["Filtration", "Distillation", "Mechanical sorting"] },
    { s: "alcohol mixed with water, when both liquids are needed", key: "Distillation", d: ["Evaporation", "Filtration", "Magnetism"] },
    { s: "cranberries mixed with small stones of the same size", key: "Flotation", d: ["Screening", "Magnetism", "Evaporation"] }
  ];
  var c = pick(cases);
  return mcq("Which separation method fits this mixture: " + c.s + "?",
    c.key, c.d,
    "Each method exploits a property difference. Filtration catches an undissolved solid in a liquid; evaporation removes a solvent to leave a dissolved solid; distillation recovers liquids by boiling point; magnetism pulls out a magnetic component; flotation separates by what floats; paper chromatography separates by how far components travel in a solvent.",
    {});
}, ["Name the property difference the method exploits.", "Undissolved solid: filter. Dissolved solid: evaporate. Two liquids: distill."]);

E("s7-u3-method-property", 3, ["SC7.7.6"], 2, "var", varset([
  function () {
    return mcq("A student tries to separate sugar water by pouring it through a coffee filter. The filtrate still tastes sweet. Why did filtration fail?",
      "Dissolved sugar particles are far too small to be trapped by the filter; filtration only separates undissolved solids from liquids",
      ["The filter was the wrong colour for sugar",
       "Sugar water is too heavy for a filter to hold",
       "The sugar dissolved the filter paper as it passed"],
      "A filter is a particle-size barrier: it stops pieces large enough to see and lets liquid and anything dissolved in it pass through. Dissolved sugar is spread at the particle level, so it passes with the water. Evaporation or distillation, which exploit the boiling point difference, are the methods that fit a solution.",
      {});
  },
  function () {
    return mcq("A magnet separates iron filings from sand easily, but cannot separate salt from sand. What property decides whether magnetism works?",
      "Whether one component of the mixture is magnetic; salt is not, so the magnet has nothing to pull",
      ["Whether the components differ in colour",
       "Whether the mixture is homogeneous or heterogeneous",
       "Whether the components were mixed by hand or by machine"],
      "Every separation method works on a property difference. Magnetism needs a magnetic component: iron filings respond, salt and sand do not. Salt and sand are separated instead by dissolving the salt in water, filtering out the sand, and evaporating the water, using solubility and boiling point differences.",
      {});
  }
]), ["A failed method usually means the property difference was not there.", "Filters catch size; magnets need magnetism; solutions need boiling point methods."]);

E("s7-u3-cr-separate", 3, ["SC7.7.6"], 3, "var", varset([
  function () {
    return textq("A mixture of sawdust and water must be separated so that both the sawdust and the water are recovered clean. Describe the method you would use and explain, in terms of the components' properties, why it works. (3 marks)",
      ["filtration", "sawdust is an undissolved solid", "water passes through the filter"],
      "<b>Model answer:</b> Use filtration. Pour the mixture through filter paper in a funnel. The sawdust is an undissolved solid whose pieces are far too large to pass through the paper's pores, so it is caught and can be dried and recovered. The water passes through as the filtrate and is collected below. The method works because the mixture pairs a liquid with an undissolved solid of much larger particle size; it would not work if the solid were dissolved.<br><br><b>Marking points:</b> 1 mark for filtration chosen; 1 mark for the property reasoning (undissolved solid, pieces too large for the pores); 1 mark for both components accounted for (sawdust caught, water collected as filtrate).",
      {});
  }
]), ["Choose the method, then defend it with a property.", "Both recovered components must be accounted for."]);

/* ---------- SC7.7.7 Common techniques; choosing a technique ---------- */
E("s7-u3-home-techniques", 3, ["SC7.7.7"], 1, "gen", function () {
  var cases = [
    { s: "straining cooked spaghetti in a colander", key: "Filtration (a coarse filter separates solid from liquid)", d: ["Evaporation", "Distillation", "Paper chromatography"] },
    { s: "skimming the fat off the top of cooled soup", key: "Mechanical sorting (removing one visible part from another)", d: ["Distillation", "Filtration through paper", "Magnetism"] },
    { s: "hanging wet clothes on a line until they are dry", key: "Evaporation (the water leaves as vapour)", d: ["Filtration", "Paper chromatography", "Flotation"] },
    { s: "a window screen letting air in but keeping insects out", key: "Screening (a barrier with holes of a chosen size)", d: ["Evaporation", "Distillation", "Magnetism"] },
    { s: "making coffee by pouring hot water through ground beans in a filter", key: "Filtration (the grounds are caught; the liquid passes)", d: ["Paper chromatography", "Evaporation", "Mechanical sorting"] },
    { s: "spinning lettuce in a salad spinner to throw the water off", key: "Mechanical separation (the water is flung off the leaves)", d: ["Distillation", "Filtration through paper", "Evaporation"] }
  ];
  var c = pick(cases);
  return mcq("Which separation technique is at work here: " + c.s + "?",
    c.key, c.d,
    "Separation techniques run all through a home. A colander and a coffee filter both filter; skimming and spinning sort mechanically; drying clothes evaporates water; a screen separates by size. Naming the technique means naming the property it uses: particle size, state, or visibility.",
    {});
}, ["Ask what is being separated from what, and by which property.", "Holes that catch solids are filtration or screening; water leaving as vapour is evaporation."]);

E("s7-u3-choose-technique", 3, ["SC7.7.7"], 2, "var", varset([
  function () {
    return mcq("A gardener has topsoil mixed with small stones and wants the stones out before planting. Both are dry solids of similar colour, but the stones are larger. Which technique fits best?",
      "Screening the soil through a mesh the soil passes and the stones do not",
      ["Dissolving the soil in water and filtering it",
       "Passing a magnet over the mixture",
       "Evaporating the mixture in the sun"],
      "The usable property difference is particle size, and screening exploits exactly that: soil grains pass the mesh, stones stay behind. Neither solid is magnetic, nothing needs dissolving, and evaporation separates liquids from solids, not two dry solids.",
      {});
  },
  function () {
    return mcq("A cook has accidentally poured salt into the sugar bowl. Both are white crystals of similar size, and both must be recovered if possible. Which plan has the best chance?",
      "Dissolve the mixture in water, then use the difference in how much of each the water can hold and careful evaporation and crystallization steps, accepting the separation is difficult",
      ["Screen the mixture to separate the two crystal sizes",
       "Pass a magnet through the bowl to lift out the salt",
       "Filter the dry mixture through paper to catch the salt"],
      "Salt and sugar defeat the simple methods: similar size rules out screening, neither is magnetic, and dry filtration separates solids from liquids, not two solids. Their solubilities differ, which gives a solution-based plan a chance, but this is genuinely one of the hard separations, which is why the guide asks students to consider mixtures that resist separating.",
      {});
  }
]), ["Start from the property difference you actually have.", "Similar size and no magnetism rules out the quick methods; say so when it is so."]);

E("s7-u3-cr-three-part", 3, ["SC7.7.7"], 3, "var", varset([
  function () {
    return textq("A jar holds a mixture of salt, sand and water. Describe, in order, the steps you would take to recover the salt and the sand separately, naming the technique used at each step. (3 marks)",
      ["filter out the sand", "evaporate the water from the filtrate", "salt remains"],
      "<b>Model answer:</b> Step 1, filtration: pour the mixture through filter paper. The sand is an undissolved solid and is caught by the paper; the salt is dissolved and passes through with the water. Wash the sand on the paper with a little clean water and let it dry; it is recovered. Step 2, evaporation: heat the filtrate (or leave it in a warm place) so the water evaporates, leaving the salt behind as crystals. The two techniques work on two different properties: particle size for the sand, and the boiling point difference between water and salt for the salt.<br><br><b>Marking points:</b> 1 mark for filtration first, separating the undissolved sand; 1 mark for evaporation of the filtrate to recover the salt; 1 mark for the order being workable (the sand must come out before evaporation, or the salt would crystallize into the sand).",
      {});
  }
]), ["Order matters: the undissolved solid comes out first.", "Filter, then evaporate. Evaporating first would trap the salt in the sand."]);

/* ---------- SC7.8.1 Distillation science ---------- */
E("s7-u3-distill-parts", 3, ["SC7.8.1"], 1, "var", varset([
  function () {
    return mcq("In a distillation apparatus separating salt water, where do boiling, evaporation and condensation each happen?",
      "The solution boils in the heated flask; the water evaporates from the solution's surface and as vapour; the vapour condenses back to liquid in the cooled condenser",
      ["Everything happens in the condenser, which does all three jobs",
       "Boiling happens in the receiving flask; condensation happens in the heated flask",
       "Evaporation happens in the receiving flask after the water arrives"],
      "Distillation chains the changes of state in order. Heat boils the solution in the first flask and the solvent evaporates as vapour, leaving the solute behind. The vapour travels into the cooled condenser, where it condenses back to liquid and drips into the receiving flask. Both parts are recovered: the solvent as the distillate, the solute left in the first flask.",
      {});
  },
  function () {
    return mcq("Which parts of a solution does simple distillation recover?",
      "Both: the solvent is collected as the distillate and the solute remains in the boiling flask",
      ["Only the solvent; the solute is destroyed by the heat",
       "Only the solute; the solvent is lost as vapour",
       "Neither; distillation only works on mechanical mixtures"],
      "Recovering both parts is distillation's advantage over plain evaporation, which recovers the solute but loses the solvent to the air. In salt water distillation, pure water collects in the receiving flask and the salt stays behind in the first flask.",
      {});
  }
]), ["Follow the vapour: boiled off, travelled, condensed, collected.", "Both parts survive distillation; that is its advantage over evaporation alone."]);

E("s7-u3-distill-vs-evap", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return mcq("Evaporation and distillation both separate a solvent from a dissolved solute. What does distillation add that evaporation does not have?",
      "Condensation: the vapour is cooled and collected, so the solvent is recovered as a liquid",
      ["Filtration: the solution is filtered as it boils",
       "A magnet: the solute is pulled out during boiling",
       "Chromatography: the components separate along a column"],
      "Evaporation lets the solvent escape into the air; only the solute is recovered. Distillation captures the vapour and condenses it, so the solvent is recovered too. Condensation is the step that belongs to distillation and not to evaporation alone.",
      {});
  }
]), ["One word separates the two methods: condensation.", "Evaporation loses the solvent; distillation collects it."]);

E("s7-u3-cr-distill", 3, ["SC7.8.1"], 2, "var", varset([
  function () {
    return textq("Explain how a distillation apparatus separates a salt water solution into pure water and salt. Your explanation must use the terms boiling, evaporation and condensation correctly. (2 marks)",
      ["solution boils, water evaporates as vapour", "vapour condenses in the condenser", "salt remains in the flask"],
      "<b>Model answer:</b> The salt water is heated until it boils. The water evaporates, turning to vapour and leaving the dissolved salt behind in the flask, because the salt does not evaporate with it. The vapour passes into a cooled condenser, where it undergoes condensation back into liquid water, which drips into a receiving flask as pure water (the distillate). The salt remains in the original flask, so both parts of the solution are recovered.<br><br><b>Marking points:</b> 1 mark for evaporation of the water with the salt left behind; 1 mark for condensation of the vapour in the condenser, collected as pure water.",
      {});
  }
]), ["Boil, evaporate, travel, condense, collect.", "The salt never leaves the first flask."]);

/* ---------- SC7.8.2 How separation techniques evolved ---------- */
E("s7-u3-fractional", 3, ["SC7.8.2"], 1, "var", varset([
  function () {
    return mcq("How does fractional distillation go beyond simple distillation?",
      "It separates a mixture of several liquids from each other, using their different boiling points, instead of separating one solute from one solvent",
      ["It uses a stronger flame, so the boiling is faster",
       "It filters the vapour as it rises, catching impurities",
       "It works without any heating, using gravity alone"],
      "Simple distillation handles one dissolved solute and its solvent. Fractional distillation, the refining technique used on crude oil, separates many liquids in one process: each component boils at its own temperature and is condensed and collected in turn. That is the evolution the indicator names: from separating a solution to refining a complex liquid mixture.",
      {});
  }
]), ["Simple: one solute from one solvent. Fractional: many liquids from each other.", "Different boiling points do the sorting in a fractional column."]);

E("s7-u3-refining-evolve", 3, ["SC7.8.2"], 2, "var", varset([
  function () {
    return mcq("Which account of how separation techniques developed is most accurate?",
      "They evolved by trial and error over a long time: simple methods for simple mixtures came first, and techniques like fractional distillation were developed when industries needed to separate complex mixtures like crude oil",
      ["They were all invented at once when the first chemistry laboratory was built",
       "They have not changed since ancient times, because mixtures have not changed",
       "Each technique was designed on paper before anyone tried it on a real mixture"],
      "The guide describes separation technology as developed through trial and error. Settling, sifting and simple distillation are ancient; fractional distillation arrived with the petroleum industry's need to split crude oil into useful fractions, and modern water treatment chains several techniques in sequence. Need drove each step.",
      {});
  }
]), ["Trial and error, driven by need, over a long time.", "Crude oil is the case that forced fractional distillation into being."]);

/* ---------- SC7.8.3 Examples affecting our lives ---------- */
E("s7-u3-lives-examples", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Which example best shows the science of mixtures and solutions at work in daily life?",
      "A water treatment plant filtering and treating river water so a town can drink it safely",
      ["A library sorting its books by author",
       "A baker choosing a cake recipe from a book",
       "A hockey team practising its passing"],
      "Water purification is one of the guide's named examples: a town's drinking water is a mixture problem solved by separation science, screening, filtering and treating. Sewage treatment, solvents lifting stains from clothes, recycling depots sorting materials, and screening topsoil are the guide's other examples of the same science at work.",
      {});
  },
  function () {
    return mcq("A dry cleaner uses a solvent to lift grease stains out of a jacket. Which idea from this unit is the cleaner relying on?",
      "A grease that will not dissolve in water can dissolve in a different solvent; choosing the solvent is applied solution science",
      ["Grease is a pure substance, so it leaves the fabric on its own",
       "The solvent evaporates the jacket's fibres along with the stain",
       "Stains are heterogeneous, so they can be picked off by hand"],
      "Dissolving depends on the solute-solvent pair. Grease is insoluble in water but soluble in the dry cleaner's solvent, so the solvent carries it out of the fabric. The guide lists stain extraction among its examples of mixtures science affecting daily life.",
      {});
  }
]), ["Look for a mixture being made, separated, or used on purpose.", "Water treatment and stain extraction are the guide's own examples."]);

E("s7-u3-lives-effects", 3, ["SC7.8.3"], 1, "var", varset([
  function () {
    return mcq("Smog hanging over a city is best described as which kind of effect of mixtures in our lives?",
      "An unintended one: exhaust gases and particles mix with air as a by-product of activities people value, not as a goal",
      ["An intended one: cities produce smog on purpose to mark their boundaries",
       "A positive one: smog shows the air is being cleaned",
       "No effect at all: smog is a pure substance, not a mixture"],
      "The guide asks students to notice that effects of mixture science can be intentional or unintentional. Smog is a mixture of exhaust gases and particles in air, produced as a side effect of driving and industry. Nobody aims to make it, which is what unintended means here; road salt's safety benefit, by contrast, is intended, while its corrosion is not.",
      {});
  }
]), ["Ask whether anyone meant for the effect to happen.", "Intended effects are goals; unintended effects are side effects."]);

/* ---------- SC7.8.4 Effects of salt on highways ---------- */
E("s7-u3-salt-positive", 3, ["SC7.8.4"], 1, "var", varset([
  function () {
    return mcq("Which is a positive, intended effect of spreading salt on highways in winter?",
      "Salt lowers the freezing point of water on the road, melting ice and giving tires traction, which reduces collisions",
      ["Salt makes roadside plants grow faster in spring",
       "Salt prevents cars from rusting",
       "Salt cleans the drinking water in nearby wells"],
      "The intended benefit is safety: dissolved salt depresses water's freezing point, so ice melts (down to salt's practical limit of -9 °C) and snow does not bond to the pavement, keeping roads passable and reducing skidding and collisions. The other options name effects salt does not have; its real side effects run the other way.",
      {});
  }
]), ["The intended effect is the safety effect.", "Freezing point down, traction up, collisions down."]);

E("s7-u3-salt-negative", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("Which list contains only negative, unintended effects of road salt, as the STSE module presents them?",
      "Salt water reaching wells and streams, roadside vegetation dying back, soil hardening, and vehicles and bridges rusting faster",
      ["Fewer collisions, passable roads, cheaper winter travel, and safer school bus routes",
       "Salt-tolerant plants moving in, which gardeners prefer",
       "Animals finding a needed mineral, with no other consequence"],
      "The module itemizes the harms: dissolved salt reaches surface and groundwater (drinking water and aquatic life suffer), soil hardens and loses fertility, roadside vegetation is damaged, wildlife is drawn to roadsides and into traffic, and salt dramatically speeds rusting of vehicles and damages concrete bridges. Even the animal item is double-edged in the module: the salt itself is not poison, but the collisions are the harm.",
      {});
  }
]), ["Sort by the module's own problem list, not by first impressions.", "Water, soil, vegetation, wildlife, corrosion: the harm list."]);

E("s7-u3-salt-classify-effects", 3, ["SC7.8.4"], 2, "var", varset([
  function () {
    return mcq("A town notices two results of its road salt use: emergency calls for winter collisions fall by a third, and the lilies in the ditch beside the highway die back every spring. How are the two results classified?",
      "The collision drop is a positive intended effect; the dying lilies are a negative unintended effect",
      ["Both are positive intended effects",
       "Both are negative unintended effects",
       "The collision drop is unintended; the lilies are intended"],
      "Effects are classified on two axes at once: positive or negative, and intended or unintended. Safer roads are the whole point of salting: positive and intended. The damaged roadside vegetation is a harm nobody aimed at: negative and unintended. Most real technologies carry both kinds, which is why the decision indicator asks for them separated out.",
      {});
  }
]), ["Two axes: good or bad, and meant or not meant.", "Safety is meant; ditch damage is not."]);

/* ---------- SC7.8.5 Better road deicing technologies ---------- */
E("s7-u3-deicer-compare", 3, ["SC7.8.5"], 2, "gen", function () {
  var cases = [
    { s: "a night when the temperature falls to -20 °C and the roads must be treated", key: "Calcium chloride, because it keeps working down to about -29 °C while sodium chloride stops being effective below about -9 °C", d: ["Sodium chloride, because it is the cheapest and most familiar", "Ammonium sulfate, because it also fertilizes the roadside", "Potassium acetate, because it is biodegradable"] },
    { s: "a road running beside a reservoir that supplies a town's drinking water", key: "Potassium acetate where budgets allow, because it is biodegradable, used with sand for traction", d: ["Extra sodium chloride, applied early and often", "Calcium chloride at double the usual rate", "Ammonium sulfate, because it is also a fertilizer"] },
    { s: "a highway department that needs ice melted as fast as possible during a storm", key: "Calcium chloride or magnesium chloride, because both melt ice faster than sodium chloride", d: ["Sodium chloride alone, because nothing melts ice faster", "Ammonium sulfate, because it is the fastest melter in the table", "No chemical at all, because chemicals only prevent ice, never melt it"] }
  ];
  var c = pick(cases);
  return mcq("Using the de-icing chemicals table from the road salt module, which choice fits this situation best: " + c.s + "?",
    c.key, c.d,
    "The table's numbers decide. Sodium chloride's practical limit is about -9 °C; calcium chloride works to about -29 °C and melts faster, as does magnesium chloride (to about -15 °C). Potassium acetate is the biodegradable option near sensitive water, though it is corrosive and costly. Ammonium sulfate's fertilizer bonus does not make it a strong melter, and it damages concrete.",
    {});
}, ["Read the condition first, then the table's temperatures and disadvantages.", "Below -9 °C, plain salt is out of its range."]);

E("s7-u3-deicing-improve", 3, ["SC7.8.5"], 1, "var", varset([
  function () {
    return mcq("Which practice is an improvement in de-icing that came from understanding solutions, as the module presents it?",
      "Anti-icing: using Road Weather Information Systems to apply salt before snow bonds to the road, forming a brine layer that plows clear easily, so less salt is needed overall",
      ["Applying twice as much salt after every storm, just in case",
       "Mixing all five de-icing chemicals together so one of them works",
       "Salting only after accidents are reported on a road"],
      "The improvement is timing informed by science and data. Salt spread at a storm's start prevents bonding and creates a brine that clears easily; pre-wetting helps it stick and start working; and this province's Road Weather Information Systems tell crews when and where treatment will pay. The result the module stresses: the same safety with less salt and less harm.",
      {});
  }
]), ["The improvement is when and how, not just how much.", "Before the bond forms beats after: anti-icing, pre-wetting, weather data."]);

E("s7-u3-salt-science", 3, ["SC7.8.5"], 3, "var", varset([
  function () {
    return mcq("Freezing point depression depends on the number of particles a substance dissolves into, not on the type of particle. Sodium chloride dissolves into 2 particles per unit; calcium chloride into 3. What does this predict, and does the module's table agree?",
      "Calcium chloride should lower water's freezing point more than sodium chloride, and it does: its practical limit is about -29 °C against salt's -9 °C",
      ["Sodium chloride should work to the lower temperature, because it is the more common chemical",
       "Both should stop working at the same temperature, because particle counts do not matter",
       "Calcium chloride should work better only in powder form, not as a solution"],
      "More dissolved particles per unit means a larger freezing point depression. Calcium chloride's three particles beat sodium chloride's two, which is exactly why the table gives calcium chloride the far lower working temperature. This particle-count understanding is what let engineers choose and improve de-icing chemicals on evidence rather than habit.",
      {});
  }
]), ["The property is a particle count, not a particle type.", "Three particles per unit depress the freezing point more than two."]);

/* ---------- SC7.8.6 The road salt decision ---------- */
E("s7-u3-salt-adv", 3, ["SC7.8.6"], 2, "var", varset([
  function () {
    return mcq("Which statement fairly states the strongest point on the 'keep road salt as the main de-icer' side of the decision?",
      "Salt is inexpensive, available in huge quantities, familiar to every road crew, and proven to cut winter collisions; no alternative matches all four at once",
      ["Salt has no negative effects, so there is nothing to weigh",
       "Salt is the only substance that can melt ice at any temperature",
       "Alternatives have never been tested anywhere"],
      "A fair decision starts by stating each side at its strongest. Salt's case is practical: cheap, abundant, understood, and effective for safety in the temperature range where most winter driving happens. Its limits are also real (it fails below about -9 °C and carries the harms the module lists), which is what the other side weighs.",
      {});
  },
  function () {
    return mcq("Which statement fairly states the strongest point on the 'reduce road salt use' side of the decision?",
      "Salt's harms accumulate in wells, streams, soil and vehicles year after year, and better timing, pre-wetting and weather information can hold much of the safety benefit with considerably less salt",
      ["Salt never improves safety, so nothing is lost by stopping",
       "Roads were safer before salt was invented",
       "Every alternative is cheaper than salt in every situation"],
      "The reduction case is not that salt does nothing; it is that its environmental and corrosion costs are cumulative, while modern practice (anti-icing, RWIS timing, pre-wetting, faster chemicals for the coldest nights) can keep most of the safety with less salt spread. Stating the other side fairly means granting salt its real safety record.",
      {});
  }
]), ["State each side at its strongest; that is what a fair decision needs.", "Cheap and proven against cumulative harm and smarter use."]);

E("s7-u3-cr-salt-decision", 3, ["SC7.8.6"], 3, "var", varset([
  function () {
    return textq("A town council must decide whether to keep road salt as its main de-icing chemical. Make a recommendation for the council and defend it, taking into account the environmental, social and economic advantages and disadvantages of road salt and its alternatives. (3 marks)",
      ["recommendation stated", "environmental effects weighed", "social and economic effects weighed"],
      "<b>Model answer:</b> Recommendation: keep road salt as the main de-icer, but cut the amount through anti-icing practice. Social advantages: salt is proven to reduce winter collisions and keep roads, school routes and emergency access open, which is the council's first duty. Economic advantages: salt is the cheapest de-icer per tonne and is available in the quantities a town needs; the alternatives cost more and some (potassium acetate) far more. Environmental disadvantages: salt reaches wells and streams, hardens soil, damages roadside vegetation and rusts vehicles and bridges, and these harms accumulate. The recommendation answers them directly: Road Weather Information Systems timing, pre-wetting and early application hold the safety benefit with less salt, and calcium chloride covers the nights below salt's -9 °C limit. A recommendation to phase salt out could also earn full marks if it honestly carried the safety and cost consequences and named how they would be met.<br><br><b>Marking points:</b> 1 mark for a clear recommendation; 1 mark for environmental advantages or disadvantages accurately used; 1 mark for social and economic considerations accurately used. Either recommendation can earn full marks; a one-sided answer that ignores a whole category cannot earn the third mark.",
      {});
  }
]), ["Recommend, then weigh: environment, society, cost.", "A decision that ignores a whole category is not yet informed."]);

/* ---------- SC7.9.1 Hypothesis from background or pattern ---------- */
E("s7-u3-hypothesis-pattern", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 8-1C, a class observed that salt dissolved in water but not in oil, and flour dissolved in neither. Which hypothesis does this observed pattern best support for a follow-up test?",
      "Whether a solute dissolves depends on the particular solute and solvent pairing, so a new solute should be tested in both solvents before predicting",
      ["All solutes dissolve in water eventually if stirred long enough",
       "Oil dissolves nothing at all, in any amount",
       "Flour is not a real solute because it is a food"],
      "A hypothesis grows out of the pattern actually observed. The pattern here is pairing-dependent: the same solute behaved differently in two solvents, and one solute dissolved in neither. The follow-up hypothesis stays inside that pattern. The other options overclaim beyond the observations (flour never dissolved, and oil was tested with only two solutes).",
      {});
  }
]), ["Build the hypothesis out of what was actually observed, no further.", "Overclaiming past the data is the flaw to watch for."]);

E("s7-u3-hypothesis-form", 3, ["SC7.9.1"], 1, "var", varset([
  function () {
    return mcq("Which statement is a testable hypothesis?",
      "More sugar will dissolve in hot water than in cold water, because temperature generally raises a solid's solubility",
      ["Dissolving is a fascinating process found everywhere in nature",
       "Sugar will do something surprising in water",
       "Water is the best solvent for everything"],
      "A testable hypothesis makes a prediction an experiment can judge, with a reason attached: here, a comparison (more in hot than cold) and the general rule behind it. A topic sentence, a prediction too vague to test, and an absolute claim no single test could settle all fail the form.",
      {});
  }
]), ["Prediction plus reason, in a form an experiment can judge.", "Vague and absolute statements cannot be tested."]);

E("s7-u3-hypothesis-background", 3, ["SC7.9.1"], 2, "var", varset([
  function () {
    return mcq("A student notices that sugar vanishes quickly in hot tea but sits in grains in iced tea. She wants to investigate solubility and temperature. Which is the best statement of her hypothesis?",
      "The warmer the water, the more sugar will dissolve in it, up to its saturation point",
      ["Temperature and solubility are related somehow",
       "Hot tea tastes sweeter than iced tea",
       "Sugar always dissolves completely in any drink"],
      "Her background observation is a pattern (fast in hot, slow and incomplete in cold), and the hypothesis converts it into a measurable prediction about amount dissolved against temperature. The taste statement is about perception, the vague statement predicts nothing measurable, and the absolute statement is already falsified by her own iced tea.",
      {});
  }
]), ["Convert the noticed pattern into a measurable prediction.", "Amount dissolved against temperature is the measurable form."]);

/* ---------- SC7.9.2 Identify and delimit questions ---------- */
E("s7-u3-delimit", 3, ["SC7.9.2"], 1, "var", varset([
  function () {
    return mcq("A group wants to study 'what affects dissolving?' Which narrowing turns it into one investigable question?",
      "How does the temperature of water affect the amount of salt that dissolves in 100 mL of it?",
      ["What are all the factors that affect every solute in every solvent?",
       "Why is dissolving important in everyday life?",
       "How do temperature, stirring, particle size and solvent type all affect dissolving at once?"],
      "Delimiting means cutting a broad topic down to one question with one manipulated variable and a measurable outcome: here, temperature against amount dissolved in a fixed volume. The other options stay broad, ask for importance rather than data, or change everything at once so no cause could be identified.",
      {});
  }
]), ["One question, one changed variable, one measurable outcome.", "Changing everything at once identifies nothing."]);

E("s7-u3-delimit-plan", 3, ["SC7.9.2"], 3, "var", varset([
  function () {
    return mcq("A group's question is: 'How does water temperature affect how much sugar dissolves?' Their plan measures the dissolving time for one spoonful of sugar at three temperatures, stirring each cup a different number of times 'to help it along.' What is wrong with the plan against its own question?",
      "The plan measures time, not amount, and lets stirring vary, so it cannot answer a question about how much dissolves",
      ["Nothing; any plan with three temperatures answers the question",
       "The plan uses too many temperatures; two would always be better",
       "The plan should have used salt instead of sugar"],
      "A delimited question dictates its data. This question asks about amount, so the plan must measure the amount dissolved at saturation at each temperature, with stirring (and volume, and sugar type) held the same. Measuring a different variable with a second variable left loose means the results cannot speak to the question, however carefully they are recorded.",
      {});
  }
]), ["Hold the plan against its own question: does it measure what the question asks?", "Amount asked, amount must be measured; every other factor held."]);

/* ---------- SC7.9.3 Line of best fit; interpolate and extrapolate ---------- */
E("s7-u3-best-fit", 3, ["SC7.9.3"], 1, "var", varset([
  function () {
    return mcq("What is a line of best fit on a solubility graph?",
      "A straight line drawn through the pattern of the points so it follows the overall trend, with points scattered on either side of it",
      ["A line connecting every point in order, dot to dot",
       "A line drawn from the first point straight to the last point, ignoring the rest",
       "The line a graph must have before any data are plotted"],
      "The line of best fit represents the trend the data show, passing as close as possible to all the points without necessarily touching each one; points scatter around it because measurements vary. It is the line used for reading off values between and beyond the measured points. Dot-to-dot lines, which the Plateau Problem also rejected, follow noise instead of trend.",
      {});
  }
]), ["Trend, not dot-to-dot.", "The line stands for the pattern; points scatter around it."]);

E("s7-u3-interpolate", 3, ["SC7.9.3"], 2, "gen", function () {
  var series = [
    { name: "Substance K", color: "#b3541e", pts: [[0, 10], [20, 27], [40, 44], [60, 61], [80, 78]] },
    { name: "Substance S", color: "#2e6f8e", pts: [[0, 36], [20, 37], [40, 38], [60, 39], [80, 40]] }
  ];
  var cases = [
    { ask: "Substance K", temp: 50, key: "About 52 g per 100 mL", d: ["About 38 g per 100 mL", "About 44 g per 100 mL", "About 61 g per 100 mL"] },
    { ask: "Substance S", temp: 30, key: "About 38 g per 100 mL", d: ["About 27 g per 100 mL", "About 44 g per 100 mL", "About 52 g per 100 mL"] }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows solubility data for two solutes, with lines of best fit. Using the line of best fit, estimate the solubility of " + c.ask + " at " + c.temp + " °C, a temperature between the measured points.",
    c.key, c.d,
    "Reading a value between measured points from the line of best fit is interpolation. For " + c.ask + " at " + c.temp + " °C, go up from " + c.temp + " on the temperature axis to that solute's line, then across to the solubility axis: " + c.key.toLowerCase() + ". The distractors come from reading the other solute's line or reading a plotted point instead of the line.",
    {});
  q.figure = s7SolubilitySVG(series, 100);
  return q;
}, ["Go up from the temperature to the right solute's line, then across.", "Between measured points is interpolation; use the line, not a nearby point."]);

E("s7-u3-extrapolate", 3, ["SC7.9.3"], 3, "gen", function () {
  var series = [
    { name: "Substance K", color: "#b3541e", pts: [[0, 10], [20, 27], [40, 44], [60, 61], [80, 78]] },
    { name: "Substance S", color: "#2e6f8e", pts: [[0, 36], [20, 37], [40, 38], [60, 39], [80, 40]] }
  ];
  var cases = [
    { ask: "Substance K", temp: 100, key: "About 95 g per 100 mL", d: ["About 78 g per 100 mL", "About 86 g per 100 mL", "About 110 g per 100 mL"] },
    { ask: "Substance S", temp: 100, key: "About 41 g per 100 mL", d: ["About 38 g per 100 mL", "About 52 g per 100 mL", "About 78 g per 100 mL"] }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows solubility data for two solutes, measured up to 80 °C, with lines of best fit. Predict the solubility of " + c.ask + " at " + c.temp + " °C by extending its line of best fit.",
    c.key, c.d,
    "Extending the line of best fit beyond the measured range and reading off a value is extrapolation, the move Core Lab 8-2A asks for at 90 °C. Extending " + c.ask + "'s line to " + c.temp + " °C gives " + c.key.toLowerCase() + ". It is a prediction, not a measurement: it assumes the trend continues, which is why extrapolated values are stated as estimates.",
    {});
  q.figure = s7SolubilitySVG(series, 100);
  return q;
}, ["Extend the line past the last point, then read across.", "Beyond the data is extrapolation: a prediction, stated as an estimate."]);

E("s7-u3-cr-best-fit", 3, ["SC7.9.3"], 3, "var", varset([
  function () {
    var q = textq("The graph shows a class's solubility results for Substance K. (a) Describe the trend the line of best fit shows. (b) Use the line to estimate the solubility at 30 °C. (c) Predict the solubility at 90 °C and state what kind of estimate that is. (3 marks)",
      ["solubility increases with temperature", "about 36 g at 30", "about 87 g at 90, extrapolation"],
      "<b>Model answer:</b> (a) As temperature increases, the solubility of Substance K increases steadily; the line of best fit rises in a straight, fairly steep pattern. (b) Reading from the line at 30 °C gives about 36 g per 100 mL of water (accept about 34 to 38 g); this is interpolation, since 30 °C lies between measured points. (c) Extending the line to 90 °C gives about 87 g per 100 mL (accept about 84 to 90 g); this is extrapolation, a prediction beyond the measured range that assumes the trend continues.<br><br><b>Marking points:</b> 1 mark for the trend described (solubility rises with temperature); 1 mark for an interpolated value in range at 30 °C; 1 mark for an extrapolated value in range at 90 °C, identified as a prediction beyond the data.",
      {});
    q.figure = s7SolubilitySVG([
      { name: "Substance K", color: "#b3541e", pts: [[0, 12], [20, 25], [40, 46], [60, 59], [80, 80]] },
      { name: "Substance S", color: "#2e6f8e", pts: [[0, 35], [20, 37], [40, 36], [60, 38], [80, 39]] }
    ], 100);
    return q;
  }
]), ["Trend first, then read the line twice: once inside the data, once beyond it.", "Inside is interpolation; beyond is extrapolation, and it is a prediction."]);

/* ---------- SC7.9.4 Testable hypothesis, temperature and solubility ---------- */
E("s7-u3-hypothesis-temp", 3, ["SC7.9.4"], 1, "var", varset([
  function () {
    return mcq("Core Lab 8-2A asks how temperature affects the solubility of a solid in water. Which is its testable hypothesis in proper form?",
      "As the temperature of the water increases, the amount of solid that dissolves in it will increase",
      ["Temperature will affect solubility in some way",
       "Solubility is affected by many factors, including temperature",
       "Hot water is better than cold water"],
      "The hypothesis predicts a direction (increase with increase) for the exact relationship the lab measures, so the data can support or refute it. 'In some way' predicts nothing; the factor list is background, not a prediction; 'better' is a value word, not a measurement.",
      {});
  }
]), ["A direction for the exact relationship being measured.", "Increase with increase: data can judge that."]);

E("s7-u3-variables-solubility", 3, ["SC7.9.4"], 2, "var", varset([
  function () {
    return mcq("In a group's temperature-solubility study, they heat 100 mL of water to several temperatures and add measured spoonfuls of the same solute until no more dissolves. Which variable naming is correct?",
      "Temperature is the manipulated variable; the amount of solute dissolved is the responding variable; water volume and solute type are controlled",
      ["Amount dissolved is the manipulated variable; temperature is the responding variable",
       "Water volume is the responding variable; stirring is the manipulated variable",
       "Temperature and amount dissolved are both controlled variables"],
      "The group chooses the temperatures (manipulated), measures how much dissolves at each (responding), and holds the water volume and the solute the same so the comparison is fair (controlled). Naming them correctly is what makes the study a test of the hypothesis rather than a demonstration.",
      {});
  }
]), ["What they set, what they measure, what they hold.", "Temperature set; amount measured; volume and solute held."]);

/* ---------- SC7.9.5 Carry out, controlling variables (CORE) ---------- */
// CORE residue: the bank covers designing the controls and judging
// flawed runs. The residue is the carrying out itself: measuring,
// heating and recording the solubility study in the laboratory.
E("s7-u3-controls", 3, ["SC7.9.5"], 1, "var", varset([
  function () {
    return mcq("Which set of controls belongs in a fair temperature-solubility study?",
      "The same volume of water, the same solute, the same spoon for measuring additions, and the same stirring routine at every temperature",
      ["A different solute at each temperature, to widen the study",
       "Whatever water volume is convenient at each temperature",
       "No stirring at the higher temperatures, because heat does the work"],
      "Only temperature may change between runs. Volume, solute, measuring tool and stirring all affect how much dissolves or how fast, so each must be held the same; otherwise a difference in the results could belong to any of them instead of to temperature.",
      {});
  }
]), ["Only temperature changes; everything else that could matter is held.", "Volume, solute, spoon, stirring: the control list."]);

E("s7-u3-controls-judge", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return mcq("A group reports: 'At 20 °C, 35 g dissolved in our beaker; at 60 °C, 52 g dissolved, so temperature increased the solubility.' Their notebook shows the 20 °C run used 100 mL of water and the 60 °C run used 150 mL. What should be concluded?",
      "Nothing yet: the larger volume at 60 °C would dissolve more solute on its own, so temperature and volume are confounded and the runs must be redone at one volume",
      ["The conclusion stands, because more dissolved at the higher temperature",
       "The conclusion is wrong; temperature must actually decrease solubility",
       "The group should average the two volumes and keep the conclusion"],
      "A fair test changes one variable. With volume differing alongside temperature, the extra dissolved solute could be the volume's doing, the temperature's, or both; the data cannot separate them. The fix is procedural, not mathematical: rerun both temperatures at the same volume.",
      {});
  }
]), ["Two variables changed; the conclusion can belong to either.", "Confounded data are redone, not averaged."]);

E("s7-u3-cr-design-solubility", 3, ["SC7.9.5"], 3, "var", varset([
  function () {
    return textq("Design a study to answer this question: how does the temperature of water affect the amount of sugar that will dissolve in it? State your hypothesis, the variables you will change, measure and control, and the procedure you will follow. This design question is for practice and teacher-picked sets; it does not appear in composed unit tests. (4 marks)",
      ["hypothesis: more sugar dissolves as temperature increases", "same volume of water at each temperature", "measure mass dissolved until saturation", "controls: same sugar, same stirring"],
      "<b>Model answer:</b> Hypothesis: as the temperature of the water increases, the amount of sugar that dissolves in it will increase. Changed variable: the water temperature (for example 20, 40, 60 and 80 °C). Measured variable: the mass of sugar dissolved when the solution reaches saturation at each temperature (no more dissolves and a trace remains undissolved). Controlled variables: the same volume of water (100 mL) in each run, the same sugar, the same stirring routine, the same spoon and balance. Procedure: measure 100 mL of water, bring it to the first temperature and record it, add sugar a measured spoonful at a time, stirring after each, until no more dissolves; record the total mass added; repeat at each temperature, and repeat the whole study once to check the results.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis with a direction; 1 mark for temperature as the changed variable and dissolved amount as the measured variable; 1 mark for at least three controls (volume, solute, stirring, equipment); 1 mark for a workable saturation procedure (measured additions until no more dissolves, at each temperature).",
      {});
  }
]), ["Hypothesis, variables, controls, and a saturation procedure.", "Measure what dissolves at each temperature, with everything else held."]);

/* ---------- SC7.9.6 Carry out separation procedures (CORE) ---------- */
// CORE residue: the bank covers ordering, judging and troubleshooting
// the procedures. The residue is performing them with the apparatus
// in hand.
E("s7-u3-procedure-order", 3, ["SC7.9.6"], 2, "var", varset([
  function () {
    return mcq("In Core Lab 9-1C, a group separates salt water first by evaporation and then by distillation. Which sequence detail matters most for safety and success?",
      "The flask is secured with a clamp and ring stand before heating, so the hot solution cannot spill if the apparatus is knocked",
      ["The group tastes the residue to check that it is salt",
       "The evaporating dish is filled to the brim to save time",
       "The condenser is connected after the solution reaches a full boil"],
      "The guide's own safety note for this laboratory is the clamp and ring stand: hot salt solution spilled from an unsecured flask is the laboratory's main hazard. Tasting is never a laboratory test, brim-full dishes boil over, and the condenser must be in place before vapour is produced or the solvent is lost.",
      {});
  }
]), ["Secure the apparatus before the heat goes on.", "The guide's safety note is the clamp and ring stand."]);

E("s7-u3-procedure-problem", 3, ["SC7.9.6"], 1, "var", varset([
  function () {
    return mcq("Mid-procedure, a group filters a muddy sugar solution. The filtrate is clear but still sweet, and the group asks for a finer filter to 'get the sugar out.' What is the correct next step?",
      "Explain that no filter can remove a dissolved substance, and separate the sugar by evaporation or distillation instead",
      ["Stack three filters together to make a finer barrier",
       "Use a microscope to pick the sugar particles out",
       "Add more water so the sugar spreads thinner and passes"],
      "Filtration has already done all it can: it removed the undissolved mud. The sugar is dissolved at the particle level and passes any filter. The procedure must switch properties, from particle size to boiling point: evaporate the water away, or distill to recover it as well.",
      {});
  }
]), ["A dissolved substance defeats every filter.", "Switch properties: from size to boiling point."]);

/* ---------- SC7.9.7 Tools safely and accurately (CORE) ---------- */
// CORE residue: the bank covers recognizing safe set-up and accurate
// measurement choices. The residue is the handling itself.
E("s7-u3-tools-safety", 3, ["SC7.9.7"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe one when evaporating salt water on a hot plate?",
      "Use a shallow evaporating dish filled no more than half, keep the hot plate's cord clear of the bench edge, and treat the dish as hot until it has cooled",
      ["Fill the dish to the top so the run finishes sooner",
       "Carry the hot dish across the room to cool by a window",
       "Watch the dish from directly above at close range as it boils dry"],
      "Hot solution, glassware and electricity meet in this procedure. A half-filled dish cannot boil over, a managed cord cannot pull the plate down, and heated glassware is treated as hot. Carrying hot dishes and leaning over boiling solution are the accident patterns.",
      {});
  }
]), ["Half full, cord managed, everything heated treated as hot.", "Never carry a hot dish across the room."]);

E("s7-u3-tools-accurate", 3, ["SC7.9.7"], 2, "var", varset([
  function () {
    return mcq("A group's solubility results scatter badly between repeats. Their notebook shows water measured 'to about the line' from above, and solute added in heaped spoonfuls. Which fix most improves their accuracy?",
      "Read the graduated cylinder at eye level at the bottom of the meniscus, and measure the solute by mass on the balance for each addition",
      ["Add the solute faster so the temperature does not change",
       "Use a larger beaker so the numbers are bigger",
       "Stir harder so the readings settle"],
      "Scattered results usually trace to scattered measurement. Eye-level meniscus reading removes the parallax error, and massing each addition replaces heaped spoonfuls, whose amounts vary, with measured quantities. Speed, beaker size and stirring force do not fix either error.",
      {});
  }
]), ["Scatter in results usually means scatter in measuring.", "Eye level for volume; the balance for mass."]);

/* ---------- SC7.9.8 New questions from the activities ---------- */
E("s7-u3-new-questions", 3, ["SC7.9.8"], 1, "var", varset([
  function () {
    return mcq("After the separation activities, which new question genuinely arises from the results students obtained?",
      "Why can one mixture be separated with a filter while another mixture cannot?",
      ["What is the capital of the province?",
       "Who invented the filter, and in what year?",
       "Which group finished the activity first?"],
      "New questions grow out of results: filtration succeeded on sand and water and failed on sugar water, and that contrast demands an explanation, which is the guide's own example of a question arising from these activities. The other options are trivia or logistics, not questions the data raise.",
      {});
  }
]), ["A new question grows out of a result that needs explaining.", "The filter contrast is the guide's own example."]);

E("s7-u3-cr-new-question", 3, ["SC7.9.8"], 2, "var", varset([
  function () {
    return textq("A group tried to separate a sugar solution by filtration, and the sugar passed straight through the filter with the water. (a) State the new question this result raises. (b) Name the separation method the result points to, and say why it should work where filtration failed. (2 marks)",
      ["why did the dissolved sugar pass through", "evaporation or distillation", "dissolved particles too small; boiling point difference"],
      "<b>Model answer:</b> (a) New question: why does filtration separate some mixtures but not a solution, or equivalently, what property of a dissolved substance lets it pass through a filter? (b) The result points to evaporation (or distillation, to recover the water as well): the sugar's dissolved particles are far too small for any filter to catch, but sugar and water differ in boiling behaviour, so heating drives the water off as vapour and leaves the sugar behind; distillation adds condensation to collect the water too.<br><br><b>Marking points:</b> 1 mark for a new question that grows out of the failed result (about dissolved particles, particle size, or the limits of filtration); 1 mark for evaporation or distillation named, with the boiling point reasoning.",
      {});
  }
]), ["The failure is the data: ask what it teaches.", "From size to boiling point: that is the method switch."]);

/* Practice-only entries: the design-an-investigation CR is excluded from
   composed unit tests by the composer's noCompose flag (v1.2.0). It stays
   available in practice draws and explicit teacher picks. */
var NO_COMPOSE_U3 = {
  "s7-u3-cr-design-solubility": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });
