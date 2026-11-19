// CRMARKS: sci-u4-cr-cycle=4
// CRMARKS: sci-u4-cr-bioaccum=3
// CRMARKS: sci-u4-cr-scene=3
// CRMARKS: sci-u4-cr-soil=2
// CRMARKS: sci-u4-cr-biodiv=2
/* Science 1206 Unit 4: Sustainability of Ecosystems (SC10.10.1 to 10.8). */

/* ---------- SC10.10.1 Ecological organization, biotic and abiotic ---------- */

E("sci-u4-organization", 4, ["SC10.10.1"], 1, "var", varset([
  function () {
    return mcq("All the caribou in the George River herd form a",
      "population: all the members of one species living in an area at one time",
      ["community: all the different species in an area", "ecosystem: a community plus its abiotic factors", "biome: a large region with a characteristic climate"],
      "One species, one place, one time: population. Add the other species and it becomes a community; add the non-living environment and it becomes an ecosystem; scale up to a climate region and it is a biome.", {});
  },
  function () {
    return mcq("A pond's community plus the water, sunlight, dissolved oxygen and mud it interacts with is called",
      "an ecosystem: the living community together with the abiotic factors it exchanges matter and energy with",
      ["a population: all the members of one species living together in that pond at the same time", "a habitat only: just the place where one organism lives, without the community around it", "a biosphere: all the ecosystems of Earth combined, taking in every region where life exists"],
      "Ecosystem = community + abiotic environment, with the interactions counted. A habitat is just the place an organism lives; the biosphere is the global sum of all ecosystems.", {});
  },
  function () {
    return mcq("Which list contains only abiotic factors?",
      "Temperature, sunlight, soil pH, dissolved oxygen and wind",
      ["Bacteria, fungi, temperature, sunlight and rainfall", "Soil pH, algae, wind, rainfall and pond water depth", "Predators, prey, temperature, water and dissolved gases"],
      "Abiotic means non-living: physical and chemical conditions. Bacteria, fungi, algae, predators and prey are all living (biotic), whatever list they sneak into.", {});
  }
]), ["One species is a population; all the species are a community; community plus the non-living world is an ecosystem."]);

E("sci-u4-niche-habitat", 4, ["SC10.10.1"], 2, "var", varset([
  function () {
    return mcq("An organism's niche is best described as",
      "its role in the ecosystem: what it eats, what eats it, where and when it is active, and how it interacts with other organisms and factors",
      ["the exact physical spot where it sleeps, shelters from weather and returns each night, with nothing about feeding or interactions", "the size of its territory and the boundaries it defends against rivals of its own species throughout the breeding season", "the species it belongs to, along with the scientific name used to classify it among all the other living organisms"],
      "Habitat is the address; niche is the job description. Two species can share a habitat, but if their niches overlap completely, competition sharpens until one wins out.", {});
  },
  function () {
    return mcq("A moose's habitat, stated properly, is",
      "the boreal forest and wetland environment where it lives and finds food, water and shelter",
      ["eating shrubs and aquatic plants, the foods it spends much of its day gathering and chewing", "being prey for wolves and bears, which hunt it across its range through the seasons", "competing with caribou for browse in the places where their feeding ranges overlap"],
      "Habitat names the place and its conditions. Eating, being eaten and competing are interactions, parts of the niche instead. Mixing the two lists is the classic slip.", {});
  }
]), ["Habitat is where; niche is what it does there."]);

/* ---------- SC10.10.2 Populations ---------- */

E("sci-u4-growth-curves", 4, ["SC10.10.2"], 2, "gen", function () {
  var K = s6pick([400, 600, 800, 1000]);
  var rE = Math.log(0.8 * (K + 200) / 8) / 40;
  var lines = [
    { fn: function (x) { return K / (1 + Math.exp(-0.16 * (x - 18))) + 5; }, col: S6_ACC, label: "L", labelPt: [35, K * 0.8] },
    { fn: function (x) { return 8 * Math.exp(rE * x); }, col: S6_ALT, label: "E", labelPt: [31, 8 * Math.exp(rE * 31) * 0.75] }
  ];
  var fig = s6GraphSVG({ xMax: 40, yMax: K + 200, xStep: 10, yStep: s6niceStep(K + 200), xLab: "time", yLab: "population size", lines: lines });
  var mode = s6pick(["which", "capacity", "phase"]);
  var q;
  if (mode === "which") {
    q = mcq("Two populations are graphed. Curve L levels off while curve E climbs ever more steeply. Curve L shows",
      "logistic growth: the population grows quickly, then levels at the environment's carrying capacity as limiting factors bite",
      ["exponential growth with no limits: the population keeps doubling, with no ceiling in sight, year after year", "a population going extinct: numbers fall steadily until no individuals are left alive to reproduce at all", "growth controlled only by predators arriving late: numbers rise until hunters alone bring them down"],
      "The S-curve is logistic: early exponential-like growth, then a ceiling. The ceiling is the carrying capacity, the population the environment can sustain with its food, space and other limits. Curve E is the unbounded exponential (J-curve).", { mode: mode });
  } else if (mode === "capacity") {
    q = mcq("From curve L on the graph, the carrying capacity of this environment for the population is approximately",
      K + " individuals: the level where the curve flattens",
      [(K + 400) + " individuals", Math.round(K / 2) + " individuals: the halfway point of the rise", " impossible to read from a growth curve"],
      "Carrying capacity is read where growth stops: the plateau. Curve L flattens at about " + K + ", so the environment sustains roughly " + K + " individuals of this species over the long term.", { mode: mode, K: K });
  } else {
    q = mcq("A population introduced to a new island with plentiful food and no predators at first follows the pattern of curve E. The realistic long-term expectation is that",
      "growth will slow and level off (switching to the logistic pattern) as food, space and waste limits appear",
      ["growth will stay exponential forever, because nothing eats them and limits never develop over time", "the population will stop growing the moment food drops by any amount, falling straight back to its starting size", "the population will return to zero on its own, with every individual dying out within a few years"],
      "Exponential growth is always a temporary chapter: resources are finite, so limiting factors eventually bend the J into an S. Island introductions (rabbits, deer, and locally, moose in Newfoundland's history) show the boom first and the limits later.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["J-curve is exponential (no limits yet); S-curve is logistic (limits reached); the plateau is the carrying capacity."]);

E("sci-u4-pop-change", 4, ["SC10.10.2"], 2, "gen", function () {
  var start = s6pick([850, 1200, 2400]);
  var B = s6pick([120, 200, 340]), D = s6pick([80, 150, 210]), I = s6pick([30, 45, 60]), E2 = s6pick([25, 40, 55]);
  var end = start + B - D + I - E2;
  var mode = s6pick(["end", "factor"]);
  if (mode === "end") {
    return mcq("A snowshoe hare population starts the year at " + s6fmt(start) + ". Over the year: " + B + " are born, " + D + " die, " + I + " immigrate in and " + E2 + " emigrate out. The year-end population is",
      s6fmt(end), [s6fmt(start + B - D), s6fmt(start + B + D + I + E2), s6fmt(end + D)],
      "Change = (births + immigration) - (deaths + emigration) = (" + B + " + " + I + ") - (" + D + " + " + E2 + ") = " + (B + I - D - E2) + ". " + s6fmt(start) + " + (" + (B + I - D - E2) + ") = " + s6fmt(end) + ". Arrivals add and departures subtract, whatever door they use.", { end: end });
  }
  return mcq("In the hare population data (" + B + " births, " + D + " deaths, " + I + " immigrating, " + E2 + " emigrating), which pair of factors INCREASES the population?",
    "Births and immigration: both add individuals to the population",
    ["Births and emigration: one adds individuals, one removes them", "Deaths and immigration: one removes individuals, one adds them", "Deaths and emigration: both remove individuals from the population"],
    "Two doors in (birth, immigration) and two doors out (death, emigration). Net growth happens only when the in-door total beats the out-door total.", { mode: mode });
}, ["Population change is bookkeeping: (births + immigration) - (deaths + emigration)."]);

E("sci-u4-limiting", 4, ["SC10.10.2"], 2, "var", varset([
  function () {
    return mcq("A disease spreads through a dense caribou herd, killing a larger fraction of animals than it would in a scattered herd. Disease here is a",
      "density-dependent limiting factor: its impact grows as the population gets more crowded",
      ["density-independent factor: it strikes the same regardless of crowding", "an abiotic factor", "a carrying capacity"],
      "Density-dependent factors (disease, competition, predation pressure) bite harder as density rises, which is what makes them regulators. A flood or a hard frost is density-independent: it takes its share of a sparse herd and a dense one alike.", {});
  },
  function () {
    return mcq("A late-June frost kills half the new growth on blueberry barrens across the whole region, in crowded patches and sparse ones alike. The frost acts as a",
      "density-independent limiting factor: its effect does not depend on how crowded the plants are",
      ["density-dependent factor: its impact grows stronger as the population gets more crowded", "form of competition: plants in crowded patches struggle against each other for light and water", "predator: another organism that attacks the plants and kills a share of them outright"],
      "Weather events are the standard density-independent examples: the fraction harmed is set by exposure, not by population density. They can crash a population, but they do not regulate it smoothly the way density-dependent factors do.", {});
  },
  function () {
    return mcq("As a moose population grows toward the carrying capacity of its range, the growth rate slows mainly because",
      "limiting factors (food shortage, competition, parasites) raise deaths and lower births until gains and losses balance",
      ["moose decide to reproduce less for the good of the herd, spacing their calves on purpose as the range fills up", "the population reaches a fixed age and stops, like an individual animal that has finished growing for good", "immigration becomes physically impossible, because the range is sealed off and no new moose can enter it at all"],
      "No planning is involved: scarcer browse per animal means poorer condition, fewer calves and more deaths. The balance point where births plus immigration equal deaths plus emigration is the carrying capacity in action.", {});
  }
]), ["Sort limiting factors by one question: does the impact grow with crowding?"]);

/* ---------- SC10.10.3 Cycles of matter ---------- */

E("sci-u4-carbon-cycle", 4, ["SC10.10.3"], 2, "gen", function () {
  var ask = s6pick([1, 2, 3, 4, 5, 6, 7]);
  var names = { 1: "photosynthesis: plants draw carbon dioxide out of the air and lock its carbon into sugars", 2: "feeding: animals take in carbon by eating plants (or other animals)", 3: "respiration by animals: carbon returns to the air as carbon dioxide", 4: "respiration by plants: some of the plant's carbon returns to the air as carbon dioxide", 5: "death and waste: carbon passes to decomposers in dead material and droppings", 6: "decay: decomposers release carbon back to the air as carbon dioxide", 7: "combustion: burning fossil fuels releases stored carbon as carbon dioxide" };
  var others = [1, 2, 3, 4, 5, 6, 7].filter(function (n) { return n !== ask; });
  var dis = s6shuf(others).slice(0, 3).map(function (n) { return names[n]; });
  var q = mcq("The diagram numbers the processes of the carbon cycle. Process " + ask + " is",
    names[ask], dis,
    "Trace the arrow for process " + ask + ": " + names[ask] + ". The cycle has no start and no waste pile: every arrow is carbon changing hands between the air, living things, and the ground.",
    { ask: ask });
  q.figure = s6CycleSVG();
  return q;
}, ["Follow the arrow's direction: into a box stores carbon there; out of a box releases it."]);

E("sci-u4-nitrogen", 4, ["SC10.10.3"], 2, "var", varset([
  function () {
    return mcq("Plants cannot use nitrogen gas (N2) directly from the air, even though air is 78 percent nitrogen. The step that makes nitrogen usable is",
      "nitrogen fixation: certain bacteria (and lightning) convert N2 into compounds such as ammonia and nitrates that plants can absorb",
      ["photosynthesis by the plant's leaves, which pulls nitrogen gas in through the leaf pores along with carbon dioxide", "respiration in the roots, which breaks the strong bonds in nitrogen gas while the roots take up soil water", "evaporation of soil water, which leaves the nitrogen from the air dissolved in the topsoil for the roots"],
      "The triple bond in N2 is too strong for most organisms to break. Fixing bacteria, many living in legume root nodules, do the chemistry; that is why clover and alders enrich a soil and why farmers rotate legumes.", {});
  },
  function () {
    return mcq("Denitrification is the part of the nitrogen cycle that",
      "returns nitrogen to the atmosphere: bacteria in waterlogged soil convert nitrates back into nitrogen gas",
      ["builds proteins inside animal bodies, using nitrogen taken in when animals eat plants or other animals", "adds nitrate fertilizer to fields, as farmers spread stored nitrogen compounds on their crops each spring", "converts ammonia into plant food, changing one usable nitrogen compound into another in the soil"],
      "The cycle closes where it opened: denitrifying bacteria turn nitrates back into N2 gas, balancing the fixers. Waterlogged soils (bogs and wetlands, common here) are denitrification hotspots.", {});
  },
  function () {
    return mcq("Excess nitrogen fertilizer washing off fields into a pond most directly causes",
      "an algal bloom: the added nitrogen (with phosphorus) removes the nutrient limit on algae, which multiply, die and decay, using up the water's oxygen",
      ["the pond water to become sterile, killing all the algae and other life in it as soon as the fertilizer arrives in the runoff", "nitrogen gas to bubble out until the pond is empty of nitrogen, leaving the water unable to support any algal growth at all", "fish to grow faster with no downside, feeding on the extra algae and thriving as the pond grows richer in nutrients each year"],
      "Nitrogen is a limiting nutrient in most fresh water, so adding it lifts the limit. The bloom's decay is the oxygen problem: decomposers consume dissolved oxygen faster than it is replaced, and fish suffocate in water full of life gone wrong (eutrophication).", {});
  }
]), ["Nitrogen's problem is access: fixation opens the door, denitrification closes the loop."]);

E("sci-u4-cycle-reason", 4, ["SC10.10.3"], 3, "var", varset([
  function () {
    return mcq("Cutting down a forest and burning the wood affects the carbon cycle in two ways that both raise atmospheric carbon dioxide. The two ways are",
      "combustion releases the trees' stored carbon at once, and removing the trees ends their photosynthesis, so less carbon dioxide is drawn back out",
      ["the soil stops producing carbon dioxide entirely, so the ground under the cleared forest stops releasing carbon at all", "rainfall over the region becomes carbonated, carrying the extra carbon back down to the ground in every storm that follows", "animals move in and breathe harder, and their extra respiration becomes the main source of new carbon dioxide in the region"],
      "A standing forest is both a store and a pump. Burning empties the store in days; clearing stops the pump for decades. Either alone raises CO2; together they are the double effect that makes deforestation a major term in the carbon budget.", {});
  },
  function () {
    return mcq("Peat bogs cover large areas of Newfoundland and Labrador and matter to the global carbon cycle because",
      "waterlogged, acidic peat slows decay almost to a stop, locking carbon away in the ground for thousands of years",
      ["peat produces oxygen faster than forests, pulling extra carbon out of the air through the bog plants each summer", "bogs convert carbon dioxide directly into peat fuel for export, storing it in harvested blocks burned elsewhere", "bog water dissolves carbon dioxide permanently, holding it in the dark water so it can never return to the air"],
      "Decay needs what a bog denies: oxygen and warmth. Plant material sinks into cold, airless water and accumulates as peat instead of rotting back to CO2, making northern peatlands one of the planet's great long-term carbon stores. Draining or burning peat reverses the storage.", {});
  }
]), ["Cycles questions come down to stores and flows: what holds the element, and which arrows speed up or slow down."]);

/* ---------- SC10.10.4 Soil ---------- */

E("sci-u4-soil", 4, ["SC10.10.4"], 1, "var", varset([
  function () {
    return mcq("From the surface downward, the usual order of soil horizons is",
      "O (organic litter), A (topsoil), B (subsoil), C (parent material), over bedrock",
      ["A (topsoil), O (litter), C (parent material), B (subsoil), over bedrock", "Bedrock, C (parent material), B (subsoil), A (topsoil), O (litter), from the top", "Topsoil, bedrock, subsoil, litter, then parent material, in that order down"],
      "Soil is built in layers: dead material on top, dark humus-rich topsoil where most roots and organisms live, paler subsoil where washed-down minerals collect, then broken parent rock. Remember 'O-A-B-C' from the surface down.", {});
  },
  function () {
    return mcq("Topsoil (the A horizon) is the most valuable layer for plants because it",
      "contains the humus (decayed organic matter) that holds nutrients and water, plus most of the soil's living organisms",
      ["is the deepest layer, closest to groundwater, lying below the subsoil and the parent material in the profile", "is made of pure sand that drains fastest, with coarse grains that hold neither water nor nutrients for roots", "contains no organisms to compete with roots, so plants grow in a clean layer free of microbes and worms"],
      "Humus is the soil's bank account: it stores nutrients, holds moisture and feeds the microbes that cycle matter. Lose the A horizon to erosion and the land's productivity goes with it, which is why topsoil loss is treated as a slow emergency.", {});
  },
  function () {
    return mcq("Leaching in soil refers to",
      "water percolating down through the soil and carrying dissolved minerals and nutrients with it, out of the upper horizons",
      ["plants pulling water upward against gravity, carrying dissolved minerals from deep soil up into their leaves", "earthworms mixing the horizons together, dragging surface material down and bringing subsoil up as they burrow", "frost heaving stones to the surface, pushing buried rocks upward through the soil a little more each winter"],
      "Heavy rainfall regions (including this province) leach their soils steadily: nutrients wash from the A horizon into the B, leaving acidic, nutrient-poor topsoil. It is one reason local garden soils need lime and feeding.", {});
  }
]), ["O, A, B, C from the top down; the A horizon is where the value is."]);

E("sci-u4-soil-ph", 4, ["SC10.10.4"], 2, "var", varset([
  function () {
    return mcq("Most garden and farm plants grow best in soil that is",
      "slightly acidic to neutral (about pH 6.0 to 7.0): at that range, essential nutrients stay available to roots",
      ["strongly acidic (pH 3 to 4): roots thrive in very sour soil, and nutrients stay fully available there", "strongly alkaline (pH 10 to 11): roots thrive in very limy soil, and nutrients stay available there", "any pH at all: pH does not affect plants, and roots take up the same nutrients equally well in any soil"],
      "Soil pH controls nutrient availability, not just comfort: in strongly acidic soil, aluminum becomes soluble (toxic) and phosphorus locks up; in strongly alkaline soil, iron and manganese lock up instead. The middle range keeps the pantry open.", {});
  },
  function () {
    return mcq("Newfoundland garden soils are often too acidic for vegetables. The standard correction is to add",
      "crushed limestone (lime): a base that neutralizes some of the soil acidity and raises the pH toward neutral",
      ["sulfur, to lower the pH further: a treatment that pushes acidic soil in the direction it already leans", "peat moss, to acidify the soil: a material gardeners use when they want a soil to become more acidic", "extra rainwater collected in barrels: stored rain is slightly acidic and is added to the beds each week"],
      "Liming is neutralization applied to a field: calcium carbonate reacts with soil acids (the same chemistry as Unit 2's antacid). Peat and sulfur push pH the wrong way for this problem.", {});
  },
  function () {
    return mcq("Acid precipitation harms forests partly through the soil: as soil acidifies,",
      "toxic aluminum is released from soil minerals and damages roots, while nutrient cations such as calcium and magnesium leach away faster",
      ["the soil becomes so basic that roots dissolve, as the acid rain turns the topsoil strongly alkaline over time", "all soil bacteria multiply beyond control, feeding on the extra acid and crowding out the roots of the trees", "the horizons physically swap places, with the subsoil rising above the topsoil as acid works down the profile"],
      "Acid rain's damage runs underground: hydrogen ions displace nutrient cations (washed away by leaching) and free aluminum that healthy soil keeps locked up. Trees then starve and weaken even if the rain never touches their leaves.", {});
  }
]), ["Soil pH is a nutrient-availability switch: lime raises it, and the province's soils usually need exactly that."]);

/* ---------- SC10.10.5 Bioaccumulation ---------- */

E("sci-u4-bioaccum-table", 4, ["SC10.10.5"], 3, "gen", function () {
  var base = s6pick([0.002, 0.005, 0.01, 0.02]);
  var factor = 10;
  var levels = ["Water fleas (zooplankton)", "Capelin (small fish)", "Cod (larger fish)", "Harbour seal"];
  var conc = levels.map(function (_, i) { return base * Math.pow(factor, i); });
  var mode = s6pick(["top", "factor", "whyrisk"]);
  function fmt(v) { return v < 0.1 ? v.toFixed(3) : (v < 1 ? v.toFixed(2) : String(Math.round(v * 10) / 10)); }
  var tableTxt = "Concentrations of a persistent pesticide in a harbour food chain: " + levels.map(function (n, i) { return n + " " + fmt(conc[i]) + " ppm"; }).join("; ") + ".";
  if (mode === "top") {
    var key = fmt(conc[3]) + " ppm";
    return mcq(tableTxt + " The concentration in the harbour seal is",
      key, s6dis(key, [fmt(conc[2]) + " ppm", fmt(conc[3] * 10) + " ppm", fmt(base * 4) + " ppm", fmt(conc[1]) + " ppm"], 3),
      "Each trophic step multiplies the concentration by about 10: " + fmt(base) + " → " + fmt(conc[1]) + " → " + fmt(conc[2]) + " → " + fmt(conc[3]) + " ppm. The seal carries roughly 1000 times the water fleas' concentration.",
      { mode: mode });
  }
  if (mode === "factor") {
    return mcq(tableTxt + " By what factor is the pesticide concentrated from the water fleas to the harbour seal?",
      "1000 times: three trophic transfers at about 10 times each (10 x 10 x 10)",
      ["10 times: only one trophic transfer at about 10 times, with no compounding at all", "30 times: three trophic transfers added together, 10 plus 10 plus 10 in total", "4 times: one for each level listed, counting the levels instead of the transfers"],
      "Count the arrows, not the animals: flea to capelin (x10), capelin to cod (x10), cod to seal (x10). Three multiplications of 10 compound to 1000. This compounding is the magnification in biomagnification.", { mode: mode });
  }
  return mcq(tableTxt + " The seal faces the greatest risk from this pesticide mainly because",
    "it sits at the top of the chain: it eats many contaminated cod over a long life, and the persistent chemical is stored in fat faster than the body can break it down or excrete it",
    ["seals drink more harbour water than fish do, taking in the pesticide directly from the water in far larger daily amounts than any fish in the harbour", "the pesticide is produced inside seal tissue as the seal digests its food, so each seal makes its own supply rather than receiving it from its prey", "seals have no predators to keep their numbers down, so their growing population crowds the harbour until every seal shares the same contaminated water"],
    "Two ingredients make biomagnification dangerous: the chemical persists (it is not broken down), and each predator concentrates what its many prey carried. Long-lived top consumers collect the whole chain's burden.", { mode: mode });
}, ["Count the arrows between levels and multiply by ten for each: the top of the chain collects everything."]);

E("sci-u4-bioaccum-concepts", 4, ["SC10.10.5"], 2, "var", varset([
  function () {
    return mcq("Bioaccumulation and biomagnification differ in that",
      "bioaccumulation is the build-up of a substance inside one organism over its life; biomagnification is the increasing concentration at higher trophic levels of a food chain",
      ["bioaccumulation happens only in water, biomagnification only on land, and neither process can cross between the two environments in a food chain", "biomagnification is the build-up inside one organism over its life, while bioaccumulation is the rising concentration at higher trophic levels", "they are two names for exactly the same process, used for build-up in a single organism and for rising levels across a whole food chain alike"],
      "One organism versus the whole chain: a mussel accumulating metals from the water is bioaccumulation; the gull eating a thousand mussels and ending with far higher levels is biomagnification. The seal table question shows the chain effect.", {});
  },
  function () {
    return mcq("DDT was banned in Canada after it was linked to thinning eggshells in eagles and falcons. The birds were exposed so heavily because",
      "DDT persists in the environment and biomagnifies: top predators ate many contaminated prey, concentrating the chemical until it interfered with calcium use in eggshells",
      ["farmers sprayed DDT directly on the birds' nests, coating the eggs each spring when sprayers passed the fields and woodlands near the nesting sites", "the birds drank DDT from puddles on farms, where rainwater collected the spray in low spots the birds visited daily through the breeding season", "DDT was fed to the birds as medicine, given to nesting pairs by workers who believed it would protect the birds from insect pests in the nest"],
      "The birds were never the target and never touched the spray: the food chain delivered the dose. Persistence plus trophic magnification is exactly the combination that makes a 'safe at low levels' chemical dangerous at the top.", {});
  },
  function () {
    return mcq("Mercury advisories tell people to limit how much large predatory fish (such as shark or swordfish) they eat, especially during pregnancy, because",
      "methylmercury biomagnifies, so long-lived top predators carry the highest mercury levels, and mercury damages the developing nervous system",
      ["large fish are harder to cook safely, so home cooks often serve them before the mercury in the flesh has been cooked out", "mercury evaporates from small fish before they are caught, so only the largest fish still contain mercury when they reach a net or a hook", "the advisories are about the fish's own health, warning people not to eat fish that are themselves sick from mercury in their bodies"],
      "Same pattern, different chemical: emissions become methylmercury in water, plankton take it up, and each trophic step multiplies it. A top predator's flesh can carry a million times the water's concentration, which is why size and trophic level, not freshness, drive the advice.", {});
  }
]), ["Persistence plus a food chain equals magnification: the top consumer always gets the largest dose."]);

/* ---------- Food webs (drawn) ---------- */

function s6WebSVG() {
  function box(x, y, label, fill) {
    return '<rect x="' + x + '" y="' + y + '" width="98" height="24" rx="5" fill="' + (fill || "#eef4ef") + '" stroke="' + S6_INK + '"/>' + s6txt(x + 49, y + 16, label, 11);
  }
  function arrow(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + S6_ALT + '" stroke-width="2" marker-end="url(#ah)"/>';
  }
  var s = '<svg viewBox="0 0 420 260" width="410" role="img" aria-label="A simple food web. Arrows point from the organism eaten to the eater.">';
  s += '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 Z" fill="' + S6_ALT + '"/></marker></defs>';
  s += box(30, 210, "Shrubs & grasses", "#e6f0e6"); s += box(165, 210, "Berries & seeds", "#e6f0e6"); s += box(300, 210, "Aquatic plants", "#e6f0e6");
  s += box(30, 140, "Snowshoe hare"); s += box(165, 140, "Field mouse"); s += box(300, 140, "Tadpole");
  s += box(95, 70, "Red fox"); s += box(240, 70, "Great horned owl"); s += box(310, 70, "Frog");
  s += box(165, 8, "Lynx");
  s += arrow(79, 210, 79, 166); s += arrow(214, 210, 214, 166); s += arrow(349, 210, 349, 166);
  s += arrow(100, 140, 130, 96); s += arrow(230, 140, 262, 96); s += arrow(349, 140, 349, 96);
  s += arrow(90, 70, 190, 34); s += arrow(215, 140, 150, 96); s += arrow(290, 70, 240, 34);
  s += s6txt(8, 18, "Arrows point from food to eater", 10, false, "start", "#666");
  s += "</svg>";
  return s;
}
E("sci-u4-foodweb", 4, ["SC10.10.1", "SC10.10.2"], 2, "gen", function () {
  var mode = s6pick(["producer", "topeater", "remove", "energy"]);
  var q;
  if (mode === "producer") {
    q = mcq("In the food web shown, the producers are",
      "shrubs and grasses, berries and seeds, and aquatic plants: they make their own food by photosynthesis and every arrow of energy starts with them",
      ["the snowshoe hare, field mouse and tadpole: the first consumers in the web, feeding directly on the producers at the base", "the red fox and the lynx: two predators near the top of the web, hunting the smaller consumers that feed on plants", "the great horned owl and the frog: two consumers in the middle of the web, catching and eating other animals for food"],
      "Producers sit at the base and have only outgoing arrows (others eat them; they eat nothing in the web). Every consumer in the web traces its energy back to one of these three.", { mode: mode });
  } else if (mode === "topeater") {
    q = mcq("Which organism in the web is a top consumer (nothing in this web eats it)?",
      "The lynx: arrows point into it from fox and owl prey lines, but no arrow leaves it toward another predator",
      ["The red fox: it eats hares and mice, but an arrow also runs from the fox up to the lynx that eats it", "The great horned owl: it eats mice and other small animals, but the lynx also takes owls in this web", "The snowshoe hare: it eats shrubs and grasses, and it is eaten in turn by the fox and by the lynx"],
      "Follow the arrows: the fox is eaten by the lynx, and the owl is also taken by the lynx in this web (both arrows run upward into the lynx). The lynx alone has incoming arrows only.", { mode: mode });
  } else if (mode === "remove") {
    q = mcq("If the snowshoe hare were removed from this web, the most direct effects would be",
      "the fox loses a major prey, and the shrubs and grasses face less grazing pressure; the lynx then leans harder on its other prey",
      ["nothing changes: every species has exactly one food, and each species in the web carries on exactly as before", "the producers all die out within a season, as the shrubs and grasses lose the animal that kept them trimmed", "the owl immediately goes extinct, because it depended entirely on the hare and has no other food in the web"],
      "Webs buffer shocks precisely because most consumers have more than one food (the fox also takes mice). Removal ripples: prey of the hare's predators get hunted harder, and the hare's food is released. Single-chain thinking overstates the damage; ignoring the ripples understates it.", { mode: mode });
  } else {
    q = mcq("A frog in this web gets its energy from the tadpole it eats. Tracing the energy back, the frog's energy originally came from",
      "the Sun, captured by the aquatic plants through photosynthesis, then passed to the tadpole and then the frog",
      ["the water itself, which produces energy as it flows through the pond and passes it to every animal there", "the soil under the pond, where energy stored in the mud is taken up by the tadpole as it feeds below", "the frog's own respiration, which makes new energy inside the frog's body each time it breathes"],
      "Every food chain is a relay of captured sunlight: producer photosynthesis is the entry point, and each consumer passes along only a fraction (about 10 percent) of what it received, which is why chains stay short.", { mode: mode });
  }
  q.figure = s6WebSVG();
  return q;
}, ["Arrows point from the eaten to the eater: energy flows in the direction of the arrowheads."]);

/* ---------- SC10.10.6 and 10.7 Interactions, adaptations ---------- */

E("sci-u4-symbiosis", 4, ["SC10.10.7"], 1, "var", varset([
  function () {
    return mcq("Lichen is a partnership of a fungus and an alga: the fungus provides shelter and moisture, the alga photosynthesizes food for both. This relationship is",
      "mutualism: both partners benefit",
      ["commensalism: one benefits, the other is unaffected", "parasitism: one benefits at the other's expense", "predation"],
      "Score the relationship for each side: fungus + (shelter traded for food), alga +. Two pluses is mutualism. Parasitism is + and -, commensalism is + and 0.", {});
  },
  function () {
    return mcq("A black-legged tick feeds on a moose's blood and can weaken the animal through the winter. The tick and moose relationship is",
      "parasitism: the tick benefits and the moose is harmed",
      ["mutualism: both partners benefit from the relationship", "commensalism: one benefits, the other is unaffected", "competition: both sides lose out while contesting a resource"],
      "The tick gains meals; the moose loses blood, energy and sometimes its life to heavy infestations (winter tick is a real and growing pressure on moose here). Plus for one, minus for the other: parasitism.", {});
  },
  function () {
    return mcq("Whale barnacles ride on a whale's skin, gaining transport to food-rich waters; the whale is neither helped nor noticeably harmed. This is",
      "commensalism: one benefits, the other is unaffected",
      ["mutualism: both partners benefit from the arrangement", "parasitism: one partner benefits and the other is harmed", "intraspecific competition: rivals of one species compete"],
      "One plus and one zero: commensalism. The test is the second partner's score: no clear benefit rules out mutualism, and no harm rules out parasitism.", {});
  },
  function () {
    return mcq("Two bull moose fight over access to a cow moose during the rut. This interaction is",
      "intraspecific competition: members of the SAME species competing for a resource (here, mates)",
      ["interspecific competition: members of different species competing against each other for a shared resource", "predation: one animal hunts, kills and eats another, gaining a meal from the encounter", "mutualism: both animals benefit from taking part in the interaction with each other"],
      "Intra means within: same species. Inter means between species. The contested resource (food, mates, territory, light) can be anything; the classification turns only on whether the rivals are the same species.", {});
  }
]), ["Score each partner (+, -, 0) and the relationship names itself."]);

E("sci-u4-adaptations", 4, ["SC10.10.7"], 2, "var", varset([
  function () {
    return mcq("The snowshoe hare turns white in winter and brown in summer. This adaptation helps it survive mainly by",
      "camouflage: matching the background in each season makes it harder for predators (lynx, owls, foxes) to spot",
      ["keeping it warmer in winter through white fur insulation, because a white coat traps body heat better than a brown one does", "signalling to other hares that winter has arrived, so the whole population changes its behaviour at the same time of year", "absorbing more sunlight in summer to speed digestion, because the brown coat takes in heat that helps the gut work faster"],
      "The colour tracks the background, not the temperature: a white hare on snow and a brown hare on bare ground are both hard to see. Climate shifts that uncouple snow cover from the hare's timing expose it, which is why this adaptation is now a climate-change case study.", {});
  },
  function () {
    return mcq("A ptarmigan's feathered feet act like snowshoes, spreading its weight on snow. This is classified as a",
      "structural (physical) adaptation: a body feature that improves survival in its environment",
      ["behavioural adaptation: something the bird does, an action it takes to improve its chances in snow", "physiological adaptation: an internal body process, a chemical change inside the bird that helps it", "learned behaviour passed down by teaching, as older birds show the young how to manage in deep snow"],
      "The three families: structural (built into the body), behavioural (actions, like migration), physiological (internal chemistry, like producing antifreeze proteins). Feathered feet are anatomy, so structural.", {});
  },
  function () {
    return mcq("Spruce trees in exposed coastal sites grow flagged: branches only on the sheltered side, trunks bent away from the wind (tuckamore). This growth pattern is",
      "a response to an abiotic factor: the constant wind prunes and shapes the growing tree",
      ["a disease caused by a fungus, which kills the branches on the exposed side of the tree", "damage done by moose browsing, as moose strip the reachable branches on one side of trees", "a genetic defect in coastal spruce, passed down in the seed of the trees near the shore"],
      "Wind is abiotic, and the tree's shape is a living record of it. The same species grows tall and straight inland: the difference is environment, not genes, which is the mark of a plastic response to a non-living factor.", {});
  }
]), ["Adaptation questions ask 'what problem does this solve?' Name the problem first."]);

/* ---------- SC10.10.8 Biodiversity, succession, sustainability ---------- */

E("sci-u4-biodiversity", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("A forest with many species is generally more stable than a single-species plantation because",
      "biodiversity provides backups: if one species is hit by disease or a bad year, others fill its role, and food webs reroute",
      ["more species means more sunlight reaches the forest, because a mixed canopy of taller trees lets extra light through", "plantations are illegal in Canada, so single-species stands are never planted and mixed forests are the only kind", "diverse forests have no pests at all, because insects and diseases cannot survive where many tree species grow"],
      "Diversity is insurance. A spruce plantation can be levelled by one budworm outbreak with the right host everywhere; a mixed forest loses some trees and keeps functioning. Stability comes from the web having alternate paths.", {});
  },
  function () {
    return mcq("After a forest fire clears a stand, grasses and fireweed move in first, then shrubs, then birch and aspen, and finally spruce and fir return. This sequence is",
      "secondary succession: regrowth on a site where soil already exists",
      ["primary succession: life colonizing bare rock for the first time", "eutrophication", "biomagnification"],
      "The soil (and seeds, roots and microbes) survived the fire, so the community rebuilds in stages: that is secondary succession. Primary succession starts from bare rock or new land, where soil itself must be built first, and takes far longer.", {});
  },
  function () {
    return mcq("A keystone species is one whose",
      "effect on its ecosystem is far larger than its numbers suggest: removing it reshapes the whole community (sea otters holding kelp forests together by eating urchins is the classic case)",
      ["population is the largest in the ecosystem, with more individuals than any other species in the community, so its sheer numbers dominate every food web in the system around it", "name appears first in the species list, at the head of every official list of the ecosystem's species, which is what marks it out as the most important species present there", "body size is the biggest of any consumer, larger and heavier than every other animal that feeds in the ecosystem, which is what gives it such influence over the whole community"],
      "Keystone status is about leverage, not abundance. Sea otters are few compared with urchins, but remove the otters and urchins strip the kelp, collapsing the habitat for hundreds of other species.", {});
  }
]), ["Diversity is insurance; succession is rebuilding, and it is secondary whenever the soil survives."]);

E("sci-u4-external", 4, ["SC10.10.6"], 3, "var", varset([
  function () {
    return mcq("The European green crab, an invasive species, has spread into Placentia Bay and other local waters, where it digs up eelgrass beds and eats juvenile shellfish. Its success as an invader is best explained by",
      "arriving without its natural predators and diseases, in an environment with food and habitat it can exploit, so its population grows unchecked",
      ["being the largest crab species in the Atlantic, too big for any local predator or competitor to challenge in its new home waters", "local species choosing not to compete with it, leaving the eelgrass beds and shellfish grounds open for the crab to take over", "the water being too warm for any native crabs, so the bay held no crabs at all until the green crab arrived from overseas"],
      "Invasions are population ecology with the limits removed: enemy release plus available resources gives exponential-style growth, and the damage falls on native species that evolved without this predator or competitor.", {});
  },
  function () {
    return mcq("The 1992 northern cod moratorium followed decades of improving fishing technology and rising catches. In population terms, the collapse happened because",
      "the harvest removed fish faster than births and growth could replace them, so the population was pushed far below a sustainable level and spawning stock shrank",
      ["cod migrated permanently to another ocean, leaving the Grand Banks empty as the whole stock moved away to distant southern waters for good", "the ocean ran out of plankton in one season, starving the cod all at once when the food at the base of their food chain vanished in a single year", "cod stopped reproducing for genetic reasons, with the whole stock losing the ability to spawn at the same time for reasons inside the fish themselves"],
      "A harvested population is a balance sheet: removals beyond the surplus production draw down the capital (the spawning stock). Once the breeders are too few, even stopping the harvest entirely gives a slow, uncertain recovery, which is the lesson the moratorium taught.", {});
  },
  function () {
    return mcq("A highway and subdivision split a forest into two patches, and a ground-nesting bird disappears from the smaller patch within a few years while surviving in the larger one. The best explanation is",
      "habitat fragmentation: the small patch cannot support a viable population (too few mates, too much edge exposure to predators and weather), so local extinction follows even though some habitat remains",
      ["the birds all chose to move to the bigger patch, preferring its size and leaving the smaller patch empty even though it still offered food and nesting sites of their own", "the smaller patch's soil changed type, turning from rich forest soil into poor ground that could no longer support the trees and plants the birds depended on for cover", "birds cannot cross roads under any circumstances, so the two patches were cut off completely the day the highway opened and no bird ever moved between them again"],
      "Fragmentation shrinks effective population size and raises edge effects. A patch can look green and suitable yet function as a sink, which is why conservation planning counts connected area, not just any green space.", {});
  }
]), ["External factors work through the same population bookkeeping: births, deaths, and the limits they run into."]);

E("sci-u4-sustainability", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("Sustainability, as used in this unit, means",
      "using resources and managing ecosystems so that present needs are met without destroying the ability of future generations (and other species) to meet theirs",
      ["never using any natural resource at all, leaving forests, fish stocks and farmland completely untouched by people in every generation", "maximizing this year's harvest while prices are high, taking as much as the market will buy now and leaving future years to themselves", "keeping every ecosystem exactly as it is today, with no change allowed in any habitat, population or harvest anywhere at any time"],
      "Sustainability is not zero use and not frozen nature; it is use within the system's replacement rates, so the capital (soil, stocks, cycles) survives the spending of the interest. The cod collapse is the local monument to the opposite choice.", {});
  },
  function () {
    return mcq("A town wants its fishery to be sustainable. Which policy best fits the science of this unit?",
      "Set catch limits from population surveys so the harvest stays within the stock's surplus production, and protect spawning habitat",
      ["Let each boat catch as much as it can while fish are plentiful, trusting that the stock will always replace what the fleet takes", "Ban all fishing permanently, everywhere, so that no boat ever removes another fish from any stock in any season again", "Import fish and stop monitoring the local stock, relying on foreign catches while the local population goes uncounted"],
      "Sustainable harvest is arithmetic plus habitat: measure the population, take less than the growth, and keep the nursery habitat intact. A permanent total ban is more than sustainability requires, and unmonitored freedom is how stocks collapse.", {});
  },
  function () {
    return mcq("An ecological footprint measures",
      "the area of land and water needed to supply a person's (or a nation's) resources and absorb its wastes, letting lifestyles be compared for sustainability",
      ["the physical size of a person's property, counting the house lot and any other land the person owns or rents where they live", "the number of species a person can name, scored on a test of the plants and animals found in the region around their home", "the distance a person walks outdoors each year, added up from daily walks and hikes on the trails near their home community"],
      "The footprint converts consumption into the one currency ecosystems deal in: productive area. When humanity's total footprint exceeds the planet's productive area (overshoot), the difference is paid out of stored capital, like drawing down a bank account.", {});
  }
]), ["Sustainability is living on the interest, not the capital."]);

/* ---------- Unit 4 CR ---------- */

E("sci-u4-cr-cycle", 4, ["SC10.10.3"], 2, "var", varset([
  function () {
    return textq("The carbon cycle and the atmosphere (4 marks)\n(a) Name the process by which plants remove carbon dioxide from the atmosphere, and state where the carbon goes. (1)\n(b) Describe TWO different processes that return carbon to the atmosphere as carbon dioxide. (1)\n(c) Explain how burning fossil fuels AND clearing forests together increase atmospheric carbon dioxide more than either would alone. (1)\n(d) State one consequence of rising atmospheric carbon dioxide for ecosystems, and one action that reduces the increase. (1)", ["(a) Photosynthesis: the carbon is built into sugars and then into plant tissues (biomass)."], 
      "(a) Photosynthesis: the carbon is built into sugars and then into plant tissues (biomass). (b) Any two: respiration by plants, animals and decomposers; decay of dead matter by decomposers; combustion of wood or fossil fuels. (c) Burning releases carbon that was locked away underground for millions of years, adding new carbon to the active cycle; clearing forests releases the trees' stored carbon AND removes the photosynthesis that would draw carbon back down. The source grows while the sink shrinks, so the two effects add. (d) Consequence (any one): shifting climate zones stress species adapted to local conditions; ocean acidification harms shell-building organisms; longer growing seasons change species interactions. Action (any one): burn less fossil fuel (efficiency, renewables), protect or replant forests and peatlands, restore wetlands.", 
      {});
  },
  function () {
    return textq("The carbon cycle in a bog (4 marks)\nPeat bogs are common across Newfoundland and Labrador.\n(a) Explain why dead plants in a bog decay so slowly, referring to the conditions in the bog. (1)\n(b) State what happens to the carbon in those dead plants over thousands of years, and why bogs are called a carbon store. (1)\n(c) A developer drains a bog to build on it. Explain, using the carbon cycle, why draining the bog leads to carbon dioxide being released. (1)\n(d) Give one other reason, besides carbon storage, why protecting bogs matters to local ecosystems. (1)", ["(a) The bog is waterlogged, so the dead material sits in cold water with very little oxygen, and the water is acidic: decomposer organisms need oxygen, so decay nearly stops."], 
      "(a) The bog is waterlogged, so the dead material sits in cold water with very little oxygen, and the water is acidic: decomposer organisms need oxygen, so decay nearly stops. (b) The carbon accumulates as peat instead of returning to the air: layer on layer of partly decayed material locks carbon away for thousands of years, a long-term store rather than a quick pass-through. (c) Draining lets oxygen reach the peat: decomposers can then work, respiration and decay resume, and the stored carbon is released as carbon dioxide (the bog flips from store to source). (d) Any one: bogs are habitat for specialized species (orchids, pitcher plants, breeding birds); they hold water and reduce downstream flooding; they filter water entering streams.", 
      {});
  },
  function () {
    return textq("Fertilizer and a pond (4 marks)\nFarms above a pond apply nitrogen fertilizer to their fields each spring. By midsummer the pond is green with algae, and fish are found gasping at the surface on still mornings.\n(a) Explain how the fertilizer reaches the pond. (1)\n(b) Explain why the algae multiply so rapidly once the fertilizer arrives. (1)\n(c) Explain why the fish run short of oxygen, even though the algae produce oxygen while they grow. (1)\n(d) State one change in farm practice that would reduce the problem, and say why it works. (1)",
      ["(a) Rain washes dissolved fertilizer off the fields as runoff into streams feeding the pond. (b) Nitrogen is a limiting nutrient in the pond, so adding it removes the limit on algal growth. (c) When the algae die, decomposers multiply and their decay consumes dissolved oxygen faster than it is replaced. (d) Any practice that keeps nitrogen on the field or out of the water"],
      "(a) Rain and meltwater dissolve the fertilizer and carry it off the fields as runoff, through ditches and streams into the pond: the nutrient travels with the water cycle. (b) Nitrogen (with phosphorus) is normally the limiting nutrient for pond algae: in short supply, it caps their growth. The runoff removes the cap, and the algae bloom. (c) The bloom is short-lived; when the algae die, decomposer populations explode to decay them, and decay is respiration: it consumes dissolved oxygen faster than photosynthesis and the surface can replace it, worst at night and on still mornings when no new oxygen is being made. Fish suffocate in the depleted water (eutrophication). (d) Any one, with its mechanism: plant buffer strips of vegetation along waterways (roots and soil trap and absorb nutrients before they reach the pond); apply only the amount the crop needs, when it needs it (less surplus to wash away); avoid spreading before heavy rain is forecast (less runoff while the fertilizer sits on the surface).",
      {});
  }
]), ["For cycle questions, name the store, the process on each arrow, and what speeds it up or slows it down."]);

E("sci-u4-cr-bioaccum", 4, ["SC10.10.5"], 3, "var", varset([
  function () {
    return textq("Mercury in a northern food chain (3 marks)\nMercury entering a lake is converted by bacteria into methylmercury, which is stored in body fat and not excreted. Measurements in one lake: phytoplankton 0.004 ppm; zooplankton 0.04 ppm; small fish 0.4 ppm; lake trout (a top predator) 4 ppm.\n(a) By what factor does the concentration increase from phytoplankton to lake trout? Show your reasoning. (1)\n(b) Explain why the trout, and not the phytoplankton, ends up with a dangerous concentration even though the water itself tests at a barely measurable level. (1)\n(c) A public health advisory recommends limiting meals of large lake trout for pregnant people and young children, but sets no limit on small fish from the same lake. Use the data to justify the different advice. (1)", ["(a) 4 / 0.004 = 1000: a thousandfold increase, built from three trophic transfers of about x10 each."], 
      "(a) 4 / 0.004 = 1000: a thousandfold increase, built from three trophic transfers of about x10 each. (b) The chemical persists: each organism keeps what it eats, and a trout eats many small fish over years of life, each carrying the burden of the zooplankton and phytoplankton beneath them. Concentration compounds up the chain, so the top consumer collects the whole lake's worth in its own tissues. (c) The small fish sit at 0.4 ppm, one tenth of the trout's 4 ppm and far below it in total dose per meal; risk follows concentration, and the most vulnerable (developing nervous systems) get the strictest advice where the concentration is highest.", 
      {});
  },
  function () {
    return textq("A pesticide that would not go away (3 marks)\nA persistent pesticide was sprayed on farmland for years at rates considered safe for the organisms sprayed. A decade later, fish-eating birds in the region were found with pesticide levels hundreds of times higher than the water in their lakes, and their eggshells were thinning.\n(a) Name and define the process that produced the birds' high levels. (1)\n(b) Explain why the pesticide's persistence (it breaks down very slowly) is essential to the problem. (1)\n(c) Suggest why 'the spray was applied at a safe concentration' did not protect the birds, and state the lesson for approving new chemicals. (1)", ["(a) Biomagnification: the increasing concentration of a persistent substance at successively higher trophic levels of a food chain."], 
      "(a) Biomagnification: the increasing concentration of a persistent substance at successively higher trophic levels of a food chain. (b) If the chemical broke down quickly, each organism would clear it before being eaten, and concentrations could not compound; persistence means every meal's dose is kept and added to the next, in the prey and then in the predator. (c) Safety was judged at the level of the sprayed organism, but the food chain multiplied the dose a hundredfold before it reached the birds: the effective exposure of top consumers was never 'safe'. The lesson: approval must consider the whole food chain and the chemical's lifetime, not single-species tests at the applied concentration. (This is the DDT story, the case that created modern pesticide regulation.)", 
      {});
  }
]), ["Risk lives at the top of the chain: concentration, persistence and position together decide it."]);

E("sci-u4-cr-scene", 4, ["SC10.10.1", "SC10.10.2"], 3, "var", varset([
  function () {
    var q = textq("Reading an ecosystem scene (3 marks)\nThe illustration shows a forest clearing in late spring: snowshoe hares graze on new grass and low shrubs while a lynx watches from the treeline. Rain has pooled in a shallow hollow; spruce and birch ring the clearing, and fallen leaves cover the ground under the trees.\n(a) From the scene, identify one biotic factor and one abiotic factor. (1)\n(b) Give one example of competition that could occur in this scene, and state whether it is interspecific or intraspecific competition. (1)\n(c) The hare population in the clearing has grown at the same level for several years, with births balanced by deaths and predation. Is this population in equilibrium or in exponential growth? Explain your answer in one or two sentences. (1)", ["(a) Biotic (any one): hares, lynx, grass, shrubs, spruce, birch."],
      "(a) Biotic (any one): hares, lynx, grass, shrubs, spruce, birch. Abiotic (any one): the rainwater pooled in the hollow, sunlight, the soil beneath the fallen leaves. (b) Any one, correctly classified: hares competing with each other for grass or shrubs (intraspecific, same species); grass and shrubs competing for sunlight, water and space (interspecific, different species). (c) Equilibrium: the population size is steady because gains (births) are balanced by losses (deaths, including predation), the pattern of a population at or near carrying capacity. Exponential growth would show the population climbing at an ever-increasing rate with no balancing losses.",
      {});
    q.figure = '<img src="banks/sci-1206/assets/scene-forest-clearing.jpg" alt="Illustration of a forest clearing in late spring: two snowshoe hares grazing on grass and low shrubs, a lynx watching from the treeline, a rain-filled hollow, and spruce and birch trees ringing the clearing over fallen leaves" style="max-width:100%;height:auto">';
    return q;
  },
  function () {
    var q = textq("Reading an ecosystem scene (3 marks)\nThe illustration shows the edge of a pond in summer: a cow moose and her calf browse in the shallows while a beaver sits at the shore beside the alder trunk it has gnawed through. Cattails and sedges crowd the shallows, water lilies float on the open water, dragonflies hunt over the pond, and the shore is soft mud.\n(a) From the scene, identify one biotic factor and one abiotic factor. (1)\n(b) Give one example of competition that could occur in this scene, and state whether it is interspecific or intraspecific competition. (1)\n(c) The beaver population at the pond has doubled every year for three years since the first pair arrived, with plenty of food and no predators yet. Is this population in equilibrium or in exponential growth? Explain your answer in one or two sentences. (1)", ["(a) Biotic (any one): moose, calf, beaver, water lilies, alders, cattails, sedges, dragonflies."],
      "(a) Biotic (any one): moose, calf, beaver, water lilies, alders, cattails, sedges, dragonflies. Abiotic (any one): pond water, sunlight, mud (soil). (b) Any one, correctly classified: the moose and beaver both eating shoreline vegetation (interspecific); two beavers, or family members, competing for alders (intraspecific); cattails and sedges competing for light and space in the shallows (interspecific). (c) Exponential growth: a constant doubling pattern with no limiting factor yet in play (food plentiful, predators absent) is the J-curve pattern. It cannot continue indefinitely: food, space or predation will eventually bend it toward equilibrium at the carrying capacity.",
      {});
    q.figure = '<img src="banks/sci-1206/assets/scene-pond-edge.jpg" alt="Illustration of the edge of a pond in summer: a cow moose and her calf browsing in the shallows, a beaver beside a gnawed alder trunk, cattails and sedges in the shallows, water lilies and dragonflies over the open water, and a soft mud shore" style="max-width:100%;height:auto">';
    return q;
  }
]), ["Answer from the scene you are given: name the actual organisms and factors pictured, then apply the definitions."]);

/* Blueprint CR additions (Nov 19, 2026): the pool-depth audit of the
   test blueprint found both Sustainability tests unable to reach
   their 5 CR marks (Test 1 held {4, 3}; Test 2 a single 3). One
   2-mark entry in each half of the unit closes both partitions:
   3 + 2 in each case. */

E("sci-u4-cr-soil", 4, ["SC10.10.4"], 2, "var", varset([
  function () {
    return textq("Two fields, two soils (2 marks)\nField A is mostly sand with very little humus. Field B is a loam rich in humus. In a dry summer, Field B's crops keep growing while Field A's crops wilt.\n(a) State one way humus improves a soil for plant growth. (1)\n(b) Explain why Field A dries out faster than Field B after the same rain. (1)", ["(a) Any one: humus holds water and dissolved nutrients in the soil within reach of roots; it feeds the decomposers that release nutrients from dead matter; it binds loose particles into a structure that roots and air can move through."],
      "(a) Any one: humus holds water and dissolved nutrients in the soil within reach of roots; it feeds the decomposers that release nutrients from dead matter; it binds loose particles into a structure that roots and air can move through. (b) Sand grains are large with wide gaps between them, so rain drains straight through and little water is stored. Field B's humus works like a sponge, holding water in the soil (and its finer particles drain slowly), so moisture stays available to the roots long after the rain has stopped.",
      {});
  },
  function () {
    return textq("Reading a soil pit (2 marks)\nA soil pit shows a dark top layer full of roots and earthworms, above a pale lower layer of mostly clay.\n(a) Explain why the dark top layer is the most fertile part of the soil. (1)\n(b) A gardener mixes compost into a clay garden bed. State the change this makes to the soil, and one benefit it gives the plants. (1)", ["(a) The top layer is the topsoil: it holds the humus, the decayed matter whose nutrients the decomposers living there are releasing, so it carries the available minerals that roots take up."],
      "(a) The top layer is the topsoil: it holds the humus, the decayed matter whose nutrients the decomposers living there are releasing, so it carries the available minerals that roots take up. The pale clay below has almost no organic matter and few nutrients to offer. (b) The compost adds organic matter (humus) to the clay. Benefit (any one): the tight clay structure opens up, so water drains and air reaches roots instead of waterlogging; or the compost's nutrients are released as it decays, feeding the plants.",
      {});
  }
]), ["Humus is the soil's savings account: water and nutrients held where roots can reach them."]);

E("sci-u4-cr-biodiv", 4, ["SC10.10.7"], 2, "var", varset([
  function () {
    return textq("One variety or many (2 marks)\nOne farm valley plants a single variety of potato in every field. A neighbouring valley plants several potato varieties alongside other crops.\n(a) State what biodiversity means in this setting. (1)\n(b) Explain why the single-variety valley is at greater risk if a potato disease arrives. (1)", ["(a) The variety of living things in the area: here, the genetic variety within the potato crop and the variety of species grown and living alongside it."],
      "(a) The variety of living things in the area: here, the genetic variety within the potato crop and the variety of species grown and living alongside it. (b) Every plant in the single-variety valley shares the same resistance, so a disease that can attack one plant can attack them all and the whole crop can fail at once. In the mixed valley the varieties differ, so some resist the disease, and the other species present support predators and pollinators that buffer the loss: diversity spreads the risk.",
      {});
  },
  function () {
    return textq("The hedgerow's quiet work (2 marks)\nA farmer removes the hedgerows between fields to plant more wheat. Within a few years, outbreaks of aphids in the wheat grow noticeably worse.\n(a) State one way the hedgerows added to the farm's biodiversity. (1)\n(b) Explain the connection between removing the hedgerows and the worse aphid outbreaks. (1)", ["(a) Any one: the hedgerows were habitat, food, shelter and breeding sites, for birds, insects and other species beyond the crop itself, so they raised the number of species living on the farm."],
      "(a) Any one: the hedgerows were habitat, food, shelter and breeding sites, for birds, insects and other species beyond the crop itself, so they raised the number of species living on the farm. (b) The hedgerows housed the aphids' predators, such as ladybirds, spiders and birds. Removing them removed the predators' habitat, so aphid numbers were no longer held in check and outbreaks grew: the farm had been getting a pest-control service from its biodiversity without noticing it.",
      {});
  }
]), ["Variety is insurance: the more kinds of life, the fewer single points of failure."]);

/* ---------- Unit 4 depth additions ---------- */

E("sci-u4-biomes", 4, ["SC10.10.1"], 1, "var", varset([
  function () {
    return mcq("Most of Newfoundland and Labrador's land area belongs to which terrestrial biome?",
      "Boreal forest (taiga): coniferous forest of spruce and fir with cold winters, short cool summers and acidic, nutrient-poor soils",
      ["Tundra across the whole province, with low plants, permafrost and no trees anywhere from the coast to the interior", "Temperate deciduous forest of maple and oak, with mild winters and broad-leaved trees that drop their leaves in autumn", "Grassland: the province is mostly open prairie, with deep grass soils and almost no forest cover in any region"],
      "The island and southern Labrador are boreal: conifers built for snow load and a short growing season. Tundra takes over in northern Labrador and at high elevations; deciduous forest and grassland belong to milder, drier regions far to the south and west.", {});
  },
  function () {
    return mcq("A biome is defined mainly by",
      "its climate (temperature and precipitation patterns) and the community of organisms adapted to that climate",
      ["the country it is in, together with the borders and the part of the continent where the biome happens to be found", "the single largest animal living there, whose size and habits set the character of the whole community around it", "the type of rock under the soil alone, regardless of the rain, snow and temperatures the region receives each year"],
      "Climate is the sorting force: the same biome (boreal forest, desert, tundra) appears on different continents wherever the same temperature and rainfall pattern occurs, with different but similarly adapted species filling the roles.", {});
  },
  function () {
    return mcq("Tundra plants such as those in northern Labrador are typically low, ground-hugging and fast to flower. These traits are adaptations to",
      "a very short, cold growing season with strong winds and a layer of permanently frozen ground (permafrost) below the surface",
      ["extreme heat and drought, in a climate where summer temperatures stay high and rain almost never falls at all", "deep shade under tall trees, where little sunlight reaches the ground through a closed canopy overhead in summer", "soil that is rich and deep, offering roots easy growing conditions and a long season to spread through it freely"],
      "Tundra life is a race against the calendar: grow low (out of the wind), flower fast, and root shallow above the permafrost. Every trait on the list answers a specific hardship of the climate.", {});
  }
]), ["Biome equals climate plus its adapted community: name the climate and the community follows."]);

E("sci-u4-foodchain", 4, ["SC10.10.1", "SC10.10.2"], 1, "var", varset([
  function () {
    return mcq("In the chain grass → grasshopper → frog → heron, the frog is the",
      "secondary consumer: it eats a primary consumer (the grasshopper, which ate the producer)",
      ["producer: it makes its own food from sunlight by photosynthesis, as the grass does", "primary consumer: it eats a producer (the grass, at the start of the chain) directly", "decomposer: it breaks down dead organisms and returns their nutrients to the soil"],
      "Count from the producer: grass (producer), grasshopper (primary consumer, herbivore), frog (secondary consumer), heron (tertiary consumer). Trophic level and consumer level are the same count.", {});
  },
  function () {
    return mcq("Only about 10 percent of the energy at one trophic level becomes biomass at the next. The other 90 percent is mostly",
      "used by the organisms for living (movement, body heat, life processes) and lost as heat, or passed to decomposers in waste and uneaten parts",
      ["destroyed, violating conservation of energy, so the missing energy simply stops existing once an animal has used its food", "stored in the soil as new minerals, buried under the ground where the next trophic level cannot reach them ever again", "reflected back to the Sun, returned to space as light given off by the animals and plants at each level in turn"],
      "Energy is never destroyed, it is spent: an animal burns most of its food staying alive, and that energy leaves as heat. The 10 percent rule is why food chains rarely exceed four or five levels and why top predators are always rare.", {});
  },
  function () {
    return mcq("Decomposers (bacteria and fungi) are essential to every ecosystem because they",
      "break down dead organisms and waste, returning nutrients to the soil and water for producers to use again",
      ["produce energy from sunlight for the food web, capturing light the way green plants do in photosynthesis", "eat only invasive species, keeping introduced pests down so native food webs are never disturbed by them", "prevent all disease in populations, killing the microbes that would otherwise spread sickness through herds"],
      "Without decomposers, nutrients would stay locked in dead bodies and ecosystems would run out of the raw materials for new growth within years. They are the cycle-closers of Unit 4, just as they were in the carbon cycle.", {});
  }
]), ["Count trophic levels from the producer, and remember the 10 percent toll at every step."]);

E("sci-u4-invasive", 4, ["SC10.10.6"], 1, "var", varset([
  function () {
    return mcq("An invasive species is best defined as",
      "a non-native species whose population spreads and causes harm to native ecosystems, economies or health in its new home",
      ["any species that lives near people, found around towns, farms and harbours wherever settlement provides it with food", "any species with a large population, spreading quickly because its numbers are already high in the place where it lives", "a species that is endangered in its home range, at risk there and protected by law in the country it came from"],
      "Three parts: not from here, spreading, and causing harm. Plenty of introduced species stay quiet (most garden plants); the invasive minority combine fast reproduction with freedom from their natural enemies.", {});
  },
  function () {
    return mcq("Moose are not native to the island of Newfoundland: a few were introduced in 1878 and 1904. Their population exploded in the new home mainly because",
      "the island offered abundant food and habitat with none of the mainland's established wolf packs to limit them",
      ["moose reproduce faster in cold climates by nature, so each cow raised more calves on the island than elsewhere", "the introduced moose were a special fast-breeding variety, selected for rapid reproduction before their release", "there were no other animals eating plants on the island, so every shrub and tree was left to the moose alone"],
      "Classic introduction pattern: resources plentiful, predators and parasites left behind, so the population grew exponentially for decades before food limits and management brought it toward balance. The moose is now both a valued game animal and an ecosystem force (its browsing reshapes forests).", {});
  }
]), ["Introduced is a fact; invasive is introduced plus spreading plus harmful."]);

E("sci-u4-species-risk", 4, ["SC10.10.8"], 2, "var", varset([
  function () {
    return mcq("Newfoundland's woodland caribou herds declined sharply in recent decades. Which combination of factors do biologists most often cite?",
      "Predation on calves (including by coyotes, a recent arrival on the island), habitat change, and hunting pressure together outpacing calf survival",
      ["Caribou forgot their migration routes, losing the paths to their calving grounds and wintering areas as the older animals died off", "The herds all moved to Labrador permanently, leaving the island empty as the animals crossed to the mainland for better feeding", "Winters became so warm that caribou overheat, their heavy winter coats trapping heat through the season until the animals weaken"],
      "Population decline is bookkeeping again: when deaths (calves especially) exceed births year after year, the herd shrinks. A new predator changed the death column while habitat change squeezed the birth column (lichen-rich mature forest lost), and management responds on both sides of the ledger.", {});
  },
  function () {
    return mcq("Protecting a species at risk usually requires protecting its habitat, not just banning hunting, because",
      "a population cannot recover without the food, shelter, breeding sites and space its life cycle needs, however safe individuals are from being killed",
      ["hunting bans are impossible to enforce anywhere at all, so officers cannot stop illegal hunting even where a ban is in place", "habitats are cheaper to protect than species, so governments choose the option that costs the public the least money each year", "individual animals do not matter to populations, so protecting single animals never helps a species recover its numbers"],
      "Individuals are the population only when the environment can carry them: protect the animals but lose the calving grounds or the winter range, and the births column collapses anyway. Habitat is the carrying capacity made visible.", {});
  }
]), ["Conservation works on the whole ledger: births, deaths and the habitat that sets both."]);
