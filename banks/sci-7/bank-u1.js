// CRMARKS: s7-u1-cr-factor-effect=2
// CRMARKS: s7-u1-cr-three-interactions=3
// CRMARKS: s7-u1-cr-energy-flow=3
// CRMARKS: s7-u1-cr-web-change=3
// CRMARKS: s7-u1-cr-recycling=2
// CRMARKS: s7-u1-cr-succession-compare=2
// CRMARKS: s7-u1-cr-web-interpret=3
// CRMARKS: s7-u1-cr-silviculture=2
// CRMARKS: s7-u1-cr-harvest-decision=3
// CRMARKS: s7-u1-cr-boreal-example=3
// CRMARKS: s7-u1-cr-habitat-defence=3
// CRMARKS: s7-u1-cr-design-experiment=4
// CRMARKS: s7-u1-cr-data-display=3
// CRMARKS: s7-u1-cr-defend-position=3
// CRMARKS: s7-u1-cr-succession-stages=2
// Science 7 Unit 1 bank: Interactions Within Ecosystems (SC7.1.1 to
// SC7.3.11), built Nov 15, 2026 to the Ecosystems authoring spec.
// All entries are original and were written new for this app.
// Existing tests and question banks, including teacher tests, the
// MHR ExamView chapters 1 to 3, the core laboratories, the Two
// Centimetre Forest module and SLA 7 unit 1, were reviewed only
// to gauge the expected depth and range of treatment.
// Coverage honesty: SC7.3.5 (work cooperatively with team members)
// is NONE for this format and carries no entries, by design.
// CORE residue: SC7.3.3 entries assess instrument choice, record
// format and recording-plan judgement; they do not assess taking
// measurements in the field. SC7.3.4 entries assess choosing and
// judging a communication format in writing; they do not assess
// oral communication or producing the communication itself.
// SC7.3.6 entries assess knowledge about evaluating group
// processes; they do not assess a student evaluating their own
// group. SC7.3.8 entries assess experiment design; the carrying
// out is classroom work.
// Symbiosis ruling: relationship scenarios from the reviewed
// sources appear only as unnamed biotic-biotic interaction
// examples under SC7.1.2.

/* Food web data for the F4 family (letters are node order). */
var S7_WEB_POND = {
  nodes: [
    { n: "Algae", x: 90, y: 340 }, { n: "Cattail", x: 250, y: 350 },
    { n: "Water flea", x: 130, y: 215 }, { n: "Snail", x: 300, y: 225 },
    { n: "Minnow", x: 330, y: 105 }, { n: "Dragonfly", x: 480, y: 235 },
    { n: "Frog", x: 500, y: 105 }, { n: "Heron", x: 610, y: 60 }
  ],
  links: [[0, 2], [0, 3], [1, 3], [2, 4], [2, 5], [4, 6], [4, 7], [5, 6], [6, 7]]
};
var S7_WEB_FOREST = {
  nodes: [
    { n: "Grass", x: 80, y: 340 }, { n: "Balsam fir", x: 250, y: 350 },
    { n: "Hare", x: 140, y: 205 }, { n: "Squirrel", x: 330, y: 215 },
    { n: "Moose", x: 480, y: 330 }, { n: "Marten", x: 470, y: 200 },
    { n: "Owl", x: 560, y: 95 }, { n: "Lynx", x: 300, y: 80 }
  ],
  links: [[0, 2], [0, 4], [1, 4], [1, 3], [2, 7], [2, 6], [3, 5], [3, 6], [5, 7]]
};
var S7_WEB_MEADOW = {
  nodes: [
    { n: "Grass", x: 80, y: 340 }, { n: "Clover", x: 240, y: 350 },
    { n: "Grasshopper", x: 150, y: 210 }, { n: "Mouse", x: 330, y: 225 },
    { n: "Bee", x: 430, y: 330 }, { n: "Frog", x: 460, y: 200 },
    { n: "Snake", x: 540, y: 95 }, { n: "Hawk", x: 330, y: 75 }
  ],
  links: [[0, 2], [0, 3], [1, 2], [1, 4], [2, 5], [2, 3], [5, 6], [3, 6], [3, 7], [6, 7]]
};
function s7WebQ(web) { return s7WebSVG(web.nodes, web.links); }

/* ---------- SC7.1.1 Biotic and abiotic factors ---------- */

E("s7-u1-factor-classify", 1, ["SC7.1.1"], 1, "gen", function () {
  var sets = [
    { place: "a bog", ab: "acidic water", bi: ["sphagnum moss", "black flies", "pitcher plants"] },
    { place: "a rocky shoreline", ab: "salt spray", bi: ["barnacles", "seaweed", "gulls"] },
    { place: "a spruce forest", ab: "shade under the canopy", bi: ["spruce trees", "mushrooms", "red squirrels"] },
    { place: "a pond", ab: "dissolved oxygen in the water", bi: ["cattails", "minnows", "snails"] },
    { place: "a barrens", ab: "strong wind", bi: ["caribou", "lichens", "partridgeberries"] }
  ];
  var s = pick(sets);
  var opts = shuffle(s.bi.slice());
  return mcq("A student lists features of " + s.place + ": " + s.bi[0] + ", " + s.bi[1] + ", " + s.bi[2] + " and " + s.ab + ". Which feature is an abiotic factor?",
    s.ab,
    opts,
    "Abiotic factors are the non-living parts of an ecosystem. " + s.ab.charAt(0).toUpperCase() + s.ab.slice(1) + " is non-living, while the other three features are living organisms, so they are biotic factors.", {});
}, ["Biotic means living. Cross out every feature that is alive or made by a living organism.", "Only one feature on the list is not alive. That is the abiotic one."]);

E("s7-u1-factor-local", 1, ["SC7.1.1"], 1, "var", varset([
  function () {
    return mcq("Which of the following is an abiotic factor in a Newfoundland and Labrador barrens ecosystem?",
      "Strong, drying wind",
      ["Caribou grazing on lichens", "Partridgeberry plants spreading", "Arctic hares feeding at dusk"],
      "Wind is non-living, so it is an abiotic factor. The caribou, plants and hares are all living organisms, so they are biotic factors.", {});
  },
  function () {
    return mcq("Which of the following is a biotic factor in a pond ecosystem?",
      "Water striders skating on the surface",
      ["Sunlight reaching the shallow water", "Gravel on the pond bottom", "Rain adding water to the pond"],
      "Water striders are living insects, so they are a biotic factor. Sunlight, gravel and rain are non-living, so they are abiotic factors.", {});
  }
]), ["Sort the options into living and non-living first.", "The question asks for one kind only; three options are the other kind."]);

E("s7-u1-tolerance-curve", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows how the health of a brook trout population changes with water temperature. Between which temperatures is the population healthiest?",
      "10 °C and 16 °C",
      ["4 °C and 10 °C", "16 °C and 22 °C", "4 °C and 22 °C"],
      "The top, flat part of the curve is the optimum range, where the population is healthiest: 10 °C to 16 °C. Outside it the curve falls through the tolerance range toward the failure range at each end.", {});
    q.figure = s7TolCurveSVG({ lo: 4, optLo: 10, optHi: 16, hi: 22 });
    return q;
  },
  function () {
    var q = mcq("The graph shows how the health of a capelin population changes with water temperature. At which temperature is the population surviving but under the greatest stress?",
      "19 °C",
      ["12 °C", "8 °C", "15 °C"],
      "Stress is greatest near the ends of the tolerance range, where the curve has fallen close to failure but the population still survives. At 19 °C the curve is low but not yet at the failure point; 12 °C and 15 °C are in or near the optimum range, and 8 °C is comfortably inside the tolerance range.", {});
    q.figure = s7TolCurveSVG({ lo: 2, optLo: 9, optHi: 14, hi: 20 });
    return q;
  }
]), ["Find the flat top of the curve first; that is where the population does best.", "The ends of the curve are the failure range. Just inside them is the high-stress part of the tolerance range."]);

E("s7-u1-cr-factor-effect", 1, ["SC7.1.1"], 2, "var", varset([
  function () {
    return textq("A pond's water level drops through a long, dry summer, and the shallow edges dry out completely. (a) Name the abiotic factor that changed. (b) Explain one effect this change could have on the pond's organisms.",
      ["The abiotic factor is water (water level or amount). Effects could include: organisms that need shallow water lose habitat, eggs laid in the shallows dry out, or the remaining water warms and holds less oxygen, stressing fish"],
      "<b>Model answer:</b> (a) The abiotic factor is water: the amount of water in the pond fell. (b) Any one well-explained effect earns the mark, for example: frogs and insects that lay eggs in the shallow edges lose their breeding habitat when the edges dry, so fewer young survive; or the smaller volume of water warms up and holds less dissolved oxygen, which stresses the fish living in it.<br><br><b>Marking points:</b> 1 mark for naming water (amount or level) as the abiotic factor. 1 mark for one effect on organisms, explained as a consequence of the change, not just restated.", {});
  },
  function () {
    return textq("A stand of spruce trees beside a schoolyard is cut down, so a garden plot that was shaded all day is now in full sun. (a) Name the abiotic factor that changed for the plants in the plot. (b) Explain one effect this change could have on those plants.",
      ["The abiotic factor is sunlight (light intensity). Effects could include: shade-loving plants are stressed or die back, sun-loving plants grow faster, or the soil dries out faster so plants need more water"],
      "<b>Model answer:</b> (a) The abiotic factor is sunlight: the plot now receives much more light. (b) Any one well-explained effect earns the mark, for example: plants that were adapted to shade may be stressed and die back, while sun-loving plants grow faster with the extra light for photosynthesis; or the exposed soil dries out more quickly, so the plants face a shortage of water.<br><br><b>Marking points:</b> 1 mark for naming sunlight (light) as the abiotic factor. 1 mark for one effect on the plants, explained as a consequence of the change.", {});
  }
]), ["First separate the living parts from the non-living part that changed.", "For part (b), follow the chain: the change alters a condition, and that condition matters to an organism."]);

/* ---------- SC7.1.2 Interactions between factors ---------- */

E("s7-u1-interaction-classify", 1, ["SC7.1.2"], 1, "gen", function () {
  var pool = [
    { ex: "earthworms tunnel through the soil and let air into it", t: "biotic-abiotic" },
    { ex: "sunlight warms the surface of a lake", t: "abiotic-abiotic" },
    { ex: "a lynx hunts a snowshoe hare", t: "biotic-biotic" },
    { ex: "wind spreads dandelion seeds across a field", t: "abiotic-abiotic" },
    { ex: "tree roots crack a sidewalk as they grow", t: "biotic-abiotic" },
    { ex: "two male caribou lock antlers during the rut", t: "biotic-biotic" },
    { ex: "rainwater dissolves minerals in a rock surface", t: "abiotic-abiotic" },
    { ex: "bees carry pollen from flower to flower", t: "biotic-biotic" },
    { ex: "a beaver cuts down a poplar tree for its dam", t: "biotic-biotic" },
    { ex: "waves erode the soil along a shoreline", t: "abiotic-abiotic" }
  ];
  var names = { "biotic-abiotic": "A biotic-abiotic interaction", "abiotic-abiotic": "An abiotic-abiotic interaction", "biotic-biotic": "A biotic-biotic interaction" };
  var it = pick(pool);
  var others = Object.keys(names).filter(function (k) { return k !== it.t; });
  return mcq("In a local ecosystem, " + it.ex + ". This is an example of",
    names[it.t],
    [names[others[0]], names[others[1]], "A change that is not an interaction"],
    "Classify by the two factors involved. In this example the factors are " + it.t.replace("-", " and ") + ", so it is " + names[it.t].toLowerCase() + ". Every option that names two living or two non-living factors incorrectly can be checked the same way: name each factor first, then decide if it is living.", {});
}, ["Name the two factors in the example before you choose.", "Ask of each factor: is it living (biotic) or non-living (abiotic)?"]);

E("s7-u1-interaction-examples", 1, ["SC7.1.2"], 1, "var", varset([
  function () {
    return mcq("A whale carries a group of barnacles attached to its skin as it swims and feeds. The barnacles gain a ride to food-rich water; the whale is not helped or harmed. The interaction between the whale and the barnacles is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "Both the whale and the barnacles are living organisms, so any interaction between them is biotic-biotic, whatever its effect on each partner. The type of an interaction is set by what the two factors are, not by who benefits.", {});
  },
  function () {
    return mcq("A flea lives on a dog, feeding on the dog's blood. The interaction between the flea and the dog is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "The flea and the dog are both living organisms, so their interaction is biotic-biotic. Classifying an interaction starts with the two factors involved: living with living is biotic-biotic.", {});
  },
  function () {
    return mcq("Bees visit clover flowers to collect nectar, and pollen sticks to the bees and reaches other flowers. The interaction between the bees and the clover is an example of",
      "a biotic-biotic interaction",
      ["a biotic-abiotic interaction", "an abiotic-abiotic interaction", "an interaction between two abiotic factors"],
      "Bees and clover are both living, so the interaction is biotic-biotic. It is also a useful reminder that biotic-biotic interactions are not all feeding interactions: pollination is an interaction between two organisms in which neither eats the other.", {});
  }
]), ["Decide whether each partner is living before thinking about who benefits.", "The interaction type names the two factors, not the outcome for either one."]);

E("s7-u1-pond-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    var q = mcq("In the pond diagram, which callout number shows an abiotic-abiotic interaction?",
      "Callout 1",
      ["Callout 3", "Callout 4", "Callout 5"],
      "Callout 1 marks sunlight warming the pond surface: sunlight and water are both non-living, so the interaction is abiotic-abiotic. Callout 3 is a bird nesting in a tree and callout 4 is a fish taking an insect (both living-living), and callout 5 is roots taking up water (living-non-living).", {});
    q.figure = S7_POND_SVG;
    return q;
  },
  function () {
    var q = mcq("In the pond diagram, which callout number shows a biotic-biotic interaction that is NOT a feeding interaction?",
      "Callout 3",
      ["Callout 1", "Callout 4", "Callout 6"],
      "Callout 3 marks a bird nesting in the shoreline tree: two living organisms interacting, and neither eats the other. Callout 4 is a feeding interaction (a fish taking an insect), callout 1 is sunlight on water (abiotic-abiotic), and callout 6 is wind bending the reeds (abiotic-biotic).", {});
    q.figure = S7_POND_SVG;
    return q;
  },
  function () {
    var q = mcq("In the pond diagram, which callout number shows a biotic-abiotic interaction?",
      "Callout 5",
      ["Callout 2", "Callout 3", "Callout 4"],
      "Callout 5 marks the cattail roots taking up water: a living plant interacting with non-living water, a biotic-abiotic interaction. Callout 2 is rain falling (abiotic-abiotic), and callouts 3 and 4 involve two living organisms each.", {});
    q.figure = S7_POND_SVG;
    return q;
  }
]), ["Work through the callouts one at a time and name the two factors at each.", "Feeding is only one kind of interaction; look for two living things where neither is eaten."]);

E("s7-u1-cr-three-interactions", 1, ["SC7.1.2"], 2, "var", varset([
  function () {
    return textq("Choose a local ecosystem you know (a pond, a forest, a bog or your schoolyard). Give ONE example of each type of interaction in that ecosystem: biotic-abiotic, abiotic-abiotic, and biotic-biotic. Label each example with its type.",
      ["Three correctly labelled examples, one of each type, from one named ecosystem; for a pond, for example: a frog warming itself on a sunny rock (biotic-abiotic), wind making ripples on the water (abiotic-abiotic), and a heron catching a minnow (biotic-biotic)"],
      "<b>Model answer:</b> For a pond: biotic-abiotic: a frog sits on a sun-warmed rock, taking heat from the non-living rock and sunlight. Abiotic-abiotic: wind blows across the pond and raises ripples on the water; both factors are non-living. Biotic-biotic: a heron catches and eats a minnow; two living organisms interact. Any ecosystem the student knows well works, as long as each example truly joins the two kinds of factor its label claims.<br><br><b>Marking points:</b> 1 mark for a genuine biotic-abiotic example, correctly labelled. 1 mark for a genuine abiotic-abiotic example, correctly labelled. 1 mark for a genuine biotic-biotic example, correctly labelled.", {});
  },
  function () {
    return textq("A student writes these three examples for a forest ecosystem: (1) sunlight evaporates water from a puddle on the trail; (2) a squirrel buries seeds in the soil; (3) rain soaks into the ground and reaches tree roots. For EACH example, state its interaction type and how you can tell.",
      ["(1) Abiotic-abiotic: sunlight and water are both non-living. (2) Biotic-biotic or biotic-abiotic accepted only if justified by the factors named; the squirrel and the seeds are both living (biotic-biotic) while the soil is non-living, so the strongest reading is biotic-biotic for the burying of seeds. (3) Biotic-abiotic: rain is non-living and the tree is living"],
      "<b>Model answer:</b> (1) Abiotic-abiotic: sunlight and water are both non-living factors. (2) Biotic-biotic: the squirrel is living and the seeds it buries are living material from a tree; the interaction described is between the animal and the seeds. (3) Biotic-abiotic: rain is a non-living factor and the tree roots belong to a living organism. The method is the same each time: name the two factors, decide whether each is living, and the type follows.<br><br><b>Marking points:</b> 1 mark for example 1 correctly typed with its reason. 1 mark for example 2 correctly typed with its reason. 1 mark for example 3 correctly typed with its reason.", {});
  }
]), ["Pick one ecosystem and stay in it for all three examples.", "For each example, name the two factors out loud and label each one living or non-living."]);

/* ---------- SC7.1.3 Niches of producers, consumers, decomposers ---------- */

E("s7-u1-role-identify", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("In a spruce forest, a mushroom grows on a dead log, slowly breaking the wood down. The mushroom's role in the ecosystem is",
      "a decomposer",
      ["a consumer", "a producer", "an abiotic factor"],
      "The mushroom feeds by breaking down dead material, which is the decomposer role. Producers make their own food, consumers eat other organisms, and the mushroom is living, so it cannot be an abiotic factor.", {});
  },
  function () {
    return mcq("In a pond, green algae float near the surface in the sunlight and make their own food. The algae's role in the ecosystem is",
      "a producer",
      ["a consumer", "a decomposer", "a scavenger"],
      "Organisms that make their own food using sunlight are producers. The algae do not eat other organisms (consumer) or break down dead material (decomposer).", {});
  },
  function () {
    return mcq("A snowshoe hare feeds on twigs and bark through the winter. The hare's role in the ecosystem is",
      "a consumer",
      ["a decomposer", "a producer", "an abiotic factor"],
      "The hare gets its food by eating other organisms (plants), which makes it a consumer. It does not make its own food or break down dead material.", {});
  }
]), ["Ask how the organism gets its food: makes it, eats, or breaks down the dead.", "Every living organism in these items fills exactly one of the three roles."]);

E("s7-u1-consumer-types", 1, ["SC7.1.3"], 1, "var", varset([
  function () {
    return mcq("A lynx hunts snowshoe hares and eats only other animals. The lynx is classified as",
      "a carnivore",
      ["a decomposer", "a herbivore", "an omnivore"],
      "A consumer that eats only animals is a carnivore. Herbivores eat only plants, omnivores eat both plants and animals, and decomposers break down dead material.", {});
  },
  function () {
    return mcq("A black bear eats berries in the fall and also catches fish and eats carrion. The bear is classified as",
      "an omnivore",
      ["a carnivore", "a decomposer", "a herbivore"],
      "The bear eats both plant material (berries) and animals (fish, carrion), and a consumer that eats both is an omnivore.", {});
  },
  function () {
    return mcq("A moose feeds entirely on twigs, leaves and aquatic plants. The moose is classified as",
      "a herbivore",
      ["a carnivore", "a decomposer", "an omnivore"],
      "A consumer that eats only plants is a herbivore. The moose eats no animal material, so it is not a carnivore or an omnivore.", {});
  }
]), ["Sort consumers by diet: plants only, animals only, or both.", "The bear item is the trap: one animal food in the list changes the class."]);

E("s7-u1-niche-reason", 1, ["SC7.1.3"], 2, "gen", function () {
  var pairs = [
    { a: "one warbler species feeds on insects near the top of the spruce trees", b: "another warbler species feeds on insects on the lower branches of the same trees" },
    { a: "one duck species dabbles at the surface for seeds", b: "another duck species dives to the bottom for molluscs" },
    { a: "an owl hunts mice in a meadow at night", b: "a hawk hunts mice in the same meadow by day" },
    { a: "one bat species catches insects high over a pond", b: "another bat species catches insects low along the shoreline" }
  ];
  var p = pick(pairs);
  return mcq("In one habitat, " + p.a + ", while " + p.b + ". The two species can share the habitat mainly because",
    "they occupy different niches, so they do not compete for exactly the same food in the same way",
    ["they belong to the same population, so the habitat's food is shared equally between them",
     "one of the two species is a producer, so it does not need the food the other species uses",
     "the habitat contains unlimited food, so competition between species never happens there"],
    "A niche is the role an organism plays, including how and where it gets its food. These two species take the same kind of food in different places or at different times, so their niches differ and direct competition is avoided. Neither species is a producer, and no habitat has unlimited food.", {});
}, ["The two species eat similar food. What differs between them: place, time, or method?", "That difference is exactly what the word niche names."]);

/* ---------- SC7.1.4 Classifying organisms ---------- */

E("s7-u1-classify-set", 1, ["SC7.1.4"], 1, "gen", function () {
  var sets = [
    { orgs: "spruce tree, grasses, cattails and algae", role: "producers", why: "every organism in the set makes its own food" },
    { orgs: "moose, snowshoe hare, caribou and beaver", role: "consumers", why: "every organism in the set eats other organisms" },
    { orgs: "bacteria, fungi, moulds and mushrooms", role: "decomposers", why: "every organism in the set breaks down dead material" },
    { orgs: "lynx, owl, fox and weasel", role: "consumers", why: "every organism in the set eats other organisms" }
  ];
  var s = pick(sets);
  var roles = ["producers", "consumers", "decomposers"];
  return mcq("A student groups these organisms together: " + s.orgs + ". The group is correctly classified as",
    s.role,
    roles.filter(function (r) { return r !== s.role; }).concat(["a mixture of all three roles"]),
    "The set is classified as " + s.role + " because " + s.why + ". Check each organism in a set before deciding: a single organism from another role would break the group.", {});
}, ["Test every organism in the set, not just the first one.", "If all four make their own food, eat, or break down the dead, the whole set takes that one role."]);

E("s7-u1-classify-set-hard", 1, ["SC7.1.4"], 1, "gen", function () {
  var qs = [
    { stem: "Which of the following organisms is a decomposer?", key: "Bacteria in the soil",
      dis: ["A crow feeding on a dead rabbit", "A vulture circling over a carcass", "Moss growing on a rock"],
      sol: "Bacteria break down dead material chemically and absorb the nutrients, which is the decomposer role. Crows and vultures are scavengers: they eat dead animals but do not break material down the way decomposers do. Moss is a producer." },
    { stem: "Which of the following organisms is a decomposer?", key: "A fungus growing through a rotting log",
      dis: ["A maggot feeding inside a dead fish", "An earthworm eating fallen leaves", "Algae growing on a pond rock"],
      sol: "The fungus breaks the dead wood down and absorbs nutrients from it, the decomposer role. Maggots and earthworms eat dead material as consumers (detritus feeders) without the chemical breakdown that defines decomposers at this level, and algae are producers." },
    { stem: "Which of the following organisms is a scavenger rather than a decomposer?", key: "A raven feeding on a dead seal",
      dis: ["Bacteria coating a dead fish", "A mushroom on a fallen birch", "Mould spreading on stale bread"],
      sol: "The raven eats the dead animal's flesh, which is scavenging. Bacteria, mushrooms and moulds break dead material down and absorb it, which is decomposing. The boundary is eating pieces of the dead organism versus breaking it down and absorbing it." }
  ];
  var q = pick(qs);
  return mcq(q.stem, q.key, q.dis, q.sol, {});
}, ["Scavengers eat the dead; decomposers break it down and absorb it.", "Look for the organism that does the chemical breaking down."]);

E("s7-u1-ecosystem-infer", 1, ["SC7.1.4"], 2, "var", varset([
  function () {
    return mcq("A field notebook lists the organisms found at one site: cattails, pondweed, frogs, minnows, snails and herons. The site is best identified as",
      "a pond ecosystem",
      ["a barrens ecosystem", "a desert ecosystem", "a spruce forest ecosystem"],
      "Every organism on the list lives in or around shallow fresh water: cattails and pondweed grow in it, and frogs, minnows, snails and herons feed in it. The organism set points to a pond.", {});
  },
  function () {
    return mcq("A field notebook lists the organisms found at one site: spruce trees, mosses, red squirrels, moose, mushrooms and lynx. The site is best identified as",
      "a spruce forest ecosystem",
      ["a grassland ecosystem", "a pond ecosystem", "a rocky shoreline ecosystem"],
      "Spruce trees dominate the list, and squirrels, moose, mushrooms and lynx are forest organisms. The set fits a spruce forest, not open grassland, water or shoreline.", {});
  }
]), ["Read the whole list and ask what kind of place all of them could share.", "The plants usually give the place away first; then check the animals fit."]);

/* ---------- SC7.1.5 Energy in a food chain ---------- */

E("s7-u1-energy-source", 1, ["SC7.1.5"], 1, "gen", function () {
  var kind = ri(1, 2);
  if (kind === 1) {
    var chains = ["grass, grasshoppers and frogs", "algae, water fleas and minnows", "spruce needles, squirrels and martens", "clover, bees and dragonflies"];
    return mcq("Consider the organisms " + pick(chains) + ". The original source of the energy in this food chain is",
      "the Sun",
      ["the soil", "the producer's seeds", "the wind"],
      "Almost every food chain runs on sunlight. Producers capture the Sun's energy in photosynthesis, and every later link gets its energy by eating an earlier one. Soil, seeds and wind supply materials or conditions, not the chain's energy.", {});
  }
  return mcq("Which word equation correctly shows photosynthesis?",
    "carbon dioxide + water -> food (sugar) + oxygen",
    ["carbon dioxide + oxygen -> food (sugar) + water", "food (sugar) + water -> carbon dioxide + oxygen", "food (sugar) + oxygen -> carbon dioxide + water"],
    "In photosynthesis a producer takes in carbon dioxide and water and, using sunlight energy, makes food (sugar) and releases oxygen. The last option is the reverse process, respiration.", {});
}, ["Trace the energy backwards: eater to eaten, all the way to the first link.", "Photosynthesis builds food; respiration breaks it down. Do not mix the two equations."]);

E("s7-u1-chain-order", 1, ["SC7.1.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows four organisms from a pond, not yet linked. Which sequence shows the correct flow of energy through a food chain made from these organisms?",
      "Algae -> water flea -> minnow -> heron",
      ["Algae -> minnow -> water flea -> heron", "Heron -> minnow -> water flea -> algae", "Water flea -> algae -> minnow -> heron"],
      "Energy flows from the organism eaten to the eater. Algae (producer) are eaten by water fleas, water fleas by minnows, and minnows by herons, so the chain runs algae, water flea, minnow, heron.", {});
    q.figure = s7ChainSVG(["Heron", "Minnow", "Algae", "Water flea"], false);
    return q;
  },
  function () {
    var q = mcq("The diagram shows a completed food chain. In this chain, the minnow is best described as",
      "a consumer that is eaten by the heron",
      ["a consumer that eats the heron", "a decomposer that breaks down the algae", "a producer that feeds the water flea"],
      "Arrows point in the direction of energy flow, from the organism eaten to the eater. The arrow runs from the minnow to the heron, so the heron eats the minnow; the minnow is a consumer (it eats the water flea) and is itself prey for the heron.", {});
    q.figure = s7ChainSVG(["Algae", "Water flea", "Minnow", "Heron"], true);
    return q;
  }
]), ["Arrows in a food chain point from the food to the feeder: follow the energy.", "Start every chain at the producer and ask, at each step, who eats this?"]);

E("s7-u1-energy-transfer", 1, ["SC7.1.5"], 2, "var", varset([
  function () {
    return mcq("A moose eats grass and twigs. What happens to most of the energy in the food the moose eats?",
      "It is used for the moose's life processes, and much of it is lost from the chain as heat",
      ["It is stored in the moose's body, ready to pass on in full to whatever eats the moose",
       "It is returned to the grass when the moose breathes out, keeping the chain in balance",
       "It stays in the moose's droppings, which hold nearly all of the energy the moose took in"],
      "An animal uses most of the energy it takes in just to live: moving, growing, keeping warm. That energy leaves the food chain as heat, and only the smaller part stored in body tissue can pass to the next link. Energy is never returned to the producers to be used again.", {});
  },
  function () {
    return mcq("A food chain has far fewer lynx than snowshoe hares, and far fewer hares than the plants they eat. The best explanation is that",
      "energy is lost at every link, so each higher link can support fewer organisms",
      ["top consumers reproduce more slowly, and that alone sets the numbers at every link",
       "plants grow faster than animals, so there will always be more plants for other reasons",
       "predators keep the numbers of their prey low, which explains the pattern at every link"],
      "Because most energy is used or lost as heat at each link, only a fraction reaches the next one. Less available energy means fewer organisms can be supported at each higher link, which produces the pattern at every step of the chain, not just where predators act.", {});
  }
]), ["Follow one mouthful of food: living costs energy at every step.", "If most energy passed on, the numbers at each link would be about equal. They are not."]);

E("s7-u1-cr-energy-flow", 1, ["SC7.1.5"], 3, "var", varset([
  function () {
    return textq("Trace the energy in this food chain from its source to the top consumer: grass -> grasshopper -> frog -> heron. In your answer, name the original source of the energy, describe how it enters the chain, and explain why the heron ends up with only a small part of the energy the grass captured.",
      ["The Sun is the source; grass captures it by photosynthesis and stores it as food; each eater uses most of the energy it takes in for life processes and loses much as heat, so only a small part is stored in body tissue and passed on, link by link, leaving little for the heron"],
      "<b>Model answer:</b> The original source is the Sun. The grass captures sunlight energy by photosynthesis and stores it in the food it makes, which is how energy enters the chain. The grasshopper eats the grass, but it uses most of that energy for its own life processes (moving, growing, staying alive) and loses much of it as heat; only the part stored in its body can pass on. The same loss happens again at the frog link, and again at the heron link. After three rounds of losses, the heron receives only a small fraction of the energy the grass first captured.<br><br><b>Marking points:</b> 1 mark for naming the Sun as the original source and photosynthesis as the entry point. 1 mark for energy being used for life processes and lost as heat at a link. 1 mark for the losses repeating at every link, so the share shrinks step by step to the top consumer.", {});
  }
]), ["Work link by link: source, entry, then what each eater does with the energy it gets.", "The key idea is that the loss happens at EVERY link, not just once."]);

/* ---------- SC7.1.6 Energy in chains and webs ---------- */

E("s7-u1-energy-loss", 1, ["SC7.1.6"], 1, "gen", function () {
  var chains = [
    { from: "a water flea", to: "a minnow" }, { from: "a grasshopper", to: "a frog" },
    { from: "a snowshoe hare", to: "a lynx" }, { from: "a squirrel", to: "a marten" }
  ];
  var c = pick(chains);
  return mcq("As energy passes from " + c.from + " to " + c.to + " in a food chain, most of the energy is",
    "used by " + c.from + " for its life processes or lost as heat",
    ["passed on unchanged, so the eater receives all of it",
     "stored in the soil when the organism dies and decays",
     "sent back to the producers to be used a second time"],
    "The first organism spends most of the energy it took in on living: moving, growing and keeping its body working, and much of it leaves as heat. Only the small part stored in its body tissues is available to the eater. Energy does not cycle back to producers; matter cycles, energy flows through and out.", {});
}, ["Matter cycles in an ecosystem, but energy does not. Keep the two apart.", "Ask what the first organism does with energy before it is ever eaten."]);

E("s7-u1-web-readoff", 1, ["SC7.1.6"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. Which organisms does the frog eat?",
      "Minnows and dragonflies",
      ["Algae and cattails", "Minnows and herons", "Snails and water fleas"],
      "Arrows point from the organism eaten to the eater. The arrows running into the frog come from the minnow and the dragonfly, so those are what the frog eats. The arrow from the frog runs on to the heron, which means the heron eats the frog, not the reverse.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. Which organism is eaten by BOTH the lynx and the owl?",
      "The hare",
      ["The marten", "The squirrel", "The moose"],
      "Follow the arrows into each predator. Arrows run from the hare to both the lynx and the owl, so both eat the hare. The squirrel is eaten by the marten and the owl but not the lynx, and nothing in the web eats the moose.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Arrows point at the eater. Find the arrows that end at the animal in the question.", "To find shared prey, list what each predator's incoming arrows come from and compare the lists."]);

E("s7-u1-web-removal", 1, ["SC7.1.6"], 3, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. If every minnow in the pond were removed, the frog population would most likely",
      "decrease, because the frogs lose one of their two food sources",
      ["decrease, because the herons would have nothing else to eat at all",
       "increase, because the water fleas the minnows ate would all go to the frogs",
       "stay the same, because frogs can switch to eating algae and cattails"],
      "In the web, frogs eat minnows and dragonflies. Removing minnows removes half the frogs' food supply, so the frog population would most likely fall. Frogs do not eat the producers in this web, and herons also eat frogs, so the heron link does not rescue the frogs.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. If the hare population crashed after a disease outbreak, which population would be affected FIRST and most directly, besides the hares themselves?",
      "The lynx and owl populations, which both feed on hares",
      ["The grass population, which would be eaten down by hungry moose",
       "The marten population, which hunts squirrels in the same trees",
       "The balsam fir population, which the hares never fed on at all"],
      "The hare's outgoing arrows run to the lynx and the owl: they are the hare's predators, so they feel the loss of their food source first and most directly. The marten eats squirrels, and the fir is not hare food in this web.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Find the removed organism's arrows: who eats it, and what else do those eaters eat?", "The first effects travel one arrow away from the change. Start there."]);

E("s7-u1-cr-web-change", 1, ["SC7.1.6"], 3, "var", varset([
  function () {
    var q = textq("Use the meadow food web diagram. A farmer sprays the meadow and the grasshopper population falls sharply. Explain the effect of this change on TWO other populations in the web, giving the reason for each effect.",
      ["Effects traced through arrows, for example: frogs decrease because grasshoppers are their food in the web; mice decrease or are pressured because they also eat grasshoppers and now compete for less; snakes decrease later because frogs and mice (their food) decline; hawks may decline as mice and snakes decline"],
      "<b>Model answer:</b> Any two effects correctly traced through the web earn the marks. Frog population: frogs eat grasshoppers (arrow from grasshopper to frog), so with far fewer grasshoppers the frogs have less food and their population falls. Snake population: snakes eat frogs and mice; mice also depend on grasshoppers for part of their food, so both of the snake's food sources are squeezed and the snake population falls as well. Hawk numbers could also fall, since hawks eat mice and snakes.<br><br><b>Marking points:</b> 1 mark for a first population correctly identified as affected. 1 mark for the reason, traced through the arrows of the web. 1 mark for a second population with its reason, traced the same way.", {});
    q.figure = s7WebQ(S7_WEB_MEADOW);
    return q;
  }
]), ["Start at the grasshoppers and follow their outgoing arrows to what eats them.", "Then follow one more step: what happens to the animals that eat those animals?"]);

/* ---------- SC7.1.7 Recycling of matter ---------- */

E("s7-u1-decomposer-role", 1, ["SC7.1.7"], 1, "gen", function () {
  var places = [
    { p: "a forest", d: "fallen leaves and dead branches" },
    { p: "a pond", d: "dead algae and plant stems" },
    { p: "a meadow", d: "dead grasses and animal droppings" }
  ];
  var s = pick(places);
  return mcq("In " + s.p + ", decomposers such as bacteria and fungi work on " + s.d + ". Their role in the ecosystem is to",
    "break the dead material down and return its nutrients to the soil for plants to use again",
    ["eat the dead material and store its nutrients in their bodies permanently",
     "change the dead material into sunlight energy that producers can capture",
     "remove the dead material from the ecosystem so its nutrients are gone for good"],
    "Decomposers break dead material down, and the nutrients in it are released back into the soil, where producers take them up again. That is how matter is recycled. The nutrients are not locked away, destroyed, or turned into energy.", {});
}, ["The key word is recycled: where do the nutrients in dead material end up?", "Plants cannot take in dead leaves whole. Something has to release what is in them."]);

E("s7-u1-nutrient-cycle", 1, ["SC7.1.7"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows the general cycle of nutrients in an ecosystem. Which arrow shows decomposers returning nutrients to the soil?",
      "Arrow D",
      ["Arrow A", "Arrow B", "Arrow C"],
      "Arrow D runs from the decomposers down to the soil: that is the step where breakdown releases nutrients back into the soil. Arrow A is plants taking nutrients up, arrow B is animals eating plants, and arrow C is dead organisms and wastes reaching the decomposers.", {});
    q.figure = S7_NUTRIENT_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows the general cycle of nutrients in an ecosystem. Which arrow shows nutrients entering a producer?",
      "Arrow A",
      ["Arrow B", "Arrow C", "Arrow D"],
      "Arrow A runs from the soil to the plants: producers take nutrients in from the soil through their roots. Arrow B is feeding (plants to animals), arrow C carries dead material to the decomposers, and arrow D is the decomposers releasing nutrients back to the soil.", {});
    q.figure = S7_NUTRIENT_SVG;
    return q;
  }
]), ["Name the start and end of each arrow before choosing.", "Decomposers sit between dead organisms and the soil in the cycle."]);

E("s7-u1-cr-recycling", 1, ["SC7.1.7"], 2, "var", varset([
  function () {
    return textq("A maple leaf falls to the forest floor in autumn. Describe the journey of the nutrients in that leaf until they become part of a living plant again. Name every group of organisms that plays a part.",
      ["Decomposers (bacteria and fungi, with small soil animals helping) break the leaf down; the nutrients are released into the soil; a plant takes them up through its roots and uses them to build new tissue"],
      "<b>Model answer:</b> On the forest floor the leaf is broken down by decomposers: fungi and bacteria digest the dead tissue (small soil animals shred it and speed the process). As the leaf breaks down, the nutrients it contains are released into the soil. A living plant then takes those nutrients up through its roots and uses them to build new leaves, stems and roots, so the leaf's nutrients are part of a living plant again.<br><br><b>Marking points:</b> 1 mark for decomposers (bacteria and fungi) breaking the leaf down and releasing its nutrients into the soil. 1 mark for a plant taking the nutrients up through its roots and using them to grow.", {});
  }
]), ["Think of it as a relay: dead leaf, then what breaks it down, then where the nutrients wait, then who collects them.", "Matter is recycled, so the journey must end back inside a living organism."]);

/* ---------- SC7.1.8 Changes over time: succession ---------- */

E("s7-u1-succession-identify", 1, ["SC7.1.8"], 1, "var", varset([
  function () {
    return mcq("A gravel pit was abandoned twenty years ago. At first the bare gravel grew only lichens and mosses. Grasses followed, then shrubs, and now young spruce trees are growing among the shrubs. The change described is",
      "ecological succession",
      ["ecological competition", "ecological recycling", "ecological tolerance"],
      "The gradual, ordered replacement of one community by another over time is ecological succession. The site shows the classic pattern: simple organisms first, then grasses, shrubs and trees in turn.", {});
  },
  function () {
    return mcq("A beaver pond slowly fills with sediment and dead plant material year after year. Grasses begin to grow where open water used to be. This gradual change is an example of",
      "ecological succession",
      ["ecological competition", "ecological recycling", "ecological tolerance"],
      "One community (open-water pond life) is gradually being replaced by another (meadow grasses) as conditions change. That ordered change of communities over time is ecological succession.", {});
  }
]), ["Look for the pattern over time: one community replacing another in a sequence.", "Competition and recycling happen inside a community; this item describes the community itself changing."]);

E("s7-u1-succession-types", 1, ["SC7.1.8"], 1, "gen", function () {
  var pool = [
    { s: "a new volcanic island rises from the sea and lichens are the first organisms to grow on its bare rock", t: "Primary succession", w: "it begins on bare rock where no soil or community existed before" },
    { s: "a spruce forest burns in a wildfire, and grasses and fireweed grow back the next summer from the soil that remains", t: "Secondary succession", w: "a community was disturbed but the soil survived, so regrowth starts from an existing base" },
    { s: "a glacier melts back and exposes bare rock and gravel that no organism has lived on", t: "Primary succession", w: "it begins on a brand-new surface with no soil" },
    { s: "a hay field is left uncut, and shrubs and then young trees move in over twenty years", t: "Secondary succession", w: "the soil and seed sources of the old community remain, so this is regrowth after a change, not a start from bare surface" }
  ];
  var it = pick(pool);
  var other = it.t === "Primary succession" ? "Secondary succession" : "Primary succession";
  return mcq("Which type of succession is described? " + it.s.charAt(0).toUpperCase() + it.s.slice(1) + ".",
    it.t,
    [other, "Climax succession", "Cyclic succession"],
    it.t + " is correct because " + it.w + ". Primary succession starts where no soil or previous community exists; secondary succession is regrowth where soil remains after a disturbance.", {});
}, ["Ask one question first: was there soil and a community there before?", "Bare new surface means primary; disturbed but soiled means secondary."]);

E("s7-u1-succession-sequence", 1, ["SC7.1.8", "SC7.3.11"], 2, "var", varset([
  function () {
    return mcq("After a wildfire burns a spruce forest, which sequence shows the order in which plants most likely return?",
      "Grasses and fireweed -> shrubs -> young spruce -> mature spruce forest",
      ["Grasses and fireweed -> young spruce -> mature spruce forest -> shrubs",
       "Shrubs -> grasses and fireweed -> young spruce -> mature spruce forest",
       "Young spruce -> grasses and fireweed -> shrubs -> mature spruce forest"],
      "After a fire, fast-growing grasses and fireweed colonize first, shrubs follow as the soil deepens and stabilizes, and spruce seedlings then grow up through the shrubs until a mature spruce forest stands again. Trees come last, not first, because they grow slowly and need the conditions the earlier stages create.", {});
  },
  function () {
    return mcq("A pond is slowly filling in over many years. Which sequence shows the order of change most likely to occur?",
      "Open water -> marsh plants at the edges -> wet meadow -> shrubs and trees",
      ["Open water -> shrubs and trees -> wet meadow -> marsh plants at the edges",
       "Marsh plants at the edges -> open water -> shrubs and trees -> wet meadow",
       "Wet meadow -> marsh plants at the edges -> open water -> shrubs and trees"],
      "Sediment and dead material build up from the edges inward, so marsh plants take hold first, then the filled ground supports a wet meadow, and finally shrubs and trees colonize the dry land. The sequence runs from water to land, never the reverse.", {});
  }
]), ["At each step ask: could this stage grow in the conditions the last stage left behind?", "The first stage after a disturbance is always the fast, simple one."]);

E("s7-u1-cr-succession-compare", 1, ["SC7.1.8"], 2, "var", varset([
  function () {
    return textq("Compare primary and secondary succession. In your answer, state how the starting conditions differ, and give one example of where each type could occur in Newfoundland and Labrador.",
      ["Primary succession starts on a bare surface with no soil (new volcanic or glacially exposed rock, a fresh landslide scar); secondary succession is regrowth where soil remains after a disturbance (forest regrowing after fire or harvesting, an abandoned field)"],
      "<b>Model answer:</b> Primary succession begins on a bare surface where there is no soil and no previous community, so it starts with organisms like lichens that can live on rock and begin soil formation; in this province, an example is rock newly exposed by a retreating glacier or a fresh landslide scar. Secondary succession is the regrowth of a community where soil already exists after a disturbance; an example is a spruce forest growing back after a wildfire, or shrubs and trees taking over an abandoned hay field. The starting conditions are the difference: no soil versus soil already present.<br><br><b>Marking points:</b> 1 mark for primary succession correctly described (bare surface, no soil) with a valid example. 1 mark for secondary succession correctly described (soil remains after disturbance) with a valid example.", {});
  }
]), ["The whole comparison turns on one thing: what is on the ground at the start.", "Give a real place for each type; an example proves the definition."]);

/* ---------- SC7.2.1 Scientifically appropriate word choice ---------- */

E("s7-u1-term-context", 1, ["SC7.2.1"], 1, "var", varset([
  function () {
    return mcq("Which statement uses the scientific terms correctly?",
      "The grasses are producers, the hares that eat them are consumers, and fungi return nutrients as decomposers",
      ["The grasses are consumers, the hares that eat them are producers, and fungi return nutrients as decomposers",
       "The grasses are producers, the hares that eat them are decomposers, and fungi return nutrients as consumers",
       "The grasses are decomposers, the hares that eat them are consumers, and fungi return nutrients as producers"],
      "Producers make their own food (grasses), consumers eat other organisms (hares), and decomposers break down dead material (fungi). Each wrong option swaps one pair of terms, so check all three roles before choosing.", {});
  },
  function () {
    return mcq("A student writes: \"The pond water is a biotic factor because fish swim in it.\" The error in this statement is that",
      "the water is an abiotic factor; only the fish are biotic",
      ["the fish are an abiotic factor; only the water is biotic",
       "pond water is a producer, not a factor of either kind",
       "there is no error; anything touching a living thing is biotic"],
      "Biotic means living. The water itself is non-living, so it is an abiotic factor, even though living fish swim in it. A factor is classified by what it is, not by what it touches.", {});
  }
]), ["Check every term in the statement, not just the first one.", "A term is right or wrong by what the thing IS, not by what is near it."]);

E("s7-u1-organization-set", 1, ["SC7.2.1"], 2, "var", varset([
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows a population?",
      "Panel B",
      ["Panel A", "Panel C", "Panel D"],
      "A population is all the members of one species in an area. Panel B shows a group of lynx, one species together. Panel A is a single individual, panel C is several species together (a community), and panel D adds the non-living surroundings (an ecosystem).", {});
    q.figure = S7_ORG_SVG;
    return q;
  },
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows an ecosystem?",
      "Panel D",
      ["Panel A", "Panel B", "Panel C"],
      "An ecosystem includes the living community AND its non-living surroundings. Only panel D shows the sun, pond and soil along with the organisms. Panel A is one individual, B is one species (a population), and C is the living species together (a community) without the abiotic parts.", {});
    q.figure = S7_ORG_SVG;
    return q;
  },
  function () {
    var q = mcq("The four panels show the same bog setting at four levels of organization. Which panel shows a community?",
      "Panel C",
      ["Panel A", "Panel B", "Panel D"],
      "A community is all the different species living together in an area: panel C shows lynx, hare and spruce together. It is not an ecosystem because the non-living parts are not shown; panel D adds those.", {});
    q.figure = S7_ORG_SVG;
    return q;
  }
]), ["Count species first: one organism, one species, many species, then many species plus non-living parts.", "The levels build in order: individual, population, community, ecosystem."]);

/* ---------- SC7.2.2 The food web as a tool ---------- */

E("s7-u1-web-roles", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram, in which each organism carries a letter. Which letter marks the only organism that eats the frog?",
      "H",
      ["E", "F", "G"],
      "Follow the arrows out of the frog: only one arrow leaves the frog, and it runs to the heron, letter H. The minnow (E) and dragonfly (F) are eaten by the frog (G), not the other way around.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram, in which each organism carries a letter. The organism at position D is best described as",
      "a consumer that is eaten by both the marten and the owl",
      ["a consumer that is eaten by both the lynx and the owl",
       "a producer that is eaten by both the marten and the moose",
       "a producer that is eaten by both the hare and the squirrel"],
      "Position D is the squirrel. Arrows run from the squirrel to the marten and to the owl, so both eat it, and the squirrel itself eats balsam fir seeds, making it a consumer. The hare is the organism eaten by both the lynx and the owl.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Find the letter first, then trace only that organism's arrows.", "Arrows point at the eater: an arrow FROM X TO Y means Y eats X."]);

E("s7-u1-web-chains", 1, ["SC7.2.2"], 2, "var", varset([
  function () {
    var q = mcq("Use the pond food web diagram. Which of these food chains is actually part of this web?",
      "Algae -> water flea -> minnow -> heron",
      ["Algae -> minnow -> dragonfly -> frog", "Cattail -> snail -> frog -> heron", "Heron -> frog -> dragonfly -> algae"],
      "Check each arrow: algae are eaten by water fleas, water fleas by minnows, and minnows by herons, so that chain exists link by link. Minnows do not eat algae directly in this web, nothing eats the snail, and the last chain runs the arrows backwards.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  },
  function () {
    var q = mcq("Use the forest food web diagram. Which of these food chains is actually part of this web?",
      "Grass -> hare -> owl",
      ["Balsam fir -> squirrel -> lynx", "Grass -> moose -> lynx", "Owl -> hare -> grass"],
      "Grass is eaten by hares and hares are eaten by owls, so that chain checks out link by link. Squirrels are eaten by martens and owls but not by lynx in this web, nothing eats the moose, and the last option runs the energy flow backwards.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Test a chain one arrow at a time; a chain fails if any single link is missing.", "Every arrow in your chain must exist in the diagram, pointing the same way."]);

E("s7-u1-web-predict", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = mcq("Use the meadow food web diagram. If all the clover in the meadow died in a drought, which population would be affected first and most directly?",
      "The bees, because clover is their only food source in the web",
      ["The frogs, because clover is their only food source in the web",
       "The hawks, because clover is their only food source in the web",
       "The mice, because clover is their only food source in the web"],
      "In the web, the only arrow into the bees comes from the clover: it is their sole food source shown. Grasshoppers also eat clover but eat grass as well, and frogs, hawks and mice do not eat clover at all, so the bees are hit first and hardest.", {});
    q.figure = s7WebQ(S7_WEB_MEADOW);
    return q;
  },
  function () {
    var q = mcq("Use the pond food web diagram. A summer of heavy heron predation sharply reduces the frog population. Which prediction follows most directly from the web?",
      "Dragonfly numbers rise, because one of their predators is now scarce",
      ["Dragonfly numbers fall, because the frogs were their main food source",
       "Minnow numbers fall, because the herons switch entirely to minnows",
       "Snail numbers rise, because the frogs were eating most of the snails"],
      "Frogs eat dragonflies in this web, so fewer frogs means less predation on dragonflies and their numbers rise. Frogs do not eat snails, and herons already eat minnows alongside frogs, so neither of those predictions follows directly.", {});
    q.figure = s7WebQ(S7_WEB_POND);
    return q;
  }
]), ["A population with only one incoming arrow has no backup food source.", "Predict one arrow at a time: food lost, eater down; predator lost, prey up."]);

E("s7-u1-cr-web-interpret", 1, ["SC7.2.2"], 3, "var", varset([
  function () {
    var q = textq("Use the forest food web diagram. (a) Name the two producers in the web. (b) Explain what the arrows in a food web show. (c) A spruce budworm outbreak kills most of the balsam fir. State ONE effect this could have on the web and explain it using the arrows.",
      ["(a) Grass and balsam fir. (b) Arrows show the flow of energy: they point from the organism that is eaten to the organism that eats it. (c) Effects traced by arrows, for example: moose lose one of their two foods and may decline or depend wholly on grass; squirrels lose their only food in the web and decline; martens and owls then lose the squirrels"],
      "<b>Model answer:</b> (a) The producers are the grass and the balsam fir: nothing in the web points into them as food for themselves; every chain starts at one of them. (b) An arrow points from the organism that is eaten to the organism that eats it, so the arrows trace how energy flows through the web. (c) Example: the squirrel's only incoming arrow is from the balsam fir, so if the fir mostly dies, the squirrels lose their food supply and their population falls; the marten and the owl, which both eat squirrels, are then affected in turn. (The moose also eats fir, but it has grass as a second source.)<br><br><b>Marking points:</b> 1 mark for both producers named (grass and balsam fir). 1 mark for the arrow meaning: energy flow, from the eaten to the eater. 1 mark for one effect of the fir loss traced correctly through the arrows.", {});
    q.figure = s7WebQ(S7_WEB_FOREST);
    return q;
  }
]), ["Producers are the organisms with no incoming food arrows; everything starts there.", "For part (c), pick one organism that eats the fir and follow what happens to it."]);

/* ---------- SC7.2.3 Silviculture ---------- */

E("s7-u1-silviculture-why", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Silviculture, the practice of managing how forests grow back, developed mainly because",
      "people needed a continuous supply of wood, so cut forests had to be renewed on purpose",
      ["people needed forests cleared permanently, so regrowth had to be stopped after cutting",
       "people needed wood only once, so a single harvest could supply every future demand",
       "people needed paper, so natural forests were replaced everywhere by plantations of one species"],
      "Wood is used continuously for lumber, paper, fuel and more. Once cutting outpaced natural regrowth, renewing the forest deliberately became necessary so the supply would not run out: that need is what produced silviculture.", {});
  },
  function () {
    return mcq("Which statement best explains why natural regrowth alone was not enough to meet the demand for wood?",
      "Harvesting removed trees faster than the forest could replace them on its own",
      ["Harvesting removed trees so slowly that young forests crowded out the old ones",
       "Natural regrowth produced more wood than the mills of the province could use",
       "Natural regrowth stopped completely once the first trees were cut in an area"],
      "Demand kept growing while natural regrowth stayed slow. When removal outruns replacement, the forest shrinks, so managing the regrowth became a deliberate practice.", {});
  }
]), ["Start from the demand: is wood needed once, or over and over?", "Silviculture is about the NEXT forest, not the one being cut."]);

E("s7-u1-silviculture-practice", 1, ["SC7.2.3"], 1, "var", varset([
  function () {
    return mcq("Which of the following is a silviculture practice?",
      "Planting spruce seedlings on a harvested site so a new stand grows back",
      ["Building a woods road so trucks can reach a harvesting site more easily",
       "Milling logs into lumber at a sawmill for house construction in the town",
       "Selling cutting permits to companies that want to harvest in the region"],
      "Silviculture is the tending of the growing forest: planting, thinning and otherwise renewing the stand. Roads, milling and permits belong to harvesting and industry, not to growing the next forest.", {});
  },
  function () {
    return mcq("A forestry crew returns to a young stand and removes some of the crowded trees so the remaining trees have room, light and nutrients to grow well. This practice is called",
      "thinning, a silviculture practice",
      ["clearcutting, a harvesting practice", "milling, an industrial practice", "surveying, a mapping practice"],
      "Removing some trees to improve the growth of the rest is thinning, and it is part of silviculture because its purpose is the health and growth of the standing forest, not the removal of the crop.", {});
  }
]), ["Ask whether the action grows the next forest or removes the present one.", "Planting and thinning tend trees; cutting and milling take them away."]);

E("s7-u1-cr-silviculture", 1, ["SC7.2.3"], 2, "var", varset([
  function () {
    return textq("For hundreds of years, people in this province cut wood for fuel, boats and building, taking the trees nearest to their communities. Explain how this growing, continuous need for wood led to the development of silviculture as a deliberate practice.",
      ["As demand continued and nearby stands were cut faster than they regrew, people faced shrinking forests and longer trips for wood; ensuring a future supply required renewing forests on purpose: planting, protecting young stands and managing growth, which is silviculture"],
      "<b>Model answer:</b> Wood was not a one-time need: every year brought new demand for fuel, boats, houses and later pulp and lumber. Cutting concentrated near communities, and trees were removed faster than natural regrowth replaced them, so usable forest near settlements shrank and people had to travel farther for wood. A continuous supply could only be guaranteed by renewing the forest deliberately: planting harvested sites, protecting and tending young stands, and planning harvests around regrowth. That deliberate renewal is silviculture, and it developed because the need for wood never stopped.<br><br><b>Marking points:</b> 1 mark for the pressure: continuous demand with cutting outrunning natural regrowth. 1 mark for the response: deliberate renewal (planting, tending, planning) named as silviculture and tied to securing the supply.", {});
  }
]), ["Tell it as a cause and a response: what pressure built up, and what did people start doing about it?", "The word continuous is doing the work in this indicator."]);

/* ---------- SC7.2.4 Harvesting decisions (SR entries are knowledge support for the decision CR) ---------- */

E("s7-u1-harvest-knowledge", 1, ["SC7.2.4"], 2, "var", varset([
  function () {
    return mcq("Which of the following is a genuine environmental disadvantage of clearcutting a forest site?",
      "Removing every tree exposes the soil, so rain can wash it into nearby streams",
      ["Removing every tree makes the site replant itself faster than any other method",
       "Removing every tree protects the streams nearby from sediment and runoff",
       "Removing every tree leaves the wildlife habitat of the site completely unchanged"],
      "With no roots or canopy left, clearcut ground erodes: soil washes into streams, harming fish habitat. Clearcutting is usually the cheapest harvest method, which is its advantage; habitat loss and erosion are its real disadvantages.", {});
  },
  function () {
    return mcq("Selective harvesting, in which only some trees are removed and the rest of the stand is left standing, is usually more expensive per load of wood than clearcutting mainly because",
      "crews and machines must work around the standing trees and make more trips for less wood",
      ["the trees left standing have to be paid for twice before the wood can be sold",
       "selective sites are always farther from the mills than clearcut sites are located",
       "the wood from a selective harvest is worth less per log than clearcut wood is"],
      "Working around standing trees is slower and yields less wood per trip, so costs per load rise. The wood itself is the same product; the difference is the effort of taking part of a stand while leaving the rest undamaged.", {});
  }
]), ["Keep advantages and disadvantages in separate columns as you read each option.", "A claimed advantage that is really a cost, or the reverse, is the trap in these items."]);

E("s7-u1-harvest-effects", 1, ["SC7.2.4"], 1, "var", varset([
  function () {
    return mcq("After a site is clearcut, planting seedlings promptly is important mainly because the young trees",
      "hold the soil and restart the forest before erosion and competing shrubs take over",
      ["stop all other plants from growing on the site for the life of the new stand",
       "make the site ready for a second clearcut within two or three years of planting",
       "remove the need to leave any buffer of trees along the streams on the site"],
      "Bare ground erodes and shrubs can crowd out slow-starting seedlings. Prompt planting gets roots into the soil and gives the new stand a head start. It does not remove the need for stream buffers, and a new stand takes decades, not years, to mature.", {});
  }
]), ["Think about what bare ground does in the rain, and what races the seedlings to grow.", "Replanting is about securing the next stand early, not about finishing the job."]);

E("s7-u1-cr-harvest-decision", 1, ["SC7.2.4"], 3, "var", varset([
  function () {
    return textq("A company proposes to harvest a spruce valley in central Newfoundland. The valley has a salmon stream running through it, and the town nearby depends on the woods work for jobs. The company offers two plans: clearcut the whole valley in one season, or selective harvest over ten years, taking about a third of the trees. Choose ONE plan and defend it as the better decision. Your defence must use at least one environmental advantage and address at least one disadvantage of your chosen plan.",
      ["Either plan can earn full marks. Clearcut defence: cheaper and faster, one disturbance then replanting, jobs secured now; must address erosion or stream risk and habitat loss, with mitigation such as buffers. Selective defence: soil and habitat largely stay, stream protected, work spread over ten years; must address higher cost per load and repeated machine disturbance"],
      "<b>Model answer:</b> (Selective plan, as an example.) The selective harvest is the better decision. Environmentally, leaving two thirds of the stand standing keeps roots holding the soil, so the salmon stream is protected from the sediment that a full clearcut would wash into it, and much of the valley's wildlife habitat survives the harvest. Jobs also last: the work is spread over ten years instead of ending in one season. The plan's real disadvantage is cost: crews work around standing trees and haul less wood per trip, so the wood costs more to produce, and machines enter the valley repeatedly over the decade. On balance the stream and the longer employment outweigh the higher cost. A defence of the clearcut plan earns the same marks if it uses a real advantage (lowest cost, one disturbance followed by prompt replanting and buffers) and honestly addresses a real disadvantage.<br><br><b>Marking points:</b> 1 mark for a clear choice of plan. 1 mark for at least one genuine environmental advantage of the chosen plan, correctly explained. 1 mark for a genuine disadvantage of the chosen plan, addressed rather than ignored.", {});
  }
]), ["There is no single right plan here; there is only a well-defended one.", "Name a real cost of YOUR plan and deal with it. Pretending it has none loses the mark."]);

/* ---------- SC7.2.5 Boreal forest ecology and practice ---------- */

E("s7-u1-boreal-practice", 1, ["SC7.2.5"], 1, "var", varset([
  function () {
    return mcq("Black spruce, the main tree of the boreal forest, has cones that stay closed on the tree for years and open to release their seeds after the heat of a fire. This adaptation means the boreal forest is best described as",
      "adapted to renew itself after fire, a natural part of its cycle",
      ["unable to survive any disturbance, since fire destroys its seeds",
       "dependent on people planting seedlings after every disturbance",
       "slowest to recover of all forest types after any kind of damage"],
      "Cones that open with heat drop seeds onto freshly burned ground exactly when the parent trees are gone: the forest is built to regenerate after fire. Fire is a renewal event in the boreal cycle, not simply a disaster.", {});
  },
  function () {
    return mcq("In the boreal forest, insect outbreaks such as spruce budworm kill large patches of fir and spruce. For the forest ecosystem, these outbreaks are",
      "a natural disturbance that creates openings where new growth and other species move in",
      ["a sign that the forest has stopped following its natural cycle of renewal",
       "damage that the forest cannot recover from without people replanting it",
       "harmful only to the trees, with no effect on any other part of the forest"],
      "Budworm outbreaks are part of the boreal cycle: the dead patches let in light, young trees and shrubs grow, and the wildlife community shifts. The forest renews itself afterward without planting.", {});
  }
]), ["Ask whether the disturbance is foreign to this forest or part of how it has always worked.", "The boreal forest's own adaptations are the evidence. Start from the cones."]);

E("s7-u1-boreal-effects", 1, ["SC7.2.5"], 2, "var", varset([
  function () {
    return mcq("Knowing that the boreal forest renews itself in patches after fire, a harvesting company cuts in patches of different sizes and ages across a region instead of clearing one huge area. The positive effect of this practice is that",
      "the region keeps a mix of forest ages, so species that need young forest and species that need old forest both keep habitat",
      ["the region's forest becomes one even age, which is what most wildlife species prefer for habitat",
       "the patches grow back at exactly the same rate, so the harvest can repeat every single year",
       "no part of the region is ever disturbed, so the forest stays exactly as it was before"],
      "Fire leaves a patchwork of ages across the boreal landscape, and patch harvesting copies that pattern. A mix of ages means the full range of habitat survives somewhere in the region at all times, which a single huge cut or a single even-aged forest cannot offer.", {});
  },
  function () {
    return mcq("Harvest planners now leave a strip of uncut trees along both sides of a salmon stream. This practice, borrowed from how natural forests shade and protect waterways, has the positive effect of",
      "keeping the water shaded and cool and stopping soil from washing into the stream",
      ["warming the water so young salmon grow faster through the winter months",
       "diverting the stream so harvest machines can cross it at any point",
       "removing the need to replant the harvested areas beside the stream"],
      "Standing trees shade the water (salmon need it cool) and their roots hold the banks, keeping sediment out. The strip is left permanently; it is not a crossing or a substitute for replanting.", {});
  }
]), ["Both items describe copying a natural pattern. Name the pattern, then the effect follows.", "Ask: what does the natural version of this (fire patches, streamside forest) do for the ecosystem?"]);

E("s7-u1-cr-boreal-example", 1, ["SC7.2.5"], 3, "var", varset([
  function () {
    return textq("Provide ONE example of how our understanding of boreal forest ecology has influenced a harvesting practice, and identify the positive effect of that practice. Your answer must connect the ecology (what we learned about how this forest works) to the practice it produced.",
      ["Any well-connected example, for example: learning that fire renews the boreal forest in patches led to patch harvesting that mimics fire, whose positive effect is a lasting mix of forest ages and habitats; or learning that black spruce reseeds after disturbance led to leaving seed trees or relying on natural seeding on suitable sites"],
      "<b>Model answer:</b> Ecologists established that the boreal forest renews itself through fire, which leaves a patchwork of stands of different ages across the landscape. Harvesting practice changed to copy that pattern: companies cut in patches of varied sizes instead of clearing whole regions at once. The positive effect is that the region always holds some young forest, some middle-aged forest and some old forest at the same time, so the species that depend on each stage keep their habitat and the forest as a whole stays closer to its natural structure.<br><br><b>Marking points:</b> 1 mark for a correct piece of boreal ecology (fire renewal, patch structure, reseeding after disturbance). 1 mark for the harvesting practice that follows from it. 1 mark for the positive effect of the practice, stated as an outcome, not a hope.", {});
  }
]), ["Build the answer in three links: what we learned, what changed, what good it did.", "An example with the ecology missing is just a practice; the indicator asks for the connection."]);

/* ---------- SC7.2.6 Careers (thin feed; SME flag) ---------- */

E("s7-u1-career-match", 1, ["SC7.2.6"], 1, "var", varset([
  function () {
    return mcq("Which career is directly concerned with renewing and tending a forest after harvesting?",
      "Silviculture technician",
      ["Sawmill operator", "Truck dispatcher", "Woodlands surveyor"],
      "A silviculture technician plants, thins and tends young stands: the renewing and tending work itself. The other careers move, process or map wood and land rather than growing the next forest.", {});
  },
  function () {
    return mcq("Which career is directly concerned with protecting fish and wildlife populations in a forest region?",
      "Wildlife officer",
      ["Harvest supervisor", "Lumber grader", "Road engineer"],
      "A wildlife officer monitors and protects fish and wildlife populations and enforces the rules that protect them. The other careers organize cutting, judge lumber quality or build access roads.", {});
  }
]), ["Match the career to the verb: growing, protecting, cutting, processing, or mapping.", "The career name usually contains its own clue. Use it."]);

E("s7-u1-career-scenario", 1, ["SC7.2.6"], 2, "var", varset([
  function () {
    return mcq("For six weeks each spring, Dana walks harvested sites with a crew, checking that seedlings were planted at the right spacing and counting how many survived the winter. Dana's job is most likely",
      "silviculture technician",
      ["harvest supervisor", "lumber grader", "wildlife officer"],
      "Checking planting quality and seedling survival is tending the new stand: silviculture work. A harvest supervisor runs the cutting, a grader judges sawn lumber, and a wildlife officer protects animal populations.", {});
  },
  function () {
    return mcq("Through the fall, Marcus checks hunting licences in the woods, investigates reports of poaching, and helps count the caribou herd. Marcus's job is most likely",
      "wildlife officer",
      ["forestry technician", "harvest supervisor", "silviculture technician"],
      "Licences, poaching investigations and herd counts are wildlife protection work: a wildlife officer. The other careers tend trees or run harvest operations.", {});
  }
]), ["List the tasks in the scenario and ask which career's daily work they are.", "Ignore the season and the name; the duties decide the match."]);

/* ---------- SC7.2.7 Protecting a local habitat (SR entries are knowledge support for the decision CR) ---------- */

E("s7-u1-habitat-influences", 1, ["SC7.2.7"], 1, "var", varset([
  function () {
    return mcq("Which of the following is a human influence that directly removes an organism's habitat?",
      "Draining a wetland to build a parking lot",
      ["A drought drying a wetland for one summer", "A fox hunting the wetland's frogs in spring", "A storm blowing down trees at the wetland's edge"],
      "Draining is a deliberate human act that eliminates the habitat itself. Drought, predation and storms are natural events; the organism's habitat still exists after them.", {});
  },
  function () {
    return mcq("An introduced species, the green crab, arrives in a bay and eats young clams and eels grass beds. For the bay's native organisms, the green crab is a human influence because",
      "people's activities carried it to a place it could never have reached on its own",
      ["it is a stronger competitor than any species that evolved in the bay's waters",
       "it eats more species of prey than any native predator in the bay ever has",
       "people released it on purpose to control other species living in the bay"],
      "Introduced species count as a human influence because human transport (here, shipping) moved them. Whether they were released deliberately does not matter; the clams' problem began with people carrying the crab across an ocean it could not cross itself.", {});
  }
]), ["Separate what people did from what nature did; only one option is ours.", "An influence can be human even when nobody intended the harm."]);

E("s7-u1-habitat-tradeoffs", 1, ["SC7.2.7"], 2, "var", varset([
  function () {
    return mcq("A town protects a nesting beach for an endangered shorebird by closing it to visitors each summer. Which of the following is a genuine disadvantage of this protection?",
      "Local businesses lose some summer visitors who came for the beach",
      ["The shorebirds lose their nesting habitat to the visitors who stay away",
       "The beach erodes faster once people stop walking on the nesting area",
       "The shorebirds must find a new beach because protection drives them off"],
      "Protection has real costs: closing a popular beach costs the town visitor business. The other options reverse the effects: protection keeps the habitat and the birds, and less foot traffic means less erosion, not more.", {});
  },
  function () {
    return mcq("A company offers to build a wind farm on a ridge where a rare butterfly's only local habitat is found, promising jobs and clean power. Which statement identifies the central trade-off honestly?",
      "The project brings jobs and clean energy, but building on the ridge could destroy the butterfly's only local habitat",
      ["The project brings jobs and clean energy, and the ridge habitat will be improved by the construction work",
       "The project has no real benefits, since wind power does not reduce the use of other energy sources",
       "The project threatens the habitat, but butterflies can simply be moved to any other ridge in the region"],
      "An honest trade-off names a real gain and a real loss. The gain is jobs and clean power; the loss is the possible destruction of a habitat that exists nowhere else locally. Butterflies tied to one ridge cannot simply be relocated, and the habitat will not be improved by building on it.", {});
  }
]), ["A trade-off item always has one option with a real gain AND a real loss. Find it.", "Cross out any option that pretends one side of the decision is cost-free."]);

E("s7-u1-cr-habitat-defence", 1, ["SC7.2.7"], 3, "var", varset([
  function () {
    return textq("A rare shorebird nests each summer on one gravel beach in your region, the only nesting site it has locally. A developer proposes a campground on that beach, which would bring jobs and visitors to the town. Defend a course of action to protect the bird's habitat. Your defence must state your course of action clearly, give the reason it protects the habitat, and deal honestly with one thing your plan gives up or costs.",
      ["Any clear, defensible course of action, for example: refuse the campground on this beach and help the developer find another site; or allow a smaller campground set back from the nesting area with the beach closed during nesting season. Must name the habitat reason and one real cost (lost jobs or visitors, higher cost of another site, reduced access)"],
      "<b>Model answer:</b> Course of action: the campground should not be built on the nesting beach; the town should work with the developer to place it on the next beach along the coast, which has no nesting birds. Reason: this beach is the bird's only local nesting site, so building on it does not just disturb the birds for one season, it removes the habitat the local population depends on, and a displaced rare bird has nowhere equivalent to go. The honest cost: the alternate site is farther from the town's services, so the campground will cost more to service and may draw fewer visitors in its first years, and some of the promised jobs may be delayed. Protecting the only site is worth that cost because a delayed campground can still succeed, while a lost nesting site cannot be rebuilt.<br><br><b>Marking points:</b> 1 mark for a clear course of action. 1 mark for the habitat reason, tied to this organism and this site. 1 mark for one genuine cost of the plan, honestly faced.", {});
  }
]), ["State the action in one sentence first; everything else hangs off it.", "Your plan must cost something. Naming the cost makes the defence believable."]);

/* ---------- SC7.2.8 Groups interested in protecting the environment (THIN; SME flag) ---------- */

E("s7-u1-groups-match", 1, ["SC7.2.8"], 1, "var", varset([
  function () {
    return mcq("Which of the following groups works to protect the environment at the international level, in many countries at once?",
      "A worldwide conservation organization with offices in dozens of countries",
      ["A local naturalist club that leads walks in one community's parks",
       "A provincial government department that manages one province's parks",
       "A school science club that runs a cleanup of its own schoolyard"],
      "The scale decides the level: an organization working in dozens of countries is international. The club is local, the department is provincial, and the school club is smaller still.", {});
  },
  function () {
    return mcq("A group of residents forms a society to protect the marsh at the edge of their town and begins holding meetings and cleanups. This group is best described as",
      "a local community group interested in protecting the environment",
      ["a national conservation organization with chapters in every province",
       "a government department responsible for environmental regulations",
       "an international body that negotiates agreements between countries"],
      "Residents acting for their own community's marsh are a local group. Nothing in the description gives them national reach, government authority or an international role.", {});
  }
]), ["Judge each group by its scale: community, province, country, or world.", "The group's actions in the description tell you its level; do not be distracted by its enthusiasm."]);

E("s7-u1-groups-interest", 1, ["SC7.2.8"], 2, "var", varset([
  function () {
    return mcq("A company proposes a quarry beside a wetland. At the public meeting, one speaker says: \"My grandchildren fish in that pond every summer, and I want it kept clean and full of life for them.\" This speaker's interest in the wetland is best described as",
      "a local resident's interest in keeping a valued place healthy for family and community use",
      ["a scientist's interest in the wetland as a site for long-term research studies",
       "a business interest in the wetland as a source of gravel for construction",
       "a government interest in the wetland as a site for a new protected park"],
      "The speaker speaks as a resident and grandparent who uses and values the place. Nothing in the statement claims research, profit or government plans; the interest is personal and local.", {});
  },
  function () {
    return mcq("At the same meeting, a second speaker presents water-quality measurements taken at the wetland every month for five years and argues the quarry would change them. This speaker's interest is best described as",
      "a scientific interest in the wetland as a place to study and monitor over time",
      ["a business interest in the wetland as a source of gravel for construction",
       "a resident's interest in keeping a valued place for family recreation",
       "a tourism interest in the wetland as an attraction for visiting birdwatchers"],
      "Five years of monthly measurements is monitoring: the speaker's stake in the wetland is as a study site whose record would be broken by the quarry. Match the interest to the evidence the speaker actually brings.", {});
  }
]), ["Match the interest to what the speaker actually says and does.", "Different people can want the same outcome for different reasons; the reason is the interest."]);

/* ---------- SC7.3.1 Identifying questions ---------- */

E("s7-u1-question-identify", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("A class is about to study the schoolyard ecosystem. Which of the following questions could actually be investigated by observing and measuring in the schoolyard?",
      "Which plant species growing in the schoolyard attracts the most insects?",
      ["Why is the schoolyard the nicest ecosystem in the whole region?",
       "Do insects prefer living in the schoolyard to living anywhere else?",
       "Which organism in the schoolyard is the most important of all?"],
      "An investigable question can be answered with observations or measurements: students can count insects on each plant species. The other questions ask for opinions or judgements (nicest, most important) or compare against everywhere else, which cannot be observed.", {});
  },
  function () {
    return mcq("Which of the following questions about a pond could be investigated with a school field study?",
      "How does the number of frogs at the pond change between spring and fall?",
      ["Are ponds better ecosystems than forests for the animals that live in them?",
       "Why do frogs deserve to have the pond kept exactly as it is forever?",
       "Would the pond be more beautiful if it had more frogs living in it?"],
      "Counting frogs in different seasons is observation and measurement, so the question is investigable. The others ask for value judgements (better, deserve, more beautiful) that no measurement can settle.", {});
  }
]), ["Ask: could I answer this by counting, measuring or observing? If not, it is not investigable.", "Watch for opinion words: nicest, best, most important, deserve."]);

E("s7-u1-question-identify-2", 1, ["SC7.3.1"], 1, "var", varset([
  function () {
    return mcq("Which of the following is NOT an investigable question about a local ecosystem?",
      "Why do earthworms matter more than any other organism in the soil?",
      ["How many earthworms live in one square metre of the schoolyard soil?",
       "Does the number of earthworms change after a week of heavy rain?",
       "In which part of the schoolyard, sunny or shaded, are earthworms found most often?"],
      "The first question asks for a judgement about importance, which cannot be measured. The other three can each be answered by counting or comparing earthworms in the field.", {});
  },
  function () {
    return mcq("Which of the following is NOT an investigable question about a forest ecosystem?",
      "Which tree species is the most beautiful one growing in the forest?",
      ["How tall is the tallest spruce tree growing along the forest trail?",
       "Which insects are found on spruce trees and which on birch trees?",
       "How does the number of seedlings differ between the sunny and shaded sides of the trail?"],
      "Most beautiful is a matter of taste, not measurement. Heights, insect locations and seedling counts can all be observed and recorded, so those questions are investigable.", {});
  }
]), ["Three of the questions can be answered with a tape measure, a count or a tally. One cannot.", "The odd one out usually hides an opinion inside a scientific-sounding sentence."]);

E("s7-u1-question-best", 1, ["SC7.3.1"], 2, "var", varset([
  function () {
    return mcq("A class has one afternoon to study a bog near the school. Which question is the strongest choice for their investigation?",
      "How does the number of insect species caught differ between the open bog and its wooded edge?",
      ["What is everything that lives in the bog and how does each species affect all the others?",
       "Why is the bog an important ecosystem for the whole province of Newfoundland and Labrador?",
       "How has the bog changed over the past thousand years of its existence on this site?"],
      "The first question is bounded: one afternoon, one comparison, countable results. The others are too large for the time (everything, the whole province, a thousand years) and could not be answered with the class's own observations.", {});
  }
]), ["Strong questions fit the time, the place and the tools actually available.", "If a question needs a thousand years or a whole province, it is not a one-afternoon question."]);

/* ---------- SC7.3.2 Defining and delimiting questions ---------- */

E("s7-u1-delimit-choose", 1, ["SC7.3.2"], 1, "var", varset([
  function () {
    return mcq("A student starts with the question \"How do plants grow?\" Which rewritten version is properly delimited for an investigation?",
      "How does the amount of sunlight affect the growth of bean seedlings over three weeks?",
      ["How do plants grow in different places all around the world?",
       "How do plants grow, and what do animals do while they are growing?",
       "Why do plants grow the way they do in nature over long periods?"],
      "The delimited version names the organism (bean seedlings), the factor tested (sunlight), the outcome measured (growth) and the time frame (three weeks). The others stay just as broad as the original or get broader.", {});
  },
  function () {
    return mcq("A student starts with the question \"What lives in soil?\" Which rewritten version is properly delimited for an investigation?",
      "Which organisms can be found in the top 10 cm of soil under the schoolyard's spruce trees?",
      ["What lives in soil in every ecosystem found across the island of Newfoundland?",
       "What lives in soil, and how do those organisms feel about living there?",
       "Why does soil contain so many different kinds of living things inside it?"],
      "The delimited version fixes the place (under the schoolyard spruce trees), the depth (top 10 cm) and what will be recorded (which organisms). The others widen the question or ask for feelings and reasons that cannot be observed.", {});
  }
]), ["A delimited question names what, where, and over how long.", "Cross out any rewrite that is as wide as the question you started with."]);

E("s7-u1-delimit-rewrite", 1, ["SC7.3.2"], 2, "var", varset([
  function () {
    return mcq("A class observes that some bean seeds in a tray sprouted and others did not. They want to investigate the effect of salt in the soil. Which problem statement best delimits their investigation?",
      "Does adding salt to the soil change the percentage of bean seeds that germinate within ten days?",
      ["Does salt affect plants in general, in any soil, at any time of the year?",
       "What happens to bean seeds when conditions around them are changed somehow?",
       "Why do bean seeds sometimes fail to sprout when they are planted in soil?"],
      "The first statement can be tested directly: salt is added or not, germination is counted, and the time is fixed at ten days. The others either widen the scope to all plants everywhere or never name the factor being tested.", {});
  }
]), ["A testable problem statement names the factor changed and the result counted.", "If the statement could describe a hundred different experiments, it is not delimited yet."]);

/* ---------- SC7.3.3 Organizing and recording field information (CORE: cognitive core only) ---------- */

E("s7-u1-instrument-choose", 1, ["SC7.3.3"], 1, "var", varset([
  function () {
    return mcq("A team is recording conditions at four spots in the schoolyard. They need to measure the air temperature at each spot. Which instrument should they choose?",
      "A thermometer",
      ["A light meter", "A magnifying glass", "A wind recorder"],
      "Temperature is measured with a thermometer. A light meter measures light, a wind recorder measures wind, and a magnifying glass only makes small objects easier to see.", {});
  },
  function () {
    return mcq("A team wants to compare how bright the light is in the open schoolyard and under the spruce trees. Which instrument gives them a measurement they can record and compare?",
      "A light meter",
      ["A field guide", "A magnifying glass", "A thermometer"],
      "A light meter measures light intensity in numbers that can be recorded and compared between the two spots. A field guide identifies organisms, a magnifier enlarges them, and a thermometer measures temperature, not light.", {});
  }
]), ["Match the instrument to the quantity named in the question: temperature, light, or wind.", "An instrument is only the right choice if it measures the thing being recorded."]);

E("s7-u1-record-format", 1, ["SC7.3.3"], 2, "var", varset([
  function () {
    return mcq("A team records the schoolyard using fixed descriptive scales: for light they record full sun, part shade or full shade, and for wind they record calm, light breeze or strong wind. Why is recording with fixed scales better than each student writing their own description?",
      "Every spot is described with the same words, so the records can be compared fairly",
      ["Fixed scales make the records longer, so the report looks more complete",
       "Fixed scales remove the need to visit each spot more than one time",
       "Every spot receives the same description, so the data is easier to copy"],
      "Comparisons are only fair when every observation uses the same categories. If one student writes \"quite bright\" and another writes \"medium\", the two spots cannot be compared. Fixed scales give all observers the same words for the same conditions.", {});
  },
  function () {
    return mcq("Which recording table is set up correctly for comparing four schoolyard spots?",
      "A table with one row per spot and columns for temperature, light, wind and organisms observed",
      ["A table with one row per organism and a single column labelled \"schoolyard notes\"",
       "A paragraph describing the first spot, with the other spots added if space remains",
       "A list of temperatures with no record of which spot each was measured at"],
      "Comparing spots requires the same information recorded the same way for each spot: one row per spot, one column per measurement. Temperatures without locations, or notes without structure, cannot support a comparison.", {});
  }
]), ["Recording is for comparing later. Ask whether the format keeps every spot's data side by side.", "Same rows, same columns, same words: that is what makes field records usable."]);

E("s7-u1-record-plan", 1, ["SC7.3.3"], 3, "var", varset([
  function () {
    return mcq("A team plans to record the schoolyard at four spots. Which plan produces records that can actually be compared?",
      "Visit all four spots within the same hour, use the same instruments and scales at each, and record in the same table",
      ["Visit one spot each week for four weeks, so the team can take its time at every spot",
       "Let each member choose their own instruments and scales, so more kinds of data are collected",
       "Record the first spot in full detail and the others from memory at the end of the visit"],
      "Conditions change with time and weather, so spots visited weeks apart, or measured with different instruments and scales, cannot be compared fairly. Same hour, same tools, same table: those are what make the four records one data set.", {});
  }
]), ["A comparison fails if the conditions of measuring changed along with the place.", "Hold everything about the measuring constant; let only the spot vary."]);

/* ---------- SC7.3.4 Communicating questions, ideas, plans and results (CORE: cognitive core only) ---------- */

E("s7-u1-communicate-format", 1, ["SC7.3.4"], 1, "var", varset([
  function () {
    return mcq("A team must present its pond survey results to the class in five minutes, showing how the number of organisms differed between the sunny and shaded ends of the pond. Which format fits this purpose best?",
      "A bar graph of organism counts at the two ends, with a short spoken explanation",
      ["A long written essay describing every organism the team remembers seeing",
       "A poster of photographs of the pond with no counts or comparisons shown",
       "A list of the team's questions, with the results saved for a later presentation"],
      "The purpose is to compare counts, and a bar graph shows a comparison at a glance inside five minutes. An essay buries the comparison, photographs without counts show no results, and the questions alone omit the findings entirely.", {});
  },
  function () {
    return mcq("A student wants to explain to the school newsletter's readers, step by step, how her team carried out its schoolyard survey so another class could repeat it. Which format fits this purpose best?",
      "A written procedure in point form, in the order the steps were done",
      ["A single photograph of the schoolyard taken on the day of the survey",
       "A poem about the organisms the team found during the survey work",
       "A graph of the survey results with no description of the method used"],
      "Repeating a method requires the steps in order: a point-form procedure. A photograph, a poem and a results graph each communicate something, but none of them tells another class what to do.", {});
  }
]), ["Name the audience and the purpose first; the format follows from them.", "Comparing numbers wants a graph; repeating a method wants ordered steps."]);

E("s7-u1-communicate-judge", 1, ["SC7.3.4"], 2, "var", varset([
  function () {
    return mcq("A team's poster is titled \"Our Results\" but shows only drawings of the organisms they found, with no measurements, counts or comparisons. Judged against its stated purpose, the poster's main weakness is that",
      "it does not communicate the results it promises, only the organisms' appearance",
      ["it uses drawings instead of photographs, which are always required in science",
       "its title is too short to tell the audience what the poster is about",
       "it shows too many organisms, when a poster should show only one"],
      "A communication product is judged against its purpose. The title promises results, and results are measurements and comparisons; the poster delivers neither. Drawings are a legitimate choice, the title is clear, and showing several organisms is no fault in itself.", {});
  }
]), ["Judge the product against the job it claimed to do, not against a perfect poster.", "Ask: what did it promise, and what did it actually deliver?"]);

/* ---------- SC7.3.6 Evaluating group processes (CORE: cognitive core only; authored from the guide) ---------- */

E("s7-u1-evaluate-criteria", 1, ["SC7.3.6"], 2, "var", varset([
  function () {
    return mcq("A class is evaluating how well their teams worked during the schoolyard survey. Which question is a genuine evaluation of the group's process, rather than of its results?",
      "Did every member of the team get a fair share of the measuring, recording and reporting jobs?",
      ["Did the team record the highest temperature measured anywhere in the schoolyard that day?",
       "Did the team's table of results contain more rows of data than the other teams' tables?",
       "Did the team finish its survey and get back inside before any of the other teams in the class?"],
      "Evaluating a process asks how the work was done: sharing jobs fairly is about the process. The other options judge results (highest temperature, most rows) or speed, none of which says anything about how the group worked together.", {});
  },
  function () {
    return mcq("Which piece of evidence would best help a team evaluate its own planning process?",
      "A record of the decisions the team made before starting, compared with what it actually had to change in the field",
      ["The team's final mark on the survey report, compared with the average mark across the whole class",
       "A photograph of the team standing together at its first survey spot on the morning of the survey",
       "The number of instruments the team carried out to the schoolyard in its equipment box that day"],
      "Evaluating planning means checking the plan against what happened: decisions recorded beforehand, compared with the changes forced in the field, show exactly where the planning worked and where it failed. A mark judges the product, not the planning.", {});
  }
]), ["Process means how the work was done, not what the work produced.", "Evidence about a process has to come from during the work, not from the final product."]);

E("s7-u1-evaluate-next-step", 1, ["SC7.3.6"], 3, "var", varset([
  function () {
    return mcq("During a survey, one member of a four-person team did all the measuring while the others watched, and the team later could not explain how its own data was collected. Which next step best addresses the problem the team identified in its process?",
      "Rotate the jobs at each new spot, so every member measures, records and checks in turn",
      ["Let the same member keep measuring, since the data came out consistently this time",
       "Have the watching members write the report, so the work is shared out in the end",
       "Remove the member who measured from the team before the next survey begins"],
      "The problem is that the skills and the understanding stayed with one person. Rotating jobs at each spot spreads both, which fixes the process itself. Keeping the arrangement, shifting only the writing, or removing a member all leave the underlying problem in place.", {});
  }
]), ["The fix has to match the problem: if the doing was not shared, share the doing.", "A next step that only moves the paperwork has not repaired the process."]);

/* ---------- SC7.3.7 Using a key ---------- */

E("s7-u1-key-work", 1, ["SC7.3.7"], 1, "var", varset([
  function () {
    var q = mcq("Use the identification key figure. Specimen 1, found under a log, is identified by the key as",
      "a beetle",
      ["a fly", "a spider", "a butterfly"],
      "Work the key in order. Specimen 1 has six legs, so step 1 sends you to step 2. It has hard wing covers meeting in a straight line down its back, so step 2 identifies it as a beetle.", {});
    q.figure = s7KeyFigure(
      ["1a. Eight legs .......... spider", "1b. Six legs .......... go to 2",
       "2a. Hard wing covers meeting in a straight line down the back .......... beetle", "2b. No hard wing covers .......... go to 3",
       "3a. Only two wings .......... fly", "3b. Four wings .......... butterfly or moth"],
      ["Six legs; hard wing covers meeting in a straight line down its back; found under a log.",
       "Eight legs; two body sections; found at the centre of a web.",
       "Six legs; no hard wing covers; only two wings; found on a window."]);
    return q;
  }
]), ["Start at step 1 every time, and let the specimen's features choose the path.", "Never jump to the name that looks right; the key earns it step by step."]);

E("s7-u1-key-work-2", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    var q = mcq("Use the identification key figure. Which pair of key steps identifies specimen 3?",
      "Step 1b, then step 2b, then step 3a",
      ["Step 1a, then step 2a, then step 3a", "Step 1b, then step 2a", "Step 1a alone"],
      "Specimen 3 has six legs (step 1b, go to 2), no hard wing covers (step 2b, go to 3), and only two wings, so step 3a identifies it as a fly. The path has three steps because the key must separate it from spiders, beetles and four-winged insects in turn.", {});
    q.figure = s7KeyFigure(
      ["1a. Eight legs .......... spider", "1b. Six legs .......... go to 2",
       "2a. Hard wing covers meeting in a straight line down the back .......... beetle", "2b. No hard wing covers .......... go to 3",
       "3a. Only two wings .......... fly", "3b. Four wings .......... butterfly or moth"],
      ["Six legs; hard wing covers meeting in a straight line down its back; found under a log.",
       "Eight legs; two body sections; found at the centre of a web.",
       "Six legs; no hard wing covers; only two wings; found on a window."]);
    return q;
  }
]), ["Trace the path out loud: legs first, then wing covers, then wing count.", "Each step either names the organism or sends you onward. Count the steps you actually used."]);

E("s7-u1-key-choose", 1, ["SC7.3.7"], 2, "var", varset([
  function () {
    return mcq("Two insects both have six legs and no hard wing covers. One has two wings and the other has four. Which key feature separates them?",
      "The number of wings",
      ["The colour of the wings", "The size of the body", "The time of day each one is active"],
      "A usable key feature must be observable and must actually differ between the two specimens: wing number does both. Colour and size vary within a kind, and activity time cannot be observed on a collected specimen at all.", {});
  }
]), ["A key feature must split the pair cleanly: present in one, absent or different in the other.", "If both specimens could have the feature, it cannot separate them."]);

/* ---------- SC7.3.8 Designing experiments ---------- */

E("s7-u1-variables-identify", 1, ["SC7.3.8"], 1, "gen", function () {
  var pool = [
    { s: "A student waters bean plants with different amounts of salt water and measures how tall each plant grows in two weeks", iv: "The amount of salt in the water", dv: "the height the plants grow", dis: ["The type of bean plant used", "The size of the pots the plants grow in"] },
    { s: "A student places trays of seeds in rooms at different temperatures and counts how many seeds germinate", iv: "The temperature the seeds are kept at", dv: "the number of seeds that germinate", dis: ["The type of seed used in the trays", "The amount of water each tray receives"] },
    { s: "A student grows seedlings under lights of different colours and measures the mass of each seedling after a month", iv: "The colour of the light", dv: "the mass of each seedling", dis: ["The type of seedling grown", "The number of hours of light each day"] },
    { s: "A student adds different amounts of fertilizer to tomato plants and counts the tomatoes each plant produces", iv: "The amount of fertilizer added", dv: "the number of tomatoes produced", dis: ["The variety of tomato plant used", "The amount of sunlight the plants receive"] }
  ];
  var it = pick(pool);
  return mcq(it.s + ". The independent (manipulated) variable in this experiment is",
    it.iv.toLowerCase(),
    [it.dv, it.dis[0].toLowerCase(), it.dis[1].toLowerCase()],
    "The independent variable is the one the student deliberately changes: " + it.iv.toLowerCase() + ". The responding (dependent) variable is what gets measured in reply, here " + it.dv + ". The other two options are conditions a fair test holds constant.", {});
}, ["The independent variable is the one the experimenter changes on purpose.", "Ask: what did the student decide to make different between the groups?"]);

E("s7-u1-design-controls", 1, ["SC7.3.8"], 2, "var", varset([
  function () {
    return mcq("A student tests whether fertilizer helps bean plants grow taller. Four pots get fertilizer and four do not. Which set of conditions must be kept the SAME in all eight pots for the test to be fair?",
      "Same soil, same amount of water, same light, and the same kind and size of bean plant",
      ["Same soil, same amount of water, same light, and a different kind of bean plant in each pot",
       "Same fertilizer in all eight pots, with water and light allowed to differ between them",
       "Same size of pot, with the soil, water and light each different from pot to pot"],
      "A fair test changes only the fertilizer. Soil, water, light and the plants themselves must be identical across pots, or any difference in height could be blamed on them instead. Giving every pot fertilizer would remove the comparison entirely.", {});
  }
]), ["Only one thing may differ between the groups: the variable being tested.", "List everything that touches the plants, then protect all of it except one."]);

E("s7-u1-design-flaw", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return mcq("A student tests whether seedlings grow better in sunlight or shade. She puts one tray on a sunny windowsill and one tray in a dark cupboard, and waters the windowsill tray every day but the cupboard tray only once a week. The flaw in this design is that",
      "two variables change at once, so any difference in growth cannot be blamed on light alone",
      ["the trays hold too few seedlings for any pattern in the results to be trusted",
       "the student measured growth at the end instead of watching the seedlings daily",
       "seedlings should never be grown in a cupboard, even for a short experiment"],
      "Light and water both differ between the trays. If the windowsill seedlings grow better, the cause could be the light, the water, or both, so the experiment cannot answer its own question. A fair version waters both trays identically and changes only the light.", {});
  }
]), ["Compare the two groups item by item and count how many things differ.", "If the count is more than one, the experiment cannot point at a cause."]);

E("s7-u1-cr-design-experiment", 1, ["SC7.3.8"], 3, "var", varset([
  function () {
    return textq("Design an experiment to answer this question: does the amount of salt in the soil affect whether bean seeds germinate? In your design, state a hypothesis, name the independent variable, the dependent variable and at least two variables you would control, and describe briefly how you would set the experiment up. (This entry is for practice and teacher-picked sets; it is not drawn by the unit test convention.)",
      ["A complete design: hypothesis linking salt to germination; independent variable the amount of salt; dependent variable the number or percentage of seeds germinating; controls such as same seed type and number, same soil, water, temperature and time; a set-up with several salt amounts plus a no-salt group, counted after a fixed time"],
      "<b>Model answer:</b> Hypothesis: if more salt is added to the soil, then a smaller percentage of bean seeds will germinate, because salt draws water away from the seeds. Independent variable: the amount of salt mixed into the soil (for example 0 g, 1 g, 2 g and 4 g per tray). Dependent variable: the percentage of seeds germinated after ten days. Controls: the same kind and number of bean seeds in each tray, the same soil, the same amount of water, the same temperature and light, and the same ten-day period. Set-up: prepare four trays of soil with the different salt amounts, plant twenty seeds in each at the same depth, water them equally, keep them together in the same place, and count the germinated seeds after ten days.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis connecting salt amount to germination. 1 mark for the independent and dependent variables correctly named. 1 mark for at least two sensible controls held constant. 1 mark for a workable set-up with more than one salt level and a no-salt comparison group.", {});
  }
]), ["Use the Salty Seeds pattern: hypothesis, what you change, what you count, what you hold still.", "A no-salt group is essential: without it there is nothing to compare against."]);

/* ---------- SC7.3.9 Organizing and displaying data ---------- */

E("s7-u1-table-choose", 1, ["SC7.3.9"], 1, "var", varset([
  function () {
    return mcq("A team counted germinated seeds in four trays (no salt, a little salt, more salt, most salt) on days 3, 6 and 9. Which table organizes this data correctly?",
      "A table with one row per tray and one column per day, with the counts where each row and column meet",
      ["A table with one row per day and a single column holding all four trays' counts added together",
       "A table listing the trays in the order the team happened to check them each day",
       "A table with the final day's counts only, since those are the results that matter"],
      "The data has two factors (tray and day), so the table needs rows for one and columns for the other, with every count kept separate. Adding the trays together, scrambling the order, or dropping the earlier days all destroy information the team collected.", {});
  }
]), ["Count the factors in the data: each one needs its own rows or columns.", "If a table throws data away, it is the wrong table."]);

E("s7-u1-table-read", 1, ["SC7.3.9"], 2, "var", varset([
  function () {
    return mcq("A results table shows the number of bean seeds germinated out of 20 after ten days: no salt, 19; 1 g of salt, 16; 2 g of salt, 11; 4 g of salt, 5. Which conclusion does the table support?",
      "As the amount of salt increased, the number of seeds that germinated decreased",
      ["As the amount of salt increased, the number of seeds that germinated increased",
       "Salt had no effect on germination, since seeds germinated at every salt level",
       "The seeds with 2 g of salt germinated fastest of all the groups tested"],
      "Read down the columns: 19, 16, 11, 5 is a steady decrease as salt rises. Seeds still germinating at high salt does not mean no effect; the counts fell by nearly three quarters. The table says nothing about speed, only totals at day ten.", {});
  }
]), ["Read the numbers in order and describe the direction of the pattern before choosing.", "An effect can be strong even when the outcome never reaches zero."]);

E("s7-u1-graph-interpret", 1, ["SC7.3.9"], 3, "var", varset([
  function () {
    var q = mcq("The graph shows the average height of spruce trees growing back on a clearcut site over ten years. Which statement best explains why the growth slows in the later years shown?",
      "As the trees grow larger and closer together, they compete more for light, water and nutrients, so each tree grows more slowly",
      ["As the trees grow larger, the soil runs out of nutrients completely and growth nearly stops for good",
       "The trees slow down because the site receives less sunlight each year than the year before it",
       "The slowing is a measuring error, because healthy trees grow by the same amount every year"],
      "Early on, the young trees have space, light and soil nutrients to themselves and grow fast. As the stand closes in, the same resources are shared among bigger, crowded trees, so growth per year falls. The soil is not exhausted, the sunlight has not changed, and uneven yearly growth is normal, not an error.", {});
    q.figure = s7GrowthSVG([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0.2, 0.6, 1.1, 1.8, 2.6, 3.4, 4.1, 4.7, 5.2, 5.6, 5.9]);
    return q;
  }
]), ["Look at the shape first: steep early, flattening later. Then ask what changes as a stand fills in.", "The resource supply stays roughly the same while the demand on it grows. That is competition."]);

E("s7-u1-cr-data-display", 1, ["SC7.3.9", "SC7.1.8"], 3, "var", varset([
  function () {
    var q = textq("The graph shows the average height of spruce trees on a replanted site over ten years after harvesting. (a) Describe the pattern the graph shows. (b) Explain what this pattern tells you about how the site is changing as an ecosystem.",
      ["(a) Growth is fast in the first years and slows steadily, with the stand still growing but by smaller amounts each year. (b) The site is passing through succession: the young stand is closing in, competition is increasing, and the ecosystem is moving from open ground toward a young forest"],
      "<b>Model answer:</b> (a) The trees grow quickly at first, gaining roughly a metre a year in the middle years, but the yearly gain shrinks steadily, so the curve rises steeply and then flattens toward the top. (b) The site is changing from open, harvested ground into a young forest: this is succession at work. As the trees grow and crowd together, they compete harder for light, water and nutrients, which is why growth slows; the ecosystem is settling into the young-forest stage that will, in time, become mature forest again.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately (fast early growth, slowing later). 1 mark for naming the change as succession or regrowth toward forest. 1 mark for the explanation connecting the slowdown to crowding and competition.", {});
    q.figure = s7GrowthSVG([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0.2, 0.6, 1.1, 1.8, 2.6, 3.4, 4.1, 4.7, 5.2, 5.6, 5.9]);
    return q;
  }
]), ["Describe before you explain: what does the line actually do?", "Then connect the shape to the site's story: open ground becoming forest."]);

/* ---------- SC7.3.10 Defending a position from findings ---------- */

E("s7-u1-position-support", 1, ["SC7.3.10"], 2, "var", varset([
  function () {
    return mcq("A student defends this position: \"Clearcutting this valley would seriously harm the salmon stream.\" Which finding from a survey of the valley best supports the position?",
      "After heavy rain, streams below clearcut areas in the region carried heavy loads of soil washed off the bare ground",
      ["The valley's spruce trees are the tallest of any stand surveyed in the region in the past ten years",
       "The company that would do the cutting has operated in the province for over thirty years without a serious accident",
       "Salmon from this stream are sold in stores across the province and in other countries every year"],
      "Support must connect the claim to evidence about the harm named. Soil washing into streams below clearcuts is direct evidence for the claimed harm. Tree height, company history and fish sales say nothing about whether clearcutting harms the stream.", {});
  },
  function () {
    return mcq("A student defends this position: \"The harvested area should be replanted within a year.\" Which finding best supports the position?",
      "On nearby sites left unplanted, shrubs crowded in and few spruce seedlings survived after five years",
      ["Spruce seedlings are available from the provincial nursery at a low cost per thousand",
       "The harvested area is the largest cutover in the region in the past decade by a wide margin",
       "Most residents surveyed in the nearby towns said they preferred the look of a planted forest"],
      "The finding about unplanted sites shows a consequence that replanting prevents, which is what support for the position requires. Seedling price, the site's size and public taste do not show that replanting matters ecologically.", {});
  }
]), ["A supporting finding must be evidence for the claim, not just a fact about the topic.", "Ask of each finding: if this is true, does the position become more believable?"]);

E("s7-u1-cr-defend-position", 1, ["SC7.3.10"], 3, "var", varset([
  function () {
    return textq("Findings from a study of a harvested valley: (1) the stream below the clearcut carried three times as much sediment in the spring after cutting as in the spring before; (2) the number of young salmon in the stream fell by half over the same period; (3) the replanted part of the valley has seedlings growing well after two years; (4) the cutting provided forty jobs for one season. Defend this position: \"Future harvests in this valley should leave an uncut buffer strip along the stream.\" Use at least TWO of the findings in your defence.",
      ["A defence built on findings 1 and 2 (sediment tripled, young salmon halved when no buffer was left), concluding that a buffer addresses exactly that harm; finding 4 may be acknowledged, and finding 3 used to show replanting works but does not protect the stream during the bare-ground period"],
      "<b>Model answer:</b> Future harvests should leave an uncut buffer along the stream, because the study shows what happened without one. Finding 1: in the spring after cutting, the stream carried three times as much sediment, washed off the bare ground. Finding 2: over the same period the young salmon in the stream fell by half, exactly the harm sediment causes by smothering the gravel where eggs are laid. A standing buffer of trees would hold the soil and shade the water, preventing both effects. The forty jobs (finding 4) are real, but a buffer removes only the strip along the stream from the harvest, so most of the work remains; and while the replanting is growing well (finding 3), seedlings take years to hold soil the way standing trees do today.<br><br><b>Marking points:</b> 1 mark for the position clearly defended (not just described). 1 mark for the first finding used accurately as support. 1 mark for the second finding used accurately as support.", {});
  }
]), ["Quote the findings by number as you use them; your defence is built out of them.", "Two findings used well beat four findings listed without a job to do."]);

/* ---------- SC7.3.11 Flow charts of ecosystem change ---------- */

E("s7-u1-succession-order", 1, ["SC7.3.11"], 1, "var", varset([
  function () {
    var q = mcq("The four panels show stages of succession on bare rock, in mixed order. Which sequence puts the stages in the correct order, from first to last?",
      "B -> D -> A -> C",
      ["B -> A -> D -> C", "D -> B -> A -> C", "B -> D -> C -> A"],
      "Panel B is bare rock with the first lichens, panel D adds mosses and grasses, panel A brings shrubs and a young tree, and panel C is the mature forest. So the order is B, D, A, C: each stage prepares the ground for the next.", {});
    q.figure = s7SuccessionSVG([2, 0, 3, 1]);
    return q;
  }
]), ["Find the barest panel first and the forest last; the middle two follow the amount of growth.", "Each stage makes the next one possible: lichens make soil, soil holds grasses, grasses shelter shrubs, shrubs shelter trees."]);

E("s7-u1-flowchart-complete", 1, ["SC7.3.11"], 2, "var", varset([
  function () {
    var q = mcq("A flow chart of succession on bare rock reads: panel C -> panel A -> ? -> panel B. Which panel completes the flow chart?",
      "Panel D",
      ["Panel A", "Panel B", "Panel C"],
      "Panel C is bare rock with lichens (the first stage) and panel A is mosses and grasses (the second). Panel B is the mature forest, the final stage, so the missing third stage must be the shrubs and young trees: panel D.", {});
    q.figure = s7SuccessionSVG([1, 3, 0, 2]);
    return q;
  }
]), ["Put all four panels in order first; then read off which one the chart is missing.", "The chart gives you the first, second and last stages. Only one panel is left."]);

E("s7-u1-succession-predict", 1, ["SC7.3.11"], 3, "var", varset([
  function () {
    var q = mcq("The panels show succession on bare rock in mixed order. A site today looks like panel B. If the site is left undisturbed, which description best predicts its next stage?",
      "Shrubs spread and young trees grow up through them, shading out many of the grasses and mosses",
      ["Lichens spread across the remaining bare rock and the grasses and mosses die back",
       "The site returns to bare rock as the soil slowly washes away down the slope",
       "Mature forest trees appear at full size within a single growing season"],
      "Panel B shows the shrub stage beginning among grasses. The next stage in the sequence is shrubs spreading with young trees rising through them, on the way to the mature forest of panel D. Succession moves forward through the stages; it does not reverse to bare rock or skip to full-grown forest in a season.", {});
    q.figure = s7SuccessionSVG([0, 2, 1, 3]);
    return q;
  }
]), ["Locate today's panel in the full sequence; the answer is the stage after it.", "Predictions in succession follow the order: no stage is skipped and none runs backwards on its own."]);

E("s7-u1-cr-succession-stages", 1, ["SC7.3.11", "SC7.1.8"], 2, "var", varset([
  function () {
    var q = textq("The panels show four stages of succession on bare rock, in order from first to last. Describe the change that takes place at EACH stage, and name the condition each stage creates that allows the next stage to happen.",
      ["Stage 1: lichens colonize bare rock and begin breaking it down, starting soil. Stage 2: mosses and grasses grow in the thin soil, adding organic matter and deepening it. Stage 3: shrubs and young trees grow in the deeper soil, sheltering the ground. Stage 4: a mature forest stands, with deep soil and a shaded forest floor"],
      "<b>Model answer:</b> Stage 1: lichens settle on the bare rock and, with weathering, begin to break its surface down; the first thin soil starts to form. Stage 2: mosses and grasses root in that thin soil, and as they live and die they add organic matter, deepening the soil and letting it hold water. Stage 3: shrubs and young trees can now grow; their roots and leaf litter deepen and enrich the soil further, and their shade changes the conditions at ground level. Stage 4: the mature forest stands, with deep soil and a shaded floor, the conditions the earlier stages built step by step. Each stage survives because the stage before it changed the site.<br><br><b>Marking points:</b> 1 mark for the changes at stages 1 and 2 described in order (colonizing, soil beginning and deepening). 1 mark for the changes at stages 3 and 4 described in order, with the enabling condition named (deeper soil, shelter or shade).", {});
    q.figure = s7SuccessionSVG([0, 1, 2, 3]);
    return q;
  }
]), ["Tell the story of the soil: it is the thread that links all four stages.", "For each stage ask two things: what grows now, and what does its living and dying leave behind?"]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-experiment item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE={
  "s7-u1-cr-design-experiment":true
};
BANK.forEach(function(e){ if(NO_COMPOSE[e.id]){ e.noCompose=true; } });
