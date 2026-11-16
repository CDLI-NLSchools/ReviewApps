// CRMARKS: s8-u2-cr-molasses=3
// CRMARKS: s8-u2-cr-layers=3
// CRMARKS: s8-u2-cr-density-block=3
// CRMARKS: s8-u2-cr-temp-situations=3
// CRMARKS: s8-u2-cr-raise-ship=3
// CRMARKS: s8-u2-cr-mass-weight=3
// CRMARKS: s8-u2-cr-piggyback=3
// CRMARKS: s8-u2-cr-pressure-crate=3
// CRMARKS: s8-u2-cr-cleaning-claim=4
// CRMARKS: s8-u2-cr-underlying=3
// CRMARKS: s8-u2-cr-car-lift=3
// CRMARKS: s8-u2-cr-design-viscosity=4
// CRMARKS: s8-u2-cr-data-infer=3
// CRMARKS: s8-u2-cr-displacement-calc=3
// Science 8 Unit 2 bank: Fluids (SC8.4.1 to SC8.6.10), built
// Nov 15, 2026 to the Fluids authoring spec. All entries are
// original, mined for type from the harvested teacher tests and
// worksheets, the MHR ExamView chapters 7 to 9 and the core
// laboratories, and rewritten throughout (mine-and-rewrite).
// Source defects recorded in the Fluids catalogue were dropped,
// not carried: the pressure item keyed in kilopascals for a
// pascal value, and the gas-viscosity item whose key the guide's
// liquid-focused treatment cannot carry.
// Guide discipline: viscosity factors are temperature,
// concentration and attraction between particles only; cohesion
// and adhesion situations are described, never keyed by those
// terms; Archimedes' principle is keyed as the weight of the
// fluid displaced.
// CORE residue: SC8.6.5 entries assess variable identification
// and investigation design; they do not assess carrying out the
// procedure. SC8.6.7 carries one entry on accurate instrument
// reading; handling is classroom assessment. SC8.6.8 entries
// assess the displacement method's steps, error judgement and
// calculation; the bench procedure itself is not assessed.
// Near-duplicate pair: SC8.6.3 (a first discrepancy in flow lab
// data) and SC8.6.9 (competing explanations for a density
// discrepancy) are recorded, not merged.

function s8n(v) {
  var s = (Math.round(v * 100) / 100).toString();
  return s;
}
function s8dis(key, cand) {
  var out = [];
  for (var i = 0; i < cand.length && out.length < 3; i++) {
    var cv = Math.round(cand[i] * 100) / 100;
    if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv);
  }
  return out;
}

/* ---------- SC8.4.1 Viscosity ---------- */

E("s8-u2-viscosity-def", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    return mcq("What is viscosity?",
      "A liquid's resistance to flow, caused by friction between its particles as they move past one another",
      ["A liquid's resistance to being compressed into a smaller volume",
       "The speed at which a liquid evaporates from an open container",
       "The force with which a liquid pushes up on objects placed in it"],
      "Viscosity is a measure of how much a liquid resists flowing. The resistance comes from friction between the liquid's particles: the greater the friction or rubbing between particles, the higher the viscosity and the more slowly the liquid flows.",
      {});
  }
]), ["Viscosity is about flowing. Which option is about flow and what resists it?", "Thick, slow liquids are the high-viscosity ones."]);

E("s8-u2-flow-ranking", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Four liquids are poured from identical funnels: water, cooking oil, shampoo and molasses. Which pours fastest?", k: "Water", w: ["Cooking oil", "Molasses", "Shampoo"] },
    { q: "Four liquids are timed flowing down a ramp: water, tomato juice, cooking oil and honey. Which has the highest viscosity?", k: "Honey", w: ["Cooking oil", "Tomato juice", "Water"] },
    { q: "A cook compares pancake syrup, milk, dish soap and water. Which has the lowest viscosity?", k: "Water", w: ["Dish soap", "Milk", "Pancake syrup"] },
    { q: "Which list orders the liquids from lowest to highest viscosity?", k: "Water, cooking oil, shampoo, molasses", w: ["Cooking oil, water, molasses, shampoo", "Molasses, shampoo, cooking oil, water", "Water, molasses, shampoo, cooking oil"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Liquids with low viscosity flow freely and fast; liquids with high viscosity flow slowly. Water is thin and fast, oils and shampoo are in between, and honey and molasses are thick and slow. Comparing familiar liquids is the everyday face of viscosity.",
    {});
}, ["Fast flow means low viscosity; slow and thick means high viscosity.", "Water is the thinnest liquid in every list here."]);

E("s8-u2-viscosity-use", 2, ["SC8.4.1"], 1, "gen", function () {
  var cases = [
    { q: "Why must motor oil have the proper viscosity to do its job?", k: "It has to flow well enough to coat moving engine parts and protect them, without being so thin that it fails to cling and lubricate", w: ["It has to evaporate quickly so the engine stays clean", "It has to freeze solid in winter to protect the engine block", "Its viscosity decides the colour of the exhaust"] },
    { q: "A painter complains that a paint is too viscous for the job. What is the problem?", k: "The paint is too thick to spread properly and smoothly", w: ["The paint dries before it can be brushed on", "The paint is too thin and runs down the wall", "The paint has lost its colour in the can"] },
    { q: "Peanut butter kept in the fridge is often too viscous to spread. What does that tell you about the peanut butter in the fridge?", k: "Its viscosity has increased, so it resists flowing and spreading", w: ["Its viscosity has decreased, so it pours off the knife", "Its particles have stopped attracting one another entirely", "Its concentration has dropped to nearly zero"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Many substances need the proper degree of viscosity to perform their intended function: motor oil must flow and cling as a lubricant, paint must spread properly, and peanut butter must spread on bread. Too viscous means too resistant to flow for the job.",
    {});
}, ["Match the complaint to what viscosity does: resistance to flow.", "Too viscous always means too thick and slow for its purpose."]);

E("s8-u2-flow-lab", 2, ["SC8.4.1"], 1, "var", varset([
  function () {
    var q = mcq("In Core Lab 7-2B, equal amounts of four liquids flow through the same funnel and are timed. The graph shows the results. Which liquid is the most viscous?",
      "Liquid D",
      ["Liquid A", "Liquid B", "Liquid C"],
      "Flow rate and viscosity run in opposite directions: the longer a liquid takes to flow, the more it resists flowing, so the longest bar, Liquid D, is the most viscous. Liquid A, with the shortest time, is the least viscous.",
      {});
    q.figure = s8HealthSVG([{ name: "Liquid A", value: 4 }, { name: "Liquid B", value: 9 }, { name: "Liquid C", value: 15 }, { name: "Liquid D", value: 26 }], "Flow time", "s", null);
    return q;
  }
]), ["In a flow test, time is the clue: slow flow, high viscosity.", "Find the longest flow time on the graph."]);

E("s8-u2-viscosity-compare", 2, ["SC8.4.1"], 2, "var", varset([
  function () {
    return mcq("Two liquids are described. Liquid P pours like thin cream and coats a spoon evenly. Liquid Q drips slowly off the spoon in a thick ribbon. Which comparison is correct?",
      "Liquid Q has the higher viscosity, because it flows more slowly and resists moving",
      ["Liquid P has the higher viscosity, because it coats the spoon evenly",
       "Both have the same viscosity, because both are liquids",
       "Viscosity cannot be compared without knowing their densities"],
      "Viscosity is compared by flow behaviour. Liquid Q flows slowly and thickly, so it resists flow more: higher viscosity. Liquid P flows readily: lower viscosity. Density is a different property and does not settle a viscosity comparison.",
      {});
  }
]), ["Compare how each liquid moves, nothing else.", "Slow and thick is the high-viscosity signature."]);

/* ---------- SC8.4.2 Factors that modify viscosity ---------- */

E("s8-u2-factors", 2, ["SC8.4.2"], 1, "gen", function () {
  var cases = [
    { q: "Honey kept in a cold pantry pours slowly, but the same honey warmed in a bowl of hot water pours easily. Which factor changed the honey's viscosity?", k: "Temperature", w: ["Concentration", "Strength of attraction added by stirring", "The size of the honey jar"] },
    { q: "A cook stirs extra flour into a sauce and it thickens noticeably. Which factor changed the sauce's viscosity?", k: "Concentration: more substance dissolved or mixed into a given volume", w: ["Temperature", "Strength of attraction between the spoon and the sauce", "The colour of the sauce"] },
    { q: "Droplets of rain cling to a clothesline instead of falling straight off, because the water particles attract the line's material. Which factor is at work in how the water behaves?", k: "The strength of attraction between particles", w: ["Concentration", "Temperature", "The volume of the raindrops"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide names three factors that modify a liquid's viscosity: temperature, concentration, and the strength of attraction between particles (within the liquid itself, and between the liquid and the surface it flows over). Each case here isolates one of the three.",
    {});
}, ["The guide's factor list has three entries. Which one did the case change?", "Warmed or cooled means temperature; more dissolved substance means concentration."]);

E("s8-u2-heating-honey", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return mcq("Using the particle theory, why does heating honey make it flow faster?",
      "Heated particles move faster and farther apart, so there is less friction between them and their attraction weakens, lowering the viscosity",
      ["Heated particles move slower and pack closer together, so the honey slides as one solid sheet",
       "Heating adds more particles to the honey, raising its concentration and lowering its viscosity",
       "Heating destroys the particles' attraction completely, so the honey becomes a gas"],
      "The particle theory explains it in three steps: particles are always in motion, heating gives them more energy so they move faster and farther apart, and with more space between them there is less friction and a weaker pull between particles. Less internal friction means lower viscosity, so warmed honey flows faster.",
      {});
  }
]), ["Work through the particles: energy, spacing, friction, then viscosity.", "Faster, farther apart, less friction: viscosity falls."]);

E("s8-u2-concentration", 2, ["SC8.4.2"], 3, "var", varset([
  function () {
    return mcq("A dairy lists skim milk, 1 percent milk, 2 percent milk, whole milk and cream in order of increasing fat concentration. A student predicts their viscosities will follow the same order. Is the prediction sound, and why?",
      "Yes: higher concentration means more particles in a given volume, which raises the friction between particles and so raises viscosity",
      ["Yes, but only because cream is a different colour from skim milk",
       "No: concentration affects only gases, never liquids",
       "No: higher concentration always lowers a liquid's viscosity"],
      "Concentration is the amount of substance in a given volume. More particles crowded into the same space means more rubbing and friction as the liquid flows, which is higher viscosity. The dairy's order of concentration is therefore also the expected order of viscosity, with cream the most viscous.",
      {});
  }
]), ["Concentration means particles per volume. More particles in the same space means what for friction?", "The prediction stands or falls on the friction link."]);

E("s8-u2-cr-molasses", 2, ["SC8.4.2"], 2, "var", varset([
  function () {
    return textq("People say a slow worker moves 'like cold molasses in winter.' Using the particle theory, explain the science inside that expression, and explain why molasses for pancakes is better stored in the cupboard than in the refrigerator. (3 marks)",
      ["cold particles move slower and stay closer, raising friction and viscosity", "cold molasses therefore flows very slowly", "cupboard storage keeps it warmer and less viscous for pouring"],
      "<b>Model answer:</b> Molasses is already a viscous liquid. When it is cold, its particles have little energy, move slowly and stay close together, so friction between the particles is high and the attraction between them holds strongly: its viscosity rises further and it barely flows, which is the picture the expression uses. In a refrigerator the molasses stays cold and highly viscous, so it pours and spreads badly on pancakes. Stored in the warmer cupboard, its particles move faster and farther apart, friction drops, and the molasses flows as intended.<br><br><b>Marking points:</b> 1 mark for the particle behaviour when cold (slower, closer, more friction). 1 mark for the link from that behaviour to higher viscosity and very slow flow. 1 mark for the storage conclusion drawn from the same reasoning.",
      {});
  }
]), ["One idea explains both halves: what cold does to particles.", "Cold, slow particles, high friction, high viscosity. Then apply it to the cupboard."]);

/* ---------- SC8.4.3 Mass, volume and density ---------- */

E("s8-u2-definitions", 2, ["SC8.4.3"], 1, "var", varset([
  function () {
    return mcq("Which set of definitions is correct?",
      "Mass is the amount of matter in an object, volume is the amount of space it takes up, and density is its mass per unit volume",
      ["Mass is the force of gravity on an object, volume is its weight, and density is its mass per unit volume",
       "Mass is the amount of space in an object, volume is the amount of matter, and density is its volume per unit mass",
       "Mass, volume and density are three names for the same property"],
      "The three quantities build on each other. Mass measures the amount of matter, volume measures the space taken up, and density combines them as the mass-to-volume ratio, the mass in each unit of volume.",
      {});
  }
]), ["Density is the ratio of the other two. Which two, in which order?", "Mass per unit volume: grams in each millilitre or cubic centimetre."]);

E("s8-u2-states-density", 2, ["SC8.4.3"], 1, "gen", function () {
  var cases = [
    { q: "The same substance is compared as a solid, a liquid and a gas. Using the particle theory, which statement about density is generally correct?", k: "The solid is generally the densest state, because its particles are packed closest together, and the gas is the least dense", w: ["The gas is generally the densest state, because its particles move fastest", "All three states have the same density, because the substance is the same", "The liquid is always the densest state, whatever the substance"] },
    { q: "A sealed syringe of air is pushed in, halving the air's volume while its mass stays the same. What happens to the air's density, and why?", k: "It doubles, because the same mass of particles is packed into half the space", w: ["It halves, because density falls whenever volume falls", "It stays the same, because the mass did not change", "It drops to zero, because gases have no density when compressed"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Density follows particle spacing. In a solid the particles are packed closest, in a liquid they sit a little farther apart, and in a gas they are far apart, so in general a substance's solid state is its densest and its gas state its least dense. Squeezing a gas into half the volume with the same mass doubles the crowding, and so doubles the density.",
    {});
}, ["Density is crowding: mass packed into space.", "Closer particles, higher density, for the same substance."]);

E("s8-u2-ratio-constant", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return mcq("A small aluminum sample has a mass of 27 g and a volume of 10 cm3. A much larger aluminum block has a volume of 100 cm3. What should the large block's mass be, and what principle does this show?",
      "270 g: the mass-to-volume ratio of a material is a constant value, so mass scales with volume",
      ["27 g: the mass of a material does not depend on how much of it there is",
       "54 g: mass doubles whenever volume increases at all",
       "2700 g: mass grows with the square of the volume"],
      "The small sample gives aluminum's density: 27 g / 10 cm3 = 2.7 g/cm3. Density is a constant ratio for a material, so the large block's mass is 2.7 x 100 = 270 g. A bigger piece has proportionally more mass, never the same mass and never a squared amount.",
      {});
  }
]), ["Find the ratio from the small sample first, then apply it to the large volume.", "Constant ratio means simple proportion."]);

E("s8-u2-cr-layers", 2, ["SC8.4.3"], 2, "var", varset([
  function () {
    return textq("A student carefully pours three liquids into one test tube: glycerol (density 1.26 g/mL), water (1.00 g/mL) and machine oil (0.90 g/mL). They settle into layers instead of mixing evenly. State the order of the layers from bottom to top and explain it using density and the particle theory. (3 marks)",
      ["glycerol on the bottom, water in the middle, oil on top", "denser liquids sink below less dense ones", "particle crowding explanation"],
      "<b>Model answer:</b> From bottom to top the order is glycerol, then water, then machine oil. Liquids that do not mix settle by density: the liquid whose particles pack the most mass into each millilitre sinks below the others. Glycerol, at 1.26 g/mL, has the most mass in each unit volume, so it takes the bottom; water, at 1.00 g/mL, settles above it; and machine oil, at 0.90 g/mL, with the least mass per unit volume, floats on top.<br><br><b>Marking points:</b> 1 mark for the correct order, bottom to top. 1 mark for the settling rule (greater density sinks). 1 mark for the particle or mass-per-volume explanation tied to the given values.",
      {});
  }
]), ["Sort the three densities first; the tube sorts itself the same way.", "Bottom layer is the greatest mass in each millilitre."]);

/* ---------- SC8.4.4 Density, quantitatively ---------- */

E("s8-u2-calc-density", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.0, 2.5, 4.0, 5.0]);
  var V = pick([20, 25, 40, 50, 80, 100]);
  var m = Math.round(D * V * 100) / 100;
  var unit = pick(["g/mL", "g/cm3"]);
  var dis = s8dis(D, [V / m, D * 2, D / 2, D + 1, m / (V + 10)]);
  return mcq("A sample of a substance has a mass of " + s8n(m) + " g and a volume of " + V + (unit === "g/mL" ? " mL" : " cm3") + ". What is its density?",
    s8n(D) + " " + unit,
    dis.map(function (d) { return s8n(d) + " " + unit; }),
    "Density is mass divided by volume: D = m/V = " + s8n(m) + " g / " + V + " = " + s8n(D) + " " + unit + ". The units carry the meaning: grams in each millilitre (or cubic centimetre) of the substance.",
    {});
}, ["Density = mass / volume. Divide, and keep the unit with the answer.", "Watch for the inverted division among the options."]);

E("s8-u2-calc-mass", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.2, 1.5, 2.5]);
  var V = pick([20, 40, 50, 100, 200]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(m, [m * 2, m / 2, D + V, m + 20, V / D]);
  return mcq("A liquid has a density of " + s8n(D) + " g/mL. What is the mass of " + V + " mL of this liquid?",
    s8n(m) + " g",
    dis.map(function (d) { return s8n(d) + " g"; }),
    "Rearrange the density formula: m = D x V = " + s8n(D) + " g/mL x " + V + " mL = " + s8n(m) + " g. Each millilitre carries " + s8n(D) + " g, and there are " + V + " of them.",
    {});
}, ["Mass = density x volume. Each millilitre contributes the density's worth of grams.", "Multiply, do not divide: the mass of 100 mL should exceed the density number."]);

E("s8-u2-calc-volume", 2, ["SC8.4.4"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 5.0]);
  var V = pick([20, 25, 40, 50, 80]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(V, [m * D, V * 2, V / 2, m - D, m / (D + 1)]);
  return mcq("A solid piece of metal has a mass of " + s8n(m) + " g and a density of " + s8n(D) + " g/cm3. What is its volume?",
    s8n(V) + " cm3",
    dis.map(function (d) { return s8n(d) + " cm3"; }),
    "Rearrange the density formula: V = m/D = " + s8n(m) + " g / " + s8n(D) + " g/cm3 = " + s8n(V) + " cm3. The volume counts how many density-sized units of mass the piece contains.",
    {});
}, ["Volume = mass / density.", "Check the size: a denser material packs the same mass into less volume."]);

E("s8-u2-identify-substance", 2, ["SC8.4.4"], 3, "var", varset([
  function () {
    var q = mcq("A student measures a liquid sample: mass 63 g, volume 50 mL. Using the density table, which substance is the sample?",
      "Glycerol",
      ["Ethyl alcohol", "Machine oil", "Seawater"],
      "First calculate: D = m/V = 63 g / 50 mL = 1.26 g/mL. Then match against the table: glycerol is listed at 1.26 g/mL. The table is used after the calculation, not instead of it.",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("A metal sample has a mass of 135 g and a volume of 50 cm3. Using the density table, which substance is the sample?",
      "Aluminum",
      ["Iron", "Lead", "Salt"],
      "D = m/V = 135 g / 50 cm3 = 2.70 g/cm3. The table lists aluminum at 2.70 g/cm3, well below iron (7.87) and lead (11.34).",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  },
  function () {
    var q = mcq("A liquid sample has a mass of 39.5 g and a volume of 50 mL. Using the density table, which substance is the sample?",
      "Ethyl alcohol",
      ["Machine oil", "Seawater", "Water"],
      "D = m/V = 39.5 g / 50 mL = 0.79 g/mL. The table lists ethyl alcohol at 0.79 g/mL, less dense than water, as an alcohol should be.",
      {});
    q.figure = s8DensityTableFigure();
    return q;
  }
]), ["Two steps: calculate the density, then find it in the table.", "The table holds the answers, but only after your division."]);

E("s8-u2-displacement-calc", 2, ["SC8.4.4"], 2, "gen", function () {
  var Vi = pick([50, 100, 200]);
  var rise = pick([12, 15, 20, 25, 30]);
  var D = pick([1.2, 1.5, 2.0, 2.5, 3.0]);
  var m = Math.round(D * rise * 100) / 100;
  var dis = s8dis(D, [m / Vi, m / (Vi + rise), D * 2, D / 2]);
  return mcq("A graduated cylinder holds " + Vi + " mL of water. A stone is lowered in and the level rises to " + (Vi + rise) + " mL. The stone's mass is " + s8n(m) + " g. What is the stone's density?",
    s8n(D) + " g/cm3",
    dis.map(function (d) { return s8n(d) + " g/cm3"; }),
    "The stone's volume is the displaced water: " + (Vi + rise) + " mL - " + Vi + " mL = " + rise + " mL, and 1 mL = 1 cm3. Then D = m/V = " + s8n(m) + " g / " + rise + " cm3 = " + s8n(D) + " g/cm3. The starting level is not the stone's volume; the rise is.",
    {});
}, ["The rise in level is the volume. Subtract before you divide.", "Displacement gives volume first; density comes second."]);

E("s8-u2-cr-density-block", 2, ["SC8.4.4"], 2, "var", varset([
  function () {
    return textq("A rectangular block measures 20 cm by 10 cm by 5 cm and has a mass of 2700 g. (a) Calculate the block's volume. (b) Calculate its density. (c) State, with a reason, whether the block would float or sink in water (density 1.00 g/cm3). (3 marks)",
      ["the volume is 1000 cm3 from the three dimensions multiplied", "the density is 2.7 g/cm3 from mass divided by volume", "it sinks because its density is greater than the density of water"],
      "<b>Model answer:</b> (a) V = l x w x h = 20 cm x 10 cm x 5 cm = 1000 cm3. (b) D = m/V = 2700 g / 1000 cm3 = 2.7 g/cm3. (c) The block would sink: its density, 2.7 g/cm3, is greater than the density of water, 1.00 g/cm3, so its weight overcomes the buoyant force the water can provide.<br><br><b>Marking points:</b> 1 mark for the volume from the dimensions. 1 mark for the density calculation with units. 1 mark for the sink judgement tied to the density comparison.",
      {});
  }
]), ["Three steps in order: dimensions to volume, mass and volume to density, density to a float or sink call.", "Water's density, 1.00, is the comparison standard for part (c)."]);

/* ---------- SC8.4.5 Temperature and density ---------- */

E("s8-u2-temp-density", 2, ["SC8.4.5"], 1, "gen", function () {
  var cases = [
    { q: "An air-filled balloon is measured, placed in a freezer, and measured again: its circumference is smaller. What happened to the density of the air inside?", k: "It increased, because the same mass of air now occupies a smaller volume", w: ["It decreased, because cold air always weighs less", "It stayed the same, because the mass did not change", "It dropped to zero, because the air contracted"] },
    { q: "The alcohol in a thermometer rises up the tube on a warm day. Which statement explains this using volume and density?", k: "The warmed alcohol expands, taking more volume, so its density falls and it rises in the tube", w: ["The warmed alcohol contracts, so its density rises and pushes it up the tube", "The glass tube shrinks in the heat, squeezing the alcohol upward", "The alcohol's mass increases as it warms, forcing it upward"] },
    { q: "Power lines are strung loosely because they sag more in summer than in winter. What does the sagging show?", k: "The warmed metal expands, its volume increases, and its density decreases", w: ["The warmed metal contracts and grows denser", "The lines gain mass in the summer heat", "Gravity grows stronger in summer"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Temperature changes density through volume. Warming a substance makes its particles spread out: the same mass occupies more volume, so density falls. Cooling reverses it: volume shrinks and density rises. The balloon, the thermometer and the power lines are the guide's everyday demonstrations of the same relationship.",
    {});
}, ["Hold the mass fixed and follow the volume: density moves the opposite way.", "Expand means less dense; contract means more dense."]);

E("s8-u2-ice-exception", 2, ["SC8.4.5"], 2, "var", varset([
  function () {
    return mcq("Most substances are denser as solids than as liquids, but ice floats on water. Which statement explains the exception?",
      "When water freezes it expands because of its molecular structure, so ice takes more volume for the same mass and its density drops below liquid water's",
      ["Ice floats because it traps air bubbles, and frozen water without bubbles would sink",
       "Ice is colder than water, and cold objects always float",
       "Water is the exception because its liquid state is denser than every other liquid"],
      "Water breaks the general rule. As it freezes, its molecules arrange into a structure with more space between them: the volume increases while the mass stays the same, so the density decreases. Ice, at about 0.92 g/cm3 in round terms used in class, is less dense than liquid water and floats. The guide names water as the exception explicitly.",
      {});
  }
]), ["The exception is about spacing: freezing water spreads its molecules out.", "More volume, same mass, lower density: floating follows."]);

E("s8-u2-hot-air", 2, ["SC8.4.5"], 1, "var", varset([
  function () {
    return mcq("Why does the air inside a hot air balloon become less dense when it is heated?",
      "The heated particles move faster and spread farther apart, so each unit of volume holds less mass",
      ["Heating removes particles from the balloon through the opening",
       "The heated particles shrink, leaving empty gaps with no mass",
       "The fabric of the balloon stretches and adds volume with no change inside"],
      "Heating gives the air's particles more energy; they move faster and spread farther apart. The balloon's volume then holds fewer particles, less mass in each unit of volume, which is lower density. That lower density is what lets the balloon's air be buoyed up by the cooler, denser air outside.",
      {});
  }
]), ["Same story as every temperature case: spacing decides density.", "Spread out particles mean less mass in each unit of volume."]);

E("s8-u2-cr-temp-situations", 2, ["SC8.4.5"], 3, "var", varset([
  function () {
    return textq("Use the relationship between temperature, volume and density to explain both of these situations: (a) vinyl siding installed in cold weather must be fitted with small spaces between the pieces; (b) drivers are warned not to over-inflate car tires in hot summer months. (3 marks)",
      ["siding expands as it warms, so gaps leave room", "heated air in tires expands and pressure rises", "both follow from particles spreading as temperature rises"],
      "<b>Model answer:</b> Both situations come from the same behaviour: as a substance warms, its particles move faster and spread farther apart, so its volume increases and its density decreases. (a) Siding fitted tightly in the cold would expand as the weather warms and, with nowhere to go, would buckle; the small spaces leave room for that expansion. (b) The air sealed in a tire expands as it heats in summer, and since the tire's volume can grow only slightly, the expanding air raises the pressure inside; a tire filled to its limit in the cool morning can be pushed past a safe pressure by the afternoon's heat.<br><br><b>Marking points:</b> 1 mark for the shared particle explanation (warming spreads particles, volume rises, density falls). 1 mark for applying it to the siding's expansion room. 1 mark for applying it to the tire air's expansion raising pressure.",
      {});
  }
]), ["One principle, two applications. State the principle once, then use it twice.", "Expansion is the key word in both situations."]);

/* ---------- SC8.4.6 Density changes in everyday life ---------- */

E("s8-u2-seasoning", 2, ["SC8.4.6"], 2, "var", varset([
  function () {
    return mcq("Boat builders dry (season) wood before using it, and dried wood floats higher than freshly cut wood. Why does drying change the wood this way?",
      "Drying removes water from the wood, so its mass falls while its volume stays nearly the same, lowering its density",
      ["Drying adds air to the wood, and the added air increases its mass",
       "Drying heats the wood permanently, keeping its particles spread out",
       "Drying changes the wood's colour, which changes how water supports it"],
      "Seasoning is a deliberate density change. Fresh wood holds a great deal of water; as it dries, that water leaves, the mass drops, the volume barely changes, and the density falls. Lower density means the wood floats higher, one reason builders season wood for watercraft.",
      {});
  }
]), ["What leaves the wood during drying, and which density ingredient does that change?", "Mass down, volume steady: density down."]);

E("s8-u2-density-life", 2, ["SC8.4.6"], 1, "gen", function () {
  var cases = [
    { q: "A submarine dives by opening its ballast tanks to the sea. What density change makes the dive happen?", k: "Water entering the tanks raises the submarine's average density above the seawater's, so it sinks", w: ["Air entering the tanks lowers the average density, so it sinks", "The tanks heat the seawater, lowering its density around the submarine", "The submarine's volume shrinks until it is denser than the water"] },
    { q: "A fish rises from deep water toward the surface by inflating its swim bladder with gas. What has the fish changed?", k: "Its volume increased while its mass barely changed, lowering its average density", w: ["Its mass increased, raising its average density", "The water's density around it decreased", "Its weight increased beyond the buoyant force"] },
    { q: "Swimmers find it easier to float in the ocean than in a freshwater pond. What density fact explains this?", k: "Seawater is denser than fresh water, so it provides a greater buoyant effect for the same swimmer", w: ["Seawater is less dense than fresh water, so swimmers sink less", "The ocean is deeper, and depth is what holds swimmers up", "Salt makes the swimmer's body less dense on contact"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Densities change naturally and by design. A submarine floods its ballast tanks to raise its average density and dive; a fish inflates its swim bladder to grow its volume and lower its average density and rise; and a swimmer floats more easily in denser seawater than in fresh water. In each case the comparison of densities decides the motion.",
    {});
}, ["Ask whose density changes, and in which direction.", "Sinking needs greater density than the fluid; rising needs less."]);

E("s8-u2-cr-raise-ship", 2, ["SC8.4.6"], 3, "var", varset([
  function () {
    return textq("A fishing boat has sunk in a harbour and rests on the bottom. Salvage crews attach large sealed barrels to the hull and pump them full of air, and the boat slowly rises. Explain how this works, using average density and buoyancy. (3 marks)",
      ["the barrels add a large volume with little mass", "the boat and barrels together have an average density below the water's", "so the buoyant force overcomes the total weight"],
      "<b>Model answer:</b> On the bottom, the boat's average density is greater than the water's, so its weight beats the buoyant force. The sealed barrels change the combination: they add a great deal of volume while adding very little mass, because the air inside them has a very low density. The average density of boat plus barrels falls below the density of the water, so the buoyant force on the combined volume becomes greater than the total weight, and the boat rises. It is the same average density principle that lets a steel ship float.<br><br><b>Marking points:</b> 1 mark for the barrels adding volume with little mass. 1 mark for the average density of the combination falling below the water's density. 1 mark for the buoyant force then exceeding the weight, so the boat rises.",
      {});
  }
]), ["Nothing about the boat itself changes. What does the combination of boat plus barrels change?", "Average density is the whole game: volume up, mass barely up."]);

/* ---------- SC8.4.7 Balanced and unbalanced forces ---------- */

E("s8-u2-forces", 2, ["SC8.4.7"], 1, "gen", function () {
  var cases = [
    { q: "A wagon sits still on a slope because the pull down the slope is exactly matched by friction holding it. How are the forces on the wagon described?", k: "Balanced forces: equal and opposite, so the wagon does not accelerate", w: ["Unbalanced forces: the wagon is on a slope, so gravity must be winning", "Balanced forces: both forces point in the same direction", "No forces act on a wagon that is not moving"] },
    { q: "A dropped stone speeds up as it falls through the air toward the ground. How are the forces on the stone described?", k: "Unbalanced forces: gravity's pull is greater than the air's resistance, so the stone accelerates", w: ["Balanced forces: falling objects always have balanced forces", "Unbalanced forces: the air's resistance is greater than gravity's pull", "No forces act once the stone leaves the hand"] },
    { q: "A boat floats motionless at a dock, neither rising nor sinking. How are the forces on the boat described?", k: "Balanced forces: its weight and the buoyant force are equal and opposite", w: ["Unbalanced forces: floating always means buoyancy is greater", "Balanced forces: no forces act on anything floating", "Unbalanced forces: its weight is greater, but slowly"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Balanced forces are equal and opposite: the object stays at rest or keeps its motion unchanged. Unbalanced forces are unequal, and the object accelerates in the direction of the greater force. A still wagon, a speeding stone and a floating boat cover the three patterns.",
    {});
}, ["Ask two questions: are the forces equal, and is the motion changing?", "Equal and opposite means balanced, whatever the setting."]);

E("s8-u2-force-figure", 2, ["SC8.4.7"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a rock in water with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the rock's weight. What do the arrows tell you, and what happens to the rock?",
      "The weight is greater than the buoyant force, so the forces are unbalanced and the rock sinks",
      ["The buoyant force is greater than the weight, so the rock rises",
       "The forces are balanced, so the rock floats at that depth",
       "The arrows show the rock's mass and volume, not its forces"],
      "Arrow length stands for force size. The downward arrow, the weight, is longer than the upward buoyant arrow, so the forces are unbalanced with weight winning: the rock sinks. That is the guide's rule for sinking.",
      {});
    q.figure = s8ForceSVG("sink");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a boat at the water's surface with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the boat's weight. What do the arrows tell you?",
      "The forces are balanced and equal, so the boat floats without rising or sinking",
      ["The weight is greater, so the boat is about to sink",
       "The buoyant force is greater, so the boat is rising out of the water",
       "Equal arrows mean no forces act on the boat"],
      "The two arrows are the same length, so weight and buoyant force are equal and opposite: balanced forces. A floating object at rest is exactly that balance, the guide's rule for floating.",
      {});
    q.figure = s8ForceSVG("float");
    return q;
  },
  function () {
    var q = mcq("The diagram shows a balloon under water with two force arrows: the upward arrow stands for the buoyant force and the downward arrow for the balloon's weight. What happens when the balloon is released, and why?",
      "It rises, because the buoyant force is greater than its weight, an unbalanced pair of forces",
      ["It sinks, because its weight is greater than the buoyant force",
       "It stays where it is, because the forces are balanced",
       "It moves sideways, because both arrows point vertically"],
      "The upward arrow is much longer: the buoyant force on the air-filled balloon far exceeds its small weight. Unbalanced forces accelerate the object toward the greater force, so the balloon rises, the guide's third pattern beside sinking and floating.",
      {});
    q.figure = s8ForceSVG("rise");
    return q;
  }
]), ["Arrow length is force size. Compare the two lengths before anything else.", "Longer arrow wins; equal arrows balance."]);

E("s8-u2-newton", 2, ["SC8.4.7"], 1, "var", varset([
  function () {
    return mcq("Which statement about force and its unit is correct?",
      "Force is measured in newtons; on Earth, a mass of about 100 g exerts a force of about 1 newton through gravity",
      ["Force is measured in kilograms; a mass of 1 kg exerts 1 newton",
       "Force is measured in pascals; 1 newton equals 1 pascal",
       "Force and mass are measured in the same unit, the gram"],
      "The newton is the unit of force. The guide's practical anchor: on Earth, roughly 100 grams of mass weighs about 1 newton. Kilograms and grams measure mass, and pascals measure pressure; keeping the units separate is part of keeping the ideas separate.",
      {});
  }
]), ["Force has its own unit. Which one, and what is the Earth anchor for its size?", "Newtons for force; grams and kilograms for mass."]);

/* ---------- SC8.4.8 Mass and weight ---------- */

E("s8-u2-mass-weight", 2, ["SC8.4.8"], 1, "gen", function () {
  var cases = [
    { q: "Which quantity describes the amount of matter in an object, and what is it measured with?", k: "Mass, measured with a balance in grams or kilograms", w: ["Mass, measured with a force meter in newtons", "Weight, measured with a balance in grams or kilograms", "Weight, measured with a force meter in grams"] },
    { q: "Which quantity describes the force of gravity pulling on an object, and what is it measured with?", k: "Weight, measured with a force meter (spring scale) in newtons", w: ["Mass, measured with a force meter in newtons", "Weight, measured with a balance in kilograms", "Mass, measured with a balance in newtons"] },
    { q: "A brick is weighed on Earth, then lowered into a tank of water, where its measured weight drops. What happened to its mass?", k: "Its mass stayed the same; only the measured weight changed, because the water's buoyant force supports part of it", w: ["Its mass decreased by the amount of water it displaced", "Its mass increased, because it absorbed water", "Its mass became zero while it was submerged"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Mass is the amount of matter in an object; it is measured with a balance and does not change when the object is moved or submerged. Weight is the force of gravity on that mass; it is measured with a force meter in newtons and changes when gravity changes or when another force, such as buoyancy, shares the load.",
    {});
}, ["Amount of matter: mass and balance. Gravity's pull: weight and force meter.", "Submerging changes the pull you measure, never the matter in the brick."]);

E("s8-u2-moon-suitcase", 2, ["SC8.4.8"], 3, "var", varset([
  function () {
    return mcq("An astronaut's suitcase is packed to the mission limit of 20 kg on Earth. On the Moon's space station, the astronaut finds the suitcase weighs noticeably less, and worries something was removed. A crewmate says nothing is missing. Who is right, and why?",
      "The crewmate: the suitcase's mass is still 20 kg because its matter is unchanged; its weight dropped because the Moon's gravity is weaker than Earth's",
      ["The astronaut: a lower weight always means mass was lost on the journey",
       "The crewmate, but because the suitcase's mass dropped along with its weight",
       "Neither: weight cannot change unless the suitcase is opened"],
      "Mass and weight part company exactly here. The suitcase holds the same amount of matter on the Moon, so its mass is still 20 kg. Weight is gravity's force on that mass, and the Moon's gravitational pull is weaker than Earth's, so the same mass weighs less. The guide uses this exact scenario to separate the two ideas.",
      {});
  }
]), ["What travels unchanged with the suitcase, and what depends on where it is?", "Matter is carried; gravity is local."]);

E("s8-u2-cr-mass-weight", 2, ["SC8.4.8"], 2, "var", varset([
  function () {
    return textq("A classmate insists that mass and weight are the same thing because 'my mass is 50 kilograms, so my weight is 50 too.' Correct the classmate: describe the difference between mass and weight, using the terms force meter, balance scale and gravity, and give the correct way to state each of the classmate's two quantities. (3 marks)",
      ["mass is the amount of matter, measured with a balance scale in kilograms", "weight is the force of gravity on the mass, measured with a force meter in newtons", "weight changes if gravity changes while mass does not"],
      "<b>Model answer:</b> Mass and weight are different quantities. Mass is the amount of matter in an object; it is measured with a balance scale and stated in grams or kilograms, so the classmate's mass is indeed 50 kg, and it stays 50 kg wherever they go. Weight is the force of gravity pulling on that mass; it is measured with a force meter (a spring scale) and stated in newtons. On Earth the classmate's weight is about 500 N (roughly 10 N for each kilogram, using the guide's anchor of about 1 N per 100 g). On the Moon the same 50 kg mass would weigh far less, because the Moon's gravity is weaker, while the mass would be unchanged.<br><br><b>Marking points:</b> 1 mark for mass defined as amount of matter, measured with a balance in kilograms. 1 mark for weight defined as gravity's force, measured with a force meter in newtons. 1 mark for the change test: weight varies with gravity, mass does not.",
      {});
  }
]), ["The classmate has the right number on the wrong quantity. Separate the two ideas, then restate both.", "One is measured with a balance, the other with a force meter."]);

/* ---------- SC8.4.9 Buoyancy ---------- */

E("s8-u2-buoyancy-rule", 2, ["SC8.4.9"], 1, "var", varset([
  function () {
    return mcq("An object is placed fully under water and released. Which rule decides whether it floats up or sinks?",
      "It floats if the buoyant force on it is greater than its weight, and sinks if its weight is greater than the buoyant force",
      ["It floats if it is lighter than the container holding the water",
       "It sinks if it is made of a solid material, whatever the forces",
       "It floats if its mass is less than the water's temperature in kilograms"],
      "Buoyancy is a contest of two forces. The buoyant force pushes up; the object's weight pulls down. Buoyant force greater means the object rises and floats; weight greater means it sinks; equal forces mean it hovers or floats at rest. The material alone decides nothing; the forces decide.",
      {});
  }
]), ["Two forces, one winner. Name both forces before choosing.", "Up push against down pull: that is the whole rule."]);

E("s8-u2-archimedes", 2, ["SC8.4.9"], 2, "var", varset([
  function () {
    return mcq("What does Archimedes' principle state?",
      "The buoyant force acting on an object equals the weight of the fluid displaced by the object",
      ["The buoyant force acting on an object equals the volume of the fluid displaced by the object",
       "The buoyant force acting on an object equals the weight of the object itself",
       "The buoyant force acting on an object equals the force of gravity acting on the fluid in the container"],
      "Archimedes' principle ties buoyancy to displacement: push water aside, and the water pushes back with a force equal to the weight of the water pushed aside. It is the weight of the displaced fluid that matters, not its volume alone: the same volume of a denser fluid weighs more and buoys more.",
      {});
  }
]), ["The principle is an equality. Buoyant force equals the weight of what?", "Weight of the displaced fluid: force equals force."]);

E("s8-u2-balls", 2, ["SC8.4.9"], 1, "gen", function () {
  var cases = [
    { q: "Three balls of the same size, made of styrofoam, rubber and metal, are pushed under water and released at the same moment. Which description of what happens is correct?", k: "The styrofoam ball shoots up and floats high, the rubber ball rises and floats lower, and the metal ball sinks", w: ["All three float at the same level, because they are the same size", "The metal ball floats highest, because it is the heaviest", "The rubber ball sinks, because rubber absorbs water instantly"] },
    { q: "A beach ball is very hard to hold under the water at a pool, and it leaps out when released. Which statement explains the beach ball?", k: "Its buoyant force when fully immersed is much greater than its small weight, so the unbalanced force drives it up", w: ["Its weight is greater than the buoyant force, so it escapes upward", "The water's pressure cancels its weight entirely, so it has no forces on it", "Air inside the ball is attracted to the air above the pool"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Same size means the same displaced water and roughly the same buoyant force available; the weights differ enormously. Light styrofoam and a beach ball have weights far below that buoyant force and are driven up; dense metal's weight exceeds it and sinks. The comparison of the two forces explains every case.",
    {});
}, ["Same size, same displaced water. What differs from ball to ball?", "Weight is the variable; buoyancy is nearly fixed by size."]);

E("s8-u2-cr-piggyback", 2, ["SC8.4.9"], 3, "var", varset([
  function () {
    return textq("A student finds it much easier to give a younger brother a piggyback ride in a swimming pool than in the living room, even though the brother's mass is the same in both places. Explain the difference using buoyant forces. (3 marks)",
      ["in the pool the water exerts a buoyant force on the brother", "the buoyant force acts opposite to his weight, so the student supports only the difference", "his mass and true weight are unchanged; the apparent load is reduced"],
      "<b>Model answer:</b> The brother's mass, and so his true weight, is the same in the pool as in the living room. The difference is a second force. Submerged in the pool, the water exerts a buoyant force on the brother, equal to the weight of the water his body displaces, and that force pushes upward, opposite to his weight. The student on the bottom only has to support what is left: weight minus buoyant force. In the living room there is no buoyant force worth naming, so the student carries the full weight.<br><br><b>Marking points:</b> 1 mark for the buoyant force acting on the submerged brother. 1 mark for it acting opposite to his weight, reducing the load the student supports. 1 mark for stating that his mass and true weight are unchanged.",
      {});
  }
]), ["Same brother, same mass. What extra force exists in the pool that does not exist in the living room?", "The water helps carry him. Say how, in force terms."]);

/* ---------- SC8.4.10 Pressure, quantitatively ---------- */

E("s8-u2-calc-pressure", 2, ["SC8.4.10"], 2, "gen", function () {
  var pairs = [[200, 4], [100, 0.5], [500, 10], [1000, 20], [250, 5], [400, 2], [2000, 0.5], [600, 20], [100, 4], [2000, 10], [150, 0.25], [900, 30]];
  var pr = pick(pairs);
  var F = pr[0], A = pr[1], P = F / A;
  var dis = s8dis(P, [F * A, P * 2, P / 2, F - A, F + A]);
  return mcq("A force of " + F + " N is applied over an area of " + s8n(A) + " m2. What pressure is exerted?",
    s8n(P) + " Pa",
    dis.map(function (d) { return s8n(d) + " Pa"; }),
    "Pressure is force spread over area: P = F/A = " + F + " N / " + s8n(A) + " m2 = " + s8n(P) + " Pa. One pascal is one newton spread over one square metre, so the unit follows from the calculation.",
    {});
}, ["Pressure = force / area. Divide, and the answer is in pascals.", "Spreading a force over more area lowers the pressure, never raises it."]);

E("s8-u2-calc-force", 2, ["SC8.4.10"], 2, "gen", function () {
  var F1 = pick([10, 20, 25, 40, 50]);
  var ratio = pick([4, 5, 8, 10]);
  var A1 = 5, A2 = A1 * ratio, F2 = F1 * ratio;
  var dis = s8dis(F2, [F1, F2 * 2, F1 + ratio, F2 - F1, F1 * 2]);
  return mcq("In a hydraulic lift, a force of " + F1 + " N is applied to a small piston of area " + A1 + " cm2. The large piston has an area of " + A2 + " cm2. What force does the large piston exert?",
    F2 + " N",
    dis.map(function (d) { return s8n(d) + " N"; }),
    "The pressure is the same throughout the confined liquid: P = F/A = " + F1 + " N / " + A1 + " cm2 = " + (F1 / A1) + " N/cm2. On the large piston, F = P x A = " + (F1 / A1) + " x " + A2 + " = " + F2 + " N. The force is multiplied by the same ratio as the areas, " + ratio + " times, which is the point of a hydraulic lift.",
    {});
}, ["Pressure is shared; force scales with area. Find the pressure first, then apply it to the big piston.", "Area ratio and force ratio are the same number."]);

E("s8-u2-calc-area", 2, ["SC8.4.10"], 3, "gen", function () {
  var pairs = [[200, 50], [1000, 200], [500, 25], [2400, 400], [800, 80], [360, 60], [1500, 300], [720, 90]];
  var pr = pick(pairs);
  var F = pr[0], P = pr[1], A = F / P;
  var dis = s8dis(A, [A * 2, A / 2, F * P / 100, P / F * 100, A + 5]);
  return mcq("A machine part must exert a force of " + F + " N while keeping the pressure on the surface at " + P + " Pa. What contact area is required?",
    s8n(A) + " m2",
    dis.map(function (d) { return s8n(d) + " m2"; }),
    "Rearrange the pressure formula: A = F/P = " + F + " N / " + P + " Pa = " + s8n(A) + " m2. To hold pressure down at a set force, the area must be large enough to spread the force; the division sizes it exactly.",
    {});
}, ["Area = force / pressure. This is the third form of the same formula.", "Check the direction: more allowed pressure would need less area."]);

E("s8-u2-snowshoes", 2, ["SC8.4.10"], 1, "var", varset([
  function () {
    return mcq("A person wearing snowshoes can walk across deep, soft snow without sinking, while the same person in boots sinks at every step. What explains the difference?",
      "The snowshoes spread the person's weight (force) over a much larger area, so the pressure on the snow is much lower",
      ["The snowshoes reduce the person's weight while they are worn",
       "The snowshoes increase the pressure, which packs the snow harder",
       "The snowshoes change the person's mass, so gravity pulls less"],
      "The force is identical in both cases: the person's weight. Pressure is force divided by area, so spreading the same force over the snowshoes' larger area lowers the pressure below what the snow can support without giving way. Boots concentrate the force on a small area and the pressure punches through.",
      {});
  }
]), ["Same person, same weight. Only one quantity in P = F/A changes.", "Bigger area, smaller pressure."]);

E("s8-u2-cr-pressure-crate", 2, ["SC8.4.10"], 2, "var", varset([
  function () {
    return textq("A crate weighs 800 N and rests on a base measuring 2 m by 1 m. (a) Calculate the pressure the crate exerts on the floor. (b) The crate is placed on a wide board that doubles the contact area. State the new pressure and explain, using the pressure relationship, why warehouse workers use such boards under heavy crates on soft ground. (3 marks)",
      ["the base area is 2 m2 and the pressure is 400 Pa", "doubling the contact area halves the pressure to 200 Pa", "lower pressure means the surface is less likely to be damaged or sink"],
      "<b>Model answer:</b> (a) The base area is 2 m x 1 m = 2 m2. P = F/A = 800 N / 2 m2 = 400 Pa. (b) Doubling the contact area to 4 m2 gives P = 800 / 4 = 200 Pa: at the same force, doubling the area halves the pressure. Workers use boards for exactly this reason: the crate's weight is unchanged, but spread over a larger area it presses less on each part of the ground, so soft ground is less likely to give way or be damaged, the same principle as snowshoes.<br><br><b>Marking points:</b> 1 mark for the area and the 400 Pa pressure. 1 mark for the halved pressure, 200 Pa, when the area doubles. 1 mark for the explanation tying lower pressure to protecting the surface at unchanged force.",
      {});
  }
]), ["Part (a) needs the area first. Part (b) is the snowshoe principle with numbers.", "Force stays fixed throughout; only area and pressure move, in opposite directions."]);

/* ---------- SC8.4.11 Pressure, volume and temperature in gases ---------- */

E("s8-u2-gas-laws", 2, ["SC8.4.11"], 1, "gen", function () {
  var cases = [
    { q: "A sealed syringe of air is pushed in, halving the air's volume while its temperature stays the same. What happens to the pressure of the air inside?", k: "It increases, because the particles are crowded into a smaller space and strike the walls more often", w: ["It decreases, because compressed air always loses pressure", "It stays the same, because the amount of air did not change", "It drops to zero until the plunger is released"] },
    { q: "A balloon filled with air is placed in warm sunlight, free to expand, and it grows larger. Its pressure stays about the same. Which relationship does this show?", k: "Increasing a gas's temperature increases its volume when pressure is held constant", w: ["Increasing a gas's temperature decreases its volume when pressure is held constant", "Temperature has no effect on a gas's volume", "The gas's volume grew because its pressure doubled"] },
    { q: "A scuba tank is filled to high pressure at the dive shop. In particle terms, what is true of the air inside compared with air at ordinary pressure?", k: "Far more particles are packed into the same volume, which is why gases, unlike liquids, can be compressed this way", w: ["The particles themselves have shrunk to fit more in", "The air has become a liquid under the pressure", "The tank holds the same number of particles, each under more force"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "For gases, the guide's two relationships are: increasing the pressure on a gas decreases its volume when temperature is held constant, and increasing the temperature increases its volume when pressure is held constant. Both work because gas particles sit far apart with empty space between them, so gases can be compressed in a way liquids cannot.",
    {});
}, ["Keep straight which quantity is held constant in each case.", "Gas particles have space between them: that space is what compression removes."]);

E("s8-u2-compressible", 2, ["SC8.4.11"], 1, "var", varset([
  function () {
    return mcq("Why can gases be compressed into a much smaller volume while liquids hardly compress at all?",
      "Gas particles are far apart with a great deal of empty space between them, while liquid particles are already close together with little space to remove",
      ["Gas particles are smaller than liquid particles",
       "Liquid particles repel one another, while gas particles attract",
       "Gases weigh less than liquids, so pressure affects them more"],
      "Compressibility is about the space between particles. In a gas the particles are widely separated, so pushing them closer removes empty space and shrinks the volume greatly. In a liquid the particles are already nearly touching, so there is almost no space to remove and the volume barely changes: liquids are effectively incompressible, which is why they serve in hydraulic systems.",
      {});
  }
]), ["Picture the particle spacing in each state. Which one has space to give up?", "Far apart compresses; close together does not."]);

E("s8-u2-depth-pressure", 2, ["SC8.4.11"], 2, "var", varset([
  function () {
    return mcq("A tall bottle is filled with water and has three holes punched down one side, at the top, middle and bottom. When the bottle is filled, the bottom jet shoots farthest and the top jet barely trickles. What does this demonstration show about fluid pressure?",
      "Fluid pressure increases with depth, and it pushes in all directions, driving the deepest jet hardest",
      ["Fluid pressure is the same at all depths, and the bottom hole is simply larger",
       "Fluid pressure acts only downward, which is why the bottom jet is strongest",
       "The water at the bottom is denser, and density alone explains the jets"],
      "The weight of the water above presses down through the fluid, so pressure grows with depth: the bottom hole feels the greatest pressure and drives its jet farthest. The jets leave sideways, which also shows that fluid pressure at a point acts in all directions, not only downward.",
      {});
  }
]), ["More water above means more weight pressing down. What should that do to pressure with depth?", "The sideways jets carry the second message: pressure pushes in all directions."]);

/* ---------- SC8.5.1 Personal activities and fluid dynamics ---------- */

E("s8-u2-personal", 2, ["SC8.5.1"], 1, "gen", function () {
  var cases = [
    { q: "A cook finds that pancake batter made too thin runs all over the pan, while batter made too thick sits in lumps. Which fluid property is the cook adjusting?", k: "Viscosity: the batter's resistance to flow", w: ["Density: the batter's mass per unit volume", "Pressure: the force the batter exerts on the pan", "Buoyancy: the force the pan exerts on the batter"] },
    { q: "A mechanic chooses a thinner motor oil for a car that will run through a Newfoundland winter. Which fluid fact is behind the choice?", k: "Oil's viscosity rises as temperature falls, so a thinner grade is needed to keep it flowing in the cold", w: ["Oil's density falls to zero in cold weather unless it is thin", "Cold weather compresses oil, so less of it is needed", "Winter air pressure forces thick oil out of engines"] },
    { q: "A cyclist pumps a tire up hard before a race. Which fluid behaviour is she using?", k: "Air is a compressible fluid, so more particles can be packed into the tire to raise its pressure", w: ["Air is an incompressible fluid, like the liquids in brakes", "Air's viscosity drops when it is pumped", "The tire's density decreases as air is added"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Fluid dynamics runs through ordinary activities: batter must flow at the right rate, motor oil must keep flowing in winter cold (viscosity rises as temperature falls, so winter grades start thinner), and tires work because air compresses. Relating the activity to the fluid property is the indicator's ask.",
    {});
}, ["Name the fluid, then the property the activity depends on.", "Batter and oil are viscosity stories; the tire is a compressibility story."]);

E("s8-u2-winter-oil", 2, ["SC8.5.1"], 3, "var", varset([
  function () {
    return mcq("Two identical engines are filled with the same oil. One runs in a warm garage; the other is parked outside through a January cold snap in St. John's. On a cold start, the outdoor engine's oil circulates poorly and the engine wears faster. Which explanation connects the observation to the fluid science?",
      "Cold raised the oil's viscosity, so it resisted flowing to the moving parts; the oil's particles, moving slowly and staying close, produced more internal friction",
      ["Cold lowered the oil's viscosity until it ran off the parts entirely",
       "Cold compressed the oil into a solid, and solids cannot lubricate",
       "The cold changed the oil's density to zero, so the pump could not lift it"],
      "The observation, the property and the particle explanation line up: falling temperature raises a liquid's viscosity, the thickened oil resists flowing through the engine's passages, and parts that should be coated run nearly dry. It is why winter oil grades exist, and why the choice is a fluid dynamics decision, not a marketing one.",
      {});
  }
]), ["Poor circulation means high resistance to flow. What does cold do to that resistance?", "Trace it fully: temperature, particles, friction, viscosity, circulation."]);

/* ---------- SC8.5.2 Viscosity products and the Cleaning Fluids STSE ---------- */

E("s8-u2-products", 2, ["SC8.5.2"], 1, "gen", function () {
  var cases = [
    { q: "Which product exists in several grades mainly because of our understanding of viscosity?", k: "Motor oil, graded so engines can be matched with an oil that flows properly at their working temperatures", w: ["Window glass, graded by how fast it flows", "Table salt, graded by how thickly it pours when dry", "Bicycle tires, graded by the viscosity of their rubber"] },
    { q: "A shampoo is reformulated so it sits on the hand instead of running off, but still spreads through hair. What understanding guided the reformulation?", k: "Viscosity: adjusting the liquid's resistance to flow so it performs its function", w: ["Buoyancy: adjusting the shampoo's average density", "Pressure: adjusting the force the bottle must withstand", "Density: adjusting the mass in each bottle"] },
    { q: "Ketchup is designed to sit thick in the bottle yet flow when the bottle is shaken and squeezed. Which science understanding is the design built on?", k: "How a liquid's flow behaviour can be engineered for its intended function", w: ["How gases compress inside sealed bottles", "How buoyant forces act on objects in liquids", "How Pascal's law transmits pressure through the bottle"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Understanding viscosity lets manufacturers engineer flow: motor oil comes in grades for different temperatures, shampoos and paints are tuned to spread without running, and foods like ketchup are designed around how they pour. Each product's design starts from the liquid's resistance to flow.",
    {});
}, ["Each product is a flow problem solved on purpose. Which property is being engineered?", "If the product's job is about pouring, spreading or coating, the answer is viscosity."]);

E("s8-u2-cleaning", 2, ["SC8.5.2"], 2, "var", varset([
  function () {
    return mcq("The strand's core STSE studies cleaning fluids. How do soaps and detergents remove grease and dirt that plain water leaves behind?",
      "Their particles surround and lift the grease, breaking it into tiny droplets that stay suspended in the water and rinse away",
      ["They dissolve the surface the dirt sits on, carrying the dirt with it",
       "They raise the water's viscosity until the dirt floats off on its own",
       "They compress the grease until it evaporates"],
      "Water alone beads off grease. Soap and detergent particles have ends that behave differently: one end mixes with water and the other with grease, so they surround grease and dirt, lift them from the surface as tiny suspended droplets, and the rinse water carries them away. That is the science the Cleaning Fluids STSE is built on.",
      {});
  }
]), ["Plain water fails on grease. What do the cleaning particles do that water cannot?", "Surround, lift, suspend, rinse: the four steps."]);

E("s8-u2-cr-cleaning-claim", 2, ["SC8.5.2"], 3, "var", varset([
  function () {
    return textq("An advertisement claims: 'Thicker cleaning fluids clean better, because high viscosity means stronger cleaning.' Evaluate this claim the way the core STSE suggests: state what the claim gets right or wrong about viscosity, and describe a fair test that would settle whether a higher-viscosity cleaner actually cleans better. (4 marks)",
      ["viscosity is resistance to flow, not cleaning strength", "cleaning depends on the detergent action on dirt and grease", "a fair test holds cleaner amount, surface, dirt and scrubbing the same while varying the cleaner", "a measurable result such as cleanliness judged the same way for each"],
      "<b>Model answer:</b> The claim confuses two different properties. Viscosity is a liquid's resistance to flow; it says how thickly a cleaner pours and spreads, not how well its particles lift grease. Cleaning power comes from the detergent action: particles surrounding dirt and grease and suspending them so they rinse away, which a thin cleaner can do as well as a thick one. A fair test: prepare identical tiles with the same amount of the same greasy dirt; apply equal amounts of a high-viscosity and a low-viscosity cleaner; scrub each the same number of strokes with the same brush and rinse identically; then compare the remaining dirt using the same measure for both (for example, a scored photograph or the mass of dirt removed). If the thicker cleaner does not remove more dirt under identical conditions, the claim fails.<br><br><b>Marking points:</b> 1 mark for identifying the confusion (viscosity is flow resistance, not cleaning strength). 1 mark for the correct basis of cleaning (detergent action on dirt and grease). 1 mark for a fair test with the main variables held the same. 1 mark for a measurable, identically applied result.",
      {});
  }
]), ["Separate the two properties first: what viscosity measures, and what cleaning depends on.", "Then design the test: same dirt, same amount, same scrubbing, one thing changed."]);

/* ---------- SC8.5.3 Science and technology in our lives ---------- */

E("s8-u2-lives", 2, ["SC8.5.3"], 1, "gen", function () {
  var cases = [
    { q: "Which example shows fluids science and technology affecting daily life in a community?", k: "A town's water system uses pumps and pressure to deliver clean water to homes at every height in the town", w: ["A town paints its water tower a new colour each spring", "A school buys new gym mats for the winter term", "A ferry changes its sailing schedule for the holidays"] },
    { q: "Which example shows fluids science and technology affecting daily life in a home?", k: "Hydraulic brakes use an incompressible liquid to carry the driver's foot force to all four wheels", w: ["A family chooses a larger television for the living room", "A student sharpens pencils before class", "A baker sets the oven timer for a cake"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Fluids science reaches daily life through the systems built on it: pressurized water delivery, hydraulic brakes, heating systems and pumps. The examples that count are the ones where a fluid property does the work.",
    {});
}, ["Look for the example where a fluid property is doing a job.", "Pumps, pressure and hydraulics are fluids at work."]);

E("s8-u2-community", 2, ["SC8.5.3"], 1, "var", varset([
  function () {
    return mcq("A coastal community is replacing the brakes and lift equipment in its vehicle service centre and upgrading the ferry's hydraulic steering. Which statement best describes how science and technology are affecting this community?",
      "Fluids technologies built on Pascal's law and the incompressibility of liquids are doing heavy work all through the community's transport system",
      ["The community is affected only because the new equipment is more expensive",
       "Fluids science affects the community only in its science classrooms",
       "The ferry's steering is a technology, but vehicle brakes are not"],
      "Hydraulic systems transmit force through confined liquids, and they run the community's brakes, lifts and steering alike. Science and technology affect a community through the working systems it depends on, not only through laboratories and classrooms.",
      {});
  }
]), ["The common thread is one law working in several machines.", "Pascal's law is doing the work in every example named."]);

/* ---------- SC8.5.4 The science underlying technologies ---------- */

E("s8-u2-underlying", 2, ["SC8.5.4"], 1, "gen", function () {
  var cases = [
    { q: "A hydrometer floats higher in one liquid than in another and reads the liquid's density from how deep it sinks. Which science underlies this technology?", k: "Buoyancy and density: a floating object settles where the buoyant force balances its weight, deeper in less dense liquids", w: ["Viscosity: the hydrometer's sinking is slowed by thick liquids", "Pascal's law: pressure in the liquid is transmitted to the hydrometer", "Compressibility: the liquid is squeezed by the hydrometer's weight"] },
    { q: "A liquid-in-glass thermometer is a technology built on which science?", k: "Thermal expansion: the liquid's volume and density change with temperature in a predictable way", w: ["Archimedes' principle: the liquid is buoyed up the tube", "Pascal's law: pressure is transmitted through the liquid", "Viscosity: warm liquid flows up the tube faster"] },
    { q: "A dentist's chair rises smoothly when a small pedal is pressed. Which science underlies the technology?", k: "Pascal's law in a hydraulic system: pressure applied to a confined liquid is transmitted to a larger piston", w: ["Buoyancy: the chair floats on a hidden tank of water", "Thermal expansion: the pedal warms the liquid in the chair", "Density layering: liquids in the chair sort themselves by density"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Every fluids technology rests on a piece of the strand's science: the hydrometer on buoyancy and density, the thermometer on thermal expansion, and the hydraulic chair on Pascal's law. Naming the underlying science is the indicator's ask.",
    {});
}, ["Ask what the device does, then which strand idea makes it possible.", "Floating gauge: buoyancy. Rising liquid: expansion. Force from a pedal: Pascal."]);

E("s8-u2-cr-underlying", 2, ["SC8.5.4"], 2, "var", varset([
  function () {
    return textq("Choose one technology: a submarine, a hot air balloon, or a personal flotation device (life jacket). Describe the science underlying the technology: name the fluid principle it depends on and explain how the technology uses that principle to work. (3 marks)",
      ["the principle named, such as average density and buoyancy", "how the technology changes or uses it", "the result that makes the technology function"],
      "<b>Model answer:</b> A submarine depends on average density and buoyancy. A vessel floats when its average density is less than the water's and sinks when it is greater. The submarine carries ballast tanks: to dive, it floods the tanks with seawater, raising its average density above the sea's so its weight overcomes the buoyant force; to surface, it blows the water out with compressed air, lowering its average density until buoyancy wins. The whole technology is a machine for adjusting average density on command. (A hot air balloon, heating air to lower its density, or a life jacket, adding low-density volume to lower a swimmer's average density, treated in the same pattern, also earns full marks.)<br><br><b>Marking points:</b> 1 mark for the governing principle correctly named. 1 mark for how the technology manipulates or uses it. 1 mark for the working result explained.",
      {});
  }
]), ["Principle first, mechanism second, result third.", "All three choices run on density and buoyancy, adjusted in different ways."]);

/* ---------- SC8.5.5 Activities and science disciplines ---------- */

E("s8-u2-disciplines", 2, ["SC8.5.5"], 1, "var", varset([
  function () {
    return mcq("A student changes a car's motor oil at home and wonders why the old oil pours more slowly on a cold morning. Which pairing connects this activity to the right science discipline and concept?",
      "Physics, fluid mechanics: the oil's viscosity rises as its temperature falls",
      ["Chemistry, acids and bases: the oil has become more acidic overnight",
       "Biology, cell function: the oil's particles are living and slow down in cold",
       "Earth science, erosion: the oil wears away the engine like a river wears rock"],
      "Everyday activities connect to specific disciplines. Pouring oil is a fluids question, and fluids belong to physics (fluid mechanics); the concept at work is viscosity changing with temperature. Matching the activity to its discipline and its concept is the skill.",
      {});
  }
]), ["The activity is about a flowing liquid. Which discipline owns flowing liquids?", "Fluids sit inside physics; the concept is viscosity."]);

/* ---------- SC8.5.6 Density and buoyancy technologies ---------- */

E("s8-u2-pfd", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("A life jacket that has served for many years is retired because it no longer keeps a swimmer afloat as well as it should. The guide explains this aging effect. Which statement gives the correct explanation, and the principle the jacket was built on?",
      "The jacket works by lowering the swimmer's average density below the water's; over years its foam compresses and grows denser, so it adds less low-density volume and buoys less",
      ["The jacket works by raising the swimmer's average density; over years it absorbs water and grows lighter",
       "The jacket works by heating the water around the swimmer; over years it loses that ability",
       "The jacket works by increasing the swimmer's weight; over years the straps stretch and it fits loosely"],
      "A personal flotation device is made of very low density material. Worn, it makes the average density of swimmer plus jacket less than the water's, so the combination floats. The guide's aging point: as the materials break down and compress over the years, they become more dense, the jacket contributes less low-density volume, and its buoyancy fades. Both the design and its failure run on average density.",
      {});
  }
]), ["One principle explains both why the jacket works and why an old one fails.", "Average density: the jacket's job is to drag the average down."]);

E("s8-u2-submarine", 2, ["SC8.5.6"], 2, "var", varset([
  function () {
    return mcq("A submarine is floating at the surface. Its captain orders the ballast tanks opened to the sea. What happens inside the tanks, and what happens to the submarine?",
      "Water floods in, the submarine's average density rises above the seawater's, and it dives",
      ["Air rushes in, the submarine's average density falls, and it dives",
       "Water floods in, the submarine's volume shrinks, and it rises",
       "The tanks empty of water, and the submarine's weight increases until it dives"],
      "Ballast tanks are the submarine's density controls. Flooding them adds a great deal of mass in water while the submarine's volume stays the same, so its average density climbs past the seawater's density and it sinks in a controlled dive. Blowing the water back out reverses the process to surface.",
      {});
  }
]), ["Flooding adds mass without adding volume. Follow the average density.", "Denser than the sea means down."]);

E("s8-u2-average-density", 2, ["SC8.5.6"], 3, "var", varset([
  function () {
    return mcq("A wooden boat floats for decades, but a waterlogged stick of the same wood sinks. A solid steel block sinks instantly, but a steel ship floats. Which single idea explains both pairs?",
      "Average density: what matters is the total mass divided by the total volume of the whole object, including the air spaces and absorbed water it carries",
      ["Shape alone: any object shaped like a boat floats, whatever it is made of",
       "Age: older wooden objects absorb the ability to float",
       "Surface area: objects with more surface always float"],
      "Neither the material nor the shape alone decides it. The waterlogged stick has soaked up water until its average density passes the water's; the dry boat's wood and air spaces keep its average below. The steel block is solid steel throughout, while the ship is mostly enclosed air: its average density, mass over total volume, is below the water's. One ratio explains all four cases.",
      {});
  }
]), ["Both pairs pit the same material against itself. What property can differ between two objects of the same material?", "Total mass over total volume, air spaces included."]);

/* ---------- SC8.5.7 Hydraulic technologies ---------- */

E("s8-u2-pascal", 2, ["SC8.5.7"], 1, "var", varset([
  function () {
    return mcq("What does Pascal's law state?",
      "Pressure applied to a confined fluid is transmitted equally in all directions throughout the fluid",
      ["Pressure in a fluid decreases with depth in all directions",
       "A confined gas expands until its pressure reaches zero",
       "The buoyant force on an object equals the weight of the fluid it displaces"],
      "Pascal's law is the foundation of hydraulics and pneumatics: squeeze a confined fluid at one point and the pressure increase is felt everywhere in the fluid, in all directions. That is what lets a small force at one piston produce a large force at another.",
      {});
  }
]), ["One law, one idea: pressure applied here is felt everywhere in the fluid.", "Do not confuse it with Archimedes' principle, which is about buoyancy."]);

E("s8-u2-hydraulic-pneumatic", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return mcq("Which comparison of hydraulic and pneumatic systems is correct?",
      "Hydraulic systems use a liquid, which is incompressible and keeps a definite volume; pneumatic systems use a gas, which is compressible and has an indefinite volume",
      ["Hydraulic systems use a gas, which is compressible; pneumatic systems use a liquid, which is not",
       "Both systems use liquids; they differ only in the size of their pistons",
       "Hydraulic systems use a compressible liquid, which is what makes them strong"],
      "The two system families split on their fluid. Hydraulics run on liquids: effectively incompressible, definite volume, ideal for transmitting force exactly, as in brakes and lifts. Pneumatics run on gases: compressible, indefinite volume, as in air tools and tires. Pascal's law applies to both.",
      {});
  }
]), ["The names hide the fluids: hydraulics is water's family (liquids), pneumatics is air's (gases).", "Incompressible goes with hydraulic."]);

E("s8-u2-cr-car-lift", 2, ["SC8.5.7"], 2, "var", varset([
  function () {
    return textq("A service station lift raises a 12,000 N car using a pump that applies a force of only 300 N to a small piston. Using Pascal's law and the pressure relationship, explain how the lift multiplies the force, and state what the ratio of the piston areas must be. (3 marks)",
      ["pressure applied to the confined liquid is transmitted equally", "the same pressure acts on the large piston, so force scales with area", "the area ratio must be 40 to 1"],
      "<b>Model answer:</b> The pump's 300 N on the small piston creates pressure in the confined hydraulic liquid. By Pascal's law, that pressure is transmitted equally in all directions through the liquid, so the large piston under the car feels the same pressure. Force is pressure times area, F = P x A, so the piston with the larger area produces the larger force. To turn 300 N into 12,000 N the force must be multiplied by 40, so the large piston's area must be 40 times the small piston's area.<br><br><b>Marking points:</b> 1 mark for Pascal's law transmitting the pressure through the confined liquid. 1 mark for force scaling with area at equal pressure (F = P x A). 1 mark for the area ratio of 40 to 1.",
      {});
  }
]), ["The liquid carries pressure, not force. The multiplication happens at the big piston's area.", "Divide the car's weight by the pump's force to get the ratio."]);

/* ---------- SC8.6.1 Identifying questions about fluids ---------- */

E("s8-u2-questions", 2, ["SC8.6.1"], 1, "var", varset([
  function () {
    return mcq("A class is brainstorming investigations after the flow rate lab. Which question arises from a practical fluids problem and can actually be investigated?",
      "Does warming motor oil change how quickly it drains from an engine?",
      ["Why is honey everyone's favourite liquid?",
       "Which liquid in the world is the best one?",
       "Would fluids behave differently if gravity were switched off?"],
      "An investigable question names something that can be changed and something that can be measured: warming the oil (change) and timing its draining (measure). Opinions, superlatives and impossible conditions cannot be investigated, however interesting they sound.",
      {});
  }
]), ["An investigable question needs a changeable variable and a measurable result.", "Favourites and impossible worlds are out; warming and timing are in."]);

E("s8-u2-question-problem", 2, ["SC8.6.1"], 2, "var", varset([
  function () {
    return mcq("A bicycle shop finds that a hydraulic brake lever feels spongy and the brakes are weak. Which question turns this practical problem into an investigation?",
      "Does air trapped in the brake line reduce the force the brake pads apply, compared with a line containing only brake fluid?",
      ["Why do customers prefer strong brakes?",
       "Who invented hydraulic brakes?",
       "Are hydraulic brakes better than cable brakes in every way?"],
      "The practical problem is the spongy lever. The investigable version names a suspected cause that can be varied (air in the line, which compresses, unlike the liquid) and an effect that can be measured (the force at the pads). History and opinion questions do not test the problem.",
      {});
  }
]), ["Start from the shop's problem. The question must be able to test a cause.", "Air in the line is the testable suspect: it compresses, brake fluid does not."]);

/* ---------- SC8.6.2 Rephrasing questions in testable form ---------- */

E("s8-u2-rephrase", 2, ["SC8.6.2"], 1, "var", varset([
  function () {
    return mcq("A student's question reads: 'Is thick oil bad for engines?' Which rephrasing puts it in testable form?",
      "How does the temperature of motor oil affect the time it takes for 100 mL of the oil to drain through a funnel?",
      ["Why do engines dislike thick oil so much?",
       "Is winter oil a better invention than summer oil?",
       "What is the best oil in the world?"],
      "Testable form names the variable to change (temperature), the variable to measure (drain time for a fixed volume), and the material under test. The original question's 'bad' cannot be measured; the rephrasing replaces it with quantities.",
      {});
  }
]), ["Testable means: a variable to change and a variable to measure, both named.", "Replace 'bad' with something a stopwatch can settle."]);

E("s8-u2-define-problem", 2, ["SC8.6.2"], 2, "var", varset([
  function () {
    return mcq("A team must define a practical problem clearly before investigating: their school's soap dispensers keep clogging in winter. Which statement defines the problem in a way an investigation can address?",
      "In cold months the dispensers deliver soap slowly or not at all; the team will test whether the soap's higher viscosity at low temperature is the cause and whether a lower-viscosity soap fixes it",
      ["The soap dispensers are annoying in winter and should be better",
       "Someone should invent a perfect soap that never clogs anything",
       "The dispensers clog because winter is cold, so the investigation is finished"],
      "A clearly defined practical problem states the observed difficulty, a testable suspected cause, and what a solution would look like. The first option does all three; the others complain, dream, or declare the answer before testing it.",
      {});
  }
]), ["A defined problem has three parts: the difficulty, a testable cause, and what fixing it means.", "Declaring the cause before the test is the trap option."]);

/* ---------- SC8.6.3 and SC8.6.9 Discrepancies in data ---------- */

E("s8-u2-discrepancy-flow", 2, ["SC8.6.3"], 2, "var", varset([
  function () {
    return mcq("In the flow rate lab, one group's honey time is 9 seconds while three other groups record 24, 26 and 25 seconds for the same honey through identical funnels. Which explanation for the discrepancy should be investigated first?",
      "A procedural difference in the fast group's trial, such as the funnel being warmed, the honey being a different sample, or the timing starting late",
      ["Honey's viscosity changes randomly from minute to minute, so all results are equally valid",
       "The three slower groups must all have made the same mistake",
       "The fast result should be averaged in without question, since more data is always better"],
      "A single result far from a cluster of agreeing results points first at the procedure behind it: something differed in that trial. Discrepancy work starts by hunting the difference (warmed funnel, different honey, timing error), not by discarding or blindly averaging the odd value.",
      {});
  }
]), ["Three groups agree and one is far off. Where does a scientist look first?", "One odd trial usually has one odd cause in how it was run."]);

E("s8-u2-discrepancy-density", 2, ["SC8.6.9"], 3, "var", varset([
  function () {
    return mcq("Four groups measure the density of the same aluminum bar. Three report 2.7 g/cm3. The fourth reports 3.4 g/cm3 and offers two explanations: (1) their bar was a different alloy; (2) they read the graduated cylinder's level from above instead of at eye level, under-recording the volume. The bars were all cut from one sheet. Which evaluation is strongest?",
      "Explanation (2) is the one to act on: the shared source rules out a different alloy, and under-recording volume inflates the calculated density in exactly the direction observed, so the group should re-measure at eye level",
      ["Explanation (1), because any bar can secretly be a different alloy",
       "Both explanations are equally likely, so the result should stand as reported",
       "Neither: a density discrepancy of this size should simply be deleted from the class data"],
      "Weighing explanations means testing them against the facts and the direction of the error. One sheet rules out a different alloy. A volume read too small makes m/V too large, which matches the high result exactly. The strongest evaluation names the explanation that fits both the facts and the arithmetic, and prescribes the re-measurement.",
      {});
  }
]), ["Test each explanation twice: does it fit the facts, and does it push the number the way the number actually moved?", "Too-small volume makes density too big. That direction match is decisive."]);

/* ---------- SC8.6.4 Compiling and displaying data in a bar graph ---------- */

E("s8-u2-bargraph", 2, ["SC8.6.4"], 3, "var", varset([
  function () {
    var q = mcq("A group measured flow times for four liquids and displayed them in the bar graph shown. Their lab partner claims the graph proves Liquid B is the most viscous because its bar is 'in the middle.' Which evaluation of the display and the claim is correct?",
      "The bar graph is an appropriate display for comparing separate liquids, but the claim misreads it: the most viscous liquid is the one with the longest flow time, Liquid D",
      ["The claim is correct, because the middle bar always represents the extreme value",
       "The bar graph is the wrong display; only a line graph can compare liquids",
       "The graph proves nothing, because flow times cannot be displayed graphically"],
      "Bar graphs suit this data: separate categories (four liquids) each with one measured value. Reading it is the second skill: viscosity rises with flow time, so the longest bar, Liquid D, is the most viscous. The display is right and the partner's reading of it is wrong.",
      {});
    q.figure = s8HealthSVG([{ name: "Liquid A", value: 6 }, { name: "Liquid B", value: 14 }, { name: "Liquid C", value: 11 }, { name: "Liquid D", value: 23 }], "Flow time", "s", null);
    return q;
  }
]), ["Two judgements: is a bar graph right for categories, and which bar means most viscous?", "Categories take bars; longest time takes the viscosity title."]);

E("s8-u2-graph-choice", 2, ["SC8.6.4"], 1, "var", varset([
  function () {
    return mcq("A group has one flow time for each of five different liquids and must display the data. Which display is appropriate, and why?",
      "A bar graph, because the data are separate categories (different liquids), each with a single value to compare",
      ["A line graph, because all science data must be drawn as lines",
       "A circle graph, because the five times add to a whole",
       "No graph, because times measured in seconds cannot be graphed"],
      "Display follows data shape. Five different liquids are categories, not a continuous variable, so bars compare them honestly; a line would invent a trend between unrelated liquids. The guide's own correction in Core Lab 8-2B makes the same point in reverse: class results there belong in a bar graph (histogram), not a line graph.",
      {});
  }
]), ["Categories or a continuum? That decides bars or lines.", "Different liquids are categories. A line would pretend they connect."]);

/* ---------- SC8.6.5 Carrying out procedures controlling variables (CORE) ---------- */

E("s8-u2-variables", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return mcq("A group tests whether temperature affects the flow rate of cooking oil. They warm or cool the oil to three temperatures, pour 100 mL through the same funnel each time, and time each pour. Which identification of the variables is correct?",
      "Changed variable: the oil's temperature. Measured variable: the flow time. Kept the same: the oil, its volume, and the funnel",
      ["Changed variable: the flow time. Measured variable: the temperature. Kept the same: the oil and the funnel",
       "Changed variable: the funnel. Measured variable: the oil's volume. Kept the same: the temperature",
       "There are no controlled variables, because temperature is the only thing in the experiment"],
      "Variable identification follows the roles. The group deliberately changes the temperature, measures the flow time as the result, and holds the oil, its volume and the funnel constant so the comparison is fair. Naming the three roles correctly is the cognitive core of carrying out a controlled procedure.",
      {});
  }
]), ["Sort by role: what they set, what they measured, what they froze in place.", "The changed variable is the one in the question being tested."]);

E("s8-u2-cr-design-viscosity", 2, ["SC8.6.5"], 3, "var", varset([
  function () {
    return textq("Design a controlled investigation to compare the viscosities of three liquids: water, cooking oil and honey. Your plan must state the method you will use to compare them, the variable you will change, the variable you will measure, at least two variables you will keep the same, and how you will make the comparison fair and repeatable. (4 marks)",
      ["a workable method such as timing flow through the same funnel or down the same ramp", "the liquid as the changed variable", "flow time or distance as the measured variable", "amount of liquid, apparatus, temperature and repeats kept the same"],
      "<b>Model answer:</b> Method: pour each liquid through the same funnel into a measuring cylinder and time how long a fixed volume, 100 mL, takes to pass through; repeat each liquid three times and average. The variable changed is the liquid itself (water, cooking oil, honey). The variable measured is the flow time: the longest time means the highest viscosity. Kept the same: the volume of liquid (100 mL), the funnel and cylinder, the temperature of the liquids (all left in the same room), and the person timing with the same start and stop rule. Averaging repeats protects the comparison from one mistimed run. The liquids can then be ranked by their average times.<br><br><b>Marking points:</b> 1 mark for a workable comparison method. 1 mark for the changed variable (the liquid) and the measured variable (flow time or distance) correctly named. 1 mark for at least two variables kept the same. 1 mark for fairness and repeatability (repeats, averaging, or an identical start and stop rule).",
      {});
  }
]), ["Design it like the core lab, but make the controls explicit: that is where the marks are.", "Four parts: method, changed, measured, kept the same, plus fairness."]);

/* ---------- SC8.6.6 Interpreting patterns in data ---------- */

E("s8-u2-pattern", 2, ["SC8.6.6"], 1, "var", varset([
  function () {
    var q = mcq("The graph shows the flow time of the same oil measured at five temperatures. Which statement interprets the pattern correctly?",
      "As the temperature increases, the flow time decreases: warmer oil is less viscous",
      ["As the temperature increases, the flow time increases: warmer oil is more viscous",
       "Temperature and flow time are unrelated in this data",
       "The flow time changes, but viscosity stays the same at every temperature"],
      "The line falls steadily: higher temperatures come with shorter flow times. Flow time is the lab's stand-in for viscosity, so the pattern reads: warming the oil lowers its viscosity, the relationship the particle theory predicts.",
      {});
    q.figure = s8LineGraphSVG([10, 20, 30, 40, 50], [42, 31, 23, 17, 12], "Temperature (degrees C)", "Flow time (s)");
    return q;
  }
]), ["Read the line's direction first, then translate flow time into viscosity.", "Falling time means falling viscosity."]);

E("s8-u2-cr-data-infer", 2, ["SC8.6.6"], 2, "var", varset([
  function () {
    return textq("A class measures two unknown materials. Material A: a 20 cm3 sample has a mass of 54 g, and a 40 cm3 sample has a mass of 108 g. Material B: a 20 cm3 sample has a mass of 16 g, and a 40 cm3 sample has a mass of 32 g. (a) Calculate each material's density. (b) Infer, with reasons, which material would float in water and which would sink. (c) State the pattern in the data that tells you each density is a property of the material, not of the sample size. (3 marks)",
      ["material A is 2.7 g/cm3 and material B is 0.8 g/cm3", "A sinks and B floats, by comparison with water at 1.00 g/cm3", "doubling the volume doubles the mass, so the ratio stays constant"],
      "<b>Model answer:</b> (a) Material A: D = 54 g / 20 cm3 = 2.7 g/cm3. Material B: D = 16 g / 20 cm3 = 0.8 g/cm3. (b) Water's density is 1.00 g/cm3. Material A, at 2.7 g/cm3, is denser than water and sinks; Material B, at 0.8 g/cm3, is less dense and floats. (c) In both materials, doubling the volume exactly doubles the mass, so the mass-to-volume ratio is the same for both sample sizes: the density is constant for the material, which is what makes it a property of the material rather than of the piece measured.<br><br><b>Marking points:</b> 1 mark for both densities calculated. 1 mark for the float and sink inference tied to water's density. 1 mark for the constant-ratio pattern (volume and mass doubling together).",
      {});
  }
]), ["Calculate first, compare with water second, then look at what stays constant across the sample sizes.", "The pattern to name is in how mass grows with volume."]);

/* ---------- SC8.6.7 Using instruments effectively and accurately (CORE) ---------- */

E("s8-u2-instruments", 2, ["SC8.6.7"], 1, "var", varset([
  function () {
    return mcq("A student is measuring the volume of a liquid in a graduated cylinder for a density calculation. Which practice gives an accurate reading?",
      "Place the cylinder on a level surface and read the bottom of the meniscus at eye level",
      ["Hold the cylinder up to the light and read the top of the meniscus from above",
       "Read the scale from wherever you are standing, since the numbers are large",
       "Estimate between the marks quickly before the liquid settles"],
      "Accurate instrument use is a set of habits: a level surface so the liquid sits true, eye level so the reading is not shifted by the viewing angle, and the bottom of the meniscus (the curve the liquid's surface makes) as the reading point. The bank carries this one entry; instrument handling itself is classroom assessment.",
      {});
  }
]), ["Level surface, eye level, bottom of the curve: three habits, one option has them all.", "Reading from above or below shifts the value: parallax."]);

/* ---------- SC8.6.8 Water displacement for irregular volumes (CORE) ---------- */

E("s8-u2-displacement", 2, ["SC8.6.8"], 1, "var", varset([
  function () {
    return mcq("Which procedure correctly determines the volume of an irregularly shaped stone by water displacement?",
      "Record the water level in a graduated cylinder, lower the stone in gently until it is fully submerged, record the new level, and subtract",
      ["Drop the stone into a full beaker and weigh the stone again while it is wet",
       "Measure the stone's length, width and height with a ruler and multiply",
       "Float the stone on the water and read the level where it sits"],
      "Displacement works because the submerged stone pushes aside its own volume of water. The rise in level, final minus initial, is that volume. The stone must be fully submerged and lowered gently so no water splashes out; a ruler cannot capture an irregular shape, and a stone does not float.",
      {});
  }
]), ["The volume is the rise. Which option actually measures a rise?", "Fully submerged, gently lowered, subtract the levels."]);

E("s8-u2-displacement-error", 2, ["SC8.6.8"], 3, "var", varset([
  function () {
    return mcq("A group determines a metal cube's volume by displacement and gets 14 mL, but calculating from the cube's measured sides gives 27 cm3. Their notes say the cube 'stuck out of the water a little' in the cylinder, which was also too narrow, so the cube wedged against the sides. Which judgement best evaluates their displacement result?",
      "The displacement value is invalid: the cube was not fully submerged, so it displaced less than its full volume, and the wedging made it worse; they need a wider container and full submersion",
      ["The displacement value is better, because water never lies, so the side measurements must be wrong",
       "Both values should be averaged to give the true volume",
       "The difference is unimportant, because volume does not affect the density calculation that follows"],
      "Judging a procedure means checking it against its own requirements. Displacement only equals volume when the object is fully submerged; a cube poking out displaces part of itself, so 14 mL understates the volume, and the direction of the error confirms the diagnosis. Averaging a valid value with an invalid one just contaminates the density that follows.",
      {});
  }
]), ["Displacement has one non-negotiable condition. Was it met?", "Partly out means partly displaced: the error's direction gives it away."]);

E("s8-u2-cr-displacement-calc", 2, ["SC8.6.8"], 2, "var", varset([
  function () {
    return textq("A student investigates an irregular metal object. She records the water in a graduated cylinder at 150 mL, lowers the object in until it is fully submerged, and reads 175 mL. The object's mass, from a balance, is 135 g. (a) State the object's volume. (b) Calculate its density. (c) Using the density table from this unit (aluminum 2.70 g/cm3, iron 7.87 g/cm3, lead 11.34 g/cm3), state what the object is most likely made of, and one check she should make on her displacement reading before trusting the conclusion. (3 marks)",
      ["the volume is 25 cm3 from the rise in the water level", "the density is 5.4 g/cm3 from mass divided by volume", "no exact match in the table, with a validity check on the reading"],
      "<b>Model answer:</b> (a) The volume is the rise in level: 175 mL - 150 mL = 25 mL = 25 cm3. (b) D = m/V = 135 g / 25 cm3 = 5.4 g/cm3. (c) At 5.4 g/cm3 the object does not match any listed metal exactly; it sits between aluminum (2.70) and iron (7.87), so the honest conclusion is that it is not pure aluminum, iron or lead, and may be an alloy or a coated object. Before trusting even that, she should check the displacement reading itself: confirm the object was fully submerged with no air bubbles clinging to it, since trapped air would inflate the volume and distort the density.<br><br><b>Marking points:</b> 1 mark for the volume from the rise in level. 1 mark for the density calculation with units. 1 mark for a conclusion that respects the table (no exact match, so no forced identification) together with a validity check on the reading.",
      {});
  }
]), ["Volume from the rise, density from the formula, and a conclusion that does not claim more than the table supports.", "A value between two table entries is a finding, not a failure."]);

/* ---------- SC8.6.10 Calculating density (skills) ---------- */

E("s8-u2-sk-calc-density", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 1.1, 1.4, 1.6, 2.2, 2.7, 3.0]);
  var V = pick([10, 20, 25, 50]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(D, [D * 2, D / 2, V / m * 10, D + 0.5, m / (V - 5)]);
  return mcq("In the density lab, a group's sample has a mass of " + s8n(m) + " g and a volume of " + V + " cm3 (measured by displacement). Calculate the sample's density.",
    s8n(D) + " g/cm3",
    dis.map(function (d) { return s8n(d) + " g/cm3"; }),
    "D = m/V = " + s8n(m) + " g / " + V + " cm3 = " + s8n(D) + " g/cm3. Lab calculations use the same formula as every other density question; only the source of the volume (displacement) is new.",
    {});
}, ["Same formula, lab clothing: density = mass / volume.", "The displacement work is already done; the volume is given."]);

E("s8-u2-sk-calc-mass", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 0.9, 1.0, 1.2, 1.5]);
  var V = pick([30, 60, 120, 250, 400]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(m, [m * 2, m / 2, D + V, V - D, m + 15]);
  return mcq("A technician must pour out a liquid of density " + s8n(D) + " g/mL so that the sample's mass is exact for a test. What mass will " + V + " mL of the liquid have?",
    s8n(m) + " g",
    dis.map(function (d) { return s8n(d) + " g"; }),
    "m = D x V = " + s8n(D) + " g/mL x " + V + " mL = " + s8n(m) + " g. Multiplying the per-millilitre mass by the number of millilitres gives the total mass.",
    {});
}, ["Mass = density x volume, the rearranged form.", "A few hundred millilitres should give a mass well above the density number."]);

E("s8-u2-sk-calc-volume", 2, ["SC8.6.10"], 2, "gen", function () {
  var D = pick([0.8, 1.0, 1.2, 1.5, 2.0, 2.5]);
  var V = pick([15, 30, 45, 60, 90]);
  var m = Math.round(D * V * 100) / 100;
  var dis = s8dis(V, [V * 2, V / 2, m * D / 2, m - D * 10, V + 10]);
  return mcq("A sample of a liquid has a mass of " + s8n(m) + " g. The liquid's density is " + s8n(D) + " g/mL. What volume does the sample occupy?",
    s8n(V) + " mL",
    dis.map(function (d) { return s8n(d) + " mL"; }),
    "V = m/D = " + s8n(m) + " g / " + s8n(D) + " g/mL = " + s8n(V) + " mL. Dividing the total mass by the mass in each millilitre counts the millilitres.",
    {});
}, ["Volume = mass / density, the third form.", "Check by multiplying back: volume x density should return the mass."]);

E("s8-u2-units", 2, ["SC8.6.10"], 1, "var", varset([
  function () {
    return mcq("Which pairing of quantity and unit expression is correct throughout?",
      "The density of a liquid is expressed in g/mL, and the density of a solid in g/cm3, with 1 mL equal to 1 cm3",
      ["The density of a liquid is expressed in g/cm3 only, and solids in mL/g",
       "Density is expressed in grams for liquids and newtons for solids",
       "Volume of a solid is expressed in mL and volume of a liquid in cm3, and the two never convert"],
      "The guide's convention: a fluid's density is expressed in g/mL and a solid's in g/cm3, and since 1 mL = 1 cm3 the numbers are directly comparable, which is why a solid's density can be set against water's 1.00 either way. Units are part of the calculation, not decoration after it.",
      {});
  }
]), ["One conversion makes the whole system work: 1 mL = 1 cm3.", "Liquids take mL, solids take cm3, and the two units are equal in size."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U2 = {
  "s8-u2-cr-design-viscosity": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });
